// Grade 4 Math Magician, Chapter 7 sims (perimeter, area, capacity and volume). Each is (L, root) => void and may only use window.G4.

/* 701 Walk the fence: tap every side to walk around the shape, then type the perimeter. */
exports.s701 = function (L, root) {
  const { q, rnd, num } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), run = q(root, 'run'), inp = q(root, 'ans');
  const U = 50, M = 40, MX = 66;
  let pts = [], lens = [], done = [];
  function shape() {
    if (rnd(0, 2) === 0) { const w = rnd(3, 9), h = rnd(2, 5); return [[0, 0], [w, 0], [w, h], [0, h]]; }
    const W = rnd(5, 9), H = rnd(5, 7), a = rnd(2, W - 2), b = rnd(2, H - 2);
    return rnd(0, 1) ? [[0, 0], [W, 0], [W, H - b], [W - a, H - b], [W - a, H], [0, H]] : [[0, 0], [W - a, 0], [W - a, b], [W, b], [W, H], [0, H]];
  }
  const total = () => lens.reduce((s, x) => s + x, 0);
  function draw() {
    const mx = Math.max(...pts.map(p => p[0])), my = Math.max(...pts.map(p => p[1]));
    svg.setAttribute('viewBox', '0 0 ' + (mx * U + 2 * MX) + ' ' + (my * U + 2 * M));
    let h = '';
    for (let x = 0; x <= mx; x++) h += '<line x1="' + (MX + x * U) + '" y1="' + M + '" x2="' + (MX + x * U) + '" y2="' + (M + my * U) + '" stroke="rgba(255,255,255,.07)"/>';
    for (let y = 0; y <= my; y++) h += '<line x1="' + MX + '" y1="' + (M + y * U) + '" x2="' + (MX + mx * U) + '" y2="' + (M + y * U) + '" stroke="rgba(255,255,255,.07)"/>';
    h += '<polygon points="' + pts.map(p => (MX + p[0] * U) + ',' + (M + p[1] * U)).join(' ') + '" fill="rgba(96,165,250,.14)"/>';
    pts.forEach((p, i) => {
      const r = pts[(i + 1) % pts.length], x1 = MX + p[0] * U, y1 = M + p[1] * U, x2 = MX + r[0] * U, y2 = M + r[1] * U;
      const dx = r[0] - p[0], dy = r[1] - p[1], len = Math.abs(dx) + Math.abs(dy), nx = dy / len, ny = -dx / len;
      const col = done[i] ? '#4ade80' : '#60a5fa';
      h += '<g data-s="' + i + '" style="cursor:pointer"><line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="transparent" stroke-width="34"/>' +
        '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + col + '" stroke-width="' + (done[i] ? 9 : 6) + '" stroke-linecap="round"/>' +
        '<text x="' + ((x1 + x2) / 2 + nx * 24) + '" y="' + ((y1 + y2) / 2 + ny * 24 + 8) + '" text-anchor="middle" fill="' + (done[i] ? '#4ade80' : '#fff') + '" font-size="22" font-weight="900">' + len + ' ' + L.unit + '</text></g>';
    });
    svg.innerHTML = h;
    const walked = lens.filter((_, i) => done[i]);
    run.textContent = walked.length ? walked.join(' + ') + ' = ' + walked.reduce((s, x) => s + x, 0) + ' ' + L.unit : L.tapSides;
  }
  function fresh() {
    pts = shape(); lens = pts.map((p, i) => { const r = pts[(i + 1) % pts.length]; return Math.abs(r[0] - p[0]) + Math.abs(r[1] - p[1]); });
    done = pts.map(() => false); inp.value = ''; out.className = 'g4-out'; out.innerHTML = L.ask(pts.length); draw();
  }
  function check() {
    const v = num(inp.value); if (v == null) return;
    const left = done.filter(d => !d).length, P = total();
    if (v === P) { out.className = 'g4-out good'; out.innerHTML = L.yes(lens.join(' + '), P); done = done.map(() => true); draw(); return; }
    out.className = 'g4-out bad';
    out.innerHTML = left ? L.missed(left) : L.sum(v, P > v);
  }
  root.addEventListener('click', e => {
    const s = e.target.closest('[data-s]');
    if (s) { const i = +s.dataset.s; done[i] = !done[i]; draw(); return; }
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'check') check(); else if (t.dataset.k === 'new') fresh();
  });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  fresh();
};

