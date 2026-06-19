// Math Magician — Grade 8, Chapter 15 data
// Surface Area and Volume

MathMagician.registerChapter(15, {
  topics: [
    {
      id: 1501,
      chapter: 15,
      name: "Surface area of cubes and prisms",
      fullName: "The surface area of cubes and rectangular prisms",
      lesson: {
        heading: "Surface area of cubes and rectangular prisms",
        sub: "Chapter 15 · Topic 1",
        body: `
          <p>The <strong>surface area</strong> is the total area of all the faces of a 3D object. It is measured in square units (cm², m²).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formulas</div>
            <p>
              <strong>Cube</strong> (side = s): 6 equal square faces.<br>
              <span class="math">SA = 6s²</span><br><br>
              <strong>Rectangular prism</strong> (box) with length l, breadth b, height h:<br>
              3 pairs of rectangles: top/bottom, front/back, left/right.<br>
              <span class="math">SA = 2(lb + lh + bh)</span><br><br>
              <strong>Nets:</strong> unfold the 3D shape into a flat net to see all faces.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Cube s = 4 cm: <span class="math">SA = 6 × 4² = 6 × 16 = 96 cm²</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Box 5 × 3 × 2: <span class="math">SA = 2(5×3 + 5×2 + 3×2) = 2(15+10+6) = 2(31) = 62 cm²</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Draw and label the net before calculating. Label each face's dimensions — this prevents missing faces or using wrong dimensions.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the surface area of a cube with side 5 cm.", answer: "150", topic: "Surface Area" },
        { type: "mc", text: "Find the surface area of a rectangular prism with l = 8, b = 3, h = 4.", options: ["96 cm²", "136 cm²", "192 cm²", "112 cm²"], answer: 1, topic: "Surface Area" },
        { type: "input", text: "A cube has surface area 294 cm². Find its side length.", answer: "7", topic: "Surface Area" },
        { type: "mc", text: "A rectangular box is 10 × 6 × 4 cm. How many cm² of cardboard is needed to make it?", options: ["240 cm²", "248 cm²", "208 cm²", "480 cm²"], answer: 1, topic: "Surface Area" },
        { type: "input", text: "Find the surface area of a rectangular prism with l = 9, b = 5, h = 3.", answer: "174", topic: "Surface Area" },
      ]
    },
    {
      id: 1502,
      chapter: 15,
      name: "Surface area of triangular prisms",
      fullName: "The surface area of triangular prisms",
      lesson: {
        heading: "The surface area of triangular prisms",
        sub: "Chapter 15 · Topic 2",
        body: `
          <p>A <strong>triangular prism</strong> has 2 triangular faces and 3 rectangular faces.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formula</div>
            <p>
              <span class="math">SA = 2 × (area of triangle) + (perimeter of triangle × length)</span><br><br>
              Or explicitly:<br>
              <span class="math">SA = 2 × (½ × b × h) + (a + b + c) × L</span><br><br>
              where b = triangle base, h = triangle height, a, b, c = triangle sides, L = prism length.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>Right-angled triangular prism: triangle legs 3, 4, hypotenuse 5. Prism length L = 10.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Area of triangle: <span class="math">½ × 3 × 4 = 6 cm²</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Perimeter of triangle: <span class="math">3 + 4 + 5 = 12 cm</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">SA = 2(6) + 12 × 10 = 12 + 120 = 132 cm²</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always find the perimeter of the triangle cross-section first — this gives the combined width of the three rectangular faces.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A triangular prism has a right-angled triangle with legs 6 and 8 (hypotenuse 10) as its cross-section, and length 12 cm. Find the surface area.", answer: "336", topic: "Surface Area" },
        { type: "mc", text: "A triangular prism has equilateral triangle faces with side 4 cm, and length 9 cm. Find the surface area. (Use √3 ≈ 1.732)", options: ["124.9 cm²", "121.9 cm²", "108 cm²", "136 cm²"], answer: 0, topic: "Surface Area" },
        { type: "input", text: "A triangular prism has triangular area 15 cm², triangular perimeter 18 cm, and length 7 cm. Find the surface area.", answer: "156", topic: "Surface Area" },
        { type: "mc", text: "How many faces does a triangular prism have?", options: ["3", "4", "5", "6"], answer: 2, topic: "Surface Area" },
        { type: "input", text: "A triangular prism has triangle base 10 cm, height 6 cm, three sides 10, 8, 8 cm, and length 15 cm. Find the surface area.", answer: "570", topic: "Surface Area" },
      ]
    },
    {
      id: 1503,
      chapter: 15,
      name: "Volume of cubes and prisms",
      fullName: "The volume and capacity of cubes and rectangular prisms",
      lesson: {
        heading: "Volume and capacity of cubes and rectangular prisms",
        sub: "Chapter 15 · Topic 3",
        body: `
          <p><strong>Volume</strong> is the amount of 3D space a solid occupies. <strong>Capacity</strong> is how much liquid a hollow container can hold. Both use the same formula but different units.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formulas and unit conversions</div>
            <p>
              <strong>Cube:</strong> <span class="math">V = s³</span><br>
              <strong>Rectangular prism:</strong> <span class="math">V = l × b × h</span><br><br>
              <strong>Volume units:</strong> cm³, m³, mm³<br>
              <strong>Capacity units:</strong> ml, litres (ℓ)<br><br>
              <strong>Conversions:</strong><br>
              <span class="math">1 cm³ = 1 ml</span><br>
              <span class="math">1 000 cm³ = 1 litre</span><br>
              <span class="math">1 m³ = 1 000 000 cm³ = 1 000 litres</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Cube s = 3 cm: <span class="math">V = 3³ = 27 cm³ = 27 ml</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Box 10 × 8 × 5: <span class="math">V = 400 cm³ = 0.4 litres</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Swimming pool 25 × 10 × 2 m: <span class="math">V = 500 m³ = 500 000 litres</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Volume & Capacity Calculator</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:8px 0 12px;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:12px;">l =</span>
              <input id="vlL" type="number" value="10" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:12px;">b =</span>
              <input id="vlB" type="number" value="8" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:12px;">h =</span>
              <input id="vlH" type="number" value="5" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:rgba(221,225,240,0.30);font-size:11px;">(cm)</span>
              <button id="vlBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="vlOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const l=parseFloat(document.getElementById('vlL').value)||0;
              const b=parseFloat(document.getElementById('vlB').value)||0;
              const h=parseFloat(document.getElementById('vlH').value)||0;
              const el=document.getElementById('vlOut');
              const v=l*b*h;
              el.innerHTML='<div><span style="opacity:0.5;">V = '+l+' × '+b+' × '+h+' = </span><span style="color:#fbbf24;">'+v+' cm³</span></div>'+
                '<div><span style="opacity:0.5;">Capacity = </span><span style="color:#6ee7b7;">'+v+' ml = '+(v/1000)+' litres</span></div>';
            }
            document.getElementById('vlBtn').addEventListener('click',calc);

          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>1 cm³ = 1 ml is the key link between volume and capacity. A cube of side 1 cm holds exactly 1 ml of water.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the volume of a cube with side 6 cm.", answer: "216", topic: "Volume" },
        { type: "mc", text: "A rectangular prism is 12 cm × 5 cm × 4 cm. Find its volume.", options: ["240 cm³", "120 cm³", "480 cm³", "96 cm³"], answer: 0, topic: "Volume" },
        { type: "input", text: "Convert 2 500 cm³ to litres.", answer: "2.5", topic: "Volume" },
        { type: "mc", text: "A fish tank is 60 cm × 30 cm × 40 cm. How many litres does it hold?", options: ["72 ℓ", "720 ℓ", "7 200 ℓ", "7.2 ℓ"], answer: 0, topic: "Volume" },
        { type: "input", text: "A rectangular prism has volume 360 cm³, length 12 cm, and breadth 5 cm. Find the height.", answer: "6", topic: "Volume" },
      ]
    },
    {
      id: 1504,
      chapter: 15,
      name: "Volume of triangular prisms",
      fullName: "The volume and capacity of triangular prisms",
      lesson: {
        heading: "Volume and capacity of triangular prisms",
        sub: "Chapter 15 · Topic 4",
        body: `
          <p>The volume of any prism is the area of its cross-section (base) multiplied by its length.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formula</div>
            <p>
              <span class="math">V = Area of base × length</span><br>
              For a triangular prism:<br>
              <span class="math">V = (½ × b × h) × L</span><br><br>
              where b = triangle base, h = triangle height, L = prism length.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>Triangular prism: triangle base 8 cm, height 5 cm, length 12 cm.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Area of triangle: <span class="math">½ × 8 × 5 = 20 cm²</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">V = 20 × 12 = 240 cm³ = 240 ml = 0.24 litres</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The "length" of a prism is the dimension that goes through the shape — it is perpendicular to the cross-sectional face. Don't confuse it with the sides of the triangle.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A triangular prism has triangle base 10 cm, height 6 cm, and length 15 cm. Find volume.", answer: "450", topic: "Volume" },
        { type: "mc", text: "A triangular prism has right-angled triangle legs 5 and 12, and prism length 8. Find volume.", options: ["240 cm³", "480 cm³", "120 cm³", "960 cm³"], answer: 0, topic: "Volume" },
        { type: "input", text: "Convert 4 500 cm³ to litres.", answer: "4.5", topic: "Volume" },
        { type: "mc", text: "A triangular prism has volume 630 cm³ and triangular cross-section area 42 cm². Find its length.", options: ["15 cm", "12 cm", "18 cm", "25 cm"], answer: 0, topic: "Volume" },
        { type: "input", text: "A tent is shaped like a triangular prism. Triangle base = 4 m, height = 3 m, length = 6 m. Find its volume in m³.", answer: "36", topic: "Volume" },
      ]
    },
    {
      id: 1505,
      chapter: 15,
      name: "Effect of scale factors",
      fullName: "The effect of scale factors on surface area and volume",
      lesson: {
        heading: "The effect of scale factors on surface area and volume",
        sub: "Chapter 15 · Topic 5",
        body: `
          <p>When a 3D shape is scaled, the surface area and volume change by different factors.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Scale factor rules</div>
            <p>
              If all dimensions are multiplied by scale factor <strong>k</strong>:<br><br>
              <strong>Linear dimensions</strong> (length, breadth, height): multiplied by <span class="math">k</span><br>
              <strong>Surface area:</strong> increases more than the length<br>
              <strong>Volume:</strong> increases even more than the surface area<br><br>              <em>Investigate by calculating before and after — see the example below.</em><br><br>
              <strong>Example:</strong> A cube of side 2 cm is scaled by k = 3 (new side = 6 cm).<br>
              Original: SA = 24 cm², V = 8 cm³<br>
              New: SA = 24 × 9 = 216 cm², V = 8 × 27 = 216 cm³<br>
              Check: 6³ = 216 ✓, 6×SA of unit cube: 6×36=216 ✓
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>When you double all dimensions, surface area multiplies by 4 and volume multiplies by 8. Use the investigation approach: calculate both the original and scaled shapes and compare the results.</span></div>
        <div class="tip-box" style="border-color:rgba(245,158,11,0.30);background:rgba(245,158,11,0.08);"><span class="tip-icon">📚</span><span><strong>Grade 9:</strong> The formal rule (SA scales by k², Volume by k³) is generalised in Grade 9. At Grade 8 you need to be able to investigate and describe what happens — not state the algebraic rule.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "A cube's side is doubled. By what factor does its volume increase?", options: ["2", "4", "6", "8"], answer: 3, topic: "Scale" },
        { type: "input", text: "A rectangular prism has SA = 94 cm². If all dimensions are tripled, find the new SA.", answer: "846", topic: "Scale" },
        { type: "mc", text: "A shape has volume 40 cm³. Its dimensions are halved. What is the new volume?", options: ["20 cm³", "10 cm³", "5 cm³", "80 cm³"], answer: 2, topic: "Scale" },
        { type: "input", text: "A cube has volume 27 cm³. Its side is doubled. Find the new volume.", answer: "216", topic: "Scale" },
        { type: "mc", text: "A cube has side 3 cm. Its dimensions are doubled to 6 cm. By what factor does the surface area increase?", options: ["2", "4", "6", "8"], answer: 1, topic: "Scale" },
      ]
    },
    {
      id: 1506,
      chapter: 15,
      name: "Ch 15 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 15 — Examination focus",
        sub: "Chapter 15 · Review",
        body: `
          <p>Surface area and volume questions test formula recall, correct unit use, and multi-step calculation. Show all working clearly.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 15 summary</div>
            <p>
              ✅ Cube: SA = 6s²; V = s³<br>
              ✅ Rectangular prism: SA = 2(lb+lh+bh); V = lbh<br>
              ✅ Triangular prism: SA = 2(△area) + perim×L; V = △area × L<br>
              ✅ 1 cm³ = 1 ml; 1 000 cm³ = 1 litre<br>
              ✅ Doubling dimensions: SA multiplies by 4, Volume multiplies by 8 (investigate, don't memorise the algebraic rule in Gr 8)
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Don't confuse surface area (2D, square units) with volume (3D, cubic units). If you're asked for SA but calculate V, the answer will have wrong units — and lose all marks.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A cube has volume 512 cm³. Find its surface area.", answer: "384", topic: "Mixed" },
        { type: "mc", text: "A triangular prism (right-angled triangle: 9, 12, 15; length 20) has surface area:", options: ["648 cm²", "756 cm²", "900 cm²", "594 cm²"], answer: 0, topic: "Mixed" },
        { type: "input", text: "A rectangular prism is 8 × 5 × 4 cm. If all dimensions are doubled, find the new volume.", answer: "2560", topic: "Mixed" },
        { type: "mc", text: "A box 15 × 12 × 8 cm is filled with water. How many litres does it hold?", options: ["14.4 ℓ", "1.44 ℓ", "144 ℓ", "0.144 ℓ"], answer: 0, topic: "Mixed" },
        { type: "input", text: "A triangular prism has triangle area 30 cm² and length 14 cm. Find its volume.", answer: "420", topic: "Mixed" },
      ]
    },
  ],
  workbook: {
    chapter: 15, chapterName: "Surface Area and Volume",
    topics: [
      {
        name: "Surface area of prisms",
        questions: [
          { num: "1", text: "Calculate the surface area of each solid:", parts: [
            { label: "a)", text: "Cube with side 7 cm.", marks: 2 },
            { label: "b)", text: "Rectangular prism: l = 15 cm, b = 8 cm, h = 6 cm.", marks: 3 },
            { label: "c)", text: "Triangular prism with a right-angled triangle cross-section (legs 5 cm and 12 cm) and prism length 10 cm.", marks: 5 },
          ]},
        ]
      },
      {
        name: "Volume of prisms",
        questions: [
          { num: "2", text: "Calculate the volume of each solid:", parts: [
            { label: "a)", text: "Cube with side 7 cm.", marks: 1 },
            { label: "b)", text: "Rectangular prism: l = 15 cm, b = 8 cm, h = 6 cm.", marks: 2 },
            { label: "c)", text: "Triangular prism: right-angled triangle with legs 5 cm and 12 cm; length 10 cm.", marks: 3 },
          ]},
          { num: "3", text: "Solve:", parts: [
            { label: "a)", text: "A cube has surface area 216 cm². Find its volume.", marks: 3 },
            { label: "b)", text: "A rectangular prism has volume 1 440 cm³, breadth 8 cm, height 6 cm. Find its length.", marks: 3 },
          ]},
        ]
      },
      {
        name: "Effect of scale factors",
        questions: [
          { num: "4", text: "Scale factor investigations:", parts: [
            { label: "a)", text: "A cube's side is multiplied by 4. By what factor does its volume increase? Show working.", marks: 3 },
            { label: "b)", text: "A prism has surface area 80 cm². All dimensions are doubled. Find the new surface area.", marks: 3 },
            { label: "c)", text: "A solid's volume is 54 cm³. Its dimensions are multiplied by ⅓. Find the new volume.", marks: 3 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 15, chapterName: "Chapter 15 — Surface Area and Volume",
    topics: [
      {
        name: "Surface area of prisms",
        answers: [
          { num: "Q1a", ans: "SA = 294 cm²", note: "6×7²=6×49=294" },
          { num: "Q1b", ans: "SA = 516 cm²", note: "2(15×8+15×6+8×6)=2(120+90+48)=516" },
          { num: "Q1c", ans: "SA = 360 cm²", note: "Hyp=13; SA=2(½×5×12)+(5+12+13)×10=60+300=360" },
        ]
      },
      {
        name: "Volume of prisms",
        answers: [
          { num: "Q2a", ans: "V = 343 cm³", note: "7³=343" },
          { num: "Q2b", ans: "V = 720 cm³", note: "15×8×6=720" },
          { num: "Q2c", ans: "V = 300 cm³", note: "A=½×5×12=30; V=30×10=300" },
          { num: "Q3a", ans: "V = 216 cm³", note: "6s²=216→s=6; 6³=216" },
          { num: "Q3b", ans: "l = 30 cm", note: "1440=l×8×6→l=1440÷48=30" },
        ]
      },
      {
        name: "Effect of scale factors",
        answers: [
          { num: "Q4a", ans: "Volume increases by factor 64", note: "k=4; new V = 4³ × old V = 64 × old V" },
          { num: "Q4b", ans: "New SA = 320 cm²", note: "Original SA=80 cm²; double dimensions: 6×(2×2)²... or: calculate SA of new shape directly. 80×4=320 (SA quadruples when dimensions double)" },
          { num: "Q4c", ans: "New V = 2 cm³", note: "Dimensions divided by 3; calculate new volume directly: if original 3cm cube, new side=1cm, V=1³=1... or 54÷27=2 (divide by 27 when all dims ÷3)" },
        ]
      },
    ]
  }
});
