// Math Magician — Grade 10, Chapter 12
// Euclidean Geometry Part 2 — Proofs and Conjectures

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 0,
      chapter: 12,
      name: "Proofs & conjectures",
      fullName: "Formal proofs in Euclidean geometry — circle geometry introduction",
      lesson: {
        heading: "Formal proofs and geometric conjectures",
        sub: "Chapter 12 · Topic 1",
        body: `
          <p>Grade 10 Part 2 Euclidean geometry moves from observation and application to <strong>formal proof</strong>. Every statement in a proof must be justified with a reason.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Structure of a geometric proof</div>
            <p>
              <strong>Given:</strong> state all given information.<br>
              <strong>Required to prove (RTP):</strong> state what must be shown.<br>
              <strong>Proof:</strong> logical sequence of statements, each with a reason.<br>
              <strong>Conclusion:</strong> state what has been proved.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Key theorems for Grade 10 proofs</div>
            <p>
              • Vertically opposite angles are equal.<br>
              • Angles on a straight line sum to 180° (supplementary).<br>
              • Alternate angles (Z-angles) with parallel lines are equal.<br>
              • Co-interior angles with parallel lines are supplementary.<br>
              • Corresponding angles (F-angles) with parallel lines are equal.<br>
              • Triangle angle sum = 180°.<br>
              • Exterior angle = sum of two non-adjacent interior angles.<br>
              • In a parallelogram: opposite sides equal and parallel, opposite angles equal, diagonals bisect each other.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Formal proof</div>
            <p><strong>Given:</strong> AB ∥ CD, E is a point between the two lines, ∠ABE = 55°, ∠DCE = 35°.<br>
            <strong>RTP:</strong> ∠BEC = 90°<br><br>
            <strong>Proof:</strong><br>
            Draw EF ∥ AB ∥ CD through E.<br>
            ∠BEF = ∠ABE = 55° (alternate angles, EF ∥ AB)<br>
            ∠FEC = ∠DCE = 35° (alternate angles, EF ∥ CD)<br>
            ∠BEC = ∠BEF + ∠FEC = 55° + 35° = 90° ✓</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a formal proof, every statement must be accompanied by:",
          options: ["A calculation", "A reason", "A diagram", "A formula"],
          answer: 1,
          topic: "Proofs & conjectures"
        },
        {
          type: "mc",
          text: "AB ∥ CD. A transversal cuts them, making ∠1 = 70° (co-interior with ∠2). Then ∠2 =",
          options: ["70°", "110°", "90°", "35°"],
          answer: 1,
          topic: "Proofs & conjectures"
        },
        {
          type: "mc",
          text: "Two lines intersect. One angle is 43°. The vertically opposite angle is:",
          options: ["137°", "47°", "43°", "90°"],
          answer: 2,
          topic: "Proofs & conjectures"
        },
        {
          type: "mc",
          text: "To prove ABCD is a parallelogram, it is sufficient to show:",
          options: ["All angles are 90°", "One pair of sides is parallel", "Both pairs of opposite sides are equal AND parallel", "The diagonals are equal"],
          answer: 2,
          topic: "Proofs & conjectures"
        },
        {
          type: "mc",
          text: "In △ABC, ∠A = 50°, ∠B = 70°. The exterior angle at C is:",
          options: ["60°", "120°", "180°", "110°"],
          answer: 1,
          topic: "Proofs & conjectures"
        }
      ]
    },
    {
      id: 1,
      chapter: 12,
      name: "Proving parallelogram properties",
      fullName: "Proving properties of quadrilaterals using deductive reasoning",
      lesson: {
        heading: "Proving quadrilateral properties",
        sub: "Chapter 12 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Conditions to prove a parallelogram</div>
            <p>
              ABCD is a parallelogram if ANY ONE of the following is proved:<br>
              1. Both pairs of opposite sides are parallel.<br>
              2. Both pairs of opposite sides are equal.<br>
              3. One pair of opposite sides is equal AND parallel.<br>
              4. Both pairs of opposite angles are equal.<br>
              5. The diagonals bisect each other.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Proving a rectangle, rhombus, or square</div>
            <p>
              First prove it is a parallelogram, then add the specific condition:<br>
              <strong>Rectangle:</strong> + one right angle (or diagonals are equal)<br>
              <strong>Rhombus:</strong> + one pair of adjacent sides equal (or diagonals bisect at 90°)<br>
              <strong>Square:</strong> + rectangle condition AND rhombus condition
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove PQRS is a parallelogram</div>
            <p>Given: PQ = SR and PQ ∥ SR.<br><br>
            In △PQS and △RSQ:<br>
            PQ = SR (given)<br>
            ∠PQS = ∠RSQ (alternate angles, PQ ∥ SR)<br>
            QS = SQ (common side)<br>
            ∴ △PQS ≅ △RSQ (SAS)<br>
            ∴ PS = QR and PS ∥ QR (from congruent triangles)<br>
            ∴ PQRS is a parallelogram (both pairs of opposite sides equal and parallel)</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "To prove ABCD is a rectangle, you must first prove it is a parallelogram and then show:",
          options: ["Diagonals are equal", "All sides are equal", "One angle is 90°", "Both A and C are correct"],
          answer: 3,
          topic: "Proving parallelogram properties"
        },
        {
          type: "mc",
          text: "In parallelogram ABCD, the diagonals AC and BD intersect at E. Which of these is NOT necessarily true?",
          options: ["AE = CE", "BE = DE", "AC = BD", "∠AEB = ∠CED"],
          answer: 2,
          topic: "Proving parallelogram properties"
        },
        {
          type: "mc",
          text: "The minimum number of conditions needed to prove a quadrilateral is a parallelogram is:",
          options: ["1", "2", "3", "4"],
          answer: 0,
          topic: "Proving parallelogram properties"
        },
        {
          type: "mc",
          text: "PQRS is a rhombus. Which statement is ALWAYS true?",
          options: ["PR = QS", "∠PQR = 90°", "PR ⊥ QS", "PQ ⊥ QR"],
          answer: 2,
          topic: "Proving parallelogram properties"
        },
        {
          type: "mc",
          text: "In a proof, which reason justifies: ∠ABC = ∠ADC in a parallelogram?",
          options: ["Alternate angles", "Vertically opposite angles", "Opposite angles of a parallelogram", "Corresponding angles"],
          answer: 2,
          topic: "Proving parallelogram properties"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 12 Workbook — Euclidean Geometry Part 2",
    questions: [
      {
        number: 1,
        text: "In the figure, AB ∥ CD. Transversal EF cuts AB at G and CD at H. ∠AGE = 115°.",
        parts: [
          { label: "a", text: "Find ∠BGE with a reason.", marks: 2 },
          { label: "b", text: "Find ∠GHD with a reason.", marks: 2 },
          { label: "c", text: "Find ∠GHC with a reason.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "ABCD is a quadrilateral where the diagonals AC and BD bisect each other at O. Prove that ABCD is a parallelogram.",
        parts: [
          { label: "a", text: "Consider △AOB and △COD. State three conditions for congruence.", marks: 3 },
          { label: "b", text: "State the congruence condition and conclude.", marks: 2 },
          { label: "c", text: "Repeat for △AOD and △COB to show both pairs of opposite sides are equal.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "PQRS is a parallelogram. T is the midpoint of PQ and U is the midpoint of SR. Prove that PTUS is a parallelogram.",
        parts: [
          { label: "a", text: "Write down PT and SU in terms of PQ.", marks: 2 },
          { label: "b", text: "Show PT = SU.", marks: 2 },
          { label: "c", text: "Show PT ∥ SU.", marks: 2 },
          { label: "d", text: "Conclude that PTUS is a parallelogram.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "∠BGE = 180°−115° = 65° (angles on a straight line)",
        b: "∠GHD = 115° (co-interior angles with AB∥CD supplement each other: 180°−65°=115°, OR alternate angles with ∠AGE)",
        c: "∠GHC = 65° (angles on a straight line, or corresponding with ∠BGE)"
      },
      2: {
        a: "AO=CO (given bisect); BO=DO (given bisect); ∠AOB=∠COD (vert opp angles)",
        b: "SAS → △AOB≅△COD → AB=CD and AB∥CD",
        c: "Similarly △AOD≅△COB (SAS) → AD=BC"
      },
      3: {
        a: "PT = ½PQ; SU = ½SR",
        b: "PQ=SR (opp sides parallelogram) → PT = ½PQ = ½SR = SU",
        c: "PQ∥SR (opp sides parallelogram) → PT∥SU",
        d: "PT=SU and PT∥SU → PTUS is a parallelogram"
      }
    }
  }
});
