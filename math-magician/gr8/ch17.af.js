// Math Magician — Grade 8, Chapter 17 data
// Probability

MathMagician.registerChapter(17, {
  topics: [
    {
      id: 1701,
      chapter: 17,
      name: "Waarskynlikheidskonsepte",
      fullName: "Inleiding tot waarskynlikheid",
      lesson: {
        heading: "Inleiding tot waarskynlikheid",
        sub: "Hoofstuk 17 · Onderwerp 1",
        body: `
          <p><strong>Waarskynlikheid</strong> is die wiskunde van kans — dit meet hoe waarskynlik dit is dat 'n gebeurtenis plaasvind, op 'n skaal van 0 (onmoontlik) tot 1 (seker).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelwoordeskat</div>
            <p>
              <strong>Eksperiment:</strong> 'n handeling met onsekere uitkomste, bv. die gooi van 'n dobbelsteen.<br>
              <strong>Uitkoms:</strong> 'n enkele resultaat, bv. 'n 4 gooi.<br>
              <strong>Gebeurtenis:</strong> een of meer uitkomste van belang, bv. 'n ewe getal gooi.<br>
              <strong>Uitkomsruimte (S):</strong> die versameling van alle moontlike uitkomste.<br>
              &nbsp;&nbsp;bv. Die gooi van 'n dobbelsteen: <span class="math">S = {1, 2, 3, 4, 5, 6}</span>, n(S) = 6.<br><br>
              <strong>Waarskynlikheidsformule:</strong><br>
              <span class="math">P(gebeurtenis) = aantal gunstige uitkomste ÷ totale uitkomste</span><br>
              <span class="math">P(E) = n(E) ÷ n(S)</span><br><br>
              <strong>Waarskynlikheidskaal:</strong><br>
              &nbsp;&nbsp;• P = 0: onmoontlik &nbsp;&nbsp; P = 0.5: ewe waarskynlik &nbsp;&nbsp; P = 1: seker<br>
              &nbsp;&nbsp;• 0 ≤ P(E) ≤ 1 altyd.<br><br>
              <strong>Komplement:</strong> <span class="math">P(nie E) = 1 − P(E)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>'n Regverdige dobbelsteen word gegooi. P(gooi 'n 3) = <span class="math">1/6</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>P(gooi 'n ewe getal) = <span class="math">3/6 = 1/2</span> (uitkomste: 2, 4, 6)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>P(gooi 'n getal > 4) = <span class="math">2/6 = 1/3</span> (uitkomste: 5, 6)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>P(nie 'n 3 gooi nie) = <span class="math">1 − 1/6 = 5/6</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Waarskynlikheidberekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Stel die grootte van die uitkomsruimte en die aantal gunstige uitkomste in.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Gunstig n(E)</label>
                <input id="probFav" type="number" value="3" min="0" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Totaal n(S)</label>
                <input id="probTotal" type="number" value="6" min="1" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div id="probOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){ return b===0?a:gcd(b,a%b); }
            function update(){
              const f=parseInt(document.getElementById('probFav').value)||0;
              const t=parseInt(document.getElementById('probTotal').value)||1;
              if(f<0||t<1||f>t){
                document.getElementById('probOut').innerHTML='<span style="color:#fca5a5;">Kontroleer waardes: 0 ≤ n(E) ≤ n(S)</span>';
                return;
              }
              const g=gcd(f,t);
              const dec=(f/t);
              const pct=(dec*100);
              let desc='';
              if(dec===0) desc='Onmoontlik';
              else if(dec<0.25) desc='Onwaarskynlik';
              else if(dec<0.5) desc='Minder waarskynlik as nie';
              else if(dec===0.5) desc='Ewe waarskynlik';
              else if(dec<0.75) desc='Meer waarskynlik as nie';
              else if(dec<1) desc='Baie waarskynlik';
              else desc='Seker';
              document.getElementById('probOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">P(E):</span><span style="color:#fcd34d;">'+(f/g)+'/'+(t/g)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Desimaal:</span><span style="color:#6ee7b7;">'+dec.toFixed(4)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Persentasie:</span><span style="color:#a5b4fc;">'+pct.toFixed(1)+'%</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">P(nie E):</span><span style="color:#fbbf24;">'+((t-f)/g)+'/'+(t/g)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Beskrywing:</span><span style="color:rgba(221,225,240,0.60);">'+desc+'</span></div>',
              ].join('');
            }
            ['probFav','probTotal'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vereenvoudig waarskynlikheidsbreuke altyd. En kontroleer altyd: P(E) + P(nie E) = 1. As hulle nie tot 1 optel nie, het jy 'n fout gemaak.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "'n Sak het 3 rooi, 5 blou, 2 groen balle. P(rooi) = ?", options: ["3/5", "3/8", "3/10", "1/3"], answer: 2, topic: "Waarskynlikheid" },
        { type: "input", text: "'n Regverdige dobbelsteen word gegooi. P(gooi 'n getal kleiner as 3) = ? (skryf as 'n breuk bv. 1/3)", answer: "1/3", topic: "Waarskynlikheid" },
        { type: "mc", text: "P('n gebeurtenis) = 0.7. Wat is P(nie die gebeurtenis)?", options: ["0.7", "0.3", "1.7", "0.07"], answer: 1, topic: "Waarskynlikheid" },
        { type: "mc", text: "Watter waarskynlikheidswaarde is onmoontlik?", options: ["0", "0.5", "1", "1.2"], answer: 3, topic: "Waarskynlikheid" },
        { type: "input", text: "'n Wentelskyf het 8 gelyke afdelings: 3 geel, 2 rooi, 3 blou. P(nie geel) = ? (breuk)", answer: "5/8", topic: "Waarskynlikheid" },
        { type: "input", text: "'n Sak bevat slegs rooi, blou, en groen balle (20 balle in totaal). P(rooi) = 2/5 en P(blou) = 3/10. Hoeveel groen balle is daar?", answer: "6", topic: "Waarskynlikheid" },
        { type: "input", text: "In 'n speletjie is P(wen) = 0.15 en P(gelykop speel) = 0.35. As jy 40 speletjies speel, hoeveel keer sou jy verwag om te verloor (nóg wen nóg gelykop speel)?", answer: "20", topic: "Waarskynlikheid" },
      ]
    },
    {
      id: 1702,
      chapter: 17,
      name: "Lys van uitkomste",
      fullName: "Lys van uitkomste en uitkomsruimtes",
      lesson: {
        heading: "Lys van uitkomste en uitkomsruimtes",
        sub: "Hoofstuk 17 · Onderwerp 2",
        body: `
          <p>Om waarskynlikheid akkuraat te bereken, moet jy alle moontlike uitkomste volledig en sistematies lys.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Metodes om uitkomste te lys</div>
            <p>
              <strong>Lysnotasie:</strong> skryf alle uitkomste in 'n versameling: <span class="math">S = {HH, HT, TH, TT}</span>.<br><br>
              <strong>Boomdiagram:</strong> takke wys elke fase van die eksperiment. Vermenigvuldig langs takke vir saamgestelde gebeurtenisse.<br><br>
              <strong>Twee-rigting-tabel (rooster):</strong> rye = uitkomste van gebeurtenis 1, kolomme = uitkomste van gebeurtenis 2. Elke sel = een gekombineerde uitkoms.<br><br>
              <strong>Fundamentele telbeginsel:</strong><br>
              As gebeurtenis 1 <em>m</em> uitkomste het en gebeurtenis 2 <em>n</em> uitkomste het, is die totale gekombineerde uitkomste = <span class="math">m × n</span>.<br>
              bv. 'n Muntstuk EN 'n dobbelsteen: <span class="math">2 × 6 = 12</span> moontlike uitkomste.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Twee muntstukke gegooi — boomdiagram</div>
            <div class="example-step"><span class="step-num">1</span><span>Muntstuk 1: K of M → Muntstuk 2: K of M elke keer.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Uitkomsruimte: <span class="math">S = {HH, HT, TH, TT}</span>, n(S) = 4.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>P(presies een H) = <span class="math">2/4 = 1/2</span> (HT en TH)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>P(ten minste een H) = <span class="math">3/4</span> (HH, HT, TH)</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Twee-rigting-tabel — dobbelsteen en muntstuk</div>
            <div class="example-step"><span class="step-num">1</span><span>Dobbelsteen: {1,2,3,4,5,6} × Muntstuk: {H,T} → 12 uitkomste.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>P(H en ewe getal) = <span class="math">3/12 = 1/4</span> (H2, H4, H6)</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Uitkomsruimte-generator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer uitkomste vir twee gebeurtenisse in (kommageskei) om die volledige uitkomsruimte te sien.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:flex-end;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Gebeurtenis 1-uitkomste</label>
                <input id="ss1" type="text" value="H,T" style="width:160px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Gebeurtenis 2-uitkomste</label>
                <input id="ss2" type="text" value="1,2,3,4,5,6" style="width:160px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <button id="ssGen" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Genereer</button>
            </div>
            <div id="ssOut" style="font-size:12px;"></div>
          </div>
          <script>
          (function(){
            function gen(){
              const a=document.getElementById('ss1').value.split(',').map(s=>s.trim()).filter(Boolean);
              const b=document.getElementById('ss2').value.split(',').map(s=>s.trim()).filter(Boolean);
              const pairs=[];
              a.forEach(x=>b.forEach(y=>pairs.push('('+x+','+y+')')));
              const el=document.getElementById('ssOut');
              if(!pairs.length){el.innerHTML='<span style="color:#fca5a5;">Voer ten minste een uitkoms vir elke gebeurtenis in.</span>';return;}
              el.innerHTML='<div style="color:rgba(221,225,240,0.45);font-family:JetBrains Mono,monospace;font-size:11px;margin-bottom:6px;">n(S) = '+a.length+' × '+b.length+' = <span style="color:#fbbf24;">'+pairs.length+'</span></div>'
                +'<div style="color:rgba(165,180,252,0.80);font-family:JetBrains Mono,monospace;font-size:12px;line-height:1.8;">S = { '+pairs.join(', ')+' }</div>';
            }
            document.getElementById('ssGen').addEventListener('click',gen);
            gen();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer jy uitkomste sistematies lys, hou altyd een gebeurtenis vas en verander die ander — dit verseker dat jy geen kombinasies mis of dubbeltel nie.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Muntstuk word gegooi en 'n dobbelsteen word gegooi. Hoeveel uitkomste is in die uitkomsruimte?", answer: "12", topic: "Uitkomsruimte" },
        { type: "mc", text: "Twee muntstukke word gegooi. Wat is P(albei munt)?", options: ["1/2", "1/4", "1/3", "3/4"], answer: 1, topic: "Uitkomsruimte" },
        { type: "mc", text: "'n Sak het 3 hemde (rooi, blou, groen) en 2 mussies (pet, wintermus). Hoeveel drag-kombinasies is moontlik?", options: ["5", "6", "9", "3"], answer: 1, topic: "Uitkomsruimte" },
        { type: "input", text: "Twee dobbelstene word gegooi. Hoeveel uitkomste is in die uitkomsruimte?", answer: "36", topic: "Uitkomsruimte" },
        { type: "mc", text: "Twee muntstukke word gegooi. P(ten minste een kop) = ?", options: ["1/4", "1/2", "2/4", "3/4"], answer: 3, topic: "Uitkomsruimte" },
        { type: "input", text: "Drie muntstukke word saam gegooi. Wat is P(presies twee koppe)? (breuk)", answer: "3/8", topic: "Uitkomsruimte" },
        { type: "input", text: "'n Restaurant bied 3 voorgeregte, 4 hoofgeregte, en 2 nagereg-opsies. 'n Resensent kies lukraak een volledige 3-gang-kombinasie. Wat is P(die maaltyd sluit een spesifieke hoofgereg in)? (breuk)", answer: "1/4", topic: "Uitkomsruimte" },
      ]
    },
    {
      id: 1703,
      chapter: 17,
      name: "Relatiewe frekwensie",
      fullName: "Relatiewe frekwensie en eksperimentele waarskynlikheid",
      lesson: {
        heading: "Relatiewe frekwensie en eksperimentele waarskynlikheid",
        sub: "Hoofstuk 17 · Onderwerp 3",
        body: `
          <p><strong>Teoretiese waarskynlikheid</strong> word bereken uit ewe waarskynlike uitkomste. <strong>Eksperimentele waarskynlikheid</strong> (relatiewe frekwensie) word gemeet deur werklik 'n eksperiment uit te voer.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Eksperimentele teenoor teoretiese waarskynlikheid</div>
            <p>
              <strong>Teoretiese waarskynlikheid:</strong> <span class="math">P(E) = n(E) ÷ n(S)</span> — neem aan dat alle uitkomste ewe waarskynlik is.<br><br>
              <strong>Eksperimentele waarskynlikheid (relatiewe frekwensie):</strong><br>
              <span class="math">P(E) ≈ aantal kere wat E voorgekom het ÷ totale aantal pogings</span><br><br>
              <strong>Sleutelbeginsel:</strong> soos die aantal pogings toeneem, kom die eksperimentele waarskynlikheid nader aan die teoretiese waarskynlikheid. Dit is die <em>Wet van Groot Getalle</em>.<br><br>
              <strong>Regverdig teenoor bevooroordeeld:</strong><br>
              &nbsp;&nbsp;• 'n Regverdige muntstuk/dobbelsteen: elke uitkoms ewe waarskynlik.<br>
              &nbsp;&nbsp;• 'n Bevooroordeelde (vervalste) dobbelsteen: sommige uitkomste meer waarskynlik as ander — eksperimentele waarskynlikheid sal van die teoretiese verskil.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>'n Muntstuk word 100 keer gegooi. Kop verskyn 47 keer.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Eksperimentele P(K) = <span class="math">47/100 = 0.47</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Teoretiese P(K) = <span class="math">1/2 = 0.50</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Die verskil (0.03) is te wyte aan toeval — met meer gooie sou die resultate nader aan 0.50 kom.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Relatiewe Frekwensie-berekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer die aantal suksesse en totale pogings in om met die teoretiese waarskynlikheid te vergelyk.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Suksesse</label>
                <input id="rfSucc" type="number" value="47" min="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Totale pogings</label>
                <input id="rfTrials" type="number" value="100" min="1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Teoretiese P</label>
                <input id="rfTheo" type="number" value="0.5" min="0" max="1" step="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div id="rfOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const s=parseFloat(document.getElementById('rfSucc').value)||0;
              const t=parseFloat(document.getElementById('rfTrials').value)||1;
              const th=parseFloat(document.getElementById('rfTheo').value)||0;
              const exp=s/t;
              const diff=Math.abs(exp-th);
              document.getElementById('rfOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Eksperimentele P:</span><span style="color:#fcd34d;">'+exp.toFixed(4)+'</span> ('+s+'/'+t+')</div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Teoretiese P:</span><span style="color:#a5b4fc;">'+th.toFixed(4)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Verskil:</span><span style="color:'+(diff<0.05?'#6ee7b7':'#fca5a5')+';">'+diff.toFixed(4)+'</span></div>',
                '<div style="margin-top:4px;font-size:11px;opacity:0.45;">'+((diff<0.05)?'Naby aan die teoretiese waarde — resultate lyk regverdig.':'Merkbare verskil — moontlik bevooroordeeld, of meer pogings nodig.')+'</div>',
              ].join('');
            }
            ['rfSucc','rfTrials','rfTheo'].forEach(id=>document.getElementById(id).addEventListener('input',calc));

          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In eksamens: eksperimentele waarskynlikheid is altyd 'n skatting. Hoe meer pogings, hoe betroubaarder die skatting. Sê nooit eksperimenteel = teoreties nie — sê "kom nader aan" of "benader".</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Dobbelsteen word 60 keer gegooi. 'n 6 verskyn 8 keer. Wat is die eksperimentele P(6)? (breuk)", answer: "2/15", topic: "Relatiewe frekwensie" },
        { type: "mc", text: "Teoretiese P(6) op 'n regverdige dobbelsteen is 1/6 ≈ 0.167. Eksperimentele P(6) = 8/60 ≈ 0.133. Wat kan jy aflei?", options: ["Die dobbelsteen is beslis bevooroordeeld", "Die dobbelsteen mag bevooroordeeld wees, of die verskil is te wyte aan toeval", "Die eksperiment was verkeerd", "Eksperimenteel en teoreties moet altyd ooreenstem"], answer: 1, topic: "Relatiewe frekwensie" },
        { type: "mc", text: "Soos die aantal pogings toeneem, doen eksperimentele waarskynlikheid die volgende:", options: ["Beweeg verder van teoreties af", "Kom nader aan die teoretiese waarskynlikheid", "Bly dieselfde", "Word onmiddellik presies gelyk"], answer: 1, topic: "Relatiewe frekwensie" },
        { type: "input", text: "'n Muntstuk word 200 keer gegooi. Kop verskyn 95 keer. Wat is die eksperimentele P(kop) as 'n desimaal?", answer: "0.475", topic: "Relatiewe frekwensie" },
        { type: "mc", text: "Eksperimentele P(rooi) van 'n wentelskyf = 0.42 na 50 draaie. Teoretiese P(rooi) = 0.40. Die beste verduideliking is:", options: ["Die wentelskyf is bevooroordeeld", "Die teoretiese waarskynlikheid is verkeerd", "Die verskil is waarskynlik te wyte aan toeval met slegs 50 pogings", "Rooi is meer waarskynlik as wat die teorie voorspel"], answer: 2, topic: "Relatiewe frekwensie" },
        { type: "input", text: "'n Wentelskyf word 150 keer gedraai. Dit land 54 keer op blou. Bereken die eksperimentele waarskynlikheid van blou as 'n persentasie.", answer: "36", topic: "Relatiewe frekwensie" },
        { type: "input", text: "'n Gehalte-beheertoetser toets 400 gloeilampe en vind dat 12 defek is. Skat, gebaseer op hierdie tempo, hoeveel defekte gloeilampe verwag sou word in 'n lot van 5 000.", answer: "150", topic: "Relatiewe frekwensie" },
      ]
    },
    {
      id: 1704,
      chapter: 17,
      name: "Boomdiagramme",
      fullName: "Boomdiagramme vir saamgestelde gebeurtenisse",
      lesson: {
        heading: "Boomdiagramme vir saamgestelde gebeurtenisse",
        sub: "Hoofstuk 17 · Onderwerp 4",
        body: `
          <p>'n <strong>Boomdiagram</strong> is 'n visuele hulpmiddel om alle moontlike uitkomste van 'n <strong>saamgestelde gebeurtenis</strong> te lys — 'n eksperiment met twee of meer fases. Elke tak verteenwoordig een moontlike uitkoms by elke fase.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Hoe om 'n boomdiagram te teken</div>
            <p>
              1. Begin by 'n punt aan die linkerkant.<br>
              2. Trek 'n tak vir elke uitkoms van die <strong>eerste fase</strong>.<br>
              3. Trek vanaf elke tak takke vir elke uitkoms van die <strong>tweede fase</strong>.<br>
              4. Elke volledige pad van links na regs = een uitkoms in die uitkomsruimte.<br>
              5. Tel al die volledige paaie om die <strong>totale aantal uitkomste</strong> te vind.<br><br>
              <strong>Telreël:</strong> totale uitkomste = (uitkomste in fase 1) × (uitkomste in fase 2)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld 1 — Twee muntstukke gooi</div>
            <pre style="font-family:'JetBrains Mono',monospace;font-size:12px;line-height:2;color:rgba(221,225,240,0.70);margin:10px 0;background:transparent;border:none;padding:0;overflow-x:auto;"><span style="color:#a5b4fc;">Munt 1</span>         <span style="color:#6ee7b7;">Munt 2</span>      <span style="color:#fbbf24;">Uitkoms</span>
           ┌─── H ──────── <span style="color:#fbbf24;">HH</span>
H ─────────┤
           └─── T ──────── <span style="color:#fbbf24;">HT</span>

           ┌─── H ──────── <span style="color:#fbbf24;">TH</span>
T ─────────┤
           └─── T ──────── <span style="color:#fbbf24;">TT</span></pre>
            <div class="example-step"><span class="step-num">1</span><span>Uitkomsruimte: {HH, HT, TH, TT} → <strong>4 uitkomste</strong></span></div>
            <div class="example-step"><span class="step-num">2</span><span>P(albei koppe) = 1/4</span></div>
            <div class="example-step"><span class="step-num">3</span><span>P(ten minste een kop) = 3/4 (HH, HT, TH het almal ten minste een H)</span></div>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld 2 — Wentelskyf (R/B/G) dan muntstuk</div>
            <pre style="font-family:'JetBrains Mono',monospace;font-size:12px;line-height:2;color:rgba(221,225,240,0.70);margin:10px 0;background:transparent;border:none;padding:0;overflow-x:auto;"><span style="color:#a5b4fc;">Spinner</span>        <span style="color:#6ee7b7;">Munt</span>       <span style="color:#fbbf24;">Uitkoms</span>
           ┌─── H ──────── <span style="color:#fbbf24;">RH</span>
R ─────────┤
           └─── T ──────── <span style="color:#fbbf24;">RT</span>

           ┌─── H ──────── <span style="color:#fbbf24;">BH</span>
B ─────────┤
           └─── T ──────── <span style="color:#fbbf24;">BT</span>

           ┌─── H ──────── <span style="color:#fbbf24;">GH</span>
G ─────────┤
           └─── T ──────── <span style="color:#fbbf24;">GT</span></pre>
            <div class="example-step"><span class="step-num">1</span><span>Totale uitkomste: 3 × 2 = <strong>6 uitkomste</strong></span></div>
            <div class="example-step"><span class="step-num">2</span><span>P(rooi en kop) = 1/6</span></div>
            <div class="example-step"><span class="step-num">3</span><span>P(blou of groen) = 4/6 = 2/3</span></div>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Wanneer om 'n boomdiagram teenoor 'n twee-rigting-tabel te gebruik</div>
            <p>
              <strong>Boomdiagram:</strong> die beste wanneer gebeurtenisse verskillende aantalle uitkomste het, of wanneer jy uitkomste duidelik moet lys.<br><br>
              <strong>Twee-rigting-tabel:</strong> die beste wanneer albei gebeurtenisse dieselfde tipe uitkomste het (bv. die gooi van twee dobbelstene).<br><br>
              Albei metodes gee dieselfde uitkomsruimte — kies watter een ook al duideliker is vir die vraag.
            </p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Skryf altyd die uitkomsruimte uit jou boomdiagram <strong>neer</strong> — moenie net die takke tel nie. Om te lys laat jou toe om waarskynlikhede van spesifieke gebeurtenisse akkuraat te vind.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Muntstuk word gegooi en 'n wentelskyf met 4 gelyke afdelings (1, 2, 3, 4) word gedraai. Hoeveel uitkomste is in die uitkomsruimte?", answer: "8", topic: "Boomdiagramme" },
        { type: "mc", text: "Twee muntstukke word gegooi. Met behulp van 'n boomdiagram, P(presies een kop) =", options: ["1/4", "1/2", "3/4", "1/3"], answer: 1, topic: "Boomdiagramme" },
        { type: "mc", text: "'n Sak het 2 balle: rooi (R) en blou (B). 'n Bal word getrek, teruggesit, en weer getrek. Hoeveel uitkomste is in die uitkomsruimte?", options: ["2", "3", "4", "6"], answer: 2, topic: "Boomdiagramme" },
        { type: "input", text: "'n Wentelskyf het 3 afdelings: rooi, blou, groen. Dit word twee keer gedraai. Hoeveel uitkomste is in die uitkomsruimte?", answer: "9", topic: "Boomdiagramme" },
        { type: "mc", text: "Twee muntstukke word gegooi. Wat is P(ten minste een munt)?", options: ["1/4", "1/2", "3/4", "1"], answer: 2, topic: "Boomdiagramme" },
        { type: "mc", text: "'n Boomdiagram vir die gooi van 'n muntstuk en die gooi van 'n dobbelsteen het hoeveel eindtakke?", options: ["6", "8", "12", "2"], answer: 2, topic: "Boomdiagramme" },
        { type: "input", text: "'n Sak het 3 rooi en 2 blou balle. 'n Bal word getrek, aangeteken, teruggesit, en dan word 'n tweede bal getrek. Gebruik 'n boomdiagram-benadering om P(albei balle het dieselfde kleur) te bereken. (breuk)", answer: "13/25", topic: "Boomdiagramme" },
        { type: "input", text: "'n Gesin het 3 kinders. Neem aan elke kind is ewe waarskynlik 'n seun of dogter, gebruik 'n boomdiagram-benadering om P(ten minste 2 dogters) te bepaal. (breuk)", answer: "1/2", topic: "Boomdiagramme" },
      ]
    },
    {
      id: 1705,
      chapter: 17,
      name: "H17 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 17 — Eksamenfokus",
        sub: "Hoofstuk 17 · Hersiening",
        body: `
          <p>Waarskynlikheid-eksamenvrae toets jou vermoë om waarskynlikhede te bereken, uitkomsruimtes te lys, en eksperimentele resultate te interpreteer.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 17-opsomming</div>
            <p>
              ✅ Waarskynlikheid = n(E) ÷ n(S); altyd tussen 0 en 1<br>
              ✅ P(nie E) = 1 − P(E)<br>
              ✅ Uitkomsruimte: lys ALLE uitkomste — gebruik boomdiagramme of twee-rigting-tabelle<br>
              ✅ Telbeginsel: m × n uitkomste vir twee onafhanklike gebeurtenisse<br>
              ✅ Eksperimentele P = suksesse ÷ pogings ('n skatting)<br>
              ✅ Meer pogings → eksperimentele P kom nader aan teoretiese P<br>
              ✅ Druk waarskynlikheid uit as 'n breuk, desimaal, of persentasie
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">📝 Algemene eksamenfoute om te vermy</div>
            <div class="example-step"><span class="step-num">✗</span><span>Om P(E) > 1 te skryf — onmoontlik. Kontroleer altyd dat jou antwoord tussen 0 en 1 is.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Om te vergeet om alle uitkomste te lys — gebruik 'n sistematiese metode (boom/rooster).</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Om "ten minste een" met "presies een" te verwar.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Om te sê eksperimenteel = teoreties — sê altyd "ongeveer" of "kom nader aan".</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Kontroleer: P(E) + P(nie E) = 1. As jou twee waarskynlikhede nie tot 1 optel nie, het jy êrens 'n fout gemaak.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Sak het 4 rooi, 3 blou, 3 groen balle. Wat is P(blou)? (breuk)", answer: "3/10", topic: "Gemeng" },
        { type: "mc", text: "'n Regverdige dobbelsteen word gegooi. P(faktor van 6) = ? Faktore van 6: {1,2,3,6}", options: ["4/6", "2/6", "3/6", "1/6"], answer: 0, topic: "Gemeng" },
        { type: "input", text: "Twee muntstukke word gegooi. Wat is P(albei koppe)? (breuk)", answer: "1/4", topic: "Gemeng" },
        { type: "mc", text: "'n Wentelskyf word 80 keer gedraai. Rooi verskyn 28 keer. Eksperimentele P(rooi) is die naaste aan:", options: ["0.25", "0.30", "0.35", "0.40"], answer: 2, topic: "Gemeng" },
        { type: "input", text: "P(wen van 'n speletjie) = 0.35. Wat is P(nie wen nie)?", answer: "0.65", topic: "Gemeng" },
        { type: "input", text: "'n Sak het 4 rooi, 6 blou, en 5 groen balle. 'n Bal word lukraak getrek. Bereken P(rooi of groen) as 'n vereenvoudigde breuk.", answer: "3/5", topic: "Gemeng" },
        { type: "input", text: "Twee dobbelstene word saam gegooi. Gebruik die 36-uitkoms-uitkomsruimte om P(die som van die twee dobbelstene is 7) te bereken. (breuk)", answer: "1/6", topic: "Gemeng" },
      ]
    },
  ],
  workbook: {
    chapter: 17, chapterName: "Waarskynlikheid",
    topics: [
      {
        name: "Teoretiese waarskynlikheid en uitkomsruimtes",
        questions: [
          {
            num: "1",
            text: "'n Sak bevat 5 rooi, 3 blou, en 2 geel albasters.",
            parts: [
              { label: "a)", text: "Skryf die uitkomsruimte neer.", marks: 1 },
              { label: "b)", text: "Bepaal P(rooi).", marks: 2 },
              { label: "c)", text: "Bepaal P(nie blou).", marks: 2 },
              { label: "d)", text: "Bepaal P(rooi of geel).", marks: 2 },
              { label: "e)", text: "Is dit moontlik om 'n groen albaster te trek? Verduidelik.", marks: 1 },
            ]
          },
          {
            num: "2",
            text: "'n Regverdige dobbelsteen en 'n regverdige muntstuk word saam gebruik.",
            parts: [
              { label: "a)", text: "Teken 'n twee-rigting-tabel wat alle uitkomste toon.", marks: 3 },
              { label: "b)", text: "Hoeveel uitkomste is in die uitkomsruimte?", marks: 1 },
              { label: "c)", text: "Bepaal P(kop en 'n onewe getal).", marks: 2 },
              { label: "d)", text: "Bepaal P(munt en 'n getal groter as 4).", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Eksperimentele waarskynlikheid",
        questions: [
          {
            num: "3",
            text: "'n Duimspyker word 200 keer laat val. Dit land 74 keer punt-op en 126 keer punt-af.",
            parts: [
              { label: "a)", text: "Bereken die eksperimentele P(punt-op).", marks: 2 },
              { label: "b)", text: "Bereken die eksperimentele P(punt-af).", marks: 1 },
              { label: "c)", text: "Tel hierdie waarskynlikhede op tot 1? Wys dit.", marks: 1 },
              { label: "d)", text: "As die eksperiment 500 keer herhaal word, hoeveel keer sou jy verwag dat dit punt-op land?", marks: 2 },
            ]
          },
          {
            num: "4",
            text: "'n Leerder beweer 'n wentelskyf is regverdig (4 gelyke afdelings: rooi, blou, groen, geel). Na 60 draaie: rooi 20, blou 12, groen 16, geel 12.",
            parts: [
              { label: "a)", text: "Bereken die eksperimentele waarskynlikheid vir elke kleur.", marks: 4 },
              { label: "b)", text: "Wat is die teoretiese waarskynlikheid vir elke kleur?", marks: 1 },
              { label: "c)", text: "Is dit waarskynlik dat die wentelskyf regverdig is? Motiveer jou antwoord.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 17, chapterName: "Hoofstuk 17 — Waarskynlikheid",
    topics: [
      {
        name: "Teoretiese waarskynlikheid en uitkomsruimtes",
        answers: [
          { num: "Q1a", ans: "S = {rooi, rooi, rooi, rooi, rooi, blou, blou, blou, geel, geel} of beskryf: 10 albasters", note: "n(S) = 10" },
          { num: "Q1b", ans: "P(rooi) = 5/10 = 1/2", note: "5 rooi uit 10 in totaal" },
          { num: "Q1c", ans: "P(nie blou) = 7/10", note: "1 − 3/10 = 7/10; of (5+2)/10" },
          { num: "Q1d", ans: "P(rooi of geel) = 7/10", note: "(5+2)/10 = 7/10" },
          { num: "Q1e", ans: "Nee — daar is geen groen albasters in die sak nie; P(groen) = 0", note: "Onmoontlike gebeurtenis" },
          { num: "Q2a", ans: "Twee-rigting-tabel: rye K/M, kolomme 1–6; 12 selle gevul met bv. K1, K2, … M6", note: "Al 12 uitkomste gelys" },
          { num: "Q2b", ans: "n(S) = 12", note: "2 × 6 = 12" },
          { num: "Q2c", ans: "P(K en onewe) = 3/12 = 1/4", note: "Onewe getalle: 1,3,5; met K: K1, K3, K5 → 3 uitkomste" },
          { num: "Q2d", ans: "P(M en >4) = 2/12 = 1/6", note: ">4: 5, 6; met M: M5, M6 → 2 uitkomste" },
        ]
      },
      {
        name: "Eksperimentele waarskynlikheid",
        answers: [
          { num: "Q3a", ans: "P(punt-op) = 74/200 = 0.37", note: "74÷200" },
          { num: "Q3b", ans: "P(punt-af) = 126/200 = 0.63", note: "126÷200" },
          { num: "Q3c", ans: "0.37 + 0.63 = 1.00 ✓", note: "Som = 1 bevestig geen foute nie" },
          { num: "Q3d", ans: "Verwag: 500 × 0.37 = 185 keer", note: "Gebruik eksperimentele waarskynlikheid as skatting" },
          { num: "Q4a", ans: "Rooi 20/60=0.33; Blou 12/60=0.20; Groen 16/60=0.27; Geel 12/60=0.20", note: "Almal tel op tot 1.00" },
          { num: "Q4b", ans: "Elk = 1/4 = 0.25", note: "Gelyke afdelings → gelyke waarskynlikheid" },
          { num: "Q4c", ans: "Moontlik nie regverdig nie — rooi verskyn meer gereeld (0.33 teenoor 0.25); maar met slegs 60 draaie kan dit toeval wees. Meer pogings word benodig om seker te wees.", note: "Aanvaar geregverdigde antwoord in enige rigting" },
        ]
      },
    ]
  }
});
