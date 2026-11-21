// Math Magician — Grade 4, Chapter 4 (Vermenigvuldiging en Deling) — Afrikaans
// Generated from one bilingual source (scripts/math-gr4/gen_ch4.js); edit both languages there.
MathMagician.registerChapter(4, {
 "topics": [
  {
   "id": 401,
   "chapter": 4,
   "name": "Deel",
   "fullName": "Deel met die maaltafels",
   "lesson": {
    "heading": "Deel met die maaltafels",
    "sub": "Hoofstuk 4 · Onderwerp 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/pap-bowl.webp\" srcset=\"/assets/stickers/pap-bowl@2x.webp 2x\" alt=\"\"><p><strong>Deel</strong> beteken om eweredig te verdeel of gelyke groepe te maak. Ons gebruik ons maaltafels om te deel: <span class=\"math\">72 ÷ 9 = 8</span> want <span class=\"math\">9 × 8 = 72</span>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Resse</div><p>Soms deel 'n getal nie presies nie. Wat oorbly, is die <strong>res</strong>: <span class=\"math\">74 ÷ 9 = 8 res 2</span>, want <span class=\"math\">9 × 8 = 72</span> en 2 bly oor.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Deel as terugspring</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">8 − 2 − 2 − 2 − 2 = 0</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Dit is 4 spronge van 2, so <span class=\"math\">8 ÷ 2 = 4</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Die volgorde maak saak: <span class=\"math\">125 ÷ 5</span> is nie dieselfde as <span class=\"math\">5 ÷ 125</span> nie.</span></div></div><div class=\"g4-sim\" id=\"s401\"><h4>🎮 Spring Terug</h4><p class=\"how\">Kies 'n getal en waardeur om te deel. Kyk hoe die spronge terug gaan na 0. Wat nie 'n volle sprong maak nie, is die res.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-s=\"n:-1\">−</button><span class=\"g4-big\" data-k=\"n\" style=\"min-width:48px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"n:1\">+</button><span class=\"g4-big\">÷</span><button class=\"g4-btn ghost\" data-s=\"d:-1\">−</button><span class=\"g4-big\" data-k=\"d\" style=\"min-width:48px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"d:1\">+</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 150\" data-k=\"svg\" role=\"img\" aria-label=\"number line\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  let n = 74, d = 9;\r\n  function draw() {\r\n    q(root, 'n').textContent = n; q(root, 'd').textContent = d;\r\n    const k = Math.floor(n / d), r = n % d, max = Math.max(10, Math.ceil(n / 10) * 10), X = v => 30 + v / max * 580;\r\n    let h = '<line x1=\"30\" y1=\"110\" x2=\"610\" y2=\"110\" stroke=\"#e2e8f0\" stroke-width=\"3\"/>';\r\n    for (let v = 0; v <= max; v += (max > 60 ? 10 : 5)) h += '<line x1=\"' + X(v) + '\" y1=\"102\" x2=\"' + X(v) + '\" y2=\"118\" stroke=\"#e2e8f0\" stroke-width=\"2\"/><text x=\"' + X(v) + '\" y=\"138\" text-anchor=\"middle\" fill=\"rgba(226,232,240,.7)\" font-size=\"13\">' + v + '</text>';\r\n    for (let i = 0; i < k; i++) { const a = X(n - i * d), b = X(n - (i + 1) * d); h += '<path d=\"M' + a + ' 106 Q' + ((a + b) / 2) + ' ' + (106 - Math.min(58, 12 + (a - b) * 0.6)) + ' ' + b + ' 106\" fill=\"none\" stroke=\"#f472b6\" stroke-width=\"3\"/>'; }\r\n    h += '<circle cx=\"' + X(n) + '\" cy=\"110\" r=\"8\" fill=\"#fde047\"/>';\r\n    if (r) h += '<rect x=\"' + X(0) + '\" y=\"100\" width=\"' + (X(r) - X(0)) + '\" height=\"20\" rx=\"4\" fill=\"rgba(250,204,21,.35)\"/><text x=\"' + ((X(0) + X(r)) / 2) + '\" y=\"92\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"14\" font-weight=\"800\">' + L.left(r) + '</text>';\r\n    svg.innerHTML = h;\r\n    out.innerHTML = '<b>' + n + ' ÷ ' + d + ' = ' + k + (r ? ' ' + L.rem + ' ' + r : '') + '</b><br>' + L.jumps(k, d, r) + '<br>' + L.check(d, k, r, n);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t || !t.dataset.s) return;\r\n    const [k, s] = t.dataset.s.split(':'); if (k === 'n') n = Math.max(1, Math.min(100, n + +s)); else d = Math.max(2, Math.min(12, d + +s)); draw();\r\n  });\r\n  draw();\r\n})(__rev({\"rem\":\"res\",\"left\":{\"__fn\":\"r => r + ' oor'\"},\"jumps\":{\"__fn\":\"(k, d, r) => 'Spring terug in ' + d + '\\\\'e: ' + k + ' spronge' + (r ? ', en ' + r + ' bly oor.' : ' land presies op 0.')\"},\"check\":{\"__fn\":\"(d, k, r, n) => 'Toets: ' + d + ' × ' + k + (r ? ' + ' + r : '') + ' = ' + n\"}}), document.getElementById('s401')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Jou tafels werk ook vir groter getalle: <span class=\"math\">132 ÷ 12 = 11</span> want <span class=\"math\">12 × 11 = 132</span>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "72 ÷ 9 = ?",
     "answer": "8",
     "topic": "Deel"
    },
    {
     "type": "mc",
     "text": "74 ÷ 9 = ?",
     "options": [
      "8 res 2",
      "8",
      "9 res 2",
      "7 res 11"
     ],
     "answer": 0,
     "topic": "Deel"
    },
    {
     "type": "input",
     "text": "132 ÷ 12 = ?",
     "answer": "11",
     "topic": "Deel"
    },
    {
     "type": "mc",
     "text": "Kan ons die getalle in 'n deelsom omruil? Is 125 ÷ 5 dieselfde as 5 ÷ 125?",
     "options": [
      "Ja",
      "Nee"
     ],
     "answer": 1,
     "topic": "Deel"
    },
    {
     "type": "input",
     "text": "8 − 2 − 2 − 2 − 2 = 0. So 8 ÷ 2 = ?",
     "answer": "4",
     "topic": "Deel"
    },
    {
     "type": "input",
     "text": "56 ÷ 7 = ?",
     "answer": "8",
     "topic": "Deel"
    },
    {
     "type": "input",
     "text": "45 ÷ 6 = 7 res ___",
     "answer": "3",
     "topic": "Deel"
    },
    {
     "type": "input",
     "text": "90 ÷ 10 = ?",
     "answer": "9",
     "topic": "Deel"
    }
   ]
  },
  {
   "id": 402,
   "chapter": 4,
   "name": "Halveer, ewe en onewe",
   "fullName": "Getalle halveer, ewe en onewe getalle",
   "lesson": {
    "heading": "Getalle halveer, ewe en onewe getalle",
    "sub": "Hoofstuk 4 · Onderwerp 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/apple.webp\" srcset=\"/assets/stickers/apple@2x.webp 2x\" alt=\"\"><p><strong>Halveer</strong> beteken deel deur 2, of verdeel in 2 gelyke dele. Die helfte van 8 is 4.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Halveer deur op te breek</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Die helfte van 94: die helfte van 90 is 45 en die helfte van 4 is 2, so <strong>47</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Die helfte van 216: die helfte van 200 is 100 en die helfte van 16 is 8, so <strong>108</strong>.</span></div></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Ewe en onewe</div><p><strong>Ewe</strong> getalle deel presies deur 2: 376 is ewe. <strong>Onewe</strong> getalle laat 'n res van 1: 377 is onewe. Kyk na die laaste syfer!</p></div><div class=\"g4-sim\" id=\"s402\"><h4>🎮 Halveermasjien</h4><p class=\"how\">Tik 'n getal (of tik op een). Die masjien halveer dit en sê of dit ewe of onewe is. Klein getalle word as pare kolletjies gewys.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"n\" value=\"94\" inputmode=\"numeric\" aria-label=\"number\"><button class=\"g4-btn ghost\" data-v=\"8\">8</button><button class=\"g4-btn ghost\" data-v=\"15\">15</button><button class=\"g4-btn ghost\" data-v=\"94\">94</button><button class=\"g4-btn ghost\" data-v=\"216\">216</button><button class=\"g4-btn ghost\" data-v=\"377\">377</button></div><div class=\"g4-stage\"><svg data-k=\"svg\" role=\"img\" aria-label=\"pairs\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, num, fmt } = window.G4;\r\n  const inp = q(root, 'n'), out = q(root, 'out'), svg = q(root, 'svg');\r\n  function draw() {\r\n    let v = num(inp.value); if (v == null || v < 0) v = 0; v = Math.min(998, v);\r\n    const even = v % 2 === 0, parts = v >= 100 ? [Math.floor(v / 100) * 100, v % 100] : v >= 10 ? [Math.floor(v / 10) * 10, v % 10] : [v];\r\n    let h = '';\r\n    if (v <= 40) { for (let i = 0; i < v; i++) { const pair = Math.floor(i / 2), top = i % 2; h += '<circle cx=\"' + (30 + pair * 30) + '\" cy=\"' + (30 + top * 34) + '\" r=\"12\" fill=\"' + (i === v - 1 && !even ? '#fde047' : '#60a5fa') + '\"/>'; } svg.setAttribute('viewBox', '0 0 640 100'); svg.innerHTML = h; svg.parentNode.style.display = ''; }\r\n    else svg.parentNode.style.display = 'none';\r\n    const halfSteps = parts.length > 1 && parts[1] ? L.halfParts(parts.map(fmt), parts.map(p => fmt(p / 2))) : '';\r\n    out.innerHTML = (even ? '<b>' + L.half(fmt(v), fmt(v / 2)) + '</b>' + (halfSteps ? '<br>' + halfSteps : '') : '<b>' + L.halfOdd(fmt(v), fmt(Math.floor(v / 2))) + '</b>') + '<br>' + (even ? L.even(fmt(v)) : L.odd(fmt(v))) + (v <= 40 ? '<br>' + (even ? L.pairsEven : L.pairsOdd) : '');\r\n  }\r\n  inp.addEventListener('input', draw);\r\n  root.addEventListener('click', e => { const t = e.target.closest('button'); if (t && t.dataset.v) { inp.value = t.dataset.v; draw(); } });\r\n  draw();\r\n})(__rev({\"half\":{\"__fn\":\"(v, h) => 'Die helfte van ' + v + ' = ' + v + ' ÷ 2 = ' + h\"},\"halfParts\":{\"__fn\":\"(p, h) => 'Breek dit op: die helfte van ' + p.join(' + ') + ' = ' + h.join(' + ')\"},\"halfOdd\":{\"__fn\":\"(v, h) => v + ' ÷ 2 = ' + h + ' res 1'\"},\"even\":{\"__fn\":\"v => v + ' is <b>ewe</b>: dit deel presies deur 2.'\"},\"odd\":{\"__fn\":\"v => v + ' is <b>onewe</b>: as ons deur 2 deel, bly 1 oor.'\"},\"pairsEven\":\"Elke kolletjie het 'n maat.\",\"pairsOdd\":\"Een kolletjie (geel) het geen maat nie.\"}), document.getElementById('s402')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Die ewe getalle tussen 237 en 251 is 238, 240, 242, 244, 246, 248 en 250.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Wat is die helfte van 94?",
     "answer": "47",
     "topic": "Halveer, ewe en onewe"
    },
    {
     "type": "input",
     "text": "Wat is die helfte van 216?",
     "answer": "108",
     "topic": "Halveer, ewe en onewe"
    },
    {
     "type": "mc",
     "text": "Watter getal is onewe?",
     "options": [
      "376",
      "377",
      "378",
      "380"
     ],
     "answer": 1,
     "topic": "Halveer, ewe en onewe"
    },
    {
     "type": "input",
     "text": "Wat is die helfte van 8?",
     "answer": "4",
     "topic": "Halveer, ewe en onewe"
    },
    {
     "type": "mc",
     "text": "Watter is die ewe getalle tussen 237 en 241?",
     "options": [
      "238; 240",
      "237; 239; 241",
      "238; 239; 240",
      "net 240"
     ],
     "answer": 0,
     "topic": "Halveer, ewe en onewe"
    },
    {
     "type": "input",
     "text": "Wat is die helfte van 150?",
     "answer": "75",
     "topic": "Halveer, ewe en onewe"
    },
    {
     "type": "mc",
     "text": "As jy 'n onewe getal deur 2 deel, is die res…",
     "options": [
      "0",
      "1",
      "2",
      "3"
     ],
     "answer": 1,
     "topic": "Halveer, ewe en onewe"
    },
    {
     "type": "input",
     "text": "Wat is die helfte van 538?",
     "answer": "269",
     "topic": "Halveer, ewe en onewe"
    }
   ]
  },
  {
   "id": 403,
   "chapter": 4,
   "name": "Groter getalle deel",
   "fullName": "3-syfergetalle deur 1-syfergetalle deel",
   "lesson": {
    "heading": "3-syfergetalle deur 1-syfergetalle deel",
    "sub": "Hoofstuk 4 · Onderwerp 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/bread-loaf.webp\" srcset=\"/assets/stickers/bread-loaf@2x.webp 2x\" alt=\"\"><p>Om 'n groot getal te deel, <strong>breek dit op in dele</strong> wat maklik is om te deel, soos veelvoude van 10 keer die getal waardeur jy deel.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ 192 ÷ 8</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Skryf 192 as veelvoude van 8: <span class=\"math\">192 = 160 + 32</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">160 ÷ 8 = 20</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">32 ÷ 8 = 4</span></span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>So <span class=\"math\">192 ÷ 8 = 20 + 4 = 24</span>. Toets: <span class=\"math\">24 × 8 = 192</span> ✓</span></div></div><div class=\"g4-sim\" id=\"s403\"><h4>🎮 Breek-dit-op-deler</h4><p class=\"how\">Werk dit eers uit en tik jou antwoord. Sien dan hoe om groot groepe af te trek totdat niks oorbly nie.</p><div class=\"g4-big\" data-k=\"sum\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"next\">Volgende stap</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><ul class=\"g4-steps\" data-k=\"steps\"></ul><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd } = window.G4;\r\n  const list = q(root, 'steps'), out = q(root, 'out');\r\n  let n, d, shown;\r\n  function chunks() {\r\n    const st = []; let left = n, total = 0;\r\n    while (left > 0) {\r\n      let m = 1; if (left >= d * 100) m = Math.floor(left / (d * 100)) * 100; else if (left >= d * 10) m = Math.floor(left / (d * 10)) * 10; else m = Math.floor(left / d);\r\n      st.push([left, m]); total += m; left -= d * m;\r\n    }\r\n    return { st, total };\r\n  }\r\n  function draw() {\r\n    q(root, 'sum').textContent = n + ' ÷ ' + d + ' = ?';\r\n    const { st, total } = chunks();\r\n    const rows = st.map(([left, m]) => L.take(d, m, d * m, left, left - d * m));\r\n    rows.push(L.add(st.map(s => s[1]).join(' + '), total));\r\n    list.innerHTML = rows.slice(0, shown).map(r => '<li>' + r + '</li>').join('');\r\n    q(root, 'next').disabled = shown >= rows.length;\r\n  }\r\n  function fresh() { d = rnd(3, 9); const ans = rnd(12, 99); n = d * ans; if (n > 999 || n < 100) return fresh(); shown = 0; q(root, 'ans').value = ''; out.className = 'g4-out'; out.innerHTML = L.tryFirst; draw(); }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'next') { shown++; draw(); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'ans').value), ok = v === n / d; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right(n / d, d, n) : L.wrong; }\r\n  });\r\n  fresh(); n = 192; d = 8; draw();\r\n})(__rev({\"take\":{\"__fn\":\"(d, m, p, from, left) => 'Trek af ' + d + ' × ' + m + ' = ' + p + ' → ' + from + ' − ' + p + ' = <b>' + left + '</b>'\"},\"add\":{\"__fn\":\"(parts, t) => 'Tel die groepe bymekaar: ' + parts + ' = <b>' + t + '</b>'\"},\"tryFirst\":\"Probeer dit eers en tik dan op Volgende stap om die opbreking te sien.\",\"right\":{\"__fn\":\"(q, d, n) => 'Reg! Toets: ' + q + ' × ' + d + ' = ' + n\"},\"wrong\":\"Nog nie. Tik op Volgende stap vir hulp.\"}), document.getElementById('s403')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Skat eers: <span class=\"math\">298 ÷ 3</span> is omtrent <span class=\"math\">300 ÷ 3 = 100</span>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "192 ÷ 8 = ?",
     "answer": "24",
     "topic": "Groter getalle deel"
    },
    {
     "type": "input",
     "text": "96 ÷ 4 = ?",
     "answer": "24",
     "topic": "Groter getalle deel"
    },
    {
     "type": "input",
     "text": "135 ÷ 5 = ?",
     "answer": "27",
     "topic": "Groter getalle deel"
    },
    {
     "type": "mc",
     "text": "192 = 160 + 32. 160 ÷ 8 = 20 en 32 ÷ 8 = 4. So 192 ÷ 8 = ?",
     "options": [
      "24",
      "20",
      "4",
      "28"
     ],
     "answer": 0,
     "topic": "Groter getalle deel"
    },
    {
     "type": "input",
     "text": "252 ÷ 6 = ?",
     "answer": "42",
     "topic": "Groter getalle deel"
    },
    {
     "type": "input",
     "text": "168 ÷ 7 = ?",
     "answer": "24",
     "topic": "Groter getalle deel"
    },
    {
     "type": "mc",
     "text": "Wat is die beste skatting vir 298 ÷ 3?",
     "options": [
      "omtrent 10",
      "omtrent 100",
      "omtrent 1 000",
      "omtrent 300"
     ],
     "answer": 1,
     "topic": "Groter getalle deel"
    },
    {
     "type": "input",
     "text": "455 ÷ 5 = ?",
     "answer": "91",
     "topic": "Groter getalle deel"
    }
   ]
  },
  {
   "id": 404,
   "chapter": 4,
   "name": "Vermenigvuldiging en deling",
   "fullName": "Vermenigvuldiging en deling maak mekaar ongedaan",
   "lesson": {
    "heading": "Vermenigvuldiging en deling maak mekaar ongedaan",
    "sub": "Hoofstuk 4 · Onderwerp 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/scales.webp\" srcset=\"/assets/stickers/scales@2x.webp 2x\" alt=\"\"><p>Vermenigvuldiging en deling is teenoorgesteldes: een <strong>maak die ander ongedaan</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Die omgekeerde verband</div><p>As <span class=\"math\">47 × 9 = 423</span>, dan is <span class=\"math\">423 ÷ 47 = 9</span> en <span class=\"math\">423 ÷ 9 = 47</span>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Gebruik dit om te toets en om ontbrekende getalle te vind</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Toets <span class=\"math\">192 ÷ 8 = 24</span>: werk <span class=\"math\">24 × 8 = 192</span> uit ✓</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Die produk van twee getalle is 405. Een getal is 9. Die ander is <span class=\"math\">405 ÷ 9 = 45</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">___ × 7 = 84</span>: werk <span class=\"math\">84 ÷ 7 = 12</span> uit.</span></div></div><div class=\"g4-sim\" id=\"s404\"><h4>🎮 Maal-en-deel-driehoek</h4><p class=\"how\">Verander die twee getalle onder en sien die hele familie. Tik op Toets my om 'n ontbrekende getal te vind.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"a\" value=\"9\" inputmode=\"numeric\" aria-label=\"first number\"><span class=\"g4-big\">×</span><input class=\"g4-input\" data-k=\"b\" value=\"47\" inputmode=\"numeric\" aria-label=\"second number\"><button class=\"g4-btn ghost\" data-k=\"quiz\">Toets my</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 200\" data-k=\"svg\" role=\"img\" aria-label=\"fact family\"></svg></div><ul class=\"g4-steps\" data-k=\"facts\"></ul><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, rnd } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), list = q(root, 'facts'), ai = q(root, 'a'), bi = q(root, 'b');\r\n  let hide = -1, F = [];\r\n  function draw() {\r\n    const a = Math.max(1, window.G4.num(ai.value) || 1), b = Math.max(1, window.G4.num(bi.value) || 1), c = a * b;\r\n    svg.innerHTML = '<path d=\"M320 20 L180 180 L460 180 Z\" fill=\"rgba(158,212,60,.08)\" stroke=\"#9ed43c\" stroke-width=\"3\"/><circle cx=\"320\" cy=\"58\" r=\"36\" fill=\"#0d1016\" stroke=\"#fde047\" stroke-width=\"3\"/><text x=\"320\" y=\"65\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"22\" font-weight=\"900\">' + c + '</text><circle cx=\"225\" cy=\"150\" r=\"34\" fill=\"#0d1016\" stroke=\"#60a5fa\" stroke-width=\"3\"/><text x=\"225\" y=\"157\" text-anchor=\"middle\" fill=\"#93c5fd\" font-size=\"22\" font-weight=\"900\">' + a + '</text><circle cx=\"415\" cy=\"150\" r=\"34\" fill=\"#0d1016\" stroke=\"#f472b6\" stroke-width=\"3\"/><text x=\"415\" y=\"157\" text-anchor=\"middle\" fill=\"#f9a8d4\" font-size=\"22\" font-weight=\"900\">' + b + '</text><text x=\"320\" y=\"150\" text-anchor=\"middle\" fill=\"#c3e56f\" font-size=\"26\" font-weight=\"900\">× ÷</text>';\r\n    F = [[a, '×', b, c], [b, '×', a, c], [c, '÷', a, b], [c, '÷', b, a]];\r\n    list.innerHTML = F.map((f, i) => '<li>' + (i === hide ? f[0] + ' ' + f[1] + ' ' + f[2] + ' = <input class=\"g4-input\" data-k=\"blank\" inputmode=\"numeric\" style=\"width:100px\"> <button class=\"g4-btn\" data-k=\"check\">' + L.check + '</button>' : '<b>' + f.slice(0, 3).join(' ') + ' = ' + f[3] + '</b>') + '</li>').join('');\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'quiz') { ai.value = rnd(3, 12); bi.value = rnd(11, 49); hide = rnd(2, 3); draw(); out.className = 'g4-out'; out.innerHTML = L.fill; }\r\n    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'blank').value), ok = v === F[hide][3]; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right : L.wrong; }\r\n  });\r\n  [ai, bi].forEach(el => el.addEventListener('input', () => { hide = -1; draw(); out.className = 'g4-out'; out.innerHTML = L.explain; }));\r\n  draw(); out.innerHTML = L.explain;\r\n})(__rev({\"check\":\"Toets\",\"explain\":\"Vermenigvuldiging en deling maak mekaar ongedaan. Een feit gee jou vier!\",\"fill\":\"Vul die ontbrekende getal in.\",\"right\":\"Reg! Deling maak vermenigvuldiging ongedaan.\",\"wrong\":\"Nog nie. Kyk na die vermenigvuldigingsfeit bo.\"}), document.getElementById('s404')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>As jy weet <span class=\"math\">25 × 4 = 100</span>, weet jy ook <span class=\"math\">100 ÷ 4 = 25</span> en <span class=\"math\">100 ÷ 25 = 4</span>.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "As 47 × 9 = 423, dan is 423 ÷ 9 = ?",
     "options": [
      "47",
      "9",
      "423",
      "432"
     ],
     "answer": 0,
     "topic": "Vermenigvuldiging en deling"
    },
    {
     "type": "input",
     "text": "As 6 × 8 = 48, dan is 48 ÷ 6 = ?",
     "answer": "8",
     "topic": "Vermenigvuldiging en deling"
    },
    {
     "type": "mc",
     "text": "Watter feit hoort by die familie van 7 × 9 = 63?",
     "options": [
      "63 ÷ 7 = 9",
      "63 − 7 = 9",
      "9 ÷ 63 = 7",
      "7 + 9 = 63"
     ],
     "answer": 0,
     "topic": "Vermenigvuldiging en deling"
    },
    {
     "type": "input",
     "text": "Die produk van twee getalle is 405. Een getal is 9. Wat is die ander getal?",
     "answer": "45",
     "topic": "Vermenigvuldiging en deling"
    },
    {
     "type": "input",
     "text": "___ × 7 = 84",
     "answer": "12",
     "topic": "Vermenigvuldiging en deling"
    },
    {
     "type": "input",
     "text": "Toets 192 ÷ 8 = 24 deur te vermenigvuldig: 24 × 8 = ?",
     "answer": "192",
     "topic": "Vermenigvuldiging en deling"
    },
    {
     "type": "input",
     "text": "360 ÷ ___ = 40",
     "answer": "9",
     "topic": "Vermenigvuldiging en deling"
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
     "topic": "Vermenigvuldiging en deling"
    }
   ]
  },
  {
   "id": 405,
   "chapter": 4,
   "name": "Deelprobleme",
   "fullName": "Deelprobleme oplos",
   "lesson": {
    "heading": "Deelprobleme oplos",
    "sub": "Hoofstuk 4 · Onderwerp 5",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/child.webp\" srcset=\"/assets/stickers/child@2x.webp 2x\" alt=\"\"><p>Deelprobleme gaan oor <strong>eweredig verdeel</strong> of <strong>gelyke groepe</strong> maak. Sleutelwoorde: <strong>elk, eweredig verdeel, per groep, per pakkie</strong>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Deel met 'n res</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>580 appels word eweredig tussen 18 mense verdeel.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">18 × 30 = 540</span>, en <span class=\"math\">580 − 540 = 40</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">18 × 2 = 36</span>, en <span class=\"math\">40 − 36 = 4</span>.</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>Elke persoon kry <strong>32</strong> appels, en <strong>4</strong> bly oor.</span></div></div><div class=\"g4-sim\" id=\"s405\"><h4>🎮 Regverdige Deel</h4><p class=\"how\">Kies hoeveel lekkers en hoeveel kinders. Tik op Deel een rondte om elke kind nog een te gee, totdat daar nie genoeg is vir almal nie.</p><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-s=\"n:-1\">−</button><span class=\"g4-big\" data-k=\"n\" style=\"min-width:48px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"n:1\">+</button><span class=\"g4-big\">÷</span><button class=\"g4-btn ghost\" data-s=\"k:-1\">−</button><span class=\"g4-big\" data-k=\"k\" style=\"min-width:48px;text-align:center\"></span><button class=\"g4-btn ghost\" data-s=\"k:1\">+</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 250\" data-k=\"svg\" role=\"img\" aria-label=\"sharing\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"deal\">Deel een rondte</button><button class=\"g4-btn ghost\" data-k=\"all\">Deel alles</button><button class=\"g4-btn ghost\" data-k=\"reset\">Begin oor</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { q, stk } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  let n = 50, k = 6, dealt = 0;\r\n  function draw() {\r\n    q(root, 'n').textContent = n; q(root, 'k').textContent = k;\r\n    const each = Math.floor(dealt / k), W = 600 / k, cols = Math.max(1, Math.floor((W - 16) / 14)), boxH = Math.max(70, 30 + Math.ceil(Math.ceil(n / k) / cols) * 14), Y = boxH + 30;\r\n    let h = '';\r\n    for (let g = 0; g < k; g++) {\r\n      const x = 20 + g * W; h += '<rect x=\"' + (x + 4) + '\" y=\"10\" width=\"' + (W - 8) + '\" height=\"' + boxH + '\" rx=\"12\" fill=\"rgba(255,255,255,.04)\" stroke=\"rgba(226,232,240,.25)\"/>';\r\n      const got = Math.floor(dealt / k) + (g < dealt % k ? 1 : 0);\r\n      for (let i = 0; i < got; i++) { h += '<circle cx=\"' + (x + 14 + (i % cols) * 14) + '\" cy=\"' + (26 + Math.floor(i / cols) * 14) + '\" r=\"5.5\" fill=\"#f472b6\"/>'; }\r\n    }\r\n    const left = n - dealt;\r\n    for (let i = 0; i < left; i++) h += '<circle cx=\"' + (24 + (i % 40) * 15) + '\" cy=\"' + (Y + Math.floor(i / 40) * 15) + '\" r=\"5.5\" fill=\"#fde047\"/>';\r\n    svg.setAttribute('viewBox', '0 0 640 ' + (Y + 18 + Math.floor(Math.max(0, left - 1) / 40) * 15));\r\n    svg.innerHTML = h;\r\n    const done = n - dealt < k;\r\n    q(root, 'deal').disabled = done;\r\n    out.className = 'g4-out' + (done ? ' good' : '');\r\n    out.innerHTML = done ? '<b>' + n + ' ÷ ' + k + ' = ' + Math.floor(n / k) + (n % k ? ' ' + L.rem + ' ' + (n % k) : '') + '</b><br>' + L.result(Math.floor(n / k), n % k) : L.dealing(each, n - dealt);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.s) { const [w, s] = t.dataset.s.split(':'); if (w === 'n') n = Math.max(1, Math.min(80, n + +s)); else k = Math.max(2, Math.min(8, k + +s)); dealt = 0; }\r\n    else if (t.dataset.k === 'deal') { if (n - dealt >= k) dealt += k; }\r\n    else if (t.dataset.k === 'all') dealt = n - (n % k);\r\n    else if (t.dataset.k === 'reset') dealt = 0;\r\n    draw();\r\n  });\r\n  draw();\r\n})(__rev({\"rem\":\"res\",\"dealing\":{\"__fn\":\"(e, l) => 'Elke groep het tot dusver ' + e + '. ' + l + ' moet nog verdeel word.'\"},\"result\":{\"__fn\":\"(q, r) => 'Elke groep kry <b>' + q + '</b>' + (r ? ', en <b>' + r + '</b> bly oor (die geel kolletjies).' : ', met niks oor nie.')\"}}), document.getElementById('s405')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Dink na oor wat die res beteken. As 245 eiers in bokse van 6 gaan, is daar 40 vol bokse en 5 eiers oor, so jy het <strong>41</strong> bokse nodig om almal te hou.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "580 appels word eweredig tussen 18 mense verdeel. Hoeveel appels kry elke persoon?",
     "answer": "32",
     "topic": "Deelprobleme"
    },
    {
     "type": "input",
     "text": "580 appels word eweredig tussen 18 mense verdeel. Hoeveel appels bly oor?",
     "answer": "4",
     "topic": "Deelprobleme"
    },
    {
     "type": "input",
     "text": "96 leerders maak spanne van 8. Hoeveel spanne is daar?",
     "answer": "12",
     "topic": "Deelprobleme"
    },
    {
     "type": "input",
     "text": "Vyf vriende verdeel R135 eweredig. Hoeveel kry elke vriend? (Rand)",
     "answer": "27",
     "topic": "Deelprobleme"
    },
    {
     "type": "mc",
     "text": "Watter woorde sê vir jou om te deel?",
     "options": [
      "altesaam",
      "eweredig verdeel",
      "meer as",
      "produk"
     ],
     "answer": 1,
     "topic": "Deelprobleme"
    },
    {
     "type": "input",
     "text": "50 lekkers word eweredig tussen 6 kinders verdeel. Hoeveel lekkers kry elke kind?",
     "answer": "8",
     "topic": "Deelprobleme"
    },
    {
     "type": "input",
     "text": "50 lekkers word eweredig tussen 6 kinders verdeel. Hoeveel lekkers bly oor?",
     "answer": "2",
     "topic": "Deelprobleme"
    },
    {
     "type": "input",
     "text": "245 eiers word in bokse van 6 verpak. Hoeveel bokse is heeltemal vol?",
     "answer": "40",
     "topic": "Deelprobleme"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 4,
  "chapterName": "Vermenigvuldiging en Deling",
  "topics": [
   {
    "name": "Deel",
    "questions": [
     {
      "num": "1",
      "text": "Bereken. Gee die res as daar een is.",
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
    "name": "Halveer, ewe en onewe",
    "questions": [
     {
      "num": "2",
      "text": "Halveer elke getal:",
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
      "text": "Skryf al die onewe getalle tussen 160 en 172 neer.",
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
    "name": "Groter getalle deel",
    "questions": [
     {
      "num": "4",
      "text": "Bereken deur op te breek. Toets elke antwoord deur te vermenigvuldig.",
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
    "name": "Vermenigvuldiging en deling",
    "questions": [
     {
      "num": "5",
      "text": "Skryf die vier feite in die familie van 8 × 12 = 96.",
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
      "text": "Vind die ontbrekende getal:",
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
    "name": "Deelprobleme",
    "questions": [
     {
      "num": "7",
      "text": "Los op. Wys jou bewerkings en sê wat die res beteken.",
      "parts": [
       {
        "label": "a)",
        "text": "R96 word eweredig tussen 4 kinders verdeel. Hoeveel kry elke kind?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "75 leerders gaan op 'n uitstappie. Elke minibus neem 8 leerders. Hoeveel minibusse is nodig?",
        "marks": 3
       },
       {
        "label": "c)",
        "text": "138 albasters word in sakkies van 5 gesit. Hoeveel vol sakkies is daar, en hoeveel albasters bly oor?",
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
  "chapterName": "Hoofstuk 4 — Vermenigvuldiging en Deling",
  "topics": [
   {
    "name": "Deel",
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
    "name": "Halveer, ewe en onewe",
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
    "name": "Groter getalle deel",
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
    "name": "Vermenigvuldiging en deling",
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
    "name": "Deelprobleme",
    "answers": [
     {
      "num": "Q7a",
      "ans": "R24",
      "note": "96 ÷ 4 = 24"
     },
     {
      "num": "Q7b",
      "ans": "10 minibuses",
      "note": "75 ÷ 8 = 9 res 3, so die 3 leerders het nog 'n minibus nodig"
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
