/* The Magic Lab — small toolkit for Explore-tab simulations.
 *
 * Each simulation lives in assets/explore/<name>.js and serves both the
 * English and the Afrikaans lesson page: text is written as {en, af} and
 * MLX.L() picks the page's language. MLX.layout() builds the standard
 * stage + controls layout (styles in assets/explore-kit.css).
 */
(function () {
  'use strict';
  const af = /\.af\.html$/i.test(location.pathname) || /^af/i.test(document.documentElement.lang || '');
  // Pick the page language from {en, af}; anything else is returned as is.
  const L = (o) => (o && typeof o === 'object' && 'en' in o) ? (af && o.af != null ? o.af : o.en) : o;
  // Number with d decimals, Afrikaans decimal comma, proper minus sign.
  function num(v, d) {
    let s = Number(v).toFixed(d || 0);
    if (af) s = s.replace('.', ',');
    return s.replace('-', '−');
  }
  // Thousands separated by a thin space (SI style).
  function big(v) { return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  function h(tag, props, kids) {
    const el = document.createElement(tag);
    if (props) for (const k in props) {
      if (k === 'text') el.textContent = props[k];
      else if (k === 'html') el.innerHTML = props[k];
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), props[k]);
      else if (props[k] != null && props[k] !== false) el.setAttribute(k, props[k] === true ? '' : props[k]);
    }
    (kids || []).forEach(c => c != null && el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return el;
  }
  function accent() {
    const t = document.querySelector('.lesson-tag');
    return t ? getComputedStyle(t).color : '#60a5fa';
  }

  // Standard layout inside `root`: stage (canvas + caption) and a side column.
  function layout(root, opts) {
    opts = opts || {};
    const wrap = h('div', { class: 'mlx-sim' });
    wrap.style.setProperty('--mlx-accent', opts.accent || accent());
    const stage = h('div', { class: 'mlx-stage' });
    const caption = h('div', { class: 'mlx-caption', 'aria-live': 'polite' });
    const side = h('div', { class: 'mlx-side' });
    wrap.appendChild(stage); wrap.appendChild(side);
    root.appendChild(wrap);
    const c = canvas(stage, opts);
    stage.appendChild(caption);
    return { wrap, stage, side, caption, cv: c, setCaption: (t) => { caption.textContent = L(t); } };
  }

  function card(parent, title) {
    const el = h('div', { class: 'mlx-card' });
    if (title) el.appendChild(h('div', { class: 'mlx-card-title', text: L(title) }));
    parent.appendChild(el);
    return el;
  }

  let uid = 0;
  // Slider: label + mono value (with unit) on one line, track beneath, optional min/max captions under the ends.
  // o.fmt(v) formats the shown value; o.speak(v) (optional) gives the screen-reader text (aria-valuetext).
  function slider(parent, o) {
    const id = 'mlx-s' + (++uid);
    const out = h('output', { for: id });
    const input = h('input', { type: 'range', id, min: o.min, max: o.max, step: o.step || 1, value: o.value });
    const kids = [h('div', { class: 'mlx-field-head' }, [h('label', { for: id, text: L(o.label) }), out]), input];
    if (o.ends !== false && (o.minLabel || o.maxLabel || o.fmt)) {
      kids.push(h('div', { class: 'mlx-ends', 'aria-hidden': 'true' }, [
        h('span', { text: L(o.minLabel) || (o.fmt ? o.fmt(+o.min) : o.min) }),
        h('span', { text: L(o.maxLabel) || (o.fmt ? o.fmt(+o.max) : o.max) }),
      ]));
    }
    const field = h('div', { class: 'mlx-field' }, kids);
    const show = () => {
      out.textContent = o.fmt ? o.fmt(+input.value) : input.value;
      input.setAttribute('aria-valuetext', o.speak ? o.speak(+input.value) : out.textContent);
    };
    input.addEventListener('input', () => { show(); o.onInput && o.onInput(+input.value); });
    show();
    parent.appendChild(field);
    return { el: field, input, get: () => +input.value, set(v) { input.value = v; show(); } };
  }

  // Segmented choice: options [[value, label], ...]
  function seg(parent, o) {
    const field = h('div', { class: 'mlx-field' });
    if (o.label) field.appendChild(h('div', { class: 'mlx-field-head' }, [h('span', { text: L(o.label) })]));
    const row = h('div', { class: 'mlx-seg', role: 'group', 'aria-label': L(o.label) || null });
    let value = o.value;
    const btns = o.options.map(([v, lab]) => {
      const b = h('button', { type: 'button', 'aria-pressed': String(v === value), text: L(lab) });
      b.addEventListener('click', () => { set(v); o.onChange && o.onChange(v); });
      row.appendChild(b);
      return [v, b];
    });
    function set(v) { value = v; btns.forEach(([bv, b]) => b.setAttribute('aria-pressed', String(bv === v))); }
    field.appendChild(row);
    parent.appendChild(field);
    return { el: field, get: () => value, set, buttons: btns };
  }

  function check(parent, o) {
    const input = h('input', { type: 'checkbox' });
    input.checked = !!o.value;
    const lab = h('label', { class: 'mlx-check' }, [input, h('span', { text: L(o.label) })]);
    input.addEventListener('change', () => o.onChange && o.onChange(input.checked));
    parent.appendChild(lab);
    return { el: lab, get: () => input.checked, set(v) { input.checked = v; } };
  }

  function button(parent, label, onClick, cls) {
    const b = h('button', { type: 'button', class: 'mlx-btn' + (cls ? ' ' + cls : ''), text: L(label) });
    b.addEventListener('click', onClick);
    parent.appendChild(b);
    return b;
  }

  // Readout rows: [[key, label], ...]
  function readout(parent, rows) {
    const vals = {};
    rows.forEach(([k, lab]) => {
      const v = h('span');
      parent.appendChild(h('div', { class: 'mlx-row' }, [h('span', { text: L(lab) }), v]));
      vals[k] = v;
    });
    return { set(k, text, color) { vals[k].textContent = text; vals[k].style.color = color || ''; } };
  }

  // A canvas that fills its container's width (height fixed or by aspect)
  // and is drawn sharp on high-density screens. draw(ctx, W, H) in CSS pixels.
  function canvas(parent, o) {
    const cv = h('canvas', { role: 'img', 'aria-label': L(o.ariaLabel) || null });
    parent.appendChild(cv);
    const ctx = cv.getContext('2d');
    let W = 0, H = 0;
    function size() {
      const w = cv.clientWidth || parent.clientWidth || 600;
      const hh = o.height ? (typeof o.height === 'function' ? o.height(w) : o.height) : Math.round(w * (o.aspect || 0.6));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (w === W && hh === H && cv.width === Math.round(w * dpr)) return false;
      W = w; H = hh;
      cv.style.height = hh + 'px';
      cv.width = Math.round(w * dpr); cv.height = Math.round(hh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    }
    const api = {
      el: cv, ctx,
      get W() { return W; }, get H() { return H; },
      draw() { size(); if (W && o.draw) o.draw(ctx, W, H); },
    };
    if (window.ResizeObserver) new ResizeObserver(() => { if (size()) api.draw(); }).observe(parent);
    return api;
  }

  // Animation loop that only runs while `el` is on screen (its tab is shown).
  function loop(el, fn) {
    let raf = 0, last = 0, running = false;
    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (!el.offsetParent) { last = 0; return; }
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      fn(dt, t / 1000);
    }
    return {
      start() { if (!running) { running = true; last = 0; raf = requestAnimationFrame(frame); } },
      stop() { running = false; cancelAnimationFrame(raf); },
      get running() { return running; },
    };
  }

  // Canvas text helper: text(ctx, str, x, y, {size, weight, color, align, base, font})
  function text(ctx, s, x, y, o) {
    o = o || {};
    ctx.font = (o.weight || 500) + ' ' + (o.size || 12) + 'px ' + (o.mono ? '"JetBrains Mono", monospace' : '"Cabinet Grotesk", sans-serif');
    ctx.fillStyle = o.color || 'rgba(226,232,240,0.85)';
    ctx.textAlign = o.align || 'left';
    ctx.textBaseline = o.base || 'alphabetic';
    ctx.fillText(L(s), x, y);
  }
  // Wrap text to lines no wider than maxW (uses the current ctx font).
  function wrap(ctx, s, maxW) {
    const words = L(s).split(' '), lines = []; let cur = '';
    words.forEach(w => { const t = cur ? cur + ' ' + w : w; if (cur && ctx.measureText(t).width > maxW) { lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur);
    return lines;
  }
  function roundRect(ctx, x, y, w, hh, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + hh, r); ctx.arcTo(x + w, y + hh, x, y + hh, r);
    ctx.arcTo(x, y + hh, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  // Run init once the Explore panel exists.
  function ready(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }

  // ── Shared design standard additions (see docs/science-sage-sim-audit.md) ──────────────────

  const reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Colours for drawing, from the site tokens (assets/magic-lab.css), for the current light/dark theme.
  // Canvas cannot read CSS variables, so sims call MLX.colors() each frame and redraw on theme change.
  function colors() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    // One accent per view: the page's own accent (its lesson tag colour), the same one the controls use
    const acc = accent();
    const c = light ? {
      light: true, ground: '#f5f5f3', stage: '#ffffff', ink: '#16181d', text: '#2b2f36', text2: 'rgba(22,24,29,0.70)',
      text3: 'rgba(22,24,29,0.56)', line: 'rgba(22,24,29,0.12)', lineSoft: 'rgba(22,24,29,0.07)', lineHard: 'rgba(22,24,29,0.32)',
      accent: '#1f8a3e', accentSoft: 'rgba(31,138,62,0.14)', water: 'rgba(53,166,240,0.14)', glass: 'rgba(22,24,29,0.45)', warn: '#a86a00',
    } : {
      light: false, ground: '#08090b', stage: '#0c0e11', ink: '#f2f5f9', text: '#e3e8ef', text2: 'rgba(226,232,240,0.72)',
      text3: 'rgba(226,232,240,0.56)', line: 'rgba(255,255,255,0.075)', lineSoft: 'rgba(255,255,255,0.045)', lineHard: 'rgba(255,255,255,0.22)',
      accent: '#4acf6b', accentSoft: 'rgba(74,207,107,0.16)', water: 'rgba(53,166,240,0.12)', glass: 'rgba(226,232,240,0.55)', warn: '#f5b23d',
    };
    if (acc && !light) c.accent = acc;
    if (acc && light) c.accent = acc; // theme.js already darkens the lesson tag colour in light mode
    return c;
  }
  // Call fn whenever the site theme changes (light / dark / prism)
  function onTheme(fn) {
    new MutationObserver(fn).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // "Nice" tick values for an axis from lo to hi (about n ticks)
  function ticks(lo, hi, n) {
    const span = Math.max(1e-9, hi - lo), raw = span / (n || 5);
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) || raw;
    const out = [];
    for (let v = Math.ceil(lo / step - 1e-9) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10));
    return { step, values: out };
  }

  // Graph axes with numbered ticks and titled axes (units in brackets). Returns {X, Y, box} mappers.
  // o: {x0,y0,w,h, xMin,xMax,yMin,yMax, xTitle,yTitle, xTicks,yTicks, fmtX,fmtY}
  function axes(ctx, o) {
    const c = colors();
    const box = { x0: o.x0 + 44, y0: o.y0 + 10, x1: o.x0 + o.w - 10, y1: o.y0 + o.h - 38 };
    const X = v => box.x0 + (v - o.xMin) / (o.xMax - o.xMin) * (box.x1 - box.x0);
    const Y = v => box.y1 - (v - o.yMin) / (o.yMax - o.yMin) * (box.y1 - box.y0);
    const xt = ticks(o.xMin, o.xMax, o.xTicks || 5), yt = ticks(o.yMin, o.yMax, o.yTicks || 4);
    ctx.lineWidth = 1; ctx.strokeStyle = c.lineSoft;
    yt.values.forEach(v => { ctx.beginPath(); ctx.moveTo(box.x0, Y(v)); ctx.lineTo(box.x1, Y(v)); ctx.stroke(); });
    xt.values.forEach(v => { ctx.beginPath(); ctx.moveTo(X(v), box.y0); ctx.lineTo(X(v), box.y1); ctx.stroke(); });
    ctx.strokeStyle = c.lineHard;
    ctx.beginPath(); ctx.moveTo(box.x0, box.y0); ctx.lineTo(box.x0, box.y1); ctx.lineTo(box.x1, box.y1); ctx.stroke();
    // default tick labels show a decimal when the tick step is not a whole number (2.5, 7.5 …)
    const dx = xt.step % 1 ? (xt.step * 10 % 1 ? 2 : 1) : 0, dy = yt.step % 1 ? (yt.step * 10 % 1 ? 2 : 1) : 0;
    yt.values.forEach(v => text(ctx, o.fmtY ? o.fmtY(v) : num(v, dy), box.x0 - 6, Y(v) + 4, { size: 12, mono: true, align: 'right', color: c.text3 }));
    xt.values.forEach(v => text(ctx, o.fmtX ? o.fmtX(v) : num(v, dx), X(v), box.y1 + 16, { size: 12, mono: true, align: 'center', color: c.text3 }));
    text(ctx, o.xTitle, (box.x0 + box.x1) / 2, box.y1 + 33, { size: 12, align: 'center', color: c.text2 });
    ctx.save(); ctx.translate(o.x0 + 10, (box.y0 + box.y1) / 2); ctx.rotate(-Math.PI / 2);
    text(ctx, o.yTitle, 0, 0, { size: 12, align: 'center', color: c.text2 }); ctx.restore();
    return { X, Y, box };
  }

  // The one number that matters: big mono value + unit, announced politely to screen readers
  function primary(parent, o) {
    const val = h('span', { class: 'mlx-primary-val' });
    const unit = h('span', { class: 'mlx-primary-unit', text: L(o.unit) });
    const el = h('div', { class: 'mlx-primary', 'aria-live': 'polite', 'aria-atomic': 'true' }, [
      h('div', { class: 'mlx-card-title', text: L(o.label) }), h('div', { class: 'mlx-primary-line' }, [val, unit]),
    ]);
    parent.appendChild(el);
    return { el, set(v) { val.textContent = v; } };
  }

  // Neutral "predict, then test" box (replaces the inline amber boxes)
  function predict(parent, o) {
    const el = h('div', { class: 'mlx-predict' }, [
      h('strong', { text: L(o.predictLabel || { en: 'Predict first', af: 'Voorspel eers' }) + ': ' }), document.createTextNode(L(o.predict) + ' '),
      h('strong', { text: L(o.testLabel || { en: 'Then test it', af: 'Toets dit dan' }) + ': ' }), document.createTextNode(L(o.test)),
    ]);
    parent.insertBefore(el, parent.firstChild);
    return el;
  }

  window.MLX = { af, L, num, big, h, accent, layout, card, slider, seg, check, button, readout, canvas, loop, text, wrap, roundRect, ready,
    reducedMotion, colors, onTheme, ticks, axes, primary, predict };
})();
