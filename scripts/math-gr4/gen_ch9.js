// Grade 4 Math Magician, Chapter 9: Common fractions (one bilingual source).
// Run: node scripts/math-gr4/gen_ch9.js   (writes math-magician/gr4/ch9.js, ch9.af.js, ch9.help.js)
// CAPS 1.2 Fractions (Term 3): fractions in diagrams, 1 ÷ 8 = 1/8, comparing and equivalent fractions,
// adding with the same denominator, fractions of amounts, sharing with remainders.
// Notes on the CAPS draft:
//   - "sevenths and eights" is corrected to "eighths".
//   - The worked example "If 1/4 of 28m = 7 then 3/4 of 28m = 7 × 3m = 21m" left out units and mixed them up;
//     it is written as 1/4 of 28 m = 28 m ÷ 4 = 7 m, so 3/4 of 28 m = 3 × 7 m = 21 m.
//   - Decimal fractions (0,5; 1,5; 2,5) are listed "in the context of measurement". Grade 4 does no decimal
//     arithmetic, so they appear only as a reading skill (1,5 ℓ on a bottle means 1½ ℓ) and are always
//     changed to a half or to whole smaller units (2,5 m = 2 m 50 cm). No calculation uses a decimal.
//   - "5 slices of bread shared by 4 friends" is worked out as 1 whole slice and 1/4 of a slice each.
//   - Equivalent fractions use only denominators that are multiples of each other, as CAPS says (1/2 = 2/4 = 4/8).
//   - The draft lists one topic; it is split into four lessons.
const { ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT } = require('./lib.js');
const S = require('./sims_ch9.js');
const T = [];
const same = s => [[s], [s]];

/* ───────────── Figures ───────────── */
// A stacked fraction that needs no page CSS (it also prints).
const F = (a, b) => `<span style="display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.05;font-weight:800;margin:0 2px"><span style="border-bottom:2px solid currentColor;padding:0 3px">${a}</span><span>${b}</span></span>`;
const svgw = (vb, body, mw) => `<svg viewBox="${vb}" style="display:block;width:100%;max-width:${mw || 300}px;margin:12px auto" role="img" aria-hidden="true">${body}</svg>`;
const ON = '#f59e0b', OFF = 'rgba(148,163,184,.12)';
// A bar of n equal parts; the first k shaded (or a list of colours per part).
function bar(n, k, mw) {
  const w = 300 / n; let g = '';
  for (let i = 0; i < n; i++) g += `<rect x="${4 + i * w}" y="4" width="${w}" height="56" fill="${Array.isArray(k) ? k[i] : i < k ? ON : OFF}" stroke="currentColor" stroke-width="2"/>`;
  return svgw('0 0 308 64', g, mw || 280);
}
// A circle of n equal slices; the first k shaded.
function pie(n, k, mw) {
  const c = 64, r = 58; let g = '';
  for (let i = 0; i < n; i++) {
    const t0 = (-90 + i * 360 / n) * Math.PI / 180, t1 = (-90 + (i + 1) * 360 / n) * Math.PI / 180;
    g += `<path d="M${c} ${c} L${(c + r * Math.cos(t0)).toFixed(1)} ${(c + r * Math.sin(t0)).toFixed(1)} A${r} ${r} 0 ${360 / n > 180 ? 1 : 0} 1 ${(c + r * Math.cos(t1)).toFixed(1)} ${(c + r * Math.sin(t1)).toFixed(1)} Z" fill="${i < k ? ON : OFF}" stroke="currentColor" stroke-width="2"/>`;
  }
  return svgw('0 0 128 128', g, mw || 150);
}
// A set of n counters; the first k coloured.
function dots(n, k, perRow) {
  const pr = perRow || n, s = 36; let g = '';
  for (let i = 0; i < n; i++) g += `<circle cx="${22 + (i % pr) * s}" cy="${22 + Math.floor(i / pr) * s}" r="14" fill="${i < k ? ON : OFF}" stroke="currentColor" stroke-width="2"/>`;
  return svgw(`0 0 ${pr * s + 8} ${Math.ceil(n / pr) * s + 8}`, g, Math.min(320, pr * 40));
}
// A bar of 3 unequal parts, 2 shaded (NOT thirds).
const uneq = () => svgw('0 0 308 64', `<rect x="4" y="4" width="60" height="56" fill="${ON}" stroke="currentColor" stroke-width="2"/><rect x="64" y="4" width="80" height="56" fill="${ON}" stroke="currentColor" stroke-width="2"/><rect x="144" y="4" width="160" height="56" fill="${OFF}" stroke="currentColor" stroke-width="2"/>`, 200);
// A fraction wall: one row per denominator, with labels on the left.
function wall(dens) {
  let g = ''; dens.forEach((d, r) => {
    const w = 300 / d, y = 4 + r * 34;
    for (let i = 0; i < d; i++) g += `<rect x="${44 + i * w}" y="${y}" width="${w}" height="30" fill="${['#22c55e33', '#38bdf833', '#f59e0b33', '#a855f733', '#ef444433', '#14b8a633', '#eab30833'][r % 7]}" stroke="currentColor" stroke-width="1.5"/>`;
    g += `<text x="36" y="${y + 21}" text-anchor="end" font-size="15" font-weight="800" fill="currentColor" font-family="sans-serif">1/${d}</text>`;
  });
  return svgw(`0 0 352 ${dens.length * 34 + 6}`, g, 360);
}
// A ribbon or road of `total` units cut into `parts` equal pieces, the first k shaded, each piece labelled.
function ribbon(total, parts, k, unit, lab) {
  const w = 300 / parts; let g = '';
  for (let i = 0; i < parts; i++) g += `<rect x="${10 + i * w}" y="8" width="${w}" height="34" fill="${i < k ? ON : OFF}" stroke="currentColor" stroke-width="2"/><text x="${10 + i * w + w / 2}" y="31" text-anchor="middle" font-size="${parts > 6 ? 11 : 14}" font-weight="800" fill="currentColor" font-family="sans-serif">${lab || "?"}</text>`;
  g += `<path d="M10 52 v8 H310 v-8" fill="none" stroke="currentColor" stroke-width="2"/><text x="160" y="80" text-anchor="middle" font-size="16" font-weight="800" fill="currentColor" font-family="sans-serif">${total} ${unit}</text>`;
  return svgw('0 0 320 86', g, 320);
}
// Slices of bread: n whole squares, the last one cut into p pieces.
function slices(n, p) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const x = 6 + i * 62;
    g += `<rect x="${x}" y="6" width="54" height="54" rx="10" fill="#fde68a" stroke="#92400e" stroke-width="3"/>`;
    if (i === n - 1) for (let j = 1; j < p; j++) g += `<line x1="${x + 54 * j / p}" y1="6" x2="${x + 54 * j / p}" y2="60" stroke="#92400e" stroke-width="2" stroke-dasharray="4 3"/>`;
  }
  return svgw(`0 0 ${n * 62 + 6} 66`, g, Math.min(320, n * 66));
}
// A measuring jug marked 0 to 2 litres, filled to 1½ ℓ.
const jug = () => svgw('0 0 160 170', `<path d="M30 10 V160 H120 V10" fill="none" stroke="currentColor" stroke-width="3"/><rect x="32" y="49" width="86" height="109" fill="#38bdf855"/>` +
  [[160, '0'], [122.5, '½ ℓ'], [85, '1 ℓ'], [47.5, '1½ ℓ'], [10, '2 ℓ']].map(([y, t]) => `<line x1="120" y1="${y}" x2="134" y2="${y}" stroke="currentColor" stroke-width="2"/><text x="138" y="${y + 5}" font-size="13" font-weight="700" fill="currentColor" font-family="sans-serif">${t}</text>`).join(''), 160);

