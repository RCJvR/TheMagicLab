// Math Magician — Grade 9, Chapter 6 data
// Functions and Relationships

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 11,
      chapter: 6,
      name: "Functions and mappings",
      fullName: "Functions, mappings and representations",
      lesson: {
        heading: "Functions and mappings",
        sub: "Chapter 6 · Topic 1",
        body: `
          <p>A <strong>function</strong> is a rule that assigns exactly one output value for each input value. Functions can be shown as tables, equations, ordered pairs, or graphs.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key vocabulary</div>
            <p>
              <strong>Input/Domain (x):</strong> set of allowed input values.<br>
              <strong>Output/Range (y):</strong> set of resulting output values.<br>
              <strong>Function notation:</strong> f(x) = ... reads "f of x equals ..."<br>
              <strong>Ordered pair:</strong> (x; y) — x is the input, y is the output.<br><br>
              A relation is a function if each x-value has <em>only one</em> y-value (vertical line test on a graph).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>f(x) = 3x − 1: f(4) = 3(4) − 1 = 11; f(−2) = 3(−2) − 1 = −7</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Given f(x) = 2x + 5: find x if f(x) = 17 → 2x + 5 = 17 → x = 6</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Table of values for y = x²: x: −2,−1,0,1,2 → y: 4,1,0,1,4</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>f(x) is NOT f &times; x. It means "the function f evaluated at x".</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Function Notation & Table of Values</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter a linear function f(x) = mx + c. Generate a table of values, find f(x) for any input, and solve for x given f(x).</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">m (gradient)</label><input id="fnM" type="number" value="3" step="any" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">c (y-intercept)</label><input id="fnC" type="number" value="-1" step="any" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Evaluate f(x): x=</label><input id="fnX" type="number" value="4" step="any" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Solve: f(x)=</label><input id="fnY" type="number" value="11" step="any" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
            </div>
            <div id="fnTable" style="overflow-x:auto;margin-bottom:10px;"></div>
            <div id="fnOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              var m=parseFloat(document.getElementById('fnM').value)||0;
              var c=parseFloat(document.getElementById('fnC').value)||0;
              var xVal=parseFloat(document.getElementById('fnX').value);
              var yVal=parseFloat(document.getElementById('fnY').value);
              var f=function(x){return m*x+c;};
              var xs=[-3,-2,-1,0,1,2,3];
              var mStr=(m===1?'':m===-1?'−':String(m));
              var cStr=c===0?'':(c>0?' + '+c:' − '+Math.abs(c));
              var funcStr='f(x) = '+mStr+'x'+cStr;
              // Table
              var th=xs.map(function(x){return '<th style="padding:4px 10px;color:#fbbf24;font-size:11px;">'+x+'</th>';}).join('');
              var td=xs.map(function(x){return '<td style="padding:4px 10px;color:#6ee7b7;font-size:11px;">'+f(x)+'</td>';}).join('');
              document.getElementById('fnTable').innerHTML='<table style="border-collapse:collapse;font-family:JetBrains Mono,monospace;font-size:11px;"><tr><th style="padding:4px 10px;color:rgba(221,225,240,0.45);">x</th>'+th+'</tr><tr><th style="padding:4px 10px;color:rgba(221,225,240,0.45);">f(x)</th>'+td+'</tr></table>';
              var lines=[];
              lines.push('<div><span style="color:rgba(221,225,240,0.45);">Function: </span><span style="color:#fbbf24;font-weight:700;">'+funcStr+'</span></div>');
              if(!isNaN(xVal)){lines.push('<div><span style="color:rgba(221,225,240,0.45);">f('+xVal+') = '+m+'('+xVal+')+'+c+' = </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+f(xVal)+'</span></div>');}
              if(!isNaN(yVal)&&m!==0){var sol=(yVal-c)/m;lines.push('<div><span style="color:rgba(221,225,240,0.45);">f(x)='+yVal+' → '+m+'x'+cStr+' = '+yVal+' → x = </span><span style="color:#a5b4fc;font-size:15px;font-weight:700;">'+sol+'</span></div>');}
              else if(m===0&&!isNaN(yVal)){lines.push('<div style="color:#fca5a5;">m = 0: constant function, cannot solve for x unless f(x) = '+c+'.</div>');}
              document.getElementById('fnOut').innerHTML=lines.join('');
            }
            ['fnM','fnC','fnX','fnY'].forEach(function(id){document.getElementById(id).addEventListener('input',update);});
            update();
          })();
          </script>
        Think of f as a machine that processes x.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Given f(x) = 4x − 3, calculate f(5).", answer: "17", topic: "Functions" },
        { type: "mc", text: "If g(x) = x² + 2, what is g(−3)?", options: ["7", "11", "−7", "13"], answer: 1, topic: "Functions" },
        { type: "input", text: "For f(x) = 5x + 2, find x if f(x) = 32.", answer: "6", topic: "Functions" },
        { type: "mc", text: "Which set of ordered pairs represents a function?", options: ["{(1;2),(2;3),(1;4)}", "{(1;2),(2;2),(3;2)}", "{(1;2),(1;3),(1;4)}", "None of these"], answer: 1, topic: "Functions" },
        { type: "input", text: "Complete the table for y = 2x − 1: when x = 0, y = ?", answer: "-1", topic: "Functions" },
      ]
    },
    {
      id: 12,
      chapter: 6,
      name: "Linear and non-linear functions",
      fullName: "Linear and non-linear functions — graphs",
      lesson: {
        heading: "Linear and non-linear functions",
        sub: "Chapter 6 · Topic 2",
        body: `
          <p>Functions are classified by the shape of their graphs.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Types of functions in Grade 9</div>
            <p>
              <strong>Linear:</strong> y = mx + c → straight-line graph. m = gradient (slope), c = y-intercept.<br>
              <strong>Parabola:</strong> y = x² → U-shaped curve (turning point at origin for y = x²).<br>
              <strong>Hyperbola:</strong> y = k/x → two curves, one in each of two opposite quadrants.<br>
              <strong>Exponential:</strong> y = bˣ (b > 0, b ≠ 1) → always positive, never touches x-axis.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Key features</div>
            <div class="example-step"><span class="step-num">1</span><span>y = 2x + 3: gradient = 2 (rises 2 for every 1 right), y-intercept = (0;3)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>y = x²: vertex (0;0), opens upward, axis of symmetry x = 0</span></div>
            <div class="example-step"><span class="step-num">3</span><span>y = 6/x: passes through (1;6), (2;3), (3;2), (6;1) and (−1;−6), (−2;−3)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>To sketch any function, always make a table of values first. 
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Parabola Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Adjust a, p, q in y = a(x&#8722;p)&#178; + q. Vertex, intercepts and range update live.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:10px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a</label><input id="pra2" type="number" value="-1" step="0.5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">p</label><input id="prp2" type="number" value="2" step="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">q</label><input id="prq2" type="number" value="4" step="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
            </div>
            <canvas id="parCanvas2" width="300" height="180" style="width:100%;max-width:300px;border-radius:8px;background:#0f0e1a;display:block;margin-bottom:10px;"></canvas>
            <div id="prOut2" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:1.9;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('pra2').value)||1;
              const p=parseFloat(document.getElementById('prp2').value)||0;
              const q=parseFloat(document.getElementById('prq2').value)||0;
              var f=function(x){return a*(x-p)*(x-p)+q;};
              var cv=document.getElementById('parCanvas2'),ctx=cv.getContext('2d');
              var W=cv.width,H=cv.height,cx=W/2,cy=H/2,sx=25,sy=18;
              ctx.clearRect(0,0,W,H);
              ctx.strokeStyle='rgba(255,255,255,0.12)';ctx.lineWidth=1;
              ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(W,cy);ctx.stroke();
              ctx.beginPath();ctx.moveTo(cx,0);ctx.lineTo(cx,H);ctx.stroke();
              ctx.strokeStyle='#6366f1';ctx.lineWidth=2;ctx.beginPath();
              var first=true;
              for(var px=0;px<W;px++){var xv=(px-cx)/sx,yv=f(xv),py=cy-yv*sy;if(py<-5||py>H+5){first=true;continue;}if(first){ctx.moveTo(px,py);}else{ctx.lineTo(px,py);}first=false;}
              ctx.stroke();
              var x2p=function(x){return cx+x*sx;},y2p=function(y){return cy-y*sy;};
              ctx.fillStyle='#fcd34d';ctx.beginPath();ctx.arc(x2p(p),y2p(q),4,0,2*Math.PI);ctx.fill();
              var yi=f(0);ctx.fillStyle='#6ee7b7';ctx.beginPath();ctx.arc(x2p(0),y2p(yi),3,0,2*Math.PI);ctx.fill();
              var disc=-q/a;var xInts=[];
              if(disc>0){var sq=Math.sqrt(disc);xInts=[p+sq,p-sq];}else if(disc===0){xInts=[p];}
              xInts.forEach(function(xi){ctx.fillStyle='#f59e0b';ctx.beginPath();ctx.arc(x2p(xi),y2p(0),3,0,2*Math.PI);ctx.fill();});
              var r=function(v){return Math.round(v*100)/100;};
              document.getElementById('prOut2').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">Vertex:</span><span style="color:#fcd34d;">('+p+', '+q+') '+(a>0?'\u2191 Min':'\u2193 Max')+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">Axis:</span><span style="color:#a5b4fc;">x = '+p+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">y-intercept:</span><span style="color:#6ee7b7;">(0, '+r(yi)+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">x-intercept(s):</span><span style="color:#f59e0b;">'+(xInts.length?xInts.map(r).join(', '):'None')+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:110px;display:inline-block;">Range:</span><span style="color:#a5b4fc;">'+(a>0?'y \u2265 '+q:'y \u2264 '+q)+'</span></div>',
              ].join('');
            }
            ['pra','prp','prq'].forEach(function(id){document.getElementById(id).addEventListener('input',update);});
            update();
          })();
          </script>
        Use at least 5 points for accuracy.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "What is the y-intercept of y = 3x − 7?", options: ["3", "7", "−7", "−3"], answer: 2, topic: "Functions" },
        { type: "mc", text: "Which function has a graph that is a U-shape (parabola)?", options: ["y = 3x + 1", "y = 3/x", "y = x²", "y = 2ˣ"], answer: 2, topic: "Functions" },
        { type: "input", text: "For y = 12/x, calculate y when x = 4.", answer: "3", topic: "Functions" },
        { type: "mc", text: "For y = 2x + 5, the gradient is:", options: ["5", "2", "7", "−5"], answer: 1, topic: "Functions" },
        { type: "mc", text: "The function y = 4/x is a:", options: ["Linear function", "Parabola", "Hyperbola", "Exponential"], answer: 2, topic: "Functions" },
      ]
    },
  ],
  workbook: {
    chapter: 6, chapterName: "Functions and Relationships",
    topics: [
      {
        name: "Functions and Notation",
        questions: [
          {
            num: "1",
            text: "Given f(x) = 3x² − x + 2:",
            parts: [
              { label: "a)", text: "Calculate f(0), f(1) and f(−2).", marks: 4 },
              { label: "b)", text: "Find x if f(x) = 12 (solve the equation).", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Graphs of Functions",
        questions: [
          {
            num: "2",
            text: "For the function y = 2x − 4:",
            parts: [
              { label: "a)", text: "Construct a table of values for x ∈ {−2; −1; 0; 1; 2; 3}.", marks: 3 },
              { label: "b)", text: "Draw the graph on a set of axes. Label intercepts.", marks: 4 },
              { label: "c)", text: "Write down the gradient and y-intercept.", marks: 2 },
              { label: "d)", text: "For what value of x is y = 0?", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "Consider y = 12/x.",
            parts: [
              { label: "a)", text: "Complete the table: x = 1, 2, 3, 4, 6, 12.", marks: 3 },
              { label: "b)", text: "In which quadrant does the other branch of the hyperbola lie?", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 6, chapterName: "Chapter 6 — Functions and Relationships",
    topics: [
      {
        name: "Functions and Notation",
        answers: [
          { num: "Q1a", ans: "f(0)=2; f(1)=4; f(−2)=16", note: "f(0)=0−0+2=2; f(1)=3−1+2=4; f(−2)=12+2+2=16" },
          { num: "Q1b", ans: "x = (1±√37)/6 (approximately x ≈ 1,18 or x ≈ −0,85)", note: "3x²−x+2=12 → 3x²−x−10=0 → quadratic formula; or accept completing the square" },
        ]
      },
      {
        name: "Graphs of Functions",
        answers: [
          { num: "Q2a", ans: "x:−2,−1,0,1,2,3 y:−8,−6,−4,−2,0,2", note: "y=2x−4" },
          { num: "Q2c", ans: "Gradient = 2; y-intercept = −4", note: "m=2, c=−4" },
          { num: "Q2d", ans: "x = 2", note: "2x−4=0 → x=2" },
          { num: "Q3a", ans: "y: 12, 6, 4, 3, 2, 1", note: "y=12/x" },
          { num: "Q3b", ans: "Third quadrant", note: "negative x and negative y" },
        ]
      },
    ]
  }
});
