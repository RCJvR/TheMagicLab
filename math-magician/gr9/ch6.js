// Math Magician — Grade 9, Chapter 6 data
// Functions and Relationships

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 11,
      chapter: 6,
      name: "Functions and mappings",
      fullName: "Functions, mappings and representations",
      lesson: {
        heading: "Functions and mappings",
        sub: "Chapter 6 · Topic 1",
        body: `
          <p>A <strong>function</strong> is a rule that assigns exactly one output value for each input value. Functions can be shown as tables, equations, ordered pairs, or graphs.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key vocabulary</div>
            <p>
              <strong>Input/Domain (x):</strong> set of allowed input values.<br>
              <strong>Output/Range (y):</strong> set of resulting output values.<br>
              <strong>Function notation:</strong> f(x) = ... reads "f of x equals ..."<br>
              <strong>Ordered pair:</strong> (x; y) — x is the input, y is the output.<br><br>
              A relation is a function if each x-value has <em>only one</em> y-value (vertical line test on a graph).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>f(x) = 3x − 1: f(4) = 3(4) − 1 = 11; f(−2) = 3(−2) − 1 = −7</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Given f(x) = 2x + 5: find x if f(x) = 17 → 2x + 5 = 17 → x = 6</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Table of values for y = x²: x: −2,−1,0,1,2 → y: 4,1,0,1,4</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>f(x) is NOT f × x. It means "the function f evaluated at x". Think of f as a machine that processes x.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Given f(x) = 4x − 3, calculate f(5).", answer: "17", topic: "Functions" },
        { type: "mc", text: "If g(x) = x² + 2, what is g(−3)?", options: ["7", "11", "−7", "13"], answer: 1, topic: "Functions" },
        { type: "input", text: "For f(x) = 5x + 2, find x if f(x) = 32.", answer: "6", topic: "Functions" },
        { type: "mc", text: "Which set of ordered pairs represents a function?", options: ["{(1;2),(2;3),(1;4)}", "{(1;2),(2;2),(3;2)}", "{(1;2),(1;3),(1;4)}", "None of these"], answer: 1, topic: "Functions" },
        { type: "input", text: "Complete the table for y = 2x − 1: when x = 0, y = ?", answer: "-1", topic: "Functions" },
      ]
    },
    {
      id: 12,
      chapter: 6,
      name: "Linear and non-linear functions",
      fullName: "Linear and non-linear functions — graphs",
      lesson: {
        heading: "Linear and non-linear functions",
        sub: "Chapter 6 · Topic 2",
        body: `
          <p>Functions are classified by the shape of their graphs.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Types of functions in Grade 9</div>
            <p>
              <strong>Linear:</strong> y = mx + c → straight-line graph. m = gradient (slope), c = y-intercept.<br>
              <strong>Parabola:</strong> y = x² → U-shaped curve (turning point at origin for y = x²).<br>
              <strong>Hyperbola:</strong> y = k/x → two curves, one in each of two opposite quadrants.<br>
              <strong>Exponential:</strong> y = bˣ (b > 0, b ≠ 1) → always positive, never touches x-axis.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Key features</div>
            <div class="example-step"><span class="step-num">1</span><span>y = 2x + 3: gradient = 2 (rises 2 for every 1 right), y-intercept = (0;3)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>y = x²: vertex (0;0), opens upward, axis of symmetry x = 0</span></div>
            <div class="example-step"><span class="step-num">3</span><span>y = 6/x: passes through (1;6), (2;3), (3;2), (6;1) and (−1;−6), (−2;−3)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>To sketch any function, always make a table of values first. Use at least 5 points for accuracy.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "What is the y-intercept of y = 3x − 7?", options: ["3", "7", "−7", "−3"], answer: 2, topic: "Functions" },
        { type: "mc", text: "Which function has a graph that is a U-shape (parabola)?", options: ["y = 3x + 1", "y = 3/x", "y = x²", "y = 2ˣ"], answer: 2, topic: "Functions" },
        { type: "input", text: "For y = 12/x, calculate y when x = 4.", answer: "3", topic: "Functions" },
        { type: "mc", text: "For y = 2x + 5, the gradient is:", options: ["5", "2", "7", "−5"], answer: 1, topic: "Functions" },
        { type: "mc", text: "The function y = 4/x is a:", options: ["Linear function", "Parabola", "Hyperbola", "Exponential"], answer: 2, topic: "Functions" },
      ]
    },
  ],
  workbook: {
    chapter: 6, chapterName: "Functions and Relationships",
    topics: [
      {
        name: "Functions and Notation",
        questions: [
          {
            num: "1",
            text: "Given f(x) = 3x² − x + 2:",
            parts: [
              { label: "a)", text: "Calculate f(0), f(1) and f(−2).", marks: 4 },
              { label: "b)", text: "Find x if f(x) = 12 (solve the equation).", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Graphs of Functions",
        questions: [
          {
            num: "2",
            text: "For the function y = 2x − 4:",
            parts: [
              { label: "a)", text: "Construct a table of values for x ∈ {−2; −1; 0; 1; 2; 3}.", marks: 3 },
              { label: "b)", text: "Draw the graph on a set of axes. Label intercepts.", marks: 4 },
              { label: "c)", text: "Write down the gradient and y-intercept.", marks: 2 },
              { label: "d)", text: "For what value of x is y = 0?", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "Consider y = 12/x.",
            parts: [
              { label: "a)", text: "Complete the table: x = 1, 2, 3, 4, 6, 12.", marks: 3 },
              { label: "b)", text: "In which quadrant does the other branch of the hyperbola lie?", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 6, chapterName: "Chapter 6 — Functions and Relationships",
    topics: [
      {
        name: "Functions and Notation",
        answers: [
          { num: "Q1a", ans: "f(0)=2; f(1)=4; f(−2)=16", note: "f(0)=0−0+2=2; f(1)=3−1+2=4; f(−2)=12+2+2=16" },
          { num: "Q1b", ans: "x = (1±√37)/6 (approximately x ≈ 1,18 or x ≈ −0,85)", note: "3x²−x+2=12 → 3x²−x−10=0 → quadratic formula; or accept completing the square" },
        ]
      },
      {
        name: "Graphs of Functions",
        answers: [
          { num: "Q2a", ans: "x:−2,−1,0,1,2,3 y:−8,−6,−4,−2,0,2", note: "y=2x−4" },
          { num: "Q2c", ans: "Gradient = 2; y-intercept = −4", note: "m=2, c=−4" },
          { num: "Q2d", ans: "x = 2", note: "2x−4=0 → x=2" },
          { num: "Q3a", ans: "y: 12, 6, 4, 3, 2, 1", note: "y=12/x" },
          { num: "Q3b", ans: "Third quadrant", note: "negative x and negative y" },
        ]
      },
    ]
  }
});
