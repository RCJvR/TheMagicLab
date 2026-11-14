/* Electromagnetic induction, generators and transformers (Gr 11, Gr 12) — one shared simulation.
 * Configure with data-gen on #mlx-root:  gr11 → induction, AC generator, transformer;  gr12 → AC and DC generator.
 *
 * Induction: a bar magnet passes through a coil at constant speed. Flux Φ(x) = B·A·e^(−x²/2σ²) (A = 0.01 m², σ = 5 cm),
 *   emf = −N·dΦ/dt = −N·(dΦ/dx)·v: zero when the magnet is centred, opposite signs on approach and exit (Faraday, Lenz).
 * Generator (seen along the axle): θ = ωt is the angle between the coil's normal and B. Φ = BA·cos θ,
 *   emf = NBAω·sin θ. Slip rings give AC; a split-ring commutator reverses the connections every half turn (DC).
 *   V_rms = V_max/√2 for AC.
 * Transformer (ideal): Vs/Vp = Ns/Np, and Ip·Vp = Is·Vs.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const grade = root.getAttribute('data-gen') || 'gr11';
  const T = {
    aria: { en: 'Electromagnetic induction: a coil in a magnetic field, a meter and a graph of the induced emf against time', af: 'Elektromagnetiese induksie: \'n spoel in \'n magneetveld, \'n meter en \'n grafiek van die geïnduseerde emk teen tyd' },
    mode: { en: 'Show', af: 'Wys' }, induction: { en: 'Magnet and coil', af: 'Magneet en spoel' }, ac: { en: 'AC generator', af: 'WS-generator' },
    dc: { en: 'DC generator', af: 'GS-generator' }, transformer: { en: 'Transformer', af: 'Transformator' },
    emf: { en: 'Induced emf now', af: 'Geïnduseerde emk nou' }, peak: { en: 'Peak emf', af: 'Piek-emk' }, rms: { en: 'rms emf', af: 'wgk-emk' },
    freq: { en: 'Frequency', af: 'Frekwensie' }, angle: { en: 'Angle θ (normal to B)', af: 'Hoek θ (normaal tot B)' }, flux: { en: 'Flux through the coil', af: 'Vloed deur die spoel' },
    speed: { en: 'Magnet speed', af: 'Magneetspoed' }, B: { en: 'Field strength B', af: 'Veldsterkte B' }, N: { en: 'Turns N', af: 'Windings N' },
    omega: { en: 'Rotation (turns per second)', af: 'Rotasie (omwentelings per sekonde)' }, A: { en: 'Coil area A', af: 'Spoeloppervlakte A' },
    Np: { en: 'Primary turns Np', af: 'Primêre windings Np' }, Ns: { en: 'Secondary turns Ns', af: 'Sekondêre windings Ns' }, Vp: { en: 'Primary voltage Vp', af: 'Primêre spanning Vp' },
    Vs: { en: 'Secondary voltage', af: 'Sekondêre spanning' }, kind: { en: 'Type', af: 'Soort' }, up: { en: 'step-up', af: 'verhoog' }, down: { en: 'step-down', af: 'verlaag' }, same: { en: 'same voltage', af: 'dieselfde spanning' },
    vals: { en: 'Values', af: 'Waardes' }, xT: { en: 'Time (s)', af: 'Tyd (s)' }, yE: { en: 'emf (V)', af: 'emk (V)' },
    coil: { en: 'coil', af: 'spoel' }, normal: { en: 'normal', af: 'normaal' }, rings: { en: 'slip rings', af: 'sleepringe' }, comm: { en: 'split-ring commutator', af: 'splitringkommutator' },
    core: { en: 'soft-iron core', af: 'sagte-ysterkern' }, prim: { en: 'primary', af: 'primêr' }, sec: { en: 'secondary', af: 'sekondêr' },
    capIn: { en: 'The emf is zero when the magnet is centred in the coil (flux at its maximum, not changing) and reverses as the magnet leaves.', af: 'Die emk is nul wanneer die magneet in die middel van die spoel is (vloed maksimum, verander nie) en keer om wanneer die magneet uitbeweeg.' },
    capAC: { en: 'emf = NBAω sin θ: zero when the coil faces the field (flux greatest), largest when its sides cut straight across the field lines.', af: 'emk = NBAω sin θ: nul wanneer die spoel na die veld wys (vloed grootste), grootste wanneer sy kante reg dwars deur die veldlyne sny.' },
    capDC: { en: 'The split-ring commutator swaps the connections every half turn, so the output never reverses: it is DC, though it still varies.', af: 'Die splitringkommutator ruil die verbindings elke halwe omwenteling om, dus keer die uitset nooit om nie: dit is GS, al wissel dit steeds.' },
    capTr: { en: 'An ideal transformer: Vs/Vp = Ns/Np. More turns on the secondary steps the voltage up (and the current down).', af: '\'n Ideale transformator: Vs/Vp = Ns/Np. Meer windings op die sekondêre verhoog die spanning (en verlaag die stroom).' },
  };
  const modes = grade === 'gr12' ? ['ac', 'dc'] : ['induction', 'ac', 'transformer'];
  const S = { mode: modes[0], v: 0.3, Bi: 0.5, Ni: 10, f: 1, Bg: 0.5, Ng: 50, A: 0.05, Np: 100, Ns: 200, Vp: 120, t: 0, x: -0.25, hist: [] };
  const A0 = 0.01, SIG = 0.05;
  function indEmf(x) { const g = Math.exp(-x * x / (2 * SIG * SIG)); return { flux: S.Bi * A0 * g, emf: S.Ni * S.Bi * A0 * (x / (SIG * SIG)) * g * S.v }; }
  const omega = () => 2 * Math.PI * S.f, peakG = () => S.Ng * S.Bg * S.A * omega();
  const genEmf = (t) => { const e = peakG() * Math.sin(omega() * t); return S.mode === 'dc' ? Math.abs(e) : e; };

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 440 : Math.max(340, Math.min(420, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky');
  ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.emf, unit: 'V' });
  const ro = MLX.readout(prim.el, [['a', T.peak], ['b', T.rms], ['c', T.freq]]);
  if (modes.length > 1) MLX.seg(MLX.card(ui.side), { label: T.mode, options: modes.map(m => [m, T[m]]), value: S.mode, onChange: (m) => { S.mode = m; S.hist = []; S.t = 0; S.x = -0.25; show(); update(); } });
  const cIn = MLX.card(ui.side, T.vals), cGen = MLX.card(ui.side, T.vals), cTr = MLX.card(ui.side, T.vals);
  MLX.slider(cIn, { label: T.speed, min: 0.1, max: 0.6, step: 0.05, value: S.v, fmt: (v) => num(v, 2) + ' m·s⁻¹', onInput: (v) => { S.v = v; S.hist = []; } });
  MLX.slider(cIn, { label: T.B, min: 0.1, max: 1, step: 0.05, value: S.Bi, fmt: (v) => num(v, 2) + ' T', onInput: (v) => { S.Bi = v; S.hist = []; } });
  MLX.slider(cIn, { label: T.N, min: 1, max: 50, step: 1, value: S.Ni, fmt: (v) => String(v), onInput: (v) => { S.Ni = v; S.hist = []; } });
  MLX.slider(cGen, { label: T.omega, min: 0.5, max: 3, step: 0.25, value: S.f, fmt: (v) => num(v, 2) + ' Hz', onInput: (v) => { S.f = v; S.hist = []; } });
  MLX.slider(cGen, { label: T.B, min: 0.1, max: 1, step: 0.05, value: S.Bg, fmt: (v) => num(v, 2) + ' T', onInput: (v) => { S.Bg = v; S.hist = []; } });
  MLX.slider(cGen, { label: T.N, min: 10, max: 200, step: 10, value: S.Ng, fmt: (v) => String(v), onInput: (v) => { S.Ng = v; S.hist = []; } });
  MLX.slider(cGen, { label: T.A, min: 0.01, max: 0.1, step: 0.01, value: S.A, fmt: (v) => num(v, 2) + ' m²', onInput: (v) => { S.A = v; S.hist = []; } });
  MLX.slider(cTr, { label: T.Np, min: 10, max: 500, step: 10, value: S.Np, fmt: (v) => String(v), onInput: (v) => { S.Np = v; update(); } });
  MLX.slider(cTr, { label: T.Ns, min: 10, max: 500, step: 10, value: S.Ns, fmt: (v) => String(v), onInput: (v) => { S.Ns = v; update(); } });
  MLX.slider(cTr, { label: T.Vp, min: 10, max: 240, step: 10, value: S.Vp, fmt: (v) => v + ' V', onInput: (v) => { S.Vp = v; update(); } });
  function show() {
    cIn.style.display = S.mode === 'induction' ? '' : 'none';
    cGen.style.display = S.mode === 'ac' || S.mode === 'dc' ? '' : 'none';
    cTr.style.display = S.mode === 'transformer' ? '' : 'none';
    const lab = prim.el.querySelectorAll('.mlx-row > span:first-child');
    const tl = prim.el.querySelector('.mlx-card-title');
    if (S.mode === 'induction') { tl.textContent = L(T.emf); lab[0].textContent = L(T.flux); lab[1].textContent = 'dΦ/dt'; lab[2].textContent = L(T.N); }
    else if (S.mode === 'transformer') { tl.textContent = L(T.Vs); lab[0].textContent = L(T.kind); lab[1].textContent = 'Ns/Np'; lab[2].textContent = L(T.Vp); }
    else { tl.textContent = L(T.emf); lab[0].textContent = L(T.peak); lab[1].textContent = S.mode === 'ac' ? L(T.rms) : L(T.angle); lab[2].textContent = L(T.freq); }
  }

  const loop = MLX.loop(ui.cv.el, (dt) => {
    if (S.mode === 'transformer') return;
    const step = MLX.reducedMotion ? 0 : dt;
    if (S.mode === 'induction') {
      S.x += S.v * step; if (S.x > 0.25) { S.x = -0.25; S.hist = []; }
      S.hist.push([S.x, indEmf(S.x).emf]);
    } else {
      S.t += step * 0.5;   // shown at half speed so the rotation can be followed
      S.hist.push([S.t, genEmf(S.t)]); while (S.hist.length && S.hist[0][0] < S.t - 2) S.hist.shift();
    }
    update();
  });
  loop.start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.mode === 'transformer') { drawTr(0, W, H); return; }
    const wide = W >= 640, pw = wide ? Math.round(W * 0.46) : W, ph = wide ? H : H * 0.52;
    if (S.mode === 'induction') drawInd(0, pw, ph); else drawGen(0, pw, ph);
    if (wide) { ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(pw + 0.5, 14); ctx.lineTo(pw + 0.5, H - 14); ctx.stroke(); drawGraph(pw + 6, W - pw - 6, H, 0); }
    else drawGraph(0, W, H - ph, ph);
  }

  function meter(x, y, r, val, max, unit) {
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, Math.PI, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.stroke();
    for (let k = -4; k <= 4; k++) { const a = -Math.PI / 2 + k * Math.PI / 10; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 0.86, y + Math.sin(a) * r * 0.86); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.stroke(); }
    text(ctx, '0', x, y - r - 6, { size: 11, mono: true, align: 'center', color: c.text3 });
    const a = -Math.PI / 2 + Math.max(-1, Math.min(1, val / max)) * Math.PI * 0.4;
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * 0.9, y + Math.sin(a) * r * 0.9); ctx.stroke();
    text(ctx, (val >= 0 ? '+' : '−') + num(Math.abs(val), 3) + ' ' + unit, x, y + 18, { size: 12, mono: true, align: 'center', color: c.ink });
  }

  function drawInd(x0, w, H) {
    const cy = H * 0.42, cx = x0 + w * 0.5, pxPerM = (w - 40) / 0.5;
    // coil seen from the side: a row of loops
    const turns = Math.min(14, 3 + Math.round(S.Ni / 4)), cw = 60, ch = 90;
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.6;
    for (let i = 0; i < turns; i++) { const xx = cx - cw / 2 + i * cw / (turns - 1); ctx.beginPath(); ctx.ellipse(xx, cy, 6, ch / 2, 0, 0, Math.PI * 2); ctx.stroke(); }
    text(ctx, L(T.coil) + ', N = ' + S.Ni, cx, cy + ch / 2 + 18, { size: 12, align: 'center', color: c.text3 });
    // magnet (N leading, moving right)
    const mx = cx + S.x * pxPerM, mw = 70, mh = 26;
    ctx.fillStyle = '#c94848'; ctx.fillRect(mx, cy - mh / 2, mw / 2, mh);
    ctx.fillStyle = '#4b6fd1'; ctx.fillRect(mx - mw / 2, cy - mh / 2, mw / 2, mh);
    text(ctx, 'N', mx + mw / 4, cy + 5, { size: 13, weight: 700, align: 'center', color: '#fff' });
    text(ctx, 'S', mx - mw / 4, cy + 5, { size: 13, weight: 700, align: 'center', color: '#fff' });
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(mx - 20, cy - mh / 2 - 12); ctx.lineTo(mx + 20, cy - mh / 2 - 12); ctx.lineTo(mx + 14, cy - mh / 2 - 16); ctx.moveTo(mx + 20, cy - mh / 2 - 12); ctx.lineTo(mx + 14, cy - mh / 2 - 8); ctx.stroke();
    text(ctx, 'v', mx + 26, cy - mh / 2 - 8, { size: 12, color: c.ink });
    // centre-zero meter wired to the coil
    const e = indEmf(S.x).emf, my = H - 40;
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx - cw / 2, cy + ch / 2); ctx.lineTo(cx - cw / 2, my - 4); ctx.lineTo(cx - 34, my - 4); ctx.moveTo(cx + cw / 2, cy + ch / 2); ctx.lineTo(cx + cw / 2, my - 4); ctx.lineTo(cx + 34, my - 4); ctx.stroke();
    meter(cx, my, 30, e, S.Ni * S.Bi * A0 * S.v / (SIG * Math.sqrt(Math.E)) * 1.1, 'V');
  }

  function drawGen(x0, w, H) {
    const cx = x0 + w * 0.5, cy = H * 0.42, gap = Math.min(w * 0.36, 130), R = Math.min(gap * 0.78, H * 0.3), pH = Math.min(120, H * 0.5);
    // pole pieces and field lines (N → S)
    ctx.fillStyle = '#c94848'; ctx.fillRect(cx - gap - 30, cy - pH / 2, 30, pH);
    ctx.fillStyle = '#4b6fd1'; ctx.fillRect(cx + gap, cy - pH / 2, 30, pH);
    text(ctx, 'N', cx - gap - 15, cy + 5, { size: 14, weight: 700, align: 'center', color: '#fff' });
    text(ctx, 'S', cx + gap + 15, cy + 5, { size: 14, weight: 700, align: 'center', color: '#fff' });
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1;
    for (let k = -2; k <= 2; k++) { const y = cy + k * 22; ctx.beginPath(); ctx.moveTo(cx - gap + 4, y); ctx.lineTo(cx + gap - 4, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx + gap - 10, y - 4); ctx.lineTo(cx + gap - 4, y); ctx.lineTo(cx + gap - 10, y + 4); ctx.stroke(); }
    text(ctx, 'B', cx + gap - 14, cy - pH / 2 + 6, { size: 12, color: c.text2 });
    // the coil seen end-on along the axle: a line through the axle; its normal makes angle θ with B
    const th = omega() * S.t;
    const nx = Math.cos(th), ny = -Math.sin(th);           // normal direction
    const px = -ny, py = nx;                                 // coil plane direction
    ctx.strokeStyle = c.accent; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - px * R, cy - py * R); ctx.lineTo(cx + px * R, cy + py * R); ctx.stroke(); ctx.lineCap = 'butt';
    // the two sides of the coil, seen as dots (current out) and crosses (current in) when emf ≠ 0
    const e = Math.sin(th);
    [[1, e >= 0], [-1, e < 0]].forEach(([sgn, out]) => {
      const sx = cx + sgn * px * R, sy = cy + sgn * py * R;
      ctx.fillStyle = c.stage; ctx.beginPath(); ctx.arc(sx, sy, 8, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.stroke();
      if (Math.abs(e) > 0.05) {
        if (out) { ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(sx, sy, 2.5, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.beginPath(); ctx.moveTo(sx - 4, sy - 4); ctx.lineTo(sx + 4, sy + 4); ctx.moveTo(sx + 4, sy - 4); ctx.lineTo(sx - 4, sy + 4); ctx.stroke(); }
      }
    });
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    // normal arrow
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + nx * R * 0.7, cy + ny * R * 0.7); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, L(T.normal), cx + nx * R * 0.78, cy + ny * R * 0.78, { size: 11, align: 'center', color: c.text2 });
    // slip rings or commutator, schematic, below
    const ry = H - 26;
    if (S.mode === 'ac') {
      [-14, 14].forEach(o => { ctx.strokeStyle = c.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx + o, ry, 6, 14, 0, 0, Math.PI * 2); ctx.stroke(); });
      text(ctx, T.rings, cx + 34, ry + 4, { size: 12, color: c.text3 });
    } else {
      const flip = Math.sin(th) < 0;
      ctx.strokeStyle = c.text2; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, ry, 14, flip ? 0.2 : Math.PI + 0.2, flip ? Math.PI - 0.2 : 2 * Math.PI - 0.2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, ry, 14, flip ? Math.PI + 0.2 : 0.2, flip ? 2 * Math.PI - 0.2 : Math.PI - 0.2); ctx.stroke();
      text(ctx, T.comm, cx + 24, ry + 18, { size: 12, color: c.text3 });
    }
    text(ctx, 'θ = ' + num(((th * 180 / Math.PI) % 360 + 360) % 360, 0) + '°', x0 + 12, 22, { size: 12, mono: true, color: c.text2 });
  }

  function drawGraph(x0, w, H, y0) {
    if (S.mode === 'induction') {
      const emax = Math.max(0.005, S.Ni * S.Bi * A0 * S.v / (SIG * Math.sqrt(Math.E)) * 1.15);
      const ax = MLX.axes(ctx, { x0, y0: y0 + 6, w, h: H - 6, xMin: -25, xMax: 25, yMin: -emax, yMax: emax, xTitle: { en: 'Magnet position from the coil centre (cm)', af: 'Magneetposisie vanaf die spoel se middel (cm)' }, yTitle: T.yE, xTicks: 5, yTicks: 4, fmtY: (v) => num(v, emax < 0.05 ? 3 : 2) });
      zero(ax);
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath(); S.hist.forEach(([x, e], i) => { const X = ax.X(x * 100), Y = ax.Y(e); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
    } else {
      const pk = peakG() * 1.15, t1 = Math.max(2, S.t), t0 = t1 - 2;
      const ax = MLX.axes(ctx, { x0, y0: y0 + 6, w, h: H - 6, xMin: t0, xMax: t1, yMin: S.mode === 'dc' ? 0 : -pk, yMax: pk, xTitle: T.xT, yTitle: T.yE, xTicks: 4, yTicks: 4, fmtX: (v) => num(v, 1), fmtY: (v) => num(v, pk < 10 ? 1 : 0) });
      zero(ax);
      if (S.mode === 'ac') { const rms = peakG() / Math.SQRT2; ctx.strokeStyle = c.text3; ctx.setLineDash([3, 4]); [rms].forEach(v => { ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(v)); ctx.lineTo(ax.box.x1, ax.Y(v)); ctx.stroke(); }); ctx.setLineDash([]); text(ctx, 'V_rms', ax.box.x1 - 4, ax.Y(rms) - 5, { size: 11, align: 'right', color: c.text3 }); }
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath(); S.hist.forEach(([t, e], i) => { const X = ax.X(t), Y = ax.Y(e); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
    }
  }
  function zero(ax) { ctx.strokeStyle = c.lineHard; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(0)); ctx.lineTo(ax.box.x1, ax.Y(0)); ctx.stroke(); ctx.setLineDash([]); }

  function drawTr(x0, W, H) {
    const cx = x0 + W / 2, cy = H * 0.46, cw = Math.min(W * 0.5, 300), chh = Math.min(H * 0.6, 220), t = 26;
    ctx.strokeStyle = c.text2; ctx.lineWidth = t; ctx.strokeRect(cx - cw / 2 + t / 2, cy - chh / 2 + t / 2, cw - t, chh - t);
    text(ctx, T.core, cx, cy - chh / 2 - 10, { size: 12, align: 'center', color: c.text3 });
    const coil = (x, n, lab) => {
      const k = Math.max(3, Math.min(18, Math.round(n / 25)));
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2;
      for (let i = 0; i < k; i++) { const y = cy - chh / 2 + t + 10 + i * (chh - 2 * t - 20) / (k - 1); ctx.beginPath(); ctx.ellipse(x, y, t * 0.9, 4, 0, 0, Math.PI * 2); ctx.stroke(); }
      text(ctx, lab + ' (' + n + ')', x, cy + chh / 2 + 18, { size: 12, align: 'center', color: c.text2 });
    };
    coil(cx - cw / 2 + t / 2, S.Np, L(T.prim)); coil(cx + cw / 2 - t / 2, S.Ns, L(T.sec));
    const Vs = S.Vp * S.Ns / S.Np;
    text(ctx, 'Vp = ' + num(S.Vp, 0) + ' V', cx - cw / 2 - 40, cy, { size: 13, mono: true, align: 'right', color: c.ink });
    text(ctx, 'Vs = ' + num(Vs, 1) + ' V', cx + cw / 2 + 40, cy, { size: 13, mono: true, color: c.ink });
  }

  function update() {
    if (S.mode === 'induction') {
      const r = indEmf(S.x);
      prim.set((r.emf >= 0 ? '+' : '−') + num(Math.abs(r.emf), 3));
      ro.set('a', num(r.flux * 1000, 2) + ' mWb'); ro.set('b', num(-r.emf / S.Ni, 4) + ' Wb·s⁻¹'); ro.set('c', String(S.Ni));
      ui.setCaption(T.capIn);
    } else if (S.mode === 'transformer') {
      const Vs = S.Vp * S.Ns / S.Np;
      prim.set(num(Vs, 1)); ro.set('a', L(S.Ns > S.Np ? T.up : S.Ns < S.Np ? T.down : T.same)); ro.set('b', num(S.Ns / S.Np, 2)); ro.set('c', S.Vp + ' V');
      ui.setCaption(T.capTr);
    } else {
      const e = genEmf(S.t), th = ((omega() * S.t * 180 / Math.PI) % 360 + 360) % 360;
      prim.set((e < 0 ? '−' : '') + num(Math.abs(e), 2));
      ro.set('a', num(peakG(), 2) + ' V'); ro.set('b', S.mode === 'ac' ? num(peakG() / Math.SQRT2, 2) + ' V' : num(th, 0) + '°'); ro.set('c', num(S.f, 2) + ' Hz');
      ui.setCaption(S.mode === 'ac' ? T.capAC : T.capDC);
    }
    ui.cv.draw();
  }
  show();
  update();
});
