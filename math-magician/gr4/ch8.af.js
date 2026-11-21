// Math Magician — Grade 4, Chapter 8 (Finansiële Wiskunde) — Afrikaans
// Generated from one bilingual source (scripts/math-gr4/gen_ch8.js); edit both languages there.
MathMagician.registerChapter(8, {
 "topics": [
  {
   "id": 801,
   "chapter": 8,
   "name": "Rand en sent",
   "fullName": "Rand en sent: munte, note en omskakeling",
   "lesson": {
    "heading": "Rand en sent: munte, note en omskakeling",
    "sub": "Hoofstuk 8 · Onderwerp 1",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/sa-flag.webp\" srcset=\"/assets/stickers/sa-flag@2x.webp 2x\" alt=\"\"><p>Suid-Afrikaanse geld word in <strong>rand (R)</strong> en <strong>sent (c)</strong> getel. Daar is <strong>100 sent in 1 rand</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Rand en sent</div><p><strong>R1 = 100c</strong>. Ons skryf <strong>R5,50</strong> vir 5 rand en 50 sent. Die komma skei die rand van die sent, en die sent het altyd twee syfers. Munte: 10c, 20c, 50c, R1, R2 en R5. Note: R10, R20, R50, R100 en R200.</p></div><svg viewBox=\"0 0 404 62\" style=\"display:block;width:100%;max-width:340px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#1d4ed8\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R100</text><rect x=\"104\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#b91c1c\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"150\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R50</text><rect x=\"204\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#92400e\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"250\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R20</text><rect x=\"304\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#15803d\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"350\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R10</text></svg><svg viewBox=\"0 0 328 62\" style=\"display:block;width:100%;max-width:295.2px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><circle cx=\"29\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"29\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"87\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"87\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R2</text><circle cx=\"145\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"145\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R1</text><circle cx=\"199\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"199\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"249\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"249\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">20c</text><circle cx=\"299\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"299\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">10c</text></svg><div class=\"example-box\"><div class=\"example-box-title\">✏️ Omskakel</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Rand na sent: daar is 100 sent in elke rand. R7 = 700c. R5,50 = 500c + 50c = <strong>550c</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Sent na rand: 250c = 200c + 50c = <strong>R2,50</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>85c = R0,85. 1 205c = R12,05 (5 sent word as 05 geskryf).</span></div></div><div class=\"g4-sim\" id=\"g4-s801\"><h4>🎮 Vul die Beursie</h4><p class=\"how\">Maak die bedrag met Suid-Afrikaanse munte en note. Begin met die grootste geld wat pas.</p><div class=\"g4-big\" data-k=\"goal\" style=\"font-size:24px\"></div><div class=\"g4-row\" data-k=\"pal\" style=\"gap:8px\"></div><div class=\"g4-stage\" style=\"padding:12px\"><div class=\"g4-row\" data-k=\"tray\" style=\"gap:6px;min-height:58px;margin:0\"></div></div><div data-k=\"sum\" style=\"font-size:19px\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"clear\">Maak leeg</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd } = window.G4;\n  const out = q(root, 'out'), tray = q(root, 'tray');\n  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');\n  const lab = v => v >= 100 ? 'R' + v / 100 : v + 'c';\n  const NOTE = { 1000: '#15803d', 2000: '#92400e', 5000: '#b91c1c', 10000: '#1d4ed8' };\n  const chip = (v, i) => v >= 1000\n    ? '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"background:' + NOTE[v] + ';color:#fff;border-color:rgba(255,255,255,.5);min-width:72px;padding:10px 8px\">' + lab(v) + '</button>'\n    : '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"border-radius:50%;width:' + (v >= 100 ? 54 : 46) + 'px;height:' + (v >= 100 ? 54 : 46) + 'px;padding:0;font-size:' + (v >= 100 ? 16 : 14) + 'px;background:' + (v >= 100 ? 'radial-gradient(#e5e7eb,#9ca3af)' : 'radial-gradient(#fcd34d,#b45309)') + ';color:#111;border-color:rgba(255,255,255,.4)\">' + lab(v) + '</button>';\n  let target = 0, put = [];\n  const total = () => put.reduce((s, v) => s + v, 0);\n  function draw() {\n    tray.innerHTML = put.length ? put.map((v, i) => chip(v, 't' + i)).join('') : '<span style=\"opacity:.6\">' + L.empty + '</span>';\n    q(root, 'sum').innerHTML = L.total(R(total()), total());\n  }\n  function fresh() { target = rnd(2, 120) * 10; put = []; q(root, 'goal').textContent = L.goal(R(target)); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n  q(root, 'pal').innerHTML = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10].map(v => chip(v, 'p' + v)).join('');\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    const i = t.dataset.i;\n    if (i && i[0] === 'p') { put.push(+i.slice(1)); put.sort((a, b) => b - a); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n    else if (i && i[0] === 't') { put.splice(+i.slice(1), 1); draw(); }\n    else if (t.dataset.k === 'check') {\n      const s = total(), d = Math.abs(s - target);\n      out.className = 'g4-out ' + (s === target ? 'good' : 'bad');\n      out.innerHTML = s === target ? L.yes(R(target), target, put.map(lab).join(' + ')) : (s < target ? L.more : L.less)(R(d), d);\n    } else if (t.dataset.k === 'clear') { put = []; draw(); }\n    else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"empty\":\"Die beursie is leeg.\",\"total\":{\"__fn\":\"(r, c) => 'In die beursie: <b>' + r + '</b> = ' + window.G4.fmt(c) + 'c'\"},\"goal\":{\"__fn\":\"r => 'Maak presies ' + r\"},\"ask\":\"Tik op munte en note om hulle in die beursie te sit. Tik op geld in die beursie om dit weer uit te haal.\",\"yes\":{\"__fn\":\"(r, c, list) => 'Presies reg! ' + list + ' = <b>' + r + '</b> = ' + window.G4.fmt(c) + 'c.'\"},\"more\":{\"__fn\":\"r => 'Nog nie genoeg nie. Jy het nog ' + r + ' nodig.'\"},\"less\":{\"__fn\":\"r => 'Te veel! Haal ' + r + ' uit.'\"}}), document.getElementById('g4-s801')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Tel geld van die grootste noot of munt na die kleinste. Dit is vinniger en jy maak minder foute.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "R4 = ? sent",
     "answer": "400",
     "topic": "Rand en sent"
    },
    {
     "type": "input",
     "text": "R5,50 = ? sent",
     "answer": "550",
     "topic": "Rand en sent"
    },
    {
     "type": "input",
     "text": "Skryf 350c in rand.",
     "answer": "R3,50",
     "topic": "Rand en sent"
    },
    {
     "type": "mc",
     "text": "Hoeveel sent is in R1?",
     "options": [
      "100",
      "10",
      "1 000",
      "50"
     ],
     "answer": 0,
     "topic": "Rand en sent"
    },
    {
     "type": "input",
     "text": "Hoeveel geld is dit altesaam (in rand)?<svg viewBox=\"0 0 320 62\" style=\"display:block;width:100%;max-width:288px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#92400e\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R20</text><circle cx=\"129\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"129\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"187\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"187\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R2</text><circle cx=\"241\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"241\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"291\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"291\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">20c</text></svg>",
     "answer": "R27,70",
     "topic": "Rand en sent"
    },
    {
     "type": "mc",
     "text": "Watter een is meer?",
     "options": [
      "350c",
      "R3,05",
      "Hulle is dieselfde"
     ],
     "answer": 0,
     "topic": "Rand en sent"
    },
    {
     "type": "input",
     "text": "Skryf 1 205c in rand.",
     "answer": "R12,05",
     "topic": "Rand en sent"
    },
    {
     "type": "input",
     "text": "Lebo het drie R5-munte en vier 50c-munte. Hoeveel geld is dit (in rand)?<svg viewBox=\"0 0 378 62\" style=\"display:block;width:100%;max-width:340px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><circle cx=\"29\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"29\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"87\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"87\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"145\" cy=\"31\" r=\"25\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"3\"/><text x=\"145\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"16\" font-weight=\"900\" font-family=\"sans-serif\">R5</text><circle cx=\"199\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"199\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"249\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"249\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"299\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"299\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text><circle cx=\"349\" cy=\"31\" r=\"21\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"3\"/><text x=\"349\" y=\"37\" text-anchor=\"middle\" fill=\"#111\" font-size=\"14\" font-weight=\"900\" font-family=\"sans-serif\">50c</text></svg>",
     "answer": "R17",
     "topic": "Rand en sent"
    }
   ]
  },
  {
   "id": 802,
   "chapter": 8,
   "name": "Kleingeld gee",
   "fullName": "Inkopies: kleingeld uitwerk",
   "lesson": {
    "heading": "Inkopies: kleingeld uitwerk",
    "sub": "Hoofstuk 8 · Onderwerp 2",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/bread-loaf.webp\" srcset=\"/assets/stickers/bread-loaf@2x.webp 2x\" alt=\"\"><p>As jy meer as die prys betaal, gee die winkelier vir jou <strong>kleingeld</strong>. Kleingeld = geld betaal − prys.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Twee maniere om kleingeld te vind</div><p><strong>Trek af:</strong> geld betaal − prys. <strong>Tel op</strong>, soos 'n winkelier: begin by die prys en tel munte by totdat jy by die geld kom wat betaal is.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ 'n Brood kos R16,50. Jy betaal met 'n R20-noot.</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Tel op van R16,50: + 50c maak R17, + R1 maak R18, + R2 maak R20.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Kleingeld = 50c + R1 + R2 = <strong>R3,50</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Toets deur in sent af te trek: 2 000c − 1 650c = 350c = R3,50.</span></div></div><div class=\"g4-sim\" id=\"g4-s802\"><h4>🎮 Winkelkasregister</h4><p class=\"how\">Jy is die winkelier. Tel met munte en note op van die prys af totdat jy by die geld kom wat die klant betaal het.</p><div class=\"g4-hero\" style=\"margin:4px 0 8px\"><span data-k=\"stk\"></span><p data-k=\"sale\" style=\"font-size:19px\"></p></div><div class=\"g4-row\" data-k=\"pal\" style=\"gap:8px\"></div><div class=\"g4-stage\" style=\"padding:12px\"><div class=\"g4-row\" data-k=\"tray\" style=\"gap:6px;min-height:58px;margin:0\"></div></div><div data-k=\"line\" style=\"font-size:18px;font-variant-numeric:tabular-nums\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"clear\">Begin weer</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd } = window.G4;\n  const out = q(root, 'out'), tray = q(root, 'tray');\n  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');\n  const lab = v => v >= 100 ? 'R' + v / 100 : v + 'c';\n  const NOTE = { 1000: '#15803d', 2000: '#92400e', 5000: '#b91c1c' };\n  const chip = (v, i) => v >= 1000\n    ? '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"background:' + NOTE[v] + ';color:#fff;border-color:rgba(255,255,255,.5);min-width:72px;padding:10px 8px\">' + lab(v) + '</button>'\n    : '<button class=\"g4-btn\" data-i=\"' + i + '\" style=\"border-radius:50%;width:' + (v >= 100 ? 54 : 46) + 'px;height:' + (v >= 100 ? 54 : 46) + 'px;padding:0;font-size:' + (v >= 100 ? 16 : 14) + 'px;background:' + (v >= 100 ? 'radial-gradient(#e5e7eb,#9ca3af)' : 'radial-gradient(#fcd34d,#b45309)') + ';color:#111;border-color:rgba(255,255,255,.4)\">' + lab(v) + '</button>';\n  let price = 0, paid = 0, put = [], item = null;\n  const total = () => put.reduce((s, v) => s + v, 0);\n  function draw() {\n    tray.innerHTML = put.length ? put.map((v, i) => chip(v, 't' + i)).join('') : '<span style=\"opacity:.6\">' + L.empty + '</span>';\n    let run = price; const steps = [R(price)]; put.forEach(v => { run += v; steps.push(R(run)); });\n    q(root, 'line').innerHTML = steps.join(' → ') + (put.length ? '' : ' → … ' + R(paid));\n  }\n  function fresh() {\n    item = L.items[rnd(0, L.items.length - 1)]; paid = [1000, 2000, 5000][rnd(0, 2)];\n    price = rnd(Math.ceil(paid * 0.4 / 50), paid / 50 - 1) * 50;\n    put = []; q(root, 'sale').innerHTML = L.sale(item.n, R(price), R(paid)); q(root, 'stk').innerHTML = window.G4.stk(item.s);\n    out.className = 'g4-out'; out.innerHTML = L.ask; draw();\n  }\n  q(root, 'pal').innerHTML = [2000, 1000, 500, 200, 100, 50, 20, 10].map(v => chip(v, 'p' + v)).join('');\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    const i = t.dataset.i;\n    if (i && i[0] === 'p') { put.push(+i.slice(1)); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n    else if (i && i[0] === 't') { put.splice(+i.slice(1), 1); draw(); }\n    else if (t.dataset.k === 'check') {\n      const ch = paid - price, s = total();\n      out.className = 'g4-out ' + (s === ch ? 'good' : 'bad');\n      out.innerHTML = s === ch ? L.yes(R(ch), R(price), R(paid)) : (s < ch ? L.short : L.over)(R(Math.abs(ch - s)), R(price + s), R(paid));\n    } else if (t.dataset.k === 'clear') { put = []; draw(); }\n    else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"items\":[{\"n\":\"'n brood\",\"s\":\"bread-loaf\"},{\"n\":\"'n sak appels\",\"s\":\"apple\"},{\"n\":\"'n karton melk\",\"s\":\"milk\"},{\"n\":\"'n roomys\",\"s\":\"ice-cream\"},{\"n\":\"'n staaf sjokolade\",\"s\":\"chocolate\"},{\"n\":\"'n bak botter\",\"s\":\"butter\"}],\"sale\":{\"__fn\":\"(n, p, paid) => '\\\\'n Klant koop ' + n + ' vir <b>' + p + '</b> en betaal met <b>' + paid + '</b>. Gee die kleingeld!'\"},\"empty\":\"Nog geen kleingeld gegee nie.\",\"ask\":\"Tik op munte en note om van die prys op te tel tot by die geld wat betaal is.\",\"yes\":{\"__fn\":\"(ch, p, paid) => 'Reg! Die kleingeld is <b>' + ch + '</b>. Toets: ' + p + ' + ' + ch + ' = ' + paid + '.'\"},\"short\":{\"__fn\":\"(d, reached, paid) => 'Jy het tot by ' + reached + ' getel, maar die klant het ' + paid + ' betaal. Gee nog ' + d + '.'\"},\"over\":{\"__fn\":\"(d, reached, paid) => 'Te veel! Jy het tot by ' + reached + ' getel, verby ' + paid + '. Vat ' + d + ' terug.'\"}}), document.getElementById('g4-s802')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Kontroleer altyd jou kleingeld: prys + kleingeld moet gelyk wees aan die geld wat jy betaal het.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "'n Pen kos R7. Jy betaal met R10. Hoeveel kleingeld kry jy?",
     "answer": "R3",
     "topic": "Kleingeld gee"
    },
    {
     "type": "input",
     "text": "Brood kos R16,50. Jy betaal met 'n R20-noot. Hoeveel kleingeld kry jy?<svg viewBox=\"0 0 104 62\" style=\"display:block;width:100%;max-width:93.60000000000001px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#92400e\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R20</text></svg>",
     "answer": "R3,50",
     "topic": "Kleingeld gee"
    },
    {
     "type": "input",
     "text": "'n T-hemp kos R34. Jy betaal met R50. Hoeveel kleingeld kry jy?<svg viewBox=\"0 0 104 62\" style=\"display:block;width:100%;max-width:93.60000000000001px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#b91c1c\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R50</text></svg>",
     "answer": "R16",
     "topic": "Kleingeld gee"
    },
    {
     "type": "input",
     "text": "'n Boek kos R12,75. Jy betaal met R20. Hoeveel kleingeld kry jy?",
     "answer": "R7,25",
     "topic": "Kleingeld gee"
    },
    {
     "type": "mc",
     "text": "Jy moet 80c kleingeld gee. Watter munte gebruik die minste munte?",
     "options": [
      "50c + 20c + 10c",
      "20c + 20c + 20c + 20c",
      "50c + 10c + 10c + 10c",
      "agt 10c-munte"
     ],
     "answer": 0,
     "topic": "Kleingeld gee"
    },
    {
     "type": "input",
     "text": "Jy koop 'n appel vir R4,50 en 'n sap vir R8. Jy betaal met R20. Hoeveel kleingeld kry jy?<svg viewBox=\"0 0 104 62\" style=\"display:block;width:100%;max-width:93.60000000000001px;margin:12px auto\" role=\"img\" aria-hidden=\"true\"><rect x=\"4\" y=\"6\" width=\"92\" height=\"50\" rx=\"6\" fill=\"#92400e\" stroke=\"rgba(255,255,255,.55)\" stroke-width=\"2\"/><text x=\"50\" y=\"38\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"20\" font-weight=\"900\" font-family=\"sans-serif\">R20</text></svg>",
     "answer": "R7,50",
     "topic": "Kleingeld gee"
    },
    {
     "type": "input",
     "text": "Sipho het met R50 betaal en R6 kleingeld gekry. Hoeveel het hy spandeer?",
     "answer": "R44",
     "topic": "Kleingeld gee"
    },
    {
     "type": "mc",
     "text": "Iets kos R23,40. Die klant betaal met R50 en kry R26,60 kleingeld. Is die kleingeld reg?",
     "options": [
      "Ja",
      "Nee"
     ],
     "answer": 0,
     "topic": "Kleingeld gee"
    }
   ]
  },
  {
   "id": 803,
   "chapter": 8,
   "name": "Begrotings en wins",
   "fullName": "Koop, verkoop en eenvoudige begrotings",
   "lesson": {
    "heading": "Koop, verkoop en eenvoudige begrotings",
    "sub": "Hoofstuk 8 · Onderwerp 3",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/ice-cream.webp\" srcset=\"/assets/stickers/ice-cream@2x.webp 2x\" alt=\"\"><p>'n <strong>Begroting</strong> is 'n plan om jou geld so te spandeer dat jy nie meer uitgee as wat jy het nie. As jy iets verkoop vir meer as wat dit jou gekos het, maak jy 'n <strong>wins</strong>.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Woorde om te ken</div><p><strong>Kosprys:</strong> wat jy vir iets betaal. <strong>Verkoopprys:</strong> waarvoor jy dit verkoop. <strong>Wins</strong> = verkoopprys − kosprys. <strong>Begroting:</strong> 'n lys van wat jy beplan om te spandeer, vergelyk met die geld wat jy het.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Lemoene verkoop</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Thandi koop 10 lemoene vir R20 en verkoop elkeen vir R3.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Sy verkoop al 10 vir 10 × R3 = R30.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Wins = R30 − R20 = <strong>R10</strong>.</span></div></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ 'n Begroting van R50</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Brood R16 + melk R18 + appels R10 = <strong>R44</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>R50 − R44 = <strong>R6</strong> oor.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>R6 is nie genoeg vir sap teen R9 nie, so die sap moet tot volgende keer wag.</span></div></div><div class=\"g4-sim\" id=\"g4-s803\"><h4>🎮 Snoepiewinkel-begroting</h4><p class=\"how\">Beplan jou inkopies. Koop eers wat jy moet hê en gebruik dan wat oorbly sonder om oor te gaan.</p><div data-k=\"task\" style=\"font-size:19px;margin-bottom:8px\"></div><div class=\"g4-row\" data-k=\"shop\" style=\"gap:8px;justify-content:center\"></div><div class=\"g4-big\" data-k=\"live\" style=\"font-size:20px\"></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd, shuffle } = window.G4;\n  const out = q(root, 'out'), shop = q(root, 'shop');\n  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');\n  let budget = 0, must = [], got = new Set();\n  const spent = () => [...got].reduce((s, i) => s + L.items[i].p, 0);\n  function draw() {\n    shop.innerHTML = L.items.map((it, i) => '<button class=\"g4-btn ghost\" data-it=\"' + i + '\" aria-pressed=\"' + got.has(i) + '\" style=\"display:flex;flex-direction:column;align-items:center;gap:2px;width:104px;padding:8px 4px\">' + '<img src=\"/assets/stickers/' + it.s + '.webp\" srcset=\"/assets/stickers/' + it.s + '@2x.webp 2x\" alt=\"\" style=\"width:58px;height:58px;object-fit:contain\">' + '<span style=\"font-size:15px\">' + it.n + '</span><b>' + R(it.p) + '</b>' + (must.includes(i) ? '<span style=\"font-size:12px;color:#fbbf24\">' + L.mustTag + '</span>' : '') + '</button>').join('');\n    const s = spent(), left = budget - s;\n    q(root, 'live').innerHTML = L.live(R(s), left >= 0 ? R(left) : '−' + R(-left));\n  }\n  function fresh() {\n    budget = [3000, 4000, 5000][rnd(0, 2)];\n    do { must = shuffle(L.items.map((_, i) => i)).slice(0, 2); } while (L.items[must[0]].p + L.items[must[1]].p > budget - 800);\n    got = new Set(must); q(root, 'task').innerHTML = L.task(R(budget), must.map(i => L.items[i].n).join(L.and));\n    out.className = 'g4-out'; out.innerHTML = L.ask; draw();\n  }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.it != null) { const i = +t.dataset.it; if (got.has(i)) got.delete(i); else got.add(i); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }\n    else if (t.dataset.k === 'check') {\n      const s = spent(), left = budget - s, miss = must.filter(i => !got.has(i));\n      const fits = L.items.map((it, i) => i).filter(i => !got.has(i) && L.items[i].p <= left).sort((a, b) => L.items[a].p - L.items[b].p);\n      out.className = 'g4-out bad';\n      if (miss.length) out.innerHTML = L.missing(miss.map(i => L.items[i].n).join(L.and));\n      else if (left < 0) out.innerHTML = L.over(R(-left));\n      else if (fits.length) out.innerHTML = L.more(R(left), L.items[fits[0]].n, R(L.items[fits[0]].p));\n      else { out.className = 'g4-out good'; out.innerHTML = L.yes(R(s), R(budget), R(left)); }\n    } else if (t.dataset.k === 'new') fresh();\n  });\n  fresh();\n})(__rev({\"items\":[{\"n\":\"Brood\",\"s\":\"bread-loaf\",\"p\":1650},{\"n\":\"Melk\",\"s\":\"milk\",\"p\":1800},{\"n\":\"Appel\",\"s\":\"apple\",\"p\":450},{\"n\":\"Piesang\",\"s\":\"banana\",\"p\":350},{\"n\":\"Sap\",\"s\":\"juice-box\",\"p\":900},{\"n\":\"Sjokolade\",\"s\":\"chocolate\",\"p\":1250},{\"n\":\"Roomys\",\"s\":\"ice-cream\",\"p\":1500},{\"n\":\"Mielie\",\"s\":\"mealie\",\"p\":600}],\"and\":\" en \",\"mustTag\":\"moet koop\",\"live\":{\"__fn\":\"(s, l) => 'Spandeer: <b>' + s + '</b> · Oor: <b>' + l + '</b>'\"},\"task\":{\"__fn\":\"(b, list) => 'Jy het <b>' + b + '</b>. Jy moet ' + list + ' koop. Voeg dan nog dinge by, maar moenie oor jou begroting gaan nie. Gaan aan totdat niks anders meer pas nie.'\"},\"ask\":\"Tik op items om hulle in jou mandjie te sit of uit te haal. Tik dan op Toets.\",\"missing\":{\"__fn\":\"list => 'Jy moet nog ' + list + ' koop. Die dinge wat jy nodig het, kom eerste!'\"},\"over\":{\"__fn\":\"d => 'Oor die begroting met ' + d + '. Haal iets uit.'\"},\"more\":{\"__fn\":\"(left, n, p) => 'Jy is binne jou begroting met ' + left + ' oor, maar jy kan nog ' + n + ' (' + p + ') bekostig.'\"},\"yes\":{\"__fn\":\"(s, b, left) => 'Uitstekende begroting! Jy het ' + s + ' van ' + b + ' spandeer en het ' + left + ' oor. Niks anders pas meer nie.'\"}}), document.getElementById('g4-s803')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Skryf eers die dinge neer wat jy <em>nodig</em> het. Kyk dan wat oorbly vir die dinge wat jy <em>graag wil hê</em>.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Jou begroting is R50. Jy spandeer R36. Hoeveel bly oor?",
     "answer": "R14",
     "topic": "Begrotings en wins"
    },
    {
     "type": "input",
     "text": "'n Winkel koop 'n pet vir R15 en verkoop dit vir R22. Wat is die wins?",
     "answer": "R7",
     "topic": "Begrotings en wins"
    },
    {
     "type": "input",
     "text": "Appels kos R2 elk. Hoeveel kos 6 appels?",
     "answer": "R12",
     "topic": "Begrotings en wins"
    },
    {
     "type": "mc",
     "text": "Wat beteken wins?",
     "options": [
      "verkoopprys − kosprys",
      "kosprys − verkoopprys",
      "kosprys + verkoopprys",
      "die prys van een item"
     ],
     "answer": 0,
     "topic": "Begrotings en wins"
    },
    {
     "type": "mc",
     "text": "Jou begroting is R30. Is dit genoeg vir hierdie twee dinge?<table style=\"border-collapse:collapse;margin:12px auto;font-size:18px\"><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Brood</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R16,50</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Melk</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R11,00</td></tr></table>",
     "options": [
      "Ja, met R2,50 oor",
      "Nee, R2,50 kort",
      "Ja, met R3,50 oor",
      "Nee, R3,50 kort"
     ],
     "answer": 0,
     "topic": "Begrotings en wins"
    },
    {
     "type": "input",
     "text": "Ayanda koop 'n pakkie van 12 lekkers vir R18 en verkoop elke lekker vir R2. Wat is die wins as al die lekkers verkoop word?",
     "answer": "R6",
     "topic": "Begrotings en wins"
    },
    {
     "type": "input",
     "text": "Jy kry R40 sakgeld vir die week. Jy spandeer R12 op Maandag en R15 op Woensdag. Hoeveel bly oor?",
     "answer": "R13",
     "topic": "Begrotings en wins"
    },
    {
     "type": "input",
     "text": "Zola het R100. Zola wil skoene vir R85 en sokkies vir R25 hê. Hoeveel meer geld is nodig?",
     "answer": "R10",
     "topic": "Begrotings en wins"
    }
   ]
  },
  {
   "id": 804,
   "chapter": 8,
   "name": "Geldprobleme",
   "fullName": "Probleme met geld oplos",
   "lesson": {
    "heading": "Probleme met geld oplos",
    "sub": "Hoofstuk 8 · Onderwerp 4",
    "body": "<div class=\"g4-hero\"><img class=\"g4-stk \" src=\"/assets/stickers/child.webp\" srcset=\"/assets/stickers/child@2x.webp 2x\" alt=\"\"><p>Baie geldprobleme het meer as een stap. Lees versigtig, skryf elke stap neer en kyk of jou antwoord sin maak.</p></div><div class=\"def-box\"><div class=\"def-box-title\">📖 Stappe</div><p><strong>1.</strong> Vind die koste van elke soort item (getal × prys). <strong>2.</strong> Tel bymekaar om die totaal te vind. <strong>3.</strong> Trek die totaal af van die geld wat betaal is om die kleingeld te vind. Om in sent te werk, kan dit makliker maak.</p></div><div class=\"example-box\"><div class=\"example-box-title\">✏️ Modise koop 3 boeke teen R5,50 elk, 2 potlode teen R2,25 elk en 'n liniaal vir R3,75. Hoeveel kleingeld kry Modise van R30?</div><div class=\"example-step\"><span class=\"step-num\">1</span><span>Boeke: 3 × R5,50 = R16,50. Potlode: 2 × R2,25 = R4,50. Liniaal: R3,75.</span></div><div class=\"example-step\"><span class=\"step-num\">2</span><span>Totaal: R16,50 + R4,50 + R3,75 = <strong>R24,75</strong>.</span></div><div class=\"example-step\"><span class=\"step-num\">3</span><span>Kleingeld: R30 − R24,75 = <strong>R5,25</strong>.</span></div></div><div class=\"g4-sim\" id=\"g4-s804\"><h4>🎮 Kasstrokie</h4><p class=\"how\">Voltooi die kasstrokie, een stap op 'n slag. Elke blokkie wys of dit reg is.</p><div class=\"g4-stage\" style=\"padding:12px\"><table data-k=\"slip\" style=\"width:100%;border-collapse:separate;border-spacing:0 8px\"></table></div><div class=\"g4-row\"><button class=\"g4-btn\" data-k=\"check\">Toets</button><button class=\"g4-btn ghost\" data-k=\"new\">Nog een</button></div><div class=\"g4-out\" data-k=\"out\" aria-live=\"polite\"></div></div><script>window.G4 = Object.assign(window.G4 || {}, {\n  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),\n  stk: (name, cls) => '<img class=\"g4-stk ' + (cls || '') + '\" src=\"/assets/stickers/' + name + '.webp\" srcset=\"/assets/stickers/' + name + '@2x.webp 2x\" alt=\"\">',\n  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),\n  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },\n  q: (root, k) => root.querySelector('[data-k=\"' + k + '\"]'),\n  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },\n  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }\n});\n{ const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };\n(function (L, root) {\n  const { q, rnd } = window.G4;\n  const out = q(root, 'out'), slip = q(root, 'slip');\n  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');\n  const parse = s => { s = String(s).replace(/[\\s ]/g, '').replace(/^r/i, ''); if (!s) return null; if (/c$/i.test(s)) { const v = parseInt(s, 10); return isNaN(v) ? null : v; } const v = parseFloat(s.replace(',', '.')); return isNaN(v) ? null : Math.round(v * 100); };\n  let P = null;\n  function fresh() {\n    const a = L.items.slice().sort(() => Math.random() - 0.5).slice(0, 2);\n    const lines = a.map(it => ({ n: it.n, k: rnd(2, 4), p: rnd(it.lo, it.hi) * 50 }));\n    const tot = lines.reduce((s, l) => s + l.k * l.p, 0), paid = [2000, 5000, 10000, 20000].find(v => v > tot);\n    P = { lines, tot, paid };\n    const inp = k => '<input class=\"g4-input\" data-k=\"' + k + '\" inputmode=\"decimal\" style=\"width:120px\" aria-label=\"' + k + '\">';\n    slip.innerHTML = lines.map((l, i) => '<tr><td style=\"text-align:left;font-size:18px\">' + l.k + ' × ' + l.n + ' @ ' + R(l.p) + '</td><td>' + inp('l' + i) + '</td></tr>').join('') +\n      '<tr><td style=\"text-align:left;font-size:18px\"><b>' + L.total + '</b></td><td>' + inp('tot') + '</td></tr>' +\n      '<tr><td style=\"text-align:left;font-size:18px\">' + L.paid(R(paid)) + ' · <b>' + L.change + '</b></td><td>' + inp('ch') + '</td></tr>';\n    out.className = 'g4-out'; out.innerHTML = L.ask;\n  }\n  function check() {\n    const want = { l0: P.lines[0].k * P.lines[0].p, l1: P.lines[1].k * P.lines[1].p, tot: P.tot, ch: P.paid - P.tot };\n    const msgs = []; let all = true;\n    Object.keys(want).forEach(k => {\n      const el = q(root, k), v = parse(el.value), ok = v === want[k];\n      el.style.borderColor = v == null ? '' : ok ? '#4ade80' : '#f87171';\n      if (!ok) { all = false; if (v != null) msgs.push(k === 'tot' ? L.tipTot : k === 'ch' ? L.tipCh(R(P.paid)) : L.tipLine(P.lines[+k[1]].k, R(P.lines[+k[1]].p))); }\n    });\n    out.className = 'g4-out ' + (all ? 'good' : 'bad');\n    out.innerHTML = all ? L.yes(R(P.tot), R(P.paid - P.tot), R(P.paid)) : (msgs.length ? msgs.join('<br>') : L.fill);\n  }\n  root.addEventListener('click', e => {\n    const t = e.target.closest('button'); if (!t) return;\n    if (t.dataset.k === 'check') check(); else if (t.dataset.k === 'new') fresh();\n  });\n  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') check(); });\n  fresh();\n})(__rev({\"items\":[{\"n\":\"potlode\",\"lo\":3,\"hi\":8},{\"n\":\"boeke\",\"lo\":8,\"hi\":24},{\"n\":\"liniale\",\"lo\":5,\"hi\":10},{\"n\":\"uitveërs\",\"lo\":2,\"hi\":6},{\"n\":\"penne\",\"lo\":4,\"hi\":12}],\"total\":\"Totaal\",\"change\":\"Kleingeld\",\"paid\":{\"__fn\":\"r => 'Betaal ' + r\"},\"ask\":\"Werk elke lyn uit (getal × prys), dan die totaal en die kleingeld. Jy kan R5,50 of 550c tik.\",\"tipLine\":{\"__fn\":\"(k, p) => 'Kontroleer die lyn ' + k + ' × ' + p + '. Wenk: werk in sent en verander dan terug na rand.'\"},\"tipTot\":\"Die totaal is die twee lyne bymekaargetel.\",\"tipCh\":{\"__fn\":\"paid => 'Kleingeld = ' + paid + ' − totaal.'\"},\"fill\":\"Vul elke blokkie in.\",\"yes\":{\"__fn\":\"(t, c, paid) => 'Alles reg! Die totaal is ' + t + ', en ' + paid + ' − ' + t + ' = <b>' + c + '</b> kleingeld.'\"}}), document.getElementById('g4-s804')); }</script><div class=\"tip-box\"><span class=\"tip-icon\">💡</span><span>Skat eers: 3 boeke teen omtrent R6 is omtrent R18. As jou antwoord baie ver van jou skatting af is, kontroleer jou werk weer.</span></div>"
   },
   "questions": [
    {
     "type": "input",
     "text": "Modise koop 3 boeke teen R5,50 elk, 2 potlode teen R2,25 elk en 'n liniaal vir R3,75. Hoeveel kleingeld kry Modise van R30?",
     "answer": "R5,25",
     "topic": "Geldprobleme"
    },
    {
     "type": "input",
     "text": "Penne kos R3,50 elk. Hoeveel kos 4 penne?",
     "answer": "R14",
     "topic": "Geldprobleme"
    },
    {
     "type": "input",
     "text": "R12,75 + R8,50 = ?",
     "answer": "R21,25",
     "topic": "Geldprobleme"
    },
    {
     "type": "mc",
     "text": "Mpho het R20. 'n Pastei kos R14,50 en 'n sap kos R6. Kan Mpho albei koop?",
     "options": [
      "Nee, R0,50 kort",
      "Ja, met R0,50 oor",
      "Ja, presies genoeg",
      "Nee, R1,50 kort"
     ],
     "answer": 0,
     "topic": "Geldprobleme"
    },
    {
     "type": "input",
     "text": "'n Taxirit kos R15. Lindiwe ry elke dag vir 5 dae met 'n taxi skool toe en terug huis toe. Hoeveel is dit?",
     "answer": "R150",
     "topic": "Geldprobleme"
    },
    {
     "type": "input",
     "text": "Jy koop 2 brode teen R16 elk en 3 kartonne melk teen R18 elk. Hoeveel kleingeld kry jy van R100?",
     "answer": "R14",
     "topic": "Geldprobleme"
    },
    {
     "type": "input",
     "text": "Drie vriende deel R45 gelykop. Hoeveel kry elke vriend?",
     "answer": "R15",
     "topic": "Geldprobleme"
    },
    {
     "type": "input",
     "text": "Kaartjies kos R40 vir 'n volwassene en R25 vir 'n kind. Wat betaal 2 volwassenes en 3 kinders altesaam?<table style=\"border-collapse:collapse;margin:12px auto;font-size:18px\"><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Volwassene</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R40</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Kind</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R25</td></tr></table>",
     "answer": "R155",
     "topic": "Geldprobleme"
    }
   ]
  }
 ],
 "workbook": {
  "chapter": 8,
  "chapterName": "Finansiële Wiskunde",
  "topics": [
   {
    "name": "Rand en sent",
    "questions": [
     {
      "num": "1",
      "text": "Skryf in sent.",
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
      "text": "Skryf in rand.",
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
      "text": "Skryf neer watter munte en note jy kan gebruik om presies te betaal:",
      "parts": [
       {
        "label": "a)",
        "text": "R37,50",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "R8,90, met so min munte as moontlik",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Kleingeld gee",
    "questions": [
     {
      "num": "4",
      "text": "Werk die kleingeld uit.",
      "parts": [
       {
        "label": "a)",
        "text": "Prys R8, betaal met R10",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "Prys R27, betaal met R50",
        "marks": 1
       },
       {
        "label": "c)",
        "text": "Prys R14,50, betaal met R20",
        "marks": 2
       },
       {
        "label": "d)",
        "text": "Prys R63,20, betaal met R100",
        "marks": 2
       }
      ]
     },
     {
      "num": "5",
      "text": "Nomsa koop 'n pen vir R12,50 en betaal met 'n R20-noot.",
      "parts": [
       {
        "label": "a)",
        "text": "Hoeveel kleingeld kry Nomsa?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Skryf neer watter munte die winkelier kan gee.",
        "marks": 2
       }
      ]
     },
     {
      "num": "6",
      "text": "Tom het met 'n R50-noot betaal en R13,50 kleingeld gekry.",
      "parts": [
       {
        "label": "",
        "text": "Hoeveel het Tom spandeer?",
        "marks": 2
       }
      ]
     }
    ]
   },
   {
    "name": "Begrotings en wins",
    "questions": [
     {
      "num": "7",
      "text": "Julle klas het R60 vir 'n partytjie. Dit is die plan:<table style=\"border-collapse:collapse;margin:12px auto;font-size:18px\"><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);font-weight:800\">Item</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;font-weight:800\">Prys</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Koeldrank</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R24</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Skyfies</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R18</td></tr><tr><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);\">Lekkers</td><td style=\"padding:6px 14px;border-bottom:1px solid rgba(148,163,184,.35);text-align:right;\">R12</td></tr></table>",
      "parts": [
       {
        "label": "a)",
        "text": "Wat is die totaal?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Hoeveel bly oor van R60?",
        "marks": 1
       }
      ]
     },
     {
      "num": "8",
      "text": "Musa maak kralearmbande. Die krale vir een armband kos R7. Musa verkoop elke armband vir R12.",
      "parts": [
       {
        "label": "a)",
        "text": "Wat is die wins op een armband?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Wat is die wins op 8 armbande?",
        "marks": 2
       }
      ]
     },
     {
      "num": "9",
      "text": "Beplan 'n piekniek met 'n begroting van R50. Pryse: brood R16, sap R14, appels R9, kaas R22, beskuitjies R11.",
      "parts": [
       {
        "label": "a)",
        "text": "Kies wat om te koop en skryf die totaal neer.",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Hoeveel bly oor van R50?",
        "marks": 1
       }
      ]
     }
    ]
   },
   {
    "name": "Geldprobleme",
    "questions": [
     {
      "num": "10",
      "text": "Jy koop 2 sappe teen R8,50 elk en 'n muffin vir R6,75. Jy betaal met R50.",
      "parts": [
       {
        "label": "a)",
        "text": "Wat is die totaal?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Hoeveel kleingeld kry jy?",
        "marks": 2
       }
      ]
     },
     {
      "num": "11",
      "text": "Lindi spaar elke week R15.",
      "parts": [
       {
        "label": "a)",
        "text": "Hoeveel het Lindi ná 6 weke gespaar?",
        "marks": 2
       },
       {
        "label": "b)",
        "text": "Hoeveel weke neem dit om R120 te spaar?",
        "marks": 2
       }
      ]
     },
     {
      "num": "12",
      "text": "'n Pakkie van 4 broodrolletjies kos R14. Een rolletjie alleen kos R4.",
      "parts": [
       {
        "label": "a)",
        "text": "Hoeveel kos 4 enkel rolletjies?",
        "marks": 1
       },
       {
        "label": "b)",
        "text": "Watter een is die beter koop? Verduidelik.",
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
  "chapterName": "Hoofstuk 8 — Finansiële Wiskunde",
  "topics": [
   {
    "name": "Rand en sent",
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
      "note": "Een moontlike antwoord."
     },
     {
      "num": "Q3b",
      "ans": "R5 + R2 + R1 + 50c + 20c + 20c",
      "note": "6 munte"
     }
    ]
   },
   {
    "name": "Kleingeld gee",
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
      "note": "Een moontlike antwoord."
     },
     {
      "num": "Q6",
      "ans": "R36,50",
      "note": "R50 − R13,50"
     }
    ]
   },
   {
    "name": "Begrotings en wins",
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
      "note": "Eie keuse; byvoorbeeld brood + sap + appels + beskuitjies = R50."
     },
     {
      "num": "Q9b",
      "ans": "R50 − total",
      "note": "Vir die voorbeeld hierbo: R0."
     }
    ]
   },
   {
    "name": "Geldprobleme",
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
      "note": "R120 ÷ R15 = 8 weke"
     },
     {
      "num": "Q12a",
      "ans": "R16",
      "note": "4 × R4"
     },
     {
      "num": "Q12b",
      "ans": "R14 < R16",
      "note": "Die pakkie: dit spaar R2."
     }
    ]
   }
  ]
 }
});
