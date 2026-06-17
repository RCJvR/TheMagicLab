// Math Magician — Grade 8, Chapter 7 data
// Algebraic Equations

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 701,
      chapter: 7,
      name: "What is an equation?",
      fullName: "Setting up and understanding equations",
      lesson: {
        heading: "What is an equation?",
        sub: "Chapter 7 · Topic 1",
        body: `
          <p>An <strong>equation</strong> is a mathematical statement that two expressions are equal. Solving an equation means finding the value of the variable that makes it true.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key vocabulary</div>
            <p>
              <strong>Equation:</strong> two expressions connected by = &nbsp; e.g. <span class="math">3x + 5 = 17</span><br>
              <strong>Solution:</strong> the value of the variable that makes the equation true.<br>
              <strong>Left-hand side (LHS):</strong> expression to the left of =<br>
              <strong>Right-hand side (RHS):</strong> expression to the right of =<br>
              <strong>Verify:</strong> substitute the solution back in to check LHS = RHS.<br><br>
              An equation is like a <em>balance scale</em> — whatever you do to one side, you must do to the other to keep it balanced.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Setting up equations from words</div>
            <div class="example-step"><span class="step-num">1</span><span>"I think of a number, multiply it by 3 and add 7. The result is 22."</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Let the number = x</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Equation: <span class="math">3x + 7 = 22</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>"Five more than twice a number is 19."</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Equation: <span class="math">2x + 5 = 19</span></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Expression vs Equation</div>
            <p>
              <strong>Expression:</strong> <span class="math">3x + 5</span> — no equals sign, cannot be solved.<br>
              <strong>Equation:</strong> <span class="math">3x + 5 = 17</span> — has equals sign, can be solved.<br>
              <strong>Formula:</strong> <span class="math">A = l × b</span> — an equation showing a general rule.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always define your variable first. Write "Let x = ..." before setting up the equation. This earns marks in exams even if your algebra goes wrong.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Which of the following is an equation?", options: ["3x + 5", "3x + 5 = 17", "3x − 5 > 2", "3(x + 5)"], answer: 1, topic: "Equations" },
        { type: "input", text: "'A number doubled then decreased by 4 equals 10.' Set up the equation. What is the coefficient of x?", answer: "2", topic: "Equations" },
        { type: "mc", text: "Is x = 4 a solution to <span class='math'>3x − 5 = 7</span>?", options: ["Yes, LHS = 7 ✓", "No, LHS = 8", "No, LHS = 6", "Yes, LHS = 6"], answer: 0, topic: "Equations" },
        { type: "mc", text: "'Five less than three times a number is 16.' Which equation represents this?", options: ["3x + 5 = 16", "5 − 3x = 16", "3x − 5 = 16", "3(x − 5) = 16"], answer: 2, topic: "Equations" },
        { type: "input", text: "Verify: is x = 5 a solution to <span class='math'>4x − 3 = 17</span>? Type 'yes' or 'no'.", answer: "yes", topic: "Equations" },
      ]
    },
    {
      id: 702,
      chapter: 7,
      name: "Solving by inspection",
      fullName: "Solving equations by inspection",
      lesson: {
        heading: "Solving equations by inspection",
        sub: "Chapter 7 · Topic 2",
        body: `
          <p><strong>Solving by inspection</strong> means finding the solution by thinking carefully about what value makes the equation true — without formal algebraic steps.</p>
          <div class="def-box">
            <div class="def-box-title">📖 When to use inspection</div>
            <p>
              Inspection works well for simple equations where the answer is easy to spot:<br>
              <span class="math">x + 5 = 12</span> → "what + 5 = 12?" → x = 7<br>
              <span class="math">3x = 21</span> → "3 × what = 21?" → x = 7<br>
              <span class="math">x − 4 = 9</span> → "what − 4 = 9?" → x = 13<br><br>
              For more complex equations, use formal methods (Topic 3).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">x + 8 = 15</span> → x = 7 (because 7 + 8 = 15)</span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">4x = 28</span> → x = 7 (because 4 × 7 = 28)</span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">x/3 = 5</span> → x = 15 (because 15/3 = 5)</span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">2x + 1 = 11</span> → 2x = 10 → x = 5</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always check your answer by substituting back. Write "Check: LHS = ... = RHS ✓" — this is good exam practice and earns verification marks.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Solve by inspection: <span class='math'>x + 9 = 17</span>", answer: "8", topic: "Equations" },
        { type: "input", text: "Solve by inspection: <span class='math'>5x = 35</span>", answer: "7", topic: "Equations" },
        { type: "mc", text: "Solve by inspection: <span class='math'>x/4 = 6</span>", options: ["2", "10", "24", "18"], answer: 2, topic: "Equations" },
        { type: "input", text: "Solve by inspection: <span class='math'>3x + 2 = 14</span>", answer: "4", topic: "Equations" },
        { type: "mc", text: "Which value of x satisfies <span class='math'>2x − 3 = 11</span>?", options: ["4", "5", "7", "8"], answer: 2, topic: "Equations" },
      ]
    },
    {
      id: 703,
      chapter: 7,
      name: "Solving using inverses",
      fullName: "Solving equations using additive and multiplicative inverses",
      lesson: {
        heading: "Solving equations using inverse operations",
        sub: "Chapter 7 · Topic 3",
        body: `
          <p>The formal method for solving equations uses <strong>inverse operations</strong> to isolate the variable. Think of it as undoing each operation to get x by itself.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Inverse operations</div>
            <p>
              <strong>Additive inverse:</strong> add/subtract the same value from both sides.<br>
              <span class="math">x + 5 = 12 → x + 5 − 5 = 12 − 5 → x = 7</span><br><br>
              <strong>Multiplicative inverse:</strong> multiply/divide both sides by the same value.<br>
              <span class="math">3x = 21 → 3x/3 = 21/3 → x = 7</span><br><br>
              <strong>Combined:</strong> use additive inverse first, then multiplicative.<br>
              <span class="math">3x + 5 = 17 → 3x = 12 → x = 4</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Full worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>Solve: <span class="math">4x − 3 = 13</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Add 3 to both sides: <span class="math">4x = 16</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Divide both sides by 4: <span class="math">x = 4</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Check: <span class="math">4(4) − 3 = 16 − 3 = 13 ✓</span></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ With fractions</div>
            <div class="example-step"><span class="step-num">1</span><span>Solve: <span class="math">x/3 + 2 = 7</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Subtract 2: <span class="math">x/3 = 5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Multiply by 3: <span class="math">x = 15</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Check: <span class="math">15/3 + 2 = 5 + 2 = 7 ✓</span></span></div>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Equation Solver</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Type an equation in the form ax + b = c and see the step-by-step solution.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <input id="eqA" type="number" value="3" placeholder="a" style="width:52px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:14px;">x +</span>
              <input id="eqB" type="number" value="5" placeholder="b" style="width:52px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:14px;">=</span>
              <input id="eqC" type="number" value="17" placeholder="c" style="width:52px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="eqSolveBtn" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Solve</button>
            </div>
            <div id="eqSteps" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;color:rgba(221,225,240,0.75);"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){ a=Math.abs(a);b=Math.abs(b); return b===0?a:gcd(b,a%b); }
            function fmtNum(n){
              if(Number.isInteger(n)) return String(n);
              // Try to show as fraction if denominator is small
              for(let d=2;d<=100;d++){
                const num=Math.round(n*d);
                if(Math.abs(num/d-n)<1e-9){
                  const g=gcd(Math.abs(num),d);
                  return (num/g)+'/'+(d/g);
                }
              }
              return n.toFixed(4);
            }
            function solve() {
              const a = parseFloat(document.getElementById('eqA').value);
              const b = parseFloat(document.getElementById('eqB').value);
              const c = parseFloat(document.getElementById('eqC').value);
              const el = document.getElementById('eqSteps');
              if(isNaN(a)||isNaN(b)||isNaN(c)){
                el.innerHTML='<span style="color:#fca5a5;">Please enter valid numbers.</span>'; return;
              }
              if(a===0){
                el.innerHTML='<span style="color:#fca5a5;">Coefficient a cannot be 0 — that's not a linear equation.</span>'; return;
              }
              const x = (c - b) / a;
              const absB = Math.abs(b);
              // Build equation string correctly for any sign of b
              const eqStr = a+'x ' + (b>=0 ? '+ '+b : '− '+absB) + ' = '+c;
              let rows = [];
              rows.push('<div><span style="color:#fbbf24;">Equation: '+eqStr+'</span></div>');
              if(b !== 0) {
                const verb = b > 0 ? 'Subtract '+b+' from' : 'Add '+absB+' to';
                rows.push('<div style="opacity:0.6;font-size:11px;">Step 1: '+verb+' both sides</div>');
                rows.push('<div style="color:#a5b4fc;">'+a+'x = '+c+' '+(b>0?'− '+b:'+ '+absB)+'</div>');
                rows.push('<div style="color:#a5b4fc;">'+a+'x = '+(c-b)+'</div>');
                rows.push('<div style="opacity:0.6;font-size:11px;margin-top:2px;">Step 2: Divide both sides by '+a+'</div>');
                rows.push('<div style="color:#a5b4fc;">x = '+(c-b)+' ÷ '+a+'</div>');
              } else {
                rows.push('<div style="opacity:0.6;font-size:11px;">Step 1: Divide both sides by '+a+'</div>');
                rows.push('<div style="color:#a5b4fc;">x = '+c+' ÷ '+a+'</div>');
              }
              rows.push('<div style="color:#6ee7b7;font-size:15px;font-weight:700;margin-top:4px;">x = '+fmtNum(x)+'</div>');
              // Verification
              const check = a*x + b;
              const checkStr = fmtNum(check);
              rows.push('<div style="opacity:0.45;font-size:11px;margin-top:6px;">Check: '+a+'('+fmtNum(x)+') '+(b>=0?'+ '+b:'− '+absB)+' = '+checkStr+(Math.abs(check-c)<0.0001?' = '+c+' ✓':' ✗ (rounding)')+'</div>');
              el.innerHTML = rows.join('');
            }
            document.getElementById('eqSolveBtn').addEventListener('click', solve);
            ['eqA','eqB','eqC'].forEach(id => document.getElementById(id).addEventListener('keydown', e => e.key==='Enter' && solve()));
            solve();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Try entering negative values for b. Notice how "add" and "subtract" swap. The rule is always: apply the <em>opposite</em> operation to both sides.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Solve: <span class='math'>2x + 7 = 19</span>", answer: "6", topic: "Equations" },
        { type: "input", text: "Solve: <span class='math'>5x − 3 = 22</span>", answer: "5", topic: "Equations" },
        { type: "mc", text: "Solve: <span class='math'>x/4 + 3 = 8</span>", options: ["5", "20", "44", "11"], answer: 1, topic: "Equations" },
        { type: "input", text: "Solve: <span class='math'>3x + 12 = 0</span>", answer: "-4", topic: "Equations" },
        { type: "mc", text: "Solve: <span class='math'>−2x + 10 = 4</span>", options: ["7", "3", "−7", "−3"], answer: 1, topic: "Equations" },
        { type: "input", text: "Solve: <span class='math'>x/5 − 2 = 3</span>", answer: "25", topic: "Equations" },
      ]
    },
    {
      id: 704,
      chapter: 7,
      name: "Variables on both sides",
      fullName: "Equations with variables on both sides",
      lesson: {
        heading: "Equations with variables on both sides",
        sub: "Chapter 7 · Topic 4",
        body: `
          <p>When variables appear on <strong>both sides</strong> of the equation, collect all variable terms on one side and all constants on the other.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Strategy</div>
            <p>
              1. Move variable terms to one side (subtract the smaller variable term).<br>
              2. Move constant terms to the other side.<br>
              3. Solve using the multiplicative inverse.<br>
              4. Always verify by substituting back.<br><br>
              <strong>Example:</strong> <span class="math">5x + 3 = 2x + 12</span><br>
              Subtract 2x: <span class="math">3x + 3 = 12</span><br>
              Subtract 3: <span class="math">3x = 9</span><br>
              Divide by 3: <span class="math">x = 3</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Full worked example with brackets</div>
            <div class="example-step"><span class="step-num">1</span><span>Solve: <span class="math">3(x + 4) = 2x + 17</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Expand: <span class="math">3x + 12 = 2x + 17</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Subtract 2x: <span class="math">x + 12 = 17</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Subtract 12: <span class="math">x = 5</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Check: <span class="math">3(5+4) = 27</span> and <span class="math">2(5)+17 = 27 ✓</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Move the variable term with the smaller coefficient to avoid negatives. e.g. in <span class="math">5x = 2x + 9</span>, subtract 2x (not 5x) to keep it positive.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Solve: <span class='math'>5x + 3 = 3x + 11</span>", answer: "4", topic: "Equations" },
        { type: "input", text: "Solve: <span class='math'>7x − 4 = 4x + 11</span>", answer: "5", topic: "Equations" },
        { type: "mc", text: "Solve: <span class='math'>4(x + 1) = 2x + 10</span>", options: ["2", "3", "4", "6"], answer: 1, topic: "Equations" },
        { type: "input", text: "Solve: <span class='math'>2(3x − 1) = 4x + 8</span>", answer: "5", topic: "Equations" },
        { type: "mc", text: "Solve: <span class='math'>6x − 7 = 2x + 5</span>", options: ["1", "2", "3", "4"], answer: 2, topic: "Equations" },
        { type: "input", text: "Solve: <span class='math'>3(x − 2) = 2(x + 1)</span>", answer: "8", topic: "Equations" },
      ]
    },
    {
      id: 705,
      chapter: 7,
      name: "Word problems",
      fullName: "Solving word problems using equations",
      lesson: {
        heading: "Word problems using equations",
        sub: "Chapter 7 · Topic 5",
        body: `
          <p>Word problems require you to <strong>translate</strong> a real-world situation into an equation, solve it, and interpret the answer in context.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Solving word problems — 5 steps</div>
            <p>
              1. <strong>Read</strong> the problem carefully — twice.<br>
              2. <strong>Define</strong> the variable: "Let x = ..."<br>
              3. <strong>Set up</strong> the equation from the given information.<br>
              4. <strong>Solve</strong> the equation using formal methods.<br>
              5. <strong>Answer</strong> in context — include units and check it makes sense.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example 1 — consecutive numbers</div>
            <div class="example-step"><span class="step-num">1</span><span>The sum of two consecutive numbers is 47. Find them.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Let first number = x, second = x + 1</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Equation: <span class="math">x + (x + 1) = 47</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">2x + 1 = 47 → 2x = 46 → x = 23</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Numbers are 23 and 24. Check: <span class="math">23 + 24 = 47 ✓</span></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example 2 — perimeter</div>
            <div class="example-step"><span class="step-num">1</span><span>A rectangle's length is 3 more than its width. Perimeter = 38 cm. Find width.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Let width = x, length = x + 3</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Perimeter: <span class="math">2(x) + 2(x+3) = 38</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">4x + 6 = 38 → 4x = 32 → x = 8</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Width = 8 cm, Length = 11 cm. Check: <span class="math">2(8)+2(11) = 38 ✓</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Marks in exams are awarded for: defining the variable, setting up the equation, solving it, and answering in context. All four parts matter.</span></div>
        `
      },
      questions: [
        { type: "input", text: "The sum of three consecutive integers is 51. What is the smallest integer?", answer: "16", topic: "Word problems" },
        { type: "mc", text: "Sipho is 4 years older than Thandi. Together their ages total 28. How old is Thandi?", options: ["10", "12", "14", "16"], answer: 1, topic: "Word problems" },
        { type: "input", text: "A rectangle has length 2x and width x − 1. Its perimeter is 34 cm. Find x.", answer: "6", topic: "Word problems" },
        { type: "mc", text: "I think of a number, multiply by 4 and subtract 9. The result equals the number plus 6. What is the number?", options: ["3", "4", "5", "6"], answer: 2, topic: "Word problems" },
        { type: "input", text: "Two friends share R 180. One gets R 20 more than the other. How much does the smaller share receive? (R)", answer: "80", topic: "Word problems" },
      ]
    },
    {
      id: 706,
      chapter: 7,
      name: "Ch 7 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 7 — Examination focus",
        sub: "Chapter 7 · Review",
        body: `
          <p>Algebraic equations questions in exams range from simple one-step solving to multi-step equations with brackets and variables on both sides. Word problems appear in every paper.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 7 summary</div>
            <p>
              ✅ Equation = two expressions connected by =<br>
              ✅ Inspection: spot the answer for simple equations<br>
              ✅ Formal: use inverse operations — subtract/add, then divide/multiply<br>
              ✅ Variables on both sides: collect x-terms on one side first<br>
              ✅ Brackets: expand first, then solve<br>
              ✅ Word problems: define variable → equation → solve → answer in context<br>
              ✅ Always verify: substitute back and check LHS = RHS
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>A common exam error: solving correctly but not writing the final answer as "x = ..." — or forgetting to verify. Both lose marks.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Solve: <span class='math'>3(2x − 1) − 2(x + 3) = 5</span>", answer: "3", topic: "Mixed" },
        { type: "mc", text: "Solve: <span class='math'>5x − 3 = 3x + 7</span>", options: ["2", "3", "4", "5"], answer: 3, topic: "Mixed" },
        { type: "input", text: "The perimeter of an equilateral triangle is 45 cm. Each side = 3x − 1. Find x.", answer: "6", topic: "Mixed" },
        { type: "mc", text: "Solve: <span class='math'>4(x + 3) = 2(2x + 6)</span>", options: ["x = 0", "x = 3", "No solution — infinitely many solutions", "x = 6"], answer: 2, topic: "Mixed" },
        { type: "input", text: "A number is multiplied by 6, then 11 is subtracted. The result is 3 more than twice the number. Find the number.", answer: "7", topic: "Mixed" },
      ]
    }
  ],
  workbook: {
    chapter: 7, chapterName: "Algebraic Equations",
    topics: [
      {
        name: "Solving using inverses",
        questions: [
          {
            num: "1",
            text: "Solve the following equations. Show all steps.",
            parts: [
              { label: "a)", text: "<span class='math'>3x + 7 = 22</span>", marks: 2 },
              { label: "b)", text: "<span class='math'>5x − 3 = 2x + 9</span>", marks: 3 },
              { label: "c)", text: "<span class='math'>2(x + 4) = 14</span>", marks: 3 },
              { label: "d)", text: "<span class='math'>4(2x − 3) = 3(x + 2)</span>", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Variables on both sides",
        questions: [
          {
            num: "2",
            text: "Solve and verify your answer:",
            parts: [
              { label: "a)", text: "<span class='math'>7x − 4 = 3x + 12</span>", marks: 3 },
              { label: "b)", text: "<span class='math'>5(x − 2) = 2(x + 4)</span>", marks: 4 },
              { label: "c)", text: "<span class='math'>3(2x + 1) − 2(x − 3) = 25</span>", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Word problems and formulae",
        questions: [
          {
            num: "3",
            text: "Set up and solve an equation for each problem:",
            parts: [
              { label: "a)", text: "The sum of three consecutive integers is 72. Find the integers.", marks: 4 },
              { label: "b)", text: "A rectangle's length is 5 cm more than its width. Its perimeter is 62 cm. Find the dimensions.", marks: 4 },
              { label: "c)", text: "Two friends share R 340 so that one receives R 60 more than the other. How much does each receive?", marks: 3 },
            ]
          },
          {
            num: "4",
            text: "The formula for converting Celsius to Fahrenheit is <span class='math'>F = 1.8C + 32</span>.",
            parts: [
              { label: "a)", text: "Find F when C = 25.", marks: 2 },
              { label: "b)", text: "Make C the subject of the formula.", marks: 3 },
              { label: "c)", text: "Find C when F = 212.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 7, chapterName: "Chapter 7 — Algebraic Equations",
    topics: [
      {
        name: "Solving using inverses",
        answers: [
          { num: "Q1a", ans: "x = 5", note: "3x=15 → x=5" },
          { num: "Q1b", ans: "x = 4", note: "3x=12 → x=4" },
          { num: "Q1c", ans: "x = 3", note: "2x+8=14 → 2x=6 → x=3" },
          { num: "Q1d", ans: "x = 18/5 = 3.6", note: "8x−12=3x+6 → 5x=18 → x=3.6" },
        ]
      },
      {
        name: "Variables on both sides",
        answers: [
          { num: "Q2a", ans: "x = 4", note: "4x=16 → x=4; check: 7(4)−4=24=3(4)+12 ✓" },
          { num: "Q2b", ans: "x = 6", note: "5x−10=2x+8 → 3x=18 → x=6" },
          { num: "Q2c", ans: "x = 4", note: "6x+3−2x+6=25 → 4x+9=25 → 4x=16 → x=4" },
        ]
      },
      {
        name: "Word problems and formulae",
        answers: [
          { num: "Q3a", ans: "23, 24, 25", note: "x+(x+1)+(x+2)=72 → 3x+3=72 → x=23" },
          { num: "Q3b", ans: "Width = 13 cm, Length = 18 cm", note: "2(w+w+5)=62 → 4w+10=62 → w=13; l=18" },
          { num: "Q3c", ans: "R 140 and R 200", note: "x+(x+60)=340 → 2x=280 → x=140" },
          { num: "Q4a", ans: "F = 77°", note: "1.8(25)+32=45+32=77" },
          { num: "Q4b", ans: "C = (F − 32) ÷ 1.8", note: "F−32=1.8C → C=(F−32)/1.8" },
          { num: "Q4c", ans: "C = 100°", note: "(212−32)/1.8=180/1.8=100" },
        ]
      },
    ]
  }
});
