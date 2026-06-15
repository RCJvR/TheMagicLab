// Math Magician — Grade 11, Chapter 6
// Trigonometry — Identities, Reduction, Sine/Cosine/Area Rules

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 0,
      chapter: 6,
      name: "Trig identities & reduction formulae",
      fullName: "Trigonometric identities, reduction formulae, and solving equations",
      lesson: {
        heading: "Trig identities and reduction formulae",
        sub: "Chapter 6 · Topic 1",
        body: `
          <p>Grade 11 introduces <strong>compound angle identities</strong> and the <strong>reduction formulae</strong> for all four quadrants.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Fundamental identities</div>
            <p>
              <strong>Quotient:</strong> <span class="math">tan θ = sin θ / cos θ</span><br>
              <strong>Pythagorean:</strong> <span class="math">sin²θ + cos²θ = 1</span><br>
              Derived: <span class="math">sin²θ = 1 − cos²θ</span> and <span class="math">cos²θ = 1 − sin²θ</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reduction formulae (full set)</div>
            <p>
              <strong>Supplementary (180° − θ):</strong> sin(180°−θ) = sinθ; cos(180°−θ) = −cosθ<br>
              <strong>Co-supplementary (180° + θ):</strong> sin(180°+θ) = −sinθ; cos(180°+θ) = −cosθ<br>
              <strong>Reflex (360° − θ):</strong> sin(360°−θ) = −sinθ; cos(360°−θ) = cosθ<br>
              <strong>Negative angles:</strong> sin(−θ) = −sinθ; cos(−θ) = cosθ<br>
              <strong>Co-ratio (90° ± θ):</strong> sin(90°−θ) = cosθ; cos(90°−θ) = sinθ
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove an identity</div>
            <p>Prove: <span class="math">(1 − sin²x)/cos x = cos x</span><br>
            LHS = <span class="math">cos²x / cos x = cos x</span> = RHS ✓<br><br>
            Always work on ONE side only. Never cross-multiply in a proof.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Simplify using reduction</div>
            <p><span class="math">sin(180° + x) · cos(360° − x) / tan(−x)</span><br>
            <span class="math">= (−sin x)(cos x) / (−tan x)</span><br>
            <span class="math">= (−sin x · cos x) / (−sin x/cos x)</span><br>
            <span class="math">= cos²x</span></p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "cos(180° + θ) equals:",
          options: ["cosθ", "−cosθ", "sinθ", "−sinθ"],
          answer: 1,
          topic: "Trig identities & reduction formulae"
        },
        {
          type: "mc",
          text: "Simplify: sin(360° − x) / cos(−x)",
          options: ["−tanx", "tanx", "−1", "1"],
          answer: 0,
          topic: "Trig identities & reduction formulae"
        },
        {
          type: "mc",
          text: "sin(90° − x) equals:",
          options: ["sinx", "−sinx", "cosx", "−cosx"],
          answer: 2,
          topic: "Trig identities & reduction formulae"
        },
        {
          type: "mc",
          text: "Which identity is NOT correct?",
          options: ["sin²θ + cos²θ = 1", "tanθ = cosθ/sinθ", "1 − sin²θ = cos²θ", "tan²θ + 1 = 1/cos²θ"],
          answer: 1,
          topic: "Trig identities & reduction formulae"
        },
        {
          type: "mc",
          text: "sin(180° − 30°) equals:",
          options: ["−sin30°", "cos30°", "sin30°", "−cos30°"],
          answer: 2,
          topic: "Trig identities & reduction formulae"
        }
      ]
    },
    {
      id: 1,
      chapter: 6,
      name: "Sine rule, cosine rule & area rule",
      fullName: "The sine rule, cosine rule, and area rule for non-right-angled triangles",
      lesson: {
        heading: "Sine rule, cosine rule, and area rule",
        sub: "Chapter 6 · Topic 2",
        body: `
          <p>These three rules extend trigonometry to <strong>any triangle</strong> (not just right-angled).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Area rule</div>
            <p>
              Area = ½ab·sinC (where C is the included angle between sides a and b)<br>
              Use when: <strong>two sides and included angle (SAS)</strong> are known.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Sine rule</div>
            <p>
              <span class="math">a/sinA = b/sinB = c/sinC</span><br><br>
              Use when: AAS or SSA (two angles + one side, or two sides + non-included angle).<br>
              <strong>Watch for the ambiguous case</strong> (SSA) — may give two solutions.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Cosine rule</div>
            <p>
              <span class="math">a² = b² + c² − 2bc·cosA</span><br>
              Rearranged: <span class="math">cosA = (b² + c² − a²) / 2bc</span><br><br>
              Use when: <strong>SAS</strong> (two sides + included angle) or <strong>SSS</strong> (three sides).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Cosine rule</div>
            <p>In △ABC: a = 8, b = 6, C = 60°. Find c.<br>
            <span class="math">c² = 64 + 36 − 2(8)(6)cos60° = 100 − 96(½) = 100 − 48 = 52</span><br>
            <span class="math">c = √52 = 2√13 ≈ 7.21</span></p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Area of △ABC where a = 7, b = 5, C = 30°:",
          options: ["8.75", "17.5", "35/4", "Both A and C"],
          answer: 3,
          topic: "Sine rule, cosine rule & area rule"
        },
        {
          type: "mc",
          text: "In △PQR, p = 10, P = 45°, Q = 60°. Find q using the sine rule:",
          options: ["q = 10sin60°/sin45°", "q = sin60°/10sin45°", "q = 10sin45°/sin60°", "q = 10/(sin45°·sin60°)"],
          answer: 0,
          topic: "Sine rule, cosine rule & area rule"
        },
        {
          type: "mc",
          text: "In △ABC, a = 5, b = 7, c = 6. cosA equals:",
          options: ["(49+36−25)/84", "(25+49−36)/70", "(25+36−49)/60", "(36+49−25)/84"],
          answer: 2,
          topic: "Sine rule, cosine rule & area rule"
        },
        {
          type: "input",
          text: "Area of △ABC: sides b = 4 and c = 6, included angle A = 90°. Find area.",
          answer: "12",
          topic: "Sine rule, cosine rule & area rule"
        },
        {
          type: "mc",
          text: "The cosine rule is used when you have:",
          options: ["AAS", "SAS or SSS", "ASA", "AAA"],
          answer: 1,
          topic: "Sine rule, cosine rule & area rule"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 6 Workbook — Trigonometry",
    questions: [
      {
        number: 1,
        text: "Simplify without a calculator:",
        parts: [
          { label: "a", text: "sin(180°+x)·cos(360°−x)−cos(180°−x)·sin(−x)", marks: 4 },
          { label: "b", text: "sin²(90°−x) + sin²x", marks: 3 },
          { label: "c", text: "tan(180°+x)·cos(360°+x)/sin(90°+x)", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "Prove the following identities:",
        parts: [
          { label: "a", text: "(sinθ + cosθ)² = 1 + 2sinθ·cosθ", marks: 3 },
          { label: "b", text: "1/(1−sinθ) − 1/(1+sinθ) = 2tanθ·secθ", marks: 5 }
        ]
      },
      {
        number: 3,
        text: "In △ABC, AB = 9 cm, BC = 7 cm, and B̂ = 110°.",
        parts: [
          { label: "a", text: "Calculate the area of △ABC.", marks: 3 },
          { label: "b", text: "Calculate AC using the cosine rule.", marks: 3 },
          { label: "c", text: "Find angle A using the sine rule.", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "(−sinx)(cosx) − (−cosx)(−sinx) = −sinxcosx − sinxcosx = −2sinxcosx",
        b: "cos²x + sin²x = 1",
        c: "(tanx)(cosx)/(−sinx) ... simplify: (sinx/cosx)(cosx)/(−sinx) = −1"
      },
      2: {
        a: "LHS = sin²θ + 2sinθcosθ + cos²θ = 1 + 2sinθcosθ = RHS",
        b: "LHS = [(1+sinθ)−(1−sinθ)]/[(1−sinθ)(1+sinθ)] = 2sinθ/(1−sin²θ) = 2sinθ/cos²θ = 2(sinθ/cosθ)(1/cosθ) = 2tanθ·secθ = RHS"
      },
      3: {
        a: "Area = ½(9)(7)sin110° ≈ ½(63)(0.9397) ≈ 29.6 cm²",
        b: "AC²=81+49−2(9)(7)cos110°=130−126cos110°≈130+43.1≈173.1 → AC≈13.2 cm",
        c: "sinA/7 = sin110°/13.2 → sinA≈0.498 → A≈29.9°"
      }
    }
  }
});
