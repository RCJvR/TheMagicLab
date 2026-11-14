/* Gr10 Chemistry of life — enzyme action (lock-and-key model), temperature and pH.
 * Below the optimum the rate roughly doubles for every 10 °C (slow, not zero, at 0 °C); above about 40 °C the
 * active site changes shape and the rate falls steeply. Heating past about 50 °C denatures the enzyme permanently:
 * cooling it again does not bring the active site back (a fresh enzyme is needed). Each enzyme has an optimum pH:
 * salivary amylase ≈ 7, pepsin (stomach) ≈ 2. Extreme pH also denatures it.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'An enzyme with its active site and substrate molecules, and graphs of the reaction rate against temperature and pH', af: '\'n Ensiem met sy aktiewe setel en substraatmolekules, en grafieke van die reaksietempo teen temperatuur en pH' },
    rate: { en: 'Rate of reaction', af: 'Reaksietempo' }, unit: { en: '% of the maximum', af: '% van die maksimum' }, state: { en: 'Enzyme', af: 'Ensiem' },
    ok: { en: 'active', af: 'aktief' }, den: { en: 'denatured (permanent)', af: 'gedenatureer (permanent)' }, phden: { en: 'denatured by the pH', af: 'gedenatureer deur die pH' },
    conds: { en: 'Conditions', af: 'Toestande' }, enz: { en: 'Enzyme', af: 'Ensiem' }, amy: { en: 'Amylase (saliva)', af: 'Amilase (speeksel)' }, pep: { en: 'Pepsin (stomach)', af: 'Pepsien (maag)' },
    temp: { en: 'Temperature', af: 'Temperatuur' }, ph: { en: 'pH', af: 'pH' }, fresh: { en: 'Use a fresh enzyme', af: 'Gebruik \'n vars ensiem' },
    enzL: { en: 'enzyme', af: 'ensiem' }, site: { en: 'active site', af: 'aktiewe setel' }, sub: { en: 'substrate', af: 'substraat' }, prod: { en: 'products', af: 'produkte' },
    yR: { en: 'Rate (%)', af: 'Tempo (%)' }, xT: { en: 'Temperature (°C)', af: 'Temperatuur (°C)' }, xP: { en: 'pH', af: 'pH' },
    capOk: { en: 'The substrate fits the active site like a key in a lock, and is broken into products.', af: 'Die substraat pas in die aktiewe setel soos \'n sleutel in \'n slot, en word in produkte afgebreek.' },
    capCold: { en: 'Cold: the enzyme is not damaged, but molecules move slowly, so fewer substrates reach the active site.', af: 'Koud: die ensiem is nie beskadig nie, maar molekules beweeg stadig, dus bereik minder substrate die aktiewe setel.' },
    capDen: { en: 'Denatured: the active site has changed shape, so the substrate no longer fits. Heat damage is permanent.', af: 'Gedenatureer: die aktiewe setel het van vorm verander, dus pas die substraat nie meer nie. Hitteskade is permanent.' },
    capPh: { en: 'This pH is far from the enzyme\'s optimum: the active site changes shape and the rate drops.', af: 'Hierdie pH is ver van die ensiem se optimum: die aktiewe setel verander van vorm en die tempo daal.' },
  };
  const S = { T: 37, pH: 7, enz: 'amy', heat: false, t: 0 };
  const optPH = () => S.enz === 'amy' ? 7 : 2;
  const fT = (t) => t <= 37 ? Math.pow(2, (t - 37) / 10) : Math.exp(-Math.pow((t - 37) / 7, 2));
  const fP = (p) => Math.exp(-Math.pow((p - optPH()) / 1.6, 2));
  const phDen = () => Math.abs(S.pH - optPH()) > 4.5;
  const rate = (t, p) => (S.heat || phDen()) && t === S.T && p === S.pH ? 0 : fT(t) * fP(p);

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 420 : Math.max(330, Math.min(400, Math.round(w * 0.4))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.rate, unit: T.unit });
  const ro = MLX.readout(prim.el, [['s', T.state]]);
  const c1 = MLX.card(ui.side, T.conds);
  MLX.seg(c1, { label: T.enz, options: [['amy', T.amy], ['pep', T.pep]], value: S.enz, onChange: (v) => { S.enz = v; update(); } });
  const sT = MLX.slider(c1, { label: T.temp, min: 0, max: 70, step: 1, value: S.T, fmt: (v) => v + ' °C', onInput: (v) => { S.T = v; if (v > 50) S.heat = true; update(); } });
  const sP = MLX.slider(c1, { label: T.ph, min: 0, max: 14, step: 0.5, value: S.pH, fmt: (v) => num(v, 1), onInput: (v) => { S.pH = v; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.fresh, () => { S.heat = false; S.T = 37; sT.set(37); S.pH = optPH(); sP.set(S.pH); update(); }, 'primary');
  MLX.loop(ui.cv.el, (dt) => { if (!MLX.reducedMotion) { S.t += dt; ui.cv.draw(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 640) { const aw = Math.round(W * 0.42); scene(0, aw, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); graphs(aw + 6, W - aw - 6, 0, H); }
    else { scene(0, W, H * 0.45); graphs(0, W, H * 0.45, H * 0.55); }
  }
  // enzyme: a rounded body with a notch (active site); when denatured the notch is distorted
  function scene(x0, w, H) {
    const cx = x0 + w * 0.42, cy = H * 0.55, R = Math.min(w * 0.22, H * 0.3);
    const bad = S.heat || phDen();
    ctx.fillStyle = c.accentSoft; ctx.strokeStyle = c.accent; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - R, cy);
    ctx.quadraticCurveTo(cx - R, cy + R, cx, cy + R); ctx.quadraticCurveTo(cx + R, cy + R, cx + R, cy);
    if (bad) { ctx.lineTo(cx + R * 0.5, cy - R * 0.9); ctx.lineTo(cx + R * 0.15, cy - R * 0.45); ctx.lineTo(cx - R * 0.2, cy - R * 0.95); ctx.lineTo(cx - R * 0.55, cy - R * 0.5); }
    else { ctx.lineTo(cx + R * 0.35, cy - R * 0.85); ctx.lineTo(cx + R * 0.35, cy - R * 0.35); ctx.lineTo(cx - R * 0.35, cy - R * 0.35); ctx.lineTo(cx - R * 0.35, cy - R * 0.85); }
    ctx.closePath(); ctx.fill(); ctx.stroke();
    text(ctx, T.enzL, cx, cy + R * 0.45, { size: 12, align: 'center', color: c.text });
    text(ctx, T.site, cx - R - 8, cy - R * 0.55, { size: 11, align: 'right', color: c.text2 });
    // substrate: square block that fits the notch; it docks and splits into two products at a rate ∝ rate
    const r = rate(S.T, S.pH), cyc = r > 0.02 ? 3.5 / (0.3 + r) : 1e9, ph = (S.t % cyc) / cyc;
    const sw = R * 0.66, sh = R * 0.5, subCol = c.light ? '#b45309' : '#f59e0b';
    if (r > 0.02) {
      if (ph < 0.45) { const f = ph / 0.45; const y = cy - R * 0.6 - (1 - f) * R * 1.4; ctx.fillStyle = subCol; ctx.fillRect(cx - sw / 2, y - sh / 2, sw, sh); }
      else if (ph < 0.6) { ctx.fillStyle = subCol; ctx.fillRect(cx - sw / 2, cy - R * 0.6 - sh / 2, sw, sh); }
      else { const f = (ph - 0.6) / 0.4; ctx.fillStyle = subCol; ctx.fillRect(cx - sw / 2 - f * R, cy - R * 0.6 - sh / 2 - f * R, sw / 2 - 2, sh); ctx.fillRect(cx + 2 + f * R, cy - R * 0.6 - sh / 2 - f * R, sw / 2 - 2, sh); }
    } else { ctx.fillStyle = subCol; ctx.fillRect(cx - sw / 2 + R * 0.9, cy - R * 1.6, sw, sh); }
    text(ctx, T.sub, x0 + 12, 22, { size: 12, color: subCol });
  }
  function graphs(x0, w, y0, H) {
    const half = H / 2;
    const g = (yy, hh, xMin, xMax, title, f, cur) => {
      const ax = MLX.axes(ctx, { x0, y0: yy + 4, w, h: hh - 4, xMin, xMax, yMin: 0, yMax: 100, xTitle: title, yTitle: T.yR, xTicks: 7, yTicks: 2 });
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i <= 100; i++) { const x = xMin + (xMax - xMin) * i / 100, X = ax.X(x), Y = ax.Y(100 * f(x)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
      ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(cur), ax.Y(100 * rate(S.T, S.pH)), 5, 0, Math.PI * 2); ctx.fill();
    };
    g(y0, half, 0, 70, T.xT, (t) => fT(t) * fP(S.pH), S.T);
    g(y0 + half, half, 0, 14, T.xP, (p) => fT(S.T) * fP(p), S.pH);
  }
  function update() {
    const r = rate(S.T, S.pH);
    prim.set(num(100 * r, 0));
    ro.set('s', L(S.heat ? T.den : phDen() ? T.phden : T.ok));
    ui.setCaption(S.heat ? T.capDen : phDen() || fP(S.pH) < 0.4 ? T.capPh : S.T < 20 ? T.capCold : T.capOk);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + S.T + ' °C, pH ' + num(S.pH, 1) + ': ' + num(100 * r, 0) + '%.');
    ui.cv.draw();
  }
  update();
});
