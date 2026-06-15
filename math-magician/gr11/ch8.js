// Math Magician — Grade 11, Chapter 8
// Euclidean Geometry — Circle Geometry

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 0,
      chapter: 8,
      name: "Circle theorems",
      fullName: "Theorems about circles — chords, angles, and arcs",
      lesson: {
        heading: "Circle theorems",
        sub: "Chapter 8 · Topic 1",
        body: `
          <p>Circle geometry is a major new section in Grade 11. You must know the theorems AND be able to prove them formally.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The eight key circle theorems</div>
            <p>
              <strong>1. Chord and centre:</strong> The perpendicular from the centre to a chord bisects the chord.<br>
              <strong>2. Perpendicular bisector:</strong> The perpendicular bisector of a chord passes through the centre.<br>
              <strong>3. Central angle:</strong> The angle subtended by an arc at the centre is double the angle subtended at the circumference.<br>
              <strong>4. Same arc:</strong> Angles in the same segment are equal (angles subtended by the same arc).<br>
              <strong>5. Semicircle:</strong> The angle in a semicircle is 90°.<br>
              <strong>6. Cyclic quadrilateral:</strong> Opposite angles of a cyclic quadrilateral are supplementary (sum to 180°).<br>
              <strong>7. Exterior angle:</strong> The exterior angle of a cyclic quadrilateral equals the interior opposite angle.<br>
              <strong>8. Tangent-radius:</strong> The tangent to a circle is perpendicular to the radius at the point of contact.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Central angle theorem</div>
            <p>O is the centre. ∠AOB = 80° (central angle). Then ∠ACB (angle at circumference, same arc) = 40°.<br>
            (Central angle = 2 × circumference angle)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Converse theorems</div>
            <p>
              Each theorem has a converse used to prove that four points are concyclic (lie on a circle):<br>
              E.g. If opposite angles of a quadrilateral are supplementary → it is a cyclic quadrilateral.
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "O is the centre. Arc AB subtends ∠AOB = 110° at centre. ∠ACB at circumference =",
          options: ["110°", "55°", "220°", "70°"],
          answer: 1,
          topic: "Circle theorems"
        },
        {
          type: "mc",
          text: "ABCD is a cyclic quadrilateral. ∠A = 78°. Then ∠C =",
          options: ["78°", "102°", "156°", "282°"],
          answer: 1,
          topic: "Circle theorems"
        },
        {
          type: "mc",
          text: "AB is a diameter. ∠ACB where C is on the circle equals:",
          options: ["180°", "90°", "45°", "Depends on position of C"],
          answer: 1,
          topic: "Circle theorems"
        },
        {
          type: "mc",
          text: "A tangent touches a circle at P. OP is a radius. The angle between OP and the tangent is:",
          options: ["45°", "60°", "90°", "180°"],
          answer: 2,
          topic: "Circle theorems"
        },
        {
          type: "mc",
          text: "Two angles inscribed in the same circle, both subtending arc PQ, are:",
          options: ["Supplementary", "Complementary", "Equal", "Related by factor of 2"],
          answer: 2,
          topic: "Circle theorems"
        }
      ]
    },
    {
      id: 1,
      chapter: 8,
      name: "Tangent theorems & chord proofs",
      fullName: "Tangent theorems, chord-angle theorems, and formal circle proofs",
      lesson: {
        heading: "Tangent theorems and chord-angle relationships",
        sub: "Chapter 8 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Tangent theorems</div>
            <p>
              <strong>Tangent from external point:</strong> The two tangents drawn from an external point to a circle are equal in length.<br>
              <strong>Tan-chord angle (tangent-chord angle):</strong> The angle between a tangent and a chord equals the inscribed angle on the opposite side of the chord (alternate segment theorem).<br>
              <span class="math">∠ between tangent and chord = ∠ in alternate segment</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Chord theorems</div>
            <p>
              <strong>Equal chords:</strong> Equal chords subtend equal angles at the centre.<br>
              <strong>Chord distance:</strong> Chords equidistant from the centre are equal.<br>
              <strong>Intersecting chords:</strong> If chords AB and CD intersect at P inside a circle:<br>
              <span class="math">PA × PB = PC × PD</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Alternate segment theorem</div>
            <p>Tangent at A. Chord AB. Inscribed angle ACB in the alternate segment = 58°.<br>
            Then the angle between the tangent and chord AB (on the same side as C) = 58°.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Proof structure for circle theorems</div>
            <p>
              Always:<br>
              1. Draw auxiliary lines where needed (e.g. draw the radius to the point of tangency).<br>
              2. State the theorem being proved clearly.<br>
              3. Use reason codes: ∠ in semicircle; opp ∠s cyclic quad; tan⊥radius; etc.
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Two tangents from external point P touch the circle at A and B. If PA = 5 cm, then PB =",
          options: ["5 cm", "10 cm", "2.5 cm", "Cannot determine"],
          answer: 0,
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "mc",
          text: "The alternate segment theorem says the angle between a tangent and a chord equals:",
          options: ["The central angle", "The angle in the alternate segment", "The supplement of the chord angle", "90°"],
          answer: 1,
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "mc",
          text: "Chords PQ and RS intersect at T inside a circle. PT = 4, TQ = 9, RT = 6. Find TS.",
          options: ["6", "8", "4", "12"],
          answer: 0,
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "mc",
          text: "The converse of the tan-chord theorem can be used to prove:",
          options: ["A line is a tangent", "A point is the centre", "An angle is a right angle", "A quadrilateral is cyclic"],
          answer: 0,
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "mc",
          text: "The perpendicular from the centre to a chord:",
          options: ["Bisects the chord", "Is equal to the radius", "Bisects the chord angle", "Is tangent to the chord"],
          answer: 0,
          topic: "Tangent theorems & chord proofs"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 8 Workbook — Euclidean Geometry (Circle Geometry)",
    questions: [
      {
        number: 1,
        text: "O is the centre of the circle. A, B, C, D are points on the circle. ∠AOB = 136°.",
        parts: [
          { label: "a", text: "Find ∠ACB. Give a reason.", marks: 2 },
          { label: "b", text: "If ABCD is a cyclic quadrilateral and ∠ABC = 104°, find ∠ADC.", marks: 2 },
          { label: "c", text: "Find the exterior angle of ABCD at D.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Prove that the angle subtended by a diameter at the circumference is 90°. (Use the theorem that the central angle is double the circumference angle.)",
        parts: [
          { label: "a", text: "State the given information clearly.", marks: 1 },
          { label: "b", text: "Write the full proof.", marks: 5 }
        ]
      },
      {
        number: 3,
        text: "In the figure, PT is a tangent to the circle at T, and PQR is a secant. PT = 8 cm and PQ = 4 cm.",
        parts: [
          { label: "a", text: "Using the tangent-secant relationship PT² = PQ × PR, find PR.", marks: 3 },
          { label: "b", text: "Find QR.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "∠ACB = 68° (∠ at circumference = ½ central ∠, same arc AB)",
        b: "∠ADC = 180° − 104° = 76° (opp ∠s of cyclic quad)",
        c: "Exterior ∠ at D = interior opposite ∠ = ∠ABC = 104°"
      },
      2: {
        a: "Given: AB is a diameter; C is any point on the circle (on major arc); O is centre",
        b: "∠AOB = 180° (AB is diameter, straight line); ∠ACB = ½∠AOB = ½(180°) = 90° (∠ at circumference = ½ central ∠)"
      },
      3: {
        a: "8² = 4 × PR → PR = 64/4 = 16 cm",
        b: "QR = PR − PQ = 16 − 4 = 12 cm"
      }
    }
  }
});
