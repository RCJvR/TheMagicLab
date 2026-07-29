// Math Magician — Grade 11, Chapter 3
// Number Patterns — Quadratic Sequences

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 300,
      chapter: 3,
      name: "Quadratic sequences",
      fullName: "Identifying and finding the general term of quadratic sequences",
      lesson: {
        heading: "Quadratic sequences",
        sub: "Chapter 3 · Topic 1",
        body: `
          <p>In Grade 10 we studied linear sequences (constant first difference). Grade 11 introduces <strong>quadratic sequences</strong>, where the <em>second</em> difference is constant.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Identifying a quadratic sequence</div>
            <p>
              A sequence is quadratic if the <strong>first differences</strong> are not constant but the <strong>second differences</strong> are constant and non-zero.<br><br>
              Example: 1, 4, 9, 16, 25, …<br>
              1st differences: 3, 5, 7, 9, … (not constant)<br>
              2nd differences: 2, 2, 2, … (constant ✓) → quadratic
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 General term of a quadratic sequence</div>
            <p>
              <span class="math">Tₙ = an² + bn + c</span><br><br>
              To find a, b, c:<br>
              • <span class="math">2a</span> = second difference<br>
              • Use <span class="math">T₁, T₂, T₃</span> to set up and solve for b and c
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Find Tₙ for 3, 8, 15, 24, …</div>
            <p>1st differences: 5, 7, 9, … &nbsp; 2nd differences: 2, 2<br>
            <span class="math">2a = 2 → a = 1</span><br>
            <span class="math">T₁ = a + b + c = 3 → 1 + b + c = 3 → b + c = 2</span><br>
            <span class="math">T₂ = 4a + 2b + c = 8 → 4 + 2b + c = 8 → 2b + c = 4</span><br>
            Subtract: <span class="math">b = 2, c = 0</span><br>
            <span class="math">Tₙ = n² + 2n</span><br>
            Check: T₃ = 9 + 6 = 15 ✓</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Quadratic Sequence Finder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the first three terms — get the second difference, a, b, c, the general term Tₙ, and the next four terms.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₁</div><input id="g11c3t1" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₂</div><input id="g11c3t2" type="number" value="8" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₃</div><input id="g11c3t3" type="number" value="15" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find Tₙ</button>
            </div>
            <div id="g11c3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n%1===0?n.toString():parseFloat(n.toFixed(4)).toString();}
              function sgn(n,first){const s=n<0?'−':first?'':'+';const v=Math.abs(n);return s+(v===1?'':v);}
              function calc(){
                const T1=parseFloat(document.getElementById('g11c3t1').value);
                const T2=parseFloat(document.getElementById('g11c3t2').value);
                const T3=parseFloat(document.getElementById('g11c3t3').value);
                const out=document.getElementById('g11c3Out');
                if([T1,T2,T3].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter three numeric terms.</span>';return;}
                const d1=T2-T1,d2=T3-T2;
                const d2nd=d2-d1;
                if(d2nd===0){out.innerHTML='<span style="color:#fca5a5;">Second difference is 0 — this is a linear (not quadratic) sequence.</span>';return;}
                const a=d2nd/2;
                // b from 3a+b = d1
                const b=d1-3*a;
                // c from a+b+c = T1
                const c=T1-a-b;
                const terms=[T1,T2,T3];
                for(let n=4;n<=7;n++) terms.push(a*n*n+b*n+c);
                let html='<span style="color:rgba(221,225,240,0.50);">1st differences: '+(T2-T1)+', '+(T3-T2)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">2nd difference: '+d2nd+' → a = '+d2nd+'/2 = '+f(a)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">b = 1st diff − 3a = '+d1+' − '+f(3*a)+' = '+f(b)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">c = T₁ − a − b = '+T1+' − '+f(a)+' − '+f(b)+' = '+f(c)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Tₙ = '+f(a)+'n²'+sgn(b,false)+'n'+sgn(c,false)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Terms: </span><span style="color:#fcd34d;">'+terms.map((v,i)=>'T'+(i+1)+'='+f(v)).join(', ')+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c3Btn').addEventListener('click',calc);
              ['g11c3t1','g11c3t2','g11c3t3'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Always verify your formula: substitute n = 1, 2, 3 and check they match the given terms. One wrong step in finding b or c will shift every subsequent term.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Sequence: 2, 6, 12, 20, 30, … What is the second difference?",
          options: ["4", "2", "8", "6"],
          answer: 1,
          topic: "Quadratic sequences"
        },
        {
          type: "mc",
          text: "For Tₙ = an² + bn + c, if the second difference is 6, then a =",
          options: ["6", "12", "3", "2"],
          answer: 2,
          topic: "Quadratic sequences"
        },
        {
          type: "input",
          text: "Tₙ = n² + 3n − 1. Find T₅.",
          answer: "39",
          topic: "Quadratic sequences"
        },
        {
          type: "mc",
          text: "Which sequence is quadratic?",
          options: ["5, 8, 11, 14, …", "1, 3, 7, 13, 21, …", "2, 4, 8, 16, …", "3, 6, 9, 12, …"],
          answer: 1,
          topic: "Quadratic sequences"
        },
        {
          type: "mc",
          text: "Tₙ = 2n² − n + 1. What is T₁?",
          options: ["2", "4", "3", "1"],
          answer: 0,
          topic: "Quadratic sequences"
        },
        {
          type: "input",
          text: "Determine the general term Tₙ of the quadratic sequence 5, 12, 23, 38, 57, …",
          answer: "2n² + n + 2",
          altAnswers: ["2n²+n+2", "Tₙ = 2n² + n + 2"],
          topic: "Quadratic sequences"
        },
        {
          type: "input",
          text: "A quadratic sequence has T₁ = 4, T₂ = 9, and a second difference of 4. Determine Tₙ.",
          answer: "2n² − n + 3",
          altAnswers: ["2n²-n+3", "2n² - n + 3", "Tₙ = 2n² − n + 3"],
          topic: "Quadratic sequences"
        }
      ]
    },
    {
      id: 301,
      chapter: 3,
      name: "Working with quadratic sequences",
      fullName: "Finding terms, term numbers, and using quadratic sequences in context",
      lesson: {
        heading: "Working with quadratic sequences",
        sub: "Chapter 3 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Finding which term equals a given value</div>
            <p>
              Set <span class="math">Tₙ = given value</span> and solve the resulting quadratic equation for n.<br>
              Remember: n must be a <strong>positive integer</strong>. Reject non-integer or negative solutions.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>For <span class="math">Tₙ = n² + 2n</span>, which term equals 80?<br>
            <span class="math">n² + 2n = 80 → n² + 2n − 80 = 0 → (n+10)(n−8) = 0</span><br>
            <span class="math">n = 8</span> (reject n = −10)<br>
            → T₈ = 80 ✓</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Mixed sequences</div>
            <p>
              Sometimes you need to identify whether a sequence is linear, quadratic, or neither:<br>
              • Constant 1st difference → linear<br>
              • Constant 2nd difference (non-zero) → quadratic<br>
              • Constant ratio between terms → geometric (Grade 12)<br>
              • None of the above → other (exponential, cubic, etc.)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Shortcut: a from second difference</div>
            <p>
              If second difference = d₂, then <span class="math">a = d₂/2</span>.<br>
              The first difference between T₁ and T₂ = <span class="math">3a + b</span>.<br>
              And <span class="math">T₁ = a + b + c</span>.<br>
              Use these three facts to find a, b, c systematically.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Term Number Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a, b, c for Tₙ = an² + bn + c and a target value — solve for n.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c3t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c3t2b" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g11c3t2c" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Target Tₙ = ?</div><input id="g11c3t2target" type="number" value="80" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c3t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve for n</button>
            </div>
            <div id="g11c3t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const a=parseFloat(document.getElementById('g11c3t2a').value);
                const b=parseFloat(document.getElementById('g11c3t2b').value);
                const c=parseFloat(document.getElementById('g11c3t2c').value);
                const T=parseFloat(document.getElementById('g11c3t2target').value);
                const out=document.getElementById('g11c3t2Out');
                if([a,b,c,T].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (a ≠ 0).</span>';return;}
                // an² + bn + (c−T) = 0
                const A=a,B=b,C=c-T;
                const D=B*B-4*A*C;
                let html='<span style="color:rgba(221,225,240,0.50);">'+f(a)+'n² + '+f(b)+'n + '+f(c)+' = '+T+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">→ '+f(a)+'n² + '+f(b)+'n + '+f(c-T)+' = 0</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Δ = ('+f(b)+')² − 4('+f(a)+')('+f(c-T)+') = '+f(D)+'</span><br>';
                if(D<0){out.innerHTML=html+'<span style="color:#fca5a5;">No real solution — this value is not in the sequence.</span>';return;}
                const sq=Math.sqrt(D);
                const n1=(-B+sq)/(2*A),n2=(-B-sq)/(2*A);
                [n1,n2].forEach(n=>{
                  if(n>0&&Math.abs(n-Math.round(n))<0.0001){
                    const ni=Math.round(n);
                    html+='<span style="color:#6ee7b7;">n = '+ni+' ✓ → T₍'+ni+'₎ = '+f(a*ni*ni+b*ni+c)+'</span><br>';
                  } else if(n>0){
                    html+='<span style="color:rgba(221,225,240,0.50);">n = '+f(n)+' — not a positive integer, reject</span><br>';
                  } else {
                    html+='<span style="color:rgba(221,225,240,0.50);">n = '+f(n)+' — negative, reject</span><br>';
                  }
                });
                out.innerHTML=html;
              }
              document.getElementById('g11c3t2Btn').addEventListener('click',calc);
              ['g11c3t2a','g11c3t2b','g11c3t2c','g11c3t2target'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>n must be a <strong>positive integer</strong>. If the quadratic gives n = 8 and n = −10, automatically reject −10. If neither root is a positive integer, the target value is not in the sequence.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "For Tₙ = n² − n + 3, which term equals 45?",
          answer: "7",
          topic: "Working with quadratic sequences"
        },
        {
          type: "mc",
          text: "Sequence: 4, 7, 12, 19, 28, … What is Tₙ?",
          options: ["n² + 3", "n² + 2n + 1", "n² − n + 4", "2n² + 2"],
          answer: 0,
          topic: "Working with quadratic sequences"
        },
        {
          type: "mc",
          text: "For Tₙ = 2n² + 3n − 1, the second difference is:",
          options: ["3", "4", "2", "6"],
          answer: 1,
          topic: "Working with quadratic sequences"
        },
        {
          type: "mc",
          text: "A quadratic sequence has T₁ = 3, T₂ = 7, T₃ = 13. Find T₄.",
          options: ["19", "20", "21", "22"],
          answer: 2,
          topic: "Working with quadratic sequences"
        },
        {
          type: "input",
          text: "Tₙ = n² + 4n. Find the value of n for which Tₙ = 96.",
          answer: "8",
          topic: "Working with quadratic sequences"
        },
        {
          type: "input",
          text: "A quadratic sequence has Tₙ = n² − 8n + 15. Determine which term number(s) of the sequence equal zero.",
          answer: "3 and 5",
          altAnswers: ["n = 3 and n = 5", "5 and 3", "n=3 and n=5"],
          topic: "Working with quadratic sequences"
        },
        {
          type: "mc",
          text: "Sequence A: 2, 6, 12, 20, 30, … Sequence B: 3, 9, 27, 81, 243, … Which correctly classifies them?",
          options: ["A is quadratic, B is geometric", "Both are quadratic", "A is geometric, B is quadratic", "Both are linear"],
          answer: 0,
          topic: "Working with quadratic sequences"
        }
      ]
    },
    {
      id: 302,
      chapter: 3,
      name: "Quadratic patterns in context",
      fullName: "Deriving quadratic general terms from real-world counting problems",
      lesson: {
        heading: "Quadratic patterns in context",
        sub: "Chapter 3 · Topic 3",
        body: `
          <p>Many counting problems — round-robin tournaments, handshakes, diagonals of a polygon — generate quadratic sequences. The skill here is <strong>translating a situation into a sequence</strong>, then applying everything you already know about quadratic patterns.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Building the sequence from a description</div>
            <p>
              1. Work out the actual value for small cases (n = 1, 2, 3, 4 …) by direct counting or reasoning.<br>
              2. Write these as a sequence of terms.<br>
              3. Test the differences to confirm it is quadratic (constant 2nd difference).<br>
              4. Find <span class="math">Tₙ = an² + bn + c</span> as before.<br>
              5. Answer the actual question — this may ask for a specific term, or for n given Tₙ.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Round-robin tournament</div>
            <p>In a group stage, every team plays every other team once. With n teams, the number of matches is:<br>
            n = 2: 1 match. n = 3: 3 matches. n = 4: 6 matches. n = 5: 10 matches.<br>
            Sequence: 1, 3, 6, 10, … &nbsp; 1st differences: 2, 3, 4 &nbsp; 2nd difference: 1 (constant) → quadratic.<br>
            <span class="math">a = 1/2</span>; solving further gives <span class="math">Tₙ = n(n−1)/2</span> — the familiar "n choose 2" formula.<br>
            For 6 teams: T₆ = 6(5)/2 = 15 matches.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Diagonals of a polygon</div>
            <p>The number of diagonals of a convex polygon with n sides is <span class="math">D(n) = n(n−3)/2</span>.<br>
            A hexagon (n = 6): D(6) = 6(3)/2 = 9 diagonals.<br>
            How many sides has a polygon with 35 diagonals? Solve <span class="math">n(n−3)/2 = 35 → n² − 3n − 70 = 0 → (n−10)(n+7) = 0 → n = 10</span> (reject n = −7).</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Round-Robin Matches Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the number of teams in a group (every team plays every other team once) — see the quadratic pattern and the number of matches.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Number of teams (n)</div><input id="g11c3t3n" type="number" value="6" min="2" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c3t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate matches</button>
            </div>
            <div id="g11c3t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function calc(){
                const n=parseInt(document.getElementById('g11c3t3n').value);
                const out=document.getElementById('g11c3t3Out');
                if(isNaN(n)||n<2){out.innerHTML='<span style="color:#fca5a5;">Enter a whole number of teams (at least 2).</span>';return;}
                const seqTerms=[];
                for(let k=2;k<=Math.min(n+1,7);k++) seqTerms.push(k*(k-1)/2);
                const matches=n*(n-1)/2;
                let html='<span style="color:rgba(221,225,240,0.50);">Sequence of matches for 2,3,4,…teams: '+seqTerms.join(', ')+(n+1>7?', …':'')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">General term: Tₙ = n(n−1)/2</span><br>';
                html+='<span style="color:#6ee7b7;">With '+n+' teams: T'+n+' = '+n+'('+(n-1)+')/2 = '+matches+' matches</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c3t3Btn').addEventListener('click',calc);
              document.getElementById('g11c3t3n').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Counting problems like this almost always give <em>triangular-number</em>-style patterns: Tₙ = n(n−1)/2 for "matches/handshakes between n people/teams", and Tₙ = n(n−3)/2 for "diagonals of an n-sided polygon".</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "In a group of 5 teams, every team plays every other team once. How many matches are played?",
          answer: "10",
          topic: "Quadratic patterns in context"
        },
        {
          type: "mc",
          text: "A polygon has 20 diagonals. Using D(n) = n(n−3)/2, how many sides does it have?",
          options: ["8", "7", "9", "10"],
          answer: 0,
          topic: "Quadratic patterns in context"
        },
        {
          type: "mc",
          text: "The number of handshakes among n people (each shakes hands with every other person once) follows which pattern?",
          options: ["Linear", "Quadratic", "Constant", "Cubic"],
          answer: 1,
          topic: "Quadratic patterns in context"
        },
        {
          type: "input",
          text: "Using H(n) = n(n−1)/2, how many handshakes occur among 9 people?",
          answer: "36",
          topic: "Quadratic patterns in context"
        },
        {
          type: "mc",
          text: "A tournament sequence of matches is 3, 6, 10, 15, 21, … What is the second difference?",
          options: ["1", "2", "3", "0"],
          answer: 0,
          topic: "Quadratic patterns in context"
        },
        {
          type: "input",
          text: "The nth diagram in a tiling pattern uses Tₙ = n² + n tiles. Determine which diagram number uses exactly 132 tiles.",
          answer: "11",
          topic: "Quadratic patterns in context"
        },
        {
          type: "input",
          text: "The number of seats in the first 5 rows of a stadium section is 20, 26, 34, 44, 56. Assuming the pattern continues quadratically, determine the general term Tₙ and hence the number of seats in row 8.",
          answer: "104",
          topic: "Quadratic patterns in context"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 3 Workbook — Number Patterns",
    questions: [
      {
        number: 1,
        text: "For each sequence, determine whether it is linear, quadratic, or neither, and find Tₙ where possible:",
        parts: [
          { label: "a", text: "5, 9, 13, 17, …", marks: 3 },
          { label: "b", text: "2, 5, 10, 17, 26, …", marks: 4 },
          { label: "c", text: "1, 2, 4, 8, 16, …", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "A quadratic sequence has first term T₁ = 1, and first differences 4, 8, 12, 16, …",
        parts: [
          { label: "a", text: "Write the first five terms of the sequence.", marks: 2 },
          { label: "b", text: "Find the second difference.", marks: 1 },
          { label: "c", text: "Determine the general term Tₙ.", marks: 4 },
          { label: "d", text: "Find the value of n for which Tₙ = 145.", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "The number of handshakes when n people each shake hands with every other person is given by H(n) = n(n−1)/2.",
        parts: [
          { label: "a", text: "Show this is a quadratic sequence by finding the first and second differences.", marks: 4 },
          { label: "b", text: "How many handshakes occur at a party of 12 people?", marks: 2 },
          { label: "c", text: "How many people are needed for exactly 45 handshakes?", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Linear; d=4; Tₙ=4n+1",
        b: "1st diffs: 3,5,7,9 → 2nd diffs: 2,2,2 → quadratic; Tₙ=n²+2n−1",
        c: "Neither — ratio is constant (×2), geometric sequence"
      },
      2: {
        a: "1, 5, 13, 25, 41",
        b: "Second difference = 4",
        c: "2a=4→a=2; T₁:2+b+c=1; 1st diff(T₁→T₂)=3a+b=4→6+b=4→b=−2; c=1; Tₙ=2n²−2n+1",
        d: "2n²−2n+1=145 → 2n²−2n−144=0 → n²−n−72=0 → (n−9)(n+8)=0 → n=9"
      },
      3: {
        a: "H(1)=0,H(2)=1,H(3)=3,H(4)=6,H(5)=10; 1st diffs:1,2,3,4; 2nd diffs:1,1,1 → constant ✓ quadratic",
        b: "H(12)=66",
        c: "n(n−1)/2=45→n²−n−90=0→(n−10)(n+9)=0→n=10"
      }
    }
  }
});
