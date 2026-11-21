// Grade 4 Math Magician, Chapter 5: Multiple operations and number sentences (one bilingual source).
// Run: node scripts/math-gr4/gen_ch5.js   (writes math-magician/gr4/ch5.js, ch5.af.js, ch5.help.js)
// Note: the CAPS draft's examples "124 + 16 ÷ 7 = 20" and "23 × 8 − 110 − 26 = 100" only work with brackets,
// so they are written with brackets here, and the standard order of operations is taught.
const { ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT } = require('./lib.js');
const S = require('./sims_ch5.js');
const T = [];
const same = s => [[s], [s]];

/* ───────────── 501 Order of operations ───────────── */
T.push({
  id: 501, name: { en: 'Which comes first?', af: 'Wat kom eerste?' }, full: { en: 'Calculations with more than one operation', af: 'Berekeninge met meer as een bewerking' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { ask: 'Tap the operation you must do first.', good: 'Yes! Now what comes next?', notFirst: (a, b) => 'Not yet. Do the ' + b + ' first' + (a === b ? ' (the one on the left)' : '') + '. Remember: brackets first, then × and ÷, then + and −.', step: s => s, done: (v, m) => 'The answer is <b>' + v + '</b>. ' + (m ? 'You had ' + m + ' wrong ' + (m === 1 ? 'try' : 'tries') + '.' : 'Perfect order!') }
      : { ask: 'Tik op die bewerking wat jy eerste moet doen.', good: 'Ja! Wat kom volgende?', notFirst: (a, b) => 'Nog nie. Doen eers die ' + b + (a === b ? ' (die een links)' : '') + '. Onthou: hakies eerste, dan × en ÷, dan + en −.', step: s => s, done: (v, m) => 'Die antwoord is <b>' + v + '</b>. ' + (m ? 'Jy het ' + m + ' verkeerde ' + (m === 1 ? 'poging' : 'pogings') + ' gehad.' : 'Perfekte volgorde!') };
    const m = `<h4>🎮 ${en ? 'Which First?' : 'Wat Eerste?'}</h4><p class="how">${en ? 'Tap the operation that must be done first. Keep going until only the answer is left.' : 'Tik op die bewerking wat eerste gedoen moet word. Gaan aan totdat net die antwoord oorbly.'}</p><div class="g4-row" data-k="expr" style="gap:6px;min-height:60px"></div><ul class="g4-steps" data-k="hist"></ul><div class="g4-row"><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('robot', 'When a calculation has more than one operation, we must do them in the <strong>right order</strong>, or we get the wrong answer.') +
      def('The order', '<strong>1.</strong> Brackets ( ) first. <strong>2.</strong> Then × and ÷, from left to right. <strong>3.</strong> Then + and −, from left to right.') +
      ex('Worked examples', ['<span class="math">12 × 9 − 9 ÷ 3 = 108 − 3 = 105</span>', '<span class="math">(124 + 16) ÷ 7 = 140 ÷ 7 = 20</span>', '<span class="math">23 × 8 − (110 − 26) = 184 − 84 = 100</span>']) +
      sim('s501', S.s501, L, m) + tip('Brackets change the answer: <span class="math">2 + 3 × 4 = 14</span>, but <span class="math">(2 + 3) × 4 = 20</span>.')
      : hero('robot', 'As \'n berekening meer as een bewerking het, moet ons hulle in die <strong>regte volgorde</strong> doen, anders kry ons die verkeerde antwoord.') +
      def('Die volgorde', '<strong>1.</strong> Hakies ( ) eerste. <strong>2.</strong> Dan × en ÷, van links na regs. <strong>3.</strong> Dan + en −, van links na regs.') +
      ex('Uitgewerkte voorbeelde', ['<span class="math">12 × 9 − 9 ÷ 3 = 108 − 3 = 105</span>', '<span class="math">(124 + 16) ÷ 7 = 140 ÷ 7 = 20</span>', '<span class="math">23 × 8 − (110 − 26) = 184 − 84 = 100</span>']) +
      sim('s501', S.s501, L, m) + tip('Hakies verander die antwoord: <span class="math">2 + 3 × 4 = 14</span>, maar <span class="math">(2 + 3) × 4 = 20</span>.');
  },
  qs: [
    { en: '12 × 9 − 9 ÷ 3 = ?', af: '12 × 9 − 9 ÷ 3 = ?', a: '105', lv: 'R', h: ['Do × and ÷ before −.', 'Doen × en ÷ voor −.'], s: same('108 − 3 = 105') },
    { en: '(124 + 16) ÷ 7 = ?', af: '(124 + 16) ÷ 7 = ?', a: '20', lv: 'R', h: ['Brackets first.', 'Hakies eerste.'], s: same('140 ÷ 7 = 20') },
    { en: 'In 5 + 4 × 3, what do you do first?', af: 'Wat doen jy eerste in 5 + 4 × 3?', o: [['5 + 4', '4 × 3', 'either one'], ['5 + 4', '4 × 3', 'enige een']], a: 1, lv: 'K', h: ['× comes before +.', '× kom voor +.'], s: [['Multiply first: 4 × 3 = 12, then 5 + 12 = 17.'], ['Vermenigvuldig eers: 4 × 3 = 12, dan 5 + 12 = 17.']] },
    { en: '5 + 4 × 3 = ?', af: '5 + 4 × 3 = ?', a: '17', lv: 'R', h: ['Multiply first.', 'Vermenigvuldig eers.'], s: same('5 + 12 = 17') },
    { en: '23 × 8 − (110 − 26) = ?', af: '23 × 8 − (110 − 26) = ?', a: '100', lv: 'C', h: ['Brackets first, then multiply, then subtract.', 'Hakies eerste, dan vermenigvuldig, dan aftrek.'], s: same('110 − 26 = 84; 23 × 8 = 184; 184 − 84 = 100') },
    { en: '(20 − 8) × 5 = ?', af: '(20 − 8) × 5 = ?', a: '60', lv: 'R', h: ['Brackets first.', 'Hakies eerste.'], s: same('12 × 5 = 60') },
    { en: '36 ÷ 4 + 6 × 2 = ?', af: '36 ÷ 4 + 6 × 2 = ?', a: '21', lv: 'C', h: ['Do ÷ and × first, then +.', 'Doen ÷ en × eers, dan +.'], s: same('9 + 12 = 21') },
    { en: 'Which one equals 20?', af: 'Watter een is gelyk aan 20?', o: [['(2 + 3) × 4', '2 + 3 × 4', '2 × 3 + 4', '2 + 3 + 4'], ['(2 + 3) × 4', '2 + 3 × 4', '2 × 3 + 4', '2 + 3 + 4']], a: 0, lv: 'C', h: ['Work each one out in the right order.', 'Werk elkeen in die regte volgorde uit.'], s: same('(2 + 3) × 4 = 5 × 4 = 20; 2 + 3 × 4 = 14; 2 × 3 + 4 = 10; 2 + 3 + 4 = 9') }
  ],
  wb: { en: [{ t: 'Calculate. Show each step.', p: ['8 + 6 × 5', '(8 + 6) × 5', '100 − 48 ÷ 6', '9 × 7 − 4 × 8'], m: [2, 2, 2, 2] }], af: [{ t: 'Bereken. Wys elke stap.', p: ['8 + 6 × 5', '(8 + 6) × 5', '100 − 48 ÷ 6', '9 × 7 − 4 × 8'], m: [2, 2, 2, 2] }],
        ans: [['38', '8 + 30', '8 + 30'], ['70', '14 × 5', '14 × 5'], ['92', '100 − 8', '100 − 8'], ['31', '63 − 32', '63 − 32']] }
});

/* ───────────── 502 Missing numbers ───────────── */
T.push({
  id: 502, name: { en: 'Missing numbers', af: 'Ontbrekende getalle' }, full: { en: 'Completing number sentences', af: 'Getallesinne voltooi' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { ask: 'What number goes in the box? Type it and tap Try.', balanced: 'Balanced!', sub: (t, l, r, ok) => 'Check: ' + t + ' = ' + l + (ok ? ' = ' + r + ' ✓' : ', but we need ' + r + '.'), bigger: 'Try a bigger number.', smaller: 'Try a smaller number.' }
      : { ask: 'Watter getal hoort in die blokkie? Tik dit en tik op Probeer.', balanced: 'Gebalanseer!', sub: (t, l, r, ok) => 'Toets: ' + t + ' = ' + l + (ok ? ' = ' + r + ' ✓' : ', maar ons het ' + r + ' nodig.'), bigger: 'Probeer \'n groter getal.', smaller: 'Probeer \'n kleiner getal.' };
    const m = `<h4>🎮 ${en ? 'Balance It' : 'Balanseer Dit'}</h4><p class="how">${en ? 'A number sentence is like a balance: both sides must be equal. Find the number in the box.' : '\'n Getallesin is soos \'n weegskaal: albei kante moet gelyk wees. Vind die getal in die blokkie.'}</p><div class="g4-big" data-k="sent"></div><div class="g4-stage"><svg viewBox="0 0 640 240" data-k="svg" role="img" aria-label="balance"></svg></div><div class="g4-row"><span style="font-size:20px">□ =</span><input class="g4-input" data-k="box" inputmode="numeric" aria-label="box"><button class="g4-btn" data-k="try">${en ? 'Try' : 'Probeer'}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('scales', 'A <strong>number sentence</strong> uses numbers and signs, like <span class="math">□ + 18 = 36</span>. The box stands for a missing number.') +
      ex('Find the missing number', ['<span class="math">□ + 18 = 36</span>: which number plus 18 makes 36? <strong>18</strong>, because <span class="math">36 − 18 = 18</span>.', '<span class="math">(4 + □) × 6 = 42</span>: something times 6 is 42, so the bracket is 7. Then <span class="math">4 + □ = 7</span>, so □ = <strong>3</strong>.']) +
      def('Check by substitution', 'Put your answer in the box and work it out: <span class="math">(4 + 3) × 6 = 7 × 6 = 42</span> ✓. If both sides are equal, you are right.') +
      sim('s502', S.s502, L, m) + tip('Use the opposite operation: if □ + 25 = 50, then □ = 50 − 25.')
      : hero('scales', '\'n <strong>Getallesin</strong> gebruik getalle en tekens, soos <span class="math">□ + 18 = 36</span>. Die blokkie staan vir \'n ontbrekende getal.') +
      ex('Vind die ontbrekende getal', ['<span class="math">□ + 18 = 36</span>: watter getal plus 18 maak 36? <strong>18</strong>, want <span class="math">36 − 18 = 18</span>.', '<span class="math">(4 + □) × 6 = 42</span>: iets keer 6 is 42, so die hakie is 7. Dan is <span class="math">4 + □ = 7</span>, so □ = <strong>3</strong>.']) +
      def('Toets deur te vervang', 'Sit jou antwoord in die blokkie en werk dit uit: <span class="math">(4 + 3) × 6 = 7 × 6 = 42</span> ✓. As albei kante gelyk is, is jy reg.') +
      sim('s502', S.s502, L, m) + tip('Gebruik die teenoorgestelde bewerking: as □ + 25 = 50, dan is □ = 50 − 25.');
  },
  qs: [
    { en: '□ + 18 = 36. What is □?', af: '□ + 18 = 36. Wat is □?', a: '18', lv: 'K', h: ['36 − 18', '36 − 18'], s: same('36 − 18 = 18') },
    { en: '(4 + □) × 6 = 42. What is □?', af: '(4 + □) × 6 = 42. Wat is □?', a: '3', lv: 'C', h: ['What times 6 is 42?', 'Wat keer 6 is 42?'], s: same('42 ÷ 6 = 7; 7 − 4 = 3') },
    { en: '□ − 25 = 50. What is □?', af: '□ − 25 = 50. Wat is □?', a: '75', lv: 'R', h: ['Add 25 to 50.', 'Tel 25 by 50.'], s: same('50 + 25 = 75') },
    { en: '7 × □ = 63. What is □?', af: '7 × □ = 63. Wat is □?', a: '9', lv: 'K', h: ['63 ÷ 7', '63 ÷ 7'], s: same('7 × 9 = 63') },
    { en: '□ ÷ 5 = 12. What is □?', af: '□ ÷ 5 = 12. Wat is □?', a: '60', lv: 'R', h: ['12 × 5', '12 × 5'], s: same('12 × 5 = 60') },
    { en: 'Check by substitution: is □ = 9 correct for □ × 4 = 32?', af: 'Toets deur te vervang: is □ = 9 korrek vir □ × 4 = 32?', o: [['Yes', 'No'], ['Ja', 'Nee']], a: 1, lv: 'R', h: ['Work out 9 × 4.', 'Werk 9 × 4 uit.'], s: [['9 × 4 = 36, not 32. The answer is 8.'], ['9 × 4 = 36, nie 32 nie. Die antwoord is 8.']] },
    { en: '100 − □ = 64. What is □?', af: '100 − □ = 64. Wat is □?', a: '36', lv: 'R', h: ['How far is it from 64 to 100?', 'Hoe ver is dit van 64 tot 100?'], s: same('100 − 64 = 36') },
    { en: '3 × □ + 5 = 26. What is □?', af: '3 × □ + 5 = 26. Wat is □?', a: '7', lv: 'P', h: ['First undo the + 5.', 'Maak eers die + 5 ongedaan.'], s: same('26 − 5 = 21; 21 ÷ 3 = 7') }
  ],
  wb: { en: [{ t: 'Find the missing number. Check by substitution.', p: ['□ + 47 = 100', '□ × 8 = 72', '(□ − 3) × 5 = 35', '120 ÷ □ = 10'], m: [2, 2, 3, 2] }], af: [{ t: 'Vind die ontbrekende getal. Toets deur te vervang.', p: ['□ + 47 = 100', '□ × 8 = 72', '(□ − 3) × 5 = 35', '120 ÷ □ = 10'], m: [2, 2, 3, 2] }],
        ans: [['53', '53 + 47 = 100', '53 + 47 = 100'], ['9', '9 × 8 = 72', '9 × 8 = 72'], ['10', '(10 − 3) × 5 = 35', '(10 − 3) × 5 = 35'], ['12', '120 ÷ 12 = 10', '120 ÷ 12 = 10']] }
});

