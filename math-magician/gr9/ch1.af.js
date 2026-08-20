// Math Magician — Graad 9, Hoofstuk 1 data
// Getalstelsels, Verhoudings, Tempo's en Finansiële Wiskunde

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 0,
      chapter: 1,
      name: "Getalstelsels",
      fullName: "Getalstelsels en rasionale getalle",
      lesson: {
        heading: "Getalstelsels en rasionale getalle",
        sub: "Hoofstuk 1 · Onderwerp 1",
        body: `
          <p>Die <strong>reële getalstelsel</strong> is 'n hiërargie van getalversamelings, elkeen ingesluit binne die volgende.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Die getalhiërargie</div>
            <p>
              <strong>Natuurlike getalle (N):</strong> {1, 2, 3, …} — teltalle.<br>
              <strong>Heelgetalle (N0):</strong> {0, 1, 2, 3, …} — sluit nul in.<br>
              <strong>Gehele getalle (Z):</strong> {…, -2, -1, 0, 1, 2, …} — sluit negatiewe getalle in.<br>
              <strong>Rasionale getalle (Q):</strong> enige getal wat as <span class="math">p/q</span> geskryf kan word waar p, q ∈ Z, q ≠ 0. Sluit alle eindigende en herhalende desimale in.<br>
              <strong>Irrasionale getalle:</strong> nie-eindigende, nie-herhalende desimale (bv. <span class="math">√2, π</span>).<br>
              <strong>Reële getalle (R):</strong> alle rasionale en irrasionale getalle.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Klassifisering van getalle</div>
            <div class="example-step"><span class="step-num">1</span><span>Klassifiseer <span class="math">-3</span>: geheelgetal ✓, rasionaal ✓, reëel ✓</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Klassifiseer <span class="math">0,\overline{3} = 1/3</span>: rasionaal ✓, reëel ✓</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Klassifiseer <span class="math">√7</span>: irrasionaal ✓, reëel ✓ (nie rasionaal nie)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Herhalende desimaal omskep: laat x = 0,\overline{36} → 100x = 36,\overline{36} → 99x = 36 → x = 36/99 = 4/11</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Lineêre Ry-verkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer die eerste term en gemeenskaplike verskil in. Sien die ry, algemene term, en enige T&#8345;.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Eerste term (a)</label><input id="seqA" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Gemeenskaplike verskil (d)</label><input id="seqD" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">n =</label><input id="seqN" type="number" value="10" min="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
            </div>
            <div id="seqOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('seqA').value)||0;
              const d=parseFloat(document.getElementById('seqD').value)||0;
              const n=parseInt(document.getElementById('seqN').value)||1;
              const terms=Array.from({length:8},function(_,i){return a+i*d;});
              const tn=a+(n-1)*d;
              const c=a-d;
              const genStr=d===0?String(a):d+'n'+(c>0?' + '+c:c<0?' \u2212 '+Math.abs(c):'');
              document.getElementById('seqOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:130px;display:inline-block;">Eerste 8 terme:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', …</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:130px;display:inline-block;">Algemene term:</span><span style="color:#fbbf24;">T\u2099 = '+genStr+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:130px;display:inline-block;">T<sub>'+n+'</sub>:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+tn+'</span></div>',
              ].join('');
            }
            ['seqA','seqD','seqN'].forEach(function(id){document.getElementById(id).addEventListener('input',update);});
            update();
          })();
          </script>
        Elke geheelgetal is rasionaal (bv. -5 = -5/1). Nie elke rasionale getal is 'n geheelgetal nie.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter een van hierdie is irrasionaal?", options: ["0,25", "√9", "√5", "-7"], answer: 2, topic: "Getalstelsels" },
        { type: "mc", text: "Die versameling gehele getalle is 'n deelversameling van:", options: ["Natuurlike getalle", "Heelgetalle", "Rasionale getalle", "Irrasionale getalle"], answer: 2, topic: "Getalstelsels" },
        { type: "input", text: "Skryf 0,<span class='math'>\\overline{27}</span> as 'n breuk. Gee die teller as die breuk in eenvoudigste vorm oor 99 is.", answer: "3", topic: "Getalstelsels" },
        { type: "mc", text: "Watter stelling is ONWAAR?", options: ["Alle natuurlike getalle is gehele getalle", "Alle gehele getalle is rasionaal", "Alle irrasionale getalle is reëel", "Alle rasionale getalle is gehele getalle"], answer: 3, topic: "Getalstelsels" },
        { type: "input", text: "Skryf 0,<span class='math'>\\overline{142857}</span> as 'n breuk (gee die noemer).", answer: "7", topic: "Getalstelsels" },
        { type: "input", text: "Bereken 0,<span class='math'>\\overline{18}</span> + 0,2 en gee die antwoord as 'n enkele breuk a/b in eenvoudigste vorm (skryf dit as a/b).", answer: "21/55", altAnswers: ["21​/​55"], topic: "Getalstelsels" },
        { type: "mc", text: "Beskou die produk <span class='math'>√2 × √8</span>. Wat kan jy aflei?", options: ["Dit is irrasionaal, aangesien irrasionaal × irrasionaal altyd irrasionaal is", "Dit is rasionaal, gelyk aan 4", "Dit is irrasionaal, gelyk aan √16", "Dit kan nie vereenvoudig word nie"], answer: 1, topic: "Getalstelsels" },
      ]
    },
    {
      id: 1,
      chapter: 1,
      name: "Verhoudings en tempo's",
      fullName: "Verhoudings, tempo's en direkte/indirekte eweredigheid",
      lesson: {
        heading: "Verhoudings, tempo's en eweredigheid",
        sub: "Hoofstuk 1 · Onderwerp 2",
        body: `
          <p>'n <strong>Verhouding</strong> vergelyk hoeveelhede van dieselfde soort. 'n <strong>Tempo</strong> vergelyk hoeveelhede van verskillende soorte (bv. km/h).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleuteldefinisies</div>
            <p>
              <strong>Verhouding a : b:</strong> vir elke a eenhede van een hoeveelheid is daar b eenhede van 'n ander.<br>
              <strong>Tempo:</strong> verhouding met verskillende eenhede — bv. prys per kg, km per liter.<br>
              <strong>Direkte eweredigheid:</strong> soos een hoeveelheid toeneem, neem die ander eweredig toe. <span class="math">y = kx</span>.<br>
              <strong>Indirekte eweredigheid:</strong> soos een hoeveelheid toeneem, neem die ander af. <span class="math">y = k/x</span>.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Verdeel R 720 in die verhouding 3 : 5 : 4 → Totale dele = 12; 1 deel = R 60 → aandele: R 180, R 300, R 240</span></div>
            <div class="example-step"><span class="step-num">2</span><span>As 5 werkers 12 dae neem (indirekte eweredigheid), hoe lank vir 4 werkers? → 5 × 12 = 4 × d → d = 15 dae</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Eenheidstempo: 252 km op 18 L → 252 ÷ 18 = 14 km/L</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir indirekte eweredigheid bly die produk konstant: <span class="math">
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Enkelvoudige teenoor Saamgestelde Rente</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Sien hoe enkelvoudige en saamgestelde rente oor tyd vergelyk teen dieselfde koers.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Hoofsom (R)</label><input id="intP" type="number" value="10000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Koers % p.j.</label><input id="intR" type="number" value="8" step="0.5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Jare</label><input id="intN" type="number" value="10" min="1" max="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="intBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="intOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function rr(n){return 'R\u202f'+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,'\u202f');}
            function calc(){
              var P=parseFloat(document.getElementById('intP').value)||10000;
              var rate=parseFloat(document.getElementById('intR').value)/100||0.08;
              var n=parseInt(document.getElementById('intN').value)||10;
              var As=P*(1+rate*n),Ac=P*Math.pow(1+rate,n);
              document.getElementById('intOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Enkelvoudig A = P(1+in):</span><span style="color:#a5b4fc;">'+rr(As)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Enkelvoudige rente verdien:</span><span style="color:#fbbf24;">'+rr(As-P)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Saamgesteld A = P(1+i)\u207f:</span><span style="color:#6ee7b7;">'+rr(Ac)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Saamgestelde rente verdien:</span><span style="color:#6ee7b7;font-weight:700;">'+rr(Ac-P)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Saamgestelde voordeel:</span><span style="color:#f59e0b;">+'+rr(Ac-As)+'</span></div>',
              ].join('');
            }
            document.getElementById('intBtn').addEventListener('click',calc);
            ['intP','intR','intN'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});

          })();
          </script>
        x1y1 = x2y2</span>.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Verdeel R 1 200 in die verhouding 2 : 3 : 5. Die grootste aandeel is:", options: ["R 240", "R 360", "R 480", "R 600"], answer: 3, topic: "Verhoudings" },
        { type: "input", text: "8 krane vul 'n tenk in 6 uur. Hoeveel uur sou 4 krane neem?", answer: "12", topic: "Tempo's" },
        { type: "mc", text: "Watter vergelyking toon indirekte eweredigheid tussen x en y?", options: ["y = 3x", "y = x + 3", "y = 3/x", "y = x²"], answer: 2, topic: "Verhoudings" },
        { type: "input", text: "'n Motor ry 390 km op 30 liter. Bereken die brandstofverbruik in km per liter.", answer: "13", topic: "Tempo's" },
        { type: "mc", text: "As y direk eweredig is aan x en y = 18 wanneer x = 6, bepaal y wanneer x = 10.", options: ["30", "60", "3", "108"], answer: 0, topic: "Verhoudings" },
        { type: "input", text: "'n Resep benodig meel, suiker en botter in die verhouding 5 : 2 : 3. Jy het 800 g meel (genoeg vir 'n volle porsie) maar slegs 250 g botter. Hoeveel meer gram botter moet jy koop?", answer: "230", topic: "Verhoudings" },
        { type: "input", text: "12 werkers kan 'n muur in 18 dae bou. Hulle werk vir 6 dae, waarna 4 werkers die werk verlaat. Deur die feit te gebruik dat totale werker-dae konstant bly, bereken die totale aantal dae (vanaf die begin) benodig om die muur te voltooi.", answer: "24", topic: "Tempo's" },
      ]
    },
    {
      id: 2,
      chapter: 1,
      name: "Finansiële wiskunde",
      fullName: "Finansiële wiskunde: rente, BTW en wisselkoerse",
      lesson: {
        heading: "Finansiële wiskunde",
        sub: "Hoofstuk 1 · Onderwerp 3",
        body: `
          <p>Finansiële wiskunde dek die berekening van rente, belasting, en geldeenheidomskakelings.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelformules</div>
            <p>
              <strong>Enkelvoudige rente:</strong> <span class="math">I = P × i × n</span> waar P = hoofsom, i = koers (desimaal), n = tyd in jare.<br>
              <strong>Saamgestelde rente:</strong> <span class="math">A = P(1 + i)n</span><br>
              <strong>BTW (15%):</strong> BTW-inklusief = prys × 1,15<br>
              <strong>Huurkoop:</strong> deposito + (maandelikse paaiement × maande)<br>
              <strong>Wisselkoers:</strong> vermenigvuldig of deel afhangende van die geldeenheidrigting.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>R 5 000 teen 8% p.j. enkelvoudige rente vir 3 jaar: I = 5000 × 0,08 × 3 = R 1 200; Totaal = R 6 200</span></div>
            <div class="example-step"><span class="step-num">2</span><span>R 10 000 teen 9% p.j. saamgesteld vir 2 jaar: A = 10 000(1,09)² = 10 000 × 1,1881 = R 11 881</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Wisselkoers: 1 USD = R 18,50. Skakel $250 om: 250 × 18,50 = R 4 625</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Enkelvoudige teenoor Saamgestelde Rente</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Sien hoe enkelvoudige en saamgestelde rente oor tyd vergelyk teen dieselfde koers.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Hoofsom (R)</label><input id="intP2" type="number" value="10000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Koers % p.j.</label><input id="intR2" type="number" value="8" step="0.5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Jare</label><input id="intN2" type="number" value="10" min="1" max="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="intBtn2" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="intOut2" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function rr(n){return 'R\u202f'+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,'\u202f');}
            function calc(){
              var P=parseFloat(document.getElementById('intP2').value)||10000;
              var rate=parseFloat(document.getElementById('intR2').value)/100||0.08;
              var n=parseInt(document.getElementById('intN2').value)||10;
              var As=P*(1+rate*n),Ac=P*Math.pow(1+rate,n);
              document.getElementById('intOut2').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Enkelvoudig A = P(1+in):</span><span style="color:#a5b4fc;">'+rr(As)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Enkelvoudige rente verdien:</span><span style="color:#fbbf24;">'+rr(As-P)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Saamgesteld A = P(1+i)\u207f:</span><span style="color:#6ee7b7;">'+rr(Ac)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Saamgestelde rente verdien:</span><span style="color:#6ee7b7;font-weight:700;">'+rr(Ac-P)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Saamgestelde voordeel:</span><span style="color:#f59e0b;">+'+rr(Ac-As)+'</span></div>',
              ].join('');
            }
            document.getElementById('intBtn2').addEventListener('click',calc);
            ['intP2','intR2','intN2'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});

          })();
          </script>
        Saamgestelde rente groei vinniger as enkelvoudige rente. Die verskil word oor baie jare merkbaar.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken enkelvoudige rente op R 6 000 teen 7% p.j. vir 4 jaar.", answer: "1680", topic: "Finansies" },
        { type: "mc", text: "'n Skootrekenaar kos R 12 000 uitgesluit BTW (15%). Die BTW-inklusiewe prys is:", options: ["R 13 200", "R 13 600", "R 13 800", "R 12 800"], answer: 2, topic: "Finansies" },
        { type: "input", text: "Bereken saamgestelde rente op R 8 000 teen 10% p.j. vir 2 jaar. Gee die totale bedrag.", answer: "9680", topic: "Finansies" },
        { type: "mc", text: "As 1 GBP = R 23, hoeveel rand vir £150?", options: ["R 3 350", "R 3 400", "R 3 450", "R 3 500"], answer: 2, topic: "Finansies" },
        { type: "input", text: "'n TV kos R 3 500. Jy betaal 'n 20% deposito en 12 maandelikse paaiemente van R 260. Wat is die totale huurkoopkoste?", answer: "3820", topic: "Finansies" },
        { type: "input", text: "'n Baadjie het 'n gemerkte (BTW-inklusiewe) prys van R 690. In 'n uitverkoping word dit met 20% van die gemerkte prys afgeslaan. Van die nuwe uitverkoopprys, hoeveel (in rand) is die BTW-gedeelte (BTW is 15%)? Rond af tot die naaste rand.", answer: "72", topic: "Finansies" },
        { type: "input", text: "'n Yskas kos R 9 000 kontant. Op huurkoop betaal jy 'n 15% deposito en dan 24 maandelikse paaiemente van R 350. Hoeveel MEER (in rand) betaal jy in totaal op huurkoop in vergelyking met die kontantprys?", answer: "750", topic: "Finansies" },
      ]
    },
  ],
  workbook: {
    chapter: 1, chapterName: "Getalstelsels, Verhoudings, Tempo's, en Finansiële Wiskunde",
    topics: [
      {
        name: "Getalstelsels",
        questions: [
          {
            num: "1",
            text: "Klassifiseer elke getal deur al die versamelings te lys waaraan dit behoort (N, N0, Z, Q, irrasionaal, R):",
            parts: [
              { label: "a)", text: "-6", marks: 2 },
              { label: "b)", text: "0", marks: 2 },
              { label: "c)", text: "√11", marks: 2 },
              { label: "d)", text: "2,4… (d.w.s. 2,444…)", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Skakel elke herhalende desimaal om na 'n breuk in eenvoudigste vorm:",
            parts: [
              { label: "a)", text: "0,7…", marks: 3 },
              { label: "b)", text: "0,36… (d.w.s. 0,363636…)", marks: 3 },
              { label: "c)", text: "1,2… (d.w.s. 1,222…)", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Verhoudings en Tempo's",
        questions: [
          {
            num: "3",
            text: "Drie vriende belê in 'n besigheid in die verhouding 4 : 3 : 5. Die totale belegging is R 48 000.",
            parts: [
              { label: "a)", text: "Hoeveel belê elke persoon?", marks: 4 },
              { label: "b)", text: "Hulle maak 'n wins van R 18 000 wat in dieselfde verhouding gedeel word. Bereken elke persoon se aandeel.", marks: 4 },
            ]
          },
          {
            num: "4",
            text: "Ses masjiene vervaardig 480 items per dag.",
            parts: [
              { label: "a)", text: "Hoeveel items sou 9 masjiene in 'n dag vervaardig? (direkte eweredigheid)", marks: 3 },
              { label: "b)", text: "Hoeveel dae sou dit vir 4 masjiene neem om 480 items te vervaardig? (indirekte eweredigheid)", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Finansiële Wiskunde",
        questions: [
          {
            num: "5",
            text: "'n Hoofsom van R 15 000 word teen 6% per jaar enkelvoudige rente vir 5 jaar belê.",
            parts: [
              { label: "a)", text: "Bereken die rente verdien.", marks: 3 },
              { label: "b)", text: "Bereken die totale bedrag aan die einde van 5 jaar.", marks: 2 },
            ]
          },
          {
            num: "6",
            text: "R 20 000 word teen 8% per jaar saamgestelde rente belê.",
            parts: [
              { label: "a)", text: "Bereken die bedrag na 3 jaar.", marks: 4 },
              { label: "b)", text: "Hoeveel meer verdien saamgestelde rente in vergelyking met enkelvoudige rente oor 3 jaar?", marks: 3 },
            ]
          },
          {
            num: "7",
            text: "Die wisselkoers is 1 EUR = R 20,40.",
            parts: [
              { label: "a)", text: "Skakel €350 om na rand.", marks: 2 },
              { label: "b)", text: "Skakel R 8 160 om na euro.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 1, chapterName: "Hoofstuk 1 — Getalstelsels, Verhoudings, Tempo's, en Finansiële Wiskunde",
    topics: [
      {
        name: "Getalstelsels",
        answers: [
          { num: "Q1a", ans: "Z, Q, R", note: "-6 is negatief, dus nie N of N0 nie" },
          { num: "Q1b", ans: "N0, Z, Q, R", note: "0 is in heelgetalle en hoër, rasionaal = 0/1" },
          { num: "Q1c", ans: "Irrasionaal, R", note: "11 is nie 'n volkome vierkant nie" },
          { num: "Q1d", ans: "Q, R", note: "herhalende desimaal → 22/9, wat rasionaal is" },
          { num: "Q2a", ans: "7/9", note: "laat x = 0,7…; 10x = 7,7…; 9x = 7; x = 7/9" },
          { num: "Q2b", ans: "4/11", note: "100x = 36,36…; 99x = 36; x = 36/99 = 4/11" },
          { num: "Q2c", ans: "11/9", note: "laat x = 1,2…; 10x = 12,2…; 9x = 11; x = 11/9" },
        ]
      },
      {
        name: "Verhoudings en Tempo's",
        answers: [
          { num: "Q3a", ans: "R 16 000 : R 12 000 : R 20 000", note: "12 dele in totaal; 1 deel = R 4 000" },
          { num: "Q3b", ans: "R 6 000 : R 4 500 : R 7 500", note: "1 deel van wins = 18 000÷12 = R 1 500" },
          { num: "Q4a", ans: "720 items", note: "direk: 9/6 × 480 = 720" },
          { num: "Q4b", ans: "1,5 dae", note: "indirek: 6 × 1 dag = 4 × d; d = 6/4 = 1,5 dae vir 1 dag se produksie. Vir 480: dieselfde totale werk = 4 × d = 6 × 1, d = 1,5" },
        ]
      },
      {
        name: "Finansiële Wiskunde",
        answers: [
          { num: "Q5a", ans: "I = R 4 500", note: "I = 15 000 × 0,06 × 5 = 4 500" },
          { num: "Q5b", ans: "R 19 500", note: "15 000 + 4 500 = 19 500" },
          { num: "Q6a", ans: "R 25 194,24", note: "A = 20 000(1,08)³ = 20 000 × 1,259712 = 25 194,24" },
          { num: "Q6b", ans: "Saamgesteld = R 5 194,24; Enkelvoudig = R 4 800; Verskil = R 394,24", note: "Enkelvoudig: 20000 × 0,08 × 3 = 4800" },
          { num: "Q7a", ans: "R 7 140", note: "350 × 20,40 = 7 140" },
          { num: "Q7b", ans: "€400", note: "8 160 ÷ 20,40 = 400" },
        ]
      },
    ]
  }
});
