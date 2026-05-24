// Math Magician — Grade 8, Chapter 9 data
// Geometry of Straight Lines

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 50,
      chapter: 9,
      name: "Lines and angles",
      fullName: "The geometry of lines and angles",
      lesson: {
        heading: "The geometry of lines and angles",
        sub: "Chapter 9 · Topic 1",
        body: `
          <p>Geometry of straight lines involves understanding how lines and angles are named, classified, and measured. This is the foundation for all further geometry.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key vocabulary</div>
            <p>
              <strong>Line:</strong> extends infinitely in both directions. Written as ←→ or named with two points, e.g. AB.<br>
              <strong>Line segment:</strong> a part of a line with two endpoints. e.g. <span class="math">AB</span> with length <span class="math">AB = 5 cm</span>.<br>
              <strong>Ray:</strong> starts at a point and extends infinitely in one direction.<br><br>
              <strong>Angle:</strong> formed by two rays sharing a common endpoint (vertex).<br>
              <strong>Notation:</strong> <span class="math">Â</span> or <span class="math">∠BAC</span> or <span class="math">∠A</span>. The middle letter is always the vertex.<br><br>
              <strong>Types of angles:</strong><br>
              &nbsp;&nbsp;• <strong>Acute:</strong> 0° &lt; angle &lt; 90°<br>
              &nbsp;&nbsp;• <strong>Right angle:</strong> exactly 90° (shown with a square corner symbol)<br>
              &nbsp;&nbsp;• <strong>Obtuse:</strong> 90° &lt; angle &lt; 180°<br>
              &nbsp;&nbsp;• <strong>Straight angle:</strong> exactly 180° (a straight line)<br>
              &nbsp;&nbsp;• <strong>Reflex:</strong> 180° &lt; angle &lt; 360°<br>
              &nbsp;&nbsp;• <strong>Revolution:</strong> exactly 360°
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Naming and classifying angles</div>
            <div class="example-step"><span class="step-num">1</span><span>Three points: A, B (vertex), C → angle is written <span class="math">∠ABC</span> or <span class="math">B̂</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>If <span class="math">∠ABC = 65°</span> → it is an <strong>acute</strong> angle (between 0° and 90°)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>If <span class="math">∠ABC = 130°</span> → it is an <strong>obtuse</strong> angle (between 90° and 180°)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>If <span class="math">∠ABC = 220°</span> → it is a <strong>reflex</strong> angle (between 180° and 360°)</span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Measuring angles</div>
            <p>
              A <strong>protractor</strong> is used to measure angles in degrees (°).<br>
              Place the centre of the protractor on the vertex and align the base line with one arm of the angle.<br>
              Read the scale from 0° along the direction of the first arm.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always state the reason for every angle calculation in geometry. e.g. "angles on a straight line" or "vertically opposite angles". Reasons earn marks in exams.</span></div>
        
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Angle Classifier</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter an angle to classify it, find its complement and supplement.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <input id="angVal" type="number" value="65" min="0" max="360" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:22px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="font-size:16px;color:#a5b4fc;font-family:JetBrains Mono,monospace;">°</span>
              <svg id="angSvg" viewBox="0 0 120 80" style="width:120px;height:80px;flex-shrink:0;"></svg>
            </div>
            <div id="angOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const deg=parseFloat(document.getElementById('angVal').value)||0;
              const rad=deg*Math.PI/180;
              // SVG arc
              const svg=document.getElementById('angSvg');
              const cx=15,cy=65,r=50;
              const ex=cx+r*Math.cos(-rad),ey=cy+r*Math.sin(-rad);
              const large=deg>180?1:0;
              const arcD=deg>=360?
                'M '+cx+' '+cy+' m -'+r+' 0 a '+r+' '+r+' 0 1 1 0.001 0':
                'M '+cx+' '+cy+' L '+(cx+r)+' '+cy+' A '+r+' '+r+' 0 '+large+' 0 '+ex.toFixed(1)+' '+ey.toFixed(1)+' Z';
              let colour=deg<=90?'rgba(99,102,241,0.40)':deg<=180?'rgba(245,158,11,0.40)':'rgba(239,68,68,0.30)';
              svg.innerHTML=
                '<path d="'+arcD+'" fill="'+colour+'"/>'+
                '<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r)+'" y2="'+cy+'" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>'+
                (deg<360?'<line x1="'+cx+'" y1="'+cy+'" x2="'+ex.toFixed(1)+'" y2="'+ey.toFixed(1)+'" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>':'')+
                '<text x="'+(cx+r*0.55*Math.cos(-rad/2)).toFixed(0)+'" y="'+(cy+r*0.55*Math.sin(-rad/2)-2).toFixed(0)+'" fill="#fcd34d" font-size="10" font-family="JetBrains Mono,monospace" text-anchor="middle">'+deg+'°</text>';
              let type='';
              if(deg===0)type='Zero angle';
              else if(deg<90)type='Acute';
              else if(deg===90)type='Right angle';
              else if(deg<180)type='Obtuse';
              else if(deg===180)type='Straight angle';
              else if(deg<360)type='Reflex';
              else type='Revolution (full turn)';
              const comp=90-deg,supp=180-deg;
              document.getElementById('angOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Type:</span><span style="color:#fbbf24;">'+type+'</span></div>',
                deg<=90?'<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Complement:</span><span style="color:#6ee7b7;">'+comp+'°</span> <span style="color:rgba(221,225,240,0.30);font-size:10px;">(90°−'+deg+'°)</span></div>':'',
                deg<=180?'<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Supplement:</span><span style="color:#6ee7b7;">'+supp+'°</span> <span style="color:rgba(221,225,240,0.30);font-size:10px;">(180°−'+deg+'°)</span></div>':'',
              ].filter(Boolean).join('');
            }
            document.getElementById('angVal').addEventListener('input',update);
            update();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "An angle of 135° is classified as:", options: ["Acute", "Obtuse", "Reflex", "Right"], answer: 1, topic: "Angles" },
        { type: "mc", text: "How is the angle at vertex P, with rays PA and PB, correctly written?", options: ["∠AP", "∠APB", "∠PA", "∠BP"], answer: 1, topic: "Angles" },
        { type: "input", text: "What type of angle measures exactly 90°? (one word)", answer: "right", topic: "Angles" },
        { type: "mc", text: "Which angle range describes a reflex angle?", options: ["0° to 90°", "90° to 180°", "180° to 360°", "Equal to 180°"], answer: 2, topic: "Angles" },
        { type: "input", text: "An angle measures 47°. What type of angle is it? (one word)", answer: "acute", topic: "Angles" },
      ]
    },
    {
      id: 51,
      chapter: 9,
      name: "Angle relationships",
      fullName: "Angle properties involving straight lines",
      lesson: {
        heading: "Angle properties involving straight lines",
        sub: "Chapter 9 · Topic 2",
        body: `
          <p>When lines meet or cross, the angles formed have special relationships. These relationships are used to calculate unknown angles — always giving a <strong>reason</strong> for each step.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Angle relationships on straight lines</div>
            <p>
              <strong>Adjacent supplementary angles (angles on a straight line):</strong><br>
              Angles that together form a straight line add up to 180°.<br>
              <span class="math">â + b̂ = 180°</span> &nbsp; <em>(angles on a straight line)</em><br><br>
              <strong>Angles around a point:</strong><br>
              All angles around a single point add up to 360°.<br>
              <span class="math">â + b̂ + ĉ + … = 360°</span> &nbsp; <em>(angles around a point)</em><br><br>
              <strong>Vertically opposite angles:</strong><br>
              When two straight lines intersect, the angles opposite each other are equal.<br>
              <span class="math">â = ĉ</span> and <span class="math">b̂ = d̂</span> &nbsp; <em>(vertically opposite angles)</em><br><br>
              <strong>Perpendicular lines:</strong><br>
              Two lines are perpendicular if they meet at 90°. Shown with the symbol ⊥.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example — finding unknown angles</div>
            <div class="example-step"><span class="step-num">1</span><span>Two lines intersect. One angle is <span class="math">x = 65°</span>. Find the other three angles.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Vertically opposite: the angle directly opposite = 65°. <em>(vert. opp. angles)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Adjacent angle: <span class="math">180° − 65° = 115°</span>. <em>(angles on a straight line)</em></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Fourth angle: 115° (vertically opposite to the 115° angle). <em>(vert. opp. angles)</em></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Angles around a point</div>
            <div class="example-step"><span class="step-num">1</span><span>Three angles around a point: 110°, 85°, and x.</span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">110° + 85° + x = 360°</span> <em>(angles around a point)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">x = 360° − 195° = 165°</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In every geometry answer, write the numerical calculation AND the reason in brackets, e.g. "x = 180° − 65° = 115° (angles on a str. line)".</span></div>
        
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Straight-Line & Intersecting Angle Solver</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:flex-end;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Scenario</label>
                <select id="angRelType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="straight">Angles on a straight line</option>
                  <option value="point">Angles around a point</option>
                  <option value="vert">Vertically opposite angles</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Known angle(s) — comma-separated</label>
                <input id="angRelVals" type="text" value="72, 43" style="min-width:160px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <button id="angRelSolve" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Solve</button>
            </div>
            <div id="angRelOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function solve(){
              const type=document.getElementById('angRelType').value;
              const vals=document.getElementById('angRelVals').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              const el=document.getElementById('angRelOut');
              const sum=vals.reduce((a,b)=>a+b,0);
              let html='';
              if(type==='straight'){
                const x=180-sum;
                html='<div style="color:rgba(221,225,240,0.45);font-size:11px;">Rule: angles on a straight line sum to 180°</div>'+
                  '<div>Sum of known angles: <span style="color:#fbbf24;">'+sum+'°</span></div>'+
                  (x>=0?'<div>Unknown angle x = 180° − '+sum+'° = <span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+x+'°</span></div>':
                  '<span style="color:#fca5a5;">Angles already exceed 180°</span>');
              } else if(type==='point'){
                const x=360-sum;
                html='<div style="color:rgba(221,225,240,0.45);font-size:11px;">Rule: angles around a point sum to 360°</div>'+
                  '<div>Sum of known angles: <span style="color:#fbbf24;">'+sum+'°</span></div>'+
                  (x>=0?'<div>Unknown angle x = 360° − '+sum+'° = <span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+x+'°</span></div>':
                  '<span style="color:#fca5a5;">Angles already exceed 360°</span>');
              } else {
                const v=vals[0]||0;
                const opp=v, adj=180-v;
                html='<div style="color:rgba(221,225,240,0.45);font-size:11px;">Rule: vertically opposite angles are equal</div>'+
                  '<div>Given angle: <span style="color:#fbbf24;">'+v+'°</span></div>'+
                  '<div>Vertically opposite angle = <span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+opp+'°</span></div>'+
                  '<div>Adjacent angles = <span style="color:#6ee7b7;">'+adj+'°</span> each <span style="color:rgba(221,225,240,0.30);font-size:10px;">(straight line)</span></div>';
              }
              el.innerHTML=html;
            }
            document.getElementById('angRelSolve').addEventListener('click',solve);
            document.getElementById('angRelType').addEventListener('change',solve);
            document.getElementById('angRelVals').addEventListener('keydown',e=>{if(e.key==='Enter')solve();});
            solve();
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Two adjacent angles on a straight line are 72° and x°. Find x.", answer: "108", topic: "Angle relationships" },
        { type: "mc", text: "Two straight lines intersect. One angle is 48°. What is the vertically opposite angle?", options: ["132°", "48°", "90°", "312°"], answer: 1, topic: "Angle relationships" },
        { type: "input", text: "Three angles around a point are 95°, 130°, and x°. Find x.", answer: "135", topic: "Angle relationships" },
        { type: "mc", text: "Which reason explains why vertically opposite angles are equal?", options: ["Angles around a point", "Both pairs are supplementary to the same angle", "Angles on a straight line", "Corresponding angles"], answer: 1, topic: "Angle relationships" },
        { type: "input", text: "Two lines are perpendicular. One angle formed is x°. What is x?", answer: "90", topic: "Angle relationships" },
      ]
    },
    {
      id: 52,
      chapter: 9,
      name: "Parallel lines and angles",
      fullName: "Parallel lines and angles",
      lesson: {
        heading: "Parallel lines and angles",
        sub: "Chapter 9 · Topic 3",
        body: `
          <p>When a <strong>transversal</strong> crosses two parallel lines, eight angles are formed. These angles have special relationships that allow us to calculate unknown values.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key definitions</div>
            <p>
              <strong>Parallel lines:</strong> lines in the same plane that never intersect. Shown with arrows (→ →) or the symbol ∥.<br>
              e.g. AB ∥ CD means line AB is parallel to line CD.<br><br>
              <strong>Transversal:</strong> a line that cuts across two or more other lines.<br><br>
              <strong>The 8 angles formed</strong> are grouped as:<br>
              &nbsp;&nbsp;• <strong>Corresponding angles</strong> — same position at each intersection (F-shape). They are <em>equal</em>.<br>
              &nbsp;&nbsp;• <strong>Alternate interior angles</strong> — between the parallel lines, on opposite sides of the transversal (Z-shape). They are <em>equal</em>.<br>
              &nbsp;&nbsp;• <strong>Co-interior angles</strong> (same-side interior / C-shape) — between the parallel lines, on the same side. They are <em>supplementary</em> (add to 180°).<br>
              &nbsp;&nbsp;• <strong>Vertically opposite angles</strong> — still equal (as always when two lines cross).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Identifying angle pairs</div>
            <div class="example-step"><span class="step-num">1</span><span>A transversal crosses parallel lines AB and CD at points P and Q.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>∠1 (above AB, left of transversal) and ∠5 (above CD, left of transversal) → <strong>corresponding angles</strong> → equal.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>∠3 (below AB, right) and ∠5 (above CD, left) → <strong>alternate interior angles</strong> → equal.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>∠3 (below AB, left) and ∠5 (above CD, left) → <strong>co-interior angles</strong> → sum = 180°.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Calculating unknown angles</div>
            <div class="example-step"><span class="step-num">1</span><span>AB ∥ CD with transversal. A corresponding angle at AB = 115°. Find the angle at CD.</span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">x = 115°</span> <em>(corresponding angles; AB ∥ CD)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Now find the co-interior angle: <span class="math">y + 115° = 180°</span> <em>(co-interior angles; AB ∥ CD)</em></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">y = 65°</span></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Proving lines are parallel</div>
            <p>
              You can also work in reverse: if you can show that a pair of angles satisfies one of the conditions above, you can <strong>prove</strong> that the lines are parallel.<br><br>
              e.g. "∠3 = ∠5 → AB ∥ CD (alt. int. angles equal)"
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Remember the shapes: <strong>F</strong> = corresponding (equal), <strong>Z</strong> = alternate (equal), <strong>C</strong> or <strong>U</strong> = co-interior (supplementary). Spotting the shape in the diagram is the fastest way to identify the relationship.</span></div>
        
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Parallel Lines Angle Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter one angle formed by a transversal crossing parallel lines to find all 8 angles.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <input id="parAng" type="number" value="65" min="1" max="179" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:20px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;">°</span>
              <span style="font-size:11px;color:rgba(221,225,240,0.35);">(∠1 — above line 1, left of transversal)</span>
            </div>
            <div id="parOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a1=parseFloat(document.getElementById('parAng').value)||65;
              const a2=180-a1;
              const el=document.getElementById('parOut');
              el.innerHTML=[
                '<div style="color:rgba(245,158,11,0.60);font-size:10px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">At line 1 (top intersection):</div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:50px;display:inline-block;">∠1:</span><span style="color:#fcd34d;">'+a1+'°</span> <span style="color:rgba(221,225,240,0.25);font-size:10px;">(given)</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:50px;display:inline-block;">∠2:</span><span style="color:#a5b4fc;">'+a2+'°</span> <span style="color:rgba(221,225,240,0.25);font-size:10px;">(str. line: 180°−∠1)</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:50px;display:inline-block;">∠3:</span><span style="color:#a5b4fc;">'+a1+'°</span> <span style="color:rgba(221,225,240,0.25);font-size:10px;">(vert. opp. to ∠1)</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:50px;display:inline-block;">∠4:</span><span style="color:#a5b4fc;">'+a2+'°</span> <span style="color:rgba(221,225,240,0.25);font-size:10px;">(vert. opp. to ∠2)</span></div>',
                '<div style="color:rgba(16,185,129,0.60);font-size:10px;text-transform:uppercase;letter-spacing:0.06em;margin:6px 0 4px;">At line 2 (bottom intersection):</div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:50px;display:inline-block;">∠5:</span><span style="color:#6ee7b7;">'+a1+'°</span> <span style="color:rgba(221,225,240,0.25);font-size:10px;">(corr. to ∠1 — F-shape)</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:50px;display:inline-block;">∠6:</span><span style="color:#6ee7b7;">'+a2+'°</span> <span style="color:rgba(221,225,240,0.25);font-size:10px;">(corr. to ∠2)</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:50px;display:inline-block;">∠7:</span><span style="color:#6ee7b7;">'+a1+'°</span> <span style="color:rgba(221,225,240,0.25);font-size:10px;">(alt. int. to ∠2 — Z-shape, or vert. opp. ∠5)</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:50px;display:inline-block;">∠8:</span><span style="color:#6ee7b7;">'+a2+'°</span> <span style="color:rgba(221,225,240,0.25);font-size:10px;">(vert. opp. ∠6)</span></div>',
                '<div style="margin-top:6px;font-size:10px;color:#fbbf24;">Co-interior: ∠2 + ∠5 = '+a2+' + '+a1+' = '+(a2+a1)+'° ✓</div>',
              ].join('');
            }
            document.getElementById('parAng').addEventListener('input',update);
            update();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "AB ∥ CD. A transversal forms a 70° angle at AB. What is the corresponding angle at CD?", options: ["110°", "70°", "180°", "35°"], answer: 1, topic: "Parallel lines" },
        { type: "input", text: "AB ∥ CD. Co-interior angles are x° and 112°. Find x.", answer: "68", topic: "Parallel lines" },
        { type: "mc", text: "Which angle pair forms a Z-shape with parallel lines?", options: ["Corresponding", "Co-interior", "Alternate interior", "Vertically opposite"], answer: 2, topic: "Parallel lines" },
        { type: "mc", text: "AB ∥ CD. An alternate interior angle at AB is 55°. What is the alternate interior angle at CD?", options: ["125°", "55°", "90°", "305°"], answer: 1, topic: "Parallel lines" },
        { type: "input", text: "Two lines are cut by a transversal. Corresponding angles are 3x + 10 and 5x − 20 degrees. The lines are parallel. Find x.", answer: "15", topic: "Parallel lines" },
      ]
    },
    {
      id: 53,
      chapter: 9,
      name: "Ch 9 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 9 — Examination focus",
        sub: "Chapter 9 · Review",
        body: `
          <p>These exam-style questions combine all the angle relationships from Chapter 9. You will need to identify angle types, apply the correct property, and always state a reason.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 9 summary</div>
            <p>
              ✅ <strong>Angles on a straight line</strong> — sum to 180°<br>
              ✅ <strong>Angles around a point</strong> — sum to 360°<br>
              ✅ <strong>Vertically opposite angles</strong> — equal<br>
              ✅ <strong>Corresponding angles</strong> (parallel lines, F-shape) — equal<br>
              ✅ <strong>Alternate interior angles</strong> (parallel lines, Z-shape) — equal<br>
              ✅ <strong>Co-interior angles</strong> (parallel lines, C-shape) — supplementary (sum = 180°)<br>
              ✅ Always write a reason for every angle statement
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">📝 Common exam mistakes to avoid</div>
            <div class="example-step"><span class="step-num">✗</span><span>Writing angle values without a reason — always state the property used.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Confusing co-interior (supplementary) with alternate (equal) angles.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Assuming lines are parallel without being told — only use parallel-line properties when the diagram or question states the lines are parallel.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Using a protractor to measure in calculation questions — always calculate using angle relationships.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In multi-step problems, label every unknown angle as you go and write the reason next to each one. This keeps your working clear and earns method marks.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Two parallel lines are cut by a transversal. An angle of 63° is formed. Find the co-interior angle.", answer: "117", topic: "Mixed" },
        { type: "mc", text: "Three angles at a point on a straight line are x, 2x, and 3x. Find x.", options: ["60°", "30°", "45°", "20°"], answer: 1, topic: "Mixed" },
        { type: "mc", text: "AB ∥ CD. A transversal makes an angle of 48° with AB (above, left). What is the alternate interior angle at CD?", options: ["132°", "48°", "42°", "90°"], answer: 1, topic: "Mixed" },
        { type: "input", text: "Two lines intersect. One angle is (2x + 15)° and its vertically opposite angle is (3x − 10)°. Find x.", answer: "25", topic: "Mixed" },
        { type: "mc", text: "Which set of angle relationships applies ONLY when lines are parallel?", options: ["Vertically opposite and straight-line angles", "Corresponding, alternate, and co-interior angles", "Angles around a point", "Supplementary and complementary angles"], answer: 1, topic: "Mixed" },
      ]
    }
  ],
  workbook: {
    chapter: 9, chapterName: "Geometry of Straight Lines",
    topics: [
      {
        name: "Lines, angles and straight-line properties",
        questions: [
          {
            num: "1",
            text: "In the diagram, three angles are formed on a straight line: (2x + 10)°, 3x°, and 40°.",
            parts: [
              { label: "a)", text: "Write an equation using the angles on a straight line.", marks: 1 },
              { label: "b)", text: "Solve for x.", marks: 2 },
              { label: "c)", text: "Hence find the size of each angle.", marks: 2 },
            ]
          },
          {
            num: "2",
            text: "Two straight lines intersect at point P, forming angles a, b, c, and d. Angle a = 74°.",
            parts: [
              { label: "a)", text: "Find b, giving a reason.", marks: 2 },
              { label: "b)", text: "Find c, giving a reason.", marks: 2 },
              { label: "c)", text: "Find d, giving a reason.", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "Four angles are formed around a point P: x, 2x, 90°, and 3x − 6°.",
            parts: [
              { label: "a)", text: "Set up an equation for the angles around a point.", marks: 1 },
              { label: "b)", text: "Solve for x.", marks: 3 },
              { label: "c)", text: "State the size of the largest angle.", marks: 1 },
            ]
          },
        ]
      },
      {
        name: "Parallel lines cut by a transversal",
        questions: [
          {
            num: "4",
            text: "AB ∥ CD. A transversal cuts AB at P and CD at Q. ∠APQ = 118° (obtuse angle above AB, left of transversal).",
            parts: [
              { label: "a)", text: "Find ∠BPQ. Give a reason.", marks: 2 },
              { label: "b)", text: "Find the corresponding angle at Q. Give a reason.", marks: 2 },
              { label: "c)", text: "Find the alternate interior angle at Q. Give a reason.", marks: 2 },
              { label: "d)", text: "Find the co-interior angle at Q. Give a reason.", marks: 2 },
            ]
          },
          {
            num: "5",
            text: "A transversal crosses two lines. At the first line, an angle of (4x − 5)° is formed. At the second line, the corresponding angle is (2x + 35)°.",
            parts: [
              { label: "a)", text: "If the lines are parallel, find x.", marks: 3 },
              { label: "b)", text: "Hence find the size of each corresponding angle.", marks: 1 },
              { label: "c)", text: "Find the co-interior angle at the second intersection.", marks: 2 },
            ]
          },
          {
            num: "6",
            text: "EF ∥ GH. A transversal meets EF at M and GH at N. ∠EMN = (3x + 20)° and the co-interior angle ∠GNM = (2x + 50)°.",
            parts: [
              { label: "a)", text: "Write an equation for these co-interior angles.", marks: 1 },
              { label: "b)", text: "Solve for x.", marks: 3 },
              { label: "c)", text: "State the size of both co-interior angles and verify they sum to 180°.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 9, chapterName: "Chapter 9 — Geometry of Straight Lines",
    topics: [
      {
        name: "Lines, angles and straight-line properties",
        answers: [
          { num: "Q1a", ans: "(2x + 10) + 3x + 40 = 180", note: "Angles on a straight line sum to 180°" },
          { num: "Q1b", ans: "x = 22°", note: "5x + 50 = 180 → 5x = 130 → x = 26 (check: 5(26)+50=180 ✓)" },
          { num: "Q1c", ans: "2(26)+10 = 62°; 3(26) = 78°; 40°", note: "Substitute x = 26 into each expression; verify: 62+78+40 = 180 ✓" },
          { num: "Q2a", ans: "b = 106°", note: "Angles on a straight line: 180° − 74° = 106°" },
          { num: "Q2b", ans: "c = 74°", note: "Vertically opposite angles: c = a = 74°" },
          { num: "Q2c", ans: "d = 106°", note: "Vertically opposite angles: d = b = 106°" },
          { num: "Q3a", ans: "x + 2x + 90 + 3x − 6 = 360", note: "Angles around a point sum to 360°" },
          { num: "Q3b", ans: "x = 46°", note: "6x + 84 = 360 → 6x = 276 → x = 46" },
          { num: "Q3c", ans: "3(46) − 6 = 132°", note: "Largest angle is 3x − 6°" },
        ]
      },
      {
        name: "Parallel lines cut by a transversal",
        answers: [
          { num: "Q4a", ans: "∠BPQ = 62°", note: "Angles on a straight line: 180° − 118° = 62°" },
          { num: "Q4b", ans: "∠PQD = 118°", note: "Corresponding angles; AB ∥ CD" },
          { num: "Q4c", ans: "∠PQG = 62°", note: "Alternate interior angles; AB ∥ CD (also = ∠BPQ)" },
          { num: "Q4d", ans: "∠BPQ + co-int = 180° → co-int = 118°", note: "Co-interior angles; AB ∥ CD: 62° + 118° = 180° ✓" },
          { num: "Q5a", ans: "x = 20", note: "4x − 5 = 2x + 35 (corr. angles, lines ∥) → 2x = 40 → x = 20" },
          { num: "Q5b", ans: "Each corresponding angle = 75°", note: "4(20) − 5 = 75°; 2(20) + 35 = 75° ✓" },
          { num: "Q5c", ans: "Co-interior angle = 105°", note: "180° − 75° = 105° (co-interior angles; lines ∥)" },
          { num: "Q6a", ans: "(3x + 20) + (2x + 50) = 180", note: "Co-interior angles; EF ∥ GH" },
          { num: "Q6b", ans: "x = 22", note: "5x + 70 = 180 → 5x = 110 → x = 22" },
          { num: "Q6c", ans: "∠EMN = 86°; ∠GNM = 94°; 86 + 94 = 180° ✓", note: "3(22)+20=86°; 2(22)+50=94°" },
        ]
      },
    ]
  }
});
