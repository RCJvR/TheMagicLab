// Math Magician — Grade 9, Chapter 4 data
// Exponents

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 7,
      chapter: 4,
      name: "Laws of exponents",
      fullName: "The laws of exponents",
      lesson: {
        heading: "The laws of exponents",
        sub: "Chapter 4 · Topic 1",
        body: `
          <p>Exponent laws allow us to simplify expressions involving powers efficiently.</p>
          <div class="def-box">
            <div class="def-box-title">📖 The seven laws</div>
            <p>
              <strong>1. Product:</strong> <span class="math">aᵐ × aⁿ = aᵐ⁺ⁿ</span><br>
              <strong>2. Quotient:</strong> <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
              <strong>3. Power of a power:</strong> <span class="math">(aᵐ)ⁿ = aᵐⁿ</span><br>
              <strong>4. Power of a product:</strong> <span class="math">(ab)ⁿ = aⁿbⁿ</span><br>
              <strong>5. Power of a quotient:</strong> <span class="math">(a/b)ⁿ = aⁿ/bⁿ</span><br>
              <strong>6. Zero exponent:</strong> <span class="math">a⁰ = 1</span> (a ≠ 0)<br>
              <strong>7. Negative exponent:</strong> <span class="math">a⁻ⁿ = 1/aⁿ</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>x³ × x⁵ = x⁸</span></div>
            <div class="example-step"><span class="step-num">2</span><span>y⁷ ÷ y³ = y⁴</span></div>
            <div class="example-step"><span class="step-num">3</span><span>(2x²)³ = 8x⁶</span></div>
            <div class="example-step"><span class="step-num">4</span><span>3⁻² = 1/9</span></div>
            <div class="example-step"><span class="step-num">5</span><span>(5xy)⁰ = 1</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The base must be the SAME to use the product and quotient laws. You cannot simplify x³ × y⁵ using these laws.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Rational Exponent Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Evaluate base^(m/n) step by step: take the nth root, then raise to m.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Base</label><input id="expBase" type="number" value="8" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">m</label><input id="expM" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">n</label><input id="expNn" type="number" value="3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="expBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Evaluate</button>
            </div>
            <div id="expOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function ev(){
              const base=parseFloat(document.getElementById('expBase').value);
              const m=parseInt(document.getElementById('expM').value)||1;
              const n=parseInt(document.getElementById('expNn').value)||1;
              if(n===0){document.getElementById('expOut').innerHTML='<span style="color:#fca5a5;">n cannot be 0.</span>';return;}
              const root=base<0&&n%2!==0?NaN:Math.sign(base)*Math.pow(Math.abs(base),1/n);
              const result=isNaN(root)?NaN:Math.pow(root,m);
              const f=v=>Number.isInteger(v)?String(v):v.toFixed(4);
              document.getElementById('expOut').innerHTML=isNaN(result)?'<span style="color:#fca5a5;">Not real (even root of negative)</span>':[
                '<div><span style="color:rgba(221,225,240,0.45);">Expression: </span><span style="color:#fbbf24;">'+base+'^('+m+'/'+n+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Step 1 \u207f\u221abase: </span><span style="color:#a5b4fc;">'+f(root)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Step 2 raise to m: </span><span style="color:#a5b4fc;">'+f(result)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Result: </span><span style="color:#6ee7b7;font-size:16px;font-weight:700;">'+f(result)+'</span></div>',
              ].join('');
            }
            document.getElementById('expBtn').addEventListener('click',ev);
            ['expBase','expM','expNn'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')ev();}));
            ev();
          })();
          </script>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Exponential Equation Drill</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Solve b&#8339; = c by matching bases. Score as many as you can!</p>
            <div id="expEqQ" style="font-family:JetBrains Mono,monospace;font-size:20px;color:#fcd34d;margin-bottom:12px;min-height:28px;"></div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;">x =</span>
              <input id="expEqAns" type="number" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="expEqCheck" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#d97706,#f59e0b);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Check</button>
              <button id="expEqSkip" style="padding:6px 10px;border-radius:7px;border:none;background:rgba(99,102,241,0.20);color:#a5b4fc;font-family:DM Sans,sans-serif;font-size:11px;cursor:pointer;">Skip</button>
              <span id="expEqScore" style="font-family:JetBrains Mono,monospace;font-size:11px;color:rgba(221,225,240,0.45);"></span>
            </div>
            <div id="expEqFb" style="margin-top:8px;font-family:JetBrains Mono,monospace;font-size:13px;min-height:20px;"></div>
          </div>
          <script>
          (function(){
            const bases=[2,3,5,10];let ans,score=0,total=0;
            function newQ(){const b=bases[Math.floor(Math.random()*bases.length)];ans=Math.floor(Math.random()*5)+1;document.getElementById('expEqQ').textContent=b+'\u02e3 = '+Math.pow(b,ans);document.getElementById('expEqAns').value='';document.getElementById('expEqFb').textContent='';document.getElementById('expEqAns').focus();}
            function check(){const v=parseFloat(document.getElementById('expEqAns').value);if(isNaN(v))return;total++;const ok=Math.abs(v-ans)<0.01;if(ok)score++;document.getElementById('expEqFb').innerHTML=ok?'<span style="color:#6ee7b7;">\u2713 Correct! x = '+ans+'</span>':'<span style="color:#fca5a5;">\u2717 x = '+ans+'</span>';document.getElementById('expEqScore').textContent='Score: '+score+'/'+total;if(ok)setTimeout(newQ,800);}
            document.getElementById('expEqCheck').addEventListener('click',check);
            document.getElementById('expEqSkip').addEventListener('click',function(){total++;document.getElementById('expEqScore').textContent='Score: '+score+'/'+total;newQ();});
            document.getElementById('expEqAns').addEventListener('keydown',e=>{if(e.key==='Enter')check();});
            newQ();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Simplify: a⁴ × a⁻³ × a", options: ["a⁵", "a⁻²", "a²", "a⁻⁵"], answer: 2, topic: "Exponents" },
        { type: "input", text: "Simplify (3x²y)² and give the coefficient of x⁴y².", answer: "9", topic: "Exponents" },
        { type: "mc", text: "Write 2⁻³ as a fraction:", options: ["-8", "1/6", "1/8", "-1/8"], answer: 2, topic: "Exponents" },
        { type: "input", text: "Simplify: (2³)⁴ ÷ 2⁸ — give the answer as a power of 2 (exponent only).", answer: "4", topic: "Exponents" },
        { type: "mc", text: "What is (7xy²z)⁰ equal to?", options: ["0", "7", "1", "xyz"], answer: 2, topic: "Exponents" },
        { type: "input", text: "Simplify (2x²y⁻¹)³ ÷ (4x⁴y⁻²) and give the coefficient of the simplified answer.", answer: "2", topic: "Exponents" },
        { type: "input", text: "If 3 raised to the power (x + 1) equals 81, solve for x.", answer: "3", topic: "Exponents" },
      ]
    },
    {
      id: 8,
      chapter: 4,
      name: "Scientific notation",
      fullName: "Scientific notation and exponent calculations",
      lesson: {
        heading: "Scientific notation",
        sub: "Chapter 4 · Topic 2",
        body: `
          <p><strong>Scientific notation</strong> expresses numbers in the form <span class="math">a × 10ⁿ</span> where <span class="math">1 ≤ a < 10</span> and n is an integer.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Converting to/from scientific notation</div>
            <p>
              <strong>Large number → SN:</strong> move decimal left; count moves = positive exponent.<br>
              e.g. 3 450 000 = 3,45 × 10⁶<br><br>
              <strong>Small number → SN:</strong> move decimal right; count moves = negative exponent.<br>
              e.g. 0,00047 = 4,7 × 10⁻⁴<br><br>
              <strong>SN → decimal:</strong> move decimal in the direction indicated by sign of exponent.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Calculating with scientific notation</div>
            <div class="example-step"><span class="step-num">1</span><span>(3 × 10⁴) × (2 × 10³) = 6 × 10⁷</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(8 × 10⁵) ÷ (2 × 10²) = 4 × 10³</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Convert: 5,6 × 10⁻³ = 0,0056</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>After multiplying/dividing, check that the coefficient is between 1 and 10. If not, adjust the power of 10.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Scientific Notation Converter & Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Convert any number to a × 10ⁿ, then multiply or divide numbers in scientific notation.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snIn" id="g9snInL">Number</label><input id="g9snIn" type="text" value="3450000" autocomplete="off" style="width:150px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div id="g9snOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;margin-bottom:12px;"></div>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;align-items:center;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snA" id="g9snAL">a</label><input id="g9snA" type="text" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><span style="color:#a5b4fc;margin-top:16px;">× 10^</span><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snM" id="g9snML">m</label><input id="g9snM" type="number" value="5" style="width:50px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snOp">&nbsp;</label><select id="g9snOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;"><option>×</option><option selected>÷</option></select></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snB" id="g9snBL">b</label><input id="g9snB" type="text" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><span style="color:#a5b4fc;margin-top:16px;">× 10^</span><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snN" id="g9snNL">n</label><input id="g9snN" type="number" value="2" style="width:50px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div id="g9snCalc" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function sciNotation(T) {
  var $ = function (id) { return document.getElementById(id); };
  var SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  function sup(n) { return String(n).split('').map(function (c) { return SUP[c] || c; }).join(''); }
  function dec(x) { return String(x).replace('.', ','); }
  function trim(x) { return parseFloat(x.toPrecision(10)); }
  function sn(x) {
    if (x === 0) return { a: 0, n: 0 };
    var n = Math.floor(Math.log10(Math.abs(x))), a = trim(x / Math.pow(10, n));
    if (Math.abs(a) >= 10) { a = trim(a / 10); n++; }
    if (Math.abs(a) < 1) { a = trim(a * 10); n--; }
    return { a: a, n: n };
  }
  function show(s) { return dec(s.a) + ' × 10' + sup(s.n); }
  function convert() {
    var raw = $('g9snIn').value.replace(/\\s+/g, '').replace(',', '.'), out = $('g9snOut');
    var x = parseFloat(raw);
    if (!raw || isNaN(x) || !/^[-+]?[0-9]*\\.?[0-9]+(e[-+]?[0-9]+)?$/i.test(raw)) { out.innerHTML = '<span style="color:#fca5a5;">' + T.bad + '</span>'; return; }
    var s = sn(x);
    var why = s.n > 0 ? T.left.replace('#', s.n) : s.n < 0 ? T.right.replace('#', -s.n) : T.none;
    out.innerHTML = '<div style="color:#6ee7b7;font-size:15px;font-weight:700;">' + dec(x) + ' = ' + show(s) + '</div><div style="color:rgba(221,225,240,0.55);">' + why + '</div>';
  }
  function calc() {
    var a = parseFloat($('g9snA').value.replace(',', '.')), m = parseInt($('g9snM').value, 10);
    var b = parseFloat($('g9snB').value.replace(',', '.')), n = parseInt($('g9snN').value, 10), op = $('g9snOp').value, out = $('g9snCalc');
    if ([a, m, b, n].some(isNaN) || (op === '÷' && b === 0)) { out.innerHTML = '<span style="color:#fca5a5;">' + T.bad + '</span>'; return; }
    var coef = op === '×' ? trim(a * b) : trim(a / b), p = op === '×' ? m + n : m - n;
    var lines = ['(' + dec(a) + ' ' + op + ' ' + dec(b) + ') × 10' + sup(m) + (op === '×' ? '⁺' : '⁻') + sup(n < 0 ? '(' + n + ')' : n).replace('(', '⁽').replace(')', '⁾'),
      '= ' + dec(coef) + ' × 10' + sup(p)];
    var s = sn(coef);
    if (s.n !== 0) lines.push('= ' + dec(s.a) + ' × 10' + sup(s.n + p) + ' <span style="color:rgba(221,225,240,0.45);">(' + T.adjust + ')</span>');
    out.innerHTML = lines.map(function (l, i) { return '<div' + (i === lines.length - 1 ? ' style="color:#6ee7b7;font-weight:700;"' : '') + '>' + l + '</div>'; }).join('');
  }
  $('g9snIn').addEventListener('input', convert);
  ['g9snA', 'g9snM', 'g9snB', 'g9snN', 'g9snOp'].forEach(function (id) { $(id).addEventListener('input', calc); $(id).addEventListener('change', calc); });
  convert(); calc();
})({"tryit":"Try it","bad":"Enter a number such as 3450000 or 0,00047.","left":"The decimal comma moves # place(s) left, so the exponent is positive.","right":"The decimal comma moves # place(s) right, so the exponent is negative.","none":"Already between 1 and 10, so the exponent is 0.","adjust":"coefficient adjusted to between 1 and 10"});
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Write 0,000052 in scientific notation:", options: ["5,2 × 10⁴", "5,2 × 10⁻⁵", "52 × 10⁻⁶", "0,52 × 10⁻⁴"], answer: 1, topic: "Exponents" },
        { type: "input", text: "Write 7 890 000 in scientific notation. Give the exponent of 10.", answer: "6", topic: "Exponents" },
        { type: "mc", text: "Calculate: (4 × 10⁶) × (3 × 10⁵)", options: ["12 × 10¹¹", "1,2 × 10¹²", "7 × 10⁸", "12 × 10⁻⁵"], answer: 1, topic: "Exponents" },
        { type: "input", text: "Write 2,04 × 10⁻³ as a decimal.", answer: "0.00204", topic: "Exponents" },
        { type: "mc", text: "Simplify: (6 × 10⁶) ÷ (2 × 10²)", options: ["3 × 10⁴", "3 × 10²", "4 × 10⁴", "3 × 10⁸"], answer: 0, topic: "Exponents" },
      ]
    },
    {
      id: 401,
      chapter: 4,
      name: "Simplifying with several laws",
      fullName: "Simplifying expressions and solving equations using several laws of exponents",
      lesson: {
        heading: "Simplifying with several laws",
        sub: "Chapter 4 · Topic 3",
        body: `
<p>Most exam questions need more than one exponent law. Work in a fixed order and write one law per step.</p>
<div class="def-box">
  <div class="def-box-title">📖 A reliable order</div>
<p>1. Remove brackets: (ab)ⁿ = aⁿbⁿ and (aᵐ)ⁿ = aᵐⁿ.<br>2. Multiply numbers; add exponents of the same base.<br>3. Divide; subtract exponents.<br>4. Write negative exponents as fractions: a⁻ⁿ = 1/aⁿ. Final answers have positive exponents.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: simplify (2x³)² × 3x⁻⁴ ÷ 6x</div>
  <div class="example-step"><span class="step-num">1</span><span>(2x³)² = 4x⁶</span></div>
  <div class="example-step"><span class="step-num">2</span><span>4x⁶ × 3x⁻⁴ = 12x²</span></div>
  <div class="example-step"><span class="step-num">3</span><span>12x² ÷ 6x = <strong>2x</strong></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: a negative exponent on a fraction</div>
  <div class="example-step"><span class="step-num">1</span><span><span class="math">(2/3)⁻² = (3/2)² = 9/4</span>: a negative exponent flips the fraction.</span></div>
  <div class="example-step"><span class="step-num">2</span><span><span class="math">5⁰ + 2⁻¹ = 1 + 1/2 = 1 1/2</span></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: solve 3ˣ = 81</div>
  <div class="example-step"><span class="step-num">1</span><span>Write both sides with the same base: 81 = 3⁴.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>3ˣ = 3⁴, so <strong>x = 4</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>−2² = −4 but (−2)² = 4. The exponent only belongs to what is directly in front of it.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Simplify (3a²)³:", "options": ["9a⁶", "3a⁶", "27a⁶", "27a⁵"], "answer": 2, "topic": "Simplifying with several laws"},
        {"type": "mc", "text": "Simplify 8x⁵ × 2x⁻³ ÷ 4x:", "options": ["4x", "4x²", "16x", "4"], "answer": 0, "topic": "Simplifying with several laws"},
        {"type": "input", "text": "Calculate (2/5)⁻². Give a fraction.", "answer": "25/4", "altAnswers": ["6.25", "6,25", "6 1/4"], "topic": "Simplifying with several laws"},
        {"type": "input", "text": "Solve for x: 2ˣ = 64", "answer": "6", "topic": "Simplifying with several laws"},
        {"type": "input", "text": "Solve for x: 5ˣ⁺¹ = 125", "answer": "2", "topic": "Simplifying with several laws"},
        {"type": "input", "text": "Calculate 4⁰ + 4⁻¹ + 4¹. Give a fraction or decimal.", "answer": "5.25", "altAnswers": ["5,25", "21/4", "5 1/4"], "topic": "Simplifying with several laws"},
        {"type": "mc", "text": "Which is equal to 1/x³?", "options": ["x⁻⁽¹ᐟ³⁾", "x⁻³", "−x³", "3x⁻¹"], "answer": 1, "topic": "Simplifying with several laws"},
      ]
    },
    {
      id: 402,
      chapter: 4,
      name: "Problems with scientific notation",
      fullName: "Solving problems in context with numbers in scientific notation",
      lesson: {
        heading: "Problems with scientific notation",
        sub: "Chapter 4 · Topic 4",
        body: `
<p>Scientific notation makes very large and very small numbers easy to compare and calculate with. In context questions, convert, calculate, and then answer in the units asked.</p>
<div class="def-box">
  <div class="def-box-title">📖 Comparing numbers in scientific notation</div>
<p>First compare the powers of 10: the bigger power is the bigger number. If the powers are equal, compare the first parts.<br>e.g. 3,2 × 10⁵ &gt; 9,8 × 10⁴, because 10⁵ &gt; 10⁴.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: light from the Sun</div>
  <div class="example-step"><span class="step-num">1</span><span>Light travels 3 × 10⁵ km per second. The Sun is 1,5 × 10⁸ km away. How long does its light take to reach us?</span></div>
  <div class="example-step"><span class="step-num">2</span><span>time = distance ÷ speed = (1,5 × 10⁸) ÷ (3 × 10⁵) = 0,5 × 10³ = 5 × 10² s</span></div>
  <div class="example-step"><span class="step-num">3</span><span>= 500 seconds, a little over <strong>8 minutes</strong>.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: a very small length</div>
  <div class="example-step"><span class="step-num">1</span><span>A red blood cell is 7 × 10⁻⁶ m wide. How many fit side by side in 1 cm (10⁻² m)?</span></div>
  <div class="example-step"><span class="step-num">2</span><span>10⁻² ÷ (7 × 10⁻⁶) = (1/7) × 10⁴ ≈ 0,143 × 10⁴ ≈ <strong>1 430 cells</strong></span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>If the first part of your answer is not between 1 and 10, move the comma and adjust the power: 0,5 × 10³ = 5 × 10².</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Which number is the largest?", "options": ["9,9 × 10³", "5 × 10³", "1,2 × 10³", "1,1 × 10⁴"], "answer": 3, "topic": "Problems with scientific notation"},
        {"type": "input", "text": "Calculate (4 × 10⁶) × (2 × 10⁻²). Give the answer as an ordinary number.", "answer": "80000", "altAnswers": ["8 × 10^4", "8×10^4", "8 x 10^4"], "topic": "Problems with scientific notation"},
        {"type": "mc", "text": "(6 × 10⁸) ÷ (3 × 10²) =", "options": ["2 × 10⁶", "2 × 10⁴", "3 × 10⁶", "2 × 10¹⁰"], "answer": 0, "topic": "Problems with scientific notation"},
        {"type": "mc", "text": "South Africa has about 63 000 000 people. In scientific notation that is:", "options": ["63 × 10⁶", "6,3 × 10⁶", "6,3 × 10⁷", "0,63 × 10⁸"], "answer": 2, "topic": "Problems with scientific notation"},
        {"type": "input", "text": "A virus is 1,2 × 10⁻⁷ m long. Write this as an ordinary number. (m)", "answer": "0.00000012", "altAnswers": ["0,00000012"], "topic": "Problems with scientific notation"},
        {"type": "input", "text": "Sound travels 3,4 × 10² m per second. How far does it travel in 5 seconds? Give an ordinary number. (m)", "answer": "1700", "topic": "Problems with scientific notation"},
      ]
    },
    {
      id: 403,
      chapter: 4,
      name: "Ch 4 Exam focus",
      fullName: "Exam practice: exponents and scientific notation",
      lesson: {
        heading: "Ch 4 Exam focus",
        sub: "Chapter 4 · Topic 5",
        body: `
<p>These questions mix the whole chapter, the way a test does. Use one exponent law per line and give answers with positive exponents.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Write down the rule or formula you use, then substitute, then give the answer with units. Marks are given for each step.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Simplify (x²y)³ ÷ x⁴y:", "options": ["x²y³", "x²y²", "xy²", "x¹⁰y³"], "answer": 1, "topic": "Ch 4 Exam focus"},
        {"type": "input", "text": "Calculate 3⁻² × 3⁴.", "answer": "9", "topic": "Ch 4 Exam focus"},
        {"type": "input", "text": "Calculate (−1)¹⁰¹ + (−1)¹⁰⁰.", "answer": "0", "topic": "Ch 4 Exam focus"},
        {"type": "input", "text": "Solve for x: 10ˣ = 0,001", "answer": "-3", "topic": "Ch 4 Exam focus"},
        {"type": "mc", "text": "0,000 506 in scientific notation is:", "options": ["5,06 × 10⁴", "5,06 × 10⁻⁴", "50,6 × 10⁻⁵", "5,06 × 10⁻³"], "answer": 1, "topic": "Ch 4 Exam focus"},
        {"type": "mc", "text": "Simplify 2ⁿ × 4ⁿ ÷ 8ⁿ:", "options": ["1", "2ⁿ", "8ⁿ", "0"], "answer": 0, "topic": "Ch 4 Exam focus"},
      ]
    },
  ],
  workbook: {
    chapter: 4, chapterName: "Exponents",
    topics: [
      {
        name: "Laws of Exponents",
        questions: [
          {
            num: "1",
            text: "Simplify each expression:",
            parts: [
              { label: "a)", text: "x⁵ × x³ ÷ x⁴", marks: 2 },
              { label: "b)", text: "(2a³b)⁴", marks: 3 },
              { label: "c)", text: "3⁰ + 2⁻¹ + 4⁻²", marks: 4 },
              { label: "d)", text: "(x²y⁻³)² ÷ (x⁻¹y)", marks: 5 },
            ]
          },
          {
            num: "2",
            text: "Evaluate without a calculator:",
            parts: [
              { label: "a)", text: "2³ × 2⁻¹ × 2⁴", marks: 3 },
              { label: "b)", text: "(3²)³ ÷ 3⁴", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Scientific Notation",
        questions: [
          {
            num: "3",
            text: "Write in scientific notation:",
            parts: [
              { label: "a)", text: "45 300 000", marks: 2 },
              { label: "b)", text: "0,00000082", marks: 2 },
            ]
          },
          {
            num: "4",
            text: "Calculate, leaving your answer in scientific notation:",
            parts: [
              { label: "a)", text: "(5 × 10⁷) × (6 × 10⁴)", marks: 3 },
              { label: "b)", text: "(9 × 10⁸) ÷ (3 × 10⁻²)", marks: 3 },
            ]
          },
        ]
      },
      {
        "name": "Simplifying with several laws",
        "questions": [
          {
            "num": "5",
            "text": "Simplify. Leave answers with positive exponents.",
            "parts": [
              {
                "label": "a)",
                "text": "(−2a³b)² × 5ab⁻⁴",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "(3x²)³ ÷ (9x⁸)",
                "marks": 3
              },
              {
                "label": "c)",
                "text": "Solve: 2ˣ⁻¹ = 1/16",
                "marks": 3
              }
            ]
          }
        ]
      },
      {
        "name": "Problems with scientific notation",
        "questions": [
          {
            "num": "6",
            "text": "The Earth is about 1,5 × 10⁸ km from the Sun, and Mars about 2,3 × 10⁸ km.",
            "parts": [
              {
                "label": "a)",
                "text": "How much farther from the Sun is Mars than the Earth? Answer in scientific notation.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "A spacecraft travels 4 × 10⁴ km per hour. How many hours does it take to cover that extra distance?",
                "marks": 3
              }
            ]
          }
        ]
      },
    ]
  },
  answerKey: {
    chapter: 4, chapterName: "Chapter 4 — Exponents",
    topics: [
      {
        name: "Laws of Exponents",
        answers: [
          { num: "Q1a", ans: "x⁴", note: "5 + 3 - 4 = 4" },
          { num: "Q1b", ans: "16a¹²b⁴", note: "2⁴ = 16; (a³)⁴ = a¹²; b⁴" },
          { num: "Q1c", ans: "1 + 1/2 + 1/16 = 25/16 = 1,5625", note: "1 + 0,5 + 0,0625 = 1,5625" },
          { num: "Q1d", ans: "x⁵/y⁷", note: "x⁴y⁻⁶ ÷ x⁻¹y = x⁵y⁻⁷ = x⁵/y⁷" },
          { num: "Q2a", ans: "64", note: "2^(3-1+4) = 2⁶ = 64" },
          { num: "Q2b", ans: "3² = 9", note: "3⁶ ÷ 3⁴ = 3² = 9" },
        ]
      },
      {
        name: "Scientific Notation",
        answers: [
          { num: "Q3a", ans: "4,53 × 10⁷", note: "Decimal moves 7 places left" },
          { num: "Q3b", ans: "8,2 × 10⁻⁷", note: "Decimal moves 7 places right" },
          { num: "Q4a", ans: "3 × 10¹²", note: "30 × 10¹¹ = 3 × 10¹²" },
          { num: "Q4b", ans: "3 × 10¹⁰", note: "9 ÷ 3 = 3; 10^(8-(-2)) = 10¹⁰" },
        ]
      },
      {
        "name": "Simplifying with several laws",
        "answers": [
          {
            "num": "Q5a",
            "ans": "20a⁷ / b²",
            "note": "4a⁶b² × 5ab⁻⁴ = 20a⁷b⁻²"
          },
          {
            "num": "Q5b",
            "ans": "3 / x²",
            "note": "27x⁶ ÷ 9x⁸ = 3x⁻²"
          },
          {
            "num": "Q5c",
            "ans": "x = −3",
            "note": "1/16 = 2⁻⁴, so x − 1 = −4"
          }
        ]
      },
      {
        "name": "Problems with scientific notation",
        "answers": [
          {
            "num": "Q6a",
            "ans": "8 × 10⁷ km",
            "note": "2,3 × 10⁸ − 1,5 × 10⁸ = 0,8 × 10⁸"
          },
          {
            "num": "Q6b",
            "ans": "2 000 hours (2 × 10³)",
            "note": "8 × 10⁷ ÷ 4 × 10⁴ = 2 × 10³"
          }
        ]
      },
    ]
  }
});
