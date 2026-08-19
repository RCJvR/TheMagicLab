// Math Magician — Grade 8, Chapter 18 data (Afrikaans)
// Transformasiemeetkunde

MathMagician.registerChapter(18, {
  topics: [
    {
      id: 1801,
      chapter: 18,
      name: "Translasies en spieëlings",
      fullName: "Translasies en spieëlings op 'n rooster",
      lesson: {
        heading: "Translasies en spieëlings",
        sub: "Hoofstuk 18 · Onderwerp 1",
        body: `
          <p>'n <strong>Transformasie</strong> skuif 'n vorm na 'n nuwe posisie. Die oorspronklike vorm word die <strong>voorwerp</strong> genoem en die verskuifde vorm is die <strong>beeld</strong>. In hierdie hoofstuk kyk ons na vier transformasies: translasies, spieëlings, rotasies en vergrotings.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Translasie</div>
            <p>
              'n <strong>Translasie</strong> skuif 'n vorm in 'n reguit rigting — links/regs en/of op/af — sonder om dit te draai of om te flip.<br><br>
              Ons beskryf 'n translasie in woorde, bv. <em>"3 eenhede regs en 2 eenhede af"</em>, of op die Cartesiese vlak deur koördinate te gebruik:<br>
              <span class="math">(x ; y) → (x + a ; y + b)</span><br>
              waar <strong>a</strong> die horisontale skuif is (+ = regs, − = links) en <strong>b</strong> die vertikale skuif is (+ = op, − = af).<br><br>
              'n Translasie hou die vorm, grootte en oriëntasie presies dieselfde — slegs die posisie verander.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Spieëling</div>
            <p>
              'n <strong>Spieëling</strong> flip 'n vorm oor 'n <strong>spieëllyn</strong> (ook 'n simmetrielyn genoem). Die beeld is 'n spieëlbeeld van die voorwerp — dieselfde afstand van die lyn, aan die teenoorgestelde kant.<br><br>
              <strong>Spieëling in die x-as:</strong> <span class="math">(x ; y) → (x ; −y)</span><br>
              <strong>Spieëling in die y-as:</strong> <span class="math">(x ; y) → (−x ; y)</span><br><br>
              'n Spieëling hou die vorm en grootte dieselfde, maar die oriëntasie word "omgedraai" (soos 'n spieël).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Punt A(2 ; 3) word 4 eenhede links en 1 eenheid af getransleer. Nuwe punt: <span class="math">(2 − 4 ; 3 − 1) = (−2 ; 2)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Punt B(5 ; 1) word in die x-as gespieël: <span class="math">(5 ; 1) → (5 ; −1)</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Punt C(−3 ; 4) word in die y-as gespieël: <span class="math">(−3 ; 4) → (3 ; 4)</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vinnige toets: na 'n translasie of spieëling is die beeld altyd <strong>kongruent</strong> (dieselfde grootte en vorm) aan die voorwerp — slegs die posisie of oriëntasie verander.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Translasie- en spieëlingverkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer 'n punt in, kies 'n transformasie, en kyk hoe die beeld op die rooster verskyn.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);">Transformasie</label>
                <select id="g8tfType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="trans">Transleer met (a ; b)</option>
                  <option value="refX">Spieël in x-as</option>
                  <option value="refY">Spieël in y-as</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Punt x</label><input id="g8tfX" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Punt y</label><input id="g8tfY" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div id="g8tfABdiv" style="display:flex;gap:8px;">
                <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a</label><input id="g8tfA" type="number" value="-3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
                <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">b</label><input id="g8tfB" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              </div>
            </div>
            <svg id="g8tfSvg" viewBox="0 0 240 240" style="width:240px;height:240px;border-radius:8px;background:rgba(10,15,30,0.60);margin-bottom:10px;"></svg>
            <div id="g8tfOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function setType(){var t=document.getElementById('g8tfType').value;document.getElementById('g8tfABdiv').style.display=(t==='trans')?'flex':'none';}
            document.getElementById('g8tfType').addEventListener('change',function(){setType();transform();});
            function transform(){
              var t=document.getElementById('g8tfType').value;
              var x=parseFloat(document.getElementById('g8tfX').value)||0;
              var y=parseFloat(document.getElementById('g8tfY').value)||0;
              var a=parseFloat(document.getElementById('g8tfA').value)||0;
              var b=parseFloat(document.getElementById('g8tfB').value)||0;
              var ix,iy,rule,label;
              if(t==='trans'){ix=x+a;iy=y+b;rule='(x ; y) → (x'+(a>=0?'+':'')+a+' ; y'+(b>=0?'+':'')+b+')';label='Translasie met ('+a+' ; '+b+')';}
              else if(t==='refX'){ix=x;iy=-y;rule='(x ; y) → (x ; -y)';label='Spieëling in die x-as';}
              else{ix=-x;iy=y;rule='(x ; y) → (-x ; y)';label='Spieëling in die y-as';}
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
              grid+='<text x="'+(px2+8)+'" y="'+(py2-6)+'" font-size="9" fill="#6ee7b7" font-family="JetBrains Mono,monospace">P&#39;('+ix+';'+iy+')</text>';
              document.getElementById('g8tfSvg').innerHTML=grid;
              document.getElementById('g8tfOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Transformasie: </span><span style="color:#fbbf24;">'+label+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Reël: </span><span style="color:#a5b4fc;">'+rule+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Oorspronklik: </span><span style="color:#fbbf24;font-weight:700;">P('+x+'; '+y+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Beeld: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">P&#39;('+ix+'; '+iy+')</span></div>',
              ].join('');
            }
            ['g8tfType','g8tfX','g8tfY','g8tfA','g8tfB'].forEach(function(id){
              var el=document.getElementById(id);
              el.addEventListener('input',transform);el.addEventListener('change',transform);
            });
            setType();transform();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "'n Vorm word 4 eenhede regs en 3 eenhede op getransleer. Wat beskryf hierdie transformasie die beste?", options: ["'n Skuif", "'n Flip", "'n Draai", "'n Grootteverandering"], answer: 0, topic: "Transformasies" },
        { type: "input", text: "Punt A(2 ; 5) word 3 eenhede links en 2 eenhede af getransleer. Wat is die x-koördinaat van die beeld?", answer: "-1", topic: "Transformasies" },
        { type: "mc", text: "Punt (4 ; -3) word in die x-as gespieël. Die beeld is:", options: ["(-4 ; -3)", "(4 ; 3)", "(-4 ; 3)", "(4 ; -3)"], answer: 1, topic: "Transformasies" },
        { type: "mc", text: "Punt (-2 ; 6) word in die y-as gespieël. Die beeld is:", options: ["(2 ; 6)", "(-2 ; -6)", "(2 ; -6)", "(6 ; -2)"], answer: 0, topic: "Transformasies" },
        { type: "mc", text: "Na 'n translasie, watter eienskappe van 'n vorm bly presies dieselfde?", options: ["Slegs die grootte", "Vorm, grootte EN oriëntasie", "Slegs die oriëntasie", "Niks bly dieselfde nie"], answer: 1, topic: "Transformasies" },
        { type: "input", text: "Punt A word 5 eenhede regs en 3 eenhede af getransleer, wat beeld A'(7 ; -1) gee. Bereken die y-koördinaat van die oorspronklike punt A.", answer: "2", topic: "Transformasies" },
        { type: "input", text: "Punt P(-2 ; 3) word eers in die x-as gespieël, en dan 4 eenhede regs en 1 eenheid op getransleer. Wat is die finale koördinate? (skryf as x,y)", answer: "2,-2", topic: "Transformasies" },
      ]
    },
    {
      id: 1802,
      chapter: 18,
      name: "Rotasies en vergrotings",
      fullName: "'n Inleiding tot rotasies en vergrotings",
      lesson: {
        heading: "Rotasies en vergrotings",
        sub: "Hoofstuk 18 · Onderwerp 2",
        body: `
          <p>Twee verdere transformasies om te ken is <strong>rotasies</strong> (om 'n vorm om 'n vaste punt te draai) en <strong>vergrotings</strong> (om 'n vorm groter of kleiner te maak).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rotasie</div>
            <p>
              'n <strong>Rotasie</strong> draai 'n vorm om 'n vaste punt genaamd die <strong>draaipunt</strong> (rotasiesentrum), deur 'n gegewe hoek (bv. 90° of 180°) in 'n gegewe rigting (kloksgewys of antikloksgewys).<br><br>
              'n Rotasie hou die vorm en grootte dieselfde, maar die vorm eindig in 'n ander rigting.<br><br>
              <strong>Uitbreiding (koördinaatreël om die oorsprong):</strong><br>
              90° antikloksgewys: <span class="math">(x ; y) → (−y ; x)</span><br>
              180°: <span class="math">(x ; y) → (−x ; −y)</span>
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Vergroting</div>
            <p>
              'n <strong>Vergroting</strong> maak 'n vorm groter of kleiner met 'n <strong>skaalfaktor</strong>, deur 'n vaste punt te gebruik (die vergrotingsentrum). Elke lengte op die beeld is die lengte op die voorwerp vermenigvuldig met die skaalfaktor.<br><br>
              As die skaalfaktor <strong>groter as 1</strong> is, word die vorm groter.<br>
              As die skaalfaktor <strong>tussen 0 en 1</strong> is, word die vorm kleiner (verkleining).<br><br>
              'n Vergroting hou die vorm dieselfde (alle hoeke gelyk) maar verander die grootte — die beeld en voorwerp is <strong>eenders</strong> (gelykvormig), nie kongruent nie.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>'n Vorm word 90° antikloksgewys om die oorsprong gedraai. Punt (3 ; 1) → <span class="math">(−1 ; 3)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>'n Reghoek 4 cm × 2 cm word met skaalfaktor 3 vergroot. Nuwe sye: <span class="math">4 × 3 = 12</span> cm en <span class="math">2 × 3 = 6</span> cm.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Handige onthou-truuk: <strong>Translasie</strong> = skuif, <strong>Spieëling</strong> = flip, <strong>Rotasie</strong> = draai, <strong>Vergroting</strong> = groottevernadering.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Rotasie- en vergrotingverkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer 'n punt in, kies draai of vergroot, en sien die beeldkoördinate.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">x</label><input id="g8rxX" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">y</label><input id="g8rxY" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Transformasie</label>
                <select id="g8rxType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="rot90a">Draai 90° antikloksgewys (om oorsprong)</option>
                  <option value="rot180">Draai 180° (om oorsprong)</option>
                  <option value="enlarge">Vergroot (skaalfaktor k, vanaf oorsprong)</option>
                </select>
              </div>
              <div id="g8rxKdiv" style="display:none;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">k</label><input id="g8rxK" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="g8rxBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Transformeer</button>
            </div>
            <div id="g8rxOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var rules={rot90a:'(x;y)→(−y;x)',rot180:'(x;y)→(−x;−y)',enlarge:'(x;y)→(kx;ky)'};
            function setK(){document.getElementById('g8rxKdiv').style.display=(document.getElementById('g8rxType').value==='enlarge')?'flex':'none';}
            document.getElementById('g8rxType').addEventListener('change',function(){setK();rx();});
            function rx(){
              var x=parseFloat(document.getElementById('g8rxX').value)||0,y=parseFloat(document.getElementById('g8rxY').value)||0;
              var t=document.getElementById('g8rxType').value,k=parseFloat(document.getElementById('g8rxK').value)||1;
              var ix,iy;
              if(t==='rot90a'){ix=-y;iy=x;}else if(t==='rot180'){ix=-x;iy=-y;}else{ix=k*x;iy=k*y;}
              document.getElementById('g8rxOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Voorwerp:</span><span style="color:#a5b4fc;"> ('+x+' ; '+y+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Reël:</span><span style="color:#fbbf24;"> '+rules[t].replace('k',k)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Beeld:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;"> ('+ix+' ; '+iy+')</span></div>',
              ].join('');
            }
            document.getElementById('g8rxBtn').addEventListener('click',rx);
            ['g8rxX','g8rxY','g8rxK'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')rx();});});
            setK();rx();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Om 'n vorm 90° antikloksgewys om die oorsprong te draai, verander punt (2 ; 5) na:", options: ["(-5 ; 2)", "(5 ; -2)", "(-2 ; -5)", "(5 ; 2)"], answer: 0, topic: "Transformasies" },
        { type: "mc", text: "Om punt (3 ; -4) 180° om die oorsprong te draai, gee:", options: ["(3 ; 4)", "(-3 ; 4)", "(-3 ; -4)", "(4 ; -3)"], answer: 1, topic: "Transformasies" },
        { type: "input", text: "'n Vorm met sylengte 5 cm word met skaalfaktor 4 vergroot. Wat is die nuwe sylengte in cm?", answer: "20", topic: "Transformasies" },
        { type: "mc", text: "'n Skaalfaktor van 0,5 sal 'n vorm:", options: ["Groter maak", "Kleiner maak", "Dieselfde grootte hou", "Onderstebo draai"], answer: 1, topic: "Transformasies" },
        { type: "mc", text: "Watter transformasie verander die GROOTTE van 'n vorm maar hou sy vorm (alle hoeke) dieselfde?", options: ["Translasie", "Spieëling", "Rotasie", "Vergroting"], answer: 3, topic: "Transformasies" },
        { type: "input", text: "'n Vorm word met skaalfaktor k vergroot. Sy oppervlakte styg van 12 cm² na 108 cm². Bepaal die skaalfaktor k wat vir die sylengtes gebruik is.", answer: "3", topic: "Transformasies" },
        { type: "input", text: "Punt B(4 ; -2) word eers 90° antikloksgewys om die oorsprong gedraai, en dan word die resulterende punt met skaalfaktor 3 vanaf die oorsprong vergroot. Bereken die finale koördinate. (skryf as x,y)", answer: "6,12", topic: "Transformasies" },
      ]
    },
  ],
  workbook: {
    chapter: 18, chapterName: "Transformasiemeetkunde",
    topics: [
      {
        name: "Translasies en Spieëlings",
        questions: [
          {
            num: "1",
            text: "Driehoek ABC het hoekpunte A(1 ; 1), B(4 ; 1) en C(4 ; 3).",
            parts: [
              { label: "a)", text: "Transleer die driehoek 2 eenhede links en 3 eenhede op. Skryf die koördinate van A', B' en C' neer.", marks: 3 },
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
            text: "Gebruik dieselfde driehoek ABC van Vraag 1 (A(1;1), B(4;1), C(4;3)):",
            parts: [
              { label: "a)", text: "Draai die driehoek 90° antikloksgewys om die oorsprong. Skryf al die nuwe koördinate neer.", marks: 3 },
              { label: "b)", text: "Draai die oorspronklike driehoek 180° om die oorsprong.", marks: 3 },
              { label: "c)", text: "Vergroot die oorspronklike driehoek vanaf die oorsprong met skaalfaktor 2. Skryf die nuwe koördinate neer.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 18, chapterName: "Hoofstuk 18 — Transformasiemeetkunde",
    topics: [
      {
        name: "Translasies en Spieëlings",
        answers: [
          { num: "Q1a", ans: "A'(-1;4), B'(2;4), C'(2;6)", note: "-2 by x, +3 by y" },
          { num: "Q1b", ans: "A'(1;-1), B'(4;-1), C'(4;-3)", note: "y-koördinate genegeer" },
          { num: "Q1c", ans: "A'(-1;1), B'(-4;1), C'(-4;3)", note: "x-koördinate genegeer" },
        ]
      },
      {
        name: "Rotasies en Vergrotings",
        answers: [
          { num: "Q2a", ans: "A'(-1;1), B'(-1;4), C'(-3;4)", note: "(x;y)→(-y;x)" },
          { num: "Q2b", ans: "A'(-1;-1), B'(-4;-1), C'(-4;-3)", note: "negeer albei koördinate" },
          { num: "Q2c", ans: "A'(2;2), B'(8;2), C'(8;6)", note: "vermenigvuldig alle koördinate met 2" },
        ]
      },
    ]
  }
});
