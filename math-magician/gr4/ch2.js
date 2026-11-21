// Math Magician — Grade 4, Chapter 2 (2-D Shapes and 3-D Objects)
// Generated from one bilingual source (scripts/math-gr4/gen_ch2.js); edit both languages there.
MathMagician.registerChapter(2, {
 "topics": [
  {
   "id": 201,
   "chapter": 2,
   "name": "2-D shapes",
   "fullName": "2-D shapes with straight and curved sides",
   "lesson": {
    "heading": "2-D shapes with straight and curved sides",
    "sub": "Chapter 2 · Topic 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/window.webp\" srcset=\"/assets/stickers/window@2x.webp 2x\" alt=\"\"><p>A <strong>2-D shape</strong> is flat, like a drawing on paper. Some shapes have <strong>straight sides</strong>, some have <strong>curved sides</strong>, and some have both.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Shapes around us</div><p>A window or a door is a <strong>rectangle</strong>. A coin or a clock is a <strong>circle</strong>. A YIELD road sign is a <strong>triangle</strong>. A semicircle has one straight side and one curved side.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Describe a shape</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>How many sides does it have?</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Are the sides straight, curved, or both?</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>How many corners does it have? A circle has no corners.</span></div></div><div class=\"g4-sim\" id=\"s201\"><h4>🎮 Shape Sorter</h4><p class=\"how\">Look at each shape. Does it have only straight sides, only curved sides, or both?</p><div class=\"g4-hero\" data-k=\"card\" style=\"justify-content:center;flex-direction:column\"></div><div class=\"g4-row\" data-k=\"bins\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"next\" style=\"display:none\">Next</button><button class=\"g4-btn\" data-k=\"again\" style=\"display:none\">Play again</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, shuffle } = window.G4;\r\n  const SH = {\r\n    square: '<rect x=\"45\" y=\"25\" width=\"90\" height=\"90\" />',\r\n    rectangle: '<rect x=\"20\" y=\"40\" width=\"140\" height=\"70\" />',\r\n    triangle: '<path d=\"M90 20 L160 125 L20 125 Z\" />',\r\n    hexagon: '<path d=\"M60 25 L120 25 L150 75 L120 125 L60 125 L30 75 Z\" />',\r\n    circle: '<circle cx=\"90\" cy=\"75\" r=\"55\" />',\r\n    oval: '<ellipse cx=\"90\" cy=\"75\" rx=\"75\" ry=\"45\" />',\r\n    crescent: '<path d=\"M110 20 A58 58 0 1 0 110 130 A45 45 0 1 1 110 20 Z\" />',\r\n    semicircle: '<path d=\"M25 110 A65 65 0 0 1 155 110 Z\" />',\r\n    quarter: '<path d=\"M40 125 L40 25 A100 100 0 0 1 140 125 Z\" />',\r\n    arch: '<path d=\"M40 130 L40 70 A50 50 0 0 1 140 70 L140 130 Z\" />'\r\n  };\r\n  const KIND = { square: 0, rectangle: 0, triangle: 0, hexagon: 0, circle: 1, oval: 1, crescent: 1, semicircle: 2, quarter: 2, arch: 2 };\r\n  const COLS = ['#60a5fa', '#f472b6', '#facc15'];\r\n  const card = q(root, 'card'), out = q(root, 'out'), bins = q(root, 'bins');\r\n  let deck, pos, score;\r\n  bins.innerHTML = L.bins.map((b, i) => '<button class=\"g4-btn\" data-b=\"' + i + '\" style=\"flex:1;min-width:150px;border-color:' + COLS[i] + '\">' + b + '</button>').join('');\r\n  function start() { deck = shuffle(Object.keys(SH)); pos = 0; score = 0; draw(); }\r\n  function draw() {\r\n    bins.querySelectorAll('button').forEach(b => { b.disabled = false; b.style.outline = ''; });\r\n    q(root, 'next').style.display = 'none';\r\n    if (pos >= deck.length) { card.innerHTML = '<div class=\"g4-big\">⭐ ' + L.done(score, deck.length) + '</div>'; bins.style.display = 'none'; q(root, 'again').style.display = ''; out.className = 'g4-out good'; out.innerHTML = L.end; return; }\r\n    bins.style.display = ''; q(root, 'again').style.display = 'none';\r\n    const k = deck[pos];\r\n    card.innerHTML = '<svg viewBox=\"0 0 180 150\" style=\"width:180px;height:150px\"><g fill=\"rgba(158,212,60,.18)\" stroke=\"#c3e56f\" stroke-width=\"5\" stroke-linejoin=\"round\">' + SH[k] + '</g></svg><div class=\"g4-big\" style=\"font-size:24px\">' + L.names[k] + '</div>';\r\n    out.className = 'g4-out'; out.innerHTML = L.ask + ' ' + L.of(pos + 1, deck.length);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.b != null && !b.disabled) {\r\n      const k = deck[pos], ok = +b.dataset.b === KIND[k]; if (ok) score++;\r\n      bins.querySelectorAll('button').forEach(x => { x.disabled = true; if (+x.dataset.b === KIND[k]) x.style.outline = '3px solid #4ade80'; });\r\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.why(KIND[k], L.names[k]);\r\n      q(root, 'next').style.display = '';\r\n    } else if (b.dataset.k === 'next') { pos++; draw(); }\r\n    else if (b.dataset.k === 'again') start();\r\n  });\r\n  start();\r\n})(__rev({\"bins\":[\"Only straight sides\",\"Only curved sides\",\"Straight and curved\"],\"ask\":\"Which group does this shape belong to?\",\"of\":{\"__fn\":\"(a, b) => '(' + a + ' of ' + b + ')'\"},\"yes\":\"Correct!\",\"no\":\"Not quite.\",\"why\":{\"__fn\":\"(k, n) => 'A ' + n + [' has only straight sides.', ' has only curved sides.', ' has straight sides and curved sides.'][k]\"},\"done\":{\"__fn\":\"(a, b) => a + ' out of ' + b\"},\"end\":\"Well done! Now look around the classroom for shapes with straight and curved sides.\",\"names\":{\"square\":\"square\",\"rectangle\":\"rectangle\",\"triangle\":\"triangle\",\"hexagon\":\"hexagon\",\"circle\":\"circle\",\"oval\":\"oval\",\"crescent\":\"crescent\",\"semicircle\":\"semicircle\",\"quarter\":\"quarter circle\",\"arch\":\"arch\"}}), document.getElementById('s201')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Go on a <strong>shape hunt</strong>: find 3 things with straight sides and 3 things with curved sides at home.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Which shape has only curved sides?",
     "options": [
      "square",
      "circle",
      "triangle",
      "rectangle"
     ],
     "answer": 1,
     "topic": "2-D shapes"
    },
    {
     "type": "mc",
     "text": "A semicircle has…",
     "options": [
      "only straight sides",
      "only curved sides",
      "straight and curved sides"
     ],
     "answer": 2,
     "topic": "2-D shapes"
    },
    {
     "type": "mc",
     "text": "A door is usually shaped like a…",
     "options": [
      "circle",
      "rectangle",
      "triangle",
      "hexagon"
     ],
     "answer": 1,
     "topic": "2-D shapes"
    },
    {
     "type": "input",
     "text": "How many straight sides does a triangle have?",
     "answer": "3",
     "topic": "2-D shapes"
    },
    {
     "type": "mc",
     "text": "Which object is shaped like a circle?",
     "options": [
      "a book",
      "a coin",
      "a door",
      "a ruler"
     ],
     "answer": 1,
     "topic": "2-D shapes"
    },
    {
     "type": "mc",
     "text": "Which shape has only straight sides?",
     "options": [
      "oval",
      "semicircle",
      "square",
      "circle"
     ],
     "answer": 2,
     "topic": "2-D shapes"
    },
    {
     "type": "input",
     "text": "How many corners does a circle have?",
     "answer": "0",
     "topic": "2-D shapes"
    },
    {
     "type": "mc",
     "text": "Thandi draws a shape with 2 straight sides and 1 curved side. Which group is it in?",
     "options": [
      "only straight sides",
      "only curved sides",
      "straight and curved sides"
     ],
     "answer": 2,
     "topic": "2-D shapes"
    }
   ]
  },
  {
   "id": 202,
   "chapter": 2,
   "name": "Polygons",
   "fullName": "Naming polygons by their number of sides",
   "lesson": {
    "heading": "Naming polygons by their number of sides",
    "sub": "Chapter 2 · Topic 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/robot.webp\" srcset=\"/assets/stickers/robot@2x.webp 2x\" alt=\"\"><p>A <strong>polygon</strong> is a closed 2-D shape with only <strong>straight sides</strong>. We name a polygon by counting its sides. The corners are called <strong>vertices</strong>.</p></div><table class=\"g4-chart\"><tr><th>Name</th><th>Sides</th><th>Vertices</th></tr><tr><td style=\"font-size:20px;text-align:left\">Triangle</td><td style=\"font-size:24px\">3</td><td style=\"font-size:24px\">3</td></tr><tr><td style=\"font-size:20px;text-align:left\">Quadrilateral</td><td style=\"font-size:24px\">4</td><td style=\"font-size:24px\">4</td></tr><tr><td style=\"font-size:20px;text-align:left\">Pentagon</td><td style=\"font-size:24px\">5</td><td style=\"font-size:24px\">5</td></tr><tr><td style=\"font-size:20px;text-align:left\">Hexagon</td><td style=\"font-size:24px\">6</td><td style=\"font-size:24px\">6</td></tr></table><div class=\"def-box\"><div class=\"def-box-title\">📖 Quadrilaterals</div><p>Any polygon with 4 sides is a <strong>quadrilateral</strong>. Squares and rectangles are special quadrilaterals.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Name a polygon</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Put your pencil on one corner.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Count each side as you go around: 1, 2, 3 …</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Stop when you are back where you started. 5 sides? It is a <strong>pentagon</strong>.</span></div></div><div class=\"g4-sim\" id=\"s202\"><h4>🎮 Name that Polygon</h4><p class=\"how\">Count the sides, then choose the name. The sides get numbered so you can check.</p><div class=\"g4-stage\"><svg viewBox=\"0 0 320 220\" data-k=\"svg\" role=\"img\" aria-label=\"polygon\" style=\"max-width:360px\"></svg></div><div class=\"g4-row\" data-k=\"opts\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"new\">New one</button><button class=\"g4-btn ghost\" data-k=\"reg\" aria-pressed=\"false\">Regular shapes</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, shuffle } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), opts = q(root, 'opts');\r\n  let n = 4, pts = [], answered = false, score = 0, tries = 0;\r\n  function make() {\r\n    n = rnd(3, 6);\r\n    const regular = q(root, 'reg').getAttribute('aria-pressed') === 'true';\r\n    const angs = regular ? Array.from({ length: n }, (_, i) => -Math.PI / 2 + i * 2 * Math.PI / n) : Array.from({ length: n }, (_, i) => -Math.PI / 2 + (i + 0.25 + Math.random() * 0.5) * 2 * Math.PI / n);\r\n    pts = angs.map(a => { const r = regular ? 85 : rnd(60, 95); return [160 + r * Math.cos(a), 110 + r * Math.sin(a)]; });\r\n    answered = false; draw(false);\r\n    const choices = shuffle([3, 4, 5, 6]);\r\n    opts.innerHTML = choices.map(c => '<button class=\"g4-btn ghost\" data-n=\"' + c + '\">' + L.names[c] + '</button>').join('');\r\n    out.className = 'g4-out'; out.innerHTML = L.ask;\r\n  }\r\n  function draw(reveal) {\r\n    let h = '<path d=\"M' + pts.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L') + ' Z\" fill=\"rgba(96,165,250,.18)\" stroke=\"#93c5fd\" stroke-width=\"4\" stroke-linejoin=\"round\"/>';\r\n    if (reveal) {\r\n      pts.forEach((p, i) => { const qq = pts[(i + 1) % n], mx = (p[0] + qq[0]) / 2, my = (p[1] + qq[1]) / 2, dx = mx - 160, dy = my - 110, d = Math.hypot(dx, dy) || 1; h += '<text x=\"' + (mx + dx / d * 18) + '\" y=\"' + (my + dy / d * 18 + 6) + '\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + (i + 1) + '</text>'; });\r\n      pts.forEach(p => { h += '<circle cx=\"' + p[0] + '\" cy=\"' + p[1] + '\" r=\"7\" fill=\"#f472b6\"/>'; });\r\n    }\r\n    svg.innerHTML = h;\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.n && !answered) {\r\n      answered = true; tries++; const ok = +b.dataset.n === n; if (ok) score++;\r\n      opts.querySelectorAll('button').forEach(x => { x.disabled = true; if (+x.dataset.n === n) x.setAttribute('aria-pressed', 'true'); });\r\n      draw(true);\r\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.count(L.names[n], n) + ' ' + L.score(score, tries);\r\n    } else if (b.dataset.k === 'new') make();\r\n    else if (b.dataset.k === 'reg') { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); make(); }\r\n  });\r\n  make();\r\n})(__rev({\"names\":{\"3\":\"Triangle\",\"4\":\"Quadrilateral\",\"5\":\"Pentagon\",\"6\":\"Hexagon\"},\"ask\":\"What is this polygon called? Count its sides first.\",\"yes\":\"Correct!\",\"no\":\"Not quite.\",\"count\":{\"__fn\":\"(n, k) => 'A ' + n.toLowerCase() + ' has ' + k + ' sides and ' + k + ' vertices (corners).'\"},\"score\":{\"__fn\":\"(a, b) => 'Score: ' + a + ' out of ' + b + '.'\"}}), document.getElementById('s202')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>A circle is <strong>not</strong> a polygon, because its side is curved.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "A polygon with 5 sides is called a…",
     "options": [
      "quadrilateral",
      "pentagon",
      "hexagon",
      "triangle"
     ],
     "answer": 1,
     "topic": "Polygons"
    },
    {
     "type": "input",
     "text": "How many sides does a hexagon have?",
     "answer": "6",
     "topic": "Polygons"
    },
    {
     "type": "mc",
     "text": "Which shape is NOT a polygon?",
     "options": [
      "triangle",
      "circle",
      "square",
      "pentagon"
     ],
     "answer": 1,
     "topic": "Polygons"
    },
    {
     "type": "input",
     "text": "How many vertices (corners) does a quadrilateral have?",
     "answer": "4",
     "topic": "Polygons"
    },
    {
     "type": "mc",
     "text": "A rectangle is a…",
     "options": [
      "triangle",
      "quadrilateral",
      "pentagon",
      "hexagon"
     ],
     "answer": 1,
     "topic": "Polygons"
    },
    {
     "type": "input",
     "text": "What is the total number of sides of 2 triangles and 1 hexagon?",
     "answer": "12",
     "topic": "Polygons"
    },
    {
     "type": "mc",
     "text": "Which polygon has 6 vertices?",
     "options": [
      "pentagon",
      "hexagon",
      "quadrilateral",
      "triangle"
     ],
     "answer": 1,
     "topic": "Polygons"
    },
    {
     "type": "mc",
     "text": "Which sentence is true?",
     "options": [
      "All quadrilaterals have 4 sides.",
      "All quadrilaterals are squares.",
      "A triangle has 4 vertices.",
      "A pentagon has 6 sides."
     ],
     "answer": 0,
     "topic": "Polygons"
    }
   ]
  },
  {
   "id": 203,
   "chapter": 2,
   "name": "Drawing polygons",
   "fullName": "Drawing polygons on grid paper",
   "lesson": {
    "heading": "Drawing polygons on grid paper",
    "sub": "Chapter 2 · Topic 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/paper.webp\" srcset=\"/assets/stickers/paper@2x.webp 2x\" alt=\"\"><p>We draw polygons on <strong>grid paper</strong> or <strong>dot paper</strong> with a ruler. Join the dots with straight lines and finish where you started.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Draw a rectangle 4 squares long and 2 squares wide</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Mark a starting dot.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Count 4 squares across and mark a dot. Then 2 squares down, 4 back, and 2 up.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Join the dots with a ruler. Your rectangle covers 4 × 2 = <strong>8</strong> small squares.</span></div></div><div class=\"g4-sim\" id=\"s203\"><h4>🎮 Dot Paper</h4><p class=\"how\">Tap dots to make corners. Tap the first (yellow) dot again to close your polygon. Or tap Challenge.</p><div class=\"g4-stage\"><svg viewBox=\"0 0 540 320\" data-k=\"svg\" role=\"img\" aria-label=\"dot grid\" style=\"cursor:pointer;touch-action:manipulation\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"goal\">Challenge</button><button class=\"g4-btn ghost\" data-k=\"undo\">Undo</button><button class=\"g4-btn ghost\" data-k=\"clear\">Clear</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, pt, shuffle } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  const COLS = 12, ROWS = 8, G = 40, X0 = 60, Y0 = 20;\r\n  let pts = [], closed = false, target = null;\r\n  const name = n => L.names[n] || L.many(n);\r\n  function draw(hover) {\r\n    let h = '';\r\n    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) h += '<circle cx=\"' + (X0 + c * G) + '\" cy=\"' + (Y0 + r * G) + '\" r=\"3.5\" fill=\"rgba(226,232,240,.35)\"/>';\r\n    if (pts.length) {\r\n      const P = pts.map(([c, r]) => [X0 + c * G, Y0 + r * G]);\r\n      if (closed) h += '<path d=\"M' + P.map(p => p.join(' ')).join(' L') + ' Z\" fill=\"rgba(158,212,60,.18)\" stroke=\"#9ed43c\" stroke-width=\"4\" stroke-linejoin=\"round\"/>';\r\n      else h += '<path d=\"M' + P.map(p => p.join(' ')).join(' L') + '\" fill=\"none\" stroke=\"#9ed43c\" stroke-width=\"4\" stroke-linejoin=\"round\"/>';\r\n      P.forEach((p, i) => { h += '<circle cx=\"' + p[0] + '\" cy=\"' + p[1] + '\" r=\"' + (i === 0 && !closed ? 10 : 7) + '\" fill=\"' + (i === 0 ? '#fde047' : '#f472b6') + '\"/>'; });\r\n    }\r\n    svg.innerHTML = h;\r\n  }\r\n  function status() {\r\n    out.className = 'g4-out';\r\n    if (closed) {\r\n      const n = pts.length; let msg = L.made(name(n), n);\r\n      if (target) { const ok = n === target; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); msg = (ok ? L.yes : L.notTarget(name(target))) + ' ' + msg; }\r\n      out.innerHTML = msg;\r\n    } else out.innerHTML = (target ? L.goal(name(target)) + ' ' : '') + (pts.length ? L.keep(pts.length) : L.start);\r\n  }\r\n  svg.addEventListener('click', e => {\r\n    if (closed) return;\r\n    const p = pt(svg, e), c = Math.round((p.x - X0) / G), r = Math.round((p.y - Y0) / G);\r\n    if (c < 0 || r < 0 || c >= COLS || r >= ROWS) return;\r\n    if (pts.length >= 3 && c === pts[0][0] && r === pts[0][1]) closed = true;\r\n    else if (!pts.some(([a, b]) => a === c && b === r)) pts.push([c, r]);\r\n    draw(); status();\r\n  });\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.k === 'undo') { if (closed) closed = false; else pts.pop(); }\r\n    else if (b.dataset.k === 'clear') { pts = []; closed = false; }\r\n    else if (b.dataset.k === 'goal') { target = shuffle([3, 4, 5, 6])[0]; pts = []; closed = false; }\r\n    else return;\r\n    draw(); status();\r\n  });\r\n  draw(); status();\r\n})(__rev({\"names\":{\"3\":\"triangle\",\"4\":\"quadrilateral\",\"5\":\"pentagon\",\"6\":\"hexagon\"},\"many\":{\"__fn\":\"n => 'polygon with ' + n + ' sides'\"},\"start\":\"Tap a dot to start.\",\"keep\":{\"__fn\":\"n => n + (n === 1 ? ' corner' : ' corners') + ' so far. Tap the yellow dot to close the shape.'\"},\"made\":{\"__fn\":\"(nm, n) => 'You drew a <b>' + nm + '</b>: ' + n + ' straight sides and ' + n + ' vertices.'\"},\"goal\":{\"__fn\":\"nm => 'Draw a <b>' + nm + '</b>.'\"},\"yes\":\"Yes!\",\"notTarget\":{\"__fn\":\"nm => 'That is not a ' + nm + '.'\"}}), document.getElementById('s203')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>On grid paper you can draw every polygon, but not a perfect circle: circles are curved.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "You draw a square on grid paper with sides 3 squares long. How many small squares are inside it?",
     "answer": "9",
     "topic": "Drawing polygons"
    },
    {
     "type": "mc",
     "text": "To draw a triangle on dot paper, you join how many dots?",
     "options": [
      "2",
      "3",
      "4",
      "5"
     ],
     "answer": 1,
     "topic": "Drawing polygons"
    },
    {
     "type": "mc",
     "text": "The sides of a polygon are always…",
     "options": [
      "curved",
      "straight",
      "curved and straight"
     ],
     "answer": 1,
     "topic": "Drawing polygons"
    },
    {
     "type": "input",
     "text": "A rectangle is 4 squares long and 2 squares wide. How many small squares does it cover?",
     "answer": "8",
     "topic": "Drawing polygons"
    },
    {
     "type": "mc",
     "text": "You join 6 dots to make a closed shape. What did you draw?",
     "options": [
      "pentagon",
      "hexagon",
      "triangle",
      "quadrilateral"
     ],
     "answer": 1,
     "topic": "Drawing polygons"
    },
    {
     "type": "input",
     "text": "A shape on grid paper has its corners on 4 dots. How many sides does it have?",
     "answer": "4",
     "topic": "Drawing polygons"
    },
    {
     "type": "mc",
     "text": "Which shape can you NOT draw exactly with straight lines on grid paper?",
     "options": [
      "square",
      "circle",
      "triangle",
      "rectangle"
     ],
     "answer": 1,
     "topic": "Drawing polygons"
    },
    {
     "type": "input",
     "text": "Two squares, each 2 by 2, are drawn side by side to make a rectangle. How many small squares does the rectangle cover?",
     "answer": "8",
     "topic": "Drawing polygons"
    }
   ]
  },
  {
   "id": 204,
   "chapter": 2,
   "name": "3-D objects",
   "fullName": "3-D objects: faces, vertices and nets",
   "lesson": {
    "heading": "3-D objects: faces, vertices and nets",
    "sub": "Chapter 2 · Topic 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/shaker.webp\" srcset=\"/assets/stickers/shaker@2x.webp 2x\" alt=\"\"><p>A <strong>3-D object</strong> is solid: it has length, width and height, and you can pick it up. Its flat sides are called <strong>faces</strong>, and its corners are called <strong>vertices</strong>.</p></div><table class=\"g4-chart\"><tr><th>Object</th><th>Faces</th><th>Vertices</th></tr><tr><td style=\"font-size:18px;text-align:left\">Cube</td><td style=\"font-size:22px;text-align:center\">6</td><td style=\"font-size:22px;text-align:center\">8</td></tr><tr><td style=\"font-size:18px;text-align:left\">Rectangular prism</td><td style=\"font-size:22px;text-align:center\">6</td><td style=\"font-size:22px;text-align:center\">8</td></tr><tr><td style=\"font-size:18px;text-align:left\">Triangular prism</td><td style=\"font-size:22px;text-align:center\">5</td><td style=\"font-size:22px;text-align:center\">6</td></tr><tr><td style=\"font-size:18px;text-align:left\">Square pyramid</td><td style=\"font-size:22px;text-align:center\">5</td><td style=\"font-size:22px;text-align:center\">5</td></tr><tr><td style=\"font-size:18px;text-align:left\">Cylinder</td><td style=\"font-size:22px;text-align:center\">2 flat + 1 curved</td><td style=\"font-size:22px;text-align:center\">0</td></tr><tr><td style=\"font-size:18px;text-align:left\">Sphere</td><td style=\"font-size:22px;text-align:center\">1 curved</td><td style=\"font-size:22px;text-align:center\">0</td></tr></table><div class=\"def-box\"><div class=\"def-box-title\">📖 Nets</div><p>A <strong>net</strong> is a flat shape made of polygons that folds up into a 3-D object. A cube's net is 6 squares joined together.</p></div><div class=\"g4-sim\" id=\"s204\"><h4>🎮 3-D Object Explorer</h4><p class=\"how\">Choose an object. Drag it or use the slider to turn it. The yellow dots are vertices. Tap Show net to see the flat shapes that fold up into it.</p><div class=\"g4-row\" data-k=\"pick\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 300\" data-k=\"svg\" role=\"img\" aria-label=\"3-D\" style=\"touch-action:none;cursor:grab\"></svg></div><div class=\"g4-row\"><input type=\"range\" min=\"0\" max=\"360\" value=\"34\" data-k=\"turn\" style=\"flex:1;min-width:160px;accent-color:#9ed43c\" aria-label=\"Turn the object\"><button class=\"g4-btn ghost\" data-k=\"net\" aria-pressed=\"false\">Show net</button></div><div class=\"g4-out\" data-k=\"info\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const svg = q(root, 'svg'), info = q(root, 'info'), turn = q(root, 'turn');\r\n  const box = (a, b, c) => ({ v: [[-a, -b, -c], [a, -b, -c], [a, b, -c], [-a, b, -c], [-a, -b, c], [a, -b, c], [a, b, c], [-a, b, c]], f: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]] });\r\n  const OBJ = {\r\n    cube: box(1, 1, 1), rprism: box(1.5, 0.8, 0.9),\r\n    tprism: { v: [[-1, -0.8, -1.3], [1, -0.8, -1.3], [0, 0.95, -1.3], [-1, -0.8, 1.3], [1, -0.8, 1.3], [0, 0.95, 1.3]], f: [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]] },\r\n    pyramid: { v: [[-1, -0.8, -1], [1, -0.8, -1], [1, -0.8, 1], [-1, -0.8, 1], [0, 1.15, 0]], f: [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]] },\r\n    cylinder: null, sphere: null\r\n  };\r\n  const KEYS = ['cube', 'rprism', 'tprism', 'pyramid', 'cylinder', 'sphere'];\r\n  let key = 'cube', ang = 0.6, net = false;\r\n  q(root, 'pick').innerHTML = KEYS.map(k => '<button class=\"g4-btn ghost\" data-o=\"' + k + '\">' + L.obj[k].n + '</button>').join('');\r\n  const COL = { 4: [96, 165, 250], 3: [244, 114, 182] };\r\n  function solid() {\r\n    const o = OBJ[key], tilt = 0.45, ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt), st = Math.sin(tilt);\r\n    const P = o.v.map(([x, y, z]) => { const x1 = x * ca + z * sa, z1 = -x * sa + z * ca; const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct; return [x1, y2, z2]; });\r\n    const faces = o.f.map(f => {\r\n      const pts = f.map(i => P[i]), c = pts.reduce((a, p) => [a[0] + p[0] / pts.length, a[1] + p[1] / pts.length, a[2] + p[2] / pts.length], [0, 0, 0]);\r\n      const u = pts[1].map((v, i) => v - pts[0][i]), w = pts[2].map((v, i) => v - pts[0][i]);\r\n      let nrm = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];\r\n      if (nrm[0] * c[0] + nrm[1] * c[1] + nrm[2] * c[2] < 0) nrm = nrm.map(v => -v);\r\n      const len = Math.hypot(...nrm) || 1; return { pts, z: c[2], vis: nrm[2] / len, f };\r\n    }).sort((a, b) => a.z - b.z);\r\n    let h = '';\r\n    faces.forEach(F => {\r\n      const base = COL[F.f.length] || COL[4], light = 0.45 + 0.55 * Math.max(0, F.vis), alpha = F.vis > 0 ? 0.92 : 0.12;\r\n      const d = 'M' + F.pts.map(p => (320 + p[0] * 70).toFixed(1) + ' ' + (150 - p[1] * 70).toFixed(1)).join(' L') + ' Z';\r\n      h += '<path d=\"' + d + '\" fill=\"rgba(' + base.map(c => Math.round(c * light)).join(',') + ',' + alpha + ')\" stroke=\"#e2e8f0\" stroke-width=\"' + (F.vis > 0 ? 2 : 1) + '\" stroke-dasharray=\"' + (F.vis > 0 ? '' : '4 4') + '\"/>';\r\n    });\r\n    P.forEach(p => { h += '<circle cx=\"' + (320 + p[0] * 70) + '\" cy=\"' + (150 - p[1] * 70) + '\" r=\"5\" fill=\"#fde047\" opacity=\"' + (p[2] > -0.2 ? 1 : 0.4) + '\"/>'; });\r\n    return h;\r\n  }\r\n  function round() {\r\n    if (key === 'cylinder') return '<defs><linearGradient id=\"g4cyl\" x1=\"0\" x2=\"1\"><stop offset=\"0\" stop-color=\"#1e3a8a\"/><stop offset=\".45\" stop-color=\"#60a5fa\"/><stop offset=\"1\" stop-color=\"#1e3a8a\"/></linearGradient></defs><rect x=\"250\" y=\"60\" width=\"140\" height=\"170\" fill=\"url(#g4cyl)\"/><ellipse cx=\"320\" cy=\"230\" rx=\"70\" ry=\"20\" fill=\"#1e3a8a\"/><ellipse cx=\"320\" cy=\"60\" rx=\"70\" ry=\"20\" fill=\"#93c5fd\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>';\r\n    return '<defs><radialGradient id=\"g4sph\" cx=\"35%\" cy=\"35%\"><stop offset=\"0\" stop-color=\"#fbcfe8\"/><stop offset=\".6\" stop-color=\"#f472b6\"/><stop offset=\"1\" stop-color=\"#831843\"/></radialGradient></defs><circle cx=\"320\" cy=\"150\" r=\"100\" fill=\"url(#g4sph)\"/>';\r\n  }\r\n  function netSVG() {\r\n    const s = 44, sq = (x, y, w, hh, c) => '<rect x=\"' + x + '\" y=\"' + y + '\" width=\"' + w + '\" height=\"' + hh + '\" fill=\"' + c + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>', tri = (p, c) => '<path d=\"M' + p.map(v => v.join(' ')).join(' L') + ' Z\" fill=\"' + c + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>';\r\n    const B = 'rgba(96,165,250,.55)', P = 'rgba(244,114,182,.55)';\r\n    if (key === 'cube') { const x = 230, y = 30; return sq(x + s, y, s, s, B) + sq(x, y + s, s, s, B) + sq(x + s, y + s, s, s, B) + sq(x + 2 * s, y + s, s, s, B) + sq(x + 3 * s, y + s, s, s, B) + sq(x + s, y + 2 * s, s, s, B); }\r\n    if (key === 'rprism') { const x = 180, y = 30, a = 90, b = 44, c = 50; return sq(x + c, y, a, c, B) + sq(x, y + c, c, b, B) + sq(x + c, y + c, a, b, B) + sq(x + c + a, y + c, c, b, B) + sq(x + 2 * c + a, y + c, a, b, B) + sq(x + c, y + c + b, a, c, B); }\r\n    if (key === 'tprism') { const x = 200, y = 90, w = 60, l = 100; return sq(x, y, w, l, B) + sq(x + w, y, w, l, B) + sq(x + 2 * w, y, w, l, B) + tri([[x + w, y], [x + 2 * w, y], [x + 1.5 * w, y - 52]], P) + tri([[x + w, y + l], [x + 2 * w, y + l], [x + 1.5 * w, y + l + 52]], P); }\r\n    if (key === 'pyramid') { const x = 270, y = 105, w = 90; return sq(x, y, w, w, B) + tri([[x, y], [x + w, y], [x + w / 2, y - 75]], P) + tri([[x, y + w], [x + w, y + w], [x + w / 2, y + w + 75]], P) + tri([[x, y], [x, y + w], [x - 75, y + w / 2]], P) + tri([[x + w, y], [x + w, y + w], [x + w + 75, y + w / 2]], P); }\r\n    if (key === 'cylinder') return sq(200, 100, 240, 100, B) + '<circle cx=\"320\" cy=\"58\" r=\"40\" fill=\"' + P + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/><circle cx=\"320\" cy=\"242\" r=\"40\" fill=\"' + P + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>';\r\n    return '<text x=\"320\" y=\"150\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-size=\"20\">' + L.noNet + '</text>';\r\n  }\r\n  function draw() {\r\n    root.querySelectorAll('[data-o]').forEach(b => b.setAttribute('aria-pressed', b.dataset.o === key));\r\n    q(root, 'net').setAttribute('aria-pressed', net);\r\n    turn.disabled = net || !OBJ[key];\r\n    svg.innerHTML = net ? netSVG() : (OBJ[key] ? solid() : round());\r\n    const o = L.obj[key];\r\n    info.innerHTML = '<b>' + o.n + '</b><br>' + L.faces + ': <b>' + o.f + '</b> (' + o.fs + ')<br>' + L.verts + ': <b>' + o.v + '</b><br>' + o.t;\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.o) { key = b.dataset.o; draw(); } else if (b.dataset.k === 'net') { net = !net; draw(); }\r\n  });\r\n  turn.addEventListener('input', () => { ang = turn.value / 180 * Math.PI; draw(); });\r\n  let drag = null;\r\n  svg.addEventListener('pointerdown', e => { if (!net && OBJ[key]) { drag = e.clientX; svg.setPointerCapture(e.pointerId); } });\r\n  svg.addEventListener('pointermove', e => { if (drag == null) return; ang += (e.clientX - drag) / 90; drag = e.clientX; turn.value = ((ang * 180 / Math.PI) % 360 + 360) % 360; draw(); });\r\n  svg.addEventListener('pointerup', () => { drag = null; });\r\n  draw();\r\n})(__rev({\"faces\":\"Faces\",\"verts\":\"Vertices\",\"noNet\":\"A sphere has no flat net.\",\"obj\":{\"cube\":{\"n\":\"Cube\",\"f\":6,\"fs\":\"6 squares\",\"v\":8,\"t\":\"Like a dice. All its faces are the same size.\"},\"rprism\":{\"n\":\"Rectangular prism\",\"f\":6,\"fs\":\"rectangles\",\"v\":8,\"t\":\"Like a box of cereal or a brick.\"},\"tprism\":{\"n\":\"Triangular prism\",\"f\":5,\"fs\":\"2 triangles and 3 rectangles\",\"v\":6,\"t\":\"Like a tent or a wedge of cheese.\"},\"pyramid\":{\"n\":\"Square pyramid\",\"f\":5,\"fs\":\"1 square and 4 triangles\",\"v\":5,\"t\":\"Like the pyramids in Egypt. The triangles meet at the top.\"},\"cylinder\":{\"n\":\"Cylinder\",\"f\":3,\"fs\":\"2 flat circles and 1 curved surface\",\"v\":0,\"t\":\"Like a tin of beans. It can roll.\"},\"sphere\":{\"n\":\"Sphere\",\"f\":1,\"fs\":\"1 curved surface\",\"v\":0,\"t\":\"Like a ball. It rolls in every direction.\"}}}), document.getElementById('s204')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Make a model: copy a cube net onto cardboard, add small flaps for glue, cut it out and fold it up.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "How many faces does a cube have?",
     "answer": "6",
     "topic": "3-D objects"
    },
    {
     "type": "mc",
     "text": "What shape are the faces of a cube?",
     "options": [
      "triangles",
      "squares",
      "circles",
      "pentagons"
     ],
     "answer": 1,
     "topic": "3-D objects"
    },
    {
     "type": "input",
     "text": "How many vertices does a cube have?",
     "answer": "8",
     "topic": "3-D objects"
    },
    {
     "type": "mc",
     "text": "Which object can roll?",
     "options": [
      "cube",
      "sphere",
      "square pyramid",
      "rectangular prism"
     ],
     "answer": 1,
     "topic": "3-D objects"
    },
    {
     "type": "input",
     "text": "How many faces does a triangular prism have?",
     "answer": "5",
     "topic": "3-D objects"
    },
    {
     "type": "mc",
     "text": "A tin of beans is shaped like a…",
     "options": [
      "cylinder",
      "sphere",
      "cube",
      "pyramid"
     ],
     "answer": 0,
     "topic": "3-D objects"
    },
    {
     "type": "input",
     "text": "How many vertices does a square pyramid have?",
     "answer": "5",
     "topic": "3-D objects"
    },
    {
     "type": "mc",
     "text": "A box of cereal is shaped like a…",
     "options": [
      "rectangular prism",
      "triangular prism",
      "cylinder",
      "sphere"
     ],
     "answer": 0,
     "topic": "3-D objects"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 2,
  "chapterName": "2-D Shapes and 3-D Objects",
  "topics": [
   {
    "name": "2-D shapes",
    "questions": [
     {
      "num": "1",
      "text": "Draw and name:",
      "parts": [
       {
        "label": "a)",
        "text": "a shape with only straight sides",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "a shape with only curved sides",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "a shape with straight and curved sides",
        "marks": 2
       }
      ]
     },
     {
      "num": "2",
      "text": "Name the shape of each object: a clock, a door, a YIELD sign.",
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
    "name": "Polygons",
    "questions": [
     {
      "num": "3",
      "text": "Copy and complete the table: name, number of sides and number of vertices for a triangle, a quadrilateral, a pentagon and a hexagon.",
      "parts": [
       {
        "label": "",
        "text": "",
        "marks": 8
       }
      ]
     },
     {
      "num": "4",
      "text": "Is a circle a polygon? Explain your answer.",
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
    "name": "Drawing polygons",
    "questions": [
     {
      "num": "5",
      "text": "On grid paper, use a ruler to draw:",
      "parts": [
       {
        "label": "a)",
        "text": "a rectangle 5 squares long and 3 squares wide",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "a triangle",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "a pentagon",
        "marks": 2
       },
       {
        "label": "d)",
        "text": "a hexagon",
        "marks": 2
       }
      ]
     },
     {
      "num": "6",
      "text": "How many small squares does your rectangle in a) cover?",
      "parts": [
       {
        "label": "",
        "text": "",
        "marks": 1
       }
      ]
     }
    ]
   },
   {
    "name": "3-D objects",
    "questions": [
     {
      "num": "7",
      "text": "Copy and complete the table: name, number of faces, shape of the faces and number of vertices for a cube, a rectangular prism, a triangular prism and a square pyramid.",
      "parts": [
       {
        "label": "",
        "text": "",
        "marks": 8
       }
      ]
     },
     {
      "num": "8",
      "text": "Draw a net of a cube. Cut it out of paper and fold it up to check.",
      "parts": [
       {
        "label": "",
        "text": "",
        "marks": 4
       }
      ]
     }
    ]
   }
  ]
 },
 "answerKey": {
  "chapter": 2,
  "chapterName": "Chapter 2 — 2-D Shapes and 3-D Objects",
  "topics": [
   {
    "name": "2-D shapes",
    "answers": [
     {
      "num": "Q1a",
      "ans": "e.g. square, triangle, rectangle",
      "note": "Any polygon"
     },
     {
      "num": "Q1b",
      "ans": "e.g. circle, oval",
      "note": ""
     },
     {
      "num": "Q1c",
      "ans": "e.g. semicircle, quarter circle, arch",
      "note": ""
     },
     {
      "num": "Q2",
      "ans": "circle; rectangle; triangle",
      "note": ""
     }
    ]
   },
   {
    "name": "Polygons",
    "answers": [
     {
      "num": "Q3",
      "ans": "3/3, 4/4, 5/5, 6/6",
      "note": "Sides = vertices for every polygon"
     },
     {
      "num": "Q4",
      "ans": "No: a polygon has only straight sides, and a circle is curved.",
      "note": ""
     }
    ]
   },
   {
    "name": "Drawing polygons",
    "answers": [
     {
      "num": "Q5a",
      "ans": "5 × 3 rectangle",
      "note": "Check the lengths"
     },
     {
      "num": "Q5b",
      "ans": "Any 3-sided closed shape",
      "note": ""
     },
     {
      "num": "Q5c",
      "ans": "Any 5-sided closed shape",
      "note": ""
     },
     {
      "num": "Q5d",
      "ans": "Any 6-sided closed shape",
      "note": ""
     },
     {
      "num": "Q6",
      "ans": "15 small squares",
      "note": "3 rows of 5"
     }
    ]
   },
   {
    "name": "3-D objects",
    "answers": [
     {
      "num": "Q7",
      "ans": "Cube 6 squares, 8; rectangular prism 6 rectangles, 8; triangular prism 2 triangles + 3 rectangles, 6; square pyramid 1 square + 4 triangles, 5",
      "note": ""
     },
     {
      "num": "Q8",
      "ans": "Any 6 squares that fold into a cube, e.g. a cross shape",
      "note": ""
     }
    ]
   }
  ]
 }
});
