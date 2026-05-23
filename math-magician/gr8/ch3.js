// Math Magician — Grade 8, Chapter 3 data
// Auto-loaded on demand by math-magician-gr8.html

MathMagician.registerChapter(3, {
  topics: [
{
    id: 19,
    chapter: 3,
    name: "Exponential form",
    fullName: "Comparing and representing numbers in exponential form",
    lesson: {
      heading: "Representing numbers in exponential form",
      sub: "Chapter 3 · Topic 1",
      body: `
        <p><strong>Exponential notation</strong> is a compact way to write repeated multiplication.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Key terminology</div>
          <p>
            <span class="math">aⁿ</span> is read as "<em>a to the power of n</em>"<br><br>
            <strong>Base (a):</strong> the number being multiplied repeatedly.<br>
            <strong>Exponent / Index (n):</strong> how many times the base is multiplied by itself.<br><br>
            <span class="math">2⁵ = 2 × 2 × 2 × 2 × 2 = 32</span><br>
            <span class="math">(−3)⁴ = (−3)×(−3)×(−3)×(−3) = 81</span><br>
            <span class="math">(−3)³ = (−3)×(−3)×(−3) = −27</span>
          </p>
        </div>
        <div class="def-box">
          <div class="def-box-title">📖 Special exponents</div>
          <p>
            <strong>Zero exponent:</strong> <span class="math">a⁰ = 1</span> for any <span class="math">a ≠ 0</span><br>
            <span class="math">5⁰ = 1</span> &nbsp; <span class="math">(−7)⁰ = 1</span><br><br>
            <strong>Exponent 1:</strong> <span class="math">a¹ = a</span><br>
            <strong>Exponent 2:</strong> called a <em>square</em> &nbsp; <strong>Exponent 3:</strong> called a <em>cube</em>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Writing in expanded and exponential form</div>
          <div class="example-step"><span class="step-num">1</span><span>Write <span class="math">3 × 3 × 3 × 3 × 3</span> in exponential form → <span class="math">3⁵</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Evaluate <span class="math">2⁴</span> → <span class="math">2×2×2×2 = 16</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Evaluate <span class="math">(−2)⁴</span> → <span class="math">16</span> (even power, positive)</span></div>
          <div class="example-step"><span class="step-num">4</span><span>Evaluate <span class="math">(−2)⁵</span> → <span class="math">−32</span> (odd power, negative)</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Note the difference: <span class="math">−3⁴ = −(3⁴) = −81</span> but <span class="math">(−3)⁴ = 81</span>. The bracket changes everything.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Write <span class='math'>5 × 5 × 5 × 5</span> in exponential form (e.g. 5^4)", answer: "5^4", topic: "Exponents" },
      { type: "mc", text: "Evaluate <span class='math'>2⁶</span>", options: ["12", "32", "64", "36"], answer: 2, topic: "Exponents" },
      { type: "mc", text: "What is <span class='math'>(−4)⁰</span>?", options: ["0", "−1", "1", "4"], answer: 2, topic: "Exponents" },
      { type: "input", text: "Evaluate <span class='math'>(−3)⁴</span>", answer: "81", topic: "Exponents" },
      { type: "mc", text: "Which has a negative value?", options: ["(−5)²", "(−2)⁴", "(−3)³", "(−1)¹⁰⁰"], answer: 2, topic: "Exponents" },
      { type: "input", text: "Evaluate <span class='math'>10³</span>", answer: "1000", topic: "Exponents" },
    ]
  },
  {
    id: 20,
    chapter: 3,
    name: "Laws of exponents",
    fullName: "The laws of exponents",
    lesson: {
      heading: "The laws of exponents",
      sub: "Chapter 3 · Topic 2",
      body: `
        <p>The <strong>laws of exponents</strong> allow us to simplify expressions with powers without expanding them fully.</p>
        <div class="def-box">
          <div class="def-box-title">📖 The five laws (same base)</div>
          <p>
            <strong>Law 1 — Multiplication:</strong><br>
            <span class="math">aᵐ × aⁿ = aᵐ⁺ⁿ</span><br>
            <em>Add the exponents when multiplying same base.</em><br>
            <span class="math">3² × 3⁴ = 3⁶ = 729</span><br><br>

            <strong>Law 2 — Division:</strong><br>
            <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
            <em>Subtract the exponents when dividing same base.</em><br>
            <span class="math">5⁵ ÷ 5² = 5³ = 125</span><br><br>

            <strong>Law 3 — Power of a power:</strong><br>
            <span class="math">(aᵐ)ⁿ = aᵐˣⁿ</span><br>
            <em>Multiply the exponents.</em><br>
            <span class="math">(2³)⁴ = 2¹² = 4096</span><br><br>

            <strong>Law 4 — Power of a product:</strong><br>
            <span class="math">(ab)ⁿ = aⁿ × bⁿ</span><br>
            <span class="math">(2×3)⁴ = 2⁴ × 3⁴ = 16 × 81 = 1296</span><br><br>

            <strong>Law 5 — Power of a quotient:</strong><br>
            <span class="math">(a/b)ⁿ = aⁿ/bⁿ</span><br>
            <span class="math">(2/3)³ = 8/27</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Simplification examples</div>
          <div class="example-step"><span class="step-num">1</span><span>Simplify <span class="math">2³ × 2⁵</span> → <span class="math">2⁸ = 256</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Simplify <span class="math">3⁷ ÷ 3⁴</span> → <span class="math">3³ = 27</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Simplify <span class="math">(5²)³</span> → <span class="math">5⁶ = 15 625</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Simplify <span class="math">x⁵ × x³ ÷ x⁴</span> → <span class="math">x⁵⁺³⁻⁴ = x⁴</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>The laws only apply when the <strong>bases are the same</strong>. You cannot simplify <span class="math">2³ × 3²</span> using Law 1.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Simplify <span class='math'>4³ × 4⁵</span>", options: ["4¹⁵", "4⁸", "16⁸", "4²"], answer: 1, topic: "Laws of exponents" },
      { type: "input", text: "Simplify <span class='math'>2⁷ ÷ 2³</span>. Give as a power of 2 (e.g. 2^4)", answer: "2^4", topic: "Laws of exponents" },
      { type: "mc", text: "Simplify <span class='math'>(3²)⁵</span>", options: ["3⁷", "3¹⁰", "9⁵", "3³"], answer: 1, topic: "Laws of exponents" },
      { type: "input", text: "Evaluate <span class='math'>5⁴ ÷ 5⁴</span>", answer: "1", topic: "Laws of exponents" },
      { type: "mc", text: "Simplify <span class='math'>x⁴ × x³ ÷ x²</span>", options: ["x⁵", "x⁹", "x²⁴", "x⁻⁵"], answer: 0, topic: "Laws of exponents" },
      { type: "input", text: "Evaluate <span class='math'>(2²)³</span>", answer: "64", topic: "Laws of exponents" },
      { type: "mc", text: "Simplify <span class='math'>(2 × 3)³</span>", options: ["2³ + 3³", "6³", "2 × 3³", "5³"], answer: 1, topic: "Laws of exponents" },
    ]
  },
  {
    id: 21,
    chapter: 3,
    name: "Mixed operations — exponents",
    fullName: "Mixed operations",
    lesson: {
      heading: "Mixed operations with exponents",
      sub: "Chapter 3 · Topic 3",
      body: `
        <p>Combining the laws of exponents with the four operations requires careful application of <strong>BODMAS and sign rules</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Strategy for mixed operations</div>
          <p>
            1. Deal with <strong>brackets</strong> first — simplify any expression inside.<br>
            2. Apply <strong>exponent laws</strong> to simplify powers.<br>
            3. Then work through <strong>division and multiplication</strong> left to right.<br>
            4. Finally, <strong>addition and subtraction</strong> left to right.<br><br>
            Keep track of <strong>negative bases</strong> at every step.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate: <span class="math">2³ × 3² − (2²)² ÷ 4</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Orders: <span class="math">2³=8</span>, <span class="math">3²=9</span>, <span class="math">(2²)²=2⁴=16</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>× and ÷: <span class="math">8×9=72</span>, <span class="math">16÷4=4</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>−: <span class="math">72 − 4 = 68</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ With negative bases</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate: <span class="math">(−2)³ + 3² × (−1)⁵</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Orders: <span class="math">(−2)³=−8</span>, <span class="math">3²=9</span>, <span class="math">(−1)⁵=−1</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>×: <span class="math">9×(−1)=−9</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>+: <span class="math">−8 + (−9) = −17</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Simplify all powers to their numeric values before doing any addition or subtraction. This avoids confusion with signs.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Calculate: <span class='math'>2⁴ + 3³ − 5²</span>", answer: "18", topic: "Mixed ops" },
      { type: "mc", text: "What is <span class='math'>(−1)⁷ × 2³ + 3²</span>?", options: ["1", "9", "−8", "17"], answer: 0, topic: "Mixed ops" },
      { type: "input", text: "Calculate: <span class='math'>4² ÷ 2³ × (−1)⁴</span>", answer: "2", topic: "Mixed ops" },
      { type: "mc", text: "Simplify: <span class='math'>2³ × 2² − (2²)²</span>", options: ["−6", "0", "−3", "32"], answer: 1, topic: "Mixed ops" },
      { type: "input", text: "Calculate: <span class='math'>5² − (−2)³ × 3</span>", answer: "49", topic: "Mixed ops" },
    ]
  },
  {
    id: 22,
    chapter: 3,
    name: "Scientific notation",
    fullName: "Scientific notation",
    lesson: {
      heading: "Scientific notation",
      sub: "Chapter 3 · Topic 4",
      body: `
        <p><strong>Scientific notation</strong> (also called standard form) uses powers of 10 to write very large or very small numbers compactly.</p>
        <div class="def-box">
          <div class="def-box-title">📖 The form</div>
          <p>
            A number in scientific notation is written as:<br>
            <span class="math">a × 10ⁿ</span><br>
            where <span class="math">1 ≤ a &lt; 10</span> and n is an integer.<br><br>
            <strong>Large numbers:</strong> n is positive<br>
            <span class="math">3 400 000 = 3.4 × 10⁶</span><br><br>
            <strong>Small numbers:</strong> n is negative<br>
            <span class="math">0.000052 = 5.2 × 10⁻⁵</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Converting to scientific notation</div>
          <div class="example-step"><span class="step-num">1</span><span>Write <span class="math">47 200</span> in scientific notation.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Move the decimal point left until you have a number between 1 and 10: <span class="math">4.72</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Count the moves: 4 places → <span class="math">4.72 × 10⁴</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Converting from scientific notation</div>
          <div class="example-step"><span class="step-num">1</span><span>Write <span class="math">6.3 × 10⁵</span> as a normal number.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Move decimal 5 places right: <span class="math">630 000</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>The power of 10 tells you how many places to move the decimal. Positive → right (bigger). Negative → left (smaller).</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Write <span class='math'>56 000</span> in scientific notation.", options: ["5.6 × 10³", "56 × 10³", "5.6 × 10⁴", "0.56 × 10⁵"], answer: 2, topic: "Scientific notation" },
      { type: "input", text: "Write <span class='math'>3.8 × 10⁵</span> as an ordinary number.", answer: "380000", topic: "Scientific notation" },
      { type: "mc", text: "Which is correct scientific notation for <span class='math'>0.00042</span>?", options: ["4.2 × 10⁻³", "4.2 × 10⁻⁴", "42 × 10⁻⁵", "0.42 × 10⁻³"], answer: 1, topic: "Scientific notation" },
      { type: "input", text: "Write <span class='math'>7 250 000</span> in scientific notation (use format like 7.25e6 or 7.25 × 10^6)", answer: "7.25 × 10^6", topic: "Scientific notation" },
      { type: "mc", text: "The distance from Earth to the Sun is about <span class='math'>1.5 × 10⁸</span> km. What is this as an ordinary number?", options: ["1 500 000", "15 000 000", "150 000 000", "1 500 000 000"], answer: 2, topic: "Scientific notation" },
    ]
  },
  {
    id: 23,
    chapter: 3,
    name: "Ch 3 Exam focus",
    fullName: "Examination focus exercise",
    lesson: {
      heading: "Chapter 3 — Examination focus",
      sub: "Chapter 3 · Review",
      body: `
        <p>These exam-style questions cover all Chapter 3 content. Apply the laws carefully and show all working.</p>
        <div class="def-box">
          <div class="def-box-title">📋 Chapter 3 summary</div>
          <p>
            ✅ <span class="math">aⁿ</span>: base a multiplied n times<br>
            ✅ <span class="math">a⁰ = 1</span> (any non-zero base)<br>
            ✅ Multiply same base: <span class="math">aᵐ × aⁿ = aᵐ⁺ⁿ</span><br>
            ✅ Divide same base: <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
            ✅ Power of a power: <span class="math">(aᵐ)ⁿ = aᵐⁿ</span><br>
            ✅ Even power of negative = positive; odd = negative<br>
            ✅ Scientific notation: <span class="math">a × 10ⁿ</span>, where <span class="math">1 ≤ a &lt; 10</span>
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>In exams, always check: are the bases the same before applying a law? Is the base negative? How many decimal places to move?</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Simplify: <span class='math'>2⁴ × 2³ ÷ (2²)²</span>", options: ["2³", "2⁵", "2¹¹", "2"], answer: 0, topic: "Mixed" },
      { type: "input", text: "Calculate: <span class='math'>(−2)⁴ + (−3)³ + 5⁰</span>", answer: "-10", topic: "Mixed" },
      { type: "mc", text: "Write <span class='math'>0.000307</span> in correct scientific notation.", options: ["3.07 × 10⁻³", "3.07 × 10⁻⁴", "30.7 × 10⁻⁵", "0.307 × 10⁻³"], answer: 1, topic: "Scientific notation" },
      { type: "input", text: "Simplify: <span class='math'>x⁶ × x² ÷ (x²)³</span> (give as x^n)", answer: "x^2", topic: "Laws" },
      { type: "mc", text: "Which is the largest: <span class='math'>2⁸</span>, <span class='math'>3⁵</span>, <span class='math'>4⁴</span>, <span class='math'>5³</span>?", options: ["3⁵ = 243", "4⁴ = 256", "2⁸ = 256", "5³ = 125"], answer: 1, topic: "Mixed" },
      { type: "input", text: "The mass of a proton is <span class='math'>1.67 × 10⁻²⁷</span> kg. Write the decimal form (use e notation, e.g. 1.67e-27)", answer: "1.67e-27", topic: "Scientific notation" },
    ]
  }
  ],
  workbook: {
    chapter: 3, chapterName: "Exponents",
    topics: [
      {
        name: "Laws of exponents",
        questions: [
          {
            num: "1",
            text: "Simplify, leaving answers in exponential form:",
            parts: [
              { label: "a)", text: "3⁴ × 3⁶ ÷ 3⁵", marks: 2 },
              { label: "b)", text: "(2³)⁴ ÷ 2⁸", marks: 3 },
              { label: "c)", text: "x⁵ × x³ ÷ (x²)³", marks: 3 },
              { label: "d)", text: "(3² × 3⁰) ÷ 3³", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Scientific notation & mixed",
        questions: [
          {
            num: "2",
            text: "Write in scientific notation:",
            parts: [
              { label: "a)", text: "0,000 000 45", marks: 2 },
              { label: "b)", text: "8 700 000", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "Calculate without a calculator:",
            parts: [
              { label: "a)", text: "2⁵ − (−3)² + 4⁰ × (−2)³", marks: 4 },
              { label: "b)", text: "(2²)³ ÷ (2³)² × 2", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 3, chapterName: "Chapter 3 — Exponents",
    topics: [
      {
        name: "Laws of exponents",
        answers: [
          { num: "Q1a", ans: "3⁵", note: "4+6=10, then 10−5=5" },
          { num: "Q1b", ans: "2⁴ = 16", note: "(2³)⁴ = 2¹²; 2¹²÷2⁸ = 2⁴ = 16" },
          { num: "Q1c", ans: "x²", note: "x⁵⁺³ = x⁸; (x²)³ = x⁶; x⁸÷x⁶ = x²" },
          { num: "Q1d", ans: "3⁻¹ = 1/3", note: "3²×3⁰ = 3²×1 = 3²; 3²÷3³ = 3⁻¹" },
        ]
      },
      {
        name: "Scientific notation & mixed",
        answers: [
          { num: "Q2a", ans: "4,5 × 10⁻⁷", note: "Move decimal 7 places right" },
          { num: "Q2b", ans: "8,7 × 10⁶", note: "Move decimal 6 places left" },
          { num: "Q3a", ans: "32 − 9 + 1 × (−8) = 15", note: "32−9=23; 4⁰×(−2)³ = 1×(−8) = −8; 23+(−8)=15" },
          { num: "Q3b", ans: "2¹", note: "2⁶÷2⁶×2 = 2⁰×2 = 1×2 = 2" },
        ]
      },
    ]
  }
});
