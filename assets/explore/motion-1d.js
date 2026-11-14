/* Gr10 Motion in one dimension — position, velocity and acceleration with x–t, v–t and a–t graphs.
 * Uniform acceleration (CAPS symbols): v_f = v_i + a·Δt,  Δx = v_i·Δt + ½·a·Δt².
 * The learner chooses v_i and a (or a preset), plays the motion, and sees all three graphs drawn with
 * numbered axes, the current point on each, and the equations worked with the current numbers.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'An object moving along a straight line, with its position–time, velocity–time and acceleration–time graphs', af: '\'n Voorwerp wat langs \'n reguit lyn beweeg, met sy posisie-tyd-, snelheid-tyd- en versnelling-tyd-grafieke' },
    pos: { en: 'Position x', af: 'Posisie x' }, vel: { en: 'Velocity v', af: 'Snelheid v' }, time: { en: 'Time t', af: 'Tyd t' },
    acc: { en: 'Acceleration a', af: 'Versnelling a' }, disp: { en: 'Displacement Δx', af: 'Verplasing Δx' },
    set: { en: 'Motion', af: 'Beweging' }, vi: { en: 'Initial velocity vᵢ', af: 'Beginsnelheid vᵢ' },
    presets: { en: 'Try', af: 'Probeer' }, pConst: { en: 'Constant velocity', af: 'Konstante snelheid' },
    pSpeed: { en: 'Speeding up', af: 'Versnel' }, pBrake: { en: 'Braking to rest', af: 'Rem tot stilstand' },
    pFall: { en: 'Free fall', af: 'Vrye val' }, pUp: { en: 'Thrown up', af: 'Opgegooi' },
    play: { en: 'Play', af: 'Speel' }, pause: { en: 'Pause', af: 'Pouseer' }, reset: { en: 'Reset', af: 'Herstel' },
    eq: { en: 'The equations, now', af: 'Die vergelykings, nou' },
    view: { en: 'Show', af: 'Wys' }, vMotion: { en: 'Motion', af: 'Beweging' }, vGraphs: { en: 'Graphs', af: 'Grafieke' },
    posRight: { en: 'positive direction: to the right', af: 'positiewe rigting: na regs' }, posUp: { en: 'positive direction: upwards', af: 'positiewe rigting: opwaarts' },
    xt: { en: 'x (m)', af: 'x (m)' }, vt: { en: 'v (m·s⁻¹)', af: 'v (m·s⁻¹)' }, at: { en: 'a (m·s⁻²)', af: 'a (m·s⁻²)' }, ts: { en: 't (s)', af: 't (s)' },
    still: { en: 'At rest for an instant: v = 0, but a is not zero, so the object turns back.', af: 'Vir \'n oomblik in rus: v = 0, maar a is nie nul nie, dus draai die voorwerp om.' },
    capConst: { en: 'Constant velocity: the x–t graph is a straight line and a = 0.', af: 'Konstante snelheid: die x-t-grafiek is \'n reguit lyn en a = 0.' },
    capSame: { en: 'v and a in the same direction: the object speeds up; the x–t graph curves more steeply.', af: 'v en a in dieselfde rigting: die voorwerp versnel; die x-t-grafiek word steiler.' },
    capOpp: { en: 'v and a in opposite directions: the object slows down; the gradient of the x–t graph shrinks.', af: 'v en a in teenoorgestelde rigtings: die voorwerp vertraag; die gradiënt van die x-t-grafiek word kleiner.' },
    capRest: { en: 'At rest: v = 0 and a = 0.', af: 'In rus: v = 0 en a = 0.' },
    predict: { en: 'In free fall (a = −9.8 m·s⁻², up positive), what will the velocity be after 2 s?', af: 'Wat sal die snelheid ná 2 s in vrye val wees (a = −9,8 m·s⁻², op positief)?' },
    test: { en: 'Choose Free fall, press Play and pause near t = 2 s, then read v.', af: 'Kies Vrye val, druk Speel en pouseer naby t = 2 s, en lees dan v af.' },
  };
  const TMAX = 6;
  const S = { vi: 10, a: -5, t: 0, playing: false, vertical: false, view: 'motion' };
  const x = (t) => S.vi * t + 0.5 * S.a * t * t, v = (t) => S.vi + S.a * t;
  const fmtS = (val, d) => (val > 0 ? '+' : '') + num(val, d);

  const panel = root.closest('.tab-panel') || root.parentNode;
  const pred = MLX.predict(panel, { predict: T.predict, test: T.test });
  root.parentNode.insertBefore(pred, root);
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 320 : Math.max(380, Math.min(460, Math.round(w * 0.48))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky');
  ui.cv.el.classList.add('mlx-themed');
  const tabs = MLX.h('div', { class: 'mlx-tabs' });
  ui.stage.insertBefore(tabs, ui.stage.firstChild);
  MLX.seg(tabs, { options: [['motion', T.vMotion], ['graphs', T.vGraphs]], value: S.view, onChange: (val) => { S.view = val; ui.cv.draw(); } });

  const prim = MLX.primary(ui.side, { label: T.pos, unit: 'm' });
  const ro = MLX.readout(prim.el, [['v', T.vel], ['a', T.acc], ['t', T.time], ['d', T.disp]]);
  const c1 = MLX.card(ui.side, T.set);
  const sV = MLX.slider(c1, { label: T.vi, min: -20, max: 20, step: 1, value: S.vi, fmt: (val) => fmtS(val, 0) + ' m·s⁻¹', onInput: (val) => { S.vi = val; restart(); } });
  const sA = MLX.slider(c1, { label: T.acc, min: -10, max: 10, step: 0.1, value: S.a, fmt: (val) => fmtS(val, 1) + ' m·s⁻²', onInput: (val) => { S.a = val; restart(); } });
  const segP = MLX.seg(c1, { label: T.presets, options: [['const', T.pConst], ['speed', T.pSpeed], ['brake', T.pBrake], ['fall', T.pFall], ['up', T.pUp]], value: null, onChange: (k) => {
    const P = { const: [8, 0, false], speed: [2, 3, false], brake: [18, -6, false], fall: [0, -9.8, true], up: [15, -9.8, true] }[k];
    S.vi = P[0]; S.a = P[1]; S.vertical = P[2]; sV.set(S.vi); sA.set(S.a); restart(); play(true);
  } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  const bPlay = MLX.button(bt, T.play, () => play(!S.playing), 'primary');
  MLX.button(bt, T.reset, () => { restart(); });
  const c2 = MLX.card(ui.side, T.eq);
  const eqEl = MLX.h('div', { class: 'mlx-note', style: 'font-family:var(--fm,"JetBrains Mono",monospace);line-height:1.9' }); c2.appendChild(eqEl);

  function play(on) { S.playing = on && S.t < TMAX; bPlay.textContent = L(S.playing ? T.pause : T.play); }
  function restart() { S.t = 0; play(false); segP.set(null); update(); }
  sV.input.addEventListener('input', () => { S.vertical = false; });
  sA.input.addEventListener('input', () => { S.vertical = false; });

  // ranges over the whole run, so the graphs keep a fixed scale while the motion plays
  function ranges() {
    let xl = 0, xh = 0, vl = 0, vh = 0;
    for (let i = 0; i <= 60; i++) { const t = TMAX * i / 60; xl = Math.min(xl, x(t)); xh = Math.max(xh, x(t)); vl = Math.min(vl, v(t)); vh = Math.max(vh, v(t)); }
    const pad = (lo, hi) => { const sp = Math.max(1, hi - lo); return [lo - sp * 0.08, hi + sp * 0.08]; };
    return { x: pad(xl, xh), v: pad(vl, vh), a: pad(Math.min(0, S.a, -1), Math.max(0, S.a, 1)) };
  }

  const loop = MLX.loop(ui.cv.el, (dt) => {
    if (S.playing) { S.t = Math.min(TMAX, S.t + dt); if (S.t >= TMAX) play(false); update(); }
  });
  loop.start();
  MLX.onTheme(() => ui.cv.draw());

  function draw(ctx, W, H) {
    const c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const R = ranges();
    if (W >= 640) {
      const mw = Math.round(W * 0.34);
      drawMotion(ctx, 0, mw, H, c, R);
      ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(mw + 0.5, 14); ctx.lineTo(mw + 0.5, H - 14); ctx.stroke();
      drawGraphs(ctx, mw + 6, W - mw - 6, H, c, R);
    } else if (S.view === 'motion') drawMotion(ctx, 0, W, H, c, R);
    else drawGraphs(ctx, 0, W, H, c, R);
  }

  function drawMotion(ctx, x0, w, H, c, R) {
    const [lo, hi] = R.x, tk = MLX.ticks(lo, hi, 5);
    const pos = x(S.t), vel = v(S.t);
    if (S.vertical) {
      // vertical line, up positive; the ball moves along it
      const cx = x0 + w * 0.5, top = 30, bot = H - 40;
      const Y = (val) => bot - (val - lo) / (hi - lo) * (bot - top);
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx, top); ctx.lineTo(cx, bot); ctx.stroke();
      tk.values.forEach(val => { ctx.beginPath(); ctx.moveTo(cx - 5, Y(val)); ctx.lineTo(cx + 5, Y(val)); ctx.stroke(); text(ctx, num(val, 0) + ' m', cx - 10, Y(val) + 4, { size: 12, mono: true, align: 'right', color: c.text3 }); });
      ctx.fillStyle = c.accent; ctx.beginPath(); ctx.arc(cx, Y(pos), 10, 0, Math.PI * 2); ctx.fill();
      arrow(ctx, cx + 22, Y(pos), 0, -vel * 3, c.ink, 'v');
      text(ctx, T.posUp, x0 + 12, H - 14, { size: 12, color: c.text3 });
    } else {
      const y = H * 0.55, left = x0 + 24, right = x0 + w - 24;
      const X = (val) => left + (val - lo) / (hi - lo) * (right - left);
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(left, y + 14); ctx.lineTo(right, y + 14); ctx.stroke();
      tk.values.forEach(val => { ctx.beginPath(); ctx.moveTo(X(val), y + 10); ctx.lineTo(X(val), y + 18); ctx.stroke(); text(ctx, num(val, 0), X(val), y + 34, { size: 12, mono: true, align: 'center', color: c.text3 }); });
      text(ctx, 'x (m)', right, y + 50, { size: 12, align: 'right', color: c.text3 });
      // trolley
      const bx = X(pos);
      ctx.fillStyle = c.accent; MLX.roundRect(ctx, bx - 16, y - 8, 32, 18, 4); ctx.fill();
      ctx.fillStyle = c.ink; [-9, 9].forEach(o => { ctx.beginPath(); ctx.arc(bx + o, y + 12, 3.2, 0, Math.PI * 2); ctx.fill(); });
      arrow(ctx, bx, y - 24, vel * 3, 0, c.ink, 'v');
      text(ctx, T.posRight, x0 + 12, H - 14, { size: 12, color: c.text3 });
    }
  }
  // velocity arrow (length ∝ v), labelled
  function arrow(ctx, x0, y0, dx, dy, col, lab) {
    const len = Math.hypot(dx, dy);
    if (len < 2) return;
    const ux = dx / len, uy = dy / len, x1 = x0 + dx, y1 = y0 + dy;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * 8 - uy * 5, y1 - uy * 8 + ux * 5); ctx.lineTo(x1 - ux * 8 + uy * 5, y1 - uy * 8 - ux * 5); ctx.closePath(); ctx.fill();
    text(ctx, lab, x1 + ux * 8 + (uy ? 8 : 0), y1 + uy * 8 + (ux ? -6 : 4), { size: 12, color: col, align: 'center' });
  }

  function drawGraphs(ctx, x0, w, H, c, R) {
    const rows = [['x', T.xt, x, R.x], ['v', T.vt, v, R.v], ['a', T.at, () => S.a, R.a]];
    const ph = H / 3;
    rows.forEach(([k, lab, f, rg], i) => {
      const ax = MLX.axes(ctx, { x0, y0: i * ph + 4, w, h: ph - 4, xMin: 0, xMax: TMAX, yMin: rg[0], yMax: rg[1], xTitle: i === 2 ? T.ts : '', yTitle: lab, xTicks: 6, yTicks: 3,
        fmtY: (val) => num(val, Math.abs(rg[1] - rg[0]) < 6 ? 1 : 0) });
      // zero line
      if (rg[0] < 0 && rg[1] > 0) { ctx.strokeStyle = c.lineHard; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(0)); ctx.lineTo(ax.box.x1, ax.Y(0)); ctx.stroke(); ctx.setLineDash([]); }
      // whole run faintly, the part already travelled in the accent colour
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2; ctx.beginPath();
      for (let j = 0; j <= 80; j++) { const t = TMAX * j / 80; j ? ctx.lineTo(ax.X(t), ax.Y(f(t))) : ctx.moveTo(ax.X(t), ax.Y(f(t))); } ctx.stroke();
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2.2; ctx.beginPath();
      const n = Math.max(1, Math.round(80 * S.t / TMAX));
      for (let j = 0; j <= n; j++) { const t = S.t * j / n; j ? ctx.lineTo(ax.X(t), ax.Y(f(t))) : ctx.moveTo(ax.X(t), ax.Y(f(t))); } ctx.stroke();
      ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(S.t), ax.Y(f(S.t)), 4, 0, Math.PI * 2); ctx.fill();
    });
  }

  function update() {
    const pos = x(S.t), vel = v(S.t);
    prim.set(num(pos, 2));
    ro.set('v', fmtS(vel, 2) + ' m·s⁻¹'); ro.set('a', fmtS(S.a, 1) + ' m·s⁻²'); ro.set('t', num(S.t, 2) + ' s'); ro.set('d', fmtS(pos, 2) + ' m');
    eqEl.innerHTML = '';
    eqEl.appendChild(MLX.h('div', { html: 'v<sub>f</sub> = v<sub>i</sub> + aΔt = ' + num(S.vi, 0) + ' + (' + num(S.a, 1) + ')(' + num(S.t, 2) + ') = ' + num(vel, 2) + ' m·s⁻¹' }));
    eqEl.appendChild(MLX.h('div', { html: 'Δx = v<sub>i</sub>Δt + ½aΔt² = ' + num(pos, 2) + ' m' }));
    let cap;
    if (Math.abs(S.a) < 1e-9) cap = Math.abs(S.vi) < 1e-9 ? T.capRest : T.capConst;
    else if (Math.abs(vel) < 0.15) cap = T.still;
    else cap = vel * S.a > 0 ? T.capSame : T.capOpp;
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. t = ' + num(S.t, 1) + ' s, x = ' + num(pos, 1) + ' m, v = ' + num(vel, 1) + ' m/s, a = ' + num(S.a, 1) + ' m/s².');
    ui.cv.draw();
  }
  update();
});
