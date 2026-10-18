// Math Magician — Graad 9, Hoofstuk 9 data (Afrikaans)
// Algebraïese Vergelykings

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 17,
      chapter: 9,
      name: "Liniêre vergelykings",
      fullName: "Liniêre vergelykings oplos",
      lesson: {
        heading: "Liniêre vergelykings oplos",
        sub: "Hoofstuk 9 · Onderwerp 1",
        body: `
          <p>'n <strong>Liniêre vergelyking</strong> het die veranderlike tot die mag 1. Ons los dit op deur dieselfde bewerkings op albei kante toe te pas om die veranderlike te isoleer.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Stappe om liniêre vergelykings op te los</div>
            <p>
              <strong>Stap 1:</strong> Vermenigvuldig alle hakies uit.<br>
              <strong>Stap 2:</strong> Vermenigvuldig met die KGV om breuke te verwyder (indien enige).<br>
              <strong>Stap 3:</strong> Skuif alle veranderlike terme na een kant.<br>
              <strong>Stap 4:</strong> Kombineer gelyksoortige terme.<br>
              <strong>Stap 5:</strong> Deel albei kante deur die koëffisiënt.<br>
              <strong>Stap 6:</strong> Verifieer deur terug te vervang.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>3(x - 2) + 5 = 2x + 7 → 3x - 6 + 5 = 2x + 7 → x = 8</span></div>
            <div class="example-step"><span class="step-num">2</span><span>x/3 - 2/5 = 1 → vermenigvuldig met 15 → 5x - 6 = 15 → x = 21/5</span></div>
            <div class="example-step"><span class="step-num">3</span><span>4(x + 1) = 2(2x - 3): 4x + 4 = 4x - 6 → 4 = -6 (geen oplossing — teenstrydigheid)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Toets jou antwoord altyd deur dit terug te vervang in die OORSPRONKLIKE vergelyking. Een getal-toets kan jou punt red.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Liniêre Vergelyking-oplosser</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Los vergelykings van die vorm ax + b = cx + d stap vir stap op. Voer die vier koëffisiënte in.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a (LK x-koëf)</label><input id="leA" type="number" value="5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">b (LK konst)</label><input id="leB" type="number" value="-3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;padding-bottom:8px;">=</span>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">c (RK x-koëf)</label><input id="leC" type="number" value="2" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">d (RK konst)</label><input id="leD" type="number" value="9" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="leBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Los op</button>
            </div>
            <div id="leOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function fmt(n){return n<0?'('+n+')':String(n);}
            function solve(){
              var a=parseFloat(document.getElementById('leA').value)||0;
              var b=parseFloat(document.getElementById('leB').value)||0;
              var c=parseFloat(document.getElementById('leC').value)||0;
              var d=parseFloat(document.getElementById('leD').value)||0;
              var bStr=b>=0?' + '+b:' - '+Math.abs(b);
              var dStr=d>=0?' + '+d:' - '+Math.abs(d);
              var lhs=a+'x'+bStr,rhs=c+'x'+dStr;
              var xCoef=a-c,constVal=d-b;
              var steps=[
                'Vergelyking: <span style="color:#fbbf24;">'+lhs+' = '+rhs+'</span>',
                'Skuif x-terme links: <span style="color:#a5b4fc;">'+(a-c)+'x = '+d+' - ('+b+') = '+constVal+'</span>',
              ];
              var out=document.getElementById('leOut');
              if(xCoef===0){
                if(constVal===0){steps.push('<span style="color:#6ee7b7;">∞ oplossings — identiteit (waar vir alle x)</span>');}
                else{steps.push('<span style="color:#fca5a5;">Geen oplossing — teenstrydigheid</span>');}
              } else {
                var x=constVal/xCoef;
                steps.push('Deel albei kante deur '+(a-c)+': x = '+constVal+' ÷ '+(a-c)+' = <span style="color:#6ee7b7;font-size:16px;font-weight:700;">'+x+'</span>');
                var check=a*x+b,check2=c*x+d;
                steps.push('Toets: '+a+'('+x+')+'+b+' = '+check+' en '+c+'('+x+')+'+d+' = '+check2+(Math.abs(check-check2)<1e-9?' ✓':'<span style="color:#fca5a5;"> ✗</span>'));
              }
              out.innerHTML=steps.map(function(s){return '<div>'+s+'</div>';}).join('');
            }
            document.getElementById('leBtn').addEventListener('click',solve);
            ['leA','leB','leC','leD'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')solve();});});
            solve();
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Los op: 5x - 3 = 2x + 9", answer: "4", topic: "Vergelykings" },
        { type: "mc", text: "Los op: 3(x + 2) = 2(x - 1)", options: ["x = -8", "x = 8", "x = -4", "x = 4"], answer: 0, topic: "Vergelykings" },
        { type: "input", text: "Los op: x/4 + 1 = 3. Wat is x?", answer: "8", topic: "Vergelykings" },
        { type: "mc", text: "Watter vergelyking het geen oplossing nie?", options: ["2x + 3 = 9", "4x + 5 = 5", "3(x+1) = 3x + 1", "2x = 6"], answer: 2, topic: "Vergelykings" },
        { type: "input", text: "Los op: 2(3x - 1) - 4 = 5x + 1", answer: "7", topic: "Vergelykings" },
        { type: "input", text: "Los op: (x + 1)/2 - (x - 2)/3 = 2", answer: "5", topic: "Vergelykings" },
      ]
    },
    {
      id: 18,
      chapter: 9,
      name: "Kwadratiese vergelykings",
      fullName: "Kwadratiese vergelykings deur faktorisering oplos",
      lesson: {
        heading: "Kwadratiese vergelykings oplos",
        sub: "Hoofstuk 9 · Onderwerp 2",
        body: `
          <p>'n <strong>Kwadratiese vergelyking</strong> het graad 2: <span class="math">ax² + bx + c = 0</span>. Ons los dit op deur te faktoriseer en die Nulproduk-eienskap toe te pas.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Nulproduk-eienskap</div>
            <p>
              As <span class="math">A × B = 0</span>, dan <span class="math">A = 0</span> OF <span class="math">B = 0</span>.<br><br>
              <strong>Metode:</strong><br>
              1. Herrangskik sodat die vergelyking = 0.<br>
              2. Faktoriseer die linkerkant.<br>
              3. Stel elke faktor = 0 en los op.<br>
              4. Kwadratiese vergelykings het TWEE oplossings (kan gelyk of nie-reëel wees).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>x² - 7x + 12 = 0 → (x - 3)(x - 4) = 0 → x = 3 of x = 4</span></div>
            <div class="example-step"><span class="step-num">2</span><span>x² = 25 → x² - 25 = 0 → (x + 5)(x - 5) = 0 → x = ±5</span></div>
            <div class="example-step"><span class="step-num">3</span><span>2x² + 5x = 3 → 2x² + 5x - 3 = 0 → (2x - 1)(x + 3) = 0 → x = 1/2 of x = -3</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Moet NOOIT albei kante deur x deel om x² = 3x op te los nie. Jy verloor die oplossing x = 0. Stel altyd gelyk aan 0 en faktoriseer.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Kwadratiese Vergelyking-oplosser</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Los ax&#178; + bx + c = 0 op. Sien die diskriminant, aard van die wortels, en oplossings.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a</label><input id="qsa5" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">b</label><input id="qsb5" type="number" value="-5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">c</label><input id="qsc5" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="qsBtn5" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Los op</button>
            </div>
            <div id="qsOut5" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function solve(){
              const a=parseFloat(document.getElementById('qsa5').value)||1;
              const b=parseFloat(document.getElementById('qsb5').value)||0;
              const c=parseFloat(document.getElementById('qsc5').value)||0;
              const d=b*b-4*a*c;const f=function(v){return Math.round(v*10000)/10000;};
              let nature,roots;
              if(d>0){nature='Twee reële, ongelyke wortels';const sq=Math.sqrt(d);roots='x = '+f((-b+sq)/(2*a))+' of x = '+f((-b-sq)/(2*a));}
              else if(d===0){nature='Gelyke reële wortels';roots='x = '+f(-b/(2*a));}
              else{nature='Geen reële wortels nie';roots='Δ < 0';}
              document.getElementById('qsOut5').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:150px;display:inline-block;">Δ = '+b+'\xb2−4('+a+')('+c+'):</span><span style="color:#a5b4fc;">'+d+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:150px;display:inline-block;">Aard:</span><span style="color:#fbbf24;">'+nature+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:150px;display:inline-block;">Oplossing:</span><span style="color:#6ee7b7;font-weight:700;">'+roots+'</span></div>',
              ].join('');
            }
            document.getElementById('qsBtn5').addEventListener('click',solve);
            ['qsa5','qsb5','qsc5'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')solve();});});
            solve();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Los op: x² - 9 = 0", options: ["x = 3", "x = 9", "x = ±3", "x = ±9"], answer: 2, topic: "Vergelykings" },
        { type: "mc", text: "Los op: x² + 5x + 6 = 0", options: ["x = 2 of x = 3", "x = -2 of x = -3", "x = 1 of x = 6", "x = -1 of x = -6"], answer: 1, topic: "Vergelykings" },
        { type: "input", text: "Los x² - 4x = 0 op. Wat is die twee oplossings? (Gee die nie-nul oplossing)", answer: "4", topic: "Vergelykings" },
        { type: "mc", text: "Los op: 2x² - 8 = 0", options: ["x = 4", "x = ±2", "x = 2", "x = ±4"], answer: 1, topic: "Vergelykings" },
        { type: "input", text: "Los x² - 2x - 15 = 0 op. Wat is die positiewe oplossing?", answer: "5", topic: "Vergelykings" },
        { type: "input", text: "'n Reghoek het oppervlakte 40 cm² en sy lengte is 3 cm meer as sy breedte. Bepaal die breedte (in cm).", answer: "5", topic: "Vergelykings" },
      ]
    },
    {
      id: 901,
      chapter: 9,
      name: "Vergelykings met hakies en breuke",
      fullName: "Lineêre vergelykings met hakies en breuke oplos",
      lesson: {
        heading: "Vergelykings met hakies en breuke",
        sub: "Hoofstuk 9 · Onderwerp 3",
        body: `
<p>Maak die vergelyking eenvoudiger voordat jy oplos: verwyder hakies, en vermenigvuldig elke term met die KGN om van breuke ontslae te raak.</p>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: hakies</div>
  <div class="example-step"><span class="step-num">1</span><span>3(x − 4) − 2(x + 1) = 5</span></div>
  <div class="example-step"><span class="step-num">2</span><span>3x − 12 − 2x − 2 = 5</span></div>
  <div class="example-step"><span class="step-num">3</span><span>x − 14 = 5, so <strong>x = 19</strong></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: breuke</div>
  <div class="example-step"><span class="step-num">1</span><span>x/3 + (x − 1)/4 = 5. Die KGN van 3 en 4 is 12.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Vermenigvuldig elke term met 12: 4x + 3(x − 1) = 60</span></div>
  <div class="example-step"><span class="step-num">3</span><span>4x + 3x − 3 = 60, 7x = 63, <strong>x = 9</strong></span></div>
  <div class="example-step"><span class="step-num">4</span><span>Toets: 9/3 + 8/4 = 3 + 2 = 5 ✓</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Vermenigvuldig ELKE term met die KGN, ook die terme sonder 'n breuk. Sit 'n hakie om 'n teller met twee terme.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Los op vir x: 2(x + 3) = 5x − 9", "answer": "5", "topic": "Vergelykings met hakies en breuke"},
        {"type": "input", "text": "Los op vir x: x/4 = 7", "answer": "28", "topic": "Vergelykings met hakies en breuke"},
        {"type": "input", "text": "Los op vir x: x/2 + x/3 = 10", "answer": "12", "topic": "Vergelykings met hakies en breuke"},
        {"type": "input", "text": "Los op vir x: (x − 2)/5 = (x + 1)/8", "answer": "7", "topic": "Vergelykings met hakies en breuke"},
        {"type": "input", "text": "Los op vir x: 4 − 3(2x − 1) = −5", "answer": "2", "topic": "Vergelykings met hakies en breuke"},
        {"type": "input", "text": "Los op vir x: (2x + 1)/3 − 1 = x/2", "answer": "4", "topic": "Vergelykings met hakies en breuke"},
      ]
    },
    {
      id: 902,
      chapter: 9,
      name: "Woordprobleme",
      fullName: "Vergelykings uit woordprobleme opstel en oplos",
      lesson: {
        heading: "Woordprobleme",
        sub: "Hoofstuk 9 · Onderwerp 4",
        body: `
<p>Om 'n woordprobleem op te los: kies 'n letter vir die onbekende, skryf alles anders in terme daarvan, vorm 'n vergelyking, los dit op, en beantwoord die vraag in woorde.</p>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: opeenvolgende getalle</div>
  <div class="example-step"><span class="step-num">1</span><span>Die som van drie opeenvolgende getalle is 87. Bepaal hulle.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Laat die getalle x, x + 1 en x + 2 wees: x + x + 1 + x + 2 = 87</span></div>
  <div class="example-step"><span class="step-num">3</span><span>3x + 3 = 87, 3x = 84, x = 28. Die getalle is <strong>28, 29 en 30</strong>.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: ouderdomme</div>
  <div class="example-step"><span class="step-num">1</span><span>'n Ma is drie keer so oud as haar seun. Oor 12 jaar sal sy twee keer so oud wees. Hoe oud is hulle nou?</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Seun: x, ma: 3x. Oor 12 jaar: 3x + 12 = 2(x + 12)</span></div>
  <div class="example-step"><span class="step-num">3</span><span>3x + 12 = 2x + 24, x = 12. Die seun is <strong>12</strong> en die ma <strong>36</strong>.</span></div>
</div>
<div class="mf-fig" data-fig='{"t":"geo","w":260,"h":150,"view":[0,0,12,6],"pts":{"A":[0,0],"B":[12,0],"C":[12,6],"D":[0,6]},"nolab":["A","B","C","D"],"poly":[["A","B","C","D","fl"]],"seg":[["A","B","ln",null,"2x"],["B","C","ln",null,"x"],["C","D"],["D","A"]],"cap":"Omtrek 2x + x + 2x + x = 6x"}'></div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: 'n reghoek</div>
  <div class="example-step"><span class="step-num">1</span><span>'n Reghoek is twee keer so lank as wat dit breed is. Sy omtrek is 54 cm. Bepaal sy lengte.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>6x = 54, x = 9. Die lengte is 2x = <strong>18 cm</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Sluit af met 'n sin wat die vraag beantwoord, en toets die antwoord in die oorspronklike storie, nie net in jou vergelyking nie.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Die som van twee opeenvolgende ewe getalle is 70. Wat is die kleiner getal?", "answer": "34", "topic": "Woordprobleme"},
        {"type": "input", "text": "'n Getal word met 4 vermenigvuldig en dan word 7 afgetrek. Die antwoord is 45. Wat is die getal?", "answer": "13", "topic": "Woordprobleme"},
        {"type": "input", "text": "'n Pa is 4 keer so oud as sy dogter. Oor 6 jaar sal hy 3 keer so oud wees. Hoe oud is die dogter nou?", "answer": "12", "topic": "Woordprobleme"},
        {"type": "input", "text": "'n Reghoek se lengte is 5 cm meer as sy breedte. Sy omtrek is 50 cm. Wat is sy breedte? (cm)", "answer": "10", "topic": "Woordprobleme"},
        {"type": "input", "text": "Thandi het R5- en R2-munte, altesaam 20 munte, wat R67 werd is. Hoeveel R5-munte het sy?", "answer": "9", "topic": "Woordprobleme"},
        {"type": "input", "text": "Kaartjies kos R45 vir volwassenes en R25 vir kinders. 'n Groep van 12 het R420 betaal. Hoeveel volwassenes was daar?", "answer": "6", "topic": "Woordprobleme"},
      ]
    },
    {
      id: 903,
      chapter: 9,
      name: "Hfst 9 Eksamenfokus",
      fullName: "Eksamenoefening: algebraïese vergelykings",
      lesson: {
        heading: "Hfst 9 Eksamenfokus",
        sub: "Hoofstuk 9 · Onderwerp 5",
        body: `
<p>Hierdie vrae meng die hele hoofstuk, soos 'n toets doen. Toets elke oplossing deur dit terug te vervang in die oorspronklike vergelyking.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Skryf die reël of formule neer wat jy gebruik, vervang dan, en gee die antwoord met eenhede. Punte word vir elke stap gegee.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Los op vir x: 7x − 4 = 3x + 20", "answer": "6", "topic": "Hfst 9 Eksamenfokus"},
        {"type": "input", "text": "Los op vir x: x² − 5x = 0. Gee albei oplossings geskei deur \"of\".", "answer": "0 or 5", "altAnswers": ["0 of 5", "5 or 0", "5 of 0"], "topic": "Hfst 9 Eksamenfokus"},
        {"type": "input", "text": "Los op vir x: (x − 3)(x + 7) = 0. Gee albei oplossings geskei deur \"of\".", "answer": "3 or -7", "altAnswers": ["3 of -7", "-7 or 3", "-7 of 3"], "topic": "Hfst 9 Eksamenfokus"},
        {"type": "input", "text": "Los op vir x: 2ˣ = 32", "answer": "5", "topic": "Hfst 9 Eksamenfokus"},
        {"type": "input", "text": "Los op vir x: x² = 49, x > 0", "answer": "7", "topic": "Hfst 9 Eksamenfokus"},
        {"type": "input", "text": "Los op vir x: 3(x − 2) = 2(x + 4)", "answer": "14", "topic": "Hfst 9 Eksamenfokus"},
        { type: "input", text: "Penne kos R7 en potlode kos R4. Nomsa spandeer presies R59 en koop ten minste 2 penne en ten minste 6 potlode. Hoeveel penne koop sy?", answer: "5", topic: "Hfst 9 Eksamenfokus" }
      ]
    },
  ],
  workbook: {
    chapter: 9, chapterName: "Algebraïese Vergelykings",
    topics: [
      {
        name: "Liniêre Vergelykings",
        questions: [
          {
            num: "1",
            text: "Los op vir x:",
            parts: [
              { label: "a)", text: "4(x - 3) = 2(x + 5)", marks: 3 },
              { label: "b)", text: "x/3 + x/4 = 7", marks: 4 },
              { label: "c)", text: "5(2x - 1) - 3(x + 2) = 11", marks: 4 },
              { label: "d)", text: "(2x - 1)/3 - (x + 2)/5 = 2", marks: 5 },
            ]
          },
        ]
      },
      {
        name: "Kwadratiese Vergelykings",
        questions: [
          {
            num: "2",
            text: "Los op vir x deur faktorisering:",
            parts: [
              { label: "a)", text: "x² - 11x + 28 = 0", marks: 4 },
              { label: "b)", text: "x² - 16 = 0", marks: 3 },
              { label: "c)", text: "2x² + 7x - 15 = 0", marks: 5 },
              { label: "d)", text: "x(x - 5) = 14", marks: 5 },
            ]
          },
        ]
      },
      {
        "name": "Woordprobleme",
        "questions": [
          {
            "num": "3",
            "text": "Vorm 'n vergelyking en los dit op.",
            "parts": [
              {
                "label": "a)",
                "text": "Die omtrek van 'n driehoek is 48 cm. Die sye is x, x + 4 en 2x. Bepaal die sye.",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "Sipho is 5 jaar ouer as Lindiwe. Die som van hul ouderdomme is 37. Hoe oud is elkeen?",
                "marks": 3
              },
              {
                "label": "c)",
                "text": "Los op: (x + 2)/3 − (x − 1)/4 = 2",
                "marks": 3
              }
            ]
          }
        ]
      },
    ]
  },
  answerKey: {
    chapter: 9, chapterName: "Hoofstuk 9 — Algebraïese Vergelykings",
    topics: [
      {
        name: "Liniêre Vergelykings",
        answers: [
          { num: "Q1a", ans: "x = 11", note: "4x-12=2x+10 → 2x=22 → x=11" },
          { num: "Q1b", ans: "x = 12", note: "KGV 12: 4x+3x=84 → 7x=84 → x=12" },
          { num: "Q1c", ans: "x = 22/7 ≈ 3,14", note: "10x-5-3x-6=11 → 7x-11=11 → 7x=22 → x=22/7" },
          { num: "Q1d", ans: "x = 41/7 ≈ 5,86", note: "KGV 15: 5(2x-1)-3(x+2)=30 → 10x-5-3x-6=30 → 7x-11=30 → 7x=41 → x=41/7" },
        ]
      },
      {
        name: "Kwadratiese Vergelykings",
        answers: [
          { num: "Q2a", ans: "x = 4 of x = 7", note: "(x-4)(x-7)=0" },
          { num: "Q2b", ans: "x = ±4", note: "(x+4)(x-4)=0" },
          { num: "Q2c", ans: "x = 3/2 of x = -5", note: "(2x-3)(x+5)=0" },
          { num: "Q2d", ans: "x = 7 of x = -2", note: "x²-5x-14=0 → (x-7)(x+2)=0" },
        ]
      },
      {
        "name": "Woordprobleme",
        "answers": [
          {
            "num": "Q3a",
            "ans": "11 cm, 15 cm en 22 cm",
            "note": "4x + 4 = 48, x = 11"
          },
          {
            "num": "Q3b",
            "ans": "Lindiwe 16, Sipho 21",
            "note": "x + x + 5 = 37, x = 16"
          },
          {
            "num": "Q3c",
            "ans": "x = 13",
            "note": "4(x + 2) − 3(x − 1) = 24; x + 11 = 24"
          }
        ]
      },
    ]
  }
});
