// Math Magician — Grade 4, Chapter 2 (2D-vorms en 3D-voorwerpe) — Afrikaans
// Generated from one bilingual source (scripts/math-gr4/gen_ch2.js); edit both languages there.
MathMagician.registerChapter(2, {
 "topics": [
  {
   "id": 201,
   "chapter": 2,
   "name": "2D-vorms",
   "fullName": "2D-vorms met reguit en geboë sye",
   "lesson": {
    "heading": "2D-vorms met reguit en geboë sye",
    "sub": "Hoofstuk 2 · Onderwerp 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/window.webp\" srcset=\"/assets/stickers/window@2x.webp 2x\" alt=\"\"><p>'n <strong>2D-vorm</strong> is plat, soos 'n tekening op papier. Party vorms het <strong>reguit sye</strong>, party het <strong>geboë sye</strong>, en party het albei.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Vorms rondom ons</div><p>'n Venster of 'n deur is 'n <strong>reghoek</strong>. 'n Muntstuk of 'n horlosie is 'n <strong>sirkel</strong>. 'n GEE PAD-padteken is 'n <strong>driehoek</strong>. 'n Halfsirkel het een reguit sy en een geboë sy.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Beskryf 'n vorm</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Hoeveel sye het dit?</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Is die sye reguit, geboë, of albei?</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Hoeveel hoeke het dit? 'n Sirkel het geen hoeke nie.</span></div></div><div class=\"g4-sim\" id=\"s201\"><h4>🎮 Vormsorteerder</h4><p class=\"how\">Kyk na elke vorm. Het dit net reguit sye, net geboë sye, of albei?</p><div class=\"g4-hero\" data-k=\"card\" style=\"justify-content:center;flex-direction:column\"></div><div class=\"g4-row\" data-k=\"bins\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"next\" style=\"display:none\">Volgende</button><button class=\"g4-btn\" data-k=\"again\" style=\"display:none\">Speel weer</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, shuffle } = window.G4;\r\n  const SH = {\r\n    square: '<rect x=\"45\" y=\"25\" width=\"90\" height=\"90\" />',\r\n    rectangle: '<rect x=\"20\" y=\"40\" width=\"140\" height=\"70\" />',\r\n    triangle: '<path d=\"M90 20 L160 125 L20 125 Z\" />',\r\n    hexagon: '<path d=\"M60 25 L120 25 L150 75 L120 125 L60 125 L30 75 Z\" />',\r\n    circle: '<circle cx=\"90\" cy=\"75\" r=\"55\" />',\r\n    oval: '<ellipse cx=\"90\" cy=\"75\" rx=\"75\" ry=\"45\" />',\r\n    crescent: '<path d=\"M110 20 A58 58 0 1 0 110 130 A45 45 0 1 1 110 20 Z\" />',\r\n    semicircle: '<path d=\"M25 110 A65 65 0 0 1 155 110 Z\" />',\r\n    quarter: '<path d=\"M40 125 L40 25 A100 100 0 0 1 140 125 Z\" />',\r\n    arch: '<path d=\"M40 130 L40 70 A50 50 0 0 1 140 70 L140 130 Z\" />'\r\n  };\r\n  const KIND = { square: 0, rectangle: 0, triangle: 0, hexagon: 0, circle: 1, oval: 1, crescent: 1, semicircle: 2, quarter: 2, arch: 2 };\r\n  const COLS = ['#60a5fa', '#f472b6', '#facc15'];\r\n  const card = q(root, 'card'), out = q(root, 'out'), bins = q(root, 'bins');\r\n  let deck, pos, score;\r\n  bins.innerHTML = L.bins.map((b, i) => '<button class=\"g4-btn\" data-b=\"' + i + '\" style=\"flex:1;min-width:150px;border-color:' + COLS[i] + '\">' + b + '</button>').join('');\r\n  function start() { deck = shuffle(Object.keys(SH)); pos = 0; score = 0; draw(); }\r\n  function draw() {\r\n    bins.querySelectorAll('button').forEach(b => { b.disabled = false; b.style.outline = ''; });\r\n    q(root, 'next').style.display = 'none';\r\n    if (pos >= deck.length) { card.innerHTML = '<div class=\"g4-big\">⭐ ' + L.done(score, deck.length) + '</div>'; bins.style.display = 'none'; q(root, 'again').style.display = ''; out.className = 'g4-out good'; out.innerHTML = L.end; return; }\r\n    bins.style.display = ''; q(root, 'again').style.display = 'none';\r\n    const k = deck[pos];\r\n    card.innerHTML = '<svg viewBox=\"0 0 180 150\" style=\"width:180px;height:150px\"><g fill=\"rgba(158,212,60,.18)\" stroke=\"#c3e56f\" stroke-width=\"5\" stroke-linejoin=\"round\">' + SH[k] + '</g></svg><div class=\"g4-big\" style=\"font-size:24px\">' + L.names[k] + '</div>';\r\n    out.className = 'g4-out'; out.innerHTML = L.ask + ' ' + L.of(pos + 1, deck.length);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.b != null && !b.disabled) {\r\n      const k = deck[pos], ok = +b.dataset.b === KIND[k]; if (ok) score++;\r\n      bins.querySelectorAll('button').forEach(x => { x.disabled = true; if (+x.dataset.b === KIND[k]) x.style.outline = '3px solid #4ade80'; });\r\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.why(KIND[k], L.names[k]);\r\n      q(root, 'next').style.display = '';\r\n    } else if (b.dataset.k === 'next') { pos++; draw(); }\r\n    else if (b.dataset.k === 'again') start();\r\n  });\r\n  start();\r\n})(__rev({\"bins\":[\"Net reguit sye\",\"Net geboë sye\",\"Reguit en geboë\"],\"ask\":\"In watter groep hoort hierdie vorm?\",\"of\":{\"__fn\":\"(a, b) => '(' + a + ' van ' + b + ')'\"},\"yes\":\"Reg!\",\"no\":\"Nie heeltemal nie.\",\"why\":{\"__fn\":\"(k, n) => '\\\\'n ' + n + [' het net reguit sye.', ' het net geboë sye.', ' het reguit sye en geboë sye.'][k]\"},\"done\":{\"__fn\":\"(a, b) => a + ' uit ' + b\"},\"end\":\"Mooi so! Kyk nou in die klaskamer rond vir vorms met reguit en geboë sye.\",\"names\":{\"square\":\"vierkant\",\"rectangle\":\"reghoek\",\"triangle\":\"driehoek\",\"hexagon\":\"seshoek\",\"circle\":\"sirkel\",\"oval\":\"ovaal\",\"crescent\":\"sekel\",\"semicircle\":\"halfsirkel\",\"quarter\":\"kwartsirkel\",\"arch\":\"boog\"}}), document.getElementById('s201')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Gaan op 'n <strong>vormjag</strong>: vind 3 dinge met reguit sye en 3 dinge met geboë sye by die huis.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Watter vorm het net geboë sye?",
     "options": [
      "vierkant",
      "sirkel",
      "driehoek",
      "reghoek"
     ],
     "answer": 1,
     "topic": "2D-vorms"
    },
    {
     "type": "mc",
     "text": "'n Halfsirkel het…",
     "options": [
      "net reguit sye",
      "net geboë sye",
      "reguit en geboë sye"
     ],
     "answer": 2,
     "topic": "2D-vorms"
    },
    {
     "type": "mc",
     "text": "'n Deur het gewoonlik die vorm van 'n…",
     "options": [
      "sirkel",
      "reghoek",
      "driehoek",
      "seshoek"
     ],
     "answer": 1,
     "topic": "2D-vorms"
    },
    {
     "type": "input",
     "text": "Hoeveel reguit sye het 'n driehoek?",
     "answer": "3",
     "topic": "2D-vorms"
    },
    {
     "type": "mc",
     "text": "Watter voorwerp het die vorm van 'n sirkel?",
     "options": [
      "'n boek",
      "'n muntstuk",
      "'n deur",
      "'n liniaal"
     ],
     "answer": 1,
     "topic": "2D-vorms"
    },
    {
     "type": "mc",
     "text": "Watter vorm het net reguit sye?",
     "options": [
      "ovaal",
      "halfsirkel",
      "vierkant",
      "sirkel"
     ],
     "answer": 2,
     "topic": "2D-vorms"
    },
    {
     "type": "input",
     "text": "Hoeveel hoeke het 'n sirkel?",
     "answer": "0",
     "topic": "2D-vorms"
    },
    {
     "type": "mc",
     "text": "Thandi teken 'n vorm met 2 reguit sye en 1 geboë sy. In watter groep is dit?",
     "options": [
      "net reguit sye",
      "net geboë sye",
      "reguit en geboë sye"
     ],
     "answer": 2,
     "topic": "2D-vorms"
    }
   ]
  },
  {
   "id": 202,
   "chapter": 2,
   "name": "Veelhoeke",
   "fullName": "Veelhoeke benoem volgens hulle aantal sye",
   "lesson": {
    "heading": "Veelhoeke benoem volgens hulle aantal sye",
    "sub": "Hoofstuk 2 · Onderwerp 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/robot.webp\" srcset=\"/assets/stickers/robot@2x.webp 2x\" alt=\"\"><p>'n <strong>Veelhoek</strong> is 'n geslote 2D-vorm met net <strong>reguit sye</strong>. Ons benoem 'n veelhoek deur sy sye te tel. Die hoeke word <strong>hoekpunte</strong> genoem.</p></div><table class=\"g4-chart\"><tr><th>Naam</th><th>Sye</th><th>Hoekpunte</th></tr><tr><td style=\"font-size:20px;text-align:left\">Driehoek</td><td style=\"font-size:24px\">3</td><td style=\"font-size:24px\">3</td></tr><tr><td style=\"font-size:20px;text-align:left\">Vierhoek</td><td style=\"font-size:24px\">4</td><td style=\"font-size:24px\">4</td></tr><tr><td style=\"font-size:20px;text-align:left\">Vyfhoek</td><td style=\"font-size:24px\">5</td><td style=\"font-size:24px\">5</td></tr><tr><td style=\"font-size:20px;text-align:left\">Seshoek</td><td style=\"font-size:24px\">6</td><td style=\"font-size:24px\">6</td></tr></table><div class=\"def-box\"><div class=\"def-box-title\">📖 Vierhoeke</div><p>Enige veelhoek met 4 sye is 'n <strong>vierhoek</strong>. Vierkante en reghoeke is spesiale vierhoeke.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Benoem 'n veelhoek</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Sit jou potlood op een hoek.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Tel elke sy terwyl jy om gaan: 1, 2, 3 …</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Stop as jy terug is waar jy begin het. 5 sye? Dit is 'n <strong>vyfhoek</strong>.</span></div></div><div class=\"g4-sim\" id=\"s202\"><h4>🎮 Benoem die Veelhoek</h4><p class=\"how\">Tel die sye en kies dan die naam. Die sye word genommer sodat jy kan kyk.</p><div class=\"g4-stage\"><svg viewBox=\"0 0 320 220\" data-k=\"svg\" role=\"img\" aria-label=\"polygon\" style=\"max-width:360px\"></svg></div><div class=\"g4-row\" data-k=\"opts\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"new\">Nog een</button><button class=\"g4-btn ghost\" data-k=\"reg\" aria-pressed=\"false\">Reëlmatige vorms</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd, shuffle } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), opts = q(root, 'opts');\r\n  let n = 4, pts = [], answered = false, score = 0, tries = 0;\r\n  function make() {\r\n    n = rnd(3, 6);\r\n    const regular = q(root, 'reg').getAttribute('aria-pressed') === 'true';\r\n    const angs = regular ? Array.from({ length: n }, (_, i) => -Math.PI / 2 + i * 2 * Math.PI / n) : Array.from({ length: n }, (_, i) => -Math.PI / 2 + (i + 0.25 + Math.random() * 0.5) * 2 * Math.PI / n);\r\n    pts = angs.map(a => { const r = regular ? 85 : rnd(60, 95); return [160 + r * Math.cos(a), 110 + r * Math.sin(a)]; });\r\n    answered = false; draw(false);\r\n    const choices = shuffle([3, 4, 5, 6]);\r\n    opts.innerHTML = choices.map(c => '<button class=\"g4-btn ghost\" data-n=\"' + c + '\">' + L.names[c] + '</button>').join('');\r\n    out.className = 'g4-out'; out.innerHTML = L.ask;\r\n  }\r\n  function draw(reveal) {\r\n    let h = '<path d=\"M' + pts.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L') + ' Z\" fill=\"rgba(96,165,250,.18)\" stroke=\"#93c5fd\" stroke-width=\"4\" stroke-linejoin=\"round\"/>';\r\n    if (reveal) {\r\n      pts.forEach((p, i) => { const qq = pts[(i + 1) % n], mx = (p[0] + qq[0]) / 2, my = (p[1] + qq[1]) / 2, dx = mx - 160, dy = my - 110, d = Math.hypot(dx, dy) || 1; h += '<text x=\"' + (mx + dx / d * 18) + '\" y=\"' + (my + dy / d * 18 + 6) + '\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + (i + 1) + '</text>'; });\r\n      pts.forEach(p => { h += '<circle cx=\"' + p[0] + '\" cy=\"' + p[1] + '\" r=\"7\" fill=\"#f472b6\"/>'; });\r\n    }\r\n    svg.innerHTML = h;\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.n && !answered) {\r\n      answered = true; tries++; const ok = +b.dataset.n === n; if (ok) score++;\r\n      opts.querySelectorAll('button').forEach(x => { x.disabled = true; if (+x.dataset.n === n) x.setAttribute('aria-pressed', 'true'); });\r\n      draw(true);\r\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.count(L.names[n], n) + ' ' + L.score(score, tries);\r\n    } else if (b.dataset.k === 'new') make();\r\n    else if (b.dataset.k === 'reg') { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); make(); }\r\n  });\r\n  make();\r\n})(__rev({\"names\":{\"3\":\"Driehoek\",\"4\":\"Vierhoek\",\"5\":\"Vyfhoek\",\"6\":\"Seshoek\"},\"ask\":\"Wat word hierdie veelhoek genoem? Tel eers sy sye.\",\"yes\":\"Reg!\",\"no\":\"Nie heeltemal nie.\",\"count\":{\"__fn\":\"(n, k) => '\\\\'n ' + n.toLowerCase() + ' het ' + k + ' sye en ' + k + ' hoekpunte (hoeke).'\"},\"score\":{\"__fn\":\"(a, b) => 'Telling: ' + a + ' uit ' + b + '.'\"}}), document.getElementById('s202')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>'n Sirkel is <strong>nie</strong> 'n veelhoek nie, want sy sy is geboë.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "'n Veelhoek met 5 sye word 'n … genoem.",
     "options": [
      "vierhoek",
      "vyfhoek",
      "seshoek",
      "driehoek"
     ],
     "answer": 1,
     "topic": "Veelhoeke"
    },
    {
     "type": "input",
     "text": "Hoeveel sye het 'n seshoek?",
     "answer": "6",
     "topic": "Veelhoeke"
    },
    {
     "type": "mc",
     "text": "Watter vorm is NIE 'n veelhoek nie?",
     "options": [
      "driehoek",
      "sirkel",
      "vierkant",
      "vyfhoek"
     ],
     "answer": 1,
     "topic": "Veelhoeke"
    },
    {
     "type": "input",
     "text": "Hoeveel hoekpunte (hoeke) het 'n vierhoek?",
     "answer": "4",
     "topic": "Veelhoeke"
    },
    {
     "type": "mc",
     "text": "'n Reghoek is 'n…",
     "options": [
      "driehoek",
      "vierhoek",
      "vyfhoek",
      "seshoek"
     ],
     "answer": 1,
     "topic": "Veelhoeke"
    },
    {
     "type": "input",
     "text": "Wat is die totale aantal sye van 2 driehoeke en 1 seshoek?",
     "answer": "12",
     "topic": "Veelhoeke"
    },
    {
     "type": "mc",
     "text": "Watter veelhoek het 6 hoekpunte?",
     "options": [
      "vyfhoek",
      "seshoek",
      "vierhoek",
      "driehoek"
     ],
     "answer": 1,
     "topic": "Veelhoeke"
    },
    {
     "type": "mc",
     "text": "Watter sin is waar?",
     "options": [
      "Alle vierhoeke het 4 sye.",
      "Alle vierhoeke is vierkante.",
      "'n Driehoek het 4 hoekpunte.",
      "'n Vyfhoek het 6 sye."
     ],
     "answer": 0,
     "topic": "Veelhoeke"
    }
   ]
  },
  {
   "id": 203,
   "chapter": 2,
   "name": "Veelhoeke teken",
   "fullName": "Veelhoeke op ruitpapier teken",
   "lesson": {
    "heading": "Veelhoeke op ruitpapier teken",
    "sub": "Hoofstuk 2 · Onderwerp 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/paper.webp\" srcset=\"/assets/stickers/paper@2x.webp 2x\" alt=\"\"><p>Ons teken veelhoeke op <strong>ruitpapier</strong> of <strong>kolletjiespapier</strong> met 'n liniaal. Verbind die kolletjies met reguit lyne en eindig waar jy begin het.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Teken 'n reghoek 4 blokkies lank en 2 blokkies breed</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Merk 'n beginkolletjie.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Tel 4 blokkies oor en merk 'n kolletjie. Dan 2 blokkies af, 4 terug en 2 op.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Verbind die kolletjies met 'n liniaal. Jou reghoek bedek 4 × 2 = <strong>8</strong> klein blokkies.</span></div></div><div class=\"g4-sim\" id=\"s203\"><h4>🎮 Kolletjiespapier</h4><p class=\"how\">Tik op kolletjies om hoeke te maak. Tik weer op die eerste (geel) kolletjie om jou veelhoek toe te maak. Of tik op Uitdaging.</p><div class=\"g4-stage\"><svg viewBox=\"0 0 540 320\" data-k=\"svg\" role=\"img\" aria-label=\"kolletjiesrooster\" style=\"cursor:pointer;touch-action:manipulation\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"goal\">Uitdaging</button><button class=\"g4-btn ghost\" data-k=\"undo\">Ontdoen</button><button class=\"g4-btn ghost\" data-k=\"clear\">Maak skoon</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, pt, shuffle } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  const COLS = 12, ROWS = 8, G = 40, X0 = 60, Y0 = 20;\r\n  let pts = [], closed = false, target = null;\r\n  const name = n => L.names[n] || L.many(n);\r\n  function draw(hover) {\r\n    let h = '';\r\n    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) h += '<circle cx=\"' + (X0 + c * G) + '\" cy=\"' + (Y0 + r * G) + '\" r=\"3.5\" fill=\"rgba(226,232,240,.35)\"/>';\r\n    if (pts.length) {\r\n      const P = pts.map(([c, r]) => [X0 + c * G, Y0 + r * G]);\r\n      if (closed) h += '<path d=\"M' + P.map(p => p.join(' ')).join(' L') + ' Z\" fill=\"rgba(158,212,60,.18)\" stroke=\"#9ed43c\" stroke-width=\"4\" stroke-linejoin=\"round\"/>';\r\n      else h += '<path d=\"M' + P.map(p => p.join(' ')).join(' L') + '\" fill=\"none\" stroke=\"#9ed43c\" stroke-width=\"4\" stroke-linejoin=\"round\"/>';\r\n      P.forEach((p, i) => { h += '<circle cx=\"' + p[0] + '\" cy=\"' + p[1] + '\" r=\"' + (i === 0 && !closed ? 10 : 7) + '\" fill=\"' + (i === 0 ? '#fde047' : '#f472b6') + '\"/>'; });\r\n    }\r\n    svg.innerHTML = h;\r\n  }\r\n  function status() {\r\n    out.className = 'g4-out';\r\n    if (closed) {\r\n      const n = pts.length; let msg = L.made(name(n), n);\r\n      if (target) { const ok = n === target; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); msg = (ok ? L.yes : L.notTarget(name(target))) + ' ' + msg; }\r\n      out.innerHTML = msg;\r\n    } else out.innerHTML = (target ? L.goal(name(target)) + ' ' : '') + (pts.length ? L.keep(pts.length) : L.start);\r\n  }\r\n  svg.addEventListener('click', e => {\r\n    if (closed) return;\r\n    const p = pt(svg, e), c = Math.round((p.x - X0) / G), r = Math.round((p.y - Y0) / G);\r\n    if (c < 0 || r < 0 || c >= COLS || r >= ROWS) return;\r\n    if (pts.length >= 3 && c === pts[0][0] && r === pts[0][1]) closed = true;\r\n    else if (!pts.some(([a, b]) => a === c && b === r)) pts.push([c, r]);\r\n    draw(); status();\r\n  });\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.k === 'undo') { if (closed) closed = false; else pts.pop(); }\r\n    else if (b.dataset.k === 'clear') { pts = []; closed = false; }\r\n    else if (b.dataset.k === 'goal') { target = shuffle([3, 4, 5, 6])[0]; pts = []; closed = false; }\r\n    else return;\r\n    draw(); status();\r\n  });\r\n  draw(); status();\r\n})(__rev({\"names\":{\"3\":\"driehoek\",\"4\":\"vierhoek\",\"5\":\"vyfhoek\",\"6\":\"seshoek\"},\"many\":{\"__fn\":\"n => 'veelhoek met ' + n + ' sye'\"},\"start\":\"Tik op 'n kolletjie om te begin.\",\"keep\":{\"__fn\":\"n => n + (n === 1 ? ' hoek' : ' hoeke') + ' tot dusver. Tik op die geel kolletjie om die vorm toe te maak.'\"},\"made\":{\"__fn\":\"(nm, n) => 'Jy het \\\\'n <b>' + nm + '</b> geteken: ' + n + ' reguit sye en ' + n + ' hoekpunte.'\"},\"goal\":{\"__fn\":\"nm => 'Teken \\\\'n <b>' + nm + '</b>.'\"},\"yes\":\"Ja!\",\"notTarget\":{\"__fn\":\"nm => 'Dit is nie \\\\'n ' + nm + ' nie.'\"}}), document.getElementById('s203')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Op ruitpapier kan jy elke veelhoek teken, maar nie 'n perfekte sirkel nie: sirkels is geboë.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Jy teken 'n vierkant op ruitpapier met sye van 3 blokkies. Hoeveel klein blokkies is binne-in?",
     "answer": "9",
     "topic": "Veelhoeke teken"
    },
    {
     "type": "mc",
     "text": "Om 'n driehoek op kolletjiespapier te teken, verbind jy hoeveel kolletjies?",
     "options": [
      "2",
      "3",
      "4",
      "5"
     ],
     "answer": 1,
     "topic": "Veelhoeke teken"
    },
    {
     "type": "mc",
     "text": "Die sye van 'n veelhoek is altyd…",
     "options": [
      "geboë",
      "reguit",
      "geboë en reguit"
     ],
     "answer": 1,
     "topic": "Veelhoeke teken"
    },
    {
     "type": "input",
     "text": "'n Reghoek is 4 blokkies lank en 2 blokkies breed. Hoeveel klein blokkies bedek dit?",
     "answer": "8",
     "topic": "Veelhoeke teken"
    },
    {
     "type": "mc",
     "text": "Jy verbind 6 kolletjies om 'n geslote vorm te maak. Wat het jy geteken?",
     "options": [
      "vyfhoek",
      "seshoek",
      "driehoek",
      "vierhoek"
     ],
     "answer": 1,
     "topic": "Veelhoeke teken"
    },
    {
     "type": "input",
     "text": "'n Vorm op ruitpapier het sy hoeke op 4 kolletjies. Hoeveel sye het dit?",
     "answer": "4",
     "topic": "Veelhoeke teken"
    },
    {
     "type": "mc",
     "text": "Watter vorm kan jy NIE presies met reguit lyne op ruitpapier teken nie?",
     "options": [
      "vierkant",
      "sirkel",
      "driehoek",
      "reghoek"
     ],
     "answer": 1,
     "topic": "Veelhoeke teken"
    },
    {
     "type": "input",
     "text": "Twee vierkante, elk 2 by 2, word langs mekaar geteken om 'n reghoek te maak. Hoeveel klein blokkies bedek die reghoek?",
     "answer": "8",
     "topic": "Veelhoeke teken"
    }
   ]
  },
  {
   "id": 204,
   "chapter": 2,
   "name": "3D-voorwerpe",
   "fullName": "3D-voorwerpe: vlakke, hoekpunte en nette",
   "lesson": {
    "heading": "3D-voorwerpe: vlakke, hoekpunte en nette",
    "sub": "Hoofstuk 2 · Onderwerp 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/shaker.webp\" srcset=\"/assets/stickers/shaker@2x.webp 2x\" alt=\"\"><p>'n <strong>3D-voorwerp</strong> is soliede: dit het lengte, breedte en hoogte, en jy kan dit optel. Sy plat kante word <strong>vlakke</strong> genoem, en sy hoeke word <strong>hoekpunte</strong> genoem.</p></div><table class=\"g4-chart\"><tr><th>Voorwerp</th><th>Vlakke</th><th>Hoekpunte</th></tr><tr><td style=\"font-size:18px;text-align:left\">Kubus</td><td style=\"font-size:22px;text-align:center\">6</td><td style=\"font-size:22px;text-align:center\">8</td></tr><tr><td style=\"font-size:18px;text-align:left\">Reghoekige prisma</td><td style=\"font-size:22px;text-align:center\">6</td><td style=\"font-size:22px;text-align:center\">8</td></tr><tr><td style=\"font-size:18px;text-align:left\">Driehoekige prisma</td><td style=\"font-size:22px;text-align:center\">5</td><td style=\"font-size:22px;text-align:center\">6</td></tr><tr><td style=\"font-size:18px;text-align:left\">Vierkantige piramide</td><td style=\"font-size:22px;text-align:center\">5</td><td style=\"font-size:22px;text-align:center\">5</td></tr><tr><td style=\"font-size:18px;text-align:left\">Silinder</td><td style=\"font-size:22px;text-align:center\">2 plat + 1 geboë</td><td style=\"font-size:22px;text-align:center\">0</td></tr><tr><td style=\"font-size:18px;text-align:left\">Sfeer</td><td style=\"font-size:22px;text-align:center\">1 geboë</td><td style=\"font-size:22px;text-align:center\">0</td></tr></table><div class=\"def-box\"><div class=\"def-box-title\">📖 Nette</div><p>'n <strong>Net</strong> is 'n plat vorm van veelhoeke wat opvou tot 'n 3D-voorwerp. 'n Kubus se net is 6 vierkante wat aan mekaar vas is.</p></div><div class=\"g4-sim\" id=\"s204\"><h4>🎮 3D-voorwerpverkenner</h4><p class=\"how\">Kies 'n voorwerp. Sleep dit of gebruik die skuifbalk om dit te draai. Die geel kolletjies is hoekpunte. Tik op Wys net om die plat vorms te sien wat dit opvou.</p><div class=\"g4-row\" data-k=\"pick\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 300\" data-k=\"svg\" role=\"img\" aria-label=\"3-D\" style=\"touch-action:none;cursor:grab\"></svg></div><div class=\"g4-row\"><input type=\"range\" min=\"0\" max=\"360\" value=\"34\" data-k=\"turn\" style=\"flex:1;min-width:160px;accent-color:#9ed43c\" aria-label=\"Draai die voorwerp\"><button class=\"g4-btn ghost\" data-k=\"net\" aria-pressed=\"false\">Wys net</button></div><div class=\"g4-out\" data-k=\"info\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const svg = q(root, 'svg'), info = q(root, 'info'), turn = q(root, 'turn');\r\n  const box = (a, b, c) => ({ v: [[-a, -b, -c], [a, -b, -c], [a, b, -c], [-a, b, -c], [-a, -b, c], [a, -b, c], [a, b, c], [-a, b, c]], f: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]] });\r\n  const OBJ = {\r\n    cube: box(1, 1, 1), rprism: box(1.5, 0.8, 0.9),\r\n    tprism: { v: [[-1, -0.8, -1.3], [1, -0.8, -1.3], [0, 0.95, -1.3], [-1, -0.8, 1.3], [1, -0.8, 1.3], [0, 0.95, 1.3]], f: [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]] },\r\n    pyramid: { v: [[-1, -0.8, -1], [1, -0.8, -1], [1, -0.8, 1], [-1, -0.8, 1], [0, 1.15, 0]], f: [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]] },\r\n    cylinder: null, sphere: null\r\n  };\r\n  const KEYS = ['cube', 'rprism', 'tprism', 'pyramid', 'cylinder', 'sphere'];\r\n  let key = 'cube', ang = 0.6, net = false;\r\n  q(root, 'pick').innerHTML = KEYS.map(k => '<button class=\"g4-btn ghost\" data-o=\"' + k + '\">' + L.obj[k].n + '</button>').join('');\r\n  const COL = { 4: [96, 165, 250], 3: [244, 114, 182] };\r\n  function solid() {\r\n    const o = OBJ[key], tilt = 0.45, ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt), st = Math.sin(tilt);\r\n    const P = o.v.map(([x, y, z]) => { const x1 = x * ca + z * sa, z1 = -x * sa + z * ca; const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct; return [x1, y2, z2]; });\r\n    const faces = o.f.map(f => {\r\n      const pts = f.map(i => P[i]), c = pts.reduce((a, p) => [a[0] + p[0] / pts.length, a[1] + p[1] / pts.length, a[2] + p[2] / pts.length], [0, 0, 0]);\r\n      const u = pts[1].map((v, i) => v - pts[0][i]), w = pts[2].map((v, i) => v - pts[0][i]);\r\n      let nrm = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];\r\n      if (nrm[0] * c[0] + nrm[1] * c[1] + nrm[2] * c[2] < 0) nrm = nrm.map(v => -v);\r\n      const len = Math.hypot(...nrm) || 1; return { pts, z: c[2], vis: nrm[2] / len, f };\r\n    }).sort((a, b) => a.z - b.z);\r\n    let h = '';\r\n    faces.forEach(F => {\r\n      const base = COL[F.f.length] || COL[4], light = 0.45 + 0.55 * Math.max(0, F.vis), alpha = F.vis > 0 ? 0.92 : 0.12;\r\n      const d = 'M' + F.pts.map(p => (320 + p[0] * 70).toFixed(1) + ' ' + (150 - p[1] * 70).toFixed(1)).join(' L') + ' Z';\r\n      h += '<path d=\"' + d + '\" fill=\"rgba(' + base.map(c => Math.round(c * light)).join(',') + ',' + alpha + ')\" stroke=\"#e2e8f0\" stroke-width=\"' + (F.vis > 0 ? 2 : 1) + '\" stroke-dasharray=\"' + (F.vis > 0 ? '' : '4 4') + '\"/>';\r\n    });\r\n    P.forEach(p => { h += '<circle cx=\"' + (320 + p[0] * 70) + '\" cy=\"' + (150 - p[1] * 70) + '\" r=\"5\" fill=\"#fde047\" opacity=\"' + (p[2] > -0.2 ? 1 : 0.4) + '\"/>'; });\r\n    return h;\r\n  }\r\n  function round() {\r\n    if (key === 'cylinder') return '<defs><linearGradient id=\"g4cyl\" x1=\"0\" x2=\"1\"><stop offset=\"0\" stop-color=\"#1e3a8a\"/><stop offset=\".45\" stop-color=\"#60a5fa\"/><stop offset=\"1\" stop-color=\"#1e3a8a\"/></linearGradient></defs><rect x=\"250\" y=\"60\" width=\"140\" height=\"170\" fill=\"url(#g4cyl)\"/><ellipse cx=\"320\" cy=\"230\" rx=\"70\" ry=\"20\" fill=\"#1e3a8a\"/><ellipse cx=\"320\" cy=\"60\" rx=\"70\" ry=\"20\" fill=\"#93c5fd\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>';\r\n    return '<defs><radialGradient id=\"g4sph\" cx=\"35%\" cy=\"35%\"><stop offset=\"0\" stop-color=\"#fbcfe8\"/><stop offset=\".6\" stop-color=\"#f472b6\"/><stop offset=\"1\" stop-color=\"#831843\"/></radialGradient></defs><circle cx=\"320\" cy=\"150\" r=\"100\" fill=\"url(#g4sph)\"/>';\r\n  }\r\n  function netSVG() {\r\n    const s = 44, sq = (x, y, w, hh, c) => '<rect x=\"' + x + '\" y=\"' + y + '\" width=\"' + w + '\" height=\"' + hh + '\" fill=\"' + c + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>', tri = (p, c) => '<path d=\"M' + p.map(v => v.join(' ')).join(' L') + ' Z\" fill=\"' + c + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>';\r\n    const B = 'rgba(96,165,250,.55)', P = 'rgba(244,114,182,.55)';\r\n    if (key === 'cube') { const x = 230, y = 30; return sq(x + s, y, s, s, B) + sq(x, y + s, s, s, B) + sq(x + s, y + s, s, s, B) + sq(x + 2 * s, y + s, s, s, B) + sq(x + 3 * s, y + s, s, s, B) + sq(x + s, y + 2 * s, s, s, B); }\r\n    if (key === 'rprism') { const x = 180, y = 30, a = 90, b = 44, c = 50; return sq(x + c, y, a, c, B) + sq(x, y + c, c, b, B) + sq(x + c, y + c, a, b, B) + sq(x + c + a, y + c, c, b, B) + sq(x + 2 * c + a, y + c, a, b, B) + sq(x + c, y + c + b, a, c, B); }\r\n    if (key === 'tprism') { const x = 200, y = 90, w = 60, l = 100; return sq(x, y, w, l, B) + sq(x + w, y, w, l, B) + sq(x + 2 * w, y, w, l, B) + tri([[x + w, y], [x + 2 * w, y], [x + 1.5 * w, y - 52]], P) + tri([[x + w, y + l], [x + 2 * w, y + l], [x + 1.5 * w, y + l + 52]], P); }\r\n    if (key === 'pyramid') { const x = 270, y = 105, w = 90; return sq(x, y, w, w, B) + tri([[x, y], [x + w, y], [x + w / 2, y - 75]], P) + tri([[x, y + w], [x + w, y + w], [x + w / 2, y + w + 75]], P) + tri([[x, y], [x, y + w], [x - 75, y + w / 2]], P) + tri([[x + w, y], [x + w, y + w], [x + w + 75, y + w / 2]], P); }\r\n    if (key === 'cylinder') return sq(200, 100, 240, 100, B) + '<circle cx=\"320\" cy=\"58\" r=\"40\" fill=\"' + P + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/><circle cx=\"320\" cy=\"242\" r=\"40\" fill=\"' + P + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>';\r\n    return '<text x=\"320\" y=\"150\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-size=\"20\">' + L.noNet + '</text>';\r\n  }\r\n  function draw() {\r\n    root.querySelectorAll('[data-o]').forEach(b => b.setAttribute('aria-pressed', b.dataset.o === key));\r\n    q(root, 'net').setAttribute('aria-pressed', net);\r\n    turn.disabled = net || !OBJ[key];\r\n    svg.innerHTML = net ? netSVG() : (OBJ[key] ? solid() : round());\r\n    const o = L.obj[key];\r\n    info.innerHTML = '<b>' + o.n + '</b><br>' + L.faces + ': <b>' + o.f + '</b> (' + o.fs + ')<br>' + L.verts + ': <b>' + o.v + '</b><br>' + o.t;\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.o) { key = b.dataset.o; draw(); } else if (b.dataset.k === 'net') { net = !net; draw(); }\r\n  });\r\n  turn.addEventListener('input', () => { ang = turn.value / 180 * Math.PI; draw(); });\r\n  let drag = null;\r\n  svg.addEventListener('pointerdown', e => { if (!net && OBJ[key]) { drag = e.clientX; svg.setPointerCapture(e.pointerId); } });\r\n  svg.addEventListener('pointermove', e => { if (drag == null) return; ang += (e.clientX - drag) / 90; drag = e.clientX; turn.value = ((ang * 180 / Math.PI) % 360 + 360) % 360; draw(); });\r\n  svg.addEventListener('pointerup', () => { drag = null; });\r\n  draw();\r\n})(__rev({\"faces\":\"Vlakke\",\"verts\":\"Hoekpunte\",\"noNet\":\"'n Sfeer het geen plat net nie.\",\"obj\":{\"cube\":{\"n\":\"Kubus\",\"f\":6,\"fs\":\"6 vierkante\",\"v\":8,\"t\":\"Soos 'n dobbelsteen. Al sy vlakke is ewe groot.\"},\"rprism\":{\"n\":\"Reghoekige prisma\",\"f\":6,\"fs\":\"reghoeke\",\"v\":8,\"t\":\"Soos 'n boks graankos of 'n baksteen.\"},\"tprism\":{\"n\":\"Driehoekige prisma\",\"f\":5,\"fs\":\"2 driehoeke en 3 reghoeke\",\"v\":6,\"t\":\"Soos 'n tent of 'n wig kaas.\"},\"pyramid\":{\"n\":\"Vierkantige piramide\",\"f\":5,\"fs\":\"1 vierkant en 4 driehoeke\",\"v\":5,\"t\":\"Soos die piramides in Egipte. Die driehoeke ontmoet bo.\"},\"cylinder\":{\"n\":\"Silinder\",\"f\":3,\"fs\":\"2 plat sirkels en 1 geboë oppervlak\",\"v\":0,\"t\":\"Soos 'n blikkie bone. Dit kan rol.\"},\"sphere\":{\"n\":\"Sfeer\",\"f\":1,\"fs\":\"1 geboë oppervlak\",\"v\":0,\"t\":\"Soos 'n bal. Dit rol in elke rigting.\"}}}), document.getElementById('s204')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Maak 'n model: trek 'n kubusnet oor op karton, voeg klein flappies vir gom by, sny dit uit en vou dit op.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Hoeveel vlakke het 'n kubus?",
     "answer": "6",
     "topic": "3D-voorwerpe"
    },
    {
     "type": "mc",
     "text": "Watter vorm het die vlakke van 'n kubus?",
     "options": [
      "driehoeke",
      "vierkante",
      "sirkels",
      "vyfhoeke"
     ],
     "answer": 1,
     "topic": "3D-voorwerpe"
    },
    {
     "type": "input",
     "text": "Hoeveel hoekpunte het 'n kubus?",
     "answer": "8",
     "topic": "3D-voorwerpe"
    },
    {
     "type": "mc",
     "text": "Watter voorwerp kan rol?",
     "options": [
      "kubus",
      "sfeer",
      "vierkantige piramide",
      "reghoekige prisma"
     ],
     "answer": 1,
     "topic": "3D-voorwerpe"
    },
    {
     "type": "input",
     "text": "Hoeveel vlakke het 'n driehoekige prisma?",
     "answer": "5",
     "topic": "3D-voorwerpe"
    },
    {
     "type": "mc",
     "text": "'n Blikkie bone het die vorm van 'n…",
     "options": [
      "silinder",
      "sfeer",
      "kubus",
      "piramide"
     ],
     "answer": 0,
     "topic": "3D-voorwerpe"
    },
    {
     "type": "input",
     "text": "Hoeveel hoekpunte het 'n vierkantige piramide?",
     "answer": "5",
     "topic": "3D-voorwerpe"
    },
    {
     "type": "mc",
     "text": "'n Boks graankos het die vorm van 'n…",
     "options": [
      "reghoekige prisma",
      "driehoekige prisma",
      "silinder",
      "sfeer"
     ],
     "answer": 0,
     "topic": "3D-voorwerpe"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 2,
  "chapterName": "2D-vorms en 3D-voorwerpe",
  "topics": [
   {
    "name": "2D-vorms",
    "questions": [
     {
      "num": "1",
      "text": "Teken en benoem:",
      "parts": [
       {
        "label": "a)",
        "text": "'n vorm met net reguit sye",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "'n vorm met net geboë sye",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "'n vorm met reguit en geboë sye",
        "marks": 2
       }
      ]
     },
     {
      "num": "2",
      "text": "Benoem die vorm van elke voorwerp: 'n horlosie, 'n deur, 'n GEE PAD-teken.",
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
    "name": "Veelhoeke",
    "questions": [
     {
      "num": "3",
      "text": "Skryf oor en voltooi die tabel: naam, aantal sye en aantal hoekpunte vir 'n driehoek, 'n vierhoek, 'n vyfhoek en 'n seshoek.",
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
      "text": "Is 'n sirkel 'n veelhoek? Verduidelik jou antwoord.",
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
    "name": "Veelhoeke teken",
    "questions": [
     {
      "num": "5",
      "text": "Gebruik 'n liniaal en teken op ruitpapier:",
      "parts": [
       {
        "label": "a)",
        "text": "'n reghoek 5 blokkies lank en 3 blokkies breed",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "'n driehoek",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "'n vyfhoek",
        "marks": 2
       },
       {
        "label": "d)",
        "text": "'n seshoek",
        "marks": 2
       }
      ]
     },
     {
      "num": "6",
      "text": "Hoeveel klein blokkies bedek jou reghoek in a)?",
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
    "name": "3D-voorwerpe",
    "questions": [
     {
      "num": "7",
      "text": "Skryf oor en voltooi die tabel: naam, aantal vlakke, vorm van die vlakke en aantal hoekpunte vir 'n kubus, 'n reghoekige prisma, 'n driehoekige prisma en 'n vierkantige piramide.",
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
      "text": "Teken 'n net van 'n kubus. Sny dit uit papier en vou dit op om te toets.",
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
  "chapterName": "Hoofstuk 2 — 2D-vorms en 3D-voorwerpe",
  "topics": [
   {
    "name": "2D-vorms",
    "answers": [
     {
      "num": "Q1a",
      "ans": "e.g. square, triangle, rectangle",
      "note": "Enige veelhoek"
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
    "name": "Veelhoeke",
    "answers": [
     {
      "num": "Q3",
      "ans": "3/3, 4/4, 5/5, 6/6",
      "note": "Sye = hoekpunte vir elke veelhoek"
     },
     {
      "num": "Q4",
      "ans": "No: a polygon has only straight sides, and a circle is curved.",
      "note": ""
     }
    ]
   },
   {
    "name": "Veelhoeke teken",
    "answers": [
     {
      "num": "Q5a",
      "ans": "5 × 3 rectangle",
      "note": "Kontroleer die lengtes"
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
      "note": "3 rye van 5"
     }
    ]
   },
   {
    "name": "3D-voorwerpe",
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
