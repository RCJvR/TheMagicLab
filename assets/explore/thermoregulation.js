/* Gr12 Homeostasis — thermoregulation by negative feedback.
 * The learner changes the surroundings (air temperature, exercise); the body's core temperature drifts away from
 * the 37 °C set point, thermoreceptors and the hypothalamus detect the change, and the effectors bring it back:
 *   too hot → sweating (evaporation) and vasodilation (more blood to the skin);
 *   too cold → shivering (heat from muscle contraction), vasoconstriction, hairs raised.
 * Heat balance: dT/dt = [metabolism + exercise + k(T_air − T) − correction] / C, where the correction grows with the
 * difference from 37 °C (negative feedback), so the core temperature settles close to 37 °C.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'The negative feedback loop for body temperature, a section of skin, and a graph of core temperature', af: 'Die negatiewe terugvoerlus vir liggaamstemperatuur, \'n deursnee van vel, en \'n grafiek van kerntemperatuur' },
    core: { en: 'Core body temperature', af: 'Kernliggaamstemperatuur' }, resp: { en: 'Body\'s response', af: 'Liggaam se reaksie' },
    env: { en: 'Surroundings', af: 'Omgewing' }, air: { en: 'Air temperature', af: 'Lugtemperatuur' }, ex: { en: 'Exercising', af: 'Oefen' },
    none: { en: 'none needed', af: 'geen nodig nie' }, cool: { en: 'sweating + vasodilation', af: 'sweet + vasodilatasie' }, warm: { en: 'shivering + vasoconstriction', af: 'bewe + vasokonstriksie' },
    stim: { en: 'Change in temperature', af: 'Verandering in temperatuur' }, rec: { en: 'Thermoreceptors (skin, hypothalamus)', af: 'Termoreseptore (vel, hipotalamus)' },
    cc: { en: 'Hypothalamus (control centre)', af: 'Hipotalamus (beheersentrum)' }, eff: { en: 'Effectors: sweat glands, skin arterioles, muscles', af: 'Effektore: sweetkliere, velarteriole, spiere' },
    back: { en: 'Temperature returns to 37 °C', af: 'Temperatuur keer terug na 37 °C' },
    skin: { en: 'skin', af: 'vel' }, sweat: { en: 'sweat', af: 'sweet' }, vessel: { en: 'arteriole', af: 'arteriool' }, hair: { en: 'hair', af: 'haar' },
    xT: { en: 'Time (minutes)', af: 'Tyd (minute)' }, yT: { en: 'Core temperature (°C)', af: 'Kerntemperatuur (°C)' },
    capOk: { en: 'At the set point: no correction is needed.', af: 'By die stelpunt: geen regstelling is nodig nie.' },
    capHot: { en: 'Too warm: the hypothalamus switches on sweating and vasodilation, so more heat is lost and the temperature is kept close to 37 °C.', af: 'Te warm: die hipotalamus skakel sweet en vasodilatasie aan, dus gaan meer hitte verlore en die temperatuur bly naby 37 °C.' },
    capCold: { en: 'Too cold: shivering makes heat and vasoconstriction keeps warm blood away from the skin, so the temperature is kept close to 37 °C.', af: 'Te koud: bewe maak hitte en vasokonstriksie hou warm bloed weg van die vel, dus bly die temperatuur naby 37 °C.' },
  };
  const S = { air: 22, ex: false, T: 37, hist: [], t: 0 };
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 460 : Math.max(340, Math.min(420, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.core, unit: '°C' });
  const ro = MLX.readout(prim.el, [['r', T.resp]]);
  const c1 = MLX.card(ui.side, T.env);
  MLX.slider(c1, { label: T.air, min: -5, max: 45, step: 1, value: S.air, fmt: (v) => v + ' °C', onInput: (v) => { S.air = v; } });
  MLX.check(c1, { label: T.ex, value: S.ex, onChange: (v) => { S.ex = v; } });
  const err = () => S.T - 37;
  MLX.loop(ui.cv.el, (dt) => {
    const step = dt * 3;                         // 1 s on screen ≈ 3 minutes
    const e = err(), corr = 0.9 * e + 4 * e * Math.abs(e);   // effectors respond more strongly the larger the error
    const gain = (S.ex ? 0.9 : 0) + 0.035 * (S.air - 30);
    S.T += step * 0.25 * (gain - corr);
    S.t += step; S.hist.push([S.t, S.T]); while (S.hist.length && S.hist[0][0] < S.t - 60) S.hist.shift();
    update();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 640) { const lw = Math.round(W * 0.56); loopDiag(0, lw, H * 0.56); skin(0, lw, H * 0.56, H * 0.44); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(lw + 0.5, 14); ctx.lineTo(lw + 0.5, H - 14); ctx.stroke(); graph(lw + 6, W - lw - 6, 0, H); }
    else { loopDiag(0, W, H * 0.4); skin(0, W, H * 0.4, H * 0.25); graph(0, W, H * 0.65, H * 0.35); }
  }
  // stimulus → receptor → control centre → effector → response, with the active arrows in the accent colour
  function loopDiag(x0, w, H) {
    const active = Math.abs(err()) > 0.15;
    const boxes = [T.stim, T.rec, T.cc, T.eff, T.back];
    const bw = Math.min(150, (w - 40) / 2), bh = 34;
    const pos = [[x0 + 16, 14], [x0 + w - bw - 16, 14], [x0 + w - bw - 16, H / 2 - bh / 2], [x0 + w - bw - 16, H - bh - 10], [x0 + 16, H - bh - 10]];
    ctx.font = '12px "Cabinet Grotesk", sans-serif';
    pos.forEach(([x, y], i) => {
      ctx.strokeStyle = active ? c.accent : c.lineHard; ctx.lineWidth = 1.4; MLX.roundRect(ctx, x, y, bw, bh, 8); ctx.stroke();
      MLX.wrap(ctx, L(boxes[i]), bw - 12).slice(0, 2).forEach((ln, j, arr) => text(ctx, ln, x + bw / 2, y + bh / 2 + 4 + (j - (arr.length - 1) / 2) * 13, { size: 11, align: 'center', color: c.text }));
    });
    const arrow = (x1, y1, x2, y2) => { ctx.strokeStyle = active ? c.accent : c.lineHard; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const a = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 7 * Math.cos(a - 0.4), y2 - 7 * Math.sin(a - 0.4)); ctx.lineTo(x2 - 7 * Math.cos(a + 0.4), y2 - 7 * Math.sin(a + 0.4)); ctx.closePath(); ctx.fillStyle = ctx.strokeStyle; ctx.fill(); };
    arrow(pos[0][0] + bw, 14 + bh / 2, pos[1][0] - 4, 14 + bh / 2);
    arrow(pos[1][0] + bw / 2, 14 + bh, pos[2][0] + bw / 2, pos[2][1] - 3);
    arrow(pos[2][0] + bw / 2, pos[2][1] + bh, pos[3][0] + bw / 2, pos[3][1] - 3);
    arrow(pos[3][0], pos[3][1] + bh / 2, pos[4][0] + bw + 4, pos[4][1] + bh / 2);
    arrow(pos[4][0] + bw / 2, pos[4][1], pos[0][0] + bw / 2, 14 + bh + 3);
    text(ctx, { en: 'negative feedback', af: 'negatiewe terugvoer' }, pos[4][0] + bw / 2 + 8, H / 2 + 4, { size: 11, color: c.text3 });
  }
  // skin section: arteriole width (vasodilation/constriction), sweat droplets, raised hair
  function skin(x0, w, y0, H) {
    const e = err(), top = y0 + 18, sx0 = x0 + 16, sx1 = x0 + w - 16;
    ctx.fillStyle = c.light ? 'rgba(214,160,130,0.25)' : 'rgba(214,160,130,0.18)'; ctx.fillRect(sx0, top, sx1 - sx0, H - 30);
    ctx.strokeStyle = c.lineHard; ctx.beginPath(); ctx.moveTo(sx0, top); ctx.lineTo(sx1, top); ctx.stroke();
    text(ctx, T.skin, sx0, top - 4, { size: 11, color: c.text3 });
    const vw = Math.max(2, Math.min(12, 6 + e * 6));
    ctx.strokeStyle = '#ef5b5b'; ctx.lineWidth = vw; ctx.beginPath(); ctx.moveTo(sx0 + 10, top + 22); ctx.bezierCurveTo(sx0 + w * 0.3, top + 8, sx0 + w * 0.6, top + 30, sx1 - 10, top + 16); ctx.stroke();
    text(ctx, T.vessel, sx1 - 10, top + 40, { size: 11, align: 'right', color: c.text3 });
    if (e > 0.1) { ctx.fillStyle = c.light ? '#2563eb' : '#93c5fd'; for (let i = 0; i < Math.min(8, Math.round(e * 10)); i++) { const x = sx0 + 30 + i * (sx1 - sx0 - 60) / 7; ctx.beginPath(); ctx.arc(x, top - 4, 3, 0, Math.PI * 2); ctx.fill(); } text(ctx, T.sweat, sx0 + 30, top - 12, { size: 11, color: c.light ? '#2563eb' : '#93c5fd' }); }
    const up = e < -0.1 ? 1 : 0;
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.2;
    [0.15, 0.45, 0.75].forEach(u => { const x = sx0 + u * (sx1 - sx0); ctx.beginPath(); ctx.moveTo(x, top + 12); ctx.lineTo(x + (up ? 2 : 14), top - (up ? 16 : 6)); ctx.stroke(); });
  }
  function graph(x0, w, y0, H) {
    const t1 = Math.max(60, S.t), t0 = t1 - 60;
    const ax = MLX.axes(ctx, { x0, y0: y0 + 6, w, h: H - 6, xMin: 0, xMax: 60, yMin: 35, yMax: 39, xTitle: T.xT, yTitle: T.yT, xTicks: 6, yTicks: 4, fmtX: (v) => num(v + t0, 0), fmtY: (v) => num(v, 1) });
    ctx.strokeStyle = c.text3; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(37)); ctx.lineTo(ax.box.x1, ax.Y(37)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, { en: 'set point 37 °C', af: 'stelpunt 37 °C' }, ax.box.x1 - 4, ax.Y(37) - 6, { size: 11, align: 'right', color: c.text2 });
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2.2; ctx.beginPath();
    S.hist.forEach(([t, v], i) => { const X = ax.X(t - t0), Y = ax.Y(Math.max(35, Math.min(39, v))); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
  }
  function update() {
    const e = err();
    prim.set(num(S.T, 2));
    ro.set('r', L(e > 0.15 ? T.cool : e < -0.15 ? T.warm : T.none));
    ui.setCaption(e > 0.15 ? T.capHot : e < -0.15 ? T.capCold : T.capOk);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + num(S.T, 2) + ' °C.');
    ui.cv.draw();
  }
  update();
});