/* ───────────── 503 Writing number sentences ───────────── */
T.push({
  id: 503, name: { en: 'Writing number sentences', af: 'Getallesinne skryf' }, full: { en: 'Writing number sentences from words', af: 'Getallesinne uit woorde skryf' },
  body: lang => {
    const en = lang === 'en';
    const items = en ? [
      { w: 'Eight more than a number is 20.', o: ['□ + 8 = 20', '□ − 8 = 20', '8 × □ = 20', '20 + 8 = □'], a: 12 },
      { w: 'Six times a number is 42.', o: ['6 × □ = 42', '□ + 6 = 42', '42 × 6 = □', '□ ÷ 6 = 42'], a: 7 },
      { w: 'A number divided by 4 is 9.', o: ['□ ÷ 4 = 9', '4 ÷ □ = 9', '□ × 4 = 9', '□ − 4 = 9'], a: 36 },
      { w: '15 less than a number is 20.', o: ['□ − 15 = 20', '15 − □ = 20', '□ + 15 = 20', '20 − 15 = □'], a: 35 },
      { w: 'I think of a number, add 4, then multiply by 6. I get 42.', o: ['(□ + 4) × 6 = 42', '□ + 4 × 6 = 42', '(□ × 4) + 6 = 42', '□ × 6 + 4 = 42'], a: 3 },
      { w: 'Thandi had some marbles. She got 15 more and now has 42.', o: ['□ + 15 = 42', '□ − 15 = 42', '42 + 15 = □', '15 × □ = 42'], a: 27 }
    ] : [
      { w: 'Agt meer as \'n getal is 20.', o: ['□ + 8 = 20', '□ − 8 = 20', '8 × □ = 20', '20 + 8 = □'], a: 12 },
      { w: 'Ses keer \'n getal is 42.', o: ['6 × □ = 42', '□ + 6 = 42', '42 × 6 = □', '□ ÷ 6 = 42'], a: 7 },
      { w: '\'n Getal gedeel deur 4 is 9.', o: ['□ ÷ 4 = 9', '4 ÷ □ = 9', '□ × 4 = 9', '□ − 4 = 9'], a: 36 },
      { w: '15 minder as \'n getal is 20.', o: ['□ − 15 = 20', '15 − □ = 20', '□ + 15 = 20', '20 − 15 = □'], a: 35 },
      { w: 'Ek dink aan \'n getal, tel 4 by en maal dan met 6. Ek kry 42.', o: ['(□ + 4) × 6 = 42', '□ + 4 × 6 = 42', '(□ × 4) + 6 = 42', '□ × 6 + 4 = 42'], a: 3 },
      { w: 'Thandi het \'n paar albasters gehad. Sy het 15 meer gekry en het nou 42.', o: ['□ + 15 = 42', '□ − 15 = 42', '42 + 15 = □', '15 × □ = 42'], a: 27 }
    ];
    const L = en ? { items, of: (a, b) => a + ' of ' + b, pick: 'Which number sentence matches the words?', notThat: 'Not that one. Read the words again.', nowSolve: s => 'Yes: <b>' + s + '</b>. Now find □.', yes: s => 'Correct! ' + s + ' ✓', no: 'Not yet. Check by putting your number in the box.' }
      : { items, of: (a, b) => a + ' van ' + b, pick: 'Watter getallesin pas by die woorde?', notThat: 'Nie daardie een nie. Lees die woorde weer.', nowSolve: s => 'Ja: <b>' + s + '</b>. Vind nou □.', yes: s => 'Reg! ' + s + ' ✓', no: 'Nog nie. Toets deur jou getal in die blokkie te sit.' };
    const m = `<h4>🎮 ${en ? 'Words to Sentences' : 'Woorde na Sinne'}</h4><p class="how">${en ? 'Read the words. Choose the number sentence that matches, then work out the missing number.' : 'Lees die woorde. Kies die getallesin wat pas en werk dan die ontbrekende getal uit.'}</p><div class="score-pill" data-k="count" style="display:inline-block;margin-bottom:8px"></div><div class="g4-out" data-k="card" style="margin-bottom:10px"></div><div class="g4-row" data-k="opts"></div><div class="g4-row" data-k="solve" style="display:none"><span style="font-size:20px">□ =</span><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="answer"><button class="g4-btn" data-k="check">${W[lang].check}</button></div><div class="g4-row"><button class="g4-btn ghost" data-k="next">${W[lang].next}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('paper', 'We can turn words into a <strong>number sentence</strong>, using a box or a letter for the number we do not know.') +
      ex('From words to symbols', ['"A number is 3 more than t" → <span class="math">□ = t + 3</span> (or <span class="math">□ − 3 = t</span>)', '"Eight more than a number is 20" → <span class="math">□ + 8 = 20</span>, so □ = 12', '"Six times a number is 42" → <span class="math">6 × □ = 42</span>, so □ = 7']) +
      def('Words that help', '<strong>more than, plus, add</strong> → + &nbsp; <strong>less than, minus</strong> → − &nbsp; <strong>times, product</strong> → × &nbsp; <strong>divided by, shared</strong> → ÷ &nbsp; <strong>is, makes</strong> → =') +
      sim('s503', S.s503, L, m) + tip('"15 less than a number" means start with the number and take 15 away: □ − 15.')
      : hero('paper', 'Ons kan woorde in \'n <strong>getallesin</strong> verander, met \'n blokkie of \'n letter vir die getal wat ons nie ken nie.') +
      ex('Van woorde na simbole', ['"\'n Getal is 3 meer as t" → <span class="math">□ = t + 3</span> (of <span class="math">□ − 3 = t</span>)', '"Agt meer as \'n getal is 20" → <span class="math">□ + 8 = 20</span>, so □ = 12', '"Ses keer \'n getal is 42" → <span class="math">6 × □ = 42</span>, so □ = 7']) +
      def('Woorde wat help', '<strong>meer as, plus, tel by</strong> → + &nbsp; <strong>minder as, minus</strong> → − &nbsp; <strong>keer, produk</strong> → × &nbsp; <strong>gedeel deur, verdeel</strong> → ÷ &nbsp; <strong>is, maak</strong> → =') +
      sim('s503', S.s503, L, m) + tip('"15 minder as \'n getal" beteken begin met die getal en trek 15 af: □ − 15.');
  },
  qs: [
    { en: 'Which number sentence means "a number is 3 more than t"?', af: 'Watter getallesin beteken "\'n getal is 3 meer as t"?', o: [['□ = t + 3', '□ = t − 3', '□ = 3 × t', 't = □ + 3'], ['□ = t + 3', '□ = t − 3', '□ = 3 × t', 't = □ + 3']], a: 0, lv: 'R', h: ['"3 more than t" means t + 3.', '"3 meer as t" beteken t + 3.'], s: same('□ = t + 3') },
    { en: 'Which number sentence means "eight more than a number is 20"?', af: 'Watter getallesin beteken "agt meer as \'n getal is 20"?', o: [['□ + 8 = 20', '□ − 8 = 20', '8 × □ = 20', '20 + 8 = □'], ['□ + 8 = 20', '□ − 8 = 20', '8 × □ = 20', '20 + 8 = □']], a: 0, lv: 'R', h: ['"More than" means add.', '"Meer as" beteken tel by.'], s: same('□ + 8 = 20') },
    { en: '□ + 8 = 20. What is □?', af: '□ + 8 = 20. Wat is □?', a: '12', lv: 'K', h: ['20 − 8', '20 − 8'], s: same('20 − 8 = 12') },
    { en: 'Which number sentence means "four times a number is 48"?', af: 'Watter getallesin beteken "vier keer \'n getal is 48"?', o: [['4 × □ = 48', '□ + 4 = 48', '48 × 4 = □', '□ − 4 = 48'], ['4 × □ = 48', '□ + 4 = 48', '48 × 4 = □', '□ − 4 = 48']], a: 0, lv: 'R', h: ['"Times" means multiply.', '"Keer" beteken vermenigvuldig.'], s: same('4 × □ = 48, so □ = 12') },
    { en: 'Thandi had some marbles. She got 15 more and now has 42. How many did she have at first?', af: 'Thandi het \'n paar albasters gehad. Sy het 15 meer gekry en het nou 42. Hoeveel het sy eers gehad?', a: '27', lv: 'C', h: ['□ + 15 = 42', '□ + 15 = 42'], s: same('42 − 15 = 27') },
    { en: 'I think of a number, multiply it by 5 and add 3. The answer is 38. What is my number?', af: 'Ek dink aan \'n getal, maal dit met 5 en tel 3 by. Die antwoord is 38. Wat is my getal?', a: '7', lv: 'P', h: ['Work backwards: take away 3, then divide by 5.', 'Werk terug: trek 3 af en deel dan deur 5.'], s: same('38 − 3 = 35; 35 ÷ 5 = 7') },
    { en: 'Which number sentence means "a number divided by 6 is 7"?', af: 'Watter getallesin beteken "\'n getal gedeel deur 6 is 7"?', o: [['□ ÷ 6 = 7', '6 ÷ □ = 7', '□ × 6 = 7', '□ − 6 = 7'], ['□ ÷ 6 = 7', '6 ÷ □ = 7', '□ × 6 = 7', '□ − 6 = 7']], a: 0, lv: 'R', h: ['The number comes first, then ÷ 6.', 'Die getal kom eerste, dan ÷ 6.'], s: same('□ ÷ 6 = 7') },
    { en: '□ ÷ 6 = 7. What is □?', af: '□ ÷ 6 = 7. Wat is □?', a: '42', lv: 'R', h: ['7 × 6', '7 × 6'], s: same('7 × 6 = 42') }
  ],
  wb: { en: [{ t: 'Write a number sentence for each, then find the number.', p: ['A number plus 26 is 70.', 'Nine times a number is 81.', 'A number minus 14 is 36.', 'I think of a number, double it and add 5. I get 29.'], m: [2, 2, 2, 3] }],
        af: [{ t: 'Skryf \'n getallesin vir elkeen en vind dan die getal.', p: ['\'n Getal plus 26 is 70.', 'Nege keer \'n getal is 81.', '\'n Getal minus 14 is 36.', 'Ek dink aan \'n getal, verdubbel dit en tel 5 by. Ek kry 29.'], m: [2, 2, 2, 3] }],
        ans: [['□ + 26 = 70; □ = 44', '', ''], ['9 × □ = 81; □ = 9', '', ''], ['□ − 14 = 36; □ = 50', '', ''], ['2 × □ + 5 = 29; □ = 12', '29 − 5 = 24; 24 ÷ 2 = 12', '29 − 5 = 24; 24 ÷ 2 = 12']] }
});

writeChapter(5, { en: 'Multiple Operations and Number Sentences', af: 'Meervoudige Bewerkings en Getallesinne' }, T, process.argv[2] || OUT_DEFAULT);
