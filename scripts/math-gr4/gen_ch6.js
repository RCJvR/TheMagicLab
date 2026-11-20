// Grade 4 Math Magician, Chapter 6: Length, mass and capacity (one bilingual source).
// Run: node scripts/math-gr4/gen_ch6.js   (writes math-magician/gr4/ch6.js, ch6.af.js, ch6.help.js)
// Grade 4 has no decimals yet, so the CAPS draft's "3,5 m" example is written as 3 500 mm.
const { ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT } = require('./lib.js');
const S = require('./sims_ch6.js');
const T = [];
const same = s => [[s], [s]];
const tbl = rows => `<table class="g4-chart"><tr>${rows[0].map(c => `<th>${c}</th>`).join('')}</tr>${rows.slice(1).map(r => `<tr>${r.map(c => `<td style="font-size:22px">${c}</td>`).join('')}</tr>`).join('')}</table>`;

/* ───────────── 601 Length ───────────── */
T.push({
  id: 601, name: { en: 'Length', af: 'Lengte' }, full: { en: 'Measuring length: mm, cm, m and km', af: 'Lengte meet: mm, cm, m en km' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { ask: 'How long is the pink pencil? Type your answer in millimetres (mm).', askShift: 'Careful: the pencil does not start at 0! How long is it in mm?', yes: 'Correct!', no: 'Not quite.', is: (mm, c, r) => 'It is ' + mm + ' mm long' + (c ? ' (' + c + ' cm ' + (r ? r + ' mm' : '') + ')' : '') + '.', sub: (e, s, l) => 'It ends at ' + e + ' mm and starts at ' + s + ' mm: ' + e + ' − ' + s + ' = ' + l + ' mm.', score: W.en.score }
      : { ask: 'Hoe lank is die pienk potlood? Tik jou antwoord in millimeter (mm).', askShift: 'Pasop: die potlood begin nie by 0 nie! Hoe lank is dit in mm?', yes: 'Reg!', no: 'Nie heeltemal nie.', is: (mm, c, r) => 'Dit is ' + mm + ' mm lank' + (c ? ' (' + c + ' cm ' + (r ? r + ' mm' : '') + ')' : '') + '.', sub: (e, s, l) => 'Dit eindig by ' + e + ' mm en begin by ' + s + ' mm: ' + e + ' − ' + s + ' = ' + l + ' mm.', score: W.af.score };
    const m = `<h4>🎮 ${en ? 'Read the Ruler' : 'Lees die Liniaal'}</h4><p class="how">${en ? 'Each small line on the ruler is 1 mm. Each numbered line is 1 cm = 10 mm.' : 'Elke klein lyntjie op die liniaal is 1 mm. Elke genommerde lyn is 1 cm = 10 mm.'}</p><div class="g4-stage"><svg viewBox="0 0 640 175" data-k="svg" role="img" aria-label="ruler"></svg></div><div class="g4-row"><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="mm"><span style="font-size:20px">mm</span><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button><button class="g4-btn ghost" data-k="shift" aria-pressed="false">${en ? 'Harder: not at 0' : 'Moeiliker: nie by 0'}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('giraffe', 'We measure <strong>length</strong> with a ruler, a measuring tape or a metre stick. Choose a unit that fits what you measure.') +
      tbl([['Unit', 'Use it for', 'Equals'], ['millimetre (mm)', 'an ant, a seed', '—'], ['centimetre (cm)', 'a pencil, a book', '10 mm'], ['metre (m)', 'a classroom, a rope', '100 cm'], ['kilometre (km)', 'the road to town', '1 000 m']]) +
      ex('Measure carefully', ['Put the 0 of the ruler at one end of the object.', 'Read the number at the other end.', 'Count the small lines past the last whole centimetre: 8 cm and 7 mm = 87 mm.']) +
      sim('s601', S.s601, L, m) + tip('Estimate first: your finger is about 1 cm wide, and a big step is about 1 m.')
      : hero('giraffe', 'Ons meet <strong>lengte</strong> met \'n liniaal, \'n maatband of \'n meterstok. Kies \'n eenheid wat pas by wat jy meet.') +
      tbl([['Eenheid', 'Gebruik dit vir', 'Is gelyk aan'], ['millimeter (mm)', '\'n mier, \'n saadjie', '—'], ['sentimeter (cm)', '\'n potlood, \'n boek', '10 mm'], ['meter (m)', '\'n klaskamer, \'n tou', '100 cm'], ['kilometer (km)', 'die pad dorp toe', '1 000 m']]) +
      ex('Meet versigtig', ['Sit die 0 van die liniaal by een punt van die voorwerp.', 'Lees die getal by die ander punt.', 'Tel die klein lyntjies na die laaste heel sentimeter: 8 cm en 7 mm = 87 mm.']) +
      sim('s601', S.s601, L, m) + tip('Skat eers: jou vinger is omtrent 1 cm breed, en \'n groot tree is omtrent 1 m.');
  },
  qs: [
    { en: 'Which unit is best for measuring a pencil?', af: 'Watter eenheid is die beste om \'n potlood te meet?', o: [['cm', 'km', 'kg', 'l'], ['cm', 'km', 'kg', 'l']], a: 0, lv: 'K', h: ['A pencil is short.', '\'n Potlood is kort.'], s: [['A pencil is about 15 cm long.'], ['\'n Potlood is omtrent 15 cm lank.']] },
    { en: '1 cm = ___ mm', af: '1 cm = ___ mm', a: '10', lv: 'K', h: ['Count the small lines in 1 cm on a ruler.', 'Tel die klein lyntjies in 1 cm op \'n liniaal.'], s: same('1 cm = 10 mm') },
    { en: '1 m = ___ cm', af: '1 m = ___ cm', a: '100', lv: 'K', h: ['"Centi" means a hundredth.', '"Senti" beteken \'n honderdste.'], s: same('1 m = 100 cm') },
    { en: '1 km = ___ m', af: '1 km = ___ m', a: '1000', lv: 'K', h: ['"Kilo" means a thousand.', '"Kilo" beteken \'n duisend.'], s: same('1 km = 1 000 m') },
    { en: '3 m = ___ cm', af: '3 m = ___ cm', a: '300', lv: 'R', h: ['Each metre is 100 cm.', 'Elke meter is 100 cm.'], s: same('3 × 100 = 300 cm') },
    { en: '45 mm = 4 cm and ___ mm', af: '45 mm = 4 cm en ___ mm', a: '5', lv: 'R', h: ['4 cm = 40 mm', '4 cm = 40 mm'], s: same('45 − 40 = 5 mm') },
    { en: 'The distance from Cape Town to Johannesburg is best measured in…', af: 'Die afstand van Kaapstad na Johannesburg word die beste gemeet in…', o: [['mm', 'cm', 'm', 'km'], ['mm', 'cm', 'm', 'km']], a: 3, lv: 'K', h: ['It is very far.', 'Dit is baie ver.'], s: [['Long distances are measured in kilometres (about 1 400 km).'], ['Lang afstande word in kilometer gemeet (omtrent 1 400 km).']] },
    { en: '2 km 500 m = ___ m', af: '2 km 500 m = ___ m', a: '2500', lv: 'R', h: ['2 km = 2 000 m', '2 km = 2 000 m'], s: same('2 000 + 500 = 2 500 m') }
  ],
  wb: { en: [{ t: 'Convert:', p: ['6 cm = ___ mm', '4 m = ___ cm', '3 km = ___ m', '250 cm = ___ m ___ cm'], m: [1, 1, 1, 2] }, { t: 'Measure the length of your pencil, your book and your desk. Write each in the best unit.', p: [''], m: [3] }],
        af: [{ t: 'Herlei:', p: ['6 cm = ___ mm', '4 m = ___ cm', '3 km = ___ m', '250 cm = ___ m ___ cm'], m: [1, 1, 1, 2] }, { t: 'Meet die lengte van jou potlood, jou boek en jou bank. Skryf elkeen in die beste eenheid.', p: [''], m: [3] }],
        ans: [['60 mm', '', ''], ['400 cm', '', ''], ['3 000 m', '', ''], ['2 m 50 cm', '', ''], ['e.g. pencil 15 cm, book 25 cm, desk 1 m', 'Answers will vary', 'Antwoorde sal verskil']] }
});

/* ───────────── 602 Mass ───────────── */
T.push({
  id: 602, name: { en: 'Mass', af: 'Massa' }, full: { en: 'Measuring mass: g and kg', af: 'Massa meet: g en kg' },
  body: lang => {
    const en = lang === 'en';
    const items = en ? [{ n: 'An apple', s: 'apple', m: 150 }, { n: 'A banana', s: 'banana', m: 100 }, { n: 'A loaf of bread', s: 'bread-loaf', m: 700 }, { n: 'A block of butter', s: 'butter', m: 500 }, { n: 'A carton of milk', s: 'milk', m: 1000 }, { n: 'A slab of chocolate', s: 'chocolate', m: 150 }, { n: 'A bag of mealies', s: 'mealie' }, { n: 'A bag of sand', s: 'sand' }]
      : [{ n: '\'n Appel', s: 'apple', m: 150 }, { n: '\'n Piesang', s: 'banana', m: 100 }, { n: '\'n Brood', s: 'bread-loaf', m: 700 }, { n: '\'n Blok botter', s: 'butter', m: 500 }, { n: '\'n Karton melk', s: 'milk', m: 1000 }, { n: '\'n Plak sjokolade', s: 'chocolate', m: 150 }, { n: '\'n Sak mielies', s: 'mealie' }, { n: '\'n Sak sand', s: 'sand' }];
    const L = en ? { items, ask: 'Read the scale. How many grams (g)?', yes: 'Correct!', no: 'Not quite.', is: g => 'The mass is ' + g + ' g' + (g >= 1000 ? ' = ' + Math.floor(g / 1000) + ' kg ' + (g % 1000 ? g % 1000 + ' g' : '') : '') + '.', score: W.en.score }
      : { items, ask: 'Lees die skaal. Hoeveel gram (g)?', yes: 'Reg!', no: 'Nie heeltemal nie.', is: g => 'Die massa is ' + g + ' g' + (g >= 1000 ? ' = ' + Math.floor(g / 1000) + ' kg ' + (g % 1000 ? g % 1000 + ' g' : '') : '') + '.', score: W.af.score };
    const m = `<h4>🎮 ${en ? 'Kitchen Scale' : 'Kombuisskaal'}</h4><p class="how">${en ? 'The scale goes up to 2 kg (2 000 g). The long lines are every 500 g, the middle lines every 100 g and the short lines every 50 g.' : 'Die skaal gaan tot 2 kg (2 000 g). Die lang lyne is elke 500 g, die middel lyne elke 100 g en die kort lyne elke 50 g.'}</p><div class="g4-big" data-k="name" style="font-size:22px"></div><div class="g4-stage"><svg viewBox="0 0 640 300" data-k="svg" role="img" aria-label="scale"></svg></div><div class="g4-row"><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="g"><span style="font-size:20px">g</span><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('butter', '<strong>Mass</strong> tells us how heavy something is. We measure mass in <strong>grams (g)</strong> and <strong>kilograms (kg)</strong>.') +
      def('Grams and kilograms', '<span class="math">1 kg = 1 000 g</span>. A paper clip is about 1 g. A bag of sugar is often 1 kg or 2 kg 500 g.') +
      ex('Choosing a scale', ['Use a <strong>kitchen scale</strong> for food, in grams.', 'Use a <strong>bathroom scale</strong> to weigh people, in kilograms.', 'Read where the needle points. Work out what each small line is worth first.']) +
      sim('s602', S.s602, L, m) + tip('1 kg of feathers and 1 kg of stones have the <strong>same</strong> mass. The feathers just take up more space!')
      : hero('butter', '<strong>Massa</strong> sê vir ons hoe swaar iets is. Ons meet massa in <strong>gram (g)</strong> en <strong>kilogram (kg)</strong>.') +
      def('Gram en kilogram', '<span class="math">1 kg = 1 000 g</span>. \'n Skuifspeld is omtrent 1 g. \'n Sak suiker is dikwels 1 kg of 2 kg 500 g.') +
      ex('Kies \'n skaal', ['Gebruik \'n <strong>kombuisskaal</strong> vir kos, in gram.', 'Gebruik \'n <strong>badkamerskaal</strong> om mense te weeg, in kilogram.', 'Lees waar die naald wys. Werk eers uit wat elke klein lyntjie werd is.']) +
      sim('s602', S.s602, L, m) + tip('1 kg vere en 1 kg klippe het <strong>dieselfde</strong> massa. Die vere neem net meer plek in!');
  },
  qs: [
    { en: '1 kg = ___ g', af: '1 kg = ___ g', a: '1000', lv: 'K', h: ['"Kilo" means a thousand.', '"Kilo" beteken \'n duisend.'], s: same('1 kg = 1 000 g') },
    { en: 'Which unit is best for the mass of a bag of potatoes?', af: 'Watter eenheid is die beste vir die massa van \'n sak aartappels?', o: [['g', 'kg', 'ml', 'km'], ['g', 'kg', 'ml', 'km']], a: 1, lv: 'K', h: ['It is heavy.', 'Dit is swaar.'], s: [['Heavy things are measured in kilograms.'], ['Swaar dinge word in kilogram gemeet.']] },
    { en: '3 kg = ___ g', af: '3 kg = ___ g', a: '3000', lv: 'R', h: ['Each kg is 1 000 g.', 'Elke kg is 1 000 g.'], s: same('3 × 1 000 = 3 000 g') },
    { en: '2 500 g = 2 kg and ___ g', af: '2 500 g = 2 kg en ___ g', a: '500', lv: 'R', h: ['2 kg = 2 000 g', '2 kg = 2 000 g'], s: same('2 500 − 2 000 = 500 g') },
    { en: 'Which is heavier?', af: 'Watter een is swaarder?', o: [['1 kg of feathers', '1 kg of stones', 'They have the same mass'], ['1 kg vere', '1 kg klippe', 'Hulle het dieselfde massa']], a: 2, lv: 'C', h: ['Look at the mass, not the material.', 'Kyk na die massa, nie die materiaal nie.'], s: [['Both are 1 kg, so they have the same mass.'], ['Albei is 1 kg, so hulle het dieselfde massa.']] },
    { en: 'An apple has a mass of 150 g. What is the mass of 4 apples? (g)', af: '\'n Appel het \'n massa van 150 g. Wat is die massa van 4 appels? (g)', a: '600', lv: 'R', h: ['4 × 150', '4 × 150'], s: same('4 × 150 = 600 g') },
    { en: 'Which instrument would you use to weigh yourself?', af: 'Watter instrument sal jy gebruik om jouself te weeg?', o: [['kitchen scale', 'bathroom scale', 'ruler', 'measuring jug'], ['kombuisskaal', 'badkamerskaal', 'liniaal', 'maatbeker']], a: 1, lv: 'K', h: ['Which one measures people in kilograms?', 'Watter een meet mense in kilogram?'], s: [['A bathroom scale measures people in kg.'], ['\'n Badkamerskaal meet mense in kg.']] },
    { en: 'A bag of maize meal has 12 kg. Busi uses 2 kg and then 4 kg. She shares the rest equally into 2 bags. What is the mass of each bag? (kg)', af: '\'n Sak mieliemeel het 12 kg. Busi gebruik 2 kg en dan 4 kg. Sy verdeel die res eweredig in 2 sakke. Wat is die massa van elke sak? (kg)', a: '3', lv: 'P', h: ['First find what is left, then halve it.', 'Kry eers wat oorbly en halveer dit dan.'], s: same('12 − 2 − 4 = 6 kg; 6 ÷ 2 = 3 kg') }
  ],
  wb: { en: [{ t: 'Convert:', p: ['5 kg = ___ g', '4 000 g = ___ kg', '3 kg 250 g = ___ g'], m: [1, 1, 2] }, { t: 'A bag of oranges has a mass of 2 kg. Each orange is about 200 g. About how many oranges are in the bag?', p: [''], m: [2] }],
        af: [{ t: 'Herlei:', p: ['5 kg = ___ g', '4 000 g = ___ kg', '3 kg 250 g = ___ g'], m: [1, 1, 2] }, { t: '\'n Sak lemoene het \'n massa van 2 kg. Elke lemoen is omtrent 200 g. Omtrent hoeveel lemoene is in die sak?', p: [''], m: [2] }],
        ans: [['5 000 g', '', ''], ['4 kg', '', ''], ['3 250 g', '', ''], ['About 10 oranges', '2 000 ÷ 200 = 10', '2 000 ÷ 200 = 10']] }
});

