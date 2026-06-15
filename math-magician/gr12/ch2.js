// Math Magician — Grade 12, Chapter 2
// Functions — Inverses and Logarithms

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 0,
      chapter: 2,
      name: "Inverse functions",
      fullName: "Functions, relations, and inverse functions (linear, quadratic, exponential)",
      lesson: {
        heading: "Inverse functions",
        sub: "Chapter 2 · Topic 1",
        body: `
          <p>The <strong>inverse</strong> of a function f is denoted f⁻¹ and reverses the mapping: if f(a) = b, then f⁻¹(b) = a.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Finding the inverse</div>
            <p>
              1. Write y = f(x)<br>
              2. Swap x and y<br>
              3. Solve for y (this is f⁻¹(x))<br><br>
              Graphically: the inverse is the <strong>reflection of f in the line y = x</strong>.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Inverses of key function types</div>
            <p>
              <strong>Linear:</strong> f(x) = mx + c → f⁻¹(x) = (x − c)/m<br>
              <strong>Quadratic:</strong> f(x) = ax² → f⁻¹(x) = ±√(x/a) (must restrict domain for a function)<br>
              <strong>Exponential:</strong> f(x) = bˣ → f⁻¹(x) = log_b(x) (the logarithm)<br><br>
              For f⁻¹ to be a <em>function</em>, f must be one-to-one (passes horizontal line test).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Inverse of y = 2x²</div>
            <p>Swap: x = 2y² → y² = x/2 → y = ±√(x/2)<br>
            This is NOT a function (two y-values for each x).<br>
            Restrict domain to x ≥ 0: f⁻¹(x) = √(x/2) only.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Logarithms — the inverse of exponentials</div>
            <p>
              <span class="math">y = log_b(x) ⟺ bʸ = x</span><br><br>
              Key log laws:<br>
              <span class="math">log(xy) = log x + log y</span><br>
              <span class="math">log(x/y) = log x − log y</span><br>
              <span class="math">log(xⁿ) = n·log x</span><br>
              <span class="math">log_b(b) = 1; log_b(1) = 0</span><br>
              Change of base: <span class="math">log_a(x) = log(x)/log(a)</span>
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = 3x − 6. Find f⁻¹(x).", options: ["(x+6)/3", "(x−6)/3", "3x+6", "x/3 + 2"], answer: 0, topic: "Inverse functions" },
        { type: "mc", text: "The inverse of y = 2ˣ is:", options: ["y = x²", "y = log₂(x)", "y = 2⁻ˣ", "y = ½ˣ"], answer: 1, topic: "Inverse functions" },
        { type: "input", text: "Evaluate: log₂(32)", answer: "5", topic: "Inverse functions" },
        { type: "mc", text: "The graph of f⁻¹ is obtained from f by reflecting in:", options: ["The x-axis", "The y-axis", "The line y = x", "The origin"], answer: 2, topic: "Inverse functions" },
        { type: "mc", text: "log(100) + log(10) = ", options: ["2", "3", "log(1000)", "Both B and C"], answer: 3, topic: "Inverse functions" }
      ]
    },
    {
      id: 1,
      chapter: 2,
      name: "Logarithmic functions & equations",
      fullName: "Logarithmic functions, properties, equations, and applications",
      lesson: {
        heading: "Logarithmic functions and equations",
        sub: "Chapter 2 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 The logarithmic function y = log_b(x)</div>
            <p>
              Domain: x > 0 &nbsp;|&nbsp; Range: ℝ<br>
              x-intercept: (1; 0) — since log_b(1) = 0<br>
              Vertical asymptote: x = 0<br>
              If b > 1: increasing function<br>
              If 0 &lt; b &lt; 1: decreasing function
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Solving exponential equations using logs</div>
            <p>
              To solve <span class="math">bˣ = c</span> when the bases don't match:<br>
              Take log of both sides: <span class="math">x·log b = log c → x = log c / log b</span><br><br>
              Or equivalently: <span class="math">x = log_b(c)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve 3ˣ = 20</div>
            <p><span class="math">x·log 3 = log 20</span><br>
            <span class="math">x = log 20 / log 3 = 1.301/0.477 ≈ 2.727</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve log₂(x + 3) = 4</div>
            <p>Convert: <span class="math">2⁴ = x + 3 → 16 = x + 3 → x = 13</span><br>
            Check: x + 3 = 16 > 0 ✓</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Finding n in compound interest</div>
            <p>
              <span class="math">A = P(1+i)ⁿ → (1+i)ⁿ = A/P → n = log(A/P)/log(1+i)</span>
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Solve: 5ˣ = 125", options: ["x = 2", "x = 3", "x = 25", "x = 4"], answer: 1, topic: "Logarithmic functions & equations" },
        { type: "input", text: "Solve: 2ˣ = 50. Give x to 2 decimal places.", answer: "5.64", altAnswers: ["5,64"], topic: "Logarithmic functions & equations" },
        { type: "mc", text: "Solve: log₃(x − 1) = 2", options: ["x = 10", "x = 7", "x = 9", "x = 5"], answer: 0, topic: "Logarithmic functions & equations" },
        { type: "mc", text: "The vertical asymptote of y = log(x + 2) is:", options: ["x = 0", "x = 2", "x = −2", "y = 0"], answer: 2, topic: "Logarithmic functions & equations" },
        { type: "mc", text: "log(a²b³) expressed using log a and log b:", options: ["2log a + 3log b", "5log(ab)", "6log(ab)", "log a² + log b³ only"], answer: 0, topic: "Logarithmic functions & equations" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 2 Workbook — Functions and Logarithms",
    questions: [
      { number: 1, text: "f(x) = x² − 4 (for x ≥ 0).", parts: [
        { label: "a", text: "Find f⁻¹(x) and state its domain.", marks: 3 },
        { label: "b", text: "Sketch both f and f⁻¹ on the same axes, showing y = x.", marks: 3 },
        { label: "c", text: "Find f⁻¹(5).", marks: 1 }
      ]},
      { number: 2, text: "Solve for x (show all working):", parts: [
        { label: "a", text: "log₂(x) + log₂(x − 2) = 3", marks: 4 },
        { label: "b", text: "3^(2x−1) = 7", marks: 4 },
        { label: "c", text: "log(x² − 5x) = log(6)", marks: 4 }
      ]},
      { number: 3, text: "How long (in years, to 1 decimal place) does it take R8 000 to double at 9.5% p.a. compound interest?", parts: [
        { label: "a", text: "Set up the equation.", marks: 2 },
        { label: "b", text: "Solve using logarithms.", marks: 3 }
      ]}
    ],
    answers: {
      1: { a: "x=y²−4→y²=x+4→y=√(x+4); domain x≥−4", b: "Parabola and square root reflection", c: "f⁻¹(5)=√9=3" },
      2: { a: "log₂(x(x−2))=3→x(x−2)=8→x²−2x−8=0→(x−4)(x+2)=0→x=4 (reject x=−2)", b: "(2x−1)log3=log7→x=(log7/log3+1)/2≈1.386", c: "x²−5x=6→x²−5x−6=0→x=6 or x=−1 (check both: x=−1→log(6)✓; x=6→log(6)✓ both valid)" },
      3: { a: "16000=8000(1.095)ⁿ→(1.095)ⁿ=2", b: "n=log2/log1.095≈7.6 years" }
    }
  }
});
