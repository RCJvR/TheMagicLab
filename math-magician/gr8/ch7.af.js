// Math Magician — Graad 8, Hoofstuk 7 data
// Algebraïese Vergelykings

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 701,
      chapter: 7,
      name: "Wat is 'n vergelyking?",
      fullName: "Vergelykings opstel en verstaan",
      lesson: {
        heading: "Wat is 'n vergelyking?",
        sub: "Hoofstuk 7 · Onderwerp 1",
        body: `
          <p>'n <strong>Vergelyking</strong> is 'n wiskundige stelling dat twee uitdrukkings gelyk is. Om 'n vergelyking op te los, beteken om die waarde van die veranderlike te vind wat dit waar maak.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelwoordeskat</div>
            <p>
              <strong>Vergelyking:</strong> twee uitdrukkings verbind deur = &nbsp; bv. <span class="math">3x + 5 = 17</span><br>
              <strong>Oplossing:</strong> die waarde van die veranderlike wat die vergelyking waar maak.<br>
              <strong>Linkerkant (LK):</strong> uitdrukking links van =<br>
              <strong>Regterkant (RK):</strong> uitdrukking regs van =<br>
              <strong>Verifieer:</strong> vervang die oplossing terug om te kontroleer dat LK = RK.<br><br>
              'n Vergelyking is soos 'n <em>balansskaal</em> — wat jy ook al aan een kant doen, moet jy aan die ander kant ook doen om dit gebalanseerd te hou.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Vergelykings uit woorde opstel</div>
            <div class="example-step"><span class="step-num">1</span><span>"Ek dink aan 'n getal, vermenigvuldig dit met 3 en tel 7 by. Die resultaat is 22."</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Laat die getal = x</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Vergelyking: <span class="math">3x + 7 = 22</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>"Vyf meer as twee keer 'n getal is 19."</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Vergelyking: <span class="math">2x + 5 = 19</span></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Uitdrukking vs Vergelyking</div>
            <p>
              <strong>Uitdrukking:</strong> <span class="math">3x + 5</span> — geen gelykheidsteken nie, kan nie opgelos word nie.<br>
              <strong>Vergelyking:</strong> <span class="math">3x + 5 = 17</span> — het 'n gelykheidsteken, kan opgelos word.<br>
              <strong>Formule:</strong> <span class="math">A = l × b</span> — 'n vergelyking wat 'n algemene reël toon.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Definieer altyd jou veranderlike eerste. Skryf "Laat x = ..." voordat jy die vergelyking opstel. Dit verdien punte in eksamens, selfs al gaan jou algebra verkeerd.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter van die volgende is 'n vergelyking?", options: ["3x + 5", "3x + 5 = 17", "3x − 5 > 2", "3(x + 5)"], answer: 1, topic: "Vergelykings" },
        { type: "input", text: "'n Getal word verdubbel en dan met 4 verminder om 10 te gee.' Stel die vergelyking op. Wat is die koëffisiënt van x?", answer: "2", topic: "Vergelykings" },
        { type: "mc", text: "Is x = 4 'n oplossing vir <span class='math'>3x − 5 = 7</span>?", options: ["Ja, LK = 7 ✓", "Nee, LK = 8", "Nee, LK = 6", "Ja, LK = 6"], answer: 0, topic: "Vergelykings" },
        { type: "mc", text: "'Vyf minder as drie keer 'n getal is 16.' Watter vergelyking stel dit voor?", options: ["3x + 5 = 16", "5 − 3x = 16", "3x − 5 = 16", "3(x − 5) = 16"], answer: 2, topic: "Vergelykings" },
        { type: "input", text: "Verifieer: is x = 5 'n oplossing vir <span class='math'>4x − 3 = 17</span>? Tik 'ja' of 'nee'.", answer: "ja", topic: "Vergelykings" },
        { type: "input", text: "'As 'n getal met 6 vermeerder en dan verdubbel word, is die resultaat 3 minder as 5 keer die getal.' Vind die getal.", answer: "5", topic: "Vergelykings" },
      ]
    },
    {
      id: 702,
      chapter: 7,
      name: "Oplos deur inspeksie",
      fullName: "Vergelykings oplos deur inspeksie",
      lesson: {
        heading: "Vergelykings oplos deur inspeksie",
        sub: "Hoofstuk 7 · Onderwerp 2",
        body: `
          <p><strong>Oplos deur inspeksie</strong> beteken om die oplossing te vind deur versigtig te dink oor watter waarde die vergelyking waar maak — sonder formele algebraïese stappe.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Wanneer om inspeksie te gebruik</div>
            <p>
              Inspeksie werk goed vir eenvoudige vergelykings waar die antwoord maklik raakgesien kan word:<br>
              <span class="math">x + 5 = 12</span> → "wat + 5 = 12?" → x = 7<br>
              <span class="math">3x = 21</span> → "3 × wat = 21?" → x = 7<br>
              <span class="math">x − 4 = 9</span> → "wat − 4 = 9?" → x = 13<br><br>
              Vir meer komplekse vergelykings, gebruik formele metodes (Onderwerp 3).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">x + 8 = 15</span> → x = 7 (want 7 + 8 = 15)</span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">4x = 28</span> → x = 7 (want 4 × 7 = 28)</span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">x/3 = 5</span> → x = 15 (want 15/3 = 5)</span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">2x + 1 = 11</span> → 2x = 10 → x = 5</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Kontroleer altyd jou antwoord deur dit terug te vervang. Skryf "Kontroleer: LK = ... = RK ✓" — dit is goeie eksamenpraktyk en verdien verifikasiepunte.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Los op deur inspeksie: <span class='math'>x + 9 = 17</span>", answer: "8", topic: "Vergelykings" },
        { type: "input", text: "Los op deur inspeksie: <span class='math'>5x = 35</span>", answer: "7", topic: "Vergelykings" },
        { type: "mc", text: "Los op deur inspeksie: <span class='math'>x/4 = 6</span>", options: ["2", "10", "24", "18"], answer: 2, topic: "Vergelykings" },
        { type: "input", text: "Los op deur inspeksie: <span class='math'>3x + 2 = 14</span>", answer: "4", topic: "Vergelykings" },
        { type: "mc", text: "Watter waarde van x voldoen aan <span class='math'>2x − 3 = 11</span>?", options: ["4", "5", "7", "8"], answer: 2, topic: "Vergelykings" },
        { type: "input", text: "As <span class='math'>x + 9 = 16</span> (los op deur inspeksie) en <span class='math'>3x − y = 15</span>, vind y.", answer: "6", topic: "Vergelykings" },
      ]
    },
    {
      id: 703,
      chapter: 7,
      name: "Oplos met inverse",
      fullName: "Vergelykings oplos met additiewe en multiplikatiewe inverse",
      lesson: {
        heading: "Vergelykings oplos met inverse bewerkings",
        sub: "Hoofstuk 7 · Onderwerp 3",
        body: `
          <p>Die formele metode om vergelykings op te los, gebruik <strong>inverse bewerkings</strong> om die veranderlike te isoleer. Dink daaraan as om elke bewerking om te keer om x alleen te kry.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Inverse bewerkings</div>
            <p>
              <strong>Additiewe inverse:</strong> tel dieselfde waarde by albei kante of trek dit van albei kante af.<br>
              <span class="math">x + 5 = 12 → x + 5 − 5 = 12 − 5 → x = 7</span><br><br>
              <strong>Multiplikatiewe inverse:</strong> vermenigvuldig of deel albei kante met/deur dieselfde waarde.<br>
              <span class="math">3x = 21 → 3x/3 = 21/3 → x = 7</span><br><br>
              <strong>Gekombineer:</strong> gebruik eers die additiewe inverse, dan die multiplikatiewe.<br>
              <span class="math">3x + 5 = 17 → 3x = 12 → x = 4</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Volledige uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>Los op: <span class="math">4x − 3 = 13</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Tel 3 by albei kante: <span class="math">4x = 16</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Deel albei kante deur 4: <span class="math">x = 4</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Kontroleer: <span class="math">4(4) − 3 = 16 − 3 = 13 ✓</span></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Met breuke</div>
            <div class="example-step"><span class="step-num">1</span><span>Los op: <span class="math">x/3 + 2 = 7</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Trek 2 af: <span class="math">x/3 = 5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Vermenigvuldig met 3: <span class="math">x = 15</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Kontroleer: <span class="math">15/3 + 2 = 5 + 2 = 7 ✓</span></span></div>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Vergelyking-oplosser</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Tik 'n vergelyking in die vorm ax + b = c en sien die stap-vir-stap oplossing.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <input id="eqA" type="number" value="3" placeholder="a" style="width:52px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:14px;">x +</span>
              <input id="eqB" type="number" value="5" placeholder="b" style="width:52px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:14px;">=</span>
              <input id="eqC" type="number" value="17" placeholder="c" style="width:52px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="eqSolveBtn" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Los op</button>
            </div>
            <div id="eqSteps" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;color:rgba(221,225,240,0.75);"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){ a=Math.abs(a);b=Math.abs(b); return b===0?a:gcd(b,a%b); }
            function fmtNum(n){
              if(Number.isInteger(n)) return String(n);
              // Try to show as fraction if denominator is small
              for(let d=2;d<=100;d++){
                const num=Math.round(n*d);
                if(Math.abs(num/d-n)<1e-9){
                  const g=gcd(Math.abs(num),d);
                  return (num/g)+'/'+(d/g);
                }
              }
              return n.toFixed(4);
            }
            function solve() {
              const a = parseFloat(document.getElementById('eqA').value);
              const b = parseFloat(document.getElementById('eqB').value);
              const c = parseFloat(document.getElementById('eqC').value);
              const el = document.getElementById('eqSteps');
              if(isNaN(a)||isNaN(b)||isNaN(c)){
                el.innerHTML='<span style="color:#fca5a5;">Voer geldige getalle in.</span>'; return;
              }
              if(a===0){
                el.innerHTML='<span style="color:#fca5a5;">Koëffisiënt a kan nie 0 wees nie — dit is nie 'n lineêre vergelyking nie.</span>'; return;
              }
              const x = (c - b) / a;
              const absB = Math.abs(b);
              // Build equation string correctly for any sign of b
              const eqStr = a+'x ' + (b>=0 ? '+ '+b : '− '+absB) + ' = '+c;
              let rows = [];
              rows.push('<div><span style="color:#fbbf24;">Vergelyking: '+eqStr+'</span></div>');
              if(b !== 0) {
                const verb = b > 0 ? 'Trek '+b+' af van' : 'Tel '+absB+' by';
                rows.push('<div style="opacity:0.6;font-size:11px;">Stap 1: '+verb+' albei kante</div>');
                rows.push('<div style="color:#a5b4fc;">'+a+'x = '+c+' '+(b>0?'− '+b:'+ '+absB)+'</div>');
                rows.push('<div style="color:#a5b4fc;">'+a+'x = '+(c-b)+'</div>');
                rows.push('<div style="opacity:0.6;font-size:11px;margin-top:2px;">Stap 2: Deel albei kante deur '+a+'</div>');
                rows.push('<div style="color:#a5b4fc;">x = '+(c-b)+' ÷ '+a+'</div>');
              } else {
                rows.push('<div style="opacity:0.6;font-size:11px;">Stap 1: Deel albei kante deur '+a+'</div>');
                rows.push('<div style="color:#a5b4fc;">x = '+c+' ÷ '+a+'</div>');
              }
              rows.push('<div style="color:#6ee7b7;font-size:15px;font-weight:700;margin-top:4px;">x = '+fmtNum(x)+'</div>');
              // Verification
              const check = a*x + b;
              const checkStr = fmtNum(check);
              rows.push('<div style="opacity:0.45;font-size:11px;margin-top:6px;">Kontroleer: '+a+'('+fmtNum(x)+') '+(b>=0?'+ '+b:'− '+absB)+' = '+checkStr+(Math.abs(check-c)<0.0001?' = '+c+' ✓':' ✗ (afronding)')+'</div>');
              el.innerHTML = rows.join('');
            }
            document.getElementById('eqSolveBtn').addEventListener('click', solve);
            ['eqA','eqB','eqC'].forEach(id => document.getElementById(id).addEventListener('keydown', e => e.key==='Enter' && solve()));
            solve();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Probeer negatiewe waardes vir b invoer. Let op hoe "tel by" en "trek af" omruil. Die reël is altyd: pas die <em>teenoorgestelde</em> bewerking op albei kante toe.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Los op: <span class='math'>2x + 7 = 19</span>", answer: "6", topic: "Vergelykings" },
        { type: "input", text: "Los op: <span class='math'>5x − 3 = 22</span>", answer: "5", topic: "Vergelykings" },
        { type: "mc", text: "Los op: <span class='math'>x/4 + 3 = 8</span>", options: ["5", "20", "44", "11"], answer: 1, topic: "Vergelykings" },
        { type: "input", text: "Los op: <span class='math'>3x + 12 = 0</span>", answer: "-4", topic: "Vergelykings" },
        { type: "mc", text: "Los op: <span class='math'>−2x + 10 = 4</span>", options: ["7", "3", "−7", "−3"], answer: 1, topic: "Vergelykings" },
        { type: "input", text: "Los op: <span class='math'>x/5 − 2 = 3</span>", answer: "25", topic: "Vergelykings" },
        { type: "input", text: "Los op: <span class='math'>2(x/3 + 4) = 18</span>", answer: "15", topic: "Vergelykings" },
      ]
    },
    {
      id: 704,
      chapter: 7,
      name: "Veranderlikes aan albei kante",
      fullName: "Vergelykings met veranderlikes aan albei kante",
      lesson: {
        heading: "Vergelykings met veranderlikes aan albei kante",
        sub: "Hoofstuk 7 · Onderwerp 4",
        body: `
          <p>Wanneer veranderlikes aan <strong>albei kante</strong> van die vergelyking voorkom, versamel al die veranderlike-terme aan een kant en al die konstantes aan die ander kant.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Strategie</div>
            <p>
              1. Skuif veranderlike-terme na een kant (trek die kleiner veranderlike-term af).<br>
              2. Skuif konstante-terme na die ander kant.<br>
              3. Los op deur die multiplikatiewe inverse te gebruik.<br>
              4. Verifieer altyd deur terug te vervang.<br><br>
              <strong>Voorbeeld:</strong> <span class="math">5x + 3 = 2x + 12</span><br>
              Trek 2x af: <span class="math">3x + 3 = 12</span><br>
              Trek 3 af: <span class="math">3x = 9</span><br>
              Deel deur 3: <span class="math">x = 3</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Volledige uitgewerkte voorbeeld met hakies</div>
            <div class="example-step"><span class="step-num">1</span><span>Los op: <span class="math">3(x + 4) = 2x + 17</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Vermenigvuldig uit: <span class="math">3x + 12 = 2x + 17</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Trek 2x af: <span class="math">x + 12 = 17</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Trek 12 af: <span class="math">x = 5</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Kontroleer: <span class="math">3(5+4) = 27</span> en <span class="math">2(5)+17 = 27 ✓</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Skuif die veranderlike-term met die kleiner koëffisiënt om negatiewes te vermy. bv. in <span class="math">5x = 2x + 9</span>, trek 2x af (nie 5x nie) om dit positief te hou.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Los op: <span class='math'>5x + 3 = 3x + 11</span>", answer: "4", topic: "Vergelykings" },
        { type: "input", text: "Los op: <span class='math'>7x − 4 = 4x + 11</span>", answer: "5", topic: "Vergelykings" },
        { type: "mc", text: "Los op: <span class='math'>4(x + 1) = 2x + 10</span>", options: ["2", "3", "4", "6"], answer: 1, topic: "Vergelykings" },
        { type: "input", text: "Los op: <span class='math'>2(3x − 1) = 4x + 8</span>", answer: "5", topic: "Vergelykings" },
        { type: "mc", text: "Los op: <span class='math'>6x − 7 = 2x + 5</span>", options: ["1", "2", "3", "4"], answer: 2, topic: "Vergelykings" },
        { type: "input", text: "Los op: <span class='math'>3(x − 2) = 2(x + 1)</span>", answer: "8", topic: "Vergelykings" },
        { type: "input", text: "Los op: <span class='math'>2(x − 3) − (x − 4) = 3(x − 4)</span>", answer: "5", topic: "Vergelykings" },
      ]
    },
    {
      id: 705,
      chapter: 7,
      name: "Woordprobleme",
      fullName: "Woordprobleme oplos met vergelykings",
      lesson: {
        heading: "Woordprobleme met vergelykings",
        sub: "Hoofstuk 7 · Onderwerp 5",
        body: `
          <p>Woordprobleme vereis dat jy 'n werklike situasie in 'n vergelyking <strong>vertaal</strong>, dit oplos, en die antwoord in konteks interpreteer.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Woordprobleme oplos — 5 stappe</div>
            <p>
              1. <strong>Lees</strong> die probleem versigtig — twee keer.<br>
              2. <strong>Definieer</strong> die veranderlike: "Laat x = ..."<br>
              3. <strong>Stel</strong> die vergelyking op vanuit die gegewe inligting.<br>
              4. <strong>Los</strong> die vergelyking op met formele metodes.<br>
              5. <strong>Beantwoord</strong> in konteks — sluit eenhede in en kontroleer of dit sin maak.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld 1 — opeenvolgende getalle</div>
            <div class="example-step"><span class="step-num">1</span><span>Die som van twee opeenvolgende getalle is 47. Vind hulle.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Laat eerste getal = x, tweede = x + 1</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Vergelyking: <span class="math">x + (x + 1) = 47</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">2x + 1 = 47 → 2x = 46 → x = 23</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Die getalle is 23 en 24. Kontroleer: <span class="math">23 + 24 = 47 ✓</span></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld 2 — omtrek</div>
            <div class="example-step"><span class="step-num">1</span><span>'n Reghoek se lengte is 3 meer as sy breedte. Omtrek = 38 cm. Vind die breedte.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Laat breedte = x, lengte = x + 3</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Omtrek: <span class="math">2(x) + 2(x+3) = 38</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">4x + 6 = 38 → 4x = 32 → x = 8</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Breedte = 8 cm, Lengte = 11 cm. Kontroleer: <span class="math">2(8)+2(11) = 38 ✓</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Punte in eksamens word toegeken vir: die veranderlike definieer, die vergelyking opstel, dit oplos, en in konteks antwoord. Al vier dele tel.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Die som van drie opeenvolgende heelgetalle is 51. Wat is die kleinste heelgetal?", answer: "16", topic: "Woordprobleme" },
        { type: "mc", text: "Sipho is 4 jaar ouer as Thandi. Saam is hulle ouderdomme 28. Hoe oud is Thandi?", options: ["10", "12", "14", "16"], answer: 1, topic: "Woordprobleme" },
        { type: "input", text: "'n Reghoek het lengte 2x en breedte x − 1. Sy omtrek is 34 cm. Vind x.", answer: "6", topic: "Woordprobleme" },
        { type: "mc", text: "Ek dink aan 'n getal, vermenigvuldig met 4 en trek 9 af. Die resultaat is gelyk aan die getal plus 6. Wat is die getal?", options: ["3", "4", "5", "6"], answer: 2, topic: "Woordprobleme" },
        { type: "input", text: "Twee vriende deel R 180. Een kry R 20 meer as die ander. Hoeveel ontvang die kleiner deel? (R)", answer: "80", topic: "Woordprobleme" },
        { type: "input", text: "Oor 5 jaar sal Lindiwe twee keer so oud wees as wat sy 3 jaar gelede was. Hoe oud is sy nou?", answer: "11", topic: "Woordprobleme" },
      ]
    },
    {
      id: 706,
      chapter: 7,
      name: "H7 Eksamenfokus",
      fullName: "Eksamenfokusoefening",
      lesson: {
        heading: "Hoofstuk 7 — Eksamenfokus",
        sub: "Hoofstuk 7 · Hersiening",
        body: `
          <p>Vrae oor algebraïese vergelykings in eksamens wissel van eenvoudige een-stap-oplos tot multi-stap vergelykings met hakies en veranderlikes aan albei kante. Woordprobleme kom in elke vraestel voor.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 7-opsomming</div>
            <p>
              ✅ Vergelyking = twee uitdrukkings verbind deur =<br>
              ✅ Inspeksie: sien die antwoord raak vir eenvoudige vergelykings<br>
              ✅ Formeel: gebruik inverse bewerkings — trek af/tel by, dan deel/vermenigvuldig<br>
              ✅ Veranderlikes aan albei kante: versamel eers die x-terme aan een kant<br>
              ✅ Hakies: vermenigvuldig eers uit, los dan op<br>
              ✅ Woordprobleme: definieer veranderlike → vergelyking → los op → antwoord in konteks<br>
              ✅ Verifieer altyd: vervang terug en kontroleer LK = RK
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>'n Algemene eksamenfout: korrek oplos maar nie die finale antwoord as "x = ..." skryf nie — of vergeet om te verifieer. Albei verloor punte.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Los op: <span class='math'>3(2x − 1) − 2(x + 3) = 5</span>", answer: "3", topic: "Gemeng" },
        { type: "mc", text: "Los op: <span class='math'>5x − 3 = 3x + 7</span>", options: ["2", "3", "4", "5"], answer: 3, topic: "Gemeng" },
        { type: "input", text: "Die omtrek van 'n gelyksydige driehoek is 45 cm. Elke sy = 3x − 1. Vind x.", answer: "6", topic: "Gemeng" },
        { type: "mc", text: "Los op: <span class='math'>4(x + 3) = 2(2x + 6)</span>", options: ["x = 0", "x = 3", "Geen oplossing — oneindig baie oplossings", "x = 6"], answer: 2, topic: "Gemeng" },
        { type: "input", text: "'n Getal word met 6 vermenigvuldig, en dan word 11 afgetrek. Die resultaat is 3 meer as twee keer die getal. Vind die getal.", answer: "7", topic: "Gemeng" },
        { type: "input", text: "'n Reghoek se omtrek is 5 keer sy breedte. Die lengte is 9 cm meer as die breedte. Vind die breedte (in cm).", answer: "18", topic: "Gemeng" },
      ]
    }
  ],
  workbook: {
    chapter: 7, chapterName: "Algebraïese Vergelykings",
    topics: [
      {
        name: "Oplos met inverse",
        questions: [
          {
            num: "1",
            text: "Los die volgende vergelykings op. Wys alle stappe.",
            parts: [
              { label: "a)", text: "<span class='math'>3x + 7 = 22</span>", marks: 2 },
              { label: "b)", text: "<span class='math'>5x − 3 = 2x + 9</span>", marks: 3 },
              { label: "c)", text: "<span class='math'>2(x + 4) = 14</span>", marks: 3 },
              { label: "d)", text: "<span class='math'>4(2x − 3) = 3(x + 2)</span>", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Veranderlikes aan albei kante",
        questions: [
          {
            num: "2",
            text: "Los op en verifieer jou antwoord:",
            parts: [
              { label: "a)", text: "<span class='math'>7x − 4 = 3x + 12</span>", marks: 3 },
              { label: "b)", text: "<span class='math'>5(x − 2) = 2(x + 4)</span>", marks: 4 },
              { label: "c)", text: "<span class='math'>3(2x + 1) − 2(x − 3) = 25</span>", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Woordprobleme en formules",
        questions: [
          {
            num: "3",
            text: "Stel 'n vergelyking op en los elke probleem op:",
            parts: [
              { label: "a)", text: "Die som van drie opeenvolgende heelgetalle is 72. Vind die heelgetalle.", marks: 4 },
              { label: "b)", text: "'n Reghoek se lengte is 5 cm meer as sy breedte. Sy omtrek is 62 cm. Vind die afmetings.", marks: 4 },
              { label: "c)", text: "Twee vriende deel R 340 sodat een R 60 meer as die ander ontvang. Hoeveel ontvang elkeen?", marks: 3 },
            ]
          },
          {
            num: "4",
            text: "Die formule om Celsius na Fahrenheit om te skakel is <span class='math'>F = 1.8C + 32</span>.",
            parts: [
              { label: "a)", text: "Vind F as C = 25.", marks: 2 },
              { label: "b)", text: "Maak C die onderwerp van die formule.", marks: 3 },
              { label: "c)", text: "Vind C as F = 212.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 7, chapterName: "Hoofstuk 7 — Algebraïese Vergelykings",
    topics: [
      {
        name: "Oplos met inverse",
        answers: [
          { num: "Q1a", ans: "x = 5", note: "3x=15 → x=5" },
          { num: "Q1b", ans: "x = 4", note: "3x=12 → x=4" },
          { num: "Q1c", ans: "x = 3", note: "2x+8=14 → 2x=6 → x=3" },
          { num: "Q1d", ans: "x = 18/5 = 3.6", note: "8x−12=3x+6 → 5x=18 → x=3.6" },
        ]
      },
      {
        name: "Veranderlikes aan albei kante",
        answers: [
          { num: "Q2a", ans: "x = 4", note: "4x=16 → x=4; kontroleer: 7(4)−4=24=3(4)+12 ✓" },
          { num: "Q2b", ans: "x = 6", note: "5x−10=2x+8 → 3x=18 → x=6" },
          { num: "Q2c", ans: "x = 4", note: "6x+3−2x+6=25 → 4x+9=25 → 4x=16 → x=4" },
        ]
      },
      {
        name: "Woordprobleme en formules",
        answers: [
          { num: "Q3a", ans: "23, 24, 25", note: "x+(x+1)+(x+2)=72 → 3x+3=72 → x=23" },
          { num: "Q3b", ans: "Breedte = 13 cm, Lengte = 18 cm", note: "2(w+w+5)=62 → 4w+10=62 → w=13; l=18" },
          { num: "Q3c", ans: "R 140 en R 200", note: "x+(x+60)=340 → 2x=280 → x=140" },
          { num: "Q4a", ans: "F = 77°", note: "1.8(25)+32=45+32=77" },
          { num: "Q4b", ans: "C = (F − 32) ÷ 1.8", note: "F−32=1.8C → C=(F−32)/1.8" },
          { num: "Q4c", ans: "C = 100°", note: "(212−32)/1.8=180/1.8=100" },
        ]
      },
    ]
  }
});
