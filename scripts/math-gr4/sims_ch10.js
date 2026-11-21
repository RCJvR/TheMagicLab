// Grade 4 Math Magician, Chapter 10 sims (ratio and rate). Each is (L, root) => void and may only use window.G4.
// Money is kept in whole cents; R(c) only formats it ("R7,50"). Every sim re-renders on a tap.

/* 1001 Bead string: thread red and blue beads to show a ratio. Order matters. */
exports.s1001 = function (L, root) {
  const { q, rnd } = window.G4;
  const out = q(root, 'out'), st = q(root, 'stage');
  const COL = { r: '#ef4444', b: '#3b82f6' };
  let a = 2, b = 3, first = 'r', beads = [];
  const cnt = c => beads.filter(x => x === c).length;
  function draw() {
    const n = Math.max(beads.length, 1), s = Math.min(60, 600 / Math.max(n, 10));
    let g = '<line x1="10" y1="45" x2="630" y2="45" stroke="currentColor" stroke-width="3"/>';
    beads.forEach((c, i) => { g += '<circle data-i="' + i + '" cx="' + (20 + s / 2 + i * s) + '" cy="45" r="' + (s / 2 - 3) + '" fill="' + COL[c] + '" stroke="rgba(255,255,255,.6)" stroke-width="2" style="cursor:pointer"/>'; });
    st.innerHTML = '<svg viewBox="0 0 640 90" role="img" aria-label="' + L.aria + '">' + g + '</svg>';
    q(root, 'live').innerHTML = L.live(cnt('r'), cnt('b'));
  }
  function fresh() {
    do { a = rnd(2, 6); b = rnd(2, 6); } while (a === b);
    first = rnd(0, 1) ? 'r' : 'b'; beads = [];
    q(root, 'goal').innerHTML = first === 'r' ? L.goalRB(a, b) : L.goalBR(a, b);
    out.className = 'g4-out'; out.innerHTML = L.ask; draw();
  }
  root.addEventListener('click', e => {
    const c = e.target.closest('[data-i]');
    if (c) { beads.splice(+c.getAttribute('data-i'), 1); draw(); return; }
    const t = e.target.closest('button'); if (!t) return;
    const k = t.dataset.k;
    if ((k === 'red' || k === 'blue') && beads.length < 14) { beads.push(k === 'red' ? 'r' : 'b'); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }
    else if (k === 'clear') { beads = []; draw(); }
    else if (k === 'new') fresh();
    else if (k === 'check') {
      const wr = first === 'r' ? a : b, wb = first === 'r' ? b : a, r = cnt('r'), bl = cnt('b');
      out.className = 'g4-out ' + (r === wr && bl === wb ? 'good' : 'bad');
      if (r === wr && bl === wb) out.innerHTML = first === 'r' ? L.yesRB(a, b) : L.yesBR(a, b);
      else if (r === wb && bl === wr) out.innerHTML = first === 'r' ? L.swapRB(a, b) : L.swapBR(a, b);
      else out.innerHTML = L.wrong(r, bl, wr, wb);
    }
  });
  fresh();
};

