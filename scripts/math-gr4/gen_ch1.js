// Builds math-magician/gr4/ch1.js, ch1.af.js and ch1.help.js from one bilingual source.
// Run: node scripts/math-gr4/gen_ch1.js   (writes math-magician/gr4/ch1.js, ch1.af.js, ch1.help.js)
const fs = require('fs'), path = require('path');
const S = require('./sims_ch1.js');
const OUT = process.argv[2] || path.join(__dirname, '..', '..', 'math-magician', 'gr4');
const stk = (n, cls) => `<img class="g4-stk ${cls || ''}" src="/assets/stickers/${n}.webp" srcset="/assets/stickers/${n}@2x.webp 2x" alt="">`;
const fp = q => q.type === 'mc' ? 'm' + q.options.length + ':' + q.answer : 'i:' + String(q.answer).replace(/,/g, '.').replace(/[^0-9.\-\/]/g, '');
const sim = (id, fn, L, markup) => `<div class="g4-sim" id="${id}">${markup}</div><script>${S.PRELUDE}\n(${fn.toString()})(${JSON.stringify(L)}, document.getElementById('${id}'));</script>`;
const ex = (title, steps) => `<div class="example-box"><div class="example-box-title">✏️ ${title}</div>${steps.map((s, i) => `<div class="example-step"><span class="step-num">${i + 1}</span><span>${s}</span></div>`).join('')}</div>`;
const def = (title, html) => `<div class="def-box"><div class="def-box-title">📖 ${title}</div><p>${html}</p></div>`;
const tip = html => `<div class="tip-box"><span class="tip-icon">💡</span><span>${html}</span></div>`;
const hero = (s, html) => `<div class="g4-hero">${stk(s)}<p>${html.replace(/(\d) (?=\d{3}\b)/g, '$1&nbsp;')}</p></div>`;

// Functions inside L objects are not JSON, so sims receive them as source text and rebuild them.
// Simpler: give sims plain strings plus small templates (functions) converted with a reviver.
function Lfix(L) {
  const o = {};
  for (const [k, v] of Object.entries(L)) o[k] = typeof v === 'function' ? { __fn: v.toString() } : v;
  return o;
}
const REVIVE = `const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };`;
const simR = (id, fn, L, markup) => `<div class="g4-sim" id="${id}">${markup}</div><script>${S.PRELUDE}\n{ ${REVIVE}\n(${fn.toString()})(__rev(${JSON.stringify(Lfix(L))}), document.getElementById('${id}')); }</script>`;

const W = {
  en: { yes: 'Correct!', ex: 'Worked example', key: 'Key words', tryIt: 'Try it', check: 'Check', next: 'Next', newQ: 'New one' },
  af: { yes: 'Reg!', ex: 'Uitgewerkte voorbeeld', key: 'Sleutelwoorde', tryIt: 'Probeer dit', check: 'Toets', next: 'Volgende', newQ: 'Nog een' }
};

const TOPICS = [];

