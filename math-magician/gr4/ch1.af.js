// Math Magician — Grade 4, Chapter 1 (Heelgetalle) — Afrikaans
// Generated from one bilingual source (gen_ch1.js); edit both languages together.
MathMagician.registerChapter(1, {
 "topics": [
  {
   "id": 101,
   "chapter": 1,
   "name": "Tel in intervalle",
   "fullName": "Vorentoe en agtertoe tel in intervalle",
   "lesson": {
    "heading": "Vorentoe en agtertoe tel in intervalle",
    "sub": "Hoofstuk 1 · Onderwerp 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/frog.webp\" srcset=\"/assets/stickers/frog@2x.webp 2x\" alt=\"\"><p>Ons kan vorentoe en agtertoe tel in <strong>spronge van dieselfde grootte</strong>, wat ons <strong>intervalle</strong> noem: 2'e, 3'e, 5'e, 10'e, 25'e, 50'e, 100'e, en selfs 9'e, 49'e en 99'e.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Onewe en ewe</div><p><strong>Ewe getalle</strong> eindig op 0, 2, 4, 6 of 8. <strong>Onewe getalle</strong> eindig op 1, 3, 5, 7 of 9. As jy in 2'e van 'n onewe getal af tel, kry jy net onewe getalle.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Uitgewerkte voorbeelde</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Tel in 2'e van 31 af: <span class=\"math\">31; 33; 35; 37; 39</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Tel in 3'e van 110 af: <span class=\"math\">110; 113; 116; 119</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Tel in 9'e van 267 af: tel 10 by, trek 1 af → <span class=\"math\">267; 276; 285; 294</span></span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>Tel agtertoe in 5'e van 624 af: <span class=\"math\">624; 619; 614; 609; 604</span></span></div></div><div class=\"g4-sim\" id=\"s101\"><h4>🎮 Paddasprong</h4><p class=\"how\">Kies 'n begingetal en 'n sproggrootte. Tik op Spring en kyk hoe die padda vir jou tel.</p><div class=\"g4-row\"><label style=\"font-size:18px\">Begin by <input class=\"g4-input\" data-k=\"start\" value=\"31\" inputmode=\"numeric\"></label></div><div class=\"g4-row\" data-k=\"steps\"></div><div class=\"g4-row\" data-k=\"dir\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 175\" data-k=\"svg\" role=\"img\" aria-label=\"Paddasprong\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"hop\">Spring!</button><button class=\"g4-btn ghost\" data-k=\"reset\">Begin oor</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { fmt, q } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), startEl = q(root, 'start');\r\n  let step = 2, dir = 1, seq = [];\r\n  const STEPS = [2, 3, 5, 10, 25, 50, 100, 9];\r\n  q(root, 'steps').innerHTML = STEPS.map(s => '<button class=\"g4-btn ghost\" data-s=\"' + s + '\">' + L.inS(s) + '</button>').join('');\r\n  q(root, 'dir').innerHTML = '<button class=\"g4-btn ghost\" data-d=\"1\">' + L.fwd + '</button><button class=\"g4-btn ghost\" data-d=\"-1\">' + L.back + '</button>';\r\n  const mark = () => {\r\n    root.querySelectorAll('[data-s]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.s === step));\r\n    root.querySelectorAll('[data-d]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.d === dir));\r\n  };\r\n  const reset = () => { const v = window.G4.num(startEl.value); seq = [v == null ? 0 : Math.max(0, Math.min(9999, v))]; draw(); };\r\n  function draw() {\r\n    mark();\r\n    const show = seq.slice(-6), x0 = 50, gap = 108;\r\n    let h = '<line x1=\"20\" y1=\"120\" x2=\"620\" y2=\"120\" stroke=\"rgba(226,232,240,.5)\" stroke-width=\"3\"/>';\r\n    show.forEach((n, i) => {\r\n      const x = x0 + i * gap;\r\n      h += '<line x1=\"' + x + '\" y1=\"110\" x2=\"' + x + '\" y2=\"130\" stroke=\"#e2e8f0\" stroke-width=\"3\"/><text x=\"' + x + '\" y=\"158\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"800\">' + fmt(n) + '</text>';\r\n      if (i > 0) h += '<path d=\"M' + (x - gap + 6) + ' 108 Q' + (x - gap / 2) + ' 52 ' + (x - 6) + ' 108\" fill=\"none\" stroke=\"#9ed43c\" stroke-width=\"3\" stroke-dasharray=\"6 5\"/><text x=\"' + (x - gap / 2) + '\" y=\"62\" text-anchor=\"middle\" fill=\"#c3e56f\" font-size=\"16\" font-weight=\"800\">' + (dir > 0 ? '+' : '−') + step + '</text>';\r\n    });\r\n    const fx = x0 + (show.length - 1) * gap;\r\n    h += '<image href=\"/assets/stickers/frog.webp\" x=\"' + (fx - 43) + '\" y=\"20\" width=\"86\" height=\"86\"/>';\r\n    svg.innerHTML = h;\r\n    let msg = '<b>' + seq.map(fmt).join('; ') + '</b>';\r\n    if (seq.length > 2) msg += '<br>' + L.pattern(step, dir);\r\n    if (step === 9 && seq.length > 1) msg += '<br>' + L.nine(dir);\r\n    out.innerHTML = msg;\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.s) { step = +b.dataset.s; reset(); }\r\n    else if (b.dataset.d) { dir = +b.dataset.d; reset(); }\r\n    else if (b.dataset.k === 'hop') {\r\n      const nx = seq[seq.length - 1] + dir * step;\r\n      if (nx < 0) { out.innerHTML = L.belowZero; return; }\r\n      if (nx > 10000) { out.innerHTML = L.tooBig; return; }\r\n      seq.push(nx); draw();\r\n    } else if (b.dataset.k === 'reset') reset();\r\n  });\r\n  startEl.addEventListener('change', reset);\r\n  reset();\r\n})(__rev({\"title\":\"Paddasprong\",\"how\":\"Kies 'n begingetal en 'n sproggrootte. Tik op Spring en kyk hoe die padda vir jou tel.\",\"start\":\"Begin by\",\"hop\":\"Spring!\",\"reset\":\"Begin oor\",\"fwd\":\"Vorentoe\",\"back\":\"Agtertoe\",\"inS\":{\"__fn\":\"s => 'in ' + s + \\\"'e\\\"\"},\"pattern\":{\"__fn\":\"(s, d) => 'Jy tel ' + (d > 0 ? 'vorentoe' : 'agtertoe') + ' in ' + s + \\\"'e. Elke getal is \\\" + s + (d > 0 ? ' meer' : ' minder') + ' as die een voor dit.'\"},\"nine\":{\"__fn\":\"d => d > 0 ? \\\"Vinnige truuk vir 9'e: tel 10 by en trek dan 1 af.\\\" : \\\"Vinnige truuk vir 9'e: trek 10 af en tel dan 1 by.\\\"\"},\"belowZero\":\"Ons kan in Graad 4 nie onder 0 gaan nie. Begin oor of tel vorentoe.\",\"tooBig\":\"Dit is meer as 10 000. Begin oor.\"}), document.getElementById('s101')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Om die volgende getal in 'n patroon te kry, vra: <strong>met hoeveel gaan dit elke keer op of af?</strong> Voorbeeld: 769; 719; 669 … gaan elke keer 50 af, so die volgende getal is 619.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Tel in 2'e: 31; 33; 35; ___",
     "answer": "37",
     "topic": "Tel in intervalle"
    },
    {
     "type": "input",
     "text": "Tel in 3'e: 110; 113; 116; ___",
     "answer": "119",
     "topic": "Tel in intervalle"
    },
    {
     "type": "input",
     "text": "Tel in 9'e: 267; 276; 285; ___",
     "answer": "294",
     "topic": "Tel in intervalle"
    },
    {
     "type": "input",
     "text": "Tel in 25'e: 450; 475; 500; ___",
     "answer": "525",
     "topic": "Tel in intervalle"
    },
    {
     "type": "input",
     "text": "Tel agtertoe in 5'e: 624; 619; 614; ___",
     "answer": "609",
     "topic": "Tel in intervalle"
    },
    {
     "type": "mc",
     "text": "Watter getal is <strong>onewe</strong>?",
     "options": [
      "4 356",
      "7 218",
      "5 093",
      "1 000"
     ],
     "answer": 2,
     "topic": "Tel in intervalle"
    },
    {
     "type": "input",
     "text": "Wat is die volgende getal? 769; 719; 669; ___",
     "answer": "619",
     "topic": "Tel in intervalle"
    },
    {
     "type": "input",
     "text": "Tel agtertoe in 20'e: 624; 604; 584; ___",
     "answer": "564",
     "topic": "Tel in intervalle"
    }
   ]
  },
  {
   "id": 102,
   "chapter": 1,
   "name": "Plekwaarde",
   "fullName": "Plekwaarde van syfers in 4-syfergetalle",
   "lesson": {
    "heading": "Plekwaarde van syfers in 4-syfergetalle",
    "sub": "Hoofstuk 1 · Onderwerp 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/child.webp\" srcset=\"/assets/stickers/child@2x.webp 2x\" alt=\"\"><p>Elke syfer in 'n getal het 'n <strong>plek</strong>, en sy plek gee dit 'n <strong>waarde</strong>. In <strong>4&nbsp;371</strong> is die 4 4&nbsp;000 werd, maar die 1 is net 1 werd.</p></div><table class=\"g4-chart\"><tr><th>Duisende</th><th>Honderde</th><th>Tiene</th><th>Ene</th></tr><tr><td>4</td><td>3</td><td>7</td><td>1</td></tr></table><div class=\"def-box\"><div class=\"def-box-title\">📖 Uitgebreide notasie</div><p>Ons kan 'n getal opbreek in die waardes van sy syfers: <span class=\"math\">4 371 = 4 000 + 300 + 70 + 1</span>. Dit word <strong>uitgebreide notasie</strong> genoem.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Uitgewerkte voorbeeld</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>In 4 371 is die <strong>4</strong> in die duisende-plek: sy waarde is <strong>4 000</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Die <strong>3</strong> is in die honderde-plek: sy waarde is <strong>300</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Die <strong>7</strong> is in die tiene-plek: sy waarde is <strong>70</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>Die <strong>1</strong> is in die ene-plek: sy waarde is <strong>1</strong>.</span></div></div><div class=\"g4-sim\" id=\"s102\"><h4>🎮 Blokbouer</h4><p class=\"how\">Gebruik + en − om 'n getal met blokke te bou. Of tik op Uitdaging en bou die getal wat jy kry.</p><div class=\"g4-big\" data-k=\"num\">0</div><table class=\"g4-chart\" data-k=\"chart\"></table><div class=\"g4-stage\"><svg viewBox=\"0 0 640 200\" data-k=\"svg\" role=\"img\" aria-label=\"Blokbouer\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"challenge\">Uitdaging</button><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"clear\">Maak skoon</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { fmt, q, rnd } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  const v = [0, 0, 0, 0]; // thousands, hundreds, tens, units\r\n  const COL = ['#f472b6', '#60a5fa', '#facc15', '#4ade80'], VAL = [1000, 100, 10, 1];\r\n  let target = null;\r\n  const value = () => v[0] * 1000 + v[1] * 100 + v[2] * 10 + v[3];\r\n  q(root, 'chart').innerHTML = '<tr>' + L.cols.map((c, i) => '<th style=\"color:' + COL[i] + '\">' + c + '</th>').join('') + '</tr><tr>' + v.map((_, i) => '<td data-i=\"' + i + '\">0</td>').join('') + '</tr><tr>' +\r\n    v.map((_, i) => '<th><button class=\"g4-btn ghost\" data-a=\"' + i + ':-1\" aria-label=\"' + L.minus + ' ' + L.cols[i] + '\">−</button> <button class=\"g4-btn ghost\" data-a=\"' + i + ':1\" aria-label=\"' + L.plus + ' ' + L.cols[i] + '\">+</button></th>').join('') + '</tr>';\r\n  function blocks() {\r\n    let h = '', x = 10;\r\n    for (let k = 0; k < v[0]; k++) { const bx = 10 + (k % 3) * 52, by = 20 + Math.floor(k / 3) * 52; h += '<rect x=\"' + (bx + 8) + '\" y=\"' + (by - 8) + '\" width=\"40\" height=\"40\" fill=\"#9d174d\"/><rect x=\"' + bx + '\" y=\"' + by + '\" width=\"40\" height=\"40\" fill=\"' + COL[0] + '\" stroke=\"#831843\" stroke-width=\"2\"/>'; }\r\n    x = 175;\r\n    for (let k = 0; k < v[1]; k++) { const bx = x + (k % 3) * 46, by = 14 + Math.floor(k / 3) * 46; h += '<rect x=\"' + bx + '\" y=\"' + by + '\" width=\"40\" height=\"40\" fill=\"' + COL[1] + '\" stroke=\"#1e3a8a\" stroke-width=\"1.5\"/>'; for (let g = 1; g < 10; g++) h += '<line x1=\"' + (bx + g * 4) + '\" y1=\"' + by + '\" x2=\"' + (bx + g * 4) + '\" y2=\"' + (by + 40) + '\" stroke=\"#1e3a8a\" stroke-width=\".6\"/><line x1=\"' + bx + '\" y1=\"' + (by + g * 4) + '\" x2=\"' + (bx + 40) + '\" y2=\"' + (by + g * 4) + '\" stroke=\"#1e3a8a\" stroke-width=\".6\"/>'; }\r\n    x = 330;\r\n    for (let k = 0; k < v[2]; k++) { const bx = x + k * 13; h += '<rect x=\"' + bx + '\" y=\"20\" width=\"9\" height=\"90\" fill=\"' + COL[2] + '\" stroke=\"#713f12\" stroke-width=\"1\"/>'; for (let g = 1; g < 10; g++) h += '<line x1=\"' + bx + '\" y1=\"' + (20 + g * 9) + '\" x2=\"' + (bx + 9) + '\" y2=\"' + (20 + g * 9) + '\" stroke=\"#713f12\" stroke-width=\".6\"/>'; }\r\n    x = 470;\r\n    for (let k = 0; k < v[3]; k++) h += '<rect x=\"' + (x + (k % 5) * 16) + '\" y=\"' + (40 + Math.floor(k / 5) * 16) + '\" width=\"12\" height=\"12\" fill=\"' + COL[3] + '\" stroke=\"#14532d\" stroke-width=\"1\"/>';\r\n    L.cols.forEach((c, i) => { h += '<text x=\"' + [70, 240, 390, 510][i] + '\" y=\"186\" text-anchor=\"middle\" fill=\"' + COL[i] + '\" font-size=\"15\" font-weight=\"800\">' + v[i] + ' × ' + fmt(VAL[i]) + '</text>'; });\r\n    svg.innerHTML = h;\r\n  }\r\n  function draw(checkNow) {\r\n    root.querySelectorAll('td[data-i]').forEach(td => { td.textContent = v[+td.dataset.i]; });\r\n    blocks();\r\n    const n = value(), parts = v.map((d, i) => d * VAL[i]).filter(p => p > 0).map(fmt);\r\n    q(root, 'num').textContent = fmt(n);\r\n    let msg = n ? '<b>' + fmt(n) + ' = ' + (parts.join(' + ') || '0') + '</b>' : L.start;\r\n    if (target != null) msg = L.build(fmt(target)) + '<br>' + msg;\r\n    out.className = 'g4-out';\r\n    if (checkNow && target != null) { const ok = n === target; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); msg += '<br>' + (ok ? L.yes : L.notYet); }\r\n    out.innerHTML = msg;\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.a) { const [i, d] = b.dataset.a.split(':').map(Number); v[i] = Math.max(0, Math.min(9, v[i] + d)); draw(); }\r\n    else if (b.dataset.k === 'challenge') { target = rnd(1, 9) * 1000 + rnd(0, 9) * 100 + (Math.random() < .3 ? 0 : rnd(0, 9) * 10) + rnd(0, 9); v.fill(0); draw(); }\r\n    else if (b.dataset.k === 'check') draw(true);\r\n    else if (b.dataset.k === 'clear') { v.fill(0); target = null; draw(); }\r\n  });\r\n  v[0] = 4; v[1] = 3; v[2] = 7; v[3] = 1; draw();\r\n})(__rev({\"title\":\"Blokbouer\",\"how\":\"Gebruik + en − om 'n getal met blokke te bou. Of tik op Uitdaging en bou die getal wat jy kry.\",\"cols\":[\"Duisende\",\"Honderde\",\"Tiene\",\"Ene\"],\"plus\":\"Voeg een by\",\"minus\":\"Haal een weg\",\"start\":\"Voeg 'n paar blokke by om 'n getal te bou.\",\"build\":{\"__fn\":\"n => 'Bou die getal <b>' + n + '</b>.'\"},\"yes\":\"Ja! Jy het dit reg gebou.\",\"notYet\":\"Nog nie. Kyk na elke kolom.\"}), document.getElementById('s102')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>'n <strong>0</strong> hou 'n plek oop. In 3 052 is daar geen honderde nie, so ons skryf 0 in die honderde-plek.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Wat is die waarde van die syfer 3 in 4 371?",
     "options": [
      "3",
      "30",
      "300",
      "3 000"
     ],
     "answer": 2,
     "topic": "Plekwaarde"
    },
    {
     "type": "input",
     "text": "Wat is die waarde van die syfer 6 in 6 205?",
     "answer": "6000",
     "topic": "Plekwaarde"
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
     "topic": "Plekwaarde"
    },
    {
     "type": "input",
     "text": "Skryf 8 000 + 300 + 20 + 9 as een getal.",
     "answer": "8329",
     "topic": "Plekwaarde"
    },
    {
     "type": "mc",
     "text": "Watter syfer is in die <strong>tiene</strong>-plek in 7 582?",
     "options": [
      "7",
      "5",
      "8",
      "2"
     ],
     "answer": 2,
     "topic": "Plekwaarde"
    },
    {
     "type": "input",
     "text": "Hoeveel honderde maak 2 600?",
     "answer": "26",
     "topic": "Plekwaarde"
    },
    {
     "type": "mc",
     "text": "Watter een is 9 046 in uitgebreide notasie?",
     "options": [
      "9 000 + 400 + 6",
      "9 000 + 40 + 6",
      "900 + 40 + 6",
      "9 000 + 4 + 6"
     ],
     "answer": 1,
     "topic": "Plekwaarde"
    },
    {
     "type": "input",
     "text": "Maak die <strong>grootste</strong> 4-syfergetal met die syfers 3, 8, 1 en 6.",
     "answer": "8631",
     "topic": "Plekwaarde"
    }
   ]
  },
  {
   "id": 103,
   "chapter": 1,
   "name": "Getallelyne en orden",
   "fullName": "Getallelyne, vergelyk en orden van getalle",
   "lesson": {
    "heading": "Getallelyne, vergelyk en orden van getalle",
    "sub": "Hoofstuk 1 · Onderwerp 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/giraffe.webp\" srcset=\"/assets/stickers/giraffe@2x.webp 2x\" alt=\"\"><p>'n <strong>Getallelyn</strong> wys getalle in volgorde, met gelyke spasies tussen die merke. Getalle word <strong>groter</strong> as jy na regs beweeg.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Getalle vergelyk</div><p><span class=\"math\">&lt;</span> beteken <strong>is kleiner as</strong>, en <span class=\"math\">&gt;</span> beteken <strong>is groter as</strong>. Die oop kant wys na die groter getal: <span class=\"math\">4 261 &lt; 5 261</span>.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Uitgewerkte voorbeeld: orden</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Vergelyk eers die duisende, dan die honderde, dan die tiene, dan die ene.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><strong>Stygende orde</strong> (klein na groot): <span class=\"math\">4 261 &lt; 5 261 &lt; 6 261 &lt; 8 261</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><strong>Dalende orde</strong> (groot na klein): <span class=\"math\">8 484 &gt; 8 476 &gt; 8 467 &gt; 8 448</span></span></div></div><div class=\"g4-sim\" id=\"s103\"><h4>🎮 Getallelyn-pyltjies</h4><p class=\"how\">Kies 'n getallelyn. Tik dan waar die getal hoort. Kom naby genoeg om punte te kry!</p><div class=\"g4-row\" data-k=\"ranges\"></div><div class=\"g4-big\" data-k=\"target\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 150\" data-k=\"svg\" role=\"img\" aria-label=\"Getallelyn-pyltjies\" style=\"cursor:crosshair\"></svg></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"next\">Volgende</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { fmt, q, rnd, pt } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out');\r\n  const RANGES = [100, 1000, 10000];\r\n  let max = 1000, target = 0, done = false, score = 0, tries = 0;\r\n  q(root, 'ranges').innerHTML = RANGES.map(r => '<button class=\"g4-btn ghost\" data-r=\"' + r + '\">0 – ' + fmt(r) + '</button>').join('');\r\n  const X = n => 40 + n / max * 560;\r\n  function base(extra) {\r\n    let h = '<line x1=\"40\" y1=\"90\" x2=\"600\" y2=\"90\" stroke=\"#e2e8f0\" stroke-width=\"3\"/>';\r\n    for (let k = 0; k <= 10; k++) { const n = max / 10 * k, x = X(n); h += '<line x1=\"' + x + '\" y1=\"' + (k % 5 ? 80 : 74) + '\" x2=\"' + x + '\" y2=\"' + (k % 5 ? 100 : 106) + '\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>'; if (k % 5 === 0 || max <= 1000) h += '<text x=\"' + x + '\" y=\"128\" text-anchor=\"middle\" fill=\"rgba(226,232,240,.75)\" font-size=\"' + (max >= 10000 ? 13 : 15) + '\">' + fmt(n) + '</text>'; }\r\n    svg.innerHTML = h + (extra || '');\r\n  }\r\n  function next() {\r\n    root.querySelectorAll('[data-r]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.r === max));\r\n    const step = max / 100; target = rnd(1, 99) * step; if (max === 10000 && Math.random() < .5) target += rnd(1, 9) * 10;\r\n    done = false; q(root, 'target').textContent = fmt(target); out.className = 'g4-out'; out.innerHTML = L.tap(fmt(target)); base();\r\n  }\r\n  svg.addEventListener('click', e => {\r\n    if (done) return;\r\n    const p = pt(svg, e), n = Math.round(Math.max(0, Math.min(max, (p.x - 40) / 560 * max)));\r\n    const off = Math.abs(n - target) / max, good = off <= 0.03; done = true; tries++; if (good) score++;\r\n    base('<circle cx=\"' + X(n) + '\" cy=\"90\" r=\"9\" fill=\"' + (good ? '#4ade80' : '#fb7185') + '\"/><path d=\"M' + X(target) + ' 60 l-8 -14 h16 z\" fill=\"#fde047\"/><text x=\"' + X(target) + '\" y=\"38\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"18\" font-weight=\"900\">' + fmt(target) + '</text>');\r\n    out.className = 'g4-out ' + (good ? 'good' : 'bad'); out.innerHTML = (good ? L.close : L.far) + ' ' + L.score(score, tries);\r\n  });\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.r) { max = +b.dataset.r; next(); } else if (b.dataset.k === 'next') next();\r\n  });\r\n  next();\r\n})(__rev({\"title\":\"Getallelyn-pyltjies\",\"how\":\"Kies 'n getallelyn. Tik dan waar die getal hoort. Kom naby genoeg om punte te kry!\",\"tap\":{\"__fn\":\"n => 'Tik waar <b>' + n + '</b> op die lyn hoort.'\"},\"close\":\"Mooi gemik! Baie naby.\",\"far\":\"Nie heeltemal nie. Die geel pyltjie wys waar dit hoort.\",\"score\":{\"__fn\":\"(a, b) => 'Telling: ' + a + ' uit ' + b + '.'\"}}), document.getElementById('s103')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Werk op 'n getallelyn eers uit <strong>hoeveel elke klein stap werd is</strong>. Van 0 tot 1 000 met 10 stappe is elke stap 100.</span></div>"
   },
   "questions": [
    {
     "type": "mc",
     "text": "Watter teken maak dit waar? 4 261 ___ 5 261",
     "options": [
      "&lt;",
      "&gt;",
      "="
     ],
     "answer": 0,
     "topic": "Getallelyne en orden"
    },
    {
     "type": "mc",
     "text": "Watter getal is die <strong>grootste</strong>?",
     "options": [
      "8 484",
      "8 476",
      "8 467",
      "8 448"
     ],
     "answer": 0,
     "topic": "Getallelyne en orden"
    },
    {
     "type": "mc",
     "text": "Watter lys is in <strong>stygende</strong> orde (klein na groot)?",
     "options": [
      "3 102; 3 021; 3 201",
      "3 021; 3 102; 3 201",
      "3 201; 3 102; 3 021",
      "3 102; 3 201; 3 021"
     ],
     "answer": 1,
     "topic": "Getallelyne en orden"
    },
    {
     "type": "input",
     "text": "Watter getal is presies halfpad tussen 3 000 en 4 000?",
     "answer": "3500",
     "topic": "Getallelyne en orden"
    },
    {
     "type": "mc",
     "text": "Watter teken maak dit waar? 6 090 ___ 6 909",
     "options": [
      "&lt;",
      "&gt;",
      "="
     ],
     "answer": 0,
     "topic": "Getallelyne en orden"
    },
    {
     "type": "input",
     "text": "'n Getallelyn gaan van 0 tot 1 000 met 'n merk elke 100. Watter getal is by die 7de merk na 0?",
     "answer": "700",
     "topic": "Getallelyne en orden"
    },
    {
     "type": "mc",
     "text": "Watter getal is die <strong>kleinste</strong>?",
     "options": [
      "2 019",
      "2 109",
      "2 091",
      "2 190"
     ],
     "answer": 0,
     "topic": "Getallelyne en orden"
    },
    {
     "type": "input",
     "text": "Watter getal is 10 meer as 4 995?",
     "answer": "5005",
     "topic": "Getallelyne en orden"
    }
   ]
  },
  {
   "id": 104,
   "chapter": 1,
   "name": "Afronding",
   "fullName": "Afronding tot die naaste 10, 100 of 1 000",
   "lesson": {
    "heading": "Afronding tot die naaste 10, 100 of 1 000",
    "sub": "Hoofstuk 1 · Onderwerp 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/tortoise.webp\" srcset=\"/assets/stickers/tortoise@2x.webp 2x\" alt=\"\"><p>As ons <strong>afrond</strong>, kies ons die naaste \"maklike\" getal. Afgeronde getalle help ons om vinnig te <strong>skat</strong>. Die teken <span class=\"math\">≈</span> beteken <strong>is omtrent</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Die reël</div><p>Kyk na die syfer <strong>regs</strong> van die plek waarnatoe jy afrond. As dit <strong>5 of meer</strong> is, rond <strong>op</strong> af. As dit <strong>4 of minder</strong> is, rond <strong>af</strong> af.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Uitgewerkte voorbeeld: 2 176</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Tot die naaste 10: kyk na die ene (6). 6 is 5 of meer, so rond op af: <span class=\"math\">2 176 ≈ 2 180</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Tot die naaste 100: kyk na die tiene (7). Rond op af: <span class=\"math\">2 176 ≈ 2 200</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Tot die naaste 1 000: kyk na die honderde (1). Rond af af: <span class=\"math\">2 176 ≈ 2 000</span></span></div></div><div class=\"g4-sim\" id=\"s104\"><h4>🎮 Rol na die Naaste</h4><p class=\"how\">Tik 'n getal (of tik op Lukraak) en kies waarnatoe om af te rond. Die pyltjie wys na watter getal dit nader is.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"n\" value=\"2176\" inputmode=\"numeric\" aria-label=\"number\"><button class=\"g4-btn ghost\" data-k=\"rand\">Lukraak</button></div><div class=\"g4-row\" data-k=\"places\"></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 170\" data-k=\"svg\" role=\"img\" aria-label=\"Rol na die Naaste\"></svg></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { fmt, q, rnd } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), inp = q(root, 'n');\r\n  let place = 100;\r\n  q(root, 'places').innerHTML = [10, 100, 1000].map(p => '<button class=\"g4-btn ghost\" data-p=\"' + p + '\">' + L.nearest(fmt(p)) + '</button>').join('');\r\n  function draw() {\r\n    root.querySelectorAll('[data-p]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.p === place));\r\n    let n = window.G4.num(inp.value); if (n == null) n = 0; n = Math.max(0, Math.min(9999, n));\r\n    const lo = Math.floor(n / place) * place, hi = lo + place, mid = lo + place / 2, r = n - lo >= place / 2 ? hi : lo;\r\n    const X = m => 60 + (m - lo) / place * 520;\r\n    let h = '<line x1=\"60\" y1=\"100\" x2=\"580\" y2=\"100\" stroke=\"#e2e8f0\" stroke-width=\"3\"/>';\r\n    [[lo, 1], [mid, 0], [hi, 1]].forEach(([m, big]) => { h += '<line x1=\"' + X(m) + '\" y1=\"' + (big ? 86 : 92) + '\" x2=\"' + X(m) + '\" y2=\"' + (big ? 114 : 108) + '\" stroke=\"' + (big ? '#e2e8f0' : 'rgba(226,232,240,.5)') + '\" stroke-width=\"3\"/><text x=\"' + X(m) + '\" y=\"140\" text-anchor=\"middle\" fill=\"' + (big ? '#fff' : 'rgba(226,232,240,.55)') + '\" font-size=\"' + (big ? 20 : 15) + '\" font-weight=\"800\">' + fmt(m) + '</text>'; });\r\n    h += '<text x=\"' + X(mid) + '\" y=\"160\" text-anchor=\"middle\" fill=\"rgba(226,232,240,.5)\" font-size=\"12\">' + L.halfway + '</text>';\r\n    h += '<circle cx=\"' + X(n) + '\" cy=\"100\" r=\"10\" fill=\"#fde047\"/><text x=\"' + X(n) + '\" y=\"70\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"20\" font-weight=\"900\">' + fmt(n) + '</text>';\r\n    h += '<path d=\"M' + X(n) + ' 46 Q' + ((X(n) + X(r)) / 2) + ' 14 ' + X(r) + ' 80\" fill=\"none\" stroke=\"#9ed43c\" stroke-width=\"3\" marker-end=\"url(#g4arr)\"/>';\r\n    svg.innerHTML = '<defs><marker id=\"g4arr\" markerWidth=\"8\" markerHeight=\"8\" refX=\"4\" refY=\"4\" orient=\"auto\"><path d=\"M0 0 L8 4 L0 8 z\" fill=\"#9ed43c\"/></marker></defs>' + h;\r\n    out.innerHTML = L.explain(fmt(n), fmt(lo), fmt(hi), fmt(r), n - lo === place / 2) + '<br><b>' + fmt(n) + ' ≈ ' + fmt(r) + '</b>';\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const b = e.target.closest('button'); if (!b) return;\r\n    if (b.dataset.p) { place = +b.dataset.p; draw(); } else if (b.dataset.k === 'rand') { inp.value = rnd(1, 9999); draw(); }\r\n  });\r\n  inp.addEventListener('input', draw);\r\n  draw();\r\n})(__rev({\"title\":\"Rol na die Naaste\",\"how\":\"Tik 'n getal (of tik op Lukraak) en kies waarnatoe om af te rond. Die pyltjie wys na watter getal dit nader is.\",\"nearest\":{\"__fn\":\"p => 'Naaste ' + p\"},\"halfway\":\"halfpad\",\"explain\":{\"__fn\":\"(n, lo, hi, r, half) => n + ' is tussen ' + lo + ' en ' + hi + '. ' + (half ? 'Dit is presies halfpad, so ons rond <b>op</b> af na ' + r + '.' : 'Dit is nader aan ' + r + '.')\"}}), document.getElementById('s104')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Afronding is wonderlik om antwoorde te toets. 397 + 504 is omtrent 400 + 500 = 900, so 'n antwoord van 1 901 moet verkeerd wees!</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Rond 2 176 af tot die naaste 10.",
     "answer": "2180",
     "topic": "Afronding"
    },
    {
     "type": "input",
     "text": "Rond 2 176 af tot die naaste 100.",
     "answer": "2200",
     "topic": "Afronding"
    },
    {
     "type": "input",
     "text": "Rond 2 176 af tot die naaste 1 000.",
     "answer": "2000",
     "topic": "Afronding"
    },
    {
     "type": "mc",
     "text": "Rond 3 450 af tot die naaste 100.",
     "options": [
      "3 400",
      "3 500",
      "3 000",
      "3 450"
     ],
     "answer": 1,
     "topic": "Afronding"
    },
    {
     "type": "input",
     "text": "Rond 6 997 af tot die naaste 10.",
     "answer": "7000",
     "topic": "Afronding"
    },
    {
     "type": "mc",
     "text": "Watter getal rond af na 500 (naaste 100)?",
     "options": [
      "449",
      "551",
      "470",
      "560"
     ],
     "answer": 2,
     "topic": "Afronding"
    },
    {
     "type": "input",
     "text": "Rond 8 501 af tot die naaste 1 000.",
     "answer": "9000",
     "topic": "Afronding"
    },
    {
     "type": "mc",
     "text": "Skat 397 + 504 deur elke getal tot die naaste 100 af te rond.",
     "options": [
      "800",
      "900",
      "1 000",
      "700"
     ],
     "answer": 1,
     "topic": "Afronding"
    }
   ]
  },
  {
   "id": 105,
   "chapter": 1,
   "name": "Heelgetalle optel",
   "fullName": "Heelgetalle met tot 4 syfers optel",
   "lesson": {
    "heading": "Heelgetalle met tot 4 syfers optel",
    "sub": "Hoofstuk 1 · Onderwerp 5",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/apple.webp\" srcset=\"/assets/stickers/apple@2x.webp 2x\" alt=\"\"><p>Ons kan getalle in <strong>enige volgorde</strong> optel: <span class=\"math\">26 + 19 = 19 + 26</span>. Daar is baie maniere om op te tel. Kies die een wat die som die maklikste maak!</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Manier 1: breek die getalle op</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">4 362 + 2 486</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>= 4 000 + 2 000 + 300 + 400 + 60 + 80 + 2 + 6</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>= 6 000 + 700 + 140 + 8</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>= <strong>6 848</strong></span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Manier 2: tel aan in spronge</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">4 362 + 2 000 = 6 362</span></span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">6 362 + 400 = 6 762</span></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><span class=\"math\">6 762 + 80 = 6 842</span></span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span><span class=\"math\">6 842 + 6 = 6 848</span></span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Manier 3: maak die tiene vol</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><span class=\"math\">96 + 48</span>: neem 4 van 48 om 96 vol te maak tot 100.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><span class=\"math\">100 + 44 = 144</span></span></div></div><div class=\"g4-sim\" id=\"s105\"><h4>🎮 Breek-dit-op-optelmasjien</h4><p class=\"how\">Werk die som eers op papier uit en tik jou antwoord. Tik dan op Volgende stap om dit opgebreek te sien, of Kolommetode om dit onder mekaar te sit.</p><div class=\"g4-big\" data-k=\"sum\"></div><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Toets</button></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"next\">Volgende stap</button><button class=\"g4-btn ghost\" data-k=\"colbtn\">Kolommetode</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><ul class=\"g4-steps\" data-k=\"steps\"></ul><div class=\"g4-col\" data-k=\"col\"></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { fmt, q, rnd } = window.G4;\r\n  const out = q(root, 'out'), list = q(root, 'steps'), col = q(root, 'col');\r\n  let a, b, shown, column = false;\r\n  const split = n => [Math.floor(n / 1000) * 1000, Math.floor(n % 1000 / 100) * 100, Math.floor(n % 100 / 10) * 10, n % 10];\r\n  function steps() {\r\n    const A = split(a), B = split(b), S = A.map((x, i) => x + B[i]);\r\n    return [\r\n      fmt(a) + ' = ' + A.filter(Boolean).map(fmt).join(' + '),\r\n      fmt(b) + ' = ' + B.filter(Boolean).map(fmt).join(' + '),\r\n      L.parts.map((p, i) => p + ': ' + fmt(A[i]) + ' + ' + fmt(B[i]) + ' = <b>' + fmt(S[i]) + '</b>').join('<br>'),\r\n      fmt(S[0]) + ' + ' + fmt(S[1]) + ' + ' + fmt(S[2]) + ' + ' + fmt(S[3]) + ' = <b>' + fmt(a + b) + '</b>'\r\n    ];\r\n  }\r\n  function columnText() {\r\n    const da = String(a).padStart(4, ' '), db = String(b).padStart(4, ' '), s = String(a + b).padStart(5, ' ');\r\n    let carry = '', c = 0; const ca = [];\r\n    for (let i = 3; i >= 0; i--) { const t = (+da[i] || 0) + (+db[i] || 0) + c; c = t >= 10 ? 1 : 0; ca[i - 1] = c ? '1' : ' '; }\r\n    carry = ' ' + [0, 1, 2].map(i => ca[i] || ' ').join('') + ' ';\r\n    return '<span class=\"carry\">' + carry + '</span>\\n ' + da + '\\n+' + db + '\\n─────\\n' + s;\r\n  }\r\n  function draw() {\r\n    q(root, 'sum').textContent = fmt(a) + ' + ' + fmt(b) + ' = ?';\r\n    const st = steps();\r\n    list.innerHTML = st.slice(0, shown).map(s => '<li>' + s + '</li>').join('');\r\n    q(root, 'next').disabled = shown >= st.length;\r\n    col.style.display = column ? '' : 'none'; col.innerHTML = columnText();\r\n    q(root, 'colbtn').setAttribute('aria-pressed', column);\r\n  }\r\n  function fresh() { a = rnd(1000, 4999); b = rnd(1000, 4999); shown = 0; out.className = 'g4-out'; out.innerHTML = L.tryFirst; q(root, 'ans').value = ''; draw(); }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'next') { shown++; draw(); }\r\n    else if (t.dataset.k === 'colbtn') { column = !column; draw(); }\r\n    else if (t.dataset.k === 'new') fresh();\r\n    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'ans').value), ok = v === a + b; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right(fmt(a + b)) : L.wrong; }\r\n  });\r\n  fresh(); a = 4362; b = 2486; draw();\r\n})(__rev({\"title\":\"Breek-dit-op-optelmasjien\",\"how\":\"Werk die som eers op papier uit en tik jou antwoord. Tik dan op Volgende stap om dit opgebreek te sien, of Kolommetode om dit onder mekaar te sit.\",\"parts\":[\"Duisende\",\"Honderde\",\"Tiene\",\"Ene\"],\"tryFirst\":\"Probeer dit eers self en toets dan.\",\"right\":{\"__fn\":\"s => 'Reg! Die antwoord is ' + s + '.'\"},\"wrong\":\"Nog nie. Tik op Volgende stap om te sien hoe.\"}), document.getElementById('s105')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Die <strong>kolommetode</strong> sit die ene, tiene, honderde en duisende onder mekaar. Begin by die <strong>ene</strong> en dra 1 oor as 'n kolom 10 of meer is.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "4 362 + 2 486 = ?",
     "answer": "6848",
     "topic": "Heelgetalle optel"
    },
    {
     "type": "input",
     "text": "96 + 48 = ?",
     "answer": "144",
     "topic": "Heelgetalle optel"
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
     "topic": "Heelgetalle optel"
    },
    {
     "type": "input",
     "text": "3 205 + 1 470 = ?",
     "answer": "4675",
     "topic": "Heelgetalle optel"
    },
    {
     "type": "input",
     "text": "2 748 + 1 563 = ?",
     "answer": "4311",
     "topic": "Heelgetalle optel"
    },
    {
     "type": "input",
     "text": "5 000 + 400 + 80 + 3 + 1 000 + 200 + 10 + 4 = ?",
     "answer": "6697",
     "topic": "Heelgetalle optel"
    },
    {
     "type": "mc",
     "text": "Wat is die beste skatting vir 2 987 + 3 021?",
     "options": [
      "5 000",
      "6 000",
      "7 000",
      "600"
     ],
     "answer": 1,
     "topic": "Heelgetalle optel"
    },
    {
     "type": "input",
     "text": "1 999 + 2 001 = ?",
     "answer": "4000",
     "topic": "Heelgetalle optel"
    }
   ]
  },
  {
   "id": 106,
   "chapter": 1,
   "name": "Heelgetalle aftrek",
   "fullName": "Heelgetalle aftrek en toets met optelling",
   "lesson": {
    "heading": "Heelgetalle aftrek en toets met optelling",
    "sub": "Hoofstuk 1 · Onderwerp 6",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/banana.webp\" srcset=\"/assets/stickers/banana@2x.webp 2x\" alt=\"\"><p>As ons <strong>aftrek</strong>, maak die volgorde saak: <span class=\"math\">78 − 20</span> is nie dieselfde as <span class=\"math\">20 − 78</span> nie. Aftrek <strong>maak optel ongedaan</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Die omgekeerde verband</div><p>As <span class=\"math\">19 + 8 = 27</span>, dan is <span class=\"math\">27 − 19 = 8</span> en <span class=\"math\">27 − 8 = 19</span>. Ons kan elke aftreksom toets deur op te tel.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Uitgewerkte voorbeeld: 4 687 − 2 143</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Breek dit op: (4 000 − 2 000) + (600 − 100) + (80 − 40) + (7 − 3)</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>= 2 000 + 500 + 40 + 4 = <strong>2 544</strong></span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Of spring terug: 4 687 − 2 000 = 2 687 → − 100 = 2 587 → − 40 = 2 547 → − 3 = 2 544</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>Toets: <span class=\"math\">2 544 + 2 143 = 4 687</span> ✓</span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ As jy 'n tien moet opbreek: 3 261 − 1 846</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Ene: 1 − 6 werk nie, so breek 'n tien op: 11 − 6 = 5</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Tiene: 5 − 4 = 1</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Honderde: 2 − 8 werk nie, so breek 'n duisend op: 12 − 8 = 4</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span>Duisende: 2 − 1 = 1, so die antwoord is <strong>1 415</strong></span></div></div><div class=\"g4-sim\" id=\"s106\"><h4>🎮 Feitefamilie-driehoek</h4><p class=\"how\">Verander die twee onderste getalle en kyk hoe die hele familie feite verander. Tik op Toets my om 'n ontbrekende antwoord in te vul.</p><div class=\"g4-row\"><input class=\"g4-input\" data-k=\"a\" value=\"19\" inputmode=\"numeric\" aria-label=\"first number\"><span style=\"font-size:22px\">+</span><input class=\"g4-input\" data-k=\"b\" value=\"8\" inputmode=\"numeric\" aria-label=\"second number\"><button class=\"g4-btn ghost\" data-k=\"quiz\">Toets my</button></div><div class=\"g4-stage\"><svg viewBox=\"0 0 640 200\" data-k=\"svg\" role=\"img\" aria-label=\"Feitefamilie-driehoek\"></svg></div><ul class=\"g4-steps\" data-k=\"facts\"></ul><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { fmt, q, rnd } = window.G4;\r\n  const svg = q(root, 'svg'), out = q(root, 'out'), list = q(root, 'facts'), ai = q(root, 'a'), bi = q(root, 'b');\r\n  let hide = -1;\r\n  function draw() {\r\n    const a = Math.max(0, window.G4.num(ai.value) || 0), b = Math.max(0, window.G4.num(bi.value) || 0), c = a + b;\r\n    svg.innerHTML = '<path d=\"M320 20 L180 180 L460 180 Z\" fill=\"rgba(158,212,60,.08)\" stroke=\"#9ed43c\" stroke-width=\"3\"/>' +\r\n      '<circle cx=\"320\" cy=\"58\" r=\"34\" fill=\"#0d1016\" stroke=\"#fde047\" stroke-width=\"3\"/><text x=\"320\" y=\"65\" text-anchor=\"middle\" fill=\"#fde047\" font-size=\"22\" font-weight=\"900\">' + fmt(c) + '</text>' +\r\n      '<circle cx=\"225\" cy=\"150\" r=\"34\" fill=\"#0d1016\" stroke=\"#60a5fa\" stroke-width=\"3\"/><text x=\"225\" y=\"157\" text-anchor=\"middle\" fill=\"#93c5fd\" font-size=\"22\" font-weight=\"900\">' + fmt(a) + '</text>' +\r\n      '<circle cx=\"415\" cy=\"150\" r=\"34\" fill=\"#0d1016\" stroke=\"#f472b6\" stroke-width=\"3\"/><text x=\"415\" y=\"157\" text-anchor=\"middle\" fill=\"#f9a8d4\" font-size=\"22\" font-weight=\"900\">' + fmt(b) + '</text>';\r\n    const F = [[a, '+', b, c], [b, '+', a, c], [c, '−', a, b], [c, '−', b, a]];\r\n    list.innerHTML = F.map((f, i) => '<li>' + (i === hide ? f.slice(0, 3).map(x => typeof x === 'number' ? fmt(x) : x).join(' ') + ' = <input class=\"g4-input\" data-k=\"blank\" inputmode=\"numeric\" style=\"width:110px\"> <button class=\"g4-btn\" data-k=\"check\">' + L.check + '</button>' : '<b>' + fmt(f[0]) + ' ' + f[1] + ' ' + fmt(f[2]) + ' = ' + fmt(f[3]) + '</b>') + '</li>').join('');\r\n    return F;\r\n  }\r\n  let F = draw();\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return;\r\n    if (t.dataset.k === 'quiz') { const a = rnd(100, 2999), b = rnd(100, 2999); ai.value = a; bi.value = b; hide = rnd(2, 3); F = draw(); out.className = 'g4-out'; out.innerHTML = L.fill; }\r\n    else if (t.dataset.k === 'check') { const v = window.G4.num(q(root, 'blank').value), ok = v === F[hide][3]; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = ok ? L.right : L.wrong(fmt(F[hide][0]), F[hide][1], fmt(F[hide][2])); }\r\n  });\r\n  [ai, bi].forEach(el => el.addEventListener('input', () => { hide = -1; F = draw(); out.className = 'g4-out'; out.innerHTML = L.explain; }));\r\n  out.innerHTML = L.explain;\r\n})(__rev({\"title\":\"Feitefamilie-driehoek\",\"how\":\"Verander die twee onderste getalle en kyk hoe die hele familie feite verander. Tik op Toets my om 'n ontbrekende antwoord in te vul.\",\"check\":\"Toets\",\"explain\":\"Optel en aftrek maak mekaar ongedaan. As jy een feit ken, ken jy al vier!\",\"fill\":\"Vul die ontbrekende getal in.\",\"right\":\"Reg! Aftrek maak optel ongedaan.\",\"wrong\":{\"__fn\":\"(a, op, b) => 'Nog nie. Werk ' + a + ' ' + op + ' ' + b + ' weer uit.'\"}}), document.getElementById('s106')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Jy kan ook agtertoe tel: 624 − 36 is 624 vier keer terug in 9'e: 615; 606; 597; 588.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "4 687 − 2 143 = ?",
     "answer": "2544",
     "topic": "Heelgetalle aftrek"
    },
    {
     "type": "input",
     "text": "3 261 − 1 846 = ?",
     "answer": "1415",
     "topic": "Heelgetalle aftrek"
    },
    {
     "type": "mc",
     "text": "As 19 + 8 = 27, watter een hiervan is ook waar?",
     "options": [
      "27 − 19 = 8",
      "19 − 8 = 27",
      "8 − 27 = 19",
      "27 + 8 = 19"
     ],
     "answer": 0,
     "topic": "Heelgetalle aftrek"
    },
    {
     "type": "input",
     "text": "1 000 − 368 = ?",
     "answer": "632",
     "topic": "Heelgetalle aftrek"
    },
    {
     "type": "mc",
     "text": "Waar of onwaar? 78 − 20 = 20 − 78",
     "options": [
      "Waar",
      "Onwaar"
     ],
     "answer": 1,
     "topic": "Heelgetalle aftrek"
    },
    {
     "type": "input",
     "text": "5 004 − 2 996 = ?",
     "answer": "2008",
     "topic": "Heelgetalle aftrek"
    },
    {
     "type": "input",
     "text": "___ + 237 = 1 396. Wat is die ontbrekende getal?",
     "answer": "1159",
     "topic": "Heelgetalle aftrek"
    },
    {
     "type": "input",
     "text": "Tel vier keer agtertoe van 624 af in 9'e. Waar beland jy?",
     "answer": "588",
     "topic": "Heelgetalle aftrek"
    }
   ]
  },
  {
   "id": 107,
   "chapter": 1,
   "name": "Probleemoplossing",
   "fullName": "Optel- en aftrekprobleme oplos",
   "lesson": {
    "heading": "Optel- en aftrekprobleme oplos",
    "sub": "Hoofstuk 1 · Onderwerp 7",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/elephant.webp\" srcset=\"/assets/stickers/elephant@2x.webp 2x\" alt=\"\"><p>Woordprobleme vertel 'n storie. <strong>Sleutelwoorde</strong> help ons besluit of ons optel of aftrek.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Sleutelwoorde</div><p><strong>Tel op (+):</strong> altesaam, totaal, som, meer as, in alles.<br><strong>Trek af (−):</strong> verskil, oor, minder as, hoeveel meer, neem weg.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Stappe om 'n probleem op te los</div><div class=\"example-step\"><span class=\"step-num\">1</span><span><strong>Lees</strong> die probleem twee keer.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span><strong>Besluit</strong>: tel ons op of trek ons af?</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span><strong>Skat</strong> die antwoord deur af te rond.</span></div><div class=\"example-step\"><span class=\"step-num\">4</span><span><strong>Bereken</strong> en skryf die antwoord met sy eenheid (R, kg, skape…).</span></div><div class=\"example-step\"><span class=\"step-num\">5</span><span><strong>Toets</strong>: is die antwoord naby aan jou skatting?</span></div></div><div class=\"g4-sim\" id=\"s107\"><h4>🎮 Plus of minus?</h4><p class=\"how\">Lees die probleem. Tel ons op of trek ons af? Kies, en werk dan die antwoord uit.</p><div class=\"score-pill\" data-k=\"count\" style=\"display:inline-block;margin-bottom:8px\"></div><div class=\"g4-hero\" data-k=\"card\"></div><div class=\"g4-row\" data-k=\"ops\"><button class=\"g4-btn\" data-op=\"+\" style=\"font-size:24px;min-width:70px\">+</button><button class=\"g4-btn\" data-op=\"-\" style=\"font-size:24px;min-width:70px\">−</button></div><div class=\"g4-row\" data-k=\"ansrow\" style=\"display:none\"><input class=\"g4-input\" data-k=\"ans\" inputmode=\"numeric\" aria-label=\"answer\"><button class=\"g4-btn\" data-k=\"check\">Toets</button></div><div class=\"g4-row\"><button class=\"g4-btn ghost\" data-k=\"next\">Volgende</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = window.G4 || {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }\n};\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\r\n  const { fmt, q } = window.G4;\r\n  const out = q(root, 'out'), card = q(root, 'card'), ansRow = q(root, 'ansrow');\r\n  let i = 0, score = 0;\r\n  function show() {\r\n    const p = L.problems[i];\r\n    card.innerHTML = window.G4.stk(p.s) + '<p>' + p.t + '</p>';\r\n    q(root, 'count').textContent = L.of(i + 1, L.problems.length);\r\n    ansRow.style.display = 'none'; q(root, 'ops').style.display = ''; out.className = 'g4-out'; out.innerHTML = L.which; q(root, 'ans').value = '';\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target.closest('button'); if (!t) return; const p = L.problems[i];\r\n    if (t.dataset.op) {\r\n      const ok = t.dataset.op === p.op; out.className = 'g4-out ' + (ok ? 'good' : 'bad');\r\n      out.innerHTML = (ok ? L.opRight : L.opWrong) + ' ' + L.why(p.why);\r\n      q(root, 'ops').style.display = 'none'; ansRow.style.display = '';\r\n    } else if (t.dataset.k === 'check') {\r\n      const v = window.G4.num(String(q(root, 'ans').value).replace(/^r/i, '')), ok = v === p.a; if (ok) score++;\r\n      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.solved : L.notQuite) + ' ' + p.w;\r\n    } else if (t.dataset.k === 'next') { i = (i + 1) % L.problems.length; show(); }\r\n  });\r\n  show();\r\n})(__rev({\"title\":\"Plus of minus?\",\"how\":\"Lees die probleem. Tel ons op of trek ons af? Kies, en werk dan die antwoord uit.\",\"problems\":[{\"t\":\"Nosipho het R18 meer as Helen. Helen het R60. Hoeveel geld het Nosipho?\",\"op\":\"+\",\"a\":78,\"why\":\"<b>meer as</b>\",\"w\":\"60 + 18 = R78\",\"s\":\"child\"},{\"t\":\"'n Boer het 1 108 skape gehad. Hy het 359 verkoop. Hoeveel skape is oor?\",\"op\":\"-\",\"a\":749,\"why\":\"<b>verkoop</b> en <b>oor</b>\",\"w\":\"1 108 − 359 = 749 skape\",\"s\":\"sheep\"},{\"t\":\"'n Skool het 1 245 meisies en 1 187 seuns. Hoeveel leerders is daar <b>altesaam</b>?\",\"op\":\"+\",\"a\":2432,\"why\":\"<b>altesaam</b>\",\"w\":\"1 245 + 1 187 = 2 432 leerders\",\"s\":\"child\"},{\"t\":\"'n Boek het 312 bladsye. Thabo het 175 bladsye gelees. Hoeveel bladsye moet hy nog lees?\",\"op\":\"-\",\"a\":137,\"why\":\"<b>nog</b> (wat oorbly)\",\"w\":\"312 − 175 = 137 bladsye\",\"s\":\"paper\"},{\"t\":\"'n Bakkery het 2 450 brode op Maandag en 1 875 op Dinsdag verkoop. Wat is die <b>totaal</b>?\",\"op\":\"+\",\"a\":4325,\"why\":\"<b>totaal</b>\",\"w\":\"2 450 + 1 875 = 4 325 brode\",\"s\":\"bread-loaf\"},{\"t\":\"'n Olifant weeg 4 800 kg en 'n seekoei weeg 1 500 kg. Wat is die <b>verskil</b> in massa?\",\"op\":\"-\",\"a\":3300,\"why\":\"<b>verskil</b>\",\"w\":\"4 800 − 1 500 = 3 300 kg\",\"s\":\"elephant\"}],\"of\":{\"__fn\":\"(a, b) => 'Probleem ' + a + ' van ' + b\"},\"which\":\"Tel ons op (+) of trek ons af (−)?\",\"opRight\":\"Ja!\",\"opWrong\":\"Dink weer.\",\"why\":{\"__fn\":\"w => 'Die leidraad is ' + w + '. Werk nou die antwoord uit.'\"},\"solved\":\"Reg!\",\"notQuite\":\"Nog nie.\"}), document.getElementById('s107')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Party probleme het twee stappe nodig. 'n Boer het 359 van sy 1 108 skape verkoop en toe 560 gekoop: eers 1 108 − 359 = 749, dan 749 + 560 = 1 309.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Helen het R60. Nosipho het R18 meer as Helen. Hoeveel geld het hulle <strong>altesaam</strong>? (Rand)",
     "answer": "138",
     "topic": "Probleemoplossing"
    },
    {
     "type": "input",
     "text": "'n Boer het 1 108 skape gehad. Hy het 359 verkoop en toe 560 gekoop. Hoeveel skape het hy nou?",
     "answer": "1309",
     "topic": "Probleemoplossing"
    },
    {
     "type": "input",
     "text": "As 237 by 'n getal getel word, is die antwoord 1 396. Wat is die getal?",
     "answer": "1159",
     "topic": "Probleemoplossing"
    },
    {
     "type": "mc",
     "text": "Watter woord sê vir jou om <strong>af te trek</strong>?",
     "options": [
      "altesaam",
      "totaal",
      "verskil",
      "som"
     ],
     "answer": 2,
     "topic": "Probleemoplossing"
    },
    {
     "type": "input",
     "text": "Op Maandag het 2 345 mense 'n taxistaanplek gebruik. Op Dinsdag het 2 870 mense dit gebruik. Hoeveel <strong>meer</strong> mense het dit op Dinsdag gebruik?",
     "answer": "525",
     "topic": "Probleemoplossing"
    },
    {
     "type": "input",
     "text": "Lerato het R1 250 in Januarie en R875 in Februarie gespaar. Hoeveel het sy in totaal gespaar? (Rand)",
     "answer": "2125",
     "topic": "Probleemoplossing"
    },
    {
     "type": "mc",
     "text": "Wat is die beste skatting vir 4 980 − 2 010?",
     "options": [
      "2 000",
      "3 000",
      "7 000",
      "300"
     ],
     "answer": 1,
     "topic": "Probleemoplossing"
    },
    {
     "type": "input",
     "text": "'n Skool het R3 400 ingesamel. Dit het R5 000 nodig vir nuwe boeke. Hoeveel meer het dit nodig? (Rand)",
     "answer": "1600",
     "topic": "Probleemoplossing"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 1,
  "chapterName": "Heelgetalle",
  "topics": [
   {
    "name": "Tel in intervalle",
    "questions": [
     {
      "num": "1",
      "text": "Skryf die volgende drie getalle in elke patroon:",
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
    "name": "Plekwaarde",
    "questions": [
     {
      "num": "2",
      "text": "Skryf die waarde van die onderstreepte syfer neer:",
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
      "text": "Skryf elke getal in uitgebreide notasie:",
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
    "name": "Getallelyne en orden",
    "questions": [
     {
      "num": "4",
      "text": "Skryf die getalle in stygende orde (klein na groot):",
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
      "text": "Vul &lt; of &gt; in:",
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
    "name": "Afronding",
    "questions": [
     {
      "num": "6",
      "text": "Rond 4 628 af:",
      "parts": [
       {
        "label": "a)",
        "text": "tot die naaste 10",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "tot die naaste 100",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "tot die naaste 1 000",
        "marks": 1
       }
      ]
     },
     {
      "num": "7",
      "text": "Skat deur tot die naaste 100 af te rond, en bereken dan die presiese antwoord:",
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
    "name": "Heelgetalle optel",
    "questions": [
     {
      "num": "8",
      "text": "Bereken. Wys jou metode.",
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
    "name": "Heelgetalle aftrek",
    "questions": [
     {
      "num": "9",
      "text": "Bereken. Toets elke antwoord deur op te tel.",
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
      "text": "Skryf die feitefamilie vir 312 + 145 = 457.",
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
    "name": "Probleemoplossing",
    "questions": [
     {
      "num": "11",
      "text": "Los elke probleem op. Skryf 'n getallesin en die antwoord.",
      "parts": [
       {
        "label": "a)",
        "text": "'n Winkel het 2 450 appels gehad. Dit het 1 375 verkoop. Hoeveel is oor?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Sipho het 1 250 m skool toe geloop en 1 480 m langs 'n ander pad huis toe. Hoe ver het hy altesaam geloop?",
        "marks": 2
       },
       {
        "label": "c)",
        "text": "'n Vragmotor kan 5 000 kg dra. Daar is reeds 3 275 kg op. Hoeveel meer kilogram kan dit dra?",
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
  "chapterName": "Hoofstuk 1 — Heelgetalle",
  "topics": [
   {
    "name": "Tel in intervalle",
    "answers": [
     {
      "num": "Q1a",
      "ans": "179; 181; 183",
      "note": "Tel in 2'e"
     },
     {
      "num": "Q1b",
      "ans": "525; 550; 575",
      "note": "Tel in 25'e"
     },
     {
      "num": "Q1c",
      "ans": "1 599; 1 699; 1 799",
      "note": "Tel in 100'e"
     },
     {
      "num": "Q1d",
      "ans": "597; 588; 579",
      "note": "Tel agtertoe in 9'e"
     }
    ]
   },
   {
    "name": "Plekwaarde",
    "answers": [
     {
      "num": "Q2a",
      "ans": "400",
      "note": "Honderde-plek"
     },
     {
      "num": "Q2b",
      "ans": "7 000",
      "note": "Duisende-plek"
     },
     {
      "num": "Q2c",
      "ans": "8",
      "note": "Ene-plek"
     },
     {
      "num": "Q3a",
      "ans": "5 000 + 200 + 70 + 4",
      "note": ""
     },
     {
      "num": "Q3b",
      "ans": "8 000 + 9",
      "note": "Geen honderde of tiene nie"
     },
     {
      "num": "Q3c",
      "ans": "6 000 + 400 + 30",
      "note": "Geen ene nie"
     }
    ]
   },
   {
    "name": "Getallelyne en orden",
    "answers": [
     {
      "num": "Q4",
      "ans": "6 124; 6 142; 6 412; 6 421",
      "note": "Vergelyk honderde, dan tiene"
     },
     {
      "num": "Q5a",
      "ans": "&gt;",
      "note": "7 tiene is meer as 0 tiene"
     },
     {
      "num": "Q5b",
      "ans": "&lt;",
      "note": "0 honderde is minder as 9 honderde"
     }
    ]
   },
   {
    "name": "Afronding",
    "answers": [
     {
      "num": "Q6a",
      "ans": "4 630",
      "note": "Ene 8 → rond op af"
     },
     {
      "num": "Q6b",
      "ans": "4 600",
      "note": "Tiene 2 → rond af af"
     },
     {
      "num": "Q6c",
      "ans": "5 000",
      "note": "Honderde 6 → rond op af"
     },
     {
      "num": "Q7",
      "ans": "Estimate 600 + 300 = 900; exact 901",
      "note": ""
     }
    ]
   },
   {
    "name": "Heelgetalle optel",
    "answers": [
     {
      "num": "Q8a",
      "ans": "5 389",
      "note": "5 000 + 300 + 80 + 9"
     },
     {
      "num": "Q8b",
      "ans": "6 523",
      "note": "Dra oor by ene, tiene en honderde"
     },
     {
      "num": "Q8c",
      "ans": "4 455",
      "note": "3 000 + 1 455, trek dan 1 af"
     }
    ]
   },
   {
    "name": "Heelgetalle aftrek",
    "answers": [
     {
      "num": "Q9a",
      "ans": "2 544",
      "note": "Toets: 2 544 + 3 254 = 5 798"
     },
     {
      "num": "Q9b",
      "ans": "2 437",
      "note": "Breek 'n tien, 'n honderd en 'n duisend op"
     },
     {
      "num": "Q9c",
      "ans": "3 550",
      "note": "Tel op van 2 450 tot 6 000"
     },
     {
      "num": "Q10",
      "ans": "145 + 312 = 457; 457 − 312 = 145; 457 − 145 = 312",
      "note": ""
     }
    ]
   },
   {
    "name": "Probleemoplossing",
    "answers": [
     {
      "num": "Q11a",
      "ans": "2 450 − 1 375 = 1 075 apples",
      "note": "\"oor\" beteken aftrek"
     },
     {
      "num": "Q11b",
      "ans": "1 250 + 1 480 = 2 730 m",
      "note": "\"altesaam\" beteken optel"
     },
     {
      "num": "Q11c",
      "ans": "5 000 − 3 275 = 1 725 kg",
      "note": "Tel op van 3 275 af"
     }
    ]
   }
  ]
 }
});
