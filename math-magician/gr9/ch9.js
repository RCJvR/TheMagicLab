// Math Magician — Grade 9, Chapter 9 data
// Algebraic Equations

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 17,
      chapter: 9,
      name: "Linear equations",
      fullName: "Solving linear equations",
      lesson: {
        heading: "Solving linear equations",
        sub: "Chapter 9 · Topic 1",
        body: `
          <p>A <strong>linear equation</strong> has the variable to the power 1. We solve by performing the same operations on both sides to isolate the variable.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Steps for solving linear equations</div>
            <p>
              <strong>Step 1:</strong> Expand all brackets.<br>
              <strong>Step 2:</strong> Multiply by LCD to clear fractions (if any).<br>
              <strong>Step 3:</strong> Move all variable terms to one side.<br>
              <strong>Step 4:</strong> Combine like terms.<br>
              <strong>Step 5:</strong> Divide both sides by the coefficient.<br>
              <strong>Step 6:</strong> Verify by substituting back.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>3(x - 2) + 5 = 2x + 7 → 3x - 6 + 5 = 2x + 7 → x = 8</span></div>
            <div class="example-step"><span class="step-num">2</span><span>x/3 - 2/5 = 1 → multiply by 15 → 5x - 6 = 15 → x = 21/5</span></div>
            <div class="example-step"><span class="step-num">3</span><span>4(x + 1) = 2(2x - 3): 4x + 4 = 4x - 6 → 4 = -6 (no solution — contradiction)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always check your answer by substituting it back into the ORIGINAL equation. One number check can save your mark.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Linear Equation Solver</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Solve equations of the form ax + b = cx + d step by step. Enter the four coefficients.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a (LHS x-coef)</label><input id="leA" type="number" value="5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">b (LHS const)</label><input id="leB" type="number" value="-3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;padding-bottom:8px;">=</span>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">c (RHS x-coef)</label><input id="leC" type="number" value="2" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">d (RHS const)</label><input id="leD" type="number" value="9" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="leBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Solve</button>
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
                'Equation: <span style="color:#fbbf24;">'+lhs+' = '+rhs+'</span>',
                'Move x-terms left: <span style="color:#a5b4fc;">'+(a-c)+'x = '+d+' - ('+b+') = '+constVal+'</span>',
              ];
              var out=document.getElementById('leOut');
              if(xCoef===0){
                if(constVal===0){steps.push('<span style="color:#6ee7b7;">∞ solutions — identity (true for all x)</span>');}
                else{steps.push('<span style="color:#fca5a5;">No solution — contradiction</span>');}
              } else {
                var x=constVal/xCoef;
                steps.push('Divide both sides by '+(a-c)+': x = '+constVal+' ÷ '+(a-c)+' = <span style="color:#6ee7b7;font-size:16px;font-weight:700;">'+x+'</span>');
                var check=a*x+b,check2=c*x+d;
                steps.push('Check: '+a+'('+x+')+'+b+' = '+check+' and '+c+'('+x+')+'+d+' = '+check2+(Math.abs(check-check2)<1e-9?' ✓':'<span style="color:#fca5a5;"> ✗</span>'));
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
        { type: "input", text: "Solve: 5x - 3 = 2x + 9", answer: "4", topic: "Equations" },
        { type: "mc", text: "Solve: 3(x + 2) = 2(x - 1)", options: ["x = -8", "x = 8", "x = -4", "x = 4"], answer: 0, topic: "Equations" },
        { type: "input", text: "Solve: x/4 + 1 = 3. What is x?", answer: "8", topic: "Equations" },
        { type: "mc", text: "Which equation has no solution?", options: ["2x + 3 = 9", "4x + 5 = 5", "3(x+1) = 3x + 1", "2x = 6"], answer: 2, topic: "Equations" },
        { type: "input", text: "Solve: 2(3x - 1) - 4 = 5x + 1", answer: "7", topic: "Equations" },
        { type: "input", text: "Solve: (x + 1)/2 - (x - 2)/3 = 2", answer: "5", topic: "Equations" },
      ]
    },
    {
      id: 18,
      chapter: 9,
      name: "Quadratic equations",
      fullName: "Solving quadratic equations by factorisation",
      lesson: {
        heading: "Solving quadratic equations",
        sub: "Chapter 9 · Topic 2",
        body: `
          <p>A <strong>quadratic equation</strong> has degree 2: <span class="math">ax² + bx + c = 0</span>. We solve by factorising and applying the Zero Product Property.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Zero Product Property</div>
            <p>
              If <span class="math">A × B = 0</span>, then <span class="math">A = 0</span> OR <span class="math">B = 0</span>.<br><br>
              <strong>Method:</strong><br>
              1. Rearrange so the equation = 0.<br>
              2. Factorise the left-hand side.<br>
              3. Set each factor = 0 and solve.<br>
              4. Quadratic equations have TWO solutions (may be equal or non-real).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>x² - 7x + 12 = 0 → (x - 3)(x - 4) = 0 → x = 3 or x = 4</span></div>
            <div class="example-step"><span class="step-num">2</span><span>x² = 25 → x² - 25 = 0 → (x + 5)(x - 5) = 0 → x = ±5</span></div>
            <div class="example-step"><span class="step-num">3</span><span>2x² + 5x = 3 → 2x² + 5x - 3 = 0 → (2x - 1)(x + 3) = 0 → x = 1/2 or x = -3</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>NEVER divide both sides by x to solve x² = 3x. You lose the solution x = 0. Always set equal to 0 and factorise.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Quadratic Equation Solver</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Solve ax&#178; + bx + c = 0. See the discriminant, nature of roots, and solutions.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a</label><input id="qsa5" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">b</label><input id="qsb5" type="number" value="-5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">c</label><input id="qsc5" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="qsBtn5" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Solve</button>
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
              if(d>0){nature='Two real unequal roots';const sq=Math.sqrt(d);roots='x = '+f((-b+sq)/(2*a))+' or x = '+f((-b-sq)/(2*a));}
              else if(d===0){nature='Equal real roots';roots='x = '+f(-b/(2*a));}
              else{nature='No real roots';roots='Δ < 0';}
              document.getElementById('qsOut5').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:150px;display:inline-block;">Δ = '+b+'\xb2−4('+a+')('+c+'):</span><span style="color:#a5b4fc;">'+d+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:150px;display:inline-block;">Nature:</span><span style="color:#fbbf24;">'+nature+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:150px;display:inline-block;">Solution:</span><span style="color:#6ee7b7;font-weight:700;">'+roots+'</span></div>',
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
        { type: "mc", text: "Solve: x² - 9 = 0", options: ["x = 3", "x = 9", "x = ±3", "x = ±9"], answer: 2, topic: "Equations" },
        { type: "mc", text: "Solve: x² + 5x + 6 = 0", options: ["x = 2 or x = 3", "x = -2 or x = -3", "x = 1 or x = 6", "x = -1 or x = -6"], answer: 1, topic: "Equations" },
        { type: "input", text: "Solve x² - 4x = 0. What are the two solutions? (Give the non-zero solution)", answer: "4", topic: "Equations" },
        { type: "mc", text: "Solve: 2x² - 8 = 0", options: ["x = 4", "x = ±2", "x = 2", "x = ±4"], answer: 1, topic: "Equations" },
        { type: "input", text: "Solve x² - 2x - 15 = 0. What is the positive solution?", answer: "5", topic: "Equations" },
        { type: "input", text: "A rectangle has area 40 cm² and its length is 3 cm more than its width. Find the width (in cm).", answer: "5", topic: "Equations" },
        { type: "input", text: "The product of two consecutive positive even numbers is 288. Find the larger number.", answer: "18", topic: "Equations" }
      ]
    },
    {
      id: 901,
      chapter: 9,
      name: "Equations with brackets and fractions",
      fullName: "Solving linear equations with brackets and fractions",
      lesson: {
        heading: "Equations with brackets and fractions",
        sub: "Chapter 9 · Topic 3",
        body: `
<p>Before you solve, make the equation simpler: remove brackets, and multiply every term by the LCD to get rid of fractions.</p>
<div class="example-box">
  <div class="example-box-title">✏️ Example: brackets</div>
  <div class="example-step"><span class="step-num">1</span><span>3(x − 4) − 2(x + 1) = 5</span></div>
  <div class="example-step"><span class="step-num">2</span><span>3x − 12 − 2x − 2 = 5</span></div>
  <div class="example-step"><span class="step-num">3</span><span>x − 14 = 5, so <strong>x = 19</strong></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: fractions</div>
  <div class="example-step"><span class="step-num">1</span><span>x/3 + (x − 1)/4 = 5. The LCD of 3 and 4 is 12.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Multiply every term by 12: 4x + 3(x − 1) = 60</span></div>
  <div class="example-step"><span class="step-num">3</span><span>4x + 3x − 3 = 60, 7x = 63, <strong>x = 9</strong></span></div>
  <div class="example-step"><span class="step-num">4</span><span>Check: 9/3 + 8/4 = 3 + 2 = 5 ✓</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Multiply EVERY term by the LCD, including the terms with no fraction. Put a bracket around a numerator with two terms.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Solve for x: 2(x + 3) = 5x − 9", "answer": "5", "topic": "Equations with brackets and fractions"},
        {"type": "input", "text": "Solve for x: x/4 = 7", "answer": "28", "topic": "Equations with brackets and fractions"},
        {"type": "input", "text": "Solve for x: x/2 + x/3 = 10", "answer": "12", "topic": "Equations with brackets and fractions"},
        {"type": "input", "text": "Solve for x: (x − 2)/5 = (x + 1)/8", "answer": "7", "topic": "Equations with brackets and fractions"},
        {"type": "input", "text": "Solve for x: 4 − 3(2x − 1) = −5", "answer": "2", "topic": "Equations with brackets and fractions"},
        {"type": "input", "text": "Solve for x: (2x + 1)/3 − 1 = x/2", "answer": "4", "topic": "Equations with brackets and fractions"},
      ]
    },
    {
      id: 902,
      chapter: 9,
      name: "Word problems",
      fullName: "Setting up and solving equations from word problems",
      lesson: {
        heading: "Word problems",
        sub: "Chapter 9 · Topic 4",
        body: `
<p>To solve a word problem: choose a letter for the unknown, write everything else in terms of it, form an equation, solve it, and answer the question in words.</p>
<div class="example-box">
  <div class="example-box-title">✏️ Example: consecutive numbers</div>
  <div class="example-step"><span class="step-num">1</span><span>The sum of three consecutive numbers is 87. Find them.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Let the numbers be x, x + 1 and x + 2: x + x + 1 + x + 2 = 87</span></div>
  <div class="example-step"><span class="step-num">3</span><span>3x + 3 = 87, 3x = 84, x = 28. The numbers are <strong>28, 29 and 30</strong>.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: ages</div>
  <div class="example-step"><span class="step-num">1</span><span>A mother is three times as old as her son. In 12 years she will be twice as old. How old are they now?</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Son: x, mother: 3x. In 12 years: 3x + 12 = 2(x + 12)</span></div>
  <div class="example-step"><span class="step-num">3</span><span>3x + 12 = 2x + 24, x = 12. The son is <strong>12</strong> and the mother <strong>36</strong>.</span></div>
</div>
<div class="mf-fig" data-fig='{"t":"geo","w":260,"h":150,"view":[0,0,12,6],"pts":{"A":[0,0],"B":[12,0],"C":[12,6],"D":[0,6]},"nolab":["A","B","C","D"],"poly":[["A","B","C","D","fl"]],"seg":[["A","B","ln",null,"2x"],["B","C","ln",null,"x"],["C","D"],["D","A"]],"cap":"Perimeter 2x + x + 2x + x = 6x"}'></div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: a rectangle</div>
  <div class="example-step"><span class="step-num">1</span><span>A rectangle is twice as long as it is wide. Its perimeter is 54 cm. Find its length.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>6x = 54, x = 9. The length is 2x = <strong>18 cm</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Finish with a sentence that answers the question, and check the answer in the original story, not just in your equation.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "The sum of two consecutive even numbers is 70. What is the smaller number?", "answer": "34", "topic": "Word problems"},
        {"type": "input", "text": "A number is multiplied by 4 and then 7 is subtracted. The result is 45. What is the number?", "answer": "13", "topic": "Word problems"},
        {"type": "input", "text": "A father is 4 times as old as his daughter. In 6 years he will be 3 times as old. How old is the daughter now?", "answer": "12", "topic": "Word problems"},
        {"type": "input", "text": "A rectangle's length is 5 cm more than its width. Its perimeter is 50 cm. What is its width? (cm)", "answer": "10", "topic": "Word problems"},
        {"type": "input", "text": "Thandi has R5 and R2 coins, 20 coins in total, worth R67. How many R5 coins does she have?", "answer": "9", "topic": "Word problems"},
        {"type": "input", "text": "Tickets cost R45 for adults and R25 for children. A group of 12 paid R420. How many adults were there?", "answer": "6", "topic": "Word problems"},
        { type: "input", text: "A boat travels 24 km downstream in 2 hours and comes back upstream in 3 hours. What is the speed of the current? (km/h)", answer: "2", topic: "Word problems" }
      ]
    },
    {
      id: 903,
      chapter: 9,
      name: "Ch 9 Exam focus",
      fullName: "Exam practice: algebraic equations",
      lesson: {
        heading: "Ch 9 Exam focus",
        sub: "Chapter 9 · Topic 5",
        body: `
<p>These questions mix the whole chapter, the way a test does. Check every solution by substituting it back into the original equation.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Write down the rule or formula you use, then substitute, then give the answer with units. Marks are given for each step.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Solve for x: 7x − 4 = 3x + 20", "answer": "6", "topic": "Ch 9 Exam focus"},
        {"type": "input", "text": "Solve for x: x² − 5x = 0. Give both solutions separated by \"or\".", "answer": "0 or 5", "altAnswers": ["0 of 5", "5 or 0", "5 of 0"], "topic": "Ch 9 Exam focus"},
        {"type": "input", "text": "Solve for x: (x − 3)(x + 7) = 0. Give both solutions separated by \"or\".", "answer": "3 or -7", "altAnswers": ["3 of -7", "-7 or 3", "-7 of 3"], "topic": "Ch 9 Exam focus"},
        {"type": "input", "text": "Solve for x: 2ˣ = 32", "answer": "5", "topic": "Ch 9 Exam focus"},
        {"type": "input", "text": "Solve for x: x² = 49, x > 0", "answer": "7", "topic": "Ch 9 Exam focus"},
        {"type": "input", "text": "Solve for x: 3(x − 2) = 2(x + 4)", "answer": "14", "topic": "Ch 9 Exam focus"},
        { type: "input", text: "Pens cost R7 and pencils cost R4. Nomsa spends exactly R59 and buys at least 2 pens and at least 6 pencils. How many pens does she buy?", answer: "5", topic: "Ch 9 Exam focus" }
      ]
    },
  ],
  workbook: {
    chapter: 9, chapterName: "Algebraic Equations",
    topics: [
      {
        name: "Linear Equations",
        questions: [
          {
            num: "1",
            text: "Solve for x:",
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
        name: "Quadratic Equations",
        questions: [
          {
            num: "2",
            text: "Solve for x by factorisation:",
            parts: [
              { label: "a)", text: "x² - 11x + 28 = 0", marks: 4 },
              { label: "b)", text: "x² - 16 = 0", marks: 3 },
              { label: "c)", text: "2x² + 7x - 15 = 0", marks: 5 },
              { label: "d)", text: "x(x - 5) = 14", marks: 5 },
            ]
          },
        ]
      },
      {
        "name": "Word problems",
        "questions": [
          {
            "num": "3",
            "text": "Form an equation and solve it.",
            "parts": [
              {
                "label": "a)",
                "text": "The perimeter of a triangle is 48 cm. The sides are x, x + 4 and 2x. Find the sides.",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "Sipho is 5 years older than Lindiwe. The sum of their ages is 37. How old is each?",
                "marks": 3
              },
              {
                "label": "c)",
                "text": "Solve (x + 2)/3 − (x − 1)/4 = 2",
                "marks": 3
              }
            ]
          }
        ]
      },
    ]
  },
  answerKey: {
    chapter: 9, chapterName: "Chapter 9 — Algebraic Equations",
    topics: [
      {
        name: "Linear Equations",
        answers: [
          { num: "Q1a", ans: "x = 11", note: "4x-12=2x+10 → 2x=22 → x=11" },
          { num: "Q1b", ans: "x = 12", note: "LCD 12: 4x+3x=84 → 7x=84 → x=12" },
          { num: "Q1c", ans: "x = 22/7 ≈ 3,14", note: "10x-5-3x-6=11 → 7x-11=11 → 7x=22 → x=22/7" },
          { num: "Q1d", ans: "x = 41/7 ≈ 5,86", note: "LCD 15: 5(2x-1)-3(x+2)=30 → 10x-5-3x-6=30 → 7x-11=30 → 7x=41 → x=41/7" },
        ]
      },
      {
        name: "Quadratic Equations",
        answers: [
          { num: "Q2a", ans: "x = 4 or x = 7", note: "(x-4)(x-7)=0" },
          { num: "Q2b", ans: "x = ±4", note: "(x+4)(x-4)=0" },
          { num: "Q2c", ans: "x = 3/2 or x = -5", note: "(2x-3)(x+5)=0" },
          { num: "Q2d", ans: "x = 7 or x = -2", note: "x²-5x-14=0 → (x-7)(x+2)=0" },
        ]
      },
      {
        "name": "Word problems",
        "answers": [
          {
            "num": "Q3a",
            "ans": "11 cm, 15 cm and 22 cm",
            "note": "4x + 4 = 48, x = 11"
          },
          {
            "num": "Q3b",
            "ans": "Lindiwe 16, Sipho 21",
            "note": "x + x + 5 = 37, x = 16"
          },
          {
            "num": "Q3c",
            "ans": "x = 13",
            "note": "4(x + 2) − 3(x − 1) = 24; x + 11 = 24"
          }
        ]
      },
    ]
  }
});
