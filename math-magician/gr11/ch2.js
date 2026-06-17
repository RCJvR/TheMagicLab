// Math Magician — Grade 11, Chapter 2
// Equations and Inequalities

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 200,
      chapter: 2,
      name: "Completing the square, formula & nature of roots",
      fullName: "Completing the square, quadratic formula, and nature of roots",
      lesson: {
        heading: "Completing the square, formula, and nature of roots",
        sub: "Chapter 2 · Topic 1",
        body: `
          <p>Grade 11 introduces two new solution methods for quadratics and a way to classify roots <em>without solving</em>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Completing the square</div>
            <p>
              To solve <span class="math">ax² + bx + c = 0</span>:<br>
              1. Divide by a (if a ≠ 1)<br>
              2. Move c to the right<br>
              3. Add <span class="math">(b/2a)²</span> to both sides<br>
              4. Write left side as a perfect square<br>
              5. Solve for x<br><br>
              Also used to write a quadratic in vertex form <span class="math">y = a(x−p)² + q</span>.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 The discriminant and nature of roots</div>
            <p>
              For <span class="math">ax² + bx + c = 0</span>, the discriminant is <span class="math">Δ = b² − 4ac</span>.<br><br>
              <strong>Δ > 0:</strong> two real, unequal roots<br>
              &nbsp;&nbsp;• If Δ is a perfect square → two rational roots<br>
              &nbsp;&nbsp;• If Δ is not a perfect square → two irrational roots<br>
              <strong>Δ = 0:</strong> two equal real roots (one repeated root)<br>
              <strong>Δ < 0:</strong> no real roots (roots are non-real)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Nature of roots</div>
            <p><span class="math">2x² − 3x + 5 = 0</span><br>
            <span class="math">Δ = (−3)² − 4(2)(5) = 9 − 40 = −31 < 0</span><br>
            → No real roots.</p>
            <p><span class="math">x² − 6x + 9 = 0</span><br>
            <span class="math">Δ = 36 − 36 = 0</span><br>
            → Two equal real roots (x = 3).</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Discriminant &amp; Roots Classifier</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a, b, c for ax² + bx + c = 0 — get Δ, the nature of roots, and the roots themselves.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c2a" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c2b" type="number" value="-3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g11c2c" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Classify</button>
            </div>
            <div id="g11c2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function isPerfectSq(n){if(n<0)return false;const s=Math.round(Math.sqrt(n));return s*s===n;}
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const a=parseFloat(document.getElementById('g11c2a').value);
                const b=parseFloat(document.getElementById('g11c2b').value);
                const c=parseFloat(document.getElementById('g11c2c').value);
                const out=document.getElementById('g11c2Out');
                if([a,b,c].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (a ≠ 0).</span>';return;}
                const D=b*b-4*a*c;
                let nature;
                if(D<0) nature='Non-real roots (no real solution)';
                else if(D===0) nature='Two equal real roots (repeated root)';
                else if(isPerfectSq(D)) nature='Two rational, unequal real roots';
                else nature='Two irrational, unequal real roots';
                let html='<span style="color:rgba(221,225,240,0.50);">Δ = b² − 4ac = ('+b+')² − 4('+a+')('+c+') = '+b*b+' − '+(4*a*c)+' = </span><span style="color:#fcd34d;">'+D+'</span><br>';
                html+='<span style="color:#6ee7b7;">'+nature+'</span><br>';
                if(D>=0){
                  const sq=Math.sqrt(D);
                  const x1=(-b+sq)/(2*a),x2=(-b-sq)/(2*a);
                  html+='<span style="color:rgba(221,225,240,0.50);">x = (−'+b+' ± √'+D+') / '+(2*a)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">x₁ = '+f(x1)+'</span>  <span style="color:#6ee7b7;">x₂ = '+f(x2)+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c2Btn').addEventListener('click',calc);
              ['g11c2a','g11c2b','g11c2c'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Δ classifies roots <em>without solving</em>. In exam questions asking "for what value of k" — set up Δ equal to the required condition (= 0 for equal roots, ≥ 0 for real roots) and solve for k.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "For x² − 4x + 1 = 0, the discriminant is:",
          options: ["12", "20", "−4", "8"],
          answer: 0,
          topic: "Completing the square, formula & nature of roots"
        },
        {
          type: "mc",
          text: "Δ = 25. The roots are:",
          options: ["Non-real", "Equal", "Two rational unequal", "Two irrational unequal"],
          answer: 2,
          topic: "Completing the square, formula & nature of roots"
        },
        {
          type: "input",
          text: "Find k if x² + kx + 9 = 0 has equal roots. Give the positive value.",
          answer: "6",
          topic: "Completing the square, formula & nature of roots"
        },
        {
          type: "mc",
          text: "Complete the square: x² − 6x + 2 = 0 gives x =",
          options: ["3 ± √7", "3 ± √11", "−3 ± √7", "6 ± √7"],
          answer: 0,
          topic: "Completing the square, formula & nature of roots"
        },
        {
          type: "mc",
          text: "3x² + 5x − 2 = 0. Nature of roots?",
          options: ["Non-real", "Equal", "Rational unequal", "Irrational unequal"],
          answer: 2,
          topic: "Completing the square, formula & nature of roots"
        }
      ]
    },
    {
      id: 201,
      chapter: 2,
      name: "Quadratic inequalities & simultaneous equations",
      fullName: "Quadratic inequalities and simultaneous (linear-quadratic) equations",
      lesson: {
        heading: "Quadratic inequalities and simultaneous equations",
        sub: "Chapter 2 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Solving quadratic inequalities</div>
            <p>
              <strong>Method:</strong><br>
              1. Move all terms to one side → standard form ax² + bx + c [sign] 0<br>
              2. Factorise (or use the formula to find roots)<br>
              3. Sketch the parabola (or use a sign table)<br>
              4. Read off where the parabola is above/below the x-axis<br><br>
              <strong>Key rule:</strong> For a > 0 parabola:<br>
              ax² + bx + c < 0 → between the roots<br>
              ax² + bx + c > 0 → outside the roots
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve x² − x − 6 < 0</div>
            <p>Factorise: <span class="math">(x−3)(x+2) < 0</span><br>
            Roots: x = 3 and x = −2<br>
            Parabola opens upward → below x-axis <em>between</em> roots<br>
            Solution: <span class="math">−2 < x < 3</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Simultaneous equations (one linear, one quadratic)</div>
            <p>
              <strong>Method: substitution</strong><br>
              1. Express one variable from the linear equation.<br>
              2. Substitute into the quadratic equation.<br>
              3. Solve the resulting quadratic.<br>
              4. Back-substitute to find both variables.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: y = x + 1 and y = x² − 3</div>
            <p>Substitute: <span class="math">x + 1 = x² − 3 → x² − x − 4 = 0</span><br>
            <span class="math">x = (1 ± √17)/2</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Quadratic Inequality Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a, b, c for ax² + bx + c — select the inequality sign — get the solution set.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c2t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c2t2b" type="number" value="-1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g11c2t2c" type="number" value="-6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sign</div>
                <select id="g11c2t2sign" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="lt">&lt; 0</option>
                  <option value="le">≤ 0</option>
                  <option value="gt">&gt; 0</option>
                  <option value="ge">≥ 0</option>
                </select>
              </div>
              <button id="g11c2t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
            </div>
            <div id="g11c2t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const a=parseFloat(document.getElementById('g11c2t2a').value);
                const b=parseFloat(document.getElementById('g11c2t2b').value);
                const c=parseFloat(document.getElementById('g11c2t2c').value);
                const sign=document.getElementById('g11c2t2sign').value;
                const out=document.getElementById('g11c2t2Out');
                if([a,b,c].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (a ≠ 0).</span>';return;}
                const D=b*b-4*a*c;
                const strict=sign==='lt'||sign==='gt';
                const lookingBelow=sign==='lt'||sign==='le';
                let html='<span style="color:rgba(221,225,240,0.50);">Δ = '+D+'</span><br>';
                if(D<0){
                  // no real roots — parabola entirely above or below x-axis
                  const aboveAxis=a>0;
                  if((aboveAxis&&lookingBelow)||(!aboveAxis&&!lookingBelow)){html+='<span style="color:#6ee7b7;">No solution (expression is always '+(aboveAxis?'positive':'negative')+')</span>';}
                  else{html+='<span style="color:#6ee7b7;">Solution: x ∈ ℝ (all real numbers; expression always satisfies condition)</span>';}
                  out.innerHTML=html; return;
                }
                if(D===0){
                  const r=-b/(2*a);
                  html+='<span style="color:rgba(221,225,240,0.50);">Double root: x = '+f(r)+'</span><br>';
                  if(strict){html+='<span style="color:#6ee7b7;">'+((a>0&&lookingBelow)||(a<0&&!lookingBelow)?'No solution (strict inequality, double root)':'Solution: x ∈ ℝ, x ≠ '+f(r))+'</span>';}
                  else{html+='<span style="color:#6ee7b7;">Solution: x = '+f(r)+(lookingBelow?' only':' (all x)')+'</span>';}
                  out.innerHTML=html; return;
                }
                const sq=Math.sqrt(D);
                const x1=(-b-sq)/(2*a),x2=(-b+sq)/(2*a);
                const lo=Math.min(x1,x2),hi=Math.max(x1,x2);
                const loBrk=strict?'(':'[', hiBrk=strict?')':']';
                html+='<span style="color:rgba(221,225,240,0.50);">Roots: x = '+f(lo)+' and x = '+f(hi)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Parabola opens '+(a>0?'upward (positive outside roots)':'downward (positive between roots)')+'</span><br>';
                let sol;
                const between=loBrk+f(lo)+' ; '+f(hi)+hiBrk;
                const outside='x < '+f(lo)+' or x > '+f(hi);
                if(a>0){sol=lookingBelow?between:outside;}
                else{sol=lookingBelow?outside:between;}
                if(!strict&&a>0&&!lookingBelow){sol='x ≤ '+f(lo)+' or x ≥ '+f(hi);}
                else if(!strict&&a<0&&lookingBelow){sol='x ≤ '+f(lo)+' or x ≥ '+f(hi);}
                else if(!strict&&a>0&&lookingBelow){sol='['+f(lo)+' ; '+f(hi)+']';}
                else if(!strict&&a<0&&!lookingBelow){sol='['+f(lo)+' ; '+f(hi)+']';}
                html+='<span style="color:#6ee7b7;">Solution: '+sol+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c2t2Btn').addEventListener('click',calc);
              ['g11c2t2a','g11c2t2b','g11c2t2c'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>For a > 0: the parabola dips <em>below</em> the x-axis <em>between</em> the roots. So ax²+bx+c &lt; 0 → between the roots, and &gt; 0 → outside the roots.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Solve: x² − 5x + 6 > 0",
          options: ["2 < x < 3", "x < 2 or x > 3", "x > 3 only", "−3 < x < −2"],
          answer: 1,
          topic: "Quadratic inequalities & simultaneous equations"
        },
        {
          type: "mc",
          text: "Solve: (x + 1)(x − 4) ≤ 0",
          options: ["x ≤ −1 or x ≥ 4", "−1 ≤ x ≤ 4", "x < −1 or x > 4", "−4 ≤ x ≤ 1"],
          answer: 1,
          topic: "Quadratic inequalities & simultaneous equations"
        },
        {
          type: "mc",
          text: "Solve simultaneously: y = 2x − 1 and y = x². Which quadratic results?",
          options: ["x² + 2x − 1 = 0", "x² − 2x + 1 = 0", "x² − 2x − 1 = 0", "x² + 2x + 1 = 0"],
          answer: 1,
          topic: "Quadratic inequalities & simultaneous equations"
        },
        {
          type: "mc",
          text: "Solve: 2x² + x − 3 ≥ 0",
          options: ["−3/2 ≤ x ≤ 1", "x ≤ −3/2 or x ≥ 1", "x ≤ 1 only", "x ≥ 1 only"],
          answer: 1,
          topic: "Quadratic inequalities & simultaneous equations"
        },
        {
          type: "input",
          text: "y = x + 3 and x² + y² = 29. Substituting gives x² + (x+3)² = 29. Expand to get 2x² + 6x + ? = 0 (find the constant).",
          answer: "-20",
          altAnswers: ["−20"],
          topic: "Quadratic inequalities & simultaneous equations"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 2 Workbook — Equations and Inequalities",
    questions: [
      {
        number: 1,
        text: "Without solving, determine the nature of roots:",
        parts: [
          { label: "a", text: "x² + 4x + 5 = 0", marks: 2 },
          { label: "b", text: "4x² − 12x + 9 = 0", marks: 2 },
          { label: "c", text: "3x² − 5x − 2 = 0", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Solve by completing the square:",
        parts: [
          { label: "a", text: "x² − 8x + 3 = 0 (leave in surd form)", marks: 4 },
          { label: "b", text: "2x² + 6x − 1 = 0 (leave in surd form)", marks: 5 }
        ]
      },
      {
        number: 3,
        text: "Find the value(s) of k for which the following have the given nature of roots:",
        parts: [
          { label: "a", text: "x² − kx + 4 = 0: equal roots", marks: 3 },
          { label: "b", text: "kx² − 3x + 1 = 0: non-real roots", marks: 4 }
        ]
      },
      {
        number: 4,
        text: "Solve the following inequalities and represent on a number line:",
        parts: [
          { label: "a", text: "x² − 3x − 10 ≤ 0", marks: 4 },
          { label: "b", text: "−x² + x + 12 > 0", marks: 4 }
        ]
      },
      {
        number: 5,
        text: "Solve simultaneously: y = 3 − x and y = x² − 5",
        parts: [
          { label: "a", text: "Write the resulting quadratic equation.", marks: 2 },
          { label: "b", text: "Solve for x and hence find y.", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Δ=16−20=−4<0 → non-real roots",
        b: "Δ=144−144=0 → equal roots",
        c: "Δ=25+24=49>0, perfect square → rational unequal roots"
      },
      2: {
        a: "x²−8x=−3 → (x−4)²=13 → x=4±√13",
        b: "x²+3x=½ → (x+3/2)²=½+9/4=11/4 → x=(−3±√11)/2"
      },
      3: {
        a: "Δ=k²−16=0 → k=±4",
        b: "Δ=9−4k<0 → k>9/4"
      },
      4: {
        a: "(x−5)(x+2)≤0 → −2≤x≤5",
        b: "−(x−4)(x+3)>0 → (x−4)(x+3)<0 → −3<x<4"
      },
      5: {
        a: "3−x=x²−5 → x²+x−8=0",
        b: "x=(−1±√33)/2; substitute back for y"
      }
    }
  }
});
