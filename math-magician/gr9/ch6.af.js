// Math Magician — Grade 9, Chapter 6 data (Afrikaans)
// Funksies en Verwantskappe

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 11,
      chapter: 6,
      name: "Funksies en afbeeldings",
      fullName: "Funksies, afbeeldings en voorstellings",
      lesson: {
        heading: "Funksies en afbeeldings",
        sub: "Hoofstuk 6 · Onderwerp 1",
        body: `
          <p>'n <strong>Funksie</strong> is 'n reël wat presies een uitvoerwaarde vir elke toevoerwaarde toeken. Funksies kan as tabelle, vergelykings, geordende pare, of grafieke voorgestel word.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelwoordeskat</div>
            <p>
              <strong>Toevoer/Domein (x):</strong> versameling van toegelate toevoerwaardes.<br>
              <strong>Uitvoer/Bereik (y):</strong> versameling van gevolglike uitvoerwaardes.<br>
              <strong>Funksienotasie:</strong> f(x) = ... lees "f van x is gelyk aan ..."<br>
              <strong>Geordende paar:</strong> (x; y) — x is die toevoer, y is die uitvoer.<br><br>
              'n Verwantskap is 'n funksie as elke x-waarde <em>slegs een</em> y-waarde het (vertikale-lyn-toets op 'n grafiek).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>f(x) = 3x - 1: f(4) = 3(4) - 1 = 11; f(-2) = 3(-2) - 1 = -7</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Gegee f(x) = 2x + 5: bepaal x as f(x) = 17 → 2x + 5 = 17 → x = 6</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Tabel van waardes vir y = x²: x: -2,-1,0,1,2 → y: 4,1,0,1,4</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>f(x) is NIE f &times; x nie. Dit beteken "die funksie f geëvalueer by x".</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Funksienotasie en Tabel van Waardes</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer 'n lineêre funksie f(x) = mx + c in. Genereer 'n tabel van waardes, bepaal f(x) vir enige toevoer, en los op vir x gegewe f(x).</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">m (gradiënt)</label><input id="fnM" type="number" value="3" step="any" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">c (y-afsnit)</label><input id="fnC" type="number" value="-1" step="any" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Evalueer f(x): x=</label><input id="fnX" type="number" value="4" step="any" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Los op: f(x)=</label><input id="fnY" type="number" value="11" step="any" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
            </div>
            <div id="fnTable" style="overflow-x:auto;margin-bottom:10px;"></div>
            <div id="fnOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              var m=parseFloat(document.getElementById('fnM').value)||0;
              var c=parseFloat(document.getElementById('fnC').value)||0;
              var xVal=parseFloat(document.getElementById('fnX').value);
              var yVal=parseFloat(document.getElementById('fnY').value);
              var f=function(x){return m*x+c;};
              var xs=[-3,-2,-1,0,1,2,3];
              var mStr=(m===1?'':m===-1?'-':String(m));
              var cStr=c===0?'':(c>0?' + '+c:' - '+Math.abs(c));
              var funcStr='f(x) = '+mStr+'x'+cStr;
              // Table
              var th=xs.map(function(x){return '<th style="padding:4px 10px;color:#fbbf24;font-size:11px;">'+x+'</th>';}).join('');
              var td=xs.map(function(x){return '<td style="padding:4px 10px;color:#6ee7b7;font-size:11px;">'+f(x)+'</td>';}).join('');
              document.getElementById('fnTable').innerHTML='<table style="border-collapse:collapse;font-family:JetBrains Mono,monospace;font-size:11px;"><tr><th style="padding:4px 10px;color:rgba(221,225,240,0.45);">x</th>'+th+'</tr><tr><th style="padding:4px 10px;color:rgba(221,225,240,0.45);">f(x)</th>'+td+'</tr></table>';
              var lines=[];
              lines.push('<div><span style="color:rgba(221,225,240,0.45);">Funksie: </span><span style="color:#fbbf24;font-weight:700;">'+funcStr+'</span></div>');
              if(!isNaN(xVal)){lines.push('<div><span style="color:rgba(221,225,240,0.45);">f('+xVal+') = '+m+'('+xVal+')+'+c+' = </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+f(xVal)+'</span></div>');}
              if(!isNaN(yVal)&&m!==0){var sol=(yVal-c)/m;lines.push('<div><span style="color:rgba(221,225,240,0.45);">f(x)='+yVal+' → '+m+'x'+cStr+' = '+yVal+' → x = </span><span style="color:#a5b4fc;font-size:15px;font-weight:700;">'+sol+'</span></div>');}
              else if(m===0&&!isNaN(yVal)){lines.push('<div style="color:#fca5a5;">m = 0: konstante funksie, kan nie vir x oplos nie tensy f(x) = '+c+'.</div>');}
              document.getElementById('fnOut').innerHTML=lines.join('');
            }
            ['fnM','fnC','fnX','fnY'].forEach(function(id){document.getElementById(id).addEventListener('input',update);});
            update();
          })();
          </script>
        Dink aan f as 'n masjien wat x verwerk.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Gegee f(x) = 4x - 3, bereken f(5).", answer: "17", topic: "Funksies" },
        { type: "mc", text: "As g(x) = x² + 2, wat is g(-3)?", options: ["7", "11", "-7", "13"], answer: 1, topic: "Funksies" },
        { type: "input", text: "Vir f(x) = 5x + 2, bepaal x as f(x) = 32.", answer: "6", topic: "Funksies" },
        { type: "mc", text: "Watter versameling geordende pare verteenwoordig 'n funksie?", options: ["{(1;2),(2;3),(1;4)}", "{(1;2),(2;2),(3;2)}", "{(1;2),(1;3),(1;4)}", "Geeneen van hierdie"], answer: 1, topic: "Funksies" },
        { type: "input", text: "Voltooi die tabel vir y = 2x - 1: as x = 0, y = ?", answer: "-1", topic: "Funksies" },
        { type: "input", text: "As f(x) = 2x² - 3x + 1, bereken f(-2) - f(1).", answer: "15", topic: "Funksies" },
        { type: "input", text: "'n Lineêre funksie f(x) = mx + c gaan deur die punte (1;7) en (3;15). Bereken f(10).", answer: "43", topic: "Funksies" },
      ]
    },
    {
      id: 12,
      chapter: 6,
      name: "Lineêre en nie-lineêre funksies",
      fullName: "Lineêre en nie-lineêre funksies — grafieke",
      lesson: {
        heading: "Lineêre en nie-lineêre funksies",
        sub: "Hoofstuk 6 · Onderwerp 2",
        body: `
          <p>Funksies word geklassifiseer volgens die vorm van hul grafieke.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Tipes funksies in Graad 9</div>
            <p>
              <strong>Lineêr:</strong> y = mx + c → reguitlyn-grafiek. m = gradiënt (helling), c = y-afsnit.<br>
              <strong>Parabool:</strong> y = x² → U-vormige kurwe (draaipunt by die oorsprong vir y = x²).<br>
              <strong>Hiperbool:</strong> y = k/x → twee kurwes, een in elk van twee teenoorgestelde kwadrante.<br>
              <strong>Eksponensieel:</strong> y = bˣ (b > 0, b ≠ 1) → altyd positief, raak nooit die x-as nie.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Sleuteleienskappe</div>
            <div class="example-step"><span class="step-num">1</span><span>y = 2x + 3: gradiënt = 2 (styg 2 vir elke 1 regs), y-afsnit = (0;3)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>y = x²: draaipunt (0;0), open opwaarts, simmetrie-as x = 0</span></div>
            <div class="example-step"><span class="step-num">3</span><span>y = 6/x: gaan deur (1;6), (2;3), (3;2), (6;1) en (-1;-6), (-2;-3)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Om enige funksie te skets, maak altyd eers 'n tabel van waardes.
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Parabool-verkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Verstel a, p, q in y = a(x&#8722;p)&#178; + q. Draaipunt, afsnitte en bereik werk regstreeks op.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:10px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a</label><input id="pra2" type="number" value="-1" step="0.5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">p</label><input id="prp2" type="number" value="2" step="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">q</label><input id="prq2" type="number" value="4" step="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
            </div>
            <canvas id="parCanvas2" width="300" height="180" style="width:100%;max-width:300px;border-radius:8px;background:#0f0e1a;display:block;margin-bottom:10px;"></canvas>
            <div id="prOut2" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:1.9;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('pra2').value)||1;
              const p=parseFloat(document.getElementById('prp2').value)||0;
              const q=parseFloat(document.getElementById('prq2').value)||0;
              var f=function(x){return a*(x-p)*(x-p)+q;};
              var cv=document.getElementById('parCanvas2'),ctx=cv.getContext('2d');
              var W=cv.width,H=cv.height,cx=W/2,cy=H/2,sx=25,sy=18;
              ctx.clearRect(0,0,W,H);
              ctx.strokeStyle='rgba(255,255,255,0.12)';ctx.lineWidth=1;
              ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(W,cy);ctx.stroke();
              ctx.beginPath();ctx.moveTo(cx,0);ctx.lineTo(cx,H);ctx.stroke();
              ctx.strokeStyle='#6366f1';ctx.lineWidth=2;ctx.beginPath();
              var first=true;
              for(var px=0;px<W;px++){var xv=(px-cx)/sx,yv=f(xv),py=cy-yv*sy;if(py<-5||py>H+5){first=true;continue;}if(first){ctx.moveTo(px,py);}else{ctx.lineTo(px,py);}first=false;}
              ctx.stroke();
              var x2p=function(x){return cx+x*sx;},y2p=function(y){return cy-y*sy;};
              ctx.fillStyle='#fcd34d';ctx.beginPath();ctx.arc(x2p(p),y2p(q),4,0,2*Math.PI);ctx.fill();
              var yi=f(0);ctx.fillStyle='#6ee7b7';ctx.beginPath();ctx.arc(x2p(0),y2p(yi),3,0,2*Math.PI);ctx.fill();
              var disc=-q/a;var xInts=[];
              if(disc>0){var sq=Math.sqrt(disc);xInts=[p+sq,p-sq];}else if(disc===0){xInts=[p];}
              xInts.forEach(function(xi){ctx.fillStyle='#f59e0b';ctx.beginPath();ctx.arc(x2p(xi),y2p(0),3,0,2*Math.PI);ctx.fill();});
              var r=function(v){return Math.round(v*100)/100;};
              document.getElementById('prOut2').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">Draaipunt:</span><span style="color:#fcd34d;">('+p+', '+q+') '+(a>0?'↑ Min':'↓ Maks')+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">As:</span><span style="color:#a5b4fc;">x = '+p+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">y-afsnit:</span><span style="color:#6ee7b7;">(0, '+r(yi)+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">x-afsnit(te):</span><span style="color:#f59e0b;">'+(xInts.length?xInts.map(r).join(', '):'Geen')+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">Bereik:</span><span style="color:#a5b4fc;">'+(a>0?'y ≥ '+q:'y ≤ '+q)+'</span></div>',
              ].join('');
            }
            ['pra2','prp2','prq2'].forEach(function(id){document.getElementById(id).addEventListener('input',update);});
            update();
          })();
          </script>
        Gebruik ten minste 5 punte vir akkuraatheid.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Wat is die y-afsnit van y = 3x - 7?", options: ["3", "7", "-7", "-3"], answer: 2, topic: "Funksies" },
        { type: "mc", text: "Watter funksie het 'n grafiek wat 'n U-vorm (parabool) is?", options: ["y = 3x + 1", "y = 3/x", "y = x²", "y = 2ˣ"], answer: 2, topic: "Funksies" },
        { type: "input", text: "Vir y = 12/x, bereken y as x = 4.", answer: "3", topic: "Funksies" },
        { type: "mc", text: "Vir y = 2x + 5, is die gradiënt:", options: ["5", "2", "7", "-5"], answer: 1, topic: "Funksies" },
        { type: "mc", text: "Die funksie y = 4/x is 'n:", options: ["Lineêre funksie", "Parabool", "Hiperbool", "Eksponensiële funksie"], answer: 2, topic: "Funksies" },
        { type: "input", text: "Die grafiek van y = k/x gaan deur die punt (3;8). Bepaal k, en gebruik dit dan om y te bereken as x = 6.", answer: "4", topic: "Funksies" },
        { type: "input", text: "'n Parabool y = ax² het sy draaipunt by die oorsprong en gaan deur die punt (2;12). Bepaal a, en bereken dan y as x = -3.", answer: "27", topic: "Funksies" },
      ]
    },
  ],
  workbook: {
    chapter: 6, chapterName: "Funksies en Verwantskappe",
    topics: [
      {
        name: "Funksies en Notasie",
        questions: [
          {
            num: "1",
            text: "Gegee f(x) = 3x² - x + 2:",
            parts: [
              { label: "a)", text: "Bereken f(0), f(1) en f(-2).", marks: 4 },
              { label: "b)", text: "Bepaal x as f(x) = 12 (los die vergelyking op).", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Grafieke van Funksies",
        questions: [
          {
            num: "2",
            text: "Vir die funksie y = 2x - 4:",
            parts: [
              { label: "a)", text: "Stel 'n tabel van waardes op vir x ∈ {-2; -1; 0; 1; 2; 3}.", marks: 3 },
              { label: "b)", text: "Teken die grafiek op 'n stel asse. Merk die afsnitte.", marks: 4 },
              { label: "c)", text: "Skryf die gradiënt en y-afsnit neer.", marks: 2 },
              { label: "d)", text: "Vir watter waarde van x is y = 0?", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "Beskou y = 12/x.",
            parts: [
              { label: "a)", text: "Voltooi die tabel: x = 1, 2, 3, 4, 6, 12.", marks: 3 },
              { label: "b)", text: "In watter kwadrant lê die ander tak van die hiperbool?", marks: 2 },
            ]
          },
          {
            num: "4",
            text: "Die grafiek van 'n reguit lyn gaan deur die punte (0;5), (2;9), (4;13) en (6;17), soos van die grafiek afgelees.",
            parts: [
              { label: "a)", text: "Gebruik enige twee punte uit die tabel om die gradiënt van die lyn te bereken.", marks: 2 },
              { label: "b)", text: "Skryf die vergelyking van die lyn neer in die vorm y = mx + c.", marks: 2 },
              { label: "c)", text: "Gebruik jou vergelyking om y te bepaal as x = 10.", marks: 2 },
              { label: "d)", text: "Gebruik jou vergelyking om die waarde van x te bepaal waarvoor y = 33.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 6, chapterName: "Hoofstuk 6 — Funksies en Verwantskappe",
    topics: [
      {
        name: "Funksies en Notasie",
        answers: [
          { num: "Q1a", ans: "f(0)=2; f(1)=4; f(-2)=16", note: "f(0)=0-0+2=2; f(1)=3-1+2=4; f(-2)=12+2+2=16" },
          { num: "Q1b", ans: "x = 2 of x = −5/3", note: "3x²−x−10=0; Δ=1+120=121; x=(1±11)/6; x=2 of x=−5/3" },
//REMOVED:�v37)/6 (approximately x � 1,18 or x � -0,85)", note: "3x�-x+2=12 ? 3x�-x-10=0 ? quadratic formula; TAIL_REMOVED
        ]
      },
      {
        name: "Grafieke van Funksies",
        answers: [
          { num: "Q2a", ans: "x:-2,-1,0,1,2,3 y:-8,-6,-4,-2,0,2", note: "y=2x-4" },
          { num: "Q2c", ans: "Gradiënt = 2; y-afsnit = -4", note: "m=2, c=-4" },
          { num: "Q2d", ans: "x = 2", note: "2x-4=0 → x=2" },
          { num: "Q3a", ans: "y: 12, 6, 4, 3, 2, 1", note: "y=12/x" },
          { num: "Q3b", ans: "Derde kwadrant", note: "negatiewe x en negatiewe y" },
          { num: "Q4a", ans: "Gradiënt = 2", note: "m = (9-5)/(2-0) = 4/2 = 2" },
          { num: "Q4b", ans: "y = 2x + 5", note: "c = 5 (waarde van y wanneer x = 0); kontroleer met (4;13): 2(4)+5=13 ✓" },
          { num: "Q4c", ans: "y = 25", note: "y = 2(10) + 5 = 25" },
          { num: "Q4d", ans: "x = 14", note: "33 = 2x + 5 → 2x = 28 → x = 14" },
        ]
      },
    ]
  }
});
