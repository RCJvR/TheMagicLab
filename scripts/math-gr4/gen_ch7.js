// Grade 4 Math Magician, Chapter 7: Perimeter, area, capacity and volume (one bilingual source).
// Run: node scripts/math-gr4/gen_ch7.js   (writes math-magician/gr4/ch7.js, ch7.af.js, ch7.help.js)
// CAPS 4.4 (Term 2): perimeter with rulers, area with square grids and tiling, capacity by filling, volume with 1 cm³ cubes.
// Notes on the CAPS draft:
//   - The draft has no worked numbers for this section, so every example here is new and checked.
//   - The draft lists perimeter, area, capacity and volume as one topic; it is split into four lessons (one per idea).
//   - Grade 4 has no decimals yet, so capacity is written as "3 l 500 ml" / "3 500 ml", never "3,5 l".
//   - A ruler cannot be used on a screen, so the lessons give side lengths; the workbook keeps the measuring task.
const { ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT } = require('./lib.js');
const S = require('./sims_ch7.js');
const T = [];
const same = s => [[s], [s]];

/* ───────────── Figures (inline SVG; text uses currentColor so it reads on screen and in print) ───────────── */
const BLUE = '#3b82f6', FILL = 'rgba(59,130,246,.16)';
const svgw = (vb, body, mw) => `<svg viewBox="${vb}" style="display:block;width:100%;max-width:${mw || 300}px;margin:12px auto" role="img" aria-hidden="true">${body}</svg>`;
const txt = (x, y, s, size, anc) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anc || 'middle'}" fill="currentColor" font-size="${size || 17}" font-weight="800" font-family="sans-serif">${s}</text>`;
// A polygon from points in units, with a label on each side ('' = no label).
function poly(pts, labs, mw) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), minX = Math.min(...xs), minY = Math.min(...ys);
  const U = Math.min(240 / (Math.max(...xs) - minX), 180 / (Math.max(...ys) - minY)), M = 50, MX = 66;
  const P = pts.map(p => [MX + (p[0] - minX) * U, M + (p[1] - minY) * U]);
  let a = 0; P.forEach((p, i) => { const r = P[(i + 1) % P.length]; a += p[0] * r[1] - r[0] * p[1]; });
  const sg = a > 0 ? 1 : -1;
  let g = `<polygon points="${P.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}" fill="${FILL}" stroke="${BLUE}" stroke-width="3" stroke-linejoin="round"/>`;
  P.forEach((p, i) => {
    if (!labs[i]) return;
    const r = P[(i + 1) % P.length], dx = r[0] - p[0], dy = r[1] - p[1], l = Math.hypot(dx, dy), nx = sg * dy / l, ny = -sg * dx / l;
    const side = Math.abs(nx) > 0.7, mx = (p[0] + r[0]) / 2, my = (p[1] + r[1]) / 2;
    g += side ? txt(mx + nx * 9, my + ny * 9 + 6, labs[i], 17, nx > 0 ? 'start' : 'end') : txt(mx + nx * 22, my + ny * 22 + 6, labs[i]);
  });
  const w = (Math.max(...xs) - minX) * U + 2 * MX, h = (Math.max(...ys) - minY) * U + 2 * M;
  return svgw(`0 0 ${w.toFixed(0)} ${h.toFixed(0)}`, g, mw);
}
const rect = (w, h, u, wl, hl) => poly([[0, 0], [w, 0], [w, h], [0, h]], [wl || w + ' ' + u, hl || h + ' ' + u, '', '']);
const regular = (n, lab) => poly(Array.from({ length: n }, (_, i) => [Math.cos(-Math.PI / 2 + i * 2 * Math.PI / n), Math.sin(-Math.PI / 2 + i * 2 * Math.PI / n)]), Array(n).fill(lab), 230);
// A square grid; rows are strings, X = shaded square.
function grid(rows, mw) {
  const U = 30, C = Math.max(...rows.map(r => r.length)), R = rows.length;
  let g = '';
  rows.forEach((r, y) => { for (let x = 0; x < C; x++) g += `<rect x="${3 + x * U}" y="${3 + y * U}" width="${U}" height="${U}" fill="${r[x] === 'X' ? 'rgba(59,130,246,.45)' : 'none'}" stroke="#94a3b8" stroke-width="1.2"/>`; });
  return svgw(`0 0 ${C * U + 6} ${R * U + 6}`, g, mw || Math.min(300, C * 34));
}
// A box of 1 cm cubes drawn in 3-D (length l to the right, width w to the left, height h up); dims adds edge labels.
function prism(l, w, h, dims, mw) {
  const s = 28, c = 0.866, P = (x, y, z) => [(x - y) * c * s, (x + y) * 0.5 * s - z * s];
  const pg = (a, f) => `<polygon points="${a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}" fill="${f}" stroke="#1e3a8a" stroke-width="2" stroke-linejoin="round"/>`;
  const ln = (a, b) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#1e3a8a" stroke-width="1.4"/>`;
  let g = pg([P(l, 0, 0), P(l, w, 0), P(l, w, h), P(l, 0, h)], '#3b82f6') + pg([P(0, w, 0), P(l, w, 0), P(l, w, h), P(0, w, h)], '#60a5fa') + pg([P(0, 0, h), P(l, 0, h), P(l, w, h), P(0, w, h)], '#bfdbfe');
  for (let j = 1; j < w; j++) g += ln(P(l, j, 0), P(l, j, h)) + ln(P(0, j, h), P(l, j, h));
  for (let i = 1; i < l; i++) g += ln(P(i, w, 0), P(i, w, h)) + ln(P(i, 0, h), P(i, w, h));
  for (let k = 1; k < h; k++) g += ln(P(l, 0, k), P(l, w, k)) + ln(P(0, w, k), P(l, w, k));
  let x0 = -w * c * s - 10, x1 = l * c * s + 10, y0 = -h * s - 10, y1 = (l + w) * 0.5 * s + 10;
  if (dims) {
    const a = P(0, w, 0), b = P(l, w, 0), d = P(l, 0, 0), e = P(l, 0, h);
    g += txt((a[0] + b[0]) / 2 - 14, (a[1] + b[1]) / 2 + 24, l + ' cm', 16) + txt((b[0] + d[0]) / 2 + 22, (b[1] + d[1]) / 2 + 22, w + ' cm', 16) + txt(d[0] + 30, (d[1] + e[1]) / 2, h + ' cm', 16);
    x0 -= 20; x1 += 46; y1 += 26;
  }
  return svgw(`${x0.toFixed(0)} ${y0.toFixed(0)} ${(x1 - x0).toFixed(0)} ${(y1 - y0).toFixed(0)}`, g, mw || 220);
}
const pair = (a, b) => `<div style="display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:flex-end"><div style="text-align:center;font-weight:900">${a}A</div><div style="text-align:center;font-weight:900">${b}B</div></div>`;
// A measuring jug filled to ml, marked every 100 ml up to max.
function jug(ml, max) {
  const top = 14, bot = 214, x = 70, w = 110, H = bot - top, lv = H * ml / max;
  let g = `<rect x="${x}" y="${bot - lv}" width="${w}" height="${lv}" fill="rgba(56,189,248,.55)"/>`;
  for (let v = 100; v <= max; v += 100) { const y = bot - H * v / max, big = v % 500 === 0; g += `<line x1="${x}" y1="${y}" x2="${x + (big ? 34 : 18)}" y2="${y}" stroke="currentColor" stroke-width="2"/>`; if (v % 200 === 0 || big) g += `<text x="${x - 8}" y="${y + 5}" text-anchor="end" fill="currentColor" font-size="14" font-weight="700" font-family="sans-serif">${v}</text>`; }
  g += `<path d="M${x} ${top - 6} V${bot} H${x + w} V${top - 6} M${x + w} ${top + 20} q34 10 0 70" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>` + txt(x + w / 2, bot + 24, 'ml', 15);
  return svgw('0 0 230 246', g, 200);
}
const cups = (n, extra) => svgw(`0 0 ${n * 62 + 10} 96`, Array.from({ length: n }, (_, i) => `<image href="/assets/stickers/ceramic-mug.webp" x="${6 + i * 62}" y="4" width="62" height="62"/>`).join('') + txt((n * 62 + 10) / 2, 90, extra || n + ' × 250 ml', 16), Math.min(320, n * 50));
const Lshape = poly([[0, 0], [8, 0], [8, 3], [3, 3], [3, 6], [0, 6]], ['8 cm', '3 cm', '5 cm', '3 cm', '3 cm', '6 cm']);
const tri = poly([[4.6875, 0.255], [8, 4], [0, 4]], ['5 cm', '8 cm', '6 cm']);

