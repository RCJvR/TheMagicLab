// Math Magician — Grade 9, Chapter 12 data
// Geometry of Straight Lines

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 23,
      chapter: 12,
      name: "Angle relationships",
      fullName: "Angle relationships on straight lines",
      lesson: {
        heading: "Angle relationships on straight lines",
        sub: "Chapter 12 · Topic 1",
        body: `
          <p>Several important angle relationships arise when lines intersect or when parallel lines are cut by a transversal.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Basic angle relationships</div>
            <p>
              <strong>Angles on a straight line:</strong> sum = 180° (supplementary)<br>
              <strong>Angles around a point:</strong> sum = 360°<br>
              <strong>Vertically opposite angles:</strong> equal (formed by intersecting lines)<br>
              <strong>Complementary angles:</strong> sum = 90°<br>
              <strong>Supplementary angles:</strong> sum = 180°
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Parallel lines cut by a transversal</div>
            <p>
              <strong>Corresponding angles (F-angles):</strong> equal<br>
              <strong>Alternate interior angles (Z-angles):</strong> equal<br>
              <strong>Co-interior angles (C-angles):</strong> supplementary (add to 180°)<br><br>
              <em>These relationships also work in REVERSE: if any pair satisfies the condition, the lines are parallel.</em>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always give a reason with every angle calculation. "Vert. opp. ∠s", "Alt. ∠s, AB ∥ CD", "Co-int. ∠s, PQ ∥ RS" — reasons earn marks.</span></div>
        `
      },
      questions: [
        { type: "input", text: "An angle is 37°. Find its supplementary angle.", answer: "143", topic: "Lines" },
        { type: "mc", text: "Vertically opposite angles are:", options: ["Supplementary", "Complementary", "Equal", "Adjacent"], answer: 2, topic: "Lines" },
        { type: "input", text: "Two parallel lines are cut by a transversal. One co-interior angle is 65°. Find the other.", answer: "115", topic: "Lines" },
        { type: "mc", text: "Which angle pair are equal when formed by parallel lines and a transversal?", options: ["Co-interior", "Corresponding", "Supplementary", "Adjacent"], answer: 1, topic: "Lines" },
        { type: "mc", text: "Angles of 3x° and (x + 40)° are vertically opposite. Find x.", options: ["20", "10", "15", "35"], answer: 0, topic: "Lines" },
      ]
    },
    {
      id: 24,
      chapter: 12,
      name: "Proving parallel lines",
      fullName: "Proving lines parallel and solving problems",
      lesson: {
        heading: "Proving lines are parallel",
        sub: "Chapter 12 · Topic 2",
        body: `
          <p>We can prove lines are parallel by showing that specific angle pairs satisfy the required conditions.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Conditions to prove AB ∥ CD</div>
            <p>
              If a transversal cuts two lines and:<br>
              • <strong>Corresponding angles are equal</strong> → lines are parallel<br>
              • <strong>Alternate interior angles are equal</strong> → lines are parallel<br>
              • <strong>Co-interior angles are supplementary</strong> → lines are parallel
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Multi-step example</div>
            <div class="example-step"><span class="step-num">1</span><span>In a diagram: ∠1 = 70°, ∠2 = 110° (co-interior). Do they sum to 180°? 70 + 110 = 180 → Yes, lines are parallel.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Find unknown angle: x = 180° − 55° = 125° (co-interior angles, given lines parallel)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Solve for variable: (3x + 10)° and (x + 50)° are alternate angles → 3x + 10 = x + 50 → x = 20</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>State which lines are parallel when giving reasons. E.g. "Corresponding ∠s, PQ ∥ RS" is a complete reason; just "corresponding ∠s" is incomplete.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "If alternate interior angles are equal when two lines are cut by a transversal, the lines are:", options: ["Perpendicular", "Parallel", "Equal length", "Skew"], answer: 1, topic: "Lines" },
        { type: "input", text: "Two alternate angles are (4x − 10)° and (2x + 30)°. Find x.", answer: "20", topic: "Lines" },
        { type: "mc", text: "Co-interior angles sum to 180°. This is a reason to conclude:", options: ["Angles are equal", "Lines are perpendicular", "Lines are parallel", "Angles are complementary"], answer: 2, topic: "Lines" },
        { type: "input", text: "Corresponding angles are (5x + 15)° and (3x + 45)°. Find x.", answer: "15", topic: "Lines" },
        { type: "mc", text: "Which COMPLETE reason would you use for alternate interior angles?", options: ["Alt. ∠s", "Alt. int. ∠s, AB ∥ CD", "Equal angles", "Z-pattern"], answer: 1, topic: "Lines" },
      ]
    },
  ],
  workbook: {
    chapter: 12, chapterName: "Geometry of Straight Lines",
    topics: [
      {
        name: "Angle Relationships",
        questions: [
          {
            num: "1",
            text: "Calculate the value of each unknown angle, giving a reason for each step:",
            parts: [
              { label: "a)", text: "Three angles on a straight line are (2x)°, (x + 10)° and 40°. Find x and all angles.", marks: 4 },
              { label: "b)", text: "Angles around a point include (3y)°, (2y + 20)°, (y + 40)° and 80°. Find y.", marks: 4 },
              { label: "c)", text: "Two intersecting lines form angles (4a − 5)° and (2a + 35)°. If they are vertically opposite, find a and both angles.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Parallel Lines",
        questions: [
          {
            num: "2",
            text: "AB ∥ CD and EF is a transversal. Angle AEF = (3x + 20)° and angle CFE = (x + 60)°.",
            parts: [
              { label: "a)", text: "Explain why AEF and CFE are alternate interior angles.", marks: 2 },
              { label: "b)", text: "Find x and both angles.", marks: 3 },
              { label: "c)", text: "Find the co-interior angle to AEF on the same side of the transversal.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 12, chapterName: "Chapter 12 — Geometry of Straight Lines",
    topics: [
      {
        name: "Angle Relationships",
        answers: [
          { num: "Q1a", ans: "x = 43,3°; angles: 86,7°, 53,3°, 40° — accept x = 130/3", note: "2x+x+10+40=180 → 3x=130 → x=43,3" },
          { num: "Q1b", ans: "y = 36°", note: "3y+2y+20+y+40+80=360 → 6y+140=360 → 6y=220 → y=36,7. Accept 220/6." },
          { num: "Q1c", ans: "a = 20; both angles = 75°", note: "4a−5=2a+35 → 2a=40 → a=20; angle = 4(20)−5=75°" },
        ]
      },
      {
        name: "Parallel Lines",
        answers: [
          { num: "Q2a", ans: "They are on opposite sides of the transversal between the parallel lines, forming a Z-shape.", note: "Alternate interior angles lie between the parallel lines on opposite sides of the transversal" },
          { num: "Q2b", ans: "x = 20; both angles = 80°", note: "3x+20 = x+60 → 2x=40 → x=20; angle = 80°" },
          { num: "Q2c", ans: "100°", note: "Co-interior angles sum to 180°; 180°−80°=100°" },
        ]
      },
    ]
  }
});
