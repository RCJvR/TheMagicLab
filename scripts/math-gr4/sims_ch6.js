// Grade 4 Math Magician, Chapter 6 sims (length, mass and capacity). Each is (L, root) => void and may only use window.G4.

/* 601 Ruler: measure an object in millimetres (and centimetres). */
exports.s601 = function (L, root) {
  const { q, rnd, num } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out');
  let len = 87, start = 0, shift = false, score = 0, tries = 0;
  const X = mm => 30 + mm * 3.8; // 150 mm across ~570 px
  function draw(reveal) {
    let h = '<rect x="20" y="96" width="600" height="70" rx="8" fill="#fde68a"/>';
    for (let mm = 0; mm <= 150; mm++) { const x = X(mm), tall = mm % 10 === 0 ? 30 : mm % 5 === 0 ? 20 : 12; h += '<line x1="' + x + '" y1="96" x2="' + x + '" y2="' + (96 + tall) + '" stroke="#1f2937" stroke-width="' + (mm % 10 ? 1 : 2) + '"/>'; if (mm % 10 === 0) h += '<text x="' + x + '" y="150" text-anchor="middle" fill="#1f2937" font-size="16" font-weight="800">' + (mm / 10) + '</text>'; }
    h += '<text x="600" y="160" text-anchor="end" fill="#1f2937" font-size="12">cm</text>';
    const x1 = X(start), x2 = X(start + len);
    h += '<rect x="' + x1 + '" y="44" width="' + (x2 - x1) + '" height="30" rx="6" fill="#f472b6"/><path d="M' + x2 + ' 44 l26 15 l-26 15 z" fill="#fbcfe8"/><rect x="' + (x1 - 8) + '" y="44" width="10" height="30" rx="3" fill="#9d174d"/>';
    h += '<line x1="' + x1 + '" y1="74" x2="' + x1 + '" y2="96" stroke="#f472b6" stroke-dasharray="3 3"/><line x1="' + x2 + '" y1="74" x2="' + x2 + '" y2="96" stroke="#f472b6" stroke-dasharray="3 3"/>';
    if (reveal) h += '<text x="' + ((x1 + x2) / 2) + '" y="34" text-anchor="middle" fill="#fde047" font-size="18" font-weight="900">' + len + ' mm</text>';
    svg.innerHTML = h;
  }
  function fresh() { len = rnd(25, 120); start = shift ? rnd(1, 150 - len) : 0; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = shift ? L.askShift : L.ask; draw(false); }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'check') { const v = num(q(root, 'ans').value); tries++; const ok = v === len; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.is(len, Math.floor(len / 10), len % 10) + (start ? ' ' + L.sub(start + len, start, len) : '') + ' ' + L.score(score, tries); draw(true); }
    else if (t.dataset.k === 'new') fresh();
    else if (t.dataset.k === 'shift') { shift = !shift; t.setAttribute('aria-pressed', shift); fresh(); }
  });
  fresh();
};

/* 602 Kitchen scale: read the needle and say the mass in grams. */
exports.s602 = function (L, root) {
  const { q, rnd, num } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out');
  let item = null, mass = 0, score = 0, tries = 0;
  function draw(reveal) {
    const cx = 320, cy = 285, R = 170, ang = m => Math.PI * (1 - m / 2000);
    let h = '<rect x="300" y="92" width="40" height="12" fill="#64748b"/><rect x="150" y="68" width="340" height="26" rx="10" fill="#94a3b8"/>';
    h += '<path d="M' + (cx - R - 18) + ' ' + cy + ' A' + (R + 18) + ' ' + (R + 18) + ' 0 0 1 ' + (cx + R + 18) + ' ' + cy + ' Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>';
    for (let m = 0; m <= 2000; m += 50) { const a = ang(m), big = m % 500 === 0, mid = m % 100 === 0, r1 = R - (big ? 22 : mid ? 14 : 8); h += '<line x1="' + (cx + R * Math.cos(a)) + '" y1="' + (cy - R * Math.sin(a)) + '" x2="' + (cx + r1 * Math.cos(a)) + '" y2="' + (cy - r1 * Math.sin(a)) + '" stroke="#1f2937" stroke-width="' + (big ? 3 : 1.5) + '"/>'; if (big) h += '<text x="' + (cx + (R - 48) * Math.cos(a)) + '" y="' + (cy - (R - 48) * Math.sin(a) + 6) + '" text-anchor="middle" fill="#1f2937" font-size="19" font-weight="800">' + (m === 0 ? '0' : m % 1000 === 0 ? (m / 1000) + ' kg' : m) + '</text>'; }
    const a = ang(mass); h += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + (R - 10) * Math.cos(a)) + '" y2="' + (cy - (R - 10) * Math.sin(a)) + '" stroke="#e11d48" stroke-width="4" stroke-linecap="round"/><circle cx="' + cx + '" cy="' + cy + '" r="9" fill="#e11d48"/><text x="' + cx + '" y="' + (cy - 30) + '" text-anchor="middle" fill="#64748b" font-size="13">g</text>';
    if (item) h += '<image href="/assets/stickers/' + item.s + '.webp" x="' + (cx - 34) + '" y="2" width="68" height="68"/>';
    if (reveal) h += '<text x="' + cx + '" y="' + (cy - 55) + '" text-anchor="middle" fill="#fde047" font-size="18" font-weight="900">' + mass + ' g</text>';
    svg.innerHTML = h;
  }
  function fresh() {
    item = L.items[rnd(0, L.items.length - 1)];
    mass = item.m || rnd(2, 38) * 50;
    q(root, 'name').textContent = item.n; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.ask; draw(false);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'check') { const v = num(q(root, 'ans').value); tries++; const ok = v === mass; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.is(mass) + ' ' + L.score(score, tries); draw(true); }
    else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};

