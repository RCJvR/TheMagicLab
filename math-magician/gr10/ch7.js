// Math Magician — Grade 10, Chapter 7
// Euclidean Geometry Part 1

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 0,
      chapter: 7,
      name: "Triangles",
      fullName: "Triangle properties, congruence, and similarity",
      lesson: {
        heading: "Triangles — properties, congruence, and similarity",
        sub: "Chapter 7 · Topic 1",
        body: `
          <p>In Grade 10, Euclidean Geometry moves from observation to <strong>proof using theorems</strong>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Triangle angle sum & exterior angle</div>
            <p>
              The sum of interior angles of a triangle = 180°.<br>
              An exterior angle = sum of the two non-adjacent interior angles.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Congruent triangles (≅)</div>
            <p>Two triangles are congruent if corresponding sides and angles are equal. Conditions:<br>
            <strong>SSS</strong> — three sides<br>
            <strong>SAS</strong> — two sides and included angle<br>
            <strong>AAS</strong> — two angles and corresponding side<br>
            <strong>RHS</strong> — right angle, hypotenuse, side</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Similar triangles (|||)</div>
            <p>Two triangles are similar if:<br>
            • Corresponding angles are equal (AA or AAA), OR<br>
            • Corresponding sides are in proportion (SSS proportionality)<br><br>
            If △ABC ||| △DEF with ratio k, then corresponding sides are in ratio k and areas in ratio k².</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove similarity</div>
            <p>In △PQR and △PST, ∠P is common and ∠PQR = ∠PST. Prove △PQR ||| △PST.<br><br>
            In △PQR and △PST:<br>
            ∠P = ∠P (common)<br>
            ∠PQR = ∠PST (given)<br>
            ∴ △PQR ||| △PST (AA)</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "An exterior angle of a triangle measures 110°. One non-adjacent interior angle is 45°. Find the other non-adjacent interior angle.",
          options: ["65°", "70°", "55°", "45°"],
          answer: 0,
          topic: "Triangles"
        },
        {
          type: "mc",
          text: "Which set of conditions proves two triangles congruent?",
          options: ["AAA", "SSA", "SAS", "ASS"],
          answer: 2,
          topic: "Triangles"
        },
        {
          type: "mc",
          text: "Two similar triangles have sides in ratio 2:3. The ratio of their areas is:",
          options: ["2:3", "4:9", "8:27", "1:1"],
          answer: 1,
          topic: "Triangles"
        },
        {
          type: "input",
          text: "In △ABC ||| △DEF, AB = 6, DE = 9, and BC = 8. Find EF.",
          answer: "12",
          topic: "Triangles"
        },
        {
          type: "mc",
          text: "In an isosceles triangle with two equal angles of 52°, the third angle is:",
          options: ["76°", "128°", "52°", "104°"],
          answer: 0,
          topic: "Triangles"
        }
      ]
    },
    {
      id: 1,
      chapter: 7,
      name: "Quadrilaterals & midpoint theorem",
      fullName: "Quadrilateral properties and the midpoint theorem",
      lesson: {
        heading: "Quadrilaterals and the midpoint theorem",
        sub: "Chapter 7 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Quadrilateral properties</div>
            <p>
              <strong>Parallelogram:</strong> Opposite sides ∥ and equal; opposite angles equal; diagonals bisect each other.<br>
              <strong>Rectangle:</strong> All properties of parallelogram + all angles 90°; diagonals equal.<br>
              <strong>Rhombus:</strong> All properties of parallelogram + all sides equal; diagonals bisect at 90° and bisect angles.<br>
              <strong>Square:</strong> All properties of rectangle + rhombus.<br>
              <strong>Trapezium:</strong> One pair of parallel sides.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Midpoint theorem</div>
            <p>
              The line segment joining the midpoints of two sides of a triangle is:<br>
              (1) <strong>parallel to the third side</strong>, and<br>
              (2) <strong>equal to half its length</strong>.<br><br>
              Converse: A line through the midpoint of one side of a triangle, parallel to the second side, bisects the third side.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Using the midpoint theorem</div>
            <p>In △ABC, M is the midpoint of AB and N is the midpoint of AC.<br>
            If BC = 14 cm, then MN = 7 cm (half of BC).<br>
            Also, MN ∥ BC.</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a parallelogram, one angle is 70°. An adjacent angle is:",
          options: ["70°", "110°", "140°", "35°"],
          answer: 1,
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "mc",
          text: "Which quadrilateral has diagonals that bisect each other at right angles AND bisect the vertex angles?",
          options: ["Rectangle", "Parallelogram", "Rhombus", "Trapezium"],
          answer: 2,
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "input",
          text: "In △PQR, M is the midpoint of PQ and N is the midpoint of PR. If QR = 18, find MN.",
          answer: "9",
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "mc",
          text: "The diagonals of a rectangle are 10 cm. One side is 6 cm. The other side is:",
          options: ["4 cm", "8 cm", "√136 cm", "16 cm"],
          answer: 1,
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "mc",
          text: "ABCD is a parallelogram. If AC = 20, the diagonals bisect each other, so AO =",
          options: ["20", "10", "5", "Cannot determine"],
          answer: 1,
          topic: "Quadrilaterals & midpoint theorem"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 7 Workbook — Euclidean Geometry",
    questions: [
      {
        number: 1,
        text: "In △ABC, D is on AB and E is on AC such that DE ∥ BC. AD = 4, DB = 6, and BC = 15.",
        parts: [
          { label: "a", text: "Show that △ADE ||| △ABC.", marks: 4 },
          { label: "b", text: "Calculate DE.", marks: 3 },
          { label: "c", text: "If the area of △ADE is 16 cm², find the area of △ABC.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "PQRS is a parallelogram where PQ = 2x − 3 and RS = x + 4. The diagonal PR = 18.",
        parts: [
          { label: "a", text: "Find x.", marks: 3 },
          { label: "b", text: "Hence find PQ.", marks: 1 },
          { label: "c", text: "Find PT where T is the intersection of the diagonals.", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "In △ABC, M and N are the midpoints of AB and AC respectively. MN = 3x − 2 and BC = 4x + 6.",
        parts: [
          { label: "a", text: "Use the midpoint theorem to write an equation.", marks: 2 },
          { label: "b", text: "Solve for x.", marks: 2 },
          { label: "c", text: "Find BC.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "∠A common; ∠ADE=∠ABC (corr angles, DE∥BC) → AA → △ADE|||△ABC",
        b: "AD/AB = DE/BC → 4/10 = DE/15 → DE = 6",
        c: "Area ratio = (4/10)² = 16/100 → Area ABC = 100 cm²"
      },
      2: {
        a: "PQ=RS (opp sides parallelogram): 2x−3=x+4 → x=7",
        b: "PQ = 11",
        c: "PT = PR/2 = 9"
      },
      3: {
        a: "MN = ½BC → 3x−2 = ½(4x+6)",
        b: "3x−2=2x+3 → x=5",
        c: "BC = 26"
      }
    }
  }
});
