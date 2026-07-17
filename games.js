// ============================================================
// THE MAGIC LAB — games.js
// The Arena (Kahoot-style) SDK — include after auth.js
// Usage: <script src="auth.js"></script>
//        <script src="games.js"></script>
//
// Requires the tables/functions created by game-schema.sql to exist in
// Supabase. Host and player screens both poll (no Realtime channels) —
// see arena-host.html / arena.html for the poll loops.
// ============================================================

document.addEventListener('magiclab:auth:ready', () => {
  window.MagicLabGames = {
    createGameSession,
    startGame,
    revealQuestion,
    nextQuestion,
    endGame,
    getSession,
    getParticipants,
    getAnswerBreakdown,
    getCorrectOptionIndex,
    joinGameSession,
    getMyParticipant,
    submitAnswer,
  };
  document.dispatchEvent(new CustomEvent('magiclab:games:ready'));
});

function _shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Create a new game session (host/teacher only).
 * @param {Object} opts
 * @param {string} [opts.classId]
 * @param {string} opts.tool
 * @param {string} opts.title
 * @param {Array}  opts.questionSet — [{ q, opts: [{text, correct}] }], already
 *                 picked/capped by the caller (see arena-host.html's question
 *                 picker). Each question's own option order is shuffled here.
 * @param {number} [opts.questionSeconds=20]
 */
async function createGameSession({ classId = null, tool, title, questionSet, questionSeconds = 20 }) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  if (!auth.isTeacher())   return { error: { message: 'Only teachers can host an arena' } };
  if (!questionSet?.length) return { error: { message: 'Pick at least one question' } };

  const supabase   = auth._supabase();
  const teacherId  = auth.getProfile()?.id ?? auth.getSession()?.user?.id;

  const shuffled = questionSet.map(q => ({ ...q, opts: _shuffle(q.opts) }));
  const questionsPublic = shuffled.map(q => ({ q: q.q, opts: q.opts.map(o => o.text) }));
  const answerKeyRows = [];

  const { data: codeData } = await supabase.rpc('generate_game_code');
  const joinCode = codeData || Math.random().toString(36).slice(2, 8).toUpperCase();

  const { data: session, error } = await supabase
    .from('game_sessions')
    .insert({
      host_teacher_id: teacherId,
      class_id: classId,
      tool, title,
      join_code: joinCode,
      status: 'lobby',
      questions_public: questionsPublic,
      question_count: shuffled.length,
      question_seconds: questionSeconds,
    })
    .select()
    .single();

  if (error) return { error };

  shuffled.forEach((q, i) => {
    answerKeyRows.push({
      session_id: session.id,
      question_index: i,
      correct_option_index: q.opts.findIndex(o => o.correct),
    });
  });

  const { error: keyErr } = await supabase.from('game_answer_keys').insert(answerKeyRows);
  if (keyErr) return { error: keyErr };

  return { data: session };
}

async function startGame(sessionId) {
  return _setSessionState(sessionId, { status: 'question', current_index: 0, question_started_at: new Date().toISOString() });
}

async function revealQuestion(sessionId) {
  return _setSessionState(sessionId, { status: 'reveal' });
}

async function nextQuestion(sessionId, currentIndex, questionCount) {
  if (currentIndex + 1 >= questionCount) return endGame(sessionId);
  return _setSessionState(sessionId, {
    status: 'question',
    current_index: currentIndex + 1,
    question_started_at: new Date().toISOString(),
  });
}

async function endGame(sessionId) {
  return _setSessionState(sessionId, { status: 'ended' });
}

async function _setSessionState(sessionId, updates) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const supabase = auth._supabase();
  const { data, error } = await supabase
    .from('game_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single();
  return { data, error };
}

/** Poll target for both host and player screens. */
async function getSession(sessionId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return null;
  const supabase = auth._supabase();
  const { data } = await supabase.from('game_sessions').select('*').eq('id', sessionId).maybeSingle();
  return data;
}

/** Look a session up by its 6-character join code (for the join screen). */
async function _findSessionByCode(joinCode) {
  const auth = window.MagicLabAuth;
  const supabase = auth._supabase();
  const { data } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('join_code', joinCode.toUpperCase())
    .maybeSingle();
  return data;
}

async function getParticipants(sessionId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const supabase = auth._supabase();
  const { data } = await supabase
    .from('game_participants')
    .select('*')
    .eq('session_id', sessionId)
    .order('score', { ascending: false });
  return data ?? [];
}

/** Host-only: per-option answer counts for the current question. */
async function getAnswerBreakdown(sessionId, questionIndex, optionCount) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { counts: new Array(optionCount).fill(0), total: 0 };
  const supabase = auth._supabase();
  const { data } = await supabase
    .from('game_answers')
    .select('option_index')
    .eq('session_id', sessionId)
    .eq('question_index', questionIndex);
  const counts = new Array(optionCount).fill(0);
  (data ?? []).forEach(r => { if (r.option_index >= 0 && r.option_index < optionCount) counts[r.option_index]++; });
  return { counts, total: (data ?? []).length };
}

/**
 * Host-only: the correct option index for a question, read via RLS access
 * to game_answer_keys (the host owns the session). Used on the reveal
 * screen to highlight the right tile — students never get this directly,
 * only through submit_game_answer()'s return value for their own answer.
 */
async function getCorrectOptionIndex(sessionId, questionIndex) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return null;
  const supabase = auth._supabase();
  const { data } = await supabase
    .from('game_answer_keys')
    .select('correct_option_index')
    .eq('session_id', sessionId)
    .eq('question_index', questionIndex)
    .maybeSingle();
  return data?.correct_option_index ?? null;
}

/**
 * Join a session by code (student). Only works while the session is still
 * in its lobby — matches the usual "you can't join mid-game" pattern.
 */
async function joinGameSession(joinCode, displayName) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const session = await _findSessionByCode(joinCode);
  if (!session) return { error: { message: 'Arena not found — check the code' } };
  if (session.status !== 'lobby') return { error: { message: 'This arena has already started' } };

  const supabase  = auth._supabase();
  const studentId = auth.getProfile()?.id ?? auth.getSession()?.user?.id;
  const name = (displayName || auth.getProfile()?.display_name || 'Player').trim().slice(0, 24);

  const { error } = await supabase
    .from('game_participants')
    .insert({ session_id: session.id, student_id: studentId, display_name: name });
  if (error && error.code !== '23505') return { error }; // 23505 = already joined

  return { data: session };
}

async function getMyParticipant(sessionId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return null;
  const supabase  = auth._supabase();
  const studentId = auth.getProfile()?.id ?? auth.getSession()?.user?.id;
  const { data } = await supabase
    .from('game_participants')
    .select('*')
    .eq('session_id', sessionId)
    .eq('student_id', studentId)
    .maybeSingle();
  return data;
}

/**
 * Submit an answer for the current question. Correctness and points are
 * computed server-side (submit_game_answer) — the client never has access
 * to the answer key, only this call's result for the question just answered.
 */
async function submitAnswer(sessionId, questionIndex, optionIndex, responseMs) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const supabase = auth._supabase();
  const { data, error } = await supabase.rpc('submit_game_answer', {
    p_session_id: sessionId,
    p_question_index: questionIndex,
    p_option_index: optionIndex,
    p_response_ms: responseMs,
  });
  if (error) return { error };
  if (data?.error) return { error: { message: data.error } };
  return { data };
}
