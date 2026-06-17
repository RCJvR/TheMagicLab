// Math Magician — Grade 10, Chapter 6
// Functions

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 600,
      chapter: 6,
      name: "Linear, quadratic & hyperbolic functions",
      fullName: "Linear, quadratic, and hyperbolic functions — sketching and properties",
      lesson: {
        heading: "Linear, quadratic, and hyperbolic functions",
        sub: "Chapter 6 · Topic 1",
        body: `
          <p>A <strong>function</strong> assigns exactly one output (y-value) to each input (x-value). In Grade 10 we study five main function families.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Linear function: y = mx + c</div>
            <p>
              Straight line. <span class="math">m</span> = gradient (slope), <span class="math">c</span> = y-intercept.<br>
              Domain: ℝ, Range: ℝ<br>
              x-intercept: set y = 0; y-intercept: set x = 0
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Quadratic function: y = ax² + bx + c (or y = a(x−p)² + q)</div>
            <p>
              Parabola. <span class="math">a > 0</span>: opens up (minimum), <span class="math">a < 0</span>: opens down (maximum).<br>
              Vertex form <span class="math">y = a(x−p)² + q</span>: vertex at (p, q).<br>
              Axis of symmetry: <span class="math">x = p</span> (or <span class="math">x = −b/2a</span>)<br>
              Range: <span class="math">[q; ∞)</span> if a > 0, or <span class="math">(−∞; q]</span> if a < 0
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Hyperbolic function: y = a/x + q  (or y = a/(x+p) + q)</div>
            <p>
              Two branches. Asymptotes: <span class="math">x = −p</span> (vertical) and <span class="math">y = q</span> (horizontal).<br>
              Domain: ℝ \ {−p}, Range: ℝ \ {q}
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Sketch y = −(x+1)² + 4</div>
            <p>Vertex: (−1, 4) — maximum (a = −1 &lt; 0)<br>
            Axis of symmetry: x = −1<br>
            y-intercept: x=0 → y = −1 + 4 = 3<br>
            x-intercepts: −(x+1)² + 4 = 0 → (x+1)² = 4 → x = 1 or x = −3<br>
            Range: (−∞; 4]</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Parabola Properties</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a, p, q for <strong>y = a(x − p)² + q</strong> — all key properties instantly.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div>
                <input id="g10c6a" type="number" value="-1" step="0.5"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">p</div>
                <input id="g10c6p" type="number" value="-1" step="0.5"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div>
                <input id="g10c6q" type="number" value="4" step="0.5"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c6Btn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Analyse
              </button>
            </div>
            <div id="g10c6Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fmt(n){return Number.isInteger(n)?''+n:n.toFixed(2).replace(/\.?0+$/,'');}
              function run(){
                const a=parseFloat(document.getElementById('g10c6a').value);
                const p=parseFloat(document.getElementById('g10c6p').value);
                const q=parseFloat(document.getElementById('g10c6q').value);
                const out=document.getElementById('g10c6Out');
                if([a,p,q].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (a ≠ 0).</span>';return;}
                const yint=a*(-p)*(-p)+q; // x=0: a(0-p)²+q
                // x-intercepts: a(x-p)²+q=0 → (x-p)²=-q/a
                const disc=-q/a;
                let xintStr;
                if(disc<0) xintStr='None (parabola does not cross x-axis)';
                else if(disc===0) xintStr='x = '+fmt(p)+' (touches x-axis)';
                else { const sq=Math.sqrt(disc); xintStr='x = '+fmt(p+sq)+' and x = '+fmt(p-sq); }
                const opens=a>0?'upward (minimum)':'downward (maximum)';
                const range=a>0?'y ≥ '+fmt(q):'y ≤ '+fmt(q);
                let html='<span style="color:rgba(221,225,240,0.50);">Equation: </span><span style="color:#fcd34d;">y = '+fmt(a)+'(x − ('+fmt(p)+'))² + '+fmt(q)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Opens: </span><span style="color:#fcd34d;">'+opens+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Vertex: </span><span style="color:#6ee7b7;">('+fmt(p)+' ; '+fmt(q)+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Axis of symmetry: </span><span style="color:#fcd34d;">x = '+fmt(p)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">y-intercept: </span><span style="color:#fcd34d;">y = '+fmt(yint)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">x-intercept(s): </span><span style="color:#fcd34d;">'+xintStr+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Range: </span><span style="color:#6ee7b7;">'+range+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c6Btn').addEventListener('click',run);
              ['g10c6a','g10c6p','g10c6q'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Vertex form <span class="math">y = a(x−p)² + q</span> gives you everything at a glance: vertex (p, q), axis of symmetry x = p, and the direction of opening from a.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "For y = 2(x−3)² − 1, the vertex is:",
          options: ["(3, −1)", "(−3, 1)", "(3, 1)", "(−3, −1)"],
          answer: 0,
          topic: "Linear, quadratic & hyperbolic functions"
        },
        {
          type: "mc",
          text: "The axis of symmetry of y = −x² + 4x − 3 is:",
          options: ["x = 2", "x = −2", "x = 4", "x = 1"],
          answer: 0,
          topic: "Linear, quadratic & hyperbolic functions"
        },
        {
          type: "mc",
          text: "For y = 3/x − 2, the horizontal asymptote is:",
          options: ["y = 2", "y = −2", "x = 3", "x = 0"],
          answer: 1,
          topic: "Linear, quadratic & hyperbolic functions"
        },
        {
          type: "input",
          text: "For y = −x² + 4x + 5, find the maximum y-value.",
          answer: "9",
          topic: "Linear, quadratic & hyperbolic functions"
        },
        {
          type: "mc",
          text: "The range of y = (x−2)² + 3 is:",
          options: ["y ≥ 3", "y ≤ 3", "y ≥ 2", "all real numbers"],
          answer: 0,
          topic: "Linear, quadratic & hyperbolic functions"
        }
      ]
    },
    {
      id: 601,
      chapter: 6,
      name: "Exponential & trig functions",
      fullName: "Exponential functions, trigonometric functions, and graph interpretation",
      lesson: {
        heading: "Exponential and trigonometric functions",
        sub: "Chapter 6 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Exponential function: y = abˣ + q</div>
            <p>
              Base b > 0, b ≠ 1. Horizontal asymptote: y = q.<br>
              If b > 1: exponential growth. If 0 &lt; b &lt; 1: exponential decay.<br>
              Domain: ℝ; Range: y > q (if a > 0)<br>
              y-intercept: <span class="math">y = a·b⁰ + q = a + q</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Trigonometric functions (Grade 10 scope)</div>
            <p>
              <strong>y = a·sin(x) + q</strong> and <strong>y = a·cos(x) + q</strong>:<br>
              Amplitude = |a|, vertical shift = q<br>
              Period = 360°<br>
              Range: [q − |a|; q + |a|]<br><br>
              <strong>y = a·tan(x) + q</strong>:<br>
              Period = 180°; asymptotes at x = 90° + 180°n
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: y = 2sin x − 1 for x ∈ [0°; 360°]</div>
            <p>
              Amplitude = 2, vertical shift = −1<br>
              Maximum: 2(1) − 1 = 1 (at x = 90°)<br>
              Minimum: 2(−1) − 1 = −3 (at x = 270°)<br>
              Range: [−3; 1]<br>
              x-intercepts: sin x = ½ → x = 30° or 150°
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Reading graphs</div>
            <p>
              From a graph, identify: intercepts, turning points, asymptotes, axes of symmetry, domain, range, and periods. Always state the equation of asymptotes.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Trig Function Properties</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a and q for <strong>y = a · sin/cos(x) + q</strong> — amplitude, range, max and min.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Function</div>
                <select id="g10c6tfn"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin</option>
                  <option value="cos">cos</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div>
                <input id="g10c6ta" type="number" value="2" step="0.5"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div>
                <input id="g10c6tq" type="number" value="-1" step="0.5"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c6tBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Analyse
              </button>
            </div>
            <div id="g10c6tOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fmt(n){return Number.isInteger(n)?''+n:n.toFixed(2).replace(/\.?0+$/,'');}
              function run(){
                const fn=document.getElementById('g10c6tfn').value;
                const a=parseFloat(document.getElementById('g10c6ta').value);
                const q=parseFloat(document.getElementById('g10c6tq').value);
                const out=document.getElementById('g10c6tOut');
                if(isNaN(a)||isNaN(q)){out.innerHTML='<span style="color:#fca5a5;">Enter valid values.</span>';return;}
                const amp=Math.abs(a);
                const maxY=amp+q, minY=-amp+q;
                const maxX=fn==='sin'?'90°':'0° and 360°';
                const minX=fn==='sin'?'270°':'180°';
                if(a<0){/*flip*/}
                const actualMaxX=a>0?maxX:minX;
                const actualMinX=a>0?minX:maxX;
                let html='<span style="color:rgba(221,225,240,0.50);">Function: </span><span style="color:#fcd34d;">y = '+fmt(a)+'·'+fn+'(x) + '+fmt(q)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Amplitude: </span><span style="color:#fcd34d;">|a| = '+fmt(amp)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Period: </span><span style="color:#fcd34d;">360°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Maximum: </span><span style="color:#6ee7b7;">y = '+fmt(a>0?maxY:minY)+' at x = '+(a>0?maxX:minX)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Minimum: </span><span style="color:#fca5a5;">y = '+fmt(a>0?minY:maxY)+' at x = '+(a>0?minX:maxX)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Range: </span><span style="color:#6ee7b7;">['+fmt(Math.min(maxY,minY))+' ; '+fmt(Math.max(maxY,minY))+']</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Vertical shift: </span><span style="color:#fcd34d;">'+fmt(q)+(q>0?' (shifted up)':q<0?' (shifted down)':' (no shift)')+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c6tBtn').addEventListener('click',run);
              document.getElementById('g10c6tfn').addEventListener('change',run);
              ['g10c6ta','g10c6tq'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span><strong>a</strong> controls height (amplitude), <strong>q</strong> shifts the whole graph up or down. A negative <strong>a</strong> reflects the graph — the max and min positions swap.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "The asymptote of y = 3·2^x − 4 is:",
          options: ["y = 4", "y = −4", "y = 3", "x = 0"],
          answer: 1,
          topic: "Exponential & trig functions"
        },
        {
          type: "mc",
          text: "The amplitude of y = −3cos x + 1 is:",
          options: ["1", "−3", "3", "−2"],
          answer: 2,
          topic: "Exponential & trig functions"
        },
        {
          type: "mc",
          text: "The period of y = tan x is:",
          options: ["360°", "90°", "180°", "270°"],
          answer: 2,
          topic: "Exponential & trig functions"
        },
        {
          type: "input",
          text: "For y = 2sin x + 1, what is the maximum y-value?",
          answer: "3",
          topic: "Exponential & trig functions"
        },
        {
          type: "mc",
          text: "y = 2^x and y = (½)^x are related by:",
          options: ["They are the same graph", "One is a reflection of the other in the y-axis", "One is a reflection in the x-axis", "One is a vertical stretch of the other"],
          answer: 1,
          topic: "Exponential & trig functions"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 6 Workbook — Functions",
    questions: [
      {
        number: 1,
        text: "For the parabola y = −2x² + 8x − 6:",
        parts: [
          { label: "a", text: "Write in vertex form y = a(x−p)² + q.", marks: 3 },
          { label: "b", text: "State the vertex and axis of symmetry.", marks: 2 },
          { label: "c", text: "Find x- and y-intercepts.", marks: 4 },
          { label: "d", text: "State the range.", marks: 1 },
          { label: "e", text: "Sketch the graph.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "For the hyperbola y = 4/(x−2) + 1:",
        parts: [
          { label: "a", text: "State the asymptotes.", marks: 2 },
          { label: "b", text: "Find the x- and y-intercepts.", marks: 3 },
          { label: "c", text: "Sketch the graph.", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "Sketch y = sin x and y = 2cos x on the same set of axes for x ∈ [0°; 360°]. Label all intercepts and turning points.",
        parts: [
          { label: "a", text: "y = sin x", marks: 3 },
          { label: "b", text: "y = 2cos x", marks: 3 },
          { label: "c", text: "State the x-values where sin x > 2cos x.", marks: 3 }
        ]
      },
      {
        number: 4,
        text: "The graph of y = ab^x + q passes through (0, 5) and (1, 11) with asymptote y = 3.",
        parts: [
          { label: "a", text: "Use the asymptote to find q.", marks: 1 },
          { label: "b", text: "Find a and b.", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "y = −2(x−2)² + 2",
        b: "Vertex (2, 2); axis x = 2",
        c: "y-int: (0, −6); x-ints: solve −2x²+8x−6=0 → x²−4x+3=0 → x=1 or x=3",
        d: "Range: y ≤ 2",
        e: "Downward parabola through (0,−6), (1,0), (2,2), (3,0), (4,−6)"
      },
      2: {
        a: "x=2 (vertical), y=1 (horizontal)",
        b: "x-int: 4/(x−2)=−1 → x=−2; y-int: 4/(−2)+1=−1",
        c: "Two branches: Q1 relative to (2,1)"
      },
      3: {
        a: "sin x: zeros 0°,180°,360°; max (90°,1); min (270°,−1)",
        b: "2cos x: zeros 90°,270°; max (0°,2),(360°,2); min (180°,−2)",
        c: "Read from graph intersections"
      },
      4: {
        a: "q = 3",
        b: "a+3=5 → a=2; 2b+3=11 → b=4; y=2·4^x+3"
      }
    }
  }
});
