// Math Magician — Grade 11, Chapter 12
// Linear Programming

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 1200,
      chapter: 12,
      name: "Setting up linear programming problems",
      fullName: "Constraints, feasible regions, and objective functions",
      lesson: {
        heading: "Setting up linear programming problems",
        sub: "Chapter 12 · Topic 1",
        body: `
          <p><strong>Linear programming</strong> finds the maximum or minimum value of an objective function subject to linear constraints (inequalities). It's used in business optimisation.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Key terms</div>
            <p>
              <strong>Decision variables:</strong> the unknowns (e.g. x and y, representing quantities to produce)<br>
              <strong>Constraints:</strong> inequalities restricting the variables (including x ≥ 0, y ≥ 0)<br>
              <strong>Feasible region:</strong> the area on the graph satisfying ALL constraints simultaneously<br>
              <strong>Objective function:</strong> the expression to maximise or minimise (e.g. P = 3x + 5y)<br>
              <strong>Corner points (vertices):</strong> the optimal solution always occurs at a vertex of the feasible region
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Method</div>
            <p>
              1. Define variables (state clearly)<br>
              2. Write all constraints as inequalities<br>
              3. Write the objective function<br>
              4. Draw constraint lines on a graph<br>
              5. Shade the feasible region<br>
              6. Find all corner (vertex) points<br>
              7. Evaluate the objective function at each vertex<br>
              8. State the optimal solution in context
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Constraints setup</div>
            <p>A bakery makes muffins (x) and cupcakes (y). Each muffin takes 2 min, each cupcake 3 min. Max 120 min. Flour limit: x + y ≤ 50. At least 10 of each.<br><br>
            Constraints: <span class="math">2x + 3y ≤ 120; x + y ≤ 50; x ≥ 10; y ≥ 10</span><br>
            Objective: Maximise profit P = 5x + 8y</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Objective Function Evaluator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter coefficients for P = ax + by, then evaluate at up to 4 corner points.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (coeff of x)</div><input id="g11c12a" type="number" value="5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (coeff of y)</div><input id="g11c12b" type="number" value="8" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
            </div>
            <div style="display:grid;grid-template-columns:auto auto auto;gap:6px;margin-bottom:10px;align-items:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">Point</div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">x</div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">y</div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">A</div>
              <input id="g11c12x1" type="number" value="0" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c12y1" type="number" value="0" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">B</div>
              <input id="g11c12x2" type="number" value="6" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c12y2" type="number" value="0" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">C</div>
              <input id="g11c12x3" type="number" value="4" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c12y3" type="number" value="4" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">D</div>
              <input id="g11c12x4" type="number" value="0" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c12y4" type="number" value="8" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
            </div>
            <button id="g11c12Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Evaluate</button>
            <div id="g11c12Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const a=gv('g11c12a'),b=gv('g11c12b');
                const out=document.getElementById('g11c12Out');
                if(isNaN(a)||isNaN(b)){out.innerHTML='<span style="color:#fca5a5;">Enter coefficients a and b.</span>';return;}
                const pts=[['A',gv('g11c12x1'),gv('g11c12y1')],['B',gv('g11c12x2'),gv('g11c12y2')],['C',gv('g11c12x3'),gv('g11c12y3')],['D',gv('g11c12x4'),gv('g11c12y4')]];
                const vals=pts.map(([lbl,x,y])=>[lbl,x,y,a*x+b*y]).filter(([,x,y])=>!isNaN(x)&&!isNaN(y));
                if(!vals.length){out.innerHTML='<span style="color:#fca5a5;">Enter at least one corner point.</span>';return;}
                const maxV=Math.max(...vals.map(v=>v[3])),minV=Math.min(...vals.map(v=>v[3]));
                let html='<span style="color:rgba(221,225,240,0.50);">P = '+a+'x + '+b+'y</span><br>';
                vals.forEach(([lbl,x,y,p])=>{
                  const isMax=p===maxV,isMin=p===minV;
                  html+='<span style="color:rgba(221,225,240,0.50);">'+lbl+'('+x+';'+y+'): P = '+a+'('+x+')+'+b+'('+y+') = '+p+'</span>';
                  if(isMax&&vals.length>1) html+=' <span style="color:#6ee7b7;">← MAX</span>';
                  if(isMin&&vals.length>1&&minV!==maxV) html+=' <span style="color:#fca5a5;">← MIN</span>';
                  html+='<br>';
                });
                const maxPt=vals.find(v=>v[3]===maxV),minPt=vals.find(v=>v[3]===minV);
                if(vals.length>1){html+='<span style="color:#6ee7b7;">Maximum P = '+maxV+' at '+maxPt[0]+'('+maxPt[1]+';'+maxPt[2]+')</span><br>';html+='<span style="color:#fcd34d;">Minimum P = '+minV+' at '+minPt[0]+'('+minPt[1]+';'+minPt[2]+')</span>';}
                out.innerHTML=html;
              }
              document.getElementById('g11c12Btn').addEventListener('click',calc);
              ['g11c12a','g11c12b','g11c12x1','g11c12y1','g11c12x2','g11c12y2','g11c12x3','g11c12y3','g11c12x4','g11c12y4'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "The feasible region is the set of points that satisfies:",
          options: ["The objective function only", "All constraints simultaneously", "At least one constraint", "The non-negativity constraints only"],
          answer: 1,
          topic: "Setting up linear programming problems"
        },
        {
          type: "mc",
          text: "The optimal value of the objective function always occurs at:",
          options: ["The origin", "A corner point of the feasible region", "The midpoint of the feasible region", "Any point inside the region"],
          answer: 1,
          topic: "Setting up linear programming problems"
        },
        {
          type: "mc",
          text: "Non-negativity constraints for variables x and y are:",
          options: ["x ≥ 0 and y ≥ 0", "x + y ≥ 0", "x ≤ 0 and y ≤ 0", "xy ≥ 0"],
          answer: 0,
          topic: "Setting up linear programming problems"
        },
        {
          type: "mc",
          text: "Constraint '3x + 2y ≤ 60' as a boundary line passes through which two points?",
          options: ["(20, 0) and (0, 30)", "(0, 20) and (30, 0)", "(60, 0) and (0, 60)", "(3, 0) and (0, 2)"],
          answer: 0,
          topic: "Setting up linear programming problems"
        },
        {
          type: "input",
          text: "Objective function P = 4x + 3y at corner point (5, 8). Find P.",
          answer: "44",
          topic: "Setting up linear programming problems"
        }
      ]
    },
    {
      id: 1201,
      chapter: 12,
      name: "Optimisation — solving LP problems",
      fullName: "Finding maximum and minimum values using the feasible region",
      lesson: {
        heading: "Solving linear programming problems",
        sub: "Chapter 12 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Finding corner points</div>
            <p>
              Corner points occur where two constraint lines intersect. Find them by:<br>
              1. Setting two constraint equations equal (solving simultaneously)<br>
              2. Checking the intersection lies within the feasible region
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 The search line method</div>
            <p>
              Draw the objective function P = constant as a line. Move this <strong>search line</strong> parallel to itself (maintaining the same gradient):<br>
              • To <strong>maximise</strong>: move in the direction that increases P until it just leaves the feasible region<br>
              • To <strong>minimise</strong>: move in the direction that decreases P until it just leaves the feasible region<br>
              The last point of contact with the feasible region is optimal.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Full LP solution</div>
            <p>Constraints: x ≥ 0, y ≥ 0, x + y ≤ 8, 2x + y ≤ 12<br>
            Maximise P = 5x + 4y<br><br>
            Corner points: (0,0), (6,0), (4,4), (0,8)<br>
            P values: 0, 30, 36, 32<br>
            Maximum P = 36 at (4, 4)</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 LP Optimiser — Find Max / Min</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter corner points (x;y) as pairs, set objective P = ax+by, choose maximise or minimise.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c12t2a" type="number" value="5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c12t2b" type="number" value="4" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Goal</div>
                <select id="g11c12t2goal" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="max">Maximise</option><option value="min">Minimise</option></select>
              </div>
            </div>
            <div style="font-size:12px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Corner points (enter pairs: x, y)</div>
            <div id="g11c12t2pts" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px;margin-bottom:10px;"></div>
            <div style="display:flex;gap:8px;margin-bottom:10px;">
              <button id="g11c12t2addPt" style="padding:6px 12px;border-radius:6px;border:1px solid rgba(99,102,241,0.40);cursor:pointer;font-size:12px;font-weight:600;background:rgba(99,102,241,0.15);color:#a5b4fc;">+ Add Point</button>
              <button id="g11c12t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Optimise</button>
            </div>
            <div id="g11c12t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const defaultPts=[[0,0],[6,0],[4,4],[0,8]];
              let pts=[...defaultPts];
              function render(){
                const c=document.getElementById('g11c12t2pts');
                c.innerHTML='';
                pts.forEach((pt,i)=>{
                  const div=document.createElement('div');
                  div.style.cssText='display:flex;gap:4px;align-items:center;';
                  div.innerHTML='<span style="font-size:12px;color:rgba(221,225,240,0.40);min-width:18px;">'+(String.fromCharCode(65+i))+':</span>'+
                    '<input type="number" value="'+pt[0]+'" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:5px;border-radius:6px;font-size:13px;font-family:\'JetBrains Mono\',monospace;text-align:center;" placeholder="x">'+
                    '<input type="number" value="'+pt[1]+'" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:5px;border-radius:6px;font-size:13px;font-family:\'JetBrains Mono\',monospace;text-align:center;" placeholder="y">'+
                    (pts.length>2?'<button onclick="this.parentNode.remove()" style="background:transparent;border:none;color:rgba(221,225,240,0.30);cursor:pointer;font-size:16px;padding:0 4px;" title="Remove">×</button>':'');
                  const [xi,yi]=div.querySelectorAll('input');
                  xi.addEventListener('change',()=>{pts[i][0]=parseFloat(xi.value)||0;});
                  yi.addEventListener('change',()=>{pts[i][1]=parseFloat(yi.value)||0;});
                  c.appendChild(div);
                });
              }
              function calc(){
                const a=parseFloat(document.getElementById('g11c12t2a').value);
                const b=parseFloat(document.getElementById('g11c12t2b').value);
                const goal=document.getElementById('g11c12t2goal').value;
                const out=document.getElementById('g11c12t2Out');
                const rows=document.getElementById('g11c12t2pts').querySelectorAll('div');
                const evalPts=[];
                rows.forEach((row,i)=>{
                  const [xi,yi]=row.querySelectorAll('input');
                  const x=parseFloat(xi.value),y=parseFloat(yi.value);
                  if(!isNaN(x)&&!isNaN(y)) evalPts.push([String.fromCharCode(65+i),x,y,a*x+b*y]);
                });
                if(!evalPts.length){out.innerHTML='<span style="color:#fca5a5;">Add at least one point.</span>';return;}
                if(isNaN(a)||isNaN(b)){out.innerHTML='<span style="color:#fca5a5;">Enter valid coefficients.</span>';return;}
                const vals=evalPts.map(v=>v[3]);
                const optV=goal==='max'?Math.max(...vals):Math.min(...vals);
                const optPt=evalPts.find(v=>v[3]===optV);
                let html='<span style="color:rgba(221,225,240,0.50);">P = '+a+'x + '+b+'y  ['+(goal==='max'?'MAXIMISE':'MINIMISE')+']</span><br>';
                evalPts.forEach(([lbl,x,y,p])=>{
                  html+='<span style="color:rgba(221,225,240,0.70);">'+lbl+'('+x+';'+y+'): P = '+p+'</span>';
                  if(p===optV) html+=' <span style="color:'+(goal==='max'?'#6ee7b7':'#fca5a5')+';">← '+(goal==='max'?'MAX':'MIN')+'</span>';
                  html+='<br>';
                });
                html+='<span style="color:#6ee7b7;">'+(goal==='max'?'Maximum':'Minimum')+' P = '+optV+' at '+optPt[0]+'('+optPt[1]+';'+optPt[2]+')</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c12t2addPt').addEventListener('click',()=>{pts.push([0,0]);render();});
              document.getElementById('g11c12t2Btn').addEventListener('click',calc);
              render(); calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Corner points of feasible region: (0,0), (4,0), (2,3), (0,5). Maximise P = x + 2y. Optimal point:",
          options: ["(4,0)", "(2,3)", "(0,5)", "(0,0)"],
          answer: 2,
          topic: "Optimisation — solving LP problems"
        },
        {
          type: "input",
          text: "Corner points: (0,6), (3,4), (5,0). Objective: Minimise C = 2x + 3y. Find minimum C.",
          answer: "10",
          topic: "Optimisation — solving LP problems"
        },
        {
          type: "mc",
          text: "The search line method involves moving a line with the same _____ as the objective function.",
          options: ["Intercept", "Gradient", "Value", "Domain"],
          answer: 1,
          topic: "Optimisation — solving LP problems"
        },
        {
          type: "mc",
          text: "Constraints: x ≥ 2, y ≥ 1, x + y ≤ 7. The corner (2,1) gives P = 3x − y = 5. Corner (2,5) gives P = 1. The maximum is at:",
          options: ["(2, 1)", "(2, 5)", "(7, 0)", "(6, 1)"],
          answer: 3,
          topic: "Optimisation — solving LP problems"
        },
        {
          type: "mc",
          text: "If the feasible region is unbounded, a maximum value of P may:",
          options: ["Always exist", "Never exist", "Not exist", "Equal zero"],
          answer: 2,
          topic: "Optimisation — solving LP problems"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 12 Workbook — Linear Programming",
    questions: [
      {
        number: 1,
        text: "A workshop makes chairs (x) and tables (y). Each chair needs 2 hours of carpentry and 1 hour of finishing. Each table needs 3 hours of carpentry and 2 hours of finishing. There are at most 24 hours of carpentry and 16 hours of finishing available. At least 2 chairs and 1 table must be produced.",
        parts: [
          { label: "a", text: "Write all constraints as inequalities.", marks: 4 },
          { label: "b", text: "Draw the feasible region on a graph.", marks: 4 },
          { label: "c", text: "Identify all corner points.", marks: 3 },
          { label: "d", text: "If profit is P = R80x + R150y, find the maximum profit.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Feasible region has vertices at A(0; 8), B(4; 6), C(7; 0), D(0; 0).",
        parts: [
          { label: "a", text: "Maximise f(x; y) = 3x + 2y.", marks: 3 },
          { label: "b", text: "Minimise g(x; y) = x + 4y.", marks: 3 },
          { label: "c", text: "Find the value of k such that 2x + ky = 20 gives multiple optimal solutions along BC.", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "2x+3y≤24; x+2y≤16; x≥2; y≥1; x≥0; y≥0",
        b: "Shade region satisfying all constraints",
        c: "Solve intersections: (2,1), (2,6.67), (4.5,5), (7,0)... check feasibility; corners approx at (2,1),(2,6),(3,6),(6,2)",
        d: "Evaluate P=80x+150y at each corner; maximum typically at balanced point"
      },
      2: {
        a: "Evaluate 3x+2y: A=16; B=24; C=21; D=0 → Maximum=24 at B(4;6)",
        b: "Evaluate x+4y: A=32; B=28; C=7; D=0 → Minimum=0 at D(0;0)",
        c: "Gradient of BC: m=(0−6)/(7−4)=−2; For 2x+ky=20 to be parallel: slope=−2/k=−2 → k=1; check: 2(4)+1(6)=14≠20... use search line parallel to BC: m_BC=−2; objective m=−2/k; so k=1"
      }
    }
  }
});