/* ───────────── 901 Fractions in diagrams ───────────── */
T.push({
  id: 901, name: { en: 'What is a fraction?', af: 'Wat is \'n breuk?' }, full: { en: 'Fractions: equal parts of a whole', af: 'Breuke: gelyke dele van \'n heel' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { aria: 'A shape cut into equal parts', goal: f => 'Shade ' + f + ' of the shape.', ask: 'Tap the equal parts to shade them. Tap again to unshade.', live: (k, n, f) => 'Shaded: ' + k + ' out of ' + n + ' parts = ' + f, yes: (a, n, f) => 'Correct! The shape has ' + n + ' equal parts (the denominator) and you shaded ' + a + ' of them (the numerator): ' + f + '.', more: (s, a, n) => 'You shaded ' + s + ' parts. The numerator says shade ' + a + ' of the ' + n + ' parts. Shade more.', less: (s, a, n) => 'You shaded ' + s + ' parts. The numerator says shade only ' + a + ' of the ' + n + ' parts. Unshade some.' }
      : { aria: '\'n Vorm in gelyke dele verdeel', goal: f => 'Kleur ' + f + ' van die vorm in.', ask: 'Tik op die gelyke dele om hulle in te kleur. Tik weer om die kleur weg te vat.', live: (k, n, f) => 'Ingekleur: ' + k + ' uit ' + n + ' dele = ' + f, yes: (a, n, f) => 'Reg! Die vorm het ' + n + ' gelyke dele (die noemer) en jy het ' + a + ' daarvan ingekleur (die teller): ' + f + '.', more: (s, a, n) => 'Jy het ' + s + ' dele ingekleur. Die teller sê kleur ' + a + ' van die ' + n + ' dele in. Kleur meer in.', less: (s, a, n) => 'Jy het ' + s + ' dele ingekleur. Die teller sê kleur net ' + a + ' van die ' + n + ' dele in. Vat van die kleur weg.' };
    const m = `<h4>🎮 ${en ? 'Shade the Fraction' : 'Kleur die Breuk in'}</h4><p class="how">${en ? 'The bottom number tells you how many equal parts there are. The top number tells you how many to shade.' : 'Die onderste getal sê hoeveel gelyke dele daar is. Die boonste getal sê hoeveel om in te kleur.'}</p><div class="g4-big" data-k="goal" style="font-size:24px"></div><div class="g4-stage" data-k="stage"></div><div data-k="live" style="font-size:19px"></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="clear">${en ? 'Clear' : 'Maak skoon'}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('bread-loaf', 'When a whole is cut into <strong>equal parts</strong>, each part is a <strong>fraction</strong> of the whole. A loaf cut into 8 equal slices gives eighths.') +
      def('Numerator and denominator', `In the fraction ${F(3, 4)} the bottom number, <strong>4</strong>, is the <strong>denominator</strong>: the whole is cut into 4 equal parts. The top number, <strong>3</strong>, is the <strong>numerator</strong>: we count 3 of those parts. We say <em>three quarters</em>.`) + bar(4, 3) +
      ex('Fractions and sharing', [`1 pizza shared equally by 8 people: each person gets ${F(1, 8)} of the pizza.`, `So 1 ÷ 8 = ${F(1, 8)}. A fraction is also a division: the line means "divided by".`, `The parts must be equal. This bar has 3 parts, but they are not equal, so the shaded part is <strong>not</strong> ${F(2, 3)}:` + uneq()]) +
      ex('Fraction names', ['Halves (2 parts), thirds (3), quarters (4), fifths (5), sixths (6), sevenths (7), eighths (8).', `${F(2, 5)} is two fifths. ${F(5, 8)} is five eighths.` + pie(8, 5, 120)]) +
      sim('g4-s901', S.s901, L, m) + tip('Check two things: are the parts equal, and how many parts are there altogether? That number is the denominator.')
      : hero('bread-loaf', 'As \'n heel in <strong>gelyke dele</strong> gesny word, is elke deel \'n <strong>breuk</strong> van die heel. \'n Brood wat in 8 gelyke snye gesny is, gee agstes.') +
      def('Teller en noemer', `In die breuk ${F(3, 4)} is die onderste getal, <strong>4</strong>, die <strong>noemer</strong>: die heel is in 4 gelyke dele gesny. Die boonste getal, <strong>3</strong>, is die <strong>teller</strong>: ons tel 3 van daardie dele. Ons sê <em>drie kwarte</em>.`) + bar(4, 3) +
      ex('Breuke en deel', [`1 pizza word gelykop deur 8 mense gedeel: elke persoon kry ${F(1, 8)} van die pizza.`, `Dus 1 ÷ 8 = ${F(1, 8)}. \'n Breuk is ook \'n deling: die streep beteken "gedeel deur".`, `Die dele moet gelyk wees. Hierdie strook het 3 dele, maar hulle is nie gelyk nie, so die ingekleurde deel is <strong>nie</strong> ${F(2, 3)} nie:` + uneq()]) +
      ex('Name van breuke', ['Helftes (2 dele), derdes (3), kwarte (4), vyfdes (5), sesdes (6), sewendes (7), agstes (8).', `${F(2, 5)} is twee vyfdes. ${F(5, 8)} is vyf agstes.` + pie(8, 5, 120)]) +
      sim('g4-s901', S.s901, L, m) + tip('Kyk na twee dinge: is die dele gelyk, en hoeveel dele is daar altesaam? Daardie getal is die noemer.');
  },
  qs: [
    { en: 'What fraction of the bar is shaded?' + bar(4, 1), af: 'Watter breuk van die strook is ingekleur?' + bar(4, 1), o: [[F(1, 4), F(3, 4), F(1, 3), F(4, 1)], [F(1, 4), F(3, 4), F(1, 3), F(4, 1)]], a: 0, lv: 'K', h: ['Count all the equal parts, then the shaded parts.', 'Tel al die gelyke dele, dan die ingekleurde dele.'], s: [['4 equal parts, 1 shaded: 1/4'], ['4 gelyke dele, 1 ingekleur: 1/4']] },
    { en: `In the fraction ${F(3, 5)}, what is the denominator?`, af: `Wat is die noemer in die breuk ${F(3, 5)}?`, a: '5', lv: 'K', h: ['The denominator is the bottom number.', 'Die noemer is die onderste getal.'], s: [['The bottom number is 5.'], ['Die onderste getal is 5.']] },
    { en: 'What fraction of the circle is shaded? (Type it like 2/3.)' + pie(6, 5), af: 'Watter breuk van die sirkel is ingekleur? (Tik dit soos 2/3.)' + pie(6, 5), a: '5/6', lv: 'R', h: ['How many equal slices? How many are shaded?', 'Hoeveel gelyke skywe? Hoeveel is ingekleur?'], s: [['6 equal slices, 5 shaded: 5/6'], ['6 gelyke skywe, 5 ingekleur: 5/6']] },
    { en: '1 ÷ 8 = ?', af: '1 ÷ 8 = ?', o: [[F(1, 8), F(8, 1), '8', '7'], [F(1, 8), F(8, 1), '8', '7']], a: 0, lv: 'R', h: ['Share 1 whole into 8 equal parts.', 'Deel 1 heel in 8 gelyke dele.'], s: same('1 ÷ 8 = 1/8') },
    { en: 'What fraction of the bar is NOT shaded? (Type it like 2/3.)' + bar(8, 3), af: 'Watter breuk van die strook is NIE ingekleur NIE? (Tik dit soos 2/3.)' + bar(8, 3), a: '5/8', lv: 'R', h: ['Count the white parts.', 'Tel die wit dele.'], s: [['8 parts, 3 shaded, so 5 are not shaded: 5/8'], ['8 dele, 3 ingekleur, so 5 is nie ingekleur nie: 5/8']] },
    { en: `Which picture shows ${F(2, 3)}?`, af: `Watter prent wys ${F(2, 3)}?`, o: [[bar(3, 2, 200), uneq(), pie(3, 1, 90), bar(5, 2, 200)], [bar(3, 2, 200), uneq(), pie(3, 1, 90), bar(5, 2, 200)]], a: 0, lv: 'C', h: ['You need 3 EQUAL parts with 2 shaded.', 'Jy het 3 GELYKE dele nodig waarvan 2 ingekleur is.'], s: [['Only the first bar has 3 equal parts with 2 shaded. The second has 3 parts, but they are not equal.'], ['Net die eerste strook het 3 gelyke dele met 2 ingekleur. Die tweede het 3 dele, maar hulle is nie gelyk nie.']] },
    { en: 'A chocolate bar has 7 equal blocks. Thabo eats 3 blocks. What fraction of the bar is left? (Type it like 2/3.)' + bar(7, ['#94a3b833', '#94a3b833', '#94a3b833', '#92400e', '#92400e', '#92400e', '#92400e']), af: '\'n Sjokoladestaaf het 7 gelyke blokkies. Thabo eet 3 blokkies. Watter breuk van die staaf is oor? (Tik dit soos 2/3.)' + bar(7, ['#94a3b833', '#94a3b833', '#94a3b833', '#92400e', '#92400e', '#92400e', '#92400e']), a: '4/7', lv: 'C', h: ['7 − 3 blocks are left.', '7 − 3 blokkies is oor.'], s: [['7 − 3 = 4 blocks left out of 7: 4/7'], ['7 − 3 = 4 blokkies oor uit 7: 4/7']] },
    { en: 'A flag has 5 equal stripes. 2 stripes are red, 1 is white and the rest are blue. What fraction of the flag is blue? (Type it like 2/3.)' + bar(5, ['#dc2626', '#dc2626', '#f8fafc', '#2563eb', '#2563eb']), af: '\'n Vlag het 5 gelyke strepe. 2 strepe is rooi, 1 is wit en die res is blou. Watter breuk van die vlag is blou? (Tik dit soos 2/3.)' + bar(5, ['#dc2626', '#dc2626', '#f8fafc', '#2563eb', '#2563eb']), a: '2/5', lv: 'P', h: ['How many stripes are blue?', 'Hoeveel strepe is blou?'], s: [['5 − 2 − 1 = 2 blue stripes out of 5: 2/5'], ['5 − 2 − 1 = 2 blou strepe uit 5: 2/5']] }
  ],
  wb: {
    en: [{ t: 'What fraction is shaded?', p: [bar(4, 3, 200), pie(8, 5, 110), dots(6, 2)], m: [1, 1, 1] },
      { t: 'Draw a rectangle, divide it into equal parts and shade:', p: [F(2, 5), F(3, 8)], m: [2, 2] },
      { t: 'Write as a fraction.', p: ['1 ÷ 3', '1 ÷ 7', 'three quarters'], m: [1, 1, 1] },
      { t: 'A pizza is cut into 8 equal slices. Lerato eats 3 slices.' + pie(8, 3, 110), p: ['What fraction of the pizza did Lerato eat?', 'What fraction of the pizza is left?'], m: [1, 1] }],
    af: [{ t: 'Watter breuk is ingekleur?', p: [bar(4, 3, 200), pie(8, 5, 110), dots(6, 2)], m: [1, 1, 1] },
      { t: 'Teken \'n reghoek, verdeel dit in gelyke dele en kleur in:', p: [F(2, 5), F(3, 8)], m: [2, 2] },
      { t: 'Skryf as \'n breuk.', p: ['1 ÷ 3', '1 ÷ 7', 'drie kwarte'], m: [1, 1, 1] },
      { t: '\'n Pizza is in 8 gelyke skywe gesny. Lerato eet 3 skywe.' + pie(8, 3, 110), p: ['Watter breuk van die pizza het Lerato geëet?', 'Watter breuk van die pizza is oor?'], m: [1, 1] }],
    ans: [['3/4', '', ''], ['5/8', '', ''], ['2/6', '2 of the 6 counters', '2 van die 6 tellers'],
      ['—', '5 equal parts, 2 shaded', '5 gelyke dele, 2 ingekleur'], ['—', '8 equal parts, 3 shaded', '8 gelyke dele, 3 ingekleur'],
      ['1/3', '', ''], ['1/7', '', ''], ['3/4', '', ''],
      ['3/8', '', ''], ['5/8', '8 − 3 = 5 slices left', '8 − 3 = 5 skywe oor']]
  }
});

