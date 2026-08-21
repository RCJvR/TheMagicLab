// Math Magician — Graad 9, Hoofstuk 3 data (Afrikaans)
// Gewone en Desimale Breuke

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 5,
      chapter: 3,
      name: "Gewone breuke",
      fullName: "Bewerkings met gewone breuke",
      lesson: {
        heading: "Bewerkings met gewone breuke",
        sub: "Hoofstuk 3 — Onderwerp 1",
        body: `
          <p>Gewone breuke verteenwoordig dele van 'n geheel. In Graad 9 werk ons met al vier bewerkings op breuke, insluitend gemengde getalle.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Opsomming van bewerkings</div>
            <p>
              <strong>Optel/Aftrek:</strong> vind die KGN (kleinste gemene noemer), skryf om, tel dan die tellers op of trek hulle af.<br>
              <strong>Vermenigvuldig:</strong> vermenigvuldig teller × teller, noemer × noemer. Vereenvoudig eers indien moontlik.<br>
              <strong>Deel:</strong> vermenigvuldig met die resiproke van die deler (HVO: Hou, Verander, Omdraai).<br>
              <strong>Gemengde getalle:</strong> skryf eers om na onegte breuke voordat jy die bewerking doen, en skryf dan weer terug om.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>3/4 + 5/6 → KGN = 12 → 9/12 + 10/12 = 19/12 = 1 7/12</span></div>
            <div class="example-step"><span class="step-num">2</span><span>2 1/3 × 1 1/2 = 7/3 × 3/2 = 21/6 = 7/2 = 3 1/2</span></div>
            <div class="example-step"><span class="step-num">3</span><span>3/4 ÷ 9/8 = 3/4 × 8/9 = 24/36 = 2/3</span></div>
            <div class="example-step"><span class="step-num">4</span><span>4 - 1 3/5 = 4 - 8/5 = 20/5 - 8/5 = 12/5 = 2 2/5</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vereenvoudig altyd voor jy vermenigvuldig — kanselleer gemeenskaplike faktore tussen enige teller en enige noemer om die getalle klein te hou.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Breukbewerkings-sakrekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer twee breuke in en kies 'n bewerking. Sien die stap-vir-stap resultaat in eenvoudigste vorm.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;align-items:center;"><input id="fn1" type="number" value="3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px 7px 0 0;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"><div style="width:55px;height:2px;background:rgba(99,102,241,0.60);"></div><input id="fd1" type="number" value="4" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:0 0 7px 7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <select id="fop" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:8px 10px;border-radius:7px;font-size:18px;font-family:JetBrains Mono,monospace;"><option value="+">+</option><option value="-">&minus;</option><option value="*">&times;</option><option value="/">&divide;</option></select>
              <div style="display:flex;flex-direction:column;gap:4px;align-items:center;"><input id="fn2" type="number" value="5" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px 7px 0 0;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"><div style="width:55px;height:2px;background:rgba(99,102,241,0.60);"></div><input id="fd2" type="number" value="6" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:0 0 7px 7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="fCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="fOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
            function simplify(n,d){if(d===0)return{n:NaN,d:1};var g=gcd(Math.abs(n),Math.abs(d));var sign=d<0?-1:1;return{n:sign*n/g,d:sign*d/g};}
            function fmt(n,d){if(isNaN(n))return '<span style="color:#fca5a5;">ongedefinieerd</span>';if(d===1)return '<span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+n+'</span>';var whole=Math.floor(Math.abs(n)/d),rem=Math.abs(n)%d,sign=n<0?'&minus;':'';return whole>0?'<span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+sign+whole+' '+rem+'/'+d+'</span>':'<span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+n+'/'+d+'</span>';}
            function calc(){var n1=parseInt(document.getElementById('fn1').value)||0,d1=parseInt(document.getElementById('fd1').value)||1;var n2=parseInt(document.getElementById('fn2').value)||0,d2=parseInt(document.getElementById('fd2').value)||1;var op=document.getElementById('fop').value;var rn,rd,step;if(op==='+'){rn=n1*d2+n2*d1;rd=d1*d2;step=n1+'/'+d1+' + '+n2+'/'+d2+' = '+(n1*d2)+'/'+(d1*d2)+' + '+(n2*d1)+'/'+(d1*d2)+' = '+rn+'/'+rd;}else if(op==='-'){rn=n1*d2-n2*d1;rd=d1*d2;step=n1+'/'+d1+' - '+n2+'/'+d2+' = '+(n1*d2)+'/'+(d1*d2)+' - '+(n2*d1)+'/'+(d1*d2)+' = '+rn+'/'+rd;}else if(op==='*'){rn=n1*n2;rd=d1*d2;step=n1+'/'+d1+' × '+n2+'/'+d2+' = '+(n1*n2)+'/'+(d1*d2);}else{if(n2===0){document.getElementById('fOut').innerHTML='<span style="color:#fca5a5;">Kan nie deur \'n nul-breuk deel nie.</span>';return;}rn=n1*d2;rd=d1*n2;step=n1+'/'+d1+' ÷ '+n2+'/'+d2+' = '+n1+'/'+d1+' × '+d2+'/'+n2+' = '+(n1*d2)+'/'+(d1*n2);}var r=simplify(rn,rd);document.getElementById('fOut').innerHTML=['<div style="color:rgba(221,225,240,0.45);font-size:11px;">'+step+'</div>','<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Resultaat: </span>'+fmt(r.n,r.d)+'</div>'].join('');}
            document.getElementById('fCalc').addEventListener('click',calc);document.getElementById('fop').addEventListener('change',calc);
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Bereken: 2/3 + 3/4", options: ["5/7", "17/12", "5/12", "6/7"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Bereken: 3 1/2 × 2 2/3 (gee die antwoord as onegte breuk se teller, met noemer 3)", answer: "28", topic: "Breuke" },
        { type: "mc", text: "Bereken: 5/6 ÷ 5/12", options: ["1/2", "2", "25/72", "10/6"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Bereken: 4 1/4 - 2 3/4 (gee die antwoord as gemengde getal se teller + noemer bymekaar getel — skryf net: 1,5 → skryf 3/2 → skryf die teller 3)", answer: "3", topic: "Breuke" },
        { type: "mc", text: "Watter breuk is ekwivalent aan 3 3/7?", options: ["24/7", "21/7", "24/3", "21/3"], answer: 0, topic: "Breuke" },
        { type: "input", text: "Bereken (2 1/3 + 1 1/6) ÷ 3/4. Gee net die heelgetal-deel van die gemengde-getal-antwoord.", answer: "4", topic: "Breuke" },
        { type: "input", text: "'n Resep gebruik 2 3/4 koppies meel per bondel koekies. 'n Bakker het 12 koppies meel. Nadat sy soveel volledige bondels as moontlik gemaak het, hoeveel koppies meel bly oor?", answer: "1", topic: "Breuke" },
      ]
    },
    {
      id: 6,
      chapter: 3,
      name: "Desimale breuke",
      fullName: "Desimale breuke en omskakeling",
      lesson: {
        heading: "Desimale breuke en omskakeling",
        sub: "Hoofstuk 3 — Onderwerp 2",
        body: `
          <p>Desimale breuke brei plekwaarde verder uit as die eenhede-kolom. Om tussen breuke en desimale om te skakel is 'n noodsaaklike vaardigheid.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Omskakelingsreëls</div>
            <p>
              <strong>Breuk → Desimaal:</strong> deel die teller deur die noemer.<br>
              <strong>Eindigende desimaal → Breuk:</strong> skryf die syfers oor 10/100/1000 ens., vereenvoudig.<br>
              <strong>Herhalende desimaal → Breuk:</strong> gebruik die algebraïese metode (vermenigvuldig met 10n waar n = lengte van die herhalende blok).<br>
              <strong>Persentasie → Desimaal:</strong> deel deur 100.<br>
              <strong>Desimaal → Persentasie:</strong> vermenigvuldig met 100.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>0,625 = 625/1000 = 5/8</span></div>
            <div class="example-step"><span class="step-num">2</span><span>5/11: 5 ÷ 11 = 0,4̇5̇ (herhalend)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Skakel 0,83̇ om: laat x = 0,83̇; 10x = 8,3̇; 9x = 7,5; x = 7,5/9 = 15/18 = 5/6</span></div>
            <div class="example-step"><span class="step-num">4</span><span>0,36 × 100 = 36% en 36% ÷ 100 = 0,36</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer jy 'n herhalende desimaal omskakel, is die aantal 9's in die noemer gelyk aan die lengte van die herhalende blok.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Breuk &#8596; Desimaal-omskakelaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Skakel 'n breuk om na 'n desimaal, of 'n eindigende desimaal om na 'n breuk. Sluit persentasie-omskakeling in.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:10px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Modus</label><select id="convMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;"><option value="f2d">Breuk &#8594; Desimaal</option><option value="d2f">Desimaal &#8594; Breuk</option><option value="pct">Desimaal &#8596; %</option></select></div>
              <div id="convF" style="display:flex;flex-direction:column;gap:4px;align-items:center;"><input id="convN" type="number" value="7" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px 7px 0 0;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"><div style="width:60px;height:2px;background:rgba(99,102,241,0.60);"></div><input id="convD" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:0 0 7px 7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div id="convDec" style="display:none;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Waarde</label><input id="convVal" type="text" value="0.625" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="convBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Skakel om</button>
            </div>
            <div id="convOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
            var modeEl=document.getElementById('convMode');
            function setMode(){var m=modeEl.value;document.getElementById('convF').style.display=(m==='f2d')?'flex':'none';document.getElementById('convDec').style.display=(m!=='f2d')?'flex':'none';}
            modeEl.addEventListener('change',function(){setMode();convert();});
            function convert(){var m=modeEl.value,out=document.getElementById('convOut');if(m==='f2d'){var n=parseInt(document.getElementById('convN').value)||0,d=parseInt(document.getElementById('convD').value)||1;if(d===0){out.innerHTML='<span style="color:#fca5a5;">Noemer kan nie 0 wees nie.</span>';return;}var dec=(n/d).toFixed(10).replace(/0+$/,'').replace(/\.$/,'');out.innerHTML='<div><span style="color:rgba(221,225,240,0.45);">'+n+' ÷ '+d+' = </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+dec+'</span></div>';}else if(m==='d2f'){var v=parseFloat(document.getElementById('convVal').value);if(isNaN(v)){out.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige desimaal in.</span>';return;}var s=String(v),dec_part=(s.split('.')[1]||''),places=dec_part.length;var denom=Math.pow(10,places),numer=Math.round(v*denom);var g=gcd(Math.abs(numer),denom);out.innerHTML='<div><span style="color:rgba(221,225,240,0.45);">Stap 1: </span>'+v+' = '+numer+'/'+denom+'</div><div><span style="color:rgba(221,225,240,0.45);">GGD = '+g+' → vereenvoudig: </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+(numer/g)+'/'+(denom/g)+'</span></div>';}else{var v=parseFloat(document.getElementById('convVal').value);if(isNaN(v)){out.innerHTML='<span style="color:#fca5a5;">Voer \'n waarde in.</span>';return;}var pct=v<=1?v*100:v,dec2=v>1?v/100:v;out.innerHTML='<div><span style="color:rgba(221,225,240,0.45);">As desimaal: </span><span style="color:#6ee7b7;font-weight:700;">'+dec2+'</span></div><div><span style="color:rgba(221,225,240,0.45);">As persentasie: </span><span style="color:#fbbf24;font-weight:700;">'+pct+'%</span></div>';}}
            document.getElementById('convBtn').addEventListener('click',convert);setMode();convert();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Skryf 0,375 as 'n breuk in eenvoudigste vorm:", options: ["375/1000", "3/8", "37/100", "7/20"], answer: 1, topic: "Desimale" },
        { type: "input", text: "Skakel 7/8 om na 'n desimaal.", answer: "0.875", topic: "Desimale" },
        { type: "mc", text: "Skryf 0,2̇ (= 0,222̇) as 'n breuk:", options: ["2/9", "1/5", "2/10", "22/99"], answer: 0, topic: "Desimale" },
        { type: "input", text: "Skakel 0,45 om na 'n persentasie.", answer: "45", topic: "Desimale" },
        { type: "mc", text: "Watter desimaal is ekwivalent aan 5/12?", options: ["0,416̇", "0,41̇6̇", "0,4166̇", "Beide a) en c)"], answer: 3, topic: "Desimale" },
        { type: "input", text: "Skryf 0,875 as 'n persentasie, en gebruik dit om 0,875 van R 480 te bereken. Gee die randbedrag.", answer: "420", topic: "Desimale" },
        { type: "input", text: "Bereken 0,<span class='math'>\\overline{4}</span> + 0,2 en gee die antwoord as 'n enkele breuk a/b in eenvoudigste vorm (skryf dit as a/b).", answer: "29/45", topic: "Desimale" },
      ]
    },
  ],
  workbook: {
    chapter: 3, chapterName: "Gewone en Desimale Breuke",
    topics: [
      {
        name: "Gewone Breuke",
        questions: [
          {
            num: "1",
            text: "Bereken, en vereenvoudig alle antwoorde:",
            parts: [
              { label: "a)", text: "3/5 + 7/10 - 1/2", marks: 3 },
              { label: "b)", text: "4/9 × 3/8 ÷ 1/6", marks: 4 },
              { label: "c)", text: "2 3/4 + 1 5/6", marks: 3 },
              { label: "d)", text: "3 1/3 ÷ 2 1/2", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Desimale Breuke",
        questions: [
          {
            num: "2",
            text: "Skakel elke desimaal om na 'n breuk in eenvoudigste vorm:",
            parts: [
              { label: "a)", text: "0,48", marks: 2 },
              { label: "b)", text: "1,64", marks: 2 },
              { label: "c)", text: "0,5̇ (0,555̇)", marks: 3 },
              { label: "d)", text: "0,81̇ (0,8111̇)", marks: 4 },
            ]
          },
          {
            num: "3",
            text: "Skakel elke breuk om na 'n desimaal (dui herhalende desimale aan met puntnotasie):",
            parts: [
              { label: "a)", text: "7/8", marks: 2 },
              { label: "b)", text: "5/9", marks: 2 },
              { label: "c)", text: "4/15", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 3, chapterName: "Hoofstuk 3 — Gewone en Desimale Breuke",
    topics: [
      {
        name: "Gewone Breuke",
        answers: [
          { num: "Q1a", ans: "4/5", note: "KGN = 10: 6/10 + 7/10 - 5/10 = 8/10 = 4/5" },
          { num: "Q1b", ans: "1", note: "4/9 × 3/8 = 12/72 = 1/6; dan 1/6 ÷ 1/6 = 1" },
          { num: "Q1c", ans: "4 7/12", note: "11/4 + 11/6 = 33/12 + 22/12 = 55/12 = 4 7/12" },
          { num: "Q1d", ans: "1 1/3", note: "10/3 ÷ 5/2 = 10/3 × 2/5 = 20/15 = 4/3 = 1 1/3" },
        ]
      },
      {
        name: "Desimale Breuke",
        answers: [
          { num: "Q2a", ans: "12/25", note: "48/100 = 12/25" },
          { num: "Q2b", ans: "1 16/25", note: "164/100 = 41/25 = 1 16/25" },
          { num: "Q2c", ans: "5/9", note: "x = 0,5̇; 10x = 5,5̇; 9x = 5; x = 5/9" },
          { num: "Q2d", ans: "73/90", note: "laat x = 0,81̇; 10x = 8,1̇; 90x = 73; x = 73/90" },
          { num: "Q3a", ans: "0,875", note: "7 ÷ 8 = 0,875" },
          { num: "Q3b", ans: "0,5̇", note: "5 ÷ 9 = 0,555̇" },
          { num: "Q3c", ans: "0,26̇", note: "4 ÷ 15 = 0,2666̇" },
        ]
      },
    ]
  }
});
