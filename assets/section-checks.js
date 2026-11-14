/* The Magic Lab — section checks for lessons.
 *
 * A short check at the end of a section: one question at a time, from the
 * lesson's own practice questions, with the lesson's own explanation as
 * feedback. Each lesson names its questions in window.ML_SECTION_CHECKS:
 *
 *   window.ML_SECTION_CHECKS = {
 *     questions: QUESTIONS,              // { text, opts, ans, exp }
 *     sections: { 0: [0], 1: [1, 2] }    // section index -> question indexes
 *   };
 *
 * Nothing in the lesson text changes. A check is added after its section and
 * is left out when the lesson has no config, or when printing. An answer moves
 * on by itself after a short pause; tapping the feedback moves on at once.
 */
(function () {
  'use strict';
  var cfg = window.ML_SECTION_CHECKS;
  if (!cfg || !cfg.questions || !cfg.sections) return;
  var lesson = document.querySelector('.lesson-body');
  if (!lesson) return;
  var heads = lesson.querySelectorAll('h2');
  if (!heads.length) return;

  function anchorFor(i) {
    // The check goes just before the next section's heading (or at the end of the lesson).
    var next = heads[i + 1];
    if (!next) return null;
    return next.closest('.ml-focus-seg') || next;
  }

  Object.keys(cfg.sections).forEach(function (key) {
    var i = +key, qs = cfg.sections[key];
    if (!heads[i] || !qs.length) return;
    var box = document.createElement('div');
    box.className = 'ml-check';
    box.setAttribute('data-section', String(i));
    var anchor = anchorFor(i);
    if (anchor) lesson.insertBefore(box, anchor); else lesson.appendChild(box);
    show(box, qs, cfg.questions, i);
  });

  function show(box, qs, Q, sec, at) {
    at = at || 0;
    var q = Q[qs[at]];
    if (!q) return;
    box.innerHTML = '<div class="ml-check-cap">Check ' + (at + 1) + ' of ' + qs.length + '</div>' +
      '<div class="ml-check-q"></div><div class="ml-check-opts"></div><div class="ml-check-fb"></div>';
    box.querySelector('.ml-check-q').textContent = q.text;
    var opts = box.querySelector('.ml-check-opts');
    q.opts.forEach(function (o, k) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'ml-check-opt'; b.textContent = o;
      b.addEventListener('click', function () { answer(box, qs, Q, sec, at, k); });
      opts.appendChild(b);
    });
  }

  function answer(box, qs, Q, sec, at, k) {
    var q = Q[qs[at]], ok = k === q.ans;
    box.querySelectorAll('.ml-check-opt').forEach(function (x, j) {
      x.disabled = true;
      if (j === q.ans) x.classList.add('right');
    });
    if (!ok) box.querySelectorAll('.ml-check-opt')[k].classList.add('wrong');
    var fb = box.querySelector('.ml-check-fb');
    var last = at === qs.length - 1, moved = false, timer;
    fb.innerHTML = '<div class="ml-check-note ' + (ok ? 'ok' : 'no') + '" tabindex="0"><b>' +
      (ok ? 'Correct!' : 'Not quite.') + '</b>' + String(q.exp || '').replace(/</g, '&lt;') +
      '<small class="ml-check-tap">Tap to continue</small></div>';
    function go() {
      if (moved) return;
      moved = true; clearTimeout(timer);
      if (last) {
        box.innerHTML = '<div class="ml-check-done">Section check complete</div>';
      } else {
        show(box, qs, Q, sec, at + 1);
      }
    }
    timer = setTimeout(go, 3200);
    fb.firstChild.addEventListener('click', go);
  }
})();
