/* Gr11 Quantitative aspects of chemical change — titration, back titration and limiting reagents.
 * Relative atomic masses from the CAPS data-sheet periodic table (H 1, C 12, N 14, O 16, Al 27, Cl 35,5, Ca 40, Fe 56).
 *   n = c × V (V in L = cm³ ÷ 1000)      n = m / M      V = n × Vₘ (Vₘ = 22.4 L·mol⁻¹ at STP)
 * Titration: HCl + NaOH → NaCl + H₂O (1 : 1). pH from the charge balance of what is left:
 *   d = (n(H⁺) − n(OH⁻)) / V_total ;  [H⁺] = (d + √(d² + 4K_w)) / 2 ,  K_w = 1.0 × 10⁻¹⁴.
 *   Phenolphthalein: colourless below pH 8.3, pink above 10.0 (the end point).
 * Back titration (the page's limestone example): CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂, the HCl left over is titrated
 *   with NaOH: n(CaCO₃) = ½ × (n(HCl added) − n(HCl left)); % purity = m(CaCO₃) / m(sample) × 100.
 * Limiting reagent: extent = smallest (n ÷ coefficient); theoretical yield from the limiting reagent;
 *   % yield = actual / theoretical × 100 (the page's thermite and Haber questions).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const VM = 22.4, KW = 1e-14;
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
  const sup = (k) => String(k).split('').map(ch => SUP[ch]).join('');
  function sci(x, d) { if (!x) return '0'; let e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e); if (+m.toFixed(d) >= 10) { m /= 10; e++; } return num(m, d) + ' × 10' + sup(e); }
  const f3 = (v) => { const a = Math.abs(v); return a >= 100 ? num(v, 0) : a >= 10 ? num(v, 1) : a >= 1 ? num(v, 2) : a >= 0.1 || a === 0 ? num(v, 3) : num(v, 4); };
  const T = {
    aria: { en: 'Stoichiometry explorer', af: 'Stoïgiometrie-verkenner' },
    mode: { en: 'Explore', af: 'Verken' }, mTit: { en: 'Titration', af: 'Titrasie' }, mBack: { en: 'Back titration', af: 'Terugtitrasie' }, mLim: { en: 'Limiting reagent', af: 'Beperkende reagens' },
    // titration
    ph: { en: 'pH in the flask', af: 'pH in die fles' }, samp: { en: 'HCl in the flask (25.00 cm³, unknown concentration)', af: 'HCl in die fles (25,00 cm³, onbekende konsentrasie)' },
    sA: { en: 'Sample A', af: 'Monster A' }, sB: { en: 'Sample B', af: 'Monster B' }, sC: { en: 'Sample C', af: 'Monster C' },
    vol: { en: 'NaOH (0.100 mol·L⁻¹) added from the burette', af: 'NaOH (0,100 mol·L⁻¹) uit die buret bygevoeg' },
    add1: { en: 'Add 1 cm³', af: 'Voeg 1 cm³ by' }, drop: { en: 'Add 1 drop', af: 'Voeg 1 druppel by' }, refill: { en: 'Refill', af: 'Hervul' },
    rV: { en: 'Titre so far', af: 'Titer tot dusver' }, rN: { en: 'n(NaOH) added', af: 'n(NaOH) bygevoeg' }, rSt: { en: 'Stage', af: 'Stadium' }, rC: { en: 'c(HCl) from this titre', af: 'c(HCl) uit hierdie titer' },
    stA: { en: 'acid in excess', af: 'suur in oormaat' }, stE: { en: 'end point (pink)', af: 'eindpunt (pienk)' }, stB: { en: 'base in excess', af: 'basis in oormaat' }, stQ: { en: 'equivalence point', af: 'ekwivalensiepunt' },
    bur: { en: 'burette: NaOH(aq)', af: 'buret: NaOH(aq)' }, fl: { en: 'conical flask: HCl(aq) + phenolphthalein', af: 'koniese fles: HCl(aq) + fenolftaleïen' }, reading: { en: 'reading', af: 'lesing' },
    xV: { en: 'Volume of NaOH added (cm³)', af: 'Volume NaOH bygevoeg (cm³)' }, yP: { en: 'pH', af: 'pH' }, ppr: { en: 'phenolphthalein changes', af: 'fenolftaleïen verander' },
    hSp: { en: 'Particles', af: 'Deeltjies' }, hB: { en: 'n before', af: 'n voor' }, hR: { en: 'reacted', af: 'gereageer' }, hA: { en: 'n after', af: 'n na' }, mmol: { en: '(× 10⁻³ mol)', af: '(× 10⁻³ mol)' },
    keep: { en: 'No colour change yet: keep adding NaOH, drop by drop near the end.', af: 'Nog geen kleurverandering nie: voeg aan met NaOH, drup vir drup naby die einde.' },
    // back titration
    eqB: { en: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂', af: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂' },
    ms: { en: 'Mass of limestone sample', af: 'Massa kalksteenmonster' }, pur: { en: 'Real purity (unknown to the analyst)', af: 'Werklike suiwerheid (onbekend aan die ontleder)' }, vh: { en: 'HCl (1.00 mol·L⁻¹) added', af: 'HCl (1,00 mol·L⁻¹) bygevoeg' },
    pP: { en: 'Purity found by the titration', af: 'Suiwerheid deur die titrasie gevind' },
    rHa: { en: 'n(HCl) added', af: 'n(HCl) bygevoeg' }, rTi: { en: 'NaOH (0.500 mol·L⁻¹) titre', af: 'NaOH (0,500 mol·L⁻¹) titer' }, rHr: { en: 'n(HCl) that reacted', af: 'n(HCl) wat gereageer het' },
    rCa: { en: 'n(CaCO₃) in the sample', af: 'n(CaCO₃) in die monster' }, rCO: { en: 'V(CO₂) at STP', af: 'V(CO₂) by STD' },
    // limiting reagent
    rx: { en: 'Reaction', af: 'Reaksie' }, theo: { en: 'Theoretical yield of', af: 'Teoretiese opbrengs van' }, lim: { en: 'Limiting reagent', af: 'Beperkende reagens' }, exc: { en: 'Excess left over', af: 'Oormaat oor' },
    yld: { en: 'Percentage yield', af: 'Persentasie-opbrengs' }, gas: { en: 'Gas volume at STP', af: 'Gasvolume by STD' }, noGas: { en: 'no gas', af: 'geen gas' }, none: { en: 'none', af: 'geen' },
    before: { en: 'Before', af: 'Voor' }, after: { en: 'After', af: 'Na' }, hS: { en: 'Substance', af: 'Stof' }, hC: { en: 'change', af: 'verandering' }, hMa: { en: 'm after (g)', af: 'm na (g)' },
    actual: { en: 'Mass actually collected', af: 'Massa werklik versamel' },
  };
  let c, ctx;
  const EC = (e) => { const l = c.light; return ({ H: l ? '#c3c9d1' : '#e6e9ee', C: l ? '#3d434b' : '#97a1ad', N: l ? '#3b6fd8' : '#6d9bff', O: l ? '#cf3f36' : '#f06b5f', Al: l ? '#8d96a3' : '#c3c9d1', Cl: l ? '#26925a' : '#5fd18c', Ca: l ? '#2a8686' : '#5cc6c6', Fe: l ? '#a9582a' : '#e28c52', Na: l ? '#7d57c9' : '#ad8cff' })[e]; };
  const bad = () => c && c.light ? '#b42318' : '#ff8a7a';
  const pink = (a) => c.light ? `rgba(214,51,132,${a})` : `rgba(240,98,170,${a})`;

  // ---------- reactions for the limiting-reagent mode ----------
  const RXS = {
    th: { eq: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe', unit: 0.1, yI: 1,
      R: [{ f: 'Al', k: 2, M: 27, at: ['Al'], r: [0, 81, 1], v: 54 }, { f: 'Fe₂O₃', k: 1, M: 160, at: ['Fe', 'O', 'Fe', 'O', 'O'], r: [0, 160, 2], v: 96 }],
      P: [{ f: 'Al₂O₃', k: 1, M: 102, at: ['Al', 'O', 'Al', 'O', 'O'] }, { f: 'Fe', k: 2, M: 56, at: ['Fe'] }], act: [0, 120, 0.5, 60] },
    hb: { eq: 'N₂ + 3H₂ → 2NH₃', unit: 0.2, yI: 0, gas: 0,
      R: [{ f: 'N₂', k: 1, M: 28, at: ['N', 'N'], r: [0, 56, 1], v: 28 }, { f: 'H₂', k: 3, M: 2, at: ['H', 'H'], r: [0, 12, 0.5], v: 8 }],
      P: [{ f: 'NH₃', k: 2, M: 17, at: ['N', 'H', 'H', 'H'] }], act: [0, 70, 0.1, 28.9] },
  };
  const S = { mode: 'tit', samp: 'A', v: 0, drip: 0, ms: 2.0, pur: 97.5, vh: 50, rx: 'th', m: { th: [54, 96], hb: [28, 8] }, act: { th: 60, hb: 28.9 } };
  const CA = { A: 0.0900, B: 0.200, C: 0.120 }, CB = 0.100, VA = 25.0, CNaOH = 0.500, CHCl = 1.00;

  const ui = MLX.layout(root, { height: (w) => { const ph = w < 640; return { tit: ph ? 840 : 470, back: ph ? 730 : 500, lim: ph ? 500 : 440 }[S.mode]; }, ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.ph, unit: '' });
  const primLab = prim.el.querySelector('.mlx-card-title'), primUnit = prim.el.querySelector('.mlx-primary-unit');
  const roBox = MLX.h('div'); prim.el.appendChild(roBox);
  let ro = null;
  const cMode = MLX.card(ui.side);
  MLX.seg(cMode, { label: T.mode, options: [['tit', T.mTit], ['back', T.mBack], ['lim', T.mLim]], value: S.mode, onChange: (v) => { S.mode = v; update(); } });
  const cards = {};
  cards.tit = MLX.card(ui.side, T.mTit);
  MLX.seg(cards.tit, { label: T.samp, options: [['A', T.sA], ['B', T.sB], ['C', T.sC]], value: S.samp, onChange: (v) => { S.samp = v; setV(0); } });
  const sV = MLX.slider(cards.tit, { label: T.vol, min: 0, max: 50, step: 0.05, value: 0, fmt: (v) => num(v, 2) + ' cm³', onInput: (v) => { S.v = v; S.drip = 1; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); cards.tit.appendChild(bt);
  MLX.button(bt, T.add1, () => setV(S.v + 1), 'primary'); MLX.button(bt, T.drop, () => setV(S.v + 0.05)); MLX.button(bt, T.refill, () => setV(0));
  function setV(v) { S.v = Math.max(0, Math.min(50, Math.round(v * 20) / 20)); sV.set(S.v); S.drip = S.v > 0 ? 1 : 0; update(); }
  cards.back = MLX.card(ui.side, T.mBack);
  MLX.slider(cards.back, { label: T.ms, min: 1, max: 3, step: 0.05, value: S.ms, fmt: (v) => num(v, 2) + ' g', onInput: (v) => { S.ms = v; update(); } });
  MLX.slider(cards.back, { label: T.pur, min: 50, max: 100, step: 0.5, value: S.pur, fmt: (v) => num(v, 1) + '%', onInput: (v) => { S.pur = v; update(); } });
  MLX.slider(cards.back, { label: T.vh, min: 10, max: 60, step: 1, value: S.vh, fmt: (v) => v + ' cm³', onInput: (v) => { S.vh = v; update(); } });
  cards.lim = MLX.card(ui.side, T.mLim);
  MLX.seg(cards.lim, { label: T.rx, options: [['th', RXS.th.eq], ['hb', RXS.hb.eq]], value: S.rx, onChange: (v) => { S.rx = v; update(); } });
  const sub = {};
  Object.keys(RXS).forEach(k => {
    const R = RXS[k], box = MLX.h('div'); cards.lim.appendChild(box); sub[k] = box;
    R.R.forEach((sp, i) => MLX.slider(box, { label: { en: 'Mass of ' + sp.f, af: 'Massa ' + sp.f }, min: sp.r[0], max: sp.r[1], step: sp.r[2], value: sp.v, fmt: (v) => num(v, sp.r[2] < 1 ? 1 : 0) + ' g', onInput: (v) => { S.m[k][i] = v; update(); } }));
    const yp = (R.P[R.yI]).f;
    MLX.slider(box, { label: { en: 'Mass of ' + yp + ' actually collected', af: 'Massa ' + yp + ' werklik versamel' }, min: R.act[0], max: R.act[1], step: R.act[2], value: R.act[3], fmt: (v) => num(v, 1) + ' g', onInput: (v) => { S.act[k] = v; update(); } });
  });
  MLX.loop(ui.cv.el, (dt) => { if (S.drip > 0 && S.mode === 'tit') { S.drip = MLX.reducedMotion ? 0 : Math.max(0, S.drip - dt * 2.2); ui.cv.draw(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  // ---------- models ----------
  function titModel(v) {
    v = v == null ? S.v : v;
    const nA = CA[S.samp] * VA / 1000, nB = CB * v / 1000, r = Math.min(nA, nB), Vt = (VA + v) / 1000;
    const d = (nA - nB) / Vt, H = (d + Math.sqrt(d * d + 4 * KW)) / 2;
    return { nA, nB, r, hL: nA - r, oL: nB - r, pH: -Math.log10(H), veq: nA / CB * 1000 };
  }
  function backModel() {
    const nCa = S.ms * S.pur / 100 / 100, nH = CHCl * S.vh / 1000, x = Math.min(nCa, nH / 2);
    const hL = nH - 2 * x, caL = nCa - x, titre = hL / CNaOH * 1000;
    const found = (nH - hL) / 2, pFound = found * 100 / S.ms * 100;
    return { nCa, nH, x, hL, caL, titre, found, pFound, vCO2: x * VM, short: caL > 1e-9 };
  }
  function limModel() {
    const R = RXS[S.rx], nR = R.R.map((sp, i) => S.m[S.rx][i] / sp.M), q = nR.map((n, i) => n / R.R[i].k), x = Math.min.apply(null, q);
    const limI = nR.every(n => n === 0) ? -1 : q.indexOf(x), left = nR.map((n, i) => n - R.R[i].k * x), nP = R.P.map(p => p.k * x);
    const yp = R.P[R.yI], theo = nP[R.yI] * yp.M;
    return { R, nR, q, x, limI, left, nP, yp, theo, yld: theo > 0 ? S.act[S.rx] / theo * 100 : null, gasV: R.gas != null ? nP[R.gas] * VM : null };
  }

  // ---------- drawing helpers ----------
  function wline(s, x, y, maxW, o) {
    o = Object.assign({ size: 13, mono: true, color: c.text }, o || {});
    ctx.font = (o.weight || 500) + ' ' + o.size + 'px "JetBrains Mono", monospace';
    if (ctx.measureText(s).width <= maxW || s.lastIndexOf(' = ') < 0) { text(ctx, s, x, y, o); return y + o.size + 9; }
    const i = s.lastIndexOf(' = ');
    text(ctx, s.slice(0, i), x, y, o); text(ctx, '  ' + s.slice(i + 1), x, y + o.size + 6, o);
    return y + 2 * o.size + 15;
  }
  function particle(at, x, y, r) {
    const n = at.length;
    const pos = n === 1 ? [[0, 0]] : n === 2 ? [[-0.55, 0], [0.55, 0]]
      : at.join() === 'O,H,H' ? [[0, -0.2], [-0.85, 0.5], [0.85, 0.5]]
        : at.map((_, i) => i === 0 ? [0, 0] : [Math.cos((i - 1) / (n - 1) * Math.PI * 2 - (n === 3 ? 0 : Math.PI / 2)) * 1.05, Math.sin((i - 1) / (n - 1) * Math.PI * 2 - (n === 3 ? 0 : Math.PI / 2)) * 1.05]);
    at.forEach((e, i) => { const rr = r * (e === 'H' ? 0.7 : 1); ctx.fillStyle = EC(e); ctx.strokeStyle = c.stage; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x + pos[i][0] * r * 1.25, y + pos[i][1] * r * 1.25, rr, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
  }
  function rand(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function table(x, y, cols, rows, o) {
    o = o || {}; const rh = o.rh || 24, sz = o.size || 13;
    let cx = x;
    cols.forEach(([hd, w], j) => { text(ctx, hd, j ? cx + w - 6 : cx, y, { size: 12, color: c.text3, align: j ? 'right' : 'left' }); cx += w; });
    const tw = cols.reduce((a, cc) => a + cc[1], 0);
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y + 8.5); ctx.lineTo(x + tw, y + 8.5); ctx.stroke();
    rows.forEach((r, i) => {
      const yy = y + 8 + rh * (i + 1) - 7; cx = x;
      r.forEach((cell, j) => { const t = cell && typeof cell === 'object' ? cell : { t: cell }; text(ctx, t.t, j ? cx + cols[j][1] - 6 : cx, yy, { size: sz, mono: j > 0, color: t.color || c.text, align: j ? 'right' : 'left', weight: t.bold ? 700 : 500 }); cx += cols[j][1]; });
      ctx.strokeStyle = c.lineSoft; ctx.beginPath(); ctx.moveTo(x, y + 8.5 + rh * (i + 1)); ctx.lineTo(x + tw, y + 8.5 + rh * (i + 1)); ctx.stroke();
    });
    return y + 8 + rh * rows.length;
  }
  function box(x, y, w, h, title, groups, seed) {
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2; MLX.roundRect(ctx, x, y, w, h, 8); ctx.stroke();
    text(ctx, title, x + 10, y + 18, { size: 12, weight: 700, color: c.text2 });
    const list = []; groups.forEach(([at, n]) => { for (let i = 0; i < n; i++) list.push(at); });
    const top = y + 26, ih = h - 32, cell = Math.max(14, Math.min(30, Math.floor(Math.sqrt((w - 12) * ih / Math.max(36, list.length + 4))))), cols = Math.floor((w - 12) / cell), rows = Math.floor(ih / cell);
    const order = []; for (let i = 0; i < cols * rows; i++) order.push(i);
    const rnd = rand(seed * 97 + 13); for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
    const r = Math.min(5.5, cell * 0.22);
    list.forEach((at, i) => { if (i >= order.length) return; const k = order[i], cx = x + 6 + (k % cols + 0.5) * cell + (rnd() - 0.5) * cell * 0.2, cy = top + (Math.floor(k / cols) + 0.5) * cell + (rnd() - 0.5) * cell * 0.2; particle(at, cx, cy, r); });
  }
  function legend(x, y, items, maxW) {
    let lx = x, ly = y;
    items.forEach(([at, f]) => { ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; const w = 26 + ctx.measureText(L(f)).width + 16; if (lx + w > x + maxW) { lx = x; ly += 20; } particle(at, lx + 9, ly - 4, 5); text(ctx, f, lx + 24, ly, { size: 12, color: c.text2 }); lx += w; });
    return ly;
  }
  function arrow(x1, y, x2) { ctx.strokeStyle = c.text2; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.moveTo(x2 - 6, y - 5); ctx.lineTo(x2, y); ctx.lineTo(x2 - 6, y + 5); ctx.stroke(); }
  const sg = (v) => (v > 1e-12 ? '+' : v < -1e-12 ? '−' : '') + f3(Math.abs(v));

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    ({ tit: drawTit, back: drawBack, lim: drawLim })[S.mode](W, H);
  }

  // ---------- Titration ----------
  function drawTit(W, H) {
    const m = titModel(), ph = W < 640;
    if (ph) { apparatus(0, 0, W, 380, m); let y = titTable(16, 402, W - 32, m); y = titWork(16, y + 22, W - 32, m); titGraph(0, y, W, H - y - 4, m); }
    else { const aw = Math.round(W * 0.36); apparatus(0, 0, aw, H, m); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); let y = titTable(aw + 20, 26, W - aw - 36, m); y = titWork(aw + 20, y + 22, W - aw - 36, m); titGraph(aw + 6, y - 4, W - aw - 10, H - y, m); }
  }
  function apparatus(x0, y0, w, h, m) {
    const cx = x0 + w * 0.5, bt = y0 + 30, bb = y0 + h * 0.52, bw = 14;   // burette 0–50 cm³, 0 at the top
    const Y = (v) => bt + 10 + (bb - bt - 20) * v / 50;
    ctx.fillStyle = c.water; ctx.fillRect(cx - bw / 2 + 1, Y(S.v), bw - 2, bb - Y(S.v));
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.5; ctx.strokeRect(cx - bw / 2, bt, bw, bb - bt);
    ctx.lineWidth = 1;
    for (let v = 0; v <= 50; v += 1) { const yy = Y(v); ctx.beginPath(); ctx.moveTo(cx - bw / 2, yy); ctx.lineTo(cx - bw / 2 + (v % 5 ? 4 : 8), yy); ctx.stroke(); if (v % 10 === 0) text(ctx, String(v), cx - bw / 2 - 5, yy + 4, { size: 11, mono: true, align: 'right', color: c.text3 }); }
    // meniscus + reading
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(cx - bw / 2 + 1, Y(S.v)); ctx.quadraticCurveTo(cx, Y(S.v) + 4, cx + bw / 2 - 1, Y(S.v)); ctx.stroke();
    text(ctx, L(T.reading) + ' ' + num(S.v, 2) + ' cm³', cx + bw / 2 + 8, Y(S.v) + 4, { size: 12, mono: true, color: c.ink });
    text(ctx, T.bur, cx, bt - 10, { size: 12, align: 'center', color: c.text3 });   // above the tube, clear of the reading
    // tap and tip
    ctx.fillStyle = c.glass; ctx.fillRect(cx - 13, bb + 4, 26, 5);
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx - bw / 2, bb); ctx.lineTo(cx - 2, bb + 18); ctx.lineTo(cx - 2, bb + 24); ctx.moveTo(cx + bw / 2, bb); ctx.lineTo(cx + 2, bb + 18); ctx.lineTo(cx + 2, bb + 24); ctx.stroke();
    // conical flask
    const fTop = bb + 40, fBot = y0 + h - 34, fh = fBot - fTop, nw = 13, base = Math.min(w * 0.6, fh * 1.25);
    const lvl = fTop + fh * (0.62 - 0.22 * S.v / 50);   // liquid level rises a little as NaOH is added
    const halfAt = (y) => y < fTop + fh * 0.22 ? nw : nw + (base / 2 - nw) * (y - fTop - fh * 0.22) / (fh * 0.78);
    const ind = Math.max(0, Math.min(1, (m.pH - 8.3) / 1.7));
    ctx.fillStyle = ind > 0 ? pink(0.15 + 0.45 * ind) : c.water;
    ctx.beginPath(); ctx.moveTo(cx - halfAt(lvl), lvl); ctx.lineTo(cx + halfAt(lvl), lvl); ctx.lineTo(cx + base / 2, fBot); ctx.lineTo(cx - base / 2, fBot); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6; ctx.beginPath();
    ctx.moveTo(cx - nw, fTop); ctx.lineTo(cx - nw, fTop + fh * 0.22); ctx.lineTo(cx - base / 2, fBot); ctx.lineTo(cx + base / 2, fBot); ctx.lineTo(cx + nw, fTop + fh * 0.22); ctx.lineTo(cx + nw, fTop); ctx.stroke();
    // a falling drop after NaOH is added
    if (S.drip > 0) { const yy = bb + 26 + (lvl - bb - 30) * (1 - S.drip); ctx.fillStyle = c.light ? 'rgba(53,130,220,0.8)' : 'rgba(140,200,255,0.85)'; ctx.beginPath(); ctx.arc(cx, yy, 3, 0, Math.PI * 2); ctx.fill(); }
    // particles in the solution: each dot ≈ 0.2 × 10⁻³ mol
    const u = 0.0002, nH = Math.round(m.hL / u), nO = Math.round(m.oL / u), nW = Math.round(m.r / u);
    const rnd = rand(5), pts = [];
    for (let i = 0; pts.length < nH + nO + nW && i < 4000; i++) { const yy = lvl + 6 + rnd() * (fBot - lvl - 12), hw = halfAt(yy) - 7, xx = cx + (rnd() * 2 - 1) * hw; if (pts.every(p => (p[0] - xx) ** 2 + (p[1] - yy) ** 2 > 64)) pts.push([xx, yy]); }
    pts.forEach((p, i) => {
      if (i < nW) particle(['O', 'H', 'H'], p[0], p[1], 2.6);
      else if (i < nW + nH) { ctx.fillStyle = c.light ? '#c2410c' : '#fb923c'; ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.fillStyle = c.light ? '#1d4ed8' : '#7fb0ff'; ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, Math.PI * 2); ctx.fill(); }
    });
    text(ctx, T.fl, cx, y0 + h - 12, { size: 12, align: 'center', color: c.text3 });
  }
  function titTable(x0, y0, w, m) {
    const k = 1000, c0 = Math.min(150, w * 0.34), cw = (w - c0) / 3;
    text(ctx, w < 420 ? 'H⁺ + OH⁻ → H₂O   (1 : 1)' : 'H⁺ + OH⁻ → H₂O    (HCl + NaOH → NaCl + H₂O, 1 : 1)', x0, y0, { size: 12, mono: true, color: c.text2 });
    const hp = c.light ? '#c2410c' : '#fb923c', oh = c.light ? '#1d4ed8' : '#7fb0ff';
    return table(x0, y0 + 24, [[L(T.hSp) + ' ' + L(T.mmol), c0], [T.hB, cw], [T.hR, cw], [T.hA, cw]], [
      [{ t: 'H⁺ (HCl)', color: hp, bold: true }, num(m.nA * k, 2), (m.r > 0 ? '−' + num(m.r * k, 2) : num(0, 2)), num(m.hL * k, 2)],
      [{ t: 'OH⁻ (NaOH)', color: oh, bold: true }, num(m.nB * k, 2), (m.r > 0 ? '−' + num(m.r * k, 2) : num(0, 2)), num(m.oL * k, 2)],
      [{ t: 'H₂O', bold: true }, '0', '+' + num(m.r * k, 2), num(m.r * k, 2)],
    ], { rh: 24, size: 13 });
  }
  function titWork(x0, y0, w, m) {
    let y = wline('n(NaOH) = c × V = ' + num(CB, 3) + ' × ' + num(S.v / 1000, 5) + ' = ' + sci(m.nB, 2) + ' mol', x0, y0, w, { size: 12 });
    if (m.pH >= 6.9) {
      const cc = m.nB / (VA / 1000);
      y = wline('n(HCl) = n(NaOH) ;  c(HCl) = n / V = ' + sci(m.nB, 2) + ' / ' + num(0.025, 5) + ' = ' + num(cc, 4) + ' mol·L⁻¹', x0, y, w, { size: 12, weight: 700, color: c.ink });
    } else {
      ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
      MLX.wrap(ctx, T.keep, w).forEach(ln => { text(ctx, ln, x0, y, { size: 12, color: c.text2 }); y += 17; });
      y += 4;
    }
    return y;
  }
  function titGraph(x0, y0, w, h, m) {
    const ax = MLX.axes(ctx, { x0, y0, w, h, xMin: 0, xMax: 50, yMin: 0, yMax: 14, xTitle: T.xV, yTitle: T.yP, xTicks: 5, yTicks: 7 });
    ctx.fillStyle = pink(0.12); ctx.fillRect(ax.box.x0, ax.Y(10), ax.box.x1 - ax.box.x0, ax.Y(8.3) - ax.Y(10));
    text(ctx, T.ppr, ax.box.x0 + 6, ax.Y(10) - 4, { size: 11, color: c.text3 });
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 400; i++) { const v = 50 * i / 400, X = ax.X(v), Y = ax.Y(titModel(v).pH); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(S.v), ax.Y(m.pH), 5, 0, Math.PI * 2); ctx.fill();
  }

  // ---------- Back titration ----------
  function drawBack(W, H) {
    const m = backModel(), ph = W < 640;
    text(ctx, T.eqB, W / 2, 24, { size: ph ? 14 : 16, weight: 700, align: 'center', mono: true, color: c.ink });
    const gap = ph ? 24 : 50, bw = Math.min(300, (W - 32 - gap) / 2), bh = ph ? 170 : 165, bx1 = W / 2 - gap / 2 - bw, bx2 = W / 2 + gap / 2, by = 40, u = 0.002;
    const dC = Math.round(m.nCa / u), dH = Math.round(m.nH / u), xd = Math.min(dC, Math.floor(dH / 2));
    const CaCO3 = ['Ca', 'C', 'O', 'O', 'O'], HCl = ['Cl', 'H'], CaCl2 = ['Ca', 'Cl', 'Cl'], CO2 = ['C', 'O', 'O'], H2O = ['O', 'H', 'H'];
    box(bx1, by, bw, bh, T.before, [[CaCO3, dC], [HCl, dH]], 3);
    box(bx2, by, bw, bh, T.after, [[CaCl2, xd], [CO2, xd], [H2O, xd], [HCl, dH - 2 * xd], [CaCO3, dC - xd]], 5);
    arrow(bx1 + bw + 6, by + bh / 2, bx2 - 6);
    let y = legend(Math.max(16, bx1), by + bh + 22, [[CaCO3, 'CaCO₃'], [HCl, 'HCl'], [CaCl2, 'CaCl₂'], [CO2, 'CO₂'], [H2O, 'H₂O'], [[], L({ en: 'each ≈ 0.002 mol', af: 'elk ≈ 0,002 mol' })]], W - 32);
    const tw = Math.min(W - 32, 560), tx = (W - tw) / 2, c0 = ph ? 62 : 110, cw = (tw - c0) / 3;
    const hl = (i) => m.short ? (i === 0 ? bad() : c.text) : (i === 1 ? c.accent : c.text);
    y = table(tx, y + 30, [[L(T.hS), c0], [L(T.hB) + (ph ? '' : ' (mol)'), cw], [ph ? 'Δn' : T.hC, cw], [L(T.hA) + (ph ? '' : ' (mol)'), cw]], [
      [{ t: 'CaCO₃', color: hl(0), bold: true }, f3(m.nCa), sg(-m.x), f3(m.caL)],
      [{ t: 'HCl', color: hl(1), bold: true }, f3(m.nH), sg(-2 * m.x), f3(m.hL)],
      ['CaCl₂', '0', sg(m.x), f3(m.x)], ['H₂O', '0', sg(m.x), f3(m.x)], ['CO₂', '0', sg(m.x), f3(m.x)],
    ], { rh: 23, size: 12.5 });
    y += 24;
    const ww = tw;
    y = wline('n(HCl ' + L({ en: 'left', af: 'oor' }) + ') = n(NaOH) = ' + num(CNaOH, 3) + ' × ' + num(m.titre / 1000, 4) + ' = ' + f3(m.hL) + ' mol', tx, y, ww, { size: 12 });
    y = wline('n(CaCO₃) = ½ × (' + f3(m.nH) + ' − ' + f3(m.hL) + ') = ' + f3(m.found) + ' mol', tx, y, ww, { size: 12 });
    y = wline('% ' + L({ en: 'purity', af: 'suiwerheid' }) + ' = ' + f3(m.found) + ' × 100 / ' + num(S.ms, 2) + ' × 100 = ' + num(m.pFound, 1) + '%', tx, y, ww, { size: 12, weight: 700, color: m.short ? bad() : c.ink });
  }

  // ---------- Limiting reagent ----------
  function drawLim(W, H) {
    const m = limModel(), R = m.R, ph = W < 640;
    text(ctx, R.eq, W / 2, 26, { size: 17, weight: 700, align: 'center', mono: true, color: c.ink });
    const gap = ph ? 24 : 50, bw = Math.min(300, (W - 32 - gap) / 2), bh = ph ? 170 : 175, bx1 = W / 2 - gap / 2 - bw, bx2 = W / 2 + gap / 2, by = 44;
    const d = m.nR.map(n => Math.round(n / R.unit)), xd = Math.min.apply(null, d.map((n, i) => Math.floor(n / R.R[i].k)));
    box(bx1, by, bw, bh, T.before, R.R.map((sp, i) => [sp.at, d[i]]), 3);
    box(bx2, by, bw, bh, T.after, R.P.map(p => [p.at, p.k * xd]).concat(R.R.map((sp, i) => [sp.at, d[i] - sp.k * xd])), 7);
    arrow(bx1 + bw + 6, by + bh / 2, bx2 - 6);
    let y = legend(Math.max(16, bx1), by + bh + 22, R.R.concat(R.P).map(sp => [sp.at, sp.f]).concat([[[], L({ en: 'each ≈ ', af: 'elk ≈ ' }) + num(R.unit, 1) + ' mol']]), W - 32);
    const tw = Math.min(W - 32, 560), tx = (W - tw) / 2, c0 = ph ? 56 : 100, cw = (tw - c0) / 4;
    const rows = R.R.map((sp, i) => [{ t: sp.f, color: i === m.limI ? bad() : c.text, bold: i === m.limI }, f3(m.nR[i]), sg(-sp.k * m.x), f3(m.left[i]), num(m.left[i] * sp.M, 1)])
      .concat(R.P.map((p, j) => [{ t: p.f, color: j === R.yI ? c.accent : c.text, bold: j === R.yI }, '0', sg(m.nP[j]), f3(m.nP[j]), { t: num(m.nP[j] * p.M, 1), color: j === R.yI ? c.accent : c.text, bold: j === R.yI }]));
    y = table(tx, y + 30, [[T.hS, c0], [L(T.hB) + (ph ? '' : ' (mol)'), cw], [ph ? 'Δn' : T.hC, cw], [L(T.hA) + (ph ? '' : ' (mol)'), cw], [ph ? 'm (g)' : T.hMa, cw]], rows, { rh: 24, size: 12.5 });
    if (m.limI >= 0) {
      const parts = R.R.map((sp, i) => sp.f + ' ' + f3(m.nR[i]) + ' / ' + sp.k + ' = ' + f3(m.q[i]));
      y += 24; text(ctx, 'n ÷ ' + L({ en: 'coefficient', af: 'koëffisiënt' }) + ':' + (ph ? '' : '  ' + parts.join(',  ')), tx, y, { size: 12, mono: true, color: c.text2 });
      if (ph) parts.forEach(pt => { y += 18; text(ctx, '  ' + pt, tx, y, { size: 12, mono: true, color: c.text2 }); });
      y += 22; ctx.font = '500 13px "Cabinet Grotesk", sans-serif';
      MLX.wrap(ctx, L({ en: 'The smaller value belongs to ', af: 'Die kleiner waarde behoort aan ' }) + R.R[m.limI].f + L({ en: ': it is the limiting reagent.', af: ': dit is die beperkende reagens.' }), tw).forEach((ln, i) => text(ctx, ln, tx, y + i * 18, { size: 13, color: c.text }));
    }
  }

  // ---------- state → side panel, caption ----------
  let lastMode = null;
  function update() {
    Object.keys(cards).forEach(k => { cards[k].style.display = k === S.mode ? '' : 'none'; });
    Object.keys(sub).forEach(k => { sub[k].style.display = k === S.rx ? '' : 'none'; });
    const set = (lab, unit) => { primLab.textContent = L(lab); primUnit.textContent = L(unit); };
    if (S.mode !== lastMode) {
      lastMode = S.mode; roBox.textContent = '';
      ro = MLX.readout(roBox, S.mode === 'tit' ? [['v', T.rV], ['n', T.rN], ['s', T.rSt], ['c', T.rC]]
        : S.mode === 'back' ? [['a', T.rHa], ['t', T.rTi], ['r', T.rHr], ['n', T.rCa], ['g', T.rCO]]
          : [['l', T.lim], ['e', T.exc], ['y', T.yld], ['g', T.gas]]);
    }
    let cap, aria;
    if (S.mode === 'tit') {
      const m = titModel(), end = m.pH >= 6.9, eqv = Math.abs(S.v - m.veq) < 0.026, over = S.v - m.veq > 0.25;
      set(T.ph, ''); prim.set(num(m.pH, 2));
      ro.set('v', num(S.v, 2) + ' cm³'); ro.set('n', sci(m.nB, 2) + ' mol');
      ro.set('s', L(eqv ? T.stQ : m.pH < 7 ? T.stA : over ? T.stB : T.stE), m.pH >= 8.3 ? pink(1) : '');
      ro.set('c', end ? num(m.nB / 0.025, 4) + ' mol·L⁻¹' : '—', over ? bad() : '');
      cap = !end ? (m.veq - S.v < 2 && S.v > 0 ? { en: 'Close to the equivalence point almost all the H⁺ has reacted, so each drop now changes the pH a lot.', af: 'Naby die ekwivalensiepunt het byna al die H⁺ gereageer, dus verander elke druppel nou die pH baie.' }
        : { en: 'Each OH⁻ added removes one H⁺ to form water, but there is still H⁺ left over, so the pH rises only slowly.', af: 'Elke OH⁻ wat bygevoeg word, verwyder een H⁺ om water te vorm, maar daar is nog H⁺ oor, dus styg die pH net stadig.' })
        : eqv ? { en: 'Equivalence point: n(NaOH) added = n(HCl) in the flask (1 : 1), so c(HCl) = n/V. Phenolphthalein shows it as the first permanent pink with the next drop.', af: 'Ekwivalensiepunt: n(NaOH) bygevoeg = n(HCl) in die fles (1 : 1), dus c(HCl) = n/V. Fenolftaleïen wys dit as die eerste permanente pienk met die volgende druppel.' }
        : over ? { en: 'Overshot: you have added more NaOH than needed, so this titre gives a concentration that is too high. Refill and stop at the first permanent pink.', af: 'Oorskiet: jy het meer NaOH bygevoeg as nodig, dus gee hierdie titer \'n konsentrasie wat te hoog is. Hervul en stop by die eerste permanente pienk.' }
          : { en: 'End point: n(NaOH) added = n(HCl) in the flask (1 : 1), so c(HCl) = n/V. Take this reading as the titre.', af: 'Eindpunt: n(NaOH) bygevoeg = n(HCl) in die fles (1 : 1), dus c(HCl) = n/V. Neem hierdie lesing as die titer.' };
      aria = num(S.v, 2) + ' cm³ NaOH, pH ' + num(m.pH, 2);
    } else if (S.mode === 'back') {
      const m = backModel();
      set(T.pP, '%'); prim.set(num(m.pFound, 1));
      ro.set('a', f3(m.nH) + ' mol'); ro.set('t', num(m.titre, 1) + ' cm³'); ro.set('r', f3(m.nH - m.hL) + ' mol'); ro.set('n', f3(m.found) + ' mol', m.short ? bad() : ''); ro.set('g', num(m.vCO2, 3) + ' L');
      cap = m.short ? { en: 'Not enough HCl: it is the limiting reagent, so some CaCO₃ does not dissolve and the purity found is too low. Add more acid so that it is in excess.', af: 'Te min HCl: dit is die beperkende reagens, dus los sommige CaCO₃ nie op nie en die gevonde suiwerheid is te laag. Voeg meer suur by sodat dit in oormaat is.' }
        : { en: 'HCl is in excess, so all the CaCO₃ reacts; titrating the HCl left over tells how much reacted, and half of that is n(CaCO₃).', af: 'HCl is in oormaat, dus reageer al die CaCO₃; om die oorblywende HCl te titreer wys hoeveel gereageer het, en die helfte daarvan is n(CaCO₃).' };
      aria = num(S.ms, 2) + ' g limestone, ' + S.vh + ' cm³ HCl: ' + num(m.pFound, 1) + '%';
    } else {
      const m = limModel(), R = m.R;
      set({ en: L(T.theo) + ' ' + m.yp.f, af: L(T.theo) + ' ' + m.yp.f }, 'g'); prim.set(num(m.theo, 1));
      const exs = m.limI < 0 ? [] : R.R.map((sp, i) => [sp, m.left[i] * sp.M]).filter(([, g]) => g > 0.05);
      ro.set('l', m.limI < 0 ? '—' : R.R[m.limI].f, bad());
      ro.set('e', m.limI < 0 ? '—' : exs.length ? exs.map(([sp, g]) => num(g, 1) + ' g ' + sp.f).join(', ') : L(T.none));
      const over = m.yld != null && m.yld > 100;
      ro.set('y', m.yld == null ? '—' : num(m.yld, 1) + '%', over ? bad() : '');
      ro.set('g', m.gasV == null ? L(T.noGas) : num(m.gasV, 1) + ' L ' + R.P[R.gas].f);
      cap = m.limI < 0 ? { en: 'Add some of each reactant.', af: 'Voeg van elke reaktans by.' }
        : over ? { en: 'More than 100% is impossible: the product collected must be wet or impure.', af: 'Meer as 100% is onmoontlik: die versamelde produk moet nat of onsuiwer wees.' }
          : !exs.length ? { en: 'The reactants are in the exact mole ratio of the equation, so both are used up.', af: 'Die reaktanse is presies in die molverhouding van die vergelyking, dus word albei opgebruik.' }
            : { en: R.R[m.limI].f + ' runs out first and fixes the theoretical yield at ' + num(m.theo, 1) + ' g ' + m.yp.f + '; the % yield compares the mass collected with this.', af: R.R[m.limI].f + ' raak eerste op en bepaal die teoretiese opbrengs op ' + num(m.theo, 1) + ' g ' + m.yp.f + '; die % opbrengs vergelyk die versamelde massa hiermee.' };
      aria = R.eq + ': ' + L(T.theo) + ' ' + m.yp.f + ' ' + num(m.theo, 1) + ' g';
    }
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + aria + '.');
    ui.cv.draw();
  }
  update();
});
