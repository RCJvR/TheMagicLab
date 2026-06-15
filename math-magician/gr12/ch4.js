// Math Magician — Grade 12, Chapter 4
// Trigonometry — Compound Angles and Double Angles

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 0,
      chapter: 4,
      name: "Compound angle identities",
      fullName: "Compound angle identities and their proofs",
      lesson: {
        heading: "Compound angle identities",
        sub: "Chapter 4 · Topic 1",
        body: `
          <p>Grade 12 Trigonometry introduces the <strong>compound angle formulae</strong> — the most powerful tools in the trig toolkit, used to expand sin/cos of sums and differences of angles.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Compound angle identities (given on formula sheet)</div>
            <p>
              <span class="math">sin(α ± β) = sinα·cosβ ± cosα·sinβ</span><br>
              <span class="math">cos(α + β) = cosα·cosβ − sinα·sinβ</span><br>
              <span class="math">cos(α − β) = cosα·cosβ + sinα·sinβ</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Double angle identities (derived)</div>
            <p>
              Set β = α in the compound formulae:<br>
              <span class="math">sin(2α) = 2sinα·cosα</span><br>
              <span class="math">cos(2α) = cos²α − sin²α = 1 − 2sin²α = 2cos²α − 1</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Exact value</div>
            <p>Evaluate sin 75° without a calculator:<br>
            <span class="math">sin 75° = sin(45° + 30°) = sin45°cos30° + cos45°sin30°</span><br>
            <span class="math">= (√2/2)(√3/2) + (√2/2)(½) = √6/4 + √2/4 = (√6 + √2)/4</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove identity</div>
            <p>Prove: sin(x + 30°) + sin(x − 30°) = sin x<br>
            LHS = sinx·cos30°+cosx·sin30° + sinx·cos30°−cosx·sin30°<br>
            = 2sinx·cos30° = 2sinx·(√3/2) = √3 sinx ≠ sinx<br>
            (This would NOT be true — always verify before assuming!)</p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "cos(A − B) = ", options: ["cosAcosB − sinAsinB", "cosAcosB + sinAsinB", "sinAcosB + cosAsinB", "cosA − cosB"], answer: 1, topic: "Compound angle identities" },
        { type: "mc", text: "sin(2θ) expressed differently:", options: ["sin²θ − cos²θ", "2sinθcosθ", "cos²θ − sin²θ", "2cos²θ − 1"], answer: 1, topic: "Compound angle identities" },
        { type: "mc", text: "Exact value of cos 15° = cos(45° − 30°):", options: ["(√6+√2)/4", "(√6−√2)/4", "(√3+1)/4", "(√3−1)/4"], answer: 0, topic: "Compound angle identities" },
        { type: "mc", text: "cos(2x) in terms of sinx only:", options: ["2cos²x−1", "1−2sin²x", "cos²x−sin²x", "2sinxcosx"], answer: 1, topic: "Compound angle identities" },
        { type: "input", text: "If sinα = 3/5 (α acute), find sin(2α).", answer: "24/25", topic: "Compound angle identities" }
      ]
    },
    {
      id: 1,
      chapter: 4,
      name: "Trig equations & 3D applications",
      fullName: "Solving trig equations with compound angles and 3D trigonometry problems",
      lesson: {
        heading: "Solving trig equations and 3D problems",
        sub: "Chapter 4 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 General solutions of trig equations</div>
            <p>
              For <span class="math">sin x = k</span>: <span class="math">x = arcsin(k) + 360°n</span> or <span class="math">x = 180° − arcsin(k) + 360°n</span><br>
              For <span class="math">cos x = k</span>: <span class="math">x = ±arccos(k) + 360°n</span><br>
              For <span class="math">tan x = k</span>: <span class="math">x = arctan(k) + 180°n</span><br>
              (n ∈ ℤ — the "general solution")<br><br>
              Substitute specific values of n to find solutions in a given interval.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: General solution</div>
            <p>Solve sin(2x + 10°) = cos 40° for x ∈ [0°; 360°]<br>
            cos 40° = sin 50° (co-ratio)<br>
            <span class="math">2x + 10° = 50° + 360°n → x = 20° + 180°n</span><br>
            <span class="math">2x + 10° = 130° + 360°n → x = 60° + 180°n</span><br>
            In [0°; 360°]: x = 20°, 60°, 200°, 240°</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 3D trigonometry</div>
            <p>
              Problems in 3D require identifying <strong>right triangles within the 3D figure</strong> and applying sine rule, cosine rule, or basic trig ratios step by step.<br><br>
              Key strategy: draw each relevant triangle separately with labelled sides and angles.
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "General solution of tan x = 1:", options: ["x = 45° + 360°n", "x = 45° + 180°n", "x = ±45° + 360°n", "x = 135° + 360°n"], answer: 1, topic: "Trig equations & 3D applications" },
        { type: "mc", text: "Solve sin(x − 20°) = ½ for x ∈ [0°; 360°]. The solutions are:", options: ["x = 50° and 130°", "x = 50° and 150°", "x = 70° and 130°", "x = 90° and 70°"], answer: 1, topic: "Trig equations & 3D applications" },
        { type: "mc", text: "In a 3D problem, the angle of elevation from A to the top T of a vertical tower BT is found using:", options: ["tan(angle) = BT/AB", "The cosine rule in 3D", "Two separate 2D right triangles", "The sine rule directly in 3D"], answer: 0, topic: "Trig equations & 3D applications" },
        { type: "mc", text: "Solve: 2sin²x − sinx − 1 = 0 for x ∈ [0°; 360°]", options: ["x = 90°, 210°, 330°", "x = 90°, 210°, 270°", "x = 30°, 150°, 270°", "x = 270°, 210°, 330°"], answer: 3, topic: "Trig equations & 3D applications" },
        { type: "input", text: "sin(x + 45°) = −1 for x ∈ [0°; 360°]. Find x.", answer: "225", altAnswers: ["225°"], topic: "Trig equations & 3D applications" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 4 Workbook — Trigonometry",
    questions: [
      { number: 1, text: "Without a calculator:", parts: [
        { label: "a", text: "Evaluate sin 105° using sin(60° + 45°).", marks: 4 },
        { label: "b", text: "Evaluate cos 2(30°) using each of the three double angle forms.", marks: 4 }
      ]},
      { number: 2, text: "Prove the following identities:", parts: [
        { label: "a", text: "cos(x + 45°) + cos(x − 45°) = √2 cos x", marks: 4 },
        { label: "b", text: "sin(A + B)/sin(A − B) = (tanA + tanB)/(tanA − tanB)", marks: 5 }
      ]},
      { number: 3, text: "Solve for x ∈ [0°; 360°]:", parts: [
        { label: "a", text: "cos(2x) = cos x", marks: 5 },
        { label: "b", text: "sin(x + 30°) = cos x", marks: 5 }
      ]}
    ],
    answers: {
      1: { a: "sin105°=sin60°cos45°+cos60°sin45°=(√3/2)(√2/2)+(½)(√2/2)=√6/4+√2/4=(√6+√2)/4", b: "cos60°=cos²30°−sin²30°=¾−¼=½; =1−2sin²30°=1−½=½; =2cos²30°−1=3/2−1=½ ✓" },
      2: { a: "LHS=(cosxcos45°−sinxsin45°)+(cosxcos45°+sinxsin45°)=2cosxcos45°=2cosx(√2/2)=√2cosx=RHS", b: "LHS=(sinAcosB+cosAsinB)/(sinAcosB−cosAsinB); divide numerator and denominator by cosAcosB → (tanA+tanB)/(tanA−tanB)=RHS" },
      3: { a: "cos2x=cosx→2cos²x−1=cosx→2cos²x−cosx−1=0→(2cosx+1)(cosx−1)=0→cosx=−½or1→x=120°,240°,0°,360°", b: "sinxcos30°+cosxsin30°=cosx→(√3/2)sinx+(½)cosx=cosx→(√3/2)sinx=½cosx→tanx=1/√3→x=30°,210°" }
    }
  }
});
