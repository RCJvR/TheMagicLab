// Math Magician — Grade 9, Chapter 11 data
// Geometry of 2D Shapes

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 21,
      chapter: 11,
      name: "Triangles and quadrilaterals",
      fullName: "Properties of triangles and quadrilaterals",
      lesson: {
        heading: "Triangles and quadrilaterals",
        sub: "Chapter 11 · Topic 1",
        body: `
          <p>Understanding the properties of 2D shapes allows us to calculate unknown angles and sides.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Triangle properties</div>
            <p>
              <strong>Angle sum:</strong> angles in a triangle = 180°<br>
              <strong>Equilateral:</strong> 3 equal sides, 3 angles of 60°<br>
              <strong>Isosceles:</strong> 2 equal sides; angles opposite equal sides are equal<br>
              <strong>Scalene:</strong> no equal sides or angles<br>
              <strong>Right-angled:</strong> one angle = 90°<br>
              <strong>Exterior angle:</strong> = sum of the two non-adjacent interior angles
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Quadrilateral hierarchy</div>
            <p>
              <strong>Parallelogram:</strong> 2 pairs of parallel sides; opposite sides equal; opposite angles equal; diagonals bisect each other.<br>
              <strong>Rectangle:</strong> parallelogram + all angles 90°; diagonals equal.<br>
              <strong>Rhombus:</strong> parallelogram + all sides equal; diagonals bisect at 90°.<br>
              <strong>Square:</strong> rectangle + rhombus (all sides equal, all angles 90°).<br>
              <strong>Trapezium:</strong> exactly one pair of parallel sides.<br>
              <strong>Kite:</strong> two pairs of adjacent equal sides; one diagonal bisects the other at 90°.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Every square is a rectangle AND a rhombus. But not every rectangle is a square.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Two angles of a triangle are 47° and 83°. The third angle is:", options: ["50°", "40°", "60°", "130°"], answer: 0, topic: "2D Shapes" },
        { type: "mc", text: "In an isosceles triangle, the base angles are each 55°. The apex angle is:", options: ["55°", "70°", "110°", "90°"], answer: 1, topic: "2D Shapes" },
        { type: "mc", text: "Which quadrilateral has diagonals that bisect each other at 90°?", options: ["Rectangle", "Trapezium", "Rhombus", "Kite"], answer: 2, topic: "2D Shapes" },
        { type: "input", text: "The exterior angle of a triangle is 115°. One non-adjacent interior angle is 60°. Find the other non-adjacent interior angle.", answer: "55", topic: "2D Shapes" },
        { type: "mc", text: "Which statement about a parallelogram is FALSE?", options: ["Opposite sides are equal", "Opposite angles are equal", "All angles are 90°", "Diagonals bisect each other"], answer: 2, topic: "2D Shapes" },
      ]
    },
    {
      id: 22,
      chapter: 11,
      name: "Similar and congruent shapes",
      fullName: "Similarity and congruence of triangles",
      lesson: {
        heading: "Similar and congruent triangles",
        sub: "Chapter 11 · Topic 2",
        body: `
          <p><strong>Congruent</strong> shapes are identical (same shape AND size). <strong>Similar</strong> shapes have the same shape but different sizes.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Congruence conditions (triangles)</div>
            <p>
              <strong>SSS:</strong> three sides equal<br>
              <strong>SAS:</strong> two sides and included angle equal<br>
              <strong>AAS/ASA:</strong> two angles and a corresponding side equal<br>
              <strong>RHS:</strong> right angle, hypotenuse and one side equal
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Similarity</div>
            <p>
              Triangles are similar if:<br>
              • All three pairs of angles are equal (AA is sufficient), OR<br>
              • All sides are in the same ratio (SSS similarity)<br><br>
              <strong>Scale factor k:</strong> if sides of △ABC are k times sides of △DEF, then areas are in ratio k²
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In similarity problems, always match corresponding vertices in the same order. △ABC ||| △DEF means A↔D, B↔E, C↔F.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Two triangles have angles 40°, 70°, 70° and 40°, 70°, 70°. They are:", options: ["Congruent", "Similar (not necessarily congruent)", "Neither", "Both congruent and similar"], answer: 1, topic: "2D Shapes" },
        { type: "mc", text: "Which is NOT a congruence condition for triangles?", options: ["SSS", "AAS", "AAA", "RHS"], answer: 2, topic: "2D Shapes" },
        { type: "input", text: "Two similar triangles have a scale factor of 3. If the smaller triangle has area 8 cm², what is the area of the larger triangle?", answer: "72", topic: "2D Shapes" },
        { type: "mc", text: "△ABC ||| △DEF with AB = 4, DE = 6 and BC = 5. Find EF.", options: ["7,5", "3,33", "7", "10"], answer: 0, topic: "2D Shapes" },
        { type: "mc", text: "The SAS congruence condition requires:", options: ["Two sides equal only", "Two angles and a side equal", "Two sides AND the INCLUDED angle equal", "Two sides and any angle equal"], answer: 2, topic: "2D Shapes" },
      ]
    },
  ],
  workbook: {
    chapter: 11, chapterName: "Geometry of 2D Shapes",
    topics: [
      {
        name: "Triangles and Quadrilaterals",
        questions: [
          {
            num: "1",
            text: "In triangle ABC: angle A = (2x + 10)°, angle B = (3x − 5)° and angle C = (x + 15)°.",
            parts: [
              { label: "a)", text: "Find x.", marks: 3 },
              { label: "b)", text: "Find each angle.", marks: 3 },
              { label: "c)", text: "Classify the triangle (acute, obtuse or right-angled).", marks: 2 },
            ]
          },
          {
            num: "2",
            text: "ABCD is a parallelogram. Angle A = (4y − 10)° and angle B = (2y + 30)°.",
            parts: [
              { label: "a)", text: "Find y. (Use the co-interior angle property: A + B = 180°)", marks: 3 },
              { label: "b)", text: "Find all four angles of the parallelogram.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Similarity and Congruence",
        questions: [
          {
            num: "3",
            text: "Two similar triangles have corresponding sides in the ratio 2 : 5.",
            parts: [
              { label: "a)", text: "If the smaller triangle has perimeter 18 cm, find the perimeter of the larger triangle.", marks: 2 },
              { label: "b)", text: "If the larger triangle has area 100 cm², find the area of the smaller triangle.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 11, chapterName: "Chapter 11 — Geometry of 2D Shapes",
    topics: [
      {
        name: "Triangles and Quadrilaterals",
        answers: [
          { num: "Q1a", ans: "x = 27", note: "(2x+10)+(3x−5)+(x+15)=180 → 6x+20=180 → x=27" },
          { num: "Q1b", ans: "A=64°, B=76°, C=57°", note: "Substitute x=27 into each" },
          { num: "Q1c", ans: "Acute-angled triangle", note: "All angles less than 90°" },
          { num: "Q2a", ans: "y = 26,67 → accept y = 80/3", note: "(4y−10)+(2y+30)=180 → 6y+20=180 → y=160/6=26,7" },
          { num: "Q2b", ans: "A = C ≈ 96,7°; B = D ≈ 83,3°", note: "Opposite angles of parallelogram equal; co-interior supplement each other" },
        ]
      },
      {
        name: "Similarity and Congruence",
        answers: [
          { num: "Q3a", ans: "45 cm", note: "18 × 5/2 = 45" },
          { num: "Q3b", ans: "16 cm²", note: "Area ratio = (2/5)² = 4/25; smaller = 100 × 4/25 = 16 cm²" },
        ]
      },
    ]
  }
});