/* ───────────── 902 Comparing and equivalent fractions ───────────── */
T.push({
  id: 902, name: { en: 'Compare fractions', af: 'Vergelyk breuke' }, full: { en: 'Comparing fractions and equivalent fractions', af: 'Breuke vergelyk en gelykwaardige breuke' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { aria: 'Two fraction bars', and: 'and', goal: (f, d) => 'Make ' + f + ' with ' + d + ' equal parts.', ask: 'Tap the bottom bar (or use − and +) until the orange part is exactly as long as the green part.', short: (g, f) => g + ' is shorter than ' + f + '. Shade more parts.', long: (g, f) => g + ' is longer than ' + f + '. Shade fewer parts.', yes: (f, g, a, b, m) => 'Equivalent! ' + f + ' = ' + g + '. Both bars end at the same line. Each part of the top bar is cut into ' + m + ', so the numerator and the denominator are both multiplied by ' + m + '.' }
      : { aria: 'Twee breukstroke', and: 'en', goal: (f, d) => 'Maak ' + f + ' met ' + d + ' gelyke dele.', ask: 'Tik op die onderste strook (of gebruik − en +) totdat die oranje deel presies so lank is soos die groen deel.', short: (g, f) => g + ' is korter as ' + f + '. Kleur meer dele in.', long: (g, f) => g + ' is langer as ' + f + '. Kleur minder dele in.', yes: (f, g, a, b, m) => 'Gelykwaardig! ' + f + ' = ' + g + '. Albei stroke eindig by dieselfde lyn. Elke deel van die boonste strook is in ' + m + ' gesny, so die teller en die noemer is albei met ' + m + ' vermenigvuldig.' };
    const m = `<h4>🎮 ${en ? 'Fraction Wall' : 'Breukmuur'}</h4><p class="how">${en ? 'Find an equal fraction with smaller parts. The dashed line shows where the green fraction ends.' : 'Vind \'n gelyke breuk met kleiner dele. Die stippellyn wys waar die groen breuk eindig.'}</p><div class="g4-big" data-k="goal" style="font-size:24px"></div><div class="g4-stage" data-k="stage"></div><div class="g4-big" data-k="live" style="font-size:24px"></div><div class="g4-row"><button class="g4-btn ghost" data-k="minus" aria-label="minus" style="font-size:26px;min-width:56px;padding:4px 12px">−</button><button class="g4-btn ghost" data-k="plus" aria-label="plus" style="font-size:26px;min-width:56px;padding:4px 12px">+</button><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('chocolate', `Would you rather have ${F(1, 3)} or ${F(1, 8)} of a chocolate bar? The more parts you cut it into, the <strong>smaller</strong> each part is.`) +
      def('Comparing fractions', `<strong>Same denominator:</strong> the bigger numerator is the bigger fraction: ${F(5, 8)} &gt; ${F(3, 8)}. <strong>Same numerator:</strong> the smaller denominator is the bigger fraction, because the parts are bigger: ${F(1, 3)} &gt; ${F(1, 8)}.`) + wall([1, 2, 3, 4, 5, 6, 7, 8].slice(1)) +
      ex('Equivalent fractions', [`Equivalent fractions are the same size: ${F(1, 2)} = ${F(2, 4)} = ${F(4, 8)}.` + bar(2, 1, 220) + bar(4, 2, 220) + bar(8, 4, 220), `Cut every part into 2 and you get twice as many parts and twice as many shaded: ${F(1, 2)} = ${F('1 × 2', '2 × 2')} = ${F(2, 4)}.`, `Multiply the numerator and the denominator by the <strong>same</strong> number: ${F(2, 3)} = ${F(4, 6)}.`]) +
      sim('g4-s902', S.s902, L, m) + tip('Use a fraction wall to compare: the fraction whose bar reaches further to the right is bigger.')
      : hero('chocolate', `Sal jy eerder ${F(1, 3)} of ${F(1, 8)} van \'n sjokoladestaaf wil hê? Hoe meer dele jy dit in sny, hoe <strong>kleiner</strong> is elke deel.`) +
      def('Breuke vergelyk', `<strong>Dieselfde noemer:</strong> die groter teller is die groter breuk: ${F(5, 8)} &gt; ${F(3, 8)}. <strong>Dieselfde teller:</strong> die kleiner noemer is die groter breuk, want die dele is groter: ${F(1, 3)} &gt; ${F(1, 8)}.`) + wall([2, 3, 4, 5, 6, 7, 8]) +
      ex('Gelykwaardige breuke', [`Gelykwaardige breuke is ewe groot: ${F(1, 2)} = ${F(2, 4)} = ${F(4, 8)}.` + bar(2, 1, 220) + bar(4, 2, 220) + bar(8, 4, 220), `Sny elke deel in 2 en jy kry twee keer soveel dele en twee keer soveel ingekleur: ${F(1, 2)} = ${F('1 × 2', '2 × 2')} = ${F(2, 4)}.`, `Vermenigvuldig die teller en die noemer met <strong>dieselfde</strong> getal: ${F(2, 3)} = ${F(4, 6)}.`]) +
      sim('g4-s902', S.s902, L, m) + tip('Gebruik \'n breukmuur om te vergelyk: die breuk wie se strook verder na regs strek, is groter.');
  },
  qs: [
    { en: 'Which fraction is bigger?' + bar(3, 1, 220) + bar(5, 1, 220), af: 'Watter breuk is groter?' + bar(3, 1, 220) + bar(5, 1, 220), o: [[F(1, 3), F(1, 5), 'They are the same'], [F(1, 3), F(1, 5), 'Hulle is ewe groot']], a: 0, lv: 'K', h: ['Thirds are bigger parts than fifths.', 'Derdes is groter dele as vyfdes.'], s: [['The fewer the parts, the bigger each part: 1/3 > 1/5.'], ['Hoe minder dele, hoe groter elke deel: 1/3 > 1/5.']] },
    { en: 'Which fraction is bigger?', af: 'Watter breuk is groter?', o: [[F(3, 8), F(5, 8), 'They are the same'], [F(3, 8), F(5, 8), 'Hulle is ewe groot']], a: 1, lv: 'R', h: ['Same denominator: compare the numerators.', 'Dieselfde noemer: vergelyk die tellers.'], s: [['Both are eighths, and 5 eighths is more than 3 eighths.'], ['Albei is agstes, en 5 agstes is meer as 3 agstes.']] },
    { en: `${F(1, 2)} = ${F('?', 4)}. What is the missing number?` + bar(2, 1, 220) + bar(4, 0, 220), af: `${F(1, 2)} = ${F('?', 4)}. Wat is die ontbrekende getal?` + bar(2, 1, 220) + bar(4, 0, 220), a: '2', lv: 'R', h: ['2 × 2 = 4, so multiply the top by 2 as well.', '2 × 2 = 4, so vermenigvuldig die boonste getal ook met 2.'], s: same('1/2 = (1 × 2)/(2 × 2) = 2/4') },
    { en: `${F(1, 3)} = ${F('?', 6)}. What is the missing number?` + bar(3, 1, 220) + bar(6, 0, 220), af: `${F(1, 3)} = ${F('?', 6)}. Wat is die ontbrekende getal?` + bar(3, 1, 220) + bar(6, 0, 220), a: '2', lv: 'R', h: ['3 × 2 = 6', '3 × 2 = 6'], s: same('1/3 = (1 × 2)/(3 × 2) = 2/6') },
    { en: 'Put these fractions in order from smallest to biggest.' + `<p style="text-align:center;font-size:22px">${F(1, 2)} &nbsp; ${F(1, 8)} &nbsp; ${F(1, 4)}</p>`, af: 'Rangskik hierdie breuke van kleinste na grootste.' + `<p style="text-align:center;font-size:22px">${F(1, 2)} &nbsp; ${F(1, 8)} &nbsp; ${F(1, 4)}</p>`, o: [[`${F(1, 8)}, ${F(1, 4)}, ${F(1, 2)}`, `${F(1, 2)}, ${F(1, 4)}, ${F(1, 8)}`, `${F(1, 4)}, ${F(1, 8)}, ${F(1, 2)}`, `${F(1, 2)}, ${F(1, 8)}, ${F(1, 4)}`], [`${F(1, 8)}, ${F(1, 4)}, ${F(1, 2)}`, `${F(1, 2)}, ${F(1, 4)}, ${F(1, 8)}`, `${F(1, 4)}, ${F(1, 8)}, ${F(1, 2)}`, `${F(1, 2)}, ${F(1, 8)}, ${F(1, 4)}`]], a: 0, lv: 'C', h: ['The biggest denominator gives the smallest parts.', 'Die grootste noemer gee die kleinste dele.'], s: [['Eighths are the smallest parts and halves the biggest: 1/8, 1/4, 1/2.'], ['Agstes is die kleinste dele en helftes die grootste: 1/8, 1/4, 1/2.']] },
    { en: `Which fraction is equivalent to ${F(3, 4)}?` + wall([4, 8]), af: `Watter breuk is gelykwaardig aan ${F(3, 4)}?` + wall([4, 8]), o: [[F(6, 8), F(3, 8), F(4, 3), F(6, 4)], [F(6, 8), F(3, 8), F(4, 3), F(6, 4)]], a: 0, lv: 'C', h: ['4 × 2 = 8. Multiply the top by 2 too.', '4 × 2 = 8. Vermenigvuldig die boonste getal ook met 2.'], s: same('3/4 = (3 × 2)/(4 × 2) = 6/8') },
    { en: `Thandi eats ${F(1, 4)} of a pizza. Musa eats ${F(1, 6)} of a pizza of the same size. Who eats more?` + pie(4, 1, 110) + pie(6, 1, 110), af: `Thandi eet ${F(1, 4)} van \'n pizza. Musa eet ${F(1, 6)} van \'n pizza wat ewe groot is. Wie eet meer?` + pie(4, 1, 110) + pie(6, 1, 110), o: [['Thandi', 'Musa', 'They eat the same'], ['Thandi', 'Musa', 'Hulle eet ewe veel']], a: 0, lv: 'C', h: ['Which slice is bigger: a quarter or a sixth?', 'Watter sny is groter: \'n kwart of \'n sesde?'], s: [['A pizza cut into 4 has bigger slices than one cut into 6, so 1/4 > 1/6.'], ['\'n Pizza wat in 4 gesny is, het groter skywe as een wat in 6 gesny is, so 1/4 > 1/6.']] },
    { en: `Ben says ${F(1, 7)} is bigger than ${F(1, 5)} because 7 is bigger than 5. Is Ben right?`, af: `Ben sê ${F(1, 7)} is groter as ${F(1, 5)} omdat 7 groter as 5 is. Is Ben reg?`, o: [['No. Sevenths are smaller parts than fifths.', 'Yes. 7 is bigger than 5.', 'No. They are the same size.'], ['Nee. Sewendes is kleiner dele as vyfdes.', 'Ja. 7 is groter as 5.', 'Nee. Hulle is ewe groot.']], a: 0, lv: 'P', h: ['Draw two bars of the same length: one in 7 parts, one in 5.', 'Teken twee ewe lang stroke: een in 7 dele, een in 5.'], s: [['Cutting a whole into 7 parts makes each part smaller than cutting it into 5, so 1/7 < 1/5.'], ['As jy \'n heel in 7 dele sny, is elke deel kleiner as wanneer jy dit in 5 sny, so 1/7 < 1/5.']] }
  ],
  wb: {
    en: [{ t: 'Fill in &lt;, &gt; or =.', p: [`${F(1, 2)} ☐ ${F(1, 3)}`, `${F(2, 5)} ☐ ${F(4, 5)}`, `${F(1, 4)} ☐ ${F(2, 8)}`, `${F(1, 6)} ☐ ${F(1, 8)}`], m: [1, 1, 1, 1] },
      { t: 'Fill in the missing number.', p: [`${F(1, 2)} = ${F('?', 8)}`, `${F(2, 3)} = ${F('?', 6)}`, `${F(3, 5)} = ${F(6, '?')}`], m: [1, 1, 1] },
      { t: 'Write the fractions in order from smallest to biggest.', p: [`${F(1, 3)}, ${F(1, 8)}, ${F(1, 2)}, ${F(1, 5)}`, `${F(3, 7)}, ${F(1, 7)}, ${F(6, 7)}`], m: [2, 1] },
      { t: `Draw two bars of the same length to show that ${F(1, 2)} = ${F(3, 6)}.`, p: ['Draw and shade the bars.'], m: [2] }],
    af: [{ t: 'Vul &lt;, &gt; of = in.', p: [`${F(1, 2)} ☐ ${F(1, 3)}`, `${F(2, 5)} ☐ ${F(4, 5)}`, `${F(1, 4)} ☐ ${F(2, 8)}`, `${F(1, 6)} ☐ ${F(1, 8)}`], m: [1, 1, 1, 1] },
      { t: 'Vul die ontbrekende getal in.', p: [`${F(1, 2)} = ${F('?', 8)}`, `${F(2, 3)} = ${F('?', 6)}`, `${F(3, 5)} = ${F(6, '?')}`], m: [1, 1, 1] },
      { t: 'Skryf die breuke in volgorde van kleinste na grootste.', p: [`${F(1, 3)}, ${F(1, 8)}, ${F(1, 2)}, ${F(1, 5)}`, `${F(3, 7)}, ${F(1, 7)}, ${F(6, 7)}`], m: [2, 1] },
      { t: `Teken twee ewe lang stroke om te wys dat ${F(1, 2)} = ${F(3, 6)}.`, p: ['Teken die stroke en kleur hulle in.'], m: [2] }],
    ans: [['&gt;', 'halves are bigger than thirds', 'helftes is groter as derdes'], ['&lt;', '', ''], ['=', '2/8 = 1/4', '2/8 = 1/4'], ['&gt;', 'sixths are bigger than eighths', 'sesdes is groter as agstes'],
      ['4', '1 × 4 = 4; 2 × 4 = 8', '1 × 4 = 4; 2 × 4 = 8'], ['4', '2 × 2 = 4; 3 × 2 = 6', '2 × 2 = 4; 3 × 2 = 6'], ['10', '3 × 2 = 6; 5 × 2 = 10', '3 × 2 = 6; 5 × 2 = 10'],
      ['1/8; 1/5; 1/3; 1/2', '', ''], ['1/7; 3/7; 6/7', '', ''],
      ['1/2 = 3/6', 'One bar in 2 parts with 1 shaded; one in 6 parts with 3 shaded.', 'Een strook in 2 dele met 1 ingekleur; een in 6 dele met 3 ingekleur.']]
  }
});

