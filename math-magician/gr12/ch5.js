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
              calc();
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
        { type: "mc", text: "x³ − 6x² + 11x − 6 = (x−1)(x−2)(x−3). The sum of the roots is:", options: ["6", "11", "−6", "−11"], answer: 0, topic: "Remainder & factor theorems" }
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
              calc();
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
        { type: "mc", text: "A cubic equation can have at most how many real roots?", options: ["1", "2", "3", "4"], answer: 2, topic: "Cubic polynomials — sketching & solving" }
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
      ]}
    ],
    answers: {
      1: { a: "p(2)=16+4−26+6=0 ✓", b: "p(x)=(x−2)(2x²+5x−3)=(x−2)(2x−1)(x+3)", c: "x=2, x=½, x=−3" },
      2: { a: "Test x=2: 8−4−16+12=0 ✓; divide: (x−2)(x²+x−6)=(x−2)(x+3)(x−2)=(x−2)²(x+3); x=2(double),x=−3", b: "(0,12)", c: "a=1>0: falls left, rises right", d: "Touches x-axis at 2, cuts at −3, y-int at 12" },
      3: { a: "p(2)=8k−12+4+4=8k−4=12", b: "8k=16→k=2" }
    }
  }
});
