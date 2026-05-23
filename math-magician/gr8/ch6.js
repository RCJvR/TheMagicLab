// Math Magician — Grade 8, Chapter 6 data
// Algebraic Expressions

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 32,
      chapter: 6,
      name: "Algebraic language & terms",
      fullName: "Algebraic language, terms and polynomials",
      lesson: {
        heading: "Algebraic language and terms",
        sub: "Chapter 6 · Topic 1",
        body: `
          <p>Algebra uses <strong>variables</strong> (letters) to represent unknown or changing quantities. Understanding the language of algebra is the foundation of all further mathematics.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key vocabulary</div>
            <p>
              <strong>Variable:</strong> a letter representing an unknown value (e.g. x, y, a).<br>
              <strong>Constant:</strong> a fixed number (e.g. 5, −3, ½).<br>
              <strong>Coefficient:</strong> the number multiplying a variable. In <span class="math">7x</span>, the coefficient is 7.<br>
              <strong>Term:</strong> a single number, variable, or product of both. Terms are separated by + or −.<br>
              <strong>Expression:</strong> a combination of terms. e.g. <span class="math">3x + 2y − 5</span><br>
              <strong>Polynomial:</strong> an expression with one or more terms.<br>
              &nbsp;&nbsp;• Monomial: 1 term — <span class="math">4x²</span><br>
              &nbsp;&nbsp;• Binomial: 2 terms — <span class="math">3x + 5</span><br>
              &nbsp;&nbsp;• Trinomial: 3 terms — <span class="math">x² + 2x − 3</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Identifying parts of an expression</div>
            <div class="example-step"><span class="step-num">1</span><span>Expression: <span class="math">5x² − 3x + 8</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Terms: <span class="math">5x²</span>, <span class="math">−3x</span>, <span class="math">8</span> → 3 terms (trinomial)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Coefficients: 5 (of x²), −3 (of x)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Constant term: 8</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Variable: x</span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Writing algebraic expressions from words</div>
            <p>
              <strong>Sum:</strong> a + b → "the sum of a and b"<br>
              <strong>Difference:</strong> a − b → "a less b" or "b subtracted from a"<br>
              <strong>Product:</strong> ab or a × b → "a multiplied by b" (the × sign is dropped)<br>
              <strong>Quotient:</strong> a ÷ b or a/b → "a divided by b"<br>
              <strong>Square:</strong> a² → "a squared"<br><br>
              "Three times x plus five" → <span class="math">3x + 5</span><br>
              "The square of y less twice y" → <span class="math">y² − 2y</span>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The word "of" in algebra usually means multiply. "Half of x" = ½x = x/2.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "How many terms does <span class='math'>4x² − 3x + 7</span> have?", options: ["1", "2", "3", "4"], answer: 2, topic: "Expressions" },
        { type: "mc", text: "What is the coefficient of x in <span class='math'>−6x + 11</span>?", options: ["6", "11", "−6", "−11"], answer: 2, topic: "Expressions" },
        { type: "input", text: "Write as an expression: 'twice x squared minus three'", answer: "2x^2-3", topic: "Expressions" },
        { type: "mc", text: "Which is a trinomial?", options: ["5x²", "3x − 4", "x² + 2x − 1", "7"], answer: 2, topic: "Expressions" },
        { type: "mc", text: "What is the constant term in <span class='math'>3x² − 5x + 9</span>?", options: ["3", "−5", "9", "x"], answer: 2, topic: "Expressions" },
        { type: "input", text: "'The product of 4 and y, decreased by 6' as an expression:", answer: "4y-6", topic: "Expressions" },
      ]
    },
    {
      id: 33,
      chapter: 6,
      name: "Like and unlike terms",
      fullName: "Like terms and unlike terms",
      lesson: {
        heading: "Like and unlike terms",
        sub: "Chapter 6 · Topic 2",
        body: `
          <p><strong>Like terms</strong> have exactly the same variable(s) raised to the same power(s). Only like terms can be combined by addition or subtraction.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Like vs unlike terms</div>
            <p>
              <strong>Like terms</strong> (can be combined):<br>
              <span class="math">3x</span> and <span class="math">7x</span> → both have x¹<br>
              <span class="math">4x²</span> and <span class="math">−2x²</span> → both have x²<br>
              <span class="math">5</span> and <span class="math">−11</span> → both are constants<br><br>
              <strong>Unlike terms</strong> (cannot be combined):<br>
              <span class="math">3x</span> and <span class="math">3x²</span> → different powers of x<br>
              <span class="math">4x</span> and <span class="math">4y</span> → different variables<br>
              <span class="math">5x</span> and <span class="math">5</span> → one has variable, one doesn't
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Identifying like terms</div>
            <div class="example-step"><span class="step-num">1</span><span>Group like terms in: <span class="math">3x² + 5x − 2x² + 4 − 3x + 1</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>x² terms: <span class="math">3x²</span> and <span class="math">−2x²</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>x terms: <span class="math">5x</span> and <span class="math">−3x</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Constants: <span class="math">4</span> and <span class="math">1</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Think of like terms like fruit: 3 apples + 5 apples = 8 apples. But 3 apples + 5 oranges stays as is — you can't combine them.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Which pair are like terms?", options: ["3x and 3x²", "4x and 4y", "5x² and −2x²", "7x and 7"], answer: 2, topic: "Expressions" },
        { type: "mc", text: "How many pairs of like terms are in <span class='math'>3x + 2y − x + 5y − 4</span>?", options: ["1", "2", "3", "4"], answer: 1, topic: "Expressions" },
        { type: "input", text: "Which terms in <span class='math'>4a² + 3b − 2a² + b + 6</span> are like terms with <span class='math'>4a²</span>? (answer: -2a^2)", answer: "-2a^2", topic: "Expressions" },
        { type: "mc", text: "Are <span class='math'>3xy</span> and <span class='math'>5yx</span> like terms?", options: ["No — different order", "Yes — multiplication is commutative", "No — different coefficients", "Only if x = y"], answer: 1, topic: "Expressions" },
        { type: "mc", text: "Which expression has no like terms to collect?", options: ["3x + 5x − 2", "4x² + 3x − x²", "2a + 3b + 4c", "5y − 2y + 1"], answer: 2, topic: "Expressions" },
      ]
    },
    {
      id: 34,
      chapter: 6,
      name: "Adding & subtracting expressions",
      fullName: "Addition and subtraction of algebraic expressions",
      lesson: {
        heading: "Adding and subtracting algebraic expressions",
        sub: "Chapter 6 · Topic 3",
        body: `
          <p>To add or subtract algebraic expressions, collect and combine <strong>like terms</strong>. When subtracting, distribute the negative sign carefully.</p>
          <div class="def-box">
            <div class="def-box-title">📖 The process</div>
            <p>
              1. Remove brackets (watch signs when subtracting).<br>
              2. Identify and group like terms.<br>
              3. Add/subtract the coefficients of like terms.<br><br>
              <strong>Key rule:</strong> subtracting a bracket means changing the sign of every term inside:<br>
              <span class="math">−(3x − 2) = −3x + 2</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Addition</div>
            <div class="example-step"><span class="step-num">1</span><span>Simplify: <span class="math">(3x² + 5x − 2) + (x² − 3x + 7)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Remove brackets: <span class="math">3x² + 5x − 2 + x² − 3x + 7</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Group like terms: <span class="math">(3x²+x²) + (5x−3x) + (−2+7)</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Result: <span class="math">4x² + 2x + 5</span></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Subtraction — watch the signs!</div>
            <div class="example-step"><span class="step-num">1</span><span>Simplify: <span class="math">(4x² − 3x + 1) − (2x² + x − 5)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Distribute the negative: <span class="math">4x² − 3x + 1 − 2x² − x + 5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Group: <span class="math">(4x²−2x²) + (−3x−x) + (1+5)</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Result: <span class="math">2x² − 4x + 6</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The most common error is forgetting to change the sign of every term when subtracting a bracket. Write out the distribution step explicitly every time.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Simplify: <span class='math'>(5x + 3) + (2x − 7)</span>", options: ["7x − 4", "7x + 4", "3x − 4", "7x − 10"], answer: 0, topic: "Expressions" },
        { type: "mc", text: "Simplify: <span class='math'>(4x² − 3x) − (x² + 2x)</span>", options: ["3x² − x", "3x² − 5x", "5x² − x", "3x² + 5x"], answer: 1, topic: "Expressions" },
        { type: "input", text: "Simplify: <span class='math'>(3a + 2b − 1) + (a − 5b + 4)</span>. Coefficient of b in the answer?", answer: "-3", topic: "Expressions" },
        { type: "mc", text: "Simplify: <span class='math'>3x² + 5x − 2 − (x² − 3x + 4)</span>", options: ["2x² + 8x − 6", "2x² + 2x − 6", "4x² + 2x + 2", "2x² + 8x + 2"], answer: 0, topic: "Expressions" },
        { type: "input", text: "Simplify: <span class='math'>(6y² − 4y + 3) − (2y² + y − 8)</span>. What is the constant term?", answer: "11", topic: "Expressions" },
        { type: "mc", text: "What is <span class='math'>−(−3x + 5)</span>?", options: ["−3x + 5", "3x + 5", "3x − 5", "−3x − 5"], answer: 2, topic: "Expressions" },
      ]
    },
    {
      id: 35,
      chapter: 6,
      name: "Multiplying expressions",
      fullName: "Multiplication of algebraic expressions",
      lesson: {
        heading: "Multiplying algebraic expressions",
        sub: "Chapter 6 · Topic 4",
        body: `
          <p>Multiplying algebraic expressions uses the <strong>laws of exponents</strong> and the <strong>distributive property</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rules for multiplication</div>
            <p>
              <strong>Monomial × monomial:</strong> multiply coefficients, add exponents.<br>
              <span class="math">3x² × 4x³ = 12x⁵</span><br><br>
              <strong>Monomial × polynomial (distribute):</strong><br>
              <span class="math">3x(2x + 5) = 6x² + 15x</span><br><br>
              <strong>Sign rules apply:</strong><br>
              <span class="math">−2x(3x − 4) = −6x² + 8x</span><br><br>
              <strong>Raising to a power:</strong><br>
              <span class="math">(2x)³ = 8x³</span> &nbsp; (apply to both coefficient and variable)
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Monomial × polynomial</div>
            <div class="example-step"><span class="step-num">1</span><span>Expand: <span class="math">4x(3x² − 2x + 1)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">4x × 3x² = 12x³</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">4x × (−2x) = −8x²</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">4x × 1 = 4x</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Result: <span class="math">12x³ − 8x² + 4x</span></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Negative monomial</div>
            <div class="example-step"><span class="step-num">1</span><span>Expand: <span class="math">−3y(2y − 5)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">−3y × 2y = −6y²</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">−3y × (−5) = +15y</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Result: <span class="math">−6y² + 15y</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For <span class="math">aˣ × aʸ = aˣ⁺ʸ</span> — add exponents when multiplying same base. For coefficients, just multiply normally.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Simplify: <span class='math'>3x² × 5x³</span>", options: ["15x⁵", "15x⁶", "8x⁵", "15x"], answer: 0, topic: "Expressions" },
        { type: "mc", text: "Expand: <span class='math'>2x(3x + 4)</span>", options: ["6x + 8", "6x² + 8", "6x² + 8x", "5x² + 6x"], answer: 2, topic: "Expressions" },
        { type: "input", text: "Expand: <span class='math'>−3a(2a − 5)</span>. What is the coefficient of a?", answer: "15", topic: "Expressions" },
        { type: "mc", text: "Expand and simplify: <span class='math'>4x(x − 2) + 3x(x + 1)</span>", options: ["7x² − 5x", "7x² − 5", "7x² + 5x", "x² − 5x"], answer: 0, topic: "Expressions" },
        { type: "input", text: "Simplify: <span class='math'>2x² × 3x × 4</span>", answer: "24x^3", topic: "Expressions" },
        { type: "mc", text: "Expand: <span class='math'>−2x(x² − 3x + 5)</span>", options: ["−2x³ − 6x² − 10x", "−2x³ + 6x² − 10x", "2x³ − 6x² + 10x", "−2x³ + 6x² + 10x"], answer: 1, topic: "Expressions" },
      ]
    },
    {
      id: 36,
      chapter: 6,
      name: "Substitution",
      fullName: "Substitution into algebraic expressions",
      lesson: {
        heading: "Substitution",
        sub: "Chapter 6 · Topic 5",
        body: `
          <p><strong>Substitution</strong> means replacing a variable with a given number and evaluating the expression. It is used to check answers and in real-world formulas.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Method</div>
            <p>
              1. Write the expression.<br>
              2. Replace every variable with the given value (use brackets around negative values).<br>
              3. Apply BODMAS to evaluate.<br><br>
              Always use brackets when substituting a negative number to avoid sign errors:<br>
              For x = −3: write <span class="math">x² = (−3)² = 9</span>, not <span class="math">-3² = -9</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>If <span class="math">x = 2</span> and <span class="math">y = −3</span>, evaluate <span class="math">3x² − 2xy + y</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">= 3(2)² − 2(2)(−3) + (−3)</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">= 3(4) − 2(−6) + (−3)</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">= 12 + 12 − 3 = 21</span></span></div>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Substitution Calculator</div>
            <div style="margin-top:10px;">
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;align-items:flex-end;">
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Expression</label>
                  <select id="subExpr" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;min-width:180px;">
                    <option value="x2">x²</option>
                    <option value="3x2">3x²</option>
                    <option value="3x2m2x">3x² − 2x</option>
                    <option value="3x2m2xp1">3x² − 2x + 1</option>
                    <option value="2x3mx2">2x³ − x²</option>
                    <option value="xp3sq">(x + 3)²</option>
                  </select>
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">x =</label>
                  <input id="subX" type="number" value="2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
                </div>
                <div id="subResult" style="padding:7px 18px;background:rgba(110,231,183,0.10);border:1px solid rgba(110,231,183,0.25);border-radius:7px;font-family:JetBrains Mono,monospace;font-size:15px;color:#6ee7b7;min-width:80px;text-align:center;"></div>
              </div>
              <div id="subSteps" style="font-size:12px;color:rgba(221,225,240,0.55);line-height:1.8;font-family:JetBrains Mono,monospace;"></div>
            </div>
          </div>
          <script>
          (function(){
            const exprs = {
              x2:       { label:'x²',            fn: x => x*x,             steps: x => ['x²','= ('+x+')²','= '+x*x] },
              '3x2':    { label:'3x²',           fn: x => 3*x*x,           steps: x => ['3x²','= 3('+x+')²','= 3('+x*x+')','= '+3*x*x] },
              '3x2m2x': { label:'3x² − 2x',      fn: x => 3*x*x - 2*x,    steps: x => ['3x² − 2x','= 3('+x+')² − 2('+x+')','= '+(3*x*x)+' − '+(2*x),'= '+(3*x*x-2*x)] },
              '3x2m2xp1':{ label:'3x²−2x+1',    fn: x => 3*x*x-2*x+1,    steps: x => ['3x²−2x+1','= 3('+x+')²−2('+x+')+1','= '+(3*x*x)+' − '+(2*x)+' + 1','= '+(3*x*x-2*x+1)] },
              '2x3mx2': { label:'2x³ − x²',      fn: x => 2*x*x*x - x*x,  steps: x => ['2x³ − x²','= 2('+x+')³ − ('+x+')²','= '+(2*x*x*x)+' − '+(x*x),'= '+(2*x*x*x-x*x)] },
              xp3sq:    { label:'(x+3)²',        fn: x => (x+3)*(x+3),     steps: x => ['(x+3)²','= ('+x+'+3)²','= ('+( x+3)+')²','= '+((x+3)*(x+3))] },
            };
            function update() {
              const key = document.getElementById('subExpr').value;
              const x = parseFloat(document.getElementById('subX').value);
              if (isNaN(x)) return;
              const expr = exprs[key];
              document.getElementById('subResult').textContent = '= ' + expr.fn(x);
              document.getElementById('subSteps').innerHTML =
                expr.steps(x).map((s,i) => '<span style="opacity:'+(0.4+i*0.15+0.15)+'">' + (i===0?expr.label+' when x='+x+':':'  '+s) + '</span>').join('<br>');
            }
            document.getElementById('subExpr').addEventListener('change', update);
            document.getElementById('subX').addEventListener('input', update);
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Change x to a negative number and notice how signs work. Try x = −2 with 3x² to confirm a negative squared gives a positive.</span></div>
        `
      },
      questions: [
        { type: "input", text: "If x = 3, evaluate <span class='math'>2x² − 5x + 1</span>", answer: "4", topic: "Substitution" },
        { type: "mc", text: "If a = −2, what is <span class='math'>a² − 3a</span>?", options: ["2", "10", "−2", "−10"], answer: 1, topic: "Substitution" },
        { type: "input", text: "If x = 2 and y = −1, evaluate <span class='math'>3x + 4y − 2</span>", answer: "0", topic: "Substitution" },
        { type: "mc", text: "If p = −3, what is <span class='math'>(p + 2)²</span>?", options: ["1", "−1", "25", "−25"], answer: 0, topic: "Substitution" },
        { type: "input", text: "If x = 4, evaluate <span class='math'>x³ − 2x² + x</span>", answer: "36", topic: "Substitution" },
        { type: "mc", text: "The formula for the area of a trapezium is <span class='math'>A = ½(a+b)h</span>. If a=5, b=9, h=4, then A = ?", options: ["28", "56", "18", "36"], answer: 0, topic: "Substitution" },
      ]
    },
    {
      id: 37,
      chapter: 6,
      name: "Ch 6 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 6 — Examination focus",
        sub: "Chapter 6 · Review",
        body: `
          <p>Algebra exam questions test your ability to identify, simplify, expand, and evaluate expressions. Work carefully and show every step.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 6 summary</div>
            <p>
              ✅ Terms: coefficient × variable(s) — separated by + or −<br>
              ✅ Monomial (1 term), binomial (2), trinomial (3)<br>
              ✅ Like terms: same variable, same power — can be combined<br>
              ✅ Subtracting a bracket: change sign of every term inside<br>
              ✅ Multiply: coefficients × coefficients, add exponents<br>
              ✅ Distribute: a(b + c) = ab + ac<br>
              ✅ Substitution: replace variable with value, use brackets for negatives
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Marks are lost when students forget to change signs when subtracting a bracket, or drop the variable after collecting like terms. Write every step.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Simplify: <span class='math'>5x² − 3x + 2x² − x + 4</span>", options: ["7x² − 4x + 4", "7x² + 4x + 4", "3x² − 4x + 4", "7x² − 4x"], answer: 0, topic: "Mixed" },
        { type: "mc", text: "Expand and simplify: <span class='math'>3x(x − 2) − (x² − 4x)</span>", options: ["2x² − 2x", "2x² + 2x", "4x² − 2x", "2x² − 10x"], answer: 1, topic: "Mixed" },
        { type: "input", text: "If a = −1 and b = 3, evaluate <span class='math'>2a² − ab + b²</span>", answer: "14", topic: "Mixed" },
        { type: "mc", text: "Simplify: <span class='math'>(3x² + x − 5) − (x² − 3x + 2)</span>", options: ["2x² − 2x − 3", "2x² + 4x − 7", "4x² + 4x − 7", "2x² + 4x − 3"], answer: 1, topic: "Mixed" },
        { type: "input", text: "Expand: <span class='math'>−4x(2x² − 3x + 1)</span>. What is the coefficient of x²?", answer: "12", topic: "Mixed" },
      ]
    }
  ],
  workbook: {
    chapter: 6, chapterName: "Algebraic Expressions",
    topics: []
  },
  answerKey: {
    chapter: 6, chapterName: "Chapter 6 — Algebraic Expressions",
    topics: []
  }
});
