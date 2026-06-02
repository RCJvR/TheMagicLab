// Math Magician — Grade 8, Chapter 3 data
// Auto-loaded on demand by math-magician-gr8.html

MathMagician.registerChapter(3, {
  topics: [
{
    id: 19,
    chapter: 3,
    name: "Exponential form",
    fullName: "Comparing and representing numbers in exponential form",
    lesson: {
      heading: "Representing numbers in exponential form",
      sub: "Chapter 3 · Topic 1",
      body: `
        <p><strong>Exponential notation</strong> is a compact way to write repeated multiplication.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Key terminology</div>
          <p>
            <span class="math">aⁿ</span> is read as "<em>a to the power of n</em>"<br><br>
            <strong>Base (a):</strong> the number being multiplied repeatedly.<br>
            <strong>Exponent / Index (n):</strong> how many times the base is multiplied by itself.<br><br>
            <span class="math">2⁵ = 2 × 2 × 2 × 2 × 2 = 32</span><br>
            <span class="math">(−3)⁴ = (−3)×(−3)×(−3)×(−3) = 81</span><br>
            <span class="math">(−3)³ = (−3)×(−3)×(−3) = −27</span>
          </p>
        </div>
        <div class="def-box">
          <div class="def-box-title">📖 Special exponents</div>
          <p>
            <strong>Zero exponent:</strong> <span class="math">a⁰ = 1</span> for any <span class="math">a ≠ 0</span><br>
            <span class="math">5⁰ = 1</span> &nbsp; <span class="math">(−7)⁰ = 1</span><br><br>
            <strong>Exponent 1:</strong> <span class="math">a¹ = a</span><br>
            <strong>Exponent 2:</strong> called a <em>square</em> &nbsp; <strong>Exponent 3:</strong> called a <em>cube</em>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Writing in expanded and exponential form</div>
          <div class="example-step"><span class="step-num">1</span><span>Write <span class="math">3 × 3 × 3 × 3 × 3</span> in exponential form → <span class="math">3⁵</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Evaluate <span class="math">2⁴</span> → <span class="math">2×2×2×2 = 16</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Evaluate <span class="math">(−2)⁴</span> → <span class="math">16</span> (even power, positive)</span></div>
          <div class="example-step"><span class="step-num">4</span><span>Evaluate <span class="math">(−2)⁵</span> → <span class="math">−32</span> (odd power, negative)</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Note the difference: <span class="math">−3⁴ = −(3⁴) = −81</span> but <span class="math">(−3)⁴ = 81</span>. The bracket changes everything.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Exponent Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Enter a base and exponent to see the expression, expanded form, and result.</p>
            <div style="display:flex;gap:4px;align-items:flex-end;flex-wrap:wrap;margin-bottom:16px;">
              <div style="display:flex;flex-direction:column;gap:4px;align-items:center;">
                <label style="font-size:10px;color:rgba(245,158,11,0.60);text-transform:uppercase;letter-spacing:0.06em;">Base</label>
                <input id="expCalcBase" type="number" value="3" style="width:72px;background:#1e1b4b;border:2px solid rgba(245,158,11,0.50);color:#fcd34d;padding:8px;border-radius:8px;font-size:22px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;align-items:center;padding-bottom:2px;">
                <label style="font-size:10px;color:rgba(165,180,252,0.60);text-transform:uppercase;letter-spacing:0.06em;">Exponent</label>
                <input id="expCalcExp" type="number" value="4" style="width:60px;background:#1e1b4b;border:2px solid rgba(99,102,241,0.50);color:#a5b4fc;padding:6px;border-radius:8px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;vertical-align:top;">
              </div>
              <div style="padding-bottom:10px;font-size:28px;color:rgba(221,225,240,0.20);font-family:JetBrains Mono,monospace;line-height:1;padding-left:4px;">→</div>
              <div id="expCalcDisplay" style="padding-bottom:8px;font-size:28px;font-family:JetBrains Mono,monospace;color:#fcd34d;line-height:1;"></div>
            </div>
            <div id="expCalcOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function sup(n){ return String(n).split('').map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[c]||c).join(''); }
            function fmt(n){ return Number.isInteger(n)?String(n):parseFloat(n.toPrecision(8)).toString(); }
            function update(){
              const base=parseFloat(document.getElementById('expCalcBase').value);
              const exp=parseFloat(document.getElementById('expCalcExp').value);
              if(isNaN(base)||isNaN(exp)) return;
              const result=Math.pow(base,exp);
              // Live display: base in gold, exponent superscript in purple
              document.getElementById('expCalcDisplay').innerHTML=
                '<span style="color:#fcd34d;">'+base+'</span>'+
                '<span style="font-size:16px;color:#a5b4fc;vertical-align:super;margin-left:1px;">'+exp+'</span>';
              // Expanded form — show up to 10 factors; beyond that show grouping
              let expandedHTML='';
              if(Number.isInteger(exp)&&exp>0){
                if(exp<=10){
                  const factors=Array(exp).fill('<span style="color:#fcd34d;">'+base+'</span>').join('<span style="color:rgba(221,225,240,0.40);"> × </span>');
                  expandedHTML=factors+' <span style="color:rgba(221,225,240,0.40)">=</span> <span style="color:#6ee7b7;">'+fmt(result)+'</span>';
                } else {
                  // Show first 3 ... last 1 with count
                  const f='<span style="color:#fcd34d;">'+base+'</span>';
                  const x='<span style="color:rgba(221,225,240,0.40);"> × </span>';
                  expandedHTML=f+x+f+x+f+'<span style="color:rgba(221,225,240,0.30);"> × … ('+exp+' factors total)</span> <span style="color:rgba(221,225,240,0.40)">=</span> <span style="color:#6ee7b7;">'+fmt(result)+'</span>';
                }
              }
              const rows=[
                '<div style="display:flex;gap:0;align-items:baseline;margin-bottom:2px;"><span style="color:rgba(221,225,240,0.40);width:130px;flex-shrink:0;">Expression:</span><span>'+
                  '<span style="color:#fcd34d;font-size:15px;">'+base+'</span>'+
                  '<span style="font-size:11px;color:#a5b4fc;vertical-align:super;margin-left:1px;">'+exp+'</span>'+
                '</span></div>',
                expandedHTML?'<div style="display:flex;gap:0;align-items:baseline;flex-wrap:wrap;margin-bottom:2px;"><span style="color:rgba(221,225,240,0.40);width:130px;flex-shrink:0;">Expanded:</span><span style="font-size:12px;line-height:1.8;">'+expandedHTML+'</span></div>':'',
                '<div style="display:flex;gap:0;align-items:baseline;margin-bottom:2px;"><span style="color:rgba(221,225,240,0.40);width:130px;flex-shrink:0;">Result:</span><span style="color:#6ee7b7;font-size:18px;font-weight:700;">'+fmt(result)+'</span></div>',
                exp===0?'<div style="font-size:10px;color:rgba(221,225,240,0.35);margin-top:2px;">Any non-zero base raised to the power 0 equals 1.</div>':'',
              ];
              document.getElementById('expCalcOut').innerHTML=rows.filter(Boolean).join('');
            }
            ['expCalcBase','expCalcExp'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "Write <span class='math'>5 × 5 × 5 × 5</span> in exponential form (e.g. 5^4)", answer: "5^4", topic: "Exponents" },
      { type: "mc", text: "Evaluate <span class='math'>2⁶</span>", options: ["12", "32", "64", "36"], answer: 2, topic: "Exponents" },
      { type: "mc", text: "What is <span class='math'>(−4)⁰</span>?", options: ["0", "−1", "1", "4"], answer: 2, topic: "Exponents" },
      { type: "input", text: "Evaluate <span class='math'>(−3)⁴</span>", answer: "81", topic: "Exponents" },
      { type: "mc", text: "Which has a negative value?", options: ["(−5)²", "(−2)⁴", "(−3)³", "(−1)¹⁰⁰"], answer: 2, topic: "Exponents" },
      { type: "input", text: "Evaluate <span class='math'>10³</span>", answer: "1000", topic: "Exponents" },
    ]
  },
  {
    id: 20,
    chapter: 3,
    name: "Laws of exponents",
    fullName: "The laws of exponents",
    lesson: {
      heading: "The laws of exponents",
      sub: "Chapter 3 · Topic 2",
      body: `
        <p>The <strong>laws of exponents</strong> allow us to simplify expressions with powers without expanding them fully.</p>
        <div class="def-box">
          <div class="def-box-title">📖 The five laws (same base)</div>
          <p>
            <strong>Law 1 — Multiplication:</strong><br>
            <span class="math">aᵐ × aⁿ = aᵐ⁺ⁿ</span><br>
            <em>Add the exponents when multiplying same base.</em><br>
            <span class="math">3² × 3⁴ = 3⁶ = 729</span><br><br>

            <strong>Law 2 — Division:</strong><br>
            <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
            <em>Subtract the exponents when dividing same base.</em><br>
            <span class="math">5⁵ ÷ 5² = 5³ = 125</span><br><br>

            <strong>Law 3 — Power of a power:</strong><br>
            <span class="math">(aᵐ)ⁿ = aᵐˣⁿ</span><br>
            <em>Multiply the exponents.</em><br>
            <span class="math">(2³)⁴ = 2¹² = 4096</span><br><br>

            <strong>Law 4 — Power of a product:</strong><br>
            <span class="math">(ab)ⁿ = aⁿ × bⁿ</span><br>
            <span class="math">(2×3)⁴ = 2⁴ × 3⁴ = 16 × 81 = 1296</span><br><br>

            <strong>Law 5 — Power of a quotient:</strong><br>
            <span class="math">(a/b)ⁿ = aⁿ/bⁿ</span><br>
            <span class="math">(2/3)³ = 8/27</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Simplification examples</div>
          <div class="example-step"><span class="step-num">1</span><span>Simplify <span class="math">2³ × 2⁵</span> → <span class="math">2⁸ = 256</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Simplify <span class="math">3⁷ ÷ 3⁴</span> → <span class="math">3³ = 27</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Simplify <span class="math">(5²)³</span> → <span class="math">5⁶ = 15 625</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Simplify <span class="math">x⁵ × x³ ÷ x⁴</span> → <span class="math">x⁵⁺³⁻⁴ = x⁴</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>The laws only apply when the <strong>bases are the same</strong>. You cannot simplify <span class="math">2³ × 3²</span> using Law 1.</span></div>
        <div class="tip-box" style="border-color:rgba(245,158,11,0.30);background:rgba(245,158,11,0.08);"><span class="tip-icon">📚</span><span><strong>Grade 9 extension:</strong> Negative exponents (e.g. <span class="math">a⁻ⁿ = 1/aⁿ</span>) are covered in Grade 9. You do not need these for your Grade 8 exam.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Exponent Laws Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Pick a law, enter values, and see the rule applied.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:flex-end;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Law</label>
                <select id="expLaw" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="mul">aᵐ × aⁿ = aᵐ⁺ⁿ</option>
                  <option value="div">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</option>
                  <option value="pow">(aᵐ)ⁿ = aᵐⁿ</option>
                  <option value="zero">a⁰ = 1</option>
                  <!-- Negative exponents (a⁻ⁿ) are Grade 9 content — not shown here -->
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Base (a)</label>
                <input id="expBase" type="number" value="2" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;" id="expL1">m</label>
                <input id="expM" type="number" value="3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;" id="expNBox">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;" id="expL2">n</label>
                <input id="expN" type="number" value="4" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div id="expOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const law=document.getElementById('expLaw').value;
              const a=parseFloat(document.getElementById('expBase').value)||2;
              const m=parseFloat(document.getElementById('expM').value)||0;
              const n=parseFloat(document.getElementById('expN').value)||0;
              const nbox=document.getElementById('expNBox');
              const l2=document.getElementById('expL2');
              let lines=[];
              nbox.style.display='flex';
              if(law==='mul'){
                lines=['<div><span style="color:#a5b4fc;">Rule: </span>aᵐ × aⁿ = aᵐ⁺ⁿ</div>',
                  '<div>'+a+'³ × '+a+'⁴ = '+a+'^('+(m)+'+'+(n)+') = '+a+'^'+(m+n)+' = <strong style="color:#6ee7b7;">'+(Math.pow(a,m+n))+'</strong></div>'];
              } else if(law==='div'){
                lines=['<div><span style="color:#a5b4fc;">Rule: </span>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</div>',
                  '<div>'+a+'^'+m+' ÷ '+a+'^'+n+' = '+a+'^('+(m)+'-'+(n)+') = '+a+'^'+(m-n)+' = <strong style="color:#6ee7b7;">'+(Math.pow(a,m-n).toFixed(4))+'</strong></div>'];
              } else if(law==='pow'){
                lines=['<div><span style="color:#a5b4fc;">Rule: </span>(aᵐ)ⁿ = aᵐⁿ</div>',
                  '<div>('+a+'^'+m+')^'+n+' = '+a+'^('+(m)+'×'+(n)+') = '+a+'^'+(m*n)+' = <strong style="color:#6ee7b7;">'+(Math.pow(a,m*n))+'</strong></div>'];
              } else if(law==='zero'){
                nbox.style.display='none';
                lines=['<div><span style="color:#a5b4fc;">Rule: </span>Any non-zero base to the power 0 = 1</div>',
                  '<div>'+a+'^0 = <strong style="color:#6ee7b7;">1</strong></div>',
                  '<div style="font-size:10px;opacity:0.45;">Works for any a ≠ 0</div>'];
}
              document.getElementById('expOut').innerHTML=lines.join('');
            }
            ['expLaw','expBase','expM','expN'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Simplify <span class='math'>4³ × 4⁵</span>", options: ["4¹⁵", "4⁸", "16⁸", "4²"], answer: 1, topic: "Laws of exponents" },
      { type: "input", text: "Simplify <span class='math'>2⁷ ÷ 2³</span>. Give as a power of 2 (e.g. 2^4)", answer: "2^4", topic: "Laws of exponents" },
      { type: "mc", text: "Simplify <span class='math'>(3²)⁵</span>", options: ["3⁷", "3¹⁰", "9⁵", "3³"], answer: 1, topic: "Laws of exponents" },
      { type: "input", text: "Evaluate <span class='math'>5⁴ ÷ 5⁴</span>", answer: "1", topic: "Laws of exponents" },
      { type: "mc", text: "Simplify <span class='math'>x⁴ × x³ ÷ x²</span>", options: ["x⁵", "x⁹", "x²⁴", "x⁻⁵"], answer: 0, topic: "Laws of exponents" },
      { type: "input", text: "Evaluate <span class='math'>(2²)³</span>", answer: "64", topic: "Laws of exponents" },
      { type: "mc", text: "Simplify <span class='math'>(2 × 3)³</span>", options: ["2³ + 3³", "6³", "2 × 3³", "5³"], answer: 1, topic: "Laws of exponents" },
    ]
  },
  {
    id: 21,
    chapter: 3,
    name: "Mixed operations — exponents",
    fullName: "Mixed operations",
    lesson: {
      heading: "Mixed operations with exponents",
      sub: "Chapter 3 · Topic 3",
      body: `
        <p>Combining the laws of exponents with the four operations requires careful application of <strong>BODMAS and sign rules</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Strategy for mixed operations</div>
          <p>
            1. Deal with <strong>brackets</strong> first — simplify any expression inside.<br>
            2. Apply <strong>exponent laws</strong> to simplify powers.<br>
            3. Then work through <strong>division and multiplication</strong> left to right.<br>
            4. Finally, <strong>addition and subtraction</strong> left to right.<br><br>
            Keep track of <strong>negative bases</strong> at every step.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate: <span class="math">2³ × 3² − (2²)² ÷ 4</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Orders: <span class="math">2³=8</span>, <span class="math">3²=9</span>, <span class="math">(2²)²=2⁴=16</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>× and ÷: <span class="math">8×9=72</span>, <span class="math">16÷4=4</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>−: <span class="math">72 − 4 = 68</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ With negative bases</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate: <span class="math">(−2)³ + 3² × (−1)⁵</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Orders: <span class="math">(−2)³=−8</span>, <span class="math">3²=9</span>, <span class="math">(−1)⁵=−1</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>×: <span class="math">9×(−1)=−9</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>+: <span class="math">−8 + (−9) = −17</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Simplify all powers to their numeric values before doing any addition or subtraction. This avoids confusion with signs.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Calculate: <span class='math'>2⁴ + 3³ − 5²</span>", answer: "18", topic: "Mixed ops" },
      { type: "mc", text: "What is <span class='math'>(−1)⁷ × 2³ + 3²</span>?", options: ["1", "9", "−8", "17"], answer: 0, topic: "Mixed ops" },
      { type: "input", text: "Calculate: <span class='math'>4² ÷ 2³ × (−1)⁴</span>", answer: "2", topic: "Mixed ops" },
      { type: "mc", text: "Simplify: <span class='math'>2³ × 2² − (2²)²</span>", options: ["−6", "0", "−3", "32"], answer: 1, topic: "Mixed ops" },
      { type: "input", text: "Calculate: <span class='math'>5² − (−2)³ × 3</span>", answer: "49", topic: "Mixed ops" },
    ]
  },
  {
    id: 22,
    chapter: 3,
    name: "Scientific notation",
    fullName: "Scientific notation",
    lesson: {
      heading: "Scientific notation",
      sub: "Chapter 3 · Topic 4",
      body: `
        <p><strong>Scientific notation</strong> (also called standard form) uses powers of 10 to write very large or very small numbers compactly.</p>
        <div class="def-box">
          <div class="def-box-title">📖 The form</div>
          <p>
            A number in scientific notation is written as:<br>
            <span class="math">a × 10ⁿ</span><br>
            where <span class="math">1 ≤ a &lt; 10</span> and n is an integer.<br><br>
            <strong>Large numbers:</strong> n is positive<br>
            <span class="math">3 400 000 = 3.4 × 10⁶</span><br><br>
            <strong>Small numbers:</strong> n is negative<br>
            <span class="math">0.000052 = 5.2 × 10⁻⁵</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Converting to scientific notation</div>
          <div class="example-step"><span class="step-num">1</span><span>Write <span class="math">47 200</span> in scientific notation.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Move the decimal point left until you have a number between 1 and 10: <span class="math">4.72</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Count the moves: 4 places → <span class="math">4.72 × 10⁴</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Converting from scientific notation</div>
          <div class="example-step"><span class="step-num">1</span><span>Write <span class="math">6.3 × 10⁵</span> as a normal number.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Move decimal 5 places right: <span class="math">630 000</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>The power of 10 tells you how many places to move the decimal. Positive → right (bigger). Negative → left (smaller).</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Scientific Notation Converter</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="sciInput" type="text" value="0.000045" placeholder="Enter a number…" style="flex:1;min-width:180px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;">
              <button id="sciConv" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Convert</button>
            </div>
            <div id="sciOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function convert(){
              const raw=document.getElementById('sciInput').value.trim();
              const n=parseFloat(raw);
              const el=document.getElementById('sciOut');
              if(isNaN(n)){el.innerHTML='<span style="color:#fca5a5;">Enter a valid number.</span>';return;}
              const sci=n.toExponential();
              const parts=sci.split('e');
              const coeff=parseFloat(parts[0]).toFixed(4).replace(/\.?0+$/,'');
              const exp=parseInt(parts[1]);
              const isLarge=exp>=0;
              el.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Standard form:</span><span style="color:#fcd34d;">'+n.toLocaleString('fullwide',{maximumFractionDigits:20})+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Scientific notation:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+coeff+' × 10<sup>'+exp+'</sup></span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Type:</span><span style="color:#a5b4fc;">'+(isLarge?'Large number (positive exponent)':'Small number (negative exponent)')+'</span></div>',
                '<div style="font-size:10px;opacity:0.45;margin-top:2px;">The decimal point moved '+Math.abs(exp)+' place'+(Math.abs(exp)!==1?'s':'')+' to the '+(isLarge?'left':'right')+'</div>',
              ].join('');
            }
            document.getElementById('sciConv').addEventListener('click',convert);
            document.getElementById('sciInput').addEventListener('keydown',e=>{if(e.key==='Enter')convert();});
            convert();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Write <span class='math'>56 000</span> in scientific notation.", options: ["5.6 × 10³", "56 × 10³", "5.6 × 10⁴", "0.56 × 10⁵"], answer: 2, topic: "Scientific notation" },
      { type: "input", text: "Write <span class='math'>3.8 × 10⁵</span> as an ordinary number.", answer: "380000", topic: "Scientific notation" },
      { type: "mc", text: "Which is correct scientific notation for <span class='math'>0.00042</span>?", options: ["4.2 × 10⁻³", "4.2 × 10⁻⁴", "42 × 10⁻⁵", "0.42 × 10⁻³"], answer: 1, topic: "Scientific notation" },
      { type: "input", text: "Write <span class='math'>7 250 000</span> in scientific notation (use format like 7.25e6 or 7.25 × 10^6)", answer: "7.25 × 10^6", topic: "Scientific notation" },
      { type: "mc", text: "The distance from Earth to the Sun is about <span class='math'>1.5 × 10⁸</span> km. What is this as an ordinary number?", options: ["1 500 000", "15 000 000", "150 000 000", "1 500 000 000"], answer: 2, topic: "Scientific notation" },
    ]
  },
  {
    id: 23,
    chapter: 3,
    name: "Ch 3 Exam focus",
    fullName: "Examination focus exercise",
    lesson: {
      heading: "Chapter 3 — Examination focus",
      sub: "Chapter 3 · Review",
      body: `
        <p>These exam-style questions cover all Chapter 3 content. Apply the laws carefully and show all working.</p>
        <div class="def-box">
          <div class="def-box-title">📋 Chapter 3 summary</div>
          <p>
            ✅ <span class="math">aⁿ</span>: base a multiplied n times<br>
            ✅ <span class="math">a⁰ = 1</span> (any non-zero base)<br>
            ✅ Multiply same base: <span class="math">aᵐ × aⁿ = aᵐ⁺ⁿ</span><br>
            ✅ Divide same base: <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
            ✅ Power of a power: <span class="math">(aᵐ)ⁿ = aᵐⁿ</span><br>
            ✅ Even power of negative = positive; odd = negative<br>
            ✅ Scientific notation: <span class="math">a × 10ⁿ</span>, where <span class="math">1 ≤ a &lt; 10</span>
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>In exams, always check: are the bases the same before applying a law? Is the base negative? How many decimal places to move?</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Simplify: <span class='math'>2⁴ × 2³ ÷ (2²)²</span>", options: ["2³", "2⁵", "2¹¹", "2"], answer: 0, topic: "Mixed" },
      { type: "input", text: "Calculate: <span class='math'>(−2)⁴ + (−3)³ + 5⁰</span>", answer: "-10", topic: "Mixed" },
      { type: "mc", text: "Write <span class='math'>0.000307</span> in correct scientific notation.", options: ["3.07 × 10⁻³", "3.07 × 10⁻⁴", "30.7 × 10⁻⁵", "0.307 × 10⁻³"], answer: 1, topic: "Scientific notation" },
      { type: "input", text: "Simplify: <span class='math'>x⁶ × x² ÷ (x²)³</span> (give as x^n)", answer: "x^2", topic: "Laws" },
      { type: "mc", text: "Which is the largest: <span class='math'>2⁸</span>, <span class='math'>3⁵</span>, <span class='math'>4⁴</span>, <span class='math'>5³</span>?", options: ["3⁵ = 243", "4⁴ = 256", "2⁸ = 256", "5³ = 125"], answer: 1, topic: "Mixed" },
      { type: "input", text: "The mass of a proton is <span class='math'>1.67 × 10⁻²⁷</span> kg. Write the decimal form (use e notation, e.g. 1.67e-27)", answer: "1.67e-27", topic: "Scientific notation" },
    ]
  }
  ],
  workbook: {
    chapter: 3, chapterName: "Exponents",
    topics: [
      {
        name: "Laws of exponents",
        questions: [
          {
            num: "1",
            text: "Simplify, leaving answers in exponential form:",
            parts: [
              { label: "a)", text: "3⁴ × 3⁶ ÷ 3⁵", marks: 2 },
              { label: "b)", text: "(2³)⁴ ÷ 2⁸", marks: 3 },
              { label: "c)", text: "x⁵ × x³ ÷ (x²)³", marks: 3 },
              { label: "d)", text: "(3² × 3⁰) ÷ 3³", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Scientific notation & mixed",
        questions: [
          {
            num: "2",
            text: "Write in scientific notation:",
            parts: [
              { label: "a)", text: "0,000 000 45", marks: 2 },
              { label: "b)", text: "8 700 000", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "Calculate without a calculator:",
            parts: [
              { label: "a)", text: "2⁵ − (−3)² + 4⁰ × (−2)³", marks: 4 },
              { label: "b)", text: "(2²)³ ÷ (2³)² × 2", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 3, chapterName: "Chapter 3 — Exponents",
    topics: [
      {
        name: "Laws of exponents",
        answers: [
          { num: "Q1a", ans: "3⁵", note: "4+6=10, then 10−5=5" },
          { num: "Q1b", ans: "2⁴ = 16", note: "(2³)⁴ = 2¹²; 2¹²÷2⁸ = 2⁴ = 16" },
          { num: "Q1c", ans: "x²", note: "x⁵⁺³ = x⁸; (x²)³ = x⁶; x⁸÷x⁶ = x²" },
          { num: "Q1d", ans: "3⁻¹ (= 1/3 in Grade 9)", note: "3²÷3³ = 3²⁻³ = 3⁻¹. Note: negative exponents are formally introduced in Grade 9. At Grade 8 level, the answer '3⁻¹' is acceptable, or express as 1/3." },
        ]
      },
      {
        name: "Scientific notation & mixed",
        answers: [
          { num: "Q2a", ans: "4,5 × 10⁻⁷", note: "Move decimal 7 places right" },
          { num: "Q2b", ans: "8,7 × 10⁶", note: "Move decimal 6 places left" },
          { num: "Q3a", ans: "32 − 9 + 1 × (−8) = 15", note: "32−9=23; 4⁰×(−2)³ = 1×(−8) = −8; 23+(−8)=15" },
          { num: "Q3b", ans: "2¹", note: "2⁶÷2⁶×2 = 2⁰×2 = 1×2 = 2" },
        ]
      },
    ]
  }
});
