/* Gr11 Chemical equilibrium — dynamic equilibrium and Le Chatelier's principle in a sealed gas syringe.
 *   2NO2(g) (brown) ⇌ N2O4(g) (colourless)   ΔH = −57 kJ·mol⁻¹ (forward exothermic)
 * Rates: forward = kf[NO2]², reverse = kr[N2O4]; at equilibrium they are equal, so Kc = [N2O4]/[NO2]² = kf/kr.
 * Kc ≈ 2.2 × 10² at 25 °C (1 / 4.6 × 10⁻³) and changes only with temperature (van 't Hoff, ΔH = −57.2 kJ·mol⁻¹):
 *   Kc(T) = 217 · exp(−ΔH/R · (1/T − 1/298))   → ≈ 1.8 × 10³ at 0 °C, ≈ 2 at 100 °C.
 * Halving the volume doubles every concentration at once (Qc halves, Qc < Kc) so the system shifts forward,
 * to the side with fewer gas moles (2 → 1). A catalyst multiplies kf and kr by the same factor: faster, same Kc.
 * The real reaction is very fast; here time is slowed down so the approach to equilibrium can be followed.
 * Second mode: the Haber process (equilibrium % NH3 for a 1 : 3 feed, the same published data as the old sim).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'A sealed gas syringe holding brown NO₂ and colourless N₂O₄ in equilibrium, with graphs of concentration and reaction rate against time', af: '\'n Verseëlde gasspuit met bruin NO₂ en kleurlose N₂O₄ in ewewig, met grafieke van konsentrasie en reaksietempo teen tyd' },
    ariaH: { en: 'Graph of the equilibrium percentage of ammonia against temperature for several pressures in the Haber process', af: 'Grafiek van die ewewigspersentasie ammoniak teen temperatuur vir verskillende drukke in die Haber-proses' },
    mode: { en: 'System', af: 'Stelsel' }, mNo2: { en: '2NO₂ ⇌ N₂O₄', af: '2NO₂ ⇌ N₂O₄' }, mHab: { en: 'Haber process', af: 'Haber-proses' },
    kc: { en: 'Equilibrium constant Kc', af: 'Ewewigskonstante Kc' }, at: { en: 'at', af: 'by' },
    yieldL: { en: 'NH₃ at equilibrium', af: 'NH₃ by ewewig' }, yieldU: { en: '% of the gas mixture', af: '% van die gasmengsel' },
    no2: { en: '[NO₂]', af: '[NO₂]' }, n2o4: { en: '[N₂O₄]', af: '[N₂O₄]' }, qc: { en: 'Qc', af: 'Qc' }, shift: { en: 'Net reaction', af: 'Netto reaksie' },
    eq: { en: 'at equilibrium', af: 'in ewewig' }, fwd: { en: 'forward (right) →', af: 'voorwaarts (regs) →' }, rev: { en: '← reverse (left)', af: '← terugwaarts (links)' },
    stress: { en: 'Change the conditions', af: 'Verander die toestande' }, temp: { en: 'Temperature (water bath)', af: 'Temperatuur (waterbad)' },
    vol: { en: 'Volume of the syringe', af: 'Volume van die spuit' }, cat: { en: 'Add a catalyst', af: 'Voeg \'n katalisator by' },
    addA: { en: '+ NO₂', af: '+ NO₂' }, addB: { en: '+ N₂O₄', af: '+ N₂O₄' },
    start: { en: 'Start again with', af: 'Begin weer met' }, sA: { en: 'only NO₂', af: 'net NO₂' }, sB: { en: 'only N₂O₄', af: 'net N₂O₄' },
    hcond: { en: 'Reactor conditions', af: 'Reaktortoestande' }, pres: { en: 'Pressure', af: 'Druk' }, rate: { en: 'Rate (iron catalyst)', af: 'Tempo (ysterkatalisator)' },
    slow: { en: 'very slow', af: 'baie stadig' }, mod: { en: 'moderate', af: 'matig' }, fast: { en: 'fast', af: 'vinnig' },
    xT: { en: 'Time (s)', af: 'Tyd (s)' }, yC: { en: 'Concentration (mol·dm⁻³)', af: 'Konsentrasie (mol·dm⁻³)' },
    yR: { en: 'Rate (× 10⁻³ mol·dm⁻³·s⁻¹)', af: 'Tempo (× 10⁻³ mol·dm⁻³·s⁻¹)' }, rf: { en: 'forward', af: 'voorwaarts' }, rr: { en: 'reverse', af: 'terugwaarts' },
    brown: { en: 'brown', af: 'bruin' }, clear: { en: 'colourless', af: 'kleurloos' }, sealed: { en: 'sealed tip', af: 'verseëlde punt' }, plunger: { en: 'plunger', af: 'suier' },
    bath: { en: 'water bath', af: 'waterbad' }, full: { en: 'The syringe is full: start again to add more gas.', af: 'Die spuit is vol: begin weer om meer gas by te voeg.' },
    xH: { en: 'Temperature (°C)', af: 'Temperatuur (°C)' }, yH: { en: 'NH₃ at equilibrium (%)', af: 'NH₃ by ewewig (%)' }, ind: { en: 'industrial range', af: 'industriële gebied' },
    capEq: { en: 'At equilibrium: the forward and reverse reactions continue at equal rates, so [NO₂] and [N₂O₄] stay constant (but they are not equal).', af: 'In ewewig: die voorwaartse en terugwaartse reaksies gaan voort teen gelyke tempo\'s, dus bly [NO₂] en [N₂O₄] konstant (maar hulle is nie gelyk nie).' },
    capStartA: { en: 'Only NO₂ at first: the forward reaction is fast and the reverse cannot start until N₂O₄ forms. The two rates move towards each other.', af: 'Eers net NO₂: die voorwaartse reaksie is vinnig en die terugwaartse kan eers begin wanneer N₂O₄ vorm. Die twee tempo\'s beweeg na mekaar toe.' },
    capStartB: { en: 'Only N₂O₄ at first: now the reverse reaction starts fast. The same equilibrium is reached from the other side, with the same Kc.', af: 'Eers net N₂O₄: nou begin die terugwaartse reaksie vinnig. Dieselfde ewewig word van die ander kant af bereik, met dieselfde Kc.' },
    capAddA: { en: 'More NO₂: Qc < Kc, so the forward reaction speeds up and uses up some of the added NO₂ (shift to the right). Kc does not change.', af: 'Meer NO₂: Qc < Kc, dus versnel die voorwaartse reaksie en gebruik van die bygevoegde NO₂ op (verskuiwing na regs). Kc verander nie.' },
    capAddB: { en: 'More N₂O₄: Qc > Kc, so the reverse reaction speeds up and forms more brown NO₂ (shift to the left). Kc does not change.', af: 'Meer N₂O₄: Qc > Kc, dus versnel die terugwaartse reaksie en vorm meer bruin NO₂ (verskuiwing na links). Kc verander nie.' },
    capPin: { en: 'Smaller volume, higher pressure: the colour first darkens (all the gas is more concentrated), then fades as the equilibrium shifts forward, to the side with fewer gas moles (2 mol → 1 mol).', af: 'Kleiner volume, hoër druk: die kleur word eers donkerder (al die gas is meer gekonsentreerd) en verbleik dan soos die ewewig voorwaarts verskuif, na die kant met minder mol gas (2 mol → 1 mol).' },
    capPout: { en: 'Larger volume, lower pressure: the equilibrium shifts to the left, to the side with more gas moles (2 NO₂), so more NO₂ forms.', af: 'Groter volume, laer druk: die ewewig verskuif na links, na die kant met meer mol gas (2 NO₂), dus vorm meer NO₂.' },
    capHot: { en: 'Hotter: the endothermic reverse reaction is favoured, so more brown NO₂ forms and Kc decreases.', af: 'Warmer: die endotermiese terugwaartse reaksie word bevoordeel, dus vorm meer bruin NO₂ en Kc neem af.' },
    capCold: { en: 'Colder: the exothermic forward reaction is favoured, so the gas turns paler (more N₂O₄) and Kc increases.', af: 'Kouer: die eksotermiese voorwaartse reaksie word bevoordeel, dus word die gas ligter (meer N₂O₄) en Kc neem toe.' },
    capCat: { en: 'Catalyst: both rates increase by the same factor, so equilibrium is reached sooner, but the concentrations and Kc stay the same.', af: 'Katalisator: albei tempo\'s neem met dieselfde faktor toe, dus word ewewig gouer bereik, maar die konsentrasies en Kc bly dieselfde.' },
    capH: [
      { en: 'Low temperature gives a high yield (the forward reaction is exothermic), but the rate is far too slow, even with the iron catalyst.', af: 'Lae temperatuur gee \'n hoë opbrengs (die voorwaartse reaksie is eksotermies), maar die tempo is te stadig, selfs met die ysterkatalisator.' },
      { en: 'About 400 to 500 °C is the compromise: a fast enough rate with an acceptable yield. High pressure helps, because 4 mol of gas become 2 mol.', af: 'Ongeveer 400 tot 500 °C is die kompromie: \'n vinnig genoeg tempo met \'n aanvaarbare opbrengs. Hoë druk help, want 4 mol gas word 2 mol.' },
      { en: 'High temperature gives a fast rate, but it favours the endothermic reverse reaction, so Kc and the yield drop.', af: 'Hoë temperatuur gee \'n vinnige tempo, maar dit bevoordeel die endotermiese terugwaartse reaksie, dus daal Kc en die opbrengs.' },
    ],
  };

  // ── model ──
  const R = 8.314, DH = -57200, K298 = 217, KF0 = 20, EAF = 10000, NMAX = 0.006, N0 = 0.004;
  const Kc = (tc) => K298 * Math.exp(-(DH / R) * (1 / (tc + 273.15) - 1 / 298.15));
  const kf = () => KF0 * Math.exp(-(EAF / R) * (1 / (S.tc + 273.15) - 1 / 298.15)) * (S.cat ? 3 : 1);
  const S = { mode: 'eq', tc: 25, V: 0.1, n: N0, y: N0 / 0.1, x: 0, cat: false, t: 0, acc: 0, hist: [], ev: [], msg: T.capStartA, rMax: 0.02, TH: 450, PH: 200, parts: [] };
  const rates = () => { const k = kf(); return { rf: k * S.y * S.y, rr: k / Kc(S.tc) * S.x }; };
  const atEq = () => { const r = rates(); return Math.abs(r.rf - r.rr) <= 0.03 * Math.max(r.rf, r.rr) + 1e-8; };
  function record() { const r = rates(); S.hist.push({ t: S.t, y: S.y, x: S.x, rf: r.rf, rr: r.rr }); while (S.hist.length && S.hist[0].t < S.t - 31) S.hist.shift(); }
  function step(dt) {
    const h = 0.004;
    for (let s = 0; s < dt - 1e-9; s += h) {
      const k = kf(), kr = k / Kc(S.tc);
      const d = (k * S.y * S.y - kr * S.x) * h;
      S.x = Math.max(0, S.x + d); S.y = Math.max(0, S.y - 2 * d);
      S.t += h; S.acc += h;
      if (S.acc >= 0.1) { S.acc = 0; record(); }
    }
  }
  function settle() { if (MLX.reducedMotion) step(28); }
  function mark(label) { S.ev.push({ t: S.t, label }); record(); }
  function restart(kind) {
    S.n = N0; S.t = 0; S.acc = 0; S.hist = []; S.ev = [];
    if (kind === 'A') { S.y = S.n / S.V; S.x = 0; S.msg = T.capStartA; } else { S.y = 0; S.x = S.n / S.V / 2; S.msg = T.capStartB; }
    record(); settle(); update();
  }
  function add(kind) {
    if (S.n + 0.01 * S.V > NMAX + 1e-9) { S.msg = T.full; update(); return; }
    S.n += 0.01 * S.V;
    if (kind === 'A') { S.y += 0.01; S.msg = T.capAddA; mark('+NO₂'); } else { S.x += 0.005; S.msg = T.capAddB; mark('+N₂O₄'); }
    settle(); update();
  }
  function setV(v) {
    const f = S.V / v; if (f === 1) return;
    S.y *= f; S.x *= f; S.msg = f > 1 ? T.capPin : T.capPout; S.V = v;
    mark(Math.round(v * 1000) + ' cm³'); settle(); update();
  }
  let lastT = -9;
  function setT(v) {
    const up = v > S.tc; S.tc = v; S.msg = up ? T.capHot : T.capCold;
    if (S.t - lastT > 1.5 || !S.ev.length || !/°C/.test(S.ev[S.ev.length - 1].label)) { mark(v + ' °C'); lastT = S.t; } else S.ev[S.ev.length - 1].label = v + ' °C';
    settle(); update();
  }
  // Haber: equilibrium mole % NH3, 1 : 3 feed (published data), interpolated in T and log P (same as the Gr 12 page)
  function haberEq(Tc, P) {
    const Ps = [10, 100, 200, 300, 600];
    const Y = [[50.7, 81.5, 89.0, 89.9, 95.4], [14.7, 52.0, 66.7, 71.0, 84.2], [3.9, 25.2, 38.7, 47.0, 65.2],
      [1.2, 10.6, 18.3, 24.4, 42.2], [0.5, 4.5, 8.8, 13.8, 23.1], [0.2, 1.9, 4.0, 6.3, 12.0]];
    const cl = (v, a, b) => Math.max(a, Math.min(b, v));
    const ti = cl((Tc - 200) / 100, 0, 4.999), i = Math.floor(ti), ft = ti - i;
    const lp = Math.log10(cl(P, 10, 600)), lps = Ps.map(Math.log10);
    let j = 0; while (j < 3 && lp > lps[j + 1]) j++;
    const fp = (lp - lps[j]) / (lps[j + 1] - lps[j]);
    const at = r => Y[r][j] + (Y[r][j + 1] - Y[r][j]) * fp;
    return at(i) + (at(i + 1) - at(i)) * ft;
  }

  // ── UI ──
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 650 : Math.max(380, Math.min(450, Math.round(w * 0.5))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const c0 = MLX.card(ui.side, null);
  MLX.seg(c0, { label: T.mode, options: [['eq', T.mNo2], ['hab', T.mHab]], value: S.mode, onChange: (v) => { S.mode = v; vis(); update(); } });
  const pK = MLX.primary(ui.side, { label: T.kc, unit: '' });
  const pKu = pK.el.querySelector('.mlx-primary-unit');
  const ro = MLX.readout(pK.el, [['y', T.no2], ['x', T.n2o4], ['q', T.qc], ['s', T.shift]]);
  const pH = MLX.primary(ui.side, { label: T.yieldL, unit: T.yieldU });
  const roH = MLX.readout(pH.el, [['r', T.rate]]);
  const c1 = MLX.card(ui.side, T.stress);
  const sT = MLX.slider(c1, { label: T.temp, min: 0, max: 100, step: 5, value: S.tc, fmt: (v) => v + ' °C', onInput: setT });
  const sV = MLX.seg(c1, { label: T.vol, options: [[0.05, '50 cm³'], [0.1, '100 cm³'], [0.2, '200 cm³']], value: S.V, onChange: setV });
  const b1 = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(b1);
  MLX.button(b1, T.addA, () => add('A')); MLX.button(b1, T.addB, () => add('B'));
  const cCat = MLX.check(c1, { label: T.cat, value: false, onChange: (v) => { S.cat = v; S.msg = T.capCat; mark(v ? 'cat.' : '−cat.'); settle(); update(); } });
  cCat.el.style.marginTop = '12px';
  const c2 = MLX.card(ui.side, T.start);
  const b2 = MLX.h('div', { class: 'mlx-btns' }); b2.style.marginTop = '0'; c2.appendChild(b2);
  MLX.button(b2, T.sA, () => restart('A'), 'primary'); MLX.button(b2, T.sB, () => restart('B'));
  const c3 = MLX.card(ui.side, T.hcond);
  MLX.slider(c3, { label: { en: 'Temperature', af: 'Temperatuur' }, min: 200, max: 700, step: 10, value: S.TH, fmt: (v) => v + ' °C', onInput: (v) => { S.TH = v; update(); } });
  MLX.slider(c3, { label: T.pres, min: 10, max: 600, step: 10, value: S.PH, fmt: (v) => v + ' atm', onInput: (v) => { S.PH = v; update(); } });
  function vis() {
    const e = S.mode === 'eq';
    [pK.el, c1, c2].forEach(el => el.style.display = e ? '' : 'none');
    [pH.el, c3].forEach(el => el.style.display = e ? 'none' : '');
    ui.cv.el.setAttribute('aria-label', L(e ? T.aria : T.ariaH));
  }
  vis();

  MLX.loop(ui.cv.el, (dt) => {
    if (S.mode !== 'eq' || MLX.reducedMotion) return;
    step(dt); movePts(dt); update();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  // ── particles in the syringe (each NO2 unit; pairs drawn as N2O4) ──
  function movePts(dt) {
    const sp = 0.16 * (1 + (S.tc - 25) / 250);
    S.parts.forEach(p => {
      p.a += (Math.random() - 0.5) * 3 * dt;
      p.u += Math.cos(p.a) * sp * dt; p.v += Math.sin(p.a) * sp * dt * 1.6;
      if (p.u < 0.03 || p.u > 0.97) { p.a = Math.PI - p.a; p.u = Math.max(0.03, Math.min(0.97, p.u)); }
      if (p.v < 0.12 || p.v > 0.88) { p.a = -p.a; p.v = Math.max(0.12, Math.min(0.88, p.v)); }
    });
  }
  function syncPts() {
    const N = Math.max(2, Math.min(30, Math.round(20 * S.n / N0)));
    while (S.parts.length < N) S.parts.push({ u: 0.04 + Math.random() * 0.92, v: 0.15 + Math.random() * 0.7, a: Math.random() * 6.28 });
    S.parts.length = N;
    const tot = S.y + 2 * S.x, d = tot > 0 ? Math.round(N * (2 * S.x / tot) / 2) : 0;
    return { N, d };
  }

  // ── drawing ──
  let c, ctx;
  const brownRGB = () => c.light ? [150, 78, 24] : [214, 128, 58];
  const colNO2 = () => c.light ? '#9a4f14' : '#e0913f';
  const colF = () => c.light ? '#1d6fb8' : '#6cb4f0';
  const colR = () => c.light ? '#b0412e' : '#f08a6c';
  const colN = () => c.light ? '#2f5fb3' : '#7ea6ef', colO = () => c.light ? '#c0392b' : '#f07167';
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.mode === 'hab') { haber(0, 0, W, H); return; }
    if (W >= 640) {
      const aw = Math.round(W * 0.44);
      syringe(0, 0, aw, H);
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke();
      graphs(aw + 6, 0, W - aw - 6, H);
    } else { syringe(0, 0, W, 262); graphs(0, 264, W, H - 264); }
  }
  function mol(x, y, s, dimer) {
    const dot = (dx, dy, r, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, Math.PI * 2); ctx.fill(); };
    if (!dimer) { dot(-3.6, 2.4, 2.7, colO()); dot(3.6, 2.4, 2.7, colO()); dot(0, -0.6, 3, colN()); }
    else { [-1, 1].forEach(k => { dot(k * 5.6, -3.4, 2.5, colO()); dot(k * 5.6, 3.4, 2.5, colO()); dot(k * 2.2, 0, 2.8, colN()); }); }
  }
  function syringe(x0, y0, w, h) {
    const ph = h < 300;
    text(ctx, '2NO₂(g)  ⇌  N₂O₄(g)', x0 + w / 2, y0 + 26, { size: ph ? 15 : 17, weight: 700, align: 'center', color: c.ink });
    text(ctx, L(T.brown) + '                  ' + L(T.clear), x0 + w / 2, y0 + 45, { size: 12, align: 'center', color: c.text3 });
    text(ctx, 'ΔH = −57 kJ·mol⁻¹', x0 + w / 2, y0 + 64, { size: 12, mono: true, align: 'center', color: c.text2 });
    // geometry: barrel holds 250 cm³; the rod is long enough to leave the barrel at 50 cm³
    const tip = 22, bx0 = x0 + 18 + tip, Lb = Math.min(270, (w - 36 - tip) / 1.72), bh = Math.round(Math.min(74, Math.max(56, h * 0.18)));
    const by = y0 + (ph ? 112 : Math.max(140, h * 0.48)), cap = 250, X = (v) => bx0 + v / cap * Lb, xp = X(S.V * 1000);
    const sc = Math.max(1, Math.min(1.2, bh / 62)), my = by + bh / 2;
    // water bath behind the barrel
    ctx.fillStyle = c.water; MLX.roundRect(ctx, bx0 - tip - 10, by - 8, Lb + tip + 20, bh + 16, 8); ctx.fill();
    text(ctx, L(T.bath) + ': ' + S.tc + ' °C', bx0 + Lb / 2, by + bh + 28, { size: 12, align: 'center', color: c.text2 });
    // gas: the brown colour depends on [NO2] only (N2O4 is colourless)
    const [r, g, b] = brownRGB(), a = Math.min(0.9, 0.06 + S.y / 0.05 * 0.8);
    ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`; ctx.fillRect(bx0, by, xp - bx0, bh);
    const { N, d } = syncPts();
    ctx.save(); ctx.beginPath(); ctx.rect(bx0, by, xp - bx0, bh); ctx.clip();
    for (let i = 0; i < N; i++) {
      const p = S.parts[i], px = bx0 + 8 + p.u * (xp - bx0 - 16), py = by + p.v * bh;
      if (i < 2 * d) { if (i % 2 === 0) mol(px, py, sc, true); else { p.u = S.parts[i - 1].u; p.v = S.parts[i - 1].v; } }
      else mol(px, py, sc, false);
    }
    ctx.restore();
    // barrel, tip and seal cap
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(bx0, by); ctx.lineTo(bx0 + Lb, by); ctx.moveTo(bx0, by + bh); ctx.lineTo(bx0 + Lb, by + bh); ctx.moveTo(bx0, by); ctx.lineTo(bx0, by + bh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx0 + Lb, by - 7); ctx.lineTo(bx0 + Lb, by); ctx.moveTo(bx0 + Lb, by + bh); ctx.lineTo(bx0 + Lb, by + bh + 7); ctx.stroke();
    ctx.strokeRect(bx0 - tip, my - 5, tip, 10);
    ctx.fillStyle = c.light ? '#3a3f47' : '#7b828d'; ctx.fillRect(bx0 - tip - 7, my - 8, 8, 16);
    // graduations (cm³) along the top of the barrel
    for (let v = 0; v <= cap; v += 10) {
      const gx = X(v); ctx.strokeStyle = c.glass; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, by); ctx.lineTo(gx, by + (v % 50 ? 6 : 12)); ctx.stroke();
      if (v % 50 === 0 && v <= 200) text(ctx, String(v), gx, by - 13, { size: 12, mono: true, align: 'center', color: c.text3 });
    }
    text(ctx, 'cm³', X(250) - 2, by - 13, { size: 12, mono: true, align: 'center', color: c.text3 });
    // plunger: rubber seal, rod, handle
    const rod = Lb * 0.78, hx = xp + 9 + rod;
    ctx.fillStyle = c.light ? '#3a3f47' : '#666d78'; ctx.fillRect(xp, by + 1, 9, bh - 2);
    ctx.fillStyle = c.lineHard; ctx.fillRect(xp + 9, my - 3, rod, 6); ctx.fillRect(hx, by - 6, 7, bh + 12);
    // leader labels above the syringe
    ctx.strokeStyle = c.text3; ctx.lineWidth = 1;
    const lab = (s, x1, y1, x2, y2, al) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); text(ctx, s, x2, y2 - 5, { size: 12, align: al, color: c.text2 }); };
    lab(T.sealed, bx0 - tip - 3, my - 9, x0 + 12, by - 36, 'left');
    const right = hx + 4 > x0 + w - 70;
    lab(T.plunger, hx + 4, by - 7, right ? Math.min(hx + 4, x0 + w - 6) : hx + 4, by - 36, right ? 'right' : 'center');
    // key
    const ky = ph ? Math.min(y0 + h - 14, by + bh + 64) : y0 + h - 30;
    mol(x0 + 24, ky - 4, 1.4, false); text(ctx, 'NO₂ (' + L(T.brown) + ')', x0 + 40, ky, { size: 12, color: c.text });
    const k2 = x0 + Math.max(150, w * 0.5);
    mol(k2 + 8, ky - 4, 1.4, true); text(ctx, 'N₂O₄ (' + L(T.clear) + ')', k2 + 26, ky, { size: 12, color: c.text });
  }
  function niceR(m) { const cand = [0.5, 2, 5, 20, 50, 200, 500, 2000].map(v => v / 1000); return cand.find(v => v >= m * 1.05) || cand[cand.length - 1]; }
  function graphs(x0, y0, w, h) {
    const t1 = Math.max(30, S.t), t0 = t1 - 30, half = h / 2;
    const vis = S.hist.filter(p => p.t >= t0 - 0.11);
    let m = 0; vis.forEach(p => { m = Math.max(m, p.rf, p.rr); });
    const need = niceR(m); if (need > S.rMax || m < S.rMax * 0.3) S.rMax = need;
    const series = (ax, key, col, dash) => {
      ctx.save(); ctx.beginPath(); ctx.rect(ax.box.x0, ax.box.y0 - 2, ax.box.x1 - ax.box.x0, ax.box.y1 - ax.box.y0 + 3); ctx.clip();
      ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.setLineDash(dash || []); ctx.beginPath();
      vis.forEach((p, i) => { const X = ax.X(p.t), Y = ax.Y(p[key]); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke(); ctx.restore();
    };
    let lastEnd = -1e9, row = 0;
    const evs = (ax, labels) => S.ev.forEach(e => {
      if (e.t < t0 || e.t <= 0.05) return; const X = ax.X(e.t);
      ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; const tw = ctx.measureText(e.label).width;
      row = X < lastEnd + 6 ? (row + 1) % 2 : 0; if (labels) lastEnd = Math.max(lastEnd, X + 4 + tw);
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(X, ax.box.y0); ctx.lineTo(X, ax.box.y1); ctx.stroke(); ctx.setLineDash([]);
      if (labels) text(ctx, e.label, X + 4, ax.box.y0 + 13 + row * 14, { size: 12, color: c.text3 });
    });
    const key = (ax, items) => {
      let kx = ax.box.x1 - 6; ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
      const kw = items.reduce((a, it) => a + ctx.measureText(L(it[0])).width + 34, 0);
      ctx.fillStyle = c.stage; ctx.fillRect(kx - kw + 6, ax.box.y0 + 17, kw, 18);
      items.slice().reverse().forEach(([s, col, dash]) => {
        const tw = ctx.measureText(L(s)).width; kx -= tw;
        text(ctx, s, kx, ax.box.y0 + 30, { size: 12, color: c.text2 });
        ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.setLineDash(dash || []); ctx.beginPath(); ctx.moveTo(kx - 22, ax.box.y0 + 26); ctx.lineTo(kx - 5, ax.box.y0 + 26); ctx.stroke(); ctx.setLineDash([]);
        kx -= 34;
      });
    };
    const fmtT = (v) => num(v, 0);
    const a1 = MLX.axes(ctx, { x0, y0: y0 + 4, w, h: half - 4, xMin: t0, xMax: t1, yMin: 0, yMax: 0.1, xTitle: T.xT, yTitle: T.yC, xTicks: 6, yTicks: 5, fmtY: (v) => num(v, 2), fmtX: fmtT });
    evs(a1, true); series(a1, 'y', colNO2()); series(a1, 'x', c.accent, [7, 4]);
    key(a1, [['NO₂', colNO2()], ['N₂O₄', c.accent, [7, 4]]]);
    const dec = S.rMax < 0.005 ? 1 : 0;
    const a2 = MLX.axes(ctx, { x0, y0: y0 + half + 2, w, h: half - 2, xMin: t0, xMax: t1, yMin: 0, yMax: S.rMax, xTitle: T.xT, yTitle: T.yR, xTicks: 6, yTicks: 4, fmtY: (v) => num(v * 1000, dec), fmtX: fmtT });
    evs(a2, false); series(a2, 'rf', colF()); series(a2, 'rr', colR(), [7, 4]);
    key(a2, [[T.rf, colF()], [T.rr, colR(), [7, 4]]]);
  }
  function haber(x0, y0, w, h) {
    const ax = MLX.axes(ctx, { x0: x0 + 4, y0: y0 + 30, w: w - 8, h: h - 34, xMin: 200, xMax: 700, yMin: 0, yMax: 100, xTitle: T.xH, yTitle: T.yH, xTicks: 5, yTicks: 5 });
    text(ctx, 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)    ΔH = −92 kJ·mol⁻¹', x0 + w / 2, y0 + 20, { size: w < 500 ? 12 : 14, weight: 600, align: 'center', color: c.ink });
    ctx.fillStyle = c.accentSoft; ctx.fillRect(ax.X(400), ax.box.y0, ax.X(500) - ax.X(400), ax.box.y1 - ax.box.y0);
    text(ctx, T.ind, (ax.X(400) + ax.X(500)) / 2, ax.box.y0 + 14, { size: 12, align: 'center', color: c.text2 });
    const curve = (P, col, lw, dash) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash(dash || []); ctx.beginPath(); for (let t = 200; t <= 700; t += 5) { const X = ax.X(t), Y = ax.Y(haberEq(t, P)); t === 200 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y); } ctx.stroke(); ctx.setLineDash([]); };
    [10, 100, 300, 600].forEach(P => {
      curve(P, c.lineHard, 1.3, [4, 4]);
      const tl = P === 10 ? 250 : P === 100 ? 360 : P === 300 ? 440 : 520;
      text(ctx, P + ' atm', ax.X(tl) + 4, ax.Y(haberEq(tl, P)) - 6, { size: 12, mono: true, color: c.text3 });
    });
    curve(S.PH, c.accent, 2.6);
    const yv = haberEq(S.TH, S.PH), X = ax.X(S.TH), Y = ax.Y(yv);
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(X, ax.box.y1); ctx.lineTo(X, Y); ctx.lineTo(ax.box.x0, Y); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(X, Y, 5.5, 0, Math.PI * 2); ctx.fill();
    text(ctx, S.PH + ' atm: ' + num(yv, 0) + '%', X + (S.TH > 560 ? -10 : 10), Y - 10, { size: 13, weight: 700, mono: true, align: S.TH > 560 ? 'right' : 'left', color: c.ink });
  }

  let lastCap = '';
  function cap(s) { const v = L(s); if (v !== lastCap) { lastCap = v; ui.setCaption(v); } }
  function update() {
    if (S.mode === 'hab') {
      const yv = haberEq(S.TH, S.PH);
      pH.set(num(yv, 0));
      roH.set('r', L(S.TH < 380 ? T.slow : S.TH <= 520 ? T.mod : T.fast));
      cap(T.capH[S.TH < 380 ? 0 : S.TH <= 520 ? 1 : 2]);
      ui.cv.el.setAttribute('aria-label', L(T.ariaH) + '. ' + S.TH + ' °C, ' + S.PH + ' atm: ' + num(yv, 0) + '% NH₃.');
      ui.cv.draw(); return;
    }
    const K = Kc(S.tc), q = S.y > 1e-9 ? S.x / (S.y * S.y) : Infinity, eq = atEq();
    const fK = (v) => !isFinite(v) ? '∞' : v >= 100 ? MLX.big(v) : num(v, v >= 10 ? 0 : 1);
    pK.set(fK(K)); pKu.textContent = L(T.at) + ' ' + S.tc + ' °C';
    ro.set('y', num(S.y, 4) + ' mol·dm⁻³'); ro.set('x', num(S.x, 4) + ' mol·dm⁻³'); ro.set('q', fK(q));
    ro.set('s', L(eq ? T.eq : q < K ? T.fwd : T.rev));
    cap(eq && S.msg !== T.full ? T.capEq : S.msg);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + S.tc + ' °C, ' + Math.round(S.V * 1000) + ' cm³: [NO₂] = ' + num(S.y, 4) + ', [N₂O₄] = ' + num(S.x, 4) + ' mol·dm⁻³, Kc = ' + fK(K) + '.');
    ui.cv.draw();
  }
  restart('A');
});
