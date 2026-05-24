// Math Magician — Grade 8, Chapter 13 data
// Theorem of Pythagoras

MathMagician.registerChapter(13, {
  topics: [
    {
      id: 76,
      chapter: 13,
      name: "Pythagoras in right-angled triangles",
      fullName: "The theorem of Pythagoras in right-angled triangles",
      lesson: {
        heading: "The theorem of Pythagoras",
        sub: "Chapter 13 · Topic 1",
        body: `
          <p>The theorem of Pythagoras describes the relationship between the three sides of a <strong>right-angled triangle</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 The theorem</div>
            <p>
              In a right-angled triangle, the square of the <strong>hypotenuse</strong> equals the sum of the squares of the other two sides.<br><br>
              <span class="math">c² = a² + b²</span><br><br>
              where <strong>c</strong> is the hypotenuse (the side opposite the right angle — always the longest side), and <strong>a</strong> and <strong>b</strong> are the other two sides (legs).<br><br>
              <strong>Finding the hypotenuse:</strong> <span class="math">c = √(a² + b²)</span><br>
              <strong>Finding a leg:</strong> <span class="math">a = √(c² − b²)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Find c: a = 3, b = 4. <span class="math">c² = 9 + 16 = 25 → c = 5</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Find a: c = 13, b = 5. <span class="math">a² = 169 − 25 = 144 → a = 12</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Find c: a = 7, b = 24. <span class="math">c² = 49 + 576 = 625 → c = 25</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Pythagoras Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter any two sides (leave the unknown as 0) — set c = 0 to find the hypotenuse.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">a =</span>
              <input id="pyA" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">b =</span>
              <input id="pyB" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">c =</span>
              <input id="pyC" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="pyBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Solve</button>
            </div>
            <div id="pyOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function solve(){
              const a=parseFloat(document.getElementById('pyA').value)||0;
              const b=parseFloat(document.getElementById('pyB').value)||0;
              const c=parseFloat(document.getElementById('pyC').value)||0;
              const el=document.getElementById('pyOut');
              function fmt(n){return Number.isInteger(n)?n:n.toFixed(3);}
              if(c===0&&a>0&&b>0){
                const c2=a*a+b*b;
                const cv=Math.sqrt(c2);
                el.innerHTML='<div><span style="opacity:0.5;">c² = '+a+'² + '+b+'² = '+a*a+' + '+b*b+' = '+c2+'</span></div><div><span style="opacity:0.5;">c = √'+c2+' = </span><span style="color:#6ee7b7;font-size:14px;">'+fmt(cv)+'</span></div>';
              } else if(a===0&&b>0&&c>0){
                const a2=c*c-b*b;
                if(a2<0){el.innerHTML='<span style="color:#fca5a5;">Invalid — c must be longer than b.</span>';return;}
                const av=Math.sqrt(a2);
                el.innerHTML='<div><span style="opacity:0.5;">a² = '+c+'² − '+b+'² = '+c*c+' − '+b*b+' = '+a2+'</span></div><div><span style="opacity:0.5;">a = √'+a2+' = </span><span style="color:#6ee7b7;font-size:14px;">'+fmt(av)+'</span></div>';
              } else if(b===0&&a>0&&c>0){
                const b2=c*c-a*a;
                if(b2<0){el.innerHTML='<span style="color:#fca5a5;">Invalid — c must be longer than a.</span>';return;}
                const bv=Math.sqrt(b2);
                el.innerHTML='<div><span style="opacity:0.5;">b² = '+c+'² − '+a+'² = '+c*c+' − '+a*a+' = '+b2+'</span></div><div><span style="opacity:0.5;">b = √'+b2+' = </span><span style="color:#6ee7b7;font-size:14px;">'+fmt(bv)+'</span></div>';
              } else if(a>0&&b>0&&c>0){
                const check=Math.abs(a*a+b*b-c*c)<0.01;
                el.innerHTML=check?'<span style="color:#6ee7b7;">✓ Valid right-angled triangle: '+a+'²+'+b+'²='+c+'²</span>':'<span style="color:#fca5a5;">✗ Not a right-angled triangle</span>';
              } else {
                el.innerHTML='<span style="color:#fca5a5;">Enter exactly two sides (set unknown to 0).</span>';
              }
            }
            document.getElementById('pyBtn').addEventListener('click',solve);
            solve();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Common Pythagorean triples to memorise: <strong>3-4-5</strong>, <strong>5-12-13</strong>, <strong>8-15-17</strong>, <strong>7-24-25</strong>. Multiples of these (6-8-10, 9-12-15) are also right-angled triangles.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the hypotenuse of a right-angled triangle with legs 5 cm and 12 cm.", answer: "13", topic: "Pythagoras" },
        { type: "mc", text: "A right-angled triangle has hypotenuse 17 cm and one leg 8 cm. Find the other leg.", options: ["9 cm", "15 cm", "12 cm", "√225 cm"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "Find the hypotenuse if a = 9 and b = 12. Give exact answer.", answer: "15", topic: "Pythagoras" },
        { type: "mc", text: "Is a triangle with sides 6, 8, 10 right-angled?", options: ["No", "Yes — 6²+8²=10²", "Yes — but only by coincidence", "Cannot tell"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "Find the missing leg: hypotenuse = 26, one leg = 24.", answer: "10", topic: "Pythagoras" },
      ]
    },
    {
      id: 77,
      chapter: 13,
      name: "Sides and angles not right-angled",
      fullName: "Sides and angles of triangles that are not right-angled",
      lesson: {
        heading: "Sides and angles of triangles that are not right-angled",
        sub: "Chapter 13 · Topic 2",
        body: `
          <p>Pythagoras only applies to right-angled triangles. For other triangles, we use triangle properties and sometimes construct a perpendicular height to create right-angled triangles.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Using Pythagoras in non-right triangles</div>
            <p>
              Drop a <strong>perpendicular height</strong> from a vertex to the opposite base. This splits the triangle into two right-angled triangles, and you can apply Pythagoras to each.<br><br>
              <strong>Example:</strong> Isosceles triangle with equal sides = 10 and base = 12.<br>
              Height splits base in half: 12 ÷ 2 = 6.<br>
              <span class="math">h² = 10² − 6² = 100 − 36 = 64 → h = 8</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example — equilateral triangle</div>
            <div class="example-step"><span class="step-num">1</span><span>Equilateral triangle with side 10. Find height.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Height bisects base: half-base = 5.</span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">h² = 10² − 5² = 100 − 25 = 75 → h = √75 = 5√3 ≈ 8.66</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In an isosceles triangle, the perpendicular height from the apex bisects the base exactly. In an equilateral triangle, it also bisects the base angle.</span></div>
        `
      },
      questions: [
        { type: "input", text: "An isosceles triangle has equal sides of 13 cm and a base of 10 cm. Find the height in cm.", answer: "12", topic: "Pythagoras" },
        { type: "mc", text: "An equilateral triangle has side 6 cm. Which expression gives its height?", options: ["√(36−9)", "√(36−18)", "√(36−36)", "√(18−9)"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "A triangle has base 16 cm. The perpendicular height from apex is 6 cm. Find the equal sides if it is isosceles. (Each slant side in cm)", answer: "10", topic: "Pythagoras" },
        { type: "mc", text: "Pythagoras' theorem can ONLY be applied to:", options: ["Any triangle", "Right-angled triangles", "Isosceles triangles", "Equilateral triangles"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "An equilateral triangle has side 8 cm. Calculate the height to 2 decimal places.", answer: "6.93", topic: "Pythagoras" },
      ]
    },
    {
      id: 78,
      chapter: 13,
      name: "Applications of Pythagoras",
      fullName: "Applications of the theorem of Pythagoras",
      lesson: {
        heading: "Applications of the theorem of Pythagoras",
        sub: "Chapter 13 · Topic 3",
        body: `
          <p>Pythagoras applies whenever a right angle is formed — in architecture, navigation, sport fields, and coordinate geometry.</p>
          <div class="example-box">
            <div class="example-box-title">✏️ Real-world applications</div>
            <div class="example-step"><span class="step-num">1</span><span><strong>Ladder problem:</strong> A 5 m ladder leans against a wall, its foot 3 m from the wall. How high does it reach? <span class="math">h² = 25 − 9 = 16 → h = 4 m</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><strong>Diagonal of rectangle:</strong> 8 × 6 rectangle. <span class="math">d² = 64 + 36 = 100 → d = 10</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><strong>Distance between points:</strong> A(1, 2) and B(5, 5). <span class="math">d = √((5−1)² + (5−2)²) = √(16+9) = √25 = 5</span></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Distance formula</div>
            <p>
              The distance between two points (x₁, y₁) and (x₂, y₂) on the Cartesian plane:<br>
              <span class="math">d = √((x₂−x₁)² + (y₂−y₁)²)</span><br><br>
              This is just Pythagoras applied to horizontal and vertical distances.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Draw a diagram for every application problem. Label the right angle, identify the hypotenuse, and then apply c² = a² + b².</span></div>
        `
      },
      questions: [
        { type: "input", text: "A ladder 10 m long leans against a wall. Its foot is 6 m from the wall. How high up the wall does it reach in metres?", answer: "8", topic: "Pythagoras" },
        { type: "mc", text: "A rectangle is 9 cm × 40 cm. What is the length of its diagonal?", options: ["41 cm", "49 cm", "38 cm", "√1681 cm"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "Find the distance between points A(0, 0) and B(5, 12).", answer: "13", topic: "Pythagoras" },
        { type: "mc", text: "A square has diagonal 10 cm. What is its side length? (Leave in surd form if needed)", options: ["5 cm", "5√2 cm", "√50 cm", "Both B and C"], answer: 3, topic: "Pythagoras" },
        { type: "input", text: "Find the distance between A(1, 3) and B(4, 7). Round to 2 decimal places.", answer: "5", topic: "Pythagoras" },
      ]
    },
    {
      id: 79,
      chapter: 13,
      name: "Ch 13 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 13 — Examination focus",
        sub: "Chapter 13 · Review",
        body: `
          <p>Pythagoras questions appear in every Grade 8 exam. They range from simple side-finding to multi-step application problems.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 13 summary</div>
            <p>
              ✅ Pythagoras: <span class="math">c² = a² + b²</span> (right-angled triangles only)<br>
              ✅ Hypotenuse = side opposite the right angle (longest side)<br>
              ✅ Finding a leg: <span class="math">a = √(c² − b²)</span><br>
              ✅ Non-right triangles: drop a perpendicular height, then apply Pythagoras<br>
              ✅ Distance formula: <span class="math">d = √(Δx² + Δy²)</span><br>
              ✅ Common triples: 3-4-5, 5-12-13, 7-24-25, 8-15-17
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always identify the hypotenuse first — it's opposite the right angle and always the longest side. Never subtract when finding the hypotenuse (that's for finding a leg).</span></div>
        `
      },
      questions: [
        { type: "input", text: "A right-angled triangle has legs 9 and 40. Find the hypotenuse.", answer: "41", topic: "Mixed" },
        { type: "mc", text: "In △ABC, ∠B = 90°. AB = 7, BC = 24. Find AC.", options: ["31", "25", "√527", "17"], answer: 1, topic: "Mixed" },
        { type: "input", text: "An isosceles triangle has equal sides 15 cm and base 18 cm. Find the height from the apex.", answer: "12", topic: "Mixed" },
        { type: "mc", text: "A 13 m wire runs from the top of a 5 m pole to the ground. How far from the base of the pole does it anchor?", options: ["8 m", "12 m", "18 m", "√144 m"], answer: 1, topic: "Mixed" },
        { type: "input", text: "Find the distance between A(−2, 1) and B(3, 13). Give exact answer.", answer: "13", topic: "Mixed" },
      ]
    },
  ],
  workbook: {
    chapter: 13, chapterName: "Theorem of Pythagoras",
    topics: [
      { name: "Pythagoras — finding sides and applications",
        questions: [
          { num: "1", text: "In each right-angled triangle, find the unknown side (leave surds where necessary):", parts: [
            { label: "a)", text: "a = 8, b = 15, find c.", marks: 2 },
            { label: "b)", text: "c = 20, b = 16, find a.", marks: 2 },
            { label: "c)", text: "a = 7, b = 7, find c.", marks: 2 },
          ]},
          { num: "2", text: "Application problems:", parts: [
            { label: "a)", text: "A television screen is 48 cm wide and 36 cm tall. Find the length of its diagonal.", marks: 3 },
            { label: "b)", text: "An isosceles triangle has base 20 cm and equal sides of 26 cm. Calculate the area of the triangle.", marks: 5 },
            { label: "c)", text: "P = (−1, 2) and Q = (5, 10). Find PQ.", marks: 3 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 13, chapterName: "Chapter 13 — Theorem of Pythagoras",
    topics: [
      { name: "Pythagoras — finding sides and applications", answers: [
        { num: "Q1a", ans: "c = 17", note: "c²=64+225=289; c=17" },
        { num: "Q1b", ans: "a = 12", note: "a²=400−256=144; a=12" },
        { num: "Q1c", ans: "c = 7√2 ≈ 9.90", note: "c²=49+49=98; c=√98=7√2" },
        { num: "Q2a", ans: "60 cm", note: "d²=48²+36²=2304+1296=3600; d=60" },
        { num: "Q2b", ans: "Area = 240 cm²", note: "h²=26²−10²=676−100=576; h=24; A=½×20×24=240 cm²" },
        { num: "Q2c", ans: "PQ = 10", note: "PQ=√((5+1)²+(10−2)²)=√(36+64)=√100=10" },
      ]},
    ]
  }
});