/* 702 Square grid: count the squares inside a shape, or build a shape with a given area. */
exports.s702 = function (L, root) {
  const { q, rnd, num } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'ans'), row = q(root, 'countRow'), live = q(root, 'live');
  const C = 10, R = 6, U = 48, M = 6;
  let mode = 'count', shape = new Set(), marks = [], built = new Set(), target = 0;
  const key = (x, y) => x + ',' + y;
  function makeShape() {
    const s = new Set(), w = rnd(2, 5), h = rnd(2, 4), x0 = rnd(0, 2), y0 = rnd(0, 1);
    for (let x = x0; x < x0 + w; x++) for (let y = y0; y < y0 + h; y++) s.add(key(x, y));
    const w2 = rnd(1, 3), h2 = rnd(1, 3), x1 = x0 + w, y1 = y0 + rnd(0, h - 1);
    for (let x = x1; x < Math.min(C, x1 + w2); x++) for (let y = y1; y < Math.min(R, y1 + h2); y++) s.add(key(x, y));
    return s;
  }
  function draw() {
    svg.setAttribute('viewBox', '0 0 ' + (C * U + 2 * M) + ' ' + (R * U + 2 * M));
    let h = '';
    for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) {
      const k = key(x, y), inS = mode === 'count' ? shape.has(k) : built.has(k), mi = marks.indexOf(k);
      const fill = mode === 'count' ? (mi >= 0 ? 'rgba(74,222,128,.45)' : inS ? 'rgba(96,165,250,.38)' : 'transparent') : (inS ? 'rgba(74,222,128,.5)' : 'transparent');
      h += '<rect data-c="' + k + '" x="' + (M + x * U) + '" y="' + (M + y * U) + '" width="' + U + '" height="' + U + '" fill="' + fill + '" stroke="rgba(255,255,255,.22)" stroke-width="1.5" style="cursor:pointer"/>';
      if (mi >= 0) h += '<text x="' + (M + x * U + U / 2) + '" y="' + (M + y * U + U / 2 + 8) + '" text-anchor="middle" fill="#fff" font-size="22" font-weight="900" pointer-events="none">' + (mi + 1) + '</text>';
    }
    svg.innerHTML = h;
    live.textContent = mode === 'count' ? L.counted(marks.length) : L.have(built.size, target);
  }
  function fresh() {
    out.className = 'g4-out'; inp.value = ''; marks = []; built = new Set();
    if (mode === 'count') { shape = makeShape(); row.style.display = ''; out.innerHTML = L.askCount; }
    else { target = rnd(6, 18); row.style.display = 'none'; out.innerHTML = L.askBuild(target); }
    draw();
  }
  function check() {
    if (mode === 'count') {
      const v = num(inp.value); if (v == null) return; const n = shape.size;
      out.className = 'g4-out ' + (v === n ? 'good' : 'bad');
      out.innerHTML = v === n ? L.yesCount(n) : L.noCount(v, n > v);
    } else {
      const n = built.size, ok = n === target;
      out.className = 'g4-out ' + (ok ? 'good' : 'bad');
      out.innerHTML = ok ? L.yesBuild(n) : L.noBuild(n, target);
    }
  }
  root.addEventListener('click', e => {
    const c = e.target.closest('[data-c]');
    if (c) {
      const k = c.dataset.c;
      if (mode === 'count') { if (!shape.has(k)) return; const i = marks.indexOf(k); if (i >= 0) marks.splice(i, 1); else marks.push(k); }
      else if (built.has(k)) built.delete(k); else built.add(k);
      draw(); return;
    }
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.m) { mode = t.dataset.m; root.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-pressed', String(b === t))); fresh(); }
    else if (t.dataset.k === 'check') check();
    else if (t.dataset.k === 'new') fresh();
  });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  fresh();
};

/* 703 Fill it up: guess how many 250 ml cups fill a container, then pour and see. */
exports.s703 = function (L, root) {
  const { q, rnd, num, fmt } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'guess'), nameEl = q(root, 'name');
  const CUP = 250;
  let c = null, cups = 0, guess = null, last = -1;
  function draw() {
    const n = c.cap / CUP, top = 16, bot = 286, hgt = bot - top, x = 168, w = 150, lvl = Math.min(1, cups / n);
    let h = '<image href="/assets/stickers/' + c.s + '.webp" x="-6" y="70" width="176" height="176"/>';
    h += '<image href="/assets/stickers/ceramic-mug.webp" x="322" y="150" width="128" height="128"/><text x="386" y="292" text-anchor="middle" fill="#cbd5e1" font-size="22" font-weight="800">250 ml</text>';
    h += '<rect x="' + x + '" y="' + (bot - hgt * lvl) + '" width="' + w + '" height="' + (hgt * lvl) + '" fill="rgba(56,189,248,.55)"/>';
    for (let i = 1; i < n; i++) { const y = bot - hgt * i / n; h += '<line x1="' + x + '" y1="' + y + '" x2="' + (x + 18) + '" y2="' + y + '" stroke="rgba(255,255,255,.45)" stroke-width="2"/>'; }
    h += '<path d="M' + x + ' ' + top + ' V' + bot + ' H' + (x + w) + ' V' + top + '" fill="none" stroke="#e2e8f0" stroke-width="5" stroke-linejoin="round"/>';
    h += '<text x="' + (x + w / 2) + '" y="' + (bot - hgt * lvl / 2 + 10) + '" text-anchor="middle" fill="#fff" font-size="26" font-weight="900">' + (cups ? cups + ' × 250' : '') + '</text>';
    svg.innerHTML = h;
  }
  function fresh() {
    let i; do { i = rnd(0, L.cont.length - 1); } while (i === last); last = i;
    c = L.cont[i]; cups = 0; guess = null; inp.value = ''; inp.disabled = false;
    nameEl.textContent = L.title(c.n); out.className = 'g4-out'; out.innerHTML = L.ask(c.n); draw();
  }
  function pour() {
    if (guess == null) { const g = num(inp.value); if (g == null || g < 1) { out.className = 'g4-out bad'; out.innerHTML = L.guessFirst; return; } guess = g; inp.disabled = true; }
    const n = c.cap / CUP;
    if (cups >= n) { out.className = 'g4-out bad'; out.innerHTML = L.over; return; }
    cups++; draw();
    if (cups < n) { out.className = 'g4-out'; out.innerHTML = L.poured(cups, fmt(cups * CUP)); return; }
    out.className = 'g4-out good'; out.innerHTML = L.full(cups, fmt(c.cap), guess, c.cap >= 1000 && c.cap % 1000 === 0 ? c.cap / 1000 : 0);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'pour') pour();
    else if (t.dataset.k === 'empty') { cups = 0; guess = null; inp.disabled = false; out.className = 'g4-out'; out.innerHTML = L.ask(c.n); draw(); }
    else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};

