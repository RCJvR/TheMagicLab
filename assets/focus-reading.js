/* The Magic Lab — focus reading for lessons.
 *
 * An optional view that shows one section of a lesson at a time. The section
 * in focus is sharp; the others are blurred, so the eye stays on one idea.
 * It is a visual aid only: every word stays in the page, in reading order,
 * and nothing is announced to or hidden from assistive technology.
 *
 * Offered only where it can help: a lesson with at least MIN_SECTIONS
 * sections, none longer than MAX_WORDS. A longer section would make one
 * "focus" a wall of text, so those lessons get no switch.
 *
 * Off by default. The choice is remembered in this browser only. Nothing in
 * the lesson content changes: while the view is on, each section is wrapped
 * in <section class="ml-focus-seg">, and unwrapped again when it is off.
 */
(function () {
  'use strict';
  var MIN_SECTIONS = 4, MAX_WORDS = 400, KEY = 'ml-focus-reading', TOP = 96;
  var af = /\.af\.html$/.test(location.pathname) || (document.documentElement.lang || '').indexOf('af') === 0;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var L = af
    ? { on: 'Fokuslees', prev: '← Vorige', next: 'Volgende →', at: 'Afdeling {n} van {t}' }
    : { on: 'Focus reading', prev: '← Previous', next: 'Next →', at: 'Section {n} of {t}' };

  var lesson, segs = [], cur = 0, on = false, bar, toggle, nav, prevBtn, nextBtn, counter;

  function words(nodes) {
    return nodes.reduce(function (n, node) {
      return n + (node.textContent || '').trim().split(/\s+/).filter(Boolean).length;
    }, 0);
  }

  // The lesson's direct children, grouped as sections: each h2 starts a new
  // group, and anything before the first h2 forms an intro group.
  function groups() {
    var out = [], g = [];
    [].slice.call(lesson.childNodes).forEach(function (n) {
      if (n.nodeType === 1 && n.tagName === 'H2' && g.length) { out.push(g); g = []; }
      g.push(n);
    });
    if (g.length) out.push(g);
    return out.filter(function (g) { return words(g) > 0 || g.some(function (n) { return n.nodeType === 1; }); });
  }

  function eligible() {
    lesson = document.querySelector('.lesson-body');
    if (!lesson) return false;
    var h2s = [].filter.call(lesson.children, function (c) { return c.tagName === 'H2'; });
    if (h2s.length < MIN_SECTIONS) return false;
    return groups().every(function (g) { return words(g) <= MAX_WORDS; });
  }

  function wrap() {
    segs = groups().map(function (g) {
      var s = document.createElement('section');
      s.className = 'ml-focus-seg';
      lesson.insertBefore(s, g[0]);
      g.forEach(function (n) { s.appendChild(n); });
      return s;
    });
  }

  function unwrap() {
    segs.forEach(function (s) {
      while (s.firstChild) lesson.insertBefore(s.firstChild, s);
      lesson.removeChild(s);
    });
    segs = [];
  }

  // The section whose top is at or above the reader's line, so turning the
  // view on keeps the part of the lesson already in sight.
  function nearest() {
    var k = 0;
    for (var i = 0; i < segs.length; i++) {
      if (segs[i].getBoundingClientRect().bottom > TOP) { k = i; break; }
    }
    return k;
  }

  function paint() {
    lesson.classList.toggle('ml-focus-on', on);
    segs.forEach(function (s, k) {
      s.classList.toggle('is-blurred', on && k !== cur);
      s.classList.toggle('is-current', on && k === cur);
    });
    nav.hidden = !on;
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur >= segs.length - 1;
    counter.textContent = L.at.replace('{n}', cur + 1).replace('{t}', segs.length);
    toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  function focusSection(k, scroll) {
    if (k < 0 || k >= segs.length) return;
    cur = k;
    paint();
    if (scroll) {
      var y = segs[k].getBoundingClientRect().top + window.pageYOffset - TOP;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }
  }

  function indexOf(el) {
    var s = el && el.closest && el.closest('.ml-focus-seg');
    return s ? segs.indexOf(s) : -1;
  }

  function setOn(v) {
    if (v === on) return;
    on = v;
    if (on) { wrap(); cur = nearest(); } else { unwrap(); }
    paint();
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) { /* private window: the view still works */ }
  }

  function remembered() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  function build() {
    bar = document.createElement('div');
    bar.className = 'ml-focus-bar';

    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ml-focus-toggle';
    toggle.textContent = L.on;
    toggle.addEventListener('click', function () { setOn(!on); });

    nav = document.createElement('div');
    nav.className = 'ml-focus-nav';
    nav.hidden = true;
    prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.textContent = L.prev;
    prevBtn.addEventListener('click', function () { focusSection(cur - 1, true); });
    counter = document.createElement('span');
    nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.textContent = L.next;
    nextBtn.addEventListener('click', function () { focusSection(cur + 1, true); });
    nav.appendChild(prevBtn);
    nav.appendChild(counter);
    nav.appendChild(nextBtn);

    bar.appendChild(toggle);
    bar.appendChild(nav);
    lesson.parentNode.insertBefore(bar, lesson);

    // Clicking or tabbing into a faded section brings it into focus.
    function pick(e) {
      if (!on) return;
      var k = indexOf(e.target);
      if (k !== -1 && k !== cur) focusSection(k, false);
    }
    lesson.addEventListener('click', pick);
    lesson.addEventListener('focusin', pick);

    // A table-of-contents link or any in-page anchor brings its section into focus.
    window.addEventListener('hashchange', function () {
      if (!on) return;
      var k = indexOf(document.getElementById(decodeURIComponent(location.hash.slice(1))));
      if (k !== -1) focusSection(k, false);
    });
  }

  function init() {
    if (!eligible()) return;
    build();
    if (remembered()) setOn(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
