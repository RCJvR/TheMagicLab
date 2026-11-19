// Grade 4 Math Magician, Chapter 4: Multiplication and division (one bilingual source).
// Run: node scripts/math-gr4/gen_ch4.js   (writes math-magician/gr4/ch4.js, ch4.af.js, ch4.help.js)
const { ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT } = require('./lib.js');
const S = require('./sims_ch4.js');
const T = [];
const same = s => [[s], [s]];
const stepper = k => `<button class="g4-btn ghost" data-s="${k}:-1">−</button><span class="g4-big" data-k="${k}" style="min-width:48px;text-align:center"></span><button class="g4-btn ghost" data-s="${k}:1">+</button>`;

/* ───────────── 401 Dividing ───────────── */
T.push({
  id: 401, name: { en: 'Dividing', af: 'Deel' }, full: { en: 'Dividing with the times tables', af: 'Deel met die maaltafels' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { rem: 'remainder', left: r => r + ' left', jumps: (k, d, r) => 'Jump back in ' + d + 's: ' + k + ' jumps' + (r ? ', and ' + r + ' is left over.' : ' land exactly on 0.'), check: (d, k, r, n) => 'Check: ' + d + ' × ' + k + (r ? ' + ' + r : '') + ' = ' + n }
      : { rem: 'res', left: r => r + ' oor', jumps: (k, d, r) => 'Spring terug in ' + d + '\'e: ' + k + ' spronge' + (r ? ', en ' + r + ' bly oor.' : ' land presies op 0.'), check: (d, k, r, n) => 'Toets: ' + d + ' × ' + k + (r ? ' + ' + r : '') + ' = ' + n };
    const m = `<h4>🎮 ${en ? 'Jump Back' : 'Spring Terug'}</h4><p class="how">${en ? 'Choose a number and what to divide by. Watch the jumps go back to 0. Anything that does not make a full jump is the remainder.' : 'Kies \'n getal en waardeur om te deel. Kyk hoe die spronge terug gaan na 0. Wat nie \'n volle sprong maak nie, is die res.'}</p><div class="g4-row">${stepper('n')}<span class="g4-big">÷</span>${stepper('d')}</div><div class="g4-stage"><svg viewBox="0 0 640 150" data-k="svg" role="img" aria-label="number line"></svg></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('pap-bowl', '<strong>Dividing</strong> means sharing equally or making equal groups. We use our times tables to divide: <span class="math">72 ÷ 9 = 8</span> because <span class="math">9 × 8 = 72</span>.') +
      def('Remainders', 'Sometimes a number does not divide exactly. What is left over is the <strong>remainder</strong>: <span class="math">74 ÷ 9 = 8 remainder 2</span>, because <span class="math">9 × 8 = 72</span> and 2 is left.') +
      ex('Division as jumping back', ['<span class="math">8 − 2 − 2 − 2 − 2 = 0</span>', 'That is 4 jumps of 2, so <span class="math">8 ÷ 2 = 4</span>.', 'Order matters: <span class="math">125 ÷ 5</span> is not the same as <span class="math">5 ÷ 125</span>.']) +
      sim('s401', S.s401, L, m) + tip('Your tables work for bigger numbers too: <span class="math">132 ÷ 12 = 11</span> because <span class="math">12 × 11 = 132</span>.')
      : hero('pap-bowl', '<strong>Deel</strong> beteken om eweredig te verdeel of gelyke groepe te maak. Ons gebruik ons maaltafels om te deel: <span class="math">72 ÷ 9 = 8</span> want <span class="math">9 × 8 = 72</span>.') +
      def('Resse', 'Soms deel \'n getal nie presies nie. Wat oorbly, is die <strong>res</strong>: <span class="math">74 ÷ 9 = 8 res 2</span>, want <span class="math">9 × 8 = 72</span> en 2 bly oor.') +
      ex('Deel as terugspring', ['<span class="math">8 − 2 − 2 − 2 − 2 = 0</span>', 'Dit is 4 spronge van 2, so <span class="math">8 ÷ 2 = 4</span>.', 'Die volgorde maak saak: <span class="math">125 ÷ 5</span> is nie dieselfde as <span class="math">5 ÷ 125</span> nie.']) +
      sim('s401', S.s401, L, m) + tip('Jou tafels werk ook vir groter getalle: <span class="math">132 ÷ 12 = 11</span> want <span class="math">12 × 11 = 132</span>.');
  },
  qs: [
    { en: '72 ÷ 9 = ?', af: '72 ÷ 9 = ?', a: '8', lv: 'K', h: ['9 × ? = 72', '9 × ? = 72'], s: same('9 × 8 = 72, so 72 ÷ 9 = 8') },
    { en: '74 ÷ 9 = ?', af: '74 ÷ 9 = ?', o: [['8 remainder 2', '8', '9 remainder 2', '7 remainder 11'], ['8 res 2', '8', '9 res 2', '7 res 11']], a: 0, lv: 'R', h: ['Which multiple of 9 is just below 74?', 'Watter veelvoud van 9 is net onder 74?'], s: [['9 × 8 = 72', '74 − 72 = 2 left over'], ['9 × 8 = 72', '74 − 72 = 2 bly oor']] },
    { en: '132 ÷ 12 = ?', af: '132 ÷ 12 = ?', a: '11', lv: 'R', h: ['12 × 11 = ?', '12 × 11 = ?'], s: same('12 × 11 = 132') },
    { en: 'Can we swap the numbers in a division? Is 125 ÷ 5 the same as 5 ÷ 125?', af: 'Kan ons die getalle in \'n deelsom omruil? Is 125 ÷ 5 dieselfde as 5 ÷ 125?', o: [['Yes', 'No'], ['Ja', 'Nee']], a: 1, lv: 'K', h: ['Share 125 sweets among 5, or 5 sweets among 125?', 'Deel 125 lekkers tussen 5, of 5 lekkers tussen 125?'], s: [['125 ÷ 5 = 25, but 5 ÷ 125 is much less than 1.', 'Order matters in division.'], ['125 ÷ 5 = 25, maar 5 ÷ 125 is baie minder as 1.', 'Die volgorde maak saak by deel.']] },
    { en: '8 − 2 − 2 − 2 − 2 = 0. So 8 ÷ 2 = ?', af: '8 − 2 − 2 − 2 − 2 = 0. So 8 ÷ 2 = ?', a: '4', lv: 'K', h: ['Count the 2s you took away.', 'Tel die 2\'e wat jy afgetrek het.'], s: [['4 jumps of 2 → 8 ÷ 2 = 4'], ['4 spronge van 2 → 8 ÷ 2 = 4']] },
    { en: '56 ÷ 7 = ?', af: '56 ÷ 7 = ?', a: '8', lv: 'K', h: ['7 × ? = 56', '7 × ? = 56'], s: same('7 × 8 = 56') },
    { en: '45 ÷ 6 = 7 remainder ___', af: '45 ÷ 6 = 7 res ___', a: '3', lv: 'R', h: ['6 × 7 = 42', '6 × 7 = 42'], s: same('45 − 42 = 3') },
    { en: '90 ÷ 10 = ?', af: '90 ÷ 10 = ?', a: '9', lv: 'K', h: ['10 × ? = 90', '10 × ? = 90'], s: same('10 × 9 = 90') }
  ],
  wb: { en: [{ t: 'Calculate. Give the remainder if there is one.', p: ['63 ÷ 7', '58 ÷ 6', '96 ÷ 8', '100 ÷ 9'], m: [1, 2, 1, 2] }], af: [{ t: 'Bereken. Gee die res as daar een is.', p: ['63 ÷ 7', '58 ÷ 6', '96 ÷ 8', '100 ÷ 9'], m: [1, 2, 1, 2] }],
        ans: [['9', '', ''], ['9 remainder 4', '6 × 9 = 54', '6 × 9 = 54'], ['12', '', ''], ['11 remainder 1', '9 × 11 = 99', '9 × 11 = 99']] }
});

/* ───────────── 402 Halving, even and odd ───────────── */
T.push({
  id: 402, name: { en: 'Halving, even and odd', af: 'Halveer, ewe en onewe' }, full: { en: 'Halving numbers, even and odd numbers', af: 'Getalle halveer, ewe en onewe getalle' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { half: (v, h) => 'Half of ' + v + ' = ' + v + ' ÷ 2 = ' + h, halfParts: (p, h) => 'Break it down: half of ' + p.join(' + ') + ' = ' + h.join(' + '), halfOdd: (v, h) => v + ' ÷ 2 = ' + h + ' remainder 1', even: v => v + ' is <b>even</b>: it divides exactly by 2.', odd: v => v + ' is <b>odd</b>: dividing by 2 leaves a remainder of 1.', pairsEven: 'Every dot has a partner.', pairsOdd: 'One dot (yellow) has no partner.' }
      : { half: (v, h) => 'Die helfte van ' + v + ' = ' + v + ' ÷ 2 = ' + h, halfParts: (p, h) => 'Breek dit op: die helfte van ' + p.join(' + ') + ' = ' + h.join(' + '), halfOdd: (v, h) => v + ' ÷ 2 = ' + h + ' res 1', even: v => v + ' is <b>ewe</b>: dit deel presies deur 2.', odd: v => v + ' is <b>onewe</b>: as ons deur 2 deel, bly 1 oor.', pairsEven: 'Elke kolletjie het \'n maat.', pairsOdd: 'Een kolletjie (geel) het geen maat nie.' };
    const m = `<h4>🎮 ${en ? 'Halving Machine' : 'Halveermasjien'}</h4><p class="how">${en ? 'Type a number (or tap one). The machine halves it and tells you if it is even or odd. Small numbers are shown as pairs of dots.' : 'Tik \'n getal (of tik op een). Die masjien halveer dit en sê of dit ewe of onewe is. Klein getalle word as pare kolletjies gewys.'}</p><div class="g4-row"><input class="g4-input" data-k="n" value="94" inputmode="numeric" aria-label="number">${[8, 15, 94, 216, 377].map(v => `<button class="g4-btn ghost" data-v="${v}">${v}</button>`).join('')}</div><div class="g4-stage"><svg data-k="svg" role="img" aria-label="pairs"></svg></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('apple', '<strong>Halving</strong> means dividing by 2, or sharing into 2 equal parts. Half of 8 is 4.') +
      ex('Halve by breaking down', ['Half of 94: half of 90 is 45 and half of 4 is 2, so <strong>47</strong>.', 'Half of 216: half of 200 is 100 and half of 16 is 8, so <strong>108</strong>.']) +
      def('Even and odd', '<strong>Even</strong> numbers divide exactly by 2: 376 is even. <strong>Odd</strong> numbers leave a remainder of 1: 377 is odd. Look at the last digit!') +
      sim('s402', S.s402, L, m) + tip('The even numbers between 237 and 251 are 238, 240, 242, 244, 246, 248 and 250.')
      : hero('apple', '<strong>Halveer</strong> beteken deel deur 2, of verdeel in 2 gelyke dele. Die helfte van 8 is 4.') +
      ex('Halveer deur op te breek', ['Die helfte van 94: die helfte van 90 is 45 en die helfte van 4 is 2, so <strong>47</strong>.', 'Die helfte van 216: die helfte van 200 is 100 en die helfte van 16 is 8, so <strong>108</strong>.']) +
      def('Ewe en onewe', '<strong>Ewe</strong> getalle deel presies deur 2: 376 is ewe. <strong>Onewe</strong> getalle laat \'n res van 1: 377 is onewe. Kyk na die laaste syfer!') +
      sim('s402', S.s402, L, m) + tip('Die ewe getalle tussen 237 en 251 is 238, 240, 242, 244, 246, 248 en 250.');
  },
  qs: [
    { en: 'What is half of 94?', af: 'Wat is die helfte van 94?', a: '47', lv: 'R', h: ['Half of 90, plus half of 4.', 'Die helfte van 90, plus die helfte van 4.'], s: same('45 + 2 = 47') },
    { en: 'What is half of 216?', af: 'Wat is die helfte van 216?', a: '108', lv: 'R', h: ['Half of 200, plus half of 16.', 'Die helfte van 200, plus die helfte van 16.'], s: same('100 + 8 = 108') },
    { en: 'Which number is odd?', af: 'Watter getal is onewe?', o: [['376', '377', '378', '380'], ['376', '377', '378', '380']], a: 1, lv: 'K', h: ['Look at the last digit.', 'Kyk na die laaste syfer.'], s: [['377 ends in 7, which is odd.'], ['377 eindig op 7, wat onewe is.']] },
    { en: 'What is half of 8?', af: 'Wat is die helfte van 8?', a: '4', lv: 'K', h: ['8 ÷ 2', '8 ÷ 2'], s: same('8 ÷ 2 = 4') },
    { en: 'Which are the even numbers between 237 and 241?', af: 'Watter is die ewe getalle tussen 237 en 241?', o: [['238; 240', '237; 239; 241', '238; 239; 240', '240 only'], ['238; 240', '237; 239; 241', '238; 239; 240', 'net 240']], a: 0, lv: 'R', h: ['Even numbers end in 0, 2, 4, 6 or 8.', 'Ewe getalle eindig op 0, 2, 4, 6 of 8.'], s: [['238 and 240'], ['238 en 240']] },
    { en: 'What is half of 150?', af: 'Wat is die helfte van 150?', a: '75', lv: 'R', h: ['Half of 100, plus half of 50.', 'Die helfte van 100, plus die helfte van 50.'], s: same('50 + 25 = 75') },
    { en: 'When you divide an odd number by 2, the remainder is…', af: 'As jy \'n onewe getal deur 2 deel, is die res…', o: [['0', '1', '2', '3'], ['0', '1', '2', '3']], a: 1, lv: 'K', h: ['One is always left without a partner.', 'Een bly altyd sonder \'n maat.'], s: [['Odd numbers leave a remainder of 1.'], ['Onewe getalle laat \'n res van 1.']] },
    { en: 'What is half of 538?', af: 'Wat is die helfte van 538?', a: '269', lv: 'C', h: ['Half of 500, half of 38.', 'Die helfte van 500, die helfte van 38.'], s: same('250 + 19 = 269') }
  ],
  wb: { en: [{ t: 'Halve each number:', p: ['64', '138', '452'], m: [1, 1, 2] }, { t: 'Write down all the odd numbers between 160 and 172.', p: [''], m: [2] }], af: [{ t: 'Halveer elke getal:', p: ['64', '138', '452'], m: [1, 1, 2] }, { t: 'Skryf al die onewe getalle tussen 160 en 172 neer.', p: [''], m: [2] }],
        ans: [['32', '', ''], ['69', '', ''], ['226', '200 + 26', '200 + 26'], ['161; 163; 165; 167; 169; 171', '', '']] }
});

