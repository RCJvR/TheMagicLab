// Math Magician — Grade 9, Chapter 2 data (Afrikaans)
// Heelgetalle

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 3,
      chapter: 2,
      name: "Bewerkings met heelgetalle",
      fullName: "Bewerkings met heelgetalle",
      lesson: {
        heading: "Bewerkings met heelgetalle",
        sub: "Hoofstuk 2 · Onderwerp 1",
        body: `
          <p><strong>Heelgetalle</strong> sluit alle natuurlike getalle, nul, en hul negatiewe in. Al vier die bewerkings geld, met tekenreëls wat die uitkomste bepaal.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Tekenreëls vir vermenigvuldiging en deling</div>
            <p>
              <strong>+ × + = +</strong> &nbsp;&nbsp; bv. 3 × 4 = 12<br>
              <strong>- × - = +</strong> &nbsp;&nbsp; bv. (-3)(-4) = 12<br>
              <strong>+ × - = -</strong> &nbsp;&nbsp; bv. 3 × (-4) = -12<br>
              <strong>- × + = -</strong> &nbsp;&nbsp; bv. (-3) × 4 = -12<br><br>
              Dieselfde reëls geld vir deling.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>(-8) + 3 = -5 (skuif 3 regs op die getallelyn vanaf -8)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(-4) - (-7) = -4 + 7 = 3 (aftrekking van 'n negatiewe getal = optelling)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>(-6) × (-5) = 30</span></div>
            <div class="example-step"><span class="step-num">4</span><span>(-36) ÷ 4 = -9</span></div>
            <div class="example-step"><span class="step-num">5</span><span>-3² = -9 (kwadreer eers, negeer dan) teenoor (-3)² = 9</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Let wel: -3² ≠ (-3)². Die eksponent geld in die eerste geval slegs vir die 3. Dit is 'n baie algemene eksamenstrik!</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Heelgetallelyn en Bewerkingsoefening</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer twee heelgetalle en 'n bewerking in. Sien die resultaat op die getallelyn en kontroleer die tekenreël.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Eerste heelgetal</label>
                <input id="intA" type="number" value="-6" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Bewerking</label>
                <select id="intOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="*">×</option>
                  <option value="/">÷</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Tweede heelgetal</label>
                <input id="intB" type="number" value="-4" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <button id="intCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <svg id="intNL" viewBox="0 0 320 54" style="width:100%;max-width:320px;border-radius:8px;background:rgba(10,15,30,0.50);margin-bottom:10px;"></svg>
            <div id="intOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function draw(a,result){
              var svg=document.getElementById('intNL');
              var lo=Math.min(a,result,-1)-2,hi=Math.max(a,result,1)+2;
              var range=hi-lo||1;
              var W=320,H=54,pad=20;
              var sx=function(v){return pad+(v-lo)/(range)*(W-2*pad);};
              var ticks='';
              for(var v=Math.ceil(lo);v<=Math.floor(hi);v++){
                var x=sx(v);
                ticks+='<line x1="'+x+'" y1="27" x2="'+x+'" y2="34" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>';
                if(v%2===0||range<=8) ticks+='<text x="'+x+'" y="47" text-anchor="middle" font-size="7" fill="rgba(255,255,255,0.35)" font-family="JetBrains Mono,monospace">'+v+'</text>';
              }
              var ax=sx(a),rx=sx(result);
              var arr='<line x1="'+pad+'" y1="30" x2="'+(W-pad)+'" y2="30" stroke="rgba(255,255,255,0.20)" stroke-width="1.5"/>';
              arr+='<circle cx="'+ax+'" cy="30" r="5" fill="#fbbf24"/>';
              arr+='<text x="'+ax+'" y="19" text-anchor="middle" font-size="8" fill="#fbbf24" font-family="JetBrains Mono,monospace">a='+a+'</text>';
              arr+='<circle cx="'+rx+'" cy="30" r="5" fill="#6ee7b7"/>';
              arr+='<text x="'+rx+'" y="11" text-anchor="middle" font-size="8" fill="#6ee7b7" font-family="JetBrains Mono,monospace">= '+result+'</text>';
              svg.innerHTML=ticks+arr;
            }
            function calc(){
              var a=parseFloat(document.getElementById('intA').value)||0;
              var b=parseFloat(document.getElementById('intB').value)||0;
              var op=document.getElementById('intOp').value;
              var result,expr,rule='';
              if(op==='+'){result=a+b;expr=a+' + ('+b+') = '+result;}
              else if(op==='-'){result=a-b;expr=a+' - ('+b+') = '+a+' + ('+(- b)+') = '+result;rule="Aftrekking van 'n negatiewe getal = optelling van sy positiewe";}
              else if(op==='*'){result=a*b;expr='('+a+') × ('+b+') = '+result;
                var sa=a>=0?'+':'-',sb=b>=0?'+':'-',sr=result>=0?'+':'-';
                rule=sa+' × '+sb+' = '+sr+(result>=0?' (dieselfde tekens → positief)':' (verskillende tekens → negatief)');}
              else{if(b===0){document.getElementById('intOut').innerHTML='<span style="color:#fca5a5;">Deling deur nul is ongedefinieerd.</span>';return;}
                result=a/b;expr='('+a+') ÷ ('+b+') = '+result;
                var sa=a>=0?'+':'-',sb=b>=0?'+':'-',sr=result>=0?'+':'-';
                rule=sa+' ÷ '+sb+' = '+sr+(result>=0?' (dieselfde tekens → positief)':' (verskillende tekens → negatief)');}
              draw(a,result);
              document.getElementById('intOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Uitdrukking: </span><span style="color:#fbbf24;">'+expr+'</span></div>',
                rule?'<div style="font-size:10px;color:rgba(221,225,240,0.40);margin-top:2px;">'+rule+'</div>':'',
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Resultaat: </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+result+'</span></div>',
              ].filter(Boolean).join('');
            }
            document.getElementById('intCalc').addEventListener('click',calc);
            ['intA','intB'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});
            document.getElementById('intOp').addEventListener('change',calc);

          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Bereken: (-7) - (-12)", answer: "5", topic: "Heelgetalle" },
        { type: "mc", text: "Wat is (-5) × (-4) × (-2)?", options: ["-40", "40", "-20", "20"], answer: 0, topic: "Heelgetalle" },
        { type: "input", text: "Bereken: (-48) ÷ (-6)", answer: "8", topic: "Heelgetalle" },
        { type: "mc", text: "Watter een is groter: -3² of (-3)²?", options: ["-3²", "(-3)²", "Hulle is gelyk", "Kan nie vergelyk word nie"], answer: 1, topic: "Heelgetalle" },
        { type: "input", text: "Bereken: -2 + (-5) × 3 - (-4)", answer: "-13", topic: "Heelgetalle" },
        { type: "input", text: "Bereken: [(-3)² - (-2)³] × [(-5) + 6]", answer: "17", topic: "Heelgetalle" },
        { type: "input", text: "Die temperatuur was middernag -4°C. Dit het elke uur vir die volgende 5 ure met 3°C geval, en toe elke uur vir die volgende 3 ure met 2°C gestyg. Wat was die temperatuur (in °C) aan die einde van hierdie tydperk?", answer: "-13", topic: "Heelgetalle" },
      ]
    },
    {
      id: 4,
      chapter: 2,
      name: "Eienskappe van heelgetalle",
      fullName: "Eienskappe van heelgetalle en vierkants-/kubuswortels",
      lesson: {
        heading: "Eienskappe en wortels van heelgetalle",
        sub: "Hoofstuk 2 · Onderwerp 2",
        body: `
          <p>Heelgetalle gehoorsaam dieselfde eienskappe as natuurlike getalle. Ons brei ook vierkants- en derdemagswortels uit na volkome vierkante en volkome kubusse.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Wortels en kwadrate</div>
            <p>
              <strong>Volkome vierkant:</strong> 'n heelgetal wat die kwadraat van 'n ander heelgetal is. bv. 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.<br>
              <strong>Volkome kubus:</strong> 'n heelgetal wat die kubus van 'n ander heelgetal is. bv. 1, 8, 27, 64, 125, 216.<br>
              <span class="math">√(-n)</span> is nie reëel nie vir enige positiewe n.<br>
              <span class="math">∛(-8) = -2</span> (derdemagswortels van negatiewe getalle is reëel en negatief).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>√144 = 12 (aangesien 12² = 144)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>∛(-27) = -3 (aangesien (-3)³ = -27)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>√(-16) = ongedefinieerd (nie reëel nie)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>-√25 = -5 (trek eers die wortel, negeer dan)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>√ gee altyd 'n nie-negatiewe antwoord (die hoofwortel). Dus is √25 = 5, nie ±5 nie.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Verkenner van Kwadrate, Kubusse en Wortels</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer enige heelgetal in (positief of negatief). Verken die kwadraat, kubus, vierkantswortel en derdemagswortel daarvan — met werklik/nie-werklik-klassifikasie.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Heelgetal n</label>
                <input id="rootN" type="number" value="-8" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:20px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <button id="rootBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;margin-top:18px;">Verken</button>
            </div>
            <div id="rootOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function f(v){return Number.isInteger(v)?String(v):v.toFixed(4);}
            function explore(){
              var n=parseFloat(document.getElementById('rootN').value);
              if(isNaN(n)){document.getElementById('rootOut').innerHTML='<span style="color:#fca5a5;">Voer \'n geldige heelgetal in.</span>';return;}
              var sq=n*n, cu=n*n*n;
              var sqrtReal=n>=0, sqrtVal=sqrtReal?Math.sqrt(n):NaN;
              var cbrtVal=n>=0?Math.cbrt(n):-Math.cbrt(-n);
              var sqrtPerfect=sqrtReal&&Number.isInteger(Math.round(sqrtVal*1e6)/1e6)&&Math.abs(sqrtVal-Math.round(sqrtVal))<1e-9;
              var cbrtPerfect=Number.isInteger(Math.round(cbrtVal*1e6)/1e6)&&Math.abs(cbrtVal-Math.round(cbrtVal))<1e-9;
              var rows=[
                {label:'n\xb2 (kwadraat)',val:'<span style="color:#6ee7b7;font-weight:700;">'+sq+'</span>',note:'= ('+n+') \xd7 ('+n+')'},
                {label:'n\xb3 (kubus)',val:'<span style="color:#6ee7b7;font-weight:700;">'+cu+'</span>',note:'= ('+n+') \xd7 ('+n+') \xd7 ('+n+')'},
                {label:'√n (vierkantswortel)',val:sqrtReal?'<span style="color:#'+(sqrtPerfect?'6ee7b7':'fbbf24')+';font-weight:700;">'+(sqrtPerfect?Math.round(sqrtVal):'≈ '+f(sqrtVal))+'</span>'+'<span style="font-size:10px;color:rgba(221,225,240,0.40);margin-left:6px;">'+(sqrtPerfect?'(volkome vierkant)':'(irrasionaal)')+'</span>':'<span style="color:#fca5a5;">Nie reëel nie</span><span style="font-size:10px;color:rgba(221,225,240,0.40);margin-left:6px;">(n &lt; 0)</span>',note:''},
                {label:'∛n (derdemagswortel)',val:'<span style="color:#'+(cbrtPerfect?'6ee7b7':'fbbf24')+';font-weight:700;">'+(cbrtPerfect?Math.round(cbrtVal):'≈ '+f(cbrtVal))+'</span>'+'<span style="font-size:10px;color:rgba(221,225,240,0.40);margin-left:6px;">'+(cbrtPerfect?'(volkome kubus)':'(irrasionaal)')+'</span>',note:''},
              ];
              document.getElementById('rootOut').innerHTML=rows.map(function(r){
                return '<div style="display:flex;gap:10px;align-items:baseline;"><span style="color:rgba(221,225,240,0.45);min-width:160px;display:inline-block;">'+r.label+':</span>'+r.val+(r.note?'<span style="font-size:10px;color:rgba(221,225,240,0.30);margin-left:6px;">'+r.note+'</span>':'')+'</div>';
              }).join('');
            }
            document.getElementById('rootBtn').addEventListener('click',explore);
            document.getElementById('rootN').addEventListener('keydown',function(e){if(e.key==='Enter')explore();});
            explore();
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Bereken: √196", answer: "14", topic: "Heelgetalle" },
        { type: "mc", text: "Bereken ∛(-125):", options: ["-5", "5", "-25", "ongedefinieerd"], answer: 0, topic: "Heelgetalle" },
        { type: "mc", text: "Watter een van hierdie is NIE 'n volkome vierkant nie?", options: ["81", "100", "150", "144"], answer: 2, topic: "Heelgetalle" },
        { type: "input", text: "Bereken: -√169", answer: "-13", topic: "Heelgetalle" },
        { type: "mc", text: "√(-9) is:", options: ["-3", "3", "ongedefinieerd (nie reëel nie)", "±3"], answer: 2, topic: "Heelgetalle" },
        { type: "input", text: "Bereken: ∛(-64) + √225 - (-3)²", answer: "2", topic: "Heelgetalle" },
        { type: "input", text: "'n Kubusvormige houer het 'n volume van 512 cm³. Bereken die lengte van een sy van die houer (in cm).", answer: "8", topic: "Heelgetalle" },
      ]
    },
  ],
  workbook: {
    chapter: 2, chapterName: "Heelgetalle",
    topics: [
      {
        name: "Bewerkings met Heelgetalle",
        questions: [
          {
            num: "1",
            text: "Bereken elkeen van die volgende:",
            parts: [
              { label: "a)", text: "(-15) + (-8) - (-23)", marks: 2 },
              { label: "b)", text: "(-6) × (-7) × (-2)", marks: 2 },
              { label: "c)", text: "(-72) ÷ (-9) + (-4) × 3", marks: 3 },
              { label: "d)", text: "-5² - (-3)²", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Gebruik die volgorde van bewerkings (BODMAS) om te bereken:",
            parts: [
              { label: "a)", text: "(-3)² - (-4)(5) + (-2)³", marks: 4 },
              { label: "b)", text: "[(-18) ÷ 3] - [(-4) × (-5)]", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Vierkante, Kubusse en Wortels",
        questions: [
          {
            num: "3",
            text: "Bereken elkeen van die volgende, of dui aan of dit nie reëel is nie:",
            parts: [
              { label: "a)", text: "√225", marks: 1 },
              { label: "b)", text: "-√81", marks: 1 },
              { label: "c)", text: "∛216", marks: 1 },
              { label: "d)", text: "∛(-64)", marks: 2 },
              { label: "e)", text: "√(-49)", marks: 1 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 2, chapterName: "Hoofstuk 2 — Heelgetalle",
    topics: [
      {
        name: "Bewerkings met Heelgetalle",
        answers: [
          { num: "Q1a", ans: "0", note: "-15 - 8 + 23 = 0" },
          { num: "Q1b", ans: "-84", note: "42 × (-2) = -84 (drie negatiewe getalle → negatief)" },
          { num: "Q1c", ans: "-4", note: "8 + (-12) = -4" },
          { num: "Q1d", ans: "-34", note: "-25 - 9 = -34; let wel -5² = -25, (-3)² = 9" },
          { num: "Q2a", ans: "21", note: "9 + 20 - 8 = 21" },
          { num: "Q2b", ans: "-26", note: "[-6] - [20] = -26" },
        ]
      },
      {
        name: "Vierkante, Kubusse en Wortels",
        answers: [
          { num: "Q3a", ans: "15", note: "15² = 225" },
          { num: "Q3b", ans: "-9", note: "√81 = 9; negeer" },
          { num: "Q3c", ans: "6", note: "6³ = 216" },
          { num: "Q3d", ans: "-4", note: "(-4)³ = -64" },
          { num: "Q3e", ans: "Nie reëel nie", note: "Die vierkantswortel van 'n negatiewe getal kan nie getrek word nie" },
        ]
      },
    ]
  }
});
