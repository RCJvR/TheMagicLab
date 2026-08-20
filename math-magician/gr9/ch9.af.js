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
    ]
  }
});
