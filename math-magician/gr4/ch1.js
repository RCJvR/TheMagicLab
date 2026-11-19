// Math Magician — Grade 4, Chapter 1 (Whole Numbers)
// Generated from one bilingual source (gen_ch1.js); edit both languages together.
MathMagician.registerChapter(1, {
 "topics": [
  {
   "id": 101,
   "chapter": 1,
   "name": "Counting in intervals",
   "fullName": "Counting forwards and backwards in intervals",
   "lesson": {
    "heading": "Counting forwards and backwards in intervals",
    "sub": "Chapter 1 · Topic 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/frog.webp\" srcset=\"/assets/stickers/frog@2x.webp 2x\" alt=\"\"><p>We can count forwards and backwards in <strong>jumps of the same size</strong>, called <strong>intervals</strong>: 2s, 3s, 5s, 10s, 25s, 50s, 100s, and even 9s, 49s and 99s.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Odd and even</div><p><strong>Even numbers</strong> end in 0, 2, 4, 6 or 8. <strong>Odd numbers</strong> end in 1, 3, 5, 7 or 9. Counting in 2s from an odd number gives only odd numbers.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Worked examples</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Count in 2s from 31: <span class=\"math\">31; 33; 35; 37; 39</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Count in 3s from 110: <span class=\"math\">110; 113; 116; 119</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Count in 9s from 267: add 10, take away 1 → <span class=\"math\">267; 276; 285; 294</span></span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>Count backwards in 5s from 624: <span class=\"math\">624; 619; 614; 609; 604</span></span></div></div><div class=\"g4-sim\" id=\"s101\"><h4>🎮 Frog Hops</h4><p class=\"how\">Choose a start number and a jump size. Tap Hop and watch the frog count for you.</p><div class=\"g4-row\"><label style=\"font-size:18px\">Start at <input class=\"g4-input\" data-k=\"start\" value=\"31\" inputmode=\"numeric\"></label></div><div class=\"g4-row\" data-k=\"steps\"></div><div class=\"g4-row\" data-k=\"dir\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 175\" data-k=\"svg\" role=\"img\" aria-label=\"Frog Hops\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"hop\">Hop!</button><button class=\"g4-btn ghost\" data-k=\"reset\">Start again</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { fmt, q } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out'), startEl = q(root, 'start');\n  let step = 2, dir = 1, seq = [];\n  const STEPS = [2, 3, 5, 10, 25, 50, 100, 9];\n  q(root, 'steps').innerHTML = STEPS.map(s => '<button class=\"g4-btn ghost\" data-s=\"' + s + '\">' + L.inS(s) + '</button>').join('');\n  q(root, 'dir').innerHTML = '<button class=\"g4-btn ghost\" data-d=\"1\">' + L.fwd + '</button><button class=\"g4-btn ghost\" data-d=\"-1\">' + L.back + '</button>';\n  const mark = () => {\n    root.querySelectorAll('[data-s]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.s === step));\n    root.querySelectorAll('[data-d]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.d === dir));\n  };\n  const reset = () => { const v = window.G4.num(startEl.value); seq = [v == null ? 0 : Math.max(0, Math.min(9999, v))]; draw(); };\n  function draw() {\n    mark();\n    const show = seq.slice(-6), x0 = 50, gap = 108;\n    let h = '<line x1=\"20\" y1=\"120\" x2=\"620\" y2=\"120\" stroke=\"rgba(226,232,240,.5)\" stroke-width=\"3\"/>';\n    show.forEach((n, i) => {\n      const x = x0 + i * gap;\n      h += '<line x1=\"' + x + '\" y1=\"110\" x2=\"' + x + '\" y2=\"130\" stroke=\"#e2e8f0\" stroke-width=\"3\"/><text x=\"' + x + '\" y=\"158\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"800\">' + fmt(n) + '</text>';\n      if (i > 0) h += '<path d=\"M' + (x - gap + 6) + ' 108 Q' + (x - gap / 2) + ' 52 ' + (x - 6) + ' 108\" fill=\"none\" stroke=\"#9ed43c\" stroke-width=\"3\" stroke-dasharray=\"6 5\"/><text x=\"' + (x - gap / 2) + '\" y=\"62\" text-anchor=\"middle\" fill=\"#c3e56f\" font-size=\"16\" font-weight=\"800\">' + (dir > 0 ? '+' : '−') + step + '</text>';\n    });\n    const fx = x0 + (show.length - 1) * gap;\n    h += '<image href=\"/assets/stickers/frog.webp\" x=\"' + (fx - 30) + '\" y=\"44\" width=\"60\" height=\"60\"/>';\n    svg.innerHTML = h;\n    let msg = '<b>' + seq.map(fmt).join('; ') + '</b>';\n    if (seq.length > 2) msg += '<br>' + L.pattern(step, dir);\n    if (step === 9 && seq.length > 1) msg += '<br>' + L.nine(dir);\n    out.innerHTML = msg;\n  }\n  root.addEventListener('click', e => {\n    const b = e.target.closest('button'); if (!b) return;\n    if (b.dataset.s) { step = +b.dataset.s; reset(); }\n    else if (b.dataset.d) { dir = +b.dataset.d; reset(); }\n    else if (b.dataset.k === 'hop') {\n      const nx = seq[seq.length - 1] + dir * step;\n      if (nx < 0) { out.innerHTML = L.belowZero; return; }\n      if (nx > 10000) { out.innerHTML = L.tooBig; return; }\n      seq.push(nx); draw();\n    } else if (b.dataset.k === 'reset') reset();\n  });\n  startEl.addEventListener('change', reset);\n  reset();\n})(__rev({\"title\":\"Frog Hops\",\"how\":\"Choose a start number and a jump size. Tap Hop and watch the frog count for you.\",\"start\":\"Start at\",\"hop\":\"Hop!\",\"reset\":\"Start again\",\"fwd\":\"Forwards\",\"back\":\"Backwards\",\"inS\":{\"__fn\":\"s => 'in ' + s + 's'\"},\"pattern\":{\"__fn\":\"(s, d) => 'You are counting ' + (d > 0 ? 'forwards' : 'backwards') + ' in ' + s + 's. Each number is ' + s + (d > 0 ? ' more' : ' less') + ' than the one before.'\"},\"nine\":{\"__fn\":\"d => d > 0 ? 'Quick trick for 9s: add 10, then take away 1.' : 'Quick trick for 9s: take away 10, then add 1.'\"},\"belowZero\":\"We cannot go below 0 in Grade 4. Start again or count forwards.\",\"tooBig\":\"That is more than 10 000. Start again.\"}), document.getElementById('s101')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>To find the next number in a pattern, ask: <strong>how much does it go up or down each time?</strong> Example: 769; 719; 669 … goes down by 50, so the next number is 619.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Count in 2s: 31; 33; 35; ___",
     "answer": "37",
     "topic": "Counting in intervals"
    },
    {
     "type": "input",
     "text": "Count in 3s: 110; 113; 116; ___",
     "answer": "119",
     "topic": "Counting in intervals"
    },
    {
     "type": "input",
     "text": "Count in 9s: 267; 276; 285; ___",
     "answer": "294",
     "topic": "Counting in intervals"
    },
    {
     "type": "input",
     "text": "Count in 25s: 450; 475; 500; ___",
     "answer": "525",
     "topic": "Counting in intervals"
    },
    {
     "type": "input",
     "text": "Count backwards in 5s: 624; 619; 614; ___",
     "answer": "609",
     "topic": "Counting in intervals"
    },
    {
     "type": "mc",
     "text": "Which number is <strong>odd</strong>?",
     "options": [
      "4 356",
      "7 218",
      "5 093",
      "1 000"
     ],
     "answer": 2,
     "topic": "Counting in intervals"
    },
    {
     "type": "input",
     "text": "What is the next number? 769; 719; 669; ___",
     "answer": "619",
     "topic": "Counting in intervals"
    },
    {
     "type": "input",
     "text": "Count backwards in 20s: 624; 604; 584; ___",
     "answer": "564",
     "topic": "Counting in intervals"
    }
   ]
  },
  {
   "id": 102,
   "chapter": 1,
   "name": "Place value",
   "fullName": "Place value of digits in 4-digit numbers",
   "lesson": {
    "heading": "Place value of digits in 4-digit numbers",
    "sub": "Chapter 1 · Topic 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/child.webp\" srcset=\"/assets/stickers/child@2x.webp 2x\" alt=\"\"><p>Every digit in a number has a <strong>place</strong>, and its place gives it a <strong>value</strong>. In <strong>4 371</strong>, the 4 is worth 4 000, but the 1 is worth only 1.</p></div><table class=\"g4-chart\"><tr><th>Thousands</th><th>Hundreds</th><th>Tens</th><th>Units</th></tr><tr><td>4</td><td>3</td><td>7</td><td>1</td></tr></table><div class=\"def-box\"><div class=\"def-box-title\">📖 Expanded notation</div><p>We can break a number into the values of its digits: <span class=\"math\">4 371 = 4 000 + 300 + 70 + 1</span>. This is called <strong>expanded notation</strong>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Worked example</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>In 4 371, the <strong>4</strong> is in the thousands place: its value is <strong>4 000</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>The <strong>3</strong> is in the hundreds place: its value is <strong>300</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>The <strong>7</strong> is in the tens place: its value is <strong>70</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>The <strong>1</strong> is in the units place: its value is <strong>1</strong>.</span></div></div><div class=\"g4-sim\" id=\"s102\"><h4>🎮 Block Builder</h4><p class=\"how\">Use + and − to build a number with blocks. Or tap Challenge and build the number you are given.</p><div class=\"g4-big\" data-k=\"num\">0</div><table class=\"g4-chart\" data-k=\"chart\"></table><div class=\"g4-stage\"><svg viewBox=\"0 0 640 200\" data-k=\"svg\" role=\"img\" aria-label=\"Block Builder\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"challenge\">Challenge</button><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"clear\">Clear</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { fmt, q, rnd } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out');\n  const v = [0, 0, 0, 0]; // thousands, hundreds, tens, units\n  const COL = ['#f472b6', '#60a5fa', '#facc15', '#4ade80'], VAL = [1000, 100, 10, 1];\n  let target = null;\n  const value = () => v[0] * 1000 + v[1] * 100 + v[2] * 10 + v[3];\n  q(root, 'chart').innerHTML = '<tr>' + L.cols.map((c, i) => '<th style=\"color:' + COL[i] + '\">' + c + '</th>').join('') + '</tr><tr>' + v.map((_, i) => '<td data-i=\"' + i + '\">0</td>').join('') + '</tr><tr>' +\n    v.map((_, i) => '<th><button class=\"g4-btn ghost\" data-a=\"' + i + ':-1\" aria-label=\"' + L.minus + ' ' + L.cols[i] + '\">−</button> <button class=\"g4-btn ghost\" data-a=\"' + i + ':1\" aria-label=\"' + L.plus + ' ' + L.cols[i] + '\">+</button></th>').join('') + '</tr>';\n  function blocks() {\n    let h = '', x = 10;\n    for (let k = 0; k < v[0]; k++) { const bx = 10 + (k % 3) * 52, by = 20 + Math.floor(k / 3) * 52; h += '<rect x=\"' + (bx + 8) + '\" y=\"' + (by - 8) + '\" width=\"40\" height=\"40\" fill=\"#9d174d\"/><rect x=\"' + bx + '\" y=\"' + by + '\" width=\"40\" height=\"40\" fill=\"' + COL[0] + '\" stroke=\"#831843\" stroke-width=\"2\"/>'; }\n    x = 175;\n    for (let k = 0; k < v[1]; k++) { const bx = x + (k % 3) * 46, by = 14 + Math.floor(k / 3) * 46; h += '<rect x=\"' + bx + '\" y=\"' + by + '\" width=\"40\" height=\"40\" fill=\"' + COL[1] + '\" stroke=\"#1e3a8a\" stroke-width=\"1.5\"/>'; for (let g = 1; g < 10; g++) h += '<line x1=\"' + (bx + g * 4) + '\" y1=\"' + by + '\" x2=\"' + (bx + g * 4) + '\" y2=\"' + (by + 40) + '\" stroke=\"#1e3a8a\" stroke-width=\".6\"/><line x1=\"' + bx + '\" y1=\"' + (by + g * 4) + '\" x2=\"' + (bx + 40) + '\" y2=\"' + (by + g * 4) + '\" stroke=\"#1e3a8a\" stroke-width=\".6\"/>'; }\n    x = 330;\n    for (let k = 0; k < v[2]; k++) { const bx = x + k * 13; h += '<rect x=\"' + bx + '\" y=\"20\" width=\"9\" height=\"90\" fill=\"' + COL[2] + '\" stroke=\"#713f12\" stroke-width=\"1\"/>'; for (let g = 1; g < 10; g++) h += '<line x1=\"' + bx + '\" y1=\"' + (20 + g * 9) + '\" x2=\"' + (bx + 9) + '\" y2=\"' + (20 + g * 9) + '\" stroke=\"#713f12\" stroke-width=\".6\"/>'; }\n    x = 470;\n    for (let k = 0; k < v[3]; k++) h += '<rect x=\"' + (x + (k % 5) * 16) + '\" y=\"' + (40 + Math.floor(k / 5) * 16) + '\" width=\"12\" height=\"12\" fill=\"' + COL[3] + '\" stroke=\"#14532d\" stroke-width=\"1\"/>';\n    L.cols.forEach((c, i) => { h += '<text x=\"' + [70, 240, 390, 510][i] + '\" y=\"186\" text-anchor=\"middle\" fill=\"' + COL[i] + '\" font-size=\"15\" font-weight=\"800\">' + v[i] + ' × ' + fmt(VAL[i]) + '</text>'; });\n    svg.innerHTML = h;\n  }\n  function draw(checkNow) {\n    root.querySelectorAll('td[data-i]').forEach(td => { td.textContent = v[+td.dataset.i]; });\n    blocks();\n    const n = value(), parts = v.map((d, i) => d * VAL[i]).filter(p => p > 0).map(fmt);\n    q(root, 'num').textContent = fmt(n);\n    let msg = n ? '<b>' + fmt(n) + ' = ' + (parts.join(' + ') || '0') + '</b>' : L.start;\n    if (target != null) msg = L.build(fmt(target)) + '<br>' + msg;\n    out.className = 'g4-out';\n    if (checkNow && target != null) { const ok = n === target; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); msg += '<br>' + (ok ? L.yes : L.notYet); }\n    out.innerHTML = msg;\n  }\n  root.addEventListener('click', e => {\n    const b = e.target.closest('button'); if (!b) return;\n    if (b.dataset.a) { const [i, d] = b.dataset.a.split(':').map(Number); v[i] = Math.max(0, Math.min(9, v[i] + d)); draw(); }\n    else if (b.dataset.k === 'challenge') { target = rnd(1, 9) * 1000 + rnd(0, 9) * 100 + (Math.random() < .3 ? 0 : rnd(0, 9) * 10) + rnd(0, 9); v.fill(0); draw(); }\n    else if (b.dataset.k === 'check') draw(true);\n    else if (b.dataset.k === 'clear') { v.fill(0); target = null; draw(); }\n  });\n  v[0] = 4; v[1] = 3; v[2] = 7; v[3] = 1; draw();\n})(__rev({\"title\":\"Block Builder\",\"how\":\"Use + and − to build a number with blocks. Or tap Challenge and build the number you are given.\",\"cols\":[\"Thousands\",\"Hundreds\",\"Tens\",\"Units\"],\"plus\":\"Add one\",\"minus\":\"Remove one\",\"start\":\"Add some blocks to build a number.\",\"build\":{\"__fn\":\"n => 'Build the number <b>' + n + '</b>.'\"},\"yes\":\"Yes! You built it correctly.\",\"notYet\":\"Not yet. Check each column.\"}), document.getElementById('s102')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>A <strong>0</strong> holds a place. In 3 052 there are no hundreds, so we write 0 in the hundreds place.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "In 4 371, what is the value of the digit 3?",
     "options": [
      "3",
      "30",
      "300",
      "3 000"
     ],
     "answer": 2,
     "topic": "Place value"
    },
    {
     "type": "input",
     "text": "What is the value of the digit 6 in 6 205?",
     "answer": "6000",
     "topic": "Place value"
    },
    {
     "type": "mc",
     "text": "5 000 + 400 + 7 = ?",
     "options": [
      "5 470",
      "5 407",
      "5 047",
      "547"
     ],
     "answer": 1,
     "topic": "Place value"
    },
    {
     "type": "input",
     "text": "Write 8 000 + 300 + 20 + 9 as one number.",
     "answer": "8329",
     "topic": "Place value"
    },
    {
     "type": "mc",
     "text": "Which digit is in the <strong>tens</strong> place in 7 582?",
     "options": [
      "7",
      "5",
      "8",
      "2"
     ],
     "answer": 2,
     "topic": "Place value"
    },
    {
     "type": "input",
     "text": "How many hundreds make 2 600?",
     "answer": "26",
     "topic": "Place value"
    },
    {
     "type": "mc",
     "text": "Which is 9 046 in expanded notation?",
     "options": [
      "9 000 + 400 + 6",
      "9 000 + 40 + 6",
      "900 + 40 + 6",
      "9 000 + 4 + 6"
     ],
     "answer": 1,
     "topic": "Place value"
    },
    {
     "type": "input",
     "text": "Make the <strong>biggest</strong> 4-digit number with the digits 3, 8, 1 and 6.",
     "answer": "8631",
     "topic": "Place value"
    }
   ]
  },
  {
   "id": 103,
   "chapter": 1,
   "name": "Number lines and ordering",
   "fullName": "Number lines, comparing and ordering numbers",
   "lesson": {
    "heading": "Number lines, comparing and ordering numbers",
    "sub": "Chapter 1 · Topic 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/giraffe.webp\" srcset=\"/assets/stickers/giraffe@2x.webp 2x\" alt=\"\"><p>A <strong>number line</strong> shows numbers in order, with equal spaces between the marks. Numbers get <strong>bigger</strong> as you move to the right.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Comparing numbers</div><p><span class=\"math\">&lt;</span> means <strong>is less than</strong>, and <span class=\"math\">&gt;</span> means <strong>is greater than</strong>. The open side points to the bigger number: <span class=\"math\">4 261 &lt; 5 261</span>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Worked example: ordering</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Compare the thousands first, then the hundreds, then the tens, then the units.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><strong>Ascending</strong> (smallest to biggest): <span class=\"math\">4 261 &lt; 5 261 &lt; 6 261 &lt; 8 261</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><strong>Descending</strong> (biggest to smallest): <span class=\"math\">8 484 &gt; 8 476 &gt; 8 467 &gt; 8 448</span></span></div></div><div class=\"g4-sim\" id=\"s103\"><h4>🎮 Number Line Darts</h4><p class=\"how\">Choose a number line. Then tap where the number belongs. Get within a small distance to score!</p><div class=\"g4-row\" data-k=\"ranges\"></div><div class=\"g4-big\" data-k=\"target\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 150\" data-k=\"svg\" role=\"img\" aria-label=\"Number Line Darts\" style=\"cursor:crosshair\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"next\">Next</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { fmt, q, rnd, pt } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out');\n  const RANGES = [100, 1000, 10000];\n  let max = 1000, target = 0, done = false, score = 0, tries = 0;\n  q(root, 'ranges').innerHTML = RANGES.map(r => '<button class=\"g4-btn ghost\" data-r=\"' + r + '\">0 – ' + fmt(r) + '</button>').join('');\n  const X = n => 40 + n / max * 560;\n  function base(extra) {\n    let h = '<line x1=\"40\" y1=\"90\" x2=\"600\" y2=\"90\" stroke=\"#e2e8f0\" stroke-width=\"3\"/>';\n    for (let k = 0; k <= 10; k++) { const n = max / 10 * k, x = X(n); h += '<line x1=\"' + x + '\" y1=\"' + (k % 5 ? 80 : 74) + '\" x2=\"' + x + '\" y2=\"' + (k % 5 ? 100 : 106) + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>'; if (k % 5 === 0 || max <= 1000) h += '<text x=\"' + x + '\" y=\"128\" text-anchor=\"middle\" fill=\"rgba(226,232,240,.75)\" font-size=\"' + (max >= 10000 ? 13 : 15) + '\">' + fmt(n) + '</text>'; }\n    svg.innerHTML = h + (extra || '');\n  }\n  function next() {\n    root.querySelectorAll('[data-r]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.r === max));\n    const step = max / 100; target = rnd(1, 99) * step; if (max === 10000 && Math.random() < .5) target += rnd(1, 9) * 10;\n    done = false; q(root, 'target').textContent = fmt(target); out.className = 'g4-out'; out.innerHTML = L.tap(fmt(target)); base();\n  }\n  svg.addEventListener('click', e => {\n    if (done) return;\n    const p = pt(svg, e), n = Math.round(Math.max(0, Math.min(max, (p.x - 40) / 560 * max)));\n    const off = Math.abs(n - target) / max, good = off <= 0.03; done = true; tries++; if (good) score++;\n    base('<circle cx=\"' + X(n) + '\" cy=\"90\" r=\"9\" fill=\"' + (good ? '#4ade80' : '#fb7185') + '\"/><path d=\"M' + X(target) + ' 60 l-8 -14 h16 z\" fill=\"#fde047\"/><text x=\"' + X(target) + '\" y=\"38\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + fmt(target) + '</text>');\n    out.className = 'g4-out ' + (good ? 'good' : 'bad'); out.innerHTML = (good ? L.close : L.far) + ' ' + L.score(score, tries);\n  });\n  root.addEventListener('click', e => {\n    const b = e.target.closest('button'); if (!b) return;\n    if (b.dataset.r) { max = +b.dataset.r; next(); } else if (b.dataset.k === 'next') next();\n  });\n  next();\n})(__rev({\"title\":\"Number Line Darts\",\"how\":\"Choose a number line. Then tap where the number belongs. Get within a small distance to score!\",\"tap\":{\"__fn\":\"n => 'Tap where <b>' + n + '</b> belongs on the line.'\"},\"close\":\"Great aim! Very close.\",\"far\":\"Not quite. The yellow arrow shows where it goes.\",\"score\":{\"__fn\":\"(a, b) => 'Score: ' + a + ' out of ' + b + '.'\"}}), document.getElementById('s103')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>On a number line, first work out <strong>how much each small step is worth</strong>. From 0 to 1 000 with 10 steps, each step is 100.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Which sign makes this true? 4 261 ___ 5 261",
     "options": [
      "&lt;",
      "&gt;",
      "="
     ],
     "answer": 0,
     "topic": "Number lines and ordering"
    },
    {
     "type": "mc",
     "text": "Which number is the <strong>biggest</strong>?",
     "options": [
      "8 484",
      "8 476",
      "8 467",
      "8 448"
     ],
     "answer": 0,
     "topic": "Number lines and ordering"
    },
    {
     "type": "mc",
     "text": "Which list is in <strong>ascending</strong> order (smallest to biggest)?",
     "options": [
      "3 102; 3 021; 3 201",
      "3 021; 3 102; 3 201",
      "3 201; 3 102; 3 021",
      "3 102; 3 201; 3 021"
     ],
     "answer": 1,
     "topic": "Number lines and ordering"
    },
    {
     "type": "input",
     "text": "What number is exactly halfway between 3 000 and 4 000?",
     "answer": "3500",
     "topic": "Number lines and ordering"
    },
    {
     "type": "mc",
     "text": "Which sign makes this true? 6 090 ___ 6 909",
     "options": [
      "&lt;",
      "&gt;",
      "="
     ],
     "answer": 0,
     "topic": "Number lines and ordering"
    },
    {
     "type": "input",
     "text": "A number line goes from 0 to 1 000 with a mark every 100. What number is at the 7th mark after 0?",
     "answer": "700",
     "topic": "Number lines and ordering"
    },
    {
     "type": "mc",
     "text": "Which number is the <strong>smallest</strong>?",
     "options": [
      "2 019",
      "2 109",
      "2 091",
      "2 190"
     ],
     "answer": 0,
     "topic": "Number lines and ordering"
    },
    {
     "type": "input",
     "text": "What number is 10 more than 4 995?",
     "answer": "5005",
     "topic": "Number lines and ordering"
    }
   ]
  },
  {
   "id": 104,
   "chapter": 1,
   "name": "Rounding off",
   "fullName": "Rounding off to the nearest 10, 100 or 1 000",
   "lesson": {
    "heading": "Rounding off to the nearest 10, 100 or 1 000",
    "sub": "Chapter 1 · Topic 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/tortoise.webp\" srcset=\"/assets/stickers/tortoise@2x.webp 2x\" alt=\"\"><p>When we <strong>round off</strong>, we choose the nearest \"easy\" number. Rounded numbers help us <strong>estimate</strong> quickly. The sign <span class=\"math\">≈</span> means <strong>is about</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 The rule</div><p>Look at the digit to the <strong>right</strong> of the place you are rounding to. If it is <strong>5 or more</strong>, round <strong>up</strong>. If it is <strong>4 or less</strong>, round <strong>down</strong>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Worked example: 2 176</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>To the nearest 10: look at the units (6). 6 is 5 or more, so round up: <span class=\"math\">2 176 ≈ 2 180</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>To the nearest 100: look at the tens (7). Round up: <span class=\"math\">2 176 ≈ 2 200</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>To the nearest 1 000: look at the hundreds (1). Round down: <span class=\"math\">2 176 ≈ 2 000</span></span></div></div><div class=\"g4-sim\" id=\"s104\"><h4>🎮 Roll to the Nearest</h4><p class=\"how\">Type a number (or tap Random) and choose what to round to. The arrow shows which number it is closer to.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"n\" value=\"2176\" inputmode=\"numeric\" aria-label=\"number\"><button class=\"g4-btn ghost\" data-k=\"rand\">Random</button></div><div class=\"g4-row\" data-k=\"places\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 170\" data-k=\"svg\" role=\"img\" aria-label=\"Roll to the Nearest\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { fmt, q, rnd } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'n');\n  let place = 100;\n  q(root, 'places').innerHTML = [10, 100, 1000].map(p => '<button class=\"g4-btn ghost\" data-p=\"' + p + '\">' + L.nearest(fmt(p)) + '</button>').join('');\n  function draw() {\n    root.querySelectorAll('[data-p]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.p === place));\n    let n = window.G4.num(inp.value); if (n == null) n = 0; n = Math.max(0, Math.min(9999, n));\n    const lo = Math.floor(n / place) * place, hi = lo + place, mid = lo + place / 2, r = n - lo >= place / 2 ? hi : lo;\n    const X = m => 60 + (m - lo) / place * 520;\n    let h = '<line x1=\"60\" y1=\"100\" x2=\"580\" y2=\"100\" stroke=\"#e2e8f0\" stroke-width=\"3\"/>';\n    [[lo, 1], [mid, 0], [hi, 1]].forEach(([m, big]) => { h += '<line x1=\"' + X(m) + '\" y1=\"' + (big ? 86 : 92) + '\" x2=\"' + X(m) + '\" y2=\"' + (big ? 114 : 108) + '\" stroke=\"' + (big ? '#e2e8f0' : 'rgba(226,232,240,.5)') + '\" stroke-width=\"3\"/><text x=\"' + X(m) + '\" y=\"140\" text-anchor=\"middle\" fill=\"' + (big ? '#fff' : 'rgba(226,232,240,.55)') + '\" font-size=\"' + (big ? 20 : 15) + '\" font-weight=\"800\">' + fmt(m) + '</text>'; });\n    h += '<text x=\"' + X(mid) + '\" y=\"160\" text-anchor=\"middle\" fill=\"rgba(226,232,240,.5)\" font-size=\"12\">' + L.halfway + '</text>';\n    h += '<circle cx=\"' + X(n) + '\" cy=\"100\" r=\"10\" fill=\"#fde047\"/><text x=\"' + X(n) + '\" y=\"70\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"20\" font-weight=\"900\">' + fmt(n) + '</text>';\n    h += '<path d=\"M' + X(n) + ' 46 Q' + ((X(n) + X(r)) / 2) + ' 14 ' + X(r) + ' 80\" fill=\"none\" stroke=\"#9ed43c\" stroke-width=\"3\" marker-end=\"url(#g4arr)\"/>';\n    svg.innerHTML = '<defs><marker id=\"g4arr\" markerWidth=\"8\" markerHeight=\"8\" refX=\"4\" refY=\"4\" orient=\"auto\"><path d=\"M0 0 L8 4 L0 8 z\" fill=\"#9ed43c\"/></marker></defs>' + h;\n    out.innerHTML = L.explain(fmt(n), fmt(lo), fmt(hi), fmt(r), n - lo === place / 2) + '<br><b>' + fmt(n) + ' ≈ ' + fmt(r) + '</b>';\n  }\n  root.addEventListener('click', e => {\n    const b = e.target.closest('button'); if (!b) return;\n    if (b.dataset.p) { place = +b.dataset.p; draw(); } else if (b.dataset.k === 'rand') { inp.value = rnd(1, 9999); draw(); }\n  });\n  inp.addEventListener('input', draw);\n  draw();\n})(__rev({\"title\":\"Roll to the Nearest\",\"how\":\"Type a number (or tap Random) and choose what to round to. The arrow shows which number it is closer to.\",\"nearest\":{\"__fn\":\"p => 'Nearest ' + p\"},\"halfway\":\"halfway\",\"explain\":{\"__fn\":\"(n, lo, hi, r, half) => n + ' is between ' + lo + ' and ' + hi + '. ' + (half ? 'It is exactly halfway, so we round <b>up</b> to ' + r + '.' : 'It is closer to ' + r + '.')\"}}), document.getElementById('s104')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Rounding is great for checking answers. 397 + 504 is about 400 + 500 = 900, so an answer of 1 901 must be wrong!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Round 2 176 off to the nearest 10.",
     "answer": "2180",
     "topic": "Rounding off"
    },
    {
     "type": "input",
     "text": "Round 2 176 off to the nearest 100.",
     "answer": "2200",
     "topic": "Rounding off"
    },
    {
     "type": "input",
     "text": "Round 2 176 off to the nearest 1 000.",
     "answer": "2000",
     "topic": "Rounding off"
    },
    {
     "type": "mc",
     "text": "Round 3 450 off to the nearest 100.",
     "options": [
      "3 400",
      "3 500",
      "3 000",
      "3 450"
     ],
     "answer": 1,
     "topic": "Rounding off"
    },
    {
     "type": "input",
     "text": "Round 6 997 off to the nearest 10.",
     "answer": "7000",
     "topic": "Rounding off"
    },
    {
     "type": "mc",
     "text": "Which number rounds to 500 (nearest 100)?",
     "options": [
      "449",
      "551",
      "470",
      "560"
     ],
     "answer": 2,
     "topic": "Rounding off"
    },
    {
     "type": "input",
     "text": "Round 8 501 off to the nearest 1 000.",
     "answer": "9000",
     "topic": "Rounding off"
    },
    {
     "type": "mc",
     "text": "Estimate 397 + 504 by rounding each number to the nearest 100.",
     "options": [
      "800",
      "900",
      "1 000",
      "700"
     ],
     "answer": 1,
     "topic": "Rounding off"
    }
   ]
  },
  {
   "id": 105,
   "chapter": 1,
   "name": "Adding whole numbers",
   "fullName": "Adding whole numbers with up to 4 digits",
   "lesson": {
    "heading": "Adding whole numbers with up to 4 digits",
    "sub": "Chapter 1 · Topic 5",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/apple.webp\" srcset=\"/assets/stickers/apple@2x.webp 2x\" alt=\"\"><p>We can add numbers in <strong>any order</strong>: <span class=\"math\">26 + 19 = 19 + 26</span>. There are many ways to add. Choose the one that makes the sum easiest!</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Way 1: break the numbers down</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">4 362 + 2 486</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>= 4 000 + 2 000 + 300 + 400 + 60 + 80 + 2 + 6</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>= 6 000 + 700 + 140 + 8</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>= <strong>6 848</strong></span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Way 2: add on in jumps</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">4 362 + 2 000 = 6 362</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">6 362 + 400 = 6 762</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">6 762 + 80 = 6 842</span></span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span><span class=\"math\">6 842 + 6 = 6 848</span></span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Way 3: fill up the tens</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">96 + 48</span>: take 4 from 48 to make 96 up to 100.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">100 + 44 = 144</span></span></div></div><div class=\"g4-sim\" id=\"s105\"><h4>🎮 Break-it-down Adder</h4><p class=\"how\">Work out the sum on paper first and type your answer. Then tap Next step to see it broken down, or Column method to line it up.</p><div class=\"g4-big\" data-k=\"sum\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Check</button></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"next\">Next step</button><button class=\"g4-btn ghost\" data-k=\"colbtn\">Column method</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><ul class=\"g4-steps\" data-k=\"steps\"></ul><div class=\"g4-col\" data-k=\"col\"></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { fmt, q, rnd } = window.G4;\n  const out = q(root, 'out'), list = q(root, 'steps'), col = q(root, 'col');\n  let a, b, shown, column = false;\n  const split = n => [Math.floor(n / 1000) * 1000, Math.floor(n % 1000 / 100) * 100, Math.floor(n % 100 / 10) * 10, n % 10];\n  function steps() {\n    const A = split(a), B = split(b), S = A.map((x, i) => x + B[i]);\n    return [\n      fmt(a) + ' = ' + A.filter(Boolean).map(fmt).join(' + '),\n      fmt(b) + ' = ' + B.filter(Boolean).map(fmt).join(' + '),\n      L.parts.map((p, i) => p + ': ' + fmt(A[i]) + ' + ' + fmt(B[i]) + ' = <b>' + fmt(S[i]) + '</b>').join('<br>'),\n      fmt(S[0]) + ' + ' + fmt(S[1]) + ' + ' + fmt(S[2]) + ' + ' + fmt(S[3]) + ' = <b>' + fmt(a + b) + '</b>'\n    ];\n  }\n  function columnText() {\n    const da = String(a).padStart(4, ' '), db = String(b).padStart(4, ' '), s = String(a + b).padStart(5, ' ');\n    let carry = '', c = 0; const ca = [];\n    for (let i = 3; i >= 0; i--) { const t = (+da[i] || 0) + (+db[i] || 0) + c; c = t >= 10 ? 1 : 0; ca[i - 1] = c ? '1' : ' '; }\n    carry = ' ' + [0, 1, 2].map(i => ca[i] || ' ').join('') + ' ';\n    return '<span class=\"carry\">' + carry + '</span>\\n ' + da + '\\n+' + db + '\\n─────\\n' + s;\n  }\n  function draw() {\n    q(root, 'sum').textContent = fmt(a) + ' + ' + fmt(b) + ' = ?';\n    const st = steps();\n    list.innerHTML = st.slice(0, shown).map(s => '<li>' + s + '</li>').join('');\n    q(root, 'next').disabled = shown >= st.length;\n    col.style.display = column ? '' : 'none'; col.innerHTML = columnText();\n    q(root, 'colbtn').setAttribute('aria-pressed', column);\n  }\n  function fresh() { a = rnd(1000, 4999); b = rnd(1000, 4999); shown = 0; out.className = 'g4-out'; out.innerHTML = L.tryFirst; q(root, 'ans').value = ''; draw(); }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.k === 'next') { shown++; draw(); }\n    else if (t.dataset.k === 'colbtn') { column = !column; draw(); }\n    else if (t.dataset.k === 'new') fresh();\n    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'ans').value), ok = v === a + b; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right(fmt(a + b)) : L.wrong; }\n  });\n  fresh(); a = 4362; b = 2486; draw();\n})(__rev({\"title\":\"Break-it-down Adder\",\"how\":\"Work out the sum on paper first and type your answer. Then tap Next step to see it broken down, or Column method to line it up.\",\"parts\":[\"Thousands\",\"Hundreds\",\"Tens\",\"Units\"],\"tryFirst\":\"Try it yourself first, then check.\",\"right\":{\"__fn\":\"s => 'Correct! The answer is ' + s + '.'\"},\"wrong\":\"Not yet. Tap Next step to see how.\"}), document.getElementById('s105')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>The <strong>column method</strong> lines up the units, tens, hundreds and thousands. Start adding from the <strong>units</strong> and carry a 1 when a column adds up to 10 or more.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "4 362 + 2 486 = ?",
     "answer": "6848",
     "topic": "Adding whole numbers"
    },
    {
     "type": "input",
     "text": "96 + 48 = ?",
     "answer": "144",
     "topic": "Adding whole numbers"
    },
    {
     "type": "mc",
     "text": "26 + 19 = 19 + ___",
     "options": [
      "26",
      "19",
      "45",
      "7"
     ],
     "answer": 0,
     "topic": "Adding whole numbers"
    },
    {
     "type": "input",
     "text": "3 205 + 1 470 = ?",
     "answer": "4675",
     "topic": "Adding whole numbers"
    },
    {
     "type": "input",
     "text": "2 748 + 1 563 = ?",
     "answer": "4311",
     "topic": "Adding whole numbers"
    },
    {
     "type": "input",
     "text": "5 000 + 400 + 80 + 3 + 1 000 + 200 + 10 + 4 = ?",
     "answer": "6697",
     "topic": "Adding whole numbers"
    },
    {
     "type": "mc",
     "text": "What is the best estimate for 2 987 + 3 021?",
     "options": [
      "5 000",
      "6 000",
      "7 000",
      "600"
     ],
     "answer": 1,
     "topic": "Adding whole numbers"
    },
    {
     "type": "input",
     "text": "1 999 + 2 001 = ?",
     "answer": "4000",
     "topic": "Adding whole numbers"
    }
   ]
  },
  {
   "id": 106,
   "chapter": 1,
   "name": "Subtracting whole numbers",
   "fullName": "Subtracting whole numbers and checking with addition",
   "lesson": {
    "heading": "Subtracting whole numbers and checking with addition",
    "sub": "Chapter 1 · Topic 6",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/banana.webp\" srcset=\"/assets/stickers/banana@2x.webp 2x\" alt=\"\"><p>When we <strong>subtract</strong>, the order matters: <span class=\"math\">78 − 20</span> is not the same as <span class=\"math\">20 − 78</span>. Subtraction <strong>undoes</strong> addition.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 The converse relationship</div><p>If <span class=\"math\">19 + 8 = 27</span>, then <span class=\"math\">27 − 19 = 8</span> and <span class=\"math\">27 − 8 = 19</span>. We can check every subtraction by adding.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Worked example: 4 687 − 2 143</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Break it down: (4 000 − 2 000) + (600 − 100) + (80 − 40) + (7 − 3)</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>= 2 000 + 500 + 40 + 4 = <strong>2 544</strong></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Or jump back: 4 687 − 2 000 = 2 687 → − 100 = 2 587 → − 40 = 2 547 → − 3 = 2 544</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>Check: <span class=\"math\">2 544 + 2 143 = 4 687</span> ✓</span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ When you need to break up a ten: 3 261 − 1 846</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Units: 1 − 6 does not work, so break up a ten: 11 − 6 = 5</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Tens: 5 − 4 = 1</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Hundreds: 2 − 8 does not work, so break up a thousand: 12 − 8 = 4</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>Thousands: 2 − 1 = 1, so the answer is <strong>1 415</strong></span></div></div><div class=\"g4-sim\" id=\"s106\"><h4>🎮 Fact Family Triangle</h4><p class=\"how\">Change the two bottom numbers and watch the whole family of facts change. Tap Quiz me to fill in a missing answer.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"a\" value=\"19\" inputmode=\"numeric\" aria-label=\"first number\"><span style=\"font-size:22px\">+</span><input class=\"g4-input\" data-k=\"b\" value=\"8\" inputmode=\"numeric\" aria-label=\"second number\"><button class=\"g4-btn ghost\" data-k=\"quiz\">Quiz me</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 200\" data-k=\"svg\" role=\"img\" aria-label=\"Fact Family Triangle\"></svg></div><ul class=\"g4-steps\" data-k=\"facts\"></ul><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { fmt, q, rnd } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out'), list = q(root, 'facts'), ai = q(root, 'a'), bi = q(root, 'b');\n  let hide = -1;\n  function draw() {\n    const a = Math.max(0, window.G4.num(ai.value) || 0), b = Math.max(0, window.G4.num(bi.value) || 0), c = a + b;\n    svg.innerHTML = '<path d=\"M320 20 L180 180 L460 180 Z\" fill=\"rgba(158,212,60,.08)\" stroke=\"#9ed43c\" stroke-width=\"3\"/>' +\n      '<circle cx=\"320\" cy=\"58\" r=\"34\" fill=\"#0d1016\" stroke=\"#fde047\" stroke-width=\"3\"/><text x=\"320\" y=\"65\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"22\" font-weight=\"900\">' + fmt(c) + '</text>' +\n      '<circle cx=\"225\" cy=\"150\" r=\"34\" fill=\"#0d1016\" stroke=\"#60a5fa\" stroke-width=\"3\"/><text x=\"225\" y=\"157\" text-anchor=\"middle\" fill=\"#93c5fd\" font-size=\"22\" font-weight=\"900\">' + fmt(a) + '</text>' +\n      '<circle cx=\"415\" cy=\"150\" r=\"34\" fill=\"#0d1016\" stroke=\"#f472b6\" stroke-width=\"3\"/><text x=\"415\" y=\"157\" text-anchor=\"middle\" fill=\"#f9a8d4\" font-size=\"22\" font-weight=\"900\">' + fmt(b) + '</text>';\n    const F = [[a, '+', b, c], [b, '+', a, c], [c, '−', a, b], [c, '−', b, a]];\n    list.innerHTML = F.map((f, i) => '<li>' + (i === hide ? f.slice(0, 3).map(x => typeof x === 'number' ? fmt(x) : x).join(' ') + ' = <input class=\"g4-input\" data-k=\"blank\" inputmode=\"numeric\" style=\"width:110px\"> <button class=\"g4-btn\" data-k=\"check\">' + L.check + '</button>' : '<b>' + fmt(f[0]) + ' ' + f[1] + ' ' + fmt(f[2]) + ' = ' + fmt(f[3]) + '</b>') + '</li>').join('');\n    return F;\n  }\n  let F = draw();\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.k === 'quiz') { const a = rnd(100, 2999), b = rnd(100, 2999); ai.value = a; bi.value = b; hide = rnd(2, 3); F = draw(); out.className = 'g4-out'; out.innerHTML = L.fill; }\n    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'blank').value), ok = v === F[hide][3]; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right : L.wrong(fmt(F[hide][0]), F[hide][1], fmt(F[hide][2])); }\n  });\n  [ai, bi].forEach(el => el.addEventListener('input', () => { hide = -1; F = draw(); out.className = 'g4-out'; out.innerHTML = L.explain; }));\n  out.innerHTML = L.explain;\n})(__rev({\"title\":\"Fact Family Triangle\",\"how\":\"Change the two bottom numbers and watch the whole family of facts change. Tap Quiz me to fill in a missing answer.\",\"check\":\"Check\",\"explain\":\"Addition and subtraction undo each other. If you know one fact, you know all four!\",\"fill\":\"Fill in the missing number.\",\"right\":\"Correct! Subtraction undoes addition.\",\"wrong\":{\"__fn\":\"(a, op, b) => 'Not yet. Work out ' + a + ' ' + op + ' ' + b + ' again.'\"}}), document.getElementById('s106')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>You can also count backwards: 624 − 36 is 624 back in 9s four times: 615; 606; 597; 588.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "4 687 − 2 143 = ?",
     "answer": "2544",
     "topic": "Subtracting whole numbers"
    },
    {
     "type": "input",
     "text": "3 261 − 1 846 = ?",
     "answer": "1415",
     "topic": "Subtracting whole numbers"
    },
    {
     "type": "mc",
     "text": "If 19 + 8 = 27, which of these is also true?",
     "options": [
      "27 − 19 = 8",
      "19 − 8 = 27",
      "8 − 27 = 19",
      "27 + 8 = 19"
     ],
     "answer": 0,
     "topic": "Subtracting whole numbers"
    },
    {
     "type": "input",
     "text": "1 000 − 368 = ?",
     "answer": "632",
     "topic": "Subtracting whole numbers"
    },
    {
     "type": "mc",
     "text": "True or false? 78 − 20 = 20 − 78",
     "options": [
      "True",
      "False"
     ],
     "answer": 1,
     "topic": "Subtracting whole numbers"
    },
    {
     "type": "input",
     "text": "5 004 − 2 996 = ?",
     "answer": "2008",
     "topic": "Subtracting whole numbers"
    },
    {
     "type": "input",
     "text": "___ + 237 = 1 396. What is the missing number?",
     "answer": "1159",
     "topic": "Subtracting whole numbers"
    },
    {
     "type": "input",
     "text": "Count backwards from 624 in 9s, four times. Where do you land?",
     "answer": "588",
     "topic": "Subtracting whole numbers"
    }
   ]
  },
  {
   "id": 107,
   "chapter": 1,
   "name": "Problem solving",
   "fullName": "Solving addition and subtraction problems",
   "lesson": {
    "heading": "Solving addition and subtraction problems",
    "sub": "Chapter 1 · Topic 7",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/elephant.webp\" srcset=\"/assets/stickers/elephant@2x.webp 2x\" alt=\"\"><p>Word problems tell a story. <strong>Key words</strong> help us decide whether to add or subtract.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Key words</div><p><strong>Add (+):</strong> altogether, total, sum, more than, in all.<br><strong>Subtract (−):</strong> difference, left, less than, how many more, take away.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Steps to solve a problem</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><strong>Read</strong> the problem twice.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><strong>Decide</strong>: do we add or subtract?</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><strong>Estimate</strong> the answer by rounding.</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span><strong>Calculate</strong> and write the answer with its unit (R, kg, sheep…).</span></div><div class=\"example-step\"><span class=\"step-num\">5</span><span><strong>Check</strong>: is the answer close to your estimate?</span></div></div><div class=\"g4-sim\" id=\"s107\"><h4>🎮 Plus or Minus?</h4><p class=\"how\">Read the problem. Do we add or subtract? Choose, then work out the answer.</p><div class=\"score-pill\" data-k=\"count\" style=\"display:inline-block;margin-bottom:8px\"></div><div class=\"g4-hero\" data-k=\"card\"></div><div class=\"g4-row\" data-k=\"ops\"><button class=\"g4-btn\" data-op=\"+\" style=\"font-size:24px;min-width:70px\">+</button><button class=\"g4-btn\" data-op=\"-\" style=\"font-size:24px;min-width:70px\">−</button></div><div class=\"g4-row\" data-k=\"ansrow\" style=\"display:none\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Check</button></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"next\">Next</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { fmt, q } = window.G4;\n  const out = q(root, 'out'), card = q(root, 'card'), ansRow = q(root, 'ansrow');\n  let i = 0, score = 0;\n  function show() {\n    const p = L.problems[i];\n    card.innerHTML = window.G4.stk(p.s) + '<p>' + p.t + '</p>';\n    q(root, 'count').textContent = L.of(i + 1, L.problems.length);\n    ansRow.style.display = 'none'; q(root, 'ops').style.display = ''; out.className = 'g4-out'; out.innerHTML = L.which; q(root, 'ans').value = '';\n  }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return; const p = L.problems[i];\n    if (t.dataset.op) {\n      const ok = t.dataset.op === p.op; out.className = 'g4-out ' + (ok ? 'good' : 'bad');\n      out.innerHTML = (ok ? L.opRight : L.opWrong) + ' ' + L.why(p.why);\n      q(root, 'ops').style.display = 'none'; ansRow.style.display = '';\n    } else if (t.dataset.k === 'check') {\n      const v = window.G4.num(String(q(root, 'ans').value).replace(/^r/i, '')), ok = v === p.a; if (ok) score++;\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.solved : L.notQuite) + ' ' + p.w;\n    } else if (t.dataset.k === 'next') { i = (i + 1) % L.problems.length; show(); }\n  });\n  show();\n})(__rev({\"title\":\"Plus or Minus?\",\"how\":\"Read the problem. Do we add or subtract? Choose, then work out the answer.\",\"problems\":[{\"t\":\"Nosipho has R18 more than Helen. Helen has R60. How much money does Nosipho have?\",\"op\":\"+\",\"a\":78,\"why\":\"<b>more than</b>\",\"w\":\"60 + 18 = R78\",\"s\":\"child\"},{\"t\":\"A farmer had 1 108 sheep. He sold 359. How many sheep are left?\",\"op\":\"-\",\"a\":749,\"why\":\"<b>sold</b> and <b>left</b>\",\"w\":\"1 108 − 359 = 749 sheep\",\"s\":\"sheep\"},{\"t\":\"A school has 1 245 girls and 1 187 boys. How many learners are there <b>altogether</b>?\",\"op\":\"+\",\"a\":2432,\"why\":\"<b>altogether</b>\",\"w\":\"1 245 + 1 187 = 2 432 learners\",\"s\":\"child\"},{\"t\":\"A book has 312 pages. Thabo has read 175 pages. How many pages does he still have to read?\",\"op\":\"-\",\"a\":137,\"why\":\"<b>still have to</b> (what is left)\",\"w\":\"312 − 175 = 137 pages\",\"s\":\"paper\"},{\"t\":\"A bakery sold 2 450 loaves on Monday and 1 875 on Tuesday. What is the <b>total</b>?\",\"op\":\"+\",\"a\":4325,\"why\":\"<b>total</b>\",\"w\":\"2 450 + 1 875 = 4 325 loaves\",\"s\":\"bread-loaf\"},{\"t\":\"An elephant weighs 4 800 kg and a hippo weighs 1 500 kg. What is the <b>difference</b> in mass?\",\"op\":\"-\",\"a\":3300,\"why\":\"<b>difference</b>\",\"w\":\"4 800 − 1 500 = 3 300 kg\",\"s\":\"elephant\"}],\"of\":{\"__fn\":\"(a, b) => 'Problem ' + a + ' of ' + b\"},\"which\":\"Do we add (+) or subtract (−)?\",\"opRight\":\"Yes!\",\"opWrong\":\"Think again.\",\"why\":{\"__fn\":\"w => 'The clue is ' + w + '. Now work out the answer.'\"},\"solved\":\"Correct!\",\"notQuite\":\"Not yet.\"}), document.getElementById('s107')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Some problems need two steps. A farmer sold 359 of his 1 108 sheep, then bought 560: first 1 108 − 359 = 749, then 749 + 560 = 1 309.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Helen has R60. Nosipho has R18 more than Helen. How much money do they have <strong>altogether</strong>? (Rand)",
     "answer": "138",
     "topic": "Problem solving"
    },
    {
     "type": "input",
     "text": "A farmer had 1 108 sheep. He sold 359, then bought 560. How many sheep does he have now?",
     "answer": "1309",
     "topic": "Problem solving"
    },
    {
     "type": "input",
     "text": "When 237 is added to a number, the answer is 1 396. What is the number?",
     "answer": "1159",
     "topic": "Problem solving"
    },
    {
     "type": "mc",
     "text": "Which word tells you to <strong>subtract</strong>?",
     "options": [
      "altogether",
      "total",
      "difference",
      "sum"
     ],
     "answer": 2,
     "topic": "Problem solving"
    },
    {
     "type": "input",
     "text": "On Monday 2 345 people used a taxi rank. On Tuesday 2 870 people used it. How many <strong>more</strong> people used it on Tuesday?",
     "answer": "525",
     "topic": "Problem solving"
    },
    {
     "type": "input",
     "text": "Lerato saved R1 250 in January and R875 in February. How much did she save in total? (Rand)",
     "answer": "2125",
     "topic": "Problem solving"
    },
    {
     "type": "mc",
     "text": "What is the best estimate for 4 980 − 2 010?",
     "options": [
      "2 000",
      "3 000",
      "7 000",
      "300"
     ],
     "answer": 1,
     "topic": "Problem solving"
    },
    {
     "type": "input",
     "text": "A school has raised R3 400. It needs R5 000 for new books. How much more does it need? (Rand)",
     "answer": "1600",
     "topic": "Problem solving"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 1,
  "chapterName": "Whole Numbers",
  "topics": [
   {
    "name": "Counting in intervals",
    "questions": [
     {
      "num": "1",
      "text": "Write the next three numbers in each pattern:",
      "parts": [
       {
        "label": "a)",
        "text": "173; 175; 177; …",
        "marks": 3
       },
       {
        "label": "b)",
        "text": "450; 475; 500; …",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "1 299; 1 399; 1 499; …",
        "marks": 3
       },
       {
        "label": "d)",
        "text": "624; 615; 606; …",
        "marks": 3
       }
      ]
     }
    ]
   },
   {
    "name": "Place value",
    "questions": [
     {
      "num": "2",
      "text": "Write down the value of the underlined digit:",
      "parts": [
       {
        "label": "a)",
        "text": "3 <u>4</u>56",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "<u>7</u> 018",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "2 90<u>8</u>",
        "marks": 1
       }
      ]
     },
     {
      "num": "3",
      "text": "Write each number in expanded notation:",
      "parts": [
       {
        "label": "a)",
        "text": "5 274",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "8 009",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "6 430",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Number lines and ordering",
    "questions": [
     {
      "num": "4",
      "text": "Write the numbers in ascending order (smallest to biggest):",
      "parts": [
       {
        "label": "",
        "text": "6 412; 6 142; 6 421; 6 124",
        "marks": 2
       }
      ]
     },
     {
      "num": "5",
      "text": "Fill in &lt; or &gt;:",
      "parts": [
       {
        "label": "a)",
        "text": "3 870 ___ 3 807",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "9 099 ___ 9 909",
        "marks": 1
       }
      ]
     }
    ]
   },
   {
    "name": "Rounding off",
    "questions": [
     {
      "num": "6",
      "text": "Round off 4 628:",
      "parts": [
       {
        "label": "a)",
        "text": "to the nearest 10",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "to the nearest 100",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "to the nearest 1 000",
        "marks": 1
       }
      ]
     },
     {
      "num": "7",
      "text": "Estimate by rounding to the nearest 100, then calculate the exact answer:",
      "parts": [
       {
        "label": "",
        "text": "612 + 289",
        "marks": 3
       }
      ]
     }
    ]
   },
   {
    "name": "Adding whole numbers",
    "questions": [
     {
      "num": "8",
      "text": "Calculate. Show your method.",
      "parts": [
       {
        "label": "a)",
        "text": "3 254 + 2 135",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "4 678 + 1 845",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "2 999 + 1 456",
        "marks": 3
       }
      ]
     }
    ]
   },
   {
    "name": "Subtracting whole numbers",
    "questions": [
     {
      "num": "9",
      "text": "Calculate. Check each answer by adding.",
      "parts": [
       {
        "label": "a)",
        "text": "5 798 − 3 254",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "4 312 − 1 875",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "6 000 − 2 450",
        "marks": 3
       }
      ]
     },
     {
      "num": "10",
      "text": "Write the fact family for 312 + 145 = 457.",
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
    "name": "Problem solving",
    "questions": [
     {
      "num": "11",
      "text": "Solve each problem. Write a number sentence and the answer.",
      "parts": [
       {
        "label": "a)",
        "text": "A shop had 2 450 apples. It sold 1 375. How many are left?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Sipho walked 1 250 m to school and 1 480 m home by another road. How far did he walk altogether?",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "A truck can carry 5 000 kg. It already has 3 275 kg on it. How many more kilograms can it carry?",
        "marks": 2
       }
      ]
     }
    ]
   }
  ]
 },
 "answerKey": {
  "chapter": 1,
  "chapterName": "Chapter 1 — Whole Numbers",
  "topics": [
   {
    "name": "Counting in intervals",
    "answers": [
     {
      "num": "Q1a",
      "ans": "179; 181; 183",
      "note": "Count in 2s"
     },
     {
      "num": "Q1b",
      "ans": "525; 550; 575",
      "note": "Count in 25s"
     },
     {
      "num": "Q1c",
      "ans": "1 599; 1 699; 1 799",
      "note": "Count in 100s"
     },
     {
      "num": "Q1d",
      "ans": "597; 588; 579",
      "note": "Count backwards in 9s"
     }
    ]
   },
   {
    "name": "Place value",
    "answers": [
     {
      "num": "Q2a",
      "ans": "400",
      "note": "Hundreds place"
     },
     {
      "num": "Q2b",
      "ans": "7 000",
      "note": "Thousands place"
     },
     {
      "num": "Q2c",
      "ans": "8",
      "note": "Units place"
     },
     {
      "num": "Q3a",
      "ans": "5 000 + 200 + 70 + 4",
      "note": ""
     },
     {
      "num": "Q3b",
      "ans": "8 000 + 9",
      "note": "No hundreds or tens"
     },
     {
      "num": "Q3c",
      "ans": "6 000 + 400 + 30",
      "note": "No units"
     }
    ]
   },
   {
    "name": "Number lines and ordering",
    "answers": [
     {
      "num": "Q4",
      "ans": "6 124; 6 142; 6 412; 6 421",
      "note": "Compare hundreds, then tens"
     },
     {
      "num": "Q5a",
      "ans": "&gt;",
      "note": "7 tens is more than 0 tens"
     },
     {
      "num": "Q5b",
      "ans": "&lt;",
      "note": "0 hundreds is less than 9 hundreds"
     }
    ]
   },
   {
    "name": "Rounding off",
    "answers": [
     {
      "num": "Q6a",
      "ans": "4 630",
      "note": "Units 8 → round up"
     },
     {
      "num": "Q6b",
      "ans": "4 600",
      "note": "Tens 2 → round down"
     },
     {
      "num": "Q6c",
      "ans": "5 000",
      "note": "Hundreds 6 → round up"
     },
     {
      "num": "Q7",
      "ans": "Estimate 600 + 300 = 900; exact 901",
      "note": ""
     }
    ]
   },
   {
    "name": "Adding whole numbers",
    "answers": [
     {
      "num": "Q8a",
      "ans": "5 389",
      "note": "5 000 + 300 + 80 + 9"
     },
     {
      "num": "Q8b",
      "ans": "6 523",
      "note": "Carry in units, tens and hundreds"
     },
     {
      "num": "Q8c",
      "ans": "4 455",
      "note": "3 000 + 1 455, then take away 1"
     }
    ]
   },
   {
    "name": "Subtracting whole numbers",
    "answers": [
     {
      "num": "Q9a",
      "ans": "2 544",
      "note": "Check: 2 544 + 3 254 = 5 798"
     },
     {
      "num": "Q9b",
      "ans": "2 437",
      "note": "Break up a ten, a hundred and a thousand"
     },
     {
      "num": "Q9c",
      "ans": "3 550",
      "note": "Count up from 2 450 to 6 000"
     },
     {
      "num": "Q10",
      "ans": "145 + 312 = 457; 457 − 312 = 145; 457 − 145 = 312",
      "note": ""
     }
    ]
   },
   {
    "name": "Problem solving",
    "answers": [
     {
      "num": "Q11a",
      "ans": "2 450 − 1 375 = 1 075 apples",
      "note": "\"left\" means subtract"
     },
     {
      "num": "Q11b",
      "ans": "1 250 + 1 480 = 2 730 m",
      "note": "\"altogether\" means add"
     },
     {
      "num": "Q11c",
      "ans": "5 000 − 3 275 = 1 725 kg",
      "note": "Count up from 3 275"
     }
    ]
   }
  ]
 }
});