/* ───────────── 101 Counting ───────────── */
TOPICS.push({
  id: 101, name: { en: 'Counting in intervals', af: 'Tel in intervalle' }, full: { en: 'Counting forwards and backwards in intervals', af: 'Vorentoe en agtertoe tel in intervalle' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { title: 'Frog Hops', how: 'Choose a start number and a jump size. Tap Hop and watch the frog count for you.', start: 'Start at', hop: 'Hop!', reset: 'Start again', fwd: 'Forwards', back: 'Backwards',
      inS: s => 'in ' + s + 's', pattern: (s, d) => 'You are counting ' + (d > 0 ? 'forwards' : 'backwards') + ' in ' + s + 's. Each number is ' + s + (d > 0 ? ' more' : ' less') + ' than the one before.',
      nine: d => d > 0 ? 'Quick trick for 9s: add 10, then take away 1.' : 'Quick trick for 9s: take away 10, then add 1.', belowZero: 'We cannot go below 0 in Grade 4. Start again or count forwards.', tooBig: 'That is more than 10 000. Start again.' }
      : { title: 'Paddasprong', how: 'Kies \'n begingetal en \'n sproggrootte. Tik op Spring en kyk hoe die padda vir jou tel.', start: 'Begin by', hop: 'Spring!', reset: 'Begin oor', fwd: 'Vorentoe', back: 'Agtertoe',
      inS: s => 'in ' + s + "'e", pattern: (s, d) => 'Jy tel ' + (d > 0 ? 'vorentoe' : 'agtertoe') + ' in ' + s + "'e. Elke getal is " + s + (d > 0 ? ' meer' : ' minder') + ' as die een voor dit.',
      nine: d => d > 0 ? "Vinnige truuk vir 9'e: tel 10 by en trek dan 1 af." : "Vinnige truuk vir 9'e: trek 10 af en tel dan 1 by.", belowZero: 'Ons kan in Graad 4 nie onder 0 gaan nie. Begin oor of tel vorentoe.', tooBig: 'Dit is meer as 10 000. Begin oor.' };
    const markup = `<h4>🎮 ${L.title}</h4><p class="how">${L.how}</p><div class="g4-row"><label style="font-size:18px">${L.start} <input class="g4-input" data-k="start" value="31" inputmode="numeric"></label></div><div class="g4-row" data-k="steps"></div><div class="g4-row" data-k="dir"></div><div class="g4-stage"><svg viewBox="0 0 640 175" data-k="svg" role="img" aria-label="${L.title}"></svg></div><div class="g4-row"><button class="g4-btn" data-k="hop">${L.hop}</button><button class="g4-btn ghost" data-k="reset">${L.reset}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('frog', 'We can count forwards and backwards in <strong>jumps of the same size</strong>, called <strong>intervals</strong>: 2s, 3s, 5s, 10s, 25s, 50s, 100s, and even 9s, 49s and 99s.') +
      def('Odd and even', '<strong>Even numbers</strong> end in 0, 2, 4, 6 or 8. <strong>Odd numbers</strong> end in 1, 3, 5, 7 or 9. Counting in 2s from an odd number gives only odd numbers.') +
      ex('Worked examples', ['Count in 2s from 31: <span class="math">31; 33; 35; 37; 39</span>', 'Count in 3s from 110: <span class="math">110; 113; 116; 119</span>', 'Count in 9s from 267: add 10, take away 1 → <span class="math">267; 276; 285; 294</span>', 'Count backwards in 5s from 624: <span class="math">624; 619; 614; 609; 604</span>']) +
      simR('s101', S.s101, L, markup) + tip('To find the next number in a pattern, ask: <strong>how much does it go up or down each time?</strong> Example: 769; 719; 669 … goes down by 50, so the next number is 619.')
      : hero('frog', 'Ons kan vorentoe en agtertoe tel in <strong>spronge van dieselfde grootte</strong>, wat ons <strong>intervalle</strong> noem: 2\'e, 3\'e, 5\'e, 10\'e, 25\'e, 50\'e, 100\'e, en selfs 9\'e, 49\'e en 99\'e.') +
      def('Onewe en ewe', '<strong>Ewe getalle</strong> eindig op 0, 2, 4, 6 of 8. <strong>Onewe getalle</strong> eindig op 1, 3, 5, 7 of 9. As jy in 2\'e van \'n onewe getal af tel, kry jy net onewe getalle.') +
      ex('Uitgewerkte voorbeelde', ['Tel in 2\'e van 31 af: <span class="math">31; 33; 35; 37; 39</span>', 'Tel in 3\'e van 110 af: <span class="math">110; 113; 116; 119</span>', 'Tel in 9\'e van 267 af: tel 10 by, trek 1 af → <span class="math">267; 276; 285; 294</span>', 'Tel agtertoe in 5\'e van 624 af: <span class="math">624; 619; 614; 609; 604</span>']) +
      simR('s101', S.s101, L, markup) + tip('Om die volgende getal in \'n patroon te kry, vra: <strong>met hoeveel gaan dit elke keer op of af?</strong> Voorbeeld: 769; 719; 669 … gaan elke keer 50 af, so die volgende getal is 619.');
  },
  qs: [
    { en: 'Count in 2s: 31; 33; 35; ___', af: "Tel in 2'e: 31; 33; 35; ___", a: '37', lv: 'K', h: ['Add 2 each time.', 'Tel elke keer 2 by.'], s: [['35 + 2 = 37'], ['35 + 2 = 37']] },
    { en: 'Count in 3s: 110; 113; 116; ___', af: "Tel in 3'e: 110; 113; 116; ___", a: '119', lv: 'K', h: ['Add 3 each time.', 'Tel elke keer 3 by.'], s: [['116 + 3 = 119'], ['116 + 3 = 119']] },
    { en: 'Count in 9s: 267; 276; 285; ___', af: "Tel in 9'e: 267; 276; 285; ___", a: '294', lv: 'R', h: ['Add 10, then take away 1.', 'Tel 10 by en trek dan 1 af.'], s: [['285 + 10 = 295', '295 − 1 = 294'], ['285 + 10 = 295', '295 − 1 = 294']] },
    { en: 'Count in 25s: 450; 475; 500; ___', af: "Tel in 25'e: 450; 475; 500; ___", a: '525', lv: 'K', h: ['Add 25 each time.', 'Tel elke keer 25 by.'], s: [['500 + 25 = 525'], ['500 + 25 = 525']] },
    { en: 'Count backwards in 5s: 624; 619; 614; ___', af: "Tel agtertoe in 5'e: 624; 619; 614; ___", a: '609', lv: 'K', h: ['Take away 5 each time.', 'Trek elke keer 5 af.'], s: [['614 − 5 = 609'], ['614 − 5 = 609']] },
    { en: 'Which number is <strong>odd</strong>?', af: 'Watter getal is <strong>onewe</strong>?', o: [['4 356', '7 218', '5 093', '1 000'], ['4 356', '7 218', '5 093', '1 000']], a: 2, lv: 'K', h: ['Look at the last digit only.', 'Kyk net na die laaste syfer.'], s: [['5 093 ends in 3, and 3 is odd.', 'The others end in 6, 8 and 0, which are even.'], ['5 093 eindig op 3, en 3 is onewe.', 'Die ander eindig op 6, 8 en 0, wat ewe is.']] },
    { en: 'What is the next number? 769; 719; 669; ___', af: 'Wat is die volgende getal? 769; 719; 669; ___', a: '619', lv: 'R', h: ['How much does it go down each time?', 'Met hoeveel gaan dit elke keer af?'], s: [['769 − 719 = 50, so it goes down by 50.', '669 − 50 = 619'], ['769 − 719 = 50, so dit gaan 50 af.', '669 − 50 = 619']] },
    { en: 'Count backwards in 20s: 624; 604; 584; ___', af: "Tel agtertoe in 20'e: 624; 604; 584; ___", a: '564', lv: 'R', h: ['Take away 20: the tens digit goes down by 2.', 'Trek 20 af: die tiene-syfer word 2 minder.'], s: [['584 − 20 = 564'], ['584 − 20 = 564']] }
  ],
  wb: { en: [{ t: 'Write the next three numbers in each pattern:', p: ['173; 175; 177; …', '450; 475; 500; …', '1 299; 1 399; 1 499; …', '624; 615; 606; …'], m: [3, 3, 3, 3] }],
        af: [{ t: 'Skryf die volgende drie getalle in elke patroon:', p: ['173; 175; 177; …', '450; 475; 500; …', '1 299; 1 399; 1 499; …', '624; 615; 606; …'], m: [3, 3, 3, 3] }],
        ans: [['179; 181; 183', 'Count in 2s', 'Tel in 2\'e'], ['525; 550; 575', 'Count in 25s', 'Tel in 25\'e'], ['1 599; 1 699; 1 799', 'Count in 100s', 'Tel in 100\'e'], ['597; 588; 579', 'Count backwards in 9s', 'Tel agtertoe in 9\'e']] }
});

/* ───────────── 102 Place value ───────────── */
TOPICS.push({
  id: 102, name: { en: 'Place value', af: 'Plekwaarde' }, full: { en: 'Place value of digits in 4-digit numbers', af: 'Plekwaarde van syfers in 4-syfergetalle' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { title: 'Block Builder', how: 'Use + and − to build a number with blocks. Or tap Challenge and build the number you are given.', cols: ['Thousands', 'Hundreds', 'Tens', 'Units'], plus: 'Add one', minus: 'Remove one', start: 'Add some blocks to build a number.', build: n => 'Build the number <b>' + n + '</b>.', yes: 'Yes! You built it correctly.', notYet: 'Not yet. Check each column.' }
      : { title: 'Blokbouer', how: 'Gebruik + en − om \'n getal met blokke te bou. Of tik op Uitdaging en bou die getal wat jy kry.', cols: ['Duisende', 'Honderde', 'Tiene', 'Ene'], plus: 'Voeg een by', minus: 'Haal een weg', start: 'Voeg \'n paar blokke by om \'n getal te bou.', build: n => 'Bou die getal <b>' + n + '</b>.', yes: 'Ja! Jy het dit reg gebou.', notYet: 'Nog nie. Kyk na elke kolom.' };
    const markup = `<h4>🎮 ${L.title}</h4><p class="how">${L.how}</p><div class="g4-big" data-k="num">0</div><table class="g4-chart" data-k="chart"></table><div class="g4-stage"><svg viewBox="0 0 640 200" data-k="svg" role="img" aria-label="${L.title}"></svg></div><div class="g4-row"><button class="g4-btn" data-k="challenge">${en ? 'Challenge' : 'Uitdaging'}</button><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="clear">${en ? 'Clear' : 'Maak skoon'}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    const chart = c => `<table class="g4-chart"><tr>${c.map(x => `<th>${x}</th>`).join('')}</tr><tr><td>4</td><td>3</td><td>7</td><td>1</td></tr></table>`;
    return en ? hero('child', 'Every digit in a number has a <strong>place</strong>, and its place gives it a <strong>value</strong>. In <strong>4 371</strong>, the 4 is worth 4 000, but the 1 is worth only 1.') +
      chart(L.cols) + def('Expanded notation', 'We can break a number into the values of its digits: <span class="math">4 371 = 4 000 + 300 + 70 + 1</span>. This is called <strong>expanded notation</strong>.') +
      ex('Worked example', ['In 4 371, the <strong>4</strong> is in the thousands place: its value is <strong>4 000</strong>.', 'The <strong>3</strong> is in the hundreds place: its value is <strong>300</strong>.', 'The <strong>7</strong> is in the tens place: its value is <strong>70</strong>.', 'The <strong>1</strong> is in the units place: its value is <strong>1</strong>.']) +
      simR('s102', S.s102, L, markup) + tip('A <strong>0</strong> holds a place. In 3 052 there are no hundreds, so we write 0 in the hundreds place.')
      : hero('child', 'Elke syfer in \'n getal het \'n <strong>plek</strong>, en sy plek gee dit \'n <strong>waarde</strong>. In <strong>4 371</strong> is die 4 4 000 werd, maar die 1 is net 1 werd.') +
      chart(L.cols) + def('Uitgebreide notasie', 'Ons kan \'n getal opbreek in die waardes van sy syfers: <span class="math">4 371 = 4 000 + 300 + 70 + 1</span>. Dit word <strong>uitgebreide notasie</strong> genoem.') +
      ex('Uitgewerkte voorbeeld', ['In 4 371 is die <strong>4</strong> in die duisende-plek: sy waarde is <strong>4 000</strong>.', 'Die <strong>3</strong> is in die honderde-plek: sy waarde is <strong>300</strong>.', 'Die <strong>7</strong> is in die tiene-plek: sy waarde is <strong>70</strong>.', 'Die <strong>1</strong> is in die ene-plek: sy waarde is <strong>1</strong>.']) +
      simR('s102', S.s102, L, markup) + tip('\'n <strong>0</strong> hou \'n plek oop. In 3 052 is daar geen honderde nie, so ons skryf 0 in die honderde-plek.');
  },
  qs: [
    { en: 'In 4 371, what is the value of the digit 3?', af: 'Wat is die waarde van die syfer 3 in 4 371?', o: [['3', '30', '300', '3 000'], ['3', '30', '300', '3 000']], a: 2, lv: 'K', h: ['Which place is the 3 in?', 'In watter plek is die 3?'], s: [['The 3 is in the hundreds place.', 'Its value is 300.'], ['Die 3 is in die honderde-plek.', 'Sy waarde is 300.']] },
    { en: 'What is the value of the digit 6 in 6 205?', af: 'Wat is die waarde van die syfer 6 in 6 205?', a: '6000', lv: 'K', h: ['The 6 is in the thousands place.', 'Die 6 is in die duisende-plek.'], s: [['6 thousands = 6 000'], ['6 duisende = 6 000']] },
    { en: '5 000 + 400 + 7 = ?', af: '5 000 + 400 + 7 = ?', o: [['5 470', '5 407', '5 047', '547'], ['5 470', '5 407', '5 047', '547']], a: 1, lv: 'R', h: ['There are no tens, so the tens digit is 0.', 'Daar is geen tiene nie, so die tiene-syfer is 0.'], s: [['5 thousands, 4 hundreds, 0 tens, 7 units', '= 5 407'], ['5 duisende, 4 honderde, 0 tiene, 7 ene', '= 5 407']] },
    { en: 'Write 8 000 + 300 + 20 + 9 as one number.', af: 'Skryf 8 000 + 300 + 20 + 9 as een getal.', a: '8329', lv: 'K', h: ['Put each digit in its place: thousands, hundreds, tens, units.', 'Sit elke syfer in sy plek: duisende, honderde, tiene, ene.'], s: [['8 | 3 | 2 | 9', '= 8 329'], ['8 | 3 | 2 | 9', '= 8 329']] },
    { en: 'Which digit is in the <strong>tens</strong> place in 7 582?', af: 'Watter syfer is in die <strong>tiene</strong>-plek in 7 582?', o: [['7', '5', '8', '2'], ['7', '5', '8', '2']], a: 2, lv: 'K', h: ['The tens place is second from the right.', 'Die tiene-plek is tweede van regs af.'], s: [['Units: 2, tens: 8, hundreds: 5, thousands: 7.'], ['Ene: 2, tiene: 8, honderde: 5, duisende: 7.']] },
    { en: 'How many hundreds make 2 600?', af: 'Hoeveel honderde maak 2 600?', a: '26', lv: 'C', h: ['1 000 is 10 hundreds.', '1 000 is 10 honderde.'], s: [['2 000 = 20 hundreds', '600 = 6 hundreds', '20 + 6 = 26 hundreds'], ['2 000 = 20 honderde', '600 = 6 honderde', '20 + 6 = 26 honderde']] },
    { en: 'Which is 9 046 in expanded notation?', af: 'Watter een is 9 046 in uitgebreide notasie?', o: [['9 000 + 400 + 6', '9 000 + 40 + 6', '900 + 40 + 6', '9 000 + 4 + 6'], ['9 000 + 400 + 6', '9 000 + 40 + 6', '900 + 40 + 6', '9 000 + 4 + 6']], a: 1, lv: 'R', h: ['The 0 means there are no hundreds.', 'Die 0 beteken daar is geen honderde nie.'], s: [['9 thousands = 9 000, 0 hundreds, 4 tens = 40, 6 units = 6', '9 000 + 40 + 6'], ['9 duisende = 9 000, 0 honderde, 4 tiene = 40, 6 ene = 6', '9 000 + 40 + 6']] },
    { en: 'Make the <strong>biggest</strong> 4-digit number with the digits 3, 8, 1 and 6.', af: 'Maak die <strong>grootste</strong> 4-syfergetal met die syfers 3, 8, 1 en 6.', a: '8631', lv: 'P', h: ['Put the biggest digit in the thousands place.', 'Sit die grootste syfer in die duisende-plek.'], s: [['Order the digits from biggest to smallest: 8, 6, 3, 1.', '8 631'], ['Orden die syfers van groot na klein: 8, 6, 3, 1.', '8 631']] }
  ],
  wb: { en: [{ t: 'Write down the value of the underlined digit:', p: ['3 <u>4</u>56', '<u>7</u> 018', '2 90<u>8</u>'], m: [1, 1, 1] }, { t: 'Write each number in expanded notation:', p: ['5 274', '8 009', '6 430'], m: [2, 2, 2] }],
        af: [{ t: 'Skryf die waarde van die onderstreepte syfer neer:', p: ['3 <u>4</u>56', '<u>7</u> 018', '2 90<u>8</u>'], m: [1, 1, 1] }, { t: 'Skryf elke getal in uitgebreide notasie:', p: ['5 274', '8 009', '6 430'], m: [2, 2, 2] }],
        ans: [['400', 'Hundreds place', 'Honderde-plek'], ['7 000', 'Thousands place', 'Duisende-plek'], ['8', 'Units place', 'Ene-plek'], ['5 000 + 200 + 70 + 4', '', ''], ['8 000 + 9', 'No hundreds or tens', 'Geen honderde of tiene nie'], ['6 000 + 400 + 30', 'No units', 'Geen ene nie']] }
});

