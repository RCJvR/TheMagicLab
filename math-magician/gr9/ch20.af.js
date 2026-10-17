// Math Magician — Grade 9, Chapter 20 (Afrikaans)
// Grafieke

MathMagician.registerChapter(20, {
  topics: [
    {
      id: 2001,
      chapter: 20,
      name: "Grafieke interpreteer",
      fullName: "Globale en lineêre grafieke interpreteer: neigings, kenmerke, afsnitte en gradiënt",
      lesson: {
        heading: "Grafieke interpreteer",
        sub: "Hoofstuk 20 · Onderwerp 1",
        body: `
<p>Om 'n grafiek te interpreteer, beskryf sy <strong>neiging</strong> (stygend, dalend, konstant), of dit <strong>lineêr</strong> of <strong>nie-lineêr</strong> is, enige <strong>maksimum of minimum</strong>, of dit <strong>diskreet of kontinu</strong> is, en waar dit die asse sny (die <strong>afsnitte</strong>).</p>
<div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":190,"view":[0,0,12,110],"pad":28,"axes":{"x":"tyd (h)","y":"liter","o":false,"tx":2,"ty":20},"pts":{"A":[0,100],"B":[4,60],"C":[6,60],"D":[11,0]},"nolab":["A","B","C","D"],"dots":["A","D"],"seg":[["A","B","ac"],["B","C","ac"],["C","D","ac"]]}'></div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: water in 'n tenk</div>
  <div class="example-step"><span class="step-num">1</span><span>Die y-afsnit (0 ; 100): aan die begin hou die tenk 100 liter.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>0–4 h: dalend en lineêr: 40 liter in 4 uur gebruik, 10 liter per uur.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>4–6 h: konstant: geen water word gebruik nie.</span></div>
  <div class="example-step"><span class="step-num">4</span><span>6–11 h: daal vinniger (die lyn is steiler): 60 liter in 5 uur, 12 liter per uur.</span></div>
  <div class="example-step"><span class="step-num">5</span><span>Die x-afsnit (11 ; 0): die tenk is leeg ná 11 uur.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Die gradiënt (steilte) van 'n reguit stuk gee die tempo: verandering in y ÷ verandering in x, met eenhede soos liter per uur.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Die watertenk.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,12,110],\"pad\":28,\"axes\":{\"x\":\"tyd (h)\",\"y\":\"liter\",\"o\":false,\"tx\":2,\"ty\":20},\"pts\":{\"A\":[0,100],\"B\":[4,60],\"C\":[6,60],\"D\":[11,0]},\"nolab\":[\"A\",\"B\",\"C\",\"D\"],\"dots\":[\"A\",\"D\"],\"seg\":[[\"A\",\"B\",\"ac\"],[\"B\",\"C\",\"ac\"],[\"C\",\"D\",\"ac\"]]}'></div>Hoeveel liter hou die tenk aan die begin?", "answer": "100", "topic": "Grafieke interpreteer"},
        {"type": "mc", "text": "Die watertenk.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,12,110],\"pad\":28,\"axes\":{\"x\":\"tyd (h)\",\"y\":\"liter\",\"o\":false,\"tx\":2,\"ty\":20},\"pts\":{\"A\":[0,100],\"B\":[4,60],\"C\":[6,60],\"D\":[11,0]},\"nolab\":[\"A\",\"B\",\"C\",\"D\"],\"dots\":[\"A\",\"D\"],\"seg\":[[\"A\",\"B\",\"ac\"],[\"B\",\"C\",\"ac\"],[\"C\",\"D\",\"ac\"]]}'></div>Tussen 4 h en 6 h is die grafiek:", "options": ["stygend", "dalend", "konstant", "nie-lineêr"], "answer": 2, "topic": "Grafieke interpreteer"},
        {"type": "input", "text": "Die watertenk.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,12,110],\"pad\":28,\"axes\":{\"x\":\"tyd (h)\",\"y\":\"liter\",\"o\":false,\"tx\":2,\"ty\":20},\"pts\":{\"A\":[0,100],\"B\":[4,60],\"C\":[6,60],\"D\":[11,0]},\"nolab\":[\"A\",\"B\",\"C\",\"D\"],\"dots\":[\"A\",\"D\"],\"seg\":[[\"A\",\"B\",\"ac\"],[\"B\",\"C\",\"ac\"],[\"C\",\"D\",\"ac\"]]}'></div>Op watter tyd is die tenk leeg? (h)", "answer": "11", "topic": "Grafieke interpreteer"},
        {"type": "mc", "text": "Die watertenk.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,12,110],\"pad\":28,\"axes\":{\"x\":\"tyd (h)\",\"y\":\"liter\",\"o\":false,\"tx\":2,\"ty\":20},\"pts\":{\"A\":[0,100],\"B\":[4,60],\"C\":[6,60],\"D\":[11,0]},\"nolab\":[\"A\",\"B\",\"C\",\"D\"],\"dots\":[\"A\",\"D\"],\"seg\":[[\"A\",\"B\",\"ac\"],[\"B\",\"C\",\"ac\"],[\"C\",\"D\",\"ac\"]]}'></div>Tussen 6 h en 11 h word die water gebruik:", "options": ["vinniger as tussen 0 h en 4 h", "stadiger as tussen 0 h en 4 h", "teen dieselfde tempo", "glad nie"], "answer": 0, "topic": "Grafieke interpreteer"},
        {"type": "mc", "text": "Die punt waar 'n grafiek die y-as sny, word genoem die:", "options": ["x-afsnit", "y-afsnit", "maksimum", "gradiënt"], "answer": 1, "topic": "Grafieke interpreteer"},
        {"type": "input", "text": "'n Grafiek gaan reguit van (0 ; 100) tot (4 ; 60). Wat is die tempo van verandering per uur? Gee 'n negatiewe getal vir 'n afname.", "answer": "-10", "topic": "Grafieke interpreteer"},
      ]
    },
    {
      id: 2002,
      chapter: 20,
      name: "Globale grafieke teken",
      fullName: "Globale grafieke uit beskrywings van situasies teken",
      lesson: {
        heading: "Globale grafieke teken",
        sub: "Hoofstuk 20 · Onderwerp 2",
        body: `
<p>Wanneer jy 'n globale grafiek uit 'n storie skets, wys jy die <em>vorm</em>, nie presiese waardes nie. Plaas tyd (of die onafhanklike veranderlike) op die horisontale as en besluit, deel vir deel, hoe die ander hoeveelheid verander.</p>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: 'n valskermsprong</div>
  <div class="example-step"><span class="step-num">1</span><span>'n Valskermspringer spring van 3 000 m. Sy val al hoe vinniger, maak haar valskerm oop, en sweef dan stadig teen 'n konstante spoed af totdat sy land.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Hoogte teenoor tyd: 'n kromme wat steiler word (val vinniger), dan 'n flou reguit lyn af tot 0.</span></div>
</div>
<div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":180,"view":[0,0,10,10],"pad":26,"axes":{"x":"tyd","y":"hoogte","o":false},"fn":[{"f":"9.5-0.25*x*x","c":"ac","dom":[0,3]},{"f":"7.25-1.1*(x-3)","c":"gn","dom":[3,9.6]}],"txt":[[4.2,9.0,"vryval","ac"],[6.8,5.4,"valskerm oop","gn"]]}'></div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Besluit eers of die grafiek verbind moet word: tyd, hoogte en temperatuur is kontinu; die aantal mense of items is diskreet.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "'n Motor wag by 'n rooi lig, versnel dan, en ry dan teen 'n konstante spoed. Op 'n spoed-tyd-grafiek is die eerste deel:", "options": ["konstant op 0", "stygend", "dalend", "'n maksimum"], "answer": 0, "topic": "Globale grafieke teken"},
        {"type": "mc", "text": "Warm tee koel eers vinnig af en dan stadiger. Sy temperatuur-tyd-grafiek is:", "options": ["'n reguit lyn op", "'n horisontale lyn", "'n reguit lyn af", "'n kromme wat afgaan en afplat"], "answer": 3, "topic": "Globale grafieke teken"},
        {"type": "mc", "text": "Die aantal kaartjies wat elke dag van 'n week verkoop word, moet geteken word as 'n:", "options": ["kontinue lyn", "stel aparte (diskrete) punte of stawe", "kromme", "horisontale lyn"], "answer": 1, "topic": "Globale grafieke teken"},
        {"type": "mc", "text": "'n Swemmer swem weg van die kant af, rus terwyl sy aan 'n tou vashou, en swem dan terug. Haar afstand van die kant teenoor tyd:", "options": ["styg net", "daal net", "styg, is konstant, daal dan", "daal, is konstant, styg dan"], "answer": 2, "topic": "Globale grafieke teken"},
        {"type": "mc", "text": "'n Steiler deel van 'n afstand-tyd-grafiek beteken:", "options": ["vinniger beweging", "stadiger beweging", "stilstaan", "agtertoe beweeg"], "answer": 0, "topic": "Globale grafieke teken"},
      ]
    },
    {
      id: 2003,
      chapter: 20,
      name: "Reguitlyngrafieke teken",
      fullName: "Reguitlyngrafieke uit vergelykings teken met tabelle en afsnitte",
      lesson: {
        heading: "Reguitlyngrafieke teken",
        sub: "Hoofstuk 20 · Onderwerp 3",
        body: `
<p>Die grafiek van y = mx + c is 'n reguit lyn. Jy kan dit uit 'n tabel van waardes teken, of vinniger uit sy twee afsnitte.</p>
<div class="def-box">
  <div class="def-box-title">📖 Die afsnitmetode</div>
<p><strong>y-afsnit:</strong> stel x = 0. <strong>x-afsnit:</strong> stel y = 0. Stip albei punte en trek 'n reguit lyn deur hulle.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: y = −2x + 4</div>
  <div class="example-step"><span class="step-num">1</span><span>x = 0: y = 4, so die y-afsnit is (0 ; 4).</span></div>
  <div class="example-step"><span class="step-num">2</span><span>y = 0: 0 = −2x + 4, so x = 2 en die x-afsnit is (2 ; 0).</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Verbind die punte. Die lyn gaan af van links na regs omdat m = −2 negatief is.</span></div>
</div>
<div class="mf-fig" data-fig='{"t":"geo","w":250,"h":250,"view":[-2,-3,4,6],"grid":1,"axes":{"ticks":1},"fn":[{"f":"-2*x+4","c":"ac","dom":[-1.2,3.4]}],"pts":{"(0;4)":[0,4],"(2;0)":[2,0]},"dots":true,"lab":{"(0;4)":"e","(2;0)":"ne"}}'></div>
<div class="def-box">
  <div class="def-box-title">📖 Spesiale lyne</div>
<p><strong>y = c</strong> is 'n horisontale lyn (gradiënt 0). <strong>x = k</strong> is 'n vertikale lyn. <strong>y = mx</strong> gaan deur die oorsprong.</p>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Toets met 'n derde punt: vir y = −2x + 4 gee x = 1 vir y = 2, en (1 ; 2) moet op jou lyn lê.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Wat is die y-afsnit van y = 3x − 6? Skryf dit as (x ; y).", "answer": "(0 ; -6)", "topic": "Reguitlyngrafieke teken"},
        {"type": "input", "text": "Wat is die x-afsnit van y = 3x − 6? Skryf dit as (x ; y).", "answer": "(2 ; 0)", "topic": "Reguitlyngrafieke teken"},
        {"type": "mc", "text": "Watter grafiek is 'n horisontale lyn?", "options": ["x = 3", "y = 3", "y = 3x", "y = x + 3"], "answer": 1, "topic": "Reguitlyngrafieke teken"},
        {"type": "input", "text": "Vir y = −x + 5, bepaal y wanneer x = −2.", "answer": "7", "topic": "Reguitlyngrafieke teken"},
        {"type": "mc", "text": "Watter punt lê op y = 2x − 1?", "options": ["(1 ; 2)", "(2 ; 2)", "(3 ; 5)", "(0 ; 1)"], "answer": 2, "topic": "Reguitlyngrafieke teken"},
        {"type": "input", "text": "Wat is die x-afsnit van 2x + 4y = 8? Gee die x-waarde.", "answer": "4", "topic": "Reguitlyngrafieke teken"},
      ]
    },
    {
      id: 2004,
      chapter: 20,
      name: "Die vergelyking van 'n reguit lyn",
      fullName: "Die gradiënt en y-afsnit vind, en die vergelyking van 'n reguit lyn uit sy grafiek",
      lesson: {
        heading: "Die vergelyking van 'n reguit lyn",
        sub: "Hoofstuk 20 · Onderwerp 4",
        body: `
<p>In <span class="math">y = mx + c</span> is <strong>m</strong> die gradiënt (hoe steil die lyn is) en <strong>c</strong> die y-afsnit (waar dit die y-as sny).</p>
<div class="mf-fig" data-fig='{"t":"geo","w":250,"h":250,"view":[-1,-1,4,7],"grid":1,"axes":{"ticks":1},"fn":[{"f":"2*x+1","c":"ac","dom":[-0.8,2.9]}],"pts":{"A":[0,1],"B":[2,5],"K":[2,1]},"dots":["A","B"],"nolab":["K"],"lab":{"A":"w","B":"w"},"seg":[["A","K","or dash",null,"loop 2"],["K","B","or dash",null,"styg 4"]]}'></div>
<div class="def-box">
  <div class="def-box-title">📖 Gradiënt uit twee punte</div>
<p><span class="math">m = (y₂ − y₁) ÷ (x₂ − x₁)</span> = styging ÷ loop.<br>m &gt; 0: die lyn gaan op; m &lt; 0: dit gaan af; m = 0: horisontaal.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: die lyn deur A(0 ; 1) en B(2 ; 5)</div>
  <div class="example-step"><span class="step-num">1</span><span>m = (5 − 1) ÷ (2 − 0) = 4 ÷ 2 = 2</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Die lyn sny die y-as by 1, so c = 1.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Die vergelyking is <span class="math">y = 2x + 1</span>.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: wanneer die y-afsnit nie gegee is nie</div>
  <div class="example-step"><span class="step-num">1</span><span>'n Lyn het gradiënt 3 en gaan deur (2 ; 4). Vervang die punt in y = 3x + c:</span></div>
  <div class="example-step"><span class="step-num">2</span><span>4 = 3(2) + c, so c = −2 en die vergelyking is <strong>y = 3x − 2</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Parallelle lyne het dieselfde gradiënt: y = 2x + 1 en y = 2x − 5 ontmoet nooit.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Bepaal die gradiënt van die lyn deur (1 ; 2) en (3 ; 8).", "answer": "3", "topic": "Die vergelyking van 'n reguit lyn"},
        {"type": "input", "text": "Bepaal die gradiënt van die lyn deur (−2 ; 5) en (2 ; −3).", "answer": "-2", "topic": "Die vergelyking van 'n reguit lyn"},
        {"type": "mc", "text": "'n Lyn het gradiënt 4 en y-afsnit −3. Sy vergelyking is:", "options": ["y = 4x − 3", "y = −3x + 4", "y = 4x + 3", "y = x − 3"], "answer": 0, "topic": "Die vergelyking van 'n reguit lyn"},
        {"type": "mc", "text": "Wat is die gradiënt van y = 5 − 2x?", "options": ["5", "−2", "2", "−5"], "answer": 1, "topic": "Die vergelyking van 'n reguit lyn"},
        {"type": "mc", "text": "'n Lyn deur (0 ; 2) en (3 ; 8) het vergelyking:", "options": ["y = 3x + 2", "y = 2x + 3", "y = 6x + 2", "y = 2x + 2"], "answer": 3, "topic": "Die vergelyking van 'n reguit lyn"},
        {"type": "mc", "text": "'n Lyn met gradiënt 2 gaan deur (3 ; 1). Sy vergelyking is:", "options": ["y = 2x + 1", "y = 2x − 1", "y = 2x − 5", "y = 2x + 5"], "answer": 2, "topic": "Die vergelyking van 'n reguit lyn"},
      ]
    },
    {
      id: 2005,
      chapter: 20,
      name: "Hfst 20 Eksamenfokus",
      fullName: "Eksamenoefening: grafieke",
      lesson: {
        heading: "Hfst 20 Eksamenfokus",
        sub: "Hoofstuk 20 · Onderwerp 5",
        body: `
<p>Hierdie vrae meng die hele hoofstuk, soos 'n toets doen. Gee afsnitte as koördinate en gradiënte as getalle, en beskryf grafieke met die korrekte woorde.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Skryf die reël of formule neer wat jy gebruik, vervang dan, en gee die antwoord met eenhede. Punte word vir elke stap gegee.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Watter lyn is parallel aan y = −3x + 2?", "options": ["y = 3x + 2", "y = −3x − 7", "y = 2x − 3", "y = x/3"], "answer": 1, "topic": "Hfst 20 Eksamenfokus"},
        {"type": "input", "text": "Waar kruis y = x + 1 en y = −x + 5? Skryf die punt as (x ; y).", "answer": "(2 ; 3)", "topic": "Hfst 20 Eksamenfokus"},
        {"type": "mc", "text": "'n Grafiek daal, bereik 'n laagste punt en styg dan. Die laagste punt is 'n:", "options": ["maksimum", "minimum", "y-afsnit", "gradiënt"], "answer": 1, "topic": "Hfst 20 Eksamenfokus"},
        {"type": "input", "text": "Wat is die gradiënt van 'n horisontale lyn?", "answer": "0", "topic": "Hfst 20 Eksamenfokus"},
        {"type": "input", "text": "y = 2x + c gaan deur (1 ; 7). Bepaal c.", "answer": "5", "topic": "Hfst 20 Eksamenfokus"},
      ]
    },
  ],
  workbook: {
    "chapter": 20,
    "chapterName": "Grafieke",
    "topics": [
      {
        "name": "Reguitlyngrafieke teken",
        "questions": [
          {
            "num": "1",
            "text": "y = −½x + 3",
            "parts": [
              {
                "label": "a)",
                "text": "Bepaal die x- en y-afsnitte.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "Teken die grafiek op 'n Cartesiese vlak.",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "Lê die punt (4 ; 1) op die lyn? Toon hoekom.",
                "marks": 2
              }
            ]
          }
        ]
      },
      {
        "name": "Die vergelyking van 'n reguit lyn",
        "questions": [
          {
            "num": "2",
            "text": "'n Lyn gaan deur A(−1 ; −1) en B(2 ; 5).",
            "parts": [
              {
                "label": "a)",
                "text": "Bereken die gradiënt van AB.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "Bepaal die vergelyking van AB.",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "Skryf die vergelyking neer van die lyn parallel aan AB deur (0 ; −4).",
                "marks": 1
              }
            ]
          }
        ]
      }
    ]
  },
  answerKey: {
    "chapter": 20,
    "chapterName": "Hoofstuk 20 — Grafieke",
    "topics": [
      {
        "name": "Reguitlyngrafieke teken",
        "answers": [
          {
            "num": "Q1a",
            "ans": "y-afsnit (0 ; 3); x-afsnit (6 ; 0)",
            "note": "0 = −½x + 3 gee x = 6"
          },
          {
            "num": "Q1b",
            "ans": "'n Reguit lyn deur (0 ; 3) en (6 ; 0)",
            "note": ""
          },
          {
            "num": "Q1c",
            "ans": "Ja: −½(4) + 3 = 1",
            "note": ""
          }
        ]
      },
      {
        "name": "Die vergelyking van 'n reguit lyn",
        "answers": [
          {
            "num": "Q2a",
            "ans": "m = 2",
            "note": "(5 − (−1)) ÷ (2 − (−1)) = 6 ÷ 3"
          },
          {
            "num": "Q2b",
            "ans": "y = 2x + 1",
            "note": "5 = 2(2) + c, c = 1"
          },
          {
            "num": "Q2c",
            "ans": "y = 2x − 4",
            "note": "Dieselfde gradiënt, c = −4"
          }
        ]
      }
    ]
  }
});
