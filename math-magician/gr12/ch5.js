// Math Magician — Grade 12, Chapter 5
// Polynomials — Remainder Theorem, Factor Theorem, Cubic Equations

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 0,
      chapter: 5,
      name: "Remainder & factor theorems",
      fullName: "Polynomial division, remainder theorem, and factor theorem",
      lesson: {
        heading: "Remainder theorem and factor theorem",
        sub: "Chapter 5 · Topic 1",
        body: `
          <p>The <strong>remainder theorem</strong> and <strong>factor theorem</strong> allow us to work with polynomials efficiently without long division.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Remainder theorem</div>
            <p>
              When polynomial p(x) is divided by (x − a), the remainder is <span class="math">p(a)</span>.<br><br>
              If the remainder is 0, then (x − a) is a <strong>factor</strong> of p(x).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Factor theorem</div>
            <p>
              (x − a) is a factor of p(x) if and only if <span class="math">p(a) = 0</span>.<br><br>
              To find factors of a cubic p(x) = ax³ + bx² + cx + d:<br>
              1. Test factors of <span class="math">d/a</span> (rational root theorem)<br>
              2. Once one factor (x − a) is found, divide to get a quadratic<br>
              3. Factorise the quadratic
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>p(x) = x³ − 2x² − 5x + 6<br>
            Test x = 1: p(1) = 1 − 2 − 5 + 6 = 0 ✓ → (x − 1) is a factor<br>
            Divide: p(x) = (x − 1)(x² − x − 6) = (x − 1)(x − 3)(x + 2)<br>
            Roots: x = 1, 3, −2</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Synthetic division (short method)</div>
            <p>
              To divide p(x) by (x − a): write coefficients of p(x), bring down first, then multiply by a and add repeatedly.<br>
              The last number is the remainder.
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "p(x) = x³ − 3x + 2. Find the remainder when divided by (x − 2).", options: ["4", "0", "2", "6"], answer: 1, topic: "Remainder & factor theorems" },
        { type: "mc", text: "If p(3) = 0, then which is a factor of p(x)?", options: ["(x + 3)", "(x − 3)", "(3x − 1)", "(x · 3)"], answer: 1, topic: "Remainder & factor theorems" },
        { type: "input", text: "p(x) = 2x³ − 3x² + x − 4. Find p(2).", answer: "2", topic: "Remainder & factor theorems" },
        { type: "mc", text: "To find a factor of x³ + x² − 4x − 4, test integer factors of:", options: ["1", "4", "−4", "Both B and C"], answer: 3, topic: "Remainder & factor theorems" },
        { type: "mc", text: "x³ − 6x² + 11x − 6 = (x−1)(x−2)(x−3). The sum of the roots is:", options: ["6", "11", "−6", "−11"], answer: 0, topic: "Remainder & factor theorems" }
      ]
    },
    {
      id: 1,
      chapter: 5,
      name: "Cubic polynomials — sketching & solving",
      fullName: "Solving cubic equations and sketching cubic functions",
      lesson: {
        heading: "Cubic equations and graphs",
        sub: "Chapter 5 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Solving cubic equations</div>
            <p>
              General method:<br>
              1. Move all terms to one side → p(x) = 0<br>
              2. Find one root using the factor theorem<br>
              3. Factorise as (x − a)(quadratic) = 0<br>
              4. Solve the quadratic (may have 0, 1, or 2 more real solutions)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Sketching y = ax³ + bx² + cx + d</div>
            <p>
              Key features to find using calculus (from Ch 6) or algebra:<br>
              • y-intercept: set x = 0<br>
              • x-intercepts: solve p(x) = 0 (factor theorem)<br>
              • Turning points: solve p'(x) = 0<br>
              • End behaviour: if a > 0, falls left/rises right; if a &lt; 0, rises left/falls right<br>
              • Point of inflection: where concavity changes (p''(x) = 0)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Sketch y = x³ − 3x + 2</div>
            <p>y-intercept: (0, 2)<br>
            x-intercepts: factor → (x−1)²(x+2) → x = 1 (double) and x = −2<br>
            Double root → tangent to x-axis at x = 1<br>
            y' = 3x² − 3 = 0 → x = ±1 (turning points at (1, 0) min and (−1, 4) max)<br>
            End: a > 0 → falls left, rises right</p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Solve: x³ − 7x + 6 = 0. The roots are:", options: ["1, 2, −3", "1, −3, 2", "−1, 3, −2", "1, 2, 3"], answer: 0, topic: "Cubic polynomials — sketching & solving" },
        { type: "mc", text: "If a cubic has a double root at x = 2 and another root at x = −1, it could be:", options: ["(x−2)²(x+1)", "(x+2)²(x−1)", "(x−2)(x+1)²", "(x+2)(x−1)²"], answer: 0, topic: "Cubic polynomials — sketching & solving" },
        { type: "mc", text: "y = −2x³ + … End behaviour:", options: ["Falls left, rises right", "Rises left, falls right", "Falls both sides", "Rises both sides"], answer: 1, topic: "Cubic polynomials — sketching & solving" },
        { type: "input", text: "p(x) = x³ + px² − x − 6 and (x+2) is a factor. Find p.", answer: "2", topic: "Cubic polynomials — sketching & solving" },
        { type: "mc", text: "A cubic equation can have at most how many real roots?", options: ["1", "2", "3", "4"], answer: 2, topic: "Cubic polynomials — sketching & solving" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 5 Workbook — Polynomials",
    questions: [
      { number: 1, text: "p(x) = 2x³ + x² − 13x + 6", parts: [
        { label: "a", text: "Show that (x − 2) is a factor.", marks: 2 },
        { label: "b", text: "Fully factorise p(x).", marks: 4 },
        { label: "c", text: "Solve p(x) = 0.", marks: 2 }
      ]},
      { number: 2, text: "f(x) = x³ − x² − 8x + 12", parts: [
        { label: "a", text: "Find all x-intercepts.", marks: 5 },
        { label: "b", text: "Find the y-intercept.", marks: 1 },
        { label: "c", text: "Describe the end behaviour.", marks: 2 },
        { label: "d", text: "Make a rough sketch.", marks: 3 }
      ]},
      { number: 3, text: "kx³ − 3x² + 2x + 4 has remainder 12 when divided by (x − 2). Find k.", parts: [
        { label: "a", text: "Apply the remainder theorem.", marks: 2 },
        { label: "b", text: "Solve for k.", marks: 2 }
      ]}
    ],
    answers: {
      1: { a: "p(2)=16+4−26+6=0 ✓", b: "p(x)=(x−2)(2x²+5x−3)=(x−2)(2x−1)(x+3)", c: "x=2, x=½, x=−3" },
      2: { a: "Test x=2: 8−4−16+12=0 ✓; divide: (x−2)(x²+x−6)=(x−2)(x+3)(x−2)=(x−2)²(x+3); x=2(double),x=−3", b: "(0,12)", c: "a=1>0: falls left, rises right", d: "Touches x-axis at 2, cuts at −3, y-int at 12" },
      3: { a: "p(2)=8k−12+4+4=8k−4=12", b: "8k=16→k=2" }
    }
  }
});
