/* Gr10 Chemical bonding — Lewis (dot-and-cross) diagrams and the electronegativity difference ΔEN.
 * Electronegativities are the Pauling values on the CAPS data-sheet periodic table:
 *   H 2,1  C 2,5  N 3,0  O 3,5  F 4,0  Cl 3,0  Na 0,9  Mg 1,2  Ca 1,0
 * Bond type from ΔEN uses the cut-offs stated in this page's own lesson text (they vary between SA textbooks):
 *   ΔEN < 0,4 non-polar covalent;  0,4 ≤ ΔEN ≤ 1,7 polar covalent;  ΔEN > 1,7 ionic.
 * It is a rule of thumb: H–F (ΔEN 1,9) is still a (very) polar covalent bond between two non-metals, as the page's
 * workbook memo says, and metal atoms bonded to each other form a metallic bond (sea of delocalised electrons).
 * In the Lewis diagrams the electrons of one atom are dots and those of the other atom crosses, so learners see
 * where each electron came from: shared pairs (covalent) or transferred electrons (ionic, then [ions] with charges).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const EN = { H: 2.1, C: 2.5, N: 3.0, O: 3.5, F: 4.0, Cl: 3.0, Na: 0.9, Mg: 1.2, Ca: 1.0 };
  const T = {
    aria: { en: 'Lewis diagram of the chosen substance and its electronegativity difference on a bond-type scale', af: 'Lewis-diagram van die gekose stof en sy elektronegatiwiteitsverskil op \'n bindingstipe-skaal' },
    prim: { en: 'Electronegativity difference', af: 'Elektronegatiwiteitsverskil' }, unit: { en: 'ΔEN', af: 'ΔEN' },
    type: { en: 'Bond type', af: 'Bindingstipe' }, ens: { en: 'Electronegativities', af: 'Elektronegatiwiteite' }, mol: { en: 'Particles', af: 'Deeltjies' },
    sub: { en: 'Substance', af: 'Stof' }, pick: { en: 'Choose a substance', af: 'Kies \'n stof' }, again: { en: 'Show the transfer again', af: 'Wys die oordrag weer' },
    np: { en: 'non-polar covalent', af: 'nie-polêr kovalent' }, pc: { en: 'polar covalent', af: 'polêr kovalent' }, io: { en: 'ionic', af: 'ionies' }, me: { en: 'metallic', af: 'metaalbinding' },
    vpc: { en: 'polar covalent (very polar)', af: 'polêr kovalent (baie polêr)' }, wpc: { en: 'polar covalent (weakly polar)', af: 'polêr kovalent (swak polêr)' },
    mPol: { en: 'polar molecules', af: 'polêre molekules' }, mNp: { en: 'non-polar molecules', af: 'nie-polêre molekules' }, mIon: { en: 'ions in a lattice', af: 'ione in \'n rooster' }, mMet: { en: 'cations in a sea of electrons', af: 'katione in \'n see van elektrone' },
    scale: { en: 'Electronegativity difference ΔEN', af: 'Elektronegatiwiteitsverskil ΔEN' },
    zNp: { en: 'non-polar', af: 'nie-polêr' }, zPc: { en: 'polar covalent', af: 'polêr kovalent' }, zIo: { en: 'ionic', af: 'ionies' },
    shared: { en: 'shared pair = covalent bond', af: 'gedeelde paar = kovalente binding' }, lone: { en: 'lone pair', af: 'alleenpaar' },
    elOf: { en: 'electron from', af: 'elektron van' }, attract: { en: 'oppositely charged ions attract: ionic bond', af: 'teenoorgesteld gelaaide ione trek mekaar aan: ioniese binding' },
    transfer: { en: 'electron transfer', af: 'elektronoordrag' }, ion: { en: 'Na⁺ ion', af: 'Na⁺-ioon' }, del: { en: 'delocalised electron', af: 'gedelokaliseerde elektron' },
    equal: { en: 'equal sharing', af: 'gelyke deling' }, unequal: { en: 'unequal sharing', af: 'ongelyke deling' }, moved: { en: 'electron(s) transferred', af: 'elektron(e) oorgedra' },
    metNote: { en: 'Both atoms are metals, so ΔEN does not apply: the valence electrons are delocalised.', af: 'Albei atome is metale, dus geld ΔEN nie: die valenselektrone is gedelokaliseer.' },
  };
  // Lewis layouts in bond-length units. lp/one: directions of lone pairs / single electrons. mark: 'dot' or 'x'.
  const SUBS = {
    H2: { f: 'H₂', n: { en: 'Hydrogen', af: 'Waterstof' }, k: 'cov', pol: false, pair: ['H', 'H'],
      atoms: [{ e: 'H', x: -0.5, y: 0, m: 'dot' }, { e: 'H', x: 0.5, y: 0, m: 'x' }], bonds: [[0, 1, 1]],
      cap: { en: 'Two identical H atoms pull equally on the shared pair (ΔEN = 0): a non-polar covalent bond.', af: 'Twee identiese H-atome trek ewe sterk aan die gedeelde paar (ΔEN = 0): \'n nie-polêre kovalente binding.' } },
    Cl2: { f: 'Cl₂', n: { en: 'Chlorine', af: 'Chloor' }, k: 'cov', pol: false, pair: ['Cl', 'Cl'],
      atoms: [{ e: 'Cl', x: -0.5, y: 0, m: 'dot', lp: ['l', 'u', 'd'] }, { e: 'Cl', x: 0.5, y: 0, m: 'x', lp: ['r', 'u', 'd'] }], bonds: [[0, 1, 1]],
      cap: { en: 'Each Cl atom shares one electron to complete its octet; equal atoms share equally (ΔEN = 0): non-polar covalent.', af: 'Elke Cl-atoom deel een elektron om sy oktet te voltooi; gelyke atome deel gelyk (ΔEN = 0): nie-polêr kovalent.' } },
    N2: { f: 'N₂', n: { en: 'Nitrogen', af: 'Stikstof' }, k: 'cov', pol: false, pair: ['N', 'N'],
      atoms: [{ e: 'N', x: -0.5, y: 0, m: 'dot', lp: ['l'] }, { e: 'N', x: 0.5, y: 0, m: 'x', lp: ['r'] }], bonds: [[0, 1, 3]],
      cap: { en: 'Each N atom shares three electrons: three shared pairs make a triple bond, still non-polar (ΔEN = 0).', af: 'Elke N-atoom deel drie elektrone: drie gedeelde pare vorm \'n drievoudige binding, steeds nie-polêr (ΔEN = 0).' } },
    CH4: { f: 'CH₄', n: { en: 'Methane', af: 'Metaan' }, k: 'cov', pol: false, pair: ['H', 'C'],
      atoms: [{ e: 'C', x: 0, y: 0, m: 'dot' }, { e: 'H', x: -1, y: 0, m: 'x' }, { e: 'H', x: 1, y: 0, m: 'x' }, { e: 'H', x: 0, y: -1, m: 'x' }, { e: 'H', x: 0, y: 1, m: 'x' }],
      bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
      cap: { en: 'C–H has ΔEN = 2.5 − 2.1 = 0.4, right on the boundary, so the bonds are only weakly polar, and the symmetrical CH₄ molecule is non-polar.', af: 'C–H het ΔEN = 2,5 − 2,1 = 0,4, net op die grens, dus is die bindings net swak polêr, en die simmetriese CH₄-molekuul is nie-polêr.' } },
    NH3: { f: 'NH₃', n: { en: 'Ammonia', af: 'Ammoniak' }, k: 'cov', pol: true, pair: ['H', 'N'],
      atoms: [{ e: 'N', x: 0, y: 0, m: 'dot', lp: ['u'] }, { e: 'H', x: -1, y: 0, m: 'x' }, { e: 'H', x: 1, y: 0, m: 'x' }, { e: 'H', x: 0, y: 1, m: 'x' }],
      bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]],
      cap: { en: 'N pulls the shared pairs towards itself (ΔEN = 3.0 − 2.1 = 0.9): polar covalent bonds, and the lone pair makes NH₃ a polar molecule.', af: 'N trek die gedeelde pare na homself (ΔEN = 3,0 − 2,1 = 0,9): polêre kovalente bindings, en die alleenpaar maak NH₃ \'n polêre molekuul.' } },
    H2O: { f: 'H₂O', n: { en: 'Water', af: 'Water' }, k: 'cov', pol: true, pair: ['H', 'O'],
      atoms: [{ e: 'O', x: 0, y: 0, m: 'dot', lp: ['u', 'd'] }, { e: 'H', x: -1, y: 0, m: 'x' }, { e: 'H', x: 1, y: 0, m: 'x' }],
      bonds: [[0, 1, 1], [0, 2, 1]],
      cap: { en: 'O is much more electronegative than H (ΔEN = 3.5 − 2.1 = 1.4): the O–H bonds are polar covalent, with δ− on O and δ+ on each H.', af: 'O is baie meer elektronegatief as H (ΔEN = 3,5 − 2,1 = 1,4): die O–H-bindings is polêr kovalent, met δ− op O en δ+ op elke H.' } },
    HCl: { f: 'HCl', n: { en: 'Hydrogen chloride', af: 'Waterstofchloried' }, k: 'cov', pol: true, pair: ['H', 'Cl'],
      atoms: [{ e: 'H', x: -0.5, y: 0, m: 'x' }, { e: 'Cl', x: 0.5, y: 0, m: 'dot', lp: ['r', 'u', 'd'] }], bonds: [[0, 1, 1]],
      cap: { en: 'Cl pulls the shared pair closer (ΔEN = 3.0 − 2.1 = 0.9): a polar covalent bond, Hδ+ – Clδ−.', af: 'Cl trek die gedeelde paar nader (ΔEN = 3,0 − 2,1 = 0,9): \'n polêre kovalente binding, Hδ+ – Clδ−.' } },
    HF: { f: 'HF', n: { en: 'Hydrogen fluoride', af: 'Waterstoffluoried' }, k: 'cov', pol: true, pair: ['H', 'F'], over: true,
      atoms: [{ e: 'H', x: -0.5, y: 0, m: 'x' }, { e: 'F', x: 0.5, y: 0, m: 'dot', lp: ['r', 'u', 'd'] }], bonds: [[0, 1, 1]],
      cap: { en: 'ΔEN = 4.0 − 2.1 = 1.9 is above 1.7, yet H and F are both non-metals that share a pair: H–F is a very polar covalent bond, so the cut-off is only a guide.', af: 'ΔEN = 4,0 − 2,1 = 1,9 is bo 1,7, tog is H en F albei nie-metale wat \'n paar deel: H–F is \'n baie polêre kovalente binding, dus is die afsnypunt net \'n riglyn.' } },
    CO2: { f: 'CO₂', n: { en: 'Carbon dioxide', af: 'Koolstofdioksied' }, k: 'cov', pol: false, pair: ['C', 'O'],
      atoms: [{ e: 'C', x: 0, y: 0, m: 'dot' }, { e: 'O', x: -1.1, y: 0, m: 'x', lp: ['u', 'd'] }, { e: 'O', x: 1.1, y: 0, m: 'x', lp: ['u', 'd'] }],
      bonds: [[0, 1, 2], [0, 2, 2]],
      cap: { en: 'Each C=O double bond is polar (ΔEN = 3.5 − 2.5 = 1.0), but the linear molecule is symmetrical, so the dipoles cancel and CO₂ is non-polar.', af: 'Elke C=O-dubbelbinding is polêr (ΔEN = 3,5 − 2,5 = 1,0), maar die lineêre molekuul is simmetries, dus kanselleer die dipole en CO₂ is nie-polêr.' } },
    NaCl: { f: 'NaCl', n: { en: 'Sodium chloride', af: 'Natriumchloried' }, k: 'ion', pair: ['Na', 'Cl'],
      atoms: [{ e: 'Na', x: -0.85, y: 0, m: 'dot', one: ['r'], q: '+' }, { e: 'Cl', x: 0.85, y: 0, m: 'x', lp: ['u', 'd', 'r'], one: ['l'], q: '−' }],
      tr: [[0, 'r', 1, 'l']],
      cap: { en: 'ΔEN = 3.0 − 0.9 = 2.1 > 1.7: Na transfers its one valence electron to Cl, forming Na⁺ and Cl⁻ ions held together by electrostatic attraction.', af: 'ΔEN = 3,0 − 0,9 = 2,1 > 1,7: Na dra sy een valenselektron aan Cl oor, en Na⁺- en Cl⁻-ione vorm wat deur elektrostatiese aantrekking bymekaar gehou word.' } },
    MgO: { f: 'MgO', n: { en: 'Magnesium oxide', af: 'Magnesiumoksied' }, k: 'ion', pair: ['Mg', 'O'],
      atoms: [{ e: 'Mg', x: -0.85, y: 0, m: 'dot', one: ['r', 'u'], q: '2+' }, { e: 'O', x: 0.85, y: 0, m: 'x', lp: ['r', 'd'], one: ['l', 'u'], q: '2−' }],
      tr: [[0, 'r', 1, 'l'], [0, 'u', 1, 'u']],
      cap: { en: 'ΔEN = 3.5 − 1.2 = 2.3 > 1.7: Mg transfers two electrons to O, forming Mg²⁺ and O²⁻ ions.', af: 'ΔEN = 3,5 − 1,2 = 2,3 > 1,7: Mg dra twee elektrone aan O oor, en Mg²⁺- en O²⁻-ione vorm.' } },
    CaCl2: { f: 'CaCl₂', n: { en: 'Calcium chloride', af: 'Kalsiumchloried' }, k: 'ion', pair: ['Ca', 'Cl'],
      atoms: [{ e: 'Ca', x: 0, y: 0, m: 'dot', one: ['l', 'r'], q: '2+' }, { e: 'Cl', x: -1.6, y: 0, m: 'x', lp: ['l', 'u', 'd'], one: ['r'], q: '−' }, { e: 'Cl', x: 1.6, y: 0, m: 'x', lp: ['r', 'u', 'd'], one: ['l'], q: '−' }],
      tr: [[0, 'l', 1, 'r'], [0, 'r', 2, 'l']],
      cap: { en: 'ΔEN = 3.0 − 1.0 = 2.0 > 1.7: Ca gives one electron to each of two Cl atoms, so the formula is CaCl₂ (one Ca²⁺ for every two Cl⁻).', af: 'ΔEN = 3,0 − 1,0 = 2,0 > 1,7: Ca gee een elektron aan elk van twee Cl-atome, dus is die formule CaCl₂ (een Ca²⁺ vir elke twee Cl⁻).' } },
    Na: { f: 'Na', n: { en: 'Sodium metal', af: 'Natriummetaal' }, k: 'met', pair: ['Na', 'Na'],
      cap: { en: 'Metal atoms release their valence electrons into a sea of delocalised electrons; the attraction between the Na⁺ cations and this sea is the metallic bond.', af: 'Metaalatome stel hul valenselektrone vry in \'n see van gedelokaliseerde elektrone; die aantrekking tussen die Na⁺-katione en hierdie see is die metaalbinding.' } },
  };
  const ORDER = ['H2', 'Cl2', 'N2', 'CH4', 'NH3', 'H2O', 'HCl', 'HF', 'CO2', 'NaCl', 'MgO', 'CaCl2', 'Na'];
  const DIR = { u: [0, -1], d: [0, 1], l: [-1, 0], r: [1, 0] };
  const S = { k: 'H2', p: 1, t: 0, el: [] };
  const sub = () => SUBS[S.k];
  const dEN = (s) => +Math.abs(EN[s.pair[0]] - EN[s.pair[1]]).toFixed(1);
  // bond type by the page's cut-offs (rule of thumb); HF and metals handled as described at the top
  function btype(s) {
    if (s.k === 'met') return 'me';
    const d = dEN(s);
    if (s.over) return 'vpc';
    if (d > 1.7) return 'io';
    if (d < 0.4) return 'np';
    return d === 0.4 ? 'wpc' : 'pc';
  }

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 480 : Math.max(420, Math.min(460, Math.round(w * 0.6))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.prim, unit: '' });
  const ro = MLX.readout(prim.el, [['t', T.type], ['e', T.ens], ['m', T.mol]]);
  const c1 = MLX.card(ui.side, T.pick);
  MLX.seg(c1, { label: T.sub, options: ORDER.map(k => [k, SUBS[k].f]), value: S.k, onChange: (v) => { S.k = v; S.p = MLX.reducedMotion ? 1 : 0; seedEl(); update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  const bAgain = MLX.button(bt, T.again, () => { S.p = MLX.reducedMotion ? 1 : 0; update(); }, 'primary');
  MLX.loop(ui.cv.el, (dt) => {
    if (MLX.reducedMotion) return;
    const s = sub();
    if (s.k === 'ion' && S.p < 1) { S.p = Math.min(1, S.p + dt / 1.8); ui.cv.draw(); }
    else if (s.k === 'met') { S.t += dt; ui.cv.draw(); }
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  // delocalised electrons: fixed pseudo-random start positions and velocities (normalised box coordinates)
  function seedEl() {
    S.el = [];
    let r = 7;
    const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    for (let i = 0; i < 21; i++) S.el.push({ x: rnd(), y: rnd(), vx: (rnd() - 0.5) * 0.16, vy: (rnd() - 0.5) * 0.16 });
  }
  seedEl();

  let c, ctx;
  const elCol = () => c.light ? '#b45309' : '#f5b23d'; // crosses (second atom's electrons)
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const top = Math.round(H * (W < 640 ? 0.54 : 0.53));
    const s = sub();
    if (s.k === 'met') metal(0, 0, W, top); else lewis(0, 0, W, top, s);
    ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(14, top + 0.5); ctx.lineTo(W - 14, top + 0.5); ctx.stroke();
    scale(0, top, W, H - top, s);
  }
  function mark(x, y, kind, col) {
    if (kind === 'dot') { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 2.8, 0, Math.PI * 2); ctx.fill(); }
    else { ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(x - 3.2, y - 3.2); ctx.lineTo(x + 3.2, y + 3.2); ctx.moveTo(x + 3.2, y - 3.2); ctx.lineTo(x - 3.2, y + 3.2); ctx.stroke(); }
  }
  function lewis(x0, y0, w, h, s) {
    const ion = s.k === 'ion';
    const xs = s.atoms.map(a => a.x), ys = s.atoms.map(a => a.y);
    const spanX = Math.max(...xs) - Math.min(...xs), spanY = Math.max(...ys) - Math.min(...ys);
    const u = Math.min(78, (w - 70) / (spanX + 1.5), (h - 110) / (spanY + 1.2));
    const cx = x0 + w / 2, cy = y0 + 46 + (h - 92) / 2 - (spanY ? 0 : 4);
    const P = s.atoms.map(a => ({ x: cx + a.x * u, y: cy + a.y * u }));
    const R = 20, colOf = (a) => a.m === 'dot' ? c.ink : elCol();
    // title and key
    text(ctx, L(s.n) + ', ' + s.f, x0 + 14, y0 + 22, { size: 14, weight: 700, color: c.text });
    const first = s.atoms.find(a => a.m === 'dot'), second = s.atoms.find(a => a.m === 'x');
    let kx = x0 + 14; const ky = y0 + 42;
    [[first, 'dot'], [second, 'x']].forEach(([a, k]) => {
      if (!a) return;
      const col = k === 'dot' ? c.ink : elCol();
      mark(kx + 4, ky - 4, k, col);
      const lab = L(T.elOf) + ' ' + a.e;
      text(ctx, lab, kx + 13, ky, { size: 12, color: c.text2 });
      ctx.font = '500 12px "Cabinet Grotesk", sans-serif'; kx += 13 + ctx.measureText(lab).width + 16;
    });
    // electrons: lone pairs and single electrons
    const pairPos = (i, d) => { const v = DIR[d], n = [-v[1], v[0]], r = s.atoms[i].e === 'H' ? R - 2 : R; return [[P[i].x + v[0] * r + n[0] * 4.6, P[i].y + v[1] * r + n[1] * 4.6], [P[i].x + v[0] * r - n[0] * 4.6, P[i].y + v[1] * r - n[1] * 4.6]]; };
    const onePos = (i, d) => { const v = DIR[d]; return [P[i].x + v[0] * R, P[i].y + v[1] * R]; };
    let lpAt = null;
    s.atoms.forEach((a, i) => {
      (a.lp || []).forEach(d => { const pp = pairPos(i, d); pp.forEach(q => mark(q[0], q[1], a.m, colOf(a))); const q = { x: (pp[0][0] + pp[1][0]) / 2, y: (pp[0][1] + pp[1][1]) / 2, d }; if (!ion && d !== 'd' && (!lpAt || q.x - q.y > lpAt.x - lpAt.y)) lpAt = q; });
    });
    const e = ion ? ease(S.p) : 1;
    if (ion) {
      // receiving slot: the existing single cross slides to one side of the new pair; the giver's dot travels across
      s.tr.forEach(([gi, gd, ri, rd]) => {
        const from = onePos(gi, gd), pp = pairPos(ri, rd), lift = gd === 'u' || rd === 'u' ? -u * 0.55 : -u * 0.35;
        const own = onePos(ri, rd);
        mark(own[0] + (pp[1][0] - own[0]) * e, own[1] + (pp[1][1] - own[1]) * e, 'x', elCol());
        const tx = pp[0][0], ty = pp[0][1];
        const mx = (from[0] + tx) / 2, my = Math.min(from[1], ty) + lift;
        const bx = (1 - e) * (1 - e) * from[0] + 2 * (1 - e) * e * mx + e * e * tx, by = (1 - e) * (1 - e) * from[1] + 2 * (1 - e) * e * my + e * e * ty;
        if (S.p < 1) { ctx.setLineDash([3, 4]); ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(from[0], from[1]); ctx.quadraticCurveTo(mx, my, tx, ty); ctx.stroke(); ctx.setLineDash([]); }
        mark(bx, by, 'dot', c.ink);
      });
    }
    // shared pairs between bonded atoms: the owner's mark nearer its own atom
    let shAt = null;
    (s.bonds || []).forEach(([a, b, k]) => {
      const dx = P[b].x - P[a].x, dy = P[b].y - P[a].y, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
      const mx = (P[a].x + P[b].x) / 2, my = (P[a].y + P[b].y) / 2;
      for (let j = 0; j < k; j++) {
        const o = (j - (k - 1) / 2) * 10;
        mark(mx - ux * 4.6 + nx * o, my - uy * 4.6 + ny * o, s.atoms[a].m, colOf(s.atoms[a]));
        mark(mx + ux * 4.6 + nx * o, my + uy * 4.6 + ny * o, s.atoms[b].m, colOf(s.atoms[b]));
      }
      if (!shAt && Math.abs(uy) < 0.1) shAt = { x: mx, y: my + (k - 1) * 5 };
    });
    // atom symbols (ions: symbol in square brackets with the charge)
    s.atoms.forEach((a, i) => {
      text(ctx, a.e, P[i].x, P[i].y + 1, { size: 24, weight: 700, color: c.text, align: 'center', base: 'middle' });
      if (ion && S.p >= 1) {
        const big = (a.lp || []).length > 0, hw = big ? R + 10 : 22, hh = big ? R + 10 : 18;
        ctx.strokeStyle = c.text2; ctx.lineWidth = 1.6;
        const bx0 = P[i].x - hw, bx1 = P[i].x + hw, by0 = P[i].y - hh, by1 = P[i].y + hh;
        ctx.beginPath(); ctx.moveTo(bx0 + 6, by0); ctx.lineTo(bx0, by0); ctx.lineTo(bx0, by1); ctx.lineTo(bx0 + 6, by1);
        ctx.moveTo(bx1 - 6, by0); ctx.lineTo(bx1, by0); ctx.lineTo(bx1, by1); ctx.lineTo(bx1 - 6, by1); ctx.stroke();
        text(ctx, a.q, bx1 + 3, by0 + 6, { size: 15, weight: 700, color: a.q.indexOf('+') >= 0 ? c.accent : elCol() });
      }
    });
    // labels with leader lines
    const labY = y0 + h - 16;
    if (ion) {
      ctx.font = '500 13px "Cabinet Grotesk", sans-serif';
      const ls = MLX.wrap(ctx, S.p < 1 ? T.transfer : T.attract, w - 28);
      ls.forEach((ln, i) => text(ctx, ln, cx, labY - (ls.length - 1 - i) * 17, { size: 13, align: 'center', color: c.text2 }));
    } else {
      if (shAt) leader(shAt.x, shAt.y + 8, cx - (lpAt ? Math.min(90, w * 0.2) : 0), labY - 14, T.shared, 'center');
      if (lpAt) {
        // label up and to the right of the top-right lone pair
        ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
        const tw = ctx.measureText(L(T.lone)).width, ly = Math.min(y0 + 66, lpAt.y - 22);
        let lx = lpAt.x + 34, al = 'left';
        if (lx + tw > x0 + w - 14) { lx = x0 + w - 14; al = 'right'; }
        ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(lpAt.x + 6, lpAt.y - 6); ctx.lineTo(lpAt.x + 30, ly + 4); ctx.lineTo(al === 'left' ? lx - 4 : lx - tw - 4, ly + 4); ctx.stroke();
        text(ctx, T.lone, lx, ly + 8, { size: 12, align: al, color: c.text2, base: 'middle' });
      }
    }
  }
  function leader(ax, ay, lx, ly, lab, align) {
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(lx, ly); ctx.stroke();
    text(ctx, lab, lx, align === 'right' ? ly - 4 : ly + 14, { size: 12, align, color: c.text2 });
  }
  const ease = (p) => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  function metal(x0, y0, w, h) {
    text(ctx, L(SUBS.Na.n) + ', Na', x0 + 14, y0 + 22, { size: 14, weight: 700, color: c.text });
    const cols = w < 420 ? 5 : 7, rows = 3, bx0 = x0 + 24, bx1 = x0 + w - 24, by0 = y0 + 40, by1 = y0 + h - 40;
    const gx = (bx1 - bx0) / cols, gy = (by1 - by0) / rows, r = Math.min(17, gx * 0.32, gy * 0.32);
    ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.strokeRect(bx0 + 0.5, by0 + 0.5, bx1 - bx0, by1 - by0);
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const x = bx0 + gx * (i + 0.5), y = by0 + gy * (j + 0.5);
      ctx.fillStyle = c.accentSoft; ctx.strokeStyle = c.accent; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      text(ctx, 'Na⁺', x, y + 1, { size: 12, weight: 700, color: c.text, align: 'center', base: 'middle' });
    }
    // electrons drift between the ions (one per Na atom); positions bounce inside the box
    const n = cols * rows;
    S.el.slice(0, n).forEach((p, i) => {
      let x = p.x + p.vx * S.t, y = p.y + p.vy * S.t;
      x = Math.abs(((x % 2) + 2) % 2); if (x > 1) x = 2 - x; y = Math.abs(((y % 2) + 2) % 2); if (y > 1) y = 2 - y;
      mark(bx0 + 6 + x * (bx1 - bx0 - 12), by0 + 6 + y * (by1 - by0 - 12), 'dot', elCol());
    });
    // key
    const ky = y0 + h - 14;
    mark(x0 + 18, ky - 4, 'dot', elCol()); text(ctx, T.del, x0 + 28, ky, { size: 12, color: c.text2 });
    ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
    const kx = x0 + 28 + ctx.measureText(L(T.del)).width + 22;
    ctx.fillStyle = c.accentSoft; ctx.strokeStyle = c.accent; ctx.beginPath(); ctx.arc(kx, ky - 4, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    text(ctx, T.ion, kx + 11, ky, { size: 12, color: c.text2 });
  }
  // ΔEN scale with the page's cut-offs, and a picture of where the bonding pair sits
  function scale(x0, y0, w, h, s) {
    const met = s.k === 'met', d = dEN(s), MAX = 3.2;
    const sx0 = x0 + 22, sx1 = x0 + w - 22, X = (v) => sx0 + (v / MAX) * (sx1 - sx0);
    text(ctx, T.scale, sx0, y0 + 22, { size: 13, weight: 700, color: c.text });
    const by = y0 + 52, bh = 26;
    const zones = [[0, 0.4, c.lineSoft, T.zNp], [0.4, 1.7, c.accentSoft, T.zPc], [1.7, MAX, c.light ? 'rgba(168,106,0,0.14)' : 'rgba(245,178,61,0.14)', T.zIo]];
    zones.forEach(([a, b, f, lab], i) => {
      ctx.fillStyle = f; ctx.fillRect(X(a), by, X(b) - X(a), bh);
      if (i > 0) text(ctx, lab, (X(a) + X(b)) / 2, by + bh / 2 + 1, { size: 12, align: 'center', base: 'middle', color: c.text2 });
    });
    // the non-polar zone is narrow: label it just beneath its left end
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.strokeRect(X(0) + 0.5, by + 0.5, X(MAX) - X(0) - 1, bh - 1);
    [0.4, 1.7].forEach(v => { ctx.beginPath(); ctx.moveTo(X(v), by); ctx.lineTo(X(v), by + bh + 6); ctx.stroke(); });
    [0, 0.4, 1, 1.7, 2, 3].forEach(v => text(ctx, num(v, v % 1 ? 1 : 0), X(v), by + bh + 18, { size: 12, mono: true, align: 'center', color: v === 0.4 || v === 1.7 ? c.text : c.text3 }));
    text(ctx, T.zNp, X(0), by + bh + 34, { size: 12, color: c.text3 });
    if (!met) {
      const mx = X(Math.min(d, MAX));
      ctx.fillStyle = c.ink; ctx.beginPath(); ctx.moveTo(mx, by - 1); ctx.lineTo(mx - 6, by - 10); ctx.lineTo(mx + 6, by - 10); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx, by); ctx.lineTo(mx, by + bh); ctx.stroke();
      const lab = 'ΔEN = ' + num(d, 1);
      ctx.font = '700 13px "JetBrains Mono", monospace';
      const tw = ctx.measureText(lab).width;
      text(ctx, lab, Math.max(sx0 + tw / 2, Math.min(sx1 - tw / 2, mx)), by - 14, { size: 13, mono: true, weight: 700, align: 'center', color: c.ink });
    }
    // bond picture: atom with lower EN on the left; the bonding pair sits nearer the more electronegative atom
    const py = by + bh + 44, ph = y0 + h - py;
    if (met) { MLX.wrap(ctx, T.metNote, w - 44).forEach((ln, i) => text(ctx, ln, sx0, py + 18 + i * 18, { size: 13, color: c.text2 })); return; }
    const [A, B] = EN[s.pair[0]] <= EN[s.pair[1]] ? s.pair : [s.pair[1], s.pair[0]];
    const ion = btype(s) === 'io', ccy = py + ph * 0.45, gap = Math.min(150, w * 0.32), ax = x0 + w / 2 - gap / 2, bx = x0 + w / 2 + gap / 2, r = 20;
        // electron cloud of the bonding pair
    const mid = (ax + bx) / 2, ex = ion ? bx : mid + (bx - r - 10 - mid) * Math.min(1, d / 1.9);
    ctx.fillStyle = c.light ? 'rgba(168,106,0,0.16)' : 'rgba(245,178,61,0.16)';
    ctx.beginPath(); ctx.ellipse(ex, ccy, ion ? r + 12 : 22 + (1 - Math.min(1, d / 1.9)) * (gap / 2 - r - 12), ion ? r + 4 : 15, 0, 0, Math.PI * 2); ctx.fill();
    [[ax, A], [bx, B]].forEach(([x, e]) => {
      ctx.fillStyle = c.stage; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, ccy, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      text(ctx, e, x, ccy + 1, { size: 15, weight: 700, color: c.text, align: 'center', base: 'middle' });
    });
    mark(ex - 5, ccy - (ion ? r + 9 : 0), 'dot', c.ink); mark(ex + 5, ccy - (ion ? r + 9 : 0), 'x', elCol());
    const qOf = (el) => s.atoms.find(a => a.e === el).q, qA = ion ? qOf(A) : d >= 0.4 ? 'δ+' : '', qB = ion ? qOf(B) : d >= 0.4 ? 'δ−' : '';
    if (qA) { text(ctx, qA, ax - r - 6, ccy - r + 4, { size: 16, weight: 700, align: 'right', color: c.accent }); text(ctx, qB, bx + r + 6, ccy - r + 4, { size: 16, weight: 700, color: elCol() }); }
    const t = btype(s), cap = ion ? T.moved : d < 0.4 ? T.equal : T.unequal;
    text(ctx, L(cap), x0 + w / 2, py + ph - 6, { size: 12, align: 'center', color: c.text2 });
  }
  function update() {
    const s = sub(), t = btype(s), d = dEN(s);
    prim.set(s.k === 'met' ? '—' : num(d, 1));
    ro.set('t', L(T[t]));
    ro.set('e', s.k === 'met' ? 'Na ' + num(EN.Na, 1) : s.pair[0] === s.pair[1] ? s.pair[0] + ' ' + num(EN[s.pair[0]], 1) : s.pair.map(e => e + ' ' + num(EN[e], 1)).join(', '));
    ro.set('m', L(s.k === 'met' ? T.mMet : s.k === 'ion' ? T.mIon : s.pol ? T.mPol : T.mNp));
    bAgain.hidden = s.k !== 'ion';
    ui.setCaption(s.cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + s.f + ': ' + (s.k === 'met' ? L(T.me) : 'ΔEN ' + num(d, 1) + ', ' + L(T[t])) + '.');
    ui.cv.draw();
  }
  update();
});
