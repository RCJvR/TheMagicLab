// Math Magician — Grade 11, Chapter 1
// Exponents and Surds

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 0,
      chapter: 1,
      name: "Rational exponents & surd operations",
      fullName: "Rational exponents, simplifying surds, and rationalising denominators",
      lesson: {
        heading: "Rational exponents and surd operations",
        sub: "Chapter 1 · Topic 1",
        body: `
          <p>Grade 11 extends the exponent and surd work from Grade 10 to include <strong>rationalising denominators</strong> and more complex surd simplification.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Rational exponents recap</div>
            <p>
              <span class="math">a^(m/n) = (ⁿ√a)ᵐ</span><br>
              <span class="math">a^(1/n) = ⁿ√a</span><br>
              All exponent laws still apply. Convert surds to rational exponents before simplifying.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Rationalising the denominator</div>
            <p>
              We never leave a surd in the denominator of a fraction.<br><br>
              <strong>Monomial denominator:</strong> multiply top and bottom by the surd.<br>
              <span class="math">3/√5 = 3√5/5</span><br><br>
              <strong>Binomial denominator:</strong> multiply by the <em>conjugate</em>.<br>
              <span class="math">1/(√3 + 1) × (√3 − 1)/(√3 − 1) = (√3 − 1)/(3 − 1) = (√3 − 1)/2</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Simplify and rationalise</div>
            <p><strong>(a)</strong> <span class="math">√12 − √3 + √75</span><br>
            <span class="math">= 2√3 − √3 + 5√3 = 6√3</span></p>
            <p><strong>(b)</strong> <span class="math">4/(2 − √2)</span><br>
            <span class="math">= 4(2 + √2)/((2)² − (√2)²) = 4(2 + √2)/(4−2) = 2(2 + √2) = 4 + 2√2</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Like surds</div>
            <p>Only <strong>like surds</strong> (same radicand) can be added or subtracted, just like like terms.<br>
            <span class="math">3√2 + 5√2 = 8√2</span> but <span class="math">3√2 + 5√3</span> cannot be simplified further.</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Simplify: √48 − √12 + √3",
          options: ["4√3", "3√3", "5√3", "2√3"],
          answer: 1,
          topic: "Rational exponents & surd operations"
        },
        {
          type: "mc",
          text: "Rationalise: 6/√3",
          options: ["2√3", "6√3/3", "√3/2", "2/√3"],
          answer: 0,
          topic: "Rational exponents & surd operations"
        },
        {
          type: "input",
          text: "Simplify: (√5 + √2)(√5 − √2)",
          answer: "3",
          topic: "Rational exponents & surd operations"
        },
        {
          type: "mc",
          text: "Rationalise: 1/(1 + √3)",
          options: ["(1−√3)/2", "(√3−1)/2", "(1+√3)/2", "(1−√3)/4"],
          answer: 1,
          topic: "Rational exponents & surd operations"
        },
        {
          type: "mc",
          text: "Simplify: (2√3)² + √(144)",
          options: ["24", "12", "16", "18"],
          answer: 0,
          topic: "Rational exponents & surd operations"
        }
      ]
    },
    {
      id: 1,
      chapter: 1,
      name: "Surd equations & exponential applications",
      fullName: "Solving equations with surds and applications of exponentials",
      lesson: {
        heading: "Surd equations and exponential applications",
        sub: "Chapter 1 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Solving surd equations</div>
            <p>
              <strong>Method:</strong><br>
              1. Isolate the surd on one side.<br>
              2. Square both sides to eliminate the surd.<br>
              3. Solve the resulting equation.<br>
              4. <strong>Always check solutions</strong> — squaring can introduce extraneous roots.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve √(2x + 1) = x − 1</div>
            <p>Square both sides: <span class="math">2x + 1 = (x−1)²= x²−2x+1</span><br>
            <span class="math">0 = x² − 4x = x(x−4)</span><br>
            <span class="math">x = 0</span> or <span class="math">x = 4</span><br><br>
            <strong>Check x = 0:</strong> √1 = 0−1 → 1 = −1 ✗ (extraneous)<br>
            <strong>Check x = 4:</strong> √9 = 3 = 4−1 ✓<br>
            Solution: x = 4</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Exponential growth and decay applications</div>
            <p>
              <strong>Growth:</strong> <span class="math">A = P(1 + r)ⁿ</span><br>
              <strong>Decay:</strong> <span class="math">A = P(1 − r)ⁿ</span><br>
              <strong>Finding n:</strong> Use trial and improvement or logarithms (introduced in Grade 12).<br>
              Example: At what rate does R5 000 grow to R8 000 in 8 years (compound)?<br>
              <span class="math">8000 = 5000(1+r)⁸ → (1+r)⁸ = 1.6 → r = 1.6^(1/8) − 1 ≈ 6.05%</span>
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Solve: √(x + 5) = 3",
          options: ["x = 4", "x = 14", "x = 2", "x = 9"],
          answer: 0,
          topic: "Surd equations & exponential applications"
        },
        {
          type: "mc",
          text: "Solve: √(3x − 2) = x − 2. The valid solution is:",
          options: ["x = 1", "x = 6", "x = 1 and x = 6", "No solution"],
          answer: 1,
          topic: "Surd equations & exponential applications"
        },
        {
          type: "input",
          text: "A population of 2 000 grows at 5% per year. After how many years does it first exceed 3 000? (Use trial: check n = 8, 9, 10)",
          answer: "9",
          topic: "Surd equations & exponential applications"
        },
        {
          type: "mc",
          text: "Why must you always check solutions to surd equations?",
          options: ["Because squaring can introduce extraneous roots", "Because surds are always positive", "Because the quadratic formula changes the domain", "Because negative answers are impossible"],
          answer: 0,
          topic: "Surd equations & exponential applications"
        },
        {
          type: "mc",
          text: "Solve: √(x² − 5) = 2",
          options: ["x = 3", "x = ±3", "x = 9", "x = ±√9"],
          answer: 1,
          topic: "Surd equations & exponential applications"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 1 Workbook — Exponents and Surds",
    questions: [
      {
        number: 1,
        text: "Simplify (no calculator):",
        parts: [
          { label: "a", text: "√(45) − 2√(20) + √(80)", marks: 3 },
          { label: "b", text: "(3 + √7)(3 − √7)", marks: 2 },
          { label: "c", text: "(√2 + √5)²", marks: 3 },
          { label: "d", text: "∛(54) · ∛(4)", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Rationalise the denominator and simplify:",
        parts: [
          { label: "a", text: "10/√5", marks: 2 },
          { label: "b", text: "3/(√6 − √3)", marks: 3 },
          { label: "c", text: "(√5 + √2)/(√5 − √2)", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "Solve for x and check all solutions:",
        parts: [
          { label: "a", text: "√(2x − 3) = 5", marks: 3 },
          { label: "b", text: "√(x + 4) = x − 2", marks: 5 },
          { label: "c", text: "√(x² + 12) = 2x − 1", marks: 5 }
        ]
      }
    ],
    answers: {
      1: {
        a: "3√5 − 4√5 + 4√5 = 3√5",
        b: "9 − 7 = 2",
        c: "2 + 2√10 + 5 = 7 + 2√10",
        d: "∛(216) = 6"
      },
      2: {
        a: "2√5",
        b: "3(√6+√3)/((√6)²−(√3)²) = 3(√6+√3)/3 = √6+√3",
        c: "((√5+√2)²)/(5−2) = (7+2√10)/3"
      },
      3: {
        a: "2x−3=25 → x=14; check: √25=5 ✓",
        b: "x+4=(x−2)² → x²−5x=0 → x=0 or x=5; check x=0: √4=2≠−2 ✗; x=5: √9=3=3 ✓",
        c: "x²+12=4x²−4x+1 → 3x²−4x−11=0 → x=(4±√148)/6; check both"
      }
    }
  }
});
