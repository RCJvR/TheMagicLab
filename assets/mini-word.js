// ============================================================
// THE MAGIC LAB — Mini Word (Computer Codex)
// A small working word processor for practising the Word ribbon: tabs, groups,
// dialog launchers, the File tab (Backstage), Save / Save As and shortcuts.
// Each lesson that uses it has a task list that ticks itself off by reading
// the document, so learners learn by doing.
//
// A lesson places <div class="mini-word" data-set="ribbon"></div> in its
// content; Computer Codex calls MiniWord.mountAll(root) after rendering.
// Sets: ribbon, save, format (see SETS below).
//
// It is a simulation: it cannot open or save real .docx files. The document,
// "saved files" and ticked tasks are kept in this browser (localStorage) so a
// reload doesn't lose them.
// Fires "mw:complete" (detail: { set }) on the host when every task is done.
// ============================================================
(function () {
  'use strict';
  if (window.MiniWord) return;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ic = (name, cls) => `<i data-lucide="${name}"${cls ? ` class="${cls}"` : ''}></i>`;
  const PX = 96 / 25.4;   // CSS pixels per millimetre
  const FONTS = ['Calibri', 'Arial', 'Times New Roman', 'Georgia', 'Verdana', 'Courier New', 'Comic Sans MS'];
  const SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 36, 48, 72];
  const COLORS = ['#000000', '#7f7f7f', '#c00000', '#ff0000', '#ffc000', '#00b050', '#0070c0', '#002060', '#7030a0', '#2f5496', '#c55a11', '#548235'];
  const MARKS = [['Yellow', '#ffff00'], ['Bright green', '#00ff00'], ['Turquoise', '#00ffff'], ['Pink', '#ff00ff'], ['No colour', 'transparent']];
  const MARGINS = { normal: { label: 'Normal', note: '2.54 cm all round', t: 25.4, r: 25.4, b: 25.4, l: 25.4 },
                    narrow: { label: 'Narrow', note: '1.27 cm all round', t: 12.7, r: 12.7, b: 12.7, l: 12.7 },
                    wide:   { label: 'Wide', note: '5.08 cm left and right', t: 25.4, r: 50.8, b: 25.4, l: 50.8 } };
  const PAPER = { A4: { mm: [210, 297], note: '21 cm × 29.7 cm' }, Letter: { mm: [215.9, 279.4], note: '21.59 cm × 27.94 cm' }, A5: { mm: [148, 210], note: '14.8 cm × 21 cm' } };
  const SYMBOLS = ['©', '®', '™', '°', '±', '×', '÷', '≠', '≤', '≥', 'π', 'Ω', '€', '£', '→', '←', '✓', '•'];
  const STYLE_NAMES = { normal: 'Normal', title: 'Title', h1: 'Heading 1', h2: 'Heading 2' };

  const svg = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" ${s}</svg>`);
  const PICS = [
    { name: 'Mountains', src: svg(`viewBox="0 0 240 160"><rect width="240" height="160" fill="#bfe3ff"/><circle cx="190" cy="40" r="18" fill="#ffd34d"/><path d="M0 160 70 58 118 128 160 78 240 160Z" fill="#5b8c5a"/><path d="M70 58 86 82 55 82Z" fill="#fff"/><path d="M160 78 172 96 148 96Z" fill="#fff"/>`) },
    { name: 'School', src: svg(`viewBox="0 0 240 160"><rect width="240" height="160" fill="#dff1ff"/><rect y="128" width="240" height="32" fill="#7cb66a"/><rect x="50" y="62" width="140" height="70" fill="#d9825b"/><path d="M40 64 120 22 200 64Z" fill="#8c3b2b"/><rect x="108" y="96" width="24" height="36" fill="#5a3b2a"/>${[64, 150].map(x => `<rect x="${x}" y="78" width="22" height="18" fill="#cfe8ff" stroke="#fff" stroke-width="2"/>`).join('')}<path d="M120 22V4" stroke="#444" stroke-width="2"/><path d="M120 4h18l-4 5 4 5h-18z" fill="#e63946"/>`) },
    { name: 'Robot', src: svg(`viewBox="0 0 240 160"><rect width="240" height="160" fill="#eef1f6"/><rect x="80" y="40" width="80" height="62" rx="12" fill="#5b7fc7"/><circle cx="104" cy="70" r="10" fill="#fff"/><circle cx="136" cy="70" r="10" fill="#fff"/><circle cx="104" cy="70" r="4" fill="#1d2733"/><circle cx="136" cy="70" r="4" fill="#1d2733"/><path d="M120 40V24" stroke="#5b7fc7" stroke-width="4"/><circle cx="120" cy="20" r="6" fill="#f2b632"/><rect x="92" y="106" width="56" height="40" rx="6" fill="#47669f"/><rect x="104" y="114" width="32" height="8" rx="3" fill="#9fd3a8"/>`) }
  ];
  const SHAPES = [
    { name: 'Rectangle', src: svg(`viewBox="0 0 120 80"><rect x="3" y="3" width="114" height="74" fill="#4472c4" stroke="#2f528f" stroke-width="3"/>`) },
    { name: 'Oval', src: svg(`viewBox="0 0 120 80"><ellipse cx="60" cy="40" rx="56" ry="36" fill="#4472c4" stroke="#2f528f" stroke-width="3"/>`) },
    { name: 'Arrow', src: svg(`viewBox="0 0 120 80"><path d="M4 26h68V6l44 34-44 34V54H4z" fill="#4472c4" stroke="#2f528f" stroke-width="3" stroke-linejoin="round"/>`) },
    { name: 'Star', src: svg(`viewBox="0 0 120 80"><path d="M60 4l10 24h26l-21 15 8 25-23-15-23 15 8-25-21-15h26z" fill="#4472c4" stroke="#2f528f" stroke-width="3" stroke-linejoin="round"/>`) }
  ];
  const TEMPLATES = {
    blank: { name: 'Blank document', html: '<p><br></p>' },
    letter: { name: 'Simple letter', html: '<p>[Your address]</p><p>[Date]</p><p>Dear [Name],</p><p>[Start typing your letter here.]</p><p>Kind regards,</p><p>[Your name]</p>' },
    report: { name: 'Report', html: '<h1 class="mw-title">Report title</h1><h1>Introduction</h1><p>[What the report is about.]</p><h1>Findings</h1><p>[What you found.]</p><h1>Conclusion</h1><p>[What it means.]</p>' }
  };

  // ── Reading the document (for task checks) ───────────────────────────
  const BLOCKS = 'p,h1,h2,h3,li,td,blockquote,div';
  function textNodes(root) {
    const out = [], w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) out.push(n);
    return out;
  }
  // Text nodes covering a phrase (case-insensitive, spaces normalised), or [] if absent.
  function phraseNodes(root, phrase) {
    const nodes = textNodes(root);
    let all = '', map = [];
    nodes.forEach(n => { const t = n.data.replace(/\s/g, ' '); map.push([all.length, all.length + t.length, n]); all += t; });
    const i = all.toLowerCase().indexOf(phrase.toLowerCase());
    if (i < 0) return [];
    const j = i + phrase.length;
    return map.filter(([a, b]) => b > i && a < j && b > a).map(x => x[2]).filter(n => n.data.trim());
  }
  // The innermost block holding the phrase.
  function blockOf(root, phrase) {
    const n = phraseNodes(root, phrase)[0];
    let el = n && n.parentElement;
    while (el && el !== root && !el.matches(BLOCKS)) el = el.parentElement;
    return el && el !== root ? el : null;
  }
  const css = n => getComputedStyle(n.nodeType === 3 ? n.parentElement : n);
  const isBold = n => parseInt(css(n).fontWeight, 10) >= 600;
  const isItalic = n => css(n).fontStyle === 'italic';
  function hasLine(n, root, kind) {
    for (let el = n.parentElement; el && el !== root.parentElement; el = el.parentElement)
      if ((getComputedStyle(el).textDecorationLine || '').includes(kind)) return true;
    return false;
  }
  // Font size in points: the nearest set size, else the paragraph style's size.
  function sizePt(n, root) {
    for (let el = n.nodeType === 3 ? n.parentElement : n; el && el !== root; el = el.parentElement) {
      const fs = el.style && el.style.fontSize;
      if (fs) return fs.endsWith('pt') ? parseFloat(fs) : fs.endsWith('px') ? Math.round(parseFloat(fs) * 0.75 * 2) / 2 : null;
      if (el.matches('h1.mw-title')) return 28;
      if (el.matches('h1')) return 16;
      if (el.matches('h2')) return 13;
    }
    return 11;
  }
  const rgb = c => (c.match(/\d+(\.\d+)?/g) || []).map(Number);
  const fam = n => css(n).fontFamily.split(',')[0].replace(/["']/g, '').trim();
  const allOf = (root, phrase, test) => { const ns = phraseNodes(root, phrase); return ns.length > 0 && ns.every(n => test(n)); };
  const wordsIn = el => (el.innerText || el.textContent || '').trim().split(/\s+/).filter(Boolean).length;

  // ── Task sets ─────────────────────────────────────────────────────────
  const SETS = {
    ribbon: {
      title: 'Try it: a working Word window',
      start: { name: 'Document1', html: '<p>My School Trip</p><p>Last Friday our Grade 8 class visited the science centre. We left school by bus at 7:30 and arrived just after nine.</p><p>The best part was the robotics workshop, where we programmed a small robot to follow a black line on the floor.</p><p>Things I learned:</p><p>Robots follow instructions in order.</p><p>Sensors let a robot react to the world around it.</p>' },
      tasks: [
        { id: 'bold', text: 'Make the title “My School Trip” bold.', hint: 'Home › Font › B', check: c => allOf(c.doc, 'My School Trip', isBold) },
        { id: 'h1', text: 'Give the title the Heading 1 style.', hint: 'Home › Styles', check: c => { const b = c.block('My School Trip'); return !!b && b.tagName === 'H1' && !b.classList.contains('mw-title'); } },
        { id: 'centre', text: 'Centre the title.', hint: 'Home › Paragraph', check: c => { const b = c.block('My School Trip'); return !!b && css(b).textAlign === 'center'; } },
        { id: 'size', text: 'Make the paragraph that starts “Last Friday” size 14.', hint: 'Home › Font › font size box', check: c => allOf(c.doc, 'Last Friday our Grade 8 class visited the science centre', n => sizePt(n, c.doc) === 14) },
        { id: 'table', text: 'Insert a table with 3 columns and 3 rows.', hint: 'Insert › Tables › Table', check: c => [...c.doc.querySelectorAll('table')].some(t => t.rows.length === 3 && [...t.rows].every(r => r.cells.length === 3)) },
        { id: 'landscape', text: 'Turn the page sideways (Landscape).', hint: 'Layout › Page Setup › Orientation', check: c => c.st.layout.orientation === 'landscape' },
        { id: 'launcher', text: 'Open the Font dialog with the small arrow in the corner of the Font group.', hint: 'Home › Font › ↘ (bottom-right corner)', check: c => c.ev('fontDialog') },
        { id: 'saveas', text: 'Save the document with the name School_Trip.', hint: 'File › Save As (or F12)', check: c => c.file(/^school[ _-]?trip\.docx$/i) }
      ]
    },
    save: {
      title: 'Try it: create, save and open',
      start: { name: 'Old_Notes', html: '<p>These are somebody else’s old notes.</p><p>Start a new blank document for your own work.</p>' },
      tasks: [
        { id: 'new', text: 'Start a new blank document.', hint: 'File › New › Blank document', check: c => c.ev('new') },
        { id: 'type', text: 'Type a heading and at least 20 words of notes in it.', hint: 'Click on the page and type', check: c => c.ev('new') && wordsIn(c.doc) >= 20 },
        { id: 'save', text: 'Save it as My_Notes, as a Word Document (.docx).', hint: 'File › Save As (or F12)', check: c => c.file(/^my[ _-]?notes\.docx$/i) },
        { id: 'resave', text: 'Change something, then save again with Ctrl + S.', hint: 'Ctrl + S saves under the same name', check: c => c.ev('resave') },
        { id: 'pdf', text: 'Save a copy as a PDF.', hint: 'File › Save As › Save as type: PDF', check: c => c.file(/\.pdf$/i) },
        { id: 'txt', text: 'Save a copy as Plain Text (.txt), then open it. What happened to the formatting?', hint: 'File › Save As › Plain Text, then File › Open', check: c => c.ev('open:txt') },
        { id: 'reopen', text: 'Close the document, then open My_Notes again.', hint: 'File › Close, then File › Open', check: c => c.ev('reopen') }
      ]
    },
    format: {
      title: 'Try it: format an article',
      start: { name: 'Sleep_Article', html: '<p>Sleep: Your Secret Study Tool</p><p>Teenagers need 8 to 10 hours of sleep every night. While you sleep, your brain sorts and stores what you learned during the day.</p><p>Why sleep matters</p><p>Your body releases a hormone called melatonin when it gets dark, which tells you it is time to rest. Without enough sleep it is harder to concentrate, remember facts and stay calm.</p><p>Tips for better sleep</p><p>Go to bed at the same time every night.</p><p>Switch off screens an hour before bed.</p><p>Keep your room dark and cool.</p><p>Avoid energy drinks in the afternoon.</p>' },
      tasks: [
        { id: 'title', text: 'Apply the Title style to the first line.', hint: 'Home › Styles › Title', check: c => { const b = c.block('Sleep: Your Secret Study Tool'); return !!b && b.matches('h1.mw-title'); } },
        { id: 'heads', text: 'Apply Heading 1 to “Why sleep matters” and “Tips for better sleep”.', hint: 'Home › Styles › Heading 1', check: c => ['Why sleep matters', 'Tips for better sleep'].every(t => { const b = c.block(t); return b && b.tagName === 'H1' && !b.classList.contains('mw-title'); }) },
        { id: 'bold', text: 'Make “8 to 10 hours” bold with the shortcut Ctrl + B.', hint: 'Select the words, then press Ctrl + B', check: c => c.ev('kbd:bold') && allOf(c.doc, '8 to 10 hours', isBold) },
        { id: 'italic', text: 'Make the word “melatonin” italic.', hint: 'Home › Font › I (or Ctrl + I)', check: c => allOf(c.doc, 'melatonin', isItalic) },
        { id: 'underline', text: 'Underline “Switch off screens an hour before bed”.', hint: 'Home › Font › U (or Ctrl + U)', check: c => allOf(c.doc, 'Switch off screens an hour before bed', n => hasLine(n, c.doc, 'underline')) },
        { id: 'justify', text: 'Justify the paragraph that starts “Teenagers need”.', hint: 'Home › Paragraph (or Ctrl + J)', check: c => { const b = c.block('Teenagers need 8 to 10'); return !!b && css(b).textAlign === 'justify'; } },
        { id: 'bullets', text: 'Turn the four tips into a bulleted list.', hint: 'Select the four lines › Home › Paragraph › Bullets', check: c => ['Go to bed at the same time', 'Switch off screens', 'Keep your room dark', 'Avoid energy drinks'].every(t => { const b = c.block(t); return b && b.tagName === 'LI' && b.parentElement.tagName === 'UL'; }) },
        { id: 'colour', text: 'Change the colour of the title text (any colour but black).', hint: 'Home › Font › A with the colour bar', check: c => allOf(c.doc, 'Sleep: Your Secret Study Tool', n => { const [r, g, b] = rgb(css(n).color); return Math.abs(r - g) + Math.abs(g - b) + Math.abs(r - b) > 60 || r + g + b > 300; }) },
        { id: 'font', text: 'Change the font of the paragraph that starts “Your body releases” to Arial.', hint: 'Home › Font › font box', check: c => allOf(c.doc, 'Your body releases a hormone called melatonin', n => /arial/i.test(fam(n))) }
      ]
    }
  };

  // ── Paste cleaning: keep simple formatting, drop everything else ──────
  const KEEP_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'S', 'STRIKE', 'SPAN', 'P', 'H1', 'H2', 'H3', 'UL', 'OL', 'LI', 'TABLE', 'TBODY', 'THEAD', 'TR', 'TD', 'TH', 'BR', 'A', 'IMG', 'SUB', 'SUP', 'BLOCKQUOTE']);
  const DROP_TAGS = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'LINK', 'META', 'TITLE', 'TEMPLATE', 'SVG', 'MATH', 'FORM', 'INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'VIDEO', 'AUDIO', 'CANVAS', 'NOSCRIPT', 'HEAD']);
  const KEEP_CSS = ['font-weight', 'font-style', 'text-decoration', 'text-decoration-line', 'color', 'background-color', 'font-size', 'font-family', 'text-align', 'line-height'];
  function cleanHTML(html) {
    const t = document.createElement('template');
    t.innerHTML = html;
    (function walk(node) {
      [...node.childNodes].forEach(ch => {
        if (ch.nodeType === 8) { ch.remove(); return; }
        if (ch.nodeType !== 1) return;
        if (DROP_TAGS.has(ch.tagName)) { ch.remove(); return; }
        walk(ch);
        if (!KEEP_TAGS.has(ch.tagName)) { ch.replaceWith(...ch.childNodes); return; }
        const keep = {};
        KEEP_CSS.forEach(p => { const v = ch.style.getPropertyValue(p); if (v && !/url\(|expression/i.test(v)) keep[p] = v; });
        const href = ch.getAttribute('href'), src = ch.getAttribute('src'), cls = ch.getAttribute('class');
        [...ch.attributes].forEach(a => ch.removeAttribute(a.name));
        Object.entries(keep).forEach(([p, v]) => ch.style.setProperty(p, v));
        if (ch.tagName === 'A' && href && /^(https?:|mailto:)/i.test(href)) { ch.setAttribute('href', href); ch.setAttribute('target', '_blank'); ch.setAttribute('rel', 'noopener'); }
        if (ch.tagName === 'IMG') { if (src && /^data:image\/(png|jpe?g|gif|webp|svg\+xml)[;,]/i.test(src)) ch.setAttribute('src', src); else { ch.remove(); return; } }
        if (ch.tagName === 'H1' && cls && /\bmw-title\b/.test(cls)) ch.className = 'mw-title';
      });
    })(t.content);
    return t.innerHTML;
  }

  function store(key, val) { try { if (val === undefined) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; } }
  function load(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; } }
  const icons = () => { if (window.lucide) window.lucide.createIcons(); };

  // ══════════════════════════════════════════════════════════════════════
  function mount(host) {
    if (host.dataset.mounted) return;
    const setKey = SETS[host.dataset.set] ? host.dataset.set : 'ribbon';
    const SET = SETS[setKey], KEY = 'mw_v1_' + setKey;
    host.dataset.mounted = '1';

    const fresh = () => ({ name: SET.start.name, type: 'docx', savedOnce: false, dirty: false, open: true,
      layout: { orientation: 'portrait', margins: 'normal', size: 'A4', columns: 1 },
      header: '', footer: '', headerOn: false, footerOn: false, html: SET.start.html,
      files: {}, events: [], done: [], ruler: false });
    let st = Object.assign(fresh(), load(KEY) || {});
    let zoom = null, zoomAuto = true, tab = 'home', savedRange = null, undo = [], redo = [], lastTypeSnap = 0, clip = '', pendingPt = null, warnedFull = false;

    host.innerHTML = `
      <div class="mw">
        <div class="mw-intro"><span class="mw-intro-title">${esc(SET.title)}</span>
          <span class="mw-intro-note">A practice copy of Microsoft Word: it can't open or save real files on your computer. Best on a computer.</span></div>
        <div class="mw-tasks"></div>
        <div class="mw-win">
          <div class="mw-titlebar">
            <div class="mw-qat">
              <button type="button" data-cmd="save" title="Save (Ctrl+S)" aria-label="Save">${ic('save')}</button>
              <button type="button" data-cmd="undo" title="Undo (Ctrl+Z)" aria-label="Undo">${ic('undo-2')}</button>
              <button type="button" data-cmd="redo" title="Redo (Ctrl+Y)" aria-label="Redo">${ic('redo-2')}</button>
            </div>
            <div class="mw-docname"></div>
            <div class="mw-saved"></div>
          </div>
          <div class="mw-tabs" role="tablist" aria-label="Ribbon tabs"></div>
          <div class="mw-ribbon" role="toolbar" aria-label="Ribbon"></div>
          <div class="mw-ruler" hidden><div class="mw-ruler-in"></div></div>
          <div class="mw-canvas">
            <div class="mw-page" data-ml-no-theme>
              <div class="mw-hf mw-header off" contenteditable="true" data-ph="Header" data-ml-no-theme aria-label="Header"></div>
              <div class="mw-doc" contenteditable="true" spellcheck="true" data-ml-no-theme role="textbox" aria-multiline="true" aria-label="Document"></div>
              <div class="mw-hf mw-footer off" contenteditable="true" data-ph="Footer" data-ml-no-theme aria-label="Footer"></div>
            </div>
            <div class="mw-closed" hidden><p>No document is open.</p><div><button type="button" class="mw-btn" data-cmd="backstage" data-arg="new">New</button><button type="button" class="mw-btn quiet" data-cmd="backstage" data-arg="open">Open</button></div></div>
          </div>
          <div class="mw-status"><span class="mw-pages"></span><span class="mw-words"></span><span class="mw-sp"></span>
            <span class="mw-zoom"><button type="button" data-cmd="zoom" data-arg="-10" aria-label="Zoom out">−</button><span class="mw-zoom-v"></span><button type="button" data-cmd="zoom" data-arg="10" aria-label="Zoom in">+</button></span></div>
          <input type="file" accept="image/*" class="mw-upload" hidden>
        </div>
      </div>`;
    const $ = s => host.querySelector(s);
    const win = $('.mw-win'), ribbon = $('.mw-ribbon'), tabs = $('.mw-tabs'), canvas = $('.mw-canvas'), page = $('.mw-page'),
          doc = $('.mw-doc'), header = $('.mw-header'), footer = $('.mw-footer'), tasksEl = $('.mw-tasks');
    document.execCommand('defaultParagraphSeparator', false, 'p');

    // ── State ↔ page ──
    function paint() {
      doc.innerHTML = st.html || '<p><br></p>';
      header.innerHTML = st.header; footer.innerHTML = st.footer;
      layout(); title(); status(); tasks();
    }
    function snapshot() { return { html: doc.innerHTML, layout: Object.assign({}, st.layout), header: header.innerHTML, footer: footer.innerHTML, headerOn: st.headerOn, footerOn: st.footerOn }; }
    function restoreSnap(s) {
      doc.innerHTML = s.html; header.innerHTML = s.header; footer.innerHTML = s.footer;
      st.layout = s.layout; st.headerOn = s.headerOn; st.footerOn = s.footerOn;
      layout(); caretEnd();
    }
    function snap() { undo.push(snapshot()); if (undo.length > 100) undo.shift(); redo = []; }
    // Saved to this browser straight away after a command; typing is saved after a short pause.
    let persistT = 0;
    function persistNow() {
      clearTimeout(persistT);
      st.html = doc.innerHTML; st.header = header.innerHTML; st.footer = footer.innerHTML;
      if (!store(KEY, st) && !warnedFull) { warnedFull = true; toast('This document is too big to keep after a reload (try a smaller picture).'); }
    }
    function persist() { clearTimeout(persistT); persistT = setTimeout(persistNow, 300); }
    window.addEventListener('pagehide', () => { if (host.isConnected) persistNow(); });
    function changed(opts) {
      if (!(opts && opts.clean)) st.dirty = true;
      title(); status(); refresh();
      if (opts && opts.typing) persist(); else persistNow();
      checkSoon();
    }

    // ── Layout: paper size, orientation, margins, columns, zoom ──
    function pageMM() { const [w, h] = PAPER[st.layout.size].mm; return st.layout.orientation === 'landscape' ? [h, w] : [w, h]; }
    function layout() {
      const [w, h] = pageMM(), m = MARGINS[st.layout.margins];
      page.classList.toggle('landscape', st.layout.orientation === 'landscape');
      header.classList.toggle('off', !st.headerOn); footer.classList.toggle('off', !st.footerOn);
      doc.style.columnCount = st.layout.columns > 1 ? st.layout.columns : '';
      doc.style.columnGap = st.layout.columns > 1 ? 12.7 * PX + 'px' : '';
      // Phones: the text reflows to the screen, like Word's mobile view, instead of a tiny page.
      win.classList.toggle('mw-narrow', narrow());
      if (narrow()) {
        Object.assign(page.style, { width: '100%', minHeight: '100%', padding: '30px 16px', zoom: 1 });
        [header, footer].forEach(el => { el.style.left = '16px'; el.style.right = '16px'; });
        header.style.top = '6px'; footer.style.bottom = '6px';
        $('.mw-zoom-v').textContent = 'Mobile view';
        return;
      }
      if (zoom == null) {
        const avail = canvas.clientWidth - 44;
        zoom = avail > 0 ? Math.max(40, Math.min(100, Math.floor(avail / (w * PX) * 10) * 10)) : 80;
      }
      Object.assign(page.style, { width: w * PX + 'px', minHeight: h * PX + 'px', padding: `${m.t * PX}px ${m.r * PX}px ${m.b * PX}px ${m.l * PX}px`, zoom: zoom / 100 });
      [header, footer].forEach(el => { el.style.left = m.l * PX + 'px'; el.style.right = m.r * PX + 'px'; });
      header.style.top = Math.max(6, m.t * PX / 2 - 8) + 'px';
      footer.style.bottom = Math.max(6, m.b * PX / 2 - 8) + 'px';
      $('.mw-zoom-v').textContent = zoom + '%';
      ruler();
    }
    const narrow = () => canvas.clientWidth > 0 && canvas.clientWidth < 520;
    function ruler() {
      const r = $('.mw-ruler'); r.hidden = !st.ruler || narrow();
      if (r.hidden) return;
      const [w] = pageMM(), m = MARGINS[st.layout.margins], z = zoom / 100, inner = $('.mw-ruler-in');
      const left = page.getBoundingClientRect().left - canvas.getBoundingClientRect().left + canvas.scrollLeft;
      const cm = Math.floor(w / 10);
      inner.style.cssText = `position:relative;height:100%;width:${canvas.scrollWidth}px`;
      inner.innerHTML = `<div style="position:absolute;top:3px;bottom:3px;left:${left}px;width:${w * PX * z}px;background:#3a414b"></div>
        <div style="position:absolute;top:3px;bottom:3px;left:${left + m.l * PX * z}px;width:${(w - m.l - m.r) * PX * z}px;background:#e9edf2"></div>` +
        Array.from({ length: cm + 1 }, (_, i) => `<span style="position:absolute;top:3px;left:${left + i * 10 * PX * z}px;transform:translateX(-50%);font:9px/14px sans-serif;color:#556070">${i || ''}</span>`).join('');
      r.scrollLeft = canvas.scrollLeft;
    }
    canvas.addEventListener('scroll', () => { if (st.ruler) $('.mw-ruler').scrollLeft = canvas.scrollLeft; });

    function title() {
      $('.mw-docname').innerHTML = st.open ? `<b>${esc(st.name)}</b><span>${st.savedOnce ? '.docx' : ''} – Word</span>` : '<span>Word</span>';
      $('.mw-saved').textContent = !st.open ? '' : st.dirty || !st.savedOnce ? 'Not saved' : 'Saved';
    }
    function status() {
      if (!st.open) { $('.mw-pages').textContent = ''; $('.mw-words').textContent = ''; return; }
      const h = pageMM()[1] * PX * (narrow() ? 1 : zoom / 100), breaks = doc.querySelectorAll('.mw-break').length;
      const pages = Math.max(1, Math.ceil(page.getBoundingClientRect().height / h - 0.02)) + breaks;
      const n = wordsIn(doc);
      $('.mw-pages').textContent = `Page 1 of ${pages}`;
      $('.mw-words').textContent = `${n} word${n === 1 ? '' : 's'}`;
    }

    // ── Selection ──
    const inDoc = n => n && (doc.contains(n) || header.contains(n) || footer.contains(n));
    function onSel() {
      if (!host.isConnected) { document.removeEventListener('selectionchange', onSel); return; }
      const s = getSelection();
      if (s.rangeCount && inDoc(s.anchorNode)) { savedRange = s.getRangeAt(0).cloneRange(); refresh(); }
    }
    document.addEventListener('selectionchange', onSel);
    function editable() { return savedRange && (header.contains(savedRange.startContainer) ? header : footer.contains(savedRange.startContainer) ? footer : doc) || doc; }
    function restore() {
      // The live selection wins when it is in the document (selectionchange may not have fired yet).
      const live = getSelection();
      if (live.rangeCount && inDoc(live.anchorNode)) savedRange = live.getRangeAt(0).cloneRange();
      const el = editable();
      el.focus({ preventScroll: true });
      const s = getSelection();
      if (savedRange && el.contains(savedRange.startContainer)) { s.removeAllRanges(); s.addRange(savedRange); }
      else if (!s.rangeCount || !el.contains(s.anchorNode)) caretEnd();
    }
    function caretEnd() {
      const r = document.createRange(); r.selectNodeContents(doc); r.collapse(false);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r); savedRange = r.cloneRange();
    }
    function selBlocks() {
      const s = getSelection(); if (!s.rangeCount) return [];
      const r = s.getRangeAt(0);
      const found = [...doc.querySelectorAll('p,h1,h2,h3,li,blockquote,td')].filter(b => r.intersectsNode(b));
      return found.filter(b => !found.some(o => o !== b && b.contains(o)));
    }
    const exec = (c, v) => document.execCommand(c, false, v);

    // ── Ribbon ──
    const TABS = [['file', 'File'], ['home', 'Home'], ['insert', 'Insert'], ['layout', 'Layout'], ['review', 'Review'], ['view', 'View']];
    tabs.innerHTML = TABS.map(([k, l]) => `<button type="button" role="tab" class="mw-tab${k === 'file' ? ' file' : ''}" data-tab="${k}">${l}</button>`).join('');
    const rb = (cmd, iconName, label, opts = {}) => `<button type="button" class="mw-rb${opts.big ? ' big' : ''}" data-cmd="${cmd}"${opts.arg != null ? ` data-arg="${esc(opts.arg)}"` : ''} title="${esc(opts.tip || label)}" aria-label="${esc(opts.tip || label)}">${iconName ? ic(iconName) : ''}${opts.show ? `<span>${esc(label)}</span>` : ''}${opts.menu ? ic('chevron-down', 'mw-caret') : ''}</button>`;
    const group = (label, body, launcher) => `<div class="mw-group"><div class="mw-group-body">${body}</div><div class="mw-group-label">${label}</div>${launcher ? `<button type="button" class="mw-launcher" data-cmd="${launcher}" title="${label} settings: more options in a dialog box" aria-label="${label} settings">${ic('square-arrow-down-right')}</button>` : ''}</div>`;
    function panel(k) {
      if (k === 'home') return [
        group('Clipboard', `${rb('paste', 'clipboard-paste', 'Paste', { big: true, show: true, tip: 'Paste (Ctrl+V)' })}<div class="mw-col">${rb('cut', 'scissors', 'Cut', { show: true, tip: 'Cut (Ctrl+X)' })}${rb('copy', 'copy', 'Copy', { show: true, tip: 'Copy (Ctrl+C)' })}</div>`),
        group('Font', `<div class="mw-col"><div class="mw-row"><select class="mw-select font" data-cmd="fontName" aria-label="Font">${FONTS.map(f => `<option style="font-family:'${f}'">${f}</option>`).join('')}</select><select class="mw-select size" data-cmd="fontSize" aria-label="Font size">${SIZES.map(s => `<option${s === 11 ? ' selected' : ''}>${s}</option>`).join('')}</select></div>
          <div class="mw-row">${rb('bold', 'bold', 'Bold', { tip: 'Bold (Ctrl+B)' })}${rb('italic', 'italic', 'Italic', { tip: 'Italic (Ctrl+I)' })}${rb('underline', 'underline', 'Underline', { tip: 'Underline (Ctrl+U)' })}${rb('strike', 'strikethrough', 'Strikethrough')}
          <button type="button" class="mw-rb" data-menu="mark" title="Text highlight colour" aria-label="Text highlight colour"><span class="mw-rb-stack">${ic('highlighter')}<span class="mw-swatch" style="background:#ffff00"></span></span>${ic('chevron-down', 'mw-caret')}</button>
          <button type="button" class="mw-rb" data-menu="color" title="Font colour" aria-label="Font colour"><span class="mw-rb-stack">${ic('baseline')}<span class="mw-swatch" style="background:#c00000"></span></span>${ic('chevron-down', 'mw-caret')}</button>
          ${rb('clear', 'remove-formatting', 'Clear formatting', { tip: 'Clear all formatting' })}</div></div>`, 'fontDialog'),
        group('Paragraph', `<div class="mw-col"><div class="mw-row">${rb('ul', 'list', 'Bullets')}${rb('ol', 'list-ordered', 'Numbering')}${rb('outdent', 'indent-decrease', 'Decrease indent')}${rb('indent', 'indent-increase', 'Increase indent')}</div>
          <div class="mw-row">${rb('align', 'align-left', 'Align left', { arg: 'left', tip: 'Align left (Ctrl+L)' })}${rb('align', 'align-center', 'Centre', { arg: 'center', tip: 'Centre (Ctrl+E)' })}${rb('align', 'align-right', 'Align right', { arg: 'right', tip: 'Align right (Ctrl+R)' })}${rb('align', 'align-justify', 'Justify', { arg: 'justify', tip: 'Justify (Ctrl+J)' })}
          <button type="button" class="mw-rb" data-menu="spacing" title="Line spacing" aria-label="Line spacing">${ic('separator-horizontal')}${ic('chevron-down', 'mw-caret')}</button></div></div>`),
        group('Styles', `<div class="mw-styles">${[['normal', 'AaBbCc', 'font-size:11px'], ['title', 'AaB', 'font-size:20px'], ['h1', 'AaBbC', 'font-size:14px;color:#2f5496'], ['h2', 'AaBbC', 'font-size:12px;color:#2f5496']]
          .map(([s, sample, look]) => `<button type="button" class="mw-style" data-cmd="style" data-arg="${s}" title="${STYLE_NAMES[s]}" data-ml-no-theme><b style="${look}">${sample}</b><small>${STYLE_NAMES[s]}</small></button>`).join('')}</div>`),
        group('Editing', `<div class="mw-col">${rb('find', 'search', 'Find', { show: true, tip: 'Find (Ctrl+F)' })}${rb('selectAll', 'text-select', 'Select All', { show: true, tip: 'Select all (Ctrl+A)' })}</div>`)
      ].join('');
      if (k === 'insert') return [
        group('Pages', rb('pageBreak', 'separator-horizontal', 'Page Break', { big: true, show: true, tip: 'Page break (Ctrl+Enter)' })),
        group('Tables', `<button type="button" class="mw-rb big" data-menu="table" title="Insert a table">${ic('table')}<span>Table</span></button>`),
        group('Illustrations', `<button type="button" class="mw-rb big" data-menu="pics" title="Insert a picture">${ic('image')}<span>Pictures</span></button><button type="button" class="mw-rb big" data-menu="shapes" title="Insert a shape">${ic('shapes')}<span>Shapes</span></button>`),
        group('Links', rb('link', 'link', 'Link', { big: true, show: true, tip: 'Insert a link (Ctrl+K)' })),
        group('Header &amp; Footer', `<div class="mw-col">${rb('header', 'panel-top', 'Header', { show: true })}${rb('footer', 'panel-bottom', 'Footer', { show: true })}${rb('pageNumber', 'hash', 'Page Number', { show: true })}</div>`),
        group('Text', rb('date', 'calendar', 'Date &amp; Time', { big: true, show: true, tip: 'Insert today’s date' })),
        group('Symbols', `<button type="button" class="mw-rb big" data-menu="symbols" title="Insert a symbol">${ic('omega')}<span>Symbol</span></button>`)
      ].join('');
      if (k === 'layout') return group('Page Setup', [
        `<button type="button" class="mw-rb big" data-menu="margins" title="Margins">${ic('square-dashed-bottom')}<span>Margins</span></button>`,
        `<button type="button" class="mw-rb big" data-menu="orientation" title="Orientation: portrait or landscape">${ic(st.layout.orientation === 'landscape' ? 'rectangle-horizontal' : 'rectangle-vertical')}<span>Orientation</span></button>`,
        `<button type="button" class="mw-rb big" data-menu="size" title="Paper size">${ic('file-text')}<span>Size</span></button>`,
        `<button type="button" class="mw-rb big" data-menu="columns" title="Columns">${ic('columns-2')}<span>Columns</span></button>`].join(''));
      if (k === 'review') return group('Proofing', rb('wordCount', 'list-checks', 'Word Count', { big: true, show: true }));
      if (k === 'view') return [
        group('Show', `<button type="button" class="mw-rb big${st.ruler ? ' on' : ''}" data-cmd="ruler" title="Show or hide the ruler">${ic('ruler')}<span>Ruler</span></button>`),
        group('Zoom', `${rb('zoomTo', 'zoom-in', 'Zoom 100%', { big: true, show: true, arg: 100, tip: 'Zoom to 100%' })}${rb('zoomTo', 'maximize-2', 'Page Width', { big: true, show: true, arg: 'fit', tip: 'Fit the page width to the window' })}`)
      ].join('');
      return '';
    }
    function showTab(k) {
      if (k === 'file') { backstage('info'); return; }
      tab = k;
      tabs.querySelectorAll('.mw-tab').forEach(t => { const on = t.dataset.tab === k; t.classList.toggle('on', on); t.setAttribute('aria-selected', on); });
      ribbon.innerHTML = panel(k);
      icons(); refresh();
    }
    // Reflect the selection on the ribbon (Bold lit up, current font and size).
    function refresh() {
      if (tab !== 'home' || !savedRange) return;
      const q = c => { try { return document.queryCommandState(c); } catch (e) { return false; } };
      const on = (sel, v) => { const b = ribbon.querySelector(sel); if (b) b.classList.toggle('on', !!v); };
      on('[data-cmd="bold"]', q('bold')); on('[data-cmd="italic"]', q('italic')); on('[data-cmd="underline"]', q('underline')); on('[data-cmd="strike"]', q('strikeThrough'));
      on('[data-cmd="ul"]', q('insertUnorderedList')); on('[data-cmd="ol"]', q('insertOrderedList'));
      let n = savedRange.startContainer; if (n.nodeType === 1 && n.childNodes[savedRange.startOffset]) n = n.childNodes[savedRange.startOffset];
      const el = n.nodeType === 3 ? n.parentElement : n;
      if (!el || !doc.contains(el)) return;
      const block = el.closest(BLOCKS) || doc, align = getComputedStyle(block).textAlign;
      ['left', 'center', 'right', 'justify'].forEach(a => on(`[data-cmd="align"][data-arg="${a}"]`, (align === 'start' ? 'left' : align) === a));
      const f = ribbon.querySelector('.mw-select.font'), z = ribbon.querySelector('.mw-select.size');
      const fn = fam(el), match = FONTS.find(x => x.toLowerCase() === fn.toLowerCase());
      if (f) f.value = match || (/calibri|carlito/i.test(fn) ? 'Calibri' : f.value);
      if (z) { const pt = sizePt(n.nodeType === 3 ? n : (n.firstChild || n), doc); if (pt && SIZES.includes(pt)) z.value = String(pt); }
      const style = block.matches('h1.mw-title') ? 'title' : block.tagName === 'H1' ? 'h1' : block.tagName === 'H2' ? 'h2' : 'normal';
      ribbon.querySelectorAll('.mw-style').forEach(s => s.classList.toggle('on', s.dataset.arg === style));
    }

    // ── Menus ──
    let menuEl = null;
    function closeMenu() { if (menuEl) { menuEl.remove(); menuEl = null; } }
    function openMenu(btn, kind) {
      closeMenu();
      const items = (list) => list.map(([cmd, arg, label, note, on]) => `<button type="button" class="mw-menu-item" data-cmd="${cmd}" data-arg="${esc(arg)}">${on ? ic('check') : '<span style="width:15px"></span>'}${label}${note ? `<small>${note}</small>` : ''}</button>`).join('');
      let html = '';
      if (kind === 'color') html = `<div class="mw-menu-label">Font colour</div><div class="mw-swatches">${COLORS.map(c => `<button type="button" data-cmd="color" data-arg="${c}" style="background:${c}" title="${c}" aria-label="Colour ${c}"></button>`).join('')}</div>`;
      if (kind === 'mark') html = `<div class="mw-menu-label">Highlight</div>${MARKS.map(([n, c]) => `<button type="button" class="mw-menu-item" data-cmd="mark" data-arg="${c}"><span style="width:14px;height:14px;border:1px solid #666;background:${c === 'transparent' ? 'none' : c}"></span>${n}</button>`).join('')}`;
      if (kind === 'spacing') html = items(['1.0', '1.15', '1.5', '2.0', '3.0'].map(v => ['spacing', v, v, v === '1.15' ? 'Word’s default' : '']));
      if (kind === 'margins') html = items(Object.entries(MARGINS).map(([k, m]) => ['margins', k, m.label, m.note, st.layout.margins === k]));
      if (kind === 'orientation') html = items([['orientation', 'portrait', 'Portrait', 'tall', st.layout.orientation === 'portrait'], ['orientation', 'landscape', 'Landscape', 'wide', st.layout.orientation === 'landscape']]);
      if (kind === 'size') html = items(Object.entries(PAPER).map(([k, p]) => ['size', k, k, p.note, st.layout.size === k]));
      if (kind === 'columns') html = items([[1, 'One'], [2, 'Two'], [3, 'Three']].map(([n, l]) => ['columns', n, l, '', st.layout.columns === n]));
      if (kind === 'symbols') html = `<div class="mw-symbols">${SYMBOLS.map(s => `<button type="button" data-cmd="symbol" data-arg="${s}" aria-label="Insert ${s}">${s}</button>`).join('')}</div>`;
      if (kind === 'pics') html = `<div class="mw-menu-label">Stock images</div><div class="mw-pics">${PICS.map((p, i) => `<button type="button" data-cmd="picture" data-arg="${i}" title="${p.name}"><img src="${p.src}" alt="${p.name}"></button>`).join('')}</div><button type="button" class="mw-menu-item" data-cmd="upload">${ic('image')}This device…</button>`;
      if (kind === 'shapes') html = `<div class="mw-menu-label">Shapes</div><div class="mw-pics">${SHAPES.map((p, i) => `<button type="button" data-cmd="shape" data-arg="${i}" title="${p.name}"><img src="${p.src}" alt="${p.name}" style="object-fit:contain;padding:6px"></button>`).join('')}</div>`;
      if (kind === 'table') html = `<div class="mw-menu-label">Insert table</div><div class="mw-grid">${Array.from({ length: 48 }, (_, i) => `<span data-r="${Math.floor(i / 8) + 1}" data-c="${i % 8 + 1}"></span>`).join('')}</div><div class="mw-grid-label">Pick the size</div>`;
      menuEl = document.createElement('div');
      menuEl.className = 'mw-menu';
      menuEl.setAttribute('role', 'menu');
      menuEl.innerHTML = html;
      win.appendChild(menuEl);
      const wr = win.getBoundingClientRect(), br = btn.getBoundingClientRect();
      menuEl.style.top = br.bottom - wr.top + 2 + 'px';
      menuEl.style.left = Math.max(4, Math.min(br.left - wr.left, wr.width - menuEl.offsetWidth - 4)) + 'px';
      if (kind === 'table') {
        const cells = menuEl.querySelectorAll('.mw-grid span'), lab = menuEl.querySelector('.mw-grid-label');
        const mark = (r, c) => { cells.forEach(s => s.classList.toggle('on', +s.dataset.r <= r && +s.dataset.c <= c)); lab.textContent = r ? `${c} × ${r} table (${c} columns, ${r} rows)` : 'Pick the size'; };
        menuEl.addEventListener('mouseover', e => { const s = e.target.closest('span[data-r]'); if (s) mark(+s.dataset.r, +s.dataset.c); });
        menuEl.addEventListener('click', e => { const s = e.target.closest('span[data-r]'); if (s) { closeMenu(); run('table', s.dataset.r + 'x' + s.dataset.c); } });
      }
      icons();
      (menuEl.querySelector('button') || menuEl).focus?.();
    }
    document.addEventListener('mousedown', e => { if (menuEl && !menuEl.contains(e.target) && !e.target.closest('[data-menu]')) closeMenu(); });

    // ── Toast and dialogs ──
    let toastT = 0;
    function toast(msg) {
      let t = win.querySelector('.mw-toast');
      if (!t) { t = document.createElement('div'); t.className = 'mw-toast'; t.setAttribute('role', 'status'); win.appendChild(t); }
      t.textContent = msg; t.hidden = false;
      clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2600);
    }
    function dialog(titleText, body, buttons, onOpen) {
      const wrap = document.createElement('div');
      wrap.className = 'mw-dlg-wrap';
      wrap.innerHTML = `<div class="mw-dlg" role="dialog" aria-modal="true" aria-label="${esc(titleText)}"><div class="mw-dlg-head">${esc(titleText)}<button type="button" data-x aria-label="Close">${ic('x')}</button></div>
        <div class="mw-dlg-body">${body}</div><div class="mw-dlg-foot">${buttons.map((b, i) => `<button type="button" class="mw-btn${i ? ' quiet' : ''}" data-b="${i}">${b.label}</button>`).join('')}</div></div>`;
      win.appendChild(wrap); icons();
      const close = () => { wrap.remove(); restore(); };
      wrap.querySelector('[data-x]').onclick = close;
      wrap.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } if (e.key === 'Enter' && e.target.tagName === 'INPUT') wrap.querySelector('[data-b="0"]').click(); });
      wrap.querySelectorAll('[data-b]').forEach(b => b.onclick = () => { const r = buttons[+b.dataset.b].run; if (r && r(wrap) === false) return; wrap.remove(); restore(); });
      if (onOpen) onOpen(wrap);
      (wrap.querySelector('input,select') || wrap.querySelector('[data-b="0"]')).focus();
      return wrap;
    }
    function fontDialog() {
      ev('fontDialog');
      const cur = savedRange && savedRange.startContainer;
      const n = cur && (cur.nodeType === 3 ? cur : cur.firstChild || cur);
      const inside = n && n !== doc && doc.contains(n);
      const f0 = inside ? fam(n) : 'Calibri', s0 = inside ? sizePt(n, doc) || 11 : 11;
      dialog('Font', `
        <div class="mw-dlg-row">
          <label>Font<select class="mw-select" data-f>${FONTS.map(f => `<option${f.toLowerCase() === f0.toLowerCase() ? ' selected' : ''}>${f}</option>`).join('')}</select></label>
          <label>Font style<select class="mw-select" data-st><option value="">Regular</option><option value="i">Italic</option><option value="b">Bold</option><option value="bi">Bold Italic</option></select></label>
          <label>Size<select class="mw-select" data-s>${SIZES.map(s => `<option${s === s0 ? ' selected' : ''}>${s}</option>`).join('')}</select></label>
        </div>
        <label>Font colour<select class="mw-select" data-c><option value="">Automatic</option>${COLORS.slice(1).map(c => `<option value="${c}" style="color:${c}">${c}</option>`).join('')}</select></label>
        <div class="mw-dlg-checks"><label><input type="checkbox" data-u> Underline</label><label><input type="checkbox" data-x2> Strikethrough</label><label><input type="checkbox" data-sup> Superscript</label><label><input type="checkbox" data-sub> Subscript</label></div>
        <label>Preview<div class="mw-dlg-preview" data-ml-no-theme data-p>AaBbYyZz</div></label>`,
        [{ label: 'OK', run: w => {
          const v = s => w.querySelector(s);
          restore(); snap();
          exec('styleWithCSS', true); exec('fontName', v('[data-f]').value);
          setSize(+v('[data-s]').value);
          const style = v('[data-st]').value;
          if (style.includes('b') !== queryState('bold')) exec('bold');
          if (style.includes('i') !== queryState('italic')) exec('italic');
          if (v('[data-u]').checked && !queryState('underline')) exec('underline');
          if (v('[data-x2]').checked && !queryState('strikeThrough')) exec('strikeThrough');
          if (v('[data-sup]').checked) exec('superscript'); else if (v('[data-sub]').checked) exec('subscript');
          if (v('[data-c]').value) exec('foreColor', v('[data-c]').value);
          changed();
        } }, { label: 'Cancel' }],
        w => {
          const upd = () => {
            const v = s => w.querySelector(s), p = v('[data-p]'), st2 = v('[data-st]').value;
            Object.assign(p.style, { fontFamily: `'${v('[data-f]').value}'`, fontSize: v('[data-s]').value + 'pt', fontWeight: st2.includes('b') ? 700 : 400, fontStyle: st2.includes('i') ? 'italic' : 'normal', color: v('[data-c]').value || '#1d1d1d',
              textDecoration: [v('[data-u]').checked && 'underline', v('[data-x2]').checked && 'line-through'].filter(Boolean).join(' ') || 'none' });
          };
          w.addEventListener('input', upd); w.addEventListener('change', upd); upd();
        });
    }
    const queryState = c => { try { return document.queryCommandState(c); } catch (e) { return false; } };
    function linkDialog() {
      const s = getSelection(), text = s.rangeCount ? s.toString() : '';
      dialog('Insert Hyperlink', `<label>Text to display<input class="mw-input" data-t value="${esc(text)}"></label><label>Address<input class="mw-input" data-a placeholder="https://www.example.co.za"></label><span class="mw-msg warn" data-m></span>`,
        [{ label: 'OK', run: w => {
          let url = w.querySelector('[data-a]').value.trim(), t = w.querySelector('[data-t]').value.trim();
          if (!url) { w.querySelector('[data-m]').textContent = 'Type the web address the link should go to.'; return false; }
          if (!/^(https?:|mailto:)/i.test(url)) url = 'https://' + url.replace(/^\/+/, '');
          restore(); snap();
          exec('insertHTML', `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(t || url)}</a>&nbsp;`);
          ev('link'); changed();
        } }, { label: 'Cancel' }]);
    }
    function wordCountDialog() {
      const text = doc.innerText || '', paras = [...doc.querySelectorAll('p,h1,h2,li')].filter(p => p.textContent.trim()).length;
      dialog('Word Count', `<dl><dt>Pages</dt><dd>${$('.mw-pages').textContent.replace('Page 1 of ', '')}</dd><dt>Words</dt><dd>${wordsIn(doc)}</dd><dt>Characters (no spaces)</dt><dd>${text.replace(/\s/g, '').length}</dd><dt>Characters (with spaces)</dt><dd>${text.replace(/\n/g, '').length}</dd><dt>Paragraphs</dt><dd>${paras}</dd></dl>`, [{ label: 'Close' }]);
      ev('wordCount');
    }
    function findDialog() {
      dialog('Find', `<label>Find what<input class="mw-input" data-q></label><span class="mw-msg" data-m></span>`, [{ label: 'Find Next', run: w => {
        const q = w.querySelector('[data-q]').value, m = w.querySelector('[data-m]');
        if (!q) return false;
        const nodes = phraseNodes(doc, q);
        if (!nodes.length) { m.className = 'mw-msg warn'; m.textContent = `Word can't find “${q}”.`; return false; }
        const first = nodes[0], i = first.data.toLowerCase().indexOf(q.toLowerCase());
        const r = document.createRange();
        if (i >= 0 && nodes.length === 1) { r.setStart(first, i); r.setEnd(first, i + q.length); } else { r.setStart(first, 0); r.setEndAfter(nodes[nodes.length - 1]); }
        savedRange = r; ev('find');
      } }, { label: 'Cancel' }]);
    }
    // Ask to save before something replaces the open document.
    function askSave(then) {
      if (!st.open || !st.dirty) { then(); return; }
      dialog('Microsoft Word', `<p style="margin:0">Do you want to save the changes you made to <b>${esc(st.name)}</b>?</p>`, [
        { label: 'Save', run: () => { if (st.savedOnce) { saveTo(st.name, 'docx', true); setTimeout(then); } else { setTimeout(() => backstage('saveas', then)); } } },
        { label: 'Don’t Save', run: () => { setTimeout(then); } },
        { label: 'Cancel' }]);
    }

    // ── Files ──
    const fileKey = (name, type) => `${name}.${type}`;
    function cleanName(n) { return n.trim().replace(/\.(docx|pdf|txt)$/i, '').replace(/[\\/:*?"<>|]/g, '').slice(0, 60); }
    function saveTo(name, type, quiet) {
      const plain = [...doc.querySelectorAll('p,h1,h2,h3,li,td')].map(b => b.innerText.trim()).filter(Boolean);
      const rec = { type, t: Date.now(), words: wordsIn(doc), layout: Object.assign({}, st.layout), header: header.innerHTML, footer: footer.innerHTML,
        html: type === 'txt' ? plain.map(t => `<p>${esc(t)}</p>`).join('') || '<p><br></p>' : doc.innerHTML };
      const resave = type === 'docx' && st.savedOnce && name === st.name;
      st.files[fileKey(name, type)] = rec;
      ev('save:' + type);
      if (type === 'docx') { st.name = name; st.savedOnce = true; st.dirty = false; if (resave) ev('resave'); }
      if (!quiet) toast(type === 'docx' ? `Saved as ${name}.docx` : type === 'pdf' ? `Saved a PDF copy: ${name}.pdf. You are still editing the Word document.` : `Saved a plain text copy: ${name}.txt. Text files keep words only — no formatting.`);
      changed({ clean: true });
    }
    function save() {
      if (!st.open) return;
      if (st.savedOnce) saveTo(st.name, 'docx'); else backstage('saveas');
    }
    function openFile(key) {
      const f = st.files[key]; if (!f) return;
      const wasClosed = !st.open;
      const [name, type] = [key.replace(/\.[a-z]+$/, ''), key.split('.').pop()];
      undo = []; redo = [];
      st.open = true; st.name = type === 'docx' ? name : key; st.savedOnce = type === 'docx'; st.dirty = false;
      st.layout = Object.assign({}, f.layout); st.header = f.header || ''; st.footer = f.footer || ''; st.headerOn = !!st.header; st.footerOn = !!st.footer;
      doc.innerHTML = f.html; header.innerHTML = st.header; footer.innerHTML = st.footer;
      ev('open:' + type); if (wasClosed && type === 'docx') ev('reopen');
      closeBackstage(); openState(); layout(); changed({ clean: true });
      if (type === 'txt') toast(`Opened ${key}: plain text has no bold, headings or colours.`);
    }
    function newDoc(tpl) {
      undo = []; redo = [];
      const n = Object.keys(st.files).length + 2;
      Object.assign(st, { open: true, name: 'Document' + n, savedOnce: false, dirty: false, headerOn: false, footerOn: false, layout: { orientation: 'portrait', margins: 'normal', size: 'A4', columns: 1 } });
      doc.innerHTML = TEMPLATES[tpl].html; header.innerHTML = ''; footer.innerHTML = '';
      ev('new'); closeBackstage(); openState(); layout(); changed({ clean: true }); caretEnd(); doc.focus();
    }
    function closeDoc() { st.open = false; ev('close'); closeBackstage(); openState(); changed({ clean: true }); }
    function openState() {
      page.hidden = !st.open; $('.mw-closed').hidden = st.open;
      ribbon.style.pointerEvents = st.open ? '' : 'none'; ribbon.style.opacity = st.open ? '' : '0.45';
      title(); status();
    }

    // ── Backstage (File tab) ──
    let backEl = null;
    function closeBackstage() { if (backEl) { backEl.remove(); backEl = null; } }
    function backstage(view, after) {
      closeMenu(); closeBackstage();
      ev('file');
      backEl = document.createElement('div');
      backEl.className = 'mw-back';
      const NAV = [['info', 'info', 'Info'], ['new', 'file-plus', 'New'], ['open', 'folder-open', 'Open'], null, ['save', 'save', 'Save'], ['saveas', 'file-output', 'Save As'], ['print', 'printer', 'Print'], ['export', 'file-down', 'Export'], null, ['close', 'x', 'Close']];
      backEl.innerHTML = `<nav class="mw-back-nav"><button type="button" data-v="back">${ic('arrow-left')}Back</button>${NAV.map(n => n ? `<button type="button" data-v="${n[0]}"${!st.open && ['save', 'saveas', 'print', 'export', 'close', 'info'].includes(n[0]) ? ' disabled style="opacity:.45"' : ''}>${ic(n[1])}${n[2]}</button>` : '<hr>').join('')}</nav><div class="mw-back-main"></div>`;
      win.appendChild(backEl);
      const main = backEl.querySelector('.mw-back-main');
      const show = v => {
        backEl.querySelectorAll('[data-v]').forEach(b => b.classList.toggle('on', b.dataset.v === v));
        const files = Object.entries(st.files).sort((a, b) => b[1].t - a[1].t);
        const when = t => new Date(t).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
        if (v === 'info') main.innerHTML = `<h3>Info</h3><dl><dt>Name</dt><dd>${esc(st.name)}${st.savedOnce ? '.docx' : ' (not saved yet)'}</dd><dt>Type</dt><dd>Word Document</dd><dt>Words</dt><dd>${wordsIn(doc)}</dd><dt>Pages</dt><dd>${$('.mw-pages').textContent.replace('Page 1 of ', '')}</dd><dt>Paper</dt><dd>${st.layout.size}, ${st.layout.orientation}</dd><dt>Saved in</dt><dd>This practice window (not your computer)</dd></dl>`;
        if (v === 'new') main.innerHTML = `<h3>New</h3><div class="mw-tiles">${Object.entries(TEMPLATES).map(([k, t]) => `<button type="button" class="mw-tile" data-new="${k}"><i></i><span>${t.name}</span></button>`).join('')}</div>`;
        if (v === 'open') main.innerHTML = `<h3>Open</h3>${files.length ? `<p>Files saved in this practice window:</p><ul class="mw-files">${files.map(([k, f]) => `<li><button type="button" data-open="${esc(k)}"${f.type === 'pdf' ? ' disabled title="PDFs open in a PDF reader. To edit, open the Word version."' : ''}><span class="mw-ext ${f.type}">${f.type.toUpperCase()}</span>${esc(k)}<small>${f.type === 'pdf' ? 'Opens in a PDF reader' : `${f.words} words · ${when(f.t)}`}</small></button></li>`).join('')}</ul>` : '<p>No files yet. Use Save As to save one first.</p>'}`;
        if (v === 'save') { if (st.savedOnce) { saveTo(st.name, 'docx'); closeBackstage(); return; } v = 'saveas'; }
        if (v === 'saveas' || v === 'export') {
          const pdf = v === 'export';
          backEl.querySelectorAll('[data-v]').forEach(b => b.classList.toggle('on', b.dataset.v === v));
          main.innerHTML = `<h3>${pdf ? 'Export' : 'Save As'}</h3><div class="mw-form">
            <label>File name<input class="mw-input" data-name value="${esc(st.name)}" spellcheck="false"></label>
            <label>Save as type<select class="mw-select" data-type style="height:32px"><option value="docx"${pdf ? '' : ' selected'}>Word Document (*.docx)</option><option value="pdf"${pdf ? ' selected' : ''}>PDF (*.pdf)</option><option value="txt">Plain Text (*.txt)</option></select></label>
            <p data-note></p><button type="button" class="mw-btn" data-saveas>Save</button><span class="mw-msg warn" data-m></span></div>`;
          const note = () => { main.querySelector('[data-note]').textContent = { docx: 'Keeps all formatting. You can keep editing it in Word.', pdf: 'Looks the same on any device and is hard to edit — good for handing in a final copy.', txt: 'Keeps only the words. Bold, headings, colours, tables and pictures are lost.' }[main.querySelector('[data-type]').value]; };
          main.querySelector('[data-type]').onchange = note; note();
          const go = () => {
            const name = cleanName(main.querySelector('[data-name]').value), type = main.querySelector('[data-type]').value;
            if (!name) { main.querySelector('[data-m]').textContent = 'Type a file name first.'; return; }
            saveTo(name, type); closeBackstage(); restore(); if (after) after();
          };
          main.querySelector('[data-saveas]').onclick = go;
          main.querySelector('[data-name]').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
          setTimeout(() => main.querySelector('[data-name]').select());
        }
        if (v === 'print') {
          const [w, h] = pageMM(), scale = (st.layout.orientation === 'landscape' ? 240 : 170) / (w * PX);
          main.innerHTML = `<h3>Print</h3><div class="mw-print"><div class="mw-print-preview${st.layout.orientation === 'landscape' ? ' landscape' : ''}" data-ml-no-theme><div style="width:${w * PX}px;height:${h * PX}px;transform:scale(${scale})"></div></div>
            <div class="mw-form"><label>Copies<input class="mw-input" type="number" min="1" max="99" value="1" style="width:80px"></label><p>Printer: <b>School printer</b><br>Paper: ${st.layout.size}, ${st.layout.orientation}</p><button type="button" class="mw-btn" data-print>${ic('printer')} Print</button><span class="mw-msg" data-m></span></div></div>`;
          const pv = main.querySelector('.mw-print-preview > div');
          const clone = page.cloneNode(true); clone.querySelectorAll('[contenteditable]').forEach(e => e.removeAttribute('contenteditable')); clone.style.zoom = 1; clone.style.boxShadow = 'none';
          pv.appendChild(clone);
          main.querySelector('[data-print]').onclick = () => { ev('print'); main.querySelector('[data-m]').textContent = 'This practice window can’t reach a printer. In Word, Print sends the document to the printer you chose.'; };
        }
        if (v === 'close') { askSave(() => closeDoc()); closeBackstage(); return; }
        if (v === 'back') { closeBackstage(); restore(); return; }
        icons();
      };
      backEl.addEventListener('click', e => {
        const nav = e.target.closest('[data-v]'); if (nav && !nav.disabled) { show(nav.dataset.v); return; }
        const n = e.target.closest('[data-new]'); if (n) { askSave(() => newDoc(n.dataset.new)); return; }
        const o = e.target.closest('[data-open]'); if (o && !o.disabled) askSave(() => openFile(o.dataset.open));
      });
      backEl.addEventListener('keydown', e => { if (e.key === 'Escape') { closeBackstage(); restore(); } });
      show(st.open || view === 'new' || view === 'open' ? view : 'open');
      backEl.querySelector('.on')?.focus();
    }

    // ── Commands ──
    function setSize(pt) {
      const s = getSelection();
      if (!s.rangeCount) return;
      pendingPt = pt;
      if (s.isCollapsed) { exec('styleWithCSS', false); exec('fontSize', '7'); exec('styleWithCSS', true); return; }
      exec('styleWithCSS', false); exec('fontSize', '7'); exec('styleWithCSS', true);
      fixFonts(pt, true);
    }
    // execCommand('fontSize') only knows sizes 1–7: swap its <font size="7"> for real point sizes.
    function fixFonts(pt, reselect) {
      const fonts = [...doc.querySelectorAll('font[size="7"]')];
      if (!fonts.length) return;
      const spans = fonts.map(f => { const sp = document.createElement('span'); sp.style.fontSize = (pt || pendingPt || 11) + 'pt'; while (f.firstChild) sp.appendChild(f.firstChild); f.replaceWith(sp); return sp; });
      spans.forEach(sp => sp.querySelectorAll('span').forEach(inner => { if (inner.style.fontSize) inner.style.fontSize = ''; if (!inner.getAttribute('style')) inner.replaceWith(...inner.childNodes); }));
      if (reselect) { const r = document.createRange(); r.setStartBefore(spans[0]); r.setEndAfter(spans[spans.length - 1]); const s = getSelection(); s.removeAllRanges(); s.addRange(r); savedRange = r.cloneRange(); }
    }
    function insertImg(src, alt, cls) { exec('insertHTML', `<img src="${src}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}>`); }

    function run(cmd, arg, viaKey) {
      if (cmd === 'save') return save();
      if (cmd === 'undo') { if (!undo.length) return; redo.push(snapshot()); restoreSnap(undo.pop()); changed(); return; }
      if (cmd === 'redo') { if (!redo.length) return; undo.push(snapshot()); restoreSnap(redo.pop()); changed(); return; }
      if (cmd === 'backstage') return backstage(arg);
      if (cmd === 'zoom' || cmd === 'zoomTo') {
        zoomAuto = arg === 'fit';
        if (zoomAuto) zoom = null; else zoom = cmd === 'zoomTo' ? +arg : Math.max(30, Math.min(200, zoom + +arg));
        layout(); status(); ev('zoom'); checkSoon(); return;
      }
      if (cmd === 'ruler') { st.ruler = !st.ruler; layout(); showTab('view'); persistNow(); ev('ruler'); return; }
      if (cmd === 'fontDialog') return fontDialog();
      if (cmd === 'wordCount') return wordCountDialog();
      if (cmd === 'find') { restore(); return findDialog(); }
      if (!st.open) return;
      restore();
      if (cmd === 'link') return linkDialog();
      if (cmd === 'copy' || cmd === 'cut') {
        const s = getSelection();
        if (!s.rangeCount || s.isCollapsed) { toast('Select some text first.'); return; }
        const box = document.createElement('div'); box.appendChild(s.getRangeAt(0).cloneContents()); clip = box.innerHTML;
        if (cmd === 'cut') { snap(); exec('delete'); changed(); }
        try { navigator.clipboard && navigator.clipboard.writeText(box.innerText); } catch (e) { /* the copy inside this page still works */ }
        ev(cmd); toast(cmd === 'cut' ? 'Cut. Click where it should go, then Paste.' : 'Copied. Click where it should go, then Paste.');
        return;
      }
      if (cmd === 'paste') {
        if (!clip) { toast('Nothing copied here yet. Use Ctrl + V to paste from outside this page.'); return; }
        snap(); exec('insertHTML', cleanHTML(clip)); ev('paste'); changed(); return;
      }
      if (cmd === 'selectAll') { const r = document.createRange(); r.selectNodeContents(doc); const s = getSelection(); s.removeAllRanges(); s.addRange(r); savedRange = r.cloneRange(); return; }
      if (cmd === 'header' || cmd === 'footer' || cmd === 'pageNumber') {
        snap();
        const el = cmd === 'header' ? header : footer;
        if (cmd === 'header') st.headerOn = true; else st.footerOn = true;
        if (cmd === 'pageNumber' && !/Page \d/.test(footer.textContent)) footer.innerHTML = (footer.innerHTML.trim() ? footer.innerHTML + ' · ' : '') + 'Page 1';
        layout(); el.focus();
        const r = document.createRange(); r.selectNodeContents(el); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        ev(cmd); changed(); return;
      }
      if (cmd === 'upload') { closeMenu(); $('.mw-upload').click(); return; }
      if (['margins', 'orientation', 'size', 'columns'].includes(cmd)) {
        snap(); st.layout[cmd] = cmd === 'columns' ? +arg : arg; if (zoomAuto) zoom = null; layout(); showTab('layout'); ev(cmd + ':' + arg); changed(); return;
      }
      snap();
      exec('styleWithCSS', true);
      switch (cmd) {
        case 'bold': case 'italic': case 'underline': exec(cmd); if (viaKey) ev('kbd:' + cmd); break;
        case 'strike': exec('strikeThrough'); break;
        case 'fontName': exec('fontName', arg); break;
        case 'fontSize': setSize(+arg); break;
        case 'color': exec('foreColor', arg); break;
        case 'mark': exec('hiliteColor', arg); break;
        case 'clear': exec('removeFormat'); exec('unlink'); break;
        case 'ul': exec('insertUnorderedList'); break;
        case 'ol': exec('insertOrderedList'); break;
        case 'indent': exec('indent'); break;
        case 'outdent': exec('outdent'); break;
        case 'align': exec({ left: 'justifyLeft', center: 'justifyCenter', right: 'justifyRight', justify: 'justifyFull' }[arg]); if (viaKey) ev('kbd:align'); break;
        case 'spacing': selBlocks().forEach(b => { b.style.lineHeight = arg; }); break;
        case 'style': {
          exec('formatBlock', arg === 'normal' ? '<p>' : arg === 'h2' ? '<h2>' : '<h1>');
          selBlocks().forEach(b => { if (b.tagName === 'H1') b.classList.toggle('mw-title', arg === 'title'); if (!b.className) b.removeAttribute('class'); });
          break;
        }
        case 'table': {
          const [r, c] = arg.split('x').map(Number);
          exec('insertHTML', `<table><tbody>${Array.from({ length: r }, () => `<tr>${'<td><br></td>'.repeat(c)}</tr>`).join('')}</tbody></table><p><br></p>`);
          break;
        }
        case 'picture': insertImg(PICS[+arg].src, PICS[+arg].name); break;
        case 'shape': insertImg(SHAPES[+arg].src, SHAPES[+arg].name, 'mw-shape'); break;
        case 'symbol': exec('insertText', arg); break;
        case 'date': exec('insertText', new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })); break;
        case 'pageBreak': exec('insertHTML', '<div class="mw-break" contenteditable="false">Page break</div><p><br></p>'); break;
      }
      ev(cmd + (arg != null && ['style', 'align'].includes(cmd) ? ':' + arg : ''));
      closeMenu(); changed();
    }

    // ── Events ──
    function ev(name) { if (!st.events.includes(name)) { st.events.push(name); persistNow(); } checkSoon(); }
    win.addEventListener('mousedown', e => {
      // Keep the document's selection when a ribbon button is pressed.
      if (e.target.closest('.mw-rb, .mw-style, .mw-qat button, .mw-menu button, .mw-menu span, .mw-launcher, .mw-swatches button')) e.preventDefault();
    });
    win.addEventListener('click', e => {
      const t = e.target.closest('[data-tab]'); if (t) { showTab(t.dataset.tab); return; }
      const m = e.target.closest('[data-menu]'); if (m) { if (menuEl && menuEl.dataset.for === m.dataset.menu) { closeMenu(); return; } openMenu(m, m.dataset.menu); menuEl.dataset.for = m.dataset.menu; return; }
      const b = e.target.closest('button[data-cmd]'); if (b && !b.closest('.mw-back')) { run(b.dataset.cmd, b.dataset.arg); if (b.closest('.mw-menu')) closeMenu(); }
    });
    win.addEventListener('change', e => { const s = e.target.closest('select[data-cmd]'); if (s && s.closest('.mw-ribbon')) run(s.dataset.cmd, s.value); });
    win.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menuEl) { closeMenu(); restore(); return; }
      const k = e.key.toLowerCase(), mod = e.ctrlKey || e.metaKey;
      if (e.key === 'F12') { e.preventDefault(); if (st.open) backstage('saveas'); return; }
      if (!mod || e.altKey) return;
      const inEdit = inDoc(e.target);
      const map = { b: ['bold'], i: ['italic'], u: ['underline'], e: ['align', 'center'], l: ['align', 'left'], r: ['align', 'right'], j: ['align', 'justify'] };
      if (k === 's') { e.preventDefault(); save(); return; }
      if (k === 'o') { e.preventDefault(); backstage('open'); return; }
      if (k === 'p') { e.preventDefault(); if (st.open) backstage('print'); return; }
      if (k === 'n') { e.preventDefault(); askSave(() => newDoc('blank')); return; }
      if (k === 'k' && inEdit) { e.preventDefault(); run('link'); return; }
      if (k === 'f' && inEdit) { e.preventDefault(); run('find'); return; }
      if (k === 'z' && !e.shiftKey) { e.preventDefault(); run('undo'); return; }
      if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); run('redo'); return; }
      if (k === 'enter' && inEdit) { e.preventDefault(); run('pageBreak'); return; }
      if (map[k] && inEdit && !e.shiftKey) { e.preventDefault(); run(map[k][0], map[k][1], true); }
    });
    [doc, header, footer].forEach(el => {
      el.addEventListener('beforeinput', e => {
        if (e.inputType === 'historyUndo' || e.inputType === 'historyRedo') { e.preventDefault(); run(e.inputType === 'historyUndo' ? 'undo' : 'redo'); return; }
        if (Date.now() - lastTypeSnap > 1200) { snap(); }
        lastTypeSnap = Date.now();
      });
      el.addEventListener('input', () => {
        if (el === doc) { fixFonts(null, false); if (!doc.firstElementChild) doc.innerHTML = '<p><br></p>'; }
        changed({ typing: true });
      });
      el.addEventListener('paste', e => {
        e.preventDefault();
        const cd = e.clipboardData, html = cd.getData('text/html'), text = cd.getData('text/plain');
        snap();
        if (html) exec('insertHTML', cleanHTML(html)); else exec('insertText', text);
        ev('paste'); changed();
      });
      el.addEventListener('copy', () => { const s = getSelection(); if (s.rangeCount) { const box = document.createElement('div'); box.appendChild(s.getRangeAt(0).cloneContents()); clip = box.innerHTML; } });
      el.addEventListener('cut', () => { const s = getSelection(); if (s.rangeCount) { snap(); const box = document.createElement('div'); box.appendChild(s.getRangeAt(0).cloneContents()); clip = box.innerHTML; } });
    });
    doc.addEventListener('click', e => { if (e.target.closest('a') && (e.ctrlKey || e.metaKey)) window.open(e.target.closest('a').href, '_blank', 'noopener'); });
    $('.mw-upload').addEventListener('change', e => {
      const file = e.target.files[0]; e.target.value = '';
      if (!file || !/^image\//.test(file.type)) return;
      const img = new Image(), url = URL.createObjectURL(file);
      img.onload = () => {
        // Shrink big photos so the document still fits in this browser's storage.
        const scale = Math.min(1, 900 / img.width), c = document.createElement('canvas');
        c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        restore(); snap(); insertImg(c.toDataURL('image/jpeg', 0.82), file.name.replace(/\.[^.]+$/, '')); ev('picture'); changed();
      };
      img.onerror = () => { URL.revokeObjectURL(url); toast('That file could not be opened as a picture.'); };
      img.src = url;
    });
    let resizeT = 0;
    window.addEventListener('resize', () => { if (!host.isConnected) return; clearTimeout(resizeT); resizeT = setTimeout(() => { if (zoomAuto) { zoom = null; layout(); status(); } }, 150); });

    // ── Tasks ──
    function tasks() {
      const done = SET.tasks.filter(t => st.done.includes(t.id)).length, all = SET.tasks.length;
      tasksEl.innerHTML = `<div class="mw-tasks-head"><span class="mw-tasks-title">Your tasks</span><span class="mw-tasks-count">${done}/${all}</span><span class="mw-tasks-bar"><span style="width:${done / all * 100}%"></span></span><button type="button" class="mw-reset">Start again</button></div>
        <ol class="mw-task-list">${SET.tasks.map(t => `<li class="mw-task${st.done.includes(t.id) ? ' done' : ''}"><span class="mw-task-box" aria-hidden="true"></span><span><span class="mw-task-text">${esc(t.text)}</span><span class="mw-task-hint">${esc(t.hint)}</span></span></li>`).join('')}</ol>
        ${done === all ? '<div class="mw-tasks-done" role="status">All done — you used the ribbon like a pro. Try the other tabs, or Start again.</div>' : ''}`;
      tasksEl.querySelector('.mw-reset').onclick = () => dialog('Start again?', '<p style="margin:0">Your document, the files saved in this practice and your ticked tasks will be cleared.</p>', [
        { label: 'Start again', run: () => { store(KEY); st = fresh(); undo = []; redo = []; if (zoomAuto) zoom = null; closeBackstage(); openState(); paint(); showTab('home'); } },
        { label: 'Cancel' }]);
    }
    let checkT = 0;
    function checkSoon() { clearTimeout(checkT); checkT = setTimeout(check, 250); }
    function check() {
      if (!host.isConnected) return;
      const ctx = { doc, st, ev: n => st.events.includes(n), block: p => blockOf(doc, p), file: re => Object.keys(st.files).some(k => re.test(k)) };
      let added = 0;
      SET.tasks.forEach(t => { if (!st.done.includes(t.id)) { let ok = false; try { ok = st.open && t.check(ctx); } catch (e) { ok = false; } if (ok) { st.done.push(t.id); added++; } } });
      if (!added) return;
      persistNow(); tasks();
      if (st.done.length === SET.tasks.length) { toast('All tasks done!'); host.dispatchEvent(new CustomEvent('mw:complete', { bubbles: true, detail: { set: setKey } })); }
    }

    // ── Start ──
    paint(); openState(); showTab('home');
    requestAnimationFrame(() => { zoom = null; layout(); status(); });
    icons();
  }

  window.MiniWord = {
    mountAll(root) { (root || document).querySelectorAll('.mini-word:not([data-mounted])').forEach(mount); },
    mount,
    sets: Object.keys(SETS)
  };
})();
