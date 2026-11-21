// Grade 4 Math Magician, Chapter 1 sims. Each sim is (L, root) => void; L holds the words for one language.
// They are serialised into the lesson HTML as inline scripts, so they must not reference anything outside
// themselves except window.G4 (the shared helpers defined in PRELUDE).
exports.PRELUDE = `window.G4 = window.G4 || {
  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),
  stk: (name, cls) => '<img class="g4-stk ' + (cls || '') + '" src="/assets/stickers/' + name + '.webp" srcset="/assets/stickers/' + name + '@2x.webp 2x" alt="">',
  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },
  q: (root, k) => root.querySelector('[data-k="' + k + '"]'),
  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }
};`;

/* 101 Counting: a frog hops along a number line in the chosen interval. */
exports.s101 = function (L, root) {
  const { fmt, q } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), startEl = q(root, 'start');
  let step = 2, dir = 1, seq = [];
  const STEPS = [2, 3, 5, 10, 25, 50, 100, 9];
  q(root, 'steps').innerHTML = STEPS.map(s => '<button class="g4-btn ghost" data-s="' + s + '">' + L.inS(s) + '</button>').join('');
  q(root, 'dir').innerHTML = '<button class="g4-btn ghost" data-d="1">' + L.fwd + '</button><button class="g4-btn ghost" data-d="-1">' + L.back + '</button>';
  const mark = () => {
    root.querySelectorAll('[data-s]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.s === step));
    root.querySelectorAll('[data-d]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.d === dir));
  };
  const reset = () => { const v = window.G4.num(startEl.value); seq = [v == null ? 0 : Math.max(0, Math.min(9999, v))]; draw(); };
  function draw() {
    mark();
    const show = seq.slice(-6), x0 = 50, gap = 108;
    let h = '<line x1="20" y1="120" x2="620" y2="120" stroke="rgba(226,232,240,.5)" stroke-width="3"/>';
    show.forEach((n, i) => {
      const x = x0 + i * gap;
      h += '<line x1="' + x + '" y1="110" x2="' + x + '" y2="130" stroke="#e2e8f0" stroke-width="3"/><text x="' + x + '" y="158" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">' + fmt(n) + '</text>';
      if (i > 0) h += '<path d="M' + (x - gap + 6) + ' 108 Q' + (x - gap / 2) + ' 52 ' + (x - 6) + ' 108" fill="none" stroke="#9ed43c" stroke-width="3" stroke-dasharray="6 5"/><text x="' + (x - gap / 2) + '" y="62" text-anchor="middle" fill="#c3e56f" font-size="16" font-weight="800">' + (dir > 0 ? '+' : '−') + step + '</text>';
    });
    const fx = x0 + (show.length - 1) * gap;
    h += '<image href="/assets/stickers/frog.webp" x="' + (fx - 43) + '" y="20" width="86" height="86"/>';
    svg.innerHTML = h;
    let msg = '<b>' + seq.map(fmt).join('; ') + '</b>';
    if (seq.length > 2) msg += '<br>' + L.pattern(step, dir);
    if (step === 9 && seq.length > 1) msg += '<br>' + L.nine(dir);
    out.innerHTML = msg;
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.s) { step = +b.dataset.s; reset(); }
    else if (b.dataset.d) { dir = +b.dataset.d; reset(); }
    else if (b.dataset.k === 'hop') {
      const nx = seq[seq.length - 1] + dir * step;
      if (nx < 0) { out.innerHTML = L.belowZero; return; }
      if (nx > 10000) { out.innerHTML = L.tooBig; return; }
      seq.push(nx); draw();
    } else if (b.dataset.k === 'reset') reset();
  });
  startEl.addEventListener('change', reset);
  reset();
};

