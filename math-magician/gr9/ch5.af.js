// Math Magician — Graad 9, Hoofstuk 5 data
// Numeriese en Meetkundige Patrone

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 9,
      chapter: 5,
      name: "Numeriese patrone",
      fullName: "Numeriese patrone — rye en die algemene term",
      lesson: {
        heading: "Numeriese patrone en die algemene term",
        sub: "Hoofstuk 5 · Onderwerp 1",
        body: `
          <p>'n <strong>Ry</strong> is 'n geordende lys getalle. In Graad 9 vind ons die <strong>algemene term (Tₙ)</strong> — 'n formule wat enige term gee vanaf sy posisienommer n.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rekenkundige ry</div>
            <p>
              Elke term word verkry deur 'n konstante <strong>gemeenskaplike verskil (d)</strong> by te tel.<br>
              <span class="math">Tₙ = a + (n-1)d</span> waar a = eerste term, d = konstante verskil.<br><br>
              <strong>Bepaling van d:</strong> d = T2 - T1 = T3 - T2<br>
              <strong>Bepaling van 'n term:</strong> vervang n in die Tₙ-formule.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>Ry: 5, 8, 11, 14, … → d = 3, a = 5</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Tₙ = 5 + (n-1)(3) = 5 + 3n - 3 = 3n + 2</span></div>
            <div class="example-step"><span class="step-num">3</span><span>T10 = 3(10) + 2 = 32. Kontroleer: 5, 8, 11, 14, 17, 20, 23, 26, 29, 32 ✓</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Is 50 'n term? 3n + 2 = 50 → n = 16. Ja, T16 = 50.</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Is 51 'n term? 3n + 2 = 51 → n = 16,33. Nee (nie 'n natuurlike getal nie).</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In baie vuurhoutjiepatrone voeg elke nuwe figuur d vuurhoutjies by. Kyk na
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Meetkundige Patroon-bouer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Stel die beginwaarde en hoeveel elemente per stap bygevoeg word. Sien die visuele patroon en formule groei.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Begin (a)</label><input id="gpA" type="number" value="4" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">By elke stap (d)</label><input id="gpD" type="number" value="3" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Wys posisies</label><input id="gpSteps" type="number" value="5" min="1" max="8" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
            </div>
            <svg id="gpSvg" viewBox="0 0 340 60" style="width:100%;max-width:340px;border-radius:8px;background:rgba(10,15,30,0.55);margin-bottom:10px;"></svg>
            <div id="gpOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              var a=parseInt(document.getElementById('gpA').value)||1;
              var d=parseInt(document.getElementById('gpD').value)||1;
              var steps=Math.min(parseInt(document.getElementById('gpSteps').value)||5,8);
              var terms=Array.from({length:steps},function(_,i){return a+i*d;});
              var svg=document.getElementById('gpSvg');
              var cols=steps,colW=340/cols,dotR=3,dotsPerRow=6;
              var svgH=60;svg.setAttribute('viewBox','0 0 340 '+svgH);
              var cells='';
              terms.forEach(function(count,idx){
                var cx=idx*colW+colW/2;
                // Draw dots to represent the count (max shown = 20 visually)
                var shown=Math.min(count,20);
                var rows=Math.ceil(shown/dotsPerRow);
                for(var i=0;i<shown;i++){
                  var col=i%dotsPerRow,row=Math.floor(i/dotsPerRow);
                  var dx=cx-(Math.min(shown,dotsPerRow)-1)*5/2+col*5;
                  var dy=svgH-10-row*8;
                  cells+='<circle cx="'+dx+'" cy="'+dy+'" r="'+dotR+'" fill="#6366f1" opacity="0.85"/>';
                }
                cells+='<text x="'+cx+'" y="12" text-anchor="middle" font-size="8" fill="rgba(245,158,11,0.80)" font-family="Syne,sans-serif" font-weight="700">n='+(idx+1)+'</text>';
                cells+='<text x="'+cx+'" y="22" text-anchor="middle" font-size="7" fill="rgba(221,225,240,0.50)" font-family="JetBrains Mono,monospace">'+count+'</text>';
              });
              svg.innerHTML=cells;
              var c=a-d;
              var genStr=(d===0?String(a):(d===1?'n':(d>0?d+'n':'-'+Math.abs(d)+'n')))+(c>0?' + '+c:c<0?' - '+Math.abs(c):'');
              document.getElementById('gpOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:140px;display:inline-block;">Ry:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', …</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:140px;display:inline-block;">Algemene term Tₙ:</span><span style="color:#fbbf24;font-weight:700;">'+genStr+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:140px;display:inline-block;">T<sub>20</sub>:</span><span style="color:#6ee7b7;font-weight:700;">'+(a+19*d)+'</span></div>',
              ].join('');
            }
            ['gpA','gpD','gpSteps'].forEach(function(id){document.getElementById(id).addEventListener('input',update);});
            update();
          })();
          </script>
        wat elke keer bygevoeg word, nie net na die totaal nie.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Driehoeke word met vuurhoutjies gebou: 1 driehoek = 3, 2 = 5, 3 = 7. Die algemene term is:", options: ["Tₙ = 3n", "Tₙ = 2n + 1", "Tₙ = n + 2", "Tₙ = 2n - 1"], answer: 1, topic: "Patrone" },
        { type: "input", text: "Deur die driehoek-vuurhoutjiepatroon Tₙ = 2n + 1 te gebruik, hoeveel vuurhoutjies word vir 20 driehoeke benodig?", answer: "41", topic: "Patrone" },
        { type: "mc", text: "'n Patroon van vierkante gebruik teëls: 1 vierkant = 1, 2 in 'n ry = 4, 3 = 9. Dit is:", options: ["Rekenkundig", "Meetkundig (vermenigvuldiging)", "Vierkantsgetalle", "Fibonacci"], answer: 2, topic: "Patrone" },
        { type: "input", text: "Vir 'n puntpatroon waar Tₙ = n² + 1, vind T6.", answer: "37", topic: "Patrone" },
        { type: "mc", text: "Patroonposisies toon 4, 9, 16, 25 kolletjies. Wat is T10?", options: ["100", "101", "121", "36"], answer: 2, topic: "Patrone" },
        { type: "input", text: "'n Ry het algemene term Tₙ = 3n² - 2. Vir watter waarde van n is Tₙ = 73?", answer: "5", topic: "Patrone" },
        { type: "input", text: "Patroon A het algemene term Tₙ = 5n - 2. Patroon B het algemene term Tₙ = 3n + 8. Vir watter waarde van n gee die twee patrone gelyke terme?", answer: "5", topic: "Patrone" },
      ]
    },
  ],
  workbook: {
    chapter: 5, chapterName: "Numeriese en Meetkundige Patrone",
    topics: [
      {
        name: "Numeriese Patrone",
        questions: [
          {
            num: "1",
            text: "Beskou die ry: 3, 7, 11, 15, …",
            parts: [
              { label: "a)", text: "Skryf die volgende twee terme neer.", marks: 2 },
              { label: "b)", text: "Bepaal die algemene term Tₙ.", marks: 3 },
              { label: "c)", text: "Bereken die 25ste term.", marks: 2 },
              { label: "d)", text: "Bepaal of 99 'n term is. Wys alle berekeninge.", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Die algemene term van 'n ry is Tₙ = 2n² - 1.",
            parts: [
              { label: "a)", text: "Skryf die eerste 4 terme neer.", marks: 2 },
              { label: "b)", text: "Vind die waarde van n waarvoor Tₙ = 31.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Meetkundige Patrone",
        questions: [
          {
            num: "3",
            text: "Vyfhoeke word met vuurhoutjies in 'n ry geteken (wat sye deel): 1 vyfhoek = 5, 2 vyfhoeke = 9, 3 = 13.",
            parts: [
              { label: "a)", text: "Skryf die algemene term vir die aantal vuurhoutjies neer.", marks: 3 },
              { label: "b)", text: "Hoeveel vuurhoutjies word vir 15 vyfhoeke benodig?", marks: 2 },
              { label: "c)", text: "Kan presies 81 vuurhoutjies 'n volledige ry vyfhoeke maak?", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 5, chapterName: "Hoofstuk 5 — Numeriese en Meetkundige Patrone",
    topics: [
      {
        name: "Numeriese Patrone",
        answers: [
          { num: "Q1a", ans: "19 en 23", note: "d = 4" },
          { num: "Q1b", ans: "Tₙ = 4n - 1", note: "a = 3, d = 4: Tₙ = 3 + (n-1)(4) = 4n - 1" },
          { num: "Q1c", ans: "99", note: "T25 = 4(25) - 1 = 99" },
          { num: "Q1d", ans: "Ja, T25 = 99", note: "4n - 1 = 99 → n = 25, wat 'n natuurlike getal is" },
          { num: "Q2a", ans: "1, 7, 17, 31", note: "2(1)²-1=1; 2(2)²-1=7; 2(3)²-1=17; 2(4)²-1=31" },
          { num: "Q2b", ans: "n = 4", note: "2n²-1=31 → 2n²=32 → n²=16 → n=4" },
        ]
      },
      {
        name: "Meetkundige Patrone",
        answers: [
          { num: "Q3a", ans: "Tₙ = 4n + 1", note: "a = 5, d = 4; Tₙ = 5 + (n-1)4 = 4n + 1" },
          { num: "Q3b", ans: "61 vuurhoutjies", note: "T15 = 4(15) + 1 = 61" },
          { num: "Q3c", ans: "Ja — 20 vyfhoeke: 4n+1 = 81 → n = 20", note: "n = 20, 'n natuurlike getal" },
        ]
      },
    ]
  }
});
