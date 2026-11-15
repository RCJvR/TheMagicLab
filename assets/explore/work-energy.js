/* Gr11 Work, energy and power (CAPS symbols, g = 9.8 m·s⁻²).
 * Pull a crate: a force F at angle θ above the horizontal pulls a crate from rest along a rough floor for 10 m.
 *   N = mg − F sinθ,  f = μk·N,  W_F = FΔx cosθ,  W_f = −fΔx,  W_N = W_g = 0 (perpendicular to Δx)
 *   W_net = W_F + W_f = ΔEk = ½mv²,  P_ave = W/Δt,  P = Fv cosθ (instantaneous)
 * Down a slope: a block slides from rest down an incline of height h and angle α (friction is non-conservative).
 *   d = h / sinα,  N = mg cosα,  f = μk·N,  W_nc = W_f = −f·d = ΔME = ΔEk + ΔEp
 *   (defaults reproduce the lesson's worked example: 5 kg, 30°, h = 4 m, μk = 0.2 → v = 7.16 m·s⁻¹)
 * Uniform acceleration from rest, so positions and speeds are exact (x = ½at², v = at).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const G = 9.8, DX = 10;
  const T = {
    aria: { en: 'A crate pulled at an angle along a rough floor, or a block sliding down a rough slope, with the forces on it and bars for work and energy', af: '\'n Krat wat teen \'n hoek oor \'n growwe vloer getrek word, of \'n blok wat teen \'n growwe helling afgly, met die kragte daarop en stawe vir arbeid en energie' },
    wnet: { en: 'Net work W_net = ΔEk', af: 'Netto arbeid W_net = ΔEk' }, me: { en: 'Mechanical energy ME = Ep + Ek', af: 'Meganiese energie ME = Ep + Ek' },
    wf: { en: 'Work by F, W_F', af: 'Arbeid deur F, W_F' }, wfr: { en: 'Work by friction, W_f', af: 'Arbeid deur wrywing, W_f' }, wng: { en: 'Work by N and by w', af: 'Arbeid deur N en deur w' },
    ek: { en: 'Kinetic energy Ek', af: 'Kinetiese energie Ek' }, ep: { en: 'Potential energy Ep', af: 'Potensiële energie Ep' },
    v: { en: 'Speed v', af: 'Spoed v' }, dx: { en: 'Displacement Δx', af: 'Verplasing Δx' }, t: { en: 'Time Δt', af: 'Tyd Δt' },
    pave: { en: 'Average power of F', af: 'Gemiddelde drywing van F' }, pnow: { en: 'Power of F now (Fv cosθ)', af: 'Drywing van F nou (Fv cosθ)' },
    wg: { en: 'Work by gravity, W_g', af: 'Arbeid deur gravitasie, W_g' }, dist: { en: 'Distance down the slope', af: 'Afstand teen die helling af' },
    setup: { en: 'Set-up', af: 'Opstelling' }, scene: { en: 'Situation', af: 'Situasie' }, pull: { en: 'Pull a crate', af: 'Trek \'n krat' }, slope: { en: 'Down a slope', af: 'Teen \'n helling af' },
    mass: { en: 'Mass m', af: 'Massa m' }, force: { en: 'Applied force F', af: 'Toegepaste krag F' }, angle: { en: 'Angle of F above the floor θ', af: 'Hoek van F bo die vloer θ' },
    mu: { en: 'Coefficient of kinetic friction μk', af: 'Kinetiese wrywingskoëffisiënt μk' }, alpha: { en: 'Slope angle α', af: 'Hellingshoek α' }, height: { en: 'Height of the slope h', af: 'Hoogte van die helling h' },
    go: { en: 'Pull', af: 'Trek' }, goS: { en: 'Release', af: 'Laat los' }, pause: { en: 'Pause', af: 'Pouseer' }, cont: { en: 'Continue', af: 'Gaan voort' }, reset: { en: 'Reset', af: 'Herstel' },
    eq: { en: 'The equations, now', af: 'Die vergelykings, nou' }, yJ: { en: 'Work or energy (J)', af: 'Arbeid of energie (J)' },
    floor: { en: 'rough floor', af: 'growwe vloer' }, start: { en: 'start', af: 'begin' }, ref: { en: 'h = 0 (reference level)', af: 'h = 0 (verwysingsvlak)' },
    heat: { en: 'Heat', af: 'Hitte' },
    capPull0: { en: 'Only the component F cosθ along the floor does work. N and the weight are perpendicular to Δx, so they do no work.', af: 'Net die komponent F cosθ langs die vloer doen arbeid. N en die gewig is loodreg op Δx, dus doen hulle geen arbeid nie.' },
    capLift: { en: 'F sinθ is at least as big as the weight, so the crate would lift off the floor. Use a smaller force or angle.', af: 'F sinθ is minstens so groot soos die gewig, dus sou die krat van die vloer af lig. Gebruik \'n kleiner krag of hoek.' },
    capHeld: { en: 'F cosθ is not bigger than the friction, so the crate does not move: with no displacement, no work is done.', af: 'F cosθ is nie groter as die wrywing nie, dus beweeg die krat nie: sonder verplasing word geen arbeid gedoen nie.' },
    capPull: { en: 'W_F is positive and W_f is negative. Their sum, the net work, is positive, so the kinetic energy grows: W_net = ΔEk.', af: 'W_F is positief en W_f is negatief. Hulle som, die netto arbeid, is positief, dus neem die kinetiese energie toe: W_net = ΔEk.' },
    capPullEnd: { en: 'After 10 m the net work equals the gain in kinetic energy. The negative work done by friction became heat.', af: 'Ná 10 m is die netto arbeid gelyk aan die toename in kinetiese energie. Die negatiewe arbeid deur wrywing het hitte geword.' },
    capSlope0: { en: 'At the top all the mechanical energy is Ep = mgh. Friction is non-conservative: its work will change ME (W_nc = ΔME).', af: 'Bo is al die meganiese energie Ep = mgh. Wrywing is nie-konserwatief: sy arbeid sal ME verander (W_nk = ΔME).' },
    capSHeld: { en: 'tan α is not more than μk: friction can balance the component of the weight down the slope, so the block stays at rest.', af: 'tan α is nie meer as μk nie: wrywing kan die komponent van die gewig teen die helling af balanseer, dus bly die blok in rus.' },
    capSlide: { en: 'Gravity does positive work (Ep becomes Ek); friction does negative work, turning part of the mechanical energy into heat.', af: 'Gravitasie doen positiewe arbeid (Ep word Ek); wrywing doen negatiewe arbeid en skakel deel van die meganiese energie in hitte om.' },
    capSlideNoF: { en: 'With μk = 0 only gravity, a conservative force, does work: mechanical energy is conserved.', af: 'Met μk = 0 doen net gravitasie, \'n konserwatiewe krag, arbeid: meganiese energie bly behoue.' },
    capSlopeEnd: { en: 'At the bottom: Ek = Ep at the top + W_f. The mechanical energy lost equals the work done against friction.', af: 'Onder: Ek = Ep bo + W_f. Die meganiese energie wat verlore is, is gelyk aan die arbeid teen wrywing gedoen.' },
  };
  const S = { mode: 'pull', m: 5, F: 40, th: 30, mu: 0.2, al: 30, h: 4, t: 0, playing: false, started: false, done: false };
  const rad = (d) => d * Math.PI / 180;
  // all the quantities for the current set-up at time S.t
  function state() {
    const m = S.m, w = m * G;
    if (S.mode === 'pull') {
      const Fx = S.F * Math.cos(rad(S.th)), Fy = S.F * Math.sin(rad(S.th));
      const lift = Fy >= w - 1e-9, N = Math.max(0, w - Fy), f = S.mu * N;
      const held = !lift && Fx <= f + 1e-9;
      const a = lift || held ? 0 : (Fx - f) / m, tEnd = a > 0 ? Math.sqrt(2 * DX / a) : 0;
      const t = Math.min(S.t, tEnd), x = 0.5 * a * t * t, v = a * t;
      const WF = Fx * x, Wf = -f * x, Wnet = WF + Wf;
      return { w, Fx, Fy, N, f, lift, held, a, tEnd, t, x, v, WF, Wf, Wnet, ek: 0.5 * m * v * v, P: Fx * v, Pave: t > 0 ? WF / t : 0, WF10: Fx * DX, Wf10: -f * DX };
    }
    const al = rad(S.al), d = S.h / Math.sin(al), N = w * Math.cos(al), f = S.mu * N, Fpar = w * Math.sin(al);
    const held = Fpar <= f + 1e-9, a = held ? 0 : (Fpar - f) / m, tEnd = a > 0 ? Math.sqrt(2 * d / a) : 0;
    const t = Math.min(S.t, tEnd), s = 0.5 * a * t * t, v = a * t;
    const ep = w * (S.h - s * Math.sin(al)), ek = 0.5 * m * v * v, Wf = -f * s, Wg = w * s * Math.sin(al);
    return { w, N, f, held, a, d, tEnd, t, s, v, ep, ek, me: ep + ek, Wf, Wg, heat: -Wf, ep0: w * S.h };
  }

  const ui = MLX.layout(root, { height: (w) => w < 600 ? 560 : Math.max(360, Math.min(430, Math.round(w * 0.6))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.wnet, unit: 'J' });
  const primTitle = prim.el.querySelector('.mlx-card-title');
  const roBox = MLX.h('div'); prim.el.appendChild(roBox);
  let ro;
  const c1 = MLX.card(ui.side, T.setup);
  MLX.seg(c1, { label: T.scene, options: [['pull', T.pull], ['slope', T.slope]], value: S.mode, onChange: (v) => { S.mode = v; build(); reset(); } });
  MLX.slider(c1, { label: T.mass, min: 1, max: 20, step: 1, value: S.m, fmt: (v) => v + ' kg', onInput: (v) => { S.m = v; reset(); } });
  const sF = MLX.slider(c1, { label: T.force, min: 0, max: 100, step: 5, value: S.F, fmt: (v) => v + ' N', onInput: (v) => { S.F = v; reset(); } });
  const sTh = MLX.slider(c1, { label: T.angle, min: 0, max: 60, step: 5, value: S.th, fmt: (v) => v + '°', onInput: (v) => { S.th = v; reset(); } });
  const sAl = MLX.slider(c1, { label: T.alpha, min: 10, max: 60, step: 5, value: S.al, fmt: (v) => v + '°', onInput: (v) => { S.al = v; reset(); } });
  const sH = MLX.slider(c1, { label: T.height, min: 1, max: 10, step: 0.5, value: S.h, fmt: (v) => num(v, 1) + ' m', onInput: (v) => { S.h = v; reset(); } });
  MLX.slider(c1, { label: T.mu, min: 0, max: 0.6, step: 0.05, value: S.mu, fmt: (v) => num(v, 2), onInput: (v) => { S.mu = v; reset(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  const bPlay = MLX.button(bt, T.go, () => play(!S.playing), 'primary');
  MLX.button(bt, T.reset, () => reset());
  const c2 = MLX.card(ui.side, T.eq);
  const eqEl = MLX.h('div', { class: 'mlx-note', style: 'font-family:var(--fm,"JetBrains Mono",monospace);line-height:1.7;font-size:12.5px;white-space:pre-wrap' }); c2.appendChild(eqEl);

  function build() {
    const pull = S.mode === 'pull';
    sF.el.style.display = sTh.el.style.display = pull ? '' : 'none';
    sAl.el.style.display = sH.el.style.display = pull ? 'none' : '';
    primTitle.textContent = L(pull ? T.wnet : T.me);
    roBox.innerHTML = '';
    ro = MLX.readout(roBox, pull ? [['wf', T.wf], ['wfr', T.wfr], ['wng', T.wng], ['ek', T.ek], ['v', T.v], ['dx', T.dx], ['t', T.t], ['pave', T.pave], ['p', T.pnow]]
      : [['ep', T.ep], ['ek', T.ek], ['wg', T.wg], ['wfr', T.wfr], ['v', T.v], ['dx', T.dist], ['t', T.t]]);
  }
  function label() { return L(S.playing ? T.pause : S.started && !S.done ? T.cont : S.mode === 'pull' ? T.go : T.goS); }
  function reset() { S.t = 0; S.playing = false; S.started = false; S.done = false; bPlay.textContent = label(); update(); }
  function play(on) {
    if (on && S.done) { S.t = 0; S.done = false; }
    const st = state();
    if (on && st.a <= 0) { S.started = true; update(); return; }
    S.playing = on; if (on) S.started = true;
    if (on && MLX.reducedMotion) { S.t = st.tEnd; S.done = true; S.playing = false; }
    bPlay.textContent = label(); update();
  }
  MLX.loop(ui.cv.el, (dt) => {
    if (!S.playing) return;
    const st = state();
    S.t = Math.min(st.tEnd, S.t + dt);
    if (S.t >= st.tEnd) { S.done = true; S.playing = false; bPlay.textContent = label(); }
    update();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  const col = () => ({ F: c.light ? '#1d4ed8' : '#60a5fa', f: c.light ? '#b91c1c' : '#f87171', N: c.light ? '#047857' : '#34d399', w: c.light ? '#6d28d9' : '#c4b5fd', ek: c.light ? '#a85a00' : '#f5b23d', ep: c.light ? '#1d4ed8' : '#60a5fa', net: c.ink });
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const st = state();
    if (W >= 600) {
      const sw = Math.round(W * 0.6);
      (S.mode === 'pull' ? scenePull : sceneSlope)(st, 0, 0, sw, H);
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sw + 0.5, 14); ctx.lineTo(sw + 0.5, H - 14); ctx.stroke();
      bars(st, sw + 8, 0, W - sw - 8, H);
    } else {
      const sh = Math.round(H * 0.55);
      (S.mode === 'pull' ? scenePull : sceneSlope)(st, 0, 0, W, sh);
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(14, sh + 0.5); ctx.lineTo(W - 14, sh + 0.5); ctx.stroke();
      bars(st, 0, sh + 6, W, H - sh - 6);
    }
  }
  function arrow(x0, y0, x1, y1, color, lab, lx, ly, align) {
    const len = Math.hypot(x1 - x0, y1 - y0); if (len < 3) return;
    const ux = (x1 - x0) / len, uy = (y1 - y0) / len;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - ux * 6, y1 - uy * 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * 10 - uy * 5, y1 - uy * 10 + ux * 5); ctx.lineTo(x1 - ux * 10 + uy * 5, y1 - uy * 10 - ux * 5); ctx.closePath(); ctx.fill();
    if (lab) text(ctx, lab, lx != null ? lx : x1 + ux * 12, ly != null ? ly : y1 + uy * 12 + 4, { size: 13, weight: 700, color, align: align || 'center' });
  }
  function hatch(x0, x1, y) {
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    ctx.strokeStyle = c.line; ctx.lineWidth = 1;
    for (let gx = x0 + 6; gx < x1; gx += 10) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx - 7, y + 7); ctx.stroke(); }
  }
  function crate(x, y, s, ang) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(-ang);
    ctx.fillStyle = c.light ? '#d9b98a' : '#8a6a44'; ctx.fillRect(-s / 2, -s, s, s);
    ctx.strokeStyle = c.light ? '#6b4a22' : '#d4b48a'; ctx.lineWidth = 1.5; ctx.strokeRect(-s / 2, -s, s, s);
    ctx.lineWidth = 1; ctx.beginPath(); [0.25, 0.5, 0.75].forEach(q => { ctx.moveTo(-s / 2 + 3, -s * q); ctx.lineTo(s / 2 - 3, -s * q); }); ctx.stroke();
    ctx.restore();
  }

  function scenePull(st, x0, y0, w, h) {
    const k = col(), s = Math.min(64, h * 0.18), left = x0 + 34, right = x0 + w - 24 - s * 1.6;
    const fy = y0 + h * 0.6, X = (m) => left + m / DX * (right - left);
    hatch(x0 + 14, x0 + w - 14, fy);
    text(ctx, T.floor, x0 + w - 16, fy + 22, { size: 12, align: 'right', color: c.text3 });
    // distance scale
    for (let m = 0; m <= DX; m += 2) {
      ctx.strokeStyle = c.lineHard; ctx.beginPath(); ctx.moveTo(X(m), fy + 41); ctx.lineTo(X(m), fy + 47); ctx.stroke();
      text(ctx, num(m, 0), X(m), fy + 61, { size: 12, mono: true, align: 'center', color: c.text3 });
    }
    ctx.strokeStyle = c.lineHard; ctx.beginPath(); ctx.moveTo(X(0), fy + 44); ctx.lineTo(X(DX), fy + 44); ctx.stroke();
    text(ctx, 'x (m)', X(DX) + 14, fy + 61, { size: 12, color: c.text3 });
    // start line and displacement arrow
    ctx.setLineDash([4, 4]); ctx.strokeStyle = c.text3; ctx.beginPath(); ctx.moveTo(X(0), fy); ctx.lineTo(X(0), fy - s - 30); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, T.start, X(0), fy - s - 36, { size: 12, align: 'center', color: c.text3 });
    const cxp = X(st.x);
    if (st.x > 0.15) arrow(X(0), fy + 16, cxp, fy + 16, c.text2, 'Δx = ' + num(st.x, 2) + ' m', (X(0) + cxp) / 2, fy + 12 - 4, 'center');
    crate(cxp, fy, s, 0);
    text(ctx, S.m + ' kg', cxp + s * 0.1, fy - s * 0.25 + 5, { size: 12, mono: true, weight: 700, align: 'center', color: c.light ? '#3b2a12' : '#fff' });
    // forces (length ∝ magnitude)
    const big = Math.max(st.w, S.F, 1), sc = Math.min(Math.min(h * 0.32, 90) / big, (s / 2 + 34) / st.w);
    const ccx = cxp, ccy = fy - s / 2, th = rad(S.th);
    // applied force from the front top corner along the rope
    const ax0 = cxp + s / 2, ay0 = fy - s * 0.7;
    if (S.F > 0) {
      const lf = Math.min(Math.max(14, S.F * sc), (x0 + w - 30 - ax0) / Math.max(Math.cos(th), 0.5)), ex = ax0 + Math.cos(th) * lf, ey = ay0 - Math.sin(th) * lf;
      ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ax0, ay0); ctx.lineTo(ax0 + Math.cos(th) * (lf + 30), ay0 - Math.sin(th) * (lf + 12)); ctx.stroke();
      if (S.th > 0) {
        ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(ax0, ay0); ctx.lineTo(ax0 + lf + 12, ay0); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(ax0, ay0, 26, -th, 0); ctx.stroke();
        text(ctx, 'θ', ax0 + 32, ay0 - 5, { size: 12, color: c.text2 });
      }
      arrow(ax0, ay0, ex, ey, k.F, 'F', ex + 10, ey - 6, 'left');
    }
    if (!st.lift) {
      const lw = st.w * sc, ln = st.N * sc;
      arrow(ccx, ccy, ccx, ccy + lw, k.w, 'w', ccx + 9, ccy + lw - 2, 'left');
      if (ln > 3) arrow(ccx - s * 0.25, ccy, ccx - s * 0.25, ccy - ln, k.N, 'N', ccx - s * 0.25 - 8, ccy - ln + 8, 'right');
      if (st.f > 0.01 && !st.held) { const lfr = Math.max(12, st.f * sc); arrow(cxp - s / 2, fy - 4, cxp - s / 2 - lfr, fy - 4, k.f, 'f', cxp - s / 2 - lfr - 6, fy - 8, 'right'); }
    }
    text(ctx, { en: 'forces on the crate (arrows to scale)', af: 'kragte op die krat (pyle volgens skaal)' }, x0 + 14, y0 + 20, { size: 12, color: c.text2 });
  }

  function sceneSlope(st, x0, y0, w, h) {
    const k = col(), al = rad(S.al), base = S.h / Math.tan(al);
    const padL = 54, padR = 30, top = y0 + 46, bot = y0 + h - 40;
    const sc = Math.min((w - padL - padR) / base, (bot - top) / S.h, (bot - top) / 4);
    const Ax = x0 + padL, Ay = bot - S.h * sc, Bx = Ax + base * sc, By = bot;
    hatch(x0 + 14, x0 + w - 14, bot);
    ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Bx, By); ctx.lineTo(Ax, By); ctx.closePath();
    ctx.fillStyle = c.light ? 'rgba(22,24,29,0.07)' : 'rgba(255,255,255,0.06)'; ctx.fill();
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Bx, By); ctx.stroke();
    // angle and height dimension
    ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(Bx, By, 60, Math.PI, Math.PI + al); ctx.stroke();
    text(ctx, 'α = ' + S.al + '°', Bx - 66, By - 8, { size: 12, align: 'right', color: c.text2 });
    ctx.beginPath(); ctx.moveTo(Ax - 18, Ay); ctx.lineTo(Ax - 18, By); ctx.moveTo(Ax - 23, Ay); ctx.lineTo(Ax - 13, Ay); ctx.moveTo(Ax - 23, By); ctx.lineTo(Ax - 13, By); ctx.stroke();
    ctx.save(); ctx.translate(Ax - 26, (Ay + By) / 2); ctx.rotate(-Math.PI / 2); text(ctx, 'h = ' + num(S.h, 1) + ' m', 0, 0, { size: 12, align: 'center', color: c.text2 }); ctx.restore();
    text(ctx, T.ref, x0 + 16, bot + 24, { size: 12, color: c.text3 });
    text(ctx, 'd = h / sin α = ' + num(st.d, 2) + ' m', (Ax + Bx) / 2 + 14, (Ay + By) / 2 - 12, { size: 12, color: c.text2 });
    // block on the slope at distance s from the top (contact point on the surface)
    const ux = Math.cos(al), uy = Math.sin(al), sz = Math.max(28, Math.min(44, h * 0.12));
    const frac = st.d > 0 ? st.s / st.d : 0;
    const px = Ax + (Bx - Ax) * frac + ux * sz * 0.6 * (1 - frac) - ux * sz * 0.6 * frac, py = Ay + (By - Ay) * frac + uy * sz * 0.6 * (1 - frac) - uy * sz * 0.6 * frac;
    crate(px, py, sz, al);
    // centre of the block
    const nx = -Math.sin(al), ny = -Math.cos(al); // outward normal (screen coords: up-right of surface)
    const gx = px + nx * sz / 2, gy = py + ny * sz / 2;
    const scF = Math.min(h * 0.2, 56) / Math.max(st.w, 1);
    arrow(gx, gy, gx, gy + st.w * scF, k.w, 'w', gx + 8, gy + st.w * scF, 'left');
    arrow(gx, gy, gx + nx * st.N * scF, gy + ny * st.N * scF, k.N, 'N', gx + nx * (st.N * scF + 12), gy + ny * (st.N * scF + 12) + 4, 'center');
    if (st.f > 0.01) { const lf = Math.max(22, st.f * scF), bx = px - ux * sz / 2 + nx * 3, by = py - uy * sz / 2 + ny * 3; arrow(bx, by, bx - ux * lf, by - uy * lf, k.f, 'f', bx - ux * lf - 8, by - uy * lf - 4, 'right'); }
    text(ctx, { en: 'forces on the block (arrows to scale)', af: 'kragte op die blok (pyle volgens skaal)' }, x0 + 14, y0 + 20, { size: 12, color: c.text2 });
  }

  function bars(st, x0, y0, w, h) {
    const k = col();
    let list, lo, hi, ref = null;
    if (S.mode === 'pull') {
      list = [['W_F', st.WF, k.F], ['W_f', st.Wf, k.f], ['W_net', st.Wnet, k.net], ['ΔEk', st.ek, k.ek]];
      lo = Math.min(0, st.Wf10) * 1.1; hi = Math.max(1, st.WF10) * 1.12;
    } else {
      list = [['Ep', st.ep, k.ep], ['Ek', st.ek, k.ek], [L(T.heat), st.heat, k.f], ['ME', st.me, null]];
      lo = 0; hi = Math.max(1, st.ep0) * 1.1; ref = st.ep0;
    }
    const tk = MLX.ticks(lo, hi, 4), yMin = lo < 0 ? Math.min(lo, tk.values[0]) : 0, yMax = Math.max(hi, tk.values[tk.values.length - 1]);
    const ax = MLX.axes(ctx, { x0, y0: y0 + 26, w, h: h - 26, xMin: 0, xMax: list.length, yMin, yMax, xTitle: '', yTitle: T.yJ, xTicks: list.length, yTicks: 4, fmtX: () => '', fmtY: (v) => num(v, tk.step < 1 ? 1 : 0) });
    text(ctx, S.mode === 'pull' ? { en: 'Work and energy so far', af: 'Arbeid en energie tot nou' } : { en: 'Energy now', af: 'Energie nou' }, x0 + 14, y0 + 20, { size: 12, weight: 700, color: c.text2 });
    const y0p = ax.Y(0);
    if (yMin < 0) { ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ax.box.x0, y0p); ctx.lineTo(ax.box.x1, y0p); ctx.stroke(); }
    if (ref != null) { ctx.setLineDash([5, 4]); ctx.strokeStyle = c.text3; ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(ref)); ctx.lineTo(ax.box.x1, ax.Y(ref)); ctx.stroke(); ctx.setLineDash([]); }
    const slot = (ax.box.x1 - ax.box.x0) / list.length, bw = Math.min(46, slot * 0.6);
    list.forEach(([lab, val, colr], i) => {
      const cx = ax.box.x0 + slot * (i + 0.5), yv = ax.Y(val);
      if (colr) { ctx.fillStyle = colr; ctx.fillRect(cx - bw / 2, Math.min(yv, y0p), bw, Math.abs(y0p - yv)); }
      else {
        const yEp = ax.Y(st.ep);
        ctx.fillStyle = k.ep; ctx.fillRect(cx - bw / 2, yEp, bw, y0p - yEp);
        ctx.fillStyle = k.ek; ctx.fillRect(cx - bw / 2, yv, bw, yEp - yv);
        ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.strokeRect(cx - bw / 2 + 0.75, yv + 0.75, bw - 1.5, y0p - yv - 1.5);
      }
      if (colr === k.net) { ctx.fillStyle = c.stage; ctx.fillRect(cx - bw / 2 + 3, Math.min(yv, y0p) + 3, bw - 6, Math.max(0, Math.abs(y0p - yv) - 6)); }
      text(ctx, lab, cx, ax.box.y1 + 16, { size: 12, weight: 700, align: 'center', color: c.text });
      text(ctx, num(val, Math.abs(val) < 100 ? 1 : 0), cx, y0p - 6 - (val > 0 ? y0p - yv : 0), { size: 12, mono: true, align: 'center', color: c.text2 });
    });
  }

  const J = (v) => num(v, 1) + ' J';
  function update() {
    const st = state();
    eqEl.innerHTML = '';
    const line = (s) => eqEl.appendChild(MLX.h('div', { text: s }));
    let cap;
    if (S.mode === 'pull') {
      prim.set(num(st.Wnet, 1));
      ro.set('wf', J(st.WF)); ro.set('wfr', J(st.Wf)); ro.set('wng', '0 J'); ro.set('ek', J(st.ek)); ro.set('v', num(st.v, 2) + ' m·s⁻¹');
      ro.set('dx', num(st.x, 2) + ' m'); ro.set('t', num(st.t, 2) + ' s'); ro.set('pave', num(st.Pave, 0) + ' W'); ro.set('p', num(st.P, 0) + ' W');
      line('N = mg − F sinθ = ' + num(st.N, 1) + ' N');
      line('f = μk·N = ' + num(st.f, 1) + ' N');
      line('W_F = FΔx cosθ');
      line('    = (' + S.F + ')(' + num(st.x, 2) + ')cos ' + S.th + '° = ' + J(st.WF));
      line('W_f = −fΔx = ' + J(st.Wf));
      line('W_net = W_F + W_f = ' + J(st.Wnet));
      line('ΔEk = ½mv² = ½(' + S.m + ')(' + num(st.v, 2) + ')² = ' + J(st.ek));
      line('P_ave = W_F/Δt = ' + num(st.Pave, 0) + ' W');
      cap = st.lift ? T.capLift : st.held ? T.capHeld : !S.started ? T.capPull0 : S.done ? T.capPullEnd : T.capPull;
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. F = ' + S.F + ' N at ' + S.th + '°, m = ' + S.m + ' kg, μk = ' + num(S.mu, 2) + '. Δx = ' + num(st.x, 2) + ' m, W_F = ' + J(st.WF) + ', W_f = ' + J(st.Wf) + ', W_net = ' + J(st.Wnet) + ', v = ' + num(st.v, 2) + ' m/s.');
    } else {
      prim.set(num(st.me, 1));
      ro.set('ep', J(st.ep)); ro.set('ek', J(st.ek)); ro.set('wg', J(st.Wg)); ro.set('wfr', J(st.Wf)); ro.set('v', num(st.v, 2) + ' m·s⁻¹');
      ro.set('dx', num(st.s, 2) + ' m'); ro.set('t', num(st.t, 2) + ' s');
      line('N = mg cosα = ' + num(st.N, 1) + ' N');
      line('f = μk·N = ' + num(st.f, 1) + ' N');
      line('W_f = −f·Δx = −(' + num(st.f, 1) + ')(' + num(st.s, 2) + ') = ' + J(st.Wf));
      line('W_nc = ΔME = ΔEk + ΔEp');
      line('    = ' + J(st.ek) + ' + (' + J(st.ep - st.ep0) + ')');
      line('ME = Ep + Ek = ' + J(st.me));
      cap = st.held ? T.capSHeld : !S.started ? T.capSlope0 : S.done ? T.capSlopeEnd : S.mu === 0 ? T.capSlideNoF : T.capSlide;
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. α = ' + S.al + '°, h = ' + num(S.h, 1) + ' m, m = ' + S.m + ' kg, μk = ' + num(S.mu, 2) + '. Ep = ' + J(st.ep) + ', Ek = ' + J(st.ek) + ', W_f = ' + J(st.Wf) + ', v = ' + num(st.v, 2) + ' m/s.');
    }
    ui.setCaption(cap);
    ui.cv.draw();
  }
  build(); reset();
});
