/* Gr10 Waves, sound and light — three views in one module.
 *  Transverse: a wave on a rope drawn to scale (position in m, displacement in cm). The rope (medium) sets
 *    the speed v; the learner sets f and A. λ = v / f, T = 1 / f. Crest, trough, rest position, A and λ labelled;
 *    one marked particle moves only up and down (energy moves along the rope, matter does not).
 *  Sound (longitudinal): a loudspeaker pushes air particles back and forth along the direction of travel,
 *    making compressions and rarefactions. v = 340 m·s⁻¹ in air, λ = 340 / f, shown 400 times slower.
 *  Refraction: a light ray at a boundary. Snell's law n₁ sin θ₁ = n₂ sin θ₂, angles from the (dashed) normal,
 *    partial reflection with θr = θ₁, critical angle sin θc = n₂ / n₁ and total internal reflection when the
 *    light goes from an optically denser to a less dense medium. Air 1,00, water 1,33, glass 1,50, diamond 2,42.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Wave simulator: a transverse wave on a rope, a sound wave in air, and a light ray refracting at a boundary', af: 'Golfsimulator: \'n dwarsgolf op \'n tou, \'n klankgolf in lug, en \'n ligstraal wat by \'n grens breek' },
    mode: { en: 'View', af: 'Aansig' }, mTr: { en: 'Transverse wave', af: 'Dwarsgolf' }, mSo: { en: 'Sound wave', af: 'Klankgolf' }, mRe: { en: 'Refraction', af: 'Breking' },
    lam: { en: 'Wavelength λ', af: 'Golflengte λ' }, per: { en: 'Period T = 1/f', af: 'Periode T = 1/f' }, vfl: { en: 'v = f λ', af: 'v = f λ' },
    rope: { en: 'The rope and the source', af: 'Die tou en die bron' }, vRope: { en: 'Wave speed on this rope v', af: 'Golfspoed op hierdie tou v' },
    freq: { en: 'Frequency f', af: 'Frekwensie f' }, amp: { en: 'Amplitude A', af: 'Amplitude A' }, slow: { en: 'Slow motion (¼ speed)', af: 'Stadig (¼ spoed)' },
    xRope: { en: 'Position along the rope (m)', af: 'Posisie langs die tou (m)' }, yDisp: { en: 'Displacement (cm)', af: 'Verplasing (cm)' },
    crest: { en: 'crest', af: 'kruin' }, trough: { en: 'trough', af: 'trog' }, rest: { en: 'rest position', af: 'rusposisie' },
    travel: { en: 'direction of wave travel', af: 'rigting van golfbeweging' }, part: { en: 'one particle: moves up and down only', af: 'een deeltjie: beweeg net op en af' },
    sound: { en: 'The loudspeaker', af: 'Die luidspreker' }, sFreq: { en: 'Frequency f (pitch)', af: 'Frekwensie f (toonhoogte)' }, sAmp: { en: 'Amplitude (loudness)', af: 'Amplitude (hardheid)' },
    soft: { en: 'soft', af: 'sag' }, loud: { en: 'loud', af: 'hard' }, vAir: { en: 'Speed of sound in air', af: 'Spoed van klank in lug' },
    pitch: { en: 'Pitch', af: 'Toonhoogte' }, low: { en: 'low', af: 'laag' }, mid: { en: 'medium', af: 'middel' }, high: { en: 'high', af: 'hoog' },
    spk: { en: 'loudspeaker', af: 'luidspreker' }, comp: { en: 'compression', af: 'verdigting' }, rare: { en: 'rarefaction', af: 'verdunning' },
    xAir: { en: 'Distance from the loudspeaker (m)', af: 'Afstand vanaf die luidspreker (m)' }, slowN: { en: 'shown 400 times slower', af: '400 keer stadiger gewys' },
    vib: { en: 'one particle: vibrates back and forth', af: 'een deeltjie: vibreer heen en weer' },
    refr: { en: 'Angle of refraction θ₂', af: 'Brekingshoek θ₂' }, tir: { en: 'total internal reflection', af: 'totale interne weerkaatsing' },
    light: { en: 'The light ray', af: 'Die ligstraal' }, th1: { en: 'Angle of incidence θ₁', af: 'Invalshoek θ₁' },
    m1: { en: 'Medium 1 (light starts here)', af: 'Medium 1 (lig begin hier)' }, m2: { en: 'Medium 2', af: 'Medium 2' },
    refl: { en: 'Angle of reflection θr', af: 'Weerkaatsingshoek θr' }, crit: { en: 'Critical angle θc', af: 'Kritieke hoek θc' },
    none: { en: 'none here', af: 'geen hier nie' }, v1: { en: 'Speed v₁ = c/n₁', af: 'Spoed v₁ = c/n₁' }, v2: { en: 'Speed v₂ = c/n₂', af: 'Spoed v₂ = c/n₂' },
    normal: { en: 'normal', af: 'normaal' }, inc: { en: 'incident ray', af: 'invallende straal' }, rRay: { en: 'refracted ray', af: 'gebreekte straal' }, rfl: { en: 'reflected ray', af: 'weerkaatste straal' },
    air: { en: 'Air', af: 'Lug' }, water: { en: 'Water', af: 'Water' }, glass: { en: 'Glass', af: 'Glas' }, diamond: { en: 'Diamond', af: 'Diamant' },
  };
  const MED = { air: 1.00, water: 1.33, glass: 1.50, diamond: 2.42 };
  const ROPE = 6, AIR = 4, VS = 340, SLOW = 400;
  const S = { mode: 'trans', v: 2, f: 2, A: 10, slow: false, sf: 440, sA: 60, n1: 'air', n2: 'glass', th: 30, t: 0 };
  const rad = (d) => d * Math.PI / 180, deg = (r) => r * 180 / Math.PI;
  const frac = (x) => x - Math.floor(x);

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 380 : Math.max(350, Math.min(440, Math.round(w * 0.5))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const top = MLX.h('div', { style: 'margin:0 0 10px' }); ui.stage.insertBefore(top, ui.stage.firstChild);
  MLX.seg(top, { options: [['trans', T.mTr], ['sound', T.mSo], ['refr', T.mRe]], value: S.mode, onChange: (v) => { S.mode = v; update(); } });

  // one group of controls per view
  const groups = {};
  const group = (k) => { const g = MLX.h('div', { style: 'display:flex;flex-direction:column;gap:12px' }); ui.side.appendChild(g); groups[k] = g; return g; };
  // transverse
  const gT = group('trans');
  const pT = MLX.primary(gT, { label: T.lam, unit: 'm' });
  const rT = MLX.readout(pT.el, [['T', T.per], ['v', T.vfl]]);
  const cT = MLX.card(gT, T.rope);
  MLX.slider(cT, { label: T.vRope, min: 1, max: 4, step: 0.5, value: S.v, fmt: (v) => num(v, 1) + ' m·s⁻¹', onInput: (v) => { S.v = v; update(); } });
  MLX.slider(cT, { label: T.freq, min: 1, max: 5, step: 0.5, value: S.f, fmt: (v) => num(v, 1) + ' Hz', onInput: (v) => { S.f = v; update(); } });
  MLX.slider(cT, { label: T.amp, min: 2, max: 20, step: 1, value: S.A, fmt: (v) => v + ' cm', onInput: (v) => { S.A = v; update(); } });
  MLX.check(cT, { label: T.slow, value: S.slow, onChange: (v) => { S.slow = v; } });
  // sound
  const gS = group('sound');
  const pS = MLX.primary(gS, { label: T.lam, unit: 'm' });
  const rS = MLX.readout(pS.el, [['T', T.per], ['v', T.vfl], ['p', T.pitch]]);
  const cS = MLX.card(gS, T.sound);
  MLX.slider(cS, { label: T.sFreq, min: 200, max: 1000, step: 10, value: S.sf, fmt: (v) => v + ' Hz', onInput: (v) => { S.sf = v; update(); } });
  MLX.slider(cS, { label: T.sAmp, min: 10, max: 100, step: 10, value: S.sA, fmt: (v) => v + '%', minLabel: T.soft, maxLabel: T.loud, onInput: (v) => { S.sA = v; update(); } });
  const sNote = MLX.h('p', { class: 'mlx-note' }); cS.appendChild(sNote);
  // refraction
  const gR = group('refr');
  const pR = MLX.primary(gR, { label: T.refr, unit: { en: 'degrees', af: 'grade' } });
  const rR = MLX.readout(pR.el, [['r', T.refl], ['c', T.crit], ['v1', T.v1], ['v2', T.v2]]);
  const cR = MLX.card(gR, T.light);
  MLX.slider(cR, { label: T.th1, min: 0, max: 89, step: 1, value: S.th, fmt: (v) => v + '°', onInput: (v) => { S.th = v; update(); } });
  const medOpts = [['air', T.air], ['water', T.water], ['glass', T.glass], ['diamond', T.diamond]];
  MLX.seg(cR, { label: T.m1, options: medOpts, value: S.n1, onChange: (v) => { S.n1 = v; update(); } });
  MLX.seg(cR, { label: T.m2, options: medOpts, value: S.n2, onChange: (v) => { S.n2 = v; update(); } });
  const rNote = MLX.h('p', { class: 'mlx-note', style: 'margin-top:10px;font-family:var(--fm,"JetBrains Mono",monospace)' }); cR.appendChild(rNote);

  MLX.loop(ui.cv.el, (dt) => {
    if (MLX.reducedMotion || S.mode === 'refr') return;
    S.t += dt * (S.mode === 'trans' && S.slow ? 0.25 : 1); ui.cv.draw();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.mode === 'trans') drawTrans(W, H); else if (S.mode === 'sound') drawSound(W, H); else drawRefr(W, H);
  }
  function arrowHead(x, y, ang, s, col) {
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y);
    ctx.lineTo(x - s * Math.cos(ang - 0.4), y - s * Math.sin(ang - 0.4)); ctx.lineTo(x - s * Math.cos(ang + 0.4), y - s * Math.sin(ang + 0.4)); ctx.closePath(); ctx.fill();
  }
  function travelArrow(xR, y) {
    ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; const tw = ctx.measureText(L(T.travel)).width;
    text(ctx, T.travel, xR - 40, y + 4, { size: 12, align: 'right', color: c.text2 });
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(xR - 34, y); ctx.lineTo(xR - 2, y); ctx.stroke(); arrowHead(xR, y, 0, 8, c.text2);
    return tw;
  }
  // a label with a short leader line from a point (px, py) to the text at (tx, ty)
  function leader(px, py, tx, ty, s, col, align) {
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(tx, ty); ctx.stroke();
    text(ctx, s, tx + (align === 'right' ? -3 : 3), ty + 4, { size: 12, align: align || 'left', color: col || c.text });
  }
  function dimLine(x1, x2, y, label) {
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
    arrowHead(x1, y, Math.PI, 7, c.ink); arrowHead(x2, y, 0, 7, c.ink);
    ctx.font = '600 12px "JetBrains Mono", monospace'; const tw = ctx.measureText(label).width + 10;
    ctx.fillStyle = c.stage; ctx.fillRect((x1 + x2) / 2 - tw / 2, y - 17, tw, 15);
    text(ctx, label, (x1 + x2) / 2, y - 5, { size: 12, mono: true, weight: 600, align: 'center', color: c.ink });
  }

  // ── transverse wave on a rope ──
  function drawTrans(W, H) {
    const lam = S.v / S.f, ph = S.f * S.t, A = S.A;
    travelArrow(W - 12, 14);
    const ax = MLX.axes(ctx, { x0: 2, y0: 26, w: W - 6, h: H - 28, xMin: 0, xMax: ROPE, yMin: -26, yMax: 26, xTitle: T.xRope, yTitle: T.yDisp, xTicks: 6, yTicks: 4 });
    const y = (x) => A * Math.sin(2 * Math.PI * (x / lam - ph));
    // rest position
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(0)); ctx.lineTo(ax.box.x1, ax.Y(0)); ctx.stroke(); ctx.setLineDash([]);
    ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; const rw = ctx.measureText(L(T.rest)).width + 8; ctx.fillStyle = c.stage; ctx.fillRect(ax.box.x1 - rw - 2, ax.Y(0) + 4, rw, 16);
    text(ctx, T.rest, ax.box.x1 - 6, ax.Y(0) + 16, { size: 12, align: 'right', color: c.text3 });
    // rope
    ctx.strokeStyle = c.accent; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
    const n = Math.round(ax.box.x1 - ax.box.x0);
    for (let i = 0; i <= n; i++) { const x = ROPE * i / n, X = ax.X(x), Y = ax.Y(y(x)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
    // crests and troughs in view
    const c0 = lam * frac(0.25 + ph), t0 = lam * frac(0.75 + ph);
    const near = (x0, target) => { let best = x0, bd = 1e9; for (let x = x0; x <= ROPE; x += lam) { const d = Math.abs(x - target); if (d < bd) { bd = d; best = x; } } return best; };
    const xc = near(c0, ROPE * 0.42), xt = near(t0, ROPE * 0.58);
    leader(ax.X(xc), ax.Y(A) - 4, ax.X(xc) + 16, ax.Y(A) - 16, T.crest, c.text);
    leader(ax.X(xt), ax.Y(-A) + 4, ax.X(xt) + 16, ax.Y(-A) + 16, T.trough, c.text);
    // amplitude at another crest
    const xa = near(c0, ROPE * 0.8);
    if (Math.abs(xa - xc) > 0.01 && ax.X(xa) < ax.box.x1 - 50) {
      const X = ax.X(xa); ctx.strokeStyle = c.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(X, ax.Y(0)); ctx.lineTo(X, ax.Y(A)); ctx.stroke();
      arrowHead(X, ax.Y(A), -Math.PI / 2, 6, c.ink); arrowHead(X, ax.Y(0), Math.PI / 2, 6, c.ink);
      ctx.font = '600 12px "JetBrains Mono", monospace'; const s = 'A = ' + A + ' cm', tw = ctx.measureText(s).width + 8, yy = ax.Y(A / 2);
      ctx.fillStyle = c.stage; ctx.fillRect(X + 4, yy - 11, tw, 15);
      text(ctx, s, X + 8, yy + 1, { size: 12, mono: true, weight: 600, color: c.ink });
    }
    // wavelength: between two consecutive troughs (or crests), shown below the rope
    let a = t0, edge = -A; if (t0 + lam > ROPE) { a = c0; edge = A; }
    const yb = ax.Y(-23);
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    [a, a + lam].forEach(x => { ctx.beginPath(); ctx.moveTo(ax.X(x), ax.Y(edge)); ctx.lineTo(ax.X(x), yb + 4); ctx.stroke(); });
    ctx.setLineDash([]);
    dimLine(ax.X(a), ax.X(a + lam), yb, 'λ = ' + num(lam, 2) + ' m');
    // one particle of the rope: it only moves up and down
    const xp = ROPE * 0.06, X = ax.X(xp);
    ctx.strokeStyle = c.warn; ctx.lineWidth = 1; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(X, ax.Y(A)); ctx.lineTo(X, ax.Y(-A)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = c.warn; ctx.beginPath(); ctx.arc(X, ax.Y(y(xp)), 5.5, 0, Math.PI * 2); ctx.fill();
    if (W >= 520) text(ctx, T.part, X + 10, ax.box.y0 + 4, { size: 12, color: c.warn });
  }

  // ── sound: longitudinal wave in air ──
  const jit = []; for (let i = 0; i < 4000; i++) { const s = Math.sin(i * 12.9898) * 43758.5453; jit.push(s - Math.floor(s)); }
  function drawSound(W, H) {
    const ph = W < 640, lam = VS / S.sf, fd = S.sf / SLOW;
    const xs = ph ? 46 : 64, x1 = W - 14, X = (m) => xs + m / AIR * (x1 - xs), ppm = (x1 - xs) / AIR;
    const ty0 = Math.round(H * 0.24), ty1 = Math.round(H * 0.6), mid = (ty0 + ty1) / 2;
    travelArrow(W - 12, 14);
    text(ctx, T.slowN, 12, 18, { size: 12, color: c.text3 });
    // air column
    ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.strokeRect(xs, ty0, x1 - xs, ty1 - ty0);
    const lamPx = lam * ppm, a = S.sA / 100 * Math.min(16, lamPx * 0.2), k = 2 * Math.PI / lam, wt = 2 * Math.PI * fd * S.t;
    const sOf = (m) => a * Math.sin(k * m - wt);
    const rows = ph ? 8 : 10, dx = ph ? 5 : 6, cols = Math.floor((x1 - xs - 4) / dx);
    const dy = (ty1 - ty0 - 10) / (rows - 1);
    ctx.fillStyle = c.text2;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const r = jit[(j * 331 + i) % 4000], r2 = jit[(j * 797 + i * 7 + 13) % 4000];
      const px = xs + 4 + i * dx + (r - 0.5) * dx * 0.8, m = (px - xs) / ppm;
      const py = ty0 + 5 + j * dy + (r2 - 0.5) * dy * 0.5;
      ctx.beginPath(); ctx.arc(px + sOf(m), py, ph ? 1.7 : 2, 0, Math.PI * 2); ctx.fill();
    }
    // the marked particle and its rest position
    const mp = 0.25, rx = X(mp);
    ctx.strokeStyle = c.warn; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(rx, ty1 + 2); ctx.lineTo(rx, ty1 + 8); ctx.stroke();
    ctx.fillStyle = c.warn; ctx.beginPath(); ctx.arc(rx + sOf(mp), mid, 4.5, 0, Math.PI * 2); ctx.fill();
    // loudspeaker: magnet box and cone; the cone moves with the air next to it
    const d = sOf(0), bw = ph ? 14 : 18, bh = (ty1 - ty0) * 0.34;
    ctx.fillStyle = c.light ? '#d6d9de' : '#2a2f37'; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2;
    ctx.fillRect(xs - bw - 20, mid - bh / 2, bw, bh); ctx.strokeRect(xs - bw - 20, mid - bh / 2, bw, bh);
    ctx.beginPath(); ctx.moveTo(xs - 20, mid - bh / 3); ctx.lineTo(xs - 4 + d, ty0 + 4); ctx.lineTo(xs - 4 + d, ty1 - 4); ctx.lineTo(xs - 20, mid + bh / 3); ctx.closePath(); ctx.fill(); ctx.stroke();
    text(ctx, T.spk, 6, ty1 + 18, { size: 12, color: c.text3 });
    // compression and rarefaction labels
    const near = (x0, target) => { let best = x0, bd = 1e9; for (let x = x0; x <= AIR; x += lam) { const dd = Math.abs(x - target); if (dd < bd) { bd = dd; best = x; } } return best; };
    const c0 = lam * frac(0.5 + fd * S.t), r0 = lam * frac(fd * S.t);
    const xc = near(c0, AIR * 0.4), xr = near(r0, AIR * 0.68);
    leader(X(xc), ty0 - 2, X(xc) + 14, ty0 - 18, T.comp, c.text);
    leader(X(xr), ty0 - 2, X(xr) + 14, ty0 - 18, T.rare, c.text);
    // wavelength: from one compression to the next
    const yb = ty1 + 42;
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([3, 3]);
    [c0, c0 + lam].forEach(x => { ctx.beginPath(); ctx.moveTo(X(x), ty1); ctx.lineTo(X(x), yb + 4); ctx.stroke(); }); ctx.setLineDash([]);
    dimLine(X(c0), X(c0 + lam), yb, 'λ = ' + num(lam, 2) + ' m');
    // distance scale
    const ry = yb + 22;
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(xs, ry); ctx.lineTo(x1, ry); ctx.stroke();
    for (let m = 0; m <= AIR + 1e-9; m += 0.5) { const x = X(m); ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x, ry + (m % 1 ? 4 : 7)); ctx.stroke(); if (m % 1 === 0) text(ctx, num(m, 0), x, ry + 20, { size: 12, mono: true, align: 'center', color: c.text3 }); }
    text(ctx, T.xAir, (xs + x1) / 2, ry + 38, { size: 12, align: 'center', color: c.text2 });
    if (W >= 520) text(ctx, T.vib, rx - 4, ty1 + 18, { size: 12, color: c.warn });
  }

  // ── refraction of a light ray ──
  function solve() {
    const n1 = MED[S.n1], n2 = MED[S.n2], s2 = n1 * Math.sin(rad(S.th)) / n2;
    const crit = n1 > n2 ? deg(Math.asin(n2 / n1)) : null;
    return { n1, n2, tir: s2 > 1 + 1e-12, th2: s2 <= 1 ? deg(Math.asin(Math.min(1, s2))) : null, crit };
  }
  function drawRefr(W, H) {
    const r = solve(), cx = W / 2, cy = Math.round(H * 0.5), R = Math.min(W * 0.42, H * 0.44);
    const fill = (n) => n <= 1.001 ? null : (c.light ? 'rgba(53,120,200,' : 'rgba(96,165,250,') + (0.05 + 0.09 * (n - 1)).toFixed(3) + ')';
    const f1 = fill(r.n1), f2 = fill(r.n2);
    if (f1) { ctx.fillStyle = f1; ctx.fillRect(0, 0, W, cy); }
    if (f2) { ctx.fillStyle = f2; ctx.fillRect(0, cy, W, H - cy); }
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    text(ctx, L(T[S.n1]) + '   n₁ = ' + num(r.n1, 2), 12, 22, { size: 13, weight: 600, color: c.text });
    text(ctx, L(T[S.n2]) + '   n₂ = ' + num(r.n2, 2), 12, H - 14, { size: 13, weight: 600, color: c.text });
    // normal (dashed, at 90° to the boundary)
    ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(cx, cy - R - 8); ctx.lineTo(cx, cy + R + 8); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, T.normal, cx + 6, cy - R - 2, { size: 12, color: c.text3 });
    const ray = c.warn, t1 = rad(S.th);
    const line = (x0, y0, x1, y1, col, w, alpha) => { ctx.globalAlpha = alpha; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); arrowHead((x0 + x1) / 2 + (x1 - x0) * 0.06, (y0 + y1) / 2 + (y1 - y0) * 0.06, Math.atan2(y1 - y0, x1 - x0), 9, col); ctx.globalAlpha = 1; };
    const ix = cx - R * Math.sin(t1), iy = cy - R * Math.cos(t1);
    line(ix, iy, cx, cy, ray, 3, 1);
    // reflected ray: always some, all of it in total internal reflection
    const rx = cx + R * Math.sin(t1), ry = cy - R * Math.cos(t1);
    line(cx, cy, rx, ry, ray, r.tir ? 3 : 1.6, r.tir ? 1 : 0.45);
    const arc = (a0, a1, rr, col) => { ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, rr, a0, a1, a0 > a1); ctx.stroke(); };
    const up = -Math.PI / 2, down = Math.PI / 2, ra = Math.min(54, R * 0.32);
    if (S.th > 0) {
      arc(up, up - t1, ra, c.ink); arc(up, up + t1, ra * 0.8, c.text3);
      const lab = (ang, rr, s, col) => text(ctx, s, cx + rr * Math.cos(ang), cy + rr * Math.sin(ang) + 4, { size: 12, mono: true, weight: 600, align: 'center', color: col });
      lab(up - t1 / 2, ra + 22, 'θ₁', c.ink); lab(up + t1 / 2, ra * 0.8 + 18, 'θr', c.text3);
    }
    if (!r.tir) {
      const t2 = rad(r.th2), ex = cx + R * Math.sin(t2), ey = cy + R * Math.cos(t2);
      line(cx, cy, ex, ey, ray, 3, 1);
      if (r.th2 > 0.3) { arc(down, down - t2, ra, c.ink); text(ctx, 'θ₂', cx + (ra + 22) * Math.cos(down - t2 / 2), cy + (ra + 22) * Math.sin(down - t2 / 2) + 4, { size: 12, mono: true, weight: 600, align: 'center', color: c.ink }); }
      const lx = cx + R * 0.78 * Math.sin(t2), ly = cy + R * 0.78 * Math.cos(t2);
      if (r.th2 < 80) leader(lx, ly, lx + 18, ly - 4, T.rRay, c.text); else text(ctx, T.rRay, W - 12, cy + 18, { size: 12, align: 'right', color: c.text });
    }
    // labels for the incident and reflected rays
    const il = 0.62;
    leader(cx - R * il * Math.sin(t1), cy - R * il * Math.cos(t1), cx - R * il * Math.sin(t1) - 16, cy - R * il * Math.cos(t1) + 10, T.inc, c.text, 'right');
    if (S.th > 4) leader(cx + R * il * Math.sin(t1), cy - R * il * Math.cos(t1), cx + R * il * Math.sin(t1) + 16, cy - R * il * Math.cos(t1) + 10, T.rfl, c.text2);
    if (r.tir) text(ctx, T.tir, cx, cy + 34, { size: 14, weight: 700, align: 'center', color: c.ink });
  }

  function update() {
    Object.keys(groups).forEach(k => { groups[k].style.display = k === S.mode ? 'flex' : 'none'; });
    if (S.mode === 'trans') {
      const lam = S.v / S.f;
      pT.set(num(lam, 2));
      rT.set('T', num(1 / S.f, 2) + ' s');
      rT.set('v', num(S.f, 1) + ' × ' + num(lam, 2) + ' = ' + num(S.v, 1) + ' m·s⁻¹');
      ui.setCaption({ en: `The wave carries energy to the right, but each bit of rope only moves up and down. On this rope v = ${num(S.v, 1)} m·s⁻¹, so f = ${num(S.f, 1)} Hz gives λ = v/f = ${num(lam, 2)} m: a higher frequency means a shorter wavelength.`, af: `Die golf dra energie na regs, maar elke stukkie tou beweeg net op en af. Op hierdie tou is v = ${num(S.v, 1)} m·s⁻¹, dus gee f = ${num(S.f, 1)} Hz λ = v/f = ${num(lam, 2)} m: \'n hoër frekwensie beteken \'n korter golflengte.` });
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + L(T.mTr) + ': f = ' + num(S.f, 1) + ' Hz, v = ' + num(S.v, 1) + ' m/s, λ = ' + num(lam, 2) + ' m, A = ' + S.A + ' cm.');
    } else if (S.mode === 'sound') {
      const lam = VS / S.sf;
      pS.set(num(lam, 2));
      rS.set('T', num(1000 / S.sf, 2) + ' ms');
      rS.set('v', S.sf + ' × ' + num(lam, 2) + ' = ' + VS + ' m·s⁻¹');
      rS.set('p', L(S.sf < 400 ? T.low : S.sf < 700 ? T.mid : T.high));
      sNote.textContent = L({ en: 'Sound travels at about 340 m·s⁻¹ in air at 20 °C, whatever the frequency. Pitch depends on the frequency; loudness depends on the amplitude.', af: 'Klank beweeg teen ongeveer 340 m·s⁻¹ in lug by 20 °C, ongeag die frekwensie. Toonhoogte hang af van die frekwensie; hardheid hang af van die amplitude.' });
      ui.setCaption({ en: `The air particles vibrate back and forth along the direction the sound travels, forming compressions and rarefactions. In air v = 340 m·s⁻¹, so ${S.sf} Hz gives λ = 340/${S.sf} = ${num(lam, 2)} m.`, af: `Die lugdeeltjies vibreer heen en weer in die rigting waarin die klank beweeg, en vorm verdigtings en verdunnings. In lug is v = 340 m·s⁻¹, dus gee ${S.sf} Hz λ = 340/${S.sf} = ${num(lam, 2)} m.` });
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + L(T.mSo) + ': f = ' + S.sf + ' Hz, λ = ' + num(lam, 2) + ' m.');
    } else {
      const r = solve();
      pR.set(r.tir ? '—' : num(r.th2, 1));
      rR.set('r', S.th + '°');
      rR.set('c', r.crit != null ? num(r.crit, 1) + '°' : L(T.none));
      rR.set('v1', num(3 / r.n1, 2) + ' × 10⁸ m/s');
      rR.set('v2', num(3 / r.n2, 2) + ' × 10⁸ m/s');
      const lhs = r.n1 * Math.sin(rad(S.th));
      rNote.textContent = r.tir ? `n₁ sin θ₁ = ${num(lhs, 3)} > n₂ = ${num(r.n2, 2)}: ${L({ en: 'no refracted ray', af: 'geen gebreekte straal nie' })}`
        : `${num(r.n1, 2)} × sin ${S.th}° = ${num(r.n2, 2)} × sin ${num(r.th2, 1)}°  (${num(lhs, 3)})`;
      let cap;
      if (r.n1 === r.n2) cap = { en: 'Both media have the same refractive index, so the light does not change speed and passes straight through.', af: 'Albei media het dieselfde brekingsindeks, dus verander die lig nie van spoed nie en gaan reguit deur.' };
      else if (S.th === 0) cap = { en: 'Along the normal (θ₁ = 0°) the light changes speed but not direction.', af: 'Langs die normaal (θ₁ = 0°) verander die lig van spoed, maar nie van rigting nie.' };
      else if (r.n2 > r.n1) cap = { en: 'Into an optically denser medium the light slows down and bends towards the normal (θ₂ < θ₁).', af: 'In \'n opties digter medium gaan die lig stadiger en buig na die normaal toe (θ₂ < θ₁).' };
      else if (r.tir) cap = { en: `θ₁ is bigger than the critical angle (${num(r.crit, 1)}°), so all the light is reflected back into medium 1: total internal reflection.`, af: `θ₁ is groter as die kritieke hoek (${num(r.crit, 1)}°), dus word al die lig terug in medium 1 weerkaats: totale interne weerkaatsing.` };
      else if (Math.abs(r.th2 - 90) < 0.6) cap = { en: 'At the critical angle the refracted ray runs along the boundary (θ₂ = 90°).', af: 'By die kritieke hoek loop die gebreekte straal langs die grens (θ₂ = 90°).' };
      else cap = { en: `Into an optically less dense medium the light speeds up and bends away from the normal. Past θc = ${num(r.crit, 1)}° it will be totally internally reflected.`, af: `In \'n opties minder digte medium gaan die lig vinniger en buig weg van die normaal. Verby θc = ${num(r.crit, 1)}° word dit totaal intern weerkaats.` };
      ui.setCaption(cap);
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + L(T.mRe) + ': n₁ = ' + num(r.n1, 2) + ', n₂ = ' + num(r.n2, 2) + ', θ₁ = ' + S.th + '°, ' + (r.tir ? L(T.tir) : 'θ₂ = ' + num(r.th2, 1) + '°') + '.');
    }
    ui.cv.draw();
  }
  update();
});
