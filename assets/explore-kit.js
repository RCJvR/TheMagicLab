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
  function slider(parent, o) {
    const id = 'mlx-s' + (++uid);
    const out = h('output', { for: id });
    const input = h('input', { type: 'range', id, min: o.min, max: o.max, step: o.step || 1, value: o.value });
    const field = h('div', { class: 'mlx-field' }, [
      h('div', { class: 'mlx-field-head' }, [h('label', { for: id, text: L(o.label) }), out]),
      input,
    ]);
    const show = () => { out.textContent = o.fmt ? o.fmt(+input.value) : input.value; };
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

  window.MLX = { af, L, num, big, h, accent, layout, card, slider, seg, check, button, readout, canvas, loop, text, wrap, roundRect, ready };
})();
