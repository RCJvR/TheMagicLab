// Math Magician — Grade 4, Chapter 3 (Vermenigvuldiging, Veelvoude en Faktore) — Afrikaans
// Generated from one bilingual source (scripts/math-gr4/gen_ch3.js); edit both languages there.
MathMagician.registerChapter(3, {
 "topics": [
  {
   "id": 301,
   "chapter": 3,
   "name": "Vermenigvuldig",
   "fullName": "Vermenigvuldiging as herhaalde optelling",
   "lesson": {
    "heading": "Vermenigvuldiging as herhaalde optelling",
    "sub": "Hoofstuk 3 · Onderwerp 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/chicken.webp\" srcset=\"/assets/stickers/chicken@2x.webp 2x\" alt=\"\"><p><strong>Vermenigvuldig</strong> is 'n vinnige manier om dieselfde getal oor en oor by te tel. <span class=\"math\">4 × 2</span> beteken 4 groepe van 2: <span class=\"math\">2 + 2 + 2 + 2 = 8</span>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Enige volgorde</div><p>Ons kan in enige volgorde vermenigvuldig: <span class=\"math\">4 × 2 = 2 × 4</span> en <span class=\"math\">60 × 76 = 76 × 60</span>. Die antwoord van 'n vermenigvuldiging word die <strong>produk</strong> genoem.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Ken jou tafels</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Leer die tafels tot <span class=\"math\">10 × 10</span> sodat jy hulle vinnig kan gebruik.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Gebruik 'n feit wat jy ken: <span class=\"math\">7 × 8</span> is dubbel <span class=\"math\">7 × 4 = 28</span>, so dit is <strong>56</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">9 × 6</span> is <span class=\"math\">10 × 6 − 6 = 60 − 6 = 54</span>.</span></div></div><div class=\"g4-sim\" id=\"s301\"><h4>🎮 Spronge en Skikkings</h4><p class=\"how\">Verander die getalle. Sien die vermenigvuldiging as spronge op 'n getallelyn en as rye kolletjies.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-s=\"a:-1\">−</button><span class=\"g4-big\" data-k=\"a\" style=\"min-width:40px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"a:1\">+</button><span class=\"g4-big\">×</span><button class=\"g4-btn ghost\" data-s=\"b:-1\">−</button><span class=\"g4-big\" data-k=\"b\" style=\"min-width:40px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"b:1\">+</button><button class=\"g4-btn ghost\" data-k=\"swap\">Ruil om</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 160\" data-k=\"line\" role=\"img\" aria-label=\"number line\"></svg></div><div class=\"g4-stage\"><svg data-k=\"arr\" role=\"img\" aria-label=\"array\" style=\"max-width:300px\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const line = q(root, 'line'), arr = q(root, 'arr'), out = q(root, 'out');\r\n  let a = 4, b = 2;\r\n  function draw() {\r\n    q(root, 'a').textContent = a; q(root, 'b').textContent = b;\r\n    const total = a * b, max = Math.max(10, Math.ceil(total / 10) * 10), X = n => 30 + n / max * 580;\r\n    let h = '<line x1=\"30\" y1=\"100\" x2=\"610\" y2=\"100\" stroke=\"#e2e8f0\" stroke-width=\"3\"/>';\r\n    for (let n = 0; n <= max; n += (max > 50 ? 10 : 5)) h += '<line x1=\"' + X(n) + '\" y1=\"92\" x2=\"' + X(n) + '\" y2=\"108\" stroke=\"#e2e8f0\" stroke-width=\"2\"/><text x=\"' + X(n) + '\" y=\"128\" text-anchor=\"middle\" fill=\"rgba(226,232,240,.75)\" font-size=\"14\">' + n + '</text>';\r\n    for (let i = 0; i < a; i++) { const x1 = X(i * b), x2 = X((i + 1) * b); h += '<path d=\"M' + x1 + ' 96 Q' + ((x1 + x2) / 2) + ' ' + (96 - Math.min(60, 14 + (x2 - x1) * 0.6)) + ' ' + x2 + ' 96\" fill=\"none\" stroke=\"#9ed43c\" stroke-width=\"3\"/>'; }\r\n    h += '<circle cx=\"' + X(total) + '\" cy=\"100\" r=\"8\" fill=\"#fde047\"/><text x=\"' + X(total) + '\" y=\"150\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + total + '</text>';\r\n    line.innerHTML = h;\r\n    let g = ''; const s = Math.min(26, 220 / Math.max(a, b));\r\n    for (let r = 0; r < a; r++) for (let c = 0; c < b; c++) g += '<circle cx=\"' + (20 + c * s + s / 2) + '\" cy=\"' + (10 + r * s + s / 2) + '\" r=\"' + (s * 0.36) + '\" fill=\"#60a5fa\"/>';\r\n    arr.setAttribute('viewBox', '0 0 ' + (40 + b * s) + ' ' + (20 + a * s)); arr.innerHTML = g;\r\n    out.innerHTML = '<b>' + a + ' × ' + b + ' = ' + total + '</b><br>' + L.rep(Array(a).fill(b).join(' + '), total) + '<br>' + L.rows(a, b, total);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.s) { const [k, d] = t.dataset.s.split(':'); if (k === 'a') a = Math.max(1, Math.min(10, a + +d)); else b = Math.max(1, Math.min(10, b + +d)); }\r\n    else if (t.dataset.k === 'swap') { [a, b] = [b, a]; out.dataset.swapped = '1'; }\r\n    draw();\r\n    if (t.dataset.k === 'swap') out.innerHTML += '<br>' + L.swapped;\r\n  });\r\n  draw();\r\n})(__rev({\"rep\":{\"__fn\":\"(s, t) => 'Herhaalde optelling: ' + s + ' = ' + t\"},\"rows\":{\"__fn\":\"(a, b, t) => a + ' rye van ' + b + ' kolletjies maak ' + t + ' kolletjies.'\"},\"swapped\":\"Jy het die getalle omgeruil en die antwoord het dieselfde gebly!\"}), document.getElementById('s301')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Op 'n getallelyn is <span class=\"math\">3 × 5</span> <strong>3 spronge van 5</strong>: 5, 10, 15.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "4 × 2 = ?",
     "answer": "8",
     "topic": "Vermenigvuldig"
    },
    {
     "type": "mc",
     "text": "2 + 2 + 2 + 2 + 2 is dieselfde as…",
     "options": [
      "2 × 5",
      "5 + 2",
      "2 × 2",
      "10 × 2"
     ],
     "answer": 0,
     "topic": "Vermenigvuldig"
    },
    {
     "type": "input",
     "text": "7 × 8 = ?",
     "answer": "56",
     "topic": "Vermenigvuldig"
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
     "topic": "Vermenigvuldig"
    },
    {
     "type": "input",
     "text": "9 × 6 = ?",
     "answer": "54",
     "topic": "Vermenigvuldig"
    },
    {
     "type": "input",
     "text": "'n Saal het 6 rye stoele met 7 stoele in elke ry. Hoeveel stoele is daar?",
     "answer": "42",
     "topic": "Vermenigvuldig"
    },
    {
     "type": "mc",
     "text": "Watter een wys 3 × 5 op 'n getallelyn?",
     "options": [
      "3 spronge van 5",
      "5 spronge van 5",
      "3 spronge van 3",
      "8 spronge van 1"
     ],
     "answer": 0,
     "topic": "Vermenigvuldig"
    },
    {
     "type": "input",
     "text": "10 × 10 = ?",
     "answer": "100",
     "topic": "Vermenigvuldig"
    }
   ]
  },
  {
   "id": 302,
   "chapter": 3,
   "name": "Veelvoude",
   "fullName": "Veelvoude van 1-syfergetalle",
   "lesson": {
    "heading": "Veelvoude van 1-syfergetalle",
    "sub": "Hoofstuk 3 · Onderwerp 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/bee.webp\" srcset=\"/assets/stickers/bee@2x.webp 2x\" alt=\"\"><p>Die <strong>veelvoude</strong> van 'n getal is die antwoorde in sy tafel. Die veelvoude van 3 is 3, 6, 9, 12, 15 … Hulle gaan aan en aan!</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Veelvoude van 8 tussen 30 en 60</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Tel in 8'e: 8, 16, 24, <strong>32, 40, 48, 56</strong>, 64 …</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Die tussen 30 en 60 is <span class=\"math\">32; 40; 48; 56</span>.</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Herken 'n veelvoud</div><p>Veelvoude van <strong>2</strong> is ewe. Veelvoude van <strong>5</strong> eindig op 0 of 5. Veelvoude van <strong>10</strong> eindig op 0.</p></div><div class=\"g4-sim\" id=\"s302\"><h4>🎮 Honderdblok-jag</h4><p class=\"how\">Kies 'n getal. Tik dan op al sy veelvoude op die honderdblok.</p><div class=\"g4-row\" data-k=\"ns\"></div><div data-k=\"grid\" style=\"display:grid;grid-template-columns:repeat(10,1fr);gap:4px;max-width:520px;margin:10px 0\"></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"show\">Wys almal</button><button class=\"g4-btn ghost\" data-k=\"reset\">Begin oor</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const grid = q(root, 'grid'), out = q(root, 'out');\r\n  let n = 8, found = new Set();\r\n  q(root, 'ns').innerHTML = [2, 3, 4, 5, 6, 7, 8, 9].map(k => '<button class=\"g4-btn ghost\" data-n=\"' + k + '\">' + k + '</button>').join('');\r\n  grid.innerHTML = Array.from({ length: 100 }, (_, i) => '<button data-c=\"' + (i + 1) + '\" style=\"font:700 15px \\'Cabinet Grotesk\\',sans-serif;padding:0;aspect-ratio:1;border-radius:7px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#e2e8f0;cursor:pointer\">' + (i + 1) + '</button>').join('');\r\n  const total = () => Math.floor(100 / n);\r\n  function paint(showAll) {\r\n    root.querySelectorAll('[data-n]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.n === n));\r\n    grid.querySelectorAll('[data-c]').forEach(c => { const v = +c.dataset.c, hit = found.has(v) || (showAll && v % n === 0); c.style.background = hit ? 'rgba(158,212,60,.35)' : 'rgba(255,255,255,.04)'; c.style.borderColor = hit ? '#9ed43c' : 'rgba(255,255,255,.1)'; });\r\n    out.className = 'g4-out' + (found.size === total() ? ' good' : '');\r\n    out.innerHTML = found.size === total() ? L.all(n, total()) : L.found(found.size, total(), n);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.n) { n = +t.dataset.n; found = new Set(); paint(); }\r\n    else if (t.dataset.c) {\r\n      const v = +t.dataset.c;\r\n      if (v % n === 0) { found.add(v); paint(); }\r\n      else { t.style.background = 'rgba(244,63,94,.35)'; setTimeout(() => { t.style.background = found.has(v) ? 'rgba(158,212,60,.35)' : 'rgba(255,255,255,.04)'; }, 500); out.className = 'g4-out bad'; out.innerHTML = L.not(v, n, Math.floor(v / n), v % n); }\r\n    } else if (t.dataset.k === 'show') { for (let v = n; v <= 100; v += n) found.add(v); paint(); }\r\n    else if (t.dataset.k === 'reset') { found = new Set(); paint(); }\r\n  });\r\n  paint();\r\n})(__rev({\"found\":{\"__fn\":\"(a, b, n) => 'Tik op elke veelvoud van ' + n + '. ' + a + ' van ' + b + ' gevind.'\"},\"all\":{\"__fn\":\"(n, b) => 'Jy het al ' + b + ' veelvoude van ' + n + ' tot 100 gevind! Sien jy die patroon?'\"},\"not\":{\"__fn\":\"(v, n, q, r) => v + ' is nie \\\\'n veelvoud van ' + n + ' nie: ' + n + ' × ' + q + ' = ' + (n * q) + ' met ' + r + ' oor.'\"}}), document.getElementById('s302')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>'n Getal kan 'n veelvoud van meer as een getal wees: 12 is 'n veelvoud van 2, 3, 4 en 6.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Watter is die veelvoude van 8 tussen 30 en 60?",
     "options": [
      "32; 40; 48; 56",
      "30; 40; 50; 60",
      "38; 46; 54",
      "33; 41; 49; 57"
     ],
     "answer": 0,
     "topic": "Veelvoude"
    },
    {
     "type": "input",
     "text": "Wat is die 5de veelvoud van 7?",
     "answer": "35",
     "topic": "Veelvoude"
    },
    {
     "type": "mc",
     "text": "Watter getal is 'n veelvoud van 6?",
     "options": [
      "26",
      "36",
      "44",
      "50"
     ],
     "answer": 1,
     "topic": "Veelvoude"
    },
    {
     "type": "input",
     "text": "Hoeveel veelvoude van 9 is daar van 1 tot 100?",
     "answer": "11",
     "topic": "Veelvoude"
    },
    {
     "type": "mc",
     "text": "45 is 'n veelvoud van…",
     "options": [
      "2",
      "4",
      "5",
      "7"
     ],
     "answer": 2,
     "topic": "Veelvoude"
    },
    {
     "type": "input",
     "text": "Wat is die kleinste getal wat 'n veelvoud van beide 4 en 6 is?",
     "answer": "12",
     "topic": "Veelvoude"
    },
    {
     "type": "mc",
     "text": "Veelvoude van 5 eindig altyd op…",
     "options": [
      "0 of 5",
      "net 5",
      "net 0",
      "2 of 5"
     ],
     "answer": 0,
     "topic": "Veelvoude"
    },
    {
     "type": "input",
     "text": "Wat is die volgende veelvoud van 3 na 99?",
     "answer": "102",
     "topic": "Veelvoude"
    }
   ]
  },
  {
   "id": 303,
   "chapter": 3,
   "name": "Verdubbel en ×10, ×100, ×1 000",
   "fullName": "Verdubbel, en vermenigvuldig met 10, 100 en 1 000",
   "lesson": {
    "heading": "Verdubbel, en vermenigvuldig met 10, 100 en 1 000",
    "sub": "Hoofstuk 3 · Onderwerp 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/scales.webp\" srcset=\"/assets/stickers/scales@2x.webp 2x\" alt=\"\"><p><strong>Verdubbel</strong> beteken vermenigvuldig met 2, of tel 'n getal by homself. As ons met <strong>10, 100</strong> of <strong>1&nbsp;000</strong> vermenigvuldig, word 'n getal 10, 100 of 1&nbsp;000 keer groter.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Verdubbel</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Dubbel 8 = 8 + 8 = <strong>16</strong></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Dubbel 16 = 16 + 16 = <strong>32</strong></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Dubbel 132 = 132 + 132 = <strong>264</strong></span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ × 10, × 100, × 1 000</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">73 × 10 = 730</span>: elke syfer skuif 1 plek na links.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">73 × 100 = 7 300</span>: elke syfer skuif 2 plekke na links.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">73 × 1 000 = 73 000</span>: elke syfer skuif 3 plekke na links.</span></div></div><div class=\"g4-sim\" id=\"s303\"><h4>🎮 Maalmasjien</h4><p class=\"how\">Tik 'n getal en verdubbel dit of vermenigvuldig dit met 10, 100 of 1 000. Kyk hoe die syfers in die plekwaardetabel skuif.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"n\" value=\"73\" inputmode=\"numeric\" aria-label=\"number\"><button class=\"g4-btn\" data-op=\"x2\">Verdubbel</button><button class=\"g4-btn\" data-op=\"10\">× 10</button><button class=\"g4-btn\" data-op=\"100\">× 100</button><button class=\"g4-btn\" data-op=\"1000\">× 1 000</button></div><table class=\"g4-chart\" data-k=\"chart\"></table><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, fmt, num } = window.G4;\r\n  const inp = q(root, 'n'), chart = q(root, 'chart'), out = q(root, 'out');\r\n  const COLS = L.cols; // TTh, Th, H, T, U ... up to hundred thousands\r\n  function show(v, prev, op) {\r\n    const s = String(v).padStart(COLS.length, ' ');\r\n    chart.innerHTML = '<tr>' + COLS.map(c => '<th>' + c + '</th>').join('') + '</tr><tr>' + [...s].map(d => '<td style=\"min-width:44px;font-size:28px;transition:all .4s\">' + (d === ' ' ? '' : d) + '</td>').join('') + '</tr>';\r\n    if (op == null) { out.innerHTML = L.start; return; }\r\n    if (op === 'x2') out.innerHTML = '<b>' + L.dbl(fmt(prev)) + ' = ' + fmt(prev) + ' + ' + fmt(prev) + ' = ' + fmt(v) + '</b>';\r\n    else out.innerHTML = '<b>' + fmt(prev) + ' × ' + fmt(op) + ' = ' + fmt(v) + '</b><br>' + L.moves(op === 10 ? 1 : op === 100 ? 2 : 3);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t || !t.dataset.op) return;\r\n    let v = num(inp.value); if (v == null || v < 0) v = 0; if (v > 999) v = 999;\r\n    const op = t.dataset.op === 'x2' ? 'x2' : +t.dataset.op, r = op === 'x2' ? v * 2 : v * op;\r\n    show(r, v, op);\r\n  });\r\n  inp.addEventListener('input', () => { const v = num(inp.value); show(v == null ? 0 : Math.min(999, v)); });\r\n  show(73);\r\n})(__rev({\"cols\":[\"HD\",\"TD\",\"D\",\"H\",\"T\",\"E\"],\"start\":\"Tik 'n getal tot 999 en druk dan 'n knoppie.\",\"dbl\":{\"__fn\":\"n => 'Dubbel ' + n\"},\"moves\":{\"__fn\":\"k => 'Elke syfer skuif <b>' + k + (k === 1 ? ' plek' : ' plekke') + '</b> na links, en \\\\'n 0 vul elke leë plek.'\"}}), document.getElementById('s303')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Ons \"sit nie net 'n nul by nie\". Die syfers <strong>skuif</strong> na groter plekke, en die 0 hou die leë plek oop.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Dubbel 16 = ?",
     "answer": "32",
     "topic": "Verdubbel en ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "Dubbel 132 = ?",
     "answer": "264",
     "topic": "Verdubbel en ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "73 × 10 = ?",
     "answer": "730",
     "topic": "Verdubbel en ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "73 × 100 = ?",
     "answer": "7300",
     "topic": "Verdubbel en ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "73 × 1 000 = ?",
     "answer": "73000",
     "topic": "Verdubbel en ×10, ×100, ×1 000"
    },
    {
     "type": "mc",
     "text": "As jy met 10 vermenigvuldig, skuif elke syfer…",
     "options": [
      "een plek na links",
      "een plek na regs",
      "twee plekke na links",
      "nêrens nie"
     ],
     "answer": 0,
     "topic": "Verdubbel en ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "Dubbel 48 = ?",
     "answer": "96",
     "topic": "Verdubbel en ×10, ×100, ×1 000"
    },
    {
     "type": "input",
     "text": "25 × 100 = ?",
     "answer": "2500",
     "topic": "Verdubbel en ×10, ×100, ×1 000"
    }
   ]
  },
  {
   "id": 304,
   "chapter": 3,
   "name": "Faktore en opbreek",
   "fullName": "Faktore en die distributiewe eienskap",
   "lesson": {
    "heading": "Faktore en die distributiewe eienskap",
    "sub": "Hoofstuk 3 · Onderwerp 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/kraal.webp\" srcset=\"/assets/stickers/kraal@2x.webp 2x\" alt=\"\"><p>'n <strong>Faktor</strong> deel presies in 'n getal in, met niks oor nie. Faktore kom in pare wat vermenigvuldig om die getal te maak.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Faktore van 6 en 18</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">6 = 1 × 6 = 2 × 3</span>, so die faktore van 6 is <strong>1, 2, 3, 6</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">18 = 1 × 18 = 2 × 9 = 3 × 6</span>, so die faktore van 18 is <strong>1, 2, 3, 6, 9, 18</strong>.</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Breek op om te vermenigvuldig</div><p>Ons kan 'n getal in dele opbreek en elke deel vermenigvuldig: <span class=\"math\">5 × 7 = 5 × (4 + 3) = (5 × 4) + (5 × 3) = 20 + 15 = 35</span>. Dit is die <strong>distributiewe eienskap</strong>.</p></div><div class=\"g4-sim\" id=\"s304\"><h4>🎮 Faktorreghoeke</h4><p class=\"how\">In Faktore, verander die getal om elke reghoek te sien wat dit maak. In Breek op, breek 'n vermenigvuldiging in twee makliker dele.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-m=\"f\">Faktore</button><button class=\"g4-btn ghost\" data-m=\"s\">Breek op</button><button class=\"g4-btn ghost\" data-k=\"newsplit\">Nuwe som</button></div><div class=\"g4-row\" data-k=\"ctl\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 220\" data-k=\"svg\" role=\"img\" aria-label=\"factors\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), ctl = q(root, 'ctl');\r\n  let mode = 'f', n = 18, a = 5, b = 7, cut = 4;\r\n  function factors(k) { const f = []; for (let i = 1; i <= k; i++) if (k % i === 0) f.push(i); return f; }\r\n  function draw() {\r\n    root.querySelectorAll('[data-m]').forEach(x => x.setAttribute('aria-pressed', x.dataset.m === mode));\r\n    let h = '';\r\n    if (mode === 'f') {\r\n      ctl.innerHTML = '<button class=\"g4-btn ghost\" data-d=\"-1\">−</button><span class=\"g4-big\" style=\"min-width:60px;text-align:center\">' + n + '</span><button class=\"g4-btn ghost\" data-d=\"1\">+</button>';\r\n      const f = factors(n), pairs = f.filter(x => x <= n / x).map(x => [x, n / x]);\r\n      const sumC = pairs.reduce((t, p) => t + p[1], 0), maxR = Math.max(...pairs.map(p => p[0])), s = Math.max(6, Math.min(30, (620 - 26 * pairs.length) / sumC, 170 / maxR)); let x = 10; svg.setAttribute('viewBox', '0 0 640 ' + Math.round(50 + maxR * s));\r\n      pairs.forEach(([r, c], i) => { const col = ['#60a5fa', '#f472b6', '#facc15', '#4ade80', '#a78bfa', '#fb923c'][i % 6]; if (x + c * s > 630) return; for (let i2 = 0; i2 < r; i2++) for (let j = 0; j < c; j++) h += '<rect x=\"' + (x + j * s) + '\" y=\"' + (30 + i2 * s) + '\" width=\"' + (s - 2) + '\" height=\"' + (s - 2) + '\" rx=\"2\" fill=\"' + col + '\"/>'; h += '<text x=\"' + (x + c * s / 2) + '\" y=\"20\" text-anchor=\"middle\" fill=\"' + col + '\" font-size=\"15\" font-weight=\"800\">' + r + ' × ' + c + '</text>'; x += c * s + 26; });\r\n      svg.innerHTML = h;\r\n      out.innerHTML = L.facts(n, f.join(', '), f.length) + (f.length === 2 ? '<br>' + L.prime(n) : '');\r\n    } else {\r\n      svg.setAttribute('viewBox', '0 0 640 ' + (60 + a * 30));\r\n      ctl.innerHTML = L.split + ' <input type=\"range\" min=\"1\" max=\"' + (b - 1) + '\" value=\"' + cut + '\" data-k=\"cut\" style=\"accent-color:#9ed43c;width:200px\" aria-label=\"split\">';\r\n      const s = 30;\r\n      for (let r = 0; r < a; r++) for (let c = 0; c < b; c++) h += '<rect x=\"' + (40 + c * s + (c >= cut ? 14 : 0)) + '\" y=\"' + (20 + r * s) + '\" width=\"' + (s - 4) + '\" height=\"' + (s - 4) + '\" rx=\"4\" fill=\"' + (c < cut ? '#60a5fa' : '#f472b6') + '\"/>';\r\n      h += '<text x=\"' + (40 + cut * s / 2) + '\" y=\"' + (40 + a * s) + '\" text-anchor=\"middle\" fill=\"#93c5fd\" font-size=\"16\" font-weight=\"800\">' + a + ' × ' + cut + ' = ' + (a * cut) + '</text><text x=\"' + (54 + cut * s + (b - cut) * s / 2) + '\" y=\"' + (40 + a * s) + '\" text-anchor=\"middle\" fill=\"#f9a8d4\" font-size=\"16\" font-weight=\"800\">' + a + ' × ' + (b - cut) + ' = ' + (a * (b - cut)) + '</text>';\r\n      svg.innerHTML = h;\r\n      out.innerHTML = '<b>' + a + ' × ' + b + ' = ' + a + ' × (' + cut + ' + ' + (b - cut) + ') = (' + a + ' × ' + cut + ') + (' + a + ' × ' + (b - cut) + ') = ' + (a * cut) + ' + ' + (a * (b - cut)) + ' = ' + (a * b) + '</b><br>' + L.why;\r\n      q(root, 'cut').addEventListener('input', ev => { cut = +ev.target.value; draw(); });\r\n    }\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.m) { mode = t.dataset.m; draw(); }\r\n    else if (t.dataset.d) { n = Math.max(2, Math.min(48, n + +t.dataset.d)); draw(); }\r\n    else if (t.dataset.k === 'newsplit') { a = 3 + Math.floor(Math.random() * 6); b = 6 + Math.floor(Math.random() * 7); cut = Math.max(1, Math.min(b - 1, b > 10 ? 10 : Math.floor(b / 2))); mode = 's'; draw(); }\r\n  });\r\n  draw();\r\n})(__rev({\"facts\":{\"__fn\":\"(n, f, k) => 'Die faktore van ' + n + ' is <b>' + f + '</b>. Dit is ' + k + ' faktore. Elke reghoek is \\\\'n paar faktore.'\"},\"prime\":{\"__fn\":\"n => n + ' het net twee faktore: 1 en homself.'\"},\"split\":\"Breek die tweede getal op:\",\"why\":\"As ons 'n getal in makliker dele opbreek, is vermenigvuldiging makliker.\"}), document.getElementById('s304')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Breek op in tiene en ene: <span class=\"math\">6 × 13 = (6 × 10) + (6 × 3) = 60 + 18 = 78</span>.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Wat is die faktore van 6?",
     "options": [
      "1, 2, 3, 6",
      "1, 6",
      "2, 3",
      "6, 12, 18"
     ],
     "answer": 0,
     "topic": "Faktore en opbreek"
    },
    {
     "type": "input",
     "text": "Hoeveel faktore het 18?",
     "answer": "6",
     "topic": "Faktore en opbreek"
    },
    {
     "type": "mc",
     "text": "Watter getal is NIE 'n faktor van 24 nie?",
     "options": [
      "3",
      "4",
      "5",
      "6"
     ],
     "answer": 2,
     "topic": "Faktore en opbreek"
    },
    {
     "type": "input",
     "text": "5 × 7 = (5 × 4) + (5 × ___)",
     "answer": "3",
     "topic": "Faktore en opbreek"
    },
    {
     "type": "input",
     "text": "6 × 13 = (6 × 10) + (6 × 3) = ?",
     "answer": "78",
     "topic": "Faktore en opbreek"
    },
    {
     "type": "mc",
     "text": "Watter een is dieselfde as 8 × 9?",
     "options": [
      "8 × (5 + 4)",
      "8 + 5 + 4",
      "(8 × 5) + 4",
      "8 × 5 × 4"
     ],
     "answer": 0,
     "topic": "Faktore en opbreek"
    },
    {
     "type": "input",
     "text": "Wat is die grootste faktor van 36, behalwe 36 self?",
     "answer": "18",
     "topic": "Faktore en opbreek"
    },
    {
     "type": "input",
     "text": "Werk 7 × 12 uit deur 12 op te breek in 10 + 2.",
     "answer": "84",
     "topic": "Faktore en opbreek"
    }
   ]
  },
  {
   "id": 305,
   "chapter": 3,
   "name": "Vermenigvuldigingsprobleme",
   "fullName": "Vermenigvuldigingsprobleme oplos",
   "lesson": {
    "heading": "Vermenigvuldigingsprobleme oplos",
    "sub": "Hoofstuk 3 · Onderwerp 5",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/mealie.webp\" srcset=\"/assets/stickers/mealie@2x.webp 2x\" alt=\"\"><p>Vermenigvuldigingsprobleme het <strong>gelyke groepe</strong>. Sleutelwoorde: <strong>vermenigvuldig, produk, altesaam, totaal, elk</strong>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Probleem met twee stappe</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>30 banke in elk van 9 klaskamers en 25 banke in elk van 8 klaskamers. Hoeveel banke altesaam?</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">9 × 30 = 270</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">8 × 25 = 200</span></span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span><span class=\"math\">270 + 200 = 470</span> banke</span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Produk en verskil</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Watter getal is 38 minder as die produk van 17 en 4?</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Produk: <span class=\"math\">17 × 4 = 68</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>38 minder: <span class=\"math\">68 − 38 = 30</span></span></div></div><div class=\"g4-sim\" id=\"s305\"><h4>🎮 Gelyke Groepe</h4><p class=\"how\">Los elke probleem op. Toets dan jou antwoord om die stappe te sien.</p><div class=\"score-pill\" data-k=\"count\" style=\"display:inline-block;margin-bottom:8px\"></div><div class=\"g4-hero\" data-k=\"card\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"next\">Volgende</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, num, stk } = window.G4;\r\n  const out = q(root, 'out'), card = q(root, 'card');\r\n  let i = 0, score = 0, tries = 0;\r\n  function show() { const p = L.problems[i]; card.innerHTML = stk(p.s) + '<p>' + p.t + '</p>'; q(root, 'count').textContent = L.of(i + 1, L.problems.length); q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.hint; }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return; const p = L.problems[i];\r\n    if (t.dataset.k === 'check') { const v = num(String(q(root, 'ans').value).replace(/^r/i, '')), ok = v === p.a; tries++; if (ok) score++; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + '<br>' + p.w.join('<br>') + '<br>' + L.score(score, tries); }\r\n    else if (t.dataset.k === 'next') { i = (i + 1) % L.problems.length; show(); }\r\n  });\r\n  show();\r\n})(__rev({\"problems\":[{\"t\":\"'n Eierdoos hou 6 eiers. Hoeveel eiers is in 8 dose?\",\"a\":48,\"w\":[\"8 × 6 = 48 eiers\"],\"s\":\"chicken\"},{\"t\":\"'n Skool het 9 klaskamers met 30 banke in elkeen. Hoeveel banke is daar?\",\"a\":270,\"w\":[\"9 × 30 = 9 × 3 tiene = 27 tiene = 270 banke\"],\"s\":\"wooden-chair\"},{\"t\":\"'n Taxi dra 15 mense. Hoeveel mense dra 4 vol taxi's?\",\"a\":60,\"w\":[\"15 × 4 = (10 × 4) + (5 × 4) = 40 + 20 = 60 mense\"],\"s\":\"car\"},{\"t\":\"Fliekkaartjies kos R25 elk. Hoeveel kos 6 kaartjies? (Rand)\",\"a\":150,\"w\":[\"25 × 6 = (20 × 6) + (5 × 6) = 120 + 30 = R150\"],\"s\":\"child\"},{\"t\":\"'n Boer plant 8 rye mielies met 12 plante in elke ry. Hoeveel plante is dit?\",\"a\":96,\"w\":[\"8 × 12 = (8 × 10) + (8 × 2) = 80 + 16 = 96 plante\"],\"s\":\"mealie\"}],\"of\":{\"__fn\":\"(a, b) => 'Probleem ' + a + ' van ' + b\"},\"hint\":\"Soek gelyke groepe. Hoeveel groepe, en hoeveel in elkeen?\",\"yes\":\"Reg!\",\"no\":\"Nog nie. So werk dit:\",\"score\":{\"__fn\":\"(a, b) => 'Telling: ' + a + ' uit ' + b + '.'\"}}), document.getElementById('s305')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Teken vinnig 'n prentjie van die groepe as jy nie seker is wat om te doen nie.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Watter getal is 38 minder as die produk van 17 en 4?",
     "answer": "30",
     "topic": "Vermenigvuldigingsprobleme"
    },
    {
     "type": "input",
     "text": "'n Skool het 30 banke in elk van 9 klaskamers en 25 banke in elk van 8 klaskamers. Hoeveel banke is daar altesaam?",
     "answer": "470",
     "topic": "Vermenigvuldigingsprobleme"
    },
    {
     "type": "input",
     "text": "'n Eierdoos hou 6 eiers. Hoeveel eiers is in 8 dose?",
     "answer": "48",
     "topic": "Vermenigvuldigingsprobleme"
    },
    {
     "type": "input",
     "text": "Kaartjies kos R15 elk. Hoeveel kos 6 kaartjies? (Rand)",
     "answer": "90",
     "topic": "Vermenigvuldigingsprobleme"
    },
    {
     "type": "mc",
     "text": "Watter woord sê vir jou om te vermenigvuldig?",
     "options": [
      "verskil",
      "produk",
      "oor",
      "minder"
     ],
     "answer": 1,
     "topic": "Vermenigvuldigingsprobleme"
    },
    {
     "type": "input",
     "text": "'n Taxi dra 15 mense. Hoeveel mense dra 4 vol taxi's?",
     "answer": "60",
     "topic": "Vermenigvuldigingsprobleme"
    },
    {
     "type": "input",
     "text": "Daar is 7 dae in 'n week. Hoeveel dae is daar in 9 weke?",
     "answer": "63",
     "topic": "Vermenigvuldigingsprobleme"
    },
    {
     "type": "input",
     "text": "Potlode kos R4 elk. Thabo koop 12 potlode en betaal met R50. Hoeveel kleingeld kry hy? (Rand)",
     "answer": "2",
     "topic": "Vermenigvuldigingsprobleme"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 3,
  "chapterName": "Vermenigvuldiging, Veelvoude en Faktore",
  "topics": [
   {
    "name": "Vermenigvuldig",
    "questions": [
     {
      "num": "1",
      "text": "Skryf elkeen as 'n vermenigvuldiging en werk die antwoord uit:",
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
        "text": "6 rye van 9 banke",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Veelvoude",
    "questions": [
     {
      "num": "2",
      "text": "Skryf neer:",
      "parts": [
       {
        "label": "a)",
        "text": "die eerste 10 veelvoude van 6",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "die veelvoude van 7 tussen 40 en 70",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "twee getalle wat veelvoude van beide 3 en 5 is",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Verdubbel en ×10, ×100, ×1 000",
    "questions": [
     {
      "num": "3",
      "text": "Verdubbel elke getal:",
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
      "text": "Bereken:",
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
    "name": "Faktore en opbreek",
    "questions": [
     {
      "num": "5",
      "text": "Lys al die faktore van:",
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
      "text": "Gebruik die distributiewe eienskap om te bereken:",
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
    "name": "Vermenigvuldigingsprobleme",
    "questions": [
     {
      "num": "7",
      "text": "Los op. Wys jou bewerkings.",
      "parts": [
       {
        "label": "a)",
        "text": "Daar is 24 leerders in elk van 4 klasse. Hoeveel leerders is daar?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "'n Boks hou 9 appels. Hoeveel appels is in 7 bokse, en hoeveel meer is nodig om 70 te maak?",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "Watter getal is 25 meer as die produk van 8 en 6?",
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
  "chapterName": "Hoofstuk 3 — Vermenigvuldiging, Veelvoude en Faktore",
  "topics": [
   {
    "name": "Vermenigvuldig",
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
    "name": "Veelvoude",
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
      "note": "Veelvoude van 15"
     }
    ]
   },
   {
    "name": "Verdubbel en ×10, ×100, ×1 000",
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
    "name": "Faktore en opbreek",
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
    "name": "Vermenigvuldigingsprobleme",
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
