// Math Magician � Grade 9, Chapter 16 data
// Transformation Geometry

MathMagician.registerChapter(16, {
  topics: [
    {
      id: 31,
      chapter: 16,
      name: "Translations and reflections",
      fullName: "Translations and reflections on the Cartesian plane",
      lesson: {
        heading: "Translations and reflections",
        sub: "Chapter 16 � Topic 1",
        body: `
          <p>Transformations move or change shapes on the Cartesian plane. The original shape is the <strong>object</strong>; the result is the <strong>image</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">?? Translation</div>
            <p>
              A translation slides a shape without rotating or reflecting it.<br>
              <strong>Rule:</strong> (x; y) ? (x + a; y + b)<br>
              where a = horizontal shift (+ = right, - = left)<br>
              and b = vertical shift (+ = up, - = down)<br><br>
              <strong>Note:</strong> shape, size and orientation are preserved.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">?? Reflection</div>
            <p>
              A reflection flips a shape over a <strong>mirror line</strong>.<br>
              <strong>x-axis:</strong> (x; y) ? (x; -y)<br>
              <strong>y-axis:</strong> (x; y) ? (-x; y)<br>
              <strong>y = x:</strong> (x; y) ? (y; x)<br>
              <strong>y = -x:</strong> (x; y) ? (-y; -x)
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>A translation does NOT change the size or shape � only the position. All points move the same distance in the same direction.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Translation &amp; Reflection Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter a point, choose a transformation, and see the image coordinates. The Cartesian plane updates live.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);">Transformation</label>
                <select id="tfType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="trans">Translate by (a; b)</option>
                  <option value="refX">Reflect in x-axis</option>
                  <option value="refY">Reflect in y-axis</option>
                  <option value="refYX">Reflect in y = x</option>
                  <option value="refYnX">Reflect in y = &minus;x</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Point x</label><input id="tfX" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Point y</label><input id="tfY" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div id="tfABdiv" style="display:flex;gap:8px;">
                <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a</label><input id="tfA" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
                <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">b</label><input id="tfB" type="number" value="-1" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              </div>
            </div>
            <svg id="tfSvg" viewBox="0 0 240 240" style="width:240px;height:240px;border-radius:8px;background:rgba(10,15,30,0.60);margin-bottom:10px;"></svg>
            <div id="tfOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function setType(){var t=document.getElementById('tfType').value;document.getElementById('tfABdiv').style.display=(t==='trans')?'flex':'none';}
            document.getElementById('tfType').addEventListener('change',function(){setType();transform();});
            function transform(){
              var t=document.getElementById('tfType').value;
              var x=parseFloat(document.getElementById('tfX').value)||0;
              var y=parseFloat(document.getElementById('tfY').value)||0;
              var a=parseFloat(document.getElementById('tfA').value)||0;
              var b=parseFloat(document.getElementById('tfB').value)||0;
              var ix,iy,rule,label;
              if(t==='trans'){ix=x+a;iy=y+b;rule='(x; y) ? (x+'+a+'; y+'+b+')';label='Translation by ('+a+'; '+b+')';}
              else if(t==='refX'){ix=x;iy=-y;rule='(x; y) ? (x; -y)';label='Reflection in x-axis';}
              else if(t==='refY'){ix=-x;iy=y;rule='(x; y) ? (-x; y)';label='Reflection in y-axis';}
              else if(t==='refYX'){ix=y;iy=x;rule='(x; y) ? (y; x)';label='Reflection in y = x';}
              else{ix=-y;iy=-x;rule='(x; y) ? (-y; -x)';label='Reflection in y = -x';}
              // Draw grid
              var W=240,cx=120,cy=120,scale=20;
              var grid='';
              for(var v=-5;v<=5;v++){
                var gx=cx+v*scale,gy=cy-v*scale;
                grid+='<line x1="'+gx+'" y1="0" x2="'+gx+'" y2="'+W+'" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>';
                grid+='<line x1="0" y1="'+gy+'" x2="'+W+'" y2="'+gy+'" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>';
              }
              grid+='<line x1="0" y1="'+cy+'" x2="'+W+'" y2="'+cy+'" stroke="rgba(255,255,255,0.20)" stroke-width="1.2"/>';
              grid+='<line x1="'+cx+'" y1="0" x2="'+cx+'" y2="'+W+'" stroke="rgba(255,255,255,0.20)" stroke-width="1.2"/>';
              var px=cx+x*scale,py=cy-y*scale;
              var px2=cx+ix*scale,py2=cy-iy*scale;
              grid+='<line x1="'+px+'" y1="'+py+'" x2="'+px2+'" y2="'+py2+'" stroke="rgba(245,158,11,0.40)" stroke-width="1" stroke-dasharray="4,3"/>';
              grid+='<circle cx="'+px+'" cy="'+py+'" r="6" fill="#fbbf24"/>';
              grid+='<text x="'+(px+8)+'" y="'+(py-6)+'" font-size="9" fill="#fbbf24" font-family="JetBrains Mono,monospace">P('+x+';'+y+')</text>';
              grid+='<circle cx="'+px2+'" cy="'+py2+'" r="6" fill="#6ee7b7"/>';
              grid+='<text x="'+(px2+8)+'" y="'+(py2-6)+'" font-size="9" fill="#6ee7b7" font-family="JetBrains Mono,monospace">P'('+ix+';'+iy+')</text>';
              document.getElementById('tfSvg').innerHTML=grid;
              document.getElementById('tfOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Transformation: </span><span style="color:#fbbf24;">'+label+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Rule: </span><span style="color:#a5b4fc;">'+rule+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Original: </span><span style="color:#fbbf24;font-weight:700;">P('+x+'; '+y+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Image: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">P'('+ix+'; '+iy+')</span></div>',
              ].join('');
            }
            ['tfType','tfX','tfY','tfA','tfB'].forEach(function(id){
              var el=document.getElementById(id);
              el.addEventListener('input',transform);el.addEventListener('change',transform);
            });
            setType();transform();
          })();
          </script>
        distinguishes object from image.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Point (3; -2) is translated by (-4; 5). The image is:", options: ["(-1; 3)", "(7; 3)", "(-1; -7)", "(7; -7)"], answer: 0, topic: "Transformations" },
        { type: "mc", text: "Point (5; 3) reflected in the x-axis gives:", options: ["(-5; 3)", "(5; -3)", "(-5; -3)", "(3; 5)"], answer: 1, topic: "Transformations" },
        { type: "mc", text: "Point (-2; 4) reflected in the y-axis gives:", options: ["(2; 4)", "(-2; -4)", "(4; -2)", "(-4; 2)"], answer: 0, topic: "Transformations" },
        { type: "mc", text: "Reflecting (3; 7) over the line y = x gives:", options: ["(3; 7)", "(-3; -7)", "(7; 3)", "(-7; -3)"], answer: 2, topic: "Transformations" },
        { type: "input", text: "Point A(-1; 4) is translated 3 right and 2 down. What is the x-coordinate of A'?", answer: "2", topic: "Transformations" },
      ]
    },
    {
      id: 32,
      chapter: 16,
      name: "Rotations and enlargements",
      fullName: "Rotations and enlargements",
      lesson: {
        heading: "Rotations and enlargements",
        sub: "Chapter 16 � Topic 2",
        body: `
          <p><strong>Rotations</strong> turn a shape about a fixed point (centre of rotation). <strong>Enlargements</strong> scale a shape by a scale factor.</p>
          <div class="def-box">
            <div class="def-box-title">?? Rotation about the origin</div>
            <p>
              <strong>90� anticlockwise:</strong> (x; y) ? (-y; x)<br>
              <strong>90� clockwise:</strong> (x; y) ? (y; -x)<br>
              <strong>180�:</strong> (x; y) ? (-x; -y)<br><br>
              Rotation preserves shape and size but changes orientation.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">?? Enlargement (dilation)</div>
            <p>
              <strong>Centre at origin, scale factor k:</strong> (x; y) ? (kx; ky)<br><br>
              If k > 1: enlargement (bigger)<br>
              If 0 < k < 1: reduction (smaller)<br>
              If k < 0: enlargement with reflection<br><br>
              <strong>Effect on area:</strong> multiplied by k�<br>
              <strong>Effect on perimeter:</strong> multiplied by k
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>For enlargement by factor k from the origin: 
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Transformation Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter a point and pick a transformation. See the image and the rule used.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">x</label><input id="txX2" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">y</label><input id="txY2" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Transformation</label>
                <select id="txType2" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="refX">Reflect x-axis</option>
                  <option value="refY">Reflect y-axis</option>
                  <option value="refYX">Reflect y = x</option>
                  <option value="refYNX">Reflect y = \u2212x</option>
                  <option value="rot90a">Rotate 90\xb0 anti-CW</option>
                  <option value="rot90c">Rotate 90\xb0 CW</option>
                  <option value="rot180">Rotate 180\xb0</option>
                  <option value="enlarge">Enlarge (scale k)</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">k</label><input id="txK2" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="txBtn2" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Transform</button>
            </div>
            <div id="txOut2" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var rules={refX:'(x;y)\u2192(x;\u2212y)',refY:'(x;y)\u2192(\u2212x;y)',refYX:'(x;y)\u2192(y;x)',refYNX:'(x;y)\u2192(\u2212y;\u2212x)',rot90a:'(x;y)\u2192(\u2212y;x)',rot90c:'(x;y)\u2192(y;\u2212x)',rot180:'(x;y)\u2192(\u2212x;\u2212y)',enlarge:'(x;y)\u2192(kx;ky)'};
            function tx(){
              var x=parseFloat(document.getElementById('txX2').value)||0,y=parseFloat(document.getElementById('txY2').value)||0;
              var t=document.getElementById('txType2').value,k=parseFloat(document.getElementById('txK2').value)||1;
              var ix,iy;
              if(t==='refX'){ix=x;iy=-y;}else if(t==='refY'){ix=-x;iy=y;}else if(t==='refYX'){ix=y;iy=x;}else if(t==='refYNX'){ix=-y;iy=-x;}else if(t==='rot90a'){ix=-y;iy=x;}else if(t==='rot90c'){ix=y;iy=-x;}else if(t==='rot180'){ix=-x;iy=-y;}else{ix=k*x;iy=k*y;}
              document.getElementById('txOut2').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Object:</span><span style="color:#a5b4fc;"> ('+x+' ; '+y+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Rule:</span><span style="color:#fbbf24;"> '+rules[t].replace('k',k)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Image:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;"> ('+ix+' ; '+iy+')</span></div>',
              ].join('');
            }
            document.getElementById('txBtn2').addEventListener('click',tx);
            ['txX','txY','txK'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')tx();});});
            tx();
          })();
          </script>
        each point moves along its line through the origin, k times further away.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Rotating (4; -3) by 90� anticlockwise about the origin gives:", options: ["(3; 4)", "(-3; -4)", "(-4; 3)", "(3; -4)"], answer: 0, topic: "Transformations" },
        { type: "mc", text: "Rotating (2; 5) by 180� about the origin gives:", options: ["(5; 2)", "(-2; 5)", "(-2; -5)", "(5; -2)"], answer: 2, topic: "Transformations" },
        { type: "mc", text: "Enlarging (3; -4) by scale factor 2 from the origin gives:", options: ["(6; -8)", "(1,5; -2)", "(5; -6)", "(6; 4)"], answer: 0, topic: "Transformations" },
        { type: "input", text: "If a triangle of area 9 cm� is enlarged by scale factor 3, what is the area of the image?", answer: "81", topic: "Transformations" },
        { type: "mc", text: "Reducing a shape by scale factor 0,5 multiplies its perimeter by:", options: ["0,25", "0,5", "2", "4"], answer: 1, topic: "Transformations" },
      ]
    },
  ],
  workbook: {
    chapter: 16, chapterName: "Transformation Geometry",
    topics: [
      {
        name: "Translations and Reflections",
        questions: [
          {
            num: "1",
            text: "Triangle ABC has vertices A(1; 2), B(4; 2) and C(4; 5).",
            parts: [
              { label: "a)", text: "Translate the triangle 3 units left and 4 units down. Write the coordinates of A', B' and C'.", marks: 3 },
              { label: "b)", text: "Reflect the original triangle in the x-axis. Write the new coordinates.", marks: 3 },
              { label: "c)", text: "Reflect the original triangle in the y-axis. Write the new coordinates.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Rotations and Enlargements",
        questions: [
          {
            num: "2",
            text: "Using the same triangle ABC from Question 1 (A(1;2), B(4;2), C(4;5)):",
            parts: [
              { label: "a)", text: "Rotate the triangle 90� anticlockwise about the origin. Write all new coordinates.", marks: 3 },
              { label: "b)", text: "Rotate the original triangle 180� about the origin.", marks: 3 },
              { label: "c)", text: "Enlarge the original triangle from the origin with scale factor 2. Write new coordinates.", marks: 3 },
              { label: "d)", text: "What is the area of the original triangle? What is the area after the enlargement in (c)?", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 16, chapterName: "Chapter 16 � Transformation Geometry",
    topics: [
      {
        name: "Translations and Reflections",
        answers: [
          { num: "Q1a", ans: "A'(-2;-2), B'(1;-2), C'(1;1)", note: "-3 to x, -4 to y" },
          { num: "Q1b", ans: "A'(1;-2), B'(4;-2), C'(4;-5)", note: "y-coordinates negated" },
          { num: "Q1c", ans: "A'(-1;2), B'(-4;2), C'(-4;5)", note: "x-coordinates negated" },
        ]
      },
      {
        name: "Rotations and Enlargements",
        answers: [
          { num: "Q2a", ans: "A'(-2;1), B'(-2;4), C'(-5;4)", note: "(x;y)?(-y;x): A:(-2;1), B:(-2;4), C:(-5;4)" },
          { num: "Q2b", ans: "A'(-1;-2), B'(-4;-2), C'(-4;-5)", note: "negate both coordinates" },
          { num: "Q2c", ans: "A'(2;4), B'(8;4), C'(8;10)", note: "multiply all coords by 2" },
          { num: "Q2d", ans: "Original: 4,5 cm�; enlarged: 18 cm�", note: "base=3, height=3: A=��3�3=4,5; enlarged by k�=4: 4�4,5=18" },
        ]
      },
    ]
  }
});
