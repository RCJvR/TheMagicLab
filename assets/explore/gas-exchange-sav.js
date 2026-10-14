/* Gr11 Gas Exchange — why big animals need lungs.
 * Body modelled as a cube (round body), a thin sheet (flat body, like a
 * flatworm) or a cube with lungs and blood. Oxygen demand grows with volume,
 * supply through the skin with surface area, and diffusion time with the
 * square of the distance (t ≈ x² / 2D, D ≈ 2 × 10⁻⁹ m²/s in tissue).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Cross-section of a body coloured by how much oxygen reaches it', af: 'Deursnee van \'n liggaam, gekleur volgens hoeveel suurstof dit bereik' },
    body: { en: 'Body', af: 'Liggaam' }, size: { en: 'Size', af: 'Grootte' }, shape: { en: 'Body plan', af: 'Liggaamsplan' },
    round: { en: 'Round', af: 'Rond' }, flat: { en: 'Flat (like a flatworm)', af: 'Plat (soos \'n platwurm)' }, lungs: { en: 'Round + lungs and blood', af: 'Rond + longe en bloed' },
    res: { en: 'Gas exchange', af: 'Gaswisseling' }, sa: { en: 'Surface area', af: 'Oppervlakte' }, vol: { en: 'Volume', af: 'Volume' },
    ratio: { en: 'Surface area : volume', af: 'Oppervlakte : volume' }, dist: { en: 'Furthest cell from a surface', af: 'Verste sel van \'n oppervlak' },
    time: { en: 'Time for O₂ to diffuse there', af: 'Tyd vir O₂ om daar te diffundeer' }, supply: { en: 'O₂ supplied vs needed', af: 'O₂ voorsien teenoor benodig' },
    plenty: { en: 'enough', af: 'genoeg' },
    o2hi: { en: 'plenty of O₂', af: 'baie O₂' }, o2lo: { en: 'no O₂', af: 'geen O₂' }, notScale: { en: 'cross-section, not to scale', af: 'deursnee, nie volgens skaal nie' },
    sec: { en: 's', af: 's' }, min: { en: 'min', af: 'min' }, hr: { en: 'h', af: 'h' },
  };
  const D = 2e-9;                                   // m²/s, O₂ in tissue
  let sizeI = 10, shape = 'round', t0 = 0;
  const sizes = [];                                  // 0.1 mm … 50 mm, log steps
  for (let k = 0; k <= 30; k++) sizes.push(0.1 * Math.pow(500, k / 30));
  const mm = () => sizes[sizeI];

  const ui = MLX.layout(root, { height: (w) => Math.max(250, Math.min(330, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.body);
  MLX.slider(c1, { label: T.size, min: 0, max: 30, value: sizeI, fmt: (i) => fmtMm(sizes[i]), onInput: (i) => { sizeI = i; update(); } });
  MLX.seg(c1, { label: T.shape, options: [['round', T.round], ['flat', T.flat], ['lungs', T.lungs]], value: shape, onChange: (v) => { shape = v; update(); } });
  const c2 = MLX.card(ui.side, T.res);
  const ro = MLX.readout(c2, [['sa', T.sa], ['vol', T.vol], ['ratio', T.ratio], ['dist', T.dist], ['time', T.time], ['sup', T.supply]]);

  function fmtMm(v) { return v < 1 ? num(v, 2) + ' mm' : v < 10 ? num(v, 1) + ' mm' : Math.round(v) + ' mm'; }
  function fmtT(s) { if (s < 0.1) return '< ' + num(0.1, 1) + ' ' + L(T.sec); return s < 60 ? num(s, s < 10 ? 1 : 0) + ' ' + L(T.sec) : s < 3600 ? num(s / 60, s < 600 ? 1 : 0) + ' ' + L(T.min) : num(s / 3600, 1) + ' ' + L(T.hr); }
  function model() {
    const s = mm();
    let sa, v, dist;
    if (shape === 'flat') { const th = Math.min(0.2, s); sa = 2 * s * s + 4 * s * th; v = s * s * th; dist = th / 2; }
    else { sa = 6 * s * s; v = s * s * s; dist = s / 2; }
    let exchange = sa;
    if (shape === 'lungs') { exchange = sa * 120; dist = Math.min(dist, 0.01); }   // folded internal surface; blood carries O₂ to every cell
    const time = Math.pow(dist / 1000, 2) / (2 * D);
    const supply = (exchange / v) / 4;               // 1 = just enough (SA:V of 4 per mm)
    const centre = Math.max(0, Math.min(1, 1 - Math.pow(dist / 1.0, 2)));   // O₂ left at the centre (none beyond ~1 mm)
    return { s, sa, v, ratio: sa / v, dist, time, supply, centre };
  }
  function update() {
    const m = model();
    const unit2 = ' mm²', unit3 = ' mm³';
    const f = (x) => x < 10 ? num(x, 2) : x < 1000 ? num(x, 0) : MLX.big(x);
    ro.set('sa', f(m.sa) + unit2 + (shape === 'lungs' ? ' (+ ' + L({ en: 'lungs', af: 'longe' }) + ')' : ''));
    ro.set('vol', f(m.v) + unit3);
    ro.set('ratio', num(m.ratio, m.ratio < 10 ? 1 : 0) + ' : 1');
    ro.set('dist', fmtMm(m.dist));
    ro.set('time', fmtT(m.time), m.time > 600 ? '#fca5a5' : m.time > 30 ? '#fde68a' : '#86efac');
    ro.set('sup', m.supply >= 1 ? L(T.plenty) : Math.round(m.supply * 100) + '%', m.supply >= 1 ? '#86efac' : m.supply > 0.5 ? '#fde68a' : '#fca5a5');
    ui.setCaption(caption(m));
    ui.cv.draw();
  }
  function caption(m) {
    if (shape === 'lungs') return { en: 'Lungs fold a huge surface inside the body, and blood carries O₂ from it to every cell — so size no longer matters.', af: 'Longe vou \'n groot oppervlak binne die liggaam, en bloed dra O₂ daarvandaan na elke sel — so grootte maak nie meer saak nie.' };
    if (shape === 'flat') return { en: 'A flat body keeps every cell close to the surface, so diffusion alone is fast enough, however long the body gets.', af: '\'n Plat liggaam hou elke sel naby die oppervlak, so diffusie alleen is vinnig genoeg, hoe lank die liggaam ook al word.' };
    if (m.supply >= 1 && m.centre > 0.5) return { en: 'Small and round: the surface is large compared with the volume, and O₂ reaches the centre quickly.', af: 'Klein en rond: die oppervlak is groot in vergelyking met die volume, en O₂ bereik die middel vinnig.' };
    return { en: `At ${fmtMm(m.s)} the volume has outgrown the surface: O₂ would take ${fmtT(m.time)} to reach the centre, so the inner cells are starved.`, af: `By ${fmtMm(m.s)} het die volume die oppervlak ontgroei: O₂ sou ${fmtT(m.time)} neem om die middel te bereik, so die binneste selle kry te min.` };
  }

  function o2col(c) {               // blue (plenty) → red (none)
    return `rgb(${Math.round(239 - 180 * c)},${Math.round(68 + 62 * c)},${Math.round(68 + 178 * c)})`;
  }
  function draw(ctx, W, H) {
    const m = model();
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const cx = W * 0.44, cy = H * 0.5;
    let bw, bh;
    if (shape === 'flat') { bw = Math.min(W * 0.72, 420); bh = 18; }
    else { bw = bh = Math.min(H * 0.72, 230); }
    const x0 = cx - bw / 2, y0 = cy - bh / 2;
    // O₂ concentration inside: falls towards the middle
    const n = 40;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const u = (i + 0.5) / n, v = (j + 0.5) / n;
      // depth below the nearest surface in mm; O₂ only reaches ~1 mm into tissue
      const d = shape === 'flat' ? Math.min(v, 1 - v) * 2 : Math.min(u, 1 - u, v, 1 - v) * 2;   // 0 surface … 1 centre
      const c = shape === 'lungs' ? 1 : 1 - Math.min(1, Math.pow(d * m.dist / 1.0, 2));
      ctx.fillStyle = o2col(Math.max(0, Math.min(1, c)));
      ctx.fillRect(x0 + u * bw - bw / n / 2, y0 + v * bh - bh / n / 2, bw / n + 0.6, bh / n + 0.6);
    }
    if (shape === 'lungs') {
      // folded airways and blood vessels reaching every part
      ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 2;
      const tree = (x, y, a, len, dpt) => { if (dpt === 0) return; const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke(); tree(x2, y2, a - 0.5, len * 0.68, dpt - 1); tree(x2, y2, a + 0.5, len * 0.68, dpt - 1); };
      tree(cx, y0, Math.PI / 2, bh * 0.28, 6);
      ctx.strokeStyle = 'rgba(248,113,113,0.6)'; ctx.lineWidth = 1.5;
      for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(x0 + 8, y0 + 20 + k * (bh - 40) / 5); ctx.bezierCurveTo(cx - 30, y0 + k * bh / 5, cx + 30, y0 + (k + 1) * bh / 5, x0 + bw - 8, y0 + 20 + k * (bh - 40) / 5); ctx.stroke(); }
    }
    ctx.strokeStyle = 'rgba(226,232,240,0.7)'; ctx.lineWidth = 2; ctx.strokeRect(x0, y0, bw, bh);
    // O₂ molecules arriving at the surface
    ctx.fillStyle = '#93c5fd';
    for (let k = 0; k < 24; k++) {
      const side = k % 4, p = ((k * 0.137 + t0 * 0.15) % 1), q = ((k * 0.311) % 1);
      const out = 26 * (1 - ((t0 * 0.6 + k * 0.17) % 1));
      let x, y;
      if (side === 0) { x = x0 + q * bw; y = y0 - out; } else if (side === 1) { x = x0 + bw + out; y = y0 + q * bh; }
      else if (side === 2) { x = x0 + q * bw; y = y0 + bh + out; } else { x = x0 - out; y = y0 + q * bh; }
      if (shape === 'flat' && (side === 1 || side === 3)) continue;
      ctx.beginPath(); ctx.arc(x + Math.sin(p * 20) * 1.5, y, 2.4, 0, Math.PI * 2); ctx.fill();
    }
    text(ctx, fmtMm(m.s) + ' · ' + L(T.notScale), cx, y0 + bh + 34, { size: 12, mono: true, align: 'center', color: 'rgba(226,232,240,0.6)' });
    // key
    const kx = W - 120, ky = H * 0.3;
    for (let i = 0; i <= 20; i++) { ctx.fillStyle = o2col(1 - i / 20); ctx.fillRect(kx, ky + i * 6, 16, 6.5); }
    text(ctx, T.o2hi, kx + 24, ky + 10, { size: 11, color: 'rgba(226,232,240,0.75)' });
    text(ctx, T.o2lo, kx + 24, ky + 124, { size: 11, color: 'rgba(226,232,240,0.75)' });
  }

  update();
  MLX.loop(ui.stage, (dt) => { t0 += dt; ui.cv.draw(); }).start();
});
