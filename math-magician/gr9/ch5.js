// Math Magician — Grade 9, Chapter 5 data
// Numeric and Geometric Patterns

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 9,
      chapter: 5,
      name: "Numeric patterns",
      fullName: "Numeric patterns — sequences and general term",
      lesson: {
        heading: "Numeric patterns and the general term",
        sub: "Chapter 5 · Topic 1",
        body: `
          <p>A <strong>sequence</strong> is an ordered list of numbers. In Grade 9 we find the <strong>general term (Tₙ)</strong> — a formula giving any term from its position number n.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Arithmetic sequence</div>
            <p>
              Each term is obtained by adding a constant <strong>common difference (d)</strong>.<br>
              <span class="math">Tₙ = a + (n−1)d</span> where a = first term, d = common difference.<br><br>
              <strong>Finding d:</strong> d = T₂ − T₁ = T₃ − T₂<br>
              <strong>Finding the term:</strong> substitute n into Tₙ formula.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>Sequence: 5, 8, 11, 14, … → d = 3, a = 5</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Tₙ = 5 + (n−1)(3) = 5 + 3n − 3 = 3n + 2</span></div>
            <div class="example-step"><span class="step-num">3</span><span>T₁₀ = 3(10) + 2 = 32. Check: 5, 8, 11, 14, 17, 20, 23, 26, 29, 32 ✓</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Is 50 a term? 3n + 2 = 50 → n = 16. Yes, T₁₆ = 50.</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Is 51 a term? 3n + 2 = 51 → n = 16,33. No (not a natural number).</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In many matchstick patterns, each new shape adds d matches. Look for what is added each time, not just the total.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Geometric Pattern Builder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Set the starting count and how many elements are added per step. See the visual pattern and formula grow.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Start (a)</label><input id="gpA" type="number" value="4" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Add per step (d)</label><input id="gpD" type="number" value="3" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Show positions</label><input id="gpSteps" type="number" value="5" min="1" max="8" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
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
              var genStr=(d===0?String(a):(d===1?'n':(d>0?d+'n':'−'+Math.abs(d)+'n')))+(c>0?' + '+c:c<0?' − '+Math.abs(c):'');
              document.getElementById('gpOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:140px;display:inline-block;">Sequence:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', …</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:140px;display:inline-block;">General term Tₙ:</span><span style="color:#fbbf24;font-weight:700;">'+genStr+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:140px;display:inline-block;">T<sub>20</sub>:</span><span style="color:#6ee7b7;font-weight:700;">'+(a+19*d)+'</span></div>',
              ].join('');
            }
            ['gpA','gpD','gpSteps'].forEach(function(id){document.getElementById(id).addEventListener('input',update);});
            update();
          })();
          </script>
        what is added each time, not just the total.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Triangles are made with matchsticks: 1 triangle = 3, 2 = 5, 3 = 7. The general term is:", options: ["Tₙ = 3n", "Tₙ = 2n + 1", "Tₙ = n + 2", "Tₙ = 2n − 1"], answer: 1, topic: "Patterns" },
        { type: "input", text: "Using the triangle matchstick pattern Tₙ = 2n + 1, how many matches for 20 triangles?", answer: "41", topic: "Patterns" },
        { type: "mc", text: "A pattern of squares uses tiles: 1 square = 1, 2 in a row = 4, 3 = 9. This is:", options: ["Arithmetic", "Geometric (multiplication)", "Square numbers", "Fibonacci"], answer: 2, topic: "Patterns" },
        { type: "input", text: "For a dot pattern where Tₙ = n² + 1, find T₆.", answer: "37", topic: "Patterns" },
        { type: "mc", text: "Pattern positions show 4, 9, 16, 25 dots. What is T₁₀?", options: ["100", "101", "121", "36"], answer: 2, topic: "Patterns" },
      ]
    },
  ],
  workbook: {
    chapter: 5, chapterName: "Numeric and Geometric Patterns",
    topics: [
      {
        name: "Numeric Patterns",
        questions: [
          {
            num: "1",
            text: "Consider the sequence: 3, 7, 11, 15, …",
            parts: [
              { label: "a)", text: "Write down the next two terms.", marks: 2 },
              { label: "b)", text: "Determine the general term Tₙ.", marks: 3 },
              { label: "c)", text: "Calculate the 25th term.", marks: 2 },
              { label: "d)", text: "Determine whether 99 is a term. Show all working.", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "The general term of a sequence is Tₙ = 2n² − 1.",
            parts: [
              { label: "a)", text: "Write down the first 4 terms.", marks: 2 },
              { label: "b)", text: "Find the value of n for which Tₙ = 31.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Geometric Patterns",
        questions: [
          {
            num: "3",
            text: "Pentagons are drawn using matchsticks in a row (sharing sides): 1 pentagon = 5, 2 pentagons = 9, 3 = 13.",
            parts: [
              { label: "a)", text: "Write down the general term for the number of matchsticks.", marks: 3 },
              { label: "b)", text: "How many matchsticks are needed for 15 pentagons?", marks: 2 },
              { label: "c)", text: "Can exactly 81 matchsticks make a complete row of pentagons?", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 5, chapterName: "Chapter 5 — Numeric and Geometric Patterns",
    topics: [
      {
        name: "Numeric Patterns",
        answers: [
          { num: "Q1a", ans: "19 and 23", note: "d = 4" },
          { num: "Q1b", ans: "Tₙ = 4n − 1", note: "a = 3, d = 4: Tₙ = 3 + (n−1)(4) = 4n − 1" },
          { num: "Q1c", ans: "99", note: "T₂₅ = 4(25) − 1 = 99" },
          { num: "Q1d", ans: "Yes, T₂₅ = 99", note: "4n − 1 = 99 → n = 25, which is a natural number" },
          { num: "Q2a", ans: "1, 7, 17, 31", note: "2(1)²−1=1; 2(4)−1=7; 2(9)−1=17; 2(16)−1=31" },
          { num: "Q2b", ans: "n = 4", note: "2n²−1=31 → 2n²=32 → n²=16 → n=4" },
        ]
      },
      {
        name: "Geometric Patterns",
        answers: [
          { num: "Q3a", ans: "Tₙ = 4n + 1", note: "a = 5, d = 4; Tₙ = 5 + (n−1)4 = 4n + 1" },
          { num: "Q3b", ans: "61 matchsticks", note: "T₁₅ = 4(15) + 1 = 61" },
          { num: "Q3c", ans: "Yes — 20 pentagons: 4n+1 = 81 → n = 20", note: "n = 20, a natural number" },
        ]
      },
    ]
  }
});
