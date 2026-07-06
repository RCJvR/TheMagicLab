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
    },
    {
      id: 102,
      chapter: 1,
      name: "Multiplying binomials by trinomials",
      fullName: "Expanding the product of a binomial and a trinomial",
      lesson: {
        heading: "Multiplying a binomial by a trinomial",
        sub: "Chapter 1 · Topic 3",
        body: `
          <p>Grade 10 extends the distributive law to products of a <strong>binomial</strong> (2 terms) and a <strong>trinomial</strong> (3 terms). The method is the same as FOIL, just with more terms to track.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The method — distribute every term</div>
            <p>To expand <span class="math">(a + b)(c + d + e)</span>, multiply <strong>each term</strong> of the binomial by <strong>each term</strong> of the trinomial:<br>
            <span class="math">(a + b)(c + d + e) = ac + ad + ae + bc + bd + be</span><br>
            That gives <strong>6 products</strong> before simplifying — always collect like terms at the end.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Expand (x + 2)(x² − 3x + 4)</div>
            <p>
              <span class="math">x(x² − 3x + 4) = x³ − 3x² + 4x</span><br>
              <span class="math">2(x² − 3x + 4) = 2x² − 6x + 8</span><br>
              Add: <span class="math">x³ − 3x² + 4x + 2x² − 6x + 8</span><br>
              Collect like terms: <span class="math">x³ − x² − 2x + 8</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Special case: (a + b)(a² − ab + b²)</div>
            <p>This particular pattern always simplifies to <span class="math">a³ + b³</span> — it's the reverse of the sum of cubes factorisation you'll meet in the next topic.<br>
            Check with a = x, b = 2: <span class="math">(x + 2)(x² − 2x + 4) = x³ + 8</span> ✓ (verify by expanding)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Staying organised</div>
            <p>Write the binomial's terms down the side and the trinomial's terms across the top like a small grid — this prevents missing a product, especially with negative signs.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Watch your signs carefully when the binomial or trinomial contains subtraction — a common error is dropping a negative sign partway through six multiplications.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Expand: (x + 1)(x² + 2x − 3)",
          options: ["x³ + 3x² − x − 3", "x³ + 2x² − 3x − 3", "x³ + x² − x − 3", "x³ + 3x² + x − 3"],
          answer: 0,
          topic: "Multiplying binomials by trinomials"
        },
        {
          type: "mc",
          text: "Expand: (x − 2)(x² + 2x + 4)",
          options: ["x³ − 8", "x³ + 8", "x³ − 4x² + 8", "x³ − 2x² − 8"],
          answer: 0,
          topic: "Multiplying binomials by trinomials"
        },
        {
          type: "input",
          text: "Expand and simplify: (2x + 1)(x² − x + 3). Give the coefficient of x².",
          answer: "-1",
          altAnswers: ["−1"],
          topic: "Multiplying binomials by trinomials"
        },
        {
          type: "mc",
          text: "Expand: (a − b)(a² + ab + b²)",
          options: ["a³ − b³", "a³ + b³", "a³ − 2ab² − b³", "a³ − a²b − b³"],
          answer: 0,
          topic: "Multiplying binomials by trinomials"
        },
        {
          type: "input",
          text: "Expand (x + 3)(2x² − x + 5) and give the constant term.",
          answer: "15",
          topic: "Multiplying binomials by trinomials"
        }
      ]
    },
    {
      id: 103,
      chapter: 1,
      name: "Sum and difference of cubes",
      fullName: "Factorising the sum and difference of two cubes",
      lesson: {
        heading: "Factorising the sum and difference of two cubes",
        sub: "Chapter 1 · Topic 4",
        body: `
          <p>Just as <span class="math">a² − b²</span> factorises as a difference of squares, cubic expressions of the form <span class="math">a³ ± b³</span> have their own standard factorisation.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The cube factorisation formulas</div>
            <p>
              <strong>Sum of cubes:</strong> <span class="math">a³ + b³ = (a + b)(a² − ab + b²)</span><br>
              <strong>Difference of cubes:</strong> <span class="math">a³ − b³ = (a − b)(a² + ab + b²)</span><br><br>
              Memory aid: <em>"same, opposite, always positive"</em> — the sign in the first bracket matches the original sign; the middle sign in the trinomial is opposite; the last term is always <strong>+</strong>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Factorise x³ + 27</div>
            <p>
              Recognise <span class="math">27 = 3³</span>, so <span class="math">a = x, b = 3</span>.<br>
              <span class="math">x³ + 27 = (x + 3)(x² − 3x + 9)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Factorise 8x³ − 125</div>
            <p>
              <span class="math">8x³ = (2x)³</span> and <span class="math">125 = 5³</span>, so <span class="math">a = 2x, b = 5</span>.<br>
              <span class="math">8x³ − 125 = (2x − 5)(4x² + 10x + 25)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Common cubes to recognise</div>
            <p>1, 8, 27, 64, 125, 216, 343, 512, 729, 1000 — the cubes of 1 to 10. Spotting these instantly makes cube factorisation much faster.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Cube Factoriser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the coefficients for <strong>a</strong> and <strong>b</strong> in a³ ± b³ (as in (ka)³ ± (mb)³ using simple integers) to see the factorisation.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (coefficient of x)</div>
                <input id="g10c1cba" type="number" value="2" min="1"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (constant)</div>
                <input id="g10c1cbb" type="number" value="5" min="1"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sign</div>
                <select id="g10c1cbop"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="plus">+</option>
                  <option value="minus">−</option>
                </select>
              </div>
              <button id="g10c1cbBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Factorise
              </button>
            </div>
            <div id="g10c1cbOut" style="font-size:14px;line-height:2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const a=parseInt(document.getElementById('g10c1cba').value);
                const b=parseInt(document.getElementById('g10c1cbb').value);
                const op=document.getElementById('g10c1cbop').value;
                const out=document.getElementById('g10c1cbOut');
                if(!a||!b||a<1||b<1){out.innerHTML='<span style="color:#fca5a5;">Enter positive integers for a and b.</span>';return;}
                const a3=a*a*a, b3=b*b*b;
                const isPlus=op==='plus';
                const expr=(a===1?'x³':'('+a+'x)³')+(isPlus?' + ':' − ')+b+'³';
                const exprNum=(a===1?'x³':a3+'x³')+(isPlus?' + ':' − ')+b3;
                const firstSign=isPlus?'+':'−';
                const midSign=isPlus?'−':'+';
                const firstBracket='('+(a===1?'x':a+'x')+' '+firstSign+' '+b+')';
                const ax2=a===1?'x²':a3+'x²'.replace('x²',''); // not used directly
                const sqTermCoef=a*a;
                const secondBracket='('+(sqTermCoef===1?'x²':sqTermCoef+'x²')+' '+midSign+' '+(a*b===1?'x':(a*b)+'x')+' + '+(b*b)+')';
                let html='<span style="color:rgba(221,225,240,0.50);">Expression: </span><span style="color:#fcd34d;">'+exprNum+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Recognise as cubes: </span><span style="color:#fcd34d;">'+expr+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Apply '+(isPlus?'sum':'difference')+' of cubes formula:</span><br>';
                html+='<span style="color:#6ee7b7;">'+firstBracket+secondBracket+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c1cbBtn').addEventListener('click',run);
              document.getElementById('g10c1cbop').addEventListener('change',run);
              ['g10c1cba','g10c1cbb'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The trinomial factor <span class="math">a² ∓ ab + b²</span> never factorises further over the integers — don't waste time trying.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Factorise: x³ + 8",
          options: ["(x + 2)(x² − 2x + 4)", "(x + 2)(x² + 2x + 4)", "(x + 2)³", "(x − 2)(x² + 2x + 4)"],
          answer: 0,
          topic: "Sum and difference of cubes"
        },
        {
          type: "mc",
          text: "Factorise: x³ − 64",
          options: ["(x − 4)(x² + 4x + 16)", "(x − 4)(x² − 4x + 16)", "(x + 4)(x² − 4x + 16)", "(x − 4)³"],
          answer: 0,
          topic: "Sum and difference of cubes"
        },
        {
          type: "input",
          text: "Factorise 27x³ + 1. What is the constant term inside the trinomial factor?",
          answer: "1",
          topic: "Sum and difference of cubes"
        },
        {
          type: "mc",
          text: "Factorise: 8x³ − 125",
          options: ["(2x − 5)(4x² + 10x + 25)", "(2x − 5)(4x² − 10x + 25)", "(2x + 5)(4x² − 10x + 25)", "(2x − 5)(2x² + 5x + 25)"],
          answer: 0,
          topic: "Sum and difference of cubes"
        },
        {
          type: "mc",
          text: "Which is the correct first step to factorise 64 + x³y³?",
          options: ["Recognise 64 = 4³ and x³y³ = (xy)³, apply sum of cubes", "Take out a common factor of x", "It cannot be factorised", "Recognise it as a difference of squares"],
          answer: 0,
          topic: "Sum and difference of cubes"
        }
      ]
    },
    {
      id: 104,
      chapter: 1,
      name: "Algebraic fractions with cube denominators",
      fullName: "Simplifying algebraic fractions using sum/difference of cubes factorisation",
      lesson: {
        heading: "Simplifying algebraic fractions with cube-based denominators",
        sub: "Chapter 1 · Topic 5",
        body: `
          <p>Once you can factorise <span class="math">a³ ± b³</span>, you can simplify algebraic fractions whose numerator or denominator is a sum or difference of cubes.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Method</div>
            <p>
              1. Factorise the numerator and denominator completely (look for cube patterns).<br>
              2. Cancel any <strong>common factors</strong> (never common terms).<br>
              3. State the <strong>restrictions</strong> — values that make the original denominator zero.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Simplify (x³ − 8)/(x − 2)</div>
            <p>
              <span class="math">x³ − 8 = (x − 2)(x² + 2x + 4)</span><br>
              <span class="math">(x³ − 8)/(x − 2) = (x − 2)(x² + 2x + 4)/(x − 2) = x² + 2x + 4</span>, where <span class="math">x ≠ 2</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Simplify (x² − x − 6)/(x³ + 8)</div>
            <p>
              Numerator: <span class="math">x² − x − 6 = (x − 3)(x + 2)</span><br>
              Denominator: <span class="math">x³ + 8 = (x + 2)(x² − 2x + 4)</span><br>
              <span class="math">= (x − 3)(x + 2) / [(x + 2)(x² − 2x + 4)] = (x − 3)/(x² − 2x + 4)</span>, where <span class="math">x ≠ −2</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Finding restrictions</div>
            <p>Restrictions come from the <strong>original, unsimplified denominator</strong> — set it equal to zero and solve. Even after cancelling, that value still cannot be substituted in.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Before cancelling, always double-check that the trinomial you're left with (like <span class="math">x² + 2x + 4</span>) really has no more common factors with the other side — cube trinomials never factorise further, but always verify with the specific numbers.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Simplify: (x³ + 27)/(x + 3)",
          options: ["x² − 3x + 9", "x² + 3x + 9", "x² − 9", "x² + 9"],
          answer: 0,
          topic: "Algebraic fractions with cube denominators"
        },
        {
          type: "input",
          text: "Simplify (x³ − 1)/(x − 1) and state the coefficient of x in your answer.",
          answer: "1",
          topic: "Algebraic fractions with cube denominators"
        },
        {
          type: "mc",
          text: "Simplify: (x² − 4)/(x³ − 8)",
          options: ["(x + 2)/(x² + 2x + 4)", "(x − 2)/(x² + 2x + 4)", "(x + 2)/(x² − 2x + 4)", "1/(x² + 2x + 4)"],
          answer: 0,
          topic: "Algebraic fractions with cube denominators"
        },
        {
          type: "mc",
          text: "For (x³ + 8)/(x² − 4), the restriction(s) on x are:",
          options: ["x ≠ 2 and x ≠ −2", "x ≠ −2 only", "x ≠ 2 only", "x ≠ 0"],
          answer: 0,
          topic: "Algebraic fractions with cube denominators"
        },
        {
          type: "input",
          text: "Simplify (2x³ + 2)/(x + 1) and give the constant term of the simplified expression.",
          answer: "2",
          topic: "Algebraic fractions with cube denominators"
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
