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
      var at = heads[i].getBoundingClientRect().top + window.pageYOffset - top;
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
    // The reader counts as a little way down the screen, so the bar moves just before the text reaches the top.
    var reached = window.pageYOffset + window.innerHeight * 0.4 - top;
    var share = Math.max(0, Math.min(1, reached / height));
    fill.style.width = (share * 100).toFixed(2) + '%';
  }
  function queue() {
    if (!queued) { queued = true; window.requestAnimationFrame(update); }
  }

  place();
  update();
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', function () { place(); queue(); });
  window.addEventListener('load', function () { place(); queue(); });
})();
