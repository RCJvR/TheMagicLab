// Math Magician — Grade 10, Chapter 6
// Functions

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 0,
      chapter: 6,
      name: "Linear, quadratic & hyperbolic functions",
      fullName: "Linear, quadratic, and hyperbolic functions — sketching and properties",
      lesson: {
        heading: "Linear, quadratic, and hyperbolic functions",
        sub: "Chapter 6 · Topic 1",
        body: `
          <p>A <strong>function</strong> assigns exactly one output (y-value) to each input (x-value). In Grade 10 we study five main function families.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Linear function: y = mx + c</div>
            <p>
              Straight line. <span class="math">m</span> = gradient (slope), <span class="math">c</span> = y-intercept.<br>
              Domain: ℝ, Range: ℝ<br>
              x-intercept: set y = 0; y-intercept: set x = 0
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Quadratic function: y = ax² + bx + c (or y = a(x−p)² + q)</div>
            <p>
              Parabola. <span class="math">a > 0</span>: opens up (minimum), <span class="math">a < 0</span>: opens down (maximum).<br>
              Vertex form <span class="math">y = a(x−p)² + q</span>: vertex at (p, q).<br>
              Axis of symmetry: <span class="math">x = p</span> (or <span class="math">x = −b/2a</span>)<br>
              Range: <span class="math">[q; ∞)</span> if a > 0, or <span class="math">(−∞; q]</span> if a < 0
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Hyperbolic function: y = a/x + q  (or y = a/(x+p) + q)</div>
            <p>
              Two branches. Asymptotes: <span class="math">x = −p</span> (vertical) and <span class="math">y = q</span> (horizontal).<br>
              Domain: ℝ \ {−p}, Range: ℝ \ {q}
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Sketch y = −(x+1)² + 4</div>
            <p>Vertex: (−1, 4) — maximum (a = −1 &lt; 0)<br>
            Axis of symmetry: x = −1<br>
            y-intercept: x=0 → y = −1 + 4 = 3<br>
            x-intercepts: −(x+1)² + 4 = 0 → (x+1)² = 4 → x = 1 or x = −3<br>
            Range: (−∞; 4]</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "For y = 2(x−3)² − 1, the vertex is:",
          options: ["(3, −1)", "(−3, 1)", "(3, 1)", "(−3, −1)"],
          answer: 0,
          topic: "Linear, quadratic & hyperbolic functions"
        },
        {
          type: "mc",
          text: "The axis of symmetry of y = −x² + 4x − 3 is:",
          options: ["x = 2", "x = −2", "x = 4", "x = 1"],
          answer: 0,
          topic: "Linear, quadratic & hyperbolic functions"
        },
        {
          type: "mc",
          text: "For y = 3/x − 2, the horizontal asymptote is:",
          options: ["y = 2", "y = −2", "x = 3", "x = 0"],
          answer: 1,
          topic: "Linear, quadratic & hyperbolic functions"
        },
        {
          type: "input",
          text: "For y = −x² + 4x + 5, find the maximum y-value.",
          answer: "9",
          topic: "Linear, quadratic & hyperbolic functions"
        },
        {
          type: "mc",
          text: "The range of y = (x−2)² + 3 is:",
          options: ["y ≥ 3", "y ≤ 3", "y ≥ 2", "all real numbers"],
          answer: 0,
          topic: "Linear, quadratic & hyperbolic functions"
        }
      ]
    },
    {
      id: 1,
      chapter: 6,
      name: "Exponential & trig functions",
      fullName: "Exponential functions, trigonometric functions, and graph interpretation",
      lesson: {
        heading: "Exponential and trigonometric functions",
        sub: "Chapter 6 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Exponential function: y = abˣ + q</div>
            <p>
              Base b > 0, b ≠ 1. Horizontal asymptote: y = q.<br>
              If b > 1: exponential growth. If 0 &lt; b &lt; 1: exponential decay.<br>
              Domain: ℝ; Range: y > q (if a > 0)<br>
              y-intercept: <span class="math">y = a·b⁰ + q = a + q</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Trigonometric functions (Grade 10 scope)</div>
            <p>
              <strong>y = a·sin(x) + q</strong> and <strong>y = a·cos(x) + q</strong>:<br>
              Amplitude = |a|, vertical shift = q<br>
              Period = 360°<br>
              Range: [q − |a|; q + |a|]<br><br>
              <strong>y = a·tan(x) + q</strong>:<br>
              Period = 180°; asymptotes at x = 90° + 180°n
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: y = 2sin x − 1 for x ∈ [0°; 360°]</div>
            <p>
              Amplitude = 2, vertical shift = −1<br>
              Maximum: 2(1) − 1 = 1 (at x = 90°)<br>
              Minimum: 2(−1) − 1 = −3 (at x = 270°)<br>
              Range: [−3; 1]<br>
              x-intercepts: sin x = ½ → x = 30° or 150°
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Reading graphs</div>
            <p>
              From a graph, identify: intercepts, turning points, asymptotes, axes of symmetry, domain, range, and periods. Always state the equation of asymptotes.
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "The asymptote of y = 3·2^x − 4 is:",
          options: ["y = 4", "y = −4", "y = 3", "x = 0"],
          answer: 1,
          topic: "Exponential & trig functions"
        },
        {
          type: "mc",
          text: "The amplitude of y = −3cos x + 1 is:",
          options: ["1", "−3", "3", "−2"],
          answer: 2,
          topic: "Exponential & trig functions"
        },
        {
          type: "mc",
          text: "The period of y = tan x is:",
          options: ["360°", "90°", "180°", "270°"],
          answer: 2,
          topic: "Exponential & trig functions"
        },
        {
          type: "input",
          text: "For y = 2sin x + 1, what is the maximum y-value?",
          answer: "3",
          topic: "Exponential & trig functions"
        },
        {
          type: "mc",
          text: "y = 2^x and y = (½)^x are related by:",
          options: ["They are the same graph", "One is a reflection of the other in the y-axis", "One is a reflection in the x-axis", "One is a vertical stretch of the other"],
          answer: 1,
          topic: "Exponential & trig functions"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 6 Workbook — Functions",
    questions: [
      {
        number: 1,
        text: "For the parabola y = −2x² + 8x − 6:",
        parts: [
          { label: "a", text: "Write in vertex form y = a(x−p)² + q.", marks: 3 },
          { label: "b", text: "State the vertex and axis of symmetry.", marks: 2 },
          { label: "c", text: "Find x- and y-intercepts.", marks: 4 },
          { label: "d", text: "State the range.", marks: 1 },
          { label: "e", text: "Sketch the graph.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "For the hyperbola y = 4/(x−2) + 1:",
        parts: [
          { label: "a", text: "State the asymptotes.", marks: 2 },
          { label: "b", text: "Find the x- and y-intercepts.", marks: 3 },
          { label: "c", text: "Sketch the graph.", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "Sketch y = sin x and y = 2cos x on the same set of axes for x ∈ [0°; 360°]. Label all intercepts and turning points.",
        parts: [
          { label: "a", text: "y = sin x", marks: 3 },
          { label: "b", text: "y = 2cos x", marks: 3 },
          { label: "c", text: "State the x-values where sin x > 2cos x.", marks: 3 }
        ]
      },
      {
        number: 4,
        text: "The graph of y = ab^x + q passes through (0, 5) and (1, 11) with asymptote y = 3.",
        parts: [
          { label: "a", text: "Use the asymptote to find q.", marks: 1 },
          { label: "b", text: "Find a and b.", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "y = −2(x−2)² + 2",
        b: "Vertex (2, 2); axis x = 2",
        c: "y-int: (0, −6); x-ints: solve −2x²+8x−6=0 → x²−4x+3=0 → x=1 or x=3",
        d: "Range: y ≤ 2",
        e: "Downward parabola through (0,−6), (1,0), (2,2), (3,0), (4,−6)"
      },
      2: {
        a: "x=2 (vertical), y=1 (horizontal)",
        b: "x-int: 4/(x−2)=−1 → x=−2; y-int: 4/(−2)+1=−1",
        c: "Two branches: Q1 relative to (2,1)"
      },
      3: {
        a: "sin x: zeros 0°,180°,360°; max (90°,1); min (270°,−1)",
        b: "2cos x: zeros 90°,270°; max (0°,2),(360°,2); min (180°,−2)",
        c: "Read from graph intersections"
      },
      4: {
        a: "q = 3",
        b: "a+3=5 → a=2; 2b+3=11 → b=4; y=2·4^x+3"
      }
    }
  }
});
