// Math Magician — Grade 8, Chapter 12 data (Afrikaans)
// Desimale Breuke

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 1201,
      chapter: 12,
      name: "Die desimale stelsel",
      fullName: "Hersiening van die desimale stelsel",
      lesson: {
        heading: "Hersiening van die desimale stelsel",
        sub: "Hoofstuk 12 · Onderwerp 1",
        body: `
          <p>Desimale is breuke wat met plekwaarde geskryf word. Elke posisie regs van die desimale komma verteenwoordig 'n mag van tien in die noemer.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Plekwaarde</div>
            <p>
              <strong>Syfers links van die desimale komma:</strong> eenhede, tiene, honderde, …<br>
              <strong>Syfers regs van die desimale komma:</strong> tiendes (1/10), honderdstes (1/100), duisendstes (1/1000), …<br><br>
              <strong>Voorbeeld:</strong> <span class="math">34.758</span><br>
              3 = tiene, 4 = eenhede, 7 = tiendes, 5 = honderdstes, 8 = duisendstes<br><br>
              <strong>Omskakeling van desimale na breuke:</strong><br>
              <span class="math">0.7 = 7/10</span>, <span class="math">0.35 = 35/100 = 7/20</span>, <span class="math">0.125 = 125/1000 = 1/8</span><br><br>
              <strong>Vergelyking van desimale:</strong> belyn die desimale kommas, vergelyk syfer vir syfer van links na regs.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer jy desimale vergelyk of orden, skryf hulle met dieselfde aantal desimale plekke deur nulle by te voeg. bv. 0.3 = 0.300, wat dit duidelik maak dat 0.300 > 0.299.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "In 47.356, wat is die waarde van die syfer 3?", options: ["3 tiendes", "3 honderdstes", "3 eenhede", "3 duisendstes"], answer: 0, topic: "Desimale" },
        { type: "input", text: "Skakel 0.625 om na 'n breuk in eenvoudigste vorm (skryf as a/b).", answer: "5/8", topic: "Desimale" },
        { type: "mc", text: "Watter een is die grootste?", options: ["0.409", "0.49", "0.4", "0.041"], answer: 1, topic: "Desimale" },
        { type: "input", text: "Skakel 3/8 om na 'n desimaal.", answer: "0.375", topic: "Desimale" },
        { type: "mc", text: "Orden van kleinste na grootste: 0.3, 0.03, 0.303, 0.033", options: ["0.3, 0.03, 0.303, 0.033", "0.03, 0.033, 0.3, 0.303", "0.033, 0.03, 0.3, 0.303", "0.03, 0.3, 0.033, 0.303"], answer: 1, topic: "Desimale" },
        { type: "input", text: "Skryf 9/20 as 'n desimaal, en sê of dit groter as, kleiner as, of gelyk aan 0.45 is. (Antwoord met die desimale waarde)", answer: "0.45", topic: "Desimale" },
        { type: "mc", text: "Watter een lys hierdie waardes in volgorde van kleinste na grootste: 0.6, 5/8, 0.65, 7/10?", options: ["0.6, 5/8, 0.65, 7/10", "5/8, 0.6, 0.65, 7/10", "0.6, 0.65, 5/8, 7/10", "7/10, 0.65, 5/8, 0.6"], answer: 0, topic: "Desimale" },
      ]
    },
    {
      id: 1202,
      chapter: 12,
      name: "Optel en aftrek van desimale",
      fullName: "Optelling en aftrekking met desimale",
      lesson: {
        heading: "Optelling en aftrekking met desimale",
        sub: "Hoofstuk 12 · Onderwerp 2",
        body: `
          <p>Optelling en aftrekking van desimale volg dieselfde reëls as heelgetalle — die sleutel is om die <strong>desimale kommas te belyn</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Metode</div>
            <p>
              1. Skryf die getalle vertikaal met die desimale kommas belyn.<br>
              2. Voeg agterste nulle by sodat alle getalle dieselfde aantal desimale plekke het.<br>
              3. Tel op of trek af soos met heelgetalle.<br>
              4. Plaas die desimale komma in die antwoord direk onder die ander.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">12.34 + 5.7 + 0.056</span>: belyn → 12.340 + 5.700 + 0.056 = 18.096</span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">20 − 7.345</span>: skryf as 20.000 − 7.345 = 12.655</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Die algemeenste fout is om die desimale kommas verkeerd te belyn. Skryf berekeninge altyd vertikaal in 'n eksamen — dit voorkom foute en wys jou metode.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken 14.7 + 3.85 + 0.067.", answer: "18.617", topic: "Desimale" },
        { type: "mc", text: "Bereken 25 − 8.46.", options: ["17.54", "16.54", "17.64", "16.64"], answer: 0, topic: "Desimale" },
        { type: "input", text: "Bereken 7.3 + 2.98 − 4.156.", answer: "6.124", topic: "Desimale" },
        { type: "mc", text: "'n Plank is 3.4 m. Twee stukke van 0.75 m en 1.285 m word afgesny. Wat bly oor?", options: ["1.365 m", "1.375 m", "1.465 m", "1.475 m"], answer: 0, topic: "Desimale" },
        { type: "input", text: "Bereken 100 − 34.567.", answer: "65.433", topic: "Desimale" },
        { type: "input", text: "'n Loodgieter het 'n 12.5 m pyp. Hy gebruik 3.75 m, dan 2.9 m, en voeg dan nog 'n 1.65 m lengte by. Wat is die finale totale lengte van die pyp in m?", answer: "7.5", topic: "Desimale" },
        { type: "input", text: "Drie vriende se lengtes is 1.58 m, 1.62 m, en 1.71 m. 'n Vierde vriend se lengte is gelyk aan die gemiddelde van die ander drie (afgerond tot 2 desimale plekke) plus 0.05 m. Bepaal die vierde vriend se lengte in m.", answer: "1.69", topic: "Desimale" },
      ]
    },
    {
      id: 1203,
      chapter: 12,
      name: "Vermenigvuldig en deel van desimale",
      fullName: "Vermenigvuldiging en deling met desimale",
      lesson: {
        heading: "Vermenigvuldiging en deling met desimale",
        sub: "Hoofstuk 12 · Onderwerp 3",
        body: `
          <p>Vermenigvuldiging en deling van desimale kan gedoen word deur met heelgetalle te werk en dan die desimale komma aan te pas.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Vermenigvuldiging</div>
            <p>
              1. Ignoreer die desimale kommas en vermenigvuldig soos heelgetalle.<br>
              2. Tel die totale aantal desimale plekke in albei faktore.<br>
              3. Plaas daardie aantal desimale plekke in die produk.<br><br>
              <strong>Voorbeeld:</strong> <span class="math">2.4 × 1.5</span><br>
              24 × 15 = 360; totale desimale plekke = 2 → <span class="math">3.60</span>
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Deling</div>
            <p>
              <strong>Deling deur 'n desimaal:</strong> vermenigvuldig albei getalle met 'n mag van 10 om die deler 'n heelgetal te maak.<br>
              bv. <span class="math">4.8 ÷ 0.4</span>: vermenigvuldig albei met 10 → <span class="math">48 ÷ 4 = 12</span><br><br>
              <strong>Deling deur 10, 100, 1000:</strong> skuif die desimale komma 1, 2, 3 plekke na links.<br>
              <strong>Vermenigvuldiging met 10, 100, 1000:</strong> skuif die desimale komma na regs.
            </p>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Desimale Bewerkings</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;margin-top:8px;">
              <input id="decA" type="number" step="any" value="2.4" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <select id="decOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;">
                <option>×</option><option>÷</option>
              </select>
              <input id="decB" type="number" step="any" value="1.5" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="decBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">= ?</button>
              <div id="decOut" style="font-family:JetBrains Mono,monospace;font-size:15px;color:#6ee7b7;padding:7px 14px;background:rgba(110,231,183,0.08);border:1px solid rgba(110,231,183,0.20);border-radius:7px;min-width:60px;text-align:center;"></div>
            </div>
          </div>
          <script>
          (function(){
            function calc(){
              const a=parseFloat(document.getElementById('decA').value);
              const b=parseFloat(document.getElementById('decB').value);
              const op=document.getElementById('decOp').value;
              const el=document.getElementById('decOut');
              if(isNaN(a)||isNaN(b)){el.textContent='?';return;}
              if(op==='÷'&&b===0){el.textContent='∞';return;}
              const res=op==='×'?a*b:a/b;
              el.textContent=parseFloat(res.toFixed(10)).toString();
            }
            document.getElementById('decBtn').addEventListener('click',calc);
            document.getElementById('decOp').addEventListener('change',calc);

          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Tel die desimale plekke noukeurig in vermenigvuldiging. <span class="math">0.3 × 0.3 = 0.09</span> — nie 0.9 nie. Die antwoord het twee desimale plekke omdat elke faktor een het.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken 3.6 × 2.5.", answer: "9", topic: "Desimale" },
        { type: "mc", text: "Bereken 7.56 ÷ 0.6.", options: ["12.6", "1.26", "12", "126"], answer: 0, topic: "Desimale" },
        { type: "input", text: "Bereken 0.04 × 0.3.", answer: "0.012", topic: "Desimale" },
        { type: "mc", text: "Bereken 4.5 ÷ 0.009.", options: ["5", "500", "50", "0.5"], answer: 1, topic: "Desimale" },
        { type: "input", text: "Bereken 1.2 × 3.4 − 0.08.", answer: "4", topic: "Desimale" },
        { type: "input", text: "'n Reghoekige tuin meet 4.5 m by 3.2 m. Bereken die oppervlakte, en bepaal dan hoeveel 0.8 m² plaveiblokke nodig is om dit presies te bedek.", answer: "18", topic: "Desimale" },
        { type: "input", text: "'n Motor gebruik 6.4 liter brandstof om 76.8 km te ry. Teen hierdie tempo, hoeveel liter is nodig om 300 km te ry?", answer: "25", topic: "Desimale" },
      ]
    },
    {
      id: 1204,
      chapter: 12,
      name: "Kwadrate, kubusse en wortels van desimale",
      fullName: "Kwadrate, kubusse, vierkantswortels, en derdemagswortels van desimale",
      lesson: {
        heading: "Kwadrate, kubusse, vierkantswortels, en derdemagswortels van desimale",
        sub: "Hoofstuk 12 · Onderwerp 4",
        body: `
          <p>Kwadrering en kubering van desimale volg dieselfde vermenigvuldigingsreëls — maar wees versigtig met die aantal desimale plekke.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelreëls</div>
            <p>
              <strong>Kwadraat:</strong> vermenigvuldig die desimaal met homself.<br>
              <span class="math">(0.4)² = 0.4 × 0.4 = 0.16</span> (2 d.p. + 2 d.p. = 4 d.p.? Nee — kontroleer: 4×4=16, 2 d.p. totaal → 0.16)<br><br>
              <strong>Vierkantswortel:</strong> <span class="math">√0.16 = 0.4</span> (die helfte van die desimale plekke)<br><br>
              <strong>Kubus:</strong> <span class="math">(0.2)³ = 0.2 × 0.2 × 0.2 = 0.008</span><br><br>
              <strong>Derdemagswortel:</strong> <span class="math">∛0.008 = 0.2</span><br><br>
              <strong>Nuttige volkome kwadrate van desimale:</strong><br>
              0.1²=0.01, 0.2²=0.04, 0.3²=0.09, 0.4²=0.16, 0.5²=0.25
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir √ van 'n desimaal: groepeer die syfers in pare vanaf die desimale komma na buite. Of skakel eers om na 'n breuk — <span class="math">√0.36 = √(36/100) = 6/10 = 0.6</span>.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken (0.3)².", answer: "0.09", topic: "Desimale" },
        { type: "mc", text: "Bereken √0.49.", options: ["0.7", "0.07", "7", "0.49"], answer: 0, topic: "Desimale" },
        { type: "input", text: "Bereken (0.2)³.", answer: "0.008", topic: "Desimale" },
        { type: "mc", text: "Bereken ∛0.027.", options: ["0.03", "0.3", "3", "0.003"], answer: 1, topic: "Desimale" },
        { type: "input", text: "Bereken (1.2)² − √0.64.", answer: "0.64", topic: "Desimale" },
        { type: "input", text: "Bereken (0.6)² + (0.2)³ − √0.01.", answer: "0.268", topic: "Desimale" },
        { type: "input", text: "'n Vierkantige teël het 'n oppervlakte van 0.49 m². 'n Kubusvormige houer het 'n volume van 0.125 m³. Bepaal die teël se sylengte en die houer se randlengte, en bereken dan die som van hierdie twee lengtes in m.", answer: "1.2", topic: "Desimale" },
      ]
    },
    {
      id: 1205,
      chapter: 12,
      name: "Afrond en skat",
      fullName: "Afronding en skatting met desimale",
      lesson: {
        heading: "Afronding en skatting met desimale",
        sub: "Hoofstuk 12 · Onderwerp 5",
        body: `
          <p>Afronding gee benaderde waardes wat makliker is om mee te werk. Skatting help om te kyk of 'n antwoord redelik is.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Afrondingsreëls</div>
            <p>
              1. Identifiseer die afrondingsyfer (die plek waartoe jy afrond).<br>
              2. Kyk na die syfer direk regs daarvan:<br>
              &nbsp;&nbsp;&nbsp;• As dit <strong>0–4</strong> is: rond af (behou die afrondingsyfer).<br>
              &nbsp;&nbsp;&nbsp;• As dit <strong>5–9</strong> is: rond op (tel 1 by die afrondingsyfer).<br>
              3. Vervang alle syfers regs daarvan met nulle (of laat hulle weg as dit na die desimale komma is).<br><br>
              <strong>Voorbeelde:</strong><br>
              <span class="math">3.746</span> tot 2 d.p. → kyk na die 3de d.p. (6 ≥ 5) → rond op → <span class="math">3.75</span><br>
              <span class="math">3.742</span> tot 2 d.p. → kyk na die 3de d.p. (2 &lt; 5) → rond af → <span class="math">3.74</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Skatting</div>
            <div class="example-step"><span class="step-num">1</span><span>Skat <span class="math">4.87 × 3.12</span>: rond af tot <span class="math">5 × 3 = 15</span>. Werklik ≈ 15.19 ✓</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Skat <span class="math">√26.1</span>: naaste volkome kwadraat is 25 → skatting ≈ 5.1</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Skat altyd voordat jy in eksamens bereken — dit wys jou of jou antwoord in die regte omgewing is. As jy 150 kry terwyl jou skatting 15 was, het jy 'n fout met die desimale komma gemaak.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Rond 7.3856 af tot 2 desimale plekke.", answer: "7.39", topic: "Desimale" },
        { type: "mc", text: "Rond 0.00548 af tot 3 desimale plekke.", options: ["0.006", "0.005", "0.0054", "0.0055"], answer: 1, topic: "Desimale" },
        { type: "input", text: "Skat 9.87 × 4.12 deur elkeen af te rond tot die naaste heelgetal.", answer: "40", topic: "Desimale" },
        { type: "mc", text: "Rond 25.449 af tot 1 desimale plek.", options: ["25.4", "25.5", "25.45", "26.0"], answer: 0, topic: "Desimale" },
        { type: "input", text: "Tussen watter twee opeenvolgende heelgetalle lê √45?", answer: "6 en 7", topic: "Desimale" },
        { type: "input", text: "'n Hoeveelheid van 2.3846 kg moet afgerond word tot die naaste 0.05 kg vir verpakking. Watter verpakkingsgrootte (in kg) sal gebruik word?", answer: "2.4", topic: "Desimale" },
        { type: "input", text: "Skat 48.7 × 5.12 ÷ 9.89 deur elke getal af te rond tot 1 beduidende syfer.", answer: "25", topic: "Desimale" },
      ]
    },
    {
      id: 1206,
      chapter: 12,
      name: "Hst 12 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 12 — Eksamenfokus",
        sub: "Hoofstuk 12 · Hersiening",
        body: `
          <p>Eksamenvrae oor desimale toets plekwaarde, al vier bewerkings, magte, wortels, en afronding. Wys altyd jou berekeninge en sluit eenhede by antwoorde in.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 12-opsomming</div>
            <p>
              ✅ Plekwaarde: tiendes, honderdstes, duisendstes<br>
              ✅ Optel/aftrek: belyn die desimale kommas<br>
              ✅ Vermenigvuldig: tel die totale desimale plekke<br>
              ✅ Deel deur 'n desimaal: vermenigvuldig eers albei met 'n mag van 10<br>
              ✅ (a.b)²: vermenigvuldig met homself; √: die helfte van die desimale plekke<br>
              ✅ Afronding: kyk een plek na regs; 5+ rond op<br>
              ✅ Skatting: rond af tot 1 beduidende syfer voor jy bereken
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Kontroleer die posisie van die desimale komma in elke antwoord. 'n Verkeerd geplaaste desimale komma verander 3.6 in 36 of 0.36 — albei verkeerd, selfs al is die syfers reg.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken 2.4² − √1.44.", answer: "4.56", topic: "Gemeng" },
        { type: "mc", text: "Bereken 0.05 × 0.04.", options: ["0.2", "0.002", "0.02", "0.0002"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "Rond 0.08653 af tot 3 beduidende syfers.", answer: "0.0865", topic: "Gemeng" },
        { type: "mc", text: "Bereken 6.3 ÷ 0.09.", options: ["0.7", "7", "70", "700"], answer: 2, topic: "Gemeng" },
        { type: "input", text: "Skat en bereken dan (2.95 + 4.08) × 1.97. Rond die antwoord af tot 2 d.p.", answer: "13.85", topic: "Gemeng" },
        { type: "input", text: "Bereken (0.5)³ + (1.4)² − √0.25.", answer: "1.585", topic: "Gemeng" },
        { type: "input", text: "'n Tenk word gevul teen 'n tempo van 3.6 liter per 0.4 minute. Teen hierdie tempo, hoeveel liter word in 5 minute bygevoeg?", answer: "45", topic: "Gemeng" },
      ]
    },
  ],
  workbook: {
    chapter: 12, chapterName: "Desimale Breuke",
    topics: [
      {
        name: "Optel, aftrek, vermenigvuldig en deel van desimale",
        questions: [
          { num: "1", text: "Bereken, en wys al jou berekeninge:", parts: [
            { label: "a)", text: "<span class='math'>34.07 + 8.9 − 12.456</span>", marks: 3 },
            { label: "b)", text: "<span class='math'>2.4 × 0.35</span>", marks: 2 },
            { label: "c)", text: "<span class='math'>17.28 ÷ 0.08</span>", marks: 3 },
            { label: "d)", text: "'n Motor ry 245.6 km op 32.4 liter brandstof. Bepaal die brandstofverbruik in km/liter (2 d.p.).", marks: 3 },
          ]},
        ]
      },
      {
        name: "Kwadrate, kubusse, wortels en afronding",
        questions: [
          { num: "2", text: "Sonder 'n sakrekenaar:", parts: [
            { label: "a)", text: "Bereken <span class='math'>(0.4)³ + √0.09</span>", marks: 3 },
            { label: "b)", text: "Rond 3.08765 af tot 3 desimale plekke.", marks: 1 },
            { label: "c)", text: "Tussen watter twee opeenvolgende heelgetalle lê <span class='math'>√52</span>?", marks: 2 },
            { label: "d)", text: "Skat <span class='math'>√98</span> tot een desimale plek sonder 'n sakrekenaar.", marks: 2 },
          ]},
          { num: "3", text: "Gebruik 'n sakrekenaar om te bereken (rond af tot 2 d.p. waar nodig):", parts: [
            { label: "a)", text: "<span class='math'>√182</span>", marks: 1 },
            { label: "b)", text: "<span class='math'>∛512</span>", marks: 1 },
            { label: "c)", text: "<span class='math'>(1.2)⁴</span>", marks: 2 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 12, chapterName: "Hoofstuk 12 — Desimale Breuke",
    topics: [
      {
        name: "Optel, aftrek, vermenigvuldig en deel van desimale",
        answers: [
          { num: "Q1a", ans: "30.514", note: "34.07+8.9=42.97; 42.97−12.456=30.514" },
          { num: "Q1b", ans: "0.84", note: "24×35=840; 1+2=3 d.p. → 0.840=0.84" },
          { num: "Q1c", ans: "216", note: "Vermenigvuldig albei met 100: 1728÷8=216" },
          { num: "Q1d", ans: "7.58 km/liter", note: "245.6÷32.4≈7.58" },
        ]
      },
      {
        name: "Kwadrate, kubusse, wortels en afronding",
        answers: [
          { num: "Q2a", ans: "0.364", note: "(0.4)³=0.064; √0.09=0.3; totaal=0.364" },
          { num: "Q2b", ans: "3.088", note: "4de d.p. is 6 ≥ 5, rond op" },
          { num: "Q2c", ans: "7 en 8", note: "7²=49 < 52 < 64=8²" },
          { num: "Q2d", ans: "≈ 9.9", note: "9.9²=98.01 ≈ 98" },
          { num: "Q3a", ans: "≈ 13.49", note: "√182 ≈ 13.4907" },
          { num: "Q3b", ans: "8", note: "∛512=8 presies (8³=512)" },
          { num: "Q3c", ans: "≈ 2.07", note: "1.2⁴=1.2²×1.2²=1.44×1.44=2.0736" },
        ]
      },
    ]
  }
});
