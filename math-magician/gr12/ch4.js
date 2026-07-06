// Math Magician — Grade 12, Chapter 4
// Trigonometry — Compound Angles and Double Angles

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 400,
      chapter: 4,
      name: "Compound angle identities",
      fullName: "Compound angle identities and their proofs",
      lesson: {
        heading: "Compound angle identities",
        sub: "Chapter 4 · Topic 1",
        body: `
          <p>Grade 12 Trigonometry introduces the <strong>compound angle formulae</strong> — the most powerful tools in the trig toolkit, used to expand sin/cos of sums and differences of angles.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Compound angle identities (given on formula sheet)</div>
            <p>
              <span class="math">sin(α ± β) = sinα·cosβ ± cosα·sinβ</span><br>
              <span class="math">cos(α + β) = cosα·cosβ − sinα·sinβ</span><br>
              <span class="math">cos(α − β) = cosα·cosβ + sinα·sinβ</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Double angle identities (derived)</div>
            <p>
              Set β = α in the compound formulae:<br>
              <span class="math">sin(2α) = 2sinα·cosα</span><br>
              <span class="math">cos(2α) = cos²α − sin²α = 1 − 2sin²α = 2cos²α − 1</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Exact value</div>
            <p>Evaluate sin 75° without a calculator:<br>
            <span class="math">sin 75° = sin(45° + 30°) = sin45°cos30° + cos45°sin30°</span><br>
            <span class="math">= (√2/2)(√3/2) + (√2/2)(½) = √6/4 + √2/4 = (√6 + √2)/4</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove identity</div>
            <p>Prove: sin(x + 30°) + sin(x − 30°) = sin x<br>
            LHS = sinx·cos30°+cosx·sin30° + sinx·cos30°−cosx·sin30°<br>
            = 2sinx·cos30° = 2sinx·(√3/2) = √3 sinx ≠ sinx<br>
            (This would NOT be true — always verify before assuming!)</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Compound & Double Angle Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter angles α and β — expand sin(α±β), cos(α±β), and double-angle forms.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">α (°)</div><input id="g12c4a" type="number" value="45" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">β (°)</div><input id="g12c4b" type="number" value="30" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Expand</button>
            </div>
            <div id="g12c4Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function d2r(d){return d*π/180;}
              function f(n){return n.toFixed(6);}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const αd=gv('g12c4a'),βd=gv('g12c4b');
                const out=document.getElementById('g12c4Out');
                if(isNaN(αd)||isNaN(βd)){out.innerHTML='<span style="color:#fca5a5;">Enter angles α and β.</span>';return;}
                const α=d2r(αd),β=d2r(βd);
                const sinα=Math.sin(α),cosα=Math.cos(α),sinβ=Math.sin(β),cosβ=Math.cos(β);
                let html='<span style="color:rgba(221,225,240,0.40);">α = '+αd+'°, β = '+βd+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">sin(α+β) = sinα·cosβ+cosα·sinβ = '+f(sinα)+'·'+f(cosβ)+'+'+f(cosα)+'·'+f(sinβ)+'</span>';
                html+='  <span style="color:#6ee7b7;">= '+f(sinα*cosβ+cosα*sinβ)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">sin(α−β) = sinα·cosβ−cosα·sinβ</span>  <span style="color:#6ee7b7;">= '+f(sinα*cosβ-cosα*sinβ)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">cos(α+β) = cosα·cosβ−sinα·sinβ</span>  <span style="color:#6ee7b7;">= '+f(cosα*cosβ-sinα*sinβ)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">cos(α−β) = cosα·cosβ+sinα·sinβ</span>  <span style="color:#6ee7b7;">= '+f(cosα*cosβ+sinα*sinβ)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.40);">— Double angle (using α) —</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">sin(2α) = 2sinα·cosα</span>  <span style="color:#fcd34d;">= '+f(2*sinα*cosα)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">cos(2α) = cos²α−sin²α = 1−2sin²α = 2cos²α−1</span>  <span style="color:#fcd34d;">= '+f(cosα*cosα-sinα*sinα)+'</span>';
                out.innerHTML=html;
              }
              ['g12c4a','g12c4b'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c4Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "cos(A − B) = ", options: ["cosAcosB − sinAsinB", "cosAcosB + sinAsinB", "sinAcosB + cosAsinB", "cosA − cosB"], answer: 1, topic: "Compound angle identities" },
        { type: "mc", text: "sin(2θ) expressed differently:", options: ["sin²θ − cos²θ", "2sinθcosθ", "cos²θ − sin²θ", "2cos²θ − 1"], answer: 1, topic: "Compound angle identities" },
        { type: "mc", text: "Exact value of cos 15° = cos(45° − 30°):", options: ["(√6+√2)/4", "(√6−√2)/4", "(√3+1)/4", "(√3−1)/4"], answer: 0, topic: "Compound angle identities" },
        { type: "mc", text: "cos(2x) in terms of sinx only:", options: ["2cos²x−1", "1−2sin²x", "cos²x−sin²x", "2sinxcosx"], answer: 1, topic: "Compound angle identities" },
        { type: "input", text: "If sinα = 3/5 (α acute), find sin(2α).", answer: "24/25", topic: "Compound angle identities" }
      ]
    },
    {
      id: 401,
      chapter: 4,
      name: "Trig equations & 3D applications",
      fullName: "Solving trig equations with compound angles and 3D trigonometry problems",
      lesson: {
        heading: "Solving trig equations and 3D problems",
        sub: "Chapter 4 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 General solutions of trig equations</div>
            <p>
              For <span class="math">sin x = k</span>: <span class="math">x = arcsin(k) + 360°n</span> or <span class="math">x = 180° − arcsin(k) + 360°n</span><br>
              For <span class="math">cos x = k</span>: <span class="math">x = ±arccos(k) + 360°n</span><br>
              For <span class="math">tan x = k</span>: <span class="math">x = arctan(k) + 180°n</span><br>
              (n ∈ ℤ — the "general solution")<br><br>
              Substitute specific values of n to find solutions in a given interval.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: General solution</div>
            <p>Solve sin(2x + 10°) = cos 40° for x ∈ [0°; 360°]<br>
            cos 40° = sin 50° (co-ratio)<br>
            <span class="math">2x + 10° = 50° + 360°n → x = 20° + 180°n</span><br>
            <span class="math">2x + 10° = 130° + 360°n → x = 60° + 180°n</span><br>
            In [0°; 360°]: x = 20°, 60°, 200°, 240°</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 3D trigonometry</div>
            <p>
              Problems in 3D require identifying <strong>right triangles within the 3D figure</strong> and applying sine rule, cosine rule, or basic trig ratios step by step.<br><br>
              Key strategy: draw each relevant triangle separately with labelled sides and angles.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 General Solution Finder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter sin/cos/tan = k → get the general solution and solutions in [0°; 360°].</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Function</div>
                <select id="g12c4t2fn" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin</option><option value="cos">cos</option><option value="tan">tan</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x = k</div><input id="g12c4t2k" type="number" value="0.5" step="0.01" min="-1" max="1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c4t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
            </div>
            <div id="g12c4t2Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(2));}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gs(id){return document.getElementById(id).value;}
              function calc(){
                const fn=gs('g12c4t2fn'),k=gv('g12c4t2k');
                const out=document.getElementById('g12c4t2Out');
                if(isNaN(k)){out.innerHTML='<span style="color:#fca5a5;">Enter k.</span>';return;}
                const d2r=x=>x*Math.PI/180,r2d=x=>x*180/Math.PI;
                let html='',sols=[];
                if(fn==='sin'){
                  if(k<-1||k>1){out.innerHTML='<span style="color:#fca5a5;">sin x = k requires −1 ≤ k ≤ 1.</span>';return;}
                  const ref=f(r2d(Math.asin(k)));
                  html='<span style="color:rgba(221,225,240,0.50);">General: x = '+ref+'° + 360°n  OR  x = '+(180-ref)+'° + 360°n</span><br>';
                  for(let n=-2;n<=2;n++){[ref+360*n,180-ref+360*n].forEach(v=>{if(v>=0&&v<=360)sols.push(f(v));});}
                } else if(fn==='cos'){
                  if(k<-1||k>1){out.innerHTML='<span style="color:#fca5a5;">cos x = k requires −1 ≤ k ≤ 1.</span>';return;}
                  const ref=f(r2d(Math.acos(k)));
                  html='<span style="color:rgba(221,225,240,0.50);">General: x = ±'+ref+'° + 360°n</span><br>';
                  for(let n=-2;n<=2;n++){[ref+360*n,-ref+360*n].forEach(v=>{if(v>=0&&v<=360)sols.push(f(v));});}
                } else {
                  const ref=f(r2d(Math.atan(k)));
                  html='<span style="color:rgba(221,225,240,0.50);">General: x = '+ref+'° + 180°n</span><br>';
                  for(let n=-3;n<=3;n++){const v=ref+180*n;if(v>=0&&v<=360)sols.push(f(v));}
                }
                const unique=[...new Set(sols.map(String))].map(Number).sort((a,b)=>a-b);
                html+='<span style="color:#6ee7b7;">Solutions in [0°; 360°]: x = '+unique.join('°, ')+'°</span>';
                out.innerHTML=html;
              }
              document.getElementById('g12c4t2k').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g12c4t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "General solution of tan x = 1:", options: ["x = 45° + 360°n", "x = 45° + 180°n", "x = ±45° + 360°n", "x = 135° + 360°n"], answer: 1, topic: "Trig equations & 3D applications" },
        { type: "mc", text: "Solve sin(x − 20°) = ½ for x ∈ [0°; 360°]. The solutions are:", options: ["x = 50° and 130°", "x = 50° and 170°", "x = 70° and 130°", "x = 90° and 70°"], answer: 1, topic: "Trig equations & 3D applications" },
        { type: "mc", text: "In a 3D problem, the angle of elevation from A to the top T of a vertical tower BT is found using:", options: ["tan(angle) = BT/AB", "The cosine rule in 3D", "Two separate 2D right triangles", "The sine rule directly in 3D"], answer: 0, topic: "Trig equations & 3D applications" },
        { type: "mc", text: "Solve: 2sin²x − sinx − 1 = 0 for x ∈ [0°; 360°]", options: ["x = 90°, 210°, 330°", "x = 90°, 210°, 270°", "x = 30°, 150°, 270°", "x = 270°, 210°, 330°"], answer: 0, topic: "Trig equations & 3D applications" },
        { type: "input", text: "sin(x + 45°) = −1 for x ∈ [0°; 360°]. Find x.", answer: "225", altAnswers: ["225°"], topic: "Trig equations & 3D applications" }
      ]
    },
    {
      id: 402,
      chapter: 4,
      name: "Sine, cosine & area rules in 2D and 3D",
      fullName: "Applying the sine rule, cosine rule, and area rule to solve problems in two and three dimensions",
      lesson: {
        heading: "Sine rule, cosine rule, and area rule in 2D/3D",
        sub: "Chapter 4 · Topic 3",
        body: `
          <p>Grade 12 problems often combine the sine rule, cosine rule, and area rule from Grade 11 with 3D reasoning — extracting flat triangles from a 3D figure one at a time.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The three rules (formula-sheet reminder)</div>
            <p>
              <strong>Sine rule:</strong> <span class="math">a/sinA = b/sinB = c/sinC</span><br>
              <strong>Cosine rule:</strong> <span class="math">a² = b² + c² − 2bc·cosA</span><br>
              <strong>Area rule:</strong> <span class="math">Area = ½ab·sinC</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Strategy for 3D problems</div>
            <p>
              1. Identify the vertical/horizontal triangle and any triangle that is NOT right-angled — this is usually where the sine or cosine rule is needed.<br>
              2. Redraw each triangle separately, in 2D, labelling every known side/angle.<br>
              3. Work from the triangle with the most known information towards the unknown you need.<br>
              4. A common pattern: use the sine rule in the horizontal (or slanted) triangle to find a side, then use basic right-triangle trig (tan) in the vertical triangle to find a height.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Tower problem</div>
            <p>TP is a vertical tower of height h. From point Q on the ground, angle of elevation to T is x. QR = a, and angle PQR = 150° (angle TQP is x, angle at Q in triangle PQR is 150°).<br>
            In triangle PQR (horizontal): use the sine or cosine rule to find PQ using the known angle 150° and side a.<br>
            Then in right triangle TPQ: h = PQ·tan(x).<br>
            This "find one side first via sine/cosine rule, then use right-triangle trig for height" pattern is the classic Grade 12 3D structure.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Cosine rule with algebra</div>
            <p>In ΔABC, a = c−1, b = c+1 (sides in terms of c). Using the cosine rule for angle C = 60°:<br>
            <span class="math">c² = a² + b² − 2ab·cos60° = (c−1)² + (c+1)² − (c−1)(c+1)</span><br>
            Simplify to find c algebraically — a common "prove/show that" style question.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Triangle Solver (Sine / Cosine / Area Rule)</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter two sides and the included angle C — find the third side, the other angles, and the area.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Side a</div><input id="g12c4t3a" type="number" value="8" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Side b</div><input id="g12c4t3b" type="number" value="10" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle C (°, included)</div><input id="g12c4t3C" type="number" value="55" min="0.1" max="179.9" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c4t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve Triangle</button>
            </div>
            <div id="g12c4t3Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c4t3a'),b=gv('g12c4t3b'),C=gv('g12c4t3C');
                const out=document.getElementById('g12c4t3Out');
                if([a,b,C].some(isNaN)||a<=0||b<=0||C<=0||C>=180){out.innerHTML='<span style="color:#fca5a5;">Enter positive sides and 0 &lt; C &lt; 180°.</span>';return;}
                const Cr=C*Math.PI/180;
                const c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(Cr));
                const area=0.5*a*b*Math.sin(Cr);
                // sine rule for angle A: sinA/a = sinC/c
                const sinA=a*Math.sin(Cr)/c;
                const A=Math.asin(Math.min(1,sinA))*180/Math.PI;
                const B=180-C-A;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Cosine rule: c² = a²+b²−2ab·cosC = '+f(a*a)+'+'+f(b*b)+'−2('+a+')('+b+')cos('+C+'°)</span><br>'+
                  '<span style="color:#6ee7b7;">c = '+f(c)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Sine rule: sinA/a = sinC/c → A ≈ '+f(A)+'°,  B ≈ '+f(B)+'°</span><br>'+
                  '<span style="color:#fcd34d;">Area = ½ab·sinC = ½('+a+')('+b+')sin('+C+'°) = '+f(area)+' units²</span>';
              }
              ['g12c4t3a','g12c4t3b','g12c4t3C'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c4t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "The area rule for a triangle with sides a, b and included angle C is:", options: ["½ab·sinC", "½ab·cosC", "abc/2", "½(a+b)sinC"], answer: 0, topic: "Sine, cosine & area rules in 2D and 3D" },
        { type: "mc", text: "The cosine rule is most useful when you know:", options: ["Two angles and one side", "Three angles only", "Two sides and the included angle (or three sides)", "One side and one angle only"], answer: 2, topic: "Sine, cosine & area rules in 2D and 3D" },
        { type: "input", text: "Triangle with a = 6, b = 9, included angle C = 60°. Find the area (2 dp).", answer: "23.38", altAnswers: ["23,38"], topic: "Sine, cosine & area rules in 2D and 3D" },
        { type: "mc", text: "In a typical 3D tower problem, after finding a horizontal side using the sine or cosine rule, the height is usually found using:", options: ["The area rule", "Right-triangle trig (e.g. tan)", "The compound angle identities", "Another cosine rule application"], answer: 1, topic: "Sine, cosine & area rules in 2D and 3D" },
        { type: "input", text: "Triangle with sides a = 6, b = 8, c = 10. Use the cosine rule to find angle C (opposite side c), to the nearest degree.", answer: "90", topic: "Sine, cosine & area rules in 2D and 3D" },
        { type: "mc", text: "The sine rule states a/sinA = b/sinB = c/sinC. This ratio also equals:", options: ["2R (R = circumradius)", "The triangle's area", "a + b + c", "The perimeter divided by 2"], answer: 0, topic: "Sine, cosine & area rules in 2D and 3D" }
      ]
    },
    {
      id: 403,
      chapter: 4,
      name: "Proving trigonometric identities",
      fullName: "Techniques for proving trig identities using compound and double angle formulae",
      lesson: {
        heading: "Proving trigonometric identities",
        sub: "Chapter 4 · Topic 4",
        body: `
          <p>"Prove" or "show that" questions require a logical chain of algebraic steps from one side of an identity to the other, using known identities — not just checking with numbers.</p>

          <div class="def-box">
            <div class="def-box-title">📖 General strategy</div>
            <p>
              1. Start with the more complicated side (usually the LHS).<br>
              2. Expand any compound or double angles using the standard identities.<br>
              3. Simplify using algebra (factorising, common denominators) and the identity <span class="math">sin²θ + cos²θ = 1</span> where useful.<br>
              4. Keep working until you reach exactly the other side. Never work on both sides at once and "meet in the middle" — write it as one continuous chain.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove sin2A/(1+cos2A) = tanA</div>
            <p><span class="math">LHS = 2sinAcosA / (1 + 2cos²A − 1) = 2sinAcosA / 2cos²A = sinA/cosA = tanA = RHS</span> ✓</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove (cosx − sinx)² = 1 − sin2x</div>
            <p><span class="math">LHS = cos²x − 2sinxcosx + sin²x = (cos²x+sin²x) − 2sinxcosx = 1 − sin2x = RHS</span> ✓</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Common building blocks</div>
            <p>
              • sin2A = 2sinAcosA<br>
              • cos2A = cos²A − sin²A = 1 − 2sin²A = 2cos²A − 1 (three interchangeable forms — pick whichever matches the rest of the expression)<br>
              • Watch for a "difference of squares" pattern: (cosA−sinA)(cosA+sinA) = cos²A − sin²A = cos2A
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Identity Checker (numeric verification)</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Pick a claimed identity and a test angle — see both sides evaluated to check they truly match (a numeric sanity check, not a substitute for an algebraic proof).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Identity</div>
                <select id="g12c4t4id" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;max-width:260px;">
                  <option value="i1">sin2A/(1+cos2A) = tanA</option>
                  <option value="i2">(cosA−sinA)² = 1−sin2A</option>
                  <option value="i3">cos2A = 1−2sin²A</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A (°)</div><input id="g12c4t4A" type="number" value="35" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c4t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Check</button>
            </div>
            <div id="g12c4t4Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gs(id){return document.getElementById(id).value;}
              function f(n){return parseFloat(n.toFixed(6));}
              function calc(){
                const id=gs('g12c4t4id'),Ad=gv('g12c4t4A');
                const out=document.getElementById('g12c4t4Out');
                if(isNaN(Ad)){out.innerHTML='<span style="color:#fca5a5;">Enter an angle.</span>';return;}
                const A=Ad*Math.PI/180;
                const s=Math.sin(A),c=Math.cos(A);
                let lhs,rhs,label;
                if(id==='i1'){
                  label='sin2A/(1+cos2A) vs tanA';
                  const denom=1+(2*c*c-1);
                  lhs=Math.abs(denom)<1e-9?NaN:(2*s*c)/denom;
                  rhs=Math.tan(A);
                } else if(id==='i2'){
                  label='(cosA−sinA)² vs 1−sin2A';
                  lhs=(c-s)*(c-s);
                  rhs=1-2*s*c;
                } else {
                  label='cos2A vs 1−2sin²A';
                  lhs=c*c-s*s;
                  rhs=1-2*s*s;
                }
                const match=!isNaN(lhs)&&Math.abs(lhs-rhs)<1e-6;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+label+',  A = '+Ad+'°</span><br>'+
                  '<span style="color:#fcd34d;">LHS = '+(isNaN(lhs)?'undefined':f(lhs))+'</span><br>'+
                  '<span style="color:#6ee7b7;">RHS = '+f(rhs)+'</span><br>'+
                  (match?'<span style="color:#6ee7b7;">✅ Matches — consistent with the identity being true.</span>':'<span style="color:#fca5a5;">⚠ Does not match at this angle (or undefined) — check for restrictions.</span>');
              }
              document.getElementById('g12c4t4A').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g12c4t4id').addEventListener('change',calc);
              document.getElementById('g12c4t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "To prove an identity, the standard approach is to:", options: ["Substitute one number and stop", "Work from the more complex side to reach the other side algebraically", "Work on both sides simultaneously and meet in the middle", "Assume the identity is true without proof"], answer: 1, topic: "Proving trigonometric identities" },
        { type: "mc", text: "Simplify: sin2A/(1 + cos2A)", options: ["tanA", "cotA", "sinA", "2tanA"], answer: 0, topic: "Proving trigonometric identities" },
        { type: "mc", text: "(cosA − sinA)² simplifies to:", options: ["1 + sin2A", "1 − sin2A", "cos2A", "1 − 2cos2A"], answer: 1, topic: "Proving trigonometric identities" },
        { type: "input", text: "Simplify (sinA + cosA)² − 1 in terms of a double angle.", answer: "sin2A", altAnswers: ["sin(2A)"], topic: "Proving trigonometric identities" },
        { type: "mc", text: "Which identity is NOT a valid form of cos2A?", options: ["cos²A − sin²A", "1 − 2sin²A", "2cos²A − 1", "2cosA·sinA"], answer: 3, topic: "Proving trigonometric identities" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 4 Workbook — Trigonometry",
    questions: [
      { number: 1, text: "Without a calculator:", parts: [
        { label: "a", text: "Evaluate sin 105° using sin(60° + 45°).", marks: 4 },
        { label: "b", text: "Evaluate cos 2(30°) using each of the three double angle forms.", marks: 4 }
      ]},
      { number: 2, text: "Prove the following identities:", parts: [
        { label: "a", text: "cos(x + 45°) + cos(x − 45°) = √2 cos x", marks: 4 },
        { label: "b", text: "sin(A + B)/sin(A − B) = (tanA + tanB)/(tanA − tanB)", marks: 5 }
      ]},
      { number: 3, text: "Solve for x ∈ [0°; 360°]:", parts: [
        { label: "a", text: "cos(2x) = cos x", marks: 5 },
        { label: "b", text: "sin(x + 30°) = cos x", marks: 5 }
      ]}
    ],
    answers: {
      1: { a: "sin105°=sin60°cos45°+cos60°sin45°=(√3/2)(√2/2)+(½)(√2/2)=√6/4+√2/4=(√6+√2)/4", b: "cos60°=cos²30°−sin²30°=¾−¼=½; =1−2sin²30°=1−½=½; =2cos²30°−1=3/2−1=½ ✓" },
      2: { a: "LHS=(cosxcos45°−sinxsin45°)+(cosxcos45°+sinxsin45°)=2cosxcos45°=2cosx(√2/2)=√2cosx=RHS", b: "LHS=(sinAcosB+cosAsinB)/(sinAcosB−cosAsinB); divide numerator and denominator by cosAcosB → (tanA+tanB)/(tanA−tanB)=RHS" },
      3: { a: "cos2x=cosx→2cos²x−1=cosx→2cos²x−cosx−1=0→(2cosx+1)(cosx−1)=0→cosx=−½or1→x=120°,240°,0°,360°", b: "sinxcos30°+cosxsin30°=cosx→(√3/2)sinx+(½)cosx=cosx→(√3/2)sinx=½cosx→tanx=1/√3→x=30°,210°" }
    }
  }
});
