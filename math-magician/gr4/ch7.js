// Math Magician — Grade 4, Chapter 7 (Perimeter, Area, Capacity and Volume)
// Generated from one bilingual source (scripts/math-gr4/gen_ch7.js); edit both languages there.
MathMagician.registerChapter(7, {
 "topics": [
  {
   "id": 701,
   "chapter": 7,
   "name": "Perimeter",
   "fullName": "Perimeter of polygons",
   "lesson": {
    "heading": "Perimeter of polygons",
    "sub": "Chapter 7 · Topic 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/ant.webp\" srcset=\"/assets/stickers/ant@2x.webp 2x\" alt=\"\"><p>The <strong>perimeter</strong> is the distance all the way around the outside of a shape. Imagine an ant walking along every side until it is back where it started.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Perimeter</div><p>Add the lengths of <strong>all</strong> the sides. Perimeter is a length, so we measure it in mm, cm, m or km.</p></div><svg viewBox=\"0 0 372 260\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,210.0 66.0,210.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"315.0\" y=\"136.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">4 cm</text></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Worked examples</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>The rectangle above is 6 cm long and 4 cm wide. Perimeter = 6 + 4 + 6 + 4 = <strong>20 cm</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>A triangle has sides of 5 cm, 7 cm and 8 cm. Perimeter = 5 + 7 + 8 = <strong>20 cm</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>A square has sides of 9 m. Perimeter = 9 + 9 + 9 + 9 = 4 × 9 = <strong>36 m</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s701\"><h4>🎮 Walk the Fence</h4><p class=\"how\">Tap each side of the shape to walk along it. It turns green and is added to your sum. Then type the perimeter.</p><div class=\"g4-stage\"><svg viewBox=\"0 0 540 340\" data-k=\"svg\" role=\"img\" aria-label=\"shape\"></svg></div><div class=\"g4-big\" data-k=\"run\" style=\"font-size:22px\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"perimeter\"><span style=\"font-size:20px\">cm</span><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd, num } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out'), run = q(root, 'run'), inp = q(root, 'ans');\n  const U = 50, M = 40, MX = 66;\n  let pts = [], lens = [], done = [];\n  function shape() {\n    if (rnd(0, 2) === 0) { const w = rnd(3, 9), h = rnd(2, 5); return [[0, 0], [w, 0], [w, h], [0, h]]; }\n    const W = rnd(5, 9), H = rnd(5, 7), a = rnd(2, W - 2), b = rnd(2, H - 2);\n    return rnd(0, 1) ? [[0, 0], [W, 0], [W, H - b], [W - a, H - b], [W - a, H], [0, H]] : [[0, 0], [W - a, 0], [W - a, b], [W, b], [W, H], [0, H]];\n  }\n  const total = () => lens.reduce((s, x) => s + x, 0);\n  function draw() {\n    const mx = Math.max(...pts.map(p => p[0])), my = Math.max(...pts.map(p => p[1]));\n    svg.setAttribute('viewBox', '0 0 ' + (mx * U + 2 * MX) + ' ' + (my * U + 2 * M));\n    let h = '';\n    for (let x = 0; x <= mx; x++) h += '<line x1=\"' + (MX + x * U) + '\" y1=\"' + M + '\" x2=\"' + (MX + x * U) + '\" y2=\"' + (M + my * U) + '\" stroke=\"rgba(255,255,255,.07)\"/>';\n    for (let y = 0; y <= my; y++) h += '<line x1=\"' + MX + '\" y1=\"' + (M + y * U) + '\" x2=\"' + (MX + mx * U) + '\" y2=\"' + (M + y * U) + '\" stroke=\"rgba(255,255,255,.07)\"/>';\n    h += '<polygon points=\"' + pts.map(p => (MX + p[0] * U) + ',' + (M + p[1] * U)).join(' ') + '\" fill=\"rgba(96,165,250,.14)\"/>';\n    pts.forEach((p, i) => {\n      const r = pts[(i + 1) % pts.length], x1 = MX + p[0] * U, y1 = M + p[1] * U, x2 = MX + r[0] * U, y2 = M + r[1] * U;\n      const dx = r[0] - p[0], dy = r[1] - p[1], len = Math.abs(dx) + Math.abs(dy), nx = dy / len, ny = -dx / len;\n      const col = done[i] ? '#4ade80' : '#60a5fa';\n      h += '<g data-s=\"' + i + '\" style=\"cursor:pointer\"><line x1=\"' + x1 + '\" y1=\"' + y1 + '\" x2=\"' + x2 + '\" y2=\"' + y2 + '\" stroke=\"transparent\" stroke-width=\"34\"/>' +\n        '<line x1=\"' + x1 + '\" y1=\"' + y1 + '\" x2=\"' + x2 + '\" y2=\"' + y2 + '\" stroke=\"' + col + '\" stroke-width=\"' + (done[i] ? 9 : 6) + '\" stroke-linecap=\"round\"/>' +\n        '<text x=\"' + ((x1 + x2) / 2 + nx * 24) + '\" y=\"' + ((y1 + y2) / 2 + ny * 24 + 8) + '\" text-anchor=\"middle\" fill=\"' + (done[i] ? '#4ade80' : '#fff') + '\" font-size=\"22\" font-weight=\"900\">' + len + ' ' + L.unit + '</text></g>';\n    });\n    svg.innerHTML = h;\n    const walked = lens.filter((_, i) => done[i]);\n    run.textContent = walked.length ? walked.join(' + ') + ' = ' + walked.reduce((s, x) => s + x, 0) + ' ' + L.unit : L.tapSides;\n  }\n  function fresh() {\n    pts = shape(); lens = pts.map((p, i) => { const r = pts[(i + 1) % pts.length]; return Math.abs(r[0] - p[0]) + Math.abs(r[1] - p[1]); });\n    done = pts.map(() => false); inp.value = ''; out.className = 'g4-out'; out.innerHTML = L.ask(pts.length); draw();\n  }\n  function check() {\n    const v = num(inp.value); if (v == null) return;\n    const left = done.filter(d => !d).length, P = total();\n    if (v === P) { out.className = 'g4-out good'; out.innerHTML = L.yes(lens.join(' + '), P); done = done.map(() => true); draw(); return; }\n    out.className = 'g4-out bad';\n    out.innerHTML = left ? L.missed(left) : L.sum(v, P > v);\n  }\n  root.addEventListener('click', e => {\n    const s = e.target.closest('[data-s]');\n    if (s) { const i = +s.dataset.s; done[i] = !done[i]; draw(); return; }\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.k === 'check') check(); else if (t.dataset.k === 'new') fresh();\n  });\n  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });\n  fresh();\n})(__rev({\"unit\":\"cm\",\"tapSides\":\"Tap each side as you walk around.\",\"ask\":{\"__fn\":\"n => 'This shape has ' + n + ' sides. Tap each side to walk around it, then type the perimeter.'\"},\"yes\":{\"__fn\":\"(s, P) => 'Correct! ' + s + ' = <b>' + P + ' cm</b>. You walked all the way around.'\"},\"missed\":{\"__fn\":\"n => 'Not yet. You have not walked along ' + (n === 1 ? '1 side' : n + ' sides') + ' yet. The perimeter goes all the way around, so tap every side.'\"},\"sum\":{\"__fn\":\"(v, more) => 'All the sides are counted, but ' + v + ' cm is not the total. Add the green numbers again: your answer is too ' + (more ? 'small' : 'big') + '.'\"}}), document.getElementById('g4-s701')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>When you measure with a ruler or a measuring tape, write down each side and tick it off. Then you will not count a side twice or forget one.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "What is the perimeter of this rectangle (in cm)?<svg viewBox=\"0 0 372 203\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,152.9 66.0,152.9\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">7 cm</text><text x=\"315.0\" y=\"107.4\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text></svg>",
     "answer": "20",
     "topic": "Perimeter"
    },
    {
     "type": "input",
     "text": "What is the perimeter of this triangle (in cm)?<svg viewBox=\"0 0 372 212\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"206.6,50.0 306.0,162.4 66.0,162.4\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"263.1\" y=\"106.2\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">5 cm</text><text x=\"186.0\" y=\"190.4\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">8 cm</text><text x=\"122.6\" y=\"95.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text></svg>",
     "answer": "19",
     "topic": "Perimeter"
    },
    {
     "type": "input",
     "text": "A square has sides of 9 cm. What is its perimeter (in cm)?<svg viewBox=\"0 0 312 280\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 246.0,50.0 246.0,230.0 66.0,230.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"156.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">9 cm</text><text x=\"255.0\" y=\"146.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">9 cm</text></svg>",
     "answer": "36",
     "topic": "Perimeter"
    },
    {
     "type": "mc",
     "text": "What is the perimeter of a shape?",
     "options": [
      "the distance all the way around it",
      "the space inside it",
      "the number of corners it has",
      "the length of one side"
     ],
     "answer": 0,
     "topic": "Perimeter"
    },
    {
     "type": "input",
     "text": "What is the perimeter of this shape (in cm)?<svg viewBox=\"0 0 372 280\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,140.0 156.0,140.0 156.0,230.0 66.0,230.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">8 cm</text><text x=\"315.0\" y=\"101.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text><text x=\"231.0\" y=\"168.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">5 cm</text><text x=\"165.0\" y=\"191.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text><text x=\"111.0\" y=\"258.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text><text x=\"57.0\" y=\"146.0\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text></svg>",
     "answer": "28",
     "topic": "Perimeter"
    },
    {
     "type": "input",
     "text": "Each side of this pentagon is 6 cm. What is its perimeter (in cm)?<svg viewBox=\"0 0 321 280\" style=\"display:block;width:100%;max-width:230px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"160.6,50.0 255.3,118.8 219.1,230.0 102.1,230.0 66.0,118.8\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"220.9\" y=\"72.6\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"245.7\" y=\"183.2\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"160.6\" y=\"258.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"75.5\" y=\"183.2\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"100.4\" y=\"72.6\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text></svg>",
     "answer": "30",
     "topic": "Perimeter"
    },
    {
     "type": "input",
     "text": "A rectangular garden is 12 m long and 8 m wide. How many metres of fencing go all the way around it?<svg viewBox=\"0 0 372 260\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,210.0 66.0,210.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">12 m</text><text x=\"315.0\" y=\"136.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">8 m</text></svg>",
     "answer": "40",
     "topic": "Perimeter"
    },
    {
     "type": "input",
     "text": "This rectangle has a perimeter of 24 cm. It is 8 cm long. How wide is it (in cm)?<svg viewBox=\"0 0 372 220\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,170.0 66.0,170.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">8 cm</text><text x=\"315.0\" y=\"116.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">?</text></svg>",
     "answer": "4",
     "topic": "Perimeter"
    }
   ]
  },
  {
   "id": 702,
   "chapter": 7,
   "name": "Area",
   "fullName": "Area: square grids and tiling",
   "lesson": {
    "heading": "Area: square grids and tiling",
    "sub": "Chapter 7 · Topic 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/paper.webp\" srcset=\"/assets/stickers/paper@2x.webp 2x\" alt=\"\"><p>The <strong>area</strong> of a shape is how much flat space it covers. We measure it by counting how many equal squares fit inside it, with no gaps and no overlaps.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Square units</div><p>Each small square is <strong>1 square unit</strong>. If each square is 1 cm long and 1 cm wide, it is <strong>1 square centimetre (1 cm²)</strong>.</p></div><svg viewBox=\"0 0 156 96\" style=\"display:block;width:100%;max-width:170px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Find the area</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>The rectangle above is covered by 3 rows of 5 squares.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Count in rows: 5 + 5 + 5 = 15, or 3 × 5 = 15.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>The area is <strong>15 square units</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s702\"><h4>🎮 Square Grid</h4><p class=\"how\">Count: number the squares inside a shape. Build: colour squares to make a shape with the area you are given.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-m=\"count\" aria-pressed=\"true\">Count</button><button class=\"g4-btn ghost\" data-m=\"build\" aria-pressed=\"false\">Build</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 492 300\" data-k=\"svg\" role=\"img\" aria-label=\"square grid\"></svg></div><div class=\"g4-big\" data-k=\"live\" style=\"font-size:20px\"></div><div class=\"g4-row\" data-k=\"countRow\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"area\"><span style=\"font-size:18px\">square units</span></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd, num } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'ans'), row = q(root, 'countRow'), live = q(root, 'live');\n  const C = 10, R = 6, U = 48, M = 6;\n  let mode = 'count', shape = new Set(), marks = [], built = new Set(), target = 0;\n  const key = (x, y) => x + ',' + y;\n  function makeShape() {\n    const s = new Set(), w = rnd(2, 5), h = rnd(2, 4), x0 = rnd(0, 2), y0 = rnd(0, 1);\n    for (let x = x0; x < x0 + w; x++) for (let y = y0; y < y0 + h; y++) s.add(key(x, y));\n    const w2 = rnd(1, 3), h2 = rnd(1, 3), x1 = x0 + w, y1 = y0 + rnd(0, h - 1);\n    for (let x = x1; x < Math.min(C, x1 + w2); x++) for (let y = y1; y < Math.min(R, y1 + h2); y++) s.add(key(x, y));\n    return s;\n  }\n  function draw() {\n    svg.setAttribute('viewBox', '0 0 ' + (C * U + 2 * M) + ' ' + (R * U + 2 * M));\n    let h = '';\n    for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) {\n      const k = key(x, y), inS = mode === 'count' ? shape.has(k) : built.has(k), mi = marks.indexOf(k);\n      const fill = mode === 'count' ? (mi >= 0 ? 'rgba(74,222,128,.45)' : inS ? 'rgba(96,165,250,.38)' : 'transparent') : (inS ? 'rgba(74,222,128,.5)' : 'transparent');\n      h += '<rect data-c=\"' + k + '\" x=\"' + (M + x * U) + '\" y=\"' + (M + y * U) + '\" width=\"' + U + '\" height=\"' + U + '\" fill=\"' + fill + '\" stroke=\"rgba(255,255,255,.22)\" stroke-width=\"1.5\" style=\"cursor:pointer\"/>';\n      if (mi >= 0) h += '<text x=\"' + (M + x * U + U / 2) + '\" y=\"' + (M + y * U + U / 2 + 8) + '\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"22\" font-weight=\"900\" pointer-events=\"none\">' + (mi + 1) + '</text>';\n    }\n    svg.innerHTML = h;\n    live.textContent = mode === 'count' ? L.counted(marks.length) : L.have(built.size, target);\n  }\n  function fresh() {\n    out.className = 'g4-out'; inp.value = ''; marks = []; built = new Set();\n    if (mode === 'count') { shape = makeShape(); row.style.display = ''; out.innerHTML = L.askCount; }\n    else { target = rnd(6, 18); row.style.display = 'none'; out.innerHTML = L.askBuild(target); }\n    draw();\n  }\n  function check() {\n    if (mode === 'count') {\n      const v = num(inp.value); if (v == null) return; const n = shape.size;\n      out.className = 'g4-out ' + (v === n ? 'good' : 'bad');\n      out.innerHTML = v === n ? L.yesCount(n) : L.noCount(v, n > v);\n    } else {\n      const n = built.size, ok = n === target;\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad');\n      out.innerHTML = ok ? L.yesBuild(n) : L.noBuild(n, target);\n    }\n  }\n  root.addEventListener('click', e => {\n    const c = e.target.closest('[data-c]');\n    if (c) {\n      const k = c.dataset.c;\n      if (mode === 'count') { if (!shape.has(k)) return; const i = marks.indexOf(k); if (i >= 0) marks.splice(i, 1); else marks.push(k); }\n      else if (built.has(k)) built.delete(k); else built.add(k);\n      draw(); return;\n    }\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.m) { mode = t.dataset.m; root.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-pressed', String(b === t))); fresh(); }\n    else if (t.dataset.k === 'check') check();\n    else if (t.dataset.k === 'new') fresh();\n  });\n  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });\n  fresh();\n})(__rev({\"counted\":{\"__fn\":\"n => 'Squares counted: ' + n\"},\"have\":{\"__fn\":\"(n, t) => 'Squares coloured: ' + n + ' (target: ' + t + ')'\"},\"askCount\":\"Count the blue squares. Tap each one to number it, then type the area.\",\"askBuild\":{\"__fn\":\"t => 'Tap squares to make any shape with an area of <b>' + t + ' square units</b>. Tap a square again to remove it.'\"},\"yesCount\":{\"__fn\":\"n => 'Correct! The shape covers <b>' + n + ' squares</b>, so its area is ' + n + ' square units.'\"},\"noCount\":{\"__fn\":\"(v, more) => 'Not quite. ' + v + ' is too ' + (more ? 'few' : 'many') + '. Tap each blue square so that you count every square once.'\"},\"yesBuild\":{\"__fn\":\"n => 'Well done! Your shape covers ' + n + ' squares: an area of <b>' + n + ' square units</b>. Shapes can look different and still have the same area.'\"},\"noBuild\":{\"__fn\":\"(n, t) => 'Your shape covers ' + n + (n === 1 ? ' square' : ' squares') + ', but you need ' + t + '. ' + (n < t ? 'Add ' + (t - n) + ' more.' : 'Take away ' + (n - t) + '.')\"}}), document.getElementById('g4-s702')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Perimeter goes <em>around</em> a shape and is a length. Area covers the <em>inside</em> and is in square units. Two shapes can have the same area but different perimeters!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "What is the area of the shaded shape (in square units)?<svg viewBox=\"0 0 126 96\" style=\"display:block;width:100%;max-width:136px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "12",
     "topic": "Area"
    },
    {
     "type": "input",
     "text": "What is the area of the shaded shape (in square units)?<svg viewBox=\"0 0 186 126\" style=\"display:block;width:100%;max-width:204px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"33\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "20",
     "topic": "Area"
    },
    {
     "type": "input",
     "text": "What is the area of the shaded shape (in square units)?<svg viewBox=\"0 0 186 66\" style=\"display:block;width:100%;max-width:204px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "12",
     "topic": "Area"
    },
    {
     "type": "mc",
     "text": "Which unit do we use for the area of a page?",
     "options": [
      "cm²",
      "cm",
      "kg",
      "ml"
     ],
     "answer": 0,
     "topic": "Area"
    },
    {
     "type": "mc",
     "text": "Which shape has the bigger area?<div style=\"display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:flex-end\"><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"0 0 126 96\" style=\"display:block;width:100%;max-width:130px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>A</div><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"0 0 156 66\" style=\"display:block;width:100%;max-width:160px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>B</div></div>",
     "options": [
      "A",
      "B",
      "They are the same"
     ],
     "answer": 0,
     "topic": "Area"
    },
    {
     "type": "input",
     "text": "A floor is tiled with square tiles: 6 tiles along one side and 4 tiles along the other. How many tiles cover the floor?<svg viewBox=\"0 0 186 126\" style=\"display:block;width:100%;max-width:204px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "24",
     "topic": "Area"
    },
    {
     "type": "input",
     "text": "What is the area of this staircase shape (in square units)?<svg viewBox=\"0 0 126 126\" style=\"display:block;width:100%;max-width:136px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "10",
     "topic": "Area"
    },
    {
     "type": "mc",
     "text": "Shape A is a rectangle 8 squares long and 1 square wide. Shape B is 4 squares long and 2 squares wide. Which is true?<div style=\"display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:flex-end\"><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"0 0 246 36\" style=\"display:block;width:100%;max-width:200px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"183\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"213\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>A</div><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"0 0 126 66\" style=\"display:block;width:100%;max-width:110px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>B</div></div>",
     "options": [
      "Same area, different perimeters",
      "Same perimeter, different areas",
      "Same area and same perimeter",
      "Different area and different perimeter"
     ],
     "answer": 0,
     "topic": "Area"
    }
   ]
  },
  {
   "id": 703,
   "chapter": 7,
   "name": "Capacity",
   "fullName": "Capacity: filling 3-D objects",
   "lesson": {
    "heading": "Capacity: filling 3-D objects",
    "sub": "Chapter 7 · Topic 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/kettle.webp\" srcset=\"/assets/stickers/kettle@2x.webp 2x\" alt=\"\"><p>The <strong>capacity</strong> of a container is how much it can hold when it is full. We find it by filling the container with water, sand or rice and measuring how much went in.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Units of capacity</div><p><strong>Millilitres (ml)</strong> for small amounts, like a teaspoon (5 ml) or a cup (250 ml). <strong>Litres (l)</strong> for bigger amounts. <strong>1 l = 1 000 ml</strong>.</p></div><svg viewBox=\"0 0 258 96\" style=\"display:block;width:100%;max-width:200px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"6\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"68\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"130\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"192\" y=\"4\" width=\"62\" height=\"62\"/><text x=\"129.0\" y=\"90.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">4 × 250 ml = 1 000 ml</text></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Fill and measure</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>A jug is filled with cups of water. It takes 4 cups of 250 ml.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>250 + 250 + 250 + 250 = 1 000 ml, or 4 × 250 ml = 1 000 ml.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>The capacity of the jug is <strong>1 000 ml = 1 l</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s703\"><h4>🎮 Fill It Up</h4><p class=\"how\">Estimate how many cups fill the container. Then pour one cup at a time and see how close you were.</p><div class=\"g4-big\" data-k=\"name\" style=\"font-size:22px\"></div><div class=\"g4-stage\"><svg viewBox=\"0 6 450 296\" data-k=\"svg\" role=\"img\" aria-label=\"container\"></svg></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"guess\" inputmode=\"numeric\" aria-label=\"guess\"><span style=\"font-size:18px\">cups</span><button class=\"g4-btn\" data-k=\"pour\">Pour</button><button class=\"g4-btn ghost\" data-k=\"empty\">Empty</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd, num, fmt } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'guess'), nameEl = q(root, 'name');\n  const CUP = 250;\n  let c = null, cups = 0, guess = null, last = -1;\n  function draw() {\n    const n = c.cap / CUP, top = 16, bot = 286, hgt = bot - top, x = 168, w = 150, lvl = Math.min(1, cups / n);\n    let h = '<image href=\"/assets/stickers/' + c.s + '.webp\" x=\"-6\" y=\"70\" width=\"176\" height=\"176\"/>';\n    h += '<image href=\"/assets/stickers/ceramic-mug.webp\" x=\"322\" y=\"150\" width=\"128\" height=\"128\"/><text x=\"386\" y=\"292\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-size=\"22\" font-weight=\"800\">250 ml</text>';\n    h += '<rect x=\"' + x + '\" y=\"' + (bot - hgt * lvl) + '\" width=\"' + w + '\" height=\"' + (hgt * lvl) + '\" fill=\"rgba(56,189,248,.55)\"/>';\n    for (let i = 1; i < n; i++) { const y = bot - hgt * i / n; h += '<line x1=\"' + x + '\" y1=\"' + y + '\" x2=\"' + (x + 18) + '\" y2=\"' + y + '\" stroke=\"rgba(255,255,255,.45)\" stroke-width=\"2\"/>'; }\n    h += '<path d=\"M' + x + ' ' + top + ' V' + bot + ' H' + (x + w) + ' V' + top + '\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"5\" stroke-linejoin=\"round\"/>';\n    h += '<text x=\"' + (x + w / 2) + '\" y=\"' + (bot - hgt * lvl / 2 + 10) + '\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"26\" font-weight=\"900\">' + (cups ? cups + ' × 250' : '') + '</text>';\n    svg.innerHTML = h;\n  }\n  function fresh() {\n    let i; do { i = rnd(0, L.cont.length - 1); } while (i === last); last = i;\n    c = L.cont[i]; cups = 0; guess = null; inp.value = ''; inp.disabled = false;\n    nameEl.textContent = L.title(c.n); out.className = 'g4-out'; out.innerHTML = L.ask(c.n); draw();\n  }\n  function pour() {\n    if (guess == null) { const g = num(inp.value); if (g == null || g < 1) { out.className = 'g4-out bad'; out.innerHTML = L.guessFirst; return; } guess = g; inp.disabled = true; }\n    const n = c.cap / CUP;\n    if (cups >= n) { out.className = 'g4-out bad'; out.innerHTML = L.over; return; }\n    cups++; draw();\n    if (cups < n) { out.className = 'g4-out'; out.innerHTML = L.poured(cups, fmt(cups * CUP)); return; }\n    out.className = 'g4-out good'; out.innerHTML = L.full(cups, fmt(c.cap), guess, c.cap >= 1000 && c.cap % 1000 === 0 ? c.cap / 1000 : 0);\n  }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.k === 'pour') pour();\n    else if (t.dataset.k === 'empty') { cups = 0; guess = null; inp.disabled = false; out.className = 'g4-out'; out.innerHTML = L.ask(c.n); draw(); }\n    else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"cont\":[{\"n\":\"kettle\",\"s\":\"kettle\",\"cap\":1500},{\"n\":\"jar\",\"s\":\"glass-jar\",\"cap\":750},{\"n\":\"bottle\",\"s\":\"plastic-bottle\",\"cap\":2000},{\"n\":\"juice box\",\"s\":\"juice-box\",\"cap\":500},{\"n\":\"milk carton\",\"s\":\"milk\",\"cap\":1000}],\"title\":{\"__fn\":\"n => 'Fill the ' + n\"},\"ask\":{\"__fn\":\"n => 'How many cups of 250 ml will fill the ' + n + '? Type your guess, then tap Pour.'\"},\"guessFirst\":\"Type your guess first: how many cups?\",\"poured\":{\"__fn\":\"(k, ml) => k + (k === 1 ? ' cup' : ' cups') + ' poured: ' + ml + ' ml so far. Keep pouring!'\"},\"full\":{\"__fn\":\"(k, ml, g, l) => 'Full! It took <b>' + k + ' cups</b>: ' + k + ' × 250 ml = <b>' + ml + ' ml</b>' + (l ? ' = ' + l + ' l' : '') + '. ' + (g === k ? 'Your guess was spot on!' : 'You guessed ' + g + ', which is ' + Math.abs(g - k) + ' too ' + (g < k ? 'few' : 'many') + '.')\"},\"over\":\"It is already full! More water would spill over. Tap Empty or New one.\"}), document.getElementById('g4-s703')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Estimate first, then fill and measure. Was your estimate close? A tall container does not always hold more than a short, wide one!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "A bottle is filled with 6 cups of 250 ml. What is its capacity (in ml)?<svg viewBox=\"0 0 382 96\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"6\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"68\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"130\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"192\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"254\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"316\" y=\"4\" width=\"62\" height=\"62\"/><text x=\"191.0\" y=\"90.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">6 × 250 ml</text></svg>",
     "answer": "1 500",
     "topic": "Capacity"
    },
    {
     "type": "mc",
     "text": "Which of these holds about 1 litre?",
     "options": [
      "a carton of milk",
      "a teaspoon",
      "a bath",
      "an egg cup"
     ],
     "answer": 0,
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "1 l = ? ml",
     "answer": "1 000",
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "How much water is in this measuring jug (in ml)?<svg viewBox=\"0 0 230 246\" style=\"display:block;width:100%;max-width:200px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"70\" y=\"94\" width=\"110\" height=\"120\" fill=\"rgba(56,189,248,.55)\"/><line x1=\"70\" y1=\"194\" x2=\"88\" y2=\"194\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"174\" x2=\"88\" y2=\"174\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"179\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">200</text><line x1=\"70\" y1=\"154\" x2=\"88\" y2=\"154\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"134\" x2=\"88\" y2=\"134\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"139\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">400</text><line x1=\"70\" y1=\"114\" x2=\"104\" y2=\"114\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"119\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">500</text><line x1=\"70\" y1=\"94\" x2=\"88\" y2=\"94\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"99\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">600</text><line x1=\"70\" y1=\"74\" x2=\"88\" y2=\"74\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"54\" x2=\"88\" y2=\"54\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"59\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">800</text><line x1=\"70\" y1=\"34\" x2=\"88\" y2=\"34\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"14\" x2=\"104\" y2=\"14\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"19\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1000</text><path d=\"M70 8 V214 H180 V8 M180 34 q34 10 0 70\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linejoin=\"round\"/><text x=\"125.0\" y=\"238.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"15\" font-weight=\"800\" font-family=\"sans-serif\">ml</text></svg>",
     "answer": "600",
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "A bucket holds 5 l. How many millilitres is that?",
     "answer": "5 000",
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "A mug holds 250 ml. How many mugs of water fill a 2 l jug?<svg viewBox=\"0 0 72 96\" style=\"display:block;width:100%;max-width:50px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"6\" y=\"4\" width=\"62\" height=\"62\"/><text x=\"36.0\" y=\"90.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">250 ml</text></svg>",
     "answer": "8",
     "topic": "Capacity"
    },
    {
     "type": "input",
     "text": "A kettle holds 1 500 ml. It has 900 ml of water in it now. How much more water fills it (in ml)?<svg viewBox=\"0 0 230 246\" style=\"display:block;width:100%;max-width:200px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"70\" y=\"94\" width=\"110\" height=\"120\" fill=\"rgba(56,189,248,.55)\"/><line x1=\"70\" y1=\"200.66666666666666\" x2=\"88\" y2=\"200.66666666666666\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"187.33333333333334\" x2=\"88\" y2=\"187.33333333333334\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"192.33333333333334\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">200</text><line x1=\"70\" y1=\"174\" x2=\"88\" y2=\"174\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"160.66666666666666\" x2=\"88\" y2=\"160.66666666666666\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"165.66666666666666\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">400</text><line x1=\"70\" y1=\"147.33333333333331\" x2=\"104\" y2=\"147.33333333333331\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"152.33333333333331\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">500</text><line x1=\"70\" y1=\"134\" x2=\"88\" y2=\"134\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"139\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">600</text><line x1=\"70\" y1=\"120.66666666666667\" x2=\"88\" y2=\"120.66666666666667\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"107.33333333333333\" x2=\"88\" y2=\"107.33333333333333\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"112.33333333333333\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">800</text><line x1=\"70\" y1=\"94\" x2=\"88\" y2=\"94\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"80.66666666666666\" x2=\"104\" y2=\"80.66666666666666\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"85.66666666666666\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1000</text><line x1=\"70\" y1=\"67.33333333333334\" x2=\"88\" y2=\"67.33333333333334\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"54\" x2=\"88\" y2=\"54\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"59\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1200</text><line x1=\"70\" y1=\"40.66666666666666\" x2=\"88\" y2=\"40.66666666666666\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"27.333333333333343\" x2=\"88\" y2=\"27.333333333333343\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"32.33333333333334\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1400</text><line x1=\"70\" y1=\"14\" x2=\"104\" y2=\"14\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"19\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1500</text><path d=\"M70 8 V214 H180 V8 M180 34 q34 10 0 70\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linejoin=\"round\"/><text x=\"125.0\" y=\"238.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"15\" font-weight=\"800\" font-family=\"sans-serif\">ml</text></svg>",
     "answer": "600",
     "topic": "Capacity"
    },
    {
     "type": "mc",
     "text": "A tall, thin vase is filled with 3 cups of water. A short, wide bowl is filled with 5 of the same cups. Which holds more?",
     "options": [
      "the bowl",
      "the vase",
      "they hold the same"
     ],
     "answer": 0,
     "topic": "Capacity"
    }
   ]
  },
  {
   "id": 704,
   "chapter": 7,
   "name": "Volume",
   "fullName": "Volume: counting 1 cm³ cubes",
   "lesson": {
    "heading": "Volume: counting 1 cm³ cubes",
    "sub": "Chapter 7 · Topic 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/ice-cubes.webp\" srcset=\"/assets/stickers/ice-cubes@2x.webp 2x\" alt=\"\"><p>The <strong>volume</strong> of an object is how much space it takes up. We can build an object from small cubes and count them.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Cubic units</div><p>A cube that is 1 cm long, 1 cm wide and 1 cm high has a volume of <strong>1 cubic centimetre (1 cm³)</strong>. Count the cubes to find the volume in cm³.</p></div><svg viewBox=\"-58 -66 141 146\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 24.2,70.0 24.2,14.0 72.7,-14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 24.2,70.0 24.2,14.0 -48.5,-28.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 72.7,-14.0 24.2,14.0 -48.5,-28.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"56.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"14.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Count in layers</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>The box above is 3 cubes long and 2 cubes wide, so one layer has 3 × 2 = 6 cubes.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>It is 2 layers high: 6 + 6 = 12 cubes.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>The volume is <strong>12 cm³</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s704\"><h4>🎮 Box Builder</h4><p class=\"how\">Each cube is 1 cm³. Change the size of the box until it has the volume you need. Tap Layers to pull the box apart and count.</p><div class=\"g4-big\" data-k=\"goal\" style=\"font-size:22px\"></div><div class=\"g4-stage\"><svg data-k=\"svg\" role=\"img\" aria-label=\"box of cubes\" style=\"max-height:300px\"></svg></div><div class=\"g4-big\" data-k=\"count\" style=\"font-size:20px\"></div><div class=\"g4-row\"><span class=\"g4-row\" style=\"margin:0;gap:6px\"><span style=\"min-width:72px\">Length</span><button class=\"g4-btn ghost\" data-d=\"-l\" aria-label=\"Length −\">−</button><b data-k=\"vl\" style=\"font-size:22px;min-width:22px;text-align:center\"></b><button class=\"g4-btn ghost\" data-d=\"+l\" aria-label=\"Length +\">+</button></span><span class=\"g4-row\" style=\"margin:0;gap:6px\"><span style=\"min-width:72px\">Width</span><button class=\"g4-btn ghost\" data-d=\"-w\" aria-label=\"Width −\">−</button><b data-k=\"vw\" style=\"font-size:22px;min-width:22px;text-align:center\"></b><button class=\"g4-btn ghost\" data-d=\"+w\" aria-label=\"Width +\">+</button></span><span class=\"g4-row\" style=\"margin:0;gap:6px\"><span style=\"min-width:72px\">Height</span><button class=\"g4-btn ghost\" data-d=\"-h\" aria-label=\"Height −\">−</button><b data-k=\"vh\" style=\"font-size:22px;min-width:22px;text-align:center\"></b><button class=\"g4-btn ghost\" data-d=\"+h\" aria-label=\"Height +\">+</button></span></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"layers\" aria-pressed=\"false\">Layers</button><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out');\n  let d = { l: 2, w: 2, h: 1 }, target = 0, layers = false;\n  function prism(l, w, h, layersOn) {\n    const s = 34, c = 0.866, gap = layersOn ? 0.7 : 0, P = (x, y, z) => [(x - y) * c * s, (x + y) * 0.5 * s - z * s];\n    const poly = (a, fill) => '<polygon points=\"' + a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ') + '\" fill=\"' + fill + '\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/>';\n    const ln = (a, b) => '<line x1=\"' + a[0].toFixed(1) + '\" y1=\"' + a[1].toFixed(1) + '\" x2=\"' + b[0].toFixed(1) + '\" y2=\"' + b[1].toFixed(1) + '\" stroke=\"#1e3a8a\" stroke-width=\"1.5\"/>';\n    let g = '';\n    for (let k = 0; k < h; k++) {\n      const z0 = k * (1 + gap), z1 = z0 + 1;\n      g += poly([P(l, 0, z0), P(l, w, z0), P(l, w, z1), P(l, 0, z1)], '#3b82f6');\n      for (let j = 1; j < w; j++) g += ln(P(l, j, z0), P(l, j, z1));\n      g += poly([P(0, w, z0), P(l, w, z0), P(l, w, z1), P(0, w, z1)], '#60a5fa');\n      for (let i = 1; i < l; i++) g += ln(P(i, w, z0), P(i, w, z1));\n      if (layersOn || k === h - 1) {\n        g += poly([P(0, 0, z1), P(l, 0, z1), P(l, w, z1), P(0, w, z1)], '#bfdbfe');\n        for (let i = 1; i < l; i++) g += ln(P(i, 0, z1), P(i, w, z1));\n        for (let j = 1; j < w; j++) g += ln(P(0, j, z1), P(l, j, z1));\n      }\n    }\n    const H = h * (1 + gap) - gap, x0 = -w * c * s - 8, x1 = l * c * s + 8, y0 = -H * s - 8, y1 = (l + w) * 0.5 * s + 8;\n    return { g, vb: x0.toFixed(1) + ' ' + y0.toFixed(1) + ' ' + (x1 - x0).toFixed(1) + ' ' + (y1 - y0).toFixed(1) };\n  }\n  function draw() {\n    const p = prism(d.l, d.w, d.h, layers);\n    svg.setAttribute('viewBox', p.vb); svg.innerHTML = p.g;\n    ['l', 'w', 'h'].forEach(k => { q(root, 'v' + k).textContent = d[k]; });\n    q(root, 'count').textContent = L.sizes(d.l, d.w, d.h);\n  }\n  function fresh() {\n    let a, b, c2; do { a = rnd(1, 5); b = rnd(1, 4); c2 = rnd(1, 4); } while (a * b * c2 < 6 || a * b * c2 > 40);\n    target = a * b * c2; d = { l: 1, w: 1, h: 1 }; layers = false; q(root, 'layers').setAttribute('aria-pressed', 'false');\n    q(root, 'goal').textContent = L.goal(target); out.className = 'g4-out'; out.innerHTML = L.ask; draw();\n  }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.d) { const k = t.dataset.d.slice(1), up = t.dataset.d[0] === '+'; d[k] = Math.max(1, Math.min(k === 'l' ? 6 : 5, d[k] + (up ? 1 : -1))); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n    else if (t.dataset.k === 'layers') { layers = !layers; t.setAttribute('aria-pressed', String(layers)); draw(); }\n    else if (t.dataset.k === 'check') {\n      const v = d.l * d.w * d.h, ok = v === target;\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad');\n      out.innerHTML = (ok ? L.yes : L.no)(d.l, d.w, d.h, v, target);\n    } else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"sizes\":{\"__fn\":\"(l, w, h) => l + ' × ' + w + ' × ' + h + ' = ' + (l * w * h) + ' cubes'\"},\"goal\":{\"__fn\":\"t => 'Build a box with a volume of ' + t + ' cm³'\"},\"ask\":\"Use − and + to change the length, width and height. Then tap Check.\",\"yes\":{\"__fn\":\"(l, w, h, v) => 'Yes! One layer has ' + l + ' × ' + w + ' = ' + (l * w) + ' cubes, and there ' + (h === 1 ? 'is 1 layer' : 'are ' + h + ' layers') + ': ' + v + ' cubes = <b>' + v + ' cm³</b>.'\"},\"no\":{\"__fn\":\"(l, w, h, v, t) => 'Your box has ' + (l * w) + (l * w === 1 ? ' cube' : ' cubes') + ' in each layer and ' + h + (h === 1 ? ' layer' : ' layers') + ': ' + v + ' cm³. You need ' + t + ' cm³, so make it ' + (v < t ? 'bigger' : 'smaller') + '.'\"}}), document.getElementById('g4-s704')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Count in layers. Do not forget the cubes you cannot see at the back and at the bottom!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "This box is made of 1 cm³ cubes. What is its volume (in cm³)?<svg viewBox=\"-58 -66 117 132\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"48.5,28.0 0.0,56.0 0.0,0.0 48.5,-28.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 0.0,56.0 0.0,0.0 -48.5,-28.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 48.5,-28.0 0.0,0.0 -48.5,-28.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"24.2\" y1=\"42.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"0.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "8",
     "topic": "Volume"
    },
    {
     "type": "input",
     "text": "This box is made of 1 cm³ cubes. What is its volume (in cm³)?<svg viewBox=\"-58 -38 141 118\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 24.2,70.0 24.2,42.0 72.7,14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 24.2,70.0 24.2,42.0 -48.5,0.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-28.0 72.7,14.0 24.2,42.0 -48.5,0.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-14.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-14.0\" x2=\"-24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"56.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"0.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "6",
     "topic": "Volume"
    },
    {
     "type": "input",
     "text": "This box is made of 1 cm³ cubes. What is its volume (in cm³)?<svg viewBox=\"-58 -94 165 188\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"97.0,56.0 48.5,84.0 48.5,0.0 97.0,-28.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 48.5,84.0 48.5,0.0 -48.5,-56.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-84.0 97.0,-28.0 48.5,0.0 -48.5,-56.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"72.7\" y1=\"70.0\" x2=\"72.7\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-70.0\" x2=\"72.7\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-70.0\" x2=\"-24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"56.0\" x2=\"0.0\" y2=\"-28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-56.0\" x2=\"0.0\" y2=\"-28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"70.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-42.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"97.0\" y1=\"28.0\" x2=\"48.5\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"48.5\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"97.0\" y1=\"0.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"-28.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "24",
     "topic": "Volume"
    },
    {
     "type": "mc",
     "text": "Which unit do we use for volume when we count 1 cm cubes?",
     "options": [
      "cm³",
      "cm²",
      "cm",
      "kg"
     ],
     "answer": 0,
     "topic": "Volume"
    },
    {
     "type": "input",
     "text": "This box is made of 1 cm³ cubes. What is its volume (in cm³)?<svg viewBox=\"-34 -66 165 160\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"121.2,70.0 97.0,84.0 97.0,28.0 121.2,14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-24.2,14.0 97.0,84.0 97.0,28.0 -24.2,-42.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 121.2,14.0 97.0,28.0 -24.2,-42.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"0.0\" y1=\"28.0\" x2=\"0.0\" y2=\"-28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"0.0\" y2=\"-28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"42.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-14.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"70.0\" x2=\"72.7\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"97.0\" y1=\"0.0\" x2=\"72.7\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"121.2\" y1=\"42.0\" x2=\"97.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-14.0\" x2=\"97.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "10",
     "topic": "Volume"
    },
    {
     "type": "input",
     "text": "One layer of a box has 3 rows of 3 cubes. The box is 4 layers high. What is its volume (in cm³)?<svg viewBox=\"-83 -122 165 216\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 0.0,84.0 0.0,-28.0 72.7,-70.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-72.7,42.0 0.0,84.0 0.0,-28.0 -72.7,-70.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-112.0 72.7,-70.0 0.0,-28.0 -72.7,-70.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-98.0\" x2=\"48.5\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"70.0\" x2=\"24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"-84.0\" x2=\"24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"56.0\" x2=\"-48.5\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-98.0\" x2=\"-48.5\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"70.0\" x2=\"-24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-84.0\" x2=\"-24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"14.0\" x2=\"0.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-72.7\" y1=\"14.0\" x2=\"0.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-14.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-72.7\" y1=\"-14.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-42.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-72.7\" y1=\"-42.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "36",
     "topic": "Volume"
    },
    {
     "type": "mc",
     "text": "Which box has the bigger volume?<div style=\"display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:flex-end\"><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"-58 -66 141 146\" style=\"display:block;width:100%;max-width:150px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 24.2,70.0 24.2,14.0 72.7,-14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 24.2,70.0 24.2,14.0 -48.5,-28.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 72.7,-14.0 24.2,14.0 -48.5,-28.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"56.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"14.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>A</div><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"-83 -38 190 146\" style=\"display:block;width:100%;max-width:160px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"97.0,56.0 24.2,98.0 24.2,70.0 97.0,28.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-72.7,42.0 24.2,98.0 24.2,70.0 -72.7,14.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-28.0 97.0,28.0 24.2,70.0 -72.7,14.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"72.7\" y1=\"70.0\" x2=\"72.7\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-14.0\" x2=\"72.7\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"84.0\" x2=\"48.5\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"48.5\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"56.0\" x2=\"-48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-14.0\" x2=\"-48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"70.0\" x2=\"-24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"0.0\" x2=\"-24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"84.0\" x2=\"0.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"14.0\" x2=\"0.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>B</div></div>",
     "options": [
      "They are the same",
      "A",
      "B"
     ],
     "answer": 0,
     "topic": "Volume"
    },
    {
     "type": "input",
     "text": "A box is 4 cm long, 3 cm wide and 2 cm high. How many 1 cm³ cubes fill it?<svg viewBox=\"-103 -66 256 200\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"97.0,56.0 24.2,98.0 24.2,42.0 97.0,0.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-72.7,42.0 24.2,98.0 24.2,42.0 -72.7,-14.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 97.0,0.0 24.2,42.0 -72.7,-14.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"72.7\" y1=\"70.0\" x2=\"72.7\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"72.7\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"84.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"-28.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"56.0\" x2=\"-48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"-48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"70.0\" x2=\"-24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"-24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"84.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-14.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"97.0\" y1=\"28.0\" x2=\"24.2\" y2=\"70.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-72.7\" y1=\"14.0\" x2=\"24.2\" y2=\"70.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><text x=\"-38.2\" y=\"94.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">4 cm</text><text x=\"82.6\" y=\"99.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text><text x=\"127.0\" y=\"28.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">2 cm</text></svg>",
     "answer": "24",
     "topic": "Volume"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 7,
  "chapterName": "Perimeter, Area, Capacity and Volume",
  "topics": [
   {
    "name": "Perimeter",
    "questions": [
     {
      "num": "1",
      "text": "Find the perimeter of each shape.",
      "parts": [
       {
        "label": "a)",
        "text": "A rectangle 10 cm long and 5 cm wide.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "A square with sides of 7 cm.",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "A triangle with sides of 4 cm, 6 cm and 9 cm.",
        "marks": 2
       }
      ]
     },
     {
      "num": "2",
      "text": "Use a ruler to measure each side of your maths book in cm.",
      "parts": [
       {
        "label": "a)",
        "text": "Write down the four lengths.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Work out the perimeter of the book.",
        "marks": 2
       }
      ]
     },
     {
      "num": "3",
      "text": "Sipho walks once around a rectangular soccer field that is 100 m long and 60 m wide.<svg viewBox=\"0 0 372 244\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,194.0 66.0,194.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">100 m</text><text x=\"315.0\" y=\"128.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">60 m</text></svg>",
      "parts": [
       {
        "label": "a)",
        "text": "How far does he walk?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "How far does he walk if he goes around 3 times?",
        "marks": 2
       }
      ]
     },
     {
      "num": "4",
      "text": "A square has a perimeter of 48 cm.",
      "parts": [
       {
        "label": "a)",
        "text": "How long is one side?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Draw a rectangle (not a square) with the same perimeter. Write its length and width.",
        "marks": 3
       }
      ]
     }
    ]
   },
   {
    "name": "Area",
    "questions": [
     {
      "num": "5",
      "text": "Count the squares. Write the area in square units.",
      "parts": [
       {
        "label": "a)",
        "text": "<svg viewBox=\"0 0 156 66\" style=\"display:block;width:100%;max-width:170px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "<svg viewBox=\"0 0 96 126\" style=\"display:block;width:100%;max-width:110px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"93\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"93\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "<svg viewBox=\"0 0 96 96\" style=\"display:block;width:100%;max-width:110px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
        "marks": 1
       }
      ]
     },
     {
      "num": "6",
      "text": "A bathroom floor is covered with square tiles: 8 tiles along one wall and 5 tiles along the other.",
      "parts": [
       {
        "label": "a)",
        "text": "How many tiles cover the floor?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "A box holds 10 tiles. How many boxes are needed?",
        "marks": 2
       }
      ]
     },
     {
      "num": "7",
      "text": "On square paper, draw two different rectangles that each have an area of 12 square units.",
      "parts": [
       {
        "label": "a)",
        "text": "Write the length and width of each rectangle.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Which of your rectangles has the longer perimeter?",
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
      "num": "8",
      "text": "Write in millilitres.",
      "parts": [
       {
        "label": "a)",
        "text": "2 l",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "4 l",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "3 l 500 ml",
        "marks": 2
       }
      ]
     },
     {
      "num": "9",
      "text": "Thabo fills a pot with a 500 ml jug. He pours in 6 full jugs.",
      "parts": [
       {
        "label": "a)",
        "text": "What is the capacity of the pot in ml?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Write it in litres.",
        "marks": 1
       }
      ]
     },
     {
      "num": "10",
      "text": "A juice box holds 200 ml.",
      "parts": [
       {
        "label": "a)",
        "text": "How many juice boxes fill a 1 l jug?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "How many juice boxes fill a 2 l bottle?",
        "marks": 2
       }
      ]
     },
     {
      "num": "11",
      "text": "At home, choose two containers. Estimate how many cups of water fill each one, then fill them and count.",
      "parts": [
       {
        "label": "a)",
        "text": "Write your estimates and your counts in a table.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Which container has the bigger capacity?",
        "marks": 1
       }
      ]
     }
    ]
   },
   {
    "name": "Volume",
    "questions": [
     {
      "num": "12",
      "text": "Each box is made of 1 cm³ cubes. Write the volume in cm³.",
      "parts": [
       {
        "label": "a)",
        "text": "<svg viewBox=\"-34 -94 93 146\" style=\"display:block;width:100%;max-width:120px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"48.5,28.0 24.2,42.0 24.2,-42.0 48.5,-56.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-24.2,14.0 24.2,42.0 24.2,-42.0 -24.2,-70.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-84.0 48.5,-56.0 24.2,-42.0 -24.2,-70.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"0.0\" y1=\"28.0\" x2=\"0.0\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-70.0\" x2=\"0.0\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"0.0\" x2=\"24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-14.0\" x2=\"24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "<svg viewBox=\"-83 -38 165 132\" style=\"display:block;width:100%;max-width:160px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 0.0,84.0 0.0,56.0 72.7,14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-72.7,42.0 0.0,84.0 0.0,56.0 -72.7,14.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-28.0 72.7,14.0 0.0,56.0 -72.7,14.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-14.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"70.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"56.0\" x2=\"-48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-14.0\" x2=\"-48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"70.0\" x2=\"-24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"0.0\" x2=\"-24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "<svg viewBox=\"-58 -66 141 146\" style=\"display:block;width:100%;max-width:150px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 24.2,70.0 24.2,14.0 72.7,-14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 24.2,70.0 24.2,14.0 -48.5,-28.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 72.7,-14.0 24.2,14.0 -48.5,-28.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"56.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"14.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
        "marks": 2
       }
      ]
     },
     {
      "num": "13",
      "text": "Lerato builds a box from 1 cm³ cubes. Each layer has 4 rows of 5 cubes.",
      "parts": [
       {
        "label": "a)",
        "text": "How many cubes are in one layer?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "The box is 3 layers high. What is its volume?",
        "marks": 2
       }
      ]
     },
     {
      "num": "14",
      "text": "You have 18 cubes.",
      "parts": [
       {
        "label": "a)",
        "text": "Build (or draw) a box that uses all 18 cubes. Write its length, width and height.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Find a different box with the same volume.",
        "marks": 2
       }
      ]
     }
    ]
   }
  ]
 },
 "answerKey": {
  "chapter": 7,
  "chapterName": "Chapter 7 — Perimeter, Area, Capacity and Volume",
  "topics": [
   {
    "name": "Perimeter",
    "answers": [
     {
      "num": "Q1a",
      "ans": "30 cm",
      "note": "10 + 5 + 10 + 5"
     },
     {
      "num": "Q1b",
      "ans": "28 cm",
      "note": "4 × 7"
     },
     {
      "num": "Q1c",
      "ans": "19 cm",
      "note": "4 + 6 + 9"
     },
     {
      "num": "Q2a",
      "ans": "—",
      "note": "Own measurements: opposite sides of the book are equal."
     },
     {
      "num": "Q2b",
      "ans": "—",
      "note": "Add the four sides, for example 30 + 21 + 30 + 21 = 102 cm."
     },
     {
      "num": "Q3a",
      "ans": "320 m",
      "note": "100 + 60 + 100 + 60"
     },
     {
      "num": "Q3b",
      "ans": "960 m",
      "note": "3 × 320"
     },
     {
      "num": "Q4a",
      "ans": "12 cm",
      "note": "48 ÷ 4"
     },
     {
      "num": "Q4b",
      "ans": "14 cm × 10 cm",
      "note": "One example: any length + width = 24 cm works (but not 12 and 12)."
     }
    ]
   },
   {
    "name": "Area",
    "answers": [
     {
      "num": "Q5a",
      "ans": "10",
      "note": "square units: 2 rows of 5"
     },
     {
      "num": "Q5b",
      "ans": "10",
      "note": "square units: 3 + 3 + 3 + 1"
     },
     {
      "num": "Q5c",
      "ans": "6",
      "note": "square units: 1 + 2 + 3"
     },
     {
      "num": "Q6a",
      "ans": "40",
      "note": "tiles: 5 × 8"
     },
     {
      "num": "Q6b",
      "ans": "4",
      "note": "boxes: 40 ÷ 10"
     },
     {
      "num": "Q7a",
      "ans": "6 × 2; 4 × 3; 12 × 1",
      "note": "Any two: length × width must be 12."
     },
     {
      "num": "Q7b",
      "ans": "12 × 1 > 6 × 2 > 4 × 3",
      "note": "The long, thin one. Perimeters: 12 × 1 → 26, 6 × 2 → 16, 4 × 3 → 14."
     }
    ]
   },
   {
    "name": "Capacity",
    "answers": [
     {
      "num": "Q8a",
      "ans": "2 000 ml",
      "note": "2 × 1 000"
     },
     {
      "num": "Q8b",
      "ans": "4 000 ml",
      "note": "4 × 1 000"
     },
     {
      "num": "Q8c",
      "ans": "3 500 ml",
      "note": "3 000 + 500"
     },
     {
      "num": "Q9a",
      "ans": "3 000 ml",
      "note": "6 × 500"
     },
     {
      "num": "Q9b",
      "ans": "3 l",
      "note": "3 000 ml = 3 l"
     },
     {
      "num": "Q10a",
      "ans": "5",
      "note": "5 × 200 = 1 000"
     },
     {
      "num": "Q10b",
      "ans": "10",
      "note": "10 × 200 = 2 000"
     },
     {
      "num": "Q11a",
      "ans": "—",
      "note": "Own table: an estimate and a count for each container."
     },
     {
      "num": "Q11b",
      "ans": "—",
      "note": "The one that took more cups."
     }
    ]
   },
   {
    "name": "Volume",
    "answers": [
     {
      "num": "Q12a",
      "ans": "6 cm³",
      "note": "2 × 1 × 3"
     },
     {
      "num": "Q12b",
      "ans": "9 cm³",
      "note": "3 × 3 × 1"
     },
     {
      "num": "Q12c",
      "ans": "12 cm³",
      "note": "3 × 2 × 2"
     },
     {
      "num": "Q13a",
      "ans": "20",
      "note": "cubes: 4 × 5"
     },
     {
      "num": "Q13b",
      "ans": "60 cm³",
      "note": "20 × 3"
     },
     {
      "num": "Q14a",
      "ans": "3 × 3 × 2",
      "note": "For example: length × width × height must be 18."
     },
     {
      "num": "Q14b",
      "ans": "6 × 3 × 1; 9 × 2 × 1; 18 × 1 × 1",
      "note": "Any one that is different from part a."
     }
    ]
   }
  ]
 }
});
