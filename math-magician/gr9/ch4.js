// Math Magician — Grade 9, Chapter 4 data
// Exponents

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 7,
      chapter: 4,
      name: "Laws of exponents",
      fullName: "The laws of exponents",
      lesson: {
        heading: "The laws of exponents",
        sub: "Chapter 4 · Topic 1",
        body: `
          <p>Exponent laws allow us to simplify expressions involving powers efficiently.</p>
          <div class="def-box">
            <div class="def-box-title">📖 The seven laws</div>
            <p>
              <strong>1. Product:</strong> <span class="math">aᵐ × aⁿ = aᵐ⁺ⁿ</span><br>
              <strong>2. Quotient:</strong> <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
              <strong>3. Power of a power:</strong> <span class="math">(aᵐ)ⁿ = aᵐⁿ</span><br>
              <strong>4. Power of a product:</strong> <span class="math">(ab)ⁿ = aⁿbⁿ</span><br>
              <strong>5. Power of a quotient:</strong> <span class="math">(a/b)ⁿ = aⁿ/bⁿ</span><br>
              <strong>6. Zero exponent:</strong> <span class="math">a⁰ = 1</span> (a ≠ 0)<br>
              <strong>7. Negative exponent:</strong> <span class="math">a⁻ⁿ = 1/aⁿ</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>x³ × x⁵ = x⁸</span></div>
            <div class="example-step"><span class="step-num">2</span><span>y⁷ ÷ y³ = y⁴</span></div>
            <div class="example-step"><span class="step-num">3</span><span>(2x²)³ = 8x⁶</span></div>
            <div class="example-step"><span class="step-num">4</span><span>3⁻² = 1/9</span></div>
            <div class="example-step"><span class="step-num">5</span><span>(5xy)⁰ = 1</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The base must be the SAME to use the product and quotient laws. You cannot simplify x³ × y⁵ using these laws.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Simplify: a⁴ × a⁻² ÷ a", options: ["a⁵", "a³", "a¹", "a⁻¹"], answer: 2, topic: "Exponents" },
        { type: "input", text: "Simplify (3x²y)² and give the coefficient of x⁴y².", answer: "9", topic: "Exponents" },
        { type: "mc", text: "Write 2⁻³ as a fraction:", options: ["−8", "1/6", "1/8", "−1/8"], answer: 2, topic: "Exponents" },
        { type: "input", text: "Simplify: (2³)⁴ ÷ 2⁸ — give the answer as a power of 2 (exponent only).", answer: "4", topic: "Exponents" },
        { type: "mc", text: "What is (7xy²z)⁰ equal to?", options: ["0", "7", "1", "xyz"], answer: 2, topic: "Exponents" },
      ]
    },
    {
      id: 8,
      chapter: 4,
      name: "Scientific notation",
      fullName: "Scientific notation and exponent calculations",
      lesson: {
        heading: "Scientific notation",
        sub: "Chapter 4 · Topic 2",
        body: `
          <p><strong>Scientific notation</strong> expresses numbers in the form <span class="math">a × 10ⁿ</span> where <span class="math">1 ≤ a < 10</span> and n is an integer.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Converting to/from scientific notation</div>
            <p>
              <strong>Large number → SN:</strong> move decimal left; count moves = positive exponent.<br>
              e.g. 3 450 000 = 3,45 × 10⁶<br><br>
              <strong>Small number → SN:</strong> move decimal right; count moves = negative exponent.<br>
              e.g. 0,00047 = 4,7 × 10⁻⁴<br><br>
              <strong>SN → decimal:</strong> move decimal in the direction indicated by sign of exponent.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Calculating with scientific notation</div>
            <div class="example-step"><span class="step-num">1</span><span>(3 × 10⁴) × (2 × 10³) = 6 × 10⁷</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(8 × 10⁵) ÷ (2 × 10²) = 4 × 10³</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Convert: 5,6 × 10⁻³ = 0,0056</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>After multiplying/dividing, check that the coefficient is between 1 and 10. If not, adjust the power of 10.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Write 0,000052 in scientific notation:", options: ["5,2 × 10⁴", "5,2 × 10⁻⁵", "52 × 10⁻⁶", "0,52 × 10⁻⁴"], answer: 1, topic: "Exponents" },
        { type: "input", text: "Write 7 890 000 in scientific notation. Give the exponent of 10.", answer: "6", topic: "Exponents" },
        { type: "mc", text: "Calculate: (4 × 10³) × (3 × 10⁵)", options: ["12 × 10⁸", "1,2 × 10⁹", "7 × 10⁸", "12 × 10¹⁵"], answer: 1, topic: "Exponents" },
        { type: "input", text: "Write 2,04 × 10⁻³ as a decimal.", answer: "0.00204", topic: "Exponents" },
        { type: "mc", text: "Simplify: (6 × 10⁶) ÷ (2 × 10²)", options: ["3 × 10⁴", "3 × 10³", "4 × 10⁴", "3 × 10⁸"], answer: 0, topic: "Exponents" },
      ]
    },
  ],
  workbook: {
    chapter: 4, chapterName: "Exponents",
    topics: [
      {
        name: "Laws of Exponents",
        questions: [
          {
            num: "1",
            text: "Simplify each expression:",
            parts: [
              { label: "a)", text: "x⁵ × x³ ÷ x⁴", marks: 2 },
              { label: "b)", text: "(2a³b)⁴", marks: 3 },
              { label: "c)", text: "3⁰ + 2⁻¹ + 4⁻²", marks: 4 },
              { label: "d)", text: "(x²y⁻³)² ÷ (x⁻¹y)", marks: 5 },
            ]
          },
          {
            num: "2",
            text: "Evaluate without a calculator:",
            parts: [
              { label: "a)", text: "2³ × 2⁻¹ × 2⁴", marks: 3 },
              { label: "b)", text: "(3²)³ ÷ 3⁴", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Scientific Notation",
        questions: [
          {
            num: "3",
            text: "Write in scientific notation:",
            parts: [
              { label: "a)", text: "45 300 000", marks: 2 },
              { label: "b)", text: "0,00000082", marks: 2 },
            ]
          },
          {
            num: "4",
            text: "Calculate, leaving your answer in scientific notation:",
            parts: [
              { label: "a)", text: "(5 × 10⁷) × (6 × 10⁴)", marks: 3 },
              { label: "b)", text: "(9 × 10⁸) ÷ (3 × 10⁻²)", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 4, chapterName: "Chapter 4 — Exponents",
    topics: [
      {
        name: "Laws of Exponents",
        answers: [
          { num: "Q1a", ans: "x⁴", note: "5 + 3 − 4 = 4" },
          { num: "Q1b", ans: "16a¹²b⁴", note: "2⁴ = 16; a³ˣ⁴ = a¹²; b⁴" },
          { num: "Q1c", ans: "1 + 1/2 + 1/16 = 25/16 = 1,5625", note: "1 + 0,5 + 0,0625 = 1,5625" },
          { num: "Q1d", ans: "x⁵/y⁷", note: "x⁴y⁻⁶ ÷ x⁻¹y = x⁴⁺¹ y⁻⁶⁻¹ = x⁵y⁻⁷ = x⁵/y⁷" },
          { num: "Q2a", ans: "64", note: "2^(3−1+4) = 2⁶ = 64" },
          { num: "Q2b", ans: "3² = 9", note: "3⁶ ÷ 3⁴ = 3²= 9" },
        ]
      },
      {
        name: "Scientific Notation",
        answers: [
          { num: "Q3a", ans: "4,53 × 10⁷", note: "Decimal moves 7 places left" },
          { num: "Q3b", ans: "8,2 × 10⁻⁷", note: "Decimal moves 7 places right" },
          { num: "Q4a", ans: "3 × 10¹²", note: "30 × 10¹¹ = 3 × 10¹²" },
          { num: "Q4b", ans: "3 × 10¹⁰", note: "9÷3 = 3; 10^(8−(−2)) = 10¹⁰" },
        ]
      },
    ]
  }
});
