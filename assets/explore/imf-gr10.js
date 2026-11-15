/* Gr10 Intermolecular forces — particles in the solid, liquid and gas phase, and how IMF strength sets the
 * melting and boiling points. Real melting/boiling points at standard pressure (°C):
 *   CH₄ −182 / −161,5 (16 g·mol⁻¹, London only)      HCl −114 / −85 (36,5, dipole-dipole + London)
 *   HI −51 / −35 (128, dipole-dipole + London)       Br₂ −7 / 59 (160, London)      I₂ 114 / 184 (254, London)
 *   HF −84 / 19,5 (20, hydrogen bonds)               H₂O 0 / 100 (18, hydrogen bonds)
 * Below the melting point the molecules sit in a lattice and only vibrate; between mp and bp they are still close
 * together but move past one another; above bp the IMF are overcome and they spread through the container.
 * Only the forces BETWEEN molecules are overcome: the covalent bonds inside each molecule stay intact.
 * Molecules move faster as T rises (speed ∝ √T in kelvin); dashed lines show the IMF between close neighbours.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const F = {
    ldf: { en: 'London forces', af: 'Londonkragte' }, dd: { en: 'dipole-dipole forces', af: 'dipool-dipoolkragte' }, hb: { en: 'hydrogen bonds', af: 'waterstofbindings' },
    ddL: { en: 'dipole-dipole + London', af: 'dipool-dipool + London' }, hbL: { en: 'hydrogen bonds + London', af: 'waterstofbindings + London' }, ldfL: { en: 'London forces only', af: 'net Londonkragte' },
  };
  // atoms: [element, x, y] in units of the molecule radius
  const SUB = {
    CH4: { f: 'CH₄', n: { en: 'Methane', af: 'Metaan' }, M: 16, mp: -182, bp: -161.5, imf: 'ldf', atoms: [['C', 0, 0], ['H', -0.62, -0.5], ['H', 0.62, -0.5], ['H', -0.5, 0.62], ['H', 0.55, 0.55]] },
    HCl: { f: 'HCl', n: { en: 'Hydrogen chloride', af: 'Waterstofchloried' }, M: 36.5, mp: -114, bp: -85, imf: 'dd', atoms: [['Cl', 0.22, 0], ['H', -0.62, 0]] },
    HI: { f: 'HI', n: { en: 'Hydrogen iodide', af: 'Waterstofjodied' }, M: 128, mp: -51, bp: -35, imf: 'dd', atoms: [['I', 0.2, 0], ['H', -0.78, 0]] },
    Br2: { f: 'Br₂', n: { en: 'Bromine', af: 'Broom' }, M: 160, mp: -7, bp: 59, imf: 'ldf', atoms: [['Br', -0.42, 0], ['Br', 0.42, 0]] },
    I2: { f: 'I₂', n: { en: 'Iodine', af: 'Jodium' }, M: 254, mp: 114, bp: 184, imf: 'ldf', atoms: [['I', -0.46, 0], ['I', 0.46, 0]] },
    HF: { f: 'HF', n: { en: 'Hydrogen fluoride', af: 'Waterstoffluoried' }, M: 20, mp: -84, bp: 19.5, imf: 'hb', atoms: [['F', 0.16, 0], ['H', -0.6, 0]] },
    H2O: { f: 'H₂O', n: { en: 'Water', af: 'Water' }, M: 18, mp: 0, bp: 100, imf: 'hb', atoms: [['O', 0, -0.12], ['H', -0.62, 0.38], ['H', 0.62, 0.38]] },
  };
  const ORDER = ['CH4', 'HCl', 'HI', 'Br2', 'I2', 'HF', 'H2O'];
  const AR = { H: 0.36, C: 0.5, O: 0.5, F: 0.48, Cl: 0.6, Br: 0.62, I: 0.7 };
  const T = {
    aria: { en: 'Molecules of the chosen substance in a container, and a chart of the melting and boiling points of seven substances', af: 'Molekules van die gekose stof in \'n houer, en \'n grafiek van die smelt- en kookpunte van sewe stowwe' },
    prim: { en: 'State at this temperature', af: 'Toestand by hierdie temperatuur' },
    imf: { en: 'Forces between molecules', af: 'Kragte tussen molekules' }, M: { en: 'Molar mass', af: 'Molêre massa' }, mp: { en: 'Melting point', af: 'Smeltpunt' }, bp: { en: 'Boiling point', af: 'Kookpunt' },
    sub: { en: 'Substance', af: 'Stof' }, conds: { en: 'Choose a substance', af: 'Kies \'n stof' }, temp: { en: 'Temperature', af: 'Temperatuur' },
    solid: { en: 'solid', af: 'vaste stof' }, liquid: { en: 'liquid', af: 'vloeistof' }, gas: { en: 'gas', af: 'gas' },
    bond: { en: 'covalent bond (inside a molecule)', af: 'kovalente binding (binne \'n molekuul)' }, force: { en: 'intermolecular force (between molecules)', af: 'intermolekulêre krag (tussen molekules)' },
    yT: { en: 'Temperature (°C)', af: 'Temperatuur (°C)' }, xS: { en: 'Substance', af: 'Stof' }, now: { en: 'now', af: 'nou' },
    cS: { en: '{n} is a solid at {t}: the {f} hold the molecules in fixed positions, so they can only vibrate.', af: '{n} is \'n vaste stof by {t}: die {f} hou die molekules in vaste posisies, dus kan hulle net vibreer.' },
    cL: { en: '{n} is a liquid at {t}: the molecules move past one another, but the {f} still keep them close together.', af: '{n} is \'n vloeistof by {t}: die molekules beweeg verby mekaar, maar die {f} hou hulle steeds naby mekaar.' },
    cG: { en: '{n} is a gas at {t}: above its boiling point ({b}) the {f} are overcome and the molecules spread out, but the bonds inside each molecule do not break.', af: '{n} is \'n gas by {t}: bo sy kookpunt ({b}) word die {f} oorkom en die molekules versprei, maar die bindings binne elke molekuul breek nie.' },
  };
  const deg = (v) => num(v, v % 1 ? 1 : 0) + ' °C';
  const N = 18;
  const S = { k: 'H2O', T: 25, t: 0, P: [] };
  const sub = () => SUB[S.k];
  const state = (s, t) => t < s.mp ? 'solid' : t < s.bp ? 'liquid' : 'gas';

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 560 : Math.max(380, Math.min(440, Math.round(w * 0.58))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.prim, unit: '' });
  const ro = MLX.readout(prim.el, [['f', T.imf], ['M', T.M], ['mp', T.mp], ['bp', T.bp]]);
  const c1 = MLX.card(ui.side, T.conds);
  MLX.seg(c1, { label: T.sub, options: ORDER.map(k => [k, SUB[k].f]), value: S.k, onChange: (v) => { S.k = v; update(); } });
  MLX.slider(c1, { label: T.temp, min: -200, max: 200, step: 1, value: S.T, fmt: (v) => num(v, 0) + ' °C', onInput: (v) => { S.T = v; update(); } });
  MLX.loop(ui.cv.el, (dt) => { if (!MLX.reducedMotion) { S.t += dt; step(dt); ui.cv.draw(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  // ── particle model (box coordinates in px, set from the current box size) ──
  let box = { w: 300, h: 220, r: 14 };
  function homes() {
    const cols = 6, sp = box.r * 2.5, x0 = box.w / 2 - (cols - 1) * sp / 2, y0 = box.h - box.r * 1.4;
    return Array.from({ length: N }, (_, i) => ({ x: x0 + (i % cols) * sp, y: y0 - Math.floor(i / cols) * sp }));
  }
  let rs = 11;
  const rnd = () => { rs = (rs * 9301 + 49297) % 233280; return rs / 233280; };
  function seed() {
    const H = homes();
    S.P = H.map((p) => ({ x: p.x, y: p.y, vx: rnd() - 0.5, vy: rnd() - 0.5, a: (rnd() - 0.5) * 0.6, w: rnd() - 0.5, ph: rnd() * 6.28 }));
    settle();
  }
  // reduced motion (or a big jump): place the particles straight into a typical arrangement for the state
  function settle() {
    const st = state(sub(), S.T), H = homes();
    S.P.forEach((p, i) => {
      if (st === 'solid') { p.x = H[i].x; p.y = H[i].y; p.a = 0; }
      else if (st === 'liquid') { const lt = liqTop(); p.x = box.r + rnd() * (box.w - 2 * box.r); p.y = lt + box.r + rnd() * (box.h - lt - 2 * box.r); p.a = rnd() * 6.28; }
      else { p.x = box.r + rnd() * (box.w - 2 * box.r); p.y = box.r + rnd() * (box.h - 2 * box.r); p.a = rnd() * 6.28; }
    });
    for (let k = 0; k < 40; k++) separate(1);
  }
  const liqTop = () => box.h - Math.max(box.r * 4.6, N * Math.pow(box.r * 2.45, 2) / box.w);
  function separate(f) {
    const d0 = box.r * 2.05;
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = S.P[i], b = S.P[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.01;
      if (d < d0) {
        const push = (d0 - d) / 2 * f, ux = dx / d, uy = dy / d;
        a.x -= ux * push; a.y -= uy * push; b.x += ux * push; b.y += uy * push;
        if (f < 1) { const vn = (b.vx - a.vx) * ux + (b.vy - a.vy) * uy; if (vn < 0) { a.vx += vn * ux; a.vy += vn * uy; b.vx -= vn * ux; b.vy -= vn * uy; } }
      }
    }
  }
  function step(dt) {
    const s = sub(), st = state(s, S.T), H = homes(), TK = S.T + 273;
    const v = box.r * 9 * Math.sqrt(TK / 300); // typical speed in px per second
    S.P.forEach((p, i) => {
      if (st === 'solid') {
        const A = box.r * (0.05 + 0.18 * TK / (s.mp + 273));
        const tx = H[i].x + A * Math.sin(S.t * 13 + p.ph), ty = H[i].y + A * Math.cos(S.t * 11 + p.ph * 1.3);
        const k = Math.min(1, dt * 5); p.x += (tx - p.x) * k; p.y += (ty - p.y) * k;
        p.a += (0.12 * Math.sin(S.t * 9 + p.ph) - p.a) * k; p.vx = 0; p.vy = 0;
      } else {
        const vs = st === 'liquid' ? v * 0.45 : v;
        p.vx += (rnd() - 0.5) * vs * 0.8; p.vy += (rnd() - 0.5) * vs * 0.8;
        if (st === 'liquid' && p.y < liqTop() + box.r) p.vy += box.r * 40 * dt;
        const sp = Math.hypot(p.vx, p.vy) || 1; p.vx *= vs / sp; p.vy *= vs / sp;
        p.x += p.vx * dt; p.y += p.vy * dt; p.a += p.w * dt * (st === 'gas' ? 4 : 2);
        if (p.x < box.r) { p.x = box.r; p.vx = Math.abs(p.vx); } if (p.x > box.w - box.r) { p.x = box.w - box.r; p.vx = -Math.abs(p.vx); }
        if (p.y < box.r) { p.y = box.r; p.vy = Math.abs(p.vy); } if (p.y > box.h - box.r) { p.y = box.h - box.r; p.vy = -Math.abs(p.vy); }
      }
    });
    if (st !== 'solid') separate(0.5);
  }

  let c, ctx;
  const ACOL = (e) => c.light
    ? { H: '#f1f2f4', C: '#4b5563', O: '#dc2626', F: '#65a30d', Cl: '#16a34a', Br: '#9a3412', I: '#7c3aed' }[e]
    : { H: '#e5e7eb', C: '#6b7280', O: '#ef4444', F: '#a3e635', Cl: '#4ade80', Br: '#c2410c', I: '#a78bfa' }[e];
  const STC = () => c.light ? { solid: 'rgba(37,99,235,0.30)', liquid: 'rgba(13,148,136,0.30)', gas: 'rgba(22,24,29,0.05)' } : { solid: 'rgba(96,165,250,0.34)', liquid: 'rgba(45,212,191,0.28)', gas: 'rgba(255,255,255,0.04)' };
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 640) { const aw = Math.round(W * 0.52); scene(0, 0, aw, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); chart(aw + 4, 0, W - aw - 4, H); }
    else { const sh = Math.round(H * 0.5); scene(0, 0, W, sh); chart(0, sh, W, H - sh); }
  }
  function molecule(p, s, R) {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
    const at = s.atoms;
    // covalent bonds: solid sticks from the first (central) atom to the others
    ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.55)' : 'rgba(226,232,240,0.6)'; ctx.lineWidth = 2;
    for (let j = 1; j < at.length; j++) { ctx.beginPath(); ctx.moveTo(at[0][1] * R * 1.12, at[0][2] * R * 1.12); ctx.lineTo(at[j][1] * R * 1.12, at[j][2] * R * 1.12); ctx.stroke(); }
    at.slice().sort((a, b) => AR[b[0]] - AR[a[0]]).forEach(([e, x, y]) => {
      ctx.fillStyle = ACOL(e); ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.45)' : 'rgba(0,0,0,0.45)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x * R * 1.12, y * R * 1.12, AR[e] * R * 0.82, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    });
    ctx.restore();
  }
  function scene(x0, y0, w, h) {
    const s = sub(), st = state(s, S.T);
    const bx = x0 + 18, by = y0 + 34, bw = w - 36, bh = h - by - 50;
    const r = Math.max(10, Math.min(21, Math.sqrt(bw * bh / N) * 0.22));
    if (Math.abs(box.w - bw) > 1 || Math.abs(box.h - bh) > 1 || Math.abs(box.r - r) > 0.5 || !S.P.length) { box = { w: bw, h: bh, r }; seed(); }
    text(ctx, L(s.n) + ', ' + s.f + ' — ' + deg(S.T), x0 + 14, y0 + 22, { size: 14, weight: 700, color: c.text });
    // container
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(bx, by - 4); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by - 4); ctx.stroke();
    ctx.save(); ctx.translate(bx, by);
    // intermolecular forces between close neighbours (stronger IMF drawn heavier)
    {
      const lim = box.r * (st === 'solid' ? 2.8 : 2.75), lw = s.imf === 'hb' ? 2 : s.imf === 'dd' ? 1.5 : 1.1;
      ctx.setLineDash([3, 4]); ctx.strokeStyle = c.accent; ctx.lineWidth = lw; ctx.globalAlpha = c.light ? 0.8 : 0.7;
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const a = S.P[i], b = S.P[j], d = Math.hypot(b.x - a.x, b.y - a.y);
        if (d < lim) { const ux = (b.x - a.x) / d, uy = (b.y - a.y) / d, g = box.r * 0.75; ctx.beginPath(); ctx.moveTo(a.x + ux * g, a.y + uy * g); ctx.lineTo(b.x - ux * g, b.y - uy * g); ctx.stroke(); }
      }
      ctx.setLineDash([]); ctx.globalAlpha = 1;
    }
    S.P.forEach(p => molecule(p, s, box.r));
    ctx.restore();
    // key
    const ky = y0 + h - 30;
    ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.55)' : 'rgba(226,232,240,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 + 18, ky - 4); ctx.lineTo(x0 + 36, ky - 4); ctx.stroke();
    text(ctx, T.bond, x0 + 44, ky, { size: 12, color: c.text2 });
    ctx.setLineDash([3, 4]); ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 + 18, ky + 14); ctx.lineTo(x0 + 36, ky + 14); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, T.force, x0 + 44, ky + 18, { size: 12, color: c.text2 });
  }
  // melting and boiling points of all seven substances as solid / liquid / gas bands, with the current temperature
  function chart(x0, y0, w, h) {
    const sc = STC();
    // state key along the top
    let kx = x0 + 52; const ky = y0 + 22;
    ['solid', 'liquid', 'gas'].forEach(k => {
      ctx.fillStyle = sc[k]; ctx.fillRect(kx, ky - 10, 14, 12); ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.strokeRect(kx + 0.5, ky - 9.5, 13, 11);
      text(ctx, T[k], kx + 19, ky, { size: 12, color: c.text2 }); ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; kx += 19 + ctx.measureText(L(T[k])).width + 16;
    });
    const n = ORDER.length;
    const ax = MLX.axes(ctx, { x0, y0: y0 + 30, w, h: h - 30, xMin: 0, xMax: n, yMin: -200, yMax: 200, xTitle: T.xS, yTitle: T.yT, xTicks: n, yTicks: 8, fmtX: () => '' });
    const bw = (ax.X(1) - ax.X(0)) * 0.56;
    ORDER.forEach((k, i) => {
      const s = SUB[k], xc = ax.X(i + 0.5), sel = k === S.k;
      const seg = (a, b, col) => { const ya = ax.Y(Math.max(-200, Math.min(200, a))), yb = ax.Y(Math.max(-200, Math.min(200, b))); ctx.fillStyle = col; ctx.fillRect(xc - bw / 2, yb, bw, ya - yb); };
      seg(-200, s.mp, sc.solid); seg(s.mp, s.bp, sc.liquid); seg(s.bp, 200, sc.gas);
      ctx.strokeStyle = sel ? c.ink : c.line; ctx.lineWidth = sel ? 2 : 1; ctx.strokeRect(xc - bw / 2, ax.Y(200), bw, ax.Y(-200) - ax.Y(200));
      text(ctx, s.f, xc, ax.box.y1 + 16, { size: 12, weight: sel ? 700 : 500, align: 'center', color: sel ? c.ink : c.text2 });
    });
    // current temperature line
    const yT = ax.Y(S.T);
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(ax.box.x0, yT); ctx.lineTo(ax.box.x1, yT); ctx.stroke(); ctx.setLineDash([]);
    const lab = deg(S.T);
    ctx.font = '700 12px "JetBrains Mono", monospace'; const tw = ctx.measureText(lab).width;
    const ly = Math.max(ax.box.y0 + 8, Math.min(ax.box.y1 - 4, yT - 6));
    ctx.fillStyle = c.stage; ctx.fillRect(ax.box.x1 - tw - 6, ly - 12, tw + 6, 15);
    text(ctx, lab, ax.box.x1 - 2, ly, { size: 12, mono: true, weight: 700, align: 'right', color: c.ink });
  }
  function update() {
    const s = sub(), st = state(s, S.T);
    if (MLX.reducedMotion) settle();
    prim.set(L(T[st]));
    ro.set('f', L(F[s.imf + 'L']));
    ro.set('M', num(s.M, s.M % 1 ? 1 : 0) + ' g·mol⁻¹');
    ro.set('mp', deg(s.mp)); ro.set('bp', deg(s.bp));
    const cap = L(st === 'solid' ? T.cS : st === 'liquid' ? T.cL : T.cG).replace('{n}', L(s.n)).replace('{t}', deg(S.T)).replace('{b}', deg(s.bp)).replace('{f}', L(F[s.imf]));
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + cap);
    ui.cv.draw();
  }
  update();
});
