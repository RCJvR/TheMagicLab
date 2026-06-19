// Math Magician � Grade 9, Chapter 2 data
// Integers

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 3,
      chapter: 2,
      name: "Operations with integers",
      fullName: "Operations with integers",
      lesson: {
        heading: "Operations with integers",
        sub: "Chapter 2 � Topic 1",
        body: `
          <p><strong>Integers</strong> include all whole numbers and their negatives. The four operations all apply, with sign rules governing results.</p>
          <div class="def-box">
            <div class="def-box-title">?? Sign rules for multiplication and division</div>
            <p>
              <strong>+ � + = +</strong> &nbsp;&nbsp; e.g. 3 � 4 = 12<br>
              <strong>- � - = +</strong> &nbsp;&nbsp; e.g. (-3)(-4) = 12<br>
              <strong>+ � - = -</strong> &nbsp;&nbsp; e.g. 3 � (-4) = -12<br>
              <strong>- � + = -</strong> &nbsp;&nbsp; e.g. (-3) � 4 = -12<br><br>
              Same rules apply for division.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>(-8) + 3 = -5 (move 3 right on number line from -8)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(-4) - (-7) = -4 + 7 = 3 (subtracting a negative = adding)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>(-6) � (-5) = 30</span></div>
            <div class="example-step"><span class="step-num">4</span><span>(-36) � 4 = -9</span></div>
            <div class="example-step"><span class="step-num">5</span><span>-3� = -9 (square first, then negate) vs (-3)� = 9</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>Note: -3� ? (-3)�. The exponent applies only to 3 in the first case. This is a very common exam trap!</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Integer Number Line &amp; Operations Drill</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter two integers and an operation. See the result on the number line and check the sign rule.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">First integer</label>
                <input id="intA" type="number" value="-6" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Operation</label>
                <select id="intOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="*">�</option>
                  <option value="/">�</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Second integer</label>
                <input id="intB" type="number" value="-4" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <button id="intCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <svg id="intNL" viewBox="0 0 320 54" style="width:100%;max-width:320px;border-radius:8px;background:rgba(10,15,30,0.50);margin-bottom:10px;"></svg>
            <div id="intOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function draw(a,result){
              var svg=document.getElementById('intNL');
              var lo=Math.min(a,result,-1)-2,hi=Math.max(a,result,1)+2;
              var range=hi-lo||1;
              var W=320,H=54,pad=20;
              var sx=function(v){return pad+(v-lo)/(range)*(W-2*pad);};
              var ticks='';
              for(var v=Math.ceil(lo);v<=Math.floor(hi);v++){
                var x=sx(v);
                ticks+='<line x1="'+x+'" y1="27" x2="'+x+'" y2="34" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>';
                if(v%2===0||range<=8) ticks+='<text x="'+x+'" y="47" text-anchor="middle" font-size="7" fill="rgba(255,255,255,0.35)" font-family="JetBrains Mono,monospace">'+v+'</text>';
              }
              var ax=sx(a),rx=sx(result);
              var arr='<line x1="'+pad+'" y1="30" x2="'+(W-pad)+'" y2="30" stroke="rgba(255,255,255,0.20)" stroke-width="1.5"/>';
              arr+='<circle cx="'+ax+'" cy="30" r="5" fill="#fbbf24"/>';
              arr+='<text x="'+ax+'" y="19" text-anchor="middle" font-size="8" fill="#fbbf24" font-family="JetBrains Mono,monospace">a='+a+'</text>';
              arr+='<circle cx="'+rx+'" cy="30" r="5" fill="#6ee7b7"/>';
              arr+='<text x="'+rx+'" y="11" text-anchor="middle" font-size="8" fill="#6ee7b7" font-family="JetBrains Mono,monospace">= '+result+'</text>';
              svg.innerHTML=ticks+arr;
            }
            function calc(){
              var a=parseFloat(document.getElementById('intA').value)||0;
              var b=parseFloat(document.getElementById('intB').value)||0;
              var op=document.getElementById('intOp').value;
              var result,expr,rule='';
              if(op==='+'){result=a+b;expr=a+' + ('+b+') = '+result;}
              else if(op==='-'){result=a-b;expr=a+' - ('+b+') = '+a+' + ('+(- b)+') = '+result;rule='Subtracting a negative = adding its positive';}
              else if(op==='*'){result=a*b;expr='('+a+') � ('+b+') = '+result;
                var sa=a>=0?'+':'-',sb=b>=0?'+':'-',sr=result>=0?'+':'-';
                rule=sa+' � '+sb+' = '+sr+(result>=0?' (same signs ? positive)':' (different signs ? negative)');}
              else{if(b===0){document.getElementById('intOut').innerHTML='<span style="color:#fca5a5;">Division by zero is undefined.</span>';return;}
                result=a/b;expr='('+a+') � ('+b+') = '+result;
                var sa=a>=0?'+':'-',sb=b>=0?'+':'-',sr=result>=0?'+':'-';
                rule=sa+' � '+sb+' = '+sr+(result>=0?' (same signs ? positive)':' (different signs ? negative)');}
              draw(a,result);
              document.getElementById('intOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Expression: </span><span style="color:#fbbf24;">'+expr+'</span></div>',
                rule?'<div style="font-size:10px;color:rgba(221,225,240,0.40);margin-top:2px;">'+rule+'</div>':'',
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Result: </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+result+'</span></div>',
              ].filter(Boolean).join('');
            }
            document.getElementById('intCalc').addEventListener('click',calc);
            ['intA','intB'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});
            document.getElementById('intOp').addEventListener('change',calc);

          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Calculate: (-7) - (-12)", answer: "5", topic: "Integers" },
        { type: "mc", text: "What is (-5) � (-4) � (-2)?", options: ["-40", "40", "-20", "20"], answer: 0, topic: "Integers" },
        { type: "input", text: "Calculate: (-48) � (-6)", answer: "8", topic: "Integers" },
        { type: "mc", text: "Which is greater: -3� or (-3)�?", options: ["-3�", "(-3)�", "They are equal", "Cannot compare"], answer: 1, topic: "Integers" },
        { type: "input", text: "Calculate: -2 + (-5) � 3 - (-4)", answer: "-13", topic: "Integers" },
      ]
    },
    {
      id: 4,
      chapter: 2,
      name: "Properties of integers",
      fullName: "Properties of integers and square/cube roots",
      lesson: {
        heading: "Properties and roots of integers",
        sub: "Chapter 2 � Topic 2",
        body: `
          <p>Integers obey the same properties as whole numbers. We also extend square and cube roots to perfect squares and cubes.</p>
          <div class="def-box">
            <div class="def-box-title">?? Roots and squares</div>
            <p>
              <strong>Perfect square:</strong> integer that is the square of another integer. e.g. 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.<br>
              <strong>Perfect cube:</strong> integer that is the cube of another integer. e.g. 1, 8, 27, 64, 125, 216.<br>
              <span class="math">v(-n)</span> is not real for any positive n.<br>
              <span class="math">?(-8) = -2</span> (cube roots of negatives are real and negative).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>v144 = 12 (since 12� = 144)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>?(-27) = -3 (since (-3)� = -27)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>v(-16) = undefined (not real)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>-v25 = -5 (take root then negate)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>v always gives a non-negative answer (the principal root). So v25 = 5, not �5.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Squares, Cubes &amp; Roots Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter any integer (positive or negative). Explore its square, cube, square root, and cube root � with real/not-real classification.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Integer n</label>
                <input id="rootN" type="number" value="-8" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:20px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <button id="rootBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;margin-top:18px;">Explore</button>
            </div>
            <div id="rootOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function f(v){return Number.isInteger(v)?String(v):v.toFixed(4);}
            function explore(){
              var n=parseFloat(document.getElementById('rootN').value);
              if(isNaN(n)){document.getElementById('rootOut').innerHTML='<span style="color:#fca5a5;">Enter a valid integer.</span>';return;}
              var sq=n*n, cu=n*n*n;
              var sqrtReal=n>=0, sqrtVal=sqrtReal?Math.sqrt(n):NaN;
              var cbrtVal=n>=0?Math.cbrt(n):-Math.cbrt(-n);
              var sqrtPerfect=sqrtReal&&Number.isInteger(Math.round(sqrtVal*1e6)/1e6)&&Math.abs(sqrtVal-Math.round(sqrtVal))<1e-9;
              var cbrtPerfect=Number.isInteger(Math.round(cbrtVal*1e6)/1e6)&&Math.abs(cbrtVal-Math.round(cbrtVal))<1e-9;
              var rows=[
                {label:'n\xb2 (square)',val:'<span style="color:#6ee7b7;font-weight:700;">'+sq+'</span>',note:'= ('+n+') \xd7 ('+n+')'},
                {label:'n\xb3 (cube)',val:'<span style="color:#6ee7b7;font-weight:700;">'+cu+'</span>',note:'= ('+n+') \xd7 ('+n+') \xd7 ('+n+')'},
                {label:'\u221an (square root)',val:sqrtReal?'<span style="color:#'+(sqrtPerfect?'6ee7b7':'fbbf24')+';font-weight:700;">'+(sqrtPerfect?Math.round(sqrtVal):'\u2248 '+f(sqrtVal))+'</span>'+'<span style="font-size:10px;color:rgba(221,225,240,0.40);margin-left:6px;">'+(sqrtPerfect?'(perfect square)':'(irrational)')+'</span>':'<span style="color:#fca5a5;">Not real</span><span style="font-size:10px;color:rgba(221,225,240,0.40);margin-left:6px;">(n &lt; 0)</span>',note:''},
                {label:'\u221bn (cube root)',val:'<span style="color:#'+(cbrtPerfect?'6ee7b7':'fbbf24')+';font-weight:700;">'+(cbrtPerfect?Math.round(cbrtVal):'\u2248 '+f(cbrtVal))+'</span>'+'<span style="font-size:10px;color:rgba(221,225,240,0.40);margin-left:6px;">'+(cbrtPerfect?'(perfect cube)':'(irrational)')+'</span>',note:''},
              ];
              document.getElementById('rootOut').innerHTML=rows.map(function(r){
                return '<div style="display:flex;gap:10px;align-items:baseline;"><span style="color:rgba(221,225,240,0.45);min-width:160px;display:inline-block;">'+r.label+':</span>'+r.val+(r.note?'<span style="font-size:10px;color:rgba(221,225,240,0.30);margin-left:6px;">'+r.note+'</span>':'')+'</div>';
              }).join('');
            }
            document.getElementById('rootBtn').addEventListener('click',explore);
            document.getElementById('rootN').addEventListener('keydown',function(e){if(e.key==='Enter')explore();});
            explore();
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Calculate: v196", answer: "14", topic: "Integers" },
        { type: "mc", text: "Calculate ?(-125):", options: ["-5", "5", "-25", "undefined"], answer: 0, topic: "Integers" },
        { type: "mc", text: "Which of these is NOT a perfect square?", options: ["81", "100", "150", "144"], answer: 2, topic: "Integers" },
        { type: "input", text: "Calculate: -v169", answer: "-13", topic: "Integers" },
        { type: "mc", text: "v(-9) is:", options: ["-3", "3", "undefined (not real)", "�3"], answer: 2, topic: "Integers" },
      ]
    },
  ],
  workbook: {
    chapter: 2, chapterName: "Integers",
    topics: [
      {
        name: "Operations with Integers",
        questions: [
          {
            num: "1",
            text: "Calculate each of the following:",
            parts: [
              { label: "a)", text: "(-15) + (-8) - (-23)", marks: 2 },
              { label: "b)", text: "(-6) � (-7) � (-2)", marks: 2 },
              { label: "c)", text: "(-72) � (-9) + (-4) � 3", marks: 3 },
              { label: "d)", text: "-5� - (-3)�", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Use the order of operations (BODMAS) to calculate:",
            parts: [
              { label: "a)", text: "(-3)� - (-4)(5) + (-2)�", marks: 4 },
              { label: "b)", text: "[(-18) � 3] - [(-4) � (-5)]", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Squares, Cubes and Roots",
        questions: [
          {
            num: "3",
            text: "Calculate each of the following, or state if it is not real:",
            parts: [
              { label: "a)", text: "v225", marks: 1 },
              { label: "b)", text: "-v81", marks: 1 },
              { label: "c)", text: "?216", marks: 1 },
              { label: "d)", text: "?(-64)", marks: 2 },
              { label: "e)", text: "v(-49)", marks: 1 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 2, chapterName: "Chapter 2 � Integers",
    topics: [
      {
        name: "Operations with Integers",
        answers: [
          { num: "Q1a", ans: "0", note: "-15 - 8 + 23 = 0" },
          { num: "Q1b", ans: "-84", note: "42 � (-2) = -84 (three negatives ? negative)" },
          { num: "Q1c", ans: "-4", note: "8 + (-12) = -4" },
          { num: "Q1d", ans: "-34", note: "-25 - 9 = -34; note -5� = -25, (-3)� = 9" },
          { num: "Q2a", ans: "21", note: "9 + 20 - 8 = 21" },
          { num: "Q2b", ans: "-26", note: "[-6] - [20] = -26" },
        ]
      },
      {
        name: "Squares, Cubes and Roots",
        answers: [
          { num: "Q3a", ans: "15", note: "15� = 225" },
          { num: "Q3b", ans: "-9", note: "v81 = 9; negate" },
          { num: "Q3c", ans: "6", note: "6� = 216" },
          { num: "Q3d", ans: "-4", note: "(-4)� = -64" },
          { num: "Q3e", ans: "Not real", note: "Cannot take square root of a negative" },
        ]
      },
    ]
  }
});
