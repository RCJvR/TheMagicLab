// ============================================================
// THE MAGIC LAB — lesson-progress-observer.js
// Auto-tracks lesson_complete for lesson pages that don't already call
// MagicLabProgress.track() themselves (Science Sage, Tech Tower).
// Deliberately DOM-driven rather than tied to each lesson's own quiz
// JS (variable names/completion checks vary across 130+ hand-written
// lesson files) — it just watches the shared .score-banner element
// every lesson already uses to reveal "Quiz complete!", and fires once
// when that banner is shown.
//
// Include as a plain <script defer src="…/lesson-progress-observer.js">
// on any gr{N}/{strand}/{file}.html lesson page — no per-file setup.
// Tool + grade are inferred from the URL, topic from .lesson-title.
// ============================================================

(function () {
  const path = location.pathname;
  let tool = null;
  if (path.includes('/science-sage/'))     tool = 'science-sage';
  else if (path.includes('/tech-placeholder/')) tool = 'tech-tower';
  if (!tool) return; // not one of the pages this script is meant for

  const gradeMatch = path.match(/\/gr(\d+)\//);
  const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : null;

  let fired = false;
  function fireOnce() {
    if (fired) return;
    fired = true;
    const topic = document.querySelector('.lesson-title')?.textContent?.trim() || document.title;
    if (window.MagicLabProgress) {
      MagicLabProgress.track(tool, 'lesson_complete', { topic, grade });
    } else {
      // SDK not ready yet (rare — quiz completion is usually well after
      // page load) — wait for it once, then fire.
      document.addEventListener('magiclab:progress:ready', () => {
        MagicLabProgress.track(tool, 'lesson_complete', { topic, grade });
      }, { once: true });
    }
  }

  function watch(banner) {
    if (banner.classList.contains('show')) { fireOnce(); return; }
    new MutationObserver((mutations, obs) => {
      if (banner.classList.contains('show')) { fireOnce(); obs.disconnect(); }
    }).observe(banner, { attributes: true, attributeFilter: ['class'] });
  }

  function init() {
    const banner = document.getElementById('scoreBanner') || document.querySelector('.score-banner');
    if (banner) watch(banner);
    // Lessons without a scored practice tab simply never fire — that's fine,
    // there's nothing meaningful to mark "complete" on those pages.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