/* 102 Place value: build a number with base-ten blocks. */
exports.s102 = function (L, root) {
  const { fmt, q, rnd } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out');
  const v = [0, 0, 0, 0]; // thousands, hundreds, tens, units
  const COL = ['#f472b6', '#60a5fa', '#facc15', '#4ade80'], VAL = [1000, 100, 10, 1];
  let target = null;
  const value = () => v[0] * 1000 + v[1] * 100 + v[2] * 10 + v[3];
  q(root, 'chart').innerHTML = '<tr>' + L.cols.map((c, i) => '<th style="color:' + COL[i] + '">' + c + '</th>').join('') + '</tr><tr>' + v.map((_, i) => '<td data-i="' + i + '">0</td>').join('') + '</tr><tr>' +
    v.map((_, i) => '<th><button class="g4-btn ghost" data-a="' + i + ':-1" aria-label="' + L.minus + ' ' + L.cols[i] + '">−</button> <button class="g4-btn ghost" data-a="' + i + ':1" aria-label="' + L.plus + ' ' + L.cols[i] + '">+</button></th>').join('') + '</tr>';
  function blocks() {
    let h = '', x = 10;
    for (let k = 0; k < v[0]; k++) { const bx = 10 + (k % 3) * 52, by = 20 + Math.floor(k / 3) * 52; h += '<rect x="' + (bx + 8) + '" y="' + (by - 8) + '" width="40" height="40" fill="#9d174d"/><rect x="' + bx + '" y="' + by + '" width="40" height="40" fill="' + COL[0] + '" stroke="#831843" stroke-width="2"/>'; }
    x = 175;
    for (let k = 0; k < v[1]; k++) { const bx = x + (k % 3) * 46, by = 14 + Math.floor(k / 3) * 46; h += '<rect x="' + bx + '" y="' + by + '" width="40" height="40" fill="' + COL[1] + '" stroke="#1e3a8a" stroke-width="1.5"/>'; for (let g = 1; g < 10; g++) h += '<line x1="' + (bx + g * 4) + '" y1="' + by + '" x2="' + (bx + g * 4) + '" y2="' + (by + 40) + '" stroke="#1e3a8a" stroke-width=".6"/><line x1="' + bx + '" y1="' + (by + g * 4) + '" x2="' + (bx + 40) + '" y2="' + (by + g * 4) + '" stroke="#1e3a8a" stroke-width=".6"/>'; }
    x = 330;
    for (let k = 0; k < v[2]; k++) { const bx = x + k * 13; h += '<rect x="' + bx + '" y="20" width="9" height="90" fill="' + COL[2] + '" stroke="#713f12" stroke-width="1"/>'; for (let g = 1; g < 10; g++) h += '<line x1="' + bx + '" y1="' + (20 + g * 9) + '" x2="' + (bx + 9) + '" y2="' + (20 + g * 9) + '" stroke="#713f12" stroke-width=".6"/>'; }
    x = 470;
    for (let k = 0; k < v[3]; k++) h += '<rect x="' + (x + (k % 5) * 16) + '" y="' + (40 + Math.floor(k / 5) * 16) + '" width="12" height="12" fill="' + COL[3] + '" stroke="#14532d" stroke-width="1"/>';
    L.cols.forEach((c, i) => { h += '<text x="' + [70, 240, 390, 510][i] + '" y="186" text-anchor="middle" fill="' + COL[i] + '" font-size="15" font-weight="800">' + v[i] + ' × ' + fmt(VAL[i]) + '</text>'; });
    svg.innerHTML = h;
  }
  function draw(checkNow) {
    root.querySelectorAll('td[data-i]').forEach(td => { td.textContent = v[+td.dataset.i]; });
    blocks();
    const n = value(), parts = v.map((d, i) => d * VAL[i]).filter(p => p > 0).map(fmt);
    q(root, 'num').textContent = fmt(n);
    let msg = n ? '<b>' + fmt(n) + ' = ' + (parts.join(' + ') || '0') + '</b>' : L.start;
    if (target != null) msg = L.build(fmt(target)) + '<br>' + msg;
    out.className = 'g4-out';
    if (checkNow && target != null) { const ok = n === target; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); msg += '<br>' + (ok ? L.yes : L.notYet); }
    out.innerHTML = msg;
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.a) { const [i, d] = b.dataset.a.split(':').map(Number); v[i] = Math.max(0, Math.min(9, v[i] + d)); draw(); }
    else if (b.dataset.k === 'challenge') { target = rnd(1, 9) * 1000 + rnd(0, 9) * 100 + (Math.random() < .3 ? 0 : rnd(0, 9) * 10) + rnd(0, 9); v.fill(0); draw(); }
    else if (b.dataset.k === 'check') draw(true);
    else if (b.dataset.k === 'clear') { v.fill(0); target = null; draw(); }
  });
  v[0] = 4; v[1] = 3; v[2] = 7; v[3] = 1; draw();
};

