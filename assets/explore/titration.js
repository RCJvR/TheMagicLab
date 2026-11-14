/* Acid–base titration (Gr 12): 0.10 mol·dm⁻³ NaOH from a burette into 25.0 cm³ of 0.10 mol·dm⁻³ acid.
 * pH from the exact charge balance [H⁺] + [Na⁺] = [A⁻] + [OH⁻] (Kw = 1.0 × 10⁻¹⁴ at 25 °C):
 *   strong acid HCl (fully ionised); weak acid CH₃COOH, Ka = 1.8 × 10⁻⁵ (pKa = 4.74).
 * Equivalence at 25.0 cm³: pH 7.00 (strong) or 8.72 (weak, the ethanoate ion hydrolyses).
 * Indicators (CAPS table): methyl orange red < 3.1, yellow > 4.4; bromothymol blue yellow < 6.0, blue > 7.6;
 * phenolphthalein colourless < 8.3, pink > 10.0.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'A burette adding sodium hydroxide to an acid in a conical flask with an indicator, and the titration curve', af: '\'n Buret wat natriumhidroksied by \'n suur in \'n koniese fles met \'n indikator voeg, en die titrasiekurwe' },
    ph: { en: 'pH in the flask', af: 'pH in die fles' }, added: { en: 'NaOH added', af: 'NaOH bygevoeg' }, stage: { en: 'Stage', af: 'Stadium' }, eqp: { en: 'Equivalence point', af: 'Ekwivalensiepunt' },
    setup: { en: 'Titration', af: 'Titrasie' }, acid: { en: 'Acid in the flask (25.0 cm³, 0.10 mol·dm⁻³)', af: 'Suur in die fles (25,0 cm³, 0,10 mol·dm⁻³)' },
    strong: { en: 'HCl (strong)', af: 'HCl (sterk)' }, weak: { en: 'CH₃COOH (weak)', af: 'CH₃COOH (swak)' },
    vol: { en: 'Volume of NaOH (0.10 mol·dm⁻³) added', af: 'Volume NaOH (0,10 mol·dm⁻³) bygevoeg' }, ind: { en: 'Indicator', af: 'Indikator' },
    mo: { en: 'Methyl orange', af: 'Metieloranje' }, bb: { en: 'Bromothymol blue', af: 'Broomtimolblou' }, pp: { en: 'Phenolphthalein', af: 'Fenolftaleïen' },
    drip: { en: 'Add drop by drop', af: 'Voeg drup vir drup by' }, reset: { en: 'Refill', af: 'Hervul' },
    xV: { en: 'Volume of NaOH added (cm³)', af: 'Volume NaOH bygevoeg (cm³)' }, yP: { en: 'pH', af: 'pH' },
    sBefore: { en: 'acid in excess', af: 'suur in oormaat' }, sBuffer: { en: 'buffer region (pH ≈ pKa at half-way)', af: 'buffergebied (pH ≈ pKa halfpad)' }, sEq: { en: 'equivalence point', af: 'ekwivalensiepunt' }, sAfter: { en: 'base in excess', af: 'basis in oormaat' },
    burette: { en: 'burette: NaOH', af: 'buret: NaOH' }, flask: { en: 'acid + indicator', af: 'suur + indikator' }, range: { en: 'colour change range', af: 'kleurveranderingsgebied' },
    good: { en: 'A suitable indicator: its colour changes inside the steep part of the curve.', af: '\'n Geskikte indikator: sy kleur verander binne die steil deel van die kurwe.' },
    bad: { en: 'Not suitable here: its colour changes away from the steep part of the curve, so it would show the wrong end point.', af: 'Nie hier geskik nie: sy kleur verander weg van die steil deel van die kurwe, dus sou dit die verkeerde eindpunt wys.' },
  };
  const IND = {
    mo: { lo: 3.1, hi: 4.4, a: [214, 48, 49], b: [234, 179, 8] },
    bb: { lo: 6.0, hi: 7.6, a: [234, 179, 8], b: [37, 99, 235] },
    pp: { lo: 8.3, hi: 10.0, a: null, b: [219, 39, 119] },
  };
  const S = { acid: 'weak', v: 0, ind: 'pp' };
  function pH(v, acid) {
    const Kw = 1e-14, Ka = acid === 'strong' ? Infinity : 1.8e-5, Va = 25, c = 0.1;
    const Ca = c * Va / (Va + v), Cb = c * v / (Va + v);
    const f = (h) => h + Cb - (Ka === Infinity ? Ca : Ca * Ka / (Ka + h)) - Kw / h;
    let lo = -14, hi = 0;
    for (let k = 0; k < 70; k++) { const m = (lo + hi) / 2; if (f(Math.pow(10, m)) > 0) hi = m; else lo = m; }
    return -(lo + hi) / 2;
  }
  function indColour(p) {
    const d = IND[S.ind], t = Math.max(0, Math.min(1, (p - d.lo) / (d.hi - d.lo)));
    if (!d.a) return t <= 0 ? null : [d.b[0], d.b[1], d.b[2], 0.2 + 0.5 * t];
    return [d.a[0] + (d.b[0] - d.a[0]) * t, d.a[1] + (d.b[1] - d.a[1]) * t, d.a[2] + (d.b[2] - d.a[2]) * t, 0.55];
  }

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 420 : Math.max(340, Math.min(420, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky');
  ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.ph, unit: '' });
  const ro = MLX.readout(prim.el, [['v', T.added], ['s', T.stage], ['e', T.eqp]]);
  const c1 = MLX.card(ui.side, T.setup);
  MLX.seg(c1, { label: T.acid, options: [['strong', T.strong], ['weak', T.weak]], value: S.acid, onChange: (v) => { S.acid = v; update(); } });
  const sV = MLX.slider(c1, { label: T.vol, min: 0, max: 50, step: 0.1, value: S.v, fmt: (v) => num(v, 1) + ' cm³', onInput: (v) => { S.v = v; update(); } });
  MLX.seg(c1, { label: T.ind, options: [['mo', T.mo], ['bb', T.bb], ['pp', T.pp]], value: S.ind, onChange: (v) => { S.ind = v; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.drip, () => { S.v = Math.min(50, +(S.v + 0.1).toFixed(1)); sV.set(S.v); update(); }, 'primary');
  MLX.button(bt, T.reset, () => { S.v = 0; sV.set(0); update(); });
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 640) { const aw = Math.round(W * 0.32); drawApp(0, aw, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); drawCurve(aw + 6, W - aw - 6, 0, H); }
    else { drawApp(0, W, H * 0.45); drawCurve(0, W, H * 0.45, H * 0.55); }
  }
  function drawApp(x0, w, H) {
    const cx = x0 + w / 2, base = H - 18;
    // burette: graduated tube, liquid level falls as NaOH is run out (0 cm³ at the top)
    const bTop = 14, bBot = base - 110, bw = 14;
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.4; ctx.strokeRect(cx - bw / 2, bTop, bw, bBot - bTop);
    const lvl = bTop + 6 + (S.v / 50) * (bBot - bTop - 12);
    ctx.fillStyle = c.water; ctx.fillRect(cx - bw / 2 + 1, lvl, bw - 2, bBot - lvl);
    for (let v = 0; v <= 50; v += 10) { const y = bTop + 6 + v / 50 * (bBot - bTop - 12); ctx.beginPath(); ctx.moveTo(cx + bw / 2, y); ctx.lineTo(cx + bw / 2 + 6, y); ctx.stroke(); text(ctx, String(v), cx + bw / 2 + 9, y + 4, { size: 11, mono: true, color: c.text3 }); }
    ctx.beginPath(); ctx.moveTo(cx - 3, bBot); ctx.lineTo(cx - 3, bBot + 14); ctx.lineTo(cx + 3, bBot + 14); ctx.lineTo(cx + 3, bBot); ctx.stroke();
    ctx.fillStyle = c.text2; ctx.fillRect(cx - 9, bBot + 4, 18, 4);   // tap
    text(ctx, T.burette, cx - bw / 2 - 6, bTop + 30, { size: 12, align: 'right', color: c.text3 });
    // conical flask with the indicator colour for the current pH
    const fh = 84, fw = 92, fTop = base - fh, neck = 14;
    const col = indColour(pH(S.v, S.acid));
    const shape = () => { ctx.beginPath(); ctx.moveTo(cx - neck / 2, fTop); ctx.lineTo(cx - neck / 2, fTop + 22); ctx.lineTo(cx - fw / 2, base); ctx.lineTo(cx + fw / 2, base); ctx.lineTo(cx + neck / 2, fTop + 22); ctx.lineTo(cx + neck / 2, fTop); };
    ctx.save(); shape(); ctx.clip();
    ctx.fillStyle = col ? `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${col[3]})` : c.water; ctx.fillRect(cx - fw / 2, base - 40, fw, 40);
    ctx.restore();
    shape(); ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6; ctx.stroke();
    text(ctx, T.flask, cx, base + 14, { size: 12, align: 'center', color: c.text3 });
  }
  function drawCurve(x0, w, y0, H) {
    const ax = MLX.axes(ctx, { x0, y0: y0 + 6, w, h: H - 6, xMin: 0, xMax: 50, yMin: 0, yMax: 14, xTitle: T.xV, yTitle: T.yP, xTicks: 5, yTicks: 7 });
    const d = IND[S.ind];
    ctx.fillStyle = c.accentSoft; ctx.fillRect(ax.box.x0, ax.Y(d.hi), ax.box.x1 - ax.box.x0, ax.Y(d.lo) - ax.Y(d.hi));
    text(ctx, L(T[S.ind]) + ': ' + L(T.range), ax.box.x0 + 6, ax.Y(d.hi) - 5, { size: 11, color: c.text2 });
    // full curve faint, the part already run in the accent colour
    const path = (v1, col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let i = 0; i <= 250; i++) { const v = v1 * i / 250; const X = ax.X(v), Y = ax.Y(pH(v, S.acid)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); };
    path(50, c.lineHard, 1.2);
    if (S.v > 0) path(S.v, c.accent, 2.4);
    const eq = pH(25, S.acid);
    ctx.strokeStyle = c.text3; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(ax.X(25), ax.box.y1); ctx.lineTo(ax.X(25), ax.Y(eq)); ctx.lineTo(ax.box.x0, ax.Y(eq)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, 'pH ' + num(eq, 2), ax.X(25) + 6, ax.Y(eq) + 14, { size: 11, mono: true, color: c.text2 });
    const p = pH(S.v, S.acid);
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(S.v), ax.Y(p), 5, 0, Math.PI * 2); ctx.fill();
  }
  function update() {
    const p = pH(S.v, S.acid), eq = pH(25, S.acid), d = IND[S.ind];
    prim.set(num(p, 2));
    ro.set('v', num(S.v, 1) + ' cm³');
    ro.set('s', L(Math.abs(S.v - 25) < 0.15 ? T.sEq : S.v < 25 ? (S.acid === 'weak' && S.v > 2 ? T.sBuffer : T.sBefore) : T.sAfter));
    ro.set('e', num(25, 1) + ' cm³, pH ' + num(eq, 2));
    // suitable if the indicator range lies inside the steep jump (pH at 24.5 → 25.5 cm³)
    const lo = pH(24.5, S.acid), hi = pH(25.5, S.acid);
    ui.setCaption((d.lo >= lo - 0.3 && d.hi <= hi + 0.3) ? T.good : T.bad);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + num(S.v, 1) + ' cm³ added, pH ' + num(p, 2) + '.');
    ui.cv.draw();
  }
  update();
});
