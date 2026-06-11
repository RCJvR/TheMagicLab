// Math Magician — Grade 9, Chapter 13 data
// Pythagoras' Theorem

MathMagician.registerChapter(13, {
  topics: [
    {
      id: 25,
      chapter: 13,
      name: "Pythagoras' theorem",
      fullName: "Pythagoras' theorem — finding sides",
      lesson: {
        heading: "Pythagoras' theorem",
        sub: "Chapter 13 · Topic 1",
        body: `
          <p><strong>Pythagoras' theorem</strong> states that in any right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.</p>
          <div class="def-box">
            <div class="def-box-title">📖 The theorem</div>
            <p>
              In △ABC with right angle at C:<br>
              <span class="math">c² = a² + b²</span><br>
              where c is the hypotenuse (side opposite the right angle).<br><br>
              <strong>To find hypotenuse:</strong> <span class="math">c = √(a² + b²)</span><br>
              <strong>To find a shorter side:</strong> <span class="math">a = √(c² − b²)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>a = 6, b = 8: c = √(36 + 64) = √100 = 10</span></div>
            <div class="example-step"><span class="step-num">2</span><span>c = 13, b = 5: a = √(169 − 25) = √144 = 12</span></div>
            <div class="example-step"><span class="step-num">3</span><span>a = 7, b = 11: c = √(49 + 121) = √170 ≈ 13,04</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Pythagorean triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25) — memorise these!</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always identify the hypotenuse first — it's always opposite the right angle and always the longest side.</span></div>
        `
      },
      questions: [
        { type: "input", text: "In a right triangle, legs are 9 cm and 12 cm. Find the hypotenuse.", answer: "15", topic: "Pythagoras" },
        { type: "mc", text: "The hypotenuse is 17 cm and one leg is 8 cm. The other leg is:", options: ["9 cm", "15 cm", "√225 = 15 cm", "√353 cm"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "Calculate: √(5² + 12²)", answer: "13", topic: "Pythagoras" },
        { type: "mc", text: "Is a triangle with sides 9, 40, 41 a right triangle?", options: ["Yes", "No", "Cannot determine", "Only if angles given"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "A ladder 10 m long leans against a wall. The foot is 6 m from the wall. How high up the wall does it reach?", answer: "8", topic: "Pythagoras" },
      ]
    },
    {
      id: 26,
      chapter: 13,
      name: "Applications of Pythagoras",
      fullName: "Applications of Pythagoras' theorem",
      lesson: {
        heading: "Applications of Pythagoras' theorem",
        sub: "Chapter 13 · Topic 2",
        body: `
          <p>Pythagoras' theorem applies in many real-world contexts and in more complex geometric problems.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Common applications</div>
            <p>
              <strong>Diagonal of a rectangle:</strong> d = √(l² + b²)<br>
              <strong>Height of isosceles triangle:</strong> split into two right triangles<br>
              <strong>Distance between two points:</strong> d = √[(x₂−x₁)² + (y₂−y₁)²]<br>
              <strong>Converse (testing for right angle):</strong> if a² + b² = c², the triangle is right-angled.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Diagonal of 5 cm × 12 cm rectangle: d = √(25 + 144) = √169 = 13 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Isosceles triangle: base = 16 cm, equal sides = 10 cm. Height: h = √(10² − 8²) = √(100 − 64) = √36 = 6 cm</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Distance: A(1;2) to B(4;6): d = √(9+16) = √25 = 5 units</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In isosceles triangle problems, the altitude from the apex bisects the base, creating two identical right triangles.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the diagonal of a rectangle with length 24 cm and width 7 cm.", answer: "25", topic: "Pythagoras" },
        { type: "mc", text: "An isosceles triangle has equal sides of 13 cm and a base of 10 cm. Its height is:", options: ["12 cm", "8 cm", "10 cm", "√119 cm"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "Find the distance between points (0;0) and (3;4).", answer: "5", topic: "Pythagoras" },
        { type: "mc", text: "A triangle has sides 7, 24, 25. Is it right-angled?", options: ["Yes, 7²+24²=625=25²", "No", "Yes, 7+24=25", "Cannot tell"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "A square has diagonal 10√2 cm. Find the side length of the square.", answer: "10", topic: "Pythagoras" },
      ]
    },
  ],
  workbook: {
    chapter: 13, chapterName: "Pythagoras' Theorem",
    topics: [
      {
        name: "Pythagoras — Finding Sides",
        questions: [
          {
            num: "1",
            text: "Calculate the unknown side in each right-angled triangle (leave surds in surd form where the answer is not exact):",
            parts: [
              { label: "a)", text: "Legs: 15 cm and 20 cm. Find hypotenuse.", marks: 3 },
              { label: "b)", text: "Hypotenuse: 26 cm, one leg: 10 cm. Find the other leg.", marks: 3 },
              { label: "c)", text: "Legs: 7 cm and 9 cm. Find hypotenuse (leave in surd form).", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Applications",
        questions: [
          {
            num: "2",
            text: "A rectangular garden is 30 m long and 16 m wide. A path runs diagonally across it.",
            parts: [
              { label: "a)", text: "Calculate the length of the diagonal path.", marks: 3 },
              { label: "b)", text: "A fence post is placed at the midpoint of the diagonal. How far is this from each corner of the rectangle?", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "An equilateral triangle has side length 12 cm.",
            parts: [
              { label: "a)", text: "Find the height of the triangle using Pythagoras' theorem.", marks: 4 },
              { label: "b)", text: "Hence find the area of the triangle.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 13, chapterName: "Chapter 13 — Pythagoras' Theorem",
    topics: [
      {
        name: "Pythagoras — Finding Sides",
        answers: [
          { num: "Q1a", ans: "25 cm", note: "√(225+400) = √625 = 25" },
          { num: "Q1b", ans: "24 cm", note: "√(676−100) = √576 = 24" },
          { num: "Q1c", ans: "√130 cm ≈ 11,4 cm", note: "√(49+81) = √130" },
        ]
      },
      {
        name: "Applications",
        answers: [
          { num: "Q2a", ans: "34 m", note: "√(900+256) = √1156 = 34" },
          { num: "Q2b", ans: "17 m", note: "Half of 34 m" },
          { num: "Q3a", ans: "6√3 ≈ 10,39 cm", note: "h = √(12² − 6²) = √(144−36) = √108 = 6√3" },
          { num: "Q3b", ans: "36√3 ≈ 62,35 cm²", note: "A = ½ × 12 × 6√3 = 36√3" },
        ]
      },
    ]
  }
});
