// Math Magician — Grade 9, Chapter 16 data
// Transformation Geometry

MathMagician.registerChapter(16, {
  topics: [
    {
      id: 31,
      chapter: 16,
      name: "Translations and reflections",
      fullName: "Translations and reflections on the Cartesian plane",
      lesson: {
        heading: "Translations and reflections",
        sub: "Chapter 16 · Topic 1",
        body: `
          <p>Transformations move or change shapes on the Cartesian plane. The original shape is the <strong>object</strong>; the result is the <strong>image</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Translation</div>
            <p>
              A translation slides a shape without rotating or reflecting it.<br>
              <strong>Rule:</strong> (x; y) → (x + a; y + b)<br>
              where a = horizontal shift (+ = right, − = left)<br>
              and b = vertical shift (+ = up, − = down)<br><br>
              <strong>Note:</strong> shape, size and orientation are preserved.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Reflection</div>
            <p>
              A reflection flips a shape over a <strong>mirror line</strong>.<br>
              <strong>x-axis:</strong> (x; y) → (x; −y)<br>
              <strong>y-axis:</strong> (x; y) → (−x; y)<br>
              <strong>y = x:</strong> (x; y) → (y; x)<br>
              <strong>y = −x:</strong> (x; y) → (−y; −x)
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Label image points with prime notation: A → A' (A prime). This distinguishes object from image.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Point (3; −2) is translated by (−4; 5). The image is:", options: ["(−1; 3)", "(7; 3)", "(−1; −7)", "(7; −7)"], answer: 0, topic: "Transformations" },
        { type: "mc", text: "Point (5; 3) reflected in the x-axis gives:", options: ["(−5; 3)", "(5; −3)", "(−5; −3)", "(3; 5)"], answer: 1, topic: "Transformations" },
        { type: "mc", text: "Point (−2; 4) reflected in the y-axis gives:", options: ["(2; 4)", "(−2; −4)", "(4; −2)", "(−4; 2)"], answer: 0, topic: "Transformations" },
        { type: "mc", text: "Reflecting (3; 7) over the line y = x gives:", options: ["(3; 7)", "(−3; −7)", "(7; 3)", "(−7; −3)"], answer: 2, topic: "Transformations" },
        { type: "input", text: "Point A(−1; 4) is translated 3 right and 2 down. What is the x-coordinate of A'?", answer: "2", topic: "Transformations" },
      ]
    },
    {
      id: 32,
      chapter: 16,
      name: "Rotations and enlargements",
      fullName: "Rotations and enlargements",
      lesson: {
        heading: "Rotations and enlargements",
        sub: "Chapter 16 · Topic 2",
        body: `
          <p><strong>Rotations</strong> turn a shape about a fixed point (centre of rotation). <strong>Enlargements</strong> scale a shape by a scale factor.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rotation about the origin</div>
            <p>
              <strong>90° anticlockwise:</strong> (x; y) → (−y; x)<br>
              <strong>90° clockwise:</strong> (x; y) → (y; −x)<br>
              <strong>180°:</strong> (x; y) → (−x; −y)<br><br>
              Rotation preserves shape and size but changes orientation.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Enlargement (dilation)</div>
            <p>
              <strong>Centre at origin, scale factor k:</strong> (x; y) → (kx; ky)<br><br>
              If k > 1: enlargement (bigger)<br>
              If 0 < k < 1: reduction (smaller)<br>
              If k < 0: enlargement with reflection<br><br>
              <strong>Effect on area:</strong> multiplied by k²<br>
              <strong>Effect on perimeter:</strong> multiplied by k
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For enlargement by factor k from the origin: each point moves along its line through the origin, k times further away.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Rotating (4; −3) by 90° anticlockwise about the origin gives:", options: ["(3; 4)", "(−3; −4)", "(−4; 3)", "(3; −4)"], answer: 0, topic: "Transformations" },
        { type: "mc", text: "Rotating (2; 5) by 180° about the origin gives:", options: ["(5; 2)", "(−2; 5)", "(−2; −5)", "(5; −2)"], answer: 2, topic: "Transformations" },
        { type: "mc", text: "Enlarging (3; −4) by scale factor 2 from the origin gives:", options: ["(6; −8)", "(1,5; −2)", "(5; −6)", "(6; 4)"], answer: 0, topic: "Transformations" },
        { type: "input", text: "If a triangle of area 9 cm² is enlarged by scale factor 3, what is the area of the image?", answer: "81", topic: "Transformations" },
        { type: "mc", text: "Reducing a shape by scale factor 0,5 multiplies its perimeter by:", options: ["0,25", "0,5", "2", "4"], answer: 1, topic: "Transformations" },
      ]
    },
  ],
  workbook: {
    chapter: 16, chapterName: "Transformation Geometry",
    topics: [
      {
        name: "Translations and Reflections",
        questions: [
          {
            num: "1",
            text: "Triangle ABC has vertices A(1; 2), B(4; 2) and C(4; 5).",
            parts: [
              { label: "a)", text: "Translate the triangle 3 units left and 4 units down. Write the coordinates of A', B' and C'.", marks: 3 },
              { label: "b)", text: "Reflect the original triangle in the x-axis. Write the new coordinates.", marks: 3 },
              { label: "c)", text: "Reflect the original triangle in the y-axis. Write the new coordinates.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Rotations and Enlargements",
        questions: [
          {
            num: "2",
            text: "Using the same triangle ABC from Question 1 (A(1;2), B(4;2), C(4;5)):",
            parts: [
              { label: "a)", text: "Rotate the triangle 90° anticlockwise about the origin. Write all new coordinates.", marks: 3 },
              { label: "b)", text: "Rotate the original triangle 180° about the origin.", marks: 3 },
              { label: "c)", text: "Enlarge the original triangle from the origin with scale factor 2. Write new coordinates.", marks: 3 },
              { label: "d)", text: "What is the area of the original triangle? What is the area after the enlargement in (c)?", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 16, chapterName: "Chapter 16 — Transformation Geometry",
    topics: [
      {
        name: "Translations and Reflections",
        answers: [
          { num: "Q1a", ans: "A'(−2;−2), B'(1;−2), C'(1;1)", note: "−3 to x, −4 to y" },
          { num: "Q1b", ans: "A'(1;−2), B'(4;−2), C'(4;−5)", note: "y-coordinates negated" },
          { num: "Q1c", ans: "A'(−1;2), B'(−4;2), C'(−4;5)", note: "x-coordinates negated" },
        ]
      },
      {
        name: "Rotations and Enlargements",
        answers: [
          { num: "Q2a", ans: "A'(−2;1), B'(−2;4), C'(−5;4)", note: "(x;y)→(−y;x): A:(−2;1), B:(−2;4), C:(−5;4)" },
          { num: "Q2b", ans: "A'(−1;−2), B'(−4;−2), C'(−4;−5)", note: "negate both coordinates" },
          { num: "Q2c", ans: "A'(2;4), B'(8;4), C'(8;10)", note: "multiply all coords by 2" },
          { num: "Q2d", ans: "Original: 4,5 cm²; enlarged: 18 cm²", note: "base=3, height=3: A=½×3×3=4,5; enlarged by k²=4: 4×4,5=18" },
        ]
      },
    ]
  }
});
