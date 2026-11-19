// Grade 4 Math Magician, Chapter 4 sims (multiplication and division). Each is (L, root) => void and may only use window.G4.

/* 401 Jump back: division as repeated subtraction on a number line, with any remainder. */
exports.s401 = function (L, root) {
  const { q } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out');
  let n = 74, d = 9;
  function draw() {
    q(root, 'n').textContent = n; q(root, 'd').textContent = d;
    const k = Math.floor(n / d), r = n % d, max = Math.max(10, Math.ceil(n / 10) * 10), X = v => 30 + v / max * 580;
    let h = '<line x1="30" y1="110" x2="610" y2="110" stroke="#e2e8f0" stroke-width="3"/>';
    for (let v = 0; v <= max; v += (max > 60 ? 10 : 5)) h += '<line x1="' + X(v) + '" y1="102" x2="' + X(v) + '" y2="118" stroke="#e2e8f0" stroke-width="2"/><text x="' + X(v) + '" y="138" text-anchor="middle" fill="rgba(226,232,240,.7)" font-size="13">' + v + '</text>';
    for (let i = 0; i < k; i++) { const a = X(n - i * d), b = X(n - (i + 1) * d); h += '<path d="M' + a + ' 106 Q' + ((a + b) / 2) + ' ' + (106 - Math.min(58, 12 + (a - b) * 0.6)) + ' ' + b + ' 106" fill="none" stroke="#f472b6" stroke-width="3"/>'; }
    h += '<circle cx="' + X(n) + '" cy="110" r="8" fill="#fde047"/>';
    if (r) h += '<rect x="' + X(0) + '" y="100" width="' + (X(r) - X(0)) + '" height="20" rx="4" fill="rgba(250,204,21,.35)"/><text x="' + ((X(0) + X(r)) / 2) + '" y="92" text-anchor="middle" fill="#fde047" font-size="14" font-weight="800">' + L.left(r) + '</text>';
    svg.innerHTML = h;
    out.innerHTML = '<b>' + n + ' ÷ ' + d + ' = ' + k + (r ? ' ' + L.rem + ' ' + r : '') + '</b><br>' + L.jumps(k, d, r) + '<br>' + L.check(d, k, r, n);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t || !t.dataset.s) return;
    const [k, s] = t.dataset.s.split(':'); if (k === 'n') n = Math.max(1, Math.min(100, n + +s)); else d = Math.max(2, Math.min(12, d + +s)); draw();
  });
  draw();
};

/* 402 Halving and odd/even: break a number down to halve it; pairs show even or odd. */
exports.s402 = function (L, root) {
  const { q, num, fmt } = window.G4;
  const inp = q(root, 'n'), out = q(root, 'out'), svg = q(root, 'svg');
  function draw() {
    let v = num(inp.value); if (v == null || v < 0) v = 0; v = Math.min(998, v);
    const even = v % 2 === 0, parts = v >= 100 ? [Math.floor(v / 100) * 100, v % 100] : v >= 10 ? [Math.floor(v / 10) * 10, v % 10] : [v];
    let h = '';
    if (v <= 40) { for (let i = 0; i < v; i++) { const pair = Math.floor(i / 2), top = i % 2; h += '<circle cx="' + (30 + pair * 30) + '" cy="' + (30 + top * 34) + '" r="12" fill="' + (i === v - 1 && !even ? '#fde047' : '#60a5fa') + '"/>'; } svg.setAttribute('viewBox', '0 0 640 100'); svg.innerHTML = h; svg.parentNode.style.display = ''; }
    else svg.parentNode.style.display = 'none';
    const halfSteps = parts.length > 1 && parts[1] ? L.halfParts(parts.map(fmt), parts.map(p => fmt(p / 2))) : '';
    out.innerHTML = (even ? '<b>' + L.half(fmt(v), fmt(v / 2)) + '</b>' + (halfSteps ? '<br>' + halfSteps : '') : '<b>' + L.halfOdd(fmt(v), fmt(Math.floor(v / 2))) + '</b>') + '<br>' + (even ? L.even(fmt(v)) : L.odd(fmt(v))) + (v <= 40 ? '<br>' + (even ? L.pairsEven : L.pairsOdd) : '');
  }
  inp.addEventListener('input', draw);
  root.addEventListener('click', e => { const t = e.target.closest('button'); if (t && t.dataset.v) { inp.value = t.dataset.v; draw(); } });
  draw();
};

/* 403 Break-it-down divider: take away big multiples until nothing is left. */
exports.s403 = function (L, root) {
  const { q, rnd } = window.G4;
  const list = q(root, 'steps'), out = q(root, 'out');
  let n, d, shown;
  function chunks() {
    const st = []; let left = n, total = 0;
    while (left > 0) {
      let m = 1; if (left >= d * 100) m = Math.floor(left / (d * 100)) * 100; else if (left >= d * 10) m = Math.floor(left / (d * 10)) * 10; else m = Math.floor(left / d);
      st.push([left, m]); total += m; left -= d * m;
    }
    return { st, total };
  }
  function draw() {
    q(root, 'sum').textContent = n + ' ÷ ' + d + ' = ?';
    const { st, total } = chunks();
    const rows = st.map(([left, m]) => L.take(d, m, d * m, left, left - d * m));
    rows.push(L.add(st.map(s => s[1]).join(' + '), total));
    list.innerHTML = rows.slice(0, shown).map(r => '<li>' + r + '</li>').join('');
    q(root, 'next').disabled = shown >= rows.length;
  }
  function fresh() { d = rnd(3, 9); const ans = rnd(12, 99); n = d * ans; if (n > 999 || n < 100) return fresh(); shown = 0; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.tryFirst; draw(); }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'next') { shown++; draw(); }
    else if (t.dataset.k === 'new') fresh();
    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'ans').value), ok = v === n / d; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right(n / d, d, n) : L.wrong; }
  });
  fresh(); n = 192; d = 8; draw();
};

