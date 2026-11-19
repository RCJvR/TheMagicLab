/* Gr10 Classification of matter.
 *  Classify: pick a sample and follow the flowchart (matter → pure substance / mixture → element, compound,
 *    homogeneous or heterogeneous mixture). A magnified particle picture shows why: one kind of atom, atoms of
 *    different elements bonded in a fixed ratio, different particles evenly mixed, or visibly separate parts.
 *    Elements are also classed as metal, non-metal or metalloid, with conductivity and magnetism.
 *  Separate: pick a mixture and a method (magnet, filtration, evaporation, distillation, paper chromatography)
 *    and run it. Each method works by one property: magnetism, particle size / solubility, boiling point, or
 *    how strongly each dissolved substance is carried by the solvent along the paper.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, text } = MLX;
  const CLS = {
    el: { en: 'Element', af: 'Element' }, cp: { en: 'Compound', af: 'Verbinding' },
    ho: { en: 'Homogeneous mixture', af: 'Homogene mengsel' }, he: { en: 'Heterogeneous mixture', af: 'Heterogene mengsel' },
  };
  const YES = { en: 'yes', af: 'ja' }, NO = { en: 'no', af: 'nee' };
  // particle legend keys
  const PK = {
    Cu: { en: 'copper atom', af: 'koperatoom' }, Fe: { en: 'iron atom', af: 'ysteratoom' }, O2: { en: 'O₂ molecule', af: 'O₂-molekuul' }, S: { en: 'sulfur atom', af: 'swaelatoom' },
    Si: { en: 'silicon atom', af: 'silikonatoom' }, H2O: { en: 'H₂O molecule', af: 'H₂O-molekuul' }, Na: { en: 'Na⁺ ion', af: 'Na⁺-ioon' }, Cl: { en: 'Cl⁻ ion', af: 'Cl⁻-ioon' },
    CO2: { en: 'CO₂ molecule', af: 'CO₂-molekuul' }, N2: { en: 'N₂ molecule', af: 'N₂-molekuul' }, Ar: { en: 'argon atom', af: 'argonatoom' }, Zn: { en: 'zinc atom', af: 'sinkatoom' },
    sand: { en: 'sand grain (SiO₂), far larger', af: 'sandkorrel (SiO₂), baie groter' }, oil: { en: 'oil molecule', af: 'oliemolekuul' },
  };
  const SAMP = {
    cu: { n: { en: 'copper wire', af: 'koperdraad' }, b: { en: 'copper', af: 'koper' }, f: 'Cu', cls: 'el', kind: 'metal', cond: YES, mag: NO, sep: 'pure', pic: 'lat', a: 'Cu' },
    fe: { n: { en: 'iron nail', af: 'yster spyker' }, b: { en: 'iron', af: 'yster' }, f: 'Fe', cls: 'el', kind: 'metal', cond: YES, mag: YES, sep: 'pure', pic: 'lat', a: 'Fe' },
    o2: { n: { en: 'oxygen gas', af: 'suurstofgas' }, b: { en: 'oxygen', af: 'suurstof' }, f: 'O₂', cls: 'el', kind: 'non', cond: NO, mag: NO, sep: 'pure', pic: 'o2' },
    s: { n: { en: 'sulfur powder', af: 'swaelpoeier' }, b: { en: 'sulfur', af: 'swael' }, f: 'S', cls: 'el', kind: 'non', cond: NO, mag: NO, sep: 'pure', pic: 'lat', a: 'S' },
    si: { n: { en: 'silicon', af: 'silikon' }, b: { en: 'silicon', af: 'silikon' }, f: 'Si', cls: 'el', kind: 'semi', cond: { en: 'a little (semiconductor)', af: '\'n bietjie (halfgeleier)' }, mag: NO, sep: 'pure', pic: 'lat', a: 'Si' },
    h2o: { n: { en: 'distilled water', af: 'gedistilleerde water' }, b: { en: 'distilled water', af: 'gedistilleerde water' }, f: 'H₂O', cls: 'cp', cond: { en: 'hardly at all', af: 'amper glad nie' }, mag: NO, sep: 'cp', pic: 'h2o' },
    nacl: { n: { en: 'table salt', af: 'tafelsout' }, b: { en: 'table salt', af: 'tafelsout' }, f: 'NaCl', cls: 'cp', cond: { en: 'not as a solid; yes when molten or dissolved', af: 'nie as vaste stof nie; wel as dit gesmelt of opgelos is' }, mag: NO, sep: 'cp', pic: 'nacl' },
    co2: { n: { en: 'carbon dioxide', af: 'koolstofdioksied' }, b: { en: 'carbon dioxide', af: 'koolstofdioksied' }, f: 'CO₂', cls: 'cp', cond: NO, mag: NO, sep: 'cp', pic: 'co2' },
    sea: { n: { en: 'sea water', af: 'seewater' }, b: { en: 'sea water', af: 'seewater' }, f: { en: 'salt + water', af: 'sout + water' }, cls: 'ho', cond: { en: 'yes (dissolved ions)', af: 'ja (opgeloste ione)' }, mag: NO, pic: 'sea',
      sep: { en: 'evaporation (or distillation to keep the water)', af: 'verdamping (of distillasie om die water te hou)' } },
    air: { n: { en: 'air', af: 'lug' }, b: { en: 'air', af: 'lug' }, f: { en: 'N₂ + O₂ + Ar …', af: 'N₂ + O₂ + Ar …' }, cls: 'ho', cond: NO, mag: NO, pic: 'air',
      sep: { en: 'fractional distillation of liquid air', af: 'fraksionele distillasie van vloeibare lug' } },
    brass: { n: { en: 'brass (alloy)', af: 'geelkoper (allooi)' }, b: { en: 'brass', af: 'geelkoper' }, f: { en: 'Cu + Zn', af: 'Cu + Zn' }, cls: 'ho', cond: YES, mag: NO, pic: 'brass',
      sep: { en: 'not easily: melting and refining', af: 'nie maklik nie: smelt en raffineer' } },
    sandw: { n: { en: 'sand and water', af: 'sand en water' }, b: { en: 'sand + water', af: 'sand + water' }, f: { en: 'SiO₂ + H₂O', af: 'SiO₂ + H₂O' }, cls: 'he', cond: { en: 'hardly at all', af: 'amper glad nie' }, mag: NO, pic: 'sandw',
      sep: { en: 'filtration', af: 'filtrasie' } },
    fes: { n: { en: 'iron filings and sulfur', af: 'ystervylsel en swael' }, b: { en: 'iron + sulfur', af: 'yster + swael' }, f: { en: 'Fe + S', af: 'Fe + S' }, cls: 'he', cond: NO, mag: { en: 'the iron part is', af: 'die ysterdeel is' }, pic: 'fes',
      sep: { en: 'a magnet', af: '\'n magneet' } },
    oilw: { n: { en: 'oil and water', af: 'olie en water' }, b: { en: 'oil + water', af: 'olie + water' }, f: { en: 'two layers', af: 'twee lae' }, cls: 'he', cond: NO, mag: NO, pic: 'oilw',
      sep: { en: 'a separating funnel (run off the bottom layer)', af: '\'n skeitregter (tap die onderste laag af)' } },
  };
  const SORDER = ['cu', 'fe', 'o2', 's', 'si', 'h2o', 'nacl', 'co2', 'sea', 'air', 'brass', 'sandw', 'fes', 'oilw'];
  const KIND = { metal: { en: 'metal', af: 'metaal' }, non: { en: 'non-metal', af: 'nie-metaal' }, semi: { en: 'metalloid', af: 'metalloïed' } };
  const WHY = {
    el: { en: '{n} is an element: it is made of only one kind of atom ({f}) and cannot be broken down into simpler substances.', af: '{n} is \'n element: dit bestaan uit net een soort atoom ({f}) en kan nie in eenvoudiger stowwe afgebreek word nie.' },
    cp: { en: '{n} is a compound: two or more elements are chemically bonded in a fixed ratio ({f}). It can only be broken down by chemical means.', af: '{n} is \'n verbinding: twee of meer elemente is chemies in \'n vaste verhouding gebind ({f}). Dit kan net op chemiese wyse afgebreek word.' },
    ho: { en: '{n} is a homogeneous mixture: different substances are mixed evenly, so every part looks the same and the composition can vary.', af: '{n} is \'n homogene mengsel: verskillende stowwe is eweredig gemeng, dus lyk elke deel dieselfde en die samestelling kan wissel.' },
    he: { en: '{n} is a heterogeneous mixture: the parts are not evenly mixed, and you can see the different components.', af: '{n} is \'n heterogene mengsel: die dele is nie eweredig gemeng nie, en jy kan die verskillende komponente sien.' },
  };
  const SEPP = { pure: { en: 'cannot be separated by physical means', af: 'kan nie op fisiese wyse geskei word nie' }, cp: { en: 'only by chemical means (e.g. electrolysis)', af: 'net op chemiese wyse (bv. elektrolise)' } };

  // ── separation ──
  const MIX = {
    fes: { n: { en: 'iron filings + sulfur', af: 'ystervylsel + swael' }, best: 'mag', prop: { en: 'magnetism', af: 'magnetisme' } },
    sandw: { n: { en: 'sand + water', af: 'sand + water' }, best: 'fil', prop: { en: 'particle size: sand does not dissolve', af: 'deeltjiegrootte: sand los nie op nie' } },
    salt: { n: { en: 'salt water', af: 'soutwater' }, best: 'eva', prop: { en: 'water evaporates, salt does not', af: 'water verdamp, sout nie' } },
    alc: { n: { en: 'ethanol + water', af: 'etanol + water' }, best: 'dis', prop: { en: 'boiling point (78 °C and 100 °C)', af: 'kookpunt (78 °C en 100 °C)' } },
    dyes: { n: { en: 'food dyes in water', af: 'voedselkleursel in water' }, best: 'chr', prop: { en: 'solubility and attraction to the paper', af: 'oplosbaarheid en aantrekking tot die papier' } },
  };
  const MORD = ['fes', 'sandw', 'salt', 'alc', 'dyes'];
  const METH = { mag: { en: 'Magnet', af: 'Magneet' }, fil: { en: 'Filtration', af: 'Filtrasie' }, eva: { en: 'Evaporation', af: 'Verdamping' }, dis: { en: 'Distillation', af: 'Distillasie' }, chr: { en: 'Chromatography', af: 'Chromatografie' } };
  const R = (r, en, af) => ({ r, t: { en, af } });
  const SEP = {
    fes: {
      mag: R('yes', 'The magnet pulls out the iron filings and the sulfur stays in the dish: iron is magnetic, sulfur is not.', 'Die magneet trek die ystervylsel uit en die swael bly in die bakkie: yster is magneties, swael nie.'),
      fil: R('no', 'Both solids stay on the filter paper together: there is no liquid to separate them.', 'Albei vaste stowwe bly saam op die filtreerpapier: daar is geen vloeistof om hulle te skei nie.'),
      eva: R('no', 'There is no liquid to evaporate, so the iron and sulfur stay mixed.', 'Daar is geen vloeistof om te verdamp nie, dus bly die yster en swael gemeng.'),
      dis: R('no', 'Nothing boils off: the two solids stay mixed in the flask (and on strong heating they react to form iron sulfide).', 'Niks kook af nie: die twee vaste stowwe bly gemeng in die fles (en met sterk verhitting reageer hulle om ystersulfied te vorm).'),
      chr: R('no', 'Iron and sulfur do not dissolve in the solvent, so the spot stays on the baseline.', 'Yster en swael los nie in die oplosmiddel op nie, dus bly die kol op die basislyn.') },
    sandw: {
      mag: R('no', 'Sand is not magnetic: nothing is pulled out.', 'Sand is nie magneties nie: niks word uitgetrek nie.'),
      fil: R('yes', 'Sand grains are too big to pass through the filter paper: the sand stays behind as the residue and the water runs through as the filtrate.', 'Sandkorrels is te groot om deur die filtreerpapier te gaan: die sand bly agter as die residu en die water loop deur as die filtraat.'),
      eva: R('part', 'The water evaporates and the sand is left, but the water is lost and it takes a long time. Filtration is better.', 'Die water verdamp en die sand bly oor, maar die water gaan verlore en dit neem lank. Filtrasie is beter.'),
      dis: R('part', 'Pure water collects as the distillate and the sand stays in the flask: it works, but filtration is much simpler.', 'Suiwer water versamel as die distillaat en die sand bly in die fles: dit werk, maar filtrasie is baie eenvoudiger.'),
      chr: R('no', 'Sand does not dissolve: chromatography separates dissolved substances only.', 'Sand los nie op nie: chromatografie skei net opgeloste stowwe.') },
    salt: {
      mag: R('no', 'Neither salt nor water is magnetic.', 'Nóg sout nóg water is magneties.'),
      fil: R('no', 'The salt is dissolved: its particles pass through the filter paper, so the filtrate is still salt water.', 'Die sout is opgelos: sy deeltjies gaan deur die filtreerpapier, dus is die filtraat steeds soutwater.'),
      eva: R('yes', 'The water evaporates and salt crystals are left in the dish. The water itself is lost as vapour.', 'Die water verdamp en soutkristalle bly in die bakkie oor. Die water self gaan as damp verlore.'),
      dis: R('yes', 'Water boils off at 100 °C, condenses and collects as pure water, while the salt stays in the flask. Use this to keep the water too.', 'Water kook af by 100 °C, kondenseer en versamel as suiwer water, terwyl die sout in die fles bly. Gebruik dit om ook die water te hou.'),
      chr: R('no', 'Salt is colourless: there are no coloured spots to separate or to see.', 'Sout is kleurloos: daar is geen gekleurde kolle om te skei of te sien nie.') },
    alc: {
      mag: R('no', 'Neither liquid is magnetic.', 'Geeneen van die vloeistowwe is magneties nie.'),
      fil: R('no', 'Both are liquids that mix completely: they both pass through the filter paper.', 'Albei is vloeistowwe wat heeltemal meng: albei gaan deur die filtreerpapier.'),
      eva: R('no', 'Both liquids evaporate, so nothing is left in the dish.', 'Albei vloeistowwe verdamp, dus bly niks in die bakkie oor nie.'),
      dis: R('yes', 'Ethanol boils at 78 °C, before water at 100 °C, so it collects first in the receiver. A fractionating column gives a purer separation.', 'Etanol kook by 78 °C, voor water by 100 °C, dus versamel dit eerste in die ontvanger. \'n Fraksioneerkolom gee \'n suiwerder skeiding.'),
      chr: R('no', 'Both are colourless liquids: chromatography shows nothing.', 'Albei is kleurlose vloeistowwe: chromatografie wys niks.') },
    dyes: {
      mag: R('no', 'Dyes are not magnetic.', 'Kleurstowwe is nie magneties nie.'),
      fil: R('no', 'The dyes are dissolved: they pass through the filter paper with the water.', 'Die kleurstowwe is opgelos: hulle gaan saam met die water deur die filtreerpapier.'),
      eva: R('part', 'The water evaporates, but the dyes are left mixed together as one dark solid.', 'Die water verdamp, maar die kleurstowwe bly saam gemeng as een donker vaste stof oor.'),
      dis: R('part', 'Pure water collects, but the dyes stay behind in the flask, still mixed with one another.', 'Suiwer water versamel, maar die kleurstowwe bly in die fles agter, steeds met mekaar gemeng.'),
      chr: R('yes', 'The solvent carries each dye up the paper a different distance, depending on its solubility and its attraction to the paper: three separate spots.', 'Die oplosmiddel dra elke kleurstof \'n ander afstand teen die papier op, na gelang van sy oplosbaarheid en aantrekking tot die papier: drie aparte kolle.') },
  };
  const T = {
    aria: { en: 'Classification of matter', af: 'Klassifikasie van materie' },
    view: { en: 'View', af: 'Aansig' }, vC: { en: 'Classify', af: 'Klassifiseer' }, vS: { en: 'Separate', af: 'Skei' },
    sample: { en: 'Sample', af: 'Monster' }, isA: { en: 'This sample is', af: 'Hierdie monster is' },
    kind: { en: 'Metal, non-metal or metalloid', af: 'Metaal, nie-metaal of metalloïed' }, cond: { en: 'Conducts electricity', af: 'Gelei elektrisiteit' }, mag: { en: 'Magnetic', af: 'Magneties' }, sepBy: { en: 'Separate it by', af: 'Skei dit deur' },
    matter: { en: 'Matter', af: 'Materie' }, pure: { en: 'Pure substance', af: 'Suiwer stof' }, mix: { en: 'Mixture', af: 'Mengsel' },
    q1: { en: 'Fixed composition: one substance?', af: 'Vaste samestelling: een stof?' }, q2: { en: 'Can it be broken down chemically?', af: 'Kan dit chemies afgebreek word?' }, q3: { en: 'Uniform throughout?', af: 'Oral eenvormig?' },
    el: { en: 'Element', af: 'Element' }, cp: { en: 'Compound', af: 'Verbinding' }, ho: { en: 'Homogeneous', af: 'Homogeen' }, he: { en: 'Heterogeneous', af: 'Heterogeen' }, mixW: { en: 'mixture', af: 'mengsel' },
    yes: YES, no: NO, mag2: { en: 'particles (magnified)', af: 'deeltjies (vergroot)' },
    mixture: { en: 'Mixture', af: 'Mengsel' }, method: { en: 'Method', af: 'Metode' }, run: { en: 'Run again', af: 'Doen weer' },
    result: { en: 'Result', af: 'Resultaat' }, rYes: { en: 'Separated', af: 'Geskei' }, rPart: { en: 'Partly', af: 'Gedeeltelik' }, rNo: { en: 'Not separated', af: 'Nie geskei nie' },
    best: { en: 'Best method', af: 'Beste metode' }, prop: { en: 'Property used', af: 'Eienskap wat gebruik word' },
  };
  const S = { mode: 'cls', s: 'sea', mix: 'salt', meth: 'eva', p: 1 };

  const HT = { cls: (w) => w < 640 ? 680 : Math.max(400, Math.min(460, Math.round(w * 0.5))), sep: (w) => w < 640 ? 400 : Math.max(380, Math.min(430, Math.round(w * 0.46))) };
  const ui = MLX.layout(root, { height: (w) => HT[S.mode](w), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  MLX.seg(MLX.card(ui.side, null), { label: T.view, options: [['cls', T.vC], ['sep', T.vS]], value: S.mode, onChange: (v) => { S.mode = v; if (v === 'sep') restart(); update(); } });
  const P = { cls: MLX.h('div'), sep: MLX.h('div') };
  ui.side.appendChild(P.cls); ui.side.appendChild(P.sep);
  const pC = MLX.primary(P.cls, { label: T.isA, unit: '' });
  const rC = MLX.readout(pC.el, [['k', T.kind], ['c', T.cond], ['m', T.mag], ['s', T.sepBy]]);
  MLX.seg(MLX.card(P.cls, T.sample), { options: SORDER.map(k => [k, SAMP[k].b]), value: S.s, onChange: (v) => { S.s = v; update(); } });
  const pS = MLX.primary(P.sep, { label: T.result, unit: '' });
  const rS = MLX.readout(pS.el, [['b', T.best], ['p', T.prop]]);
  const cS = MLX.card(P.sep, null);
  MLX.seg(cS, { label: T.mixture, options: MORD.map(k => [k, MIX[k].n]), value: S.mix, onChange: (v) => { S.mix = v; restart(); update(); } });
  MLX.seg(cS, { label: T.method, options: Object.keys(METH).map(k => [k, METH[k]]), value: S.meth, onChange: (v) => { S.meth = v; restart(); update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); cS.appendChild(bt);
  MLX.button(bt, T.run, () => { restart(); update(); });
  function restart() { S.p = MLX.reducedMotion ? 1 : 0; }
  MLX.loop(ui.cv.el, (dt) => { if (S.mode === 'sep' && S.p < 1) { S.p = Math.min(1, S.p + dt / 4); ui.cv.draw(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  const PC = () => c.light
    ? { Cu: '#c2703d', Fe: '#6b7280', O: '#dc2626', S: '#d4a514', Si: '#64748b', H: '#f1f2f4', Na: '#7c3aed', Cl: '#16a34a', C: '#374151', N: '#2563eb', Ar: '#0891b2', Zn: '#94a3b8', sand: '#b08850', oil: '#a16207', water: 'rgba(53,166,240,0.16)' }
    : { Cu: '#e08a50', Fe: '#9ca3af', O: '#ef4444', S: '#facc15', Si: '#94a3b8', H: '#e5e7eb', Na: '#a78bfa', Cl: '#4ade80', C: '#6b7280', N: '#60a5fa', Ar: '#22d3ee', Zn: '#cbd5e1', sand: '#c9a26b', oil: '#facc15', water: 'rgba(53,166,240,0.14)' };
  let rs = 1;
  const rnd = () => { rs = (rs * 9301 + 49297) % 233280; return rs / 233280; };
  function ball(x, y, r, col) { ctx.fillStyle = col; ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.45)' : 'rgba(0,0,0,0.55)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const ph = W < 640;
    if (S.mode === 'cls') {
      if (!ph) { const aw = Math.round(W * 0.37); particles(0, 0, aw, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke(); flow(aw + 8, 0, W - aw - 8, H); }
      else { const th = 336; tree(0, 0, W, th); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(14, th + 0.5); ctx.lineTo(W - 14, th + 0.5); ctx.stroke(); particles(0, th, W, H - th); }
    } else {
      apparatus(0, 0, W, H);
    }
  }

  // ── classify: flowchart (desktop) ──
  function node(x, y, w, h, lab, sub, on, final) {
    MLX.roundRect(ctx, x - w / 2, y - h / 2, w, h, 9);
    ctx.fillStyle = on ? c.accentSoft : (c.light ? 'rgba(22,24,29,0.03)' : 'rgba(255,255,255,0.03)'); ctx.fill();
    ctx.strokeStyle = on ? c.accent : c.lineHard; ctx.lineWidth = on ? (final ? 2.5 : 2) : 1; ctx.stroke();
    text(ctx, lab, x, y + (sub ? -3 : 5), { size: 15, weight: 700, align: 'center', color: on ? c.ink : c.text2 });
    if (sub) text(ctx, sub, x, y + 15, { size: 13, align: 'center', color: on ? c.text : c.text3 });
  }
  function link(x1, y1, x2, y2, lab, on) {
    ctx.strokeStyle = on ? c.accent : c.lineHard; ctx.lineWidth = on ? 2.5 : 1.2;
    const my = (y1 + y2) / 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1, my); ctx.lineTo(x2, my); ctx.lineTo(x2, y2 - 6); ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 5, y2 - 8); ctx.lineTo(x2 + 5, y2 - 8); ctx.closePath(); ctx.fill();
    if (lab) text(ctx, lab, x2 + (x2 < x1 ? -8 : 8), my - 6, { size: 13, weight: 700, align: x2 < x1 ? 'right' : 'left', color: on ? c.accent : c.text3 });
  }
  function flow(x0, y0, w, h) {
    const s = SAMP[S.s], cl = s.cls, pure = cl === 'el' || cl === 'cp';
    const cx = x0 + w / 2, q = w / 4, y1 = y0 + 36, y2 = y0 + 140, y3 = y0 + 262, nh = 44;
    const xs = { pure: cx - q, mix: cx + q, el: cx - q * 1.5, cp: cx - q * 0.5, ho: cx + q * 0.5, he: cx + q * 1.5 };
    const lw = Math.min(150, q - 10);
    node(cx, y1, 150, 40, T.matter, null, true);
    text(ctx, T.q1, cx, y1 + 42, { size: 13, align: 'center', color: c.text2 });
    link(cx, y1 + 52, xs.pure, y2 - nh / 2, T.yes, pure); link(cx, y1 + 52, xs.mix, y2 - nh / 2, T.no, !pure);
    node(xs.pure, y2, Math.min(170, q * 1.6), nh, T.pure, null, pure); node(xs.mix, y2, Math.min(170, q * 1.6), nh, T.mix, null, !pure);
    text(ctx, T.q2, xs.pure, y2 + 42, { size: 13, align: 'center', color: c.text2 }); text(ctx, T.q3, xs.mix, y2 + 42, { size: 13, align: 'center', color: c.text2 });
    link(xs.pure, y2 + 52, xs.el, y3 - 27, T.no, cl === 'el'); link(xs.pure, y2 + 52, xs.cp, y3 - 27, T.yes, cl === 'cp');
    link(xs.mix, y2 + 52, xs.ho, y3 - 27, T.yes, cl === 'ho'); link(xs.mix, y2 + 52, xs.he, y3 - 27, T.no, cl === 'he');
    node(xs.el, y3, lw, 50, T.el, null, cl === 'el', true); node(xs.cp, y3, lw, 50, T.cp, null, cl === 'cp', true);
    node(xs.ho, y3, lw, 50, T.ho, T.mixW, cl === 'ho', true); node(xs.he, y3, lw, 50, T.he, T.mixW, cl === 'he', true);
    // examples under each final box: the samples of that class, the chosen one highlighted
    ['el', 'cp', 'ho', 'he'].forEach(k => {
      let yy = y3 + 46;
      SORDER.filter(sk => SAMP[sk].cls === k).forEach(sk => {
        const on = sk === S.s;
        text(ctx, SAMP[sk].b, xs[k], yy, { size: 13, weight: on ? 700 : 500, align: 'center', color: on ? c.accent : c.text3 });
        yy += 19;
      });
    });
  }
  // ── classify: indented tree (phone) ──
  function tree(x0, y0, w, h) {
    const s = SAMP[S.s], cl = s.cls, pure = cl === 'el' || cl === 'cp';
    const rows = [
      [0, T.matter, true, 'n'], [1, T.q1, false, 'q'],
      [1, T.pure, pure, 'n', T.yes], [2, T.q2, false, 'q'], [2, T.el, cl === 'el', 'n', T.no], [2, T.cp, cl === 'cp', 'n', T.yes],
      [1, T.mix, !pure, 'n', T.no], [2, T.q3, false, 'q'], [2, CLS.ho, cl === 'ho', 'n', T.yes], [2, CLS.he, cl === 'he', 'n', T.no],
    ];
    let y = y0 + 16;
    rows.forEach(([lv, lab, on, ty, ans]) => {
      const x = x0 + 18 + lv * 26;
      if (ty === 'q') { text(ctx, lab, x, y + 15, { size: 13, color: c.text2 }); y += 24; return; }
      ctx.font = '700 15px "Cabinet Grotesk", sans-serif';
      const pre = ans ? L(ans) + ' → ' : '', tw = ctx.measureText(pre + L(lab)).width;
      MLX.roundRect(ctx, x - 8, y, tw + 16, 28, 7);
      ctx.fillStyle = on ? c.accentSoft : 'transparent'; ctx.fill(); if (on) { ctx.strokeStyle = c.accent; ctx.lineWidth = 1.5; ctx.stroke(); }
      text(ctx, pre + L(lab), x, y + 19, { size: 15, weight: 700, color: on ? c.ink : c.text3 });
      y += 32;
    });
  }

  // ── classify: particle pictures ──
  function particles(x0, y0, w, h) {
    const s = SAMP[S.s], pc = PC();
    text(ctx, L(s.n) + (typeof s.f === 'string' ? ' (' + s.f + ')' : ''), x0 + 16, y0 + 26, { size: 15, weight: 700, color: c.text });
    const bs = Math.min(w - 40, h - 104), bx = x0 + (w - bs) / 2, by = y0 + 42;
    text(ctx, T.mag2, bx, by + bs + 16, { size: 12, color: c.text3 });
    ctx.save(); MLX.roundRect(ctx, bx, by, bs, bs, 10); ctx.fillStyle = c.light ? 'rgba(22,24,29,0.025)' : 'rgba(255,255,255,0.025)'; ctx.fill(); ctx.clip();
    rs = 7; const r = bs / 17, legend = [];
    const lattice = (x, y, ww, hh, rr, colFn) => { const sp = rr * 2.05; for (let j = 0; y + rr + j * sp * 0.87 < y + hh; j++) for (let i = 0; x + rr + i * sp + (j % 2) * sp / 2 < x + ww; i++) colFn(x + rr + i * sp + (j % 2) * sp / 2, y + rr + j * sp * 0.87, i, j); };
    const water = (x, y, a, rr) => { [-1, 1].forEach(k => ball(x + Math.cos(a + k * 0.91) * rr * 1.2, y + Math.sin(a + k * 0.91) * rr * 1.2, rr * 0.6, pc.H)); ball(x, y, rr, pc.O); };
    const pair = (x, y, a, rr, col) => { ball(x - Math.cos(a) * rr * 0.75, y - Math.sin(a) * rr * 0.75, rr, col); ball(x + Math.cos(a) * rr * 0.75, y + Math.sin(a) * rr * 0.75, rr, col); };
    const co2 = (x, y, a, rr) => { ball(x - Math.cos(a) * rr * 1.5, y - Math.sin(a) * rr * 1.5, rr * 0.9, pc.O); ball(x + Math.cos(a) * rr * 1.5, y + Math.sin(a) * rr * 1.5, rr * 0.9, pc.O); ball(x, y, rr, pc.C); };
    const scatter = (n, fn, x, y, ww, hh, gap) => { const pts = []; let tries = 0; while (pts.length < n && tries++ < 3000) { const px = x + gap + rnd() * (ww - 2 * gap), py = y + gap + rnd() * (hh - 2 * gap); if (pts.every(p => Math.hypot(p[0] - px, p[1] - py) > gap * 1.6)) pts.push([px, py]); } pts.forEach((p, i) => fn(p[0], p[1], rnd() * 6.28, i)); };
    const liquid = (x, y, ww, hh, rr, fn) => { const sp = rr * 3.7; for (let j = 0; y + sp / 2 + j * sp * 0.9 < y + hh; j++) for (let i = 0; x + sp / 2 + i * sp < x + ww; i++) fn(x + sp / 2 + i * sp + (rnd() - 0.5) * rr * 0.8 + (j % 2) * sp / 2 - sp / 4, y + sp / 2 + j * sp * 0.9 + (rnd() - 0.5) * rr * 0.6, rnd() * 6.28, i, j); };
    const oilC = (x, y, len, rr) => { ctx.strokeStyle = pc.oil; ctx.lineWidth = rr * 0.5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i < 12; i++) { const px = x + i * len / 11, py = y + (i % 2 ? rr * 0.5 : -rr * 0.5); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); };
    switch (s.pic) {
      case 'lat': lattice(bx, by, bs, bs, r, (x, y) => ball(x, y, r * 0.98, pc[s.a])); legend.push([pc[s.a], PK[s.a]]); break;
      case 'o2': scatter(9, (x, y, a) => pair(x, y, a, r * 0.8, pc.O), bx, by, bs, bs, r * 2.2); legend.push([pc.O, PK.O2]); break;
      case 'h2o': liquid(bx, by, bs, bs, r * 0.62, (x, y, a) => water(x, y, a, r * 0.62)); legend.push([pc.O, PK.H2O]); break;
      case 'nacl': lattice(bx, by, bs, bs, r, (x, y, i, j) => ball(x, y, (i + j) % 2 ? r * 0.98 : r * 0.62, (i + j) % 2 ? pc.Cl : pc.Na)); legend.push([pc.Na, PK.Na], [pc.Cl, PK.Cl]); break;
      case 'co2': scatter(8, (x, y, a) => co2(x, y, a, r * 0.75), bx, by, bs, bs, r * 2.4); legend.push([pc.C, PK.CO2]); break;
      case 'sea': liquid(bx, by, bs, bs, r * 0.62, (x, y, a, i, j) => { const k = (i * 7 + j * 3) % 11; if (k === 0) ball(x, y, r * 0.5, pc.Na); else if (k === 5) ball(x, y, r * 0.8, pc.Cl); else water(x, y, a, r * 0.62); }); legend.push([pc.O, PK.H2O], [pc.Na, PK.Na], [pc.Cl, PK.Cl]); break;
      case 'air': scatter(14, (x, y, a, i) => i === 13 ? ball(x, y, r * 0.8, pc.Ar) : i % 4 === 3 ? pair(x, y, a, r * 0.7, pc.O) : pair(x, y, a, r * 0.72, pc.N), bx, by, bs, bs, r * 1.9); legend.push([pc.N, PK.N2], [pc.O, PK.O2], [pc.Ar, PK.Ar]); break;
      case 'brass': lattice(bx, by, bs, bs, r, (x, y, i, j) => ball(x, y, r * 0.98, (i * 5 + j * 3) % 3 === 0 ? pc.Zn : pc.Cu)); legend.push([pc.Cu, PK.Cu], [pc.Zn, PK.Zn]); break;
      case 'sandw': {
        liquid(bx, by, bs, bs, r * 0.62, (x, y, a) => { if (y < by + bs * 0.56) water(x, y, a, r * 0.62); });
        ctx.fillStyle = pc.sand; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2;
        [[0.22, 0.8, 0.2], [0.62, 0.84, 0.24], [0.95, 0.78, 0.18]].forEach(([fx, fy, fr]) => { ctx.beginPath(); for (let i = 0; i < 9; i++) { const t = i / 9 * 6.28, rr = bs * fr * (0.85 + 0.25 * Math.sin(i * 2.3 + fx * 9)); const px = bx + bs * fx + Math.cos(t) * rr, py = by + bs * fy + Math.sin(t) * rr * 0.75; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.fill(); ctx.stroke(); });
        legend.push([pc.O, PK.H2O], [pc.sand, PK.sand]); break;
      }
      case 'fes': lattice(bx, by, bs * 0.46, bs, r, (x, y) => ball(x, y, r * 0.98, pc.Fe)); lattice(bx + bs * 0.54, by, bs * 0.46, bs, r * 1.05, (x, y) => ball(x, y, r, pc.S));
        ctx.strokeStyle = c.lineHard; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(bx + bs * 0.5, by); ctx.lineTo(bx + bs * 0.5, by + bs); ctx.stroke(); ctx.setLineDash([]);
        legend.push([pc.Fe, PK.Fe], [pc.S, PK.S]); break;
      case 'oilw': for (let j = 0; j < 6; j++) oilC(bx + 8 + (j % 2) * 12, by + r * 1.2 + j * r * 1.2, bs - 30, r * 0.5);
        ctx.strokeStyle = c.lineHard; ctx.beginPath(); ctx.moveTo(bx, by + bs * 0.44); ctx.lineTo(bx + bs, by + bs * 0.44); ctx.stroke();
        liquid(bx, by + bs * 0.46, bs, bs * 0.54, r * 0.62, (x, y, a) => water(x, y, a, r * 0.62)); legend.push([pc.oil, PK.oil], [pc.O, PK.H2O]); break;
    }
    ctx.restore();
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; MLX.roundRect(ctx, bx, by, bs, bs, 10); ctx.stroke();
    // legend
    let lx = bx, ly = by + bs + 38;
    legend.forEach(([col, lab]) => {
      ctx.font = '500 13px "Cabinet Grotesk", sans-serif'; const tw = ctx.measureText(L(lab)).width;
      if (lx + 20 + tw > x0 + w - 8) { lx = bx; ly += 20; }
      ball(lx + 6, ly - 5, 6, col); text(ctx, lab, lx + 17, ly, { size: 13, color: c.text2 }); lx += 17 + tw + 16;
    });
  }

  // ── separate: apparatus ──
  function liqCol(m) { // colour of the mixture's liquid
    if (m === 'dyes') return c.light ? 'rgba(90,70,120,0.45)' : 'rgba(150,120,200,0.42)';
    return c.light ? 'rgba(53,166,240,0.22)' : 'rgba(53,166,240,0.22)';
  }
  const ease = (t) => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t);
  function label(x, y, tx, ty, s, align) { ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tx, ty); ctx.stroke(); text(ctx, s, tx + (align === 'right' ? -4 : 4), ty + 4, { size: 13, align: align || 'left', color: c.text2 }); }
  function flame(x, y, s) { ctx.fillStyle = c.light ? 'rgba(37,99,235,0.55)' : 'rgba(96,165,250,0.6)'; ctx.beginPath(); ctx.moveTo(x - 7 * s, y); ctx.quadraticCurveTo(x, y - 30 * s, x, y - 34 * s); ctx.quadraticCurveTo(x, y - 30 * s, x + 7 * s, y); ctx.closePath(); ctx.fill(); ctx.fillStyle = c.lineHard; ctx.fillRect(x - 6 * s, y, 12 * s, 26 * s); }
  function solids(x, y, w, n, cols, sz) { rs = 3; for (let i = 0; i < n; i++) { const px = x + rnd() * w, py = y - rnd() * sz * 2.2; ctx.fillStyle = cols[i % cols.length]; ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz); } }
  function apparatus(x0, y0, w, h) {
    const m = S.mix, me = S.meth, pc = PC(), p = S.p, res = SEP[m][me].r;
    text(ctx, L(METH[me]) + ': ' + L(MIX[m].n), x0 + 16, y0 + 26, { size: 15, weight: 700, color: c.text });
    const k = Math.max(0.75, Math.min(1.45, Math.min(w / 420, (h - 50) / 300))), cx = x0 + w * 0.42, base = y0 + h - 30;
    const solidCols = m === 'fes' ? [pc.Fe, pc.S] : m === 'sandw' ? [pc.sand] : null;
    ctx.lineWidth = 2; ctx.strokeStyle = c.glass;
    if (me === 'mag') {
      const dy = base - 30 * k, dw = 240 * k;
      ctx.strokeStyle = c.glass; ctx.beginPath(); ctx.moveTo(cx - dw / 2, dy - 26 * k); ctx.quadraticCurveTo(cx, dy + 18 * k, cx + dw / 2, dy - 26 * k); ctx.stroke();
      const lift = ease((p - 0.35) / 0.5);
      if (solidCols) { rs = 5; for (let i = 0; i < 90; i++) { const fx = (rnd() - 0.5) * dw * 0.7, fy = dy - rnd() * 10 * k, iron = m === 'fes' && i % 2 === 0; let px = cx + fx, py = fy; const hang = rnd(); if (iron) { py = fy + (dy - 196 * k + 3 + hang * 14 - fy) * lift; px = cx + fx * (1 - 0.35 * lift); } ctx.fillStyle = iron ? pc.Fe : solidCols[solidCols.length - 1]; if (iron) { ctx.save(); ctx.translate(px, py); ctx.rotate(lift > 0.5 ? Math.PI / 2 + (hang - 0.5) * 0.6 : hang * 3); ctx.fillRect(-5, -1.5, 10, 3); ctx.restore(); } else ctx.fillRect(px - 2.5, py - 2.5, 5, 5); } }
      if (m !== 'fes') { ctx.fillStyle = m === 'sandw' ? pc.water : liqCol(m); ctx.beginPath(); ctx.moveTo(cx - dw * 0.42, dy - 18 * k); ctx.quadraticCurveTo(cx, dy + 12 * k, cx + dw * 0.42, dy - 18 * k); ctx.closePath(); ctx.fill(); }
      // bar magnet lowered over the dish
      const my = dy - 260 * k + 34 * k * ease(p / 0.35), mw = 170 * k, mh = 30 * k;
      ctx.fillStyle = c.light ? '#dc2626' : '#ef4444'; ctx.fillRect(cx - mw / 2, my, mw / 2, mh); ctx.fillStyle = c.light ? '#2563eb' : '#3b82f6'; ctx.fillRect(cx, my, mw / 2, mh);
      text(ctx, 'N', cx - mw / 4, my + mh / 2 + 1, { size: 15, weight: 700, align: 'center', base: 'middle', color: '#ffffff' }); text(ctx, 'S', cx + mw / 4, my + mh / 2 + 1, { size: 15, weight: 700, align: 'center', base: 'middle', color: '#ffffff' });
      label(cx + mw / 2, my + mh / 2, cx + mw / 2 + 24, my + mh / 2, { en: 'bar magnet', af: 'staafmagneet' });
      label(cx + dw / 2 - 10, dy - 22 * k, cx + dw / 2 + 20, dy - 4 * k, { en: 'dish', af: 'bakkie' });
      if (m === 'fes' && lift > 0.9) label(cx - mw / 2 + 10, my + mh + 8, cx - mw / 2 - 30, my + mh + 30, { en: 'iron filings', af: 'ystervylsel' }, 'right');
    } else if (me === 'fil') {
      const fy = y0 + 56, fw = 170 * k, fh = 100 * k, by = base, bw = 130 * k, bh = 110 * k;
      // funnel + filter paper
      ctx.strokeStyle = c.glass; ctx.beginPath(); ctx.moveTo(cx - fw / 2, fy); ctx.lineTo(cx - 9 * k, fy + fh); ctx.lineTo(cx - 9 * k, fy + fh + 40 * k); ctx.moveTo(cx + fw / 2, fy); ctx.lineTo(cx + 9 * k, fy + fh); ctx.lineTo(cx + 9 * k, fy + fh + 40 * k); ctx.stroke();
      ctx.strokeStyle = c.light ? 'rgba(22,24,29,0.35)' : 'rgba(226,232,240,0.45)'; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(cx - fw / 2 + 8, fy + 4); ctx.lineTo(cx, fy + fh - 6); ctx.lineTo(cx + fw / 2 - 8, fy + 4); ctx.stroke(); ctx.setLineDash([]);
      const solid = !!solidCols, liquidIn = m !== 'fes';
      const lvl = liquidIn ? 1 - ease(p) * 0.92 : 0;
      if (liquidIn && lvl > 0.02) { const ly = fy + fh - fh * 0.75 * lvl; ctx.fillStyle = m === 'sandw' ? pc.water : liqCol(m); ctx.beginPath(); ctx.moveTo(cx - (fy + fh - ly) / fh * (fw / 2 - 8), ly); ctx.lineTo(cx, fy + fh - 6); ctx.lineTo(cx + (fy + fh - ly) / fh * (fw / 2 - 8), ly); ctx.closePath(); ctx.fill(); }
      if (solid) solids(cx - 26 * k, fy + fh - 12 * k, 52 * k, 60, solidCols, 4);
      // drips
      if (liquidIn && p > 0.05 && p < 0.98) { const t = (p * 20) % 1; ctx.fillStyle = m === 'sandw' ? (c.light ? 'rgba(53,166,240,0.6)' : 'rgba(53,166,240,0.6)') : liqCol(m); ctx.beginPath(); ctx.arc(cx, fy + fh + 44 * k + t * (by - bh * 0.3 - fy - fh - 44 * k), 3, 0, Math.PI * 2); ctx.fill(); }
      // beaker with filtrate
      ctx.strokeStyle = c.glass; ctx.beginPath(); ctx.moveTo(cx - bw / 2, by - bh); ctx.lineTo(cx - bw / 2, by); ctx.lineTo(cx + bw / 2, by); ctx.lineTo(cx + bw / 2, by - bh); ctx.stroke();
      if (liquidIn) { const fh2 = bh * 0.55 * ease(p); ctx.fillStyle = m === 'sandw' ? pc.water : liqCol(m); ctx.fillRect(cx - bw / 2 + 1, by - fh2, bw - 2, fh2); }
      label(cx + fw / 2 - 20, fy + 14, cx + fw / 2 + 16, fy + 6, { en: 'filter paper in funnel', af: 'filtreerpapier in tregter' });
      if (solid) label(cx + 18 * k, fy + fh - 18 * k, cx + fw / 2 + 16, fy + fh - 10 * k, { en: 'residue', af: 'residu' });
      if (liquidIn && p > 0.3) label(cx + bw / 2 - 10, by - bh * 0.2, cx + bw / 2 + 20, by - bh * 0.4, m === 'salt' ? { en: 'filtrate: still salty', af: 'filtraat: steeds sout' } : m === 'dyes' ? { en: 'filtrate: still coloured', af: 'filtraat: steeds gekleur' } : { en: 'filtrate', af: 'filtraat' });
    } else if (me === 'eva') {
      const dy = base - 70 * k, dw = 150 * k;
      // tripod, gauze and burner
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - 80 * k, dy + 1); ctx.lineTo(cx + 80 * k, dy + 1); ctx.moveTo(cx - 70 * k, dy + 1); ctx.lineTo(cx - 80 * k, base); ctx.moveTo(cx + 70 * k, dy + 1); ctx.lineTo(cx + 80 * k, base); ctx.stroke();
      flame(cx, base - 26 * k, k);
      ctx.strokeStyle = c.glass; ctx.beginPath(); ctx.moveTo(cx - dw / 2, dy - 36 * k); ctx.quadraticCurveTo(cx, dy + 36 * k, cx + dw / 2, dy - 36 * k); ctx.stroke();
      const has = m !== 'fes', lvl = has ? 1 - ease(p) : 0;
      if (has && lvl > 0.02) { const top = dy - 4 * k - 18 * k * lvl; ctx.fillStyle = m === 'sandw' ? pc.water : liqCol(m); ctx.beginPath(); ctx.moveTo(cx - dw * 0.42 * (0.4 + 0.6 * lvl), top); ctx.quadraticCurveTo(cx, dy + 22 * k, cx + dw * 0.42 * (0.4 + 0.6 * lvl), top); ctx.closePath(); ctx.fill(); }
      if (has && p > 0.05 && p < 0.99) { ctx.strokeStyle = c.text3; ctx.lineWidth = 1.5; for (let i = -1; i <= 1; i++) { const sx = cx + i * 30 * k, ph = (p * 6 + i) % 1; ctx.beginPath(); ctx.moveTo(sx, dy - 34 * k - ph * 30 * k); ctx.bezierCurveTo(sx - 8, dy - 44 * k - ph * 30 * k, sx + 8, dy - 54 * k - ph * 30 * k, sx, dy - 64 * k - ph * 30 * k); ctx.stroke(); } text(ctx, { en: 'vapour', af: 'damp' }, cx + 46 * k, dy - 80 * k, { size: 13, color: c.text3 }); }
      if (p > 0.6 || !has) {
        if (m === 'salt') solids(cx - 40 * k, dy + 4 * k, 80 * k, 40, [c.light ? '#ffffff' : '#f1f5f9'], 5);
        if (m === 'dyes') solids(cx - 34 * k, dy + 4 * k, 68 * k, 40, [c.light ? '#3b2f4f' : '#6b5b8a'], 5);
        if (solidCols) solids(cx - 40 * k, dy + 4 * k, 80 * k, 50, solidCols, 4);
        if (m === 'salt' && p > 0.9) label(cx + 30 * k, dy, cx + dw / 2 + 20, dy - 10 * k, { en: 'salt crystals', af: 'soutkristalle' });
      }
      label(cx - dw / 2 + 8, dy - 26 * k, cx - dw / 2 - 16, dy - 46 * k, { en: 'evaporating dish', af: 'verdampbak' }, 'right');
    } else if (me === 'dis') {
      const fr = 52 * k, fx = x0 + w * 0.2, fyc = base - 70 * k - fr;
      // flask
      ctx.strokeStyle = c.glass; ctx.beginPath(); ctx.arc(fx, fyc, fr, -Math.PI / 2 + 0.25, Math.PI * 1.5 - 0.25); ctx.stroke();
      const nk = fyc - fr - 46 * k; ctx.beginPath(); ctx.moveTo(fx - 12 * k, fyc - fr + 3); ctx.lineTo(fx - 12 * k, nk); ctx.moveTo(fx + 12 * k, fyc - fr + 3); ctx.lineTo(fx + 12 * k, nk); ctx.stroke();
      ctx.fillStyle = c.lineHard; ctx.fillRect(fx - 15 * k, nk - 12 * k, 30 * k, 14 * k);
      const has = m !== 'fes', drop = m === 'alc' ? 0.45 : 0.75, lvl = has ? 1 - drop * ease(p) : 0;
      if (has) { const ly = fyc + fr - 2 * fr * 0.55 * lvl; ctx.save(); ctx.beginPath(); ctx.arc(fx, fyc, fr - 2, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = m === 'sandw' ? pc.water : liqCol(m); ctx.fillRect(fx - fr, ly, 2 * fr, fyc + fr - ly); ctx.restore(); }
      if (solidCols) solids(fx - 30 * k, fyc + fr - 8 * k, 60 * k, 40, solidCols, 4);
      if (m === 'salt' && p > 0.7) solids(fx - 26 * k, fyc + fr - 8 * k, 52 * k, 26, [c.light ? '#ffffff' : '#f1f5f9'], 4);
      flame(fx, base - 26 * k, k);
      // thermometer
      const tx = fx + 2, tTop = nk - 40 * k; ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx, tTop); ctx.lineTo(tx, nk + 34 * k); ctx.stroke(); ctx.lineWidth = 2;
      const reading = !has ? null : m === 'alc' ? 78 : 100;
      if (reading && p > 0.15) text(ctx, reading + ' °C', tx + 10, tTop + 6, { size: 13, mono: true, weight: 700, color: c.ink });
      label(tx, tTop + 30 * k, tx + 26, tTop + 30 * k, { en: 'thermometer', af: 'termometer' });
      // condenser: from the side arm down to the receiver
      const ax = fx + 12 * k, ay = nk + 22 * k, ex = x0 + w * 0.76, ey = base - 120 * k;
      ctx.strokeStyle = c.glass; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ex, ey); ctx.stroke();
      const dx = ex - ax, dyy = ey - ay, dd = Math.hypot(dx, dyy), ux = dx / dd, uy = dyy / dd, j0 = 0.25, j1 = 0.85;
      [-1, 1].forEach(sg => { ctx.beginPath(); ctx.moveTo(ax + dx * j0 - uy * 13 * k * sg, ay + dyy * j0 + ux * 13 * k * sg); ctx.lineTo(ax + dx * j1 - uy * 13 * k * sg, ay + dyy * j1 + ux * 13 * k * sg); ctx.stroke(); });
      ctx.fillStyle = c.light ? 'rgba(53,166,240,0.10)' : 'rgba(53,166,240,0.08)'; ctx.beginPath(); ctx.moveTo(ax + dx * j0 - uy * 13 * k, ay + dyy * j0 + ux * 13 * k); ctx.lineTo(ax + dx * j1 - uy * 13 * k, ay + dyy * j1 + ux * 13 * k); ctx.lineTo(ax + dx * j1 + uy * 13 * k, ay + dyy * j1 - ux * 13 * k); ctx.lineTo(ax + dx * j0 + uy * 13 * k, ay + dyy * j0 - ux * 13 * k); ctx.closePath(); ctx.fill();
      label(ax + dx * 0.55 + uy * 13 * k, ay + dyy * 0.55 - ux * 13 * k, ax + dx * 0.55 + 10, ay + dyy * 0.55 - 34 * k, { en: 'condenser (cold water)', af: 'kondensor (koue water)' });
      // receiver
      const rw = 70 * k, rh = 80 * k, rx = ex + 6 * k; ctx.strokeStyle = c.glass; ctx.beginPath(); ctx.moveTo(rx - rw / 2, base - rh); ctx.lineTo(rx - rw / 2, base); ctx.lineTo(rx + rw / 2, base); ctx.lineTo(rx + rw / 2, base - rh); ctx.stroke();
      if (has) { const dh = rh * 0.5 * ease(p) * (m === 'alc' ? 0.7 : 1); ctx.fillStyle = c.light ? 'rgba(53,166,240,0.22)' : 'rgba(53,166,240,0.22)'; ctx.fillRect(rx - rw / 2 + 1, base - dh, rw - 2, dh);
        if (p > 0.05 && p < 0.98) { const t = (p * 16) % 1; ctx.fillStyle = c.light ? 'rgba(53,166,240,0.7)' : 'rgba(53,166,240,0.7)'; ctx.beginPath(); ctx.arc(ex, ey + 6 + t * (rh * 0.4), 3, 0, Math.PI * 2); ctx.fill(); } }
      if (has && p > 0.3) label(rx + rw / 2 - 6, base - 14 * k, rx + rw / 2 - 6, base - rh - 18 * k, m === 'alc' ? { en: 'distillate: mostly ethanol', af: 'distillaat: meestal etanol' } : { en: 'distillate: pure water', af: 'distillaat: suiwer water' }, 'right');
    } else {
      // paper chromatography
      const bw = 130 * k, bh = 210 * k, bx = cx - bw / 2, by = base, sol = 26 * k, pw = 46 * k, px = cx - pw / 2, pTop = by - bh + 6, base0 = by - sol - 18 * k;
      ctx.strokeStyle = c.glass; ctx.beginPath(); ctx.moveTo(bx, by - bh); ctx.lineTo(bx, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by - bh); ctx.stroke();
      ctx.fillStyle = c.light ? 'rgba(53,166,240,0.16)' : 'rgba(53,166,240,0.14)'; ctx.fillRect(bx + 1, by - sol, bw - 2, sol - 1);
      ctx.fillStyle = c.light ? '#fbfaf6' : '#d8d4c8'; ctx.fillRect(px, pTop, pw, by - 6 - pTop);
      const front = base0 - (base0 - pTop - 14 * k) * ease(p);
      ctx.fillStyle = c.light ? 'rgba(53,166,240,0.16)' : 'rgba(53,166,240,0.28)'; ctx.fillRect(px, front, pw, by - 6 - front);
      ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, base0); ctx.lineTo(px + pw, base0); ctx.stroke();
      const spot = (y, col, r) => { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, y, r * 1.2, r, 0, 0, Math.PI * 2); ctx.fill(); };
      const run = base0 - front;
      if (m === 'dyes') { [[0.82, c.light ? '#2563eb' : '#3b82f6'], [0.55, c.light ? '#ca8a04' : '#eab308'], [0.3, c.light ? '#dc2626' : '#ef4444']].forEach(([rf, col]) => spot(base0 - run * rf, col, 6 * k)); }
      else if (m === 'fes') spot(base0, c.light ? '#57534e' : '#a8a29e', 6 * k);
      if (p > 0.3) label(px + pw, front, px + pw + 26, front - 6, { en: 'solvent front', af: 'oplosmiddelfront' });
      label(px, base0, px - 26, base0 + 8, { en: 'pencil baseline', af: 'potloodbasislyn' }, 'right');
      label(bx + bw, by - sol / 2, bx + bw + 20, by - sol / 2 + 6, { en: 'solvent (water)', af: 'oplosmiddel (water)' });
    }
    // result tag
    const col = res === 'yes' ? c.accent : c.warn;
    if (p >= 1) text(ctx, res === 'yes' ? T.rYes : res === 'part' ? T.rPart : T.rNo, x0 + w - 16, y0 + 26, { size: 14, weight: 700, align: 'right', color: col });
  }
  function update() {
    P.cls.style.display = S.mode === 'cls' ? '' : 'none'; P.sep.style.display = S.mode === 'sep' ? '' : 'none';
    let cap;
    if (S.mode === 'cls') {
      const s = SAMP[S.s];
      pC.set(L(CLS[s.cls]));
      rC.set('k', s.kind ? L(KIND[s.kind]) : '—'); rC.set('c', L(s.cond)); rC.set('m', L(s.mag));
      rC.set('s', L(typeof s.sep === 'string' ? SEPP[s.sep] : s.sep));
      const nm = L(s.n); cap = L(WHY[s.cls]).replace('{n}', nm.charAt(0).toUpperCase() + nm.slice(1)).replace('{f}', typeof s.f === 'string' ? s.f : L(s.f));
      if (s.kind === 'semi') cap += ' ' + L({ en: 'Silicon is a metalloid: it looks shiny like a metal but only conducts a little (a semiconductor).', af: 'Silikon is \'n metalloïed: dit lyk blink soos \'n metaal, maar gelei net \'n bietjie (\'n halfgeleier).' });
      else if (S.s === 'fe') cap += ' ' + L({ en: 'Iron is one of the few magnetic metals; copper, for example, is not magnetic.', af: 'Yster is een van die min magnetiese metale; koper, byvoorbeeld, is nie magneties nie.' });
    } else {
      const sp = SEP[S.mix][S.meth], mx = MIX[S.mix];
      pS.set(L(sp.r === 'yes' ? T.rYes : sp.r === 'part' ? T.rPart : T.rNo));
      rS.set('b', L(METH[mx.best])); rS.set('p', L(mx.prop));
      cap = L(sp.t);
    }
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + ': ' + cap);
    ui.cv.draw();
  }
  update();
});
