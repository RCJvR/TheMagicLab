// Math Magician — Grade 10, Chapter 1
// Algebraic Expressions

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 100,
      chapter: 1,
      name: "Real numbers & surds",
      fullName: "The real number system, rational & irrational numbers, surds",
      lesson: {
        heading: "Real numbers, rational numbers, and surds",
        sub: "Chapter 1 · Topic 1",
        body: `
          <p>The <strong>real number system</strong> (ℝ) contains every number on the number line. It is divided into two main families: <strong>rational</strong> and <strong>irrational</strong> numbers.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Rational numbers (ℚ)</div>
            <p>A number is <strong>rational</strong> if it can be written as <span class="math">p/q</span> where p, q ∈ ℤ and q ≠ 0.<br>
            This includes: integers, fractions, terminating decimals, and <em>recurring</em> decimals.<br>
            Examples: <span class="math">3, −7, ½, 0.75, 0.3̄</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Irrational numbers</div>
            <p>Numbers that <strong>cannot</strong> be written as <span class="math">p/q</span>. Their decimal expansions are non-terminating and non-recurring.<br>
            Examples: <span class="math">√2, √3, π, ∛5</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Surds</div>
            <p>A <strong>surd</strong> is an irrational root expression such as <span class="math">√5</span> or <span class="math">∛7</span>.<br>
            <span class="math">√9 = 3</span> is <em>not</em> a surd — it simplifies to a rational number.<br>
            <span class="math">√8 = 2√2</span> — always simplify by extracting perfect square factors.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Classify and simplify</div>
            <p>Classify each and simplify where possible:</p>
            <p><strong>(a)</strong> <span class="math">√49</span> → 7 ✓ (rational — perfect square)<br>
            <strong>(b)</strong> <span class="math">√50</span> → <span class="math">√(25 × 2) = 5√2</span> (irrational surd)<br>
            <strong>(c)</strong> <span class="math">√(4/9)</span> → <span class="math">2/3</span> (rational)<br>
            <strong>(d)</strong> <span class="math">0.121212…</span> → rational (recurring decimal = 12/99 = 4/33)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Estimating surds</div>
            <p>To estimate <span class="math">√20</span>: note that <span class="math">4² = 16</span> and <span class="math">5² = 25</span>, so <span class="math">4 &lt; √20 &lt; 5</span>. Since 20 is closer to 16+4=20... try <span class="math">4.4² = 19.36</span> and <span class="math">4.5² = 20.25</span>, so <span class="math">√20 ≈ 4.47</span>.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Surd Simplifier</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a positive integer — classify and simplify its square root.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">√n — enter n</div>
                <input id="g10c1surd" type="number" min="1" max="10000" placeholder="e.g. 72"
                  style="width:110px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c1surdBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Simplify
              </button>
            </div>
            <div id="g10c1surdOut" style="font-size:14px;line-height:2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function largestPSF(n){
                let best=1;
                for(let i=2;i*i<=n;i++){ if(n%(i*i)===0) best=i*i; }
                return best;
              }
              function run(){
                const n=parseInt(document.getElementById('g10c1surd').value);
                const out=document.getElementById('g10c1surdOut');
                if(!n||n<1||isNaN(n)){out.innerHTML='<span style="color:#fca5a5;">Enter a positive integer.</span>';return;}
                const sq=Math.round(Math.sqrt(n));
                if(sq*sq===n){
                  out.innerHTML='<span style="color:#6ee7b7;">√'+n+' = '+sq+'</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">✓ Rational — perfect square, not a surd.</span>';
                } else {
                  const psf=largestPSF(n);
                  const k=Math.round(Math.sqrt(psf));
                  const m=n/psf;
                  const simplified=k===1?'√'+n:k+'√'+m;
                  out.innerHTML='<span style="color:#fca5a5;">Irrational (surd)</span><br>'
                    +'<span style="color:#fcd34d;">√'+n+(psf>1?' = √('+psf+'×'+m+')':'')+' = '+simplified+'</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">Decimal ≈ '+(Math.sqrt(n)).toFixed(4)+'</span><br>'
                    +(psf>1?'<span style="color:rgba(221,225,240,0.40);font-size:12px;">Largest perfect square factor: '+psf+' = '+k+'²</span>':'');
                }
              }
              document.getElementById('g10c1surdBtn').addEventListener('click',run);
              document.getElementById('g10c1surd').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>A surd in simplified form has <strong>no perfect square factors</strong> under the root. Always check: can I pull out 4, 9, 16, 25, 36…?</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Which of the following is an irrational number?",
          options: ["0.375", "√16", "√7", "−⅔"],
          answer: 2,
          topic: "Real numbers & surds"
        },
        {
          type: "mc",
          text: "Simplified form of √72:",
          options: ["8√2", "6√2", "4√3", "3√8"],
          answer: 1,
          topic: "Real numbers & surds"
        },
        {
          type: "input",
          text: "Simplify: √(25/4)",
          answer: "5/2",
          altAnswers: ["2.5", "2,5"],
          topic: "Real numbers & surds"
        },
        {
          type: "mc",
          text: "Between which two consecutive integers does √30 lie?",
          options: ["4 and 5", "5 and 6", "6 and 7", "3 and 4"],
          answer: 1,
          topic: "Real numbers & surds"
        },
        {
          type: "input",
          text: "Simplify: √(3 × 75)",
          answer: "15",
          topic: "Real numbers & surds"
        }
      ]
    },
    {
      id: 101,
      chapter: 1,
      name: "Products & factorisation",
      fullName: "Algebraic products, factorisation, and simplification of fractions",
      lesson: {
        heading: "Products, factorisation, and algebraic fractions",
        sub: "Chapter 1 · Topic 2",
        body: `
          <p>Expanding <strong>products</strong> and reversing the process through <strong>factorisation</strong> are fundamental algebra skills.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Key product types</div>
            <p>
              <strong>Distributive:</strong> <span class="math">a(b + c) = ab + ac</span><br>
              <strong>FOIL / binomial × binomial:</strong> <span class="math">(a + b)(c + d) = ac + ad + bc + bd</span><br>
              <strong>Difference of squares:</strong> <span class="math">(a + b)(a − b) = a² − b²</span><br>
              <strong>Perfect square trinomials:</strong> <span class="math">(a ± b)² = a² ± 2ab + b²</span><br>
              <strong>Sum/difference of cubes:</strong> <span class="math">a³ ± b³ = (a ± b)(a² ∓ ab + b²)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Factorisation strategies (in order)</div>
            <p>
              1. <strong>HCF</strong> — always check first.<br>
              2. <strong>Difference of two squares:</strong> <span class="math">a² − b²</span><br>
              3. <strong>Trinomial:</strong> <span class="math">ax² + bx + c</span> → find factors of ac that add to b<br>
              4. <strong>Grouping</strong> — for four-term expressions
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Factorise completely</div>
            <p><strong>(a)</strong> <span class="math">6x² − 24</span><br>
            = <span class="math">6(x² − 4) = 6(x+2)(x−2)</span></p>
            <p><strong>(b)</strong> <span class="math">x² − 5x + 6</span><br>
            Factors of 6 that add to −5: (−2)(−3) ✓<br>
            = <span class="math">(x − 2)(x − 3)</span></p>
            <p><strong>(c)</strong> <span class="math">2x² + 5x − 3</span><br>
            ac = −6; factors: +6 and −1 → split middle term:<br>
            = <span class="math">2x² + 6x − x − 3 = 2x(x + 3) − 1(x + 3) = (2x − 1)(x + 3)</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Simplifying algebraic fractions</div>
            <p>Factorise numerator and denominator, then cancel common factors.<br>
            <strong>Warning:</strong> you can only cancel <em>factors</em>, never terms.<br>
            Example: <span class="math">(x² − 9)/(x + 3) = (x+3)(x−3)/(x+3) = x − 3</span>, where <span class="math">x ≠ −3</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Quadratic Factoriser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter integer values for <strong>a</strong>, <strong>b</strong>, <strong>c</strong> in ax² + bx + c.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (≠ 0)</div>
                <input id="g10c1fa" type="number" value="1"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div>
                <input id="g10c1fb" type="number" value="-5"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div>
                <input id="g10c1fc" type="number" value="6"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c1fBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Factorise
              </button>
            </div>
            <div id="g10c1fOut" style="font-size:14px;line-height:2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gcd(a,b){a=Math.abs(a);b=Math.abs(b);return b===0?a:gcd(b,a%b);}
              function fmtExpr(a,b,c){
                let s=(a===1?'x²':a===-1?'−x²':a+'x²');
                if(b>0)s+='+'+b+'x'; else if(b<0)s+=b+'x';
                if(c>0)s+='+'+c; else if(c<0)s+=c;
                return s;
              }
              function fmtFactor(m,n){
                // (mx + n)
                let xs=(m===1?'x':m===-1?'−x':m+'x');
                let cs=n>0?' + '+n:n<0?' − '+Math.abs(n):'';
                return '('+xs+cs+')';
              }
              function findFactors(a,b,c){
                // Find integers m,n,p,q: (mx+n)(px+q) with mp=a, nq=c, mq+np=b
                const lim=Math.max(50,Math.abs(c));
                for(let m=1;m<=Math.abs(a);m++){
                  if(a%m!==0)continue;
                  const p=a/m;
                  for(let n=-lim;n<=lim;n++){
                    if(n===0)continue;
                    if(c%n!==0)continue;
                    const q=c/n;
                    if(m*q+n*p===b) return [m,n,p,q];
                  }
                  const mn=-m;
                  const pn=-p;
                  for(let n=-lim;n<=lim;n++){
                    if(n===0)continue;
                    if(c%n!==0)continue;
                    const q=c/n;
                    if(mn*q+n*pn===b) return [mn,n,pn,q];
                  }
                }
                return null;
              }
              function run(){
                const a=parseInt(document.getElementById('g10c1fa').value);
                const b=parseInt(document.getElementById('g10c1fb').value);
                const c=parseInt(document.getElementById('g10c1fc').value);
                const out=document.getElementById('g10c1fOut');
                if(isNaN(a)||isNaN(b)||isNaN(c)){out.innerHTML='<span style="color:#fca5a5;">Enter integers for a, b and c.</span>';return;}
                if(a===0){out.innerHTML='<span style="color:#fca5a5;">a cannot be 0 — that is not a quadratic.</span>';return;}
                const expr=fmtExpr(a,b,c);
                const disc=b*b-4*a*c;
                const discSqrt=Math.sqrt(Math.abs(disc));
                const isPerf=disc>=0&&Math.round(discSqrt)**2===disc;
                let html='<span style="color:rgba(221,225,240,0.50);">Expression: </span><span style="color:#fcd34d;">'+expr+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Δ = b²−4ac = ('+b+')²−4('+a+')('+c+') = '+disc+'</span><br>';
                if(disc<0){
                  html+='<span style="color:#fca5a5;">Δ &lt; 0 — no real factors</span>';
                } else if(!isPerf){
                  const r1=(-b+Math.sqrt(disc))/(2*a), r2=(-b-Math.sqrt(disc))/(2*a);
                  html+='<span style="color:#fca5a5;">Δ not a perfect square — cannot factorise over ℤ</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Irrational roots ≈ '+r1.toFixed(3)+' and '+r2.toFixed(3)+'</span>';
                } else {
                  const f=findFactors(a,b,c);
                  if(f){
                    const [m,n,p,q]=f;
                    const h=gcd(gcd(Math.abs(m),Math.abs(n)),gcd(Math.abs(p),Math.abs(q)));
                    let factored=fmtFactor(m,n)+fmtFactor(p,q);
                    html+='<span style="color:#6ee7b7;">Factored form: </span><span style="color:#fcd34d;">'+factored+'</span>';
                    if(disc===0) html+='<span style="color:rgba(221,225,240,0.50);"> — perfect square trinomial</span>';
                  } else {
                    const r1=(-b+Math.sqrt(disc))/(2*a), r2=(-b-Math.sqrt(disc))/(2*a);
                    html+='<span style="color:#6ee7b7;">Roots: </span><span style="color:#fcd34d;">x = '+r1.toFixed(4)+' or x = '+r2.toFixed(4)+'</span>';
                  }
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c1fBtn').addEventListener('click',run);
              ['g10c1fa','g10c1fb','g10c1fc'].forEach(id=>{
                document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              });
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The discriminant Δ = b² − 4ac tells you everything: <strong>Δ &gt; 0</strong> (two real factors), <strong>Δ = 0</strong> (perfect square), <strong>Δ &lt; 0</strong> (no real factors).</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Expand: (2x − 3)²",
          options: ["4x² − 9", "4x² − 6x + 9", "4x² − 12x + 9", "4x² + 12x + 9"],
          answer: 2,
          topic: "Products & factorisation"
        },
        {
          type: "mc",
          text: "Factorise: 3x² − 48",
          options: ["3(x² − 16)", "3(x − 4)(x + 4)", "3(x − 4)²", "(3x − 12)(x + 4)"],
          answer: 1,
          topic: "Products & factorisation"
        },
        {
          type: "input",
          text: "Simplify: (x² − x − 6)/(x − 3)",
          answer: "x+2",
          altAnswers: ["x + 2"],
          topic: "Products & factorisation"
        },
        {
          type: "mc",
          text: "Factorise: 6x² + x − 2",
          options: ["(3x − 1)(2x + 2)", "(3x + 2)(2x − 1)", "(6x − 1)(x + 2)", "(2x + 1)(3x − 2)"],
          answer: 1,
          topic: "Products & factorisation"
        },
        {
          type: "mc",
          text: "Which expression is equivalent to (a³ − 8)?",
          options: ["(a − 2)³", "(a − 2)(a² + 2a + 4)", "(a − 2)(a² − 2a + 4)", "(a + 2)(a² − 4)"],
          answer: 1,
          topic: "Products & factorisation"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 1 Workbook — Algebraic Expressions",
    questions: [
      {
        number: 1,
        text: "Classify each of the following as rational or irrational. If rational, write as a fraction in simplest form.",
        parts: [
          { label: "a", text: "√144", marks: 1 },
          { label: "b", text: "0.363636…", marks: 2 },
          { label: "c", text: "π − 3", marks: 1 },
          { label: "d", text: "√(8/2)", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Simplify the following (show all working):",
        parts: [
          { label: "a", text: "√(12) + √(75) − √(27)", marks: 3 },
          { label: "b", text: "(3 + √5)(3 − √5)", marks: 2 },
          { label: "c", text: "(√2 + √3)²", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "Expand and simplify:",
        parts: [
          { label: "a", text: "(x + 4)(x − 4)", marks: 2 },
          { label: "b", text: "(2x − 1)(3x + 5)", marks: 3 },
          { label: "c", text: "(x + 2)³", marks: 4 }
        ]
      },
      {
        number: 4,
        text: "Factorise completely:",
        parts: [
          { label: "a", text: "5x² − 20", marks: 3 },
          { label: "b", text: "x² + 2x − 15", marks: 2 },
          { label: "c", text: "2x² − 7x + 3", marks: 3 },
          { label: "d", text: "x³ + 27", marks: 3 },
          { label: "e", text: "ax − ay + bx − by", marks: 3 }
        ]
      },
      {
        number: 5,
        text: "Simplify (state restrictions):",
        parts: [
          { label: "a", text: "(x² − 4)/(x + 2)", marks: 3 },
          { label: "b", text: "(2x² + x − 3)/(2x + 3)", marks: 4 },
          { label: "c", text: "3/(x−1) + 2/(x+1)", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Rational: 12",
        b: "Rational: 4/11",
        c: "Irrational",
        d: "Rational: 2"
      },
      2: {
        a: "2√3 + 5√3 − 3√3 = 4√3",
        b: "9 − 5 = 4",
        c: "2 + 2√6 + 3 = 5 + 2√6"
      },
      3: {
        a: "x² − 16",
        b: "6x² + 7x − 5",
        c: "x³ + 6x² + 12x + 8"
      },
      4: {
        a: "5(x−2)(x+2)",
        b: "(x+5)(x−3)",
        c: "(2x−1)(x−3)",
        d: "(x+3)(x²−3x+9)",
        e: "(a+b)(x−y)"
      },
      5: {
        a: "x−2, x≠−2",
        b: "(x−1), x≠−3/2",
        c: "(5x+1)/((x−1)(x+1))"
      }
    }
  }
});
