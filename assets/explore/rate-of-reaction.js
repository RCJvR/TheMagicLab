/* Gr11 Rate of reaction — marble (CaCO₃) and hydrochloric acid, and the Maxwell–Boltzmann distribution.
 *
 * Gas volume: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. The acid is in excess, so the marble alone sets the final
 * volume (60 cm³ for every run); concentration, temperature and surface area change only how FAST it forms.
 *   V(t) = 60·(1 − e^(−kt)),  k = 0.05 s⁻¹ × [HCl]/(1 mol·dm⁻³) × 2^((T − 25)/10) × surface factor
 *   (lump 0.4, chips 1, powder 2.5). Initial rate = 60·k cm³·s⁻¹ (the gradient at t = 0).
 * Energy distribution: f(E) = 2·√(E/π)·(kT)^(−3/2)·e^(−E/kT). The area under every curve is the same (same
 * number of particles); a hotter gas has a lower, broader peak that moves right, and more particles beyond Ea.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Marble chips reacting with hydrochloric acid in a flask, with the carbon dioxide collected in a gas syringe, and a graph of volume against time', af: 'Marmerskyfies wat met soutsuur in \'n fles reageer, met die koolstofdioksied in \'n gasspuit opgevang, en \'n grafiek van volume teen tyd' },
    ariaMB: { en: 'Maxwell–Boltzmann distribution of particle energies at two temperatures, with the activation energy marked', af: 'Maxwell-Boltzmann-verspreiding van deeltjie-energieë by twee temperature, met die aktiveringsenergie gemerk' },
    mode: { en: 'Show', af: 'Wys' }, mGas: { en: 'Gas volume', af: 'Gasvolume' }, mMB: { en: 'Energy of particles', af: 'Energie van deeltjies' },
    vol: { en: 'Volume of CO₂ collected', af: 'Volume CO₂ opgevang' }, init: { en: 'Initial rate', af: 'Aanvanklike tempo' }, time: { en: 'Time', af: 'Tyd' },
    conds: { en: 'Conditions', af: 'Toestande' }, conc: { en: 'HCl concentration', af: 'HCl-konsentrasie' }, temp: { en: 'Temperature', af: 'Temperatuur' },
    surf: { en: 'Marble', af: 'Marmer' }, lump: { en: 'One lump', af: 'Een klont' }, chips: { en: 'Chips', af: 'Skyfies' }, powder: { en: 'Powder', af: 'Poeier' },
    run: { en: 'Run', af: 'Begin' }, pause: { en: 'Pause', af: 'Pouseer' }, reset: { en: 'Clear runs', af: 'Vee lopies uit' },
    xV: { en: 'Time (s)', af: 'Tyd (s)' }, yV: { en: 'Volume of CO₂ (cm³)', af: 'Volume CO₂ (cm³)' }, prev: { en: 'previous run', af: 'vorige lopie' },
    flask: { en: 'Marble + dilute HCl', af: 'Marmer + verdunde HCl' }, syr: { en: 'Gas syringe (cm³)', af: 'Gasspuit (cm³)' }, bath: { en: 'water bath', af: 'waterbad' },
    t1: { en: 'Temperature T₁', af: 'Temperatuur T₁' }, t2: { en: 'Temperature T₂', af: 'Temperatuur T₂' }, ea: { en: 'Activation energy Ea', af: 'Aktiveringsenergie Ea' },
    cat: { en: 'Add a catalyst (lower Ea)', af: 'Voeg \'n katalisator by (laer Ea)' }, above: { en: 'Particles with E ≥ Ea', af: 'Deeltjies met E ≥ Ea' },
    xE: { en: 'Kinetic energy (arbitrary units)', af: 'Kinetiese energie (willekeurige eenhede)' }, yE: { en: 'Fraction of particles', af: 'Fraksie van deeltjies' },
    ratio: { en: 'More effective collisions at T₂', af: 'Meer effektiewe botsings by T₂' },
    capGas: { en: 'Same marble, excess acid: every run ends at 60 cm³. Only the speed changes.', af: 'Dieselfde marmer, oormaat suur: elke lopie eindig by 60 cm³. Net die spoed verander.' },
    capMB: { en: 'Both curves enclose the same area (the same number of particles); the hotter curve is lower and broader, with more particles beyond Ea.', af: 'Albei kurwes sluit dieselfde oppervlakte in (dieselfde aantal deeltjies); die warmer kurwe is laer en breër, met meer deeltjies verby Ea.' },
    predict: { en: 'If the marble chips are crushed to a powder, will the CO₂ form faster, will more CO₂ form, or both?', af: 'As die marmerskyfies tot \'n poeier fyngemaak word, sal die CO₂ vinniger vorm, sal meer CO₂ vorm, of albei?' },
    test: { en: 'Run with chips, then switch to powder and run again; compare the two curves.', af: 'Doen \'n lopie met skyfies, skakel dan oor na poeier en doen weer \'n lopie; vergelyk die twee kurwes.' },
  };
  const VMAX = 60, TEND = 120, SF = { lump: 0.4, chips: 1, powder: 2.5 };
  const S = { mode: 'gas', c: 1, T: 25, surf: 'chips', t: 0, running: false, run: [], prev: null, T1: 300, T2: 360, Ea: 20, cat: false };
  const k = () => 0.05 * S.c * Math.pow(2, (S.T - 25) / 10) * SF[S.surf];
  const Vt = (t, kk) => VMAX * (1 - Math.exp(-(kk == null ? k() : kk) * t));
  // Maxwell–Boltzmann (energy form), normalised: area = 1
  const kT = (Tk) => Tk / 60;
  const mb = (E, Tk) => E <= 0 ? 0 : 2 * Math.sqrt(E / Math.PI) * Math.pow(kT(Tk), -1.5) * Math.exp(-E / kT(Tk));
  function fracAbove(Ea, Tk) { let s = 0; const dE = 0.02; for (let E = Ea; E < 200; E += dE) s += mb(E + dE / 2, Tk) * dE; return s; }

  const panel = root.closest('.tab-panel') || root.parentNode;
  const pred = MLX.predict(panel, { predict: T.predict, test: T.test });
  root.parentNode.insertBefore(pred, root);
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 320 : Math.max(360, Math.min(440, Math.round(w * 0.44))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky');
  ui.cv.el.classList.add('mlx-themed');

  const prim = MLX.primary(ui.side, { label: T.vol, unit: 'cm³' });
  const ro = MLX.readout(prim.el, [['init', T.init], ['t', T.time]]);
  const cMode = MLX.card(ui.side);
  MLX.seg(cMode, { label: T.mode, options: [['gas', T.mGas], ['mb', T.mMB]], value: S.mode, onChange: (v) => { S.mode = v; showMode(); update(); } });
  // gas controls
  const cGas = MLX.card(ui.side, T.conds);
  MLX.slider(cGas, { label: T.conc, min: 0.5, max: 4, step: 0.5, value: S.c, fmt: (v) => num(v, 1) + ' mol·dm⁻³', onInput: (v) => { S.c = v; stopRun(); } });
  MLX.slider(cGas, { label: T.temp, min: 15, max: 55, step: 5, value: S.T, fmt: (v) => v + ' °C', onInput: (v) => { S.T = v; stopRun(); } });
  MLX.seg(cGas, { label: T.surf, options: [['lump', T.lump], ['chips', T.chips], ['powder', T.powder]], value: S.surf, onChange: (v) => { S.surf = v; stopRun(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); cGas.appendChild(bt);
  const bRun = MLX.button(bt, T.run, () => { if (S.running) { S.running = false; label(); return; } if (S.t >= TEND || S.t === 0) startRun(); else { S.running = true; label(); } }, 'primary');
  MLX.button(bt, T.reset, () => { S.prev = null; S.run = []; S.t = 0; S.running = false; label(); update(); });
  // MB controls
  const cMB = MLX.card(ui.side, T.conds);
  MLX.slider(cMB, { label: T.t1, min: 250, max: 450, step: 10, value: S.T1, fmt: (v) => v + ' K', onInput: (v) => { S.T1 = v; update(); } });
  MLX.slider(cMB, { label: T.t2, min: 250, max: 450, step: 10, value: S.T2, fmt: (v) => v + ' K', onInput: (v) => { S.T2 = v; update(); } });
  MLX.slider(cMB, { label: T.ea, min: 8, max: 28, step: 1, value: S.Ea, fmt: (v) => String(v), onInput: (v) => { S.Ea = v; update(); } });
  MLX.check(cMB, { label: T.cat, value: S.cat, onChange: (v) => { S.cat = v; update(); } });

  function showMode() {
    cGas.style.display = S.mode === 'gas' ? '' : 'none';
    cMB.style.display = S.mode === 'mb' ? '' : 'none';
    ui.cv.el.setAttribute('aria-label', L(S.mode === 'gas' ? T.aria : T.ariaMB));
  }
  function label() { bRun.textContent = L(S.running ? T.pause : T.run); }
  function startRun() { if (S.run.length > 1) S.prev = { pts: S.run, k: S.runK }; S.run = [[0, 0]]; S.runK = k(); S.t = 0; S.running = true; label(); }
  function stopRun() { S.running = false; label(); update(); }

  // the experiment runs 6× faster than real time
  const loop = MLX.loop(ui.cv.el, (dt) => {
    if (S.running) {
      S.t = Math.min(TEND, S.t + dt * 6);
      S.run.push([S.t, Vt(S.t, S.runK)]);
      if (S.t >= TEND) { S.running = false; label(); }
      update();
    } else if (S.mode === 'gas' && S.t > 0 && S.t < TEND) ui.cv.draw();
  });
  loop.start();
  MLX.onTheme(() => ui.cv.draw());

  function draw(ctx, W, H) {
    const c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.mode === 'mb') { drawMB(ctx, 0, W, H, c); return; }
    if (W >= 640) {
      const aw = Math.round(W * 0.46);
      drawApparatus(ctx, 0, aw, H, c);
      ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke();
      drawVolGraph(ctx, aw + 6, W - aw - 6, H, c);
    } else {
      drawApparatus(ctx, 0, W, H * 0.48, c);
      drawVolGraph(ctx, 0, W, H * 0.52, c, H * 0.48);
    }
  }

  function drawApparatus(ctx, x0, w, H, c) {
    const V = S.run.length ? S.run[S.run.length - 1][1] : 0;
    const rate = S.running ? VMAX * S.runK * Math.exp(-S.runK * S.t) : 0;
    const s = Math.max(0.7, Math.min(1.45, H / 260)), base = H - 34;
    // water bath
    const bx0 = x0 + 18, bw = w * 0.42;
    ctx.fillStyle = c.water; ctx.fillRect(bx0, base - 70 * s, bw, 70 * s);
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.2; ctx.strokeRect(bx0, base - 70 * s, bw, 70 * s);
    text(ctx, L(T.flask) + ', ' + L(T.bath) + ' ' + S.T + ' °C', bx0, base + 18, { size: 12, color: c.text3 });
    // conical flask
    const fx = bx0 + bw / 2, neckW = 16 * s, fh = 130 * s, fw = 104 * s, fTop = base - fh;
    ctx.beginPath();
    ctx.moveTo(fx - neckW / 2, fTop); ctx.lineTo(fx - neckW / 2, fTop + 34 * s); ctx.lineTo(fx - fw / 2, base - 4); ctx.lineTo(fx + fw / 2, base - 4); ctx.lineTo(fx + neckW / 2, fTop + 34 * s); ctx.lineTo(fx + neckW / 2, fTop);
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6; ctx.stroke();
    // acid in the flask
    const lvl = base - 4 - 52 * s, halfAt = (y) => neckW / 2 + (fw / 2 - neckW / 2) * (y - (fTop + 34 * s)) / (base - 4 - (fTop + 34 * s));
    ctx.fillStyle = c.water; ctx.beginPath(); ctx.moveTo(fx - halfAt(lvl), lvl); ctx.lineTo(fx - fw / 2 + 1, base - 5); ctx.lineTo(fx + fw / 2 - 1, base - 5); ctx.lineTo(fx + halfAt(lvl), lvl); ctx.closePath(); ctx.fill();
    // marble: one lump, several chips, or a layer of powder (same mass)
    ctx.fillStyle = c.text2;
    const by = base - 9;
    if (S.surf === 'lump') { MLX.roundRect(ctx, fx - 14, by - 16, 28, 18, 5); ctx.fill(); }
    else if (S.surf === 'chips') { for (let i = 0; i < 7; i++) { MLX.roundRect(ctx, fx - 30 + i * 9, by - 7 - (i % 2) * 4, 7, 7, 2); ctx.fill(); } }
    else { for (let i = 0; i < 60; i++) ctx.fillRect(fx - 34 + (i * 7.3) % 68, by - 1 - ((i * 3) % 4), 2, 2); }
    // bubbles of CO₂ in the acid (more when the rate is high)
    ctx.strokeStyle = c.text; ctx.lineWidth = 1;
    const nb = Math.min(14, Math.round(rate * 2));
    const tt = performance.now() / 1000;
    for (let i = 0; i < nb; i++) { const ph = (tt * 0.9 + i / nb) % 1; const y = by - 6 - ph * (by - 6 - lvl); const xx = fx - 24 + ((i * 37) % 48); ctx.beginPath(); ctx.arc(xx, y, 2, 0, Math.PI * 2); ctx.stroke(); }
    // delivery tube to the gas syringe
    const sy = fTop + 4, sx0 = fx + neckW / 2 + 40 * s, sLen = Math.max(120, w - (sx0 - x0) - 24), sH = 22 * s;
    ctx.strokeStyle = c.glass; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(fx, fTop); ctx.lineTo(fx, fTop - 16 * s); ctx.lineTo(sx0 - 6, fTop - 16 * s); ctx.lineTo(sx0 - 6, sy + sH / 2); ctx.lineTo(sx0, sy + sH / 2); ctx.stroke();
    // syringe barrel with a 0–100 cm³ scale; the plunger is pushed out by the gas collected
    ctx.lineWidth = 1.4; ctx.strokeRect(sx0, sy, sLen, sH);
    for (let v = 0; v <= 100; v += 10) { const xx = sx0 + v / 100 * (sLen - 10); ctx.beginPath(); ctx.moveTo(xx, sy); ctx.lineTo(xx, sy + (v % 50 ? 5 : 9)); ctx.stroke(); if (v % 50 === 0) text(ctx, String(v), xx, sy - 5, { size: 11, mono: true, align: 'center', color: c.text3 }); }
    const px = sx0 + V / 100 * (sLen - 10);
    ctx.fillStyle = c.accentSoft; ctx.fillRect(sx0 + 1, sy + 1, px - sx0 - 1, sH - 2);
    ctx.strokeStyle = c.accent; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, sy - 2); ctx.lineTo(px, sy + sH + 2); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, sy + sH / 2); ctx.lineTo(px + 26, sy + sH / 2); ctx.stroke();
    text(ctx, T.syr, sx0, sy + sH + 18, { size: 12, color: c.text3 });
  }

  function drawVolGraph(ctx, x0, w, H, c, y0) {
    const ax = MLX.axes(ctx, { x0, y0: (y0 || 0) + 6, w, h: H - 6, xMin: 0, xMax: TEND, yMin: 0, yMax: 80, xTitle: T.xV, yTitle: T.yV, xTicks: 6, yTicks: 4 });
    // final-volume guide
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(VMAX)); ctx.lineTo(ax.box.x1, ax.Y(VMAX)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, '60 cm³', ax.box.x1 - 4, ax.Y(VMAX) - 6, { size: 12, mono: true, align: 'right', color: c.text3 });
    if (S.prev) {
      ctx.strokeStyle = c.text3; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]); ctx.beginPath();
      S.prev.pts.forEach(([t, v], i) => i ? ctx.lineTo(ax.X(t), ax.Y(v)) : ctx.moveTo(ax.X(t), ax.Y(v))); ctx.stroke(); ctx.setLineDash([]);
      const last = S.prev.pts[S.prev.pts.length - 1];
      text(ctx, T.prev, ax.X(Math.min(last[0], TEND * 0.9)), ax.Y(last[1]) + 16, { size: 12, color: c.text3, align: 'right' });
    }
    if (S.run.length > 1) {
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2.2; ctx.beginPath();
      S.run.forEach(([t, v], i) => i ? ctx.lineTo(ax.X(t), ax.Y(v)) : ctx.moveTo(ax.X(t), ax.Y(v))); ctx.stroke();
      // tangent at t = 0: its gradient is the initial rate
      const r0 = VMAX * S.runK, tEnd = Math.min(TEND, 70 / r0);
      ctx.strokeStyle = c.text2; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(ax.X(0), ax.Y(0)); ctx.lineTo(ax.X(tEnd), ax.Y(r0 * tEnd)); ctx.stroke(); ctx.setLineDash([]);
    }
  }

  function drawMB(ctx, x0, w, H, c) {
    const Emax = 30, yMax = Math.max(mb(kT(S.T1) / 2, S.T1), mb(kT(S.T2) / 2, S.T2)) * 1.15;
    const ax = MLX.axes(ctx, { x0, y0: 6, w, h: H - 6, xMin: 0, xMax: Emax, yMin: 0, yMax, xTitle: T.xE, yTitle: T.yE, xTicks: 5, yTicks: 4, fmtY: (v) => num(v, 3) });
    const curve = (Tk, col, dash, fillFrom) => {
      if (fillFrom != null) {
        ctx.fillStyle = col === c.accent ? c.accentSoft : (c.light ? 'rgba(22,24,29,0.08)' : 'rgba(226,232,240,0.10)');
        ctx.beginPath(); ctx.moveTo(ax.X(fillFrom), ax.Y(0));
        for (let E = fillFrom; E <= Emax; E += 0.25) ctx.lineTo(ax.X(E), ax.Y(mb(E, Tk)));
        ctx.lineTo(ax.X(Emax), ax.Y(0)); ctx.closePath(); ctx.fill();
      }
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.setLineDash(dash || []); ctx.beginPath();
      for (let E = 0; E <= Emax; E += 0.25) { const X = ax.X(E), Y = ax.Y(mb(E, Tk)); E ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
      ctx.stroke(); ctx.setLineDash([]);
    };
    const ea = S.cat ? S.Ea * 0.6 : S.Ea;
    curve(S.T1, c.text2, [5, 4], ea);
    curve(S.T2, c.accent, null, ea);
    const line = (E, lab, dash) => { ctx.strokeStyle = c.ink; ctx.lineWidth = 1.4; ctx.setLineDash(dash || []); ctx.beginPath(); ctx.moveTo(ax.X(E), ax.box.y0); ctx.lineTo(ax.X(E), ax.box.y1); ctx.stroke(); ctx.setLineDash([]); text(ctx, lab, ax.X(E) + 6, ax.box.y0 + 14, { size: 12, color: c.ink }); };
    line(S.Ea, 'Ea', S.cat ? [3, 3] : null);
    if (S.cat) line(ea, 'Ea (cat)');
    const lx = ax.box.x1 - 150;
    ctx.strokeStyle = c.text2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(lx, ax.box.y0 + 36); ctx.lineTo(lx + 24, ax.box.y0 + 36); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, 'T₁ = ' + S.T1 + ' K', lx + 30, ax.box.y0 + 40, { size: 12, color: c.text2 });
    ctx.strokeStyle = c.accent; ctx.beginPath(); ctx.moveTo(lx, ax.box.y0 + 56); ctx.lineTo(lx + 24, ax.box.y0 + 56); ctx.stroke();
    text(ctx, 'T₂ = ' + S.T2 + ' K', lx + 30, ax.box.y0 + 60, { size: 12, color: c.accent });
  }

  function rowLabels(a, b) { const sp = prim.el.querySelectorAll('.mlx-row > span:first-child'); sp[0].textContent = L(a); sp[1].textContent = L(b); }
  function update() {
    if (S.mode === 'gas') {
      rowLabels(T.init, T.time);
      const V = S.run.length ? S.run[S.run.length - 1][1] : 0;
      prim.el.querySelector('.mlx-card-title').textContent = L(T.vol);
      prim.el.querySelector('.mlx-primary-unit').textContent = 'cm³';
      prim.set(num(V, 1));
      ro.set('init', num(VMAX * (S.run.length ? S.runK : k()), 2) + ' cm³·s⁻¹');
      ro.set('t', num(S.t, 0) + ' s');
      ui.setCaption(T.capGas);
    } else {
      const ea = S.cat ? S.Ea * 0.6 : S.Ea, f1 = fracAbove(ea, S.T1), f2 = fracAbove(ea, S.T2);
      rowLabels({ en: 'At T₁', af: 'By T₁' }, T.ratio);
      prim.el.querySelector('.mlx-card-title').textContent = L(T.above) + ' (T₂)';
      prim.el.querySelector('.mlx-primary-unit').textContent = '%';
      prim.set(num(100 * f2, 1));
      ro.set('init', num(100 * f1, 1) + '%');
      ro.set('t', f1 > 0 ? '× ' + num(f2 / f1, 1) : '—');
      ui.setCaption(T.capMB);
    }
    ui.cv.draw();
  }
  showMode();
  update();
});
