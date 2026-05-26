// ============================================================
// THE MAGIC LAB — progress.js
// Progress tracking SDK — include after auth.js on every page
// Usage: <script src="auth.js"></script>
//        <script src="progress.js"></script>
// ============================================================

// Wait for auth to be ready before setting up
document.addEventListener('magiclab:auth:ready', () => {
  window.MagicLabProgress = {
    track,
    getToolProgress,
    getAllProgress,
    getRecentEvents,
    getLessonHistory
  };

  // Fire ready event
  document.dispatchEvent(new CustomEvent('magiclab:progress:ready'));
});

// ── Tool name constants ─────────────────────────────────────
// Use these in each tool's integration code
const TOOLS = {
  JAVA_GENIE:      'java-genie',
  WEB_WIZARD:      'web-wizard',
  CODE_CONJURER:   'code-conjurer',
  MATH_MAGICIAN:   'math-magician',
  COMPUTER_CODEX:  'computer-codex'
};
window.ML_TOOLS = TOOLS;

// ── Core tracking function ───────────────────────────────────

/**
 * Track a learning event.
 *
 * @param {string} tool        — one of ML_TOOLS.*
 * @param {string} eventType   — see event types below
 * @param {object} options     — { topic, grade, score, metadata }
 *
 * Event types:
 *   'lesson_complete'   — student finished reading a lesson
 *   'quiz_correct'      — answered a quiz question correctly
 *   'quiz_wrong'        — answered a quiz question incorrectly
 *   'challenge_loaded'  — loaded a challenge starter
 *   'example_loaded'    — loaded an example into the editor
 *   'code_run'          — ran code (Java Genie / Code Conjurer / Web Wizard)
 *   'topic_started'     — opened a topic/lesson for first time
 *
 * Example:
 *   MagicLabProgress.track('code-conjurer', 'quiz_correct', {
 *     topic: 'Variables and Data Types',
 *     grade: 10,
 *     score: 1
 *   });
 */
async function track(tool, eventType, options = {}) {
  // Silently do nothing if not logged in
  if (!window.MagicLabAuth?.isLoggedIn()) return;

  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();
  const session  = window.MagicLabAuth.getSession();

  // Fall back to session user ID if profile fetch failed (e.g. RLS issue)
  const userId = profile?.id ?? session?.user?.id;
  if (!userId) {
    console.warn('[MagicLab] Cannot track — no user ID available');
    return;
  }

  try {
    const { error } = await supabase.from('progress_events').insert({
      user_id:    userId,
      tool,
      event_type: eventType,
      topic:      options.topic    ?? null,
      grade:      options.grade    ?? profile?.grade ?? null,
      score:      options.score    ?? null,
      metadata:   options.metadata ?? {}
    });
    if (error) console.warn('[MagicLab] Progress insert error:', error.message);
  } catch (e) {
    console.warn('[MagicLab] Progress tracking failed:', e.message);
  }
}

/**
 * Get summary progress for a specific tool.
 * Returns { topics_seen, topics_complete, quiz_correct, quiz_total, code_runs, last_active }
 */
async function getToolProgress(tool) {
  if (!window.MagicLabAuth?.isLoggedIn()) return null;
  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();

  const { data } = await supabase
    .from('tool_progress')
    .select('*')
    .eq('user_id', profile.id)
    .eq('tool', tool)
    .single();

  return data ?? {
    tool,
    topics_seen: 0, topics_complete: 0,
    quiz_correct: 0, quiz_total: 0,
    code_runs: 0, last_active: null
  };
}

/**
 * Get progress summary across ALL tools.
 * Returns array of tool_progress rows.
 */
async function getAllProgress() {
  if (!window.MagicLabAuth?.isLoggedIn()) return [];
  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();

  const { data } = await supabase
    .from('tool_progress')
    .select('*')
    .eq('user_id', profile.id)
    .order('last_active', { ascending: false });

  return data ?? [];
}

/**
 * Get the 20 most recent progress events (for activity feed).
 */
async function getRecentEvents(limit = 20) {
  if (!window.MagicLabAuth?.isLoggedIn()) return [];
  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();

  const { data } = await supabase
    .from('progress_events')
    .select('*')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  return data ?? [];
}

/**
 * Get list of completed lessons for a tool (for sidebar tick marks).
 * Returns Set of topic strings.
 */
async function getLessonHistory(tool) {
  if (!window.MagicLabAuth?.isLoggedIn()) return new Set();
  const supabase = window.MagicLabAuth._supabase();
  const profile  = window.MagicLabAuth.getProfile();

  const { data } = await supabase
    .from('progress_events')
    .select('topic')
    .eq('user_id', profile.id)
    .eq('tool', tool)
    .eq('event_type', 'lesson_complete')
    .not('topic', 'is', null);

  return new Set((data ?? []).map(r => r.topic));
}
