// Math Magician — Grade 9, Chapter 13 data
// Pythagoras' Theorem

MathMagician.registerChapter(13, {
  topics: [
    {
      id: 25,
      chapter: 13,
      name: "Pythagoras' theorem",
      fullName: "Pythagoras' theorem — finding sides",
      lesson: {
        heading: "Pythagoras' theorem",
        sub: "Chapter 13 · Topic 1",
        body: `
          <p><strong>Pythagoras' theorem</strong> states that in any right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.</p>
          <div class="def-box">
            <div class="def-box-title">📖 The theorem</div>
            <p>
              In △ABC with right angle at C:<br>
              <span class="math">c² = a² + b²</span><br>
              where c is the hypotenuse (side opposite the right angle).<br><br>
              <strong>To find hypotenuse:</strong> <span class="math">c = √(a² + b²)</span><br>
              <strong>To find a shorter side:</strong> <span class="math">a = √(c² - b²)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>a = 6, b = 8: c = √(36 + 64) = √100 = 10</span></div>
            <div class="example-step"><span class="step-num">2</span><span>c = 13, b = 5: a = √(169 - 25) = √144 = 12</span></div>
            <div class="example-step"><span class="step-num">3</span><span>a = 7, b = 11: c = √(49 + 121) = √170 ≈ 13,04</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Pythagorean triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25) — memorise these!</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always identify the hypotenuse first — it's always opposite the right angle and always the longest side.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Pythagoras Solver</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Leave one field blank. Enter any two sides and the third is calculated.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Side a</label><input id="pyA" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Side b</label><input id="pyB" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Hypotenuse c</label><input id="pyC" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="pyBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Solve</button>
            </div>
            <div id="pyOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function f(v){return Math.round(v*10000)/10000;}
            function solve(){
              var a=parseFloat(document.getElementById('pyA').value),b=parseFloat(document.getElementById('pyB').value),c=parseFloat(document.getElementById('pyC').value);
              var blanks=[isNaN(a),isNaN(b),isNaN(c)].filter(Boolean).length;
              var el=document.getElementById('pyOut');
              if(blanks!==1){el.innerHTML='<span style="color:#fca5a5;">Leave exactly one field blank.</span>';return;}
              var res,step1,step2;
              if(isNaN(c)){res=Math.sqrt(a*a+b*b);step1='c\xb2 = '+a+'\xb2 + '+b+'\xb2 = '+(a*a+b*b);step2='c = √'+(a*a+b*b)+' = '+f(res);document.getElementById('pyC').value=f(res);}
              else if(isNaN(b)){res=Math.sqrt(c*c-a*a);step1='b\xb2 = '+c+'\xb2 − '+a+'\xb2 = '+(c*c-a*a);step2='b = √'+(c*c-a*a)+' = '+f(res);document.getElementById('pyB').value=f(res);}
              else{res=Math.sqrt(c*c-b*b);step1='a\xb2 = '+c+'\xb2 − '+b+'\xb2 = '+(c*c-b*b);step2='a = √'+(c*c-b*b)+' = '+f(res);document.getElementById('pyA').value=f(res);}
              el.innerHTML='<div style="color:rgba(221,225,240,0.60);">'+step1+'</div><div><strong style="color:#6ee7b7;">'+step2+'</strong></div>';
            }
            document.getElementById('pyBtn').addEventListener('click',solve);
            ['pyA','pyB','pyC'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')solve();});});
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "In a right triangle, legs are 9 cm and 12 cm. Find the hypotenuse.", answer: "15", topic: "Pythagoras" },
        { type: "mc", text: "The hypotenuse is 17 cm and one leg is 8 cm. The other leg is:", options: ["9 cm", "15 cm", "25 cm", "√353 cm"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "Calculate: √(5² + 12²)", answer: "13", topic: "Pythagoras" },
        { type: "mc", text: "Is a triangle with sides 9, 40, 41 a right triangle?", options: ["Yes", "No", "Cannot determine", "Only if angles given"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "A ladder 10 m long leans against a wall. The foot is 6 m from the wall. How high up the wall does it reach?", answer: "8", topic: "Pythagoras" },
        { type: "input", text: "A right triangle has legs in the ratio 5:12. If the hypotenuse is 39 cm, find the perimeter of the triangle (in cm).", answer: "90", topic: "Pythagoras" },
      ]
    },
    {
      id: 26,
      chapter: 13,
      name: "Applications of Pythagoras",
      fullName: "Applications of Pythagoras' theorem",
      lesson: {
        heading: "Applications of Pythagoras' theorem",
        sub: "Chapter 13 · Topic 2",
        body: `
          <p>Pythagoras' theorem applies in many real-world contexts and in more complex geometric problems.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Common applications</div>
            <p>
              <strong>Diagonal of a rectangle:</strong> d = √(l² + b²)<br>
              <strong>Height of isosceles triangle:</strong> split into two right triangles<br>
              <strong>Distance between two points:</strong> d = √[(x2-x1)² + (y2-y1)²]<br>
              <strong>Converse (testing for right angle):</strong> if a² + b² = c², the triangle is right-angled.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Diagonal of 5 cm × 12 cm rectangle: d = √(25 + 144) = √169 = 13 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Isosceles triangle: base = 16 cm, equal sides = 10 cm. Height: h = √(10² - 8²) = √(100 - 64) = √36 = 6 cm</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Distance: A(1;2) to B(4;6): d = √(9+16) = √25 = 5 units</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In isosceles triangle problems, the altitude from the apex bisects the base, creating two identical right triangles.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Pythagoras Solver</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Leave one field blank. Enter any two sides and the third is calculated.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Side a</label><input id="pyA2" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Side b</label><input id="pyB2" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Hypotenuse c</label><input id="pyC2" type="number" placeholder="—" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="pyBtn2" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Solve</button>
            </div>
            <div id="pyOut2" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function f(v){return Math.round(v*10000)/10000;}
            function solve(){
              var a=parseFloat(document.getElementById('pyA2').value),b=parseFloat(document.getElementById('pyB2').value),c=parseFloat(document.getElementById('pyC2').value);
              var blanks=[isNaN(a),isNaN(b),isNaN(c)].filter(Boolean).length;
              var el=document.getElementById('pyOut2');
              if(blanks!==1){el.innerHTML='<span style="color:#fca5a5;">Leave exactly one field blank.</span>';return;}
              var res,step1,step2;
              if(isNaN(c)){res=Math.sqrt(a*a+b*b);step1='c\xb2 = '+a+'\xb2 + '+b+'\xb2 = '+(a*a+b*b);step2='c = √'+(a*a+b*b)+' = '+f(res);document.getElementById('pyC2').value=f(res);}
              else if(isNaN(b)){res=Math.sqrt(c*c-a*a);step1='b\xb2 = '+c+'\xb2 − '+a+'\xb2 = '+(c*c-a*a);step2='b = √'+(c*c-a*a)+' = '+f(res);document.getElementById('pyB2').value=f(res);}
              else{res=Math.sqrt(c*c-b*b);step1='a\xb2 = '+c+'\xb2 − '+b+'\xb2 = '+(c*c-b*b);step2='a = √'+(c*c-b*b)+' = '+f(res);document.getElementById('pyA2').value=f(res);}
              el.innerHTML='<div style="color:rgba(221,225,240,0.60);">'+step1+'</div><div><strong style="color:#6ee7b7;">'+step2+'</strong></div>';
            }
            document.getElementById('pyBtn2').addEventListener('click',solve);
            ['pyA2','pyB2','pyC2'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')solve();});});
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Find the diagonal of a rectangle with length 24 cm and width 7 cm.", answer: "25", topic: "Pythagoras" },
        { type: "mc", text: "An isosceles triangle has equal sides of 13 cm and a base of 10 cm. Its height is:", options: ["12 cm", "8 cm", "10 cm", "√119 cm"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "Find the distance between points (0;0) and (3;4).", answer: "5", topic: "Pythagoras" },
        { type: "mc", text: "A triangle has sides 7, 24, 25. Is it right-angled?", options: ["Yes, 7²+24²=625=25²", "No", "Yes, 7+24=25", "Cannot tell"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "A square has diagonal 10√2 cm. Find the side length of the square.", answer: "10", topic: "Pythagoras" },
        { type: "input", text: "A rectangular field is 21 m by 20 m. How many fewer metres does a farmer walk by cutting diagonally across the field, compared to walking along the two sides?", answer: "12", topic: "Pythagoras" },
      ]
    },
    {
      id: 1301,
      chapter: 13,
      name: "Pythagoras in shapes",
      fullName: "Using Pythagoras in rectangles, rhombi, isosceles triangles and multi-step problems",
      lesson: {
        heading: "Pythagoras in shapes",
        sub: "Chapter 13 · Topic 3",
        body: `
<p>Many shapes hide right-angled triangles: a rectangle's diagonal, the height of an isosceles triangle, the diagonals of a rhombus. Find the right angle, then use Pythagoras.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":300,"h":170,"view":[-0.5,-0.5,12.5,5],"pts":{"A":[0,0],"B":[6,0],"C":[6,4],"D":[0,4],"P":[10,0],"Q":[12.2,2.2],"R":[10,4.4],"S":[7.8,2.2],"O":[10,2.2]},"lab":{"A":"sw","B":"se","C":"ne","D":"nw","P":"s","Q":"e","R":"n","S":"w","O":"se"},"seg":[["A","B","ln",null,"12"],["B","C","ln",null,"5"],["C","D"],["D","A"],["A","C","ac"],["P","Q"],["Q","R"],["R","S"],["S","P"],["P","R","hl"],["S","Q","hl"]],"ra":[["A","B","C"],["Q","O","R"]],"nolab":[]}'></div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: the diagonal of a rectangle</div>
  <div class="example-step"><span class="step-num">1</span><span>Rectangle ABCD with AB = 12 and BC = 5. △ABC has a right angle at B.</span></div>
  <div class="example-step"><span class="step-num">2</span><span><span class="math">AC² = 12² + 5² = 144 + 25 = 169</span>, so <strong>AC = 13</strong></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: the side of a rhombus</div>
  <div class="example-step"><span class="step-num">1</span><span>A rhombus has diagonals PR = 16 and SQ = 12. They bisect each other at 90° at O.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>OR = 8 and OQ = 6, so QR² = 8² + 6² = 100 and <strong>QR = 10</strong>.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: is it right-angled?</div>
  <div class="example-step"><span class="step-num">1</span><span>Sides 9, 12 and 15: 9² + 12² = 81 + 144 = 225 = 15². <strong>Yes</strong>, the angle opposite 15 is 90°.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Sides 6, 7 and 9: 36 + 49 = 85 ≠ 81. <strong>No</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Round only at the very end. If an answer is a surd like √50, you can leave it, or round to 2 decimals (7,07) when the question asks.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "A rectangle is 8 cm by 15 cm. How long is its diagonal? (cm)", "answer": "17", "topic": "Pythagoras in shapes"},
        {"type": "input", "text": "A rhombus has diagonals of 10 cm and 24 cm. How long is each side? (cm)", "answer": "13", "topic": "Pythagoras in shapes"},
        {"type": "input", "text": "An isosceles triangle has equal sides of 13 cm and a base of 10 cm. What is its height? (cm)", "answer": "12", "topic": "Pythagoras in shapes"},
        {"type": "mc", "text": "Which triangle is right-angled?", "options": ["4, 5, 6", "8, 15, 17", "5, 6, 8", "7, 8, 10"], "answer": 1, "topic": "Pythagoras in shapes"},
        {"type": "input", "text": "A square has a diagonal of 10 cm. What is its area? (cm²)", "answer": "50", "topic": "Pythagoras in shapes"},
        {"type": "input", "text": "A 5 m ladder leans against a wall with its foot 1,4 m from the wall. How high up the wall does it reach? (m)", "answer": "4.8", "altAnswers": ["4,8"], "topic": "Pythagoras in shapes"},
      ]
    },
    {
      id: 1302,
      chapter: 13,
      name: "Ch 13 Exam focus",
      fullName: "Exam practice: the theorem of Pythagoras",
      lesson: {
        heading: "Ch 13 Exam focus",
        sub: "Chapter 13 · Topic 4",
        body: `
<p>These questions mix the whole chapter, the way a test does. Mark the right angle and the hypotenuse on the sketch before you substitute.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Write down the rule or formula you use, then substitute, then give the answer with units. Marks are given for each step.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "The two shorter sides of a right-angled triangle are 20 and 21. Find the hypotenuse.", "answer": "29", "topic": "Ch 13 Exam focus"},
        {"type": "input", "text": "The hypotenuse is 25 and one side is 7. Find the other side.", "answer": "24", "topic": "Ch 13 Exam focus"},
        {"type": "input", "text": "A TV screen is 48 cm wide and 36 cm high. What is its diagonal? (cm)", "answer": "60", "topic": "Ch 13 Exam focus"},
        {"type": "mc", "text": "In △ABC, ∠B = 90°. The hypotenuse is:", "options": ["AB", "BC", "AC", "the shortest side"], "answer": 2, "topic": "Ch 13 Exam focus"},
        {"type": "input", "text": "A ship sails 9 km east and then 12 km north. How far is it from its start? (km)", "answer": "15", "topic": "Ch 13 Exam focus"},
        { type: "input", text: "A closed box measures 12 cm × 4 cm × 3 cm.<div class=\"mf-fig\" data-fig='{\"t\":\"solid\",\"kind\":\"cuboid\",\"labels\":{\"l\":\"12 cm\",\"b\":\"4 cm\",\"h\":\"3 cm\"}}'></div>What is the length of the longest straight rod that fits inside it? (cm)", answer: "13", topic: "Ch 13 Exam focus" }
      ]
    },
  ],
  workbook: {
    chapter: 13, chapterName: "Pythagoras' Theorem",
    topics: [
      {
        name: "Pythagoras — Finding Sides",
        questions: [
          {
            num: "1",
            text: "Calculate the unknown side in each right-angled triangle (leave surds in surd form where the answer is not exact):",
            parts: [
              { label: "a)", text: "Legs: 15 cm and 20 cm. Find hypotenuse.", marks: 3 },
              { label: "b)", text: "Hypotenuse: 26 cm, one leg: 10 cm. Find the other leg.", marks: 3 },
              { label: "c)", text: "Legs: 7 cm and 9 cm. Find hypotenuse (leave in surd form).", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Applications",
        questions: [
          {
            num: "2",
            text: "A rectangular garden is 30 m long and 16 m wide. A path runs diagonally across it.",
            parts: [
              { label: "a)", text: "Calculate the length of the diagonal path.", marks: 3 },
              { label: "b)", text: "A fence post is placed at the midpoint of the diagonal. How far is this from each corner of the rectangle?", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "An equilateral triangle has side length 12 cm.",
            parts: [
              { label: "a)", text: "Find the height of the triangle using Pythagoras' theorem.", marks: 4 },
              { label: "b)", text: "Hence find the area of the triangle.", marks: 3 },
            ]
          },
        ]
      },
      {
        "name": "Pythagoras in shapes",
        "questions": [
          {
            "num": "4",
            "text": "Show all working.",
            "parts": [
              {
                "label": "a)",
                "text": "A kite ABCD has diagonals AC and BD meeting at O at 90°. AO = 6 cm, OC = 16 cm and BO = OD = 8 cm. Calculate AB and BC.",
                "marks": 4
              },
              {
                "label": "b)",
                "text": "Is a triangle with sides 11, 60 and 61 right-angled? Show why.",
                "marks": 2
              }
            ]
          }
        ]
      },
    ]
  },
  answerKey: {
    chapter: 13, chapterName: "Chapter 13 — Pythagoras' Theorem",
    topics: [
      {
        name: "Pythagoras — Finding Sides",
        answers: [
          { num: "Q1a", ans: "25 cm", note: "√(225+400) = √625 = 25" },
          { num: "Q1b", ans: "24 cm", note: "√(676-100) = √576 = 24" },
          { num: "Q1c", ans: "√130 cm ≈ 11,4 cm", note: "√(49+81) = √130" },
        ]
      },
      {
        name: "Applications",
        answers: [
          { num: "Q2a", ans: "34 m", note: "√(900+256) = √1156 = 34" },
          { num: "Q2b", ans: "17 m", note: "Half of 34 m" },
          { num: "Q3a", ans: "6√3 ≈ 10,39 cm", note: "h = √(12² - 6²) = √(144-36) = √108 = 6√3" },
          { num: "Q3b", ans: "36√3 ≈ 62,35 cm²", note: "A = ½ × 12 × 6√3 = 36√3" },
        ]
      },
      {
        "name": "Pythagoras in shapes",
        "answers": [
          {
            "num": "Q4a",
            "ans": "AB = 10 cm ; BC = √320 ≈ 17,89 cm",
            "note": "AB² = 36 + 64; BC² = 256 + 64"
          },
          {
            "num": "Q4b",
            "ans": "Yes: 11² + 60² = 121 + 3 600 = 3 721 = 61²",
            "note": "Converse of Pythagoras"
          }
        ]
      },
    ]
  }
});
