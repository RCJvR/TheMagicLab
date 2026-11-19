// Grade 4 Math Magician, Chapter 3: Multiplication, multiples and factors (one bilingual source).
// Run: node scripts/math-gr4/gen_ch3.js   (writes math-magician/gr4/ch3.js, ch3.af.js, ch3.help.js)
const { ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT } = require('./lib.js');
const S = require('./sims_ch3.js');
const T = [];
const same = s => [[s], [s]];

/* ───────────── 301 Multiplying ───────────── */
T.push({
  id: 301, name: { en: 'Multiplying', af: 'Vermenigvuldig' }, full: { en: 'Multiplication as repeated addition', af: 'Vermenigvuldiging as herhaalde optelling' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { rep: (s, t) => 'Repeated addition: ' + s + ' = ' + t, rows: (a, b, t) => a + ' rows of ' + b + ' dots make ' + t + ' dots.', swapped: 'You swapped the numbers and the answer stayed the same!' }
      : { rep: (s, t) => 'Herhaalde optelling: ' + s + ' = ' + t, rows: (a, b, t) => a + ' rye van ' + b + ' kolletjies maak ' + t + ' kolletjies.', swapped: 'Jy het die getalle omgeruil en die antwoord het dieselfde gebly!' };
    const stepper = k => `<button class="g4-btn ghost" data-s="${k}:-1">−</button><span class="g4-big" data-k="${k}" style="min-width:40px;text-align:center"></span><button class="g4-btn ghost" data-s="${k}:1">+</button>`;
    const m = `<h4>🎮 ${en ? 'Jumps and Arrays' : 'Spronge en Skikkings'}</h4><p class="how">${en ? 'Change the numbers. See the multiplication as jumps on a number line and as rows of dots.' : 'Verander die getalle. Sien die vermenigvuldiging as spronge op \'n getallelyn en as rye kolletjies.'}</p><div class="g4-row">${stepper('a')}<span class="g4-big">×</span>${stepper('b')}<button class="g4-btn ghost" data-k="swap">${en ? 'Swap' : 'Ruil om'}</button></div><div class="g4-stage"><svg viewBox="0 0 640 160" data-k="line" role="img" aria-label="number line"></svg></div><div class="g4-stage"><svg data-k="arr" role="img" aria-label="array" style="max-width:300px"></svg></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('chicken', '<strong>Multiplying</strong> is a quick way to add the same number again and again. <span class="math">4 × 2</span> means 4 groups of 2: <span class="math">2 + 2 + 2 + 2 = 8</span>.') +
      def('Any order', 'We can multiply in any order: <span class="math">4 × 2 = 2 × 4</span> and <span class="math">60 × 76 = 76 × 60</span>. The answer to a multiplication is called the <strong>product</strong>.') +
      ex('Know your tables', ['Learn the tables up to <span class="math">10 × 10</span> so you can use them quickly.', 'Use a fact you know: <span class="math">7 × 8</span> is double <span class="math">7 × 4 = 28</span>, so it is <strong>56</strong>.', '<span class="math">9 × 6</span> is <span class="math">10 × 6 − 6 = 60 − 6 = 54</span>.']) +
      sim('s301', S.s301, L, m) + tip('On a number line, <span class="math">3 × 5</span> is <strong>3 jumps of 5</strong>: 5, 10, 15.')
      : hero('chicken', '<strong>Vermenigvuldig</strong> is \'n vinnige manier om dieselfde getal oor en oor by te tel. <span class="math">4 × 2</span> beteken 4 groepe van 2: <span class="math">2 + 2 + 2 + 2 = 8</span>.') +
      def('Enige volgorde', 'Ons kan in enige volgorde vermenigvuldig: <span class="math">4 × 2 = 2 × 4</span> en <span class="math">60 × 76 = 76 × 60</span>. Die antwoord van \'n vermenigvuldiging word die <strong>produk</strong> genoem.') +
      ex('Ken jou tafels', ['Leer die tafels tot <span class="math">10 × 10</span> sodat jy hulle vinnig kan gebruik.', 'Gebruik \'n feit wat jy ken: <span class="math">7 × 8</span> is dubbel <span class="math">7 × 4 = 28</span>, so dit is <strong>56</strong>.', '<span class="math">9 × 6</span> is <span class="math">10 × 6 − 6 = 60 − 6 = 54</span>.']) +
      sim('s301', S.s301, L, m) + tip('Op \'n getallelyn is <span class="math">3 × 5</span> <strong>3 spronge van 5</strong>: 5, 10, 15.');
  },
  qs: [
    { en: '4 × 2 = ?', af: '4 × 2 = ?', a: '8', lv: 'K', h: ['4 groups of 2.', '4 groepe van 2.'], s: same('2 + 2 + 2 + 2 = 8') },
    { en: '2 + 2 + 2 + 2 + 2 is the same as…', af: '2 + 2 + 2 + 2 + 2 is dieselfde as…', o: [['2 × 5', '5 + 2', '2 × 2', '10 × 2'], ['2 × 5', '5 + 2', '2 × 2', '10 × 2']], a: 0, lv: 'K', h: ['Count how many 2s there are.', 'Tel hoeveel 2\'e daar is.'], s: [['There are five 2s: 5 × 2 = 2 × 5 = 10.'], ['Daar is vyf 2\'e: 5 × 2 = 2 × 5 = 10.']] },
    { en: '7 × 8 = ?', af: '7 × 8 = ?', a: '56', lv: 'K', h: ['Double 7 × 4.', 'Verdubbel 7 × 4.'], s: same('7 × 4 = 28; 28 + 28 = 56') },
    { en: '60 × 76 = 76 × ___', af: '60 × 76 = 76 × ___', o: [['76', '60', '136', '16'], ['76', '60', '136', '16']], a: 1, lv: 'K', h: ['We can multiply in any order.', 'Ons kan in enige volgorde vermenigvuldig.'], s: [['Swapping the numbers does not change the product.'], ['As ons die getalle omruil, verander die produk nie.']] },
    { en: '9 × 6 = ?', af: '9 × 6 = ?', a: '54', lv: 'K', h: ['10 × 6, then take away one 6.', '10 × 6, trek dan een 6 af.'], s: same('10 × 6 = 60; 60 − 6 = 54') },
    { en: 'A hall has 6 rows of chairs with 7 chairs in each row. How many chairs are there?', af: '\'n Saal het 6 rye stoele met 7 stoele in elke ry. Hoeveel stoele is daar?', a: '42', lv: 'R', h: ['6 groups of 7.', '6 groepe van 7.'], s: same('6 × 7 = 42') },
    { en: 'Which shows 3 × 5 on a number line?', af: 'Watter een wys 3 × 5 op \'n getallelyn?', o: [['3 jumps of 5', '5 jumps of 5', '3 jumps of 3', '8 jumps of 1'], ['3 spronge van 5', '5 spronge van 5', '3 spronge van 3', '8 spronge van 1']], a: 0, lv: 'R', h: ['3 groups of 5.', '3 groepe van 5.'], s: [['3 jumps of 5 land on 5, 10, 15.'], ['3 spronge van 5 land op 5, 10, 15.']] },
    { en: '10 × 10 = ?', af: '10 × 10 = ?', a: '100', lv: 'K', h: ['10 groups of 10.', '10 groepe van 10.'], s: same('10 × 10 = 100') }
  ],
  wb: { en: [{ t: 'Write each as a multiplication and work out the answer:', p: ['3 + 3 + 3 + 3 + 3', '8 + 8 + 8', '6 rows of 9 desks'], m: [2, 2, 2] }], af: [{ t: 'Skryf elkeen as \'n vermenigvuldiging en werk die antwoord uit:', p: ['3 + 3 + 3 + 3 + 3', '8 + 8 + 8', '6 rye van 9 banke'], m: [2, 2, 2] }],
        ans: [['5 × 3 = 15', '', ''], ['3 × 8 = 24', '', ''], ['6 × 9 = 54', '', '']] }
});

/* ───────────── 302 Multiples ───────────── */
T.push({
  id: 302, name: { en: 'Multiples', af: 'Veelvoude' }, full: { en: 'Multiples of 1-digit numbers', af: 'Veelvoude van 1-syfergetalle' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { found: (a, b, n) => 'Tap every multiple of ' + n + '. Found ' + a + ' of ' + b + '.', all: (n, b) => 'You found all ' + b + ' multiples of ' + n + ' up to 100! See the pattern?', not: (v, n, q, r) => v + ' is not a multiple of ' + n + ': ' + n + ' × ' + q + ' = ' + (n * q) + ' with ' + r + ' left over.' }
      : { found: (a, b, n) => 'Tik op elke veelvoud van ' + n + '. ' + a + ' van ' + b + ' gevind.', all: (n, b) => 'Jy het al ' + b + ' veelvoude van ' + n + ' tot 100 gevind! Sien jy die patroon?', not: (v, n, q, r) => v + ' is nie \'n veelvoud van ' + n + ' nie: ' + n + ' × ' + q + ' = ' + (n * q) + ' met ' + r + ' oor.' };
    const m = `<h4>🎮 ${en ? 'Hundred Square Hunt' : 'Honderdblok-jag'}</h4><p class="how">${en ? 'Choose a number. Then tap all its multiples on the hundred square.' : 'Kies \'n getal. Tik dan op al sy veelvoude op die honderdblok.'}</p><div class="g4-row" data-k="ns"></div><div data-k="grid" style="display:grid;grid-template-columns:repeat(10,1fr);gap:4px;max-width:520px;margin:10px 0"></div><div class="g4-row"><button class="g4-btn ghost" data-k="show">${en ? 'Show all' : 'Wys almal'}</button><button class="g4-btn ghost" data-k="reset">${en ? 'Start again' : 'Begin oor'}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('bee', 'The <strong>multiples</strong> of a number are the answers in its times table. The multiples of 3 are 3, 6, 9, 12, 15 … They go on and on!') +
      ex('Multiples of 8 between 30 and 60', ['Count in 8s: 8, 16, 24, <strong>32, 40, 48, 56</strong>, 64 …', 'The ones between 30 and 60 are <span class="math">32; 40; 48; 56</span>.']) +
      def('Spot a multiple', 'Multiples of <strong>2</strong> are even. Multiples of <strong>5</strong> end in 0 or 5. Multiples of <strong>10</strong> end in 0.') +
      sim('s302', S.s302, L, m) + tip('A number can be a multiple of more than one number: 12 is a multiple of 2, 3, 4 and 6.')
      : hero('bee', 'Die <strong>veelvoude</strong> van \'n getal is die antwoorde in sy tafel. Die veelvoude van 3 is 3, 6, 9, 12, 15 … Hulle gaan aan en aan!') +
      ex('Veelvoude van 8 tussen 30 en 60', ['Tel in 8\'e: 8, 16, 24, <strong>32, 40, 48, 56</strong>, 64 …', 'Die tussen 30 en 60 is <span class="math">32; 40; 48; 56</span>.']) +
      def('Herken \'n veelvoud', 'Veelvoude van <strong>2</strong> is ewe. Veelvoude van <strong>5</strong> eindig op 0 of 5. Veelvoude van <strong>10</strong> eindig op 0.') +
      sim('s302', S.s302, L, m) + tip('\'n Getal kan \'n veelvoud van meer as een getal wees: 12 is \'n veelvoud van 2, 3, 4 en 6.');
  },
  qs: [
    { en: 'Which are the multiples of 8 between 30 and 60?', af: 'Watter is die veelvoude van 8 tussen 30 en 60?', o: [['32; 40; 48; 56', '30; 40; 50; 60', '38; 46; 54', '33; 41; 49; 57'], ['32; 40; 48; 56', '30; 40; 50; 60', '38; 46; 54', '33; 41; 49; 57']], a: 0, lv: 'R', h: ['Count in 8s.', 'Tel in 8\'e.'], s: same('8; 16; 24; 32; 40; 48; 56; 64') },
    { en: 'What is the 5th multiple of 7?', af: 'Wat is die 5de veelvoud van 7?', a: '35', lv: 'K', h: ['7 × 5', '7 × 5'], s: same('7; 14; 21; 28; 35') },
    { en: 'Which number is a multiple of 6?', af: 'Watter getal is \'n veelvoud van 6?', o: [['26', '36', '44', '50'], ['26', '36', '44', '50']], a: 1, lv: 'R', h: ['Which one is in the 6 times table?', 'Watter een is in die 6-tafel?'], s: same('6 × 6 = 36') },
    { en: 'How many multiples of 9 are there from 1 to 100?', af: 'Hoeveel veelvoude van 9 is daar van 1 tot 100?', a: '11', lv: 'C', h: ['9 × 11 = 99, and 9 × 12 is more than 100.', '9 × 11 = 99, en 9 × 12 is meer as 100.'], s: same('9; 18; 27; 36; 45; 54; 63; 72; 81; 90; 99 → 11') },
    { en: '45 is a multiple of…', af: '45 is \'n veelvoud van…', o: [['2', '4', '5', '7'], ['2', '4', '5', '7']], a: 2, lv: 'K', h: ['Look at the last digit.', 'Kyk na die laaste syfer.'], s: [['45 ends in 5, so it is a multiple of 5: 5 × 9 = 45.'], ['45 eindig op 5, so dit is \'n veelvoud van 5: 5 × 9 = 45.']] },
    { en: 'What is the smallest number that is a multiple of both 4 and 6?', af: 'Wat is die kleinste getal wat \'n veelvoud van beide 4 en 6 is?', a: '12', lv: 'P', h: ['List the multiples of 4 and of 6. Which comes first in both lists?', 'Lys die veelvoude van 4 en van 6. Watter een kom eerste in albei lyste?'], s: [['Multiples of 4: 4, 8, 12, 16 …', 'Multiples of 6: 6, 12, 18 …', '12 is in both.'], ['Veelvoude van 4: 4, 8, 12, 16 …', 'Veelvoude van 6: 6, 12, 18 …', '12 is in albei.']] },
    { en: 'Multiples of 5 always end in…', af: 'Veelvoude van 5 eindig altyd op…', o: [['0 or 5', '5 only', '0 only', '2 or 5'], ['0 of 5', 'net 5', 'net 0', '2 of 5']], a: 0, lv: 'K', h: ['Count in 5s: 5, 10, 15, 20 …', 'Tel in 5\'e: 5, 10, 15, 20 …'], s: [['The last digits go 5, 0, 5, 0 …'], ['Die laaste syfers gaan 5, 0, 5, 0 …']] },
    { en: 'What is the next multiple of 3 after 99?', af: 'Wat is die volgende veelvoud van 3 na 99?', a: '102', lv: 'R', h: ['99 is a multiple of 3. Add 3.', '99 is \'n veelvoud van 3. Tel 3 by.'], s: same('99 + 3 = 102') }
  ],
  wb: { en: [{ t: 'Write down:', p: ['the first 10 multiples of 6', 'the multiples of 7 between 40 and 70', 'two numbers that are multiples of both 3 and 5'], m: [2, 2, 2] }], af: [{ t: 'Skryf neer:', p: ['die eerste 10 veelvoude van 6', 'die veelvoude van 7 tussen 40 en 70', 'twee getalle wat veelvoude van beide 3 en 5 is'], m: [2, 2, 2] }],
        ans: [['6; 12; 18; 24; 30; 36; 42; 48; 54; 60', '', ''], ['42; 49; 56; 63', '', ''], ['e.g. 15 and 30', 'Multiples of 15', 'Veelvoude van 15']] }
});

