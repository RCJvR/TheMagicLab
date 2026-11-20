// Grade 4 Math Magician, Chapter 8: Financial mathematics (one bilingual source).
// Run: node scripts/math-gr4/gen_ch8.js   (writes math-magician/gr4/ch8.js, ch8.af.js, ch8.help.js)
// CAPS 1.6 (Term 3): convert between rand and cents, change, buying, selling and simple budgets, money problems.
// Notes on the CAPS draft:
//   - Grade 4 has no decimals yet. "R5,50" is used only as the way money is written (rand, comma, two digits
//     of cents); every calculation is explained in whole cents (550c) or whole rand, never as decimal arithmetic.
//   - The draft example (Modise: 3 books at R5,50, 2 pencils at R2,25, a ruler at R3,75, change from R30) was checked:
//     total R24,75, change R5,25. It is used as written, without the pronoun.
//   - The draft lists one topic; it is split into four lessons: rand and cents, change, buying/selling/budgets, problems.
const { ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT } = require('./lib.js');
const S = require('./sims_ch8.js');
const T = [];
const same = s => [[s], [s]];

/* ───────────── Figures ───────────── */
const svgw = (vb, body, mw) => `<svg viewBox="${vb}" style="display:block;width:100%;max-width:${mw || 300}px;margin:12px auto" role="img" aria-hidden="true">${body}</svg>`;
const NOTE = { 1000: '#15803d', 2000: '#92400e', 5000: '#b91c1c', 10000: '#1d4ed8', 20000: '#c2410c' };
const lab = v => v >= 100 ? 'R' + v / 100 : v + 'c';
// A row of SA money (values in cents), biggest first.
function money(vals) {
  let x = 4, g = '';
  vals.forEach(v => {
    if (v >= 1000) { g += `<rect x="${x}" y="6" width="92" height="50" rx="6" fill="${NOTE[v]}" stroke="rgba(255,255,255,.55)" stroke-width="2"/><text x="${x + 46}" y="38" text-anchor="middle" fill="#fff" font-size="20" font-weight="900" font-family="sans-serif">${lab(v)}</text>`; x += 100; }
    else { const r = v >= 100 ? 25 : 21; g += `<circle cx="${x + r}" cy="31" r="${r}" fill="${v >= 100 ? '#cbd5e1' : '#d97706'}" stroke="${v >= 100 ? '#64748b' : '#92400e'}" stroke-width="3"/><text x="${x + r}" y="37" text-anchor="middle" fill="#111" font-size="${v >= 100 ? 16 : 14}" font-weight="900" font-family="sans-serif">${lab(v)}</text>`; x += 2 * r + 8; }
  });
  return svgw(`0 0 ${x} 62`, g, Math.min(340, x * 0.9));
}
// A small price list / budget table.
const tbl = (rows, head) => `<table style="border-collapse:collapse;margin:12px auto;font-size:18px">${rows.map((r, i) => `<tr>${r.map((c, j) => `<td style="padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);${j ? 'text-align:right;' : ''}${head && i === 0 ? 'font-weight:800' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table>`;

/* ───────────── 801 Rand and cents ───────────── */
T.push({
  id: 801, name: { en: 'Rand and cents', af: 'Rand en sent' }, full: { en: 'Rand and cents: coins, notes and converting', af: 'Rand en sent: munte, note en omskakeling' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { empty: 'The purse is empty.', total: (r, c) => 'In the purse: <b>' + r + '</b> = ' + window.G4.fmt(c) + 'c', goal: r => 'Make exactly ' + r, ask: 'Tap coins and notes to put them in the purse. Tap money in the purse to take it out again.', yes: (r, c, list) => 'Exactly right! ' + list + ' = <b>' + r + '</b> = ' + window.G4.fmt(c) + 'c.', more: r => 'Not enough yet. You need ' + r + ' more.', less: r => 'Too much! Take out ' + r + '.' }
      : { empty: 'Die beursie is leeg.', total: (r, c) => 'In die beursie: <b>' + r + '</b> = ' + window.G4.fmt(c) + 'c', goal: r => 'Maak presies ' + r, ask: 'Tik op munte en note om hulle in die beursie te sit. Tik op geld in die beursie om dit weer uit te haal.', yes: (r, c, list) => 'Presies reg! ' + list + ' = <b>' + r + '</b> = ' + window.G4.fmt(c) + 'c.', more: r => 'Nog nie genoeg nie. Jy het nog ' + r + ' nodig.', less: r => 'Te veel! Haal ' + r + ' uit.' };
    const m = `<h4>🎮 ${en ? 'Fill the Purse' : 'Vul die Beursie'}</h4><p class="how">${en ? 'Make the amount with South African coins and notes. Start with the biggest money that fits.' : 'Maak die bedrag met Suid-Afrikaanse munte en note. Begin met die grootste geld wat pas.'}</p><div class="g4-big" data-k="goal" style="font-size:24px"></div><div class="g4-row" data-k="pal" style="gap:8px"></div><div class="g4-stage" style="padding:12px"><div class="g4-row" data-k="tray" style="gap:6px;min-height:58px;margin:0"></div></div><div data-k="sum" style="font-size:19px"></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="clear">${en ? 'Empty purse' : 'Maak leeg'}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('sa-flag', 'South African money is counted in <strong>rand (R)</strong> and <strong>cents (c)</strong>. There are <strong>100 cents in 1 rand</strong>.') +
      def('Rand and cents', '<strong>R1 = 100c</strong>. We write <strong>R5,50</strong> for 5 rand and 50 cents. The comma separates the rand from the cents, and the cents always have two digits. Coins: 10c, 20c, 50c, R1, R2 and R5. Notes: R10, R20, R50, R100 and R200.') + money([10000, 5000, 2000, 1000]) + money([500, 200, 100, 50, 20, 10]) +
      ex('Converting', ['Rand to cents: there are 100 cents in every rand. R7 = 700c. R5,50 = 500c + 50c = <strong>550c</strong>.', 'Cents to rand: 250c = 200c + 50c = <strong>R2,50</strong>.', '85c = R0,85. 1 205c = R12,05 (5 cents is written as 05).']) +
      sim('g4-s801', S.s801, L, m) + tip('Count money from the biggest note or coin to the smallest. It is quicker and you make fewer mistakes.')
      : hero('sa-flag', 'Suid-Afrikaanse geld word in <strong>rand (R)</strong> en <strong>sent (c)</strong> getel. Daar is <strong>100 sent in 1 rand</strong>.') +
      def('Rand en sent', '<strong>R1 = 100c</strong>. Ons skryf <strong>R5,50</strong> vir 5 rand en 50 sent. Die komma skei die rand van die sent, en die sent het altyd twee syfers. Munte: 10c, 20c, 50c, R1, R2 en R5. Note: R10, R20, R50, R100 en R200.') + money([10000, 5000, 2000, 1000]) + money([500, 200, 100, 50, 20, 10]) +
      ex('Omskakel', ['Rand na sent: daar is 100 sent in elke rand. R7 = 700c. R5,50 = 500c + 50c = <strong>550c</strong>.', 'Sent na rand: 250c = 200c + 50c = <strong>R2,50</strong>.', '85c = R0,85. 1 205c = R12,05 (5 sent word as 05 geskryf).']) +
      sim('g4-s801', S.s801, L, m) + tip('Tel geld van die grootste noot of munt na die kleinste. Dit is vinniger en jy maak minder foute.');
  },
  qs: [
    { en: 'R4 = ? cents', af: 'R4 = ? sent', a: '400', lv: 'K', h: ['Each rand is 100 cents.', 'Elke rand is 100 sent.'], s: same('4 × 100 = 400c') },
    { en: 'R5,50 = ? cents', af: 'R5,50 = ? sent', a: '550', lv: 'R', h: ['5 rand and 50 cents.', '5 rand en 50 sent.'], s: same('500c + 50c = 550c') },
    { en: 'Write 350c in rand.', af: 'Skryf 350c in rand.', a: 'R3,50', lv: 'R', h: ['300c is R3.', '300c is R3.'], s: same('300c + 50c = R3 + 50c = R3,50') },
    { en: 'How many cents are in R1?', af: 'Hoeveel sent is in R1?', o: [['100', '10', '1 000', '50'], ['100', '10', '1 000', '50']], a: 0, lv: 'K', h: ['Think of ten 10c coins.', 'Dink aan tien 10c-munte.'], s: same('R1 = 100c') },
    { en: 'How much money is this altogether (in rand)?' + money([2000, 500, 200, 50, 20]), af: 'Hoeveel geld is dit altesaam (in rand)?' + money([2000, 500, 200, 50, 20]), a: 'R27,70', lv: 'C', h: ['Add the rand first, then the cents.', 'Tel eers die rand bymekaar, dan die sent.'], s: [['R20 + R5 + R2 = R27', '50c + 20c = 70c', 'R27 and 70c = R27,70'], ['R20 + R5 + R2 = R27', '50c + 20c = 70c', 'R27 en 70c = R27,70']] },
    { en: 'Which is more?', af: 'Watter een is meer?', o: [['350c', 'R3,05', 'They are the same'], ['350c', 'R3,05', 'Hulle is dieselfde']], a: 0, lv: 'C', h: ['Write both in cents.', 'Skryf albei in sent.'], s: [['R3,05 = 305c, and 350c is more than 305c.'], ['R3,05 = 305c, en 350c is meer as 305c.']] },
    { en: 'Write 1 205c in rand.', af: 'Skryf 1 205c in rand.', a: 'R12,05', lv: 'C', h: ['1 200c is R12. What is left?', '1 200c is R12. Wat bly oor?'], s: same('1 200c + 5c = R12 + 5c = R12,05') },
    { en: 'Lebo has three R5 coins and four 50c coins. How much money is that (in rand)?' + money([500, 500, 500, 50, 50, 50, 50]), af: 'Lebo het drie R5-munte en vier 50c-munte. Hoeveel geld is dit (in rand)?' + money([500, 500, 500, 50, 50, 50, 50]), a: 'R17', lv: 'P', h: ['Two 50c coins make R1.', 'Twee 50c-munte maak R1.'], s: same('3 × R5 = R15; 4 × 50c = 200c = R2; R15 + R2 = R17') }
  ],
  wb: {
    en: [{ t: 'Write in cents.', p: ['R8', 'R6,40', 'R12,05'], m: [1, 1, 1] },
      { t: 'Write in rand.', p: ['300c', '475c', '90c'], m: [1, 1, 1] },
      { t: 'Write down which coins and notes you could use to pay exactly:', p: ['R37,50', 'R8,90, using as few coins as possible'], m: [2, 2] }],
    af: [{ t: 'Skryf in sent.', p: ['R8', 'R6,40', 'R12,05'], m: [1, 1, 1] },
      { t: 'Skryf in rand.', p: ['300c', '475c', '90c'], m: [1, 1, 1] },
      { t: 'Skryf neer watter munte en note jy kan gebruik om presies te betaal:', p: ['R37,50', 'R8,90, met so min munte as moontlik'], m: [2, 2] }],
    ans: [['800c', '8 × 100', '8 × 100'], ['640c', '600c + 40c', '600c + 40c'], ['1 205c', '1 200c + 5c', '1 200c + 5c'],
      ['R3,00', '', ''], ['R4,75', '400c + 75c', '400c + 75c'], ['R0,90', '', ''],
      ['R20 + R10 + R5 + R2 + 50c', 'One possible answer.', 'Een moontlike antwoord.'], ['R5 + R2 + R1 + 50c + 20c + 20c', '6 coins', '6 munte']]
  }
});

/* ───────────── 802 Giving change ───────────── */
T.push({
  id: 802, name: { en: 'Giving change', af: 'Kleingeld gee' }, full: { en: 'Shopping: working out change', af: 'Inkopies: kleingeld uitwerk' },
  body: lang => {
    const en = lang === 'en';
    const items = en ? [{ n: 'a loaf of bread', s: 'bread-loaf' }, { n: 'a bag of apples', s: 'apple' }, { n: 'a carton of milk', s: 'milk' }, { n: 'an ice cream', s: 'ice-cream' }, { n: 'a slab of chocolate', s: 'chocolate' }, { n: 'a tub of butter', s: 'butter' }]
      : [{ n: '\'n brood', s: 'bread-loaf' }, { n: '\'n sak appels', s: 'apple' }, { n: '\'n karton melk', s: 'milk' }, { n: '\'n roomys', s: 'ice-cream' }, { n: '\'n staaf sjokolade', s: 'chocolate' }, { n: '\'n bak botter', s: 'butter' }];
    const L = en ? { items, sale: (n, p, paid) => 'A customer buys ' + n + ' for <b>' + p + '</b> and pays with <b>' + paid + '</b>. Give the change!', empty: 'No change given yet.', ask: 'Tap coins and notes to count on from the price up to the money paid.', yes: (ch, p, paid) => 'Correct! The change is <b>' + ch + '</b>. Check: ' + p + ' + ' + ch + ' = ' + paid + '.', short: (d, reached, paid) => 'You have counted up to ' + reached + ', but the customer paid ' + paid + '. Give ' + d + ' more.', over: (d, reached, paid) => 'Too much! You counted up to ' + reached + ', past ' + paid + '. Take back ' + d + '.' }
      : { items, sale: (n, p, paid) => '\'n Klant koop ' + n + ' vir <b>' + p + '</b> en betaal met <b>' + paid + '</b>. Gee die kleingeld!', empty: 'Nog geen kleingeld gegee nie.', ask: 'Tik op munte en note om van die prys op te tel tot by die geld wat betaal is.', yes: (ch, p, paid) => 'Reg! Die kleingeld is <b>' + ch + '</b>. Toets: ' + p + ' + ' + ch + ' = ' + paid + '.', short: (d, reached, paid) => 'Jy het tot by ' + reached + ' getel, maar die klant het ' + paid + ' betaal. Gee nog ' + d + '.', over: (d, reached, paid) => 'Te veel! Jy het tot by ' + reached + ' getel, verby ' + paid + '. Vat ' + d + ' terug.' };
    const m = `<h4>🎮 ${en ? 'Shop Till' : 'Winkelkasregister'}</h4><p class="how">${en ? 'You are the shopkeeper. Count on from the price with coins and notes until you reach the money the customer paid.' : 'Jy is die winkelier. Tel met munte en note op van die prys af totdat jy by die geld kom wat die klant betaal het.'}</p><div class="g4-hero" style="margin:4px 0 8px"><span data-k="stk"></span><p data-k="sale" style="font-size:19px"></p></div><div class="g4-row" data-k="pal" style="gap:8px"></div><div class="g4-stage" style="padding:12px"><div class="g4-row" data-k="tray" style="gap:6px;min-height:58px;margin:0"></div></div><div data-k="line" style="font-size:18px;font-variant-numeric:tabular-nums"></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="clear">${en ? 'Start again' : 'Begin weer'}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('bread-loaf', 'When you pay more than the price, the shopkeeper gives you <strong>change</strong>. Change = money paid − price.') +
      def('Two ways to find change', '<strong>Subtract:</strong> money paid − price. <strong>Count on</strong>, like a shopkeeper: start at the price and add coins until you reach the money paid.') +
      ex('A loaf of bread costs R16,50. You pay with a R20 note.', ['Count on from R16,50: + 50c makes R17, + R1 makes R18, + R2 makes R20.', 'Change = 50c + R1 + R2 = <strong>R3,50</strong>.', 'Check by subtracting in cents: 2 000c − 1 650c = 350c = R3,50.']) +
      sim('g4-s802', S.s802, L, m) + tip('Always check your change: price + change must equal the money you paid.')
      : hero('bread-loaf', 'As jy meer as die prys betaal, gee die winkelier vir jou <strong>kleingeld</strong>. Kleingeld = geld betaal − prys.') +
      def('Twee maniere om kleingeld te vind', '<strong>Trek af:</strong> geld betaal − prys. <strong>Tel op</strong>, soos \'n winkelier: begin by die prys en tel munte by totdat jy by die geld kom wat betaal is.') +
      ex('\'n Brood kos R16,50. Jy betaal met \'n R20-noot.', ['Tel op van R16,50: + 50c maak R17, + R1 maak R18, + R2 maak R20.', 'Kleingeld = 50c + R1 + R2 = <strong>R3,50</strong>.', 'Toets deur in sent af te trek: 2 000c − 1 650c = 350c = R3,50.']) +
      sim('g4-s802', S.s802, L, m) + tip('Kontroleer altyd jou kleingeld: prys + kleingeld moet gelyk wees aan die geld wat jy betaal het.');
  },
  qs: [
    { en: 'A pen costs R7. You pay with R10. How much change do you get?', af: '\'n Pen kos R7. Jy betaal met R10. Hoeveel kleingeld kry jy?', a: 'R3', lv: 'K', h: ['R10 − R7', 'R10 − R7'], s: same('R10 − R7 = R3') },
    { en: 'Bread costs R16,50. You pay with a R20 note. How much change do you get?' + money([2000]), af: 'Brood kos R16,50. Jy betaal met \'n R20-noot. Hoeveel kleingeld kry jy?' + money([2000]), a: 'R3,50', lv: 'R', h: ['Count on from R16,50 to R20.', 'Tel op van R16,50 tot R20.'], s: same('R16,50 + 50c = R17; R17 + R3 = R20; 50c + R3 = R3,50') },
    { en: 'A T-shirt costs R34. You pay with R50. How much change do you get?' + money([5000]), af: '\'n T-hemp kos R34. Jy betaal met R50. Hoeveel kleingeld kry jy?' + money([5000]), a: 'R16', lv: 'R', h: ['R50 − R34', 'R50 − R34'], s: same('R50 − R34 = R16') },
    { en: 'A book costs R12,75. You pay with R20. How much change do you get?', af: '\'n Boek kos R12,75. Jy betaal met R20. Hoeveel kleingeld kry jy?', a: 'R7,25', lv: 'C', h: ['Work in cents: 2 000c − 1 275c.', 'Werk in sent: 2 000c − 1 275c.'], s: same('2 000c − 1 275c = 725c = R7,25') },
    { en: 'You must give 80c change. Which coins use the fewest coins?', af: 'Jy moet 80c kleingeld gee. Watter munte gebruik die minste munte?', o: [['50c + 20c + 10c', '20c + 20c + 20c + 20c', '50c + 10c + 10c + 10c', 'eight 10c coins'], ['50c + 20c + 10c', '20c + 20c + 20c + 20c', '50c + 10c + 10c + 10c', 'agt 10c-munte']], a: 0, lv: 'R', h: ['Start with the biggest coin that fits.', 'Begin met die grootste munt wat pas.'], s: [['50c + 20c + 10c = 80c uses only 3 coins.'], ['50c + 20c + 10c = 80c gebruik net 3 munte.']] },
    { en: 'You buy an apple for R4,50 and a juice for R8. You pay with R20. How much change do you get?' + money([2000]), af: 'Jy koop \'n appel vir R4,50 en \'n sap vir R8. Jy betaal met R20. Hoeveel kleingeld kry jy?' + money([2000]), a: 'R7,50', lv: 'C', h: ['First find the total cost.', 'Vind eers die totale koste.'], s: same('R4,50 + R8 = R12,50; R20 − R12,50 = R7,50') },
    { en: 'Sipho paid with R50 and got R6 change. How much did he spend?', af: 'Sipho het met R50 betaal en R6 kleingeld gekry. Hoeveel het hy spandeer?', a: 'R44', lv: 'P', h: ['Price + change = money paid.', 'Prys + kleingeld = geld betaal.'], s: same('R50 − R6 = R44') },
    { en: 'Something costs R23,40. The customer pays with R50 and gets R26,60 change. Is the change correct?', af: 'Iets kos R23,40. Die klant betaal met R50 en kry R26,60 kleingeld. Is die kleingeld reg?', o: [['Yes', 'No'], ['Ja', 'Nee']], a: 0, lv: 'P', h: ['Add the price and the change.', 'Tel die prys en die kleingeld bymekaar.'], s: [['R23,40 + R26,60 = R50, so the change is correct.'], ['R23,40 + R26,60 = R50, so die kleingeld is reg.']] }
  ],
  wb: {
    en: [{ t: 'Work out the change.', p: ['Price R8, paid with R10', 'Price R27, paid with R50', 'Price R14,50, paid with R20', 'Price R63,20, paid with R100'], m: [1, 1, 2, 2] },
      { t: 'Nomsa buys a pen for R12,50 and pays with a R20 note.', p: ['How much change does Nomsa get?', 'Write down which coins the shopkeeper could give.'], m: [2, 2] },
      { t: 'Tom paid with a R50 note and got R13,50 change.', p: ['How much did Tom spend?'], m: [2] }],
    af: [{ t: 'Werk die kleingeld uit.', p: ['Prys R8, betaal met R10', 'Prys R27, betaal met R50', 'Prys R14,50, betaal met R20', 'Prys R63,20, betaal met R100'], m: [1, 1, 2, 2] },
      { t: 'Nomsa koop \'n pen vir R12,50 en betaal met \'n R20-noot.', p: ['Hoeveel kleingeld kry Nomsa?', 'Skryf neer watter munte die winkelier kan gee.'], m: [2, 2] },
      { t: 'Tom het met \'n R50-noot betaal en R13,50 kleingeld gekry.', p: ['Hoeveel het Tom spandeer?'], m: [2] }],
    ans: [['R2', '', ''], ['R23', 'R50 − R27', 'R50 − R27'], ['R5,50', '2 000c − 1 450c = 550c', '2 000c − 1 450c = 550c'], ['R36,80', '10 000c − 6 320c = 3 680c', '10 000c − 6 320c = 3 680c'],
      ['R7,50', 'R20 − R12,50', 'R20 − R12,50'], ['R5 + R2 + 50c', 'One possible answer.', 'Een moontlike antwoord.'],
      ['R36,50', 'R50 − R13,50', 'R50 − R13,50']]
  }
});

/* ───────────── 803 Buying, selling and budgets ───────────── */
T.push({
  id: 803, name: { en: 'Budgets and profit', af: 'Begrotings en wins' }, full: { en: 'Buying, selling and simple budgets', af: 'Koop, verkoop en eenvoudige begrotings' },
  body: lang => {
    const en = lang === 'en';
    const items = (en ? ['Bread', 'Milk', 'Apple', 'Banana', 'Juice', 'Chocolate', 'Ice cream', 'Mealie'] : ['Brood', 'Melk', 'Appel', 'Piesang', 'Sap', 'Sjokolade', 'Roomys', 'Mielie'])
      .map((n, i) => ({ n, s: ['bread-loaf', 'milk', 'apple', 'banana', 'juice-box', 'chocolate', 'ice-cream', 'mealie'][i], p: [1650, 1800, 450, 350, 900, 1250, 1500, 600][i] }));
    const L = en ? { items, and: ' and ', mustTag: 'must buy', live: (s, l) => 'Spent: <b>' + s + '</b> · Left: <b>' + l + '</b>', task: (b, list) => 'You have <b>' + b + '</b>. You must buy ' + list + '. Then add more things, but do not go over your budget. Keep going until nothing else fits.', ask: 'Tap items to put them in your basket or take them out. Then tap Check.', missing: list => 'You still have to buy ' + list + '. The things you need come first!', over: d => 'Over budget by ' + d + '. Take something out.', more: (left, n, p) => 'You are within your budget with ' + left + ' left, but you can still afford ' + n + ' (' + p + ').', yes: (s, b, left) => 'Great budgeting! You spent ' + s + ' of ' + b + ' and have ' + left + ' left. Nothing else fits.' }
      : { items, and: ' en ', mustTag: 'moet koop', live: (s, l) => 'Spandeer: <b>' + s + '</b> · Oor: <b>' + l + '</b>', task: (b, list) => 'Jy het <b>' + b + '</b>. Jy moet ' + list + ' koop. Voeg dan nog dinge by, maar moenie oor jou begroting gaan nie. Gaan aan totdat niks anders meer pas nie.', ask: 'Tik op items om hulle in jou mandjie te sit of uit te haal. Tik dan op Toets.', missing: list => 'Jy moet nog ' + list + ' koop. Die dinge wat jy nodig het, kom eerste!', over: d => 'Oor die begroting met ' + d + '. Haal iets uit.', more: (left, n, p) => 'Jy is binne jou begroting met ' + left + ' oor, maar jy kan nog ' + n + ' (' + p + ') bekostig.', yes: (s, b, left) => 'Uitstekende begroting! Jy het ' + s + ' van ' + b + ' spandeer en het ' + left + ' oor. Niks anders pas meer nie.' };
    const m = `<h4>🎮 ${en ? 'Tuck Shop Budget' : 'Snoepiewinkel-begroting'}</h4><p class="how">${en ? 'Plan your shopping. Buy what you must have first, then use what is left without going over.' : 'Beplan jou inkopies. Koop eers wat jy moet hê en gebruik dan wat oorbly sonder om oor te gaan.'}</p><div data-k="task" style="font-size:19px;margin-bottom:8px"></div><div class="g4-row" data-k="shop" style="gap:8px;justify-content:center"></div><div class="g4-big" data-k="live" style="font-size:20px"></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('ice-cream', 'A <strong>budget</strong> is a plan for spending your money so that you do not spend more than you have. When you sell something for more than it cost you, you make a <strong>profit</strong>.') +
      def('Words to know', '<strong>Cost price:</strong> what you pay for something. <strong>Selling price:</strong> what you sell it for. <strong>Profit</strong> = selling price − cost price. <strong>Budget:</strong> a list of what you plan to spend, compared with the money you have.') +
      ex('Selling oranges', ['Thandi buys 10 oranges for R20 and sells each one for R3.', 'She sells all 10 for 10 × R3 = R30.', 'Profit = R30 − R20 = <strong>R10</strong>.']) +
      ex('A budget of R50', ['Bread R16 + milk R18 + apples R10 = <strong>R44</strong>.', 'R50 − R44 = <strong>R6</strong> left over.', 'R6 is not enough for juice at R9, so the juice must wait for next time.']) +
      sim('g4-s803', S.s803, L, m) + tip('Write down the things you <em>need</em> first. Then see what is left for the things you would <em>like</em>.')
      : hero('ice-cream', '\'n <strong>Begroting</strong> is \'n plan om jou geld so te spandeer dat jy nie meer uitgee as wat jy het nie. As jy iets verkoop vir meer as wat dit jou gekos het, maak jy \'n <strong>wins</strong>.') +
      def('Woorde om te ken', '<strong>Kosprys:</strong> wat jy vir iets betaal. <strong>Verkoopprys:</strong> waarvoor jy dit verkoop. <strong>Wins</strong> = verkoopprys − kosprys. <strong>Begroting:</strong> \'n lys van wat jy beplan om te spandeer, vergelyk met die geld wat jy het.') +
      ex('Lemoene verkoop', ['Thandi koop 10 lemoene vir R20 en verkoop elkeen vir R3.', 'Sy verkoop al 10 vir 10 × R3 = R30.', 'Wins = R30 − R20 = <strong>R10</strong>.']) +
      ex('\'n Begroting van R50', ['Brood R16 + melk R18 + appels R10 = <strong>R44</strong>.', 'R50 − R44 = <strong>R6</strong> oor.', 'R6 is nie genoeg vir sap teen R9 nie, so die sap moet tot volgende keer wag.']) +
      sim('g4-s803', S.s803, L, m) + tip('Skryf eers die dinge neer wat jy <em>nodig</em> het. Kyk dan wat oorbly vir die dinge wat jy <em>graag wil hê</em>.');
  },
  qs: [
    { en: 'Your budget is R50. You spend R36. How much is left?', af: 'Jou begroting is R50. Jy spandeer R36. Hoeveel bly oor?', a: 'R14', lv: 'K', h: ['R50 − R36', 'R50 − R36'], s: same('R50 − R36 = R14') },
    { en: 'A shop buys a cap for R15 and sells it for R22. What is the profit?', af: '\'n Winkel koop \'n pet vir R15 en verkoop dit vir R22. Wat is die wins?', a: 'R7', lv: 'R', h: ['Profit = selling price − cost price.', 'Wins = verkoopprys − kosprys.'], s: same('R22 − R15 = R7') },
    { en: 'Apples cost R2 each. How much do 6 apples cost?', af: 'Appels kos R2 elk. Hoeveel kos 6 appels?', a: 'R12', lv: 'R', h: ['6 × R2', '6 × R2'], s: same('6 × R2 = R12') },
    { en: 'What does profit mean?', af: 'Wat beteken wins?', o: [['selling price − cost price', 'cost price − selling price', 'cost price + selling price', 'the price of one item'], ['verkoopprys − kosprys', 'kosprys − verkoopprys', 'kosprys + verkoopprys', 'die prys van een item']], a: 0, lv: 'K', h: ['You make a profit when you sell for more than you paid.', 'Jy maak \'n wins as jy vir meer verkoop as wat jy betaal het.'], s: [['Profit = selling price − cost price.'], ['Wins = verkoopprys − kosprys.']] },
    { en: 'Your budget is R30. Is it enough for these two things?' + tbl([['Bread', 'R16,50'], ['Milk', 'R11,00']]), af: 'Jou begroting is R30. Is dit genoeg vir hierdie twee dinge?' + tbl([['Brood', 'R16,50'], ['Melk', 'R11,00']]), o: [['Yes, with R2,50 left', 'No, R2,50 short', 'Yes, with R3,50 left', 'No, R3,50 short'], ['Ja, met R2,50 oor', 'Nee, R2,50 kort', 'Ja, met R3,50 oor', 'Nee, R3,50 kort']], a: 0, lv: 'C', h: ['Add the prices, then compare with R30.', 'Tel die pryse bymekaar en vergelyk dan met R30.'], s: same('R16,50 + R11 = R27,50; R30 − R27,50 = R2,50') },
    { en: 'Ayanda buys a packet of 12 sweets for R18 and sells each sweet for R2. What is the profit if all the sweets are sold?', af: 'Ayanda koop \'n pakkie van 12 lekkers vir R18 en verkoop elke lekker vir R2. Wat is die wins as al die lekkers verkoop word?', a: 'R6', lv: 'C', h: ['First find how much all 12 sell for.', 'Vind eers waarvoor al 12 verkoop.'], s: same('12 × R2 = R24; R24 − R18 = R6') },
    { en: 'You get R40 pocket money for the week. You spend R12 on Monday and R15 on Wednesday. How much is left?', af: 'Jy kry R40 sakgeld vir die week. Jy spandeer R12 op Maandag en R15 op Woensdag. Hoeveel bly oor?', a: 'R13', lv: 'R', h: ['Add what you spent, then subtract from R40.', 'Tel op wat jy spandeer het en trek dit dan van R40 af.'], s: same('R12 + R15 = R27; R40 − R27 = R13') },
    { en: 'Zola has R100. Zola wants shoes for R85 and socks for R25. How much more money is needed?', af: 'Zola het R100. Zola wil skoene vir R85 en sokkies vir R25 hê. Hoeveel meer geld is nodig?', a: 'R10', lv: 'P', h: ['Find the total first.', 'Vind eers die totaal.'], s: same('R85 + R25 = R110; R110 − R100 = R10') }
  ],
  wb: {
    en: [{ t: 'Your class has R60 for a party. This is the plan:' + tbl([['Item', 'Price'], ['Cooldrink', 'R24'], ['Chips', 'R18'], ['Sweets', 'R12']], true), p: ['What is the total?', 'How much is left from R60?'], m: [2, 1] },
      { t: 'Musa makes bead bracelets. The beads for one bracelet cost R7. Musa sells each bracelet for R12.', p: ['What is the profit on one bracelet?', 'What is the profit on 8 bracelets?'], m: [2, 2] },
      { t: 'Plan a picnic with a budget of R50. Prices: bread R16, juice R14, apples R9, cheese R22, biscuits R11.', p: ['Choose what to buy and write the total.', 'How much is left from R50?'], m: [2, 1] }],
    af: [{ t: 'Julle klas het R60 vir \'n partytjie. Dit is die plan:' + tbl([['Item', 'Prys'], ['Koeldrank', 'R24'], ['Skyfies', 'R18'], ['Lekkers', 'R12']], true), p: ['Wat is die totaal?', 'Hoeveel bly oor van R60?'], m: [2, 1] },
      { t: 'Musa maak kralearmbande. Die krale vir een armband kos R7. Musa verkoop elke armband vir R12.', p: ['Wat is die wins op een armband?', 'Wat is die wins op 8 armbande?'], m: [2, 2] },
      { t: 'Beplan \'n piekniek met \'n begroting van R50. Pryse: brood R16, sap R14, appels R9, kaas R22, beskuitjies R11.', p: ['Kies wat om te koop en skryf die totaal neer.', 'Hoeveel bly oor van R50?'], m: [2, 1] }],
    ans: [['R54', 'R24 + R18 + R12', 'R24 + R18 + R12'], ['R6', 'R60 − R54', 'R60 − R54'],
      ['R5', 'R12 − R7', 'R12 − R7'], ['R40', '8 × R5', '8 × R5'],
      ['≤ R50', 'Own choice; for example bread + juice + apples + biscuits = R50.', 'Eie keuse; byvoorbeeld brood + sap + appels + beskuitjies = R50.'], ['R50 − total', 'For the example above: R0.', 'Vir die voorbeeld hierbo: R0.']]
  }
});

/* ───────────── 804 Money problems ───────────── */
const MODISE = { en: 'Modise buys 3 books at R5,50 each, 2 pencils at R2,25 each and a ruler for R3,75. How much change does Modise get from R30?', af: 'Modise koop 3 boeke teen R5,50 elk, 2 potlode teen R2,25 elk en \'n liniaal vir R3,75. Hoeveel kleingeld kry Modise van R30?' };
T.push({
  id: 804, name: { en: 'Money problems', af: 'Geldprobleme' }, full: { en: 'Solving problems with money', af: 'Probleme met geld oplos' },
  body: lang => {
    const en = lang === 'en';
    const items = en ? [{ n: 'pencils', lo: 3, hi: 8 }, { n: 'books', lo: 8, hi: 24 }, { n: 'rulers', lo: 5, hi: 10 }, { n: 'erasers', lo: 2, hi: 6 }, { n: 'pens', lo: 4, hi: 12 }]
      : [{ n: 'potlode', lo: 3, hi: 8 }, { n: 'boeke', lo: 8, hi: 24 }, { n: 'liniale', lo: 5, hi: 10 }, { n: 'uitveërs', lo: 2, hi: 6 }, { n: 'penne', lo: 4, hi: 12 }];
    const L = en ? { items, total: 'Total', change: 'Change', paid: r => 'Paid ' + r, ask: 'Work out each line (number × price), then the total and the change. You can type R5,50 or 550c.', tipLine: (k, p) => 'Check the line ' + k + ' × ' + p + '. Tip: work in cents, then change back to rand.', tipTot: 'The total is the two lines added together.', tipCh: paid => 'Change = ' + paid + ' − total.', fill: 'Fill in every box.', yes: (t, c, paid) => 'All correct! The total is ' + t + ', and ' + paid + ' − ' + t + ' = <b>' + c + '</b> change.' }
      : { items, total: 'Totaal', change: 'Kleingeld', paid: r => 'Betaal ' + r, ask: 'Werk elke lyn uit (getal × prys), dan die totaal en die kleingeld. Jy kan R5,50 of 550c tik.', tipLine: (k, p) => 'Kontroleer die lyn ' + k + ' × ' + p + '. Wenk: werk in sent en verander dan terug na rand.', tipTot: 'Die totaal is die twee lyne bymekaargetel.', tipCh: paid => 'Kleingeld = ' + paid + ' − totaal.', fill: 'Vul elke blokkie in.', yes: (t, c, paid) => 'Alles reg! Die totaal is ' + t + ', en ' + paid + ' − ' + t + ' = <b>' + c + '</b> kleingeld.' };
    const m = `<h4>🎮 ${en ? 'Till Slip' : 'Kasstrokie'}</h4><p class="how">${en ? 'Complete the till slip, one step at a time. Each box tells you if it is right.' : 'Voltooi die kasstrokie, een stap op \'n slag. Elke blokkie wys of dit reg is.'}</p><div class="g4-stage" style="padding:12px"><table data-k="slip" style="width:100%;border-collapse:separate;border-spacing:0 8px"></table></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('child', 'Many money problems have more than one step. Read carefully, write down each step and check that your answer makes sense.') +
      def('Steps', '<strong>1.</strong> Find the cost of each kind of item (number × price). <strong>2.</strong> Add to find the total. <strong>3.</strong> Subtract the total from the money paid to find the change. Working in cents can make it easier.') +
      ex(MODISE.en, ['Books: 3 × R5,50 = R16,50. Pencils: 2 × R2,25 = R4,50. Ruler: R3,75.', 'Total: R16,50 + R4,50 + R3,75 = <strong>R24,75</strong>.', 'Change: R30 − R24,75 = <strong>R5,25</strong>.']) +
      sim('g4-s804', S.s804, L, m) + tip('Estimate first: 3 books at about R6 is about R18. If your answer is very far from your estimate, check your work again.')
      : hero('child', 'Baie geldprobleme het meer as een stap. Lees versigtig, skryf elke stap neer en kyk of jou antwoord sin maak.') +
      def('Stappe', '<strong>1.</strong> Vind die koste van elke soort item (getal × prys). <strong>2.</strong> Tel bymekaar om die totaal te vind. <strong>3.</strong> Trek die totaal af van die geld wat betaal is om die kleingeld te vind. Om in sent te werk, kan dit makliker maak.') +
      ex(MODISE.af, ['Boeke: 3 × R5,50 = R16,50. Potlode: 2 × R2,25 = R4,50. Liniaal: R3,75.', 'Totaal: R16,50 + R4,50 + R3,75 = <strong>R24,75</strong>.', 'Kleingeld: R30 − R24,75 = <strong>R5,25</strong>.']) +
      sim('g4-s804', S.s804, L, m) + tip('Skat eers: 3 boeke teen omtrent R6 is omtrent R18. As jou antwoord baie ver van jou skatting af is, kontroleer jou werk weer.');
  },
  qs: [
    { en: MODISE.en, af: MODISE.af, a: 'R5,25', lv: 'P', h: ['Find the cost of the books, the pencils and the ruler, then add.', 'Vind die koste van die boeke, die potlode en die liniaal, en tel dan bymekaar.'], s: same('3 × R5,50 = R16,50; 2 × R2,25 = R4,50; R16,50 + R4,50 + R3,75 = R24,75; R30 − R24,75 = R5,25') },
    { en: 'Pens cost R3,50 each. How much do 4 pens cost?', af: 'Penne kos R3,50 elk. Hoeveel kos 4 penne?', a: 'R14', lv: 'R', h: ['4 × 350c', '4 × 350c'], s: same('4 × 350c = 1 400c = R14') },
    { en: 'R12,75 + R8,50 = ?', af: 'R12,75 + R8,50 = ?', a: 'R21,25', lv: 'R', h: ['Add the rand, then the cents.', 'Tel die rand bymekaar, dan die sent.'], s: same('R12 + R8 = R20; 75c + 50c = 125c = R1,25; R20 + R1,25 = R21,25') },
    { en: 'Mpho has R20. A pie costs R14,50 and a juice costs R6. Can Mpho buy both?', af: 'Mpho het R20. \'n Pastei kos R14,50 en \'n sap kos R6. Kan Mpho albei koop?', o: [['No, R0,50 short', 'Yes, with R0,50 left', 'Yes, exactly enough', 'No, R1,50 short'], ['Nee, R0,50 kort', 'Ja, met R0,50 oor', 'Ja, presies genoeg', 'Nee, R1,50 kort']], a: 0, lv: 'C', h: ['Add the two prices.', 'Tel die twee pryse bymekaar.'], s: same('R14,50 + R6 = R20,50; R20,50 − R20 = R0,50') },
    { en: 'A taxi trip costs R15. Lindiwe takes a taxi to school and back home every day for 5 days. How much is that?', af: '\'n Taxirit kos R15. Lindiwe ry elke dag vir 5 dae met \'n taxi skool toe en terug huis toe. Hoeveel is dit?', a: 'R150', lv: 'C', h: ['There are 2 trips every day.', 'Daar is elke dag 2 ritte.'], s: same('2 × R15 = R30; 5 × R30 = R150') },
    { en: 'You buy 2 loaves of bread at R16 each and 3 cartons of milk at R18 each. How much change do you get from R100?', af: 'Jy koop 2 brode teen R16 elk en 3 kartonne melk teen R18 elk. Hoeveel kleingeld kry jy van R100?', a: 'R14', lv: 'P', h: ['Find the cost of the bread and the milk first.', 'Vind eers die koste van die brood en die melk.'], s: same('2 × R16 = R32; 3 × R18 = R54; R32 + R54 = R86; R100 − R86 = R14') },
    { en: 'Three friends share R45 equally. How much does each friend get?', af: 'Drie vriende deel R45 gelykop. Hoeveel kry elke vriend?', a: 'R15', lv: 'R', h: ['R45 ÷ 3', 'R45 ÷ 3'], s: same('R45 ÷ 3 = R15') },
    { en: 'Tickets cost R40 for an adult and R25 for a child. What do 2 adults and 3 children pay altogether?' + tbl([['Adult', 'R40'], ['Child', 'R25']]), af: 'Kaartjies kos R40 vir \'n volwassene en R25 vir \'n kind. Wat betaal 2 volwassenes en 3 kinders altesaam?' + tbl([['Volwassene', 'R40'], ['Kind', 'R25']]), a: 'R155', lv: 'C', h: ['Adults: 2 × R40. Children: 3 × R25.', 'Volwassenes: 2 × R40. Kinders: 3 × R25.'], s: same('2 × R40 = R80; 3 × R25 = R75; R80 + R75 = R155') }
  ],
  wb: {
    en: [{ t: 'You buy 2 juices at R8,50 each and a muffin for R6,75. You pay with R50.', p: ['What is the total?', 'How much change do you get?'], m: [2, 2] },
      { t: 'Lindi saves R15 every week.', p: ['How much has Lindi saved after 6 weeks?', 'How many weeks does it take to save R120?'], m: [2, 2] },
      { t: 'A packet of 4 bread rolls costs R14. One roll on its own costs R4.', p: ['How much do 4 single rolls cost?', 'Which is the better buy? Explain.'], m: [1, 2] }],
    af: [{ t: 'Jy koop 2 sappe teen R8,50 elk en \'n muffin vir R6,75. Jy betaal met R50.', p: ['Wat is die totaal?', 'Hoeveel kleingeld kry jy?'], m: [2, 2] },
      { t: 'Lindi spaar elke week R15.', p: ['Hoeveel het Lindi ná 6 weke gespaar?', 'Hoeveel weke neem dit om R120 te spaar?'], m: [2, 2] },
      { t: '\'n Pakkie van 4 broodrolletjies kos R14. Een rolletjie alleen kos R4.', p: ['Hoeveel kos 4 enkel rolletjies?', 'Watter een is die beter koop? Verduidelik.'], m: [1, 2] }],
    ans: [['R23,75', '2 × R8,50 = R17; R17 + R6,75', '2 × R8,50 = R17; R17 + R6,75'], ['R26,25', 'R50 − R23,75', 'R50 − R23,75'],
      ['R90', '6 × R15', '6 × R15'], ['8', 'R120 ÷ R15 = 8 weeks', 'R120 ÷ R15 = 8 weke'],
      ['R16', '4 × R4', '4 × R4'], ['R14 < R16', 'The packet: it saves R2.', 'Die pakkie: dit spaar R2.']]
  }
});

writeChapter(8, { en: 'Financial Mathematics', af: 'Finansiële Wiskunde' }, T, process.argv[2] || OUT_DEFAULT);
