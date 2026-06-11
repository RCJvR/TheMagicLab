// Math Magician — Grade 9, Chapter 8 data
// Factorisation

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 15,
      chapter: 8,
      name: "Common factors and grouping",
      fullName: "HCF and grouping in pairs",
      lesson: {
        heading: "Common factors and grouping",
        sub: "Chapter 8 · Topic 1",
        body: `
          <p>Factorisation is the reverse of expansion. We take an expression and write it as a product of factors.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Factorisation methods — Grade 9</div>
            <p>
              <strong>1. HCF (Highest Common Factor):</strong> take out the largest common factor.<br>
              <strong>2. Difference of squares:</strong> <span class="math">a² − b² = (a+b)(a−b)</span><br>
              <strong>3. Trinomials:</strong> <span class="math">x² + bx + c = (x + p)(x + q)</span> where p + q = b and pq = c.<br>
              <strong>4. Grouping in pairs:</strong> group terms, factorise each group, extract common bracket.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>HCF: 6x²y − 9xy² = 3xy(2x − 3y)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Grouping: 3ax + 3ay + bx + by = 3a(x + y) + b(x + y) = (3a + b)(x + y)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Always check for HCF first before applying other methods.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>ALWAYS look for a common factor first. It simplifies all other methods that follow.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Factorise: 12x³y² − 8x²y³", options: ["4x²y²(3x − 2y)", "4xy(3x² − 2y²)", "2xy(6x² − 4xy)", "4x²y(3y − 2x)"], answer: 0, topic: "Factorisation" },
        { type: "mc", text: "Factorise by grouping: ax + ay + 3x + 3y", options: ["(a + 3)(x + y)", "a(x + y) + 3", "(a + x)(3 + y)", "(ax)(3y)"], answer: 0, topic: "Factorisation" },
        { type: "input", text: "Factorise 15a²b³ − 10ab². What is the coefficient of the HCF?", answer: "5", topic: "Factorisation" },
        { type: "mc", text: "Factorise by grouping: px − qx + py − qy", options: ["(p − q)(x + y)", "(p + q)(x − y)", "(p − q)(x − y)", "(x + y)(p + q)"], answer: 0, topic: "Factorisation" },
        { type: "mc", text: "Which expression has (2x − y) as a factor?", options: ["4x² + y²", "4x² − y²", "2x² − y", "4x − 2y"], answer: 1, topic: "Factorisation" },
      ]
    },
    {
      id: 16,
      chapter: 8,
      name: "Difference of squares and trinomials",
      fullName: "Difference of squares and factorising trinomials",
      lesson: {
        heading: "Difference of squares and trinomials",
        sub: "Chapter 8 · Topic 2",
        body: `
          <p>Two powerful factorisation techniques: difference of squares and trinomials.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formulas and rules</div>
            <p>
              <strong>Difference of squares:</strong> <span class="math">a² − b² = (a + b)(a − b)</span><br>
              Only works when both terms are perfect squares and there is a MINUS sign.<br><br>
              <strong>Trinomial x² + bx + c:</strong><br>
              Find two numbers p and q such that p × q = c and p + q = b.<br>
              Then: <span class="math">x² + bx + c = (x + p)(x + q)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>9x² − 25 = (3x + 5)(3x − 5)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>x² + 7x + 12: need p × q = 12 and p + q = 7 → p = 3, q = 4 → (x + 3)(x + 4)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>x² − 5x − 14: need pq = −14, p+q = −5 → p = −7, q = 2 → (x − 7)(x + 2)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>2x² − 8 = 2(x² − 4) = 2(x + 2)(x − 2) (HCF first!)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For trinomials, always check: p + q = b (middle term coefficient) AND p × q = c (constant). Both conditions must hold.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Factorise: 4x² − 49", options: ["(2x − 7)(2x − 7)", "(2x − 7)(2x + 7)", "(4x − 7)(x + 7)", "(2x + 49)(2x − 1)"], answer: 1, topic: "Factorisation" },
        { type: "mc", text: "Factorise: x² + 9x + 20", options: ["(x + 4)(x + 5)", "(x + 2)(x + 10)", "(x + 1)(x + 20)", "(x + 5)(x + 4) — same as A"], answer: 0, topic: "Factorisation" },
        { type: "mc", text: "Factorise: x² − 3x − 18", options: ["(x − 9)(x + 2)", "(x + 3)(x − 6)", "(x − 3)(x + 6)", "(x − 6)(x + 3)"], answer: 3, topic: "Factorisation" },
        { type: "input", text: "Factorise: 3x² − 48. What is the constant in one of the linear factors? (give positive value)", answer: "4", topic: "Factorisation" },
        { type: "mc", text: "Factorise completely: 2x² − 2x − 24", options: ["2(x − 4)(x + 3)", "2(x + 4)(x − 3)", "(2x − 6)(x + 4)", "2(x − 4)(x − 3)"], answer: 0, topic: "Factorisation" },
      ]
    },
  ],
  workbook: {
    chapter: 8, chapterName: "Factorisation",
    topics: [
      {
        name: "HCF and Grouping",
        questions: [
          {
            num: "1",
            text: "Factorise fully:",
            parts: [
              { label: "a)", text: "18a³b − 12a²b² + 6ab³", marks: 3 },
              { label: "b)", text: "3ax + 6ay − bx − 2by", marks: 4 },
              { label: "c)", text: "2p(x − 3) − 5(3 − x)", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Difference of Squares and Trinomials",
        questions: [
          {
            num: "2",
            text: "Factorise fully:",
            parts: [
              { label: "a)", text: "25x² − 64", marks: 2 },
              { label: "b)", text: "3x² − 75", marks: 3 },
              { label: "c)", text: "x² + 8x + 15", marks: 3 },
              { label: "d)", text: "x² − 4x − 12", marks: 3 },
              { label: "e)", text: "2x² + 14x + 24", marks: 4 },
              { label: "f)", text: "x² − 16 + x(x − 4)", marks: 5 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 8, chapterName: "Chapter 8 — Factorisation",
    topics: [
      {
        name: "HCF and Grouping",
        answers: [
          { num: "Q1a", ans: "6ab(3a² − 2ab + b²)", note: "HCF = 6ab" },
          { num: "Q1b", ans: "(3a − b)(x + 2y)", note: "3a(x+2y) − b(x+2y) = (3a−b)(x+2y)" },
          { num: "Q1c", ans: "(2p + 5)(x − 3)", note: "Note 3−x = −(x−3); −5(3−x) = +5(x−3); factor out (x−3)" },
        ]
      },
      {
        name: "Difference of Squares and Trinomials",
        answers: [
          { num: "Q2a", ans: "(5x − 8)(5x + 8)", note: "√25x²=5x; √64=8" },
          { num: "Q2b", ans: "3(x − 5)(x + 5)", note: "HCF 3 first: 3(x²−25) = 3(x−5)(x+5)" },
          { num: "Q2c", ans: "(x + 3)(x + 5)", note: "3 × 5 = 15; 3 + 5 = 8 ✓" },
          { num: "Q2d", ans: "(x − 6)(x + 2)", note: "−6 × 2 = −12; −6 + 2 = −4 ✓" },
          { num: "Q2e", ans: "2(x + 3)(x + 4)", note: "HCF 2; x²+7x+12 = (x+3)(x+4)" },
          { num: "Q2f", ans: "(x + 4)(x − 4) + x(x − 4) = (x − 4)(2x + 4) = 2(x − 4)(x + 2)", note: "factor (x−4) from both parts" },
        ]
      },
    ]
  }
});
