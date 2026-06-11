// Math Magician — Grade 9, Chapter 3 data
// Common & Decimal Fractions

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 5,
      chapter: 3,
      name: "Common fractions",
      fullName: "Operations with common fractions",
      lesson: {
        heading: "Operations with common fractions",
        sub: "Chapter 3 · Topic 1",
        body: `
          <p>Common fractions represent parts of a whole. In Grade 9 we work with all four operations on fractions, including mixed numbers.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Operations summary</div>
            <p>
              <strong>Add/Subtract:</strong> find the LCD, convert, then add/subtract numerators.<br>
              <strong>Multiply:</strong> multiply numerators × numerators, denominators × denominators. Simplify first if possible.<br>
              <strong>Divide:</strong> multiply by the reciprocal of the divisor (KCF: Keep, Change, Flip).<br>
              <strong>Mixed numbers:</strong> convert to improper fractions before operating, then convert back.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>3/4 + 5/6 → LCD = 12 → 9/12 + 10/12 = 19/12 = 1 7/12</span></div>
            <div class="example-step"><span class="step-num">2</span><span>2 1/3 × 1 1/2 = 7/3 × 3/2 = 21/6 = 7/2 = 3 1/2</span></div>
            <div class="example-step"><span class="step-num">3</span><span>3/4 ÷ 9/8 = 3/4 × 8/9 = 24/36 = 2/3</span></div>
            <div class="example-step"><span class="step-num">4</span><span>4 − 1 3/5 = 4 − 8/5 = 20/5 − 8/5 = 12/5 = 2 2/5</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always simplify before multiplying — cancel common factors between any numerator and any denominator to keep numbers small.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Calculate: 2/3 + 3/4", options: ["5/7", "17/12", "5/12", "6/7"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate: 3 1/2 × 2 2/3 (give answer as improper fraction numerator over 3)", answer: "28", topic: "Fractions" },
        { type: "mc", text: "Calculate: 5/6 ÷ 5/12", options: ["1/2", "2", "25/72", "10/6"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate: 4 1/4 − 2 3/4 (give answer as a mixed number numerator + denominator as 2-digit number e.g. 1 1/2 = write 3 for 1+1+... — just write: 1.5 → write 3/2 → write numerator 3)", answer: "3", topic: "Fractions" },
        { type: "mc", text: "Which fraction is equivalent to 3 3/7?", options: ["24/7", "21/7", "24/3", "21/3"], answer: 0, topic: "Fractions" },
      ]
    },
    {
      id: 6,
      chapter: 3,
      name: "Decimal fractions",
      fullName: "Decimal fractions and conversion",
      lesson: {
        heading: "Decimal fractions and conversion",
        sub: "Chapter 3 · Topic 2",
        body: `
          <p>Decimal fractions extend place value beyond the units column. Converting between fractions and decimals is an essential skill.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Conversion rules</div>
            <p>
              <strong>Fraction → Decimal:</strong> divide numerator by denominator.<br>
              <strong>Terminating decimal → Fraction:</strong> write digits over 10/100/1000 etc., simplify.<br>
              <strong>Recurring decimal → Fraction:</strong> use the algebraic method (multiply by 10ⁿ where n = recurring block length).<br>
              <strong>Percentage → Decimal:</strong> divide by 100.<br>
              <strong>Decimal → Percentage:</strong> multiply by 100.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>0,625 = 625/1000 = 5/8</span></div>
            <div class="example-step"><span class="step-num">2</span><span>5/11: 5 ÷ 11 = 0,4̄5̄ (recurring)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Convert 0,83̄: let x = 0,83̄; 10x = 8,3̄; 9x = 7,5; x = 7,5/9 = 15/18 = 5/6</span></div>
            <div class="example-step"><span class="step-num">4</span><span>0,36 × 100 = 36% and 36% ÷ 100 = 0,36</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>When converting a recurring decimal, the number of 9s in the denominator equals the length of the recurring block.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Write 0,375 as a fraction in simplest form:", options: ["375/1000", "3/8", "37/100", "7/20"], answer: 1, topic: "Decimals" },
        { type: "input", text: "Convert 7/8 to a decimal.", answer: "0.875", topic: "Decimals" },
        { type: "mc", text: "Express 0,2̄ (= 0,222…) as a fraction:", options: ["2/9", "1/5", "2/10", "22/99"], answer: 0, topic: "Decimals" },
        { type: "input", text: "Convert 0,45 to a percentage.", answer: "45", topic: "Decimals" },
        { type: "mc", text: "Which decimal is equivalent to 5/12?", options: ["0,416̄", "0,41̄6̄", "0,4166…", "Both a) and c)"], answer: 3, topic: "Decimals" },
      ]
    },
  ],
  workbook: {
    chapter: 3, chapterName: "Common & Decimal Fractions",
    topics: [
      {
        name: "Common Fractions",
        questions: [
          {
            num: "1",
            text: "Calculate, simplifying all answers:",
            parts: [
              { label: "a)", text: "3/5 + 7/10 − 1/2", marks: 3 },
              { label: "b)", text: "4/9 × 3/8 ÷ 1/6", marks: 4 },
              { label: "c)", text: "2 3/4 + 1 5/6", marks: 3 },
              { label: "d)", text: "3 1/3 ÷ 2 1/2", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Decimal Fractions",
        questions: [
          {
            num: "2",
            text: "Convert each decimal to a fraction in simplest form:",
            parts: [
              { label: "a)", text: "0,48", marks: 2 },
              { label: "b)", text: "1,64", marks: 2 },
              { label: "c)", text: "0,5̄ (0,555…)", marks: 3 },
              { label: "d)", text: "0,81̄ (0,8111…)", marks: 4 },
            ]
          },
          {
            num: "3",
            text: "Convert each fraction to a decimal (indicate recurring decimals with dot notation):",
            parts: [
              { label: "a)", text: "7/8", marks: 2 },
              { label: "b)", text: "5/9", marks: 2 },
              { label: "c)", text: "4/15", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 3, chapterName: "Chapter 3 — Common & Decimal Fractions",
    topics: [
      {
        name: "Common Fractions",
        answers: [
          { num: "Q1a", ans: "4/5", note: "LCD = 10: 6/10 + 7/10 − 5/10 = 8/10 = 4/5" },
          { num: "Q1b", ans: "1", note: "4/9 × 3/8 = 12/72 = 1/6; then 1/6 ÷ 1/6 = 1" },
          { num: "Q1c", ans: "4 7/12", note: "11/4 + 11/6 = 33/12 + 22/12 = 55/12 = 4 7/12" },
          { num: "Q1d", ans: "1 1/3", note: "10/3 ÷ 5/2 = 10/3 × 2/5 = 20/15 = 4/3 = 1 1/3" },
        ]
      },
      {
        name: "Decimal Fractions",
        answers: [
          { num: "Q2a", ans: "12/25", note: "48/100 = 12/25" },
          { num: "Q2b", ans: "1 16/25", note: "164/100 = 41/25 = 1 16/25" },
          { num: "Q2c", ans: "5/9", note: "x = 0,5̄; 10x = 5,5̄; 9x = 5; x = 5/9" },
          { num: "Q2d", ans: "73/90", note: "let x = 0,81̄; 10x = 8,1̄; 90x = 73; x = 73/90" },
          { num: "Q3a", ans: "0,875", note: "7 ÷ 8 = 0,875" },
          { num: "Q3b", ans: "0,5̄", note: "5 ÷ 9 = 0,555…" },
          { num: "Q3c", ans: "0,26̄", note: "4 ÷ 15 = 0,2666…" },
        ]
      },
    ]
  }
});
