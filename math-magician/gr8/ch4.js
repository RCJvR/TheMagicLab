// Math Magician — Grade 8, Chapter 4 data
// Auto-loaded on demand by math-magician-gr8.html

MathMagician.registerChapter(4, {
  topics: [
{
    id: 24,
    chapter: 4,
    name: "Numeric number patterns",
    fullName: "Numeric number patterns",
    lesson: {
      heading: "Numeric number patterns",
      sub: "Chapter 4 · Topic 1",
      body: `
        <p>A <strong>number pattern</strong> (or sequence) is an ordered list of numbers that follow a specific rule. Identifying the rule lets you predict any term.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Key vocabulary</div>
          <p>
            <strong>Term:</strong> each number in the sequence.<br>
            <strong>Common difference (d):</strong> the constant value added or subtracted between consecutive terms.<br>
            <span class="math">d = term₂ − term₁</span><br><br>
            <strong>Arithmetic sequence:</strong> add/subtract the same value each time.<br>
            <em>e.g.</em> <span class="math">3, 7, 11, 15, …</span> (d = 4)<br><br>
            <strong>Geometric sequence:</strong> multiply by the same value each time (covered in Topic 2).<br><br>
            <strong>General term formula (Tₙ):</strong> a formula to find any term.<br>
            For arithmetic: <span class="math">Tₙ = a + (n−1)d</span><br>
            where a = first term, d = common difference, n = term position.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Finding the general term</div>
          <div class="example-step"><span class="step-num">1</span><span>Sequence: <span class="math">5, 9, 13, 17, …</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>a = 5, d = 9 − 5 = 4</span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">Tₙ = 5 + (n−1)(4) = 5 + 4n − 4 = 4n + 1</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Check T₃: <span class="math">4(3) + 1 = 13</span> ✓</span></div>
          <div class="example-step"><span class="step-num">5</span><span>Find T₂₀: <span class="math">4(20) + 1 = 81</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Always verify your general term by substituting n = 1, 2, and 3. If all three match, your formula is correct.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "What is the common difference of: <span class='math'>2, 8, 14, 20, …</span>?", options: ["4", "6", "8", "10"], answer: 1, topic: "Patterns" },
      { type: "input", text: "Find the next two terms: <span class='math'>3, 7, 11, 15, __, __</span> (format: x,y)", answer: "19,23", topic: "Patterns" },
      { type: "mc", text: "The general term of a sequence is <span class='math'>Tₙ = 3n − 1</span>. What is T₅?", options: ["14", "12", "16", "10"], answer: 0, topic: "Patterns" },
      { type: "input", text: "A sequence has a = 4 and d = 5. What is the 10th term?", answer: "49", topic: "Patterns" },
      { type: "mc", text: "Which is the general term for <span class='math'>6, 10, 14, 18, …</span>?", options: ["Tₙ = 4n + 2", "Tₙ = 4n + 6", "Tₙ = 2n + 4", "Tₙ = 6n − 4"], answer: 0, topic: "Patterns" },
    ]
  },
  {
    id: 25,
    chapter: 4,
    name: "Geometric number patterns",
    fullName: "Geometric number patterns",
    lesson: {
      heading: "Geometric number patterns",
      sub: "Chapter 4 · Topic 2",
      body: `
        <p>In a <strong>geometric sequence</strong>, each term is multiplied by a constant value called the <strong>common ratio (r)</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Geometric sequences</div>
          <p>
            <strong>Common ratio (r):</strong> <span class="math">r = term₂ ÷ term₁</span><br><br>
            <strong>Examples:</strong><br>
            <span class="math">2, 6, 18, 54, …</span> → r = 3 (multiply by 3)<br>
            <span class="math">100, 50, 25, 12.5, …</span> → r = 0.5 (divide by 2)<br>
            <span class="math">1, −2, 4, −8, …</span> → r = −2<br><br>
            <strong>Visual/toothpick patterns</strong> are also geometric — count objects and find the multiplying rule.<br><br>
            <strong>Note:</strong> Gr 8 focuses on identifying and extending geometric sequences, not on the formal general term formula.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example</div>
          <div class="example-step"><span class="step-num">1</span><span>Sequence: <span class="math">3, 12, 48, 192, …</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>r = 12 ÷ 3 = 4. Check: 48 ÷ 12 = 4 ✓</span></div>
          <div class="example-step"><span class="step-num">3</span><span>Next term: <span class="math">192 × 4 = 768</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Toothpick pattern</div>
          <div class="example-step"><span class="step-num">1</span><span>Squares made from toothpicks: 4, 7, 10, 13, … (arithmetic, d = 3)</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Triangles: 3, 5, 7, 9, … (arithmetic, d = 2)</span></div>
          <div class="example-step"><span class="step-num">3</span><span>Describe the pattern in words AND as a formula.</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>If terms are increasing by addition → arithmetic. If by multiplication → geometric. Check by dividing consecutive terms.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "What is the common ratio of: <span class='math'>5, 15, 45, 135, …</span>?", options: ["5", "10", "3", "15"], answer: 2, topic: "Patterns" },
      { type: "input", text: "Find the next term: <span class='math'>2, 8, 32, 128, __</span>", answer: "512", topic: "Patterns" },
      { type: "mc", text: "Which sequence is geometric?", options: ["2, 5, 8, 11, …", "3, 6, 12, 24, …", "1, 4, 9, 16, …", "10, 7, 4, 1, …"], answer: 1, topic: "Patterns" },
      { type: "input", text: "A geometric sequence has first term 5 and common ratio 3. What is the 4th term?", answer: "135", topic: "Patterns" },
      { type: "mc", text: "Squares made from toothpicks follow: 4, 7, 10, … What is the 8th term?", options: ["22", "25", "28", "31"], answer: 1, topic: "Patterns" },
    ]
  },
  {
    id: 26,
    chapter: 4,
    name: "Ch 4 Exam focus",
    fullName: "Examination focus exercise",
    lesson: {
      heading: "Chapter 4 — Examination focus",
      sub: "Chapter 4 · Review",
      body: `
        <p>These exam-style questions mix numeric and geometric patterns. You may be asked to identify the type, find the rule, write a formula, or extend the sequence.</p>
        <div class="def-box">
          <div class="def-box-title">📋 Chapter 4 summary</div>
          <p>
            ✅ Arithmetic: constant difference (add/subtract)<br>
            ✅ Geometric: constant ratio (multiply/divide)<br>
            ✅ General term: <span class="math">Tₙ = a + (n−1)d</span> for arithmetic<br>
            ✅ Always verify formula by testing T₁, T₂, T₃<br>
            ✅ For visual patterns: count, tabulate, find the rule
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>In exams, always state whether a sequence is arithmetic or geometric and give the common difference or ratio before finding the formula.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Is <span class='math'>2, 6, 18, 54</span> arithmetic or geometric?", options: ["Arithmetic, d = 4", "Geometric, r = 3", "Arithmetic, d = 3", "Neither"], answer: 1, topic: "Patterns" },
      { type: "input", text: "Find the general term for: <span class='math'>7, 10, 13, 16, …</span> (format: 3n+4)", answer: "3n+4", topic: "Patterns" },
      { type: "mc", text: "The 5th term of a sequence is 23 and d = 4. What is the 1st term?", options: ["3", "7", "11", "5"], answer: 1, topic: "Patterns" },
      { type: "input", text: "A geometric sequence: 1, 3, 9, 27, … What is the 6th term?", answer: "243", topic: "Patterns" },
      { type: "mc", text: "Which general term gives the sequence <span class='math'>5, 8, 11, 14, …</span>?", options: ["Tₙ = 3n + 2", "Tₙ = 2n + 3", "Tₙ = 3n + 1", "Tₙ = n + 4"], answer: 0, topic: "Patterns" },
    ]
  }
  ],
  workbook: {
    chapter: 4, chapterName: "Numeric and Geometric Patterns",
    topics: [
      {
        name: "Arithmetic sequences",
        questions: [
          {
            num: "1",
            text: "Consider the sequence: 4, 11, 18, 25, …",
            parts: [
              { label: "a)", text: "State the type of sequence and the common difference.", marks: 2 },
              { label: "b)", text: "Write down the general term Tₙ.", marks: 3 },
              { label: "c)", text: "Calculate T₁₅.", marks: 2 },
              { label: "d)", text: "Which term of the sequence equals 109?", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "The 3rd term of an arithmetic sequence is 14 and the 7th term is 30.",
            parts: [
              { label: "a)", text: "Find the common difference.", marks: 3 },
              { label: "b)", text: "Find the first term.", marks: 2 },
              { label: "c)", text: "Write the general term.", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Geometric sequences",
        questions: [
          {
            num: "3",
            text: "Consider the sequence: 2, 6, 18, 54, …",
            parts: [
              { label: "a)", text: "Identify the type and state the common ratio.", marks: 2 },
              { label: "b)", text: "Write the next two terms.", marks: 2 },
              { label: "c)", text: "Calculate the 8th term.", marks: 3 },
            ]
          },
          {
            num: "4",
            text: "Toothpicks are arranged in a growing pattern of triangles: 3, 5, 7, 9, …",
            parts: [
              { label: "a)", text: "How many toothpicks are needed for the 6th figure?", marks: 2 },
              { label: "b)", text: "Write a formula for the number of toothpicks in the nth figure.", marks: 3 },
              { label: "c)", text: "A learner has 51 toothpicks. What is the largest figure they can make?", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 4, chapterName: "Chapter 4 — Numeric and Geometric Patterns",
    topics: [
      {
        name: "Arithmetic sequences",
        answers: [
          { num: "Q1a", ans: "Arithmetic; d = 7", note: "11−4 = 7" },
          { num: "Q1b", ans: "Tₙ = 7n − 3", note: "a=4, d=7; Tₙ = 4+(n−1)7 = 4+7n−7 = 7n−3" },
          { num: "Q1c", ans: "T₁₅ = 102", note: "7(15)−3 = 105−3 = 102" },
          { num: "Q1d", ans: "n = 16", note: "7n−3=109 → 7n=112 → n=16" },
          { num: "Q2a", ans: "d = 4", note: "T₇−T₃ = 30−14 = 16; 16÷4 terms apart = 4" },
          { num: "Q2b", ans: "a = 6", note: "T₃ = a+2d; 14 = a+8 → a=6" },
          { num: "Q2c", ans: "Tₙ = 4n + 2", note: "Tₙ = 6+(n−1)4 = 6+4n−4 = 4n+2" },
        ]
      },
      {
        name: "Geometric sequences",
        answers: [
          { num: "Q3a", ans: "Geometric; r = 3", note: "6÷2 = 3; 18÷6 = 3 ✓" },
          { num: "Q3b", ans: "162, 486", note: "54×3=162; 162×3=486" },
          { num: "Q3c", ans: "4 374", note: "T₈ = 2×3⁷ = 2×2187 = 4374" },
          { num: "Q4a", ans: "13 toothpicks", note: "d=2; T₆ = 3+(6−1)2 = 3+10 = 13" },
          { num: "Q4b", ans: "Tₙ = 2n + 1", note: "a=3, d=2; Tₙ = 3+(n−1)2 = 2n+1" },
          { num: "Q4c", ans: "Figure 25", note: "2n+1=51 → 2n=50 → n=25" },
        ]
      },
    ]
  }
});
