// Math Magician — Graad 9, Hoofstuk 13 data (Afrikaans)
// Stelling van Pythagoras

MathMagician.registerChapter(13, {
  topics: [
    {
      id: 25,
      chapter: 13,
      name: "Stelling van Pythagoras",
      fullName: "Stelling van Pythagoras — sye bepaal",
      lesson: {
        heading: "Stelling van Pythagoras",
        sub: "Hoofstuk 13 · Onderwerp 1",
        body: `
          <p>Die <strong>stelling van Pythagoras</strong> sê dat in enige reghoekige driehoek die kwadraat van die skuinssy gelyk is aan die som van die kwadrate van die ander twee sye.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Die stelling</div>
            <p>
              In △ABC met regte hoek by C:<br>
              <span class="math">c² = a² + b²</span><br>
              waar c die skuinssy is (die sy teenoor die regte hoek).<br><br>
              <strong>Om die skuinssy te bepaal:</strong> <span class="math">c = √(a² + b²)</span><br>
              <strong>Om 'n korter sy te bepaal:</strong> <span class="math">a = √(c² - b²)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>a = 6, b = 8: c = √(36 + 64) = √100 = 10</span></div>
            <div class="example-step"><span class="step-num">2</span><span>c = 13, b = 5: a = √(169 - 25) = √144 = 12</span></div>
            <div class="example-step"><span class="step-num">3</span><span>a = 7, b = 11: c = √(49 + 121) = √170 ≈ 13,04</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Pythagoreïese drietalle: (3,4,5), (5,12,13), (8,15,17), (7,24,25) — memoriseer hierdie!</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Identifiseer altyd eers die skuinssy — dit is altyd teenoor die regte hoek en altyd die langste sy.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Pythagoras-oplosser</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Laat een veld leeg. Voer enige twee sye in en die derde word bereken.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Sy a</label><input id="pyA" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Sy b</label><input id="pyB" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Skuinssy c</label><input id="pyC" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="pyBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Los op</button>
            </div>
            <div id="pyOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function f(v){return Math.round(v*10000)/10000;}
            function solve(){
              var a=parseFloat(document.getElementById('pyA').value),b=parseFloat(document.getElementById('pyB').value),c=parseFloat(document.getElementById('pyC').value);
              var blanks=[isNaN(a),isNaN(b),isNaN(c)].filter(Boolean).length;
              var el=document.getElementById('pyOut');
              if(blanks!==1){el.innerHTML='<span style="color:#fca5a5;">Laat presies een veld leeg.</span>';return;}
              var res,step1,step2;
              if(isNaN(c)){res=Math.sqrt(a*a+b*b);step1='c\xb2 = '+a+'\xb2 + '+b+'\xb2 = '+(a*a+b*b);step2='c = √'+(a*a+b*b)+' = '+f(res);document.getElementById('pyC').value=f(res);}
              else if(isNaN(b)){res=Math.sqrt(c*c-a*a);step1='b\xb2 = '+c+'\xb2 − '+a+'\xb2 = '+(c*c-a*a);step2='b = √'+(c*c-a*a)+' = '+f(res);document.getElementById('pyB').value=f(res);}
              else{res=Math.sqrt(c*c-b*b);step1='a\xb2 = '+c+'\xb2 − '+b+'\xb2 = '+(c*c-b*b);step2='a = √'+(c*c-b*b)+' = '+f(res);document.getElementById('pyA').value=f(res);}
              el.innerHTML='<div style="color:rgba(221,225,240,0.60);">'+step1+'</div><div><strong style="color:#6ee7b7;">'+step2+'</strong></div>';
            }
            document.getElementById('pyBtn').addEventListener('click',solve);
            ['pyA','pyB','pyC'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')solve();});});
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "In 'n reghoekige driehoek is die bene 9 cm en 12 cm. Bepaal die skuinssy.", answer: "15", topic: "Pythagoras" },
        { type: "mc", text: "Die skuinssy is 17 cm en een been is 8 cm. Die ander been is:", options: ["9 cm", "15 cm", "√225 = 15 cm", "√353 cm"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "Bereken: √(5² + 12²)", answer: "13", topic: "Pythagoras" },
        { type: "mc", text: "Is 'n driehoek met sye 9, 40, 41 'n reghoekige driehoek?", options: ["Ja", "Nee", "Kan nie bepaal word nie", "Slegs as die hoeke gegee word"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "'n Leer van 10 m lank leun teen 'n muur. Die voet is 6 m van die muur af. Hoe hoog teen die muur reik dit?", answer: "8", topic: "Pythagoras" },
        { type: "input", text: "'n Reghoekige driehoek het bene in die verhouding 5:12. As die skuinssy 39 cm is, bepaal die omtrek van die driehoek (in cm).", answer: "90", topic: "Pythagoras" },
      ]
    },
    {
      id: 26,
      chapter: 13,
      name: "Toepassings van Pythagoras",
      fullName: "Toepassings van die stelling van Pythagoras",
      lesson: {
        heading: "Toepassings van die stelling van Pythagoras",
        sub: "Hoofstuk 13 · Onderwerp 2",
        body: `
          <p>Die stelling van Pythagoras is van toepassing in baie werklike-lewe-kontekste en in meer komplekse meetkundige probleme.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Algemene toepassings</div>
            <p>
              <strong>Diagonaal van 'n reghoek:</strong> d = √(l² + b²)<br>
              <strong>Hoogte van 'n gelykbenige driehoek:</strong> verdeel in twee reghoekige driehoeke<br>
              <strong>Afstand tussen twee punte:</strong> d = √[(x2-x1)² + (y2-y1)²]<br>
              <strong>Omgekeerde (toets vir regte hoek):</strong> as a² + b² = c², is die driehoek reghoekig.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Diagonaal van 'n reghoek 5 cm × 12 cm: d = √(25 + 144) = √169 = 13 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Gelykbenige driehoek: basis = 16 cm, gelyke sye = 10 cm. Hoogte: h = √(10² - 8²) = √(100 - 64) = √36 = 6 cm</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Afstand: A(1;2) na B(4;6): d = √(9+16) = √25 = 5 eenhede</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>By probleme oor gelykbenige driehoeke halveer die hoogtelyn vanaf die apeks die basis en skep twee identiese reghoekige driehoeke.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Pythagoras-oplosser</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Laat een veld leeg. Voer enige twee sye in en die derde word bereken.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Sy a</label><input id="pyA2" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Sy b</label><input id="pyB2" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Skuinssy c</label><input id="pyC2" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="pyBtn2" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Los op</button>
            </div>
            <div id="pyOut2" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function f(v){return Math.round(v*10000)/10000;}
            function solve(){
              var a=parseFloat(document.getElementById('pyA2').value),b=parseFloat(document.getElementById('pyB2').value),c=parseFloat(document.getElementById('pyC2').value);
              var blanks=[isNaN(a),isNaN(b),isNaN(c)].filter(Boolean).length;
              var el=document.getElementById('pyOut2');
              if(blanks!==1){el.innerHTML='<span style="color:#fca5a5;">Laat presies een veld leeg.</span>';return;}
              var res,step1,step2;
              if(isNaN(c)){res=Math.sqrt(a*a+b*b);step1='c\xb2 = '+a+'\xb2 + '+b+'\xb2 = '+(a*a+b*b);step2='c = √'+(a*a+b*b)+' = '+f(res);document.getElementById('pyC2').value=f(res);}
              else if(isNaN(b)){res=Math.sqrt(c*c-a*a);step1='b\xb2 = '+c+'\xb2 − '+a+'\xb2 = '+(c*c-a*a);step2='b = √'+(c*c-a*a)+' = '+f(res);document.getElementById('pyB2').value=f(res);}
              else{res=Math.sqrt(c*c-b*b);step1='a\xb2 = '+c+'\xb2 − '+b+'\xb2 = '+(c*c-b*b);step2='a = √'+(c*c-b*b)+' = '+f(res);document.getElementById('pyA2').value=f(res);}
              el.innerHTML='<div style="color:rgba(221,225,240,0.60);">'+step1+'</div><div><strong style="color:#6ee7b7;">'+step2+'</strong></div>';
            }
            document.getElementById('pyBtn2').addEventListener('click',solve);
            ['pyA2','pyB2','pyC2'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')solve();});});
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Bepaal die diagonaal van 'n reghoek met lengte 24 cm en breedte 7 cm.", answer: "25", topic: "Pythagoras" },
        { type: "mc", text: "'n Gelykbenige driehoek het gelyke sye van 13 cm en 'n basis van 10 cm. Sy hoogte is:", options: ["12 cm", "8 cm", "10 cm", "√119 cm"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "Bepaal die afstand tussen die punte (0;0) en (3;4).", answer: "5", topic: "Pythagoras" },
        { type: "mc", text: "'n Driehoek het sye 7, 24, 25. Is dit reghoekig?", options: ["Ja, 7²+24²=625=25²", "Nee", "Ja, 7+24=25", "Kan nie sê nie"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "'n Vierkant het 'n diagonaal van 10√2 cm. Bepaal die sylengte van die vierkant.", answer: "10", topic: "Pythagoras" },
        { type: "input", text: "'n Reghoekige veld is 21 m by 20 m. Hoeveel meter minder loop 'n boer deur diagonaal oor die veld te sny, in vergelyking met langs die twee kante te loop?", answer: "12", topic: "Pythagoras" },
      ]
    },
  ],
  workbook: {
    chapter: 13, chapterName: "Stelling van Pythagoras",
    topics: [
      {
        name: "Pythagoras — Sye Bepaal",
        questions: [
          {
            num: "1",
            text: "Bereken die onbekende sy in elke reghoekige driehoek (laat wortelvorme in wortelvorm waar die antwoord nie presies is nie):",
            parts: [
              { label: "a)", text: "Bene: 15 cm en 20 cm. Bepaal die skuinssy.", marks: 3 },
              { label: "b)", text: "Skuinssy: 26 cm, een been: 10 cm. Bepaal die ander been.", marks: 3 },
              { label: "c)", text: "Bene: 7 cm en 9 cm. Bepaal die skuinssy (laat in wortelvorm).", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Toepassings",
        questions: [
          {
            num: "2",
            text: "'n Reghoekige tuin is 30 m lank en 16 m breed. 'n Paadjie loop diagonaal daaroor.",
            parts: [
              { label: "a)", text: "Bereken die lengte van die diagonale paadjie.", marks: 3 },
              { label: "b)", text: "'n Hekpaal word by die middelpunt van die diagonaal geplaas. Hoe ver is dit van elke hoek van die reghoek af?", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "'n Gelyksydige driehoek het sylengte 12 cm.",
            parts: [
              { label: "a)", text: "Bepaal die hoogte van die driehoek deur die stelling van Pythagoras te gebruik.", marks: 4 },
              { label: "b)", text: "Bepaal dus die oppervlakte van die driehoek.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 13, chapterName: "Hoofstuk 13 — Stelling van Pythagoras",
    topics: [
      {
        name: "Pythagoras — Sye Bepaal",
        answers: [
          { num: "Q1a", ans: "25 cm", note: "√(225+400) = √625 = 25" },
          { num: "Q1b", ans: "24 cm", note: "√(676-100) = √576 = 24" },
          { num: "Q1c", ans: "√130 cm ≈ 11,4 cm", note: "√(49+81) = √130" },
        ]
      },
      {
        name: "Toepassings",
        answers: [
          { num: "Q2a", ans: "34 m", note: "√(900+256) = √1156 = 34" },
          { num: "Q2b", ans: "17 m", note: "Helfte van 34 m" },
          { num: "Q3a", ans: "6√3 ≈ 10,39 cm", note: "h = √(12² - 6²) = √(144-36) = √108 = 6√3" },
          { num: "Q3b", ans: "36√3 ≈ 62,35 cm²", note: "A = ½ × 12 × 6√3 = 36√3" },
        ]
      },
    ]
  }
});
