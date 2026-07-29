// Math Magician — Grade 8, Chapter 18 data
// Transformation Geometry

MathMagician.registerChapter(18, {
  topics: [
    {
      id: 1801,
      chapter: 18,
      name: "Translations and reflections",
      fullName: "Translations and reflections on a grid",
      lesson: {
        heading: "Translations and reflections",
        sub: "Chapter 18 · Topic 1",
        body: `
          <p>A <strong>transformation</strong> moves a shape to a new position. The original shape is called the <strong>object</strong> and the moved shape is the <strong>image</strong>. In this chapter we look at four transformations: translations, reflections, rotations and enlargements.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Translation</div>
            <p>
              A <strong>translation</strong> slides a shape in a straight direction — left/right and/or up/down — without turning or flipping it.<br><br>
              We describe a translation in words, e.g. <em>"3 units right and 2 units down"</em>, or on the Cartesian plane using coordinates:<br>
              <span class="math">(x ; y) → (x + a ; y + b)</span><br>
              where <strong>a</strong> is the horizontal shift (+ = right, − = left) and <strong>b</strong> is the vertical shift (+ = up, − = down).<br><br>
              A translation keeps the shape, size and orientation exactly the same — only the position changes.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Reflection</div>
            <p>
              A <strong>reflection</strong> flips a shape over a <strong>mirror line</strong> (also called a line of symmetry). The image is a mirror image of the object — the same distance from the line, on the opposite side.<br><br>
              <strong>Reflection in the x-axis:</strong> <span class="math">(x ; y) → (x ; −y)</span><br>
              <strong>Reflection in the y-axis:</strong> <span class="math">(x ; y) → (−x ; y)</span><br><br>
              A reflection keeps the shape and size the same, but the orientation is "flipped" (like a mirror).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Point A(2 ; 3) is translated 4 units left and 1 unit down. New point: <span class="math">(2 − 4 ; 3 − 1) = (−2 ; 2)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Point B(5 ; 1) is reflected in the x-axis: <span class="math">(5 ; 1) → (5 ; −1)</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Point C(−3 ; 4) is reflected in the y-axis: <span class="math">(−3 ; 4) → (3 ; 4)</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Quick check: after a translation or reflection, the image is always <strong>congruent</strong> (same size and shape) to the object — only its position or orientation changes.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Translation &amp; Reflection Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter a point, choose a transformation, and watch the image appear on the grid.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);">Transformation</label>
                <select id="g8tfType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="trans">Translate by (a ; b)</option>
                  <option value="refX">Reflect in x-axis</option>
                  <option value="refY">Reflect in y-axis</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Point x</label><input id="g8tfX" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Point y</label><input id="g8tfY" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div id="g8tfABdiv" style="display:flex;gap:8px;">
                <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a</label><input id="g8tfA" type="number" value="-3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
                <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">b</label><input id="g8tfB" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              </div>
            </div>
            <svg id="g8tfSvg" viewBox="0 0 240 240" style="width:240px;height:240px;border-radius:8px;background:rgba(10,15,30,0.60);margin-bottom:10px;"></svg>
            <div id="g8tfOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function setType(){var t=document.getElementById('g8tfType').value;document.getElementById('g8tfABdiv').style.display=(t==='trans')?'flex':'none';}
            document.getElementById('g8tfType').addEventListener('change',function(){setType();transform();});
            function transform(){
              var t=document.getElementById('g8tfType').value;
              var x=parseFloat(document.getElementById('g8tfX').value)||0;
              var y=parseFloat(document.getElementById('g8tfY').value)||0;
              var a=parseFloat(document.getElementById('g8tfA').value)||0;
              var b=parseFloat(document.getElementById('g8tfB').value)||0;
              var ix,iy,rule,label;
              if(t==='trans'){ix=x+a;iy=y+b;rule='(x ; y) → (x'+(a>=0?'+':'')+a+' ; y'+(b>=0?'+':'')+b+')';label='Translation by ('+a+' ; '+b+')';}
              else if(t==='refX'){ix=x;iy=-y;rule='(x ; y) → (x ; -y)';label='Reflection in the x-axis';}
              else{ix=-x;iy=y;rule='(x ; y) → (-x ; y)';label='Reflection in the y-axis';}
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
              grid+='<text x="'+(px2+8)+'" y="'+(py2-6)+'" font-size="9" fill="#6ee7b7" font-family="JetBrains Mono,monospace">P&#39;('+ix+';'+iy+')</text>';
              document.getElementById('g8tfSvg').innerHTML=grid;
              document.getElementById('g8tfOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Transformation: </span><span style="color:#fbbf24;">'+label+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Rule: </span><span style="color:#a5b4fc;">'+rule+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Original: </span><span style="color:#fbbf24;font-weight:700;">P('+x+'; '+y+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Image: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">P&#39;('+ix+'; '+iy+')</span></div>',
              ].join('');
            }
            ['g8tfType','g8tfX','g8tfY','g8tfA','g8tfB'].forEach(function(id){
              var el=document.getElementById(id);
              el.addEventListener('input',transform);el.addEventListener('change',transform);
            });
            setType();transform();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "A shape is translated 4 units right and 3 units up. Which best describes this transformation?", options: ["A slide", "A flip", "A turn", "A resize"], answer: 0, topic: "Transformations" },
        { type: "input", text: "Point A(2 ; 5) is translated 3 units left and 2 units down. What is the x-coordinate of the image?", answer: "-1", topic: "Transformations" },
        { type: "mc", text: "Point (4 ; -3) is reflected in the x-axis. The image is:", options: ["(-4 ; -3)", "(4 ; 3)", "(-4 ; 3)", "(4 ; -3)"], answer: 1, topic: "Transformations" },
        { type: "mc", text: "Point (-2 ; 6) is reflected in the y-axis. The image is:", options: ["(2 ; 6)", "(-2 ; -6)", "(2 ; -6)", "(6 ; -2)"], answer: 0, topic: "Transformations" },
        { type: "mc", text: "After a translation, which properties of a shape stay exactly the same?", options: ["Only the size", "Shape, size AND orientation", "Only the orientation", "Nothing stays the same"], answer: 1, topic: "Transformations" },
        { type: "input", text: "Point A is translated 5 units right and 3 units down, giving image A'(7 ; -1). Find the y-coordinate of the original point A.", answer: "2", topic: "Transformations" },
        { type: "input", text: "Point P(-2 ; 3) is first reflected in the x-axis, then translated 4 units right and 1 unit up. What are the final coordinates? (write as x,y)", answer: "2,-2", topic: "Transformations" },
      ]
    },
    {
      id: 1802,
      chapter: 18,
      name: "Rotations and enlargements",
      fullName: "An introduction to rotations and enlargements",
      lesson: {
        heading: "Rotations and enlargements",
        sub: "Chapter 18 · Topic 2",
        body: `
          <p>Two more transformations to know are <strong>rotations</strong> (turning a shape about a fixed point) and <strong>enlargements</strong> (making a shape bigger or smaller).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rotation</div>
            <p>
              A <strong>rotation</strong> turns a shape about a fixed point called the <strong>centre of rotation</strong>, through a given angle (e.g. 90° or 180°) in a given direction (clockwise or anticlockwise).<br><br>
              A rotation keeps the shape and size the same, but the shape ends up facing a different way.<br><br>
              <strong>Extension (coordinate rule about the origin):</strong><br>
              90° anticlockwise: <span class="math">(x ; y) → (−y ; x)</span><br>
              180°: <span class="math">(x ; y) → (−x ; −y)</span>
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Enlargement</div>
            <p>
              An <strong>enlargement</strong> makes a shape bigger or smaller by a <strong>scale factor</strong>, using a fixed point (the centre of enlargement). Every length on the image is the length on the object multiplied by the scale factor.<br><br>
              If the scale factor is <strong>greater than 1</strong>, the shape gets bigger.<br>
              If the scale factor is <strong>between 0 and 1</strong>, the shape gets smaller (a reduction).<br><br>
              An enlargement keeps the shape the same (all angles equal) but changes the size — the image and object are <strong>similar</strong>, not congruent.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>A shape is rotated 90° anticlockwise about the origin. Point (3 ; 1) → <span class="math">(−1 ; 3)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>A rectangle 4 cm × 2 cm is enlarged by scale factor 3. New sides: <span class="math">4 × 3 = 12</span> cm and <span class="math">2 × 3 = 6</span> cm.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Handy memory trick: <strong>Translation</strong> = slide, <strong>Reflection</strong> = flip, <strong>Rotation</strong> = turn, <strong>Enlargement</strong> = resize.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Rotation &amp; Enlargement Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter a point, pick rotate or enlarge, and see the image coordinates.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">x</label><input id="g8rxX" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">y</label><input id="g8rxY" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Transformation</label>
                <select id="g8rxType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="rot90a">Rotate 90° anticlockwise (about origin)</option>
                  <option value="rot180">Rotate 180° (about origin)</option>
                  <option value="enlarge">Enlarge (scale factor k, from origin)</option>
                </select>
              </div>
              <div id="g8rxKdiv" style="display:none;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">k</label><input id="g8rxK" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="g8rxBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Transform</button>
            </div>
            <div id="g8rxOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var rules={rot90a:'(x;y)→(−y;x)',rot180:'(x;y)→(−x;−y)',enlarge:'(x;y)→(kx;ky)'};
            function setK(){document.getElementById('g8rxKdiv').style.display=(document.getElementById('g8rxType').value==='enlarge')?'flex':'none';}
            document.getElementById('g8rxType').addEventListener('change',function(){setK();rx();});
            function rx(){
              var x=parseFloat(document.getElementById('g8rxX').value)||0,y=parseFloat(document.getElementById('g8rxY').value)||0;
              var t=document.getElementById('g8rxType').value,k=parseFloat(document.getElementById('g8rxK').value)||1;
              var ix,iy;
              if(t==='rot90a'){ix=-y;iy=x;}else if(t==='rot180'){ix=-x;iy=-y;}else{ix=k*x;iy=k*y;}
              document.getElementById('g8rxOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Object:</span><span style="color:#a5b4fc;"> ('+x+' ; '+y+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Rule:</span><span style="color:#fbbf24;"> '+rules[t].replace('k',k)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Image:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;"> ('+ix+' ; '+iy+')</span></div>',
              ].join('');
            }
            document.getElementById('g8rxBtn').addEventListener('click',rx);
            ['g8rxX','g8rxY','g8rxK'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')rx();});});
            setK();rx();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Rotating a shape 90° anticlockwise about the origin turns point (2 ; 5) into:", options: ["(-5 ; 2)", "(5 ; -2)", "(-2 ; -5)", "(5 ; 2)"], answer: 0, topic: "Transformations" },
        { type: "mc", text: "Rotating point (3 ; -4) by 180° about the origin gives:", options: ["(3 ; 4)", "(-3 ; 4)", "(-3 ; -4)", "(4 ; -3)"], answer: 1, topic: "Transformations" },
        { type: "input", text: "A shape with side length 5 cm is enlarged by scale factor 4. What is the new side length in cm?", answer: "20", topic: "Transformations" },
        { type: "mc", text: "A scale factor of 0,5 will make a shape:", options: ["Bigger", "Smaller", "The same size", "Turn upside down"], answer: 1, topic: "Transformations" },
        { type: "mc", text: "Which transformation changes the SIZE of a shape but keeps its shape (all angles) the same?", options: ["Translation", "Reflection", "Rotation", "Enlargement"], answer: 3, topic: "Transformations" },
        { type: "input", text: "A shape is enlarged by scale factor k. Its area increases from 12 cm² to 108 cm². Determine the scale factor k used for the side lengths.", answer: "3", topic: "Transformations" },
        { type: "input", text: "Point B(4 ; -2) is first rotated 90° anticlockwise about the origin, then the resulting point is enlarged by scale factor 3 from the origin. Find the final coordinates. (write as x,y)", answer: "6,12", topic: "Transformations" },
      ]
    },
  ],
  workbook: {
    chapter: 18, chapterName: "Transformation Geometry",
    topics: [
      {
        name: "Translations and Reflections",
        questions: [
          {
            num: "1",
            text: "Triangle ABC has vertices A(1 ; 1), B(4 ; 1) and C(4 ; 3).",
            parts: [
              { label: "a)", text: "Translate the triangle 2 units left and 3 units up. Write the coordinates of A', B' and C'.", marks: 3 },
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
            text: "Using the same triangle ABC from Question 1 (A(1;1), B(4;1), C(4;3)):",
            parts: [
              { label: "a)", text: "Rotate the triangle 90° anticlockwise about the origin. Write all new coordinates.", marks: 3 },
              { label: "b)", text: "Rotate the original triangle 180° about the origin.", marks: 3 },
              { label: "c)", text: "Enlarge the original triangle from the origin with scale factor 2. Write the new coordinates.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 18, chapterName: "Chapter 18 — Transformation Geometry",
    topics: [
      {
        name: "Translations and Reflections",
        answers: [
          { num: "Q1a", ans: "A'(-1;4), B'(2;4), C'(2;6)", note: "-2 to x, +3 to y" },
          { num: "Q1b", ans: "A'(1;-1), B'(4;-1), C'(4;-3)", note: "y-coordinates negated" },
          { num: "Q1c", ans: "A'(-1;1), B'(-4;1), C'(-4;3)", note: "x-coordinates negated" },
        ]
      },
      {
        name: "Rotations and Enlargements",
        answers: [
          { num: "Q2a", ans: "A'(-1;1), B'(-1;4), C'(-3;4)", note: "(x;y)→(-y;x)" },
          { num: "Q2b", ans: "A'(-1;-1), B'(-4;-1), C'(-4;-3)", note: "negate both coordinates" },
          { num: "Q2c", ans: "A'(2;2), B'(8;2), C'(8;6)", note: "multiply all coordinates by 2" },
        ]
      },
    ]
  }
});