/* 103 Number lines: tap where a number belongs. */
exports.s103 = function (L, root) {
  const { fmt, q, rnd, pt } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out');
  const RANGES = [100, 1000, 10000];
  let max = 1000, target = 0, done = false, score = 0, tries = 0;
  q(root, 'ranges').innerHTML = RANGES.map(r => '<button class="g4-btn ghost" data-r="' + r + '">0 – ' + fmt(r) + '</button>').join('');
  const X = n => 40 + n / max * 560;
  function base(extra) {
    let h = '<line x1="40" y1="90" x2="600" y2="90" stroke="#e2e8f0" stroke-width="3"/>';
    for (let k = 0; k <= 10; k++) { const n = max / 10 * k, x = X(n); h += '<line x1="' + x + '" y1="' + (k % 5 ? 80 : 74) + '" x2="' + x + '" y2="' + (k % 5 ? 100 : 106) + '" stroke="#e2e8f0" stroke-width="2"/>'; if (k % 5 === 0 || max <= 1000) h += '<text x="' + x + '" y="128" text-anchor="middle" fill="rgba(226,232,240,.75)" font-size="' + (max >= 10000 ? 13 : 15) + '">' + fmt(n) + '</text>'; }
    svg.innerHTML = h + (extra || '');
  }
  function next() {
    root.querySelectorAll('[data-r]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.r === max));
    const step = max / 100; target = rnd(1, 99) * step; if (max === 10000 && Math.random() < .5) target += rnd(1, 9) * 10;
    done = false; q(root, 'target').textContent = fmt(target); out.className = 'g4-out'; out.innerHTML = L.tap(fmt(target)); base();
  }
  svg.addEventListener('click', e => {
    if (done) return;
    const p = pt(svg, e), n = Math.round(Math.max(0, Math.min(max, (p.x - 40) / 560 * max)));
    const off = Math.abs(n - target) / max, good = off <= 0.03; done = true; tries++; if (good) score++;
    base('<circle cx="' + X(n) + '" cy="90" r="9" fill="' + (good ? '#4ade80' : '#fb7185') + '"/><path d="M' + X(target) + ' 60 l-8 -14 h16 z" fill="#fde047"/><text x="' + X(target) + '" y="38" text-anchor="middle" fill="#fde047" font-size="18" font-weight="900">' + fmt(target) + '</text>');
    out.className = 'g4-out ' + (good ? 'good' : 'bad'); out.innerHTML = (good ? L.close : L.far) + ' ' + L.score(score, tries);
  });
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.r) { max = +b.dataset.r; next(); } else if (b.dataset.k === 'next') next();
  });
  next();
};

