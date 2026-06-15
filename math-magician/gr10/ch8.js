// Math Magician — Grade 10, Chapter 8
// Analytical Geometry

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 0,
      chapter: 8,
      name: "Distance & midpoint",
      fullName: "Distance between two points and midpoint of a line segment",
      lesson: {
        heading: "Distance formula and midpoint formula",
        sub: "Chapter 8 · Topic 1",
        body: `
          <p><strong>Analytical geometry</strong> combines algebra and geometry using the Cartesian plane.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Distance formula</div>
            <p>For points A(x₁; y₁) and B(x₂; y₂):<br>
            <span class="math">AB = √((x₂−x₁)² + (y₂−y₁)²)</span><br><br>
            This is the Pythagorean theorem applied to the Cartesian plane.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Midpoint formula</div>
            <p>Midpoint M of segment AB:<br>
            <span class="math">M = ((x₁+x₂)/2 ; (y₁+y₂)/2)</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>A(1; 3) and B(5; −1).<br>
            Distance: <span class="math">AB = √((5−1)² + (−1−3)²) = √(16+16) = √32 = 4√2</span><br>
            Midpoint: <span class="math">M = ((1+5)/2 ; (3+(−1))/2) = (3; 1)</span></p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Distance between (−1; 2) and (3; 5):",
          options: ["5", "√7", "7", "√25 = 5"],
          answer: 0,
          topic: "Distance & midpoint"
        },
        {
          type: "mc",
          text: "Midpoint of (−4; 6) and (2; −2):",
          options: ["(−1; 2)", "(−2; 4)", "(−2; 2)", "(1; 2)"],
          answer: 0,
          topic: "Distance & midpoint"
        },
        {
          type: "input",
          text: "A(0; 0) and B(3; 4). Find AB.",
          answer: "5",
          topic: "Distance & midpoint"
        },
        {
          type: "mc",
          text: "M(2; −1) is the midpoint of A(−1; 3) and B. Find B.",
          options: ["(5; −5)", "(3; −4)", "(1; −5)", "(5; 1)"],
          answer: 0,
          topic: "Distance & midpoint"
        },
        {
          type: "mc",
          text: "Which formula gives the midpoint y-coordinate?",
          options: ["y₂ − y₁", "(y₁ + y₂)/2", "√(y₂ − y₁)", "y₁ · y₂"],
          answer: 1,
          topic: "Distance & midpoint"
        }
      ]
    },
    {
      id: 1,
      chapter: 8,
      name: "Gradient of a line",
      fullName: "Gradient, parallel lines, and perpendicular lines",
      lesson: {
        heading: "Gradient, parallel, and perpendicular lines",
        sub: "Chapter 8 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Gradient formula</div>
            <p>For points A(x₁; y₁) and B(x₂; y₂):<br>
            <span class="math">m = (y₂−y₁)/(x₂−x₁)</span><br><br>
            Gradient measures steepness. Positive → rising left to right. Negative → falling.<br>
            Horizontal line: <span class="math">m = 0</span>. Vertical line: gradient undefined.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Parallel and perpendicular lines</div>
            <p>
              <strong>Parallel lines:</strong> same gradient → <span class="math">m₁ = m₂</span><br>
              <strong>Perpendicular lines:</strong> gradients multiply to −1 → <span class="math">m₁ × m₂ = −1</span><br>
              i.e. <span class="math">m₂ = −1/m₁</span> (negative reciprocal)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>Line through A(1; 2) and B(4; 8):<br>
            <span class="math">m = (8−2)/(4−1) = 6/3 = 2</span><br><br>
            A line parallel to AB also has m = 2.<br>
            A line perpendicular to AB has m = −½.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Equation of a line through two points</div>
            <p>Use point-slope form: <span class="math">y − y₁ = m(x − x₁)</span><br>
            Then rearrange to <span class="math">y = mx + c</span>.</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Gradient of the line through (2; 1) and (6; 9):",
          options: ["2", "½", "4", "8"],
          answer: 0,
          topic: "Gradient of a line"
        },
        {
          type: "mc",
          text: "A line has gradient 3. A perpendicular line has gradient:",
          options: ["3", "−3", "−⅓", "⅓"],
          answer: 2,
          topic: "Gradient of a line"
        },
        {
          type: "input",
          text: "Find the gradient of the line through (−1; 4) and (3; −4).",
          answer: "-2",
          altAnswers: ["−2"],
          topic: "Gradient of a line"
        },
        {
          type: "mc",
          text: "The equation of the line through (0; 3) with gradient −2 is:",
          options: ["y = −2x", "y = −2x + 3", "y = 2x + 3", "y = 3x − 2"],
          answer: 1,
          topic: "Gradient of a line"
        },
        {
          type: "mc",
          text: "Lines y = 3x − 1 and y = 3x + 5 are:",
          options: ["Perpendicular", "Parallel", "The same line", "Intersecting at right angles"],
          answer: 1,
          topic: "Gradient of a line"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 8 Workbook — Analytical Geometry",
    questions: [
      {
        number: 1,
        text: "Points A(−2; 3), B(4; 11), and C(1; 0) are given.",
        parts: [
          { label: "a", text: "Calculate AB.", marks: 3 },
          { label: "b", text: "Find the midpoint M of AB.", marks: 2 },
          { label: "c", text: "Find the gradient of AB.", marks: 2 },
          { label: "d", text: "Write the equation of line AB in the form y = mx + c.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "A(1; 4) and B(7; −2) are endpoints of a line segment.",
        parts: [
          { label: "a", text: "Find the midpoint M.", marks: 2 },
          { label: "b", text: "Find the gradient of AB.", marks: 2 },
          { label: "c", text: "Find the gradient of a line perpendicular to AB.", marks: 1 },
          { label: "d", text: "Write the equation of the perpendicular bisector of AB.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "ABCD is a quadrilateral with A(0; 0), B(4; 2), C(6; −2), D(2; −4).",
        parts: [
          { label: "a", text: "Show that AB is parallel to DC.", marks: 4 },
          { label: "b", text: "Show that AB ≠ DC in length.", marks: 3 },
          { label: "c", text: "What type of quadrilateral is ABCD? Give a reason.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "AB = √(36+64) = √100 = 10",
        b: "M = (1; 7)",
        c: "m = (11−3)/(4−(−2)) = 8/6 = 4/3",
        d: "y = (4/3)x + 11/3"
      },
      2: {
        a: "M = (4; 1)",
        b: "m = (−2−4)/(7−1) = −1",
        c: "m_perp = 1",
        d: "y−1=1(x−4) → y=x−3"
      },
      3: {
        a: "m_AB=(2−0)/(4−0)=1/2; m_DC=(−4−(−2))/(2−6)=−2/−4=1/2 → AB∥DC",
        b: "AB=√20=2√5; DC=√20=2√5 → equal length!",
        c: "Parallelogram (one pair of ∥ and equal sides) — actually rhombus if all sides equal; check AD and BC"
      }
    }
  }
});
