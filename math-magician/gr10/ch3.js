// Math Magician — Grade 10, Chapter 3
// Number Patterns

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 300,
      chapter: 3,
      name: "Linear sequences",
      fullName: "Describing and generalising linear (arithmetic) sequences",
      lesson: {
        heading: "Linear number patterns",
        sub: "Chapter 3 · Topic 1",
        body: `
          <p>A <strong>sequence</strong> is an ordered list of numbers. In Grade 10 we focus on <strong>linear sequences</strong>, where the difference between consecutive terms is constant.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Linear (arithmetic) sequence</div>
            <p>A sequence where each term increases or decreases by a fixed amount called the <strong>common difference (d)</strong>.<br><br>
            General term (nth term): <span class="math">Tₙ = a + (n − 1)d</span><br>
            where <span class="math">a</span> = first term, <span class="math">d</span> = common difference, <span class="math">n</span> = term number.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example 1: Find the nth term</div>
            <p>Sequence: 3, 7, 11, 15, …<br>
            <span class="math">a = 3</span>, <span class="math">d = 4</span><br>
            <span class="math">Tₙ = 3 + (n − 1)(4) = 3 + 4n − 4 = 4n − 1</span><br>
            Check: <span class="math">T₁ = 4(1) − 1 = 3 ✓</span> &nbsp; <span class="math">T₄ = 4(4) − 1 = 15 ✓</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example 2: Find which term equals a value</div>
            <p>For <span class="math">Tₙ = 4n − 1</span>, which term equals 79?<br>
            <span class="math">4n − 1 = 79</span><br>
            <span class="math">4n = 80</span><br>
            <span class="math">n = 20</span> → It is the 20th term.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Finding d from the pattern</div>
            <p>
              <span class="math">d = T₂ − T₁ = T₃ − T₂ = …</span><br>
              You can also find <span class="math">d</span> if given two non-consecutive terms:<br>
              If <span class="math">Tₘ</span> and <span class="math">Tₙ</span> are known: <span class="math">d = (Tₙ − Tₘ)/(n − m)</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Arithmetic Sequence Explorer</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the first term and common difference — explore the sequence and its general term.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">First term (a)</div>
                <input id="g10c3a" type="number" value="3"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Common diff (d)</div>
                <input id="g10c3d" type="number" value="4"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Find Tₙ for n =</div>
                <input id="g10c3n" type="number" value="10" min="1"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c3Btn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Generate
              </button>
            </div>
            <div id="g10c3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const a=parseFloat(document.getElementById('g10c3a').value);
                const d=parseFloat(document.getElementById('g10c3d').value);
                const n=parseInt(document.getElementById('g10c3n').value);
                const out=document.getElementById('g10c3Out');
                if(isNaN(a)||isNaN(d)||isNaN(n)||n<1){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (n ≥ 1).</span>';return;}
                // First 8 terms
                const terms=[];
                for(let i=1;i<=8;i++) terms.push(a+(i-1)*d);
                // General term: Tn = a + (n-1)d = dn + (a-d)
                const c=a-d; // constant term
                let formula='Tₙ = ';
                if(d===0) formula+=a;
                else if(d===1) formula+=(c===0?'n':c>0?'n + '+c:'n − '+Math.abs(c));
                else if(d===-1) formula+=(c===0?'−n':c>0?'−n + '+c:'−n − '+Math.abs(c));
                else formula+=d+'n'+(c===0?'':c>0?' + '+c:' − '+Math.abs(c));
                const Tn=a+(n-1)*d;
                let html='<span style="color:rgba(221,225,240,0.50);">First 8 terms: </span><span style="color:#fcd34d;">'+terms.join(', ')+'…</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">General term: </span><span style="color:#fcd34d;">'+formula+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">T<sub>'+n+'</sub> = '+a+' + ('+(n-1)+')×('+d+') = </span><span style="color:#6ee7b7;">'+Tn+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c3Btn').addEventListener('click',run);
              ['g10c3a','g10c3d','g10c3n'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>A quick shortcut: write <span class="math">Tₙ = dn + (a − d)</span>. The coefficient of n is always d, and the constant is the "zeroth term" (one step before T₁).</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "The sequence 5, 9, 13, 17, … has nth term:",
          options: ["4n + 1", "4n − 1", "5n − 4", "n + 4"],
          answer: 0,
          topic: "Linear sequences"
        },
        {
          type: "input",
          text: "For Tₙ = 3n + 2, what is T₇?",
          answer: "23",
          topic: "Linear sequences"
        },
        {
          type: "mc",
          text: "Which term of 2, 5, 8, 11, … equals 98?",
          options: ["30th", "32nd", "33rd", "34th"],
          answer: 2,
          topic: "Linear sequences"
        },
        {
          type: "input",
          text: "A sequence has T₃ = 10 and T₇ = 22. Find d.",
          answer: "3",
          topic: "Linear sequences"
        },
        {
          type: "mc",
          text: "The 1st term of a linear sequence is 8 and d = −3. What is T₅?",
          options: ["−4", "−7", "20", "−1"],
          answer: 0,
          topic: "Linear sequences"
        }
      ]
    },
    {
      id: 301,
      chapter: 3,
      name: "Patterns in context",
      fullName: "Number patterns in tables, graphs, and real-world contexts",
      lesson: {
        heading: "Patterns in context — tables, diagrams, and graphs",
        sub: "Chapter 3 · Topic 2",
        body: `
          <p>Number patterns appear in matchstick puzzles, growth problems, cost tables, and many real-world settings. The key skill is identifying the pattern and writing a general rule.</p>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Matchstick pattern</div>
            <p>A pattern of squares is built with matchsticks:</p>
            <p>1 square → 4 sticks<br>
            2 squares → 7 sticks<br>
            3 squares → 10 sticks</p>
            <p>The differences are constant (d = 3), so it's linear.<br>
            <span class="math">Tₙ = 4 + (n−1)(3) = 3n + 1</span><br>
            Check: <span class="math">n=1</span>: 4 ✓ &nbsp; <span class="math">n=3</span>: 10 ✓</p>
            <p>How many sticks for 20 squares? <span class="math">T₂₀ = 3(20) + 1 = 61</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reading patterns from a table</div>
            <p>
              Given a table of values, check whether the differences are constant.<br>
              If yes → linear; find <span class="math">a</span> and <span class="math">d</span> to write <span class="math">Tₙ</span>.<br>
              <br>
              | n | 1 | 2 | 3 | 4 |<br>
              | T | 7 | 11 | 15 | 19 |<br>
              Differences: all 4 → <span class="math">d = 4, a = 7</span><br>
              <span class="math">Tₙ = 4n + 3</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Graphs of linear sequences</div>
            <p>
              When plotted as (n, Tₙ), a linear sequence gives <strong>discrete points</strong> that lie on a straight line.<br>
              The gradient of that line equals <span class="math">d</span>.<br>
              The y-intercept equals <span class="math">a − d</span> (the "zeroth term").
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Pattern Finder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the first three terms of a sequence — find the formula and predict any term.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₁</div>
                <input id="g10c3pt1" type="number" value="4"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₂</div>
                <input id="g10c3pt2" type="number" value="7"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₃</div>
                <input id="g10c3pt3" type="number" value="10"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Find term n</div>
                <input id="g10c3pn" type="number" value="20" min="1"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c3pBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Analyse
              </button>
            </div>
            <div id="g10c3pOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const t1=parseFloat(document.getElementById('g10c3pt1').value);
                const t2=parseFloat(document.getElementById('g10c3pt2').value);
                const t3=parseFloat(document.getElementById('g10c3pt3').value);
                const n=parseInt(document.getElementById('g10c3pn').value);
                const out=document.getElementById('g10c3pOut');
                if([t1,t2,t3,n].some(isNaN)||n<1){out.innerHTML='<span style="color:#fca5a5;">Enter valid values.</span>';return;}
                const d1=t2-t1, d2=t3-t2;
                if(Math.abs(d1-d2)>0.0001){
                  out.innerHTML='<span style="color:#fca5a5;">Differences not constant (d₁='+d1+', d₂='+d2+') — not a linear sequence.</span>';
                  return;
                }
                const d=d1;
                const a=t1;
                const c=a-d;
                let formula='Tₙ = ';
                if(d===0) formula+=a;
                else if(d===1) formula+=(c===0?'n':c>0?'n + '+c:'n − '+Math.abs(c));
                else if(d===-1) formula+=(c===0?'−n':c>0?'−n + '+c:'−n − '+Math.abs(c));
                else formula+=d+'n'+(c===0?'':c>0?' + '+c:' − '+Math.abs(c));
                const Tn=a+(n-1)*d;
                let html='<span style="color:rgba(221,225,240,0.50);">Differences: T₂−T₁ = '+d1+', T₃−T₂ = '+d2+' → </span><span style="color:#6ee7b7;">Linear sequence ✓</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Common difference: </span><span style="color:#fcd34d;">d = '+d+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">General term: </span><span style="color:#fcd34d;">'+formula+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">T<sub>'+n+'</sub> = '+d+'('+n+') + ('+c+') = </span><span style="color:#6ee7b7;">'+Tn+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c3pBtn').addEventListener('click',run);
              ['g10c3pt1','g10c3pt2','g10c3pt3','g10c3pn'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>If the differences between consecutive terms are <em>not</em> all equal, the sequence is not linear — check for a quadratic or geometric pattern instead.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A pattern of triangles uses matches: 1 triangle = 3, 2 = 5, 3 = 7. Formula for n triangles:",
          options: ["3n", "2n + 1", "n + 2", "2n + 3"],
          answer: 1,
          topic: "Patterns in context"
        },
        {
          type: "input",
          text: "A table shows n = 1: T = 5, n = 2: T = 8, n = 3: T = 11. Find T for n = 10.",
          answer: "32",
          topic: "Patterns in context"
        },
        {
          type: "mc",
          text: "For Tₙ = 5n − 2, the gradient when plotted on a graph is:",
          options: ["−2", "3", "5", "5n"],
          answer: 2,
          topic: "Patterns in context"
        },
        {
          type: "mc",
          text: "A linear sequence is plotted. Points lie on a line with gradient 4 and y-intercept 1. The nth term is:",
          options: ["4n + 1", "4n − 3", "n + 4", "4n + 5"],
          answer: 1,
          topic: "Patterns in context"
        },
        {
          type: "input",
          text: "Tₙ = an + b. Given T₂ = 9 and T₅ = 18. Find a.",
          answer: "3",
          topic: "Patterns in context"
        }
      ]
    },
    {
      id: 302,
      chapter: 3,
      name: "Non-obvious pattern problems",
      fullName: "Repeating patterns, position-in-cycle problems, and non-linear investigations",
      lesson: {
        heading: "Non-obvious pattern problems",
        sub: "Chapter 3 · Topic 3",
        body: `
          <p>Not every pattern problem is a straightforward linear sequence. CAPS specifically highlights problems where <strong>the approach isn't immediately obvious</strong> — these need creative thinking rather than a memorised formula.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Repeating letter/symbol cycles</div>
            <p>
              For a repeating block (like "MATHS" repeated), find the <strong>cycle length</strong>, then use <strong>remainders</strong> (division) to locate any position.<br>
              If the cycle length is <span class="math">L</span>, the item in position <span class="math">n</span> matches the item in position <span class="math">n</span> mod <span class="math">L</span> (using the cycle's last position when the remainder is 0).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: MATHSMATHSMATHS…</div>
            <p>
              The word "MATHS" has 5 letters — cycle length <span class="math">L = 5</span>.<br>
              What is the 267th letter?<br>
              <span class="math">267 ÷ 5 = 53</span> remainder <span class="math">2</span>.<br>
              Remainder 2 → 2nd letter of "MATHS" → <strong>A</strong>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: A growing dot pattern (non-linear)</div>
            <p>
              A pattern of dots: 1, 4, 9, 16, … (each figure is a square array).<br>
              These differences are 3, 5, 7, … — <em>not</em> constant, so this is <strong>not</strong> a linear sequence.<br>
              Investigating further: <span class="math">Tₙ = n²</span> — recognise the perfect square pattern directly.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 General strategy for unfamiliar patterns</div>
            <p>
              1. List several terms and check first differences.<br>
              2. If differences are constant → linear (Topic 1/2 methods apply).<br>
              3. If not constant, look for a repeating cycle, a doubling pattern, or a recognisable sequence like square/triangular numbers.<br>
              4. Test your rule against <em>all</em> given terms before trusting it.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Cycle Position Finder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a repeating word/sequence and a position number — find which letter/element lands there.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Repeating block</div>
                <input id="g10c3cycWord" type="text" value="MATHS" maxlength="12"
                  style="width:120px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;text-transform:uppercase;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Position n</div>
                <input id="g10c3cycN" type="number" value="267" min="1"
                  style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c3cycBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Find
              </button>
            </div>
            <div id="g10c3cycOut" style="font-size:14px;line-height:2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const word=(document.getElementById('g10c3cycWord').value||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
                const n=parseInt(document.getElementById('g10c3cycN').value);
                const out=document.getElementById('g10c3cycOut');
                if(!word||!n||n<1){out.innerHTML='<span style="color:#fca5a5;">Enter a block and a position ≥ 1.</span>';return;}
                const L=word.length;
                let rem=n%L;
                const idx=rem===0?L:rem;
                const letter=word[idx-1];
                let html='<span style="color:rgba(221,225,240,0.50);">Cycle length L = '+L+' ("'+word+'")</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+n+' ÷ '+L+' = '+Math.floor(n/L)+' remainder '+rem+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Remainder '+rem+' → position '+idx+' in the block</span><br>';
                html+='<span style="color:#6ee7b7;">The '+n+'th element is: '+letter+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c3cycBtn').addEventListener('click',run);
              ['g10c3cycWord','g10c3cycN'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>When remainder = 0, the item is the <em>last</em> one in the cycle, not the "0th" — a common off-by-one error.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "The pattern ABCABCABC… repeats. What is the 100th letter?",
          answer: "A",
          topic: "Non-obvious pattern problems"
        },
        {
          type: "mc",
          text: "For the sequence 1, 4, 9, 16, 25, … the general term is:",
          options: ["Tₙ = n²", "Tₙ = 3n − 2", "Tₙ = 2n + 1", "Tₙ = n² + 1"],
          answer: 0,
          topic: "Non-obvious pattern problems"
        },
        {
          type: "input",
          text: "The word SUM repeats: SUMSUMSUM…. What is the 250th letter?",
          answer: "S",
          topic: "Non-obvious pattern problems"
        },
        {
          type: "mc",
          text: "A sequence has first differences 2, 4, 6, 8, … (not constant). This means the sequence is:",
          options: ["Quadratic, not linear", "Linear with d = 2", "Linear with d = 4", "Impossible to analyse"],
          answer: 0,
          topic: "Non-obvious pattern problems"
        },
        {
          type: "input",
          text: "The pattern 7;14;7;14;7;14;… repeats with cycle length 2. What is the 41st term?",
          answer: "7",
          topic: "Non-obvious pattern problems"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 3 Workbook — Number Patterns",
    questions: [
      {
        number: 1,
        text: "For each sequence, find the common difference and the general term Tₙ:",
        parts: [
          { label: "a", text: "6, 10, 14, 18, …", marks: 3 },
          { label: "b", text: "20, 17, 14, 11, …", marks: 3 },
          { label: "c", text: "−5, −1, 3, 7, …", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "A linear sequence has T₃ = 14 and T₈ = 34.",
        parts: [
          { label: "a", text: "Find the common difference.", marks: 2 },
          { label: "b", text: "Find the first term.", marks: 2 },
          { label: "c", text: "Write the general term Tₙ.", marks: 2 },
          { label: "d", text: "Is 100 a term in this sequence? Show working.", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "A pattern of pentagons is built with matchsticks: 1 pentagon uses 5 sticks, and each new pentagon shares one side with the previous.",
        parts: [
          { label: "a", text: "Complete the table for n = 1, 2, 3, 4.", marks: 2 },
          { label: "b", text: "Find the formula for the number of sticks for n pentagons.", marks: 3 },
          { label: "c", text: "How many sticks are needed for 15 pentagons?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "d=4; Tₙ = 4n + 2",
        b: "d=−3; Tₙ = −3n + 23",
        c: "d=4; Tₙ = 4n − 9"
      },
      2: {
        a: "d = (34−14)/(8−3) = 4",
        b: "T₁ = 14 − 2(4) = 6",
        c: "Tₙ = 4n + 2",
        d: "4n+2=100 → n=24.5 → not a whole number → 100 is NOT a term"
      },
      3: {
        a: "5, 9, 13, 17",
        b: "Tₙ = 4n + 1",
        c: "T₁₅ = 61 sticks"
      }
    }
  }
});