/* ───────────── 701 Perimeter ───────────── */
T.push({
  id: 701, name: { en: 'Perimeter', af: 'Omtrek' }, full: { en: 'Perimeter of polygons', af: 'Omtrek van veelhoeke' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { unit: 'cm', tapSides: 'Tap each side as you walk around.', ask: n => 'This shape has ' + n + ' sides. Tap each side to walk around it, then type the perimeter.', yes: (s, P) => 'Correct! ' + s + ' = <b>' + P + ' cm</b>. You walked all the way around.', missed: n => 'Not yet. You have not walked along ' + (n === 1 ? '1 side' : n + ' sides') + ' yet. The perimeter goes all the way around, so tap every side.', sum: (v, more) => 'All the sides are counted, but ' + v + ' cm is not the total. Add the green numbers again: your answer is too ' + (more ? 'small' : 'big') + '.' }
      : { unit: 'cm', tapSides: 'Tik op elke sy terwyl jy om die vorm loop.', ask: n => 'Hierdie vorm het ' + n + ' sye. Tik op elke sy om om die vorm te loop en tik dan die omtrek in.', yes: (s, P) => 'Reg! ' + s + ' = <b>' + P + ' cm</b>. Jy het heeltemal om die vorm geloop.', missed: n => 'Nog nie. Jy het nog nie langs ' + (n === 1 ? '1 sy' : n + ' sye') + ' geloop nie. Die omtrek gaan heeltemal om, so tik op elke sy.', sum: (v, more) => 'Al die sye is getel, maar ' + v + ' cm is nie die totaal nie. Tel die groen getalle weer bymekaar: jou antwoord is te ' + (more ? 'klein' : 'groot') + '.' };
    const m = `<h4>🎮 ${en ? 'Walk the Fence' : 'Loop om die Heining'}</h4><p class="how">${en ? 'Tap each side of the shape to walk along it. It turns green and is added to your sum. Then type the perimeter.' : 'Tik op elke sy van die vorm om daarlangs te loop. Dit word groen en word by jou som getel. Tik dan die omtrek in.'}</p><div class="g4-stage"><svg viewBox="0 0 540 340" data-k="svg" role="img" aria-label="${en ? 'shape' : 'vorm'}"></svg></div><div class="g4-big" data-k="run" style="font-size:22px"></div><div class="g4-row"><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="${en ? 'perimeter' : 'omtrek'}"><span style="font-size:20px">cm</span><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('ant', 'The <strong>perimeter</strong> is the distance all the way around the outside of a shape. Imagine an ant walking along every side until it is back where it started.') +
      def('Perimeter', 'Add the lengths of <strong>all</strong> the sides. Perimeter is a length, so we measure it in mm, cm, m or km.') + rect(6, 4, 'cm') +
      ex('Worked examples', ['The rectangle above is 6 cm long and 4 cm wide. Perimeter = 6 + 4 + 6 + 4 = <strong>20 cm</strong>.', 'A triangle has sides of 5 cm, 7 cm and 8 cm. Perimeter = 5 + 7 + 8 = <strong>20 cm</strong>.', 'A square has sides of 9 m. Perimeter = 9 + 9 + 9 + 9 = 4 × 9 = <strong>36 m</strong>.']) +
      sim('g4-s701', S.s701, L, m) + tip('When you measure with a ruler or a measuring tape, write down each side and tick it off. Then you will not count a side twice or forget one.')
      : hero('ant', 'Die <strong>omtrek</strong> is die afstand heeltemal om die buitekant van \'n vorm. Stel jou voor \'n mier loop langs elke sy totdat hy terug is waar hy begin het.') +
      def('Omtrek', 'Tel die lengtes van <strong>al</strong> die sye bymekaar. Omtrek is \'n lengte, so ons meet dit in mm, cm, m of km.') + rect(6, 4, 'cm') +
      ex('Uitgewerkte voorbeelde', ['Die reghoek hierbo is 6 cm lank en 4 cm breed. Omtrek = 6 + 4 + 6 + 4 = <strong>20 cm</strong>.', '\'n Driehoek het sye van 5 cm, 7 cm en 8 cm. Omtrek = 5 + 7 + 8 = <strong>20 cm</strong>.', '\'n Vierkant het sye van 9 m. Omtrek = 9 + 9 + 9 + 9 = 4 × 9 = <strong>36 m</strong>.']) +
      sim('g4-s701', S.s701, L, m) + tip('As jy met \'n liniaal of \'n maatband meet, skryf elke sy neer en merk dit af. Dan tel jy nie \'n sy twee keer nie en vergeet jy nie een nie.');
  },
  qs: [
    { en: 'What is the perimeter of this rectangle (in cm)?' + rect(7, 3, 'cm'), af: 'Wat is die omtrek van hierdie reghoek (in cm)?' + rect(7, 3, 'cm'), a: '20', lv: 'R', h: ['Add all four sides: 7 + 3 + 7 + 3.', 'Tel al vier sye bymekaar: 7 + 3 + 7 + 3.'], s: same('7 + 3 + 7 + 3 = 20 cm') },
    { en: 'What is the perimeter of this triangle (in cm)?' + tri, af: 'Wat is die omtrek van hierdie driehoek (in cm)?' + tri, a: '19', lv: 'R', h: ['Add the three sides.', 'Tel die drie sye bymekaar.'], s: same('5 + 8 + 6 = 19 cm') },
    { en: 'A square has sides of 9 cm. What is its perimeter (in cm)?' + rect(1, 1, 'cm', '9 cm', '9 cm'), af: '\'n Vierkant het sye van 9 cm. Wat is sy omtrek (in cm)?' + rect(1, 1, 'cm', '9 cm', '9 cm'), a: '36', lv: 'R', h: ['A square has 4 equal sides.', '\'n Vierkant het 4 gelyke sye.'], s: same('4 × 9 = 36 cm') },
    { en: 'What is the perimeter of a shape?', af: 'Wat is die omtrek van \'n vorm?', o: [['the distance all the way around it', 'the space inside it', 'the number of corners it has', 'the length of one side'], ['die afstand heeltemal om dit', 'die ruimte binne-in dit', 'die aantal hoeke wat dit het', 'die lengte van een sy']], a: 0, lv: 'K', h: ['"Peri" means around.', '"Om" in omtrek beteken rondom.'], s: [['Perimeter is the distance around the outside of a shape.'], ['Omtrek is die afstand om die buitekant van \'n vorm.']] },
    { en: 'What is the perimeter of this shape (in cm)?' + Lshape, af: 'Wat is die omtrek van hierdie vorm (in cm)?' + Lshape, a: '28', lv: 'C', h: ['There are 6 sides. Add all of them.', 'Daar is 6 sye. Tel hulle almal bymekaar.'], s: same('8 + 3 + 5 + 3 + 3 + 6 = 28 cm') },
    { en: 'Each side of this pentagon is 6 cm. What is its perimeter (in cm)?' + regular(5, '6 cm'), af: 'Elke sy van hierdie vyfhoek is 6 cm. Wat is sy omtrek (in cm)?' + regular(5, '6 cm'), a: '30', lv: 'R', h: ['A pentagon has 5 sides.', '\'n Vyfhoek het 5 sye.'], s: same('5 × 6 = 30 cm') },
    { en: 'A rectangular garden is 12 m long and 8 m wide. How many metres of fencing go all the way around it?' + rect(12, 8, 'm'), af: '\'n Reghoekige tuin is 12 m lank en 8 m breed. Hoeveel meter heining gaan heeltemal om dit?' + rect(12, 8, 'm'), a: '40', lv: 'P', h: ['The fence goes around the outside: that is the perimeter.', 'Die heining gaan om die buitekant: dit is die omtrek.'], s: [['12 + 8 + 12 + 8 = 40 m of fencing'], ['12 + 8 + 12 + 8 = 40 m heining']] },
    { en: 'This rectangle has a perimeter of 24 cm. It is 8 cm long. How wide is it (in cm)?' + rect(8, 4, 'cm', '8 cm', '?'), af: 'Hierdie reghoek het \'n omtrek van 24 cm. Dit is 8 cm lank. Hoe breed is dit (in cm)?' + rect(8, 4, 'cm', '8 cm', '?'), a: '4', lv: 'P', h: ['The two long sides make 16 cm. What is left for the two short sides?', 'Die twee lang sye maak 16 cm. Wat bly oor vir die twee kort sye?'], s: same('8 + 8 = 16; 24 − 16 = 8; 8 ÷ 2 = 4 cm') }
  ],
  wb: {
    en: [{ t: 'Find the perimeter of each shape.', p: ['A rectangle 10 cm long and 5 cm wide.', 'A square with sides of 7 cm.', 'A triangle with sides of 4 cm, 6 cm and 9 cm.'], m: [2, 2, 2] },
      { t: 'Use a ruler to measure each side of your maths book in cm.', p: ['Write down the four lengths.', 'Work out the perimeter of the book.'], m: [2, 2] },
      { t: 'Sipho walks once around a rectangular soccer field that is 100 m long and 60 m wide.' + rect(100, 60, 'm'), p: ['How far does he walk?', 'How far does he walk if he goes around 3 times?'], m: [2, 2] },
      { t: 'A square has a perimeter of 48 cm.', p: ['How long is one side?', 'Draw a rectangle (not a square) with the same perimeter. Write its length and width.'], m: [2, 3] }],
    af: [{ t: 'Vind die omtrek van elke vorm.', p: ['\'n Reghoek 10 cm lank en 5 cm breed.', '\'n Vierkant met sye van 7 cm.', '\'n Driehoek met sye van 4 cm, 6 cm en 9 cm.'], m: [2, 2, 2] },
      { t: 'Gebruik \'n liniaal en meet elke sy van jou wiskundeboek in cm.', p: ['Skryf die vier lengtes neer.', 'Werk die omtrek van die boek uit.'], m: [2, 2] },
      { t: 'Sipho loop een keer om \'n reghoekige sokkerveld wat 100 m lank en 60 m breed is.' + rect(100, 60, 'm'), p: ['Hoe ver loop hy?', 'Hoe ver loop hy as hy 3 keer om die veld loop?'], m: [2, 2] },
      { t: '\'n Vierkant het \'n omtrek van 48 cm.', p: ['Hoe lank is een sy?', 'Teken \'n reghoek (nie \'n vierkant nie) met dieselfde omtrek. Skryf sy lengte en breedte neer.'], m: [2, 3] }],
    ans: [['30 cm', '10 + 5 + 10 + 5', '10 + 5 + 10 + 5'], ['28 cm', '4 × 7', '4 × 7'], ['19 cm', '4 + 6 + 9', '4 + 6 + 9'],
      ['—', 'Own measurements: opposite sides of the book are equal.', 'Eie metings: oorstaande sye van die boek is gelyk.'], ['—', 'Add the four sides, for example 30 + 21 + 30 + 21 = 102 cm.', 'Tel die vier sye bymekaar, byvoorbeeld 30 + 21 + 30 + 21 = 102 cm.'],
      ['320 m', '100 + 60 + 100 + 60', '100 + 60 + 100 + 60'], ['960 m', '3 × 320', '3 × 320'],
      ['12 cm', '48 ÷ 4', '48 ÷ 4'], ['14 cm × 10 cm', 'One example: any length + width = 24 cm works (but not 12 and 12).', 'Een voorbeeld: enige lengte + breedte = 24 cm werk (maar nie 12 en 12 nie).']]
  }
});

/* ───────────── 702 Area ───────────── */
const G_L = grid(['XXXX..', 'XXXX..', 'XXXXXX', 'XXXXXX']);
const G_ST = grid(['X...', 'XX..', 'XXX.', 'XXXX']);
T.push({
  id: 702, name: { en: 'Area', af: 'Oppervlakte' }, full: { en: 'Area: square grids and tiling', af: 'Oppervlakte: vierkantroosters en teëls' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { counted: n => 'Squares counted: ' + n, have: (n, t) => 'Squares coloured: ' + n + ' (target: ' + t + ')', askCount: 'Count the blue squares. Tap each one to number it, then type the area.', askBuild: t => 'Tap squares to make any shape with an area of <b>' + t + ' square units</b>. Tap a square again to remove it.', yesCount: n => 'Correct! The shape covers <b>' + n + ' squares</b>, so its area is ' + n + ' square units.', noCount: (v, more) => 'Not quite. ' + v + ' is too ' + (more ? 'few' : 'many') + '. Tap each blue square so that you count every square once.', yesBuild: n => 'Well done! Your shape covers ' + n + ' squares: an area of <b>' + n + ' square units</b>. Shapes can look different and still have the same area.', noBuild: (n, t) => 'Your shape covers ' + n + (n === 1 ? ' square' : ' squares') + ', but you need ' + t + '. ' + (n < t ? 'Add ' + (t - n) + ' more.' : 'Take away ' + (n - t) + '.') }
      : { counted: n => 'Blokkies getel: ' + n, have: (n, t) => 'Blokkies ingekleur: ' + n + ' (teiken: ' + t + ')', askCount: 'Tel die blou blokkies. Tik op elkeen om dit te nommer en tik dan die oppervlakte in.', askBuild: t => 'Tik op blokkies om enige vorm met \'n oppervlakte van <b>' + t + ' vierkante eenhede</b> te maak. Tik weer op \'n blokkie om dit te verwyder.', yesCount: n => 'Reg! Die vorm bedek <b>' + n + ' blokkies</b>, so sy oppervlakte is ' + n + ' vierkante eenhede.', noCount: (v, more) => 'Nie heeltemal nie. ' + v + ' is te ' + (more ? 'min' : 'veel') + '. Tik op elke blou blokkie sodat jy elke blokkie een keer tel.', yesBuild: n => 'Mooi so! Jou vorm bedek ' + n + ' blokkies: \'n oppervlakte van <b>' + n + ' vierkante eenhede</b>. Vorms kan verskillend lyk en steeds dieselfde oppervlakte hê.', noBuild: (n, t) => 'Jou vorm bedek ' + n + (n === 1 ? ' blokkie' : ' blokkies') + ', maar jy het ' + t + ' nodig. ' + (n < t ? 'Voeg nog ' + (t - n) + ' by.' : 'Haal ' + (n - t) + ' weg.') };
    const m = `<h4>🎮 ${en ? 'Square Grid' : 'Vierkantrooster'}</h4><p class="how">${en ? 'Count: number the squares inside a shape. Build: colour squares to make a shape with the area you are given.' : 'Tel: nommer die blokkies binne-in \'n vorm. Bou: kleur blokkies in om \'n vorm met die gegewe oppervlakte te maak.'}</p><div class="g4-row"><button class="g4-btn ghost" data-m="count" aria-pressed="true">${en ? 'Count' : 'Tel'}</button><button class="g4-btn ghost" data-m="build" aria-pressed="false">${en ? 'Build' : 'Bou'}</button></div><div class="g4-stage"><svg viewBox="0 0 492 300" data-k="svg" role="img" aria-label="${en ? 'square grid' : 'vierkantrooster'}"></svg></div><div class="g4-big" data-k="live" style="font-size:20px"></div><div class="g4-row" data-k="countRow"><input class="g4-input" data-k="ans" inputmode="numeric" aria-label="${en ? 'area' : 'oppervlakte'}"><span style="font-size:18px">${en ? 'square units' : 'vierkante eenhede'}</span></div><div class="g4-row"><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('paper', 'The <strong>area</strong> of a shape is how much flat space it covers. We measure it by counting how many equal squares fit inside it, with no gaps and no overlaps.') +
      def('Square units', 'Each small square is <strong>1 square unit</strong>. If each square is 1 cm long and 1 cm wide, it is <strong>1 square centimetre (1 cm²)</strong>.') + grid(['XXXXX', 'XXXXX', 'XXXXX']) +
      ex('Find the area', ['The rectangle above is covered by 3 rows of 5 squares.', 'Count in rows: 5 + 5 + 5 = 15, or 3 × 5 = 15.', 'The area is <strong>15 square units</strong>.']) +
      sim('g4-s702', S.s702, L, m) + tip('Perimeter goes <em>around</em> a shape and is a length. Area covers the <em>inside</em> and is in square units. Two shapes can have the same area but different perimeters!')
      : hero('paper', 'Die <strong>oppervlakte</strong> van \'n vorm is hoeveel plat ruimte dit bedek. Ons meet dit deur te tel hoeveel ewe groot vierkante daarin pas, sonder gapings en sonder oorvleueling.') +
      def('Vierkante eenhede', 'Elke klein vierkantjie is <strong>1 vierkante eenheid</strong>. As elke vierkantjie 1 cm lank en 1 cm breed is, is dit <strong>1 vierkante sentimeter (1 cm²)</strong>.') + grid(['XXXXX', 'XXXXX', 'XXXXX']) +
      ex('Vind die oppervlakte', ['Die reghoek hierbo word deur 3 rye van 5 vierkantjies bedek.', 'Tel in rye: 5 + 5 + 5 = 15, of 3 × 5 = 15.', 'Die oppervlakte is <strong>15 vierkante eenhede</strong>.']) +
      sim('g4-s702', S.s702, L, m) + tip('Omtrek gaan <em>om</em> \'n vorm en is \'n lengte. Oppervlakte bedek die <em>binnekant</em> en is in vierkante eenhede. Twee vorms kan dieselfde oppervlakte maar verskillende omtrekke hê!');
  },
  qs: [
    { en: 'What is the area of the shaded shape (in square units)?' + grid(['XXXX', 'XXXX', 'XXXX']), af: 'Wat is die oppervlakte van die ingekleurde vorm (in vierkante eenhede)?' + grid(['XXXX', 'XXXX', 'XXXX']), a: '12', lv: 'K', h: ['Count the squares: 3 rows of 4.', 'Tel die vierkantjies: 3 rye van 4.'], s: same('4 + 4 + 4 = 12') },
    { en: 'What is the area of the shaded shape (in square units)?' + G_L, af: 'Wat is die oppervlakte van die ingekleurde vorm (in vierkante eenhede)?' + G_L, a: '20', lv: 'R', h: ['Count row by row.', 'Tel ry vir ry.'], s: same('4 + 4 + 6 + 6 = 20') },
    { en: 'What is the area of the shaded shape (in square units)?' + grid(['XXXXXX', 'XXXXXX']), af: 'Wat is die oppervlakte van die ingekleurde vorm (in vierkante eenhede)?' + grid(['XXXXXX', 'XXXXXX']), a: '12', lv: 'R', h: ['2 rows of 6.', '2 rye van 6.'], s: same('2 × 6 = 12') },
    { en: 'Which unit do we use for the area of a page?', af: 'Watter eenheid gebruik ons vir die oppervlakte van \'n bladsy?', o: [['cm²', 'cm', 'kg', 'ml'], ['cm²', 'cm', 'kg', 'ml']], a: 0, lv: 'K', h: ['Area is measured in square units.', 'Oppervlakte word in vierkante eenhede gemeet.'], s: [['cm² means square centimetres.'], ['cm² beteken vierkante sentimeter.']] },
    { en: 'Which shape has the bigger area?' + pair(grid(['XXXX', 'XXXX', 'XXXX'], 130), grid(['XXXXX', 'XXXXX'], 160)), af: 'Watter vorm het die groter oppervlakte?' + pair(grid(['XXXX', 'XXXX', 'XXXX'], 130), grid(['XXXXX', 'XXXXX'], 160)), o: [['A', 'B', 'They are the same'], ['A', 'B', 'Hulle is dieselfde']], a: 0, lv: 'R', h: ['Count the squares in each shape.', 'Tel die vierkantjies in elke vorm.'], s: [['A: 3 × 4 = 12 squares. B: 2 × 5 = 10 squares. A is bigger.'], ['A: 3 × 4 = 12 vierkantjies. B: 2 × 5 = 10 vierkantjies. A is groter.']] },
    { en: 'A floor is tiled with square tiles: 6 tiles along one side and 4 tiles along the other. How many tiles cover the floor?' + grid(['XXXXXX', 'XXXXXX', 'XXXXXX', 'XXXXXX']), af: '\'n Vloer is met vierkantige teëls belê: 6 teëls langs een kant en 4 teëls langs die ander kant. Hoeveel teëls bedek die vloer?' + grid(['XXXXXX', 'XXXXXX', 'XXXXXX', 'XXXXXX']), a: '24', lv: 'C', h: ['4 rows of 6 tiles.', '4 rye van 6 teëls.'], s: same('4 × 6 = 24') },
    { en: 'What is the area of this staircase shape (in square units)?' + G_ST, af: 'Wat is die oppervlakte van hierdie trapvorm (in vierkante eenhede)?' + G_ST, a: '10', lv: 'C', h: ['The rows have 1, 2, 3 and 4 squares.', 'Die rye het 1, 2, 3 en 4 vierkantjies.'], s: same('1 + 2 + 3 + 4 = 10') },
    { en: 'Shape A is a rectangle 8 squares long and 1 square wide. Shape B is 4 squares long and 2 squares wide. Which is true?' + pair(grid(['XXXXXXXX'], 200), grid(['XXXX', 'XXXX'], 110)), af: 'Vorm A is \'n reghoek 8 vierkantjies lank en 1 vierkantjie breed. Vorm B is 4 vierkantjies lank en 2 vierkantjies breed. Wat is waar?' + pair(grid(['XXXXXXXX'], 200), grid(['XXXX', 'XXXX'], 110)), o: [['Same area, different perimeters', 'Same perimeter, different areas', 'Same area and same perimeter', 'Different area and different perimeter'], ['Dieselfde oppervlakte, verskillende omtrekke', 'Dieselfde omtrek, verskillende oppervlaktes', 'Dieselfde oppervlakte en dieselfde omtrek', 'Verskillende oppervlakte en verskillende omtrek']], a: 0, lv: 'P', h: ['Work out the area and the perimeter of each.', 'Werk die oppervlakte en die omtrek van elkeen uit.'], s: [['A: area 8, perimeter 8 + 1 + 8 + 1 = 18.', 'B: area 8, perimeter 4 + 2 + 4 + 2 = 12.'], ['A: oppervlakte 8, omtrek 8 + 1 + 8 + 1 = 18.', 'B: oppervlakte 8, omtrek 4 + 2 + 4 + 2 = 12.']] }
  ],
  wb: {
    en: [{ t: 'Count the squares. Write the area in square units.', p: ['' + grid(['XXXXX', 'XXXXX'], 170), '' + grid(['XXX', 'XXX', 'XXX', 'X..'], 110), '' + grid(['X..', 'XX.', 'XXX'], 110)], m: [1, 1, 1] },
      { t: 'A bathroom floor is covered with square tiles: 8 tiles along one wall and 5 tiles along the other.', p: ['How many tiles cover the floor?', 'A box holds 10 tiles. How many boxes are needed?'], m: [2, 2] },
      { t: 'On square paper, draw two different rectangles that each have an area of 12 square units.', p: ['Write the length and width of each rectangle.', 'Which of your rectangles has the longer perimeter?'], m: [2, 2] }],
    af: [{ t: 'Tel die vierkantjies. Skryf die oppervlakte in vierkante eenhede.', p: ['' + grid(['XXXXX', 'XXXXX'], 170), '' + grid(['XXX', 'XXX', 'XXX', 'X..'], 110), '' + grid(['X..', 'XX.', 'XXX'], 110)], m: [1, 1, 1] },
      { t: '\'n Badkamervloer is met vierkantige teëls bedek: 8 teëls langs een muur en 5 teëls langs die ander muur.', p: ['Hoeveel teëls bedek die vloer?', '\'n Doos hou 10 teëls. Hoeveel dose is nodig?'], m: [2, 2] },
      { t: 'Teken op vierkantjiespapier twee verskillende reghoeke wat elk \'n oppervlakte van 12 vierkante eenhede het.', p: ['Skryf die lengte en breedte van elke reghoek neer.', 'Watter een van jou reghoeke het die langer omtrek?'], m: [2, 2] }],
    ans: [['10', 'square units: 2 rows of 5', 'vierkante eenhede: 2 rye van 5'], ['10', 'square units: 3 + 3 + 3 + 1', 'vierkante eenhede: 3 + 3 + 3 + 1'], ['6', 'square units: 1 + 2 + 3', 'vierkante eenhede: 1 + 2 + 3'],
      ['40', 'tiles: 5 × 8', 'teëls: 5 × 8'], ['4', 'boxes: 40 ÷ 10', 'dose: 40 ÷ 10'],
      ['6 × 2; 4 × 3; 12 × 1', 'Any two: length × width must be 12.', 'Enige twee: lengte × breedte moet 12 wees.'], ['12 × 1 > 6 × 2 > 4 × 3', 'The long, thin one. Perimeters: 12 × 1 → 26, 6 × 2 → 16, 4 × 3 → 14.', 'Die lang, dun een. Omtrekke: 12 × 1 → 26, 6 × 2 → 16, 4 × 3 → 14.']]
  }
});

