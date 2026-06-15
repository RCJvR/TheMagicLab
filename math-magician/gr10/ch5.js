// Math Magician — Grade 10, Chapter 5
// Trigonometry (Part 1)

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 0,
      chapter: 5,
      name: "Trig ratios & special angles",
      fullName: "Defining trigonometric ratios, reciprocal ratios, and special angles",
      lesson: {
        heading: "Trigonometric ratios and special angles",
        sub: "Chapter 5 · Topic 1",
        body: `
          <p><strong>Trigonometry</strong> studies the relationships between the angles and sides of triangles. In a right-angled triangle:</p>

          <div class="def-box">
            <div class="def-box-title">📖 The three primary ratios (SOH-CAH-TOA)</div>
            <p>
              <span class="math">sin θ = opposite / hypotenuse</span><br>
              <span class="math">cos θ = adjacent / hypotenuse</span><br>
              <span class="math">tan θ = opposite / adjacent</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reciprocal ratios</div>
            <p>
              <span class="math">cosec θ = 1/sin θ</span><br>
              <span class="math">sec θ = 1/cos θ</span><br>
              <span class="math">cot θ = 1/tan θ</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Special angles (no calculator)</div>
            <p>
              | θ | sin | cos | tan |<br>
              | 30° | ½ | √3/2 | 1/√3 = √3/3 |<br>
              | 45° | √2/2 | √2/2 | 1 |<br>
              | 60° | √3/2 | ½ | √3 |<br>
              | 0° | 0 | 1 | 0 |<br>
              | 90° | 1 | 0 | undefined |
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Evaluate without a calculator</div>
            <p><span class="math">sin 60° · cos 30° + cos 60° · sin 30°</span><br>
            <span class="math">= (√3/2)(√3/2) + (½)(½)</span><br>
            <span class="math">= 3/4 + 1/4 = 1</span></p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a right triangle, the side opposite θ is 5 and the hypotenuse is 13. Find sin θ:",
          options: ["5/13", "12/13", "5/12", "13/5"],
          answer: 0,
          topic: "Trig ratios & special angles"
        },
        {
          type: "input",
          text: "Evaluate (no calculator): tan 45° + sin 30°",
          answer: "3/2",
          altAnswers: ["1.5"],
          topic: "Trig ratios & special angles"
        },
        {
          type: "mc",
          text: "If sin θ = 3/5, what is cos θ (acute angle)?",
          options: ["4/5", "3/4", "5/3", "5/4"],
          answer: 0,
          topic: "Trig ratios & special angles"
        },
        {
          type: "mc",
          text: "Evaluate: sin²30° + cos²30°",
          options: ["½", "1", "√3/2", "3/4"],
          answer: 1,
          topic: "Trig ratios & special angles"
        },
        {
          type: "input",
          text: "Evaluate: cos 60° ÷ tan 60°",
          answer: "1/6",
          altAnswers: ["√3/6"],
          topic: "Trig ratios & special angles"
        }
      ]
    },
    {
      id: 1,
      chapter: 5,
      name: "Trig equations & Cartesian plane",
      fullName: "Solving trig equations and defining ratios in the Cartesian plane",
      lesson: {
        heading: "Solving trig equations and the Cartesian plane",
        sub: "Chapter 5 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Ratios in the Cartesian plane — CAST rule</div>
            <p>For a point P(x, y) on a circle of radius r = √(x² + y²):<br>
            <span class="math">sin θ = y/r, cos θ = x/r, tan θ = y/x</span><br><br>
            <strong>CAST rule</strong> — which ratios are positive in each quadrant:<br>
            Q1 (0°–90°): <strong>All</strong> positive<br>
            Q2 (90°–180°): <strong>Sine</strong> only<br>
            Q3 (180°–270°): <strong>Tangent</strong> only<br>
            Q4 (270°–360°): <strong>Cosine</strong> only</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reference angles</div>
            <p>To find trig ratios for angles in Q2, Q3, Q4, use the acute reference angle θ_ref:<br>
            Q2: <span class="math">sin(180°−θ) = sin θ</span>, <span class="math">cos(180°−θ) = −cos θ</span><br>
            Q3: <span class="math">sin(180°+θ) = −sin θ</span>, <span class="math">cos(180°+θ) = −cos θ</span><br>
            Q4: <span class="math">sin(360°−θ) = −sin θ</span>, <span class="math">cos(360°−θ) = cos θ</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve for θ ∈ [0°; 360°]</div>
            <p><span class="math">sin θ = −½</span><br>
            Reference angle: <span class="math">sin 30° = ½</span><br>
            sin is negative in Q3 and Q4:<br>
            <span class="math">θ = 180° + 30° = 210°</span><br>
            <span class="math">θ = 360° − 30° = 330°</span></p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In which quadrant is sin positive and cos negative?",
          options: ["Quadrant 1", "Quadrant 2", "Quadrant 3", "Quadrant 4"],
          answer: 1,
          topic: "Trig equations & Cartesian plane"
        },
        {
          type: "mc",
          text: "Solve for θ ∈ [0°; 360°]: cos θ = √3/2",
          options: ["30° only", "30° and 330°", "30° and 150°", "60° and 300°"],
          answer: 1,
          topic: "Trig equations & Cartesian plane"
        },
        {
          type: "mc",
          text: "If point P(−3, 4) is on a circle, find sin θ:",
          options: ["4/5", "−3/5", "−4/5", "3/5"],
          answer: 0,
          topic: "Trig equations & Cartesian plane"
        },
        {
          type: "input",
          text: "Solve: tan θ = 1 for θ ∈ [0°; 360°]. Give the smaller solution.",
          answer: "45",
          topic: "Trig equations & Cartesian plane"
        },
        {
          type: "mc",
          text: "sin 150° equals:",
          options: ["−½", "√3/2", "½", "−√3/2"],
          answer: 2,
          topic: "Trig equations & Cartesian plane"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 5 Workbook — Trigonometry",
    questions: [
      {
        number: 1,
        text: "In △ABC with right angle at C, AB = 10 and BC = 6.",
        parts: [
          { label: "a", text: "Calculate AC.", marks: 2 },
          { label: "b", text: "Write down sin A, cos A, and tan A as fractions.", marks: 3 },
          { label: "c", text: "Find the size of angle A (to the nearest degree).", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Evaluate without a calculator (show all steps):",
        parts: [
          { label: "a", text: "sin 60° · cos 30° − sin 30° · cos 60°", marks: 3 },
          { label: "b", text: "(tan 45° + sin 60°) / cos 30°", marks: 3 },
          { label: "c", text: "cos²45° − sin²45°", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "Point P(−5, 12) lies on the terminal arm of angle θ.",
        parts: [
          { label: "a", text: "Calculate r.", marks: 2 },
          { label: "b", text: "In which quadrant does P lie?", marks: 1 },
          { label: "c", text: "Determine sin θ, cos θ, and tan θ.", marks: 3 }
        ]
      },
      {
        number: 4,
        text: "Solve for θ ∈ [0°; 360°]:",
        parts: [
          { label: "a", text: "sin θ = √3/2", marks: 3 },
          { label: "b", text: "cos θ = −1/2", marks: 3 },
          { label: "c", text: "2tan θ + 2 = 0", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "AC = √(100−36) = 8",
        b: "sin A = 6/10 = 3/5; cos A = 8/10 = 4/5; tan A = 6/8 = 3/4",
        c: "A = sin⁻¹(0.6) ≈ 37°"
      },
      2: {
        a: "(√3/2)(√3/2)−(1/2)(1/2) = 3/4−1/4 = 1/2",
        b: "(1+√3/2)/(√3/2) = 2/√3 + 1 = 2√3/3 + 1",
        c: "1/2 − 1/2 = 0"
      },
      3: {
        a: "r = 13",
        b: "Quadrant 2",
        c: "sin θ = 12/13; cos θ = −5/13; tan θ = −12/5"
      },
      4: {
        a: "θ = 60° or 120°",
        b: "θ = 120° or 240°",
        c: "tan θ = −1 → θ = 135° or 315°"
      }
    }
  }
});
