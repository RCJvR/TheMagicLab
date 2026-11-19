/* Gr11 Momentum and impulse — two trolleys collide head-on on a straight track (positive: to the right).
 *   p = mv;  Σp before = Σp after:  m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f  (closed system, every collision type)
 *   Elastic: Ek also conserved.  Inelastic: Ek not conserved.  Perfectly inelastic: they stick, (m₁ + m₂)vf = Σp.
 *   After the collision (e = 1 elastic, 0 < e < 1 inelastic, e = 0 stick):
 *     v₁f = (Σp + m₂e(v₂ᵢ − v₁ᵢ)) / (m₁ + m₂),   v₂f = (Σp + m₁e(v₁ᵢ − v₂ᵢ)) / (m₁ + m₂)
 *   During the contact time Δt each trolley feels a constant force; impulse FΔt = Δp, equal and opposite
 *   on the two trolleys (Newton III), so Σp never changes.
 * The motion is shown at one quarter of real speed.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Two trolleys colliding on a straight track, with a momentum–time graph and bars comparing total momentum and kinetic energy before and now', af: 'Twee trollies wat op \'n reguit baan bots, met \'n momentum-tyd-grafiek en stawe wat totale momentum en kinetiese energie voor en nou vergelyk' },
    ptot: { en: 'Total momentum Σp (now)', af: 'Totale momentum Σp (nou)' }, pu: 'kg·m·s⁻¹',
    pb: { en: 'Σp before', af: 'Σp voor' }, pa: { en: 'Σp after', af: 'Σp ná' }, kb: { en: 'Ek before', af: 'Ek voor' }, ka: { en: 'Ek after', af: 'Ek ná' },
    kl: { en: 'Ek lost', af: 'Ek verloor' }, J: { en: 'Impulse on trolley 2, J = Δp₂', af: 'Impuls op trollie 2, J = Δp₂' }, Fav: { en: 'Average force on trolley 2', af: 'Gemiddelde krag op trollie 2' },
    col: { en: 'Collision', af: 'Botsing' }, type: { en: 'Type', af: 'Tipe' }, el: { en: 'Elastic', af: 'Elasties' }, inel: { en: 'Inelastic', af: 'Onelasties' }, stick: { en: 'Perfectly inelastic', af: 'Volkome onelasties' },
    e: { en: 'Coefficient of restitution e (enrichment)', af: 'Restitusiekoëffisiënt e (verryking)' }, dt: { en: 'Contact time Δt', af: 'Kontaktyd Δt' },
    t1: { en: 'Trolley 1 (left)', af: 'Trollie 1 (links)' }, t2: { en: 'Trolley 2 (right)', af: 'Trollie 2 (regs)' },
    m: { en: 'Mass', af: 'Massa' }, v: { en: 'Initial velocity', af: 'Beginsnelheid' },
    play: { en: 'Play', af: 'Speel' }, pause: { en: 'Pause', af: 'Pouseer' }, reset: { en: 'Reset', af: 'Herstel' },
    work: { en: 'The working', af: 'Die berekening' },
    pos: { en: '+ positive direction', af: '+ positiewe rigting' }, slow: { en: 'shown at ¼ of real speed', af: 'teen ¼ van werklike spoed gewys' },
    gy: { en: 'p (kg·m·s⁻¹)', af: 'p (kg·m·s⁻¹)' }, gx: { en: 't (s)', af: 't (s)' },
    l1: { en: 'trolley 1', af: 'trollie 1' }, l2: { en: 'trolley 2', af: 'trollie 2' }, lt: { en: 'total Σp', af: 'totaal Σp' },
    bP: { en: 'Σp (kg·m·s⁻¹)', af: 'Σp (kg·m·s⁻¹)' }, bK: { en: 'ΣEk (J)', af: 'ΣEk (J)' }, before: { en: 'before', af: 'voor' }, now: { en: 'now', af: 'nou' },
    spring: { en: 'spring', af: 'veer' }, velcro: { en: 'Velcro', af: 'klittenband' },
    capReady: { en: 'Press Play. Trolley 1 is faster to the right than trolley 2, so it will catch up and collide.', af: 'Druk Speel. Trollie 1 beweeg vinniger na regs as trollie 2, dus sal dit inhaal en bots.' },
    capNo: { en: 'Trolley 1 is not moving faster to the right than trolley 2, so the trolleys never meet. Change a velocity.', af: 'Trollie 1 beweeg nie vinniger na regs as trollie 2 nie, dus ontmoet die trollies nooit. Verander \'n snelheid.' },
    capBefore: { en: 'Before the collision each trolley keeps its momentum p = mv; the total is the sum, taking direction into account.', af: 'Voor die botsing behou elke trollie sy momentum p = mv; die totaal is die som, met die rigting in ag geneem.' },
    capDuring: { en: 'In contact: the trolleys push on each other with equal and opposite forces (Newton III), so one gains exactly the momentum the other loses.', af: 'In kontak: die trollies druk op mekaar met gelyke en teenoorgestelde kragte (Newton III), dus wen die een presies die momentum wat die ander verloor.' },
    capEl: { en: 'Elastic: total momentum and total kinetic energy are both the same as before.', af: 'Elasties: totale momentum en totale kinetiese energie is albei dieselfde as voorheen.' },
    capIn: { en: 'Inelastic: total momentum is unchanged, but some kinetic energy became heat, sound and deformation.', af: 'Onelasties: totale momentum is onveranderd, maar van die kinetiese energie het hitte, klank en vervorming geword.' },
    capSt: { en: 'Perfectly inelastic: the trolleys move off together with one velocity; momentum is conserved, and the most kinetic energy is lost.', af: 'Volkome onelasties: die trollies beweeg saam met een snelheid weg; momentum bly behoue, en die meeste kinetiese energie gaan verlore.' },
  };
  const LEN = 2.4, TL = 0.24, TMAX = 2, SLOW = 0.25;     // track length (m), trolley length (m), run time (s), playback speed
  const S = { type: 'stick', e: 0.5, dt: 0.1, m1: 2, v1: 2, m2: 1, v2: -1, t: 0, playing: false };
  let run = null;

  const eOf = () => S.type === 'el' ? 1 : S.type === 'stick' ? 0 : S.e;
  function finals() {
    const P = S.m1 * S.v1 + S.m2 * S.v2, M = S.m1 + S.m2, e = eOf();
    return { v1f: (P + S.m2 * e * (S.v2 - S.v1)) / M, v2f: (P + S.m1 * e * (S.v1 - S.v2)) / M };
  }
  // the whole run, computed once, sampled every 2 ms
  function simulate() {
    const f = finals(), h = 0.0005, out = [];
    let t = 0, x1 = 0.45, x2 = 1.45, v1 = S.v1, v2 = S.v2, tc = null, phase = 'before', tEnd = TMAX;
    for (let i = 0; t <= TMAX + 1e-9; i++) {
      if (i % 4 === 0) out.push({ t, x1, x2, v1, v2, phase });
      if (phase === 'before' && x2 - x1 <= TL && v1 > v2) { phase = 'contact'; tc = t; }
      if (phase === 'contact') {
        const r = Math.min(1, (t - tc) / S.dt);
        v1 = S.v1 + (f.v1f - S.v1) * r; v2 = S.v2 + (f.v2f - S.v2) * r;
        if (r >= 1) phase = 'after';
      }
      x1 += v1 * h; x2 += v2 * h; t += h;
      if (x1 - TL / 2 <= 0 || x2 + TL / 2 >= LEN) { out.push({ t, x1, x2, v1, v2, phase }); tEnd = t; break; }
    }
    return { s: out, tc, tEnd, f, meets: S.v1 > S.v2 };
  }
  const at = (t) => { const s = run.s; let i = Math.min(s.length - 1, Math.round(t / 0.002)); while (i > 0 && s[i].t > t + 1e-9) i--; return s[i]; };

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 600 : Math.max(420, Math.min(480, Math.round(w * 0.54))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.ptot, unit: T.pu });
  const ro = MLX.readout(prim.el, [['pb', T.pb], ['pa', T.pa], ['kb', T.kb], ['ka', T.ka], ['kl', T.kl], ['J', T.J], ['F', T.Fav]]);
  const c0 = MLX.card(ui.side, T.col);
  const bt = MLX.h('div', { class: 'mlx-btns' }); c0.appendChild(bt);
  const bPlay = MLX.button(bt, T.play, () => play(!S.playing), 'primary');
  MLX.button(bt, T.reset, reset);
  MLX.seg(c0, { label: T.type, options: [['el', T.el], ['inel', T.inel], ['stick', T.stick]], value: S.type, onChange: (v) => { S.type = v; sE.el.style.display = v === 'inel' ? '' : 'none'; reset(); } });
  const sE = MLX.slider(c0, { label: T.e, min: 0.1, max: 0.9, step: 0.1, value: S.e, fmt: (v) => num(v, 1), onInput: (v) => { S.e = v; reset(); } });
  sE.el.style.display = 'none';
  MLX.slider(c0, { label: T.dt, min: 0.02, max: 0.3, step: 0.02, value: S.dt, fmt: (v) => num(v, 2) + ' s', onInput: (v) => { S.dt = v; reset(); } });
  const sv = (v) => (v > 0 ? '+' : '') + num(v, 1);
  const c1 = MLX.card(ui.side, T.t1);
  MLX.slider(c1, { label: T.m, min: 0.5, max: 2, step: 0.1, value: S.m1, fmt: (v) => num(v, 1) + ' kg', onInput: (v) => { S.m1 = v; reset(); } });
  MLX.slider(c1, { label: T.v, min: -3, max: 3, step: 0.1, value: S.v1, fmt: (v) => sv(v) + ' m·s⁻¹', onInput: (v) => { S.v1 = v; reset(); } });
  const c2 = MLX.card(ui.side, T.t2);
  MLX.slider(c2, { label: T.m, min: 0.5, max: 2, step: 0.1, value: S.m2, fmt: (v) => num(v, 1) + ' kg', onInput: (v) => { S.m2 = v; reset(); } });
  MLX.slider(c2, { label: T.v, min: -3, max: 3, step: 0.1, value: S.v2, fmt: (v) => sv(v) + ' m·s⁻¹', onInput: (v) => { S.v2 = v; reset(); } });
  const c3 = MLX.card(ui.side, T.work);
  const eqEl = MLX.h('div', { class: 'mlx-note', style: 'font-family:var(--fm,"JetBrains Mono",monospace);line-height:1.9;font-size:13px' }); c3.appendChild(eqEl);

  function play(on) {
    if (on && S.t >= run.tEnd) S.t = 0;
    if (on && MLX.reducedMotion) { S.t = run.tEnd; on = false; }
    S.playing = on; bPlay.textContent = L(S.playing ? T.pause : T.play); update();
  }
  function reset() { run = simulate(); S.t = 0; play(false); }

  MLX.loop(ui.cv.el, (dt) => {
    if (!S.playing) return;
    S.t = Math.min(run.tEnd, S.t + dt * SLOW);
    if (S.t >= run.tEnd) play(false); else update();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  // ---------- drawing ----------
  function pal(c) {
    return c.light ? { t1: '#1d5fc4', t2: '#b45309', t1f: 'rgba(29,95,196,0.14)', t2f: 'rgba(180,83,9,0.14)', track: '#e9e7e2' }
      : { t1: '#6aa8f7', t2: '#f5a524', t1f: 'rgba(106,168,247,0.18)', t2f: 'rgba(245,165,36,0.18)', track: '#1a1e24' };
  }
  function draw(ctx, W, H) {
    const c = MLX.colors(), P = pal(c);
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const phone = W < 640;
    const trackH = phone ? 190 : 196;
    drawTrack(ctx, 0, 0, W, trackH, c, P, phone);
    ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(14, trackH + 0.5); ctx.lineTo(W - 14, trackH + 0.5); ctx.stroke();
    if (phone) { drawGraph(ctx, 0, trackH + 8, W, 230, c, P); drawBars(ctx, 0, trackH + 246, W, H - trackH - 250, c, P); }
    else { const gw = Math.round(W * 0.64); drawGraph(ctx, 0, trackH + 8, gw, H - trackH - 12, c, P); drawBars(ctx, gw + 10, trackH + 8, W - gw - 14, H - trackH - 12, c, P); }
  }
  function label(ctx, s, x, y, align, col, W) {
    ctx.font = '600 12px "JetBrains Mono", monospace';
    const w = ctx.measureText(s).width;
    let lx = align === 'right' ? x - w : x;
    lx = Math.max(6, Math.min(W - 6 - w, lx));
    text(ctx, s, lx, y, { size: 12, mono: true, weight: 600, color: col });
    return [lx, lx + w];
  }
  function drawTrack(ctx, x0, y0, W, h, c, P, phone) {
    const pad = 16, ppm = (W - 2 * pad) / LEN, X = (m) => pad + m * ppm, ty = y0 + h - 64;
    // track with end stops
    ctx.fillStyle = P.track; ctx.fillRect(pad, ty, W - 2 * pad, 8);
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2; ctx.strokeRect(pad, ty, W - 2 * pad, 8);
    ctx.fillStyle = c.lineHard; ctx.fillRect(pad - 4, ty - 16, 4, 24); ctx.fillRect(W - pad, ty - 16, 4, 24);
    for (let m = 0; m <= LEN + 1e-9; m += 0.2) { ctx.beginPath(); ctx.moveTo(X(m), ty + 8); ctx.lineTo(X(m), ty + (Math.abs(m % 1) < 1e-6 || Math.abs(m % 1 - 1) < 1e-6 ? 15 : 12)); ctx.stroke(); }
    text(ctx, L(T.pos) + ' →', pad, y0 + 18, { size: 12, color: c.text2 });
    text(ctx, T.slow, W - pad, y0 + 18, { size: 12, color: c.text3, align: 'right' });
    const st = at(S.t), tw = TL * ppm;
    const h1 = 16 + 9 * S.m1, h2 = 16 + 9 * S.m2;
    // keep the bodies from drawing over each other while the bumpers are compressed
    let x1 = X(st.x1), x2 = X(st.x2);
    if (x2 - x1 < tw) { const mid = (x1 + x2) / 2; x1 = mid - tw / 2; x2 = mid + tw / 2; }
    if (x1 < X(0) + tw / 2) { x1 = X(0) + tw / 2; x2 = Math.max(x2, x1 + tw); }
    if (x2 > X(LEN) - tw / 2) { x2 = X(LEN) - tw / 2; x1 = Math.min(x1, x2 - tw); }
    trolley(ctx, x1, ty, tw, h1, P.t1, P.t1f, '1', S.m1, c, 'r');
    trolley(ctx, x2, ty, tw, h2, P.t2, P.t2f, '2', S.m2, c, 'l');
    // velocity arrows (length ∝ v) and labels: trolley 1 labels end at its right side, trolley 2 labels start at its left side
    const vs = Math.min(18, ppm * 0.12), ay = ty - Math.max(h1, h2) - 16;
    const cl = (x, dx) => Math.max(8 - x, Math.min(W - 8 - x, dx));
    varrow(ctx, x1, ay, cl(x1, st.v1 * vs), P.t1); varrow(ctx, x2, ay, cl(x2, st.v2 * vs), P.t2);
    const vl = (v) => 'v = ' + sv(v) + ' m·s⁻¹', pl = (m, v) => 'p = ' + sv(m * v) + ' kg·m·s⁻¹';
    // trolley 1 labels end at its right side, trolley 2 labels start at its left side, on separate rows so they never overlap
    const r1 = x1 + tw / 2, l2 = x2 - tw / 2;
    label(ctx, vl(st.v1), r1, ay - 12, 'right', P.t1, W); label(ctx, vl(st.v2), l2, ay - 28, 'left', P.t2, W);
    label(ctx, pl(S.m1, st.v1), r1, ty + 30, 'right', P.t1, W); label(ctx, pl(S.m2, st.v2), l2, ty + 47, 'left', P.t2, W);
    text(ctx, 't = ' + num(S.t, 2) + ' s', pad, y0 + 36, { size: 12, mono: true, color: c.text3 });
  }
  function trolley(ctx, cx, ty, w, hh, col, fill, n, m, c, bump) {
    const wr = Math.max(4, Math.min(7, w * 0.1)), top = ty - hh - wr;
    ctx.fillStyle = c.light ? '#fafaf8' : c.stage; MLX.roundRect(ctx, cx - w / 2, top, w, hh, 4); ctx.fill();
    ctx.fillStyle = fill; ctx.strokeStyle = col; ctx.lineWidth = 1.8; MLX.roundRect(ctx, cx - w / 2, top, w, hh, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = c.light ? c.ink : c.text3; [-0.28, 0.28].forEach(o => { ctx.beginPath(); ctx.arc(cx + o * w, ty - wr, wr, 0, Math.PI * 2); ctx.fill(); });
    text(ctx, n, cx, top + hh / 2 + 5, { size: 13, weight: 700, align: 'center', color: col });
    // facing bumper: spring plunger, or Velcro pads for "stick together"
    const bx = bump === 'r' ? cx + w / 2 : cx - w / 2, sgn = bump === 'r' ? 1 : -1, by = top + hh * 0.45;
    ctx.strokeStyle = col; ctx.lineWidth = 1.4;
    if (S.type === 'stick') { ctx.fillStyle = col; ctx.fillRect(bump === 'r' ? bx : bx - 3, top + 3, 3, hh - 6); }
    else if (bump === 'r') { ctx.beginPath(); ctx.moveTo(bx, by); for (let i = 1; i <= 4; i++) ctx.lineTo(bx + sgn * i * 1.5, by + (i % 2 ? -4 : 4)); ctx.lineTo(bx + sgn * 8, by); ctx.stroke(); ctx.beginPath(); ctx.moveTo(bx + sgn * 8, by - 6); ctx.lineTo(bx + sgn * 8, by + 6); ctx.stroke(); }
  }
  function varrow(ctx, x, y, dx, col) {
    if (Math.abs(dx) < 2) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill(); return; }
    const s = Math.sign(dx), x1 = x + dx;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x1 - s * 6, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1 - s * 9, y - 5); ctx.lineTo(x1 - s * 9, y + 5); ctx.closePath(); ctx.fill();
  }
  function drawGraph(ctx, x0, y0, w, h, c, P) {
    const ax = MLX.axes(ctx, { x0, y0, w, h, xMin: 0, xMax: TMAX, yMin: -10, yMax: 10, xTitle: T.gx, yTitle: T.gy, xTicks: 4, yTicks: 4 });
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(0)); ctx.lineTo(ax.box.x1, ax.Y(0)); ctx.stroke(); ctx.setLineDash([]);
    if (run.tc != null && S.t >= run.tc) {   // shade the contact time
      ctx.fillStyle = c.lineSoft; const xa = ax.X(run.tc), xb = ax.X(Math.min(S.t, run.tc + S.dt)); ctx.fillRect(xa, ax.box.y0, Math.max(1, xb - xa), ax.box.y1 - ax.box.y0);
    }
    const line = (f, col, lw, dash) => {
      ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash(dash || []); ctx.beginPath();
      let first = true;
      for (const s of run.s) { if (s.t > S.t + 1e-9) break; const X = ax.X(s.t), Y = ax.Y(f(s)); first ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y); first = false; }
      ctx.stroke(); ctx.setLineDash([]);
    };
    line(s => S.m1 * s.v1, P.t1, 2.2); line(s => S.m2 * s.v2, P.t2, 2.2); line(s => S.m1 * s.v1 + S.m2 * s.v2, c.ink, 2, [6, 4]);
    // legend
    const lx = ax.box.x1 - 8; let ly = ax.box.y0 + 14;
    [[T.l1, P.t1, []], [T.l2, P.t2, []], [T.lt, c.ink, [6, 4]]].forEach(([t, col, d]) => {
      ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; const tw = ctx.measureText(L(t)).width;
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.setLineDash(d); ctx.beginPath(); ctx.moveTo(lx - tw - 30, ly - 4); ctx.lineTo(lx - tw - 8, ly - 4); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, t, lx, ly, { size: 12, color: c.text2, align: 'right' }); ly += 17;
    });
  }
  function drawBars(ctx, x0, y0, w, h, c, P) {
    const st = at(S.t), p0 = S.m1 * S.v1 + S.m2 * S.v2, pn = S.m1 * st.v1 + S.m2 * st.v2;
    const k0 = 0.5 * S.m1 * S.v1 * S.v1 + 0.5 * S.m2 * S.v2 * S.v2, kn = 0.5 * S.m1 * st.v1 * st.v1 + 0.5 * S.m2 * st.v2 * st.v2;
    const gw = w / 2, top = y0 + 24, bot = y0 + h - 26;
    const group = (gx, title, vals, lo, hi, d) => {
      text(ctx, title, gx + gw / 2, y0 + 12, { size: 12, align: 'center', color: c.text2 });
      const Y = (v) => bot - (v - lo) / (hi - lo) * (bot - top), zy = Y(0);
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx + 8, zy); ctx.lineTo(gx + gw - 8, zy); ctx.stroke();
      const bw = Math.min(34, (gw - 30) / 2);
      vals.forEach(([v, lab, col], i) => {
        const bx = gx + gw / 2 + (i ? 6 : -6 - bw), yv = Y(Math.max(lo, Math.min(hi, v)));
        ctx.fillStyle = col; ctx.fillRect(bx, Math.min(zy, yv), bw, Math.max(1, Math.abs(zy - yv)));
        text(ctx, num(v, d), bx + bw / 2, v >= 0 ? yv - 5 : yv + 15, { size: 12, mono: true, align: 'center', color: c.text });
        text(ctx, lab, bx + bw / 2, bot + 18, { size: 12, align: 'center', color: c.text3 });
      });
    };
    group(x0, T.bP, [[p0, T.before, c.lineHard], [pn, T.now, c.ink]], -10, 10, 1);
    group(x0 + gw, T.bK, [[k0, T.before, c.lineHard], [kn, T.now, c.ink]], 0, 20, 1);
  }

  function update() {
    const st = at(S.t), f = run.f, d1 = (v) => num(v, 1), d2 = (v) => num(v, 2);
    const p0 = S.m1 * S.v1 + S.m2 * S.v2, pn = S.m1 * st.v1 + S.m2 * st.v2;
    const k0 = 0.5 * S.m1 * S.v1 * S.v1 + 0.5 * S.m2 * S.v2 * S.v2, k1 = 0.5 * S.m1 * f.v1f * f.v1f + 0.5 * S.m2 * f.v2f * f.v2f;
    const done = run.meets && run.tc != null && S.t >= run.tc + S.dt - 1e-9;
    prim.set((pn > 0.005 ? '+' : '') + d2(pn));
    ro.set('pb', d2(p0) + ' kg·m·s⁻¹');
    ro.set('pa', done ? d2(S.m1 * f.v1f + S.m2 * f.v2f) + ' kg·m·s⁻¹' : '—');
    ro.set('kb', d2(k0) + ' J');
    ro.set('ka', done ? d2(k1) + ' J' : '—');
    ro.set('kl', done ? d2(k0 - k1) + ' J (' + num(k0 > 0 ? 100 * (k0 - k1) / k0 : 0, 0) + '%)' : '—');
    const J = S.m2 * (f.v2f - S.v2);
    ro.set('J', done ? (J > 0 ? '+' : '') + d2(J) + ' N·s' : '—');
    ro.set('F', done ? (J > 0 ? '+' : '') + d1(J / S.dt) + ' N' : '—');
    const sub = (s) => '<sub>' + s + '</sub>', b = (v) => '(' + d1(v) + ')';
    const lines = [
      'Σp' + sub('i') + ' = m' + sub('1') + 'v' + sub('1i') + ' + m' + sub('2') + 'v' + sub('2i') + ' = ' + d1(S.m1) + b(S.v1) + ' + ' + d1(S.m2) + b(S.v2) + ' = ' + d2(p0),
    ];
    if (run.meets) {
      if (S.type === 'stick') lines.push('v' + sub('f') + ' = Σp/(m' + sub('1') + ' + m' + sub('2') + ') = ' + d2(p0) + '/' + d1(S.m1 + S.m2) + ' = ' + d2(f.v1f) + ' m·s⁻¹');
      else lines.push('v' + sub('1f') + ' = ' + d2(f.v1f) + ' m·s⁻¹,  v' + sub('2f') + ' = ' + d2(f.v2f) + ' m·s⁻¹');
      lines.push('Σp' + sub('f') + ' = ' + d1(S.m1) + b(f.v1f) + ' + ' + d1(S.m2) + b(f.v2f) + ' = ' + d2(S.m1 * f.v1f + S.m2 * f.v2f));
      lines.push('ΣE' + sub('k') + ': ' + d2(k0) + ' J → ' + d2(k1) + ' J');
      lines.push('J = Δp' + sub('2') + ' = m' + sub('2') + '(v' + sub('2f') + ' − v' + sub('2i') + ') = ' + d2(J) + ' N·s');
      lines.push('F = J/Δt = ' + d2(J) + '/' + d2(S.dt) + ' = ' + d1(J / S.dt) + ' N');
    }
    eqEl.innerHTML = lines.map(s => '<div>' + s + '</div>').join('');
    let cap;
    if (!run.meets) cap = T.capNo;
    else if (S.t === 0) cap = T.capReady;
    else if (st.phase === 'before') cap = T.capBefore;
    else if (st.phase === 'contact') cap = T.capDuring;
    else cap = S.type === 'el' ? T.capEl : S.type === 'stick' ? T.capSt : T.capIn;
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. t = ' + d2(S.t) + ' s; v1 = ' + d1(st.v1) + ' m/s, v2 = ' + d1(st.v2) + ' m/s; total momentum ' + d2(pn) + ' kg·m/s; kinetic energy ' + d2(0.5 * S.m1 * st.v1 * st.v1 + 0.5 * S.m2 * st.v2 * st.v2) + ' J.');
    ui.cv.draw();
  }
  reset();
});