/* ───────────── 403 Dividing bigger numbers ───────────── */
T.push({
  id: 403, name: { en: 'Dividing bigger numbers', af: 'Groter getalle deel' }, full: { en: 'Dividing 3-digit numbers by 1-digit numbers', af: '3-syfergetalle deur 1-syfergetalle deel' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { take: (d, m, p, from, left) => 'Take away ' + d + ' × ' + m + ' = ' + p + ' → ' + from + ' − ' + p + ' = <b>' + left + '</b>', add: (parts, t) => 'Add up the groups: ' + parts + ' = <b>' + t + '</b>', tryFirst: 'Try it first, then tap Next step to see the breakdown.', right: (q, d, n) => 'Correct! Check: ' + q + ' × ' + d + ' = ' + n, wrong: 'Not yet. Tap Next step for help.' }
      : { take: (d, m, p, from, left) => 'Trek af ' + d + ' × ' + m + ' = ' + p + ' → ' + from + ' − ' + p + ' = <b>' + left + '</b>', add: (parts, t) => 'Tel die groepe bymekaar: ' + parts + ' = <b>' + t + '</b>', tryFirst: 'Probeer dit eers en tik dan op Volgende stap om die opbreking te sien.', right: (q, d, n) => 'Reg! Toets: ' + q + ' × ' + d + ' = ' + n, wrong: 'Nog nie. Tik op Volgende stap vir hulp.' };
    const m = `<h4>🎮 ${en ? 'Break-it-down Divider' : 'Breek-dit-op-deler'}</h4><p class="how">${en ? 'Work it out first and type your answer. Then see how to take away big groups until nothing is left.' : 'Werk dit eers uit en tik jou antwoord. Sien dan hoe om groot groepe af te trek totdat niks oorbly nie.'}</p><div class="g4-big" data-k="sum"></div><div class="g4-row"><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="answer"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="next">${en ? 'Next step' : 'Volgende stap'}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><ul class="g4-steps" data-k="steps"></ul><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('bread-loaf', 'To divide a big number, <strong>break it into parts</strong> that are easy to divide, like multiples of 10 times the number you divide by.') +
      ex('192 ÷ 8', ['Write 192 as multiples of 8: <span class="math">192 = 160 + 32</span>', '<span class="math">160 ÷ 8 = 20</span>', '<span class="math">32 ÷ 8 = 4</span>', 'So <span class="math">192 ÷ 8 = 20 + 4 = 24</span>. Check: <span class="math">24 × 8 = 192</span> ✓']) +
      sim('s403', S.s403, L, m) + tip('Estimate first: <span class="math">298 ÷ 3</span> is about <span class="math">300 ÷ 3 = 100</span>.')
      : hero('bread-loaf', 'Om \'n groot getal te deel, <strong>breek dit op in dele</strong> wat maklik is om te deel, soos veelvoude van 10 keer die getal waardeur jy deel.') +
      ex('192 ÷ 8', ['Skryf 192 as veelvoude van 8: <span class="math">192 = 160 + 32</span>', '<span class="math">160 ÷ 8 = 20</span>', '<span class="math">32 ÷ 8 = 4</span>', 'So <span class="math">192 ÷ 8 = 20 + 4 = 24</span>. Toets: <span class="math">24 × 8 = 192</span> ✓']) +
      sim('s403', S.s403, L, m) + tip('Skat eers: <span class="math">298 ÷ 3</span> is omtrent <span class="math">300 ÷ 3 = 100</span>.');
  },
  qs: [
    { en: '192 ÷ 8 = ?', af: '192 ÷ 8 = ?', a: '24', lv: 'R', h: ['192 = 160 + 32', '192 = 160 + 32'], s: same('160 ÷ 8 = 20; 32 ÷ 8 = 4; 20 + 4 = 24') },
    { en: '96 ÷ 4 = ?', af: '96 ÷ 4 = ?', a: '24', lv: 'R', h: ['96 = 80 + 16', '96 = 80 + 16'], s: same('80 ÷ 4 = 20; 16 ÷ 4 = 4; 24') },
    { en: '135 ÷ 5 = ?', af: '135 ÷ 5 = ?', a: '27', lv: 'R', h: ['135 = 100 + 35', '135 = 100 + 35'], s: same('100 ÷ 5 = 20; 35 ÷ 5 = 7; 27') },
    { en: '192 = 160 + 32. 160 ÷ 8 = 20 and 32 ÷ 8 = 4. So 192 ÷ 8 = ?', af: '192 = 160 + 32. 160 ÷ 8 = 20 en 32 ÷ 8 = 4. So 192 ÷ 8 = ?', o: [['24', '20', '4', '28'], ['24', '20', '4', '28']], a: 0, lv: 'K', h: ['Add the two answers.', 'Tel die twee antwoorde bymekaar.'], s: same('20 + 4 = 24') },
    { en: '252 ÷ 6 = ?', af: '252 ÷ 6 = ?', a: '42', lv: 'C', h: ['252 = 240 + 12', '252 = 240 + 12'], s: same('240 ÷ 6 = 40; 12 ÷ 6 = 2; 42') },
    { en: '168 ÷ 7 = ?', af: '168 ÷ 7 = ?', a: '24', lv: 'C', h: ['168 = 140 + 28', '168 = 140 + 28'], s: same('140 ÷ 7 = 20; 28 ÷ 7 = 4; 24') },
    { en: 'What is the best estimate for 298 ÷ 3?', af: 'Wat is die beste skatting vir 298 ÷ 3?', o: [['about 10', 'about 100', 'about 1 000', 'about 300'], ['omtrent 10', 'omtrent 100', 'omtrent 1 000', 'omtrent 300']], a: 1, lv: 'R', h: ['Round 298 to 300.', 'Rond 298 af na 300.'], s: same('300 ÷ 3 = 100') },
    { en: '455 ÷ 5 = ?', af: '455 ÷ 5 = ?', a: '91', lv: 'C', h: ['455 = 450 + 5', '455 = 450 + 5'], s: same('450 ÷ 5 = 90; 5 ÷ 5 = 1; 91') }
  ],
  wb: { en: [{ t: 'Calculate by breaking down. Check each answer by multiplying.', p: ['144 ÷ 6', '235 ÷ 5', '312 ÷ 8'], m: [3, 3, 3] }], af: [{ t: 'Bereken deur op te breek. Toets elke antwoord deur te vermenigvuldig.', p: ['144 ÷ 6', '235 ÷ 5', '312 ÷ 8'], m: [3, 3, 3] }],
        ans: [['24', '120 + 24; 20 + 4', '120 + 24; 20 + 4'], ['47', '200 + 35; 40 + 7', '200 + 35; 40 + 7'], ['39', '240 + 72; 30 + 9', '240 + 72; 30 + 9']] }
});

/* ───────────── 404 × and ÷ undo each other ───────────── */
T.push({
  id: 404, name: { en: 'Multiplication and division', af: 'Vermenigvuldiging en deling' }, full: { en: 'Multiplication and division undo each other', af: 'Vermenigvuldiging en deling maak mekaar ongedaan' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { check: 'Check', explain: 'Multiplication and division undo each other. One fact gives you four!', fill: 'Fill in the missing number.', right: 'Correct! Division undoes multiplication.', wrong: 'Not yet. Look at the multiplication fact at the top.' }
      : { check: 'Toets', explain: 'Vermenigvuldiging en deling maak mekaar ongedaan. Een feit gee jou vier!', fill: 'Vul die ontbrekende getal in.', right: 'Reg! Deling maak vermenigvuldiging ongedaan.', wrong: 'Nog nie. Kyk na die vermenigvuldigingsfeit bo.' };
    const m = `<h4>🎮 ${en ? 'Times-and-Share Triangle' : 'Maal-en-deel-driehoek'}</h4><p class="how">${en ? 'Change the two numbers at the bottom and see the whole family. Tap Quiz me to find a missing number.' : 'Verander die twee getalle onder en sien die hele familie. Tik op Toets my om \'n ontbrekende getal te vind.'}</p><div class="g4-row"><input class="g4-input" data-k="a" value="9" inputmode="numeric" aria-label="first number"><span class="g4-big">×</span><input class="g4-input" data-k="b" value="47" inputmode="numeric" aria-label="second number"><button class="g4-btn ghost" data-k="quiz">${en ? 'Quiz me' : 'Toets my'}</button></div><div class="g4-stage"><svg viewBox="0 0 640 200" data-k="svg" role="img" aria-label="fact family"></svg></div><ul class="g4-steps" data-k="facts"></ul><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('scales', 'Multiplication and division are opposites: one <strong>undoes</strong> the other.') +
      def('The converse relationship', 'If <span class="math">47 × 9 = 423</span>, then <span class="math">423 ÷ 47 = 9</span> and <span class="math">423 ÷ 9 = 47</span>.') +
      ex('Use it to check and to find missing numbers', ['Check <span class="math">192 ÷ 8 = 24</span>: work out <span class="math">24 × 8 = 192</span> ✓', 'The product of two numbers is 405. One number is 9. The other is <span class="math">405 ÷ 9 = 45</span>.', '<span class="math">___ × 7 = 84</span>: work out <span class="math">84 ÷ 7 = 12</span>.']) +
      sim('s404', S.s404, L, m) + tip('If you know <span class="math">25 × 4 = 100</span>, you also know <span class="math">100 ÷ 4 = 25</span> and <span class="math">100 ÷ 25 = 4</span>.')
      : hero('scales', 'Vermenigvuldiging en deling is teenoorgesteldes: een <strong>maak die ander ongedaan</strong>.') +
      def('Die omgekeerde verband', 'As <span class="math">47 × 9 = 423</span>, dan is <span class="math">423 ÷ 47 = 9</span> en <span class="math">423 ÷ 9 = 47</span>.') +
      ex('Gebruik dit om te toets en om ontbrekende getalle te vind', ['Toets <span class="math">192 ÷ 8 = 24</span>: werk <span class="math">24 × 8 = 192</span> uit ✓', 'Die produk van twee getalle is 405. Een getal is 9. Die ander is <span class="math">405 ÷ 9 = 45</span>.', '<span class="math">___ × 7 = 84</span>: werk <span class="math">84 ÷ 7 = 12</span> uit.']) +
      sim('s404', S.s404, L, m) + tip('As jy weet <span class="math">25 × 4 = 100</span>, weet jy ook <span class="math">100 ÷ 4 = 25</span> en <span class="math">100 ÷ 25 = 4</span>.');
  },
  qs: [
    { en: 'If 47 × 9 = 423, then 423 ÷ 9 = ?', af: 'As 47 × 9 = 423, dan is 423 ÷ 9 = ?', o: [['47', '9', '423', '432'], ['47', '9', '423', '432']], a: 0, lv: 'K', h: ['Division undoes multiplication.', 'Deling maak vermenigvuldiging ongedaan.'], s: same('423 ÷ 9 = 47') },
    { en: 'If 6 × 8 = 48, then 48 ÷ 6 = ?', af: 'As 6 × 8 = 48, dan is 48 ÷ 6 = ?', a: '8', lv: 'K', h: ['Use the fact you are given.', 'Gebruik die feit wat jy kry.'], s: same('48 ÷ 6 = 8') },
    { en: 'Which fact belongs to the family of 7 × 9 = 63?', af: 'Watter feit hoort by die familie van 7 × 9 = 63?', o: [['63 ÷ 7 = 9', '63 − 7 = 9', '9 ÷ 63 = 7', '7 + 9 = 63'], ['63 ÷ 7 = 9', '63 − 7 = 9', '9 ÷ 63 = 7', '7 + 9 = 63']], a: 0, lv: 'R', h: ['Start with the product, 63.', 'Begin met die produk, 63.'], s: [['63 ÷ 7 = 9 and 63 ÷ 9 = 7'], ['63 ÷ 7 = 9 en 63 ÷ 9 = 7']] },
    { en: 'The product of two numbers is 405. One number is 9. What is the other number?', af: 'Die produk van twee getalle is 405. Een getal is 9. Wat is die ander getal?', a: '45', lv: 'C', h: ['405 ÷ 9', '405 ÷ 9'], s: same('405 = 360 + 45; 40 + 5 = 45') },
    { en: '___ × 7 = 84', af: '___ × 7 = 84', a: '12', lv: 'R', h: ['84 ÷ 7', '84 ÷ 7'], s: same('7 × 12 = 84') },
    { en: 'Check 192 ÷ 8 = 24 by multiplying: 24 × 8 = ?', af: 'Toets 192 ÷ 8 = 24 deur te vermenigvuldig: 24 × 8 = ?', a: '192', lv: 'R', h: ['(20 × 8) + (4 × 8)', '(20 × 8) + (4 × 8)'], s: same('160 + 32 = 192') },
    { en: '360 ÷ ___ = 40', af: '360 ÷ ___ = 40', a: '9', lv: 'C', h: ['40 × ? = 360', '40 × ? = 360'], s: same('40 × 9 = 360') },
    { en: '25 × 4 = 100. So 100 ÷ 25 = ?', af: '25 × 4 = 100. So 100 ÷ 25 = ?', o: [['4', '25', '100', '75'], ['4', '25', '100', '75']], a: 0, lv: 'K', h: ['Use the multiplication fact.', 'Gebruik die vermenigvuldigingsfeit.'], s: same('100 ÷ 25 = 4') }
  ],
  wb: { en: [{ t: 'Write the four facts in the family of 8 × 12 = 96.', p: [''], m: [4] }, { t: 'Find the missing number:', p: ['___ × 6 = 72', '135 ÷ ___ = 27'], m: [2, 2] }], af: [{ t: 'Skryf die vier feite in die familie van 8 × 12 = 96.', p: [''], m: [4] }, { t: 'Vind die ontbrekende getal:', p: ['___ × 6 = 72', '135 ÷ ___ = 27'], m: [2, 2] }],
        ans: [['8 × 12 = 96; 12 × 8 = 96; 96 ÷ 8 = 12; 96 ÷ 12 = 8', '', ''], ['12', '72 ÷ 6', '72 ÷ 6'], ['5', '27 × 5 = 135', '27 × 5 = 135']] }
});

