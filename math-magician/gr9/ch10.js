// Math Magician — Grade 9, Chapter 10 data
// Geometric Constructions

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 19,
      chapter: 10,
      name: "Bisectors and perpendiculars",
      fullName: "Constructing bisectors and perpendicular lines",
      lesson: {
        heading: "Bisectors and perpendicular lines",
        sub: "Chapter 10 · Topic 1",
        body: `
          <p>Geometric constructions use only a <strong>compass</strong> and <strong>straight edge</strong> (ruler used for drawing lines only, not measuring).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key constructions</div>
            <p>
              <strong>Perpendicular bisector of AB:</strong><br>
              1. Open compass to more than half AB. Draw arcs above and below the line from A, then from B.<br>
              2. Connect the two intersection points. This line is perpendicular to AB at its midpoint.<br><br>
              <strong>Angle bisector of ∠ABC:</strong><br>
              1. Draw an arc from B to cut BA and BC at D and E.<br>
              2. Draw equal arcs from D and E; connect B to their intersection.<br><br>
              <strong>Perpendicular from a point to a line:</strong><br>
              Draw arcs from the point to cut the line at two points; construct the perpendicular bisector of those two points.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Key facts</div>
            <div class="example-step"><span class="step-num">1</span><span>A perpendicular bisector cuts a line segment at 90° through its midpoint.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>An angle bisector divides an angle into two equal parts.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>The perpendicular bisectors of the sides of a triangle meet at the circumcentre.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>The angle bisectors of a triangle meet at the incentre.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In exam questions, always leave your construction arcs visible — they show your method and earn marks.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "A perpendicular bisector of a line segment:", options: ["Bisects the angles of the segment", "Cuts the line at 90° at its midpoint", "Passes through any point on the segment", "Is parallel to the segment"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "How many equal parts does an angle bisector create?", options: ["3", "4", "2", "1"], answer: 2, topic: "Constructions" },
        { type: "mc", text: "Which tool is NOT used in geometric constructions?", options: ["Compass", "Straight edge", "Protractor", "Pencil"], answer: 2, topic: "Constructions" },
        { type: "mc", text: "The perpendicular bisectors of a triangle's sides all meet at the:", options: ["Incentre", "Centroid", "Circumcentre", "Orthocentre"], answer: 2, topic: "Constructions" },
        { type: "mc", text: "To construct a 60° angle, you would:", options: ["Bisect a 120° angle", "Construct an equilateral triangle", "Bisect a right angle", "Use a protractor only"], answer: 1, topic: "Constructions" },
      ]
    },
    {
      id: 20,
      chapter: 10,
      name: "Constructing triangles and polygons",
      fullName: "Constructing triangles and regular polygons",
      lesson: {
        heading: "Constructing triangles and polygons",
        sub: "Chapter 10 · Topic 2",
        body: `
          <p>Triangles can be constructed given certain measurements. Regular polygons can be inscribed in circles.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Triangle construction conditions</div>
            <p>
              <strong>SSS:</strong> three sides given — draw base, arc from each end at given lengths, join to intersection.<br>
              <strong>SAS:</strong> two sides and included angle — draw base, construct angle, mark second side.<br>
              <strong>ASA:</strong> two angles and included side — draw base, construct angles at each end.<br>
              <strong>RHS:</strong> right angle, hypotenuse and one side.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Regular polygons in a circle</div>
            <div class="example-step"><span class="step-num">1</span><span>Equilateral triangle: central angle = 360°/3 = 120°; or set compass to radius and mark off 6 points (every alternate point gives triangle).</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Square: central angle = 360°/4 = 90°; draw two perpendicular diameters.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Regular hexagon: central angle = 60°; set compass equal to radius and step around the circle.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For SSS constructions, if the sum of the two shorter sides ≤ longest side, no triangle is possible (triangle inequality).</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Which condition is sufficient to construct a unique triangle?", options: ["SSS", "AAA", "SS only", "A only"], answer: 0, topic: "Constructions" },
        { type: "mc", text: "The central angle for a regular hexagon inscribed in a circle is:", options: ["90°", "60°", "72°", "45°"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "Can you construct a triangle with sides 3 cm, 4 cm, 8 cm?", options: ["Yes", "No — triangle inequality fails", "Yes — it's a right triangle", "Only with a protractor"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "To construct a square inscribed in a circle, you draw:", options: ["4 equal arcs from any point", "Two perpendicular diameters", "A tangent at 4 points", "4 arcs from the centre"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "In a SAS construction, the 'S' on either side of 'A' stands for:", options: ["Sum", "Side", "Segment", "Symmetry"], answer: 1, topic: "Constructions" },
      ]
    },
  ],
  workbook: {
    chapter: 10, chapterName: "Geometric Constructions",
    topics: [
      {
        name: "Bisectors and Perpendiculars",
        questions: [
          {
            num: "1",
            text: "Using only a compass and straight edge:",
            parts: [
              { label: "a)", text: "Draw a line segment AB = 8 cm. Construct its perpendicular bisector. Label the midpoint M.", marks: 4 },
              { label: "b)", text: "Draw an angle of approximately 80° (use a protractor for this step). Bisect the angle using only compass and straight edge.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Constructing Triangles",
        questions: [
          {
            num: "2",
            text: "Construct triangle ABC where AB = 7 cm, BC = 5 cm and AC = 6 cm (SSS). Measure and write down angle ABC.", marks: 6
          },
          {
            num: "3",
            text: "Construct triangle PQR where PQ = 6 cm, angle P = 50° and PR = 5 cm (SAS). Measure QR.", marks: 6
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 10, chapterName: "Chapter 10 — Geometric Constructions",
    topics: [
      {
        name: "Bisectors and Perpendiculars",
        answers: [
          { num: "Q1a", ans: "Award marks for: arcs drawn from A and B (radius > 4cm), two intersection points marked, bisector drawn through them, midpoint M labelled.", note: "Midpoint at 4 cm from each end" },
          { num: "Q1b", ans: "Award marks for: arc from vertex cutting both arms, equal arcs from those points, bisector ray drawn.", note: "Bisector should split angle into two equal parts" },
        ]
      },
      {
        name: "Constructing Triangles",
        answers: [
          { num: "Q2", ans: "Award marks for: base AB = 7 cm, arc of 5 cm from B, arc of 6 cm from A, C at intersection, triangle completed. Angle ABC ≈ 57° (accept 55°–59°).", note: "Use cosine rule to verify: cos B = (49+25−36)/70 = 38/70; B ≈ 57°" },
          { num: "Q3", ans: "Award marks for: PQ = 6 cm, 50° angle at P constructed, PR = 5 cm marked, QR drawn. QR ≈ 4,6 cm (accept 4,4–4,8 cm).", note: "Cosine rule: QR² = 36+25−60cos50 ≈ 22,4; QR ≈ 4,73" },
        ]
      },
    ]
  }
});