/* ───────────── 903 Adding fractions ───────────── */
T.push({
  id: 903, name: { en: 'Add fractions', af: 'Breuke optel' }, full: { en: 'Adding fractions with the same denominator', af: 'Breuke met dieselfde noemer optel' },
  body: lang => {
    const en = lang === 'en';
    const NM = en ? ['', '', 'halves', 'thirds', 'quarters', 'fifths', 'sixths', 'sevenths', 'eighths'] : ['', '', 'helftes', 'derdes', 'kwarte', 'vyfdes', 'sesdes', 'sewendes', 'agstes'];
    const N1 = en ? ['', 'whole', 'half', 'third', 'quarter', 'fifth', 'sixth', 'seventh', 'eighth'] : ['', 'heel', 'helfte', 'derde', 'kwart', 'vyfde', 'sesde', 'sewende', 'agste'];
    const L = en ? { NM, N1, aria: 'A fraction bar with two coloured parts', ask: 'Type the numerator (top) and the denominator (bottom) of the answer.', fill: 'Type a number in both boxes.', words: (x, y) => x + ' plus ' + y + ' = ?', den: n => 'Look at the denominator again. The bar is still cut into ' + n + ' equal parts, so the denominator stays ' + n + '.', doubled: (n, w) => 'Do not add the denominators! The parts are still ' + w + ', so the denominator stays ' + n + '.', num: (a, b) => 'Count the coloured parts: ' + a + ' green + ' + b + ' orange.', yes: (f, g, h, x, y, z) => 'Correct! ' + f + ' + ' + g + ' = ' + h + '. ' + x + ' + ' + y + ' = ' + z + ': add the numerators and keep the denominator.' }
      : { NM, N1, aria: '\'n Breukstrook met twee gekleurde dele', ask: 'Tik die teller (bo) en die noemer (onder) van die antwoord.', fill: 'Tik \'n getal in albei blokkies.', words: (x, y) => x + ' plus ' + y + ' = ?', den: n => 'Kyk weer na die noemer. Die strook is steeds in ' + n + ' gelyke dele gesny, so die noemer bly ' + n + '.', doubled: (n, w) => 'Moenie die noemers bymekaartel nie! Die dele is steeds ' + w + ', so die noemer bly ' + n + '.', num: (a, b) => 'Tel die gekleurde dele: ' + a + ' groen + ' + b + ' oranje.', yes: (f, g, h, x, y, z) => 'Reg! ' + f + ' + ' + g + ' = ' + h + '. ' + x + ' + ' + y + ' = ' + z + ': tel die tellers bymekaar en hou die noemer.' };
    const box = k => `<input class="g4-input" data-k="${k}" inputmode="numeric" aria-label="${k === 'nu' ? (en ? 'numerator' : 'teller') : (en ? 'denominator' : 'noemer')}" style="width:70px;text-align:center">`;
    const m = `<h4>🎮 ${en ? 'Fraction Adder' : 'Breuk-opteller'}</h4><p class="how">${en ? 'Both parts are on the same bar. Count the coloured parts, then write the answer as a fraction.' : 'Albei dele is op dieselfde strook. Tel die gekleurde dele en skryf dan die antwoord as \'n breuk.'}</p><div data-k="words" style="font-size:18px;opacity:.85"></div><div class="g4-stage" data-k="stage"></div><div class="g4-row" style="font-size:26px;justify-content:center"><span class="g4-big" data-k="sum" style="font-size:28px"></span><span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px">${box('nu')}<span style="width:76px;border-top:3px solid currentColor"></span>${box('de')}</span></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('apple', 'When the parts are the same size, adding fractions is just counting parts: 2 sevenths and 3 more sevenths make 5 sevenths.') +
      def('Adding with the same denominator', `<strong>Add the numerators. Keep the denominator.</strong> The denominator tells you the size of the parts, and adding does not change the size of the parts.`) +
      ex('Two sevenths plus three sevenths', ['Say it: two sevenths plus three sevenths equals five sevenths.', `Write it: ${F(2, 7)} + ${F(3, 7)} = ${F(5, 7)}.` + bar(7, ['#22c55e', '#22c55e', '#f59e0b', '#f59e0b', '#f59e0b', OFF, OFF]), `<strong>Wrong:</strong> ${F(2, 7)} + ${F(3, 7)} = ${F(5, 14)}. Adding the denominators would make the parts smaller, but they are still sevenths.`]) +
      ex('Making a whole', [`${F(3, 8)} + ${F(5, 8)} = ${F(8, 8)}.`, `${F(8, 8)} means all 8 parts, which is <strong>1 whole</strong>.`]) +
      sim('g4-s903', S.s903, L, m) + tip('Read the fractions as words first: "three eighths plus four eighths". Then it is easy to hear that the answer is seven eighths.')
      : hero('apple', 'As die dele ewe groot is, is om breuke op te tel net om dele te tel: 2 sewendes en nog 3 sewendes maak 5 sewendes.') +
      def('Optel met dieselfde noemer', `<strong>Tel die tellers bymekaar. Hou die noemer.</strong> Die noemer sê hoe groot die dele is, en optel verander nie die grootte van die dele nie.`) +
      ex('Twee sewendes plus drie sewendes', ['Sê dit: twee sewendes plus drie sewendes is vyf sewendes.', `Skryf dit: ${F(2, 7)} + ${F(3, 7)} = ${F(5, 7)}.` + bar(7, ['#22c55e', '#22c55e', '#f59e0b', '#f59e0b', '#f59e0b', OFF, OFF]), `<strong>Verkeerd:</strong> ${F(2, 7)} + ${F(3, 7)} = ${F(5, 14)}. As jy die noemers bymekaartel, word die dele kleiner, maar hulle is steeds sewendes.`]) +
      ex('\'n Heel maak', [`${F(3, 8)} + ${F(5, 8)} = ${F(8, 8)}.`, `${F(8, 8)} beteken al 8 dele, en dit is <strong>1 heel</strong>.`]) +
      sim('g4-s903', S.s903, L, m) + tip('Lees die breuke eers as woorde: "drie agstes plus vier agstes". Dan hoor jy maklik dat die antwoord sewe agstes is.');
  },
  qs: [
    { en: `${F(1, 5)} + ${F(2, 5)} = ? (Type it like 2/3.)` + bar(5, ['#22c55e', '#f59e0b', '#f59e0b', OFF, OFF]), af: `${F(1, 5)} + ${F(2, 5)} = ? (Tik dit soos 2/3.)` + bar(5, ['#22c55e', '#f59e0b', '#f59e0b', OFF, OFF]), a: '3/5', lv: 'K', h: ['Add the numerators. Keep the denominator.', 'Tel die tellers bymekaar. Hou die noemer.'], s: same('1/5 + 2/5 = (1 + 2)/5 = 3/5') },
    { en: `${F(2, 7)} + ${F(3, 7)} = ? (Type it like 2/3.)`, af: `${F(2, 7)} + ${F(3, 7)} = ? (Tik dit soos 2/3.)`, a: '5/7', lv: 'R', h: ['2 sevenths + 3 sevenths', '2 sewendes + 3 sewendes'], s: same('2/7 + 3/7 = 5/7') },
    { en: 'Two sevenths plus three sevenths equals …', af: 'Twee sewendes plus drie sewendes is …', o: [['five sevenths', 'five fourteenths', 'six sevenths', 'one seventh'], ['vyf sewendes', 'vyf veertiendes', 'ses sewendes', 'een sewende']], a: 0, lv: 'K', h: ['The parts are sevenths. How many sevenths are there?', 'Die dele is sewendes. Hoeveel sewendes is daar?'], s: [['2 sevenths + 3 sevenths = 5 sevenths'], ['2 sewendes + 3 sewendes = 5 sewendes']] },
    { en: `${F(3, 8)} + ${F(4, 8)} = ? (Type it like 2/3.)` + bar(8, ['#22c55e', '#22c55e', '#22c55e', '#f59e0b', '#f59e0b', '#f59e0b', '#f59e0b', OFF]), af: `${F(3, 8)} + ${F(4, 8)} = ? (Tik dit soos 2/3.)` + bar(8, ['#22c55e', '#22c55e', '#22c55e', '#f59e0b', '#f59e0b', '#f59e0b', '#f59e0b', OFF]), a: '7/8', lv: 'R', h: ['3 + 4 eighths', '3 + 4 agstes'], s: same('3/8 + 4/8 = 7/8') },
    { en: `${F(2, 6)} + ${F(3, 6)} + ${F(1, 6)} = ?`, af: `${F(2, 6)} + ${F(3, 6)} + ${F(1, 6)} = ?`, o: [[`${F(6, 6)} = 1 whole`, F(6, 18), F(5, 6), F(6, 12)], [`${F(6, 6)} = 1 heel`, F(6, 18), F(5, 6), F(6, 12)]], a: 0, lv: 'C', h: ['Add all three numerators.', 'Tel al drie tellers bymekaar.'], s: [['2 + 3 + 1 = 6 sixths = 6/6, which is 1 whole.'], ['2 + 3 + 1 = 6 sesdes = 6/6, en dit is 1 heel.']] },
    { en: `${F(3, 9)} + ${F('?', 9)} = ${F(7, 9)}. What is the missing numerator?`, af: `${F(3, 9)} + ${F('?', 9)} = ${F(7, 9)}. Wat is die ontbrekende teller?`, a: '4', lv: 'C', h: ['3 + ? = 7', '3 + ? = 7'], s: same('7 − 3 = 4, so 3/9 + 4/9 = 7/9') },
    { en: `Kim says ${F(1, 4)} + ${F(2, 4)} = ${F(3, 8)}. What mistake did Kim make?`, af: `Kim sê ${F(1, 4)} + ${F(2, 4)} = ${F(3, 8)}. Watter fout het Kim gemaak?`, o: [['Kim added the denominators too. The answer is 3/4.', 'Kim added the numerators. The answer is 1/4.', 'There is no mistake.', 'Kim should have multiplied. The answer is 2/16.'], ['Kim het die noemers ook bymekaargetel. Die antwoord is 3/4.', 'Kim het die tellers bymekaargetel. Die antwoord is 1/4.', 'Daar is geen fout nie.', 'Kim moes vermenigvuldig het. Die antwoord is 2/16.']], a: 0, lv: 'C', h: ['Should the denominator change when you add?', 'Moet die noemer verander as jy optel?'], s: [['The parts are still quarters: 1/4 + 2/4 = 3/4.'], ['Die dele is steeds kwarte: 1/4 + 2/4 = 3/4.']] },
    { en: `Jabu paints ${F(1, 4)} of a fence on Saturday and ${F(2, 4)} of it on Sunday. What fraction of the fence has been painted? (Type it like 2/3.)` + bar(4, ['#22c55e', '#f59e0b', '#f59e0b', OFF]), af: `Jabu verf ${F(1, 4)} van \'n heining op Saterdag en ${F(2, 4)} daarvan op Sondag. Watter breuk van die heining is geverf? (Tik dit soos 2/3.)` + bar(4, ['#22c55e', '#f59e0b', '#f59e0b', OFF]), a: '3/4', lv: 'P', h: ['Add the two fractions.', 'Tel die twee breuke bymekaar.'], s: same('1/4 + 2/4 = 3/4') }
  ],
  wb: {
    en: [{ t: 'Add.', p: [`${F(1, 3)} + ${F(1, 3)}`, `${F(2, 5)} + ${F(2, 5)}`, `${F(3, 8)} + ${F(2, 8)}`, `${F(1, 7)} + ${F(3, 7)} + ${F(2, 7)}`], m: [1, 1, 1, 2] },
      { t: 'Write a number sentence with fractions and work out the answer.', p: ['four sixths plus one sixth', 'three eighths plus five eighths'], m: [2, 2] },
      { t: `Draw a bar with 8 equal parts. Colour ${F(3, 8)} green and ${F(4, 8)} orange.`, p: ['What fraction is coloured altogether?'], m: [2] },
      { t: `Sam drinks ${F(2, 6)} of a bottle of juice in the morning and ${F(3, 6)} of it in the afternoon.`, p: ['What fraction of the bottle did Sam drink?'], m: [2] }],
    af: [{ t: 'Tel op.', p: [`${F(1, 3)} + ${F(1, 3)}`, `${F(2, 5)} + ${F(2, 5)}`, `${F(3, 8)} + ${F(2, 8)}`, `${F(1, 7)} + ${F(3, 7)} + ${F(2, 7)}`], m: [1, 1, 1, 2] },
      { t: 'Skryf \'n getallesin met breuke en werk die antwoord uit.', p: ['vier sesdes plus een sesde', 'drie agstes plus vyf agstes'], m: [2, 2] },
      { t: `Teken \'n strook met 8 gelyke dele. Kleur ${F(3, 8)} groen en ${F(4, 8)} oranje.`, p: ['Watter breuk is altesaam gekleur?'], m: [2] },
      { t: `Sam drink ${F(2, 6)} van \'n bottel sap in die oggend en ${F(3, 6)} daarvan in die middag.`, p: ['Watter breuk van die bottel het Sam gedrink?'], m: [2] }],
    ans: [['2/3', '', ''], ['4/5', '', ''], ['5/8', '', ''], ['6/7', '', ''],
      ['4/6 + 1/6 = 5/6', '', ''], ['3/8 + 5/8 = 8/8 = 1', '8/8 is 1 whole', '8/8 is 1 heel'],
      ['7/8', '3 + 4 = 7 parts coloured', '3 + 4 = 7 dele gekleur'],
      ['5/6', '2/6 + 3/6', '2/6 + 3/6']]
  }
});

