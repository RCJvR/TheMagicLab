// Math Magician — Grade 8, Chapter 2 data
// Auto-loaded on demand by math-magician-gr8.html

MathMagician.registerChapter(2, {
  topics: [
{
    id: 201,
    chapter: 2,
    name: "Counting in integers",
    fullName: "Revision of counting in integers",
    lesson: {
      heading: "Counting in integers",
      sub: "Chapter 2 · Topic 1",
      body: `
        <p><strong>Integers</strong> include all whole numbers, zero, and their negatives: <span class="math">… −3, −2, −1, 0, 1, 2, 3 …</span></p>
        <div class="def-box">
          <div class="def-box-title">📖 The integer number line</div>
          <p>
            Integers extend infinitely in both directions on the number line.<br><br>
            <strong>Positive integers:</strong> to the right of zero (1, 2, 3, …)<br>
            <strong>Negative integers:</strong> to the left of zero (−1, −2, −3, …)<br>
            <strong>Zero (0):</strong> neither positive nor negative<br><br>
            Moving <em>right</em> on the number line = counting up (increasing).<br>
            Moving <em>left</em> = counting down (decreasing).
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Counting sequences</div>
          <div class="example-step"><span class="step-num">1</span><span>Count up in 3s from −9: <span class="math">−9, −6, −3, 0, 3, 6, 9</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Count down in 4s from 8: <span class="math">8, 4, 0, −4, −8, −12</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Think of the number line as a thermometer. Numbers below zero are like temperatures below freezing.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Which integer comes next in the sequence: <span class='math'>−10, −7, −4, −1, …</span>?", options: ["2", "−2", "3", "0"], answer: 0, topic: "Integers" },
      { type: "input", text: "Count back in 5s from 10. What is the 5th term?", answer: "-10", topic: "Integers" },
      { type: "mc", text: "Which set contains only integers?", options: ["−3, 0, 1.5, 4", "−5, −2, 0, 7", "0, ½, 1, 2", "1, 2, 3, 3.3"], answer: 1, topic: "Integers" },
      { type: "input", text: "What integer is 6 steps to the left of 2 on the number line?", answer: "-4", topic: "Integers" },
    ]
  },
  {
    id: 202,
    chapter: 2,
    name: "Ordering integers",
    fullName: "Revision of ordering and comparing integers",
    lesson: {
      heading: "Ordering and comparing integers",
      sub: "Chapter 2 · Topic 2",
      body: `
        <p>We <strong>compare</strong> integers using the symbols <span class="math">&gt;</span> (greater than), <span class="math">&lt;</span> (less than), and <span class="math">=</span>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Rules for comparing</div>
          <p>
            On the number line, the number further <strong>right is always greater</strong>.<br><br>
            Any positive integer > 0 > any negative integer.<br>
            <span class="math">−1 > −100</span> (−1 is closer to zero, so it is greater)<br><br>
            <strong>Ascending order:</strong> smallest to largest (left → right on number line)<br>
            <strong>Descending order:</strong> largest to smallest (right → left)
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example</div>
          <div class="example-step"><span class="step-num">1</span><span>Arrange in ascending order: <span class="math">−5, 3, −1, 0, −8, 2</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Place on number line: −8 is furthest left, then −5, −1, 0, 2, 3</span></div>
          <div class="example-step"><span class="step-num">3</span><span>Answer: <span class="math">−8, −5, −1, 0, 2, 3</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Students often think −8 > −1 because 8 > 1. Remember: the more negative a number, the smaller it is.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Integer Number Line</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter up to 6 integers to place and order them on a number line.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="nlInput" type="text" value="-8, 3, -2, 7, 0, -5" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="nlPlot" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Plot</button>
            </div>
            <svg id="nlSvg" viewBox="0 0 460 60" style="width:100%;max-width:460px;"></svg>
            <div id="nlOrder" style="font-family:JetBrains Mono,monospace;font-size:12px;margin-top:8px;color:rgba(221,225,240,0.60);"></div>
          </div>
          <script>
          (function(){
            function plot(){
              const nums=document.getElementById('nlInput').value.split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n)).slice(0,8);
              if(!nums.length)return;
              const min=Math.min(...nums,-1),max=Math.max(...nums,1);
              const pad=(max-min)*0.15||2;
              const lo=Math.floor(min-pad),hi=Math.ceil(max+pad);
              const svg=document.getElementById('nlSvg');
              const W=460,cy=38,ax=30,bx=430;
              function px(v){return ax+(v-lo)/(hi-lo)*(bx-ax);}
              let h='<line x1="'+ax+'" y1="'+cy+'" x2="'+bx+'" y2="'+cy+'" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>';
              h+='<polygon points="'+bx+','+cy+' '+(bx-6)+','+(cy-4)+' '+(bx-6)+','+(cy+4)+'" fill="rgba(255,255,255,0.15)"/>';
              for(let v=lo;v<=hi;v++){
                const x=px(v);
                h+='<line x1="'+x+'" y1="'+(cy-4)+'" x2="'+x+'" y2="'+(cy+4)+'" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>';
                if(v%2===0||hi-lo<=12)h+='<text x="'+x+'" y="'+(cy+16)+'" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.25)" font-family="JetBrains Mono,monospace">'+v+'</text>';
              }
              const colors=['#f59e0b','#6366f1','#10b981','#ec4899','#06b6d4','#a78bfa','#f87171','#34d399'];
              nums.forEach((v,i)=>{
                const x=px(v);
                h+='<circle cx="'+x+'" cy="'+cy+'" r="7" fill="'+colors[i%colors.length]+'" opacity="0.9"/>';
                h+='<text x="'+x+'" y="'+(cy-12)+'" text-anchor="middle" font-size="9" fill="'+colors[i%colors.length]+'" font-family="JetBrains Mono,monospace" font-weight="700">'+v+'</text>';
              });
              svg.innerHTML=h;
              const sorted=[...nums].sort((a,b)=>a-b);
              document.getElementById('nlOrder').innerHTML=
                '<span style="color:rgba(221,225,240,0.40);">Ascending: </span>'+sorted.join(' &lt; ')+
                ' <span style="color:rgba(221,225,240,0.25);margin-left:12px;">Descending: </span>'+[...sorted].reverse().join(' &gt; ');
            }
            document.getElementById('nlPlot').addEventListener('click',plot);
            document.getElementById('nlInput').addEventListener('keydown',e=>{if(e.key==='Enter')plot();});
            plot();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Which statement is correct?", options: ["−6 > −2", "−3 > 1", "−1 > −8", "0 < −5"], answer: 2, topic: "Integers" },
      { type: "mc", text: "Arrange in descending order: <span class='math'>−4, 7, −9, 1, 0</span>", options: ["7, 1, 0, −4, −9", "−9, −4, 0, 1, 7", "7, −9, 1, 0, −4", "0, 1, 7, −4, −9"], answer: 0, topic: "Integers" },
      { type: "input", text: "What is the smallest integer in this set: {−3, 5, −10, 2, −1}?", answer: "-10", topic: "Integers" },
      { type: "mc", text: "Which is true?", options: ["−100 > −50", "−50 > −100", "−100 = −50", "Cannot compare"], answer: 1, topic: "Integers" },
    ]
  },
  {
    id: 203,
    chapter: 2,
    name: "Addition of integers",
    fullName: "Addition of integers",
    lesson: {
      heading: "Addition of integers",
      sub: "Chapter 2 · Topic 3",
      body: `
        <p>Adding integers requires careful attention to the <strong>signs</strong> involved.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Rules for addition</div>
          <p>
            <strong>Same signs:</strong> add the absolute values, keep the sign.<br>
            <span class="math">(+4) + (+3) = +7</span><br>
            <span class="math">(−4) + (−3) = −7</span><br><br>
            <strong>Different signs:</strong> subtract the smaller absolute value from the larger, keep the sign of the larger.<br>
            <span class="math">(+7) + (−3) = +4</span> &nbsp; (7 > 3, positive wins)<br>
            <span class="math">(−7) + (+3) = −4</span> &nbsp; (7 > 3, negative wins)
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked examples</div>
          <div class="example-step"><span class="step-num">1</span><span><span class="math">(−8) + (−5)</span> → same signs, add: <span class="math">8 + 5 = 13</span>, keep negative → <span class="math">−13</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span><span class="math">(−6) + (+10)</span> → different signs: <span class="math">10 − 6 = 4</span>, positive wins → <span class="math">+4</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">(+5) + (−5)</span> → opposites cancel → <span class="math">0</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Use a number line to visualise: positive = move right, negative = move left.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Calculate: <span class='math'>(−7) + (−9)</span>", answer: "-16", topic: "Integers" },
      { type: "mc", text: "What is <span class='math'>(−12) + (+8)</span>?", options: ["−20", "20", "−4", "4"], answer: 2, topic: "Integers" },
      { type: "input", text: "Calculate: <span class='math'>(−15) + (+15)</span>", answer: "0", topic: "Integers" },
      { type: "mc", text: "What is <span class='math'>(+6) + (−11) + (+3)</span>?", options: ["−2", "2", "−8", "8"], answer: 0, topic: "Integers" },
      { type: "input", text: "The temperature is −4°C. It rises 9°C. What is the new temperature?", answer: "5", topic: "Integers" },
    ]
  },
  {
    id: 204,
    chapter: 2,
    name: "Subtraction of integers",
    fullName: "Subtraction of integers",
    lesson: {
      heading: "Subtraction of integers",
      sub: "Chapter 2 · Topic 4",
      body: `
        <p>Subtracting an integer is the same as <strong>adding its opposite</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 The key rule</div>
          <p>
            <span class="math">a − b = a + (−b)</span><br><br>
            Change the subtraction to addition, then change the sign of the number being subtracted.<br><br>
            <span class="math">5 − (−3) = 5 + (+3) = 8</span><br>
            <span class="math">−4 − (+6) = −4 + (−6) = −10</span><br>
            <span class="math">−2 − (−5) = −2 + (+5) = 3</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Step-by-step</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate <span class="math">3 − (−8)</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Rewrite: <span class="math">3 + (+8)</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Result: <span class="math">11</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>"Minus a minus is a plus" — subtracting a negative means moving right on the number line, making the result bigger.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Calculate: <span class='math'>6 − (−4)</span>", answer: "10", topic: "Integers" },
      { type: "mc", text: "What is <span class='math'>(−3) − (+8)</span>?", options: ["5", "−5", "−11", "11"], answer: 2, topic: "Integers" },
      { type: "input", text: "Calculate: <span class='math'>(−7) − (−7)</span>", answer: "0", topic: "Integers" },
      { type: "mc", text: "Which expression equals <span class='math'>−5 − (−9)</span>?", options: ["−5 + (−9)", "−5 + 9", "5 − 9", "−14"], answer: 1, topic: "Integers" },
      { type: "input", text: "Calculate: <span class='math'>2 − 15</span>", answer: "-13", topic: "Integers" },
    ]
  },
  {
    id: 205,
    chapter: 2,
    name: "Multiplication of integers",
    fullName: "Multiplication of integers",
    lesson: {
      heading: "Multiplication of integers",
      sub: "Chapter 2 · Topic 5",
      body: `
        <p>Multiplying integers follows simple <strong>sign rules</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Sign rules for multiplication</div>
          <p>
            <strong>Positive × Positive = Positive</strong><br>
            <span class="math">(+4) × (+3) = +12</span><br><br>
            <strong>Negative × Negative = Positive</strong><br>
            <span class="math">(−4) × (−3) = +12</span><br><br>
            <strong>Positive × Negative = Negative</strong><br>
            <span class="math">(+4) × (−3) = −12</span><br><br>
            <strong>Negative × Positive = Negative</strong><br>
            <span class="math">(−4) × (+3) = −12</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Multiple factors</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate <span class="math">(−2) × (−3) × (−4)</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>First pair: <span class="math">(−2) × (−3) = +6</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Then: <span class="math">(+6) × (−4) = −24</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span><strong>Rule:</strong> odd number of negatives → negative result; even → positive.</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Count the number of negative signs. Odd count = negative answer. Even count = positive answer.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Integer Sign Rules Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">See the sign rules in action for × and ÷. Change the values and watch the result.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <input id="srA" type="number" value="-4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              <select id="srOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;">
                <option value="mul">×</option>
                <option value="div">÷</option>
              </select>
              <input id="srB" type="number" value="-3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
            <div id="srOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('srA').value)||0;
              const b=parseFloat(document.getElementById('srB').value)||1;
              const op=document.getElementById('srOp').value;
              const res=op==='mul'?a*b:a/b;
              const signA=a>=0?'positive':'negative';
              const signB=b>=0?'positive':'negative';
              const signR=res>=0?'positive':'negative';
              const rule=signA===signB?'Same signs → Positive result':'Different signs → Negative result';
              const el=document.getElementById('srOut');
              el.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Calculation: </span><span style="color:#fcd34d;">'+a+' '+(op==='mul'?'×':'÷')+' '+b+' = <strong style="font-size:16px;color:'+(res>=0?'#6ee7b7':'#fca5a5')+';">'+res+'</strong></span></div>',
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Sign rule: </span><span style="color:#fbbf24;">'+rule+'</span></div>',
                '<div style="font-size:10px;opacity:0.45;margin-top:2px;">('+signA+') '+(op==='mul'?'×':'÷')+' ('+signB+') = ('+signR+')</div>',
              ].join('');
            }
            ['srA','srB','srOp'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "What is <span class='math'>(−6) × (−7)</span>?", options: ["−42", "42", "−13", "13"], answer: 1, topic: "Integers" },
      { type: "input", text: "Calculate: <span class='math'>(−5) × (+8)</span>", answer: "-40", topic: "Integers" },
      { type: "mc", text: "What is the sign of <span class='math'>(−2) × (−3) × (−1) × (−4)</span>?", options: ["Negative", "Positive", "Zero", "Cannot tell"], answer: 1, topic: "Integers" },
      { type: "input", text: "Calculate: <span class='math'>(−3)²</span>  (hint: −3 × −3)", answer: "9", topic: "Integers" },
      { type: "mc", text: "Which gives a negative result?", options: ["(−4)²", "(−2) × (−6)", "(+3) × (−2)", "(−1) × (−1) × (−1) × (−1)"], answer: 2, topic: "Integers" },
    ]
  },
  {
    id: 206,
    chapter: 2,
    name: "Division of integers",
    fullName: "Division of integers",
    lesson: {
      heading: "Division of integers",
      sub: "Chapter 2 · Topic 6",
      body: `
        <p>Division of integers uses the <strong>same sign rules</strong> as multiplication.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Sign rules for division</div>
          <p>
            <strong>Same signs → Positive result</strong><br>
            <span class="math">(+12) ÷ (+3) = +4</span><br>
            <span class="math">(−12) ÷ (−3) = +4</span><br><br>
            <strong>Different signs → Negative result</strong><br>
            <span class="math">(+12) ÷ (−3) = −4</span><br>
            <span class="math">(−12) ÷ (+3) = −4</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate <span class="math">(−48) ÷ (+6)</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Different signs → negative result</span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">48 ÷ 6 = 8</span>, so answer is <span class="math">−8</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Division and multiplication share the same sign rules. Mastering one means mastering the other.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Calculate: <span class='math'>(−36) ÷ (−9)</span>", answer: "4", topic: "Integers" },
      { type: "mc", text: "What is <span class='math'>(+56) ÷ (−8)</span>?", options: ["7", "−7", "48", "−48"], answer: 1, topic: "Integers" },
      { type: "input", text: "Calculate: <span class='math'>(−72) ÷ (+8)</span>", answer: "-9", topic: "Integers" },
      { type: "mc", text: "Which expression gives a positive answer?", options: ["(−20) ÷ (+5)", "(+30) ÷ (−6)", "(−24) ÷ (−4)", "(−10) ÷ (+2)"], answer: 2, topic: "Integers" },
    ]
  },
  {
    id: 207,
    chapter: 2,
    name: "Commutative, associative & distributive",
    fullName: "The commutative, associative, and distributive properties",
    lesson: {
      heading: "Properties applied to integers",
      sub: "Chapter 2 · Topic 7",
      body: `
        <p>The three major properties of whole numbers also apply to integers, but watch out for subtraction and division — they are <strong>not commutative</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Properties with integers</div>
          <p>
            <strong>Commutative (+ and × only):</strong><br>
            <span class="math">(−3) + (−5) = (−5) + (−3) = −8</span> ✓<br>
            <span class="math">3 − 5 ≠ 5 − 3</span> ✗ (subtraction is not commutative)<br><br>
            <strong>Associative (+ and × only):</strong><br>
            <span class="math">[(−2) + (−3)] + (−4) = (−2) + [(−3) + (−4)]</span><br><br>
            <strong>Distributive:</strong><br>
            <span class="math">(−3) × (4 + (−2)) = (−3)×4 + (−3)×(−2)</span><br>
            <span class="math">= −12 + 6 = −6</span>
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Subtraction and division are not commutative or associative. Only use these properties for addition and multiplication.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Which shows the distributive property correctly?", options: ["(−2)(3+5) = (−2)(3) + (−2)(5)", "(−2)(3+5) = (−2+3)(−2+5)", "(−2)+(3×5) = (−2+3)×(−2+5)", "None of these"], answer: 0, topic: "Properties" },
      { type: "mc", text: "Is subtraction commutative? E.g. does <span class='math'>(−5) − 3 = 3 − (−5)</span>?", options: ["Yes, always", "No — they give different results", "Only for negative numbers", "Only when one number is zero"], answer: 1, topic: "Properties" },
      { type: "input", text: "Use the distributive property: <span class='math'>(−4) × (6 + (−2))</span>", answer: "-16", topic: "Properties" },
      { type: "mc", text: "<span class='math'>[(−2) × (−3)] × (−5)</span> equals <span class='math'>(−2) × [(−3) × (−5)]</span>. Which property is this?", options: ["Commutative", "Distributive", "Associative", "Identity"], answer: 2, topic: "Properties" },
    ]
  },
  {
    id: 208,
    chapter: 2,
    name: "Squares, cubes & roots",
    fullName: "Squares, cubes, square roots, and cube roots",
    lesson: {
      heading: "Squares, cubes, and roots of integers",
      sub: "Chapter 2 · Topic 8",
      body: `
        <p>These operations appear throughout algebra, geometry, and finance.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Definitions</div>
          <p>
            <strong>Square:</strong> <span class="math">a² = a × a</span> &nbsp; e.g. <span class="math">(−4)² = 16</span><br>
            <strong>Cube:</strong> <span class="math">a³ = a × a × a</span> &nbsp; e.g. <span class="math">(−2)³ = −8</span><br><br>
            <strong>Square root (√):</strong> the positive number that squares to give a. Only defined for positive numbers.<br>
            <span class="math">√49 = 7</span><br><br>
            <strong>Cube root (∛):</strong> the number that cubes to give a. Defined for all integers.<br>
            <span class="math">∛(−27) = −3</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Key insight</div>
          <div class="example-step"><span class="step-num">1</span><span>Any integer squared is <strong>always positive</strong> (or zero): <span class="math">(−5)² = 25</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>A negative number cubed is <strong>always negative</strong>: <span class="math">(−3)³ = −27</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>√ of a negative number is <strong>not real</strong> — you cannot square root a negative.</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Watch the difference between <span class="math">−4²</span> and <span class="math">(−4)²</span>. The first is <span class="math">−16</span>; the second is <span class="math">+16</span>.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Squares, Cubes & Roots Calculator</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <input id="scInput" type="number" value="9" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:18px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
            <div id="scOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const n=parseFloat(document.getElementById('scInput').value);
              if(isNaN(n)){document.getElementById('scOut').innerHTML='';return;}
              const sq=n*n, cu=n*n*n;
              const sqrtVal=Math.sqrt(Math.abs(n));
              const cbrtVal=Math.cbrt(n);
              const isSqrt=Number.isInteger(sqrtVal)&&n>=0;
              const isCbrt=Number.isInteger(cbrtVal);
              document.getElementById('scOut').innerHTML=[
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Square ('+n+'²):</span><span style="color:#fcd34d;">'+sq+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Cube ('+n+'³):</span><span style="color:#fcd34d;">'+cu+'</span></div>',
                n>=0?'<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">√'+n+':</span><span style="color:'+(isSqrt?'#6ee7b7':'rgba(221,225,240,0.60)')+'">'+sqrtVal.toFixed(4)+(isSqrt?' ✓ perfect square':'')+'</span></div>':'',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">∛'+n+':</span><span style="color:'+(isCbrt?'#6ee7b7':'rgba(221,225,240,0.60)')+'">'+cbrtVal.toFixed(4)+(isCbrt?' ✓ perfect cube':'')+'</span></div>',
              ].filter(Boolean).join('');
            }
            document.getElementById('scInput').addEventListener('input',update);
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "Calculate: <span class='math'>(−3)²</span>", answer: "9", topic: "Powers & roots" },
      { type: "mc", text: "What is <span class='math'>∛(−64)</span>?", options: ["8", "−8", "4", "−4"], answer: 3, topic: "Powers & roots" },
      { type: "input", text: "Calculate: <span class='math'>(−2)³</span>", answer: "-8", topic: "Powers & roots" },
      { type: "mc", text: "Which is undefined (not a real number)?", options: ["√64", "∛(−8)", "√(−9)", "(−3)²"], answer: 2, topic: "Powers & roots" },
      { type: "input", text: "Calculate: <span class='math'>√144</span>", answer: "12", topic: "Powers & roots" },
    ]
  },
  {
    id: 209,
    chapter: 2,
    name: "Mixed operations with integers",
    fullName: "Calculations involving mixed operations with integers",
    lesson: {
      heading: "Mixed operations with integers",
      sub: "Chapter 2 · Topic 9",
      body: `
        <p>When multiple operations appear together, use <strong>BODMAS</strong> with the integer sign rules.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Combined approach</div>
          <p>
            Apply BODMAS: Brackets → Orders → Division/Multiplication → Addition/Subtraction<br><br>
            At each step, apply the correct integer sign rule.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example</div>
          <div class="example-step"><span class="step-num">1</span><span>Calculate: <span class="math">(−3)² − (−4) × 2 + (−10) ÷ 5</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Orders: <span class="math">(−3)² = 9</span> → <span class="math">9 − (−4) × 2 + (−10) ÷ 5</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Mult/Div: <span class="math">(−4)×2 = −8</span>, <span class="math">(−10)÷5 = −2</span> → <span class="math">9 − (−8) + (−2)</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Subtraction: <span class="math">9 + 8 = 17</span></span></div>
          <div class="example-step"><span class="step-num">5</span><span>Addition: <span class="math">17 + (−2) = 15</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Write out every step. Mixed-operations questions are where most marks are lost — and most are won — in exams.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — BODMAS Step Evaluator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Type an expression — each BODMAS step is shown in order. Try the examples or enter your own.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;">
              <input id="bodInput" type="text" value="3 + 2 * (8 - 5) ** 2" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="bodCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Evaluate</button>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
              <button class="bod-eg" data-v="3 + 2 * (8 - 5) ** 2" style="padding:3px 9px;border-radius:5px;border:1px solid rgba(99,102,241,0.30);background:rgba(99,102,241,0.08);color:rgba(165,180,252,0.70);font-size:10px;font-family:JetBrains Mono,monospace;cursor:pointer;">3 + 2 * (8 - 5) ** 2</button>
              <button class="bod-eg" data-v="(4 + 6) / 2 - 1" style="padding:3px 9px;border-radius:5px;border:1px solid rgba(99,102,241,0.30);background:rgba(99,102,241,0.08);color:rgba(165,180,252,0.70);font-size:10px;font-family:JetBrains Mono,monospace;cursor:pointer;">(4 + 6) / 2 - 1</button>
              <button class="bod-eg" data-v="2 ** 3 + 4 * 5 - 6 / 2" style="padding:3px 9px;border-radius:5px;border:1px solid rgba(99,102,241,0.30);background:rgba(99,102,241,0.08);color:rgba(165,180,252,0.70);font-size:10px;font-family:JetBrains Mono,monospace;cursor:pointer;">2**3 + 4*5 - 6/2</button>
              <button class="bod-eg" data-v="100 / (2 + 3) ** 2" style="padding:3px 9px;border-radius:5px;border:1px solid rgba(99,102,241,0.30);background:rgba(99,102,241,0.08);color:rgba(165,180,252,0.70);font-size:10px;font-family:JetBrains Mono,monospace;cursor:pointer;">100 / (2 + 3) ** 2</button>
            </div>
            <div id="bodOut" style="font-size:12.5px;line-height:1.9;"></div>
          </div>
          <script>
          (function(){
            function fmt(n){ return Number.isInteger(n)?String(n):parseFloat(n.toPrecision(6)).toString(); }

            // ── Tokeniser ──────────────────────────────────────────────────
            function tokenise(str){
              const tok=[];
              let i=0;
              while(i<str.length){
                if(/\s/.test(str[i])){i++;continue;}
                if(/[0-9.]/.test(str[i])){
                  let n='';
                  while(i<str.length&&/[0-9.]/.test(str[i]))n+=str[i++];
                  tok.push({t:'NUM',v:parseFloat(n)});continue;
                }
                if(str[i]==='*'&&str[i+1]==='*'){tok.push({t:'POW'});i+=2;continue;}
                if(str[i]==='*'){tok.push({t:'MUL'});i++;continue;}
                if(str[i]==='/'){tok.push({t:'DIV'});i++;continue;}
                if(str[i]==='+'){tok.push({t:'ADD'});i++;continue;}
                if(str[i]==='-'){tok.push({t:'SUB'});i++;continue;}
                if(str[i]==='('){tok.push({t:'LP'});i++;continue;}
                if(str[i]===')'){tok.push({t:'RP'});i++;continue;}
                if(str[i]==='^'){tok.push({t:'POW'});i++;continue;}
                throw new Error('Unknown character: "'+str[i]+'"');
              }
              return tok;
            }

            // ── Parser (recursive descent) ─────────────────────────────────
            function parse(tokens){
              let p=0;
              const peek=()=>tokens[p];
              const eat=()=>tokens[p++];
              const expect=t=>{const k=eat();if(!k||k.t!==t)throw new Error('Expected '+t);return k;};

              function expr(){return addSub();}
              function addSub(){
                let l=mulDiv();
                while(peek()&&(peek().t==='ADD'||peek().t==='SUB')){
                  const op=eat().t;l={t:'bin',op,l,r:mulDiv()};
                }return l;
              }
              function mulDiv(){
                let l=pow();
                while(peek()&&(peek().t==='MUL'||peek().t==='DIV')){
                  const op=eat().t;l={t:'bin',op,l,r:pow()};
                }return l;
              }
              function pow(){
                let b=unary();
                if(peek()&&peek().t==='POW'){eat();return{t:'bin',op:'POW',l:b,r:pow()};}
                return b;
              }
              function unary(){
                if(peek()&&peek().t==='SUB'){eat();return{t:'neg',a:unary()};}
                return atom();
              }
              function atom(){
                const k=peek();
                if(!k)throw new Error('Unexpected end of expression');
                if(k.t==='NUM'){eat();return{t:'num',v:k.v};}
                if(k.t==='LP'){
                  eat();const inner=expr();expect('RP');return{t:'par',inner};
                }
                throw new Error('Unexpected token: '+k.t);
              }
              const ast=expr();
              if(p<tokens.length)throw new Error('Unexpected text after expression');
              return ast;
            }

            // ── Pretty-printer ─────────────────────────────────────────────
            function pretty(n){
              if(n.t==='num') return n.v<0?'('+n.v+')':String(n.v);
              if(n.t==='neg') return '-'+pretty(n.a);
              if(n.t==='par') return '('+pretty(n.inner)+')';
              if(n.t==='bin'){
                const sym={ADD:'+',SUB:'−',MUL:'×',DIV:'÷',POW:'**'};
                return pretty(n.l)+' '+sym[n.op]+' '+pretty(n.r);
              }
            }

            // ── Evaluator (collects steps) ─────────────────────────────────
            function ev(node,steps){
              if(node.t==='num')  return node.v;
              if(node.t==='neg')  return -ev(node.a,steps);
              if(node.t==='par'){
                const before=pretty(node.inner);
                const val=ev(node.inner,steps);
                if(before!==String(val))
                  steps.push({lbl:'B',desc:'Brackets: ( '+before+' )  =  '+fmt(val),col:'#f59e0b'});
                return val;
              }
              if(node.t==='bin'){
                const l=ev(node.l,steps);
                const r=ev(node.r,steps);
                let res,lbl,desc,col;
                if(node.op==='POW'){res=Math.pow(l,r);lbl='O';col='#a78bfa';
                  desc='Orders (power): '+fmt(l)+' ** '+fmt(r)+'  =  '+fmt(res);}
                else if(node.op==='MUL'){res=l*r;lbl='M';col='#06b6d4';
                  desc='Multiplication: '+fmt(l)+' × '+fmt(r)+'  =  '+fmt(res);}
                else if(node.op==='DIV'){
                  if(r===0)throw new Error('Division by zero');
                  res=l/r;lbl='D';col='#06b6d4';
                  desc='Division: '+fmt(l)+' ÷ '+fmt(r)+'  =  '+fmt(res);}
                else if(node.op==='ADD'){res=l+r;lbl='A';col='#6ee7b7';
                  desc='Addition: '+fmt(l)+' + '+fmt(r)+'  =  '+fmt(res);}
                else if(node.op==='SUB'){res=l-r;lbl='S';col='#6ee7b7';
                  desc='Subtraction: '+fmt(l)+' − '+fmt(r)+'  =  '+fmt(res);}
                steps.push({lbl,desc,col});
                return res;
              }
            }

            // ── Main evaluate function ──────────────────────────────────────
            function evaluate(){
              const raw=document.getElementById('bodInput').value.trim();
              const el=document.getElementById('bodOut');
              if(!raw){el.innerHTML='';return;}
              // Normalise friendly symbols to JS operators
              const expr=raw.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/\^/g,'**');
              try{
                const steps=[];
                const result=ev(parse(tokenise(expr)),steps);
                let html='<div style="color:rgba(221,225,240,0.38);font-size:11px;margin-bottom:10px;">'+
                  'Expression: <span style="color:#fcd34d;">'+raw+'</span></div>';
                if(steps.length===0){
                  html+='<div style="color:rgba(221,225,240,0.50);">Single value — nothing to simplify.</div>';
                } else {
                  steps.forEach(s=>{
                    html+='<div style="display:flex;gap:10px;align-items:baseline;margin-bottom:3px;">'
                      +'<span style="font-family:Syne,sans-serif;font-weight:800;font-size:11px;color:'+s.col
                      +';width:14px;flex-shrink:0;text-align:center;">'+s.lbl+'</span>'
                      +'<span style="color:rgba(221,225,240,0.78);font-family:JetBrains Mono,monospace;font-size:12px;">'+s.desc+'</span>'
                      +'</div>';
                  });
                }
                html+='<div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);">'
                  +'<span style="color:rgba(221,225,240,0.45);">Answer: </span>'
                  +'<span style="color:#6ee7b7;font-size:17px;font-weight:700;font-family:JetBrains Mono,monospace;">'+fmt(result)+'</span>'
                  +'</div>';
                el.innerHTML=html;
              }catch(e){
                el.innerHTML='<span style="color:#fca5a5;">⚠ '+e.message+'. Use: numbers, + − * / ** ( )</span>';
              }
            }

            document.getElementById('bodCalc').addEventListener('click',evaluate);
            document.getElementById('bodInput').addEventListener('keydown',e=>{if(e.key==='Enter')evaluate();});
            // Use event delegation on the parent so it works after innerHTML injection
            document.getElementById('bodInput').closest('.def-box').addEventListener('click',function(e){
              const btn=e.target.closest('.bod-eg');
              if(btn){ document.getElementById('bodInput').value=btn.dataset.v; evaluate(); }
            });
            evaluate();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "Calculate: <span class='math'>(−2)³ + (−3) × (−4)</span>", answer: "4", topic: "Mixed ops" },
      { type: "mc", text: "What is <span class='math'>−5² + (−3)²</span>?", options: ["−16", "4", "−34", "34"], answer: 1, topic: "Mixed ops" },
      { type: "input", text: "Calculate: <span class='math'>[(−6) ÷ 2] × (−3) − (−1)</span>", answer: "10", topic: "Mixed ops" },
      { type: "mc", text: "Calculate <span class='math'>(−2) × 3 − (−4) × (−2)</span>", options: ["−14", "−2", "2", "14"], answer: 0, topic: "Mixed ops" },
    ]
  },
  {
    id: 210,
    chapter: 2,
    name: "Ch 2 Exam focus",
    fullName: "Examination focus exercise",
    lesson: {
      heading: "Chapter 2 — Examination focus",
      sub: "Chapter 2 · Review",
      body: `
        <p>These questions are exam-style, mixing all Chapter 2 topics. Work carefully, show all steps.</p>
        <div class="def-box">
          <div class="def-box-title">📋 Chapter 2 summary</div>
          <p>
            ✅ Integers extend from −∞ to +∞<br>
            ✅ Larger = further right on number line<br>
            ✅ Add: same signs → add, keep; diff signs → subtract, keep larger sign<br>
            ✅ Subtract: change to adding the opposite<br>
            ✅ Multiply/divide: same signs → +, different signs → −<br>
            ✅ Square of any integer is positive; cube keeps the sign<br>
            ✅ Use BODMAS with integer sign rules
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Integer errors are almost always sign errors. Write the sign explicitly in every step.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Calculate: <span class='math'>(−3) × (−4) − (−2)³ ÷ (−4)</span>", answer: "10", topic: "Mixed" },
      { type: "mc", text: "Arrange in ascending order: <span class='math'>−7, 2, −1, 0, −4</span>", options: ["−7, −4, −1, 0, 2", "2, 0, −1, −4, −7", "−1, −4, −7, 0, 2", "0, −1, −4, −7, 2"], answer: 0, topic: "Ordering" },
      { type: "input", text: "Calculate: <span class='math'>√36 − (−2)² × 3 + (−18) ÷ (−3)</span>", answer: "0", topic: "Mixed" },
      { type: "mc", text: "The temperature dropped from 3°C to −8°C. By how many degrees did it drop?", options: ["5°C", "11°C", "−11°C", "−5°C"], answer: 1, topic: "Mixed" },
      { type: "input", text: "Calculate: <span class='math'>(−1)¹⁰⁰</span>  (hint: even power of −1)", answer: "1", topic: "Powers" },
    ]
  }
  ],
  workbook: {
    chapter: 2, chapterName: "Integers",
    topics: [
      {
        name: "Operations with integers",
        questions: [
          {
            num: "1",
            text: "Calculate, showing all working:",
            parts: [
              { label: "a)", text: "(−8) + (−5) − (−12)", marks: 2 },
              { label: "b)", text: "(−4) × (−3) + (−2) × 5", marks: 3 },
              { label: "c)", text: "(−36) ÷ (−9) − (−2)³", marks: 3 },
              { label: "d)", text: "(−3)² − [(−2) × (−4) + (−10) ÷ 5]", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Powers & roots of integers",
        questions: [
          {
            num: "2",
            text: "Evaluate without a calculator:",
            parts: [
              { label: "a)", text: "(−5)³", marks: 1 },
              { label: "b)", text: "(−2)⁴ + (−3)²", marks: 2 },
              { label: "c)", text: "∛(−125)", marks: 2 },
              { label: "d)", text: "√144 − (−1)¹⁰¹", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Mixed exam-style",
        questions: [
          {
            num: "3",
            text: "The temperature in Johannesburg was −3°C at midnight. By noon it had risen by 17°C, then dropped 8°C by 6 pm.",
            parts: [
              { label: "a)", text: "What was the temperature at noon?", marks: 2 },
              { label: "b)", text: "What was the temperature at 6 pm?", marks: 2 },
              { label: "c)", text: "What was the total change from midnight to 6 pm?", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 2, chapterName: "Chapter 2 — Integers",
    topics: [
      {
        name: "Operations with integers",
        answers: [
          { num: "Q1a", ans: "−1", note: "(−8)+(−5) = −13; −13−(−12) = −13+12 = −1" },
          { num: "Q1b", ans: "2", note: "12 + (−10) = 2" },
          { num: "Q1c", ans: "12", note: "(−36)÷(−9) = 4; (−2)³=−8; 4−(−8)=12" },
          { num: "Q1d", ans: "3", note: "9 − [8 + (−2)] = 9 − 6 = 3" },
        ]
      },
      {
        name: "Powers & roots of integers",
        answers: [
          { num: "Q2a", ans: "−125", note: "Odd power of negative = negative" },
          { num: "Q2b", ans: "25", note: "16 + 9 = 25" },
          { num: "Q2c", ans: "−5", note: "Cube root of negative = negative" },
          { num: "Q2d", ans: "13", note: "√144 = 12; (−1)¹⁰¹ = −1; 12−(−1) = 13" },
        ]
      },
      {
        name: "Mixed exam-style",
        answers: [
          { num: "Q3a", ans: "14°C", note: "−3 + 17 = 14" },
          { num: "Q3b", ans: "6°C", note: "14 − 8 = 6" },
          { num: "Q3c", ans: "9°C rise", note: "6 − (−3) = 9°C increase" },
        ]
      },
    ]
  }
});
