// Math Magician — Grade 12, Chapter 6
// Differential Calculus

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 0,
      chapter: 6,
      name: "Limits, first principles & rules",
      fullName: "Limits, differentiation from first principles, and rules of differentiation",
      lesson: {
        heading: "Limits, first principles, and differentiation rules",
        sub: "Chapter 6 · Topic 1",
        body: `
          <p><strong>Differential calculus</strong> is the mathematics of instantaneous rate of change — the gradient of a curve at any point.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The derivative from first principles</div>
            <p>
              The gradient of the tangent to f(x) at point x is:<br>
              <span class="math">f'(x) = lim[h→0] [f(x+h) − f(x)] / h</span><br><br>
              This is the definition. You must show the full limit process in first-principles questions.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ First principles: f(x) = x²</div>
            <p><span class="math">f'(x) = lim[h→0] [(x+h)² − x²] / h</span><br>
            <span class="math">= lim[h→0] [x²+2xh+h² − x²] / h</span><br>
            <span class="math">= lim[h→0] [2xh + h²] / h</span><br>
            <span class="math">= lim[h→0] [2x + h] = 2x</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Rules of differentiation</div>
            <p>
              <strong>Power rule:</strong> <span class="math">d/dx[xⁿ] = nxⁿ⁻¹</span><br>
              <strong>Constant:</strong> <span class="math">d/dx[c] = 0</span><br>
              <strong>Constant multiple:</strong> <span class="math">d/dx[cf(x)] = cf'(x)</span><br>
              <strong>Sum/difference:</strong> <span class="math">d/dx[f ± g] = f' ± g'</span><br><br>
              Notation: f'(x), dy/dx, Dₓ[y], ẏ are all equivalent.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Examples: Apply the rules</div>
            <p><strong>(a)</strong> f(x) = 3x⁴ − 5x² + 7 → f'(x) = 12x³ − 10x<br>
            <strong>(b)</strong> y = 2/x + √x = 2x⁻¹ + x^(½) → dy/dx = −2x⁻² + ½x^(−½)<br>
            <strong>(c)</strong> g(x) = (x + 1)(x − 3) = x² − 2x − 3 → g'(x) = 2x − 2</p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Using first principles, the derivative of f(x) = 3x is:", options: ["3x", "3", "0", "3x²"], answer: 1, topic: "Limits, first principles & rules" },
        { type: "mc", text: "Differentiate: y = 5x³ − 2x + 8", options: ["15x² − 2", "5x² − 2x", "15x² − 2x + 8", "15x³ − 2"], answer: 0, topic: "Limits, first principles & rules" },
        { type: "input", text: "f(x) = x⁴ − 3x². Find f'(2).", answer: "20", topic: "Limits, first principles & rules" },
        { type: "mc", text: "dy/dx of y = 4/x²:", options: ["−8/x³", "8x", "−8x³", "4x⁻¹"], answer: 0, topic: "Limits, first principles & rules" },
        { type: "mc", text: "Differentiate: f(x) = (2x − 1)²", options: ["2(2x−1)", "4(2x−1)", "4x − 2", "Both B and C"], answer: 3, topic: "Limits, first principles & rules" }
      ]
    },
    {
      id: 1,
      chapter: 6,
      name: "Tangents, curve sketching & optimisation",
      fullName: "Tangent lines, second derivative, cubic curve sketching, and optimisation",
      lesson: {
        heading: "Tangents, curve sketching, and optimisation",
        sub: "Chapter 6 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Equation of tangent to a curve</div>
            <p>
              At point (a, f(a)), the tangent has gradient m = f'(a).<br>
              Equation: <span class="math">y − f(a) = f'(a)(x − a)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Second derivative and concavity</div>
            <p>
              <span class="math">f''(x)</span> = derivative of f'(x)<br>
              f''(x) > 0: concave up (minimum turning point)<br>
              f''(x) &lt; 0: concave down (maximum turning point)<br>
              f''(x) = 0: possible point of inflection
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Sketching a cubic f(x) = ax³ + bx² + cx + d</div>
            <p>
              <strong>Step 1:</strong> y-intercept: f(0) = d<br>
              <strong>Step 2:</strong> x-intercepts: solve f(x) = 0 (factor theorem)<br>
              <strong>Step 3:</strong> Stationary points: solve f'(x) = 0 → find (x, f(x))<br>
              <strong>Step 4:</strong> Nature via f''(x): pos = min, neg = max<br>
              <strong>Step 5:</strong> Point of inflection: f''(x) = 0<br>
              <strong>Step 6:</strong> End behaviour: sign of a
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Optimisation</div>
            <p>
              To find maximum/minimum value of a quantity:<br>
              1. Write a formula for the quantity in terms of one variable<br>
              2. Differentiate and set equal to 0<br>
              3. Confirm max/min via second derivative or sign of f'<br>
              4. State answer in context with units
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = x³ − 3x + 2. Stationary points at x =", options: ["x = 1 and x = −1", "x = 3 and x = −3", "x = 0 only", "x = 2 only"], answer: 0, topic: "Tangents, curve sketching & optimisation" },
        { type: "mc", text: "f''(x) = −6 at a stationary point means:", options: ["Minimum", "Maximum", "Point of inflection", "Cannot determine"], answer: 1, topic: "Tangents, curve sketching & optimisation" },
        { type: "input", text: "f(x) = x² − 4x + 3. Find the x-coordinate of the minimum.", answer: "2", topic: "Tangents, curve sketching & optimisation" },
        { type: "mc", text: "Tangent to y = x² at x = 3 has gradient:", options: ["9", "6", "3", "12"], answer: 1, topic: "Tangents, curve sketching & optimisation" },
        { type: "mc", text: "A box with square base of side x and height h has volume 500 = x²h. To minimise surface area, the first step is to:", options: ["Differentiate SA immediately", "Express h in terms of x using V=500", "Set SA = 0", "Differentiate V"], answer: 1, topic: "Tangents, curve sketching & optimisation" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 6 Workbook — Differential Calculus",
    questions: [
      { number: 1, text: "Determine f'(x) from first principles for f(x) = 2x² − 3.", parts: [
        { label: "a", text: "Write the definition of f'(x).", marks: 1 },
        { label: "b", text: "Find f(x+h) and simplify f(x+h) − f(x).", marks: 3 },
        { label: "c", text: "Find the limit as h → 0.", marks: 2 }
      ]},
      { number: 2, text: "Differentiate the following (simplify first where necessary):", parts: [
        { label: "a", text: "f(x) = 3x⁵ − 4x³ + 7x − 2", marks: 2 },
        { label: "b", text: "g(x) = (x² − 1)/x", marks: 3 },
        { label: "c", text: "h(x) = (x + 2)²(x − 1)", marks: 4 }
      ]},
      { number: 3, text: "f(x) = x³ − 3x² − 9x + 27", parts: [
        { label: "a", text: "Find all intercepts.", marks: 4 },
        { label: "b", text: "Find the coordinates of the turning points and determine their nature.", marks: 5 },
        { label: "c", text: "Find the point of inflection.", marks: 2 },
        { label: "d", text: "Sketch the curve.", marks: 3 }
      ]},
      { number: 4, text: "A farmer has 120 m of fencing to enclose a rectangular area against a straight wall (wall forms one side).", parts: [
        { label: "a", text: "Write the area A in terms of x (width perpendicular to wall).", marks: 2 },
        { label: "b", text: "Find the dimensions that maximise A.", marks: 4 },
        { label: "c", text: "Find the maximum area.", marks: 1 }
      ]}
    ],
    answers: {
      1: { a: "f'(x)=lim[h→0][f(x+h)−f(x)]/h", b: "f(x+h)=2(x+h)²−3=2x²+4xh+2h²−3; diff=4xh+2h²", c: "lim=(4x+2h)→4x; f'(x)=4x" },
      2: { a: "15x⁴−12x²+7", b: "g=x−x⁻¹→g'=1+x⁻²=1+1/x²", c: "h=(x²+4x+4)(x−1)=x³+3x²−4→h'=3x²+6x" },
      3: { a: "y-int:(0,27); f(x)=(x−3)²(x+3) nope... factor: f(3)=27−27−27+27=0; f(x)=(x−3)(x²−9)... test: (x−3)²(x+3)? Check: x-ints at x=3(double) and x=−3", b: "f'=3x²−6x−9=3(x²−2x−3)=3(x−3)(x+1)=0→x=3,x=−1; f(3)=0(min,f''=12>0); f(−1)=32(max,f''=−12<0)", c: "f''=6x−6=0→x=1; f(1)=16; inflection (1,16)", d: "Rising cubic, max(−1,32), min(3,0), cuts x at −3 and touches at 3" },
      4: { a: "2x+y=120→y=120−2x; A=x(120−2x)=120x−2x²", b: "A'=120−4x=0→x=30m; y=60m", c: "A=30×60=1800 m²" }
    }
  }
});
