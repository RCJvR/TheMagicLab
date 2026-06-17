// Math Magician — Grade 8, Chapter 4 data
// Auto-loaded on demand by math-magician-gr8.html

MathMagician.registerChapter(4, {
  topics: [
{
    id: 401,
    chapter: 4,
    name: "Numeric number patterns",
    fullName: "Numeric number patterns",
    lesson: {
      heading: "Numeric number patterns",
      sub: "Chapter 4 · Topic 1",
      body: `
        <p>A <strong>number pattern</strong> (or sequence) is an ordered list of numbers that follow a specific rule. Identifying the rule lets you predict any term.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Key vocabulary</div>
          <p>
            <strong>Term:</strong> each number in the sequence.<br>
            <strong>Common difference (d):</strong> the constant value added or subtracted between consecutive terms.<br>
            <span class="math">d = term₂ − term₁</span><br><br>
            <strong>Arithmetic sequence:</strong> add/subtract the same value each time.<br>
            <em>e.g.</em> <span class="math">3, 7, 11, 15, …</span> (d = 4)<br><br>
            <strong>Geometric sequence:</strong> multiply by the same value each time (covered in Topic 2).<br><br>
            <strong>General term formula (Tₙ):</strong> a formula to find any term.<br>
            For arithmetic: <span class="math">Tₙ = a + (n−1)d</span><br>
            where a = first term, d = common difference, n = term position.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Finding the general term</div>
          <div class="example-step"><span class="step-num">1</span><span>Sequence: <span class="math">5, 9, 13, 17, …</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>a = 5, d = 9 − 5 = 4</span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">Tₙ = 5 + (n−1)(4) = 5 + 4n − 4 = 4n + 1</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Check T₃: <span class="math">4(3) + 1 = 13</span> ✓</span></div>
          <div class="example-step"><span class="step-num">5</span><span>Find T₂₀: <span class="math">4(20) + 1 = 81</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Always verify your general term by substituting n = 1, 2, and 3. If all three match, your formula is correct.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Arithmetic Sequence Builder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter the first term and common difference to generate the sequence and general term.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">First term (a)</label>
                <input id="arA" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Common diff (d)</label>
                <input id="arD" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Find term n =</label>
                <input id="arN" type="number" value="10" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div id="arOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('arA').value)||0;
              const d=parseFloat(document.getElementById('arD').value)||0;
              const n=parseInt(document.getElementById('arN').value)||10;
              // First 8 terms
              const terms=Array.from({length:8},(_,i)=>a+i*d);
              const tn=a+(n-1)*d;
              // General term formula
              const c=a-d; // Tn = dn + c
              const formulaStr=(d===0?a:(d>0?d+'n'+(c>0?' + '+c:c<0?' − '+Math.abs(c):''):(d<0?d+'n'+(c>0?' + '+c:c<0?' − '+Math.abs(c):''):'')));
              document.getElementById('arOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">First 8 terms:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', …</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">General term:</span><span style="color:#fbbf24;">Tₙ = '+formulaStr+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">T<sub>'+n+'</sub>:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+tn+'</span></div>',
                '<div style="font-size:10px;opacity:0.45;">Derived from: Tₙ = a + (n−1)d = '+a+' + (n−1)('+d+')</div>',
              ].join('');
            }
            ['arA','arD','arN'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "What is the common difference of: <span class='math'>2, 8, 14, 20, …</span>?", options: ["4", "6", "8", "10"], answer: 1, topic: "Patterns" },
      { type: "input", text: "Find the next two terms: <span class='math'>3, 7, 11, 15, __, __</span> (format: x,y)", answer: "19,23", topic: "Patterns" },
      { type: "mc", text: "The general term of a sequence is <span class='math'>Tₙ = 3n − 1</span>. What is T₅?", options: ["14", "12", "16", "10"], answer: 0, topic: "Patterns" },
      { type: "input", text: "A sequence has a = 4 and d = 5. What is the 10th term?", answer: "49", topic: "Patterns" },
      { type: "mc", text: "Which is the general term for <span class='math'>6, 10, 14, 18, …</span>?", options: ["Tₙ = 4n + 2", "Tₙ = 4n + 6", "Tₙ = 2n + 4", "Tₙ = 6n − 4"], answer: 0, topic: "Patterns" },
    ]
  },
  {
    id: 402,
    chapter: 4,
    name: "Geometric number patterns",
    fullName: "Geometric number patterns",
    lesson: {
      heading: "Geometric number patterns",
      sub: "Chapter 4 · Topic 2",
      body: `
        <p>In a <strong>geometric sequence</strong>, each term is multiplied by a constant value called the <strong>common ratio (r)</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Geometric sequences</div>
          <p>
            <strong>Common ratio (r):</strong> <span class="math">r = term₂ ÷ term₁</span><br><br>
            <strong>Examples:</strong><br>
            <span class="math">2, 6, 18, 54, …</span> → r = 3 (multiply by 3)<br>
            <span class="math">100, 50, 25, 12.5, …</span> → r = 0.5 (divide by 2)<br>
            <span class="math">1, −2, 4, −8, …</span> → r = −2<br><br>
            <strong>Visual/toothpick patterns</strong> are also geometric — count objects and find the multiplying rule.<br><br>
            <strong>Note:</strong> Gr 8 focuses on identifying and extending geometric sequences, not on the formal general term formula.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Worked example</div>
          <div class="example-step"><span class="step-num">1</span><span>Sequence: <span class="math">3, 12, 48, 192, …</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>r = 12 ÷ 3 = 4. Check: 48 ÷ 12 = 4 ✓</span></div>
          <div class="example-step"><span class="step-num">3</span><span>Next term: <span class="math">192 × 4 = 768</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Toothpick pattern</div>
          <div class="example-step"><span class="step-num">1</span><span>Squares made from toothpicks: 4, 7, 10, 13, … (arithmetic, d = 3)</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Triangles: 3, 5, 7, 9, … (arithmetic, d = 2)</span></div>
          <div class="example-step"><span class="step-num">3</span><span>Describe the pattern in words AND as a formula.</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>If terms are increasing by addition → arithmetic. If by multiplication → geometric. Check by dividing consecutive terms.</span></div>
      
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Geometric Sequence Builder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter the first term and common ratio. Enter a sequence to identify its type and rule.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">First term (a)</label>
                <input id="grA" type="number" value="2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Common ratio (r)</label>
                <input id="grR" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Find term n =</label>
                <input id="grN" type="number" value="6" min="1" max="12" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div style="margin-bottom:8px;border-top:1px solid rgba(255,255,255,0.07);padding-top:10px;">
              <span style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Or identify a sequence:</span>
              <div style="display:flex;gap:8px;margin-top:6px;">
                <input id="grSeq" type="text" value="4, 12, 36, 108" placeholder="e.g. 5, 10, 20, 40" style="flex:1;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
                <button id="grIdent" style="padding:6px 12px;border-radius:7px;border:none;background:rgba(99,102,241,0.25);color:#a5b4fc;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">Identify</button>
              </div>
            </div>
            <div id="grOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function build(){
              const a=parseFloat(document.getElementById('grA').value)||1;
              const r=parseFloat(document.getElementById('grR').value)||2;
              const n=parseInt(document.getElementById('grN').value)||6;
              const terms=Array.from({length:6},(_,i)=>+(a*Math.pow(r,i)).toFixed(6));
              const tn=+(a*Math.pow(r,n-1)).toFixed(6);
              document.getElementById('grOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">First 6 terms:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', …</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Common ratio:</span><span style="color:#fbbf24;">r = '+r+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">T<sub>'+n+'</sub>:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+tn+'</span></div>',
                '<div style="font-size:10px;opacity:0.45;">Tₙ = a × rⁿ⁻¹ = '+a+' × '+r+'^'+(n-1)+'</div>',
              ].join('');
            }
            function identify(){
              const nums=document.getElementById('grSeq').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              if(nums.length<3){document.getElementById('grOut').innerHTML='<span style="color:#fca5a5;">Enter at least 3 terms.</span>';return;}
              const diffs=nums.slice(1).map((v,i)=>v-nums[i]);
              const ratios=nums.slice(1).map((v,i)=>nums[i]!==0?+(v/nums[i]).toFixed(6):null);
              const isArith=diffs.every(d=>Math.abs(d-diffs[0])<0.001);
              const isGeom=ratios.every(r=>r!==null&&Math.abs(r-ratios[0])<0.001);
              let html='';
              if(isArith){html='<div><span style="color:#6ee7b7;">✓ Arithmetic sequence</span> — d = '+diffs[0]+'</div><div>Next term: <span style="color:#fcd34d;">'+(nums[nums.length-1]+diffs[0])+'</span></div>';}
              else if(isGeom){html='<div><span style="color:#6ee7b7;">✓ Geometric sequence</span> — r = '+ratios[0]+'</div><div>Next term: <span style="color:#fcd34d;">'+(+(nums[nums.length-1]*ratios[0]).toFixed(6))+'</span></div>';}
              else{html='<div><span style="color:#fbbf24;">Neither arithmetic nor geometric</span></div><div style="font-size:11px;opacity:0.55;">Differences: '+diffs.join(', ')+'</div><div style="font-size:11px;opacity:0.55;">Ratios: '+ratios.join(', ')+'</div>';}
              document.getElementById('grOut').innerHTML=html;
            }
            ['grA','grR','grN'].forEach(id=>document.getElementById(id).addEventListener('input',build));
            document.getElementById('grIdent').addEventListener('click',identify);
            build();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "What is the common ratio of: <span class='math'>5, 15, 45, 135, …</span>?", options: ["5", "10", "3", "15"], answer: 2, topic: "Patterns" },
      { type: "input", text: "Find the next term: <span class='math'>2, 8, 32, 128, __</span>", answer: "512", topic: "Patterns" },
      { type: "mc", text: "Which sequence is geometric?", options: ["2, 5, 8, 11, …", "3, 6, 12, 24, …", "1, 4, 9, 16, …", "10, 7, 4, 1, …"], answer: 1, topic: "Patterns" },
      { type: "input", text: "A geometric sequence has first term 5 and common ratio 3. What is the 4th term?", answer: "135", topic: "Patterns" },
      { type: "mc", text: "Squares made from toothpicks follow: 4, 7, 10, … What is the 8th term?", options: ["22", "25", "28", "31"], answer: 1, topic: "Patterns" },
    ]
  },
  {
    id: 403,
    chapter: 4,
    name: "Visual geometric patterns",
    fullName: "Visual and geometric patterns",
    lesson: {
      heading: "Visual and geometric patterns",
      sub: "Chapter 4 · Topic 3",
      body: `
        <p>CAPS requires you to work with <strong>geometric patterns</strong> — patterns built from objects like toothpicks, dots, or tiles. You must be able to count, describe, tabulate, and find a general rule for these patterns.</p>

        <div class="def-box">
          <div class="def-box-title">📖 Key terms</div>
          <p>
            <strong>Figure number (n):</strong> which position in the pattern (1st, 2nd, 3rd…).<br>
            <strong>Term (Tₙ):</strong> the number of objects in the nth figure.<br>
            <strong>Relationship:</strong> the rule connecting n to Tₙ.<br><br>
            Most visual patterns at Grade 8 level are <strong>arithmetic</strong> — each figure adds the same number of objects.
          </p>
        </div>

        <div class="example-box">
          <div class="example-box-title">✏️ Example 1 — Matchstick squares</div>
          <div style="display:flex;gap:20px;align-items:flex-end;margin:12px 0 8px;flex-wrap:wrap;">
            <div style="text-align:center;">
              <svg width="40" height="40" viewBox="0 0 40 40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Figure 1<br>4 sticks</div>
            </div>
            <div style="text-align:center;">
              <svg width="75" height="40" viewBox="0 0 75 40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="35" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Figure 2<br>7 sticks</div>
            </div>
            <div style="text-align:center;">
              <svg width="110" height="40" viewBox="0 0 110 40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="35" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="65" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Figure 3<br>10 sticks</div>
            </div>
            <div style="text-align:center;">
              <svg width="145" height="40" viewBox="0 0 145 40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="35" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="65" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="95" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Figure 4<br>13 sticks</div>
            </div>
          </div>
          <div class="example-step"><span class="step-num">1</span><span>Count and tabulate:</span></div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:12px;margin:8px 0 12px;color:rgba(221,225,240,0.70);">
            n (figure):  1  |  2  |  3  |  4<br>
            Tₙ (sticks): 4  |  7  |  10 |  13
          </div>
          <div class="example-step"><span class="step-num">2</span><span>Find the common difference: <span class="math">d = 7 − 4 = 3</span> (arithmetic — add 3 each time)</span></div>
          <div class="example-step"><span class="step-num">3</span><span>General term: <span class="math">Tₙ = a + (n−1)d = 4 + (n−1)(3) = 3n + 1</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Verify: T₁ = 3(1)+1 = 4 ✓ &nbsp; T₃ = 3(3)+1 = 10 ✓</span></div>
          <div class="example-step"><span class="step-num">5</span><span>How many sticks for Figure 20? <span class="math">T₂₀ = 3(20)+1 = 61</span></span></div>
        </div>

        <div class="example-box">
          <div class="example-box-title">✏️ Example 2 — Dot triangles</div>
          <div style="display:flex;gap:24px;align-items:flex-end;margin:12px 0 8px;flex-wrap:wrap;">
            <div style="text-align:center;">
              <svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="5" fill="#a5b4fc"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Fig 1<br>1 dot</div>
            </div>
            <div style="text-align:center;">
              <svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="10" r="5" fill="#a5b4fc"/><circle cx="15" cy="35" r="5" fill="#a5b4fc"/><circle cx="35" cy="35" r="5" fill="#a5b4fc"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Fig 2<br>3 dots</div>
            </div>
            <div style="text-align:center;">
              <svg width="75" height="65" viewBox="0 0 75 65"><circle cx="37" cy="5" r="5" fill="#a5b4fc"/><circle cx="22" cy="30" r="5" fill="#a5b4fc"/><circle cx="52" cy="30" r="5" fill="#a5b4fc"/><circle cx="7" cy="56" r="5" fill="#a5b4fc"/><circle cx="37" cy="56" r="5" fill="#a5b4fc"/><circle cx="67" cy="56" r="5" fill="#a5b4fc"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Fig 3<br>6 dots</div>
            </div>
          </div>
          <div class="example-step"><span class="step-num">1</span><span>Sequence: 1, 3, 6, 10, … (differences: 2, 3, 4 — not constant → not arithmetic)</span></div>
          <div class="example-step"><span class="step-num">2</span><span>This is a <strong>triangular number</strong> pattern: <span class="math">Tₙ = n(n+1)/2</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>T₅ = 5(6)/2 = 15. Verify by drawing figure 5.</span></div>
        </div>

        <div class="def-box">
          <div class="def-box-title">📖 How to approach any visual pattern in an exam</div>
          <p>
            <strong>Step 1:</strong> Count carefully and make a table (n vs Tₙ).<br>
            <strong>Step 2:</strong> Find the differences between consecutive terms.<br>
            <strong>Step 3:</strong> If differences are constant → arithmetic → use <span class="math">Tₙ = a + (n−1)d</span>.<br>
            <strong>Step 4:</strong> Verify your formula with at least 2 known terms.<br>
            <strong>Step 5:</strong> Answer the question (find a specific term, or find n given Tₙ).
          </p>
        </div>

        <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
          <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Matchstick Pattern Builder</div>
          <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Choose a pattern, build the table, and find the rule.</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;align-items:flex-end;">
            <div style="display:flex;flex-direction:column;gap:4px;">
              <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Pattern</label>
              <select id="vpPat" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="sq">Matchstick squares (Tₙ = 3n+1)</option>
                <option value="tri">Matchstick triangles (Tₙ = 2n+1)</option>
                <option value="L">L-shapes (Tₙ = 2n+1)</option>
                <option value="plus">Plus signs (Tₙ = 4n)</option>
              </select>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Find T<sub>n</sub> for n =</label>
              <input id="vpN" type="number" value="10" min="1" max="50" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
          </div>
          <div id="vpOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
        </div>
        <script>
        (function(){
          const pats = {
            sq:   { name:'Matchstick squares',   fn: n=>3*n+1,  a:4, d:3, formula:'3n + 1' },
            tri:  { name:'Matchstick triangles',  fn: n=>2*n+1,  a:3, d:2, formula:'2n + 1' },
            L:    { name:'L-shapes',              fn: n=>2*n+1,  a:3, d:2, formula:'2n + 1' },
            plus: { name:'Plus signs',            fn: n=>4*n,    a:4, d:4, formula:'4n' },
          };
          function update(){
            const key=document.getElementById('vpPat').value;
            const n=parseInt(document.getElementById('vpN').value)||10;
            const p=pats[key];
            const terms=Array.from({length:6},(_,i)=>p.fn(i+1));
            const tn=p.fn(n);
            document.getElementById('vpOut').innerHTML=[
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Pattern:</span><span style="color:#a5b4fc;">'+p.name+'</span></div>',
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">First 6 terms:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', …</span></div>',
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Common diff (d):</span><span style="color:#fbbf24;">'+p.d+'</span></div>',
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">General term:</span><span style="color:#fbbf24;">Tₙ = '+p.formula+'</span></div>',
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">T<sub>'+n+'</sub>:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+tn+'</span></div>',
            ].join('');
          }
          ['vpPat','vpN'].forEach(id=>document.getElementById(id).addEventListener('input',update));
          update();
        })();
        </script>
        <div class="tip-box"><span class="tip-icon">💡</span><span>In exams, visual pattern questions always include a diagram. Always make a table first — it makes finding the rule much easier.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Matchstick squares: 4, 7, 10, 13, … What is the general term?", options: ["Tₙ = 3n", "Tₙ = 3n + 1", "Tₙ = 4n − 1", "Tₙ = n + 3"], answer: 1, topic: "Visual patterns" },
      { type: "input", text: "A pattern of matchstick triangles gives: 3, 5, 7, 9, … How many matchsticks in the 15th figure?", answer: "31", topic: "Visual patterns" },
      { type: "mc", text: "The table shows: n = 1 → 5; n = 2 → 9; n = 3 → 13. What is the general term?", options: ["Tₙ = 4n + 1", "Tₙ = 5n", "Tₙ = 4n − 1", "Tₙ = n + 4"], answer: 0, topic: "Visual patterns" },
      { type: "input", text: "A dot pattern has rule Tₙ = 3n + 2. How many dots in figure 8?", answer: "26", topic: "Visual patterns" },
      { type: "mc", text: "Which term of the matchstick squares pattern (Tₙ = 3n + 1) equals 31?", options: ["n = 9", "n = 10", "n = 11", "n = 12"], answer: 1, topic: "Visual patterns" },
      { type: "input", text: "Tiles are arranged in an L-shape. Figure 1 has 3 tiles, figure 2 has 5, figure 3 has 7. How many tiles in figure 12?", answer: "25", topic: "Visual patterns" },
    ]
  },
  {
    id: 404,
    chapter: 4,
    name: "Ch 4 Exam focus",
    fullName: "Examination focus exercise",
    lesson: {
      heading: "Chapter 4 — Examination focus",
      sub: "Chapter 4 · Review",
      body: `
        <p>These exam-style questions mix numeric and geometric patterns. You may be asked to identify the type, find the rule, write a formula, or extend the sequence.</p>
        <div class="def-box">
          <div class="def-box-title">📋 Chapter 4 summary</div>
          <p>
            ✅ Arithmetic: constant difference (add/subtract)<br>
            ✅ Geometric: constant ratio (multiply/divide)<br>
            ✅ General term: <span class="math">Tₙ = a + (n−1)d</span> for arithmetic<br>
            ✅ Always verify formula by testing T₁, T₂, T₃<br>
            ✅ For visual patterns: count, tabulate, find the rule
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>In exams, always state whether a sequence is arithmetic or geometric and give the common difference or ratio before finding the formula.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Is <span class='math'>2, 6, 18, 54</span> arithmetic or geometric?", options: ["Arithmetic, d = 4", "Geometric, r = 3", "Arithmetic, d = 3", "Neither"], answer: 1, topic: "Patterns" },
      { type: "input", text: "Find the general term for: <span class='math'>7, 10, 13, 16, …</span> (format: 3n+4)", answer: "3n+4", topic: "Patterns" },
      { type: "mc", text: "The 5th term of a sequence is 23 and d = 4. What is the 1st term?", options: ["3", "7", "11", "5"], answer: 1, topic: "Patterns" },
      { type: "input", text: "A geometric sequence: 1, 3, 9, 27, … What is the 6th term?", answer: "243", topic: "Patterns" },
      { type: "mc", text: "Which general term gives the sequence <span class='math'>5, 8, 11, 14, …</span>?", options: ["Tₙ = 3n + 2", "Tₙ = 2n + 3", "Tₙ = 3n + 1", "Tₙ = n + 4"], answer: 0, topic: "Patterns" },
    ]
  }
  ],
  workbook: {
    chapter: 4, chapterName: "Numeric and Geometric Patterns",
    topics: [
      {
        name: "Arithmetic sequences",
        questions: [
          {
            num: "1",
            text: "Consider the sequence: 4, 11, 18, 25, …",
            parts: [
              { label: "a)", text: "State the type of sequence and the common difference.", marks: 2 },
              { label: "b)", text: "Write down the general term Tₙ.", marks: 3 },
              { label: "c)", text: "Calculate T₁₅.", marks: 2 },
              { label: "d)", text: "Which term of the sequence equals 109?", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "The 3rd term of an arithmetic sequence is 14 and the 7th term is 30.",
            parts: [
              { label: "a)", text: "Find the common difference.", marks: 3 },
              { label: "b)", text: "Find the first term.", marks: 2 },
              { label: "c)", text: "Write the general term.", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Geometric sequences",
        questions: [
          {
            num: "3",
            text: "Consider the sequence: 2, 6, 18, 54, …",
            parts: [
              { label: "a)", text: "Identify the type and state the common ratio.", marks: 2 },
              { label: "b)", text: "Write the next two terms.", marks: 2 },
              { label: "c)", text: "Calculate the 8th term.", marks: 3 },
            ]
          },
          {
            num: "4",
            text: "Toothpicks are arranged in a growing pattern of triangles: 3, 5, 7, 9, …",
            parts: [
              { label: "a)", text: "How many toothpicks are needed for the 6th figure?", marks: 2 },
              { label: "b)", text: "Write a formula for the number of toothpicks in the nth figure.", marks: 3 },
              { label: "c)", text: "A learner has 51 toothpicks. What is the largest figure they can make?", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 4, chapterName: "Chapter 4 — Numeric and Geometric Patterns",
    topics: [
      {
        name: "Arithmetic sequences",
        answers: [
          { num: "Q1a", ans: "Arithmetic; d = 7", note: "11−4 = 7" },
          { num: "Q1b", ans: "Tₙ = 7n − 3", note: "a=4, d=7; Tₙ = 4+(n−1)7 = 4+7n−7 = 7n−3" },
          { num: "Q1c", ans: "T₁₅ = 102", note: "7(15)−3 = 105−3 = 102" },
          { num: "Q1d", ans: "n = 16", note: "7n−3=109 → 7n=112 → n=16" },
          { num: "Q2a", ans: "d = 4", note: "T₇−T₃ = 30−14 = 16; 16÷4 terms apart = 4" },
          { num: "Q2b", ans: "a = 6", note: "T₃ = a+2d; 14 = a+8 → a=6" },
          { num: "Q2c", ans: "Tₙ = 4n + 2", note: "Tₙ = 6+(n−1)4 = 6+4n−4 = 4n+2" },
        ]
      },
      {
        name: "Geometric sequences",
        answers: [
          { num: "Q3a", ans: "Geometric; r = 3", note: "6÷2 = 3; 18÷6 = 3 ✓" },
          { num: "Q3b", ans: "162, 486", note: "54×3=162; 162×3=486" },
          { num: "Q3c", ans: "4 374", note: "T₈ = 2×3⁷ = 2×2187 = 4374" },
          { num: "Q4a", ans: "13 toothpicks", note: "d=2; T₆ = 3+(6−1)2 = 3+10 = 13" },
          { num: "Q4b", ans: "Tₙ = 2n + 1", note: "a=3, d=2; Tₙ = 3+(n−1)2 = 2n+1" },
          { num: "Q4c", ans: "Figure 25", note: "2n+1=51 → 2n=50 → n=25" },
        ]
      },
    ]
  }
});
