// Math Magician — Grade 9, Chapter 16 data (Afrikaans)
// Transformasiemeetkunde

MathMagician.registerChapter(16, {
  topics: [
    {
      id: 31,
      chapter: 16,
      name: "Translasies en spieëlings",
      fullName: "Translasies en spieëlings op die Cartesiese vlak",
      lesson: {
        heading: "Translasies en spieëlings",
        sub: "Hoofstuk 16 · Onderwerp 1",
        body: `
          <p>Transformasies skuif of verander vorms op die Cartesiese vlak. Die oorspronklike vorm is die <strong>voorwerp</strong>; die resultaat is die <strong>beeld</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Translasie</div>
            <p>
              'n Translasie skuif 'n vorm sonder om dit te draai of te spieël.<br>
              <strong>Reël:</strong> (x; y) → (x + a; y + b)<br>
              waar a = horisontale skuif (+ = regs, - = links)<br>
              en b = vertikale skuif (+ = op, - = af)<br><br>
              <strong>Let wel:</strong> vorm, grootte en oriëntasie bly onveranderd.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Spieëling</div>
            <p>
              'n Spieëling flip 'n vorm oor 'n <strong>spieëllyn</strong>.<br>
              <strong>x-as:</strong> (x; y) → (x; -y)<br>
              <strong>y-as:</strong> (x; y) → (-x; y)<br>
              <strong>y = x:</strong> (x; y) → (y; x)<br>
              <strong>y = -x:</strong> (x; y) → (-y; -x)
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>'n Translasie verander NIE die grootte of vorm nie — slegs die posisie. Alle punte skuif dieselfde afstand in dieselfde rigting.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Translasie- en spieëlingverkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer 'n punt in, kies 'n transformasie, en sien die beeldkoördinate. Die Cartesiese vlak word outomaties bygewerk.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);">Transformasie</label>
                <select id="tfType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="trans">Transleer met (a; b)</option>
                  <option value="refX">Spieël in x-as</option>
                  <option value="refY">Spieël in y-as</option>
                  <option value="refYX">Spieël in y = x</option>
                  <option value="refYnX">Spieël in y = &minus;x</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Punt x</label><input id="tfX" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Punt y</label><input id="tfY" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div id="tfABdiv" style="display:flex;gap:8px;">
                <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a</label><input id="tfA" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
                <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">b</label><input id="tfB" type="number" value="-1" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              </div>
            </div>
            <svg id="tfSvg" viewBox="0 0 240 240" style="width:240px;height:240px;border-radius:8px;background:rgba(10,15,30,0.60);margin-bottom:10px;"></svg>
            <div id="tfOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function setType(){var t=document.getElementById('tfType').value;document.getElementById('tfABdiv').style.display=(t==='trans')?'flex':'none';}
            document.getElementById('tfType').addEventListener('change',function(){setType();transform();});
            function transform(){
              var t=document.getElementById('tfType').value;
              var x=parseFloat(document.getElementById('tfX').value)||0;
              var y=parseFloat(document.getElementById('tfY').value)||0;
              var a=parseFloat(document.getElementById('tfA').value)||0;
              var b=parseFloat(document.getElementById('tfB').value)||0;
              var ix,iy,rule,label;
              if(t==='trans'){ix=x+a;iy=y+b;rule='(x; y) → (x+'+a+'; y+'+b+')';label='Translasie met ('+a+'; '+b+')';}
              else if(t==='refX'){ix=x;iy=-y;rule='(x; y) → (x; -y)';label='Spieëling in die x-as';}
              else if(t==='refY'){ix=-x;iy=y;rule='(x; y) → (-x; y)';label='Spieëling in die y-as';}
              else if(t==='refYX'){ix=y;iy=x;rule='(x; y) → (y; x)';label='Spieëling in y = x';}
              else{ix=-y;iy=-x;rule='(x; y) → (-y; -x)';label='Spieëling in y = -x';}
              // Teken die rooster
              var W=240,cx=120,cy=120,scale=20;
              var grid='';
              for(var v=-5;v<=5;v++){
                var gx=cx+v*scale,gy=cy-v*scale;
                grid+='<line x1="'+gx+'" y1="0" x2="'+gx+'" y2="'+W+'" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>';
                grid+='<line x1="0" y1="'+gy+'" x2="'+W+'" y2="'+gy+'" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>';
              }
              grid+='<line x1="0" y1="'+cy+'" x2="'+W+'" y2="'+cy+'" stroke="rgba(255,255,255,0.20)" stroke-width="1.2"/>';
              grid+='<line x1="'+cx+'" y1="0" x2="'+cx+'" y2="'+W+'" stroke="rgba(255,255,255,0.20)" stroke-width="1.2"/>';
              var px=cx+x*scale,py=cy-y*scale;
              var px2=cx+ix*scale,py2=cy-iy*scale;
              grid+='<line x1="'+px+'" y1="'+py+'" x2="'+px2+'" y2="'+py2+'" stroke="rgba(245,158,11,0.40)" stroke-width="1" stroke-dasharray="4,3"/>';
              grid+='<circle cx="'+px+'" cy="'+py+'" r="6" fill="#fbbf24"/>';
              grid+='<text x="'+(px+8)+'" y="'+(py-6)+'" font-size="9" fill="#fbbf24" font-family="JetBrains Mono,monospace">P('+x+';'+y+')</text>';
              grid+='<circle cx="'+px2+'" cy="'+py2+'" r="6" fill="#6ee7b7"/>';
              grid+='<text x="'+(px2+8)+'" y="'+(py2-6)+'" font-size="9" fill="#6ee7b7" font-family="JetBrains Mono,monospace">P\'('+ix+';'+iy+')</text>';
              document.getElementById('tfSvg').innerHTML=grid;
              document.getElementById('tfOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Transformasie: </span><span style="color:#fbbf24;">'+label+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Reël: </span><span style="color:#a5b4fc;">'+rule+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Oorspronklik: </span><span style="color:#fbbf24;font-weight:700;">P('+x+'; '+y+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Beeld: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">P\'('+ix+'; '+iy+')</span></div>',
              ].join('');
            }
            ['tfType','tfX','tfY','tfA','tfB'].forEach(function(id){
              var el=document.getElementById(id);
              el.addEventListener('input',transform);el.addEventListener('change',transform);
            });
            setType();transform();
          })();
          </script>
          onderskei die voorwerp van die beeld.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Punt (3; -2) word getransleer met (-4; 5). Die beeld is:", options: ["(-1; 3)", "(7; 3)", "(-1; -7)", "(7; -7)"], answer: 0, topic: "Transformasies" },
        { type: "mc", text: "Punt (5; 3) gespieël in die x-as gee:", options: ["(-5; 3)", "(5; -3)", "(-5; -3)", "(3; 5)"], answer: 1, topic: "Transformasies" },
        { type: "mc", text: "Punt (-2; 4) gespieël in die y-as gee:", options: ["(2; 4)", "(-2; -4)", "(4; -2)", "(-4; 2)"], answer: 0, topic: "Transformasies" },
        { type: "mc", text: "Om (3; 7) oor die lyn y = x te spieël, gee:", options: ["(3; 7)", "(-3; -7)", "(7; 3)", "(-7; -3)"], answer: 2, topic: "Transformasies" },
        { type: "input", text: "Punt A(-1; 4) word 3 regs en 2 af getransleer. Wat is die x-koördinaat van A'?", answer: "2", topic: "Transformasies" },
        { type: "input", text: "Punt A(2; -5) word eers getransleer met (-3; 6), en die resulterende punt word dan in die y-as gespieël. Wat is die x-koördinaat van die finale beeld?", answer: "1", topic: "Transformasies" },
        { type: "input", text: "'n Punt P word in die x-as gespieël, wat die beeld (7; -3) gee. Wat was die y-koördinaat van die oorspronklike punt P?", answer: "3", topic: "Transformasies" },
      ]
    },
    {
      id: 32,
      chapter: 16,
      name: "Rotasies en vergrotings",
      fullName: "Rotasies en vergrotings",
      lesson: {
        heading: "Rotasies en vergrotings",
        sub: "Hoofstuk 16 · Onderwerp 2",
        body: `
          <p><strong>Rotasies</strong> draai 'n vorm om 'n vaste punt (die draaipunt). <strong>Vergrotings</strong> skaleer 'n vorm met 'n skaalfaktor.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rotasie om die oorsprong</div>
            <p>
              <strong>90° antikloksgewys:</strong> (x; y) → (-y; x)<br>
              <strong>90° kloksgewys:</strong> (x; y) → (y; -x)<br>
              <strong>180°:</strong> (x; y) → (-x; -y)<br><br>
              Rotasie hou vorm en grootte dieselfde, maar verander die oriëntasie.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Vergroting (dilatasie)</div>
            <p>
              <strong>Sentrum by die oorsprong, skaalfaktor k:</strong> (x; y) → (kx; ky)<br><br>
              As k > 1: vergroting (groter)<br>
              As 0 < k < 1: verkleining (kleiner)<br>
              As k < 0: vergroting met spieëling<br><br>
              <strong>Effek op oppervlakte:</strong> vermenigvuldig met k²<br>
              <strong>Effek op omtrek:</strong> vermenigvuldig met k
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir 'n vergroting met faktor k vanaf die oorsprong:
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Transformasieverkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer 'n punt in en kies 'n transformasie. Sien die beeld en die gebruikte reël.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">x</label><input id="txX2" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">y</label><input id="txY2" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Transformasie</label>
                <select id="txType2" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="refX">Spieël x-as</option>
                  <option value="refY">Spieël y-as</option>
                  <option value="refYX">Spieël y = x</option>
                  <option value="refYNX">Spieël y = −x</option>
                  <option value="rot90a">Draai 90\xb0 antikloksgewys</option>
                  <option value="rot90c">Draai 90\xb0 kloksgewys</option>
                  <option value="rot180">Draai 180\xb0</option>
                  <option value="enlarge">Vergroot (skaal k)</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">k</label><input id="txK2" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="txBtn2" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Transformeer</button>
            </div>
            <div id="txOut2" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var rules={refX:'(x;y)→(x;−y)',refY:'(x;y)→(−x;y)',refYX:'(x;y)→(y;x)',refYNX:'(x;y)→(−y;−x)',rot90a:'(x;y)→(−y;x)',rot90c:'(x;y)→(y;−x)',rot180:'(x;y)→(−x;−y)',enlarge:'(x;y)→(kx;ky)'};
            function tx(){
              var x=parseFloat(document.getElementById('txX2').value)||0,y=parseFloat(document.getElementById('txY2').value)||0;
              var t=document.getElementById('txType2').value,k=parseFloat(document.getElementById('txK2').value)||1;
              var ix,iy;
              if(t==='refX'){ix=x;iy=-y;}else if(t==='refY'){ix=-x;iy=y;}else if(t==='refYX'){ix=y;iy=x;}else if(t==='refYNX'){ix=-y;iy=-x;}else if(t==='rot90a'){ix=-y;iy=x;}else if(t==='rot90c'){ix=y;iy=-x;}else if(t==='rot180'){ix=-x;iy=-y;}else{ix=k*x;iy=k*y;}
              document.getElementById('txOut2').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Voorwerp:</span><span style="color:#a5b4fc;"> ('+x+' ; '+y+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Reël:</span><span style="color:#fbbf24;"> '+rules[t].replace('k',k)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Beeld:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;"> ('+ix+' ; '+iy+')</span></div>',
              ].join('');
            }
            document.getElementById('txBtn2').addEventListener('click',tx);
            ['txX2','txY2','txK2'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')tx();});});
            tx();
          })();
          </script>
          elke punt beweeg langs sy lyn deur die oorsprong, k keer verder weg.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Om (4; -3) 90° antikloksgewys om die oorsprong te draai, gee:", options: ["(3; 4)", "(-3; -4)", "(-4; 3)", "(3; -4)"], answer: 0, topic: "Transformasies" },
        { type: "mc", text: "Om (2; 5) 180° om die oorsprong te draai, gee:", options: ["(5; 2)", "(-2; 5)", "(-2; -5)", "(5; -2)"], answer: 2, topic: "Transformasies" },
        { type: "mc", text: "Om (3; -4) met skaalfaktor 2 vanaf die oorsprong te vergroot, gee:", options: ["(6; -8)", "(1,5; -2)", "(5; -6)", "(6; 4)"], answer: 0, topic: "Transformasies" },
        { type: "input", text: "As 'n driehoek met oppervlakte 9 cm² met skaalfaktor 3 vergroot word, wat is die oppervlakte van die beeld?", answer: "81", topic: "Transformasies" },
        { type: "mc", text: "Om 'n vorm met skaalfaktor 0,5 te verklein, vermenigvuldig die omtrek met:", options: ["0,25", "0,5", "2", "4"], answer: 1, topic: "Transformasies" },
        { type: "input", text: "Punt B(-2; 5) word 90° kloksgewys om die oorsprong gedraai, en die beeld word dan met skaalfaktor 3 vanaf die oorsprong vergroot. Wat is die x-koördinaat van die finale beeld?", answer: "15", topic: "Transformasies" },
        { type: "input", text: "'n Vorm word vanaf die oorsprong met skaalfaktor 4 vergroot, wat 'n beeld met oppervlakte 320 cm² tot gevolg het. Bepaal die oppervlakte van die oorspronklike vorm (in cm²).", answer: "20", topic: "Transformasies" },
      ]
    },
  ],
  workbook: {
    chapter: 16, chapterName: "Transformasiemeetkunde",
    topics: [
      {
        name: "Translasies en Spieëlings",
        questions: [
          {
            num: "1",
            text: "Driehoek ABC het hoekpunte A(1; 2), B(4; 2) en C(4; 5).",
            parts: [
              { label: "a)", text: "Transleer die driehoek 3 eenhede links en 4 eenhede af. Skryf die koördinate van A', B' en C' neer.", marks: 3 },
              { label: "b)", text: "Spieël die oorspronklike driehoek in die x-as. Skryf die nuwe koördinate neer.", marks: 3 },
              { label: "c)", text: "Spieël die oorspronklike driehoek in die y-as. Skryf die nuwe koördinate neer.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Rotasies en Vergrotings",
        questions: [
          {
            num: "2",
            text: "Gebruik dieselfde driehoek ABC van Vraag 1 (A(1;2), B(4;2), C(4;5)):",
            parts: [
              { label: "a)", text: "Draai die driehoek 90° antikloksgewys om die oorsprong. Skryf al die nuwe koördinate neer.", marks: 3 },
              { label: "b)", text: "Draai die oorspronklike driehoek 180° om die oorsprong.", marks: 3 },
              { label: "c)", text: "Vergroot die oorspronklike driehoek vanaf die oorsprong met skaalfaktor 2. Skryf die nuwe koördinate neer.", marks: 3 },
              { label: "d)", text: "Wat is die oppervlakte van die oorspronklike driehoek? Wat is die oppervlakte na die vergroting in (c)?", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 16, chapterName: "Hoofstuk 16 — Transformasiemeetkunde",
    topics: [
      {
        name: "Translasies en Spieëlings",
        answers: [
          { num: "Q1a", ans: "A'(-2;-2), B'(1;-2), C'(1;1)", note: "-3 by x, -4 by y" },
          { num: "Q1b", ans: "A'(1;-2), B'(4;-2), C'(4;-5)", note: "y-koördinate genegeer" },
          { num: "Q1c", ans: "A'(-1;2), B'(-4;2), C'(-4;5)", note: "x-koördinate genegeer" },
        ]
      },
      {
        name: "Rotasies en Vergrotings",
        answers: [
          { num: "Q2a", ans: "A'(-2;1), B'(-2;4), C'(-5;4)", note: "(x;y)→(-y;x): A:(-2;1), B:(-2;4), C:(-5;4)" },
          { num: "Q2b", ans: "A'(-1;-2), B'(-4;-2), C'(-4;-5)", note: "negeer albei koördinate" },
          { num: "Q2c", ans: "A'(2;4), B'(8;4), C'(8;10)", note: "vermenigvuldig alle koördinate met 2" },
          { num: "Q2d", ans: "Oorspronklik: 4,5 cm²; vergroot: 18 cm²", note: "basis=3, hoogte=3: A=½×3×3=4,5; vergroot met k²=4: 4×4,5=18" },
        ]
      },
    ]
  }
});