/* 104 Rounding: see which multiple a number is closer to. */
exports.s104 = function (L, root) {
  const { fmt, q, rnd } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'n');
  let place = 100;
  q(root, 'places').innerHTML = [10, 100, 1000].map(p => '<button class="g4-btn ghost" data-p="' + p + '">' + L.nearest(fmt(p)) + '</button>').join('');
  function draw() {
    root.querySelectorAll('[data-p]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.p === place));
    let n = window.G4.num(inp.value); if (n == null) n = 0; n = Math.max(0, Math.min(9999, n));
    const lo = Math.floor(n / place) * place, hi = lo + place, mid = lo + place / 2, r = n - lo >= place / 2 ? hi : lo;
    const X = m => 60 + (m - lo) / place * 520;
    let h = '<line x1="60" y1="100" x2="580" y2="100" stroke="#e2e8f0" stroke-width="3"/>';
    [[lo, 1], [mid, 0], [hi, 1]].forEach(([m, big]) => { h += '<line x1="' + X(m) + '" y1="' + (big ? 86 : 92) + '" x2="' + X(m) + '" y2="' + (big ? 114 : 108) + '" stroke="' + (big ? '#e2e8f0' : 'rgba(226,232,240,.5)') + '" stroke-width="3"/><text x="' + X(m) + '" y="140" text-anchor="middle" fill="' + (big ? '#fff' : 'rgba(226,232,240,.55)') + '" font-size="' + (big ? 20 : 15) + '" font-weight="800">' + fmt(m) + '</text>'; });
    h += '<text x="' + X(mid) + '" y="160" text-anchor="middle" fill="rgba(226,232,240,.5)" font-size="12">' + L.halfway + '</text>';
    h += '<circle cx="' + X(n) + '" cy="100" r="10" fill="#fde047"/><text x="' + X(n) + '" y="70" text-anchor="middle" fill="#fde047" font-size="20" font-weight="900">' + fmt(n) + '</text>';
    h += '<path d="M' + X(n) + ' 46 Q' + ((X(n) + X(r)) / 2) + ' 14 ' + X(r) + ' 80" fill="none" stroke="#9ed43c" stroke-width="3" marker-end="url(#g4arr)"/>';
    svg.innerHTML = '<defs><marker id="g4arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#9ed43c"/></marker></defs>' + h;
    out.innerHTML = L.explain(fmt(n), fmt(lo), fmt(hi), fmt(r), n - lo === place / 2) + '<br><b>' + fmt(n) + ' ≈ ' + fmt(r) + '</b>';
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.p) { place = +b.dataset.p; draw(); } else if (b.dataset.k === 'rand') { inp.value = rnd(1, 9999); draw(); }
  });
  inp.addEventListener('input', draw);
  draw();
};

/* 105 Adding: break the numbers down step by step, or line them up in columns. */
exports.s105 = function (L, root) {
  const { fmt, q, rnd } = window.G4;
  const out = q(root, 'out'), list = q(root, 'steps'), col = q(root, 'col');
  let a, b, shown, column = false;
  const split = n => [Math.floor(n / 1000) * 1000, Math.floor(n % 1000 / 100) * 100, Math.floor(n % 100 / 10) * 10, n % 10];
  function steps() {
    const A = split(a), B = split(b), S = A.map((x, i) => x + B[i]);
    return [
      fmt(a) + ' = ' + A.filter(Boolean).map(fmt).join(' + '),
      fmt(b) + ' = ' + B.filter(Boolean).map(fmt).join(' + '),
      L.parts.map((p, i) => p + ': ' + fmt(A[i]) + ' + ' + fmt(B[i]) + ' = <b>' + fmt(S[i]) + '</b>').join('<br>'),
      fmt(S[0]) + ' + ' + fmt(S[1]) + ' + ' + fmt(S[2]) + ' + ' + fmt(S[3]) + ' = <b>' + fmt(a + b) + '</b>'
    ];
  }
  function columnText() {
    const da = String(a).padStart(4, ' '), db = String(b).padStart(4, ' '), s = String(a + b).padStart(5, ' ');
    let carry = '', c = 0; const ca = [];
    for (let i = 3; i >= 0; i--) { const t = (+da[i] || 0) + (+db[i] || 0) + c; c = t >= 10 ? 1 : 0; ca[i - 1] = c ? '1' : ' '; }
    carry = ' ' + [0, 1, 2].map(i => ca[i] || ' ').join('') + ' ';
    return '<span class="carry">' + carry + '</span>\n ' + da + '\n+' + db + '\n─────\n' + s;
  }
  function draw() {
    q(root, 'sum').textContent = fmt(a) + ' + ' + fmt(b) + ' = ?';
    const st = steps();
    list.innerHTML = st.slice(0, shown).map(s => '<li>' + s + '</li>').join('');
    q(root, 'next').disabled = shown >= st.length;
    col.style.display = column ? '' : 'none'; col.innerHTML = columnText();
    q(root, 'colbtn').setAttribute('aria-pressed', column);
  }
  function fresh() { a = rnd(1000, 4999); b = rnd(1000, 4999); shown = 0; out.className = 'g4-out'; out.innerHTML = L.tryFirst; q(root, 'ans').value = ''; draw(); }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'next') { shown++; draw(); }
    else if (t.dataset.k === 'colbtn') { column = !column; draw(); }
    else if (t.dataset.k === 'new') fresh();
    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'ans').value), ok = v === a + b; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right(fmt(a + b)) : L.wrong; }
  });
  fresh(); a = 4362; b = 2486; draw();
};

