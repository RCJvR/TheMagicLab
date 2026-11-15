/* Gr10 Quantitative aspects of chemical change — the mole.
 * Relative atomic masses from the CAPS data-sheet periodic table:
 *   H 1  C 12  N 14  O 16  Na 23  Mg 24  S 32  Cl 35,5  Ca 40  Fe 56  Cu 63,5
 *   n = m / M        N = n × Nₐ (Nₐ = 6.022 × 10²³ mol⁻¹, as in the lesson)        V = n × Vₘ (Vₘ = 22.4 L·mol⁻¹, gases at STP)
 *   c = n / V (V in L)        % by mass = (subscript × A) / M × 100
 *   Empirical formula: % → mass in 100 g → n = m/M → divide by the smallest → whole-number ratio.
 *   Limiting reagent (2Mg + O₂ → 2MgO, the page's Question 7): extent = smallest n ÷ coefficient.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const NA = 6.022e23, VM = 22.4;
  const A = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, S: 32, Cl: 35.5, Ca: 40, Fe: 56, Cu: 63.5 };
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
  const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
  const sup = (k) => String(k).split('').map(ch => SUP[ch]).join('');
  const subs = (k) => k === 1 ? '' : String(k).split('').map(ch => SUB[ch]).join('');
  function sci(x, d) { if (!x) return '0'; let e = Math.floor(Math.log10(x)), m = x / Math.pow(10, e); if (+m.toFixed(d) >= 10) { m /= 10; e++; } return num(m, d) + ' × 10' + sup(e); }
  const f3 = (v) => v >= 100 ? num(v, 0) : v >= 10 ? num(v, 1) : v >= 1 ? num(v, 2) : num(v, 3);   // 3 significant figures
  const am = (v) => num(v, v % 1 ? 1 : 0);
  const T = {
    aria: { en: 'Moles explorer', af: 'Mol-verkenner' },
    mode: { en: 'Explore', af: 'Verken' }, mMol: { en: 'Moles', af: 'Mol' }, mConc: { en: 'Concentration', af: 'Konsentrasie' }, mForm: { en: 'Formula', af: 'Formule' }, mRxn: { en: 'Limiting reagent', af: 'Beperkende reagens' },
    sub: { en: 'Substance', af: 'Stof' }, mass: { en: 'Mass on the balance', af: 'Massa op die skaal' },
    n: { en: 'Amount of substance n', af: 'Hoeveelheid stof n' }, mol: { en: 'mol', af: 'mol' },
    M: { en: 'Molar mass M', af: 'Molêre massa M' }, N: { en: 'Particles N', af: 'Deeltjies N' }, atoms: { en: 'Atoms in total', af: 'Atome altesaam' }, V: { en: 'Volume at STP', af: 'Volume by STD' }, notGas: { en: 'not a gas', af: 'nie \'n gas nie' },
    wMol: { en: 'molecules', af: 'molekules' }, wIon: { en: 'formula units', af: 'formule-eenhede' }, wAtom: { en: 'atoms', af: 'atome' },
    bal: { en: 'electronic balance (zeroed with the empty container)', af: 'elektroniese skaal (getarreer met die leë houer)' },
    tile: { en: 'each square = 1 mol = 6.022 × 10²³', af: 'elke blokkie = 1 mol = 6,022 × 10²³' },
    solute: { en: 'Solute', af: 'Opgeloste stof' }, smass: { en: 'Mass of solute dissolved', af: 'Massa opgeloste stof' }, flask: { en: 'Volumetric flask', af: 'Volumetriese fles' },
    c: { en: 'Concentration c', af: 'Konsentrasie c' }, cu: { en: 'mol·L⁻¹', af: 'mol·L⁻¹' }, nsol: { en: 'Moles of solute', af: 'Mol opgeloste stof' }, vsol: { en: 'Volume of solution', af: 'Volume oplossing' },
    mark: { en: 'calibration mark', af: 'kalibrasiemerk' }, xV: { en: 'Volume of solution (cm³)', af: 'Volume oplossing (cm³)' }, yC: { en: 'c (mol·L⁻¹)', af: 'c (mol·L⁻¹)' },
    comp: { en: 'Compound', af: 'Verbinding' }, step: { en: 'Show the method up to step', af: 'Wys die metode tot by stap' },
    pct: { en: 'Percentage by mass in', af: 'Persentasie volgens massa in' }, emp: { en: 'Empirical formula', af: 'Empiriese formule' }, molf: { en: 'Molecular formula', af: 'Molekulêre formule' },
    hEl: { en: 'Element', af: 'Element' }, hM: { en: 'mass in 100 g', af: 'massa in 100 g' }, hN: { en: 'n = m/M (mol)', af: 'n = m/M (mol)' }, hR: { en: '÷ smallest', af: '÷ kleinste' }, hW: { en: 'ratio', af: 'verhouding' },
    eq: { en: '2Mg + O₂ → 2MgO', af: '2Mg + O₂ → 2MgO' }, mMg: { en: 'Mass of magnesium', af: 'Massa magnesium' }, mO2: { en: 'Mass of oxygen', af: 'Massa suurstof' }, act: { en: 'Mass of MgO actually collected', af: 'Massa MgO werklik versamel' },
    theo: { en: 'Theoretical yield of MgO', af: 'Teoretiese opbrengs MgO' }, g: { en: 'g', af: 'g' }, lim: { en: 'Limiting reagent', af: 'Beperkende reagens' }, exc: { en: 'Excess left over', af: 'Oormaat oor' }, yld: { en: 'Percentage yield', af: 'Persentasie-opbrengs' },
    before: { en: 'Before', af: 'Voor' }, after: { en: 'After', af: 'Na' }, each: { en: 'each particle drawn ≈ 0.1 mol', af: 'elke deeltjie geteken ≈ 0,1 mol' },
    hS: { en: 'Substance', af: 'Stof' }, hB: { en: 'n before', af: 'n voor' }, hC: { en: 'change', af: 'verandering' }, hA: { en: 'n after', af: 'n na' }, hMa: { en: 'm after (g)', af: 'm na (g)' },
    none: { en: 'none', af: 'geen' },
  };
  const NAME = {
    H2O: { en: 'water', af: 'water' }, CO2: { en: 'carbon dioxide', af: 'koolstofdioksied' }, O2: { en: 'oxygen', af: 'suurstof' }, NaCl: { en: 'sodium chloride', af: 'natriumchloried' },
    CaCO3: { en: 'calcium carbonate', af: 'kalsiumkarbonaat' }, C6H12O6: { en: 'glucose', af: 'glukose' }, Mg: { en: 'magnesium', af: 'magnesium' }, Fe: { en: 'iron', af: 'yster' },
    NaOH: { en: 'sodium hydroxide', af: 'natriumhidroksied' }, CuSO4: { en: 'copper(II) sulfate', af: 'koper(II)sulfaat' }, CH4: { en: 'methane', af: 'metaan' }, Fe2O3: { en: 'iron(III) oxide', af: 'yster(III)oksied' },
  };
  // substances: formula, element list, particle kind, state at room temperature
  const SB = {
    H2O: { f: 'H₂O', el: [['H', 2], ['O', 1]], k: 'mol', st: 'l' },
    CO2: { f: 'CO₂', el: [['C', 1], ['O', 2]], k: 'mol', st: 'g' },
    O2: { f: 'O₂', el: [['O', 2]], k: 'mol', st: 'g' },
    NaCl: { f: 'NaCl', el: [['Na', 1], ['Cl', 1]], k: 'ion', st: 's' },
    CaCO3: { f: 'CaCO₃', el: [['Ca', 1], ['C', 1], ['O', 3]], k: 'ion', st: 's' },
    C6H12O6: { f: 'C₆H₁₂O₆', el: [['C', 6], ['H', 12], ['O', 6]], k: 'mol', st: 's' },
    Mg: { f: 'Mg', el: [['Mg', 1]], k: 'atom', st: 's' },
    Fe: { f: 'Fe', el: [['Fe', 1]], k: 'atom', st: 's' },
    NaOH: { f: 'NaOH', el: [['Na', 1], ['O', 1], ['H', 1]], k: 'ion', st: 's' },
    CuSO4: { f: 'CuSO₄', el: [['Cu', 1], ['S', 1], ['O', 4]], k: 'ion', st: 's' },
    CH4: { f: 'CH₄', el: [['C', 1], ['H', 4]], k: 'mol', st: 'g' },
    Fe2O3: { f: 'Fe₂O₃', el: [['Fe', 2], ['O', 3]], k: 'ion', st: 's' },
  };
  const Mof = (s) => s.el.reduce((a, [e, k]) => a + A[e] * k, 0);
  const mWork = (s) => s.el.length === 1 && s.el[0][1] === 1 ? am(Mof(s)) : s.el.map(([e, k]) => k > 1 ? k + '(' + am(A[e]) + ')' : am(A[e])).join(' + ') + ' = ' + am(Mof(s));
  const word = (s) => L(s.k === 'mol' ? T.wMol : s.k === 'ion' ? T.wIon : T.wAtom);

  const S = { mode: 'mol', sub: 'H2O', m: 36, sol: 'NaOH', sm: 20, fv: 250, comp: 'C6H12O6', step: 4, mg: 12, o2: 40, act: 16 };

  const ui = MLX.layout(root, { height: hFor, ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  function hFor(w) {
    const ph = w < 640;
    return { mol: ph ? 610 : 380, conc: ph ? 650 : 400, form: ph ? 460 : 340, rxn: ph ? 560 : 420 }[S.mode];
  }
  const prim = MLX.primary(ui.side, { label: T.n, unit: T.mol });
  const primLab = prim.el.querySelector('.mlx-card-title'), primUnit = prim.el.querySelector('.mlx-primary-unit');
  const roBox = MLX.h('div'); prim.el.appendChild(roBox);
  let ro = null;
  function setReadout(rows) { roBox.textContent = ''; ro = MLX.readout(roBox, rows); }
  const cMode = MLX.card(ui.side);
  MLX.seg(cMode, { label: T.mode, options: [['mol', T.mMol], ['conc', T.mConc], ['form', T.mForm], ['rxn', T.mRxn]], value: S.mode, onChange: (v) => { S.mode = v; update(); } });
  // one control card per mode
  const cards = {};
  cards.mol = MLX.card(ui.side, T.mMol);
  MLX.seg(cards.mol, { label: T.sub, options: ['H2O', 'CO2', 'O2', 'NaCl', 'CaCO3', 'C6H12O6', 'Mg', 'Fe'].map(k => [k, SB[k].f]), value: S.sub, onChange: (v) => { S.sub = v; update(); } });
  MLX.slider(cards.mol, { label: T.mass, min: 0, max: 200, step: 1, value: S.m, fmt: (v) => v + ' g', onInput: (v) => { S.m = v; update(); } });
  cards.conc = MLX.card(ui.side, T.mConc);
  MLX.seg(cards.conc, { label: T.solute, options: ['NaOH', 'NaCl', 'CuSO4'].map(k => [k, SB[k].f]), value: S.sol, onChange: (v) => { S.sol = v; update(); } });
  MLX.slider(cards.conc, { label: T.smass, min: 0, max: 20, step: 0.5, value: S.sm, fmt: (v) => num(v, 1) + ' g', onInput: (v) => { S.sm = v; update(); } });
  MLX.seg(cards.conc, { label: T.flask, options: [[100, '100 cm³'], [250, '250 cm³'], [500, '500 cm³'], [1000, '1000 cm³']], value: S.fv, onChange: (v) => { S.fv = v; update(); } });
  cards.form = MLX.card(ui.side, T.mForm);
  MLX.seg(cards.form, { label: T.comp, options: ['H2O', 'CO2', 'CH4', 'CaCO3', 'C6H12O6', 'Fe2O3'].map(k => [k, SB[k].f]), value: S.comp, onChange: (v) => { S.comp = v; update(); } });
  MLX.seg(cards.form, { label: T.step, options: [[1, '1'], [2, '2'], [3, '3'], [4, '4']], value: S.step, onChange: (v) => { S.step = v; update(); } });
  cards.rxn = MLX.card(ui.side, T.eq);
  MLX.slider(cards.rxn, { label: T.mMg, min: 0, max: 48, step: 1, value: S.mg, fmt: (v) => v + ' g', onInput: (v) => { S.mg = v; update(); } });
  MLX.slider(cards.rxn, { label: T.mO2, min: 0, max: 40, step: 1, value: S.o2, fmt: (v) => v + ' g', onInput: (v) => { S.o2 = v; update(); } });
  MLX.slider(cards.rxn, { label: T.act, min: 0, max: 80, step: 0.5, value: S.act, fmt: (v) => num(v, 1) + ' g', onInput: (v) => { S.act = v; update(); } });
  MLX.onTheme(() => ui.cv.draw());

  // ---------- models ----------
  function molModel() { const s = SB[S.sub], M = Mof(s), n = S.m / M, N = n * NA, per = s.el.reduce((a, e) => a + e[1], 0); return { s, M, n, N, atoms: N * per, per, V: s.st === 'g' ? n * VM : null }; }
  function concModel() { const s = SB[S.sol], M = Mof(s), n = S.sm / M, V = S.fv / 1000; return { s, M, n, V, c: n / V }; }
  function formModel() {
    const s = SB[S.comp], M = Mof(s);
    const rows = s.el.map(([e, k]) => { const p = A[e] * k / M * 100; return { e, p, n: p / A[e] }; });
    const mn = Math.min.apply(null, rows.map(r => r.n));
    rows.forEach(r => { r.r = r.n / mn; });
    let mult = 1;
    for (const m of [1, 2, 3, 4]) { if (rows.every(r => Math.abs(r.r * m - Math.round(r.r * m)) < 0.08)) { mult = m; break; } }
    rows.forEach(r => { r.w = Math.round(r.r * mult); });
    const ef = rows.map(r => r.e + subs(r.w)).join(''), Me = rows.reduce((a, r) => a + A[r.e] * r.w, 0);
    return { s, M, rows, mult, ef, Me, x: Math.round(M / Me) };
  }
  const RX = { R: [{ f: 'Mg', k: 2, M: 24, at: ['Mg'] }, { f: 'O₂', k: 1, M: 32, at: ['O', 'O'] }], P: [{ f: 'MgO', k: 2, M: 40, at: ['Mg', 'O'] }], unit: 0.1 };
  function rxnModel() {
    const nR = [S.mg / 24, S.o2 / 32], q = nR.map((n, i) => n / RX.R[i].k), x = Math.min(q[0], q[1]);
    const limI = nR[0] + nR[1] === 0 ? -1 : q[0] <= q[1] ? 0 : 1;
    const nP = 2 * x, theo = nP * 40;
    const left = nR.map((n, i) => n - RX.R[i].k * x);
    return { nR, x, limI, nP, theo, left, yld: theo > 0 ? S.act / theo * 100 : null };
  }

  // ---------- drawing helpers ----------
  let c, ctx;
  const EC = (e) => { const l = c.light; return ({ H: l ? '#c3c9d1' : '#e6e9ee', C: l ? '#3d434b' : '#97a1ad', N: l ? '#3b6fd8' : '#6d9bff', O: l ? '#cf3f36' : '#f06b5f', Na: l ? '#7d57c9' : '#ad8cff', Mg: l ? '#55893a' : '#8fc46a', Cl: l ? '#26925a' : '#5fd18c', Ca: l ? '#2a8686' : '#5cc6c6', Fe: l ? '#a9582a' : '#e28c52', Cu: l ? '#b0682b' : '#e0a060', S: l ? '#b89a12' : '#e8cc4a' })[e]; };
  const bad = () => c.light ? '#b42318' : '#ff8a7a';
  function wline(s, x, y, maxW, o) {   // working line: split at the last " = " if it is too wide
    o = Object.assign({ size: 13, mono: true, color: c.text }, o || {});
    ctx.font = '500 ' + o.size + 'px "JetBrains Mono", monospace';
    if (ctx.measureText(s).width <= maxW || s.lastIndexOf(' = ') < 0) { text(ctx, s, x, y, o); return y + o.size + 9; }
    const i = s.lastIndexOf(' = ');
    text(ctx, s.slice(0, i), x, y, o); text(ctx, '  ' + s.slice(i + 1), x, y + o.size + 6, o);
    return y + 2 * o.size + 15;
  }
  function particle(at, x, y, r) {   // a cluster of atoms: first in the middle, the rest around it
    const pos = at.length === 1 ? [[0, 0]] : at.length === 2 ? [[-0.55, 0], [0.55, 0]] : at.map((_, i) => i === 0 ? [0, 0] : [Math.cos((i - 1) / (at.length - 1) * Math.PI * 2) * 1.05, Math.sin((i - 1) / (at.length - 1) * Math.PI * 2) * 1.05]);
    at.forEach((e, i) => { const rr = r * (e === 'H' ? 0.7 : 1); ctx.fillStyle = EC(e); ctx.strokeStyle = c.stage; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x + pos[i][0] * r * 1.25, y + pos[i][1] * r * 1.25, rr, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
  }
  function rand(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function table(x, y, cols, rows, o) {   // cols: [[header, width], ...]; rows: arrays of strings (or {t, color})
    o = o || {}; const rh = o.rh || 24, sz = o.size || 13;
    let cx = x;
    cols.forEach(([hd, w], j) => { text(ctx, hd, j ? cx + w - 6 : cx, y, { size: 12, color: c.text3, align: j ? 'right' : 'left' }); cx += w; });
    const tw = cols.reduce((a, cc) => a + cc[1], 0);
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y + 8.5); ctx.lineTo(x + tw, y + 8.5); ctx.stroke();
    rows.forEach((r, i) => {
      const yy = y + 8 + rh * (i + 1) - 7; cx = x;
      r.forEach((cell, j) => { const t = cell && typeof cell === 'object' ? cell : { t: cell }; text(ctx, t.t, j ? cx + cols[j][1] - 6 : cx, yy, { size: sz, mono: j > 0 || o.monoFirst, color: t.color || c.text, align: j ? 'right' : 'left', weight: t.bold ? 700 : 500 }); cx += cols[j][1]; });
      ctx.strokeStyle = c.lineSoft; ctx.beginPath(); ctx.moveTo(x, y + 8.5 + rh * (i + 1)); ctx.lineTo(x + tw, y + 8.5 + rh * (i + 1)); ctx.stroke();
    });
    return y + 8 + rh * rows.length;
  }

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    ({ mol: drawMol, conc: drawConc, form: drawForm, rxn: drawRxn })[S.mode](W, H);
  }

  // ---------- Moles: balance + mole squares + working ----------
  function drawMol(W, H) {
    const m = molModel(), ph = W < 640;
    if (ph) { balance(0, 0, W, 300, m); working(16, tiles(16, 312, W - 32, m) + 24, W - 32, m); }
    else { const bw = Math.round(W * 0.42); balance(0, 0, bw, H, m); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(bw + 0.5, 14); ctx.lineTo(bw + 0.5, H - 14); ctx.stroke(); working(bw + 20, tiles(bw + 20, 26, W - bw - 36, m) + 30, W - bw - 36, m); }
  }
  function balance(x0, y0, w, h, m) {
    const cx = x0 + w / 2, bw = Math.min(w * 0.78, 250), base = y0 + h - 58, top = base - 58;
    // body with display
    ctx.fillStyle = c.light ? '#e4e6ea' : '#1b1f25'; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2;
    MLX.roundRect(ctx, cx - bw / 2, top, bw, 58, 8); ctx.fill(); ctx.stroke();
    const dw = 116, dh = 30, dy = top + 18;
    ctx.fillStyle = '#0d1410'; MLX.roundRect(ctx, cx - dw / 2, dy, dw, dh, 4); ctx.fill();
    text(ctx, num(S.m, 1) + ' g', cx + dw / 2 - 8, dy + 21, { size: 17, mono: true, weight: 600, align: 'right', color: '#8be09a' });
    // pan
    ctx.fillStyle = c.light ? '#c9ccd2' : '#3a414b'; ctx.fillRect(cx - 5, top - 10, 10, 10);
    ctx.fillStyle = c.light ? '#d5d8dd' : '#4a525d'; ctx.beginPath(); ctx.ellipse(cx, top - 11, bw * 0.36, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    const panY = top - 15, s = m.s, frac = S.m / 200, k = Math.max(1, Math.min(1.4, (h - 150) / 160));
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6;
    if (s.st === 'l') {   // beaker of water: 1 g ≈ 1 cm³
      const bwd = 78 * k, bh = 100 * k, bx = cx - bwd / 2, by = panY - bh;
      ctx.fillStyle = c.water.replace(/0\.1\d\)/, '0.32)'); const lh = bh * 0.92 * frac; ctx.fillRect(bx + 1, panY - lh, bwd - 2, lh);
      ctx.beginPath(); ctx.moveTo(bx - 4, by); ctx.lineTo(bx, by + 4); ctx.lineTo(bx, panY); ctx.lineTo(bx + bwd, panY); ctx.lineTo(bx + bwd, by); ctx.stroke();
      for (let v = 50; v <= 200; v += 50) { const yy = panY - bh * 0.92 * v / 200; ctx.beginPath(); ctx.moveTo(bx + bwd - 14, yy); ctx.lineTo(bx + bwd, yy); ctx.stroke(); }
      text(ctx, '200 cm³', bx + bwd + 6, by + 12, { size: 12, color: c.text3 });
    } else if (s.st === 'g') {   // sealed gas jar: its gas is weighed
      const gw = 72 * k, gh = 104 * k, gx = cx - gw / 2, gy = panY - gh;
      ctx.fillStyle = c.light ? 'rgba(22,24,29,0.03)' : 'rgba(255,255,255,0.03)'; ctx.fillRect(gx, gy, gw, gh); ctx.strokeRect(gx, gy, gw, gh);
      ctx.fillStyle = c.glass; ctx.fillRect(gx - 5, gy - 5, gw + 10, 5);
      // molecules spread through the whole jar (a gas fills its container); more mass, more molecules
      const rnd = rand(7), cell = 15, gc = Math.floor((gw - 6) / cell), gr = Math.floor((gh - 6) / cell), cells = [];
      for (let i = 0; i < gc * gr; i++) cells.push(i);
      for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = cells[i]; cells[i] = cells[j]; cells[j] = t; }
      const cnt = Math.min(cells.length, Math.round(3 + (cells.length - 3) * frac)), at = s.el.flatMap(([e, kk]) => Array(kk).fill(e));
      for (let i = 0; i < cnt; i++) { const q = cells[i]; particle(at, gx + 3 + (q % gc + 0.5) * cell + (rnd() - 0.5) * 3, gy + 3 + (Math.floor(q / gc) + 0.5) * cell + (rnd() - 0.5) * 3, 3); }
      text(ctx, { en: 'sealed gas jar', af: 'verseëlde gasfles' }, gx + gw + 6, gy + 12, { size: 12, color: c.text3 });
    } else {   // solid heap on a watch glass
      ctx.beginPath(); ctx.ellipse(cx, panY - 2, 52 * k, 5, 0, 0, Math.PI); ctx.stroke();
      const hw = (12 + 40 * Math.cbrt(frac)) * k, hh = (4 + 46 * Math.cbrt(frac)) * k;
      if (S.m > 0) { ctx.fillStyle = s.el[0][0] === 'Fe' ? (c.light ? '#6b6f76' : '#8a9099') : s.el[0][0] === 'Mg' ? (c.light ? '#a3a9b1' : '#c6ccd3') : (c.light ? '#e7e3da' : '#e9e6df'); ctx.strokeStyle = c.lineHard; ctx.beginPath(); ctx.moveTo(cx - hw, panY - 3); ctx.quadraticCurveTo(cx, panY - 3 - hh * 2, cx + hw, panY - 3); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    }
    text(ctx, s.f + ' (' + L(NAME[S.sub]) + ')', cx, y0 + 26, { size: 15, weight: 700, align: 'center', color: c.ink });
    ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
    MLX.wrap(ctx, T.bal, w - 24).forEach((ln, i) => text(ctx, ln, cx, base + 20 + i * 15, { size: 12, align: 'center', color: c.text3 }));
  }
  function tiles(x0, y0, w, m) {
    const n = m.n, full = Math.ceil(n - 1e-9), cols = 6, gap = 8, s = Math.min(52, (w - gap * (cols - 1)) / cols);
    text(ctx, L(T.tile) + ' ' + word(m.s), x0, y0, { size: 12, color: c.text2 });
    const shown = Math.min(12, Math.max(1, full));
    for (let i = 0; i < shown; i++) {
      const x = x0 + (i % cols) * (s + gap), y = y0 + 12 + Math.floor(i / cols) * (s + gap), f = Math.max(0, Math.min(1, n - i));
      ctx.fillStyle = c.accentSoft; ctx.fillRect(x, y + s * (1 - f), s, s * f);
      ctx.strokeStyle = f > 0 ? c.accent : c.line; ctx.lineWidth = 1.4; ctx.strokeRect(x + 0.5, y + 0.5, s - 1, s - 1);
      if (f > 0) { ctx.fillStyle = c.accent; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { const py = y + s * (0.2 + 0.3 * b); if (py > y + s * (1 - f)) { ctx.beginPath(); ctx.arc(x + s * (0.2 + 0.3 * a), py, 1.8, 0, Math.PI * 2); ctx.fill(); } } }
    }
    if (n === 0) text(ctx, '0 mol', x0 + s + gap, y0 + 12 + s / 2 + 4, { size: 12, color: c.text3 });
    return y0 + 12 + Math.ceil(shown / cols) * (s + gap);
  }
  function working(x0, y0, w, m) {
    let y = y0;
    y = wline('M(' + m.s.f + ') = ' + mWork(m.s) + ' g·mol⁻¹', x0, y, w);
    y = wline('n = m / M = ' + num(S.m, 0) + ' / ' + am(m.M) + ' = ' + f3(m.n) + ' mol', x0, y, w, { color: c.ink, weight: 700 });
    y = wline('N = n × Nₐ = ' + f3(m.n) + ' × ' + num(6.022, 3) + ' × 10²³', x0, y, w);
    y = wline('  = ' + sci(m.N, 2) + ' ' + word(m.s), x0, y, w);
    if (m.per > 1) y = wline(L({ en: 'atoms', af: 'atome' }) + ' = ' + m.per + ' × N = ' + sci(m.atoms, 2), x0, y, w, { color: c.text2 });
    if (m.V != null) y = wline('V = n × Vₘ = ' + f3(m.n) + ' × ' + num(22.4, 1) + ' = ' + num(m.V, 1) + ' L ' + L({ en: '(STP)', af: '(STD)' }), x0, y, w, { color: c.text2 });
  }

  // ---------- Concentration: volumetric flask + c against V ----------
  function drawConc(W, H) {
    const m = concModel(), ph = W < 640;
    if (ph) { flask(0, 0, W, 270, m); let y = concWork(16, 296, W - 32, m); concGraph(0, y + 4, W, H - y - 8, m); }
    else { const fw = Math.round(W * 0.38); flask(0, 0, fw, H, m); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(fw + 0.5, 14); ctx.lineTo(fw + 0.5, H - 14); ctx.stroke(); const y = concWork(fw + 20, 30, W - fw - 36, m); concGraph(fw + 6, y + 2, W - fw - 6, H - y - 4, m); }
  }
  function flask(x0, y0, w, h, m) {
    const cx = x0 + w / 2, rMax = Math.min(w * 0.3, h * 0.24), r = rMax * Math.cbrt(S.fv / 1000), by = y0 + h - 44 - r, nw = Math.max(9, r * 0.32), nTop = by - r - Math.max(60, r * 1.5), markY = nTop + (by - r - nTop) * 0.35;
    // solution colour: copper(II) sulfate is blue, deeper at higher concentration; the others are colourless
    const blue = S.sol === 'CuSO4', a = blue ? Math.min(0.75, 0.1 + 0.55 * m.c / 1.25) : 0;
    ctx.fillStyle = blue ? (c.light ? `rgba(29,110,214,${a})` : `rgba(80,160,255,${a})`) : c.water;
    ctx.beginPath(); ctx.arc(cx, by, r - 1, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(cx - nw / 2 + 1, markY, nw - 2, by - r - markY + 4);
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6; ctx.beginPath();
    const ang = Math.asin(nw / 2 / r);
    ctx.arc(cx, by, r, -Math.PI / 2 + ang, Math.PI * 1.5 - ang); ctx.moveTo(cx - nw / 2, by - r * Math.cos(ang)); ctx.lineTo(cx - nw / 2, nTop); ctx.moveTo(cx + nw / 2, by - r * Math.cos(ang)); ctx.lineTo(cx + nw / 2, nTop); ctx.stroke();
    ctx.fillStyle = c.glass; ctx.fillRect(cx - nw / 2 - 2, nTop - 10, nw + 4, 10);   // stopper
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx - nw / 2 - 3, markY); ctx.lineTo(cx + nw / 2 + 3, markY); ctx.stroke();
    ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx + nw / 2 + 4, markY); ctx.lineTo(cx + nw / 2 + 22, markY - 10); ctx.stroke();
    text(ctx, T.mark, cx + nw / 2 + 25, markY - 8, { size: 12, color: c.text3 });
    // dissolved particles: their number per unit volume shows the concentration
    const rnd = rand(11), cnt = Math.min(70, Math.round(m.c * 14));
    ctx.fillStyle = blue ? (c.light ? '#0b4fa8' : '#bcdcff') : c.ink;
    for (let i = 0; i < cnt; i++) { const t = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * (r - 7); ctx.beginPath(); ctx.arc(cx + Math.cos(t) * rr, by + Math.sin(t) * rr, 2.2, 0, Math.PI * 2); ctx.fill(); }
    text(ctx, S.fv + ' cm³', cx, by + r * 0.55, { size: 12, mono: true, align: 'center', color: c.text2 });
    text(ctx, m.s.f + '(aq)', cx, y0 + 24, { size: 15, weight: 700, align: 'center', color: c.ink });
    text(ctx, num(S.sm, 1) + ' g ' + L(NAME[S.sol]) + ' ' + L({ en: 'made up to', af: 'aangevul tot' }) + ' ' + S.fv + ' cm³', cx, y0 + h - 16, { size: 12, align: 'center', color: c.text3 });
  }
  function concWork(x0, y0, w, m) {
    let y = y0;
    y = wline('M(' + m.s.f + ') = ' + mWork(m.s) + ' g·mol⁻¹', x0, y, w, { color: c.text2 });
    y = wline('n = m / M = ' + num(S.sm, 1) + ' / ' + am(m.M) + ' = ' + f3(m.n) + ' mol', x0, y, w);
    y = wline('V = ' + S.fv + ' cm³ = ' + num(m.V, 3) + ' L', x0, y, w);
    y = wline('c = n / V = ' + f3(m.n) + ' / ' + num(m.V, 3) + ' = ' + f3(m.c) + ' mol·L⁻¹', x0, y, w, { color: c.ink, weight: 700 });
    return y;
  }
  function concGraph(x0, y0, w, h, m) {
    const ax = MLX.axes(ctx, { x0, y0, w, h, xMin: 0, xMax: 1000, yMin: 0, yMax: 5, xTitle: T.xV, yTitle: T.yC, xTicks: 5, yTicks: 5 });
    ctx.save(); ctx.beginPath(); ctx.rect(ax.box.x0, ax.box.y0, ax.box.x1 - ax.box.x0, ax.box.y1 - ax.box.y0); ctx.clip();
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 120; i++) { const v = 40 + 960 * i / 120, X = ax.X(v), Y = ax.Y(m.n / (v / 1000)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); ctx.restore();
    [100, 250, 500, 1000].forEach(v => { const cc = m.n / (v / 1000); if (cc > 5) return; ctx.beginPath(); ctx.arc(ax.X(v), ax.Y(cc), v === S.fv ? 5.5 : 3.5, 0, Math.PI * 2); if (v === S.fv) { ctx.fillStyle = c.ink; ctx.fill(); } else { ctx.strokeStyle = c.accent; ctx.lineWidth = 1.5; ctx.stroke(); } });
  }

  // ---------- Formula: % composition bar + empirical-formula table ----------
  function drawForm(W, H) {
    const m = formModel(), ph = W < 640, x0 = 16, w = W - 32;
    if (ph) { text(ctx, L(T.pct) + ' ' + m.s.f, x0, 22, { size: 14, weight: 700, color: c.ink }); text(ctx, 'M = ' + am(m.M) + ' g·mol⁻¹', x0, 40, { size: 13, color: c.text2 }); }
    else text(ctx, L(T.pct) + ' ' + m.s.f + ' (M = ' + am(m.M) + ' g·mol⁻¹)', x0, 26, { size: 14, weight: 700, color: c.ink });
    // stacked bar
    let bx = x0; const by = ph ? 52 : 40, bh = 34;
    m.rows.forEach(r => {
      const bw = w * r.p / 100; ctx.fillStyle = EC(r.e); ctx.fillRect(bx, by, bw, bh);
      ctx.strokeStyle = c.stage; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
      const lab = r.e + ' ' + num(r.p, 1) + '%';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      if (ctx.measureText(lab).width < bw - 8) text(ctx, lab, bx + bw / 2, by + bh / 2 + 4, { size: 12, mono: true, weight: 600, align: 'center', color: ['H', 'Mg', 'Cl', 'S', 'Cu'].includes(r.e) || (r.e === 'C' && !c.light) || (r.e === 'Ca' && !c.light) || (r.e === 'Fe' && !c.light) || (r.e === 'O' && !c.light) ? '#111' : '#fff' });
      else text(ctx, lab, bx + bw / 2, by + bh + 16, { size: 12, mono: true, align: 'center', color: c.text2 });
      bx += bw;
    });
    text(ctx, '% ' + m.rows[0].e + ' = ' + (m.s.el[0][1] > 1 ? m.s.el[0][1] + ' × ' : '') + am(A[m.rows[0].e]) + ' / ' + am(m.M) + ' × 100 = ' + num(m.rows[0].p, 1) + '%', x0, by + bh + 38, { size: ph ? 12 : 13, mono: true, color: c.text2 });
    // method table (columns appear step by step)
    const tw = Math.min(w, 560), cw = ph ? [60, (tw - 60) / 4, (tw - 60) / 4, (tw - 60) / 4, (tw - 60) / 4] : [90, 120, 120, 120, tw - 450];
    const cols = [[T.hEl, cw[0]], [L({ en: '1: ', af: '1: ' }) + L(T.hM), cw[1]], ['2: ' + L(T.hN), cw[2]], ['3: ' + L(T.hR), cw[3]], ['4: ' + L(T.hW), cw[4]]];
    if (ph) { cols[1][0] = '1: m (g)'; cols[2][0] = '2: n'; cols[3][0] = '3: ÷ min'; cols[4][0] = '4'; }
    const rows = m.rows.map(r => [r.e, num(r.p, 1) + ' g', S.step >= 2 ? num(r.n, 2) : '', S.step >= 3 ? num(r.r, 2) : '', S.step >= 4 ? { t: m.mult > 1 && !ph ? num(r.r, 2) + ' × ' + m.mult + ' = ' + r.w : String(r.w), bold: true, color: c.accent } : '']);
    let y = table(x0, by + bh + 70, cols, rows, { rh: 26 });
    y += 26;
    if (S.step >= 4) {
      if (m.mult > 1) { ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; MLX.wrap(ctx, L({ en: 'Step 4: 1 : 1.5 is not whole, so multiply both by ', af: 'Stap 4: 1 : 1,5 is nie heel nie, dus vermenigvuldig albei met ' }) + m.mult + '.', w).forEach(ln => { text(ctx, ln, x0, y, { size: 12, color: c.text2 }); y += 17; }); y += 8; }
      text(ctx, L(T.emp) + ': ' + m.ef + '   (M = ' + am(m.Me) + ' g·mol⁻¹)', x0, y, { size: 14, weight: 700, color: c.ink });
      if (m.x > 1) text(ctx, L(T.molf) + ': ' + am(m.M) + ' / ' + am(m.Me) + ' = ' + m.x + '  →  ' + m.s.f, x0, y + 24, { size: 14, color: c.text });
      else { ctx.font = '500 13px "Cabinet Grotesk", sans-serif'; MLX.wrap(ctx, L(T.molf) + ': ' + m.s.f + ' ' + L({ en: '(same as the empirical formula)', af: '(dieselfde as die empiriese formule)' }), w).forEach((ln, i) => text(ctx, ln, x0, y + 24 + i * 18, { size: 13, color: c.text2 })); }
    } else {
      const hint = [null, { en: 'Step 1: take the percentages as the masses (in grams) in a 100 g sample.', af: 'Stap 1: neem die persentasies as die massas (in gram) in \'n monster van 100 g.' }, { en: 'Step 2: divide each mass by the element\'s molar mass to get moles.', af: 'Stap 2: deel elke massa deur die element se molêre massa om mol te kry.' }, { en: 'Step 3: divide every mole value by the smallest one.', af: 'Stap 3: deel elke molwaarde deur die kleinste een.' }][S.step];
      ctx.font = '500 13px "Cabinet Grotesk", sans-serif'; MLX.wrap(ctx, hint, w).forEach((ln, i) => text(ctx, ln, x0, y + i * 18, { size: 13, color: c.text2 }));
    }
  }

  // ---------- Limiting reagent: before/after particles + amounts table ----------
  function drawRxn(W, H) {
    const m = rxnModel(), ph = W < 640;
    text(ctx, T.eq, W / 2, 26, { size: 17, weight: 700, align: 'center', color: c.ink, mono: true });
    const gap = ph ? 26 : 50, bw = Math.min(300, (W - 32 - gap) / 2), bh = ph ? 170 : 175, bx1 = W / 2 - gap / 2 - bw, bx2 = W / 2 + gap / 2, by = 46;
    // particle counts (each ≈ 0.1 mol), reacted in whole particles so atoms are conserved in the picture
    const d = [Math.round(m.nR[0] / RX.unit), Math.round(m.nR[1] / RX.unit)], xd = Math.min(Math.floor(d[0] / 2), d[1]);
    const before = [[RX.R[0].at, d[0]], [RX.R[1].at, d[1]]], after = [[RX.P[0].at, 2 * xd], [RX.R[0].at, d[0] - 2 * xd], [RX.R[1].at, d[1] - xd]];
    box(bx1, by, bw, bh, T.before, before, 3); box(bx2, by, bw, bh, T.after, after, 5);
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(bx1 + bw + 6, by + bh / 2); ctx.lineTo(bx2 - 6, by + bh / 2); ctx.lineTo(bx2 - 12, by + bh / 2 - 5); ctx.moveTo(bx2 - 6, by + bh / 2); ctx.lineTo(bx2 - 12, by + bh / 2 + 5); ctx.stroke();
    // legend
    let lx = Math.max(16, bx1), ly = by + bh + 22;
    [[['Mg'], 'Mg'], [['O', 'O'], 'O₂'], [['Mg', 'O'], 'MgO']].forEach(([at, f]) => { particle(at, lx + 8, ly - 4, 5.5); text(ctx, f, lx + 22, ly, { size: 12, color: c.text2 }); lx += 62; });
    text(ctx, T.each, ph ? Math.max(16, bx1) : lx + 10, ph ? ly + 20 : ly, { size: 12, color: c.text3 });
    // amounts table (mol)
    const ty = ly + (ph ? 46 : 34), tw = Math.min(W - 32, 560), tx = (W - tw) / 2, c0 = ph ? 58 : 110, cw = (tw - c0) / 4;
    const sg = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + f3(Math.abs(v));
    const rows = [
      [{ t: 'Mg', color: m.limI === 0 ? bad() : c.text, bold: m.limI === 0 }, f3(m.nR[0]), sg(-2 * m.x), f3(m.left[0]), num(m.left[0] * 24, 1)],
      [{ t: 'O₂', color: m.limI === 1 ? bad() : c.text, bold: m.limI === 1 }, f3(m.nR[1]), sg(-m.x), f3(m.left[1]), num(m.left[1] * 32, 1)],
      [{ t: 'MgO', color: c.accent, bold: true }, '0', sg(m.nP), f3(m.nP), { t: num(m.theo, 1), color: c.accent, bold: true }],
    ];
    const y = table(tx, ty, [[T.hS, c0], [L(T.hB) + (ph ? '' : ' (mol)'), cw], [ph ? 'Δn' : T.hC, cw], [L(T.hA) + (ph ? '' : ' (mol)'), cw], [ph ? 'm (g)' : T.hMa, cw]], rows, { rh: 25 });
    if (m.limI >= 0) {
      const lim = m.limI === 0 ? 'Mg' : 'O₂';
      const s1 = 'n ÷ ' + L({ en: 'coefficient', af: 'koëffisiënt' }) + ':  Mg ' + f3(m.nR[0]) + ' / 2 = ' + f3(m.nR[0] / 2) + ',  O₂ ' + f3(m.nR[1]) + ' / 1 = ' + f3(m.nR[1]);
      let yy = y + 24;
      if (ph) { text(ctx, 'n ÷ ' + L({ en: 'coefficient', af: 'koëffisiënt' }) + ':', tx, yy, { size: 12, mono: true, color: c.text2 }); ['Mg ' + f3(m.nR[0]) + ' / 2 = ' + f3(m.nR[0] / 2), 'O₂ ' + f3(m.nR[1]) + ' / 1 = ' + f3(m.nR[1])].forEach(t => { yy += 18; text(ctx, '  ' + t, tx, yy, { size: 12, mono: true, color: c.text2 }); }); yy += 22; }
      else yy = wline(s1, tx, yy, tw, { size: 12, color: c.text2 });
      ctx.font = '500 13px "Cabinet Grotesk", sans-serif';
      MLX.wrap(ctx, L({ en: 'The smaller value belongs to ', af: 'Die kleiner waarde behoort aan ' }) + lim + L({ en: ': it is the limiting reagent.', af: ': dit is die beperkende reagens.' }), tw).forEach((ln, i) => text(ctx, ln, tx, yy + i * 18, { size: 13, color: c.text }));
    }
  }
  function box(x, y, w, h, title, groups, seed) {
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2; MLX.roundRect(ctx, x, y, w, h, 8); ctx.stroke();
    text(ctx, title, x + 10, y + 18, { size: 12, weight: 700, color: c.text2 });
    const list = []; groups.forEach(([at, n]) => { for (let i = 0; i < n; i++) list.push(at); });
    const top = y + 26, ih = h - 32, cell = Math.max(14, Math.min(30, Math.floor(Math.sqrt((w - 12) * ih / Math.max(36, list.length + 4))))), cols = Math.floor((w - 12) / cell), rows = Math.floor(ih / cell);
    const order = []; for (let i = 0; i < cols * rows; i++) order.push(i);
    const rnd = rand(seed * 97 + 13); for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
    const r = Math.min(5.5, cell * 0.24);
    list.forEach((at, i) => { if (i >= order.length) return; const k = order[i], cx = x + 6 + (k % cols + 0.5) * cell + (rnd() - 0.5) * cell * 0.25, cy = top + (Math.floor(k / cols) + 0.5) * cell + (rnd() - 0.5) * cell * 0.25; particle(at, cx, cy, r); });
  }

  // ---------- state → side panel, caption ----------
  let lastMode = null;
  function update() {
    Object.keys(cards).forEach(k => { cards[k].style.display = k === S.mode ? '' : 'none'; });
    const set = (lab, unit) => { primLab.textContent = L(lab); primUnit.textContent = L(unit); };
    let cap, aria;
    if (S.mode !== lastMode) {
      lastMode = S.mode;
      if (S.mode === 'mol') setReadout([['M', T.M], ['N', T.N], ['a', T.atoms], ['V', T.V]]);
      if (S.mode === 'conc') setReadout([['M', T.M], ['n', T.nsol], ['V', T.vsol]]);
      if (S.mode === 'form') setReadout([['e', T.emp], ['m', T.molf]]);
      if (S.mode === 'rxn') setReadout([['l', T.lim], ['e', T.exc], ['y', T.yld]]);
    }
    if (S.mode === 'mol') {
      const m = molModel(); set(T.n, T.mol); prim.set(f3(m.n));
      ro.set('M', am(m.M) + ' g·mol⁻¹'); ro.set('N', sci(m.N, 2)); ro.set('a', sci(m.atoms, 2)); ro.set('V', m.V != null ? num(m.V, 1) + ' L' : L(T.notGas));
      cap = S.m === 0 ? { en: 'Put some of the substance on the balance.', af: 'Sit van die stof op die skaal.' }
        : { en: num(S.m, 0) + ' g of ' + m.s.f + ' is ' + f3(m.n) + ' mol, because each mole has a mass of ' + am(m.M) + ' g; that is ' + sci(m.N, 2) + ' ' + word(m.s) + '.', af: num(S.m, 0) + ' g ' + m.s.f + ' is ' + f3(m.n) + ' mol, omdat elke mol \'n massa van ' + am(m.M) + ' g het; dit is ' + sci(m.N, 2) + ' ' + word(m.s) + '.' };
      aria = m.s.f + ': ' + num(S.m, 0) + ' g, ' + f3(m.n) + ' mol, ' + sci(m.N, 2) + ' ' + word(m.s);
    } else if (S.mode === 'conc') {
      const m = concModel(); set(T.c, T.cu); prim.set(f3(m.c));
      ro.set('M', am(m.M) + ' g·mol⁻¹'); ro.set('n', f3(m.n) + ' mol'); ro.set('V', num(m.V, 3) + ' L');
      cap = S.sm === 0 ? { en: 'Dissolve some solute: with no solute the concentration is zero.', af: 'Los van die stof op: sonder opgeloste stof is die konsentrasie nul.' }
        : { en: 'The same ' + f3(m.n) + ' mol in a bigger flask is spread through more solution, so c = n/V is smaller: c is inversely proportional to V.', af: 'Dieselfde ' + f3(m.n) + ' mol in \'n groter fles is deur meer oplossing versprei, dus is c = n/V kleiner: c is omgekeerd eweredig aan V.' };
      aria = m.s.f + ': ' + num(S.sm, 1) + ' g in ' + S.fv + ' cm³, c = ' + f3(m.c) + ' mol·L⁻¹';
    } else if (S.mode === 'form') {
      const m = formModel(); set({ en: '% by mass of ' + m.rows[0].e, af: '% volgens massa ' + m.rows[0].e }, '%'); prim.set(num(m.rows[0].p, 1));
      ro.set('e', S.step >= 4 ? m.ef : '…'); ro.set('m', S.step >= 4 ? m.s.f : '…');
      cap = m.x > 1 ? { en: 'The empirical formula ' + m.ef + ' is the simplest ratio; ' + m.s.f + ' has ' + m.x + ' times as many of each atom.', af: 'Die empiriese formule ' + m.ef + ' is die eenvoudigste verhouding; ' + m.s.f + ' het ' + m.x + ' keer soveel van elke atoom.' }
        : m.mult > 1 ? { en: 'Dividing by the smallest gives 1 : 1.5, so multiply by ' + m.mult + ' to get whole numbers: ' + m.ef + '.', af: 'Deel deur die kleinste gee 1 : 1,5, dus vermenigvuldig met ' + m.mult + ' om heelgetalle te kry: ' + m.ef + '.' }
          : { en: 'Mass percentages become a mole ratio once each is divided by the molar mass of its element.', af: 'Massapersentasies word \'n molverhouding sodra elkeen deur sy element se molêre massa gedeel word.' };
      aria = m.s.f + ': ' + m.rows.map(r => r.e + ' ' + num(r.p, 1) + '%').join(', ') + '. ' + L(T.emp) + ' ' + m.ef;
    } else {
      const m = rxnModel(); set(T.theo, T.g); prim.set(num(m.theo, 1));
      const exI = m.limI === 0 ? 1 : 0, exF = ['Mg', 'O₂'][exI], exM = m.left[exI] * [24, 32][exI];
      ro.set('l', m.limI < 0 ? '—' : ['Mg', 'O₂'][m.limI], bad()); ro.set('e', m.limI < 0 ? '—' : exM < 0.05 ? L(T.none) : num(exM, 1) + ' g ' + exF);
      const over = m.yld != null && m.yld > 100;
      ro.set('y', m.yld == null ? '—' : num(m.yld, 1) + '%', over ? bad() : '');
      cap = m.limI < 0 ? { en: 'Add some magnesium and oxygen.', af: 'Voeg magnesium en suurstof by.' }
        : over ? { en: 'More than 100% is impossible: the product collected must still be wet or impure.', af: 'Meer as 100% is onmoontlik: die versamelde produk moet nog nat of onsuiwer wees.' }
          : exM < 0.05 ? { en: 'The masses are in the exact 2 : 1 mole ratio, so both reactants are used up completely.', af: 'Die massas is presies in die 2 : 1-molverhouding, dus word albei reaktanse heeltemal opgebruik.' }
            : { en: ['Mg', 'O₂'][m.limI] + ' runs out first, so it limits the MgO to ' + num(m.theo, 1) + ' g; the extra ' + exF + ' is left over. Adding more ' + exF + ' would not make more MgO.', af: ['Mg', 'O₂'][m.limI] + ' raak eerste op, dus beperk dit die MgO tot ' + num(m.theo, 1) + ' g; die ekstra ' + exF + ' bly oor. Meer ' + exF + ' sal nie meer MgO maak nie.' };
      aria = '2Mg + O₂ → 2MgO: ' + S.mg + ' g Mg, ' + S.o2 + ' g O₂, ' + L(T.theo) + ' ' + num(m.theo, 1) + ' g';
    }
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + aria + '.');
    ui.cv.draw();
  }
  update();
});
