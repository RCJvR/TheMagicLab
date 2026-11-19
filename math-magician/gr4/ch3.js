// Math Magician — Grade 4, Chapter 3 (Multiplication, Multiples and Factors)
// Generated from one bilingual source (scripts/math-gr4/gen_ch3.js); edit both languages there.
MathMagician.registerChapter(3, {
 "topics": [
  {
   "id": 301,
   "chapter": 3,
   "name": "Multiplying",
   "fullName": "Multiplication as repeated addition",
   "lesson": {
    "heading": "Multiplication as repeated addition",
    "sub": "Chapter 3 · Topic 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/chicken.webp\" srcset=\"/assets/stickers/chicken@2x.webp 2x\" alt=\"\"><p><strong>Multiplying</strong> is a quick way to add the same number again and again. <span class=\"math\">4 × 2</span> means 4 groups of 2: <span class=\"math\">2 + 2 + 2 + 2 = 8</span>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Any order</div><p>We can multiply in any order: <span class=\"math\">4 × 2 = 2 × 4</span> and <span class=\"math\">60 × 76 = 76 × 60</span>. The answer to a multiplication is called the <strong>product</strong>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Know your tables</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Learn the tables up to <span class=\"math\">10 × 10</span> so you can use them quickly.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Use a fact you know: <span class=\"math\">7 × 8</span> is double <span class=\"math\">7 × 4 = 28</span>, so it is <strong>56</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">9 × 6</span> is <span class=\"math\">10 × 6 − 6 = 60 − 6 = 54</span>.</span></div></div><div class=\"g4-sim\" id=\"s301\"><h4>🎮 Jumps and Arrays</h4><p class=\"how\">Change the numbers. See the multiplication as jumps on a number line and as rows of dots.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-s=\"a:-1\">−</button><span class=\"g4-big\" data-k=\"a\" style=\"min-width:40px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"a:1\">+</button><span class=\"g4-big\">×</span><button class=\"g4-btn ghost\" data-s=\"b:-1\">−</button><span class=\"g4-big\" data-k=\"b\" style=\"min-width:40px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"b:1\">+</button><button class=\"g4-btn ghost\" data-k=\"swap\">Swap</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 160\" data-k=\"line\" role=\"img\" aria-label=\"number line\"></svg></div><div class=\"g4-stage\"><svg data-k=\"arr\" role=\"img\" aria-label=\"array\" style=\"max-width:300px\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const line = q(root, 'line'), arr = q(root, 'arr'), out = q(root, 'out');\r\n  let a = 4, b = 2;\r\n  function draw() {\r\n    q(root, 'a').textContent = a; q(root, 'b').textContent = b;\r\n    const total = a * b, max = Math.max(10, Math.ceil(total / 10) * 10), X = n => 30 + n / max * 580;\r\n    let h = '<line x1=\"30\" y1=\"100\" x2=\"610\" y2=\"100\" stroke=\"#e2e8f0\" stroke-width=\"3\"/>';\r\n    for (let n = 0; n <= max; n += (max > 50 ? 10 : 5)) h += '<line x1=\"' + X(n) + '\" y1=\"92\" x2=\"' + X(n) + '\" y2=\"108\" stroke=\"#e2e8f0\" stroke-width=\"2\"/><text x=\"' + X(n) + '\" y=\"128\" text-anchor=\"middle\" fill=\"rgba(226,232,240,.75)\" font-size=\"14\">' + n + '</text>';\r\n    for (let i = 0; i < a; i++) { const x1 = X(i * b), x2 = X((i + 1) * b); h += '<path d=\"M' + x1 + ' 96 Q' + ((x1 + x2) / 2) + ' ' + (96 - Math.min(60, 14 + (x2 - x1) * 0.6)) + ' ' + x2 + ' 96\" fill=\"none\" stroke=\"#9ed43c\" stroke-width=\"3\"/>'; }\r\n    h += '<circle cx=\"' + X(total) + '\" cy=\"100\" r=\"8\" fill=\"#fde047\"/><text x=\"' + X(total) + '\" y=\"150\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + total + '</text>';\r\n    line.innerHTML = h;\r\n    let g = ''; const s = Math.min(26, 220 / Math.max(a, b));\r\n    for (let r = 0; r < a; r++) for (let c = 0; c < b; c++) g += '<circle cx=\"' + (20 + c * s + s / 2) + '\" cy=\"' + (10 + r * s + s / 2) + '\" r=\"' + (s * 0.36) + '\" fill=\"#60a5fa\"/>';\r\n    arr.setAttribute('viewBox', '0 0 ' + (40 + b * s) + ' ' + (20 + a * s)); arr.innerHTML = g;\r\n    out.innerHTML = '<b>' + a + ' × ' + b + ' = ' + total + '</b><br>' + L.rep(Array(a).fill(b).join(' + '), total) + '<br>' + L.rows(a, b, total);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.s) { const [k, d] = t.dataset.s.split(':'); if (k === 'a') a = Math.max(1, Math.min(10, a + +d)); else b = Math.max(1, Math.min(10, b + +d)); }\r\n    else if (t.dataset.k === 'swap') { [a, b] = [b, a]; out.dataset.swapped = '1'; }\r\n    draw();\r\n    if (t.dataset.k === 'swap') out.innerHTML += '<br>' + L.swapped;\r\n  });\r\n  draw();\r\n})(__rev({\"rep\":{\"__fn\":\"(s, t) => 'Repeated addition: ' + s + ' = ' + t\"},\"rows\":{\"__fn\":\"(a, b, t) => a + ' rows of ' + b + ' dots make ' + t + ' dots.'\"},\"swapped\":\"You swapped the numbers and the answer stayed the same!\"}), document.getElementById('s301')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>On a number line, <span class=\"math\">3 × 5</span> is <strong>3 jumps of 5</strong>: 5, 10, 15.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "4 × 2 = ?",
     "answer": "8",
     "topic": "Multiplying"
    },
    {
     "type": "mc",
     "text": "2 + 2 + 2 + 2 + 2 is the same as…",
     "options": [
      "2 × 5",
      "5 + 2",
      "2 × 2",
      "10 × 2"
     ],
     "answer": 0,
     "topic": "Multiplying"
    },
    {
     "type": "input",
     "text": "7 × 8 = ?",
     "answer": "56",
     "topic": "Multiplying"
    },
    {
     "type": "mc",
     "text": "60 × 76 = 76 × ___",
     "options": [
      "76",
      "60",
      "136",
      "16"
     ],
     "answer": 1,
     "topic": "Multiplying"
    },
    {
     "type": "input",
     "text": "9 × 6 = ?",
     "answer": "54",
     "topic": "Multiplying"
    },
    {
     "type": "input",
     "text": "A hall has 6 rows of chairs with 7 chairs in each row. How many chairs are there?",
     "answer": "42",
     "topic": "Multiplying"
    },
    {
     "type": "mc",
     "text": "Which shows 3 × 5 on a number line?",
     "options": [
      "3 jumps of 5",
      "5 jumps of 5",
      "3 jumps of 3",
      "8 jumps of 1"
     ],
     "answer": 0,
     "topic": "Multiplying"
    },
    {
     "type": "input",
     "text": "10 × 10 = ?",
     "answer": "100",
     "topic": "Multiplying"
    }
   ]
  },
  {
   "id": 302,
   "chapter": 3,
   "name": "Multiples",
   "fullName": "Multiples of 1-digit numbers",
   "lesson": {
    "heading": "Multiples of 1-digit numbers",
    "sub": "Chapter 3 · Topic 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/bee.webp\" srcset=\"/assets/stickers/bee@2x.webp 2x\" alt=\"\"><p>The <strong>multiples</strong> of a number are the answers in its times table. The multiples of 3 are 3, 6, 9, 12, 15 … They go on and on!</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Multiples of 8 between 30 and 60</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Count in 8s: 8, 16, 24, <strong>32, 40, 48, 56</strong>, 64 …</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>The ones between 30 and 60 are <span class=\"math\">32; 40; 48; 56</span>.</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Spot a multiple</div><p>Multiples of <strong>2</strong> are even. Multiples of <strong>5</strong> end in 0 or 5. Multiples of <strong>10</strong> end in 0.</p></div><div class=\"g4-sim\" id=\"s302\"><h4>🎮 Hundred Square Hunt</h4><p class=\"how\">Choose a number. Then tap all its multiples on the hundred square.</p><div class=\"g4-row\" data-k=\"ns\"></div><div data-k=\"grid\" style=\"display:grid;grid-template-columns:repeat(10,1fr);gap:4px;max-width:520px;margin:10px 0\"></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"show\">Show all</button><button class=\"g4-btn ghost\" data-k=\"reset\">Start again</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const grid = q(root, 'grid'), out = q(root, 'out');\r\n  let n = 8, found = new Set();\r\n  q(root, 'ns').innerHTML = [2, 3, 4, 5, 6, 7, 8, 9].map(k => '<button class=\"g4-btn ghost\" data-n=\"' + k + '\">' + k + '</button>').join('');\r\n  grid.innerHTML = Array.from({ length: 100 }, (_, i) => '<button data-c=\"' + (i + 1) + '\" style=\"font:700 15px \\'Cabinet Grotesk\\',sans-serif;padding:0;aspect-ratio:1;border-radius:7px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#e2e8f0;cursor:pointer\">' + (i + 1) + '</button>').join('');\r\n  const total = () => Math.floor(100 / n);\r\n  function paint(showAll) {\r\n    root.querySelectorAll('[data-n]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.n === n));\r\n    grid.querySelectorAll('[data-c]').forEach(c => { const v = +c.dataset.c, hit = found.has(v) || (showAll && v % n === 0); c.style.background = hit ? 'rgba(158,212,60,.35)' : 'rgba(255,255,255,.04)'; c.style.borderColor = hit ? '#9ed43c' : 'rgba(255,255,255,.1)'; });\r\n    out.className = 'g4-out' + (found.size === total() ? ' good' : '');\r\n    out.innerHTML = found.size === total() ? L.all(n, total()) : L.found(found.size, total(), n);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.n) { n = +t.dataset.n; found = new Set(); paint(); }\r\n    else if (t.dataset.c) {\r\n      const v = +t.dataset.c;\r\n      if (v % n === 0) { found.add(v); paint(); }\r\n      else { t.style.background = 'rgba(244,63,94,.35)'; setTimeout(() => { t.style.background = found.has(v) ? 'rgba(158,212,60,.35)' : 'rgba(255,255,255,.04)'; }, 500); out.className = 'g4-out bad'; out.innerHTML = L.not(v, n, Math.floor(v / n), v % n); }\r\n    } else if (t.dataset.k === 'show') { for (let v = n; v <= 100; v += n) found.add(v); paint(); }\r\n    else if (t.dataset.k === 'reset') { found = new Set(); paint(); }\r\n  });\r\n  paint();\r\n})(__rev({\"found\":{\"__fn\":\"(a, b, n) => 'Tap every multiple of ' + n + '. Found ' + a + ' of ' + b + '.'\"},\"all\":{\"__fn\":\"(n, b) => 'You found all ' + b + ' multiples of ' + n + ' up to 100! See the pattern?'\"},\"not\":{\"__fn\":\"(v, n, q, r) => v + ' is not a multiple of ' + n + ': ' + n + ' × ' + q + ' = ' + (n * q) + ' with ' + r + ' left over.'\"}}), document.getElementById('s302')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>A number can be a multiple of more than one number: 12 is a multiple of 2, 3, 4 and 6.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Which are the multiples of 8 between 30 and 60?",
     "options": [
      "32; 40; 48; 56",
      "30; 40; 50; 60",
      "38; 46; 54",
      "33; 41; 49; 57"
     ],
     "answer": 0,
     "topic": "Multiples"
    },
    {
     "type": "input",
     "text": "What is the 5th multiple of 7?",
     "answer": "35",
     "topic": "Multiples"
    },
    {
     "type": "mc",
     "text": "Which number is a multiple of 6?",
     "options": [
      "26",
      "36",
      "44",
      "50"
     ],
     "answer": 1,
     "topic": "Multiples"
    },
    {
     "type": "input",
     "text": "How many multiples of 9 are there from 1 to 100?",
     "answer": "11",
     "topic": "Multiples"
    },
    {
     "type": "mc",
     "text": "45 is a multiple of…",
     "options": [
      "2",
      "4",
      "5",
      "7"
     ],
     "answer": 2,
     "topic": "Multiples"
    },
    {
     "type": "input",
     "text": "What is the smallest number that is a multiple of both 4 and 6?",
     "answer": "12",
     "topic": "Multiples"
    },
    {
     "type": "mc",
     "text": "Multiples of 5 always end in…",
     "options": [
      "0 or 5",
      "5 only",
      "0 only",
      "2 or 5"
     ],
     "answer": 0,
     "topic": "Multiples"
    },
    {
     "type": "input",
     "text": "What is the next multiple of 3 after 99?",
     "answer": "102",
     "topic": "Multiples"
    }
   ]
  },
  {
   "id": 303,
   "chapter": 3,
   "name": "Doubling and ×10, ×100, ×1 000",
   "fullName": "Doubling, and multiplying by 10, 100 and 1 000",
   "lesson": {
    "heading": "Doubling, and multiplying by 10, 100 and 1 000",
    "sub": "Chapter 3 · Topic 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/scales.webp\" srcset=\"/assets/stickers/scales@2x.webp 2x\" alt=\"\"><p><strong>Doubling</strong> means multiplying by 2, or adding a number to itself. Multiplying by <strong>10, 100</strong> or <strong>1 000</strong> makes a number 10, 100 or 1 000 times bigger.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Doubling</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Double 8 = 8 + 8 = <strong>16</strong></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Double 16 = 16 + 16 = <strong>32</strong></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Double 132 = 132 + 132 = <strong>264</strong></span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ × 10, × 100, × 1 000</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">73 × 10 = 730</span>: each digit moves 1 place to the left.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">73 × 100 = 7 300</span>: each digit moves 2 places to the left.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">73 × 1 000 = 73 000</span>: each digit moves 3 places to the left.</span></div></div><div class=\"g4-sim\" id=\"s303\"><h4>🎮 Times Machine</h4><p class=\"how\">Type a number, then double it or multiply it by 10, 100 or 1 000. Watch the digits move in the place value chart.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"n\" value=\"73\" inputmode=\"numeric\" aria-label=\"number\"><button class=\"g4-btn\" data-op=\"x2\">Double</button><button class=\"g4-btn\" data-op=\"10\">× 10</button><button class=\"g4-btn\" data-op=\"100\">× 100</button><button class=\"g4-btn\" data-op=\"1000\">× 1 000</button></div><table class=\"g4-chart\" data-k=\"chart\"></table><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, fmt, num } = window.G4;\r\n  const inp = q(root, 'n'), chart = q(root, 'chart'), out = q(root, 'out');\r\n  const COLS = L.cols; // TTh, Th, H, T, U ... up to hundred thousands\r\n  function show(v, prev, op) {\r\n    const s = String(v).padStart(COLS.length, ' ');\r\n    chart.innerHTML = '<tr>' + COLS.map(c => '<th>' + c + '</th>').join('') + '</tr><tr>' + [...s].map(d => '<td style=\"min-width:44px;font-size:28px;transition:all .4s\">' + (d === ' ' ? '' : d) + '</td>').join('') + '</tr>';\r\n    if (op == null) { out.innerHTML = L.start; return; }\r\n    if (op === 'x2') out.innerHTML = '<b>' + L.dbl(fmt(prev)) + ' = ' + fmt(prev) + ' + ' + fmt(prev) + ' = ' + fmt(v) + '</b>';\r\n    else out.innerHTML = '<b>' + fmt(prev) + ' × ' + fmt(op) + ' = ' + fmt(v) + '</b><br>' + L.moves(op === 10 ? 1 : op === 100 ? 2 : 3);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t || !t.dataset.op) return;\r\n    let v = num(inp.value); if (v == null || v < 0) v = 0; if (v > 999) v = 999;\r\n    const op = t.dataset.op === 'x2' ? 'x2' : +t.dataset.op, r = op === 'x2' ? v * 2 : v * op;\r\n    show(r, v, op);\r\n  });\r\n  inp.addEventListener('input', () => { const v = num(inp.value); show(v == null ? 0 : Math.min(999, v)); });\r\n  show(73);\r\n})(__rev({\"cols\":[\"HTh\",\"TTh\",\"Th\",\"H\",\"T\",\"U\"],\"start\":\"Type a number up to 999, then press a button.\",\"dbl\":{\"__fn\":\"n => 'Double ' + n\"},\"moves\":{\"__fn\":\"k => 'Every digit moves <b>' + k + (k === 1 ? ' place' : ' places') + '</b> to the left, and a 0 fills each empty place.'\"}}), document.getElementById('s303')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>We do not just \"add a zero\". The digits <strong>move</strong> to bigger places, and the 0 holds the empty place.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Double 16 = ?",
     "answer": "32",
     "topic": "Doubling and ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "Double 132 = ?",
     "answer": "264",
     "topic": "Doubling and ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "73 × 10 = ?",
     "answer": "730",
     "topic": "Doubling and ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "73 × 100 = ?",
     "answer": "7300",
     "topic": "Doubling and ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "73 × 1 000 = ?",
     "answer": "73000",
     "topic": "Doubling and ×10, ×100, ×1 000"
    },
    {
     "type": "mc",
     "text": "When you multiply by 10, each digit moves…",
     "options": [
      "one place to the left",
      "one place to the right",
      "two places to the left",
      "nowhere"
     ],
     "answer": 0,
     "topic": "Doubling and ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "Double 48 = ?",
     "answer": "96",
     "topic": "Doubling and ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "25 × 100 = ?",
     "answer": "2500",
     "topic": "Doubling and ×10, ×100, ×1 000"
    }
   ]
  },
  {
   "id": 304,
   "chapter": 3,
   "name": "Factors and splitting",
   "fullName": "Factors and the distributive property",
   "lesson": {
    "heading": "Factors and the distributive property",
    "sub": "Chapter 3 · Topic 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/kraal.webp\" srcset=\"/assets/stickers/kraal@2x.webp 2x\" alt=\"\"><p>A <strong>factor</strong> divides into a number exactly, with nothing left over. Factors come in pairs that multiply to make the number.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Factors of 6 and 18</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">6 = 1 × 6 = 2 × 3</span>, so the factors of 6 are <strong>1, 2, 3, 6</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">18 = 1 × 18 = 2 × 9 = 3 × 6</span>, so the factors of 18 are <strong>1, 2, 3, 6, 9, 18</strong>.</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Split to multiply</div><p>We can break a number into parts and multiply each part: <span class=\"math\">5 × 7 = 5 × (4 + 3) = (5 × 4) + (5 × 3) = 20 + 15 = 35</span>. This is the <strong>distributive property</strong>.</p></div><div class=\"g4-sim\" id=\"s304\"><h4>🎮 Factor Rectangles</h4><p class=\"how\">In Factors, change the number to see every rectangle it makes. In Split it, break a multiplication into two easier parts.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-m=\"f\">Factors</button><button class=\"g4-btn ghost\" data-m=\"s\">Split it</button><button class=\"g4-btn ghost\" data-k=\"newsplit\">New split</button></div><div class=\"g4-row\" data-k=\"ctl\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 220\" data-k=\"svg\" role=\"img\" aria-label=\"factors\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), ctl = q(root, 'ctl');\r\n  let mode = 'f', n = 18, a = 5, b = 7, cut = 4;\r\n  function factors(k) { const f = []; for (let i = 1; i <= k; i++) if (k % i === 0) f.push(i); return f; }\r\n  function draw() {\r\n    root.querySelectorAll('[data-m]').forEach(x => x.setAttribute('aria-pressed', x.dataset.m === mode));\r\n    let h = '';\r\n    if (mode === 'f') {\r\n      ctl.innerHTML = '<button class=\"g4-btn ghost\" data-d=\"-1\">−</button><span class=\"g4-big\" style=\"min-width:60px;text-align:center\">' + n + '</span><button class=\"g4-btn ghost\" data-d=\"1\">+</button>';\r\n      const f = factors(n), pairs = f.filter(x => x <= n / x).map(x => [x, n / x]);\r\n      const sumC = pairs.reduce((t, p) => t + p[1], 0), maxR = Math.max(...pairs.map(p => p[0])), s = Math.max(6, Math.min(30, (620 - 26 * pairs.length) / sumC, 170 / maxR)); let x = 10; svg.setAttribute('viewBox', '0 0 640 ' + Math.round(50 + maxR * s));\r\n      pairs.forEach(([r, c], i) => { const col = ['#60a5fa', '#f472b6', '#facc15', '#4ade80', '#a78bfa', '#fb923c'][i % 6]; if (x + c * s > 630) return; for (let i2 = 0; i2 < r; i2++) for (let j = 0; j < c; j++) h += '<rect x=\"' + (x + j * s) + '\" y=\"' + (30 + i2 * s) + '\" width=\"' + (s - 2) + '\" height=\"' + (s - 2) + '\" rx=\"2\" fill=\"' + col + '\"/>'; h += '<text x=\"' + (x + c * s / 2) + '\" y=\"20\" text-anchor=\"middle\" fill=\"' + col + '\" font-size=\"15\" font-weight=\"800\">' + r + ' × ' + c + '</text>'; x += c * s + 26; });\r\n      svg.innerHTML = h;\r\n      out.innerHTML = L.facts(n, f.join(', '), f.length) + (f.length === 2 ? '<br>' + L.prime(n) : '');\r\n    } else {\r\n      svg.setAttribute('viewBox', '0 0 640 ' + (60 + a * 30));\r\n      ctl.innerHTML = L.split + ' <input type=\"range\" min=\"1\" max=\"' + (b - 1) + '\" value=\"' + cut + '\" data-k=\"cut\" style=\"accent-color:#9ed43c;width:200px\" aria-label=\"split\">';\r\n      const s = 30;\r\n      for (let r = 0; r < a; r++) for (let c = 0; c < b; c++) h += '<rect x=\"' + (40 + c * s + (c >= cut ? 14 : 0)) + '\" y=\"' + (20 + r * s) + '\" width=\"' + (s - 4) + '\" height=\"' + (s - 4) + '\" rx=\"4\" fill=\"' + (c < cut ? '#60a5fa' : '#f472b6') + '\"/>';\r\n      h += '<text x=\"' + (40 + cut * s / 2) + '\" y=\"' + (40 + a * s) + '\" text-anchor=\"middle\" fill=\"#93c5fd\" font-size=\"16\" font-weight=\"800\">' + a + ' × ' + cut + ' = ' + (a * cut) + '</text><text x=\"' + (54 + cut * s + (b - cut) * s / 2) + '\" y=\"' + (40 + a * s) + '\" text-anchor=\"middle\" fill=\"#f9a8d4\" font-size=\"16\" font-weight=\"800\">' + a + ' × ' + (b - cut) + ' = ' + (a * (b - cut)) + '</text>';\r\n      svg.innerHTML = h;\r\n      out.innerHTML = '<b>' + a + ' × ' + b + ' = ' + a + ' × (' + cut + ' + ' + (b - cut) + ') = (' + a + ' × ' + cut + ') + (' + a + ' × ' + (b - cut) + ') = ' + (a * cut) + ' + ' + (a * (b - cut)) + ' = ' + (a * b) + '</b><br>' + L.why;\r\n      q(root, 'cut').addEventListener('input', ev => { cut = +ev.target.value; draw(); });\r\n    }\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.m) { mode = t.dataset.m; draw(); }\r\n    else if (t.dataset.d) { n = Math.max(2, Math.min(48, n + +t.dataset.d)); draw(); }\r\n    else if (t.dataset.k === 'newsplit') { a = 3 + Math.floor(Math.random() * 6); b = 6 + Math.floor(Math.random() * 7); cut = Math.max(1, Math.min(b - 1, b > 10 ? 10 : Math.floor(b / 2))); mode = 's'; draw(); }\r\n  });\r\n  draw();\r\n})(__rev({\"facts\":{\"__fn\":\"(n, f, k) => 'The factors of ' + n + ' are <b>' + f + '</b>. That is ' + k + ' factors. Each rectangle is a pair of factors.'\"},\"prime\":{\"__fn\":\"n => n + ' has only two factors: 1 and itself.'\"},\"split\":\"Split the second number:\",\"why\":\"Breaking a number into easier parts makes multiplying easier.\"}), document.getElementById('s304')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Split into tens and units: <span class=\"math\">6 × 13 = (6 × 10) + (6 × 3) = 60 + 18 = 78</span>.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "What are the factors of 6?",
     "options": [
      "1, 2, 3, 6",
      "1, 6",
      "2, 3",
      "6, 12, 18"
     ],
     "answer": 0,
     "topic": "Factors and splitting"
    },
    {
     "type": "input",
     "text": "How many factors does 18 have?",
     "answer": "6",
     "topic": "Factors and splitting"
    },
    {
     "type": "mc",
     "text": "Which number is NOT a factor of 24?",
     "options": [
      "3",
      "4",
      "5",
      "6"
     ],
     "answer": 2,
     "topic": "Factors and splitting"
    },
    {
     "type": "input",
     "text": "5 × 7 = (5 × 4) + (5 × ___)",
     "answer": "3",
     "topic": "Factors and splitting"
    },
    {
     "type": "input",
     "text": "6 × 13 = (6 × 10) + (6 × 3) = ?",
     "answer": "78",
     "topic": "Factors and splitting"
    },
    {
     "type": "mc",
     "text": "Which is the same as 8 × 9?",
     "options": [
      "8 × (5 + 4)",
      "8 + 5 + 4",
      "(8 × 5) + 4",
      "8 × 5 × 4"
     ],
     "answer": 0,
     "topic": "Factors and splitting"
    },
    {
     "type": "input",
     "text": "What is the biggest factor of 36, other than 36 itself?",
     "answer": "18",
     "topic": "Factors and splitting"
    },
    {
     "type": "input",
     "text": "Work out 7 × 12 by splitting 12 into 10 + 2.",
     "answer": "84",
     "topic": "Factors and splitting"
    }
   ]
  },
  {
   "id": 305,
   "chapter": 3,
   "name": "Multiplication problems",
   "fullName": "Solving multiplication problems",
   "lesson": {
    "heading": "Solving multiplication problems",
    "sub": "Chapter 3 · Topic 5",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/mealie.webp\" srcset=\"/assets/stickers/mealie@2x.webp 2x\" alt=\"\"><p>Multiplication problems have <strong>equal groups</strong>. Key words: <strong>multiply, product, altogether, total, each</strong>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Two-step problem</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>30 desks in each of 9 classrooms and 25 desks in each of 8 classrooms. How many desks altogether?</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">9 × 30 = 270</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">8 × 25 = 200</span></span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span><span class=\"math\">270 + 200 = 470</span> desks</span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Product and difference</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Which number is 38 less than the product of 17 and 4?</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Product: <span class=\"math\">17 × 4 = 68</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>38 less: <span class=\"math\">68 − 38 = 30</span></span></div></div><div class=\"g4-sim\" id=\"s305\"><h4>🎮 Equal Groups</h4><p class=\"how\">Solve each problem. Then check your answer to see the steps.</p><div class=\"score-pill\" data-k=\"count\" style=\"display:inline-block;margin-bottom:8px\"></div><div class=\"g4-hero\" data-k=\"card\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"next\">Next</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, num, stk } = window.G4;\r\n  const out = q(root, 'out'), card = q(root, 'card');\r\n  let i = 0, score = 0, tries = 0;\r\n  function show() { const p = L.problems[i]; card.innerHTML = stk(p.s) + '<p>' + p.t + '</p>'; q(root, 'count').textContent = L.of(i + 1, L.problems.length); q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.hint; }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return; const p = L.problems[i];\r\n    if (t.dataset.k === 'check') { const v = num(String(q(root, 'ans').value).replace(/^r/i, '')), ok = v === p.a; tries++; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + '<br>' + p.w.join('<br>') + '<br>' + L.score(score, tries); }\r\n    else if (t.dataset.k === 'next') { i = (i + 1) % L.problems.length; show(); }\r\n  });\r\n  show();\r\n})(__rev({\"problems\":[{\"t\":\"An egg box holds 6 eggs. How many eggs are in 8 boxes?\",\"a\":48,\"w\":[\"8 × 6 = 48 eggs\"],\"s\":\"chicken\"},{\"t\":\"A school has 9 classrooms with 30 desks in each. How many desks are there?\",\"a\":270,\"w\":[\"9 × 30 = 9 × 3 tens = 27 tens = 270 desks\"],\"s\":\"wooden-chair\"},{\"t\":\"A taxi carries 15 people. How many people do 4 full taxis carry?\",\"a\":60,\"w\":[\"15 × 4 = (10 × 4) + (5 × 4) = 40 + 20 = 60 people\"],\"s\":\"car\"},{\"t\":\"Movie tickets cost R25 each. How much do 6 tickets cost? (Rand)\",\"a\":150,\"w\":[\"25 × 6 = (20 × 6) + (5 × 6) = 120 + 30 = R150\"],\"s\":\"child\"},{\"t\":\"A farmer plants 8 rows of mealies with 12 plants in each row. How many plants is that?\",\"a\":96,\"w\":[\"8 × 12 = (8 × 10) + (8 × 2) = 80 + 16 = 96 plants\"],\"s\":\"mealie\"}],\"of\":{\"__fn\":\"(a, b) => 'Problem ' + a + ' of ' + b\"},\"hint\":\"Look for equal groups. How many groups, and how many in each?\",\"yes\":\"Correct!\",\"no\":\"Not yet. Here is how:\",\"score\":{\"__fn\":\"(a, b) => 'Score: ' + a + ' out of ' + b + '.'\"}}), document.getElementById('s305')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Draw a quick picture of the groups if you are not sure what to do.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Which number is 38 less than the product of 17 and 4?",
     "answer": "30",
     "topic": "Multiplication problems"
    },
    {
     "type": "input",
     "text": "A school has 30 desks in each of 9 classrooms and 25 desks in each of 8 classrooms. How many desks are there altogether?",
     "answer": "470",
     "topic": "Multiplication problems"
    },
    {
     "type": "input",
     "text": "An egg box holds 6 eggs. How many eggs are in 8 boxes?",
     "answer": "48",
     "topic": "Multiplication problems"
    },
    {
     "type": "input",
     "text": "Tickets cost R15 each. How much do 6 tickets cost? (Rand)",
     "answer": "90",
     "topic": "Multiplication problems"
    },
    {
     "type": "mc",
     "text": "Which word tells you to multiply?",
     "options": [
      "difference",
      "product",
      "left",
      "less"
     ],
     "answer": 1,
     "topic": "Multiplication problems"
    },
    {
     "type": "input",
     "text": "A taxi carries 15 people. How many people do 4 full taxis carry?",
     "answer": "60",
     "topic": "Multiplication problems"
    },
    {
     "type": "input",
     "text": "There are 7 days in a week. How many days are there in 9 weeks?",
     "answer": "63",
     "topic": "Multiplication problems"
    },
    {
     "type": "input",
     "text": "Pencils cost R4 each. Thabo buys 12 pencils and pays with R50. How much change does he get? (Rand)",
     "answer": "2",
     "topic": "Multiplication problems"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 3,
  "chapterName": "Multiplication, Multiples and Factors",
  "topics": [
   {
    "name": "Multiplying",
    "questions": [
     {
      "num": "1",
      "text": "Write each as a multiplication and work out the answer:",
      "parts": [
       {
        "label": "a)",
        "text": "3 + 3 + 3 + 3 + 3",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "8 + 8 + 8",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "6 rows of 9 desks",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Multiples",
    "questions": [
     {
      "num": "2",
      "text": "Write down:",
      "parts": [
       {
        "label": "a)",
        "text": "the first 10 multiples of 6",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "the multiples of 7 between 40 and 70",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "two numbers that are multiples of both 3 and 5",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Doubling and ×10, ×100, ×1 000",
    "questions": [
     {
      "num": "3",
      "text": "Double each number:",
      "parts": [
       {
        "label": "a)",
        "text": "35",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "124",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "409",
        "marks": 1
       }
      ]
     },
     {
      "num": "4",
      "text": "Calculate:",
      "parts": [
       {
        "label": "a)",
        "text": "56 × 10",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "56 × 100",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "56 × 1 000",
        "marks": 1
       }
      ]
     }
    ]
   },
   {
    "name": "Factors and splitting",
    "questions": [
     {
      "num": "5",
      "text": "List all the factors of:",
      "parts": [
       {
        "label": "a)",
        "text": "12",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "20",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "30",
        "marks": 2
       }
      ]
     },
     {
      "num": "6",
      "text": "Use the distributive property to calculate:",
      "parts": [
       {
        "label": "a)",
        "text": "4 × 17",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "6 × 24",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Multiplication problems",
    "questions": [
     {
      "num": "7",
      "text": "Solve. Show your working.",
      "parts": [
       {
        "label": "a)",
        "text": "There are 24 learners in each of 4 classes. How many learners are there?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "A box holds 9 apples. How many apples are in 7 boxes, and how many more are needed to make 70?",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "Which number is 25 more than the product of 8 and 6?",
        "marks": 2
       }
      ]
     }
    ]
   }
  ]
 },
 "answerKey": {
  "chapter": 3,
  "chapterName": "Chapter 3 — Multiplication, Multiples and Factors",
  "topics": [
   {
    "name": "Multiplying",
    "answers": [
     {
      "num": "Q1a",
      "ans": "5 × 3 = 15",
      "note": ""
     },
     {
      "num": "Q1b",
      "ans": "3 × 8 = 24",
      "note": ""
     },
     {
      "num": "Q1c",
      "ans": "6 × 9 = 54",
      "note": ""
     }
    ]
   },
   {
    "name": "Multiples",
    "answers": [
     {
      "num": "Q2a",
      "ans": "6; 12; 18; 24; 30; 36; 42; 48; 54; 60",
      "note": ""
     },
     {
      "num": "Q2b",
      "ans": "42; 49; 56; 63",
      "note": ""
     },
     {
      "num": "Q2c",
      "ans": "e.g. 15 and 30",
      "note": "Multiples of 15"
     }
    ]
   },
   {
    "name": "Doubling and ×10, ×100, ×1 000",
    "answers": [
     {
      "num": "Q3a",
      "ans": "70",
      "note": ""
     },
     {
      "num": "Q3b",
      "ans": "248",
      "note": ""
     },
     {
      "num": "Q3c",
      "ans": "818",
      "note": ""
     },
     {
      "num": "Q4a",
      "ans": "560",
      "note": ""
     },
     {
      "num": "Q4b",
      "ans": "5 600",
      "note": ""
     },
     {
      "num": "Q4c",
      "ans": "56 000",
      "note": ""
     }
    ]
   },
   {
    "name": "Factors and splitting",
    "answers": [
     {
      "num": "Q5a",
      "ans": "1, 2, 3, 4, 6, 12",
      "note": ""
     },
     {
      "num": "Q5b",
      "ans": "1, 2, 4, 5, 10, 20",
      "note": ""
     },
     {
      "num": "Q5c",
      "ans": "1, 2, 3, 5, 6, 10, 15, 30",
      "note": ""
     },
     {
      "num": "Q6a",
      "ans": "(4 × 10) + (4 × 7) = 40 + 28 = 68",
      "note": ""
     },
     {
      "num": "Q6b",
      "ans": "(6 × 20) + (6 × 4) = 120 + 24 = 144",
      "note": ""
     }
    ]
   },
   {
    "name": "Multiplication problems",
    "answers": [
     {
      "num": "Q7a",
      "ans": "24 × 4 = 96 learners",
      "note": "(20 × 4) + (4 × 4)"
     },
     {
      "num": "Q7b",
      "ans": "7 × 9 = 63; 70 − 63 = 7 more",
      "note": ""
     },
     {
      "num": "Q7c",
      "ans": "8 × 6 = 48; 48 + 25 = 73",
      "note": ""
     }
    ]
   }
  ]
 }
});