/* ───────────── 405 Sharing problems ───────────── */
T.push({
  id: 405, name: { en: 'Sharing problems', af: 'Deelprobleme' }, full: { en: 'Solving division problems', af: 'Deelprobleme oplos' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { rem: 'remainder', dealing: (e, l) => 'Each group has ' + e + ' so far. ' + l + ' still to share.', result: (q, r) => 'Each group gets <b>' + q + '</b>' + (r ? ', and <b>' + r + '</b> ' + (r === 1 ? 'is' : 'are') + ' left over (the yellow ones).' : ', with nothing left over.') }
      : { rem: 'res', dealing: (e, l) => 'Elke groep het tot dusver ' + e + '. ' + l + ' moet nog verdeel word.', result: (q, r) => 'Elke groep kry <b>' + q + '</b>' + (r ? ', en <b>' + r + '</b> bly oor (die geel kolletjies).' : ', met niks oor nie.') };
    const m = `<h4>🎮 ${en ? 'Fair Share' : 'Regverdige Deel'}</h4><p class="how">${en ? 'Choose how many sweets and how many children. Tap Deal one round to give each child one more, until there are not enough to go around.' : 'Kies hoeveel lekkers en hoeveel kinders. Tik op Deel een rondte om elke kind nog een te gee, totdat daar nie genoeg is vir almal nie.'}</p><div class="g4-row">${stepper('n')}<span class="g4-big">÷</span>${stepper('k')}</div><div class="g4-stage"><svg viewBox="0 0 640 250" data-k="svg" role="img" aria-label="sharing"></svg></div><div class="g4-row"><button class="g4-btn" data-k="deal">${en ? 'Deal one round' : 'Deel een rondte'}</button><button class="g4-btn ghost" data-k="all">${en ? 'Deal all' : 'Deel alles'}</button><button class="g4-btn ghost" data-k="reset">${en ? 'Start again' : 'Begin oor'}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('child', 'Division problems are about <strong>sharing equally</strong> or making <strong>equal groups</strong>. Key words: <strong>each, share equally, per group, per packet</strong>.') +
      ex('Sharing with a remainder', ['580 apples are shared equally between 18 people.', '<span class="math">18 × 30 = 540</span>, and <span class="math">580 − 540 = 40</span>.', '<span class="math">18 × 2 = 36</span>, and <span class="math">40 − 36 = 4</span>.', 'Each person gets <strong>32</strong> apples, and <strong>4</strong> are left over.']) +
      sim('s405', S.s405, L, m) + tip('Think about what the remainder means. If 245 eggs go into boxes of 6, there are 40 full boxes and 5 eggs over, so you need <strong>41</strong> boxes to hold them all.')
      : hero('child', 'Deelprobleme gaan oor <strong>eweredig verdeel</strong> of <strong>gelyke groepe</strong> maak. Sleutelwoorde: <strong>elk, eweredig verdeel, per groep, per pakkie</strong>.') +
      ex('Deel met \'n res', ['580 appels word eweredig tussen 18 mense verdeel.', '<span class="math">18 × 30 = 540</span>, en <span class="math">580 − 540 = 40</span>.', '<span class="math">18 × 2 = 36</span>, en <span class="math">40 − 36 = 4</span>.', 'Elke persoon kry <strong>32</strong> appels, en <strong>4</strong> bly oor.']) +
      sim('s405', S.s405, L, m) + tip('Dink na oor wat die res beteken. As 245 eiers in bokse van 6 gaan, is daar 40 vol bokse en 5 eiers oor, so jy het <strong>41</strong> bokse nodig om almal te hou.');
  },
  qs: [
    { en: '580 apples are shared equally between 18 people. How many apples does each person get?', af: '580 appels word eweredig tussen 18 mense verdeel. Hoeveel appels kry elke persoon?', a: '32', lv: 'P', h: ['Start with 18 × 30.', 'Begin met 18 × 30.'], s: same('18 × 30 = 540; 18 × 2 = 36; 30 + 2 = 32') },
    { en: '580 apples are shared equally between 18 people. How many apples are left over?', af: '580 appels word eweredig tussen 18 mense verdeel. Hoeveel appels bly oor?', a: '4', lv: 'P', h: ['18 × 32 = 576', '18 × 32 = 576'], s: same('580 − 576 = 4') },
    { en: '96 learners make teams of 8. How many teams are there?', af: '96 leerders maak spanne van 8. Hoeveel spanne is daar?', a: '12', lv: 'R', h: ['96 ÷ 8', '96 ÷ 8'], s: same('8 × 12 = 96') },
    { en: 'Five friends share R135 equally. How much does each friend get? (Rand)', af: 'Vyf vriende verdeel R135 eweredig. Hoeveel kry elke vriend? (Rand)', a: '27', lv: 'R', h: ['135 ÷ 5', '135 ÷ 5'], s: same('100 ÷ 5 = 20; 35 ÷ 5 = 7; R27') },
    { en: 'Which words tell you to divide?', af: 'Watter woorde sê vir jou om te deel?', o: [['altogether', 'share equally', 'more than', 'product'], ['altesaam', 'eweredig verdeel', 'meer as', 'produk']], a: 1, lv: 'K', h: ['Which words are about sharing?', 'Watter woorde gaan oor verdeel?'], s: [['"Share equally" means divide.'], ['"Eweredig verdeel" beteken deel.']] },
    { en: '50 sweets are shared equally among 6 children. How many sweets does each child get?', af: '50 lekkers word eweredig tussen 6 kinders verdeel. Hoeveel lekkers kry elke kind?', a: '8', lv: 'R', h: ['6 × 8 = 48', '6 × 8 = 48'], s: [['50 ÷ 6 = 8 remainder 2 → 8 each'], ['50 ÷ 6 = 8 res 2 → 8 elk']] },
    { en: '50 sweets are shared equally among 6 children. How many sweets are left over?', af: '50 lekkers word eweredig tussen 6 kinders verdeel. Hoeveel lekkers bly oor?', a: '2', lv: 'R', h: ['50 − 48', '50 − 48'], s: same('50 − 48 = 2') },
    { en: '245 eggs are packed into boxes of 6. How many boxes are completely full?', af: '245 eiers word in bokse van 6 verpak. Hoeveel bokse is heeltemal vol?', a: '40', lv: 'P', h: ['6 × 40 = 240', '6 × 40 = 240'], s: [['245 ÷ 6 = 40 remainder 5 → 40 full boxes'], ['245 ÷ 6 = 40 res 5 → 40 vol bokse']] }
  ],
  wb: { en: [{ t: 'Solve. Show your working and say what the remainder means.', p: ['R96 is shared equally among 4 children. How much does each child get?', '75 learners go on a trip. Each minibus takes 8 learners. How many minibuses are needed?', '138 marbles are put into bags of 5. How many full bags are there, and how many marbles are left?'], m: [2, 3, 3] }],
        af: [{ t: 'Los op. Wys jou bewerkings en sê wat die res beteken.', p: ['R96 word eweredig tussen 4 kinders verdeel. Hoeveel kry elke kind?', '75 leerders gaan op \'n uitstappie. Elke minibus neem 8 leerders. Hoeveel minibusse is nodig?', '138 albasters word in sakkies van 5 gesit. Hoeveel vol sakkies is daar, en hoeveel albasters bly oor?'], m: [2, 3, 3] }],
        ans: [['R24', '96 ÷ 4 = 24', '96 ÷ 4 = 24'], ['10 minibuses', '75 ÷ 8 = 9 remainder 3, so the 3 learners need one more minibus', '75 ÷ 8 = 9 res 3, so die 3 leerders het nog \'n minibus nodig'], ['27 full bags, 3 left over', '5 × 27 = 135', '5 × 27 = 135']] }
});

writeChapter(4, { en: 'Multiplication and Division', af: 'Vermenigvuldiging en Deling' }, T, process.argv[2] || OUT_DEFAULT);
