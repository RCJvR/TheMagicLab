// Grade 4 Math Magician, Chapter 3 sims (multiplication, multiples and factors). Each is (L, root) => void and may only use window.G4.

/* 301 Jumps and arrays: a × b as jumps on a number line and as rows of dots. */
exports.s301 = function (L, root) {
  const { q } = window.G4;
  const line = q(root, 'line'), arr = q(root, 'arr'), out = q(root, 'out');
  let a = 4, b = 2;
  function draw() {
    q(root, 'a').textContent = a; q(root, 'b').textContent = b;
    const total = a * b, max = Math.max(10, Math.ceil(total / 10) * 10), X = n => 30 + n / max * 580;
    let h = '<line x1="30" y1="100" x2="610" y2="100" stroke="#e2e8f0" stroke-width="3"/>';
    for (let n = 0; n <= max; n += (max > 50 ? 10 : 5)) h += '<line x1="' + X(n) + '" y1="92" x2="' + X(n) + '" y2="108" stroke="#e2e8f0" stroke-width="2"/><text x="' + X(n) + '" y="128" text-anchor="middle" fill="rgba(226,232,240,.75)" font-size="14">' + n + '</text>';
    for (let i = 0; i < a; i++) { const x1 = X(i * b), x2 = X((i + 1) * b); h += '<path d="M' + x1 + ' 96 Q' + ((x1 + x2) / 2) + ' ' + (96 - Math.min(60, 14 + (x2 - x1) * 0.6)) + ' ' + x2 + ' 96" fill="none" stroke="#9ed43c" stroke-width="3"/>'; }
    h += '<circle cx="' + X(total) + '" cy="100" r="8" fill="#fde047"/><text x="' + X(total) + '" y="150" text-anchor="middle" fill="#fde047" font-size="18" font-weight="900">' + total + '</text>';
    line.innerHTML = h;
    let g = ''; const s = Math.min(26, 220 / Math.max(a, b));
    for (let r = 0; r < a; r++) for (let c = 0; c < b; c++) g += '<circle cx="' + (20 + c * s + s / 2) + '" cy="' + (10 + r * s + s / 2) + '" r="' + (s * 0.36) + '" fill="#60a5fa"/>';
    arr.setAttribute('viewBox', '0 0 ' + (40 + b * s) + ' ' + (20 + a * s)); arr.innerHTML = g;
    out.innerHTML = '<b>' + a + ' × ' + b + ' = ' + total + '</b><br>' + L.rep(Array(a).fill(b).join(' + '), total) + '<br>' + L.rows(a, b, total);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.s) { const [k, d] = t.dataset.s.split(':'); if (k === 'a') a = Math.max(1, Math.min(10, a + +d)); else b = Math.max(1, Math.min(10, b + +d)); }
    else if (t.dataset.k === 'swap') { [a, b] = [b, a]; out.dataset.swapped = '1'; }
    draw();
    if (t.dataset.k === 'swap') out.innerHTML += '<br>' + L.swapped;
  });
  draw();
};

