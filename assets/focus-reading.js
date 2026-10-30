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
 * Off unless the reader turns it on. Three things happen on top of the switch:
 *   - once, on the first eligible lesson, a short introduction with a live
 *     demonstration, offering to turn it on (dismissed or answered = seen);
 *   - if it is on, a "still want this?" prompt on the first eligible lesson
 *     opened ASK_AFTER after the reader last answered it;
 *   - the switch itself, always available above the lesson.
 * Choices are kept in this browser only.
 *
 * Nothing in the lesson content changes: while the view is on, each section
 * is wrapped in <section class="ml-focus-seg">, and unwrapped when it is off.
 */
(function () {
  'use strict';
  var MIN_SECTIONS = 4, MAX_WORDS = 400, TOP = 96;
  var KEY = 'ml-focus-reading', SEEN = 'ml-focus-intro', ASKED = 'ml-focus-asked';
  var INTRO_DELAY = 2000, DEMO_STEP = 2400, ASK_AFTER = 14 * 24 * 60 * 60 * 1000;

  var af = /\.af\.html$/.test(location.pathname) || (document.documentElement.lang || '').indexOf('af') === 0;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var L = af ? {
    on: 'Fokuslees', prev: '← Vorige', next: 'Volgende →', at: 'Afdeling {n} van {t}',
    introTitle: 'Probeer fokuslees',
    introBody: 'Lesse kan een afdeling op ’n slag wys. Die afdeling waarin jy lees bly skerp, en die ander vervaag, sodat jou aandag op een idee bly. Niks word weggeneem nie.',
    introNote: 'Dit is af tensy jy dit aanskakel. Jy kan dit enige tyd met die skakelaar bo die les verander.',
    yes: 'Skakel aan', no: 'Nie nou nie',
    askQ: 'Wil jy steeds fokuslees aan hê?', keep: 'Hou aan', off: 'Skakel af',
    demo: ['Alles om jou is van materie gemaak.', 'Materie is opgebou uit klein deeltjies wat atome genoem word.', 'Elektrone vul skille van binne na buite.']
  } : {
    on: 'Focus reading', prev: '← Previous', next: 'Next →', at: 'Section {n} of {t}',
    introTitle: 'Try focus reading',
    introBody: 'Lessons can show one section at a time. The section you are reading stays sharp, and the others blur, so your attention stays on one idea. Nothing is removed.',
    introNote: 'It is off unless you turn it on. You can change this any time with the switch above a lesson.',
    yes: 'Turn it on', no: 'Not now',
    askQ: 'Still want focus reading on?', keep: 'Keep it on', off: 'Turn it off',
    demo: ['Everything around you is made of matter.', 'Matter is built from tiny particles called atoms.', 'Electrons fill shells from the inside out.']
  };

  var lesson, segs = [], cur = 0, on = false, bar, toggle, nav, prevBtn, nextBtn, counter, ask;

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private window: choices last for this visit only */ } }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

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

  // The section whose bottom is still below the reader's line, so turning the
  // view on keeps the part of the lesson already in sight.
  function nearest() {
    for (var i = 0; i < segs.length; i++) {
      if (segs[i].getBoundingClientRect().bottom > TOP) return i;
    }
    return 0;
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

  function indexOf(node) {
    var s = node && node.closest && node.closest('.ml-focus-seg');
    return s ? segs.indexOf(s) : -1;
  }

  function setOn(v) {
    if (v === on) return;
    on = v;
    if (on) { wrap(); cur = nearest(); } else { unwrap(); }
    paint();
    store(KEY, on ? '1' : '0');
  }

  /* ── Still-want-this prompt ─────────────────────────────────────────────── */

  function askIfDue() {
    var last = Number(load(ASKED)) || 0;
    if (Date.now() - last < ASK_AFTER) return;
    ask = el('div', 'ml-focus-ask');
    ask.setAttribute('role', 'region');
    ask.setAttribute('aria-label', L.on);
    ask.appendChild(el('span', '', L.askQ));
    var keep = el('button', '', L.keep);
    var drop = el('button', '', L.off);
    keep.type = drop.type = 'button';
    keep.addEventListener('click', function () { answer(true); });
    drop.addEventListener('click', function () { answer(false); });
    ask.appendChild(keep);
    ask.appendChild(drop);
    bar.parentNode.insertBefore(ask, bar);
  }

  function answer(keep) {
    store(ASKED, String(Date.now()));
    if (!keep) setOn(false);
    if (ask) { ask.parentNode.removeChild(ask); ask = null; }
  }

  /* ── Introduction, with a live demonstration ───────────────────────────── */

  function demo() {
    var box = el('div', 'ml-focus-demo');
    var parts = L.demo.map(function (t) { return el('p', 'ml-focus-demo-seg', t); });
    parts.forEach(function (p) { box.appendChild(p); });
    var k = 0, timer = null;
    function show(n) {
      parts.forEach(function (p, i) { p.className = 'ml-focus-demo-seg ' + (i === n ? 'is-current' : 'is-blurred'); });
    }
    show(0);
    if (!reduce) timer = setInterval(function () { k = (k + 1) % parts.length; show(k); }, DEMO_STEP);
    return { node: box, stop: function () { if (timer) clearInterval(timer); } };
  }

  function intro() {
    if (load(SEEN) || !lesson.offsetParent) return;
    var returnTo = document.activeElement;
    var overlay = el('div', 'ml-focus-modal');
    var card = el('div', 'ml-focus-card');
    var title = el('div', 'ml-focus-title', L.introTitle);
    title.setAttribute('role', 'heading');
    title.setAttribute('aria-level', '2');
    var d = demo();
    var yes = el('button', 'ml-focus-primary', L.yes);
    var no = el('button', 'ml-focus-secondary', L.no);
    yes.type = no.type = 'button';
    var actions = el('div', 'ml-focus-actions');
    actions.appendChild(no);
    actions.appendChild(yes);

    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');
    card.setAttribute('aria-labelledby', 'ml-focus-title');
    title.id = 'ml-focus-title';
    card.appendChild(title);
    card.appendChild(el('p', '', L.introBody));
    card.appendChild(d.node);
    card.appendChild(el('p', 'ml-focus-note', L.introNote));
    card.appendChild(actions);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    var lockedScroll = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function close(keep) {
      store(SEEN, '1');
      if (keep) { store(ASKED, String(Date.now())); setOn(true); }
      d.stop();
      document.removeEventListener('keydown', onKey, true);
      document.body.removeChild(overlay);
      document.body.style.overflow = lockedScroll;
      if (returnTo && returnTo.focus) returnTo.focus();
    }

    // Keyboard: Escape declines, Tab stays inside the dialog.
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(false); return; }
      if (e.key !== 'Tab') return;
      var f = [no, yes];
      var i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
    }
    document.addEventListener('keydown', onKey, true);

    yes.addEventListener('click', function () { close(true); });
    no.addEventListener('click', function () { close(false); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(false); });
    yes.focus();
  }

  /* ── Switch and in-lesson navigation ───────────────────────────────────── */

  function build() {
    bar = el('div', 'ml-focus-bar');

    toggle = el('button', 'ml-focus-toggle', L.on);
    toggle.type = 'button';
    toggle.setAttribute('aria-pressed', 'false');
    toggle.addEventListener('click', function () { setOn(!on); });

    nav = el('div', 'ml-focus-nav');
    nav.hidden = true;
    prevBtn = el('button', '', L.prev);
    prevBtn.type = 'button';
    prevBtn.addEventListener('click', function () { focusSection(cur - 1, true); });
    counter = el('span');
    nextBtn = el('button', '', L.next);
    nextBtn.type = 'button';
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
    if (load(KEY) === '1') {
      setOn(true);
      askIfDue();
    } else if (!load(SEEN)) {
      setTimeout(intro, INTRO_DELAY);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
