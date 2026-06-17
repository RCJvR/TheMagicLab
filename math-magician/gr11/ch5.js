// Math Magician — Grade 11, Chapter 5
// Functions

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 500,
      chapter: 5,
      name: "Quadratic, hyperbolic & exponential functions",
      fullName: "Advanced quadratic, hyperbolic, and exponential function analysis",
      lesson: {
        heading: "Advanced function analysis",
        sub: "Chapter 5 · Topic 1",
        body: `
          <p>Grade 11 goes deeper into functions — finding equations from graphs, average gradient, and the effect of parameters a, p, q.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Average gradient</div>
            <p>
              The average gradient between two points on a curve is the gradient of the chord joining them:<br>
              <span class="math">m_avg = (f(x₂) − f(x₁)) / (x₂ − x₁)</span><br><br>
              This approximates the instantaneous rate of change (introduced properly in Grade 12 calculus).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Effect of parameters — general forms</div>
            <p>
              <strong>Quadratic:</strong> <span class="math">y = a(x − p)² + q</span><br>
              a: direction and stretch; p: horizontal shift; q: vertical shift<br><br>
              <strong>Hyperbola:</strong> <span class="math">y = a/(x − p) + q</span><br>
              Asymptotes: x = p, y = q<br><br>
              <strong>Exponential:</strong> <span class="math">y = a · bˣ⁻ᵖ + q</span><br>
              Asymptote: y = q; y-intercept shifts with p
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Average gradient</div>
            <p>f(x) = x². Average gradient between x = 2 and x = 5:<br>
            <span class="math">m = (f(5) − f(2))/(5−2) = (25−4)/3 = 21/3 = 7</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Finding the equation from a graph</div>
            <p>Parabola with vertex (2; −3) passing through (0; 1):<br>
            <span class="math">y = a(x−2)² − 3</span><br>
            Sub (0; 1): <span class="math">1 = a(4) − 3 → a = 1</span><br>
            <span class="math">y = (x−2)² − 3</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Average Gradient Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a function and two x-values — calculate the average gradient (chord slope) between them.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Function type</div>
                <select id="g11c5ftype" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="quad">Quadratic: ax²+bx+c</option>
                  <option value="hyp">Hyperbola: a/(x−p)+q</option>
                  <option value="exp">Exponential: a·bˣ+q</option>
                </select>
              </div>
              <div id="g11c5quadP" style="display:flex;gap:6px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c5qa" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c5qb" type="number" value="0" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g11c5qc" type="number" value="0" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              </div>
              <div id="g11c5hypP" style="display:none;gap:6px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c5ha" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">p</div><input id="g11c5hp" type="number" value="0" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div><input id="g11c5hq" type="number" value="0" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              </div>
              <div id="g11c5expP" style="display:none;gap:6px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c5ea" type="number" value="1" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (base)</div><input id="g11c5eb" type="number" value="2" min="0.01" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div><input id="g11c5eq" type="number" value="0" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₁</div><input id="g11c5x1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₂</div><input id="g11c5x2" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c5Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c5Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              document.getElementById('g11c5ftype').addEventListener('change',()=>{
                const t=document.getElementById('g11c5ftype').value;
                document.getElementById('g11c5quadP').style.display=t==='quad'?'flex':'none';
                document.getElementById('g11c5hypP').style.display=t==='hyp'?'flex':'none';
                document.getElementById('g11c5expP').style.display=t==='exp'?'flex':'none';
              });
              function eval_(x){
                const t=document.getElementById('g11c5ftype').value;
                if(t==='quad'){const a=gv('g11c5qa'),b=gv('g11c5qb'),c=gv('g11c5qc');return a*x*x+b*x+c;}
                if(t==='hyp'){const a=gv('g11c5ha'),p=gv('g11c5hp'),q=gv('g11c5hq');return a/(x-p)+q;}
                const a=gv('g11c5ea'),b=gv('g11c5eb'),q=gv('g11c5eq');return a*Math.pow(b,x)+q;
              }
              document.getElementById('g11c5Btn').addEventListener('click',()=>{
                const x1=gv('g11c5x1'),x2=gv('g11c5x2');
                const out=document.getElementById('g11c5Out');
                if(isNaN(x1)||isNaN(x2)||x1===x2){out.innerHTML='<span style="color:#fca5a5;">Enter two different x-values.</span>';return;}
                try{
                  const y1=eval_(x1),y2=eval_(x2);
                  if(!isFinite(y1)||!isFinite(y2)){out.innerHTML='<span style="color:#fca5a5;">One or both x-values are undefined for this function (e.g., asymptote).</span>';return;}
                  const m=(y2-y1)/(x2-x1);
                  let html='<span style="color:rgba(221,225,240,0.50);">f('+x1+') = '+f(y1)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">f('+x2+') = '+f(y2)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">m_avg = (f('+x2+') − f('+x1+')) / ('+x2+' − '+x1+') = ('+f(y2)+' − '+f(y1)+') / '+f(x2-x1)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">Average gradient = '+f(m)+'</span>';
                  out.innerHTML=html;
                }catch(e){out.innerHTML='<span style="color:#fca5a5;">Error evaluating function.</span>';}
              });
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The average gradient is the slope of the <strong>chord</strong> between two points — it approximates the instantaneous rate of change. As x₁ → x₂, it approaches the derivative (Grade 12 calculus).</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Average gradient of f(x) = 2x² between x = 1 and x = 3:",
          options: ["8", "16", "4", "6"],
          answer: 0,
          topic: "Quadratic, hyperbolic & exponential functions"
        },
        {
          type: "mc",
          text: "y = a/(x−2) + 3. The vertical asymptote is:",
          options: ["y = 3", "x = 3", "x = 2", "y = 2"],
          answer: 2,
          topic: "Quadratic, hyperbolic & exponential functions"
        },
        {
          type: "mc",
          text: "A parabola has vertex (−1; 4) and a = −2. Its equation is:",
          options: ["y = −2(x+1)² + 4", "y = −2(x−1)² + 4", "y = 2(x+1)² − 4", "y = −2(x+1)² − 4"],
          answer: 0,
          topic: "Quadratic, hyperbolic & exponential functions"
        },
        {
          type: "input",
          text: "f(x) = x² − 4x. Find the average gradient between x = 1 and x = 4.",
          answer: "1",
          topic: "Quadratic, hyperbolic & exponential functions"
        },
        {
          type: "mc",
          text: "Exponential function y = 3 · 2^x + 1. What is the horizontal asymptote?",
          options: ["y = 3", "y = 1", "y = 2", "x = 1"],
          answer: 1,
          topic: "Quadratic, hyperbolic & exponential functions"
        }
      ]
    },
    {
      id: 501,
      chapter: 5,
      name: "Trigonometric functions — period, amplitude & phase shift",
      fullName: "Sine, cosine, and tangent functions with period, amplitude, and phase shift",
      lesson: {
        heading: "Trig functions — period, amplitude, and phase shift",
        sub: "Chapter 5 · Topic 2",
        body: `
          <p>Grade 11 extends trig graphs to include <strong>period changes</strong> and <strong>horizontal shifts (phase shifts)</strong>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 General form: y = a sin(bx + p) + q</div>
            <p>
              <strong>Amplitude</strong> = |a|<br>
              <strong>Period</strong> = 360°/|b| (for sin and cos)<br>
              <strong>Phase shift</strong> = −p/b (horizontal shift)<br>
              <strong>Vertical shift</strong> = q<br>
              Range: [q − |a|; q + |a|]
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: y = 2sin(2x − 60°) + 1</div>
            <p>
              a = 2 → amplitude = 2<br>
              b = 2 → period = 360°/2 = 180°<br>
              Phase shift: −(−60°)/2 = 30° (shifted 30° right)<br>
              Vertical shift: q = 1<br>
              Range: [−1; 3]<br>
              Max at x: 2x − 60° = 90° → x = 75°
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Tangent function: y = a tan(bx) + q</div>
            <p>
              Period = 180°/|b|<br>
              Asymptotes at: <span class="math">bx = 90° + 180°n</span><br>
              No amplitude (unbounded)
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Trig Function Property Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a, b, p, q for y = a·sin/cos(bx + p°) + q — get all key properties.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Type</div>
                <select id="g11c5t2trig" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option>sin</option><option>cos</option><option>tan</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c5t2a" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c5t2b" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">p (°)</div><input id="g11c5t2p" type="number" value="-60" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div><input id="g11c5t2q" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c5t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Analyse</button>
            </div>
            <div id="g11c5t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const trig=document.getElementById('g11c5t2trig').value;
                const a=parseFloat(document.getElementById('g11c5t2a').value);
                const b=parseFloat(document.getElementById('g11c5t2b').value);
                const p=parseFloat(document.getElementById('g11c5t2p').value);
                const q=parseFloat(document.getElementById('g11c5t2q').value);
                const out=document.getElementById('g11c5t2Out');
                if([a,b,p,q].some(isNaN)||b===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (b ≠ 0).</span>';return;}
                const amp=Math.abs(a);
                const period=trig==='tan'?180/Math.abs(b):360/Math.abs(b);
                const phaseShift=-p/b;
                const ps=phaseShift>=0?'right':'left';
                const isTan=trig==='tan';
                let html='<span style="color:rgba(221,225,240,0.50);">Function: y = '+a+'·'+trig+'('+b+'x + ('+p+'°)) + '+q+'</span><br>';
                html+='<span style="color:#fcd34d;">Amplitude: </span><span style="color:#6ee7b7;">'+(isTan?'None (unbounded)':amp)+'</span><br>';
                html+='<span style="color:#fcd34d;">Period: </span><span style="color:#6ee7b7;">'+f(period)+'°</span><br>';
                html+='<span style="color:#fcd34d;">Phase shift: </span><span style="color:#6ee7b7;">'+f(Math.abs(phaseShift))+'° '+ps+'</span><br>';
                html+='<span style="color:#fcd34d;">Vertical shift: </span><span style="color:#6ee7b7;">'+q+'</span><br>';
                if(!isTan){
                  const max=q+amp,min=q-amp;
                  html+='<span style="color:#fcd34d;">Range: </span><span style="color:#6ee7b7;">['+f(min)+'; '+f(max)+']</span><br>';
                  html+='<span style="color:#fcd34d;">Max: </span><span style="color:#6ee7b7;">'+f(max)+'</span>  <span style="color:#fcd34d;">Min: </span><span style="color:#6ee7b7;">'+f(min)+'</span>';
                } else {
                  html+='<span style="color:#fcd34d;">Asymptotes at: </span><span style="color:#6ee7b7;">bx + p = 90° + 180°n → x = (90°−'+p+')/'+b+' + 180°n/'+b+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c5t2Btn').addEventListener('click',calc);
              ['g11c5t2a','g11c5t2b','g11c5t2p','g11c5t2q'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Phase shift = −p/b. A positive phase shift means the graph moves <strong>right</strong>. For y = sin(2x − 60°): phase shift = −(−60°)/2 = +30° to the right.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Period of y = sin(3x):",
          options: ["180°", "90°", "120°", "270°"],
          answer: 2,
          topic: "Trigonometric functions — period, amplitude & phase shift"
        },
        {
          type: "mc",
          text: "y = 3cos(x − 45°). The graph is shifted:",
          options: ["45° left", "45° right", "3 units up", "3 units right"],
          answer: 1,
          topic: "Trigonometric functions — period, amplitude & phase shift"
        },
        {
          type: "input",
          text: "y = −2sin(x) + 3. What is the maximum y-value?",
          answer: "5",
          topic: "Trigonometric functions — period, amplitude & phase shift"
        },
        {
          type: "mc",
          text: "The period of y = tan(2x) is:",
          options: ["360°", "180°", "90°", "45°"],
          answer: 2,
          topic: "Trigonometric functions — period, amplitude & phase shift"
        },
        {
          type: "mc",
          text: "y = sin(x + 30°). Where is the first positive maximum?",
          options: ["x = 90°", "x = 60°", "x = 120°", "x = 30°"],
          answer: 1,
          topic: "Trigonometric functions — period, amplitude & phase shift"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 5 Workbook — Functions",
    questions: [
      {
        number: 1,
        text: "Sketch y = −(x+1)² + 4 for x ∈ [−4; 2]. Label all key features.",
        parts: [
          { label: "a", text: "Find the vertex and axis of symmetry.", marks: 2 },
          { label: "b", text: "Find x- and y-intercepts.", marks: 4 },
          { label: "c", text: "Find the average gradient between x = −3 and x = 0.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Sketch y = 2sin(2x) − 1 for x ∈ [0°; 360°]. Label intercepts, maxima, and minima.",
        parts: [
          { label: "a", text: "State amplitude, period, and range.", marks: 3 },
          { label: "b", text: "Find x-intercepts in [0°; 360°].", marks: 4 },
          { label: "c", text: "Find coordinates of maximum and minimum points.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "The graph of y = a/(x − p) + q has asymptotes x = 2 and y = −1, and passes through (4; 0).",
        parts: [
          { label: "a", text: "Write down p and q.", marks: 2 },
          { label: "b", text: "Find a.", marks: 3 },
          { label: "c", text: "Write the equation of the function.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Vertex (−1; 4); axis x = −1",
        b: "y-int: (0, 3); x-ints: −(x+1)²+4=0 → x=1 or x=−3",
        c: "f(−3)=−(−2)²+4=0; f(0)=3; m=(3−0)/(0−(−3))=1"
      },
      2: {
        a: "Amplitude=2; period=180°; range=[−3;1]",
        b: "2sin2x=1→sin2x=½→2x=30°,150°,390°,510°→x=15°,75°,195°,255°",
        c: "Max at 2x=90°→x=45°: y=1; min at x=135°: y=−3"
      },
      3: {
        a: "p=2; q=−1",
        b: "0=a/(4−2)−1→1=a/2→a=2",
        c: "y=2/(x−2)−1"
      }
    }
  }
});
