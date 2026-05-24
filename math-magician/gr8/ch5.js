// Math Magician — Grade 8, Chapter 5 data
// Functions and Relationships

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 27,
      chapter: 5,
      name: "Input, output & flow diagrams",
      fullName: "Input, output values and flow diagrams",
      lesson: {
        heading: "Input, output values and flow diagrams",
        sub: "Chapter 5 · Topic 1",
        body: `
          <p>A <strong>function</strong> is a rule that takes an <em>input</em> value and produces exactly one <em>output</em> value. We can show this as a <strong>flow diagram</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key concepts</div>
            <p>
              <strong>Input (x):</strong> the value you put in.<br>
              <strong>Output (y):</strong> the value that comes out after applying the rule.<br>
              <strong>Operator:</strong> the rule applied inside the "machine" (e.g. ×3, +5).<br><br>
              A flow diagram looks like:<br>
              <span class="math">input → [rule] → output</span><br><br>
              A two-step flow diagram:<br>
              <span class="math">x → [×2] → [+3] → y</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>Rule: multiply by 3, then subtract 1. Input: 4.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Step 1: <span class="math">4 × 3 = 12</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Step 2: <span class="math">12 − 1 = 11</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Output = <span class="math">11</span></span></div>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Input/Output Machine</div>
            <div id="ioMachine" style="margin-top:8px;">
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;">
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Rule 1</label>
                  <select id="op1" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                    <option value="mul">× multiply</option>
                    <option value="div">÷ divide</option>
                    <option value="add">+ add</option>
                    <option value="sub">− subtract</option>
                  </select>
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">by</label>
                  <input id="val1" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Rule 2</label>
                  <select id="op2" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                    <option value="add" selected>+ add</option>
                    <option value="sub">− subtract</option>
                    <option value="mul">× multiply</option>
                    <option value="div">÷ divide</option>
                  </select>
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">by</label>
                  <input id="val2" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
                </div>
              </div>
              <div style="overflow-x:auto;">
                <table id="ioTable" style="border-collapse:collapse;min-width:340px;">
                  <thead>
                    <tr>
                      <th style="padding:7px 16px;font-family:Syne,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.07em;color:rgba(245,158,11,0.70);text-align:center;border-bottom:1px solid rgba(255,255,255,0.10);">Input (x)</th>
                      <th style="padding:7px 16px;font-family:Syne,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.07em;color:rgba(99,102,241,0.80);text-align:center;border-bottom:1px solid rgba(255,255,255,0.10);">Step 1</th>
                      <th style="padding:7px 16px;font-family:Syne,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.07em;color:rgba(110,231,183,0.80);text-align:center;border-bottom:1px solid rgba(255,255,255,0.10);">Output (y)</th>
                    </tr>
                  </thead>
                  <tbody id="ioBody"></tbody>
                </table>
              </div>
              <p id="ioFormula" style="margin-top:10px;font-family:JetBrains Mono,monospace;font-size:12px;color:#fcd34d;"></p>
            </div>
          </div>
          <script>
          (function(){
            const inputs = [1,2,3,4,5,10];
            function applyOp(val, op, n) {
              if(op==='mul') return val*n;
              if(op==='div') return n!==0 ? val/n : '?';
              if(op==='add') return val+n;
              if(op==='sub') return val-n;
            }
            function opSymbol(op) {
              return {mul:'×',div:'÷',add:'+',sub:'−'}[op];
            }
            function update() {
              const op1=document.getElementById('op1').value;
              const v1=parseFloat(document.getElementById('val1').value)||0;
              const op2=document.getElementById('op2').value;
              const v2=parseFloat(document.getElementById('val2').value)||0;
              const tbody=document.getElementById('ioBody');
              tbody.innerHTML='';
              inputs.forEach(x=>{
                const mid=applyOp(x,op1,v1);
                const out=typeof mid==='number'?applyOp(mid,op2,v2):'?';
                const tr=document.createElement('tr');
                tr.innerHTML=\`<td style="padding:6px 16px;text-align:center;font-family:JetBrains Mono,monospace;font-size:13px;color:rgba(245,158,11,0.90);">\${x}</td>
                  <td style="padding:6px 16px;text-align:center;font-size:12px;color:rgba(165,180,252,0.75);">\${typeof mid==='number'?mid.toFixed(mid%1?2:0):'?'}</td>
                  <td style="padding:6px 16px;text-align:center;font-family:JetBrains Mono,monospace;font-size:13px;color:#6ee7b7;">\${typeof out==='number'?out.toFixed(out%1?2:0):'?'}</td>\`;
                tbody.appendChild(tr);
              });
              document.getElementById('ioFormula').textContent =
                \`Formula: y = (x \${opSymbol(op1)} \${v1}) \${opSymbol(op2)} \${v2}\`;
            }
            ['op1','val1','op2','val2'].forEach(id=>{
              const el=document.getElementById(id);
              if(el) el.addEventListener('change',update);
              if(el) el.addEventListener('input',update);
            });
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Change the rules above and watch the output table update. Notice how changing the operator completely changes the relationship between x and y.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A rule says: multiply by 4, then subtract 3. Input = 7. What is the output?", answer: "25", topic: "Functions" },
        { type: "mc", text: "For the rule <span class='math'>x → ×5 → −2 → y</span>, if x = 3, then y = ?", options: ["13", "11", "17", "7"], answer: 0, topic: "Functions" },
        { type: "input", text: "A flow diagram has output 19 with rule: multiply by 2, then add 5. What was the input?", answer: "7", topic: "Functions" },
        { type: "mc", text: "Which describes the flow diagram <span class='math'>x → ×3 → +4 → y</span>?", options: ["y = 4x + 3", "y = 3x + 4", "y = 3(x + 4)", "y = x + 7"], answer: 1, topic: "Functions" },
        { type: "input", text: "Complete the table for rule <span class='math'>y = 2x + 1</span>. When x = 6, y = ?", answer: "13", topic: "Functions" },
      ]
    },
    {
      id: 28,
      chapter: 5,
      name: "Tables of values",
      fullName: "Representing relationships using tables",
      lesson: {
        heading: "Tables of values",
        sub: "Chapter 5 · Topic 2",
        body: `
          <p>A <strong>table of values</strong> organises corresponding input and output values, making it easy to spot the pattern and write the rule.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Reading and completing tables</div>
            <p>
              <strong>Given a rule</strong> → substitute each input to find output.<br>
              <strong>Given a table</strong> → find what operation converts each x to its y.<br><br>
              Always check <em>every</em> row — don't assume from just one pair.<br><br>
              For <span class="math">y = 2x − 1</span>:
            </p>
            <div class="math-block">x  |  1   2   3   4   5
y  |  1   3   5   7   9</div>
            <p>Pattern: y increases by 2 each time (common difference = 2 = coefficient of x)</p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Finding the rule from a table</div>
            <div class="example-step"><span class="step-num">1</span><span>Table: x = 1,2,3,4 → y = 5,8,11,14</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Difference in y: <span class="math">8−5 = 3</span> each time → coefficient of x is 3</span></div>
            <div class="example-step"><span class="step-num">3</span><span>When x=1, y=5: <span class="math">3(1) + ? = 5</span> → constant = 2</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Rule: <span class="math">y = 3x + 2</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Check x=4: <span class="math">3(4)+2 = 14 ✓</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The difference between consecutive y-values always equals the coefficient of x in the formula.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "For rule <span class='math'>y = 4x − 3</span>, what is the missing value when x = 5?", options: ["17", "23", "15", "22"], answer: 0, topic: "Functions" },
        { type: "input", text: "A table shows x: 1,2,3 → y: 7,10,13. What is y when x = 10?", answer: "34", topic: "Functions" },
        { type: "mc", text: "What rule fits: x = 1,2,3,4 → y = 3,5,7,9?", options: ["y = x + 2", "y = 2x + 1", "y = 3x", "y = x + 3"], answer: 1, topic: "Functions" },
        { type: "input", text: "For <span class='math'>y = 5x − 2</span>, find x when y = 23.", answer: "5", topic: "Functions" },
        { type: "mc", text: "A table: x = 2,4,6,8 → y = 7,13,19,25. What is the rule?", options: ["y = 3x + 1", "y = 2x + 3", "y = 6x − 5", "y = 3x − 2"], answer: 0, topic: "Functions" },
      ]
    },
    {
      id: 29,
      chapter: 5,
      name: "Word & symbolic formulae",
      fullName: "Word formulae and symbolic formulae",
      lesson: {
        heading: "Word and symbolic formulae",
        sub: "Chapter 5 · Topic 3",
        body: `
          <p>The same relationship can be described in <strong>words</strong>, as a <strong>formula</strong>, or using <strong>algebraic symbols</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Three equivalent forms</div>
            <p>
              <strong>Word formula:</strong> "The output is three times the input plus two."<br><br>
              <strong>Symbolic formula:</strong> <span class="math">y = 3x + 2</span><br><br>
              <strong>Table:</strong>
            </p>
            <div class="math-block">x  |  0   1   2   3   4
y  |  2   5   8  11  14</div>
            <p>All three say the same thing — just in different forms.</p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Translating between forms</div>
            <div class="example-step"><span class="step-num">1</span><span><strong>Word → symbolic:</strong> "Multiply input by 5 and subtract 4" → <span class="math">y = 5x − 4</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><strong>Symbolic → word:</strong> <span class="math">y = 2x + 7</span> → "Double the input and add 7"</span></div>
            <div class="example-step"><span class="step-num">3</span><span><strong>Real context:</strong> A plumber charges R 150 call-out plus R 80/hour. For h hours: <span class="math">cost = 80h + 150</span></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Variables and constants</div>
            <p>
              In <span class="math">y = 3x + 2</span>:<br>
              <strong>x</strong> and <strong>y</strong> are <em>variables</em> — they change.<br>
              <strong>3</strong> (coefficient) and <strong>2</strong> (constant) are fixed.<br><br>
              Convention: use <span class="math">x</span> for input and <span class="math">y</span> for output.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Being able to move fluently between word, table, and symbolic forms is one of the most important skills in mathematics.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Which symbolic formula matches: 'Multiply input by 6 and subtract 3'?", options: ["y = 6 − 3x", "y = 6x − 3", "y = 3x − 6", "y = 6(x − 3)"], answer: 1, topic: "Functions" },
        { type: "input", text: "A taxi charges R 8 per km plus a R 20 flag fee. Write as a formula: cost = ? × km + 20. What is the coefficient of km?", answer: "8", topic: "Functions" },
        { type: "mc", text: "The formula <span class='math'>y = 4x + 1</span> in words is:", options: ["Add 4 to the input then add 1", "Multiply input by 4 then add 1", "Multiply input by 1 then add 4", "Add 1 to 4 times"], answer: 1, topic: "Functions" },
        { type: "input", text: "A pool holds 1 000 litres. It drains at 25 litres per minute. Volume after t minutes: V = 1000 − 25t. How many minutes to empty? (V = 0)", answer: "40", topic: "Functions" },
        { type: "mc", text: "Which word formula matches <span class='math'>y = 10 − 3x</span>?", options: ["Multiply input by 10, subtract 3", "Subtract the input from 10, multiply by 3", "Multiply input by 3, subtract from 10", "Add 3 to input, subtract from 10"], answer: 2, topic: "Functions" },
      ]
    },
    {
      id: 30,
      chapter: 5,
      name: "Equivalent forms",
      fullName: "Equivalent forms of relationships",
      lesson: {
        heading: "Equivalent forms of relationships",
        sub: "Chapter 5 · Topic 4",
        body: `
          <p>The <strong>same relationship</strong> can be written in multiple algebraically equivalent ways. Recognising these is key to solving equations.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Equivalent forms</div>
            <p>
              <span class="math">y = 2x + 6</span> is equivalent to:<br>
              <span class="math">y = 2(x + 3)</span> (factored form)<br>
              <span class="math">y − 6 = 2x</span> (rearranged)<br>
              <span class="math">x = (y − 6) ÷ 2</span> (x as subject)<br><br>
              All describe the exact same relationship — just written differently.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Making x the subject</div>
            <div class="example-step"><span class="step-num">1</span><span>Start: <span class="math">y = 5x − 3</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Add 3 to both sides: <span class="math">y + 3 = 5x</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Divide both sides by 5: <span class="math">x = (y + 3) ÷ 5</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Check with x=4: <span class="math">y = 5(4)−3 = 17</span>, and <span class="math">x = (17+3)÷5 = 4 ✓</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Whatever you do to one side of an equation, you must do to the other. This keeps the balance.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Which is equivalent to <span class='math'>y = 4x + 8</span>?", options: ["y = 4(x + 2)", "y = 4(x + 8)", "y = 4x + 4", "y = 2(2x + 3)"], answer: 0, topic: "Functions" },
        { type: "input", text: "Make x the subject of <span class='math'>y = 3x + 6</span>. When y = 21, x = ?", answer: "5", topic: "Functions" },
        { type: "mc", text: "For <span class='math'>y = 2x + 10</span>, which is the same relationship?", options: ["x = (y + 10) ÷ 2", "x = (y − 10) ÷ 2", "x = 2y − 10", "x = y ÷ 2 + 10"], answer: 1, topic: "Functions" },
        { type: "input", text: "A formula is <span class='math'>y = 6x − 12</span>. Write in factored form as <span class='math'>y = 6(x − ?)</span>. What goes in the bracket?", answer: "2", topic: "Functions" },
        { type: "mc", text: "If <span class='math'>y = 4x − 8</span>, what is x when y = 20?", options: ["3", "5", "7", "12"], answer: 2, topic: "Functions" },
      ]
    },
    {
      id: 31,
      chapter: 5,
      name: "Ch 5 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 5 — Examination focus",
        sub: "Chapter 5 · Review",
        body: `
          <p>Functions & Relationships questions in exams typically ask you to: complete a table, identify a rule, convert between forms, or find a specific input/output value.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 5 summary</div>
            <p>
              ✅ Input → rule → output (flow diagrams)<br>
              ✅ Tables: find the rule from the pattern of differences<br>
              ✅ Word formula ↔ symbolic formula ↔ table<br>
              ✅ Equivalent forms: same rule, different arrangement<br>
              ✅ Make x the subject by applying inverse operations<br>
              ✅ Use formula in real-world contexts (cost, distance, etc.)
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In exams, always show the substitution step — e.g. write <span class="math">y = 3(5) + 2</span> before writing <span class="math">y = 17</span>.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "A table shows x: 0,1,2,3 → y: −2,1,4,7. What is the rule?", options: ["y = 2x − 2", "y = 3x − 2", "y = x + 1", "y = 4x − 3"], answer: 1, topic: "Mixed" },
        { type: "input", text: "For <span class='math'>y = 5x + 3</span>, find y when x = −2.", answer: "-7", topic: "Mixed" },
        { type: "mc", text: "A cell phone plan costs R 99/month plus R 1,50 per SMS. The formula is C = 1,5n + 99. How many SMSs were sent if the bill is R 159?", options: ["30", "40", "50", "60"], answer: 1, topic: "Mixed" },
        { type: "input", text: "Make x the subject of <span class='math'>y = 7x − 14</span>. Find x when y = 0.", answer: "2", topic: "Mixed" },
        { type: "mc", text: "Which table matches <span class='math'>y = 2x − 3</span>?", options: ["x:1,2,3 → y:−1,1,3", "x:1,2,3 → y:1,3,5", "x:1,2,3 → y:2,4,6", "x:1,2,3 → y:−2,0,2"], answer: 0, topic: "Mixed" },
      ]
    }
  ],
  workbook: {
    chapter: 5, chapterName: "Functions and Relationships",
    topics: [
      {
        name: "Flow diagrams and tables",
        questions: [
          {
            num: "1",
            text: "Complete the table for the rule <span class='math'>y = 4x − 3</span>:",
            parts: [
              { label: "a)", text: "Fill in the missing y-values for x = 1, 2, 3, 4, 5.", marks: 4 },
              { label: "b)", text: "Describe the rule in words.", marks: 2 },
              { label: "c)", text: "Find x when y = 29.", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "A flow diagram shows: x → [×3] → [−5] → y",
            parts: [
              { label: "a)", text: "Complete the table for x = 0, 2, 4, 6, 10.", marks: 4 },
              { label: "b)", text: "Write the symbolic formula for this relationship.", marks: 2 },
              { label: "c)", text: "Find the input value that gives an output of 22.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Formulae, equivalent forms and real-world contexts",
        questions: [
          {
            num: "3",
            text: "A plumber charges R 200 call-out fee plus R 120 per hour.",
            parts: [
              { label: "a)", text: "Write a formula for the total cost C in terms of hours h.", marks: 2 },
              { label: "b)", text: "Calculate the cost for a 3-hour job.", marks: 2 },
              { label: "c)", text: "How many hours did the plumber work if the bill was R 680?", marks: 3 },
              { label: "d)", text: "A second plumber charges R 150 + R 130/hour. For how many hours are the charges equal?", marks: 4 },
            ]
          },
          {
            num: "4",
            text: "The table below shows a relationship between x and y: x: 1, 2, 3, 4, 5 → y: 4, 7, 10, 13, 16",
            parts: [
              { label: "a)", text: "Write the rule as a symbolic formula.", marks: 3 },
              { label: "b)", text: "Write an equivalent form by making x the subject.", marks: 3 },
              { label: "c)", text: "Find x when y = 100.", marks: 2 },
              { label: "d)", text: "A different table has rule y = 2(x + 3). Write an equivalent expanded form and evaluate y when x = 7.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 5, chapterName: "Chapter 5 — Functions and Relationships",
    topics: [
      {
        name: "Flow diagrams and tables",
        answers: [
          { num: "Q1a", ans: "y: 1, 5, 9, 13, 17", note: "Substitute each x into y=4x−3" },
          { num: "Q1b", ans: "Multiply the input by 4, then subtract 3", note: "" },
          { num: "Q1c", ans: "x = 8", note: "4x−3=29 → 4x=32 → x=8" },
          { num: "Q2a", ans: "y: −5, 1, 7, 13, 25", note: "(x×3)−5 for each input" },
          { num: "Q2b", ans: "y = 3x − 5", note: "" },
          { num: "Q2c", ans: "x = 9", note: "3x−5=22 → 3x=27 → x=9" },
        ]
      },
      {
        name: "Formulae, equivalent forms and real-world contexts",
        answers: [
          { num: "Q3a", ans: "C = 120h + 200", note: "" },
          { num: "Q3b", ans: "R 560", note: "120(3)+200=560" },
          { num: "Q3c", ans: "4 hours", note: "120h+200=680 → h=4" },
          { num: "Q3d", ans: "5 hours", note: "120h+200=130h+150 → 50=10h → h=5" },
          { num: "Q4a", ans: "y = 3x + 1", note: "d=3; at x=1, y=4: c=1" },
          { num: "Q4b", ans: "x = (y − 1) ÷ 3", note: "y−1=3x → x=(y−1)/3" },
          { num: "Q4c", ans: "x = 33", note: "(100−1)÷3=99÷3=33" },
          { num: "Q4d", ans: "y = 2x + 6; y = 20 when x = 7", note: "2(x+3)=2x+6; 2(7)+6=20" },
        ]
      },
    ]
  }
});
