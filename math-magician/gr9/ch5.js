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
              <span class="math">Tₙ = a + (n-1)d</span> where a = first term, d = common difference.<br><br>
              <strong>Finding d:</strong> d = T2 - T1 = T3 - T2<br>
              <strong>Finding the term:</strong> substitute n into Tₙ formula.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>Sequence: 5, 8, 11, 14, … → d = 3, a = 5</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Tₙ = 5 + (n-1)(3) = 5 + 3n - 3 = 3n + 2</span></div>
            <div class="example-step"><span class="step-num">3</span><span>T10 = 3(10) + 2 = 32. Check: 5, 8, 11, 14, 17, 20, 23, 26, 29, 32 ✓</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Is 50 a term? 3n + 2 = 50 → n = 16. Yes, T16 = 50.</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Is 51 a term? 3n + 2 = 51 → n = 16,33. No (not a natural number).</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In many matchstick patterns, each new shape adds d matches. Look for what is added each time, not just the total.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Linear Sequence Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter first term and common difference. See the sequence, general term, and any T&#8345;.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">First term (a)</label><input id="seqA" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Common diff (d)</label><input id="seqD" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">n =</label><input id="seqN" type="number" value="10" min="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
            </div>
            <div id="seqOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('seqA').value)||0;
              const d=parseFloat(document.getElementById('seqD').value)||0;
              const n=parseInt(document.getElementById('seqN').value)||1;
              const terms=Array.from({length:8},function(_,i){return a+i*d;});
              const tn=a+(n-1)*d;
              const c=a-d;
              const genStr=d===0?String(a):d+'n'+(c>0?' + '+c:c<0?' \u2212 '+Math.abs(c):'');
              document.getElementById('seqOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:130px;display:inline-block;">First 8 terms:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', \u2026</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:130px;display:inline-block;">General term:</span><span style="color:#fbbf24;">T\u2099 = '+genStr+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:130px;display:inline-block;">T<sub>'+n+'</sub>:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+tn+'</span></div>',
              ].join('');
            }
            ['seqA','seqD','seqN'].forEach(function(id){document.getElementById(id).addEventListener('input',update);});
            update();
          })();
          </script>
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
              var genStr=(d===0?String(a):(d===1?'n':(d>0?d+'n':'-'+Math.abs(d)+'n')))+(c>0?' + '+c:c<0?' - '+Math.abs(c):'');
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
        `
      },
      questions: [
        { type: "mc", text: "Triangles are made with matchsticks: 1 triangle = 3, 2 = 5, 3 = 7. The general term is:", options: ["Tₙ = 3n", "Tₙ = 2n + 1", "Tₙ = n + 2", "Tₙ = 2n - 1"], answer: 1, topic: "Patterns" },
        { type: "input", text: "Using the triangle matchstick pattern Tₙ = 2n + 1, how many matches for 20 triangles?", answer: "41", topic: "Patterns" },
        { type: "mc", text: "A pattern of squares uses tiles: 1 square = 1, 2 in a row = 4, 3 = 9. This is:", options: ["Arithmetic", "Geometric (multiplication)", "Square numbers", "Fibonacci"], answer: 2, topic: "Patterns" },
        { type: "input", text: "For a dot pattern where Tₙ = n² + 1, find T6.", answer: "37", topic: "Patterns" },
        { type: "mc", text: "Pattern positions show 4, 9, 16, 25 dots. What is T10?", options: ["100", "101", "121", "36"], answer: 2, topic: "Patterns" },
        { type: "input", text: "A sequence has general term Tₙ = 3n² - 2. For which value of n is Tₙ = 73?", answer: "5", topic: "Patterns" },
        { type: "input", text: "Pattern A has general term Tₙ = 5n - 2. Pattern B has general term Tₙ = 3n + 8. For which value of n do the two patterns give equal terms?", answer: "5", topic: "Patterns" },
      ]
    },
    {
      id: 501,
      chapter: 5,
      name: "Geometric patterns",
      fullName: "Geometric patterns with a constant ratio",
      lesson: {
        heading: "Geometric patterns",
        sub: "Chapter 5 · Topic 2",
        body: `
