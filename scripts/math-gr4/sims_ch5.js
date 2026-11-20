// Grade 4 Math Magician, Chapter 5 sims (multiple operations and number sentences). Each is (L, root) => void and may only use window.G4.

/* 501 Which first? Tap the operation to do first; the sum shrinks step by step. */
exports.s501 = function (L, root) {
  const { q, rnd } = window.G4;
  const expr = q(root, 'expr'), out = q(root, 'out'), hist = q(root, 'hist');
  let toks = [], mistakes = 0;
  const TEMPLATES = [
    () => [rnd(2, 20), '+', rnd(2, 9), '×', rnd(2, 9)],
    () => [rnd(50, 99), '−', rnd(2, 9), '×', rnd(2, 5)],
    () => { const c = rnd(2, 9), s = c * rnd(3, 12), a = rnd(1, s - 1); return ['(', a, '+', s - a, ')', '÷', c]; },
    () => { const d = rnd(2, 5); return [rnd(4, 9), '×', rnd(3, 9), '−', d * rnd(2, 9), '÷', d]; },
    () => { const b = rnd(10, 30), c = rnd(2, 9); return [rnd(40, 99), '−', '(', b, '−', c, ')']; },
    () => [rnd(2, 12), '×', '(', rnd(2, 9), '+', rnd(2, 9), ')']
  ];
  const isOp = t => typeof t === 'string' && '+−×÷'.includes(t);
  function nextOp(t) {
    let best = -1, depth = 0, bestScore = -1;
    t.forEach((x, i) => {
      if (x === '(') depth++; else if (x === ')') depth--;
      else if (isOp(x) && typeof t[i - 1] === 'number' && typeof t[i + 1] === 'number') {
        const score = depth * 10 + ('×÷'.includes(x) ? 2 : 1);
        if (score > bestScore) { bestScore = score; best = i; }
      }
    });
    return best;
  }
  function apply(t, i) {
    const a = t[i - 1], b = t[i + 1], op = t[i], v = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;
    const n = t.slice(0, i - 1).concat([v], t.slice(i + 2));
    for (let k = 1; k < n.length - 1; k++) if (n[k - 1] === '(' && typeof n[k] === 'number' && n[k + 1] === ')') { n.splice(k + 1, 1); n.splice(k - 1, 1); k = 0; }
    return n;
  }
  const show = t => t.map(x => x).join(' ').replace(/\( /g, '(').replace(/ \)/g, ')');
  function draw() {
    if (toks.length === 1) { expr.innerHTML = '<span class="g4-big">= ' + toks[0] + '</span>'; out.className = 'g4-out good'; out.innerHTML = L.done(toks[0], mistakes); return; }
    expr.innerHTML = toks.map((x, i) => isOp(x) && typeof toks[i - 1] === 'number' && typeof toks[i + 1] === 'number' ? '<button class="g4-btn" data-i="' + i + '" style="font-size:24px;min-width:52px">' + x + '</button>' : '<span class="g4-big" style="font-size:28px">' + x + '</span>').join(' ');
  }
  function fresh() { toks = TEMPLATES[rnd(0, TEMPLATES.length - 1)](); mistakes = 0; hist.innerHTML = '<li><b>' + show(toks) + '</b></li>'; out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.i) {
      const i = +t.dataset.i, want = nextOp(toks);
      if (i !== want) { mistakes++; out.className = 'g4-out bad'; out.innerHTML = L.notFirst(toks[i], toks[want]); return; }
      const sub = toks[i - 1] + ' ' + toks[i] + ' ' + toks[i + 1];
      toks = apply(toks, i);
      hist.innerHTML += '<li>' + L.step(sub) + ' → <b>' + show(toks) + '</b></li>'; out.className = 'g4-out'; out.innerHTML = L.good; draw();
    } else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};

