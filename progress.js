// ============================================================
// THE MAGIC LAB — progress.js
// Progress tracking SDK — include after auth.js on every page
// Usage: <script src="auth.js"></script>
//        <script src="progress.js"></script>
// ============================================================

document.addEventListener('magiclab:auth:ready', () => {
  window.MagicLabProgress = {
    track,
    getToolProgress,
    getAllProgress,
    getRecentEvents,
    getLessonHistory
  };
  document.dispatchEvent(new CustomEvent('magiclab:progress:ready'));
});

const TOOLS = {
  JAVA_GENIE:      'java-genie',
  WEB_WIZARD:      'web-wizard',
  CODE_CONJURER:   'code-conjurer',
  MATH_MAGICIAN:   'math-magician',
  COMPUTER_CODEX:  'computer-codex'
};
window.ML_TOOLS = TOOLS;

async function track(tool, eventType, options = {}) {
  if (!window.MagicLabAuth?.isLoggedIn()) return;

  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();
  const session  = window.MagicLabAuth.getSession();

  // Use session user ID as fallback when profile fetch failed
  const userId = profile?.id ?? session?.user?.id;
  if (!userId) {
    console.warn('[MagicLab] Cannot track — no user ID available');
    return;
  }

  try {
    const { error } = await supabase.from('progress_events').insert({
      user_id:    userId,
      tool:       tool,
      event_type: eventType,
      topic:      options.topic    ?? null,
      grade:      options.grade    ?? profile?.grade ?? null,
      score:      options.score    ?? null,
      metadata:   options.metadata ?? {}
    });
    if (error) console.warn('[MagicLab] Progress insert error:', error.message, error);
  } catch (e) {
    console.warn('[MagicLab] Progress tracking failed:', e.message);
  }
}

async function getToolProgress(tool) {
  if (!window.MagicLabAuth?.isLoggedIn()) return null;
  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();
  const session  = window.MagicLabAuth.getSession();
  const userId   = profile?.id ?? session?.user?.id;
  if (!userId) return null;

  const { data } = await supabase
    .from('tool_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('tool', tool)
    .maybeSingle();

  return data ?? {
    tool,
    topics_seen: 0, topics_complete: 0,
    quiz_correct: 0, quiz_total: 0,
    code_runs: 0, last_active: null
  };
}

async function getAllProgress() {
  if (!window.MagicLabAuth?.isLoggedIn()) return [];
  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();
  const session  = window.MagicLabAuth.getSession();
  const userId   = profile?.id ?? session?.user?.id;
  if (!userId) return [];

  const { data } = await supabase
    .from('tool_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_active', { ascending: false });

  return data ?? [];
}

async function getRecentEvents(limit = 20) {
  if (!window.MagicLabAuth?.isLoggedIn()) return [];
  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();
  const session  = window.MagicLabAuth.getSession();
  const userId   = profile?.id ?? session?.user?.id;
  if (!userId) return [];

  const { data } = await supabase
    .from('progress_events')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return data ?? [];
}

async function getLessonHistory(tool) {
  if (!window.MagicLabAuth?.isLoggedIn()) return new Set();
  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();
  const session  = window.MagicLabAuth.getSession();
  const userId   = profile?.id ?? session?.user?.id;
  if (!userId) return new Set();

  const { data, error } = await supabase
    .from('progress_events')
    .select('topic')
    .eq('user_id', userId)
    .eq('tool', tool)
    .eq('event_type', 'lesson_complete')
    .not('topic', 'is', null);

  if (error) console.warn('[MagicLab] getLessonHistory error:', error.message);
  return new Set((data ?? []).map(r => r.topic));
}
