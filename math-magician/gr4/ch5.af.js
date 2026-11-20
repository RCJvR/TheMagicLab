// Math Magician — Grade 4, Chapter 5 (Meervoudige Bewerkings en Getallesinne) — Afrikaans
// Generated from one bilingual source (scripts/math-gr4/gen_ch5.js); edit both languages there.
MathMagician.registerChapter(5, {
 "topics": [
  {
   "id": 501,
   "chapter": 5,
   "name": "Wat kom eerste?",
   "fullName": "Berekeninge met meer as een bewerking",
   "lesson": {
    "heading": "Berekeninge met meer as een bewerking",
    "sub": "Hoofstuk 5 · Onderwerp 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/robot.webp\" srcset=\"/assets/stickers/robot@2x.webp 2x\" alt=\"\"><p>As 'n berekening meer as een bewerking het, moet ons hulle in die <strong>regte volgorde</strong> doen, anders kry ons die verkeerde antwoord.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Die volgorde</div><p><strong>1.</strong> Hakies ( ) eerste. <strong>2.</strong> Dan × en ÷, van links na regs. <strong>3.</strong> Dan + en −, van links na regs.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Uitgewerkte voorbeelde</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">12 × 9 − 9 ÷ 3 = 108 − 3 = 105</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">(124 + 16) ÷ 7 = 140 ÷ 7 = 20</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">23 × 8 − (110 − 26) = 184 − 84 = 100</span></span></div></div><div class=\"g4-sim\" id=\"s501\"><h4>🎮 Wat Eerste?</h4><p class=\"how\">Tik op die bewerking wat eerste gedoen moet word. Gaan aan totdat net die antwoord oorbly.</p><div class=\"g4-row\" data-k=\"expr\" style=\"gap:6px;min-height:60px\"></div><ul class=\"g4-steps\" data-k=\"hist\"></ul><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd } = window.G4;\r\n  const expr = q(root, 'expr'), out = q(root, 'out'), hist = q(root, 'hist');\r\n  let toks = [], mistakes = 0;\r\n  const TEMPLATES = [\r\n    () => [rnd(2, 20), '+', rnd(2, 9), '×', rnd(2, 9)],\r\n    () => [rnd(50, 99), '−', rnd(2, 9), '×', rnd(2, 5)],\r\n    () => { const c = rnd(2, 9), s = c * rnd(3, 12), a = rnd(1, s - 1); return ['(', a, '+', s - a, ')', '÷', c]; },\r\n    () => { const d = rnd(2, 5); return [rnd(4, 9), '×', rnd(3, 9), '−', d * rnd(2, 9), '÷', d]; },\r\n    () => { const b = rnd(10, 30), c = rnd(2, 9); return [rnd(40, 99), '−', '(', b, '−', c, ')']; },\r\n    () => [rnd(2, 12), '×', '(', rnd(2, 9), '+', rnd(2, 9), ')']\r\n  ];\r\n  const isOp = t => typeof t === 'string' && '+−×÷'.includes(t);\r\n  function nextOp(t) {\r\n    let best = -1, depth = 0, bestScore = -1;\r\n    t.forEach((x, i) => {\r\n      if (x === '(') depth++; else if (x === ')') depth--;\r\n      else if (isOp(x) && typeof t[i - 1] === 'number' && typeof t[i + 1] === 'number') {\r\n        const score = depth * 10 + ('×÷'.includes(x) ? 2 : 1);\r\n        if (score > bestScore) { bestScore = score; best = i; }\r\n      }\r\n    });\r\n    return best;\r\n  }\r\n  function apply(t, i) {\r\n    const a = t[i - 1], b = t[i + 1], op = t[i], v = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;\r\n    const n = t.slice(0, i - 1).concat([v], t.slice(i + 2));\r\n    for (let k = 1; k < n.length - 1; k++) if (n[k - 1] === '(' && typeof n[k] === 'number' && n[k + 1] === ')') { n.splice(k + 1, 1); n.splice(k - 1, 1); k = 0; }\r\n    return n;\r\n  }\r\n  const show = t => t.map(x => x).join(' ').replace(/\\( /g, '(').replace(/ \\)/g, ')');\r\n  function draw() {\r\n    if (toks.length === 1) { expr.innerHTML = '<span class=\"g4-big\">= ' + toks[0] + '</span>'; out.className = 'g4-out good'; out.innerHTML = L.done(toks[0], mistakes); return; }\r\n    expr.innerHTML = toks.map((x, i) => isOp(x) && typeof toks[i - 1] === 'number' && typeof toks[i + 1] === 'number' ? '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"font-size:24px;min-width:52px\">' + x + '</button>' : '<span class=\"g4-big\" style=\"font-size:28px\">' + x + '</span>').join(' ');\r\n  }\r\n  function fresh() { toks = TEMPLATES[rnd(0, TEMPLATES.length - 1)](); mistakes = 0; hist.innerHTML = '<li><b>' + show(toks) + '</b></li>'; out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.i) {\r\n      const i = +t.dataset.i, want = nextOp(toks);\r\n      if (i !== want) { mistakes++; out.className = 'g4-out bad'; out.innerHTML = L.notFirst(toks[i], toks[want]); return; }\r\n      const sub = toks[i - 1] + ' ' + toks[i] + ' ' + toks[i + 1];\r\n      toks = apply(toks, i);\r\n      hist.innerHTML += '<li>' + L.step(sub) + ' → <b>' + show(toks) + '</b></li>'; out.className = 'g4-out'; out.innerHTML = L.good; draw();\r\n    } else if (t.dataset.k === 'new') fresh();\r\n  });\r\n  fresh();\r\n})(__rev({\"ask\":\"Tik op die bewerking wat jy eerste moet doen.\",\"good\":\"Ja! Wat kom volgende?\",\"notFirst\":{\"__fn\":\"(a, b) => 'Nog nie. Doen eers die ' + b + (a === b ? ' (die een links)' : '') + '. Onthou: hakies eerste, dan × en ÷, dan + en −.'\"},\"step\":{\"__fn\":\"s => s\"},\"done\":{\"__fn\":\"(v, m) => 'Die antwoord is <b>' + v + '</b>. ' + (m ? 'Jy het ' + m + ' verkeerde ' + (m === 1 ? 'poging' : 'pogings') + ' gehad.' : 'Perfekte volgorde!')\"}}), document.getElementById('s501')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Hakies verander die antwoord: <span class=\"math\">2 + 3 × 4 = 14</span>, maar <span class=\"math\">(2 + 3) × 4 = 20</span>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "12 × 9 − 9 ÷ 3 = ?",
     "answer": "105",
     "topic": "Wat kom eerste?"
    },
    {
     "type": "input",
     "text": "(124 + 16) ÷ 7 = ?",
     "answer": "20",
     "topic": "Wat kom eerste?"
    },
    {
     "type": "mc",
     "text": "Wat doen jy eerste in 5 + 4 × 3?",
     "options": [
      "5 + 4",
      "4 × 3",
      "enige een"
     ],
     "answer": 1,
     "topic": "Wat kom eerste?"
    },
    {
     "type": "input",
     "text": "5 + 4 × 3 = ?",
     "answer": "17",
     "topic": "Wat kom eerste?"
    },
    {
     "type": "input",
     "text": "23 × 8 − (110 − 26) = ?",
     "answer": "100",
     "topic": "Wat kom eerste?"
    },
    {
     "type": "input",
     "text": "(20 − 8) × 5 = ?",
     "answer": "60",
     "topic": "Wat kom eerste?"
    },
    {
     "type": "input",
     "text": "36 ÷ 4 + 6 × 2 = ?",
     "answer": "21",
     "topic": "Wat kom eerste?"
    },
    {
     "type": "mc",
     "text": "Watter een is gelyk aan 20?",
     "options": [
      "(2 + 3) × 4",
      "2 + 3 × 4",
      "2 × 3 + 4",
      "2 + 3 + 4"
     ],
     "answer": 0,
     "topic": "Wat kom eerste?"
    }
   ]
  },
  {
   "id": 502,
   "chapter": 5,
   "name": "Ontbrekende getalle",
   "fullName": "Getallesinne voltooi",
   "lesson": {
    "heading": "Getallesinne voltooi",
    "sub": "Hoofstuk 5 · Onderwerp 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/scales.webp\" srcset=\"/assets/stickers/scales@2x.webp 2x\" alt=\"\"><p>'n <strong>Getallesin</strong> gebruik getalle en tekens, soos <span class=\"math\">□ + 18 = 36</span>. Die blokkie staan vir 'n ontbrekende getal.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Vind die ontbrekende getal</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">□ + 18 = 36</span>: watter getal plus 18 maak 36? <strong>18</strong>, want <span class=\"math\">36 − 18 = 18</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">(4 + □) × 6 = 42</span>: iets keer 6 is 42, so die hakie is 7. Dan is <span class=\"math\">4 + □ = 7</span>, so □ = <strong>3</strong>.</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Toets deur te vervang</div><p>Sit jou antwoord in die blokkie en werk dit uit: <span class=\"math\">(4 + 3) × 6 = 7 × 6 = 42</span> ✓. As albei kante gelyk is, is jy reg.</p></div><div class=\"g4-sim\" id=\"s502\"><h4>🎮 Balanseer Dit</h4><p class=\"how\">'n Getallesin is soos 'n weegskaal: albei kante moet gelyk wees. Vind die getal in die blokkie.</p><div class=\"g4-big\" data-k=\"sent\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 240\" data-k=\"svg\" role=\"img\" aria-label=\"balance\"></svg></div><div class=\"g4-row\"><span style=\"font-size:20px\">□ =</span><input class=\"g4-input\" data-k=\"box\" inputmode=\"numeric\" aria-label=\"box\"><button class=\"g4-btn\" data-k=\"try\">Probeer</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, num } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'box');\r\n  let P = null;\r\n  const PUZ = [\r\n    () => { const x = rnd(5, 40), b = rnd(5, 40); return { txt: x2 => (x2 ?? '□') + ' + ' + b, rhs: x + b, f: v => v + b, x }; },\r\n    () => { const x = rnd(20, 90), b = rnd(5, x - 1); return { txt: x2 => (x2 ?? '□') + ' − ' + b, rhs: x - b, f: v => v - b, x }; },\r\n    () => { const x = rnd(2, 12), a = rnd(2, 9); return { txt: x2 => a + ' × ' + (x2 ?? '□'), rhs: a * x, f: v => a * v, x }; },\r\n    () => { const x = rnd(2, 9), a = rnd(2, 9), b = rnd(3, 9); return { txt: x2 => '(' + a + ' + ' + (x2 ?? '□') + ') × ' + b, rhs: (a + x) * b, f: v => (a + v) * b, x }; },\r\n    () => { const d = rnd(2, 9), qq = rnd(2, 12); return { txt: x2 => (x2 ?? '□') + ' ÷ ' + d, rhs: qq, f: v => v / d, x: d * qq }; }\r\n  ];\r\n  function draw(v) {\r\n    const left = v == null ? null : P.f(v), diff = left == null ? 0 : Math.max(-1, Math.min(1, (left - P.rhs) / Math.max(10, P.rhs)));\r\n    const ang = -diff * 14, ok = left === P.rhs;\r\n    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180), L1 = [320 - 210 * c, 80 - 210 * s], R1 = [320 + 210 * c, 80 + 210 * s];\r\n    let h = '<path d=\"M300 220 L340 220 L320 84 Z\" fill=\"#475569\"/><line x1=\"' + L1[0] + '\" y1=\"' + L1[1] + '\" x2=\"' + R1[0] + '\" y2=\"' + R1[1] + '\" stroke=\"#e2e8f0\" stroke-width=\"6\" stroke-linecap=\"round\"/>';\r\n    [[L1, P.txt(v), '#60a5fa'], [R1, String(P.rhs), '#f472b6']].forEach(([p, t, col]) => { h += '<line x1=\"' + p[0] + '\" y1=\"' + p[1] + '\" x2=\"' + p[0] + '\" y2=\"' + (p[1] + 50) + '\" stroke=\"#94a3b8\" stroke-width=\"2\"/><rect x=\"' + (p[0] - 95) + '\" y=\"' + (p[1] + 50) + '\" width=\"190\" height=\"56\" rx=\"12\" fill=\"rgba(255,255,255,.06)\" stroke=\"' + col + '\" stroke-width=\"3\"/><text x=\"' + p[0] + '\" y=\"' + (p[1] + 86) + '\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"22\" font-weight=\"900\">' + t + '</text>'; });\r\n    if (ok) h += '<text x=\"320\" y=\"40\" text-anchor=\"middle\" fill=\"#4ade80\" font-size=\"22\" font-weight=\"900\">' + L.balanced + '</text>';\r\n    svg.innerHTML = h;\r\n    q(root, 'sent').textContent = P.txt() + ' = ' + P.rhs;\r\n    if (v == null) { out.className = 'g4-out'; out.innerHTML = L.ask; }\r\n    else { out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = L.sub(P.txt(v), left, P.rhs, ok) + (ok ? '' : ' ' + (left < P.rhs ? L.bigger : L.smaller)); }\r\n  }\r\n  function fresh() { P = PUZ[rnd(0, PUZ.length - 1)](); inp.value = ''; draw(null); }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'try') { const v = num(inp.value); if (v != null) draw(v); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n  });\r\n  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { const v = num(inp.value); if (v != null) draw(v); } });\r\n  fresh();\r\n})(__rev({\"ask\":\"Watter getal hoort in die blokkie? Tik dit en tik op Probeer.\",\"balanced\":\"Gebalanseer!\",\"sub\":{\"__fn\":\"(t, l, r, ok) => 'Toets: ' + t + ' = ' + l + (ok ? ' = ' + r + ' ✓' : ', maar ons het ' + r + ' nodig.')\"},\"bigger\":\"Probeer 'n groter getal.\",\"smaller\":\"Probeer 'n kleiner getal.\"}), document.getElementById('s502')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Gebruik die teenoorgestelde bewerking: as □ + 25 = 50, dan is □ = 50 − 25.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "□ + 18 = 36. Wat is □?",
     "answer": "18",
     "topic": "Ontbrekende getalle"
    },
    {
     "type": "input",
     "text": "(4 + □) × 6 = 42. Wat is □?",
     "answer": "3",
     "topic": "Ontbrekende getalle"
    },
    {
     "type": "input",
     "text": "□ − 25 = 50. Wat is □?",
     "answer": "75",
     "topic": "Ontbrekende getalle"
    },
    {
     "type": "input",
     "text": "7 × □ = 63. Wat is □?",
     "answer": "9",
     "topic": "Ontbrekende getalle"
    },
    {
     "type": "input",
     "text": "□ ÷ 5 = 12. Wat is □?",
     "answer": "60",
     "topic": "Ontbrekende getalle"
    },
    {
     "type": "mc",
     "text": "Toets deur te vervang: is □ = 9 korrek vir □ × 4 = 32?",
     "options": [
      "Ja",
      "Nee"
     ],
     "answer": 1,
     "topic": "Ontbrekende getalle"
    },
    {
     "type": "input",
     "text": "100 − □ = 64. Wat is □?",
     "answer": "36",
     "topic": "Ontbrekende getalle"
    },
    {
     "type": "input",
     "text": "3 × □ + 5 = 26. Wat is □?",
     "answer": "7",
     "topic": "Ontbrekende getalle"
    }
   ]
  },
  {
   "id": 503,
   "chapter": 5,
   "name": "Getallesinne skryf",
   "fullName": "Getallesinne uit woorde skryf",
   "lesson": {
    "heading": "Getallesinne uit woorde skryf",
    "sub": "Hoofstuk 5 · Onderwerp 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/paper.webp\" srcset=\"/assets/stickers/paper@2x.webp 2x\" alt=\"\"><p>Ons kan woorde in 'n <strong>getallesin</strong> verander, met 'n blokkie of 'n letter vir die getal wat ons nie ken nie.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Van woorde na simbole</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>\"'n Getal is 3 meer as t\" → <span class=\"math\">□ = t + 3</span> (of <span class=\"math\">□ − 3 = t</span>)</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>\"Agt meer as 'n getal is 20\" → <span class=\"math\">□ + 8 = 20</span>, so □ = 12</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>\"Ses keer 'n getal is 42\" → <span class=\"math\">6 × □ = 42</span>, so □ = 7</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Woorde wat help</div><p><strong>meer as, plus, tel by</strong> → + &nbsp; <strong>minder as, minus</strong> → − &nbsp; <strong>keer, produk</strong> → × &nbsp; <strong>gedeel deur, verdeel</strong> → ÷ &nbsp; <strong>is, maak</strong> → =</p></div><div class=\"g4-sim\" id=\"s503\"><h4>🎮 Woorde na Sinne</h4><p class=\"how\">Lees die woorde. Kies die getallesin wat pas en werk dan die ontbrekende getal uit.</p><div class=\"score-pill\" data-k=\"count\" style=\"display:inline-block;margin-bottom:8px\"></div><div class=\"g4-out\" data-k=\"card\" style=\"margin-bottom:10px\"></div><div class=\"g4-row\" data-k=\"opts\"></div><div class=\"g4-row\" data-k=\"solve\" style=\"display:none\"><span style=\"font-size:20px\">□ =</span><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Toets</button></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"next\">Volgende</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, num, shuffle } = window.G4;\r\n  const card = q(root, 'card'), opts = q(root, 'opts'), out = q(root, 'out'), solve = q(root, 'solve');\r\n  let i = 0, stage = 0, score = 0;\r\n  function show() {\r\n    const p = L.items[i]; stage = 0;\r\n    card.innerHTML = '<p style=\"font-size:21px;margin:0\">' + p.w + '</p>';\r\n    q(root, 'count').textContent = L.of(i + 1, L.items.length);\r\n    opts.innerHTML = shuffle(p.o.map((o, k) => [o, k])).map(([o, k]) => '<button class=\"g4-btn ghost\" data-o=\"' + k + '\" style=\"font-size:20px\">' + o + '</button>').join('');\r\n    solve.style.display = 'none'; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.pick;\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return; const p = L.items[i];\r\n    if (t.dataset.o != null && stage === 0) {\r\n      const ok = +t.dataset.o === 0;\r\n      if (!ok) { out.className = 'g4-out bad'; out.innerHTML = L.notThat; t.disabled = true; return; }\r\n      stage = 1; opts.querySelectorAll('button').forEach(b => { b.disabled = true; if (+b.dataset.o === 0) b.setAttribute('aria-pressed', 'true'); });\r\n      solve.style.display = ''; out.className = 'g4-out good'; out.innerHTML = L.nowSolve(p.o[0]);\r\n    } else if (t.dataset.k === 'check') {\r\n      const v = num(q(root, 'ans').value), ok = v === p.a; if (ok && stage === 1) { score++; stage = 2; }\r\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.yes(p.o[0].replace('□', '<b>' + p.a + '</b>')) : L.no;\r\n    } else if (t.dataset.k === 'next') { i = (i + 1) % L.items.length; show(); }\r\n  });\r\n  show();\r\n})(__rev({\"items\":[{\"w\":\"Agt meer as 'n getal is 20.\",\"o\":[\"□ + 8 = 20\",\"□ − 8 = 20\",\"8 × □ = 20\",\"20 + 8 = □\"],\"a\":12},{\"w\":\"Ses keer 'n getal is 42.\",\"o\":[\"6 × □ = 42\",\"□ + 6 = 42\",\"42 × 6 = □\",\"□ ÷ 6 = 42\"],\"a\":7},{\"w\":\"'n Getal gedeel deur 4 is 9.\",\"o\":[\"□ ÷ 4 = 9\",\"4 ÷ □ = 9\",\"□ × 4 = 9\",\"□ − 4 = 9\"],\"a\":36},{\"w\":\"15 minder as 'n getal is 20.\",\"o\":[\"□ − 15 = 20\",\"15 − □ = 20\",\"□ + 15 = 20\",\"20 − 15 = □\"],\"a\":35},{\"w\":\"Ek dink aan 'n getal, tel 4 by en maal dan met 6. Ek kry 42.\",\"o\":[\"(□ + 4) × 6 = 42\",\"□ + 4 × 6 = 42\",\"(□ × 4) + 6 = 42\",\"□ × 6 + 4 = 42\"],\"a\":3},{\"w\":\"Thandi het 'n paar albasters gehad. Sy het 15 meer gekry en het nou 42.\",\"o\":[\"□ + 15 = 42\",\"□ − 15 = 42\",\"42 + 15 = □\",\"15 × □ = 42\"],\"a\":27}],\"of\":{\"__fn\":\"(a, b) => a + ' van ' + b\"},\"pick\":\"Watter getallesin pas by die woorde?\",\"notThat\":\"Nie daardie een nie. Lees die woorde weer.\",\"nowSolve\":{\"__fn\":\"s => 'Ja: <b>' + s + '</b>. Vind nou □.'\"},\"yes\":{\"__fn\":\"s => 'Reg! ' + s + ' ✓'\"},\"no\":\"Nog nie. Toets deur jou getal in die blokkie te sit.\"}), document.getElementById('s503')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>\"15 minder as 'n getal\" beteken begin met die getal en trek 15 af: □ − 15.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Watter getallesin beteken \"'n getal is 3 meer as t\"?",
     "options": [
      "□ = t + 3",
      "□ = t − 3",
      "□ = 3 × t",
      "t = □ + 3"
     ],
     "answer": 0,
     "topic": "Getallesinne skryf"
    },
    {
     "type": "mc",
     "text": "Watter getallesin beteken \"agt meer as 'n getal is 20\"?",
     "options": [
      "□ + 8 = 20",
      "□ − 8 = 20",
      "8 × □ = 20",
      "20 + 8 = □"
     ],
     "answer": 0,
     "topic": "Getallesinne skryf"
    },
    {
     "type": "input",
     "text": "□ + 8 = 20. Wat is □?",
     "answer": "12",
     "topic": "Getallesinne skryf"
    },
    {
     "type": "mc",
     "text": "Watter getallesin beteken \"vier keer 'n getal is 48\"?",
     "options": [
      "4 × □ = 48",
      "□ + 4 = 48",
      "48 × 4 = □",
      "□ − 4 = 48"
     ],
     "answer": 0,
     "topic": "Getallesinne skryf"
    },
    {
     "type": "input",
     "text": "Thandi het 'n paar albasters gehad. Sy het 15 meer gekry en het nou 42. Hoeveel het sy eers gehad?",
     "answer": "27",
     "topic": "Getallesinne skryf"
    },
    {
     "type": "input",
     "text": "Ek dink aan 'n getal, maal dit met 5 en tel 3 by. Die antwoord is 38. Wat is my getal?",
     "answer": "7",
     "topic": "Getallesinne skryf"
    },
    {
     "type": "mc",
     "text": "Watter getallesin beteken \"'n getal gedeel deur 6 is 7\"?",
     "options": [
      "□ ÷ 6 = 7",
      "6 ÷ □ = 7",
      "□ × 6 = 7",
      "□ − 6 = 7"
     ],
     "answer": 0,
     "topic": "Getallesinne skryf"
    },
    {
     "type": "input",
     "text": "□ ÷ 6 = 7. Wat is □?",
     "answer": "42",
     "topic": "Getallesinne skryf"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 5,
  "chapterName": "Meervoudige Bewerkings en Getallesinne",
  "topics": [
   {
    "name": "Wat kom eerste?",
    "questions": [
     {
      "num": "1",
      "text": "Bereken. Wys elke stap.",
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
    "name": "Ontbrekende getalle",
    "questions": [
     {
      "num": "2",
      "text": "Vind die ontbrekende getal. Toets deur te vervang.",
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
    "name": "Getallesinne skryf",
    "questions": [
     {
      "num": "3",
      "text": "Skryf 'n getallesin vir elkeen en vind dan die getal.",
      "parts": [
       {
        "label": "a)",
        "text": "'n Getal plus 26 is 70.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Nege keer 'n getal is 81.",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "'n Getal minus 14 is 36.",
        "marks": 2
       },
       {
        "label": "d)",
        "text": "Ek dink aan 'n getal, verdubbel dit en tel 5 by. Ek kry 29.",
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
  "chapterName": "Hoofstuk 5 — Meervoudige Bewerkings en Getallesinne",
  "topics": [
   {
    "name": "Wat kom eerste?",
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
    "name": "Ontbrekende getalle",
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
    "name": "Getallesinne skryf",
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
