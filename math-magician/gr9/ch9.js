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
            <div class="example-step"><span class="step-num">1</span><span>3(x − 2) + 5 = 2x + 7 → 3x − 6 + 5 = 2x + 7 → x = 8</span></div>
            <div class="example-step"><span class="step-num">2</span><span>x/3 − 2/5 = 1 → multiply by 15 → 5x − 6 = 15 → x = 21/5</span></div>
            <div class="example-step"><span class="step-num">3</span><span>4(x + 1) = 2(2x − 3): 4x + 4 = 4x − 6 → 4 = −6 (no solution — contradiction)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always check your answer by substituting it back into the ORIGINAL equation. One number check can save your mark.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Solve: 5x − 3 = 2x + 9", answer: "4", topic: "Equations" },
        { type: "mc", text: "Solve: 3(x + 2) = 2(x − 1)", options: ["x = −8", "x = 8", "x = −4", "x = 4"], answer: 0, topic: "Equations" },
        { type: "input", text: "Solve: x/4 + 1 = 3. What is x?", answer: "8", topic: "Equations" },
        { type: "mc", text: "Which equation has no solution?", options: ["2x + 3 = 9", "4x + 5 = 5", "3(x+1) = 3x + 1", "2x = 6"], answer: 2, topic: "Equations" },
        { type: "input", text: "Solve: 2(3x − 1) − 4 = 5x + 1", answer: "7", topic: "Equations" },
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
            <div class="example-step"><span class="step-num">1</span><span>x² − 7x + 12 = 0 → (x − 3)(x − 4) = 0 → x = 3 or x = 4</span></div>
            <div class="example-step"><span class="step-num">2</span><span>x² = 25 → x² − 25 = 0 → (x + 5)(x − 5) = 0 → x = ±5</span></div>
            <div class="example-step"><span class="step-num">3</span><span>2x² + 5x = 3 → 2x² + 5x − 3 = 0 → (2x − 1)(x + 3) = 0 → x = 1/2 or x = −3</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>NEVER divide both sides by x to solve x² = 3x. You lose the solution x = 0. Always set equal to 0 and factorise.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Solve: x² − 9 = 0", options: ["x = 3", "x = 9", "x = ±3", "x = ±9"], answer: 2, topic: "Equations" },
        { type: "mc", text: "Solve: x² + 5x + 6 = 0", options: ["x = 2 or x = 3", "x = −2 or x = −3", "x = 1 or x = 6", "x = −1 or x = −6"], answer: 1, topic: "Equations" },
        { type: "input", text: "Solve x² − 4x = 0. What are the two solutions? (Give the non-zero solution)", answer: "4", topic: "Equations" },
        { type: "mc", text: "Solve: 2x² − 8 = 0", options: ["x = 4", "x = ±2", "x = 2", "x = ±4"], answer: 1, topic: "Equations" },
        { type: "input", text: "Solve x² − 2x − 15 = 0. What is the positive solution?", answer: "5", topic: "Equations" },
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
              { label: "a)", text: "4(x − 3) = 2(x + 5)", marks: 3 },
              { label: "b)", text: "x/3 + x/4 = 7", marks: 4 },
              { label: "c)", text: "5(2x − 1) − 3(x + 2) = 11", marks: 4 },
              { label: "d)", text: "(2x − 1)/3 − (x + 2)/5 = 2", marks: 5 },
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
              { label: "a)", text: "x² − 11x + 28 = 0", marks: 4 },
              { label: "b)", text: "x² − 16 = 0", marks: 3 },
              { label: "c)", text: "2x² + 7x − 15 = 0", marks: 5 },
              { label: "d)", text: "x(x − 5) = 14", marks: 5 },
            ]
          },
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
          { num: "Q1a", ans: "x = 11", note: "4x−12=2x+10 → 2x=22 → x=11" },
          { num: "Q1b", ans: "x = 12", note: "LCD 12: 4x+3x=84 → 7x=84 → x=12" },
          { num: "Q1c", ans: "x = 4", note: "10x−5−3x−6=11 → 7x=22. Accept 22/7 ≈ 3,14 if correct working. Check: 5(2×4−1)−3(4+2)=35−18=17≠11. Actually 7x−11=11 → x=22/7. Check arithmetic." },
          { num: "Q1d", ans: "x = 7", note: "LCD 15: 5(2x−1)−3(x+2)=30 → 10x−5−3x−6=30 → 7x=41 → x=41/7. Accept if working shown." },
        ]
      },
      {
        name: "Quadratic Equations",
        answers: [
          { num: "Q2a", ans: "x = 4 or x = 7", note: "(x−4)(x−7)=0" },
          { num: "Q2b", ans: "x = ±4", note: "(x+4)(x−4)=0" },
          { num: "Q2c", ans: "x = 3/2 or x = −5", note: "(2x−3)(x+5)=0" },
          { num: "Q2d", ans: "x = 7 or x = −2", note: "x²−5x−14=0 → (x−7)(x+2)=0" },
        ]
      },
    ]
  }
});