/* ───────────── 303 Doubling and × 10, 100, 1 000 ───────────── */
T.push({
  id: 303, name: { en: 'Doubling and ×10, ×100, ×1 000', af: 'Verdubbel en ×10, ×100, ×1 000' }, full: { en: 'Doubling, and multiplying by 10, 100 and 1 000', af: 'Verdubbel, en vermenigvuldig met 10, 100 en 1 000' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { cols: ['HTh', 'TTh', 'Th', 'H', 'T', 'U'], start: 'Type a number up to 999, then press a button.', dbl: n => 'Double ' + n, moves: k => 'Every digit moves <b>' + k + (k === 1 ? ' place' : ' places') + '</b> to the left, and a 0 fills each empty place.' }
      : { cols: ['HD', 'TD', 'D', 'H', 'T', 'E'], start: 'Tik \'n getal tot 999 en druk dan \'n knoppie.', dbl: n => 'Dubbel ' + n, moves: k => 'Elke syfer skuif <b>' + k + (k === 1 ? ' plek' : ' plekke') + '</b> na links, en \'n 0 vul elke leë plek.' };
    const m = `<h4>🎮 ${en ? 'Times Machine' : 'Maalmasjien'}</h4><p class="how">${en ? 'Type a number, then double it or multiply it by 10, 100 or 1 000. Watch the digits move in the place value chart.' : 'Tik \'n getal en verdubbel dit of vermenigvuldig dit met 10, 100 of 1 000. Kyk hoe die syfers in die plekwaardetabel skuif.'}</p><div class="g4-row"><input class="g4-input" data-k="n" value="73" inputmode="numeric" aria-label="number"><button class="g4-btn" data-op="x2">${en ? 'Double' : 'Verdubbel'}</button><button class="g4-btn" data-op="10">× 10</button><button class="g4-btn" data-op="100">× 100</button><button class="g4-btn" data-op="1000">× 1 000</button></div><table class="g4-chart" data-k="chart"></table><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('scales', '<strong>Doubling</strong> means multiplying by 2, or adding a number to itself. Multiplying by <strong>10, 100</strong> or <strong>1 000</strong> makes a number 10, 100 or 1 000 times bigger.') +
      ex('Doubling', ['Double 8 = 8 + 8 = <strong>16</strong>', 'Double 16 = 16 + 16 = <strong>32</strong>', 'Double 132 = 132 + 132 = <strong>264</strong>']) +
      ex('× 10, × 100, × 1 000', ['<span class="math">73 × 10 = 730</span>: each digit moves 1 place to the left.', '<span class="math">73 × 100 = 7 300</span>: each digit moves 2 places to the left.', '<span class="math">73 × 1 000 = 73 000</span>: each digit moves 3 places to the left.']) +
      sim('s303', S.s303, L, m) + tip('We do not just "add a zero". The digits <strong>move</strong> to bigger places, and the 0 holds the empty place.')
      : hero('scales', '<strong>Verdubbel</strong> beteken vermenigvuldig met 2, of tel \'n getal by homself. As ons met <strong>10, 100</strong> of <strong>1 000</strong> vermenigvuldig, word \'n getal 10, 100 of 1 000 keer groter.') +
      ex('Verdubbel', ['Dubbel 8 = 8 + 8 = <strong>16</strong>', 'Dubbel 16 = 16 + 16 = <strong>32</strong>', 'Dubbel 132 = 132 + 132 = <strong>264</strong>']) +
      ex('× 10, × 100, × 1 000', ['<span class="math">73 × 10 = 730</span>: elke syfer skuif 1 plek na links.', '<span class="math">73 × 100 = 7 300</span>: elke syfer skuif 2 plekke na links.', '<span class="math">73 × 1 000 = 73 000</span>: elke syfer skuif 3 plekke na links.']) +
      sim('s303', S.s303, L, m) + tip('Ons "sit nie net \'n nul by nie". Die syfers <strong>skuif</strong> na groter plekke, en die 0 hou die leë plek oop.');
  },
  qs: [
    { en: 'Double 16 = ?', af: 'Dubbel 16 = ?', a: '32', lv: 'K', h: ['16 + 16', '16 + 16'], s: same('16 + 16 = 32') },
    { en: 'Double 132 = ?', af: 'Dubbel 132 = ?', a: '264', lv: 'R', h: ['Double the hundreds, tens and units.', 'Verdubbel die honderde, tiene en ene.'], s: same('200 + 60 + 4 = 264') },
    { en: '73 × 10 = ?', af: '73 × 10 = ?', a: '730', lv: 'K', h: ['Each digit moves 1 place to the left.', 'Elke syfer skuif 1 plek na links.'], s: same('73 × 10 = 730') },
    { en: '73 × 100 = ?', af: '73 × 100 = ?', a: '7300', lv: 'K', h: ['Each digit moves 2 places to the left.', 'Elke syfer skuif 2 plekke na links.'], s: same('73 × 100 = 7 300') },
    { en: '73 × 1 000 = ?', af: '73 × 1 000 = ?', a: '73000', lv: 'R', h: ['Each digit moves 3 places to the left.', 'Elke syfer skuif 3 plekke na links.'], s: same('73 × 1 000 = 73 000') },
    { en: 'When you multiply by 10, each digit moves…', af: 'As jy met 10 vermenigvuldig, skuif elke syfer…', o: [['one place to the left', 'one place to the right', 'two places to the left', 'nowhere'], ['een plek na links', 'een plek na regs', 'twee plekke na links', 'nêrens nie']], a: 0, lv: 'K', h: ['The number gets 10 times bigger.', 'Die getal word 10 keer groter.'], s: [['Units become tens, tens become hundreds: one place to the left.'], ['Ene word tiene, tiene word honderde: een plek na links.']] },
    { en: 'Double 48 = ?', af: 'Dubbel 48 = ?', a: '96', lv: 'R', h: ['Double 40, then double 8.', 'Verdubbel 40, dan verdubbel 8.'], s: same('80 + 16 = 96') },
    { en: '25 × 100 = ?', af: '25 × 100 = ?', a: '2500', lv: 'R', h: ['Each digit moves 2 places to the left.', 'Elke syfer skuif 2 plekke na links.'], s: same('25 × 100 = 2 500') }
  ],
  wb: { en: [{ t: 'Double each number:', p: ['35', '124', '409'], m: [1, 1, 1] }, { t: 'Calculate:', p: ['56 × 10', '56 × 100', '56 × 1 000'], m: [1, 1, 1] }], af: [{ t: 'Verdubbel elke getal:', p: ['35', '124', '409'], m: [1, 1, 1] }, { t: 'Bereken:', p: ['56 × 10', '56 × 100', '56 × 1 000'], m: [1, 1, 1] }],
        ans: [['70', '', ''], ['248', '', ''], ['818', '', ''], ['560', '', ''], ['5 600', '', ''], ['56 000', '', '']] }
});

/* ───────────── 304 Factors and splitting ───────────── */
T.push({
  id: 304, name: { en: 'Factors and splitting', af: 'Faktore en opbreek' }, full: { en: 'Factors and the distributive property', af: 'Faktore en die distributiewe eienskap' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { facts: (n, f, k) => 'The factors of ' + n + ' are <b>' + f + '</b>. That is ' + k + ' factors. Each rectangle is a pair of factors.', prime: n => n + ' has only two factors: 1 and itself.', split: 'Split the second number:', why: 'Breaking a number into easier parts makes multiplying easier.' }
      : { facts: (n, f, k) => 'Die faktore van ' + n + ' is <b>' + f + '</b>. Dit is ' + k + ' faktore. Elke reghoek is \'n paar faktore.', prime: n => n + ' het net twee faktore: 1 en homself.', split: 'Breek die tweede getal op:', why: 'As ons \'n getal in makliker dele opbreek, is vermenigvuldiging makliker.' };
    const m = `<h4>🎮 ${en ? 'Factor Rectangles' : 'Faktorreghoeke'}</h4><p class="how">${en ? 'In Factors, change the number to see every rectangle it makes. In Split it, break a multiplication into two easier parts.' : 'In Faktore, verander die getal om elke reghoek te sien wat dit maak. In Breek op, breek \'n vermenigvuldiging in twee makliker dele.'}</p><div class="g4-row"><button class="g4-btn ghost" data-m="f">${en ? 'Factors' : 'Faktore'}</button><button class="g4-btn ghost" data-m="s">${en ? 'Split it' : 'Breek op'}</button><button class="g4-btn ghost" data-k="newsplit">${en ? 'New split' : 'Nuwe som'}</button></div><div class="g4-row" data-k="ctl"></div><div class="g4-stage"><svg viewBox="0 0 640 220" data-k="svg" role="img" aria-label="factors"></svg></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('kraal', 'A <strong>factor</strong> divides into a number exactly, with nothing left over. Factors come in pairs that multiply to make the number.') +
      ex('Factors of 6 and 18', ['<span class="math">6 = 1 × 6 = 2 × 3</span>, so the factors of 6 are <strong>1, 2, 3, 6</strong>.', '<span class="math">18 = 1 × 18 = 2 × 9 = 3 × 6</span>, so the factors of 18 are <strong>1, 2, 3, 6, 9, 18</strong>.']) +
      def('Split to multiply', 'We can break a number into parts and multiply each part: <span class="math">5 × 7 = 5 × (4 + 3) = (5 × 4) + (5 × 3) = 20 + 15 = 35</span>. This is the <strong>distributive property</strong>.') +
      sim('s304', S.s304, L, m) + tip('Split into tens and units: <span class="math">6 × 13 = (6 × 10) + (6 × 3) = 60 + 18 = 78</span>.')
      : hero('kraal', '\'n <strong>Faktor</strong> deel presies in \'n getal in, met niks oor nie. Faktore kom in pare wat vermenigvuldig om die getal te maak.') +
      ex('Faktore van 6 en 18', ['<span class="math">6 = 1 × 6 = 2 × 3</span>, so die faktore van 6 is <strong>1, 2, 3, 6</strong>.', '<span class="math">18 = 1 × 18 = 2 × 9 = 3 × 6</span>, so die faktore van 18 is <strong>1, 2, 3, 6, 9, 18</strong>.']) +
      def('Breek op om te vermenigvuldig', 'Ons kan \'n getal in dele opbreek en elke deel vermenigvuldig: <span class="math">5 × 7 = 5 × (4 + 3) = (5 × 4) + (5 × 3) = 20 + 15 = 35</span>. Dit is die <strong>distributiewe eienskap</strong>.') +
      sim('s304', S.s304, L, m) + tip('Breek op in tiene en ene: <span class="math">6 × 13 = (6 × 10) + (6 × 3) = 60 + 18 = 78</span>.');
  },
  qs: [
    { en: 'What are the factors of 6?', af: 'Wat is die faktore van 6?', o: [['1, 2, 3, 6', '1, 6', '2, 3', '6, 12, 18'], ['1, 2, 3, 6', '1, 6', '2, 3', '6, 12, 18']], a: 0, lv: 'K', h: ['Which numbers divide into 6 exactly?', 'Watter getalle deel presies in 6 in?'], s: same('6 = 1 × 6 = 2 × 3') },
    { en: 'How many factors does 18 have?', af: 'Hoeveel faktore het 18?', a: '6', lv: 'R', h: ['Find the pairs: 1 × 18, 2 × 9, …', 'Kry die pare: 1 × 18, 2 × 9, …'], s: [['1, 2, 3, 6, 9, 18 → 6 factors'], ['1, 2, 3, 6, 9, 18 → 6 faktore']] },
    { en: 'Which number is NOT a factor of 24?', af: 'Watter getal is NIE \'n faktor van 24 nie?', o: [['3', '4', '5', '6'], ['3', '4', '5', '6']], a: 2, lv: 'R', h: ['Check each: does it divide 24 with nothing left over?', 'Toets elkeen: deel dit 24 met niks oor nie?'], s: [['3 × 8, 4 × 6 and 6 × 4 make 24.', '24 ends in 4, so 5 does not divide it exactly.'], ['3 × 8, 4 × 6 en 6 × 4 maak 24.', '24 eindig op 4, so 5 deel dit nie presies nie.']] },
    { en: '5 × 7 = (5 × 4) + (5 × ___)', af: '5 × 7 = (5 × 4) + (5 × ___)', a: '3', lv: 'R', h: ['4 + ? = 7', '4 + ? = 7'], s: same('7 = 4 + 3') },
    { en: '6 × 13 = (6 × 10) + (6 × 3) = ?', af: '6 × 13 = (6 × 10) + (6 × 3) = ?', a: '78', lv: 'R', h: ['Work out each bracket, then add.', 'Werk elke hakie uit en tel dan bymekaar.'], s: same('60 + 18 = 78') },
    { en: 'Which is the same as 8 × 9?', af: 'Watter een is dieselfde as 8 × 9?', o: [['8 × (5 + 4)', '8 + 5 + 4', '(8 × 5) + 4', '8 × 5 × 4'], ['8 × (5 + 4)', '8 + 5 + 4', '(8 × 5) + 4', '8 × 5 × 4']], a: 0, lv: 'C', h: ['Split the 9 into two parts, and multiply both parts by 8.', 'Breek die 9 in twee dele op en vermenigvuldig albei dele met 8.'], s: [['9 = 5 + 4, so 8 × 9 = 8 × (5 + 4) = 40 + 32 = 72.'], ['9 = 5 + 4, so 8 × 9 = 8 × (5 + 4) = 40 + 32 = 72.']] },
    { en: 'What is the biggest factor of 36, other than 36 itself?', af: 'Wat is die grootste faktor van 36, behalwe 36 self?', a: '18', lv: 'C', h: ['Pair it with the smallest factor bigger than 1.', 'Paar dit met die kleinste faktor groter as 1.'], s: same('36 = 2 × 18, so 18') },
    { en: 'Work out 7 × 12 by splitting 12 into 10 + 2.', af: 'Werk 7 × 12 uit deur 12 op te breek in 10 + 2.', a: '84', lv: 'R', h: ['(7 × 10) + (7 × 2)', '(7 × 10) + (7 × 2)'], s: same('70 + 14 = 84') }
  ],
  wb: { en: [{ t: 'List all the factors of:', p: ['12', '20', '30'], m: [2, 2, 2] }, { t: 'Use the distributive property to calculate:', p: ['4 × 17', '6 × 24'], m: [2, 2] }], af: [{ t: 'Lys al die faktore van:', p: ['12', '20', '30'], m: [2, 2, 2] }, { t: 'Gebruik die distributiewe eienskap om te bereken:', p: ['4 × 17', '6 × 24'], m: [2, 2] }],
        ans: [['1, 2, 3, 4, 6, 12', '', ''], ['1, 2, 4, 5, 10, 20', '', ''], ['1, 2, 3, 5, 6, 10, 15, 30', '', ''], ['(4 × 10) + (4 × 7) = 40 + 28 = 68', '', ''], ['(6 × 20) + (6 × 4) = 120 + 24 = 144', '', '']] }
});

