// Math Magician — Grade 12, Chapter 7
// Analytical Geometry — Circles and Tangents

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 700,
      chapter: 7,
      name: "Equation of a circle",
      fullName: "Standard and general form of a circle, centre and radius",
      lesson: {
        heading: "Equation of a circle",
        sub: "Chapter 7 · Topic 1",
        body: `
          <p>Grade 12 Analytical Geometry introduces the <strong>circle</strong> as a curve defined by an equation, and the tangent line to a circle at a given point.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Standard form (centre at origin)</div>
            <p>
              <span class="math">x² + y² = r²</span><br>
              Centre: (0, 0), radius r
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Standard form (centre at (a, b))</div>
            <p>
              <span class="math">(x − a)² + (y − b)² = r²</span><br>
              Centre: (a, b), radius r<br><br>
              To find centre and radius from a point on the circle, use the distance formula:<br>
              <span class="math">r = √[(x−a)² + (y−b)²]</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 General form → Standard form (completing the square)</div>
            <p>
              <span class="math">x² + y² + Dx + Ey + F = 0</span><br>
              Complete the square for x and y separately:<br>
              <span class="math">x² + Dx = (x + D/2)² − (D/2)²</span><br><br>
              Example: x² + y² − 6x + 4y − 3 = 0<br>
              → (x−3)² − 9 + (y+2)² − 4 − 3 = 0<br>
              → (x−3)² + (y+2)² = 16<br>
              Centre: (3, −2), radius: 4
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Circle Equation Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter x²+y²+Dx+Ey+F=0 — complete the square to find centre, radius, and check a point.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">D (coeff x)</div><input id="g12c7D" type="number" value="-6" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">E (coeff y)</div><input id="g12c7E" type="number" value="4" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">F (const)</div><input id="g12c7F" type="number" value="-3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Test point x</div><input id="g12c7px" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Test point y</div><input id="g12c7py" type="number" value="-1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c7Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Analyse</button>
            </div>
            <div id="g12c7Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const D=gv('g12c7D'),E=gv('g12c7E'),F=gv('g12c7F'),px=gv('g12c7px'),py=gv('g12c7py');
                const out=document.getElementById('g12c7Out');
                if([D,E,F].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter D, E, F.</span>';return;}
                const a=-D/2,b=-E/2;
                const r2=a*a+b*b-F;
                if(r2<=0){out.innerHTML='<span style="color:#fca5a5;">Not a valid circle (r² = '+f4(r2)+' ≤ 0).</span>';return;}
                const r=Math.sqrt(r2);
                let html='<span style="color:rgba(221,225,240,0.50);">x²+y²+('+D+')x+('+E+')y+('+F+') = 0</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">(x+('+D+'/2))²−'+(D/2)*(D/2)+' + (y+('+E+'/2))²−'+(E/2)*(E/2)+' + '+F+' = 0</span><br>';
                html+='<span style="color:#fcd34d;">(x−'+f4(a)+')² + (y−'+f4(b)+')² = '+f4(r2)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Centre: ('+f4(a)+'; '+f4(b)+')   Radius: '+f4(r)+'</span>';
                if(!isNaN(px)&&!isNaN(py)){
                  const dist2=(px-a)*(px-a)+(py-b)*(py-b);
                  const pos=dist2<r2-1e-9?'INSIDE':dist2>r2+1e-9?'OUTSIDE':'ON';
                  html+='<br><span style="color:rgba(221,225,240,0.50);">Point ('+px+';'+py+'): dist² = '+f4(dist2)+', r² = '+f4(r2)+'</span>';
                  html+='<br><span style="color:'+(pos==='ON'?'#6ee7b7':pos==='INSIDE'?'#fcd34d':'rgba(221,225,240,0.60)')+';">Point is '+pos+' the circle</span>';
                }
                out.innerHTML=html;
              }
              ['g12c7D','g12c7E','g12c7F','g12c7px','g12c7py'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c7Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Circle: (x − 2)² + (y + 3)² = 25. Centre and radius:", options: ["(2, −3), r=5", "(−2, 3), r=5", "(2, −3), r=25", "(2, 3), r=5"], answer: 0, topic: "Equation of a circle" },
        { type: "mc", text: "x² + y² = 49. Does point (3, 6) lie on, inside, or outside the circle?", options: ["On", "Inside", "Outside", "Cannot determine"], answer: 1, topic: "Equation of a circle" },
        { type: "input", text: "Write the equation of a circle with centre (−1, 4) and radius 3.", answer: "(x+1)²+(y-4)²=9", altAnswers: ["(x+1)² + (y-4)² = 9"], topic: "Equation of a circle" },
        { type: "mc", text: "x² + y² − 4x + 6y − 12 = 0 in standard form:", options: ["(x−2)²+(y+3)²=25", "(x+2)²+(y−3)²=25", "(x−2)²+(y+3)²=16", "(x−4)²+(y+6)²=12"], answer: 0, topic: "Equation of a circle" },
        { type: "mc", text: "A circle has centre (0, 0) and passes through (5, 12). Its radius is:", options: ["17", "13", "7", "√17"], answer: 1, topic: "Equation of a circle" },
        { type: "input", text: "A circle passes through A(1; 2) and B(1; −4), and its centre lies on the line y = x − 2. Find the centre of the circle. Give just the x-coordinate.", answer: "1", topic: "Equation of a circle" }
      ]
    },
    {
      id: 701,
      chapter: 7,
      name: "Tangent to a circle",
      fullName: "Equation of a tangent to a circle at a given point",
      lesson: {
        heading: "Tangent to a circle",
        sub: "Chapter 7 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Key property: tangent ⊥ radius</div>
            <p>
              The tangent to a circle at point P is <strong>perpendicular to the radius</strong> at P.<br><br>
              Method to find tangent at P(x₁, y₁) on circle with centre C(a, b):<br>
              1. Find gradient of radius CP: <span class="math">m_r = (y₁ − b)/(x₁ − a)</span><br>
              2. Gradient of tangent: <span class="math">m_t = −1/m_r</span><br>
              3. Equation of tangent: <span class="math">y − y₁ = m_t(x − x₁)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>Circle: (x − 1)² + (y − 2)² = 25. Tangent at P(4, 6).<br>
            m_radius = (6−2)/(4−1) = 4/3<br>
            m_tangent = −3/4<br>
            Tangent: y − 6 = −¾(x − 4)<br>
            y = −¾x + 9</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Tangent from external point</div>
            <p>
              From an external point P, two tangents can be drawn to a circle.<br>
              Both have equal length (circle theorem from Gr 11).<br>
              To find the tangent lines: set up the perpendicularity condition and distance condition simultaneously.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Checking if a line is a tangent</div>
            <p>
              Substitute the line into the circle equation and get a quadratic in x.<br>
              If discriminant Δ = 0: the line is a tangent.<br>
              If Δ > 0: two intersection points (secant).<br>
              If Δ &lt; 0: no intersection.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Tangent to Circle Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter circle centre (a;b), radius r, and the point of tangency P(x₁;y₁) — find the tangent line.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Centre a</div><input id="g12c7t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Centre b</div><input id="g12c7t2b" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Point x₁</div><input id="g12c7t2x1" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Point y₁</div><input id="g12c7t2y1" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c7t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find Tangent</button>
            </div>
            <div id="g12c7t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c7t2a'),b=gv('g12c7t2b'),x1=gv('g12c7t2x1'),y1=gv('g12c7t2y1');
                const out=document.getElementById('g12c7t2Out');
                if([a,b,x1,y1].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter all values.</span>';return;}
                const dx=x1-a,dy=y1-b;
                if(dx===0&&dy===0){out.innerHTML='<span style="color:#fca5a5;">Point equals centre — not on the circle.</span>';return;}
                if(dx===0){
                  // vertical radius → horizontal tangent
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Radius is vertical → tangent is horizontal</span><br><span style="color:#6ee7b7;">Tangent: y = '+y1+'</span>';return;
                }
                const mr=dy/dx;
                const mt=-1/mr;
                const yint=y1-mt*x1;
                let html='<span style="color:rgba(221,225,240,0.50);">m_radius = ('+y1+'−'+b+')/('+x1+'−'+a+') = '+f4(mr)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">m_tangent = −1/m_r = '+f4(mt)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">y − '+y1+' = '+f4(mt)+'(x − '+x1+')</span><br>';
                html+='<span style="color:#6ee7b7;">Tangent: y = '+f4(mt)+'x + '+f4(yint)+'</span>';
                out.innerHTML=html;
              }
              ['g12c7t2a','g12c7t2b','g12c7t2x1','g12c7t2y1'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c7t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Tangent at (3, 4) on circle x² + y² = 25. Radius gradient = 4/3. Tangent gradient =", options: ["4/3", "3/4", "−3/4", "−4/3"], answer: 2, topic: "Tangent to a circle" },
        { type: "mc", text: "To confirm a line is tangent to a circle, the discriminant when substituted must equal:", options: ["0", "1", "> 0", "< 0"], answer: 0, topic: "Tangent to a circle" },
        { type: "mc", text: "Circle: x² + y² = 10. Tangent at (1, 3):", options: ["x + 3y = 10", "3x + y = 10", "x + 3y = 10 and 3x + y = 10", "x − 3y = 10"], answer: 0, topic: "Tangent to a circle" },
        { type: "mc", text: "Circle centre (2, −1), point P(5, 3) on circle. Gradient of radius CP:", options: ["3/4", "4/3", "−3/4", "−4/3"], answer: 1, topic: "Tangent to a circle" },
        { type: "input", text: "Tangent at (0, 4) on circle x² + (y−1)² = 9. What is the gradient of the tangent?", answer: "0", topic: "Tangent to a circle" },
        { type: "mc", text: "Circle: x² + y² = 20. Is the line y = 2x − 10 a tangent, a secant, or does it miss the circle?", options: ["Tangent (touches at (4; −2))", "Secant (two intersection points)", "Misses the circle entirely", "Passes through the centre"], answer: 0, topic: "Tangent to a circle" }
      ]
    },
    {
      id: 702,
      chapter: 7,
      name: "Lines, chords & circles",
      fullName: "A line intersecting a circle, chord length, and the perpendicular from the centre to a chord",
      lesson: {
        heading: "Lines, chords, and circles",
        sub: "Chapter 7 · Topic 3",
        body: `
          <p>A straight line can intersect a circle in <strong>two points</strong> (a secant, forming a chord), touch it at exactly <strong>one point</strong> (a tangent), or miss it entirely.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Finding intersection points</div>
            <p>
              To find where a line y = mx + k meets a circle, substitute the line into the circle's equation to get a quadratic in x, then solve.<br><br>
              Discriminant Δ = b² − 4ac tells you:<br>
              Δ &gt; 0: line is a <strong>secant</strong> — two intersection points<br>
              Δ = 0: line is a <strong>tangent</strong> — one point (touches)<br>
              Δ &lt; 0: line misses the circle entirely
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Chord length and the perpendicular bisector</div>
            <p>
              A <strong>chord</strong> is a line segment joining two points on a circle.<br>
              The perpendicular from the centre of a circle to a chord <strong>bisects the chord</strong> (this is why the midpoint of A and B, where AB is a chord, lies on the perpendicular from the centre).<br><br>
              Chord length: use the distance formula between the two intersection points, or use<br>
              <span class="math">chord = 2√(r² − d²)</span> where d is the perpendicular distance from the centre to the chord.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>Line y = x + 2 meets circle x² + y² = 10 at A and B.<br>
            Substitute: x² + (x+2)² = 10 → 2x² + 4x − 6 = 0 → x² + 2x − 3 = 0 → (x+3)(x−1) = 0<br>
            x = −3 → y = −1;  x = 1 → y = 3<br>
            A(−3, −1), B(1, 3).  Midpoint M = (−1, 1).<br>
            Since O is the centre (0,0), OM ⊥ AB can be checked: m_OM × m_AB = (−1)×(1) = −1 ✓</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Exam strategy</div>
            <p>
              Whenever a question mentions the midpoint of a chord, immediately think: "the line from the centre to this midpoint is perpendicular to the chord." This unlocks most chord-geometry proofs.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Line–Circle Intersection Explorer</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter circle x²+y²=r² and line y=mx+k — find whether it's a secant, tangent, or misses, and the intersection points.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r (radius)</div><input id="g12c7t3r" type="number" value="5" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">m (gradient)</div><input id="g12c7t3m" type="number" value="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">k (y-int)</div><input id="g12c7t3k" type="number" value="2" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c7t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Analyse</button>
            </div>
            <div id="g12c7t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const r=gv('g12c7t3r'),m=gv('g12c7t3m'),k=gv('g12c7t3k');
                const out=document.getElementById('g12c7t3Out');
                if([r,m,k].some(isNaN)||r<=0){out.innerHTML='<span style="color:#fca5a5;">Enter a positive radius and valid m, k.</span>';return;}
                // x² + (mx+k)² = r² → (1+m²)x² + 2mk x + (k²-r²) = 0
                const A=1+m*m,B=2*m*k,C=k*k-r*r;
                const disc=B*B-4*A*C;
                let html='<span style="color:rgba(221,225,240,0.50);">('+f4(A)+')x² + ('+f4(B)+')x + ('+f4(C)+') = 0,  Δ = '+f4(disc)+'</span><br>';
                if(disc<0){
                  html+='<span style="color:#fca5a5;">Δ &lt; 0 → the line misses the circle entirely.</span>';
                } else if(Math.abs(disc)<1e-9){
                  const x0=-B/(2*A),y0=m*x0+k;
                  html+='<span style="color:#6ee7b7;">Δ = 0 → line is a TANGENT, touching at ('+f4(x0)+'; '+f4(y0)+')</span>';
                } else {
                  const x1=(-B+Math.sqrt(disc))/(2*A),x2=(-B-Math.sqrt(disc))/(2*A);
                  const y1=m*x1+k,y2=m*x2+k;
                  const chord=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
                  html+='<span style="color:#6ee7b7;">Δ &gt; 0 → SECANT, meeting at ('+f4(x1)+'; '+f4(y1)+') and ('+f4(x2)+'; '+f4(y2)+')</span><br>';
                  html+='<span style="color:#fcd34d;">Chord length = '+f4(chord)+'   Midpoint M = ('+f4((x1+x2)/2)+'; '+f4((y1+y2)/2)+')</span>';
                }
                out.innerHTML=html;
              }
              ['g12c7t3r','g12c7t3m','g12c7t3k'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c7t3Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Line y = x + 1 meets circle x² + y² = 13. The discriminant of the resulting quadratic tells us:", options: ["The gradient of the tangent", "Whether the line is a secant, tangent, or misses the circle", "The radius of the circle", "The centre of the circle"], answer: 1, topic: "Lines, chords & circles" },
        { type: "mc", text: "AB is a chord of a circle with centre O. M is the midpoint of AB. The relationship between OM and AB is:", options: ["OM ∥ AB", "OM ⊥ AB", "OM = AB", "No fixed relationship"], answer: 1, topic: "Lines, chords & circles" },
        { type: "input", text: "A chord is at perpendicular distance 3 units from the centre of a circle of radius 5. Find the chord length.", answer: "8", topic: "Lines, chords & circles" },
        { type: "mc", text: "Substituting a line into a circle's equation gives 2x² − 4x + 6 = 0. Since Δ &lt; 0, the line:", options: ["Is a tangent", "Is a secant with two points", "Does not intersect the circle", "Passes through the centre"], answer: 2, topic: "Lines, chords & circles" },
        { type: "mc", text: "Circle x² + y² = 25. Line y = 7 − x meets it at two points. The x-coordinates satisfy:", options: ["2x² − 14x + 24 = 0", "x² − 7x + 24 = 0", "2x² − 14x + 49 = 0", "x² + 7x − 24 = 0"], answer: 0, topic: "Lines, chords & circles" },
        { type: "input", text: "A chord of the circle x² + y² = 50 has midpoint (3; 4). Find the equation of the line containing this chord, in the form 3x + 4y = k (state k).", answer: "25", topic: "Lines, chords & circles" }
      ]
    },
    {
      id: 703,
      chapter: 7,
      name: "Tangents from an external point",
      fullName: "Finding the equations of tangents drawn from a point outside the circle, and tangents parallel to a given line",
      lesson: {
        heading: "Tangents from an external point",
        sub: "Chapter 7 · Topic 4",
        body: `
          <p>From any point <strong>outside</strong> a circle, exactly <strong>two tangent lines</strong> can be drawn to the circle, and (by the Grade 11 circle theorem) they are equal in length.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Method: tangent(s) parallel to a given line</div>
            <p>
              If a tangent must be <strong>parallel</strong> to a line with gradient m, then the tangent has the same gradient m.<br>
              Substitute y = mx + c into the circle equation, and set the discriminant Δ = 0 to solve for c. There are usually <strong>two values of c</strong> (tangents on opposite sides of the circle).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: tangents parallel to a line</div>
            <p>Find the tangents to x² + y² = 20 parallel to y = 2x.<br>
            Tangent: y = 2x + c → x² + (2x+c)² = 20 → 5x² + 4cx + (c²−20) = 0<br>
            Δ = 0: 16c² − 20(c²−20) = 0 → −4c² + 400 = 0 → c² = 100 → c = ±10<br>
            Tangents: y = 2x + 10 and y = 2x − 10</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Tangents from an external point P(x₁, y₁)</div>
            <p>
              A tangent from P has equation y − y₁ = m(x − x₁) for unknown gradient m.<br>
              Substitute into the circle equation and set Δ = 0 — this gives a quadratic (or equation) in m, usually with two solutions (the two tangents from P).
            </p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Two tangents, equal length</div>
            <p>
              If PA and PB are tangents from external point P to a circle with centre O, touching at A and B, then PA = PB, and OP bisects ∠APB (this follows from congruent right triangles OAP and OBP).
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Parallel Tangents Finder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Circle x²+y²=r², find the two tangents parallel to a line of given gradient m.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r (radius)</div><input id="g12c7t4r" type="number" value="4" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">m (gradient)</div><input id="g12c7t4m" type="number" value="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c7t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find tangents</button>
            </div>
            <div id="g12c7t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const r=gv('g12c7t4r'),m=gv('g12c7t4m');
                const out=document.getElementById('g12c7t4Out');
                if([r,m].some(isNaN)||r<=0){out.innerHTML='<span style="color:#fca5a5;">Enter a positive radius and a gradient m.</span>';return;}
                // x²+(mx+c)²=r² → (1+m²)x²+2mcx+(c²-r²)=0; Δ=0 → 4m²c²-4(1+m²)(c²-r²)=0 → c² = r²(1+m²)
                const c2=r*r*(1+m*m);
                const c=Math.sqrt(c2);
                let html='<span style="color:rgba(221,225,240,0.50);">Circle: x² + y² = '+(r*r)+'   Tangent form: y = '+m+'x + c</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Δ = 0 gives c² = r²(1+m²) = '+f4(c2)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Tangent 1: y = '+m+'x + '+f4(c)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Tangent 2: y = '+m+'x − '+f4(c)+'</span>';
                out.innerHTML=html;
              }
              ['g12c7t4r','g12c7t4m'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c7t4Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "How many tangents can be drawn to a circle from a point outside the circle?", options: ["1", "2", "0", "Infinitely many"], answer: 1, topic: "Tangents from an external point" },
        { type: "mc", text: "PA and PB are tangents from external point P to a circle, touching at A and B. Which statement is true?", options: ["PA ≠ PB in general", "PA = PB always", "PA ∥ PB", "∠PAB = 90°"], answer: 1, topic: "Tangents from an external point" },
        { type: "input", text: "Find c &gt; 0: y = x + c is tangent to x² + y² = 8.", answer: "4", topic: "Tangents from an external point" },
        { type: "mc", text: "To find tangents to a circle parallel to a given line, you:", options: ["Use the same gradient and solve Δ=0 for the y-intercept", "Use a perpendicular gradient", "Find the centre only", "Use the midpoint of the line"], answer: 0, topic: "Tangents from an external point" },
        { type: "mc", text: "Circle x² + y² = 20. Tangents parallel to y = 2x are y = 2x + c. The two values of c are:", options: ["±5", "±10", "±20", "±4"], answer: 1, topic: "Tangents from an external point" },
        { type: "input", text: "Find the equations of the tangents to x² + y² = 25 that are parallel to the line 3x + 4y = 7, in the form 3x + 4y = k. Give the positive value of k.", answer: "25", topic: "Tangents from an external point" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 7 Workbook — Analytical Geometry",
    questions: [
      { number: 1, text: "Circle: x² + y² − 8x + 2y + 8 = 0", parts: [
        { label: "a", text: "Write in standard form by completing the square.", marks: 4 },
        { label: "b", text: "State the centre and radius.", marks: 2 },
        { label: "c", text: "Does point (6, −1) lie on, inside, or outside the circle?", marks: 2 }
      ]},
      { number: 2, text: "Circle with centre C(3, 1) passes through A(−1, 4).", parts: [
        { label: "a", text: "Find the radius.", marks: 2 },
        { label: "b", text: "Write the equation of the circle.", marks: 2 },
        { label: "c", text: "Find the equation of the tangent to the circle at A.", marks: 4 }
      ]},
      { number: 3, text: "Line y = 2x + k is a tangent to the circle x² + y² = 5.", parts: [
        { label: "a", text: "Substitute the line into the circle equation.", marks: 2 },
        { label: "b", text: "Use Δ = 0 to find k.", marks: 3 },
        { label: "c", text: "Write both tangent equations.", marks: 1 }
      ]}
    ],
    answers: {
      1: { a: "(x−4)²−16+(y+1)²−1+8=0→(x−4)²+(y+1)²=9", b: "Centre (4,−1); r=3", c: "(6−4)²+(−1+1)²=4<9→inside" },
      2: { a: "r=√[(−1−3)²+(4−1)²]=√(16+9)=5", b: "(x−3)²+(y−1)²=25", c: "m_CA=(4−1)/(−1−3)=−3/4; m_tan=4/3; y−4=(4/3)(x+1)→y=(4/3)x+16/3" },
      3: { a: "x²+(2x+k)²=5→5x²+4kx+k²−5=0", b: "Δ=16k²−20(k²−5)=0→−4k²+100=0→k²=25→k=±5", c: "y=2x+5 and y=2x−5" }
    }
  }
});