/* 1002 Recipe mixer: keep the ratio the same when the amount of the first ingredient changes. */
exports.s1002 = function (L, root) {
  const { q, rnd } = window.G4;
  const out = q(root, 'out'), st = q(root, 'stage');
  let R = null, m = 2, y = 0;
  const cup = (x, yy, col, lab) => '<g><path d="M' + x + ' ' + yy + ' l6 52 h36 l6 -52 Z" fill="' + col + '" stroke="currentColor" stroke-width="2"/>' + (lab ? '<text x="' + (x + 24) + '" y="' + (yy + 34) + '" text-anchor="middle" font-size="15" font-weight="900" fill="#111" font-family="sans-serif">' + lab + '</text>' : '') + '</g>';
  function draw() {
    const xs = m * R.a, maxRow = 8, Wd = 30 + Math.min(maxRow, Math.max(xs, y, 5)) * 54; let g = '';
    for (let i = 0; i < xs; i++) g += cup(20 + (i % maxRow) * 54, 30 + Math.floor(i / maxRow) * 62, R.c1, '');
    const r1 = Math.ceil(xs / maxRow), top2 = 30 + r1 * 62 + 34;
    for (let i = 0; i < y; i++) g += cup(20 + (i % maxRow) * 54, top2 + Math.floor(i / maxRow) * 62, R.c2, '');
    const H = top2 + Math.max(1, Math.ceil(y / maxRow)) * 62 + 6;
    g = '<text x="20" y="22" font-size="18" font-weight="800" fill="currentColor" font-family="sans-serif">' + R.n1 + ': ' + xs + '</text><text x="20" y="' + (top2 - 10) + '" font-size="18" font-weight="800" fill="currentColor" font-family="sans-serif">' + R.n2 + ': ' + y + '</text>' + g;
    st.innerHTML = '<svg viewBox="0 0 ' + Wd + ' ' + H + '" role="img" aria-label="' + L.aria + '">' + g + '</svg>';
  }
  function fresh() {
    R = L.recipes[rnd(0, L.recipes.length - 1)]; m = rnd(2, 4); y = 0;
    q(root, 'goal').innerHTML = L.goal(R.what, R.n1, R.n2, R.a, R.b, m * R.a);
    out.className = 'g4-out'; out.innerHTML = L.ask; draw();
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    const k = t.dataset.k;
    if (k === 'plus') { y = Math.min(y + 1, 22); draw(); }
    else if (k === 'minus') { y = Math.max(y - 1, 0); draw(); }
    else if (k === 'new') fresh();
    else if (k === 'check') {
      const want = m * R.b, ok = y === want;
      out.className = 'g4-out ' + (ok ? 'good' : 'bad');
      out.innerHTML = ok ? L.yes(R.a, R.b, m * R.a, want, m, R.n1, R.n2) : (y < want ? L.less : L.more)(R.a, R.b, m * R.a, R.n1, R.n2, m);
    }
  });
  fresh();
};

/* 1003 Price table: from "k items cost R..." find the price of 1, then of more. Each box gets its own feedback. */
exports.s1003 = function (L, root) {
  const { q, rnd, shuffle } = window.G4;
  const out = q(root, 'out'), tb = q(root, 'tbl');
  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');
  const parse = s => { s = String(s).replace(/[\s ]/g, '').replace(/^r/i, ''); if (!s) return null; if (/c$/i.test(s)) { const v = parseInt(s, 10); return isNaN(v) ? null : v; } const v = parseFloat(s.replace(',', '.')); return isNaN(v) ? null : Math.round(v * 100); };
  let P = null;
  function fresh() {
    const it = L.items[rnd(0, L.items.length - 1)], k = rnd(2, 4), unit = rnd(it.lo, it.hi) * 50;
    const cols = [1].concat([k].concat(shuffle([5, 6, 10, 3, 8].filter(v => v !== k)).slice(0, 2)).sort((x, y) => x - y)), gi = cols.indexOf(k);
    P = { it, k, unit, cols, gi };
    q(root, 'goal').innerHTML = L.goal(k, it.n, R(k * unit)) + ' ' + window.G4.stk(it.s, 'sm');
    const inp = i => '<input class="g4-input" data-k="c' + i + '" inputmode="decimal" style="width:120px;text-align:center" aria-label="' + cols[i] + '">';
    tb.innerHTML = '<tr><th>' + L.num + '</th><th>' + L.cost + '</th></tr>' + cols.map((c, i) => '<tr><td style="font-size:24px">' + c + '</td><td style="padding:4px 8px">' + (i === gi ? '<span style="font-size:22px">' + R(k * unit) + '</span>' : inp(i)) + '</td></tr>').join('');
    out.className = 'g4-out'; out.innerHTML = L.ask;
  }
  function check() {
    const msgs = []; let all = true;
    P.cols.forEach((c, i) => {
      if (i === P.gi) return;
      const el = q(root, 'c' + i), v = parse(el.value), ok = v === c * P.unit;
      el.style.borderColor = v == null ? '' : ok ? '#4ade80' : '#f87171';
      if (!ok) { all = false; if (v != null) msgs.push(i === 0 ? L.tip1(R(P.k * P.unit), P.k) : L.tipN(c)); }
    });
    out.className = 'g4-out ' + (all ? 'good' : 'bad');
    out.innerHTML = all ? L.yes(R(P.unit), P.it.one) : (msgs.length ? msgs.join('<br>') : L.fill);
  }
  root.addEventListener('click', e => { const t = e.target.closest('button'); if (!t) return; if (t.dataset.k === 'check') check(); else if (t.dataset.k === 'new') fresh(); });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') check(); });
  fresh();
};

