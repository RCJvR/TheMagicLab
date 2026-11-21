// Grade 4 Math Magician, Chapter 9 sims (common fractions). Each is (L, root) => void and may only use window.G4.
// Every sim re-renders its SVG on each tap, so look elements up again after a click.

/* 901 Shade the fraction: tap equal parts of a bar, circle or grid to show a/b. */
exports.s901 = function (L, root) {
  const { q, rnd } = window.G4;
  const out = q(root, 'out'), st = q(root, 'stage');
  const fr = (a, b) => '<span style="display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.05;font-weight:900;margin:0 3px"><span style="border-bottom:2px solid currentColor;padding:0 3px">' + a + '</span><span>' + b + '</span></span>';
  const ON = '#f59e0b', OFF = 'rgba(148,163,184,.10)';
  let n = 4, a = 1, shape = 0, on = [];
  const k = () => on.filter(Boolean).length;
  function draw() {
    let g = '', vb = '';
    const cell = (i, attrs) => '<' + attrs + ' data-p="' + i + '" fill="' + (on[i] ? ON : OFF) + '" stroke="currentColor" stroke-width="3" style="cursor:pointer"/>';
    if (shape === 0) {
      const w = 600 / n; vb = '0 0 640 140';
      for (let i = 0; i < n; i++) g += cell(i, 'rect x="' + (20 + i * w) + '" y="10" width="' + w + '" height="120"');
    } else if (shape === 1) {
      vb = '0 0 640 260'; const cx = 320, cy = 130, r = 120;
      for (let i = 0; i < n; i++) {
        const t0 = (-90 + i * 360 / n) * Math.PI / 180, t1 = (-90 + (i + 1) * 360 / n) * Math.PI / 180;
        const p = 'M' + cx + ' ' + cy + ' L' + (cx + r * Math.cos(t0)).toFixed(1) + ' ' + (cy + r * Math.sin(t0)).toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + (360 / n > 180 ? 1 : 0) + ' 1 ' + (cx + r * Math.cos(t1)).toFixed(1) + ' ' + (cy + r * Math.sin(t1)).toFixed(1) + ' Z';
        g += cell(i, 'path d="' + p + '"');
      }
    } else {
      const cols = n / 2, w = Math.min(150, 600 / cols), x0 = 320 - cols * w / 2; vb = '0 0 640 200';
      for (let i = 0; i < n; i++) g += cell(i, 'rect x="' + (x0 + (i % cols) * w) + '" y="' + (10 + Math.floor(i / cols) * 90) + '" width="' + w + '" height="90"');
    }
    st.innerHTML = '<svg viewBox="' + vb + '" role="img" aria-label="' + L.aria + '">' + g + '</svg>';
    q(root, 'live').innerHTML = L.live(k(), n, fr(k(), n));
  }
  function fresh() {
    n = rnd(2, 8); a = rnd(1, n - 1);
    const opts = [0, 1]; if (n % 2 === 0 && n >= 4) opts.push(2);
    shape = opts[rnd(0, opts.length - 1)]; on = new Array(n).fill(false);
    q(root, 'goal').innerHTML = L.goal(fr(a, n));
    out.className = 'g4-out'; out.innerHTML = L.ask; draw();
  }
  root.addEventListener('click', e => {
    const p = e.target.closest('[data-p]');
    if (p) { const i = +p.getAttribute('data-p'); on[i] = !on[i]; out.className = 'g4-out'; out.innerHTML = L.ask; draw(); return; }
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'check') {
      const s = k();
      out.className = 'g4-out ' + (s === a ? 'good' : 'bad');
      out.innerHTML = s === a ? L.yes(a, n, fr(a, n)) : (s < a ? L.more : L.less)(s, a, n);
    } else if (t.dataset.k === 'clear') { on = new Array(n).fill(false); draw(); }
    else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};

/* 902 Fraction wall: shade the bottom bar until it is exactly as long as the top fraction (equivalent fractions). */
exports.s902 = function (L, root) {
  const { q, rnd } = window.G4;
  const out = q(root, 'out'), st = q(root, 'stage');
  const fr = (a, b) => '<span style="display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.05;font-weight:900;margin:0 3px"><span style="border-bottom:2px solid currentColor;padding:0 3px">' + a + '</span><span>' + b + '</span></span>';
  let a = 1, b = 2, d = 4, kk = 0;
  function bar(y, parts, shaded, col, clickable) {
    const w = 600 / parts; let g = '';
    for (let i = 0; i < parts; i++) g += '<rect ' + (clickable ? 'data-c="' + i + '" style="cursor:pointer" ' : '') + 'x="' + (20 + i * w) + '" y="' + y + '" width="' + w + '" height="100" fill="' + (i < shaded ? col : 'rgba(148,163,184,.10)') + '" stroke="currentColor" stroke-width="3"/>';
    return g;
  }
  function draw() {
    const xEnd = 20 + 600 * a / b;
    st.innerHTML = '<svg viewBox="0 0 640 250" role="img" aria-label="' + L.aria + '">' + bar(10, b, a, '#22c55e', false) + bar(140, d, kk, '#f59e0b', true) +
      '<line x1="' + xEnd + '" y1="4" x2="' + xEnd + '" y2="246" stroke="#38bdf8" stroke-width="4" stroke-dasharray="10 8"/></svg>';
    q(root, 'live').innerHTML = fr(a, b) + ' &nbsp;' + L.and + '&nbsp; ' + fr(kk, d);
  }
  function fresh() {
    do { b = rnd(2, 6); d = b * rnd(2, 4); } while (d > 12);
    a = rnd(1, b - 1); kk = 0;
    q(root, 'goal').innerHTML = L.goal(fr(a, b), d);
    out.className = 'g4-out'; out.innerHTML = L.ask; draw();
  }
  root.addEventListener('click', e => {
    const c = e.target.closest('[data-c]');
    if (c) { const i = +c.getAttribute('data-c'); kk = kk === i + 1 ? i : i + 1; out.className = 'g4-out'; out.innerHTML = L.ask; draw(); return; }
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'minus') { kk = Math.max(0, kk - 1); draw(); }
    else if (t.dataset.k === 'plus') { kk = Math.min(d, kk + 1); draw(); }
    else if (t.dataset.k === 'check') {
      const ok = kk * b === a * d, m = d / b;
      out.className = 'g4-out ' + (ok ? 'good' : 'bad');
      out.innerHTML = ok ? L.yes(fr(a, b), fr(kk, d), a, b, m) : (kk * b < a * d ? L.short : L.long)(fr(kk, d), fr(a, b));
    } else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};

/* 903 Fraction adder: two coloured parts of one bar; type the sum. */
exports.s903 = function (L, root) {
  const { q, rnd, num } = window.G4;
  const out = q(root, 'out'), st = q(root, 'stage');
  const fr = (a, b) => '<span style="display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.05;font-weight:900;margin:0 3px"><span style="border-bottom:2px solid currentColor;padding:0 3px">' + a + '</span><span>' + b + '</span></span>';
  let n = 7, a = 2, b = 3;
  const nm = c => c + ' ' + (c === 1 ? L.N1[n] : L.NM[n]);
  function draw(showSum) {
    const w = 600 / n; let g = '';
    for (let i = 0; i < n; i++) g += '<rect x="' + (20 + i * w) + '" y="10" width="' + w + '" height="100" fill="' + (i < a ? '#22c55e' : i < a + b ? '#f59e0b' : 'rgba(148,163,184,.10)') + '" stroke="currentColor" stroke-width="3"/>';
    if (showSum) g += '<path d="M20 124 v10 H' + (20 + (a + b) * w) + ' v-10" fill="none" stroke="#38bdf8" stroke-width="4"/>';
    st.innerHTML = '<svg viewBox="0 0 640 ' + (showSum ? 144 : 120) + '" role="img" aria-label="' + L.aria + '">' + g + '</svg>';
  }
  function fresh() {
    n = rnd(3, 8); a = rnd(1, n - 2); b = rnd(1, n - a);
    q(root, 'sum').innerHTML = '<span style="color:#4ade80">' + fr(a, n) + '</span> + <span style="color:#fbbf24">' + fr(b, n) + '</span> =';
    q(root, 'nu').value = ''; q(root, 'de').value = '';
    q(root, 'words').textContent = L.words(nm(a), nm(b));
    out.className = 'g4-out'; out.innerHTML = L.ask; draw(false);
  }
  function check() {
    const u = num(q(root, 'nu').value), v = num(q(root, 'de').value);
    if (u == null || v == null) { out.className = 'g4-out bad'; out.innerHTML = L.fill; return; }
    const ok = u === a + b && v === n;
    out.className = 'g4-out ' + (ok ? 'good' : 'bad');
    if (ok) { out.innerHTML = L.yes(fr(a, n), fr(b, n), fr(a + b, n), nm(a), nm(b), nm(a + b)); draw(true); }
    else if (v !== n) out.innerHTML = v === 2 * n ? L.doubled(n, L.NM[n]) : L.den(n);
    else out.innerHTML = L.num(a, b);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'check') check(); else if (t.dataset.k === 'new') fresh();
  });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') check(); });
  fresh();
};

