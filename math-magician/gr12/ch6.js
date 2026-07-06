// Math Magician — Grade 12, Chapter 6
// Differential Calculus

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 600,
      chapter: 6,
      name: "Limits, first principles & rules",
      fullName: "Limits, differentiation from first principles, and rules of differentiation",
      lesson: {
        heading: "Limits, first principles, and differentiation rules",
        sub: "Chapter 6 · Topic 1",
        body: `
          <p><strong>Differential calculus</strong> is the mathematics of instantaneous rate of change — the gradient of a curve at any point.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The derivative from first principles</div>
            <p>
              The gradient of the tangent to f(x) at point x is:<br>
              <span class="math">f'(x) = lim[h→0] [f(x+h) − f(x)] / h</span><br><br>
              This is the definition. You must show the full limit process in first-principles questions.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ First principles: f(x) = x²</div>
            <p><span class="math">f'(x) = lim[h→0] [(x+h)² − x²] / h</span><br>
            <span class="math">= lim[h→0] [x²+2xh+h² − x²] / h</span><br>
            <span class="math">= lim[h→0] [2xh + h²] / h</span><br>
            <span class="math">= lim[h→0] [2x + h] = 2x</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Rules of differentiation</div>
            <p>
              <strong>Power rule:</strong> <span class="math">d/dx[xⁿ] = nxⁿ⁻¹</span><br>
              <strong>Constant:</strong> <span class="math">d/dx[c] = 0</span><br>
              <strong>Constant multiple:</strong> <span class="math">d/dx[cf(x)] = cf'(x)</span><br>
              <strong>Sum/difference:</strong> <span class="math">d/dx[f ± g] = f' ± g'</span><br><br>
              Notation: f'(x), dy/dx, Dₓ[y], ẏ are all equivalent.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Examples: Apply the rules</div>
            <p><strong>(a)</strong> f(x) = 3x⁴ − 5x² + 7 → f'(x) = 12x³ − 10x<br>
            <strong>(b)</strong> y = 2/x + √x = 2x⁻¹ + x^(½) → dy/dx = −2x⁻² + ½x^(−½)<br>
            <strong>(c)</strong> g(x) = (x + 1)(x − 3) = x² − 2x − 3 → g'(x) = 2x − 2</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Polynomial Derivative Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Differentiate f(x) = ax³+bx²+cx+d and evaluate f'(x) at a point.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (x³)</div><input id="g12c6a" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (x²)</div><input id="g12c6b" type="number" value="-5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (x)</div><input id="g12c6c" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d (const)</div><input id="g12c6d" type="number" value="7" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Eval at x=</div><input id="g12c6x0" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c6Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Differentiate</button>
            </div>
            <div id="g12c6Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function t(coef,exp){if(coef===0)return'';const sign=coef>0?'+':'';return sign+(exp>0?coef+'x'+(exp>1?'<sup>'+exp+'</sup>':''):''+coef);}
              function calc(){
                const a=gv('g12c6a'),b=gv('g12c6b'),c=gv('g12c6c'),d=gv('g12c6d'),x0=gv('g12c6x0');
                const out=document.getElementById('g12c6Out');
                if([a,b,c,d,x0].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter all values.</span>';return;}
                // f(x) = ax³+bx²+cx+d
                // f'(x) = 3ax²+2bx+c
                const da=3*a,db=2*b,dc=c;
                const fx0=a*x0*x0*x0+b*x0*x0+c*x0+d;
                const fpx0=da*x0*x0+db*x0+dc;
                const fppx0=6*a*x0+2*b;
                // tangent: y − f(x0) = f'(x0)(x − x0)
                const yint=fx0-fpx0*x0;
                let pstr='f(x) = ';
                if(a!==0) pstr+=a+'x³';
                if(b!==0) pstr+=(b>0&&a!==0?'+':'')+b+'x²';
                if(c!==0) pstr+=(c>0&&(a!==0||b!==0)?'+':'')+c+'x';
                if(d!==0) pstr+=(d>0&&(a!==0||b!==0||c!==0)?'+':'')+d;
                let html='<span style="color:rgba(221,225,240,0.50);">'+pstr+'</span><br>';
                html+='<span style="color:#fcd34d;">f\'(x) = '+da+'x² + '+db+'x + '+dc+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">f\'\'(x) = '+(6*a)+'x + '+(2*b)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">f('+x0+') = '+fx0+'</span>   <span style="color:#6ee7b7;">f\'('+x0+') = '+fpx0+'</span>   <span style="color:rgba(221,225,240,0.50);">f\'\'('+x0+') = '+fppx0+'</span><br>';
                html+='<span style="color:#6ee7b7;">Tangent at ('+x0+', '+fx0+'): y = '+fpx0+'x + '+yint+'</span>';
                out.innerHTML=html;
              }
              ['g12c6a','g12c6b','g12c6c','g12c6d','g12c6x0'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c6Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Using first principles, the derivative of f(x) = 3x is:", options: ["3x", "3", "0", "3x²"], answer: 1, topic: "Limits, first principles & rules" },
        { type: "mc", text: "Differentiate: y = 5x³ − 2x + 8", options: ["15x² − 2", "5x² − 2x", "15x² − 2x + 8", "15x³ − 2"], answer: 0, topic: "Limits, first principles & rules" },
        { type: "input", text: "f(x) = x⁴ − 3x². Find f'(2).", answer: "20", topic: "Limits, first principles & rules" },
        { type: "mc", text: "dy/dx of y = 4/x²:", options: ["−8/x³", "8x", "−8x³", "4x⁻¹"], answer: 0, topic: "Limits, first principles & rules" },
        { type: "mc", text: "Differentiate: f(x) = (2x − 1)²", options: ["2(2x−1)", "4(2x−1)", "4x − 2", "Both B and C"], answer: 1, topic: "Limits, first principles & rules" }
      ]
    },
    {
      id: 601,
      chapter: 6,
      name: "Tangents, curve sketching & optimisation",
      fullName: "Tangent lines, second derivative, cubic curve sketching, and optimisation",
      lesson: {
        heading: "Tangents, curve sketching, and optimisation",
        sub: "Chapter 6 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Equation of tangent to a curve</div>
            <p>
              At point (a, f(a)), the tangent has gradient m = f'(a).<br>
              Equation: <span class="math">y − f(a) = f'(a)(x − a)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Second derivative and concavity</div>
            <p>
              <span class="math">f''(x)</span> = derivative of f'(x)<br>
              f''(x) > 0: concave up (minimum turning point)<br>
              f''(x) &lt; 0: concave down (maximum turning point)<br>
              f''(x) = 0: possible point of inflection
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Sketching a cubic f(x) = ax³ + bx² + cx + d</div>
            <p>
              <strong>Step 1:</strong> y-intercept: f(0) = d<br>
              <strong>Step 2:</strong> x-intercepts: solve f(x) = 0 (factor theorem)<br>
              <strong>Step 3:</strong> Stationary points: solve f'(x) = 0 → find (x, f(x))<br>
              <strong>Step 4:</strong> Nature via f''(x): pos = min, neg = max<br>
              <strong>Step 5:</strong> Point of inflection: f''(x) = 0<br>
              <strong>Step 6:</strong> End behaviour: sign of a
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Optimisation</div>
            <p>
              To find maximum/minimum value of a quantity:<br>
              1. Write a formula for the quantity in terms of one variable<br>
              2. Differentiate and set equal to 0<br>
              3. Confirm max/min via second derivative or sign of f'<br>
              4. State answer in context with units
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Cubic Stationary Points & Inflection Finder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter f(x) = ax³+bx²+cx+d — find turning points, their nature, and point of inflection.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c6t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g12c6t2b" type="number" value="-3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g12c6t2c" type="number" value="-9" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d</div><input id="g12c6t2d" type="number" value="27" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c6t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Analyse</button>
            </div>
            <div id="g12c6t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c6t2a'),b=gv('g12c6t2b'),c=gv('g12c6t2c'),d=gv('g12c6t2d');
                const out=document.getElementById('g12c6t2Out');
                if([a,b,c,d].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter cubic (a ≠ 0).</span>';return;}
                const f=x=>a*x*x*x+b*x*x+c*x+d;
                // f'(x) = 3ax²+2bx+c → set to 0
                const disc=4*b*b-4*3*a*c;
                let html='<span style="color:rgba(221,225,240,0.50);">f\'(x) = '+3*a+'x² + '+2*b+'x + '+c+'</span><br>';
                if(disc<0){html+='<span style="color:#fca5a5;">Δ < 0 → no real stationary points.</span>';}
                else{
                  const x1=(-2*b+Math.sqrt(disc))/(2*3*a),x2=(-2*b-Math.sqrt(disc))/(2*3*a);
                  const pts=[x1,x2].sort((a,b)=>a-b);
                  pts.forEach(x=>{
                    const fx=f(x);
                    const fpp=6*a*x+2*b;
                    const nature=fpp>0?'minimum':'maximum';
                    html+='<span style="color:#fcd34d;">Stationary point at x = '+f4(x)+': f(x) = '+f4(fx)+'  →  '+nature+' (f\'\'= '+f4(fpp)+')</span><br>';
                  });
                }
                const xi=-b/(3*a),fxi=f(xi);
                html+='<span style="color:#6ee7b7;">Point of inflection (f\'\'=0): x = '+f4(xi)+', y = '+f4(fxi)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">y-intercept: (0, '+d+')   End behaviour: a='+a+(a>0?' → falls left, rises right':' → rises left, falls right')+'</span>';
                out.innerHTML=html;
              }
              ['g12c6t2a','g12c6t2b','g12c6t2c','g12c6t2d'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c6t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = x³ − 3x + 2. Stationary points at x =", options: ["x = 1 and x = −1", "x = 3 and x = −3", "x = 0 only", "x = 2 only"], answer: 0, topic: "Tangents, curve sketching & optimisation" },
        { type: "mc", text: "f''(x) = −6 at a stationary point means:", options: ["Minimum", "Maximum", "Point of inflection", "Cannot determine"], answer: 1, topic: "Tangents, curve sketching & optimisation" },
        { type: "input", text: "f(x) = x² − 4x + 3. Find the x-coordinate of the minimum.", answer: "2", topic: "Tangents, curve sketching & optimisation" },
        { type: "mc", text: "Tangent to y = x² at x = 3 has gradient:", options: ["9", "6", "3", "12"], answer: 1, topic: "Tangents, curve sketching & optimisation" },
        { type: "mc", text: "A box with square base of side x and height h has volume 500 = x²h. To minimise surface area, the first step is to:", options: ["Differentiate SA immediately", "Express h in terms of x using V=500", "Set SA = 0", "Differentiate V"], answer: 1, topic: "Tangents, curve sketching & optimisation" }
      ]
    },
    {
      id: 602,
      chapter: 6,
      name: "Rates of change & calculus of motion",
      fullName: "Average vs instantaneous rate of change, and calculus of motion (displacement, velocity, acceleration)",
      lesson: {
        heading: "Rates of change and calculus of motion",
        sub: "Chapter 6 · Topic 3",
        body: `
          <p>Differentiation gives us a precise language for <strong>how fast a quantity is changing</strong> — this includes objects moving along a line.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Average rate of change</div>
            <p>
              The average rate of change of f(x) between x = a and x = b is the gradient of the chord joining the two points:<br>
              <span class="math">Average rate of change = [f(b) − f(a)] / (b − a)</span><br><br>
              This is the same formula as average gradient from Grade 10/11 functions work.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Instantaneous rate of change</div>
            <p>
              The <strong>instantaneous</strong> rate of change of f at x = a is <span class="math">f'(a)</span> — the derivative evaluated at that point.<br>
              This is the limit of the average rate of change as b → a (i.e. as the interval shrinks to a single point).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Calculus of motion</div>
            <p>
              If s(t) is the displacement of an object at time t, then:<br>
              <strong>Velocity:</strong> <span class="math">v(t) = s'(t) = ds/dt</span><br>
              <strong>Acceleration:</strong> <span class="math">a(t) = v'(t) = s''(t)</span><br><br>
              The object is <strong>stationary</strong> (momentarily at rest) when v(t) = 0.<br>
              The velocity is a <strong>maximum or minimum</strong> when a(t) = 0.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>A ball's height is s(t) = 30t − 5t² (metres, t in seconds).<br>
            v(t) = s'(t) = 30 − 10t<br>
            Ball is stationary (reaches greatest height) when v(t) = 0 → 30 − 10t = 0 → t = 3 s<br>
            a(t) = v'(t) = −10 m/s² (constant deceleration due to gravity)</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Sign conventions</div>
            <p>
              v(t) &gt; 0: moving in the positive direction<br>
              v(t) &lt; 0: moving in the negative direction<br>
              v(t) = 0: momentarily at rest (often a turning point of s(t))<br>
              a(t) &gt; 0: speeding up in the positive direction (or slowing down if moving negatively)
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Motion Analyser</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter s(t) = at² + bt + c — find velocity, acceleration, and when the object is stationary.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (t²)</div><input id="g12c6t3a" type="number" value="-5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (t)</div><input id="g12c6t3b" type="number" value="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (const)</div><input id="g12c6t3c" type="number" value="0" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Eval at t=</div><input id="g12c6t3t0" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c6t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Analyse motion</button>
            </div>
            <div id="g12c6t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c6t3a'),b=gv('g12c6t3b'),c=gv('g12c6t3c'),t0=gv('g12c6t3t0');
                const out=document.getElementById('g12c6t3Out');
                if([a,b,c,t0].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter all values.</span>';return;}
                const s=t=>a*t*t+b*t+c;
                const v=t=>2*a*t+b;
                const acc=2*a;
                let html='<span style="color:rgba(221,225,240,0.50);">s(t) = '+a+'t² + '+b+'t + '+c+'</span><br>';
                html+='<span style="color:#fcd34d;">v(t) = s\\'(t) = '+(2*a)+'t + '+b+'</span><br>';
                html+='<span style="color:#fcd34d;">a(t) = v\\'(t) = '+acc+'  (constant)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">s('+t0+') = '+f4(s(t0))+'   v('+t0+') = '+f4(v(t0))+'</span><br>';
                if(a!==0){
                  const tstat=-b/(2*a);
                  html+='<span style="color:#6ee7b7;">Stationary (v=0) at t = '+f4(tstat)+' s, giving s = '+f4(s(tstat))+' m</span>';
                } else {
                  html+='<span style="color:rgba(221,225,240,0.50);">v(t) is constant '+b+' — object never stops (unless b=0).</span>';
                }
                out.innerHTML=html;
              }
              ['g12c6t3a','g12c6t3b','g12c6t3c','g12c6t3t0'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c6t3Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "s(t) = 40t − 5t². The velocity function v(t) is:", options: ["40 − 10t", "40 − 5t", "−10", "40t − 10"], answer: 0, topic: "Rates of change & calculus of motion" },
        { type: "input", text: "s(t) = 40t − 5t². Find the time t when the object is momentarily at rest.", answer: "4", topic: "Rates of change & calculus of motion" },
        { type: "mc", text: "For s(t) = t³ − 6t² + 9t, the acceleration function a(t) is:", options: ["6t − 12", "3t² − 12t + 9", "6t", "12"], answer: 0, topic: "Rates of change & calculus of motion" },
        { type: "mc", text: "The average rate of change of f(x) = x² between x = 1 and x = 4 is:", options: ["5", "15", "3", "16"], answer: 0, topic: "Rates of change & calculus of motion" },
        { type: "mc", text: "If v(t) &lt; 0 for an object moving along a line, this means the object is:", options: ["Speeding up", "Moving in the negative direction", "At rest", "Accelerating positively"], answer: 1, topic: "Rates of change & calculus of motion" },
        { type: "input", text: "s(t) = t² − 8t + 20. Find the minimum displacement (the value of s at the stationary point).", answer: "4", topic: "Rates of change & calculus of motion" }
      ]
    },
    {
      id: 603,
      chapter: 6,
      name: "Cubic graphs: full analysis & interpretation",
      fullName: "Full analysis of cubic graphs — intercepts, turning points, inflection, and reading information off a given graph",
      lesson: {
        heading: "Cubic graphs: full analysis and interpretation",
        sub: "Chapter 6 · Topic 4",
        body: `
          <p>Exam questions often give you a <strong>sketch or partial information</strong> about a cubic and ask you to reconstruct facts about it using calculus — this topic focuses on that skill.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Reading a cubic graph</div>
            <p>
              Given a sketch of y = f(x), you should be able to identify directly from the picture:<br>
              • x-intercepts → roots of f(x) = 0<br>
              • y-intercept → f(0)<br>
              • Turning points → where f'(x) = 0 (read the x-coordinate off the graph)<br>
              • Where f is increasing → f'(x) &gt; 0 (graph rising, reading left to right)<br>
              • Where f is decreasing → f'(x) &lt; 0 (graph falling)<br>
              • Point of inflection → where concavity changes (f''(x) = 0)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 From f'(x) graph back to f(x)</div>
            <p>
              If you are shown the graph of the <strong>derivative</strong> f'(x) instead of f(x) itself:<br>
              • x-intercepts of f'(x) → stationary points (turning points) of f(x)<br>
              • f'(x) &gt; 0 (above x-axis) → f(x) increasing over that interval<br>
              • f'(x) &lt; 0 (below x-axis) → f(x) decreasing over that interval<br>
              • Turning point of f'(x) itself → point of inflection of f(x)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>f(x) = x³ − 3x² has stationary points at x = 0 and x = 2 (from f'(x) = 3x² − 6x = 0).<br>
            f(0) = 0 (local maximum, since f''(0) = −6 &lt; 0)<br>
            f(2) = 8 − 12 = −4 (local minimum, since f''(2) = 6 &gt; 0)<br>
            So f is increasing on x &lt; 0, decreasing on 0 &lt; x &lt; 2, increasing again on x &gt; 2.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Sketching checklist</div>
            <p>
              1. Shape from sign of a (leading coefficient)<br>
              2. Intercepts (x and y)<br>
              3. Turning points with nature<br>
              4. Point of inflection<br>
              5. Smooth curve through all features, respecting increasing/decreasing intervals
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Increasing/Decreasing Interval Finder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter f(x) = ax³+bx²+cx+d — see the intervals where f is increasing or decreasing.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c6t4a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g12c6t4b" type="number" value="-3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g12c6t4c" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d</div><input id="g12c6t4d" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c6t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find intervals</button>
            </div>
            <div id="g12c6t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c6t4a'),b=gv('g12c6t4b'),c=gv('g12c6t4c'),d=gv('g12c6t4d');
                const out=document.getElementById('g12c6t4Out');
                if([a,b,c,d].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter cubic (a ≠ 0).</span>';return;}
                const f=x=>a*x*x*x+b*x*x+c*x+d;
                const disc=4*b*b-4*3*a*c;
                let html='<span style="color:rgba(221,225,240,0.50);">f\\'(x) = '+(3*a)+'x² + '+(2*b)+'x + '+c+'</span><br>';
                if(disc<0){
                  html+='<span style="color:#fca5a5;">No real turning points — f is '+(a>0?'always increasing':'always decreasing')+'.</span>';
                } else {
                  const x1=(-2*b+Math.sqrt(disc))/(2*3*a),x2=(-2*b-Math.sqrt(disc))/(2*3*a);
                  const pts=[x1,x2].sort((p,q)=>p-q);
                  const lo=f4(pts[0]),hi=f4(pts[1]);
                  if(a>0){
                    html+='<span style="color:#6ee7b7;">Increasing: x &lt; '+lo+'  or  x &gt; '+hi+'</span><br>';
                    html+='<span style="color:#fcd34d;">Decreasing: '+lo+' &lt; x &lt; '+hi+'</span>';
                  } else {
                    html+='<span style="color:#fcd34d;">Decreasing: x &lt; '+lo+'  or  x &gt; '+hi+'</span><br>';
                    html+='<span style="color:#6ee7b7;">Increasing: '+lo+' &lt; x &lt; '+hi+'</span>';
                  }
                }
                out.innerHTML=html;
              }
              ['g12c6t4a','g12c6t4b','g12c6t4c','g12c6t4d'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c6t4Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = x³ − 3x² + 4 has a local maximum at x = 0. Over which interval is f increasing?", options: ["x &lt; 0", "0 &lt; x &lt; 2", "x &gt; 2", "Both A and C"], answer: 3, topic: "Cubic graphs: full analysis & interpretation" },
        { type: "mc", text: "On the graph of f'(x), an x-intercept corresponds to which feature of f(x)?", options: ["A y-intercept", "A turning point", "An asymptote", "A point of inflection only"], answer: 1, topic: "Cubic graphs: full analysis & interpretation" },
        { type: "mc", text: "If f'(x) &gt; 0 for all x &lt; 1 and f'(x) &lt; 0 for all x &gt; 1, then at x = 1, f has a:", options: ["Local minimum", "Local maximum", "Point of inflection", "x-intercept"], answer: 1, topic: "Cubic graphs: full analysis & interpretation" },
        { type: "input", text: "f(x) = x³ − 12x. Find the x-value(s) where f is at a local minimum (give the positive value).", answer: "2", topic: "Cubic graphs: full analysis & interpretation" },
        { type: "mc", text: "A cubic with a &gt; 0 has turning points at x = −1 (max) and x = 3 (min). f is decreasing on:", options: ["x &lt; −1", "−1 &lt; x &lt; 3", "x &gt; 3", "All real x"], answer: 1, topic: "Cubic graphs: full analysis & interpretation" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 6 Workbook — Differential Calculus",
    questions: [
      { number: 1, text: "Determine f'(x) from first principles for f(x) = 2x² − 3.", parts: [
        { label: "a", text: "Write the definition of f'(x).", marks: 1 },
        { label: "b", text: "Find f(x+h) and simplify f(x+h) − f(x).", marks: 3 },
        { label: "c", text: "Find the limit as h → 0.", marks: 2 }
      ]},
      { number: 2, text: "Differentiate the following (simplify first where necessary):", parts: [
        { label: "a", text: "f(x) = 3x⁵ − 4x³ + 7x − 2", marks: 2 },
        { label: "b", text: "g(x) = (x² − 1)/x", marks: 3 },
        { label: "c", text: "h(x) = (x + 2)²(x − 1)", marks: 4 }
      ]},
      { number: 3, text: "f(x) = x³ − 3x² − 9x + 27", parts: [
        { label: "a", text: "Find all intercepts.", marks: 4 },
        { label: "b", text: "Find the coordinates of the turning points and determine their nature.", marks: 5 },
        { label: "c", text: "Find the point of inflection.", marks: 2 },
        { label: "d", text: "Sketch the curve.", marks: 3 }
      ]},
      { number: 4, text: "A farmer has 120 m of fencing to enclose a rectangular area against a straight wall (wall forms one side).", parts: [
        { label: "a", text: "Write the area A in terms of x (width perpendicular to wall).", marks: 2 },
        { label: "b", text: "Find the dimensions that maximise A.", marks: 4 },
        { label: "c", text: "Find the maximum area.", marks: 1 }
      ]}
    ],
    answers: {
      1: { a: "f'(x)=lim[h→0][f(x+h)−f(x)]/h", b: "f(x+h)=2(x+h)²−3=2x²+4xh+2h²−3; diff=4xh+2h²", c: "lim=(4x+2h)→4x; f'(x)=4x" },
      2: { a: "15x⁴−12x²+7", b: "g=x−x⁻¹→g'=1+x⁻²=1+1/x²", c: "h=(x²+4x+4)(x−1)=x³+3x²−4→h'=3x²+6x" },
      3: { a: "y-int:(0,27); f(x)=(x−3)²(x+3) nope... factor: f(3)=27−27−27+27=0; f(x)=(x−3)(x²−9)... test: (x−3)²(x+3)? Check: x-ints at x=3(double) and x=−3", b: "f'=3x²−6x−9=3(x²−2x−3)=3(x−3)(x+1)=0→x=3,x=−1; f(3)=0(min,f''=12>0); f(−1)=32(max,f''=−12<0)", c: "f''=6x−6=0→x=1; f(1)=16; inflection (1,16)", d: "Rising cubic, max(−1,32), min(3,0), cuts x at −3 and touches at 3" },
      4: { a: "2x+y=120→y=120−2x; A=x(120−2x)=120x−2x²", b: "A'=120−4x=0→x=30m; y=60m", c: "A=30×60=1800 m²" }
    }
  }
});