/* 404 Fact family for × and ÷. */
exports.s404 = function (L, root) {
  const { q, rnd } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), list = q(root, 'facts'), ai = q(root, 'a'), bi = q(root, 'b');
  let hide = -1, F = [];
  function draw() {
    const a = Math.max(1, window.G4.num(ai.value) || 1), b = Math.max(1, window.G4.num(bi.value) || 1), c = a * b;
    svg.innerHTML = '<path d="M320 20 L180 180 L460 180 Z" fill="rgba(158,212,60,.08)" stroke="#9ed43c" stroke-width="3"/><circle cx="320" cy="58" r="36" fill="#0d1016" stroke="#fde047" stroke-width="3"/><text x="320" y="65" text-anchor="middle" fill="#fde047" font-size="22" font-weight="900">' + c + '</text><circle cx="225" cy="150" r="34" fill="#0d1016" stroke="#60a5fa" stroke-width="3"/><text x="225" y="157" text-anchor="middle" fill="#93c5fd" font-size="22" font-weight="900">' + a + '</text><circle cx="415" cy="150" r="34" fill="#0d1016" stroke="#f472b6" stroke-width="3"/><text x="415" y="157" text-anchor="middle" fill="#f9a8d4" font-size="22" font-weight="900">' + b + '</text><text x="320" y="150" text-anchor="middle" fill="#c3e56f" font-size="26" font-weight="900">× ÷</text>';
    F = [[a, '×', b, c], [b, '×', a, c], [c, '÷', a, b], [c, '÷', b, a]];
    list.innerHTML = F.map((f, i) => '<li>' + (i === hide ? f[0] + ' ' + f[1] + ' ' + f[2] + ' = <input class="g4-input" data-k="blank" inputmode="numeric" style="width:100px"> <button class="g4-btn" data-k="check">' + L.check + '</button>' : '<b>' + f.slice(0, 3).join(' ') + ' = ' + f[3] + '</b>') + '</li>').join('');
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'quiz') { ai.value = rnd(3, 12); bi.value = rnd(11, 49); hide = rnd(2, 3); draw(); out.className = 'g4-out'; out.innerHTML = L.fill; }
    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'blank').value), ok = v === F[hide][3]; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right : L.wrong; }
  });
  [ai, bi].forEach(el => el.addEventListener('input', () => { hide = -1; draw(); out.className = 'g4-out'; out.innerHTML = L.explain; }));
  draw(); out.innerHTML = L.explain;
};

/* 405 Fair share: deal items into groups one round at a time and see what is left over. */
exports.s405 = function (L, root) {
  const { q, stk } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out');
  let n = 50, k = 6, dealt = 0;
  function draw() {
    q(root, 'n').textContent = n; q(root, 'k').textContent = k;
    const each = Math.floor(dealt / k), W = 600 / k, cols = Math.max(1, Math.floor((W - 16) / 14)), boxH = Math.max(70, 30 + Math.ceil(Math.ceil(n / k) / cols) * 14), Y = boxH + 30;
    let h = '';
    for (let g = 0; g < k; g++) {
      const x = 20 + g * W; h += '<rect x="' + (x + 4) + '" y="10" width="' + (W - 8) + '" height="' + boxH + '" rx="12" fill="rgba(255,255,255,.04)" stroke="rgba(226,232,240,.25)"/>';
      const got = Math.floor(dealt / k) + (g < dealt % k ? 1 : 0);
      for (let i = 0; i < got; i++) { h += '<circle cx="' + (x + 14 + (i % cols) * 14) + '" cy="' + (26 + Math.floor(i / cols) * 14) + '" r="5.5" fill="#f472b6"/>'; }
    }
    const left = n - dealt;
    for (let i = 0; i < left; i++) h += '<circle cx="' + (24 + (i % 40) * 15) + '" cy="' + (Y + Math.floor(i / 40) * 15) + '" r="5.5" fill="#fde047"/>';
    svg.setAttribute('viewBox', '0 0 640 ' + (Y + 18 + Math.floor(Math.max(0, left - 1) / 40) * 15));
    svg.innerHTML = h;
    const done = n - dealt < k;
    q(root, 'deal').disabled = done;
    out.className = 'g4-out' + (done ? ' good' : '');
    out.innerHTML = done ? '<b>' + n + ' ÷ ' + k + ' = ' + Math.floor(n / k) + (n % k ? ' ' + L.rem + ' ' + (n % k) : '') + '</b><br>' + L.result(Math.floor(n / k), n % k) : L.dealing(each, n - dealt);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.s) { const [w, s] = t.dataset.s.split(':'); if (w === 'n') n = Math.max(1, Math.min(80, n + +s)); else k = Math.max(2, Math.min(8, k + +s)); dealt = 0; }
    else if (t.dataset.k === 'deal') { if (n - dealt >= k) dealt += k; }
    else if (t.dataset.k === 'all') dealt = n - (n % k);
    else if (t.dataset.k === 'reset') dealt = 0;
    draw();
  });
  draw();
};
