// ============================================================
// THE MAGIC LAB — progress.js
// Progress tracking SDK — include after auth.js on every page
// Usage: <script src="auth.js"></script>
//        <script src="progress.js"></script>
//        <script src="xp.js"></script>
// ============================================================

document.addEventListener('magiclab:auth:ready', () => {
  window.MagicLabProgress = {
    track,
    getToolProgress,
    getAllProgress,
    getRecentEvents,
    getLessonHistory,
    getLessonHistoryByGrade
  };
  document.dispatchEvent(new CustomEvent('magiclab:progress:ready'));
});

const TOOLS = {
  JAVA_GENIE:      'java-genie',
  WEB_WIZARD:      'web-wizard',
  CODE_CONJURER:   'code-conjurer',
  MATH_MAGICIAN:   'math-magician',
  COMPUTER_CODEX:  'computer-codex',
  AI_ORACLE:       'ai-oracle',
  DRAWING_DRUID:   'drawing-druid'
};
window.ML_TOOLS = TOOLS;

// Per-session perfect quiz tracking: lessonKey → all first-try correct so far
const _perfectTracker = {};

async function track(tool, eventType, options = {}) {
  if (!window.MagicLabAuth?.isLoggedIn()) return;

  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();
  const session  = window.MagicLabAuth.getSession();

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

  // ── XP awards ─────────────────────────────────────────────
  const _award = async () => {
    if (!window.MagicLabXP) return;
    const rates = window.MagicLabXP.XP_RATES;
    const key   = `${tool}::${options.topic || ''}`;

    if (eventType === 'lesson_complete') {
      await window.MagicLabXP.awardXP(rates.lesson_complete, `Lesson: ${options.topic || tool}`, tool);

      // Perfect quiz bonus — all questions correct first try this lesson
      if (_perfectTracker[key] === true) {
        await window.MagicLabXP.awardXP(rates.quiz_perfect_bonus, 'Perfect quiz!', tool);
        // Track the perfect event for badge counting
        try {
          const sb  = window.MagicLabAuth._supabase();
          const uid = window.MagicLabAuth.getProfile()?.id ?? window.MagicLabAuth.getSession()?.user?.id;
          if (uid) sb.from('progress_events').insert({ user_id: uid, tool, event_type: 'quiz_perfect', topic: options.topic ?? null, metadata: {} });
        } catch (_) {}
        delete _perfectTracker[key];
      } else {
        delete _perfectTracker[key];
      }

      // Unit complete bonus
      if (options.unitComplete) {
        await window.MagicLabXP.awardXP(rates.unit_complete, `Unit complete: ${options.unit || tool}`, tool);
      }
      // Full tool complete bonus
      if (options.toolComplete) {
        await window.MagicLabXP.awardXP(rates.tool_complete, `Tool complete: ${tool}`, tool);
      }
    }

    if (eventType === 'quiz_correct') {
      const isFirst = options.metadata?.attempt === 1 || options.metadata?.firstTry !== false;
      const xp = isFirst ? rates.quiz_correct_first : rates.quiz_correct_retry;
      await window.MagicLabXP.awardXP(xp, `Quiz correct${isFirst ? '' : ' (retry)'}`, tool);
      // Track perfect state: undefined = not seen yet, true = all good, false = disqualified
      if (isFirst) {
        if (_perfectTracker[key] === undefined) _perfectTracker[key] = true;
        // stays true if already true
      } else {
        _perfectTracker[key] = false;
      }
    }

    if (eventType === 'quiz_wrong') {
      _perfectTracker[key] = false;
    }

    if (eventType === 'code_run') {
      await window.MagicLabXP.awardXP(rates.code_run, 'Code run', tool);
    }
  };

  if (window.MagicLabXP) {
    _award();
  } else {
    document.addEventListener('magiclab:xp:ready', _award, { once: true });
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

// Same as getLessonHistory, but bucketed by the `grade` recorded on each
// event instead of merged into one set — lets a landing page show
// per-grade completion without loading that grade's own topic manifest.
// Returns { [grade]: Set(topic) }, keyed by grade as a string.
async function getLessonHistoryByGrade(tool) {
  if (!window.MagicLabAuth?.isLoggedIn()) return {};
  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();
  const session  = window.MagicLabAuth.getSession();
  const userId   = profile?.id ?? session?.user?.id;
  if (!userId) return {};

  const { data, error } = await supabase
    .from('progress_events')
    .select('topic, grade')
    .eq('user_id', userId)
    .eq('tool', tool)
    .eq('event_type', 'lesson_complete')
    .not('topic', 'is', null)
    .not('grade', 'is', null);

  if (error) { console.warn('[MagicLab] getLessonHistoryByGrade error:', error.message); return {}; }

  const byGrade = {};
  (data ?? []).forEach(r => {
    const g = String(r.grade);
    (byGrade[g] ??= new Set()).add(r.topic);
  });
  return byGrade;
}
