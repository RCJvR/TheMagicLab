/* The Magic Lab — reading progress for lessons.
 *
 * A thin bar pinned to the top of the screen fills as the reader moves
 * through the lesson. A small tick marks where each section begins, so the
 * bar also shows the lesson's shape. Visual only: nothing is announced, and
 * no text is added, moved or hidden. It is left out when printing, and on a
 * lesson with fewer than two sections.
 */
(function () {
  'use strict';
  var lesson = document.querySelector('.lesson-body');
  if (!lesson) return;
  var heads = lesson.querySelectorAll('h2');
  if (heads.length < 2) return;

  var bar = document.createElement('div');
  bar.className = 'ml-progress';
  bar.setAttribute('aria-hidden', 'true');
  var fill = document.createElement('i');
  bar.appendChild(fill);
  lesson.parentNode.insertBefore(bar, lesson);

  var ticks = [];
  function place() {
    var top = lesson.getBoundingClientRect().top + window.pageYOffset;
    var height = lesson.getBoundingClientRect().height;
    ticks.forEach(function (t) { t.parentNode && t.parentNode.removeChild(t); });
    ticks = [];
    if (height <= 0) return;
    for (var i = 1; i < heads.length; i++) {
      var hr = heads[i].getBoundingClientRect();
      if (hr.height === 0 && hr.width === 0) continue;   // hidden (a locked preview section): no tick
      var at = hr.top + window.pageYOffset - top;
      var t = document.createElement('b');
      t.style.left = Math.max(0, Math.min(100, (at / height) * 100)) + '%';
      bar.appendChild(t);
      ticks.push(t);
    }
  }

  var queued = false;
  function update() {
    queued = false;
    var top = lesson.getBoundingClientRect().top + window.pageYOffset;
    var height = lesson.getBoundingClientRect().height;
    if (height <= 0) return;
    // The reader counts as a little way down the screen (40%), so the bar moves
    // just before the text reaches the top. Within the last screen of the page
    // that line slides down to the bottom edge: short final sections can never
    // scroll up to 40%, and at the very bottom the bar must read as finished.
    var vh = window.innerHeight;
    var remaining = Math.max(0, document.documentElement.scrollHeight - vh - window.pageYOffset);
    var endBlend = Math.max(0, Math.min(1, 1 - remaining / vh));
    var line = vh * (0.4 + 0.6 * endBlend);
    var reached = window.pageYOffset + line - top;
    if (remaining < 2) reached = Math.max(reached, height);   // scrolled to the end: done
    var share = Math.max(0, Math.min(1, reached / height));
    fill.style.width = (share * 100).toFixed(2) + '%';
  }
  function queue() {
    // A plain timer, not requestAnimationFrame: some lesson pages replace requestAnimationFrame
    // (the simulation pause), and the bar must not depend on that.
    if (!queued) { queued = true; window.setTimeout(update, 16); }
  }

  place();
  update();
  window.addEventListener('scroll', queue, { passive: true });
  // Some mobile browsers (iOS WebKit among them) do not always send a scroll event
  // during touch or momentum scrolling, so the bar also checks its position a few
  // times a second. It does nothing while the page is hidden.
  document.addEventListener('touchmove', queue, { passive: true });
  document.addEventListener('touchend', queue, { passive: true });
  setInterval(function () { if (!document.hidden) queue(); }, 200);
  window.addEventListener('resize', function () { place(); queue(); });
  window.addEventListener('orientationchange', function () { place(); queue(); });
  window.addEventListener('load', function () { place(); queue(); });
})();
