// Grade 4 Math Magician, Chapter 10: Ratio and rate (one bilingual source).
// Run: node scripts/math-gr4/gen_ch10.js   (writes math-magician/gr4/ch10.js, ch10.af.js, ch10.help.js)
// CAPS 1.3 Ratio and rate (Term 3): comparing quantities of the same kind (ratio) and of different kinds (rate, e.g. R/kg).
// Notes on the CAPS draft:
//   - Example b) "The ratio of 1 cm to 1 m" only works once both are in the same unit: 1 m = 100 cm, so 1 cm : 1 m = 1 : 100.
//     The lesson says this explicitly.
//   - Example c) "2 oranges cost R3, so 1 orange costs ___ cents" = 150 cents (R3 = 300c; 300c ÷ 2). Worked in cents.
//   - Example d) "one apple costs R2,50": 2 apples R5,00, 3 apples R7,50, 10 apples R25,00. Grade 4 has no decimals, so
//     R2,50 is used only as the way money is written and every calculation is done in cents (250c) or whole rand.
//   - Simplifying ratios is not in the Grade 4 CAPS, so ratios are written as counted (6 : 4 stays 6 : 4); equivalent
//     ratios appear only as "scaling up" (recipes, ratio tables).
//   - Typed answers in litres are numbers only (the answer checker does not know the ℓ sign).
//   - The draft lists one topic for 2 weeks; it is split into four lessons: ratio, equivalent ratios, rate, rate problems.
const { ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT } = require('./lib.js');
const S = require('./sims_ch10.js');
const T = [];
const same = s => [[s], [s]];

