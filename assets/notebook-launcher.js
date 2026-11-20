/* ============================================================
   THE MAGIC LAB — Study Spellbook on lessons (assets/notebook-launcher.js)
   Adds a "Notebook" button to a lesson's header. It opens the learner's
   notebook beside the lesson (wide screens: the lesson moves left to make
   room; phones and tablets: a full-screen sheet), or in its own window.
   Selecting lesson text shows an "Add to notes" button that copies it into
   the open page with a link back to the lesson.

   Loaded by assets/lesson-toc.js (Science Sage and Tech Tower lessons) and
   by Math Magician's grade pages. The notebook itself (assets/notebook.js)
   is only downloaded when the learner first opens it.
   Spec: docs/notebook-spec.md.
   ============================================================ */
(function () {
  'use strict';
  if (window.MLNotebook) return;

  var WIDE = 1100;               // below this the notebook is a full-screen sheet
  var MIN_W = 360, DEF_W = 520;
  var PRO_PLANS = ['pro', 'school'];
  var ACCENT = { 'science-sage': '#4acf6b', 'math-magician': '#9ed43c', 'tech-tower': '#eda13c' };
  var SUBJECT = { 'science-sage': 'Science', 'math-magician': 'Maths', 'tech-tower': 'Technology' };
  var ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>';
  var CLIP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';

  var btn = null, panel = null, host = null, api = null, opening = null, clipBtn = null;
  var channel = ('BroadcastChannel' in window) ? new BroadcastChannel('ml-notebook') : null;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function isAf() { return /\.af\.html$/.test(location.pathname) || /^af/i.test(document.documentElement.lang || ''); }

  /* ── Styles (marked so theme.js leaves them alone) ──────── */
  function addStyles() {
    if (document.querySelector('link[href="/assets/notebook.css"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = '/assets/notebook.css';
    l.setAttribute('data-ml-no-theme', '');
    document.head.appendChild(l);
  }

  /* ── Which lesson is this? ─────────────────────────────── */
  function tool() { var b = document.querySelector('[data-ml-bar]'); return b ? b.getAttribute('data-ml-bar') : ''; }
  function txt(sel) { var n = document.querySelector(sel); return n ? n.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function topicId() { try { return typeof currentTopicId !== 'undefined' ? currentTopicId : null; } catch (e) { return null; } } // Math Magician's global
  function lessonInfo() {
    var t = tool(), path = location.pathname.replace(/\.af\.html$/, '.html');
    var grade = (path.match(/\/gr(\d+)\//) || [])[1] || '';
    var gLabel = grade ? ' · Gr ' + grade : '';
    var info = { tool: t, grade: grade, colour: ACCENT[t] || null };
    if (t === 'math-magician') {
      var id = topicId();
      info.title = txt('#lessonPanel .lesson-heading') || 'Maths notes';
      info.subject = SUBJECT[t];
      info.ref = 'mm:' + grade + ':' + id;
      info.url = path + (id != null ? '?topic=' + id : '');
    } else {
      var parts = path.split('/').filter(Boolean);      // e.g. science-sage, gr10, chemistry, stoichiometry.html
      var file = (parts[parts.length - 1] || '').replace(/\.html$/, '');
      var strand = parts.length > 3 ? parts[parts.length - 2] : '';
      info.title = txt('.lesson-title') || txt('h1') || document.title.split(/[—|]/)[0].trim();
      info.subject = txt('.nav-strand') || SUBJECT[t] || 'Lessons';
      info.ref = (t === 'tech-tower' ? 'tt:' : t === 'science-sage' ? 'ss:' : (t || 'page') + ':') + grade + ':' + (strand ? strand + '/' : '') + file;
      info.url = location.pathname;
    }
    // Some headers already say the grade ("Electrical Systems · Gr 8"): don't add it twice.
    info.subject = info.subject.replace(/\s*[·|-]\s*(gr|graad|grade)\.?\s*\d+\s*$/i, '');
    info.divider = info.subject + gLabel;
    return info;
  }
  function lessonBody() {
    return document.querySelector('#lessonPanel .lesson-body') || document.querySelector('.tab-panel.active .lesson-body') || document.querySelector('.lesson-body');
  }

  /* ── The button in the header ──────────────────────────── */
  function addButton() {
    if (btn) return true;
    var bar = document.querySelector('[data-ml-bar][data-mlb-ready]');
    var end = bar && bar.querySelector('.mlb-end');
    if (!end) return false;
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mlb-act mlb-ico ml-nb-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-keyshortcuts', 'Control+Alt+N');
    btn.title = (isAf() ? 'Notaboek' : 'Notebook') + ' (Ctrl+Alt+N)';
    btn.setAttribute('aria-label', isAf() ? 'Notaboek' : 'Notebook');
    btn.innerHTML = ICON + '<span>' + (isAf() ? 'Notaboek' : 'Notebook') + '</span>';
    btn.addEventListener('click', toggle);
    end.parentNode.insertBefore(btn, end);
    return true;
  }
  function waitForBar() {
    if (addButton()) return afterButton();
    var mo = new MutationObserver(function () { if (addButton()) { mo.disconnect(); afterButton(); } });
    mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-mlb-ready'] });
    setTimeout(function () { mo.disconnect(); }, 15000);
  }
  function afterButton() {
    // Reopen if it was open on the last lesson (wide screens only).
    if (store('ml-nb-open') === '1' && innerWidth >= WIDE) open();
    // Arrived from a notebook clip link: scroll to that section.
    var m = location.hash.match(/^#nb=(.+)$/);
    if (m) setTimeout(function () { scrollToSection(decodeURIComponent(m[1])); }, 600);
  }

  /* ── Opening and closing ───────────────────────────────── */
  function width() {
    var w = parseInt(store('ml-nb-w'), 10) || DEF_W;
    return Math.max(MIN_W, Math.min(w, Math.round(innerWidth * 0.6)));
  }
  function layout() {
    if (!panel) return;
    var wide = innerWidth >= WIDE;
    var root = document.documentElement;
    root.style.setProperty('--ml-nb-w', width() + 'px');
    root.classList.toggle('ml-nb-split', wide);
    root.classList.toggle('ml-nb-sheet', !wide);
  }
  function toggle() { if (panel) close(); else open(); }

  function open(opts) {
    if (opening) return opening;
    opening = (async function () {
      if (await popoutAlive()) {
        // Already open in its own window: hand it this lesson.
        channel.postMessage({ type: 'open-lesson', lesson: lessonInfo() });
        say(isAf() ? 'Jou notaboek is oop in sy eie venster.' : 'Your notebook is open in its own window.');
        return null;
      }
      if (panel) return api;
      addStyles();
      panel = document.createElement('div');
      panel.className = 'ml-nb-panel';
      panel.setAttribute('role', 'complementary');
      panel.setAttribute('aria-label', 'Study Spellbook notebook');
      panel.setAttribute('data-ml-no-theme', '');
      var grip = document.createElement('div');
      grip.className = 'ml-nb-resize';
      grip.setAttribute('aria-hidden', 'true');
      host = document.createElement('div');
      host.style.height = '100%';
      panel.appendChild(grip); panel.appendChild(host);
      document.body.appendChild(panel);
      resizable(grip);
      layout();
      fireResize();
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (innerWidth >= WIDE) store('ml-nb-open', '1');
      try {
        var mod = await import('/assets/notebook.js');
        api = mod.mount(host, {
          embedded: true,
          lesson: lessonInfo(),
          onClose: close,
          onPopOut: popOut,
          goToLesson: goToLesson
        });
        await api.ready;
        if (!(opts && opts.noFocus)) api.focus();
      } catch (e) {
        console.error('[notebook] could not load', e);
        host.innerHTML = '<div class="nb-root" data-ml-no-theme><div class="nb-empty"><div class="nb-empty-card"><h2>The notebook could not open</h2><p class="nb-muted">Check your connection and try again.</p></div></div></div>';
      }
      return api;
    })().finally(function () { opening = null; });
    return opening;
  }
  async function close() {
    if (!panel) return;
    var p = panel, a = api;
    panel = null; api = null;
    store('ml-nb-open', '0');
    if (a) { try { await a.destroy(); } catch (e) {} }
    p.remove();
    document.documentElement.classList.remove('ml-nb-split', 'ml-nb-sheet');
    if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    fireResize();
  }
  function fireResize() { setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 30); }
  window.addEventListener('resize', function () { if (panel) layout(); });

  function resizable(grip) {
    grip.addEventListener('pointerdown', function (e) {
      if (innerWidth < WIDE) return;
      e.preventDefault();
      grip.setPointerCapture(e.pointerId);
      document.documentElement.classList.add('ml-nb-resizing');
      function move(ev) {
        var w = Math.max(MIN_W, Math.min(innerWidth - ev.clientX, Math.round(innerWidth * 0.6)));
        document.documentElement.style.setProperty('--ml-nb-w', w + 'px');
        store('ml-nb-w', String(w));
      }
      function up() {
        grip.removeEventListener('pointermove', move); grip.removeEventListener('pointerup', up); grip.removeEventListener('pointercancel', up);
        document.documentElement.classList.remove('ml-nb-resizing');
        fireResize();
      }
      grip.addEventListener('pointermove', move); grip.addEventListener('pointerup', up); grip.addEventListener('pointercancel', up);
    });
  }

  /* ── Its own window ────────────────────────────────────── */
  function popOut(pageId) {
    var w = Math.min(640, Math.round(screen.availWidth / 2));
    var h = Math.max(500, screen.availHeight - 60);
    var url = '/notebook.html' + (pageId ? '?page=' + encodeURIComponent(pageId) : '');
    var win = window.open(url, 'ml-notebook', 'popup,width=' + w + ',height=' + h + ',left=' + (screen.availWidth - w) + ',top=0');
    if (win) close();
  }
  function popoutAlive() {
    return new Promise(function (resolve) {
      if (!channel) return resolve(false);
      var id = Math.random().toString(36).slice(2);
      function on(e) { if (e.data && e.data.type === 'pong' && e.data.id === id) { channel.removeEventListener('message', on); resolve(true); } }
      channel.addEventListener('message', on);
      channel.postMessage({ type: 'ping', id: id });
      setTimeout(function () { channel.removeEventListener('message', on); resolve(false); }, 250);
    });
  }

  /* ── Going back to a lesson from a note ────────────────── */
  function samePlace(url) {
    var u; try { u = new URL(url, location.href); } catch (e) { return false; }
    if (u.pathname.replace(/\.af\.html$/, '.html') !== location.pathname.replace(/\.af\.html$/, '.html')) return false;
    var t = u.searchParams.get('topic');
    if (t != null && topicId() != null) return String(topicId()) === t;
    return true;
  }
  function goToLesson(url, section) {
    if (samePlace(url)) {
      var t = new URL(url, location.href).searchParams.get('topic');
      if (t != null && typeof selectTopic === 'function' && String(topicId()) !== t) { try { selectTopic(+t); } catch (e) {} }
      if (typeof switchTab === 'function' && document.querySelector('#tab-lesson:not(.active)')) {
        var tb = document.querySelector('.tab-btn'); try { switchTab('lesson', tb); } catch (e) {}
      }
      scrollToSection(section);
      return;
    }
    // Keep the lesson in the same language the learner is reading.
    var dest = url;
    if (isAf() && /\.html(\?|$)/.test(dest) && !/\.af\.html/.test(dest) && !/math-magician/.test(dest)) dest = dest.replace(/\.html(\?|$)/, '.af.html$1');
    location.href = dest + (section ? '#nb=' + encodeURIComponent(section) : '');
  }
  function scrollToSection(section) {
    var body = lessonBody();
    if (!body) return;
    var target = body;
    if (section) {
      var hs = body.querySelectorAll('h2, h3');
      for (var i = 0; i < hs.length; i++) {
        if (hs[i].textContent.replace(/\s+/g, ' ').trim() === section) { target = hs[i]; break; }
      }
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.add('ml-nb-flash');
    setTimeout(function () { target.classList.remove('ml-nb-flash'); }, 1700);
  }

  /* ── Clipping ──────────────────────────────────────────── */
  function isPro() {
    var a = window.MagicLabAuth, p = a && a.getProfile && a.getProfile();
    return !!(p && PRO_PLANS.indexOf(p.package) > -1);
  }
  function currentRange() {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
    var r = sel.getRangeAt(0);
    var body = lessonBody();
    if (!body || !body.contains(r.commonAncestorContainer)) return null;
    if (panel && panel.contains(r.commonAncestorContainer)) return null;
    if (!sel.toString().trim() && !r.cloneContents().querySelector('img')) return null;
    return r;
  }
  function hideClip() { if (clipBtn) clipBtn.hidden = true; }
  function showClip() {
    var r = currentRange();
    if (!r || !isPro()) return hideClip();
    addStyles();
    if (!clipBtn) {
      clipBtn = document.createElement('button');
      clipBtn.type = 'button';
      clipBtn.className = 'ml-nb-clip';
      clipBtn.setAttribute('data-ml-no-theme', '');
      clipBtn.innerHTML = CLIP_ICON + '<span>' + (isAf() ? 'Voeg by notas' : 'Add to notes') + '</span>';
      clipBtn.addEventListener('mousedown', function (e) { e.preventDefault(); });   // keep the selection
      clipBtn.addEventListener('click', function () {
        clipSelection().catch(function (e) {
          console.error('[notebook] clip failed', e);
          say(isAf() ? 'Dit kon nie bygevoeg word nie. Probeer weer.' : 'That couldn’t be added. Please try again.');
        });
      });
      document.body.appendChild(clipBtn);
    }
    clipBtn.hidden = false;
    var rects = r.getClientRects();
    var last = rects[rects.length - 1] || r.getBoundingClientRect();
    var bw = clipBtn.offsetWidth || 130, bh = clipBtn.offsetHeight || 34;
    var left = Math.min(Math.max(8, last.right - bw / 2), innerWidth - bw - 8 - (panel && innerWidth >= WIDE ? width() : 0));
    var top = last.bottom + 10;
    if (top + bh > innerHeight - 8) top = Math.max(8, (rects[0] || last).top - bh - 10);
    clipBtn.style.left = Math.max(8, left) + 'px';
    clipBtn.style.top = top + 'px';
  }
  var clipTimer = null;
  document.addEventListener('selectionchange', function () { clearTimeout(clipTimer); clipTimer = setTimeout(showClip, 180); });
  window.addEventListener('scroll', function () { if (clipBtn && !clipBtn.hidden) showClip(); }, { passive: true });

  function sectionOf(range, body) {
    var node = range.startContainer;
    if (node.nodeType === 1 && node.childNodes[range.startOffset]) node = node.childNodes[range.startOffset];
    var hs = body.querySelectorAll('h2'), found = '';
    for (var i = 0; i < hs.length; i++) {
      if (hs[i] === node || hs[i].compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING) found = hs[i].textContent.replace(/\s+/g, ' ').trim();
      else break;
    }
    return found;
  }

  var KEEP = { P: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, UL: 1, OL: 1, LI: 1, TABLE: 1, THEAD: 1, TBODY: 1, TFOOT: 1, TR: 1, TH: 1, TD: 1,
    STRONG: 1, B: 1, EM: 1, I: 1, U: 1, S: 1, SUB: 1, SUP: 1, BR: 1, A: 1, IMG: 1, BLOCKQUOTE: 1, CODE: 1, PRE: 1, HR: 1 };
  var DROP = { SCRIPT: 1, STYLE: 1, BUTTON: 1, INPUT: 1, SELECT: 1, TEXTAREA: 1, LABEL: 1, CANVAS: 1, SVG: 1, IFRAME: 1, VIDEO: 1, AUDIO: 1, NOSCRIPT: 1, TEMPLATE: 1, FORM: 1, OBJECT: 1, EMBED: 1 };
  // Paywall box, section quick-checks, the "On this page" list, our own buttons.
  var SKIP = '.ml-wall, .ml-check, .ml-toc, .ml-nb-clip, .lesson-next-btn, [data-nb-skip]';
  var BLOCKS = /^(P|H[1-6]|UL|OL|LI|TABLE|THEAD|TBODY|TFOOT|TR|TH|TD|BLOCKQUOTE|PRE|DIV|SECTION|ARTICLE|ASIDE|FIGURE|DETAILS|HR)$/;
  function safeUrl(v) {
    try { var u = new URL(v, location.href); return /^(https?:|mailto:)$/.test(u.protocol) ? u.href : null; } catch (e) { return null; }
  }
  // Copy the selection as clean HTML the notebook understands. Interactive
  // parts (buttons, simulations, drawings) are left out.
  function cleanSelection(range) {
    var dropped = 0;
    // MathJax: remember each formula's TeX on the original so the copy carries it.
    try {
      var root = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentNode;
      if (window.MathJax && MathJax.startup && MathJax.startup.document && MathJax.startup.document.getMathItemsWithin) {
        MathJax.startup.document.getMathItemsWithin(lessonBody()).forEach(function (it) { if (it.typesetRoot) it.typesetRoot.setAttribute('data-nb-tex', it.math); });
      }
      void root;
    } catch (e) {}
    var box = document.createElement('div');
    box.appendChild(range.cloneContents());
    [].slice.call(box.querySelectorAll('mjx-container')).forEach(function (m) {
      var tex = m.getAttribute('data-nb-tex');
      var mml = m.querySelector('mjx-assistive-mml');
      var code = document.createElement('code');
      code.textContent = tex || (mml ? mml.textContent : m.textContent) || '';
      m.replaceWith(code);
    });
    function walk(src, out) {
      [].slice.call(src.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          // Source indentation and line breaks are not content (except in code blocks).
          // No loose text between table rows/cells or list items.
          if (/^(TABLE|THEAD|TBODY|TFOOT|TR|UL|OL)$/.test(out.tagName) && !n.nodeValue.trim()) return;
          var v = out.closest && out.closest('pre') ? n.nodeValue : n.nodeValue.replace(/\s+/g, ' ');
          if (v.trim() || (v && out.lastChild && out.lastChild.nodeType !== 3 && !BLOCKS.test(out.lastChild.tagName))) out.appendChild(document.createTextNode(v));
          return;
        }
        if (n.nodeType !== 1) return;
        var tag = n.tagName.toUpperCase();
        if (n.matches(SKIP)) return;   // the site's own controls inside a lesson, not lesson content
        if (DROP[tag] || n.getAttribute('aria-hidden') === 'true' || n.hidden) { if (tag === 'SVG' || tag === 'CANVAS' || tag === 'IFRAME' || tag === 'VIDEO') dropped++; return; }
        if (KEEP[tag]) {
          var name = tag === 'H1' ? 'H2' : /^H[4-6]$/.test(tag) ? 'H3' : tag;
          var c = document.createElement(name);
          if (tag === 'A') { var h = safeUrl(n.getAttribute('href')); if (h) c.setAttribute('href', h); }
          if (tag === 'IMG') {
            var s = safeUrl(n.getAttribute('src'));
            if (!s) { dropped++; return; }
            c.setAttribute('src', s); if (n.getAttribute('alt')) c.setAttribute('alt', n.getAttribute('alt'));
          }
          if ((tag === 'TD' || tag === 'TH')) { ['colspan', 'rowspan'].forEach(function (a) { if (n.getAttribute(a)) c.setAttribute(a, n.getAttribute(a)); }); }
          walk(n, c); out.appendChild(c); return;
        }
        // A box with only inline content (a callout, a key fact) becomes a paragraph.
        if (BLOCKS.test(tag)) {
          var hasBlock = [].some.call(n.children, function (k) { return BLOCKS.test(k.tagName.toUpperCase()); });
          if (!hasBlock) { var p = document.createElement('P'); walk(n, p); if (p.textContent.trim() || p.querySelector('img')) out.appendChild(p); return; }
        }
        walk(n, out);   // anything else: keep its contents
      });
    }
    var clean = document.createElement('div');
    walk(box, clean);
    // Loose text (a selection inside one paragraph) gets a paragraph of its own.
    if ([].some.call(clean.childNodes, function (n) { return n.nodeType === 3 || !BLOCKS.test(n.tagName); })) {
      var wrapped = document.createElement('div'), p = null;
      [].slice.call(clean.childNodes).forEach(function (n) {
        if (n.nodeType === 1 && BLOCKS.test(n.tagName)) { p = null; wrapped.appendChild(n); }
        else { if (!p) { p = document.createElement('P'); wrapped.appendChild(p); } p.appendChild(n); }
      });
      clean = wrapped;
    }
    // Trim the space left at the start and end of each paragraph, and drop empty ones.
    [].slice.call(clean.querySelectorAll('p, li, td, th, h2, h3')).forEach(function (b) {
      var f = b.firstChild, l = b.lastChild;
      if (f && f.nodeType === 3) f.nodeValue = f.nodeValue.replace(/^\s+/, '');
      if (l && l.nodeType === 3) l.nodeValue = l.nodeValue.replace(/\s+$/, '');
      if (b.tagName === 'P' && !b.textContent.trim() && !b.querySelector('img')) b.remove();
    });
    return { html: clean.innerHTML, dropped: dropped };
  }

  async function clipSelection() {
    var r = currentRange();
    if (!r) return hideClip();
    var body = lessonBody();
    var info = lessonInfo();
    var out = cleanSelection(r);
    var clip = { html: out.html, title: info.title, url: info.url, section: sectionOf(r, body), lesson: info };
    hideClip();
    window.getSelection().removeAllRanges();
    if (await popoutAlive()) {
      channel.postMessage({ type: 'clip', clip: clip });
      say(isAf() ? 'By jou notaboek gevoeg.' : 'Added to your notebook window.');
    } else {
      var a = api || await open({ noFocus: true });
      if (a) await a.insertClip(clip);
    }
    if (out.dropped) say(isAf() ? 'Diagramme en simulasies word nie gekopieer nie.' : 'Diagrams and simulations aren’t copied, only the text and pictures.');
  }

  /* ── A short message at the bottom of the screen ───────── */
  function say(msg) {
    addStyles();
    var t = document.createElement('div');
    t.className = 'ml-nb-clip';
    t.setAttribute('role', 'status');
    t.setAttribute('data-ml-no-theme', '');
    t.style.cssText = 'left:50%;bottom:20px;top:auto;transform:translateX(-50%);cursor:default;max-width:calc(100vw - 32px)';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3500);
  }

  /* ── Keyboard: Ctrl+Alt+N opens and closes ─────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.altKey && (e.key === 'n' || e.key === 'N')) { e.preventDefault(); toggle(); }
  });

  window.MLNotebook = { open: open, close: close, toggle: toggle, goToLesson: goToLesson, lessonInfo: lessonInfo };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', waitForBar);
  else waitForBar();
})();
