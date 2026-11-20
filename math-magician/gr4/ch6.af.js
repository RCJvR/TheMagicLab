// Math Magician — Grade 4, Chapter 6 (Lengte, Massa en Inhoudsmaat) — Afrikaans
// Generated from one bilingual source (scripts/math-gr4/gen_ch6.js); edit both languages there.
MathMagician.registerChapter(6, {
 "topics": [
  {
   "id": 601,
   "chapter": 6,
   "name": "Lengte",
   "fullName": "Lengte meet: mm, cm, m en km",
   "lesson": {
    "heading": "Lengte meet: mm, cm, m en km",
    "sub": "Hoofstuk 6 · Onderwerp 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/giraffe.webp\" srcset=\"/assets/stickers/giraffe@2x.webp 2x\" alt=\"\"><p>Ons meet <strong>lengte</strong> met 'n liniaal, 'n maatband of 'n meterstok. Kies 'n eenheid wat pas by wat jy meet.</p></div><table class=\"g4-chart\"><tr><th>Eenheid</th><th>Gebruik dit vir</th><th>Is gelyk aan</th></tr><tr><td style=\"font-size:22px\">millimeter (mm)</td><td style=\"font-size:22px\">'n mier, 'n saadjie</td><td style=\"font-size:22px\">—</td></tr><tr><td style=\"font-size:22px\">sentimeter (cm)</td><td style=\"font-size:22px\">'n potlood, 'n boek</td><td style=\"font-size:22px\">10 mm</td></tr><tr><td style=\"font-size:22px\">meter (m)</td><td style=\"font-size:22px\">'n klaskamer, 'n tou</td><td style=\"font-size:22px\">100 cm</td></tr><tr><td style=\"font-size:22px\">kilometer (km)</td><td style=\"font-size:22px\">die pad dorp toe</td><td style=\"font-size:22px\">1 000 m</td></tr></table><div class=\"example-box\"><div class=\"example-box-title\">✏️ Meet versigtig</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Sit die 0 van die liniaal by een punt van die voorwerp.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Lees die getal by die ander punt.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Tel die klein lyntjies na die laaste heel sentimeter: 8 cm en 7 mm = 87 mm.</span></div></div><div class=\"g4-sim\" id=\"s601\"><h4>🎮 Lees die Liniaal</h4><p class=\"how\">Elke klein lyntjie op die liniaal is 1 mm. Elke genommerde lyn is 1 cm = 10 mm.</p><div class=\"g4-stage\"><svg viewBox=\"0 0 640 175\" data-k=\"svg\" role=\"img\" aria-label=\"ruler\"></svg></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"mm\"><span style=\"font-size:20px\">mm</span><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button><button class=\"g4-btn ghost\" data-k=\"shift\" aria-pressed=\"false\">Moeiliker: nie by 0</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, num } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  let len = 87, start = 0, shift = false, score = 0, tries = 0;\r\n  const X = mm => 30 + mm * 3.8; // 150 mm across ~570 px\r\n  function draw(reveal) {\r\n    let h = '<rect x=\"20\" y=\"96\" width=\"600\" height=\"70\" rx=\"8\" fill=\"#fde68a\"/>';\r\n    for (let mm = 0; mm <= 150; mm++) { const x = X(mm), tall = mm % 10 === 0 ? 30 : mm % 5 === 0 ? 20 : 12; h += '<line x1=\"' + x + '\" y1=\"96\" x2=\"' + x + '\" y2=\"' + (96 + tall) + '\" stroke=\"#1f2937\" stroke-width=\"' + (mm % 10 ? 1 : 2) + '\"/>'; if (mm % 10 === 0) h += '<text x=\"' + x + '\" y=\"150\" text-anchor=\"middle\" fill=\"#1f2937\" font-size=\"16\" font-weight=\"800\">' + (mm / 10) + '</text>'; }\r\n    h += '<text x=\"600\" y=\"160\" text-anchor=\"end\" fill=\"#1f2937\" font-size=\"12\">cm</text>';\r\n    const x1 = X(start), x2 = X(start + len);\r\n    h += '<rect x=\"' + x1 + '\" y=\"44\" width=\"' + (x2 - x1) + '\" height=\"30\" rx=\"6\" fill=\"#f472b6\"/><path d=\"M' + x2 + ' 44 l26 15 l-26 15 z\" fill=\"#fbcfe8\"/><rect x=\"' + (x1 - 8) + '\" y=\"44\" width=\"10\" height=\"30\" rx=\"3\" fill=\"#9d174d\"/>';\r\n    h += '<line x1=\"' + x1 + '\" y1=\"74\" x2=\"' + x1 + '\" y2=\"96\" stroke=\"#f472b6\" stroke-dasharray=\"3 3\"/><line x1=\"' + x2 + '\" y1=\"74\" x2=\"' + x2 + '\" y2=\"96\" stroke=\"#f472b6\" stroke-dasharray=\"3 3\"/>';\r\n    if (reveal) h += '<text x=\"' + ((x1 + x2) / 2) + '\" y=\"34\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + len + ' mm</text>';\r\n    svg.innerHTML = h;\r\n  }\r\n  function fresh() { len = rnd(25, 120); start = shift ? rnd(1, 150 - len) : 0; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = shift ? L.askShift : L.ask; draw(false); }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'check') { const v = num(q(root, 'ans').value); tries++; const ok = v === len; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.is(len, Math.floor(len / 10), len % 10) + (start ? ' ' + L.sub(start + len, start, len) : '') + ' ' + L.score(score, tries); draw(true); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n    else if (t.dataset.k === 'shift') { shift = !shift; t.setAttribute('aria-pressed', shift); fresh(); }\r\n  });\r\n  fresh();\r\n})(__rev({\"ask\":\"Hoe lank is die pienk potlood? Tik jou antwoord in millimeter (mm).\",\"askShift\":\"Pasop: die potlood begin nie by 0 nie! Hoe lank is dit in mm?\",\"yes\":\"Reg!\",\"no\":\"Nie heeltemal nie.\",\"is\":{\"__fn\":\"(mm, c, r) => 'Dit is ' + mm + ' mm lank' + (c ? ' (' + c + ' cm ' + (r ? r + ' mm' : '') + ')' : '') + '.'\"},\"sub\":{\"__fn\":\"(e, s, l) => 'Dit eindig by ' + e + ' mm en begin by ' + s + ' mm: ' + e + ' − ' + s + ' = ' + l + ' mm.'\"},\"score\":{\"__fn\":\"(a, b) => 'Telling: ' + a + ' uit ' + b + '.'\"}}), document.getElementById('s601')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Skat eers: jou vinger is omtrent 1 cm breed, en 'n groot tree is omtrent 1 m.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Watter eenheid is die beste om 'n potlood te meet?",
     "options": [
      "cm",
      "km",
      "kg",
      "l"
     ],
     "answer": 0,
     "topic": "Lengte"
    },
    {
     "type": "input",
     "text": "1 cm = ___ mm",
     "answer": "10",
     "topic": "Lengte"
    },
    {
     "type": "input",
     "text": "1 m = ___ cm",
     "answer": "100",
     "topic": "Lengte"
    },
    {
     "type": "input",
     "text": "1 km = ___ m",
     "answer": "1000",
     "topic": "Lengte"
    },
    {
     "type": "input",
     "text": "3 m = ___ cm",
     "answer": "300",
     "topic": "Lengte"
    },
    {
     "type": "input",
     "text": "45 mm = 4 cm en ___ mm",
     "answer": "5",
     "topic": "Lengte"
    },
    {
     "type": "mc",
     "text": "Die afstand van Kaapstad na Johannesburg word die beste gemeet in…",
     "options": [
      "mm",
      "cm",
      "m",
      "km"
     ],
     "answer": 3,
     "topic": "Lengte"
    },
    {
     "type": "input",
     "text": "2 km 500 m = ___ m",
     "answer": "2500",
     "topic": "Lengte"
    }
   ]
  },
  {
   "id": 602,
   "chapter": 6,
   "name": "Massa",
   "fullName": "Massa meet: g en kg",
   "lesson": {
    "heading": "Massa meet: g en kg",
    "sub": "Hoofstuk 6 · Onderwerp 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/butter.webp\" srcset=\"/assets/stickers/butter@2x.webp 2x\" alt=\"\"><p><strong>Massa</strong> sê vir ons hoe swaar iets is. Ons meet massa in <strong>gram (g)</strong> en <strong>kilogram (kg)</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Gram en kilogram</div><p><span class=\"math\">1 kg = 1 000 g</span>. 'n Skuifspeld is omtrent 1 g. 'n Sak suiker is dikwels 1 kg of 2 kg 500 g.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Kies 'n skaal</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Gebruik 'n <strong>kombuisskaal</strong> vir kos, in gram.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Gebruik 'n <strong>badkamerskaal</strong> om mense te weeg, in kilogram.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Lees waar die naald wys. Werk eers uit wat elke klein lyntjie werd is.</span></div></div><div class=\"g4-sim\" id=\"s602\"><h4>🎮 Kombuisskaal</h4><p class=\"how\">Die skaal gaan tot 2 kg (2 000 g). Die lang lyne is elke 500 g, die middel lyne elke 100 g en die kort lyne elke 50 g.</p><div class=\"g4-big\" data-k=\"name\" style=\"font-size:22px\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 300\" data-k=\"svg\" role=\"img\" aria-label=\"scale\"></svg></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"g\"><span style=\"font-size:20px\">g</span><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, num } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  let item = null, mass = 0, score = 0, tries = 0;\r\n  function draw(reveal) {\r\n    const cx = 320, cy = 285, R = 170, ang = m => Math.PI * (1 - m / 2000);\r\n    let h = '<rect x=\"300\" y=\"92\" width=\"40\" height=\"12\" fill=\"#64748b\"/><rect x=\"150\" y=\"68\" width=\"340\" height=\"26\" rx=\"10\" fill=\"#94a3b8\"/>';\r\n    h += '<path d=\"M' + (cx - R - 18) + ' ' + cy + ' A' + (R + 18) + ' ' + (R + 18) + ' 0 0 1 ' + (cx + R + 18) + ' ' + cy + ' Z\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"4\"/>';\r\n    for (let m = 0; m <= 2000; m += 50) { const a = ang(m), big = m % 500 === 0, mid = m % 100 === 0, r1 = R - (big ? 22 : mid ? 14 : 8); h += '<line x1=\"' + (cx + R * Math.cos(a)) + '\" y1=\"' + (cy - R * Math.sin(a)) + '\" x2=\"' + (cx + r1 * Math.cos(a)) + '\" y2=\"' + (cy - r1 * Math.sin(a)) + '\" stroke=\"#1f2937\" stroke-width=\"' + (big ? 3 : 1.5) + '\"/>'; if (big) h += '<text x=\"' + (cx + (R - 48) * Math.cos(a)) + '\" y=\"' + (cy - (R - 48) * Math.sin(a) + 6) + '\" text-anchor=\"middle\" fill=\"#1f2937\" font-size=\"19\" font-weight=\"800\">' + (m === 0 ? '0' : m % 1000 === 0 ? (m / 1000) + ' kg' : m) + '</text>'; }\r\n    const a = ang(mass); h += '<line x1=\"' + cx + '\" y1=\"' + cy + '\" x2=\"' + (cx + (R - 10) * Math.cos(a)) + '\" y2=\"' + (cy - (R - 10) * Math.sin(a)) + '\" stroke=\"#e11d48\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"' + cx + '\" cy=\"' + cy + '\" r=\"9\" fill=\"#e11d48\"/><text x=\"' + cx + '\" y=\"' + (cy - 30) + '\" text-anchor=\"middle\" fill=\"#64748b\" font-size=\"13\">g</text>';\r\n    if (item) h += '<image href=\"/assets/stickers/' + item.s + '.webp\" x=\"' + (cx - 34) + '\" y=\"2\" width=\"68\" height=\"68\"/>';\r\n    if (reveal) h += '<text x=\"' + cx + '\" y=\"' + (cy - 55) + '\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + mass + ' g</text>';\r\n    svg.innerHTML = h;\r\n  }\r\n  function fresh() {\r\n    item = L.items[rnd(0, L.items.length - 1)];\r\n    mass = item.m || rnd(2, 38) * 50;\r\n    q(root, 'name').textContent = item.n; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.ask; draw(false);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'check') { const v = num(q(root, 'ans').value); tries++; const ok = v === mass; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.is(mass) + ' ' + L.score(score, tries); draw(true); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n  });\r\n  fresh();\r\n})(__rev({\"items\":[{\"n\":\"'n Appel\",\"s\":\"apple\",\"m\":150},{\"n\":\"'n Piesang\",\"s\":\"banana\",\"m\":100},{\"n\":\"'n Brood\",\"s\":\"bread-loaf\",\"m\":700},{\"n\":\"'n Blok botter\",\"s\":\"butter\",\"m\":500},{\"n\":\"'n Karton melk\",\"s\":\"milk\",\"m\":1000},{\"n\":\"'n Plak sjokolade\",\"s\":\"chocolate\",\"m\":150},{\"n\":\"'n Sak mielies\",\"s\":\"mealie\"},{\"n\":\"'n Sak sand\",\"s\":\"sand\"}],\"ask\":\"Lees die skaal. Hoeveel gram (g)?\",\"yes\":\"Reg!\",\"no\":\"Nie heeltemal nie.\",\"is\":{\"__fn\":\"g => 'Die massa is ' + g + ' g' + (g >= 1000 ? ' = ' + Math.floor(g / 1000) + ' kg ' + (g % 1000 ? g % 1000 + ' g' : '') : '') + '.'\"},\"score\":{\"__fn\":\"(a, b) => 'Telling: ' + a + ' uit ' + b + '.'\"}}), document.getElementById('s602')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>1 kg vere en 1 kg klippe het <strong>dieselfde</strong> massa. Die vere neem net meer plek in!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "1 kg = ___ g",
     "answer": "1000",
     "topic": "Massa"
    },
    {
     "type": "mc",
     "text": "Watter eenheid is die beste vir die massa van 'n sak aartappels?",
     "options": [
      "g",
      "kg",
      "ml",
      "km"
     ],
     "answer": 1,
     "topic": "Massa"
    },
    {
     "type": "input",
     "text": "3 kg = ___ g",
     "answer": "3000",
     "topic": "Massa"
    },
    {
     "type": "input",
     "text": "2 500 g = 2 kg en ___ g",
     "answer": "500",
     "topic": "Massa"
    },
    {
     "type": "mc",
     "text": "Watter een is swaarder?",
     "options": [
      "1 kg vere",
      "1 kg klippe",
      "Hulle het dieselfde massa"
     ],
     "answer": 2,
     "topic": "Massa"
    },
    {
     "type": "input",
     "text": "'n Appel het 'n massa van 150 g. Wat is die massa van 4 appels? (g)",
     "answer": "600",
     "topic": "Massa"
    },
    {
     "type": "mc",
     "text": "Watter instrument sal jy gebruik om jouself te weeg?",
     "options": [
      "kombuisskaal",
      "badkamerskaal",
      "liniaal",
      "maatbeker"
     ],
     "answer": 1,
     "topic": "Massa"
    },
    {
     "type": "input",
     "text": "'n Sak mieliemeel het 12 kg. Busi gebruik 2 kg en dan 4 kg. Sy verdeel die res eweredig in 2 sakke. Wat is die massa van elke sak? (kg)",
     "answer": "3",
     "topic": "Massa"
    }
   ]
  },
  {
   "id": 603,
   "chapter": 6,
   "name": "Inhoudsmaat",
   "fullName": "Inhoudsmaat meet: ml en l",
   "lesson": {
    "heading": "Inhoudsmaat meet: ml en l",
    "sub": "Hoofstuk 6 · Onderwerp 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/milk.webp\" srcset=\"/assets/stickers/milk@2x.webp 2x\" alt=\"\"><p><strong>Inhoudsmaat</strong> is hoeveel 'n houer kan hou. Ons meet dit in <strong>milliliter (ml)</strong> en <strong>liter (l)</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Milliliter en liter</div><p><span class=\"math\">1 l = 1 000 ml</span>. 'n Teelepel hou omtrent 5 ml. 'n Koppie hou omtrent 250 ml. 'n Karton melk hou dikwels 1 l.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Lees 'n maatbeker</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Hou die beker gelyk en kyk van die kant af na die water.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Vind die lyn bo-op die water.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Werk uit wat elke lyn werd is: hier is elke klein lyntjie 50 ml.</span></div></div><div class=\"g4-sim\" id=\"s603\"><h4>🎮 Maatbeker</h4><p class=\"how\">Die beker hou 1 liter (1 000 ml). Die lang lyne is elke 100 ml en die kort lyne elke 50 ml.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-m=\"read\">Lees die beker</button><button class=\"g4-btn ghost\" data-m=\"pour\">Gooi in</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 265\" data-k=\"svg\" role=\"img\" aria-label=\"jug\"></svg></div><div class=\"g4-row\" data-k=\"readrow\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"ml\"><span style=\"font-size:20px\">ml</span></div><div class=\"g4-row\" data-k=\"pourrow\"><input type=\"range\" min=\"0\" max=\"1000\" step=\"50\" value=\"0\" data-k=\"pour\" style=\"flex:1;min-width:180px;accent-color:#60a5fa\" aria-label=\"pour\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, num } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), pour = q(root, 'pour');\r\n  let mode = 'read', level = 600, target = 750, score = 0, tries = 0;\r\n  const Y = ml => 250 - ml * 0.2; // 1 000 ml → 200 px\r\n  function draw(reveal) {\r\n    root.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === mode));\r\n    q(root, 'readrow').style.display = mode === 'read' ? '' : 'none'; q(root, 'pourrow').style.display = mode === 'pour' ? '' : 'none';\r\n    const show = mode === 'read' ? level : +pour.value;\r\n    let h = '<rect x=\"240\" y=\"' + Y(show) + '\" width=\"160\" height=\"' + (250 - Y(show)) + '\" fill=\"rgba(96,165,250,.55)\"/><path d=\"M240 30 L240 250 L400 250 L400 30\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"5\"/><path d=\"M400 70 Q450 70 450 130 Q450 190 400 190\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"5\"/>';\r\n    for (let ml = 0; ml <= 1000; ml += 50) { const big = ml % 100 === 0; h += '<line x1=\"240\" y1=\"' + Y(ml) + '\" x2=\"' + (240 + (big ? 30 : 16)) + '\" y2=\"' + Y(ml) + '\" stroke=\"#e2e8f0\" stroke-width=\"' + (big ? 2.5 : 1.2) + '\"/>'; if (ml % 200 === 0) h += '<text x=\"230\" y=\"' + (Y(ml) + 5) + '\" text-anchor=\"end\" fill=\"#e2e8f0\" font-size=\"15\" font-weight=\"800\">' + (ml === 1000 ? '1 l' : ml + ' ml') + '</text>'; }\r\n    if (reveal || mode === 'pour') h += '<text x=\"320\" y=\"' + (Y(show) - 8) + '\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + show + ' ml</text>';\r\n    if (mode === 'pour') h += '<line x1=\"235\" y1=\"' + Y(target) + '\" x2=\"405\" y2=\"' + Y(target) + '\" stroke=\"#f472b6\" stroke-width=\"3\" stroke-dasharray=\"8 6\"/>';\r\n    svg.innerHTML = h;\r\n  }\r\n  function fresh() {\r\n    if (mode === 'read') { level = rnd(1, 19) * 50; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.askRead; }\r\n    else { target = rnd(2, 19) * 50; pour.value = 0; out.className = 'g4-out'; out.innerHTML = L.askPour(target); }\r\n    draw(false);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.m) { mode = t.dataset.m; fresh(); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n    else if (t.dataset.k === 'check') {\r\n      tries++;\r\n      if (mode === 'read') { const v = num(q(root, 'ans').value), ok = v === level; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.isRead(level) + ' ' + L.score(score, tries); draw(true); }\r\n      else { const v = +pour.value, ok = v === target; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.poured(v, target) + ' ' + L.score(score, tries); }\r\n    }\r\n  });\r\n  pour.addEventListener('input', () => draw(false));\r\n  fresh();\r\n})(__rev({\"askRead\":\"Hoeveel water is in die beker? Tik dit in milliliter (ml).\",\"askPour\":{\"__fn\":\"t => 'Gooi presies <b>' + t + ' ml</b> in. Sleep die skuifbalk totdat die water by die pienk lyn is en toets dan.'\"},\"yes\":\"Reg!\",\"no\":\"Nie heeltemal nie.\",\"isRead\":{\"__fn\":\"v => 'Daar is ' + v + ' ml water.'\"},\"poured\":{\"__fn\":\"(v, t) => 'Jy het ' + v + ' ml ingegooi. Die doel was ' + t + ' ml.'\"},\"score\":{\"__fn\":\"(a, b) => 'Telling: ' + a + ' uit ' + b + '.'\"}}), document.getElementById('s603')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Vier koppies van 250 ml maak 'n beker van 1 liter vol: <span class=\"math\">4 × 250 ml = 1 000 ml = 1 l</span>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "1 l = ___ ml",
     "answer": "1000",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "mc",
     "text": "Watter eenheid is die beste vir 'n teelepel medisyne?",
     "options": [
      "ml",
      "l",
      "kg",
      "km"
     ],
     "answer": 0,
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "2 l = ___ ml",
     "answer": "2000",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "1 500 ml = 1 l en ___ ml",
     "answer": "500",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "Hoeveel milliliter is in vier koppies van 250 ml?",
     "answer": "1000",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "mc",
     "text": "Watter houer hou omtrent 1 liter?",
     "options": [
      "'n teelepel",
      "'n melkkarton",
      "'n bad",
      "'n swembad"
     ],
     "answer": 1,
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "3 l − 750 ml = ___ ml",
     "answer": "2250",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "Waseela gebruik 2 l water vir tee, 60 l vir wasgoed en 4 l vir skottelgoed. Hoeveel liter gebruik sy altesaam?",
     "answer": "66",
     "topic": "Inhoudsmaat"
    }
   ]
  },
  {
   "id": 604,
   "chapter": 6,
   "name": "Herlei en probleme",
   "fullName": "Eenhede herlei en meetprobleme oplos",
   "lesson": {
    "heading": "Eenhede herlei en meetprobleme oplos",
    "sub": "Hoofstuk 6 · Onderwerp 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/kudu-horn.webp\" srcset=\"/assets/stickers/kudu-horn@2x.webp 2x\" alt=\"\"><p>Om mates te vergelyk of op te tel, moet hulle in <strong>dieselfde eenheid</strong> wees. Dan kan ons probleme oplos.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Siphiwe se tou</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Siphiwe sny 6 stukke tou, elk 500 mm lank, van 'n tou van 3 500 mm. Hoeveel bly oor?</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Gebruik: <span class=\"math\">6 × 500 mm = 3 000 mm</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Oor: <span class=\"math\">3 500 mm − 3 000 mm = 500 mm</span></span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Kleiner eenheid, groter getal</div><p>Na 'n <strong>kleiner</strong> eenheid (m → cm), vermenigvuldig. Na 'n <strong>groter</strong> eenheid (g → kg), deel.</p></div><div class=\"g4-sim\" id=\"s604\"><h4>🎮 Eenheidsomskakelaar</h4><p class=\"how\">Kies lengte, massa of inhoudsmaat. Tik 'n getal en kies die eenhede. Die leer wys wanneer om te vermenigvuldig en wanneer om te deel.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-set=\"len\">Lengte</button><button class=\"g4-btn ghost\" data-set=\"mass\">Massa</button><button class=\"g4-btn ghost\" data-set=\"cap\">Inhoudsmaat</button></div><div class=\"g4-row\" data-k=\"ladder\" style=\"gap:6px\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"n\" inputmode=\"numeric\" aria-label=\"number\"><select data-k=\"from\" style=\"font:inherit;font-size:20px;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.25);color:#fff;border:1px solid rgba(255,255,255,.18)\" aria-label=\"from\"></select><span class=\"g4-big\">→</span><select data-k=\"to\" style=\"font:inherit;font-size:20px;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.25);color:#fff;border:1px solid rgba(255,255,255,.18)\" aria-label=\"to\"></select></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, num, fmt } = window.G4;\r\n  const out = q(root, 'out'), from = q(root, 'from'), to = q(root, 'to'), inp = q(root, 'n'), ladder = q(root, 'ladder');\r\n  const SETS = { len: [['mm', 1], ['cm', 10], ['m', 1000], ['km', 1000000]], mass: [['g', 1], ['kg', 1000]], cap: [['ml', 1], ['l', 1000]] };\r\n  let set = 'len';\r\n  function opts() { const u = SETS[set]; from.innerHTML = u.map((x, i) => '<option value=\"' + i + '\">' + x[0] + '</option>').join(''); to.innerHTML = from.innerHTML; from.value = u.length > 2 ? 2 : 1; to.value = 0; }\r\n  function draw() {\r\n    root.querySelectorAll('[data-set]').forEach(b => b.setAttribute('aria-pressed', b.dataset.set === set));\r\n    const u = SETS[set];\r\n    ladder.innerHTML = u.map((x, i) => '<span class=\"g4-big\" style=\"font-size:22px;padding:4px 12px;border-radius:10px;background:' + (i == from.value ? 'rgba(96,165,250,.3)' : i == to.value ? 'rgba(244,114,182,.3)' : 'rgba(255,255,255,.05)') + '\">' + x[0] + '</span>' + (i < u.length - 1 ? '<span style=\"color:#c3e56f;font-weight:800;font-size:14px\">← ×' + fmt(u[i + 1][1] / x[1]) + ' · ÷' + fmt(u[i + 1][1] / x[1]) + ' →</span>' : '')).join(' ');\r\n    const v = num(inp.value); if (v == null) { out.innerHTML = L.type; return; }\r\n    const a = u[+from.value], b = u[+to.value], base = v * a[1], res = base / b[1];\r\n    const nice = Number.isInteger(res) ? fmt(res) : null;\r\n    const f = a[1] / b[1];\r\n    out.className = 'g4-out' + (nice ? ' good' : '');\r\n    out.innerHTML = nice ? '<b>' + fmt(v) + ' ' + a[0] + ' = ' + nice + ' ' + b[0] + '</b><br>' + (f > 1 ? L.mult(a[0], b[0], fmt(f)) : f < 1 ? L.div(a[0], b[0], fmt(1 / f)) : L.same) : L.notWhole(fmt(v), a[0], b[0]);\r\n  }\r\n  root.addEventListener('click', e => { const t = e.target.closest('button'); if (t && t.dataset.set) { set = t.dataset.set; opts(); draw(); } });\r\n  [from, to, inp].forEach(el => el.addEventListener('input', draw));\r\n  opts(); inp.value = 3; draw();\r\n})(__rev({\"type\":\"Tik 'n getal.\",\"mult\":{\"__fn\":\"(a, b, f) => 'Van ' + a + ' na ' + b + ' (\\\\'n kleiner eenheid), <b>vermenigvuldig met ' + f + '</b>: jy het meer van die kleiner eenheid nodig.'\"},\"div\":{\"__fn\":\"(a, b, f) => 'Van ' + a + ' na ' + b + ' (\\\\'n groter eenheid), <b>deel deur ' + f + '</b>: jy het minder van die groter eenheid nodig.'\"},\"same\":\"Dieselfde eenheid, dieselfde getal.\",\"notWhole\":{\"__fn\":\"(v, a, b) => v + ' ' + a + ' is nie \\\\'n heel getal ' + b + ' nie. Probeer \\\\'n ander getal.'\"}}), document.getElementById('s604')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Om 80 cm, 1 m en 1 200 mm te orden, verander hulle eers almal na dieselfde eenheid: 800 mm, 1 000 mm, 1 200 mm.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Siphiwe sny 6 stukke tou, elk 500 mm lank, van 'n tou van 3 500 mm. Hoeveel tou bly oor? (mm)",
     "answer": "500",
     "topic": "Herlei en probleme"
    },
    {
     "type": "input",
     "text": "'n Vragmotor dra 3 bokse van 250 kg elk. Wat is die totale massa? (kg)",
     "answer": "750",
     "topic": "Herlei en probleme"
    },
    {
     "type": "input",
     "text": "4 m = ___ mm",
     "answer": "4000",
     "topic": "Herlei en probleme"
    },
    {
     "type": "mc",
     "text": "Watter lys is in volgorde van kortste na langste?",
     "options": [
      "80 cm; 1 m; 1 200 mm",
      "1 m; 80 cm; 1 200 mm",
      "1 200 mm; 1 m; 80 cm",
      "80 cm; 1 200 mm; 1 m"
     ],
     "answer": 0,
     "topic": "Herlei en probleme"
    },
    {
     "type": "input",
     "text": "5 000 g = ___ kg",
     "answer": "5",
     "topic": "Herlei en probleme"
    },
    {
     "type": "input",
     "text": "'n Beker hou 2 l. Hoeveel glase van 200 ml kan jy volmaak?",
     "answer": "10",
     "topic": "Herlei en probleme"
    },
    {
     "type": "input",
     "text": "1 km − 350 m = ___ m",
     "answer": "650",
     "topic": "Herlei en probleme"
    },
    {
     "type": "input",
     "text": "Thabo stap elke dag 750 m skool toe en 750 m terug. Hoe ver stap hy in 2 dae? (m)",
     "answer": "3000",
     "topic": "Herlei en probleme"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 6,
  "chapterName": "Lengte, Massa en Inhoudsmaat",
  "topics": [
   {
    "name": "Lengte",
    "questions": [
     {
      "num": "1",
      "text": "Herlei:",
      "parts": [
       {
        "label": "a)",
        "text": "6 cm = ___ mm",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "4 m = ___ cm",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "3 km = ___ m",
        "marks": 1
       },
       {
        "label": "d)",
        "text": "250 cm = ___ m ___ cm",
        "marks": 2
       }
      ]
     },
     {
      "num": "2",
      "text": "Meet die lengte van jou potlood, jou boek en jou bank. Skryf elkeen in die beste eenheid.",
      "parts": [
       {
        "label": "",
        "text": "",
        "marks": 3
       }
      ]
     }
    ]
   },
   {
    "name": "Massa",
    "questions": [
     {
      "num": "3",
      "text": "Herlei:",
      "parts": [
       {
        "label": "a)",
        "text": "5 kg = ___ g",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "4 000 g = ___ kg",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "3 kg 250 g = ___ g",
        "marks": 2
       }
      ]
     },
     {
      "num": "4",
      "text": "'n Sak lemoene het 'n massa van 2 kg. Elke lemoen is omtrent 200 g. Omtrent hoeveel lemoene is in die sak?",
      "parts": [
       {
        "label": "",
        "text": "",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Inhoudsmaat",
    "questions": [
     {
      "num": "5",
      "text": "Herlei:",
      "parts": [
       {
        "label": "a)",
        "text": "4 l = ___ ml",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "6 000 ml = ___ l",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "2 l 300 ml = ___ ml",
        "marks": 2
       }
      ]
     },
     {
      "num": "6",
      "text": "'n Beker hou 2 l. Hoeveel glase van 250 ml kan jy daaruit volmaak?",
      "parts": [
       {
        "label": "",
        "text": "",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Herlei en probleme",
    "questions": [
     {
      "num": "7",
      "text": "Los op. Verander eers na dieselfde eenheid.",
      "parts": [
       {
        "label": "a)",
        "text": "'n Lint is 2 m lank. Lerato sny 85 cm af. Hoeveel bly oor?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "'n Resep het 750 g meel nodig. Hoeveel kilogram en gram is nodig vir 2 bakselle?",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "'n Bottel hou 1 l 500 ml. Hoeveel koppies van 250 ml kan dit volmaak?",
        "marks": 2
       }
      ]
     }
    ]
   }
  ]
 },
 "answerKey": {
  "chapter": 6,
  "chapterName": "Hoofstuk 6 — Lengte, Massa en Inhoudsmaat",
  "topics": [
   {
    "name": "Lengte",
    "answers": [
     {
      "num": "Q1a",
      "ans": "60 mm",
      "note": ""
     },
     {
      "num": "Q1b",
      "ans": "400 cm",
      "note": ""
     },
     {
      "num": "Q1c",
      "ans": "3 000 m",
      "note": ""
     },
     {
      "num": "Q1d",
      "ans": "2 m 50 cm",
      "note": ""
     },
     {
      "num": "Q2",
      "ans": "e.g. pencil 15 cm, book 25 cm, desk 1 m",
      "note": "Antwoorde sal verskil"
     }
    ]
   },
   {
    "name": "Massa",
    "answers": [
     {
      "num": "Q3a",
      "ans": "5 000 g",
      "note": ""
     },
     {
      "num": "Q3b",
      "ans": "4 kg",
      "note": ""
     },
     {
      "num": "Q3c",
      "ans": "3 250 g",
      "note": ""
     },
     {
      "num": "Q4",
      "ans": "About 10 oranges",
      "note": "2 000 ÷ 200 = 10"
     }
    ]
   },
   {
    "name": "Inhoudsmaat",
    "answers": [
     {
      "num": "Q5a",
      "ans": "4 000 ml",
      "note": ""
     },
     {
      "num": "Q5b",
      "ans": "6 l",
      "note": ""
     },
     {
      "num": "Q5c",
      "ans": "2 300 ml",
      "note": ""
     },
     {
      "num": "Q6",
      "ans": "8 glasses",
      "note": "2 000 ÷ 250 = 8"
     }
    ]
   },
   {
    "name": "Herlei en probleme",
    "answers": [
     {
      "num": "Q7a",
      "ans": "115 cm = 1 m 15 cm",
      "note": "200 − 85 = 115"
     },
     {
      "num": "Q7b",
      "ans": "1 500 g = 1 kg 500 g",
      "note": "2 × 750 = 1 500"
     },
     {
      "num": "Q7c",
      "ans": "6 cups",
      "note": "1 500 ÷ 250 = 6"
     }
    ]
   }
  ]
 }
});
