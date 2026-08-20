// Math Magician — Grade 9, Chapter 19 data (Afrikaans)
// Waarskynlikheid

MathMagician.registerChapter(19, {
  topics: [
    {
      id: 38,
      chapter: 19,
      name: "Waarskynlikheid van gebeurtenisse, relatiewe frekwensie",
      fullName: "Teoretiese waarskynlikheid, relatiewe frekwensie en die vergelyking van die twee",
      lesson: {
        heading: "Teoretiese waarskynlikheid teenoor relatiewe frekwensie",
        sub: "Hoofstuk 19 · Onderwerp 1",
        body: `
          <p>Graad 9 herhaal die waarskynlikheidsformule van Graad 8, en fokus dan op die <strong>vergelyking</strong> van teoretiese waarskynlikheid met eksperimentele (relatiewe frekwensie) resultate, en die verduideliking van verskille tussen die twee.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Herhaling en vergelyking</div>
            <p>
              <strong>Teoretiese waarskynlikheid:</strong> <span class="math">P(E) = n(E) ÷ n(S)</span> — gebaseer op ewe waarskynlike uitkomste, bereken sonder om 'n eksperiment uit te voer.<br><br>
              <strong>Relatiewe frekwensie (eksperimentele waarskynlikheid):</strong><br>
              <span class="math">Relatiewe frekwensie = aantal kere wat E voorgekom het ÷ totale aantal pogings</span><br><br>
              <strong>Om hulle te vergelyk:</strong><br>
              &nbsp;&nbsp;• Met min pogings kan relatiewe frekwensie merkbaar van teoretiese waarskynlikheid verskil — dit is normaal, weens toeval.<br>
              &nbsp;&nbsp;• Soos die aantal pogings toeneem, neig relatiewe frekwensie om nader aan die teoretiese waarskynlikheid te kom (Wet van Groot Getalle).<br>
              &nbsp;&nbsp;• 'n Groot, aanhoudende verskil oor baie pogings kan daarop dui dat die uitkomste nie eintlik ewe waarskynlik is nie (bv. 'n bevooroordeelde dobbelsteen).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>'n Regverdige dobbelsteen: teoretiese P(gooi 'n 6) = <span class="math">1/6 ≈ 0.167</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>30 keer gegooi, 'n 6 verskyn 3 keer → relatiewe frekwensie = <span class="math">3/30 = 0.10</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>300 keer gegooi, 'n 6 verskyn 52 keer → relatiewe frekwensie = <span class="math">52/300 ≈ 0.173</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Met meer pogings is die relatiewe frekwensie (0.173) baie nader aan die teoretiese waarde (0.167) as met slegs 30 pogings (0.10).</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Dobbelsteensimulator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Simuleer die gooi van 'n regverdige dobbelsteen baie keer en vergelyk die relatiewe frekwensie van elke uitkoms met die teoretiese 1/6.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Aantal gooie</label>
              <input id="drTrials" type="number" value="60" min="1" max="10000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="drRoll" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Gooi die dobbelsteen!</button>
            </div>
            <div id="drOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function roll(){
              const trials = Math.max(1, Math.min(10000, parseInt(document.getElementById('drTrials').value)||60));
              const counts = [0,0,0,0,0,0];
              for(let i=0;i<trials;i++){ counts[Math.floor(Math.random()*6)]++; }
              let html = '';
              counts.forEach((c,i) => {
                const rf = c/trials;
                const diff = Math.abs(rf - 1/6);
                html += '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:60px;">Kant '+(i+1)+':</span><span style="color:#fbbf24;">'+c+'</span> <span style="color:rgba(221,225,240,0.40);">→ rel.frek='+rf.toFixed(3)+'</span> <span style="color:'+(diff<0.05?'#6ee7b7':'#fca5a5')+';">(teorie 0.167)</span></div>';
              });
              html += '<div style="margin-top:6px;font-size:11px;opacity:0.45;">Totale gooie: '+trials+'. Gooi weer — relatiewe frekwensies sal elke keer wissel, veral met minder pogings.</div>';
              document.getElementById('drOut').innerHTML = html;
            }
            document.getElementById('drRoll').addEventListener('click', roll);
            roll();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Beweer nooit dat relatiewe frekwensie DIE waarskynlikheid IS nie — dit is 'n skatting wat slegs nader aan die ware waarskynlikheid kom soos pogings toeneem.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Regverdige muntstuk word gegooi. Wat is die teoretiese P(kop)? (as 'n desimaal)", answer: "0.5", topic: "Waarskynlikheid" },
        { type: "mc", text: "'n Dobbelsteen word 40 keer gegooi; 'n 6 kom 9 keer voor. Die relatiewe frekwensie om 'n 6 te gooi is:", options: ["1/6", "9/40", "6/40", "40/9"], answer: 1, topic: "Waarskynlikheid" },
        { type: "mc", text: "Soos die aantal pogings in 'n eksperiment toeneem, doen relatiewe frekwensie oor die algemeen die volgende:", options: ["Beweeg verder van die teoretiese waarskynlikheid af", "Kom nader aan die teoretiese waarskynlikheid", "Word presies 1", "Het geen verband met teoretiese waarskynlikheid nie"], answer: 1, topic: "Waarskynlikheid" },
        { type: "input", text: "'n Wentelskyf word 250 keer gedraai; rooi verskyn 62 keer. Wat is die relatiewe frekwensie van rooi, as 'n desimaal (rond af tot 2 desimale plekke)?", answer: "0.25", topic: "Waarskynlikheid" },
        { type: "mc", text: "'n Muntstuk word 20 keer gegooi en gee 16 koppe. 'n Leerder maak die gevolgtrekking 'hierdie muntstuk is beslis bevooroordeeld.' Die beste reaksie is:", options: ["Stem saam — 16/20 bewys dit is bevooroordeeld", "20 pogings is 'n klein steekproef; meer pogings word benodig voordat 'n mens tot bevooroordeeldheid kan besluit", "Relatiewe frekwensie moet altyd gelyk wees aan 0.5", "Die resultaat is onmoontlik"], answer: 1, topic: "Waarskynlikheid" },
        { type: "input", text: "'n Sak lekkers word getoets deur 500 keer met vervanging te trek; 'n rooi lekker word 175 keer getrek. As 'n groot lot eintlik 2 000 lekkers bevat en die ware verhouding rooi ooreenstem met hierdie relatiewe frekwensie, skat hoeveel rooi lekkers in die lot is.", answer: "700", topic: "Waarskynlikheid" },
      ]
    },
    {
      id: 39,
      chapter: 19,
      name: "Waarskynlikheidsmodelle en twee-rigting-tabelle",
      fullName: "Eenvoudige waarskynlikheidsmodelle en twee-rigting-tabelle",
      lesson: {
        heading: "Eenvoudige waarskynlikheidsmodelle en twee-rigting-tabelle",
        sub: "Hoofstuk 19 · Onderwerp 2",
        body: `
          <p>'n <strong>Twee-rigting-tabel</strong> (verwantskapstabel) orden data oor twee kategoriese veranderlikes tegelyk, wat dit maklik maak om waarskynlikhede te bereken wat kombinasies van albei behels.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Lees 'n twee-rigting-tabel</div>
            <p>
              Rye verteenwoordig een veranderlike, kolomme verteenwoordig 'n ander, en elke sel wys die telling vir daardie kombinasie. Die laaste ry/kolom ("totale" of "marginale totale") gee die totaal vir elke kategorie en die grondtotaal.<br><br>
              <strong>P(ry en kolom)</strong> = seltelling ÷ grondtotaal.<br>
              <strong>P('n kategorie)</strong> = daardie ry of kolom se totaal ÷ grondtotaal.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld — leerders en vervoer</div>
            <div class="example-step"><span class="step-num">1</span><span>
              <table style="border-collapse:collapse;font-family:JetBrains Mono,monospace;font-size:12px;">
                <tr><th style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);"></th><th style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Bus</th><th style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Loop</th><th style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Totaal</th></tr>
                <tr><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Seuns</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">12</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">8</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">20</td></tr>
                <tr><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Meisies</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">10</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">20</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">30</td></tr>
                <tr><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Totaal</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">22</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">28</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">50</td></tr>
              </table>
            </span></div>
            <div class="example-step"><span class="step-num">2</span><span>P('n lukraak gekose leerder is 'n meisie wat loop) = <span class="math">20/50 = 2/5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>P(leerder neem die bus) = <span class="math">22/50 = 11/25</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Waarskynlikheidsbouer vir twee-rigting-tabelle</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Wysig die vier seltellings om jou eie twee-rigting-tabel te bou en die waarskynlikhede regstreeks bereken te sien.</p>
            <div style="display:grid;grid-template-columns:80px 70px 70px;gap:6px;margin-bottom:12px;align-items:center;">
              <div></div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-align:center;">Kolom A</div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-align:center;">Kolom B</div>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);">Ry 1</div>
              <input id="twA1" type="number" value="12" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-family:JetBrains Mono,monospace;text-align:center;">
              <input id="twB1" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-family:JetBrains Mono,monospace;text-align:center;">
              <div style="font-size:11px;color:rgba(221,225,240,0.45);">Ry 2</div>
              <input id="twA2" type="number" value="10" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-family:JetBrains Mono,monospace;text-align:center;">
              <input id="twB2" type="number" value="20" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
            <div id="twOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const a1=parseFloat(document.getElementById('twA1').value)||0;
              const b1=parseFloat(document.getElementById('twB1').value)||0;
              const a2=parseFloat(document.getElementById('twA2').value)||0;
              const b2=parseFloat(document.getElementById('twB2').value)||0;
              const rowTotal1=a1+b1, rowTotal2=a2+b2;
              const colTotalA=a1+a2, colTotalB=b1+b2;
              const grand=rowTotal1+rowTotal2;
              const out=document.getElementById('twOut');
              if(grand===0){ out.innerHTML='<span style="color:#fca5a5;">Voer ten minste een nie-nul telling in.</span>'; return; }
              out.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Grondtotaal:</span> <span style="color:#fbbf24;">'+grand+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">P(Ry 1 en Kol A):</span> <span style="color:#6ee7b7;">'+a1+'/'+grand+' = '+(a1/grand).toFixed(3)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">P(Ry 2 en Kol B):</span> <span style="color:#6ee7b7;">'+b2+'/'+grand+' = '+(b2/grand).toFixed(3)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">P(Ry 1):</span> <span style="color:#a5b4fc;">'+rowTotal1+'/'+grand+' = '+(rowTotal1/grand).toFixed(3)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">P(Kol A):</span> <span style="color:#a5b4fc;">'+colTotalA+'/'+grand+' = '+(colTotalA/grand).toFixed(3)+'</span></div>',
              ].join('');
            }
            ['twA1','twB1','twA2','twB2'].forEach(id=>document.getElementById(id).addEventListener('input',calc));
            calc();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Bereken altyd eers die grondtotaal (som van alle selle) — elke waarskynlikheid uit 'n twee-rigting-tabel is 'n telling gedeel deur hierdie grondtotaal.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Twee-rigting-tabel wys 15 seuns wat sport speel en 25 meisies wat sport speel, uit 'n totaal van 60 leerders. Wat is P('n leerder speel sport)? (as 'n breuk, bv. 2/3)", answer: "2/3", topic: "Twee-rigting-tabelle" },
        { type: "mc", text: "In 'n twee-rigting-tabel verwys die 'grondtotaal' na:", options: ["Die grootste enkele sel", "Die som van slegs een ry", "Die som van alle selle in die tabel", "Die aantal kolomme"], answer: 2, topic: "Twee-rigting-tabelle" },
        { type: "input", text: "Tabel: Ry 1 = {8, 12}, Ry 2 = {10, 20}. Wat is die grondtotaal?", answer: "50", topic: "Twee-rigting-tabelle" },
        { type: "mc", text: "Met behulp van die vervoervoorbeeld (Seuns: Bus 12, Loop 8; Meisies: Bus 10, Loop 20; totaal 50), wat is P(seun wat die bus neem)?", options: ["12/20", "12/50", "22/50", "20/50"], answer: 1, topic: "Twee-rigting-tabelle" },
        { type: "input", text: "In 'n twee-rigting-tabel is Kolom A se totaal = 22 en die grondtotaal = 50. Wat is P(Kolom A), as 'n desimaal (2 desimale plekke)?", answer: "0.44", topic: "Twee-rigting-tabelle" },
        { type: "input", text: "In 'n opname onder 80 leerders: Sport & Bus = 15, Sport & Loop = 25, Geen sport & Bus = 10, Geen sport & Loop = 30. Van die leerders wat sport speel, watter breukdeel loop skool toe? (as 'n breuk, bv. 2/3)", answer: "5/8", topic: "Twee-rigting-tabelle" },
      ]
    },
  ],
  workbook: {
    chapter: 19, chapterName: "Waarskynlikheid",
    topics: [
      {
        name: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid",
        questions: [
          {
            num: "1",
            text: "'n Regverdige wentelskyf het 5 gelyke afdelings genommer 1 tot 5. Dit word 200 keer gedraai; die nommer 3 kom 52 keer voor.",
            parts: [
              { label: "a)", text: "Gee die teoretiese waarskynlikheid om 'n 3 te draai.", marks: 1 },
              { label: "b)", text: "Bereken die relatiewe frekwensie om 'n 3 te draai vanuit die eksperiment.", marks: 2 },
              { label: "c)", text: "Vergelyk die twee waardes en kommentarieer of die wentelskyf regverdig lyk.", marks: 2 },
            ]
          },
          {
            num: "2",
            text: "'n Regverdige sekskantige dobbelsteen word 120 keer gegooi. Die resultate word in die frekwensietabel hieronder aangeteken:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Kant</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>6</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Frekwensie</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>18</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>22</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>19</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>17</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>24</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>20</td></tr></table>",
            parts: [
              { label: "a)", text: "Bereken die relatiewe frekwensie om 'n 5 te gooi, as 'n breuk in eenvoudigste vorm.", marks: 2 },
              { label: "b)", text: "Watter kant is die minste aantal kere gegooi, en wat is sy relatiewe frekwensie (rond af tot 3 desimale plekke)?", marks: 2 },
              { label: "c)", text: "Die teoretiese waarskynlikheid van enige enkele kant is 1/6 ≈ 0,167. Vergelyk dit met die relatiewe frekwensies gevind in (a) en (b), en kommentarieer of die dobbelsteen regverdig lyk.", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Twee-rigting-tabelle",
        questions: [
          {
            num: "2",
            text: "'n Opname onder 80 leerders het aangeteken of hulle 'n troeteldier besit en hul graad: Graad 8 — troeteldier 18, geen troeteldier 12; Graad 9 — troeteldier 24, geen troeteldier 26.",
            parts: [
              { label: "a)", text: "Teken die twee-rigting-tabel met ry- en kolomtotale.", marks: 3 },
              { label: "b)", text: "Bepaal P('n leerder is in Graad 9 en besit 'n troeteldier).", marks: 2 },
              { label: "c)", text: "Bepaal P('n leerder besit 'n troeteldier).", marks: 2 },
              { label: "d)", text: "Bepaal P('n leerder is in Graad 8).", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 19, chapterName: "Hoofstuk 19 — Waarskynlikheid",
    topics: [
      {
        name: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid",
        answers: [
          { num: "Q1a", ans: "P(3) = 1/5 = 0.2", note: "5 ewe waarskynlike afdelings" },
          { num: "Q1b", ans: "Relatiewe frekwensie = 52/200 = 0.26", note: "" },
          { num: "Q1c", ans: "0.26 is redelik naby aan 0.20; met 200 pogings word 'n mate van verskil weens toeval verwag — die wentelskyf is waarskynlik regverdig maar kan met meer pogings gekontroleer word", note: "Aanvaar geregverdigde antwoorde" },
          { num: "Q2a", ans: "24/120 = 1/5 = 0,2", note: "Uit die tabel: die frekwensie vir kant 5 is 24" },
          { num: "Q2b", ans: "Kant 4, die minste gegooi (17 keer); relatiewe frekwensie = 17/120 ≈ 0,142", note: "17/120 = 0.14166..." },
          { num: "Q2c", ans: "Beide 0,2 (kant 5) en 0,142 (kant 4) is redelik naby aan die teoretiese 0,167 vir 'n regverdige dobbelsteen — die klein verskille is in ooreenstemming met normale toevalsvariasie oor 120 pogings, dus lyk die dobbelsteen regverdig", note: "Aanvaar geregverdigde antwoorde wat na die Wet van Groot Getalle verwys" },
        ]
      },
      {
        name: "Twee-rigting-tabelle",
        answers: [
          { num: "Q2a", ans: "Graad 8: troeteldier 18, geen troeteldier 12, totaal 30; Graad 9: troeteldier 24, geen troeteldier 26, totaal 50; Kolomtotale: troeteldier 42, geen troeteldier 38; grondtotaal 80", note: "" },
          { num: "Q2b", ans: "P(Graad 9 en troeteldier) = 24/80 = 3/10", note: "" },
          { num: "Q2c", ans: "P(troeteldier) = 42/80 = 21/40", note: "" },
          { num: "Q2d", ans: "P(Graad 8) = 30/80 = 3/8", note: "" },
        ]
      },
    ]
  }
});
