/* Gr11 Excretion — the nephron and water balance (ADH).
 * A day's water budget: water in (drinks + food + respiration) minus water out
 * through lungs, faeces and sweat. The kidneys excrete the rest as urine, but
 * never less than about 0.5 L (needed to remove the day's urea). Concentration
 * = solute load (~600 mOsm/day) ÷ urine volume, from ~50 up to ~1200 mOsm/L.
 * The kidneys filter ~180 L a day and reabsorb all but the urine; ADH sets how
 * much water the collecting ducts take back.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'A nephron with the glomerulus, tubule, loop of Henle and collecting duct', af: '\'n Nefron met die glomerulus, buisie, lus van Henle en versamelbuis' },
    day: { en: 'Your day', af: 'Jou dag' }, drink: { en: 'Water drunk', af: 'Water gedrink' },
    sweat: { en: 'Sweating', af: 'Sweet' }, cool: { en: 'Cool day', af: 'Koel dag' }, hot: { en: 'Hot day', af: 'Warm dag' }, sport: { en: 'Hot + exercise', af: 'Warm + oefening' },
    kid: { en: 'Kidneys', af: 'Niere' }, filt: { en: 'Filtrate formed', af: 'Filtraat gevorm' }, reab: { en: 'Water reabsorbed', af: 'Water geherabsorbeer' },
    adh: { en: 'ADH released', af: 'ADH vrygestel' }, urine: { en: 'Urine', af: 'Urine' }, conc: { en: 'Urine concentration', af: 'Urinekonsentrasie' },
    body: { en: 'Body water', af: 'Liggaamswater' }, ok: { en: 'balanced', af: 'in balans' }, dry: { en: 'dehydrated', af: 'gedehidreer' },
    low: { en: 'low', af: 'laag' }, med: { en: 'medium', af: 'medium' }, high: { en: 'high', af: 'hoog' }, max: { en: 'maximum', af: 'maksimum' },
    glom: { en: 'Glomerulus', af: 'Glomerulus' }, bow: { en: "Bowman's capsule", af: 'Bowman-kapsel' }, henle: { en: 'Loop of Henle', af: 'Lus van Henle' },
    duct: { en: 'Collecting duct', af: 'Versamelbuis' }, toBlood: { en: 'water back to the blood', af: 'water terug na die bloed' }, perDay: { en: '/day', af: '/dag' },
  };
  const SWEAT = { cool: 0.5, hot: 1.5, sport: 3.0 };
  let drink = 1.5, sweat = 'cool', flow = 0;
  const ui = MLX.layout(root, { height: (w) => Math.max(270, Math.min(360, Math.round(w * 0.44))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.day);
  MLX.slider(c1, { label: T.drink, min: 0.5, max: 5, step: 0.25, value: drink, fmt: (v) => num(v, 2) + ' L', onInput: (v) => { drink = v; update(); } });
  MLX.seg(c1, { label: T.sweat, options: [['cool', T.cool], ['hot', T.hot], ['sport', T.sport]], value: sweat, onChange: (v) => { sweat = v; update(); } });
  const c2 = MLX.card(ui.side, T.kid);
  const ro = MLX.readout(c2, [['filt', T.filt], ['reab', T.reab], ['adh', T.adh], ['urine', T.urine], ['conc', T.conc], ['body', T.body]]);

  function model() {
    const inW = drink + 0.7 + 0.3;                 // drinks + food + water made by respiration
    const outOther = 0.4 + 0.1 + SWEAT[sweat];     // breath, faeces, skin/sweat
    const spare = inW - outOther;
    const urine = Math.max(0.5, spare);
    const deficit = Math.max(0, 0.5 - spare);      // water the body is short of
    const conc = Math.min(1200, Math.max(50, 600 / urine));
    const adh = Math.max(0, Math.min(1, (conc - 100) / 1000));
    return { urine, deficit, conc, adh, reab: 1 - urine / 180 };
  }
  function update() {
    const m = model();
    ro.set('filt', '180 L' + L(T.perDay));
    ro.set('reab', num(m.reab * 100, 2) + '%');
    ro.set('adh', L(m.adh > 0.85 ? T.max : m.adh > 0.45 ? T.high : m.adh > 0.15 ? T.med : T.low), m.adh > 0.45 ? '#fde68a' : '');
    ro.set('urine', num(m.urine, 1) + ' L' + L(T.perDay));
    ro.set('conc', Math.round(m.conc) + ' mOsm/L');
    ro.set('body', m.deficit > 0 ? L(T.dry) + ' (−' + num(m.deficit, 1) + ' L)' : L(T.ok), m.deficit > 0 ? '#fca5a5' : '#86efac');
    ui.setCaption(m.deficit > 0
      ? { en: 'Not enough water in: ADH is at its maximum, the collecting ducts take back all they can, and the urine is small and dark — but the body is still short of water. Drink more.', af: 'Te min water in: ADH is op sy maksimum, die versamelbuise neem alles terug wat hulle kan, en die urine is min en donker — maar die liggaam kort steeds water. Drink meer.' }
      : m.adh > 0.45
        ? { en: 'Water is scarce, so the pituitary releases more ADH: the collecting ducts reabsorb more water, giving a small volume of concentrated urine.', af: 'Water is skaars, so die pituïtêre klier stel meer ADH vry: die versamelbuise herabsorbeer meer water, wat \'n klein volume gekonsentreerde urine gee.' }
        : { en: 'Plenty of water: little ADH is released, the collecting ducts reabsorb less, and a large volume of dilute, pale urine is made.', af: 'Baie water: min ADH word vrygestel, die versamelbuise herabsorbeer minder, en \'n groot volume verdunde, ligte urine word gemaak.' });
    ui.cv.draw();
  }

  function urineCol(conc) {      // pale straw → dark amber
    const t = Math.min(1, (conc - 50) / 1150);
    return `rgb(${Math.round(253 - 40 * t)},${Math.round(240 - 120 * t)},${Math.round(170 - 150 * t)})`;
  }
  function draw(ctx, W, H) {
    const m = model();
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const s = Math.min(W / 640, (H - 24) / 330);
    const X = (x) => W * 0.04 + x * s, Y = (y) => 14 + y * s;
    // the nephron's path (filtrate flows along it)
    const path = [[95, 70], [150, 60], [190, 90], [160, 120], [200, 140], [240, 120], [250, 150], [250, 290], [275, 300], [300, 290], [300, 150], [330, 120], [370, 135], [390, 110], [430, 90], [430, 300]];
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(253,230,138,0.2)'; ctx.lineWidth = 16 * s;
    ctx.beginPath(); path.forEach(([x, y], i) => i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y))); ctx.stroke();
    ctx.strokeStyle = 'rgba(253,230,138,0.55)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); path.forEach(([x, y], i) => i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y))); ctx.stroke();
    // glomerulus inside Bowman's capsule
    ctx.strokeStyle = 'rgba(226,232,240,0.6)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(70), Y(70), 30 * s, Math.PI * 0.25, Math.PI * 1.75); ctx.stroke();
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2.5;
    for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.arc(X(70 + Math.cos(k) * 9), Y(70 + Math.sin(k * 1.7) * 9), 9 * s, 0, Math.PI * 2); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(X(10), Y(55)); ctx.lineTo(X(55), Y(64)); ctx.moveTo(X(10), Y(88)); ctx.lineTo(X(55), Y(78)); ctx.stroke();
    // flowing filtrate
    const segs = []; let tot = 0;
    for (let i = 1; i < path.length; i++) { const d = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]); segs.push(d); tot += d; }
    for (let k = 0; k < 26; k++) {
      let d = ((k / 26 + flow * 0.06) % 1) * tot, j = 0;
      while (j < segs.length - 1 && d > segs[j]) { d -= segs[j]; j++; }
      const u = d / segs[j], x = path[j][0] + (path[j + 1][0] - path[j][0]) * u, y = path[j][1] + (path[j + 1][1] - path[j][1]) * u;
      const frac = (k / 26 + flow * 0.06) % 1;                 // later along the tubule = more concentrated
      ctx.fillStyle = frac > 0.8 ? urineCol(m.conc) : 'rgba(186,230,253,0.85)';
      ctx.beginPath(); ctx.arc(X(x), Y(y), 3 * s, 0, Math.PI * 2); ctx.fill();
    }
    // water reabsorbed along the tubule (blue arrows); at the collecting duct, ADH sets how many
    const arrow = (x, y, dx) => { ctx.beginPath(); ctx.moveTo(X(x), Y(y)); ctx.lineTo(X(x + dx), Y(y)); ctx.lineTo(X(x + dx - 5 * Math.sign(dx)), Y(y - 4)); ctx.moveTo(X(x + dx), Y(y)); ctx.lineTo(X(x + dx - 5 * Math.sign(dx)), Y(y + 4)); ctx.stroke(); };
    ctx.strokeStyle = 'rgba(96,165,250,0.85)'; ctx.lineWidth = 1.8;
    [[200, 150, -1], [240, 200, -1], [240, 250, -1]].forEach(([x, y, d]) => arrow(x, y, d * 26));
    const nDuct = 1 + Math.round(m.adh * 6);
    for (let k = 0; k < nDuct; k++) { const y = 120 + k * 26 + ((flow * 30) % 10); arrow(442, y, 28); }
    ctx.font = '500 11px "Cabinet Grotesk", sans-serif';
    const tbW = ctx.measureText(L(T.toBlood)).width;
    if (X(480) + tbW < W - 4) text(ctx, T.toBlood, X(480), Y(110), { size: 11, color: '#93c5fd' });
    else text(ctx, T.toBlood, W - 4, Y(100) - 14, { size: 11, align: 'right', color: '#93c5fd' });   // narrow screens: keep it inside
    // ADH from the pituitary
    const adhA = 0.2 + 0.8 * m.adh;
    ctx.fillStyle = `rgba(167,139,250,${adhA})`; ctx.beginPath(); ctx.arc(X(520), Y(40), 16 * s, 0, Math.PI * 2); ctx.fill();
    text(ctx, 'ADH', X(520), Y(40) + 4, { size: 11, weight: 800, align: 'center', color: '#fff' });
    ctx.strokeStyle = `rgba(167,139,250,${adhA})`; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(505), Y(52)); ctx.lineTo(X(445), Y(110)); ctx.stroke(); ctx.setLineDash([]);
    // urine collecting below the duct
    const cupX = X(400), cupY = Y(318), cupW = 64 * s, cupH = 0;
    const fill = Math.min(1, m.urine / 4);
    ctx.fillStyle = urineCol(m.conc); ctx.fillRect(cupX, Y(330) - 26 * s * fill, cupW, 26 * s * fill);
    ctx.strokeStyle = 'rgba(226,232,240,0.6)'; ctx.lineWidth = 1.5; ctx.strokeRect(cupX, Y(304), cupW, 26 * s + cupH);
    // labels
    const lab = (t, x, y, a) => text(ctx, t, X(x), Y(y), { size: 11, weight: 700, align: a || 'left', color: 'rgba(226,232,240,0.75)' });
    lab(T.glom, 70, 118, 'center'); lab(T.bow, 70, 30, 'center'); lab(T.henle, 275, 322, 'center'); lab(T.duct, 445, 80, 'left');
    text(ctx, num(m.urine, 1) + ' L', cupX + cupW + 8, Y(324), { size: 12, mono: true, weight: 700, color: urineCol(m.conc) });
  }

  update();
  MLX.loop(ui.stage, (dt) => { flow += dt; ui.cv.draw(); }).start();
});
