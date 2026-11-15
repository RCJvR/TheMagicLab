/* Gr10 Reactions in aqueous solution — two views.
 * 1. Dissolve and conduct: NaCl, CuSO₄ and HCl give free ions in water (electrolytes); sugar dissolves as neutral
 *    molecules (non-electrolyte). Dry (solid crystal, or HCl gas) nothing conducts: no free ions. Water molecules
 *    hydrate the ions: the O end (δ−) faces a cation, the H ends (δ+) face an anion. In the circuit, cations
 *    drift to the negative electrode and anions to the positive electrode.
 *    Conductivity κ = c·Λ, with the molar conductivity falling as c rises: Λ = Λ₀ / (1 + a√c)
 *    (Λ₀ in S·cm²·mol⁻¹: NaCl 126.4, a 0.6; HCl 426, a 0.28; CuSO₄ 267, a 6.65 → κ(0.1 mol·dm⁻³) ≈ 10.6, 39, 8.6 mS·cm⁻¹,
 *    close to measured values). Sugar: κ ≈ 0.
 * 2. Mix two solutions: the ions swap partners; a precipitate forms if a product is insoluble by the lesson's
 *    solubility rules (Group 1, NH₄⁺ and nitrates soluble; chlorides except AgCl, PbCl₂; sulfates except BaSO₄,
 *    PbSO₄ (Ag₂SO₄ only slightly soluble: no precipitate at lab concentrations); hydroxides insoluble except Group 1
 *    and Ba(OH)₂). Real colours: AgCl white, AgI pale yellow, PbI₂ bright yellow, PbCl₂/PbSO₄/BaSO₄/Pb(OH)₂ white,
 *    Cu(OH)₂ pale blue, Fe(OH)₃ rust-brown; Ag⁺ + OH⁻ gives brown Ag₂O. Cu²⁺ and Fe³⁺ oxidise I⁻ to iodine
 *    (brown solution): a redox reaction, not a simple precipitation; shown honestly as such.
 *    Molecular, full ionic (spectators struck through) and net ionic equations are balanced from the ion charges.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text, h } = MLX;
  const sub = (n) => n > 1 ? String(n).replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d]) : '';
  const co = (n) => n > 1 ? n : '';
  // ions: symbol, charge label, charge, polyatomic, colour (dark / light theme fills are pastel; text is dark)
  const ION = {
    Ag: { s: 'Ag', q: '⁺', z: 1, f: ['#cfd5dd', '#dfe3e8'] }, Ba: { s: 'Ba', q: '²⁺', z: 2, f: ['#9fe0a8', '#c5ecc9'] },
    Pb: { s: 'Pb', q: '²⁺', z: 2, f: ['#c7b8f5', '#ddd3fa'] }, Cu: { s: 'Cu', q: '²⁺', z: 2, f: ['#6f9fe8', '#a9c6f4'] },
    Fe: { s: 'Fe', q: '³⁺', z: 3, f: ['#f0b77f', '#f6d3b0'] }, Na: { s: 'Na', q: '⁺', z: 1, f: ['#f5c26b', '#f8dca4'] },
    K: { s: 'K', q: '⁺', z: 1, f: ['#f3a3b5', '#f8c9d4'] }, H: { s: 'H', q: '⁺', z: 1, f: ['#f2f2f2', '#ffffff'] },
    NO3: { s: 'NO₃', q: '⁻', z: 1, poly: true, f: ['#9ad3f5', '#c3e5f9'] }, Cl: { s: 'Cl', q: '⁻', z: 1, f: ['#c9e58a', '#ddefb6'] },
    SO4: { s: 'SO₄', q: '²⁻', z: 2, poly: true, f: ['#8be0b8', '#c4f0db'] }, I: { s: 'I', q: '⁻', z: 1, f: ['#d9a8f0', '#e9cbf6'] },
    OH: { s: 'OH', q: '⁻', z: 1, poly: true, f: ['#f0a08f', '#f6c6bb'] },
  };
  const ionTxt = (k, n) => co(n) + ION[k].s + ION[k].q + '(aq)';
  const formula = (cat, an) => {
    const g = gcd(ION[cat].z, ION[an].z), nc = ION[an].z / g, na = ION[cat].z / g;
    return { nc, na, s: ION[cat].s + sub(nc) + (ION[an].poly && na > 1 ? '(' + ION[an].s + ')' + sub(na) : ION[an].s + sub(na)) };
  };
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  const SALT_A = [['AgNO3', 'Ag', 'NO3'], ['BaCl2', 'Ba', 'Cl'], ['PbNO32', 'Pb', 'NO3'], ['CuSO4', 'Cu', 'SO4'], ['FeCl3', 'Fe', 'Cl']];
  const SALT_B = [['NaCl', 'Na', 'Cl'], ['KI', 'K', 'I'], ['Na2SO4', 'Na', 'SO4'], ['NaOH', 'Na', 'OH']];
  const NAME = {
    AgNO3: { en: 'silver nitrate', af: 'silwernitraat' }, BaCl2: { en: 'barium chloride', af: 'bariumchloried' }, PbNO32: { en: 'lead(II) nitrate', af: 'lood(II)nitraat' },
    CuSO4: { en: 'copper(II) sulfate', af: 'koper(II)sulfaat' }, FeCl3: { en: 'iron(III) chloride', af: 'yster(III)chloried' }, NaCl: { en: 'sodium chloride', af: 'natriumchloried' },
    KI: { en: 'potassium iodide', af: 'kaliumjodied' }, Na2SO4: { en: 'sodium sulfate', af: 'natriumsulfaat' }, NaOH: { en: 'sodium hydroxide', af: 'natriumhidroksied' },
  };
  // insoluble products by the lesson's rules, with their real colours
  const PPT = {
    AgCl: ['#f4f4f2', { en: 'white', af: 'wit' }], AgI: ['#efe08a', { en: 'pale yellow', af: 'liggeel' }], PbCl2: ['#f4f4f2', { en: 'white', af: 'wit' }],
    PbI2: ['#f2cc1d', { en: 'bright yellow', af: 'helder geel' }], PbSO4: ['#f4f4f2', { en: 'white', af: 'wit' }], BaSO4: ['#f4f4f2', { en: 'white', af: 'wit' }],
    PbOH2: ['#f4f4f2', { en: 'white', af: 'wit' }], CuOH2: ['#79b4e3', { en: 'pale blue', af: 'ligblou' }], FeOH3: ['#9a4a1c', { en: 'rust-brown', af: 'roesbruin' }],
  };
  const RULE = {
    Cl: { en: 'chlorides are soluble except AgCl and PbCl₂', af: 'chloriede is oplosbaar behalwe AgCl en PbCl₂' },
    I: { en: 'like chlorides: AgI and PbI₂ are insoluble', af: 'soos chloriede: AgI en PbI₂ is onoplosbaar' },
    SO4: { en: 'sulfates are soluble except BaSO₄ and PbSO₄', af: 'sulfate is oplosbaar behalwe BaSO₄ en PbSO₄' },
    OH: { en: 'hydroxides are insoluble except Group 1 and Ba(OH)₂', af: 'hidroksiede is onoplosbaar behalwe groep 1 en Ba(OH)₂' },
    NO3: { en: 'all nitrates are soluble', af: 'alle nitrate is oplosbaar' }, G1: { en: 'Group 1 compounds are soluble', af: 'groep 1-verbindings is oplosbaar' },
    AgSO4: { en: 'Ag₂SO₄ is only slightly soluble: no precipitate in dilute solutions', af: 'Ag₂SO₄ is net effens oplosbaar: geen neerslag in verdunde oplossings nie' },
  };
  const T = {
    aria: { en: 'A beaker with two electrodes in a circuit with a cell and a bulb, and a close-up of the particles', af: '\'n Beker met twee elektrodes in \'n stroombaan met \'n sel en \'n gloeilamp, en \'n nabyskoot van die deeltjies' },
    ariaM: { en: 'A beaker in which two solutions are mixed, showing the ions and any precipitate', af: '\'n Beker waarin twee oplossings gemeng word, met die ione en enige neerslag' },
    view: { en: 'View', af: 'Aansig' }, vDis: { en: 'Dissolve and conduct', af: 'Oplos en gelei' }, vMix: { en: 'Mix two solutions', af: 'Meng twee oplossings' },
    kappa: { en: 'Conductivity', af: 'Geleidingsvermoë' }, kU: { en: 'mS per cm', af: 'mS per cm' },
    parts: { en: 'Particles', af: 'Deeltjies' }, elec: { en: 'Electrolyte', af: 'Elektroliet' }, bulb: { en: 'Bulb', af: 'Gloeilamp' },
    ions: { en: 'free ions', af: 'vry ione' }, mols: { en: 'neutral molecules', af: 'neutrale molekules' }, lat: { en: 'ions fixed in a lattice', af: 'ione vas in \'n rooster' },
    yes: { en: 'yes', af: 'ja' }, no: { en: 'no', af: 'nee' }, bright: { en: 'bright', af: 'helder' }, dim: { en: 'dim', af: 'dof' }, off: { en: 'off', af: 'af' },
    subst: { en: 'Substance', af: 'Stof' }, sugar: { en: 'Sugar', af: 'Suiker' }, water: { en: 'Add water (dissolve it)', af: 'Voeg water by (los dit op)' },
    conc: { en: 'Concentration', af: 'Konsentrasie' }, cU: { en: 'mol/dm³', af: 'mol/dm³' }, setup: { en: 'Set-up', af: 'Opstelling' },
    neg: { en: 'negative electrode (−)', af: 'negatiewe elektrode (−)' }, pos: { en: 'positive electrode (+)', af: 'positiewe elektrode (+)' },
    cell: { en: 'cell', af: 'sel' }, lamp: { en: 'bulb', af: 'gloeilamp' }, zoom: { en: 'close-up', af: 'nabyskoot' },
    oCat: { en: 'O end (δ−) faces the cation', af: 'O-kant (δ−) wys na die katioon' }, hAn: { en: 'H ends (δ+) face the anion', af: 'H-kante (δ+) wys na die anioon' },
    mol: { en: 'sugar molecule: no charge', af: 'suikermolekuul: geen lading' }, latL: { en: 'ions locked in place', af: 'ione vasgesluit' },
    gas: { en: 'HCl molecules (covalent)', af: 'HCl-molekules (kovalent)' }, dry: { en: 'dry: no water', af: 'droog: geen water' },
    // mix view
    solA: { en: 'Solution A', af: 'Oplossing A' }, solB: { en: 'Solution B', af: 'Oplossing B' }, mix: { en: 'Mix again', af: 'Meng weer' },
    ppt: { en: 'Precipitate', af: 'Neerslag' }, none: { en: 'none', af: 'geen' }, prods: { en: 'Possible products', af: 'Moontlike produkte' },
    eqs: { en: 'Equations', af: 'Vergelykings' }, eM: { en: 'Molecular', af: 'Molekulêr' }, eF: { en: 'Full ionic', af: 'Volledig ionies' }, eN: { en: 'Net ionic', af: 'Netto ionies' },
    noNet: { en: 'No reaction: every ion is a spectator, so there is no net ionic equation.', af: 'Geen reaksie nie: elke ioon is \'n toeskouer, dus is daar geen netto ioniese vergelyking nie.' },
    insol: { en: 'insoluble', af: 'onoplosbaar' }, sol: { en: 'soluble', af: 'oplosbaar' },
    spect: { en: 'spectator', af: 'toeskouer' }, react: { en: 'react', af: 'reageer' }, inBk: { en: 'Ions in the beaker', af: 'Ione in die beker' },
    redox: { en: 'redox (Gr 12)', af: 'redoks (gr. 12)' },
    // captions
    cSolid: { en: 'Solid {f}: the ions are locked in the crystal lattice and cannot move, so no current flows.', af: 'Vaste {f}: die ione is in die kristalrooster vasgesluit en kan nie beweeg nie, dus vloei geen stroom nie.' },
    cGas: { en: 'Dry HCl gas is made of covalent molecules: there are no ions, so no current flows.', af: 'Droë HCl-gas bestaan uit kovalente molekules: daar is geen ione nie, dus vloei geen stroom nie.' },
    cIon: { en: 'Dissolved, {f} gives free hydrated ions: cations drift to the negative electrode, anions to the positive one, so the bulb lights.', af: 'Opgelos gee {f} vry gehidreerde ione: katione beweeg na die negatiewe elektrode, anione na die positiewe een, dus brand die gloeilamp.' },
    cSug: { en: 'Sugar dissolves as whole neutral molecules: no ions form, so the solution does not conduct (a non-electrolyte).', af: 'Suiker los op as hele neutrale molekules: geen ione vorm nie, dus gelei die oplossing nie (\'n nie-elektroliet).' },
    cSugS: { en: 'Solid sugar is made of neutral molecules: there are no ions to carry a current.', af: 'Vaste suiker bestaan uit neutrale molekules: daar is geen ione om \'n stroom te dra nie.' },
    cPpt: { en: '{a} and {b} ions combine into insoluble {p}, a {c} precipitate; the other ions stay dissolved as spectators.', af: '{a}- en {b}-ione verbind tot onoplosbare {p}, \'n {c} neerslag; die ander ione bly opgelos as toeskouers.' },
    cNone: { en: 'Both possible products are soluble, so no precipitate forms: all the ions simply stay mixed in solution.', af: 'Albei moontlike produkte is oplosbaar, dus vorm geen neerslag nie: al die ione bly net gemeng in oplossing.' },
    cAg2O: { en: 'Silver hydroxide is insoluble, but it at once turns into brown silver oxide, Ag₂O: a brown precipitate forms.', af: 'Silwerhidroksied is onoplosbaar, maar verander dadelik in bruin silweroksied, Ag₂O: \'n bruin neerslag vorm.' },
    cCuI: { en: 'Not a simple swap: Cu²⁺ oxidises I⁻ to brown iodine and off-white CuI precipitates (a redox reaction, Grade 12).', af: 'Nie net \'n omruiling nie: Cu²⁺ oksideer I⁻ na bruin jodium en naaswit CuI slaan neer (\'n redoksreaksie, graad 12).' },
    cFeI: { en: 'No precipitate, but the solution turns brown: Fe³⁺ oxidises I⁻ to iodine (a redox reaction, Grade 12).', af: 'Geen neerslag nie, maar die oplossing word bruin: Fe³⁺ oksideer I⁻ na jodium (\'n redoksreaksie, graad 12).' },
  };
  // ---------- dissolve view data ----------
  const DIS = {
    NaCl: { cat: 'Na', an: 'Cl', L0: 126.4, a: 0.6, eq: 'NaCl(s) → Na⁺(aq) + Cl⁻(aq)', f: 'NaCl' },
    CuSO4: { cat: 'Cu', an: 'SO4', L0: 267, a: 6.65, eq: 'CuSO₄(s) → Cu²⁺(aq) + SO₄²⁻(aq)', f: 'CuSO₄' },
    HCl: { cat: 'H', an: 'Cl', L0: 426, a: 0.28, eq: 'HCl(g) → H⁺(aq) + Cl⁻(aq)', eqDry: 'HCl(g)', f: 'HCl' },
    sugar: { mol: true, eq: 'C₁₂H₂₂O₁₁(s) → C₁₂H₂₂O₁₁(aq)', eqDry: 'C₁₂H₂₂O₁₁(s)', f: { en: 'sugar', af: 'suiker' } },
  };
  const S = { mode: 'dis', sub: 'NaCl', wet: true, c: 0.1, A: 'AgNO3', B: 'NaCl', t: 0, tm: 0 };
  const kappa = () => { const d = DIS[S.sub]; if (!S.wet || d.mol) return 0; return S.c * d.L0 / (1 + d.a * Math.sqrt(S.c)); };

  // ---------- mix view: build the reaction ----------
  function reaction() {
    const [kA, a, x] = SALT_A.find(r => r[0] === S.A), [kB, b, y] = SALT_B.find(r => r[0] === S.B);
    const fA = formula(a, x), fB = formula(b, y), P1 = formula(a, y), P2 = formula(b, x);
    const R = { kA, kB, a, x, b, y, fA, fB, P1, P2, same: x === y };
    const rules = [];
    let ins = null, special = null;
    if (a === 'Ag' && y === 'OH') special = 'Ag2O';
    else if ((a === 'Cu' || a === 'Fe') && y === 'I') special = a + 'I';
    else if (!R.same) {
      const k = (a + y === 'AgSO4') ? null : ({ AgCl: 'AgCl', AgI: 'AgI', PbCl: 'PbCl2', PbI: 'PbI2', PbSO4: 'PbSO4', BaSO4: 'BaSO4', PbOH: 'PbOH2', CuOH: 'CuOH2', FeOH: 'FeOH3' })[a + y];
      if (k) ins = k;
    }
    R.ins = ins; R.special = special;
    // product rules for the readout
    R.p1Rule = a + y === 'AgSO4' ? RULE.AgSO4 : (a + y === 'BaOH' ? RULE.OH : (RULE[y] || RULE.G1));
    R.p2Rule = x === 'NO3' ? RULE.NO3 : RULE.G1;
    // balanced molecular equation by small-integer search (polyatomic ions kept as units)
    let best = null;
    for (let cA = 1; cA <= 6 && !best; cA++) for (let cB = 1; cB <= 6 && !best; cB++) for (let c1 = 1; c1 <= 6 && !best; c1++) for (let c2 = 1; c2 <= 6 && !best; c2++) {
      if (cA * fA.nc === c1 * P1.nc && cA * fA.na === c2 * P2.na && cB * fB.nc === c2 * P2.nc && cB * fB.na === c1 * P1.na) best = [cA, cB, c1, c2];
    }
    R.co = best;
    return R;
  }
  const strike = (s) => '<span class="aq-spect">' + s + '</span>';
  function equations(R) {
    const [cA, cB, c1, c2] = R.co;
    const sA = (R.kA === 'PbNO32' ? 'Pb(NO₃)₂' : R.fA.s), sB = R.fB.s;
    const st = (ins) => ins ? '(s)' : '(aq)';
    if (R.special === 'Ag2O') return {
      m: '2AgNO₃(aq) + 2NaOH(aq) → Ag₂O(s) + H₂O(l) + 2NaNO₃(aq)',
      f: '2Ag⁺(aq) + ' + strike('2NO₃⁻(aq)') + ' + ' + strike('2Na⁺(aq)') + ' + 2OH⁻(aq) → Ag₂O(s) + H₂O(l) + ' + strike('2Na⁺(aq)') + ' + ' + strike('2NO₃⁻(aq)'),
      n: '2Ag⁺(aq) + 2OH⁻(aq) → Ag₂O(s) + H₂O(l)' };
    if (R.special === 'CuI') return {
      m: '2CuSO₄(aq) + 4KI(aq) → 2CuI(s) + I₂(aq) + 2K₂SO₄(aq)',
      f: '2Cu²⁺(aq) + ' + strike('2SO₄²⁻(aq)') + ' + ' + strike('4K⁺(aq)') + ' + 4I⁻(aq) → 2CuI(s) + I₂(aq) + ' + strike('4K⁺(aq)') + ' + ' + strike('2SO₄²⁻(aq)'),
      n: '2Cu²⁺(aq) + 4I⁻(aq) → 2CuI(s) + I₂(aq)' };
    if (R.special === 'FeI') return {
      m: '2FeCl₃(aq) + 2KI(aq) → 2FeCl₂(aq) + I₂(aq) + 2KCl(aq)',
      f: '2Fe³⁺(aq) + ' + strike('6Cl⁻(aq)') + ' + ' + strike('2K⁺(aq)') + ' + 2I⁻(aq) → 2Fe²⁺(aq) + I₂(aq) + ' + strike('6Cl⁻(aq)') + ' + ' + strike('2K⁺(aq)'),
      n: '2Fe³⁺(aq) + 2I⁻(aq) → 2Fe²⁺(aq) + I₂(aq)' };
    const p1 = R.P1.s, p2 = R.P2.s;
    const m = co(cA) + sA + '(aq) + ' + co(cB) + sB + '(aq) → ' + co(c1) + p1 + st(R.ins) + ' + ' + co(c2) + p2 + '(aq)';
    if (!R.ins) {
      // no reaction: list the ions of the mixture (one formula unit of each), merging the same ion
      const cnt = {}; [[R.a, R.fA.nc], [R.x, R.fA.na], [R.b, R.fB.nc], [R.y, R.fB.na]].forEach(([k, n]) => { cnt[k] = (cnt[k] || 0) + n; });
      const side = Object.keys(cnt).map(k => strike(ionTxt(k, cnt[k]))).join(' + ');
      return { m: sA + '(aq) + ' + sB + '(aq) → ' + L({ en: 'no reaction', af: 'geen reaksie nie' }), f: side + ' → ' + side, n: null };
    }
    const f = ionTxt(R.a, cA * R.fA.nc) + ' + ' + strike(ionTxt(R.x, cA * R.fA.na)) + ' + ' + strike(ionTxt(R.b, cB * R.fB.nc)) + ' + ' + ionTxt(R.y, cB * R.fB.na) +
      ' → ' + co(c1) + p1 + '(s) + ' + strike(ionTxt(R.b, c2 * R.P2.nc)) + ' + ' + strike(ionTxt(R.x, c2 * R.P2.na));
    const n = ionTxt(R.a, R.P1.nc) + ' + ' + ionTxt(R.y, R.P1.na) + ' → ' + p1 + '(s)';
    return { m, f, n };
  }
  // particles for the beaker: reacting groups ("units") and spectators
  let parts = [], R = null;
  function build() {
    R = reaction();
    const [cA, cB] = R.co;
    const perA = { [R.a]: cA * R.fA.nc, [R.x]: cA * R.fA.na }, perB = { [R.b]: cB * R.fB.nc, [R.y]: cB * R.fB.na };
    const nIons = Object.values(perA).reduce((p, q) => p + q, 0) + Object.values(perB).reduce((p, q) => p + q, 0);
    let U = Math.max(1, Math.min(4, Math.round(16 / nIons)));
    if (R.special === 'CuI' || R.special === 'FeI') U = U >= 3 ? 4 : 2;
    parts = []; let seed = 1;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const add = (k, fromB, role, unit) => parts.push({ k, fromB, role, unit, hx: 0.08 + 0.84 * rnd(), hy: 0.12 + 0.62 * rnd(), ph: rnd() * 6.28, sp: 0.6 + rnd() * 0.6 });
    for (let u = 0; u < U; u++) {
      // reacting ions in this unit
      const react = {};
      if (R.ins || R.special === 'Ag2O') { react[R.a] = 1; react[R.y] = 1; }
      Object.entries(perA).forEach(([k, n]) => { for (let i = 0; i < n; i++) add(k, false, react[k] ? 'r' : 's', u); });
      Object.entries(perB).forEach(([k, n]) => { for (let i = 0; i < n; i++) add(k, true, react[k] ? 'r' : 's', u); });
    }
    // CuI (2Cu²⁺ + 4I⁻ → 2CuI + I₂): per Cu²⁺ one I⁻ joins the CuI precipitate and one forms iodine with another unit's.
    // FeI (2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂): each Fe³⁺ becomes Fe²⁺ and one I⁻ per unit forms iodine; any other I⁻ is excess.
    if (R.special === 'CuI' || R.special === 'FeI') {
      const spare = [];
      for (let u = 0; u < U; u++) {
        const Is = parts.filter(p => p.unit === u && p.k === 'I'), M = parts.filter(p => p.unit === u && p.k === R.a);
        if (R.special === 'CuI') { M.forEach(p => { p.role = 'r'; }); Is[0].role = 'r'; spare.push(Is[1]); }
        else { M.forEach(p => { p.role = 'fe'; }); spare.push(Is[0]); }
      }
      for (let i = 0; i + 1 < spare.length; i += 2) { spare[i].role = 'i2'; spare[i + 1].role = 'i2b'; spare[i + 1].mate = spare[i]; }
    }
    // meeting points and bottom slots for each unit
    R.units = [];
    for (let u = 0; u < U; u++) R.units.push({ mx: 0.2 + 0.6 * (u + 0.5) / U + (rnd() - 0.5) * 0.08, my: 0.35 + rnd() * 0.25, bx: (u + 0.5) / U });
    S.tm = MLX.reducedMotion ? 99 : 0;
  }

  // ---------- UI ----------
  const ui = MLX.layout(root, { height: (w) => w < 640 ? (S.mode === 'dis' ? 570 : 520) : Math.max(380, Math.min(460, Math.round(w * 0.52))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const st = h('style', { text: '.aq-eq{font-size:13.5px;line-height:1.65;margin:0 0 8px;color:var(--text,#e3e8ef);overflow-wrap:anywhere}.aq-eq b{display:block;font-size:12px;font-weight:700;opacity:.62;margin-bottom:1px}.aq-spect{text-decoration:line-through;opacity:.55}' });
  root.appendChild(st);
  const c0 = MLX.card(ui.side);
  MLX.seg(c0, { label: T.view, options: [['dis', T.vDis], ['mix', T.vMix]], value: S.mode, onChange: (v) => { S.mode = v; if (v === 'mix') build(); update(); } });
  // dissolve controls
  const pK = MLX.primary(ui.side, { label: T.kappa, unit: T.kU });
  const roK = MLX.readout(pK.el, [['p', T.parts], ['e', T.elec], ['b', T.bulb]]);
  const cK = MLX.card(ui.side, T.setup);
  MLX.seg(cK, { label: T.subst, options: [['NaCl', 'NaCl'], ['CuSO4', 'CuSO₄'], ['HCl', 'HCl'], ['sugar', T.sugar]], value: S.sub, onChange: (v) => { S.sub = v; update(); } });
  MLX.check(cK, { label: T.water, value: S.wet, onChange: (v) => { S.wet = v; update(); } });
  const sC = MLX.slider(cK, { label: T.conc, min: 0.02, max: 0.5, step: 0.02, value: S.c, fmt: (v) => num(v, 2) + ' mol/dm³', onInput: (v) => { S.c = v; update(); } });
  // mix controls
  const pM = MLX.primary(ui.side, { label: T.ppt, unit: '' });
  const roM = MLX.readout(pM.el, [['p1', ''], ['p2', '']]);
  const ruleNote = h('p', { class: 'mlx-note', style: 'margin-top:8px' }); pM.el.appendChild(ruleNote);
  void roM;
  const cM = MLX.card(ui.side);
  const segA = MLX.seg(cM, { label: T.solA, options: SALT_A.map(r => [r[0], r[0] === 'PbNO32' ? 'Pb(NO₃)₂' : formula(r[1], r[2]).s]), value: S.A, onChange: (v) => { S.A = v; build(); update(); } });
  const segB = MLX.seg(cM, { label: T.solB, options: SALT_B.map(r => [r[0], formula(r[1], r[2]).s]), value: S.B, onChange: (v) => { S.B = v; build(); update(); } });
  void segA; void segB;
  const bt = h('div', { class: 'mlx-btns' }); cM.appendChild(bt);
  MLX.button(bt, T.mix, () => { build(); update(); }, 'primary');
  const cE = MLX.card(ui.side, T.eqs);
  const eqM = h('div', { class: 'aq-eq' }), eqF = h('div', { class: 'aq-eq' }), eqN = h('div', { class: 'aq-eq' });
  [eqM, eqF, eqN].forEach(e => cE.appendChild(e));

  MLX.loop(ui.cv.el, (dt) => { if (!MLX.reducedMotion) { S.t += dt; S.tm += dt; ui.cv.draw(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  // ---------- drawing ----------
  let c, ctx;
  const ink = '#14161a';
  function ion(k, x, y, r, label) {
    const d = ION[k];
    ctx.fillStyle = d.f[c.light ? 1 : 0]; ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.45)' : 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    if (label !== false) text(ctx, label || (d.s + d.q), x, y + 4, { size: 12, weight: 700, align: 'center', color: ink });
  }
  // a water molecule: O (red) and two H (white) at 104.5°, with the H–H bisector pointing along angle `dir`
  function waterMol(x, y, dir, s) {
    const half = 104.5 / 2 * Math.PI / 180, d = 7.5 * s;
    ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.5)' : 'rgba(0,0,0,0.55)'; ctx.lineWidth = 1;
    [-half, half].forEach(a => { const hx = x + Math.cos(dir + a) * d, hy = y + Math.sin(dir + a) * d; ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.arc(hx, hy, 3.6 * s, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
    ctx.fillStyle = '#e0533f'; ctx.beginPath(); ctx.arc(x, y, 5.6 * s, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.mode === 'dis') drawDis(W, H); else drawMix(W, H);
  }
  function beaker(x0, y0, w, hh, fill, level) {
    const wy = y0 + hh * (1 - level);
    if (level > 0) { ctx.fillStyle = fill; ctx.fillRect(x0 + 2, wy, w - 4, y0 + hh - wy - 2); ctx.strokeStyle = c.light ? 'rgba(47,127,191,0.6)' : 'rgba(105,180,240,0.55)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 + 2, wy); ctx.lineTo(x0 + w - 2, wy); ctx.stroke(); }
    ctx.strokeStyle = c.glass; ctx.lineWidth = 2; ctx.beginPath();
    ctx.moveTo(x0 - 6, y0); ctx.lineTo(x0, y0 + 4); ctx.lineTo(x0, y0 + hh); ctx.lineTo(x0 + w, y0 + hh); ctx.lineTo(x0 + w, y0 + 4); ctx.lineTo(x0 + w + 6, y0); ctx.stroke();
    return wy;
  }
  const waterFill = () => c.light ? 'rgba(53,166,240,0.12)' : 'rgba(53,166,240,0.13)';

  function drawDis(W, H) {
    const ph = W < 640, d = DIS[S.sub];
    const aw = ph ? W : Math.round(W * 0.58);
    const top = 34, bx0 = aw * 0.14, bw = aw * 0.72, by0 = ph ? 118 : Math.max(120, H * 0.30), bh = (ph ? H * 0.50 : H - 54) - by0;
    // circuit: left electrode → cell (− plate on the left) → bulb → right electrode
    const eL = bx0 + bw * 0.16, eR = bx0 + bw * 0.84, k = kappa(), br = Math.min(1, k / 20);
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(eL, by0 + 10); ctx.lineTo(eL, top); ctx.lineTo(eR, top); ctx.lineTo(eR, by0 + 10); ctx.stroke();
    // cell symbol
    const cx1 = bx0 + bw * 0.34;
    ctx.fillStyle = c.stage; ctx.fillRect(cx1 - 8, top - 14, 16, 28);
    ctx.strokeStyle = c.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx1 - 4, top - 7); ctx.lineTo(cx1 - 4, top + 7); ctx.stroke();
    ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(cx1 + 4, top - 13); ctx.lineTo(cx1 + 4, top + 13); ctx.stroke();
    text(ctx, T.cell, cx1, top + 28, { size: 12, align: 'center', color: c.text2 });
    text(ctx, '−', cx1 - 14, top - 8, { size: 13, align: 'center', color: c.text2 }); text(ctx, '+', cx1 + 15, top - 8, { size: 13, align: 'center', color: c.text2 });
    // bulb symbol (circle with a cross), filled warmer as the current grows
    const lx = bx0 + bw * 0.66, lr = 12;
    ctx.fillStyle = c.stage; ctx.beginPath(); ctx.arc(lx, top, lr, 0, Math.PI * 2); ctx.fill();
    if (br > 0.01) { ctx.fillStyle = `rgba(245,178,61,${0.15 + 0.75 * br})`; ctx.beginPath(); ctx.arc(lx, top, lr, 0, Math.PI * 2); ctx.fill(); }
    ctx.strokeStyle = c.text; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(lx, top, lr, 0, Math.PI * 2); ctx.stroke();
    const q = lr * 0.7; ctx.beginPath(); ctx.moveTo(lx - q, top - q); ctx.lineTo(lx + q, top + q); ctx.moveTo(lx + q, top - q); ctx.lineTo(lx - q, top + q); ctx.stroke();
    text(ctx, T.lamp, lx, top + 28, { size: 12, align: 'center', color: c.text2 });
    // beaker and solution
    const tint = S.sub === 'CuSO4' && S.wet ? `rgba(40,120,220,${0.10 + 0.5 * S.c})` : waterFill();
    const wy = beaker(bx0, by0, bw, bh, tint, S.wet ? 0.82 : 0);
    // electrodes (graphite rods)
    ctx.fillStyle = c.light ? '#5b6068' : '#8a9099';
    [eL, eR].forEach(x => ctx.fillRect(x - 4, by0 - 6 + 16, 8, bh * 0.78));
    halo(T.neg, bx0 - 6, by0 - (ph ? 26 : 10), 'left');
    halo(T.pos, bx0 + bw + 6, by0 - 10, 'right');
    const t = MLX.reducedMotion ? 0.3 : S.t;
    const ix0 = eL + 14, ix1 = eR - 14, iy0 = wy + 14, iy1 = by0 + bh - 14;
    if (!S.wet) {
      // dry: crystals heaped on the bottom, or HCl gas molecules spread out
      if (S.sub === 'HCl') {
        for (let i = 0; i < 9; i++) { const x = ix0 + (ix1 - ix0) * ((i * 0.37) % 1), y = by0 + 30 + (bh - 50) * ((i * 0.61 + 0.2) % 1); hcl(x + Math.sin(t + i) * 6, y + Math.cos(t * 1.3 + i) * 6, 0.9); }
      } else lattice(bx0 + bw / 2, by0 + bh - 6, d, 0.75);
      text(ctx, T.dry, bx0 + bw / 2, by0 + bh + 18, { size: 12, align: 'center', color: c.text3 });
    } else if (d.mol) {
      const n = Math.round(3 + 22 * S.c);
      for (let i = 0; i < n; i++) { const x = ix0 + (ix1 - ix0) * hsh(i + 1), y = iy0 + (iy1 - iy0) * hsh(i + 50); sugarMol(x + Math.sin(t * 0.8 + i) * 5, y + Math.cos(t + i) * 5, 0.55); }
    } else {
      const n = Math.round(3 + 22 * S.c), r = n > 10 ? 9 : 11;
      for (let i = 0; i < n; i++) {
        [[d.cat, -1], [d.an, 1]].forEach(([kk, dirn], j) => {
          // drift towards the opposite electrode, wrapping round: a steady flow of charge
          const base = hsh(i * 2 + j + 7), drift = fr(base + dirn * t * 0.05 * (0.6 + br));
          const x = ix0 + (ix1 - ix0) * drift, y = iy0 + (iy1 - iy0) * hsh(i * 2 + j + 90) + Math.sin(t * 2 + i + j) * 3;
          ion(kk, x, y, ION[kk].poly ? r + 2 : r, n > 10 ? false : undefined);
        });
      }
      if (n > 10) text(ctx, ION[d.cat].s + ION[d.cat].q + ' → (−)     ' + ION[d.an].s + ION[d.an].q + ' → (+)', bx0 + bw / 2, by0 + bh + 18, { size: 12, align: 'center', color: c.text2 });
    }
    // dissolving equation
    text(ctx, S.wet ? d.eq : (d.eqDry || d.f + '(s)'), aw / 2, ph ? H * 0.50 + 42 : H - 12, { size: 14, mono: false, weight: 700, align: 'center', color: c.ink });
    // close-up
    if (ph) zoom(W * 0.5, H * 0.50 + 58, W - 24, H - (H * 0.50 + 58) - 4, d);
    else { ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); zoom(aw + (W - aw) / 2, 24, W - aw - 24, H - 40, d); }
  }
  const fr = (x) => x - Math.floor(x);
  function halo(s, x, y, align) {
    ctx.save(); ctx.font = '600 12px "Cabinet Grotesk", sans-serif'; ctx.textAlign = align; ctx.lineJoin = 'round';
    ctx.strokeStyle = c.stage; ctx.lineWidth = 4; ctx.strokeText(L(s), x, y); ctx.fillStyle = c.text; ctx.fillText(L(s), x, y); ctx.restore();
  }
  const hsh = (i) => fr(Math.sin(i * 127.1 + 311.7) * 43758.5453);
  function hcl(x, y, s) {
    ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.45)' : 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1;
    ctx.fillStyle = ION.Cl.f[c.light ? 1 : 0]; ctx.beginPath(); ctx.arc(x + 5 * s, y, 10 * s, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.arc(x - 9 * s, y, 6 * s, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }
  function sugarMol(x, y, s) {
    ctx.fillStyle = c.light ? '#e9dcc0' : '#d8c8a4'; ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.45)' : 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1;
    [[-1, 0], [1, 0]].forEach(([dx]) => { ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + Math.PI / 6; const px = x + dx * 13 * s + Math.cos(a) * 12 * s, py = y + Math.sin(a) * 12 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.fill(); ctx.stroke(); });
  }
  // a small crystal: alternating ions (or sugar molecules) in rows, resting on y (bottom)
  function lattice(cx, y, d, s, labels) {
    if (d.mol) { for (let r = 0; r < 3; r++) for (let i = 0; i < 4 - (r ? 1 : 0); i++) sugarMol(cx + (i - (3 - (r ? 1 : 0)) / 2) * 34 * s, y - 12 * s - r * 22 * s, s * 0.85); return; }
    const sp = 22 * s;
    for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) { const k = (i + r) % 2 ? d.an : d.cat; ion(k, cx + (i - 2.5) * sp, y - sp / 2 - r * sp, (ION[k].poly ? 11 : 10) * s, labels ? undefined : false); }
  }
  function zoom(cx, y0, w, hh, d) {
    text(ctx, T.zoom, cx, y0 + 4, { size: 12, align: 'center', color: c.text3 });
    const R0 = Math.min(w / 2, (hh - 54) / 2) - 6, cy = y0 + 14 + R0 + 4;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R0, 0, Math.PI * 2);
    ctx.fillStyle = S.wet ? (S.sub === 'CuSO4' ? 'rgba(40,120,220,0.18)' : waterFill()) : c.stage; ctx.fill(); ctx.strokeStyle = c.glass; ctx.lineWidth = 1.5; ctx.stroke(); ctx.clip();
    const s = Math.max(0.8, Math.min(1.8, R0 / 82));
    if (!S.wet) {
      if (S.sub === 'HCl') { hcl(cx - 30 * s, cy - 25 * s, 1.6 * s); hcl(cx + 35 * s, cy + 20 * s, 1.6 * s); text(ctx, 'H–Cl', cx + 35 * s, cy + 50 * s, { size: 12, align: 'center', color: c.text }); }
      else if (d.mol) lattice(cx, cy + 40 * s, d, 1.1 * s); else { const k2 = Math.min(1.25, R0 / 75); lattice(cx, cy + 33 * k2, d, k2, true); }
      ctx.restore();
      text(ctx, S.sub === 'HCl' ? T.gas : d.mol ? T.mol : T.latL, cx, cy + R0 + 18, { size: 12, align: 'center', color: c.text2 });
      return;
    }
    if (d.mol) {
      sugarMol(cx, cy, 1.6 * s);
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.3, rr = 52 * s; waterMol(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.85, a * 2.3 + i, s); }
      ctx.restore();
      text(ctx, T.mol, cx, cy + R0 + 18, { size: 12, align: 'center', color: c.text2 });
      return;
    }
    // hydrated cation (left) and anion (right)
    const ax = cx - R0 * 0.45, bx = cx + R0 * 0.45;
    [[d.cat, ax, false], [d.an, bx, true]].forEach(([kk, x, isAn]) => {
      const ri = (ION[kk].poly ? 15 : 12) * s;
      ion(kk, x, cy, ri);
      const n = 6, dist = ri + 10 * s + (isAn ? 3 * s : 0);
      for (let i = 0; i < n; i++) {
        const a = i * 2 * Math.PI / n + 0.2;
        const wx = x + Math.cos(a) * dist, wy = cy + Math.sin(a) * dist;
        // cation: O faces the ion, so the H ends point outward; anion: the H ends point to the ion
        waterMol(wx, wy, isAn ? a + Math.PI : a, s);
      }
    });
    ctx.restore();
    text(ctx, T.oCat, cx, cy + R0 + 18, { size: 12, align: 'center', color: c.text2 });
    text(ctx, T.hAn, cx, cy + R0 + 34, { size: 12, align: 'center', color: c.text2 });
  }

  function drawMix(W, H) {
    const ph = W < 640;
    const aw = ph ? W : Math.round(W * 0.62);
    const bx0 = aw * 0.1, bw = aw * 0.8, by0 = 34, bh = (ph ? H * 0.66 : H - 30) - by0;
    const tm = S.tm, ease = (v) => v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v);
    const pR = ease((tm - 1.0) / 1.6), pS = ease((tm - 2.6) / 1.6);  // reacting ions meet, then the solid settles
    // solution colour: Cu²⁺ blue and Fe³⁺ yellow-brown fade as they are used up; iodine turns it brown
    let tint = waterFill();
    if (R.a === 'Cu') tint = `rgba(40,120,220,${0.28 * (R.ins || R.special ? 1 - pR : 1) + 0.05})`;
    if (R.a === 'Fe') tint = `rgba(200,140,40,${0.26 * (R.ins || R.special ? 1 - pR : 1) + 0.04})`;
    const wy = beaker(bx0, by0, bw, bh, tint, 0.86);
    if (R.special === 'CuI' || R.special === 'FeI') { ctx.fillStyle = `rgba(150,80,20,${0.28 * pR})`; ctx.fillRect(bx0 + 2, wy, bw - 4, by0 + bh - wy - 2); }
    const solid = R.ins ? PPT[R.ins][0] : R.special === 'Ag2O' ? '#5a3a24' : R.special === 'CuI' ? '#ece6d6' : null;
    // cloudiness while the precipitate forms, clearing as it settles
    if (solid) { ctx.globalAlpha = 0.32 * pR * (1 - pS * 0.85); ctx.fillStyle = solid; ctx.fillRect(bx0 + 2, wy, bw - 4, by0 + bh - wy - 2); ctx.globalAlpha = 1; }
    const ix0 = bx0 + 16, iw = bw - 32, iy0 = wy + 14, ih = by0 + bh - wy - 40;
    const t = MLX.reducedMotion ? 0.4 : S.t, n = parts.length, r = n > 22 ? 10 : 12;
    const unitCount = R.units.length, pos = new Map();
    parts.forEach((p, i) => {
      const enter = p.fromB ? ease(tm / 0.9) : 1;
      let x = ix0 + iw * p.hx + Math.sin(t * p.sp + p.ph) * 6, y = iy0 + ih * p.hy + Math.cos(t * p.sp * 1.2 + p.ph) * 5;
      if (p.fromB) { x = x + (bx0 + bw * 0.85 - x) * (1 - enter); y = y + (by0 - 20 - y) * (1 - enter); }
      if ((p.role === 'r' && solid)) {
        const u = R.units[p.unit], idx = parts.filter(q => q.unit === p.unit && q.role === 'r').indexOf(p), m = parts.filter(q => q.unit === p.unit && q.role === 'r').length;
        const ang = idx / m * Math.PI * 2, rad = m > 1 ? r * 0.9 : 0;
        const mx = ix0 + iw * u.mx + Math.cos(ang) * rad, my = iy0 + ih * u.my + Math.sin(ang) * rad;
        const bxp = bx0 + 18 + (bw - 36) * u.bx + Math.cos(ang) * rad * 0.9, byp = by0 + bh - 14 - (Math.sin(ang) + 1) * rad * 0.45;
        x = x + (mx - x) * pR; y = y + (my - y) * pR;
        x = x + (bxp - x) * pS; y = y + (byp - y) * pS;
        pos.set(i, [x, y, true]);
      } else pos.set(i, [x, y, false]);
    });
    // iodine pairs come together
    parts.forEach((p, i) => { if (p.role === 'i2b') { const j = parts.indexOf(p.mate), [mx, my] = pos.get(j), [x, y] = pos.get(i); pos.set(i, [x + (mx + r * 1.5 - x) * pR, y + (my - y) * pR, false]); } });
    void unitCount;
    parts.forEach((p, i) => {
      const [x, y, inSolid] = pos.get(i);
      if (inSolid && pR > 0.85) { ctx.fillStyle = solid; ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.55)' : 'rgba(0,0,0,0.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r * 0.85, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); return; }
      if (p.role === 'i2' && pR > 0.85) { ctx.globalAlpha = 1; ion('I', x, y, r, false); return; }
      if (p.role === 'i2b' && pR > 0.85) { ion('I', x, y, r, false); text(ctx, 'I₂', x - r * 0.75, y - r - 4, { size: 12, weight: 700, align: 'center', color: c.ink }); return; }
      ion(p.k, x, y, ION[p.k].poly ? r + 2 : r, p.role === 'fe' && pR > 0.5 ? 'Fe²⁺' : undefined);
    });
    // the settled solid builds up as a layer on the bottom
    if (solid && pS > 0) {
      const hh = (6 + 3 * R.units.length) * pS, yb = by0 + bh - 2;
      ctx.fillStyle = solid; ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.4)' : 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(bx0 + 2, yb); ctx.lineTo(bx0 + 2, yb - hh * 0.6);
      ctx.quadraticCurveTo(bx0 + bw / 2, yb - hh * 1.6, bx0 + bw - 2, yb - hh * 0.6); ctx.lineTo(bx0 + bw - 2, yb); ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    // label for the solid
    if (solid && pS > 0.9) {
      const lab = R.ins ? R.P1.s + '(s)' : R.special === 'Ag2O' ? 'Ag₂O(s)' : 'CuI(s)';
      text(ctx, lab, bx0 + bw / 2, by0 + bh + 18, { size: 13, weight: 700, align: 'center', color: c.ink });
    }
    // key: which ions react and which are spectators
    const kx = ph ? 16 : aw + 18, ky = ph ? by0 + bh + 34 : 36;
    text(ctx, T.inBk, kx, ky, { size: 12, color: c.text3 });
    const kinds = [R.a, R.x, R.b, R.y].filter((k, i, arr) => arr.indexOf(k) === i);
    const reacts = (k) => (R.ins || R.special) && (k === R.a || k === R.y);
    kinds.forEach((k, i) => {
      const x = ph ? kx + (i % 2) * (W / 2 - 8) : kx, y = ph ? ky + 22 + Math.floor(i / 2) * 26 : ky + 26 + i * 34;
      ion(k, x + 14, y, 14);
      text(ctx, reacts(k) ? (R.special && R.special !== 'Ag2O' ? T.redox : T.react) : T.spect, x + 36, y + 4, { size: 12, color: reacts(k) ? c.ink : c.text3, weight: reacts(k) ? 700 : 500 });
    });
  }

  // ---------- update ----------
  function update() {
    const dis = S.mode === 'dis';
    [pK.el, cK].forEach(e => { e.style.display = dis ? '' : 'none'; });
    [pM.el, cM, cE].forEach(e => { e.style.display = dis ? 'none' : ''; });
    if (dis) {
      const d = DIS[S.sub], k = kappa();
      sC.el.style.display = S.wet ? '' : 'none';
      pK.set(num(k, k < 10 ? 1 : 0));
      roK.set('p', L(!S.wet ? (d.mol || S.sub === 'HCl' ? T.mols : T.lat) : d.mol ? T.mols : T.ions));
      roK.set('e', L(d.mol ? T.no : T.yes));
      roK.set('b', L(k > 8 ? T.bright : k > 0.5 ? T.dim : T.off));
      const f = L(d.f);
      ui.setCaption(!S.wet ? (S.sub === 'HCl' ? T.cGas : d.mol ? T.cSugS : L(T.cSolid).replace('{f}', f)) : d.mol ? T.cSug : L(T.cIon).replace('{f}', f));
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + (S.wet ? d.eq : (d.eqDry || f)) + '. ' + L(T.kappa) + ' ' + num(k, 1) + ' mS/cm.');
    } else {
      if (!R) build();
      const E = equations(R);
      const pf = R.ins ? R.P1.s : R.special === 'Ag2O' ? 'Ag₂O' : R.special === 'CuI' ? 'CuI' : L(T.none);
      pM.set(pf);
      pM.el.querySelector('.mlx-primary-unit').textContent = R.ins ? L(PPT[R.ins][1]) : R.special === 'Ag2O' ? L({ en: 'brown', af: 'bruin' }) : R.special === 'CuI' ? L({ en: 'off-white, in brown iodine solution', af: 'naaswit, in bruin jodiumoplossing' }) : R.special === 'FeI' ? L({ en: 'solution turns brown', af: 'oplossing word bruin' }) : '';
      const rows = pM.el.querySelectorAll('.mlx-row');
      if (R.same) {
        rows[0].firstChild.textContent = L(T.prods); rows[0].lastChild.textContent = L({ en: 'no new combinations', af: 'geen nuwe kombinasies nie' }); rows[1].style.display = 'none';
        ruleNote.textContent = L({ en: 'Both solutions contain the same anion, so the ions have no new partners to swap with.', af: 'Albei oplossings bevat dieselfde anioon, dus het die ione geen nuwe maats om mee te ruil nie.' });
      } else if (R.special === 'CuI' || R.special === 'FeI') {
        rows[0].firstChild.textContent = L(T.prods); rows[0].lastChild.textContent = R.special === 'CuI' ? 'CuI(s), I₂(aq)' : 'Fe²⁺(aq), I₂(aq)'; rows[1].style.display = 'none';
        ruleNote.textContent = L({ en: 'By the solubility rules no precipitate is expected, but these ions react by electron transfer instead.', af: 'Volgens die oplosbaarheidsreëls word geen neerslag verwag nie, maar hierdie ione reageer eerder deur elektronoordrag.' });
      } else {
        rows[1].style.display = '';
        const p1ins = !!R.ins || R.special === 'Ag2O';
        rows[0].firstChild.textContent = R.P1.s; rows[0].lastChild.textContent = L(p1ins ? T.insol : T.sol);
        rows[1].firstChild.textContent = R.P2.s; rows[1].lastChild.textContent = L(T.sol);
        const cap1 = (t) => { t = L(t); return t.charAt(0).toUpperCase() + t.slice(1); };
        ruleNote.textContent = cap1(R.p1Rule) + '; ' + L(R.p2Rule) + '.';
      }
      eqM.innerHTML = '<b>' + L(T.eM) + '</b>' + E.m;
      eqF.innerHTML = '<b>' + L(T.eF) + '</b>' + E.f;
      eqN.innerHTML = '<b>' + L(T.eN) + '</b>' + (E.n || L(T.noNet));
      const cap = R.special === 'Ag2O' ? T.cAg2O : R.special === 'CuI' ? T.cCuI : R.special === 'FeI' ? T.cFeI : R.ins
        ? L(T.cPpt).replace('{a}', ION[R.a].s + ION[R.a].q).replace('{b}', ION[R.y].s + ION[R.y].q).replace('{p}', R.P1.s).replace('{c}', L(PPT[R.ins][1])) : T.cNone;
      ui.setCaption(cap);
      ui.cv.el.setAttribute('aria-label', L(T.ariaM) + ': ' + L(NAME[R.kA]) + ' + ' + L(NAME[R.kB]) + '. ' + L(cap));
    }
    ui.cv.draw();
  }
  update();
});