/* ───────────── 305 Multiplication problems ───────────── */
T.push({
  id: 305, name: { en: 'Multiplication problems', af: 'Vermenigvuldigingsprobleme' }, full: { en: 'Solving multiplication problems', af: 'Vermenigvuldigingsprobleme oplos' },
  body: lang => {
    const en = lang === 'en';
    const P = en ? [
      { t: 'An egg box holds 6 eggs. How many eggs are in 8 boxes?', a: 48, w: ['8 × 6 = 48 eggs'], s: 'chicken' },
      { t: 'A school has 9 classrooms with 30 desks in each. How many desks are there?', a: 270, w: ['9 × 30 = 9 × 3 tens = 27 tens = 270 desks'], s: 'wooden-chair' },
      { t: 'A taxi carries 15 people. How many people do 4 full taxis carry?', a: 60, w: ['15 × 4 = (10 × 4) + (5 × 4) = 40 + 20 = 60 people'], s: 'car' },
      { t: 'Movie tickets cost R25 each. How much do 6 tickets cost? (Rand)', a: 150, w: ['25 × 6 = (20 × 6) + (5 × 6) = 120 + 30 = R150'], s: 'child' },
      { t: 'A farmer plants 8 rows of mealies with 12 plants in each row. How many plants is that?', a: 96, w: ['8 × 12 = (8 × 10) + (8 × 2) = 80 + 16 = 96 plants'], s: 'mealie' }
    ] : [
      { t: '\'n Eierdoos hou 6 eiers. Hoeveel eiers is in 8 dose?', a: 48, w: ['8 × 6 = 48 eiers'], s: 'chicken' },
      { t: '\'n Skool het 9 klaskamers met 30 banke in elkeen. Hoeveel banke is daar?', a: 270, w: ['9 × 30 = 9 × 3 tiene = 27 tiene = 270 banke'], s: 'wooden-chair' },
      { t: '\'n Taxi dra 15 mense. Hoeveel mense dra 4 vol taxi\'s?', a: 60, w: ['15 × 4 = (10 × 4) + (5 × 4) = 40 + 20 = 60 mense'], s: 'car' },
      { t: 'Fliekkaartjies kos R25 elk. Hoeveel kos 6 kaartjies? (Rand)', a: 150, w: ['25 × 6 = (20 × 6) + (5 × 6) = 120 + 30 = R150'], s: 'child' },
      { t: '\'n Boer plant 8 rye mielies met 12 plante in elke ry. Hoeveel plante is dit?', a: 96, w: ['8 × 12 = (8 × 10) + (8 × 2) = 80 + 16 = 96 plante'], s: 'mealie' }
    ];
    const L = en ? { problems: P, of: (a, b) => 'Problem ' + a + ' of ' + b, hint: 'Look for equal groups. How many groups, and how many in each?', yes: 'Correct!', no: 'Not yet. Here is how:', score: W.en.score }
      : { problems: P, of: (a, b) => 'Probleem ' + a + ' van ' + b, hint: 'Soek gelyke groepe. Hoeveel groepe, en hoeveel in elkeen?', yes: 'Reg!', no: 'Nog nie. So werk dit:', score: W.af.score };
    const m = `<h4>🎮 ${en ? 'Equal Groups' : 'Gelyke Groepe'}</h4><p class="how">${en ? 'Solve each problem. Then check your answer to see the steps.' : 'Los elke probleem op. Toets dan jou antwoord om die stappe te sien.'}</p><div class="score-pill" data-k="count" style="display:inline-block;margin-bottom:8px"></div><div class="g4-hero" data-k="card"></div><div class="g4-row"><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="answer"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="next">${W[lang].next}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('mealie', 'Multiplication problems have <strong>equal groups</strong>. Key words: <strong>multiply, product, altogether, total, each</strong>.') +
      ex('Two-step problem', ['30 desks in each of 9 classrooms and 25 desks in each of 8 classrooms. How many desks altogether?', '<span class="math">9 × 30 = 270</span>', '<span class="math">8 × 25 = 200</span>', '<span class="math">270 + 200 = 470</span> desks']) +
      ex('Product and difference', ['Which number is 38 less than the product of 17 and 4?', 'Product: <span class="math">17 × 4 = 68</span>', '38 less: <span class="math">68 − 38 = 30</span>']) +
      sim('s305', S.s305, L, m) + tip('Draw a quick picture of the groups if you are not sure what to do.')
      : hero('mealie', 'Vermenigvuldigingsprobleme het <strong>gelyke groepe</strong>. Sleutelwoorde: <strong>vermenigvuldig, produk, altesaam, totaal, elk</strong>.') +
      ex('Probleem met twee stappe', ['30 banke in elk van 9 klaskamers en 25 banke in elk van 8 klaskamers. Hoeveel banke altesaam?', '<span class="math">9 × 30 = 270</span>', '<span class="math">8 × 25 = 200</span>', '<span class="math">270 + 200 = 470</span> banke']) +
      ex('Produk en verskil', ['Watter getal is 38 minder as die produk van 17 en 4?', 'Produk: <span class="math">17 × 4 = 68</span>', '38 minder: <span class="math">68 − 38 = 30</span>']) +
      sim('s305', S.s305, L, m) + tip('Teken vinnig \'n prentjie van die groepe as jy nie seker is wat om te doen nie.');
  },
  qs: [
    { en: 'Which number is 38 less than the product of 17 and 4?', af: 'Watter getal is 38 minder as die produk van 17 en 4?', a: '30', lv: 'C', h: ['First multiply 17 × 4.', 'Vermenigvuldig eers 17 × 4.'], s: [['17 × 4 = 68', '68 − 38 = 30'], ['17 × 4 = 68', '68 − 38 = 30']] },
    { en: 'A school has 30 desks in each of 9 classrooms and 25 desks in each of 8 classrooms. How many desks are there altogether?', af: '\'n Skool het 30 banke in elk van 9 klaskamers en 25 banke in elk van 8 klaskamers. Hoeveel banke is daar altesaam?', a: '470', lv: 'P', h: ['Work out each group of classrooms, then add.', 'Werk elke groep klaskamers uit en tel dan bymekaar.'], s: same('9 × 30 = 270; 8 × 25 = 200; 270 + 200 = 470') },
    { en: 'An egg box holds 6 eggs. How many eggs are in 8 boxes?', af: '\'n Eierdoos hou 6 eiers. Hoeveel eiers is in 8 dose?', a: '48', lv: 'R', h: ['8 groups of 6.', '8 groepe van 6.'], s: same('8 × 6 = 48') },
    { en: 'Tickets cost R15 each. How much do 6 tickets cost? (Rand)', af: 'Kaartjies kos R15 elk. Hoeveel kos 6 kaartjies? (Rand)', a: '90', lv: 'R', h: ['(10 × 6) + (5 × 6)', '(10 × 6) + (5 × 6)'], s: same('60 + 30 = R90') },
    { en: 'Which word tells you to multiply?', af: 'Watter woord sê vir jou om te vermenigvuldig?', o: [['difference', 'product', 'left', 'less'], ['verskil', 'produk', 'oor', 'minder']], a: 1, lv: 'K', h: ['Which word means the answer of a multiplication?', 'Watter woord beteken die antwoord van \'n vermenigvuldiging?'], s: [['The product is the answer when you multiply.'], ['Die produk is die antwoord as jy vermenigvuldig.']] },
    { en: 'A taxi carries 15 people. How many people do 4 full taxis carry?', af: '\'n Taxi dra 15 mense. Hoeveel mense dra 4 vol taxi\'s?', a: '60', lv: 'R', h: ['4 groups of 15.', '4 groepe van 15.'], s: same('15 × 4 = 60') },
    { en: 'There are 7 days in a week. How many days are there in 9 weeks?', af: 'Daar is 7 dae in \'n week. Hoeveel dae is daar in 9 weke?', a: '63', lv: 'R', h: ['9 × 7', '9 × 7'], s: same('9 × 7 = 63') },
    { en: 'Pencils cost R4 each. Thabo buys 12 pencils and pays with R50. How much change does he get? (Rand)', af: 'Potlode kos R4 elk. Thabo koop 12 potlode en betaal met R50. Hoeveel kleingeld kry hy? (Rand)', a: '2', lv: 'P', h: ['First find the cost of 12 pencils.', 'Kry eers die prys van 12 potlode.'], s: same('12 × 4 = R48; 50 − 48 = R2') }
  ],
  wb: { en: [{ t: 'Solve. Show your working.', p: ['There are 24 learners in each of 4 classes. How many learners are there?', 'A box holds 9 apples. How many apples are in 7 boxes, and how many more are needed to make 70?', 'Which number is 25 more than the product of 8 and 6?'], m: [2, 3, 2] }],
        af: [{ t: 'Los op. Wys jou bewerkings.', p: ['Daar is 24 leerders in elk van 4 klasse. Hoeveel leerders is daar?', '\'n Boks hou 9 appels. Hoeveel appels is in 7 bokse, en hoeveel meer is nodig om 70 te maak?', 'Watter getal is 25 meer as die produk van 8 en 6?'], m: [2, 3, 2] }],
        ans: [['24 × 4 = 96 learners', '(20 × 4) + (4 × 4)', '(20 × 4) + (4 × 4)'], ['7 × 9 = 63; 70 − 63 = 7 more', '', ''], ['8 × 6 = 48; 48 + 25 = 73', '', '']] }
});

writeChapter(3, { en: 'Multiplication, Multiples and Factors', af: 'Vermenigvuldiging, Veelvoude en Faktore' }, T, process.argv[2] || OUT_DEFAULT);