<p>In a <strong>geometric pattern</strong> each term is the previous term <em>multiplied</em> by the same number, the <strong>constant ratio</strong> r. In a linear pattern you <em>add</em> the same number each time.</p>
<div class="def-box">
  <div class="def-box-title">📖 Finding the rule</div>
<p>Constant ratio: r = T₂ ÷ T₁ = T₃ ÷ T₂.<br>General term: <span class="math">Tₙ = a × rⁿ⁻¹</span>, where a is the first term.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: 3 ; 6 ; 12 ; 24 ; …</div>
  <div class="example-step"><span class="step-num">1</span><span>6 ÷ 3 = 2, 12 ÷ 6 = 2: the ratio is constant, r = 2, and a = 3.</span></div>
  <div class="example-step"><span class="step-num">2</span><span><span class="math">Tₙ = 3 × 2ⁿ⁻¹</span></span></div>
  <div class="example-step"><span class="step-num">3</span><span><span class="math">T₈ = 3 × 2⁷ = 3 × 128 = 384</span></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: a halving pattern</div>
  <div class="example-step"><span class="step-num">1</span><span>A ball is dropped from 64 cm. Each bounce reaches half the height of the one before: 64 ; 32 ; 16 ; …</span></div>
  <div class="example-step"><span class="step-num">2</span><span>r = 1/2, so the 5th height is 64 × (1/2)⁴ = 64 ÷ 16 = <strong>4 cm</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Check differences first. Constant difference: linear (Tₙ = dn + c). Constant ratio: geometric. Neither: look for squares, cubes or another rule.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Find the next term: 5 ; 15 ; 45 ; …", "answer": "135", "topic": "Geometric patterns"},
        {"type": "input", "text": "What is the constant ratio of 96 ; 48 ; 24 ; 12 ; …? Give a fraction or decimal.", "answer": "1/2", "altAnswers": ["0.5", "0,5"], "topic": "Geometric patterns"},
        {"type": "mc", "text": "Which pattern is geometric?", "options": ["2 ; 5 ; 8 ; 11", "1 ; 4 ; 9 ; 16", "2 ; 6 ; 18 ; 54", "10 ; 8 ; 6 ; 4"], "answer": 2, "topic": "Geometric patterns"},
        {"type": "input", "text": "Tₙ = 2 × 3ⁿ⁻¹. Calculate T₅.", "answer": "162", "topic": "Geometric patterns"},
        {"type": "mc", "text": "The general term of 4 ; 8 ; 16 ; 32 ; … is:", "options": ["Tₙ = 4n", "Tₙ = 4 × 2ⁿ⁻¹", "Tₙ = 2ⁿ", "Tₙ = 4n + 4"], "answer": 1, "topic": "Geometric patterns"},
        {"type": "input", "text": "A bacteria colony doubles every hour. It starts with 50 bacteria. How many are there after 6 hours?", "answer": "3200", "topic": "Geometric patterns"},
      ]
    },
    {
      id: 502,
      chapter: 5,
      name: "Patterns from pictures",
      fullName: "Describing patterns from pictures and tables with a general rule",
      lesson: {
        heading: "Patterns from pictures",
        sub: "Chapter 5 · Topic 3",
        body: `
<p>Many patterns are shown as pictures: matchsticks, tiles or dots. Count each picture, put the counts in a table, then find the rule.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":320,"h":110,"pad":16,"view":[-0.3,-1,9.3,1.3],"pts":{"b0_0":[0,0],"t0_0":[0,1],"b0_1":[1,0],"t0_1":[1,1],"b2.5_0":[2.5,0],"t2.5_0":[2.5,1],"b2.5_1":[3.5,0],"t2.5_1":[3.5,1],"b2.5_2":[4.5,0],"t2.5_2":[4.5,1],"b6.0_0":[6.0,0],"t6.0_0":[6.0,1],"b6.0_1":[7.0,0],"t6.0_1":[7.0,1],"b6.0_2":[8.0,0],"t6.0_2":[8.0,1],"b6.0_3":[9.0,0],"t6.0_3":[9.0,1]},"nolab":["b0_0","t0_0","b0_1","t0_1","b2.5_0","t2.5_0","b2.5_1","t2.5_1","b2.5_2","t2.5_2","b6.0_0","t6.0_0","b6.0_1","t6.0_1","b6.0_2","t6.0_2","b6.0_3","t6.0_3"],"seg":[["b0_0","t0_0","or"],["b0_1","t0_1","or"],["b0_0","b0_1","or"],["t0_0","t0_1","or"],["b2.5_0","t2.5_0","or"],["b2.5_1","t2.5_1","or"],["b2.5_2","t2.5_2","or"],["b2.5_0","b2.5_1","or"],["t2.5_0","t2.5_1","or"],["b2.5_1","b2.5_2","or"],["t2.5_1","t2.5_2","or"],["b6.0_0","t6.0_0","or"],["b6.0_1","t6.0_1","or"],["b6.0_2","t6.0_2","or"],["b6.0_3","t6.0_3","or"],["b6.0_0","b6.0_1","or"],["t6.0_0","t6.0_1","or"],["b6.0_1","b6.0_2","or"],["t6.0_1","t6.0_2","or"],["b6.0_2","b6.0_3","or"],["t6.0_2","t6.0_3","or"]],"txt":[[0.5,-0.7,"4","mu"],[3.5,-0.7,"7","mu"],[7.5,-0.7,"10","mu"]],"cap":"1, 2 and 3 squares need 4, 7 and 10 matches."}'></div>
<div class="math-block">Squares (n)   1   2   3   4
Matches (Tₙ)  4   7  10  13</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: find and use the rule</div>
  <div class="example-step"><span class="step-num">1</span><span>The difference is 3 each time, so Tₙ = 3n + c. With n = 1: 3 + c = 4, so c = 1.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Rule: <span class="math">Tₙ = 3n + 1</span>. It makes sense: each new square adds 3 matches to the first one.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Matches for 50 squares: T₅₀ = 3 × 50 + 1 = <strong>151</strong>.</span></div>
  <div class="example-step"><span class="step-num">4</span><span>Which picture uses 100 matches? 3n + 1 = 100, so 3n = 99 and <strong>n = 33</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>To find the position n of a given term, set the rule equal to the term and solve. If n is not a whole number, the term is not in the pattern.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Matchstick squares in a row use 4 ; 7 ; 10 ; … matches. How many matches are needed for 20 squares?", "answer": "61", "topic": "Patterns from pictures"},
        {"type": "mc", "text": "A tile pattern has 5 ; 9 ; 13 ; 17 ; … tiles. The rule is:", "options": ["Tₙ = 4n + 1", "Tₙ = 5n", "Tₙ = n + 4", "Tₙ = 4n + 5"], "answer": 0, "topic": "Patterns from pictures"},
        {"type": "input", "text": "Tₙ = 6n − 2. Which term (n) is equal to 100?", "answer": "17", "topic": "Patterns from pictures"},
        {"type": "mc", "text": "Is 75 a term of Tₙ = 4n − 1?", "options": ["Yes, n = 19", "Yes, n = 18,5", "No, n is not a whole number", "No, the pattern decreases"], "answer": 0, "topic": "Patterns from pictures"},
        {"type": "input", "text": "Dots form triangles: 1 ; 3 ; 6 ; 10 ; … What is the next term?", "answer": "15", "topic": "Patterns from pictures"},
        {"type": "input", "text": "A table: n = 1, 2, 3 gives y = 7, 12, 17. Find y when n = 10.", "answer": "52", "topic": "Patterns from pictures"},
      ]
    },
    {
      id: 503,
      chapter: 5,
      name: "Ch 5 Exam focus",
      fullName: "Exam practice: numeric and geometric patterns",
      lesson: {
        heading: "Ch 5 Exam focus",
        sub: "Chapter 5 · Topic 4",
        body: `
<p>These questions mix the whole chapter, the way a test does. First decide whether the pattern adds (linear) or multiplies (geometric).</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Write down the rule or formula you use, then substitute, then give the answer with units. Marks are given for each step.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Find T₁₀ of 2 ; 9 ; 16 ; 23 ; …", "answer": "65", "topic": "Ch 5 Exam focus"},
        {"type": "input", "text": "Find the next term: 1 ; −2 ; 4 ; −8 ; …", "answer": "16", "topic": "Ch 5 Exam focus"},
        {"type": "mc", "text": "The rule for 1 ; 4 ; 9 ; 16 ; … is:", "options": ["Tₙ = 3n + 1", "Tₙ = 4n", "Tₙ = n²", "Tₙ = 2ⁿ"], "answer": 2, "topic": "Ch 5 Exam focus"},
        {"type": "input", "text": "Tₙ = 50 − 3n. Calculate T₂₀.", "answer": "-10", "topic": "Ch 5 Exam focus"},
        {"type": "input", "text": "A geometric pattern has T₁ = 81 and r = 1/3. Calculate T₄.", "answer": "3", "topic": "Ch 5 Exam focus"},
        {"type": "input", "text": "Find the missing term: 7 ; 11 ; __ ; 19 ; 23", "answer": "15", "topic": "Ch 5 Exam focus"},
        { type: "input", text: "A matchstick pattern uses 5 matches for figure 1, 9 for figure 2 and 13 for figure 3. Lerato has 250 matches. What is the largest figure number she can build completely?", answer: "62", topic: "Ch 5 Exam focus" }
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
            text: "The general term of a sequence is Tₙ = 2n² - 1.",
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
      {
        "name": "Patterns from pictures",
        "questions": [
          {
            "num": "4",
            "text": "A pattern of tables and chairs: 1 table seats 4, 2 tables in a row seat 6, 3 tables seat 8.",
            "parts": [
              {
                "label": "a)",
                "text": "Write down the general rule for the number of chairs.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "How many chairs fit around 25 tables?",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "How many tables are needed for 60 people?",
                "marks": 2
              }
            ]
          }
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
          { num: "Q1b", ans: "Tₙ = 4n - 1", note: "a = 3, d = 4: Tₙ = 3 + (n-1)(4) = 4n - 1" },
          { num: "Q1c", ans: "99", note: "T25 = 4(25) - 1 = 99" },
          { num: "Q1d", ans: "Yes, T25 = 99", note: "4n - 1 = 99 → n = 25, which is a natural number" },
          { num: "Q2a", ans: "1, 7, 17, 31", note: "2(1)²-1=1; 2(4)-1=7; 2(9)-1=17; 2(16)-1=31" },
          { num: "Q2b", ans: "n = 4", note: "2n²-1=31 → 2n²=32 → n²=16 → n=4" },
        ]
      },
      {
        name: "Geometric Patterns",
        answers: [
          { num: "Q3a", ans: "Tₙ = 4n + 1", note: "a = 5, d = 4; Tₙ = 5 + (n-1)4 = 4n + 1" },
          { num: "Q3b", ans: "61 matchsticks", note: "T15 = 4(15) + 1 = 61" },
          { num: "Q3c", ans: "Yes — 20 pentagons: 4n+1 = 81 → n = 20", note: "n = 20, a natural number" },
        ]
      },
      {
        "name": "Patterns from pictures",
        "answers": [
          {
            "num": "Q4a",
            "ans": "Tₙ = 2n + 2",
            "note": "Difference 2; 2(1) + c = 4, c = 2"
          },
          {
            "num": "Q4b",
            "ans": "52 chairs",
            "note": "2 × 25 + 2"
          },
          {
            "num": "Q4c",
            "ans": "29 tables",
            "note": "2n + 2 = 60, n = 29"
          }
        ]
      },
    ]
  }
});
