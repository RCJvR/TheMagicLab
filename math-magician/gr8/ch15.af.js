// Math Magician — Grade 8, Chapter 15 data (Afrikaans)
// Surface Area and Volume

MathMagician.registerChapter(15, {
  topics: [
    {
      id: 1501,
      chapter: 15,
      name: "Oppervlakte van kubusse en prismas",
      fullName: "Die oppervlakte van kubusse en reghoekige prismas",
      lesson: {
        heading: "Oppervlakte van kubusse en reghoekige prismas",
        sub: "Hoofstuk 15 · Onderwerp 1",
        body: `
          <p>Die <strong>oppervlakte</strong> is die totale area van al die vlakke van 'n 3D-voorwerp. Dit word in vierkante eenhede gemeet (cm², m²).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formules</div>
            <p>
              <strong>Kubus</strong> (sy = s): 6 gelyke vierkantige vlakke.<br>
              <span class="math">O = 6s²</span><br><br>
              <strong>Reghoekige prisma</strong> (boks) met lengte l, breedte b, hoogte h:<br>
              3 pare reghoeke: bo/onder, voor/agter, links/regs.<br>
              <span class="math">O = 2(lb + lh + bh)</span><br><br>
              <strong>Uitslaanpatrone:</strong> vou die 3D-vorm oop in 'n plat uitslaanpatroon om al die vlakke te sien.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Kubus s = 4 cm: <span class="math">O = 6 × 4² = 6 × 16 = 96 cm²</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Boks 5 × 3 × 2: <span class="math">O = 2(5×3 + 5×2 + 3×2) = 2(15+10+6) = 2(31) = 62 cm²</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Teken en benoem die uitslaanpatroon voordat jy bereken. Benoem elke vlak se afmetings — dit voorkom dat jy vlakke mis of verkeerde afmetings gebruik.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken die oppervlakte van 'n kubus met sy 5 cm.", answer: "150", topic: "Oppervlakte" },
        { type: "mc", text: "Bereken die oppervlakte van 'n reghoekige prisma met l = 8, b = 3, h = 4.", options: ["96 cm²", "136 cm²", "192 cm²", "112 cm²"], answer: 1, topic: "Oppervlakte" },
        { type: "input", text: "'n Kubus het 'n oppervlakte van 294 cm². Bereken sy sylengte.", answer: "7", topic: "Oppervlakte" },
        { type: "mc", text: "'n Reghoekige boks is 10 × 6 × 4 cm. Hoeveel cm² karton word benodig om dit te maak?", options: ["240 cm²", "248 cm²", "208 cm²", "480 cm²"], answer: 1, topic: "Oppervlakte" },
        { type: "input", text: "Bereken die oppervlakte van 'n reghoekige prisma met l = 9, b = 5, h = 3.", answer: "174", topic: "Oppervlakte" },
        { type: "input", text: "'n Reghoekige prisma het 'n oppervlakte van 190 cm², lengte 7 cm, en breedte 5 cm. Bereken die hoogte.", answer: "5", topic: "Oppervlakte" },
        { type: "input", text: "'n Kubusvormige boks (sy 8 cm) word met geskenkpapier toegedraai, met 10% ekstra toelaag vir oorvleueling. Bereken die totale area geskenkpapier wat benodig word, tot die naaste cm².", answer: "422", topic: "Oppervlakte" },
      ]
    },
    {
      id: 1502,
      chapter: 15,
      name: "Oppervlakte van driehoekige prismas",
      fullName: "Die oppervlakte van driehoekige prismas",
      lesson: {
        heading: "Die oppervlakte van driehoekige prismas",
        sub: "Hoofstuk 15 · Onderwerp 2",
        body: `
          <p>'n <strong>Driehoekige prisma</strong> het 2 driehoekige vlakke en 3 reghoekige vlakke.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formule</div>
            <p>
              <span class="math">O = 2 × (area van driehoek) + (omtrek van driehoek × lengte)</span><br><br>
              Of uitdruklik:<br>
              <span class="math">O = 2 × (½ × b × h) + (a + b + c) × L</span><br><br>
              waar b = driehoek se basis, h = driehoek se hoogte, a, b, c = driehoek se sye, L = prisma se lengte.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>Reghoekige driehoekige prisma: driehoek se bene 3, 4, skuinssy 5. Prisma se lengte L = 10.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Area van driehoek: <span class="math">½ × 3 × 4 = 6 cm²</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Omtrek van driehoek: <span class="math">3 + 4 + 5 = 12 cm</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">O = 2(6) + 12 × 10 = 12 + 120 = 132 cm²</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Bepaal altyd eers die omtrek van die driehoek-deursnee — dit gee die gekombineerde breedte van die drie reghoekige vlakke.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Driehoekige prisma het 'n reghoekige driehoek met bene 6 en 8 (skuinssy 10) as sy deursnee, en lengte 12 cm. Bereken die oppervlakte.", answer: "336", topic: "Oppervlakte" },
        { type: "mc", text: "'n Driehoekige prisma het gelyksydige driehoekvlakke met sy 4 cm, en lengte 9 cm. Bereken die oppervlakte. (Gebruik √3 ≈ 1.732)", options: ["124.9 cm²", "121.9 cm²", "108 cm²", "136 cm²"], answer: 0, topic: "Oppervlakte" },
        { type: "input", text: "'n Driehoekige prisma het 'n driehoek-area van 15 cm², driehoek-omtrek van 18 cm, en lengte 7 cm. Bereken die oppervlakte.", answer: "156", topic: "Oppervlakte" },
        { type: "mc", text: "Hoeveel vlakke het 'n driehoekige prisma?", options: ["3", "4", "5", "6"], answer: 2, topic: "Oppervlakte" },
        { type: "input", text: "'n Driehoekige prisma het 'n driehoek-basis van 10 cm, hoogte 6 cm, drie sye 10, 8, 8 cm, en lengte 15 cm. Bereken die oppervlakte.", answer: "570", topic: "Oppervlakte" },
        { type: "input", text: "'n Driehoekige prisma het 'n reghoekige driehoek-deursnee met bene 9 cm en 12 cm (skuinssy 15 cm) en lengte 20 cm. Bereken die oppervlakte.", answer: "828", topic: "Oppervlakte" },
        { type: "input", text: "Twee driehoekige prismas het identiese driehoekige deursnee (area 20 cm², omtrek 24 cm) maar verskillende lengtes: Prisma A is 10 cm lank en Prisma B is 15 cm lank. Bereken die verskil tussen hul oppervlaktes.", answer: "120", topic: "Oppervlakte" },
      ]
    },
    {
      id: 1503,
      chapter: 15,
      name: "Volume van kubusse en prismas",
      fullName: "Die volume en inhoud van kubusse en reghoekige prismas",
      lesson: {
        heading: "Volume en inhoud van kubusse en reghoekige prismas",
        sub: "Hoofstuk 15 · Onderwerp 3",
        body: `
          <p><strong>Volume</strong> is die hoeveelheid 3D-ruimte wat 'n vaste voorwerp beslaan. <strong>Inhoud</strong> is hoeveel vloeistof 'n hol houer kan bevat. Albei gebruik dieselfde formule maar verskillende eenhede.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formules en eenheidsomskakelings</div>
            <p>
              <strong>Kubus:</strong> <span class="math">V = s³</span><br>
              <strong>Reghoekige prisma:</strong> <span class="math">V = l × b × h</span><br><br>
              <strong>Volume-eenhede:</strong> cm³, m³, mm³<br>
              <strong>Inhoud-eenhede:</strong> ml, liter (ℓ)<br><br>
              <strong>Omskakelings:</strong><br>
              <span class="math">1 cm³ = 1 ml</span><br>
              <span class="math">1 000 cm³ = 1 liter</span><br>
              <span class="math">1 m³ = 1 000 000 cm³ = 1 000 liter</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Kubus s = 3 cm: <span class="math">V = 3³ = 27 cm³ = 27 ml</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Boks 10 × 8 × 5: <span class="math">V = 400 cm³ = 0.4 liter</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Swembad 25 × 10 × 2 m: <span class="math">V = 500 m³ = 500 000 liter</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Volume- en Inhoudberekenaar</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:8px 0 12px;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:12px;">l =</span>
              <input id="vlL" type="number" value="10" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:12px;">b =</span>
              <input id="vlB" type="number" value="8" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:12px;">h =</span>
              <input id="vlH" type="number" value="5" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:rgba(221,225,240,0.30);font-size:11px;">(cm)</span>
              <button id="vlBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="vlOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const l=parseFloat(document.getElementById('vlL').value)||0;
              const b=parseFloat(document.getElementById('vlB').value)||0;
              const h=parseFloat(document.getElementById('vlH').value)||0;
              const el=document.getElementById('vlOut');
              const v=l*b*h;
              el.innerHTML='<div><span style="opacity:0.5;">V = '+l+' × '+b+' × '+h+' = </span><span style="color:#fbbf24;">'+v+' cm³</span></div>'+
                '<div><span style="opacity:0.5;">Inhoud = </span><span style="color:#6ee7b7;">'+v+' ml = '+(v/1000)+' liter</span></div>';
            }
            document.getElementById('vlBtn').addEventListener('click',calc);

          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>1 cm³ = 1 ml is die sleutelverband tussen volume en inhoud. 'n Kubus met sy 1 cm bevat presies 1 ml water.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken die volume van 'n kubus met sy 6 cm.", answer: "216", topic: "Volume" },
        { type: "mc", text: "'n Reghoekige prisma is 12 cm × 5 cm × 4 cm. Bereken sy volume.", options: ["240 cm³", "120 cm³", "480 cm³", "96 cm³"], answer: 0, topic: "Volume" },
        { type: "input", text: "Skakel 2 500 cm³ om na liter.", answer: "2.5", topic: "Volume" },
        { type: "mc", text: "'n Vistenk is 60 cm × 30 cm × 40 cm. Hoeveel liter bevat dit?", options: ["72 ℓ", "720 ℓ", "7 200 ℓ", "7.2 ℓ"], answer: 0, topic: "Volume" },
        { type: "input", text: "'n Reghoekige prisma het volume 360 cm³, lengte 12 cm, en breedte 5 cm. Bereken die hoogte.", answer: "6", topic: "Volume" },
        { type: "input", text: "'n Reghoekige vistenk is 80 cm by 40 cm by 50 cm. Dit word tot 75% van sy kapasiteit gevul. Hoeveel liter water bevat dit?", answer: "120", topic: "Volume" },
        { type: "input", text: "'n Kubusvormige watertenk het 'n volume van 8 000 liter. Bereken die lengte van een sy van die tenk in meter.", answer: "2", topic: "Volume" },
      ]
    },
    {
      id: 1504,
      chapter: 15,
      name: "Volume van driehoekige prismas",
      fullName: "Die volume en inhoud van driehoekige prismas",
      lesson: {
        heading: "Volume en inhoud van driehoekige prismas",
        sub: "Hoofstuk 15 · Onderwerp 4",
        body: `
          <p>Die volume van enige prisma is die area van sy deursnee (basis) vermenigvuldig met sy lengte.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formule</div>
            <p>
              <span class="math">V = Area van basis × lengte</span><br>
              Vir 'n driehoekige prisma:<br>
              <span class="math">V = (½ × b × h) × L</span><br><br>
              waar b = driehoek se basis, h = driehoek se hoogte, L = prisma se lengte.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>Driehoekige prisma: driehoek se basis 8 cm, hoogte 5 cm, lengte 12 cm.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Area van driehoek: <span class="math">½ × 8 × 5 = 20 cm²</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">V = 20 × 12 = 240 cm³ = 240 ml = 0.24 liter</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Die "lengte" van 'n prisma is die afmeting wat deur die vorm loop — dit is loodreg op die deursneevlak. Moenie dit verwar met die sye van die driehoek nie.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Driehoekige prisma het 'n driehoek-basis van 10 cm, hoogte 6 cm, en lengte 15 cm. Bereken die volume.", answer: "450", topic: "Volume" },
        { type: "mc", text: "'n Driehoekige prisma het reghoekige driehoek-bene 5 en 12, en prisma-lengte 8. Bereken die volume.", options: ["240 cm³", "480 cm³", "120 cm³", "960 cm³"], answer: 0, topic: "Volume" },
        { type: "input", text: "Skakel 4 500 cm³ om na liter.", answer: "4.5", topic: "Volume" },
        { type: "mc", text: "'n Driehoekige prisma het volume 630 cm³ en driehoekige deursnee-area 42 cm². Bereken sy lengte.", options: ["15 cm", "12 cm", "18 cm", "25 cm"], answer: 0, topic: "Volume" },
        { type: "input", text: "'n Tent is soos 'n driehoekige prisma gevorm. Driehoek se basis = 4 m, hoogte = 3 m, lengte = 6 m. Bereken sy volume in m³.", answer: "36", topic: "Volume" },
        { type: "input", text: "'n Driehoekige prisma het 'n reghoekige driehoekige deursnee met bene 9 cm en 12 cm, en lengte 25 cm. Bereken die volume in liter.", answer: "1.35", topic: "Volume" },
        { type: "input", text: "'n Sjokoladestafie (driehoekige prisma) het volume 300 cm³ en sy driehoekige deursnee het area 25 cm². Die stafie word in 4 gelyke-lengte stukke oor sy lengte gesny. Bereken die lengte van elke stuk in cm.", answer: "3", topic: "Volume" },
      ]
    },
    {
      id: 1505,
      chapter: 15,
      name: "Effek van skaalfaktore",
      fullName: "Die effek van skaalfaktore op oppervlakte en volume",
      lesson: {
        heading: "Die effek van skaalfaktore op oppervlakte en volume",
        sub: "Hoofstuk 15 · Onderwerp 5",
        body: `
          <p>Wanneer 'n 3D-vorm geskaleer word, verander die oppervlakte en volume met verskillende faktore.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Reëls vir skaalfaktore</div>
            <p>
              As alle afmetings met skaalfaktor <strong>k</strong> vermenigvuldig word:<br><br>
              <strong>Lineêre afmetings</strong> (lengte, breedte, hoogte): word met <span class="math">k</span> vermenigvuldig<br>
              <strong>Oppervlakte:</strong> neem meer toe as die lengte<br>
              <strong>Volume:</strong> neem selfs meer toe as die oppervlakte<br><br>              <em>Ondersoek deur voor en na te bereken — sien die voorbeeld hieronder.</em><br><br>
              <strong>Voorbeeld:</strong> 'n Kubus met sy 2 cm word geskaleer met k = 3 (nuwe sy = 6 cm).<br>
              Oorspronklik: O = 24 cm², V = 8 cm³<br>
              Nuut: O = 24 × 9 = 216 cm², V = 8 × 27 = 216 cm³<br>
              Kontroleer: 6³ = 216 ✓, 6×O van eenheidskubus: 6×36=216 ✓
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer jy al die afmetings verdubbel, vermenigvuldig die oppervlakte met 4 en die volume met 8. Gebruik die ondersoek-benadering: bereken beide die oorspronklike en geskaleerde vorms en vergelyk die resultate.</span></div>
        <div class="tip-box" style="border-color:rgba(245,158,11,0.30);background:rgba(245,158,11,0.08);"><span class="tip-icon">📚</span><span><strong>Graad 9:</strong> Die formele reël (O skaleer met k², Volume met k³) word in Graad 9 veralgemeen. In Graad 8 moet jy kan ondersoek en beskryf wat gebeur — nie die algebraïese reël noem nie.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "'n Kubus se sy word verdubbel. Met watter faktor neem sy volume toe?", options: ["2", "4", "6", "8"], answer: 3, topic: "Skaal" },
        { type: "input", text: "'n Reghoekige prisma het O = 94 cm². As alle afmetings verdriedubbel word, bereken die nuwe O.", answer: "846", topic: "Skaal" },
        { type: "mc", text: "'n Vorm het volume 40 cm³. Sy afmetings word gehalveer. Wat is die nuwe volume?", options: ["20 cm³", "10 cm³", "5 cm³", "80 cm³"], answer: 2, topic: "Skaal" },
        { type: "input", text: "'n Kubus het volume 27 cm³. Sy sy word verdubbel. Bereken die nuwe volume.", answer: "216", topic: "Skaal" },
        { type: "mc", text: "'n Kubus het sy 3 cm. Sy afmetings word verdubbel tot 6 cm. Met watter faktor neem die oppervlakte toe?", options: ["2", "4", "6", "8"], answer: 1, topic: "Skaal" },
        { type: "input", text: "'n Kubus het volume 64 cm³. Sy afmetings word opgeskaal sodat die nuwe volume 1 728 cm³ is. Met watter faktor k is die sylengtes vermenigvuldig?", answer: "3", topic: "Skaal" },
        { type: "input", text: "'n Reghoekige prisma het oppervlakte 150 cm² en volume 125 cm³. Al sy afmetings word met 'n faktor van 2 geskaleer. Bereken die nuwe volume in cm³.", answer: "1000", topic: "Skaal" },
      ]
    },
    {
      id: 1506,
      chapter: 15,
      name: "Hfst 15 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 15 — Eksamenfokus",
        sub: "Hoofstuk 15 · Hersiening",
        body: `
          <p>Oppervlakte- en volumevrae toets formule-onthou, korrekte eenheidsgebruik, en multi-stap berekening. Wys al die berekeninge duidelik.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 15-opsomming</div>
            <p>
              ✅ Kubus: O = 6s²; V = s³<br>
              ✅ Reghoekige prisma: O = 2(lb+lh+bh); V = lbh<br>
              ✅ Driehoekige prisma: O = 2(△area) + omtrek×L; V = △area × L<br>
              ✅ 1 cm³ = 1 ml; 1 000 cm³ = 1 liter<br>
              ✅ Verdubbeling van afmetings: O vermenigvuldig met 4, Volume vermenigvuldig met 8 (ondersoek, moenie die algebraïese reël in Gr 8 memoriseer nie)
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Moenie oppervlakte (2D, vierkante eenhede) met volume (3D, kubieke eenhede) verwar nie. As jy gevra word vir O maar V bereken, sal die antwoord verkeerde eenhede hê — en al die punte verloor.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Kubus het volume 512 cm³. Bereken sy oppervlakte.", answer: "384", topic: "Gemeng" },
        { type: "mc", text: "'n Driehoekige prisma (reghoekige driehoek: 9, 12, 15; lengte 20) het 'n oppervlakte van:", options: ["648 cm²", "756 cm²", "900 cm²", "594 cm²"], answer: 0, topic: "Gemeng" },
        { type: "input", text: "'n Reghoekige prisma is 8 × 5 × 4 cm. As alle afmetings verdubbel word, bereken die nuwe volume.", answer: "2560", topic: "Gemeng" },
        { type: "mc", text: "'n Boks 15 × 12 × 8 cm word met water gevul. Hoeveel liter bevat dit?", options: ["14.4 ℓ", "1.44 ℓ", "144 ℓ", "0.144 ℓ"], answer: 0, topic: "Gemeng" },
        { type: "input", text: "'n Driehoekige prisma het driehoek-area 30 cm² en lengte 14 cm. Bereken sy volume.", answer: "420", topic: "Gemeng" },
        { type: "input", text: "'n Kubusvormige boks het oppervlakte 150 cm². Bereken sy volume.", answer: "125", topic: "Gemeng" },
        { type: "input", text: "'n Reghoekige houer (20 cm × 15 cm × 10 cm) moet met kleiner kubusse van sy 5 cm gevul word. Hoeveel klein kubusse pas presies in die houer?", answer: "24", topic: "Gemeng" },
      ]
    },
  ],
  workbook: {
    chapter: 15, chapterName: "Oppervlakte en Volume",
    topics: [
      {
        name: "Oppervlakte van prismas",
        questions: [
          { num: "1", text: "Bereken die oppervlakte van elke voorwerp:", parts: [
            { label: "a)", text: "Kubus met sy 7 cm.", marks: 2 },
            { label: "b)", text: "Reghoekige prisma: l = 15 cm, b = 8 cm, h = 6 cm.", marks: 3 },
            { label: "c)", text: "Driehoekige prisma met 'n reghoekige driehoek-deursnee (bene 5 cm en 12 cm) en prisma-lengte 10 cm.", marks: 5 },
          ]},
        ]
      },
      {
        name: "Volume van prismas",
        questions: [
          { num: "2", text: "Bereken die volume van elke voorwerp:", parts: [
            { label: "a)", text: "Kubus met sy 7 cm.", marks: 1 },
            { label: "b)", text: "Reghoekige prisma: l = 15 cm, b = 8 cm, h = 6 cm.", marks: 2 },
            { label: "c)", text: "Driehoekige prisma: reghoekige driehoek met bene 5 cm en 12 cm; lengte 10 cm.", marks: 3 },
          ]},
          { num: "3", text: "Los op:", parts: [
            { label: "a)", text: "'n Kubus het oppervlakte 216 cm². Bereken sy volume.", marks: 3 },
            { label: "b)", text: "'n Reghoekige prisma het volume 1 440 cm³, breedte 8 cm, hoogte 6 cm. Bereken sy lengte.", marks: 3 },
          ]},
        ]
      },
      {
        name: "Effek van skaalfaktore",
        questions: [
          { num: "4", text: "Skaalfaktor-ondersoeke:", parts: [
            { label: "a)", text: "'n Kubus se sy word met 4 vermenigvuldig. Met watter faktor neem sy volume toe? Wys jou berekeninge.", marks: 3 },
            { label: "b)", text: "'n Prisma het oppervlakte 80 cm². Al die afmetings word verdubbel. Bereken die nuwe oppervlakte.", marks: 3 },
            { label: "c)", text: "'n Voorwerp se volume is 54 cm³. Sy afmetings word met ⅓ vermenigvuldig. Bereken die nuwe volume.", marks: 3 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 15, chapterName: "Hoofstuk 15 — Oppervlakte en Volume",
    topics: [
      {
        name: "Oppervlakte van prismas",
        answers: [
          { num: "Q1a", ans: "O = 294 cm²", note: "6×7²=6×49=294" },
          { num: "Q1b", ans: "O = 516 cm²", note: "2(15×8+15×6+8×6)=2(120+90+48)=516" },
          { num: "Q1c", ans: "O = 360 cm²", note: "Skuinssy=13; O=2(½×5×12)+(5+12+13)×10=60+300=360" },
        ]
      },
      {
        name: "Volume van prismas",
        answers: [
          { num: "Q2a", ans: "V = 343 cm³", note: "7³=343" },
          { num: "Q2b", ans: "V = 720 cm³", note: "15×8×6=720" },
          { num: "Q2c", ans: "V = 300 cm³", note: "A=½×5×12=30; V=30×10=300" },
          { num: "Q3a", ans: "V = 216 cm³", note: "6s²=216→s=6; 6³=216" },
          { num: "Q3b", ans: "l = 30 cm", note: "1440=l×8×6→l=1440÷48=30" },
        ]
      },
      {
        name: "Effek van skaalfaktore",
        answers: [
          { num: "Q4a", ans: "Volume neem toe met faktor 64", note: "k=4; nuwe V = 4³ × ou V = 64 × ou V" },
          { num: "Q4b", ans: "Nuwe O = 320 cm²", note: "Oorspronklike O=80 cm²; verdubbel afmetings: 6×(2×2)²... of: bereken O van nuwe vorm direk. 80×4=320 (O vervierdubbel wanneer afmetings verdubbel)" },
          { num: "Q4c", ans: "Nuwe V = 2 cm³", note: "Afmetings gedeel deur 3; bereken nuwe volume direk: as oorspronklike 3cm kubus, nuwe sy=1cm, V=1³=1... of 54÷27=2 (deel deur 27 wanneer alle afmetings ÷3)" },
        ]
      },
    ]
  }
});
