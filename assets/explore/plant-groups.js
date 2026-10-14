/* Gr11 Biodiversity of Plants — from water to dry land.
 * Add features one at a time (vascular tissue → seeds → flowers and fruit) and
 * move the plant to drier habitats. Without seeds, sperm must swim to the egg
 * through a film of water; without vascular tissue, water cannot be carried
 * up, so the plant stays small and needs damp places.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, text } = MLX;
  const G = {
    bryo: { n: { en: 'Bryophytes (mosses)', af: 'Briofiete (mosse)' }, h: { en: 'a few cm', af: '\'n paar cm' }, water: { en: 'absorbed over the surface', af: 'deur die oppervlak geabsorbeer' }, fert: { en: 'sperm swim through water', af: 'sperme swem deur water' } },
    pter: { n: { en: 'Pteridophytes (ferns)', af: 'Pteridofiete (varings)' }, h: { en: 'up to a few metres', af: 'tot \'n paar meter' }, water: { en: 'xylem and phloem', af: 'xileem en floëem' }, fert: { en: 'sperm swim through water', af: 'sperme swem deur water' } },
    gymn: { n: { en: 'Gymnosperms (conifers)', af: 'Gimnosperme (naaldbome)' }, h: { en: 'up to 100 m', af: 'tot 100 m' }, water: { en: 'xylem and phloem', af: 'xileem en floëem' }, fert: { en: 'pollen carried by wind', af: 'stuifmeel deur wind gedra' } },
    angi: { n: { en: 'Angiosperms (flowering plants)', af: 'Angiosperme (blomplante)' }, h: { en: 'up to 100 m', af: 'tot 100 m' }, water: { en: 'xylem and phloem', af: 'xileem en floëem' }, fert: { en: 'pollen carried by wind or animals', af: 'stuifmeel deur wind of diere gedra' } },
  };
  const HAB = [{ en: 'Swamp', af: 'Moeras' }, { en: 'Damp forest floor', af: 'Klam woudvloer' }, { en: 'Grassland', af: 'Grasveld' }, { en: 'Semi-desert', af: 'Halfwoestyn' }];
  const T = {
    aria: { en: 'A plant in its habitat, showing how it reproduces', af: '\'n Plant in sy habitat, wat wys hoe dit voortplant' },
    feat: { en: 'Features', af: 'Kenmerke' }, vasc: { en: 'Vascular tissue (xylem, phloem)', af: 'Vaatweefsel (xileem, floëem)' },
    seeds: { en: 'Seeds and pollen', af: 'Sade en stuifmeel' }, flowers: { en: 'Flowers and fruit', af: 'Blomme en vrugte' },
    hab: { en: 'Habitat', af: 'Habitat' }, res: { en: 'Your plant', af: 'Jou plant' }, group: { en: 'Group', af: 'Groep' },
    height: { en: 'Can grow', af: 'Kan groei' }, water: { en: 'Water transport', af: 'Watervervoer' }, fert: { en: 'Fertilisation', af: 'Bevrugting' },
    here: { en: 'In this habitat', af: 'In hierdie habitat' }, thrives: { en: 'grows and reproduces', af: 'groei en plant voort' },
    noRepro: { en: 'grows, cannot reproduce', af: 'groei, kan nie voortplant nie' }, dies: { en: 'dries out', af: 'droog uit' },
  };
  let vasc = false, seeds = false, flowers = false, hab = 0, t0 = 0;
  const group = () => !vasc ? 'bryo' : !seeds ? 'pter' : !flowers ? 'gymn' : 'angi';
  function verdict() {
    const g = group(), dry = hab;                  // 0 swamp … 3 semi-desert
    if (g === 'bryo' && dry >= 2) return 'dies';
    if ((g === 'bryo' || g === 'pter') && dry >= 2) return 'noRepro';
    if (g === 'pter' && dry === 3) return 'noRepro';
    return 'thrives';
  }

  const ui = MLX.layout(root, { height: (w) => Math.max(260, Math.min(340, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.feat);
  const cv = MLX.check(c1, { label: T.vasc, value: vasc, onChange: (v) => { vasc = v; if (!v) { seeds = flowers = false; cs.set(false); cf.set(false); } update(); } });
  const cs = MLX.check(c1, { label: T.seeds, value: seeds, onChange: (v) => { seeds = v; if (v) { vasc = true; cv.set(true); } else { flowers = false; cf.set(false); } update(); } });
  const cf = MLX.check(c1, { label: T.flowers, value: flowers, onChange: (v) => { flowers = v; if (v) { vasc = seeds = true; cv.set(true); cs.set(true); } update(); } });
  MLX.slider(c1, { label: T.hab, min: 0, max: 3, value: hab, fmt: (i) => L(HAB[i]), onInput: (i) => { hab = i; update(); } });
  const c2 = MLX.card(ui.side, T.res);
  const ro = MLX.readout(c2, [['group', T.group], ['height', T.height], ['water', T.water], ['fert', T.fert], ['here', T.here]]);

  function update() {
    const g = G[group()], v = verdict();
    ro.set('group', L(g.n)); ro.set('height', L(g.h)); ro.set('water', L(g.water)); ro.set('fert', L(g.fert));
    ro.set('here', L(T[v]), v === 'thrives' ? '#86efac' : v === 'noRepro' ? '#fde68a' : '#fca5a5');
    const gg = group();
    let c;
    if (v === 'dies') c = { en: 'Without vascular tissue, water is only absorbed over the surface, so mosses need constantly damp places and dry out here.', af: 'Sonder vaatweefsel word water net deur die oppervlak geabsorbeer, so mosse het voortdurend klam plekke nodig en droog hier uit.' };
    else if (v === 'noRepro') c = { en: 'Xylem lets the fern reach water deep in the soil, but its sperm still need a film of water to swim to the egg — it cannot reproduce here.', af: 'Xileem laat die varing water diep in die grond bereik, maar sy sperme het steeds \'n waterlagie nodig om na die eiersel te swem — dit kan nie hier voortplant nie.' };
    else if (gg === 'bryo' || gg === 'pter') c = { en: 'Water is everywhere, so sperm can swim to the egg: fertilisation works.', af: 'Daar is oral water, so sperme kan na die eiersel swem: bevrugting werk.' };
    else if (gg === 'gymn') c = { en: 'Pollen is carried by the wind, so no water is needed for fertilisation; seeds protect the embryo in dry places.', af: 'Stuifmeel word deur die wind gedra, so geen water is nodig vir bevrugting nie; sade beskerm die embrio op droë plekke.' };
    else c = { en: 'Flowers attract animals that carry pollen, and fruits help spread the seeds: angiosperms can live almost anywhere on land.', af: 'Blomme lok diere wat stuifmeel dra, en vrugte help om die sade te versprei: angiosperme kan byna oral op land leef.' };
    ui.setCaption(c);
    ui.cv.draw();
  }

  function draw(ctx, W, H) {
    const gy = H * 0.74, g = group(), v = verdict();
    // sky and ground, drier to the right of the slider
    const dryT = hab / 3;
    ctx.fillStyle = `rgb(${Math.round(12 + 30 * dryT)},${Math.round(24 + 10 * dryT)},${Math.round(44 - 10 * dryT)})`; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = `rgb(${Math.round(55 + 90 * dryT)},${Math.round(65 + 50 * dryT)},${Math.round(40 + 10 * dryT)})`; ctx.fillRect(0, gy, W, H - gy);
    if (hab === 0) { ctx.fillStyle = 'rgba(56,189,248,0.45)'; ctx.fillRect(0, gy - 6, W, 10); }
    if (hab === 1) { ctx.fillStyle = 'rgba(56,189,248,0.3)'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.ellipse(W * (0.12 + k * 0.15), gy + 2, 26, 4, 0, 0, Math.PI * 2); ctx.fill(); } }
    if (hab === 3) { ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 1; for (let k = 0; k < 12; k++) { const x = W * k / 12; ctx.beginPath(); ctx.moveTo(x, gy + 4); ctx.lineTo(x + 14, gy + 16); ctx.lineTo(x + 6, gy + 30); ctx.stroke(); } }
    const cx = W * 0.42, wilt = v === 'dies';
    // the plant
    if (g === 'bryo') {
      for (let k = 0; k < 18; k++) { const x = cx - 80 + k * 9, hgt = 10 + (k % 3) * 4; ctx.strokeStyle = wilt ? '#a16207' : '#4ade80'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + (wilt ? 5 : 0), gy - hgt); ctx.stroke(); }
      ctx.strokeStyle = wilt ? '#78350f' : '#a3e635'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx + 40, gy - 14); ctx.lineTo(cx + 44, gy - 44); ctx.stroke(); ctx.fillStyle = ctx.strokeStyle; ctx.fillRect(cx + 41, gy - 52, 6, 9);
    } else if (g === 'pter') {
      for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.32; ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx, gy); const ex = cx + Math.cos(a) * 110, ey = gy + Math.sin(a) * 110; ctx.quadraticCurveTo(cx + Math.cos(a) * 60, gy + Math.sin(a) * 80, ex, ey); ctx.stroke();
        for (let j = 1; j < 9; j++) { const u = j / 9, px = cx + (ex - cx) * u, py = gy + (ey - gy) * u - Math.sin(u * Math.PI) * 12; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 9 * (1 - u), py - 6); ctx.moveTo(px, py); ctx.lineTo(px + 9 * (1 - u), py - 6); ctx.stroke(); } }
    } else if (g === 'gymn') {
      ctx.fillStyle = '#5b3a1e'; ctx.fillRect(cx - 6, gy - 60, 12, 60);
      ctx.fillStyle = '#166534'; for (let k = 0; k < 4; k++) { const y = gy - 50 - k * 38, w2 = 70 - k * 14; ctx.beginPath(); ctx.moveTo(cx - w2, y); ctx.lineTo(cx, y - 60); ctx.lineTo(cx + w2, y); ctx.closePath(); ctx.fill(); }
      ctx.fillStyle = '#92400e'; [[-30, -70], [24, -110], [-14, -150]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.ellipse(cx + dx, gy + dy, 5, 9, 0, 0, Math.PI * 2); ctx.fill(); });
    } else {
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, gy); ctx.lineTo(cx, gy - 120); ctx.stroke();
      ctx.fillStyle = '#16a34a'; [[-1, -50], [1, -75], [-1, -95]].forEach(([s, dy]) => { ctx.beginPath(); ctx.ellipse(cx + s * 18, gy + dy, 18, 7, s * 0.4, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = '#f472b6'; for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * 10, gy - 128 + Math.sin(a) * 10, 9, 5, a, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(cx, gy - 128, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(cx + 30, gy - 40, 7, 0, Math.PI * 2); ctx.fill();
    }
    // fertilisation, animated on the right
    const fx0 = W * 0.62, fx1 = W * 0.92, fy = gy - 24;
    text(ctx, { en: 'Fertilisation', af: 'Bevrugting' }, fx0, 26, { size: 12, weight: 700, color: 'rgba(226,232,240,0.6)' });
    ctx.fillStyle = '#fca5a5'; ctx.beginPath(); ctx.arc(fx1, fy, 12, 0, Math.PI * 2); ctx.fill();
    text(ctx, seeds ? { en: 'ovule (egg inside)', af: 'saadknop (eiersel binne)' } : { en: 'egg', af: 'eiersel' }, fx1, fy + 28, { size: 11, align: 'center', color: '#fecaca' });
    const p = (t0 * 0.35) % 1;
    if (g === 'bryo' || g === 'pter') {
      const wetOk = hab <= 1;
      ctx.fillStyle = wetOk ? 'rgba(56,189,248,0.45)' : 'rgba(56,189,248,0.12)';
      ctx.fillRect(fx0, fy + 8, (fx1 - fx0) * (wetOk ? 1 : 0.3), 6);
      for (let k = 0; k < 5; k++) {
        const prog = wetOk ? (p + k * 0.15) % 1 : Math.min(0.28, (p + k * 0.05) % 0.3);
        const x = fx0 + prog * (fx1 - fx0 - 12), y = fy + 4 + Math.sin(t0 * 8 + k) * 3;
        ctx.strokeStyle = '#e0f2fe'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.moveTo(x - 3, y); ctx.quadraticCurveTo(x - 8, y + Math.sin(t0 * 14 + k) * 4, x - 12, y); ctx.stroke();
      }
      text(ctx, wetOk ? { en: 'sperm swim through water', af: 'sperme swem deur water' } : { en: 'too dry: sperm cannot reach the egg', af: 'te droog: sperme kan nie die eiersel bereik nie' }, fx0, fy + 50, { size: 11, color: wetOk ? '#bae6fd' : '#fca5a5' });
    } else {
      const bee = g === 'angi';
      for (let k = 0; k < 6; k++) {
        const prog = (p + k * 0.17) % 1, x = fx0 + prog * (fx1 - fx0 - 12), y = fy - 50 + Math.sin(prog * Math.PI) * -20 + k * 6;
        ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(x, y + 40 * prog, 2.5, 0, Math.PI * 2); ctx.fill();
      }
      if (bee) { const x = fx0 + p * (fx1 - fx0 - 20), y = fy - 40 + Math.sin(t0 * 6) * 6; ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.ellipse(x, y, 8, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#111'; ctx.fillRect(x - 2, y - 5, 2, 10); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.beginPath(); ctx.ellipse(x - 2, y - 7, 5, 3, -0.5, 0, Math.PI * 2); ctx.fill(); }
      text(ctx, bee ? { en: 'pollen carried by insects and wind', af: 'stuifmeel deur insekte en wind gedra' } : { en: 'pollen carried by the wind', af: 'stuifmeel deur die wind gedra' }, fx0, fy + 50, { size: 11, color: '#fde68a' });
    }
    text(ctx, L(HAB[hab]), 14, H - 12, { size: 12, weight: 700, color: 'rgba(226,232,240,0.75)' });
  }

  update();
  MLX.loop(ui.stage, (dt) => { t0 += dt; ui.cv.draw(); }).start();
});