/* ───────────── Figures ───────────── */
const svgw = (vb, body, mw) => `<svg viewBox="${vb}" style="display:block;width:100%;max-width:${mw || 300}px;margin:12px auto" role="img" aria-hidden="true">${body}</svg>`;
// A string of beads: 'r' red, 'b' blue, 'y' yellow, 'g' green.
const BC = { r: '#ef4444', b: '#3b82f6', y: '#facc15', g: '#22c55e' };
function beads(seq) {
  const s = 34; let g = `<line x1="2" y1="20" x2="${seq.length * s + 10}" y2="20" stroke="currentColor" stroke-width="2"/>`;
  [...seq].forEach((c, i) => { g += `<circle cx="${6 + s / 2 + i * s}" cy="20" r="14" fill="${BC[c]}" stroke="rgba(255,255,255,.6)" stroke-width="2"/>`; });
  return svgw(`0 0 ${seq.length * s + 12} 40`, g, Math.min(340, seq.length * 36));
}
// A small table (first row bold when head is set).
const tbl = (rows, head) => `<table style="border-collapse:collapse;margin:12px auto;font-size:18px">${rows.map((r, i) => `<tr>${r.map((c, j) => `<td style="padding:6px 12px;text-align:center;border:1px solid rgba(148,163,184,.35);${(head && i === 0) || j === 0 ? 'font-weight:800' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table>`;
// A metre stick with the first centimetre marked.
const metre = () => svgw('0 0 320 70', `<rect x="10" y="10" width="300" height="30" fill="#fde68a" stroke="#92400e" stroke-width="2"/>` +
  Array.from({ length: 11 }, (_, i) => `<line x1="${10 + i * 30}" y1="10" x2="${10 + i * 30}" y2="${i % 5 ? 22 : 30}" stroke="#92400e" stroke-width="2"/>`).join('') +
  `<rect x="10" y="10" width="3" height="30" fill="#ef4444"/><text x="12" y="60" font-size="13" font-weight="800" fill="currentColor" font-family="sans-serif">1 cm</text><text x="310" y="60" text-anchor="end" font-size="13" font-weight="800" fill="currentColor" font-family="sans-serif">1 m = 100 cm</text>`, 320);
// A road with distance marks every hour.
function road(perH, hours, unit) {
  const w = 300 / hours; let g = `<rect x="10" y="20" width="300" height="24" rx="4" fill="#475569"/><line x1="10" y1="32" x2="310" y2="32" stroke="#f8fafc" stroke-width="2" stroke-dasharray="10 8"/>`;
  for (let i = 0; i <= hours; i++) g += `<line x1="${10 + i * w}" y1="14" x2="${10 + i * w}" y2="50" stroke="currentColor" stroke-width="2"/><text x="${10 + i * w}" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" font-family="sans-serif">${i} h</text>`;
  g += `<text x="${10 + w / 2}" y="10" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor" font-family="sans-serif">${perH} ${unit}</text>`;
  return svgw('0 0 320 72', g, 320);
}
// Buckets filling: n buckets with a label each.
function buckets(n, lab) {
  let g = '';
  for (let i = 0; i < n; i++) { const x = 6 + i * 52; g += `<path d="M${x} 10 l6 44 h28 l6 -44 Z" fill="#38bdf866" stroke="currentColor" stroke-width="2"/><text x="${x + 20}" y="38" text-anchor="middle" font-size="11" font-weight="800" fill="currentColor" font-family="sans-serif">${lab}</text>`; }
  return svgw(`0 0 ${n * 52 + 8} 60`, g, Math.min(340, n * 56));
}
const st = (n, w) => `<img src="/assets/stickers/${n}.webp" alt="" style="width:${w || 44}px;height:${w || 44}px;object-fit:contain;vertical-align:middle">`;

/* ───────────── 1001 Ratio ───────────── */
T.push({
  id: 1001, name: { en: 'What is a ratio?', af: 'Wat is \'n verhouding?' }, full: { en: 'Ratio: comparing quantities of the same kind', af: 'Verhouding: hoeveelhede van dieselfde soort vergelyk' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { aria: 'A string of beads', live: (r, b) => 'Red: <b>' + r + '</b> · Blue: <b>' + b + '</b>', goalRB: (a, b) => 'Make red : blue = ' + a + ' : ' + b, goalBR: (a, b) => 'Make blue : red = ' + a + ' : ' + b, ask: 'Add beads with the buttons. Tap a bead on the string to take it off.', yesRB: (a, b) => 'Correct! ' + a + ' red beads for every ' + b + ' blue beads: red : blue = ' + a + ' : ' + b + '.', yesBR: (a, b) => 'Correct! ' + a + ' blue beads for every ' + b + ' red beads: blue : red = ' + a + ' : ' + b + '.', swapRB: (a, b) => 'Swapped! The ratio says red first: ' + a + ' red and ' + b + ' blue. In a ratio, the order matters.', swapBR: (a, b) => 'Swapped! The ratio says blue first: ' + a + ' blue and ' + b + ' red. In a ratio, the order matters.', wrong: (r, b, wr, wb) => 'You have ' + r + ' red and ' + b + ' blue. You need ' + wr + ' red and ' + wb + ' blue.' }
      : { aria: '\'n String krale', live: (r, b) => 'Rooi: <b>' + r + '</b> · Blou: <b>' + b + '</b>', goalRB: (a, b) => 'Maak rooi : blou = ' + a + ' : ' + b, goalBR: (a, b) => 'Maak blou : rooi = ' + a + ' : ' + b, ask: 'Voeg krale by met die knoppies. Tik op \'n kraal aan die string om dit af te haal.', yesRB: (a, b) => 'Reg! ' + a + ' rooi krale vir elke ' + b + ' blou krale: rooi : blou = ' + a + ' : ' + b + '.', yesBR: (a, b) => 'Reg! ' + a + ' blou krale vir elke ' + b + ' rooi krale: blou : rooi = ' + a + ' : ' + b + '.', swapRB: (a, b) => 'Omgeruil! Die verhouding sê rooi eerste: ' + a + ' rooi en ' + b + ' blou. In \'n verhouding is die volgorde belangrik.', swapBR: (a, b) => 'Omgeruil! Die verhouding sê blou eerste: ' + a + ' blou en ' + b + ' rooi. In \'n verhouding is die volgorde belangrik.', wrong: (r, b, wr, wb) => 'Jy het ' + r + ' rooi en ' + b + ' blou. Jy het ' + wr + ' rooi en ' + wb + ' blou nodig.' };
    const m = `<h4>🎮 ${en ? 'Bead String' : 'Kralestring'}</h4><p class="how">${en ? 'Thread beads to show the ratio. Read the ratio carefully: which colour comes first?' : 'Ryg krale in om die verhouding te wys. Lees die verhouding mooi: watter kleur kom eerste?'}</p><div class="g4-big" data-k="goal" style="font-size:24px"></div><div class="g4-stage" data-k="stage"></div><div data-k="live" style="font-size:19px"></div><div class="g4-row"><button class="g4-btn ghost" data-k="red" style="border-color:#ef4444;color:#fca5a5">+ ${en ? 'red' : 'rooi'}</button><button class="g4-btn ghost" data-k="blue" style="border-color:#3b82f6;color:#93c5fd">+ ${en ? 'blue' : 'blou'}</button><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="clear">${en ? 'Clear' : 'Maak skoon'}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('child', 'A <strong>ratio</strong> compares two amounts of the <strong>same kind</strong>: ages with ages, beads with beads, centimetres with centimetres.') +
      def('Writing a ratio', 'We write a ratio with a colon (<strong>:</strong>) and read it as "to". 3 red beads and 5 blue beads: red : blue = <strong>3 : 5</strong> (three to five). <strong>The order matters:</strong> blue : red = 5 : 3.') + beads('rrrbbbbb') +
      ex('Ages', ['Sarah is 7 years old and Peter is 12 years old.', 'Sarah\'s age : Peter\'s age = <strong>7 : 12</strong>.', 'Peter\'s age : Sarah\'s age = 12 : 7.']) +
      ex('The same units first', ['The ratio of 1 cm to 1 m: the units are different, so change the metre to centimetres.', '1 m = 100 cm, so 1 cm : 1 m = 1 cm : 100 cm = <strong>1 : 100</strong>.' + metre(), 'A ratio has no units. Both amounts must be in the same unit before you write it.']) +
      sim('g4-s1001', S.s1001, L, m) + tip('Say the ratio in words before you write it: "3 red for every 5 blue". Write the numbers in the same order as the words.')
      : hero('child', '\'n <strong>Verhouding</strong> vergelyk twee hoeveelhede van <strong>dieselfde soort</strong>: ouderdomme met ouderdomme, krale met krale, sentimeters met sentimeters.') +
      def('\'n Verhouding skryf', 'Ons skryf \'n verhouding met \'n dubbelpunt (<strong>:</strong>) en lees dit as "tot". 3 rooi krale en 5 blou krale: rooi : blou = <strong>3 : 5</strong> (drie tot vyf). <strong>Die volgorde is belangrik:</strong> blou : rooi = 5 : 3.') + beads('rrrbbbbb') +
      ex('Ouderdomme', ['Sarah is 7 jaar oud en Peter is 12 jaar oud.', 'Sarah se ouderdom : Peter se ouderdom = <strong>7 : 12</strong>.', 'Peter se ouderdom : Sarah se ouderdom = 12 : 7.']) +
      ex('Eers dieselfde eenhede', ['Die verhouding van 1 cm tot 1 m: die eenhede verskil, so verander die meter na sentimeter.', '1 m = 100 cm, so 1 cm : 1 m = 1 cm : 100 cm = <strong>1 : 100</strong>.' + metre(), '\'n Verhouding het geen eenhede nie. Albei hoeveelhede moet in dieselfde eenheid wees voordat jy dit skryf.']) +
      sim('g4-s1001', S.s1001, L, m) + tip('Sê die verhouding in woorde voordat jy dit skryf: "3 rooi vir elke 5 blou". Skryf die getalle in dieselfde volgorde as die woorde.');
  },
  qs: [
    { en: 'Sarah is 7 years old and Peter is 12 years old. Sarah\'s age : Peter\'s age = ? (Type it like 2 : 3.)', af: 'Sarah is 7 jaar oud en Peter is 12 jaar oud. Sarah se ouderdom : Peter se ouderdom = ? (Tik dit soos 2 : 3.)', a: '7 : 12', lv: 'K', h: ['Sarah comes first.', 'Sarah kom eerste.'], s: same('7 : 12') },
    { en: 'What is the ratio of red beads to blue beads?' + beads('rrrbbbbb'), af: 'Wat is die verhouding van rooi krale tot blou krale?' + beads('rrrbbbbb'), o: [['3 : 5', '5 : 3', '3 : 8', '8 : 3'], ['3 : 5', '5 : 3', '3 : 8', '8 : 3']], a: 0, lv: 'K', h: ['Count the red beads first.', 'Tel eers die rooi krale.'], s: [['3 red, 5 blue: 3 : 5'], ['3 rooi, 5 blou: 3 : 5']] },
    { en: 'What is the ratio of blue beads to red beads? (Type it like 2 : 3.)' + beads('rrrrrrrbb'), af: 'Wat is die verhouding van blou krale tot rooi krale? (Tik dit soos 2 : 3.)' + beads('rrrrrrrbb'), a: '2 : 7', lv: 'R', h: ['This time blue comes first.', 'Hierdie keer kom blou eerste.'], s: [['2 blue, 7 red: 2 : 7'], ['2 blou, 7 rooi: 2 : 7']] },
    { en: 'A class has 15 girls and 13 boys. What is the ratio of boys to girls? (Type it like 2 : 3.)', af: '\'n Klas het 15 meisies en 13 seuns. Wat is die verhouding van seuns tot meisies? (Tik dit soos 2 : 3.)', a: '13 : 15', lv: 'R', h: ['Boys first.', 'Seuns eerste.'], s: same('13 : 15') },
    { en: 'What is the ratio of red beads to ALL the beads?' + beads('rrrbbbbb'), af: 'Wat is die verhouding van rooi krale tot AL die krale?' + beads('rrrbbbbb'), o: [['3 : 8', '3 : 5', '5 : 8', '8 : 3'], ['3 : 8', '3 : 5', '5 : 8', '8 : 3']], a: 0, lv: 'C', h: ['How many beads are there altogether?', 'Hoeveel krale is daar altesaam?'], s: [['3 red out of 3 + 5 = 8 beads: 3 : 8'], ['3 rooi uit 3 + 5 = 8 krale: 3 : 8']] },
    { en: 'What is the ratio of 1 cm to 1 m?' + metre(), af: 'Wat is die verhouding van 1 cm tot 1 m?' + metre(), o: [['1 : 100', '1 : 10', '1 : 1 000', '100 : 1'], ['1 : 100', '1 : 10', '1 : 1 000', '100 : 1']], a: 0, lv: 'C', h: ['How many centimetres are in 1 m?', 'Hoeveel sentimeter is in 1 m?'], s: same('1 m = 100 cm, so 1 cm : 100 cm = 1 : 100') },
    { en: 'What is the ratio of 1 minute to 1 hour? (Type it like 2 : 3.)', af: 'Wat is die verhouding van 1 minuut tot 1 uur? (Tik dit soos 2 : 3.)', a: '1 : 60', lv: 'C', h: ['Change the hour to minutes first.', 'Verander eers die uur na minute.'], s: same('1 h = 60 min, so 1 min : 60 min = 1 : 60') },
    { en: 'A bag has 4 green sweets and some yellow sweets. The ratio green : yellow is 4 : 9. How many sweets are in the bag altogether?', af: '\'n Sak het 4 groen lekkers en \'n paar geel lekkers. Die verhouding groen : geel is 4 : 9. Hoeveel lekkers is altesaam in die sak?', a: '13', lv: 'P', h: ['4 green means 9 yellow.', '4 groen beteken 9 geel.'], s: same('4 + 9 = 13') }
  ],
  wb: {
    en: [{ t: 'Look at the beads.' + beads('rrrrrrbbbb'), p: ['red : blue', 'blue : red', 'red : all the beads'], m: [1, 1, 1] },
      { t: 'Thabo is 9 years old. Thabo\'s mother is 35 years old.', p: ['Write the ratio of Thabo\'s age to the mother\'s age.', 'Write the ratio of the mother\'s age to Thabo\'s age.'], m: [1, 1] },
      { t: 'Change to the same unit first, then write the ratio.', p: ['1 cm to 1 m', '1 m to 1 km', '1 g to 1 kg'], m: [1, 1, 1] },
      { t: 'Draw a string of beads with red : blue = 2 : 5.', p: ['Draw the beads.'], m: [2] }],
    af: [{ t: 'Kyk na die krale.' + beads('rrrrrrbbbb'), p: ['rooi : blou', 'blou : rooi', 'rooi : al die krale'], m: [1, 1, 1] },
      { t: 'Thabo is 9 jaar oud. Thabo se ma is 35 jaar oud.', p: ['Skryf die verhouding van Thabo se ouderdom tot die ma se ouderdom.', 'Skryf die verhouding van die ma se ouderdom tot Thabo se ouderdom.'], m: [1, 1] },
      { t: 'Verander eers na dieselfde eenheid en skryf dan die verhouding.', p: ['1 cm tot 1 m', '1 m tot 1 km', '1 g tot 1 kg'], m: [1, 1, 1] },
      { t: 'Teken \'n string krale met rooi : blou = 2 : 5.', p: ['Teken die krale.'], m: [2] }],
    ans: [['6 : 4', '', ''], ['4 : 6', '', ''], ['6 : 10', '6 + 4 = 10 beads', '6 + 4 = 10 krale'],
      ['9 : 35', '', ''], ['35 : 9', '', ''],
      ['1 : 100', '1 m = 100 cm', '1 m = 100 cm'], ['1 : 1 000', '1 km = 1 000 m', '1 km = 1 000 m'], ['1 : 1 000', '1 kg = 1 000 g', '1 kg = 1 000 g'],
      ['—', '2 red and 5 blue beads', '2 rooi en 5 blou krale']]
  }
});

/* ───────────── 1002 Equivalent ratios ───────────── */
T.push({
  id: 1002, name: { en: 'Ratio tables', af: 'Verhoudingstabelle' }, full: { en: 'Equivalent ratios: recipes and ratio tables', af: 'Gelykwaardige verhoudings: resepte en verhoudingstabelle' },
  body: lang => {
    const en = lang === 'en';
    const recipes = en ? [{ what: 'orange juice', n1: 'Juice', n2: 'Water', a: 1, b: 3, c1: '#fb923c', c2: '#7dd3fc' }, { what: 'pancake batter', n1: 'Flour', n2: 'Milk', a: 2, b: 1, c1: '#f5f5f4', c2: '#e0f2fe' }, { what: 'green paint', n1: 'Blue', n2: 'Yellow', a: 1, b: 2, c1: '#3b82f6', c2: '#facc15' }, { what: 'concrete', n1: 'Cement', n2: 'Sand', a: 1, b: 3, c1: '#9ca3af', c2: '#fcd34d' }, { what: 'pink paint', n1: 'Red', n2: 'White', a: 2, b: 3, c1: '#ef4444', c2: '#f8fafc' }]
      : [{ what: 'lemoensap', n1: 'Sap', n2: 'Water', a: 1, b: 3, c1: '#fb923c', c2: '#7dd3fc' }, { what: 'pannekoekbeslag', n1: 'Meel', n2: 'Melk', a: 2, b: 1, c1: '#f5f5f4', c2: '#e0f2fe' }, { what: 'groen verf', n1: 'Blou', n2: 'Geel', a: 1, b: 2, c1: '#3b82f6', c2: '#facc15' }, { what: 'beton', n1: 'Sement', n2: 'Sand', a: 1, b: 3, c1: '#9ca3af', c2: '#fcd34d' }, { what: 'pienk verf', n1: 'Rooi', n2: 'Wit', a: 2, b: 3, c1: '#ef4444', c2: '#f8fafc' }];
    const L = en ? { recipes, aria: 'Cups of two ingredients', goal: (w, n1, n2, a, b, x) => 'The recipe for ' + w + ' is ' + n1.toLowerCase() + ' : ' + n2.toLowerCase() + ' = ' + a + ' : ' + b + '. You use <b>' + x + '</b> cups of ' + n1.toLowerCase() + '. How many cups of ' + n2.toLowerCase() + '?', ask: 'Use − and + to pour cups of the second ingredient. Then tap Check.', yes: (a, b, x, y, m, n1, n2) => 'Correct! ' + x + ' is ' + m + ' × ' + a + ', so you need ' + m + ' × ' + b + ' = ' + y + '. ' + a + ' : ' + b + ' = ' + x + ' : ' + y + '.', less: (a, b, x, n1, n2, m) => 'Not enough ' + n2.toLowerCase() + '. You have ' + m + ' times as much ' + n1.toLowerCase() + ' (' + x + ' = ' + m + ' × ' + a + '), so you need ' + m + ' times as much ' + n2.toLowerCase() + ' too.', more: (a, b, x, n1, n2, m) => 'Too much ' + n2.toLowerCase() + '. ' + x + ' = ' + m + ' × ' + a + ', so multiply ' + b + ' by ' + m + ' as well.' }
      : { recipes, aria: 'Koppies van twee bestanddele', goal: (w, n1, n2, a, b, x) => 'Die resep vir ' + w + ' is ' + n1.toLowerCase() + ' : ' + n2.toLowerCase() + ' = ' + a + ' : ' + b + '. Jy gebruik <b>' + x + '</b> koppies ' + n1.toLowerCase() + '. Hoeveel koppies ' + n2.toLowerCase() + '?', ask: 'Gebruik − en + om koppies van die tweede bestanddeel in te gooi. Tik dan op Toets.', yes: (a, b, x, y, m, n1, n2) => 'Reg! ' + x + ' is ' + m + ' × ' + a + ', so jy het ' + m + ' × ' + b + ' = ' + y + ' nodig. ' + a + ' : ' + b + ' = ' + x + ' : ' + y + '.', less: (a, b, x, n1, n2, m) => 'Nie genoeg ' + n2.toLowerCase() + ' nie. Jy het ' + m + ' keer soveel ' + n1.toLowerCase() + ' (' + x + ' = ' + m + ' × ' + a + '), so jy het ook ' + m + ' keer soveel ' + n2.toLowerCase() + ' nodig.', more: (a, b, x, n1, n2, m) => 'Te veel ' + n2.toLowerCase() + '. ' + x + ' = ' + m + ' × ' + a + ', so vermenigvuldig ' + b + ' ook met ' + m + '.' };
    const m = `<h4>🎮 ${en ? 'Recipe Mixer' : 'Resepmenger'}</h4><p class="how">${en ? 'Make a bigger batch that tastes (or looks) exactly the same. Keep the ratio the same.' : 'Maak \'n groter hoeveelheid wat presies dieselfde smaak (of lyk). Hou die verhouding dieselfde.'}</p><div data-k="goal" style="font-size:19px"></div><div class="g4-stage" data-k="stage"></div><div class="g4-row"><button class="g4-btn ghost" data-k="minus" aria-label="minus" style="font-size:26px;min-width:56px;padding:4px 12px">−</button><button class="g4-btn ghost" data-k="plus" aria-label="plus" style="font-size:26px;min-width:56px;padding:4px 12px">+</button><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('juice-box', 'Juice made with 1 cup of concentrate and 3 cups of water tastes the same as juice made with 2 cups of concentrate and 6 cups of water. The ratios <strong>1 : 3</strong> and <strong>2 : 6</strong> are <strong>equivalent</strong>.') +
      def('Equivalent ratios', 'Multiply <strong>both</strong> numbers of a ratio by the <strong>same</strong> number and you get an equivalent ratio. 1 : 3 = 2 : 6 = 3 : 9. A <strong>ratio table</strong> shows this in rows.') +
      tbl([['Juice (cups)', 1, 2, 3, 4], ['Water (cups)', 3, 6, 9, 12]]) +
      ex('Pancakes for more people', ['A recipe uses 2 cups of flour for every 1 cup of milk: flour : milk = 2 : 1.', 'You use 6 cups of flour. 6 = 3 × 2, so it is 3 times the recipe.', 'Milk: 3 × 1 = <strong>3 cups</strong>. So 2 : 1 = 6 : 3.']) +
      sim('g4-s1002', S.s1002, L, m) + tip('If you add the same number to both parts (1 : 3 → 2 : 4), the taste changes! Always multiply both parts by the same number.')
      : hero('juice-box', 'Sap wat met 1 koppie konsentraat en 3 koppies water gemaak is, smaak dieselfde as sap met 2 koppies konsentraat en 6 koppies water. Die verhoudings <strong>1 : 3</strong> en <strong>2 : 6</strong> is <strong>gelykwaardig</strong>.') +
      def('Gelykwaardige verhoudings', 'Vermenigvuldig <strong>albei</strong> getalle van \'n verhouding met <strong>dieselfde</strong> getal en jy kry \'n gelykwaardige verhouding. 1 : 3 = 2 : 6 = 3 : 9. \'n <strong>Verhoudingstabel</strong> wys dit in rye.') +
      tbl([['Sap (koppies)', 1, 2, 3, 4], ['Water (koppies)', 3, 6, 9, 12]]) +
      ex('Pannekoek vir meer mense', ['\'n Resep gebruik 2 koppies meel vir elke 1 koppie melk: meel : melk = 2 : 1.', 'Jy gebruik 6 koppies meel. 6 = 3 × 2, so dit is 3 keer die resep.', 'Melk: 3 × 1 = <strong>3 koppies</strong>. Dus 2 : 1 = 6 : 3.']) +
      sim('g4-s1002', S.s1002, L, m) + tip('As jy dieselfde getal by albei dele tel (1 : 3 → 2 : 4), verander die smaak! Vermenigvuldig altyd albei dele met dieselfde getal.');
  },
  qs: [
    { en: 'Juice is made with 1 cup of concentrate to 4 cups of water. How many cups of water do you need for 2 cups of concentrate?', af: 'Sap word gemaak met 1 koppie konsentraat tot 4 koppies water. Hoeveel koppies water het jy vir 2 koppies konsentraat nodig?', a: '8', lv: 'K', h: ['Twice the concentrate needs twice the water.', 'Twee keer soveel konsentraat het twee keer soveel water nodig.'], s: same('2 × 4 = 8') },
    { en: '2 : 3 = 4 : ?', af: '2 : 3 = 4 : ?', a: '6', lv: 'R', h: ['2 × 2 = 4', '2 × 2 = 4'], s: same('2 × 2 = 4, so 3 × 2 = 6') },
    { en: 'Complete the ratio table. What is the missing number?' + tbl([['Cups of tea', 1, 2, 3], ['Spoons of sugar', 3, 6, '?']]), af: 'Voltooi die verhoudingstabel. Wat is die ontbrekende getal?' + tbl([['Koppies tee', 1, 2, 3], ['Lepels suiker', 3, 6, '?']]), a: '9', lv: 'R', h: ['3 spoons for every cup.', '3 lepels vir elke koppie.'], s: same('3 × 3 = 9') },
    { en: 'In a choir there are 2 boys for every 3 girls. There are 10 boys. How many girls are there?', af: 'In \'n koor is daar 2 seuns vir elke 3 meisies. Daar is 10 seuns. Hoeveel meisies is daar?', a: '15', lv: 'R', h: ['10 = 5 × 2', '10 = 5 × 2'], s: same('10 = 5 × 2, so 5 × 3 = 15') },
    { en: 'Which ratio is equivalent to 3 : 5?', af: 'Watter verhouding is gelykwaardig aan 3 : 5?', o: [['6 : 10', '6 : 8', '5 : 3', '4 : 6'], ['6 : 10', '6 : 8', '5 : 3', '4 : 6']], a: 0, lv: 'C', h: ['Multiply both numbers by the same number.', 'Vermenigvuldig albei getalle met dieselfde getal.'], s: same('3 × 2 = 6 and 5 × 2 = 10, so 3 : 5 = 6 : 10') },
    { en: 'Green paint is made with blue : yellow = 1 : 2. Musa uses 6 tins of yellow. How many tins of blue does Musa need?', af: 'Groen verf word gemaak met blou : geel = 1 : 2. Musa gebruik 6 blikke geel. Hoeveel blikke blou het Musa nodig?', a: '3', lv: 'C', h: ['6 yellow = 3 × 2 yellow.', '6 geel = 3 × 2 geel.'], s: same('6 = 3 × 2, so 3 × 1 = 3') },
    { en: 'A recipe for 4 people uses 2 eggs. How many eggs are needed for 12 people?' + tbl([['People', 4, 8, 12], ['Eggs', 2, '', '?']]), af: '\'n Resep vir 4 mense gebruik 2 eiers. Hoeveel eiers is vir 12 mense nodig?' + tbl([['Mense', 4, 8, 12], ['Eiers', 2, '', '?']]), a: '6', lv: 'C', h: ['12 people is 3 times 4 people.', '12 mense is 3 keer 4 mense.'], s: same('12 = 3 × 4, so 3 × 2 = 6') },
    { en: 'Concrete is mixed with cement : sand = 1 : 3. A builder mixes 12 buckets altogether. How many buckets are cement?', af: 'Beton word gemeng met sement : sand = 1 : 3. \'n Bouer meng altesaam 12 emmers. Hoeveel emmers is sement?', a: '3', lv: 'P', h: ['Every 4 buckets have 1 cement.', 'Elke 4 emmers het 1 sement.'], s: [['1 + 3 = 4 buckets in one batch; 12 ÷ 4 = 3 batches; 3 × 1 = 3 buckets of cement'], ['1 + 3 = 4 emmers in een hoeveelheid; 12 ÷ 4 = 3; 3 × 1 = 3 emmers sement']] }
  ],
  wb: {
    en: [{ t: 'Pancake batter uses milk : flour = 1 : 2. Complete the ratio table.' + tbl([['Milk (cups)', 1, 2, 3, 5], ['Flour (cups)', 2, 'a', 'b', 'c']]), p: ['a', 'b', 'c'], m: [1, 1, 1] },
      { t: 'Fill in the missing number.', p: ['1 : 5 = 3 : ?', '2 : 7 = ? : 21', '4 : 3 = 12 : ?'], m: [1, 1, 1] },
      { t: 'A recipe for 6 people uses 2 cups of rice and 3 cups of water.', p: ['How many cups of rice are needed for 12 people?', 'How many cups of water are needed for 18 people?'], m: [2, 2] },
      { t: 'Lemonade is made with lemon juice : water = 1 : 5.', p: ['How much water is needed for 4 cups of lemon juice?', 'Neo uses 2 cups of lemon juice and 8 cups of water. Is the ratio correct? Explain.'], m: [2, 2] }],
    af: [{ t: 'Pannekoekbeslag gebruik melk : meel = 1 : 2. Voltooi die verhoudingstabel.' + tbl([['Melk (koppies)', 1, 2, 3, 5], ['Meel (koppies)', 2, 'a', 'b', 'c']]), p: ['a', 'b', 'c'], m: [1, 1, 1] },
      { t: 'Vul die ontbrekende getal in.', p: ['1 : 5 = 3 : ?', '2 : 7 = ? : 21', '4 : 3 = 12 : ?'], m: [1, 1, 1] },
      { t: '\'n Resep vir 6 mense gebruik 2 koppies rys en 3 koppies water.', p: ['Hoeveel koppies rys is vir 12 mense nodig?', 'Hoeveel koppies water is vir 18 mense nodig?'], m: [2, 2] },
      { t: 'Limonade word gemaak met suurlemoensap : water = 1 : 5.', p: ['Hoeveel water is vir 4 koppies suurlemoensap nodig?', 'Neo gebruik 2 koppies suurlemoensap en 8 koppies water. Is die verhouding reg? Verduidelik.'], m: [2, 2] }],
    ans: [['4', '2 × 2', '2 × 2'], ['6', '3 × 2', '3 × 2'], ['10', '5 × 2', '5 × 2'],
      ['15', '3 × 5', '3 × 5'], ['6', '7 × 3 = 21, so 2 × 3', '7 × 3 = 21, so 2 × 3'], ['9', '4 × 3 = 12, so 3 × 3', '4 × 3 = 12, so 3 × 3'],
      ['4', '12 people = 2 × 6 people', '12 mense = 2 × 6 mense'], ['9', '18 people = 3 × 6 people', '18 mense = 3 × 6 mense'],
      ['20', '4 × 5', '4 × 5'], ['2 : 8 ≠ 2 : 10', 'No. 2 cups of juice need 2 × 5 = 10 cups of water.', 'Nee. 2 koppies sap het 2 × 5 = 10 koppies water nodig.']]
  }
});

/* ───────────── 1003 Rate ───────────── */
T.push({
  id: 1003, name: { en: 'What is a rate?', af: 'Wat is \'n koers?' }, full: { en: 'Rate: comparing quantities of different kinds', af: 'Koers: hoeveelhede van verskillende soorte vergelyk' },
  body: lang => {
    const en = lang === 'en';
    const items = en ? [{ n: 'apples', one: 'apple', s: 'apple', lo: 3, hi: 6 }, { n: 'bananas', one: 'banana', s: 'banana', lo: 2, hi: 5 }, { n: 'mealies', one: 'mealie', s: 'mealie', lo: 6, hi: 12 }, { n: 'juice boxes', one: 'juice box', s: 'juice-box', lo: 10, hi: 20 }, { n: 'ice creams', one: 'ice cream', s: 'ice-cream', lo: 12, hi: 24 }]
      : [{ n: 'appels', one: 'appel', s: 'apple', lo: 3, hi: 6 }, { n: 'piesangs', one: 'piesang', s: 'banana', lo: 2, hi: 5 }, { n: 'mielies', one: 'mielie', s: 'mealie', lo: 6, hi: 12 }, { n: 'sappies', one: 'sappie', s: 'juice-box', lo: 10, hi: 20 }, { n: 'roomyse', one: 'roomys', s: 'ice-cream', lo: 12, hi: 24 }];
    const L = en ? { items, num: 'Number', cost: 'Cost', goal: (k, n, p) => '<b>' + k + ' ' + n + '</b> cost <b>' + p + '</b>.', ask: 'First find the cost of 1. Then use it to fill in the rest of the table. You can type R2,50 or 250c.', tip1: (p, k) => 'Cost of 1 = ' + p + ' ÷ ' + k + '. Tip: change to cents first.', tipN: c => 'Cost of ' + c + ' = ' + c + ' × the cost of 1.', fill: 'Fill in every empty box.', yes: (u, one) => 'All correct! The rate is <b>' + u + ' per ' + one + '</b>. Each cost is the number × ' + u + '.' }
      : { items, num: 'Getal', cost: 'Koste', goal: (k, n, p) => '<b>' + k + ' ' + n + '</b> kos <b>' + p + '</b>.', ask: 'Vind eers die koste van 1. Gebruik dit dan om die res van die tabel in te vul. Jy kan R2,50 of 250c tik.', tip1: (p, k) => 'Koste van 1 = ' + p + ' ÷ ' + k + '. Wenk: verander eers na sent.', tipN: c => 'Koste van ' + c + ' = ' + c + ' × die koste van 1.', fill: 'Vul elke leë blokkie in.', yes: (u, one) => 'Alles reg! Die koers is <b>' + u + ' per ' + one + '</b>. Elke koste is die getal × ' + u + '.' };
    const m = `<h4>🎮 ${en ? 'Price Table' : 'Pryslys'}</h4><p class="how">${en ? 'A rate tells you the price of ONE. Find it, then use it for any number.' : '\'n Koers sê vir jou die prys van EEN. Vind dit en gebruik dit dan vir enige getal.'}</p><div class="g4-big" data-k="goal" style="font-size:22px"></div><table class="g4-chart" data-k="tbl" style="margin:8px auto"></table><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('scales', 'A <strong>rate</strong> compares two amounts of <strong>different kinds</strong>, such as rand and kilograms. "R20 per kg" is a rate.') +
      def('Rate', 'We use the word <strong>per</strong> (or a slash): R12 per kg = R12/kg, 60 km per hour = 60 km/h. A rate tells you how much for <strong>one</strong>: one kilogram, one hour, one apple.') +
      ex('Oranges', ['2 oranges cost R3.', 'R3 = 300 cents. 300c ÷ 2 = 150c.', 'The cost of 1 orange = <strong>150 cents</strong> (R1,50).']) +
      ex('Apples at R2,50 each', ['R2,50 = 250c.', '2 apples: 2 × 250c = 500c = <strong>R5,00</strong>. 3 apples: 3 × 250c = 750c = <strong>R7,50</strong>.', '10 apples: 10 × 250c = 2 500c = <strong>R25,00</strong>.' + tbl([['Apples', 1, 2, 3, 10], ['Cost', 'R2,50', 'R5,00', 'R7,50', 'R25,00']])]) +
      sim('g4-s1003', S.s1003, L, m) + tip('Ratio or rate? If both amounts have the same unit (cm and cm), it is a ratio. If the units are different (rand and kg), it is a rate.')
      : hero('scales', '\'n <strong>Koers</strong> vergelyk twee hoeveelhede van <strong>verskillende soorte</strong>, soos rand en kilogram. "R20 per kg" is \'n koers.') +
      def('Koers', 'Ons gebruik die woord <strong>per</strong> (of \'n skuinsstreep): R12 per kg = R12/kg, 60 km per uur = 60 km/h. \'n Koers sê vir jou hoeveel vir <strong>een</strong>: een kilogram, een uur, een appel.') +
      ex('Lemoene', ['2 lemoene kos R3.', 'R3 = 300 sent. 300c ÷ 2 = 150c.', 'Die koste van 1 lemoen = <strong>150 sent</strong> (R1,50).']) +
      ex('Appels teen R2,50 elk', ['R2,50 = 250c.', '2 appels: 2 × 250c = 500c = <strong>R5,00</strong>. 3 appels: 3 × 250c = 750c = <strong>R7,50</strong>.', '10 appels: 10 × 250c = 2 500c = <strong>R25,00</strong>.' + tbl([['Appels', 1, 2, 3, 10], ['Koste', 'R2,50', 'R5,00', 'R7,50', 'R25,00']])]) +
      sim('g4-s1003', S.s1003, L, m) + tip('Verhouding of koers? As albei hoeveelhede dieselfde eenheid het (cm en cm), is dit \'n verhouding. As die eenhede verskil (rand en kg), is dit \'n koers.');
  },
  qs: [
    { en: 'If 2 oranges cost R3, how many cents does 1 orange cost?', af: 'As 2 lemoene R3 kos, hoeveel sent kos 1 lemoen?', a: '150', lv: 'K', h: ['R3 = 300 cents.', 'R3 = 300 sent.'], s: same('300c ÷ 2 = 150c') },
    { en: 'One apple costs R2,50. What do two apples cost?' + st('apple') + st('apple'), af: 'Een appel kos R2,50. Wat kos twee appels?' + st('apple') + st('apple'), a: 'R5', lv: 'R', h: ['2 × 250c', '2 × 250c'], s: same('2 × 250c = 500c = R5,00') },
    { en: 'One apple costs R2,50. What do three apples cost?' + st('apple') + st('apple') + st('apple'), af: 'Een appel kos R2,50. Wat kos drie appels?' + st('apple') + st('apple') + st('apple'), a: 'R7,50', lv: 'R', h: ['3 × 250c', '3 × 250c'], s: same('3 × 250c = 750c = R7,50') },
    { en: 'One apple costs R2,50. What do ten apples cost?', af: 'Een appel kos R2,50. Wat kos tien appels?', a: 'R25', lv: 'R', h: ['10 × 250c', '10 × 250c'], s: same('10 × 250c = 2 500c = R25,00') },
    { en: 'Which one is a rate?', af: 'Watter een is \'n koers?', o: [['R12 per kg', '3 : 5 (girls to boys)', '1 cm : 1 m', '7 : 12 (ages)'], ['R12 per kg', '3 : 5 (meisies tot seuns)', '1 cm : 1 m', '7 : 12 (ouderdomme)']], a: 0, lv: 'K', h: ['A rate compares different kinds of things.', '\'n Koers vergelyk verskillende soorte dinge.'], s: [['R12 per kg compares rand with kilograms, which are different kinds.'], ['R12 per kg vergelyk rand met kilogram, en dit is verskillende soorte.']] },
    { en: 'Tomatoes cost R18 per kg. What do 3 kg cost?' + st('scales', 70), af: 'Tamaties kos R18 per kg. Wat kos 3 kg?' + st('scales', 70), a: 'R54', lv: 'C', h: ['3 × R18', '3 × R18'], s: same('3 × R18 = R54') },
    { en: '4 pens cost R20. What do 7 pens cost?' + tbl([['Pens', 4, 1, 7], ['Cost', 'R20', '?', '?']]), af: '4 penne kos R20. Wat kos 7 penne?' + tbl([['Penne', 4, 1, 7], ['Koste', 'R20', '?', '?']]), a: 'R35', lv: 'C', h: ['Find the cost of 1 pen first.', 'Vind eers die koste van 1 pen.'], s: same('R20 ÷ 4 = R5; 7 × R5 = R35') },
    { en: 'Bananas cost R12 for 6. How many bananas can you buy with R30?' + st('banana'), af: 'Piesangs kos R12 vir 6. Hoeveel piesangs kan jy met R30 koop?' + st('banana'), a: '15', lv: 'P', h: ['What does 1 banana cost?', 'Wat kos 1 piesang?'], s: same('R12 ÷ 6 = R2 each; R30 ÷ R2 = 15') }
  ],
  wb: {
    en: [{ t: 'One apple costs R2,50. What is the cost of:', p: ['two apples', 'three apples', 'ten apples'], m: [1, 1, 2] },
      { t: 'If 2 oranges cost R3:', p: ['How many cents does 1 orange cost?', 'What do 6 oranges cost?'], m: [2, 2] },
      { t: 'Potatoes cost R14 per kg. Complete the table.' + tbl([['Mass (kg)', 1, 2, 5, 10], ['Cost', 'R14', 'a', 'b', 'c']]), p: ['a', 'b', 'c'], m: [1, 1, 1] },
      { t: 'Write as a rate for one.', p: ['R60 for 3 kg', '24 sweets for 6 children'], m: [1, 1] }],
    af: [{ t: 'Een appel kos R2,50. Wat is die koste van:', p: ['twee appels', 'drie appels', 'tien appels'], m: [1, 1, 2] },
      { t: 'As 2 lemoene R3 kos:', p: ['Hoeveel sent kos 1 lemoen?', 'Wat kos 6 lemoene?'], m: [2, 2] },
      { t: 'Aartappels kos R14 per kg. Voltooi die tabel.' + tbl([['Massa (kg)', 1, 2, 5, 10], ['Koste', 'R14', 'a', 'b', 'c']]), p: ['a', 'b', 'c'], m: [1, 1, 1] },
      { t: 'Skryf as \'n koers vir een.', p: ['R60 vir 3 kg', '24 lekkers vir 6 kinders'], m: [1, 1] }],
    ans: [['R5,00', '2 × 250c', '2 × 250c'], ['R7,50', '3 × 250c', '3 × 250c'], ['R25,00', '10 × 250c', '10 × 250c'],
      ['150c', '300c ÷ 2', '300c ÷ 2'], ['R9', '6 = 3 × 2 oranges, so 3 × R3', '6 = 3 × 2 lemoene, so 3 × R3'],
      ['R28', '2 × R14', '2 × R14'], ['R70', '5 × R14', '5 × R14'], ['R140', '10 × R14', '10 × R14'],
      ['R20/kg', 'R60 ÷ 3', 'R60 ÷ 3'], ['4', '4 sweets per child: 24 ÷ 6', '4 lekkers per kind: 24 ÷ 6']]
  }
});

/* ───────────── 1004 Rate problems ───────────── */
T.push({
  id: 1004, name: { en: 'Rate problems', af: 'Koersprobleme' }, full: { en: 'Solving problems with rates: speed, filling and best buys', af: 'Probleme met koerse oplos: spoed, vul en beste koop' },
  body: lang => {
    const en = lang === 'en';
    const items = en ? [{ n: 'bread rolls', s: 'bread-loaf' }, { n: 'apples', s: 'apple' }, { n: 'juice boxes', s: 'juice-box' }, { n: 'chocolates', s: 'chocolate' }, { n: 'mealies', s: 'mealie' }]
      : [{ n: 'broodrolletjies', s: 'bread-loaf' }, { n: 'appels', s: 'apple' }, { n: 'sappies', s: 'juice-box' }, { n: 'sjokolades', s: 'chocolate' }, { n: 'mielies', s: 'mealie' }];
    const L = en ? { items, pack: 'Pack', each: 'price of 1', best: 'Better buy', forP: (n, p) => n + ' for ' + p, goal: n => 'Two packs of ' + n + '. Which is the better buy?', ask: 'Type the price of ONE item in each pack (R2,50 or 250c). Then tap "Better buy" under the cheaper one and tap Check.', fill: 'Type the price of one item for both packs.', tipU: (k, p, n) => 'Check pack ' + k + ': ' + p + ' ÷ ' + n + '. Tip: change to cents first.', choose: 'Now choose the better buy.', wrongPick: (k, a, b) => 'Look again: in pack ' + k + ' one costs ' + a + ', and in the other pack one costs ' + b + '. The cheaper one each is the better buy.', yes: (k, a, b, d) => 'Correct! Pack ' + k + ' is the better buy: ' + a + ' each instead of ' + b + ', which saves ' + d + ' on every item.' }
      : { items, pack: 'Pak', each: 'prys van 1', best: 'Beter koop', forP: (n, p) => n + ' vir ' + p, goal: n => 'Twee pakke ' + n + '. Watter een is die beter koop?', ask: 'Tik die prys van EEN item in elke pak (R2,50 of 250c). Tik dan op "Beter koop" onder die goedkoper een en tik op Toets.', fill: 'Tik die prys van een item vir albei pakke.', tipU: (k, p, n) => 'Kontroleer pak ' + k + ': ' + p + ' ÷ ' + n + '. Wenk: verander eers na sent.', choose: 'Kies nou die beter koop.', wrongPick: (k, a, b) => 'Kyk weer: in pak ' + k + ' kos een ' + a + ', en in die ander pak kos een ' + b + '. Die goedkoopste per item is die beter koop.', yes: (k, a, b, d) => 'Reg! Pak ' + k + ' is die beter koop: ' + a + ' elk in plaas van ' + b + ', en dit spaar ' + d + ' op elke item.' };
    const m = `<h4>🎮 ${en ? 'Best Buy' : 'Beste Koop'}</h4><p class="how">${en ? 'The bigger pack is not always cheaper. Compare the price of ONE item.' : 'Die groter pak is nie altyd goedkoper nie. Vergelyk die prys van EEN item.'}</p><div class="g4-big" data-k="goal" style="font-size:22px"></div><div class="g4-row" data-k="packs" style="justify-content:center;gap:14px;align-items:stretch"></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('car', 'Rates help us solve everyday problems: how far a car goes, how fast a tap fills a bucket and which pack in the shop is the better buy.') +
      def('Using a rate', 'Find the amount for <strong>one</strong> (one hour, one minute, one item). Then <strong>multiply</strong> to find the amount for more, or <strong>divide</strong> to find how many.') +
      ex('Speed', ['A car travels at 60 km per hour (60 km/h).', 'In 3 hours it travels 3 × 60 km = <strong>180 km</strong>.' + road('60 km', 3, '')]) +
      ex('Filling', ['A tap fills 5 litres per minute.', 'In 4 minutes it fills 4 × 5 ℓ = <strong>20 ℓ</strong>.' + buckets(4, '5 ℓ')]) +
      ex('Best buy', ['Pack A: 4 rolls for R12. One roll = R12 ÷ 4 = R3.', 'Pack B: 6 rolls for R15. One roll = R15 ÷ 6 = 1 500c ÷ 6 = 250c = R2,50.', 'Pack B is the <strong>better buy</strong>, because one roll costs less.']) +
      sim('g4-s1004', S.s1004, L, m) + tip('Always write the unit with a rate: 60 km/h, 5 ℓ per minute, R3 each. It helps you see what you are working out.')
      : hero('car', 'Koerse help ons om alledaagse probleme op te los: hoe ver \'n motor ry, hoe vinnig \'n kraan \'n emmer volmaak en watter pak in die winkel die beter koop is.') +
      def('\'n Koers gebruik', 'Vind die hoeveelheid vir <strong>een</strong> (een uur, een minuut, een item). <strong>Vermenigvuldig</strong> dan om die hoeveelheid vir meer te vind, of <strong>deel</strong> om te vind hoeveel.') +
      ex('Spoed', ['\'n Motor ry teen 60 km per uur (60 km/h).', 'In 3 uur ry dit 3 × 60 km = <strong>180 km</strong>.' + road('60 km', 3, '')]) +
      ex('Vul', ['\'n Kraan vul 5 liter per minuut.', 'In 4 minute vul dit 4 × 5 ℓ = <strong>20 ℓ</strong>.' + buckets(4, '5 ℓ')]) +
      ex('Beste koop', ['Pak A: 4 rolletjies vir R12. Een rolletjie = R12 ÷ 4 = R3.', 'Pak B: 6 rolletjies vir R15. Een rolletjie = R15 ÷ 6 = 1 500c ÷ 6 = 250c = R2,50.', 'Pak B is die <strong>beter koop</strong>, want een rolletjie kos minder.']) +
      sim('g4-s1004', S.s1004, L, m) + tip('Skryf altyd die eenheid by \'n koers: 60 km/h, 5 ℓ per minuut, R3 elk. Dit help jou om te sien wat jy uitwerk.');
  },
  qs: [
    { en: 'A car travels 60 km in 1 hour. How far does it travel in 3 hours?' + road('60 km', 3, ''), af: '\'n Motor ry 60 km in 1 uur. Hoe ver ry dit in 3 uur?' + road('60 km', 3, ''), a: '180 km', lv: 'K', h: ['3 × 60 km', '3 × 60 km'], s: same('3 × 60 km = 180 km') },
    { en: 'A tap fills 5 litres per minute. How many litres does it fill in 8 minutes?' + buckets(8, '5 ℓ'), af: '\'n Kraan vul 5 liter per minuut. Hoeveel liter vul dit in 8 minute?' + buckets(8, '5 ℓ'), a: '40', lv: 'R', h: ['8 × 5', '8 × 5'], s: same('8 × 5 ℓ = 40 ℓ') },
    { en: 'Sipho reads 20 pages per day. How many pages does Sipho read in 7 days?', af: 'Sipho lees 20 bladsye per dag. Hoeveel bladsye lees Sipho in 7 dae?', a: '140', lv: 'R', h: ['7 × 20', '7 × 20'], s: same('7 × 20 = 140') },
    { en: 'Which is the better buy?' + tbl([['A', '4 rolls for R12'], ['B', '6 rolls for R15']]), af: 'Watter een is die beter koop?' + tbl([['A', '4 rolletjies vir R12'], ['B', '6 rolletjies vir R15']]), o: [['B: R2,50 per roll', 'A: R3 per roll', 'They cost the same per roll'], ['B: R2,50 per rolletjie', 'A: R3 per rolletjie', 'Hulle kos ewe veel per rolletjie']], a: 0, lv: 'C', h: ['Find the price of one roll in each pack.', 'Vind die prys van een rolletjie in elke pak.'], s: same('A: R12 ÷ 4 = R3; B: 1 500c ÷ 6 = 250c = R2,50') },
    { en: 'A cyclist rides 45 km in 3 hours at the same speed. How many kilometres per hour is that?' + road('?', 3, ''), af: '\'n Fietsryer ry 45 km in 3 uur teen dieselfde spoed. Hoeveel kilometer per uur is dit?' + road('?', 3, ''), a: '15 km/h', lv: 'C', h: ['Share 45 km over 3 hours.', 'Deel 45 km oor 3 uur.'], s: same('45 km ÷ 3 = 15 km/h') },
    { en: 'A printer prints 12 pages per minute. How many minutes does it take to print 60 pages?', af: '\'n Drukker druk 12 bladsye per minuut. Hoeveel minute neem dit om 60 bladsye te druk?', a: '5 min', lv: 'C', h: ['How many 12s are in 60?', 'Hoeveel 12\'s is in 60?'], s: same('60 ÷ 12 = 5 min') },
    { en: 'A heart beats 70 times per minute. How many times does it beat in 10 minutes?', af: '\'n Hart klop 70 keer per minuut. Hoeveel keer klop dit in 10 minute?', a: '700', lv: 'P', h: ['10 × 70', '10 × 70'], s: same('10 × 70 = 700') },
    { en: 'A car uses 1 litre of petrol for every 12 km. How far can it travel with 5 litres?' + buckets(5, '12 km'), af: '\'n Motor gebruik 1 liter petrol vir elke 12 km. Hoe ver kan dit met 5 liter ry?' + buckets(5, '12 km'), a: '60 km', lv: 'P', h: ['Every litre takes the car 12 km.', 'Elke liter neem die motor 12 km ver.'], s: same('5 × 12 km = 60 km') }
  ],
  wb: {
    en: [{ t: 'A bus travels at 80 km per hour.' + road('80 km', 5, ''), p: ['How far does it travel in 2 hours?', 'How far does it travel in 5 hours?'], m: [1, 1] },
      { t: 'Shop A sells 3 pears for R9. Shop B sells 5 pears for R20.', p: ['What does one pear cost at each shop?', 'Which shop is the better buy?'], m: [2, 1] },
      { t: 'A tap drips 2 litres of water every hour.', p: ['How many litres drip in one day (24 hours)?', 'How many litres drip in one week?'], m: [2, 2] },
      { t: 'Lerato earns R25 per hour for gardening.', p: ['How much does Lerato earn in 6 hours?', 'How many hours must Lerato work to earn R200?'], m: [2, 2] }],
    af: [{ t: '\'n Bus ry teen 80 km per uur.' + road('80 km', 5, ''), p: ['Hoe ver ry dit in 2 uur?', 'Hoe ver ry dit in 5 uur?'], m: [1, 1] },
      { t: 'Winkel A verkoop 3 pere vir R9. Winkel B verkoop 5 pere vir R20.', p: ['Wat kos een peer by elke winkel?', 'Watter winkel is die beter koop?'], m: [2, 1] },
      { t: '\'n Kraan drup elke uur 2 liter water.', p: ['Hoeveel liter drup in een dag (24 uur)?', 'Hoeveel liter drup in een week?'], m: [2, 2] },
      { t: 'Lerato verdien R25 per uur vir tuinwerk.', p: ['Hoeveel verdien Lerato in 6 uur?', 'Hoeveel uur moet Lerato werk om R200 te verdien?'], m: [2, 2] }],
    ans: [['160 km', '2 × 80 km', '2 × 80 km'], ['400 km', '5 × 80 km', '5 × 80 km'],
      ['A: R3; B: R4', 'R9 ÷ 3 and R20 ÷ 5', 'R9 ÷ 3 en R20 ÷ 5'], ['A', 'R3 < R4', 'R3 < R4'],
      ['48 ℓ', '24 × 2 ℓ', '24 × 2 ℓ'], ['336 ℓ', '7 × 48 ℓ', '7 × 48 ℓ'],
      ['R150', '6 × R25', '6 × R25'], ['8', 'R200 ÷ R25 = 8 hours', 'R200 ÷ R25 = 8 uur']]
  }
});

writeChapter(10, { en: 'Ratio and Rate', af: 'Verhouding en Koers' }, T, process.argv[2] || OUT_DEFAULT);
