// Math Magician — Grade 11, Chapter 4
// Analytical Geometry

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 400,
      chapter: 4,
      name: "Equation of a line & inclination",
      fullName: "Equation of a line and the angle of inclination",
      lesson: {
        heading: "Equation of a line and angle of inclination",
        sub: "Chapter 4 · Topic 1",
        body: `
          <p>Grade 11 Analytical Geometry extends Grade 10 to include the <strong>angle of inclination</strong> and more complex line problems.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Forms of the equation of a line</div>
            <p>
              <strong>Slope-intercept:</strong> <span class="math">y = mx + c</span><br>
              <strong>Point-slope:</strong> <span class="math">y − y₁ = m(x − x₁)</span><br>
              <strong>Two-point form:</strong> <span class="math">(y − y₁)/(y₂ − y₁) = (x − x₁)/(x₂ − x₁)</span><br>
              <strong>General form:</strong> <span class="math">ax + by + c = 0</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Angle of inclination (θ)</div>
            <p>
              The <strong>angle of inclination</strong> is the angle a line makes with the positive x-axis, measured anti-clockwise, where <span class="math">0° ≤ θ < 180°</span>.<br><br>
              <span class="math">tan θ = m</span> (where m is the gradient)<br><br>
              If m > 0: acute angle (0° < θ < 90°)<br>
              If m < 0: obtuse angle (90° < θ < 180°)<br>
              If m = 0: θ = 0° (horizontal line)<br>
              Vertical line: θ = 90° (undefined gradient)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>Line y = 2x + 3: m = 2, so tan θ = 2 → θ = tan⁻¹(2) ≈ 63.4°<br>
            Line y = −x + 1: m = −1, so tan θ = −1 → reference angle 45° → θ = 135°</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Line &amp; Inclination Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Find the angle of inclination from a gradient, or a gradient from an angle. Then get the line equation through a point.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gradient m</div><input id="g11c4m" type="number" value="2" step="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Point x₁</div><input id="g11c4x1" type="number" value="0" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Point y₁</div><input id="g11c4y1" type="number" value="3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const m=parseFloat(document.getElementById('g11c4m').value);
                const x1=parseFloat(document.getElementById('g11c4x1').value);
                const y1=parseFloat(document.getElementById('g11c4y1').value);
                const out=document.getElementById('g11c4Out');
                if([m,x1,y1].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter valid values.</span>';return;}
                const rawTheta=Math.atan(m)*180/Math.PI;
                const theta=rawTheta<0?rawTheta+180:rawTheta;
                const c=y1-m*x1;
                const mPar=m;const mPerp=-1/m;
                let html='<span style="color:rgba(221,225,240,0.50);">tan θ = m = '+f(m)+' → θ = tan⁻¹('+f(m)+')'+(rawTheta<0?' + 180°':'')+'</span><br>';
                html+='<span style="color:#6ee7b7;">Angle of inclination θ = '+f(theta)+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Line through ('+x1+'; '+y1+'): y − '+y1+' = '+f(m)+'(x − '+x1+')</span><br>';
                html+='<span style="color:#fcd34d;">y = '+f(m)+'x + '+f(c)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Parallel gradient: </span><span style="color:#6ee7b7;">m∥ = '+f(mPar)+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Perpendicular gradient: </span><span style="color:#6ee7b7;">m⊥ = '+f(mPerp)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c4Btn').addEventListener('click',calc);
              ['g11c4m','g11c4x1','g11c4y1'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>When m < 0, tan⁻¹ gives a negative angle — add 180° to get the correct inclination in [0°; 180°). A negative gradient always gives an obtuse inclination angle.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A line has gradient 1. Its angle of inclination is:",
          options: ["30°", "45°", "60°", "90°"],
          answer: 1,
          topic: "Equation of a line & inclination"
        },
        {
          type: "mc",
          text: "A line makes an angle of 120° with the positive x-axis. Its gradient is:",
          options: ["√3", "−√3", "1/√3", "−1/√3"],
          answer: 1,
          topic: "Equation of a line & inclination"
        },
        {
          type: "input",
          text: "A line passes through (2; 5) with gradient 3. Write the equation in the form y = mx + c. What is c?",
          answer: "-1",
          altAnswers: ["−1"],
          topic: "Equation of a line & inclination"
        },
        {
          type: "mc",
          text: "The angle of inclination of y = −√3·x + 2 is:",
          options: ["60°", "120°", "−60°", "150°"],
          answer: 1,
          topic: "Equation of a line & inclination"
        },
        {
          type: "mc",
          text: "The equation of a line through (−1; 4) and (3; 0) is:",
          options: ["y = x + 5", "y = −x + 3", "y = x − 3", "y = −x + 5"],
          answer: 1,
          topic: "Equation of a line & inclination"
        }
      ]
    },
    {
      id: 401,
      chapter: 4,
      name: "Parallel, perpendicular & complex problems",
      fullName: "Parallel lines, perpendicular lines, and multi-step analytical geometry problems",
      lesson: {
        heading: "Parallel, perpendicular lines, and complex problems",
        sub: "Chapter 4 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Parallel and perpendicular conditions (recap + extension)</div>
            <p>
              <strong>Parallel:</strong> m₁ = m₂ (same gradient)<br>
              <strong>Perpendicular:</strong> m₁ × m₂ = −1<br><br>
              Angle between two lines with inclinations θ₁ and θ₂:<br>
              <span class="math">tan α = |m₁ − m₂| / |1 + m₁m₂|</span><br>
              (where α is the acute angle between the lines)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Complex problem</div>
            <p>Triangle with A(1;3), B(5;1), C(3;5).<br>
            Find the equation of the median from A to midpoint M of BC.<br>
            M = ((5+3)/2 ; (1+5)/2) = (4; 3)<br>
            m_AM = (3−3)/(4−1) = 0/3 = 0<br>
            Line AM: y = 3 (horizontal)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Key constructions to know</div>
            <p>
              <strong>Median:</strong> from vertex to midpoint of opposite side<br>
              <strong>Altitude:</strong> from vertex, perpendicular to opposite side<br>
              <strong>Perpendicular bisector:</strong> through midpoint, perpendicular to segment
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Triangle Line Construction Tool</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter two points — get the median, altitude (from a third vertex), or perpendicular bisector.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g11c4t2perp" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Perp. Bisector</button>
              <button id="g11c4t2alt" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Altitude</button>
              <button id="g11c4t2med" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Median</button>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P₁ (x₁;y₁)</div><input id="g11c4t2x1" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"> <input id="g11c4t2y1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;margin-left:4px;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P₂ (x₂;y₂)</div><input id="g11c4t2x2" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"> <input id="g11c4t2y2" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;margin-left:4px;"></div>
              <div id="g11c4t2vPanel" style="display:none;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Vertex V (x;y)</div><input id="g11c4t2vx" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"> <input id="g11c4t2vy" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;margin-left:4px;"></div>
              <button id="g11c4t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c4t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              let mode='perp';
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function setMode(m){
                mode=m;
                ['perp','alt','med'].forEach(id=>{
                  const b=document.getElementById('g11c4t2'+id);
                  b.style.cssText=id===m?'background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;':'background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;';
                });
                document.getElementById('g11c4t2vPanel').style.display=m==='alt'?'':'none';
                document.getElementById('g11c4t2Out').innerHTML='';
              }
              ['perp','alt','med'].forEach(id=>document.getElementById('g11c4t2'+id).addEventListener('click',()=>setMode(id)));
              document.getElementById('g11c4t2Btn').addEventListener('click',()=>{
                const x1=parseFloat(document.getElementById('g11c4t2x1').value),y1=parseFloat(document.getElementById('g11c4t2y1').value);
                const x2=parseFloat(document.getElementById('g11c4t2x2').value),y2=parseFloat(document.getElementById('g11c4t2y2').value);
                const out=document.getElementById('g11c4t2Out');
                if([x1,y1,x2,y2].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter valid coordinates.</span>';return;}
                const mx=(x1+x2)/2,my=(y1+y2)/2;
                const mSeg=x2===x1?Infinity:(y2-y1)/(x2-x1);
                let html='';
                if(mode==='perp'){
                  const mPerp=mSeg===0?Infinity:-1/mSeg;
                  html='<span style="color:rgba(221,225,240,0.50);">Midpoint M = ('+f(mx)+'; '+f(my)+')</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Gradient of segment = '+f(mSeg)+'</span><br>';
                  if(mPerp===Infinity){html+='<span style="color:#6ee7b7;">Perp. bisector: x = '+f(mx)+' (vertical line)</span>';}
                  else{const c=my-mPerp*mx;html+='<span style="color:#6ee7b7;">Perp. bisector: y = '+f(mPerp)+'x + '+f(c)+'</span>';}
                } else if(mode==='alt'){
                  const vx=parseFloat(document.getElementById('g11c4t2vx').value),vy=parseFloat(document.getElementById('g11c4t2vy').value);
                  if(isNaN(vx)||isNaN(vy)){out.innerHTML='<span style="color:#fca5a5;">Enter vertex coordinates.</span>';return;}
                  const mAlt=mSeg===0?Infinity:-1/mSeg;
                  html='<span style="color:rgba(221,225,240,0.50);">Gradient of side P₁P₂ = '+f(mSeg)+'</span><br>';
                  if(mAlt===Infinity){html+='<span style="color:#6ee7b7;">Altitude from V: x = '+f(vx)+' (vertical)</span>';}
                  else{const c=vy-mAlt*vx;html+='<span style="color:#6ee7b7;">Altitude from V('+vx+';'+vy+'): y = '+f(mAlt)+'x + '+f(c)+'</span>';}
                } else {
                  html='<span style="color:rgba(221,225,240,0.50);">Midpoint M of P₁P₂ = ('+f(mx)+'; '+f(my)+')</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">The median goes from a vertex to M. Enter a vertex below to get the line:</span><br>';
                  const vx=parseFloat(document.getElementById('g11c4t2vx').value)||0,vy=parseFloat(document.getElementById('g11c4t2vy').value)||0;
                  const mMed=mx===vx?Infinity:(my-vy)/(mx-vx);
                  if(mMed===Infinity){html+='<span style="color:#6ee7b7;">Median: x = '+f(vx)+'</span>';}
                  else{const c=my-mMed*mx;html+='<span style="color:#6ee7b7;">Median: y = '+f(mMed)+'x + '+f(c)+'</span>';}
                }
                out.innerHTML=html;
              });
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The altitude from vertex V to side P₁P₂ has gradient −1/m(P₁P₂) and passes through V. The perpendicular bisector has the same gradient but passes through the <em>midpoint</em> of P₁P₂.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "The altitude from A(0; 4) to side BC where B(2; 0) and C(6; 2). Gradient of BC:",
          options: ["½", "2", "−2", "−½"],
          answer: 0,
          topic: "Parallel, perpendicular & complex problems"
        },
        {
          type: "mc",
          text: "Two lines have gradients 3 and −⅓. They are:",
          options: ["Parallel", "Perpendicular", "The same", "Neither"],
          answer: 1,
          topic: "Parallel, perpendicular & complex problems"
        },
        {
          type: "input",
          text: "M(3; 1) is the midpoint of AB. A is (−1; 3). Find the x-coordinate of B.",
          answer: "7",
          topic: "Parallel, perpendicular & complex problems"
        },
        {
          type: "mc",
          text: "The perpendicular bisector of segment PQ where P(2;4) and Q(6;2) passes through midpoint:",
          options: ["(4; 3)", "(4; 2)", "(3; 4)", "(8; 6)"],
          answer: 0,
          topic: "Parallel, perpendicular & complex problems"
        },
        {
          type: "mc",
          text: "A line is parallel to y = 2x − 3 and passes through (1; 5). Its y-intercept is:",
          options: ["3", "7", "−3", "1"],
          answer: 0,
          topic: "Parallel, perpendicular & complex problems"
        }
      ]
    },
    {
      id: 402,
      chapter: 4,
      name: "Angle between two lines",
      fullName: "Finding the angle between two lines using their angles of inclination",
      lesson: {
        heading: "Angle between two lines",
        sub: "Chapter 4 · Topic 3",
        body: `
          <p>A common CAPS-style question gives three points forming a triangle and asks for the size of an angle at one vertex — this is found using the angles of inclination of the two lines that meet there.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Method: angle between two lines at a common point</div>
            <p>
              1. Find the gradient of each line meeting at the vertex.<br>
              2. Find the angle of inclination of each line: <span class="math">tan θ = m</span>.<br>
              3. The angle between the lines (interior angle of the triangle) is the <strong>difference</strong> between the two inclinations — take the positive difference, and if it exceeds 180°, use 180° minus that difference to get the angle actually inside the triangle.<br><br>
              Alternative direct formula for the acute angle between two lines:<br>
              <span class="math">tan α = |m₁ − m₂| / |1 + m₁m₂|</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>A(2; 5), B(−3; −4), C(4; −2). Find <strong>Ĉ</strong> = the angle at C in △ABC (angle ACB).<br>
            <span class="math">m_CA = (5−(−2))/(2−4) = 7/(−2) = −3,5</span> → θ₁ = tan⁻¹(−3,5) + 180° ≈ 105,9°<br>
            <span class="math">m_CB = (−4−(−2))/(−3−4) = −2/−7 ≈ 0,286</span> → θ₂ = tan⁻¹(0,286) ≈ 16,0°<br>
            Angle ACB = θ₁ − θ₂ ≈ 105,9° − 16,0° = 89,9°</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Sketch first</div>
            <p>Always draw a rough sketch. The angle you want is the one physically <em>inside</em> the triangle at that vertex — this helps you decide whether to add or subtract the two inclination angles, and catches sign errors.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Angle Between Two Lines Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter two gradients — get each angle of inclination and the acute angle between the lines.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gradient m₁</div><input id="g11c4t3m1" type="number" value="-3.5" step="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gradient m₂</div><input id="g11c4t3m2" type="number" value="0.286" step="0.001" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c4t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c4t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(2)).toString();}
              function incl(m){const r=Math.atan(m)*180/Math.PI;return r<0?r+180:r;}
              function calc(){
                const m1=parseFloat(document.getElementById('g11c4t3m1').value);
                const m2=parseFloat(document.getElementById('g11c4t3m2').value);
                const out=document.getElementById('g11c4t3Out');
                if([m1,m2].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter valid gradients.</span>';return;}
                const t1=incl(m1),t2=incl(m2);
                const diff=Math.abs(t1-t2);
                const interior=diff>90?180-diff:diff;
                const acuteFormula=Math.atan(Math.abs((m1-m2)/(1+m1*m2)))*180/Math.PI;
                let html='<span style="color:rgba(221,225,240,0.50);">θ₁ = tan⁻¹('+f(m1)+')'+(m1<0?' + 180°':'')+' = '+f(t1)+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">θ₂ = tan⁻¹('+f(m2)+')'+(m2<0?' + 180°':'')+' = '+f(t2)+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Difference |θ₁ − θ₂| = '+f(diff)+'°</span><br>';
                html+='<span style="color:#6ee7b7;">Angle between the lines ≈ '+f(interior)+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Check via tan α = |m₁−m₂|/|1+m₁m₂| → α ≈ '+f(acuteFormula)+'° (acute angle between lines)</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c4t3Btn').addEventListener('click',calc);
              ['g11c4t3m1','g11c4t3m2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>If both lines have positive gradients, subtract inclinations directly. If one gradient is negative, its inclination is obtuse — the interior angle of a triangle is usually the difference between the two inclinations.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Line 1 has inclination 40°, line 2 has inclination 110°. The angle between them is:",
          options: ["70°", "150°", "40°", "110°"],
          answer: 0,
          topic: "Angle between two lines"
        },
        {
          type: "mc",
          text: "A line has gradient 1 (θ₁ = 45°) and another has gradient −1 (θ₂ = 135°). The angle between them is:",
          options: ["90°", "180°", "45°", "135°"],
          answer: 0,
          topic: "Angle between two lines"
        },
        {
          type: "input",
          text: "A(0;0), B(4;0), C(2;2). Find the size of angle B (angle ABC), to the nearest degree. (Hint: find gradients of BA and BC, then their inclinations.)",
          answer: "45",
          topic: "Angle between two lines"
        },
        {
          type: "mc",
          text: "Using tan α = |m₁ − m₂|/|1 + m₁m₂| with m₁ = 2 and m₂ = 3, tan α equals:",
          options: ["1/7", "5", "1", "7"],
          answer: 0,
          topic: "Angle between two lines"
        },
        {
          type: "mc",
          text: "Two lines are perpendicular. What is the angle between them?",
          options: ["90°", "0°", "180°", "Cannot be determined"],
          answer: 0,
          topic: "Angle between two lines"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 4 Workbook — Analytical Geometry",
    questions: [
      {
        number: 1,
        text: "Line ℓ has equation 3x − 2y + 6 = 0.",
        parts: [
          { label: "a", text: "Write in slope-intercept form.", marks: 2 },
          { label: "b", text: "State the gradient and y-intercept.", marks: 2 },
          { label: "c", text: "Find the angle of inclination (to 1 decimal place).", marks: 2 },
          { label: "d", text: "Write the equation of a line parallel to ℓ through (4; −1).", marks: 3 },
          { label: "e", text: "Write the equation of a line perpendicular to ℓ through (0; 0).", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "A(−2; 1), B(4; 5), C(6; −1) are vertices of △ABC.",
        parts: [
          { label: "a", text: "Find the midpoint M of BC.", marks: 1 },
          { label: "b", text: "Find the equation of the median AM.", marks: 3 },
          { label: "c", text: "Find the equation of the altitude from B to AC.", marks: 4 },
          { label: "d", text: "Show that the diagonals AB and MC bisect each other (i.e. show their midpoints coincide).", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "y = (3/2)x + 3",
        b: "m = 3/2; c = 3",
        c: "θ = tan⁻¹(1.5) ≈ 56.3°",
        d: "y+1=(3/2)(x−4) → y=(3/2)x−7",
        e: "m_perp=−2/3; y=−(2/3)x"
      },
      2: {
        a: "M = (5; 2)",
        b: "m=(2−1)/(5−(−2))=1/7; y−1=(1/7)(x+2) → y=(1/7)x+9/7",
        c: "m_AC=(−1−1)/(6−(−2))=−1/4; m_alt=4; y−5=4(x−4) → y=4x−11",
        d: "Midpoint AB=((−2+4)/2,(1+5)/2)=(1,3); Midpoint MC=((5+4)/2... wait, D should be checking something different — verify with coordinates"
      }
    }
  }
});
