/* Gr10 Energy — gravitational potential energy, kinetic energy and the conservation of mechanical energy.
 *   Ep = mgh,  Ek = ½mv²,  ME = Ep + Ek,  g = 9.8 m·s⁻²  (reference level h = 0 at the ground / lowest point)
 * Curved track: a ball is released from rest at height h on a smooth U-shaped track (h = 10·(x/7)² m). With no
 * friction ME stays constant, so it rises to exactly its release height on the other side. With friction on
 * (μ = 0.04) the work done by friction converts mechanical energy into heat: ME falls and each turn is lower.
 * Free fall: the ball is dropped from rest; just before impact Ek = mgh, so v = √(2gh), whatever the mass.
 * The motion is integrated along the track; the energies shown are exact (Ek = ME₀ − heat − Ep).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const G = 9.8, K = 10 / 49, XE = 7, MU = 0.04, SLOW = 0.5;
  const T = {
    aria: { en: 'A ball moving on a curved track or falling freely, with bars for its potential, kinetic and mechanical energy', af: '\'n Bal wat op \'n geboë baan beweeg of vry val, met stawe vir sy potensiële, kinetiese en meganiese energie' },
    me: { en: 'Mechanical energy ME = Ep + Ek', af: 'Meganiese energie ME = Ep + Ek' },
    ep: { en: 'Potential energy Ep', af: 'Potensiële energie Ep' }, ek: { en: 'Kinetic energy Ek', af: 'Kinetiese energie Ek' },
    h: { en: 'Height h', af: 'Hoogte h' }, v: { en: 'Speed v', af: 'Spoed v' }, heat: { en: 'Converted to heat', af: 'Omgeskakel na hitte' },
    setup: { en: 'Set-up', af: 'Opstelling' }, scene: { en: 'Situation', af: 'Situasie' }, track: { en: 'Curved track', af: 'Geboë baan' }, fall: { en: 'Free fall', af: 'Vrye val' },
    mass: { en: 'Mass m', af: 'Massa m' }, rel: { en: 'Release height', af: 'Loslaathoogte' }, fric: { en: 'Friction on the track', af: 'Wrywing op die baan' },
    play: { en: 'Release', af: 'Laat los' }, pause: { en: 'Pause', af: 'Pouseer' }, cont: { en: 'Continue', af: 'Gaan voort' }, reset: { en: 'Reset', af: 'Herstel' },
    eq: { en: 'The equations, now', af: 'Die vergelykings, nou' },
    yJ: { en: 'Energy (J)', af: 'Energie (J)' }, hm: { en: 'h (m)', af: 'h (m)' },
    ref: { en: 'h = 0 (reference level)', af: 'h = 0 (verwysingsvlak)' }, relLine: { en: 'release height', af: 'loslaathoogte' },
    smooth: { en: 'smooth track: no friction', af: 'gladde baan: geen wrywing nie' }, rough: { en: 'rough track: friction acts', af: 'growwe baan: wrywing werk in' },
    noAir: { en: 'no air resistance', af: 'geen lugweerstand nie' }, rest: { en: 'released from rest', af: 'uit rus losgelaat' },
    capStart: { en: 'At rest at the release height: all the mechanical energy is gravitational potential energy (Ek = 0).', af: 'In rus op die loslaathoogte: al die meganiese energie is gravitasie-potensiële energie (Ek = 0).' },
    capDown: { en: 'Going down: Ep is converted into Ek, so the ball speeds up, while ME stays the same.', af: 'Op pad af: Ep word in Ek omgeskakel, dus versnel die bal, terwyl ME dieselfde bly.' },
    capUp: { en: 'Going up: Ek is converted back into Ep, so the ball slows down, while ME stays the same.', af: 'Op pad op: Ek word terug in Ep omgeskakel, dus vertraag die bal, terwyl ME dieselfde bly.' },
    capBottom: { en: 'At the lowest point h = 0: Ep = 0, so all the mechanical energy is kinetic and the speed is greatest.', af: 'By die laagste punt h = 0: Ep = 0, dus is al die meganiese energie kineties en is die spoed die grootste.' },
    capTurn: { en: 'Momentarily at rest at its release height: with no friction mechanical energy is conserved, so it can never rise higher.', af: 'Vir \'n oomblik in rus op sy loslaathoogte: sonder wrywing bly meganiese energie behoue, dus kan dit nooit hoër styg nie.' },
    capFric: { en: 'Friction does negative work on the ball: it converts mechanical energy into heat, so ME keeps falling.', af: 'Wrywing doen negatiewe arbeid op die bal: dit skakel meganiese energie in hitte om, dus daal ME aanhoudend.' },
    capFricTurn: { en: 'It turns back lower than it started: the missing mechanical energy has been converted into heat by friction.', af: 'Dit draai laer om as waar dit begin het: die ontbrekende meganiese energie is deur wrywing in hitte omgeskakel.' },
    capStop: { en: 'At rest at the bottom: friction has converted all of the starting mechanical energy into heat.', af: 'In rus onder: wrywing het al die aanvanklike meganiese energie in hitte omgeskakel.' },
    capFall: { en: 'Falling: Ep decreases and Ek increases by exactly the same amount, so ME stays the same.', af: 'Val: Ep neem af en Ek neem met presies dieselfde hoeveelheid toe, dus bly ME dieselfde.' },
    capGround: { en: 'Just before impact: all the Ep has become Ek, so v = √(2gh). The mass cancels, so every mass lands at the same speed.', af: 'Net voor die impak: al die Ep het Ek geword, dus v = √(2gh). Die massa kanselleer, dus land elke massa teen dieselfde spoed.' },
  };
  const S = { mode: 'track', m: 2, h0: 5, fric: false, x: 0, v: 0, y: 0, t: 0, heat: 0, playing: false, started: false, done: false, trail: [] };
  const f = (x) => K * x * x, fp = (x) => 2 * K * x;
  const E0 = () => S.m * G * S.h0;
  const hNow = () => S.mode === 'track' ? f(S.x) : S.y;
  function energies() {
    const ep = S.m * G * hNow();
    const ek = Math.max(0, E0() - S.heat - ep);
    return { ep, ek, me: ep + ek, v: Math.sqrt(2 * ek / S.m) };
  }

  const ui = MLX.layout(root, { height: (w) => w < 600 ? 560 : Math.max(360, Math.min(430, Math.round(w * 0.6))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.me, unit: 'J' });
  const ro = MLX.readout(prim.el, [['ep', T.ep], ['ek', T.ek], ['h', T.h], ['v', T.v], ['q', T.heat]]);
  const c1 = MLX.card(ui.side, T.setup);
  MLX.seg(c1, { label: T.scene, options: [['track', T.track], ['fall', T.fall]], value: S.mode, onChange: (v) => { S.mode = v; chk.el.style.display = v === 'track' ? '' : 'none'; reset(); } });
  MLX.slider(c1, { label: T.mass, min: 0.5, max: 10, step: 0.5, value: S.m, fmt: (v) => num(v, 1) + ' kg', onInput: (v) => { S.m = v; reset(); } });
  MLX.slider(c1, { label: T.rel, min: 1, max: 10, step: 0.5, value: S.h0, fmt: (v) => num(v, 1) + ' m', onInput: (v) => { S.h0 = v; reset(); } });
  const chk = MLX.check(c1, { label: T.fric, value: S.fric, onChange: (v) => { S.fric = v; reset(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  const bPlay = MLX.button(bt, T.play, () => play(!S.playing), 'primary');
  MLX.button(bt, T.reset, () => reset());
  const c2 = MLX.card(ui.side, T.eq);
  const eqEl = MLX.h('div', { class: 'mlx-note', style: 'font-family:var(--fm,"JetBrains Mono",monospace);line-height:1.7;font-size:12.5px;white-space:pre-wrap' }); c2.appendChild(eqEl);

  function reset() {
    S.playing = false; S.started = false; S.done = false; S.t = 0; S.heat = 0; S.v = 0; S.trail = [];
    S.x = -Math.sqrt(S.h0 / K); S.y = S.h0; S.dir = 1; S.prevH = S.h0;
    bPlay.textContent = L(T.play); update();
  }
  function play(on) {
    if (on && S.done) reset();
    S.playing = on; if (on) S.started = true;
    bPlay.textContent = L(on ? T.pause : S.started ? T.cont : T.play);
    if (on && MLX.reducedMotion) { jump(); S.playing = false; bPlay.textContent = L(T.cont); update(); }
  }
  // Reduced motion: go straight to the telling moment (lowest point, rest, or just before impact)
  function jump() {
    if (S.mode === 'fall') { S.t = Math.sqrt(2 * S.h0 / G); S.y = 0; S.v = -G * S.t; S.done = true; return; }
    for (let i = 0; i < 40000; i++) { const x0 = S.x; step(0.005); if (S.done) return; if (!S.fric && x0 < 0 && S.x >= 0) { S.x = 0; return; } }
  }

  // one physics step
  function step(dt) {
    if (S.mode === 'fall') {
      S.t += dt; S.v = -G * S.t; S.y = S.h0 - 0.5 * G * S.t * S.t;
      if (S.y <= 0) { S.y = 0; S.t = Math.sqrt(2 * S.h0 / G); S.v = -G * S.t; S.done = true; }
      return;
    }
    const n = 10, h = dt / n;
    for (let i = 0; i < n; i++) {
      const th = Math.atan(fp(S.x)), sn = Math.sin(th), cs = Math.cos(th);
      const fr = S.fric ? MU * G * cs : 0;
      let a = -G * sn - (S.v > 0 ? fr : S.v < 0 ? -fr : 0);
      if (S.fric && Math.abs(S.v) < 0.02 && Math.abs(Math.tan(th)) <= MU) { S.v = 0; S.done = true; break; }
      S.v += a * h;
      S.x += S.v * cs * h;
      if (S.fric) S.heat = Math.min(E0(), S.heat + S.m * fr * Math.abs(S.v) * h);
      // keep the speed exactly consistent with the energy left (removes integration drift)
      const ek = E0() - S.heat - S.m * G * f(S.x);
      const sp = Math.sqrt(Math.max(0, 2 * ek / S.m));
      if (sp > 1e-6 || ek <= 0) S.v = Math.sign(S.v || 1) * sp;
      if (ek <= 0 && S.v !== 0) { S.v = -Math.sign(S.x) * 1e-4; }
    }
    S.t += dt;
  }

  MLX.loop(ui.cv.el, (dt) => {
    if (!S.playing) return;
    S.prevH = hNow();
    step(dt * SLOW);
    if (S.mode === 'fall' && (!S.trail.length || S.t - S.trail[S.trail.length - 1] >= 0.1 - 1e-9)) S.trail.push(Math.floor(S.t * 10 + 1e-6) / 10);
    if (S.done) { S.playing = false; bPlay.textContent = L(T.play); }
    update();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  const col = () => ({ ep: c.light ? '#1d4ed8' : '#60a5fa', ek: c.light ? '#a85a00' : '#f5b23d', q: c.light ? '#b91c1c' : '#f87171' });
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 600) {
      const sw = Math.round(W * 0.62);
      scene(0, 0, sw, H);
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sw + 0.5, 14); ctx.lineTo(sw + 0.5, H - 14); ctx.stroke();
      bars(sw + 8, 0, W - sw - 8, H);
    } else {
      const sh = Math.round(H * 0.56);
      scene(0, 0, W, sh);
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(14, sh + 0.5); ctx.lineTo(W - 14, sh + 0.5); ctx.stroke();
      bars(0, sh + 6, W, H - sh - 6);
    }
  }

  function arrow(x0, y0, x1, y1, color, lab) {
    const len = Math.hypot(x1 - x0, y1 - y0); if (len < 4) return;
    const ux = (x1 - x0) / len, uy = (y1 - y0) / len;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - ux * 6, y1 - uy * 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * 9 - uy * 5, y1 - uy * 9 + ux * 5); ctx.lineTo(x1 - ux * 9 + uy * 5, y1 - uy * 9 - ux * 5); ctx.closePath(); ctx.fill();
    if (lab) text(ctx, lab, x1 + ux * 10, y1 + uy * 10 + 4, { size: 13, weight: 700, color, align: 'center' });
  }

  function scene(x0, y0, w, h) {
    const left = x0 + 52, right = x0 + w - 16, top = y0 + 62, bot = y0 + h - 34;
    const E = energies();
    // height scale shared by both situations (0–10 m)
    const sc = S.mode === 'track' ? Math.min((right - left) / (2 * XE + 1.2), (bot - top) / 10.4) : (bot - top) / 10.4;
    const Yp = (m) => bot - m * sc;
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(left - 14, Yp(0)); ctx.lineTo(left - 14, Yp(10)); ctx.stroke();
    for (let m = 0; m <= 10; m += 2) {
      ctx.beginPath(); ctx.moveTo(left - 19, Yp(m)); ctx.lineTo(left - 14, Yp(m)); ctx.stroke();
      text(ctx, num(m, 0), left - 23, Yp(m) + 4, { size: 12, mono: true, align: 'right', color: c.text3 });
    }
    text(ctx, T.hm, left - 14, Yp(10) - 10, { size: 12, align: 'center', color: c.text2 });
    // ground
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(left - 14, bot); ctx.lineTo(right, bot); ctx.stroke();
    ctx.lineWidth = 1; ctx.strokeStyle = c.line;
    for (let gx = left - 10; gx < right; gx += 10) { ctx.beginPath(); ctx.moveTo(gx, bot); ctx.lineTo(gx - 7, bot + 7); ctx.stroke(); }
    text(ctx, T.ref, right, bot + 24, { size: 12, align: 'right', color: c.text2 });
    // release-height line
    ctx.setLineDash([5, 4]); ctx.strokeStyle = c.text3; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(left - 14, Yp(S.h0)); ctx.lineTo(right, Yp(S.h0)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, L(T.relLine) + ' ' + num(S.h0, 1) + ' m', S.mode === 'track' ? (left + right) / 2 : right, Yp(S.h0) - 6, { size: 12, align: S.mode === 'track' ? 'center' : 'right', color: c.text2 });
    const R = 9;
    let bx, by, tx = 0, ty = 0;
    if (S.mode === 'track') {
      const cxm = (left + right) / 2, Xp = (m) => cxm + m * sc;
      // track body
      ctx.beginPath(); ctx.moveTo(Xp(-XE), bot);
      for (let i = 0; i <= 120; i++) { const xm = -XE + 2 * XE * i / 120; ctx.lineTo(Xp(xm), Yp(f(xm))); }
      ctx.lineTo(Xp(XE), bot); ctx.closePath();
      ctx.fillStyle = c.light ? 'rgba(22,24,29,0.06)' : 'rgba(255,255,255,0.05)'; ctx.fill();
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) { const xm = -XE + 2 * XE * i / 120; i ? ctx.lineTo(Xp(xm), Yp(f(xm))) : ctx.moveTo(Xp(xm), Yp(f(xm))); }
      ctx.strokeStyle = S.fric ? (c.light ? '#7c5a3a' : '#c8a27a') : c.lineHard; ctx.lineWidth = S.fric ? 4 : 2.5; ctx.stroke();
      text(ctx, S.fric ? T.rough : T.smooth, x0 + 14, y0 + 20, { size: 12, color: c.text2 });
      // ball sits on the track: offset along the normal
      const th = Math.atan(fp(S.x)), nx = -Math.sin(th), ny = Math.cos(th);
      bx = Xp(S.x) + nx * R; by = Yp(f(S.x)) - ny * R;
      tx = Math.cos(th) * Math.sign(S.v); ty = -Math.sin(th) * Math.sign(S.v);
    } else {
      const bxm = left + Math.min(150, (right - left) * 0.38);
      // ledge the ball is dropped from
      ctx.fillStyle = c.light ? 'rgba(22,24,29,0.10)' : 'rgba(255,255,255,0.10)';
      ctx.fillRect(left - 14, Yp(S.h0), bxm - left - 2, 6);
      ctx.strokeStyle = c.lineHard; ctx.strokeRect(left - 14, Yp(S.h0), bxm - left - 2, 6);
      // trail: equal time intervals (0.1 s) — the spacing grows as the ball speeds up
      ctx.fillStyle = c.text3;
      S.trail.forEach(tt => { const yy = S.h0 - 0.5 * G * tt * tt; if (yy > 0) { ctx.beginPath(); ctx.arc(bxm + R + 2, Yp(yy) - R, 2.5, 0, Math.PI * 2); ctx.fill(); } });
      text(ctx, S.started ? T.noAir : T.rest, x0 + 14, y0 + 20, { size: 12, color: c.text2 });
      bx = bxm + R + 2; by = Yp(S.y) - R; tx = 0; ty = S.v < 0 ? 1 : 0;
    }
    // height marker from the ball's lowest point to the ground
    const hh = hNow();
    if (hh > 0.3) {
      const fall = S.mode === 'fall', mx = fall ? bx - R - 12 : bx + R + 14, lab = 'h = ' + num(hh, 2) + ' m';
      ctx.strokeStyle = c.text3; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(mx, by + R); ctx.lineTo(mx, bot); ctx.stroke(); ctx.setLineDash([]);
      ctx.font = '500 12px "JetBrains Mono", monospace';
      const toLeft = fall || mx + 6 + ctx.measureText(lab).width > right;
      text(ctx, lab, toLeft ? mx - 6 : mx + 6, (by + R + bot) / 2 + 4, { size: 12, mono: true, color: c.text2, align: toLeft ? 'right' : 'left' });
    }
    // ball
    ctx.fillStyle = c.accent; ctx.beginPath(); ctx.arc(bx, by, R, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = c.light ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1; ctx.stroke();
    // mass label on the side away from the velocity arrow
    const mlab = num(S.m, 1) + ' kg';
    if (S.mode === 'track') {
      const th = Math.atan(fp(S.x)), lx = bx - Math.sin(th) * (R + 8), ly = by - Math.cos(th) * (R + 8) - 2;
      text(ctx, mlab, Math.abs(S.x) < 0.8 ? bx : lx, Math.abs(S.x) < 0.8 ? by - R - 8 : ly, { size: 12, mono: true, align: Math.abs(S.x) < 0.8 ? 'center' : S.x > 0 ? 'right' : 'left', color: c.text });
    } else text(ctx, mlab, bx + R + 26, by + 4, { size: 12, mono: true, color: c.text });
    text(ctx, { en: 'slow motion (½ speed)', af: 'stadige aksie (½ spoed)' }, x0 + 14, y0 + 38, { size: 12, color: c.text3 });
    // velocity arrow along the direction of motion, length ∝ speed
    if (E.v > 0.15) {
      const Lv = Math.min(64, 10 + E.v * 4.5);
      if (S.mode === 'track') arrow(bx + tx * (R + 2), by + ty * (R + 2), bx + tx * (R + 2 + Lv), by + ty * (R + 2 + Lv), c.ink, 'v');
      else { const ax = bx + R + 12; arrow(ax, by - Lv, ax, by, c.ink, null); text(ctx, 'v', ax, by - Lv - 6, { size: 13, weight: 700, color: c.ink, align: 'center' }); }
    }
  }

  function bars(x0, y0, w, h) {
    const E = energies(), k = col(), e0 = E0();
    const yt = MLX.ticks(0, e0, 4); const yMax = Math.max(yt.values[yt.values.length - 1], e0 * 1.0001);
    const list = [['Ep', E.ep, k.ep], ['Ek', E.ek, k.ek], ['ME', E.me, null]];
    if (S.mode === 'track' && S.fric) list.push([L({ en: 'Heat', af: 'Hitte' }), S.heat, k.q]);
    const ax = MLX.axes(ctx, { x0, y0: y0 + 26, w, h: h - 26, xMin: 0, xMax: list.length, yMin: 0, yMax, xTitle: '', yTitle: T.yJ, xTicks: list.length, yTicks: 4, fmtX: () => '',
      fmtY: (v) => yMax >= 10000 ? MLX.big(v) : num(v, yt.step < 1 ? 1 : 0) });
    text(ctx, { en: 'Energy now', af: 'Energie nou' }, x0 + 14, y0 + 20, { size: 12, weight: 700, color: c.text2 });
    // dashed line at the starting mechanical energy
    ctx.setLineDash([5, 4]); ctx.strokeStyle = c.text3; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(e0)); ctx.lineTo(ax.box.x1, ax.Y(e0)); ctx.stroke(); ctx.setLineDash([]);
    const slot = (ax.box.x1 - ax.box.x0) / list.length, bw = Math.min(46, slot * 0.6);
    list.forEach(([lab, val, colr], i) => {
      const cx = ax.box.x0 + slot * (i + 0.5), yv = ax.Y(Math.max(0, val));
      if (colr) { ctx.fillStyle = colr; ctx.fillRect(cx - bw / 2, yv, bw, ax.box.y1 - yv); }
      else {
        // ME = Ep + Ek drawn as a stacked bar
        const yEp = ax.Y(E.ep);
        ctx.fillStyle = k.ep; ctx.fillRect(cx - bw / 2, yEp, bw, ax.box.y1 - yEp);
        ctx.fillStyle = k.ek; ctx.fillRect(cx - bw / 2, yv, bw, yEp - yv);
        ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.strokeRect(cx - bw / 2 + 0.75, yv + 0.75, bw - 1.5, ax.box.y1 - yv - 1.5);
      }
      text(ctx, lab, cx, ax.box.y1 + 16, { size: 12, weight: 700, align: 'center', color: c.text });
      text(ctx, num(val, val < 100 ? 1 : 0), cx, yv - 6, { size: 12, mono: true, align: 'center', color: c.text2 });
    });
  }

  function update() {
    const E = energies(), hh = hNow();
    prim.set(num(E.me, E.me < 100 ? 1 : 0));
    ro.set('ep', num(E.ep, 1) + ' J'); ro.set('ek', num(E.ek, 1) + ' J'); ro.set('h', num(hh, 2) + ' m'); ro.set('v', num(E.v, 2) + ' m·s⁻¹');
    ro.set('q', S.mode === 'track' && S.fric ? num(S.heat, 1) + ' J' : '0 J');
    eqEl.innerHTML = '';
    eqEl.appendChild(MLX.h('div', { text: 'Ep = mgh' }));
    eqEl.appendChild(MLX.h('div', { text: '   = (' + num(S.m, 1) + ')(' + num(9.8, 1) + ')(' + num(hh, 2) + ') = ' + num(E.ep, 1) + ' J' }));
    eqEl.appendChild(MLX.h('div', { text: 'Ek = ½mv²' }));
    eqEl.appendChild(MLX.h('div', { text: '   = ½(' + num(S.m, 1) + ')(' + num(E.v, 2) + ')² = ' + num(E.ek, 1) + ' J' }));
    eqEl.appendChild(MLX.h('div', { text: 'ME = Ep + Ek = ' + num(E.me, 1) + ' J' }));
    let cap;
    if (!S.started) cap = T.capStart;
    else if (S.mode === 'fall') cap = S.done ? T.capGround : T.capFall;
    else if (S.done) cap = T.capStop;
    else if (E.v < 0.35 && hh > 0.3) cap = S.fric ? T.capFricTurn : T.capTurn;
    else if (S.fric) cap = T.capFric;
    else if (hh < 0.12) cap = T.capBottom;
    else cap = hh < S.prevH ? T.capDown : T.capUp;
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. m = ' + num(S.m, 1) + ' kg, h = ' + num(hh, 2) + ' m, v = ' + num(E.v, 2) + ' m/s, Ep = ' + num(E.ep, 1) + ' J, Ek = ' + num(E.ek, 1) + ' J, ME = ' + num(E.me, 1) + ' J.');
    ui.cv.draw();
  }
  reset();
});