/* 106 Subtracting: a fact family shows that subtraction undoes addition. */
exports.s106 = function (L, root) {
  const { fmt, q, rnd } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), list = q(root, 'facts'), ai = q(root, 'a'), bi = q(root, 'b');
  let hide = -1;
  function draw() {
    const a = Math.max(0, window.G4.num(ai.value) || 0), b = Math.max(0, window.G4.num(bi.value) || 0), c = a + b;
    svg.innerHTML = '<path d="M320 20 L180 180 L460 180 Z" fill="rgba(158,212,60,.08)" stroke="#9ed43c" stroke-width="3"/>' +
      '<circle cx="320" cy="58" r="34" fill="#0d1016" stroke="#fde047" stroke-width="3"/><text x="320" y="65" text-anchor="middle" fill="#fde047" font-size="22" font-weight="900">' + fmt(c) + '</text>' +
      '<circle cx="225" cy="150" r="34" fill="#0d1016" stroke="#60a5fa" stroke-width="3"/><text x="225" y="157" text-anchor="middle" fill="#93c5fd" font-size="22" font-weight="900">' + fmt(a) + '</text>' +
      '<circle cx="415" cy="150" r="34" fill="#0d1016" stroke="#f472b6" stroke-width="3"/><text x="415" y="157" text-anchor="middle" fill="#f9a8d4" font-size="22" font-weight="900">' + fmt(b) + '</text>';
    const F = [[a, '+', b, c], [b, '+', a, c], [c, '−', a, b], [c, '−', b, a]];
    list.innerHTML = F.map((f, i) => '<li>' + (i === hide ? f.slice(0, 3).map(x => typeof x === 'number' ? fmt(x) : x).join(' ') + ' = <input class="g4-input" data-k="blank" inputmode="numeric" style="width:110px"> <button class="g4-btn" data-k="check">' + L.check + '</button>' : '<b>' + fmt(f[0]) + ' ' + f[1] + ' ' + fmt(f[2]) + ' = ' + fmt(f[3]) + '</b>') + '</li>').join('');
    return F;
  }
  let F = draw();
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'quiz') { const a = rnd(100, 2999), b = rnd(100, 2999); ai.value = a; bi.value = b; hide = rnd(2, 3); F = draw(); out.className = 'g4-out'; out.innerHTML = L.fill; }
    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'blank').value), ok = v === F[hide][3]; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right : L.wrong(fmt(F[hide][0]), F[hide][1], fmt(F[hide][2])); }
  });
  [ai, bi].forEach(el => el.addEventListener('input', () => { hide = -1; F = draw(); out.className = 'g4-out'; out.innerHTML = L.explain; }));
  out.innerHTML = L.explain;
};

/* 107 Word problems: decide + or −, then solve. */
exports.s107 = function (L, root) {
  const { fmt, q } = window.G4;
  const out = q(root, 'out'), card = q(root, 'card'), ansRow = q(root, 'ansrow');
  let i = 0, score = 0;
  function show() {
    const p = L.problems[i];
    card.innerHTML = window.G4.stk(p.s) + '<p>' + p.t + '</p>';
    q(root, 'count').textContent = L.of(i + 1, L.problems.length);
    ansRow.style.display = 'none'; q(root, 'ops').style.display = ''; out.className = 'g4-out'; out.innerHTML = L.which; q(root, 'ans').value = '';
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return; const p = L.problems[i];
    if (t.dataset.op) {
      const ok = t.dataset.op === p.op; out.className = 'g4-out ' + (ok ? 'good' : 'bad');
      out.innerHTML = (ok ? L.opRight : L.opWrong) + ' ' + L.why(p.why);
      q(root, 'ops').style.display = 'none'; ansRow.style.display = '';
    } else if (t.dataset.k === 'check') {
      const v = window.G4.num(String(q(root, 'ans').value).replace(/^r/i, '')), ok = v === p.a; if (ok) score++;
      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.solved : L.notQuite) + ' ' + p.w;
    } else if (t.dataset.k === 'next') { i = (i + 1) % L.problems.length; show(); }
  });
  show();
};
