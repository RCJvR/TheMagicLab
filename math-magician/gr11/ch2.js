// Math Magician — Grade 11, Chapter 2
// Equations and Inequalities

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 0,
      chapter: 2,
      name: "Completing the square, formula & nature of roots",
      fullName: "Completing the square, quadratic formula, and nature of roots",
      lesson: {
        heading: "Completing the square, formula, and nature of roots",
        sub: "Chapter 2 · Topic 1",
        body: `
          <p>Grade 11 introduces two new solution methods for quadratics and a way to classify roots <em>without solving</em>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Completing the square</div>
            <p>
              To solve <span class="math">ax² + bx + c = 0</span>:<br>
              1. Divide by a (if a ≠ 1)<br>
              2. Move c to the right<br>
              3. Add <span class="math">(b/2a)²</span> to both sides<br>
              4. Write left side as a perfect square<br>
              5. Solve for x<br><br>
              Also used to write a quadratic in vertex form <span class="math">y = a(x−p)² + q</span>.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 The discriminant and nature of roots</div>
            <p>
              For <span class="math">ax² + bx + c = 0</span>, the discriminant is <span class="math">Δ = b² − 4ac</span>.<br><br>
              <strong>Δ > 0:</strong> two real, unequal roots<br>
              &nbsp;&nbsp;• If Δ is a perfect square → two rational roots<br>
              &nbsp;&nbsp;• If Δ is not a perfect square → two irrational roots<br>
              <strong>Δ = 0:</strong> two equal real roots (one repeated root)<br>
              <strong>Δ < 0:</strong> no real roots (roots are non-real)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Nature of roots</div>
            <p><span class="math">2x² − 3x + 5 = 0</span><br>
            <span class="math">Δ = (−3)² − 4(2)(5) = 9 − 40 = −31 < 0</span><br>
            → No real roots.</p>
            <p><span class="math">x² − 6x + 9 = 0</span><br>
            <span class="math">Δ = 36 − 36 = 0</span><br>
            → Two equal real roots (x = 3).</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "For x² − 4x + 1 = 0, the discriminant is:",
          options: ["12", "20", "−4", "8"],
          answer: 0,
          topic: "Completing the square, formula & nature of roots"
        },
        {
          type: "mc",
          text: "Δ = 25. The roots are:",
          options: ["Non-real", "Equal", "Two rational unequal", "Two irrational unequal"],
          answer: 2,
          topic: "Completing the square, formula & nature of roots"
        },
        {
          type: "input",
          text: "Find k if x² + kx + 9 = 0 has equal roots. Give the positive value.",
          answer: "6",
          topic: "Completing the square, formula & nature of roots"
        },
        {
          type: "mc",
          text: "Complete the square: x² − 6x + 2 = 0 gives x =",
          options: ["3 ± √7", "3 ± √11", "−3 ± √7", "6 ± √7"],
          answer: 0,
          topic: "Completing the square, formula & nature of roots"
        },
        {
          type: "mc",
          text: "3x² + 5x − 2 = 0. Nature of roots?",
          options: ["Non-real", "Equal", "Rational unequal", "Irrational unequal"],
          answer: 2,
          topic: "Completing the square, formula & nature of roots"
        }
      ]
    },
    {
      id: 1,
      chapter: 2,
      name: "Quadratic inequalities & simultaneous equations",
      fullName: "Quadratic inequalities and simultaneous (linear-quadratic) equations",
      lesson: {
        heading: "Quadratic inequalities and simultaneous equations",
        sub: "Chapter 2 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Solving quadratic inequalities</div>
            <p>
              <strong>Method:</strong><br>
              1. Move all terms to one side → standard form ax² + bx + c [sign] 0<br>
              2. Factorise (or use the formula to find roots)<br>
              3. Sketch the parabola (or use a sign table)<br>
              4. Read off where the parabola is above/below the x-axis<br><br>
              <strong>Key rule:</strong> For a > 0 parabola:<br>
              ax² + bx + c < 0 → between the roots<br>
              ax² + bx + c > 0 → outside the roots
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve x² − x − 6 < 0</div>
            <p>Factorise: <span class="math">(x−3)(x+2) < 0</span><br>
            Roots: x = 3 and x = −2<br>
            Parabola opens upward → below x-axis <em>between</em> roots<br>
            Solution: <span class="math">−2 < x < 3</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Simultaneous equations (one linear, one quadratic)</div>
            <p>
              <strong>Method: substitution</strong><br>
              1. Express one variable from the linear equation.<br>
              2. Substitute into the quadratic equation.<br>
              3. Solve the resulting quadratic.<br>
              4. Back-substitute to find both variables.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: y = x + 1 and y = x² − 3</div>
            <p>Substitute: <span class="math">x + 1 = x² − 3 → x² − x − 4 = 0</span><br>
            <span class="math">x = (1 ± √17)/2</span></p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Solve: x² − 5x + 6 > 0",
          options: ["2 < x < 3", "x < 2 or x > 3", "x > 3 only", "−3 < x < −2"],
          answer: 1,
          topic: "Quadratic inequalities & simultaneous equations"
        },
        {
          type: "mc",
          text: "Solve: (x + 1)(x − 4) ≤ 0",
          options: ["x ≤ −1 or x ≥ 4", "−1 ≤ x ≤ 4", "x < −1 or x > 4", "−4 ≤ x ≤ 1"],
          answer: 1,
          topic: "Quadratic inequalities & simultaneous equations"
        },
        {
          type: "mc",
          text: "Solve simultaneously: y = 2x − 1 and y = x². Which quadratic results?",
          options: ["x² + 2x − 1 = 0", "x² − 2x + 1 = 0", "x² − 2x − 1 = 0", "x² + 2x + 1 = 0"],
          answer: 1,
          topic: "Quadratic inequalities & simultaneous equations"
        },
        {
          type: "mc",
          text: "Solve: 2x² + x − 3 ≥ 0",
          options: ["−3/2 ≤ x ≤ 1", "x ≤ −3/2 or x ≥ 1", "x ≤ 1 only", "x ≥ 1 only"],
          answer: 1,
          topic: "Quadratic inequalities & simultaneous equations"
        },
        {
          type: "input",
          text: "y = x + 3 and x² + y² = 29. Substituting gives x² + (x+3)² = 29. Expand to get 2x² + 6x + ? = 0 (find the constant).",
          answer: "-20",
          altAnswers: ["−20"],
          topic: "Quadratic inequalities & simultaneous equations"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 2 Workbook — Equations and Inequalities",
    questions: [
      {
        number: 1,
        text: "Without solving, determine the nature of roots:",
        parts: [
          { label: "a", text: "x² + 4x + 5 = 0", marks: 2 },
          { label: "b", text: "4x² − 12x + 9 = 0", marks: 2 },
          { label: "c", text: "3x² − 5x − 2 = 0", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Solve by completing the square:",
        parts: [
          { label: "a", text: "x² − 8x + 3 = 0 (leave in surd form)", marks: 4 },
          { label: "b", text: "2x² + 6x − 1 = 0 (leave in surd form)", marks: 5 }
        ]
      },
      {
        number: 3,
        text: "Find the value(s) of k for which the following have the given nature of roots:",
        parts: [
          { label: "a", text: "x² − kx + 4 = 0: equal roots", marks: 3 },
          { label: "b", text: "kx² − 3x + 1 = 0: non-real roots", marks: 4 }
        ]
      },
      {
        number: 4,
        text: "Solve the following inequalities and represent on a number line:",
        parts: [
          { label: "a", text: "x² − 3x − 10 ≤ 0", marks: 4 },
          { label: "b", text: "−x² + x + 12 > 0", marks: 4 }
        ]
      },
      {
        number: 5,
        text: "Solve simultaneously: y = 3 − x and y = x² − 5",
        parts: [
          { label: "a", text: "Write the resulting quadratic equation.", marks: 2 },
          { label: "b", text: "Solve for x and hence find y.", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Δ=16−20=−4<0 → non-real roots",
        b: "Δ=144−144=0 → equal roots",
        c: "Δ=25+24=49>0, perfect square → rational unequal roots"
      },
      2: {
        a: "x²−8x=−3 → (x−4)²=13 → x=4±√13",
        b: "x²+3x=½ → (x+3/2)²=½+9/4=11/4 → x=(−3±√11)/2"
      },
      3: {
        a: "Δ=k²−16=0 → k=±4",
        b: "Δ=9−4k<0 → k>9/4"
      },
      4: {
        a: "(x−5)(x+2)≤0 → −2≤x≤5",
        b: "−(x−4)(x+3)>0 → (x−4)(x+3)<0 → −3<x<4"
      },
      5: {
        a: "3−x=x²−5 → x²+x−8=0",
        b: "x=(−1±√33)/2; substitute back for y"
      }
    }
  }
});