/* 502 Balance: find the missing number that makes both sides equal. */
exports.s502 = function (L, root) {
  const { q, rnd, num } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'box');
  let P = null;
  const PUZ = [
    () => { const x = rnd(5, 40), b = rnd(5, 40); return { txt: x2 => (x2 ?? '□') + ' + ' + b, rhs: x + b, f: v => v + b, x }; },
    () => { const x = rnd(20, 90), b = rnd(5, x - 1); return { txt: x2 => (x2 ?? '□') + ' − ' + b, rhs: x - b, f: v => v - b, x }; },
    () => { const x = rnd(2, 12), a = rnd(2, 9); return { txt: x2 => a + ' × ' + (x2 ?? '□'), rhs: a * x, f: v => a * v, x }; },
    () => { const x = rnd(2, 9), a = rnd(2, 9), b = rnd(3, 9); return { txt: x2 => '(' + a + ' + ' + (x2 ?? '□') + ') × ' + b, rhs: (a + x) * b, f: v => (a + v) * b, x }; },
    () => { const d = rnd(2, 9), qq = rnd(2, 12); return { txt: x2 => (x2 ?? '□') + ' ÷ ' + d, rhs: qq, f: v => v / d, x: d * qq }; }
  ];
  function draw(v) {
    const left = v == null ? null : P.f(v), diff = left == null ? 0 : Math.max(-1, Math.min(1, (left - P.rhs) / Math.max(10, P.rhs)));
    const ang = -diff * 14, ok = left === P.rhs;
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180), L1 = [320 - 210 * c, 80 - 210 * s], R1 = [320 + 210 * c, 80 + 210 * s];
    let h = '<path d="M300 220 L340 220 L320 84 Z" fill="#475569"/><line x1="' + L1[0] + '" y1="' + L1[1] + '" x2="' + R1[0] + '" y2="' + R1[1] + '" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round"/>';
    [[L1, P.txt(v), '#60a5fa'], [R1, String(P.rhs), '#f472b6']].forEach(([p, t, col]) => { h += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + p[0] + '" y2="' + (p[1] + 50) + '" stroke="#94a3b8" stroke-width="2"/><rect x="' + (p[0] - 95) + '" y="' + (p[1] + 50) + '" width="190" height="56" rx="12" fill="rgba(255,255,255,.06)" stroke="' + col + '" stroke-width="3"/><text x="' + p[0] + '" y="' + (p[1] + 86) + '" text-anchor="middle" fill="#fff" font-size="22" font-weight="900">' + t + '</text>'; });
    if (ok) h += '<text x="320" y="40" text-anchor="middle" fill="#4ade80" font-size="22" font-weight="900">' + L.balanced + '</text>';
    svg.innerHTML = h;
    q(root, 'sent').textContent = P.txt() + ' = ' + P.rhs;
    if (v == null) { out.className = 'g4-out'; out.innerHTML = L.ask; }
    else { out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = L.sub(P.txt(v), left, P.rhs, ok) + (ok ? '' : ' ' + (left < P.rhs ? L.bigger : L.smaller)); }
  }
  function fresh() { P = PUZ[rnd(0, PUZ.length - 1)](); inp.value = ''; draw(null); }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'try') { const v = num(inp.value); if (v != null) draw(v); }
    else if (t.dataset.k === 'new') fresh();
  });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { const v = num(inp.value); if (v != null) draw(v); } });
  fresh();
};

/* 503 Words to number sentences: pick the matching sentence, then solve it. */
exports.s503 = function (L, root) {
  const { q, num, shuffle } = window.G4;
  const card = q(root, 'card'), opts = q(root, 'opts'), out = q(root, 'out'), solve = q(root, 'solve');
  let i = 0, stage = 0, score = 0;
  function show() {
    const p = L.items[i]; stage = 0;
    card.innerHTML = '<p style="font-size:21px;margin:0">' + p.w + '</p>';
    q(root, 'count').textContent = L.of(i + 1, L.items.length);
    opts.innerHTML = shuffle(p.o.map((o, k) => [o, k])).map(([o, k]) => '<button class="g4-btn ghost" data-o="' + k + '" style="font-size:20px">' + o + '</button>').join('');
    solve.style.display = 'none'; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.pick;
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return; const p = L.items[i];
    if (t.dataset.o != null && stage === 0) {
      const ok = +t.dataset.o === 0;
      if (!ok) { out.className = 'g4-out bad'; out.innerHTML = L.notThat; t.disabled = true; return; }
      stage = 1; opts.querySelectorAll('button').forEach(b => { b.disabled = true; if (+b.dataset.o === 0) b.setAttribute('aria-pressed', 'true'); });
      solve.style.display = ''; out.className = 'g4-out good'; out.innerHTML = L.nowSolve(p.o[0]);
    } else if (t.dataset.k === 'check') {
      const v = num(q(root, 'ans').value), ok = v === p.a; if (ok && stage === 1) { score++; stage = 2; }
      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.yes(p.o[0].replace('□', '<b>' + p.a + '</b>')) : L.no;
    } else if (t.dataset.k === 'next') { i = (i + 1) % L.items.length; show(); }
  });
  show();
};