/* 302 Hundred square: tap all the multiples of a number. */
exports.s302 = function (L, root) {
  const { q } = window.G4;
  const grid = q(root, 'grid'), out = q(root, 'out');
  let n = 8, found = new Set();
  q(root, 'ns').innerHTML = [2, 3, 4, 5, 6, 7, 8, 9].map(k => '<button class="g4-btn ghost" data-n="' + k + '">' + k + '</button>').join('');
  grid.innerHTML = Array.from({ length: 100 }, (_, i) => '<button data-c="' + (i + 1) + '" style="font:700 15px \'Cabinet Grotesk\',sans-serif;padding:0;aspect-ratio:1;border-radius:7px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#e2e8f0;cursor:pointer">' + (i + 1) + '</button>').join('');
  const total = () => Math.floor(100 / n);
  function paint(showAll) {
    root.querySelectorAll('[data-n]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.n === n));
    grid.querySelectorAll('[data-c]').forEach(c => { const v = +c.dataset.c, hit = found.has(v) || (showAll && v % n === 0); c.style.background = hit ? 'rgba(158,212,60,.35)' : 'rgba(255,255,255,.04)'; c.style.borderColor = hit ? '#9ed43c' : 'rgba(255,255,255,.1)'; });
    out.className = 'g4-out' + (found.size === total() ? ' good' : '');
    out.innerHTML = found.size === total() ? L.all(n, total()) : L.found(found.size, total(), n);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.n) { n = +t.dataset.n; found = new Set(); paint(); }
    else if (t.dataset.c) {
      const v = +t.dataset.c;
      if (v % n === 0) { found.add(v); paint(); }
      else { t.style.background = 'rgba(244,63,94,.35)'; setTimeout(() => { t.style.background = found.has(v) ? 'rgba(158,212,60,.35)' : 'rgba(255,255,255,.04)'; }, 500); out.className = 'g4-out bad'; out.innerHTML = L.not(v, n, Math.floor(v / n), v % n); }
    } else if (t.dataset.k === 'show') { for (let v = n; v <= 100; v += n) found.add(v); paint(); }
    else if (t.dataset.k === 'reset') { found = new Set(); paint(); }
  });
  paint();
};

/* 303 Times machine: double, ×10, ×100, ×1 000, and watch the digits move. */
exports.s303 = function (L, root) {
  const { q, fmt, num } = window.G4;
  const inp = q(root, 'n'), chart = q(root, 'chart'), out = q(root, 'out');
  const COLS = L.cols; // TTh, Th, H, T, U ... up to hundred thousands
  function show(v, prev, op) {
    const s = String(v).padStart(COLS.length, ' ');
    chart.innerHTML = '<tr>' + COLS.map(c => '<th>' + c + '</th>').join('') + '</tr><tr>' + [...s].map(d => '<td style="min-width:44px;font-size:28px;transition:all .4s">' + (d === ' ' ? '' : d) + '</td>').join('') + '</tr>';
    if (op == null) { out.innerHTML = L.start; return; }
    if (op === 'x2') out.innerHTML = '<b>' + L.dbl(fmt(prev)) + ' = ' + fmt(prev) + ' + ' + fmt(prev) + ' = ' + fmt(v) + '</b>';
    else out.innerHTML = '<b>' + fmt(prev) + ' × ' + fmt(op) + ' = ' + fmt(v) + '</b><br>' + L.moves(op === 10 ? 1 : op === 100 ? 2 : 3);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t || !t.dataset.op) return;
    let v = num(inp.value); if (v == null || v < 0) v = 0; if (v > 999) v = 999;
    const op = t.dataset.op === 'x2' ? 'x2' : +t.dataset.op, r = op === 'x2' ? v * 2 : v * op;
    show(r, v, op);
  });
  inp.addEventListener('input', () => { const v = num(inp.value); show(v == null ? 0 : Math.min(999, v)); });
  show(73);
};

