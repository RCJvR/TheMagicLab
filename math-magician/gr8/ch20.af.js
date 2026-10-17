// Math Magician — Grade 8, Chapter 20 (Afrikaans)
// Grafieke

MathMagician.registerChapter(20, {
  topics: [
    {
      id: 2001,
      name: "Interpreteer globale grafieke",
      fullName: "Interpreteer globale grafieke: stygend, dalend, konstant, maksimum, minimum, diskreet en kontinu",
      lesson: {
        heading: "Interpreteer globale grafieke",
        sub: "Hoofstuk 20 · Onderwerp 1",
        body: `
<p>'n <strong>Globale grafiek</strong> wys die algehele vorm van 'n verwantskap: hoe een hoeveelheid verander soos 'n ander verander. Jy lees eers die <em>vorm</em>, dan die getalle.</p>
<div class="def-box">
  <div class="def-box-title">📖 Kenmerke van 'n grafiek</div>
  <p><strong>Stygend</strong>: die grafiek gaan op van links na regs.<br><strong>Dalend</strong>: dit gaan af van links na regs.<br><strong>Konstant</strong>: 'n horisontale (plat) deel, niks verander nie.<br><strong>Maksimum / minimum</strong>: die hoogste / laagste punt.<br><strong>Lineêr</strong>: 'n reguit lyn. <strong>Nie-lineêr</strong>: 'n kromme.<br><strong>Kontinu</strong>: die punte is verbind, want elke tussenwaarde maak sin (tyd, temperatuur). <strong>Diskreet</strong>: aparte punte, want net heel waardes maak sin (aantal mense).</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: Sipho stap skool toe</div>
  <div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":190,"view":[0,0,28,1600],"pad":26,"axes":{"x":"tyd (min)","y":"afstand (m)","o":false,"tx":5,"ty":400},"pts":{"P0":[0,0],"P1":[10,800],"P2":[15,800],"P3":[25,1400]},"nolab":["P0","P1","P2","P3"],"seg":[["P0","P1","ac"],["P1","P2","ac"],["P2","P3","ac"]]}'></div>
  <div class="example-step"><span class="step-num">1</span><span>0 tot 10 min: die grafiek styg. Sipho stap 800 m.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>10 tot 15 min: die grafiek is konstant. Sipho staan stil (hy wag vir 'n vriend).</span></div>
  <div class="example-step"><span class="step-num">3</span><span>15 tot 25 min: weer stygend, maar minder steil: hulle stap 600 m in 10 min, stadiger as voorheen.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: temperatuur gedurende 'n dag</div>
  <div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":190,"view":[0,-4,28,21],"pad":26,"axes":{"x":"tyd (h)","y":"°C","o":false,"tx":6,"ty":5},"fn":[{"f":"8+10*Math.sin((x-8)*Math.PI/12)","c":"ac","dom":[0,24]}],"pts":{"M":[14,18],"m":[2,-2]},"dots":true,"names":{"M":"max","m":"min"},"lab":{"M":"n","m":"s"}}'></div>
  <p>Die kromme is <strong>nie-lineêr</strong> en <strong>kontinu</strong>. Dit daal tot 'n minimum van −2 °C om 02:00, styg tot 'n maksimum van 18 °C om 14:00, en daal dan weer.</p>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Steiler beteken vinniger verandering. 'n Plat deel beteken altyd “geen verandering”, nooit “opgehou teken” nie.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Sipho se stap:<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,28,1600],\"pad\":26,\"axes\":{\"x\":\"tyd (min)\",\"y\":\"afstand (m)\",\"o\":false,\"tx\":5,\"ty\":400},\"pts\":{\"P0\":[0,0],\"P1\":[10,800],\"P2\":[15,800],\"P3\":[25,1400]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>Tussen watter tye het Sipho stilgestaan?", "options": ["0 en 10 min", "10 en 15 min", "15 en 25 min", "Hy het nooit stilgestaan nie"], "answer": 1, "topic": "Interpreteer globale grafieke"},
        {"type": "input", "text": "Gebruik dieselfde grafiek van Sipho se stap.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,28,1600],\"pad\":26,\"axes\":{\"x\":\"tyd (min)\",\"y\":\"afstand (m)\",\"o\":false,\"tx\":5,\"ty\":400},\"pts\":{\"P0\":[0,0],\"P1\":[10,800],\"P2\":[15,800],\"P3\":[25,1400]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>Hoe ver het Sipho na 10 minute gestap? (m)", "answer": "800", "topic": "Interpreteer globale grafieke"},
        {"type": "mc", "text": "'n Grafiek wat van links na regs opgaan, is:", "options": ["stygend", "dalend", "konstant", "diskreet"], "answer": 0, "topic": "Interpreteer globale grafieke"},
        {"type": "mc", "text": "'n Horisontale deel van 'n grafiek wys dat die hoeveelheid:", "options": ["vinnig styg", "daal", "konstant is", "by 'n minimum is"], "answer": 2, "topic": "Interpreteer globale grafieke"},
        {"type": "mc", "text": "'n Grafiek wys die aantal leerders in 'n klas op elke skooldag. Moet die punte verbind word?", "options": ["Ja, die data is kontinu", "Nee, die data is diskreet", "Ja, want dit is lineêr", "Nee, want dit daal"], "answer": 1, "topic": "Interpreteer globale grafieke"},
        {"type": "mc", "text": "Die hoogste punt op 'n grafiek word genoem die:", "options": ["oorsprong", "minimum", "afsnit", "maksimum"], "answer": 3, "topic": "Interpreteer globale grafieke"},
        {"type": "mc", "text": "Watter een van hierdie grafieke is nie-lineêr?", "options": ["'n Reguit lyn wat opgaan", "'n Reguit lyn wat afgaan", "'n Kromme", "'n Horisontale lyn"], "answer": 2, "topic": "Interpreteer globale grafieke"},
      ]
    },
    {
      id: 2002,
      name: "Teken globale grafieke",
      fullName: "Teken globale grafieke uit beskrywings van situasies",
      lesson: {
        heading: "Teken globale grafieke",
        sub: "Hoofstuk 20 · Onderwerp 2",
        body: `
<p>Om 'n globale grafiek uit 'n beskrywing te teken, het jy nie presiese getalle nodig nie. Besluit wat op elke as kom, en skets dan elke deel van die storie in volgorde.</p>
<div class="def-box">
  <div class="def-box-title">📖 Vier stappe</div>
  <p>1. Plaas die veranderlike wat vanself verander (gewoonlik tyd) op die horisontale as.<br>2. Plaas die hoeveelheid wat jy meet op die vertikale as.<br>3. Verdeel die storie in dele: styg, daal of bly die hoeveelheid konstant in elke deel? Vinnig of stadig?<br>4. Skets elke deel: steil vir vinnige verandering, flou vir stadige verandering, plat vir geen verandering.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: 'n bad volmaak en uitlaat</div>
  <div class="example-step"><span class="step-num">1</span><span>Storie: 'n bad word teen 'n konstante tempo volgemaak, vol gelaat terwyl iemand bad, en dan vinnig uitgelaat.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Asse: tyd dwarsoor, watervlak op.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Dele: konstante styging (reguit lyn op), konstant (plat), vinnige daling (steil lyn af).</span></div>
  <div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":170,"pad":26,"view":[0,0,10,10],"axes":{"x":"tyd","y":"vlak","o":false},"pts":{"A":[0,0],"B":[4,8],"C":[7,8],"D":[8.5,0]},"nolab":["A","B","C","D"],"seg":[["A","B","ac"],["B","C","ac"],["C","D","ac"]],"txt":[[2,6.5,"volmaak","mu"],[5.5,9,"vol","mu"],[9.2,4.5,"uitlaat","mu"]]}'></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Toets jou skets deur die storie terug te vertel uit die grafiek. As die storie nie pas nie, verander die grafiek.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "'n Bad word teen 'n konstante tempo volgemaak, 'n ruk lank vol gelaat, en dan vinnig uitgelaat. Watter grafiek wys die watervlak?", "options": ["<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":120,\"h\":80,\"pad\":10,\"view\":[0,0,10,10],\"axes\":{\"x\":\" \",\"y\":\" \",\"o\":false},\"pts\":{\"P0\":[0,0],\"P1\":[4,8],\"P2\":[7,8],\"P3\":[8.5,0]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>", "<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":120,\"h\":80,\"pad\":10,\"view\":[0,0,10,10],\"axes\":{\"x\":\" \",\"y\":\" \",\"o\":false},\"pts\":{\"P0\":[0,8],\"P1\":[3,0],\"P2\":[6,0],\"P3\":[9,8]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>", "<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":120,\"h\":80,\"pad\":10,\"view\":[0,0,10,10],\"axes\":{\"x\":\" \",\"y\":\" \",\"o\":false},\"pts\":{\"P0\":[0,0],\"P1\":[9,9]},\"nolab\":[\"P0\",\"P1\"],\"seg\":[[\"P0\",\"P1\",\"ac\"]]}'></div>", "<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":120,\"h\":80,\"pad\":10,\"view\":[0,0,10,10],\"axes\":{\"x\":\" \",\"y\":\" \",\"o\":false},\"pts\":{\"P0\":[0,0],\"P1\":[2,8],\"P2\":[9,8]},\"nolab\":[\"P0\",\"P1\",\"P2\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"]]}'></div>"], "answer": 0, "topic": "Teken globale grafieke"},
        {"type": "mc", "text": "'n Motor versnel uit rus, ry teen 'n konstante spoed, en rem dan tot stilstand. Op 'n spoed-tyd-grafiek is die middelste deel:", "options": ["stygend", "dalend", "konstant (horisontaal)", "net 'n maksimum punt"], "answer": 2, "topic": "Teken globale grafieke"},
        {"type": "mc", "text": "'n Kers brand teen 'n konstante tempo af. Sy hoogte teenoor tyd is:", "options": ["stygend en lineêr", "dalend en lineêr", "konstant", "stygend en nie-lineêr"], "answer": 1, "topic": "Teken globale grafieke"},
        {"type": "mc", "text": "Wanneer jy 'n globale grafiek van 'n storie skets, kom tyd gewoonlik op die:", "options": ["horisontale as", "vertikale as", "albei asse", "nie een van die asse nie"], "answer": 0, "topic": "Teken globale grafieke"},
        {"type": "mc", "text": "'n Leerder fiets stadig teen 'n bult uit, en dan vinnig aan die ander kant af. Op 'n afstand-tyd-grafiek is die afdraande deel:", "options": ["minder steil as die opdraande deel", "steiler as die opdraande deel", "horisontaal", "afwaarts"], "answer": 1, "topic": "Teken globale grafieke"},
        {"type": "mc", "text": "'n Plant groei eers vinnig, dan al hoe stadiger. Sy hoogte teenoor tyd is:", "options": ["'n reguit lyn wat opgaan", "'n horisontale lyn", "dalend", "'n kromme wat eers steil styg, dan afplat"], "answer": 3, "topic": "Teken globale grafieke"},
      ]
    },
    {
      id: 2003,
      name: "Stip punte en teken grafieke",
      fullName: "Die Cartesiese vlak, geordende pare, en grafieke uit tabelle teken",
      lesson: {
        heading: "Stip punte en teken grafieke",
        sub: "Hoofstuk 20 · Onderwerp 3",
        body: `
<p>Die <strong>Cartesiese vlak</strong> het 'n horisontale x-as en 'n vertikale y-as wat by die <strong>oorsprong</strong> O(0 ; 0) kruis. Elke punt word met 'n <strong>geordende paar</strong> (x ; y) benoem: gaan eers dwarsoor, dan op of af.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":260,"h":260,"view":[-5,-5,5,5],"grid":1,"axes":{"ticks":1},"pts":{"A":[3,2],"B":[-2,4],"C":[-4,-1],"D":[2,-3]},"dots":true,"lab":{"A":"ne","B":"ne","C":"nw","D":"se"}}'></div>
<div class="def-box">
  <div class="def-box-title">📖 Lees die punte</div>
  <p>A(3 ; 2), B(−2 ; 4), C(−4 ; −1), D(2 ; −3).<br>Die asse verdeel die vlak in vier <strong>kwadrante</strong>, antikloksgewys genommer van regs bo: I (+ ; +), II (− ; +), III (− ; −), IV (+ ; −).</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: van 'n tabel na 'n grafiek</div>
  <div class="example-step"><span class="step-num">1</span><span>Reël: y = 2x + 1. Maak 'n tabel:</span></div>
  <div class="math-block">x  │ 0   1   2   3
y  │ 1   3   5   7</div>
  <div class="example-step"><span class="step-num">2</span><span>Stip elke paar (x ; y) as 'n punt.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Die punte lê op 'n reguit lyn, so die grafiek is <strong>lineêr</strong>. Verbind hulle met 'n liniaal.</span></div>
  <div class="mf-fig" data-fig='{"t":"geo","w":260,"h":260,"view":[-1,-1,4,8],"grid":1,"axes":{"ticks":1},"fn":[{"f":"2*x+1","c":"ac","dom":[-0.5,3.4]}],"pts":{"(0;1)":[0,1],"(1;3)":[1,3],"(2;5)":[2,5],"(3;7)":[3,7]},"dots":true,"lab":{"(0;1)":"nw","(1;3)":"nw","(2;5)":"nw","(3;7)":"nw"}}'></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>x kom eerste, soos in die alfabet: stap eers met die gang langs (x) voordat jy die trap op gaan (y).</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "In watter kwadrant is die punt (3 ; −2)?", "options": ["I", "II", "III", "IV"], "answer": 3, "topic": "Stip punte en teken grafieke"},
        {"type": "input", "text": "Punt P is 4 eenhede regs van die oorsprong en 3 eenhede af. Skryf sy koördinate as (x ; y).", "answer": "(4 ; -3)", "topic": "Stip punte en teken grafieke"},
        {"type": "mc", "text": "Watter punt lê op die y-as?", "options": ["(5 ; 0)", "(0 ; 5)", "(5 ; 5)", "(−5 ; 5)"], "answer": 1, "topic": "Stip punte en teken grafieke"},
        {"type": "mc", "text": "Punte op 'n rooster:<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"w\":260,\"h\":260,\"view\":[-5,-5,5,5],\"grid\":1,\"axes\":{\"ticks\":1},\"pts\":{\"A\":[3,2],\"B\":[-2,4],\"C\":[-4,-1],\"D\":[2,-3]},\"dots\":true,\"lab\":{\"A\":\"ne\",\"B\":\"ne\",\"C\":\"nw\",\"D\":\"se\"}}'></div>Watter punt is (−2 ; 4)?", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Stip punte en teken grafieke"},
        {"type": "input", "text": "Vir y = 2x + 1, voltooi die tabel: wanneer x = 3, is y = ?", "answer": "7", "topic": "Stip punte en teken grafieke"},
        {"type": "input", "text": "Vir y = 3x − 2, wat is y wanneer x = −1?", "answer": "-5", "topic": "Stip punte en teken grafieke"},
        {"type": "mc", "text": "Die punte (0 ; 1), (1 ; 3), (2 ; 5) en (3 ; 7) lê almal op:", "options": ["'n reguit lyn", "'n kromme", "die x-as", "'n sirkel"], "answer": 0, "topic": "Stip punte en teken grafieke"},
      ]
    },
    {
      id: 2004,
      name: "Hfst 20 Eksamenfokus",
      fullName: "Eksamenoefening: grafieke interpreteer, teken en stip",
      lesson: {
        heading: "Hoofstuk 20 eksamenfokus",
        sub: "Hoofstuk 20 · Onderwerp 4",
        body: `
<p>Eksamenvrae oor grafieke vra gewoonlik dat jy 'n grafiek in woorde <strong>beskryf</strong>, 'n grafiek by 'n storie <strong>pas</strong>, waardes van 'n grafiek <strong>aflees</strong>, of punte uit 'n tabel <strong>stip</strong>.</p>
<div class="def-box">
  <div class="def-box-title">📖 Woorde om te gebruik wanneer jy 'n grafiek beskryf</div>
  <p>stygend · dalend · konstant · maksimum · minimum · lineêr · nie-lineêr · kontinu · diskreet · steil (vinnig) · flou (stadig)</p>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Gee altyd die interval: “die temperatuur styg <em>van 02:00 tot 14:00</em>” verdien meer punte as “die temperatuur styg”.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "'n Taxi se afstand vanaf die staanplek teenoor tyd is 5 minute lank plat. Gedurende daardie 5 minute:", "options": ["ry die taxi vinnig", "ry die taxi terug staanplek toe", "staan die taxi stil", "versnel die taxi"], "answer": 2, "topic": "Hfst 20 Eksamenfokus"},
        {"type": "input", "text": "Gebruik Sipho se stap.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,28,1600],\"pad\":26,\"axes\":{\"x\":\"tyd (min)\",\"y\":\"afstand (m)\",\"o\":false,\"tx\":5,\"ty\":400},\"pts\":{\"P0\":[0,0],\"P1\":[10,800],\"P2\":[15,800],\"P3\":[25,1400]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>Hoeveel meter het Sipho tussen 15 en 25 minute gestap?", "answer": "600", "topic": "Hfst 20 Eksamenfokus"},
        {"type": "mc", "text": "In watter kwadrant is albei koördinate negatief?", "options": ["I", "II", "III", "IV"], "answer": 2, "topic": "Hfst 20 Eksamenfokus"},
        {"type": "mc", "text": "Die koste om 1, 2, 3 … kaartjies te koop word gestip. Die grafiek is:", "options": ["kontinu", "diskreet", "nie-lineêr en kontinu", "konstant"], "answer": 1, "topic": "Hfst 20 Eksamenfokus"},
        {"type": "input", "text": "Vir y = 5 − x, wat is y wanneer x = 2?", "answer": "3", "topic": "Hfst 20 Eksamenfokus"},
        {"type": "mc", "text": "'n Bal word opgegooi en val terug. Sy hoogte teenoor tyd het 'n:", "options": ["maksimum", "minimum", "net 'n konstante deel", "reguitlynvorm"], "answer": 0, "topic": "Hfst 20 Eksamenfokus"},
      ]
    },
  ],
  workbook: {
    "chapter": 20,
    "chapterName": "Grafieke",
    "topics": [
      {
        "name": "Interpreteer globale grafieke",
        "questions": [
          {
            "num": "1",
            "text": "Nomsa fiets winkel toe. Die grafiek van haar afstand van die huis af: 0–8 min styg tot 2 km, 8–20 min bly op 2 km, 20–30 min daal terug na 0 km.",
            "parts": [
              {
                "label": "a)",
                "text": "Beskryf wat Nomsa in elk van die drie dele doen.",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "Was sy vinniger op pad winkel toe of terug huis toe? Verduidelik met die grafiek.",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "Is die grafiek diskreet of kontinu? Hoekom?",
                "marks": 2
              }
            ]
          }
        ]
      },
      {
        "name": "Teken globale grafieke",
        "questions": [
          {
            "num": "2",
            "text": "Skets 'n globale grafiek vir elke storie. Benoem die asse.",
            "parts": [
              {
                "label": "a)",
                "text": "'n Ketel verhit water van 20 °C tot 100 °C, skakel dan af en die water koel stadig af.",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "'n Vliegtuig klim tot sy kruishoogte, vlieg twee uur lank gelyk, en daal dan om te land.",
                "marks": 3
              }
            ]
          }
        ]
      },
      {
        "name": "Stip punte en teken grafieke",
        "questions": [
          {
            "num": "3",
            "text": "y = 3 − x",
            "parts": [
              {
                "label": "a)",
                "text": "Voltooi 'n tabel van waardes vir x = −1, 0, 1, 2, 3.",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "Stip die punte op 'n Cartesiese vlak en teken die grafiek.",
                "marks": 3
              },
              {
                "label": "c)",
                "text": "Waar sny die grafiek die y-as?",
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
        "name": "Interpreteer globale grafieke",
        "answers": [
          {
            "num": "Q1a",
            "ans": "0–8 min: sy fiets 2 km winkel toe (stygend). 8–20 min: sy is by die winkel (konstant). 20–30 min: sy fiets huis toe (dalend).",
            "note": "Een punt per deel, met die tydinterval."
          },
          {
            "num": "Q1b",
            "ans": "Vinniger op pad winkel toe: 2 km in 8 min, teenoor 2 km in 10 min terug.",
            "note": "Die steiler deel van die grafiek is die vinniger deel."
          },
          {
            "num": "Q1c",
            "ans": "Kontinu: tyd en afstand kan enige tussenwaarde aanneem.",
            "note": ""
          }
        ]
      },
      {
        "name": "Teken globale grafieke",
        "answers": [
          {
            "num": "Q2a",
            "ans": "Tyd dwarsoor, temperatuur op: begin by 20, styg (lineêr of effens gebuig) tot 100, dan 'n kromme wat al hoe stadiger daal.",
            "note": "Gee punte vir asse, styging, maksimum by 100, stadige daling."
          },
          {
            "num": "Q2b",
            "ans": "Tyd dwarsoor, hoogte op: styg, konstant (plat) vir twee uur, daal dan tot 0.",
            "note": ""
          }
        ]
      },
      {
        "name": "Stip punte en teken grafieke",
        "answers": [
          {
            "num": "Q3a",
            "ans": "x: −1, 0, 1, 2, 3 → y: 4, 3, 2, 1, 0",
            "note": "Vervang elke x in y = 3 − x."
          },
          {
            "num": "Q3b",
            "ans": "'n Reguit lyn deur (−1 ; 4), (0 ; 3), (1 ; 2), (2 ; 1) en (3 ; 0).",
            "note": "Dalend en lineêr."
          },
          {
            "num": "Q3c",
            "ans": "By (0 ; 3).",
            "note": "Stel x = 0."
          }
        ]
      }
    ]
  }
});
