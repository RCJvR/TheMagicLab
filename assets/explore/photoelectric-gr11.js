/* Gr11 Optical phenomena and EM radiation — two views in one module.
 *  Photoelectric effect: light falls on the metal cathode of an evacuated photocell. Each photon has E = hf.
 *    An electron is ejected only if hf ≥ W = hf₀; then Ek(max) = hf − W. Intensity = photons per second, so it
 *    changes the number of electrons (the photocurrent), never their Ek(max). The graph of Ek(max) against f is a
 *    straight line with gradient h and x-intercept f₀ (lines for all the metals are parallel).
 *    h = 6,63 × 10⁻³⁴ J·s, c = 3 × 10⁸ m·s⁻¹. Metals: Na f₀ = 5,5 × 10¹⁴ Hz, Ca 7,73 × 10¹⁴ Hz (workbook value),
 *    Zn 10,4 × 10¹⁴ Hz (W ≈ 4,3 eV), Cu 11,3 × 10¹⁴ Hz (W ≈ 4,7 eV).
 *  EM spectrum: a true logarithmic frequency scale (10³ to 10²² Hz) with the lesson's region boundaries, the
 *    matching wavelength scale λ = c/f, and E = hf for the chosen frequency; the visible band is enlarged below.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const H_ = 6.63e-34, C_ = 3e8;
  const T = {
    aria: { en: 'Photoelectric effect: light shines on the metal cathode of a photocell, with a graph of the maximum kinetic energy of the electrons against frequency; and the electromagnetic spectrum', af: 'Foto-elektriese effek: lig skyn op die metaalkatode van \'n fotosel, met \'n grafiek van die maksimum kinetiese energie van die elektrone teen frekwensie; en die elektromagnetiese spektrum' },
    mPh: { en: 'Photoelectric effect', af: 'Foto-elektriese effek' }, mSp: { en: 'EM spectrum', af: 'EM-spektrum' },
    ek: { en: 'Maximum kinetic energy Ek(max)', af: 'Maksimum kinetiese energie Ek(maks)' }, ekU: { en: '× 10⁻¹⁹ J', af: '× 10⁻¹⁹ J' },
    E: { en: 'Photon energy E = hf', af: 'Fotonenergie E = hf' }, W: { en: 'Work function W = hf₀', af: 'Werkfunksie W = hf₀' }, f0: { en: 'Threshold frequency f₀', af: 'Drempelfrekwensie f₀' },
    lam: { en: 'Wavelength λ = c/f', af: 'Golflengte λ = c/f' }, cur: { en: 'Photocurrent', af: 'Fotostroom' }, ej: { en: 'Electrons ejected?', af: 'Elektrone vrygestel?' },
    yes: { en: 'yes', af: 'ja' }, no: { en: 'no: f < f₀', af: 'nee: f < f₀' }, noneC: { en: 'zero', af: 'nul' }, ofMax: { en: '% of the maximum', af: '% van die maksimum' },
    src: { en: 'Light and metal', af: 'Lig en metaal' }, freq: { en: 'Frequency f', af: 'Frekwensie f' }, inten: { en: 'Intensity (photons per second)', af: 'Intensiteit (fotone per sekonde)' },
    metal: { en: 'Metal of the cathode', af: 'Metaal van die katode' }, Na: { en: 'Sodium', af: 'Natrium' }, Ca: { en: 'Calcium', af: 'Kalsium' }, Zn: { en: 'Zinc', af: 'Sink' }, Cu: { en: 'Copper', af: 'Koper' },
    lamp: { en: 'light source', af: 'ligbron' }, cath: { en: 'metal cathode', af: 'metaalkatode' }, anode: { en: 'anode', af: 'anode' }, vac: { en: 'vacuum', af: 'vakuum' },
    phot: { en: 'photons', af: 'fotone' }, elec: { en: 'electrons', af: 'elektrone' },
    xF: { en: 'Frequency f (× 10¹⁴ Hz)', af: 'Frekwensie f (× 10¹⁴ Hz)' }, yE: { en: 'Ek(max) (× 10⁻¹⁹ J)', af: 'Ek(maks) (× 10⁻¹⁹ J)' },
    grad: { en: 'gradient = h', af: 'gradiënt = h' }, uv: { en: 'ultraviolet', af: 'ultraviolet' }, ir: { en: 'infrared', af: 'infrarooi' },
    eS: { en: 'Photon energy E = hf', af: 'Fotonenergie E = hf' }, eSU: { en: 'J', af: 'J' }, reg: { en: 'Region', af: 'Streek' }, fS: { en: 'Frequency f', af: 'Frekwensie f' }, lS: { en: 'Wavelength λ = c/f', af: 'Golflengte λ = c/f' },
    pick: { en: 'Choose a frequency', af: 'Kies \'n frekwensie' }, jump: { en: 'Go to', af: 'Gaan na' },
    incF: { en: 'increasing frequency and photon energy', af: 'toenemende frekwensie en fotonenergie' }, incL: { en: 'increasing wavelength', af: 'toenemende golflengte' },
    fAx: { en: 'frequency (Hz)', af: 'frekwensie (Hz)' }, lAx: { en: 'wavelength (m)', af: 'golflengte (m)' }, vis: { en: 'visible light, enlarged (nm)', af: 'sigbare lig, vergroot (nm)' },
  };
  const METALS = { Na: 5.5, Ca: 7.73, Zn: 10.4, Cu: 11.3 }; // f₀ in 10¹⁴ Hz
  const REG = [
    { k: 'radio', lo: 3, hi: 9, n: { en: 'Radio waves', af: 'Radiogolwe' }, s: { en: 'Radio', af: 'Radio' }, use: { en: 'broadcasting and communication', af: 'uitsending en kommunikasie' } },
    { k: 'micro', lo: 9, hi: 12, n: { en: 'Microwaves', af: 'Mikrogolwe' }, s: { en: 'Microwave', af: 'Mikrogolf' }, use: { en: 'cooking, radar, mobile phones', af: 'kook, radar, selfone' } },
    { k: 'ir', lo: 12, hi: Math.log10(4e14), n: { en: 'Infrared (IR)', af: 'Infrarooi (IR)' }, s: { en: 'IR', af: 'IR' }, use: { en: 'heat lamps, remote controls, thermal imaging', af: 'hittelampe, afstandbeheerders, termiese beelding' } },
    { k: 'vis', lo: Math.log10(4e14), hi: Math.log10(7.5e14), n: { en: 'Visible light', af: 'Sigbare lig' }, s: { en: 'Visible', af: 'Sigbaar' }, use: { en: 'sight, photography', af: 'sig, fotografie' } },
    { k: 'uv', lo: Math.log10(7.5e14), hi: 17, n: { en: 'Ultraviolet (UV)', af: 'Ultraviolet (UV)' }, s: { en: 'UV', af: 'UV' }, use: { en: 'sterilisation, fluorescence; causes sunburn', af: 'sterilisering, fluoressensie; veroorsaak sonbrand' } },
    { k: 'x', lo: 17, hi: 19, n: { en: 'X-rays', af: 'X-strale' }, s: { en: 'X-rays', af: 'X-strale' }, use: { en: 'medical imaging, security scanning', af: 'mediese beelding, sekuriteitskandering' } },
    { k: 'g', lo: 19, hi: 22, n: { en: 'Gamma rays', af: 'Gammastrale' }, s: { en: 'Gamma', af: 'Gamma' }, use: { en: 'cancer treatment, sterilisation, nuclear medicine', af: 'kankerbehandeling, sterilisering, kernmedisyne' } },
  ];
  const S = { mode: 'photo', f: 8, I: 50, metal: 'Na', lf: 14.7, t: 0, ph: [], el: [], acc: 0 };
  const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  const sup = (n) => String(n).split('').map(ch => SUP[ch] || ch).join('');
  function sci(v, d) { if (v === 0) return '0'; let e = Math.floor(Math.log10(Math.abs(v))), m = v / Math.pow(10, e); if (+m.toFixed(d) >= 10) { m /= 10; e += 1; } return num(m, d) + ' × 10' + sup(e); }
  const regOf = (lf) => REG.find(r => lf >= r.lo && lf < r.hi) || REG[REG.length - 1];
  const phys = () => { const f0 = METALS[S.metal], E = H_ * S.f * 1e14, W = H_ * f0 * 1e14; return { f0, E, W, ek: Math.max(0, E - W), on: S.f >= f0 }; };

  // approximate colour of visible light of wavelength nm (darker in the light theme so it reads on white)
  function wlColor(nm, light) {
    let r = 0, g = 0, b = 0;
    if (nm < 440) { r = (440 - nm) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = (510 - nm) / 20; }
    else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = (645 - nm) / 65; } else r = 1;
    const k = light ? 0.72 : 1, f = (x) => Math.round(255 * Math.max(0, Math.min(1, x)) * k);
    return `rgb(${f(r)},${f(g)},${f(b)})`;
  }
  function beamColor() { const nm = 3000 / S.f; return nm < 400 ? (c.light ? '#6b4bb3' : '#b9a3f0') : nm > 700 ? (c.light ? '#9b2c2c' : '#e07a6a') : wlColor(nm, c.light); }

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 520 : Math.max(360, Math.min(440, Math.round(w * 0.46))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const top = MLX.h('div', { style: 'margin:0 0 10px' }); ui.stage.insertBefore(top, ui.stage.firstChild);
  MLX.seg(top, { options: [['photo', T.mPh], ['spec', T.mSp]], value: S.mode, onChange: (v) => { S.mode = v; update(); } });
  const groups = {};
  const group = (k) => { const g = MLX.h('div', { style: 'display:flex;flex-direction:column;gap:12px' }); ui.side.appendChild(g); groups[k] = g; return g; };
  // photoelectric controls
  const gP = group('photo');
  const pP = MLX.primary(gP, { label: T.ek, unit: T.ekU });
  const rP = MLX.readout(pP.el, [['E', T.E], ['W', T.W], ['f0', T.f0], ['l', T.lam], ['e', T.ej], ['i', T.cur]]);
  const cP = MLX.card(gP, T.src);
  MLX.slider(cP, { label: T.freq, min: 3, max: 15, step: 0.1, value: S.f, fmt: (v) => num(v, 1) + ' × 10¹⁴ Hz', onInput: (v) => { S.f = v; if (!phys().on) S.el = []; update(); } });
  MLX.slider(cP, { label: T.inten, min: 0, max: 100, step: 10, value: S.I, fmt: (v) => v + '%', onInput: (v) => { S.I = v; update(); } });
  MLX.seg(cP, { label: T.metal, options: Object.keys(METALS).map(k => [k, { en: k + ' ' + T[k].en.toLowerCase(), af: k + ' ' + T[k].af.toLowerCase() }]), value: S.metal, onChange: (v) => { S.metal = v; S.el = []; update(); } });
  const eqP = MLX.h('p', { class: 'mlx-note', style: 'margin-top:10px;font-family:var(--fm,"JetBrains Mono",monospace)' }); cP.appendChild(eqP);
  // spectrum controls
  const gS = group('spec');
  const pS = MLX.primary(gS, { label: T.eS, unit: T.eSU });
  const rS = MLX.readout(pS.el, [['r', T.reg], ['f', T.fS], ['l', T.lS]]);
  const cS = MLX.card(gS, T.pick);
  const sF = MLX.slider(cS, { label: T.fS, min: 3, max: 22, step: 0.05, value: S.lf, fmt: (v) => sci(Math.pow(10, v), 1) + ' Hz', minLabel: '10³ Hz', maxLabel: '10²² Hz', onInput: (v) => { S.lf = v; update(); } });
  MLX.seg(cS, { label: T.jump, options: REG.map(r => [r.k, r.s]), value: null, onChange: (k) => { const r = REG.find(x => x.k === k); S.lf = +((r.lo + r.hi) / 2).toFixed(2); sF.set(S.lf); update(); } });
  const useP = MLX.h('p', { class: 'mlx-note', style: 'margin-top:10px' }); cS.appendChild(useP);

  MLX.loop(ui.cv.el, (dt) => {
    if (S.mode !== 'photo') return;
    if (MLX.reducedMotion) return;
    S.t += dt; step(dt); ui.cv.draw();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx, geo = null;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.mode === 'photo') {
      if (W >= 640) { const aw = Math.round(W * 0.5); cell(0, 0, aw, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); graph(aw + 6, 0, W - aw - 6, H); }
      else { cell(0, 0, W, H * 0.52); graph(0, H * 0.52, W, H * 0.48); }
    } else spectrum(W, H);
  }

  // ── photocell ──
  function cellGeo(x0, y0, w, h) {
    const bx = x0 + w * 0.3, bw = w * 0.62, by = y0 + h * 0.2, bh = h * 0.5;
    const kx = bx + bw * 0.2, ax = bx + bw * 0.8;
    return { x0, y0, w, h, bx, bw, by, bh, kx, ax, cy: by + bh / 2, kr: bh * 0.36, lx: kx + (ax - kx) * 0.5, ly: y0 + Math.max(18, h * 0.07) };
  }
  // photons travel from the lamp to random points on the cathode; electrons go from the cathode to the anode
  function step(dt) {
    if (!geo) return;
    const g = geo, p = phys();
    S.acc += dt * S.I / 100 * 16;
    while (S.acc >= 1) { S.acc -= 1; const a = (Math.random() - 0.5) * 1.6; S.ph.push({ a, u: 0 }); }
    S.ph.forEach(o => { o.u += dt * 1.6; });
    S.ph = S.ph.filter(o => {
      if (o.u < 1) return true;
      if (p.on) S.el.push({ a: o.a, u: 0, sp: 0.25 + 1.1 * Math.sqrt(p.ek / 6.3e-19) });
      return false;
    });
    S.el.forEach(o => { o.u += dt * o.sp; });
    S.el = S.el.filter(o => o.u < 1);
    void g;
  }
  function cell(x0, y0, w, h) {
    const g = geo = cellGeo(x0, y0, w, h), p = phys(), bc = beamColor();
    // evacuated glass bulb
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6; MLX.roundRect(ctx, g.bx, g.by, g.bw, g.bh, g.bh * 0.45); ctx.stroke();
    text(ctx, T.vac, g.bx + g.bw - g.bh * 0.3, g.by + g.bh - 12, { size: 12, align: 'right', color: c.text3 });
    // cathode: a curved metal plate facing the anode
    const kx = g.kx, kr = g.kr, metalCol = c.light ? '#7b8494' : '#9aa3b2';
    const ccx = kx + kr * 0.55; ctx.strokeStyle = metalCol; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(ccx, g.cy, kr, Math.PI - 0.95, Math.PI + 0.95); ctx.stroke();
    const kp = (a) => [ccx - kr * Math.cos(a * 0.6), g.cy + kr * Math.sin(a * 0.6)];
    // anode: a thin rod
    ctx.strokeStyle = c.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.ax, g.cy - kr * 0.8); ctx.lineTo(g.ax, g.cy + kr * 0.8); ctx.stroke();
    // circuit: wires out of the bottom, a cell (long plate on the anode side) and an ammeter
    const wy = g.by + g.bh + Math.min(48, h * 0.16), mx = (kx + g.ax) / 2;
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath();
    ctx.moveTo(kx, g.cy + kr * 0.8); ctx.lineTo(kx, wy); ctx.lineTo(mx - 34, wy);
    ctx.moveTo(mx - 6, wy); ctx.lineTo(mx + 26, wy); ctx.moveTo(mx + 54, wy); ctx.lineTo(g.ax, wy); ctx.lineTo(g.ax, g.cy + kr * 0.8); ctx.stroke();
    // cell symbol between mx-34 and mx-6: short (−) plate towards the cathode, long (+) plate towards the anode
    ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx - 26, wy - 6); ctx.lineTo(mx - 26, wy + 6); ctx.moveTo(mx - 14, wy - 12); ctx.lineTo(mx - 14, wy + 12); ctx.stroke();
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(mx - 34, wy); ctx.lineTo(mx - 26, wy); ctx.moveTo(mx - 14, wy); ctx.lineTo(mx - 6, wy); ctx.stroke();
    // ammeter: needle deflection ∝ photocurrent
    const ar = 14, acx = mx + 40; ctx.fillStyle = c.stage; ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(acx, wy, ar, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    text(ctx, 'A', acx, wy + 5, { size: 13, weight: 700, align: 'center', color: c.ink });
    const curFrac = p.on ? S.I / 100 : 0, na = -Math.PI * 0.85 + curFrac * Math.PI * 0.7;
    ctx.strokeStyle = c.warn; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(acx, wy); ctx.lineTo(acx + (ar + 9) * Math.cos(na), wy + (ar + 9) * Math.sin(na)); ctx.stroke();
    // lamp
    ctx.fillStyle = c.light ? '#d6d9de' : '#2a2f37'; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2;
    ctx.save(); ctx.translate(g.lx, g.ly); ctx.rotate(Math.atan2(g.cy - g.ly, kx - g.lx));
    ctx.fillRect(-14, -9, 26, 18); ctx.strokeRect(-14, -9, 26, 18); ctx.fillStyle = bc; ctx.fillRect(12, -7, 3, 14); ctx.restore();
    text(ctx, T.lamp, g.lx + 22, g.ly + 4, { size: 12, color: c.text3 });
    // photons: short wave packets in the colour of the light
    const la = Math.atan2(g.cy - g.ly, kx - g.lx), sx = g.lx + 15 * Math.cos(la), sy = g.ly + 15 * Math.sin(la);
    ctx.strokeStyle = bc; ctx.lineWidth = 1.8;
    S.ph.forEach(o => {
      const [tx, ty] = kp(o.a), x = sx + (tx - sx) * o.u, y = sy + (ty - sy) * o.u, ang = Math.atan2(ty - sy, tx - sx);
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.beginPath();
      for (let i = 0; i <= 14; i++) { const xx = -14 + i, yy = 3 * Math.sin(i * 0.9 * S.f / 6); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore();
    });
    // electrons
    ctx.fillStyle = c.ink;
    S.el.forEach(o => { const [x0e, y0e] = kp(o.a), x = x0e + (g.ax - 3 - x0e) * o.u, y = y0e + (g.cy + o.a * kr * 0.4 - y0e) * o.u; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill(); });
    // labels
    const cl = L(T.cath) + ' (' + S.metal + ')'; ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; const cw = ctx.measureText(cl).width;
    const clx = Math.max(x0 + 8 + cw, g.bx - 4); leader(ccx - kr * Math.cos(0.8), g.cy + kr * Math.sin(0.8), clx, g.by + g.bh + 14, cl, 'right');
    leader(g.ax, g.cy - kr * 0.8, g.ax - 6, g.by - 10, T.anode, 'right');
    const nm = 3000 / S.f;
    const tag = nm < 400 ? L(T.uv) : nm > 700 ? L(T.ir) : '';
    text(ctx, L(T.phot) + (tag ? ' (' + tag + ')' : '') + ', ' + num(nm, 0) + ' nm', g.lx - 22, g.ly + 4, { size: 12, color: bc, align: 'right' });
    if (S.el.length) text(ctx, T.elec, (kx + g.ax) / 2 + 10, g.cy + kr * 0.75, { size: 12, align: 'center', color: c.text2 });
  }
  function leader(px, py, tx, ty, s, align) {
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(tx, ty); ctx.stroke();
    text(ctx, s, tx + (align === 'right' ? -3 : 3), ty + 4, { size: 12, align: align || 'left', color: c.text });
  }
  function graph(x0, y0, w, h) {
    const p = phys();
    const ax = MLX.axes(ctx, { x0, y0: y0 + 8, w, h: h - 8, xMin: 0, xMax: 15, yMin: 0, yMax: 7, xTitle: T.xF, yTitle: T.yE, xTicks: 4, yTicks: 4 });
    const ekAt = (f, f0) => H_ * (f - f0) * 1e14 * 1e19;
    Object.keys(METALS).forEach(k => {
      const f0 = METALS[k], me = k === S.metal;
      ctx.strokeStyle = me ? c.accent : c.lineHard; ctx.lineWidth = me ? 2.5 : 1; ctx.setLineDash(me ? [] : [4, 4]);
      ctx.beginPath(); ctx.moveTo(ax.X(f0), ax.Y(0)); ctx.lineTo(ax.X(15), ax.Y(ekAt(15, f0))); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, k, ax.X(15) - 2, ax.Y(ekAt(15, f0)) - 6, { size: 12, align: 'right', color: me ? c.accent : c.text3, weight: me ? 700 : 500 });
    });
    // threshold frequency on the axis
    const xf0 = ax.X(p.f0);
    ctx.fillStyle = c.accent; ctx.beginPath(); ctx.arc(xf0, ax.Y(0), 3.5, 0, Math.PI * 2); ctx.fill();
    text(ctx, 'f₀', xf0, ax.Y(0) - 8, { size: 12, mono: true, weight: 600, align: 'center', color: c.accent });
    // gradient note
    text(ctx, T.grad, ax.box.x0 + 8, ax.box.y0 + 14, { size: 12, color: c.text2 });
    text(ctx, 'h = 6,63 × 10⁻³⁴ J·s'.replace(/,/g, MLX.af ? ',' : '.'), ax.box.x0 + 8, ax.box.y0 + 30, { size: 12, mono: true, color: c.text3 });
    // current point
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(S.f), ax.Y(p.ek * 1e19), 5.5, 0, Math.PI * 2); ctx.fill();
  }

  // ── EM spectrum ──
  function spectrum(W, H) {
    const ph = W < 640, x0 = ph ? 14 : 24, x1 = W - (ph ? 14 : 24), X = (lf) => x0 + (lf - 3) / 19 * (x1 - x0);
    const by = Math.round(H * (ph ? 0.2 : 0.22)), bh = ph ? 54 : 60, cur = regOf(S.lf);
    // frequency scale above
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1;
    for (let e = 3; e <= 22; e++) { const x = X(e); ctx.beginPath(); ctx.moveTo(x, by - 4); ctx.lineTo(x, by - (e % 3 ? 8 : 12)); ctx.stroke(); if (e % 3 === 0) text(ctx, '10' + sup(e), x, by - 16, { size: 12, mono: true, align: 'center', color: c.text3 }); }
    text(ctx, T.fAx, x0, by - 36, { size: 12, color: c.text2 });
    // regions
    REG.forEach((r, i) => {
      const a = X(r.lo), b = X(r.hi);
      ctx.fillStyle = r === cur ? c.accentSoft : (i % 2 ? (c.light ? 'rgba(22,24,29,0.05)' : 'rgba(255,255,255,0.05)') : (c.light ? 'rgba(22,24,29,0.025)' : 'rgba(255,255,255,0.025)'));
      ctx.fillRect(a, by, b - a, bh);
      if (r.k === 'vis') { for (let x = a; x <= b; x++) { ctx.fillStyle = wlColor(700 - 300 * (x - a) / Math.max(1, b - a), c.light); ctx.fillRect(x, by, 1.5, bh); } }
      ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(a, by); ctx.lineTo(a, by + bh); ctx.stroke();
      if (r.k !== 'vis') {
        ctx.font = '600 12px "Cabinet Grotesk", sans-serif';
        const lab = L(ph ? r.s : r.n).replace(' (IR)', '').replace(' (UV)', ''), tw = ctx.measureText(lab).width;
        if (tw < b - a - 6) text(ctx, lab, (a + b) / 2, by + bh / 2 + 4, { size: 12, weight: 600, align: 'center', color: r === cur ? c.ink : c.text });
        else { const words = lab.split(/[- ]/); words.forEach((wd, j) => text(ctx, wd, (a + b) / 2, by + bh / 2 + 4 + (j - (words.length - 1) / 2) * 14, { size: 12, weight: 600, align: 'center', color: r === cur ? c.ink : c.text })); }
      }
    });
    ctx.strokeStyle = c.lineHard; ctx.strokeRect(x0, by, x1 - x0, bh);
    // wavelength scale below: λ = c/f, so log f = log c − log λ
    const wy = by + bh;
    for (let n = 5; n >= -13; n--) { const lf = Math.log10(C_) - n; if (lf < 3 || lf > 22) continue; const x = X(lf); ctx.beginPath(); ctx.moveTo(x, wy + 4); ctx.lineTo(x, wy + (n % 3 ? 8 : 12)); ctx.stroke(); if ((n - 5) % 3 === 0) text(ctx, '10' + sup(n), x, wy + 26, { size: 12, mono: true, align: 'center', color: c.text3 }); }
    text(ctx, T.lAx, x0, wy + 44, { size: 12, color: c.text2 });
    // chosen frequency
    const mx = X(S.lf);
    ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx, by - 2); ctx.lineTo(mx, by + bh + 2); ctx.stroke();
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.moveTo(mx, by - 2); ctx.lineTo(mx - 6, by - 10); ctx.lineTo(mx + 6, by - 10); ctx.closePath(); ctx.fill();
    // direction arrows
    const ay = wy + 66;
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x0, ay); ctx.lineTo(x1, ay); ctx.stroke();
    ctx.fillStyle = c.text2; ctx.beginPath(); ctx.moveTo(x1, ay); ctx.lineTo(x1 - 8, ay - 4); ctx.lineTo(x1 - 8, ay + 4); ctx.closePath(); ctx.fill();
    text(ctx, T.incF, x1, ay - 7, { size: 12, align: 'right', color: c.text2 });
    ctx.beginPath(); ctx.moveTo(x0, ay + 22); ctx.lineTo(x1, ay + 22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0, ay + 22); ctx.lineTo(x0 + 8, ay + 18); ctx.lineTo(x0 + 8, ay + 26); ctx.closePath(); ctx.fill();
    text(ctx, T.incL, x0, ay + 38, { size: 12, color: c.text2 });
    // visible band enlarged
    const vy = ay + 62, vh = 22, va = X(REG[3].lo), vb = X(REG[3].hi), ex0 = x0 + (x1 - x0) * 0.2, ex1 = x1 - (x1 - x0) * 0.2;
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(va, by + bh); ctx.lineTo(ex0, vy); ctx.moveTo(vb, by + bh); ctx.lineTo(ex1, vy); ctx.stroke(); ctx.setLineDash([]);
    for (let x = ex0; x <= ex1; x++) { const nmv = 700 - 300 * (x - ex0) / (ex1 - ex0); ctx.fillStyle = wlColor(nmv, c.light); ctx.fillRect(x, vy, 1.5, vh); }
    [700, 600, 500, 400].forEach(nmv => { const x = ex0 + (700 - nmv) / 300 * (ex1 - ex0); ctx.strokeStyle = c.lineHard; ctx.beginPath(); ctx.moveTo(x, vy + vh); ctx.lineTo(x, vy + vh + 5); ctx.stroke(); text(ctx, String(nmv), x, vy + vh + 18, { size: 12, mono: true, align: 'center', color: c.text3 }); });
    text(ctx, T.vis, (ex0 + ex1) / 2, vy + vh + 36, { size: 12, align: 'center', color: c.text2 });
    if (cur.k === 'vis') { const nmc = C_ / Math.pow(10, S.lf) * 1e9, x = ex0 + (700 - nmc) / 300 * (ex1 - ex0); ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, vy - 4); ctx.lineTo(x, vy + vh + 4); ctx.stroke(); }
  }

  function lamStr(m) {
    if (m >= 1000) return sci(m / 1000, 1) + ' km';
    if (m >= 1) return num(m, m < 10 ? 2 : 0) + ' m';
    if (m >= 1e-3) return num(m * 1000, 1) + ' mm';
    if (m >= 1e-6) return num(m * 1e6, 1) + ' µm';
    if (m >= 1e-9) return num(m * 1e9, 0) + ' nm';
    return sci(m, 1) + ' m';
  }
  function update() {
    Object.keys(groups).forEach(k => { groups[k].style.display = k === S.mode ? 'flex' : 'none'; });
    if (S.mode === 'photo') {
      const p = phys(), e19 = (v) => num(v * 1e19, 2) + ' × 10⁻¹⁹ J';
      pP.set(num(p.ek * 1e19, 2));
      rP.set('E', e19(p.E)); rP.set('W', e19(p.W)); rP.set('f0', num(p.f0, 2) + ' × 10¹⁴ Hz'); rP.set('l', num(3000 / S.f, 0) + ' nm');
      rP.set('e', L(p.on ? T.yes : T.no), p.on ? '' : c && c.warn);
      rP.set('i', p.on ? (S.I ? S.I + L(T.ofMax) : L(T.noneC)) : L(T.noneC));
      eqP.textContent = p.on ? `Ek(${MLX.af ? 'maks' : 'max'}) = hf − W = ${num(p.E * 1e19, 2)} − ${num(p.W * 1e19, 2)} = ${num(p.ek * 1e19, 2)} × 10⁻¹⁹ J`
        : `hf = ${num(p.E * 1e19, 2)} × 10⁻¹⁹ J < W = ${num(p.W * 1e19, 2)} × 10⁻¹⁹ J`;
      let cap;
      if (!p.on) cap = { en: `Each photon (${num(p.E * 1e19, 2)} × 10⁻¹⁹ J) has less energy than the work function of ${L(T[S.metal]).toLowerCase()}, so no electrons are ejected, however bright the light.`, af: `Elke foton (${num(p.E * 1e19, 2)} × 10⁻¹⁹ J) het minder energie as die werkfunksie van ${L(T[S.metal]).toLowerCase()}, dus word geen elektrone vrygestel nie, hoe helder die lig ook al is.` };
      else if (S.I === 0) cap = { en: 'No light, no photons: no electrons. Raise the intensity.', af: 'Geen lig, geen fotone: geen elektrone nie. Verhoog die intensiteit.' };
      else cap = { en: `Above f₀ each photon ejects one electron with up to ${num(p.ek * 1e19, 2)} × 10⁻¹⁹ J of kinetic energy. Brighter light ejects more electrons per second; only a higher frequency makes them faster.`, af: `Bo f₀ stel elke foton een elektron vry met hoogstens ${num(p.ek * 1e19, 2)} × 10⁻¹⁹ J kinetiese energie. Helderder lig stel meer elektrone per sekonde vry; net \'n hoër frekwensie maak hulle vinniger.` };
      ui.setCaption(cap);
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + S.metal + ', f = ' + num(S.f, 1) + ' × 10¹⁴ Hz, ' + S.I + '%: Ek = ' + num(p.ek * 1e19, 2) + ' × 10⁻¹⁹ J.');
    } else {
      const f = Math.pow(10, S.lf), r = regOf(S.lf), E = H_ * f;
      pS.set(sci(E, 2));
      rS.set('r', L(r.n)); rS.set('f', sci(f, 2) + ' Hz'); rS.set('l', lamStr(C_ / f));
      useP.textContent = L({ en: 'Uses: ', af: 'Gebruike: ' }) + L(r.use) + '.';
      ui.setCaption({ en: `All EM waves travel at c = 3 × 10⁸ m·s⁻¹. ${L(r.n)}: f = ${sci(f, 2)} Hz, so λ = c/f = ${lamStr(C_ / f)} and each photon carries E = hf = ${sci(E, 2)} J. Higher frequency means more energy per photon.`, af: `Alle EM-golwe beweeg teen c = 3 × 10⁸ m·s⁻¹. ${L(r.n)}: f = ${sci(f, 2)} Hz, dus λ = c/f = ${lamStr(C_ / f)} en elke foton dra E = hf = ${sci(E, 2)} J. Hoër frekwensie beteken meer energie per foton.` });
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + L(r.n) + ', f = ' + sci(f, 2) + ' Hz.');
    }
    ui.cv.draw();
  }
  update();
});