/* 304 Factors and splitting: all the rectangles a number makes, and the distributive property. */
exports.s304 = function (L, root) {
  const { q } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), ctl = q(root, 'ctl');
  let mode = 'f', n = 18, a = 5, b = 7, cut = 4;
  function factors(k) { const f = []; for (let i = 1; i <= k; i++) if (k % i === 0) f.push(i); return f; }
  function draw() {
    root.querySelectorAll('[data-m]').forEach(x => x.setAttribute('aria-pressed', x.dataset.m === mode));
    let h = '';
    if (mode === 'f') {
      ctl.innerHTML = '<button class="g4-btn ghost" data-d="-1">−</button><span class="g4-big" style="min-width:60px;text-align:center">' + n + '</span><button class="g4-btn ghost" data-d="1">+</button>';
      const f = factors(n), pairs = f.filter(x => x <= n / x).map(x => [x, n / x]);
      const sumC = pairs.reduce((t, p) => t + p[1], 0), maxR = Math.max(...pairs.map(p => p[0])), s = Math.max(6, Math.min(30, (620 - 26 * pairs.length) / sumC, 170 / maxR)); let x = 10; svg.setAttribute('viewBox', '0 0 640 ' + Math.round(50 + maxR * s));
      pairs.forEach(([r, c], i) => { const col = ['#60a5fa', '#f472b6', '#facc15', '#4ade80', '#a78bfa', '#fb923c'][i % 6]; if (x + c * s > 630) return; for (let i2 = 0; i2 < r; i2++) for (let j = 0; j < c; j++) h += '<rect x="' + (x + j * s) + '" y="' + (30 + i2 * s) + '" width="' + (s - 2) + '" height="' + (s - 2) + '" rx="2" fill="' + col + '"/>'; h += '<text x="' + (x + c * s / 2) + '" y="20" text-anchor="middle" fill="' + col + '" font-size="15" font-weight="800">' + r + ' × ' + c + '</text>'; x += c * s + 26; });
      svg.innerHTML = h;
      out.innerHTML = L.facts(n, f.join(', '), f.length) + (f.length === 2 ? '<br>' + L.prime(n) : '');
    } else {
      svg.setAttribute('viewBox', '0 0 640 ' + (60 + a * 30));
      ctl.innerHTML = L.split + ' <input type="range" min="1" max="' + (b - 1) + '" value="' + cut + '" data-k="cut" style="accent-color:#9ed43c;width:200px" aria-label="split">';
      const s = 30;
      for (let r = 0; r < a; r++) for (let c = 0; c < b; c++) h += '<rect x="' + (40 + c * s + (c >= cut ? 14 : 0)) + '" y="' + (20 + r * s) + '" width="' + (s - 4) + '" height="' + (s - 4) + '" rx="4" fill="' + (c < cut ? '#60a5fa' : '#f472b6') + '"/>';
      h += '<text x="' + (40 + cut * s / 2) + '" y="' + (40 + a * s) + '" text-anchor="middle" fill="#93c5fd" font-size="16" font-weight="800">' + a + ' × ' + cut + ' = ' + (a * cut) + '</text><text x="' + (54 + cut * s + (b - cut) * s / 2) + '" y="' + (40 + a * s) + '" text-anchor="middle" fill="#f9a8d4" font-size="16" font-weight="800">' + a + ' × ' + (b - cut) + ' = ' + (a * (b - cut)) + '</text>';
      svg.innerHTML = h;
      out.innerHTML = '<b>' + a + ' × ' + b + ' = ' + a + ' × (' + cut + ' + ' + (b - cut) + ') = (' + a + ' × ' + cut + ') + (' + a + ' × ' + (b - cut) + ') = ' + (a * cut) + ' + ' + (a * (b - cut)) + ' = ' + (a * b) + '</b><br>' + L.why;
      q(root, 'cut').addEventListener('input', ev => { cut = +ev.target.value; draw(); });
    }
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.m) { mode = t.dataset.m; draw(); }
    else if (t.dataset.d) { n = Math.max(2, Math.min(48, n + +t.dataset.d)); draw(); }
    else if (t.dataset.k === 'newsplit') { a = 3 + Math.floor(Math.random() * 6); b = 6 + Math.floor(Math.random() * 7); cut = Math.max(1, Math.min(b - 1, b > 10 ? 10 : Math.floor(b / 2))); mode = 's'; draw(); }
  });
  draw();
};

/* 305 Multiplication problems: read, solve, then see the steps. */
exports.s305 = function (L, root) {
  const { q, num, stk } = window.G4;
  const out = q(root, 'out'), card = q(root, 'card');
  let i = 0, score = 0, tries = 0;
  function show() { const p = L.problems[i]; card.innerHTML = stk(p.s) + '<p>' + p.t + '</p>'; q(root, 'count').textContent = L.of(i + 1, L.problems.length); q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.hint; }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return; const p = L.problems[i];
    if (t.dataset.k === 'check') { const v = num(String(q(root, 'ans').value).replace(/^r/i, '')), ok = v === p.a; tries++; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + '<br>' + p.w.join('<br>') + '<br>' + L.score(score, tries); }
    else if (t.dataset.k === 'next') { i = (i + 1) % L.problems.length; show(); }
  });
  show();
};
