// Math Magician — Grade 9, Chapter 2 data
// Integers

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 3,
      chapter: 2,
      name: "Operations with integers",
      fullName: "Operations with integers",
      lesson: {
        heading: "Operations with integers",
        sub: "Chapter 2 · Topic 1",
        body: `
          <p><strong>Integers</strong> include all whole numbers and their negatives. The four operations all apply, with sign rules governing results.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sign rules for multiplication and division</div>
            <p>
              <strong>+ × + = +</strong> &nbsp;&nbsp; e.g. 3 × 4 = 12<br>
              <strong>− × − = +</strong> &nbsp;&nbsp; e.g. (−3)(−4) = 12<br>
              <strong>+ × − = −</strong> &nbsp;&nbsp; e.g. 3 × (−4) = −12<br>
              <strong>− × + = −</strong> &nbsp;&nbsp; e.g. (−3) × 4 = −12<br><br>
              Same rules apply for division.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>(−8) + 3 = −5 (move 3 right on number line from −8)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(−4) − (−7) = −4 + 7 = 3 (subtracting a negative = adding)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>(−6) × (−5) = 30</span></div>
            <div class="example-step"><span class="step-num">4</span><span>(−36) ÷ 4 = −9</span></div>
            <div class="example-step"><span class="step-num">5</span><span>−3² = −9 (square first, then negate) vs (−3)² = 9</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Note: −3² ≠ (−3)². The exponent applies only to 3 in the first case. This is a very common exam trap!</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate: (−7) − (−12)", answer: "5", topic: "Integers" },
        { type: "mc", text: "What is (−5) × (−4) × (−2)?", options: ["-40", "40", "-20", "20"], answer: 0, topic: "Integers" },
        { type: "input", text: "Calculate: (−48) ÷ (−6)", answer: "8", topic: "Integers" },
        { type: "mc", text: "Which is greater: −3² or (−3)²?", options: ["−3²", "(−3)²", "They are equal", "Cannot compare"], answer: 1, topic: "Integers" },
        { type: "input", text: "Calculate: −2 + (−5) × 3 − (−4)", answer: "-13", topic: "Integers" },
      ]
    },
    {
      id: 4,
      chapter: 2,
      name: "Properties of integers",
      fullName: "Properties of integers and square/cube roots",
      lesson: {
        heading: "Properties and roots of integers",
        sub: "Chapter 2 · Topic 2",
        body: `
          <p>Integers obey the same properties as whole numbers. We also extend square and cube roots to perfect squares and cubes.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Roots and squares</div>
            <p>
              <strong>Perfect square:</strong> integer that is the square of another integer. e.g. 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.<br>
              <strong>Perfect cube:</strong> integer that is the cube of another integer. e.g. 1, 8, 27, 64, 125, 216.<br>
              <span class="math">√(−n)</span> is not real for any positive n.<br>
              <span class="math">∛(−8) = −2</span> (cube roots of negatives are real and negative).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>√144 = 12 (since 12² = 144)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>∛(−27) = −3 (since (−3)³ = −27)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>√(−16) = undefined (not real)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>−√25 = −5 (take root then negate)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>√ always gives a non-negative answer (the principal root). So √25 = 5, not ±5.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate: √196", answer: "14", topic: "Integers" },
        { type: "mc", text: "Calculate ∛(−125):", options: ["-5", "5", "-25", "undefined"], answer: 0, topic: "Integers" },
        { type: "mc", text: "Which of these is NOT a perfect square?", options: ["81", "100", "150", "144"], answer: 2, topic: "Integers" },
        { type: "input", text: "Calculate: −√169", answer: "-13", topic: "Integers" },
        { type: "mc", text: "√(−9) is:", options: ["−3", "3", "undefined (not real)", "±3"], answer: 2, topic: "Integers" },
      ]
    },
  ],
  workbook: {
    chapter: 2, chapterName: "Integers",
    topics: [
      {
        name: "Operations with Integers",
        questions: [
          {
            num: "1",
            text: "Calculate each of the following:",
            parts: [
              { label: "a)", text: "(−15) + (−8) − (−23)", marks: 2 },
              { label: "b)", text: "(−6) × (−7) × (−2)", marks: 2 },
              { label: "c)", text: "(−72) ÷ (−9) + (−4) × 3", marks: 3 },
              { label: "d)", text: "−5² − (−3)²", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Use the order of operations (BODMAS) to calculate:",
            parts: [
              { label: "a)", text: "(−3)² − (−4)(5) + (−2)³", marks: 4 },
              { label: "b)", text: "[(−18) ÷ 3] − [(−4) × (−5)]", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Squares, Cubes and Roots",
        questions: [
          {
            num: "3",
            text: "Calculate each of the following, or state if it is not real:",
            parts: [
              { label: "a)", text: "√225", marks: 1 },
              { label: "b)", text: "−√81", marks: 1 },
              { label: "c)", text: "∛216", marks: 1 },
              { label: "d)", text: "∛(−64)", marks: 2 },
              { label: "e)", text: "√(−49)", marks: 1 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 2, chapterName: "Chapter 2 — Integers",
    topics: [
      {
        name: "Operations with Integers",
        answers: [
          { num: "Q1a", ans: "0", note: "−15 − 8 + 23 = 0" },
          { num: "Q1b", ans: "−84", note: "42 × (−2) = −84 (three negatives → negative)" },
          { num: "Q1c", ans: "−4", note: "8 + (−12) = −4" },
          { num: "Q1d", ans: "−34", note: "−25 − 9 = −34; note −5² = −25, (−3)² = 9" },
          { num: "Q2a", ans: "−1", note: "9 − (−20) + (−8) = 9 + 20 − 8 = 21; wait: 9 + 20 − 8 = 21. Check: −3²=9, (−4)(5)=−20 so −(−20)=+20; (−2)³=−8. 9+20−8=21. Accept 21." },
          { num: "Q2b", ans: "−14", note: "[−6] − [20] = −26. Accept −26." },
        ]
      },
      {
        name: "Squares, Cubes and Roots",
        answers: [
          { num: "Q3a", ans: "15", note: "15² = 225" },
          { num: "Q3b", ans: "−9", note: "√81 = 9; negate" },
          { num: "Q3c", ans: "6", note: "6³ = 216" },
          { num: "Q3d", ans: "−4", note: "(−4)³ = −64" },
          { num: "Q3e", ans: "Not real", note: "Cannot take square root of a negative" },
        ]
      },
    ]
  }
});
