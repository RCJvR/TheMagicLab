// Math Magician — Grade 12, Chapter 2
// Functions — Inverses and Logarithms

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 200,
      chapter: 2,
      name: "Inverse functions",
      fullName: "Functions, relations, and inverse functions (linear, quadratic, exponential)",
      lesson: {
        heading: "Inverse functions",
        sub: "Chapter 2 · Topic 1",
        body: `
          <p>The <strong>inverse</strong> of a function f is denoted f⁻¹ and reverses the mapping: if f(a) = b, then f⁻¹(b) = a.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Finding the inverse</div>
            <p>
              1. Write y = f(x)<br>
              2. Swap x and y<br>
              3. Solve for y (this is f⁻¹(x))<br><br>
              Graphically: the inverse is the <strong>reflection of f in the line y = x</strong>.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Inverses of key function types</div>
            <p>
              <strong>Linear:</strong> f(x) = mx + c → f⁻¹(x) = (x − c)/m<br>
              <strong>Quadratic:</strong> f(x) = ax² → f⁻¹(x) = ±√(x/a) (must restrict domain for a function)<br>
              <strong>Exponential:</strong> f(x) = bˣ → f⁻¹(x) = log_b(x) (the logarithm)<br><br>
              For f⁻¹ to be a <em>function</em>, f must be one-to-one (passes horizontal line test).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Inverse of y = 2x²</div>
            <p>Swap: x = 2y² → y² = x/2 → y = ±√(x/2)<br>
            This is NOT a function (two y-values for each x).<br>
            Restrict domain to x ≥ 0: f⁻¹(x) = √(x/2) only.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Logarithms — the inverse of exponentials</div>
            <p>
              <span class="math">y = log_b(x) ⟺ bʸ = x</span><br><br>
              Key log laws:<br>
              <span class="math">log(xy) = log x + log y</span><br>
              <span class="math">log(x/y) = log x − log y</span><br>
              <span class="math">log(xⁿ) = n·log x</span><br>
              <span class="math">log_b(b) = 1; log_b(1) = 0</span><br>
              Change of base: <span class="math">log_a(x) = log(x)/log(a)</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Logarithm Evaluator (change of base)</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Evaluate log_b(x) = log(x)/log(b). Enter base b and argument x.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Base b</div><input id="g12c2b" type="number" value="2" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Argument x</div><input id="g12c2x" type="number" value="32" min="0.0001" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Evaluate</button>
            </div>
            <div id="g12c2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(6));}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const b=gv('g12c2b'),x=gv('g12c2x');
                const out=document.getElementById('g12c2Out');
                if(isNaN(b)||isNaN(x)||b<=0||b===1||x<=0){out.innerHTML='<span style="color:#fca5a5;">b must be >0, b≠1, x must be >0.</span>';return;}
                const val=Math.log(x)/Math.log(b);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">log_'+b+'('+x+') = log('+x+')/log('+b+') = '+Math.log(x).toFixed(6)+'/'+Math.log(b).toFixed(6)+'</span><br>'+
                  '<span style="color:#6ee7b7;">= '+f(val)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Verify: '+b+'^'+f(val)+' = '+f(Math.pow(b,val))+'</span>';
              }
              ['g12c2b','g12c2x'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = 3x − 6. Find f⁻¹(x).", options: ["(x+6)/3", "(x−6)/3", "3x+6", "x/3 + 2"], answer: 0, topic: "Inverse functions" },
        { type: "mc", text: "The inverse of y = 2ˣ is:", options: ["y = x²", "y = log₂(x)", "y = 2⁻ˣ", "y = ½ˣ"], answer: 1, topic: "Inverse functions" },
        { type: "input", text: "Evaluate: log₂(32)", answer: "5", topic: "Inverse functions" },
        { type: "mc", text: "The graph of f⁻¹ is obtained from f by reflecting in:", options: ["The x-axis", "The y-axis", "The line y = x", "The origin"], answer: 2, topic: "Inverse functions" },
        { type: "mc", text: "log(100) + log(10) = ", options: ["2", "3", "log(1000)", "Both B and C"], answer: 3, topic: "Inverse functions" },
        { type: "input", text: "If f(x) = 4x − 3 and h(x) = f⁻¹(x), determine the value of x for which h(2x + 5) = 6.", answer: "8", topic: "Inverse functions" },
        { type: "input", text: "Solve for x: log₃(x) = 2log₃(5) − log₃(x)", answer: "5", topic: "Inverse functions" }
      ]
    },
    {
      id: 201,
      chapter: 2,
      name: "Logarithmic functions & equations",
      fullName: "Logarithmic functions, properties, equations, and applications",
      lesson: {
        heading: "Logarithmic functions and equations",
        sub: "Chapter 2 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 The logarithmic function y = log_b(x)</div>
            <p>
              Domain: x > 0 &nbsp;|&nbsp; Range: ℝ<br>
              x-intercept: (1; 0) — since log_b(1) = 0<br>
              Vertical asymptote: x = 0<br>
              If b > 1: increasing function<br>
              If 0 &lt; b &lt; 1: decreasing function
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Solving exponential equations using logs</div>
            <p>
              To solve <span class="math">bˣ = c</span> when the bases don't match:<br>
              Take log of both sides: <span class="math">x·log b = log c → x = log c / log b</span><br><br>
              Or equivalently: <span class="math">x = log_b(c)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve 3ˣ = 20</div>
            <p><span class="math">x·log 3 = log 20</span><br>
            <span class="math">x = log 20 / log 3 = 1.301/0.477 ≈ 2.727</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve log₂(x + 3) = 4</div>
            <p>Convert: <span class="math">2⁴ = x + 3 → 16 = x + 3 → x = 13</span><br>
            Check: x + 3 = 16 > 0 ✓</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Finding n in compound interest</div>
            <p>
              <span class="math">A = P(1+i)ⁿ → (1+i)ⁿ = A/P → n = log(A/P)/log(1+i)</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Exponential / Log Equation Solver</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g12c2t2exp" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">bˣ = c</button>
              <button id="g12c2t2log" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">log_b(x) = n</button>
              <button id="g12c2t2comp" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Find n (compound)</button>
            </div>
            <div id="g12c2t2expP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Base b</div><input id="g12c2t2b" type="number" value="3" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Result c</div><input id="g12c2t2c" type="number" value="20" min="0.0001" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2t2expBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve x</button>
            </div>
            <div id="g12c2t2logP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Base b</div><input id="g12c2t2lb" type="number" value="3" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">RHS = n</div><input id="g12c2t2ln" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2t2logBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve x</button>
            </div>
            <div id="g12c2t2compP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Principal P</div><input id="g12c2t2P" type="number" value="8000" min="1" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Amount A</div><input id="g12c2t2A" type="number" value="16000" min="1" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rate i (%)</div><input id="g12c2t2i" type="number" value="9.5" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2t2compBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find n (years)</button>
            </div>
            <div id="g12c2t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const btns={exp:document.getElementById('g12c2t2exp'),log:document.getElementById('g12c2t2log'),comp:document.getElementById('g12c2t2comp')};
              const panels={exp:document.getElementById('g12c2t2expP'),log:document.getElementById('g12c2t2logP'),comp:document.getElementById('g12c2t2compP')};
              const out=document.getElementById('g12c2t2Out');
              function setMode(m){Object.keys(panels).forEach(k=>{panels[k].style.display=k===m?'flex':'none';btns[k].style.background=k===m?'rgba(99,102,241,0.30)':'transparent';btns[k].style.color=k===m?'#a5b4fc':'rgba(221,225,240,0.50)';btns[k].style.borderColor=k===m?'rgba(99,102,241,0.50)':'rgba(99,102,241,0.20)';});out.innerHTML='';}
              Object.keys(btns).forEach(k=>btns[k].addEventListener('click',()=>setMode(k)));
              document.getElementById('g12c2t2expBtn').addEventListener('click',()=>{
                const b=gv('g12c2t2b'),c=gv('g12c2t2c');
                if(isNaN(b)||isNaN(c)||b<=0||b===1||c<=0){out.innerHTML='<span style="color:#fca5a5;">b>0, b≠1, c>0.</span>';return;}
                const x=Math.log(c)/Math.log(b);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+b+'^x = '+c+' → x·log('+b+') = log('+c+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">x = log('+c+')/log('+b+') = '+Math.log(c).toFixed(4)+'/'+Math.log(b).toFixed(4)+'</span><br>'+
                  '<span style="color:#6ee7b7;">x = '+f(x)+'</span>';
              });
              document.getElementById('g12c2t2logBtn').addEventListener('click',()=>{
                const b=gv('g12c2t2lb'),n=gv('g12c2t2ln');
                if(isNaN(b)||isNaN(n)||b<=0||b===1){out.innerHTML='<span style="color:#fca5a5;">b>0, b≠1.</span>';return;}
                const x=Math.pow(b,n);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">log_'+b+'(x) = '+n+' → x = '+b+'^'+n+'</span><br>'+
                  '<span style="color:#6ee7b7;">x = '+f(x)+'</span>';
              });
              document.getElementById('g12c2t2compBtn').addEventListener('click',()=>{
                const P=gv('g12c2t2P'),A=gv('g12c2t2A'),i=gv('g12c2t2i')/100;
                if([P,A,i].some(isNaN)||P<=0||A<=0||i<=0||A<=P){out.innerHTML='<span style="color:#fca5a5;">A must be greater than P.</span>';return;}
                const n=Math.log(A/P)/Math.log(1+i);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">A=P(1+i)ⁿ → (1+i)ⁿ=A/P = '+f(A/P)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">n = log('+f(A/P)+')/log('+f(1+i)+') = '+Math.log(A/P).toFixed(4)+'/'+Math.log(1+i).toFixed(4)+'</span><br>'+
                  '<span style="color:#6ee7b7;">n = '+f(n)+' years</span>';
              });
              setMode('exp'); document.getElementById('g12c2t2expBtn').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Solve: 5ˣ = 125", options: ["x = 2", "x = 3", "x = 25", "x = 4"], answer: 1, topic: "Logarithmic functions & equations" },
        { type: "input", text: "Solve: 2ˣ = 50. Give x to 2 decimal places.", answer: "5.64", altAnswers: ["5,64"], topic: "Logarithmic functions & equations" },
        { type: "mc", text: "Solve: log₃(x − 1) = 2", options: ["x = 10", "x = 7", "x = 9", "x = 5"], answer: 0, topic: "Logarithmic functions & equations" },
        { type: "mc", text: "The vertical asymptote of y = log(x + 2) is:", options: ["x = 0", "x = 2", "x = −2", "y = 0"], answer: 2, topic: "Logarithmic functions & equations" },
        { type: "mc", text: "log(a²b³) expressed using log a and log b:", options: ["2log a + 3log b", "5log(ab)", "6log(ab)", "log a² + log b³ only"], answer: 0, topic: "Logarithmic functions & equations" },
        { type: "input", text: "Solve for x: log₂(x) + log₂(x + 6) = 4", answer: "2", topic: "Logarithmic functions & equations" },
        { type: "input", text: "An investment of R12 500 grows at 11% p.a. compounded annually. Determine the minimum number of full years for the investment to exceed R30 000.", answer: "9", topic: "Logarithmic functions & equations" }
      ]
    },
    {
      id: 202,
      chapter: 2,
      name: "Restricting domains for inverses",
      fullName: "One-to-one functions, the horizontal line test, and restricting domains so inverses are functions",
      lesson: {
        heading: "Restricting domains so the inverse is a function",
        sub: "Chapter 2 · Topic 3",
        body: `
          <p>Not every function has an inverse that is <em>also</em> a function. CAPS requires you to understand exactly when this fails, and how <strong>restricting the domain</strong> fixes it.</p>

          <div class="def-box">
            <div class="def-box-title">📖 One-to-one vs many-to-one</div>
            <p>
              A function is <strong>one-to-one</strong> if every y-value corresponds to exactly one x-value (passes the horizontal line test).<br>
              A function is <strong>many-to-one</strong> if some y-value comes from more than one x-value (e.g. f(x) = x² : both x = 2 and x = −2 give y = 4).<br><br>
              Only a one-to-one function has an inverse that is itself a function. If f is many-to-one, f⁻¹ is a <em>relation</em>, not a function — unless we restrict f's domain.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 The notation caution</div>
            <p>
              f⁻¹ is only used for the inverse of a one-to-one relation. Do not confuse f⁻¹(x) with the reciprocal 1/f(x) — for f(x) = x, the reciprocal is 1/x, while f⁻¹(x) = x also, but for f(x) = x² restricted to x ≥ 0, f⁻¹(x) = √x ≠ 1/x².
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Restricting f(x) = x²</div>
            <p>f(x) = x² (domain: all reals) is many-to-one — fails the horizontal line test.<br>
            Restrict the domain to x ≥ 0 (right half only). Now f is one-to-one on this restricted domain.<br>
            Swap and solve: x = y² → y = √x (taking the positive root since the restricted domain was x ≥ 0)<br>
            So f⁻¹(x) = √x, with domain x ≥ 0 and range y ≥ 0.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: y = ay², i.e. x = ay²</div>
            <p>Consider the relation x = ay² (a sideways parabola, a > 0). Solving for y: y = ±√(x/a).<br>
            To make this a function we restrict to y ≥ 0 or y ≤ 0. If we choose y ≥ 0, the inverse (swapping back) is f⁻¹(x) = ax², x ≥ 0.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Exam tip</div>
            <p>When asked to restrict a domain, state it explicitly (e.g. "for x ≥ 0") and check your restricted graph passes the horizontal line test before writing down f⁻¹.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 One-to-One Checker</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Pick a function type and a domain restriction — check whether it is one-to-one on that domain.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Function</div>
                <select id="g12c2t3fn" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="x2">f(x) = x²</option>
                  <option value="negx2">f(x) = −x²</option>
                  <option value="x3">f(x) = x³</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Domain from</div><input id="g12c2t3lo" type="number" value="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Domain to</div><input id="g12c2t3hi" type="number" value="5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Check</button>
            </div>
            <div id="g12c2t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gs(id){return document.getElementById(id).value;}
              function calc(){
                const fn=gs('g12c2t3fn'),lo=gv('g12c2t3lo'),hi=gv('g12c2t3hi');
                const out=document.getElementById('g12c2t3Out');
                if(isNaN(lo)||isNaN(hi)||lo>=hi){out.innerHTML='<span style="color:#fca5a5;">Enter a valid domain (from < to).</span>';return;}
                const f=x=>fn==='x2'?x*x:fn==='negx2'?-x*x:x*x*x;
                const label=fn==='x2'?'x²':fn==='negx2'?'−x²':'x³';
                let oneToOne=true,samples=200;
                const seen=[];
                for(let k=0;k<=samples;k++){
                  const x=lo+(hi-lo)*k/samples;
                  const y=f(x);
                  for(const s of seen){ if(Math.abs(s.y-y)<1e-6 && Math.abs(s.x-x)>1e-6){oneToOne=false;break;} }
                  if(!oneToOne) break;
                  seen.push({x,y});
                }
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">f(x) = '+label+' on ['+lo+'; '+hi+']</span><br>'+
                  (oneToOne
                    ? '<span style="color:#6ee7b7;">✅ One-to-one on this domain — f⁻¹ is a function here.</span>'
                    : '<span style="color:#fca5a5;">❌ Many-to-one on this domain — f⁻¹ would NOT be a function (restrict further).</span>');
              }
              ['g12c2t3lo','g12c2t3hi'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c2t3fn').addEventListener('change',calc);
              document.getElementById('g12c2t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = x² fails to have an inverse function because f is:", options: ["One-to-one", "Many-to-one", "Undefined for x < 0", "Not continuous"], answer: 1, topic: "Restricting domains for inverses" },
        { type: "mc", text: "To make f(x) = x² one-to-one, a valid domain restriction is:", options: ["x ∈ ℝ", "x ≥ 0", "x ≠ 0", "x < 0 or x > 0"], answer: 1, topic: "Restricting domains for inverses" },
        { type: "input", text: "f(x) = x² restricted to x ≥ 0. Find f⁻¹(x).", answer: "√x", altAnswers: ["sqrt(x)", "x^0.5", "x^(1/2)"], topic: "Restricting domains for inverses" },
        { type: "mc", text: "Which test determines if a graph represents a one-to-one function?", options: ["Vertical line test", "Horizontal line test", "Origin symmetry test", "Intercept test"], answer: 1, topic: "Restricting domains for inverses" },
        { type: "mc", text: "For f(x) = x², restricted to x ≤ 0, the inverse is:", options: ["f⁻¹(x) = √x", "f⁻¹(x) = −√x", "f⁻¹(x) = x²", "No inverse exists"], answer: 1, topic: "Restricting domains for inverses" },
        { type: "input", text: "f(x) = (x + 3)² for x ≥ −3. Determine f⁻¹(x).", answer: "√x − 3", altAnswers: ["√x-3", "sqrt(x)-3", "sqrt(x) - 3", "x^0.5 - 3", "x^0.5-3"], topic: "Restricting domains for inverses" },
        { type: "input", text: "g(x) = 2(x − 1)² + 4 for x ≤ 1. Determine g⁻¹(x).", answer: "1 − √((x − 4)/2)", altAnswers: ["1-√((x-4)/2)", "1-sqrt((x-4)/2)", "1 - sqrt((x-4)/2)"], topic: "Restricting domains for inverses" }
      ]
    },
    {
      id: 203,
      chapter: 2,
      name: "Graphing exponential & logarithmic functions",
      fullName: "Sketching y = b^x and y = log_b(x) for b > 1 and 0 < b < 1, and their key features",
      lesson: {
        heading: "Sketching exponential and logarithmic graphs",
        sub: "Chapter 2 · Topic 4",
        body: `
          <p>Because y = log_b(x) is the inverse of y = bˣ, their graphs are reflections of each other in the line y = x, and their key features mirror one another.</p>

          <div class="def-box">
            <div class="def-box-title">📖 y = bˣ (b > 0, b ≠ 1)</div>
            <p>
              Domain: ℝ &nbsp;|&nbsp; Range: y > 0<br>
              y-intercept: (0; 1) &nbsp;|&nbsp; No x-intercept<br>
              Horizontal asymptote: y = 0<br>
              If b > 1: increasing (growth) &nbsp;|&nbsp; If 0 &lt; b &lt; 1: decreasing (decay)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 y = log_b(x) (b > 0, b ≠ 1)</div>
            <p>
              Domain: x > 0 &nbsp;|&nbsp; Range: ℝ<br>
              x-intercept: (1; 0) &nbsp;|&nbsp; No y-intercept<br>
              Vertical asymptote: x = 0<br>
              If b > 1: increasing &nbsp;|&nbsp; If 0 &lt; b &lt; 1: decreasing<br><br>
              Since it is the inverse of y = bˣ, swapping x and y intercepts/asymptotes of the exponential gives the log graph's features directly.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: y = 2ˣ and y = log₂(x)</div>
            <p>y = 2ˣ passes through (0;1), (1;2), (2;4), asymptote y = 0, increasing.<br>
            Its inverse y = log₂(x) passes through (1;0), (2;1), (4;2), asymptote x = 0, increasing — exactly the reflected points.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: transformations</div>
            <p>Reflecting f(x) = aˣ in the y-axis gives h(x) = a⁻ˣ.<br>
            Reflecting f(x) = aˣ in the x-axis gives k(x) = −aˣ.<br>
            Shifting f(x) = aˣ two units left gives p(x) = aˣ⁺².</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Exponential & Logarithm Graph Plotter</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter base b — see y = bˣ and its inverse y = log_b(x) plotted together with the line y = x.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Base b</div><input id="g12c2gB" type="number" value="2" min="0.05" step="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Plot</button>
            </div>
            <svg id="g12c2gSvg" viewBox="0 0 340 340" style="width:100%;max-width:360px;background:#1e1b4b;border-radius:10px;border:1px solid rgba(99,102,241,0.25);"></svg>
            <div id="g12c2gOut" style="font-size:13px;line-height:1.8;color:rgba(221,225,240,0.85);min-height:24px;margin-top:8px;"></div>
            <script>
            (function(){
              const svgNS='http://www.w3.org/2000/svg';
              const svg=document.getElementById('g12c2gSvg');
              const W=340,H=340,ox=170,oy=170,scale=22;
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function toPx(x,y){return [ox+x*scale, oy-y*scale];}
              function el(tag,attrs){const e=document.createElementNS(svgNS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);return e;}
              function draw(){
                const b=gv('g12c2gB');
                const out=document.getElementById('g12c2gOut');
                svg.innerHTML='';
                if(isNaN(b)||b<=0||b===1){out.innerHTML='<span style="color:#fca5a5;">b must be > 0 and ≠ 1.</span>';return;}
                // axes
                svg.appendChild(el('line',{x1:0,y1:oy,x2:W,y2:oy,stroke:'rgba(221,225,240,0.30)','stroke-width':1}));
                svg.appendChild(el('line',{x1:ox,y1:0,x2:ox,y2:H,stroke:'rgba(221,225,240,0.30)','stroke-width':1}));
                // y = x line
                let dLine='M '+toPx(-7,-7).join(',')+' L '+toPx(7,7).join(',');
                svg.appendChild(el('path',{d:dLine,stroke:'rgba(221,225,240,0.25)','stroke-width':1,'stroke-dasharray':'4,3',fill:'none'}));
                // exponential y = b^x
                let expPts=[];
                for(let px=0;px<=W;px+=2){
                  const x=(px-ox)/scale;
                  const y=Math.pow(b,x);
                  if(y>-8&&y<8){const [X,Y]=toPx(x,y); expPts.push(X+','+Y);}
                }
                svg.appendChild(el('polyline',{points:expPts.join(' '),fill:'none',stroke:'#6ee7b7','stroke-width':2}));
                // logarithm y = log_b(x), i.e. x = b^y
                let logPts=[];
                for(let py=0;py<=H;py+=2){
                  const y=(oy-py)/scale;
                  const x=Math.pow(b,y);
                  if(x>0&&x<8){const [X,Y]=toPx(x,y); logPts.push(X+','+Y);}
                }
                svg.appendChild(el('polyline',{points:logPts.join(' '),fill:'none',stroke:'#fcd34d','stroke-width':2}));
                svg.appendChild(el('circle',{cx:toPx(0,1)[0],cy:toPx(0,1)[1],r:3,fill:'#6ee7b7'}));
                svg.appendChild(el('circle',{cx:toPx(1,0)[0],cy:toPx(1,0)[1],r:3,fill:'#fcd34d'}));
                out.innerHTML='<span style="color:#6ee7b7;">■ y = '+b+'ˣ</span> — through (0;1), asymptote y=0<br>'+
                  '<span style="color:#fcd34d;">■ y = log_'+b+'(x)</span> — through (1;0), asymptote x=0<br>'+
                  '<span style="color:rgba(221,225,240,0.45);">- - - y = x (mirror line)</span>';
              }
              document.getElementById('g12c2gB').addEventListener('keydown',e=>{if(e.key==='Enter')draw();});
              document.getElementById('g12c2gBtn').addEventListener('click',draw);
              draw();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "The graph of y = bˣ (b > 1) has:", options: ["A vertical asymptote at x = 0", "A horizontal asymptote at y = 0", "An x-intercept at (1; 0)", "No asymptotes"], answer: 1, topic: "Graphing exponential & logarithmic functions" },
        { type: "mc", text: "The graph of y = log_b(x) always passes through:", options: ["(0; 1)", "(1; 0)", "(0; 0)", "(b; 0)"], answer: 1, topic: "Graphing exponential & logarithmic functions" },
        { type: "mc", text: "For 0 < b < 1, the graph of y = bˣ is:", options: ["Increasing", "Decreasing", "Constant", "A straight line"], answer: 1, topic: "Graphing exponential & logarithmic functions" },
        { type: "mc", text: "Reflecting f(x) = 3ˣ in the y-axis gives the function:", options: ["y = −3ˣ", "y = 3⁻ˣ", "y = log₃x", "y = 3ˣ⁻¹"], answer: 1, topic: "Graphing exponential & logarithmic functions" },
        { type: "input", text: "y = log_b(x) has a vertical asymptote at x = ___.", answer: "0", topic: "Graphing exponential & logarithmic functions" },
        { type: "mc", text: "The graphs of y = bˣ and y = log_b(x) are reflections of each other in the line:", options: ["x = 0", "y = 0", "y = x", "y = −x"], answer: 2, topic: "Graphing exponential & logarithmic functions" },
        { type: "input", text: "Determine the inverse of f(x) = 2ˣ⁺¹.", answer: "log₂(x) − 1", altAnswers: ["log2(x)-1", "log_2(x) - 1", "log₂x − 1", "log₂(x)-1"], topic: "Graphing exponential & logarithmic functions" },
        { type: "input", text: "The graph of y = log₃(x) is reflected in the line y = x, then shifted 2 units down to form h(x). Write down h(x).", answer: "3ˣ − 2", altAnswers: ["3^x - 2", "3^x-2"], topic: "Graphing exponential & logarithmic functions" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 2 Workbook — Functions and Logarithms",
    questions: [
      { number: 1, text: "f(x) = x² − 4 (for x ≥ 0).", parts: [
        { label: "a", text: "Find f⁻¹(x) and state its domain.", marks: 3 },
        { label: "b", text: "Sketch both f and f⁻¹ on the same axes, showing y = x.", marks: 3 },
        { label: "c", text: "Find f⁻¹(5).", marks: 1 }
      ]},
      { number: 2, text: "Solve for x (show all working):", parts: [
        { label: "a", text: "log₂(x) + log₂(x − 2) = 3", marks: 4 },
        { label: "b", text: "3^(2x−1) = 7", marks: 4 },
        { label: "c", text: "log(x² − 5x) = log(6)", marks: 4 }
      ]},
      { number: 3, text: "How long (in years, to 1 decimal place) does it take R8 000 to double at 9.5% p.a. compound interest?", parts: [
        { label: "a", text: "Set up the equation.", marks: 2 },
        { label: "b", text: "Solve using logarithms.", marks: 3 }
      ]},
      { number: 4, text: "The table below gives values of a function of the form y = a·bˣ:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>x</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>y</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>20</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>40</td></tr></table>", parts: [
        { label: "a", text: "Use the table to determine the values of a and b.", marks: 3 },
        { label: "b", text: "Hence write down f⁻¹(x), the inverse of y = a·bˣ, in logarithmic form.", marks: 3 },
        { label: "c", text: "Use your equation to predict the value of y when x = 5.", marks: 2 },
        { label: "d", text: "Write down the equation of the horizontal asymptote of the graph of y = a·bˣ.", marks: 1 }
      ]}
    ],
    answers: {
      1: { a: "x=y²−4→y²=x+4→y=√(x+4); domain x≥−4", b: "Parabola and square root reflection", c: "f⁻¹(5)=√9=3" },
      2: { a: "log₂(x(x−2))=3→x(x−2)=8→x²−2x−8=0→(x−4)(x+2)=0→x=4 (reject x=−2)", b: "(2x−1)log3=log7→x=(log7/log3+1)/2≈1.386", c: "x²−5x=6→x²−5x−6=0→x=6 or x=−1 (check both: x=−1→log(6)✓; x=6→log(6)✓ both valid)" },
      3: { a: "16000=8000(1.095)ⁿ→(1.095)ⁿ=2", b: "n=log2/log1.095≈7.6 years" },
      4: { a: "a = 5 (the y-value at x = 0). Ratio between consecutive y-values: 10/5 = 20/10 = 40/20 = 2, so b = 2. Thus y = 5·2ˣ.", b: "Swap x and y: x = 5·2ʸ → 2ʸ = x/5 → y = log₂(x/5). So f⁻¹(x) = log₂(x/5).", c: "y = 5·2⁵ = 5×32 = 160", d: "y = 0" }
    }
  }
});
