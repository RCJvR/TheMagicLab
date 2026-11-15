/* Gr10 The hydrosphere — two views.
 * 1. The water cycle, driven by the sun (evaporation) and gravity (precipitation, run-off). Global fluxes in
 *    thousand km³ per year (Trenberth et al. 2007): the sea evaporates 413, 373 falls back on the sea as rain and
 *    40 is blown over the land as vapour. Evaporation is energy-limited, so it scales with the solar energy that
 *    reaches the surface (a model: 100% = today). On land, a fraction of the rain is transpired by plants (t) or
 *    evaporates again from soil and lakes (e) and so falls again as rain (recycling); the rest returns to the sea
 *    as run-off or soaks in (infiltration) to refill groundwater, which also flows slowly to the sea.
 *      rain on land P = 40·s / (1 − t − e),  t = 0.15 + 0.35·plant cover,  e = 0.25
 *      infiltration = (1 − t − e)·P·f, f = 0.25 + 0.25·plant cover on soil, 0.05 on paved ground; run-off = the rest
 *    Steady state: water returned to the sea (run-off + groundwater) = 40·s, the vapour blown in.
 *    At s = 1 and 60% plant cover: P ≈ 103, ET ≈ 63 (measured: 113 and 73).
 * 2. Where Earth's water is (1 386 million km³): salt water 97.5%; fresh 2.5% = ice caps and glaciers ≈ 69%,
 *    groundwater ≈ 30%, lakes, rivers, soil and air ≈ 1% of the fresh water (the lesson's table).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'A cross-section of sea, land, clouds and groundwater showing the water cycle', af: '\'n Deursnee van see, land, wolke en grondwater wat die watersiklus wys' },
    ariaD: { en: 'A grid of 1000 squares showing how Earth\'s water is shared between the sea, ice, groundwater and surface water', af: '\'n Rooster van 1000 blokkies wat wys hoe die aarde se water tussen die see, ys, grondwater en oppervlakwater verdeel is' },
    view: { en: 'View', af: 'Aansig' }, vCyc: { en: 'Water cycle', af: 'Watersiklus' }, vDist: { en: 'Where the water is', af: 'Waar die water is' },
    rainL: { en: 'Rain on land', af: 'Reën op land' }, unit: { en: 'thousand km³ per year', af: 'duisend km³ per jaar' },
    evap: { en: 'Evaporation from the sea', af: 'Verdamping uit die see' }, trans: { en: 'Transpiration by plants', af: 'Transpirasie deur plante' },
    run: { en: 'Run-off to the sea', af: 'Afloop na die see' }, inf: { en: 'Infiltration into the ground', af: 'Infiltrasie in die grond' },
    conds: { en: 'Conditions', af: 'Toestande' }, sun: { en: 'Solar energy (today = 100%)', af: 'Sonenergie (vandag = 100%)' },
    plants: { en: 'Plant cover on the land', af: 'Plantbedekking op die land' }, ground: { en: 'Ground surface', af: 'Grondoppervlak' },
    soil: { en: 'Soil and veld', af: 'Grond en veld' }, paved: { en: 'Paved city', af: 'Geplaveide stad' },
    // labels in the drawing
    lEvap: { en: 'evaporation', af: 'verdamping' }, lCond: { en: 'condensation (clouds)', af: 'kondensasie (wolke)' }, lPrec: { en: 'precipitation', af: 'presipitasie' },
    lTrans: { en: 'transpiration', af: 'transpirasie' }, lRun: { en: 'run-off', af: 'afloop' }, lInf: { en: 'infiltration', af: 'infiltrasie' },
    lGw: { en: 'groundwater (aquifer)', af: 'grondwater (akwifeer)' }, lSea: { en: 'sea (salt water)', af: 'see (soutwater)' }, lWind: { en: 'vapour blown over land', af: 'damp oor land gewaai' },
    lSun: { en: 'sun', af: 'son' }, lCity: { en: 'paved', af: 'geplavei' },
    // distribution view
    fresh: { en: 'Fresh water', af: 'Vars water' }, freshU: { en: '% of all Earth\'s water', af: '% van al die aarde se water' },
    easy: { en: 'Lakes, rivers, soil and air', af: 'Mere, riviere, grond en lug' }, easyU: { en: '% of the fresh water', af: '% van die vars water' },
    zoom: { en: 'Show', af: 'Wys' }, zAll: { en: 'All Earth\'s water', af: 'Al die aarde se water' }, zFresh: { en: 'Only the fresh water', af: 'Net die vars water' },
    scale: { en: 'Imagine all of it as', af: 'Stel jou alles voor as' }, 
    salt: { en: 'Sea and other salt water', af: 'See en ander soutwater' }, ice: { en: 'Ice caps and glaciers', af: 'Yskappe en gletsers' },
    gw: { en: 'Groundwater', af: 'Grondwater' }, surf: { en: 'Lakes, rivers, soil and air', af: 'Mere, riviere, grond en lug' },
    cell: { en: 'Each square = 0.1% of', af: 'Elke blokkie = 0,1% van' }, cellAll: { en: 'all Earth\'s water', af: 'al die aarde se water' }, cellFresh: { en: 'the fresh water', af: 'die vars water' },
    tiny: { en: 'lakes and rivers: less than one square', af: 'mere en riviere: minder as een blokkie' },
    // captions
    cDef: { en: 'The sun\'s energy evaporates water; the vapour rises, cools and condenses into clouds, falls as rain, and gravity returns it to the sea.', af: 'Die son se energie verdamp water; die damp styg, koel af en kondenseer tot wolke, val as reën, en swaartekrag bring dit terug na die see.' },
    cSun: { en: 'Less solar energy: less water evaporates, so less vapour condenses and less rain falls. The sun drives the whole cycle.', af: 'Minder sonenergie: minder water verdamp, dus kondenseer minder damp en val minder reën. Die son dryf die hele siklus aan.' },
    cHot: { en: 'More solar energy: more water evaporates, so more vapour condenses into clouds and more rain falls.', af: 'Meer sonenergie: meer water verdamp, dus kondenseer meer damp tot wolke en val meer reën.' },
    cPave: { en: 'On paved ground little rain can soak in: most of it runs off, rivers flood quickly and the groundwater is not refilled.', af: 'Op geplaveide grond kan min reën insak: die meeste loop af, riviere oorstroom vinnig en die grondwater word nie aangevul nie.' },
    cBare: { en: 'With few plants, little water is transpired back into the air, so less rain falls on the land and less soaks in.', af: 'Met min plante word min water terug in die lug getranspireer, dus val minder reën op die land en sak minder in.' },
    cAll: { en: 'Only 2.5% of Earth\'s water is fresh, and most of that is frozen in ice caps or hidden underground.', af: 'Net 2,5% van die aarde se water is vars, en die meeste daarvan is in yskappe gevries of ondergronds versteek.' },
    cFresh: { en: 'Of the fresh water, about 69% is ice and 30% groundwater: lakes, rivers, soil and air hold only about 1%.', af: 'Van die vars water is ongeveer 69% ys en 30% grondwater: mere, riviere, grond en lug hou net ongeveer 1%.' },
  };
  // share of ALL water (%), from the lesson's table
  const RES = [
    { k: 'salt', all: 97.5, fresh: 0 }, { k: 'ice', all: 1.725, fresh: 69 },
    { k: 'gw', all: 0.75, fresh: 30 }, { k: 'surf', all: 0.025, fresh: 1 },
  ];
  const S = { mode: 'cycle', sun: 100, plants: 60, ground: 'soil', zoom: 'all', vol: 100, t: 0 };

  function flux() {
    const s = S.sun / 100, v = S.plants / 100;
    const t = 0.15 + 0.35 * v, e = 0.25, r = 1 - t - e;
    const P = 40 * s / r, f = S.ground === 'paved' ? 0.05 : 0.25 + 0.25 * v;
    return { Eo: 413 * s, Po: 373 * s, A: 40 * s, P, T: t * P, Es: e * P, I: r * P * f, R: r * P * (1 - f) };
  }

  const ui = MLX.layout(root, { height: (w) => w < 640 ? (S.mode === 'cycle' ? 480 : 330) : Math.max(380, Math.min(470, Math.round(w * 0.56))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const c0 = MLX.card(ui.side);
  MLX.seg(c0, { label: T.view, options: [['cycle', T.vCyc], ['dist', T.vDist]], value: S.mode, onChange: (v) => { S.mode = v; update(); } });
  // water-cycle controls
  const pC = MLX.primary(ui.side, { label: T.rainL, unit: T.unit });
  const roC = MLX.readout(pC.el, [['e', T.evap], ['t', T.trans], ['r', T.run], ['i', T.inf]]);
  const cC = MLX.card(ui.side, T.conds);
  MLX.slider(cC, { label: T.sun, min: 50, max: 150, step: 5, value: S.sun, fmt: (v) => v + '%', onInput: (v) => { S.sun = v; update(); } });
  MLX.slider(cC, { label: T.plants, min: 0, max: 100, step: 5, value: S.plants, fmt: (v) => v + '%', onInput: (v) => { S.plants = v; update(); } });
  MLX.seg(cC, { label: T.ground, options: [['soil', T.soil], ['paved', T.paved]], value: S.ground, onChange: (v) => { S.ground = v; update(); } });
  // distribution controls
  const pD = MLX.primary(ui.side, { label: T.fresh, unit: T.freshU });
  const cD = MLX.card(ui.side);
  MLX.seg(cD, { label: T.zoom, options: [['all', T.zAll], ['fresh', T.zFresh]], value: S.zoom, onChange: (v) => { S.zoom = v; update(); } });
  const VOLS = [1, 10, 100, 1000];
  MLX.slider(cD, { label: T.scale, min: 0, max: 3, step: 1, value: 2, fmt: (i) => VOLS[i] + ' L', onInput: (i) => { S.vol = VOLS[i]; update(); } });
  const roD = MLX.readout(cD, [['salt', T.salt], ['ice', T.ice], ['gw', T.gw], ['surf', T.surf]]);

  MLX.loop(ui.cv.el, (dt) => { if (!MLX.reducedMotion && S.mode === 'cycle') { S.t += dt; ui.cv.draw(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx, P;
  function pal() {
    const l = c.light;
    return {
      sky: l ? '#f3f8fc' : '#0d131b', sea: l ? '#bfdcf2' : '#123150', seaLine: l ? '#2f7fbf' : '#5aa9e6',
      land: l ? '#e6dcc4' : '#2c271d', soil: l ? '#d6c7a4' : '#3a3224', gw: l ? 'rgba(47,127,191,0.30)' : 'rgba(70,150,225,0.30)',
      water: l ? '#2f7fbf' : '#69b4f0', vap: l ? 'rgba(47,110,170,0.55)' : 'rgba(170,210,240,0.65)', cloud: l ? '#ffffff' : '#3b4452',
      cloudLine: l ? 'rgba(22,24,29,0.28)' : 'rgba(226,232,240,0.30)', sun: l ? '#d98a00' : '#f5b23d', leaf: l ? '#3f7a3a' : '#6fb35e',
      trunk: l ? '#7a5a3a' : '#9c7a55', snow: l ? '#ffffff' : '#dfe9f2', city: l ? '#9aa0a8' : '#5b616b',
      salt: l ? '#2f6fa8' : '#3a7cc0', ice: l ? '#cfe6f4' : '#d8ecf8', gwC: l ? '#2f9c80' : '#3fb59a', surf: l ? '#d98a00' : '#f5b23d',
    };
  }
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); P = pal();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.mode === 'cycle') cycle(W, H); else dist(W, H);
  }
  // text with a halo in the stage colour so labels stay legible over particles
  function lab(s, x, y, o) {
    o = o || {};
    ctx.save(); ctx.font = (o.weight || 600) + ' ' + (o.size || 12) + 'px "Cabinet Grotesk", sans-serif';
    ctx.textAlign = o.align || 'left'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
    ctx.strokeStyle = o.halo || P.sky; ctx.lineWidth = 4; ctx.strokeText(L(s), x, y);
    ctx.fillStyle = o.color || c.text; ctx.fillText(L(s), x, y); ctx.restore();
  }
  function arrow(x1, y1, x2, y2, w, col) {
    const a = Math.atan2(y2 - y1, x2 - x1), hl = 6 + w * 1.4;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * hl * 0.8, y2 - Math.sin(a) * hl * 0.8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - Math.cos(a - 0.45) * hl, y2 - Math.sin(a - 0.45) * hl); ctx.lineTo(x2 - Math.cos(a + 0.45) * hl, y2 - Math.sin(a + 0.45) * hl);
    ctx.closePath(); ctx.fill(); ctx.lineCap = 'butt';
  }
  const fr = (x) => x - Math.floor(x);
  const rnd = (i) => fr(Math.sin(i * 127.1 + 311.7) * 43758.5453);

  function cycle(W, H) {
    const F = flux(), ph = W < 640, k = 1;
    const sx = (f) => W * f, sy = (f) => H * f;
    const ySea = sy(0.64), coast = sx(0.38);
    // land profile (x fraction, y fraction)
    const prof = [[0.36, 0.64], [0.44, 0.60], [0.58, 0.575], [0.72, 0.55], [0.80, 0.47], [0.90, 0.30], [0.96, 0.36], [1.0, 0.40]];
    const yLand = (x) => { const f = x / W; for (let i = 1; i < prof.length; i++) if (f <= prof[i][0]) { const [a, b] = [prof[i - 1], prof[i]]; return sy(a[1] + (b[1] - a[1]) * (f - a[0]) / (b[0] - a[0])); } return sy(0.40); };
    // sky
    ctx.fillStyle = P.sky; ctx.fillRect(0, 0, W, H);
    // sea
    ctx.fillStyle = P.sea; ctx.fillRect(0, ySea, coast + 10, H - ySea);
    ctx.strokeStyle = P.seaLine; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, ySea); ctx.lineTo(coast + 6, ySea); ctx.stroke();
    // land
    ctx.fillStyle = P.land; ctx.beginPath(); ctx.moveTo(sx(prof[0][0]), H);
    prof.forEach(([x, y]) => ctx.lineTo(sx(x), sy(y))); ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2; ctx.beginPath(); prof.forEach(([x, y], i) => i ? ctx.lineTo(sx(x), sy(y)) : ctx.moveTo(sx(x), sy(y))); ctx.stroke();
    // groundwater: below the water table, which slopes down to the coast
    const wt = (x) => sy(0.74) - (x - coast) / (W - coast) * sy(0.10);
    ctx.fillStyle = P.gw; ctx.beginPath(); ctx.moveTo(coast + 4, H); ctx.lineTo(coast + 4, wt(coast + 4));
    for (let x = coast + 4; x <= W; x += 8) ctx.lineTo(x, wt(x));
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    ctx.setLineDash([5, 4]); ctx.strokeStyle = P.water; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(coast + 4, wt(coast + 4)); ctx.lineTo(W, wt(W)); ctx.stroke(); ctx.setLineDash([]);
    lab(T.lGw, sx(0.97), sy(0.93), { align: 'right', size: 12 * k, color: c.text2, halo: P.land });
    // snow cap on the peak
    ctx.fillStyle = P.snow; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath();
    ctx.moveTo(sx(0.90), sy(0.30)); ctx.lineTo(sx(0.873), sy(0.345)); ctx.lineTo(sx(0.89), sy(0.338)); ctx.lineTo(sx(0.905), sy(0.35)); ctx.lineTo(sx(0.92), sy(0.335)); ctx.closePath(); ctx.fill(); ctx.stroke();
    // paved city on the lowland
    if (S.ground === 'paved') {
      ctx.fillStyle = P.city;
      [[0.44, 0.06], [0.475, 0.10], [0.515, 0.075]].forEach(([x, hgt]) => { const X = sx(x), w = sx(0.028), y = yLand(X + w / 2); ctx.fillRect(X, y - sy(hgt), w, sy(hgt) + 2); });
      ctx.fillRect(sx(0.40), yLand(sx(0.47)) - 1, sx(0.33), 4);
      lab(T.lCity, sx(0.489), yLand(sx(0.489)) - sy(0.10) - 7, { align: 'center', size: 12 * k, color: c.text2, halo: P.land });
    }
    // trees: number follows plant cover
    const nT = Math.round(S.plants / 20), treeX = [];
    for (let i = 0; i < nT; i++) {
      const X = sx(0.57 + i * 0.035 + (S.ground === 'paved' ? 0.03 : 0)), y = yLand(X), r = 9 * k + 2;
      ctx.strokeStyle = P.trunk; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X, y); ctx.lineTo(X, y - 14 * k); ctx.stroke();
      ctx.fillStyle = P.leaf; ctx.beginPath(); ctx.arc(X, y - 14 * k - r * 0.7, r, 0, Math.PI * 2); ctx.fill();
      treeX.push([X, y - 14 * k - r * 1.4]);
    }
    // sun: rays grow with the solar energy
    const sunX = sx(0.07), sunY = sy(0.11), sr = 15 * k;
    ctx.strokeStyle = P.sun; ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5, r1 = sr + 4, r2 = sr + 4 + 10 * S.sun / 100; ctx.beginPath(); ctx.moveTo(sunX + Math.cos(a) * r1, sunY + Math.sin(a) * r1); ctx.lineTo(sunX + Math.cos(a) * r2, sunY + Math.sin(a) * r2); ctx.stroke(); }
    ctx.fillStyle = P.sun; ctx.beginPath(); ctx.arc(sunX, sunY, sr, 0, Math.PI * 2); ctx.fill();
    // clouds: size follows the amount of water condensing in them
    const seaC = [sx(0.24), sy(0.17)], landC = [sx(0.66), sy(0.14)];
    const cloud = (x, y, s) => {
      const puffs = [[-1.1, 0.25, 0.55], [-0.45, -0.15, 0.75], [0.35, -0.05, 0.65], [1.0, 0.3, 0.5], [0, 0.35, 0.6]];
      const path = (grow) => { ctx.beginPath(); puffs.forEach(([dx, dy, r]) => { ctx.moveTo(x + dx * s + r * s + grow, y + dy * s); ctx.arc(x + dx * s, y + dy * s, r * s + grow, 0, Math.PI * 2); }); };
      ctx.fillStyle = P.cloudLine; path(1.2); ctx.fill();   // outline: a slightly larger copy behind
      ctx.fillStyle = P.cloud; path(0); ctx.fill();
    };
    const baseS = Math.min(W, H * 1.6) * 0.045;
    // particles: deterministic phases so the picture is the same at any frame rate
    const t = MLX.reducedMotion ? 0.37 : S.t;
    const dots = (n, speed, fn) => { for (let i = 0; i < n; i++) { const p = fr(t * speed + i / n + rnd(i) * 0.15); fn(p, i); } };
    // evaporation from the sea
    ctx.fillStyle = P.vap;
    dots(Math.round(16 * F.Eo / 413), 0.18, (p, i) => { const X = sx(0.05 + 0.29 * rnd(i + 3)), Y = ySea - p * (ySea - seaC[1] - baseS * 0.9); ctx.beginPath(); ctx.arc(X + Math.sin(p * 9 + i) * 3, Y, 2.6, 0, Math.PI * 2); ctx.fill(); });
    // transpiration from the trees
    if (treeX.length) dots(Math.round(10 * F.T / 50), 0.2, (p, i) => { const [X, Y0] = treeX[i % treeX.length], Y = Y0 - p * (Y0 - landC[1] - baseS); ctx.beginPath(); ctx.arc(X + Math.sin(p * 8 + i) * 4, Y, 2.4, 0, Math.PI * 2); ctx.fill(); });
    // rain on the sea and on the land
    ctx.strokeStyle = P.water; ctx.lineWidth = 1.6;
    const drop = (X, Y) => { ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X - 1.5, Y + 7); ctx.stroke(); };
    dots(Math.round(14 * F.Po / 373), 0.7, (p, i) => { const X = sx(0.17 + 0.15 * rnd(i + 11)), y0 = seaC[1] + baseS * 0.6; drop(X, y0 + p * (ySea - y0 - 8)); });
    dots(Math.round(14 * F.P / 103), 0.7, (p, i) => { const X = sx(0.57 + 0.19 * rnd(i + 21)), y0 = landC[1] + baseS * 0.6; drop(X, y0 + p * (yLand(X) - y0 - 8)); });
    cloud(seaC[0], seaC[1], baseS * Math.sqrt(F.Po / 373));
    cloud(landC[0], landC[1], baseS * Math.sqrt(F.P / 103));
    // vapour carried from the sea to the land
    const aw = Math.max(1.5, 4 * F.A / 40);
    arrow(seaC[0] + baseS * 1.6, seaC[1] - baseS * 0.2, landC[0] - baseS * 1.9, landC[1] - baseS * 0.1, aw, P.vap);
    // river (run-off) from the mountain to the sea; width follows the run-off
    const riv = []; for (let f = 0.86; f >= 0.375; f -= 0.01) riv.push([sx(f), yLand(sx(f)) - 2]);
    ctx.strokeStyle = P.water; ctx.lineWidth = Math.max(1.5, 1 + 4 * F.R / 30); ctx.lineJoin = 'round';
    ctx.beginPath(); riv.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
    ctx.fillStyle = P.sky;
    dots(Math.round(8 * F.R / 30), 0.35, (p) => { const j = Math.min(riv.length - 1, Math.floor(p * riv.length)); ctx.beginPath(); ctx.arc(riv[j][0], riv[j][1], 1.3, 0, Math.PI * 2); ctx.fill(); });
    // infiltration down to the water table, then groundwater flow to the sea
    ctx.fillStyle = P.water;
    dots(Math.round(10 * F.I / 13), 0.3, (p, i) => { const X = sx(0.60 + 0.18 * rnd(i + 31)), y0 = yLand(X) + 3; ctx.beginPath(); ctx.arc(X, y0 + p * (wt(X) - y0), 1.8, 0, Math.PI * 2); ctx.fill(); });
    arrow(sx(0.70), wt(sx(0.70)) + sy(0.07), sx(0.46), wt(sx(0.46)) + sy(0.07), Math.max(1.2, 3 * F.I / 13), P.water);
    // labels
    const s12 = 12 * k + (ph ? 0 : 1);
    lab(T.lSun, sunX + sr + 16, sunY + 4, { size: s12, color: c.text2 });
    lab(T.lEvap, sx(0.03), sy(0.47), { size: s12, color: c.text });
    lab(T.lCond, landC[0], landC[1] - baseS * 1.2 - 6, { size: s12, align: 'center' });
    lab(T.lWind, (seaC[0] + landC[0]) / 2, ph ? seaC[1] + baseS + 18 : Math.min(seaC[1], landC[1]) - baseS * 0.9 - 2, { size: 12, align: 'center', color: c.text2 });
    lab(T.lPrec, sx(ph ? 0.79 : 0.775), sy(0.40), { size: s12, align: ph ? 'right' : 'left' });
    if (treeX.length) lab(T.lTrans, treeX[0][0] - 10, treeX[0][1] - sy(0.09), { size: s12, align: 'right' });
    lab(T.lRun, sx(0.47), yLand(sx(0.47)) + 22, { size: s12, align: 'center', halo: P.land });
    lab(T.lInf, sx(0.79), wt(sx(0.79)) - 8, { size: s12, align: 'left', halo: P.land });
    lab(T.lSea, sx(0.03), H - 12, { size: s12, color: c.text2, halo: P.sea });
  }

  function dist(W, H) {
    const ph = W < 640, fresh = S.zoom === 'fresh';
    const keys = RES.filter(r => !fresh || r.fresh > 0);
    const share = (r) => (fresh ? r.fresh : r.all) * 10; // in squares of 1000
    const col = (k) => P[k === 'gw' ? 'gwC' : k];
    // grid: 40 × 25 on desktop, 25 × 40 on a phone
    const cols = 40, rows = 25;
    const legH = ph ? 116 : 0, legW = ph ? 0 : Math.min(250, W * 0.32);
    const gw = W - legW - 32, gh = H - legH - 46;
    const cs = Math.floor(Math.min(gw / cols, gh / rows)), gx = 16, gy = 30;
    text(ctx, L(T.cell) + ' ' + L(fresh ? T.cellFresh : T.cellAll), gx, 20, { size: 12, color: c.text2 });
    let cum = 0; const bounds = keys.map(r => { const a = cum; cum += share(r); return [r, a, cum]; });
    for (let i = 0; i < cols * rows; i++) {
      const X = gx + (i % cols) * cs, Y = gy + Math.floor(i / cols) * cs;
      ctx.fillStyle = c.lineSoft; ctx.fillRect(X, Y, cs - 1, cs - 1);
      bounds.forEach(([r, a, b]) => {
        const lo = Math.max(a, i), hi = Math.min(b, i + 1);
        if (hi > lo) { ctx.fillStyle = col(r.k); ctx.fillRect(X + (lo - i) * (cs - 1), Y, (hi - lo) * (cs - 1), cs - 1); }
      });
    }
    // mark the tiny surface-water share
    const last = bounds[bounds.length - 1];
    if (last[0].k === 'surf' && !fresh) {
      const i = Math.floor(last[1]), X = gx + (i % cols) * cs + cs / 2, Y = gy + Math.floor(i / cols) * cs + cs;
      ctx.strokeStyle = c.text2; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X, Y + 14); ctx.stroke();
      lab(T.tiny, Math.min(X, gx + cols * cs - 4), Y + 28, { size: 12, align: X > gx + cols * cs * 0.6 ? 'right' : 'left', halo: c.stage, color: c.text });
    }
    // legend
    const lx = ph ? gx : gx + cols * cs + 20, ly0 = ph ? gy + rows * cs + (fresh ? 16 : 40) : gy + 6;
    keys.forEach((r, j) => {
      const y = ly0 + j * (ph ? 22 : 34);
      ctx.fillStyle = col(r.k); ctx.fillRect(lx, y, 14, 14); ctx.strokeStyle = c.line; ctx.strokeRect(lx + 0.5, y + 0.5, 13, 13);
      text(ctx, T[r.k], lx + 22, y + 12, { size: 13, color: c.text });
      text(ctx, num(fresh ? r.fresh : r.all, (fresh ? r.fresh : r.all) < 1 ? 3 : 1).replace(/0+$/, '').replace(/[.,]$/, '') + '%', ph ? W - 16 : lx + 22, ph ? y + 12 : y + 28, { size: 12, mono: true, align: ph ? 'right' : 'left', color: c.text2 });
    });
  }

  const fmtL = (litres) => litres >= 1 ? num(litres, litres >= 10 ? 0 : 1) + ' L' : litres >= 0.001 ? num(litres * 1000, litres * 1000 >= 10 ? 0 : 1) + ' mL' : num(litres * 1e6, 0) + ' µL';
  function update() {
    const cyc = S.mode === 'cycle';
    [pC.el, cC].forEach(e => { e.style.display = cyc ? '' : 'none'; });
    [pD.el, cD].forEach(e => { e.style.display = cyc ? 'none' : ''; });
    if (cyc) {
      const F = flux();
      pC.set(num(F.P, 0));
      roC.set('e', num(F.Eo, 0)); roC.set('t', num(F.T, 0)); roC.set('r', num(F.R, 0)); roC.set('i', num(F.I, 0));
      ui.setCaption(S.ground === 'paved' ? T.cPave : S.sun < 90 ? T.cSun : S.plants < 25 ? T.cBare : S.sun > 110 ? T.cHot : T.cDef);
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + L(T.sun) + ' ' + S.sun + '%, ' + L(T.plants) + ' ' + S.plants + '%: ' + L(T.rainL) + ' ' + num(F.P, 0) + ' ' + L(T.unit) + '.');
    } else {
      const fresh = S.zoom === 'fresh';
      pD.el.querySelector('.mlx-card-title').textContent = L(fresh ? T.easy : T.fresh);
      pD.el.querySelector('.mlx-primary-unit').textContent = L(fresh ? T.easyU : T.freshU);
      pD.set(fresh ? '≈ 1' : num(2.5, 1));
      // amounts if the whole (all water, or all fresh water) were S.vol litres
      RES.forEach(r => roD.set(r.k, fresh && r.k === 'salt' ? '–' : fmtL(S.vol * (fresh ? r.fresh : r.all) / 100)));
      ui.setCaption(fresh ? T.cFresh : T.cAll);
      ui.cv.el.setAttribute('aria-label', L(T.ariaD) + '. ' + L(fresh ? T.cFresh : T.cAll));
    }
    ui.cv.draw();
  }
  update();
});
