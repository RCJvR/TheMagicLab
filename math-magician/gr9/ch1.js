// Math Magician — Grade 9, Chapter 1 data
// Number Systems, Ratios, Rates, and Financial Mathematics

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 0,
      chapter: 1,
      name: "Number systems",
      fullName: "Number systems and rational numbers",
      lesson: {
        heading: "Number systems and rational numbers",
        sub: "Chapter 1 · Topic 1",
        body: `
          <p>The <strong>real number system</strong> is a hierarchy of number sets, each contained within the next.</p>
          <div class="def-box">
            <div class="def-box-title">📖 The number hierarchy</div>
            <p>
              <strong>Natural numbers (ℕ):</strong> {1, 2, 3, …} — counting numbers.<br>
              <strong>Whole numbers (ℕ₀):</strong> {0, 1, 2, 3, …} — includes zero.<br>
              <strong>Integers (ℤ):</strong> {…, −2, −1, 0, 1, 2, …} — includes negatives.<br>
              <strong>Rational numbers (ℚ):</strong> any number expressible as <span class="math">p/q</span> where p, q ∈ ℤ, q ≠ 0. Includes all terminating and recurring decimals.<br>
              <strong>Irrational numbers:</strong> non-terminating, non-recurring decimals (e.g. <span class="math">√2, π</span>).<br>
              <strong>Real numbers (ℝ):</strong> all rational and irrational numbers.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Classifying numbers</div>
            <div class="example-step"><span class="step-num">1</span><span>Classify <span class="math">−3</span>: integer ✓, rational ✓, real ✓</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Classify <span class="math">0,\overline{3} = 1/3</span>: rational ✓, real ✓</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Classify <span class="math">√7</span>: irrational ✓, real ✓ (not rational)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Converting recurring decimal: let x = 0,\overline{36} → 100x = 36,\overline{36} → 99x = 36 → x = 36/99 = 4/11</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Every integer is rational (e.g. −5 = −5/1). Not every rational is an integer.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Which of these is irrational?", options: ["0,25", "√9", "√5", "−7"], answer: 2, topic: "Number Systems" },
        { type: "mc", text: "The set of integers is a subset of:", options: ["Natural numbers", "Whole numbers", "Rational numbers", "Irrational numbers"], answer: 2, topic: "Number Systems" },
        { type: "input", text: "Convert 0,<span class='math'>\\overline{27}</span> to a fraction. Give the numerator if the fraction is in simplest form over 99.", answer: "3", topic: "Number Systems" },
        { type: "mc", text: "Which statement is FALSE?", options: ["All naturals are integers", "All integers are rational", "All irrationals are real", "All rationals are integers"], answer: 3, topic: "Number Systems" },
        { type: "input", text: "Write 0,<span class='math'>\\overline{142857}</span> as a fraction (give the denominator).", answer: "7", topic: "Number Systems" },
      ]
    },
    {
      id: 1,
      chapter: 1,
      name: "Ratios and rates",
      fullName: "Ratios, rates and direct/inverse proportion",
      lesson: {
        heading: "Ratios, rates and proportion",
        sub: "Chapter 1 · Topic 2",
        body: `
          <p>A <strong>ratio</strong> compares quantities of the same kind. A <strong>rate</strong> compares quantities of different kinds (e.g. km/h).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key definitions</div>
            <p>
              <strong>Ratio a : b:</strong> for every a units of one quantity there are b units of another.<br>
              <strong>Rate:</strong> ratio with different units — e.g. price per kg, km per litre.<br>
              <strong>Direct proportion:</strong> as one quantity increases, the other increases proportionally. <span class="math">y = kx</span>.<br>
              <strong>Inverse proportion:</strong> as one quantity increases, the other decreases. <span class="math">y = k/x</span>.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Share R 720 in the ratio 3 : 5 : 4 → Total parts = 12; 1 part = R 60 → shares: R 180, R 300, R 240</span></div>
            <div class="example-step"><span class="step-num">2</span><span>If 5 workers take 12 days (inverse proportion), how long for 4 workers? → 5 × 12 = 4 × d → d = 15 days</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Unit rate: 252 km on 18 L → 252 ÷ 18 = 14 km/L</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For inverse proportion, the product stays constant: <span class="math">x₁y₁ = x₂y₂</span>.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Share R 1 200 in the ratio 2 : 3 : 5. The largest share is:", options: ["R 240", "R 360", "R 480", "R 600"], answer: 3, topic: "Ratios" },
        { type: "input", text: "8 taps fill a tank in 6 hours. How many hours would 4 taps take?", answer: "12", topic: "Rates" },
        { type: "mc", text: "Which equation shows inverse proportion between x and y?", options: ["y = 3x", "y = x + 3", "y = 3/x", "y = x²"], answer: 2, topic: "Ratios" },
        { type: "input", text: "A car travels 390 km on 30 litres. Calculate fuel consumption in km per litre.", answer: "13", topic: "Rates" },
        { type: "mc", text: "If y is directly proportional to x and y = 18 when x = 6, find y when x = 10.", options: ["30", "60", "3", "108"], answer: 0, topic: "Ratios" },
      ]
    },
    {
      id: 2,
      chapter: 1,
      name: "Financial mathematics",
      fullName: "Financial mathematics: interest, VAT and exchange rates",
      lesson: {
        heading: "Financial mathematics",
        sub: "Chapter 1 · Topic 3",
        body: `
          <p>Financial mathematics covers calculating interest, taxes, and currency conversions.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key formulas</div>
            <p>
              <strong>Simple interest:</strong> <span class="math">I = P × i × n</span> where P = principal, i = rate (decimal), n = time in years.<br>
              <strong>Compound interest:</strong> <span class="math">A = P(1 + i)ⁿ</span><br>
              <strong>VAT (15%):</strong> VAT-inclusive = price × 1,15<br>
              <strong>Hire purchase:</strong> deposit + (monthly instalment × months)<br>
              <strong>Exchange rate:</strong> multiply or divide depending on currency direction.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>R 5 000 at 8% p.a. simple interest for 3 years: I = 5000 × 0,08 × 3 = R 1 200; Total = R 6 200</span></div>
            <div class="example-step"><span class="step-num">2</span><span>R 10 000 at 9% p.a. compound for 2 years: A = 10 000(1,09)² = 10 000 × 1,1881 = R 11 881</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Exchange rate: 1 USD = R 18,50. Convert $250: 250 × 18,50 = R 4 625</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Compound interest grows faster than simple interest. The difference is noticeable over many years.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate simple interest on R 6 000 at 7% p.a. for 4 years.", answer: "1680", topic: "Finance" },
        { type: "mc", text: "A laptop costs R 12 000 excluding VAT (15%). The VAT-inclusive price is:", options: ["R 13 200", "R 13 600", "R 13 800", "R 12 800"], answer: 2, topic: "Finance" },
        { type: "input", text: "Calculate compound interest on R 8 000 at 10% p.a. for 2 years. Give total amount.", answer: "9680", topic: "Finance" },
        { type: "mc", text: "If 1 GBP = R 23, how many rands for £150?", options: ["R 3 350", "R 3 400", "R 3 450", "R 3 500"], answer: 2, topic: "Finance" },
        { type: "input", text: "A TV costs R 3 500. You pay a 20% deposit and 12 monthly instalments of R 260. What is the total hire purchase cost?", answer: "3820", topic: "Finance" },
      ]
    },
  ],
  workbook: {
    chapter: 1, chapterName: "Number Systems, Ratios, Rates, and Financial Mathematics",
    topics: [
      {
        name: "Number Systems",
        questions: [
          {
            num: "1",
            text: "Classify each number by listing all the sets it belongs to (ℕ, ℕ₀, ℤ, ℚ, irrational, ℝ):",
            parts: [
              { label: "a)", text: "−6", marks: 2 },
              { label: "b)", text: "0", marks: 2 },
              { label: "c)", text: "√11", marks: 2 },
              { label: "d)", text: "2,4̄ (i.e. 2,444…)", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Convert each recurring decimal to a fraction in simplest form:",
            parts: [
              { label: "a)", text: "0,7̄", marks: 3 },
              { label: "b)", text: "0,36̄ (i.e. 0,363636…)", marks: 3 },
              { label: "c)", text: "1,2̄ (i.e. 1,222…)", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Ratios and Rates",
        questions: [
          {
            num: "3",
            text: "Three friends invest in a business in the ratio 4 : 3 : 5. The total investment is R 48 000.",
            parts: [
              { label: "a)", text: "How much does each person invest?", marks: 4 },
              { label: "b)", text: "They make a profit of R 18 000 shared in the same ratio. Calculate each person's share.", marks: 4 },
            ]
          },
          {
            num: "4",
            text: "Six machines produce 480 items per day.",
            parts: [
              { label: "a)", text: "How many items would 9 machines produce in a day? (direct proportion)", marks: 3 },
              { label: "b)", text: "How many days would it take 4 machines to produce 480 items? (inverse proportion)", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Financial Mathematics",
        questions: [
          {
            num: "5",
            text: "A principal of R 15 000 is invested at 6% per annum simple interest for 5 years.",
            parts: [
              { label: "a)", text: "Calculate the interest earned.", marks: 3 },
              { label: "b)", text: "Calculate the total amount at the end of 5 years.", marks: 2 },
            ]
          },
          {
            num: "6",
            text: "R 20 000 is invested at 8% per annum compound interest.",
            parts: [
              { label: "a)", text: "Calculate the amount after 3 years.", marks: 4 },
              { label: "b)", text: "How much more does compound interest earn compared to simple interest over 3 years?", marks: 3 },
            ]
          },
          {
            num: "7",
            text: "The exchange rate is 1 EUR = R 20,40.",
            parts: [
              { label: "a)", text: "Convert €350 to rands.", marks: 2 },
              { label: "b)", text: "Convert R 8 160 to euros.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 1, chapterName: "Chapter 1 — Number Systems, Ratios, Rates, and Financial Mathematics",
    topics: [
      {
        name: "Number Systems",
        answers: [
          { num: "Q1a", ans: "ℤ, ℚ, ℝ", note: "−6 is negative, so not ℕ or ℕ₀" },
          { num: "Q1b", ans: "ℕ₀, ℤ, ℚ, ℝ", note: "0 is in whole numbers and above, rational = 0/1" },
          { num: "Q1c", ans: "Irrational, ℝ", note: "11 is not a perfect square" },
          { num: "Q1d", ans: "ℚ, ℝ", note: "recurring decimal → 22/9, which is rational" },
          { num: "Q2a", ans: "7/9", note: "let x = 0,7̄; 10x = 7,7̄; 9x = 7; x = 7/9" },
          { num: "Q2b", ans: "4/11", note: "100x = 36,36̄; 99x = 36; x = 36/99 = 4/11" },
          { num: "Q2c", ans: "11/9", note: "let x = 1,2̄; 10x = 12,2̄; 9x = 11; x = 11/9" },
        ]
      },
      {
        name: "Ratios and Rates",
        answers: [
          { num: "Q3a", ans: "R 16 000 : R 12 000 : R 20 000", note: "12 parts total; 1 part = R 4 000" },
          { num: "Q3b", ans: "R 6 000 : R 4 500 : R 7 500", note: "1 part of profit = 18 000÷12 = R 1 500" },
          { num: "Q4a", ans: "720 items", note: "direct: 9/6 × 480 = 720" },
          { num: "Q4b", ans: "9 days (accept 1,5 days if working shown)", note: "inverse: 6 × 1 day = 4 × d; d = 6/4 = 1,5 days for 1 day production. For 480: same total work = 4 × d = 6 × 1, d = 1,5" },
        ]
      },
      {
        name: "Financial Mathematics",
        answers: [
          { num: "Q5a", ans: "I = R 4 500", note: "I = 15 000 × 0,06 × 5 = 4 500" },
          { num: "Q5b", ans: "R 19 500", note: "15 000 + 4 500 = 19 500" },
          { num: "Q6a", ans: "R 25 194,24", note: "A = 20 000(1,08)³ = 20 000 × 1,259712 = 25 194,24" },
          { num: "Q6b", ans: "Compound = R 5 194,24; Simple = R 4 800; Difference = R 394,24", note: "Simple: 20000 × 0,08 × 3 = 4800" },
          { num: "Q7a", ans: "R 7 140", note: "350 × 20,40 = 7 140" },
          { num: "Q7b", ans: "€400", note: "8 160 ÷ 20,40 = 400" },
        ]
      },
    ]
  }
});
