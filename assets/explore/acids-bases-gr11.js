/* Gr11 Acids and bases — three views in one module.
 * 1. Proton transfer: Brønsted–Lowry acid (proton donor) gives H⁺ to a base (proton acceptor); the two conjugate
 *    pairs differ by one H⁺. Arrhenius: acid gives H⁺/H₃O⁺ in water, base gives OH⁻ (cannot explain NH₃ or gas reactions).
 * 2. Strength and pH (25 °C, Kw = 1,0 × 10⁻¹⁴): strong acid/base ionise completely ([H₃O⁺] = c or [OH⁻] = c);
 *    weak acid/base ionise partially, x from x²/(c − x) = Ka (or Kb), so [H₃O⁺] ≈ √(Ka·c) as in the lesson.
 *    CH₃COOH Ka = 1,8 × 10⁻⁵, NH₃ Kb = 1,8 × 10⁻⁵ (lesson values). pH = −log[H₃O⁺], pH + pOH = 14.
 * 3. Neutralisation: 25,0 cm³ of 0,100 mol·dm⁻³ acid with 0,100 mol·dm⁻³ base from a burette. The pH comes from the
 *    charge balance solved exactly (bisection), so the equivalence point is pH 7,00 (NaCl), 8,72 (CH₃COONa: salt
 *    hydrolysis makes it basic) or 5,28 (NH₄Cl: acidic), as in the lesson's hydrolysis table.
 * Indicator ranges are the page's table: methyl orange 3,1–4,4 red→yellow; litmus 4,5–8,3 red→blue;
 * bromothymol blue 6,0–7,6 yellow→blue; phenolphthalein 8,2–10,0 colourless→pink.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const Kw = 1e-14;
  const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  const sup = (n) => String(n).split('').map(ch => SUP[ch] || ch).join('');
  function sci(x, d) {
    if (!(x > 0)) return '0';
    let e = Math.floor(Math.log10(x)), m = x / Math.pow(10, e);
    if (+m.toFixed(d) >= 10) { m /= 10; e += 1; }
    if (e === 0) return num(m, d);
    return num(m, d) + ' × 10' + sup(e);
  }
  const T = {
    aria: { en: 'Acids and bases simulation', af: 'Sure-en-basisse-simulasie' },
    show: { en: 'Show', af: 'Wys' },
    mPt: { en: 'Proton transfer', af: 'Protonoordrag' }, mPh: { en: 'Strength and pH', af: 'Sterkte en pH' }, mNeu: { en: 'Neutralisation', af: 'Neutralisasie' },
    // proton transfer
    pDonor: { en: 'Proton donor (acid)', af: 'Protonskenker (suur)' },
    rAcc: { en: 'Proton acceptor (base)', af: 'Protonontvanger (basis)' }, rP1: { en: 'Conjugate pair 1', af: 'Gekonjugeerde paar 1' }, rP2: { en: 'Conjugate pair 2', af: 'Gekonjugeerde paar 2' },
    rArr: { en: 'Arrhenius theory', af: 'Arrhenius-teorie' }, rStr: { en: 'Ionisation', af: 'Ionisasie' },
    rxCard: { en: 'Reaction', af: 'Reaksie' }, again: { en: 'Transfer the proton again', af: 'Dra die proton weer oor' },
    acid: { en: 'acid', af: 'suur' }, base: { en: 'base', af: 'basis' }, conj: { en: 'conjugate', af: 'gekonjugeerde' },
    hDon: { en: 'H⁺ donated', af: 'H⁺ geskenk' }, pair: { en: 'pair', af: 'paar' },
    full: { en: 'complete (→)', af: 'volledig (→)' }, part: { en: 'partial (⇌)', af: 'gedeeltelik (⇌)' },
    strongL: { en: '→  one-way arrow: the acid ionises completely', af: '→  enkelpyl: die suur ioniseer volledig' },
    weakL: { en: '⇌  equilibrium arrow: only partly ionised', af: '⇌  ewewigspyl: slegs gedeeltelik geïoniseer' },
    // strength and pH
    sol: { en: 'Solution', af: 'Oplossing' }, conc: { en: 'Concentration c', af: 'Konsentrasie c' }, dil: { en: 'Dilute ten times', af: 'Verdun tien keer' }, reset: { en: 'Back to 0.1 mol·dm⁻³', af: 'Terug na 0,1 mol·dm⁻³' },
    rH: { en: '[H₃O⁺]', af: '[H₃O⁺]' }, rOH: { en: '[OH⁻]', af: '[OH⁻]' }, rPOH: { en: 'pOH', af: 'pOH' }, rIon: { en: 'Ionised', af: 'Geïoniseer' }, rCol: { en: 'Indicator colour', af: 'Indikatorkleur' },
    ind: { en: 'Indicator', af: 'Indikator' },
    acidic: { en: 'acidic', af: 'suur' }, neutral: { en: 'neutral', af: 'neutraal' }, basic: { en: 'basic', af: 'basies' },
    pHscale: { en: 'pH scale (25 °C)', af: 'pH-skaal (25 °C)' }, hScale: { en: '[H₃O⁺] in mol·dm⁻³', af: '[H₃O⁺] in mol·dm⁻³' },
    change: { en: 'colour change', af: 'kleurverandering' }, shown: { en: 'of 20 particles shown are ionised', af: 'van 20 deeltjies gewys is geïoniseer' },
    molec: { en: 'molecule', af: 'molekuul' },
    // neutralisation
    pairC: { en: 'Acid + base', af: 'Suur + basis' }, vol: { en: 'Base added from the burette', af: 'Basis bygevoeg uit die buret' },
    rNa: { en: 'n(acid) at the start', af: 'n(suur) aan die begin' }, rNb: { en: 'n(base) added', af: 'n(basis) bygevoeg' }, rEx: { en: 'In excess', af: 'In oormaat' },
    rSalt: { en: 'Salt formed', af: 'Sout gevorm' }, rBest: { en: 'Best indicator', af: 'Beste indikator' },
    none: { en: 'none (equivalence)', af: 'geen (ekwivalensie)' },
    xV: { en: 'Volume of base added (cm³)', af: 'Volume basis bygevoeg (cm³)' }, yPH: { en: 'pH', af: 'pH' },
    eqp: { en: 'equivalence point', af: 'ekwivalensiepunt' }, bur: { en: 'burette', af: 'buret' }, flask: { en: 'conical flask', af: 'koniese fles' },
    acidIn: { en: '25.0 cm³ acid, 0.100 mol·dm⁻³', af: '25,0 cm³ suur, 0,100 mol·dm⁻³' }, baseIn: { en: 'base, 0.100 mol·dm⁻³', af: 'basis, 0,100 mol·dm⁻³' },
    tile: { en: 'white tile', af: 'wit teël' },
  };
  const IND = {
    mo: { n: { en: 'Methyl orange', af: 'Metieloranje' }, lo: 3.1, hi: 4.4, a: [214, 40, 40], m: [236, 120, 30], b: [238, 196, 40],
      ca: { en: 'red', af: 'rooi' }, cm: { en: 'orange', af: 'oranje' }, cb: { en: 'yellow', af: 'geel' } },
    lit: { n: { en: 'Litmus', af: 'Lakmoes' }, lo: 4.5, hi: 8.3, a: [206, 40, 60], m: [128, 60, 150], b: [46, 86, 204],
      ca: { en: 'red', af: 'rooi' }, cm: { en: 'purple', af: 'pers' }, cb: { en: 'blue', af: 'blou' } },
    btb: { n: { en: 'Bromothymol blue', af: 'Broomtimolblou' }, lo: 6.0, hi: 7.6, a: [228, 196, 40], m: [60, 160, 84], b: [40, 92, 204],
      ca: { en: 'yellow', af: 'geel' }, cm: { en: 'green', af: 'groen' }, cb: { en: 'blue', af: 'blou' } },
    pp: { n: { en: 'Phenolphthalein', af: 'Fenolftaleïen' }, lo: 8.2, hi: 10.0, a: null, m: [232, 120, 190], b: [214, 36, 140],
      ca: { en: 'colourless', af: 'kleurloos' }, cm: { en: 'pale pink', af: 'ligpienk' }, cb: { en: 'pink', af: 'pienk' } },
  };
  // indicator colour at a pH: [r,g,b,alpha] (alpha 0 = colourless)
  function indCol(k, pH) {
    const d = IND[k];
    const mix = (p, q, f) => p.map((v, i) => Math.round(v + (q[i] - v) * f));
    const A = d.a || d.m;
    if (pH <= d.lo) return d.a ? [...d.a, 1] : [...d.m, 0];
    if (pH >= d.hi) return [...d.b, 1];
    const f = (pH - d.lo) / (d.hi - d.lo);
    if (!d.a) return [...mix(d.m, d.b, f), Math.min(1, f * 1.6)];
    return f < 0.5 ? [...mix(A, d.m, f * 2), 1] : [...mix(d.m, d.b, (f - 0.5) * 2), 1];
  }
  const indName = (k, pH) => { const d = IND[k]; return L(pH <= d.lo ? d.ca : pH >= d.hi ? d.cb : d.cm); };

  // ── proton-transfer reactions: species, arrow, roles (indices), Arrhenius comment, caption
  const RX = {
    HCl: { sp: ['HCl', 'H₂O', 'H₃O⁺', 'Cl⁻'], ar: '→', a: 0, b: 1, ca: 2, cb: 3, strong: true, lab: 'HCl + H₂O',
      arr: { en: 'acid: gives H₃O⁺ in water', af: 'suur: gee H₃O⁺ in water' },
      cap: { en: 'HCl donates a proton to water, so HCl is the acid and H₂O the base (water is amphoteric: here it acts as a base). HCl is strong: it ionises completely.', af: 'HCl skenk \'n proton aan water, dus is HCl die suur en H₂O die basis (water is amfoteries: hier tree dit as \'n basis op). HCl is sterk: dit ioniseer volledig.' } },
    CH3COOH: { sp: ['CH₃COOH', 'H₂O', 'H₃O⁺', 'CH₃COO⁻'], ar: '⇌', a: 0, b: 1, ca: 2, cb: 3, strong: false, lab: 'CH₃COOH + H₂O',
      arr: { en: 'acid: gives H₃O⁺ in water', af: 'suur: gee H₃O⁺ in water' },
      cap: { en: 'Ethanoic acid gives its O–H proton to water, but only a small fraction of the molecules do so: a weak acid in equilibrium (⇌).', af: 'Etanoësuur gee sy O–H-proton aan water, maar slegs \'n klein fraksie van die molekules doen dit: \'n swak suur in ewewig (⇌).' } },
    NH3: { sp: ['NH₃', 'H₂O', 'NH₄⁺', 'OH⁻'], ar: '⇌', a: 1, b: 0, ca: 2, cb: 3, strong: false, lab: 'NH₃ + H₂O',
      arr: { en: 'cannot explain it (NH₃ has no OH⁻)', af: 'kan dit nie verklaar nie (NH₃ het geen OH⁻)' },
      cap: { en: 'NH₃ accepts a proton from water, so here water is the acid (amphoteric) and NH₃ the base. The OH⁻ comes from the water, not from NH₃.', af: 'NH₃ ontvang \'n proton van water, dus is water hier die suur (amfoteries) en NH₃ die basis. Die OH⁻ kom van die water, nie van NH₃ nie.' } },
    NH4: { sp: ['NH₄⁺', 'H₂O', 'NH₃', 'H₃O⁺'], ar: '⇌', a: 0, b: 1, ca: 3, cb: 2, strong: false, lab: 'NH₄⁺ + H₂O',
      arr: { en: 'not covered: use Brønsted–Lowry', af: 'nie gedek nie: gebruik Brønsted–Lowry' },
      cap: { en: 'The ammonium ion is the conjugate acid of NH₃: it donates a proton to water, which is why NH₄Cl solutions are acidic.', af: 'Die ammoniumioon is die gekonjugeerde suur van NH₃: dit skenk \'n proton aan water, en daarom is NH₄Cl-oplossings suur.' } },
    HSO4: { sp: ['HSO₄⁻', 'H₂O', 'SO₄²⁻', 'H₃O⁺'], ar: '⇌', a: 0, b: 1, ca: 3, cb: 2, strong: false, lab: 'HSO₄⁻ + H₂O',
      arr: { en: 'not covered: use Brønsted–Lowry', af: 'nie gedek nie: gebruik Brønsted–Lowry' },
      cap: { en: 'HSO₄⁻ donates a proton to water and becomes SO₄²⁻. It can also accept a proton (to form H₂SO₄), so HSO₄⁻ is amphoteric.', af: 'HSO₄⁻ skenk \'n proton aan water en word SO₄²⁻. Dit kan ook \'n proton ontvang (om H₂SO₄ te vorm), dus is HSO₄⁻ amfoteries.' } },
    HClNH3: { sp: ['HCl', 'NH₃', 'NH₄⁺', 'Cl⁻'], ar: '→', a: 0, b: 1, ca: 2, cb: 3, strong: true, lab: 'HCl + NH₃ (g)',
      arr: { en: 'cannot explain it (no water)', af: 'kan dit nie verklaar nie (geen water)' },
      cap: { en: 'HCl gas and NH₃ gas react without water to form solid NH₄Cl. There is a proton transfer, so Brønsted–Lowry describes it; Arrhenius cannot.', af: 'HCl-gas en NH₃-gas reageer sonder water om vaste NH₄Cl te vorm. Daar is \'n protonoordrag, dus beskryf Brønsted–Lowry dit; Arrhenius kan nie.' } },
  };
  const RXK = ['HCl', 'CH3COOH', 'NH3', 'NH4', 'HSO4', 'HClNH3'];

  // ── solutions for the strength view
  const SOL = {
    sa: { f: 'HCl', lab: { en: 'HCl (strong acid)', af: 'HCl (sterk suur)' }, acid: true, K: 0, mol: 'HCl', cat: 'H₃O⁺', an: 'Cl⁻' },
    wa: { f: 'CH₃COOH', lab: { en: 'CH₃COOH (weak acid)', af: 'CH₃COOH (swak suur)' }, acid: true, K: 1.8e-5, mol: 'CH₃COOH', cat: 'H₃O⁺', an: 'CH₃COO⁻' },
    sb: { f: 'NaOH', lab: { en: 'NaOH (strong base)', af: 'NaOH (sterk basis)' }, acid: false, K: 0, mol: 'NaOH', cat: 'Na⁺', an: 'OH⁻' },
    wb: { f: 'NH₃', lab: { en: 'NH₃ (weak base)', af: 'NH₃ (swak basis)' }, acid: false, K: 1.8e-5, mol: 'NH₃', cat: 'NH₄⁺', an: 'OH⁻' },
  };
  const CONC = [0.0001, 0.0002, 0.0005, 0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.0];
  const cFmt = (c) => num(c, Math.max(1, Math.ceil(-Math.log10(c) - 1e-9))) + ' mol·dm⁻³';
  function solve(k, c) {
    const s = SOL[k];
    let x, alpha;
    if (!s.K) { x = (c + Math.sqrt(c * c + 4 * Kw)) / 2; alpha = 1; }
    else { x = (-s.K + Math.sqrt(s.K * s.K + 4 * s.K * c)) / 2; alpha = x / c; }
    const H = s.acid ? x : Kw / x;
    return { H, OH: Kw / H, pH: -Math.log10(H), alpha };
  }

  // ── neutralisation pairs
  const PAIR = {
    ss: { lab: 'HCl + NaOH', eq: 'HCl + NaOH → NaCl + H₂O', salt: 'NaCl', acid: 'HCl', base: 'NaOH', wa: 0, wb: 0, best: 'btb' },
    ws: { lab: 'CH₃COOH + NaOH', eq: 'CH₃COOH + NaOH → CH₃COONa + H₂O', salt: 'CH₃COONa', acid: 'CH₃COOH', base: 'NaOH', wa: 1.8e-5, wb: 0, best: 'pp' },
    sw: { lab: 'HCl + NH₃', eq: 'HCl + NH₃ → NH₄Cl', salt: 'NH₄Cl', acid: 'HCl', base: 'NH₃', wa: 0, wb: Kw / 1.8e-5, best: 'mo' },
  };
  const VA = 25, CA = 0.1, CB = 0.1, VEQ = VA * CA / CB;
  function pHmix(k, V) {
    const p = PAIR[k], Vt = VA + V, ca = CA * VA / Vt, cb = CB * V / Vt;
    // charge balance f(H) = 0, increasing in H; bisection on log10 H
    const f = (H) => H + (p.wb ? cb * H / (H + p.wb) : cb) - Kw / H - (p.wa ? ca * p.wa / (p.wa + H) : ca);
    let lo = -14.8, hi = 1;
    for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (f(Math.pow(10, m)) > 0) hi = m; else lo = m; }
    return -(lo + hi) / 2;
  }

  const S = { mode: 'pt', rx: 'HCl', sol: 'sa', ci: 9, ind: 'btb', pair: 'ss', V: 10, p: MLX.reducedMotion ? 1 : 0, t: 0 };

  const ui = MLX.layout(root, { height: (w) => {
    if (S.mode === 'pt') return w < 640 ? 360 : 340;
    if (S.mode === 'ph') return w < 640 ? 530 : 400;
    return w < 640 ? 580 : 400;
  }, ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.pDonor, unit: '' });
  const primTitle = prim.el.querySelector('.mlx-card-title');
  const roBox = {};
  ['pt', 'ph', 'neu'].forEach(m => { roBox[m] = MLX.h('div'); prim.el.appendChild(roBox[m]); });
  const roPt = MLX.readout(roBox.pt, [['b', T.rAcc], ['p1', T.rP1], ['p2', T.rP2], ['s', T.rStr], ['ar', T.rArr]]);
  const roPh = MLX.readout(roBox.ph, [['h', T.rH], ['oh', T.rOH], ['poh', T.rPOH], ['ion', T.rIon], ['col', T.rCol]]);
  const roNeu = MLX.readout(roBox.neu, [['na', T.rNa], ['nb', T.rNb], ['ex', T.rEx], ['salt', T.rSalt], ['col', T.rCol], ['best', T.rBest]]);

  const cMode = MLX.card(ui.side, null);
  MLX.seg(cMode, { label: T.show, options: [['pt', T.mPt], ['ph', T.mPh], ['neu', T.mNeu]], value: S.mode, onChange: (v) => { S.mode = v; if (v === 'pt') S.p = MLX.reducedMotion ? 1 : 0; update(); } });

  const cPt = MLX.card(ui.side, T.rxCard);
  MLX.seg(cPt, { options: RXK.map(k => [k, RX[k].lab]), value: S.rx, onChange: (v) => { S.rx = v; S.p = MLX.reducedMotion ? 1 : 0; update(); } });
  const bp = MLX.h('div', { class: 'mlx-btns' }); cPt.appendChild(bp);
  MLX.button(bp, T.again, () => { S.p = MLX.reducedMotion ? 1 : 0; update(); }, 'primary');

  const cPh = MLX.card(ui.side, T.sol);
  MLX.seg(cPh, { options: Object.keys(SOL).map(k => [k, SOL[k].lab]), value: S.sol, onChange: (v) => { S.sol = v; update(); } });
  const sC = MLX.slider(cPh, { label: T.conc, min: 0, max: CONC.length - 1, step: 1, value: S.ci, fmt: (i) => cFmt(CONC[i]), onInput: (v) => { S.ci = v; update(); } });
  const bd = MLX.h('div', { class: 'mlx-btns' }); cPh.appendChild(bd);
  const bDil = MLX.button(bd, T.dil, () => { S.ci = Math.max(0, S.ci - 3); sC.set(S.ci); update(); }, 'primary');
  MLX.button(bd, T.reset, () => { S.ci = 9; sC.set(9); update(); });

  const cNeu = MLX.card(ui.side, T.pairC);
  MLX.seg(cNeu, { options: Object.keys(PAIR).map(k => [k, PAIR[k].lab]), value: S.pair, onChange: (v) => { S.pair = v; update(); } });
  MLX.slider(cNeu, { label: T.vol, min: 0, max: 50, step: 0.5, value: S.V, fmt: (v) => num(v, 1) + ' cm³', onInput: (v) => { S.V = v; update(); } });

  const cInd = MLX.card(ui.side, T.ind);
  MLX.seg(cInd, { options: Object.keys(IND).map(k => [k, IND[k].n]), value: S.ind, onChange: (v) => { S.ind = v; update(); } });

  MLX.loop(ui.cv.el, (dt) => {
    if (MLX.reducedMotion) return;
    if (S.mode === 'pt') { if (S.p < 1) { S.p = Math.min(1, S.p + dt / 1.8); ui.cv.draw(); } }
    else if (S.mode === 'ph') { S.t += dt; ui.cv.draw(); }
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  const colA = () => c.light ? '#a85a00' : '#f5b23d';   // acid and its conjugate base
  const colB = () => c.light ? '#1d5fbf' : '#74a9ff';   // base and its conjugate acid
  const colH = () => c.light ? '#c0392b' : '#ff7a6b';   // H₃O⁺ / H⁺
  const colOH = () => c.light ? '#1d5fbf' : '#74a9ff';  // OH⁻
  const rgba = (q, a) => 'rgba(' + q[0] + ',' + q[1] + ',' + q[2] + ',' + a + ')';

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (S.mode === 'pt') drawPt(W, H); else if (S.mode === 'ph') drawPh(W, H); else drawNeu(W, H);
  }

  // ── 1. proton transfer
  function drawPt(W, H) {
    const r = RX[S.rx], ph = W < 640;
    const items = [r.sp[0], '+', r.sp[1], r.ar, r.sp[2], '+', r.sp[3]];
    let size = 26;
    const meas = (sz) => { ctx.font = '700 ' + sz + 'px "Cabinet Grotesk", sans-serif'; const gap = sz * 0.55; return items.map(s => ctx.measureText(s).width + (s.length < 3 && /[+→⇌]/.test(s) ? gap * 2 : 0)); };
    let ws = meas(size), tot = ws.reduce((a, b) => a + b, 0);
    if (tot > W - 40) { size = Math.max(14, Math.floor(size * (W - 40) / tot)); ws = meas(size); tot = ws.reduce((a, b) => a + b, 0); }
    const xs = []; let x = (W - tot) / 2;
    ws.forEach(w => { xs.push(x + w / 2); x += w; });
    const X = [xs[0], xs[2], xs[4], xs[6]];
    const yr = ph ? 150 : 140;
    const role = (i) => i === r.a ? 'a' : i === r.b ? 'b' : i === r.ca ? 'ca' : 'cb';
    const colOf = (i) => (role(i) === 'a' || role(i) === 'cb') ? colA() : colB();
    const prodA = MLX.reducedMotion ? 1 : Math.max(0, Math.min(1, (S.p - 0.55) / 0.35));
    items.forEach((s, j) => {
      const sp = j % 2 === 0 ? j / 2 : -1;
      let col = sp >= 0 ? colOf(sp) : c.text2;
      ctx.globalAlpha = (j >= 4) ? 0.25 + 0.75 * prodA : 1;
      text(ctx, s, xs[j], yr, { size, weight: 700, align: 'center', base: 'middle', color: col });
    });
    ctx.globalAlpha = 1;
    // proton arc from the acid to the base (reactant side)
    const xa = X[r.a], xb = X[r.b], top = yr - size * 0.7, hgt = ph ? 52 : 60;
    const ax = (xa + xb) / 2, ay = top - hgt;
    ctx.strokeStyle = colH(); ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(xa, top); ctx.quadraticCurveTo(ax, ay - hgt * 0.4, xb, top); ctx.stroke(); ctx.setLineDash([]);
    // arrowhead at the base end
    const tx = xb - (ax - xb) * 0.001, dir = Math.atan2(top - (ay - hgt * 0.4), xb - ax);
    ctx.fillStyle = colH(); ctx.beginPath(); ctx.moveTo(xb, top); ctx.lineTo(xb - 9 * Math.cos(dir - 0.4), top - 9 * Math.sin(dir - 0.4)); ctx.lineTo(xb - 9 * Math.cos(dir + 0.4), top - 9 * Math.sin(dir + 0.4)); ctx.closePath(); ctx.fill();
    void tx;
    // moving proton
    const q = Math.min(1, S.p / 0.6), qx = (1 - q) * (1 - q) * xa + 2 * (1 - q) * q * ax + q * q * xb, qy = (1 - q) * (1 - q) * top + 2 * (1 - q) * q * (ay - hgt * 0.4) + q * q * top;
    if (S.p < 0.6) {
      ctx.fillStyle = colH(); ctx.beginPath(); ctx.arc(qx, qy - 8, 9, 0, Math.PI * 2); ctx.fill();
      text(ctx, '+', qx, qy - 7.5, { size: 13, weight: 700, align: 'center', base: 'middle', color: c.stage });
    }
    text(ctx, T.hDon, ax, ay - hgt * 0.2 - 12, { size: 13, weight: 600, align: 'center', color: colH() });
    // role labels
    const ly = yr + size * 0.6 + 16;
    [0, 1, 2, 3].forEach(i => {
      const ro = role(i), col = colOf(i);
      if (ro === 'a' || ro === 'b') text(ctx, ro === 'a' ? T.acid : T.base, X[i], ly, { size: 13, weight: 600, align: 'center', color: col });
      else { text(ctx, T.conj, X[i], ly, { size: 12, align: 'center', color: col }); text(ctx, ro === 'ca' ? T.acid : T.base, X[i], ly + 15, { size: 13, weight: 600, align: 'center', color: col }); }
    });
    // conjugate-pair brackets: pair 1 (acid / conj base), pair 2 (base / conj acid)
    const y1 = ly + 34, y2 = ly + 58;
    const brk = (i, j, y, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X[i], ly + 22); ctx.lineTo(X[i], y); ctx.lineTo(X[j], y); ctx.lineTo(X[j], ly + 22); ctx.stroke(); };
    brk(r.a, r.cb, y1, colA()); brk(r.b, r.ca, y2, colB());
    // legend + strength line
    const ky = y2 + 34;
    const key = (y, col, s) => { ctx.fillStyle = col; ctx.fillRect(20, y - 9, 18, 4); text(ctx, s, 46, y - 2, { size: 13, color: c.text }); };
    key(ky, colA(), L(T.pair) + ' 1:  ' + r.sp[r.a] + ' / ' + r.sp[r.cb] + '  (' + L(T.acid) + ' / ' + L(T.conj) + ' ' + L(T.base) + ')');
    key(ky + 22, colB(), L(T.pair) + ' 2:  ' + r.sp[r.ca] + ' / ' + r.sp[r.b] + '  (' + L(T.acid) + ' / ' + L(T.base) + ')');
    const sl = L(r.strong ? T.strongL : T.weakL);
    ctx.font = '500 13px "Cabinet Grotesk", sans-serif';
    MLX.wrap(ctx, sl, W - 40).forEach((ln, i) => text(ctx, ln, 20, ky + 50 + i * 17, { size: 13, color: c.text2 }));
  }

  // ── particle glyphs
  function glyph(kind, x, y, s) {
    const sw = s || 1;
    const ball = (xx, yy, rr, col, sign) => {
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(xx, yy, rr, 0, Math.PI * 2); ctx.fill();
      if (sign) text(ctx, sign, xx, yy + 0.5, { size: 12, weight: 700, align: 'center', base: 'middle', color: c.light ? '#ffffff' : '#0c0e11' });
    };
    const grey = c.light ? '#7a828e' : '#a5adb9', hcol = c.light ? '#c9ced6' : '#e9edf2';
    if (kind === 'HA') { ball(x + 3, y, 9 * sw, grey); ball(x - 8, y - 4, 5 * sw, hcol); }
    else if (kind === 'H3O') ball(x, y, 8 * sw, colH(), '+');
    else if (kind === 'A') ball(x, y, 9 * sw, grey, '−');
    else if (kind === 'Na') ball(x, y, 8 * sw, grey, '+');
    else if (kind === 'OH') ball(x, y, 8 * sw, colOH(), '−');
    else if (kind === 'NaOH') { ball(x - 6, y, 7 * sw, grey); ball(x + 6, y, 7 * sw, colOH()); }
    else if (kind === 'B') { ball(x, y, 9 * sw, colB()); ball(x - 9, y + 5, 3.5, hcol); ball(x + 9, y + 5, 3.5, hcol); ball(x, y - 10, 3.5, hcol); }
    else if (kind === 'BH') ball(x, y, 9 * sw, colB(), '+');
  }
  const KINDS = { sa: ['HA', 'H3O', 'A'], wa: ['HA', 'H3O', 'A'], sb: ['NaOH', 'Na', 'OH'], wb: ['B', 'BH', 'OH'] };
  // fixed pseudo-random cell order for particle positions
  const order = (() => { const a = []; for (let i = 0; i < 40; i++) a.push(i); let r = 11; for (let i = 39; i > 0; i--) { r = (r * 9301 + 49297) % 233280; const j = Math.floor(r / 233280 * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();

  function beaker(x0, y0, bw, bh, fill) {
    const lip = 8;
    ctx.fillStyle = fill; ctx.fillRect(x0 + 2, y0 + bh * 0.12, bw - 4, bh * 0.88 - 2);
    ctx.strokeStyle = c.glass; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0 - lip, y0); ctx.lineTo(x0, y0 + 4); ctx.lineTo(x0, y0 + bh - 6); ctx.quadraticCurveTo(x0, y0 + bh, x0 + 6, y0 + bh);
    ctx.lineTo(x0 + bw - 6, y0 + bh); ctx.quadraticCurveTo(x0 + bw, y0 + bh, x0 + bw, y0 + bh - 6); ctx.lineTo(x0 + bw, y0 + 4); ctx.lineTo(x0 + bw + lip, y0); ctx.stroke();
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 + 2, y0 + bh * 0.12); ctx.lineTo(x0 + bw - 2, y0 + bh * 0.12); ctx.stroke();
  }

  // ── 2. strength and pH
  function drawPh(W, H) {
    const ph = W < 640, s = SOL[S.sol], c0 = CONC[S.ci], R = solve(S.sol, c0);
    const lw = ph ? W : Math.round(W * 0.44);
    const bh0 = ph ? 300 : H;
    // beaker with particles
    const bw = Math.min(lw - 70, 250), bh = Math.min(bh0 - 120, 210), bx = (lw - bw) / 2, by = 34;
    const ic = indCol(S.ind, R.pH);
    beaker(bx, by, bw, bh, ic[3] > 0.02 ? rgba(ic, (c.light ? 0.38 : 0.62) * ic[3] + 0.02) : c.water);
    text(ctx, s.f + '(aq), ' + cFmt(c0), lw / 2, 22, { size: 13, weight: 600, align: 'center', color: c.text });
    const N = 20;
    let k = Math.round(R.alpha * N); if (R.alpha > 0 && k === 0) k = 1; k = Math.min(N, k);
    const kinds = KINDS[S.sol], parts = [];
    for (let i = 0; i < N - k; i++) parts.push(kinds[0]);
    for (let i = 0; i < k; i++) { parts.push(kinds[1]); parts.push(kinds[2]); }
    const cols = 8, rows = 5, gx = (bw - 24) / cols, gy = (bh * 0.88 - 20) / rows;
    parts.forEach((kd, i) => {
      const cell = order[i], cxl = cell % cols, cyl = Math.floor(cell / cols);
      const ph2 = cell * 1.7, jx = MLX.reducedMotion ? 0 : Math.sin(S.t * 1.3 + ph2) * 3, jy = MLX.reducedMotion ? 0 : Math.cos(S.t * 1.1 + ph2 * 1.3) * 3;
      glyph(kd, bx + 12 + (cxl + 0.5) * gx + jx, by + bh * 0.12 + 10 + (cyl + 0.5) * gy + jy);
    });
    // key
    let ky = by + bh + 26;
    const names = [s.mol + ' ' + L(T.molec), s.cat, s.an];
    let kx = 14;
    ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
    names.forEach((nm, i) => {
      const wdt = ctx.measureText(nm).width + 34;
      if (kx + wdt > lw - 6) { kx = 14; ky += 24; }
      glyph(kinds[i], kx + 10, ky - 4, 0.9); text(ctx, nm, kx + 24, ky, { size: 12, color: c.text2 }); kx += wdt + 8;
      ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
    });
    text(ctx, k + ' ' + L(T.shown) + ' (' + num(100 * R.alpha, R.alpha > 0.995 ? 0 : R.alpha < 0.1 ? 2 : 1) + '%)', 14, ky + 22, { size: 12, color: c.text3 });
    if (!ph) { ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(lw + 0.5, 14); ctx.lineTo(lw + 0.5, H - 14); ctx.stroke(); }
    else { ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(14, bh0 + 0.5); ctx.lineTo(W - 14, bh0 + 0.5); ctx.stroke(); }
    // pH scale coloured by the indicator
    const sx0 = ph ? 24 : lw + 34, sx1 = W - 24, sy = ph ? bh0 + 64 : 110, sh = 30;
    const XP = (p) => sx0 + p / 14 * (sx1 - sx0);
    text(ctx, T.pHscale, sx0, sy - 36, { size: 13, weight: 700, color: c.text });
    for (let p = 0; p < 14; p += 0.1) {
      const q = indCol(S.ind, p + 0.05);
      ctx.fillStyle = q[3] > 0.02 ? rgba(q, Math.max(0.15, q[3])) : (c.light ? '#f7f7f5' : '#15181d');
      ctx.fillRect(XP(p), sy, XP(p + 0.1) - XP(p) + 0.6, sh);
    }
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.strokeRect(sx0, sy, sx1 - sx0, sh);
    for (let p = 0; p <= 14; p++) {
      ctx.strokeStyle = c.lineHard; ctx.beginPath(); ctx.moveTo(XP(p), sy + sh); ctx.lineTo(XP(p), sy + sh + 5); ctx.stroke();
      if (!ph || p % 2 === 0) text(ctx, String(p), XP(p), sy + sh + 18, { size: 12, mono: true, align: 'center', color: c.text3 });
    }
    // transition range bracket
    const d = IND[S.ind];
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(XP(d.lo), sy - 4); ctx.lineTo(XP(d.lo), sy - 10); ctx.lineTo(XP(d.hi), sy - 10); ctx.lineTo(XP(d.hi), sy - 4); ctx.stroke();
    const rlab = L(T.change) + ' ' + num(d.lo, 1) + '–' + num(d.hi, 1);
    const rx = Math.max(sx0 + 60, Math.min(sx1 - 60, (XP(d.lo) + XP(d.hi)) / 2));
    text(ctx, rlab, rx, sy - 15, { size: 12, align: 'center', color: c.text2 });
    // pointer at the current pH
    const pX = XP(Math.max(0, Math.min(14, R.pH)));
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.moveTo(pX, sy + sh + 24); ctx.lineTo(pX - 7, sy + sh + 36); ctx.lineTo(pX + 7, sy + sh + 36); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(pX, sy - 2); ctx.lineTo(pX, sy + sh + 2); ctx.stroke();
    const pl = 'pH = ' + num(R.pH, 2);
    text(ctx, pl, Math.max(sx0 + 34, Math.min(sx1 - 34, pX)), sy + sh + 54, { size: 14, weight: 700, mono: true, align: 'center', color: c.ink });
    // acidic / neutral / basic
    const zy = sy + sh + 80;
    text(ctx, T.acidic, (XP(0) + XP(7)) / 2, zy, { size: 12, align: 'center', color: colH() });
    text(ctx, T.neutral, XP(7), zy, { size: 12, align: 'center', color: c.text2 });
    text(ctx, T.basic, (XP(7) + XP(14)) / 2, zy, { size: 12, align: 'center', color: colOH() });
    // [H3O+] scale: pH = −log[H3O+]
    const hy = zy + (ph ? 34 : 44);
    text(ctx, T.hScale, sx0, hy, { size: 12, color: c.text2 });
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sx0, hy + 12); ctx.lineTo(sx1, hy + 12); ctx.stroke();
    for (let p = 0; p <= 14; p += 2) {
      ctx.beginPath(); ctx.moveTo(XP(p), hy + 8); ctx.lineTo(XP(p), hy + 16); ctx.stroke();
      text(ctx, p === 0 ? '1' : '10' + sup(-p), XP(p), hy + 32, { size: 12, mono: true, align: 'center', color: c.text3 });
    }
    ctx.fillStyle = colH(); ctx.beginPath(); ctx.arc(pX, hy + 12, 4.5, 0, Math.PI * 2); ctx.fill();
  }

  // ── 3. neutralisation
  function drawNeu(W, H) {
    const ph = W < 640, p = PAIR[S.pair], pHn = pHmix(S.pair, S.V);
    const aw = ph ? W : Math.round(W * 0.36);
    const ah = ph ? 300 : H;
    // burette
    const bx = ph ? Math.round(aw * 0.34) : aw / 2, btop = 22, bW = 16, bLen = ph ? 110 : Math.min(200, H * 0.48);
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.5;
    ctx.strokeRect(bx - bW / 2, btop, bW, bLen);
    const lvl = btop + 6 + (S.V / 50) * (bLen - 12);
    ctx.fillStyle = c.water; ctx.fillRect(bx - bW / 2 + 1.5, lvl, bW - 3, btop + bLen - lvl - 1);
    ctx.strokeStyle = c.light ? '#3a7bc8' : '#7fb6f2'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bx - bW / 2 + 1.5, lvl); ctx.lineTo(bx + bW / 2 - 1.5, lvl); ctx.stroke();
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1;
    for (let v = 0; v <= 50; v += 5) { const y = btop + 6 + v / 50 * (bLen - 12); ctx.beginPath(); ctx.moveTo(bx - bW / 2, y); ctx.lineTo(bx - bW / 2 + (v % 10 ? 4 : 7), y); ctx.stroke(); }
    // tip and stopcock
    const tipY = btop + bLen;
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(bx - bW / 2, tipY); ctx.lineTo(bx - 2, tipY + 22); ctx.lineTo(bx - 2, tipY + 30); ctx.moveTo(bx + bW / 2, tipY); ctx.lineTo(bx + 2, tipY + 22); ctx.lineTo(bx + 2, tipY + 30); ctx.stroke();
    ctx.fillStyle = c.text3; ctx.fillRect(bx - 11, tipY + 9, 22, 6);
    // labels with leader lines
    const lab = (s, x, y, tx, ty, al) => { ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tx, ty); ctx.stroke(); text(ctx, s, tx + (al === 'right' ? -4 : 4), ty + 4, { size: 12, align: al || 'left', color: c.text2 }); };
    const lx = ph ? bx + 40 : bx + 30;
    lab(L(T.bur), bx + bW / 2, btop + 30, lx, btop + 30);
    text(ctx, p.base + ', ' + num(0.1, 3), lx + 4, btop + 48, { size: 12, color: c.text3 });
    text(ctx, 'mol·dm⁻³', lx + 4, btop + 63, { size: 12, color: c.text3 });
    // conical flask
    const fy = tipY + 38, fh = ph ? ah - fy - 34 : Math.min(150, H - fy - 60), fwB = Math.min(aw * 0.7, ph ? 120 : 130), neck = 22, neckH = fh * 0.28;
    const fx = bx;
    const ic = indCol(S.ind, pHn);
    const liq = fy + neckH + (fh - neckH) * 0.35;
    const shape = () => { ctx.beginPath(); ctx.moveTo(fx - neck / 2, fy); ctx.lineTo(fx - neck / 2, fy + neckH); ctx.lineTo(fx - fwB / 2, fy + fh); ctx.lineTo(fx + fwB / 2, fy + fh); ctx.lineTo(fx + neck / 2, fy + neckH); ctx.lineTo(fx + neck / 2, fy); };
    ctx.save(); shape(); ctx.closePath(); ctx.clip();
    ctx.fillStyle = ic[3] > 0.02 ? rgba(ic, 0.25 + 0.45 * ic[3]) : c.water; ctx.fillRect(fx - fwB, liq, fwB * 2, fh);
    ctx.restore();
    ctx.strokeStyle = c.glass; ctx.lineWidth = 2; shape(); ctx.stroke();
    ctx.fillStyle = c.light ? '#e7e7e3' : '#d9dde3'; ctx.fillRect(fx - fwB / 2 - 14, fy + fh + 2, fwB + 28, 7);
    const fl = fx - fwB / 2 - 6;
    if (!ph) {
      lab(L(T.flask), fx + fwB * 0.34, fy + fh * 0.7, fx + fwB / 2 + 12, fy + fh * 0.5);
      text(ctx, p.acid + ' + ' + L(IND[S.ind].n).toLowerCase(), fx, fy + fh + 28, { size: 12, align: 'center', color: c.text2 });
      text(ctx, L(T.rCol) + ': ' + indName(S.ind, pHn), fx, fy + fh + 44, { size: 12, align: 'center', color: c.text3 });
    } else {
      text(ctx, L(T.flask) + ': ' + p.acid, fx + fwB / 2 + 10, fy + fh * 0.55, { size: 12, color: c.text2 });
      text(ctx, indName(S.ind, pHn), fx + fwB / 2 + 10, fy + fh * 0.55 + 16, { size: 12, color: c.text3 });
    }
    void fl;
    // divider
    ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath();
    if (ph) { ctx.moveTo(14, ah + 0.5); ctx.lineTo(W - 14, ah + 0.5); } else { ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); }
    ctx.stroke();
    // titration curve
    const gx = ph ? 0 : aw + 6, gy = ph ? ah + 6 : 8, gw = ph ? W : W - aw - 6, gh = ph ? H - ah - 10 : H - 16;
    const ax = MLX.axes(ctx, { x0: gx, y0: gy, w: gw, h: gh, xMin: 0, xMax: 50, yMin: 0, yMax: 14, xTitle: T.xV, yTitle: T.yPH, xTicks: 5, yTicks: 7 });
    const d = IND[S.ind];
    const band = indCol(S.ind, (d.lo + d.hi) / 2);
    ctx.fillStyle = rgba(band, 0.16); ctx.fillRect(ax.box.x0, ax.Y(d.hi), ax.box.x1 - ax.box.x0, ax.Y(d.lo) - ax.Y(d.hi));
    text(ctx, L(d.n) + ' ' + num(d.lo, 1) + '–' + num(d.hi, 1), ax.box.x0 + 6, ax.Y(d.hi) - 5, { size: 12, color: c.text2 });
    // full curve faint, travelled part bold
    const curve = (v1, col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let i = 0; i <= 400; i++) { const v = v1 * i / 400, y = ax.Y(pHmix(S.pair, v)); i ? ctx.lineTo(ax.X(v), y) : ctx.moveTo(ax.X(v), y); } ctx.stroke(); };
    curve(50, c.lineHard, 1.2);
    if (S.V > 0) curve(S.V, c.accent, 2.5);
    // equivalence point
    const pEq = pHmix(S.pair, VEQ);
    ctx.setLineDash([4, 4]); ctx.strokeStyle = c.text3; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ax.X(VEQ), ax.box.y1); ctx.lineTo(ax.X(VEQ), ax.Y(pEq)); ctx.lineTo(ax.box.x0, ax.Y(pEq)); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ax.X(VEQ), ax.Y(pEq), 5, 0, Math.PI * 2); ctx.stroke();
    const eqs = L(T.eqp) + ': ' + num(VEQ, 1) + ' cm³, pH ' + num(pEq, 2);
    ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
    const fits = ax.X(VEQ) + 9 + ctx.measureText(eqs).width < ax.box.x1;
    if (fits) text(ctx, eqs, ax.X(VEQ) + 9, ax.Y(pEq) + (pEq > 7 ? 16 : -8), { size: 12, color: c.text });
    else {
      const ey = ax.Y(pEq) + (pEq > 7 ? 16 : -22);
      text(ctx, L(T.eqp) + ':', ax.X(VEQ) + 9, ey, { size: 12, color: c.text });
      text(ctx, num(VEQ, 1) + ' cm³, pH ' + num(pEq, 2), ax.X(VEQ) + 9, ey + 14, { size: 12, color: c.text });
    }
    // current point
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(S.V), ax.Y(pHn), 5.5, 0, Math.PI * 2); ctx.fill();
  }

  function update() {
    ['pt', 'ph', 'neu'].forEach(m => { roBox[m].style.display = S.mode === m ? '' : 'none'; });
    cPt.style.display = S.mode === 'pt' ? '' : 'none';
    cPh.style.display = S.mode === 'ph' ? '' : 'none';
    cNeu.style.display = S.mode === 'neu' ? '' : 'none';
    cInd.style.display = S.mode === 'pt' ? 'none' : '';
    let aria;
    if (S.mode === 'pt') {
      const r = RX[S.rx];
      primTitle.textContent = L(T.pDonor);
      prim.set(r.sp[r.a]);
      roPt.set('b', r.sp[r.b]);
      roPt.set('p1', r.sp[r.a] + ' / ' + r.sp[r.cb]);
      roPt.set('p2', r.sp[r.ca] + ' / ' + r.sp[r.b]);
      roPt.set('s', L(r.strong ? T.full : T.part));
      roPt.set('ar', L(r.arr));
      ui.setCaption(r.cap);
      aria = r.sp[0] + ' + ' + r.sp[1] + ' ' + r.ar + ' ' + r.sp[2] + ' + ' + r.sp[3] + '. ' + L(T.acid) + ': ' + r.sp[r.a] + ', ' + L(T.base) + ': ' + r.sp[r.b] + '.';
    } else if (S.mode === 'ph') {
      const s = SOL[S.sol], c0 = CONC[S.ci], R = solve(S.sol, c0);
      primTitle.textContent = 'pH';
      prim.set(num(R.pH, 2));
      roPh.set('h', sci(R.H, 2) + ' mol·dm⁻³');
      roPh.set('oh', sci(R.OH, 2) + ' mol·dm⁻³');
      roPh.set('poh', num(14 - R.pH, 2));
      roPh.set('ion', num(100 * R.alpha, R.alpha > 0.995 ? 0 : R.alpha < 0.1 ? 2 : 1) + ' %');
      roPh.set('col', indName(S.ind, R.pH));
      bDil.disabled = S.ci < 3;
      const pc = num(100 * R.alpha, R.alpha < 0.1 ? 2 : 1);
      const cap = {
        sa: { en: 'HCl is a strong acid: every molecule ionises, so [H₃O⁺] = c = ' + cFmt(c0) + ' and pH = −log ' + num(c0, Math.max(1, Math.ceil(-Math.log10(c0) - 1e-9))) + ' = ' + num(R.pH, 2) + '. Diluting ten times raises the pH by 1.', af: 'HCl is \'n sterk suur: elke molekuul ioniseer, dus [H₃O⁺] = c = ' + cFmt(c0) + ' en pH = −log ' + num(c0, Math.max(1, Math.ceil(-Math.log10(c0) - 1e-9))) + ' = ' + num(R.pH, 2) + '. Tien keer verdun verhoog die pH met 1.' },
        wa: { en: 'CH₃COOH is a weak acid: only ' + pc + '% of the molecules ionise, so [H₃O⁺] ≈ √(Ka·c) is much smaller than c and the pH is higher than for HCl of the same concentration.', af: 'CH₃COOH is \'n swak suur: slegs ' + pc + '% van die molekules ioniseer, dus is [H₃O⁺] ≈ √(Ka·c) baie kleiner as c en die pH is hoër as vir HCl met dieselfde konsentrasie.' },
        sb: { en: 'NaOH is a strong base: it dissociates completely, so [OH⁻] = c, pOH = −log[OH⁻] and pH = 14 − pOH = ' + num(R.pH, 2) + '.', af: 'NaOH is \'n sterk basis: dit dissosieer volledig, dus [OH⁻] = c, pOH = −log[OH⁻] en pH = 14 − pOH = ' + num(R.pH, 2) + '.' },
        wb: { en: 'NH₃ is a weak base: only ' + pc + '% of the molecules accept a proton from water, so [OH⁻] is much smaller than c and the pH is lower than for NaOH.', af: 'NH₃ is \'n swak basis: slegs ' + pc + '% van die molekules ontvang \'n proton van water, dus is [OH⁻] baie kleiner as c en die pH is laer as vir NaOH.' },
      }[S.sol];
      ui.setCaption(cap);
      aria = s.f + ' ' + cFmt(c0) + ': pH ' + num(R.pH, 2) + ', ' + L(IND[S.ind].n) + ' ' + indName(S.ind, R.pH) + '.';
    } else {
      const p = PAIR[S.pair], pHn = pHmix(S.pair, S.V), na = CA * VA / 1000, nb = CB * S.V / 1000, pEq = pHmix(S.pair, VEQ);
      primTitle.textContent = 'pH';
      prim.set(num(pHn, 2));
      roNeu.set('na', sci(na, 2) + ' mol');
      roNeu.set('nb', sci(nb, 2) + ' mol');
      roNeu.set('ex', Math.abs(S.V - VEQ) < 1e-9 ? L(T.none) : S.V < VEQ ? p.acid : p.base);
      roNeu.set('salt', p.salt);
      roNeu.set('col', indName(S.ind, pHn));
      roNeu.set('best', L(IND[p.best].n));
      const hyd = {
        ss: { en: 'NaCl comes from a strong acid and a strong base, so it does not hydrolyse: pH 7 at the equivalence point. Bromothymol blue (6.0–7.6) changes right there.', af: 'NaCl kom van \'n sterk suur en \'n sterk basis, dus hidroliseer dit nie: pH 7 by die ekwivalensiepunt. Broomtimolblou (6,0–7,6) verander net daar.' },
        ws: { en: 'CH₃COO⁻ is the conjugate base of a weak acid: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻, so the equivalence point is basic (pH ' + num(pEq, 2) + '). Use phenolphthalein.', af: 'CH₃COO⁻ is die gekonjugeerde basis van \'n swak suur: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻, dus is die ekwivalensiepunt basies (pH ' + num(pEq, 2) + '). Gebruik fenolftaleïen.' },
        sw: { en: 'NH₄⁺ is the conjugate acid of a weak base: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺, so the equivalence point is acidic (pH ' + num(pEq, 2) + '). Use methyl orange.', af: 'NH₄⁺ is die gekonjugeerde suur van \'n swak basis: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺, dus is die ekwivalensiepunt suur (pH ' + num(pEq, 2) + '). Gebruik metieloranje.' },
      }[S.pair];
      let cap;
      if (Math.abs(S.V - VEQ) < 0.26) cap = { en: 'Equivalence point: n(base) = n(acid) = 2.50 × 10⁻³ mol. ' + hyd.en, af: 'Ekwivalensiepunt: n(basis) = n(suur) = 2,50 × 10⁻³ mol. ' + hyd.af };
      else if (S.V < VEQ) cap = { en: p.eq + '. The acid is still in excess, so the base added is used up at once and the pH rises only slowly.', af: p.eq + '. Die suur is nog in oormaat, dus word die bygevoegde basis dadelik opgebruik en die pH styg net stadig.' };
      else cap = { en: 'Past the equivalence point all the acid has been neutralised; the extra ' + p.base + ' is in excess, so the solution is basic.', af: 'Ná die ekwivalensiepunt is al die suur geneutraliseer; die ekstra ' + p.base + ' is in oormaat, dus is die oplossing basies.' };
      ui.setCaption(cap);
      aria = p.eq + '. ' + num(S.V, 1) + ' cm³: pH ' + num(pHn, 2) + ', ' + L(IND[S.ind].n) + ' ' + indName(S.ind, pHn) + '.';
    }
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + aria);
    ui.cv.draw();
  }
  update();
});
