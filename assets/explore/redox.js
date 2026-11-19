/* Gr11 Redox reactions — three views in one module.
 * 1. Metal in a solution: a metal strip in a salt solution (or dilute HCl). The reaction happens only when the ion in
 *    solution is a stronger oxidising agent than the metal's own ion, i.e. it is higher on the table of standard
 *    reduction potentials (CAPS data sheet): Ag⁺/Ag +0,80; Cu²⁺/Cu +0,34; 2H⁺/H₂ 0,00; Fe²⁺/Fe −0,44; Zn²⁺/Zn −0,76;
 *    Mg²⁺/Mg −2,36 V. Then the metal is oxidised (loses electrons, ON rises: reducing agent) and the ion is reduced
 *    (gains electrons, ON falls: oxidising agent). Zn in CuSO₄: zinc dissolves, copper deposits, the blue fades.
 * 2. Oxidation numbers: the page's rules 1–6 applied step by step (O −2 except peroxides, H +1, sum = charge).
 * 3. Half-reaction method (acidic solution) for the page's worked examples, ending with equal electrons.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Redox reactions simulation', af: 'Redoksreaksies-simulasie' },
    show: { en: 'Show', af: 'Wys' },
    mD: { en: 'Metal in a solution', af: 'Metaal in \'n oplossing' }, mO: { en: 'Oxidation numbers', af: 'Oksidasiegetalle' }, mH: { en: 'Half-reaction method', af: 'Halfreaksiemetode' },
    metal: { en: 'Metal strip', af: 'Metaalstrook' }, sol: { en: 'Solution', af: 'Oplossing' }, again: { en: 'Start again', af: 'Begin weer' },
    react: { en: 'Does it react?', af: 'Reageer dit?' }, yes: { en: 'Yes', af: 'Ja' }, no: { en: 'No', af: 'Nee' },
    rEq: { en: 'Overall', af: 'Oorhoofs' }, rOx: { en: 'Oxidation', af: 'Oksidasie' }, rRed: { en: 'Reduction', af: 'Reduksie' },
    rRA: { en: 'Reducing agent', af: 'Reduseermiddel' }, rOA: { en: 'Oxidising agent', af: 'Oksideermiddel' }, rE: { en: 'E°(ion) − E°(metal)', af: 'E°(ioon) − E°(metaal)' },
    table: { en: 'Standard reduction potentials', af: 'Standaardreduksiepotensiale' },
    strOA: { en: 'stronger oxidising agents', af: 'sterker oksideermiddels' }, strRA: { en: 'stronger reducing agents', af: 'sterker reduseermiddels' },
    zoom: { en: 'at the metal surface (particles)', af: 'by die metaaloppervlak (deeltjies)' }, spect: { en: 'spectator ions not shown', af: 'toeskouerione nie gewys nie' },
    noT: { en: 'no electron transfer', af: 'geen elektronoordrag' },
    strip: { en: ' strip', af: 'strook' }, dep: { en: ' deposit', af: 'neerslag' }, gas: { en: 'H₂ gas bubbles', af: 'H₂-gasborrels' },
    above: { en: 'higher on the table: reacts', af: 'hoër op die tabel: reageer' }, below: { en: 'lower on the table: no reaction', af: 'laer op die tabel: geen reaksie' },
    // oxidation numbers
    form: { en: 'Formula', af: 'Formule' }, next: { en: 'Next step', af: 'Volgende stap' }, all: { en: 'Show all steps', af: 'Wys alle stappe' }, reset: { en: 'Reset', af: 'Herstel' },
    onOf: { en: 'Oxidation number of', af: 'Oksidasiegetal van' }, rCharge: { en: 'Charge of the species', af: 'Lading van die spesie' }, rStep: { en: 'Step', af: 'Stap' },
    rules: { en: 'Rules', af: 'Reëls' }, of: { en: 'of', af: 'van' },
    R: [
      { en: '1  Pure element: ON = 0', af: '1  Suiwer element: OG = 0' },
      { en: '2  Monoatomic ion: ON = charge', af: '2  Enkelatoomioon: OG = lading' },
      { en: '3  O is −2 (peroxides −1)', af: '3  O is −2 (peroksiede −1)' },
      { en: '4  H is +1 (metal hydrides −1)', af: '4  H is +1 (metaalhidriede −1)' },
      { en: '5  F is always −1', af: '5  F is altyd −1' },
      { en: '6  Sum of ONs = charge of the species', af: '6  Som van OG\'s = lading van die spesie' },
    ],
    // half reactions
    rx: { en: 'Reaction', af: 'Reaksie' }, eT: { en: 'Electrons transferred', af: 'Elektrone oorgedra' },
    oxBox: { en: 'Oxidation half-reaction (loses e⁻)', af: 'Oksidasie-halfreaksie (verloor e⁻)' }, redBox: { en: 'Reduction half-reaction (gains e⁻)', af: 'Reduksie-halfreaksie (kry e⁻)' },
    allBox: { en: 'Overall balanced equation', af: 'Oorhoofse gebalanseerde vergelyking' }, isRA: { en: 'reducing agent', af: 'reduseermiddel' }, isOA: { en: 'oxidising agent', af: 'oksideermiddel' },
    pending: { en: '…', af: '…' },
  };

  // ── 1. metal in solution
  const MET = {
    Mg: { E: -2.36, ion: 'Mg²⁺', q: 2, col: [196, 198, 204], n: { en: 'magnesium', af: 'magnesium' } },
    Zn: { E: -0.76, ion: 'Zn²⁺', q: 2, col: [150, 162, 176], n: { en: 'zinc', af: 'sink' } },
    Fe: { E: -0.44, ion: 'Fe²⁺', q: 2, col: [104, 106, 112], n: { en: 'iron', af: 'yster' } },
    Cu: { E: 0.34, ion: 'Cu²⁺', q: 2, col: [186, 104, 62], n: { en: 'copper', af: 'koper' } },
    Ag: { E: 0.80, ion: 'Ag⁺', q: 1, col: [214, 216, 222], n: { en: 'silver', af: 'silwer' } },
  };
  const SOLS = {
    Mg: { lab: 'MgSO₄', E: -2.36, ion: 'Mg²⁺', q: 2, prod: 'Mg', e: 2, ic: 1, pc: 1 },
    Zn: { lab: 'ZnSO₄', E: -0.76, ion: 'Zn²⁺', q: 2, prod: 'Zn', e: 2, ic: 1, pc: 1 },
    Fe: { lab: 'FeSO₄', E: -0.44, ion: 'Fe²⁺', q: 2, prod: 'Fe', e: 2, ic: 1, pc: 1 },
    H: { lab: 'HCl', E: 0, ion: 'H⁺', q: 1, prod: 'H₂', e: 2, ic: 2, pc: 1 },
    Cu: { lab: 'CuSO₄', E: 0.34, ion: 'Cu²⁺', q: 2, prod: 'Cu', e: 2, ic: 1, pc: 1 },
    Ag: { lab: 'AgNO₃', E: 0.80, ion: 'Ag⁺', q: 1, prod: 'Ag', e: 1, ic: 1, pc: 1 },
  };
  const TABLE = [
    ['Ag', 'Ag⁺ + e⁻ ⇌ Ag', 0.80], ['Cu', 'Cu²⁺ + 2e⁻ ⇌ Cu', 0.34], ['H', '2H⁺ + 2e⁻ ⇌ H₂', 0.00],
    ['Fe', 'Fe²⁺ + 2e⁻ ⇌ Fe', -0.44], ['Zn', 'Zn²⁺ + 2e⁻ ⇌ Zn', -0.76], ['Mg', 'Mg²⁺ + 2e⁻ ⇌ Mg', -2.36],
  ];
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const co = (n) => n > 1 ? String(n) : '';
  function rxn() {
    const m = MET[S.m], s = SOLS[S.s];
    const ok = S.m !== S.s && s.E > m.E;
    const ea = m.q, eb = s.e, Lc = ea * eb / gcd(ea, eb), kO = Lc / ea, kR = Lc / eb;
    const ox = co(kO) + S.m + ' → ' + co(kO) + m.ion + ' + ' + co(Lc) + 'e⁻';
    const red = co(kR * s.ic) + s.ion + ' + ' + co(Lc) + 'e⁻ → ' + co(kR * s.pc) + s.prod;
    const all = co(kO) + S.m + ' + ' + co(kR * s.ic) + s.ion + ' → ' + co(kO) + m.ion + ' + ' + co(kR * s.pc) + s.prod;
    return { m, s, ok, Lc, kO, nIons: kR * s.ic, ox, red, all, dE: s.E - m.E };
  }

  // ── 2. oxidation numbers: els [symbol, count], q charge, steps [{t, show:[symbols]}], ON per symbol
  const ONF = {
    Cl2: { f: 'Cl₂', els: [['Cl', 2]], q: 0, on: { Cl: 0 }, u: 'Cl', rule: 0,
      steps: [{ t: { en: 'Rule 1: Cl₂ is a pure element, so each Cl atom has ON = 0.', af: 'Reël 1: Cl₂ is \'n suiwer element, dus het elke Cl-atoom OG = 0.' }, show: ['Cl'], r: 0 }] },
    H2O: { f: 'H₂O', els: [['H', 2], ['O', 1]], q: 0, on: { H: 1, O: -2 }, u: 'O',
      steps: [{ t: { en: 'Rule 4: H is +1.', af: 'Reël 4: H is +1.' }, show: ['H'], r: 3 },
        { t: { en: 'Rule 6: the molecule is neutral, so 2(+1) + ON(O) = 0.', af: 'Reël 6: die molekuul is neutraal, dus 2(+1) + OG(O) = 0.' }, show: [], r: 5 },
        { t: { en: 'ON(O) = −2.', af: 'OG(O) = −2.' }, show: ['O'], r: 5 }] },
    SO4: { f: 'SO₄²⁻', els: [['S', 1], ['O', 4]], q: -2, on: { S: 6, O: -2 }, u: 'S',
      steps: [{ t: { en: 'Rule 3: O is −2.', af: 'Reël 3: O is −2.' }, show: ['O'], r: 2 },
        { t: { en: 'Rule 6: the sum equals the charge, so ON(S) + 4(−2) = −2.', af: 'Reël 6: die som is gelyk aan die lading, dus OG(S) + 4(−2) = −2.' }, show: [], r: 5 },
        { t: { en: 'ON(S) = −2 + 8 = +6.', af: 'OG(S) = −2 + 8 = +6.' }, show: ['S'], r: 5 }] },
    MnO4: { f: 'MnO₄⁻', els: [['Mn', 1], ['O', 4]], q: -1, on: { Mn: 7, O: -2 }, u: 'Mn',
      steps: [{ t: { en: 'Rule 3: O is −2.', af: 'Reël 3: O is −2.' }, show: ['O'], r: 2 },
        { t: { en: 'Rule 6: ON(Mn) + 4(−2) = −1.', af: 'Reël 6: OG(Mn) + 4(−2) = −1.' }, show: [], r: 5 },
        { t: { en: 'ON(Mn) = −1 + 8 = +7.', af: 'OG(Mn) = −1 + 8 = +7.' }, show: ['Mn'], r: 5 }] },
    Cr2O7: { f: 'Cr₂O₇²⁻', els: [['Cr', 2], ['O', 7]], q: -2, on: { Cr: 6, O: -2 }, u: 'Cr',
      steps: [{ t: { en: 'Rule 3: O is −2.', af: 'Reël 3: O is −2.' }, show: ['O'], r: 2 },
        { t: { en: 'Rule 6: 2·ON(Cr) + 7(−2) = −2, so 2·ON(Cr) = +12.', af: 'Reël 6: 2·OG(Cr) + 7(−2) = −2, dus 2·OG(Cr) = +12.' }, show: [], r: 5 },
        { t: { en: 'ON(Cr) = +6.', af: 'OG(Cr) = +6.' }, show: ['Cr'], r: 5 }] },
    Fe2O3: { f: 'Fe₂O₃', els: [['Fe', 2], ['O', 3]], q: 0, on: { Fe: 3, O: -2 }, u: 'Fe',
      steps: [{ t: { en: 'Rule 3: O is −2.', af: 'Reël 3: O is −2.' }, show: ['O'], r: 2 },
        { t: { en: 'Rule 6: neutral, so 2·ON(Fe) + 3(−2) = 0, 2·ON(Fe) = +6.', af: 'Reël 6: neutraal, dus 2·OG(Fe) + 3(−2) = 0, 2·OG(Fe) = +6.' }, show: [], r: 5 },
        { t: { en: 'ON(Fe) = +3.', af: 'OG(Fe) = +3.' }, show: ['Fe'], r: 5 }] },
    Na2O2: { f: 'Na₂O₂', els: [['Na', 2], ['O', 2]], q: 0, on: { Na: 1, O: -1 }, u: 'O',
      steps: [{ t: { en: 'Na₂O₂ is ionic (2Na⁺ and O₂²⁻). Rule 2: each Na⁺ ion has ON = +1.', af: 'Na₂O₂ is ionies (2Na⁺ en O₂²⁻). Reël 2: elke Na⁺-ioon het OG = +1.' }, show: ['Na'], r: 1 },
        { t: { en: 'Rule 6: 2(+1) + 2·ON(O) = 0.', af: 'Reël 6: 2(+1) + 2·OG(O) = 0.' }, show: [], r: 5 },
        { t: { en: 'ON(O) = −1: a peroxide, the exception to rule 3.', af: 'OG(O) = −1: \'n peroksied, die uitsondering op reël 3.' }, show: ['O'], r: 2 }] },
    NH3: { f: 'NH₃', els: [['N', 1], ['H', 3]], q: 0, on: { N: -3, H: 1 }, u: 'N',
      steps: [{ t: { en: 'Rule 4: H is +1.', af: 'Reël 4: H is +1.' }, show: ['H'], r: 3 },
        { t: { en: 'Rule 6: neutral, so ON(N) + 3(+1) = 0.', af: 'Reël 6: neutraal, dus OG(N) + 3(+1) = 0.' }, show: [], r: 5 },
        { t: { en: 'ON(N) = −3.', af: 'OG(N) = −3.' }, show: ['N'], r: 5 }] },
  };
  const ONK = ['Cl2', 'H2O', 'SO4', 'MnO4', 'Cr2O7', 'Fe2O3', 'Na2O2', 'NH3'];

  // ── 3. half-reaction method
  const HR = {
    MnFe: { lab: 'MnO₄⁻ + Fe²⁺', ra: 'Fe²⁺', oa: 'MnO₄⁻', e: 5, steps: [
      { n: { en: 'Find the changes: Fe goes from +2 to +3 (oxidised); Mn goes from +7 to +2 (reduced).', af: 'Vind die veranderinge: Fe gaan van +2 na +3 (geoksideer); Mn gaan van +7 na +2 (gereduseer).' } },
      { ox: 'Fe²⁺ → Fe³⁺ + e⁻', n: { en: 'Oxidation half-reaction: Fe²⁺ loses one electron, written on the right.', af: 'Oksidasie-halfreaksie: Fe²⁺ verloor een elektron, regs geskryf.' } },
      { red: 'MnO₄⁻ → Mn²⁺', n: { en: 'Reduction half-reaction: Mn atoms are already balanced.', af: 'Reduksie-halfreaksie: die Mn-atome is reeds gebalanseer.' } },
      { red: 'MnO₄⁻ → Mn²⁺ + 4H₂O', n: { en: 'Balance O by adding 4H₂O to the right.', af: 'Balanseer O deur 4H₂O regs by te voeg.' } },
      { red: 'MnO₄⁻ + 8H⁺ → Mn²⁺ + 4H₂O', n: { en: 'Balance H by adding 8H⁺ to the left.', af: 'Balanseer H deur 8H⁺ links by te voeg.' } },
      { red: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O', n: { en: 'Balance charge: left is +7, right is +2, so add 5e⁻ to the left.', af: 'Balanseer lading: links is +7, regs is +2, dus voeg 5e⁻ links by.' } },
      { ox: '5Fe²⁺ → 5Fe³⁺ + 5e⁻', n: { en: 'Multiply the oxidation half-reaction by 5 so that 5 electrons are lost and 5 gained.', af: 'Vermenigvuldig die oksidasie-halfreaksie met 5 sodat 5 elektrone verloor en 5 gekry word.' } },
      { all: 'MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺', n: { en: 'Add the half-reactions and cancel the 5e⁻ on both sides.', af: 'Tel die halfreaksies bymekaar en kanselleer die 5e⁻ aan albei kante.' } },
    ] },
    CrI: { lab: 'Cr₂O₇²⁻ + I⁻', ra: 'I⁻', oa: 'Cr₂O₇²⁻', e: 6, steps: [
      { n: { en: 'Find the changes: I goes from −1 to 0 (oxidised); Cr goes from +6 to +3 (reduced).', af: 'Vind die veranderinge: I gaan van −1 na 0 (geoksideer); Cr gaan van +6 na +3 (gereduseer).' } },
      { ox: '2I⁻ → I₂ + 2e⁻', n: { en: 'Oxidation: balance I (2I⁻ → I₂), then each I⁻ loses one electron: 2e⁻ on the right.', af: 'Oksidasie: balanseer I (2I⁻ → I₂), dan verloor elke I⁻ een elektron: 2e⁻ regs.' } },
      { red: 'Cr₂O₇²⁻ → 2Cr³⁺', n: { en: 'Reduction: balance Cr with 2Cr³⁺.', af: 'Reduksie: balanseer Cr met 2Cr³⁺.' } },
      { red: 'Cr₂O₇²⁻ → 2Cr³⁺ + 7H₂O', n: { en: 'Balance O by adding 7H₂O to the right.', af: 'Balanseer O deur 7H₂O regs by te voeg.' } },
      { red: 'Cr₂O₇²⁻ + 14H⁺ → 2Cr³⁺ + 7H₂O', n: { en: 'Balance H by adding 14H⁺ to the left.', af: 'Balanseer H deur 14H⁺ links by te voeg.' } },
      { red: 'Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O', n: { en: 'Balance charge: left is +12, right is +6, so add 6e⁻ to the left.', af: 'Balanseer lading: links is +12, regs is +6, dus voeg 6e⁻ links by.' } },
      { ox: '6I⁻ → 3I₂ + 6e⁻', n: { en: 'Multiply the oxidation half-reaction by 3 so that 6 electrons are lost and 6 gained.', af: 'Vermenigvuldig die oksidasie-halfreaksie met 3 sodat 6 elektrone verloor en 6 gekry word.' } },
      { all: 'Cr₂O₇²⁻ + 14H⁺ + 6I⁻ → 2Cr³⁺ + 7H₂O + 3I₂', n: { en: 'Add the half-reactions and cancel the 6e⁻.', af: 'Tel die halfreaksies bymekaar en kanselleer die 6e⁻.' } },
    ] },
    ZnCu: { lab: 'Zn + Cu²⁺', ra: 'Zn', oa: 'Cu²⁺', e: 2, steps: [
      { n: { en: 'Find the changes: Zn goes from 0 to +2 (oxidised); Cu goes from +2 to 0 (reduced).', af: 'Vind die veranderinge: Zn gaan van 0 na +2 (geoksideer); Cu gaan van +2 na 0 (gereduseer).' } },
      { ox: 'Zn → Zn²⁺ + 2e⁻', n: { en: 'Oxidation: each Zn atom loses two electrons.', af: 'Oksidasie: elke Zn-atoom verloor twee elektrone.' } },
      { red: 'Cu²⁺ + 2e⁻ → Cu', n: { en: 'Reduction: each Cu²⁺ ion gains two electrons.', af: 'Reduksie: elke Cu²⁺-ioon kry twee elektrone.' } },
      { all: 'Zn + Cu²⁺ → Zn²⁺ + Cu', n: { en: 'The electrons are already equal (2 lost, 2 gained), so add and cancel the 2e⁻.', af: 'Die elektrone is reeds gelyk (2 verloor, 2 gekry), dus tel op en kanselleer die 2e⁻.' } },
    ] },
  };
  const HRK = ['MnFe', 'CrI', 'ZnCu'];

  const S = { mode: 'disp', m: 'Zn', s: 'Cu', prog: MLX.reducedMotion ? 1 : 0, t: 0, f: 'MnO4', st: 0, hr: 'MnFe', hs: 0 };

  const ui = MLX.layout(root, { height: (w) => {
    if (S.mode === 'disp') return w < 640 ? 660 : 430;
    if (S.mode === 'on') return w < 640 ? 440 : 380;
    return w < 640 ? 470 : 400;
  }, ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.react, unit: '' });
  const primTitle = prim.el.querySelector('.mlx-card-title');
  const box = {};
  ['disp', 'on', 'half'].forEach(m => { box[m] = MLX.h('div'); prim.el.appendChild(box[m]); });
  const roD = MLX.readout(box.disp, [['ra', T.rRA], ['oa', T.rOA], ['ox', T.rOx], ['red', T.rRed], ['dE', T.rE]]);
  const roO = MLX.readout(box.on, [['q', T.rCharge], ['st', T.rStep]]);
  const roH = MLX.readout(box.half, [['ra', T.rRA], ['oa', T.rOA], ['st', T.rStep]]);

  const cMode = MLX.card(ui.side, null);
  MLX.seg(cMode, { label: T.show, options: [['disp', T.mD], ['on', T.mO], ['half', T.mH]], value: S.mode, onChange: (v) => { S.mode = v; update(); } });

  const cD = MLX.card(ui.side, null);
  const restart = () => { S.prog = MLX.reducedMotion ? 1 : 0; };
  MLX.seg(cD, { label: T.metal, options: Object.keys(MET).map(k => [k, k]), value: S.m, onChange: (v) => { S.m = v; restart(); update(); } });
  MLX.seg(cD, { label: T.sol, options: Object.keys(SOLS).map(k => [k, SOLS[k].lab]), value: S.s, onChange: (v) => { S.s = v; restart(); update(); } });
  const bd = MLX.h('div', { class: 'mlx-btns' }); cD.appendChild(bd);
  MLX.button(bd, T.again, () => { restart(); update(); }, 'primary');

  const cO = MLX.card(ui.side, T.form);
  MLX.seg(cO, { options: ONK.map(k => [k, ONF[k].f]), value: S.f, onChange: (v) => { S.f = v; S.st = 0; update(); } });
  const bo = MLX.h('div', { class: 'mlx-btns' }); cO.appendChild(bo);
  const bNext = MLX.button(bo, T.next, () => { S.st = Math.min(ONF[S.f].steps.length, S.st + 1); update(); }, 'primary');
  MLX.button(bo, T.all, () => { S.st = ONF[S.f].steps.length; update(); });
  MLX.button(bo, T.reset, () => { S.st = 0; update(); });

  const cH = MLX.card(ui.side, T.rx);
  MLX.seg(cH, { options: HRK.map(k => [k, HR[k].lab]), value: S.hr, onChange: (v) => { S.hr = v; S.hs = 0; update(); } });
  const bh = MLX.h('div', { class: 'mlx-btns' }); cH.appendChild(bh);
  const bHNext = MLX.button(bh, T.next, () => { S.hs = Math.min(HR[S.hr].steps.length, S.hs + 1); update(); }, 'primary');
  MLX.button(bh, T.all, () => { S.hs = HR[S.hr].steps.length; update(); });
  MLX.button(bh, T.reset, () => { S.hs = 0; update(); });

  let lastCapKey = '';
  MLX.loop(ui.cv.el, (dt) => {
    if (S.mode !== 'disp' || MLX.reducedMotion) return;
    S.t += dt;
    if (rxn().ok && S.prog < 1) { S.prog = Math.min(1, S.prog + dt / 14); const k = S.prog < 0.08 ? 'a' : S.prog < 1 ? 'b' : 'c'; if (k !== lastCapKey) { lastCapKey = k; update(true); } }
    ui.cv.draw();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  const colOx = () => c.light ? '#a85a00' : '#f5b23d';
  const colRed = () => c.light ? '#1d5fbf' : '#74a9ff';
  const colE = () => c.light ? '#0f7a3a' : '#5fd38a';
  const rgb = (q, a) => 'rgba(' + q[0] + ',' + q[1] + ',' + q[2] + ',' + (a == null ? 1 : a) + ')';
  const fontOf = (sz, wt) => (wt || 500) + ' ' + sz + 'px "Cabinet Grotesk", sans-serif';

  // equation text with electrons coloured; returns width. align: 'left' | 'center'
  function eqText(s, x, y, size, align, col, wt) {
    const parts = s.split(/(\d*e⁻)/).filter(Boolean);
    ctx.font = fontOf(size, wt || 600);
    const w = parts.reduce((a, p) => a + ctx.measureText(p).width, 0);
    let xx = align === 'center' ? x - w / 2 : x;
    parts.forEach(p => {
      const isE = /e⁻$/.test(p);
      text(ctx, p, xx, y, { size, weight: wt || 600, color: isE ? colE() : col, base: 'middle' });
      ctx.font = fontOf(size, wt || 600); xx += ctx.measureText(p).width;
    });
    return w;
  }
  function fitSize(s, maxW, size, min) {
    let sz = size;
    for (; sz > (min || 12); sz--) { ctx.font = fontOf(sz, 600); if (ctx.measureText(s).width <= maxW) break; }
    return sz;
  }

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.mode === 'disp') drawDisp(W, H); else if (S.mode === 'on') drawOn(W, H); else drawHalf(W, H);
  }

  // ── 1. drawing: beaker + zoom + table
  function drawDisp(W, H) {
    const r = rxn(), ph = W < 640, p = r.ok ? S.prog : 0;
    const bwZone = ph ? W * 0.5 : W * 0.34, topH = ph ? 330 : H;
    // beaker
    const bw = Math.min(bwZone - 50, 190), bh = Math.min(topH - (ph ? 150 : 130), 220), bx = (bwZone - bw) / 2 + (ph ? 6 : 10), by = 92;
    const liq = by + bh * 0.16;
    // solution colour: Cu²⁺ blue, Fe²⁺ pale green, others colourless
    const tint = (ion) => ion === 'Cu²⁺' ? [44, 112, 224] : ion === 'Fe²⁺' ? [120, 196, 120] : null;
    ctx.fillStyle = c.water; ctx.fillRect(bx + 2, liq, bw - 4, by + bh - liq - 2);
    const tS = tint(r.s.ion), tP = r.ok ? tint(r.m.ion) : null;
    if (tS) { ctx.fillStyle = rgb(tS, (tS[0] === 44 ? 0.55 : 0.32) * (1 - 0.88 * p)); ctx.fillRect(bx + 2, liq, bw - 4, by + bh - liq - 2); }
    if (tP) { ctx.fillStyle = rgb(tP, (tP[0] === 44 ? 0.55 : 0.32) * 0.88 * p); ctx.fillRect(bx + 2, liq, bw - 4, by + bh - liq - 2); }
    ctx.strokeStyle = c.glass; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(bx - 7, by); ctx.lineTo(bx, by + 4); ctx.lineTo(bx, by + bh - 6); ctx.quadraticCurveTo(bx, by + bh, bx + 6, by + bh);
    ctx.lineTo(bx + bw - 6, by + bh); ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw, by + bh - 6); ctx.lineTo(bx + bw, by + 4); ctx.lineTo(bx + bw + 7, by); ctx.stroke();
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx + 2, liq); ctx.lineTo(bx + bw - 2, liq); ctx.stroke();
    // metal strip, hanging into the solution
    const sx = bx + bw * 0.42, sw0 = 26, stTop = by - 56, stBot = by + bh - 26;
    const swI = sw0 * (1 - 0.3 * p);
    ctx.fillStyle = rgb(r.m.col); ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1;
    ctx.fillRect(sx - sw0 / 2, stTop, sw0, liq - stTop); ctx.strokeRect(sx - sw0 / 2, stTop, sw0, liq - stTop);
    // immersed part: thinner as it dissolves, edge slightly ragged
    ctx.beginPath(); ctx.moveTo(sx - sw0 / 2, liq);
    for (let y = liq; y <= stBot; y += 6) ctx.lineTo(sx - swI / 2 + (p > 0 ? Math.sin(y * 1.7) * 1.5 * p : 0), y);
    for (let y = stBot; y >= liq; y -= 6) ctx.lineTo(sx + swI / 2 - (p > 0 ? Math.cos(y * 1.3) * 1.5 * p : 0), y);
    ctx.lineTo(sx + sw0 / 2, liq); ctx.closePath(); ctx.fill(); ctx.stroke();
    // deposit or gas
    if (r.ok && r.s.prod !== 'H₂') {
      const dc = MET[r.s.prod].col; let sd = 3;
      const rnd = () => { sd = (sd * 9301 + 49297) % 233280; return sd / 233280; };
      ctx.fillStyle = rgb(dc); ctx.strokeStyle = c.light ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.45)';
      for (let i = 0; i < 46; i++) {
        const side = i % 2 ? 1 : -1, y = liq + 8 + rnd() * (stBot - liq - 6), rr = (2 + rnd() * 3.5) * Math.min(1, p * 1.6);
        if (rr < 0.4) continue;
        ctx.beginPath(); ctx.arc(sx + side * (swI / 2 + rr * 0.4), y, rr, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      if (p > 0.05) { ctx.beginPath(); ctx.arc(sx, stBot + 2 + 3 * p, 3 + 5 * p, 0, Math.PI); ctx.fill(); }
    } else if (r.ok) {
      ctx.strokeStyle = c.text2; ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const ph2 = ((S.t * 0.45 + i / 12) % 1), y = stBot - ph2 * (stBot - liq - 4), x = sx + (i % 2 ? 1 : -1) * (swI / 2 + 4 + (i % 3) * 3);
        ctx.beginPath(); ctx.arc(x, y, 2 + (i % 3), 0, Math.PI * 2); ctx.stroke();
      }
    }
    // labels
    const lab = (s, x, y, tx, ty, col) => { ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tx, ty); ctx.stroke(); text(ctx, s, tx - 4, ty + 4, { size: 12, align: 'right', color: col || c.text2 }); };
    text(ctx, L(r.m.n) + L(T.strip) + ' (' + S.m + ')', sx, stTop - 10, { size: 12, align: 'center', color: c.text2 });
    text(ctx, r.s.lab + '(aq)', bx + bw / 2, by + bh + 20, { size: 12, align: 'center', color: c.text2 });
    if (r.ok && p > 0.15) {
      if (r.s.prod === 'H₂') text(ctx, L(T.gas), bx + bw / 2, by + bh + 36, { size: 12, align: 'center', color: c.text3 });
      else text(ctx, L(MET[r.s.prod].n) + L(T.dep) + ' (' + r.s.prod + ')', bx + bw / 2, by + bh + 36, { size: 12, align: 'center', color: c.text3 });
    }
    void lab;
    // zoom box
    const zx = ph ? W * 0.5 + 4 : bwZone + 8, zw = ph ? W * 0.5 - 14 : W * 0.28, zy = ph ? 40 : 52, zh = ph ? 270 : Math.min(300, H - 90);
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(sx + swI / 2 + 2, liq + 50); ctx.lineTo(zx, zy + 20); ctx.moveTo(sx + swI / 2 + 2, liq + 70); ctx.lineTo(zx, zy + zh - 20); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = c.stage; MLX.roundRect(ctx, zx, zy, zw, zh, 10); ctx.fill(); ctx.strokeStyle = c.lineHard; ctx.stroke();
    text(ctx, T.zoom, zx + zw / 2, zy - 8, { size: 12, align: 'center', color: c.text2 });
    zoom(zx, zy, zw, zh, r);
    // table of standard reduction potentials
    if (ph) { ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(14, topH + 0.5); ctx.lineTo(W - 14, topH + 0.5); ctx.stroke(); }
    const tx0 = ph ? 14 : zx + zw + 22, tx1 = W - 14, ty0 = ph ? topH + 34 : 52, th = ph ? H - topH - 64 : H - 110;
    table(tx0, ty0, tx1 - tx0, th, r);
  }

  function zoom(x0, y0, w, h, r) {
    const surf = x0 + w * 0.36, R = Math.min(15, w * 0.07);
    // metal lattice
    const rows = 5, dy = (h - 40) / rows, oy = y0 + 20 + dy / 2;
    ctx.fillStyle = c.light ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'; ctx.fillRect(x0 + 1, y0 + 1, surf - x0 + R * 0.2, h - 2);
    const atom = (x, y, col, lab, ring) => {
      ctx.fillStyle = rgb(col); ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = ring || (c.light ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.5)'); ctx.lineWidth = ring ? 2 : 1; ctx.stroke();
      const dark = (col[0] * 0.3 + col[1] * 0.59 + col[2] * 0.11) > 150;
      text(ctx, lab, x, y + 0.5, { size: 12, weight: 700, align: 'center', base: 'middle', color: dark ? '#16181d' : '#ffffff' });
    };
    const ion = (x, y, lab, col) => {
      ctx.fillStyle = c.stage; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      text(ctx, lab, x, y + 0.5, { size: 12, weight: 700, align: 'center', base: 'middle', color: col });
    };
    const ax = (col) => surf - R - col * (2 * R + 2);
    for (let i = 0; i < rows; i++) for (let k = 0; k < 2; k++) if (!(i === 0 && k === 0)) atom(ax(k), oy + i * dy, r.m.col, S.m);
    const cyc = MLX.reducedMotion ? 0.45 : (S.t % 3.2) / 3.2;
    if (!r.ok) {
      atom(ax(0), oy, r.m.col, S.m);
      for (let i = 0; i < 3; i++) ion(surf + R * 2.6 + (i % 2) * R * 2.2, oy + dy * (0.6 + i * 1.5) + (MLX.reducedMotion ? 0 : Math.sin(S.t + i) * 3), r.s.ion, colRed());
      text(ctx, T.noT, x0 + w / 2, y0 + h - 10, { size: 12, align: 'center', color: c.text3 });
      return;
    }
    // ions that will be reduced, sitting against the surface
    const n = r.nIons, sites = n === 1 ? [oy + dy * 3] : [oy + dy * 2.6, oy + dy * 3.9];
    const eEach = r.Lc / n;
    const moveP = Math.max(0, Math.min(1, (cyc - 0.12) / 0.45)), after = cyc > 0.6;
    // oxidised atom: leaves as an ion after giving its electrons
    const ox0 = ax(0), oyA = oy;
    if (!after) atom(ox0, oyA, r.m.col, S.m, colOx());
    else { const f = (cyc - 0.6) / 0.4; ion(ox0 + f * w * 0.42 + R * 2, oyA + f * 4, r.m.ion, colOx()); }
    // electron path (dashed) and moving electrons
    ctx.strokeStyle = colE(); ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]);
    sites.forEach(sy => { ctx.beginPath(); ctx.moveTo(ox0, oyA + R); ctx.lineTo(surf - R * 0.3, oyA + R + 6); ctx.lineTo(surf - R * 0.3, sy); ctx.stroke(); });
    ctx.setLineDash([]);
    text(ctx, r.Lc + 'e⁻', surf + 5, oyA + dy * 1.1, { size: 12, weight: 700, color: colE() });
    if (!after) {
      sites.forEach((sy, si) => {
        for (let e = 0; e < eEach; e++) {
          const q = Math.max(0, Math.min(1, moveP - e * 0.12));
          const pts = [[ox0, oyA + R], [surf - R * 0.3, oyA + R + 6], [surf - R * 0.3, sy]];
          const seg1 = q < 0.4 ? q / 0.4 : 1, seg2 = q < 0.4 ? 0 : (q - 0.4) / 0.6;
          const ex = seg2 ? pts[1][0] : pts[0][0] + (pts[1][0] - pts[0][0]) * seg1;
          const ey = seg2 ? pts[1][1] + (pts[2][1] - pts[1][1]) * seg2 : pts[0][1] + (pts[1][1] - pts[0][1]) * seg1;
          ctx.fillStyle = colE(); ctx.beginPath(); ctx.arc(ex + 3 * si, ey, 4, 0, Math.PI * 2); ctx.fill();
        }
      });
    }
    // receiving ions → atoms (or H₂)
    sites.forEach((sy, si) => {
      const xS = surf + R + 1;
      if (!after) ion(xS, sy, r.s.ion, colRed());
      else if (r.s.prod === 'H₂') { const f = (cyc - 0.6) / 0.4; const hx = xS + R * 0.6, hy = (sites[0] + sites[1]) / 2 - f * dy * 2.2; if (si === 0) { atom(hx - R * 0.55, hy, [235, 238, 242], 'H'); atom(hx + R * 0.55, hy, [235, 238, 242], 'H'); text(ctx, 'H₂', hx + R * 1.9, hy + 4, { size: 12, weight: 700, color: c.text }); } }
      else atom(xS, sy, MET[r.s.prod].col, r.s.prod, colRed());
    });
    // other ions in solution (not yet reacting)
    [[0.8, 1.5], [0.74, 3.0], [0.86, 4.5]].forEach(([fx, fy], i) => ion(x0 + w * fx, y0 + 20 + dy * fy + (MLX.reducedMotion ? 0 : Math.sin(S.t * 0.8 + i) * 3), r.s.ion, colRed()));
    // half-reaction captions in the zoom
    const fs = fitSize(r.ox, w - 16, 13);
    eqText(r.ox, x0 + w / 2, y0 + 12 + 2, fs, 'center', colOx());
    const fs2 = fitSize(r.red, w - 16, 13);
    eqText(r.red, x0 + w / 2, y0 + h - 10, fs2, 'center', colRed());
  }

  function table(x0, y0, w, h, r) {
    text(ctx, T.table, x0, y0 - 18, { size: 13, weight: 700, color: c.text });
    const n = TABLE.length, rh = Math.min(38, (h - 30) / n), ax = 18;
    const iS = TABLE.findIndex(t => t[0] === S.s), iM = TABLE.findIndex(t => t[0] === S.m);
    // side arrows
    ctx.strokeStyle = c.text3; ctx.fillStyle = c.text3; ctx.lineWidth = 1.5;
    const yA = y0 + 4, yB = y0 + n * rh - 4;
    ctx.beginPath(); ctx.moveTo(x0 + 6, yB); ctx.lineTo(x0 + 6, yA); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0 + 6, yA - 2); ctx.lineTo(x0 + 1, yA + 7); ctx.lineTo(x0 + 11, yA + 7); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x0 + w - 6, yA); ctx.lineTo(x0 + w - 6, yB); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0 + w - 6, yB + 2); ctx.lineTo(x0 + w - 11, yB - 7); ctx.lineTo(x0 + w - 1, yB - 7); ctx.closePath(); ctx.fill();
    TABLE.forEach(([k, eq, E], i) => {
      const y = y0 + i * rh, cy = y + rh / 2;
      const isS = i === iS, isM = i === iM;
      if (isS || isM) {
        ctx.fillStyle = isS && isM ? c.lineSoft : (isS ? (c.light ? 'rgba(29,95,191,0.08)' : 'rgba(116,169,255,0.10)') : (c.light ? 'rgba(168,90,0,0.08)' : 'rgba(245,178,61,0.10)'));
        ctx.fillRect(x0 + ax, y + 2, w - 2 * ax, rh - 4);
      }
      ctx.strokeStyle = c.lineSoft; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 + ax, y + rh); ctx.lineTo(x0 + w - ax, y + rh); ctx.stroke();
      const fs = Math.min(14, Math.max(12, rh * 0.42));
      const parts = eq.split(' ⇌ ');
      const colL = isS ? colRed() : c.text, colR = isM ? colOx() : c.text;
      ctx.font = fontOf(fs, 600);
      const wl = ctx.measureText(parts[0]).width;
      const xEq = x0 + ax + 8;
      eqText(parts[0], xEq, cy, fs, 'left', colL, isS ? 700 : 500);
      text(ctx, '⇌', xEq + wl + 6, cy, { size: fs, base: 'middle', color: c.text3 });
      ctx.font = fontOf(fs, 600);
      const wa = ctx.measureText('⇌').width;
      text(ctx, parts[1], xEq + wl + 12 + wa, cy, { size: fs, weight: isM ? 700 : 500, base: 'middle', color: colR });
      text(ctx, (E > 0 ? '+' : '') + num(E, 2), x0 + w - ax - 8, cy, { size: 12, mono: true, align: 'right', base: 'middle', color: c.text2 });
    });
    // arrows' captions and the verdict
    const yb = y0 + n * rh + 20;
    text(ctx, '↑ ' + L(T.strOA) + ' (' + L({ en: 'left', af: 'links' }) + ')', x0, yb, { size: 12, color: c.text3 });
    text(ctx, '↓ ' + L(T.strRA) + ' (' + L({ en: 'right', af: 'regs' }) + ')', x0, yb + 16, { size: 12, color: c.text3 });
    const verdict = S.m === S.s ? L({ en: 'Same metal and ion: no net reaction.', af: 'Dieselfde metaal en ioon: geen netto reaksie.' })
      : r.s.ion + (r.ok ? ' ' + L(T.above) : ' ' + L(T.below)) + ' (' + L({ en: 'vs', af: 'teen' }) + ' ' + S.m + ')';
    ctx.font = fontOf(13, 600);
    MLX.wrap(ctx, verdict, w).forEach((ln, i) => text(ctx, ln, x0, yb + 40 + i * 17, { size: 13, weight: 600, color: r.ok ? colE() : c.text2 }));
  }

  // ── 2. oxidation numbers
  function drawOn(W, H) {
    const F = ONF[S.f], ph = W < 640;
    const shown = new Set(); let rule = -1;
    F.steps.slice(0, S.st).forEach(s => { s.show.forEach(x => shown.add(x)); rule = s.r; });
    // formula, big
    const size = ph ? 40 : 52, subS = size * 0.55;
    ctx.font = fontOf(size, 700);
    const segs = F.els.map(([sym, n]) => { ctx.font = fontOf(size, 700); const ws = ctx.measureText(sym).width; ctx.font = fontOf(subS, 700); const wn = n > 1 ? ctx.measureText(String(n)).width + 2 : 0; return { sym, n, ws, wn }; });
    const qs = F.q ? (Math.abs(F.q) > 1 ? Math.abs(F.q) : '') + (F.q < 0 ? '−' : '+') : '';
    ctx.font = fontOf(subS, 700); const wq = qs ? ctx.measureText(qs).width + 4 : 0;
    const gap = size * 0.12;
    const tot = segs.reduce((a, s) => a + s.ws + s.wn + gap, 0) + wq;
    let x = (W - tot) / 2; const y = ph ? 140 : 150;
    segs.forEach(s => {
      text(ctx, s.sym, x, y, { size, weight: 700, color: c.ink });
      if (s.n > 1) text(ctx, String(s.n), x + s.ws + 1, y + subS * 0.35, { size: subS, weight: 700, color: c.ink });
      // ON badge above the symbol
      const bxm = x + s.ws / 2, byy = y - size - 22, known = shown.has(s.sym);
      const v = F.on[s.sym], vs = known ? (v > 0 ? '+' + v : v < 0 ? '−' + Math.abs(v) : '0') : '?';
      const col = known ? (s.sym === F.u ? c.accent : colRed()) : c.text3;
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.fillStyle = c.stage;
      MLX.roundRect(ctx, bxm - 24, byy - 17, 48, 34, 8); ctx.fill(); ctx.stroke();
      text(ctx, vs, bxm, byy + 1, { size: 18, weight: 700, mono: true, align: 'center', base: 'middle', color: col });
      ctx.strokeStyle = c.lineSoft; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bxm, byy + 17); ctx.lineTo(bxm, y - size * 0.78); ctx.stroke();
      x += s.ws + s.wn + gap;
    });
    if (qs) text(ctx, qs, x - gap + 2, y - size * 0.55, { size: subS, weight: 700, color: c.ink });
    // steps so far
    let ly = y + (ph ? 38 : 46);
    ctx.font = fontOf(14, 500);
    F.steps.slice(0, S.st).forEach((s, i) => {
      const lines = MLX.wrap(ctx, (i + 1) + '.  ' + L(s.t), W - 40);
      lines.forEach(ln => { text(ctx, ln, 20, ly, { size: 14, color: i === S.st - 1 ? c.text : c.text2, weight: i === S.st - 1 ? 600 : 500 }); ly += 19; });
      ctx.font = fontOf(14, 500); ly += 4;
    });
    if (S.st === 0) text(ctx, L({ en: 'Work out each oxidation number, then press Next step.', af: 'Werk elke oksidasiegetal uit en druk dan Volgende stap.' }), 20, ly, { size: 14, color: c.text3 });
    // rules list, active one highlighted (desktop: right column under; phone: bottom)
    const ry = H - T.R.length * 17 - 10;
    if (ly < ry - 10) {
      text(ctx, T.rules, 20, ry - 8, { size: 12, weight: 700, color: c.text3 });
      T.R.forEach((rl, i) => text(ctx, rl, 20, ry + 8 + i * 17, { size: 12, weight: i === rule ? 700 : 500, color: i === rule ? c.accent : c.text3 }));
    }
  }

  // ── 3. half-reaction method
  function drawHalf(W, H) {
    const R = HR[S.hr], ph = W < 640;
    let ox = null, red = null, all = null;
    R.steps.slice(0, S.hs).forEach(s => { if (s.ox) ox = s.ox; if (s.red) red = s.red; if (s.all) all = s.all; });
    const pad = 14, bw = ph ? W - 2 * pad : (W - 3 * pad) / 2, bh = ph ? 104 : 130;
    const boxes = ph ? [[pad, 16], [pad, 16 + bh + 14]] : [[pad, 20], [2 * pad + bw, 20]];
    const drawBox = ([x, y], title, who, eq, col) => {
      ctx.strokeStyle = col; ctx.lineWidth = 1.5; MLX.roundRect(ctx, x, y, bw, bh, 10); ctx.stroke();
      text(ctx, title, x + 12, y + 22, { size: 13, weight: 700, color: col });
      text(ctx, who, x + 12, y + 40, { size: 12, color: c.text2 });
      if (eq) { const fs = fitSize(eq, bw - 24, ph ? 17 : 19); eqText(eq, x + bw / 2, y + bh * 0.68, fs, 'center', c.ink); }
      else text(ctx, T.pending, x + bw / 2, y + bh * 0.68, { size: 18, align: 'center', base: 'middle', color: c.text3 });
    };
    drawBox(boxes[0], L(T.oxBox), R.ra + ' = ' + L(T.isRA), ox, colOx());
    drawBox(boxes[1], L(T.redBox), R.oa + ' = ' + L(T.isOA), red, colRed());
    // overall
    const oy = ph ? 16 + 2 * bh + 28 : 20 + bh + 22, oh = ph ? 96 : 100;
    ctx.strokeStyle = all ? c.accent : c.lineHard; ctx.lineWidth = 1.5; MLX.roundRect(ctx, pad, oy, W - 2 * pad, oh, 10); ctx.stroke();
    text(ctx, T.allBox, pad + 12, oy + 22, { size: 13, weight: 700, color: all ? c.accent : c.text2 });
    if (all) { const fs = fitSize(all, W - 2 * pad - 24, ph ? 16 : 20); eqText(all, W / 2, oy + oh * 0.62, fs, 'center', c.ink, 700); }
    else text(ctx, T.pending, W / 2, oy + oh * 0.62, { size: 18, align: 'center', base: 'middle', color: c.text3 });
    // electron balance line
    const ey = oy + oh + 30;
    const nOx = ox ? +((ox.match(/(\d*)e⁻/) || [0, ''])[1] || 1) : 0, nRed = red && /e⁻/.test(red) ? +((red.match(/(\d*)e⁻/) || [0, ''])[1] || 1) : 0;
    if (ox || red) {
      const okE = nOx && nRed && nOx === nRed;
      const s = L({ en: 'e⁻ lost: ', af: 'e⁻ verloor: ' }) + (nOx || '?') + '    ' + L({ en: 'e⁻ gained: ', af: 'e⁻ gekry: ' }) + (nRed || '?') + (okE ? L({ en: '    equal: they cancel', af: '    gelyk: hulle kanselleer' }) : '');
      text(ctx, s, pad + 4, ey, { size: 13, weight: 600, color: okE ? colE() : c.text2 });
    }
  }

  function update(capOnly) {
    ['disp', 'on', 'half'].forEach(m => { box[m].style.display = S.mode === m ? '' : 'none'; });
    cD.style.display = S.mode === 'disp' ? '' : 'none';
    cO.style.display = S.mode === 'on' ? '' : 'none';
    cH.style.display = S.mode === 'half' ? '' : 'none';
    let aria;
    if (S.mode === 'disp') {
      const r = rxn();
      primTitle.textContent = L(T.react);
      prim.set(L(r.ok ? T.yes : T.no));
      roD.set('ra', r.ok ? S.m + ' (0 → +' + r.m.q + ')' : '—', r.ok ? colOxCSS() : '');
      roD.set('oa', r.ok ? r.s.ion + ' (+' + r.s.q + ' → 0)' : '—', r.ok ? colRedCSS() : '');
      roD.set('ox', r.ok ? r.ox : '—');
      roD.set('red', r.ok ? r.red : '—');
      roD.set('dE', (r.dE > 0 ? '+' : '') + num(r.dE, 2) + ' V');
      let cap;
      if (S.m === S.s) cap = { en: 'A metal in a solution of its own ions: atoms lose and ions gain electrons equally fast, so there is no visible change.', af: '\'n Metaal in \'n oplossing van sy eie ione: atome verloor en ione kry ewe vinnig elektrone, dus is daar geen sigbare verandering nie.' };
      else if (!r.ok) cap = { en: r.s.ion + ' is lower than ' + S.m + ' on the table, so it is too weak an oxidising agent to take electrons from ' + S.m + ': no reaction.', af: r.s.ion + ' is laer as ' + S.m + ' op die tabel, dus is dit \'n te swak oksideermiddel om elektrone van ' + S.m + ' af te neem: geen reaksie.' };
      else {
        const prodEn = r.s.prod === 'H₂' ? 'H⁺ ions gain them (reduced) and form hydrogen gas' : r.s.ion + ' ions gain them (reduced) and ' + MET[r.s.prod].n.en + ' metal is deposited on the strip';
        const prodAf = r.s.prod === 'H₂' ? 'H⁺-ione kry hulle (gereduseer) en vorm waterstofgas' : r.s.ion + '-ione kry hulle (gereduseer) en ' + MET[r.s.prod].n.af + ' word op die strook neergelê';
        let colEn = '', colAf = '';
        if (r.s.ion === 'Cu²⁺') { colEn = ' The blue colour fades as Cu²⁺ is used up.'; colAf = ' Die blou kleur verdof soos Cu²⁺ opgebruik word.'; }
        else if (r.s.ion === 'Fe²⁺') { colEn = ' The pale green colour fades as Fe²⁺ is used up.'; colAf = ' Die liggroen kleur verdof soos Fe²⁺ opgebruik word.'; }
        if (r.m.ion === 'Cu²⁺') { colEn += ' The solution turns blue as Cu²⁺ forms.'; colAf += ' Die oplossing word blou soos Cu²⁺ vorm.'; }
        else if (r.m.ion === 'Fe²⁺') { colEn += ' The solution turns pale green as Fe²⁺ forms.'; colAf += ' Die oplossing word liggroen soos Fe²⁺ vorm.'; }
        cap = { en: S.m + ' atoms lose electrons (oxidised) and dissolve as ' + r.m.ion + '; ' + prodEn + '.' + colEn,
          af: S.m + '-atome verloor elektrone (geoksideer) en los op as ' + r.m.ion + '; ' + prodAf + '.' + colAf };
      }
      ui.setCaption(cap);
      aria = S.m + ' + ' + r.s.lab + ': ' + (r.ok ? r.all : L(T.no)) + '.';
      if (capOnly) return;
    } else if (S.mode === 'on') {
      const F = ONF[S.f], v = F.on[F.u], done = S.st >= F.steps.length;
      primTitle.textContent = L(T.onOf) + ' ' + F.u;
      prim.set(done ? (v > 0 ? '+' + v : v < 0 ? '−' + Math.abs(v) : '0') : '?');
      roO.set('q', F.q ? (F.q > 0 ? '+' : '−') + Math.abs(F.q) : '0');
      roO.set('st', S.st + ' ' + L(T.of) + ' ' + F.steps.length);
      bNext.disabled = done;
      ui.setCaption(S.st ? F.steps[S.st - 1].t : { en: 'Predict the oxidation number of every element in ' + F.f + ', then step through the rules to check.', af: 'Voorspel die oksidasiegetal van elke element in ' + F.f + ' en stap dan deur die reëls om te kontroleer.' });
      aria = F.f + ': ' + (done ? F.els.map(([s]) => s + ' ' + F.on[s]).join(', ') : '?');
    } else {
      const R = HR[S.hr], done = S.hs >= R.steps.length;
      primTitle.textContent = L(T.eT);
      prim.set(S.hs >= R.steps.length - 1 || done ? String(R.e) : '?');
      roH.set('ra', R.ra, colOxCSS()); roH.set('oa', R.oa, colRedCSS());
      roH.set('st', S.hs + ' ' + L(T.of) + ' ' + R.steps.length);
      bHNext.disabled = done;
      ui.setCaption(S.hs ? R.steps[S.hs - 1].n : { en: 'Press Next step to split ' + R.lab + ' into an oxidation and a reduction half-reaction and balance it.', af: 'Druk Volgende stap om ' + R.lab + ' in \'n oksidasie- en \'n reduksie-halfreaksie te verdeel en te balanseer.' });
      aria = R.lab + ': ' + L(T.rStep) + ' ' + S.hs;
    }
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + aria);
    ui.cv.draw();
  }
  function colOxCSS() { return document.documentElement.getAttribute('data-theme') === 'light' ? '#a85a00' : '#f5b23d'; }
  function colRedCSS() { return document.documentElement.getAttribute('data-theme') === 'light' ? '#1d5fbf' : '#74a9ff'; }
  MLX.onTheme(() => update());
  update();
});
