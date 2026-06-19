// Math Magician — Grade 8, Chapter 11 data
// Common Fractions

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 1101,
      chapter: 11,
      name: "Revision of fractions",
      fullName: "Revision of basic concepts involving fractions",
      lesson: {
        heading: "Revision of basic concepts involving fractions",
        sub: "Chapter 11 · Topic 1",
        body: `
          <p>A <strong>fraction</strong> represents a part of a whole. Mastering fraction concepts is essential for algebra, ratios, and percentages.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key vocabulary</div>
            <p>
              <strong>Numerator:</strong> top number — how many parts.<br>
              <strong>Denominator:</strong> bottom number — total equal parts.<br>
              <strong>Proper fraction:</strong> numerator &lt; denominator. e.g. <span class="math">3/5</span><br>
              <strong>Improper fraction:</strong> numerator &gt; denominator. e.g. <span class="math">7/4</span><br>
              <strong>Mixed number:</strong> whole + fraction. e.g. <span class="math">1¾</span><br>
              <strong>Equivalent fractions:</strong> same value, different form. e.g. <span class="math">2/4 = 1/2</span><br>
              <strong>Simplest form:</strong> numerator and denominator have no common factor except 1.<br><br>
              <strong>Converting mixed → improper:</strong> <span class="math">2¾ = (2×4+3)/4 = 11/4</span><br>
              <strong>Converting improper → mixed:</strong> <span class="math">11/4 = 2 remainder 3 = 2¾</span>
            </p>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Fraction Simplifier</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter a fraction to simplify it and convert to mixed number if needed.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="fsNum" type="number" value="18" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-size:18px;">/</span>
              <input id="fsDen" type="number" value="24" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="fsBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Simplify</button>
            </div>
            <div id="fsOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){return b===0?a:gcd(b,a%b);}
            function simplify(){
              let n=parseInt(document.getElementById('fsNum').value);
              let d=parseInt(document.getElementById('fsDen').value);
              const el=document.getElementById('fsOut');
              if(!d||d===0){el.innerHTML='<span style="color:#fca5a5;">Denominator cannot be 0.</span>';return;}
              const neg=((n<0)!==(d<0));
              n=Math.abs(n);d=Math.abs(d);
              const g=gcd(n,d);
              const sn=(neg?-1:1)*(n/g);
              const sd=d/g;
              let html='<div><span style="opacity:0.5;">GCD('+n+','+d+') = </span><span style="color:#fbbf24;">'+g+'</span></div>';
              html+='<div><span style="opacity:0.5;">Simplified: </span><span style="color:#6ee7b7;font-size:14px;">'+sn+'/'+sd+'</span></div>';
              if(Math.abs(sn)>sd){
                const whole=Math.trunc(sn/sd);
                const rem=Math.abs(sn)%sd;
                if(rem!==0) html+='<div><span style="opacity:0.5;">Mixed number: </span><span style="color:#a5b4fc;">'+whole+' '+rem+'/'+sd+'</span></div>';
              }
              el.innerHTML=html;
            }
            document.getElementById('fsBtn').addEventListener('click',simplify);
            simplify();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always simplify fractions by dividing numerator and denominator by their <strong>Greatest Common Factor (GCF)</strong>. Check: can I divide both by 2? by 3? by 5?</span></div>
        `
      },
      questions: [
        { type: "input", text: "Simplify 18/24 to its simplest form (write as a/b).", answer: "3/4", topic: "Fractions" },
        { type: "mc", text: "Convert 2¾ to an improper fraction.", options: ["9/4", "11/4", "10/4", "8/4"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Convert 17/5 to a mixed number (write as a b/c, e.g. 3 2/5).", answer: "3 2/5", topic: "Fractions" },
        { type: "mc", text: "Which fraction is equivalent to 2/3?", options: ["4/9", "6/9", "6/12", "4/6"], answer: 3, topic: "Fractions" },
        { type: "input", text: "What is the GCF of 36 and 48?", answer: "12", topic: "Fractions" },
      ]
    },
    {
      id: 1102,
      chapter: 11,
      name: "Adding and subtracting fractions",
      fullName: "Addition and subtraction of fractions",
      lesson: {
        heading: "Addition and subtraction of fractions",
        sub: "Chapter 11 · Topic 2",
        body: `
          <p>To add or subtract fractions, they must have the <strong>same denominator</strong> (LCD — Lowest Common Denominator).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Steps</div>
            <p>
              1. Find the LCD of all denominators.<br>
              2. Convert each fraction to an equivalent fraction with the LCD.<br>
              3. Add or subtract the numerators only.<br>
              4. Simplify the result.<br>
              5. Convert to a mixed number if needed.<br><br>
              <strong>Mixed numbers:</strong> convert to improper fractions first, then follow steps above.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">2/3 + 3/4</span>: LCD = 12 → <span class="math">8/12 + 9/12 = 17/12 = 1 5/12</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">3½ − 1¾</span>: convert → <span class="math">7/2 − 7/4 = 14/4 − 7/4 = 7/4 = 1¾</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">1/2 + 2/3 − 1/4</span>: LCD = 12 → <span class="math">6/12 + 8/12 − 3/12 = 11/12</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Find the LCD by listing multiples of each denominator until you find the first one they share. e.g. for 3 and 4: multiples of 4 are 4, 8, <strong>12</strong>; 12 ÷ 3 = 4 ✓</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate 1/2 + 2/3. Give your answer as a simplified fraction (a/b).", answer: "7/6", topic: "Fractions" },
        { type: "mc", text: "Calculate 3/4 − 1/3.", options: ["2/12", "5/12", "8/12", "1/6"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate 2½ + 1¾. Give answer as a mixed number (e.g. 4 1/4).", answer: "4 1/4", topic: "Fractions" },
        { type: "mc", text: "What is the LCD of 4, 6, and 8?", options: ["48", "24", "12", "16"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate 5/6 − 3/4. Give as a simplified fraction (a/b).", answer: "1/12", topic: "Fractions" },
      ]
    },
    {
      id: 1103,
      chapter: 11,
      name: "Multiplying fractions",
      fullName: "Multiplication of fractions",
      lesson: {
        heading: "Multiplication of fractions",
        sub: "Chapter 11 · Topic 3",
        body: `
          <p>Multiplying fractions is straightforward: multiply numerators together and denominators together.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rules</div>
            <p>
              <strong>Fraction × fraction:</strong> <span class="math">a/b × c/d = ac/bd</span><br>
              <strong>Simplify first</strong> (cross-cancel) to keep numbers small.<br>
              <strong>Mixed numbers:</strong> convert to improper fractions first.<br>
              <strong>Whole number × fraction:</strong> write whole number as n/1.<br><br>
              <strong>Example:</strong> <span class="math">3/4 × 8/9</span><br>
              Cross-cancel: 4 and 8 share factor 4 → <span class="math">3/1 × 2/9</span><br>
              Then: 3 and 9 share factor 3 → <span class="math">1/1 × 2/3 = 2/3</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">2/3 × 3/5 = 6/15 = 2/5</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">1½ × 2⅔</span>: convert → <span class="math">3/2 × 8/3 = 24/6 = 4</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Find ¾ of 40: <span class="math">3/4 × 40 = 120/4 = 30</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>"Of" means multiply: "¾ of 24" = <span class="math">3/4 × 24 = 18</span>. This comes up constantly in word problems.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate 3/5 × 10/9. Simplify your answer (write as a/b or whole number).", answer: "2/3", topic: "Fractions" },
        { type: "mc", text: "Calculate 1½ × 2⅔.", options: ["3", "4", "3½", "4½"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Find ¾ of 48.", answer: "36", topic: "Fractions" },
        { type: "mc", text: "Calculate 5/6 × 3/10.", options: ["8/16", "15/60", "1/4", "1/3"], answer: 2, topic: "Fractions" },
        { type: "input", text: "Calculate 2⅓ × 1½. Give as a mixed number.", answer: "3 1/2", topic: "Fractions" },
      ]
    },
    {
      id: 1104,
      chapter: 11,
      name: "Dividing fractions",
      fullName: "Division of fractions",
      lesson: {
        heading: "Division of fractions",
        sub: "Chapter 11 · Topic 4",
        body: `
          <p>Dividing by a fraction is the same as multiplying by its <strong>reciprocal</strong> (flip the second fraction).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rules</div>
            <p>
              <strong>Reciprocal:</strong> flip the fraction. Reciprocal of <span class="math">3/4</span> is <span class="math">4/3</span>.<br>
              <strong>Division rule:</strong> <span class="math">a/b ÷ c/d = a/b × d/c</span><br>
              <strong>Mixed numbers:</strong> convert to improper fractions first, then apply the rule.<br><br>
              <strong>Memory trick:</strong> <em>Keep, Change, Flip</em><br>
              Keep the first fraction → Change ÷ to × → Flip the second fraction.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">3/4 ÷ 2/3</span>: Keep 3/4 → × → Flip to 3/2 → <span class="math">3/4 × 3/2 = 9/8 = 1⅛</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">2½ ÷ 1¼</span>: → <span class="math">5/2 ÷ 5/4 = 5/2 × 4/5 = 20/10 = 2</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">6 ÷ 3/4 = 6/1 × 4/3 = 24/3 = 8</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Dividing by a fraction less than 1 gives a bigger answer (you're seeing how many times a small part fits into something). This is a good way to check: does my answer make sense?</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate 3/4 ÷ 3/8. Write answer as a whole number or simplified fraction.", answer: "2", topic: "Fractions" },
        { type: "mc", text: "Calculate 2½ ÷ 1¼.", options: ["2", "1", "3", "3½"], answer: 0, topic: "Fractions" },
        { type: "input", text: "What is the reciprocal of 5/8? (write as a/b)", answer: "8/5", topic: "Fractions" },
        { type: "mc", text: "Calculate 4 ÷ 2/3.", options: ["8/3", "6", "2/12", "3"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate 7/8 ÷ 7/4. Simplify your answer.", answer: "1/2", topic: "Fractions" },
      ]
    },
    {
      id: 1105,
      chapter: 11,
      name: "Squares, cubes, roots",
      fullName: "Squares, square roots, cubes, and cube roots",
      lesson: {
        heading: "Squares, square roots, cubes, and cube roots",
        sub: "Chapter 11 · Topic 5",
        body: `
          <p>These operations apply to fractions just as they do to whole numbers.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rules for fractions</div>
            <p>
              <strong>Square:</strong> <span class="math">(a/b)² = a²/b²</span><br>
              <strong>Square root:</strong> <span class="math">√(a/b) = √a/√b</span><br>
              <strong>Cube:</strong> <span class="math">(a/b)³ = a³/b³</span><br>
              <strong>Cube root:</strong> <span class="math">∛(a/b) = ∛a/∛b</span><br><br>
              <strong>Examples:</strong><br>
              <span class="math">(2/3)² = 4/9</span><br>
              <span class="math">√(9/16) = 3/4</span><br>
              <span class="math">(1/2)³ = 1/8</span><br>
              <span class="math">∛(8/27) = 2/3</span>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always square (or cube) both numerator and denominator separately. Don't square just one part of the fraction.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate (3/4)². Write as a/b.", answer: "9/16", topic: "Fractions" },
        { type: "mc", text: "Calculate √(25/49).", options: ["5/7", "25/49", "5/49", "25/7"], answer: 0, topic: "Fractions" },
        { type: "input", text: "Calculate (2/3)³. Write as a/b.", answer: "8/27", topic: "Fractions" },
        { type: "mc", text: "Calculate ∛(27/64).", options: ["9/16", "3/4", "27/64", "3/8"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate √(4/9) + (1/2)². Write as a simplified fraction.", answer: "11/12", topic: "Fractions" },
      ]
    },
    {
      id: 1106,
      chapter: 11,
      name: "Mixed calculations",
      fullName: "Mixed calculations involving fractions",
      lesson: {
        heading: "Mixed calculations involving fractions",
        sub: "Chapter 11 · Topic 6",
        body: `
          <p>Mixed calculations combine all four operations with fractions and require correct application of the <strong>order of operations (BODMAS/BEDMAS)</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Order of operations</div>
            <p>
              <strong>B</strong>rackets → <strong>O</strong>rders (powers/roots) → <strong>D</strong>ivision → <strong>M</strong>ultiplication → <strong>A</strong>ddition → <strong>S</strong>ubtraction<br><br>
              Work left to right within each tier. Mixed numbers must be converted before applying operations.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>Calculate: <span class="math">½ + ¾ × 2/3 − (1/4)²</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Orders first: <span class="math">(1/4)² = 1/16</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Multiply: <span class="math">¾ × 2/3 = 6/12 = 1/2</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Now add/subtract: <span class="math">1/2 + 1/2 − 1/16 = 1 − 1/16 = 15/16</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Write every step — even if you can do parts mentally. One slip in a mixed calculation loses multiple marks, but clear working earns method marks even if the final answer is wrong.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate ½ + ¼ × 2. Simplify your answer.", answer: "1", topic: "Fractions" },
        { type: "mc", text: "Calculate (2/3)² + 1/3.", options: ["7/9", "1", "5/9", "1 1/9"], answer: 0, topic: "Fractions" },
        { type: "input", text: "Calculate 1½ × 2/3 + ¼. Give as a simplified fraction.", answer: "5/4", topic: "Fractions" },
        { type: "mc", text: "Calculate 3/4 ÷ 1/2 − 1/4.", options: ["1", "1¼", "1½", "¾"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate √(1/4) + (1/3)³. Write as a simplified fraction.", answer: "55/108", topic: "Fractions" },
      ]
    },
    {
      id: 1107,
      chapter: 11,
      name: "Numbers as fractions",
      fullName: "Numbers as fractions of numbers",
      lesson: {
        heading: "Numbers as fractions of numbers",
        sub: "Chapter 11 · Topic 7",
        body: `
          <p>To express one number as a fraction of another, write the first number over the second and simplify.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Method</div>
            <p>
              <strong>A as a fraction of B:</strong> <span class="math">A/B</span> (simplify)<br><br>
              <strong>Example 1:</strong> Express 15 as a fraction of 20.<br>
              <span class="math">15/20 = 3/4</span><br><br>
              <strong>Example 2:</strong> Express 45 minutes as a fraction of 1 hour.<br>
              Convert to same units first: 1 hour = 60 min.<br>
              <span class="math">45/60 = 3/4</span><br><br>
              <strong>Example 3:</strong> Express 600 m as a fraction of 2 km.<br>
              2 km = 2000 m → <span class="math">600/2000 = 3/10</span>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always convert to the <strong>same unit</strong> before writing one quantity as a fraction of another. Mixed units give the wrong answer.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Express 18 as a fraction of 24. Simplify.", answer: "3/4", topic: "Fractions" },
        { type: "mc", text: "Express 30 minutes as a fraction of 2 hours.", options: ["3/4", "1/4", "1/2", "15/60"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Express 400 m as a fraction of 2 km. Simplify.", answer: "1/5", topic: "Fractions" },
        { type: "mc", text: "In a class of 32 learners, 20 are girls. What fraction are boys?", options: ["5/8", "3/8", "5/16", "5/12"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Express 750 g as a fraction of 2 kg. Simplify.", answer: "3/8", topic: "Fractions" },
      ]
    },
    {
      id: 1108,
      chapter: 11,
      name: "Fractions and percentages",
      fullName: "Calculations involving fractions and percentages",
      lesson: {
        heading: "Calculations involving fractions and percentages",
        sub: "Chapter 11 · Topic 8",
        body: `
          <p>Percentages are fractions with denominator 100. Converting between fractions and percentages is a key skill.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Conversions</div>
            <p>
              <strong>Fraction → %:</strong> multiply by 100. e.g. <span class="math">3/4 × 100 = 75%</span><br>
              <strong>% → fraction:</strong> write over 100 and simplify. e.g. <span class="math">35% = 35/100 = 7/20</span><br><br>
              <strong>Finding a percentage of an amount:</strong><br>
              e.g. 15% of R240 = <span class="math">15/100 × 240 = R36</span><br><br>
              <strong>Expressing as a percentage:</strong><br>
              e.g. 18 out of 25 = <span class="math">18/25 × 100 = 72%</span>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>10% of any amount = divide by 10. From there: 5% = half of 10%, 20% = double 10%, 15% = 10% + 5%. Mental maths shortcuts save time in exams.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Convert 3/5 to a percentage.", answer: "60", topic: "Fractions" },
        { type: "mc", text: "Convert 45% to a fraction in simplest form.", options: ["45/100", "9/20", "4/5", "9/10"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate 20% of R350.", answer: "70", topic: "Fractions" },
        { type: "mc", text: "Express 24 out of 40 as a percentage.", options: ["48%", "50%", "60%", "64%"], answer: 2, topic: "Fractions" },
        { type: "input", text: "A shirt costs R180. It is discounted by 15%. What is the discount amount in Rand?", answer: "27", topic: "Fractions" },
      ]
    },
    {
      id: 1109,
      chapter: 11,
      name: "Percentage increase and decrease",
      fullName: "Percentage increase and decrease",
      lesson: {
        heading: "Percentage increase and decrease",
        sub: "Chapter 11 · Topic 9",
        body: `
          <p>Percentage increase and decrease are used in finance, science, and everyday life to describe how quantities change.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formulas</div>
            <p>
              <strong>% increase:</strong> <span class="math">% change = (increase / original) × 100</span><br>
              <strong>% decrease:</strong> <span class="math">% change = (decrease / original) × 100</span><br><br>
              <strong>New value after % increase:</strong><br>
              <span class="math">new = original × (1 + %/100)</span><br>
              e.g. R200 increased by 10%: <span class="math">200 × 1.10 = R220</span><br><br>
              <strong>New value after % decrease:</strong><br>
              <span class="math">new = original × (1 − %/100)</span><br>
              e.g. R200 decreased by 10%: <span class="math">200 × 0.90 = R180</span>
            </p>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — % Change Calculator</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px;margin-top:8px;">
              <div style="display:flex;flex-direction:column;gap:3px;"><label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">Original</label><input id="pcOrig" type="number" value="200" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:3px;"><label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">% amount</label><input id="pcPct" type="number" value="15" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:3px;"><label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">Type</label>
              <select id="pcType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;"><option value="inc">Increase</option><option value="dec">Decrease</option></select></div>
              <button id="pcBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="pcOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const orig=parseFloat(document.getElementById('pcOrig').value);
              const pct=parseFloat(document.getElementById('pcPct').value);
              const type=document.getElementById('pcType').value;
              const el=document.getElementById('pcOut');
              if(isNaN(orig)||isNaN(pct)){el.innerHTML='<span style="color:#fca5a5;">Enter valid numbers.</span>';return;}
              const change=orig*pct/100;
              const nv=type==='inc'?orig+change:orig-change;
              el.innerHTML='<div><span style="opacity:0.5;">'+(type==='inc'?'Increase':'Decrease')+' = '+orig+' × '+pct+'% = </span><span style="color:#fbbf24;">'+change.toFixed(2)+'</span></div>'+
                '<div><span style="opacity:0.5;">New value = '+orig+(type==='inc'?'+':'-')+change.toFixed(2)+' = </span><span style="color:#6ee7b7;font-size:14px;">'+nv.toFixed(2)+'</span></div>';
            }
            document.getElementById('pcBtn').addEventListener('click',calc);

          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>To find the percentage change: <em>change ÷ original × 100</em>. The original (starting value) is always the denominator — never the new value.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Increase R350 by 20%. What is the new amount?", answer: "420", topic: "Fractions" },
        { type: "mc", text: "A price drops from R80 to R64. What is the percentage decrease?", options: ["16%", "20%", "25%", "80%"], answer: 1, topic: "Fractions" },
        { type: "input", text: "A salary of R12 000 is increased by 8%. What is the new salary?", answer: "12960", topic: "Fractions" },
        { type: "mc", text: "A TV costs R2 400 after a 25% discount. What was the original price?", options: ["R3 000", "R3 100", "R3 200", "R2 900"], answer: 2, topic: "Fractions" },
        { type: "input", text: "A value increases from 150 to 180. What is the percentage increase?", answer: "20", topic: "Fractions" },
      ]
    },
    {
      id: 1110,
      chapter: 11,
      name: "Ch 11 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 11 — Examination focus",
        sub: "Chapter 11 · Review",
        body: `
          <p>Fraction exams mix all operations, conversions, and percentage calculations. Show every step — a wrong final answer with correct working still earns method marks.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 11 summary</div>
            <p>
              ✅ Simplify: divide numerator and denominator by GCF<br>
              ✅ Add/Subtract: find LCD, convert, then operate on numerators<br>
              ✅ Multiply: multiply across; simplify first if possible<br>
              ✅ Divide: Keep–Change–Flip, then multiply<br>
              ✅ Mixed numbers: convert to improper fractions first<br>
              ✅ % ↔ fraction: × or ÷ 100<br>
              ✅ % increase/decrease: change ÷ original × 100
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Common mistakes: forgetting to convert mixed numbers before multiplying/dividing; using the wrong value as "original" in percentage change; not simplifying the final answer.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate 2⅓ ÷ 1¾. Give as a simplified fraction.", answer: "4/3", topic: "Mixed" },
        { type: "mc", text: "Calculate (3/4)² − 1/8.", options: ["5/8", "1/2", "9/16", "11/16"], answer: 0, topic: "Mixed" },
        { type: "input", text: "A jacket is R640 after a 20% increase. What was the original price?", answer: "533.33", topic: "Mixed" },
        { type: "mc", text: "Calculate 1½ + 2/3 × ¾.", options: ["2", "2 1/4", "1 3/4", "2 5/12"], answer: 0, topic: "Mixed" },
        { type: "input", text: "Express 35 minutes as a percentage of 1 hour. Give as a %.", answer: "58.33", topic: "Mixed" },
      ]
    },
  ],
  workbook: {
    chapter: 11, chapterName: "Common Fractions",
    topics: [
      {
        name: "Operations with fractions",
        questions: [
          { num: "1", text: "Calculate, showing all working:", parts: [
            { label: "a)", text: "<span class='math'>3/4 + 2/3 − 1/6</span>", marks: 3 },
            { label: "b)", text: "<span class='math'>2⅔ × 1⅛</span>", marks: 3 },
            { label: "c)", text: "<span class='math'>3¼ ÷ 1⅓</span>", marks: 3 },
            { label: "d)", text: "<span class='math'>(2/3)² + √(9/16)</span>", marks: 3 },
          ]},
        ]
      },
      {
        name: "Squares, cubes and roots of fractions",
        questions: [
          { num: "2", text: "Simplify without a calculator:", parts: [
            { label: "a)", text: "<span class='math'>(3/5)²</span>", marks: 1 },
            { label: "b)", text: "<span class='math'>√(4/25)</span>", marks: 1 },
            { label: "c)", text: "<span class='math'>(2/3)³</span>", marks: 2 },
            { label: "d)", text: "<span class='math'>∛(27/64)</span>", marks: 2 },
            { label: "e)", text: "<span class='math'>√(16/9) + (1/2)²</span>", marks: 3 },
          ]},
        ]
      },
      {
        name: "Percentages and percentage change",
        questions: [
          { num: "3", text: "Percentage calculations:", parts: [
            { label: "a)", text: "Find 35% of R2 400.", marks: 2 },
            { label: "b)", text: "Express 480 ml as a percentage of 2 litres.", marks: 3 },
            { label: "c)", text: "A price increased from R320 to R384. Calculate the percentage increase.", marks: 3 },
            { label: "d)", text: "After a 12% decrease, a value is 440. Find the original value.", marks: 3 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 11, chapterName: "Chapter 11 — Common Fractions",
    topics: [
      {
        name: "Operations with fractions",
        answers: [
          { num: "Q1a", ans: "5/4 = 1¼", note: "LCD=12: 9/12+8/12−2/12=15/12=5/4" },
          { num: "Q1b", ans: "3", note: "8/3 × 9/8 = 72/24 = 3" },
          { num: "Q1c", ans: "2 7/16", note: "13/4 ÷ 4/3 = 13/4 × 3/4 = 39/16 = 2 7/16" },
          { num: "Q1d", ans: "1 7/36", note: "(2/3)²=4/9; √(9/16)=3/4; LCD=36: 16/36+27/36=43/36=1 7/36" },
        ]
      },
      {
        name: "Squares, cubes and roots of fractions",
        answers: [
          { num: "Q2a", ans: "9/25", note: "3²/5²" },
          { num: "Q2b", ans: "2/5", note: "√4/√25" },
          { num: "Q2c", ans: "8/27", note: "2³/3³" },
          { num: "Q2d", ans: "3/4", note: "∛27/∛64=3/4" },
          { num: "Q2e", ans: "4/3 + 1/4 = 19/12 = 1 7/12", note: "√(16/9)=4/3; (1/2)²=1/4; LCD=12: 16/12+3/12=19/12" },
        ]
      },
      {
        name: "Percentages and percentage change",
        answers: [
          { num: "Q3a", ans: "R 840", note: "35/100 × 2400 = 840" },
          { num: "Q3b", ans: "24%", note: "2 litres=2000 ml; 480/2000×100=24%" },
          { num: "Q3c", ans: "20%", note: "(384−320)/320×100=64/320×100=20%" },
          { num: "Q3d", ans: "500", note: "440=original×0.88; 440÷0.88=500" },
        ]
      },
    ]
  }
});