/* ───────────── 103 Number lines and ordering ───────────── */
TOPICS.push({
  id: 103, name: { en: 'Number lines and ordering', af: 'Getallelyne en orden' }, full: { en: 'Number lines, comparing and ordering numbers', af: 'Getallelyne, vergelyk en orden van getalle' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { title: 'Number Line Darts', how: 'Choose a number line. Then tap where the number belongs. Get within a small distance to score!', tap: n => 'Tap where <b>' + n + '</b> belongs on the line.', close: 'Great aim! Very close.', far: 'Not quite. The yellow arrow shows where it goes.', score: (a, b) => 'Score: ' + a + ' out of ' + b + '.' }
      : { title: 'Getallelyn-pyltjies', how: 'Kies \'n getallelyn. Tik dan waar die getal hoort. Kom naby genoeg om punte te kry!', tap: n => 'Tik waar <b>' + n + '</b> op die lyn hoort.', close: 'Mooi gemik! Baie naby.', far: 'Nie heeltemal nie. Die geel pyltjie wys waar dit hoort.', score: (a, b) => 'Telling: ' + a + ' uit ' + b + '.' };
    const markup = `<h4>🎮 ${L.title}</h4><p class="how">${L.how}</p><div class="g4-row" data-k="ranges"></div><div class="g4-big" data-k="target"></div><div class="g4-stage"><svg viewBox="0 0 640 150" data-k="svg" role="img" aria-label="${L.title}" style="cursor:crosshair"></svg></div><div class="g4-row"><button class="g4-btn" data-k="next">${W[lang].next}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('giraffe', 'A <strong>number line</strong> shows numbers in order, with equal spaces between the marks. Numbers get <strong>bigger</strong> as you move to the right.') +
      def('Comparing numbers', '<span class="math">&lt;</span> means <strong>is less than</strong>, and <span class="math">&gt;</span> means <strong>is greater than</strong>. The open side points to the bigger number: <span class="math">4 261 &lt; 5 261</span>.') +
      ex('Worked example: ordering', ['Compare the thousands first, then the hundreds, then the tens, then the units.', '<strong>Ascending</strong> (smallest to biggest): <span class="math">4 261 &lt; 5 261 &lt; 6 261 &lt; 8 261</span>', '<strong>Descending</strong> (biggest to smallest): <span class="math">8 484 &gt; 8 476 &gt; 8 467 &gt; 8 448</span>']) +
      simR('s103', S.s103, L, markup) + tip('On a number line, first work out <strong>how much each small step is worth</strong>. From 0 to 1 000 with 10 steps, each step is 100.')
      : hero('giraffe', '\'n <strong>Getallelyn</strong> wys getalle in volgorde, met gelyke spasies tussen die merke. Getalle word <strong>groter</strong> as jy na regs beweeg.') +
      def('Getalle vergelyk', '<span class="math">&lt;</span> beteken <strong>is kleiner as</strong>, en <span class="math">&gt;</span> beteken <strong>is groter as</strong>. Die oop kant wys na die groter getal: <span class="math">4 261 &lt; 5 261</span>.') +
      ex('Uitgewerkte voorbeeld: orden', ['Vergelyk eers die duisende, dan die honderde, dan die tiene, dan die ene.', '<strong>Stygende orde</strong> (klein na groot): <span class="math">4 261 &lt; 5 261 &lt; 6 261 &lt; 8 261</span>', '<strong>Dalende orde</strong> (groot na klein): <span class="math">8 484 &gt; 8 476 &gt; 8 467 &gt; 8 448</span>']) +
      simR('s103', S.s103, L, markup) + tip('Werk op \'n getallelyn eers uit <strong>hoeveel elke klein stap werd is</strong>. Van 0 tot 1 000 met 10 stappe is elke stap 100.');
  },
  qs: [
    { en: 'Which sign makes this true? 4 261 ___ 5 261', af: 'Watter teken maak dit waar? 4 261 ___ 5 261', o: [['&lt;', '&gt;', '='], ['&lt;', '&gt;', '=']], a: 0, lv: 'K', h: ['Compare the thousands.', 'Vergelyk die duisende.'], s: [['4 thousands is less than 5 thousands.', '4 261 < 5 261'], ['4 duisende is minder as 5 duisende.', '4 261 < 5 261']] },
    { en: 'Which number is the <strong>biggest</strong>?', af: 'Watter getal is die <strong>grootste</strong>?', o: [['8 484', '8 476', '8 467', '8 448'], ['8 484', '8 476', '8 467', '8 448']], a: 0, lv: 'K', h: ['The thousands and hundreds are the same, so compare the tens.', 'Die duisende en honderde is dieselfde, so vergelyk die tiene.'], s: [['8 tens is the most.', '8 484 is the biggest.'], ['8 tiene is die meeste.', '8 484 is die grootste.']] },
    { en: 'Which list is in <strong>ascending</strong> order (smallest to biggest)?', af: 'Watter lys is in <strong>stygende</strong> orde (klein na groot)?', o: [['3 102; 3 021; 3 201', '3 021; 3 102; 3 201', '3 201; 3 102; 3 021', '3 102; 3 201; 3 021'], ['3 102; 3 021; 3 201', '3 021; 3 102; 3 201', '3 201; 3 102; 3 021', '3 102; 3 201; 3 021']], a: 1, lv: 'R', h: ['Compare the hundreds digits: 0, 1 and 2.', 'Vergelyk die honderde-syfers: 0, 1 en 2.'], s: [['3 021 has 0 hundreds, 3 102 has 1, 3 201 has 2.', '3 021; 3 102; 3 201'], ['3 021 het 0 honderde, 3 102 het 1, 3 201 het 2.', '3 021; 3 102; 3 201']] },
    { en: 'What number is exactly halfway between 3 000 and 4 000?', af: 'Watter getal is presies halfpad tussen 3 000 en 4 000?', a: '3500', lv: 'R', h: ['Half of 1 000 is 500.', 'Die helfte van 1 000 is 500.'], s: [['4 000 − 3 000 = 1 000', 'Half of 1 000 is 500', '3 000 + 500 = 3 500'], ['4 000 − 3 000 = 1 000', 'Die helfte van 1 000 is 500', '3 000 + 500 = 3 500']] },
    { en: 'Which sign makes this true? 6 090 ___ 6 909', af: 'Watter teken maak dit waar? 6 090 ___ 6 909', o: [['&lt;', '&gt;', '='], ['&lt;', '&gt;', '=']], a: 0, lv: 'R', h: ['Compare the hundreds: 0 and 9.', 'Vergelyk die honderde: 0 en 9.'], s: [['6 090 has 0 hundreds; 6 909 has 9 hundreds.', '6 090 < 6 909'], ['6 090 het 0 honderde; 6 909 het 9 honderde.', '6 090 < 6 909']] },
    { en: 'A number line goes from 0 to 1 000 with a mark every 100. What number is at the 7th mark after 0?', af: '\'n Getallelyn gaan van 0 tot 1 000 met \'n merk elke 100. Watter getal is by die 7de merk na 0?', a: '700', lv: 'C', h: ['Each mark is worth 100.', 'Elke merk is 100 werd.'], s: [['7 marks × 100 = 700'], ['7 merke × 100 = 700']] },
    { en: 'Which number is the <strong>smallest</strong>?', af: 'Watter getal is die <strong>kleinste</strong>?', o: [['2 019', '2 109', '2 091', '2 190'], ['2 019', '2 109', '2 091', '2 190']], a: 0, lv: 'K', h: ['Compare the hundreds, then the tens.', 'Vergelyk die honderde, dan die tiene.'], s: [['2 019 and 2 091 have 0 hundreds.', '2 019 has fewer tens, so it is the smallest.'], ['2 019 en 2 091 het 0 honderde.', '2 019 het minder tiene, so dit is die kleinste.']] },
    { en: 'What number is 10 more than 4 995?', af: 'Watter getal is 10 meer as 4 995?', a: '5005', lv: 'C', h: ['Count on 5 to 5 000, then 5 more.', 'Tel 5 aan tot 5 000, dan nog 5.'], s: [['4 995 + 5 = 5 000', '5 000 + 5 = 5 005'], ['4 995 + 5 = 5 000', '5 000 + 5 = 5 005']] }
  ],
  wb: { en: [{ t: 'Write the numbers in ascending order (smallest to biggest):', p: ['6 412; 6 142; 6 421; 6 124'], m: [2] }, { t: 'Fill in &lt; or &gt;:', p: ['3 870 ___ 3 807', '9 099 ___ 9 909'], m: [1, 1] }],
        af: [{ t: 'Skryf die getalle in stygende orde (klein na groot):', p: ['6 412; 6 142; 6 421; 6 124'], m: [2] }, { t: 'Vul &lt; of &gt; in:', p: ['3 870 ___ 3 807', '9 099 ___ 9 909'], m: [1, 1] }],
        ans: [['6 124; 6 142; 6 412; 6 421', 'Compare hundreds, then tens', 'Vergelyk honderde, dan tiene'], ['&gt;', '7 tens is more than 0 tens', '7 tiene is meer as 0 tiene'], ['&lt;', '0 hundreds is less than 9 hundreds', '0 honderde is minder as 9 honderde']] }
});

/* ───────────── 104 Rounding off ───────────── */
TOPICS.push({
  id: 104, name: { en: 'Rounding off', af: 'Afronding' }, full: { en: 'Rounding off to the nearest 10, 100 or 1 000', af: 'Afronding tot die naaste 10, 100 of 1 000' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { title: 'Roll to the Nearest', how: 'Type a number (or tap Random) and choose what to round to. The arrow shows which number it is closer to.', nearest: p => 'Nearest ' + p, halfway: 'halfway',
      explain: (n, lo, hi, r, half) => n + ' is between ' + lo + ' and ' + hi + '. ' + (half ? 'It is exactly halfway, so we round <b>up</b> to ' + r + '.' : 'It is closer to ' + r + '.') }
      : { title: 'Rol na die Naaste', how: 'Tik \'n getal (of tik op Lukraak) en kies waarnatoe om af te rond. Die pyltjie wys na watter getal dit nader is.', nearest: p => 'Naaste ' + p, halfway: 'halfpad',
      explain: (n, lo, hi, r, half) => n + ' is tussen ' + lo + ' en ' + hi + '. ' + (half ? 'Dit is presies halfpad, so ons rond <b>op</b> af na ' + r + '.' : 'Dit is nader aan ' + r + '.') };
    const markup = `<h4>🎮 ${L.title}</h4><p class="how">${L.how}</p><div class="g4-row"><input class="g4-input" data-k="n" value="2176" inputmode="numeric" aria-label="number"><button class="g4-btn ghost" data-k="rand">${en ? 'Random' : 'Lukraak'}</button></div><div class="g4-row" data-k="places"></div><div class="g4-stage"><svg viewBox="0 0 640 170" data-k="svg" role="img" aria-label="${L.title}"></svg></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('tortoise', 'When we <strong>round off</strong>, we choose the nearest "easy" number. Rounded numbers help us <strong>estimate</strong> quickly. The sign <span class="math">≈</span> means <strong>is about</strong>.') +
      def('The rule', 'Look at the digit to the <strong>right</strong> of the place you are rounding to. If it is <strong>5 or more</strong>, round <strong>up</strong>. If it is <strong>4 or less</strong>, round <strong>down</strong>.') +
      ex('Worked example: 2 176', ['To the nearest 10: look at the units (6). 6 is 5 or more, so round up: <span class="math">2 176 ≈ 2 180</span>', 'To the nearest 100: look at the tens (7). Round up: <span class="math">2 176 ≈ 2 200</span>', 'To the nearest 1 000: look at the hundreds (1). Round down: <span class="math">2 176 ≈ 2 000</span>']) +
      simR('s104', S.s104, L, markup) + tip('Rounding is great for checking answers. 397 + 504 is about 400 + 500 = 900, so an answer of 1 901 must be wrong!')
      : hero('tortoise', 'As ons <strong>afrond</strong>, kies ons die naaste "maklike" getal. Afgeronde getalle help ons om vinnig te <strong>skat</strong>. Die teken <span class="math">≈</span> beteken <strong>is omtrent</strong>.') +
      def('Die reël', 'Kyk na die syfer <strong>regs</strong> van die plek waarnatoe jy afrond. As dit <strong>5 of meer</strong> is, rond <strong>op</strong> af. As dit <strong>4 of minder</strong> is, rond <strong>af</strong> af.') +
      ex('Uitgewerkte voorbeeld: 2 176', ['Tot die naaste 10: kyk na die ene (6). 6 is 5 of meer, so rond op af: <span class="math">2 176 ≈ 2 180</span>', 'Tot die naaste 100: kyk na die tiene (7). Rond op af: <span class="math">2 176 ≈ 2 200</span>', 'Tot die naaste 1 000: kyk na die honderde (1). Rond af af: <span class="math">2 176 ≈ 2 000</span>']) +
      simR('s104', S.s104, L, markup) + tip('Afronding is wonderlik om antwoorde te toets. 397 + 504 is omtrent 400 + 500 = 900, so \'n antwoord van 1 901 moet verkeerd wees!');
  },
  qs: [
    { en: 'Round 2 176 off to the nearest 10.', af: 'Rond 2 176 af tot die naaste 10.', a: '2180', lv: 'K', h: ['Look at the units digit.', 'Kyk na die ene-syfer.'], s: [['The units digit is 6, which is 5 or more.', 'Round up: 2 180'], ['Die ene-syfer is 6, wat 5 of meer is.', 'Rond op af: 2 180']] },
    { en: 'Round 2 176 off to the nearest 100.', af: 'Rond 2 176 af tot die naaste 100.', a: '2200', lv: 'K', h: ['Look at the tens digit.', 'Kyk na die tiene-syfer.'], s: [['The tens digit is 7, which is 5 or more.', 'Round up: 2 200'], ['Die tiene-syfer is 7, wat 5 of meer is.', 'Rond op af: 2 200']] },
    { en: 'Round 2 176 off to the nearest 1 000.', af: 'Rond 2 176 af tot die naaste 1 000.', a: '2000', lv: 'K', h: ['Look at the hundreds digit.', 'Kyk na die honderde-syfer.'], s: [['The hundreds digit is 1, which is 4 or less.', 'Round down: 2 000'], ['Die honderde-syfer is 1, wat 4 of minder is.', 'Rond af af: 2 000']] },
    { en: 'Round 3 450 off to the nearest 100.', af: 'Rond 3 450 af tot die naaste 100.', o: [['3 400', '3 500', '3 000', '3 450'], ['3 400', '3 500', '3 000', '3 450']], a: 1, lv: 'R', h: ['It is exactly halfway. What do we do then?', 'Dit is presies halfpad. Wat doen ons dan?'], s: [['The tens digit is 5.', '5 or more rounds up: 3 500'], ['Die tiene-syfer is 5.', '5 of meer rond op af: 3 500']] },
    { en: 'Round 6 997 off to the nearest 10.', af: 'Rond 6 997 af tot die naaste 10.', a: '7000', lv: 'C', h: ['6 997 is between 6 990 and 7 000.', '6 997 is tussen 6 990 en 7 000.'], s: [['The units digit is 7, so round up.', '6 990 + 10 = 7 000'], ['Die ene-syfer is 7, so rond op af.', '6 990 + 10 = 7 000']] },
    { en: 'Which number rounds to 500 (nearest 100)?', af: 'Watter getal rond af na 500 (naaste 100)?', o: [['449', '551', '470', '560'], ['449', '551', '470', '560']], a: 2, lv: 'R', h: ['Numbers from 450 to 549 round to 500.', 'Getalle van 450 tot 549 rond af na 500.'], s: [['470 has 7 tens, so it rounds up to 500.', '449 → 400, 551 → 600, 560 → 600'], ['470 het 7 tiene, so dit rond op af na 500.', '449 → 400, 551 → 600, 560 → 600']] },
    { en: 'Round 8 501 off to the nearest 1 000.', af: 'Rond 8 501 af tot die naaste 1 000.', a: '9000', lv: 'R', h: ['Look at the hundreds digit.', 'Kyk na die honderde-syfer.'], s: [['The hundreds digit is 5.', 'Round up: 9 000'], ['Die honderde-syfer is 5.', 'Rond op af: 9 000']] },
    { en: 'Estimate 397 + 504 by rounding each number to the nearest 100.', af: 'Skat 397 + 504 deur elke getal tot die naaste 100 af te rond.', o: [['800', '900', '1 000', '700'], ['800', '900', '1 000', '700']], a: 1, lv: 'C', h: ['Round each number first, then add.', 'Rond eers elke getal af en tel dan bymekaar.'], s: [['397 ≈ 400 and 504 ≈ 500', '400 + 500 = 900'], ['397 ≈ 400 en 504 ≈ 500', '400 + 500 = 900']] }
  ],
  wb: { en: [{ t: 'Round off 4 628:', p: ['to the nearest 10', 'to the nearest 100', 'to the nearest 1 000'], m: [1, 1, 1] }, { t: 'Estimate by rounding to the nearest 100, then calculate the exact answer:', p: ['612 + 289'], m: [3] }],
        af: [{ t: 'Rond 4 628 af:', p: ['tot die naaste 10', 'tot die naaste 100', 'tot die naaste 1 000'], m: [1, 1, 1] }, { t: 'Skat deur tot die naaste 100 af te rond, en bereken dan die presiese antwoord:', p: ['612 + 289'], m: [3] }],
        ans: [['4 630', 'Units 8 → round up', 'Ene 8 → rond op af'], ['4 600', 'Tens 2 → round down', 'Tiene 2 → rond af af'], ['5 000', 'Hundreds 6 → round up', 'Honderde 6 → rond op af'], ['Estimate 600 + 300 = 900; exact 901', '', '']] }
});

