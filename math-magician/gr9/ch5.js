// Math Magician — Grade 9, Chapter 5 data
// Numeric and Geometric Patterns

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 9,
      chapter: 5,
      name: "Numeric patterns",
      fullName: "Numeric patterns — sequences and general term",
      lesson: {
        heading: "Numeric patterns and the general term",
        sub: "Chapter 5 · Topic 1",
        body: `
          <p>A <strong>sequence</strong> is an ordered list of numbers. In Grade 9 we find the <strong>general term (Tₙ)</strong> — a formula giving any term from its position number n.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Arithmetic sequence</div>
            <p>
              Each term is obtained by adding a constant <strong>common difference (d)</strong>.<br>
              <span class="math">Tₙ = a + (n−1)d</span> where a = first term, d = common difference.<br><br>
              <strong>Finding d:</strong> d = T₂ − T₁ = T₃ − T₂<br>
              <strong>Finding the term:</strong> substitute n into Tₙ formula.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>Sequence: 5, 8, 11, 14, … → d = 3, a = 5</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Tₙ = 5 + (n−1)(3) = 5 + 3n − 3 = 3n + 2</span></div>
            <div class="example-step"><span class="step-num">3</span><span>T₁₀ = 3(10) + 2 = 32. Check: 5, 8, 11, 14, 17, 20, 23, 26, 29, 32 ✓</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Is 50 a term? 3n + 2 = 50 → n = 16. Yes, T₁₆ = 50.</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Is 51 a term? 3n + 2 = 51 → n = 16,33. No (not a natural number).</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>If solving for n gives a non-integer, the number is NOT a term in the sequence.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Find the general term for: 4, 7, 10, 13, …", options: ["Tₙ = 3n + 1", "Tₙ = n + 3", "Tₙ = 4n", "Tₙ = 3n − 1"], answer: 0, topic: "Patterns" },
        { type: "input", text: "For the sequence 2, 5, 8, 11, … find T₁₅.", answer: "44", topic: "Patterns" },
        { type: "mc", text: "Which term of 6, 10, 14, 18, … equals 54?", options: ["T₁₀", "T₁₂", "T₁₃", "T₁₄"], answer: 1, topic: "Patterns" },
        { type: "input", text: "The general term of a sequence is Tₙ = 5n − 3. Find T₈.", answer: "37", topic: "Patterns" },
        { type: "mc", text: "Is 100 a term in the sequence with Tₙ = 3n + 1?", options: ["Yes, T₃₃", "Yes, T₃₄", "No", "Yes, T₃₂"], answer: 2, topic: "Patterns" },
      ]
    },
    {
      id: 10,
      chapter: 5,
      name: "Geometric patterns",
      fullName: "Geometric patterns and diagrams",
      lesson: {
        heading: "Geometric patterns",
        sub: "Chapter 5 · Topic 2",
        body: `
          <p><strong>Geometric patterns</strong> involve shapes arranged in a sequence. We count elements (dots, matches, tiles) and find formulas.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Strategy for geometric patterns</div>
            <p>
              <strong>Step 1:</strong> Draw or examine the pattern carefully.<br>
              <strong>Step 2:</strong> Count the number of elements (dots, lines, squares) for each position.<br>
              <strong>Step 3:</strong> List as a numeric sequence and find the general term.<br>
              <strong>Step 4:</strong> Verify by substituting back into your formula.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Matchstick houses</div>
            <div class="example-step"><span class="step-num">1</span><span>1 house: 6 matches; 2 houses: 11 matches; 3 houses: 16 matches</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Sequence: 6, 11, 16, … → d = 5, a = 6</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Tₙ = 6 + (n−1)(5) = 5n + 1</span></div>
            <div class="example-step"><span class="step-num">4</span><span>T₁₀ = 51 matches for 10 houses</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In many matchstick patterns, each new shape adds d matches. Look for what is added each time, not just the total.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Triangles are made with matchsticks: 1 triangle = 3, 2 = 5, 3 = 7. The general term is:", options: ["Tₙ = 3n", "Tₙ = 2n + 1", "Tₙ = n + 2", "Tₙ = 2n − 1"], answer: 1, topic: "Patterns" },
        { type: "input", text: "Using the triangle matchstick pattern Tₙ = 2n + 1, how many matches for 20 triangles?", answer: "41", topic: "Patterns" },
        { type: "mc", text: "A pattern of squares uses tiles: 1 square = 1, 2 in a row = 4, 3 = 9. This is:", options: ["Arithmetic", "Geometric (multiplication)", "Square numbers", "Fibonacci"], answer: 2, topic: "Patterns" },
        { type: "input", text: "For a dot pattern where Tₙ = n² + 1, find T₆.", answer: "37", topic: "Patterns" },
        { type: "mc", text: "Pattern positions show 4, 9, 16, 25 dots. What is T₁₀?", options: ["100", "101", "121", "36"], answer: 2, topic: "Patterns" },
      ]
    },
  ],
  workbook: {
    chapter: 5, chapterName: "Numeric and Geometric Patterns",
    topics: [
      {
        name: "Numeric Patterns",
        questions: [
          {
            num: "1",
            text: "Consider the sequence: 3, 7, 11, 15, …",
            parts: [
              { label: "a)", text: "Write down the next two terms.", marks: 2 },
              { label: "b)", text: "Determine the general term Tₙ.", marks: 3 },
              { label: "c)", text: "Calculate the 25th term.", marks: 2 },
              { label: "d)", text: "Determine whether 99 is a term. Show all working.", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "The general term of a sequence is Tₙ = 2n² − 1.",
            parts: [
              { label: "a)", text: "Write down the first 4 terms.", marks: 2 },
              { label: "b)", text: "Find the value of n for which Tₙ = 31.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Geometric Patterns",
        questions: [
          {
            num: "3",
            text: "Pentagons are drawn using matchsticks in a row (sharing sides): 1 pentagon = 5, 2 pentagons = 9, 3 = 13.",
            parts: [
              { label: "a)", text: "Write down the general term for the number of matchsticks.", marks: 3 },
              { label: "b)", text: "How many matchsticks are needed for 15 pentagons?", marks: 2 },
              { label: "c)", text: "Can exactly 81 matchsticks make a complete row of pentagons?", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 5, chapterName: "Chapter 5 — Numeric and Geometric Patterns",
    topics: [
      {
        name: "Numeric Patterns",
        answers: [
          { num: "Q1a", ans: "19 and 23", note: "d = 4" },
          { num: "Q1b", ans: "Tₙ = 4n − 1", note: "a = 3, d = 4: Tₙ = 3 + (n−1)(4) = 4n − 1" },
          { num: "Q1c", ans: "99", note: "T₂₅ = 4(25) − 1 = 99" },
          { num: "Q1d", ans: "Yes, T₂₅ = 99", note: "4n − 1 = 99 → n = 25, which is a natural number" },
          { num: "Q2a", ans: "1, 7, 17, 31", note: "2(1)²−1=1; 2(4)−1=7; 2(9)−1=17; 2(16)−1=31" },
          { num: "Q2b", ans: "n = 4", note: "2n²−1=31 → 2n²=32 → n²=16 → n=4" },
        ]
      },
      {
        name: "Geometric Patterns",
        answers: [
          { num: "Q3a", ans: "Tₙ = 4n + 1", note: "a = 5, d = 4; Tₙ = 5 + (n−1)4 = 4n + 1" },
          { num: "Q3b", ans: "61 matchsticks", note: "T₁₅ = 4(15) + 1 = 61" },
          { num: "Q3c", ans: "Yes — 20 pentagons: 4n+1 = 81 → n = 20", note: "n = 20, a natural number" },
        ]
      },
    ]
  }
});
