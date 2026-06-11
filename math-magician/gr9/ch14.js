// Math Magician — Grade 9, Chapter 14 data
// Area and Perimeter

MathMagician.registerChapter(14, {
  topics: [
    {
      id: 27,
      chapter: 14,
      name: "Perimeter",
      fullName: "Perimeter of 2D shapes",
      lesson: {
        heading: "Perimeter of 2D shapes",
        sub: "Chapter 14 · Topic 1",
        body: `
          <p><strong>Perimeter</strong> is the total length of the boundary of a 2D shape.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Perimeter formulas</div>
            <p>
              <strong>Rectangle:</strong> P = 2(l + b)<br>
              <strong>Square:</strong> P = 4s<br>
              <strong>Triangle:</strong> P = a + b + c<br>
              <strong>Circle (circumference):</strong> C = 2πr = πd<br>
              <strong>Semicircle:</strong> P = πr + 2r (arc + diameter)<br>
              <strong>Composite shapes:</strong> add only the exposed outer edges.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Rectangle 8 cm × 5 cm: P = 2(8 + 5) = 26 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Circle radius 7 cm: C = 2π(7) ≈ 43,98 cm</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Semicircle radius 6 cm: P = π(6) + 2(6) = 6π + 12 ≈ 30,85 cm</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For composite shapes, sketch and highlight the boundary. Don't include internal edges — only the outer boundary counts.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the perimeter of a rectangle with length 11 cm and breadth 7 cm.", answer: "36", topic: "Perimeter" },
        { type: "mc", text: "Find the circumference of a circle with diameter 10 cm. (Use π ≈ 3,14)", options: ["31,4 cm", "15,7 cm", "62,8 cm", "78,5 cm"], answer: 0, topic: "Perimeter" },
        { type: "input", text: "A square has perimeter 52 cm. Find the side length.", answer: "13", topic: "Perimeter" },
        { type: "mc", text: "The perimeter of a semicircle with radius 5 cm is approximately:", options: ["15,7 cm", "25,7 cm", "10 cm", "20 cm"], answer: 1, topic: "Perimeter" },
        { type: "input", text: "A triangle has sides 13 cm, 14 cm and 15 cm. What is the perimeter?", answer: "42", topic: "Perimeter" },
      ]
    },
    {
      id: 28,
      chapter: 14,
      name: "Area",
      fullName: "Area of 2D shapes",
      lesson: {
        heading: "Area of 2D shapes",
        sub: "Chapter 14 · Topic 2",
        body: `
          <p><strong>Area</strong> measures the surface enclosed by a 2D shape, measured in square units (cm², m², etc.).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Area formulas</div>
            <p>
              <strong>Rectangle:</strong> A = l × b<br>
              <strong>Square:</strong> A = s²<br>
              <strong>Triangle:</strong> A = ½ × base × height<br>
              <strong>Parallelogram:</strong> A = base × height (perpendicular height!)<br>
              <strong>Trapezium:</strong> A = ½(a + b) × h (a, b = parallel sides)<br>
              <strong>Circle:</strong> A = πr²<br>
              <strong>Rhombus:</strong> A = ½ × d₁ × d₂ (d₁, d₂ = diagonals)
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Triangle base = 10, height = 6: A = ½ × 10 × 6 = 30 cm²</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Trapezium a = 8, b = 12, h = 5: A = ½(8+12) × 5 = 50 cm²</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Circle r = 9: A = π(81) ≈ 254,47 cm²</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Composite: rectangle + semicircle = lw + ½πr²</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The height of a parallelogram/triangle is PERPENDICULAR to the base — not the slant side.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the area of a triangle with base 16 cm and perpendicular height 9 cm.", answer: "72", topic: "Area" },
        { type: "mc", text: "Find the area of a trapezium with parallel sides 7 cm and 11 cm, height 4 cm.", options: ["36 cm²", "72 cm²", "44 cm²", "38 cm²"], answer: 0, topic: "Area" },
        { type: "input", text: "Find the area of a circle with radius 6 cm. (Use π ≈ 3,14; give to nearest whole number)", answer: "113", topic: "Area" },
        { type: "mc", text: "A rhombus has diagonals 12 cm and 16 cm. Its area is:", options: ["192 cm²", "96 cm²", "48 cm²", "72 cm²"], answer: 1, topic: "Area" },
        { type: "input", text: "A rectangle is 14 cm × 9 cm. A circle of diameter 6 cm is cut from it. Find the remaining area. (Use π ≈ 3,14)", answer: "98", topic: "Area" },
      ]
    },
  ],
  workbook: {
    chapter: 14, chapterName: "Area and Perimeter",
    topics: [
      {
        name: "Perimeter",
        questions: [
          {
            num: "1",
            text: "Calculate the perimeter of each shape. (Use π = 3,14 where needed)",
            parts: [
              { label: "a)", text: "A regular hexagon with side 8 cm.", marks: 2 },
              { label: "b)", text: "A circle with radius 9 cm.", marks: 3 },
              { label: "c)", text: "A shape consisting of a rectangle (10 cm × 6 cm) with a semicircle on one of the shorter ends (replacing that side).", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Area",
        questions: [
          {
            num: "2",
            text: "Calculate the area of each shape. (Use π = 3,14 where needed)",
            parts: [
              { label: "a)", text: "Parallelogram: base = 15 cm, perpendicular height = 8 cm.", marks: 2 },
              { label: "b)", text: "Trapezium: parallel sides = 9 cm and 15 cm, height = 7 cm.", marks: 3 },
              { label: "c)", text: "Composite shape: a square of side 12 cm with a circular hole of diameter 6 cm cut from its centre.", marks: 4 },
            ]
          },
          {
            num: "3",
            text: "A garden is in the shape of a rectangle (20 m × 12 m) with a semicircular fountain area (diameter 8 m) cut from one end.",
            parts: [
              { label: "a)", text: "Find the area available for planting (excluding the fountain).", marks: 4 },
              { label: "b)", text: "Lawn seed costs R 15 per m². Find the total cost.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 14, chapterName: "Chapter 14 — Area and Perimeter",
    topics: [
      {
        name: "Perimeter",
        answers: [
          { num: "Q1a", ans: "48 cm", note: "6 × 8 = 48" },
          { num: "Q1b", ans: "56,52 cm", note: "2 × 3,14 × 9 = 56,52" },
          { num: "Q1c", ans: "P = 10 + 6 + 10 + πr = 26 + 3,14×3 ≈ 35,42 cm", note: "Two long sides + one short side + semicircle arc (r=3)" },
        ]
      },
      {
        name: "Area",
        answers: [
          { num: "Q2a", ans: "120 cm²", note: "15 × 8 = 120" },
          { num: "Q2b", ans: "84 cm²", note: "½(9+15)×7 = ½×24×7 = 84" },
          { num: "Q2c", ans: "115,74 cm²", note: "12²−π×3² = 144−28,26 = 115,74" },
          { num: "Q3a", ans: "215,12 m²", note: "20×12 − ½×π×4² = 240 − 25,12 = 214,88 ≈ 214,88 m²" },
          { num: "Q3b", ans: "≈ R 3 223,20", note: "214,88 × 15 = 3 223,20" },
        ]
      },
    ]
  }
});