/* ───────────── 603 Capacity ───────────── */
T.push({
  id: 603, name: { en: 'Capacity', af: 'Inhoudsmaat' }, full: { en: 'Measuring capacity: ml and l', af: 'Inhoudsmaat meet: ml en l' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { askRead: 'How much water is in the jug? Type it in millilitres (ml).', askPour: t => 'Pour exactly <b>' + t + ' ml</b>. Drag the slider until the water reaches the pink line, then check.', yes: 'Correct!', no: 'Not quite.', isRead: v => 'There is ' + v + ' ml of water.', poured: (v, t) => 'You poured ' + v + ' ml. The target was ' + t + ' ml.', score: W.en.score }
      : { askRead: 'Hoeveel water is in die beker? Tik dit in milliliter (ml).', askPour: t => 'Gooi presies <b>' + t + ' ml</b> in. Sleep die skuifbalk totdat die water by die pienk lyn is en toets dan.', yes: 'Reg!', no: 'Nie heeltemal nie.', isRead: v => 'Daar is ' + v + ' ml water.', poured: (v, t) => 'Jy het ' + v + ' ml ingegooi. Die doel was ' + t + ' ml.', score: W.af.score };
    const m = `<h4>🎮 ${en ? 'Measuring Jug' : 'Maatbeker'}</h4><p class="how">${en ? 'The jug holds 1 litre (1 000 ml). The long lines are every 100 ml and the short lines every 50 ml.' : 'Die beker hou 1 liter (1 000 ml). Die lang lyne is elke 100 ml en die kort lyne elke 50 ml.'}</p><div class="g4-row"><button class="g4-btn ghost" data-m="read">${en ? 'Read the jug' : 'Lees die beker'}</button><button class="g4-btn ghost" data-m="pour">${en ? 'Pour' : 'Gooi in'}</button></div><div class="g4-stage"><svg viewBox="0 0 640 265" data-k="svg" role="img" aria-label="jug"></svg></div><div class="g4-row" data-k="readrow"><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="ml"><span style="font-size:20px">ml</span></div><div class="g4-row" data-k="pourrow"><input type="range" min="0" max="1000" step="50" value="0" data-k="pour" style="flex:1;min-width:180px;accent-color:#60a5fa" aria-label="pour"></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('milk', '<strong>Capacity</strong> is how much a container can hold. We measure it in <strong>millilitres (ml)</strong> and <strong>litres (l)</strong>.') +
      def('Millilitres and litres', '<span class="math">1 l = 1 000 ml</span>. A teaspoon holds about 5 ml. A cup holds about 250 ml. A carton of milk often holds 1 l.') +
      ex('Reading a measuring jug', ['Hold the jug level and look at the water from the side.', 'Find the line at the top of the water.', 'Work out what each line is worth: here each small line is 50 ml.']) +
      sim('s603', S.s603, L, m) + tip('Four cups of 250 ml fill a 1 litre jug: <span class="math">4 × 250 ml = 1 000 ml = 1 l</span>.')
      : hero('milk', '<strong>Inhoudsmaat</strong> is hoeveel \'n houer kan hou. Ons meet dit in <strong>milliliter (ml)</strong> en <strong>liter (l)</strong>.') +
      def('Milliliter en liter', '<span class="math">1 l = 1 000 ml</span>. \'n Teelepel hou omtrent 5 ml. \'n Koppie hou omtrent 250 ml. \'n Karton melk hou dikwels 1 l.') +
      ex('Lees \'n maatbeker', ['Hou die beker gelyk en kyk van die kant af na die water.', 'Vind die lyn bo-op die water.', 'Werk uit wat elke lyn werd is: hier is elke klein lyntjie 50 ml.']) +
      sim('s603', S.s603, L, m) + tip('Vier koppies van 250 ml maak \'n beker van 1 liter vol: <span class="math">4 × 250 ml = 1 000 ml = 1 l</span>.');
  },
  qs: [
    { en: '1 l = ___ ml', af: '1 l = ___ ml', a: '1000', lv: 'K', h: ['"Milli" means a thousandth.', '"Milli" beteken \'n duisendste.'], s: same('1 l = 1 000 ml') },
    { en: 'Which unit is best for a teaspoon of medicine?', af: 'Watter eenheid is die beste vir \'n teelepel medisyne?', o: [['ml', 'l', 'kg', 'km'], ['ml', 'l', 'kg', 'km']], a: 0, lv: 'K', h: ['It is a very small amount of liquid.', 'Dit is \'n baie klein hoeveelheid vloeistof.'], s: [['A teaspoon holds about 5 ml.'], ['\'n Teelepel hou omtrent 5 ml.']] },
    { en: '2 l = ___ ml', af: '2 l = ___ ml', a: '2000', lv: 'R', h: ['Each litre is 1 000 ml.', 'Elke liter is 1 000 ml.'], s: same('2 × 1 000 = 2 000 ml') },
    { en: '1 500 ml = 1 l and ___ ml', af: '1 500 ml = 1 l en ___ ml', a: '500', lv: 'R', h: ['1 l = 1 000 ml', '1 l = 1 000 ml'], s: same('1 500 − 1 000 = 500 ml') },
    { en: 'How many millilitres are in four 250 ml cups?', af: 'Hoeveel milliliter is in vier koppies van 250 ml?', a: '1000', lv: 'R', h: ['4 × 250', '4 × 250'], s: same('4 × 250 = 1 000 ml') },
    { en: 'Which container holds about 1 litre?', af: 'Watter houer hou omtrent 1 liter?', o: [['a teaspoon', 'a milk carton', 'a bath', 'a swimming pool'], ['\'n teelepel', '\'n melkkarton', '\'n bad', '\'n swembad']], a: 1, lv: 'K', h: ['Think of what you buy at the shop.', 'Dink aan wat jy by die winkel koop.'], s: [['A milk carton usually holds 1 litre.'], ['\'n Melkkarton hou gewoonlik 1 liter.']] },
    { en: '3 l − 750 ml = ___ ml', af: '3 l − 750 ml = ___ ml', a: '2250', lv: 'C', h: ['Change 3 l to ml first.', 'Verander eers 3 l na ml.'], s: same('3 000 − 750 = 2 250 ml') },
    { en: 'Waseela uses 2 l of water for tea, 60 l for washing and 4 l for the dishes. How many litres does she use altogether?', af: 'Waseela gebruik 2 l water vir tee, 60 l vir wasgoed en 4 l vir skottelgoed. Hoeveel liter gebruik sy altesaam?', a: '66', lv: 'R', h: ['Add all three.', 'Tel al drie bymekaar.'], s: same('2 + 60 + 4 = 66 l') }
  ],
  wb: { en: [{ t: 'Convert:', p: ['4 l = ___ ml', '6 000 ml = ___ l', '2 l 300 ml = ___ ml'], m: [1, 1, 2] }, { t: 'A jug holds 2 l. How many glasses of 250 ml can you fill from it?', p: [''], m: [2] }],
        af: [{ t: 'Herlei:', p: ['4 l = ___ ml', '6 000 ml = ___ l', '2 l 300 ml = ___ ml'], m: [1, 1, 2] }, { t: '\'n Beker hou 2 l. Hoeveel glase van 250 ml kan jy daaruit volmaak?', p: [''], m: [2] }],
        ans: [['4 000 ml', '', ''], ['6 l', '', ''], ['2 300 ml', '', ''], ['8 glasses', '2 000 ÷ 250 = 8', '2 000 ÷ 250 = 8']] }
});

/* ───────────── 604 Converting and problems ───────────── */
T.push({
  id: 604, name: { en: 'Converting and problems', af: 'Herlei en probleme' }, full: { en: 'Converting units and solving measurement problems', af: 'Eenhede herlei en meetprobleme oplos' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { type: 'Type a number.', mult: (a, b, f) => 'From ' + a + ' to ' + b + ' (a smaller unit), <b>multiply by ' + f + '</b>: you need more of the smaller unit.', div: (a, b, f) => 'From ' + a + ' to ' + b + ' (a bigger unit), <b>divide by ' + f + '</b>: you need fewer of the bigger unit.', same: 'Same unit, same number.', notWhole: (v, a, b) => v + ' ' + a + ' is not a whole number of ' + b + '. Try a different number.' }
      : { type: 'Tik \'n getal.', mult: (a, b, f) => 'Van ' + a + ' na ' + b + ' (\'n kleiner eenheid), <b>vermenigvuldig met ' + f + '</b>: jy het meer van die kleiner eenheid nodig.', div: (a, b, f) => 'Van ' + a + ' na ' + b + ' (\'n groter eenheid), <b>deel deur ' + f + '</b>: jy het minder van die groter eenheid nodig.', same: 'Dieselfde eenheid, dieselfde getal.', notWhole: (v, a, b) => v + ' ' + a + ' is nie \'n heel getal ' + b + ' nie. Probeer \'n ander getal.' };
    const sel = `style="font:inherit;font-size:20px;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.25);color:#fff;border:1px solid rgba(255,255,255,.18)"`;
    const m = `<h4>🎮 ${en ? 'Unit Converter' : 'Eenheidsomskakelaar'}</h4><p class="how">${en ? 'Choose length, mass or capacity. Type a number and choose the units. The ladder shows when to multiply and when to divide.' : 'Kies lengte, massa of inhoudsmaat. Tik \'n getal en kies die eenhede. Die leer wys wanneer om te vermenigvuldig en wanneer om te deel.'}</p><div class="g4-row"><button class="g4-btn ghost" data-set="len">${en ? 'Length' : 'Lengte'}</button><button class="g4-btn ghost" data-set="mass">${en ? 'Mass' : 'Massa'}</button><button class="g4-btn ghost" data-set="cap">${en ? 'Capacity' : 'Inhoudsmaat'}</button></div><div class="g4-row" data-k="ladder" style="gap:6px"></div><div class="g4-row"><input class="g4-input" data-k="n" inputmode="numeric" aria-label="number"><select data-k="from" ${sel} aria-label="from"></select><span class="g4-big">→</span><select data-k="to" ${sel} aria-label="to"></select></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('kudu-horn', 'To compare or add measurements, they must be in the <strong>same unit</strong>. Then we can solve problems.') +
      ex('Siphiwe\'s rope', ['Siphiwe cuts 6 pieces of rope, each 500 mm long, from a rope 3 500 mm long. How much is left?', 'Used: <span class="math">6 × 500 mm = 3 000 mm</span>', 'Left: <span class="math">3 500 mm − 3 000 mm = 500 mm</span>']) +
      def('Smaller unit, bigger number', 'Going to a <strong>smaller</strong> unit (m → cm), multiply. Going to a <strong>bigger</strong> unit (g → kg), divide.') +
      sim('s604', S.s604, L, m) + tip('To order 80 cm, 1 m and 1 200 mm, change them all to the same unit first: 800 mm, 1 000 mm, 1 200 mm.')
      : hero('kudu-horn', 'Om mates te vergelyk of op te tel, moet hulle in <strong>dieselfde eenheid</strong> wees. Dan kan ons probleme oplos.') +
      ex('Siphiwe se tou', ['Siphiwe sny 6 stukke tou, elk 500 mm lank, van \'n tou van 3 500 mm. Hoeveel bly oor?', 'Gebruik: <span class="math">6 × 500 mm = 3 000 mm</span>', 'Oor: <span class="math">3 500 mm − 3 000 mm = 500 mm</span>']) +
      def('Kleiner eenheid, groter getal', 'Na \'n <strong>kleiner</strong> eenheid (m → cm), vermenigvuldig. Na \'n <strong>groter</strong> eenheid (g → kg), deel.') +
      sim('s604', S.s604, L, m) + tip('Om 80 cm, 1 m en 1 200 mm te orden, verander hulle eers almal na dieselfde eenheid: 800 mm, 1 000 mm, 1 200 mm.');
  },
  qs: [
    { en: 'Siphiwe cuts 6 pieces of rope, each 500 mm long, from a rope 3 500 mm long. How much rope is left? (mm)', af: 'Siphiwe sny 6 stukke tou, elk 500 mm lank, van \'n tou van 3 500 mm. Hoeveel tou bly oor? (mm)', a: '500', lv: 'C', h: ['First find how much he used.', 'Kry eers hoeveel hy gebruik het.'], s: same('6 × 500 = 3 000 mm; 3 500 − 3 000 = 500 mm') },
    { en: 'A truck carries 3 boxes of 250 kg each. What is the total mass? (kg)', af: '\'n Vragmotor dra 3 bokse van 250 kg elk. Wat is die totale massa? (kg)', a: '750', lv: 'R', h: ['3 × 250', '3 × 250'], s: same('3 × 250 = 750 kg') },
    { en: '4 m = ___ mm', af: '4 m = ___ mm', a: '4000', lv: 'C', h: ['1 m = 100 cm = 1 000 mm', '1 m = 100 cm = 1 000 mm'], s: same('4 × 1 000 = 4 000 mm') },
    { en: 'Which list is in order from shortest to longest?', af: 'Watter lys is in volgorde van kortste na langste?', o: [['80 cm; 1 m; 1 200 mm', '1 m; 80 cm; 1 200 mm', '1 200 mm; 1 m; 80 cm', '80 cm; 1 200 mm; 1 m'], ['80 cm; 1 m; 1 200 mm', '1 m; 80 cm; 1 200 mm', '1 200 mm; 1 m; 80 cm', '80 cm; 1 200 mm; 1 m']], a: 0, lv: 'C', h: ['Change them all to mm.', 'Verander hulle almal na mm.'], s: same('800 mm; 1 000 mm; 1 200 mm') },
    { en: '5 000 g = ___ kg', af: '5 000 g = ___ kg', a: '5', lv: 'R', h: ['Divide by 1 000.', 'Deel deur 1 000.'], s: same('5 000 ÷ 1 000 = 5 kg') },
    { en: 'A jug holds 2 l. How many glasses of 200 ml can you fill?', af: '\'n Beker hou 2 l. Hoeveel glase van 200 ml kan jy volmaak?', a: '10', lv: 'C', h: ['2 l = 2 000 ml', '2 l = 2 000 ml'], s: same('2 000 ÷ 200 = 10') },
    { en: '1 km − 350 m = ___ m', af: '1 km − 350 m = ___ m', a: '650', lv: 'R', h: ['1 km = 1 000 m', '1 km = 1 000 m'], s: same('1 000 − 350 = 650 m') },
    { en: 'Thabo walks 750 m to school and 750 m back every day. How far does he walk in 2 days? (m)', af: 'Thabo stap elke dag 750 m skool toe en 750 m terug. Hoe ver stap hy in 2 dae? (m)', a: '3000', lv: 'P', h: ['One day is there and back.', 'Een dag is heen en terug.'], s: same('750 + 750 = 1 500 m; 1 500 × 2 = 3 000 m') }
  ],
  wb: { en: [{ t: 'Solve. Change to the same unit first.', p: ['A ribbon is 2 m long. Lerato cuts off 85 cm. How much is left?', 'A recipe needs 750 g of flour. How many kilograms and grams are needed for 2 batches?', 'A bottle holds 1 l 500 ml. How many 250 ml cups can it fill?'], m: [2, 3, 2] }],
        af: [{ t: 'Los op. Verander eers na dieselfde eenheid.', p: ['\'n Lint is 2 m lank. Lerato sny 85 cm af. Hoeveel bly oor?', '\'n Resep het 750 g meel nodig. Hoeveel kilogram en gram is nodig vir 2 bakselle?', '\'n Bottel hou 1 l 500 ml. Hoeveel koppies van 250 ml kan dit volmaak?'], m: [2, 3, 2] }],
        ans: [['115 cm = 1 m 15 cm', '200 − 85 = 115', '200 − 85 = 115'], ['1 500 g = 1 kg 500 g', '2 × 750 = 1 500', '2 × 750 = 1 500'], ['6 cups', '1 500 ÷ 250 = 6', '1 500 ÷ 250 = 6']] }
});

writeChapter(6, { en: 'Length, Mass and Capacity', af: 'Lengte, Massa en Inhoudsmaat' }, T, process.argv[2] || OUT_DEFAULT);
