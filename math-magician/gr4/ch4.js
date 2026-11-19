// Math Magician — Grade 4, Chapter 4 (Multiplication and Division)
// Generated from one bilingual source (scripts/math-gr4/gen_ch4.js); edit both languages there.
MathMagician.registerChapter(4, {
 "topics": [
  {
   "id": 401,
   "chapter": 4,
   "name": "Dividing",
   "fullName": "Dividing with the times tables",
   "lesson": {
    "heading": "Dividing with the times tables",
    "sub": "Chapter 4 · Topic 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/pap-bowl.webp\" srcset=\"/assets/stickers/pap-bowl@2x.webp 2x\" alt=\"\"><p><strong>Dividing</strong> means sharing equally or making equal groups. We use our times tables to divide: <span class=\"math\">72 ÷ 9 = 8</span> because <span class=\"math\">9 × 8 = 72</span>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Remainders</div><p>Sometimes a number does not divide exactly. What is left over is the <strong>remainder</strong>: <span class=\"math\">74 ÷ 9 = 8 remainder 2</span>, because <span class=\"math\">9 × 8 = 72</span> and 2 is left.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Division as jumping back</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">8 − 2 − 2 − 2 − 2 = 0</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>That is 4 jumps of 2, so <span class=\"math\">8 ÷ 2 = 4</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Order matters: <span class=\"math\">125 ÷ 5</span> is not the same as <span class=\"math\">5 ÷ 125</span>.</span></div></div><div class=\"g4-sim\" id=\"s401\"><h4>🎮 Jump Back</h4><p class=\"how\">Choose a number and what to divide by. Watch the jumps go back to 0. Anything that does not make a full jump is the remainder.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-s=\"n:-1\">−</button><span class=\"g4-big\" data-k=\"n\" style=\"min-width:48px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"n:1\">+</button><span class=\"g4-big\">÷</span><button class=\"g4-btn ghost\" data-s=\"d:-1\">−</button><span class=\"g4-big\" data-k=\"d\" style=\"min-width:48px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"d:1\">+</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 150\" data-k=\"svg\" role=\"img\" aria-label=\"number line\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  let n = 74, d = 9;\r\n  function draw() {\r\n    q(root, 'n').textContent = n; q(root, 'd').textContent = d;\r\n    const k = Math.floor(n / d), r = n % d, max = Math.max(10, Math.ceil(n / 10) * 10), X = v => 30 + v / max * 580;\r\n    let h = '<line x1=\"30\" y1=\"110\" x2=\"610\" y2=\"110\" stroke=\"#e2e8f0\" stroke-width=\"3\"/>';\r\n    for (let v = 0; v <= max; v += (max > 60 ? 10 : 5)) h += '<line x1=\"' + X(v) + '\" y1=\"102\" x2=\"' + X(v) + '\" y2=\"118\" stroke=\"#e2e8f0\" stroke-width=\"2\"/><text x=\"' + X(v) + '\" y=\"138\" text-anchor=\"middle\" fill=\"rgba(226,232,240,.7)\" font-size=\"13\">' + v + '</text>';\r\n    for (let i = 0; i < k; i++) { const a = X(n - i * d), b = X(n - (i + 1) * d); h += '<path d=\"M' + a + ' 106 Q' + ((a + b) / 2) + ' ' + (106 - Math.min(58, 12 + (a - b) * 0.6)) + ' ' + b + ' 106\" fill=\"none\" stroke=\"#f472b6\" stroke-width=\"3\"/>'; }\r\n    h += '<circle cx=\"' + X(n) + '\" cy=\"110\" r=\"8\" fill=\"#fde047\"/>';\r\n    if (r) h += '<rect x=\"' + X(0) + '\" y=\"100\" width=\"' + (X(r) - X(0)) + '\" height=\"20\" rx=\"4\" fill=\"rgba(250,204,21,.35)\"/><text x=\"' + ((X(0) + X(r)) / 2) + '\" y=\"92\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"14\" font-weight=\"800\">' + L.left(r) + '</text>';\r\n    svg.innerHTML = h;\r\n    out.innerHTML = '<b>' + n + ' ÷ ' + d + ' = ' + k + (r ? ' ' + L.rem + ' ' + r : '') + '</b><br>' + L.jumps(k, d, r) + '<br>' + L.check(d, k, r, n);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t || !t.dataset.s) return;\r\n    const [k, s] = t.dataset.s.split(':'); if (k === 'n') n = Math.max(1, Math.min(100, n + +s)); else d = Math.max(2, Math.min(12, d + +s)); draw();\r\n  });\r\n  draw();\r\n})(__rev({\"rem\":\"remainder\",\"left\":{\"__fn\":\"r => r + ' left'\"},\"jumps\":{\"__fn\":\"(k, d, r) => 'Jump back in ' + d + 's: ' + k + ' jumps' + (r ? ', and ' + r + ' is left over.' : ' land exactly on 0.')\"},\"check\":{\"__fn\":\"(d, k, r, n) => 'Check: ' + d + ' × ' + k + (r ? ' + ' + r : '') + ' = ' + n\"}}), document.getElementById('s401')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Your tables work for bigger numbers too: <span class=\"math\">132 ÷ 12 = 11</span> because <span class=\"math\">12 × 11 = 132</span>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "72 ÷ 9 = ?",
     "answer": "8",
     "topic": "Dividing"
    },
    {
     "type": "mc",
     "text": "74 ÷ 9 = ?",
     "options": [
      "8 remainder 2",
      "8",
      "9 remainder 2",
      "7 remainder 11"
     ],
     "answer": 0,
     "topic": "Dividing"
    },
    {
     "type": "input",
     "text": "132 ÷ 12 = ?",
     "answer": "11",
     "topic": "Dividing"
    },
    {
     "type": "mc",
     "text": "Can we swap the numbers in a division? Is 125 ÷ 5 the same as 5 ÷ 125?",
     "options": [
      "Yes",
      "No"
     ],
     "answer": 1,
     "topic": "Dividing"
    },
    {
     "type": "input",
     "text": "8 − 2 − 2 − 2 − 2 = 0. So 8 ÷ 2 = ?",
     "answer": "4",
     "topic": "Dividing"
    },
    {
     "type": "input",
     "text": "56 ÷ 7 = ?",
     "answer": "8",
     "topic": "Dividing"
    },
    {
     "type": "input",
     "text": "45 ÷ 6 = 7 remainder ___",
     "answer": "3",
     "topic": "Dividing"
    },
    {
     "type": "input",
     "text": "90 ÷ 10 = ?",
     "answer": "9",
     "topic": "Dividing"
    }
   ]
  },
  {
   "id": 402,
   "chapter": 4,
   "name": "Halving, even and odd",
   "fullName": "Halving numbers, even and odd numbers",
   "lesson": {
    "heading": "Halving numbers, even and odd numbers",
    "sub": "Chapter 4 · Topic 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/apple.webp\" srcset=\"/assets/stickers/apple@2x.webp 2x\" alt=\"\"><p><strong>Halving</strong> means dividing by 2, or sharing into 2 equal parts. Half of 8 is 4.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Halve by breaking down</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Half of 94: half of 90 is 45 and half of 4 is 2, so <strong>47</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Half of 216: half of 200 is 100 and half of 16 is 8, so <strong>108</strong>.</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Even and odd</div><p><strong>Even</strong> numbers divide exactly by 2: 376 is even. <strong>Odd</strong> numbers leave a remainder of 1: 377 is odd. Look at the last digit!</p></div><div class=\"g4-sim\" id=\"s402\"><h4>🎮 Halving Machine</h4><p class=\"how\">Type a number (or tap one). The machine halves it and tells you if it is even or odd. Small numbers are shown as pairs of dots.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"n\" value=\"94\" inputmode=\"numeric\" aria-label=\"number\"><button class=\"g4-btn ghost\" data-v=\"8\">8</button><button class=\"g4-btn ghost\" data-v=\"15\">15</button><button class=\"g4-btn ghost\" data-v=\"94\">94</button><button class=\"g4-btn ghost\" data-v=\"216\">216</button><button class=\"g4-btn ghost\" data-v=\"377\">377</button></div><div class=\"g4-stage\"><svg data-k=\"svg\" role=\"img\" aria-label=\"pairs\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, num, fmt } = window.G4;\r\n  const inp = q(root, 'n'), out = q(root, 'out'), svg = q(root, 'svg');\r\n  function draw() {\r\n    let v = num(inp.value); if (v == null || v < 0) v = 0; v = Math.min(998, v);\r\n    const even = v % 2 === 0, parts = v >= 100 ? [Math.floor(v / 100) * 100, v % 100] : v >= 10 ? [Math.floor(v / 10) * 10, v % 10] : [v];\r\n    let h = '';\r\n    if (v <= 40) { for (let i = 0; i < v; i++) { const pair = Math.floor(i / 2), top = i % 2; h += '<circle cx=\"' + (30 + pair * 30) + '\" cy=\"' + (30 + top * 34) + '\" r=\"12\" fill=\"' + (i === v - 1 && !even ? '#fde047' : '#60a5fa') + '\"/>'; } svg.setAttribute('viewBox', '0 0 640 100'); svg.innerHTML = h; svg.parentNode.style.display = ''; }\r\n    else svg.parentNode.style.display = 'none';\r\n    const halfSteps = parts.length > 1 && parts[1] ? L.halfParts(parts.map(fmt), parts.map(p => fmt(p / 2))) : '';\r\n    out.innerHTML = (even ? '<b>' + L.half(fmt(v), fmt(v / 2)) + '</b>' + (halfSteps ? '<br>' + halfSteps : '') : '<b>' + L.halfOdd(fmt(v), fmt(Math.floor(v / 2))) + '</b>') + '<br>' + (even ? L.even(fmt(v)) : L.odd(fmt(v))) + (v <= 40 ? '<br>' + (even ? L.pairsEven : L.pairsOdd) : '');\r\n  }\r\n  inp.addEventListener('input', draw);\r\n  root.addEventListener('click', e => { const t = e.target.closest('button'); if (t && t.dataset.v) { inp.value = t.dataset.v; draw(); } });\r\n  draw();\r\n})(__rev({\"half\":{\"__fn\":\"(v, h) => 'Half of ' + v + ' = ' + v + ' ÷ 2 = ' + h\"},\"halfParts\":{\"__fn\":\"(p, h) => 'Break it down: half of ' + p.join(' + ') + ' = ' + h.join(' + ')\"},\"halfOdd\":{\"__fn\":\"(v, h) => v + ' ÷ 2 = ' + h + ' remainder 1'\"},\"even\":{\"__fn\":\"v => v + ' is <b>even</b>: it divides exactly by 2.'\"},\"odd\":{\"__fn\":\"v => v + ' is <b>odd</b>: dividing by 2 leaves a remainder of 1.'\"},\"pairsEven\":\"Every dot has a partner.\",\"pairsOdd\":\"One dot (yellow) has no partner.\"}), document.getElementById('s402')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>The even numbers between 237 and 251 are 238, 240, 242, 244, 246, 248 and 250.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "What is half of 94?",
     "answer": "47",
     "topic": "Halving, even and odd"
    },
    {
     "type": "input",
     "text": "What is half of 216?",
     "answer": "108",
     "topic": "Halving, even and odd"
    },
    {
     "type": "mc",
     "text": "Which number is odd?",
     "options": [
      "376",
      "377",
      "378",
      "380"
     ],
     "answer": 1,
     "topic": "Halving, even and odd"
    },
    {
     "type": "input",
     "text": "What is half of 8?",
     "answer": "4",
     "topic": "Halving, even and odd"
    },
    {
     "type": "mc",
     "text": "Which are the even numbers between 237 and 241?",
     "options": [
      "238; 240",
      "237; 239; 241",
      "238; 239; 240",
      "240 only"
     ],
     "answer": 0,
     "topic": "Halving, even and odd"
    },
    {
     "type": "input",
     "text": "What is half of 150?",
     "answer": "75",
     "topic": "Halving, even and odd"
    },
    {
     "type": "mc",
     "text": "When you divide an odd number by 2, the remainder is…",
     "options": [
      "0",
      "1",
      "2",
      "3"
     ],
     "answer": 1,
     "topic": "Halving, even and odd"
    },
    {
     "type": "input",
     "text": "What is half of 538?",
     "answer": "269",
     "topic": "Halving, even and odd"
    }
   ]
  },
  {
   "id": 403,
   "chapter": 4,
   "name": "Dividing bigger numbers",
   "fullName": "Dividing 3-digit numbers by 1-digit numbers",
   "lesson": {
    "heading": "Dividing 3-digit numbers by 1-digit numbers",
    "sub": "Chapter 4 · Topic 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/bread-loaf.webp\" srcset=\"/assets/stickers/bread-loaf@2x.webp 2x\" alt=\"\"><p>To divide a big number, <strong>break it into parts</strong> that are easy to divide, like multiples of 10 times the number you divide by.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ 192 ÷ 8</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Write 192 as multiples of 8: <span class=\"math\">192 = 160 + 32</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">160 ÷ 8 = 20</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">32 ÷ 8 = 4</span></span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>So <span class=\"math\">192 ÷ 8 = 20 + 4 = 24</span>. Check: <span class=\"math\">24 × 8 = 192</span> ✓</span></div></div><div class=\"g4-sim\" id=\"s403\"><h4>🎮 Break-it-down Divider</h4><p class=\"how\">Work it out first and type your answer. Then see how to take away big groups until nothing is left.</p><div class=\"g4-big\" data-k=\"sum\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"next\">Next step</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><ul class=\"g4-steps\" data-k=\"steps\"></ul><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd } = window.G4;\r\n  const list = q(root, 'steps'), out = q(root, 'out');\r\n  let n, d, shown;\r\n  function chunks() {\r\n    const st = []; let left = n, total = 0;\r\n    while (left > 0) {\r\n      let m = 1; if (left >= d * 100) m = Math.floor(left / (d * 100)) * 100; else if (left >= d * 10) m = Math.floor(left / (d * 10)) * 10; else m = Math.floor(left / d);\r\n      st.push([left, m]); total += m; left -= d * m;\r\n    }\r\n    return { st, total };\r\n  }\r\n  function draw() {\r\n    q(root, 'sum').textContent = n + ' ÷ ' + d + ' = ?';\r\n    const { st, total } = chunks();\r\n    const rows = st.map(([left, m]) => L.take(d, m, d * m, left, left - d * m));\r\n    rows.push(L.add(st.map(s => s[1]).join(' + '), total));\r\n    list.innerHTML = rows.slice(0, shown).map(r => '<li>' + r + '</li>').join('');\r\n    q(root, 'next').disabled = shown >= rows.length;\r\n  }\r\n  function fresh() { d = rnd(3, 9); const ans = rnd(12, 99); n = d * ans; if (n > 999 || n < 100) return fresh(); shown = 0; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.tryFirst; draw(); }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'next') { shown++; draw(); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'ans').value), ok = v === n / d; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right(n / d, d, n) : L.wrong; }\r\n  });\r\n  fresh(); n = 192; d = 8; draw();\r\n})(__rev({\"take\":{\"__fn\":\"(d, m, p, from, left) => 'Take away ' + d + ' × ' + m + ' = ' + p + ' → ' + from + ' − ' + p + ' = <b>' + left + '</b>'\"},\"add\":{\"__fn\":\"(parts, t) => 'Add up the groups: ' + parts + ' = <b>' + t + '</b>'\"},\"tryFirst\":\"Try it first, then tap Next step to see the breakdown.\",\"right\":{\"__fn\":\"(q, d, n) => 'Correct! Check: ' + q + ' × ' + d + ' = ' + n\"},\"wrong\":\"Not yet. Tap Next step for help.\"}), document.getElementById('s403')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Estimate first: <span class=\"math\">298 ÷ 3</span> is about <span class=\"math\">300 ÷ 3 = 100</span>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "192 ÷ 8 = ?",
     "answer": "24",
     "topic": "Dividing bigger numbers"
    },
    {
     "type": "input",
     "text": "96 ÷ 4 = ?",
     "answer": "24",
     "topic": "Dividing bigger numbers"
    },
    {
     "type": "input",
     "text": "135 ÷ 5 = ?",
     "answer": "27",
     "topic": "Dividing bigger numbers"
    },
    {
     "type": "mc",
     "text": "192 = 160 + 32. 160 ÷ 8 = 20 and 32 ÷ 8 = 4. So 192 ÷ 8 = ?",
     "options": [
      "24",
      "20",
      "4",
      "28"
     ],
     "answer": 0,
     "topic": "Dividing bigger numbers"
    },
    {
     "type": "input",
     "text": "252 ÷ 6 = ?",
     "answer": "42",
     "topic": "Dividing bigger numbers"
    },
    {
     "type": "input",
     "text": "168 ÷ 7 = ?",
     "answer": "24",
     "topic": "Dividing bigger numbers"
    },
    {
     "type": "mc",
     "text": "What is the best estimate for 298 ÷ 3?",
     "options": [
      "about 10",
      "about 100",
      "about 1 000",
      "about 300"
     ],
     "answer": 1,
     "topic": "Dividing bigger numbers"
    },
    {
     "type": "input",
     "text": "455 ÷ 5 = ?",
     "answer": "91",
     "topic": "Dividing bigger numbers"
    }
   ]
  },
  {
   "id": 404,
   "chapter": 4,
   "name": "Multiplication and division",
   "fullName": "Multiplication and division undo each other",
   "lesson": {
    "heading": "Multiplication and division undo each other",
    "sub": "Chapter 4 · Topic 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/scales.webp\" srcset=\"/assets/stickers/scales@2x.webp 2x\" alt=\"\"><p>Multiplication and division are opposites: one <strong>undoes</strong> the other.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 The converse relationship</div><p>If <span class=\"math\">47 × 9 = 423</span>, then <span class=\"math\">423 ÷ 47 = 9</span> and <span class=\"math\">423 ÷ 9 = 47</span>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Use it to check and to find missing numbers</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Check <span class=\"math\">192 ÷ 8 = 24</span>: work out <span class=\"math\">24 × 8 = 192</span> ✓</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>The product of two numbers is 405. One number is 9. The other is <span class=\"math\">405 ÷ 9 = 45</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">___ × 7 = 84</span>: work out <span class=\"math\">84 ÷ 7 = 12</span>.</span></div></div><div class=\"g4-sim\" id=\"s404\"><h4>🎮 Times-and-Share Triangle</h4><p class=\"how\">Change the two numbers at the bottom and see the whole family. Tap Quiz me to find a missing number.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"a\" value=\"9\" inputmode=\"numeric\" aria-label=\"first number\"><span class=\"g4-big\">×</span><input class=\"g4-input\" data-k=\"b\" value=\"47\" inputmode=\"numeric\" aria-label=\"second number\"><button class=\"g4-btn ghost\" data-k=\"quiz\">Quiz me</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 200\" data-k=\"svg\" role=\"img\" aria-label=\"fact family\"></svg></div><ul class=\"g4-steps\" data-k=\"facts\"></ul><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), list = q(root, 'facts'), ai = q(root, 'a'), bi = q(root, 'b');\r\n  let hide = -1, F = [];\r\n  function draw() {\r\n    const a = Math.max(1, window.G4.num(ai.value) || 1), b = Math.max(1, window.G4.num(bi.value) || 1), c = a * b;\r\n    svg.innerHTML = '<path d=\"M320 20 L180 180 L460 180 Z\" fill=\"rgba(158,212,60,.08)\" stroke=\"#9ed43c\" stroke-width=\"3\"/><circle cx=\"320\" cy=\"58\" r=\"36\" fill=\"#0d1016\" stroke=\"#fde047\" stroke-width=\"3\"/><text x=\"320\" y=\"65\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"22\" font-weight=\"900\">' + c + '</text><circle cx=\"225\" cy=\"150\" r=\"34\" fill=\"#0d1016\" stroke=\"#60a5fa\" stroke-width=\"3\"/><text x=\"225\" y=\"157\" text-anchor=\"middle\" fill=\"#93c5fd\" font-size=\"22\" font-weight=\"900\">' + a + '</text><circle cx=\"415\" cy=\"150\" r=\"34\" fill=\"#0d1016\" stroke=\"#f472b6\" stroke-width=\"3\"/><text x=\"415\" y=\"157\" text-anchor=\"middle\" fill=\"#f9a8d4\" font-size=\"22\" font-weight=\"900\">' + b + '</text><text x=\"320\" y=\"150\" text-anchor=\"middle\" fill=\"#c3e56f\" font-size=\"26\" font-weight=\"900\">× ÷</text>';\r\n    F = [[a, '×', b, c], [b, '×', a, c], [c, '÷', a, b], [c, '÷', b, a]];\r\n    list.innerHTML = F.map((f, i) => '<li>' + (i === hide ? f[0] + ' ' + f[1] + ' ' + f[2] + ' = <input class=\"g4-input\" data-k=\"blank\" inputmode=\"numeric\" style=\"width:100px\"> <button class=\"g4-btn\" data-k=\"check\">' + L.check + '</button>' : '<b>' + f.slice(0, 3).join(' ') + ' = ' + f[3] + '</b>') + '</li>').join('');\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'quiz') { ai.value = rnd(3, 12); bi.value = rnd(11, 49); hide = rnd(2, 3); draw(); out.className = 'g4-out'; out.innerHTML = L.fill; }\r\n    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'blank').value), ok = v === F[hide][3]; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right : L.wrong; }\r\n  });\r\n  [ai, bi].forEach(el => el.addEventListener('input', () => { hide = -1; draw(); out.className = 'g4-out'; out.innerHTML = L.explain; }));\r\n  draw(); out.innerHTML = L.explain;\r\n})(__rev({\"check\":\"Check\",\"explain\":\"Multiplication and division undo each other. One fact gives you four!\",\"fill\":\"Fill in the missing number.\",\"right\":\"Correct! Division undoes multiplication.\",\"wrong\":\"Not yet. Look at the multiplication fact at the top.\"}), document.getElementById('s404')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>If you know <span class=\"math\">25 × 4 = 100</span>, you also know <span class=\"math\">100 ÷ 4 = 25</span> and <span class=\"math\">100 ÷ 25 = 4</span>.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "If 47 × 9 = 423, then 423 ÷ 9 = ?",
     "options": [
      "47",
      "9",
      "423",
      "432"
     ],
     "answer": 0,
     "topic": "Multiplication and division"
    },
    {
     "type": "input",
     "text": "If 6 × 8 = 48, then 48 ÷ 6 = ?",
     "answer": "8",
     "topic": "Multiplication and division"
    },
    {
     "type": "mc",
     "text": "Which fact belongs to the family of 7 × 9 = 63?",
     "options": [
      "63 ÷ 7 = 9",
      "63 − 7 = 9",
      "9 ÷ 63 = 7",
      "7 + 9 = 63"
     ],
     "answer": 0,
     "topic": "Multiplication and division"
    },
    {
     "type": "input",
     "text": "The product of two numbers is 405. One number is 9. What is the other number?",
     "answer": "45",
     "topic": "Multiplication and division"
    },
    {
     "type": "input",
     "text": "___ × 7 = 84",
     "answer": "12",
     "topic": "Multiplication and division"
    },
    {
     "type": "input",
     "text": "Check 192 ÷ 8 = 24 by multiplying: 24 × 8 = ?",
     "answer": "192",
     "topic": "Multiplication and division"
    },
    {
     "type": "input",
     "text": "360 ÷ ___ = 40",
     "answer": "9",
     "topic": "Multiplication and division"
    },
    {
     "type": "mc",
     "text": "25 × 4 = 100. So 100 ÷ 25 = ?",
     "options": [
      "4",
      "25",
      "100",
      "75"
     ],
     "answer": 0,
     "topic": "Multiplication and division"
    }
   ]
  },
  {
   "id": 405,
   "chapter": 4,
   "name": "Sharing problems",
   "fullName": "Solving division problems",
   "lesson": {
    "heading": "Solving division problems",
    "sub": "Chapter 4 · Topic 5",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/child.webp\" srcset=\"/assets/stickers/child@2x.webp 2x\" alt=\"\"><p>Division problems are about <strong>sharing equally</strong> or making <strong>equal groups</strong>. Key words: <strong>each, share equally, per group, per packet</strong>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Sharing with a remainder</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>580 apples are shared equally between 18 people.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">18 × 30 = 540</span>, and <span class=\"math\">580 − 540 = 40</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">18 × 2 = 36</span>, and <span class=\"math\">40 − 36 = 4</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>Each person gets <strong>32</strong> apples, and <strong>4</strong> are left over.</span></div></div><div class=\"g4-sim\" id=\"s405\"><h4>🎮 Fair Share</h4><p class=\"how\">Choose how many sweets and how many children. Tap Deal one round to give each child one more, until there are not enough to go around.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-s=\"n:-1\">−</button><span class=\"g4-big\" data-k=\"n\" style=\"min-width:48px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"n:1\">+</button><span class=\"g4-big\">÷</span><button class=\"g4-btn ghost\" data-s=\"k:-1\">−</button><span class=\"g4-big\" data-k=\"k\" style=\"min-width:48px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"k:1\">+</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 250\" data-k=\"svg\" role=\"img\" aria-label=\"sharing\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"deal\">Deal one round</button><button class=\"g4-btn ghost\" data-k=\"all\">Deal all</button><button class=\"g4-btn ghost\" data-k=\"reset\">Start again</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, stk } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  let n = 50, k = 6, dealt = 0;\r\n  function draw() {\r\n    q(root, 'n').textContent = n; q(root, 'k').textContent = k;\r\n    const each = Math.floor(dealt / k), W = 600 / k, cols = Math.max(1, Math.floor((W - 16) / 14)), boxH = Math.max(70, 30 + Math.ceil(Math.ceil(n / k) / cols) * 14), Y = boxH + 30;\r\n    let h = '';\r\n    for (let g = 0; g < k; g++) {\r\n      const x = 20 + g * W; h += '<rect x=\"' + (x + 4) + '\" y=\"10\" width=\"' + (W - 8) + '\" height=\"' + boxH + '\" rx=\"12\" fill=\"rgba(255,255,255,.04)\" stroke=\"rgba(226,232,240,.25)\"/>';\r\n      const got = Math.floor(dealt / k) + (g < dealt % k ? 1 : 0);\r\n      for (let i = 0; i < got; i++) { h += '<circle cx=\"' + (x + 14 + (i % cols) * 14) + '\" cy=\"' + (26 + Math.floor(i / cols) * 14) + '\" r=\"5.5\" fill=\"#f472b6\"/>'; }\r\n    }\r\n    const left = n - dealt;\r\n    for (let i = 0; i < left; i++) h += '<circle cx=\"' + (24 + (i % 40) * 15) + '\" cy=\"' + (Y + Math.floor(i / 40) * 15) + '\" r=\"5.5\" fill=\"#fde047\"/>';\r\n    svg.setAttribute('viewBox', '0 0 640 ' + (Y + 18 + Math.floor(Math.max(0, left - 1) / 40) * 15));\r\n    svg.innerHTML = h;\r\n    const done = n - dealt < k;\r\n    q(root, 'deal').disabled = done;\r\n    out.className = 'g4-out' + (done ? ' good' : '');\r\n    out.innerHTML = done ? '<b>' + n + ' ÷ ' + k + ' = ' + Math.floor(n / k) + (n % k ? ' ' + L.rem + ' ' + (n % k) : '') + '</b><br>' + L.result(Math.floor(n / k), n % k) : L.dealing(each, n - dealt);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.s) { const [w, s] = t.dataset.s.split(':'); if (w === 'n') n = Math.max(1, Math.min(80, n + +s)); else k = Math.max(2, Math.min(8, k + +s)); dealt = 0; }\r\n    else if (t.dataset.k === 'deal') { if (n - dealt >= k) dealt += k; }\r\n    else if (t.dataset.k === 'all') dealt = n - (n % k);\r\n    else if (t.dataset.k === 'reset') dealt = 0;\r\n    draw();\r\n  });\r\n  draw();\r\n})(__rev({\"rem\":\"remainder\",\"dealing\":{\"__fn\":\"(e, l) => 'Each group has ' + e + ' so far. ' + l + ' still to share.'\"},\"result\":{\"__fn\":\"(q, r) => 'Each group gets <b>' + q + '</b>' + (r ? ', and <b>' + r + '</b> ' + (r === 1 ? 'is' : 'are') + ' left over (the yellow ones).' : ', with nothing left over.')\"}}), document.getElementById('s405')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Think about what the remainder means. If 245 eggs go into boxes of 6, there are 40 full boxes and 5 eggs over, so you need <strong>41</strong> boxes to hold them all.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "580 apples are shared equally between 18 people. How many apples does each person get?",
     "answer": "32",
     "topic": "Sharing problems"
    },
    {
     "type": "input",
     "text": "580 apples are shared equally between 18 people. How many apples are left over?",
     "answer": "4",
     "topic": "Sharing problems"
    },
    {
     "type": "input",
     "text": "96 learners make teams of 8. How many teams are there?",
     "answer": "12",
     "topic": "Sharing problems"
    },
    {
     "type": "input",
     "text": "Five friends share R135 equally. How much does each friend get? (Rand)",
     "answer": "27",
     "topic": "Sharing problems"
    },
    {
     "type": "mc",
     "text": "Which words tell you to divide?",
     "options": [
      "altogether",
      "share equally",
      "more than",
      "product"
     ],
     "answer": 1,
     "topic": "Sharing problems"
    },
    {
     "type": "input",
     "text": "50 sweets are shared equally among 6 children. How many sweets does each child get?",
     "answer": "8",
     "topic": "Sharing problems"
    },
    {
     "type": "input",
     "text": "50 sweets are shared equally among 6 children. How many sweets are left over?",
     "answer": "2",
     "topic": "Sharing problems"
    },
    {
     "type": "input",
     "text": "245 eggs are packed into boxes of 6. How many boxes are completely full?",
     "answer": "40",
     "topic": "Sharing problems"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 4,
  "chapterName": "Multiplication and Division",
  "topics": [
   {
    "name": "Dividing",
    "questions": [
     {
      "num": "1",
      "text": "Calculate. Give the remainder if there is one.",
      "parts": [
       {
        "label": "a)",
        "text": "63 ÷ 7",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "58 ÷ 6",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "96 ÷ 8",
        "marks": 1
       },
       {
        "label": "d)",
        "text": "100 ÷ 9",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Halving, even and odd",
    "questions": [
     {
      "num": "2",
      "text": "Halve each number:",
      "parts": [
       {
        "label": "a)",
        "text": "64",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "138",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "452",
        "marks": 2
       }
      ]
     },
     {
      "num": "3",
      "text": "Write down all the odd numbers between 160 and 172.",
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
    "name": "Dividing bigger numbers",
    "questions": [
     {
      "num": "4",
      "text": "Calculate by breaking down. Check each answer by multiplying.",
      "parts": [
       {
        "label": "a)",
        "text": "144 ÷ 6",
        "marks": 3
       },
       {
        "label": "b)",
        "text": "235 ÷ 5",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "312 ÷ 8",
        "marks": 3
       }
      ]
     }
    ]
   },
   {
    "name": "Multiplication and division",
    "questions": [
     {
      "num": "5",
      "text": "Write the four facts in the family of 8 × 12 = 96.",
      "parts": [
       {
        "label": "",
        "text": "",
        "marks": 4
       }
      ]
     },
     {
      "num": "6",
      "text": "Find the missing number:",
      "parts": [
       {
        "label": "a)",
        "text": "___ × 6 = 72",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "135 ÷ ___ = 27",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Sharing problems",
    "questions": [
     {
      "num": "7",
      "text": "Solve. Show your working and say what the remainder means.",
      "parts": [
       {
        "label": "a)",
        "text": "R96 is shared equally among 4 children. How much does each child get?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "75 learners go on a trip. Each minibus takes 8 learners. How many minibuses are needed?",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "138 marbles are put into bags of 5. How many full bags are there, and how many marbles are left?",
        "marks": 3
       }
      ]
     }
    ]
   }
  ]
 },
 "answerKey": {
  "chapter": 4,
  "chapterName": "Chapter 4 — Multiplication and Division",
  "topics": [
   {
    "name": "Dividing",
    "answers": [
     {
      "num": "Q1a",
      "ans": "9",
      "note": ""
     },
     {
      "num": "Q1b",
      "ans": "9 remainder 4",
      "note": "6 × 9 = 54"
     },
     {
      "num": "Q1c",
      "ans": "12",
      "note": ""
     },
     {
      "num": "Q1d",
      "ans": "11 remainder 1",
      "note": "9 × 11 = 99"
     }
    ]
   },
   {
    "name": "Halving, even and odd",
    "answers": [
     {
      "num": "Q2a",
      "ans": "32",
      "note": ""
     },
     {
      "num": "Q2b",
      "ans": "69",
      "note": ""
     },
     {
      "num": "Q2c",
      "ans": "226",
      "note": "200 + 26"
     },
     {
      "num": "Q3",
      "ans": "161; 163; 165; 167; 169; 171",
      "note": ""
     }
    ]
   },
   {
    "name": "Dividing bigger numbers",
    "answers": [
     {
      "num": "Q4a",
      "ans": "24",
      "note": "120 + 24; 20 + 4"
     },
     {
      "num": "Q4b",
      "ans": "47",
      "note": "200 + 35; 40 + 7"
     },
     {
      "num": "Q4c",
      "ans": "39",
      "note": "240 + 72; 30 + 9"
     }
    ]
   },
   {
    "name": "Multiplication and division",
    "answers": [
     {
      "num": "Q5",
      "ans": "8 × 12 = 96; 12 × 8 = 96; 96 ÷ 8 = 12; 96 ÷ 12 = 8",
      "note": ""
     },
     {
      "num": "Q6a",
      "ans": "12",
      "note": "72 ÷ 6"
     },
     {
      "num": "Q6b",
      "ans": "5",
      "note": "27 × 5 = 135"
     }
    ]
   },
   {
    "name": "Sharing problems",
    "answers": [
     {
      "num": "Q7a",
      "ans": "R24",
      "note": "96 ÷ 4 = 24"
     },
     {
      "num": "Q7b",
      "ans": "10 minibuses",
      "note": "75 ÷ 8 = 9 remainder 3, so the 3 learners need one more minibus"
     },
     {
      "num": "Q7c",
      "ans": "27 full bags, 3 left over",
      "note": "5 × 27 = 135"
     }
    ]
   }
  ]
 }
});
