/* Gr11 Electrostatics — Coulomb's law, superposition of forces in a line, and the electric field of point charges.
 *  Coulomb's law: F = k Q₁ Q₂ / r², k = 9,0 × 10⁹ N·m²·C⁻². Like charges repel, unlike attract; the forces on the two
 *  charges are equal and opposite. F ∝ 1/r², so F × r² stays constant when only r changes (workbook Q6).
 *  Three charges in a line: the net force on Q₂ is the vector sum of the forces by Q₁ and Q₃ (worked example:
 *  +4 µC, −3 µC, +2 µC with r₁₂ = 0,3 m, r₂₃ = 0,2 m → 1,2 N left + 1,35 N right = 0,15 N right).
 *  Electric field: E = k Q / r² from each charge, away from + and towards −, added as vectors at point P
 *  (exam question: +4 µC and −6 µC 0,3 m apart, P midway → E = 4,0 × 10⁶ N·C⁻¹ towards Q₂).
 *  Field lines start on + and end on −, never cross, and their number is proportional to the charge.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const K = 9e9;
  const T = {
    aria: { en: 'Point charges with the forces between them, a graph of force against distance, and electric field lines', af: 'Puntladings met die kragte tussen hulle, \'n grafiek van krag teen afstand, en elektriese veldlyne' },
    mode: { en: 'What to explore', af: 'Wat om te verken' }, law: { en: 'Coulomb\'s law', af: 'Coulomb se wet' }, net: { en: 'Three in a line', af: 'Drie in \'n lyn' }, field: { en: 'Electric field', af: 'Elektriese veld' },
    F: { en: 'Force between the charges', af: 'Krag tussen die ladings' }, Fnet: { en: 'Net force on Q₂', af: 'Netto krag op Q₂' }, E: { en: 'Electric field at P', af: 'Elektriese veld by P' },
    type: { en: 'Type of force', af: 'Soort krag' }, Fr2: { en: 'F × r²', af: 'F × r²' }, F2r: { en: 'F if r is doubled', af: 'F as r verdubbel' },
    F12: { en: 'Force by Q₁', af: 'Krag deur Q₁' }, F32: { en: 'Force by Q₃', af: 'Krag deur Q₃' }, dirL: { en: 'Direction', af: 'Rigting' },
    E1: { en: 'E at P due to Q₁', af: 'E by P weens Q₁' }, E2: { en: 'E at P due to Q₂', af: 'E by P weens Q₂' },
    charges: { en: 'Charges', af: 'Ladings' }, dist: { en: 'Distances', af: 'Afstande' }, pt: { en: 'Point P', af: 'Punt P' },
    sep: { en: 'Separation r', af: 'Skeiding r' }, px: { en: 'P across (from the midpoint)', af: 'P dwars (vanaf die middelpunt)' }, py: { en: 'P up / down', af: 'P op / af' },
    rep: { en: 'repulsive', af: 'afstotend' }, att: { en: 'attractive', af: 'aantrekkend' }, zero: { en: 'none', af: 'geen' },
    left: { en: 'to the left', af: 'na links' }, right: { en: 'to the right', af: 'na regs' }, up: { en: 'up', af: 'op' }, down: { en: 'down', af: 'af' },
    xr: { en: 'Separation r (m)', af: 'Skeiding r (m)' }, yF: { en: 'Force F (N)', af: 'Krag F (N)' }, off: { en: 'off scale', af: 'buite skaal' },
    q4: { en: '÷ 4', af: '÷ 4' }, drag: { en: 'Drag P, or tap to move it', af: 'Sleep P, of tik om dit te skuif' },
    by1: { en: 'by Q₁', af: 'deur Q₁' }, by3: { en: 'by Q₃', af: 'deur Q₃' }, netL: { en: 'net', af: 'netto' },
    capLawR: { en: 'Like charges repel. Double r and F falls to a quarter (F ∝ 1/r²), so F × r² stays the same.', af: 'Gelyke ladings stoot mekaar af. Verdubbel r en F daal tot \'n kwart (F ∝ 1/r²), dus bly F × r² dieselfde.' },
    capLawA: { en: 'Unlike charges attract. Double r and F falls to a quarter (F ∝ 1/r²), so F × r² stays the same.', af: 'Teenoorgestelde ladings trek mekaar aan. Verdubbel r en F daal tot \'n kwart (F ∝ 1/r²), dus bly F × r² dieselfde.' },
    capLaw0: { en: 'One charge is zero, so there is no force: F is proportional to Q₁Q₂.', af: 'Een lading is nul, dus is daar geen krag nie: F is eweredig aan Q₁Q₂.' },
    capNet: { en: 'Each force on Q₂ is found with Coulomb\'s law on its own; the net force is their vector sum (take right as positive).', af: 'Elke krag op Q₂ word apart met Coulomb se wet bereken; die netto krag is hul vektorsom (neem regs as positief).' },
    capF: { en: 'E from each charge points away from + and towards −; at P the two fields add as vectors.', af: 'E van elke lading wys weg van + en na −; by P tel die twee velde as vektore op.' },
    capF0: { en: 'The two fields at P are equal and opposite, so E = 0 here: a test charge at P feels no net force.', af: 'Die twee velde by P is ewe groot en teenoorgesteld, dus is E = 0 hier: \'n toetslading by P voel geen netto krag nie.' },
  };
  const S = { mode: 'law', q1: 4, q2: -3, r: 0.2, n1: 4, n2: -3, n3: 2, r12: 0.3, r23: 0.2, f1: 4, f2: -6, px: 0, py: 0 };
  const D = 0.3; // separation of the two field charges (m)

  // ── formatting ──
  const fq = (v) => (v > 0 ? '+' : '') + num(v, Math.abs(v % 1) > 1e-9 ? 1 : 0);
  const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
  function sci(x, d) {
    if (x === 0) return '0';
    let e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e);
    const p = Math.pow(10, d == null ? 2 : d); m = Math.round(m * p) / p; if (Math.abs(m) >= 10) { m /= 10; e += 1; }
    return num(m, d == null ? 2 : d) + ' × 10' + String(e).split('').map(ch => SUP[ch]).join('');
  }
  const fN = (v) => { const a = Math.abs(v); return a === 0 ? '0' : a >= 1000 || a < 0.01 ? sci(a) : num(a, a >= 100 ? 0 : a >= 10 ? 1 : 2); };

  // ── physics ──
  const coul = (a, b, r) => K * a * 1e-6 * b * 1e-6 / (r * r); // signed: + repulsive, − attractive
  function netForces() {
    const f12 = coul(S.n1, S.n2, S.r12);      // + pushes Q₂ away from Q₁ (to the right)
    const f32 = -coul(S.n3, S.n2, S.r23);     // + repulsion by Q₃ pushes Q₂ to the left
    return { f12, f32, fn: f12 + f32 };
  }
  function fieldAt(x, y) { // metres, origin at the midpoint; returns components in N/C
    const out = { x: 0, y: 0, e1: [0, 0], e2: [0, 0] };
    [[S.f1, -D / 2, 'e1'], [S.f2, D / 2, 'e2']].forEach(([q, cx, key]) => {
      const dx = x - cx, dy = y, r2 = dx * dx + dy * dy, r = Math.sqrt(r2);
      if (r < 1e-6 || q === 0) return;
      const e = K * q * 1e-6 / r2; out[key] = [e * dx / r, e * dy / r]; out.x += e * dx / r; out.y += e * dy / r;
    });
    return out;
  }

  // ── layout and controls ──
  const ui = MLX.layout(root, { height: (w) => w < 640 ? (S.mode === 'law' ? 470 : 420) : Math.max(380, Math.min(440, Math.round(w * 0.52))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.F, unit: 'N' });
  const primTitle = prim.el.querySelector('.mlx-card-title'), primUnit = prim.el.querySelector('.mlx-primary-unit');
  const boxes = { law: MLX.h('div'), net: MLX.h('div'), field: MLX.h('div') };
  Object.values(boxes).forEach(b => prim.el.appendChild(b));
  const roL = MLX.readout(boxes.law, [['t', T.type], ['k', T.Fr2], ['d', T.F2r]]);
  const roN = MLX.readout(boxes.net, [['a', T.F12], ['b', T.F32], ['d', T.dirL]]);
  const roF = MLX.readout(boxes.field, [['a', T.E1], ['b', T.E2], ['d', T.dirL]]);
  const c0 = MLX.card(ui.side, T.mode);
  MLX.seg(c0, { options: [['law', T.law], ['net', T.net], ['field', T.field]], value: S.mode, onChange: (v) => { S.mode = v; update(); } });
  const qs = (v) => fq(v) + ' µC', ms = (v) => num(v, 2) + ' m';
  const cards = {
    law: MLX.card(ui.side, T.charges), net: MLX.card(ui.side, T.charges), field: MLX.card(ui.side, T.charges),
  };
  MLX.slider(cards.law, { label: 'Q₁', min: -10, max: 10, step: 0.5, value: S.q1, fmt: qs, onInput: (v) => { S.q1 = v; update(); } });
  MLX.slider(cards.law, { label: 'Q₂', min: -10, max: 10, step: 0.5, value: S.q2, fmt: qs, onInput: (v) => { S.q2 = v; update(); } });
  MLX.slider(cards.law, { label: T.sep, min: 0.05, max: 0.6, step: 0.01, value: S.r, fmt: ms, onInput: (v) => { S.r = v; update(); } });
  MLX.slider(cards.net, { label: 'Q₁', min: -10, max: 10, step: 0.5, value: S.n1, fmt: qs, onInput: (v) => { S.n1 = v; update(); } });
  MLX.slider(cards.net, { label: 'Q₂', min: -10, max: 10, step: 0.5, value: S.n2, fmt: qs, onInput: (v) => { S.n2 = v; update(); } });
  MLX.slider(cards.net, { label: 'Q₃', min: -10, max: 10, step: 0.5, value: S.n3, fmt: qs, onInput: (v) => { S.n3 = v; update(); } });
  MLX.slider(cards.net, { label: 'r₁₂', min: 0.1, max: 0.6, step: 0.05, value: S.r12, fmt: ms, onInput: (v) => { S.r12 = v; update(); } });
  MLX.slider(cards.net, { label: 'r₂₃', min: 0.1, max: 0.6, step: 0.05, value: S.r23, fmt: ms, onInput: (v) => { S.r23 = v; update(); } });
  MLX.slider(cards.field, { label: 'Q₁', min: -8, max: 8, step: 1, value: S.f1, fmt: qs, onInput: (v) => { S.f1 = v; update(); } });
  MLX.slider(cards.field, { label: 'Q₂', min: -8, max: 8, step: 1, value: S.f2, fmt: qs, onInput: (v) => { S.f2 = v; update(); } });
  const cP = MLX.card(ui.side, T.pt);
  const sPx = MLX.slider(cP, { label: T.px, min: -0.3, max: 0.3, step: 0.01, value: S.px, fmt: ms, onInput: (v) => { S.px = v; update(); } });
  const sPy = MLX.slider(cP, { label: T.py, min: -0.2, max: 0.2, step: 0.01, value: S.py, fmt: ms, onInput: (v) => { S.py = v; update(); } });
  cP.appendChild(MLX.h('div', { class: 'mlx-ends', text: L(T.drag) }));
  MLX.onTheme(() => ui.cv.draw());

  // dragging P on the canvas (field view only)
  let fmap = null, dragging = false;
  function moveP(e) {
    if (!fmap) return;
    const b = ui.cv.el.getBoundingClientRect();
    let x = (e.clientX - b.left - fmap.ox) / fmap.s, y = -(e.clientY - b.top - fmap.oy) / fmap.s;
    x = Math.max(-0.3, Math.min(0.3, Math.round(x * 100) / 100)); y = Math.max(-0.2, Math.min(0.2, Math.round(y * 100) / 100));
    S.px = x; S.py = y; sPx.set(x); sPy.set(y); update();
  }
  ui.cv.el.addEventListener('pointerdown', (e) => { if (S.mode !== 'field') return; dragging = true; ui.cv.el.setPointerCapture(e.pointerId); moveP(e); });
  ui.cv.el.addEventListener('pointermove', (e) => { if (dragging) moveP(e); });
  ui.cv.el.addEventListener('pointerup', () => { dragging = false; });
  ui.cv.el.addEventListener('pointercancel', () => { dragging = false; });

  // ── drawing helpers ──
  let c, ctx, POS, NEG;
  function arrow(x1, y1, x2, y2, col, w) {
    const len = Math.hypot(x2 - x1, y2 - y1); if (len < 2) return;
    const a = Math.atan2(y2 - y1, x2 - x1), hd = Math.min(9, len * 0.6);
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w || 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - hd * 0.8 * Math.cos(a), y2 - hd * 0.8 * Math.sin(a)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - hd * Math.cos(a - 0.42), y2 - hd * Math.sin(a - 0.42)); ctx.lineTo(x2 - hd * Math.cos(a + 0.42), y2 - hd * Math.sin(a + 0.42)); ctx.closePath(); ctx.fill();
  }
  function charge(x, y, q, rad) {
    rad = rad || 14;
    if (q === 0) { ctx.strokeStyle = c.text3; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); return; }
    ctx.fillStyle = q > 0 ? POS : NEG; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = c.light ? '#ffffff' : '#0c0e11'; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
    const s = rad * 0.45; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); if (q > 0) { ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); } ctx.stroke(); ctx.lineCap = 'butt';
  }
  // label on a small backing so it stays readable over field lines
  function tag(s, x, y, o) {
    o = Object.assign({ size: 12, align: 'center', color: c.text }, o);
    ctx.font = (o.weight || 500) + ' ' + o.size + 'px ' + (o.mono ? '"JetBrains Mono", monospace' : '"Cabinet Grotesk", sans-serif');
    const w = ctx.measureText(L(s)).width, x0 = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
    ctx.fillStyle = c.stage; ctx.globalAlpha = 0.86; MLX.roundRect(ctx, x0 - 4, y - o.size + 1, w + 8, o.size + 5, 4); ctx.fill(); ctx.globalAlpha = 1;
    text(ctx, s, x, y, o);
  }

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    POS = c.light ? '#c0392b' : '#f87171'; NEG = c.light ? '#1d5fd1' : '#60a5fa';
    fmap = null;
    if (S.mode === 'law') {
      if (W >= 640) { const aw = Math.round(W * 0.46); lawScene(0, 0, aw, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); lawGraph(aw + 8, 8, W - aw - 12, H - 12); }
      else { lawScene(0, 0, W, Math.round(H * 0.42)); lawGraph(0, Math.round(H * 0.42), W - 4, Math.round(H * 0.58) - 6); }
    } else if (S.mode === 'net') netScene(W, H);
    else fieldScene(W, H);
  }

  // ── Coulomb's law: two charges and the inverse-square graph ──
  function lawScene(x0, y0, w, h) {
    const F = coul(S.q1, S.q2, S.r), cy = y0 + h * 0.5, mL = x0 + 30, mR = x0 + w - 30;
    const s = (mR - mL) / 0.6, xc = (mL + mR) / 2, x1 = xc - S.r * s / 2, x2 = xc + S.r * s / 2;
    const rad = Math.max(8, Math.min(14, S.r * s / 2 - 3));
    // force arrows, equal and opposite, length grows with |F| (capped)
    const len = Math.abs(F) < 1e-9 ? 0 : 10 + 46 * Math.abs(F) / (Math.abs(F) + 3), ay = cy - 30;
    if (len) {
      if (F > 0) { arrow(x1, ay, x1 - len, ay, c.ink); arrow(x2, ay, x2 + len, ay, c.ink); }
      else { const l = Math.min(len, S.r * s / 2 - 4); if (l > 4) { arrow(x1, ay, x1 + l, ay, c.ink); arrow(x2, ay, x2 - l, ay, c.ink); } }
      text(ctx, 'F = ' + fN(F) + ' N', xc, ay - 16, { size: 13, mono: true, weight: 600, align: 'center', color: c.ink });
    }
    charge(x1, cy, S.q1, rad); charge(x2, cy, S.q2, rad);
    text(ctx, 'Q₁ = ' + fq(S.q1) + ' µC', x1, cy + 32, { size: 12, mono: true, align: S.r * s < 120 ? 'right' : 'center', color: c.text });
    text(ctx, 'Q₂ = ' + fq(S.q2) + ' µC', x2, cy + 32, { size: 12, mono: true, align: S.r * s < 120 ? 'left' : 'center', color: c.text });
    // dimension line for r
    const dy = cy + 52;
    ctx.strokeStyle = c.text3; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x1, dy - 6); ctx.lineTo(x1, dy + 6); ctx.moveTo(x2, dy - 6); ctx.lineTo(x2, dy + 6); ctx.stroke();
    arrow((x1 + x2) / 2, dy, x1 + 1, dy, c.text3, 1); arrow((x1 + x2) / 2, dy, x2 - 1, dy, c.text3, 1);
    text(ctx, 'r = ' + num(S.r, 2) + ' m', xc, dy + 20, { size: 12, mono: true, align: 'center', color: c.text2 });
    // the substitution, as in the worked example
    const a = Math.abs(S.q1), b = Math.abs(S.q2);
    if (a && b) {
      const wl = ['F = kQ₁Q₂ / r²', '= (9 × 10⁹)(' + sci(a * 1e-6, a % 1 ? 1 : 0) + ')(' + sci(b * 1e-6, b % 1 ? 1 : 0) + ') / ' + num(S.r, 2) + '²', '= ' + fN(F) + ' N'];
      let yy = dy + 46;
      ctx.font = '500 12px "JetBrains Mono", monospace';
      const lines = []; let cur = '';
      wl.forEach(sg => { const t = cur ? cur + ' ' + sg : sg; if (cur && ctx.measureText(t).width > w - 20) { lines.push(cur); cur = sg; } else cur = t; });
      lines.push(cur);
      if (yy + lines.length * 17 < y0 + h - 4) lines.forEach((ln, i) => text(ctx, ln, x0 + w / 2, yy + i * 17, { size: 12, mono: true, align: 'center', color: c.text2 }));
    }
  }
  function lawGraph(x0, y0, w, h) {
    const kk = Math.abs(coul(S.q1, S.q2, 1)), yMax = 10;
    const ax = MLX.axes(ctx, { x0, y0, w, h, xMin: 0, xMax: 0.6, yMin: 0, yMax, xTitle: T.xr, yTitle: T.yF, xTicks: 6, yTicks: 5, fmtX: (v) => num(v, 1) });
    if (kk > 0) {
      ctx.save(); ctx.beginPath(); ctx.rect(ax.box.x0, ax.box.y0, ax.box.x1 - ax.box.x0, ax.box.y1 - ax.box.y0); ctx.clip();
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath();
      let first = true;
      for (let i = 0; i <= 200; i++) { const r = 0.03 + (0.6 - 0.03) * i / 200, F = kk / (r * r); const X = ax.X(r), Y = ax.Y(Math.min(F, yMax * 1.2)); first ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y); first = false; }
      ctx.stroke(); ctx.restore();
    }
    const F = kk / (S.r * S.r), F2 = kk / (4 * S.r * S.r);
    const pt = (r, f, lab, solid) => {
      const X = ax.X(r);
      if (f > yMax) { if (lab) { arrow(X, ax.box.y0 + 24, X, ax.box.y0 + 4, c.ink, 1.5); tag(lab + ' (' + L(T.off) + ')', X + 8, ax.box.y0 + 18, { align: 'left', mono: true, color: c.ink }); } return null; }
      const Y = ax.Y(f);
      ctx.fillStyle = solid ? c.ink : c.stage; ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(X, Y, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      return [X, Y];
    };
    const a = pt(S.r, F, fN(F) + ' N', true);
    if (a) tag(fN(F) + ' N', a[0] + 9, a[1] - 8, { align: 'left', mono: true, color: c.ink });
    if (2 * S.r <= 0.6 && kk > 0) {
      const b = pt(2 * S.r, F2, '', false);
      if (b) {
        tag('2r: ' + fN(F2) + ' N (' + L(T.q4) + ')', b[0] + 9, b[1] - 10, { align: b[0] > ax.box.x1 - 130 ? 'right' : 'left', mono: true, color: c.text2 });
        if (a) { ctx.strokeStyle = c.text3; ctx.setLineDash([3, 4]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.setLineDash([]); }
      }
    }
    if (w >= 300 && S.r > 0.12) text(ctx, 'F = kQ₁Q₂ / r²', ax.box.x1 - 4, ax.box.y0 + 16, { size: 13, mono: true, align: 'right', color: c.text2 });
  }

  // ── three charges in a line ──
  function netScene(W, H) {
    const phone = W < 640, m = phone ? 34 : 60, s = (W - 2 * m) / 1.2;
    const tot = S.r12 + S.r23, xs = W / 2 - tot * s / 2, x1 = xs, x2 = xs + S.r12 * s, x3 = x2 + S.r23 * s, cy = Math.round(H * 0.24);
    const rad = Math.max(9, Math.min(14, 0.045 * s));
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(16, cy + 0.5); ctx.lineTo(W - 16, cy + 0.5); ctx.stroke();
    text(ctx, '+x', W - 16, cy - 8, { size: 12, align: 'right', color: c.text3 });
    charge(x1, cy, S.n1, rad); charge(x2, cy, S.n2, rad); charge(x3, cy, S.n3, rad);
    text(ctx, 'Q₁ ' + fq(S.n1) + ' µC', x1, cy - rad - 10, { size: 12, mono: true, align: 'center', color: c.text });
    text(ctx, 'Q₂ ' + fq(S.n2) + ' µC', x2, cy + rad + 20, { size: 12, mono: true, align: 'center', color: c.text });
    text(ctx, 'Q₃ ' + fq(S.n3) + ' µC', x3, cy - rad - 10, { size: 12, mono: true, align: 'center', color: c.text });
    // distances
    const dy = cy - rad - 34;
    [[x1, x2, 'r₁₂ = ' + num(S.r12, 2) + ' m'], [x2, x3, 'r₂₃ = ' + num(S.r23, 2) + ' m']].forEach(([a, b, lab]) => {
      ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a, dy - 5); ctx.lineTo(a, dy + 5); ctx.moveTo(b, dy - 5); ctx.lineTo(b, dy + 5); ctx.moveTo(a, dy); ctx.lineTo(b, dy); ctx.stroke();
      text(ctx, lab, (a + b) / 2, dy - 8, { size: 12, mono: true, align: 'center', color: c.text2 });
    });
    // force rows under Q₂, drawn to one scale so the vector sum can be seen
    const f = netForces(), mx = Math.max(Math.abs(f.f12), Math.abs(f.f32), Math.abs(f.fn), 1e-9), Lmax = Math.min(W * 0.36, 200), ps = Lmax / mx;
    const row = (y, v, lab, col, w) => {
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x2, y - 12); ctx.lineTo(x2, y + 12); ctx.stroke();
      if (Math.abs(v) * ps > 2) arrow(x2, y, x2 + v * ps, y, col, w);
      const right = v >= 0;
      const tx = Math.abs(v) * ps > 2 ? x2 + v * ps + (right ? 8 : -8) : x2 + 8;
      const txt = L(lab) + ': ' + fN(v) + ' N';
      ctx.font = '500 12px "JetBrains Mono", monospace';
      const tw = ctx.measureText(txt).width;
      let al = right ? 'left' : 'right', xx = tx;
      if (al === 'left' && xx + tw > W - 8) { al = 'right'; xx = x2 - 8; }
      if (al === 'right' && xx - tw < 8) { al = 'left'; xx = x2 + 8; }
      text(ctx, txt, xx, y + 4, { size: 12, mono: true, align: al, color: col });
    };
    const y0 = cy + rad + 66, gap = phone ? 40 : 50;
    text(ctx, L({ en: 'Forces on Q₂ (same scale)', af: 'Kragte op Q₂ (dieselfde skaal)' }), 16, y0 - 26, { size: 12, color: c.text3 });
    row(y0, f.f12, T.by1, c.text);
    row(y0 + gap, f.f32, T.by3, c.text);
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x2 - Lmax, y0 + gap * 1.5 + 0.5); ctx.lineTo(x2 + Lmax, y0 + gap * 1.5 + 0.5); ctx.stroke();
    row(y0 + gap * 2, f.fn, T.netL, c.accent, 3);
    // the sum written out
    const sgn = (v) => (v >= 0 ? '+' : '−') + fN(v);
    text(ctx, L({ en: 'F net', af: 'F netto' }) + ' = (' + sgn(f.f12) + ') + (' + sgn(f.f32) + ') = ' + sgn(f.fn) + ' N', W / 2, y0 + gap * 2 + 40, { size: phone ? 12 : 13, mono: true, align: 'center', color: c.text2 });
  }

  // ── electric field of two point charges ──
  function fieldScene(W, H) {
    const s = Math.min((W - 24) / 0.66, (H - 24) / 0.46), ox = W / 2, oy = H / 2;
    fmap = { s, ox, oy };
    const toPx = (x, y) => [ox + x * s, oy - y * s];
    const ch = [{ q: S.f1, x: ox - D / 2 * s, y: oy }, { q: S.f2, x: ox + D / 2 * s, y: oy }].filter(o => o.q !== 0);
    const Ef = (x, y) => { let ex = 0, ey = 0; ch.forEach(o => { const dx = x - o.x, dy = y - o.y, r2 = dx * dx + dy * dy, r = Math.sqrt(r2); ex += o.q * dx / (r2 * r); ey += o.q * dy / (r2 * r); }); return [ex, ey]; };
    const R0 = 15, PER = 3; // lines per µC
    ctx.lineWidth = 1.3; ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.42)' : 'rgba(226,232,240,0.38)';
    const drawn = [];
    function trace(o, ang, sign) {
      let x = o.x + Math.cos(ang) * R0, y = o.y + Math.sin(ang) * R0, pts = [[x, y]], prev = null, hit = null;
      for (let i = 0; i < 900; i++) {
        let [ex, ey] = Ef(x, y); let m = Math.hypot(ex, ey); if (m < 2e-7) break;
        const h = 3.5, mx = x + sign * ex / m * h / 2, my = y + sign * ey / m * h / 2;
        [ex, ey] = Ef(mx, my); m = Math.hypot(ex, ey); if (m < 2e-7) break;
        const dx = sign * ex / m, dy = sign * ey / m;
        if (prev && dx * prev[0] + dy * prev[1] < -0.2) break;
        prev = [dx, dy]; x += dx * h; y += dy * h; pts.push([x, y]);
        if (x < -40 || x > W + 40 || y < -40 || y > H + 40) break;
        const end = ch.find(p => p !== o && Math.hypot(x - p.x, y - p.y) < R0 - 2);
        if (end) { hit = { o: end, a: Math.atan2(y - end.y, x - end.x) }; break; }
      }
      ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      // one arrowhead along the line, pointing along E
      let acc = 0; const target = hit ? null : 70; let total = 0;
      for (let i = 1; i < pts.length; i++) total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const want = target != null ? Math.min(target, total / 2) : total / 2;
      for (let i = 1; i < pts.length; i++) {
        acc += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
        if (acc >= want) {
          const [ax, ay] = pts[i], [bx, by] = pts[i - 1];
          let a = Math.atan2(ay - by, ax - bx); if (sign < 0) a += Math.PI;
          ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.moveTo(ax + 5 * Math.cos(a), ay + 5 * Math.sin(a));
          ctx.lineTo(ax - 5 * Math.cos(a - 0.5), ay - 5 * Math.sin(a - 0.5)); ctx.lineTo(ax - 5 * Math.cos(a + 0.5), ay - 5 * Math.sin(a + 0.5)); ctx.closePath(); ctx.fill();
          break;
        }
      }
      return hit;
    }
    const arrivals = new Map();
    ch.filter(o => o.q > 0).forEach(o => {
      const n = Math.max(4, Math.round(PER * o.q));
      for (let i = 0; i < n; i++) { const hit = trace(o, i * 2 * Math.PI / n, 1); if (hit) { if (!arrivals.has(hit.o)) arrivals.set(hit.o, []); arrivals.get(hit.o).push(hit.a); } }
    });
    ch.filter(o => o.q < 0).forEach(o => {
      const n = Math.max(4, Math.round(PER * -o.q)), cand = [];
      for (let i = 0; i < n; i++) cand.push({ a: Math.PI + i * 2 * Math.PI / n, used: false });
      (arrivals.get(o) || []).forEach(a => {
        let best = null, bd = 9;
        cand.forEach(cd => { if (cd.used) return; let d = Math.abs(((cd.a - a) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI); if (d < bd) { bd = d; best = cd; } });
        if (best) best.used = true;
      });
      cand.filter(cd => !cd.used).forEach(cd => trace(o, cd.a, -1));
    });
    // charges and their labels
    [[S.f1, -D / 2, 'Q₁'], [S.f2, D / 2, 'Q₂']].forEach(([q, x, nm]) => {
      const [X, Y] = toPx(x, 0); charge(X, Y, q, 13);
      tag(nm + ' = ' + fq(q) + ' µC', X, Y + 34, { mono: true });
    });
    // point P with the two field vectors and their sum, to one scale
    const f = fieldAt(S.px, S.py), [PX, PY] = toPx(S.px, S.py), En = Math.hypot(f.x, f.y);
    const near = [-D / 2, D / 2].some(x => Math.hypot(S.px - x, S.py) < 0.02);
    if (!near) {
      const mx = Math.max(Math.hypot(...f.e1), Math.hypot(...f.e2), En, 1), ps = Math.min(W, H) * 0.2 / mx;
      if (Math.hypot(...f.e1) * ps > 3) arrow(PX, PY, PX + f.e1[0] * ps, PY - f.e1[1] * ps, c.text2, 1.5);
      if (Math.hypot(...f.e2) * ps > 3) arrow(PX, PY, PX + f.e2[0] * ps, PY - f.e2[1] * ps, c.text2, 1.5);
      if (En * ps > 3) arrow(PX, PY, PX + f.x * ps, PY - f.y * ps, c.accent, 3);
    }
    ctx.fillStyle = c.stage; ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(PX, PY, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    const up = S.py >= 0 ? -1 : 1;
    tag('P', PX - 12, PY + (up < 0 ? -10 : 18), { align: 'right', weight: 700, color: c.ink });
    tag(near ? '—' : 'E = ' + sci(En) + ' N·C⁻¹', W / 2, 20, { mono: true, color: c.accent, weight: 600 });
    tag(L({ en: 'Thin arrows: E from each charge. Thick arrow: resultant E.', af: 'Dun pyle: E van elke lading. Dik pyl: resulterende E.' }), 16, H - 12, { align: 'left', color: c.text2 });
  }

  function dirWords(x, y) {
    const m = Math.hypot(x, y); if (m === 0) return L(T.zero);
    const hz = Math.abs(x) / m > 0.2 ? (x > 0 ? L(T.right) : L(T.left)) : '', vt = Math.abs(y) / m > 0.2 ? (y > 0 ? L(T.up) : L(T.down)) : '';
    const deg = Math.round(((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360);
    if (!vt) return hz;
    return (hz ? hz + ', ' : '') + vt + ' (' + deg + '°)';
  }

  function update() {
    Object.keys(boxes).forEach(k => { boxes[k].style.display = k === S.mode ? '' : 'none'; cards[k].style.display = k === S.mode ? '' : 'none'; });
    cP.style.display = S.mode === 'field' ? '' : 'none';
    ui.cv.el.style.touchAction = S.mode === 'field' ? 'none' : '';
    ui.cv.el.style.cursor = S.mode === 'field' ? 'crosshair' : '';
    primTitle.textContent = L(S.mode === 'law' ? T.F : S.mode === 'net' ? T.Fnet : T.E);
    primUnit.textContent = S.mode === 'field' ? 'N·C⁻¹' : 'N';
    if (S.mode === 'law') {
      const F = coul(S.q1, S.q2, S.r);
      prim.set(fN(F));
      roL.set('t', Math.abs(F) < 1e-12 ? L(T.zero) : L(F > 0 ? T.rep : T.att));
      roL.set('k', num(Math.abs(F) * S.r * S.r, 3) + ' N·m²');
      roL.set('d', fN(F / 4) + ' N');
      ui.setCaption(Math.abs(F) < 1e-12 ? T.capLaw0 : F > 0 ? T.capLawR : T.capLawA);
      ui.cv.el.setAttribute('aria-label', 'Q₁ ' + qs(S.q1) + ', Q₂ ' + qs(S.q2) + ', r ' + ms(S.r) + ': F = ' + fN(F) + ' N, ' + (Math.abs(F) < 1e-12 ? L(T.zero) : L(F > 0 ? T.rep : T.att)) + '.');
    } else if (S.mode === 'net') {
      const f = netForces(), d = (v) => Math.abs(v) < 1e-12 ? '' : ' ' + L(v > 0 ? T.right : T.left);
      prim.set(fN(f.fn));
      roN.set('a', fN(f.f12) + ' N' + d(f.f12)); roN.set('b', fN(f.f32) + ' N' + d(f.f32));
      roN.set('d', Math.abs(f.fn) < 1e-9 ? L(T.zero) : L(f.fn > 0 ? T.right : T.left));
      ui.setCaption(T.capNet);
      ui.cv.el.setAttribute('aria-label', L(T.Fnet) + ': ' + fN(f.fn) + ' N' + d(f.fn) + '.');
    } else {
      const f = fieldAt(S.px, S.py), En = Math.hypot(f.x, f.y);
      const near = [-D / 2, D / 2].some(x => Math.hypot(S.px - x, S.py) < 0.02);
      const zero = !near && En < 0.02 * Math.max(Math.hypot(...f.e1), Math.hypot(...f.e2), 1);
      prim.set(near ? '—' : zero ? '0' : sci(En));
      roF.set('a', (S.f1 ? sci(Math.hypot(...f.e1)) : '0') + ' N·C⁻¹'); roF.set('b', (S.f2 ? sci(Math.hypot(...f.e2)) : '0') + ' N·C⁻¹');
      roF.set('d', near || zero ? '—' : dirWords(f.x, f.y));
      ui.setCaption(zero && S.f1 && S.f2 ? T.capF0 : T.capF);
      ui.cv.el.setAttribute('aria-label', 'Q₁ ' + qs(S.f1) + ', Q₂ ' + qs(S.f2) + ', ' + L(T.E) + ': ' + (near ? '—' : sci(En)) + ' N·C⁻¹.');
    }
    ui.cv.draw();
  }
  update();
});
