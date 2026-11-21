// Math Magician — Grade 4, Chapter 5 (Multiple Operations and Number Sentences)
// Generated from one bilingual source (scripts/math-gr4/gen_ch5.js); edit both languages there.
MathMagician.registerChapter(5, {
 "topics": [
  {
   "id": 501,
   "chapter": 5,
   "name": "Which comes first?",
   "fullName": "Calculations with more than one operation",
   "lesson": {
    "heading": "Calculations with more than one operation",
    "sub": "Chapter 5 · Topic 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/robot.webp\" srcset=\"/assets/stickers/robot@2x.webp 2x\" alt=\"\"><p>When a calculation has more than one operation, we must do them in the <strong>right order</strong>, or we get the wrong answer.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 The order</div><p><strong>1.</strong> Brackets ( ) first. <strong>2.</strong> Then × and ÷, from left to right. <strong>3.</strong> Then + and −, from left to right.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Worked examples</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">12 × 9 − 9 ÷ 3 = 108 − 3 = 105</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">(124 + 16) ÷ 7 = 140 ÷ 7 = 20</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">23 × 8 − (110 − 26) = 184 − 84 = 100</span></span></div></div><div class=\"g4-sim\" id=\"s501\"><h4>🎮 Which First?</h4><p class=\"how\">Tap the operation that must be done first. Keep going until only the answer is left.</p><div class=\"g4-row\" data-k=\"expr\" style=\"gap:6px;min-height:60px\"></div><ul class=\"g4-steps\" data-k=\"hist\"></ul><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd } = window.G4;\r\n  const expr = q(root, 'expr'), out = q(root, 'out'), hist = q(root, 'hist');\r\n  let toks = [], mistakes = 0;\r\n  const TEMPLATES = [\r\n    () => [rnd(2, 20), '+', rnd(2, 9), '×', rnd(2, 9)],\r\n    () => [rnd(50, 99), '−', rnd(2, 9), '×', rnd(2, 5)],\r\n    () => { const c = rnd(2, 9), s = c * rnd(3, 12), a = rnd(1, s - 1); return ['(', a, '+', s - a, ')', '÷', c]; },\r\n    () => { const d = rnd(2, 5); return [rnd(4, 9), '×', rnd(3, 9), '−', d * rnd(2, 9), '÷', d]; },\r\n    () => { const b = rnd(10, 30), c = rnd(2, 9); return [rnd(40, 99), '−', '(', b, '−', c, ')']; },\r\n    () => [rnd(2, 12), '×', '(', rnd(2, 9), '+', rnd(2, 9), ')']\r\n  ];\r\n  const isOp = t => typeof t === 'string' && '+−×÷'.includes(t);\r\n  function nextOp(t) {\r\n    let best = -1, depth = 0, bestScore = -1;\r\n    t.forEach((x, i) => {\r\n      if (x === '(') depth++; else if (x === ')') depth--;\r\n      else if (isOp(x) && typeof t[i - 1] === 'number' && typeof t[i + 1] === 'number') {\r\n        const score = depth * 10 + ('×÷'.includes(x) ? 2 : 1);\r\n        if (score > bestScore) { bestScore = score; best = i; }\r\n      }\r\n    });\r\n    return best;\r\n  }\r\n  function apply(t, i) {\r\n    const a = t[i - 1], b = t[i + 1], op = t[i], v = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;\r\n    const n = t.slice(0, i - 1).concat([v], t.slice(i + 2));\r\n    for (let k = 1; k < n.length - 1; k++) if (n[k - 1] === '(' && typeof n[k] === 'number' && n[k + 1] === ')') { n.splice(k + 1, 1); n.splice(k - 1, 1); k = 0; }\r\n    return n;\r\n  }\r\n  const show = t => t.map(x => x).join(' ').replace(/\\( /g, '(').replace(/ \\)/g, ')');\r\n  function draw() {\r\n    if (toks.length === 1) { expr.innerHTML = '<span class=\"g4-big\">= ' + toks[0] + '</span>'; out.className = 'g4-out good'; out.innerHTML = L.done(toks[0], mistakes); return; }\r\n    expr.innerHTML = toks.map((x, i) => isOp(x) && typeof toks[i - 1] === 'number' && typeof toks[i + 1] === 'number' ? '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"font-size:24px;min-width:52px\">' + x + '</button>' : '<span class=\"g4-big\" style=\"font-size:28px\">' + x + '</span>').join(' ');\r\n  }\r\n  function fresh() { toks = TEMPLATES[rnd(0, TEMPLATES.length - 1)](); mistakes = 0; hist.innerHTML = '<li><b>' + show(toks) + '</b></li>'; out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.i) {\r\n      const i = +t.dataset.i, want = nextOp(toks);\r\n      if (i !== want) { mistakes++; out.className = 'g4-out bad'; out.innerHTML = L.notFirst(toks[i], toks[want]); return; }\r\n      const sub = toks[i - 1] + ' ' + toks[i] + ' ' + toks[i + 1];\r\n      toks = apply(toks, i);\r\n      hist.innerHTML += '<li>' + L.step(sub) + ' → <b>' + show(toks) + '</b></li>'; out.className = 'g4-out'; out.innerHTML = L.good; draw();\r\n    } else if (t.dataset.k === 'new') fresh();\r\n  });\r\n  fresh();\r\n})(__rev({\"ask\":\"Tap the operation you must do first.\",\"good\":\"Yes! Now what comes next?\",\"notFirst\":{\"__fn\":\"(a, b) => 'Not yet. Do the ' + b + ' first' + (a === b ? ' (the one on the left)' : '') + '. Remember: brackets first, then × and ÷, then + and −.'\"},\"step\":{\"__fn\":\"s => s\"},\"done\":{\"__fn\":\"(v, m) => 'The answer is <b>' + v + '</b>. ' + (m ? 'You had ' + m + ' wrong ' + (m === 1 ? 'try' : 'tries') + '.' : 'Perfect order!')\"}}), document.getElementById('s501')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Brackets change the answer: <span class=\"math\">2 + 3 × 4 = 14</span>, but <span class=\"math\">(2 + 3) × 4 = 20</span>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "12 × 9 − 9 ÷ 3 = ?",
     "answer": "105",
     "topic": "Which comes first?"
    },
    {
     "type": "input",
     "text": "(124 + 16) ÷ 7 = ?",
     "answer": "20",
     "topic": "Which comes first?"
    },
    {
     "type": "mc",
     "text": "In 5 + 4 × 3, what do you do first?",
     "options": [
      "5 + 4",
      "4 × 3",
      "either one"
     ],
     "answer": 1,
     "topic": "Which comes first?"
    },
    {
     "type": "input",
     "text": "5 + 4 × 3 = ?",
     "answer": "17",
     "topic": "Which comes first?"
    },
    {
     "type": "input",
     "text": "23 × 8 − (110 − 26) = ?",
     "answer": "100",
     "topic": "Which comes first?"
    },
    {
     "type": "input",
     "text": "(20 − 8) × 5 = ?",
     "answer": "60",
     "topic": "Which comes first?"
    },
    {
     "type": "input",
     "text": "36 ÷ 4 + 6 × 2 = ?",
     "answer": "21",
     "topic": "Which comes first?"
    },
    {
     "type": "mc",
     "text": "Which one equals 20?",
     "options": [
      "(2 + 3) × 4",
      "2 + 3 × 4",
      "2 × 3 + 4",
      "2 + 3 + 4"
     ],
     "answer": 0,
     "topic": "Which comes first?"
    }
   ]
  },
  {
   "id": 502,
   "chapter": 5,
   "name": "Missing numbers",
   "fullName": "Completing number sentences",
   "lesson": {
    "heading": "Completing number sentences",
    "sub": "Chapter 5 · Topic 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/scales.webp\" srcset=\"/assets/stickers/scales@2x.webp 2x\" alt=\"\"><p>A <strong>number sentence</strong> uses numbers and signs, like <span class=\"math\">□ + 18 = 36</span>. The box stands for a missing number.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Find the missing number</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">□ + 18 = 36</span>: which number plus 18 makes 36? <strong>18</strong>, because <span class=\"math\">36 − 18 = 18</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">(4 + □) × 6 = 42</span>: something times 6 is 42, so the bracket is 7. Then <span class=\"math\">4 + □ = 7</span>, so □ = <strong>3</strong>.</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Check by substitution</div><p>Put your answer in the box and work it out: <span class=\"math\">(4 + 3) × 6 = 7 × 6 = 42</span> ✓. If both sides are equal, you are right.</p></div><div class=\"g4-sim\" id=\"s502\"><h4>🎮 Balance It</h4><p class=\"how\">A number sentence is like a balance: both sides must be equal. Find the number in the box.</p><div class=\"g4-big\" data-k=\"sent\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 240\" data-k=\"svg\" role=\"img\" aria-label=\"balance\"></svg></div><div class=\"g4-row\"><span style=\"font-size:20px\">□ =</span><input class=\"g4-input\" data-k=\"box\" inputmode=\"numeric\" aria-label=\"box\"><button class=\"g4-btn\" data-k=\"try\">Try</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, num } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'box');\r\n  let P = null;\r\n  const PUZ = [\r\n    () => { const x = rnd(5, 40), b = rnd(5, 40); return { txt: x2 => (x2 ?? '□') + ' + ' + b, rhs: x + b, f: v => v + b, x }; },\r\n    () => { const x = rnd(20, 90), b = rnd(5, x - 1); return { txt: x2 => (x2 ?? '□') + ' − ' + b, rhs: x - b, f: v => v - b, x }; },\r\n    () => { const x = rnd(2, 12), a = rnd(2, 9); return { txt: x2 => a + ' × ' + (x2 ?? '□'), rhs: a * x, f: v => a * v, x }; },\r\n    () => { const x = rnd(2, 9), a = rnd(2, 9), b = rnd(3, 9); return { txt: x2 => '(' + a + ' + ' + (x2 ?? '□') + ') × ' + b, rhs: (a + x) * b, f: v => (a + v) * b, x }; },\r\n    () => { const d = rnd(2, 9), qq = rnd(2, 12); return { txt: x2 => (x2 ?? '□') + ' ÷ ' + d, rhs: qq, f: v => v / d, x: d * qq }; }\r\n  ];\r\n  function draw(v) {\r\n    const left = v == null ? null : P.f(v), diff = left == null ? 0 : Math.max(-1, Math.min(1, (left - P.rhs) / Math.max(10, P.rhs)));\r\n    const ang = -diff * 14, ok = left === P.rhs;\r\n    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180), L1 = [320 - 210 * c, 80 - 210 * s], R1 = [320 + 210 * c, 80 + 210 * s];\r\n    let h = '<path d=\"M300 220 L340 220 L320 84 Z\" fill=\"#475569\"/><line x1=\"' + L1[0] + '\" y1=\"' + L1[1] + '\" x2=\"' + R1[0] + '\" y2=\"' + R1[1] + '\" stroke=\"#e2e8f0\" stroke-width=\"6\" stroke-linecap=\"round\"/>';\r\n    [[L1, P.txt(v), '#60a5fa'], [R1, String(P.rhs), '#f472b6']].forEach(([p, t, col]) => { h += '<line x1=\"' + p[0] + '\" y1=\"' + p[1] + '\" x2=\"' + p[0] + '\" y2=\"' + (p[1] + 50) + '\" stroke=\"#94a3b8\" stroke-width=\"2\"/><rect x=\"' + (p[0] - 95) + '\" y=\"' + (p[1] + 50) + '\" width=\"190\" height=\"56\" rx=\"12\" fill=\"rgba(255,255,255,.06)\" stroke=\"' + col + '\" stroke-width=\"3\"/><text x=\"' + p[0] + '\" y=\"' + (p[1] + 86) + '\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"22\" font-weight=\"900\">' + t + '</text>'; });\r\n    if (ok) h += '<text x=\"320\" y=\"40\" text-anchor=\"middle\" fill=\"#4ade80\" font-size=\"22\" font-weight=\"900\">' + L.balanced + '</text>';\r\n    svg.innerHTML = h;\r\n    q(root, 'sent').textContent = P.txt() + ' = ' + P.rhs;\r\n    if (v == null) { out.className = 'g4-out'; out.innerHTML = L.ask; }\r\n    else { out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = L.sub(P.txt(v), left, P.rhs, ok) + (ok ? '' : ' ' + (left < P.rhs ? L.bigger : L.smaller)); }\r\n  }\r\n  function fresh() { P = PUZ[rnd(0, PUZ.length - 1)](); inp.value = ''; draw(null); }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'try') { const v = num(inp.value); if (v != null) draw(v); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n  });\r\n  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { const v = num(inp.value); if (v != null) draw(v); } });\r\n  fresh();\r\n})(__rev({\"ask\":\"What number goes in the box? Type it and tap Try.\",\"balanced\":\"Balanced!\",\"sub\":{\"__fn\":\"(t, l, r, ok) => 'Check: ' + t + ' = ' + l + (ok ? ' = ' + r + ' ✓' : ', but we need ' + r + '.')\"},\"bigger\":\"Try a bigger number.\",\"smaller\":\"Try a smaller number.\"}), document.getElementById('s502')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Use the opposite operation: if □ + 25 = 50, then □ = 50 − 25.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "□ + 18 = 36. What is □?",
     "answer": "18",
     "topic": "Missing numbers"
    },
    {
     "type": "input",
     "text": "(4 + □) × 6 = 42. What is □?",
     "answer": "3",
     "topic": "Missing numbers"
    },
    {
     "type": "input",
     "text": "□ − 25 = 50. What is □?",
     "answer": "75",
     "topic": "Missing numbers"
    },
    {
     "type": "input",
     "text": "7 × □ = 63. What is □?",
     "answer": "9",
     "topic": "Missing numbers"
    },
    {
     "type": "input",
     "text": "□ ÷ 5 = 12. What is □?",
     "answer": "60",
     "topic": "Missing numbers"
    },
    {
     "type": "mc",
     "text": "Check by substitution: is □ = 9 correct for □ × 4 = 32?",
     "options": [
      "Yes",
      "No"
     ],
     "answer": 1,
     "topic": "Missing numbers"
    },
    {
     "type": "input",
     "text": "100 − □ = 64. What is □?",
     "answer": "36",
     "topic": "Missing numbers"
    },
    {
     "type": "input",
     "text": "3 × □ + 5 = 26. What is □?",
     "answer": "7",
     "topic": "Missing numbers"
    }
   ]
  },
  {
   "id": 503,
   "chapter": 5,
   "name": "Writing number sentences",
   "fullName": "Writing number sentences from words",
   "lesson": {
    "heading": "Writing number sentences from words",
    "sub": "Chapter 5 · Topic 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/paper.webp\" srcset=\"/assets/stickers/paper@2x.webp 2x\" alt=\"\"><p>We can turn words into a <strong>number sentence</strong>, using a box or a letter for the number we do not know.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ From words to symbols</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>\"A number is 3 more than t\" → <span class=\"math\">□ = t + 3</span> (or <span class=\"math\">□ − 3 = t</span>)</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>\"Eight more than a number is 20\" → <span class=\"math\">□ + 8 = 20</span>, so □ = 12</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>\"Six times a number is 42\" → <span class=\"math\">6 × □ = 42</span>, so □ = 7</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Words that help</div><p><strong>more than, plus, add</strong> → + &nbsp; <strong>less than, minus</strong> → − &nbsp; <strong>times, product</strong> → × &nbsp; <strong>divided by, shared</strong> → ÷ &nbsp; <strong>is, makes</strong> → =</p></div><div class=\"g4-sim\" id=\"s503\"><h4>🎮 Words to Sentences</h4><p class=\"how\">Read the words. Choose the number sentence that matches, then work out the missing number.</p><div class=\"score-pill\" data-k=\"count\" style=\"display:inline-block;margin-bottom:8px\"></div><div class=\"g4-out\" data-k=\"card\" style=\"margin-bottom:10px\"></div><div class=\"g4-row\" data-k=\"opts\"></div><div class=\"g4-row\" data-k=\"solve\" style=\"display:none\"><span style=\"font-size:20px\">□ =</span><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Check</button></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"next\">Next</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, num, shuffle } = window.G4;\r\n  const card = q(root, 'card'), opts = q(root, 'opts'), out = q(root, 'out'), solve = q(root, 'solve');\r\n  let i = 0, stage = 0, score = 0;\r\n  function show() {\r\n    const p = L.items[i]; stage = 0;\r\n    card.innerHTML = '<p style=\"font-size:21px;margin:0\">' + p.w + '</p>';\r\n    q(root, 'count').textContent = L.of(i + 1, L.items.length);\r\n    opts.innerHTML = shuffle(p.o.map((o, k) => [o, k])).map(([o, k]) => '<button class=\"g4-btn ghost\" data-o=\"' + k + '\" style=\"font-size:20px\">' + o + '</button>').join('');\r\n    solve.style.display = 'none'; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.pick;\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return; const p = L.items[i];\r\n    if (t.dataset.o != null && stage === 0) {\r\n      const ok = +t.dataset.o === 0;\r\n      if (!ok) { out.className = 'g4-out bad'; out.innerHTML = L.notThat; t.disabled = true; return; }\r\n      stage = 1; opts.querySelectorAll('button').forEach(b => { b.disabled = true; if (+b.dataset.o === 0) b.setAttribute('aria-pressed', 'true'); });\r\n      solve.style.display = ''; out.className = 'g4-out good'; out.innerHTML = L.nowSolve(p.o[0]);\r\n    } else if (t.dataset.k === 'check') {\r\n      const v = num(q(root, 'ans').value), ok = v === p.a; if (ok && stage === 1) { score++; stage = 2; }\r\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.yes(p.o[0].replace('□', '<b>' + p.a + '</b>')) : L.no;\r\n    } else if (t.dataset.k === 'next') { i = (i + 1) % L.items.length; show(); }\r\n  });\r\n  show();\r\n})(__rev({\"items\":[{\"w\":\"Eight more than a number is 20.\",\"o\":[\"□ + 8 = 20\",\"□ − 8 = 20\",\"8 × □ = 20\",\"20 + 8 = □\"],\"a\":12},{\"w\":\"Six times a number is 42.\",\"o\":[\"6 × □ = 42\",\"□ + 6 = 42\",\"42 × 6 = □\",\"□ ÷ 6 = 42\"],\"a\":7},{\"w\":\"A number divided by 4 is 9.\",\"o\":[\"□ ÷ 4 = 9\",\"4 ÷ □ = 9\",\"□ × 4 = 9\",\"□ − 4 = 9\"],\"a\":36},{\"w\":\"15 less than a number is 20.\",\"o\":[\"□ − 15 = 20\",\"15 − □ = 20\",\"□ + 15 = 20\",\"20 − 15 = □\"],\"a\":35},{\"w\":\"I think of a number, add 4, then multiply by 6. I get 42.\",\"o\":[\"(□ + 4) × 6 = 42\",\"□ + 4 × 6 = 42\",\"(□ × 4) + 6 = 42\",\"□ × 6 + 4 = 42\"],\"a\":3},{\"w\":\"Thandi had some marbles. She got 15 more and now has 42.\",\"o\":[\"□ + 15 = 42\",\"□ − 15 = 42\",\"42 + 15 = □\",\"15 × □ = 42\"],\"a\":27}],\"of\":{\"__fn\":\"(a, b) => a + ' of ' + b\"},\"pick\":\"Which number sentence matches the words?\",\"notThat\":\"Not that one. Read the words again.\",\"nowSolve\":{\"__fn\":\"s => 'Yes: <b>' + s + '</b>. Now find □.'\"},\"yes\":{\"__fn\":\"s => 'Correct! ' + s + ' ✓'\"},\"no\":\"Not yet. Check by putting your number in the box.\"}), document.getElementById('s503')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>\"15 less than a number\" means start with the number and take 15 away: □ − 15.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Which number sentence means \"a number is 3 more than t\"?",
     "options": [
      "□ = t + 3",
      "□ = t − 3",
      "□ = 3 × t",
      "t = □ + 3"
     ],
     "answer": 0,
     "topic": "Writing number sentences"
    },
    {
     "type": "mc",
     "text": "Which number sentence means \"eight more than a number is 20\"?",
     "options": [
      "□ + 8 = 20",
      "□ − 8 = 20",
      "8 × □ = 20",
      "20 + 8 = □"
     ],
     "answer": 0,
     "topic": "Writing number sentences"
    },
    {
     "type": "input",
     "text": "□ + 8 = 20. What is □?",
     "answer": "12",
     "topic": "Writing number sentences"
    },
    {
     "type": "mc",
     "text": "Which number sentence means \"four times a number is 48\"?",
     "options": [
      "4 × □ = 48",
      "□ + 4 = 48",
      "48 × 4 = □",
      "□ − 4 = 48"
     ],
     "answer": 0,
     "topic": "Writing number sentences"
    },
    {
     "type": "input",
     "text": "Thandi had some marbles. She got 15 more and now has 42. How many did she have at first?",
     "answer": "27",
     "topic": "Writing number sentences"
    },
    {
     "type": "input",
     "text": "I think of a number, multiply it by 5 and add 3. The answer is 38. What is my number?",
     "answer": "7",
     "topic": "Writing number sentences"
    },
    {
     "type": "mc",
     "text": "Which number sentence means \"a number divided by 6 is 7\"?",
     "options": [
      "□ ÷ 6 = 7",
      "6 ÷ □ = 7",
      "□ × 6 = 7",
      "□ − 6 = 7"
     ],
     "answer": 0,
     "topic": "Writing number sentences"
    },
    {
     "type": "input",
     "text": "□ ÷ 6 = 7. What is □?",
     "answer": "42",
     "topic": "Writing number sentences"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 5,
  "chapterName": "Multiple Operations and Number Sentences",
  "topics": [
   {
    "name": "Which comes first?",
    "questions": [
     {
      "num": "1",
      "text": "Calculate. Show each step.",
      "parts": [
       {
        "label": "a)",
        "text": "8 + 6 × 5",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "(8 + 6) × 5",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "100 − 48 ÷ 6",
        "marks": 2
       },
       {
        "label": "d)",
        "text": "9 × 7 − 4 × 8",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Missing numbers",
    "questions": [
     {
      "num": "2",
      "text": "Find the missing number. Check by substitution.",
      "parts": [
       {
        "label": "a)",
        "text": "□ + 47 = 100",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "□ × 8 = 72",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "(□ − 3) × 5 = 35",
        "marks": 3
       },
       {
        "label": "d)",
        "text": "120 ÷ □ = 10",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Writing number sentences",
    "questions": [
     {
      "num": "3",
      "text": "Write a number sentence for each, then find the number.",
      "parts": [
       {
        "label": "a)",
        "text": "A number plus 26 is 70.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Nine times a number is 81.",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "A number minus 14 is 36.",
        "marks": 2
       },
       {
        "label": "d)",
        "text": "I think of a number, double it and add 5. I get 29.",
        "marks": 3
       }
      ]
     }
    ]
   }
  ]
 },
 "answerKey": {
  "chapter": 5,
  "chapterName": "Chapter 5 — Multiple Operations and Number Sentences",
  "topics": [
   {
    "name": "Which comes first?",
    "answers": [
     {
      "num": "Q1a",
      "ans": "38",
      "note": "8 + 30"
     },
     {
      "num": "Q1b",
      "ans": "70",
      "note": "14 × 5"
     },
     {
      "num": "Q1c",
      "ans": "92",
      "note": "100 − 8"
     },
     {
      "num": "Q1d",
      "ans": "31",
      "note": "63 − 32"
     }
    ]
   },
   {
    "name": "Missing numbers",
    "answers": [
     {
      "num": "Q2a",
      "ans": "53",
      "note": "53 + 47 = 100"
     },
     {
      "num": "Q2b",
      "ans": "9",
      "note": "9 × 8 = 72"
     },
     {
      "num": "Q2c",
      "ans": "10",
      "note": "(10 − 3) × 5 = 35"
     },
     {
      "num": "Q2d",
      "ans": "12",
      "note": "120 ÷ 12 = 10"
     }
    ]
   },
   {
    "name": "Writing number sentences",
    "answers": [
     {
      "num": "Q3a",
      "ans": "□ + 26 = 70; □ = 44",
      "note": ""
     },
     {
      "num": "Q3b",
      "ans": "9 × □ = 81; □ = 9",
      "note": ""
     },
     {
      "num": "Q3c",
      "ans": "□ − 14 = 36; □ = 50",
      "note": ""
     },
     {
      "num": "Q3d",
      "ans": "2 × □ + 5 = 29; □ = 12",
      "note": "29 − 5 = 24; 24 ÷ 2 = 12"
     }
    ]
   }
  ]
 }
});
