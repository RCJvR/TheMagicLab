// Math Magician — Grade 8, Chapter 13 data (Afrikaans)
// Stelling van Pythagoras

MathMagician.registerChapter(13, {
  topics: [
    {
      id: 1301,
      chapter: 13,
      name: "Pythagoras in reghoekige driehoeke",
      fullName: "Die stelling van Pythagoras in reghoekige driehoeke",
      lesson: {
        heading: "Die stelling van Pythagoras",
        sub: "Hoofstuk 13 · Onderwerp 1",
        body: `
          <p>Die stelling van Pythagoras beskryf die verhouding tussen die drie sye van 'n <strong>reghoekige driehoek</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Die stelling</div>
            <p>
              In 'n reghoekige driehoek is die kwadraat van die <strong>skuinssy</strong> gelyk aan die som van die kwadrate van die ander twee sye.<br><br>
              <span class="math">c² = a² + b²</span><br><br>
              waar <strong>c</strong> die skuinssy is (die sy teenoor die regte hoek — altyd die langste sy), en <strong>a</strong> en <strong>b</strong> die ander twee sye is (die bene).<br><br>
              <strong>Bepaal die skuinssy:</strong> <span class="math">c = √(a² + b²)</span><br>
              <strong>Bepaal 'n been:</strong> <span class="math">a = √(c² − b²)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Bepaal c: a = 3, b = 4. <span class="math">c² = 9 + 16 = 25 → c = 5</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Bepaal a: c = 13, b = 5. <span class="math">a² = 169 − 25 = 144 → a = 12</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Bepaal c: a = 7, b = 24. <span class="math">c² = 49 + 576 = 625 → c = 25</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Pythagoras-berekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer enige twee sye in (los die onbekende as 0) — stel c = 0 om die skuinssy te bepaal.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">a =</span>
              <input id="pyA" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">b =</span>
              <input id="pyB" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">c =</span>
              <input id="pyC" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="pyBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Los op</button>
            </div>
            <div id="pyOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function solve(){
              const a=parseFloat(document.getElementById('pyA').value)||0;
              const b=parseFloat(document.getElementById('pyB').value)||0;
              const c=parseFloat(document.getElementById('pyC').value)||0;
              const el=document.getElementById('pyOut');
              function fmt(n){return Number.isInteger(n)?n:n.toFixed(3);}
              if(c===0&&a>0&&b>0){
                const c2=a*a+b*b;
                const cv=Math.sqrt(c2);
                el.innerHTML='<div><span style="opacity:0.5;">c² = '+a+'² + '+b+'² = '+a*a+' + '+b*b+' = '+c2+'</span></div><div><span style="opacity:0.5;">c = √'+c2+' = </span><span style="color:#6ee7b7;font-size:14px;">'+fmt(cv)+'</span></div>';
              } else if(a===0&&b>0&&c>0){
                const a2=c*c-b*b;
                if(a2<0){el.innerHTML='<span style="color:#fca5a5;">Ongeldig — c moet langer as b wees.</span>';return;}
                const av=Math.sqrt(a2);
                el.innerHTML='<div><span style="opacity:0.5;">a² = '+c+'² − '+b+'² = '+c*c+' − '+b*b+' = '+a2+'</span></div><div><span style="opacity:0.5;">a = √'+a2+' = </span><span style="color:#6ee7b7;font-size:14px;">'+fmt(av)+'</span></div>';
              } else if(b===0&&a>0&&c>0){
                const b2=c*c-a*a;
                if(b2<0){el.innerHTML='<span style="color:#fca5a5;">Ongeldig — c moet langer as a wees.</span>';return;}
                const bv=Math.sqrt(b2);
                el.innerHTML='<div><span style="opacity:0.5;">b² = '+c+'² − '+a+'² = '+c*c+' − '+a*a+' = '+b2+'</span></div><div><span style="opacity:0.5;">b = √'+b2+' = </span><span style="color:#6ee7b7;font-size:14px;">'+fmt(bv)+'</span></div>';
              } else if(a>0&&b>0&&c>0){
                const check=Math.abs(a*a+b*b-c*c)<0.01;
                el.innerHTML=check?'<span style="color:#6ee7b7;">✓ Geldige reghoekige driehoek: '+a+'²+'+b+'²='+c+'²</span>':'<span style="color:#fca5a5;">✗ Nie \\'n reghoekige driehoek nie</span>';
              } else {
                el.innerHTML='<span style="color:#fca5a5;">Voer presies twee sye in (stel die onbekende op 0).</span>';
              }
            }
            document.getElementById('pyBtn').addEventListener('click',solve);
            solve();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Algemene Pythagoras-drieledes om te memoriseer: <strong>3-4-5</strong>, <strong>5-12-13</strong>, <strong>8-15-17</strong>, <strong>7-24-25</strong>. Veelvoude hiervan (6-8-10, 9-12-15) is ook reghoekige driehoeke.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bepaal die skuinssy van 'n reghoekige driehoek met bene 5 cm en 12 cm.", answer: "13", topic: "Pythagoras" },
        { type: "mc", text: "'n Reghoekige driehoek het 'n skuinssy van 17 cm en een been van 8 cm. Bepaal die ander been.", options: ["9 cm", "15 cm", "12 cm", "√225 cm"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "Bepaal die skuinssy as a = 9 en b = 12. Gee die presiese antwoord.", answer: "15", topic: "Pythagoras" },
        { type: "mc", text: "Is 'n driehoek met sye 6, 8, 10 reghoekig?", options: ["Nee", "Ja — 6²+8²=10²", "Ja — maar net toevallig", "Kan nie bepaal word nie"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "Bepaal die ontbrekende been: skuinssy = 26, een been = 24.", answer: "10", topic: "Pythagoras" },
        { type: "mc", text: "'n Reghoekige driehoek het bene in die verhouding 3:4 en 'n skuinssy van 30 cm. Bepaal die lengte van die langer been.", options: ["18 cm", "20 cm", "24 cm", "25 cm"], answer: 2, topic: "Pythagoras" },
      ]
    },
    {
      id: 1302,
      chapter: 13,
      name: "Sye en hoeke wat nie reghoekig is nie",
      fullName: "Sye en hoeke van driehoeke wat nie reghoekig is nie",
      lesson: {
        heading: "Sye en hoeke van driehoeke wat nie reghoekig is nie",
        sub: "Hoofstuk 13 · Onderwerp 2",
        body: `
          <p>Pythagoras is slegs van toepassing op reghoekige driehoeke. Vir ander driehoeke gebruik ons driehoek-eienskappe en konstrueer soms 'n loodregte hoogte om reghoekige driehoeke te skep.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Gebruik van Pythagoras in nie-reghoekige driehoeke</div>
            <p>
              Trek 'n <strong>loodregte hoogte</strong> vanaf 'n hoekpunt na die teenoorstaande basis. Dit verdeel die driehoek in twee reghoekige driehoeke, en jy kan Pythagoras op elkeen toepas.<br><br>
              <strong>Voorbeeld:</strong> Gelykbenige driehoek met gelyke sye = 10 en basis = 12.<br>
              Die hoogte verdeel die basis in twee helftes: 12 ÷ 2 = 6.<br>
              <span class="math">h² = 10² − 6² = 100 − 36 = 64 → h = 8</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld — gelyksydige driehoek</div>
            <div class="example-step"><span class="step-num">1</span><span>Gelyksydige driehoek met sy 10. Bepaal die hoogte.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Die hoogte halveer die basis: half-basis = 5.</span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">h² = 10² − 5² = 100 − 25 = 75 → h = √75 = 5√3 ≈ 8.66</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In 'n gelykbenige driehoek halveer die loodregte hoogte vanaf die apex die basis presies. In 'n gelyksydige driehoek halveer dit ook die basishoek.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Gelykbenige driehoek het gelyke sye van 13 cm en 'n basis van 10 cm. Bepaal die hoogte in cm.", answer: "12", topic: "Pythagoras" },
        { type: "mc", text: "'n Gelyksydige driehoek het 'n sy van 6 cm. Watter uitdrukking gee die hoogte daarvan?", options: ["√(36−9)", "√(36−18)", "√(36−36)", "√(18−9)"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "'n Driehoek het 'n basis van 16 cm. Die loodregte hoogte vanaf die apex is 6 cm. Bepaal die gelyke sye as dit gelykbenig is. (Elke skuinssy in cm)", answer: "10", topic: "Pythagoras" },
        { type: "mc", text: "Die stelling van Pythagoras kan SLEGS toegepas word op:", options: ["Enige driehoek", "Reghoekige driehoeke", "Gelykbenige driehoeke", "Gelyksydige driehoeke"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "'n Gelyksydige driehoek het 'n sy van 8 cm. Bereken die hoogte tot 2 desimale plekke.", answer: "6.93", topic: "Pythagoras" },
        { type: "input", text: "'n Gelykbenige driehoek het 'n omtrek van 36 cm en 'n basis van 10 cm. Bepaal die hoogte daarvan in cm.", answer: "12", topic: "Pythagoras" },
      ]
    },
    {
      id: 1303,
      chapter: 13,
      name: "Toepassings van Pythagoras",
      fullName: "Toepassings van die stelling van Pythagoras",
      lesson: {
        heading: "Toepassings van die stelling van Pythagoras",
        sub: "Hoofstuk 13 · Onderwerp 3",
        body: `
          <p>Pythagoras is van toepassing wanneer 'n regte hoek gevorm word — in argitektuur, navigasie, sportvelde, en koördinaatmeetkunde.</p>
          <div class="example-box">
            <div class="example-box-title">✏️ Werklike-wêreld toepassings</div>
            <div class="example-step"><span class="step-num">1</span><span><strong>Leerprobleem:</strong> 'n 5 m leer leun teen 'n muur, met sy voet 3 m van die muur af. Hoe hoog kom dit? <span class="math">h² = 25 − 9 = 16 → h = 4 m</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><strong>Diagonaal van 'n reghoek:</strong> 8 × 6-reghoek. <span class="math">d² = 64 + 36 = 100 → d = 10</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><strong>Afstand tussen punte:</strong> A(1, 2) en B(5, 5). <span class="math">d = √((5−1)² + (5−2)²) = √(16+9) = √25 = 5</span></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Afstandsformule</div>
            <p>
              Die afstand tussen twee punte (x₁, y₁) en (x₂, y₂) op die Cartesiese vlak:<br>
              <span class="math">d = √((x₂−x₁)² + (y₂−y₁)²)</span><br><br>
              Dit is bloot Pythagoras toegepas op horisontale en vertikale afstande.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Teken 'n diagram vir elke toepassingsprobleem. Merk die regte hoek, identifiseer die skuinssy, en pas dan c² = a² + b² toe.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Leer van 10 m lank leun teen 'n muur. Die voet daarvan is 6 m van die muur af. Hoe hoog teen die muur kom dit, in meter?", answer: "8", topic: "Pythagoras" },
        { type: "mc", text: "'n Reghoek is 9 cm × 40 cm. Wat is die lengte van die diagonaal daarvan?", options: ["41 cm", "49 cm", "38 cm", "√1681 cm"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "Bepaal die afstand tussen die punte A(0, 0) en B(5, 12).", answer: "13", topic: "Pythagoras" },
        { type: "mc", text: "'n Vierkant het 'n diagonaal van 10 cm. Wat is die sylengte daarvan? (Los in wortelvorm indien nodig)", options: ["5 cm", "5√2 cm", "√50 cm", "Beide B en C"], answer: 3, topic: "Pythagoras" },
        { type: "input", text: "Bepaal die afstand tussen A(1, 3) en B(4, 7). Rond af tot 2 desimale plekke.", answer: "5", topic: "Pythagoras" },
        { type: "input", text: "'n Leer moet 'n venster bereik wat 12 m teen 'n muur op is. Die voet van die leer moet 5 m van die muur af geplaas word. Hardewarewinkels verkoop leers slegs in heelmeter-lengtes. Wat is die kortste leerlengte (in heel meter) wat die venster sal bereik?", answer: "13", topic: "Pythagoras" },
      ]
    },
    {
      id: 1304,
      chapter: 13,
      name: "Hst 13 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 13 — Eksamenfokus",
        sub: "Hoofstuk 13 · Hersiening",
        body: `
          <p>Pythagoras-vrae kom in elke Graad 8-eksamen voor. Hulle wissel van eenvoudige sybepaling tot multi-stap toepassingsprobleme.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 13-opsomming</div>
            <p>
              ✅ Pythagoras: <span class="math">c² = a² + b²</span> (slegs reghoekige driehoeke)<br>
              ✅ Skuinssy = die sy teenoor die regte hoek (langste sy)<br>
              ✅ Bepaal 'n been: <span class="math">a = √(c² − b²)</span><br>
              ✅ Nie-reghoekige driehoeke: trek 'n loodregte hoogte, pas dan Pythagoras toe<br>
              ✅ Afstandsformule: <span class="math">d = √(Δx² + Δy²)</span><br>
              ✅ Algemene drieledes: 3-4-5, 5-12-13, 7-24-25, 8-15-17
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Identifiseer altyd eers die skuinssy — dit is teenoor die regte hoek en altyd die langste sy. Trek nooit af wanneer jy die skuinssy bepaal nie (dit is vir die bepaling van 'n been).</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Reghoekige driehoek het bene 9 en 40. Bepaal die skuinssy.", answer: "41", topic: "Gemeng" },
        { type: "mc", text: "In △ABC, ∠B = 90°. AB = 7, BC = 24. Bepaal AC.", options: ["31", "25", "√527", "17"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "'n Gelykbenige driehoek het gelyke sye van 15 cm en 'n basis van 18 cm. Bepaal die hoogte vanaf die apex.", answer: "12", topic: "Gemeng" },
        { type: "mc", text: "'n 13 m draad loop vanaf die bopunt van 'n 5 m paal na die grond. Hoe ver van die basis van die paal word dit verankeer?", options: ["8 m", "12 m", "18 m", "√144 m"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "Bepaal die afstand tussen A(−2, 1) en B(3, 13). Gee die presiese antwoord.", answer: "13", topic: "Gemeng" },
        { type: "input", text: "'n Reghoekige tuin is 24 m lank. Die diagonale paadjie daarvan meet 26 m. Bepaal die totale lengte heining wat nodig is om die tuin se omtrek te omhein EN die diagonale paadjie te bou (in m).", answer: "94", topic: "Gemeng" },
      ]
    },
  ],
  workbook: {
    chapter: 13, chapterName: "Stelling van Pythagoras",
    topics: [
      {
        name: "Pythagoras in reghoekige driehoeke",
        questions: [
          { num: "1", text: "Bepaal in elke reghoekige driehoek die onbekende sy. Los in wortelvorm waar nodig.", parts: [
            { label: "a)", text: "a = 8, b = 15, bepaal c (skuinssy).", marks: 2 },
            { label: "b)", text: "c = 20, b = 16, bepaal a.", marks: 2 },
            { label: "c)", text: "a = 7, b = 7, bepaal c.", marks: 2 },
            { label: "d)", text: "Bepaal of 'n driehoek met sye 9, 40, 41 reghoekig is. Wys jou berekeninge.", marks: 3 },
          ]},
        ]
      },
      {
        name: "Toepassings van Pythagoras",
        questions: [
          { num: "2", text: "Toepassingsprobleme:", parts: [
            { label: "a)", text: "'n Televisieskerm is 48 cm breed en 36 cm hoog. Bepaal die diagonale lengte.", marks: 3 },
            { label: "b)", text: "'n Gelykbenige driehoek het 'n basis van 20 cm en gelyke sye van 26 cm. Bereken die oppervlakte.", marks: 5 },
            { label: "c)", text: "P = (−1, 2) en Q = (5, 10). Bepaal die lengte PQ.", marks: 3 },
          ]},
          { num: "3", text: "'n Leer van 5 m lank leun teen 'n muur. Die voet daarvan is 2 m van die basis van die muur af.", parts: [
            { label: "a)", text: "Hoe hoog teen die muur kom die leer? (1 d.p.)", marks: 3 },
            { label: "b)", text: "Die voet word na 1 m van die muur af geskuif. Hoeveel hoër kom dit nou?", marks: 3 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 13, chapterName: "Hoofstuk 13 — Stelling van Pythagoras",
    topics: [
      {
        name: "Pythagoras in reghoekige driehoeke",
        answers: [
          { num: "Q1a", ans: "c = 17", note: "c²=64+225=289 → c=17" },
          { num: "Q1b", ans: "a = 12", note: "a²=400−256=144 → a=12" },
          { num: "Q1c", ans: "c = 7√2 ≈ 9.9", note: "c²=98 → c=√98=7√2" },
          { num: "Q1d", ans: "Ja, reghoekig", note: "9²+40²=81+1600=1681=41² ✓" },
        ]
      },
      {
        name: "Toepassings van Pythagoras",
        answers: [
          { num: "Q2a", ans: "60 cm", note: "d²=48²+36²=2304+1296=3600 → d=60" },
          { num: "Q2b", ans: "240 cm²", note: "h²=26²−10²=576 → h=24; A=½×20×24=240" },
          { num: "Q2c", ans: "PQ = 10", note: "√(6²+8²)=√(36+64)=√100=10" },
          { num: "Q3a", ans: "≈ 4.6 m", note: "h²=5²−2²=25−4=21 → h=√21≈4.6" },
          { num: "Q3b", ans: "≈ 0.3 m hoër", note: "h²=5²−1²=24 → h=√24≈4.9; 4.9−4.6=0.3" },
        ]
      },
    ]
  }
});
