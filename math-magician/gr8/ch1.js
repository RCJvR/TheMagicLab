// Math Magician — Grade 8, Chapter 1 data
// Auto-loaded on demand by math-magician-gr8.html

MathMagician.registerChapter(1, {
  topics: [
{
    id: 101,
    name: "The four operations",
    fullName: "The four operations on whole numbers",
    lesson: {
      heading: "The four operations on whole numbers",
      sub: "Chapter 1 · Topic 1",
      body: `
        <p>The <strong>four operations</strong> are the building blocks of all mathematics: <em>addition</em>, <em>subtraction</em>, <em>multiplication</em>, and <em>division</em>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Definitions</div>
          <p>
            <strong>Addition (+)</strong> — combining two or more quantities.<br>
            <strong>Subtraction (−)</strong> — finding the difference between quantities.<br>
            <strong>Multiplication (×)</strong> — repeated addition of equal groups.<br>
            <strong>Division (÷)</strong> — splitting into equal groups, the inverse of multiplication.
          </p>
        </div>
        <p>When a calculation contains more than one operation, we follow the <strong>order of operations (BODMAS)</strong>:</p>
        <div class="math-block">B — Brackets first
O — Orders (powers/roots)
D — Division  } left to right
M — Multiplication }
A — Addition  } left to right
S — Subtraction }</div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate: <span class="math">3 + 4 × 2 − (6 ÷ 3)</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Brackets first: <span class="math">6 ÷ 3 = 2</span> → expression becomes <span class="math">3 + 4 × 2 − 2</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Multiplication next: <span class="math">4 × 2 = 8</span> → expression becomes <span class="math">3 + 8 − 2</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Left to right: <span class="math">3 + 8 = 11</span>, then <span class="math">11 − 2 = 9</span></span></div>
          <div class="example-step"><span class="step-num">5</span><span><strong>Answer: 9</strong></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Always write out each step. In exams, method marks are awarded even if your final answer is wrong.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Arithmetic Drill</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Pick an operation and a difficulty, then answer as many as you can!</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:center;">
              <select id="drillOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="add">+ Addition</option>
                <option value="sub">− Subtraction</option>
                <option value="mul">× Multiplication</option>
                <option value="div">÷ Division</option>
              </select>
              <select id="drillDiff" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="easy">Easy (1–10)</option>
                <option value="med" selected>Medium (1–20)</option>
                <option value="hard">Hard (1–100)</option>
              </select>
              <button id="drillNew" style="padding:6px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">New question</button>
            </div>
            <div id="drillQ" style="font-family:JetBrains Mono,monospace;font-size:20px;color:#fcd34d;margin-bottom:12px;"></div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <input id="drillAns" type="number" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="drillCheck" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#d97706,#f59e0b);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Check</button>
              <span id="drillScore" style="font-family:JetBrains Mono,monospace;font-size:11px;color:rgba(221,225,240,0.45);"></span>
            </div>
            <div id="drillFb" style="margin-top:8px;font-family:JetBrains Mono,monospace;font-size:13px;"></div>
          </div>
          <script>
          (function(){
            let a,b,ans,score=0,total=0;
            function rnd(max){return Math.floor(Math.random()*max)+1;}
            function newQ(){
              const op=document.getElementById('drillOp').value;
              const diff=document.getElementById('drillDiff').value;
              const max=diff==='easy'?10:diff==='med'?20:100;
              a=rnd(max); b=rnd(max);
              if(op==='sub'&&b>a){[a,b]=[b,a];}
              if(op==='div'){b=rnd(diff==='easy'?5:diff==='med'?10:12);a=b*rnd(diff==='easy'?5:diff==='med'?10:12);}
              const ops={add:'+',sub:'−',mul:'×',div:'÷'};
              ans=op==='add'?a+b:op==='sub'?a-b:op==='mul'?a*b:a/b;
              document.getElementById('drillQ').textContent=a+' '+ops[op]+' '+b+' = ?';
              document.getElementById('drillAns').value='';
              document.getElementById('drillFb').textContent='';
              document.getElementById('drillAns').focus();
            }
            function check(){
              const v=parseFloat(document.getElementById('drillAns').value);
              if(isNaN(v))return;
              total++;
              const ok=Math.abs(v-ans)<0.001;
              if(ok)score++;
              document.getElementById('drillFb').innerHTML=ok
                ?'<span style="color:#6ee7b7;">✓ Correct!</span>'
                :'<span style="color:#fca5a5;">✗ Answer was '+ans+'</span>';
              document.getElementById('drillScore').textContent='Score: '+score+'/'+total;
              setTimeout(newQ,900);
            }
            document.getElementById('drillNew').addEventListener('click',newQ);
            document.getElementById('drillCheck').addEventListener('click',check);
            document.getElementById('drillAns').addEventListener('keydown',e=>{if(e.key==='Enter')check();});
            document.getElementById('drillOp').addEventListener('change',newQ);
            document.getElementById('drillDiff').addEventListener('change',newQ);
            newQ();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Calculate: <span class='math'>5 + 3 × 4</span>", options: ["32", "17", "20", "27"], answer: 1, topic: "BODMAS" },
      { type: "mc", text: "What is <span class='math'>(12 + 8) ÷ 4 − 2</span>?", options: ["3", "5", "7", "1"], answer: 0, topic: "BODMAS" },
      { type: "input", text: "Calculate: <span class='math'>3 × (4 + 6) − 5 × 2</span>", answer: "20", topic: "BODMAS" },
      { type: "mc", text: "Which operation is performed first in <span class='math'>8 ÷ 2 + 3 × 4</span>?", options: ["Addition", "Division and multiplication (left to right)", "Multiplication", "Subtraction"], answer: 1, topic: "BODMAS" },
      { type: "input", text: "Calculate: <span class='math'>100 − 4² + (3 × 5)</span>", answer: "99", topic: "BODMAS" },
      { type: "mc", text: "Insert one pair of brackets into <span class='math'>3 + 4 × 2 − 1</span> so that the result equals 13. Which version is correct?", options: ["(3 + 4) × 2 − 1", "3 + (4 × 2 − 1)", "3 + 4 × (2 − 1)", "(3 + 4 × 2) − 1"], answer: 0, topic: "BODMAS" },
    ]
  },
  {
    id: 102,
    name: "Properties of whole numbers",
    fullName: "The properties of whole numbers",
    lesson: {
      heading: "Properties of whole numbers",
      sub: "Chapter 1 · Topic 2",
      body: `
        <p>Whole numbers have special <strong>properties</strong> that make calculations easier and help us understand number relationships.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Key Properties</div>
          <p>
            <strong>Commutative:</strong> order doesn't matter for + and ×<br>
            <span class="math">a + b = b + a</span> &nbsp;&nbsp; <span class="math">a × b = b × a</span><br><br>
            <strong>Associative:</strong> grouping doesn't matter for + and ×<br>
            <span class="math">(a + b) + c = a + (b + c)</span><br><br>
            <strong>Distributive:</strong> multiplication spreads over addition<br>
            <span class="math">a × (b + c) = a×b + a×c</span><br><br>
            <strong>Identity elements:</strong> <span class="math">a + 0 = a</span> &nbsp;&nbsp; <span class="math">a × 1 = a</span><br><br>
            <strong>Zero property:</strong> <span class="math">a × 0 = 0</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example — distributive property</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate <span class="math">7 × 53</span> using the distributive property.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Split 53: <span class="math">7 × (50 + 3)</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">= 7×50 + 7×3 = 350 + 21 = 371</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>The distributive property is the foundation of mental mathematics and later algebra. Mastering it now saves enormous time.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Which property is shown: <span class='math'>4 × (3 + 7) = 4×3 + 4×7</span>?", options: ["Commutative", "Associative", "Distributive", "Identity"], answer: 2, topic: "Properties" },
      { type: "mc", text: "What is the identity element for multiplication?", options: ["0", "1", "−1", "10"], answer: 1, topic: "Properties" },
      { type: "input", text: "Use the distributive property to calculate <span class='math'>6 × 48</span>", answer: "288", topic: "Properties" },
      { type: "mc", text: "Which equation shows the commutative property of addition?", options: ["(2+3)+4 = 2+(3+4)", "5+0 = 5", "3+7 = 7+3", "3×(2+1) = 6+3"], answer: 2, topic: "Properties" },
      { type: "input", text: "If <span class='math'>a × 0 = ?</span> for any whole number a, what is the answer?", answer: "0", topic: "Properties" },
      { type: "input", text: "Use the distributive property in reverse to simplify <span class='math'>34 × 17 + 34 × 3</span> without multiplying 34 × 17 directly.", answer: "680", topic: "Properties" },
    ]
  },
  {
    id: 103,
    name: "Calculation techniques",
    fullName: "Calculation techniques",
    lesson: {
      heading: "Calculation techniques",
      sub: "Chapter 1 · Topic 3",
      body: `
        <p>Smart calculation techniques let you work faster and with fewer errors, especially without a calculator.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Key Techniques</div>
          <p>
            <strong>Rounding:</strong> approximate a number to a given place value.<br>
            <strong>Estimation:</strong> use rounded numbers to check if an answer is reasonable.<br>
            <strong>Breaking up numbers:</strong> use the distributive/associative property.<br>
            <strong>Compensation:</strong> round up, then subtract the extra.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Compensation method</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate <span class="math">258 + 99</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Round 99 to 100: <span class="math">258 + 100 = 358</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>We added 1 too many, so subtract: <span class="math">358 − 1 = 357</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Rounding to estimate</div>
          <div class="example-step"><span class="step-num">1</span><span>Estimate <span class="math">487 × 23</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Round: <span class="math">500 × 20 = 10 000</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Actual answer (11 201) is close — estimate confirms no big error.</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Always estimate before calculating. If your answer is far from your estimate, you've likely made an error.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Round 3 478 to the nearest hundred.", options: ["3 400", "3 500", "3 000", "3 480"], answer: 1, topic: "Rounding" },
      { type: "input", text: "Use compensation to calculate <span class='math'>346 + 199</span>", answer: "545", topic: "Compensation" },
      { type: "mc", text: "Estimate <span class='math'>612 × 48</span> by rounding each number to the nearest ten.", options: ["24 000", "30 000", "29 376", "25 000"], answer: 1, topic: "Estimation" },
      { type: "input", text: "Round 7 849 to the nearest thousand.", answer: "8000", topic: "Rounding" },
      { type: "mc", text: "Which calculation uses the compensation method correctly for <span class='math'>157 + 98</span>?", options: ["160 + 100 − 5", "157 + 100 − 2", "155 + 100", "157 + 98"], answer: 1, topic: "Compensation" },
      { type: "mc", text: "Estimate <span class='math'>512 × 289 ÷ 48</span> by rounding each number to 1 significant figure. Which is closest?", options: ["3 000", "6 000", "1 500", "4 500"], answer: 0, topic: "Estimation" },
    ]
  },
  {
    id: 104,
    name: "Simplifying calculations",
    fullName: "Methods of simplifying calculations",
    lesson: {
      heading: "Methods of simplifying calculations",
      sub: "Chapter 1 · Topic 4",
      body: `
        <p>Some calculations look complex but can be simplified using <strong>smart number choices</strong> and known relationships.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Simplification strategies</div>
          <p>
            <strong>Factoring out:</strong> identify common factors to simplify.<br>
            <strong>Cancellation:</strong> in fractions, cancel common factors top and bottom.<br>
            <strong>Rearranging:</strong> change order to make calculation easier (commutative/associative).<br>
            <strong>Splitting:</strong> break complex numbers into convenient parts.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate <span class="math">25 × 48 × 4</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Rearrange: <span class="math">25 × 4 × 48 = 100 × 48</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">= 4 800</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Simplifying a fraction</div>
          <div class="example-step"><span class="step-num">1</span><span>Simplify <span class="math">36 ÷ 48</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>HCF of 36 and 48 is 12: <span class="math">36÷12 = 3</span>, <span class="math">48÷12 = 4</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Result: <span class="math">3/4</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Look for pairs that multiply to a round number like 100, 1000, or a multiple of 10. These make mental calculation easy.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Simplify <span class='math'>25 × 32 × 4</span> by rearranging smartly.", options: ["3 200", "3 600", "2 800", "3 000"], answer: 0, topic: "Simplifying" },
      { type: "input", text: "What is the simplified form of <span class='math'>72 ÷ 96</span>? Give as a fraction (e.g. 3/4)", answer: "3/4", topic: "Simplifying" },
      { type: "mc", text: "What useful pair do you spot in <span class='math'>125 × 48 × 8</span>?", options: ["125 × 8 = 1000", "48 × 8 = 384", "125 × 48 = easy", "None"], answer: 0, topic: "Simplifying" },
      { type: "input", text: "Calculate <span class='math'>125 × 8 × 7</span> using a smart grouping.", answer: "7000", topic: "Simplifying" },
      { type: "input", text: "Simplify <span class='math'>45 × 8 ÷ 9</span> by cancelling common factors before multiplying.", answer: "40", topic: "Simplifying" },
    ]
  },
  {
    id: 105,
    name: "Factors and multiples",
    fullName: "Factors and multiples of whole numbers",
    lesson: {
      heading: "Factors and multiples of whole numbers",
      sub: "Chapter 1 · Topic 5",
      body: `
        <p><strong>Factors</strong> and <strong>multiples</strong> are fundamental to working with fractions, LCM, HCF, and simplifying expressions.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Definitions</div>
          <p>
            <strong>Factor:</strong> a number that divides exactly into another (no remainder).<br>
            <em>Factors of 12: 1, 2, 3, 4, 6, 12</em><br><br>
            <strong>Multiple:</strong> the result of multiplying a number by a positive integer.<br>
            <em>Multiples of 5: 5, 10, 15, 20, 25 …</em><br><br>
            <strong>Prime number:</strong> a number with exactly 2 factors (1 and itself).<br>
            <em>Primes: 2, 3, 5, 7, 11, 13, 17 …</em><br><br>
            <strong>HCF</strong> (Highest Common Factor) — largest factor shared by two numbers.<br>
            <strong>LCM</strong> (Lowest Common Multiple) — smallest multiple shared by two numbers.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Finding HCF and LCM of 12 and 18</div>
          <div class="example-step"><span class="step-num">1</span><span>Prime factorisation: <span class="math">12 = 2² × 3</span> &nbsp; <span class="math">18 = 2 × 3²</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>HCF: lowest power of each shared prime: <span class="math">2¹ × 3¹ = 6</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>LCM: highest power of each prime: <span class="math">2² × 3² = 36</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Prime factorisation is the fastest method for both HCF and LCM. Always start by building the factor tree.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Factors, Multiples, HCF & LCM</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="fmA" type="number" value="12" min="1" max="999" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <input id="fmB" type="number" value="18" min="1" max="999" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="fmCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="fmOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){return b===0?a:gcd(b,a%b);}
            function factors(n){const f=[];for(let i=1;i<=n;i++)if(n%i===0)f.push(i);return f;}
            function calc(){
              const a=parseInt(document.getElementById('fmA').value)||1;
              const b=parseInt(document.getElementById('fmB').value)||1;
              const g=gcd(a,b);
              const l=a*b/g;
              const fa=factors(a); const fb=factors(b);
              const common=fa.filter(x=>fb.includes(x));
              document.getElementById('fmOut').innerHTML=[
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Factors of '+a+':</span><span style="color:#a5b4fc;">'+fa.join(', ')+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Factors of '+b+':</span><span style="color:#a5b4fc;">'+fb.join(', ')+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Common factors:</span><span style="color:#fbbf24;">'+common.join(', ')+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">HCF:</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">'+g+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">LCM:</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">'+l+'</span></div>',
              ].join('');
            }
            document.getElementById('fmCalc').addEventListener('click',calc);
            ['fmA','fmB'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "What is the HCF of 24 and 36?", options: ["6", "12", "4", "9"], answer: 1, topic: "HCF/LCM" },
      { type: "input", text: "What is the LCM of 8 and 12?", answer: "24", topic: "HCF/LCM" },
      { type: "mc", text: "Which of the following is a prime number?", options: ["51", "57", "59", "55"], answer: 2, topic: "Primes" },
      { type: "mc", text: "How many factors does 28 have?", options: ["4", "5", "6", "7"], answer: 2, topic: "Factors" },
      { type: "input", text: "Write the prime factorisation of 60 (e.g. 2x2x3x5)", answer: "2x2x3x5", topic: "Prime factors" },
      { type: "input", text: "Use prime factorisation to find the LCM of 90 and 126.", answer: "630", topic: "HCF/LCM" },
      { type: "input", text: "Two warning lights flash every 18 seconds and every 24 seconds. They flash together at exactly 08:00:00. After how many seconds will they next flash together?", answer: "72", topic: "HCF/LCM" },
    ]
  },
  {
    id: 106,
    name: "Ratios",
    fullName: "Ratios",
    lesson: {
      heading: "Ratios",
      sub: "Chapter 1 · Topic 6",
      body: `
        <p>A <strong>ratio</strong> compares two or more quantities of the same kind. Ratios appear in maps, recipes, finance, and science.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Ratio rules</div>
          <p>
            Written as <span class="math">a : b</span> or <span class="math">a/b</span>.<br>
            Always <strong>simplify</strong> by dividing both parts by their HCF.<br>
            <span class="math">12 : 18</span> → HCF = 6 → <span class="math">2 : 3</span><br><br>
            <strong>Equivalent ratios</strong> are formed by multiplying or dividing both parts by the same number.<br>
            <span class="math">2 : 3 = 4 : 6 = 10 : 15</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Dividing in a ratio</div>
          <div class="example-step"><span class="step-num">1</span><span>Share R 240 in the ratio 3 : 5.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Total parts: <span class="math">3 + 5 = 8</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>One part: <span class="math">240 ÷ 8 = R30</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Shares: <span class="math">3 × 30 = R90</span> and <span class="math">5 × 30 = R150</span></span></div>
          <div class="example-step"><span class="step-num">5</span><span>Check: <span class="math">R90 + R150 = R240 ✓</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Always check that your parts add up to the original total. This one step catches almost all ratio errors.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Ratio Simplifier & Divider</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="ratA" type="number" value="15" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;">:</span>
              <input id="ratB" type="number" value="25" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:rgba(221,225,240,0.40);font-size:11px;">Total amount:</span>
              <input id="ratTotal" type="number" value="200" min="1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="ratCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Simplify & Share</button>
            </div>
            <div id="ratOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){return b===0?a:gcd(b,a%b);}
            function calc(){
              const a=parseInt(document.getElementById('ratA').value)||1;
              const b=parseInt(document.getElementById('ratB').value)||1;
              const t=parseInt(document.getElementById('ratTotal').value)||0;
              const g=gcd(a,b);
              const sa=a/g, sb=b/g;
              const shareA=t*a/(a+b), shareB=t*b/(a+b);
              document.getElementById('ratOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Original ratio:</span><span style="color:#a5b4fc;">'+a+' : '+b+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Simplified:</span><span style="color:#fcd34d;font-size:14px;font-weight:700;">'+sa+' : '+sb+'</span></div>',
                t?'<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Share of '+t+':</span><span style="color:#6ee7b7;">'+shareA.toFixed(2)+' and '+shareB.toFixed(2)+'</span></div>':'',
                '<div style="font-size:10px;opacity:0.4;margin-top:4px;">HCF used: '+g+'</div>',
              ].join('');
            }
            document.getElementById('ratCalc').addEventListener('click',calc);

          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Simplify the ratio <span class='math'>36 : 48</span>", options: ["6 : 8", "3 : 4", "9 : 12", "4 : 3"], answer: 1, topic: "Ratios" },
      { type: "input", text: "Share R 350 in the ratio 2 : 5. What is the smaller share? (R)", answer: "100", topic: "Ratios" },
      { type: "mc", text: "Which ratio is equivalent to <span class='math'>4 : 6</span>?", options: ["8 : 10", "6 : 9", "2 : 4", "12 : 15"], answer: 1, topic: "Ratios" },
      { type: "input", text: "The ratio of boys to girls in a class is 3 : 4. If there are 21 boys, how many girls are there?", answer: "28", topic: "Ratios" },
      { type: "mc", text: "Share 180 in the ratio 1 : 2 : 3. What is the largest share?", options: ["30", "60", "90", "120"], answer: 2, topic: "Ratios" },
    ]
  },
  {
    id: 107,
    name: "Rates",
    fullName: "Rates",
    lesson: {
      heading: "Rates",
      sub: "Chapter 1 · Topic 7",
      body: `
        <p>A <strong>rate</strong> compares two quantities of <em>different</em> kinds. Rates always have units — like km/h, R/kg, or litres/minute.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Rate vs Ratio</div>
          <p>
            <strong>Ratio:</strong> same units (e.g. boys : girls)<br>
            <strong>Rate:</strong> different units (e.g. km per hour)<br><br>
            A <strong>unit rate</strong> has 1 in the denominator: <em>R12,50 per kg</em><br><br>
            To find a unit rate: divide the first quantity by the second.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked examples</div>
          <div class="example-step"><span class="step-num">1</span><span>A car travels 360 km in 4 hours. Find the speed in km/h.</span></div>
          <div class="example-step"><span class="step-num">2</span><span><span class="math">Speed = 360 ÷ 4 = 90 km/h</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>You pay R84 for 6 kg of apples. Unit price?</span></div>
          <div class="example-step"><span class="step-num">4</span><span><span class="math">R84 ÷ 6 = R14 per kg</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Always write the units in your answer. <em>"90"</em> is incomplete — <em>"90 km/h"</em> is correct.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Rate Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Select units, enter any two values, leave one blank — the third is calculated automatically.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">

              <!-- Distance -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Distance</label>
                <div style="display:flex;gap:4px;align-items:center;">
                  <input id="rateD" type="number" placeholder="—" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
                  <select id="rateDUnit" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 6px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                    <option value="km">km</option>
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="mi">mi</option>
                  </select>
                </div>
              </div>

              <!-- Time -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Time</label>
                <div style="display:flex;gap:4px;align-items:center;">
                  <input id="rateT" type="number" placeholder="—" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
                  <select id="rateTUnit" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 6px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                    <option value="h">h</option>
                    <option value="min">min</option>
                    <option value="s">s</option>
                  </select>
                </div>
              </div>

              <!-- Speed -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Speed (rate)</label>
                <div style="display:flex;gap:4px;align-items:center;">
                  <input id="rateR" type="number" placeholder="—" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
                  <span id="rateRUnit" style="font-size:11px;color:#a5b4fc;font-family:JetBrains Mono,monospace;white-space:nowrap;min-width:36px;">km/h</span>
                </div>
              </div>

              <button id="rateCalc" style="padding:8px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;align-self:flex-end;">Calculate</button>
            </div>
            <div id="rateOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            // Conversion factors TO metres and seconds (base SI units)
            const toM   = { km:1000, m:1, cm:0.01, mm:0.001, mi:1609.344 };
            const toS   = { h:3600,  min:60, s:1 };

            function fmt(n){
              // Format nicely: avoid unnecessary decimals for whole numbers
              if(n === Math.round(n)) return String(n);
              // up to 4 sig figs
              return parseFloat(n.toPrecision(4)).toString();
            }

            function updateRateUnit(){
              const du = document.getElementById('rateDUnit').value;
              const tu = document.getElementById('rateTUnit').value;
              document.getElementById('rateRUnit').textContent = du+'/'+tu;
            }

            function calc(){
              const dRaw = parseFloat(document.getElementById('rateD').value);
              const tRaw = parseFloat(document.getElementById('rateT').value);
              const rRaw = parseFloat(document.getElementById('rateR').value);
              const du   = document.getElementById('rateDUnit').value;
              const tu   = document.getElementById('rateTUnit').value;
              const el   = document.getElementById('rateOut');

              const dBlank = isNaN(dRaw);
              const tBlank = isNaN(tRaw);
              const rBlank = isNaN(rRaw);
              const blanks = [dBlank, tBlank, rBlank].filter(Boolean).length;
              if(blanks > 1){ el.innerHTML='<span style="color:#fca5a5;">Leave exactly one field blank.</span>'; return; }
              if(blanks === 0){ el.innerHTML='<span style="color:#fca5a5;">Leave one field blank for it to be calculated.</span>'; return; }

              // Convert inputs to base units (metres, seconds)
              const dBase = dBlank ? null : dRaw * toM[du];
              const tBase = tBlank ? null : tRaw * toS[tu];
              // Rate in base units is always m/s; user rate is in du/tu
              const rBase = rBlank ? null : rRaw * (toM[du] / toS[tu]);

              let resultBase, resultDisplay, steps = [];

              if(dBlank){
                // d = r × t
                resultBase   = rBase * tBase;
                resultDisplay = resultBase / toM[du];
                steps = [
                  'Formula: Distance = Speed × Time',
                  'Convert: '+rRaw+' '+du+'/'+tu+' = '+(fmt(rBase))+' m/s',
                  'Convert: '+tRaw+' '+tu+' = '+(fmt(tBase))+' s',
                  'Distance = '+fmt(rBase)+' × '+fmt(tBase)+' = '+fmt(resultBase)+' m',
                  '→ Convert back: '+fmt(resultBase)+' m = <strong style="color:#6ee7b7;">'+fmt(resultDisplay)+' '+du+'</strong>',
                ];
                document.getElementById('rateD').value = fmt(resultDisplay);
              } else if(tBlank){
                // t = d / r
                resultBase   = dBase / rBase;
                resultDisplay = resultBase / toS[tu];
                steps = [
                  'Formula: Time = Distance ÷ Speed',
                  'Convert: '+dRaw+' '+du+' = '+fmt(dBase)+' m',
                  'Convert: '+rRaw+' '+du+'/'+tu+' = '+fmt(rBase)+' m/s',
                  'Time = '+fmt(dBase)+' ÷ '+fmt(rBase)+' = '+fmt(resultBase)+' s',
                  '→ Convert back: '+fmt(resultBase)+' s = <strong style="color:#6ee7b7;">'+fmt(resultDisplay)+' '+tu+'</strong>',
                ];
                document.getElementById('rateT').value = fmt(resultDisplay);
              } else {
                // r = d / t
                resultBase   = dBase / tBase;
                resultDisplay = resultBase / (toM[du] / toS[tu]);
                steps = [
                  'Formula: Speed = Distance ÷ Time',
                  'Convert: '+dRaw+' '+du+' = '+fmt(dBase)+' m',
                  'Convert: '+tRaw+' '+tu+' = '+fmt(tBase)+' s',
                  'Speed = '+fmt(dBase)+' ÷ '+fmt(tBase)+' = '+fmt(resultBase)+' m/s',
                  '→ Convert back: '+fmt(resultBase)+' m/s = <strong style="color:#6ee7b7;">'+fmt(resultDisplay)+' '+du+'/'+tu+'</strong>',
                ];
                document.getElementById('rateR').value = fmt(resultDisplay);
              }

              el.innerHTML = steps.map((s,i) =>
                '<div style="color:'+(i===steps.length-1?'#6ee7b7':i===0?'#fbbf24':'rgba(221,225,240,0.55)')+'">'+s+'</div>'
              ).join('');
            }

            document.getElementById('rateCalc').addEventListener('click', calc);
            document.getElementById('rateDUnit').addEventListener('change', function(){ updateRateUnit(); });
            document.getElementById('rateTUnit').addEventListener('change', function(){ updateRateUnit(); });
            ['rateD','rateT','rateR'].forEach(id =>
              document.getElementById(id).addEventListener('keydown', e => { if(e.key==='Enter') calc(); })
            );
            updateRateUnit();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "A tap fills 120 litres in 8 minutes. What is the rate in litres per minute?", answer: "15", topic: "Rates" },
      { type: "mc", text: "A car travels 450 km in 5 hours. What is its average speed?", options: ["80 km/h", "90 km/h", "95 km/h", "100 km/h"], answer: 1, topic: "Rates" },
      { type: "input", text: "You earn R 630 for 9 hours of work. What is your hourly rate? (R)", answer: "70", topic: "Rates" },
      { type: "mc", text: "Which is the better buy: 2 kg of rice for R34 or 5 kg for R80?", options: ["2 kg bag (R17/kg)", "5 kg bag (R16/kg)", "They are the same", "Cannot determine"], answer: 1, topic: "Rates" },
      { type: "input", text: "A printer prints 240 pages in 6 minutes. How many pages per minute?", answer: "40", topic: "Rates" },
    ]
  },
  {
    id: 108,
    name: "Financial contexts",
    fullName: "Solving problems in financial contexts",
    lesson: {
      heading: "Solving problems in financial contexts",
      sub: "Chapter 1 · Topic 8",
      body: `
        <p>Mathematics is used every day in personal finance. Key concepts include profit/loss, percentage, discount, VAT, and simple interest.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Key Financial Concepts</div>
          <p>
            <strong>Profit/Loss:</strong> <span class="math">Profit = Selling price − Cost price</span><br>
            <strong>Percentage profit:</strong> <span class="math">(Profit ÷ Cost price) × 100</span><br><br>
            <strong>Discount:</strong> reduction off the original price.<br>
            <span class="math">Discount amount = % × Original price</span><br><br>
            <strong>VAT (15% in SA):</strong> tax added to prices.<br>
            <span class="math">Price incl. VAT = Price × 1.15</span><br><br>
            <strong>Simple Interest:</strong> <span class="math">I = P × r × t</span><br>
            where P = principal, r = rate (as decimal), t = time in years.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example — VAT and discount</div>
          <div class="example-step"><span class="step-num">1</span><span>A jacket costs R 600. It has a 20% discount, then 15% VAT is added. Final price?</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Discount: <span class="math">20% × R600 = R120</span>. Sale price: <span class="math">R600 − R120 = R480</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>VAT: <span class="math">R480 × 1.15 = R552</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Simple interest</div>
          <div class="example-step"><span class="step-num">1</span><span>Invest R 2 000 at 8% p.a. simple interest for 3 years.</span></div>
          <div class="example-step"><span class="step-num">2</span><span><span class="math">I = 2000 × 0.08 × 3 = R480</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Total: <span class="math">R2000 + R480 = R2480</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>In South Africa, VAT is currently 15%. Always check exam questions specify the rate — it has changed before.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Financial Calculator</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:flex-end;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Mode</label>
                <select id="finMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="profit">Profit / Loss</option>
                  <option value="discount">Discount</option>
                  <option value="vat">VAT (15%)</option>
                  <option value="pct">% of amount</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;" id="finL1">Cost price (R)</label>
                <input id="finV1" type="number" value="80" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;" id="finL2">Selling price (R)</label>
                <input id="finV2" type="number" value="120" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <button id="finCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="finOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            const modes={
              profit:{l1:'Cost price (R)',l2:'Selling price (R)',d1:80,d2:120},
              discount:{l1:'Original price (R)',l2:'Discount %',d1:500,d2:20},
              vat:{l1:'Price excl. VAT (R)',l2:'(VAT = 15% fixed)',d1:200,d2:15},
              pct:{l1:'Amount (R)',l2:'Percentage %',d1:300,d2:35},
            };
            function setMode(){
              const m=document.getElementById('finMode').value;
              const cfg=modes[m];
              document.getElementById('finL1').textContent=cfg.l1;
              document.getElementById('finL2').textContent=cfg.l2;
              document.getElementById('finV1').value=cfg.d1;
              document.getElementById('finV2').value=cfg.d2;
              if(m==='vat') document.getElementById('finV2').disabled=true;
              else document.getElementById('finV2').disabled=false;

            }
            function calc(){
              const m=document.getElementById('finMode').value;
              const v1=parseFloat(document.getElementById('finV1').value)||0;
              const v2=parseFloat(document.getElementById('finV2').value)||0;
              const el=document.getElementById('finOut');
              let lines=[];
              if(m==='profit'){
                const diff=v2-v1, pct=(diff/v1*100);
                lines=[
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">'+(diff>=0?'Profit':'Loss')+':</span><span style="color:'+(diff>=0?'#6ee7b7':'#fca5a5')+';">R '+Math.abs(diff).toFixed(2)+'</span></div>',
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">% '+(diff>=0?'profit':'loss')+':</span><span style="color:#fcd34d;">'+Math.abs(pct).toFixed(2)+'%</span></div>',
                  '<div style="font-size:10px;opacity:0.4;">Formula: (SP−CP)/CP × 100</div>',
                ];
              } else if(m==='discount'){
                const disc=v1*v2/100, final=v1-disc;
                lines=[
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Discount amount:</span><span style="color:#fca5a5;">R '+disc.toFixed(2)+'</span></div>',
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Price after discount:</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">R '+final.toFixed(2)+'</span></div>',
                ];
              } else if(m==='vat'){
                const vat=v1*0.15, incl=v1+vat;
                lines=[
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">VAT (15%):</span><span style="color:#fca5a5;">R '+vat.toFixed(2)+'</span></div>',
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Price incl. VAT:</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">R '+incl.toFixed(2)+'</span></div>',
                ];
              } else {
                const res=v1*v2/100;
                lines=[
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">'+v2+'% of R'+v1+':</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">R '+res.toFixed(2)+'</span></div>',
                  '<div style="font-size:10px;opacity:0.4;">'+v2+'/100 × '+v1+' = '+res.toFixed(2)+'</div>',
                ];
              }
              el.innerHTML=lines.join('');
            }
            document.getElementById('finMode').addEventListener('change',setMode);
            document.getElementById('finCalc').addEventListener('click',calc);
            document.getElementById('finV1').addEventListener('input',calc);
            document.getElementById('finV2').addEventListener('input',calc);
            setMode();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "A shop buys a shirt for R80 and sells it for R120. What is the percentage profit? (%)", answer: "50", topic: "Finance" },
      { type: "mc", text: "A R 500 phone has a 30% discount. What is the sale price?", options: ["R 150", "R 300", "R 350", "R 450"], answer: 2, topic: "Finance" },
      { type: "input", text: "Calculate VAT (15%) on a R 200 item. What is the VAT-inclusive price? (R)", answer: "230", topic: "Finance" },
      { type: "mc", text: "Simple interest on R 1 500 at 10% p.a. for 2 years is:", options: ["R 150", "R 300", "R 330", "R 3 000"], answer: 1, topic: "Finance" },
      { type: "input", text: "You invest R 4 000 at 6% simple interest per year. How much interest after 5 years? (R)", answer: "1200", topic: "Finance" },
    ]
  },
  {
    id: 109,
    name: "Exam focus",
    fullName: "Examination focus exercise",
    lesson: {
      heading: "Examination focus exercise",
      sub: "Chapter 1 · Review",
      body: `
        <p>This topic brings together everything from Chapter 1. In an examination you need to:</p>
        <div class="def-box">
          <div class="def-box-title">📋 Examination technique</div>
          <p>
            ✅ <strong>Read the question twice</strong> before writing anything.<br>
            ✅ <strong>Show all working</strong> — method marks are awarded.<br>
            ✅ <strong>Include units</strong> in all rate, finance, and measurement answers.<br>
            ✅ <strong>Check your answer</strong> by substituting back or estimating.<br>
            ✅ <strong>Never leave blanks</strong> — an attempt earns more than nothing.
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>The practice questions here are exam-style. Work through them exactly as you would in an exam — step by step, showing all working.</span></div>
        <div class="example-box">
          <div class="example-box-title">📝 Common exam mistakes to avoid</div>
          <div class="example-step"><span class="step-num">✗</span><span>Ignoring BODMAS and working purely left-to-right.</span></div>
          <div class="example-step"><span class="step-num">✗</span><span>Forgetting to simplify ratios or leaving them as equivalent forms.</span></div>
          <div class="example-step"><span class="step-num">✗</span><span>Applying VAT before discount instead of discount first.</span></div>
          <div class="example-step"><span class="step-num">✗</span><span>Using percentage as a decimal incorrectly (8% = 0.08, not 8).</span></div>
        </div>
      `
    },
    questions: [
      { type: "mc", text: "Calculate <span class='math'>5² + (18 ÷ 3) × 4 − 7</span>", options: ["42", "24", "60", "18"], answer: 0, topic: "Mixed" },
      { type: "input", text: "The HCF of two numbers is 6 and their LCM is 72. One number is 24. What is the other number?", answer: "18", topic: "HCF/LCM" },
      { type: "mc", text: "Share R 480 in the ratio 3 : 2 : 1. What is the largest share?", options: ["R 80", "R 240", "R 160", "R 120"], answer: 1, topic: "Ratios" },
      { type: "input", text: "A car uses 8 litres of petrol per 100 km. Petrol costs R 22,50/litre. What does it cost to travel 350 km? (R)", answer: "630", topic: "Rates/Finance" },
      { type: "mc", text: "Invest R 5 000 at 7% simple interest p.a. for 4 years. Total amount at the end?", options: ["R 6 400", "R 6 200", "R 6 500", "R 5 700"], answer: 0, topic: "Finance" },
    ]
  }
  ],
  workbook: {
    chapter: 1, chapterName: "Whole Numbers, Ratios, Rates & Finance",
    topics: [
      {
        name: "Operations & BODMAS",
        questions: [
          {
            num: "1",
            text: "Calculate each of the following, showing all working:",
            parts: [
              { label: "a)", text: "5 + 3 × (8 − 2) ÷ 2", marks: 2 },
              { label: "b)", text: "4² − (3 + 1) × 2 + 10 ÷ 5", marks: 3 },
              { label: "c)", text: "[(12 ÷ 4) + 3²] × (−2)", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Without a calculator, use the distributive property to calculate:",
            parts: [
              { label: "a)", text: "7 × 98", marks: 2 },
              { label: "b)", text: "12 × 105", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Factors, HCF & LCM",
        questions: [
          {
            num: "3",
            text: "Using prime factorisation:",
            parts: [
              { label: "a)", text: "Write 84 and 120 as products of their prime factors.", marks: 3 },
              { label: "b)", text: "Hence determine the HCF of 84 and 120.", marks: 2 },
              { label: "c)", text: "Hence determine the LCM of 84 and 120.", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Ratios, Rates & Finance",
        questions: [
          {
            num: "4",
            text: "Thabo and Sipho invest money in the ratio 3 : 5. The total investment is R 12 000.",
            parts: [
              { label: "a)", text: "How much does each person invest?", marks: 3 },
              { label: "b)", text: "After one year they make a profit of R 2 400. They share the profit in the same ratio. How much does Thabo receive?", marks: 3 },
            ]
          },
          {
            num: "5",
            text: "A car travels 540 km using 45 litres of petrol.",
            parts: [
              { label: "a)", text: "Calculate the fuel consumption in km per litre.", marks: 2 },
              { label: "b)", text: "If petrol costs R 23,40 per litre, calculate the cost of travelling 300 km.", marks: 3 },
            ]
          },
          {
            num: "6",
            text: "A laptop costs R 8 500 excluding VAT.",
            parts: [
              { label: "a)", text: "Calculate the VAT (15%) on the laptop.", marks: 2 },
              { label: "b)", text: "The store offers a 12% discount on the VAT-inclusive price. What is the final selling price?", marks: 4 },
              { label: "c)", text: "Calculate the simple interest on R 8 500 at 9% p.a. over 3 years.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 1, chapterName: "Chapter 1 — Whole Numbers, Ratios, Rates & Finance",
    topics: [
      {
        name: "Operations & BODMAS",
        answers: [
          { num: "Q1a", ans: "5 + 3 × 3 = 5 + 9 = 14", note: "Brackets first: 8−2=6, ÷2=3, then ×3=9" },
          { num: "Q1b", ans: "4² − 4×2 + 10÷5 = 16 − 8 + 2 = 10", note: "Orders, then mult/div, then add/sub" },
          { num: "Q1c", ans: "[3 + 9] × (−2) = 12 × (−2) = −24", note: "Inner bracket: 12÷4=3, then +3²=+9" },
          { num: "Q2a", ans: "7 × (100 − 2) = 700 − 14 = 686", note: "Compensation: round to 100, subtract extra" },
          { num: "Q2b", ans: "12 × (100 + 5) = 1 200 + 60 = 1 260", note: "Distributive property" },
        ]
      },
      {
        name: "Factors, HCF & LCM",
        answers: [
          { num: "Q3a", ans: "84 = 2² × 3 × 7 ; 120 = 2³ × 3 × 5", note: "Prime factorisation tree" },
          { num: "Q3b", ans: "HCF = 2² × 3 = 12", note: "Lowest power of each shared prime" },
          { num: "Q3c", ans: "LCM = 2³ × 3 × 5 × 7 = 840", note: "Highest power of each prime" },
        ]
      },
      {
        name: "Ratios, Rates & Finance",
        answers: [
          { num: "Q4a", ans: "Thabo: R 4 500 ; Sipho: R 7 500", note: "1 part = 12000÷8 = 1500; ×3 and ×5" },
          { num: "Q4b", ans: "Thabo: R 900", note: "1 part of profit = 2400÷8 = 300; ×3 = 900" },
          { num: "Q5a", ans: "12 km/litre", note: "540 ÷ 45 = 12 km/L" },
          { num: "Q5b", ans: "R 585", note: "300÷12 = 25 L; 25 × R23,40 = R585" },
          { num: "Q6a", ans: "VAT = R 1 275", note: "8500 × 0,15 = 1275" },
          { num: "Q6b", ans: "R 8 618,20", note: "VAT price = R9775; ×0,88 = R8602 (accept R8601,40)" },
          { num: "Q6c", ans: "I = R 2 295", note: "I = 8500 × 0,09 × 3 = 2295" },
        ]
      },
    ]
  }
});
