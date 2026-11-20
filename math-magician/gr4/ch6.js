// Math Magician — Grade 4, Chapter 6 (Length, Mass and Capacity)
// Generated from one bilingual source (scripts/math-gr4/gen_ch6.js); edit both languages there.
MathMagician.registerChapter(6, {
 "topics": [
  {
   "id": 601,
   "chapter": 6,
   "name": "Length",
   "fullName": "Measuring length: mm, cm, m and km",
   "lesson": {
    "heading": "Measuring length: mm, cm, m and km",
    "sub": "Chapter 6 · Topic 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/giraffe.webp\" srcset=\"/assets/stickers/giraffe@2x.webp 2x\" alt=\"\"><p>We measure <strong>length</strong> with a ruler, a measuring tape or a metre stick. Choose a unit that fits what you measure.</p></div><table class=\"g4-chart\"><tr><th>Unit</th><th>Use it for</th><th>Equals</th></tr><tr><td style=\"font-size:22px\">millimetre (mm)</td><td style=\"font-size:22px\">an ant, a seed</td><td style=\"font-size:22px\">—</td></tr><tr><td style=\"font-size:22px\">centimetre (cm)</td><td style=\"font-size:22px\">a pencil, a book</td><td style=\"font-size:22px\">10 mm</td></tr><tr><td style=\"font-size:22px\">metre (m)</td><td style=\"font-size:22px\">a classroom, a rope</td><td style=\"font-size:22px\">100 cm</td></tr><tr><td style=\"font-size:22px\">kilometre (km)</td><td style=\"font-size:22px\">the road to town</td><td style=\"font-size:22px\">1 000 m</td></tr></table><div class=\"example-box\"><div class=\"example-box-title\">✏️ Measure carefully</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Put the 0 of the ruler at one end of the object.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Read the number at the other end.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Count the small lines past the last whole centimetre: 8 cm and 7 mm = 87 mm.</span></div></div><div class=\"g4-sim\" id=\"s601\"><h4>🎮 Read the Ruler</h4><p class=\"how\">Each small line on the ruler is 1 mm. Each numbered line is 1 cm = 10 mm.</p><div class=\"g4-stage\"><svg viewBox=\"0 0 640 175\" data-k=\"svg\" role=\"img\" aria-label=\"ruler\"></svg></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"mm\"><span style=\"font-size:20px\">mm</span><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button><button class=\"g4-btn ghost\" data-k=\"shift\" aria-pressed=\"false\">Harder: not at 0</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, num } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  let len = 87, start = 0, shift = false, score = 0, tries = 0;\r\n  const X = mm => 30 + mm * 3.8; // 150 mm across ~570 px\r\n  function draw(reveal) {\r\n    let h = '<rect x=\"20\" y=\"96\" width=\"600\" height=\"70\" rx=\"8\" fill=\"#fde68a\"/>';\r\n    for (let mm = 0; mm <= 150; mm++) { const x = X(mm), tall = mm % 10 === 0 ? 30 : mm % 5 === 0 ? 20 : 12; h += '<line x1=\"' + x + '\" y1=\"96\" x2=\"' + x + '\" y2=\"' + (96 + tall) + '\" stroke=\"#1f2937\" stroke-width=\"' + (mm % 10 ? 1 : 2) + '\"/>'; if (mm % 10 === 0) h += '<text x=\"' + x + '\" y=\"150\" text-anchor=\"middle\" fill=\"#1f2937\" font-size=\"16\" font-weight=\"800\">' + (mm / 10) + '</text>'; }\r\n    h += '<text x=\"600\" y=\"160\" text-anchor=\"end\" fill=\"#1f2937\" font-size=\"12\">cm</text>';\r\n    const x1 = X(start), x2 = X(start + len);\r\n    h += '<rect x=\"' + x1 + '\" y=\"44\" width=\"' + (x2 - x1) + '\" height=\"30\" rx=\"6\" fill=\"#f472b6\"/><path d=\"M' + x2 + ' 44 l26 15 l-26 15 z\" fill=\"#fbcfe8\"/><rect x=\"' + (x1 - 8) + '\" y=\"44\" width=\"10\" height=\"30\" rx=\"3\" fill=\"#9d174d\"/>';\r\n    h += '<line x1=\"' + x1 + '\" y1=\"74\" x2=\"' + x1 + '\" y2=\"96\" stroke=\"#f472b6\" stroke-dasharray=\"3 3\"/><line x1=\"' + x2 + '\" y1=\"74\" x2=\"' + x2 + '\" y2=\"96\" stroke=\"#f472b6\" stroke-dasharray=\"3 3\"/>';\r\n    if (reveal) h += '<text x=\"' + ((x1 + x2) / 2) + '\" y=\"34\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + len + ' mm</text>';\r\n    svg.innerHTML = h;\r\n  }\r\n  function fresh() { len = rnd(25, 120); start = shift ? rnd(1, 150 - len) : 0; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = shift ? L.askShift : L.ask; draw(false); }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'check') { const v = num(q(root, 'ans').value); tries++; const ok = v === len; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.is(len, Math.floor(len / 10), len % 10) + (start ? ' ' + L.sub(start + len, start, len) : '') + ' ' + L.score(score, tries); draw(true); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n    else if (t.dataset.k === 'shift') { shift = !shift; t.setAttribute('aria-pressed', shift); fresh(); }\r\n  });\r\n  fresh();\r\n})(__rev({\"ask\":\"How long is the pink pencil? Type your answer in millimetres (mm).\",\"askShift\":\"Careful: the pencil does not start at 0! How long is it in mm?\",\"yes\":\"Correct!\",\"no\":\"Not quite.\",\"is\":{\"__fn\":\"(mm, c, r) => 'It is ' + mm + ' mm long' + (c ? ' (' + c + ' cm ' + (r ? r + ' mm' : '') + ')' : '') + '.'\"},\"sub\":{\"__fn\":\"(e, s, l) => 'It ends at ' + e + ' mm and starts at ' + s + ' mm: ' + e + ' − ' + s + ' = ' + l + ' mm.'\"},\"score\":{\"__fn\":\"(a, b) => 'Score: ' + a + ' out of ' + b + '.'\"}}), document.getElementById('s601')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Estimate first: your finger is about 1 cm wide, and a big step is about 1 m.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Which unit is best for measuring a pencil?",
     "options": [
      "cm",
      "km",
      "kg",
      "l"
     ],
     "answer": 0,
     "topic": "Length"
    },
    {
     "type": "input",
     "text": "1 cm = ___ mm",
     "answer": "10",
     "topic": "Length"
    },
    {
     "type": "input",
     "text": "1 m = ___ cm",
     "answer": "100",
     "topic": "Length"
    },
    {
     "type": "input",
     "text": "1 km = ___ m",
     "answer": "1000",
     "topic": "Length"
    },
    {
     "type": "input",
     "text": "3 m = ___ cm",
     "answer": "300",
     "topic": "Length"
    },
    {
     "type": "input",
     "text": "45 mm = 4 cm and ___ mm",
     "answer": "5",
     "topic": "Length"
    },
    {
     "type": "mc",
     "text": "The distance from Cape Town to Johannesburg is best measured in…",
     "options": [
      "mm",
      "cm",
      "m",
      "km"
     ],
     "answer": 3,
     "topic": "Length"
    },
    {
     "type": "input",
     "text": "2 km 500 m = ___ m",
     "answer": "2500",
     "topic": "Length"
    }
   ]
  },
  {
   "id": 602,
   "chapter": 6,
   "name": "Mass",
   "fullName": "Measuring mass: g and kg",
   "lesson": {
    "heading": "Measuring mass: g and kg",
    "sub": "Chapter 6 · Topic 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/butter.webp\" srcset=\"/assets/stickers/butter@2x.webp 2x\" alt=\"\"><p><strong>Mass</strong> tells us how heavy something is. We measure mass in <strong>grams (g)</strong> and <strong>kilograms (kg)</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Grams and kilograms</div><p><span class=\"math\">1 kg = 1 000 g</span>. A paper clip is about 1 g. A bag of sugar is often 1 kg or 2 kg 500 g.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Choosing a scale</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Use a <strong>kitchen scale</strong> for food, in grams.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Use a <strong>bathroom scale</strong> to weigh people, in kilograms.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Read where the needle points. Work out what each small line is worth first.</span></div></div><div class=\"g4-sim\" id=\"s602\"><h4>🎮 Kitchen Scale</h4><p class=\"how\">The scale goes up to 2 kg (2 000 g). The long lines are every 500 g, the middle lines every 100 g and the short lines every 50 g.</p><div class=\"g4-big\" data-k=\"name\" style=\"font-size:22px\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 300\" data-k=\"svg\" role=\"img\" aria-label=\"scale\"></svg></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"g\"><span style=\"font-size:20px\">g</span><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, num } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  let item = null, mass = 0, score = 0, tries = 0;\r\n  function draw(reveal) {\r\n    const cx = 320, cy = 285, R = 170, ang = m => Math.PI * (1 - m / 2000);\r\n    let h = '<rect x=\"300\" y=\"92\" width=\"40\" height=\"12\" fill=\"#64748b\"/><rect x=\"150\" y=\"68\" width=\"340\" height=\"26\" rx=\"10\" fill=\"#94a3b8\"/>';\r\n    h += '<path d=\"M' + (cx - R - 18) + ' ' + cy + ' A' + (R + 18) + ' ' + (R + 18) + ' 0 0 1 ' + (cx + R + 18) + ' ' + cy + ' Z\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"4\"/>';\r\n    for (let m = 0; m <= 2000; m += 50) { const a = ang(m), big = m % 500 === 0, mid = m % 100 === 0, r1 = R - (big ? 22 : mid ? 14 : 8); h += '<line x1=\"' + (cx + R * Math.cos(a)) + '\" y1=\"' + (cy - R * Math.sin(a)) + '\" x2=\"' + (cx + r1 * Math.cos(a)) + '\" y2=\"' + (cy - r1 * Math.sin(a)) + '\" stroke=\"#1f2937\" stroke-width=\"' + (big ? 3 : 1.5) + '\"/>'; if (big) h += '<text x=\"' + (cx + (R - 48) * Math.cos(a)) + '\" y=\"' + (cy - (R - 48) * Math.sin(a) + 6) + '\" text-anchor=\"middle\" fill=\"#1f2937\" font-size=\"19\" font-weight=\"800\">' + (m === 0 ? '0' : m % 1000 === 0 ? (m / 1000) + ' kg' : m) + '</text>'; }\r\n    const a = ang(mass); h += '<line x1=\"' + cx + '\" y1=\"' + cy + '\" x2=\"' + (cx + (R - 10) * Math.cos(a)) + '\" y2=\"' + (cy - (R - 10) * Math.sin(a)) + '\" stroke=\"#e11d48\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"' + cx + '\" cy=\"' + cy + '\" r=\"9\" fill=\"#e11d48\"/><text x=\"' + cx + '\" y=\"' + (cy - 30) + '\" text-anchor=\"middle\" fill=\"#64748b\" font-size=\"13\">g</text>';\r\n    if (item) h += '<image href=\"/assets/stickers/' + item.s + '.webp\" x=\"' + (cx - 34) + '\" y=\"2\" width=\"68\" height=\"68\"/>';\r\n    if (reveal) h += '<text x=\"' + cx + '\" y=\"' + (cy - 55) + '\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + mass + ' g</text>';\r\n    svg.innerHTML = h;\r\n  }\r\n  function fresh() {\r\n    item = L.items[rnd(0, L.items.length - 1)];\r\n    mass = item.m || rnd(2, 38) * 50;\r\n    q(root, 'name').textContent = item.n; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.ask; draw(false);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'check') { const v = num(q(root, 'ans').value); tries++; const ok = v === mass; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.is(mass) + ' ' + L.score(score, tries); draw(true); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n  });\r\n  fresh();\r\n})(__rev({\"items\":[{\"n\":\"An apple\",\"s\":\"apple\",\"m\":150},{\"n\":\"A banana\",\"s\":\"banana\",\"m\":100},{\"n\":\"A loaf of bread\",\"s\":\"bread-loaf\",\"m\":700},{\"n\":\"A block of butter\",\"s\":\"butter\",\"m\":500},{\"n\":\"A carton of milk\",\"s\":\"milk\",\"m\":1000},{\"n\":\"A slab of chocolate\",\"s\":\"chocolate\",\"m\":150},{\"n\":\"A bag of mealies\",\"s\":\"mealie\"},{\"n\":\"A bag of sand\",\"s\":\"sand\"}],\"ask\":\"Read the scale. How many grams (g)?\",\"yes\":\"Correct!\",\"no\":\"Not quite.\",\"is\":{\"__fn\":\"g => 'The mass is ' + g + ' g' + (g >= 1000 ? ' = ' + Math.floor(g / 1000) + ' kg ' + (g % 1000 ? g % 1000 + ' g' : '') : '') + '.'\"},\"score\":{\"__fn\":\"(a, b) => 'Score: ' + a + ' out of ' + b + '.'\"}}), document.getElementById('s602')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>1 kg of feathers and 1 kg of stones have the <strong>same</strong> mass. The feathers just take up more space!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "1 kg = ___ g",
     "answer": "1000",
     "topic": "Mass"
    },
    {
     "type": "mc",
     "text": "Which unit is best for the mass of a bag of potatoes?",
     "options": [
      "g",
      "kg",
      "ml",
      "km"
     ],
     "answer": 1,
     "topic": "Mass"
    },
    {
     "type": "input",
     "text": "3 kg = ___ g",
     "answer": "3000",
     "topic": "Mass"
    },
    {
     "type": "input",
     "text": "2 500 g = 2 kg and ___ g",
     "answer": "500",
     "topic": "Mass"
    },
    {
     "type": "mc",
     "text": "Which is heavier?",
     "options": [
      "1 kg of feathers",
      "1 kg of stones",
      "They have the same mass"
     ],
     "answer": 2,
     "topic": "Mass"
    },
    {
     "type": "input",
     "text": "An apple has a mass of 150 g. What is the mass of 4 apples? (g)",
     "answer": "600",
     "topic": "Mass"
    },
    {
     "type": "mc",
     "text": "Which instrument would you use to weigh yourself?",
     "options": [
      "kitchen scale",
      "bathroom scale",
      "ruler",
      "measuring jug"
     ],
     "answer": 1,
     "topic": "Mass"
    },
    {
     "type": "input",
     "text": "A bag of maize meal has 12 kg. Busi uses 2 kg and then 4 kg. She shares the rest equally into 2 bags. What is the mass of each bag? (kg)",
     "answer": "3",
     "topic": "Mass"
    }
   ]
  },
  {
   "id": 603,
   "chapter": 6,
   "name": "Capacity",
   "fullName": "Measuring capacity: ml and l",
   "lesson": {
    "heading": "Measuring capacity: ml and l",
    "sub": "Chapter 6 · Topic 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/milk.webp\" srcset=\"/assets/stickers/milk@2x.webp 2x\" alt=\"\"><p><strong>Capacity</strong> is how much a container can hold. We measure it in <strong>millilitres (ml)</strong> and <strong>litres (l)</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Millilitres and litres</div><p><span class=\"math\">1 l = 1 000 ml</span>. A teaspoon holds about 5 ml. A cup holds about 250 ml. A carton of milk often holds 1 l.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Reading a measuring jug</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Hold the jug level and look at the water from the side.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Find the line at the top of the water.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Work out what each line is worth: here each small line is 50 ml.</span></div></div><div class=\"g4-sim\" id=\"s603\"><h4>🎮 Measuring Jug</h4><p class=\"how\">The jug holds 1 litre (1 000 ml). The long lines are every 100 ml and the short lines every 50 ml.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-m=\"read\">Read the jug</button><button class=\"g4-btn ghost\" data-m=\"pour\">Pour</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 265\" data-k=\"svg\" role=\"img\" aria-label=\"jug\"></svg></div><div class=\"g4-row\" data-k=\"readrow\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"ml\"><span style=\"font-size:20px\">ml</span></div><div class=\"g4-row\" data-k=\"pourrow\"><input type=\"range\" min=\"0\" max=\"1000\" step=\"50\" value=\"0\" data-k=\"pour\" style=\"flex:1;min-width:180px;accent-color:#60a5fa\" aria-label=\"pour\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, num } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), pour = q(root, 'pour');\r\n  let mode = 'read', level = 600, target = 750, score = 0, tries = 0;\r\n  const Y = ml => 250 - ml * 0.2; // 1 000 ml → 200 px\r\n  function draw(reveal) {\r\n    root.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === mode));\r\n    q(root, 'readrow').style.display = mode === 'read' ? '' : 'none'; q(root, 'pourrow').style.display = mode === 'pour' ? '' : 'none';\r\n    const show = mode === 'read' ? level : +pour.value;\r\n    let h = '<rect x=\"240\" y=\"' + Y(show) + '\" width=\"160\" height=\"' + (250 - Y(show)) + '\" fill=\"rgba(96,165,250,.55)\"/><path d=\"M240 30 L240 250 L400 250 L400 30\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"5\"/><path d=\"M400 70 Q450 70 450 130 Q450 190 400 190\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"5\"/>';\r\n    for (let ml = 0; ml <= 1000; ml += 50) { const big = ml % 100 === 0; h += '<line x1=\"240\" y1=\"' + Y(ml) + '\" x2=\"' + (240 + (big ? 30 : 16)) + '\" y2=\"' + Y(ml) + '\" stroke=\"#e2e8f0\" stroke-width=\"' + (big ? 2.5 : 1.2) + '\"/>'; if (ml % 200 === 0) h += '<text x=\"230\" y=\"' + (Y(ml) + 5) + '\" text-anchor=\"end\" fill=\"#e2e8f0\" font-size=\"15\" font-weight=\"800\">' + (ml === 1000 ? '1 l' : ml + ' ml') + '</text>'; }\r\n    if (reveal || mode === 'pour') h += '<text x=\"320\" y=\"' + (Y(show) - 8) + '\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + show + ' ml</text>';\r\n    if (mode === 'pour') h += '<line x1=\"235\" y1=\"' + Y(target) + '\" x2=\"405\" y2=\"' + Y(target) + '\" stroke=\"#f472b6\" stroke-width=\"3\" stroke-dasharray=\"8 6\"/>';\r\n    svg.innerHTML = h;\r\n  }\r\n  function fresh() {\r\n    if (mode === 'read') { level = rnd(1, 19) * 50; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.askRead; }\r\n    else { target = rnd(2, 19) * 50; pour.value = 0; out.className = 'g4-out'; out.innerHTML = L.askPour(target); }\r\n    draw(false);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.m) { mode = t.dataset.m; fresh(); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n    else if (t.dataset.k === 'check') {\r\n      tries++;\r\n      if (mode === 'read') { const v = num(q(root, 'ans').value), ok = v === level; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.isRead(level) + ' ' + L.score(score, tries); draw(true); }\r\n      else { const v = +pour.value, ok = v === target; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.poured(v, target) + ' ' + L.score(score, tries); }\r\n    }\r\n  });\r\n  pour.addEventListener('input', () => draw(false));\r\n  fresh();\r\n})(__rev({\"askRead\":\"How much water is in the jug? Type it in millilitres (ml).\",\"askPour\":{\"__fn\":\"t => 'Pour exactly <b>' + t + ' ml</b>. Drag the slider until the water reaches the pink line, then check.'\"},\"yes\":\"Correct!\",\"no\":\"Not quite.\",\"isRead\":{\"__fn\":\"v => 'There is ' + v + ' ml of water.'\"},\"poured\":{\"__fn\":\"(v, t) => 'You poured ' + v + ' ml. The target was ' + t + ' ml.'\"},\"score\":{\"__fn\":\"(a, b) => 'Score: ' + a + ' out of ' + b + '.'\"}}), document.getElementById('s603')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Four cups of 250 ml fill a 1 litre jug: <span class=\"math\">4 × 250 ml = 1 000 ml = 1 l</span>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "1 l = ___ ml",
     "answer": "1000",
     "topic": "Capacity"
    },
    {
     "type": "mc",
     "text": "Which unit is best for a teaspoon of medicine?",
     "options": [
      "ml",
      "l",
      "kg",
      "km"
     ],
     "answer": 0,
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "2 l = ___ ml",
     "answer": "2000",
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "1 500 ml = 1 l and ___ ml",
     "answer": "500",
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "How many millilitres are in four 250 ml cups?",
     "answer": "1000",
     "topic": "Capacity"
    },
    {
     "type": "mc",
     "text": "Which container holds about 1 litre?",
     "options": [
      "a teaspoon",
      "a milk carton",
      "a bath",
      "a swimming pool"
     ],
     "answer": 1,
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "3 l − 750 ml = ___ ml",
     "answer": "2250",
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "Waseela uses 2 l of water for tea, 60 l for washing and 4 l for the dishes. How many litres does she use altogether?",
     "answer": "66",
     "topic": "Capacity"
    }
   ]
  },
  {
   "id": 604,
   "chapter": 6,
   "name": "Converting and problems",
   "fullName": "Converting units and solving measurement problems",
   "lesson": {
    "heading": "Converting units and solving measurement problems",
    "sub": "Chapter 6 · Topic 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/kudu-horn.webp\" srcset=\"/assets/stickers/kudu-horn@2x.webp 2x\" alt=\"\"><p>To compare or add measurements, they must be in the <strong>same unit</strong>. Then we can solve problems.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Siphiwe's rope</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Siphiwe cuts 6 pieces of rope, each 500 mm long, from a rope 3 500 mm long. How much is left?</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Used: <span class=\"math\">6 × 500 mm = 3 000 mm</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Left: <span class=\"math\">3 500 mm − 3 000 mm = 500 mm</span></span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Smaller unit, bigger number</div><p>Going to a <strong>smaller</strong> unit (m → cm), multiply. Going to a <strong>bigger</strong> unit (g → kg), divide.</p></div><div class=\"g4-sim\" id=\"s604\"><h4>🎮 Unit Converter</h4><p class=\"how\">Choose length, mass or capacity. Type a number and choose the units. The ladder shows when to multiply and when to divide.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-set=\"len\">Length</button><button class=\"g4-btn ghost\" data-set=\"mass\">Mass</button><button class=\"g4-btn ghost\" data-set=\"cap\">Capacity</button></div><div class=\"g4-row\" data-k=\"ladder\" style=\"gap:6px\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"n\" inputmode=\"numeric\" aria-label=\"number\"><select data-k=\"from\" style=\"font:inherit;font-size:20px;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.25);color:#fff;border:1px solid rgba(255,255,255,.18)\" aria-label=\"from\"></select><span class=\"g4-big\">→</span><select data-k=\"to\" style=\"font:inherit;font-size:20px;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.25);color:#fff;border:1px solid rgba(255,255,255,.18)\" aria-label=\"to\"></select></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, num, fmt } = window.G4;\r\n  const out = q(root, 'out'), from = q(root, 'from'), to = q(root, 'to'), inp = q(root, 'n'), ladder = q(root, 'ladder');\r\n  const SETS = { len: [['mm', 1], ['cm', 10], ['m', 1000], ['km', 1000000]], mass: [['g', 1], ['kg', 1000]], cap: [['ml', 1], ['l', 1000]] };\r\n  let set = 'len';\r\n  function opts() { const u = SETS[set]; from.innerHTML = u.map((x, i) => '<option value=\"' + i + '\">' + x[0] + '</option>').join(''); to.innerHTML = from.innerHTML; from.value = u.length > 2 ? 2 : 1; to.value = 0; }\r\n  function draw() {\r\n    root.querySelectorAll('[data-set]').forEach(b => b.setAttribute('aria-pressed', b.dataset.set === set));\r\n    const u = SETS[set];\r\n    ladder.innerHTML = u.map((x, i) => '<span class=\"g4-big\" style=\"font-size:22px;padding:4px 12px;border-radius:10px;background:' + (i == from.value ? 'rgba(96,165,250,.3)' : i == to.value ? 'rgba(244,114,182,.3)' : 'rgba(255,255,255,.05)') + '\">' + x[0] + '</span>' + (i < u.length - 1 ? '<span style=\"color:#c3e56f;font-weight:800;font-size:14px\">← ×' + fmt(u[i + 1][1] / x[1]) + ' · ÷' + fmt(u[i + 1][1] / x[1]) + ' →</span>' : '')).join(' ');\r\n    const v = num(inp.value); if (v == null) { out.innerHTML = L.type; return; }\r\n    const a = u[+from.value], b = u[+to.value], base = v * a[1], res = base / b[1];\r\n    const nice = Number.isInteger(res) ? fmt(res) : null;\r\n    const f = a[1] / b[1];\r\n    out.className = 'g4-out' + (nice ? ' good' : '');\r\n    out.innerHTML = nice ? '<b>' + fmt(v) + ' ' + a[0] + ' = ' + nice + ' ' + b[0] + '</b><br>' + (f > 1 ? L.mult(a[0], b[0], fmt(f)) : f < 1 ? L.div(a[0], b[0], fmt(1 / f)) : L.same) : L.notWhole(fmt(v), a[0], b[0]);\r\n  }\r\n  root.addEventListener('click', e => { const t = e.target.closest('button'); if (t && t.dataset.set) { set = t.dataset.set; opts(); draw(); } });\r\n  [from, to, inp].forEach(el => el.addEventListener('input', draw));\r\n  opts(); inp.value = 3; draw();\r\n})(__rev({\"type\":\"Type a number.\",\"mult\":{\"__fn\":\"(a, b, f) => 'From ' + a + ' to ' + b + ' (a smaller unit), <b>multiply by ' + f + '</b>: you need more of the smaller unit.'\"},\"div\":{\"__fn\":\"(a, b, f) => 'From ' + a + ' to ' + b + ' (a bigger unit), <b>divide by ' + f + '</b>: you need fewer of the bigger unit.'\"},\"same\":\"Same unit, same number.\",\"notWhole\":{\"__fn\":\"(v, a, b) => v + ' ' + a + ' is not a whole number of ' + b + '. Try a different number.'\"}}), document.getElementById('s604')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>To order 80 cm, 1 m and 1 200 mm, change them all to the same unit first: 800 mm, 1 000 mm, 1 200 mm.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Siphiwe cuts 6 pieces of rope, each 500 mm long, from a rope 3 500 mm long. How much rope is left? (mm)",
     "answer": "500",
     "topic": "Converting and problems"
    },
    {
     "type": "input",
     "text": "A truck carries 3 boxes of 250 kg each. What is the total mass? (kg)",
     "answer": "750",
     "topic": "Converting and problems"
    },
    {
     "type": "input",
     "text": "4 m = ___ mm",
     "answer": "4000",
     "topic": "Converting and problems"
    },
    {
     "type": "mc",
     "text": "Which list is in order from shortest to longest?",
     "options": [
      "80 cm; 1 m; 1 200 mm",
      "1 m; 80 cm; 1 200 mm",
      "1 200 mm; 1 m; 80 cm",
      "80 cm; 1 200 mm; 1 m"
     ],
     "answer": 0,
     "topic": "Converting and problems"
    },
    {
     "type": "input",
     "text": "5 000 g = ___ kg",
     "answer": "5",
     "topic": "Converting and problems"
    },
    {
     "type": "input",
     "text": "A jug holds 2 l. How many glasses of 200 ml can you fill?",
     "answer": "10",
     "topic": "Converting and problems"
    },
    {
     "type": "input",
     "text": "1 km − 350 m = ___ m",
     "answer": "650",
     "topic": "Converting and problems"
    },
    {
     "type": "input",
     "text": "Thabo walks 750 m to school and 750 m back every day. How far does he walk in 2 days? (m)",
     "answer": "3000",
     "topic": "Converting and problems"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 6,
  "chapterName": "Length, Mass and Capacity",
  "topics": [
   {
    "name": "Length",
    "questions": [
     {
      "num": "1",
      "text": "Convert:",
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
      "text": "Measure the length of your pencil, your book and your desk. Write each in the best unit.",
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
    "name": "Mass",
    "questions": [
     {
      "num": "3",
      "text": "Convert:",
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
      "text": "A bag of oranges has a mass of 2 kg. Each orange is about 200 g. About how many oranges are in the bag?",
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
    "name": "Capacity",
    "questions": [
     {
      "num": "5",
      "text": "Convert:",
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
      "text": "A jug holds 2 l. How many glasses of 250 ml can you fill from it?",
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
    "name": "Converting and problems",
    "questions": [
     {
      "num": "7",
      "text": "Solve. Change to the same unit first.",
      "parts": [
       {
        "label": "a)",
        "text": "A ribbon is 2 m long. Lerato cuts off 85 cm. How much is left?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "A recipe needs 750 g of flour. How many kilograms and grams are needed for 2 batches?",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "A bottle holds 1 l 500 ml. How many 250 ml cups can it fill?",
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
  "chapterName": "Chapter 6 — Length, Mass and Capacity",
  "topics": [
   {
    "name": "Length",
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
      "note": "Answers will vary"
     }
    ]
   },
   {
    "name": "Mass",
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
    "name": "Capacity",
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
    "name": "Converting and problems",
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