/* 704 Box builder: build a box from 1 cm³ cubes with a target volume; split it into layers to count. */
exports.s704 = function (L, root) {
  const { q, rnd } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out');
  let d = { l: 2, w: 2, h: 1 }, target = 0, layers = false;
  function prism(l, w, h, layersOn) {
    const s = 34, c = 0.866, gap = layersOn ? 0.7 : 0, P = (x, y, z) => [(x - y) * c * s, (x + y) * 0.5 * s - z * s];
    const poly = (a, fill) => '<polygon points="' + a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ') + '" fill="' + fill + '" stroke="#1e3a8a" stroke-width="2" stroke-linejoin="round"/>';
    const ln = (a, b) => '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="#1e3a8a" stroke-width="1.5"/>';
    let g = '';
    for (let k = 0; k < h; k++) {
      const z0 = k * (1 + gap), z1 = z0 + 1;
      g += poly([P(l, 0, z0), P(l, w, z0), P(l, w, z1), P(l, 0, z1)], '#3b82f6');
      for (let j = 1; j < w; j++) g += ln(P(l, j, z0), P(l, j, z1));
      g += poly([P(0, w, z0), P(l, w, z0), P(l, w, z1), P(0, w, z1)], '#60a5fa');
      for (let i = 1; i < l; i++) g += ln(P(i, w, z0), P(i, w, z1));
      if (layersOn || k === h - 1) {
        g += poly([P(0, 0, z1), P(l, 0, z1), P(l, w, z1), P(0, w, z1)], '#bfdbfe');
        for (let i = 1; i < l; i++) g += ln(P(i, 0, z1), P(i, w, z1));
        for (let j = 1; j < w; j++) g += ln(P(0, j, z1), P(l, j, z1));
      }
    }
    const H = h * (1 + gap) - gap, x0 = -w * c * s - 8, x1 = l * c * s + 8, y0 = -H * s - 8, y1 = (l + w) * 0.5 * s + 8;
    return { g, vb: x0.toFixed(1) + ' ' + y0.toFixed(1) + ' ' + (x1 - x0).toFixed(1) + ' ' + (y1 - y0).toFixed(1) };
  }
  function draw() {
    const p = prism(d.l, d.w, d.h, layers);
    svg.setAttribute('viewBox', p.vb); svg.innerHTML = p.g;
    ['l', 'w', 'h'].forEach(k => { q(root, 'v' + k).textContent = d[k]; });
    q(root, 'count').textContent = L.sizes(d.l, d.w, d.h);
  }
  function fresh() {
    let a, b, c2; do { a = rnd(1, 5); b = rnd(1, 4); c2 = rnd(1, 4); } while (a * b * c2 < 6 || a * b * c2 > 40);
    target = a * b * c2; d = { l: 1, w: 1, h: 1 }; layers = false; q(root, 'layers').setAttribute('aria-pressed', 'false');
    q(root, 'goal').textContent = L.goal(target); out.className = 'g4-out'; out.innerHTML = L.ask; draw();
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.d) { const k = t.dataset.d.slice(1), up = t.dataset.d[0] === '+'; d[k] = Math.max(1, Math.min(k === 'l' ? 6 : 5, d[k] + (up ? 1 : -1))); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }
    else if (t.dataset.k === 'layers') { layers = !layers; t.setAttribute('aria-pressed', String(layers)); draw(); }
    else if (t.dataset.k === 'check') {
      const v = d.l * d.w * d.h, ok = v === target;
      out.className = 'g4-out ' + (ok ? 'good' : 'bad');
      out.innerHTML = (ok ? L.yes : L.no)(d.l, d.w, d.h, v, target);
    } else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};
