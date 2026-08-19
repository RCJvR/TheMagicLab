// Math Magician — Graad 8, Hoofstuk 5 data
// Funksies en Verwantskappe

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 501,
      chapter: 5,
      name: "Toevoer, uitvoer & vloeidiagramme",
      fullName: "Toevoer-, uitvoerwaardes en vloeidiagramme",
      lesson: {
        heading: "Toevoer-, uitvoerwaardes en vloeidiagramme",
        sub: "Hoofstuk 5 · Onderwerp 1",
        body: `
          <p>'n <strong>Funksie</strong> is 'n reël wat 'n <em>toevoer</em>waarde neem en presies een <em>uitvoer</em>waarde lewer. Ons kan dit as 'n <strong>vloeidiagram</strong> voorstel.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelbegrippe</div>
            <p>
              <strong>Toevoer (x):</strong> die waarde wat jy insit.<br>
              <strong>Uitvoer (y):</strong> die waarde wat uitkom nadat die reël toegepas is.<br>
              <strong>Operator:</strong> die reël wat binne die "masjien" toegepas word (bv. ×3, +5).<br><br>
              'n Vloeidiagram lyk soos volg:<br>
              <span class="math">toevoer → [reël] → uitvoer</span><br><br>
              'n Twee-stap vloeidiagram:<br>
              <span class="math">x → [×2] → [+3] → y</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>Reël: vermenigvuldig met 3, trek dan 1 af. Toevoer: 4.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Stap 1: <span class="math">4 × 3 = 12</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Stap 2: <span class="math">12 − 1 = 11</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Uitvoer = <span class="math">11</span></span></div>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Toevoer/Uitvoer-masjien</div>
            <div id="ioMachine" style="margin-top:8px;">
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;">
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Reël 1</label>
                  <select id="op1" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                    <option value="mul">× vermenigvuldig</option>
                    <option value="div">÷ deel</option>
                    <option value="add">+ tel by</option>
                    <option value="sub">− trek af</option>
                  </select>
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">met</label>
                  <input id="val1" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Reël 2</label>
                  <select id="op2" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                    <option value="add" selected>+ tel by</option>
                    <option value="sub">− trek af</option>
                    <option value="mul">× vermenigvuldig</option>
                    <option value="div">÷ deel</option>
                  </select>
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">met</label>
                  <input id="val2" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
                </div>
              </div>
              <div style="overflow-x:auto;">
                <table id="ioTable" style="border-collapse:collapse;min-width:340px;">
                  <thead>
                    <tr>
                      <th style="padding:7px 16px;font-family:Syne,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.07em;color:rgba(245,158,11,0.70);text-align:center;border-bottom:1px solid rgba(255,255,255,0.10);">Toevoer (x)</th>
                      <th style="padding:7px 16px;font-family:Syne,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.07em;color:rgba(99,102,241,0.80);text-align:center;border-bottom:1px solid rgba(255,255,255,0.10);">Stap 1</th>
                      <th style="padding:7px 16px;font-family:Syne,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.07em;color:rgba(110,231,183,0.80);text-align:center;border-bottom:1px solid rgba(255,255,255,0.10);">Uitvoer (y)</th>
                    </tr>
                  </thead>
                  <tbody id="ioBody"></tbody>
                </table>
              </div>
              <p id="ioFormula" style="margin-top:10px;font-family:JetBrains Mono,monospace;font-size:12px;color:#fcd34d;"></p>
            </div>
          </div>
          <script>
          (function(){
            const inputs = [1,2,3,4,5,10];
            function applyOp(val, op, n) {
              if(op==='mul') return val*n;
              if(op==='div') return n!==0 ? val/n : '?';
              if(op==='add') return val+n;
              if(op==='sub') return val-n;
            }
            function opSymbol(op) {
              return {mul:'×',div:'÷',add:'+',sub:'−'}[op];
            }
            function update() {
              const op1=document.getElementById('op1').value;
              const v1=parseFloat(document.getElementById('val1').value)||0;
              const op2=document.getElementById('op2').value;
              const v2=parseFloat(document.getElementById('val2').value)||0;
              const tbody=document.getElementById('ioBody');
              tbody.innerHTML='';
              inputs.forEach(x=>{
                const mid=applyOp(x,op1,v1);
                const out=typeof mid==='number'?applyOp(mid,op2,v2):'?';
                const midStr=typeof mid==='number'?(mid%1?mid.toFixed(2):String(mid)):'?';
                const outStr=typeof out==='number'?(out%1?out.toFixed(2):String(out)):'?';
                const tr=document.createElement('tr');
                tr.innerHTML=
                  '<td style="padding:6px 16px;text-align:center;font-family:JetBrains Mono,monospace;font-size:13px;color:rgba(245,158,11,0.90);">'+x+'</td>'+
                  '<td style="padding:6px 16px;text-align:center;font-family:JetBrains Mono,monospace;font-size:13px;color:rgba(165,180,252,0.75);">'+midStr+'</td>'+
                  '<td style="padding:6px 16px;text-align:center;font-family:JetBrains Mono,monospace;font-size:13px;color:#6ee7b7;">'+outStr+'</td>';
                tbody.appendChild(tr);
              });
              document.getElementById('ioFormula').textContent =
                document.getElementById('ioFormula').textContent='Formule: y = (x '+opSymbol(op1)+' '+v1+') '+opSymbol(op2)+' '+v2;
            }
            ['op1','val1','op2','val2'].forEach(id=>{
              const el=document.getElementById(id);
              if(el) el.addEventListener('change',update);
              if(el) el.addEventListener('input',update);
            });
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Verander die reëls hierbo en kyk hoe die uitvoertabel opdateer. Let op hoe die verandering van die operator die verwantskap tussen x en y heeltemal verander.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Reël sê: vermenigvuldig met 4, trek dan 3 af. Toevoer = 7. Wat is die uitvoer?", answer: "25", topic: "Funksies" },
        { type: "mc", text: "Vir die reël <span class='math'>x → ×5 → −2 → y</span>, as x = 3, dan is y = ?", options: ["13", "11", "17", "7"], answer: 0, topic: "Funksies" },
        { type: "input", text: "'n Vloeidiagram het uitvoer 19 met die reël: vermenigvuldig met 2, tel dan 5 by. Wat was die toevoer?", answer: "7", topic: "Funksies" },
        { type: "mc", text: "Watter beskryf die vloeidiagram <span class='math'>x → ×3 → +4 → y</span>?", options: ["y = 4x + 3", "y = 3x + 4", "y = 3(x + 4)", "y = x + 7"], answer: 1, topic: "Funksies" },
        { type: "input", text: "Voltooi die tabel vir die reël <span class='math'>y = 2x + 1</span>. As x = 6, y = ?", answer: "13", topic: "Funksies" },
        { type: "input", text: "'n Vloeidiagram: <span class='math'>x → [+5] → [×3] → y</span>. As y = 36, wat was die toevoer x?", answer: "7", topic: "Funksies" },
        { type: "input", text: "Diagram A: <span class='math'>x → [×4] → [+2] → y</span>. Diagram B: <span class='math'>x → [×2] → [+14] → y</span>. Vir watter waarde van x gee albei diagramme dieselfde uitvoer y?", answer: "6", topic: "Funksies" },
      ]
    },
    {
      id: 502,
      chapter: 5,
      name: "Waardetabelle",
      fullName: "Verwantskappe voorstel met tabelle",
      lesson: {
        heading: "Waardetabelle",
        sub: "Hoofstuk 5 · Onderwerp 2",
        body: `
          <p>'n <strong>Waardetabel</strong> organiseer ooreenstemmende toevoer- en uitvoerwaardes, wat dit maklik maak om die patroon raak te sien en die reël te skryf.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Tabelle lees en voltooi</div>
            <p>
              <strong>Gegewe 'n reël</strong> → vervang elke toevoer om die uitvoer te vind.<br>
              <strong>Gegewe 'n tabel</strong> → vind watter bewerking elke x na sy y omskep.<br><br>
              Kontroleer altyd <em>elke</em> ry — moenie van net een paar aanneem nie.<br><br>
              Vir <span class="math">y = 2x − 1</span>:
            </p>
            <div class="math-block">x  |  1   2   3   4   5
y  |  1   3   5   7   9</div>
            <p>Patroon: y neem elke keer met 2 toe (konstante verskil = 2 = koëffisiënt van x)</p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Die reël uit 'n tabel vind</div>
            <div class="example-step"><span class="step-num">1</span><span>Tabel: x = 1,2,3,4 → y = 5,8,11,14</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Verskil in y: <span class="math">8−5 = 3</span> elke keer → koëffisiënt van x is 3</span></div>
            <div class="example-step"><span class="step-num">3</span><span>As x=1, y=5: <span class="math">3(1) + ? = 5</span> → konstante = 2</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Reël: <span class="math">y = 3x + 2</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Kontroleer x=4: <span class="math">3(4)+2 = 14 ✓</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Die verskil tussen opeenvolgende y-waardes is altyd gelyk aan die koëffisiënt van x in die formule.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Vir die reël <span class='math'>y = 4x − 3</span>, wat is die ontbrekende waarde as x = 5?", options: ["17", "23", "15", "22"], answer: 0, topic: "Funksies" },
        { type: "input", text: "'n Tabel toon x: 1,2,3 → y: 7,10,13. Wat is y as x = 10?", answer: "34", topic: "Funksies" },
        { type: "mc", text: "Watter reël pas by: x = 1,2,3,4 → y = 3,5,7,9?", options: ["y = x + 2", "y = 2x + 1", "y = 3x", "y = x + 3"], answer: 1, topic: "Funksies" },
        { type: "input", text: "Vir <span class='math'>y = 5x − 2</span>, vind x as y = 23.", answer: "5", topic: "Funksies" },
        { type: "mc", text: "'n Tabel: x = 2,4,6,8 → y = 7,13,19,25. Wat is die reël?", options: ["y = 3x + 1", "y = 2x + 3", "y = 6x − 5", "y = 3x − 2"], answer: 0, topic: "Funksies" },
        { type: "input", text: "'n Tabel toon x = 2, 5, 8 → y = 9, 18, 27. Bepaal die reël, en vind dan y as x = 20.", answer: "63", topic: "Funksies" },
        { type: "input", text: "'n Tabel toon x = 1, 2, 4 → y = 5, 9, 17 (let wel: die x-waardes is nie eweredig gespasieer nie). Bepaal die reël y = mx + c, en vind dan y as x = 10.", answer: "41", topic: "Funksies" },
      ]
    },
    {
      id: 503,
      chapter: 5,
      name: "Woord- & simboliese formules",
      fullName: "Woordformules en simboliese formules",
      lesson: {
        heading: "Woord- en simboliese formules",
        sub: "Hoofstuk 5 · Onderwerp 3",
        body: `
          <p>Dieselfde verwantskap kan in <strong>woorde</strong>, as 'n <strong>formule</strong>, of met <strong>algebraïese simbole</strong> beskryf word.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Drie gelykstaande vorme</div>
            <p>
              <strong>Woordformule:</strong> "Die uitvoer is drie keer die toevoer plus twee."<br><br>
              <strong>Simboliese formule:</strong> <span class="math">y = 3x + 2</span><br><br>
              <strong>Tabel:</strong>
            </p>
            <div class="math-block">x  |  0   1   2   3   4
y  |  2   5   8  11  14</div>
            <p>Al drie sê dieselfde ding — net in verskillende vorme.</p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Vertaal tussen vorme</div>
            <div class="example-step"><span class="step-num">1</span><span><strong>Woord → simbolies:</strong> "Vermenigvuldig die toevoer met 5 en trek 4 af" → <span class="math">y = 5x − 4</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><strong>Simbolies → woord:</strong> <span class="math">y = 2x + 7</span> → "Verdubbel die toevoer en tel 7 by"</span></div>
            <div class="example-step"><span class="step-num">3</span><span><strong>Werklike konteks:</strong> 'n Loodgieter vra R 150 uitroepfooi plus R 80/uur. Vir h ure: <span class="math">koste = 80h + 150</span></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Veranderlikes en konstantes</div>
            <p>
              In <span class="math">y = 3x + 2</span>:<br>
              <strong>x</strong> en <strong>y</strong> is <em>veranderlikes</em> — hulle verander.<br>
              <strong>3</strong> (koëffisiënt) en <strong>2</strong> (konstante) is vas.<br><br>
              Konvensie: gebruik <span class="math">x</span> vir toevoer en <span class="math">y</span> vir uitvoer.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Om vlot tussen woord-, tabel- en simboliese vorme te kan beweeg, is een van die belangrikste vaardighede in wiskunde.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter simboliese formule pas by: 'Vermenigvuldig die toevoer met 6 en trek 3 af'?", options: ["y = 6 − 3x", "y = 6x − 3", "y = 3x − 6", "y = 6(x − 3)"], answer: 1, topic: "Funksies" },
        { type: "input", text: "'n Taxi vra R 8 per km plus 'n R 20 vlagfooi. Skryf dit as 'n formule: koste = ? × km + 20. Wat is die koëffisiënt van km?", answer: "8", topic: "Funksies" },
        { type: "mc", text: "Die formule <span class='math'>y = 4x + 1</span> in woorde is:", options: ["Tel 4 by die toevoer, tel dan 1 by", "Vermenigvuldig die toevoer met 4, tel dan 1 by", "Vermenigvuldig die toevoer met 1, tel dan 4 by", "Tel 1 by 4 maal"], answer: 1, topic: "Funksies" },
        { type: "input", text: "'n Swembad hou 1 000 liter. Dit dreineer teen 25 liter per minuut. Volume na t minute: V = 1000 − 25t. Hoeveel minute om leeg te word? (V = 0)", answer: "40", topic: "Funksies" },
        { type: "mc", text: "Watter woordformule pas by <span class='math'>y = 10 − 3x</span>?", options: ["Vermenigvuldig die toevoer met 10, trek 3 af", "Trek die toevoer van 10 af, vermenigvuldig met 3", "Vermenigvuldig die toevoer met 3, trek dit van 10 af", "Tel 3 by die toevoer, trek dit van 10 af"], answer: 2, topic: "Funksies" },
        { type: "input", text: "'n Meubelverhuringsmaatskappy vra 'n R 250-deposito plus R 85 per week. Skryf die formule vir koste C na w weke, en bereken dan die koste om 12 weke te huur. (R)", answer: "1270", topic: "Funksies" },
        { type: "input", text: "Winkel A vra 'n R 150-deposito plus R 20 per dag om 'n fiets te huur. Winkel B vra R 35 per dag sonder deposito. Na hoeveel dae is die totale koste vir albei winkels dieselfde?", answer: "10", topic: "Funksies" },
      ]
    },
    {
      id: 504,
      chapter: 5,
      name: "Gelykstaande vorme",
      fullName: "Gelykstaande vorme van verwantskappe",
      lesson: {
        heading: "Gelykstaande vorme van verwantskappe",
        sub: "Hoofstuk 5 · Onderwerp 4",
        body: `
          <p>Dieselfde <strong>verwantskap</strong> kan op verskeie algebraïes gelykstaande maniere geskryf word. Om dit te herken, is die sleutel tot die oplos van vergelykings.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Gelykstaande vorme</div>
            <p>
              <span class="math">y = 2x + 6</span> is gelykstaande aan:<br>
              <span class="math">y = 2(x + 3)</span> (gefaktoriseerde vorm)<br>
              <span class="math">y − 6 = 2x</span> (herrangskik)<br>
              <span class="math">x = (y − 6) ÷ 2</span> (x as onderwerp)<br><br>
              Almal beskryf presies dieselfde verwantskap — net anders geskryf.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ x die onderwerp maak</div>
            <div class="example-step"><span class="step-num">1</span><span>Begin: <span class="math">y = 5x − 3</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Tel 3 by albei kante: <span class="math">y + 3 = 5x</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Deel albei kante deur 5: <span class="math">x = (y + 3) ÷ 5</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Kontroleer met x=4: <span class="math">y = 5(4)−3 = 17</span>, en <span class="math">x = (17+3)÷5 = 4 ✓</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Wat jy ook al aan een kant van 'n vergelyking doen, moet jy aan die ander kant ook doen. Dit hou die balans.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter is gelykstaande aan <span class='math'>y = 4x + 8</span>?", options: ["y = 4(x + 2)", "y = 4(x + 8)", "y = 4x + 4", "y = 2(2x + 3)"], answer: 0, topic: "Funksies" },
        { type: "input", text: "Maak x die onderwerp van <span class='math'>y = 3x + 6</span>. As y = 21, x = ?", answer: "5", topic: "Funksies" },
        { type: "mc", text: "Vir <span class='math'>y = 2x + 10</span>, watter is dieselfde verwantskap?", options: ["x = (y + 10) ÷ 2", "x = (y − 10) ÷ 2", "x = 2y − 10", "x = y ÷ 2 + 10"], answer: 1, topic: "Funksies" },
        { type: "input", text: "'n Formule is <span class='math'>y = 6x − 12</span>. Skryf in gefaktoriseerde vorm as <span class='math'>y = 6(x − ?)</span>. Wat gaan in die hakie?", answer: "2", topic: "Funksies" },
        { type: "mc", text: "As <span class='math'>y = 4x − 8</span>, wat is x as y = 20?", options: ["3", "5", "7", "12"], answer: 2, topic: "Funksies" },
        { type: "input", text: "Gegewe <span class='math'>y = 4x + 20</span>, skryf in gefaktoriseerde vorm <span class='math'>y = 4(x + a)</span> en vind dus x as y = 4.", answer: "-4", topic: "Funksies" },
        { type: "input", text: "Verwantskap 1 is <span class='math'>y = 2x + 6</span>. Verwantskap 2 is <span class='math'>y = 3x − 9</span>. Vind die waarde van x waarvoor albei verwantskappe dieselfde y gee.", answer: "15", topic: "Funksies" },
      ]
    },
    {
      id: 505,
      chapter: 5,
      name: "H5 Eksamenfokus",
      fullName: "Eksamenfokusoefening",
      lesson: {
        heading: "Hoofstuk 5 — Eksamenfokus",
        sub: "Hoofstuk 5 · Hersiening",
        body: `
          <p>Vrae oor Funksies en Verwantskappe in eksamens vra tipies dat jy: 'n tabel voltooi, 'n reël identifiseer, tussen vorme omskakel, of 'n spesifieke toevoer-/uitvoerwaarde vind.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 5-opsomming</div>
            <p>
              ✅ Toevoer → reël → uitvoer (vloeidiagramme)<br>
              ✅ Tabelle: vind die reël uit die patroon van verskille<br>
              ✅ Woordformule ↔ simboliese formule ↔ tabel<br>
              ✅ Gelykstaande vorme: dieselfde reël, ander rangskikking<br>
              ✅ Maak x die onderwerp deur inverse bewerkings toe te pas<br>
              ✅ Gebruik formules in werklike kontekste (koste, afstand, ens.)
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Wys in eksamens altyd die substitusiestap — bv. skryf <span class="math">y = 3(5) + 2</span> voordat jy <span class="math">y = 17</span> skryf.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "'n Tabel toon x: 0,1,2,3 → y: −2,1,4,7. Wat is die reël?", options: ["y = 2x − 2", "y = 3x − 2", "y = x + 1", "y = 4x − 3"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "Vir <span class='math'>y = 5x + 3</span>, vind y as x = −2.", answer: "-7", topic: "Gemeng" },
        { type: "mc", text: "'n Selfoonplan kos R 99/maand plus R 1,50 per SMS. Die formule is C = 1,5n + 99. Hoeveel SMS'e is gestuur as die rekening R 159 is?", options: ["30", "40", "50", "60"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "Maak x die onderwerp van <span class='math'>y = 7x − 14</span>. Vind x as y = 0.", answer: "2", topic: "Gemeng" },
        { type: "mc", text: "Watter tabel pas by <span class='math'>y = 2x − 3</span>?", options: ["x:1,2,3 → y:−1,1,3", "x:1,2,3 → y:1,3,5", "x:1,2,3 → y:2,4,6", "x:1,2,3 → y:−2,0,2"], answer: 0, topic: "Gemeng" },
        { type: "input", text: "'n Selfoonplan kos R 120/maand plus R 2 per minuut bo die gratis toekenning. As 'n kliënt se rekening R 156 was, hoeveel minute bo die toekenning is gebruik?", answer: "18", topic: "Gemeng" },
        { type: "input", text: "Plan A kos R 80 plus R 3 per GB data. Plan B kos R 50 plus R 4,50 per GB. Vir hoeveel GB data is die twee planne se totale prys dieselfde?", answer: "20", topic: "Gemeng" },
      ]
    }
  ],
  workbook: {
    chapter: 5, chapterName: "Funksies en Verwantskappe",
    topics: [
      {
        name: "Vloeidiagramme en tabelle",
        questions: [
          {
            num: "1",
            text: "Voltooi die tabel vir die reël <span class='math'>y = 4x − 3</span>:",
            parts: [
              { label: "a)", text: "Vul die ontbrekende y-waardes in vir x = 1, 2, 3, 4, 5.", marks: 4 },
              { label: "b)", text: "Beskryf die reël in woorde.", marks: 2 },
              { label: "c)", text: "Vind x as y = 29.", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "'n Vloeidiagram toon: x → [×3] → [−5] → y",
            parts: [
              { label: "a)", text: "Voltooi die tabel vir x = 0, 2, 4, 6, 10.", marks: 4 },
              { label: "b)", text: "Skryf die simboliese formule vir hierdie verwantskap.", marks: 2 },
              { label: "c)", text: "Vind die toevoerwaarde wat 'n uitvoer van 22 gee.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Formules en werklike kontekste",
        questions: [
          {
            num: "3",
            text: "'n Loodgieter vra 'n R 200-uitroepfooi plus R 120 per uur.",
            parts: [
              { label: "a)", text: "Skryf 'n formule vir die totale koste C in terme van ure h.", marks: 2 },
              { label: "b)", text: "Bereken die koste vir 'n 3-uur werk.", marks: 2 },
              { label: "c)", text: "Hoeveel ure het die loodgieter gewerk as die rekening R 680 was?", marks: 3 },
              { label: "d)", text: "'n Tweede loodgieter vra R 150 + R 130/uur. Vir hoeveel ure is die koste gelyk?", marks: 4 },
            ]
          },
          {
            num: "4",
            text: "Die tabel hieronder toon 'n verwantskap tussen x en y:",
            parts: [
              { label: "", text: "x: 1, 2, 3, 4, 5 → y: 4, 7, 10, 13, 16", marks: 0 },
              { label: "a)", text: "Skryf die reël as 'n simboliese formule.", marks: 3 },
              { label: "b)", text: "Skryf 'n gelykstaande vorm in gefaktoriseerde vorm.", marks: 2 },
              { label: "c)", text: "Maak x die onderwerp van die formule.", marks: 3 },
              { label: "d)", text: "Vind x as y = 100.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 5, chapterName: "Hoofstuk 5 — Funksies en Verwantskappe",
    topics: [
      {
        name: "Vloeidiagramme en tabelle",
        answers: [
          { num: "Q1a", ans: "y: 1, 5, 9, 13, 17", note: "Vervang elke x in y = 4x − 3" },
          { num: "Q1b", ans: "Vermenigvuldig die toevoer met 4, trek dan 3 af", note: "" },
          { num: "Q1c", ans: "x = 8", note: "4x − 3 = 29 → 4x = 32 → x = 8" },
          { num: "Q2a", ans: "y: −5, 1, 7, 13, 25", note: "(x×3)−5 vir elke toevoer" },
          { num: "Q2b", ans: "y = 3x − 5", note: "" },
          { num: "Q2c", ans: "x = 9", note: "3x − 5 = 22 → 3x = 27 → x = 9" },
        ]
      },
      {
        name: "Formules en werklike kontekste",
        answers: [
          { num: "Q3a", ans: "C = 120h + 200", note: "" },
          { num: "Q3b", ans: "R 560", note: "120(3) + 200 = 360 + 200 = 560" },
          { num: "Q3c", ans: "4 ure", note: "120h + 200 = 680 → 120h = 480 → h = 4" },
          { num: "Q3d", ans: "5 ure", note: "120h+200 = 130h+150 → 50 = 10h → h = 5" },
          { num: "Q4a", ans: "y = 3x + 1", note: "d=3, as x=1 y=4: 3(1)+c=4 → c=1" },
          { num: "Q4b", ans: "y = 3(x + ⅓) of kontroleer: geen skoon gefaktoriseerde vorm nie — aanvaar y = 3x + 1", note: "" },
          { num: "Q4c", ans: "x = (y − 1) ÷ 3", note: "y − 1 = 3x → x = (y−1)/3" },
          { num: "Q4d", ans: "x = 33", note: "(100−1)÷3 = 99÷3 = 33" },
        ]
      },
    ]
  }
});
