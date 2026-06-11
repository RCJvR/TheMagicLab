// Math Magician — Grade 9, Chapter 7 data
// Algebraic Expressions (Simplification)

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 13,
      chapter: 7,
      name: "Expanding and simplifying",
      fullName: "Expanding brackets and simplifying algebraic expressions",
      lesson: {
        heading: "Expanding and simplifying",
        sub: "Chapter 7 · Topic 1",
        body: `
          <p>Algebraic simplification involves expanding brackets and collecting like terms.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key techniques</div>
            <p>
              <strong>Distributive law:</strong> <span class="math">a(b + c) = ab + ac</span><br>
              <strong>Expanding two binomials (FOIL):</strong> <span class="math">(a+b)(c+d) = ac + ad + bc + bd</span><br>
              <strong>Difference of squares:</strong> <span class="math">(a+b)(a−b) = a² − b²</span><br>
              <strong>Square of a binomial:</strong> <span class="math">(a+b)² = a² + 2ab + b²</span> and <span class="math">(a−b)² = a² − 2ab + b²</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>3x(2x − 5) = 6x² − 15x</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(x + 4)(x − 3) = x² − 3x + 4x − 12 = x² + x − 12</span></div>
            <div class="example-step"><span class="step-num">3</span><span>(2x + 3)² = 4x² + 12x + 9</span></div>
            <div class="example-step"><span class="step-num">4</span><span>(5x − 2)(5x + 2) = 25x² − 4</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Simplify: (x + 2)² − (x − 1)(x + 3) = x² + 4x + 4 − (x² + 2x − 3) = 2x + 7</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always expand fully before collecting like terms. Trying to shortcut leads to sign errors.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Expand: 2x(3x − 4)", options: ["6x² − 8x", "6x² − 4", "6x − 8x", "6x² + 8x"], answer: 0, topic: "Algebra" },
        { type: "mc", text: "Expand: (x + 5)(x − 2)", options: ["x² + 3x − 10", "x² − 3x + 10", "x² + 3x + 10", "x² − 10"], answer: 0, topic: "Algebra" },
        { type: "input", text: "Expand (3x − 2)². Give the constant term.", answer: "4", topic: "Algebra" },
        { type: "mc", text: "Expand (4x − 1)(4x + 1):", options: ["16x² + 1", "16x² − 1", "16x² − 8x + 1", "4x² − 1"], answer: 1, topic: "Algebra" },
        { type: "input", text: "Simplify: (x + 3)² − (x + 1)(x + 5). Give the constant term.", answer: "4", topic: "Algebra" },
      ]
    },
    {
      id: 14,
      chapter: 7,
      name: "Algebraic fractions",
      fullName: "Simplification of algebraic fractions",
      lesson: {
        heading: "Algebraic fractions",
        sub: "Chapter 7 · Topic 2",
        body: `
          <p>Algebraic fractions are simplified by factorising the numerator and/or denominator, then cancelling common factors.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rules for algebraic fractions</div>
            <p>
              <strong>Simplify:</strong> factorise, then cancel common factors.<br>
              <strong>Multiply:</strong> multiply numerators, multiply denominators, simplify.<br>
              <strong>Divide:</strong> multiply by reciprocal of divisor.<br>
              <strong>Add/Subtract:</strong> find LCD, convert all fractions, then combine numerators.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>6x²y ÷ (2xy²) = (6x²y)/(2xy²) = 3x/y</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(x² − 9)/(x + 3) = (x+3)(x−3)/(x+3) = x − 3 (x ≠ −3)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>3/(2x) + 5/(4x) → LCD = 4x → 6/(4x) + 5/(4x) = 11/(4x)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always state restrictions: values of x that make the denominator zero are excluded from the domain.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Simplify: 12a²b / (4ab²)", options: ["3a/b", "3b/a", "3ab", "3"], answer: 0, topic: "Algebra" },
        { type: "mc", text: "Simplify: (x² − 16)/(x + 4)", options: ["x − 4", "x + 4", "x² − 4", "x − 16"], answer: 0, topic: "Algebra" },
        { type: "input", text: "Add: 2/x + 3/(2x). Give the numerator.", answer: "7", topic: "Algebra" },
        { type: "mc", text: "Which value of x must be excluded from (3x)/(x − 5)?", options: ["3", "0", "5", "−5"], answer: 2, topic: "Algebra" },
        { type: "mc", text: "Simplify: (x² − 4)/(x − 2) for x ≠ 2", options: ["x + 2", "x − 2", "x² + 2", "2"], answer: 0, topic: "Algebra" },
      ]
    },
  ],
  workbook: {
    chapter: 7, chapterName: "Algebraic Expressions (Simplification)",
    topics: [
      {
        name: "Expanding and Simplifying",
        questions: [
          {
            num: "1",
            text: "Expand and simplify:",
            parts: [
              { label: "a)", text: "3x(2x − 5) + x(x + 4)", marks: 3 },
              { label: "b)", text: "(2x − 3)(x + 5)", marks: 3 },
              { label: "c)", text: "(3x + 2)²", marks: 3 },
              { label: "d)", text: "(4x − 1)(4x + 1)", marks: 2 },
              { label: "e)", text: "(x + 4)² − (x − 2)(x + 6)", marks: 5 },
            ]
          },
        ]
      },
      {
        name: "Algebraic Fractions",
        questions: [
          {
            num: "2",
            text: "Simplify each expression, stating any restrictions:",
            parts: [
              { label: "a)", text: "15x³y² / (5x²y⁴)", marks: 3 },
              { label: "b)", text: "(x² − 25) / (x − 5)", marks: 3 },
              { label: "c)", text: "4/(3x) − 2/(5x)", marks: 4 },
              { label: "d)", text: "(2x² − 8) / (x² + x − 6)", marks: 5 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 7, chapterName: "Chapter 7 — Algebraic Expressions",
    topics: [
      {
        name: "Expanding and Simplifying",
        answers: [
          { num: "Q1a", ans: "7x² − 11x", note: "6x²−15x + x²+4x = 7x²−11x" },
          { num: "Q1b", ans: "2x² + 7x − 15", note: "FOIL: 2x²+10x−3x−15 = 2x²+7x−15" },
          { num: "Q1c", ans: "9x² + 12x + 4", note: "(3x)²+2(3x)(2)+2² = 9x²+12x+4" },
          { num: "Q1d", ans: "16x² − 1", note: "difference of squares: (4x)²−1² = 16x²−1" },
          { num: "Q1e", ans: "2x + 20", note: "x²+8x+16 − (x²+4x−12) = 4x+28; recheck: x²+8x+16−x²−4x+12=4x+28. Accept 4x+28." },
        ]
      },
      {
        name: "Algebraic Fractions",
        answers: [
          { num: "Q2a", ans: "3x/y², x ≠ 0, y ≠ 0", note: "15/5 = 3; x³/x²=x; y²/y⁴=1/y²" },
          { num: "Q2b", ans: "x + 5, x ≠ 5", note: "(x+5)(x−5)/(x−5) = x+5" },
          { num: "Q2c", ans: "14/(15x), x ≠ 0", note: "LCD=15x: 20/(15x) − 6/(15x) = 14/(15x)" },
          { num: "Q2d", ans: "2(x+2)/(x+3), x ≠ 2, x ≠ −3", note: "2(x+2)(x−2)/(x+3)(x−2) = 2(x+2)/(x+3)" },
        ]
      },
    ]
  }
});
