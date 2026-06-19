// Math Magician � Grade 9, Chapter 14 data
// Area and Perimeter

MathMagician.registerChapter(14, {
  topics: [
    {
      id: 27,
      chapter: 14,
      name: "Perimeter",
      fullName: "Perimeter of 2D shapes",
      lesson: {
        heading: "Perimeter of 2D shapes",
        sub: "Chapter 14 � Topic 1",
        body: `
          <p><strong>Perimeter</strong> is the total length of the boundary of a 2D shape.</p>
          <div class="def-box">
            <div class="def-box-title">?? Perimeter formulas</div>
            <p>
              <strong>Rectangle:</strong> P = 2(l + b)<br>
              <strong>Square:</strong> P = 4s<br>
              <strong>Triangle:</strong> P = a + b + c<br>
              <strong>Circle (circumference):</strong> C = 2pr = pd<br>
              <strong>Semicircle:</strong> P = pr + 2r (arc + diameter)<br>
              <strong>Composite shapes:</strong> add only the exposed outer edges.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Rectangle 8 cm � 5 cm: P = 2(8 + 5) = 26 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Circle radius 7 cm: C = 2p(7) � 43,98 cm</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Semicircle radius 6 cm: P = p(6) + 2(6) = 6p + 12 � 30,85 cm</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>Perimeter is measured in linear units (cm, m), while area is in square units (cm�, m�). Don't mix them up.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Perimeter Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Choose a shape and enter its dimensions to find the perimeter. See the formula used.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Shape</label>
                <select id="periShape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="rect">Rectangle</option>
                  <option value="sq">Square</option>
                  <option value="tri">Triangle (3 sides)</option>
                  <option value="circle">Circle</option>
                  <option value="trap">Trapezium</option>
                </select>
              </div>
              <div id="periInputs" style="display:flex;gap:8px;flex-wrap:wrap;"></div>
              <button id="periBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="periOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var shapes={
              rect:{labels:['Length (l)','Width (w)'],defaults:[10,6],formula:'P = 2(l + w)',calc:function(v){return 2*(v[0]+v[1]);}},
              sq:{labels:['Side (s)'],defaults:[8],formula:'P = 4s',calc:function(v){return 4*v[0];}},
              tri:{labels:['Side a','Side b','Side c'],defaults:[5,7,9],formula:'P = a + b + c',calc:function(v){return v[0]+v[1]+v[2];}},
              circle:{labels:['Radius (r)'],defaults:[7],formula:'C = 2pr',calc:function(v){return 2*Math.PI*v[0];}},
              trap:{labels:['Side a','Side b','Leg c','Leg d'],defaults:[12,8,5,5],formula:'P = a + b + c + d',calc:function(v){return v[0]+v[1]+v[2]+v[3];}},
            };
            function setShape(){
              var key=document.getElementById('periShape').value;
              var s=shapes[key];
              var html=s.labels.map(function(lbl,i){
                return '<div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">'+lbl+'</label><input class="periVal" type="number" value="'+s.defaults[i]+'" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>';
              }).join('');
              document.getElementById('periInputs').innerHTML=html;
            }
            function calc(){
              var key=document.getElementById('periShape').value;
              var s=shapes[key];
              var vals=Array.from(document.querySelectorAll('.periVal')).map(function(el){return parseFloat(el.value)||0;});
              var p=s.calc(vals);
              var isCircle=key==='circle';
              document.getElementById('periOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Formula: </span><span style="color:#fbbf24;">'+s.formula+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">'+(isCircle?'Circumference':'Perimeter')+': </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+(isCircle?p.toFixed(4):p)+'</span> <span style="color:rgba(221,225,240,0.35);">units</span></div>',
              ].join('');
            }
            document.getElementById('periShape').addEventListener('change',function(){setShape();});
            document.getElementById('periBtn').addEventListener('click',calc);
            setShape();
          })();
          </script>
        only the outer boundary counts.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the perimeter of a rectangle with length 11 cm and breadth 7 cm.", answer: "36", topic: "Perimeter" },
        { type: "mc", text: "Find the circumference of a circle with diameter 10 cm. (Use p � 3,14)", options: ["31,4 cm", "15,7 cm", "62,8 cm", "78,5 cm"], answer: 0, topic: "Perimeter" },
        { type: "input", text: "A square has perimeter 52 cm. Find the side length.", answer: "13", topic: "Perimeter" },
        { type: "mc", text: "The perimeter of a semicircle with radius 5 cm is approximately:", options: ["15,7 cm", "25,7 cm", "10 cm", "20 cm"], answer: 1, topic: "Perimeter" },
        { type: "input", text: "A triangle has sides 13 cm, 14 cm and 15 cm. What is the perimeter?", answer: "42", topic: "Perimeter" },
      ]
    },
    {
      id: 28,
      chapter: 14,
      name: "Area",
      fullName: "Area of 2D shapes",
      lesson: {
        heading: "Area of 2D shapes",
        sub: "Chapter 14 � Topic 2",
        body: `
          <p><strong>Area</strong> measures the surface enclosed by a 2D shape, measured in square units (cm�, m�, etc.).</p>
          <div class="def-box">
            <div class="def-box-title">?? Area formulas</div>
            <p>
              <strong>Rectangle:</strong> A = l � b<br>
              <strong>Square:</strong> A = s�<br>
              <strong>Triangle:</strong> A = � � base � height<br>
              <strong>Parallelogram:</strong> A = base � height (perpendicular height!)<br>
              <strong>Trapezium:</strong> A = �(a + b) � h (a, b = parallel sides)<br>
              <strong>Circle:</strong> A = pr�<br>
              <strong>Rhombus:</strong> A = � � d1 � d2 (d1, d2 = diagonals)
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Triangle base = 10, height = 6: A = � � 10 � 6 = 30 cm�</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Trapezium a = 8, b = 12, h = 5: A = �(8+12) � 5 = 50 cm�</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Circle r = 9: A = p(81) � 254,47 cm�</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Composite: rectangle + semicircle = lw + �pr�</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>The height of a parallelogram/triangle is PERPENDICULAR to the base � 
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Area & Perimeter Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Select a shape and enter dimensions. Area and perimeter are instant.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <select id="areaShape2" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="rect">Rectangle</option>
                <option value="tri">Triangle</option>
                <option value="circ">Circle</option>
                <option value="trap">Trapezium</option>
                <option value="para">Parallelogram</option>
              </select>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="areaL12">Length</label><input id="areaV12" type="number" value="8" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="areaL22">Width</label><input id="areaV22" type="number" value="5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="areaL32">Extra</label><input id="areaV32" type="number" value="" placeholder="\u2014" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="areaBtn2" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="areaOut2" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var PI=Math.PI;function f(v){return Math.round(v*100)/100;}
            function setL(){var s=document.getElementById('areaShape2').value;var lbl={rect:['Length','Width',''],tri:['Base','Height',''],circ:['Radius','',''],trap:['Base a','Height','Base b'],para:['Base','Height','']};var l=lbl[s];document.getElementById('areaL12').textContent=l[0];document.getElementById('areaL22').textContent=l[1];document.getElementById('areaL32').textContent=l[2]||'Extra';document.getElementById('areaV22').disabled=(s==='circ');document.getElementById('areaV32').disabled=(s!=='trap');}
            function calc(){
              var s=document.getElementById('areaShape2').value;
              var v1=parseFloat(document.getElementById('areaV12').value)||0;
              var v2=parseFloat(document.getElementById('areaV22').value)||0;
              var v3=parseFloat(document.getElementById('areaV32').value);
              var A,line1,line2;
              if(s==='rect'){A=v1*v2;line1='A = '+v1+' \xd7 '+v2+' = '+f(A)+' sq units';line2='P = 2('+v1+'+'+v2+') = '+f(2*(v1+v2))+' units';}
              else if(s==='tri'){A=0.5*v1*v2;line1='A = \xbd\xd7'+v1+'\xd7'+v2+' = '+f(A)+' sq units';line2='';}
              else if(s==='circ'){A=PI*v1*v1;line1='A = \u03c0r\xb2 = \u03c0\xd7'+v1+'\xb2 = '+f(A)+' sq units';line2='C = 2\u03c0r = '+f(2*PI*v1)+' units';}
              else if(s==='trap'){var b2=isNaN(v3)?v2:v3;A=0.5*(v1+b2)*v2;line1='A = \xbd('+v1+'+'+b2+')\xd7'+v2+' = '+f(A)+' sq units';line2='';}
              else{A=v1*v2;line1='A = base\xd7h = '+v1+'\xd7'+v2+' = '+f(A)+' sq units';line2='';}
              document.getElementById('areaOut2').innerHTML='<div style="color:rgba(221,225,240,0.60);">'+line1+'</div>'+(line2?'<div style="color:rgba(221,225,240,0.60);">'+line2+'</div>':'')+'<div><span style="color:#6ee7b7;font-size:15px;font-weight:700;">A = '+f(A)+'</span></div>';
            }
            document.getElementById('areaShape2').addEventListener('change',function(){setL();});
            document.getElementById('areaBtn2').addEventListener('click',calc);
            ['areaV12','areaV22','areaV32'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});
            setL();
          })();
          </script>
        not the slant side.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the area of a triangle with base 16 cm and perpendicular height 9 cm.", answer: "72", topic: "Area" },
        { type: "mc", text: "Find the area of a trapezium with parallel sides 7 cm and 11 cm, height 4 cm.", options: ["36 cm�", "72 cm�", "44 cm�", "38 cm�"], answer: 0, topic: "Area" },
        { type: "input", text: "Find the area of a circle with radius 6 cm. (Use p � 3,14; give to nearest whole number)", answer: "113", topic: "Area" },
        { type: "mc", text: "A rhombus has diagonals 12 cm and 16 cm. Its area is:", options: ["192 cm�", "96 cm�", "48 cm�", "72 cm�"], answer: 1, topic: "Area" },
        { type: "input", text: "A rectangle is 14 cm � 9 cm. A circle of diameter 6 cm is cut from it. Find the remaining area. (Use p � 3,14)", answer: "98", topic: "Area" },
      ]
    },
  ],
  workbook: {
    chapter: 14, chapterName: "Area and Perimeter",
    topics: [
      {
        name: "Perimeter",
        questions: [
          {
            num: "1",
            text: "Calculate the perimeter of each shape. (Use p = 3,14 where needed)",
            parts: [
              { label: "a)", text: "A regular hexagon with side 8 cm.", marks: 2 },
              { label: "b)", text: "A circle with radius 9 cm.", marks: 3 },
              { label: "c)", text: "A shape consisting of a rectangle (10 cm � 6 cm) with a semicircle on one of the shorter ends (replacing that side).", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Area",
        questions: [
          {
            num: "2",
            text: "Calculate the area of each shape. (Use p = 3,14 where needed)",
            parts: [
              { label: "a)", text: "Parallelogram: base = 15 cm, perpendicular height = 8 cm.", marks: 2 },
              { label: "b)", text: "Trapezium: parallel sides = 9 cm and 15 cm, height = 7 cm.", marks: 3 },
              { label: "c)", text: "Composite shape: a square of side 12 cm with a circular hole of diameter 6 cm cut from its centre.", marks: 4 },
            ]
          },
          {
            num: "3",
            text: "A garden is in the shape of a rectangle (20 m � 12 m) with a semicircular fountain area (diameter 8 m) cut from one end.",
            parts: [
              { label: "a)", text: "Find the area available for planting (excluding the fountain).", marks: 4 },
              { label: "b)", text: "Lawn seed costs R 15 per m�. Find the total cost.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 14, chapterName: "Chapter 14 � Area and Perimeter",
    topics: [
      {
        name: "Perimeter",
        answers: [
          { num: "Q1a", ans: "48 cm", note: "6 � 8 = 48" },
          { num: "Q1b", ans: "56,52 cm", note: "2 � 3,14 � 9 = 56,52" },
          { num: "Q1c", ans: "P = 10 + 6 + 10 + pr = 26 + 3,14�3 � 35,42 cm", note: "Two long sides + one short side + semicircle arc (r=3)" },
        ]
      },
      {
        name: "Area",
        answers: [
          { num: "Q2a", ans: "120 cm�", note: "15 � 8 = 120" },
          { num: "Q2b", ans: "84 cm�", note: "�(9+15)�7 = ��24�7 = 84" },
          { num: "Q2c", ans: "115,74 cm�", note: "12�-p�3� = 144-28,26 = 115,74" },
          { num: "Q3a", ans: "214,88 m²", note: "20×12 − ½×π×4² = 240 − 25,12 = 214,88 m²" },
          //REMOVED_OLD_Q3a_START{"215,12 m�", note: "20�12 - ��p�4� = 240 - 25,12 = 214,88 � 214,88 m�" },
          { num: "Q3b", ans: "� R 3 223,20", note: "214,88 � 15 = 3 223,20" },
        ]
      },
    ]
  }
});
