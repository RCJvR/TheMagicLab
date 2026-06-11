// Math Magician — Grade 9, Chapter 15 data
// Surface Area and Volume

MathMagician.registerChapter(15, {
  topics: [
    {
      id: 29,
      chapter: 15,
      name: "Surface area",
      fullName: "Surface area of prisms and cylinders",
      lesson: {
        heading: "Surface area of 3D objects",
        sub: "Chapter 15 · Topic 1",
        body: `
          <p><strong>Surface area</strong> is the total area of all faces of a 3D object. Imagine unfolding the shape into a net.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Surface area formulas</div>
            <p>
              <strong>Rectangular prism (cuboid):</strong><br>
              SA = 2(lw + lh + wh)<br><br>
              <strong>Cube:</strong> SA = 6s²<br><br>
              <strong>Triangular prism:</strong><br>
              SA = 2 × (area of triangle) + 3 × (area of rectangles)<br><br>
              <strong>Cylinder:</strong><br>
              SA = 2πr² + 2πrh = 2πr(r + h)<br><br>
              <strong>Cone:</strong> SA = πr² + πrl (l = slant height)<br><br>
              <strong>Sphere:</strong> SA = 4πr²
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Cylinder example</div>
            <div class="example-step"><span class="step-num">1</span><span>r = 4 cm, h = 10 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>SA = 2π(4)² + 2π(4)(10) = 32π + 80π = 112π ≈ 351,86 cm²</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Draw the net of the solid first. Count each face and calculate its area separately before adding together.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the surface area of a cube with side 5 cm.", answer: "150", topic: "Surface Area" },
        { type: "mc", text: "A cylinder has r = 3 cm and h = 7 cm. Its surface area (using π ≈ 3,14) is approximately:", options: ["188,4 cm²", "94,2 cm²", "56,52 cm²", "376,8 cm²"], answer: 0, topic: "Surface Area" },
        { type: "input", text: "A rectangular prism has l = 8, w = 5, h = 3 cm. Find the surface area.", answer: "158", topic: "Surface Area" },
        { type: "mc", text: "The lateral surface area of a cylinder (just the curved side, not the ends) with r = 4 cm, h = 6 cm is:", options: ["150,72 cm²", "100,48 cm²", "50,24 cm²", "75,36 cm²"], answer: 0, topic: "Surface Area" },
        { type: "input", text: "Find the surface area of a sphere with radius 6 cm. (Use π ≈ 3,14; give to nearest whole number)", answer: "452", topic: "Surface Area" },
      ]
    },
    {
      id: 30,
      chapter: 15,
      name: "Volume",
      fullName: "Volume of prisms, cylinders and spheres",
      lesson: {
        heading: "Volume of 3D objects",
        sub: "Chapter 15 · Topic 2",
        body: `
          <p><strong>Volume</strong> is the amount of 3D space a solid occupies, measured in cubic units (cm³, m³, etc.).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Volume formulas</div>
            <p>
              <strong>Prism/Cylinder:</strong> V = area of base × height<br>
              → Rectangular prism: V = l × w × h<br>
              → Triangular prism: V = ½bh × length<br>
              → Cylinder: V = πr²h<br><br>
              <strong>Pyramid/Cone:</strong> V = ⅓ × base area × height<br>
              → Square pyramid: V = ⅓s²h<br>
              → Cone: V = ⅓πr²h<br><br>
              <strong>Sphere:</strong> V = 4/3 πr³
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Cylinder r = 5, h = 12: V = π(25)(12) = 300π ≈ 942,48 cm³</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Cone r = 6, h = 8: V = ⅓π(36)(8) = 96π ≈ 301,59 cm³</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Sphere r = 3: V = 4/3π(27) = 36π ≈ 113,10 cm³</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Pyramid/cone volume = ⅓ × (volume of the corresponding prism/cylinder). A useful check!</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the volume of a rectangular prism with dimensions 6 cm × 4 cm × 9 cm.", answer: "216", topic: "Volume" },
        { type: "mc", text: "Find the volume of a cylinder with r = 5 cm and h = 8 cm. (π ≈ 3,14)", options: ["628 cm³", "251,2 cm³", "502,4 cm³", "1256 cm³"], answer: 0, topic: "Volume" },
        { type: "input", text: "Find the volume of a cone with r = 6 cm and h = 9 cm. (Use π ≈ 3,14; give to nearest whole number)", answer: "339", topic: "Volume" },
        { type: "mc", text: "A sphere has radius 4 cm. Its volume (π ≈ 3,14) is approximately:", options: ["200,96 cm³", "267,95 cm³", "803,84 cm³", "134,04 cm³"], answer: 1, topic: "Volume" },
        { type: "input", text: "A triangular prism has a right-triangle base with legs 6 cm and 8 cm. Its length is 15 cm. Find the volume.", answer: "360", topic: "Volume" },
      ]
    },
  ],
  workbook: {
    chapter: 15, chapterName: "Surface Area and Volume",
    topics: [
      {
        name: "Surface Area",
        questions: [
          {
            num: "1",
            text: "Calculate the surface area of each solid. (Use π = 3,14 where needed)",
            parts: [
              { label: "a)", text: "A rectangular prism with l = 12 cm, w = 8 cm and h = 5 cm.", marks: 4 },
              { label: "b)", text: "A cylinder with r = 6 cm and h = 10 cm.", marks: 4 },
              { label: "c)", text: "A sphere with radius 5 cm.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Volume",
        questions: [
          {
            num: "2",
            text: "Calculate the volume of each solid. (Use π = 3,14 where needed)",
            parts: [
              { label: "a)", text: "A cylinder with r = 7 cm and h = 15 cm.", marks: 3 },
              { label: "b)", text: "A cone with r = 9 cm and h = 12 cm.", marks: 3 },
              { label: "c)", text: "A sphere with diameter 10 cm.", marks: 3 },
            ]
          },
          {
            num: "3",
            text: "A cylindrical water tank has a radius of 1,2 m and a height of 2,5 m.",
            parts: [
              { label: "a)", text: "Calculate the volume of water it can hold (in m³).", marks: 3 },
              { label: "b)", text: "Convert your answer to litres (1 m³ = 1 000 litres).", marks: 1 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 15, chapterName: "Chapter 15 — Surface Area and Volume",
    topics: [
      {
        name: "Surface Area",
        answers: [
          { num: "Q1a", ans: "392 cm²", note: "2(96+60+40) = 2×196 = 392" },
          { num: "Q1b", ans: "603,19 cm²", note: "2×3,14×36 + 2×3,14×6×10 = 226,08+376,8 = 602,88 ≈ 603 cm²" },
          { num: "Q1c", ans: "314 cm²", note: "4×3,14×25 = 314" },
        ]
      },
      {
        name: "Volume",
        answers: [
          { num: "Q2a", ans: "2 307,9 cm³", note: "3,14×49×15 = 2 307,9" },
          { num: "Q2b", ans: "1 017,36 cm³", note: "⅓×3,14×81×12 = 1 017,36" },
          { num: "Q2c", ans: "523,33 cm³", note: "r=5; 4/3×3,14×125 = 523,33" },
          { num: "Q3a", ans: "≈ 11,31 m³", note: "3,14×1,44×2,5 = 11,304" },
          { num: "Q3b", ans: "≈ 11 304 litres", note: "11,304 × 1 000" },
        ]
      },
    ]
  }
});
