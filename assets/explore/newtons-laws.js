/* Gr11 Newton's laws — a block on a horizontal surface or on an incline, with its free-body diagram.
 * All forces are drawn from the block's centre, length proportional to size, labelled with symbol and value.
 *   Horizontal: w = mg, N = mg, applied force F_A to the right.
 *   Incline:    N = mg cos θ, weight component down the slope mg sin θ (into the slope mg cos θ).
 *   Friction:   at rest, static friction fₛ balances the driving force up to fₛ(max) = μₛN;
 *               once sliding, kinetic friction fₖ = μₖN opposes the motion (μₖ ≤ μₛ).
 *   F_net = ma along the motion (positive: to the right, or down the slope). g = 9,8 m·s⁻².
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const g = 9.8;
  const T = {
    aria: { en: 'A block on a surface with its free-body diagram: weight, normal force, applied force and friction drawn from its centre', af: '\'n Blok op \'n oppervlak met sy vryeliggaamsdiagram: gewig, normaalkrag, toegepaste krag en wrywing vanaf sy middelpunt geteken' },
    acc: { en: 'Acceleration a', af: 'Versnelling a' },
    N: { en: 'Normal force N', af: 'Normaalkrag N' }, fs: { en: 'Static friction fₛ', af: 'Statiese wrywing fₛ' }, fk: { en: 'Kinetic friction fₖ', af: 'Kinetiese wrywing fₖ' },
    f0: { en: 'Friction', af: 'Wrywing' }, net: { en: 'Net force Fnet', af: 'Netto krag Fnet' }, vel: { en: 'Velocity v', af: 'Snelheid v' },
    surf: { en: 'Surface', af: 'Oppervlak' }, flat: { en: 'Horizontal', af: 'Horisontaal' }, incl: { en: 'Incline', af: 'Skuinsvlak' },
    mass: { en: 'Mass m', af: 'Massa m' }, FA: { en: 'Applied force (to the right)', af: 'Toegepaste krag (na regs)' }, ang: { en: 'Angle of the incline θ', af: 'Hoek van die skuinsvlak θ' },
    fric: { en: 'Friction', af: 'Wrywing' }, rough: { en: 'Rough surface (friction acts)', af: 'Growwe oppervlak (wrywing werk)' },
    mus: { en: 'Coefficient of static friction μₛ', af: 'Koëffisiënt van statiese wrywing μₛ' }, muk: { en: 'Coefficient of kinetic friction μₖ', af: 'Koëffisiënt van kinetiese wrywing μₖ' },
    comps: { en: 'Show the components of w', af: 'Wys die komponente van w' }, reset: { en: 'Back to rest', af: 'Terug na rus' },
    work: { en: 'The working, now', af: 'Die berekening, nou' },
    posR: { en: 'positive direction: to the right', af: 'positiewe rigting: na regs' }, posD: { en: 'positive direction: down the slope', af: 'positiewe rigting: teen die skuinsvlak af' },
    res: { en: 'resultant', af: 'resultant' }, notF: { en: '(not an extra force)', af: '(nie \'n ekstra krag nie)' }, zero: { en: 'Fnet = 0', af: 'Fnet = 0' },
    end: { en: 'End of the track: starting again', af: 'Einde van die baan: begin weer' },
    capNoF: { en: 'No applied force: N balances w, nothing pushes along the surface, so there is no friction and the block stays at rest.', af: 'Geen toegepaste krag nie: N balanseer w, niks druk langs die oppervlak nie, dus is daar geen wrywing nie en die blok bly in rus.' },
    capStatic: { en: 'Static friction is exactly as large as the applied force (still below μₛN), so Fnet = 0 and the block stays at rest.', af: 'Statiese wrywing is presies so groot soos die toegepaste krag (nog onder μₛN), dus Fnet = 0 en die blok bly in rus.' },
    capStaticI: { en: 'Static friction holds the block: mg sin θ is not more than μₛN (tan θ ≤ μₛ), so Fnet = 0.', af: 'Statiese wrywing hou die blok vas: mg sin θ is nie meer as μₛN nie (tan θ ≤ μₛ), dus Fnet = 0.' },
    capSlide: { en: 'Sliding: kinetic friction μₖN opposes the motion; what is left over is Fnet, and a = Fnet/m.', af: 'Gly: kinetiese wrywing μₖN werk die beweging teë; wat oorbly is Fnet, en a = Fnet/m.' },
    capSlow: { en: 'The applied force is smaller than kinetic friction: Fnet points backwards, so the block slows down and stops.', af: 'Die toegepaste krag is kleiner as kinetiese wrywing: Fnet wys agtertoe, dus vertraag die blok en stop.' },
    capSmooth: { en: 'No friction: Fnet is the applied force, so a = F/m. Double the mass and the acceleration halves.', af: 'Geen wrywing nie: Fnet is die toegepaste krag, dus a = F/m. Verdubbel die massa en die versnelling halveer.' },
    capSlideI: { en: 'Sliding down: Fnet = mg sin θ − μₖmg cos θ, so a = g(sin θ − μₖ cos θ). The mass cancels: a heavier block has the same acceleration.', af: 'Gly af: Fnet = mg sin θ − μₖmg cos θ, dus a = g(sin θ − μₖ cos θ). Die massa kanselleer: \'n swaarder blok het dieselfde versnelling.' },
    capSmoothI: { en: 'No friction: a = g sin θ, whatever the mass.', af: 'Geen wrywing nie: a = g sin θ, wat ook al die massa is.' },
  };
  const S = { mode: 'flat', m: 5, F: 60, th: 30, mus: 0.3, muk: 0.2, rough: true, comps: true, v: 0, s: 0, hold: 0 };
  const TRACK = { flat: 20, incline: 5 };   // metres travelled before the run starts again

  // Forces for the current state (all magnitudes in N; driving and Fnet positive along the motion direction)
  function forces() {
    const th = S.th * Math.PI / 180, w = S.m * g;
    const N = S.mode === 'flat' ? w : w * Math.cos(th);
    const drive = S.mode === 'flat' ? S.F : w * Math.sin(th);
    let f = 0, kind = 'none';
    if (S.rough) {
      if (S.v <= 1e-9 && drive <= S.mus * N + 1e-9) { f = drive; kind = 's'; }
      else { f = S.muk * N; kind = 'k'; }
    }
    if (kind === 's' && f < 1e-9) kind = 'none';
    const Fnet = kind === 's' ? 0 : drive - f;
    return { w, N, drive, f, kind, Fnet, a: Fnet / S.m, th, par: w * Math.sin(th), perp: w * Math.cos(th) };
  }

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 400 : Math.max(380, Math.min(450, Math.round(w * 0.5))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.acc, unit: 'm·s⁻²' });
  const ro = MLX.readout(prim.el, [['N', T.N], ['f', T.f0], ['net', T.net], ['v', T.vel]]);
  const c1 = MLX.card(ui.side, T.surf);
  MLX.seg(c1, { options: [['flat', T.flat], ['incline', T.incl]], value: S.mode, onChange: (v) => { S.mode = v; vis(); rest(); } });
  MLX.slider(c1, { label: T.mass, min: 1, max: 20, step: 1, value: S.m, fmt: (v) => v + ' kg', onInput: (v) => { S.m = v; update(); } });
  const sF = MLX.slider(c1, { label: T.FA, min: 0, max: 200, step: 5, value: S.F, fmt: (v) => v + ' N', onInput: (v) => { S.F = v; update(); } });
  const sA = MLX.slider(c1, { label: T.ang, min: 0, max: 50, step: 1, value: S.th, fmt: (v) => v + '°', onInput: (v) => { S.th = v; rest(); } });
  const cComp = MLX.check(c1, { label: T.comps, value: S.comps, onChange: (v) => { S.comps = v; ui.cv.draw(); } });
  const c2 = MLX.card(ui.side, T.fric);
  MLX.check(c2, { label: T.rough, value: S.rough, onChange: (v) => { S.rough = v; update(); } });
  const sMs = MLX.slider(c2, { label: T.mus, min: 0, max: 1, step: 0.05, value: S.mus, fmt: (v) => num(v, 2), onInput: (v) => { S.mus = v; if (S.muk > v) { S.muk = v; sMk.set(v); } update(); } });
  const sMk = MLX.slider(c2, { label: T.muk, min: 0, max: 1, step: 0.05, value: S.muk, fmt: (v) => num(v, 2), onInput: (v) => { S.muk = v; if (S.mus < v) { S.mus = v; sMs.set(v); } update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c2.appendChild(bt);
  MLX.button(bt, T.reset, rest, 'primary');
  const c3 = MLX.card(ui.side, T.work);
  const eqEl = MLX.h('div', { class: 'mlx-note', style: 'font-family:var(--fm,"JetBrains Mono",monospace);line-height:1.9;font-size:13px' }); c3.appendChild(eqEl);

  function vis() {
    sF.el.style.display = S.mode === 'flat' ? '' : 'none';
    sA.el.style.display = cComp.el.style.display = S.mode === 'incline' ? '' : 'none';
  }
  function rest() { S.v = 0; S.s = 0; S.hold = 0; update(); }
  vis();

  MLX.loop(ui.cv.el, (dt) => {
    if (MLX.reducedMotion) return;
    if (S.hold > 0) { S.hold -= dt; if (S.hold <= 0) { S.v = 0; S.s = 0; S.hold = 0; } update(); return; }
    const F = forces();
    if (F.kind === 's' || (F.a <= 0 && S.v <= 0)) { if (S.v !== 0) { S.v = 0; update(); } return; }
    S.v += F.a * dt;
    if (S.v < 0) S.v = 0;                       // kinetic friction can stop the block, never push it back
    S.s += S.v * dt;
    if (S.s >= TRACK[S.mode]) { S.s = TRACK[S.mode]; S.hold = 1.2; }
    update();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  // ---------- drawing ----------
  function pal(c) {
    return c.light ? { w: '#b8322a', N: '#1f7a3a', F: '#1d5fc4', f: '#9a5f00', block: '#e9e7e2', ground: '#efeeea' }
      : { w: '#f47c74', N: '#5fd38a', F: '#6aa8f7', f: '#f5b23d', block: '#262b33', ground: '#161a20' };
  }
  // text with one subscript: rich(ctx, [['F',''],['A','sub'],[' = 60 N','']], x, y, {align,color})
  function rich(ctx, parts, x, y, o) {
    const size = o.size || (Wc < 640 ? 12 : 13), w = parts.reduce((s, [t, k]) => { ctx.font = '600 ' + (k ? size - 3 : size) + 'px "JetBrains Mono", monospace'; return s + ctx.measureText(L(t)).width; }, 0);
    let cx = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
    cx = Math.max(4, Math.min(Wc - 4 - w, cx));   // never past the canvas edge
    parts.forEach(([t, k]) => {
      ctx.font = '600 ' + (k ? size - 3 : size) + 'px "JetBrains Mono", monospace'; ctx.fillStyle = o.color; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(L(t), cx, k ? y + 4 : y); cx += ctx.measureText(L(t)).width;
    });
    return w;
  }
  function arrow(ctx, x0, y0, ux, uy, len, col, dash, parts, c, side) {
    if (len < 1) return;
    const hl = Math.min(11, len * 0.6), x1 = x0 + ux * len, y1 = y0 + uy * len;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = dash ? 1.8 : 2.6; ctx.setLineDash(dash ? [5, 4] : []);
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - ux * hl * 0.7, y1 - uy * hl * 0.7); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * hl - uy * hl * 0.45, y1 - uy * hl + ux * hl * 0.45); ctx.lineTo(x1 - ux * hl + uy * hl * 0.45, y1 - uy * hl - ux * hl * 0.45); ctx.closePath(); ctx.fill();
    if (parts) {
      // keep the label clear of the block: at least the distance from the centre to the block's edge along this arrow
      let d = len;
      if (box) { const a1 = Math.abs(ux * box.e1x + uy * box.e1y), a2 = Math.abs(ux * box.e2x + uy * box.e2y);
        d = Math.max(len, Math.min(a1 > 1e-6 ? box.hw / a1 : 1e9, a2 > 1e-6 ? box.hh / a2 : 1e9) + 4); }
      if (side) { rich(ctx, parts, x1 + (side === 'l' ? -10 : 10), y1 - 6, { align: side === 'l' ? 'right' : 'left', color: col }); return; }
      const lx = x0 + ux * (d + 12), ly = y0 + uy * (d + 14);
      const align = Math.abs(ux) < 0.35 ? 'center' : ux > 0 ? 'left' : 'right';
      rich(ctx, parts, lx, ly + (Math.abs(ux) < 0.35 ? (uy > 0 ? 4 : -4) : 0), { align, color: col });
    }
  }
  let box = null, Wc = 800;
  const N1 = (v) => num(v, v >= 100 ? 0 : 1);

  function draw(ctx, W, H) {
    const c = MLX.colors(), P = pal(c), F = forces();
    Wc = W;
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const phone = W < 640;
    const list = [F.w, F.N, S.mode === 'flat' ? S.F : 0, F.f];
    const maxF = Math.max(1, ...list);
    let cx, cy, ux, uy, nx, ny, R;   // block centre, down-the-motion unit vector, outward normal
    const bw = phone ? 64 : 84, bh = phone ? 44 : 56;
    if (S.mode === 'flat') {
      const gy = Math.round(H * 0.56);
      ux = 1; uy = 0; nx = 0; ny = -1;
      cx = W / 2; cy = gy - bh / 2;
      R = Math.min(H * 0.36 - 10, W / 2 - (phone ? 100 : 130));
      // ground with hatching that slides past as the block moves
      ctx.fillStyle = P.ground; ctx.fillRect(0, gy, W, 16);
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      const ppm = 40, off = (S.s * ppm) % 20;
      ctx.lineWidth = 1; ctx.strokeStyle = c.line;
      for (let x = -off - 20; x < W + 20; x += 20) { ctx.beginPath(); ctx.moveTo(x, gy + 16); ctx.lineTo(x + 12, gy + 2); ctx.stroke(); }
      ctx.fillStyle = P.block; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5;
      MLX.roundRect(ctx, cx - bw / 2, cy - bh / 2, bw, bh, 5); ctx.fill(); ctx.stroke();
      text(ctx, S.m + ' kg', cx - bw / 2 + 8, cy - bh / 2 + 16, { size: 12, color: c.text2, mono: true });
      text(ctx, T.posR, 14, H - 14, { size: 12, color: c.text3 });
    } else {
      const th = F.th, tn = Math.tan(th);
      const base = th > 0.01 ? Math.min(W * 0.84, (H * 0.6) / tn) : W * 0.84, hgt = base * tn;
      const Ax = (W - base) / 2, gy = H - 40, Cx = Ax + base, Cy = gy - hgt;
      ux = -Math.cos(th); uy = Math.sin(th);          // down the slope (to the left)
      nx = -Math.sin(th); ny = -Math.cos(th);         // perpendicular, away from the slope
      ctx.fillStyle = P.ground; ctx.beginPath(); ctx.moveTo(Ax, gy); ctx.lineTo(Cx, gy); ctx.lineTo(Cx, Cy); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      // marks on the slope surface slide past as the block moves
      const ppm = 40, sp = 24, off = (S.s * ppm) % sp, len = Math.hypot(base, hgt);
      ctx.save(); ctx.beginPath(); ctx.moveTo(Ax, gy); ctx.lineTo(Cx, gy); ctx.lineTo(Cx, Cy); ctx.closePath(); ctx.clip();
      ctx.strokeStyle = c.line; ctx.lineWidth = 1;
      for (let d = off; d < len; d += sp) { const px = Cx + ux * d, py = Cy + uy * d; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - nx * 10, py - ny * 10); ctx.stroke(); }
      ctx.restore();
      if (th > 0.01) {
        ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(Ax, gy, 34, -th, 0); ctx.stroke();
        if (Ax > 78) text(ctx, 'θ = ' + S.th + '°', Ax - 8, gy - 6, { size: 12, mono: true, color: c.text2, align: 'right' });
        else text(ctx, 'θ = ' + S.th + '°', Ax + 40, gy - 6, { size: 12, mono: true, color: c.text2 });
      }
      // block at the middle of the slope, its centre bh/2 off the surface
      const mx = Ax + base * 0.52, my = gy - hgt * 0.52;
      cx = mx + nx * bh / 2; cy = my + ny * bh / 2;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-th);
      ctx.fillStyle = P.block; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5;
      MLX.roundRect(ctx, -bw / 2, -bh / 2, bw, bh, 5); ctx.fill(); ctx.stroke();
      text(ctx, S.m + ' kg', -bw / 2 + 8, -bh / 2 + 16, { size: 12, color: c.text2, mono: true });
      ctx.restore();
      R = Math.min(H * 0.3, W * 0.22, (gy - 6 - cy) * maxF / F.w);   // the weight arrow must end above the ground
      text(ctx, T.posD, 14, H - 14, { size: 12, color: c.text3 });
    }
    const k = R / maxF;
    const rot = S.mode === 'flat' ? 0 : F.th;
    box = { hw: bw / 2, hh: bh / 2, e1x: Math.cos(rot), e1y: -Math.sin(rot), e2x: Math.sin(rot), e2y: Math.cos(rot) };
    // free-body diagram: every force from the centre of the block
    if (S.mode === 'incline' && S.comps && F.th > 0.01) {
      arrow(ctx, cx, cy, ux, uy, F.par * k, P.w, true, [['mg sin θ = ' + N1(F.par) + ' N', '']], c);
      arrow(ctx, cx, cy, -nx, -ny, F.perp * k, P.w, true, [['mg cos θ = ' + N1(F.perp) + ' N', '']], c, 'r');
    }
    arrow(ctx, cx, cy, 0, 1, F.w * k, P.w, false, [['w = ' + N1(F.w) + ' N', '']], c, S.mode === 'incline' ? 'l' : null);
    arrow(ctx, cx, cy, nx, ny, F.N * k, P.N, false, [['N = ' + N1(F.N) + ' N', '']], c);
    if (S.mode === 'flat' && S.F > 0) arrow(ctx, cx, cy, 1, 0, S.F * k, P.F, false, [['F', ''], ['A', 's'], [' = ' + S.F + ' N', '']], c);
    if (F.kind !== 'none' && F.f > 1e-6) arrow(ctx, cx, cy, -ux, -uy, F.f * k, P.f, false, [['f', ''], [F.kind, 's'], [' = ' + N1(F.f) + ' N', '']], c);
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2); ctx.fill();
    // the resultant, drawn apart from the diagram (it is not another force)
    const rx = 16, ry = 26;
    text(ctx, L(T.res) + ' ' + L(T.notF), rx, ry - 2, { size: 12, color: c.text3 });
    if (Math.abs(F.Fnet) < 0.05) rich(ctx, [['F', ''], ['net', 's'], [' = 0', '']], rx, ry + 20, { color: c.ink });
    else {
      const dir = Math.sign(F.Fnet), L0 = Math.max(14, Math.min(Math.abs(F.Fnet) * k, W * 0.36));
      const ax = S.mode === 'flat' ? dir : ux * dir, ay = S.mode === 'flat' ? 0 : uy * dir, top = ry + 16;
      const x0 = ax >= 0 ? rx : rx + L0 * -ax, y0 = ay >= 0 ? top : top + L0 * -ay;
      box = null; arrow(ctx, x0, y0, ax, ay, L0, c.ink, false, null, c);
      rich(ctx, [['F', ''], ['net', 's'], [' = ' + N1(Math.abs(F.Fnet)) + ' N', '']], rx + L0 * Math.abs(ax) + 14, top + L0 * Math.abs(ay) / 2 + (ay ? 0 : 0), { color: c.ink });
    }
    if (S.hold > 0) text(ctx, T.end, W - 14, 22, { size: 12, color: c.text3, align: 'right' });
  }

  function update() {
    const F = forces(), d = (v) => num(v, 2), n1 = (v) => num(v, 1);
    const a = F.kind === 's' ? 0 : F.a;
    prim.set(num(a, 2));
    ro.set('N', n1(F.N) + ' N');
    ro.set('f', F.kind === 'none' ? '0 N' : (F.kind === 's' ? 'fₛ = ' : 'fₖ = ') + n1(F.f) + ' N');
    ro.set('net', n1(F.Fnet) + ' N');
    let vShow = S.v;
    if (MLX.reducedMotion && F.Fnet > 0) vShow = Math.sqrt(2 * F.a * TRACK[S.mode]);
    ro.set('v', d(vShow) + ' m·s⁻¹');
    const sub = (s) => '<sub>' + s + '</sub>';
    const lines = [];
    const fmax = S.mus * F.N;
    if (S.mode === 'flat') {
      lines.push('w = mg = ' + S.m + ' × 9,8 = ' + n1(F.w) + ' N');
      lines.push('N = w = ' + n1(F.N) + ' N');
      if (S.rough) {
        lines.push('f' + sub('s,max') + ' = μ' + sub('s') + 'N = ' + d(S.mus) + ' × ' + n1(F.N) + ' = ' + n1(fmax) + ' N');
        if (F.kind === 's') lines.push('F' + sub('A') + ' ≤ f' + sub('s,max') + ': f' + sub('s') + ' = F' + sub('A') + ' = ' + n1(F.f) + ' N, F' + sub('net') + ' = 0');
        else if (F.kind === 'k') { lines.push('f' + sub('k') + ' = μ' + sub('k') + 'N = ' + d(S.muk) + ' × ' + n1(F.N) + ' = ' + n1(F.f) + ' N'); lines.push('F' + sub('net') + ' = F' + sub('A') + ' − f' + sub('k') + ' = ' + S.F + ' − ' + n1(F.f) + ' = ' + n1(F.Fnet) + ' N'); }
      } else lines.push('F' + sub('net') + ' = F' + sub('A') + ' = ' + S.F + ' N');
    } else {
      lines.push('N = mg cos θ = ' + S.m + ' × 9,8 × cos ' + S.th + '° = ' + n1(F.N) + ' N');
      lines.push('mg sin θ = ' + S.m + ' × 9,8 × sin ' + S.th + '° = ' + n1(F.par) + ' N');
      if (S.rough) {
        lines.push('f' + sub('s,max') + ' = μ' + sub('s') + 'N = ' + d(S.mus) + ' × ' + n1(F.N) + ' = ' + n1(fmax) + ' N');
        if (F.kind === 's') lines.push('mg sin θ ≤ f' + sub('s,max') + ': f' + sub('s') + ' = ' + n1(F.f) + ' N, F' + sub('net') + ' = 0');
        else if (F.kind === 'k') { lines.push('f' + sub('k') + ' = μ' + sub('k') + 'N = ' + d(S.muk) + ' × ' + n1(F.N) + ' = ' + d(F.f) + ' N'); lines.push('F' + sub('net') + ' = mg sin θ − f' + sub('k') + ' = ' + n1(F.Fnet) + ' N'); }
      } else lines.push('F' + sub('net') + ' = mg sin θ = ' + n1(F.Fnet) + ' N');
    }
    lines.push('a = F' + sub('net') + '/m = ' + n1(F.kind === 's' ? 0 : F.Fnet) + ' / ' + S.m + ' = ' + d(F.kind === 's' ? 0 : F.Fnet / S.m) + ' m·s⁻²');
    eqEl.innerHTML = lines.map(s => '<div>' + (MLX.af ? s.replace(/9\.8/g, '9,8') : s.replace(/9,8/g, '9.8')) + '</div>').join('');
    let cap;
    if (S.mode === 'flat') {
      if (S.F === 0 && S.v <= 0) cap = T.capNoF;
      else if (!S.rough) cap = T.capSmooth;
      else if (F.kind === 's') cap = T.capStatic;
      else cap = F.Fnet < 0 ? T.capSlow : T.capSlide;
    } else {
      if (!S.rough) cap = T.capSmoothI;
      else if (F.kind === 's' || F.kind === 'none') cap = T.capStaticI;
      else cap = T.capSlideI;
    }
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. m = ' + S.m + ' kg, ' + (S.mode === 'flat' ? 'F = ' + S.F + ' N' : 'θ = ' + S.th + '°') + ', N = ' + n1(F.N) + ' N, ' + L(T.f0).toLowerCase() + ' ' + n1(F.f) + ' N, Fnet = ' + n1(F.Fnet) + ' N, a = ' + d(F.kind === 's' ? 0 : F.a) + ' m/s².');
    ui.cv.draw();
  }
  update();
});
