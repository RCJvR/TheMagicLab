/* Gr11 Energy and chemical change — three views of the energy in a reaction.
 * 1. Energy profile: reactants → activated complex (peak) → products.
 *      ΔH = H(products) − H(reactants) = Ea(forward) − Ea(reverse);  ΔH < 0 exothermic, ΔH > 0 endothermic.
 *    A catalyst gives a pathway with a lower Ea (forward and reverse lowered by the same amount); ΔH is unchanged.
 *    Real data: H2O2 → H2O + ½O2: ΔH = −98 kJ·mol⁻¹, Ea ≈ 75 kJ·mol⁻¹, ≈ 56 kJ·mol⁻¹ with iodide ions;
 *               2HI → H2 + I2: ΔH ≈ +9 kJ·mol⁻¹, Ea ≈ 184 kJ·mol⁻¹, ≈ 59 kJ·mol⁻¹ on platinum.
 * 2. Bond energies: breaking bonds absorbs energy, forming bonds releases it;
 *      ΔH ≈ Σ(bond energies broken) − Σ(bond energies formed)   (average bond energies, kJ·mol⁻¹;
 *      H–Cl = 432 as in the lesson's workbook, so H2 + Cl2 gives −186).
 * 3. Calorimeter (polystyrene cup, no heat lost): Q = mcΔT with c = 4.18 J·g⁻¹·°C⁻¹, ΔH = −Q/n.
 *      HCl + NaOH: ΔH = −57.3 kJ·mol⁻¹ (50 cm³ + 50 cm³, m = 100 g); NH4NO3 dissolving: +25.7 kJ·mol⁻¹ (50 g water, M = 80 g·mol⁻¹).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    ariaP: { en: 'Potential energy diagram: reactants, the activated complex at the peak and the products, with the activation energy and ΔH marked', af: 'Potensiële-energiediagram: reagense, die geaktiveerde kompleks by die piek en die produkte, met die aktiveringsenergie en ΔH aangedui' },
    ariaB: { en: 'Energy level diagram: energy is absorbed to break the bonds of the reactants into atoms, then released as the bonds of the products form', af: 'Energievlakdiagram: energie word geabsorbeer om die bindings van die reagense in atome op te breek, en dan vrygestel soos die bindings van die produkte vorm' },
    ariaC: { en: 'A polystyrene cup calorimeter with a lid, thermometer and stirrer, and a graph of temperature against time', af: '\'n Polistireenbeker-kalorimeter met \'n deksel, termometer en roerder, en \'n grafiek van temperatuur teen tyd' },
    view: { en: 'View', af: 'Aansig' }, vP: { en: 'Energy profile', af: 'Energieprofiel' }, vB: { en: 'Bond energies', af: 'Bindingsenergieë' }, vC: { en: 'Calorimeter', af: 'Kalorimeter' },
    dH: { en: 'Heat of reaction ΔH', af: 'Reaksiewarmte ΔH' }, unit: { en: 'kJ·mol⁻¹', af: 'kJ·mol⁻¹' },
    type: { en: 'Type', af: 'Soort' }, exo: { en: 'exothermic', af: 'eksotermies' }, endo: { en: 'endothermic', af: 'endotermies' },
    sur: { en: 'Surroundings', af: 'Omgewing' }, warm: { en: 'become warmer', af: 'word warmer' }, cool: { en: 'become cooler', af: 'word koeler' },
    eaF: { en: 'Ea (forward)', af: 'Ea (voorwaarts)' }, eaR: { en: 'Ea (reverse)', af: 'Ea (terugwaarts)' }, eaC: { en: 'Ea with catalyst', af: 'Ea met katalisator' },
    rxn: { en: 'Reaction', af: 'Reaksie' }, own: { en: 'Build your own', af: 'Bou jou eie' },
    sDH: { en: 'ΔH', af: 'ΔH' }, sEa: { en: 'Activation energy Ea', af: 'Aktiveringsenergie Ea' }, cat: { en: 'Add a catalyst', af: 'Voeg \'n katalisator by' },
    xP: { en: 'Course of reaction', af: 'Reaksieverloop' }, yP: { en: 'Potential energy (kJ·mol⁻¹)', af: 'Potensiële energie (kJ·mol⁻¹)' },
    reac: { en: 'reactants', af: 'reagense' }, prod: { en: 'products', af: 'produkte' }, ac: { en: 'activated complex', af: 'geaktiveerde kompleks' },
    withCat: { en: 'with catalyst', af: 'met katalisator' },
    brk: { en: 'Energy absorbed (bonds broken)', af: 'Energie geabsorbeer (bindings gebreek)' }, frm: { en: 'Energy released (bonds formed)', af: 'Energie vrygestel (bindings gevorm)' },
    meas: { en: 'Measured value', af: 'Gemete waarde' }, used: { en: 'Average bond energies used (kJ·mol⁻¹)', af: 'Gemiddelde bindingsenergieë gebruik (kJ·mol⁻¹)' },
    atoms: { en: 'separate atoms', af: 'los atome' }, broken: { en: 'bonds broken', af: 'bindings gebreek' }, formed: { en: 'bonds formed', af: 'bindings gevorm' },
    yB: { en: 'Energy (kJ·mol⁻¹)', af: 'Energie (kJ·mol⁻¹)' },
    setup: { en: 'Experiment', af: 'Eksperiment' }, neut: { en: 'HCl + NaOH', af: 'HCl + NaOH' }, diss: { en: 'Dissolve NH₄NO₃', af: 'Los NH₄NO₃ op' },
    conc: { en: 'Concentration of each solution', af: 'Konsentrasie van elke oplossing' }, mass: { en: 'Mass of NH₄NO₃', af: 'Massa NH₄NO₃' },
    run: { en: 'Mix and measure', af: 'Meng en meet' }, again: { en: 'Empty the cup', af: 'Maak die beker leeg' },
    dT: { en: 'ΔT', af: 'ΔT' }, Q: { en: 'Q = mcΔT', af: 'Q = mcΔT' }, n: { en: 'n', af: 'n' },
    xC: { en: 'Time (s)', af: 'Tyd (s)' }, yC: { en: 'Temperature (°C)', af: 'Temperatuur (°C)' },
    therm: { en: 'thermometer', af: 'termometer' }, lid: { en: 'lid', af: 'deksel' }, cups: { en: 'polystyrene cups', af: 'polistireenbekers' }, stir: { en: 'stirrer', af: 'roerder' },
    sol: { en: 'solution', af: 'oplossing' }, mixAt: { en: 'mixed', af: 'gemeng' },
    capExo: { en: 'Exothermic: the products have less potential energy than the reactants, so energy is released and ΔH is negative.', af: 'Eksotermies: die produkte het minder potensiële energie as die reagense, dus word energie vrygestel en ΔH is negatief.' },
    capEndo: { en: 'Endothermic: the products have more potential energy than the reactants, so energy is absorbed and ΔH is positive.', af: 'Endotermies: die produkte het meer potensiële energie as die reagense, dus word energie geabsorbeer en ΔH is positief.' },
    capCat: { en: 'The catalyst gives a pathway with a lower activation energy, so the reaction is faster. The reactants, products and ΔH stay exactly the same.', af: 'Die katalisator bied \'n roete met \'n laer aktiveringsenergie, dus is die reaksie vinniger. Die reagense, produkte en ΔH bly presies dieselfde.' },
    capBexo: { en: 'More energy is released forming the new bonds than is absorbed breaking the old ones, so the reaction is exothermic.', af: 'Meer energie word vrygestel as die nuwe bindings vorm as wat geabsorbeer word om die ou bindings te breek, dus is die reaksie eksotermies.' },
    capBendo: { en: 'More energy is absorbed breaking the bonds than is released forming the new ones, so the reaction is endothermic.', af: 'Meer energie word geabsorbeer om die bindings te breek as wat vrygestel word as die nuwes vorm, dus is die reaksie endotermies.' },
    capC0: { en: 'Set the amount, then mix. The thermometer measures the temperature change of the solution (assume no heat is lost).', af: 'Stel die hoeveelheid en meng dan. Die termometer meet die temperatuurverandering van die oplossing (aanvaar geen hitte gaan verlore nie).' },
    capCexo: { en: 'The solution warms up: the reaction releases energy to the water, so ΔH = −Q/n is negative.', af: 'Die oplossing word warm: die reaksie stel energie aan die water vry, dus is ΔH = −Q/n negatief.' },
    capCendo: { en: 'The solution cools down: dissolving absorbs energy from the water, so ΔH is positive.', af: 'Die oplossing word koud: die oplossing absorbeer energie uit die water, dus is ΔH positief.' },
  };
  const EX = {
    h2o2: { label: 'H₂O₂ → H₂O + ½O₂', r: 'H₂O₂(ℓ)', p: 'H₂O(ℓ) + ½O₂(g)', dH: -98, ea: 75, eaC: 56, cat: { en: 'catalyst: iodide ions', af: 'katalisator: jodiedione' } },
    hi: { label: '2HI → H₂ + I₂', r: '2HI(g)', p: 'H₂(g) + I₂(g)', dH: 9, ea: 184, eaC: 59, cat: { en: 'catalyst: platinum', af: 'katalisator: platinum' } },
  };
  const BE = { 'H–H': 436, 'Cl–Cl': 242, 'H–Cl': 432, 'C–H': 413, 'O=O': 498, 'C=O': 799, 'O–H': 463, 'N≡N': 945, 'N–H': 391 };
  const BR = {
    hcl: { label: 'H₂ + Cl₂', eq: 'H₂(g) + Cl₂(g) → 2HCl(g)', R: [['H2', 1], ['Cl2', 1]], A: { H: 2, Cl: 2 }, P: [['HCl', 2]], brk: [['H–H', 1], ['Cl–Cl', 1]], frm: [['H–Cl', 2]], meas: '−185' },
    ch4: { label: 'CH₄ + 2O₂', eq: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)', R: [['CH4', 1], ['O2', 2]], A: { C: 1, H: 4, O: 4 }, P: [['CO2', 1], ['H2O', 2]], brk: [['C–H', 4], ['O=O', 2]], frm: [['C=O', 2], ['O–H', 4]], meas: { en: '−802 (steam), −890 (liquid water)', af: '−802 (stoom), −890 (vloeibare water)' } },
    nh3: { label: 'N₂ + 3H₂', eq: 'N₂(g) + 3H₂(g) → 2NH₃(g)', R: [['N2', 1], ['H2', 3]], A: { N: 2, H: 6 }, P: [['NH3', 2]], brk: [['N≡N', 1], ['H–H', 3]], frm: [['N–H', 6]], meas: '−92' },
    h2o: { label: '2H₂O → 2H₂ + O₂', eq: '2H₂O(g) → 2H₂(g) + O₂(g)', R: [['H2O', 2]], A: { H: 4, O: 2 }, P: [['H2', 2], ['O2', 1]], brk: [['O–H', 4]], frm: [['H–H', 2], ['O=O', 1]], meas: '+484' },
  };
  const sum = (list) => list.reduce((a, [b, k]) => a + BE[b] * k, 0);
  // molecule templates: atoms [element, x, y] in bond lengths, bonds [i, j, order]
  const MOL = {
    H2: [[['H', 0, 0], ['H', 1, 0]], [[0, 1, 1]]], Cl2: [[['Cl', 0, 0], ['Cl', 1.15, 0]], [[0, 1, 1]]], HCl: [[['H', 0, 0], ['Cl', 1.1, 0]], [[0, 1, 1]]],
    O2: [[['O', 0, 0], ['O', 1.05, 0]], [[0, 1, 2]]], N2: [[['N', 0, 0], ['N', 1.05, 0]], [[0, 1, 3]]],
    CH4: [[['C', 0, 0], ['H', 0, -1], ['H', 1, 0], ['H', 0, 1], ['H', -1, 0]], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]]],
    CO2: [[['O', -1.15, 0], ['C', 0, 0], ['O', 1.15, 0]], [[0, 1, 2], [1, 2, 2]]],
    H2O: [[['O', 0, 0], ['H', -0.85, 0.6], ['H', 0.85, 0.6]], [[0, 1, 1], [0, 2, 1]]],
    NH3: [[['N', 0, 0], ['H', -0.95, 0.55], ['H', 0.95, 0.55], ['H', 0, -1]], [[0, 1, 1], [0, 2, 1], [0, 3, 1]]],
  };
  const CR = {
    neut: { eq: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(ℓ)', dH: -57.3, m: 100, slider: { label: T.conc, min: 0.5, max: 2, step: 0.1, value: 1, fmt: (v) => num(v, 1) + ' mol·dm⁻³' }, n: (v) => v * 0.05, note: { en: '50 cm³ acid + 50 cm³ base: m = 100 g', af: '50 cm³ suur + 50 cm³ basis: m = 100 g' } },
    diss: { eq: 'NH₄NO₃(s) → NH₄⁺(aq) + NO₃⁻(aq)', dH: 25.7, m: 50, slider: { label: T.mass, min: 1, max: 8, step: 0.5, value: 4, fmt: (v) => num(v, 1) + ' g' }, n: (v) => v / 80, note: { en: 'in 50 g of water; M(NH₄NO₃) = 80 g·mol⁻¹', af: 'in 50 g water; M(NH₄NO₃) = 80 g·mol⁻¹' } },
  };
  const S = { view: 'prof', ex: 'h2o2', dH: -98, ea: 75, eaC: 56, cat: false, br: 'hcl', cr: 'neut', amt: 1, t: 0, run: 0 };
  const T0 = 21.0, TMIX = 20, TEND = 120;

  // ── UI ──
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 520 : Math.max(380, Math.min(450, Math.round(w * 0.5))), ariaLabel: T.ariaP, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const c0 = MLX.card(ui.side, null);
  MLX.seg(c0, { label: T.view, options: [['prof', T.vP], ['bond', T.vB], ['cal', T.vC]], value: S.view, onChange: (v) => { S.view = v; vis(); update(); } });
  const prim = MLX.primary(ui.side, { label: T.dH, unit: T.unit });
  const roP = MLX.readout(prim.el, [['t', T.type], ['s', T.sur], ['f', T.eaF], ['r', T.eaR], ['c', T.eaC]]);
  const roB = MLX.readout(prim.el, [['b', T.brk], ['f', T.frm], ['m', T.meas]]);
  const roC = MLX.readout(prim.el, [['d', T.dT], ['q', T.Q], ['n', T.n]]);
  // group each readout's rows so they can be shown per view
  const rows = [...prim.el.querySelectorAll('.mlx-row')];
  const gP = MLX.h('div'), gB = MLX.h('div'), gC = MLX.h('div');
  rows.slice(0, 5).forEach(r => gP.appendChild(r)); rows.slice(5, 8).forEach(r => gB.appendChild(r)); rows.slice(8).forEach(r => gC.appendChild(r));
  prim.el.appendChild(gP); prim.el.appendChild(gB); prim.el.appendChild(gC);
  const bNote = MLX.h('p', { class: 'mlx-note' }); bNote.style.marginTop = '8px'; gB.appendChild(bNote);
  // profile controls
  const cP = MLX.card(ui.side, T.rxn);
  const exSeg = MLX.seg(cP, { options: [['h2o2', EX.h2o2.label], ['hi', EX.hi.label], ['own', T.own]], value: S.ex, onChange: (v) => { S.ex = v; if (v !== 'own') { const e = EX[v]; S.dH = e.dH; S.ea = e.ea; S.eaC = e.eaC; sD.set(S.dH); sE.set(S.ea); } update(); } });
  const sD = MLX.slider(cP, { label: T.sDH, min: -300, max: 300, step: 1, value: S.dH, fmt: (v) => (v > 0 ? '+' : '') + num(v, 0) + ' kJ·mol⁻¹', onInput: (v) => { S.dH = v; own(); if (S.ea < Math.max(0, v) + 5) { S.ea = Math.max(0, v) + 5; sE.set(S.ea); } update(); } });
  const sE = MLX.slider(cP, { label: T.sEa, min: 5, max: 400, step: 1, value: S.ea, fmt: (v) => num(v, 0) + ' kJ·mol⁻¹', onInput: (v) => { S.ea = Math.max(v, Math.max(0, S.dH) + 5); if (S.ea !== v) sE.set(S.ea); own(); update(); } });
  MLX.check(cP, { label: T.cat, value: false, onChange: (v) => { S.cat = v; update(); } }).el.style.marginTop = '4px';
  function own() { if (S.ex !== 'own') { S.ex = 'own'; exSeg.set('own'); } S.eaC = Math.max(Math.round(S.ea * 0.6), Math.max(0, S.dH) + 3); }
  // bond controls
  const cB = MLX.card(ui.side, T.rxn);
  MLX.seg(cB, { options: Object.keys(BR).map(k => [k, BR[k].label]), value: S.br, onChange: (v) => { S.br = v; update(); } });
  // calorimeter controls
  const cC = MLX.card(ui.side, T.setup);
  MLX.seg(cC, { options: [['neut', T.neut], ['diss', T.diss]], value: S.cr, onChange: (v) => { S.cr = v; makeAmt(); empty(); } });
  const amtBox = MLX.h('div'); cC.appendChild(amtBox);
  const cNote = MLX.h('p', { class: 'mlx-note' }); cC.appendChild(cNote);
  const bt = MLX.h('div', { class: 'mlx-btns' }); cC.appendChild(bt);
  const runB = MLX.button(bt, T.run, () => { if (S.run === 0) { S.run = 1; S.t = 0; if (MLX.reducedMotion) { S.t = TEND; S.run = 2; } update(); } }, 'primary');
  MLX.button(bt, T.again, () => empty());
  function makeAmt() {
    amtBox.innerHTML = ''; const o = CR[S.cr].slider; S.amt = o.value;
    MLX.slider(amtBox, Object.assign({}, o, { onInput: (v) => { S.amt = v; empty(); } }));
    cNote.textContent = L(CR[S.cr].note);
  }
  function empty() { S.run = 0; S.t = 0; update(); }
  makeAmt();
  function vis() {
    const v = S.view;
    cP.style.display = gP.style.display = v === 'prof' ? '' : 'none';
    cB.style.display = gB.style.display = v === 'bond' ? '' : 'none';
    cC.style.display = gC.style.display = v === 'cal' ? '' : 'none';
  }
  vis();
  MLX.loop(ui.cv.el, (dt) => {
    if (S.view !== 'cal' || S.run !== 1) return;
    S.t += dt * 20; if (S.t >= TEND) { S.t = TEND; S.run = 2; }
    update();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  // ── calorimeter model (ideal: no heat lost) ──
  const cal = () => {
    const r = CR[S.cr], n = r.n(S.amt), dT = Math.round(-r.dH * 1000 * n / (r.m * 4.18) * 10) / 10;
    const Q = r.m * 4.18 * Math.abs(dT), dH = (dT > 0 ? -1 : 1) * Q / n / 1000;
    return { r, n, dT, Q, dH };
  };
  const tempAt = (t) => { const k = cal(); return t < TMIX ? T0 : T0 + k.dT * (1 - Math.exp(-(t - TMIX) / 8)); };

  // ── drawing ──
  let c, ctx;
  const colCat = () => c.light ? '#a86a00' : '#f5b23d';
  const EL = () => ({
    H: [c.light ? '#e8eaee' : '#dfe4ea', '#16181d'], C: [c.light ? '#4b5563' : '#8b95a3', '#ffffff'], O: [c.light ? '#c0392b' : '#e0605a', '#ffffff'],
    N: [c.light ? '#2f5fb3' : '#5b8be0', '#ffffff'], Cl: [c.light ? '#2e8b3e' : '#3fae55', '#ffffff'],
  });
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.view === 'prof') profile(0, 0, W, H);
    else if (S.view === 'bond') bonds(0, 0, W, H);
    else calorimeter(W, H);
  }
  function arrow(x, y1, y2, col, both) {
    const d = y2 > y1 ? 1 : -1, hd = Math.min(8, Math.abs(y2 - y1) / 2.5);
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();
    const head = (yy, dd) => { ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x - 4.5, yy - dd * hd); ctx.lineTo(x + 4.5, yy - dd * hd); ctx.closePath(); ctx.fill(); };
    if (Math.abs(y2 - y1) > 4) { head(y2, d); if (both) head(y1, -d); }
  }
  function profile(x0, y0, w, h) {
    const ph = w < 500;
    const ax = MLX.axes(ctx, { x0, y0: y0 + 4, w, h: h - 4, xMin: 0, xMax: 1, yMin: -350, yMax: 450, xTitle: T.xP, yTitle: T.yP, xTicks: 1, yTicks: 8, fmtX: () => '' });
    const P = (u, top) => u <= 0.2 ? 0 : u >= 0.8 ? S.dH : u <= 0.5 ? top * sm((u - 0.2) / 0.3) : top + (S.dH - top) * sm((u - 0.5) / 0.3);
    function sm(t) { return t * t * (3 - 2 * t); }
    const path = (top, col, lw, dash) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash(dash || []); ctx.beginPath(); for (let i = 0; i <= 200; i++) { const u = i / 200, X = ax.X(u), Y = ax.Y(P(u, top)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); ctx.setLineDash([]); };
    // dashed reactant level carried across for ΔH, dashed product level
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(ax.X(0.2), ax.Y(0)); ctx.lineTo(ax.X(0.96), ax.Y(0)); ctx.stroke(); ctx.setLineDash([]);
    if (S.cat) path(S.eaC, colCat(), 2.2, [7, 5]);
    path(S.ea, c.accent, 2.8);
    // activated complex
    const pkX = ax.X(0.5), pkY = ax.Y(S.ea);
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(pkX, pkY, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pkX + 5, pkY - 4); ctx.lineTo(pkX + 26, pkY - 16); ctx.stroke();
    text(ctx, T.ac, pkX + 29, pkY - 13, { size: 12, color: c.text2 });
    // Ea arrow under the peak, ΔH arrow on the right
    arrow(pkX, ax.Y(0), pkY + 6, c.ink, true);
    const mid = (ax.Y(0) + pkY) / 2, fe = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' kJ·mol⁻¹';
    const tall = Math.abs(ax.Y(0) - pkY) > 46;
    const boxed = (s, x, y, al, col, wt) => { ctx.font = (wt || 500) + ' 12px "JetBrains Mono", monospace'; const tw = ctx.measureText(s).width; ctx.fillStyle = c.stage; ctx.fillRect(al === 'right' ? x - tw - 3 : x - 3, y - 12, tw + 6, 16); text(ctx, s, x, y, { size: 12, mono: true, weight: wt || 500, align: al, color: col }); };
    if (tall) boxed('Ea = ' + S.ea + ' kJ·mol⁻¹', pkX + 8, mid + 4, 'left', c.ink, 700); else boxed('Ea = ' + S.ea + ' kJ·mol⁻¹', pkX - 10, pkY - 10, 'right', c.ink, 700);
    if (S.cat) {
      const cx = ax.X(0.4), cy = ax.Y(S.eaC);
      ctx.strokeStyle = colCat(); ctx.setLineDash([3, 3]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax.X(0.5), cy); ctx.stroke(); ctx.setLineDash([]);
      arrow(cx, ax.Y(0), cy + 4, colCat(), true);
      const m2 = (ax.Y(0) + cy) / 2;
      void m2;
      text(ctx, L(T.withCat), cx - 8, ax.Y(0) + 18, { size: 12, align: 'right', color: colCat() }); text(ctx, 'Ea = ' + S.eaC + ' kJ·mol⁻¹', cx - 8, ax.Y(0) + 34, { size: 12, mono: true, align: 'right', color: colCat() });
    }
    const hx = ax.X(0.9);
    if (S.dH !== 0) arrow(hx, ax.Y(0), ax.Y(S.dH), S.dH < 0 ? (c.light ? '#1d6fb8' : '#6cb4f0') : (c.light ? '#b0412e' : '#f08a6c'), false);
    const lyH = (ax.Y(0) + ax.Y(S.dH)) / 2;
    text(ctx, 'ΔH = ' + fe(S.dH), hx - 8, Math.abs(S.dH) < 40 ? Math.min(ax.Y(0), ax.Y(S.dH)) - 26 : lyH + 4, { size: 12, weight: 700, mono: true, align: 'right', color: c.ink });
    // level labels
    const e = S.ex === 'own' ? null : EX[S.ex];
    const rl = e ? e.r : L(T.reac), pl = e ? e.p : L(T.prod);
    text(ctx, rl, ax.X(0.02), ax.Y(0) - 8, { size: ph ? 12 : 13, weight: 600, color: c.text });
    text(ctx, pl, ax.X(0.99), ax.Y(S.dH) + (S.dH < -40 ? 18 : -8), { size: ph ? 12 : 13, weight: 600, align: 'right', color: c.text });
    if (e && S.cat) text(ctx, L(e.cat), ax.box.x1 - 4, ax.box.y0 + 14, { size: 12, align: 'right', color: colCat() });
  }
  // flow layout of molecules inside width wmax, centred on cx, starting at y top; returns height used
  function species(list, cx, top, wmax, draw) {
    const b = 22, r = 10, items = [];
    list.forEach(([k, n]) => { for (let i = 0; i < n; i++) items.push(k); });
    const box = (k) => { const a = MOL[k] ? MOL[k][0] : [[k, 0, 0]]; const xs = a.map(p => p[1]), ys = a.map(p => p[2]); return { a, minx: Math.min(...xs), miny: Math.min(...ys), w: (Math.max(...xs) - Math.min(...xs)) * b + 2 * r, h: (Math.max(...ys) - Math.min(...ys)) * b + 2 * r }; };
    const rowsL = []; let row = [], rw = 0;
    items.forEach(k => { const bx = box(k); if (row.length && rw + 10 + bx.w > wmax) { rowsL.push([row, rw]); row = []; rw = 0; } rw += (row.length ? 10 : 0) + bx.w; row.push([k, bx]); });
    if (row.length) rowsL.push([row, rw]);
    let y = top;
    rowsL.forEach(([rw2, wsum]) => {
      const rh = Math.max(...rw2.map(([, bx]) => bx.h)); let x = cx - wsum / 2;
      rw2.forEach(([k, bx]) => {
        if (draw) {
          const ox = x + r - bx.minx * b, oy = y + (rh - bx.h) / 2 + r - bx.miny * b, at = bx.a, bonds = MOL[k] ? MOL[k][1] : [];
          ctx.strokeStyle = c.text2; ctx.lineWidth = 1.6;
          bonds.forEach(([i, j, o]) => {
            const x1 = ox + at[i][1] * b, y1 = oy + at[i][2] * b, x2 = ox + at[j][1] * b, y2 = oy + at[j][2] * b, len = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / len, ny = (x2 - x1) / len;
            const offs = o === 1 ? [0] : o === 2 ? [-2.6, 2.6] : [-3.6, 0, 3.6];
            offs.forEach(s => { ctx.beginPath(); ctx.moveTo(x1 + nx * s, y1 + ny * s); ctx.lineTo(x2 + nx * s, y2 + ny * s); ctx.stroke(); });
          });
          const E = EL();
          at.forEach(([el, ax2, ay]) => {
            const px = ox + ax2 * b, py = oy + ay * b;
            ctx.fillStyle = E[el][0]; ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.stroke();
            text(ctx, el, px, py + 0.5, { size: 12, weight: 700, align: 'center', base: 'middle', color: E[el][1] });
          });
        }
        x += bx.w + 10;
      });
      y += rh + 8;
    });
    return y - top;
  }
  function bonds(x0, y0, w, h) {
    const R = BR[S.br], B = sum(R.brk), F = sum(R.frm), dH = B - F, ph = w < 500;
    text(ctx, R.eq, x0 + w / 2, y0 + 22, { size: ph ? 12 : 14, weight: 700, align: 'center', color: c.ink });
    // molecule strip: reactants | atoms | products
    const colW = (w - 60) / 3, cxs = [x0 + 50 + colW * 0.5, x0 + 50 + colW * 1.5, x0 + 50 + colW * 2.5];
    const atomList = Object.keys(R.A).map(k => [k, R.A[k]]);
    const lists = [R.R, atomList, R.P];
    const hs = lists.map((l, i) => species(l, cxs[i], 0, colW - 12, false));
    const stripH = Math.max(...hs), top = y0 + 52;
    [T.reac, T.atoms, T.prod].forEach((s, i) => text(ctx, s, cxs[i], y0 + 44, { size: 12, align: 'center', color: c.text3 }));
    lists.forEach((l, i) => species(l, cxs[i], top + (stripH - hs[i]) / 2, colW - 12, true));
    // energy ladder below
    const gy = top + stripH + 8, lo = Math.min(0, dH), span = B - lo;
    const ax = MLX.axes(ctx, { x0, y0: gy, w, h: y0 + h - gy, xMin: 0, xMax: 3, yMin: lo - span * 0.12, yMax: B + span * 0.1, xTitle: '', yTitle: T.yB, xTicks: 1, yTicks: 4, fmtX: () => '' });
    const lev = (u0, u1, v, col) => { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ax.X(u0), ax.Y(v)); ctx.lineTo(ax.X(u1), ax.Y(v)); ctx.stroke(); };
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(ax.X(0.9), ax.Y(0)); ctx.lineTo(ax.X(2.98), ax.Y(0)); ctx.moveTo(ax.X(0.9), ax.Y(B)); ctx.lineTo(ax.X(1.1), ax.Y(B)); ctx.moveTo(ax.X(1.9), ax.Y(B)); ctx.lineTo(ax.X(2.1), ax.Y(B)); ctx.stroke(); ctx.setLineDash([]);
    lev(0.15, 0.9, 0, c.text); lev(1.1, 1.9, B, c.text); lev(2.1, 2.75, dH, c.text);
    const colIn = c.light ? '#b0412e' : '#f08a6c', colOut = c.light ? '#1d6fb8' : '#6cb4f0';
    arrow(ax.X(1), ax.Y(0), ax.Y(B), colIn); arrow(ax.X(2), ax.Y(B), ax.Y(dH), colOut);
    const m1 = (ax.Y(0) + ax.Y(B)) / 2, m2 = (ax.Y(B) + ax.Y(dH)) / 2;
    text(ctx, T.broken, ax.X(1) - 8, m1 - 4, { size: 12, align: 'right', color: colIn }); text(ctx, '+' + MLX.big(B) + ' kJ', ax.X(1) - 8, m1 + 12, { size: 12, mono: true, weight: 700, align: 'right', color: colIn });
    text(ctx, T.formed, ax.X(2) + 8, m2 - 4, { size: 12, color: colOut }); text(ctx, '−' + MLX.big(F) + ' kJ', ax.X(2) + 8, m2 + 12, { size: 12, mono: true, weight: 700, color: colOut });
    arrow(ax.X(2.88), ax.Y(0), ax.Y(dH), c.ink);
    const fdh = (dH > 0 ? '+' : '−') + MLX.big(Math.abs(dH));
    text(ctx, 'ΔH = ' + fdh, ax.X(2.84), Math.abs(ax.Y(0) - ax.Y(dH)) < 30 ? Math.min(ax.Y(0), ax.Y(dH)) - 8 : (ax.Y(0) + ax.Y(dH)) / 2 + 4, { size: 12, mono: true, weight: 700, align: 'right', color: c.ink });
    if (!ph) text(ctx, 'ΔH = ' + MLX.big(B) + ' − ' + MLX.big(F) + ' = ' + fdh + ' kJ·mol⁻¹', ax.X(0.1), ax.box.y1 - 8, { size: 12, mono: true, color: c.text2 });
  }
  function calorimeter(W, H) {
    const k = cal(), ph = W < 640, tNow = S.run ? S.t : 0, Tn = S.run ? tempAt(tNow) : T0;
    const aw = ph ? W : Math.round(W * 0.4), ah = ph ? Math.round(H * 0.48) : H;
    // cup
    const cx = aw * (ph ? 0.36 : 0.42), top = ah * 0.3, bot = ah - (ph ? 22 : 40), cw = Math.min(aw * 0.42, (bot - top) * 0.95), bw = cw * 0.72;
    const cup = (pad) => { ctx.beginPath(); ctx.moveTo(cx - cw / 2 - pad, top - pad * 0.3); ctx.lineTo(cx - bw / 2 - pad, bot + pad); ctx.lineTo(cx + bw / 2 + pad, bot + pad); ctx.lineTo(cx + cw / 2 + pad, top - pad * 0.3); };
    ctx.fillStyle = c.light ? '#eceae4' : '#2a2d33'; cup(7); ctx.closePath(); ctx.fill(); ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.4; cup(7); ctx.stroke();
    ctx.fillStyle = c.stage; cup(0); ctx.closePath(); ctx.fill(); ctx.strokeStyle = c.lineHard; cup(0); ctx.stroke();
    // liquid
    const ly = top + (bot - top) * 0.3, f = (ly - top) / (bot - top), lw = cw - (cw - bw) * f;
    ctx.fillStyle = c.water;
    ctx.beginPath(); ctx.moveTo(cx - lw / 2, ly); ctx.lineTo(cx - bw / 2, bot); ctx.lineTo(cx + bw / 2, bot); ctx.lineTo(cx + lw / 2, ly); ctx.closePath(); ctx.fill();
    // lid
    ctx.fillStyle = c.light ? '#d8d5cc' : '#3a3e46'; ctx.fillRect(cx - cw / 2 - 12, top - 12, cw + 24, 9);
    // thermometer
    const tx = cx + cw * 0.12, ttop = ah * (ph ? 0.06 : 0.08), tb = bot - 16, tTmin = 0, tTmax = 40, ty = (v) => tb - 12 - (v - tTmin) / (tTmax - tTmin) * (tb - 12 - ttop - 10);
    ctx.fillStyle = c.light ? '#ffffff' : '#1a1d22'; MLX.roundRect(ctx, tx - 5, ttop, 10, tb - ttop, 5); ctx.fill(); ctx.strokeStyle = c.glass; ctx.lineWidth = 1.2; ctx.stroke();
    const red = c.light ? '#c0392b' : '#ef5350';
    ctx.fillStyle = red; ctx.beginPath(); ctx.arc(tx, tb, 7, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(tx - 2, ty(Tn), 4, tb - ty(Tn));
    for (let v = 0; v <= 40; v += 10) { ctx.strokeStyle = c.glass; ctx.beginPath(); ctx.moveTo(tx + 5, ty(v)); ctx.lineTo(tx + 10, ty(v)); ctx.stroke(); if (ty(v) < top - 16) text(ctx, String(v), tx + 13, ty(v) + 4, { size: 12, mono: true, color: c.text3 }); }
    // stirrer
    const sx = cx - cw * 0.18;
    ctx.strokeStyle = c.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, ttop + 30); ctx.lineTo(sx, bot - 14); ctx.stroke(); ctx.beginPath(); ctx.ellipse(sx, bot - 12, bw * 0.22, 3, 0, 0, Math.PI * 2); ctx.stroke();
    // labels
    ctx.strokeStyle = c.text3; ctx.lineWidth = 1;
    const lab = (s, x1, y1, x2, al) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y1); ctx.stroke(); text(ctx, s, x2 + (al === 'right' ? -4 : 4), y1 + 4, { size: 12, align: al, color: c.text2 }); };
    const lx = cx - cw / 2 - 18, rx = cx + cw / 2 + 18;
    lab(T.stir, sx - 2, top + (ly - top) * 0.55, Math.max(6 + 50, lx), 'right');
    lab(T.lid, cx - cw / 2 - 12, top - 8, Math.max(56, lx), 'right');
    lab(T.cups, cx + (cw - (cw - bw) * 0.88) / 2 + 7, bot - (bot - top) * 0.12, Math.min(aw - 8, rx + 6), 'left');
    lab(T.therm, tx + 5, ttop + 26, Math.min(aw - 8, rx + 6), 'left');
    lab(T.sol, cx + (lw + bw) / 4 - 14, (ly + bot) / 2 + 6, Math.min(aw - 8, rx + 6), 'left');
    text(ctx, num(Tn, 1) + ' °C', tx, ttop - 6 < 14 ? 14 : ttop - 6, { size: 13, weight: 700, mono: true, align: 'center', color: c.ink });
    // graph
    const gx = ph ? 0 : aw + 6, gy = ph ? ah : 0, gw = ph ? W : W - aw - 6, gh = ph ? H - ah : H;
    if (!ph) { ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); }
    text(ctx, k.r.eq, gx + gw / 2 + 20, gy + 18, { size: 12, weight: 600, align: 'center', color: c.ink });
    const ax = MLX.axes(ctx, { x0: gx, y0: gy + 24, w: gw, h: gh - 24, xMin: 0, xMax: TEND, yMin: 0, yMax: 40, xTitle: T.xC, yTitle: T.yC, xTicks: 6, yTicks: 4 });
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([3, 4]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ax.X(TMIX), ax.box.y0); ctx.lineTo(ax.X(TMIX), ax.box.y1); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, T.mixAt, ax.X(TMIX) + 4, ax.box.y0 + 13, { size: 12, color: c.text3 });
    if (S.run) {
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let t = 0; t <= tNow + 1e-6; t += 0.5) { const X = ax.X(t), Y = ax.Y(tempAt(t)); t ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
      ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(tNow), ax.Y(Tn), 4.5, 0, Math.PI * 2); ctx.fill();
    }
    if (S.run === 2) {
      const sQ = 'Q = ' + k.r.m + ' × 4,18 × ' + num(Math.abs(k.dT), 1) + ' = ' + MLX.big(k.Q) + ' J';
      const sH = 'ΔH = −Q/n = ' + (k.dH > 0 ? '+' : '−') + num(Math.abs(k.dH), 1) + ' kJ·mol⁻¹';
      const yb = k.dT > 0 ? ax.box.y1 - 30 : ax.box.y0 + 34;
      text(ctx, MLX.af ? sQ : sQ.replace('4,18', '4.18'), ax.box.x1 - 6, yb, { size: 12, mono: true, align: 'right', color: c.text2 });
      text(ctx, sH, ax.box.x1 - 6, yb + 17, { size: 12, mono: true, weight: 700, align: 'right', color: c.ink });
    }
  }

  let lastCap = '';
  function cap(s) { const v = L(s); if (v !== lastCap) { lastCap = v; ui.setCaption(v); } }
  const sg = (v, d) => (v > 0 ? '+' : v < 0 ? '−' : '') + num(Math.abs(v), d || 0);
  function update() {
    const lbl = prim.el.querySelector('.mlx-card-title');
    if (S.view === 'prof') {
      lbl.textContent = L(T.dH);
      prim.set(sg(S.dH));
      roP.set('t', L(S.dH < 0 ? T.exo : S.dH > 0 ? T.endo : { en: 'neither', af: 'geen van beide' }));
      roP.set('s', S.dH === 0 ? '—' : L(S.dH < 0 ? T.warm : T.cool));
      roP.set('f', S.ea + ' kJ·mol⁻¹'); roP.set('r', (S.ea - S.dH) + ' kJ·mol⁻¹');
      roP.set('c', S.cat ? S.eaC + ' kJ·mol⁻¹' : '—');
      cap(S.cat ? T.capCat : S.dH <= 0 ? T.capExo : T.capEndo);
      ui.cv.el.setAttribute('aria-label', L(T.ariaP) + '. ΔH = ' + sg(S.dH) + ' kJ·mol⁻¹, Ea = ' + S.ea + (S.cat ? ', Ea (catalyst) = ' + S.eaC : '') + ' kJ·mol⁻¹.');
    } else if (S.view === 'bond') {
      const R = BR[S.br], B = sum(R.brk), F = sum(R.frm), dH = B - F;
      lbl.textContent = L(T.dH) + ' (' + L({ en: 'from bond energies', af: 'uit bindingsenergieë' }) + ')';
      prim.set(sg(dH));
      roB.set('b', '+' + MLX.big(B) + ' kJ'); roB.set('f', '−' + MLX.big(F) + ' kJ'); roB.set('m', L(R.meas) + (S.br === 'ch4' ? '' : ' kJ·mol⁻¹'));
      const used = {}; R.brk.concat(R.frm).forEach(([b]) => { used[b] = BE[b]; });
      bNote.textContent = L(T.used) + ': ' + Object.keys(used).map(b => b + ' ' + used[b]).join(' · ');
      cap(dH < 0 ? T.capBexo : T.capBendo);
      ui.cv.el.setAttribute('aria-label', L(T.ariaB) + '. ' + R.eq + ': +' + B + ' kJ, −' + F + ' kJ, ΔH = ' + sg(dH) + ' kJ·mol⁻¹.');
    } else {
      const k = cal(), done = S.run === 2, Tn = S.run ? tempAt(S.t) : T0;
      lbl.textContent = L(T.dH);
      prim.set(done ? sg(k.dH, 1) : '—');
      roC.set('d', S.run ? sg(Math.round((Tn - T0) * 10) / 10, 1) + ' °C' : '—');
      roC.set('q', done ? MLX.big(k.Q) + ' J' : '—'); roC.set('n', done ? num(k.n, 4) + ' mol' : '—');
      runB.disabled = S.run !== 0;
      cap(!S.run ? T.capC0 : k.dT > 0 ? T.capCexo : T.capCendo);
      ui.cv.el.setAttribute('aria-label', L(T.ariaC) + '. ' + num(Tn, 1) + ' °C' + (done ? ', ΔH = ' + sg(k.dH, 1) + ' kJ·mol⁻¹.' : '.'));
    }
    ui.cv.draw();
  }
  update();
});
