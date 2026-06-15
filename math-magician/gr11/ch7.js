// Math Magician — Grade 11, Chapter 7
// Measurement (advanced)

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 0,
      chapter: 7,
      name: "Surface area of complex solids",
      fullName: "Surface area of pyramids, cones, spheres, and combinations",
      lesson: {
        heading: "Surface area of complex solids",
        sub: "Chapter 7 · Topic 1",
        body: `
          <p>Grade 11 Measurement revisits 3D shapes with greater rigour and introduces combination solids.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Surface area formulae (recap)</div>
            <p>
              <strong>Right prism:</strong> SA = 2 × base area + lateral area<br>
              <strong>Cylinder:</strong> SA = 2πr² + 2πrh<br>
              <strong>Cone:</strong> SA = πr² + πrl, where l = slant height = √(r² + h²)<br>
              <strong>Sphere:</strong> SA = 4πr²<br>
              <strong>Square pyramid:</strong> SA = b² + 4(½ × b × l)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Combination solid</div>
            <p>Cylinder (r = 4, h = 10) with hemisphere on top.<br>
            Cylinder SA (no top): 2π(4)² + 2π(4)(10) − π(4)² = π(16 + 80 − 16) ... wait:<br>
            — Bottom circle: π(4)² = 16π<br>
            — Curved cylinder: 2π(4)(10) = 80π<br>
            — Hemisphere: 2π(4)² = 32π (curved surface only)<br>
            Total = 16π + 80π + 32π = 128π ≈ 402.1 cm²</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Combination solids — key idea</div>
            <p>
              For a solid made from two shapes joined together:<br>
              SA = SA of shape 1 + SA of shape 2 − 2 × (area of the joined face)<br>
              (The joined face is hidden from both shapes)
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A cone has r = 5 cm and h = 12 cm. Slant height l =",
          options: ["13 cm", "17 cm", "7 cm", "√119 cm"],
          answer: 0,
          topic: "Surface area of complex solids"
        },
        {
          type: "input",
          text: "Total SA of a sphere with r = 6 cm (in terms of π).",
          answer: "144π",
          topic: "Surface area of complex solids"
        },
        {
          type: "mc",
          text: "A closed cylinder has r = 3 and h = 7. SA =",
          options: ["60π", "42π", "66π", "48π"],
          answer: 0,
          topic: "Surface area of complex solids"
        },
        {
          type: "mc",
          text: "A square pyramid has base 6 cm and slant height 5 cm. SA =",
          options: ["96 cm²", "96 + 36 = wait... 36 + 4(½·6·5)", "96 cm²", "Both A and C"],
          answer: 0,
          topic: "Surface area of complex solids"
        },
        {
          type: "mc",
          text: "A hemisphere is placed on top of a cylinder. Which surface is excluded from the total SA?",
          options: ["The curved cylinder surface", "The flat circular face shared between them", "The bottom circle", "None — all surfaces are included"],
          answer: 1,
          topic: "Surface area of complex solids"
        }
      ]
    },
    {
      id: 1,
      chapter: 7,
      name: "Volume & the effect of scale factor k",
      fullName: "Volume of solids and the effect of multiplying dimensions by k",
      lesson: {
        heading: "Volume and the scale factor effect",
        sub: "Chapter 7 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Volume formulae</div>
            <p>
              <strong>Prism/Cylinder:</strong> V = base area × height<br>
              <strong>Pyramid/Cone:</strong> V = ⅓ × base area × height<br>
              <strong>Sphere:</strong> V = (4/3)πr³
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Effect of multiplying a dimension by k</div>
            <p>
              Multiplying <em>one</em> linear dimension by k:<br>
              Length → k × original length<br>
              Area → k × original area (linear, not squared)<br>
              Volume → k × original volume<br><br>
              Multiplying <em>all</em> dimensions by k (similar enlargement):<br>
              Length → k<br>
              Surface area → k²<br>
              Volume → k³
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Scale factor k = 3</div>
            <p>If a box has SA = 54 cm² and V = 27 cm³, and all dimensions are tripled:<br>
            New SA = 9 × 54 = 486 cm²<br>
            New V = 27 × 27 = 729 cm³</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Only one dimension doubled?</div>
            <p>
              Cylinder V = πr²h. If only h is doubled: new V = πr²(2h) = 2V → doubles.<br>
              If only r is doubled: new V = π(2r)²h = 4πr²h = 4V → quadruples.<br>
              <em>Be specific</em> about which dimension changes!
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "All dimensions of a solid are halved. Its volume becomes:",
          options: ["1/2 of original", "1/4 of original", "1/8 of original", "1/16 of original"],
          answer: 2,
          topic: "Volume & the effect of scale factor k"
        },
        {
          type: "input",
          text: "Cone: r = 3 cm, h = 4 cm. Find volume in terms of π.",
          answer: "12π",
          topic: "Volume & the effect of scale factor k"
        },
        {
          type: "mc",
          text: "A sphere's radius is doubled. Its surface area increases by factor:",
          options: ["2", "4", "8", "16"],
          answer: 1,
          topic: "Volume & the effect of scale factor k"
        },
        {
          type: "mc",
          text: "If the height of a cylinder is tripled (radius unchanged), the volume:",
          options: ["Triples", "Increases by 9×", "Doubles", "Increases by 27×"],
          answer: 0,
          topic: "Volume & the effect of scale factor k"
        },
        {
          type: "input",
          text: "V of a sphere with r = 3 cm (to 2 decimal places, use π ≈ 3.14159).",
          answer: "113.10",
          altAnswers: ["113.1"],
          topic: "Volume & the effect of scale factor k"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 7 Workbook — Measurement",
    questions: [
      {
        number: 1,
        text: "A solid consists of a cylinder (r = 5 cm, h = 8 cm) with a cone on top (r = 5 cm, h = 3 cm).",
        parts: [
          { label: "a", text: "Calculate the slant height of the cone.", marks: 2 },
          { label: "b", text: "Calculate the total surface area of the combined solid (exclude the shared base).", marks: 5 },
          { label: "c", text: "Calculate the total volume.", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "A sphere has radius 6 cm.",
        parts: [
          { label: "a", text: "Find the volume (leave in terms of π).", marks: 2 },
          { label: "b", text: "The radius is increased by 50%. Find the new volume (terms of π).", marks: 3 },
          { label: "c", text: "By what factor has the volume increased?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "l = √(25+9) = √34 ≈ 5.83 cm",
        b: "Bottom circle: 25π; cylinder curved: 80π; cone curved: 5√34·π; Total = (105 + 5√34)π ≈ 422.1 cm²",
        c: "Cylinder: π(25)(8)=200π; Cone: ⅓π(25)(3)=25π; Total=225π≈706.9 cm³"
      },
      2: {
        a: "V = (4/3)π(216) = 288π cm³",
        b: "r=9; V=(4/3)π(729)=972π cm³",
        c: "972π/288π = 3.375 = (3/2)³ = k³ where k=1.5 ✓"
      }
    }
  }
});
