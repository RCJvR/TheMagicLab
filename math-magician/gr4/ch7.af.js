// Math Magician — Grade 4, Chapter 7 (Omtrek, Oppervlakte, Inhoudsmaat en Volume) — Afrikaans
// Generated from one bilingual source (scripts/math-gr4/gen_ch7.js); edit both languages there.
MathMagician.registerChapter(7, {
 "topics": [
  {
   "id": 701,
   "chapter": 7,
   "name": "Omtrek",
   "fullName": "Omtrek van veelhoeke",
   "lesson": {
    "heading": "Omtrek van veelhoeke",
    "sub": "Hoofstuk 7 · Onderwerp 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/ant.webp\" srcset=\"/assets/stickers/ant@2x.webp 2x\" alt=\"\"><p>Die <strong>omtrek</strong> is die afstand heeltemal om die buitekant van 'n vorm. Stel jou voor 'n mier loop langs elke sy totdat hy terug is waar hy begin het.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Omtrek</div><p>Tel die lengtes van <strong>al</strong> die sye bymekaar. Omtrek is 'n lengte, so ons meet dit in mm, cm, m of km.</p></div><svg viewBox=\"0 0 372 260\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,210.0 66.0,210.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"315.0\" y=\"136.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">4 cm</text></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Uitgewerkte voorbeelde</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Die reghoek hierbo is 6 cm lank en 4 cm breed. Omtrek = 6 + 4 + 6 + 4 = <strong>20 cm</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>'n Driehoek het sye van 5 cm, 7 cm en 8 cm. Omtrek = 5 + 7 + 8 = <strong>20 cm</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>'n Vierkant het sye van 9 m. Omtrek = 9 + 9 + 9 + 9 = 4 × 9 = <strong>36 m</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s701\"><h4>🎮 Loop om die Heining</h4><p class=\"how\">Tik op elke sy van die vorm om daarlangs te loop. Dit word groen en word by jou som getel. Tik dan die omtrek in.</p><div class=\"g4-stage\"><svg viewBox=\"0 0 540 340\" data-k=\"svg\" role=\"img\" aria-label=\"vorm\"></svg></div><div class=\"g4-big\" data-k=\"run\" style=\"font-size:22px\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"omtrek\"><span style=\"font-size:20px\">cm</span><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd, num } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out'), run = q(root, 'run'), inp = q(root, 'ans');\n  const U = 50, M = 40, MX = 66;\n  let pts = [], lens = [], done = [];\n  function shape() {\n    if (rnd(0, 2) === 0) { const w = rnd(3, 9), h = rnd(2, 5); return [[0, 0], [w, 0], [w, h], [0, h]]; }\n    const W = rnd(5, 9), H = rnd(5, 7), a = rnd(2, W - 2), b = rnd(2, H - 2);\n    return rnd(0, 1) ? [[0, 0], [W, 0], [W, H - b], [W - a, H - b], [W - a, H], [0, H]] : [[0, 0], [W - a, 0], [W - a, b], [W, b], [W, H], [0, H]];\n  }\n  const total = () => lens.reduce((s, x) => s + x, 0);\n  function draw() {\n    const mx = Math.max(...pts.map(p => p[0])), my = Math.max(...pts.map(p => p[1]));\n    svg.setAttribute('viewBox', '0 0 ' + (mx * U + 2 * MX) + ' ' + (my * U + 2 * M));\n    let h = '';\n    for (let x = 0; x <= mx; x++) h += '<line x1=\"' + (MX + x * U) + '\" y1=\"' + M + '\" x2=\"' + (MX + x * U) + '\" y2=\"' + (M + my * U) + '\" stroke=\"rgba(255,255,255,.07)\"/>';\n    for (let y = 0; y <= my; y++) h += '<line x1=\"' + MX + '\" y1=\"' + (M + y * U) + '\" x2=\"' + (MX + mx * U) + '\" y2=\"' + (M + y * U) + '\" stroke=\"rgba(255,255,255,.07)\"/>';\n    h += '<polygon points=\"' + pts.map(p => (MX + p[0] * U) + ',' + (M + p[1] * U)).join(' ') + '\" fill=\"rgba(96,165,250,.14)\"/>';\n    pts.forEach((p, i) => {\n      const r = pts[(i + 1) % pts.length], x1 = MX + p[0] * U, y1 = M + p[1] * U, x2 = MX + r[0] * U, y2 = M + r[1] * U;\n      const dx = r[0] - p[0], dy = r[1] - p[1], len = Math.abs(dx) + Math.abs(dy), nx = dy / len, ny = -dx / len;\n      const col = done[i] ? '#4ade80' : '#60a5fa';\n      h += '<g data-s=\"' + i + '\" style=\"cursor:pointer\"><line x1=\"' + x1 + '\" y1=\"' + y1 + '\" x2=\"' + x2 + '\" y2=\"' + y2 + '\" stroke=\"transparent\" stroke-width=\"34\"/>' +\n        '<line x1=\"' + x1 + '\" y1=\"' + y1 + '\" x2=\"' + x2 + '\" y2=\"' + y2 + '\" stroke=\"' + col + '\" stroke-width=\"' + (done[i] ? 9 : 6) + '\" stroke-linecap=\"round\"/>' +\n        '<text x=\"' + ((x1 + x2) / 2 + nx * 24) + '\" y=\"' + ((y1 + y2) / 2 + ny * 24 + 8) + '\" text-anchor=\"middle\" fill=\"' + (done[i] ? '#4ade80' : '#fff') + '\" font-size=\"22\" font-weight=\"900\">' + len + ' ' + L.unit + '</text></g>';\n    });\n    svg.innerHTML = h;\n    const walked = lens.filter((_, i) => done[i]);\n    run.textContent = walked.length ? walked.join(' + ') + ' = ' + walked.reduce((s, x) => s + x, 0) + ' ' + L.unit : L.tapSides;\n  }\n  function fresh() {\n    pts = shape(); lens = pts.map((p, i) => { const r = pts[(i + 1) % pts.length]; return Math.abs(r[0] - p[0]) + Math.abs(r[1] - p[1]); });\n    done = pts.map(() => false); inp.value = ''; out.className = 'g4-out'; out.innerHTML = L.ask(pts.length); draw();\n  }\n  function check() {\n    const v = num(inp.value); if (v == null) return;\n    const left = done.filter(d => !d).length, P = total();\n    if (v === P) { out.className = 'g4-out good'; out.innerHTML = L.yes(lens.join(' + '), P); done = done.map(() => true); draw(); return; }\n    out.className = 'g4-out bad';\n    out.innerHTML = left ? L.missed(left) : L.sum(v, P > v);\n  }\n  root.addEventListener('click', e => {\n    const s = e.target.closest('[data-s]');\n    if (s) { const i = +s.dataset.s; done[i] = !done[i]; draw(); return; }\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.k === 'check') check(); else if (t.dataset.k === 'new') fresh();\n  });\n  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });\n  fresh();\n})(__rev({\"unit\":\"cm\",\"tapSides\":\"Tik op elke sy terwyl jy om die vorm loop.\",\"ask\":{\"__fn\":\"n => 'Hierdie vorm het ' + n + ' sye. Tik op elke sy om om die vorm te loop en tik dan die omtrek in.'\"},\"yes\":{\"__fn\":\"(s, P) => 'Reg! ' + s + ' = <b>' + P + ' cm</b>. Jy het heeltemal om die vorm geloop.'\"},\"missed\":{\"__fn\":\"n => 'Nog nie. Jy het nog nie langs ' + (n === 1 ? '1 sy' : n + ' sye') + ' geloop nie. Die omtrek gaan heeltemal om, so tik op elke sy.'\"},\"sum\":{\"__fn\":\"(v, more) => 'Al die sye is getel, maar ' + v + ' cm is nie die totaal nie. Tel die groen getalle weer bymekaar: jou antwoord is te ' + (more ? 'klein' : 'groot') + '.'\"}}), document.getElementById('g4-s701')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>As jy met 'n liniaal of 'n maatband meet, skryf elke sy neer en merk dit af. Dan tel jy nie 'n sy twee keer nie en vergeet jy nie een nie.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Wat is die omtrek van hierdie reghoek (in cm)?<svg viewBox=\"0 0 372 203\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,152.9 66.0,152.9\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">7 cm</text><text x=\"315.0\" y=\"107.4\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text></svg>",
     "answer": "20",
     "topic": "Omtrek"
    },
    {
     "type": "input",
     "text": "Wat is die omtrek van hierdie driehoek (in cm)?<svg viewBox=\"0 0 372 212\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"206.6,50.0 306.0,162.4 66.0,162.4\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"263.1\" y=\"106.2\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">5 cm</text><text x=\"186.0\" y=\"190.4\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">8 cm</text><text x=\"122.6\" y=\"95.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text></svg>",
     "answer": "19",
     "topic": "Omtrek"
    },
    {
     "type": "input",
     "text": "'n Vierkant het sye van 9 cm. Wat is sy omtrek (in cm)?<svg viewBox=\"0 0 312 280\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 246.0,50.0 246.0,230.0 66.0,230.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"156.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">9 cm</text><text x=\"255.0\" y=\"146.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">9 cm</text></svg>",
     "answer": "36",
     "topic": "Omtrek"
    },
    {
     "type": "mc",
     "text": "Wat is die omtrek van 'n vorm?",
     "options": [
      "die afstand heeltemal om dit",
      "die ruimte binne-in dit",
      "die aantal hoeke wat dit het",
      "die lengte van een sy"
     ],
     "answer": 0,
     "topic": "Omtrek"
    },
    {
     "type": "input",
     "text": "Wat is die omtrek van hierdie vorm (in cm)?<svg viewBox=\"0 0 372 280\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,140.0 156.0,140.0 156.0,230.0 66.0,230.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">8 cm</text><text x=\"315.0\" y=\"101.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text><text x=\"231.0\" y=\"168.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">5 cm</text><text x=\"165.0\" y=\"191.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text><text x=\"111.0\" y=\"258.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text><text x=\"57.0\" y=\"146.0\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text></svg>",
     "answer": "28",
     "topic": "Omtrek"
    },
    {
     "type": "input",
     "text": "Elke sy van hierdie vyfhoek is 6 cm. Wat is sy omtrek (in cm)?<svg viewBox=\"0 0 321 280\" style=\"display:block;width:100%;max-width:230px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"160.6,50.0 255.3,118.8 219.1,230.0 102.1,230.0 66.0,118.8\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"220.9\" y=\"72.6\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"245.7\" y=\"183.2\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"160.6\" y=\"258.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"75.5\" y=\"183.2\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text><text x=\"100.4\" y=\"72.6\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">6 cm</text></svg>",
     "answer": "30",
     "topic": "Omtrek"
    },
    {
     "type": "input",
     "text": "'n Reghoekige tuin is 12 m lank en 8 m breed. Hoeveel meter heining gaan heeltemal om dit?<svg viewBox=\"0 0 372 260\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,210.0 66.0,210.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">12 m</text><text x=\"315.0\" y=\"136.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">8 m</text></svg>",
     "answer": "40",
     "topic": "Omtrek"
    },
    {
     "type": "input",
     "text": "Hierdie reghoek het 'n omtrek van 24 cm. Dit is 8 cm lank. Hoe breed is dit (in cm)?<svg viewBox=\"0 0 372 220\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,170.0 66.0,170.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">8 cm</text><text x=\"315.0\" y=\"116.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">?</text></svg>",
     "answer": "4",
     "topic": "Omtrek"
    }
   ]
  },
  {
   "id": 702,
   "chapter": 7,
   "name": "Oppervlakte",
   "fullName": "Oppervlakte: vierkantroosters en teëls",
   "lesson": {
    "heading": "Oppervlakte: vierkantroosters en teëls",
    "sub": "Hoofstuk 7 · Onderwerp 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/paper.webp\" srcset=\"/assets/stickers/paper@2x.webp 2x\" alt=\"\"><p>Die <strong>oppervlakte</strong> van 'n vorm is hoeveel plat ruimte dit bedek. Ons meet dit deur te tel hoeveel ewe groot vierkante daarin pas, sonder gapings en sonder oorvleueling.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Vierkante eenhede</div><p>Elke klein vierkantjie is <strong>1 vierkante eenheid</strong>. As elke vierkantjie 1 cm lank en 1 cm breed is, is dit <strong>1 vierkante sentimeter (1 cm²)</strong>.</p></div><svg viewBox=\"0 0 156 96\" style=\"display:block;width:100%;max-width:170px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Vind die oppervlakte</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Die reghoek hierbo word deur 3 rye van 5 vierkantjies bedek.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Tel in rye: 5 + 5 + 5 = 15, of 3 × 5 = 15.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Die oppervlakte is <strong>15 vierkante eenhede</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s702\"><h4>🎮 Vierkantrooster</h4><p class=\"how\">Tel: nommer die blokkies binne-in 'n vorm. Bou: kleur blokkies in om 'n vorm met die gegewe oppervlakte te maak.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-m=\"count\" aria-pressed=\"true\">Tel</button><button class=\"g4-btn ghost\" data-m=\"build\" aria-pressed=\"false\">Bou</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 492 300\" data-k=\"svg\" role=\"img\" aria-label=\"vierkantrooster\"></svg></div><div class=\"g4-big\" data-k=\"live\" style=\"font-size:20px\"></div><div class=\"g4-row\" data-k=\"countRow\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"oppervlakte\"><span style=\"font-size:18px\">vierkante eenhede</span></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd, num } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'ans'), row = q(root, 'countRow'), live = q(root, 'live');\n  const C = 10, R = 6, U = 48, M = 6;\n  let mode = 'count', shape = new Set(), marks = [], built = new Set(), target = 0;\n  const key = (x, y) => x + ',' + y;\n  function makeShape() {\n    const s = new Set(), w = rnd(2, 5), h = rnd(2, 4), x0 = rnd(0, 2), y0 = rnd(0, 1);\n    for (let x = x0; x < x0 + w; x++) for (let y = y0; y < y0 + h; y++) s.add(key(x, y));\n    const w2 = rnd(1, 3), h2 = rnd(1, 3), x1 = x0 + w, y1 = y0 + rnd(0, h - 1);\n    for (let x = x1; x < Math.min(C, x1 + w2); x++) for (let y = y1; y < Math.min(R, y1 + h2); y++) s.add(key(x, y));\n    return s;\n  }\n  function draw() {\n    svg.setAttribute('viewBox', '0 0 ' + (C * U + 2 * M) + ' ' + (R * U + 2 * M));\n    let h = '';\n    for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) {\n      const k = key(x, y), inS = mode === 'count' ? shape.has(k) : built.has(k), mi = marks.indexOf(k);\n      const fill = mode === 'count' ? (mi >= 0 ? 'rgba(74,222,128,.45)' : inS ? 'rgba(96,165,250,.38)' : 'transparent') : (inS ? 'rgba(74,222,128,.5)' : 'transparent');\n      h += '<rect data-c=\"' + k + '\" x=\"' + (M + x * U) + '\" y=\"' + (M + y * U) + '\" width=\"' + U + '\" height=\"' + U + '\" fill=\"' + fill + '\" stroke=\"rgba(255,255,255,.22)\" stroke-width=\"1.5\" style=\"cursor:pointer\"/>';\n      if (mi >= 0) h += '<text x=\"' + (M + x * U + U / 2) + '\" y=\"' + (M + y * U + U / 2 + 8) + '\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"22\" font-weight=\"900\" pointer-events=\"none\">' + (mi + 1) + '</text>';\n    }\n    svg.innerHTML = h;\n    live.textContent = mode === 'count' ? L.counted(marks.length) : L.have(built.size, target);\n  }\n  function fresh() {\n    out.className = 'g4-out'; inp.value = ''; marks = []; built = new Set();\n    if (mode === 'count') { shape = makeShape(); row.style.display = ''; out.innerHTML = L.askCount; }\n    else { target = rnd(6, 18); row.style.display = 'none'; out.innerHTML = L.askBuild(target); }\n    draw();\n  }\n  function check() {\n    if (mode === 'count') {\n      const v = num(inp.value); if (v == null) return; const n = shape.size;\n      out.className = 'g4-out ' + (v === n ? 'good' : 'bad');\n      out.innerHTML = v === n ? L.yesCount(n) : L.noCount(v, n > v);\n    } else {\n      const n = built.size, ok = n === target;\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad');\n      out.innerHTML = ok ? L.yesBuild(n) : L.noBuild(n, target);\n    }\n  }\n  root.addEventListener('click', e => {\n    const c = e.target.closest('[data-c]');\n    if (c) {\n      const k = c.dataset.c;\n      if (mode === 'count') { if (!shape.has(k)) return; const i = marks.indexOf(k); if (i >= 0) marks.splice(i, 1); else marks.push(k); }\n      else if (built.has(k)) built.delete(k); else built.add(k);\n      draw(); return;\n    }\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.m) { mode = t.dataset.m; root.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-pressed', String(b === t))); fresh(); }\n    else if (t.dataset.k === 'check') check();\n    else if (t.dataset.k === 'new') fresh();\n  });\n  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });\n  fresh();\n})(__rev({\"counted\":{\"__fn\":\"n => 'Blokkies getel: ' + n\"},\"have\":{\"__fn\":\"(n, t) => 'Blokkies ingekleur: ' + n + ' (teiken: ' + t + ')'\"},\"askCount\":\"Tel die blou blokkies. Tik op elkeen om dit te nommer en tik dan die oppervlakte in.\",\"askBuild\":{\"__fn\":\"t => 'Tik op blokkies om enige vorm met \\\\'n oppervlakte van <b>' + t + ' vierkante eenhede</b> te maak. Tik weer op \\\\'n blokkie om dit te verwyder.'\"},\"yesCount\":{\"__fn\":\"n => 'Reg! Die vorm bedek <b>' + n + ' blokkies</b>, so sy oppervlakte is ' + n + ' vierkante eenhede.'\"},\"noCount\":{\"__fn\":\"(v, more) => 'Nie heeltemal nie. ' + v + ' is te ' + (more ? 'min' : 'veel') + '. Tik op elke blou blokkie sodat jy elke blokkie een keer tel.'\"},\"yesBuild\":{\"__fn\":\"n => 'Mooi so! Jou vorm bedek ' + n + ' blokkies: \\\\'n oppervlakte van <b>' + n + ' vierkante eenhede</b>. Vorms kan verskillend lyk en steeds dieselfde oppervlakte hê.'\"},\"noBuild\":{\"__fn\":\"(n, t) => 'Jou vorm bedek ' + n + (n === 1 ? ' blokkie' : ' blokkies') + ', maar jy het ' + t + ' nodig. ' + (n < t ? 'Voeg nog ' + (t - n) + ' by.' : 'Haal ' + (n - t) + ' weg.')\"}}), document.getElementById('g4-s702')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Omtrek gaan <em>om</em> 'n vorm en is 'n lengte. Oppervlakte bedek die <em>binnekant</em> en is in vierkante eenhede. Twee vorms kan dieselfde oppervlakte maar verskillende omtrekke hê!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Wat is die oppervlakte van die ingekleurde vorm (in vierkante eenhede)?<svg viewBox=\"0 0 126 96\" style=\"display:block;width:100%;max-width:136px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "12",
     "topic": "Oppervlakte"
    },
    {
     "type": "input",
     "text": "Wat is die oppervlakte van die ingekleurde vorm (in vierkante eenhede)?<svg viewBox=\"0 0 186 126\" style=\"display:block;width:100%;max-width:204px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"33\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "20",
     "topic": "Oppervlakte"
    },
    {
     "type": "input",
     "text": "Wat is die oppervlakte van die ingekleurde vorm (in vierkante eenhede)?<svg viewBox=\"0 0 186 66\" style=\"display:block;width:100%;max-width:204px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "12",
     "topic": "Oppervlakte"
    },
    {
     "type": "mc",
     "text": "Watter eenheid gebruik ons vir die oppervlakte van 'n bladsy?",
     "options": [
      "cm²",
      "cm",
      "kg",
      "ml"
     ],
     "answer": 0,
     "topic": "Oppervlakte"
    },
    {
     "type": "mc",
     "text": "Watter vorm het die groter oppervlakte?<div style=\"display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:flex-end\"><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"0 0 126 96\" style=\"display:block;width:100%;max-width:130px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>A</div><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"0 0 156 66\" style=\"display:block;width:100%;max-width:160px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>B</div></div>",
     "options": [
      "A",
      "B",
      "Hulle is dieselfde"
     ],
     "answer": 0,
     "topic": "Oppervlakte"
    },
    {
     "type": "input",
     "text": "'n Vloer is met vierkantige teëls belê: 6 teëls langs een kant en 4 teëls langs die ander kant. Hoeveel teëls bedek die vloer?<svg viewBox=\"0 0 186 126\" style=\"display:block;width:100%;max-width:204px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "24",
     "topic": "Oppervlakte"
    },
    {
     "type": "input",
     "text": "Wat is die oppervlakte van hierdie trapvorm (in vierkante eenhede)?<svg viewBox=\"0 0 126 126\" style=\"display:block;width:100%;max-width:136px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"63\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"63\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"93\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>",
     "answer": "10",
     "topic": "Oppervlakte"
    },
    {
     "type": "mc",
     "text": "Vorm A is 'n reghoek 8 vierkantjies lank en 1 vierkantjie breed. Vorm B is 4 vierkantjies lank en 2 vierkantjies breed. Wat is waar?<div style=\"display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:flex-end\"><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"0 0 246 36\" style=\"display:block;width:100%;max-width:200px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"123\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"153\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"183\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"213\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>A</div><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"0 0 126 66\" style=\"display:block;width:100%;max-width:110px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"3\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"3\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"33\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"63\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/><rect x=\"93\" y=\"33\" width=\"30\" height=\"30\" fill=\"rgba(59,130,246,.45)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/></svg>B</div></div>",
     "options": [
      "Dieselfde oppervlakte, verskillende omtrekke",
      "Dieselfde omtrek, verskillende oppervlaktes",
      "Dieselfde oppervlakte en dieselfde omtrek",
      "Verskillende oppervlakte en verskillende omtrek"
     ],
     "answer": 0,
     "topic": "Oppervlakte"
    }
   ]
  },
  {
   "id": 703,
   "chapter": 7,
   "name": "Inhoudsmaat",
   "fullName": "Inhoudsmaat: 3D-voorwerpe vul",
   "lesson": {
    "heading": "Inhoudsmaat: 3D-voorwerpe vul",
    "sub": "Hoofstuk 7 · Onderwerp 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/kettle.webp\" srcset=\"/assets/stickers/kettle@2x.webp 2x\" alt=\"\"><p>Die <strong>inhoudsmaat</strong> van 'n houer is hoeveel dit kan hou as dit vol is. Ons vind dit deur die houer met water, sand of rys te vul en te meet hoeveel ingegaan het.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Eenhede van inhoudsmaat</div><p><strong>Milliliter (ml)</strong> vir klein hoeveelhede, soos 'n teelepel (5 ml) of 'n koppie (250 ml). <strong>Liter (l)</strong> vir groter hoeveelhede. <strong>1 l = 1 000 ml</strong>.</p></div><svg viewBox=\"0 0 258 96\" style=\"display:block;width:100%;max-width:200px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"6\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"68\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"130\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"192\" y=\"4\" width=\"62\" height=\"62\"/><text x=\"129.0\" y=\"90.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">4 × 250 ml = 1 000 ml</text></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Vul en meet</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>'n Beker word met koppies water gevul. Dit vat 4 koppies van 250 ml.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>250 + 250 + 250 + 250 = 1 000 ml, of 4 × 250 ml = 1 000 ml.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Die inhoudsmaat van die beker is <strong>1 000 ml = 1 l</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s703\"><h4>🎮 Maak Dit Vol</h4><p class=\"how\">Skat hoeveel koppies die houer vol maak. Gooi dan een koppie op 'n slag in en kyk hoe naby jy was.</p><div class=\"g4-big\" data-k=\"name\" style=\"font-size:22px\"></div><div class=\"g4-stage\"><svg viewBox=\"0 6 450 296\" data-k=\"svg\" role=\"img\" aria-label=\"houer\"></svg></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"guess\" inputmode=\"numeric\" aria-label=\"skatting\"><span style=\"font-size:18px\">koppies</span><button class=\"g4-btn\" data-k=\"pour\">Gooi in</button><button class=\"g4-btn ghost\" data-k=\"empty\">Maak leeg</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd, num, fmt } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'guess'), nameEl = q(root, 'name');\n  const CUP = 250;\n  let c = null, cups = 0, guess = null, last = -1;\n  function draw() {\n    const n = c.cap / CUP, top = 16, bot = 286, hgt = bot - top, x = 168, w = 150, lvl = Math.min(1, cups / n);\n    let h = '<image href=\"/assets/stickers/' + c.s + '.webp\" x=\"-6\" y=\"70\" width=\"176\" height=\"176\"/>';\n    h += '<image href=\"/assets/stickers/ceramic-mug.webp\" x=\"322\" y=\"150\" width=\"128\" height=\"128\"/><text x=\"386\" y=\"292\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-size=\"22\" font-weight=\"800\">250 ml</text>';\n    h += '<rect x=\"' + x + '\" y=\"' + (bot - hgt * lvl) + '\" width=\"' + w + '\" height=\"' + (hgt * lvl) + '\" fill=\"rgba(56,189,248,.55)\"/>';\n    for (let i = 1; i < n; i++) { const y = bot - hgt * i / n; h += '<line x1=\"' + x + '\" y1=\"' + y + '\" x2=\"' + (x + 18) + '\" y2=\"' + y + '\" stroke=\"rgba(255,255,255,.45)\" stroke-width=\"2\"/>'; }\n    h += '<path d=\"M' + x + ' ' + top + ' V' + bot + ' H' + (x + w) + ' V' + top + '\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"5\" stroke-linejoin=\"round\"/>';\n    h += '<text x=\"' + (x + w / 2) + '\" y=\"' + (bot - hgt * lvl / 2 + 10) + '\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"26\" font-weight=\"900\">' + (cups ? cups + ' × 250' : '') + '</text>';\n    svg.innerHTML = h;\n  }\n  function fresh() {\n    let i; do { i = rnd(0, L.cont.length - 1); } while (i === last); last = i;\n    c = L.cont[i]; cups = 0; guess = null; inp.value = ''; inp.disabled = false;\n    nameEl.textContent = L.title(c.n); out.className = 'g4-out'; out.innerHTML = L.ask(c.n); draw();\n  }\n  function pour() {\n    if (guess == null) { const g = num(inp.value); if (g == null || g < 1) { out.className = 'g4-out bad'; out.innerHTML = L.guessFirst; return; } guess = g; inp.disabled = true; }\n    const n = c.cap / CUP;\n    if (cups >= n) { out.className = 'g4-out bad'; out.innerHTML = L.over; return; }\n    cups++; draw();\n    if (cups < n) { out.className = 'g4-out'; out.innerHTML = L.poured(cups, fmt(cups * CUP)); return; }\n    out.className = 'g4-out good'; out.innerHTML = L.full(cups, fmt(c.cap), guess, c.cap >= 1000 && c.cap % 1000 === 0 ? c.cap / 1000 : 0);\n  }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.k === 'pour') pour();\n    else if (t.dataset.k === 'empty') { cups = 0; guess = null; inp.disabled = false; out.className = 'g4-out'; out.innerHTML = L.ask(c.n); draw(); }\n    else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"cont\":[{\"n\":\"ketel\",\"s\":\"kettle\",\"cap\":1500},{\"n\":\"fles\",\"s\":\"glass-jar\",\"cap\":750},{\"n\":\"bottel\",\"s\":\"plastic-bottle\",\"cap\":2000},{\"n\":\"sappakkie\",\"s\":\"juice-box\",\"cap\":500},{\"n\":\"melkkarton\",\"s\":\"milk\",\"cap\":1000}],\"title\":{\"__fn\":\"n => 'Vul die ' + n\"},\"ask\":{\"__fn\":\"n => 'Hoeveel koppies van 250 ml sal die ' + n + ' vol maak? Tik jou skatting en tik dan op Gooi in.'\"},\"guessFirst\":\"Tik eers jou skatting: hoeveel koppies?\",\"poured\":{\"__fn\":\"(k, ml) => k + (k === 1 ? ' koppie' : ' koppies') + ' ingegooi: tot dusver ' + ml + ' ml. Gooi verder!'\"},\"full\":{\"__fn\":\"(k, ml, g, l) => 'Vol! Dit het <b>' + k + ' koppies</b> gevat: ' + k + ' × 250 ml = <b>' + ml + ' ml</b>' + (l ? ' = ' + l + ' l' : '') + '. ' + (g === k ? 'Jou skatting was presies reg!' : 'Jy het ' + g + ' geskat, wat ' + Math.abs(g - k) + ' te ' + (g < k ? 'min' : 'veel') + ' is.')\"},\"over\":\"Dit is reeds vol! Nog water sal oorloop. Tik op Maak leeg of Nog een.\"}), document.getElementById('g4-s703')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Skat eers, vul dan en meet. Was jou skatting naby? 'n Hoë houer hou nie altyd meer as 'n kort, wye een nie!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "'n Bottel word met 6 koppies van 250 ml gevul. Wat is sy inhoudsmaat (in ml)?<svg viewBox=\"0 0 382 96\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"6\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"68\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"130\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"192\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"254\" y=\"4\" width=\"62\" height=\"62\"/><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"316\" y=\"4\" width=\"62\" height=\"62\"/><text x=\"191.0\" y=\"90.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">6 × 250 ml</text></svg>",
     "answer": "1 500",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "mc",
     "text": "Watter een hiervan hou omtrent 1 liter?",
     "options": [
      "'n karton melk",
      "'n teelepel",
      "'n bad",
      "'n eierkelkie"
     ],
     "answer": 0,
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "1 l = ? ml",
     "answer": "1 000",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "Hoeveel water is in hierdie maatbeker (in ml)?<svg viewBox=\"0 0 230 246\" style=\"display:block;width:100%;max-width:200px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"70\" y=\"94\" width=\"110\" height=\"120\" fill=\"rgba(56,189,248,.55)\"/><line x1=\"70\" y1=\"194\" x2=\"88\" y2=\"194\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"174\" x2=\"88\" y2=\"174\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"179\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">200</text><line x1=\"70\" y1=\"154\" x2=\"88\" y2=\"154\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"134\" x2=\"88\" y2=\"134\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"139\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">400</text><line x1=\"70\" y1=\"114\" x2=\"104\" y2=\"114\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"119\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">500</text><line x1=\"70\" y1=\"94\" x2=\"88\" y2=\"94\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"99\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">600</text><line x1=\"70\" y1=\"74\" x2=\"88\" y2=\"74\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"54\" x2=\"88\" y2=\"54\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"59\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">800</text><line x1=\"70\" y1=\"34\" x2=\"88\" y2=\"34\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"14\" x2=\"104\" y2=\"14\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"19\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1000</text><path d=\"M70 8 V214 H180 V8 M180 34 q34 10 0 70\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linejoin=\"round\"/><text x=\"125.0\" y=\"238.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"15\" font-weight=\"800\" font-family=\"sans-serif\">ml</text></svg>",
     "answer": "600",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "'n Emmer hou 5 l. Hoeveel milliliter is dit?",
     "answer": "5 000",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "'n Beker hou 250 ml. Hoeveel bekers water maak 'n 2 l-kan vol?<svg viewBox=\"0 0 72 96\" style=\"display:block;width:100%;max-width:50px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><image href=\"/assets/stickers/ceramic-mug.webp\" x=\"6\" y=\"4\" width=\"62\" height=\"62\"/><text x=\"36.0\" y=\"90.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">250 ml</text></svg>",
     "answer": "8",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "input",
     "text": "'n Ketel hou 1 500 ml. Dit het nou 900 ml water in. Hoeveel meer water maak dit vol (in ml)?<svg viewBox=\"0 0 230 246\" style=\"display:block;width:100%;max-width:200px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"70\" y=\"94\" width=\"110\" height=\"120\" fill=\"rgba(56,189,248,.55)\"/><line x1=\"70\" y1=\"200.66666666666666\" x2=\"88\" y2=\"200.66666666666666\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"187.33333333333334\" x2=\"88\" y2=\"187.33333333333334\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"192.33333333333334\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">200</text><line x1=\"70\" y1=\"174\" x2=\"88\" y2=\"174\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"160.66666666666666\" x2=\"88\" y2=\"160.66666666666666\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"165.66666666666666\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">400</text><line x1=\"70\" y1=\"147.33333333333331\" x2=\"104\" y2=\"147.33333333333331\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"152.33333333333331\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">500</text><line x1=\"70\" y1=\"134\" x2=\"88\" y2=\"134\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"139\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">600</text><line x1=\"70\" y1=\"120.66666666666667\" x2=\"88\" y2=\"120.66666666666667\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"107.33333333333333\" x2=\"88\" y2=\"107.33333333333333\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"112.33333333333333\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">800</text><line x1=\"70\" y1=\"94\" x2=\"88\" y2=\"94\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"80.66666666666666\" x2=\"104\" y2=\"80.66666666666666\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"85.66666666666666\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1000</text><line x1=\"70\" y1=\"67.33333333333334\" x2=\"88\" y2=\"67.33333333333334\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"54\" x2=\"88\" y2=\"54\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"59\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1200</text><line x1=\"70\" y1=\"40.66666666666666\" x2=\"88\" y2=\"40.66666666666666\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"70\" y1=\"27.333333333333343\" x2=\"88\" y2=\"27.333333333333343\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"32.33333333333334\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1400</text><line x1=\"70\" y1=\"14\" x2=\"104\" y2=\"14\" stroke=\"currentColor\" stroke-width=\"2\"/><text x=\"62\" y=\"19\" text-anchor=\"end\" fill=\"currentColor\" font-size=\"14\" font-weight=\"700\" font-family=\"sans-serif\">1500</text><path d=\"M70 8 V214 H180 V8 M180 34 q34 10 0 70\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linejoin=\"round\"/><text x=\"125.0\" y=\"238.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"15\" font-weight=\"800\" font-family=\"sans-serif\">ml</text></svg>",
     "answer": "600",
     "topic": "Inhoudsmaat"
    },
    {
     "type": "mc",
     "text": "'n Hoë, dun blompot word met 3 koppies water gevul. 'n Kort, wye bak word met 5 van dieselfde koppies gevul. Watter een hou meer?",
     "options": [
      "die bak",
      "die blompot",
      "hulle hou dieselfde"
     ],
     "answer": 0,
     "topic": "Inhoudsmaat"
    }
   ]
  },
  {
   "id": 704,
   "chapter": 7,
   "name": "Volume",
   "fullName": "Volume: 1 cm³-blokkies tel",
   "lesson": {
    "heading": "Volume: 1 cm³-blokkies tel",
    "sub": "Hoofstuk 7 · Onderwerp 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/ice-cubes.webp\" srcset=\"/assets/stickers/ice-cubes@2x.webp 2x\" alt=\"\"><p>Die <strong>volume</strong> van 'n voorwerp is hoeveel ruimte dit opneem. Ons kan 'n voorwerp uit klein blokkies bou en hulle tel.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Kubieke eenhede</div><p>'n Blokkie wat 1 cm lank, 1 cm breed en 1 cm hoog is, het 'n volume van <strong>1 kubieke sentimeter (1 cm³)</strong>. Tel die blokkies om die volume in cm³ te vind.</p></div><svg viewBox=\"-58 -66 141 146\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 24.2,70.0 24.2,14.0 72.7,-14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 24.2,70.0 24.2,14.0 -48.5,-28.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 72.7,-14.0 24.2,14.0 -48.5,-28.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"56.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"14.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Tel in lae</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Die boks hierbo is 3 blokkies lank en 2 blokkies breed, so een laag het 3 × 2 = 6 blokkies.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Dit is 2 lae hoog: 6 + 6 = 12 blokkies.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Die volume is <strong>12 cm³</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s704\"><h4>🎮 Boksbouer</h4><p class=\"how\">Elke blokkie is 1 cm³. Verander die grootte van die boks totdat dit die volume het wat jy nodig het. Tik op Lae om die boks uitmekaar te trek en te tel.</p><div class=\"g4-big\" data-k=\"goal\" style=\"font-size:22px\"></div><div class=\"g4-stage\"><svg data-k=\"svg\" role=\"img\" aria-label=\"boks blokkies\" style=\"max-height:300px\"></svg></div><div class=\"g4-big\" data-k=\"count\" style=\"font-size:20px\"></div><div class=\"g4-row\"><span class=\"g4-row\" style=\"margin:0;gap:6px\"><span style=\"min-width:72px\">Lengte</span><button class=\"g4-btn ghost\" data-d=\"-l\" aria-label=\"Lengte −\">−</button><b data-k=\"vl\" style=\"font-size:22px;min-width:22px;text-align:center\"></b><button class=\"g4-btn ghost\" data-d=\"+l\" aria-label=\"Lengte +\">+</button></span><span class=\"g4-row\" style=\"margin:0;gap:6px\"><span style=\"min-width:72px\">Breedte</span><button class=\"g4-btn ghost\" data-d=\"-w\" aria-label=\"Breedte −\">−</button><b data-k=\"vw\" style=\"font-size:22px;min-width:22px;text-align:center\"></b><button class=\"g4-btn ghost\" data-d=\"+w\" aria-label=\"Breedte +\">+</button></span><span class=\"g4-row\" style=\"margin:0;gap:6px\"><span style=\"min-width:72px\">Hoogte</span><button class=\"g4-btn ghost\" data-d=\"-h\" aria-label=\"Hoogte −\">−</button><b data-k=\"vh\" style=\"font-size:22px;min-width:22px;text-align:center\"></b><button class=\"g4-btn ghost\" data-d=\"+h\" aria-label=\"Hoogte +\">+</button></span></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"layers\" aria-pressed=\"false\">Lae</button><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd } = window.G4;\n  const svg = q(root, 'svg'), out = q(root, 'out');\n  let d = { l: 2, w: 2, h: 1 }, target = 0, layers = false;\n  function prism(l, w, h, layersOn) {\n    const s = 34, c = 0.866, gap = layersOn ? 0.7 : 0, P = (x, y, z) => [(x - y) * c * s, (x + y) * 0.5 * s - z * s];\n    const poly = (a, fill) => '<polygon points=\"' + a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ') + '\" fill=\"' + fill + '\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/>';\n    const ln = (a, b) => '<line x1=\"' + a[0].toFixed(1) + '\" y1=\"' + a[1].toFixed(1) + '\" x2=\"' + b[0].toFixed(1) + '\" y2=\"' + b[1].toFixed(1) + '\" stroke=\"#1e3a8a\" stroke-width=\"1.5\"/>';\n    let g = '';\n    for (let k = 0; k < h; k++) {\n      const z0 = k * (1 + gap), z1 = z0 + 1;\n      g += poly([P(l, 0, z0), P(l, w, z0), P(l, w, z1), P(l, 0, z1)], '#3b82f6');\n      for (let j = 1; j < w; j++) g += ln(P(l, j, z0), P(l, j, z1));\n      g += poly([P(0, w, z0), P(l, w, z0), P(l, w, z1), P(0, w, z1)], '#60a5fa');\n      for (let i = 1; i < l; i++) g += ln(P(i, w, z0), P(i, w, z1));\n      if (layersOn || k === h - 1) {\n        g += poly([P(0, 0, z1), P(l, 0, z1), P(l, w, z1), P(0, w, z1)], '#bfdbfe');\n        for (let i = 1; i < l; i++) g += ln(P(i, 0, z1), P(i, w, z1));\n        for (let j = 1; j < w; j++) g += ln(P(0, j, z1), P(l, j, z1));\n      }\n    }\n    const H = h * (1 + gap) - gap, x0 = -w * c * s - 8, x1 = l * c * s + 8, y0 = -H * s - 8, y1 = (l + w) * 0.5 * s + 8;\n    return { g, vb: x0.toFixed(1) + ' ' + y0.toFixed(1) + ' ' + (x1 - x0).toFixed(1) + ' ' + (y1 - y0).toFixed(1) };\n  }\n  function draw() {\n    const p = prism(d.l, d.w, d.h, layers);\n    svg.setAttribute('viewBox', p.vb); svg.innerHTML = p.g;\n    ['l', 'w', 'h'].forEach(k => { q(root, 'v' + k).textContent = d[k]; });\n    q(root, 'count').textContent = L.sizes(d.l, d.w, d.h);\n  }\n  function fresh() {\n    let a, b, c2; do { a = rnd(1, 5); b = rnd(1, 4); c2 = rnd(1, 4); } while (a * b * c2 < 6 || a * b * c2 > 40);\n    target = a * b * c2; d = { l: 1, w: 1, h: 1 }; layers = false; q(root, 'layers').setAttribute('aria-pressed', 'false');\n    q(root, 'goal').textContent = L.goal(target); out.className = 'g4-out'; out.innerHTML = L.ask; draw();\n  }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.d) { const k = t.dataset.d.slice(1), up = t.dataset.d[0] === '+'; d[k] = Math.max(1, Math.min(k === 'l' ? 6 : 5, d[k] + (up ? 1 : -1))); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n    else if (t.dataset.k === 'layers') { layers = !layers; t.setAttribute('aria-pressed', String(layers)); draw(); }\n    else if (t.dataset.k === 'check') {\n      const v = d.l * d.w * d.h, ok = v === target;\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad');\n      out.innerHTML = (ok ? L.yes : L.no)(d.l, d.w, d.h, v, target);\n    } else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"sizes\":{\"__fn\":\"(l, w, h) => l + ' × ' + w + ' × ' + h + ' = ' + (l * w * h) + ' blokkies'\"},\"goal\":{\"__fn\":\"t => 'Bou \\\\'n boks met \\\\'n volume van ' + t + ' cm³'\"},\"ask\":\"Gebruik − en + om die lengte, breedte en hoogte te verander. Tik dan op Toets.\",\"yes\":{\"__fn\":\"(l, w, h, v) => 'Ja! Een laag het ' + l + ' × ' + w + ' = ' + (l * w) + ' blokkies, en daar ' + (h === 1 ? 'is 1 laag' : 'is ' + h + ' lae') + ': ' + v + ' blokkies = <b>' + v + ' cm³</b>.'\"},\"no\":{\"__fn\":\"(l, w, h, v, t) => 'Jou boks het ' + (l * w) + (l * w === 1 ? ' blokkie' : ' blokkies') + ' in elke laag en ' + h + (h === 1 ? ' laag' : ' lae') + ': ' + v + ' cm³. Jy het ' + t + ' cm³ nodig, so maak dit ' + (v < t ? 'groter' : 'kleiner') + '.'\"}}), document.getElementById('g4-s704')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Tel in lae. Moenie die blokkies vergeet wat jy nie agter en onder kan sien nie!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Hierdie boks is van 1 cm³-blokkies gemaak. Wat is sy volume (in cm³)?<svg viewBox=\"-58 -66 117 132\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"48.5,28.0 0.0,56.0 0.0,0.0 48.5,-28.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 0.0,56.0 0.0,0.0 -48.5,-28.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 48.5,-28.0 0.0,0.0 -48.5,-28.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"24.2\" y1=\"42.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"0.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "8",
     "topic": "Volume"
    },
    {
     "type": "input",
     "text": "Hierdie boks is van 1 cm³-blokkies gemaak. Wat is sy volume (in cm³)?<svg viewBox=\"-58 -38 141 118\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 24.2,70.0 24.2,42.0 72.7,14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 24.2,70.0 24.2,42.0 -48.5,0.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-28.0 72.7,14.0 24.2,42.0 -48.5,0.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-14.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-14.0\" x2=\"-24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"56.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"0.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "6",
     "topic": "Volume"
    },
    {
     "type": "input",
     "text": "Hierdie boks is van 1 cm³-blokkies gemaak. Wat is sy volume (in cm³)?<svg viewBox=\"-58 -94 165 188\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"97.0,56.0 48.5,84.0 48.5,0.0 97.0,-28.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 48.5,84.0 48.5,0.0 -48.5,-56.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-84.0 97.0,-28.0 48.5,0.0 -48.5,-56.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"72.7\" y1=\"70.0\" x2=\"72.7\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-70.0\" x2=\"72.7\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-70.0\" x2=\"-24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"56.0\" x2=\"0.0\" y2=\"-28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-56.0\" x2=\"0.0\" y2=\"-28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"70.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-42.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"97.0\" y1=\"28.0\" x2=\"48.5\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"48.5\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"97.0\" y1=\"0.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"-28.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "24",
     "topic": "Volume"
    },
    {
     "type": "mc",
     "text": "Watter eenheid gebruik ons vir volume as ons 1 cm-blokkies tel?",
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
     "text": "Hierdie boks is van 1 cm³-blokkies gemaak. Wat is sy volume (in cm³)?<svg viewBox=\"-34 -66 165 160\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"121.2,70.0 97.0,84.0 97.0,28.0 121.2,14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-24.2,14.0 97.0,84.0 97.0,28.0 -24.2,-42.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 121.2,14.0 97.0,28.0 -24.2,-42.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"0.0\" y1=\"28.0\" x2=\"0.0\" y2=\"-28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"0.0\" y2=\"-28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"42.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-14.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"70.0\" x2=\"72.7\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"97.0\" y1=\"0.0\" x2=\"72.7\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"121.2\" y1=\"42.0\" x2=\"97.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-14.0\" x2=\"97.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "10",
     "topic": "Volume"
    },
    {
     "type": "input",
     "text": "Een laag van 'n boks het 3 rye van 3 blokkies. Die boks is 4 lae hoog. Wat is sy volume (in cm³)?<svg viewBox=\"-83 -122 165 216\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 0.0,84.0 0.0,-28.0 72.7,-70.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-72.7,42.0 0.0,84.0 0.0,-28.0 -72.7,-70.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-112.0 72.7,-70.0 0.0,-28.0 -72.7,-70.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-98.0\" x2=\"48.5\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"70.0\" x2=\"24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"-84.0\" x2=\"24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"56.0\" x2=\"-48.5\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-98.0\" x2=\"-48.5\" y2=\"-56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"70.0\" x2=\"-24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-84.0\" x2=\"-24.2\" y2=\"-42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"14.0\" x2=\"0.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-72.7\" y1=\"14.0\" x2=\"0.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-14.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-72.7\" y1=\"-14.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-42.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-72.7\" y1=\"-42.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>",
     "answer": "36",
     "topic": "Volume"
    },
    {
     "type": "mc",
     "text": "Watter boks het die groter volume?<div style=\"display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:flex-end\"><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"-58 -66 141 146\" style=\"display:block;width:100%;max-width:150px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"72.7,42.0 24.2,70.0 24.2,14.0 72.7,-14.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-48.5,28.0 24.2,70.0 24.2,14.0 -48.5,-28.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 72.7,-14.0 24.2,14.0 -48.5,-28.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"48.5\" y1=\"56.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"-24.2\" y2=\"-14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"56.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"0.0\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"14.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>A</div><div style=\"text-align:center;font-weight:900\"><svg viewBox=\"-83 -38 190 146\" style=\"display:block;width:100%;max-width:160px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"97.0,56.0 24.2,98.0 24.2,70.0 97.0,28.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-72.7,42.0 24.2,98.0 24.2,70.0 -72.7,14.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-28.0 97.0,28.0 24.2,70.0 -72.7,14.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"72.7\" y1=\"70.0\" x2=\"72.7\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-14.0\" x2=\"72.7\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"84.0\" x2=\"48.5\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"0.0\" x2=\"48.5\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"56.0\" x2=\"-48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-14.0\" x2=\"-48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"70.0\" x2=\"-24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"0.0\" x2=\"-24.2\" y2=\"42.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"84.0\" x2=\"0.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"14.0\" x2=\"0.0\" y2=\"56.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/></svg>B</div></div>",
     "options": [
      "Hulle is dieselfde",
      "A",
      "B"
     ],
     "answer": 0,
     "topic": "Volume"
    },
    {
     "type": "input",
     "text": "'n Boks is 4 cm lank, 3 cm breed en 2 cm hoog. Hoeveel 1 cm³-blokkies maak dit vol?<svg viewBox=\"-103 -66 256 200\" style=\"display:block;width:100%;max-width:220px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"97.0,56.0 24.2,98.0 24.2,42.0 97.0,0.0\" fill=\"#3b82f6\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"-72.7,42.0 24.2,98.0 24.2,42.0 -72.7,-14.0\" fill=\"#60a5fa\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"0.0,-56.0 97.0,0.0 24.2,42.0 -72.7,-14.0\" fill=\"#bfdbfe\" stroke=\"#1e3a8a\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"72.7\" y1=\"70.0\" x2=\"72.7\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"-42.0\" x2=\"72.7\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"84.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"-28.0\" x2=\"48.5\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-48.5\" y1=\"56.0\" x2=\"-48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"24.2\" y1=\"-42.0\" x2=\"-48.5\" y2=\"0.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-24.2\" y1=\"70.0\" x2=\"-24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"48.5\" y1=\"-28.0\" x2=\"-24.2\" y2=\"14.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"0.0\" y1=\"84.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"72.7\" y1=\"-14.0\" x2=\"0.0\" y2=\"28.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"97.0\" y1=\"28.0\" x2=\"24.2\" y2=\"70.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><line x1=\"-72.7\" y1=\"14.0\" x2=\"24.2\" y2=\"70.0\" stroke=\"#1e3a8a\" stroke-width=\"1.4\"/><text x=\"-38.2\" y=\"94.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">4 cm</text><text x=\"82.6\" y=\"99.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">3 cm</text><text x=\"127.0\" y=\"28.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"16\" font-weight=\"800\" font-family=\"sans-serif\">2 cm</text></svg>",
     "answer": "24",
     "topic": "Volume"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 7,
  "chapterName": "Omtrek, Oppervlakte, Inhoudsmaat en Volume",
  "topics": [
   {
    "name": "Omtrek",
    "questions": [
     {
      "num": "1",
      "text": "Vind die omtrek van elke vorm.",
      "parts": [
       {
        "label": "a)",
        "text": "'n Reghoek 10 cm lank en 5 cm breed.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "'n Vierkant met sye van 7 cm.",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "'n Driehoek met sye van 4 cm, 6 cm en 9 cm.",
        "marks": 2
       }
      ]
     },
     {
      "num": "2",
      "text": "Gebruik 'n liniaal en meet elke sy van jou wiskundeboek in cm.",
      "parts": [
       {
        "label": "a)",
        "text": "Skryf die vier lengtes neer.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Werk die omtrek van die boek uit.",
        "marks": 2
       }
      ]
     },
     {
      "num": "3",
      "text": "Sipho loop een keer om 'n reghoekige sokkerveld wat 100 m lank en 60 m breed is.<svg viewBox=\"0 0 372 244\" style=\"display:block;width:100%;max-width:300px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><polygon points=\"66.0,50.0 306.0,50.0 306.0,194.0 66.0,194.0\" fill=\"rgba(59,130,246,.16)\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"186.0\" y=\"34.0\" text-anchor=\"middle\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">100 m</text><text x=\"315.0\" y=\"128.0\" text-anchor=\"start\" fill=\"currentColor\" font-size=\"17\" font-weight=\"800\" font-family=\"sans-serif\">60 m</text></svg>",
      "parts": [
       {
        "label": "a)",
        "text": "Hoe ver loop hy?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Hoe ver loop hy as hy 3 keer om die veld loop?",
        "marks": 2
       }
      ]
     },
     {
      "num": "4",
      "text": "'n Vierkant het 'n omtrek van 48 cm.",
      "parts": [
       {
        "label": "a)",
        "text": "Hoe lank is een sy?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Teken 'n reghoek (nie 'n vierkant nie) met dieselfde omtrek. Skryf sy lengte en breedte neer.",
        "marks": 3
       }
      ]
     }
    ]
   },
   {
    "name": "Oppervlakte",
    "questions": [
     {
      "num": "5",
      "text": "Tel die vierkantjies. Skryf die oppervlakte in vierkante eenhede.",
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
      "text": "'n Badkamervloer is met vierkantige teëls bedek: 8 teëls langs een muur en 5 teëls langs die ander muur.",
      "parts": [
       {
        "label": "a)",
        "text": "Hoeveel teëls bedek die vloer?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "'n Doos hou 10 teëls. Hoeveel dose is nodig?",
        "marks": 2
       }
      ]
     },
     {
      "num": "7",
      "text": "Teken op vierkantjiespapier twee verskillende reghoeke wat elk 'n oppervlakte van 12 vierkante eenhede het.",
      "parts": [
       {
        "label": "a)",
        "text": "Skryf die lengte en breedte van elke reghoek neer.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Watter een van jou reghoeke het die langer omtrek?",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Inhoudsmaat",
    "questions": [
     {
      "num": "8",
      "text": "Skryf in milliliter.",
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
      "text": "Thabo vul 'n pot met 'n 500 ml-beker. Hy gooi 6 vol bekers in.",
      "parts": [
       {
        "label": "a)",
        "text": "Wat is die inhoudsmaat van die pot in ml?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Skryf dit in liter.",
        "marks": 1
       }
      ]
     },
     {
      "num": "10",
      "text": "'n Sappakkie hou 200 ml.",
      "parts": [
       {
        "label": "a)",
        "text": "Hoeveel sappakkies maak 'n 1 l-kan vol?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Hoeveel sappakkies maak 'n 2 l-bottel vol?",
        "marks": 2
       }
      ]
     },
     {
      "num": "11",
      "text": "Kies tuis twee houers. Skat hoeveel koppies water elkeen vol maak, vul hulle dan en tel.",
      "parts": [
       {
        "label": "a)",
        "text": "Skryf jou skattings en jou tellings in 'n tabel.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Watter houer het die groter inhoudsmaat?",
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
      "text": "Elke boks is van 1 cm³-blokkies gemaak. Skryf die volume in cm³.",
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
      "text": "Lerato bou 'n boks uit 1 cm³-blokkies. Elke laag het 4 rye van 5 blokkies.",
      "parts": [
       {
        "label": "a)",
        "text": "Hoeveel blokkies is in een laag?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Die boks is 3 lae hoog. Wat is sy volume?",
        "marks": 2
       }
      ]
     },
     {
      "num": "14",
      "text": "Jy het 18 blokkies.",
      "parts": [
       {
        "label": "a)",
        "text": "Bou (of teken) 'n boks wat al 18 blokkies gebruik. Skryf sy lengte, breedte en hoogte neer.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Vind 'n ander boks met dieselfde volume.",
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
  "chapterName": "Hoofstuk 7 — Omtrek, Oppervlakte, Inhoudsmaat en Volume",
  "topics": [
   {
    "name": "Omtrek",
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
      "note": "Eie metings: oorstaande sye van die boek is gelyk."
     },
     {
      "num": "Q2b",
      "ans": "—",
      "note": "Tel die vier sye bymekaar, byvoorbeeld 30 + 21 + 30 + 21 = 102 cm."
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
      "note": "Een voorbeeld: enige lengte + breedte = 24 cm werk (maar nie 12 en 12 nie)."
     }
    ]
   },
   {
    "name": "Oppervlakte",
    "answers": [
     {
      "num": "Q5a",
      "ans": "10",
      "note": "vierkante eenhede: 2 rye van 5"
     },
     {
      "num": "Q5b",
      "ans": "10",
      "note": "vierkante eenhede: 3 + 3 + 3 + 1"
     },
     {
      "num": "Q5c",
      "ans": "6",
      "note": "vierkante eenhede: 1 + 2 + 3"
     },
     {
      "num": "Q6a",
      "ans": "40",
      "note": "teëls: 5 × 8"
     },
     {
      "num": "Q6b",
      "ans": "4",
      "note": "dose: 40 ÷ 10"
     },
     {
      "num": "Q7a",
      "ans": "6 × 2; 4 × 3; 12 × 1",
      "note": "Enige twee: lengte × breedte moet 12 wees."
     },
     {
      "num": "Q7b",
      "ans": "12 × 1 > 6 × 2 > 4 × 3",
      "note": "Die lang, dun een. Omtrekke: 12 × 1 → 26, 6 × 2 → 16, 4 × 3 → 14."
     }
    ]
   },
   {
    "name": "Inhoudsmaat",
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
      "note": "Eie tabel: 'n skatting en 'n telling vir elke houer."
     },
     {
      "num": "Q11b",
      "ans": "—",
      "note": "Die een wat meer koppies gevat het."
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
      "note": "blokkies: 4 × 5"
     },
     {
      "num": "Q13b",
      "ans": "60 cm³",
      "note": "20 × 3"
     },
     {
      "num": "Q14a",
      "ans": "3 × 3 × 2",
      "note": "Byvoorbeeld: lengte × breedte × hoogte moet 18 wees."
     },
     {
      "num": "Q14b",
      "ans": "6 × 3 × 1; 9 × 2 × 1; 18 × 1 × 1",
      "note": "Enige een wat verskil van deel a."
     }
    ]
   }
  ]
 }
});
