// Math Magician � Grade 9, Chapter 13 data
// Pythagoras' Theorem

MathMagician.registerChapter(13, {
  topics: [
    {
      id: 25,
      chapter: 13,
      name: "Pythagoras' theorem",
      fullName: "Pythagoras' theorem � finding sides",
      lesson: {
        heading: "Pythagoras' theorem",
        sub: "Chapter 13 � Topic 1",
        body: `
          <p><strong>Pythagoras' theorem</strong> states that in any right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.</p>
          <div class="def-box">
            <div class="def-box-title">?? The theorem</div>
            <p>
              In ?ABC with right angle at C:<br>
              <span class="math">c� = a� + b�</span><br>
              where c is the hypotenuse (side opposite the right angle).<br><br>
              <strong>To find hypotenuse:</strong> <span class="math">c = v(a� + b�)</span><br>
              <strong>To find a shorter side:</strong> <span class="math">a = v(c� - b�)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>a = 6, b = 8: c = v(36 + 64) = v100 = 10</span></div>
            <div class="example-step"><span class="step-num">2</span><span>c = 13, b = 5: a = v(169 - 25) = v144 = 12</span></div>
            <div class="example-step"><span class="step-num">3</span><span>a = 7, b = 11: c = v(49 + 121) = v170 � 13,04</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Pythagorean triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25) � memorise these!</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>Always identify the hypotenuse first � it's 
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Pythagoras Solver</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Leave one field blank. Enter any two sides and the third is calculated.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Side a</label><input id="pyA" type="number" placeholder="\u2014" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Side b</label><input id="pyB" type="number" placeholder="\u2014" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Hypotenuse c</label><input id="pyC" type="number" placeholder="\u2014" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
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
              if(isNaN(c)){res=Math.sqrt(a*a+b*b);step1='c\xb2 = '+a+'\xb2 + '+b+'\xb2 = '+(a*a+b*b);step2='c = \u221a'+(a*a+b*b)+' = '+f(res);document.getElementById('pyC').value=f(res);}
              else if(isNaN(b)){res=Math.sqrt(c*c-a*a);step1='b\xb2 = '+c+'\xb2 \u2212 '+a+'\xb2 = '+(c*c-a*a);step2='b = \u221a'+(c*c-a*a)+' = '+f(res);document.getElementById('pyB').value=f(res);}
              else{res=Math.sqrt(c*c-b*b);step1='a\xb2 = '+c+'\xb2 \u2212 '+b+'\xb2 = '+(c*c-b*b);step2='a = \u221a'+(c*c-b*b)+' = '+f(res);document.getElementById('pyA').value=f(res);}
              el.innerHTML='<div style="color:rgba(221,225,240,0.60);">'+step1+'</div><div><strong style="color:#6ee7b7;">'+step2+'</strong></div>';
            }
            document.getElementById('pyBtn').addEventListener('click',solve);
            ['pyA','pyB','pyC'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')solve();});});
          })();
          </script>
        always opposite the right angle and always the longest side.</span></div>
        `
      },
      questions: [
        { type: "input", text: "In a right triangle, legs are 9 cm and 12 cm. Find the hypotenuse.", answer: "15", topic: "Pythagoras" },
        { type: "mc", text: "The hypotenuse is 17 cm and one leg is 8 cm. The other leg is:", options: ["9 cm", "15 cm", "v225 = 15 cm", "v353 cm"], answer: 1, topic: "Pythagoras" },
        { type: "input", text: "Calculate: v(5� + 12�)", answer: "13", topic: "Pythagoras" },
        { type: "mc", text: "Is a triangle with sides 9, 40, 41 a right triangle?", options: ["Yes", "No", "Cannot determine", "Only if angles given"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "A ladder 10 m long leans against a wall. The foot is 6 m from the wall. How high up the wall does it reach?", answer: "8", topic: "Pythagoras" },
      ]
    },
    {
      id: 26,
      chapter: 13,
      name: "Applications of Pythagoras",
      fullName: "Applications of Pythagoras' theorem",
      lesson: {
        heading: "Applications of Pythagoras' theorem",
        sub: "Chapter 13 � Topic 2",
        body: `
          <p>Pythagoras' theorem applies in many real-world contexts and in more complex geometric problems.</p>
          <div class="def-box">
            <div class="def-box-title">?? Common applications</div>
            <p>
              <strong>Diagonal of a rectangle:</strong> d = v(l� + b�)<br>
              <strong>Height of isosceles triangle:</strong> split into two right triangles<br>
              <strong>Distance between two points:</strong> d = v[(x2-x1)� + (y2-y1)�]<br>
              <strong>Converse (testing for right angle):</strong> if a� + b� = c�, the triangle is right-angled.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Diagonal of 5 cm � 12 cm rectangle: d = v(25 + 144) = v169 = 13 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Isosceles triangle: base = 16 cm, equal sides = 10 cm. Height: h = v(10� - 8�) = v(100 - 64) = v36 = 6 cm</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Distance: A(1;2) to B(4;6): d = v(9+16) = v25 = 5 units</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>In isosceles triangle problems, 
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Pythagoras Solver</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Leave one field blank. Enter any two sides and the third is calculated.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Side a</label><input id="pyA2" type="number" placeholder="\u2014" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Side b</label><input id="pyB2" type="number" placeholder="\u2014" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Hypotenuse c</label><input id="pyC2" type="number" placeholder="\u2014" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
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
              if(isNaN(c)){res=Math.sqrt(a*a+b*b);step1='c\xb2 = '+a+'\xb2 + '+b+'\xb2 = '+(a*a+b*b);step2='c = \u221a'+(a*a+b*b)+' = '+f(res);document.getElementById('pyC2').value=f(res);}
              else if(isNaN(b)){res=Math.sqrt(c*c-a*a);step1='b\xb2 = '+c+'\xb2 \u2212 '+a+'\xb2 = '+(c*c-a*a);step2='b = \u221a'+(c*c-a*a)+' = '+f(res);document.getElementById('pyB2').value=f(res);}
              else{res=Math.sqrt(c*c-b*b);step1='a\xb2 = '+c+'\xb2 \u2212 '+b+'\xb2 = '+(c*c-b*b);step2='a = \u221a'+(c*c-b*b)+' = '+f(res);document.getElementById('pyA2').value=f(res);}
              el.innerHTML='<div style="color:rgba(221,225,240,0.60);">'+step1+'</div><div><strong style="color:#6ee7b7;">'+step2+'</strong></div>';
            }
            document.getElementById('pyBtn2').addEventListener('click',solve);
            ['pyA2','pyB2','pyC2'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')solve();});});
          })();
          </script>
        the altitude from the apex bisects the base, creating two identical right triangles.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the diagonal of a rectangle with length 24 cm and width 7 cm.", answer: "25", topic: "Pythagoras" },
        { type: "mc", text: "An isosceles triangle has equal sides of 13 cm and a base of 10 cm. Its height is:", options: ["12 cm", "8 cm", "10 cm", "v119 cm"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "Find the distance between points (0;0) and (3;4).", answer: "5", topic: "Pythagoras" },
        { type: "mc", text: "A triangle has sides 7, 24, 25. Is it right-angled?", options: ["Yes, 7�+24�=625=25�", "No", "Yes, 7+24=25", "Cannot tell"], answer: 0, topic: "Pythagoras" },
        { type: "input", text: "A square has diagonal 10v2 cm. Find the side length of the square.", answer: "10", topic: "Pythagoras" },
      ]
    },
  ],
  workbook: {
    chapter: 13, chapterName: "Pythagoras' Theorem",
    topics: [
      {
        name: "Pythagoras � Finding Sides",
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
    ]
  },
  answerKey: {
    chapter: 13, chapterName: "Chapter 13 � Pythagoras' Theorem",
    topics: [
      {
        name: "Pythagoras � Finding Sides",
        answers: [
          { num: "Q1a", ans: "25 cm", note: "v(225+400) = v625 = 25" },
          { num: "Q1b", ans: "24 cm", note: "v(676-100) = v576 = 24" },
          { num: "Q1c", ans: "v130 cm � 11,4 cm", note: "v(49+81) = v130" },
        ]
      },
      {
        name: "Applications",
        answers: [
          { num: "Q2a", ans: "34 m", note: "v(900+256) = v1156 = 34" },
          { num: "Q2b", ans: "17 m", note: "Half of 34 m" },
          { num: "Q3a", ans: "6v3 � 10,39 cm", note: "h = v(12� - 6�) = v(144-36) = v108 = 6v3" },
          { num: "Q3b", ans: "36v3 � 62,35 cm�", note: "A = � � 12 � 6v3 = 36v3" },
        ]
      },
    ]
  }
});
