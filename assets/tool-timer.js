/* The Magic Lab — time spent coding (Code Conjurer, Java Genie).
 *
 * Counts time only while the learner is working: typing in the code editor
 * (each keystroke keeps the clock running for 20 seconds) or running a
 * program (each run counts for up to a minute). The page must be visible.
 * Reading a tutorial without typing is not counted.
 *
 * Time is saved through lesson-results.js (the lesson_results table, key
 * "coding"), so teachers see it beside quiz results in the class overview.
 *
 *   <script defer src="/assets/tool-timer.js" data-tool="java-genie" data-grade="8"></script>
 * data-grade may instead be data-grade-from=".selector[data-grade]": the grade
 * is read from the first element matching it (for tools with a grade picker).
 */
(function () {
  'use strict';
  const me = document.currentScript;
  if (!me || window.MLToolTimer) return;
  window.MLToolTimer = true;
  const TOOL = me.dataset.tool, FIXED = +me.dataset.grade || 0, FROM = me.dataset.gradeFrom || '';
  const EDITOR = me.dataset.editor || '#codeEditor', RUN = me.dataset.run || '#runButton';
  const TYPE_WINDOW = 20000, RUN_WINDOW = 60000, TICK = 5, KEY = 'coding';
  if (!TOOL) return;

  function grade() {
    if (FROM) { const el = document.querySelector(FROM); const g = el && +el.dataset.grade; if (g) return g; }
    return FIXED || 10;
  }

  let until = 0, pending = 0, at = null;
  const extend = ms => { until = Math.max(until, Date.now() + ms); };
  document.addEventListener('keydown', e => { if (e.target && e.target.closest && e.target.closest(EDITOR)) extend(TYPE_WINDOW); }, true);
  document.addEventListener('input', e => { if (e.target && e.target.closest && e.target.closest(EDITOR)) extend(TYPE_WINDOW); }, true);
  document.addEventListener('click', e => { if (e.target && e.target.closest && e.target.closest(RUN)) extend(RUN_WINDOW); }, true);
  // Ctrl/Cmd+Enter runs the program in these tools.
  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') extend(RUN_WINDOW); }, true);

  function commit() {
    if (at && pending >= 1 && window.MLResults && MLResults.addTime) MLResults.addTime(TOOL, at, KEY, pending);
    pending = 0;
  }
  setInterval(() => {
    const g = grade();
    if (at && g !== at) commit();
    at = g;
    if (document.visibilityState === 'visible' && Date.now() < until) pending += TICK;
    if (pending >= 30) commit();
  }, TICK * 1000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') commit(); });
  window.addEventListener('pagehide', commit);

  // The recorder (and its account sync) comes from lesson-results.js.
  if (!window.MLResults && !document.querySelector('script[src="/lesson-results.js"]')) {
    const s = document.createElement('script'); s.src = '/lesson-results.js'; s.defer = true; document.head.appendChild(s);
  }
})();
