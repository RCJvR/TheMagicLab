// Math Magician — Grade 12, Chapter 5
// Polynomials — Remainder Theorem, Factor Theorem, Cubic Equations

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 500,
      chapter: 5,
      name: "Remainder & factor theorems",
      fullName: "Polynomial division, remainder theorem, and factor theorem",
      lesson: {
        heading: "Remainder theorem and factor theorem",
        sub: "Chapter 5 · Topic 1",
        body: `
          <p>The <strong>remainder theorem</strong> and <strong>factor theorem</strong> allow us to work with polynomials efficiently without long division.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Remainder theorem</div>
            <p>
              When polynomial p(x) is divided by (x − a), the remainder is <span class="math">p(a)</span>.<br><br>
              If the remainder is 0, then (x − a) is a <strong>factor</strong> of p(x).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Factor theorem</div>
            <p>
              (x − a) is a factor of p(x) if and only if <span class="math">p(a) = 0</span>.<br><br>
              To find factors of a cubic p(x) = ax³ + bx² + cx + d:<br>
              1. Test factors of <span class="math">d/a</span> (rational root theorem)<br>
              2. Once one factor (x − a) is found, divide to get a quadratic<br>
              3. Factorise the quadratic
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>p(x) = x³ − 2x² − 5x + 6<br>
            Test x = 1: p(1) = 1 − 2 − 5 + 6 = 0 ✓ → (x − 1) is a factor<br>
            Divide: p(x) = (x − 1)(x² − x − 6) = (x − 1)(x − 3)(x + 2)<br>
            Roots: x = 1, 3, −2</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Synthetic division (short method)</div>
            <p>
              To divide p(x) by (x − a): write coefficients of p(x), bring down first, then multiply by a and add repeatedly.<br>
              The last number is the remainder.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Remainder / Factor Theorem Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter coefficients of p(x) = ax³+bx²+cx+d and a value — compute p(a) (the remainder).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (x³)</div><input id="g12c5a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (x²)</div><input id="g12c5b" type="number" value="-2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (x)</div><input id="g12c5c" type="number" value="-5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d (const)</div><input id="g12c5d" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Divide by (x−k), k=</div><input id="g12c5k" type="number" value="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c5Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Evaluate</button>
            </div>
            <div id="g12c5Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const a=gv('g12c5a'),b=gv('g12c5b'),c=gv('g12c5c'),d=gv('g12c5d'),k=gv('g12c5k');
                const out=document.getElementById('g12c5Out');
                if([a,b,c,d,k].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter all values.</span>';return;}
                const rem=a*k*k*k+b*k*k+c*k+d;
                const pstr=(a!==0?a+'x³':'')+(b>=0&&a!==0?'+':'')+b+'x²'+(c>=0?'+':'')+c+'x'+(d>=0?'+':'')+d;
                let html='<span style="color:rgba(221,225,240,0.50);">p(x) = '+pstr+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">p('+k+') = '+a+'('+k+')³ + '+b+'('+k+')² + '+c+'('+k+') + '+d+'</span><br>';
                html+='<span style="color:'+(rem===0?'#6ee7b7':'#fcd34d')+';">p('+k+') = '+rem+'</span><br>';
                if(rem===0) html+='<span style="color:#6ee7b7;">✅ (x − '+k+') IS a factor of p(x)</span>';
                else html+='<span style="color:rgba(221,225,240,0.50);">Remainder when dividing by (x − '+k+') = '+rem+'</span>';
                out.innerHTML=html;
              }
              ['g12c5a','g12c5b','g12c5c','g12c5d','g12c5k'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c5Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "p(x) = x³ − 3x + 2. Find the remainder when divided by (x − 2).", options: ["4", "0", "2", "6"], answer: 0, topic: "Remainder & factor theorems" },
        { type: "mc", text: "If p(3) = 0, then which is a factor of p(x)?", options: ["(x + 3)", "(x − 3)", "(3x − 1)", "(x · 3)"], answer: 1, topic: "Remainder & factor theorems" },
        { type: "input", text: "p(x) = 2x³ − 3x² + x − 4. Find p(2).", answer: "2", topic: "Remainder & factor theorems" },
        { type: "mc", text: "To find a factor of x³ + x² − 4x − 4, test integer factors of:", options: ["1", "4", "−4", "Both B and C"], answer: 3, topic: "Remainder & factor theorems" },
        { type: "mc", text: "x³ − 6x² + 11x − 6 = (x−1)(x−2)(x−3). The sum of the roots is:", options: ["6", "11", "−6", "−11"], answer: 0, topic: "Remainder & factor theorems" },
        { type: "mc", text: "Solve for x: x³ + 2x² − 5x − 6 = 0", options: ["x = −3, −1, 2", "x = −1, 1, 6", "x = 1, 2, 3", "x = −2, 1, 3"], answer: 0, topic: "Remainder & factor theorems" },
        { type: "input", text: "p(x) = x³ − 2x² + 3x − 5. R₁ is the remainder when p(x) is divided by (x − 3), and R₂ is the remainder when p(x) is divided by (x + 1). Calculate R₁ − R₂.", answer: "24", topic: "Remainder & factor theorems" }
      ]
    },
    {
      id: 501,
      chapter: 5,
      name: "Cubic polynomials — sketching & solving",
      fullName: "Solving cubic equations and sketching cubic functions",
      lesson: {
        heading: "Cubic equations and graphs",
        sub: "Chapter 5 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Solving cubic equations</div>
            <p>
              General method:<br>
              1. Move all terms to one side → p(x) = 0<br>
              2. Find one root using the factor theorem<br>
              3. Factorise as (x − a)(quadratic) = 0<br>
              4. Solve the quadratic (may have 0, 1, or 2 more real solutions)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Sketching y = ax³ + bx² + cx + d</div>
            <p>
              Key features to find using calculus (from Ch 6) or algebra:<br>
              • y-intercept: set x = 0<br>
              • x-intercepts: solve p(x) = 0 (factor theorem)<br>
              • Turning points: solve p'(x) = 0<br>
              • End behaviour: if a > 0, falls left/rises right; if a &lt; 0, rises left/falls right<br>
              • Point of inflection: where concavity changes (p''(x) = 0)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Sketch y = x³ − 3x + 2</div>
            <p>y-intercept: (0, 2)<br>
            x-intercepts: factor → (x−1)²(x+2) → x = 1 (double) and x = −2<br>
            Double root → tangent to x-axis at x = 1<br>
            y' = 3x² − 3 = 0 → x = ±1 (turning points at (1, 0) min and (−1, 4) max)<br>
            End: a > 0 → falls left, rises right</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Cubic Root Finder (Factor Theorem)</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter p(x) = ax³+bx²+cx+d — auto-tests rational roots, then shows full factorisation and roots.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (x³)</div><input id="g12c5t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (x²)</div><input id="g12c5t2b" type="number" value="-2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (x)</div><input id="g12c5t2c" type="number" value="-5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d (const)</div><input id="g12c5t2d" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c5t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find Roots</button>
            </div>
            <div id="g12c5t2Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c5t2a'),b=gv('g12c5t2b'),c=gv('g12c5t2c'),d=gv('g12c5t2d');
                const out=document.getElementById('g12c5t2Out');
                if([a,b,c,d].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter cubic coefficients (a ≠ 0).</span>';return;}
                const p=x=>a*x*x*x+b*x*x+c*x+d;
                // find rational root: test factors of d/a
                const absD=Math.abs(d),absA=Math.abs(a);
                let root1=null;
                const tests=[];
                for(let i=1;i<=absD*2+1;i++){for(let j=1;j<=absA+1;j++){[i/j,-i/j].forEach(r=>{if(Math.abs(p(r))<1e-9)tests.push(r);});}}
                if(tests.length>0) root1=tests[0];
                else{out.innerHTML='<span style="color:#fca5a5;">No simple rational root found. Try a different cubic.</span>';return;}
                // synthetic divide ax³+bx²+cx+d by (x−root1)
                const A=a,B=b+a*root1,C=c+B*root1;
                // quadratic: Ax²+Bx+C
                const disc=B*B-4*A*C;
                let html='<span style="color:rgba(221,225,240,0.50);">Rational root found: x = '+root1+' (tested by factor theorem)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Quotient after dividing by (x−'+root1+'): '+A+'x² + '+B+'x + '+f4(C)+'</span><br>';
                if(disc<0){
                  html+='<span style="color:rgba(221,225,240,0.50);">Δ = '+f4(disc)+' < 0 → quadratic has no real roots</span><br>';
                  html+='<span style="color:#6ee7b7;">Only real root: x = '+root1+'</span>';
                } else if(disc===0){
                  const r2=-B/(2*A);
                  html+='<span style="color:#6ee7b7;">Roots: x = '+root1+' and x = '+f4(r2)+' (double root)</span>';
                } else {
                  const r2=(-B+Math.sqrt(disc))/(2*A),r3=(-B-Math.sqrt(disc))/(2*A);
                  html+='<span style="color:rgba(221,225,240,0.50);">Δ = '+f4(disc)+' → two more roots from quadratic formula</span><br>';
                  html+='<span style="color:#6ee7b7;">Roots: x = '+f4(root1)+',  x = '+f4(r2)+',  x = '+f4(r3)+'</span>';
                }
                out.innerHTML=html;
              }
              ['g12c5t2a','g12c5t2b','g12c5t2c','g12c5t2d'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c5t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Solve: x³ − 7x + 6 = 0. The roots are:", options: ["1, 2, −3", "1, −3, 2", "−1, 3, −2", "1, 2, 3"], answer: 0, topic: "Cubic polynomials — sketching & solving" },
        { type: "mc", text: "If a cubic has a double root at x = 2 and another root at x = −1, it could be:", options: ["(x−2)²(x+1)", "(x+2)²(x−1)", "(x−2)(x+1)²", "(x+2)(x−1)²"], answer: 0, topic: "Cubic polynomials — sketching & solving" },
        { type: "mc", text: "y = −2x³ + … End behaviour:", options: ["Falls left, rises right", "Rises left, falls right", "Falls both sides", "Rises both sides"], answer: 1, topic: "Cubic polynomials — sketching & solving" },
        { type: "input", text: "p(x) = x³ + px² − x − 6 and (x+2) is a factor. Find p.", answer: "2", topic: "Cubic polynomials — sketching & solving" },
        { type: "mc", text: "A cubic equation can have at most how many real roots?", options: ["1", "2", "3", "4"], answer: 2, topic: "Cubic polynomials — sketching & solving" },
        { type: "mc", text: "Solve for x: 2x³ − x² − 5x − 2 = 0", options: ["x = −1, −½, 2", "x = 1, ½, −2", "x = −1, 2, 5", "x = 1, −2, −5"], answer: 0, topic: "Cubic polynomials — sketching & solving" },
        { type: "input", text: "x³ − x² − 4x + 4 = 0 has roots p < q < r. Calculate the value of p·q·r.", answer: "-4", altAnswers: ["−4"], topic: "Cubic polynomials — sketching & solving" }
      ]
    },
    {
      id: 502,
      chapter: 5,
      name: "Finding unknown coefficients",
      fullName: "Using the remainder and factor theorems to find unknown coefficients in a polynomial",
      lesson: {
        heading: "Finding unknown coefficients with the remainder and factor theorems",
        sub: "Chapter 5 · Topic 3",
        body: `
          <p>A very common Grade 12 question style gives a polynomial with one or more unknown coefficients (like p or k) and a condition on the remainder or a known factor — you must set up and solve an equation for the unknown(s).</p>

          <div class="def-box">
            <div class="def-box-title">📖 The method</div>
            <p>
              1. Use the given condition — "(x − a) is a factor" means p(a) = 0; "remainder is R when divided by (x − a)" means p(a) = R.<br>
              2. Substitute x = a into p(x) (which contains the unknown constant).<br>
              3. Set the resulting expression equal to 0 (factor) or R (remainder).<br>
              4. Solve the resulting equation for the unknown.<br><br>
              If there are two unknowns, you need two conditions (two equations, solved simultaneously).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: One unknown</div>
            <p>p(x) = 2x³ + kx² − 5x + 6, and (x − 1) is a factor. Find k.<br>
            p(1) = 2 + k − 5 + 6 = 0 → k + 3 = 0 → k = −3</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Remainder given, not zero</div>
            <p>p(x) = x³ − px + 4 leaves a remainder of 10 when divided by (x − 3). Find p.<br>
            p(3) = 27 − 3p + 4 = 10 → 31 − 3p = 10 → 3p = 21 → p = 7</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Two unknowns</div>
            <p>p(x) = x³ + ax² + bx − 6. (x − 1) and (x − 2) are both factors. Find a and b.<br>
            p(1) = 1 + a + b − 6 = 0 → a + b = 5<br>
            p(2) = 8 + 4a + 2b − 6 = 0 → 4a + 2b = −2 → 2a + b = −1<br>
            Subtract: a = −6, then b = 11</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Exam tip</div>
            <p>Always double-check your unknown by substituting it back into p(x) and confirming p(a) really does equal 0 (or the stated remainder).</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Unknown Coefficient Solver</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">p(x) = x³ + kx² + cx + d (coefficient of x³ fixed at 1). Given (x − root) is a factor, solve for k.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (x coeff)</div><input id="g12c5u_c" type="number" value="-1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d (const)</div><input id="g12c5u_d" type="number" value="-6" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Root a (x−a is factor)</div><input id="g12c5u_a" type="number" value="-2" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Remainder R (0 = factor)</div><input id="g12c5u_R" type="number" value="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c5uBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve for k</button>
            </div>
            <div id="g12c5uOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const c=gv('g12c5u_c'),d=gv('g12c5u_d'),a=gv('g12c5u_a'),R=gv('g12c5u_R');
                const out=document.getElementById('g12c5uOut');
                if([c,d,a,R].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter all values.</span>';return;}
                if(a===0){out.innerHTML='<span style="color:#fca5a5;">Root a cannot be 0 with this setup (k coefficient vanishes).</span>';return;}
                // p(x) = x^3 + k x^2 + c x + d; p(a) = a^3 + k a^2 + c a + d = R
                // solve for k: k = (R - a^3 - c*a - d) / a^2
                const k=(R - a*a*a - c*a - d)/(a*a);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">p(x) = x³ + kx² + '+c+'x + '+d+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">p('+a+') = '+a+'³ + k('+a+')² + '+c+'('+a+') + '+d+' = '+R+'</span><br>'+
                  '<span style="color:#6ee7b7;">k = '+f4(k)+'</span>';
              }
              ['g12c5u_c','g12c5u_d','g12c5u_a','g12c5u_R'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c5uBtn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "input", text: "p(x) = 2x³ + kx² − 5x + 6, and (x − 1) is a factor. Find k.", answer: "-3", altAnswers: ["−3"], topic: "Finding unknown coefficients" },
        { type: "mc", text: "p(x) = x³ − px + 4 leaves remainder 10 when divided by (x − 3). Which equation finds p?", options: ["27 − 3p + 4 = 10", "27 + 3p + 4 = 10", "9 − 3p + 4 = 10", "3 − p + 4 = 10"], answer: 0, topic: "Finding unknown coefficients" },
        { type: "input", text: "Using p(x) = x³ − px + 4 with remainder 10 at x = 3 (27 − 3p + 4 = 10), find p.", answer: "7", topic: "Finding unknown coefficients" },
        { type: "mc", text: "If a polynomial has TWO unknown coefficients, how many known factor/remainder conditions do you generally need?", options: ["One", "Two", "Three", "None — one is always enough"], answer: 1, topic: "Finding unknown coefficients" },
        { type: "input", text: "p(x) = x³ + ax² + bx − 6. (x−1) and (x−2) are factors, giving a+b=5 and 2a+b=−1. Find a.", answer: "-6", altAnswers: ["−6"], topic: "Finding unknown coefficients" },
        { type: "mc", text: "p(x) = x³ + ax² + bx − 4. (x − 1) is a factor, and p(x) leaves a remainder of −6 when divided by (x + 1). Determine a and b.", options: ["a = 1, b = 2", "a = 2, b = 1", "a = −1, b = 4", "a = 3, b = 0"], answer: 0, topic: "Finding unknown coefficients" },
        { type: "mc", text: "p(x) = 3x³ + kx² + 4, and (x − 2) is a factor. Determine k, and hence find all three roots of p(x) = 0.", options: ["k = −7; roots: −⅔, 1, 2", "k = 7; roots: ⅔, −1, −2", "k = −7; roots: −1, 2, 3", "k = 4; roots: −2, 1, 2"], answer: 0, topic: "Finding unknown coefficients" }
      ]
    },
    {
      id: 503,
      chapter: 5,
      name: "Sketching cubic graphs from key features",
      fullName: "Combining x-intercepts, y-intercept, turning points, and end behaviour to sketch a cubic",
      lesson: {
        heading: "Sketching cubic graphs from key features",
        sub: "Chapter 5 · Topic 4",
        body: `
          <p>Once you can factorise a cubic and find its roots, sketching the graph is about combining all the key features into one coherent, correctly-shaped curve.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Checklist for sketching y = ax³ + bx² + cx + d</div>
            <p>
              • <strong>y-intercept:</strong> the value of d (set x = 0)<br>
              • <strong>x-intercepts:</strong> roots from the factor theorem — note single vs double (repeated) roots<br>
              • <strong>Shape at a repeated root:</strong> the curve <em>touches</em> the x-axis (like a parabola) at a double root, and <em>crosses straight through with an inflection-like flattening</em> at a triple root<br>
              • <strong>End behaviour:</strong> a > 0 → down on the far left, up on the far right; a &lt; 0 → up on the far left, down on the far right<br>
              • <strong>Turning points:</strong> found using calculus (derivative = 0) — covered fully in the Differential Calculus chapter, but you should recognise that a cubic has at most 2 turning points
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Sketch y = (x+2)(x−1)²</div>
            <p>Roots: x = −2 (single, curve crosses) and x = 1 (double, curve touches)<br>
            y-intercept: (0+2)(0−1)² = 2(1) = 2 → (0; 2)<br>
            a > 0 (expand: leading term is x³) → falls left, rises right<br>
            Shape: comes up from bottom-left, crosses at x=−2, rises to a local max, comes back down to touch the x-axis at x=1, then rises again to the right.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Reading a sketch backwards</div>
            <p>Given a sketch showing x-intercepts at −2, 1 (double) and a y-intercept of 2, you can reconstruct the equation: y = a(x+2)(x−1)², then substitute the y-intercept to find a.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Cubic Graph Plotter</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter coefficients a, b, c, d for y = ax³+bx²+cx+d and see the sketch with intercepts marked.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c5pa" type="number" value="1" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g12c5pb" type="number" value="0" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g12c5pc" type="number" value="-3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d</div><input id="g12c5pd" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c5pBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Plot</button>
            </div>
            <svg id="g12c5pSvg" viewBox="0 0 340 300" style="width:100%;max-width:360px;background:#1e1b4b;border-radius:10px;border:1px solid rgba(99,102,241,0.25);"></svg>
            <div id="g12c5pOut" style="font-size:13px;line-height:1.8;color:rgba(221,225,240,0.85);min-height:24px;margin-top:8px;"></div>
            <script>
            (function(){
              const svgNS='http://www.w3.org/2000/svg';
              const svg=document.getElementById('g12c5pSvg');
              const W=340,H=300,ox=170,oy=150,scale=28;
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function toPx(x,y){return [ox+x*scale, oy-y*scale];}
              function el(tag,attrs){const e=document.createElementNS(svgNS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);return e;}
              function draw(){
                const a=gv('g12c5pa'),b=gv('g12c5pb'),c=gv('g12c5pc'),d=gv('g12c5pd');
                const out=document.getElementById('g12c5pOut');
                svg.innerHTML='';
                if([a,b,c,d].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter coefficients (a ≠ 0).</span>';return;}
                const p=x=>a*x*x*x+b*x*x+c*x+d;
                svg.appendChild(el('line',{x1:0,y1:oy,x2:W,y2:oy,stroke:'rgba(221,225,240,0.30)','stroke-width':1}));
                svg.appendChild(el('line',{x1:ox,y1:0,x2:ox,y2:H,stroke:'rgba(221,225,240,0.30)','stroke-width':1}));
                let pts=[];
                for(let px=0;px<=W;px+=2){
                  const x=(px-ox)/scale;
                  const y=p(x);
                  const [X,Y]=toPx(x,y);
                  if(Y>-40&&Y<H+40) pts.push(X+','+Y);
                }
                svg.appendChild(el('polyline',{points:pts.join(' '),fill:'none',stroke:'#6ee7b7','stroke-width':2}));
                const [yiX,yiY]=toPx(0,d);
                svg.appendChild(el('circle',{cx:yiX,cy:yiY,r:3,fill:'#fcd34d'}));
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">y = '+a+'x³'+(b>=0?'+':'')+b+'x²'+(c>=0?'+':'')+c+'x'+(d>=0?'+':'')+d+'</span><br>'+
                  '<span style="color:#fcd34d;">y-intercept: (0; '+d+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.45);">End behaviour: '+(a>0?'falls left, rises right':'rises left, falls right')+'</span>';
              }
              ['g12c5pa','g12c5pb','g12c5pc','g12c5pd'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')draw();});});
              document.getElementById('g12c5pBtn').addEventListener('click',draw);
              draw();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "At a double (repeated) root, a cubic graph:", options: ["Crosses the x-axis steeply", "Touches the x-axis and turns back", "Has a vertical asymptote", "Has a y-intercept there"], answer: 1, topic: "Sketching cubic graphs from key features" },
        { type: "mc", text: "y = (x+2)(x−1)² has x-intercepts at:", options: ["x = −2 only", "x = −2 (crosses) and x = 1 (touches)", "x = 2 and x = −1", "x = −2 and x = 1, both crossing"], answer: 1, topic: "Sketching cubic graphs from key features" },
        { type: "input", text: "y = a(x+2)(x−1)² passes through (0; 8). Find a.", answer: "4", topic: "Sketching cubic graphs from key features" },
        { type: "mc", text: "A cubic with a > 0 and only one real root (no repeated roots) will:", options: ["Fall left, rise right, crossing the x-axis exactly once", "Rise left, fall right", "Touch the x-axis twice", "Have no y-intercept"], answer: 0, topic: "Sketching cubic graphs from key features" },
        { type: "mc", text: "The maximum number of turning points a cubic graph can have is:", options: ["1", "2", "3", "0"], answer: 1, topic: "Sketching cubic graphs from key features" },
        { type: "input", text: "The graph of a cubic has x-intercepts at x = −3 and x = 2 (double root), and a y-intercept at (0; −24). Determine the value of a in y = a(x+3)(x−2)².", answer: "-2", altAnswers: ["−2"], topic: "Sketching cubic graphs from key features" },
        { type: "input", text: "A cubic graph has a double root at x = −1, a single root at x = 3, and passes through the point (1; −16). Determine the value of a in y = a(x+1)²(x−3).", answer: "2", topic: "Sketching cubic graphs from key features" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 5 Workbook — Polynomials",
    questions: [
      { number: 1, text: "p(x) = 2x³ + x² − 13x + 6", parts: [
        { label: "a", text: "Show that (x − 2) is a factor.", marks: 2 },
        { label: "b", text: "Fully factorise p(x).", marks: 4 },
        { label: "c", text: "Solve p(x) = 0.", marks: 2 }
      ]},
      { number: 2, text: "f(x) = x³ − x² − 8x + 12", parts: [
        { label: "a", text: "Find all x-intercepts.", marks: 5 },
        { label: "b", text: "Find the y-intercept.", marks: 1 },
        { label: "c", text: "Describe the end behaviour.", marks: 2 },
        { label: "d", text: "Make a rough sketch.", marks: 3 }
      ]},
      { number: 3, text: "kx³ − 3x² + 2x + 4 has remainder 12 when divided by (x − 2). Find k.", parts: [
        { label: "a", text: "Apply the remainder theorem.", marks: 2 },
        { label: "b", text: "Solve for k.", marks: 2 }
      ]},
      { number: 4, text: "The table below gives values of p(x) = x³ − 3x² − x + 3 for several values of x:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>x</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>p(x)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−15</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>15</td></tr></table>", parts: [
        { label: "a", text: "Use the table to write down the x-intercepts of the graph of p.", marks: 2 },
        { label: "b", text: "Write down the y-intercept.", marks: 1 },
        { label: "c", text: "Hence write p(x) in fully factorised form.", marks: 2 },
        { label: "d", text: "Describe the end behaviour of the graph, referring to the table values at x = −2 and x = 4.", marks: 2 }
      ]}
    ],
    answers: {
      1: { a: "p(2)=16+4−26+6=0 ✓", b: "p(x)=(x−2)(2x²+5x−3)=(x−2)(2x−1)(x+3)", c: "x=2, x=½, x=−3" },
      2: { a: "Test x=2: 8−4−16+12=0 ✓; divide: (x−2)(x²+x−6)=(x−2)(x+3)(x−2)=(x−2)²(x+3); x=2(double),x=−3", b: "(0,12)", c: "a=1>0: falls left, rises right", d: "Touches x-axis at 2, cuts at −3, y-int at 12" },
      3: { a: "p(2)=8k−12+4+4=8k−4=12", b: "8k=16→k=2" },
      4: { a: "x = −1, 1, 3 (the values of x where p(x) = 0 in the table)", b: "(0; 3)", c: "p(x) = (x+1)(x−1)(x−3)", d: "Leading coefficient a = 1 > 0, so the graph falls to the left and rises to the right — confirmed by the table: p(−2) = −15 (very negative as x decreases) and p(4) = 15 (positive and increasing as x increases)." }
    }
  }
});