/* 603 Measuring jug: read the level, or pour to a target. */
exports.s603 = function (L, root) {
  const { q, rnd, num } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), pour = q(root, 'pour');
  let mode = 'read', level = 600, target = 750, score = 0, tries = 0;
  const Y = ml => 250 - ml * 0.2; // 1 000 ml → 200 px
  function draw(reveal) {
    root.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === mode));
    q(root, 'readrow').style.display = mode === 'read' ? '' : 'none'; q(root, 'pourrow').style.display = mode === 'pour' ? '' : 'none';
    const show = mode === 'read' ? level : +pour.value;
    let h = '<rect x="240" y="' + Y(show) + '" width="160" height="' + (250 - Y(show)) + '" fill="rgba(96,165,250,.55)"/><path d="M240 30 L240 250 L400 250 L400 30" fill="none" stroke="#e2e8f0" stroke-width="5"/><path d="M400 70 Q450 70 450 130 Q450 190 400 190" fill="none" stroke="#e2e8f0" stroke-width="5"/>';
    for (let ml = 0; ml <= 1000; ml += 50) { const big = ml % 100 === 0; h += '<line x1="240" y1="' + Y(ml) + '" x2="' + (240 + (big ? 30 : 16)) + '" y2="' + Y(ml) + '" stroke="#e2e8f0" stroke-width="' + (big ? 2.5 : 1.2) + '"/>'; if (ml % 200 === 0) h += '<text x="230" y="' + (Y(ml) + 5) + '" text-anchor="end" fill="#e2e8f0" font-size="15" font-weight="800">' + (ml === 1000 ? '1 l' : ml + ' ml') + '</text>'; }
    if (reveal || mode === 'pour') h += '<text x="320" y="' + (Y(show) - 8) + '" text-anchor="middle" fill="#fde047" font-size="18" font-weight="900">' + show + ' ml</text>';
    if (mode === 'pour') h += '<line x1="235" y1="' + Y(target) + '" x2="405" y2="' + Y(target) + '" stroke="#f472b6" stroke-width="3" stroke-dasharray="8 6"/>';
    svg.innerHTML = h;
  }
  function fresh() {
    if (mode === 'read') { level = rnd(1, 19) * 50; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.askRead; }
    else { target = rnd(2, 19) * 50; pour.value = 0; out.className = 'g4-out'; out.innerHTML = L.askPour(target); }
    draw(false);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.m) { mode = t.dataset.m; fresh(); }
    else if (t.dataset.k === 'new') fresh();
    else if (t.dataset.k === 'check') {
      tries++;
      if (mode === 'read') { const v = num(q(root, 'ans').value), ok = v === level; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.isRead(level) + ' ' + L.score(score, tries); draw(true); }
      else { const v = +pour.value, ok = v === target; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.poured(v, target) + ' ' + L.score(score, tries); }
    }
  });
  pour.addEventListener('input', () => draw(false));
  fresh();
};

/* 604 Unit converter: a ladder of units with × and ÷ steps. */
exports.s604 = function (L, root) {
  const { q, num, fmt } = window.G4;
  const out = q(root, 'out'), from = q(root, 'from'), to = q(root, 'to'), inp = q(root, 'n'), ladder = q(root, 'ladder');
  const SETS = { len: [['mm', 1], ['cm', 10], ['m', 1000], ['km', 1000000]], mass: [['g', 1], ['kg', 1000]], cap: [['ml', 1], ['l', 1000]] };
  let set = 'len';
  function opts() { const u = SETS[set]; from.innerHTML = u.map((x, i) => '<option value="' + i + '">' + x[0] + '</option>').join(''); to.innerHTML = from.innerHTML; from.value = u.length > 2 ? 2 : 1; to.value = 0; }
  function draw() {
    root.querySelectorAll('[data-set]').forEach(b => b.setAttribute('aria-pressed', b.dataset.set === set));
    const u = SETS[set];
    ladder.innerHTML = u.map((x, i) => '<span class="g4-big" style="font-size:22px;padding:4px 12px;border-radius:10px;background:' + (i == from.value ? 'rgba(96,165,250,.3)' : i == to.value ? 'rgba(244,114,182,.3)' : 'rgba(255,255,255,.05)') + '">' + x[0] + '</span>' + (i < u.length - 1 ? '<span style="color:#c3e56f;font-weight:800;font-size:14px">← ×' + fmt(u[i + 1][1] / x[1]) + ' · ÷' + fmt(u[i + 1][1] / x[1]) + ' →</span>' : '')).join(' ');
    const v = num(inp.value); if (v == null) { out.innerHTML = L.type; return; }
    const a = u[+from.value], b = u[+to.value], base = v * a[1], res = base / b[1];
    const nice = Number.isInteger(res) ? fmt(res) : null;
    const f = a[1] / b[1];
    out.className = 'g4-out' + (nice ? ' good' : '');
    out.innerHTML = nice ? '<b>' + fmt(v) + ' ' + a[0] + ' = ' + nice + ' ' + b[0] + '</b><br>' + (f > 1 ? L.mult(a[0], b[0], fmt(f)) : f < 1 ? L.div(a[0], b[0], fmt(1 / f)) : L.same) : L.notWhole(fmt(v), a[0], b[0]);
  }
  root.addEventListener('click', e => { const t = e.target.closest('button'); if (t && t.dataset.set) { set = t.dataset.set; opts(); draw(); } });
  [from, to, inp].forEach(el => el.addEventListener('input', draw));
  opts(); inp.value = 3; draw();
};
