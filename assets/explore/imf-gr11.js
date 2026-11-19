/* Gr11 Intermolecular forces and physical properties. Four views of one idea: the forces BETWEEN molecules decide
 * how a substance behaves.
 *  1 Polarity: bond polarity (ΔEN, Pauling values as in the CAPS data sheet) + molecular shape (VSEPR) → polar or
 *    non-polar molecule → strongest intermolecular force. Bond dipole arrows point to the δ− end (crossed tail = δ+).
 *  2 Boiling points: real boiling points (°C, 101,3 kPa) of the group 14–17 hydrides, noble gases and halogens
 *    against period. A straight line through periods 3–5 extrapolated to period 2 shows how far hydrogen bonding
 *    lifts NH₃, H₂O and HF above the London-force trend.
 *  3 Properties: boiling point, vapour pressure, viscosity and surface tension of six liquids at 20 °C (CRC data).
 *  4 Solubility: like dissolves like; ion–dipole forces hydrate Na⁺ and Cl⁻ (δ− O faces Na⁺, δ+ H faces Cl⁻).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const deg = (v) => num(v, v % 1 ? 1 : 0) + ' °C';
  const EN = { H: 2.1, B: 2.0, C: 2.5, N: 3.0, O: 3.5, F: 4.0, S: 2.5, Cl: 3.0 };
  const IMF = {
    ldf: { en: 'London forces', af: 'Londonkragte' }, dd: { en: 'dipole–dipole forces', af: 'dipool-dipoolkragte' }, hb: { en: 'hydrogen bonds', af: 'waterstofbindings' },
  };
  const IMFS = { ldf: { en: 'London forces only', af: 'net Londonkragte' }, dd: { en: 'dipole–dipole + London', af: 'dipool-dipool + London' }, hb: { en: 'hydrogen bonds + dipole–dipole + London', af: 'waterstofbindings + dipool-dipool + London' } };
  const SHAPE = {
    di: { en: 'linear (diatomic)', af: 'lineêr (diatomies)' }, lin: { en: 'linear', af: 'lineêr' }, bent: { en: 'bent (angular)', af: 'hoekig (gebuig)' },
    pyr: { en: 'trigonal pyramidal', af: 'trigonaal piramidaal' }, tet: { en: 'tetrahedral', af: 'tetraëdries' }, pla: { en: 'trigonal planar', af: 'trigonaal planêr' },
  };
  // atoms [el, x, y] (unit = bond length, y down); bonds [i, j, style n|w|d, order]; c = central atom; lp = lone-pair directions (deg, 0 = right, −90 = up)
  // net = direction of the molecular dipole (towards δ−) or null; dl = direction for the central atom's δ label
  const MOL = {
    H2: { f: 'H₂', n: { en: 'Hydrogen', af: 'Waterstof' }, sh: 'di', atoms: [['H', -0.45, 0], ['H', 0.45, 0]], bonds: [[0, 1]], c: -1, net: null, bp: -253, M: 2, imf: 'ldf',
      note: { en: 'Identical atoms share the electrons equally, so there is no bond dipole at all.', af: 'Identiese atome deel die elektrone gelykop, dus is daar glad geen bindingsdipool nie.' } },
    HCl: { f: 'HCl', n: { en: 'Hydrogen chloride', af: 'Waterstofchloried' }, sh: 'di', atoms: [['H', -0.55, 0], ['Cl', 0.5, 0]], bonds: [[0, 1]], c: -1, net: [1, 0], bp: -85, M: 36.5, imf: 'dd',
      note: { en: 'One polar bond and nothing to cancel it, so the molecule is polar.', af: 'Een polêre binding en niks om dit op te hef nie, dus is die molekuul polêr.' } },
    HF: { f: 'HF', n: { en: 'Hydrogen fluoride', af: 'Waterstoffluoried' }, sh: 'di', atoms: [['H', -0.5, 0], ['F', 0.45, 0]], bonds: [[0, 1]], c: -1, net: [1, 0], bp: 19.5, M: 20, imf: 'hb',
      note: { en: 'H is bonded to very electronegative F, so HF molecules form hydrogen bonds.', af: 'H is aan baie elektronegatiewe F gebind, dus vorm HF-molekules waterstofbindings.' } },
    CO2: { f: 'CO₂', n: { en: 'Carbon dioxide', af: 'Koolstofdioksied' }, sh: 'lin', atoms: [['C', 0, 0], ['O', -1.05, 0], ['O', 1.05, 0]], bonds: [[0, 1, 'n', 2], [0, 2, 'n', 2]], c: 0, dl: 90, net: null, bp: null, M: 44, imf: 'ldf',
      note: { en: 'Two polar C=O bonds point in opposite directions and cancel, so CO₂ is non-polar.', af: 'Twee polêre C=O-bindings wys in teenoorgestelde rigtings en hef mekaar op, dus is CO₂ nie-polêr.' } },
    H2O: { f: 'H₂O', n: { en: 'Water', af: 'Water' }, sh: 'bent', atoms: [['O', 0, -0.3], ['H', -0.78, 0.3], ['H', 0.78, 0.3]], bonds: [[0, 1], [0, 2]], c: 0, lp: [-135, -45], dl: -90, net: [0, -1], bp: 100, M: 18, imf: 'hb',
      note: { en: 'The bent shape means the two bond dipoles add up: water is polar, and H on O gives hydrogen bonds.', af: 'Die hoekige vorm beteken die twee bindingsdipole tel op: water is polêr, en H aan O gee waterstofbindings.' } },
    H2S: { f: 'H₂S', n: { en: 'Hydrogen sulfide', af: 'Waterstofsulfied' }, sh: 'bent', atoms: [['S', 0, -0.3], ['H', -0.7, 0.38], ['H', 0.7, 0.38]], bonds: [[0, 1], [0, 2]], c: 0, lp: [-135, -45], dl: -90, net: [0, -1], bp: -60, M: 34, imf: 'dd',
      note: { en: 'Also bent and polar, but S is not electronegative enough for hydrogen bonds: only dipole–dipole forces.', af: 'Ook hoekig en polêr, maar S is nie elektronegatief genoeg vir waterstofbindings nie: net dipool-dipoolkragte.' } },
    NH3: { f: 'NH₃', n: { en: 'Ammonia', af: 'Ammoniak' }, sh: 'pyr', atoms: [['N', 0, -0.3], ['H', -0.85, 0.2], ['H', 0.28, 0.55, 'w'], ['H', 0.82, 0.08, 'd']], bonds: [[0, 1], [0, 2, 'w'], [0, 3, 'd']], c: 0, lp: [-90], dl: -150, net: [0, -1], bp: -33, M: 17, imf: 'hb',
      note: { en: 'The lone pair on N makes the pyramid unsymmetrical, so NH₃ is polar; H on N gives hydrogen bonds.', af: 'Die alleenpaar op N maak die piramide onsimmetries, dus is NH₃ polêr; H aan N gee waterstofbindings.' } },
    CH4: { f: 'CH₄', n: { en: 'Methane', af: 'Metaan' }, sh: 'tet', atoms: [['C', 0, 0], ['H', 0, -1], ['H', -0.92, 0.36], ['H', 0.3, 0.86], ['H', 0.92, 0.3]], bonds: [[0, 1], [0, 2], [0, 3, 'w'], [0, 4, 'd']], c: 0, dl: -135, net: null, bp: -161.5, M: 16, imf: 'ldf',
      note: { en: 'Four C–H bond dipoles point to the corners of a regular tetrahedron and cancel.', af: 'Vier C–H-bindingsdipole wys na die hoeke van \'n reëlmatige tetraëder en hef mekaar op.' } },
    CHCl3: { f: 'CHCl₃', n: { en: 'Trichloromethane', af: 'Trichlorometaan' }, sh: 'tet', atoms: [['C', 0, 0], ['H', 0, -1], ['Cl', -0.92, 0.36], ['Cl', 0.3, 0.86], ['Cl', 0.92, 0.3]], bonds: [[0, 1], [0, 2], [0, 3, 'w'], [0, 4, 'd']], c: 0, dl: -135, net: [0, 1], bp: 61, M: 119.5, imf: 'dd',
      note: { en: 'One C–H bond in place of a C–Cl bond: the tetrahedron is no longer symmetrical, so CHCl₃ is polar.', af: 'Een C–H-binding in die plek van \'n C–Cl-binding: die tetraëder is nie meer simmetries nie, dus is CHCl₃ polêr.' } },
    CCl4: { f: 'CCl₄', n: { en: 'Tetrachloromethane', af: 'Tetrachlorometaan' }, sh: 'tet', atoms: [['C', 0, 0], ['Cl', 0, -1], ['Cl', -0.92, 0.36], ['Cl', 0.3, 0.86], ['Cl', 0.92, 0.3]], bonds: [[0, 1], [0, 2], [0, 3, 'w'], [0, 4, 'd']], c: 0, dl: -135, net: null, bp: 77, M: 154, imf: 'ldf',
      note: { en: 'Non-polar, yet CCl₄ boils higher than polar CHCl₃: its larger electron cloud gives stronger London forces.', af: 'Nie-polêr, tog kook CCl₄ hoër as polêre CHCl₃: sy groter elektronwolk gee sterker Londonkragte.' } },
    BF3: { f: 'BF₃', n: { en: 'Boron trifluoride', af: 'Boortrifluoried' }, sh: 'pla', atoms: [['B', 0, 0], ['F', 0, -1], ['F', -0.87, 0.5], ['F', 0.87, 0.5]], bonds: [[0, 1], [0, 2], [0, 3]], c: 0, dl: -30, net: null, bp: -100, M: 68, imf: 'ldf',
      note: { en: 'Three very polar B–F bonds at 120° in one plane cancel, so BF₃ is non-polar.', af: 'Drie baie polêre B–F-bindings teen 120° in een vlak hef mekaar op, dus is BF₃ nie-polêr.' } },
  };
  const MORDER = ['H2', 'HCl', 'HF', 'CO2', 'H2O', 'H2S', 'NH3', 'CH4', 'CHCl3', 'CCl4', 'BF3'];
  // boiling-point series: [formula, period, bp °C, molar mass, strongest IMF]
  const SER = {
    g14: { n: { en: 'Group 14 hydrides', af: 'Groep 14-hidriede' }, b: { en: 'Gr 14', af: 'Gr 14' }, hyd: true, p: [['CH₄', 2, -161.5, 16, 'ldf'], ['SiH₄', 3, -111.9, 32, 'ldf'], ['GeH₄', 4, -88.5, 77, 'ldf'], ['SnH₄', 5, -52, 123, 'ldf']] },
    g15: { n: { en: 'Group 15 hydrides', af: 'Groep 15-hidriede' }, b: { en: 'Gr 15', af: 'Gr 15' }, hyd: true, p: [['NH₃', 2, -33.3, 17, 'hb'], ['PH₃', 3, -87.7, 34, 'dd'], ['AsH₃', 4, -62.5, 78, 'dd'], ['SbH₃', 5, -17, 125, 'dd']] },
    g16: { n: { en: 'Group 16 hydrides', af: 'Groep 16-hidriede' }, b: { en: 'Gr 16', af: 'Gr 16' }, hyd: true, p: [['H₂O', 2, 100, 18, 'hb'], ['H₂S', 3, -60, 34, 'dd'], ['H₂Se', 4, -41, 81, 'dd'], ['H₂Te', 5, -2, 130, 'dd']] },
    g17: { n: { en: 'Group 17 hydrides', af: 'Groep 17-hidriede' }, b: { en: 'Gr 17', af: 'Gr 17' }, hyd: true, p: [['HF', 2, 19.5, 20, 'hb'], ['HCl', 3, -85, 36.5, 'dd'], ['HBr', 4, -67, 81, 'dd'], ['HI', 5, -35, 128, 'dd']] },
    nob: { n: { en: 'Noble gases', af: 'Edelgasse' }, b: { en: 'Noble', af: 'Edel' }, p: [['He', 1, -269, 4, 'ldf'], ['Ne', 2, -246, 20, 'ldf'], ['Ar', 3, -186, 40, 'ldf'], ['Kr', 4, -153, 84, 'ldf'], ['Xe', 5, -108, 131, 'ldf']] },
    hal: { n: { en: 'Halogens', af: 'Halogene' }, b: { en: 'Halogens', af: 'Halogene' }, p: [['F₂', 2, -188, 38, 'ldf'], ['Cl₂', 3, -34, 71, 'ldf'], ['Br₂', 4, 59, 160, 'ldf'], ['I₂', 5, 184, 254, 'ldf']] },
  };
  const SORDER = ['g14', 'g15', 'g16', 'g17', 'nob', 'hal'];
  // liquids at 20 °C: bp (°C), vapour pressure (kPa), viscosity (mPa·s), surface tension (mN·m⁻¹)
  const LIQ = [
    { k: 'hex', n: { en: 'hexane', af: 'heksaan' }, f: 'C₆H₁₄', M: 86, imf: 'ldf', bp: 69, vp: 16.0, visc: 0.31, st: 18.4 },
    { k: 'eth', n: { en: 'diethyl ether', af: 'diëtieleter' }, f: '(C₂H₅)₂O', M: 74, imf: 'dd', bp: 34.6, vp: 58.7, visc: 0.23, st: 17.0 },
    { k: 'pro', n: { en: 'propanone', af: 'propanoon' }, f: '(CH₃)₂CO', M: 58, imf: 'dd', bp: 56, vp: 24.6, visc: 0.32, st: 23.7 },
    { k: 'etoh', n: { en: 'ethanol', af: 'etanol' }, f: 'C₂H₅OH', M: 46, imf: 'hb', bp: 78.4, vp: 5.9, visc: 1.20, st: 22.3 },
    { k: 'wat', n: { en: 'water', af: 'water' }, f: 'H₂O', M: 18, imf: 'hb', bp: 100, vp: 2.3, visc: 1.00, st: 72.8 },
    { k: 'gly', n: { en: 'glycerol', af: 'gliserol' }, f: 'C₃H₅(OH)₃', M: 92, imf: 'hb', bp: 290, vp: 0.0001, visc: 1412, st: 63.4 },
  ];
  const PROP = {
    bp: { n: { en: 'Boiling point', af: 'Kookpunt' }, u: '°C', max: 300, d: 0, t: { en: 'Boiling point (°C)', af: 'Kookpunt (°C)' } },
    vp: { n: { en: 'Vapour pressure at 20 °C', af: 'Dampdruk by 20 °C' }, u: 'kPa', max: 60, d: 1, t: { en: 'Vapour pressure at 20 °C (kPa)', af: 'Dampdruk by 20 °C (kPa)' } },
    visc: { n: { en: 'Viscosity at 20 °C', af: 'Viskositeit by 20 °C' }, u: 'mPa·s', max: 1.5, d: 2, t: { en: 'Viscosity at 20 °C (mPa·s)', af: 'Viskositeit by 20 °C (mPa·s)' } },
    st: { n: { en: 'Surface tension at 20 °C', af: 'Oppervlakspanning by 20 °C' }, u: 'mN·m⁻¹', max: 80, d: 1, t: { en: 'Surface tension at 20 °C (mN·m⁻¹)', af: 'Oppervlakspanning by 20 °C (mN·m⁻¹)' } },
  };
  // solubility: solute × solvent
  const SOLUTE = {
    nacl: { n: { en: 'sodium chloride', af: 'natriumchloried' }, s: 'NaCl', ty: { en: 'ionic', af: 'ionies' } },
    suc: { n: { en: 'sugar (sucrose)', af: 'suiker (sukrose)' }, s: { en: 'Sugar', af: 'Suiker' }, ty: { en: 'polar, O–H groups', af: 'polêr, O–H-groepe' } },
    i2: { n: { en: 'iodine', af: 'jodium' }, s: 'I₂', ty: { en: 'non-polar', af: 'nie-polêr' } },
    oil: { n: { en: 'cooking oil', af: 'kookolie' }, s: { en: 'Oil', af: 'Olie' }, ty: { en: 'non-polar', af: 'nie-polêr' } },
  };
  const SOLV = { wat: { n: { en: 'water', af: 'water' }, ty: { en: 'polar, hydrogen bonds', af: 'polêr, waterstofbindings' } }, hex: { n: { en: 'hexane', af: 'heksaan' }, ty: { en: 'non-polar', af: 'nie-polêr' } } };
  const SOL = {
    'nacl-wat': { ok: 1, r: { en: 'Dissolves', af: 'Los op' }, f: { en: 'ion–dipole forces', af: 'ioon-dipoolkragte' },
      cap: { en: 'Salt dissolves (about 36 g in 100 g of water at 20 °C): ion–dipole forces between the ions and the polar water molecules pull the ions out of the lattice. The δ− oxygen ends face Na⁺; the δ+ hydrogen ends face Cl⁻.', af: 'Sout los op (omtrent 36 g in 100 g water by 20 °C): ioon-dipoolkragte tussen die ione en die polêre watermolekules trek die ione uit die rooster. Die δ−-suurstofkante wys na Na⁺; die δ+-waterstofkante wys na Cl⁻.' } },
    'nacl-hex': { ok: 0, r: { en: 'Does not dissolve', af: 'Los nie op nie' }, f: { en: 'too weak to break the lattice', af: 'te swak om die rooster te breek' },
      cap: { en: 'Salt does not dissolve in hexane: non-polar hexane molecules cannot attract the ions strongly enough to break the ionic lattice.', af: 'Sout los nie in heksaan op nie: nie-polêre heksaanmolekules kan die ione nie sterk genoeg aantrek om die ioniese rooster te breek nie.' } },
    'suc-wat': { ok: 1, r: { en: 'Dissolves', af: 'Los op' }, f: { en: 'hydrogen bonds', af: 'waterstofbindings' },
      cap: { en: 'Sugar dissolves well (about 200 g in 100 g of water at 20 °C): its O–H groups form hydrogen bonds with water molecules. Like dissolves like.', af: 'Suiker los goed op (omtrent 200 g in 100 g water by 20 °C): sy O–H-groepe vorm waterstofbindings met watermolekules. Soort los soort op.' } },
    'suc-hex': { ok: 0, r: { en: 'Does not dissolve', af: 'Los nie op nie' }, f: { en: 'London forces only (too weak)', af: 'net Londonkragte (te swak)' },
      cap: { en: 'Sugar does not dissolve in hexane: sugar molecules hydrogen-bond to one another far more strongly than they could attract hexane molecules.', af: 'Suiker los nie in heksaan op nie: suikermolekules vorm baie sterker waterstofbindings met mekaar as wat hulle heksaanmolekules kan aantrek.' } },
    'i2-wat': { ok: 0, r: { en: 'Hardly dissolves', af: 'Los skaars op' }, f: { en: 'weak (London forces)', af: 'swak (Londonkragte)' },
      cap: { en: 'Iodine barely dissolves in water (about 0,03 g in 100 g): the water molecules hydrogen-bond to each other and keep the non-polar I₂ molecules out.', af: 'Jodium los skaars in water op (omtrent 0,03 g in 100 g): die watermolekules vorm waterstofbindings met mekaar en hou die nie-polêre I₂-molekules uit.' } },
    'i2-hex': { ok: 1, r: { en: 'Dissolves', af: 'Los op' }, f: { en: 'London forces', af: 'Londonkragte' },
      cap: { en: 'Iodine dissolves in hexane to give a violet solution: both are non-polar, and the London forces between I₂ and hexane are similar to the ones they replace.', af: 'Jodium los in heksaan op en gee \'n pers oplossing: albei is nie-polêr, en die Londonkragte tussen I₂ en heksaan is soortgelyk aan dié wat hulle vervang.' } },
    'oil-wat': { ok: 0, r: { en: 'Does not mix', af: 'Meng nie' }, f: { en: 'weak (London forces)', af: 'swak (Londonkragte)' },
      cap: { en: 'Oil and water are immiscible: the less dense oil floats as a separate layer, because water molecules attract each other by hydrogen bonds far more than they attract oil.', af: 'Olie en water is onmengbaar: die minder digte olie dryf as \'n aparte laag, want watermolekules trek mekaar deur waterstofbindings baie sterker aan as wat hulle olie aantrek.' } },
    'oil-hex': { ok: 1, r: { en: 'Mixes', af: 'Meng' }, f: { en: 'London forces', af: 'Londonkragte' },
      cap: { en: 'Oil mixes with hexane in all proportions: both are non-polar and held together by London forces. Like dissolves like.', af: 'Olie meng in alle verhoudings met heksaan: albei is nie-polêr en word deur Londonkragte saamgehou. Soort los soort op.' } },
  };
  const T = {
    aria: { en: 'Intermolecular forces explorer', af: 'Verkenner vir intermolekulêre kragte' },
    view: { en: 'View', af: 'Aansig' }, vPol: { en: 'Polarity', af: 'Polariteit' }, vBp: { en: 'Boiling points', af: 'Kookpunte' }, vProp: { en: 'Properties', af: 'Eienskappe' }, vSol: { en: 'Solubility', af: 'Oplosbaarheid' },
    mol: { en: 'Molecule', af: 'Molekuul' }, isA: { en: 'The molecule is', af: 'Die molekuul is' }, polar: { en: 'polar', af: 'polêr' }, nonpolar: { en: 'non-polar', af: 'nie-polêr' },
    shape: { en: 'Shape', af: 'Vorm' }, strong: { en: 'Forces between molecules', af: 'Kragte tussen molekules' }, bp: { en: 'Boiling point', af: 'Kookpunt' }, M: { en: 'Molar mass', af: 'Molêre massa' },
    subl: { en: 'sublimes at −78 °C', af: 'sublimeer by −78 °C' },
    s1: { en: '1  Bond polarity', af: '1  Bindingspolariteit' }, s2: { en: '2  Shape (VSEPR)', af: '2  Vorm (VSEOP)' }, s3: { en: '3  The molecule', af: '3  Die molekuul' },
    pb: { en: 'polar bond', af: 'polêre binding' }, wpb: { en: 'weakly polar bond', af: 'swak polêre binding' }, npb: { en: 'non-polar bond', af: 'nie-polêre binding' },
    sym: { en: 'symmetrical', af: 'simmetries' }, unsym: { en: 'not symmetrical', af: 'nie simmetries nie' },
    nb: { en: '{b} bonded atoms, {l} on {x}', af: '{b} gebonde atome, {l} op {x}' },
    lp0: { en: 'no lone pairs', af: 'geen alleenpare' }, lp1: { en: '1 lone pair', af: '1 alleenpaar' }, lp2: { en: '2 lone pairs', af: '2 alleenpare' },
    cancel: { en: 'Bond dipoles cancel → non-polar molecule', af: 'Bindingsdipole hef mekaar op → nie-polêre molekuul' },
    add: { en: 'Bond dipoles do not cancel → polar molecule', af: 'Bindingsdipole hef mekaar nie op nie → polêre molekuul' },
    none: { en: 'No bond dipoles → non-polar molecule', af: 'Geen bindingsdipole nie → nie-polêre molekuul' },
    net: { en: 'net dipole', af: 'netto dipool' }, noNet: { en: 'no net dipole', af: 'geen netto dipool nie' },
    lone: { en: 'lone pair', af: 'alleenpaar' }, wedge: { en: 'wedge: towards you, dashes: away from you', af: 'wig: na jou toe, strepies: weg van jou' },
    series: { en: 'Series', af: 'Reeks' }, member: { en: 'Substance', af: 'Stof' }, trend: { en: 'Show the trend from periods 3–5', af: 'Wys die tendens van periodes 3–5' },
    bpOf: { en: 'Boiling point of {f}', af: 'Kookpunt van {f}' }, pred: { en: 'Trend predicts', af: 'Tendens voorspel' },
    xP: { en: 'Period', af: 'Periode' }, yBp: { en: 'Boiling point (°C)', af: 'Kookpunt (°C)' }, trendL: { en: 'trend ≈ {v}', af: 'tendens ≈ {v}' },
    prop: { en: 'Property', af: 'Eienskap' }, liq: { en: 'Liquid', af: 'Vloeistof' }, pBp: { en: 'Boiling point', af: 'Kookpunt' }, pVp: { en: 'Vapour pressure', af: 'Dampdruk' }, pVisc: { en: 'Viscosity', af: 'Viskositeit' }, pSt: { en: 'Surface tension', af: 'Oppervlakspanning' },
    strongest: { en: 'Strongest force:', af: 'Sterkste krag:' },
    solute: { en: 'Solute', af: 'Opgeloste stof' }, solvent: { en: 'Solvent', af: 'Oplosmiddel' }, sType: { en: 'Solute particles', af: 'Opgeloste deeltjies' }, vType: { en: 'Solvent molecules', af: 'Oplosmiddelmolekules' },
    between: { en: 'Solute–solvent attraction', af: 'Aantrekking tussen opgeloste stof en oplosmiddel' }, result: { en: 'Result', af: 'Resultaat' },
    zoom: { en: 'particles (magnified)', af: 'deeltjies (vergroot)' },
  };
  const S = { mode: 'pol', mol: 'H2O', ser: 'g16', mem: 0, trend: true, prop: 'bp', liq: 'wat', solute: 'nacl', solv: 'wat' };

  const HT = {
    pol: (w) => w < 640 ? 690 : Math.max(400, Math.min(470, Math.round(w * 0.5))),
    bp: (w) => w < 640 ? 440 : Math.max(380, Math.min(460, Math.round(w * 0.48))),
    prop: (w) => w < 640 ? 470 : 410,
    sol: (w) => w < 640 ? 640 : Math.max(380, Math.min(440, Math.round(w * 0.46))),
  };
  const ui = MLX.layout(root, { height: (w) => HT[S.mode](w), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const cm = MLX.card(ui.side, null);
  MLX.seg(cm, { label: T.view, options: [['pol', T.vPol], ['bp', T.vBp], ['prop', T.vProp], ['sol', T.vSol]], value: S.mode, onChange: (v) => { S.mode = v; update(); } });
  const P = {};
  // polarity panel
  P.pol = MLX.h('div'); ui.side.appendChild(P.pol);
  const pPol = MLX.primary(P.pol, { label: T.isA, unit: '' });
  const rPol = MLX.readout(pPol.el, [['sh', T.shape], ['f', T.strong], ['bp', T.bp], ['M', T.M]]);
  MLX.seg(MLX.card(P.pol, T.mol), { options: MORDER.map(k => [k, MOL[k].f]), value: S.mol, onChange: (v) => { S.mol = v; update(); } });
  // boiling point panel
  P.bp = MLX.h('div'); ui.side.appendChild(P.bp);
  const pBp = MLX.primary(P.bp, { label: '', unit: '°C' });
  const rBp = MLX.readout(pBp.el, [['M', T.M], ['f', T.strong], ['pr', T.pred]]);
  const cb = MLX.card(P.bp, null);
  MLX.seg(cb, { label: T.series, options: SORDER.map(k => [k, SER[k].b]), value: S.ser, onChange: (v) => { S.ser = v; S.mem = 0; memS.input.max = SER[v].p.length - 1; memS.set(0); update(); } });
  const memS = MLX.slider(cb, { label: T.member, min: 0, max: SER[S.ser].p.length - 1, step: 1, value: 0, ends: false, fmt: (v) => (SER[S.ser].p[v] || SER[S.ser].p[0])[0], onInput: (v) => { S.mem = v; update(); } });
  const trendC = MLX.check(cb, { label: T.trend, value: S.trend, onChange: (v) => { S.trend = v; update(); } });
  // properties panel
  P.prop = MLX.h('div'); ui.side.appendChild(P.prop);
  const pProp = MLX.primary(P.prop, { label: '', unit: '' });
  const rProp = MLX.readout(pProp.el, [['f', T.strong], ['M', T.M]]);
  const cp = MLX.card(P.prop, null);
  MLX.seg(cp, { label: T.prop, options: [['bp', T.pBp], ['vp', T.pVp], ['visc', T.pVisc], ['st', T.pSt]], value: S.prop, onChange: (v) => { S.prop = v; update(); } });
  MLX.seg(cp, { label: T.liq, options: LIQ.map(l => [l.k, l.n]), value: S.liq, onChange: (v) => { S.liq = v; update(); } });
  // solubility panel
  P.sol = MLX.h('div'); ui.side.appendChild(P.sol);
  const pSol = MLX.primary(P.sol, { label: T.result, unit: '' });
  const rSol = MLX.readout(pSol.el, [['a', T.sType], ['b', T.vType], ['f', T.between]]);
  const cs = MLX.card(P.sol, null);
  MLX.seg(cs, { label: T.solute, options: Object.keys(SOLUTE).map(k => [k, SOLUTE[k].n]), value: S.solute, onChange: (v) => { S.solute = v; update(); } });
  MLX.seg(cs, { label: T.solvent, options: Object.keys(SOLV).map(k => [k, SOLV[k].n]), value: S.solv, onChange: (v) => { S.solv = v; update(); } });
  MLX.onTheme(() => ui.cv.draw());

  // ── drawing helpers ──
  let c, ctx;
  const SEM = () => c.light
    ? { pos: '#1d4ed8', neg: '#b91c1c', ldf: '#2563eb', dd: '#b45309', hb: '#be123c', na: '#7c3aed', cl: '#16a34a' }
    : { pos: '#8ab4ff', neg: '#ff8f8f', ldf: '#7fb0ff', dd: '#f5b23d', hb: '#fb7185', na: '#a78bfa', cl: '#4ade80' };
  const ACOL = (e) => (c.light
    ? { H: '#f1f2f4', C: '#4b5563', N: '#2563eb', O: '#dc2626', F: '#84cc16', Cl: '#22c55e', S: '#eab308', B: '#f9a8a8', I: '#7c3aed' }
    : { H: '#e5e7eb', C: '#6b7280', N: '#3b82f6', O: '#ef4444', F: '#a3e635', Cl: '#4ade80', S: '#facc15', B: '#fca5a5', I: '#8b5cf6' })[e];
  const DARKTXT = { H: 1, F: 1, Cl: 1, S: 1, B: 1 };
  const AR = { H: 0.22, B: 0.3, C: 0.31, N: 0.31, O: 0.31, F: 0.3, S: 0.36, Cl: 0.36 };
  function atom(e, x, y, r) {
    ctx.fillStyle = ACOL(e); ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.5)' : 'rgba(0,0,0,0.55)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    text(ctx, e, x, y + 1, { size: Math.max(12, Math.min(18, r * 0.75)), weight: 700, align: 'center', base: 'middle', color: DARKTXT[e] ? '#16181d' : '#ffffff' });
  }
  function arrow(x1, y1, x2, y2, col, lw, head, cross) {
    const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - ux * head * 0.8, y2 - uy * head * 0.8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - ux * head - uy * head * 0.5, y2 - uy * head + ux * head * 0.5); ctx.lineTo(x2 - ux * head + uy * head * 0.5, y2 - uy * head - ux * head * 0.5); ctx.closePath(); ctx.fill();
    if (cross) { const cx = x1 + ux * cross * 1.2, cy = y1 + uy * cross * 1.2; ctx.beginPath(); ctx.moveTo(cx - uy * cross, cy + ux * cross); ctx.lineTo(cx + uy * cross, cy - ux * cross); ctx.stroke(); }
  }
  function divider(x0, y0, x1, y1) { ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 + 0.5, y0 + 0.5); ctx.lineTo(x1 + 0.5, y1 + 0.5); ctx.stroke(); }

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const ph = W < 640;
    if (S.mode === 'pol') {
      if (!ph) { const aw = Math.round(W * 0.54); molDraw(0, 0, aw, H); divider(aw, 14, aw, H - 14); steps(aw + 18, 16, W - aw - 32, H - 32); }
      else { const mh = 340; molDraw(0, 0, W, mh); divider(14, mh, W - 14, mh); steps(14, mh + 12, W - 28, H - mh - 20); }
    } else if (S.mode === 'bp') bpChart(0, 0, W, H);
    else if (S.mode === 'prop') propChart(0, 0, W, H, ph);
    else {
      if (!ph) { const aw = Math.round(W * 0.42); beaker(0, 0, aw, H); zoom(aw, 0, W - aw, H, ph); }
      else { const bh = 250; beaker(0, 0, W, bh); zoom(0, bh, W, H - bh, ph); }
    }
  }

  // ── 1 polarity ──
  function molDraw(x0, y0, w, h) {
    const m = MOL[S.mol], sm = SEM();
    text(ctx, L(m.n) + ', ' + m.f + ' — ' + L(SHAPE[m.sh]), x0 + 16, y0 + 26, { size: 15, weight: 700, color: c.text });
    const u = Math.min(w * (w < 640 ? 0.27 : 0.24), (h - 110) * (w < 640 ? 0.4 : 0.36), 120);
    const ox = x0 + w * (m.net && m.net[0] === 0 ? 0.44 : 0.5), oy = y0 + 46 + (h - 46 - 40) / 2 - (m.net && m.net[1] === 0 ? 16 : 0);
    const P = m.atoms.map(([e, x, y]) => ({ e, x: ox + x * u, y: oy + y * u, r: AR[e] * u }));
    // bonds
    m.bonds.forEach(([i, j, st, ord]) => {
      const a = P[i], b = P[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
      ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.62)' : 'rgba(226,232,240,0.7)'; ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = 3;
      if (st === 'w') { const wd = 0.09 * u; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x - uy * wd, b.y + ux * wd); ctx.lineTo(b.x + uy * wd, b.y - ux * wd); ctx.closePath(); ctx.fill(); }
      else if (st === 'd') { ctx.lineWidth = 2; for (let t = 0.3; t <= 0.95; t += 0.09) { const wd = 0.09 * u * t, px = a.x + dx * t, py = a.y + dy * t; ctx.beginPath(); ctx.moveTo(px - uy * wd, py + ux * wd); ctx.lineTo(px + uy * wd, py - ux * wd); ctx.stroke(); } }
      else if (ord === 2) { const o = 0.06 * u; [-1, 1].forEach(s => { ctx.beginPath(); ctx.moveTo(a.x - uy * o * s, a.y + ux * o * s); ctx.lineTo(b.x - uy * o * s, b.y + ux * o * s); ctx.stroke(); }); }
      else { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    });
    // lone pairs on the central atom
    if (m.lp) m.lp.forEach(ang => {
      const a = P[m.c], t = ang * Math.PI / 180, rr = a.r + 0.13 * u, px = a.x + Math.cos(t) * rr, py = a.y + Math.sin(t) * rr;
      ctx.fillStyle = c.ink; [-1, 1].forEach(s => { ctx.beginPath(); ctx.arc(px - Math.sin(t) * 5 * s, py + Math.cos(t) * 5 * s, 3, 0, Math.PI * 2); ctx.fill(); });
    });
    // atoms back to front (dashed bond atom first)
    const order = P.map((p, i) => i).sort((i, j) => (m.atoms[i][3] === 'd' ? -1 : m.atoms[i][3] === 'w' ? 1 : 0) - (m.atoms[j][3] === 'd' ? -1 : m.atoms[j][3] === 'w' ? 1 : 0));
    order.forEach(i => atom(P[i].e, P[i].x, P[i].y, P[i].r));
    // bond dipole arrows (point to the δ− atom) and δ labels
    m.bonds.forEach(([i, j]) => {
      const a = P[i], b = P[j], dEN = EN[b.e] - EN[a.e];
      if (Math.abs(dEN) < 0.01) return;
      const from = dEN > 0 ? a : b, to = dEN > 0 ? b : a;
      const dx = to.x - from.x, dy = to.y - from.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
      let nx = -uy, ny = ux; if (ny > 0.01 || (Math.abs(ny) < 0.01 && nx < 0)) { nx = -nx; ny = -ny; }
      const off = Math.max(from.r, to.r) * 0.55 + 0.1 * u, t0 = from.r * 0.4, t1 = to.r * 0.4;
      arrow(from.x + ux * t0 + nx * off, from.y + uy * t0 + ny * off, to.x - ux * t1 + nx * off, to.y - uy * t1 + ny * off, c.text2, 1.6, 8, 5);
    });
    const sumOf = (k) => m.bonds.reduce((s, [i, j]) => s + (i === k ? EN[P[j].e] - EN[P[i].e] : j === k ? EN[P[i].e] - EN[P[j].e] : 0), 0);
    P.forEach((p, k) => {
      const s = sumOf(k); if (Math.abs(s) < 0.01) return;
      let dx, dy;
      if (k === m.c) { const t = m.dl * Math.PI / 180; dx = Math.cos(t); dy = Math.sin(t); }
      else { const cc = m.c >= 0 ? P[m.c] : { x: ox, y: oy }; dx = p.x - cc.x; dy = p.y - cc.y; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d; }
      const rr = p.r + (k === m.c && m.lp ? 0.3 * u + 8 : 16);
      text(ctx, s < 0 ? 'δ−' : 'δ+', p.x + dx * rr, p.y + dy * rr + 1, { size: 15, weight: 700, align: 'center', base: 'middle', color: s < 0 ? sm.neg : sm.pos });
    });
    // net dipole
    const xs = P.map(p => p.x), ys = P.map(p => p.y), bx1 = Math.max(...xs) + u * 0.45, by1 = Math.max(...ys) + u * 0.4;
    if (m.net) {
      const L0 = 0.9 * u;
      if (m.net[0] === 0) { const nar = w < 480, ax = bx1 + (nar ? 14 : 26), s = m.net[1]; arrow(ax, oy - s * L0 / 2, ax, oy + s * L0 / 2, c.accent, 3.5, 12, 8); if (nar) text(ctx, T.net, ax - 10, oy - L0 / 2 - 12, { size: 13, weight: 600, align: 'center', color: c.accent }); else text(ctx, T.net, ax + 14, oy, { size: 13, weight: 600, base: 'middle', color: c.accent }); }
      else { const ay = by1 + 18, s = m.net[0]; arrow(ox - s * L0 / 2, ay, ox + s * L0 / 2, ay, c.accent, 3.5, 12, 8); text(ctx, T.net, ox, ay + 24, { size: 13, weight: 600, align: 'center', color: c.accent }); }
    } else if (m.bonds.some(([i, j]) => Math.abs(EN[P[i].e] - EN[P[j].e]) > 0.01)) {
      text(ctx, T.noNet, ox, Math.min(y0 + h - 44, by1 + 36), { size: 13, weight: 600, align: 'center', color: c.text2 });
    }
    // key
    let ky = y0 + h - 14;
    if (m.bonds.some(b => b[2] === 'w' || b[2] === 'd')) { text(ctx, T.wedge, x0 + 16, ky, { size: 12, color: c.text3 }); ky -= 18; }
    if (m.lp) {
      ctx.fillStyle = c.ink; [0, 10].forEach(dx => { ctx.beginPath(); ctx.arc(x0 + 21 + dx, ky - 4, 3, 0, Math.PI * 2); ctx.fill(); });
      text(ctx, T.lone, x0 + 40, ky, { size: 12, color: c.text3 });
    }
  }
  function bondTypes(m) {
    const seen = {}, out = [];
    m.bonds.forEach(([i, j, , ord]) => {
      const p = m.atoms[i][0], q = m.atoms[j][0], lo = EN[p] > EN[q] ? q : p, hi = lo === p ? q : p;
      const key = p + q; if (seen[key]) return; seen[key] = 1;
      out.push({ s: p + (ord === 2 ? '=' : '–') + q, a: lo, b: hi, d: Math.abs(EN[hi] - EN[lo]) });
    });
    return out;
  }
  function stepBox(x, y, w, title, lines, hi) {
    ctx.font = '500 14px "Cabinet Grotesk", sans-serif';
    const wr = []; lines.forEach(l => MLX.wrap(ctx, l, w - 24).forEach(s => wr.push(s)));
    const bh = 34 + wr.length * 19 + 8;
    MLX.roundRect(ctx, x, y, w, bh, 10); ctx.fillStyle = hi ? c.accentSoft : (c.light ? 'rgba(22,24,29,0.03)' : 'rgba(255,255,255,0.03)'); ctx.fill();
    ctx.strokeStyle = hi ? c.accent : c.line; ctx.lineWidth = hi ? 1.5 : 1; ctx.stroke();
    text(ctx, title, x + 12, y + 22, { size: 14, weight: 700, color: c.ink });
    wr.forEach((s, i) => text(ctx, s, x + 12, y + 44 + i * 19, { size: 14, color: c.text }));
    return bh;
  }
  function steps(x, y, w, h) {
    const m = MOL[S.mol], bt = bondTypes(m);
    const l1 = bt.map(b => b.s + ': ΔEN = ' + num(EN[b.b], 1) + ' − ' + num(EN[b.a], 1) + ' = ' + num(b.d, 1) + ' → ' + L(b.d < 0.01 ? T.npb : b.d < 1 ? T.wpb : T.pb));
    let l2;
    if (m.c < 0) l2 = [L(SHAPE.di)];
    else { const nb = m.bonds.length, nl = m.lp ? (m.sh === 'bent' ? 2 : 1) : 0; l2 = [L(SHAPE[m.sh]) + ': ' + L(T.nb).replace('{b}', nb).replace('{l}', L(T['lp' + nl])).replace('{x}', m.atoms[m.c][0]), '→ ' + L(m.net ? T.unsym : T.sym)]; }
    const anyPolar = bt.some(b => b.d > 0.01);
    const l3 = [L(!anyPolar ? T.none : m.net ? T.add : T.cancel)];
    const gap = 10;
    let yy = y;
    yy += stepBox(x, yy, w, T.s1, l1, false) + gap;
    yy += stepBox(x, yy, w, T.s2, l2, false) + gap;
    yy += stepBox(x, yy, w, T.s3, l3, true) + gap + 6;
    if (yy + 40 < y + h) {
      ctx.font = '500 14px "Cabinet Grotesk", sans-serif';
      text(ctx, T.strong, x, yy + 4, { size: 13, color: c.text3 });
      MLX.wrap(ctx, L(IMFS[m.imf]), w).forEach((s, i) => text(ctx, s, x, yy + 24 + i * 19, { size: 14, weight: 700, color: SEM()[m.imf] }));
    }
  }

  // ── 2 boiling points ──
  function fit(p) { // least-squares line through periods 3–5
    const q = p.filter(r => r[1] >= 3), n = q.length, mx = q.reduce((s, r) => s + r[1], 0) / n, my = q.reduce((s, r) => s + r[2], 0) / n;
    const b = q.reduce((s, r) => s + (r[1] - mx) * (r[2] - my), 0) / q.reduce((s, r) => s + (r[1] - mx) * (r[1] - mx), 0);
    return (x) => my + b * (x - mx);
  }
  function bpChart(x0, y0, w, h) {
    const ax = MLX.axes(ctx, { x0: x0 + 6, y0: y0 + 8, w: w - 12, h: h - 10, xMin: 0.5, xMax: 5.5, yMin: -280, yMax: 200, xTitle: T.xP, yTitle: T.yBp, xTicks: 5, yTicks: 5 });
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(0)); ctx.lineTo(ax.box.x1, ax.Y(0)); ctx.stroke(); ctx.setLineDash([]);
    SORDER.forEach(k => {
      if (k === S.ser) return; const p = SER[k].p;
      ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.22)' : 'rgba(226,232,240,0.2)'; ctx.lineWidth = 1.5; ctx.beginPath();
      p.forEach((r, i) => { const X = ax.X(r[1]), Y = ax.Y(r[2]); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
      ctx.fillStyle = ctx.strokeStyle; p.forEach(r => { ctx.beginPath(); ctx.arc(ax.X(r[1]), ax.Y(r[2]), 3, 0, Math.PI * 2); ctx.fill(); });
    });
    const s = SER[S.ser], p = s.p, sm = SEM();
    if (s.hyd && S.trend) {
      const f = fit(p); ctx.strokeStyle = c.text2; ctx.lineWidth = 1.5; ctx.setLineDash([6, 5]);
      ctx.beginPath(); ctx.moveTo(ax.X(2), ax.Y(f(2))); ctx.lineTo(ax.X(5), ax.Y(f(5))); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = c.text2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ax.X(2), ax.Y(f(2)), 6, 0, Math.PI * 2); ctx.stroke();
      text(ctx, L(T.trendL).replace('{v}', deg(Math.round(f(2) / 5) * 5)), ax.X(2) - 12, ax.Y(f(2)) + 4, { size: 12, align: 'right', color: c.text2 });
    }
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2.5; ctx.beginPath();
    p.forEach((r, i) => { const X = ax.X(r[1]), Y = ax.Y(r[2]); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
    p.forEach((r, i) => {
      const X = ax.X(r[1]), Y = ax.Y(r[2]), sel = i === S.mem;
      ctx.fillStyle = r[4] === 'hb' ? sm.hb : c.accent; ctx.beginPath(); ctx.arc(X, Y, sel ? 7 : 4.5, 0, Math.PI * 2); ctx.fill();
      if (sel) { ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X, Y, 10, 0, Math.PI * 2); ctx.stroke(); }
      const up = Y > ax.box.y0 + 44;
      text(ctx, r[0], X, up ? Y - 26 : Y + 24, { size: 14, weight: 700, align: 'center', color: sel ? c.ink : c.text });
      text(ctx, deg(r[2]), X, up ? Y - 12 : Y + 38, { size: 12, mono: true, align: 'center', color: c.text2 });
    });
    // key
    const kx = ax.box.x0 + 10; let ky = ax.box.y0 + 14;
    text(ctx, s.n, kx, ky, { size: 14, weight: 700, color: c.accent });
    if (p.some(r => r[4] === 'hb')) { ky += 20; ctx.fillStyle = sm.hb; ctx.beginPath(); ctx.arc(kx + 5, ky - 4, 5, 0, Math.PI * 2); ctx.fill(); text(ctx, IMF.hb, kx + 16, ky, { size: 12, color: c.text2 }); }
    ky += 18; ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.22)' : 'rgba(226,232,240,0.2)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(kx, ky - 4); ctx.lineTo(kx + 12, ky - 4); ctx.stroke();
    text(ctx, { en: 'other series', af: 'ander reekse' }, kx + 16, ky, { size: 12, color: c.text3 });
  }

  // ── 3 properties ──
  function propChart(x0, y0, w, h, ph) {
    const pr = PROP[S.prop], sm = SEM(), nameW = ph ? 96 : 150;
    // legend
    let lx = x0 + 16; const ly = y0 + 22;
    text(ctx, T.strongest, lx, ly, { size: 12, color: c.text3 }); ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; lx += ctx.measureText(L(T.strongest)).width + 10;
    let lrow = 0;
    ['ldf', 'dd', 'hb'].forEach(k => {
      ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; const tw = ctx.measureText(L(IMF[k])).width;
      if (lx + 18 + tw > x0 + w - 10) { lrow++; lx = x0 + 16; }
      const yy = ly + lrow * 18;
      ctx.fillStyle = sm[k]; ctx.fillRect(lx, yy - 10, 12, 12); text(ctx, IMF[k], lx + 17, yy, { size: 12, color: c.text2 }); lx += 17 + tw + 14;
    });
    const top = y0 + 34 + lrow * 18;
    const ax = MLX.axes(ctx, { x0: x0 + nameW - 34, y0: top, w: w - nameW + 30 - (ph ? 8 : 20), h: h - top - 4, xMin: 0, xMax: pr.max, yMin: 0, yMax: LIQ.length, xTitle: pr.t, yTitle: '', xTicks: ph ? 3 : 5, yTicks: LIQ.length, fmtY: () => '' });
    const rh = (ax.box.y1 - ax.box.y0) / LIQ.length;
    LIQ.forEach((l, i) => {
      const yc = ax.box.y0 + rh * (i + 0.5), v = l[S.prop], sel = l.k === S.liq, bh = Math.min(26, rh * 0.56);
      text(ctx, l.n, ax.box.x0 - 10, yc - 2, { size: ph ? 13 : 14, weight: sel ? 700 : 600, align: 'right', color: sel ? c.ink : c.text });
      text(ctx, l.f, ax.box.x0 - 10, yc + 14, { size: 12, align: 'right', color: c.text3 });
      const over = v > pr.max, x1 = ax.X(Math.min(v, pr.max));
      ctx.fillStyle = sm[l.imf]; ctx.globalAlpha = sel ? 1 : 0.75; ctx.fillRect(ax.box.x0, yc - bh / 2, Math.max(1, x1 - ax.box.x0), bh); ctx.globalAlpha = 1;
      if (sel) { ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.strokeRect(ax.box.x0 + 1, yc - bh / 2 - 1, Math.max(1, x1 - ax.box.x0), bh + 2); }
      const lab = S.prop === 'vp' && v < 0.001 ? '< ' + num(0.001, 3) : S.prop === 'visc' && v > 100 ? MLX.big(v) : num(v, pr.d);
      if (over) {
        // axis break: the bar runs off the scale
        const bx = x1 - 26; ctx.fillStyle = c.stage; ctx.fillRect(bx - 4, yc - bh / 2 - 2, 8, bh + 4);
        ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; [-4, 4].forEach(o => { ctx.beginPath(); ctx.moveTo(bx + o - 3, yc + bh / 2 + 2); ctx.lineTo(bx + o + 3, yc - bh / 2 - 2); ctx.stroke(); });
        ctx.font = '700 12px "JetBrains Mono", monospace'; const tw = ctx.measureText(lab).width;
        ctx.fillStyle = c.stage; ctx.fillRect(x1 - 30 - tw - 8, yc - 9, tw + 8, 17);
        text(ctx, lab, x1 - 34, yc + 4, { size: 12, mono: true, weight: 700, align: 'right', color: c.ink });
      } else text(ctx, lab, x1 + 6, yc + 4, { size: 12, mono: true, weight: sel ? 700 : 500, color: sel ? c.ink : c.text2 });
    });
  }

  // ── 4 solubility ──
  function water(x, y, ang, s) { // O at (x, y); the two H atoms point along ang ± 52°
    const d = 13 * s;
    [-1, 1].forEach(k => { const t = ang + k * 0.91; ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.5)' : 'rgba(226,232,240,0.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(t) * d, y + Math.sin(t) * d); ctx.stroke(); });
    [-1, 1].forEach(k => { const t = ang + k * 0.91; ball(x + Math.cos(t) * d, y + Math.sin(t) * d, 5.5 * s, ACOL('H')); });
    ball(x, y, 8.5 * s, ACOL('O'));
  }
  function ball(x, y, r, col) { ctx.fillStyle = col; ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.45)' : 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
  function chain(x, y, ang, n, s, col) { // zig-zag carbon chain centred on (x, y)
    const step = 11 * s, L0 = (n - 1) * step * 0.87, ux = Math.cos(ang), uy = Math.sin(ang), pts = [];
    for (let i = 0; i < n; i++) { const t = -L0 / 2 + i * step * 0.87, z = (i % 2 ? 1 : -1) * 4 * s; pts.push([x + ux * t - uy * z, y + uy * t + ux * z]); }
    ctx.strokeStyle = col; ctx.lineWidth = 2.5 * s; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.fillStyle = col; pts.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], 2.6 * s, 0, Math.PI * 2); ctx.fill(); });
    return pts;
  }
  const HEXC = () => c.light ? '#6b7280' : '#9ca3af';
  const OILC = () => c.light ? '#a16207' : '#facc15';
  function ion(x, y, r, col, sign) { ball(x, y, r, col); text(ctx, sign, x, y + 1, { size: 14, weight: 700, align: 'center', base: 'middle', color: '#ffffff' }); }
  function i2(x, y, ang, s) { const dx = Math.cos(ang) * 8 * s, dy = Math.sin(ang) * 8 * s; ball(x - dx, y - dy, 9 * s, ACOL('I')); ball(x + dx, y + dy, 9 * s, ACOL('I')); }
  function sugar(x, y, s) { // a sucrose molecule: a six-ring and a five-ring joined through O, with O–H groups
    ctx.strokeStyle = c.text; ctx.lineWidth = 1.8; const r = 13 * s;
    const ring = (cx, cy, n, rr, a0) => { ctx.beginPath(); for (let i = 0; i <= n; i++) { const t = a0 + i * 2 * Math.PI / n; const px = cx + Math.cos(t) * rr, py = cy + Math.sin(t) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); };
    ring(x - r * 1.25, y, 6, r, 0); ring(x + r * 1.3, y, 5, r * 0.9, Math.PI);
    ctx.beginPath(); ctx.moveTo(x - r * 0.25, y); ctx.lineTo(x + r * 0.4, y); ctx.stroke();
    ball(x + 0.07 * r, y, 3.5 * s, ACOL('O'));
    const oh = [[x - r * 1.9, y - r * 1.2], [x - r * 1.9, y + r * 1.2], [x + r * 1.6, y - r * 1.3], [x + r * 1.8, y + r * 1.25]];
    oh.forEach(([px, py]) => { ball(px, py, 4.5 * s, ACOL('O')); ball(px + (px < x ? -6 : 6) * s, py + (py < y ? -4 : 4) * s, 3.2 * s, ACOL('H')); });
    return oh;
  }
  function dash(x1, y1, x2, y2, col) { ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]); }

  function beaker(x0, y0, w, h) {
    const sol = SOL[S.solute + '-' + S.solv], sm = SEM();
    text(ctx, L(SOLUTE[S.solute].n) + ' + ' + L(SOLV[S.solv].n), x0 + 16, y0 + 26, { size: 15, weight: 700, color: c.text });
    const bw = Math.min(w * 0.5, 170), bh = Math.min(h - 90, 210), bx = x0 + w / 2 - bw / 2 - (w < 400 ? 40 : 10), by = y0 + 48, ly = by + bh * 0.22;
    // liquid
    let fill = S.solv === 'wat' ? (c.light ? 'rgba(53,166,240,0.18)' : 'rgba(53,166,240,0.16)') : (c.light ? 'rgba(22,24,29,0.05)' : 'rgba(255,255,255,0.05)');
    if (S.solute === 'i2' && S.solv === 'hex') fill = c.light ? 'rgba(124,58,237,0.32)' : 'rgba(139,92,246,0.38)';
    if (S.solute === 'i2' && S.solv === 'wat') fill = c.light ? 'rgba(180,120,40,0.16)' : 'rgba(200,140,60,0.16)';
    if (S.solute === 'oil' && S.solv === 'hex') fill = c.light ? 'rgba(202,138,4,0.16)' : 'rgba(250,204,21,0.14)';
    ctx.fillStyle = fill; ctx.fillRect(bx, ly, bw, by + bh - ly);
    let note = null;
    if (S.solute === 'oil' && S.solv === 'wat') { ctx.fillStyle = c.light ? 'rgba(202,138,4,0.45)' : 'rgba(250,204,21,0.4)'; ctx.fillRect(bx, ly, bw, bh * 0.16); note = [{ en: 'oil layer floats', af: 'olielaag dryf' }, ly + bh * 0.08]; }
    if (!sol.ok && S.solute !== 'oil') {
      // undissolved crystals at the bottom
      const col = S.solute === 'i2' ? (c.light ? '#4c1d95' : '#6d28d9') : (c.light ? '#ffffff' : '#e5e7eb');
      for (let i = 0; i < 16; i++) { const px = bx + bw * 0.2 + (i * 37 % 60) / 60 * bw * 0.6, py = by + bh - 7 - (i % 3) * 6; ctx.fillStyle = col; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.fillRect(px - 4, py - 4, 8, 8); ctx.strokeRect(px - 4, py - 4, 8, 8); }
      note = [S.solute === 'i2' ? { en: 'most crystals stay', af: 'meeste kristalle bly' } : { en: 'crystals do not dissolve', af: 'kristalle los nie op nie' }, by + bh - 12];
    }
    if (sol.ok) note = [S.solute === 'i2' ? { en: 'violet solution', af: 'pers oplossing' } : S.solute === 'oil' ? { en: 'one liquid layer', af: 'een vloeistoflaag' } : { en: 'clear solution, no crystals left', af: 'helder oplossing, geen kristalle oor nie' }, ly + (by + bh - ly) * 0.55];
    // beaker glass
    ctx.strokeStyle = c.glass; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - 6, by - 6); ctx.lineTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by); ctx.stroke();
    if (note) {
      const nx = bx + bw + 12; ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx + bw - 14, note[1]); ctx.lineTo(nx - 2, note[1]); ctx.stroke();
      ctx.font = '500 13px "Cabinet Grotesk", sans-serif';
      MLX.wrap(ctx, L(note[0]), Math.max(70, x0 + w - nx - 8)).forEach((s, i) => text(ctx, s, nx + 2, note[1] + 4 + i * 16, { size: 13, color: c.text2 }));
    }
    // magnifier marker
    const mx = bx + bw * 0.42, my = ly + (by + bh - ly) * 0.5;
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(mx, my, 10, 0, Math.PI * 2); ctx.stroke();
    text(ctx, sol.r, x0 + w / 2 - (w < 400 ? 30 : 0), by + bh + 30, { size: 15, weight: 700, align: 'center', color: sol.ok ? c.accent : c.warn });
  }
  function zoom(x0, y0, w, h, ph) {
    const sol = SOL[S.solute + '-' + S.solv], sm = SEM();
    const R = Math.min(w * 0.42, (h - 70) / 2, 170), cx = x0 + w / 2, cy = y0 + 18 + R, s = R / 128;
    text(ctx, T.zoom, cx, y0 + 12, { size: 12, align: 'center', color: c.text3 });
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = c.light ? 'rgba(22,24,29,0.025)' : 'rgba(255,255,255,0.025)'; ctx.fill(); ctx.clip();
    const fcol = sol.f.en.indexOf('ion') === 0 ? sm.na : sol.f.en.indexOf('hydrogen') === 0 ? sm.hb : sm.ldf;
    const solventCluster = (ox, oy, rad, n) => { // solvent molecules attracting each other
      const pts = [], lc = S.solv === 'wat' ? sm.hb : sm.ldf;
      if (S.solv === 'wat') {
        for (let i = 0; i < n; i++) { const t = i * 2.4, rr = rad * Math.sqrt((i + 0.5) / n); pts.push([ox + Math.cos(t) * rr, oy + Math.sin(t) * rr, t]); }
        pts.forEach((a, i) => pts.forEach((b, j) => { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 46 * s) dash(a[0], a[1], b[0], b[1], lc); }));
      } else {
        // hexane: zig-zag chains lying roughly side by side, London forces between neighbouring chains
        for (let r = -4; r <= 4; r++) for (let k = -3; k <= 3; k++) { const px = ox + k * 60 * s + (r % 2 ? 30 * s : 0), py = oy + r * 24 * s; if (Math.hypot(Math.abs(px - ox) + 26 * s, py - oy) < rad) pts.push([px, py, ((r + k) % 2 ? 0.12 : -0.12)]); }
        pts.forEach((a, i) => pts.forEach((b, j) => { if (j !== i && b[1] - a[1] > 1 && b[1] - a[1] < 30 * s && b[0] - a[0] > 0 && b[0] - a[0] < 35 * s) dash(a[0], a[1] + 5 * s * Math.sign(b[1] - a[1]), b[0], b[1] - 5 * s * Math.sign(b[1] - a[1]), lc); }));
      }
      pts.forEach(p => S.solv === 'wat' ? water(p[0], p[1], p[2], s) : chain(p[0], p[1], p[2], 6, s, HEXC()));
    };
    if (sol.ok) {
      if (S.solute === 'nacl') {
        [[-1, 'na'], [1, 'cl']].forEach(([side, k]) => {
          const ix = cx + side * 62 * s, iy = cy, ir = (k === 'na' ? 13 : 19) * s;
          for (let i = 0; i < 6; i++) {
            const t = i * Math.PI / 3 + 0.3, d = ir + (k === 'na' ? 17 : 24) * s, px = ix + Math.cos(t) * d, py = iy + Math.sin(t) * d;
            if (k === 'na') { dash(ix + Math.cos(t) * ir, iy + Math.sin(t) * ir, px - Math.cos(t) * 8 * s, py - Math.sin(t) * 8 * s, fcol); water(px, py, t, s); }
            else { const hx = ix + Math.cos(t) * (ir + 6 * s); dash(ix + Math.cos(t) * ir, iy + Math.sin(t) * ir, hx, iy + Math.sin(t) * (ir + 6 * s), fcol); water(px + Math.cos(t) * 6 * s, py + Math.sin(t) * 6 * s, t + Math.PI + 0.91, s); }
          }
          ion(ix, iy, ir, k === 'na' ? sm.na : (c.light ? '#15803d' : '#16a34a'), k === 'na' ? 'Na⁺' : 'Cl⁻');
        });
      } else if (S.solute === 'suc') {
        const oh = sugar(cx, cy, s * 1.5);
        oh.forEach(([px, py]) => { const t = Math.atan2(py - cy, px - cx), qx = px + Math.cos(t) * 30 * s, qy = py + Math.sin(t) * 30 * s; dash(px, py, qx - Math.cos(t) * 8 * s, qy - Math.sin(t) * 8 * s, fcol); water(qx, qy, t, s); });
        [[cx, cy - 92 * s, 1.2], [cx - 20 * s, cy + 95 * s, -1.3]].forEach(([px, py, t]) => water(px, py, t, s));
      } else {
        const solute = S.solute === 'i2' ? () => i2(cx, cy, 0, s * 1.2) : () => chain(cx, cy, 0, 14, s * 1.15, OILC());
        const ring = S.solute === 'i2' ? 68 : 50;
        for (let i = 0; i < 7; i++) { const t = i * 2 * Math.PI / 7 + 0.2, rx = S.solute === 'i2' ? ring : ring * 2.1, px = cx + Math.cos(t) * rx * s, py = cy + Math.sin(t) * ring * s; dash(cx + Math.cos(t) * 14 * s, cy + Math.sin(t) * 10 * s, px - Math.cos(t) * 14 * s, py - Math.sin(t) * 8 * s, fcol); chain(px, py, t + Math.PI / 2, 6, s, HEXC()); }
        solute();
      }
    } else {
      // two separate groups: the solute stays together, the solvent molecules keep to themselves
      const sx = cx - 55 * s;
      if (S.solute === 'nacl') { for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) { const na = (i + j) % 2 === 0, px = sx - 40 * s + i * 32 * s, py = cy - 48 * s + j * 32 * s; ion(px, py, (na ? 11 : 15) * s, na ? sm.na : (c.light ? '#15803d' : '#16a34a'), na ? '+' : '−'); } }
      else if (S.solute === 'suc') { sugar(sx, cy - 40 * s, s); sugar(sx, cy + 30 * s, s); dash(sx - 24 * s, cy - 22 * s, sx - 24 * s, cy + 12 * s, sm.hb); }
      else if (S.solute === 'i2') { [[0, -50], [-24, -12], [20, 0], [-10, 34], [26, 44]].forEach(([dx, dy], i) => i2(sx + dx * s, cy + dy * s, i * 0.9, s)); }
      else { for (let i = 0; i < 5; i++) chain(cx, cy - R * 0.62 + i * 13 * s, 0, 16, s, OILC()); }
      if (S.solute === 'oil') solventCluster(cx, cy + 46 * s, 82 * s, 12);
      else solventCluster(cx + 62 * s, cy, S.solv === 'wat' ? 78 * s : 92 * s, 11);
    }
    ctx.restore();
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    // key under the circle
    const ky = cy + R + 22; ctx.font = '500 13px "Cabinet Grotesk", sans-serif';
    const lab = L(sol.ok ? sol.f : (S.solv === 'wat' ? IMF.hb : IMF.ldf)) + (sol.ok ? '' : L({ en: ' between solvent molecules', af: ' tussen oplosmiddelmolekules' }));
    const tw = ctx.measureText(lab).width + 26, kx = cx - tw / 2;
    dash(kx, ky - 4, kx + 18, ky - 4, sol.ok ? fcol : (S.solv === 'wat' ? sm.hb : sm.ldf));
    text(ctx, lab, kx + 24, ky, { size: 13, color: c.text2 });
  }

  function update() {
    Object.keys(P).forEach(k => { P[k].style.display = k === S.mode ? '' : 'none'; });
    let cap = '', aria = '';
    if (S.mode === 'pol') {
      const m = MOL[S.mol];
      pPol.set(L(m.net ? T.polar : T.nonpolar));
      rPol.set('sh', L(SHAPE[m.sh])); rPol.set('f', L(IMFS[m.imf])); rPol.set('bp', m.bp == null ? L(T.subl) : deg(m.bp)); rPol.set('M', num(m.M, m.M % 1 ? 1 : 0) + ' g·mol⁻¹');
      cap = L(m.note);
      aria = L(m.n) + ', ' + m.f + ': ' + L(SHAPE[m.sh]) + ', ' + L(m.net ? T.polar : T.nonpolar) + '. ' + cap;
    } else if (S.mode === 'bp') {
      const s = SER[S.ser], r = s.p[S.mem], f = s.hyd ? fit(s.p) : null;
      pBp.el.querySelector('.mlx-card-title').textContent = L(T.bpOf).replace('{f}', r[0]);
      pBp.set(num(r[2], r[2] % 1 ? 1 : 0));
      rBp.set('M', num(r[3], r[3] % 1 ? 1 : 0) + ' g·mol⁻¹'); rBp.set('f', L(IMFS[r[4]]));
      rBp.set('pr', f && r[1] === 2 ? '≈ ' + deg(Math.round(f(2) / 5) * 5) : '—');
      trendC.el.style.display = s.hyd ? '' : 'none';
      const head = r[0] + ' (' + num(r[3], r[3] % 1 ? 1 : 0) + ' g·mol⁻¹) ' + L({ en: 'boils at', af: 'kook by' }) + ' ' + deg(r[2]) + '. ';
      if (r[4] === 'hb') cap = head + L({ en: 'That is far above the trend of the heavier hydrides (about {p}): its molecules form hydrogen bonds, which need much more energy to overcome.', af: 'Dit is ver bo die tendens van die swaarder hidriede (omtrent {p}): sy molekules vorm waterstofbindings, wat baie meer energie nodig het om te oorkom.' }).replace('{p}', deg(Math.round(f(2) / 5) * 5));
      else if (s.hyd && r[1] === 2) cap = head + L({ en: 'CH₄ is non-polar and cannot form hydrogen bonds, so it sits at the bottom of the London-force trend.', af: 'CH₄ is nie-polêr en kan nie waterstofbindings vorm nie, dus lê dit onderaan die Londonkragtendens.' });
      else if (s.hyd) cap = head + L({ en: 'From period 3 to period 5 the boiling point rises: bigger molecules have more electrons, so the London forces get stronger.', af: 'Van periode 3 tot periode 5 styg die kookpunt: groter molekules het meer elektrone, dus word die Londonkragte sterker.' });
      else cap = head + L({ en: 'Only London forces act: the boiling point rises with molar mass, because a bigger electron cloud is more easily polarised.', af: 'Net Londonkragte werk in: die kookpunt styg met molêre massa, want \'n groter elektronwolk word makliker gepolariseer.' });
      aria = L(s.n) + '. ' + cap;
    } else if (S.mode === 'prop') {
      const l = LIQ.find(q => q.k === S.liq), pr = PROP[S.prop], v = l[S.prop];
      pProp.el.querySelector('.mlx-card-title').textContent = L(pr.n) + ': ' + L(l.n);
      pProp.set(S.prop === 'vp' && v < 0.001 ? '< ' + num(0.001, 3) : S.prop === 'visc' && v > 100 ? MLX.big(v) : num(v, pr.d));
      pProp.el.querySelector('.mlx-primary-unit').textContent = pr.u;
      rProp.set('f', L(IMFS[l.imf])); rProp.set('M', num(l.M, 0) + ' g·mol⁻¹');
      cap = L({
        bp: { en: 'Stronger forces between molecules need more energy to overcome, so the boiling point rises; glycerol, with three O–H groups, boils highest. Hexane boils above propanone because its larger molecules have stronger London forces.', af: 'Sterker kragte tussen molekules het meer energie nodig om te oorkom, dus styg die kookpunt; gliserol, met drie O–H-groepe, kook die hoogste. Heksaan kook hoër as propanoon omdat sy groter molekules sterker Londonkragte het.' },
        vp: { en: 'Weak forces let molecules escape into the vapour easily: diethyl ether has the highest vapour pressure, glycerol almost none. A high vapour pressure goes with a low boiling point.', af: 'Swak kragte laat molekules maklik na die damp ontsnap: diëtieleter het die hoogste dampdruk, gliserol amper geen. \'n Hoë dampdruk gaan saam met \'n lae kookpunt.' },
        visc: { en: 'Glycerol, with three O–H groups per molecule, is about 1 400 times as viscous as water. Liquids with only London or dipole–dipole forces flow easily.', af: 'Gliserol, met drie O–H-groepe per molekuul, is omtrent 1 400 keer so viskeus soos water. Vloeistowwe met net London- of dipool-dipoolkragte vloei maklik.' },
        st: { en: 'Water has by far the highest surface tension: each molecule can form up to four hydrogen bonds, so the surface molecules are pulled strongly inwards.', af: 'Water het verreweg die hoogste oppervlakspanning: elke molekuul kan tot vier waterstofbindings vorm, dus word die oppervlakmolekules sterk na binne getrek.' },
      }[S.prop]);
      aria = L(pr.n) + ', ' + LIQ.map(q => L(q.n) + ' ' + num(q[S.prop], pr.d) + ' ' + pr.u).join('; ') + '. ' + cap;
    } else {
      const sol = SOL[S.solute + '-' + S.solv];
      pSol.set(L(sol.r));
      rSol.set('a', L(SOLUTE[S.solute].ty)); rSol.set('b', L(SOLV[S.solv].ty)); rSol.set('f', L(sol.f));
      cap = L(sol.cap); aria = cap;
    }
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + ': ' + aria);
    ui.cv.draw();
  }
  update();
});
