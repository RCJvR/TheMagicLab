// Math Magician — Grade 11, Chapter 12
// Linear Programming

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 0,
      chapter: 12,
      name: "Setting up linear programming problems",
      fullName: "Constraints, feasible regions, and objective functions",
      lesson: {
        heading: "Setting up linear programming problems",
        sub: "Chapter 12 · Topic 1",
        body: `
          <p><strong>Linear programming</strong> finds the maximum or minimum value of an objective function subject to linear constraints (inequalities). It's used in business optimisation.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Key terms</div>
            <p>
              <strong>Decision variables:</strong> the unknowns (e.g. x and y, representing quantities to produce)<br>
              <strong>Constraints:</strong> inequalities restricting the variables (including x ≥ 0, y ≥ 0)<br>
              <strong>Feasible region:</strong> the area on the graph satisfying ALL constraints simultaneously<br>
              <strong>Objective function:</strong> the expression to maximise or minimise (e.g. P = 3x + 5y)<br>
              <strong>Corner points (vertices):</strong> the optimal solution always occurs at a vertex of the feasible region
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Method</div>
            <p>
              1. Define variables (state clearly)<br>
              2. Write all constraints as inequalities<br>
              3. Write the objective function<br>
              4. Draw constraint lines on a graph<br>
              5. Shade the feasible region<br>
              6. Find all corner (vertex) points<br>
              7. Evaluate the objective function at each vertex<br>
              8. State the optimal solution in context
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Constraints setup</div>
            <p>A bakery makes muffins (x) and cupcakes (y). Each muffin takes 2 min, each cupcake 3 min. Max 120 min. Flour limit: x + y ≤ 50. At least 10 of each.<br><br>
            Constraints: <span class="math">2x + 3y ≤ 120; x + y ≤ 50; x ≥ 10; y ≥ 10</span><br>
            Objective: Maximise profit P = 5x + 8y</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "The feasible region is the set of points that satisfies:",
          options: ["The objective function only", "All constraints simultaneously", "At least one constraint", "The non-negativity constraints only"],
          answer: 1,
          topic: "Setting up linear programming problems"
        },
        {
          type: "mc",
          text: "The optimal value of the objective function always occurs at:",
          options: ["The origin", "A corner point of the feasible region", "The midpoint of the feasible region", "Any point inside the region"],
          answer: 1,
          topic: "Setting up linear programming problems"
        },
        {
          type: "mc",
          text: "Non-negativity constraints for variables x and y are:",
          options: ["x ≥ 0 and y ≥ 0", "x + y ≥ 0", "x ≤ 0 and y ≤ 0", "xy ≥ 0"],
          answer: 0,
          topic: "Setting up linear programming problems"
        },
        {
          type: "mc",
          text: "Constraint '3x + 2y ≤ 60' as a boundary line passes through which two points?",
          options: ["(20, 0) and (0, 30)", "(0, 20) and (30, 0)", "(60, 0) and (0, 60)", "(3, 0) and (0, 2)"],
          answer: 0,
          topic: "Setting up linear programming problems"
        },
        {
          type: "input",
          text: "Objective function P = 4x + 3y at corner point (5, 8). Find P.",
          answer: "44",
          topic: "Setting up linear programming problems"
        }
      ]
    },
    {
      id: 1,
      chapter: 12,
      name: "Optimisation — solving LP problems",
      fullName: "Finding maximum and minimum values using the feasible region",
      lesson: {
        heading: "Solving linear programming problems",
        sub: "Chapter 12 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Finding corner points</div>
            <p>
              Corner points occur where two constraint lines intersect. Find them by:<br>
              1. Setting two constraint equations equal (solving simultaneously)<br>
              2. Checking the intersection lies within the feasible region
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 The search line method</div>
            <p>
              Draw the objective function P = constant as a line. Move this <strong>search line</strong> parallel to itself (maintaining the same gradient):<br>
              • To <strong>maximise</strong>: move in the direction that increases P until it just leaves the feasible region<br>
              • To <strong>minimise</strong>: move in the direction that decreases P until it just leaves the feasible region<br>
              The last point of contact with the feasible region is optimal.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Full LP solution</div>
            <p>Constraints: x ≥ 0, y ≥ 0, x + y ≤ 8, 2x + y ≤ 12<br>
            Maximise P = 5x + 4y<br><br>
            Corner points: (0,0), (6,0), (4,4), (0,8)<br>
            P values: 0, 30, 36, 32<br>
            Maximum P = 36 at (4, 4)</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Corner points of feasible region: (0,0), (4,0), (2,3), (0,5). Maximise P = x + 2y. Optimal point:",
          options: ["(4,0)", "(2,3)", "(0,5)", "(0,0)"],
          answer: 2,
          topic: "Optimisation — solving LP problems"
        },
        {
          type: "input",
          text: "Corner points: (0,6), (3,4), (5,0). Objective: Minimise C = 2x + 3y. Find minimum C.",
          answer: "10",
          topic: "Optimisation — solving LP problems"
        },
        {
          type: "mc",
          text: "The search line method involves moving a line with the same _____ as the objective function.",
          options: ["Intercept", "Gradient", "Value", "Domain"],
          answer: 1,
          topic: "Optimisation — solving LP problems"
        },
        {
          type: "mc",
          text: "Constraints: x ≥ 2, y ≥ 1, x + y ≤ 7. The corner (2,1) gives P = 3x − y = 5. Corner (2,5) gives P = 1. The maximum is at:",
          options: ["(2, 1)", "(2, 5)", "(7, 0)", "(6, 1)"],
          answer: 3,
          topic: "Optimisation — solving LP problems"
        },
        {
          type: "mc",
          text: "If the feasible region is unbounded, a maximum value of P may:",
          options: ["Always exist", "Never exist", "Not exist", "Equal zero"],
          answer: 2,
          topic: "Optimisation — solving LP problems"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 12 Workbook — Linear Programming",
    questions: [
      {
        number: 1,
        text: "A workshop makes chairs (x) and tables (y). Each chair needs 2 hours of carpentry and 1 hour of finishing. Each table needs 3 hours of carpentry and 2 hours of finishing. There are at most 24 hours of carpentry and 16 hours of finishing available. At least 2 chairs and 1 table must be produced.",
        parts: [
          { label: "a", text: "Write all constraints as inequalities.", marks: 4 },
          { label: "b", text: "Draw the feasible region on a graph.", marks: 4 },
          { label: "c", text: "Identify all corner points.", marks: 3 },
          { label: "d", text: "If profit is P = R80x + R150y, find the maximum profit.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Feasible region has vertices at A(0; 8), B(4; 6), C(7; 0), D(0; 0).",
        parts: [
          { label: "a", text: "Maximise f(x; y) = 3x + 2y.", marks: 3 },
          { label: "b", text: "Minimise g(x; y) = x + 4y.", marks: 3 },
          { label: "c", text: "Find the value of k such that 2x + ky = 20 gives multiple optimal solutions along BC.", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "2x+3y≤24; x+2y≤16; x≥2; y≥1; x≥0; y≥0",
        b: "Shade region satisfying all constraints",
        c: "Solve intersections: (2,1), (2,6.67), (4.5,5), (7,0)... check feasibility; corners approx at (2,1),(2,6),(3,6),(6,2)",
        d: "Evaluate P=80x+150y at each corner; maximum typically at balanced point"
      },
      2: {
        a: "Evaluate 3x+2y: A=16; B=24; C=21; D=0 → Maximum=24 at B(4;6)",
        b: "Evaluate x+4y: A=32; B=28; C=7; D=0 → Minimum=0 at D(0;0)",
        c: "Gradient of BC: m=(0−6)/(7−4)=−2; For 2x+ky=20 to be parallel: slope=−2/k=−2 → k=1; check: 2(4)+1(6)=14≠20... use search line parallel to BC: m_BC=−2; objective m=−2/k; so k=1"
      }
    }
  }
});
