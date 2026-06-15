// Math Magician — Grade 11, Chapter 5
// Functions

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 0,
      chapter: 5,
      name: "Quadratic, hyperbolic & exponential functions",
      fullName: "Advanced quadratic, hyperbolic, and exponential function analysis",
      lesson: {
        heading: "Advanced function analysis",
        sub: "Chapter 5 · Topic 1",
        body: `
          <p>Grade 11 goes deeper into functions — finding equations from graphs, average gradient, and the effect of parameters a, p, q.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Average gradient</div>
            <p>
              The average gradient between two points on a curve is the gradient of the chord joining them:<br>
              <span class="math">m_avg = (f(x₂) − f(x₁)) / (x₂ − x₁)</span><br><br>
              This approximates the instantaneous rate of change (introduced properly in Grade 12 calculus).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Effect of parameters — general forms</div>
            <p>
              <strong>Quadratic:</strong> <span class="math">y = a(x − p)² + q</span><br>
              a: direction and stretch; p: horizontal shift; q: vertical shift<br><br>
              <strong>Hyperbola:</strong> <span class="math">y = a/(x − p) + q</span><br>
              Asymptotes: x = p, y = q<br><br>
              <strong>Exponential:</strong> <span class="math">y = a · bˣ⁻ᵖ + q</span><br>
              Asymptote: y = q; y-intercept shifts with p
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Average gradient</div>
            <p>f(x) = x². Average gradient between x = 2 and x = 5:<br>
            <span class="math">m = (f(5) − f(2))/(5−2) = (25−4)/3 = 21/3 = 7</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Finding the equation from a graph</div>
            <p>Parabola with vertex (2; −3) passing through (0; 1):<br>
            <span class="math">y = a(x−2)² − 3</span><br>
            Sub (0; 1): <span class="math">1 = a(4) − 3 → a = 1</span><br>
            <span class="math">y = (x−2)² − 3</span></p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Average gradient of f(x) = 2x² between x = 1 and x = 3:",
          options: ["8", "16", "4", "6"],
          answer: 0,
          topic: "Quadratic, hyperbolic & exponential functions"
        },
        {
          type: "mc",
          text: "y = a/(x−2) + 3. The vertical asymptote is:",
          options: ["y = 3", "x = 3", "x = 2", "y = 2"],
          answer: 2,
          topic: "Quadratic, hyperbolic & exponential functions"
        },
        {
          type: "mc",
          text: "A parabola has vertex (−1; 4) and a = −2. Its equation is:",
          options: ["y = −2(x+1)² + 4", "y = −2(x−1)² + 4", "y = 2(x+1)² − 4", "y = −2(x+1)² − 4"],
          answer: 0,
          topic: "Quadratic, hyperbolic & exponential functions"
        },
        {
          type: "input",
          text: "f(x) = x² − 4x. Find the average gradient between x = 1 and x = 4.",
          answer: "1",
          topic: "Quadratic, hyperbolic & exponential functions"
        },
        {
          type: "mc",
          text: "Exponential function y = 3 · 2^x + 1. What is the horizontal asymptote?",
          options: ["y = 3", "y = 1", "y = 2", "x = 1"],
          answer: 1,
          topic: "Quadratic, hyperbolic & exponential functions"
        }
      ]
    },
    {
      id: 1,
      chapter: 5,
      name: "Trigonometric functions — period, amplitude & phase shift",
      fullName: "Sine, cosine, and tangent functions with period, amplitude, and phase shift",
      lesson: {
        heading: "Trig functions — period, amplitude, and phase shift",
        sub: "Chapter 5 · Topic 2",
        body: `
          <p>Grade 11 extends trig graphs to include <strong>period changes</strong> and <strong>horizontal shifts (phase shifts)</strong>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 General form: y = a sin(bx + p) + q</div>
            <p>
              <strong>Amplitude</strong> = |a|<br>
              <strong>Period</strong> = 360°/|b| (for sin and cos)<br>
              <strong>Phase shift</strong> = −p/b (horizontal shift)<br>
              <strong>Vertical shift</strong> = q<br>
              Range: [q − |a|; q + |a|]
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: y = 2sin(2x − 60°) + 1</div>
            <p>
              a = 2 → amplitude = 2<br>
              b = 2 → period = 360°/2 = 180°<br>
              Phase shift: −(−60°)/2 = 30° (shifted 30° right)<br>
              Vertical shift: q = 1<br>
              Range: [−1; 3]<br>
              Max at x: 2x − 60° = 90° → x = 75°
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Tangent function: y = a tan(bx) + q</div>
            <p>
              Period = 180°/|b|<br>
              Asymptotes at: <span class="math">bx = 90° + 180°n</span><br>
              No amplitude (unbounded)
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Period of y = sin(3x):",
          options: ["180°", "90°", "120°", "270°"],
          answer: 2,
          topic: "Trigonometric functions — period, amplitude & phase shift"
        },
        {
          type: "mc",
          text: "y = 3cos(x − 45°). The graph is shifted:",
          options: ["45° left", "45° right", "3 units up", "3 units right"],
          answer: 1,
          topic: "Trigonometric functions — period, amplitude & phase shift"
        },
        {
          type: "input",
          text: "y = −2sin(x) + 3. What is the maximum y-value?",
          answer: "5",
          topic: "Trigonometric functions — period, amplitude & phase shift"
        },
        {
          type: "mc",
          text: "The period of y = tan(2x) is:",
          options: ["360°", "180°", "90°", "45°"],
          answer: 2,
          topic: "Trigonometric functions — period, amplitude & phase shift"
        },
        {
          type: "mc",
          text: "y = sin(x + 30°). Where is the first positive maximum?",
          options: ["x = 90°", "x = 60°", "x = 120°", "x = 30°"],
          answer: 1,
          topic: "Trigonometric functions — period, amplitude & phase shift"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 5 Workbook — Functions",
    questions: [
      {
        number: 1,
        text: "Sketch y = −(x+1)² + 4 for x ∈ [−4; 2]. Label all key features.",
        parts: [
          { label: "a", text: "Find the vertex and axis of symmetry.", marks: 2 },
          { label: "b", text: "Find x- and y-intercepts.", marks: 4 },
          { label: "c", text: "Find the average gradient between x = −3 and x = 0.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Sketch y = 2sin(2x) − 1 for x ∈ [0°; 360°]. Label intercepts, maxima, and minima.",
        parts: [
          { label: "a", text: "State amplitude, period, and range.", marks: 3 },
          { label: "b", text: "Find x-intercepts in [0°; 360°].", marks: 4 },
          { label: "c", text: "Find coordinates of maximum and minimum points.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "The graph of y = a/(x − p) + q has asymptotes x = 2 and y = −1, and passes through (4; 0).",
        parts: [
          { label: "a", text: "Write down p and q.", marks: 2 },
          { label: "b", text: "Find a.", marks: 3 },
          { label: "c", text: "Write the equation of the function.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Vertex (−1; 4); axis x = −1",
        b: "y-int: (0, 3); x-ints: −(x+1)²+4=0 → x=1 or x=−3",
        c: "f(−3)=−(−2)²+4=0; f(0)=3; m=(3−0)/(0−(−3))=1"
      },
      2: {
        a: "Amplitude=2; period=180°; range=[−3;1]",
        b: "2sin2x=1→sin2x=½→2x=30°,150°,390°,510°→x=15°,75°,195°,255°",
        c: "Max at 2x=90°→x=45°: y=1; min at x=135°: y=−3"
      },
      3: {
        a: "p=2; q=−1",
        b: "0=a/(4−2)−1→1=a/2→a=2",
        c: "y=2/(x−2)−1"
      }
    }
  }
});
