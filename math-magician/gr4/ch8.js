// Math Magician — Grade 4, Chapter 8 (Financial Mathematics)
// Generated from one bilingual source (scripts/math-gr4/gen_ch8.js); edit both languages there.
MathMagician.registerChapter(8, {
 "topics": [
  {
   "id": 801,
   "chapter": 8,
   "name": "Rand and cents",
   "fullName": "Rand and cents: coins, notes and converting",
   "lesson": {
    "heading": "Rand and cents: coins, notes and converting",
    "sub": "Chapter 8 · Topic 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/sa-flag.webp\" srcset=\"/assets/stickers/sa-flag@2x.webp 2x\" alt=\"\"><p>South African money is counted in <strong>rand (R)</strong> and <strong>cents (c)</strong>. There are <strong>100 cents in 1 rand</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Rand and cents</div><p><strong>R1 = 100c</strong>. We write <strong>R5,50</strong> for 5 rand and 50 cents. The comma separates the rand from the cents, and the cents always have two digits. Coins: 10c, 20c, 50c, R1, R2 and R5. Notes: R10, R20, R50, R100 and R200.</p></div><svg viewBox=\"0 0 404 62\" style=\"display:block;width:100%;max-width:340px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#1d4ed8\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R100</text><rect x=\"104\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#b91c1c\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"150\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R50</text><rect x=\"204\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#92400e\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"250\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R20</text><rect x=\"304\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#15803d\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"350\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R10</text></svg><svg viewBox=\"0 0 328 62\" style=\"display:block;width:100%;max-width:295.2px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><circle cx=\"29\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"29\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"87\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"87\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R2</text><circle cx=\"145\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"145\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R1</text><circle cx=\"199\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"199\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"249\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"249\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">20c</text><circle cx=\"299\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"299\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">10c</text></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Converting</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Rand to cents: there are 100 cents in every rand. R7 = 700c. R5,50 = 500c + 50c = <strong>550c</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Cents to rand: 250c = 200c + 50c = <strong>R2,50</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>85c = R0,85. 1 205c = R12,05 (5 cents is written as 05).</span></div></div><div class=\"g4-sim\" id=\"g4-s801\"><h4>🎮 Fill the Purse</h4><p class=\"how\">Make the amount with South African coins and notes. Start with the biggest money that fits.</p><div class=\"g4-big\" data-k=\"goal\" style=\"font-size:24px\"></div><div class=\"g4-row\" data-k=\"pal\" style=\"gap:8px\"></div><div class=\"g4-stage\" style=\"padding:12px\"><div class=\"g4-row\" data-k=\"tray\" style=\"gap:6px;min-height:58px;margin:0\"></div></div><div data-k=\"sum\" style=\"font-size:19px\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"clear\">Empty purse</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd } = window.G4;\n  const out = q(root, 'out'), tray = q(root, 'tray');\n  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');\n  const lab = v => v >= 100 ? 'R' + v / 100 : v + 'c';\n  const NOTE = { 1000: '#15803d', 2000: '#92400e', 5000: '#b91c1c', 10000: '#1d4ed8' };\n  const chip = (v, i) => v >= 1000\n    ? '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"background:' + NOTE[v] + ';color:#fff;border-color:rgba(255,255,255,.5);min-width:72px;padding:10px 8px\">' + lab(v) + '</button>'\n    : '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"border-radius:50%;width:' + (v >= 100 ? 54 : 46) + 'px;height:' + (v >= 100 ? 54 : 46) + 'px;padding:0;font-size:' + (v >= 100 ? 16 : 14) + 'px;background:' + (v >= 100 ? 'radial-gradient(#e5e7eb,#9ca3af)' : 'radial-gradient(#fcd34d,#b45309)') + ';color:#111;border-color:rgba(255,255,255,.4)\">' + lab(v) + '</button>';\n  let target = 0, put = [];\n  const total = () => put.reduce((s, v) => s + v, 0);\n  function draw() {\n    tray.innerHTML = put.length ? put.map((v, i) => chip(v, 't' + i)).join('') : '<span style=\"opacity:.6\">' + L.empty + '</span>';\n    q(root, 'sum').innerHTML = L.total(R(total()), total());\n  }\n  function fresh() { target = rnd(2, 120) * 10; put = []; q(root, 'goal').textContent = L.goal(R(target)); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n  q(root, 'pal').innerHTML = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10].map(v => chip(v, 'p' + v)).join('');\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    const i = t.dataset.i;\n    if (i && i[0] === 'p') { put.push(+i.slice(1)); put.sort((a, b) => b - a); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n    else if (i && i[0] === 't') { put.splice(+i.slice(1), 1); draw(); }\n    else if (t.dataset.k === 'check') {\n      const s = total(), d = Math.abs(s - target);\n      out.className = 'g4-out ' + (s === target ? 'good' : 'bad');\n      out.innerHTML = s === target ? L.yes(R(target), target, put.map(lab).join(' + ')) : (s < target ? L.more : L.less)(R(d), d);\n    } else if (t.dataset.k === 'clear') { put = []; draw(); }\n    else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"empty\":\"The purse is empty.\",\"total\":{\"__fn\":\"(r, c) => 'In the purse: <b>' + r + '</b> = ' + window.G4.fmt(c) + 'c'\"},\"goal\":{\"__fn\":\"r => 'Make exactly ' + r\"},\"ask\":\"Tap coins and notes to put them in the purse. Tap money in the purse to take it out again.\",\"yes\":{\"__fn\":\"(r, c, list) => 'Exactly right! ' + list + ' = <b>' + r + '</b> = ' + window.G4.fmt(c) + 'c.'\"},\"more\":{\"__fn\":\"r => 'Not enough yet. You need ' + r + ' more.'\"},\"less\":{\"__fn\":\"r => 'Too much! Take out ' + r + '.'\"}}), document.getElementById('g4-s801')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Count money from the biggest note or coin to the smallest. It is quicker and you make fewer mistakes.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "R4 = ? cents",
     "answer": "400",
     "topic": "Rand and cents"
    },
    {
     "type": "input",
     "text": "R5,50 = ? cents",
     "answer": "550",
     "topic": "Rand and cents"
    },
    {
     "type": "input",
     "text": "Write 350c in rand.",
     "answer": "R3,50",
     "topic": "Rand and cents"
    },
    {
     "type": "mc",
     "text": "How many cents are in R1?",
     "options": [
      "100",
      "10",
      "1 000",
      "50"
     ],
     "answer": 0,
     "topic": "Rand and cents"
    },
    {
     "type": "input",
     "text": "How much money is this altogether (in rand)?<svg viewBox=\"0 0 320 62\" style=\"display:block;width:100%;max-width:288px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#92400e\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R20</text><circle cx=\"129\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"129\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"187\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"187\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R2</text><circle cx=\"241\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"241\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"291\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"291\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">20c</text></svg>",
     "answer": "R27,70",
     "topic": "Rand and cents"
    },
    {
     "type": "mc",
     "text": "Which is more?",
     "options": [
      "350c",
      "R3,05",
      "They are the same"
     ],
     "answer": 0,
     "topic": "Rand and cents"
    },
    {
     "type": "input",
     "text": "Write 1 205c in rand.",
     "answer": "R12,05",
     "topic": "Rand and cents"
    },
    {
     "type": "input",
     "text": "Lebo has three R5 coins and four 50c coins. How much money is that (in rand)?<svg viewBox=\"0 0 378 62\" style=\"display:block;width:100%;max-width:340px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><circle cx=\"29\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"29\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"87\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"87\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"145\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"145\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"199\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"199\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"249\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"249\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"299\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"299\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"349\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"349\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text></svg>",
     "answer": "R17",
     "topic": "Rand and cents"
    }
   ]
  },
  {
   "id": 802,
   "chapter": 8,
   "name": "Giving change",
   "fullName": "Shopping: working out change",
   "lesson": {
    "heading": "Shopping: working out change",
    "sub": "Chapter 8 · Topic 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/bread-loaf.webp\" srcset=\"/assets/stickers/bread-loaf@2x.webp 2x\" alt=\"\"><p>When you pay more than the price, the shopkeeper gives you <strong>change</strong>. Change = money paid − price.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Two ways to find change</div><p><strong>Subtract:</strong> money paid − price. <strong>Count on</strong>, like a shopkeeper: start at the price and add coins until you reach the money paid.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ A loaf of bread costs R16,50. You pay with a R20 note.</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Count on from R16,50: + 50c makes R17, + R1 makes R18, + R2 makes R20.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Change = 50c + R1 + R2 = <strong>R3,50</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Check by subtracting in cents: 2 000c − 1 650c = 350c = R3,50.</span></div></div><div class=\"g4-sim\" id=\"g4-s802\"><h4>🎮 Shop Till</h4><p class=\"how\">You are the shopkeeper. Count on from the price with coins and notes until you reach the money the customer paid.</p><div class=\"g4-hero\" style=\"margin:4px 0 8px\"><span data-k=\"stk\"></span><p data-k=\"sale\" style=\"font-size:19px\"></p></div><div class=\"g4-row\" data-k=\"pal\" style=\"gap:8px\"></div><div class=\"g4-stage\" style=\"padding:12px\"><div class=\"g4-row\" data-k=\"tray\" style=\"gap:6px;min-height:58px;margin:0\"></div></div><div data-k=\"line\" style=\"font-size:18px;font-variant-numeric:tabular-nums\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"clear\">Start again</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd } = window.G4;\n  const out = q(root, 'out'), tray = q(root, 'tray');\n  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');\n  const lab = v => v >= 100 ? 'R' + v / 100 : v + 'c';\n  const NOTE = { 1000: '#15803d', 2000: '#92400e', 5000: '#b91c1c' };\n  const chip = (v, i) => v >= 1000\n    ? '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"background:' + NOTE[v] + ';color:#fff;border-color:rgba(255,255,255,.5);min-width:72px;padding:10px 8px\">' + lab(v) + '</button>'\n    : '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"border-radius:50%;width:' + (v >= 100 ? 54 : 46) + 'px;height:' + (v >= 100 ? 54 : 46) + 'px;padding:0;font-size:' + (v >= 100 ? 16 : 14) + 'px;background:' + (v >= 100 ? 'radial-gradient(#e5e7eb,#9ca3af)' : 'radial-gradient(#fcd34d,#b45309)') + ';color:#111;border-color:rgba(255,255,255,.4)\">' + lab(v) + '</button>';\n  let price = 0, paid = 0, put = [], item = null;\n  const total = () => put.reduce((s, v) => s + v, 0);\n  function draw() {\n    tray.innerHTML = put.length ? put.map((v, i) => chip(v, 't' + i)).join('') : '<span style=\"opacity:.6\">' + L.empty + '</span>';\n    let run = price; const steps = [R(price)]; put.forEach(v => { run += v; steps.push(R(run)); });\n    q(root, 'line').innerHTML = steps.join(' → ') + (put.length ? '' : ' → … ' + R(paid));\n  }\n  function fresh() {\n    item = L.items[rnd(0, L.items.length - 1)]; paid = [1000, 2000, 5000][rnd(0, 2)];\n    price = rnd(Math.ceil(paid * 0.4 / 50), paid / 50 - 1) * 50;\n    put = []; q(root, 'sale').innerHTML = L.sale(item.n, R(price), R(paid)); q(root, 'stk').innerHTML = window.G4.stk(item.s);\n    out.className = 'g4-out'; out.innerHTML = L.ask; draw();\n  }\n  q(root, 'pal').innerHTML = [2000, 1000, 500, 200, 100, 50, 20, 10].map(v => chip(v, 'p' + v)).join('');\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    const i = t.dataset.i;\n    if (i && i[0] === 'p') { put.push(+i.slice(1)); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n    else if (i && i[0] === 't') { put.splice(+i.slice(1), 1); draw(); }\n    else if (t.dataset.k === 'check') {\n      const ch = paid - price, s = total();\n      out.className = 'g4-out ' + (s === ch ? 'good' : 'bad');\n      out.innerHTML = s === ch ? L.yes(R(ch), R(price), R(paid)) : (s < ch ? L.short : L.over)(R(Math.abs(ch - s)), R(price + s), R(paid));\n    } else if (t.dataset.k === 'clear') { put = []; draw(); }\n    else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"items\":[{\"n\":\"a loaf of bread\",\"s\":\"bread-loaf\"},{\"n\":\"a bag of apples\",\"s\":\"apple\"},{\"n\":\"a carton of milk\",\"s\":\"milk\"},{\"n\":\"an ice cream\",\"s\":\"ice-cream\"},{\"n\":\"a slab of chocolate\",\"s\":\"chocolate\"},{\"n\":\"a tub of butter\",\"s\":\"butter\"}],\"sale\":{\"__fn\":\"(n, p, paid) => 'A customer buys ' + n + ' for <b>' + p + '</b> and pays with <b>' + paid + '</b>. Give the change!'\"},\"empty\":\"No change given yet.\",\"ask\":\"Tap coins and notes to count on from the price up to the money paid.\",\"yes\":{\"__fn\":\"(ch, p, paid) => 'Correct! The change is <b>' + ch + '</b>. Check: ' + p + ' + ' + ch + ' = ' + paid + '.'\"},\"short\":{\"__fn\":\"(d, reached, paid) => 'You have counted up to ' + reached + ', but the customer paid ' + paid + '. Give ' + d + ' more.'\"},\"over\":{\"__fn\":\"(d, reached, paid) => 'Too much! You counted up to ' + reached + ', past ' + paid + '. Take back ' + d + '.'\"}}), document.getElementById('g4-s802')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Always check your change: price + change must equal the money you paid.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "A pen costs R7. You pay with R10. How much change do you get?",
     "answer": "R3",
     "topic": "Giving change"
    },
    {
     "type": "input",
     "text": "Bread costs R16,50. You pay with a R20 note. How much change do you get?<svg viewBox=\"0 0 104 62\" style=\"display:block;width:100%;max-width:93.60000000000001px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#92400e\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R20</text></svg>",
     "answer": "R3,50",
     "topic": "Giving change"
    },
    {
     "type": "input",
     "text": "A T-shirt costs R34. You pay with R50. How much change do you get?<svg viewBox=\"0 0 104 62\" style=\"display:block;width:100%;max-width:93.60000000000001px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#b91c1c\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R50</text></svg>",
     "answer": "R16",
     "topic": "Giving change"
    },
    {
     "type": "input",
     "text": "A book costs R12,75. You pay with R20. How much change do you get?",
     "answer": "R7,25",
     "topic": "Giving change"
    },
    {
     "type": "mc",
     "text": "You must give 80c change. Which coins use the fewest coins?",
     "options": [
      "50c + 20c + 10c",
      "20c + 20c + 20c + 20c",
      "50c + 10c + 10c + 10c",
      "eight 10c coins"
     ],
     "answer": 0,
     "topic": "Giving change"
    },
    {
     "type": "input",
     "text": "You buy an apple for R4,50 and a juice for R8. You pay with R20. How much change do you get?<svg viewBox=\"0 0 104 62\" style=\"display:block;width:100%;max-width:93.60000000000001px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#92400e\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R20</text></svg>",
     "answer": "R7,50",
     "topic": "Giving change"
    },
    {
     "type": "input",
     "text": "Sipho paid with R50 and got R6 change. How much did he spend?",
     "answer": "R44",
     "topic": "Giving change"
    },
    {
     "type": "mc",
     "text": "Something costs R23,40. The customer pays with R50 and gets R26,60 change. Is the change correct?",
     "options": [
      "Yes",
      "No"
     ],
     "answer": 0,
     "topic": "Giving change"
    }
   ]
  },
  {
   "id": 803,
   "chapter": 8,
   "name": "Budgets and profit",
   "fullName": "Buying, selling and simple budgets",
   "lesson": {
    "heading": "Buying, selling and simple budgets",
    "sub": "Chapter 8 · Topic 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/ice-cream.webp\" srcset=\"/assets/stickers/ice-cream@2x.webp 2x\" alt=\"\"><p>A <strong>budget</strong> is a plan for spending your money so that you do not spend more than you have. When you sell something for more than it cost you, you make a <strong>profit</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Words to know</div><p><strong>Cost price:</strong> what you pay for something. <strong>Selling price:</strong> what you sell it for. <strong>Profit</strong> = selling price − cost price. <strong>Budget:</strong> a list of what you plan to spend, compared with the money you have.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Selling oranges</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Thandi buys 10 oranges for R20 and sells each one for R3.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>She sells all 10 for 10 × R3 = R30.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Profit = R30 − R20 = <strong>R10</strong>.</span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ A budget of R50</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Bread R16 + milk R18 + apples R10 = <strong>R44</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>R50 − R44 = <strong>R6</strong> left over.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>R6 is not enough for juice at R9, so the juice must wait for next time.</span></div></div><div class=\"g4-sim\" id=\"g4-s803\"><h4>🎮 Tuck Shop Budget</h4><p class=\"how\">Plan your shopping. Buy what you must have first, then use what is left without going over.</p><div data-k=\"task\" style=\"font-size:19px;margin-bottom:8px\"></div><div class=\"g4-row\" data-k=\"shop\" style=\"gap:8px;justify-content:center\"></div><div class=\"g4-big\" data-k=\"live\" style=\"font-size:20px\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd, shuffle } = window.G4;\n  const out = q(root, 'out'), shop = q(root, 'shop');\n  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');\n  let budget = 0, must = [], got = new Set();\n  const spent = () => [...got].reduce((s, i) => s + L.items[i].p, 0);\n  function draw() {\n    shop.innerHTML = L.items.map((it, i) => '<button class=\"g4-btn ghost\" data-it=\"' + i + '\" aria-pressed=\"' + got.has(i) + '\" style=\"display:flex;flex-direction:column;align-items:center;gap:2px;width:104px;padding:8px 4px\">' + '<img src=\"/assets/stickers/' + it.s + '.webp\" srcset=\"/assets/stickers/' + it.s + '@2x.webp 2x\" alt=\"\" style=\"width:58px;height:58px;object-fit:contain\">' + '<span style=\"font-size:15px\">' + it.n + '</span><b>' + R(it.p) + '</b>' + (must.includes(i) ? '<span style=\"font-size:12px;color:#fbbf24\">' + L.mustTag + '</span>' : '') + '</button>').join('');\n    const s = spent(), left = budget - s;\n    q(root, 'live').innerHTML = L.live(R(s), left >= 0 ? R(left) : '−' + R(-left));\n  }\n  function fresh() {\n    budget = [3000, 4000, 5000][rnd(0, 2)];\n    do { must = shuffle(L.items.map((_, i) => i)).slice(0, 2); } while (L.items[must[0]].p + L.items[must[1]].p > budget - 800);\n    got = new Set(must); q(root, 'task').innerHTML = L.task(R(budget), must.map(i => L.items[i].n).join(L.and));\n    out.className = 'g4-out'; out.innerHTML = L.ask; draw();\n  }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.it != null) { const i = +t.dataset.it; if (got.has(i)) got.delete(i); else got.add(i); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n    else if (t.dataset.k === 'check') {\n      const s = spent(), left = budget - s, miss = must.filter(i => !got.has(i));\n      const fits = L.items.map((it, i) => i).filter(i => !got.has(i) && L.items[i].p <= left).sort((a, b) => L.items[a].p - L.items[b].p);\n      out.className = 'g4-out bad';\n      if (miss.length) out.innerHTML = L.missing(miss.map(i => L.items[i].n).join(L.and));\n      else if (left < 0) out.innerHTML = L.over(R(-left));\n      else if (fits.length) out.innerHTML = L.more(R(left), L.items[fits[0]].n, R(L.items[fits[0]].p));\n      else { out.className = 'g4-out good'; out.innerHTML = L.yes(R(s), R(budget), R(left)); }\n    } else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"items\":[{\"n\":\"Bread\",\"s\":\"bread-loaf\",\"p\":1650},{\"n\":\"Milk\",\"s\":\"milk\",\"p\":1800},{\"n\":\"Apple\",\"s\":\"apple\",\"p\":450},{\"n\":\"Banana\",\"s\":\"banana\",\"p\":350},{\"n\":\"Juice\",\"s\":\"juice-box\",\"p\":900},{\"n\":\"Chocolate\",\"s\":\"chocolate\",\"p\":1250},{\"n\":\"Ice cream\",\"s\":\"ice-cream\",\"p\":1500},{\"n\":\"Mealie\",\"s\":\"mealie\",\"p\":600}],\"and\":\" and \",\"mustTag\":\"must buy\",\"live\":{\"__fn\":\"(s, l) => 'Spent: <b>' + s + '</b> · Left: <b>' + l + '</b>'\"},\"task\":{\"__fn\":\"(b, list) => 'You have <b>' + b + '</b>. You must buy ' + list + '. Then add more things, but do not go over your budget. Keep going until nothing else fits.'\"},\"ask\":\"Tap items to put them in your basket or take them out. Then tap Check.\",\"missing\":{\"__fn\":\"list => 'You still have to buy ' + list + '. The things you need come first!'\"},\"over\":{\"__fn\":\"d => 'Over budget by ' + d + '. Take something out.'\"},\"more\":{\"__fn\":\"(left, n, p) => 'You are within your budget with ' + left + ' left, but you can still afford ' + n + ' (' + p + ').'\"},\"yes\":{\"__fn\":\"(s, b, left) => 'Great budgeting! You spent ' + s + ' of ' + b + ' and have ' + left + ' left. Nothing else fits.'\"}}), document.getElementById('g4-s803')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Write down the things you <em>need</em> first. Then see what is left for the things you would <em>like</em>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Your budget is R50. You spend R36. How much is left?",
     "answer": "R14",
     "topic": "Budgets and profit"
    },
    {
     "type": "input",
     "text": "A shop buys a cap for R15 and sells it for R22. What is the profit?",
     "answer": "R7",
     "topic": "Budgets and profit"
    },
    {
     "type": "input",
     "text": "Apples cost R2 each. How much do 6 apples cost?",
     "answer": "R12",
     "topic": "Budgets and profit"
    },
    {
     "type": "mc",
     "text": "What does profit mean?",
     "options": [
      "selling price − cost price",
      "cost price − selling price",
      "cost price + selling price",
      "the price of one item"
     ],
     "answer": 0,
     "topic": "Budgets and profit"
    },
    {
     "type": "mc",
     "text": "Your budget is R30. Is it enough for these two things?<table style=\"border-collapse:collapse;margin:12px auto;font-size:18px\"><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Bread</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R16,50</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Milk</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R11,00</td></tr></table>",
     "options": [
      "Yes, with R2,50 left",
      "No, R2,50 short",
      "Yes, with R3,50 left",
      "No, R3,50 short"
     ],
     "answer": 0,
     "topic": "Budgets and profit"
    },
    {
     "type": "input",
     "text": "Ayanda buys a packet of 12 sweets for R18 and sells each sweet for R2. What is the profit if all the sweets are sold?",
     "answer": "R6",
     "topic": "Budgets and profit"
    },
    {
     "type": "input",
     "text": "You get R40 pocket money for the week. You spend R12 on Monday and R15 on Wednesday. How much is left?",
     "answer": "R13",
     "topic": "Budgets and profit"
    },
    {
     "type": "input",
     "text": "Zola has R100. Zola wants shoes for R85 and socks for R25. How much more money is needed?",
     "answer": "R10",
     "topic": "Budgets and profit"
    }
   ]
  },
  {
   "id": 804,
   "chapter": 8,
   "name": "Money problems",
   "fullName": "Solving problems with money",
   "lesson": {
    "heading": "Solving problems with money",
    "sub": "Chapter 8 · Topic 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/child.webp\" srcset=\"/assets/stickers/child@2x.webp 2x\" alt=\"\"><p>Many money problems have more than one step. Read carefully, write down each step and check that your answer makes sense.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Steps</div><p><strong>1.</strong> Find the cost of each kind of item (number × price). <strong>2.</strong> Add to find the total. <strong>3.</strong> Subtract the total from the money paid to find the change. Working in cents can make it easier.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Modise buys 3 books at R5,50 each, 2 pencils at R2,25 each and a ruler for R3,75. How much change does Modise get from R30?</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Books: 3 × R5,50 = R16,50. Pencils: 2 × R2,25 = R4,50. Ruler: R3,75.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Total: R16,50 + R4,50 + R3,75 = <strong>R24,75</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Change: R30 − R24,75 = <strong>R5,25</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s804\"><h4>🎮 Till Slip</h4><p class=\"how\">Complete the till slip, one step at a time. Each box tells you if it is right.</p><div class=\"g4-stage\" style=\"padding:12px\"><table data-k=\"slip\" style=\"width:100%;border-collapse:separate;border-spacing:0 8px\"></table></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Check</button><button class=\"g4-btn ghost\" data-k=\"new\">New one</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd } = window.G4;\n  const out = q(root, 'out'), slip = q(root, 'slip');\n  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');\n  const parse = s => { s = String(s).replace(/[\\s ]/g, '').replace(/^r/i, ''); if (!s) return null; if (/c$/i.test(s)) { const v = parseInt(s, 10); return isNaN(v) ? null : v; } const v = parseFloat(s.replace(',', '.')); return isNaN(v) ? null : Math.round(v * 100); };\n  let P = null;\n  function fresh() {\n    const a = L.items.slice().sort(() => Math.random() - 0.5).slice(0, 2);\n    const lines = a.map(it => ({ n: it.n, k: rnd(2, 4), p: rnd(it.lo, it.hi) * 50 }));\n    const tot = lines.reduce((s, l) => s + l.k * l.p, 0), paid = [2000, 5000, 10000, 20000].find(v => v > tot);\n    P = { lines, tot, paid };\n    const inp = k => '<input class=\"g4-input\" data-k=\"' + k + '\" inputmode=\"decimal\" style=\"width:120px\" aria-label=\"' + k + '\">';\n    slip.innerHTML = lines.map((l, i) => '<tr><td style=\"text-align:left;font-size:18px\">' + l.k + ' × ' + l.n + ' @ ' + R(l.p) + '</td><td>' + inp('l' + i) + '</td></tr>').join('') +\n      '<tr><td style=\"text-align:left;font-size:18px\"><b>' + L.total + '</b></td><td>' + inp('tot') + '</td></tr>' +\n      '<tr><td style=\"text-align:left;font-size:18px\">' + L.paid(R(paid)) + ' · <b>' + L.change + '</b></td><td>' + inp('ch') + '</td></tr>';\n    out.className = 'g4-out'; out.innerHTML = L.ask;\n  }\n  function check() {\n    const want = { l0: P.lines[0].k * P.lines[0].p, l1: P.lines[1].k * P.lines[1].p, tot: P.tot, ch: P.paid - P.tot };\n    const msgs = []; let all = true;\n    Object.keys(want).forEach(k => {\n      const el = q(root, k), v = parse(el.value), ok = v === want[k];\n      el.style.borderColor = v == null ? '' : ok ? '#4ade80' : '#f87171';\n      if (!ok) { all = false; if (v != null) msgs.push(k === 'tot' ? L.tipTot : k === 'ch' ? L.tipCh(R(P.paid)) : L.tipLine(P.lines[+k[1]].k, R(P.lines[+k[1]].p))); }\n    });\n    out.className = 'g4-out ' + (all ? 'good' : 'bad');\n    out.innerHTML = all ? L.yes(R(P.tot), R(P.paid - P.tot), R(P.paid)) : (msgs.length ? msgs.join('<br>') : L.fill);\n  }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.k === 'check') check(); else if (t.dataset.k === 'new') fresh();\n  });\n  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') check(); });\n  fresh();\n})(__rev({\"items\":[{\"n\":\"pencils\",\"lo\":3,\"hi\":8},{\"n\":\"books\",\"lo\":8,\"hi\":24},{\"n\":\"rulers\",\"lo\":5,\"hi\":10},{\"n\":\"erasers\",\"lo\":2,\"hi\":6},{\"n\":\"pens\",\"lo\":4,\"hi\":12}],\"total\":\"Total\",\"change\":\"Change\",\"paid\":{\"__fn\":\"r => 'Paid ' + r\"},\"ask\":\"Work out each line (number × price), then the total and the change. You can type R5,50 or 550c.\",\"tipLine\":{\"__fn\":\"(k, p) => 'Check the line ' + k + ' × ' + p + '. Tip: work in cents, then change back to rand.'\"},\"tipTot\":\"The total is the two lines added together.\",\"tipCh\":{\"__fn\":\"paid => 'Change = ' + paid + ' − total.'\"},\"fill\":\"Fill in every box.\",\"yes\":{\"__fn\":\"(t, c, paid) => 'All correct! The total is ' + t + ', and ' + paid + ' − ' + t + ' = <b>' + c + '</b> change.'\"}}), document.getElementById('g4-s804')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Estimate first: 3 books at about R6 is about R18. If your answer is very far from your estimate, check your work again.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Modise buys 3 books at R5,50 each, 2 pencils at R2,25 each and a ruler for R3,75. How much change does Modise get from R30?",
     "answer": "R5,25",
     "topic": "Money problems"
    },
    {
     "type": "input",
     "text": "Pens cost R3,50 each. How much do 4 pens cost?",
     "answer": "R14",
     "topic": "Money problems"
    },
    {
     "type": "input",
     "text": "R12,75 + R8,50 = ?",
     "answer": "R21,25",
     "topic": "Money problems"
    },
    {
     "type": "mc",
     "text": "Mpho has R20. A pie costs R14,50 and a juice costs R6. Can Mpho buy both?",
     "options": [
      "No, R0,50 short",
      "Yes, with R0,50 left",
      "Yes, exactly enough",
      "No, R1,50 short"
     ],
     "answer": 0,
     "topic": "Money problems"
    },
    {
     "type": "input",
     "text": "A taxi trip costs R15. Lindiwe takes a taxi to school and back home every day for 5 days. How much is that?",
     "answer": "R150",
     "topic": "Money problems"
    },
    {
     "type": "input",
     "text": "You buy 2 loaves of bread at R16 each and 3 cartons of milk at R18 each. How much change do you get from R100?",
     "answer": "R14",
     "topic": "Money problems"
    },
    {
     "type": "input",
     "text": "Three friends share R45 equally. How much does each friend get?",
     "answer": "R15",
     "topic": "Money problems"
    },
    {
     "type": "input",
     "text": "Tickets cost R40 for an adult and R25 for a child. What do 2 adults and 3 children pay altogether?<table style=\"border-collapse:collapse;margin:12px auto;font-size:18px\"><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Adult</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R40</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Child</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R25</td></tr></table>",
     "answer": "R155",
     "topic": "Money problems"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 8,
  "chapterName": "Financial Mathematics",
  "topics": [
   {
    "name": "Rand and cents",
    "questions": [
     {
      "num": "1",
      "text": "Write in cents.",
      "parts": [
       {
        "label": "a)",
        "text": "R8",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "R6,40",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "R12,05",
        "marks": 1
       }
      ]
     },
     {
      "num": "2",
      "text": "Write in rand.",
      "parts": [
       {
        "label": "a)",
        "text": "300c",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "475c",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "90c",
        "marks": 1
       }
      ]
     },
     {
      "num": "3",
      "text": "Write down which coins and notes you could use to pay exactly:",
      "parts": [
       {
        "label": "a)",
        "text": "R37,50",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "R8,90, using as few coins as possible",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Giving change",
    "questions": [
     {
      "num": "4",
      "text": "Work out the change.",
      "parts": [
       {
        "label": "a)",
        "text": "Price R8, paid with R10",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "Price R27, paid with R50",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "Price R14,50, paid with R20",
        "marks": 2
       },
       {
        "label": "d)",
        "text": "Price R63,20, paid with R100",
        "marks": 2
       }
      ]
     },
     {
      "num": "5",
      "text": "Nomsa buys a pen for R12,50 and pays with a R20 note.",
      "parts": [
       {
        "label": "a)",
        "text": "How much change does Nomsa get?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Write down which coins the shopkeeper could give.",
        "marks": 2
       }
      ]
     },
     {
      "num": "6",
      "text": "Tom paid with a R50 note and got R13,50 change.",
      "parts": [
       {
        "label": "",
        "text": "How much did Tom spend?",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Budgets and profit",
    "questions": [
     {
      "num": "7",
      "text": "Your class has R60 for a party. This is the plan:<table style=\"border-collapse:collapse;margin:12px auto;font-size:18px\"><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);font-weight:800\">Item</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;font-weight:800\">Price</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Cooldrink</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R24</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Chips</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R18</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Sweets</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R12</td></tr></table>",
      "parts": [
       {
        "label": "a)",
        "text": "What is the total?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "How much is left from R60?",
        "marks": 1
       }
      ]
     },
     {
      "num": "8",
      "text": "Musa makes bead bracelets. The beads for one bracelet cost R7. Musa sells each bracelet for R12.",
      "parts": [
       {
        "label": "a)",
        "text": "What is the profit on one bracelet?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "What is the profit on 8 bracelets?",
        "marks": 2
       }
      ]
     },
     {
      "num": "9",
      "text": "Plan a picnic with a budget of R50. Prices: bread R16, juice R14, apples R9, cheese R22, biscuits R11.",
      "parts": [
       {
        "label": "a)",
        "text": "Choose what to buy and write the total.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "How much is left from R50?",
        "marks": 1
       }
      ]
     }
    ]
   },
   {
    "name": "Money problems",
    "questions": [
     {
      "num": "10",
      "text": "You buy 2 juices at R8,50 each and a muffin for R6,75. You pay with R50.",
      "parts": [
       {
        "label": "a)",
        "text": "What is the total?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "How much change do you get?",
        "marks": 2
       }
      ]
     },
     {
      "num": "11",
      "text": "Lindi saves R15 every week.",
      "parts": [
       {
        "label": "a)",
        "text": "How much has Lindi saved after 6 weeks?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "How many weeks does it take to save R120?",
        "marks": 2
       }
      ]
     },
     {
      "num": "12",
      "text": "A packet of 4 bread rolls costs R14. One roll on its own costs R4.",
      "parts": [
       {
        "label": "a)",
        "text": "How much do 4 single rolls cost?",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "Which is the better buy? Explain.",
        "marks": 2
       }
      ]
     }
    ]
   }
  ]
 },
 "answerKey": {
  "chapter": 8,
  "chapterName": "Chapter 8 — Financial Mathematics",
  "topics": [
   {
    "name": "Rand and cents",
    "answers": [
     {
      "num": "Q1a",
      "ans": "800c",
      "note": "8 × 100"
     },
     {
      "num": "Q1b",
      "ans": "640c",
      "note": "600c + 40c"
     },
     {
      "num": "Q1c",
      "ans": "1 205c",
      "note": "1 200c + 5c"
     },
     {
      "num": "Q2a",
      "ans": "R3,00",
      "note": ""
     },
     {
      "num": "Q2b",
      "ans": "R4,75",
      "note": "400c + 75c"
     },
     {
      "num": "Q2c",
      "ans": "R0,90",
      "note": ""
     },
     {
      "num": "Q3a",
      "ans": "R20 + R10 + R5 + R2 + 50c",
      "note": "One possible answer."
     },
     {
      "num": "Q3b",
      "ans": "R5 + R2 + R1 + 50c + 20c + 20c",
      "note": "6 coins"
     }
    ]
   },
   {
    "name": "Giving change",
    "answers": [
     {
      "num": "Q4a",
      "ans": "R2",
      "note": ""
     },
     {
      "num": "Q4b",
      "ans": "R23",
      "note": "R50 − R27"
     },
     {
      "num": "Q4c",
      "ans": "R5,50",
      "note": "2 000c − 1 450c = 550c"
     },
     {
      "num": "Q4d",
      "ans": "R36,80",
      "note": "10 000c − 6 320c = 3 680c"
     },
     {
      "num": "Q5a",
      "ans": "R7,50",
      "note": "R20 − R12,50"
     },
     {
      "num": "Q5b",
      "ans": "R5 + R2 + 50c",
      "note": "One possible answer."
     },
     {
      "num": "Q6",
      "ans": "R36,50",
      "note": "R50 − R13,50"
     }
    ]
   },
   {
    "name": "Budgets and profit",
    "answers": [
     {
      "num": "Q7a",
      "ans": "R54",
      "note": "R24 + R18 + R12"
     },
     {
      "num": "Q7b",
      "ans": "R6",
      "note": "R60 − R54"
     },
     {
      "num": "Q8a",
      "ans": "R5",
      "note": "R12 − R7"
     },
     {
      "num": "Q8b",
      "ans": "R40",
      "note": "8 × R5"
     },
     {
      "num": "Q9a",
      "ans": "≤ R50",
      "note": "Own choice; for example bread + juice + apples + biscuits = R50."
     },
     {
      "num": "Q9b",
      "ans": "R50 − total",
      "note": "For the example above: R0."
     }
    ]
   },
   {
    "name": "Money problems",
    "answers": [
     {
      "num": "Q10a",
      "ans": "R23,75",
      "note": "2 × R8,50 = R17; R17 + R6,75"
     },
     {
      "num": "Q10b",
      "ans": "R26,25",
      "note": "R50 − R23,75"
     },
     {
      "num": "Q11a",
      "ans": "R90",
      "note": "6 × R15"
     },
     {
      "num": "Q11b",
      "ans": "8",
      "note": "R120 ÷ R15 = 8 weeks"
     },
     {
      "num": "Q12a",
      "ans": "R16",
      "note": "4 × R4"
     },
     {
      "num": "Q12b",
      "ans": "R14 < R16",
      "note": "The packet: it saves R2."
     }
    ]
   }
  ]
 }
});
