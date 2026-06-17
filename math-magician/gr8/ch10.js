// Math Magician — Grade 8, Chapter 10 data
// Geometry of 2D Shapes

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 1001,
      chapter: 10,
      name: "Geometry of triangles",
      fullName: "The geometry of triangles",
      lesson: {
        heading: "The geometry of triangles",
        sub: "Chapter 10 · Topic 1",
        body: `
          <p>Triangles are three-sided polygons. Their angles and sides follow specific rules that allow us to calculate unknown values.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Triangle angle properties</div>
            <p>
              <strong>Angle sum:</strong> the three interior angles of any triangle always add up to 180°.<br>
              <span class="math">â + b̂ + ĉ = 180°</span> <em>(sum of angles in a triangle)</em><br><br>
              <strong>Exterior angle:</strong> an exterior angle of a triangle equals the sum of the two non-adjacent interior angles.<br>
              <span class="math">ext. â = b̂ + ĉ</span> <em>(ext. angle of triangle)</em><br><br>
              <strong>Types of triangles by angles:</strong><br>
              &nbsp;&nbsp;• <strong>Acute:</strong> all angles < 90°<br>
              &nbsp;&nbsp;• <strong>Right-angled:</strong> one angle = 90°<br>
              &nbsp;&nbsp;• <strong>Obtuse:</strong> one angle > 90°<br><br>
              <strong>Types by sides:</strong><br>
              &nbsp;&nbsp;• <strong>Equilateral:</strong> 3 equal sides, 3 equal angles (60° each)<br>
              &nbsp;&nbsp;• <strong>Isosceles:</strong> 2 equal sides, base angles equal<br>
              &nbsp;&nbsp;• <strong>Scalene:</strong> no equal sides or angles
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Two angles of a triangle are 55° and 70°. Find the third: <span class="math">180° − 55° − 70° = 55°</span> <em>(∠ sum, △)</em></span></div>
            <div class="example-step"><span class="step-num">2</span><span>An exterior angle is 110°. One interior non-adjacent angle is 48°. Find the other: <span class="math">110° − 48° = 62°</span> <em>(ext. ∠ of △)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Isosceles △ with apex angle 40°: base angles = <span class="math">(180° − 40°) ÷ 2 = 70°</span> each.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Triangle Angle Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Enter any two angles and find the third (leave the unknown as 0).</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">â =</span>
              <input id="triA" type="number" value="55" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">b̂ =</span>
              <input id="triB" type="number" value="70" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">ĉ =</span>
              <input id="triC" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="triBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Solve</button>
            </div>
            <div id="triOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function solve(){
              const a=parseFloat(document.getElementById('triA').value)||0;
              const b=parseFloat(document.getElementById('triB').value)||0;
              const c=parseFloat(document.getElementById('triC').value)||0;
              const el=document.getElementById('triOut');
              const zeros=[a,b,c].filter(x=>x===0).length;
              if(zeros===0){
                const sum=a+b+c;
                el.innerHTML=sum===180?'<span style="color:#6ee7b7;">✓ Valid triangle: '+a+'° + '+b+'° + '+c+'° = 180°</span>':'<span style="color:#fca5a5;">✗ Invalid: '+a+'° + '+b+'° + '+c+'° = '+sum+'° (must be 180°)</span>';
              } else if(zeros===1){
                const known=[a,b,c].filter(x=>x!==0);
                const missing=180-known[0]-known[1];
                if(missing<=0||missing>=180){el.innerHTML='<span style="color:#fca5a5;">Invalid — angles must be between 0° and 180°</span>';return;}
                const which=a===0?'â':b===0?'b̂':'ĉ';
                el.innerHTML='<span style="color:#6ee7b7;">'+which+' = 180° − '+known[0]+'° − '+known[1]+'° = <strong>'+missing+'°</strong></span><br><span style="opacity:0.5;">(sum of angles in a triangle)</span>';
              } else {
                el.innerHTML='<span style="color:#fca5a5;">Enter at least two angles.</span>';
              }
            }
            document.getElementById('triBtn').addEventListener('click',solve);
            solve();
          })();
          </script>
          
          <div style="overflow-x:auto;margin:14px 0;">
            <svg viewBox="0 0 520 140" style="width:100%;max-width:520px;border-radius:8px;background:rgba(10,15,30,0.50);">
              <!-- Equilateral -->
              <text x="52" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">EQUILATERAL</text>
              <polygon points="52,115 18,115 35,55" fill="rgba(99,102,241,0.15)" stroke="#6366f1" stroke-width="1.5"/>
              <text x="35" y="48" text-anchor="middle" font-size="8" fill="#a5b4fc" font-family="JetBrains Mono,monospace">60°</text>
              <text x="52" y="122" text-anchor="middle" font-size="8" fill="#a5b4fc" font-family="JetBrains Mono,monospace">60°</text>
              <text x="14" y="122" text-anchor="middle" font-size="8" fill="#a5b4fc" font-family="JetBrains Mono,monospace">60°</text>
              <text x="35" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">3 equal sides</text>
              <!-- Isosceles -->
              <text x="140" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">ISOSCELES</text>
              <polygon points="140,55 112,115 168,115" fill="rgba(245,158,11,0.10)" stroke="#fbbf24" stroke-width="1.5"/>
              <text x="140" y="50" text-anchor="middle" font-size="8" fill="#fbbf24" font-family="JetBrains Mono,monospace">apex</text>
              <text x="115" y="122" text-anchor="middle" font-size="8" fill="#fcd34d" font-family="JetBrains Mono,monospace">base∠</text>
              <text x="165" y="122" text-anchor="middle" font-size="8" fill="#fcd34d" font-family="JetBrains Mono,monospace">base∠</text>
              <text x="140" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">2 equal sides</text>
              <!-- Scalene -->
              <text x="244" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">SCALENE</text>
              <polygon points="218,115 248,58 278,115" fill="rgba(16,185,129,0.08)" stroke="#6ee7b7" stroke-width="1.5"/>
              <text x="248" y="53" text-anchor="middle" font-size="8" fill="#6ee7b7" font-family="JetBrains Mono,monospace">a</text>
              <text x="218" y="122" text-anchor="middle" font-size="8" fill="#6ee7b7" font-family="JetBrains Mono,monospace">b</text>
              <text x="278" y="122" text-anchor="middle" font-size="8" fill="#6ee7b7" font-family="JetBrains Mono,monospace">c</text>
              <text x="248" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">no equal sides</text>
              <!-- Right-angled -->
              <text x="362" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">RIGHT-ANGLED</text>
              <polygon points="322,115 322,55 402,115" fill="rgba(236,72,153,0.08)" stroke="#f9a8d4" stroke-width="1.5"/>
              <rect x="322" y="101" width="14" height="14" fill="none" stroke="#f9a8d4" stroke-width="1.2"/>
              <text x="316" y="50" font-size="8" fill="#f9a8d4" font-family="JetBrains Mono,monospace">90°</text>
              <text x="365" y="112" font-size="8" fill="#f9a8d4" font-family="JetBrains Mono,monospace">hypotenuse</text>
              <text x="362" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">one 90° angle</text>
              <!-- Obtuse -->
              <text x="464" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">OBTUSE</text>
              <polygon points="428,115 466,68 500,115" fill="rgba(168,85,247,0.10)" stroke="#a78bfa" stroke-width="1.5"/>
              <path d="M428,115 m22,0 a22,22 0 0,0 -11,-20" fill="rgba(168,85,247,0.20)" stroke="none"/>
              <text x="458" y="64" text-anchor="middle" font-size="8" fill="#a78bfa" font-family="JetBrains Mono,monospace">apex</text>
              <text x="437" y="112" font-size="8" fill="#a78bfa" font-family="JetBrains Mono,monospace">&gt;90°</text>
              <text x="464" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">one &gt;90° angle</text>
            </svg>
          </div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Always state the reason: <em>"sum of angles in a triangle"</em> or <em>"exterior angle of a triangle"</em>. Reasons earn marks.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Two angles of a triangle are 63° and 74°. Find the third angle.", answer: "43", topic: "Triangles" },
        { type: "mc", text: "An exterior angle of a triangle is 115°. One non-adjacent interior angle is 52°. Find the other.", options: ["53°", "63°", "65°", "75°"], answer: 1, topic: "Triangles" },
        { type: "input", text: "An isosceles triangle has an apex angle of 50°. What is each base angle?", answer: "65", topic: "Triangles" },
        { type: "mc", text: "Which type of triangle has all angles equal to 60°?", options: ["Isosceles", "Scalene", "Equilateral", "Right-angled"], answer: 2, topic: "Triangles" },
        { type: "input", text: "In △ABC, â = 3x, b̂ = 2x, ĉ = x. Find x.", answer: "30", topic: "Triangles" },
      ]
    },
    {
      id: 1002,
      chapter: 10,
      name: "Geometry of quadrilaterals",
      fullName: "The geometry of quadrilaterals",
      lesson: {
        heading: "The geometry of quadrilaterals",
        sub: "Chapter 10 · Topic 2",
        body: `
          <p>A <strong>quadrilateral</strong> is a four-sided polygon. The interior angles always add up to 360°.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Properties of quadrilaterals</div>
            <p>
              <strong>Square:</strong> 4 equal sides, 4 × 90°, diagonals equal and bisect at 90°.<br>
              <strong>Rectangle:</strong> opposite sides equal, 4 × 90°, diagonals equal and bisect each other.<br>
              <strong>Rhombus:</strong> 4 equal sides, opposite angles equal, diagonals bisect at 90°.<br>
              <strong>Parallelogram:</strong> opposite sides parallel and equal, opposite angles equal, diagonals bisect each other.<br>
              <strong>Trapezium:</strong> one pair of parallel sides.<br>
              <strong>Kite:</strong> two pairs of adjacent equal sides, one pair of opposite angles equal, diagonals perpendicular.<br><br>
              <strong>Angle sum:</strong> <span class="math">â + b̂ + ĉ + d̂ = 360°</span> <em>(sum of ∠s in a quadrilateral)</em>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>A parallelogram has one angle of 65°. Adjacent angle = <span class="math">180° − 65° = 115°</span> <em>(co-int. ∠s, // lines)</em>. Opposite angles: 65° and 115°.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Trapezium: angles are 3x, 2x, 90°, 90°. Solve: <span class="math">3x + 2x + 180° = 360° → 5x = 180° → x = 36°</span>.</span></div>
          </div>
          
          <div style="overflow-x:auto;margin:14px 0;">
            <svg viewBox="0 0 530 140" style="width:100%;max-width:530px;border-radius:8px;background:rgba(10,15,30,0.50);">
              <!-- Square -->
              <text x="44" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">SQUARE</text>
              <rect x="18" y="25" width="52" height="52" fill="rgba(99,102,241,0.15)" stroke="#6366f1" stroke-width="1.5"/>
              <rect x="18" y="25" width="9" height="9" fill="none" stroke="#6ee7b7" stroke-width="1"/>
              <text x="44" y="92" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">4 equal sides, 4×90°</text>
              <!-- Rectangle -->
              <text x="136" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">RECTANGLE</text>
              <rect x="96" y="32" width="80" height="45" fill="rgba(245,158,11,0.10)" stroke="#fbbf24" stroke-width="1.5"/>
              <rect x="96" y="32" width="9" height="9" fill="none" stroke="#6ee7b7" stroke-width="1"/>
              <text x="136" y="92" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">opp. sides equal, 4×90°</text>
              <!-- Parallelogram -->
              <text x="242" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">PARALLELOGRAM</text>
              <polygon points="200,77 216,32 284,32 268,77" fill="rgba(16,185,129,0.10)" stroke="#6ee7b7" stroke-width="1.5"/>
              <text x="242" y="92" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">opp. sides ∥ and equal</text>
              <!-- Rhombus -->
              <text x="356" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">RHOMBUS</text>
              <polygon points="356,28 384,55 356,82 328,55" fill="rgba(236,72,153,0.10)" stroke="#f9a8d4" stroke-width="1.5"/>
              <line x1="356" y1="28" x2="356" y2="82" stroke="rgba(249,168,212,0.30)" stroke-width="0.8" stroke-dasharray="3,3"/>
              <line x1="328" y1="55" x2="384" y2="55" stroke="rgba(249,168,212,0.30)" stroke-width="0.8" stroke-dasharray="3,3"/>
              <text x="356" y="95" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">4 equal sides, diags ⊥</text>
              <!-- Trapezium -->
              <text x="468" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">TRAPEZIUM</text>
              <polygon points="440,77 452,32 484,32 510,77" fill="rgba(168,85,247,0.10)" stroke="#a78bfa" stroke-width="1.5"/>
              <text x="468" y="28" text-anchor="middle" font-size="8" fill="#a78bfa" font-family="JetBrains Mono,monospace">∥</text>
              <text x="475" y="84" text-anchor="middle" font-size="8" fill="#a78bfa" font-family="JetBrains Mono,monospace">∥</text>
              <text x="468" y="95" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">one pair ∥ sides</text>
            </svg>
          </div>
<div class="tip-box"><span class="tip-icon">💡</span><span>In a parallelogram: co-interior angles (same side) are supplementary (add to 180°), and opposite angles are equal. These are the two key angle facts.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Three angles of a quadrilateral are 85°, 110°, and 95°. Find the fourth.", answer: "70", topic: "Quadrilaterals" },
        { type: "mc", text: "A parallelogram has one angle of 72°. What is the adjacent angle?", options: ["72°", "108°", "118°", "288°"], answer: 1, topic: "Quadrilaterals" },
        { type: "mc", text: "Which quadrilateral has diagonals that are equal in length AND bisect each other at right angles?", options: ["Rectangle", "Rhombus", "Square", "Kite"], answer: 2, topic: "Quadrilaterals" },
        { type: "input", text: "A rhombus has one angle of 54°. What is the opposite angle?", answer: "54", topic: "Quadrilaterals" },
        { type: "mc", text: "Which shape has exactly ONE pair of parallel sides?", options: ["Parallelogram", "Rhombus", "Trapezium", "Rectangle"], answer: 2, topic: "Quadrilaterals" },
      ]
    },
    {
      id: 1003,
      chapter: 10,
      name: "Triangles and quadrilaterals",
      fullName: "Solving problems involving triangles and quadrilaterals",
      lesson: {
        heading: "Solving problems involving triangles and quadrilaterals",
        sub: "Chapter 10 · Topic 3",
        body: `
          <p>Many problems combine triangle and quadrilateral properties with straight-line angle rules. Work systematically, labelling every angle and giving a reason at each step.</p>
          <div class="example-box">
            <div class="example-box-title">✏️ Multi-step problem</div>
            <div class="example-step"><span class="step-num">1</span><span>ABCD is a parallelogram. A diagonal AC is drawn. ∠DAC = 38° and ∠ACD = 57°. Find ∠ACB.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>∠DAC = ∠BCA = 38° <em>(alt. int. ∠s; AD ∥ BC)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span>In △ACD: ∠ADC = 180° − 38° − 57° = 85° <em>(∠ sum, △)</em></span></div>
            <div class="example-step"><span class="step-num">4</span><span>∠ABC = ∠ADC = 85° <em>(opp. ∠s of ∥gram)</em></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Strategy for multi-step geometry</div>
            <p>
              1. Mark all given angles on the diagram.<br>
              2. Identify which shape or line relationship applies at each step.<br>
              3. Write the calculation AND the reason.<br>
              4. Work towards the unknown angle step by step.<br>
              5. Check: do all angles in each shape sum correctly?
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>When a diagonal divides a parallelogram or rhombus, you get two triangles — and all the triangle angle rules apply inside each one.</span></div>
        `
      },
      questions: [
        { type: "input", text: "In parallelogram PQRS, ∠P = 4x + 10 and ∠Q = 2x + 20. Find x.", answer: "25", topic: "Mixed" },
        { type: "mc", text: "A diagonal divides a rectangle into two triangles. What type of triangles are they?", options: ["Equilateral", "Isosceles right-angled", "Scalene", "Obtuse isosceles"], answer: 1, topic: "Mixed" },
        { type: "input", text: "In △ABC, ∠A = 50°. ABCD is a parallelogram and BD is a diagonal. Find ∠ABD if ∠ADB = 70°.", answer: "60", topic: "Mixed" },
        { type: "mc", text: "In rhombus ABCD with diagonal AC, if ∠BAC = 34°, what is ∠BCA?", options: ["34°", "56°", "68°", "112°"], answer: 0, topic: "Mixed" },
        { type: "input", text: "The angles of a quadrilateral are in the ratio 2:3:4:3. Find the largest angle.", answer: "120", topic: "Mixed" },
      ]
    },
    {
      id: 1004,
      chapter: 10,
      name: "Congruent shapes",
      fullName: "Congruent shapes",
      lesson: {
        heading: "Congruent shapes",
        sub: "Chapter 10 · Topic 4",
        body: `
          <p><strong>Congruent shapes</strong> are identical in size and shape — one can be mapped exactly onto the other by rotation, reflection, or translation.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Congruence in triangles</div>
            <p>
              Two triangles are congruent if they satisfy one of these four conditions:<br><br>
              <strong>SSS:</strong> all three sides equal.<br>
              <strong>SAS:</strong> two sides and the included angle equal.<br>
              <strong>AAS (or ASA):</strong> two angles and a corresponding side equal.<br>
              <strong>RHS:</strong> right angle, hypotenuse, and one side equal.<br><br>
              Notation: <span class="math">△ABC ≅ △DEF</span> — vertices must be listed in matching order.<br><br>
              Congruent shapes have:<br>
              &nbsp;&nbsp;• Equal corresponding sides<br>
              &nbsp;&nbsp;• Equal corresponding angles<br>
              &nbsp;&nbsp;• Equal areas and perimeters
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Identifying congruence</div>
            <div class="example-step"><span class="step-num">1</span><span>△ABC: AB=5, BC=7, AC=6. △DEF: DE=5, EF=7, DF=6. Congruent? Yes — SSS.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>△PQR: PQ=8, ∠Q=50°, QR=6. △XYZ: XY=8, ∠Y=50°, YZ=6. Congruent? Yes — SAS.</span></div>
          </div>
          
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Congruence Condition Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Select a congruence condition to see a diagram and what is known.</p>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
              <button class="cong-btn" data-c="SSS" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.15);color:#a5b4fc;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">SSS</button>
              <button class="cong-btn" data-c="SAS" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(245,158,11,0.30);background:rgba(245,158,11,0.08);color:#fbbf24;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">SAS</button>
              <button class="cong-btn" data-c="AAS" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(16,185,129,0.30);background:rgba(16,185,129,0.08);color:#6ee7b7;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">AAS</button>
              <button class="cong-btn" data-c="RHS" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(236,72,153,0.30);background:rgba(236,72,153,0.08);color:#f9a8d4;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">RHS</button>
            </div>
            <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
              <svg id="congSvg" viewBox="0 0 300 120" style="width:300px;max-width:100%;border-radius:8px;background:rgba(10,15,30,0.60);flex-shrink:0;"></svg>
              <div id="congDesc" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;flex:1;min-width:160px;"></div>
            </div>
          </div>
          <script>
          (function(){
            const COND = {
              SSS: {
                title: 'Side-Side-Side',
                color: '#a5b4fc',
                rule:  'All 3 sides of one triangle equal all 3 sides of the other.',
                marks: ['side','side','side'],
                desc: ['AB = DE (side)', 'BC = EF (side)', 'AC = DF (side)'],
                draw: function(svg){
                  var h='';
                  // Two triangles side by side
                  h+=tri(20,100,80,20,140,100,'rgba(99,102,241,0.20)','#6366f1');
                  h+=tri(160,100,220,20,280,100,'rgba(99,102,241,0.20)','#6366f1');
                  // Side tick marks - double ticks on all sides
                  h+=ticks(20,100,140,100,2,'#a5b4fc')+ticks(20,100,80,20,2,'#a5b4fc')+ticks(140,100,80,20,2,'#a5b4fc');
                  h+=ticks(160,100,280,100,2,'#a5b4fc')+ticks(160,100,220,20,2,'#a5b4fc')+ticks(280,100,220,20,2,'#a5b4fc');
                  h+=labels(20,100,'A',80,20,'B',140,100,'C');
                  h+=labels(160,100,'D',220,20,'E',280,100,'F');
                  return h;
                }
              },
              SAS: {
                title: 'Side-Angle-Side',
                color: '#fbbf24',
                rule:  'Two sides and the included angle (between them) are equal.',
                marks: ['side','angle','side'],
                desc: ['AB = DE (side)', '∠B = ∠E (included angle)', 'BC = EF (side)'],
                draw: function(svg){
                  var h='';
                  h+=tri(20,100,80,20,140,100,'rgba(245,158,11,0.12)','#fbbf24');
                  h+=tri(160,100,220,20,280,100,'rgba(245,158,11,0.12)','#fbbf24');
                  h+=ticks(20,100,80,20,1,'#fcd34d')+ticks(80,20,140,100,2,'#fcd34d');
                  h+=ticks(160,100,220,20,1,'#fcd34d')+ticks(220,20,280,100,2,'#fcd34d');
                  h+=arcMark(80,20,20,100,140,100,'rgba(245,158,11,0.30)','#fbbf24');
                  h+=arcMark(220,20,160,100,280,100,'rgba(245,158,11,0.30)','#fbbf24');
                  h+=labels(20,100,'A',80,20,'B',140,100,'C');
                  h+=labels(160,100,'D',220,20,'E',280,100,'F');
                  return h;
                }
              },
              AAS: {
                title: 'Angle-Angle-Side',
                color: '#6ee7b7',
                rule:  'Two angles and a non-included side are equal.',
                marks: ['angle','angle','side'],
                desc: ['∠A = ∠D (angle)', '∠B = ∠E (angle)', 'BC = EF (non-included side)'],
                draw: function(svg){
                  var h='';
                  h+=tri(20,100,80,20,140,100,'rgba(16,185,129,0.10)','#6ee7b7');
                  h+=tri(160,100,220,20,280,100,'rgba(16,185,129,0.10)','#6ee7b7');
                  h+=ticks(80,20,140,100,2,'#6ee7b7');
                  h+=ticks(220,20,280,100,2,'#6ee7b7');
                  h+=arcMark(20,100,80,20,140,100,'rgba(16,185,129,0.25)','#6ee7b7');
                  h+=arcMark(80,20,20,100,140,100,'rgba(16,185,129,0.25)','#6ee7b7');
                  h+=arcMark(160,100,220,20,280,100,'rgba(16,185,129,0.25)','#6ee7b7');
                  h+=arcMark(220,20,160,100,280,100,'rgba(16,185,129,0.25)','#6ee7b7');
                  h+=labels(20,100,'A',80,20,'B',140,100,'C');
                  h+=labels(160,100,'D',220,20,'E',280,100,'F');
                  return h;
                }
              },
              RHS: {
                title: 'Right angle-Hypotenuse-Side',
                color: '#f9a8d4',
                rule:  'Right angle, hypotenuse and one other side are equal. (Right-angled triangles only)',
                marks: ['right','hyp','side'],
                desc: ['∠C = ∠F = 90° (right angle)', 'AB = DE (hypotenuse)', 'BC = EF (side)'],
                draw: function(svg){
                  var h='';
                  h+=tri(20,100,20,20,140,100,'rgba(236,72,153,0.10)','#f9a8d4');
                  h+=tri(160,100,160,20,280,100,'rgba(236,72,153,0.10)','#f9a8d4');
                  h+='<rect x="20" y="86" width="14" height="14" fill="none" stroke="#f9a8d4" stroke-width="1.2"/>';
                  h+='<rect x="160" y="86" width="14" height="14" fill="none" stroke="#f9a8d4" stroke-width="1.2"/>';
                  // Hypotenuse ticks (the diagonal = hyp)
                  h+=ticks(20,20,140,100,1,'#f9a8d4');
                  h+=ticks(160,20,280,100,1,'#f9a8d4');
                  // Other side
                  h+=ticks(20,100,140,100,2,'#f9a8d4');
                  h+=ticks(160,100,280,100,2,'#f9a8d4');
                  h+=labels(20,20,'A',140,100,'B',20,100,'C');
                  h+=labels(160,20,'D',280,100,'E',160,100,'F');
                  return h;
                }
              }
            };

            function tri(x1,y1,x2,y2,x3,y3,fill,stroke){
              return '<polygon points="'+x1+','+y1+' '+x2+','+y2+' '+x3+','+y3+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.5" stroke-linejoin="round"/>';
            }
            function labels(x1,y1,l1,x2,y2,l2,x3,y3,l3){
              function lbl(x,y,t){
                var ox= (x<50?-10: x>250?10:0), oy=(y<30?-8:y>90?12:0);
                return '<text x="'+(x+ox)+'" y="'+(y+oy)+'" text-anchor="middle" font-size="10" fill="rgba(221,225,240,0.60)" font-family="Syne,sans-serif" font-weight="700">'+t+'</text>';
              }
              return lbl(x1,y1,l1)+lbl(x2,y2,l2)+lbl(x3,y3,l3);
            }
            function ticks(x1,y1,x2,y2,n,col){
              var mx=(x1+x2)/2, my=(y1+y2)/2;
              var dx=x2-x1,dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy);
              var px=-dy/len*5, py=dx/len*5;
              var s='';
              var gap=4;
              for(var i=0;i<n;i++){
                var off=(i-(n-1)/2)*gap;
                var tx=mx+dx/len*off, ty=my+dy/len*off;
                s+='<line x1="'+(tx-px).toFixed(1)+'" y1="'+(ty-py).toFixed(1)+'" x2="'+(tx+px).toFixed(1)+'" y2="'+(ty+py).toFixed(1)+'" stroke="'+col+'" stroke-width="1.5"/>';
              }
              return s;
            }
            function arcMark(vx,vy,ax,ay,bx,by,fill,stroke){
              // Draw a small arc at vertex vx,vy between arms going to ax,ay and bx,by
              var r=14;
              var a1=Math.atan2(ay-vy,ax-vx), a2=Math.atan2(by-vy,bx-vx);
              var sx=vx+r*Math.cos(a1), sy=vy+r*Math.sin(a1);
              var ex=vx+r*Math.cos(a2), ey=vy+r*Math.sin(a2);
              // Determine sweep direction (use small arc)
              var da = a2-a1; if(da<0) da+=2*Math.PI; if(da>Math.PI) da-=2*Math.PI;
              var sweep = da>0?1:0;
              return '<path d="M '+vx+' '+vy+' L '+sx.toFixed(1)+' '+sy.toFixed(1)+' A '+r+' '+r+' 0 0 '+sweep+' '+ex.toFixed(1)+' '+ey.toFixed(1)+' Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="0.8"/>';
            }

            var current = 'SSS';
            function render(key){
              current = key;
              var c = COND[key];
              var svg = document.getElementById('congSvg');
              svg.innerHTML = c.draw();
              var el = document.getElementById('congDesc');
              el.innerHTML =
                '<div style="color:'+c.color+';font-weight:700;font-family:Syne,sans-serif;margin-bottom:4px;">'+key+' — '+c.title+'</div>'+
                c.desc.map(function(d){ return '<div style="color:rgba(221,225,240,0.70);">✓ '+d+'</div>'; }).join('')+
                '<div style="margin-top:8px;font-size:10.5px;color:rgba(221,225,240,0.40);">'+c.rule+'</div>';
            }

            document.getElementById('congSvg').closest('.def-box').addEventListener('click', function(e){
              var btn = e.target.closest('.cong-btn');
              if(btn){ render(btn.dataset.c); }
            });
            render('SSS');
          })();
          </script>
<div class="tip-box"><span class="tip-icon">💡</span><span>AAA is NOT a congruence condition — it only proves similarity, not congruence. The triangles could be different sizes.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Two triangles have all three sides equal. Which congruence condition applies?", options: ["SAS", "AAS", "SSS", "RHS"], answer: 2, topic: "Congruence" },
        { type: "mc", text: "△ABC ≅ △PQR with AB = PQ and ∠A = ∠P and ∠B = ∠Q. Which condition is this?", options: ["SSS", "SAS", "AAS", "RHS"], answer: 2, topic: "Congruence" },
        { type: "input", text: "△ABC ≅ △DEF. If AB = 9 cm, what is DE in cm?", answer: "9", topic: "Congruence" },
        { type: "mc", text: "Which is NOT a valid triangle congruence condition?", options: ["SSS", "SAS", "AAA", "RHS"], answer: 2, topic: "Congruence" },
        { type: "mc", text: "Two right-angled triangles have equal hypotenuses and one equal leg. Which condition applies?", options: ["SSS", "SAS", "AAS", "RHS"], answer: 3, topic: "Congruence" },
      ]
    },
    {
      id: 1005,
      chapter: 10,
      name: "Similar shapes",
      fullName: "Similar shapes",
      lesson: {
        heading: "Similar shapes",
        sub: "Chapter 10 · Topic 5",
        body: `
          <p><strong>Similar shapes</strong> have the same shape but different sizes. Corresponding angles are equal and corresponding sides are in proportion.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Properties of similar figures</div>
            <p>
              If △ABC ∼ △DEF (similar), then:<br>
              &nbsp;&nbsp;• ∠A = ∠D, ∠B = ∠E, ∠C = ∠F<br>
              &nbsp;&nbsp;• <span class="math">AB/DE = BC/EF = AC/DF = k</span> (scale factor)<br><br>
              <strong>Finding the scale factor:</strong> divide any corresponding side pair.<br>
              <strong>Finding unknown sides:</strong> use the ratio <span class="math">AB/DE = BC/EF</span> and cross-multiply.<br><br>
              <strong>Areas of similar shapes:</strong> if scale factor = k, then area ratio = k².<br>
              <strong>Perimeters:</strong> ratio = k (same as side ratio).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Finding unknown sides</div>
            <div class="example-step"><span class="step-num">1</span><span>△ABC ∼ △DEF. AB = 6, DE = 9, BC = 8. Find EF.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Scale factor: <span class="math">k = 9/6 = 1.5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">EF = BC × k = 8 × 1.5 = 12</span></span></div>
          </div>
          
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Similar Shapes Scale Factor</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Adjust the scale factor and see both triangles drawn to scale. Enter any two sides to find the third.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:3px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;letter-spacing:0.06em;">Scale factor k</label>
                <input id="simK" type="number" value="2" min="0.1" max="5" step="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;letter-spacing:0.06em;">Side a (small △)</label>
                <input id="simA" type="number" value="3" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;letter-spacing:0.06em;">Side b (small △)</label>
                <input id="simB" type="number" value="4" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;letter-spacing:0.06em;">Side c (small △)</label>
                <input id="simC" type="number" value="5" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start;">
              <svg id="simSvg" viewBox="0 0 300 140" style="width:300px;max-width:100%;border-radius:8px;background:rgba(10,15,30,0.60);flex-shrink:0;"></svg>
              <div id="simOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.1;flex:1;min-width:160px;"></div>
            </div>
          </div>
          <script>
          (function(){
            function fmt(n){ return parseFloat(n.toPrecision(4)).toString(); }

            function drawSim(a,b,c,k){
              var svg = document.getElementById('simSvg');
              // Draw a right triangle (a,b,c where c=hyp) or approximate triangle using law of cosines
              // Use a 3-4-5 style placement: put right angle at bottom-left
              // Scale both triangles to fit in viewBox 300x140
              // Small triangle: base=a, height=b (right triangle approximation)
              var maxSide = Math.max(a,b,c);
              var scale1 = 50 / maxSide;  // small triangle max dimension ~50px
              var scale2 = scale1 * k;
              // Cap scale2 so large triangle fits
              if(b*scale2 > 100) scale2 = 100/b;
              if(a*scale2 > 130) scale2 = 130/a;

              // Small triangle coords (right-angle at bottom-left)
              var s1x=15, s1y=125;
              var s1 = {
                A: [s1x, s1y],
                B: [s1x + a*scale1, s1y],
                C: [s1x, s1y - b*scale1]
              };
              // Large triangle (same shape, scaled by k)
              var s2x=155, s2y=130;
              var s2 = {
                A: [s2x, s2y],
                B: [s2x + a*scale2, s2y],
                C: [s2x, s2y - b*scale2]
              };

              function pt(p){ return p[0].toFixed(1)+','+p[1].toFixed(1); }
              function line(p1,p2,col,sw,dash){
                return '<line x1="'+p1[0].toFixed(1)+'" y1="'+p1[1].toFixed(1)+'" x2="'+p2[0].toFixed(1)+'" y2="'+p2[1].toFixed(1)+'" stroke="'+col+'" stroke-width="'+(sw||1.5)+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>';
              }
              function poly(pts,fill,stroke){
                return '<polygon points="'+pts.map(pt).join(' ')+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.5" stroke-linejoin="round"/>';
              }
              function txt2(x,y,t,col,size){
                return '<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" text-anchor="middle" font-size="'+(size||9)+'" fill="'+(col||'rgba(221,225,240,0.60)')+'" font-family="JetBrains Mono,monospace">'+t+'</text>';
              }

              var h = '';
              // Small triangle
              h += poly([s1.A,s1.B,s1.C],'rgba(99,102,241,0.15)','#6366f1');
              h += '<rect x="'+s1.A[0]+'" y="'+(s1.A[1]-10)+'" width="10" height="10" fill="none" stroke="#6366f1" stroke-width="1"/>';
              // Side labels small
              h += txt2((s1.A[0]+s1.B[0])/2, s1.A[1]+12, fmt(a), '#a5b4fc', 8.5);
              h += txt2(s1.A[0]-10, (s1.A[1]+s1.C[1])/2, fmt(b), '#a5b4fc', 8.5);
              h += txt2((s1.B[0]+s1.C[0])/2+8, (s1.B[1]+s1.C[1])/2, fmt(c), '#a5b4fc', 8.5);
              h += txt2((s1.A[0]+s1.B[0]+s1.C[0])/3, s1.A[1]-b*scale1*0.5, '△ABC', '#6366f1', 9);

              // Large triangle
              h += poly([s2.A,s2.B,s2.C],'rgba(245,158,11,0.12)','#fbbf24');
              h += '<rect x="'+s2.A[0]+'" y="'+(s2.A[1]-10)+'" width="10" height="10" fill="none" stroke="#fbbf24" stroke-width="1"/>';
              // Side labels large
              h += txt2((s2.A[0]+s2.B[0])/2, s2.A[1]+12, fmt(a*k), '#fcd34d', 8.5);
              h += txt2(s2.A[0]-14, (s2.A[1]+s2.C[1])/2, fmt(b*k), '#fcd34d', 8.5);
              h += txt2((s2.B[0]+s2.C[0])/2+10, (s2.B[1]+s2.C[1])/2, fmt(c*k), '#fcd34d', 8.5);
              h += txt2((s2.A[0]+s2.B[0]+s2.C[0])/3+5, s2.A[1]-b*scale2*0.5, '△DEF', '#fbbf24', 9);

              // Scale factor arrow
              var midY = 20;
              h += '<text x="150" y="18" text-anchor="middle" font-size="9" fill="rgba(110,231,183,0.70)" font-family="Syne,sans-serif" font-weight="700">k = '+fmt(k)+'</text>';

              svg.innerHTML = h;
            }

            function update(){
              var k = parseFloat(document.getElementById('simK').value)||2;
              var a = parseFloat(document.getElementById('simA').value)||3;
              var b = parseFloat(document.getElementById('simB').value)||4;
              var c = parseFloat(document.getElementById('simC').value)||5;
              if(k<=0||a<=0||b<=0||c<=0) return;

              drawSim(a,b,c,k);

              var el = document.getElementById('simOut');
              var areaRatio = k*k;
              el.innerHTML = [
                '<div style="color:#6ee7b7;font-weight:700;font-family:Syne,sans-serif;margin-bottom:4px;">Scale factor k = '+fmt(k)+'</div>',
                '<div><span style="color:rgba(221,225,240,0.40);width:100px;display:inline-block;">△ABC sides:</span><span style="color:#a5b4fc;">'+fmt(a)+', '+fmt(b)+', '+fmt(c)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.40);width:100px;display:inline-block;">△DEF sides:</span><span style="color:#fcd34d;">'+fmt(a*k)+', '+fmt(b*k)+', '+fmt(c*k)+'</span></div>',
                '<div style="margin-top:6px;"><span style="color:rgba(221,225,240,0.40);width:100px;display:inline-block;">Perim ratio:</span><span style="color:#6ee7b7;">'+fmt(k)+' : 1</span></div>',
                '<div><span style="color:rgba(221,225,240,0.40);width:100px;display:inline-block;">Area ratio:</span><span style="color:#6ee7b7;">'+fmt(areaRatio)+' : 1 (k²)</span></div>',
                '<div style="margin-top:6px;font-size:10px;color:rgba(221,225,240,0.35);">All angles stay the same in similar shapes.</div>',
              ].join('');
            }

            ['simK','simA','simB','simC'].forEach(function(id){
              var el = document.getElementById(id);
              el.addEventListener('input', update);
              el.addEventListener('keydown', function(e){ if(e.key==='Enter') update(); });
            });
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>To prove triangles are similar, show that two pairs of angles are equal (AA) — the third pair is automatically equal because angle sums are both 180°.</span></div>
        `
      },
      questions: [
        { type: "input", text: "△ABC ∼ △DEF with scale factor 2.5. If AB = 4 cm, find DE in cm.", answer: "10", topic: "Similarity" },
        { type: "mc", text: "Two similar triangles have corresponding sides in ratio 3:5. What is the ratio of their areas?", options: ["3:5", "6:10", "9:25", "27:125"], answer: 2, topic: "Similarity" },
        { type: "input", text: "△PQR ∼ △XYZ. PQ = 8, XY = 12, QR = 10. Find YZ.", answer: "15", topic: "Similarity" },
        { type: "mc", text: "What is the minimum condition to prove two triangles similar?", options: ["SSS", "Two pairs of equal angles (AA)", "SAS", "One pair of equal sides"], answer: 1, topic: "Similarity" },
        { type: "input", text: "Two similar rectangles have lengths 6 cm and 9 cm. If the smaller has width 4 cm, find the larger width in cm.", answer: "6", topic: "Similarity" },
      ]
    },
    {
      id: 1006,
      chapter: 10,
      name: "Ch 10 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 10 — Examination focus",
        sub: "Chapter 10 · Review",
        body: `
          <p>Exam questions on 2D geometry test angle calculations, identifying shape properties, and proving congruence or similarity. Always give reasons.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 10 summary</div>
            <p>
              ✅ Triangle angle sum = 180°; exterior angle = sum of non-adjacent interior angles<br>
              ✅ Quadrilateral angle sum = 360°<br>
              ✅ Parallelogram: opp. sides ∥ and =, opp. ∠s =, co-int. ∠s supplementary<br>
              ✅ Congruence: SSS, SAS, AAS, RHS (NOT AAA)<br>
              ✅ Similarity: equal angles + proportional sides; scale factor k; area ratio k²<br>
              ✅ Always write reasons for every angle statement
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Congruence = same size AND shape. Similarity = same shape, different size. Don't confuse them in exam answers.</span></div>
        `
      },
      questions: [
        { type: "input", text: "In △ABC, ∠A = 2x, ∠B = 3x − 10, ∠C = x + 10. Find x.", answer: "30", topic: "Mixed" },
        { type: "mc", text: "△ABC ≅ △DEF by SAS. Which parts must be equal?", options: ["All three sides", "Two sides and the included angle", "Two angles and any side", "Hypotenuse and one leg"], answer: 1, topic: "Mixed" },
        { type: "input", text: "A quadrilateral has angles x, 2x, 3x, and 4x. Find the largest angle.", answer: "144", topic: "Mixed" },
        { type: "mc", text: "△ABC ∼ △PQR. AB = 5, PQ = 15, area of △ABC = 12 cm². Find area of △PQR.", options: ["36 cm²", "108 cm²", "180 cm²", "48 cm²"], answer: 1, topic: "Mixed" },
        { type: "input", text: "In a rhombus, one angle is 3x and the adjacent angle is (x + 60)°. Find x.", answer: "30", topic: "Mixed" },
      ]
    },
  ],
  workbook: {
    chapter: 10, chapterName: "Geometry of 2D Shapes",
    topics: [
      {
        name: "Geometry of triangles",
        questions: [
          { num: "1", text: "In △PQR, ∠P = (3x − 5)°, ∠Q = (2x + 10)°, ∠R = (x + 15)°.", parts: [
            { label: "a)", text: "Set up an equation using the angle sum of a triangle.", marks: 1 },
            { label: "b)", text: "Solve for x.", marks: 2 },
            { label: "c)", text: "Find each angle.", marks: 2 },
          ]},
          { num: "2", text: "In △ABC, an exterior angle at C = 128°. ∠A = 65°.", parts: [
            { label: "a)", text: "Find ∠B, giving a reason.", marks: 2 },
            { label: "b)", text: "What type of triangle is △ABC? Give a reason.", marks: 2 },
          ]},
        ]
      },
      {
        name: "Geometry of quadrilaterals",
        questions: [
          { num: "3", text: "ABCD is a parallelogram with ∠A = (4x + 5)° and ∠B = (2x + 15)°.", parts: [
            { label: "a)", text: "Explain why ∠A + ∠B = 180°.", marks: 1 },
            { label: "b)", text: "Solve for x and find both angles.", marks: 3 },
          ]},
          { num: "4", text: "PQRS is a rhombus with ∠P = 68°.", parts: [
            { label: "a)", text: "Find ∠Q, giving a reason.", marks: 2 },
            { label: "b)", text: "Find ∠R, giving a reason.", marks: 2 },
            { label: "c)", text: "The diagonal PR bisects ∠P. Find ∠APQ where A is the intersection of the diagonals.", marks: 2 },
          ]},
        ]
      },
      {
        name: "Congruent and similar shapes",
        questions: [
          { num: "5", text: "State the congruency condition (SSS, SAS, ASA, or RHS) for each pair:", parts: [
            { label: "a)", text: "Two triangles with all three sides equal.", marks: 1 },
            { label: "b)", text: "Two right-angled triangles with equal hypotenuses and one equal leg.", marks: 1 },
            { label: "c)", text: "Two triangles with two equal sides and the included angle equal.", marks: 1 },
          ]},
          { num: "6", text: "△ABC ∼ △PQR. AB = 6 cm, BC = 9 cm, AC = 12 cm, PQ = 10 cm.", parts: [
            { label: "a)", text: "Find the scale factor.", marks: 1 },
            { label: "b)", text: "Find QR and PR.", marks: 3 },
            { label: "c)", text: "If area of △ABC = 24 cm², find the area of △PQR.", marks: 2 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 10, chapterName: "Chapter 10 — Geometry of 2D Shapes",
    topics: [
      {
        name: "Geometry of triangles",
        answers: [
          { num: "Q1a", ans: "(3x−5)+(2x+10)+(x+15) = 180", note: "Angle sum of a triangle = 180°" },
          { num: "Q1b", ans: "x = 26⅔ ≈ 26.7", note: "6x+20=180 → 6x=160 → x=26.7" },
          { num: "Q1c", ans: "∠P ≈ 75°, ∠Q ≈ 63.3°, ∠R ≈ 41.7°", note: "Substitute x≈26.7 into each expression" },
          { num: "Q2a", ans: "∠B = 63°", note: "Exterior angle = sum of non-adjacent interior angles: 128°−65°=63°" },
          { num: "Q2b", ans: "Scalene triangle", note: "∠C=180°−128°=52°; all three angles differ (65°, 63°, 52°)" },
        ]
      },
      {
        name: "Geometry of quadrilaterals",
        answers: [
          { num: "Q3a", ans: "AB ∥ DC in a parallelogram, so ∠A and ∠B are co-interior angles → sum = 180°", note: "" },
          { num: "Q3b", ans: "x = 26⅔; ∠A ≈ 111.7°, ∠B ≈ 68.3°", note: "4x+5+2x+15=180 → 6x=160 → x=26.7" },
          { num: "Q4a", ans: "∠Q = 112°", note: "Co-interior angles in rhombus: ∠P+∠Q=180°; 68°+∠Q=180°" },
          { num: "Q4b", ans: "∠R = 68°", note: "Opposite angles of a rhombus are equal: ∠R=∠P=68°" },
          { num: "Q4c", ans: "∠APQ = 34°", note: "Diagonal bisects ∠P: 68°÷2=34°; triangle at intersection has 90° (diagonals ⊥)" },
        ]
      },
      {
        name: "Congruent and similar shapes",
        answers: [
          { num: "Q5a", ans: "SSS", note: "Side-Side-Side" },
          { num: "Q5b", ans: "RHS", note: "Right angle-Hypotenuse-Side" },
          { num: "Q5c", ans: "SAS", note: "Side-Angle-Side (included angle)" },
          { num: "Q6a", ans: "k = 5/3 ≈ 1.667", note: "PQ/AB = 10/6 = 5/3" },
          { num: "Q6b", ans: "QR = 15 cm; PR = 20 cm", note: "QR=9×(5/3)=15; PR=12×(5/3)=20" },
          { num: "Q6c", ans: "Area △PQR ≈ 66.7 cm²", note: "Area ratio=k²=25/9; 24×25/9≈66.7" },
        ]
      },
    ]
  }
});