/* ───────────── 105 Adding ───────────── */
TOPICS.push({
  id: 105, name: { en: 'Adding whole numbers', af: 'Heelgetalle optel' }, full: { en: 'Adding whole numbers with up to 4 digits', af: 'Heelgetalle met tot 4 syfers optel' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { title: 'Break-it-down Adder', how: 'Work out the sum on paper first and type your answer. Then tap Next step to see it broken down, or Column method to line it up.', parts: ['Thousands', 'Hundreds', 'Tens', 'Units'], tryFirst: 'Try it yourself first, then check.', right: s => 'Correct! The answer is ' + s + '.', wrong: 'Not yet. Tap Next step to see how.' }
      : { title: 'Breek-dit-op-optelmasjien', how: 'Werk die som eers op papier uit en tik jou antwoord. Tik dan op Volgende stap om dit opgebreek te sien, of Kolommetode om dit onder mekaar te sit.', parts: ['Duisende', 'Honderde', 'Tiene', 'Ene'], tryFirst: 'Probeer dit eers self en toets dan.', right: s => 'Reg! Die antwoord is ' + s + '.', wrong: 'Nog nie. Tik op Volgende stap om te sien hoe.' };
    const markup = `<h4>🎮 ${L.title}</h4><p class="how">${L.how}</p><div class="g4-big" data-k="sum"></div><div class="g4-row"><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="answer"><button class="g4-btn" data-k="check">${W[lang].check}</button></div><div class="g4-row"><button class="g4-btn ghost" data-k="next">${en ? 'Next step' : 'Volgende stap'}</button><button class="g4-btn ghost" data-k="colbtn">${en ? 'Column method' : 'Kolommetode'}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><ul class="g4-steps" data-k="steps"></ul><div class="g4-col" data-k="col"></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('apple', 'We can add numbers in <strong>any order</strong>: <span class="math">26 + 19 = 19 + 26</span>. There are many ways to add. Choose the one that makes the sum easiest!') +
      ex('Way 1: break the numbers down', ['<span class="math">4 362 + 2 486</span>', '= 4 000 + 2 000 + 300 + 400 + 60 + 80 + 2 + 6', '= 6 000 + 700 + 140 + 8', '= <strong>6 848</strong>']) +
      ex('Way 2: add on in jumps', ['<span class="math">4 362 + 2 000 = 6 362</span>', '<span class="math">6 362 + 400 = 6 762</span>', '<span class="math">6 762 + 80 = 6 842</span>', '<span class="math">6 842 + 6 = 6 848</span>']) +
      ex('Way 3: fill up the tens', ['<span class="math">96 + 48</span>: take 4 from 48 to make 96 up to 100.', '<span class="math">100 + 44 = 144</span>']) +
      simR('s105', S.s105, L, markup) + tip('The <strong>column method</strong> lines up the units, tens, hundreds and thousands. Start adding from the <strong>units</strong> and carry a 1 when a column adds up to 10 or more.')
      : hero('apple', 'Ons kan getalle in <strong>enige volgorde</strong> optel: <span class="math">26 + 19 = 19 + 26</span>. Daar is baie maniere om op te tel. Kies die een wat die som die maklikste maak!') +
      ex('Manier 1: breek die getalle op', ['<span class="math">4 362 + 2 486</span>', '= 4 000 + 2 000 + 300 + 400 + 60 + 80 + 2 + 6', '= 6 000 + 700 + 140 + 8', '= <strong>6 848</strong>']) +
      ex('Manier 2: tel aan in spronge', ['<span class="math">4 362 + 2 000 = 6 362</span>', '<span class="math">6 362 + 400 = 6 762</span>', '<span class="math">6 762 + 80 = 6 842</span>', '<span class="math">6 842 + 6 = 6 848</span>']) +
      ex('Manier 3: maak die tiene vol', ['<span class="math">96 + 48</span>: neem 4 van 48 om 96 vol te maak tot 100.', '<span class="math">100 + 44 = 144</span>']) +
      simR('s105', S.s105, L, markup) + tip('Die <strong>kolommetode</strong> sit die ene, tiene, honderde en duisende onder mekaar. Begin by die <strong>ene</strong> en dra 1 oor as \'n kolom 10 of meer is.');
  },
  qs: [
    { en: '4 362 + 2 486 = ?', af: '4 362 + 2 486 = ?', a: '6848', lv: 'R', h: ['Add the thousands, hundreds, tens and units separately.', 'Tel die duisende, honderde, tiene en ene apart op.'], s: [['6 000 + 700 + 140 + 8', '= 6 848'], ['6 000 + 700 + 140 + 8', '= 6 848']] },
    { en: '96 + 48 = ?', af: '96 + 48 = ?', a: '144', lv: 'K', h: ['Fill up 96 to 100 first.', 'Maak eers 96 vol tot 100.'], s: [['96 + 4 = 100', '100 + 44 = 144'], ['96 + 4 = 100', '100 + 44 = 144']] },
    { en: '26 + 19 = 19 + ___', af: '26 + 19 = 19 + ___', o: [['26', '19', '45', '7'], ['26', '19', '45', '7']], a: 0, lv: 'K', h: ['We can add in any order.', 'Ons kan in enige volgorde optel.'], s: [['Swapping the order does not change the answer.', '26 + 19 = 19 + 26'], ['As ons die volgorde omruil, verander die antwoord nie.', '26 + 19 = 19 + 26']] },
    { en: '3 205 + 1 470 = ?', af: '3 205 + 1 470 = ?', a: '4675', lv: 'R', h: ['No carrying is needed here.', 'Hier hoef jy niks oor te dra nie.'], s: [['4 000 + 600 + 70 + 5', '= 4 675'], ['4 000 + 600 + 70 + 5', '= 4 675']] },
    { en: '2 748 + 1 563 = ?', af: '2 748 + 1 563 = ?', a: '4311', lv: 'R', h: ['Some columns add up to more than 9, so carry.', 'Party kolomme is meer as 9, so dra oor.'], s: [['Units: 8 + 3 = 11, write 1 carry 1', 'Tens: 4 + 6 + 1 = 11, write 1 carry 1', 'Hundreds: 7 + 5 + 1 = 13, write 3 carry 1', 'Thousands: 2 + 1 + 1 = 4', '= 4 311'], ['Ene: 8 + 3 = 11, skryf 1 dra 1', 'Tiene: 4 + 6 + 1 = 11, skryf 1 dra 1', 'Honderde: 7 + 5 + 1 = 13, skryf 3 dra 1', 'Duisende: 2 + 1 + 1 = 4', '= 4 311']] },
    { en: '5 000 + 400 + 80 + 3 + 1 000 + 200 + 10 + 4 = ?', af: '5 000 + 400 + 80 + 3 + 1 000 + 200 + 10 + 4 = ?', a: '6697', lv: 'C', h: ['Group the thousands, hundreds, tens and units.', 'Groepeer die duisende, honderde, tiene en ene.'], s: [['6 000 + 600 + 90 + 7', '= 6 697'], ['6 000 + 600 + 90 + 7', '= 6 697']] },
    { en: 'What is the best estimate for 2 987 + 3 021?', af: 'Wat is die beste skatting vir 2 987 + 3 021?', o: [['5 000', '6 000', '7 000', '600'], ['5 000', '6 000', '7 000', '600']], a: 1, lv: 'C', h: ['Round each number to the nearest 1 000.', 'Rond elke getal af tot die naaste 1 000.'], s: [['2 987 ≈ 3 000 and 3 021 ≈ 3 000', '3 000 + 3 000 = 6 000'], ['2 987 ≈ 3 000 en 3 021 ≈ 3 000', '3 000 + 3 000 = 6 000']] },
    { en: '1 999 + 2 001 = ?', af: '1 999 + 2 001 = ?', a: '4000', lv: 'P', h: ['Move 1 from 2 001 to 1 999.', 'Skuif 1 van 2 001 na 1 999.'], s: [['1 999 + 1 = 2 000 and 2 001 − 1 = 2 000', '2 000 + 2 000 = 4 000'], ['1 999 + 1 = 2 000 en 2 001 − 1 = 2 000', '2 000 + 2 000 = 4 000']] }
  ],
  wb: { en: [{ t: 'Calculate. Show your method.', p: ['3 254 + 2 135', '4 678 + 1 845', '2 999 + 1 456'], m: [2, 3, 3] }], af: [{ t: 'Bereken. Wys jou metode.', p: ['3 254 + 2 135', '4 678 + 1 845', '2 999 + 1 456'], m: [2, 3, 3] }],
        ans: [['5 389', '5 000 + 300 + 80 + 9', '5 000 + 300 + 80 + 9'], ['6 523', 'Carry in units, tens and hundreds', 'Dra oor by ene, tiene en honderde'], ['4 455', '3 000 + 1 455, then take away 1', '3 000 + 1 455, trek dan 1 af']] }
});

/* ───────────── 106 Subtracting ───────────── */
TOPICS.push({
  id: 106, name: { en: 'Subtracting whole numbers', af: 'Heelgetalle aftrek' }, full: { en: 'Subtracting whole numbers and checking with addition', af: 'Heelgetalle aftrek en toets met optelling' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { title: 'Fact Family Triangle', how: 'Change the two bottom numbers and watch the whole family of facts change. Tap Quiz me to fill in a missing answer.', check: 'Check', explain: 'Addition and subtraction undo each other. If you know one fact, you know all four!', fill: 'Fill in the missing number.', right: 'Correct! Subtraction undoes addition.', wrong: (a, op, b) => 'Not yet. Work out ' + a + ' ' + op + ' ' + b + ' again.' }
      : { title: 'Feitefamilie-driehoek', how: 'Verander die twee onderste getalle en kyk hoe die hele familie feite verander. Tik op Toets my om \'n ontbrekende antwoord in te vul.', check: 'Toets', explain: 'Optel en aftrek maak mekaar ongedaan. As jy een feit ken, ken jy al vier!', fill: 'Vul die ontbrekende getal in.', right: 'Reg! Aftrek maak optel ongedaan.', wrong: (a, op, b) => 'Nog nie. Werk ' + a + ' ' + op + ' ' + b + ' weer uit.' };
    const markup = `<h4>🎮 ${L.title}</h4><p class="how">${L.how}</p><div class="g4-row"><input class="g4-input" data-k="a" value="19" inputmode="numeric" aria-label="first number"><span style="font-size:22px">+</span><input class="g4-input" data-k="b" value="8" inputmode="numeric" aria-label="second number"><button class="g4-btn ghost" data-k="quiz">${en ? 'Quiz me' : 'Toets my'}</button></div><div class="g4-stage"><svg viewBox="0 0 640 200" data-k="svg" role="img" aria-label="${L.title}"></svg></div><ul class="g4-steps" data-k="facts"></ul><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('banana', 'When we <strong>subtract</strong>, the order matters: <span class="math">78 − 20</span> is not the same as <span class="math">20 − 78</span>. Subtraction <strong>undoes</strong> addition.') +
      def('The converse relationship', 'If <span class="math">19 + 8 = 27</span>, then <span class="math">27 − 19 = 8</span> and <span class="math">27 − 8 = 19</span>. We can check every subtraction by adding.') +
      ex('Worked example: 4 687 − 2 143', ['Break it down: (4 000 − 2 000) + (600 − 100) + (80 − 40) + (7 − 3)', '= 2 000 + 500 + 40 + 4 = <strong>2 544</strong>', 'Or jump back: 4 687 − 2 000 = 2 687 → − 100 = 2 587 → − 40 = 2 547 → − 3 = 2 544', 'Check: <span class="math">2 544 + 2 143 = 4 687</span> ✓']) +
      ex('When you need to break up a ten: 3 261 − 1 846', ['Units: 1 − 6 does not work, so break up a ten: 11 − 6 = 5', 'Tens: 5 − 4 = 1', 'Hundreds: 2 − 8 does not work, so break up a thousand: 12 − 8 = 4', 'Thousands: 2 − 1 = 1, so the answer is <strong>1 415</strong>']) +
      simR('s106', S.s106, L, markup) + tip('You can also count backwards: 624 − 36 is 624 back in 9s four times: 615; 606; 597; 588.')
      : hero('banana', 'As ons <strong>aftrek</strong>, maak die volgorde saak: <span class="math">78 − 20</span> is nie dieselfde as <span class="math">20 − 78</span> nie. Aftrek <strong>maak optel ongedaan</strong>.') +
      def('Die omgekeerde verband', 'As <span class="math">19 + 8 = 27</span>, dan is <span class="math">27 − 19 = 8</span> en <span class="math">27 − 8 = 19</span>. Ons kan elke aftreksom toets deur op te tel.') +
      ex('Uitgewerkte voorbeeld: 4 687 − 2 143', ['Breek dit op: (4 000 − 2 000) + (600 − 100) + (80 − 40) + (7 − 3)', '= 2 000 + 500 + 40 + 4 = <strong>2 544</strong>', 'Of spring terug: 4 687 − 2 000 = 2 687 → − 100 = 2 587 → − 40 = 2 547 → − 3 = 2 544', 'Toets: <span class="math">2 544 + 2 143 = 4 687</span> ✓']) +
      ex('As jy \'n tien moet opbreek: 3 261 − 1 846', ['Ene: 1 − 6 werk nie, so breek \'n tien op: 11 − 6 = 5', 'Tiene: 5 − 4 = 1', 'Honderde: 2 − 8 werk nie, so breek \'n duisend op: 12 − 8 = 4', 'Duisende: 2 − 1 = 1, so die antwoord is <strong>1 415</strong>']) +
      simR('s106', S.s106, L, markup) + tip('Jy kan ook agtertoe tel: 624 − 36 is 624 vier keer terug in 9\'e: 615; 606; 597; 588.');
  },
  qs: [
    { en: '4 687 − 2 143 = ?', af: '4 687 − 2 143 = ?', a: '2544', lv: 'R', h: ['Subtract thousands, hundreds, tens and units separately.', 'Trek die duisende, honderde, tiene en ene apart af.'], s: [['2 000 + 500 + 40 + 4', '= 2 544'], ['2 000 + 500 + 40 + 4', '= 2 544']] },
    { en: '3 261 − 1 846 = ?', af: '3 261 − 1 846 = ?', a: '1415', lv: 'C', h: ['You will need to break up a ten and a thousand.', 'Jy sal \'n tien en \'n duisend moet opbreek.'], s: [['Units: 11 − 6 = 5', 'Tens: 5 − 4 = 1', 'Hundreds: 12 − 8 = 4', 'Thousands: 2 − 1 = 1', '= 1 415'], ['Ene: 11 − 6 = 5', 'Tiene: 5 − 4 = 1', 'Honderde: 12 − 8 = 4', 'Duisende: 2 − 1 = 1', '= 1 415']] },
    { en: 'If 19 + 8 = 27, which of these is also true?', af: 'As 19 + 8 = 27, watter een hiervan is ook waar?', o: [['27 − 19 = 8', '19 − 8 = 27', '8 − 27 = 19', '27 + 8 = 19'], ['27 − 19 = 8', '19 − 8 = 27', '8 − 27 = 19', '27 + 8 = 19']], a: 0, lv: 'K', h: ['Subtraction undoes addition.', 'Aftrek maak optel ongedaan.'], s: [['Start with the total 27 and take away one part.', '27 − 19 = 8'], ['Begin met die totaal 27 en trek een deel af.', '27 − 19 = 8']] },
    { en: '1 000 − 368 = ?', af: '1 000 − 368 = ?', a: '632', lv: 'R', h: ['Count up from 368 to 1 000.', 'Tel op van 368 tot 1 000.'], s: [['368 + 2 = 370', '370 + 30 = 400', '400 + 600 = 1 000', '2 + 30 + 600 = 632'], ['368 + 2 = 370', '370 + 30 = 400', '400 + 600 = 1 000', '2 + 30 + 600 = 632']] },
    { en: 'True or false? 78 − 20 = 20 − 78', af: 'Waar of onwaar? 78 − 20 = 20 − 78', o: [['True', 'False'], ['Waar', 'Onwaar']], a: 1, lv: 'K', h: ['Can we swap the numbers in a subtraction?', 'Kan ons die getalle in \'n aftreksom omruil?'], s: [['78 − 20 = 58, but we cannot take 78 away from 20.', 'The order matters in subtraction, so it is false.'], ['78 − 20 = 58, maar ons kan nie 78 van 20 aftrek nie.', 'Die volgorde maak saak by aftrek, so dit is onwaar.']] },
    { en: '5 004 − 2 996 = ?', af: '5 004 − 2 996 = ?', a: '2008', lv: 'P', h: ['Count up from 2 996.', 'Tel op van 2 996 af.'], s: [['2 996 + 4 = 3 000', '3 000 + 2 004 = 5 004', '4 + 2 004 = 2 008'], ['2 996 + 4 = 3 000', '3 000 + 2 004 = 5 004', '4 + 2 004 = 2 008']] },
    { en: '___ + 237 = 1 396. What is the missing number?', af: '___ + 237 = 1 396. Wat is die ontbrekende getal?', a: '1159', lv: 'C', h: ['Use subtraction to undo the addition.', 'Gebruik aftrek om die optel ongedaan te maak.'], s: [['1 396 − 237 = 1 159', 'Check: 1 159 + 237 = 1 396'], ['1 396 − 237 = 1 159', 'Toets: 1 159 + 237 = 1 396']] },
    { en: 'Count backwards from 624 in 9s, four times. Where do you land?', af: 'Tel vier keer agtertoe van 624 af in 9\'e. Waar beland jy?', a: '588', lv: 'R', h: ['Take away 10 and add 1, four times.', 'Trek 10 af en tel 1 by, vier keer.'], s: [['624 → 615 → 606 → 597 → 588'], ['624 → 615 → 606 → 597 → 588']] }
  ],
  wb: { en: [{ t: 'Calculate. Check each answer by adding.', p: ['5 798 − 3 254', '4 312 − 1 875', '6 000 − 2 450'], m: [2, 3, 3] }, { t: 'Write the fact family for 312 + 145 = 457.', p: [''], m: [3] }],
        af: [{ t: 'Bereken. Toets elke antwoord deur op te tel.', p: ['5 798 − 3 254', '4 312 − 1 875', '6 000 − 2 450'], m: [2, 3, 3] }, { t: 'Skryf die feitefamilie vir 312 + 145 = 457.', p: [''], m: [3] }],
        ans: [['2 544', 'Check: 2 544 + 3 254 = 5 798', 'Toets: 2 544 + 3 254 = 5 798'], ['2 437', 'Break up a ten, a hundred and a thousand', 'Breek \'n tien, \'n honderd en \'n duisend op'], ['3 550', 'Count up from 2 450 to 6 000', 'Tel op van 2 450 tot 6 000'], ['145 + 312 = 457; 457 − 312 = 145; 457 − 145 = 312', '', '']] }
});

