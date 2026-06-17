// Math Magician — Grade 10, Chapter 4
// Equations and Inequalities

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 400,
      chapter: 4,
      name: "Linear & quadratic equations",
      fullName: "Solving linear equations, quadratic equations, and simultaneous equations",
      lesson: {
        heading: "Linear, quadratic, and simultaneous equations",
        sub: "Chapter 4 · Topic 1",
        body: `
          <p>Equations are mathematical statements that two expressions are equal. Grade 10 introduces <strong>quadratic equations</strong> and <strong>simultaneous equations</strong>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Linear equations</div>
            <p>Form: <span class="math">ax + b = c</span>. Isolate x by performing inverse operations on both sides.<br>
            Example: <span class="math">3x − 5 = 7 → 3x = 12 → x = 4</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Quadratic equations</div>
            <p>Form: <span class="math">ax² + bx + c = 0</span>. Methods:<br>
            1. <strong>Factorisation</strong> — set each factor = 0<br>
            2. <strong>Formula:</strong> <span class="math">x = (−b ± √(b²−4ac)) / 2a</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve x² − 5x + 6 = 0</div>
            <p><strong>Factorisation:</strong><br>
            <span class="math">(x − 2)(x − 3) = 0</span><br>
            <span class="math">x = 2</span> or <span class="math">x = 3</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Simultaneous equations (2 unknowns)</div>
            <p>
              <strong>Substitution method:</strong> Isolate one variable in one equation; substitute into the other.<br>
              <strong>Elimination method:</strong> Multiply equations to match coefficients, then add/subtract to eliminate one variable.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve simultaneously</div>
            <p><span class="math">2x + y = 7 … (1)</span><br>
            <span class="math">x − y = 2 … (2)</span><br>
            Add: <span class="math">3x = 9 → x = 3</span><br>
            Sub into (2): <span class="math">3 − y = 2 → y = 1</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Equation Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Solve a <strong>linear</strong> (ax + b = c) or <strong>quadratic</strong> (ax² + bx + c = 0) equation step by step.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Type</div>
                <select id="g10c4type"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;">
                  <option value="linear">Linear: ax + b = c</option>
                  <option value="quad">Quadratic: ax² + bx + c = 0</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div>
                <input id="g10c4a" type="number" value="3"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div>
                <input id="g10c4b" type="number" value="-5"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div>
                <input id="g10c4c" type="number" value="7"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c4Btn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Solve
              </button>
            </div>
            <div id="g10c4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gcd(a,b){a=Math.abs(a);b=Math.abs(b);return b===0?a:gcd(b,a%b);}
              function frac(n,d){if(d===0)return'undefined';const g=gcd(Math.abs(n),Math.abs(d));let nn=n/g,dd=d/g;if(dd<0){nn=-nn;dd=-dd;}return dd===1?''+nn:nn+'/'+dd;}
              function nice(x){return Math.abs(x-Math.round(x))<0.0001;}
              function run(){
                const type=document.getElementById('g10c4type').value;
                const a=parseFloat(document.getElementById('g10c4a').value);
                const b=parseFloat(document.getElementById('g10c4b').value);
                const c=parseFloat(document.getElementById('g10c4c').value);
                const out=document.getElementById('g10c4Out');
                if([a,b,c].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (a ≠ 0).</span>';return;}
                let html='';
                if(type==='linear'){
                  // ax + b = c → ax = c - b → x = (c-b)/a
                  const rhs=c-b;
                  const x=rhs/a;
                  html='<span style="color:rgba(221,225,240,0.50);">Equation: </span><span style="color:#fcd34d;">'+a+'x '+(b>=0?'+ '+b:'− '+Math.abs(b))+' = '+c+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Step 1 — subtract '+b+' from both sides: '+a+'x = '+(c>=0?c:c)+'−('+b+') = '+rhs+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Step 2 — divide both sides by '+a+':</span><br>';
                  html+='<span style="color:#6ee7b7;">x = '+frac(rhs,a)+(nice(x)&&!Number.isInteger(x)?' ≈ '+x.toFixed(4):'')+'</span>';
                } else {
                  // quadratic ax² + bx + c = 0
                  const disc=b*b-4*a*c;
                  html='<span style="color:rgba(221,225,240,0.50);">Equation: </span><span style="color:#fcd34d;">'+a+'x² '+(b>=0?'+ '+b:'− '+Math.abs(b))+'x '+(c>=0?'+ '+c:'− '+Math.abs(c))+' = 0</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Discriminant Δ = ('+b+')² − 4('+a+')('+c+') = '+disc+'</span><br>';
                  if(disc<0){
                    html+='<span style="color:#fca5a5;">Δ &lt; 0 — no real solutions</span>';
                  } else if(disc===0){
                    const x=-b/(2*a);
                    html+='<span style="color:rgba(221,225,240,0.50);">Δ = 0 — one repeated root:</span><br>';
                    html+='<span style="color:#6ee7b7;">x = '+frac(-b,2*a)+'</span>';
                  } else {
                    const sq=Math.sqrt(disc);
                    const x1=(-b+sq)/(2*a), x2=(-b-sq)/(2*a);
                    const niceDisc=nice(sq);
                    html+='<span style="color:rgba(221,225,240,0.50);">x = (−b ± √Δ) / 2a = ('+(b>=0?'−'+b:'+'+Math.abs(b))+' ± √'+disc+') / '+(2*a)+'</span><br>';
                    if(niceDisc){
                      html+='<span style="color:#6ee7b7;">x = '+frac(-b+Math.round(sq),2*a)+' or x = '+frac(-b-Math.round(sq),2*a)+'</span>';
                    } else {
                      html+='<span style="color:#6ee7b7;">x ≈ '+x1.toFixed(4)+' or x ≈ '+x2.toFixed(4)+'</span><br>';
                      html+='<span style="color:rgba(221,225,240,0.40);font-size:12px;">Irrational roots — exact form: ('+(-b)+' ± √'+disc+') / '+(2*a)+'</span>';
                    }
                  }
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c4Btn').addEventListener('click',run);
              document.getElementById('g10c4type').addEventListener('change',run);
              ['g10c4a','g10c4b','g10c4c'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>For quadratics, always try factorisation first — it's faster. Only use the formula when you can't spot the factors easily.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Solve: 5x − 3 = 2x + 9",
          answer: "4",
          topic: "Linear & quadratic equations"
        },
        {
          type: "mc",
          text: "Solve: x² − 7x + 10 = 0",
          options: ["x = 5 or x = 2", "x = −5 or x = −2", "x = 5 or x = −2", "x = 10 or x = 1"],
          answer: 0,
          topic: "Linear & quadratic equations"
        },
        {
          type: "mc",
          text: "Using the formula, solve 2x² − 3x − 2 = 0:",
          options: ["x = 2 or x = −½", "x = −2 or x = ½", "x = 1 or x = −2", "x = 2 or x = ½"],
          answer: 0,
          topic: "Linear & quadratic equations"
        },
        {
          type: "input",
          text: "Solve simultaneously: x + y = 10 and x − y = 4. Find x.",
          answer: "7",
          topic: "Linear & quadratic equations"
        },
        {
          type: "mc",
          text: "Solve: 2x² + 5x = 3",
          options: ["x = ½ or x = −3", "x = 3 or x = −½", "x = ½ or x = 3", "x = −3 or x = 3"],
          answer: 0,
          topic: "Linear & quadratic equations"
        }
      ]
    },
    {
      id: 401,
      chapter: 4,
      name: "Word problems & inequalities",
      fullName: "Literal equations, word problems, and linear inequalities",
      lesson: {
        heading: "Word problems, literal equations, and inequalities",
        sub: "Chapter 4 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Literal equations</div>
            <p>Making one variable the subject means isolating it on one side.<br>
            Example: Make <span class="math">r</span> the subject of <span class="math">A = πr²</span><br>
            <span class="math">r² = A/π → r = √(A/π)</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Linear inequalities</div>
            <p>Solved like linear equations, with one important difference:<br>
            <strong>If you multiply or divide by a negative number, flip the inequality sign!</strong><br><br>
            Solution is a range; represent on a number line:<br>
            ● = included (≤ or ≥) &nbsp;&nbsp; ○ = excluded (< or >)</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve the inequality</div>
            <p><span class="math">−2x + 3 > 9</span><br>
            <span class="math">−2x > 6</span><br>
            <span class="math">x < −3</span> ← sign flips when dividing by −2</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Word problem approach</div>
            <p><strong>Read</strong> → <strong>Define variables</strong> → <strong>Write equation(s)</strong> → <strong>Solve</strong> → <strong>Check and answer in context</strong><br><br>
            Example: Two numbers differ by 5. Their sum is 31. Find them.<br>
            Let x and x+5 be the numbers.<br>
            <span class="math">x + (x+5) = 31 → 2x = 26 → x = 13</span><br>
            Numbers: 13 and 18.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Linear Inequality Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Solve <strong>ax + b [inequality] c</strong> — see step-by-step working with sign-flip warning.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div>
                <input id="g10c4ia" type="number" value="-2"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div style="padding-bottom:9px;color:rgba(221,225,240,0.60);font-size:16px;font-family:'JetBrains Mono',monospace;">x +</div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div>
                <input id="g10c4ib" type="number" value="3"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sign</div>
                <select id="g10c4iop"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="gt">&gt;</option>
                  <option value="gte">≥</option>
                  <option value="lt">&lt;</option>
                  <option value="lte">≤</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div>
                <input id="g10c4ic" type="number" value="9"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c4iBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Solve
              </button>
            </div>
            <div id="g10c4iOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const opMap={gt:'>',gte:'≥',lt:'<',lte:'≤'};
              function flipOp(op){return{gt:'lt',lt:'gt',gte:'lte',lte:'gte'}[op];}
              function frac(n,d){const g=(function gg(a,b){a=Math.abs(a);b=Math.abs(b);return b===0?a:gg(b,a%b);})(Math.abs(n),Math.abs(d));let nn=n/g,dd=d/g;if(dd<0){nn=-nn;dd=-dd;}return dd===1?''+nn:nn+'/'+dd;}
              function solve(){
                const a=parseFloat(document.getElementById('g10c4ia').value);
                const b=parseFloat(document.getElementById('g10c4ib').value);
                const c=parseFloat(document.getElementById('g10c4ic').value);
                const op=document.getElementById('g10c4iop').value;
                const out=document.getElementById('g10c4iOut');
                if([a,b,c].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (a ≠ 0).</span>';return;}
                const opSym=opMap[op];
                let html='<span style="color:rgba(221,225,240,0.50);">Inequality: </span><span style="color:#fcd34d;">'+a+'x '+(b>=0?'+ '+b:'− '+Math.abs(b))+' '+opSym+' '+c+'</span><br>';
                const rhs=c-b;
                html+='<span style="color:rgba(221,225,240,0.50);">Step 1 — subtract '+b+': '+a+'x '+opSym+' '+rhs+'</span><br>';
                const flipped=a<0;
                const finalOp=flipped?flipOp(op):op;
                const x=rhs/a;
                if(flipped){
                  html+='<span style="color:#fca5a5;">Step 2 — divide by '+a+' (negative!) → </span><span style="color:#fbbf24;">sign flips: '+opSym+' becomes '+opMap[finalOp]+'</span><br>';
                } else {
                  html+='<span style="color:rgba(221,225,240,0.50);">Step 2 — divide by '+a+':</span><br>';
                }
                html+='<span style="color:#6ee7b7;">x '+opMap[finalOp]+' '+frac(rhs,a)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c4iBtn').addEventListener('click',solve);
              ['g10c4ia','g10c4ib','g10c4ic'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')solve();}));
              solve();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The golden rule of inequalities: <strong>dividing or multiplying by a negative number flips the sign</strong>. Everything else works exactly like a normal equation.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Make b the subject: A = ½h(a + b)",
          options: ["b = 2A/h − a", "b = A/h − a", "b = 2A/(h + a)", "b = 2A − ha"],
          answer: 0,
          topic: "Word problems & inequalities"
        },
        {
          type: "mc",
          text: "Solve: −3x + 5 ≥ 14",
          options: ["x ≤ −3", "x ≥ −3", "x ≤ 3", "x ≥ 3"],
          answer: 0,
          topic: "Word problems & inequalities"
        },
        {
          type: "input",
          text: "The perimeter of a rectangle is 34 cm. The length is 3 more than the width. Find the width.",
          answer: "7",
          topic: "Word problems & inequalities"
        },
        {
          type: "mc",
          text: "Solve: 2 < 3x − 1 ≤ 11",
          options: ["1 < x ≤ 4", "1 ≤ x < 4", "x > 1 and x ≤ 4", "1 < x < 4"],
          answer: 0,
          topic: "Word problems & inequalities"
        },
        {
          type: "mc",
          text: "Make h the subject of V = πr²h/3:",
          options: ["h = 3V/(πr²)", "h = V/(3πr²)", "h = 3πr²/V", "h = πr²/(3V)"],
          answer: 0,
          topic: "Word problems & inequalities"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 4 Workbook — Equations and Inequalities",
    questions: [
      {
        number: 1,
        text: "Solve for x:",
        parts: [
          { label: "a", text: "3(2x − 1) = x + 12", marks: 3 },
          { label: "b", text: "(x+2)/3 − (x−1)/2 = 1", marks: 4 },
          { label: "c", text: "x² = 5x", marks: 3 },
          { label: "d", text: "3x² − x − 2 = 0", marks: 3 },
          { label: "e", text: "x² − 3x − 1 = 0 (leave in surd form)", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "Solve the following pairs of simultaneous equations:",
        parts: [
          { label: "a", text: "3x − y = 5 and x + 2y = 8", marks: 5 },
          { label: "b", text: "y = 2x − 1 and x + y = 8", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "Inequalities:",
        parts: [
          { label: "a", text: "Solve and represent on a number line: 5 − 2x < 11", marks: 3 },
          { label: "b", text: "Solve: −3 ≤ 2x + 1 < 7", marks: 3 }
        ]
      },
      {
        number: 4,
        text: "A school tuck shop sells pies at R12 and cooldrinks at R8. On Monday, 35 items were sold for a total of R348. How many pies and how many cooldrinks were sold?",
        parts: [
          { label: "a", text: "Define variables and write two equations.", marks: 3 },
          { label: "b", text: "Solve and state your answer in context.", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "6x−3=x+12 → 5x=15 → x=3",
        b: "2(x+2)−3(x−1)=6 → −x+7=6 → x=1",
        c: "x²−5x=0 → x(x−5)=0 → x=0 or x=5",
        d: "(3x+2)(x−1)=0 → x=−2/3 or x=1",
        e: "x=(3±√13)/2"
      },
      2: {
        a: "x=18/7, y=13/7",
        b: "x+2x−1=8 → 3x=9 → x=3, y=5"
      },
      3: {
        a: "−2x<6 → x>−3",
        b: "−3≤2x+1<7 → −4≤2x<6 → −2≤x<3"
      },
      4: {
        a: "Let p=pies, c=cooldrinks; p+c=35, 12p+8c=348",
        b: "p=17, c=18"
      }
    }
  }
});
