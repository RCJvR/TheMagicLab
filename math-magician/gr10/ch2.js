// Math Magician — Grade 10, Chapter 2
// Exponents

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 200,
      chapter: 2,
      name: "Exponent laws",
      fullName: "Revision and application of exponent laws",
      lesson: {
        heading: "Exponent laws",
        sub: "Chapter 2 · Topic 1",
        body: `
          <p>The <strong>exponent laws</strong> provide rules for working with powers. These are extended in Grade 10 to include rational (fractional) exponents.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The exponent laws</div>
            <p>
              <strong>Multiplication:</strong> <span class="math">aᵐ · aⁿ = aᵐ⁺ⁿ</span><br>
              <strong>Division:</strong> <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
              <strong>Power of a power:</strong> <span class="math">(aᵐ)ⁿ = aᵐⁿ</span><br>
              <strong>Power of a product:</strong> <span class="math">(ab)ⁿ = aⁿbⁿ</span><br>
              <strong>Negative exponent:</strong> <span class="math">a⁻ⁿ = 1/aⁿ</span><br>
              <strong>Zero exponent:</strong> <span class="math">a⁰ = 1</span> (a ≠ 0)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Rational exponents (new in Grade 10)</div>
            <p>
              <span class="math">a^(1/n) = ⁿ√a</span> (the nth root of a)<br>
              <span class="math">a^(m/n) = (ⁿ√a)ᵐ = ⁿ√(aᵐ)</span><br>
              Example: <span class="math">8^(2/3) = (∛8)² = 2² = 4</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Simplify</div>
            <p><strong>(a)</strong> <span class="math">2³ · 2⁵ ÷ 2⁴ = 2^(3+5−4) = 2⁴ = 16</span></p>
            <p><strong>(b)</strong> <span class="math">(3x²y)³ = 27x⁶y³</span></p>
            <p><strong>(c)</strong> <span class="math">x^(−2) · x^(5/2) = x^(−2 + 5/2) = x^(1/2) = √x</span></p>
            <p><strong>(d)</strong> <span class="math">27^(2/3) = (∛27)² = 3² = 9</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Strategy tip</div>
            <p>Always <strong>convert surds to rational exponents</strong> before applying exponent laws. This avoids errors and keeps working systematic.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Rational Exponent Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Evaluate <strong>a^(m/n)</strong> step by step — enter the base and fractional exponent.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Base (a)</div>
                <input id="g10c2base" type="number" value="8"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">m (power)</div>
                <input id="g10c2m" type="number" value="2"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n (root)</div>
                <input id="g10c2n" type="number" value="3" min="1"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c2Btn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Evaluate
              </button>
            </div>
            <div id="g10c2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function nthRoot(base, n){ return Math.pow(Math.abs(base), 1/n) * (base < 0 && n%2===1 ? -1 : 1); }
              function isNice(x){ return Math.abs(x - Math.round(x)) < 0.0001; }
              function run(){
                const a=parseFloat(document.getElementById('g10c2base').value);
                const m=parseFloat(document.getElementById('g10c2m').value);
                const n=parseFloat(document.getElementById('g10c2n').value);
                const out=document.getElementById('g10c2Out');
                if(isNaN(a)||isNaN(m)||isNaN(n)||n===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (n ≠ 0).</span>';return;}
                if(a < 0 && n % 2 === 0){out.innerHTML='<span style="color:#fca5a5;">Even root of a negative number is not real.</span>';return;}
                const root = nthRoot(a, n);
                const result = Math.pow(root, m);
                const rootNice = isNice(root);
                const resultNice = isNice(result);
                let html = '<span style="color:rgba(221,225,240,0.50);">Expression: </span><span style="color:#fcd34d;">'+a+'^('+m+'/'+n+')</span><br>';
                html += '<span style="color:rgba(221,225,240,0.50);">Step 1 — take the '+n+(n===2?'nd':n===3?'rd':'th')+' root: ⁿ√'+a+' = '+(rootNice?Math.round(root):root.toFixed(4))+'</span><br>';
                html += '<span style="color:rgba(221,225,240,0.50);">Step 2 — raise to power '+m+': ('+(rootNice?Math.round(root):root.toFixed(4))+')^'+m+' = </span>';
                html += '<span style="color:#6ee7b7;">'+(resultNice?Math.round(result):result.toFixed(4))+'</span>';
                if(!resultNice) html += '<br><span style="color:rgba(221,225,240,0.40);font-size:12px;">Result is irrational — decimal shown</span>';
                out.innerHTML = html;
              }
              document.getElementById('g10c2Btn').addEventListener('click', run);
              ['g10c2base','g10c2m','g10c2n'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Always take the root <em>first</em>, then apply the power — smaller numbers are easier to work with. <span class="math">27^(2/3) = (∛27)² = 3² = 9</span> is much easier than <span class="math">∛(27²) = ∛729</span>.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Simplify: x⁵ · x⁻² ÷ x",
          options: ["x²", "x⁸", "x⁶", "x³"],
          answer: 0,
          topic: "Exponent laws"
        },
        {
          type: "input",
          text: "Evaluate: 16^(3/4)",
          answer: "8",
          topic: "Exponent laws"
        },
        {
          type: "mc",
          text: "Which is equal to (2x³)⁴?",
          options: ["8x⁷", "16x⁷", "16x¹²", "8x¹²"],
          answer: 2,
          topic: "Exponent laws"
        },
        {
          type: "mc",
          text: "Simplify: (a²b⁻³)/(a⁻¹b²)",
          options: ["a³/b", "a³b⁵", "a/b⁵", "a³/b⁵"],
          answer: 3,
          topic: "Exponent laws"
        },
        {
          type: "input",
          text: "Evaluate: (8/27)^(−2/3)",
          answer: "9/4",
          altAnswers: ["2.25", "2,25"],
          topic: "Exponent laws"
        },
        {
          type: "input",
          text: "Simplify without a calculator: 16^(−1/4) × 8^(2/3) ÷ 2^(−1)",
          answer: "4",
          topic: "Exponent laws"
        },
        {
          type: "input",
          text: "If 2^x = 5 and 2^y = 20, determine the value of 2^(y−x) without finding x or y individually.",
          answer: "4",
          topic: "Exponent laws"
        }
      ]
    },
    {
      id: 201,
      chapter: 2,
      name: "Exponential equations",
      fullName: "Solving exponential equations",
      lesson: {
        heading: "Solving exponential equations",
        sub: "Chapter 2 · Topic 2",
        body: `
          <p>An <strong>exponential equation</strong> has the unknown in the exponent. The key strategy is to express both sides with the <strong>same base</strong>, then equate exponents.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Method</div>
            <p>
              <strong>Step 1:</strong> Write both sides as powers of the same base.<br>
              <strong>Step 2:</strong> Set the exponents equal.<br>
              <strong>Step 3:</strong> Solve the resulting equation.<br><br>
              Key fact: if <span class="math">aˣ = aʸ</span> and <span class="math">a > 0, a ≠ 1</span>, then <span class="math">x = y</span>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve</div>
            <p><strong>(a)</strong> <span class="math">2^(x+1) = 8</span><br>
            <span class="math">2^(x+1) = 2³</span><br>
            <span class="math">x + 1 = 3</span><br>
            <span class="math">x = 2</span></p>

            <p><strong>(b)</strong> <span class="math">9^x = 27^(x−1)</span><br>
            <span class="math">(3²)^x = (3³)^(x−1)</span><br>
            <span class="math">3^(2x) = 3^(3x−3)</span><br>
            <span class="math">2x = 3x − 3</span><br>
            <span class="math">x = 3</span></p>

            <p><strong>(c)</strong> <span class="math">4^x − 5·2^x + 4 = 0</span><br>
            Let <span class="math">k = 2^x</span>: <span class="math">k² − 5k + 4 = 0</span><br>
            <span class="math">(k−1)(k−4) = 0</span><br>
            <span class="math">k = 1</span> → <span class="math">2^x = 1</span> → <span class="math">x = 0</span><br>
            <span class="math">k = 4</span> → <span class="math">2^x = 4</span> → <span class="math">x = 2</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Common bases to memorise</div>
            <p>
              Powers of 2: 1, 2, 4, 8, 16, 32, 64, 128, 256<br>
              Powers of 3: 1, 3, 9, 27, 81, 243<br>
              Powers of 5: 1, 5, 25, 125<br>
              Note: <span class="math">4 = 2², 8 = 2³, 9 = 3², 27 = 3³, 25 = 5²</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Exponential Equation Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the base and what the expression equals — see how to convert to the same base and solve.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Base b</div>
                <select id="g10c2eBase"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div style="padding-bottom:8px;color:rgba(221,225,240,0.60);font-size:18px;font-family:'JetBrains Mono',monospace;">b^x =</div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Result</div>
                <input id="g10c2eResult" type="number" value="32"
                  style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c2eBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Solve
              </button>
            </div>
            <div id="g10c2eOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function logBase(b, x){ return Math.log(x) / Math.log(b); }
              function isNice(x){ return Math.abs(x - Math.round(x)) < 0.0001; }
              function solve(){
                const b = parseInt(document.getElementById('g10c2eBase').value);
                const R = parseFloat(document.getElementById('g10c2eResult').value);
                const out = document.getElementById('g10c2eOut');
                if(isNaN(R)||R<=0){out.innerHTML='<span style="color:#fca5a5;">Result must be a positive number.</span>';return;}
                const x = logBase(b, R);
                const nice = isNice(x);
                // Check if R is a power of b
                let html = '<span style="color:rgba(221,225,240,0.50);">Equation: </span><span style="color:#fcd34d;">'+b+'^x = '+R+'</span><br>';
                if(nice){
                  const xi = Math.round(x);
                  html += '<span style="color:rgba(221,225,240,0.50);">Recognise: '+R+' = '+b+(xi===1?'':xi<0?'^('+xi+')':'^'+xi)+'</span><br>';
                  html += '<span style="color:rgba(221,225,240,0.50);">Same base → equate exponents:</span><br>';
                  html += '<span style="color:#6ee7b7;">x = '+xi+'</span>';
                } else {
                  html += '<span style="color:#fca5a5;">'+R+' is not a whole-number power of '+b+'</span><br>';
                  html += '<span style="color:rgba(221,225,240,0.50);">Cannot solve by same-base method. Approximate: x ≈ '+x.toFixed(4)+'</span>';
                }
                out.innerHTML = html;
              }
              document.getElementById('g10c2eBtn').addEventListener('click', solve);
              document.getElementById('g10c2eResult').addEventListener('keydown', e=>{if(e.key==='Enter')solve();});
              solve();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The same-base method only works when you can express both sides as a power of the same base. If not, use logarithms (Grade 12) or inspection.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Solve: 3^x = 81",
          answer: "4",
          topic: "Exponential equations"
        },
        {
          type: "mc",
          text: "Solve: 2^(2x−1) = 16",
          options: ["x = 2", "x = 5/2", "x = 3", "x = 1"],
          answer: 1,
          topic: "Exponential equations"
        },
        {
          type: "input",
          text: "Solve: 4^(x+1) = 8^x",
          answer: "2",
          topic: "Exponential equations"
        },
        {
          type: "mc",
          text: "Solve: 5^(x²−x) = 25",
          options: ["x = 2 only", "x = −1 only", "x = 2 or x = −1", "x = 1 or x = −2"],
          answer: 2,
          topic: "Exponential equations"
        },
        {
          type: "mc",
          text: "Using substitution k = 3^x, which quadratic is equivalent to 9^x − 4·3^x + 3 = 0?",
          options: ["k² − 4k + 3 = 0", "k − 4k + 3 = 0", "k² + 4k − 3 = 0", "2k² − 4k + 3 = 0"],
          answer: 0,
          topic: "Exponential equations"
        },
        {
          type: "input",
          text: "Solve for x: 3^(x+1) + 3^(x−1) = 30",
          answer: "2",
          topic: "Exponential equations"
        },
        {
          type: "input",
          text: "A colony of bacteria doubles every hour, modelled by P(t) = 8 × 2^t, where P is the population (in bacteria) after t hours. After how many hours will the population reach 512?",
          answer: "6",
          topic: "Exponential equations"
        }
      ]
    },
    {
      id: 202,
      chapter: 2,
      name: "Simplifying complex exponential expressions",
      fullName: "Simplifying expressions combining several exponent laws, including factorisation",
      lesson: {
        heading: "Simplifying complex exponential expressions",
        sub: "Chapter 2 · Topic 3",
        body: `
          <p>CAPS expects Grade 10 learners to combine <strong>all</strong> the exponent laws in a single simplification — and sometimes to spot a hidden factorisation first.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Strategy for multi-step simplification</div>
            <p>
              1. Write every term with the <strong>same base</strong> where possible (e.g. 4 = 2², 9 = 3²).<br>
              2. Split any sums/differences in the exponent using <span class="math">a^(m+n) = aᵐ·aⁿ</span>.<br>
              3. Factorise numerators/denominators that are sums or differences of exponential terms.<br>
              4. Cancel common factors, then apply the remaining exponent laws.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Simplify (3 × 5²)³ ÷ 75</div>
            <p>
              <span class="math">(3 × 5²)³ = 3³ × 5⁶</span><br>
              <span class="math">75 = 3 × 5²</span><br>
              <span class="math">(3³ × 5⁶)/(3 × 5²) = 3² × 5⁴ = 9 × 625 = 5625</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Simplify by factorising first — (2ˣ⁺¹ + 2ˣ)/2ˣ</div>
            <p>
              Numerator: <span class="math">2ˣ⁺¹ + 2ˣ = 2ˣ(2 + 1) = 3 · 2ˣ</span><br>
              <span class="math">(3 · 2ˣ)/2ˣ = 3</span><br>
              <em>Spotting the common factor 2ˣ is the key insight — this is a problem-solving-level question if you haven't seen the type before.</em>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Common trap</div>
            <p>
              <span class="math">2ˣ⁺¹ ≠ 2 · 2ˣ⁺¹</span> and <span class="math">2ˣ⁺¹ ≠ 2ˣ + 2</span>. Always expand <span class="math">2ˣ⁺¹ = 2ˣ · 2¹ = 2 · 2ˣ</span> using the multiplication law — do not distribute over addition in an exponent.
            </p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>When you see a sum or difference of exponential terms (like <span class="math">3^(x+2) − 3^x</span>), factor out the smallest power first — it almost always simplifies beautifully.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Simplify: (2 × 3²)² ÷ 18",
          options: ["18", "36", "9", "2"],
          answer: 0,
          topic: "Simplifying complex exponential expressions"
        },
        {
          type: "input",
          text: "Simplify: (3ˣ⁺¹ + 3ˣ)/3ˣ",
          answer: "4",
          topic: "Simplifying complex exponential expressions"
        },
        {
          type: "mc",
          text: "Simplify: (5ˣ⁺² − 5ˣ)/(5ˣ · 24)",
          options: ["1", "5", "24", "5/24"],
          answer: 0,
          topic: "Simplifying complex exponential expressions"
        },
        {
          type: "mc",
          text: "Simplify: (2²ˣ − 1)/(2ˣ − 1) using difference of squares on the exponent term",
          options: ["2ˣ + 1", "2ˣ − 1", "2ˣ", "4ˣ + 1"],
          answer: 0,
          topic: "Simplifying complex exponential expressions"
        },
        {
          type: "input",
          text: "Simplify: (4^x · 8)/2^(2x+1). Give the answer as an integer.",
          answer: "4",
          topic: "Simplifying complex exponential expressions"
        },
        {
          type: "input",
          text: "Simplify: (5^(x+1) + 5^(x+2)) ÷ (6 × 5^x)",
          answer: "5",
          topic: "Simplifying complex exponential expressions"
        },
        {
          type: "input",
          text: "Simplify: (2^(2x+1) − 2^(2x−1)) ÷ 2^(2x)",
          answer: "3/2",
          altAnswers: ["1.5", "1,5"],
          topic: "Simplifying complex exponential expressions"
        }
      ]
    },
    {
      id: 203,
      chapter: 2,
      name: "Advanced exponential equations",
      fullName: "Exponential equations requiring factorisation or fractional-exponent techniques",
      lesson: {
        heading: "Advanced exponential equations",
        sub: "Chapter 2 · Topic 4",
        body: `
          <p>Beyond simple same-base equations, CAPS includes exponential equations that need <strong>factorisation</strong> or careful handling of <strong>fractional exponents</strong> before you can solve for x.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Type 1: Equation with a common factor</div>
            <p>
              Example form: <span class="math">2^(x+3) − 2^x = 56</span><br>
              Factorise the left side: <span class="math">2^x(2³ − 1) = 56 → 2^x(7) = 56 → 2^x = 8 → x = 3</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Type 2: Fractional/rational exponent equations</div>
            <p>
              Example form: <span class="math">x^(2/3) = 4</span><br>
              Raise both sides to the power <span class="math">3/2</span>: <span class="math">x = 4^(3/2) = (√4)³ = 2³ = 8</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve 3^(2x) − 3^x − 6 = 0</div>
            <p>
              Let <span class="math">k = 3^x</span>: <span class="math">k² − k − 6 = 0</span><br>
              <span class="math">(k − 3)(k + 2) = 0 → k = 3</span> or <span class="math">k = −2</span> (rejected, since 3^x > 0)<br>
              <span class="math">3^x = 3 → x = 1</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Why negative or zero substitutions are rejected</div>
            <p>Since <span class="math">aˣ > 0</span> for any base <span class="math">a > 0</span>, a substitution result like <span class="math">k = −2</span> or <span class="math">k = 0</span> gives <strong>no real solution</strong> for x and must be discarded.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Whenever you see two exponential terms added or subtracted (not multiplied), suspect that factorising out the smallest power is the way in — it's the same strategy as the previous topic, just now inside an equation.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Solve: 2^(x+2) − 2^x = 12",
          answer: "2",
          topic: "Advanced exponential equations"
        },
        {
          type: "mc",
          text: "Solve: x^(3/2) = 27",
          options: ["x = 9", "x = 3", "x = 81", "x = 18"],
          answer: 0,
          topic: "Advanced exponential equations"
        },
        {
          type: "mc",
          text: "Solve: 3^(2x) − 4·3^x + 3 = 0. Which are valid solutions?",
          options: ["x = 0 or x = 1", "x = 1 or x = 3", "x = 0 or x = 3", "x = 1 only"],
          answer: 0,
          topic: "Advanced exponential equations"
        },
        {
          type: "input",
          text: "Solve for x: 5^(x+1) + 5^x = 30",
          answer: "1",
          topic: "Advanced exponential equations"
        },
        {
          type: "mc",
          text: "Solve: x^(2/3) = 9",
          options: ["x = 27", "x = 3", "x = 18", "x = 729"],
          answer: 0,
          topic: "Advanced exponential equations"
        },
        {
          type: "input",
          text: "Solve for x: 4^x − 2^(x+2) − 32 = 0",
          answer: "3",
          topic: "Advanced exponential equations"
        },
        {
          type: "mc",
          text: "Solve: (x − 1)^(2/3) = 4",
          options: ["x = 9 or x = −7", "x = 9 only", "x = ±8", "x = 8 or x = −9"],
          answer: 0,
          topic: "Advanced exponential equations"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 2 Workbook — Exponents",
    questions: [
      {
        number: 1,
        text: "Simplify (leave in simplest exponential form, no negative exponents):",
        parts: [
          { label: "a", text: "x³ · x⁻⁵ · x²", marks: 2 },
          { label: "b", text: "(2a²b)³ / (4ab²)", marks: 3 },
          { label: "c", text: "(3x⁻¹y²)² · (xy)⁻¹", marks: 3 },
          { label: "d", text: "(a^(1/2) · a^(1/3))⁶", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Evaluate without a calculator:",
        parts: [
          { label: "a", text: "32^(3/5)", marks: 2 },
          { label: "b", text: "(4/9)^(−1/2)", marks: 2 },
          { label: "c", text: "2^(−3) + 4^(−1)", marks: 3 },
          { label: "d", text: "64^(2/3) − 25^(1/2)", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "Solve for x:",
        parts: [
          { label: "a", text: "2^x = 64", marks: 2 },
          { label: "b", text: "3^(x+2) = 27^(x−1)", marks: 3 },
          { label: "c", text: "5^(x²) = 125^x", marks: 4 },
          { label: "d", text: "4^x − 3·2^x − 4 = 0", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "x⁰ = 1",
        b: "2a⁵b/1 = 2a⁵b⁻¹ ... simplify: 2a⁵/b",
        c: "9x⁻³y³",
        d: "a⁵"
      },
      2: {
        a: "8",
        b: "3/2",
        c: "1/8 + 1/4 = 3/8",
        d: "16 − 5 = 11"
      },
      3: {
        a: "x = 6",
        b: "x+2 = 3x−3 → x = 5/2",
        c: "x² = 3x → x(x−3) = 0 → x = 0 or x = 3",
        d: "Let k=2^x: k²−3k−4=0 → (k−4)(k+1)=0 → k=4 → x=2 (k=−1 invalid)"
      }
    }
  }
});