/* ───────────── 107 Word problems ───────────── */
TOPICS.push({
  id: 107, name: { en: 'Problem solving', af: 'Probleemoplossing' }, full: { en: 'Solving addition and subtraction problems', af: 'Optel- en aftrekprobleme oplos' },
  body: lang => {
    const en = lang === 'en';
    const P = en ? [
      { t: 'Nosipho has R18 more than Helen. Helen has R60. How much money does Nosipho have?', op: '+', a: 78, why: '<b>more than</b>', w: '60 + 18 = R78', s: 'child' },
      { t: 'A farmer had 1 108 sheep. He sold 359. How many sheep are left?', op: '-', a: 749, why: '<b>sold</b> and <b>left</b>', w: '1 108 − 359 = 749 sheep', s: 'sheep' },
      { t: 'A school has 1 245 girls and 1 187 boys. How many learners are there <b>altogether</b>?', op: '+', a: 2432, why: '<b>altogether</b>', w: '1 245 + 1 187 = 2 432 learners', s: 'child' },
      { t: 'A book has 312 pages. Thabo has read 175 pages. How many pages does he still have to read?', op: '-', a: 137, why: '<b>still have to</b> (what is left)', w: '312 − 175 = 137 pages', s: 'paper' },
      { t: 'A bakery sold 2 450 loaves on Monday and 1 875 on Tuesday. What is the <b>total</b>?', op: '+', a: 4325, why: '<b>total</b>', w: '2 450 + 1 875 = 4 325 loaves', s: 'bread-loaf' },
      { t: 'An elephant weighs 4 800 kg and a hippo weighs 1 500 kg. What is the <b>difference</b> in mass?', op: '-', a: 3300, why: '<b>difference</b>', w: '4 800 − 1 500 = 3 300 kg', s: 'elephant' }
    ] : [
      { t: 'Nosipho het R18 meer as Helen. Helen het R60. Hoeveel geld het Nosipho?', op: '+', a: 78, why: '<b>meer as</b>', w: '60 + 18 = R78', s: 'child' },
      { t: '\'n Boer het 1 108 skape gehad. Hy het 359 verkoop. Hoeveel skape is oor?', op: '-', a: 749, why: '<b>verkoop</b> en <b>oor</b>', w: '1 108 − 359 = 749 skape', s: 'sheep' },
      { t: '\'n Skool het 1 245 meisies en 1 187 seuns. Hoeveel leerders is daar <b>altesaam</b>?', op: '+', a: 2432, why: '<b>altesaam</b>', w: '1 245 + 1 187 = 2 432 leerders', s: 'child' },
      { t: '\'n Boek het 312 bladsye. Thabo het 175 bladsye gelees. Hoeveel bladsye moet hy nog lees?', op: '-', a: 137, why: '<b>nog</b> (wat oorbly)', w: '312 − 175 = 137 bladsye', s: 'paper' },
      { t: '\'n Bakkery het 2 450 brode op Maandag en 1 875 op Dinsdag verkoop. Wat is die <b>totaal</b>?', op: '+', a: 4325, why: '<b>totaal</b>', w: '2 450 + 1 875 = 4 325 brode', s: 'bread-loaf' },
      { t: '\'n Olifant weeg 4 800 kg en \'n seekoei weeg 1 500 kg. Wat is die <b>verskil</b> in massa?', op: '-', a: 3300, why: '<b>verskil</b>', w: '4 800 − 1 500 = 3 300 kg', s: 'elephant' }
    ];
    const L = en ? { title: 'Plus or Minus?', how: 'Read the problem. Do we add or subtract? Choose, then work out the answer.', problems: P, of: (a, b) => 'Problem ' + a + ' of ' + b, which: 'Do we add (+) or subtract (−)?', opRight: 'Yes!', opWrong: 'Think again.', why: w => 'The clue is ' + w + '. Now work out the answer.', solved: 'Correct!', notQuite: 'Not yet.' }
      : { title: 'Plus of minus?', how: 'Lees die probleem. Tel ons op of trek ons af? Kies, en werk dan die antwoord uit.', problems: P, of: (a, b) => 'Probleem ' + a + ' van ' + b, which: 'Tel ons op (+) of trek ons af (−)?', opRight: 'Ja!', opWrong: 'Dink weer.', why: w => 'Die leidraad is ' + w + '. Werk nou die antwoord uit.', solved: 'Reg!', notQuite: 'Nog nie.' };
    const markup = `<h4>🎮 ${L.title}</h4><p class="how">${L.how}</p><div class="score-pill" data-k="count" style="display:inline-block;margin-bottom:8px"></div><div class="g4-hero" data-k="card"></div><div class="g4-row" data-k="ops"><button class="g4-btn" data-op="+" style="font-size:24px;min-width:70px">+</button><button class="g4-btn" data-op="-" style="font-size:24px;min-width:70px">−</button></div><div class="g4-row" data-k="ansrow" style="display:none"><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="answer"><button class="g4-btn" data-k="check">${W[lang].check}</button></div><div class="g4-row"><button class="g4-btn ghost" data-k="next">${W[lang].next}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('elephant', 'Word problems tell a story. <strong>Key words</strong> help us decide whether to add or subtract.') +
      def('Key words', '<strong>Add (+):</strong> altogether, total, sum, more than, in all.<br><strong>Subtract (−):</strong> difference, left, less than, how many more, take away.') +
      ex('Steps to solve a problem', ['<strong>Read</strong> the problem twice.', '<strong>Decide</strong>: do we add or subtract?', '<strong>Estimate</strong> the answer by rounding.', '<strong>Calculate</strong> and write the answer with its unit (R, kg, sheep…).', '<strong>Check</strong>: is the answer close to your estimate?']) +
      simR('s107', S.s107, L, markup) + tip('Some problems need two steps. A farmer sold 359 of his 1 108 sheep, then bought 560: first 1 108 − 359 = 749, then 749 + 560 = 1 309.')
      : hero('elephant', 'Woordprobleme vertel \'n storie. <strong>Sleutelwoorde</strong> help ons besluit of ons optel of aftrek.') +
      def('Sleutelwoorde', '<strong>Tel op (+):</strong> altesaam, totaal, som, meer as, in alles.<br><strong>Trek af (−):</strong> verskil, oor, minder as, hoeveel meer, neem weg.') +
      ex('Stappe om \'n probleem op te los', ['<strong>Lees</strong> die probleem twee keer.', '<strong>Besluit</strong>: tel ons op of trek ons af?', '<strong>Skat</strong> die antwoord deur af te rond.', '<strong>Bereken</strong> en skryf die antwoord met sy eenheid (R, kg, skape…).', '<strong>Toets</strong>: is die antwoord naby aan jou skatting?']) +
      simR('s107', S.s107, L, markup) + tip('Party probleme het twee stappe nodig. \'n Boer het 359 van sy 1 108 skape verkoop en toe 560 gekoop: eers 1 108 − 359 = 749, dan 749 + 560 = 1 309.');
  },
  qs: [
    { en: 'Helen has R60. Nosipho has R18 more than Helen. How much money do they have <strong>altogether</strong>? (Rand)', af: 'Helen het R60. Nosipho het R18 meer as Helen. Hoeveel geld het hulle <strong>altesaam</strong>? (Rand)', a: '138', lv: 'P', h: ['First find how much Nosipho has.', 'Kry eers hoeveel Nosipho het.'], s: [['Nosipho: 60 + 18 = R78', 'Altogether: 60 + 78 = R138'], ['Nosipho: 60 + 18 = R78', 'Altesaam: 60 + 78 = R138']] },
    { en: 'A farmer had 1 108 sheep. He sold 359, then bought 560. How many sheep does he have now?', af: '\'n Boer het 1 108 skape gehad. Hy het 359 verkoop en toe 560 gekoop. Hoeveel skape het hy nou?', a: '1309', lv: 'P', h: ['Two steps: subtract the sold sheep, then add the new ones.', 'Twee stappe: trek die verkoopte skape af en tel dan die nuwes by.'], s: [['1 108 − 359 = 749', '749 + 560 = 1 309'], ['1 108 − 359 = 749', '749 + 560 = 1 309']] },
    { en: 'When 237 is added to a number, the answer is 1 396. What is the number?', af: 'As 237 by \'n getal getel word, is die antwoord 1 396. Wat is die getal?', a: '1159', lv: 'C', h: ['Undo the addition by subtracting.', 'Maak die optel ongedaan deur af te trek.'], s: [['1 396 − 237 = 1 159'], ['1 396 − 237 = 1 159']] },
    { en: 'Which word tells you to <strong>subtract</strong>?', af: 'Watter woord sê vir jou om <strong>af te trek</strong>?', o: [['altogether', 'total', 'difference', 'sum'], ['altesaam', 'totaal', 'verskil', 'som']], a: 2, lv: 'K', h: ['Which word means "how far apart"?', 'Watter woord beteken "hoe ver uitmekaar"?'], s: [['"Difference" means subtract.', 'Altogether, total and sum mean add.'], ['"Verskil" beteken aftrek.', 'Altesaam, totaal en som beteken optel.']] },
    { en: 'On Monday 2 345 people used a taxi rank. On Tuesday 2 870 people used it. How many <strong>more</strong> people used it on Tuesday?', af: 'Op Maandag het 2 345 mense \'n taxistaanplek gebruik. Op Dinsdag het 2 870 mense dit gebruik. Hoeveel <strong>meer</strong> mense het dit op Dinsdag gebruik?', a: '525', lv: 'R', h: ['"How many more" means find the difference.', '"Hoeveel meer" beteken kry die verskil.'], s: [['2 870 − 2 345 = 525'], ['2 870 − 2 345 = 525']] },
    { en: 'Lerato saved R1 250 in January and R875 in February. How much did she save in total? (Rand)', af: 'Lerato het R1 250 in Januarie en R875 in Februarie gespaar. Hoeveel het sy in totaal gespaar? (Rand)', a: '2125', lv: 'R', h: ['"In total" means add.', '"In totaal" beteken optel.'], s: [['1 250 + 875 = R2 125'], ['1 250 + 875 = R2 125']] },
    { en: 'What is the best estimate for 4 980 − 2 010?', af: 'Wat is die beste skatting vir 4 980 − 2 010?', o: [['2 000', '3 000', '7 000', '300'], ['2 000', '3 000', '7 000', '300']], a: 1, lv: 'C', h: ['Round each number to the nearest 1 000.', 'Rond elke getal af tot die naaste 1 000.'], s: [['4 980 ≈ 5 000 and 2 010 ≈ 2 000', '5 000 − 2 000 = 3 000'], ['4 980 ≈ 5 000 en 2 010 ≈ 2 000', '5 000 − 2 000 = 3 000']] },
    { en: 'A school has raised R3 400. It needs R5 000 for new books. How much more does it need? (Rand)', af: '\'n Skool het R3 400 ingesamel. Dit het R5 000 nodig vir nuwe boeke. Hoeveel meer het dit nodig? (Rand)', a: '1600', lv: 'R', h: ['Count up from 3 400 to 5 000.', 'Tel op van 3 400 tot 5 000.'], s: [['3 400 + 600 = 4 000', '4 000 + 1 000 = 5 000', '600 + 1 000 = R1 600'], ['3 400 + 600 = 4 000', '4 000 + 1 000 = 5 000', '600 + 1 000 = R1 600']] }
  ],
  wb: { en: [{ t: 'Solve each problem. Write a number sentence and the answer.', p: ['A shop had 2 450 apples. It sold 1 375. How many are left?', 'Sipho walked 1 250 m to school and 1 480 m home by another road. How far did he walk altogether?', 'A truck can carry 5 000 kg. It already has 3 275 kg on it. How many more kilograms can it carry?'], m: [2, 2, 2] }],
        af: [{ t: 'Los elke probleem op. Skryf \'n getallesin en die antwoord.', p: ['\'n Winkel het 2 450 appels gehad. Dit het 1 375 verkoop. Hoeveel is oor?', 'Sipho het 1 250 m skool toe geloop en 1 480 m langs \'n ander pad huis toe. Hoe ver het hy altesaam geloop?', '\'n Vragmotor kan 5 000 kg dra. Daar is reeds 3 275 kg op. Hoeveel meer kilogram kan dit dra?'], m: [2, 2, 2] }],
        ans: [['2 450 − 1 375 = 1 075 apples', '"left" means subtract', '"oor" beteken aftrek'], ['1 250 + 1 480 = 2 730 m', '"altogether" means add', '"altesaam" beteken optel'], ['5 000 − 3 275 = 1 725 kg', 'Count up from 3 275', 'Tel op van 3 275 af']] }
});

/* ───────────── Write the files ───────────── */
const CH = { en: 'Whole Numbers', af: 'Heelgetalle' }, SUB = { en: (n) => 'Chapter 1 · Topic ' + n, af: (n) => 'Hoofstuk 1 · Onderwerp ' + n };
function chapter(lang) {
  const topics = TOPICS.map((t, i) => ({
    id: t.id, chapter: 1, name: t.name[lang], fullName: t.full[lang],
    lesson: { heading: t.full[lang], sub: SUB[lang](i + 1), body: t.body(lang) },
    questions: t.qs.map(q => q.o ? { type: 'mc', text: q[lang], options: q.o[lang === 'en' ? 0 : 1], answer: q.a, topic: t.name[lang] } : { type: 'input', text: q[lang], answer: q.a, topic: t.name[lang] })
  }));
  let qn = 0;
  const wbTopics = [], akTopics = [];
  TOPICS.forEach(t => {
    const qs = [], ans = []; let ai = 0;
    t.wb[lang].forEach(w => {
      qn++;
      qs.push({ num: String(qn), text: w.t, parts: w.p.map((p, j) => ({ label: w.p.length > 1 ? String.fromCharCode(97 + j) + ')' : '', text: p, marks: w.m[j] })) });
      w.p.forEach((_, j) => { const a = t.wb.ans[ai++]; ans.push({ num: 'Q' + qn + (w.p.length > 1 ? String.fromCharCode(97 + j) : ''), ans: a[0], note: lang === 'en' ? a[1] : a[2] }); });
    });
    wbTopics.push({ name: t.name[lang], questions: qs }); akTopics.push({ name: t.name[lang], answers: ans });
  });
  return { topics, workbook: { chapter: 1, chapterName: CH[lang], topics: wbTopics }, answerKey: { chapter: 1, chapterName: (lang === 'en' ? 'Chapter 1 — ' : 'Hoofstuk 1 — ') + CH[lang], topics: akTopics } };
}
for (const lang of ['en', 'af']) {
  const data = chapter(lang);
  const head = `// Math Magician — Grade 4, Chapter 1 (${CH[lang]})${lang === 'af' ? ' — Afrikaans' : ''}\n// Generated from one bilingual source (gen_ch1.js); edit both languages together.\n`;
  fs.writeFileSync(path.join(OUT, lang === 'en' ? 'ch1.js' : 'ch1.af.js'), head + 'MathMagician.registerChapter(1, ' + JSON.stringify(data, null, 1) + ');\n');
}
const help = {};
TOPICS.forEach(t => {
  help[t.id] = t.qs.map(q => {
    const qq = q.o ? { type: 'mc', options: q.o[0], answer: q.a } : { type: 'input', answer: q.a };
    return [q.lv, fp(qq), q.h[0], q.h[1], q.s[0], q.s[1]];
  });
});
fs.writeFileSync(path.join(OUT, 'ch1.help.js'), '/* Hints, worked solutions and CAPS cognitive levels for Grade 4, chapter 1 practice questions.\n   Entry: [level, fingerprint, hint EN, hint AF, steps EN, steps AF]. Levels: K knowledge, R routine, C complex, P problem solving. */\nMMHelp.add(4, 1, ' + JSON.stringify(help, null, 1) + ');\n');
console.log('wrote ch1.js, ch1.af.js, ch1.help.js;', TOPICS.length, 'topics,', TOPICS.reduce((a, t) => a + t.qs.length, 0), 'questions');