/* 1004 Best buy: find the price of one item in each pack, then choose the better buy. */
exports.s1004 = function (L, root) {
  const { q, rnd } = window.G4;
  const out = q(root, 'out');
  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');
  const parse = s => { s = String(s).replace(/[\s ]/g, '').replace(/^r/i, ''); if (!s) return null; if (/c$/i.test(s)) { const v = parseInt(s, 10); return isNaN(v) ? null : v; } const v = parseFloat(s.replace(',', '.')); return isNaN(v) ? null : Math.round(v * 100); };
  let A = null, B = null, it = null, pick = null;
  function packs() {
    q(root, 'packs').innerHTML = [A, B].map((p, i) => '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:128px;padding:10px 4px;border:1px solid rgba(148,163,184,.3);border-radius:14px"><span style="font-size:15px">' + L.pack + ' ' + 'AB'[i] + '</span><span style="display:flex;flex-wrap:wrap;justify-content:center;max-width:120px">' + new Array(p.n).fill('<img src="/assets/stickers/' + it.s + '.webp" alt="" style="width:30px;height:30px;object-fit:contain">').join('') + '</span><b style="text-align:center;font-size:16px;white-space:nowrap">' + L.forP(p.n, R(p.n * p.u)) + '</b><input class="g4-input" data-k="u' + i + '" inputmode="decimal" placeholder="' + L.each + '" style="width:108px;text-align:center;font-size:17px" aria-label="' + L.each + ' ' + 'AB'[i] + '"><button class="g4-btn ghost" data-p="' + i + '" aria-pressed="false">' + L.best + '</button></div>').join('');
  }
  function fresh() {
    it = L.items[rnd(0, L.items.length - 1)];
    let ua, ub; do { ua = rnd(4, 16) * 50; ub = rnd(4, 16) * 50; } while (ua === ub);
    let na, nb; do { na = rnd(2, 6); nb = rnd(2, 6); } while (na === nb);
    A = { n: na, u: ua }; B = { n: nb, u: ub }; pick = null;
    q(root, 'goal').innerHTML = L.goal(it.n);
    packs(); out.className = 'g4-out'; out.innerHTML = L.ask;
  }
  root.addEventListener('click', e => {
    const p = e.target.closest('[data-p]');
    if (p) { pick = +p.dataset.p; root.querySelectorAll('[data-p]').forEach(x => x.setAttribute('aria-pressed', String(+x.dataset.p === pick))); return; }
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'new') fresh();
    else if (t.dataset.k === 'check') {
      const v = [0, 1].map(i => parse(q(root, 'u' + i).value)), want = [A.u, B.u], best = A.u < B.u ? 0 : 1;
      [0, 1].forEach(i => { q(root, 'u' + i).style.borderColor = v[i] == null ? '' : v[i] === want[i] ? '#4ade80' : '#f87171'; });
      out.className = 'g4-out bad';
      const P = [A, B];
      const badI = [0, 1].find(i => v[i] !== want[i]);
      if (badI != null) out.innerHTML = v[badI] == null ? L.fill : L.tipU('AB'[badI], R(P[badI].n * P[badI].u), P[badI].n);
      else if (pick == null) out.innerHTML = L.choose;
      else if (pick !== best) out.innerHTML = L.wrongPick('AB'[best], R(want[best]), R(want[1 - best]));
      else { out.className = 'g4-out good'; out.innerHTML = L.yes('AB'[best], R(want[best]), R(want[1 - best]), R(want[1 - best] - want[best])); }
    }
  });
  fresh();
};