/* ───────────── 904 Fractions of amounts and sharing ───────────── */
T.push({
  id: 904, name: { en: 'Fractions of amounts', af: 'Breuke van hoeveelhede' }, full: { en: 'Fractions of amounts and sharing', af: 'Breuke van hoeveelhede en deel' },
  body: lang => {
    const en = lang === 'en';
    const items = en ? [{ n: 'apples', s: 'apple' }, { n: 'bananas', s: 'banana' }, { n: 'mealies', s: 'mealie' }, { n: 'eggs', s: 'fried-egg' }, { n: 'ice creams', s: 'ice-cream' }]
      : [{ n: 'appels', s: 'apple' }, { n: 'piesangs', s: 'banana' }, { n: 'mielies', s: 'mealie' }, { n: 'eiers', s: 'fried-egg' }, { n: 'roomyse', s: 'ice-cream' }];
    const L = en ? { items, aria: 'A set of objects in groups', goal: (f, N, n) => 'Find ' + f + ' of ' + N + ' ' + n + '.', ask: 'Step 1: tap a number to share the set into that many equal groups. Step 2: tap groups to choose them. Then tap Check.', notEq: (N, v) => N + ' cannot be shared into ' + v + ' equal groups: ' + N + ' ÷ ' + v + ' leaves a remainder. Try another number.', grouped: (N, g, k) => N + ' ÷ ' + g + ' = ' + k + ' in each group. Now tap the groups you need.', picked: (s, c) => 'Chosen: ' + s + (s === 1 ? ' group' : ' groups') + ' = ' + c, noG: b => 'First share the set into equal groups. The denominator tells you how many groups.', wrongG: (f, b) => 'The denominator of ' + f + ' is ' + b + ', so share the set into ' + b + ' equal groups.', wrongSel: (f, a) => 'The numerator of ' + f + ' is ' + a + ', so choose ' + a + (a === 1 ? ' group.' : ' groups.'), yes: (u, f, N, b, k, a, c, n) => 'Correct! ' + u + ' of ' + N + ' = ' + N + ' ÷ ' + b + ' = ' + k + '. So ' + f + ' of ' + N + ' = ' + a + ' × ' + k + ' = <b>' + c + ' ' + n + '</b>.' }
      : { items, aria: '\'n Stel voorwerpe in groepe', goal: (f, N, n) => 'Vind ' + f + ' van ' + N + ' ' + n + '.', ask: 'Stap 1: tik op \'n getal om die stel in soveel gelyke groepe te deel. Stap 2: tik op groepe om hulle te kies. Tik dan op Toets.', notEq: (N, v) => N + ' kan nie in ' + v + ' gelyke groepe gedeel word nie: ' + N + ' ÷ ' + v + ' laat \'n res. Probeer \'n ander getal.', grouped: (N, g, k) => N + ' ÷ ' + g + ' = ' + k + ' in elke groep. Tik nou op die groepe wat jy nodig het.', picked: (s, c) => 'Gekies: ' + s + (s === 1 ? ' groep' : ' groepe') + ' = ' + c, noG: b => 'Deel eers die stel in gelyke groepe. Die noemer sê hoeveel groepe.', wrongG: (f, b) => 'Die noemer van ' + f + ' is ' + b + ', so deel die stel in ' + b + ' gelyke groepe.', wrongSel: (f, a) => 'Die teller van ' + f + ' is ' + a + ', so kies ' + a + (a === 1 ? ' groep.' : ' groepe.'), yes: (u, f, N, b, k, a, c, n) => 'Reg! ' + u + ' van ' + N + ' = ' + N + ' ÷ ' + b + ' = ' + k + '. Dus ' + f + ' van ' + N + ' = ' + a + ' × ' + k + ' = <b>' + c + ' ' + n + '</b>.' };
    const m = `<h4>🎮 ${en ? 'Share and Find' : 'Deel en Vind'}</h4><p class="how">${en ? 'Share the set into equal groups (the denominator), then take some of the groups (the numerator).' : 'Deel die stel in gelyke groepe (die noemer) en neem dan van die groepe (die teller).'}</p><div class="g4-big" data-k="goal" style="font-size:24px"></div><div class="g4-row" data-k="grp" style="gap:6px"></div><div class="g4-stage" data-k="stage"></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('fried-egg', `To find ${F(3, 4)} of an amount, first find ${F(1, 4)} by dividing by 4. Then take 3 of those parts.`) +
      def('A fraction of an amount', `<strong>Divide by the denominator</strong> to find one part. <strong>Multiply by the numerator</strong> to find that many parts.`) +
      ex(`${F(3, 4)} of 28 m`, [`${F(1, 4)} of 28 m = 28 m ÷ 4 = <strong>7 m</strong>.` + ribbon(28, 4, 3, 'm', '7 m'), `${F(3, 4)} of 28 m = 3 × 7 m = <strong>21 m</strong>.`]) +
      ex('5 slices of bread shared equally by 4 friends', ['Each friend gets 1 whole slice. That uses 4 slices, and 1 slice is left over.', `Cut the last slice into 4 equal pieces. Each friend gets ${F(1, 4)} of it.` + slices(5, 4), `Each friend gets <strong>1 and ${F(1, 4)} slices</strong> (we write 1${F(1, 4)}).`]) +
      ex('Halves in measurement', ['A comma with a 5 after it means a half: 0,5 = ½. You will see this on bottles, rulers and scales.', '1,5 ℓ means 1½ ℓ, which is 1 ℓ and 500 mℓ.' + jug(), '2,5 m means 2½ m, which is 2 m 50 cm. 0,5 kg means ½ kg, which is 500 g.']) +
      sim('g4-s904', S.s904, L, m) + tip(`Check your answer: ${F(4, 4)} of 28 m must be all 28 m, and 4 × 7 m = 28 m.`)
      : hero('fried-egg', `Om ${F(3, 4)} van \'n hoeveelheid te vind, vind eers ${F(1, 4)} deur deur 4 te deel. Neem dan 3 van daardie dele.`) +
      def('\'n Breuk van \'n hoeveelheid', `<strong>Deel deur die noemer</strong> om een deel te vind. <strong>Vermenigvuldig met die teller</strong> om soveel dele te vind.`) +
      ex(`${F(3, 4)} van 28 m`, [`${F(1, 4)} van 28 m = 28 m ÷ 4 = <strong>7 m</strong>.` + ribbon(28, 4, 3, 'm', '7 m'), `${F(3, 4)} van 28 m = 3 × 7 m = <strong>21 m</strong>.`]) +
      ex('5 snye brood word gelykop tussen 4 vriende gedeel', ['Elke vriend kry 1 hele sny. Dit gebruik 4 snye, en 1 sny bly oor.', `Sny die laaste sny in 4 gelyke stukke. Elke vriend kry ${F(1, 4)} daarvan.` + slices(5, 4), `Elke vriend kry <strong>1 en ${F(1, 4)} snye</strong> (ons skryf 1${F(1, 4)}).`]) +
      ex('Helftes in meting', ['\'n Komma met \'n 5 daarna beteken \'n half: 0,5 = ½. Jy sien dit op bottels, liniale en skale.', '1,5 ℓ beteken 1½ ℓ, en dit is 1 ℓ en 500 mℓ.' + jug(), '2,5 m beteken 2½ m, en dit is 2 m 50 cm. 0,5 kg beteken ½ kg, en dit is 500 g.']) +
      sim('g4-s904', S.s904, L, m) + tip(`Toets jou antwoord: ${F(4, 4)} van 28 m moet al 28 m wees, en 4 × 7 m = 28 m.`);
  },
  qs: [
    { en: `${F(1, 2)} of 10 = ?` + dots(10, 5, 5), af: `${F(1, 2)} van 10 = ?` + dots(10, 5, 5), a: '5', lv: 'K', h: ['10 ÷ 2', '10 ÷ 2'], s: same('10 ÷ 2 = 5') },
    { en: `What is ${F(1, 4)} of 28 m?` + ribbon(28, 4, 1, 'm'), af: `Wat is ${F(1, 4)} van 28 m?` + ribbon(28, 4, 1, 'm'), a: '7 m', lv: 'R', h: ['Divide by the denominator.', 'Deel deur die noemer.'], s: same('28 m ÷ 4 = 7 m') },
    { en: `What is ${F(3, 4)} of 28 m?` + ribbon(28, 4, 3, 'm'), af: `Wat is ${F(3, 4)} van 28 m?` + ribbon(28, 4, 3, 'm'), a: '21 m', lv: 'R', h: ['First find 1/4, then multiply by 3.', 'Vind eers 1/4 en vermenigvuldig dan met 3.'], s: same('28 m ÷ 4 = 7 m; 3 × 7 m = 21 m') },
    { en: `What is ${F(1, 5)} of R40?`, af: `Wat is ${F(1, 5)} van R40?`, a: 'R8', lv: 'R', h: ['R40 ÷ 5', 'R40 ÷ 5'], s: same('R40 ÷ 5 = R8') },
    { en: `There are 18 apples. How many apples are ${F(2, 3)} of them?` + dots(18, 12, 6), af: `Daar is 18 appels. Hoeveel appels is ${F(2, 3)} daarvan?` + dots(18, 12, 6), a: '12', lv: 'C', h: ['Share into 3 rows. How many are in 2 rows?', 'Deel in 3 rye. Hoeveel is in 2 rye?'], s: same('18 ÷ 3 = 6; 2 × 6 = 12') },
    { en: '5 slices of bread are shared equally by 4 friends. How much bread does each friend get?' + slices(5, 4), af: '5 snye brood word gelykop tussen 4 vriende gedeel. Hoeveel brood kry elke vriend?' + slices(5, 4), o: [[`1${F(1, 4)} slices`, '1 slice', `1${F(1, 2)} slices`, `${F(4, 5)} of a slice`], [`1${F(1, 4)} snye`, '1 sny', `1${F(1, 2)} snye`, `${F(4, 5)} van \'n sny`]], a: 0, lv: 'C', h: ['Give everyone 1 slice first. Then share the slice that is left.', 'Gee eers vir elkeen 1 sny. Deel dan die sny wat oorbly.'], s: [['Each gets 1 slice; 1 slice is left; 1 ÷ 4 = 1/4. So each gets 1 1/4 slices.'], ['Elkeen kry 1 sny; 1 sny bly oor; 1 ÷ 4 = 1/4. Dus kry elkeen 1 1/4 snye.']] },
    { en: 'A bottle says 1,5 ℓ. How much is that?' + jug(), af: '\'n Bottel sê 1,5 ℓ. Hoeveel is dit?' + jug(), o: [['1½ ℓ', '15 ℓ', '1 ℓ and 5 mℓ', '5 ℓ'], ['1½ ℓ', '15 ℓ', '1 ℓ en 5 mℓ', '5 ℓ']], a: 0, lv: 'K', h: ['0,5 means a half.', '0,5 beteken \'n half.'], s: [['1,5 ℓ = 1 ℓ and a half = 1½ ℓ = 1 ℓ 500 mℓ'], ['1,5 ℓ = 1 ℓ en \'n half = 1½ ℓ = 1 ℓ 500 mℓ']] },
    { en: `A rope is 60 m long. Thabo cuts off ${F(3, 5)} of it. How long is the piece that is cut off?` + ribbon(60, 5, 3, 'm'), af: `\'n Tou is 60 m lank. Thabo sny ${F(3, 5)} daarvan af. Hoe lank is die stuk wat afgesny is?` + ribbon(60, 5, 3, 'm'), a: '36 m', lv: 'P', h: ['1/5 of 60 m first.', 'Eers 1/5 van 60 m.'], s: same('60 m ÷ 5 = 12 m; 3 × 12 m = 36 m') }
  ],
  wb: {
    en: [{ t: 'Calculate.', p: [`${F(1, 3)} of 24`, `${F(1, 6)} of 30`, `${F(3, 8)} of 40`, `${F(2, 7)} of 21`], m: [1, 1, 2, 2] },
      { t: 'A road is 32 km long.' + ribbon(32, 4, 0, 'km'), p: [`How long is ${F(1, 4)} of the road?`, `How long is ${F(3, 4)} of the road?`], m: [1, 2] },
      { t: '7 pancakes are shared equally between 2 children.', p: ['How many pancakes does each child get? Draw a picture to show how you shared them.'], m: [3] },
      { t: 'Write with a fraction, then in smaller units.', p: ['2,5 m', '0,5 kg', '1,5 ℓ'], m: [1, 1, 1] }],
    af: [{ t: 'Bereken.', p: [`${F(1, 3)} van 24`, `${F(1, 6)} van 30`, `${F(3, 8)} van 40`, `${F(2, 7)} van 21`], m: [1, 1, 2, 2] },
      { t: '\'n Pad is 32 km lank.' + ribbon(32, 4, 0, 'km'), p: [`Hoe lank is ${F(1, 4)} van die pad?`, `Hoe lank is ${F(3, 4)} van die pad?`], m: [1, 2] },
      { t: '7 pannekoeke word gelykop tussen 2 kinders gedeel.', p: ['Hoeveel pannekoeke kry elke kind? Teken \'n prent om te wys hoe jy hulle gedeel het.'], m: [3] },
      { t: 'Skryf met \'n breuk en dan in kleiner eenhede.', p: ['2,5 m', '0,5 kg', '1,5 ℓ'], m: [1, 1, 1] }],
    ans: [['8', '24 ÷ 3', '24 ÷ 3'], ['5', '30 ÷ 6', '30 ÷ 6'], ['15', '40 ÷ 8 = 5; 3 × 5', '40 ÷ 8 = 5; 3 × 5'], ['6', '21 ÷ 7 = 3; 2 × 3', '21 ÷ 7 = 3; 2 × 3'],
      ['8 km', '32 km ÷ 4', '32 km ÷ 4'], ['24 km', '3 × 8 km', '3 × 8 km'],
      ['3½', '3 each, and the last pancake is cut in half', 'elkeen 3, en die laaste pannekoek word in die helfte gesny'],
      ['2½ m = 2 m 50 cm', '', ''], ['½ kg = 500 g', '', ''], ['1½ ℓ = 1 ℓ 500 mℓ', '', '']]
  }
});

writeChapter(9, { en: 'Common Fractions', af: 'Gewone Breuke' }, T, process.argv[2] || OUT_DEFAULT);