/* 904 Share and find: split a set into equal groups, then pick groups to find a fraction of an amount. */
exports.s904 = function (L, root) {
  const { q, rnd } = window.G4;
  const out = q(root, 'out'), st = q(root, 'stage');
  const fr = (a, b) => '<span style="display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.05;font-weight:900;margin:0 3px"><span style="border-bottom:2px solid currentColor;padding:0 3px">' + a + '</span><span>' + b + '</span></span>';
  let N = 12, a = 3, b = 4, g = 0, sel = new Set(), it = null;
  const img = (x, y, s) => '<image href="/assets/stickers/' + it.s + '.webp" x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '"/>';
  function draw() {
    let svg = '', H;
    if (!g) {
      const cols = Math.min(N, 8), rows = Math.ceil(N / cols), s = 74; H = rows * s + 12;
      for (let i = 0; i < N; i++) svg += img(320 - cols * s / 2 + (i % cols) * s, 6 + Math.floor(i / cols) * s, s);
    } else {
      const k = N / g, s = Math.min(110, 560 / k), rh = s + 16; H = g * (rh + 8) + 8;
      for (let r = 0; r < g; r++) {
        const y = 8 + r * (rh + 8), w = k * s + 24, x = 320 - w / 2, on = sel.has(r);
        svg += '<rect data-g="' + r + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + rh + '" rx="16" fill="' + (on ? 'rgba(245,158,11,.30)' : 'rgba(148,163,184,.08)') + '" stroke="' + (on ? '#f59e0b' : 'currentColor') + '" stroke-width="' + (on ? 5 : 2) + '" style="cursor:pointer"/>';
        for (let j = 0; j < k; j++) svg += '<g style="pointer-events:none">' + img(x + 12 + j * s, y + 8, s) + '</g>';
      }
    }
    st.innerHTML = '<svg viewBox="0 0 640 ' + H + '" role="img" aria-label="' + L.aria + '">' + svg + '</svg>';
  }
  function fresh() {
    it = L.items[rnd(0, L.items.length - 1)]; b = rnd(2, 6); N = b * rnd(2, 5); a = rnd(1, b - 1); g = 0; sel = new Set();
    q(root, 'goal').innerHTML = L.goal(fr(a, b), N, it.n);
    q(root, 'grp').innerHTML = [2, 3, 4, 5, 6, 7, 8].map(v => '<button class="g4-btn ghost" data-n="' + v + '" aria-pressed="false">' + v + '</button>').join('');
    out.className = 'g4-out'; out.innerHTML = L.ask; draw();
  }
  root.addEventListener('click', e => {
    const r = e.target.closest('[data-g]');
    if (r) { const i = +r.getAttribute('data-g'); if (sel.has(i)) sel.delete(i); else sel.add(i); out.className = 'g4-out'; out.innerHTML = L.picked(sel.size, sel.size * (N / g)); draw(); return; }
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.n) {
      const v = +t.dataset.n;
      if (N % v) { out.className = 'g4-out bad'; out.innerHTML = L.notEq(N, v); return; }
      g = v; sel = new Set();
      root.querySelectorAll('[data-n]').forEach(x => x.setAttribute('aria-pressed', String(+x.dataset.n === v)));
      out.className = 'g4-out'; out.innerHTML = L.grouped(N, g, N / g); draw();
    } else if (t.dataset.k === 'check') {
      out.className = 'g4-out bad';
      if (!g) out.innerHTML = L.noG(b);
      else if (g !== b) out.innerHTML = L.wrongG(fr(a, b), b);
      else if (sel.size !== a) out.innerHTML = L.wrongSel(fr(a, b), a);
      else { const k = N / b; out.className = 'g4-out good'; out.innerHTML = L.yes(fr(1, b), fr(a, b), N, b, k, a, a * k, it.n); }
    } else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};
