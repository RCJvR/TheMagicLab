/* Gr10 Transport in plants — transpiration measured with a potometer (the CAPS practical).
 * Water lost from the leaves is replaced through the cut stem, so the air bubble in the capillary moves at the
 * rate of water uptake (≈ transpiration). The factors MULTIPLY: water vapour leaves only through open stomata
 * (light) and only if the air is drier than the leaf (humidity); warmth and wind steepen the gradient.
 *   rate = 30 mm/min × stomata(light) × (1 − humidity) × warmth(T) × wind
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'A leafy shoot in a potometer: an air bubble moves along a scaled capillary tube as the shoot takes up water', af: '\'n Blaarryke loot in \'n potometer: \'n lugborrel beweeg langs \'n gegradeerde kapillêre buis soos die loot water opneem' },
    rate: { en: 'Rate of water uptake', af: 'Tempo van wateropname' }, unit: { en: 'mm per minute', af: 'mm per minuut' },
    stom: { en: 'Stomata', af: 'Huidmondjies' }, open: { en: 'open', af: 'oop' }, closed: { en: 'closed', af: 'toe' }, part: { en: 'partly open', af: 'gedeeltelik oop' },
    conds: { en: 'Conditions', af: 'Toestande' }, light: { en: 'Light intensity', af: 'Ligintensiteit' }, temp: { en: 'Temperature', af: 'Temperatuur' },
    hum: { en: 'Humidity of the air', af: 'Humiditeit van die lug' }, wind: { en: 'Wind (fan speed)', af: 'Wind (waaierspoed)' },
    plot: { en: 'Plot the rate against', af: 'Stip die tempo teen' }, pL: { en: 'Light', af: 'Lig' }, pT: { en: 'Temperature', af: 'Temperatuur' }, pH: { en: 'Humidity', af: 'Humiditeit' }, pW: { en: 'Wind', af: 'Wind' },
    reset: { en: 'Reset bubble', af: 'Herstel borrel' }, y: { en: 'Rate (mm per minute)', af: 'Tempo (mm per minuut)' },
    shoot: { en: 'leafy shoot', af: 'blaarryke loot' }, cap: { en: 'capillary tube (mm)', af: 'kapillêre buis (mm)' }, res: { en: 'reservoir', af: 'reservoir' }, bubble: { en: 'air bubble', af: 'lugborrel' },
    capLow: { en: 'Little water leaves: in the dark the stomata close, and in humid air there is almost no concentration gradient.', af: 'Min water verlaat die blare: in die donker sluit die huidmondjies, en in vogtige lug is daar amper geen konsentrasiegradiënt nie.' },
    capHigh: { en: 'Fast transpiration: open stomata, dry moving air and warmth all steepen the water vapour gradient.', af: 'Vinnige transpirasie: oop huidmondjies, droë bewegende lug en warmte maak die waterdampgradiënt steiler.' },
    capMid: { en: 'Change one factor at a time and watch the bubble: that is a fair test.', af: 'Verander een faktor op \'n slag en kyk na die borrel: dit is \'n regverdige toets.' },
  };
  const S = { light: 60, temp: 25, hum: 50, wind: 30, plot: 'hum', pos: 0 };
  const parts = (o) => { const st = 0.08 + 0.92 * o.light / 100, gr = 1 - o.hum / 100, wa = 0.35 + 0.65 * Math.max(0, Math.min(1, (o.temp - 5) / 35)), wi = 0.6 + 0.4 * o.wind / 100; return { st, v: 30 * st * gr * wa * wi }; };
  const rate = (o) => parts(o || S).v;
  const XR = { light: [0, 100], temp: [5, 40], hum: [0, 100], wind: [0, 100] };
  const KEY = { light: 'light', temp: 'temp', hum: 'hum', wind: 'wind' };

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 420 : Math.max(340, Math.min(420, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.rate, unit: T.unit });
  const ro = MLX.readout(prim.el, [['s', T.stom]]);
  const c1 = MLX.card(ui.side, T.conds);
  MLX.slider(c1, { label: T.light, min: 0, max: 100, step: 5, value: S.light, fmt: (v) => v + '%', onInput: (v) => { S.light = v; update(); } });
  MLX.slider(c1, { label: T.temp, min: 5, max: 40, step: 1, value: S.temp, fmt: (v) => v + ' °C', onInput: (v) => { S.temp = v; update(); } });
  MLX.slider(c1, { label: T.hum, min: 0, max: 100, step: 5, value: S.hum, fmt: (v) => v + '%', onInput: (v) => { S.hum = v; update(); } });
  MLX.slider(c1, { label: T.wind, min: 0, max: 100, step: 10, value: S.wind, fmt: (v) => v + '%', onInput: (v) => { S.wind = v; update(); } });
  MLX.seg(c1, { label: T.plot, options: [['light', T.pL], ['temp', T.pT], ['hum', T.pH], ['wind', T.pW]], value: S.plot, onChange: (v) => { S.plot = v; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.reset, () => { S.pos = 0; ui.cv.draw(); });
  // the bubble moves at the true rate (mm per minute), shown 10× faster
  MLX.loop(ui.cv.el, (dt) => { if (!MLX.reducedMotion) { S.pos += rate() * dt / 6; if (S.pos > 100) S.pos = 0; ui.cv.draw(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 640) { const aw = Math.round(W * 0.5); app(0, aw, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); graph(aw + 6, W - aw - 6, 0, H); }
    else { app(0, W, H * 0.5); graph(0, W, H * 0.5, H * 0.5); }
  }
  function app(x0, w, H) {
    const k = Math.max(1, Math.min(1.6, H / 260)), sx = x0 + w * 0.2, ty = H * 0.62, capY = ty + 40 * k;
    // shoot: stem and leaves
    ctx.strokeStyle = c.light ? '#3f7a3a' : '#7bbf6a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, ty); ctx.lineTo(sx, ty - H * 0.36); ctx.stroke();
    const leafA = 0.35 + 0.5 * parts(S).st;
    for (let i = 0; i < 4; i++) { const y = ty - 26 * k - i * H * 0.1; [-1, 1].forEach(d => { ctx.fillStyle = c.light ? `rgba(63,122,58,${leafA})` : `rgba(123,191,106,${leafA})`; ctx.beginPath(); ctx.ellipse(sx + d * 24 * k, y - 6, 24 * k, 9 * k, d * -0.5, 0, Math.PI * 2); ctx.fill(); }); }
    text(ctx, T.shoot, sx + 34, ty - H * 0.36, { size: 12, color: c.text3 });
    // sealed tube and capillary with scale
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6;
    ctx.strokeRect(sx - 8, ty, 16, 40 * k);
    const cx0 = sx + 8, cx1 = x0 + w - 24;
    ctx.fillStyle = c.water; ctx.fillRect(sx - 7, ty + 1, 14, 40 * k - 2); ctx.fillRect(cx0, capY - 3, cx1 - cx0, 6);
    ctx.beginPath(); ctx.moveTo(cx0, capY - 4); ctx.lineTo(cx1, capY - 4); ctx.moveTo(cx0, capY + 4); ctx.lineTo(cx1, capY + 4); ctx.stroke();
    for (let mm = 0; mm <= 100; mm += 10) { const x = cx1 - mm / 100 * (cx1 - cx0 - 20); ctx.beginPath(); ctx.moveTo(x, capY + 5); ctx.lineTo(x, capY + (mm % 50 ? 9 : 13)); ctx.stroke(); if (mm % 50 === 0) text(ctx, String(mm), x, capY + 26, { size: 11, mono: true, align: 'center', color: c.text3 }); }
    text(ctx, T.cap, (cx0 + cx1) / 2, capY + 44, { size: 12, align: 'center', color: c.text3 });
    // the air bubble travels towards the shoot as water is taken up
    const bx = cx1 - S.pos / 100 * (cx1 - cx0 - 20);
    ctx.fillStyle = c.stage; ctx.fillRect(bx - 6, capY - 3, 12, 6); ctx.strokeStyle = c.ink; ctx.lineWidth = 1.2; ctx.strokeRect(bx - 6, capY - 3, 12, 6);
    text(ctx, T.bubble, bx, capY - 10, { size: 11, align: 'center', color: c.ink });
  }
  function graph(x0, w, y0, H) {
    const [lo, hi] = XR[S.plot];
    const ax = MLX.axes(ctx, { x0, y0: y0 + 6, w, h: H - 6, xMin: lo, xMax: hi, yMin: 0, yMax: 30, xTitle: S.plot === 'temp' ? { en: 'Temperature (°C)', af: 'Temperatuur (°C)' } : S.plot === 'hum' ? { en: 'Humidity (%)', af: 'Humiditeit (%)' } : S.plot === 'light' ? { en: 'Light intensity (%)', af: 'Ligintensiteit (%)' } : { en: 'Wind (%)', af: 'Wind (%)' }, yTitle: T.y, xTicks: 5, yTicks: 3 });
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 80; i++) { const x = lo + (hi - lo) * i / 80, o = Object.assign({}, S, { [KEY[S.plot]]: x }), X = ax.X(x), Y = ax.Y(rate(o)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(S[KEY[S.plot]]), ax.Y(rate()), 5, 0, Math.PI * 2); ctx.fill();
  }
  function update() {
    const p = parts(S);
    prim.set(num(p.v, 1));
    ro.set('s', L(p.st < 0.2 ? T.closed : p.st > 0.7 ? T.open : T.part));
    ui.setCaption(p.v < 4 ? T.capLow : p.v > 16 ? T.capHigh : T.capMid);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + num(p.v, 1) + ' mm/min.');
    ui.cv.draw();
  }
  update();
});
