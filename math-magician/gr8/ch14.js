// Math Magician — Grade 8, Chapter 14 data
// Area and Perimeter

MathMagician.registerChapter(14, {
  topics: [
    {
      id: 1401,
      chapter: 14,
      name: "Perimeter of 2D shapes",
      fullName: "The perimeter of 2D shapes",
      lesson: {
        heading: "The perimeter of 2D shapes",
        sub: "Chapter 14 · Topic 1",
        body: `
          <p>The <strong>perimeter</strong> is the total distance around the outside of a shape. It is measured in linear units (mm, cm, m, km).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Perimeter formulas</div>
            <p>
              <strong>Square:</strong> <span class="math">P = 4s</span><br>
              <strong>Rectangle:</strong> <span class="math">P = 2(l + b)</span><br>
              <strong>Triangle:</strong> <span class="math">P = a + b + c</span> (sum of all sides)<br>
<span style="color:#fbbf24;font-weight:600;">📚 Note:</span> Circles (circumference and area) are <strong>Grade 9</strong> content. They are not required for your Grade 8 exam. Focus on the shapes above.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Rectangle 8 × 5: <span class="math">P = 2(8+5) = 26 cm</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Circle r = 7: <span class="math">C = 2 × π × 7 = 43.98 cm</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Semicircle r = 10: <span class="math">P = π(10) + 2(10) = 31.42 + 20 = 51.42 cm</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For composite shapes (shapes made of multiple parts), find the perimeter of the outer boundary only — don't include any internal lines.</span></div>
        <div class="tip-box" style="border-color:rgba(245,158,11,0.30);background:rgba(245,158,11,0.08);"><span class="tip-icon">📚</span><span><strong>Grade 9 preview:</strong> In Grade 9 you will learn the circumference of a circle (<span class="math">C = 2πr</span>) and the area of a circle (<span class="math">A = πr²</span>). These are not required for Grade 8.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the perimeter of a rectangle with length 12 cm and breadth 7 cm.", answer: "38", topic: "Perimeter" },
        { type: "mc", text: "A parallelogram has base 14 cm and the perpendicular height is 6 cm. Find the area.", options: ["40 cm²", "84 cm²", "42 cm²", "20 cm²"], answer: 1, topic: "Area" },
        { type: "input", text: "A square has perimeter 52 cm. Find its side length.", answer: "13", topic: "Perimeter" },
        { type: "mc", text: "A trapezium has parallel sides 8 cm and 12 cm, and a height of 5 cm. What is its area?", options: ["50 cm²", "100 cm²", "40 cm²", "48 cm²"], answer: 0, topic: "Area" },
        { type: "input", text: "A triangle has sides 13 cm, 14 cm, and 15 cm. Find the perimeter.", answer: "42", topic: "Perimeter" },
      ]
    },
    {
      id: 1402,
      chapter: 14,
      name: "Areas of 2D shapes",
      fullName: "Areas of 2D shapes",
      lesson: {
        heading: "Areas of 2D shapes",
        sub: "Chapter 14 · Topic 2",
        body: `
          <p>The <strong>area</strong> is the amount of surface enclosed by a shape. It is measured in square units (mm², cm², m², km²).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Area formulas</div>
            <p>
              <strong>Square:</strong> <span class="math">A = s²</span><br>
              <strong>Rectangle:</strong> <span class="math">A = l × b</span><br>
              <strong>Triangle:</strong> <span class="math">A = ½ × base × height</span> (perpendicular height!)<br>
              <strong>Parallelogram:</strong> <span class="math">A = base × perpendicular height</span><br>
              <strong>Trapezium:</strong> <span class="math">A = ½(a + b) × h</span> where a and b are parallel sides<br>
<span style="color:#fbbf24;font-weight:600;">📚 Grade 9 extension:</span> Circle area (A = πr²) and circumference are covered in Grade 9.
            </p>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Area Calculator</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;margin-top:8px;">
              <div style="display:flex;flex-direction:column;gap:3px;"><label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">Shape</label>
              <select id="areaShape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="rect">Rectangle</option>
                <option value="tri">Triangle</option>
                <option value="para">Parallelogram</option>
                <option value="trap">Trapezium</option>
              </select></div>
              <div id="areaInputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="areaBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="areaOut" style="font-family:JetBrains Mono,monospace;font-size:13px;color:#6ee7b7;"></div>
          </div>
          <script>
          (function(){
            const configs={
              rect:{fields:['Length','Breadth'],calc:(v)=>v[0]*v[1],formula:'l × b'},
              tri:{fields:['Base','Height'],calc:(v)=>0.5*v[0]*v[1],formula:'½ × b × h'},
              para:{fields:['Base','Height'],calc:(v)=>v[0]*v[1],formula:'b × h'},
              trap:{fields:['Side a','Side b','Height'],calc:(v)=>0.5*(v[0]+v[1])*v[2],formula:'½(a+b)×h'},
              circ:{fields:['Radius'],calc:(v)=>Math.PI*v[0]*v[0],formula:'πr²'},
            };
            function buildInputs(shape){
              const div=document.getElementById('areaInputs');
              div.innerHTML='';
              configs[shape].fields.forEach((f,i)=>{
                const wrap=document.createElement('div');
                wrap.style.cssText='display:flex;flex-direction:column;gap:3px;';
                wrap.innerHTML='<label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">'+f+'</label><input id="af'+i+'" type="number" value="'+(i===2?5:i===1?6:8)+'" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">';
                div.appendChild(wrap);
              });
            }
            function calc(){
              const shape=document.getElementById('areaShape').value;
              const cfg=configs[shape];
              const vals=cfg.fields.map((_,i)=>parseFloat(document.getElementById('af'+i).value)||0);
              const area=cfg.calc(vals);
              document.getElementById('areaOut').innerHTML='Area = '+cfg.formula+' = <strong>'+area.toFixed(3).replace(/\.?0+$/,'')+' units²</strong>';
            }
            document.getElementById('areaShape').addEventListener('change',function(){buildInputs(this.value);calc();});
            document.getElementById('areaBtn').addEventListener('click',calc);
            buildInputs('rect');calc();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The height in area formulas is always the <strong>perpendicular</strong> height — the shortest distance between the base and opposite side. It is not always a side of the shape.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the area of a triangle with base 14 cm and perpendicular height 9 cm.", answer: "63", topic: "Area" },
        { type: "mc", text: "Find the area of a circle with radius 6 cm. (Use π = 3.142)", options: ["37.70 cm²", "113.10 cm²", "56.55 cm²", "226.19 cm²"], answer: 1, topic: "Area" },
        { type: "input", text: "A trapezium has parallel sides 8 cm and 14 cm, and perpendicular height 5 cm. Find its area.", answer: "55", topic: "Area" },
        { type: "mc", text: "A parallelogram has base 12 cm and height 7 cm. Find its area.", options: ["38 cm²", "42 cm²", "84 cm²", "19 cm²"], answer: 2, topic: "Area" },
        { type: "input", text: "Find the area of a rectangle with length 3.5 m and breadth 2.4 m.", answer: "8.4", topic: "Area" },
      ]
    },
    {
      id: 1403,
      chapter: 14,
      name: "Equations using formulae",
      fullName: "Solving equations using formulae",
      lesson: {
        heading: "Solving equations using formulae",
        sub: "Chapter 14 · Topic 3",
        body: `
          <p>When an area or perimeter is given, rearrange the formula to find an unknown dimension.</p>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Area of rectangle = 72 cm², length = 9 cm. Find breadth.<br>
            <span class="math">A = l × b → 72 = 9 × b → b = 72/9 = 8 cm</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Perimeter of rectangle = 54 cm, length = 16 cm. Find breadth.<br>
            <span class="math">54 = 2(16 + b) → 27 = 16 + b → b = 11 cm</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Area of circle = 78.55 cm². Find radius.<br>
            <span class="math">78.55 = πr² → r² = 78.55/π = 25 → r = 5 cm</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Treat area/perimeter formulas like equations with variables. Substitute what you know, then solve for the unknown using inverse operations.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A rectangle has area 96 cm² and length 12 cm. Find the breadth.", answer: "8", topic: "Area" },
        { type: "mc", text: "A circle has area 50.27 cm². Find its radius (use π = 3.142).", options: ["4 cm", "5 cm", "6 cm", "8 cm"], answer: 0, topic: "Area" },
        { type: "input", text: "A triangle has area 45 cm² and base 10 cm. Find the perpendicular height.", answer: "9", topic: "Area" },
        { type: "mc", text: "A square has perimeter 36 cm. Find its area.", options: ["9 cm²", "81 cm²", "36 cm²", "144 cm²"], answer: 1, topic: "Area" },
        { type: "input", text: "A parallelogram has area 91 cm² and height 7 cm. Find the base.", answer: "13", topic: "Area" },
      ]
    },
    {
      id: 1404,
      chapter: 14,
      name: "SI unit conversions",
      fullName: "Conversions using SI units",
      lesson: {
        heading: "Conversions using SI units",
        sub: "Chapter 14 · Topic 4",
        body: `
          <p>Area and perimeter use different unit scales. Converting correctly between them is essential for exam accuracy.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Length conversions</div>
            <p>
              <span class="math">1 km = 1 000 m = 100 000 cm = 1 000 000 mm</span><br>
              <span class="math">1 m = 100 cm = 1 000 mm</span><br>
              <span class="math">1 cm = 10 mm</span>
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Area conversions (square units)</div>
            <p>
              <span class="math">1 m² = 10 000 cm²</span> (because 100 cm × 100 cm)<br>
              <span class="math">1 cm² = 100 mm²</span> (because 10 mm × 10 mm)<br>
              <span class="math">1 km² = 1 000 000 m²</span><br>
              <span class="math">1 hectare (ha) = 10 000 m²</span><br><br>
              <strong>Rule:</strong> to convert area, square the linear conversion factor.<br>
              e.g. 1 m = 100 cm → 1 m² = 100² cm² = 10 000 cm²
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Area conversion factors are always the <em>square</em> of the length conversion. Students lose marks by using 100 instead of 10 000 when converting m² to cm².</span></div>
        `
      },
      questions: [
        { type: "input", text: "Convert 3.5 m² to cm².", answer: "35000", topic: "Conversions" },
        { type: "mc", text: "Convert 450 000 cm² to m².", options: ["4.5 m²", "45 m²", "450 m²", "0.45 m²"], answer: 1, topic: "Conversions" },
        { type: "input", text: "Convert 2.4 km to metres.", answer: "2400", topic: "Conversions" },
        { type: "mc", text: "A field measures 300 m × 200 m. Express its area in hectares.", options: ["6 ha", "60 ha", "600 ha", "0.6 ha"], answer: 0, topic: "Conversions" },
        { type: "input", text: "Convert 85 000 mm² to cm².", answer: "850", topic: "Conversions" },
      ]
    },
    {
      id: 1405,
      chapter: 14,
      name: "Ch 14 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 14 — Examination focus",
        sub: "Chapter 14 · Review",
        body: `
          <p>Area and perimeter questions often involve composite shapes, unit conversions, and finding unknown dimensions from given areas or perimeters.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 14 summary</div>
            <p>
              ✅ Perimeter = total boundary; area = surface enclosed<br>
              ✅ Height in area formulas = perpendicular height<br>
              ✅ Trapezium: A = ½(a+b)h; Circle: A = πr², C = 2πr<br>
              ✅ Composite shapes: break into known shapes, add/subtract areas<br>
              ✅ Area unit conversions: square the linear factor (m²=10 000 cm²)<br>
              ✅ Rearrange formula to find unknown dimensions
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For composite shapes, shade or outline the region you're calculating — it prevents double-counting. Areas of cut-out regions are subtracted.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A rectangle (10 × 8 cm) has a circle of radius 2 cm cut from its centre. Find the remaining area. (Use π = 3.142, give to 2 d.p.)", answer: "67.43", topic: "Mixed" },
        { type: "mc", text: "A trapezium has parallel sides 6 m and 10 m and height 4 m. Find its area.", options: ["64 m²", "32 m²", "48 m²", "24 m²"], answer: 1, topic: "Mixed" },
        { type: "input", text: "A rectangle has perimeter 60 cm and length 18 cm. Find its area.", answer: "216", topic: "Mixed" },
        { type: "mc", text: "Convert 2.75 m² to cm².", options: ["275 cm²", "2 750 cm²", "27 500 cm²", "275 000 cm²"], answer: 2, topic: "Mixed" },
        { type: "input", text: "A circle has circumference 62.84 cm. Find its area. (Use π = 3.142)", answer: "314.2", topic: "Mixed" },
      ]
    },
  ],
  workbook: {
    chapter: 14, chapterName: "Area and Perimeter",
    topics: [
      {
        name: "Perimeter of 2D shapes",
        questions: [
          { num: "1", text: "Calculate the perimeter of each shape:", parts: [
            { label: "a)", text: "Rectangle: l = 15 cm, b = 8 cm.", marks: 2 },
            { label: "b)", text: "Circle with r = 9 cm. (Use π = 3.142)", marks: 2 },
            { label: "c)", text: "Trapezium with parallel sides 7 cm and 13 cm, and slant sides each 10 cm.", marks: 2 },
            { label: "d)", text: "A square has perimeter 52 cm. Find its side length and area.", marks: 3 },
          ]},
        ]
      },
      {
        name: "Areas and unit conversions",
        questions: [
          { num: "2", text: "Calculate the area of each shape:", parts: [
            { label: "a)", text: "Circle with r = 9 cm.", marks: 2 },
            { label: "b)", text: "Trapezium with parallel sides 7 cm and 13 cm, height 8 cm.", marks: 3 },
            { label: "c)", text: "A circular lawn of radius 7 m has a 2 m wide path around it. Find the area of the path only.", marks: 5 },
          ]},
          { num: "3", text: "Convert:", parts: [
            { label: "a)", text: "4.2 m² to cm²", marks: 1 },
            { label: "b)", text: "85 000 mm² to m²", marks: 2 },
            { label: "c)", text: "A room is 6.4 m × 4.5 m. Find the floor area in m² and in cm².", marks: 3 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 14, chapterName: "Chapter 14 — Area and Perimeter",
    topics: [
      {
        name: "Perimeter of 2D shapes",
        answers: [
          { num: "Q1a", ans: "P = 46 cm", note: "2(15+8)=46" },
          { num: "Q1b", ans: "C ≈ 56.56 cm", note: "2×3.142×9=56.556" },
          { num: "Q1c", ans: "P = 40 cm", note: "7+13+10+10=40" },
          { num: "Q1d", ans: "Side = 13 cm; Area = 169 cm²", note: "52÷4=13; 13²=169" },
        ]
      },
      {
        name: "Areas and unit conversions",
        answers: [
          { num: "Q2a", ans: "A ≈ 254.50 cm²", note: "3.142×81=254.502" },
          { num: "Q2b", ans: "A = 80 cm²", note: "½(7+13)×8=80" },
          { num: "Q2c", ans: "≈ 100.53 m²", note: "π(9²−7²)=π×32≈100.53" },
          { num: "Q3a", ans: "42 000 cm²", note: "4.2×10 000=42 000" },
          { num: "Q3b", ans: "0.000085 m²", note: "85 000÷1 000 000=0.000085" },
          { num: "Q3c", ans: "28.8 m² = 288 000 cm²", note: "6.4×4.5=28.8; ×10 000=288 000" },
        ]
      },
    ]
  }
});
