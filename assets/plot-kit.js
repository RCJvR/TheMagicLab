// ═══════════════════════════════════════════════════════════════
// The Magic Lab — plot kit
// Shared by the teacher tools in Math Magician and Science Sage:
//   • a small expression parser (no eval) for every value box
//   • getting a plot out of the page: copy as image (to paste into
//     Word / Google Docs), PNG sized in cm, SVG, and a print sheet
//     with size, copies-per-page and a caption.
// Exposes window.MMPlotKit.
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  // Expression parser → closures. No eval.
  //   expr  := term (('+'|'-') term)*
  //   term  := unary (('*'|'/') unary | <implicit ×> power)*
  //   unary := ('-'|'+') unary | power
  //   power := primary ('^' unary)?          (right-associative)
  // Every compiled function takes (x, degrees).
  // ══════════════════════════════════════════════════════════════════
  const DEG = Math.PI / 180;
  const FUNCS = {
    sin:  (v, d) => Math.sin(d ? v * DEG : v),
    cos:  (v, d) => Math.cos(d ? v * DEG : v),
    tan:  (v, d) => {
      // Exact asymptotes in degree mode (cos(90°) isn't exactly 0 in floating point).
      if (d && Math.abs(((v % 180) + 180) % 180 - 90) < 1e-9) return NaN;
      return Math.tan(d ? v * DEG : v);
    },
    asin: (v, d) => d ? Math.asin(v) / DEG : Math.asin(v),
    acos: (v, d) => d ? Math.acos(v) / DEG : Math.acos(v),
    atan: (v, d) => d ? Math.atan(v) / DEG : Math.atan(v),
    sqrt: (v) => Math.sqrt(v),
    cbrt: (v) => Math.cbrt(v),
    abs:  (v) => Math.abs(v),
    ln:   (v) => Math.log(v),
    log:  (v) => Math.log10(v),
    exp:  (v) => Math.exp(v),
  };
  const CONSTS = { pi: Math.PI, e: Math.E };
  const NAMES = [...Object.keys(FUNCS), 'pi', 'x', 'e'].sort((a, b) => b.length - a.length);

  function tokenize(src) {
    const s = String(src)
      .replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/')
      .replace(/π/g, 'pi').replace(/√/g, 'sqrt').replace(/²/g, '^2').replace(/³/g, '^3')
      .replace(/°/g, '').replace(/(\d),(\d)/g, '$1.$2');
    const toks = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (/[0-9.]/.test(c)) {
        const m = /^(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?/.exec(s.slice(i));
        if (!m) throw new Error(`Unexpected "${c}"`);
        toks.push({ type: 'num', v: parseFloat(m[0]) });
        i += m[0].length; continue;
      }
      if (/[a-zA-Z]/.test(c)) {
        let word = /^[a-zA-Z]+/.exec(s.slice(i))[0];
        i += word.length;
        word = word.toLowerCase();
        while (word) {                       // "xsinx" → x, sin, x
          const name = NAMES.find(n => word.startsWith(n));
          if (!name) throw new Error(`Unknown name "${word}"`);
          toks.push({ type: 'id', v: name });
          word = word.slice(name.length);
        }
        continue;
      }
      if ('+-*/^()|'.includes(c)) { toks.push({ type: 'op', v: c }); i++; continue; }
      if (c === '[' || c === '{') { toks.push({ type: 'op', v: '(' }); i++; continue; }
      if (c === ']' || c === '}') { toks.push({ type: 'op', v: ')' }); i++; continue; }
      throw new Error(`Unexpected "${c}"`);
    }
    return toks;
  }

  function compile(src) {
    const toks = tokenize(src);
    if (!toks.length) throw new Error('Empty');
    let i = 0, usesX = false;
    const peek = () => toks[i];
    const isOp = (v) => peek() && peek().type === 'op' && peek().v === v;
    const startsPrimary = (t) => t && (t.type === 'num' || t.type === 'id' || (t.type === 'op' && t.v === '('));

    function expr() {
      let l = term();
      while (isOp('+') || isOp('-')) {
        const op = toks[i++].v, r = term(), a = l;
        l = op === '+' ? (x, d) => a(x, d) + r(x, d) : (x, d) => a(x, d) - r(x, d);
      }
      return l;
    }
    function term() {
      let l = unary();
      for (;;) {
        if (isOp('*') || isOp('/')) {
          const op = toks[i++].v, r = unary(), a = l;
          l = op === '*' ? (x, d) => a(x, d) * r(x, d) : (x, d) => a(x, d) / r(x, d);
        } else if (startsPrimary(peek())) {
          const r = power(), a = l;
          l = (x, d) => a(x, d) * r(x, d);
        } else break;
      }
      return l;
    }
    function unary() {
      if (isOp('-')) { i++; const a = unary(); return (x, d) => -a(x, d); }
      if (isOp('+')) { i++; return unary(); }
      return power();
    }
    function power() {
      const b = primary();
      if (isOp('^')) {
        i++;
        const e = unary();
        return (x, d) => Math.pow(b(x, d), e(x, d));
      }
      return b;
    }
    function primary() {
      const t = toks[i++];
      if (!t) throw new Error('Incomplete expression');
      if (t.type === 'num') { const v = t.v; return () => v; }
      if (t.type === 'op' && t.v === '(') {
        const a = expr();
        if (!isOp(')')) throw new Error('Missing ")"');
        i++; return a;
      }
      if (t.type === 'op' && t.v === '|') {
        const a = expr();
        if (!isOp('|')) throw new Error('Missing closing "|"');
        i++; return (x, d) => Math.abs(a(x, d));
      }
      if (t.type === 'id') {
        if (t.v === 'x') { usesX = true; return (x) => x; }
        if (t.v in CONSTS) { const v = CONSTS[t.v]; return () => v; }
        const f = FUNCS[t.v];
        let arg;
        if (isOp('(')) {
          i++; arg = expr();
          if (!isOp(')')) throw new Error('Missing ")"');
          i++;
          // sin(x)^2 reads as (sin x)^2
          if (isOp('^')) { i++; const e = unary(), g = arg; return (x, d) => Math.pow(f(g(x, d), d), e(x, d)); }
        } else {
          // "sin 2x" → sin(2x): the argument is the implicit product that follows.
          arg = power();
          while (startsPrimary(peek()) && !(peek().type === 'id' && FUNCS[peek().v])) {
            const r = power(), a = arg; arg = (x, d) => a(x, d) * r(x, d);
          }
        }
        const g = arg;
        return (x, d) => f(g(x, d), d);
      }
      throw new Error(`Unexpected "${t.v}"`);
    }

    const fn = expr();
    if (i < toks.length) throw new Error(`Unexpected "${toks[i].v}"`);
    return { fn, usesX };
  }

  // ══════════════════════════════════════════════════════════════════
  // Strings
  // ══════════════════════════════════════════════════════════════════
  const STR = {
    en: {
      title: 'Print or add to a document', close: 'Close',
      size: 'Size on the page', copies: 'Copies on the page', caption: 'Caption under each copy (optional)',
      captionPh: 'e.g. Question 3.2',
      sizes: [['17', 'Full width · 17 cm'], ['12', 'Large · 12 cm'], ['8.5', 'Half width · 8.5 cm'], ['6', 'Small · 6 cm']],
      how: 'To put it in a Word or Google Docs document, choose <b>Copy image</b> and paste it (Ctrl + V). Or download the PNG: it inserts at the size chosen above.',
      copyImg: 'Copy image', png: 'PNG', svg: 'SVG', print: 'Print', toWs: 'Add to worksheet',
      wsAdded: 'Added to your worksheet inbox. Open the Worksheet Builder to place it.', wsFull: 'Could not add it: the worksheet inbox is full. Remove some items in the Worksheet Builder.',
      copied: 'Image copied. Paste it into your document with Ctrl + V.',
      copyFail: 'Your browser would not copy the image. Download the PNG and insert it instead.',
    },
    af: {
      title: 'Druk of voeg by ’n dokument', close: 'Maak toe',
      size: 'Grootte op die bladsy', copies: 'Kopieë op die bladsy', caption: 'Onderskrif onder elke kopie (opsioneel)',
      captionPh: 'bv. Vraag 3.2',
      sizes: [['17', 'Volle breedte · 17 cm'], ['12', 'Groot · 12 cm'], ['8.5', 'Halwe breedte · 8,5 cm'], ['6', 'Klein · 6 cm']],
      how: 'Om dit in ’n Word- of Google Docs-dokument te sit, kies <b>Kopieer prent</b> en plak dit (Ctrl + V). Of laai die PNG af: dit word teen die grootte hierbo ingevoeg.',
      copyImg: 'Kopieer prent', png: 'PNG', svg: 'SVG', print: 'Druk', toWs: 'Voeg by werkkaart',
      wsAdded: 'By jou werkkaart-inkassie gevoeg. Maak die Werkkaartbouer oop om dit te plaas.', wsFull: 'Kon dit nie byvoeg nie: die werkkaart-inkassie is vol. Verwyder items in die Werkkaartbouer.',
      copied: 'Prent gekopieer. Plak dit met Ctrl + V in jou dokument.',
      copyFail: 'Jou blaaier wou nie die prent kopieer nie. Laai eerder die PNG af en voeg dit in.',
    },
  };
  const S = () => STR[(window.MLLang && MLLang.getLang()) === 'af' ? 'af' : 'en'];
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ══════════════════════════════════════════════════════════════════
  // Toast
  // ══════════════════════════════════════════════════════════════════
  let toastTimer = 0;
  function toast(msg) {
    let t = document.getElementById('mmToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'mmToast'; t.className = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite');
      document.body.appendChild(t);
    }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ══════════════════════════════════════════════════════════════════
  // SVG → string / PNG
  // ══════════════════════════════════════════════════════════════════
  function svgString(svgEl) {
    const c = svgEl.cloneNode(true);
    c.querySelectorAll('[data-export-skip]').forEach(n => n.remove());
    c.removeAttribute('role'); c.removeAttribute('style');
    c.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return new XMLSerializer().serializeToString(c);
  }
  function svgSize(svgEl) {
    const vb = (svgEl.getAttribute('viewBox') || '').split(/\s+/).map(Number);
    return { w: vb[2] || svgEl.width.baseVal.value, h: vb[3] || svgEl.height.baseVal.value };
  }
  const svgDataUrl = (s) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);

  function loadImage(src) {
    return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  }
  async function pngBlob(svgEl, pxWidth, cmWidth) {
    const { w, h } = svgSize(svgEl);
    const img = await loadImage(svgDataUrl(svgString(svgEl)));
    const c = document.createElement('canvas');
    c.width = Math.round(pxWidth); c.height = Math.round(pxWidth * h / w);
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    const blob = await new Promise(r => c.toBlob(r, 'image/png'));
    return cmWidth ? withPhys(blob, c.width / (cmWidth / 100)) : blob;
  }

  // Stamp a pHYs chunk (pixels per metre) into the PNG so Word, Google Docs
  // and LibreOffice insert it at the physical size the teacher picked.
  const CRC = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
    return t;
  })();
  function crc32(bytes) { let c = 0xffffffff; for (const b of bytes) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
  async function withPhys(blob, ppm) {
    const buf = new Uint8Array(await blob.arrayBuffer());
    const has = (tag) => { for (let i = 8; i < buf.length - 8;) { const len = new DataView(buf.buffer).getUint32(i); if (String.fromCharCode(...buf.slice(i + 4, i + 8)) === tag) return true; i += 12 + len; } return false; };
    if (buf.length < 33 || has('pHYs')) return blob;
    const chunk = new Uint8Array(21);
    const dv = new DataView(chunk.buffer);
    dv.setUint32(0, 9);
    chunk.set([0x70, 0x48, 0x59, 0x73], 4);                 // "pHYs"
    dv.setUint32(8, Math.round(ppm)); dv.setUint32(12, Math.round(ppm)); chunk[16] = 1;  // unit: metre
    dv.setUint32(17, crc32(chunk.slice(4, 17)));
    const out = new Uint8Array(buf.length + 21);
    out.set(buf.slice(0, 33)); out.set(chunk, 33); out.set(buf.slice(33), 54);   // right after IHDR
    return new Blob([out], { type: 'image/png' });
  }

  function download(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  async function copyImage(svgEl) {
    try {
      if (!navigator.clipboard || !window.ClipboardItem) throw new Error('no clipboard');
      // Hand ClipboardItem the promise, not the blob: Safari only allows the
      // write while the click is still "fresh".
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob(svgEl, 2000) })]);
      toast(S().copied);
      return true;
    } catch (_) { toast(S().copyFail); return false; }
  }

  // ══════════════════════════════════════════════════════════════════
  // Print sheet: copies of the plot at a set width on A4, in a hidden
  // iframe, so the page's own layout never gets in the way.
  // ══════════════════════════════════════════════════════════════════
  function printSheet(svgEl, opts) {
    const cm = parseFloat(opts.widthCm) || 17;
    const copies = Math.max(1, Math.min(12, parseInt(opts.copies, 10) || 1));
    const src = svgDataUrl(svgString(svgEl));
    const cap = String(opts.caption || '').trim();
    const figs = Array.from({ length: copies }, () =>
      `<figure><img src="${src}" alt="">${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`).join('');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(opts.title || 'Math Magician')}</title><style>
      @page { size: A4; margin: 12mm; }
      html, body { margin: 0; background: #fff; }
      body { font-family: Helvetica, Arial, sans-serif; color: #111; }
      .sheet { display: flex; flex-wrap: wrap; gap: 8mm 6mm; justify-content: center; }
      figure { margin: 0; flex: 0 0 auto; width: ${cm}cm; break-inside: avoid; page-break-inside: avoid; }
      img { display: block; width: 100%; height: auto; }
      figcaption { font-size: 11pt; margin-top: 2mm; }
    </style></head><body><div class="sheet">${figs}</div></body></html>`;
    const f = document.createElement('iframe');
    f.setAttribute('aria-hidden', 'true');
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    document.body.appendChild(f);
    const doc = f.contentDocument;
    doc.open(); doc.write(html); doc.close();
    const imgs = [...doc.images];
    Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))).then(() => {
      f.contentWindow.focus();
      f.contentWindow.print();
      setTimeout(() => f.remove(), 60000);
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // Dialog
  // ══════════════════════════════════════════════════════════════════
  const PREF = 'mm_plot_print_v1';
  function prefs() { try { return JSON.parse(localStorage.getItem(PREF)) || {}; } catch (_) { return {}; } }
  function savePrefs(p) { try { localStorage.setItem(PREF, JSON.stringify(p)); } catch (_) {} }

  function ensureDialogStyle() {
    if (document.getElementById('mmx-style')) return;
    const st = document.createElement('style');
    st.id = 'mmx-style';
    st.textContent = `
      .mmx-back { position: fixed; inset: 0; z-index: 400; background: rgba(0,0,0,0.62); display: grid; place-items: center; padding: 16px; }
      .mmx { width: min(760px, 100%); max-height: calc(100vh - 32px); overflow: auto; background: var(--ink-850, #0c0e11); border: 1px solid var(--line-hard, rgba(255,255,255,.16)); border-radius: var(--radius-md, 14px); box-shadow: var(--elevation-xl); }
      .mmx-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 18px; border-bottom: 1px solid var(--line, rgba(255,255,255,.075)); }
      .mmx-head h2 { font-family: var(--font-display); font-size: 17px; font-weight: 800; letter-spacing: -0.02em; color: var(--paper, #f2f5f9); }
      .mmx-body { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 18px; padding: 18px; }
      .mmx-preview { background: #fff; border-radius: 8px; padding: 10px; display: grid; place-items: center; align-self: start; }
      .mmx-preview img { width: 100%; height: auto; display: block; }
      .mmx-opts { display: flex; flex-direction: column; gap: 12px; }
      .mmx-foot { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; padding: 14px 18px; border-top: 1px solid var(--line, rgba(255,255,255,.075)); }
      @media (max-width: 640px) { .mmx-body { grid-template-columns: minmax(0, 1fr); } }
    `;
    document.head.appendChild(st);
  }

  function openDialog(cfg) {
    const svgEl = cfg.getSvg();
    if (!svgEl) return;
    ensureDialogStyle();
    const s = S(), p = prefs();
    const back = document.createElement('div');
    back.className = 'mmx-back';
    back.innerHTML = `
      <div class="mmx" role="dialog" aria-modal="true" aria-labelledby="mmxTitle">
        <div class="mmx-head">
          <h2 id="mmxTitle">${esc(s.title)}</h2>
          <button class="btn icon" type="button" data-x="close" aria-label="${esc(s.close)}">✕</button>
        </div>
        <div class="mmx-body">
          <div class="mmx-preview"><img alt="" src="${svgDataUrl(svgString(svgEl))}"></div>
          <div class="mmx-opts">
            <label class="field"><span>${esc(s.size)}</span>
              <select data-x="size">${s.sizes.map(([v, l]) => `<option value="${v}"${String(p.size || '17') === v ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
            <label class="field"><span>${esc(s.copies)}</span>
              <select data-x="copies">${[1, 2, 3, 4, 6, 8].map(n => `<option${String(p.copies || 1) === String(n) ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
            <label class="field"><span>${esc(s.caption)}</span><input type="text" data-x="caption" maxlength="120" placeholder="${esc(s.captionPh)}"></label>
            <p class="hint">${s.how}</p>
          </div>
        </div>
        <div class="mmx-foot">
          <button class="btn" type="button" data-x="ws">${esc(s.toWs)}</button>
          <button class="btn" type="button" data-x="copy">${esc(s.copyImg)}</button>
          <button class="btn" type="button" data-x="png">${esc(s.png)}</button>
          <button class="btn" type="button" data-x="svg">${esc(s.svg)}</button>
          <button class="btn primary" type="button" data-x="print">${esc(s.print)}</button>
        </div>
      </div>`;
    const opener = document.activeElement;
    document.body.appendChild(back);
    const q = (k) => back.querySelector(`[data-x=${k}]`);
    const close = () => { back.remove(); document.removeEventListener('keydown', onKey); opener && opener.focus && opener.focus(); };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {       // keep focus inside the dialog
        const f = [...back.querySelectorAll('button, select, input')];
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    back.addEventListener('click', (e) => { if (e.target === back) close(); });
    const opts = () => {
      const o = { size: q('size').value, copies: q('copies').value };
      savePrefs(o);
      return { widthCm: o.size, copies: o.copies, caption: q('caption').value, title: cfg.fileBase() };
    };
    q('close').onclick = close;
    q('copy').onclick = () => copyImage(svgEl);
    q('ws').onclick = () => addToWorksheet(svgEl, cfg.fileBase());
    q('png').onclick = async () => { const o = opts(); download(await pngBlob(svgEl, Math.max(1200, o.widthCm / 2.54 * 300), o.widthCm), cfg.fileBase() + '.png'); };
    q('svg').onclick = () => download(new Blob([svgString(svgEl)], { type: 'image/svg+xml' }), cfg.fileBase() + '.svg');
    q('print').onclick = () => { printSheet(svgEl, opts()); };
    q('size').focus();
  }

  // Wire a page's toolbar buttons. Any of them may be missing.
  function attach(cfg) {
    const on = (id, fn) => { const b = document.getElementById(id); if (b) b.addEventListener('click', fn); };
    const svg = () => cfg.getSvg();
    on(cfg.copy, () => { const s = svg(); if (s) copyImage(s); });
    on(cfg.print, () => openDialog(cfg));
    on(cfg.png, async () => { const s = svg(); if (s) download(await pngBlob(s, 2000, 17), cfg.fileBase() + '.png'); });
    on(cfg.worksheet, () => { const s = svg(); if (s) addToWorksheet(s, cfg.fileBase()); });
    on(cfg.svg, () => { const s = svg(); if (s) download(new Blob([svgString(s)], { type: 'image/svg+xml' }), cfg.fileBase() + '.svg'); });
  }

  // Share-link encoding (UTF-8 safe, URL-safe base64).
  function toB64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = ''; bytes.forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function fromB64(b64) {
    const bin = atob(b64.replace(/-/g, '+').replace(/_/g, '/'));
    return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
  }

  // ══════════════════════════════════════════════════════════════════
  // Worksheet inbox: any tool can drop its diagram here, and the
  // Worksheet Builder (worksheet.html) places it into a question.
  // ══════════════════════════════════════════════════════════════════
  const WS_INBOX = 'mm_ws_inbox_v1';
  function inbox() { try { return JSON.parse(localStorage.getItem(WS_INBOX)) || []; } catch (_) { return []; } }
  function setInbox(list) { localStorage.setItem(WS_INBOX, JSON.stringify(list)); }
  function addToWorksheet(svgEl, title) {
    const { w, h } = svgSize(svgEl);
    const list = inbox();
    list.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), title: String(title || 'diagram'), svg: svgString(svgEl), w, h, at: Date.now() });
    try { setInbox(list.slice(0, 30)); toast(S().wsAdded); return true; }
    catch (_) { toast(S().wsFull); return false; }
  }

  // ══════════════════════════════════════════════════════════════════
  // Page helpers shared by the tool pages
  // ══════════════════════════════════════════════════════════════════
  // EN/AF: swaps [data-af] / [data-af-html] text and mounts the toggle.
  // onChange(lang) runs after every swap, including the first.
  function i18n(onChange) {
    let lang = (window.MLLang && MLLang.getLang()) || 'en';
    function apply() {
      document.querySelectorAll('[data-af-html]').forEach(el => {
        if (el.dataset.enHtml === undefined) el.dataset.enHtml = el.innerHTML;
        el.innerHTML = lang === 'af' ? el.dataset.afHtml : el.dataset.enHtml;
      });
      document.querySelectorAll('[data-af]:not([data-af-html])').forEach(el => {
        if (el.dataset.en === undefined) el.dataset.en = el.textContent;
        el.textContent = lang === 'af' ? el.dataset.af : el.dataset.en;
      });
      document.querySelectorAll('[data-af-ph]').forEach(el => {
        if (el.dataset.enPh === undefined) el.dataset.enPh = el.placeholder;
        el.placeholder = lang === 'af' ? el.dataset.afPh : el.dataset.enPh;
      });
      document.documentElement.lang = lang;
      if (onChange) onChange(lang);
      try { lucide.createIcons(); } catch (_) {}
    }
    if (window.MLLang) MLLang.mount('mlLangToggle', { onChange(next) { lang = next; apply(); } });
    return { get: () => lang, apply };
  }
  // localStorage autosave + a share link carried in the URL hash (#<hashKey>=…).
  function store(key, hashKey) {
    let timer = 0;
    return {
      load(sanitize) {
        const m = new RegExp('[#&]' + hashKey + '=([A-Za-z0-9_-]+)').exec(location.hash);
        if (m) {
          history.replaceState(null, '', location.pathname + location.search);
          try { const s = sanitize(JSON.parse(fromB64(m[1]))); if (s) return s; } catch (_) {}
        }
        try { const raw = localStorage.getItem(key); if (raw) { const s = sanitize(JSON.parse(raw)); if (s) return s; } } catch (_) {}
        return null;
      },
      save(json) { clearTimeout(timer); timer = setTimeout(() => { try { localStorage.setItem(key, json); } catch (_) {} }, 300); },
      async copyLink(json, okMsg, failMsg) {
        const link = location.origin + location.pathname + '#' + hashKey + '=' + toB64(json);
        try { await navigator.clipboard.writeText(link); toast(okMsg); } catch (_) { toast(failMsg); }
      },
    };
  }

  window.MMPlotKit = {
    compile, FUNCS, DEG, attach, openDialog, copyImage, printSheet, pngBlob, svgString, svgSize, download, toast,
    toB64, fromB64, esc, addToWorksheet, inbox, setInbox, i18n, store,
  };
})();