/* ───────────── 703 Capacity ───────────── */
T.push({
  id: 703, name: { en: 'Capacity', af: 'Inhoudsmaat' }, full: { en: 'Capacity: filling 3-D objects', af: 'Inhoudsmaat: 3D-voorwerpe vul' },
  body: lang => {
    const en = lang === 'en';
    const cont = en ? [{ n: 'kettle', s: 'kettle', cap: 1500 }, { n: 'jar', s: 'glass-jar', cap: 750 }, { n: 'bottle', s: 'plastic-bottle', cap: 2000 }, { n: 'juice box', s: 'juice-box', cap: 500 }, { n: 'milk carton', s: 'milk', cap: 1000 }]
      : [{ n: 'ketel', s: 'kettle', cap: 1500 }, { n: 'fles', s: 'glass-jar', cap: 750 }, { n: 'bottel', s: 'plastic-bottle', cap: 2000 }, { n: 'sappakkie', s: 'juice-box', cap: 500 }, { n: 'melkkarton', s: 'milk', cap: 1000 }];
    const L = en ? { cont, title: n => 'Fill the ' + n, ask: n => 'How many cups of 250 ml will fill the ' + n + '? Type your guess, then tap Pour.', guessFirst: 'Type your guess first: how many cups?', poured: (k, ml) => k + (k === 1 ? ' cup' : ' cups') + ' poured: ' + ml + ' ml so far. Keep pouring!', full: (k, ml, g, l) => 'Full! It took <b>' + k + ' cups</b>: ' + k + ' × 250 ml = <b>' + ml + ' ml</b>' + (l ? ' = ' + l + ' l' : '') + '. ' + (g === k ? 'Your guess was spot on!' : 'You guessed ' + g + ', which is ' + Math.abs(g - k) + ' too ' + (g < k ? 'few' : 'many') + '.'), over: 'It is already full! More water would spill over. Tap Empty or ' + W.en.newQ + '.' }
      : { cont, title: n => 'Vul die ' + n, ask: n => 'Hoeveel koppies van 250 ml sal die ' + n + ' vol maak? Tik jou skatting en tik dan op Gooi in.', guessFirst: 'Tik eers jou skatting: hoeveel koppies?', poured: (k, ml) => k + (k === 1 ? ' koppie' : ' koppies') + ' ingegooi: tot dusver ' + ml + ' ml. Gooi verder!', full: (k, ml, g, l) => 'Vol! Dit het <b>' + k + ' koppies</b> gevat: ' + k + ' × 250 ml = <b>' + ml + ' ml</b>' + (l ? ' = ' + l + ' l' : '') + '. ' + (g === k ? 'Jou skatting was presies reg!' : 'Jy het ' + g + ' geskat, wat ' + Math.abs(g - k) + ' te ' + (g < k ? 'min' : 'veel') + ' is.'), over: 'Dit is reeds vol! Nog water sal oorloop. Tik op Maak leeg of ' + W.af.newQ + '.' };
    const m = `<h4>🎮 ${en ? 'Fill It Up' : 'Maak Dit Vol'}</h4><p class="how">${en ? 'Estimate how many cups fill the container. Then pour one cup at a time and see how close you were.' : 'Skat hoeveel koppies die houer vol maak. Gooi dan een koppie op \'n slag in en kyk hoe naby jy was.'}</p><div class="g4-big" data-k="name" style="font-size:22px"></div><div class="g4-stage"><svg viewBox="0 6 450 296" data-k="svg" role="img" aria-label="${en ? 'container' : 'houer'}"></svg></div><div class="g4-row"><input class="g4-input" data-k="guess" inputmode="numeric" aria-label="${en ? 'guess' : 'skatting'}"><span style="font-size:18px">${en ? 'cups' : 'koppies'}</span><button class="g4-btn" data-k="pour">${en ? 'Pour' : 'Gooi in'}</button><button class="g4-btn ghost" data-k="empty">${en ? 'Empty' : 'Maak leeg'}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('kettle', 'The <strong>capacity</strong> of a container is how much it can hold when it is full. We find it by filling the container with water, sand or rice and measuring how much went in.') +
      def('Units of capacity', '<strong>Millilitres (ml)</strong> for small amounts, like a teaspoon (5 ml) or a cup (250 ml). <strong>Litres (l)</strong> for bigger amounts. <strong>1 l = 1 000 ml</strong>.') + cups(4, '4 × 250 ml = 1 000 ml') +
      ex('Fill and measure', ['A jug is filled with cups of water. It takes 4 cups of 250 ml.', '250 + 250 + 250 + 250 = 1 000 ml, or 4 × 250 ml = 1 000 ml.', 'The capacity of the jug is <strong>1 000 ml = 1 l</strong>.']) +
      sim('g4-s703', S.s703, L, m) + tip('Estimate first, then fill and measure. Was your estimate close? A tall container does not always hold more than a short, wide one!')
      : hero('kettle', 'Die <strong>inhoudsmaat</strong> van \'n houer is hoeveel dit kan hou as dit vol is. Ons vind dit deur die houer met water, sand of rys te vul en te meet hoeveel ingegaan het.') +
      def('Eenhede van inhoudsmaat', '<strong>Milliliter (ml)</strong> vir klein hoeveelhede, soos \'n teelepel (5 ml) of \'n koppie (250 ml). <strong>Liter (l)</strong> vir groter hoeveelhede. <strong>1 l = 1 000 ml</strong>.') + cups(4, '4 × 250 ml = 1 000 ml') +
      ex('Vul en meet', ['\'n Beker word met koppies water gevul. Dit vat 4 koppies van 250 ml.', '250 + 250 + 250 + 250 = 1 000 ml, of 4 × 250 ml = 1 000 ml.', 'Die inhoudsmaat van die beker is <strong>1 000 ml = 1 l</strong>.']) +
      sim('g4-s703', S.s703, L, m) + tip('Skat eers, vul dan en meet. Was jou skatting naby? \'n Hoë houer hou nie altyd meer as \'n kort, wye een nie!');
  },
  qs: [
    { en: 'A bottle is filled with 6 cups of 250 ml. What is its capacity (in ml)?' + cups(6), af: '\'n Bottel word met 6 koppies van 250 ml gevul. Wat is sy inhoudsmaat (in ml)?' + cups(6), a: '1 500', lv: 'R', h: ['6 × 250', '6 × 250'], s: same('6 × 250 = 1 500 ml') },
    { en: 'Which of these holds about 1 litre?', af: 'Watter een hiervan hou omtrent 1 liter?', o: [['a carton of milk', 'a teaspoon', 'a bath', 'an egg cup'], ['\'n karton melk', '\'n teelepel', '\'n bad', '\'n eierkelkie']], a: 0, lv: 'K', h: ['1 l = 1 000 ml, that is 4 cups.', '1 l = 1 000 ml, dit is 4 koppies.'], s: [['Milk is often sold in 1 l cartons.'], ['Melk word dikwels in kartonne van 1 l verkoop.']] },
    { en: '1 l = ? ml', af: '1 l = ? ml', a: '1 000', lv: 'K', h: ['"Milli" means one thousandth.', '"Milli" beteken een duisendste.'], s: same('1 l = 1 000 ml') },
    { en: 'How much water is in this measuring jug (in ml)?' + jug(600, 1000), af: 'Hoeveel water is in hierdie maatbeker (in ml)?' + jug(600, 1000), a: '600', lv: 'R', h: ['Each line is 100 ml.', 'Elke lyn is 100 ml.'], s: same('600 ml') },
    { en: 'A bucket holds 5 l. How many millilitres is that?', af: '\'n Emmer hou 5 l. Hoeveel milliliter is dit?', a: '5 000', lv: 'R', h: ['Each litre is 1 000 ml.', 'Elke liter is 1 000 ml.'], s: same('5 × 1 000 = 5 000 ml') },
    { en: 'A mug holds 250 ml. How many mugs of water fill a 2 l jug?' + cups(1, '250 ml'), af: '\'n Beker hou 250 ml. Hoeveel bekers water maak \'n 2 l-kan vol?' + cups(1, '250 ml'), a: '8', lv: 'C', h: ['2 l = 2 000 ml. Four mugs make 1 l.', '2 l = 2 000 ml. Vier bekers maak 1 l.'], s: same('2 000 ÷ 250 = 8') },
    { en: 'A kettle holds 1 500 ml. It has 900 ml of water in it now. How much more water fills it (in ml)?' + jug(900, 1500), af: '\'n Ketel hou 1 500 ml. Dit het nou 900 ml water in. Hoeveel meer water maak dit vol (in ml)?' + jug(900, 1500), a: '600', lv: 'C', h: ['1 500 − 900', '1 500 − 900'], s: same('1 500 − 900 = 600 ml') },
    { en: 'A tall, thin vase is filled with 3 cups of water. A short, wide bowl is filled with 5 of the same cups. Which holds more?', af: '\'n Hoë, dun blompot word met 3 koppies water gevul. \'n Kort, wye bak word met 5 van dieselfde koppies gevul. Watter een hou meer?', o: [['the bowl', 'the vase', 'they hold the same'], ['die bak', 'die blompot', 'hulle hou dieselfde']], a: 0, lv: 'P', h: ['Compare the number of cups, not the height.', 'Vergelyk die aantal koppies, nie die hoogte nie.'], s: [['5 cups is more than 3 cups, so the bowl holds more, even though the vase is taller.'], ['5 koppies is meer as 3 koppies, so die bak hou meer, al is die blompot hoër.']] }
  ],
  wb: {
    en: [{ t: 'Write in millilitres.', p: ['2 l', '4 l', '3 l 500 ml'], m: [1, 1, 2] },
      { t: 'Thabo fills a pot with a 500 ml jug. He pours in 6 full jugs.', p: ['What is the capacity of the pot in ml?', 'Write it in litres.'], m: [2, 1] },
      { t: 'A juice box holds 200 ml.', p: ['How many juice boxes fill a 1 l jug?', 'How many juice boxes fill a 2 l bottle?'], m: [2, 2] },
      { t: 'At home, choose two containers. Estimate how many cups of water fill each one, then fill them and count.', p: ['Write your estimates and your counts in a table.', 'Which container has the bigger capacity?'], m: [2, 1] }],
    af: [{ t: 'Skryf in milliliter.', p: ['2 l', '4 l', '3 l 500 ml'], m: [1, 1, 2] },
      { t: 'Thabo vul \'n pot met \'n 500 ml-beker. Hy gooi 6 vol bekers in.', p: ['Wat is die inhoudsmaat van die pot in ml?', 'Skryf dit in liter.'], m: [2, 1] },
      { t: '\'n Sappakkie hou 200 ml.', p: ['Hoeveel sappakkies maak \'n 1 l-kan vol?', 'Hoeveel sappakkies maak \'n 2 l-bottel vol?'], m: [2, 2] },
      { t: 'Kies tuis twee houers. Skat hoeveel koppies water elkeen vol maak, vul hulle dan en tel.', p: ['Skryf jou skattings en jou tellings in \'n tabel.', 'Watter houer het die groter inhoudsmaat?'], m: [2, 1] }],
    ans: [['2 000 ml', '2 × 1 000', '2 × 1 000'], ['4 000 ml', '4 × 1 000', '4 × 1 000'], ['3 500 ml', '3 000 + 500', '3 000 + 500'],
      ['3 000 ml', '6 × 500', '6 × 500'], ['3 l', '3 000 ml = 3 l', '3 000 ml = 3 l'],
      ['5', '5 × 200 = 1 000', '5 × 200 = 1 000'], ['10', '10 × 200 = 2 000', '10 × 200 = 2 000'],
      ['—', 'Own table: an estimate and a count for each container.', "Eie tabel: 'n skatting en 'n telling vir elke houer."], ['—', 'The one that took more cups.', 'Die een wat meer koppies gevat het.']]
  }
});

/* ───────────── 704 Volume ───────────── */
T.push({
  id: 704, name: { en: 'Volume', af: 'Volume' }, full: { en: 'Volume: counting 1 cm³ cubes', af: 'Volume: 1 cm³-blokkies tel' },
  body: lang => {
    const en = lang === 'en';
    const L = en ? { sizes: (l, w, h) => l + ' × ' + w + ' × ' + h + ' = ' + (l * w * h) + ' cubes', goal: t => 'Build a box with a volume of ' + t + ' cm³', ask: 'Use − and + to change the length, width and height. Then tap Check.', yes: (l, w, h, v) => 'Yes! One layer has ' + l + ' × ' + w + ' = ' + (l * w) + ' cubes, and there ' + (h === 1 ? 'is 1 layer' : 'are ' + h + ' layers') + ': ' + v + ' cubes = <b>' + v + ' cm³</b>.', no: (l, w, h, v, t) => 'Your box has ' + (l * w) + (l * w === 1 ? ' cube' : ' cubes') + ' in each layer and ' + h + (h === 1 ? ' layer' : ' layers') + ': ' + v + ' cm³. You need ' + t + ' cm³, so make it ' + (v < t ? 'bigger' : 'smaller') + '.' }
      : { sizes: (l, w, h) => l + ' × ' + w + ' × ' + h + ' = ' + (l * w * h) + ' blokkies', goal: t => 'Bou \'n boks met \'n volume van ' + t + ' cm³', ask: 'Gebruik − en + om die lengte, breedte en hoogte te verander. Tik dan op Toets.', yes: (l, w, h, v) => 'Ja! Een laag het ' + l + ' × ' + w + ' = ' + (l * w) + ' blokkies, en daar ' + (h === 1 ? 'is 1 laag' : 'is ' + h + ' lae') + ': ' + v + ' blokkies = <b>' + v + ' cm³</b>.', no: (l, w, h, v, t) => 'Jou boks het ' + (l * w) + (l * w === 1 ? ' blokkie' : ' blokkies') + ' in elke laag en ' + h + (h === 1 ? ' laag' : ' lae') + ': ' + v + ' cm³. Jy het ' + t + ' cm³ nodig, so maak dit ' + (v < t ? 'groter' : 'kleiner') + '.' };
    const lbl = en ? { l: 'Length', w: 'Width', h: 'Height' } : { l: 'Lengte', w: 'Breedte', h: 'Hoogte' };
    const ctl = ['l', 'w', 'h'].map(k => `<span class="g4-row" style="margin:0;gap:6px"><span style="min-width:72px">${lbl[k]}</span><button class="g4-btn ghost" data-d="-${k}" aria-label="${lbl[k]} −">−</button><b data-k="v${k}" style="font-size:22px;min-width:22px;text-align:center"></b><button class="g4-btn ghost" data-d="+${k}" aria-label="${lbl[k]} +">+</button></span>`).join('');
    const m = `<h4>🎮 ${en ? 'Box Builder' : 'Boksbouer'}</h4><p class="how">${en ? 'Each cube is 1 cm³. Change the size of the box until it has the volume you need. Tap Layers to pull the box apart and count.' : 'Elke blokkie is 1 cm³. Verander die grootte van die boks totdat dit die volume het wat jy nodig het. Tik op Lae om die boks uitmekaar te trek en te tel.'}</p><div class="g4-big" data-k="goal" style="font-size:22px"></div><div class="g4-stage"><svg data-k="svg" role="img" aria-label="${en ? 'box of cubes' : 'boks blokkies'}" style="max-height:300px"></svg></div><div class="g4-big" data-k="count" style="font-size:20px"></div><div class="g4-row">${ctl}</div><div class="g4-row"><button class="g4-btn ghost" data-k="layers" aria-pressed="false">${en ? 'Layers' : 'Lae'}</button><button class="g4-btn" data-k="check">${W[lang].check}</button><button class="g4-btn ghost" data-k="new">${W[lang].newQ}</button></div><div class="g4-out" data-k="out" aria-live="polite"></div>`;
    return en ? hero('ice-cubes', 'The <strong>volume</strong> of an object is how much space it takes up. We can build an object from small cubes and count them.') +
      def('Cubic units', 'A cube that is 1 cm long, 1 cm wide and 1 cm high has a volume of <strong>1 cubic centimetre (1 cm³)</strong>. Count the cubes to find the volume in cm³.') + prism(3, 2, 2) +
      ex('Count in layers', ['The box above is 3 cubes long and 2 cubes wide, so one layer has 3 × 2 = 6 cubes.', 'It is 2 layers high: 6 + 6 = 12 cubes.', 'The volume is <strong>12 cm³</strong>.']) +
      sim('g4-s704', S.s704, L, m) + tip('Count in layers. Do not forget the cubes you cannot see at the back and at the bottom!')
      : hero('ice-cubes', 'Die <strong>volume</strong> van \'n voorwerp is hoeveel ruimte dit opneem. Ons kan \'n voorwerp uit klein blokkies bou en hulle tel.') +
      def('Kubieke eenhede', '\'n Blokkie wat 1 cm lank, 1 cm breed en 1 cm hoog is, het \'n volume van <strong>1 kubieke sentimeter (1 cm³)</strong>. Tel die blokkies om die volume in cm³ te vind.') + prism(3, 2, 2) +
      ex('Tel in lae', ['Die boks hierbo is 3 blokkies lank en 2 blokkies breed, so een laag het 3 × 2 = 6 blokkies.', 'Dit is 2 lae hoog: 6 + 6 = 12 blokkies.', 'Die volume is <strong>12 cm³</strong>.']) +
      sim('g4-s704', S.s704, L, m) + tip('Tel in lae. Moenie die blokkies vergeet wat jy nie agter en onder kan sien nie!');
  },
  qs: [
    { en: 'This box is made of 1 cm³ cubes. What is its volume (in cm³)?' + prism(2, 2, 2), af: 'Hierdie boks is van 1 cm³-blokkies gemaak. Wat is sy volume (in cm³)?' + prism(2, 2, 2), a: '8', lv: 'R', h: ['One layer has 2 × 2 cubes. How many layers?', 'Een laag het 2 × 2 blokkies. Hoeveel lae?'], s: same('2 × 2 = 4; 4 × 2 = 8 cm³') },
    { en: 'This box is made of 1 cm³ cubes. What is its volume (in cm³)?' + prism(3, 2, 1), af: 'Hierdie boks is van 1 cm³-blokkies gemaak. Wat is sy volume (in cm³)?' + prism(3, 2, 1), a: '6', lv: 'K', h: ['There is only one layer.', 'Daar is net een laag.'], s: same('3 × 2 = 6 cm³') },
    { en: 'This box is made of 1 cm³ cubes. What is its volume (in cm³)?' + prism(4, 2, 3), af: 'Hierdie boks is van 1 cm³-blokkies gemaak. Wat is sy volume (in cm³)?' + prism(4, 2, 3), a: '24', lv: 'C', h: ['One layer has 4 × 2 cubes, and there are 3 layers.', 'Een laag het 4 × 2 blokkies, en daar is 3 lae.'], s: same('4 × 2 = 8; 8 × 3 = 24 cm³') },
    { en: 'Which unit do we use for volume when we count 1 cm cubes?', af: 'Watter eenheid gebruik ons vir volume as ons 1 cm-blokkies tel?', o: [['cm³', 'cm²', 'cm', 'kg'], ['cm³', 'cm²', 'cm', 'kg']], a: 0, lv: 'K', h: ['Cubes: cubic centimetres.', 'Blokkies: kubieke sentimeter.'], s: [['cm³ means cubic centimetres.'], ['cm³ beteken kubieke sentimeter.']] },
    { en: 'This box is made of 1 cm³ cubes. What is its volume (in cm³)?' + prism(5, 1, 2), af: 'Hierdie boks is van 1 cm³-blokkies gemaak. Wat is sy volume (in cm³)?' + prism(5, 1, 2), a: '10', lv: 'R', h: ['5 cubes in a layer, 2 layers.', '5 blokkies in \'n laag, 2 lae.'], s: same('5 × 2 = 10 cm³') },
    { en: 'One layer of a box has 3 rows of 3 cubes. The box is 4 layers high. What is its volume (in cm³)?' + prism(3, 3, 4), af: 'Een laag van \'n boks het 3 rye van 3 blokkies. Die boks is 4 lae hoog. Wat is sy volume (in cm³)?' + prism(3, 3, 4), a: '36', lv: 'C', h: ['First find how many cubes are in one layer.', 'Vind eers hoeveel blokkies in een laag is.'], s: same('3 × 3 = 9; 9 × 4 = 36 cm³') },
    { en: 'Which box has the bigger volume?' + pair(prism(3, 2, 2, false, 150), prism(4, 3, 1, false, 160)), af: 'Watter boks het die groter volume?' + pair(prism(3, 2, 2, false, 150), prism(4, 3, 1, false, 160)), o: [['They are the same', 'A', 'B'], ['Hulle is dieselfde', 'A', 'B']], a: 0, lv: 'P', h: ['Count the cubes in each box.', 'Tel die blokkies in elke boks.'], s: [['A: 3 × 2 × 2 = 12 cm³. B: 4 × 3 × 1 = 12 cm³. They are the same.'], ['A: 3 × 2 × 2 = 12 cm³. B: 4 × 3 × 1 = 12 cm³. Hulle is dieselfde.']] },
    { en: 'A box is 4 cm long, 3 cm wide and 2 cm high. How many 1 cm³ cubes fill it?' + prism(4, 3, 2, true), af: '\'n Boks is 4 cm lank, 3 cm breed en 2 cm hoog. Hoeveel 1 cm³-blokkies maak dit vol?' + prism(4, 3, 2, true), a: '24', lv: 'P', h: ['One layer: 4 × 3. Then 2 layers.', 'Een laag: 4 × 3. Dan 2 lae.'], s: same('4 × 3 = 12; 12 × 2 = 24') }
  ],
  wb: {
    en: [{ t: 'Each box is made of 1 cm³ cubes. Write the volume in cm³.', p: ['' + prism(2, 1, 3, false, 120), '' + prism(3, 3, 1, false, 160), '' + prism(3, 2, 2, false, 150)], m: [1, 1, 2] },
      { t: 'Lerato builds a box from 1 cm³ cubes. Each layer has 4 rows of 5 cubes.', p: ['How many cubes are in one layer?', 'The box is 3 layers high. What is its volume?'], m: [2, 2] },
      { t: 'You have 18 cubes.', p: ['Build (or draw) a box that uses all 18 cubes. Write its length, width and height.', 'Find a different box with the same volume.'], m: [2, 2] }],
    af: [{ t: 'Elke boks is van 1 cm³-blokkies gemaak. Skryf die volume in cm³.', p: ['' + prism(2, 1, 3, false, 120), '' + prism(3, 3, 1, false, 160), '' + prism(3, 2, 2, false, 150)], m: [1, 1, 2] },
      { t: 'Lerato bou \'n boks uit 1 cm³-blokkies. Elke laag het 4 rye van 5 blokkies.', p: ['Hoeveel blokkies is in een laag?', 'Die boks is 3 lae hoog. Wat is sy volume?'], m: [2, 2] },
      { t: 'Jy het 18 blokkies.', p: ['Bou (of teken) \'n boks wat al 18 blokkies gebruik. Skryf sy lengte, breedte en hoogte neer.', 'Vind \'n ander boks met dieselfde volume.'], m: [2, 2] }],
    ans: [['6 cm³', '2 × 1 × 3', '2 × 1 × 3'], ['9 cm³', '3 × 3 × 1', '3 × 3 × 1'], ['12 cm³', '3 × 2 × 2', '3 × 2 × 2'],
      ['20', 'cubes: 4 × 5', 'blokkies: 4 × 5'], ['60 cm³', '20 × 3', '20 × 3'],
      ['3 × 3 × 2', 'For example: length × width × height must be 18.', 'Byvoorbeeld: lengte × breedte × hoogte moet 18 wees.'], ['6 × 3 × 1; 9 × 2 × 1; 18 × 1 × 1', 'Any one that is different from part a.', 'Enige een wat verskil van deel a.']]
  }
});

writeChapter(7, { en: 'Perimeter, Area, Capacity and Volume', af: 'Omtrek, Oppervlakte, Inhoudsmaat en Volume' }, T, process.argv[2] || OUT_DEFAULT);
