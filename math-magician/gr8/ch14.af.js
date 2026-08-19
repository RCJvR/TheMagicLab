// Math Magician — Grade 8, Chapter 14 data (Afrikaans)
// Oppervlakte en Omtrek

MathMagician.registerChapter(14, {
  topics: [
    {
      id: 1401,
      chapter: 14,
      name: "Omtrek van 2D-vorms",
      fullName: "Die omtrek van 2D-vorms",
      lesson: {
        heading: "Die omtrek van 2D-vorms",
        sub: "Hoofstuk 14 · Onderwerp 1",
        body: `
          <p>Die <strong>omtrek</strong> is die totale afstand rondom die buitekant van 'n vorm. Dit word in lineêre eenhede gemeet (mm, cm, m, km).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Omtrekformules</div>
            <p>
              <strong>Vierkant:</strong> <span class="math">P = 4s</span><br>
              <strong>Reghoek:</strong> <span class="math">P = 2(l + b)</span><br>
              <strong>Driehoek:</strong> <span class="math">P = a + b + c</span> (som van alle sye)<br>
              <strong>Sirkel (omtrek):</strong> <span class="math">C = 2πr = πd</span><br>
              <strong>Halfsirkel (omtrek):</strong> <span class="math">P = πr + 2r</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Reghoek 8 × 5: <span class="math">P = 2(8+5) = 26 cm</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Sirkel r = 7: <span class="math">C = 2 × π × 7 = 43.98 cm</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Halfsirkel r = 10: <span class="math">P = π(10) + 2(10) = 31.42 + 20 = 51.42 cm</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir saamgestelde vorms (vorms wat uit verskeie dele bestaan), bereken slegs die omtrek van die buitegrens — moenie enige binnelyne insluit nie.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken die omtrek van 'n reghoek met lengte 12 cm en breedte 7 cm.", answer: "38", topic: "Omtrek" },
        { type: "mc", text: "'n Parallelogram het basis 14 cm en die loodregte hoogte is 6 cm. Bereken die oppervlakte.", options: ["40 cm²", "84 cm²", "42 cm²", "20 cm²"], answer: 1, topic: "Oppervlakte" },
        { type: "input", text: "'n Vierkant het omtrek 52 cm. Bereken sy sylengte.", answer: "13", topic: "Omtrek" },
        { type: "mc", text: "'n Trapesium het parallelle sye 8 cm en 12 cm, en 'n hoogte van 5 cm. Wat is sy oppervlakte?", options: ["50 cm²", "100 cm²", "40 cm²", "48 cm²"], answer: 0, topic: "Oppervlakte" },
        { type: "input", text: "'n Driehoek het sye 13 cm, 14 cm en 15 cm. Bereken die omtrek.", answer: "42", topic: "Omtrek" },
        { type: "input", text: "'n Reghoekige landerye is 3 keer so lank soos dit breed is. Sy omtrek is 96 m. Bereken die lengte van die landerye in m.", answer: "36", topic: "Omtrek" },
        { type: "input", text: "'n Tuinpaadjie is 'n reghoek 12 m by 6 m met 'n halfsirkel (radius 3 m) aangeheg langs een 6 m-sy. Bereken die totale buite-omtrek van die vorm (die verbinde 6 m-rand word nie getel nie). Gebruik π = 3.142, gee jou antwoord tot 2 desimale plekke.", answer: "39.43", topic: "Omtrek" },
      ]
    },
    {
      id: 1402,
      chapter: 14,
      name: "Oppervlaktes van 2D-vorms",
      fullName: "Oppervlaktes van 2D-vorms",
      lesson: {
        heading: "Oppervlaktes van 2D-vorms",
        sub: "Hoofstuk 14 · Onderwerp 2",
        body: `
          <p>Die <strong>oppervlakte</strong> is die hoeveelheid oppervlak wat deur 'n vorm ingesluit word. Dit word in vierkante eenhede gemeet (mm², cm², m², km²).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Oppervlakteformules</div>
            <p>
              <strong>Vierkant:</strong> <span class="math">A = s²</span><br>
              <strong>Reghoek:</strong> <span class="math">A = l × b</span><br>
              <strong>Driehoek:</strong> <span class="math">A = ½ × basis × hoogte</span> (loodregte hoogte!)<br>
              <strong>Parallelogram:</strong> <span class="math">A = basis × loodregte hoogte</span><br>
              <strong>Trapesium:</strong> <span class="math">A = ½(a + b) × h</span> waar a en b die parallelle sye is<br>
              <strong>Sirkel:</strong> <span class="math">A = πr²</span>
            </p>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Oppervlakteberekenaar</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;margin-top:8px;">
              <div style="display:flex;flex-direction:column;gap:3px;"><label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">Vorm</label>
              <select id="areaShape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="rect">Reghoek</option>
                <option value="tri">Driehoek</option>
                <option value="para">Parallelogram</option>
                <option value="trap">Trapesium</option>
              </select></div>
              <div id="areaInputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="areaBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="areaOut" style="font-family:JetBrains Mono,monospace;font-size:13px;color:#6ee7b7;"></div>
          </div>
          <script>
          (function(){
            const configs={
              rect:{fields:['Lengte','Breedte'],calc:(v)=>v[0]*v[1],formula:'l × b'},
              tri:{fields:['Basis','Hoogte'],calc:(v)=>0.5*v[0]*v[1],formula:'½ × b × h'},
              para:{fields:['Basis','Hoogte'],calc:(v)=>v[0]*v[1],formula:'b × h'},
              trap:{fields:['Sy a','Sy b','Hoogte'],calc:(v)=>0.5*(v[0]+v[1])*v[2],formula:'½(a+b)×h'},
              circ:{fields:['Radius'],calc:(v)=>Math.PI*v[0]*v[0],formula:'πr²'},
            };
            function buildInputs(shape){
              const div=document.getElementById('areaInputs');
              div.innerHTML='';
              configs[shape].fields.forEach((f,i)=>{
                const wrap=document.createElement('div');
                wrap.style.cssText='display:flex;flex-direction:column;gap:3px;';
                wrap.innerHTML='<label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">'+f+'</label><input id="af'+i+'" type="number" value="'+(i===2?5:i===1?6:8)+'" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">';
                div.appendChild(wrap);
              });
            }
            function calc(){
              const shape=document.getElementById('areaShape').value;
              const cfg=configs[shape];
              const vals=cfg.fields.map((_,i)=>parseFloat(document.getElementById('af'+i).value)||0);
              const area=cfg.calc(vals);
              document.getElementById('areaOut').innerHTML='Oppervlakte = '+cfg.formula+' = <strong>'+area.toFixed(3).replace(/\.?0+$/,'')+' eenhede²</strong>';
            }
            document.getElementById('areaShape').addEventListener('change',function(){buildInputs(this.value);});
            document.getElementById('areaBtn').addEventListener('click',calc);
            buildInputs('rect');
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Die hoogte in oppervlakteformules is altyd die <strong>loodregte</strong> hoogte — die kortste afstand tussen die basis en die teenoorgestelde sy. Dit is nie altyd 'n sy van die vorm nie.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken die oppervlakte van 'n driehoek met basis 14 cm en loodregte hoogte 9 cm.", answer: "63", topic: "Oppervlakte" },
        { type: "mc", text: "Bereken die oppervlakte van 'n sirkel met radius 6 cm. (Gebruik π = 3.142)", options: ["37.70 cm²", "113.10 cm²", "56.55 cm²", "226.19 cm²"], answer: 1, topic: "Oppervlakte" },
        { type: "input", text: "'n Trapesium het parallelle sye 8 cm en 14 cm, en loodregte hoogte 5 cm. Bereken sy oppervlakte.", answer: "55", topic: "Oppervlakte" },
        { type: "mc", text: "'n Parallelogram het basis 12 cm en hoogte 7 cm. Bereken sy oppervlakte.", options: ["38 cm²", "42 cm²", "84 cm²", "19 cm²"], answer: 2, topic: "Oppervlakte" },
        { type: "input", text: "Bereken die oppervlakte van 'n reghoek met lengte 3.5 m en breedte 2.4 m.", answer: "8.4", topic: "Oppervlakte" },
        { type: "input", text: "'n Saamgestelde vorm is 'n reghoek 10 cm by 6 cm met 'n reghoekige driehoek (basis 6 cm, hoogte 4 cm) aangeheg langs een 6 cm-sy. Bereken die totale oppervlakte.", answer: "72", topic: "Oppervlakte" },
        { type: "input", text: "'n Ronde pizza het radius 15 cm en word in 8 gelyke stukke gesny. Bereken die oppervlakte van een stuk, korrek tot 2 desimale plekke. (Gebruik π = 3.142)", answer: "88.37", topic: "Oppervlakte" },
      ]
    },
    {
      id: 1403,
      chapter: 14,
      name: "Vergelykings met formules",
      fullName: "Los vergelykings op met formules",
      lesson: {
        heading: "Los vergelykings op met formules",
        sub: "Hoofstuk 14 · Onderwerp 3",
        body: `
          <p>Wanneer 'n oppervlakte of omtrek gegee word, herrangskik die formule om 'n onbekende afmeting te vind.</p>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Oppervlakte van reghoek = 72 cm², lengte = 9 cm. Vind breedte.<br>
            <span class="math">A = l × b → 72 = 9 × b → b = 72/9 = 8 cm</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Omtrek van reghoek = 54 cm, lengte = 16 cm. Vind breedte.<br>
            <span class="math">54 = 2(16 + b) → 27 = 16 + b → b = 11 cm</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Oppervlakte van sirkel = 78.55 cm². Vind radius.<br>
            <span class="math">78.55 = πr² → r² = 78.55/π = 25 → r = 5 cm</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Hanteer oppervlakte-/omtrekformules soos vergelykings met veranderlikes. Vervang wat jy weet, en los dan die onbekende op deur inverse bewerkings te gebruik.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Reghoek het oppervlakte 96 cm² en lengte 12 cm. Bereken die breedte.", answer: "8", topic: "Oppervlakte" },
        { type: "mc", text: "'n Sirkel het oppervlakte 50.27 cm². Bereken sy radius (gebruik π = 3.142).", options: ["4 cm", "5 cm", "6 cm", "8 cm"], answer: 0, topic: "Oppervlakte" },
        { type: "input", text: "'n Driehoek het oppervlakte 45 cm² en basis 10 cm. Bereken die loodregte hoogte.", answer: "9", topic: "Oppervlakte" },
        { type: "mc", text: "'n Vierkant het omtrek 36 cm. Bereken sy oppervlakte.", options: ["9 cm²", "81 cm²", "36 cm²", "144 cm²"], answer: 1, topic: "Oppervlakte" },
        { type: "input", text: "'n Parallelogram het oppervlakte 91 cm² en hoogte 7 cm. Bereken die basis.", answer: "13", topic: "Oppervlakte" },
        { type: "input", text: "'n Trapesium het oppervlakte 88 cm² en parallelle sye van 10 cm en 12 cm. Bereken die loodregte hoogte.", answer: "8", topic: "Oppervlakte" },
        { type: "input", text: "'n Ronde tuin het oppervlakte 201.088 m² (gebruik π = 3.142). 'n Paadjie met eenvormige breedte van 1 m word rondom dit gebou. Bereken die nuwe gekombineerde oppervlakte van die tuin en paadjie saam, korrek tot 3 desimale plekke.", answer: "254.502", topic: "Oppervlakte" },
      ]
    },
    {
      id: 1404,
      chapter: 14,
      name: "SI-eenheid omskakelings",
      fullName: "Omskakelings met SI-eenhede",
      lesson: {
        heading: "Omskakelings met SI-eenhede",
        sub: "Hoofstuk 14 · Onderwerp 4",
        body: `
          <p>Oppervlakte en omtrek gebruik verskillende eenheidskale. Om korrek tussen hulle om te skakel is noodsaaklik vir eksamen-akkuraatheid.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Lengte-omskakelings</div>
            <p>
              <span class="math">1 km = 1 000 m = 100 000 cm = 1 000 000 mm</span><br>
              <span class="math">1 m = 100 cm = 1 000 mm</span><br>
              <span class="math">1 cm = 10 mm</span>
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Oppervlakte-omskakelings (vierkante eenhede)</div>
            <p>
              <span class="math">1 m² = 10 000 cm²</span> (want 100 cm × 100 cm)<br>
              <span class="math">1 cm² = 100 mm²</span> (want 10 mm × 10 mm)<br>
              <span class="math">1 km² = 1 000 000 m²</span><br>
              <span class="math">1 hektaar (ha) = 10 000 m²</span><br><br>
              <strong>Reël:</strong> om oppervlakte om te skakel, kwadreer die lineêre omskakelingsfaktor.<br>
              bv. 1 m = 100 cm → 1 m² = 100² cm² = 10 000 cm²
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Oppervlakte-omskakelingsfaktore is altyd die <em>kwadraat</em> van die lengte-omskakeling. Leerders verloor punte deur 100 in plaas van 10 000 te gebruik wanneer hulle m² na cm² omskakel.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Skakel 3.5 m² om na cm².", answer: "35000", topic: "Omskakelings" },
        { type: "mc", text: "Skakel 450 000 cm² om na m².", options: ["4.5 m²", "45 m²", "450 m²", "0.45 m²"], answer: 1, topic: "Omskakelings" },
        { type: "input", text: "Skakel 2.4 km om na meter.", answer: "2400", topic: "Omskakelings" },
        { type: "mc", text: "'n Landerye meet 300 m × 200 m. Druk sy oppervlakte in hektaar uit.", options: ["6 ha", "60 ha", "600 ha", "0.6 ha"], answer: 0, topic: "Omskakelings" },
        { type: "input", text: "Skakel 85 000 mm² om na cm².", answer: "850", topic: "Omskakelings" },
        { type: "input", text: "'n Reghoekige stuk grond meet 0.05 km by 300 m. Skakel albei om na meter en bereken die oppervlakte van die stuk grond in hektaar.", answer: "1.5", topic: "Omskakelings" },
        { type: "input", text: "'n Reghoekige teël het oppervlakte 450 cm². As 200 identiese teëls benodig word om 'n vloer presies te bedek, bereken die vloer se oppervlakte in m².", answer: "9", topic: "Omskakelings" },
      ]
    },
    {
      id: 1405,
      chapter: 14,
      name: "Hst 14 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 14 — Eksamenfokus",
        sub: "Hoofstuk 14 · Hersiening",
        body: `
          <p>Oppervlakte- en omtrekvrae behels dikwels saamgestelde vorms, eenheidomskakelings, en die vind van onbekende afmetings vanaf gegewe oppervlaktes of omtrekke.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 14-opsomming</div>
            <p>
              ✅ Omtrek = totale grens; oppervlakte = ingeslote oppervlak<br>
              ✅ Hoogte in oppervlakteformules = loodregte hoogte<br>
              ✅ Trapesium: A = ½(a+b)h; Sirkel: A = πr², C = 2πr<br>
              ✅ Saamgestelde vorms: breek op in bekende vorms, tel/trek oppervlaktes<br>
              ✅ Oppervlakte-eenheidomskakelings: kwadreer die lineêre faktor (m²=10 000 cm²)<br>
              ✅ Herrangskik formule om onbekende afmetings te vind
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir saamgestelde vorms, skadu of trek 'n buitelyn om die area wat jy bereken — dit voorkom dubbeltelling. Oppervlaktes van uitgesnyde areas word afgetrek.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Reghoek (10 × 8 cm) het 'n sirkel met radius 2 cm uit die middelpunt gesny. Bereken die oorblywende oppervlakte. (Gebruik π = 3.142, gee tot 2 d.p.)", answer: "67.43", topic: "Gemeng" },
        { type: "mc", text: "'n Trapesium het parallelle sye 6 m en 10 m en hoogte 4 m. Bereken sy oppervlakte.", options: ["64 m²", "32 m²", "48 m²", "24 m²"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "'n Reghoek het omtrek 60 cm en lengte 18 cm. Bereken sy oppervlakte.", answer: "216", topic: "Gemeng" },
        { type: "mc", text: "Skakel 2.75 m² om na cm².", options: ["275 cm²", "2 750 cm²", "27 500 cm²", "275 000 cm²"], answer: 2, topic: "Gemeng" },
        { type: "input", text: "'n Sirkel het omtrek 62.84 cm. Bereken sy oppervlakte. (Gebruik π = 3.142)", answer: "314.2", topic: "Gemeng" },
        { type: "input", text: "'n Reghoekige tuin 15 m by 9 m het 'n vierkantige blombedding van sy 3 m uit een hoek gesny. Bereken die oorblywende oppervlakte.", answer: "126", topic: "Gemeng" },
        { type: "input", text: "'n Baanbaan het twee reguit gedeeltes van 100 m elk en twee halfsirkelvormige eindes met radius 30 m. Bereken die totale afstand rondom die baan. Gebruik π = 3.142, gee jou antwoord tot 2 desimale plekke.", answer: "388.52", topic: "Gemeng" },
      ]
    },
  ],
  workbook: {
    chapter: 14, chapterName: "Oppervlakte en Omtrek",
    topics: [
      {
        name: "Omtrek van 2D-vorms",
        questions: [
          { num: "1", text: "Bereken die omtrek van elke vorm:", parts: [
            { label: "a)", text: "Reghoek: l = 15 cm, b = 8 cm.", marks: 2 },
            { label: "b)", text: "Sirkel met r = 9 cm. (Gebruik π = 3.142)", marks: 2 },
            { label: "c)", text: "Trapesium met parallelle sye 7 cm en 13 cm, en skuinssye elk 10 cm.", marks: 2 },
            { label: "d)", text: "'n Vierkant het omtrek 52 cm. Bereken sy sylengte en oppervlakte.", marks: 3 },
          ]},
        ]
      },
      {
        name: "Oppervlaktes en eenheidomskakelings",
        questions: [
          { num: "2", text: "Bereken die oppervlakte van elke vorm:", parts: [
            { label: "a)", text: "Sirkel met r = 9 cm.", marks: 2 },
            { label: "b)", text: "Trapesium met parallelle sye 7 cm en 13 cm, hoogte 8 cm.", marks: 3 },
            { label: "c)", text: "'n Ronde grasperk met radius 7 m het 'n 2 m breë paadjie rondom dit. Bereken slegs die oppervlakte van die paadjie.", marks: 5 },
          ]},
          { num: "3", text: "Skakel om:", parts: [
            { label: "a)", text: "4.2 m² na cm²", marks: 1 },
            { label: "b)", text: "85 000 mm² na m²", marks: 2 },
            { label: "c)", text: "'n Kamer is 6.4 m × 4.5 m. Bereken die vloeroppervlakte in m² en in cm².", marks: 3 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 14, chapterName: "Hoofstuk 14 — Oppervlakte en Omtrek",
    topics: [
      {
        name: "Omtrek van 2D-vorms",
        answers: [
          { num: "Q1a", ans: "P = 46 cm", note: "2(15+8)=46" },
          { num: "Q1b", ans: "C ≈ 56.56 cm", note: "2×3.142×9=56.556" },
          { num: "Q1c", ans: "P = 40 cm", note: "7+13+10+10=40" },
          { num: "Q1d", ans: "Sy = 13 cm; Oppervlakte = 169 cm²", note: "52÷4=13; 13²=169" },
        ]
      },
      {
        name: "Oppervlaktes en eenheidomskakelings",
        answers: [
          { num: "Q2a", ans: "A ≈ 254.50 cm²", note: "3.142×81=254.502" },
          { num: "Q2b", ans: "A = 80 cm²", note: "½(7+13)×8=80" },
          { num: "Q2c", ans: "≈ 100.53 m²", note: "π(9²−7²)=π×32≈100.53" },
          { num: "Q3a", ans: "42 000 cm²", note: "4.2×10 000=42 000" },
          { num: "Q3b", ans: "0.000085 m²", note: "85 000÷1 000 000=0.000085" },
          { num: "Q3c", ans: "28.8 m² = 288 000 cm²", note: "6.4×4.5=28.8; ×10 000=288 000" },
        ]
      },
    ]
  }
});
