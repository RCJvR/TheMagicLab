// Math Magician — Grade 10, Chapter 13
// Measurement

MathMagician.registerChapter(13, {
  topics: [
    {
      id: 0,
      chapter: 13,
      name: "Area & surface area",
      fullName: "Area of polygons, surface area of prisms, cylinders, pyramids, cones, and spheres",
      lesson: {
        heading: "Area and surface area",
        sub: "Chapter 13 · Topic 1",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Area of 2D shapes</div>
            <p>
              <strong>Rectangle:</strong> A = l × w<br>
              <strong>Triangle:</strong> A = ½bh<br>
              <strong>Parallelogram:</strong> A = b × h<br>
              <strong>Trapezium:</strong> A = ½(a+b)×h<br>
              <strong>Circle:</strong> A = πr²
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Surface area (SA) of 3D shapes</div>
            <p>
              <strong>Right prism:</strong> SA = 2 × (area of base) + perimeter of base × height<br>
              <strong>Cylinder:</strong> SA = 2πr² + 2πrh<br>
              <strong>Cone:</strong> SA = πr² + πrl (where l = slant height = √(r²+h²))<br>
              <strong>Sphere:</strong> SA = 4πr²<br>
              <strong>Square pyramid:</strong> SA = base² + 4 × (½ × base × slant height)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Cylinder SA</div>
            <p>Cylinder: r = 4 cm, h = 10 cm<br>
            SA = 2π(4)² + 2π(4)(10)<br>
            = 32π + 80π = 112π ≈ 351.86 cm²</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A cone has base radius 3 cm and slant height 5 cm. Its curved surface area is:",
          options: ["15π cm²", "9π cm²", "24π cm²", "45π cm²"],
          answer: 0,
          topic: "Area & surface area"
        },
        {
          type: "input",
          text: "A rectangle has l = 8 cm and w = 5 cm. Find its area.",
          answer: "40",
          topic: "Area & surface area"
        },
        {
          type: "mc",
          text: "Total surface area of a sphere with r = 6 cm:",
          options: ["36π cm²", "72π cm²", "144π cm²", "288π cm²"],
          answer: 2,
          topic: "Area & surface area"
        },
        {
          type: "mc",
          text: "A right prism has a triangular base (b=6, h=4) and height 10. Its total surface area is:",
          options: ["172 cm²", "200 cm²", "240 cm²", "150 cm²"],
          answer: 0,
          topic: "Area & surface area"
        },
        {
          type: "input",
          text: "Cylinder r = 3 cm, h = 7 cm. Find the curved surface area in terms of π.",
          answer: "42π",
          topic: "Area & surface area"
        }
      ]
    },
    {
      id: 1,
      chapter: 13,
      name: "Volume & scale factor",
      fullName: "Volume of 3D shapes and the effect of a scale factor",
      lesson: {
        heading: "Volume and the effect of a scale factor",
        sub: "Chapter 13 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Volume of 3D shapes</div>
            <p>
              <strong>Right prism/cylinder:</strong> V = area of base × height<br>
              → Cylinder: V = πr²h<br>
              <strong>Pyramid:</strong> V = ⅓ × base area × height<br>
              <strong>Cone:</strong> V = ⅓πr²h<br>
              <strong>Sphere:</strong> V = (4/3)πr³
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Effect of multiplying a dimension by k</div>
            <p>
              If all dimensions are multiplied by k:<br>
              • <strong>Length</strong> scales by k<br>
              • <strong>Area / Surface area</strong> scales by k²<br>
              • <strong>Volume</strong> scales by k³<br><br>
              This applies only when ALL dimensions are scaled by the same factor.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Scale factor</div>
            <p>A box has volume 24 cm³. All dimensions are doubled (k=2).<br>
            New volume = 24 × 2³ = 24 × 8 = 192 cm³<br><br>
            A sphere with r = 3 cm is enlarged to r = 6 cm (k=2).<br>
            SA increases by factor 4 (2²); Volume by factor 8 (2³).</p>
          </div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Sphere with r = 3 cm. Find volume in terms of π.",
          answer: "36π",
          topic: "Volume & scale factor"
        },
        {
          type: "mc",
          text: "A cylinder has r = 2 and h = 5. If r is doubled only, the new volume is:",
          options: ["4 times the original", "2 times", "8 times", "Same"],
          answer: 0,
          topic: "Volume & scale factor"
        },
        {
          type: "mc",
          text: "All dimensions of a shape are tripled. By what factor does the surface area increase?",
          options: ["3", "6", "9", "27"],
          answer: 2,
          topic: "Volume & scale factor"
        },
        {
          type: "mc",
          text: "A cone has V = 120 cm³. If all dimensions are halved, the new volume is:",
          options: ["60 cm³", "30 cm³", "15 cm³", "90 cm³"],
          answer: 2,
          topic: "Volume & scale factor"
        },
        {
          type: "input",
          text: "A rectangular box is 4×3×5 cm. Find its volume.",
          answer: "60",
          topic: "Volume & scale factor"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 13 Workbook — Measurement",
    questions: [
      {
        number: 1,
        text: "A composite shape consists of a rectangle 10 cm × 6 cm with a semicircle attached to one short end.",
        parts: [
          { label: "a", text: "Calculate the area of the composite shape (to 2 decimal places).", marks: 4 },
          { label: "b", text: "Calculate the perimeter.", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "A cone has base diameter 12 cm and height 8 cm.",
        parts: [
          { label: "a", text: "Calculate the slant height l.", marks: 2 },
          { label: "b", text: "Calculate the total surface area (in terms of π, then to 2 d.p.).", marks: 4 },
          { label: "c", text: "Calculate the volume (in terms of π).", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "A model of a building has a rectangular prism base (6×4×3 cm) with a square pyramid on top (base 6×4 cm, height 2 cm).",
        parts: [
          { label: "a", text: "Calculate the total volume of the model.", marks: 4 },
          { label: "b", text: "The actual building is 50 times larger in each dimension. What is its actual volume?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Rectangle: 10×6=60; semicircle: ½π(3)²=4.5π≈14.14; Total≈74.14 cm²",
        b: "2 long sides + 1 short side + semicircle circumference: 2(10)+6+π(3)=26+3π≈35.42 cm"
      },
      2: {
        a: "l = √(6²+8²) = √100 = 10 cm",
        b: "SA = π(6²) + π(6)(10) = 36π + 60π = 96π ≈ 301.59 cm²",
        c: "V = ⅓π(6²)(8) = 96π cm³"
      },
      3: {
        a: "Prism: 6×4×3=72; Pyramid: ⅓×24×2=16; Total=88 cm³",
        b: "Scale factor=50; Volume scales by 50³=125000; Actual=88×125000=11 000 000 cm³=11 m³"
      }
    }
  }
});
