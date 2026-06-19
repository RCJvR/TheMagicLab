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

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Feasible Region Grapher</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Uses the corner points and objective function from the calculator above — click <strong>Plot</strong> to see the feasible polygon, corner points, and search lines for P.</p>
            <button id="g11c12gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Plot Feasible Region</button>
            <canvas id="g11c12gcv" style="width:100%;max-width:520px;display:block;border-radius:8px;background:rgba(15,10,40,0.88);border:1px solid rgba(99,102,241,0.22);"></canvas>
            <script>
            (function(){
              const cv=document.getElementById('g11c12gcv');
              const DPR=Math.min(window.devicePixelRatio||1,2);
              const W=520,H=320;
              cv.width=W*DPR;cv.height=H*DPR;
              const ctx=cv.getContext('2d');
              ctx.scale(DPR,DPR);
              const fmt=n=>(Math.round(n*100)/100)+'';

              function gv(id){return parseFloat(document.getElementById(id).value);}

              function convexHull(pts){
                if(pts.length<3)return pts;
                pts=[...pts].sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
                const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
                const lower=[],upper=[];
                for(const p of pts){while(lower.length>=2&&cross(lower[lower.length-2],lower[lower.length-1],p)<=0)lower.pop();lower.push(p);}
                for(const p of [...pts].reverse()){while(upper.length>=2&&cross(upper[upper.length-2],upper[upper.length-1],p)<=0)upper.pop();upper.push(p);}
                upper.pop();lower.pop();
                return lower.concat(upper);
              }

              function draw(){
                const a=gv('g11c12a'),b=gv('g11c12b');
                const raw=[['A',gv('g11c12x1'),gv('g11c12y1')],['B',gv('g11c12x2'),gv('g11c12y2')],['C',gv('g11c12x3'),gv('g11c12y3')],['D',gv('g11c12x4'),gv('g11c12y4')]];
                const pts=raw.filter(([,x,y])=>!isNaN(x)&&!isNaN(y));
                if(pts.length<2)return;

                const pvals=pts.map(([l,x,y])=>({l,x,y,p:a*x+b*y}));
                const maxP=Math.max(...pvals.map(v=>v.p)),minP=Math.min(...pvals.map(v=>v.p));

                const allX=pts.map(p=>p[1]),allY=pts.map(p=>p[2]);
                const pad=Math.max(2,...allX,...allY)*0.15+1;
                const xMn=Math.min(0,...allX)-pad,xMx=Math.max(...allX)+pad;
                const yMn=Math.min(0,...allY)-pad,yMx=Math.max(...allY)+pad;
                const pxC=x=>(x-xMn)/(xMx-xMn)*W;
                const pyC=y=>H-(y-yMn)/(yMx-yMn)*H;

                ctx.clearRect(0,0,W,H);
                // grid
                const step=Math.max(1,Math.round((xMx-xMn)/8));
                for(let x=Math.ceil(xMn/step)*step;x<=xMx;x+=step){
                  ctx.strokeStyle=x===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=x===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(pxC(x),0);ctx.lineTo(pxC(x),H);ctx.stroke();
                }
                for(let y=Math.ceil(yMn/step)*step;y<=yMx;y+=step){
                  ctx.strokeStyle=y===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=y===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(0,pyC(y));ctx.lineTo(W,pyC(y));ctx.stroke();
                }
                ctx.fillStyle='rgba(165,180,252,0.50)';ctx.font='10px monospace';
                const ay0=Math.max(12,Math.min(pyC(0)+13,H-4));
                const ax0=Math.max(20,Math.min(pxC(0)-4,W-20));
                ctx.textAlign='center';
                for(let x=Math.ceil(xMn/step)*step;x<=xMx;x+=step){if(x!==0)ctx.fillText(x,pxC(x),ay0);}
                ctx.textAlign='right';
                for(let y=Math.ceil(yMn/step)*step;y<=yMx;y+=step){if(y!==0)ctx.fillText(y,ax0,pyC(y)+4);}

                // feasible region polygon (convex hull of corner points)
                const hull=convexHull(pts.map(([,x,y])=>[x,y]));
                ctx.fillStyle='rgba(99,102,241,0.18)';
                ctx.beginPath();ctx.moveTo(pxC(hull[0][0]),pyC(hull[0][1]));
                hull.slice(1).forEach(([x,y])=>ctx.lineTo(pxC(x),pyC(y)));
                ctx.closePath();ctx.fill();
                ctx.strokeStyle='rgba(165,180,252,0.55)';ctx.lineWidth=1.5;ctx.stroke();

                // objective function search lines through each corner
                if(!isNaN(a)&&!isNaN(b)){
                  pvals.forEach(({x,y,p})=>{
                    const isOpt=p===maxP||p===minP;
                    ctx.save();ctx.strokeStyle=isOpt?'rgba(252,211,77,0.50)':'rgba(165,180,252,0.22)';
                    ctx.lineWidth=isOpt?1.5:1;ctx.setLineDash(isOpt?[]:[ 4,4]);
                    // line P=ax+by=p → y=(p-ax)/b if b≠0, else x=p/a
                    if(Math.abs(b)>0.001){
                      const fx=xx=>(p-a*xx)/b;
                      ctx.beginPath();ctx.moveTo(pxC(xMn),pyC(fx(xMn)));ctx.lineTo(pxC(xMx),pyC(fx(xMx)));ctx.stroke();
                    }
                    ctx.restore();
                  });
                }

                // corner point dots and labels
                pvals.forEach(({l,x,y,p})=>{
                  const isMax=p===maxP&&pvals.length>1,isMin=p===minP&&pvals.length>1&&minP!==maxP;
                  const color=isMax?'#6ee7b7':isMin?'#fca5a5':'#a5b4fc';
                  ctx.fillStyle=color;ctx.beginPath();ctx.arc(pxC(x),pyC(y),6,0,Math.PI*2);ctx.fill();
                  ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                  ctx.fillStyle=color;ctx.font='bold 10px monospace';ctx.textAlign='left';
                  const tag=isMax?' ★MAX':isMin?' ★MIN':'';
                  ctx.fillText(l+'('+fmt(x)+','+fmt(y)+') P='+fmt(p)+tag,pxC(x)+8,pyC(y)-8);
                });
              }

              document.getElementById('g11c12gBtn').addEventListener('click',draw);
              draw();
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

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 LP Feasible Region & Search Line Grapher</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Uses the points and objective function from the optimiser above — plots the feasible polygon, search lines, and highlights the optimal corner point.</p>
            <button id="g11c12t2gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Plot Graph</button>
            <canvas id="g11c12t2gcv" style="width:100%;max-width:520px;display:block;border-radius:8px;background:rgba(15,10,40,0.88);border:1px solid rgba(99,102,241,0.22);"></canvas>
            <script>
            (function(){
              const cv=document.getElementById('g11c12t2gcv');
              const DPR=Math.min(window.devicePixelRatio||1,2);
              const W=520,H=320;
              cv.width=W*DPR;cv.height=H*DPR;
              const ctx=cv.getContext('2d');
              ctx.scale(DPR,DPR);
              const fmt=n=>(Math.round(n*100)/100)+'';

              function convexHull(pts){
                if(pts.length<3)return pts;
                const s=[...pts].sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
                const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
                const lo=[],hi=[];
                for(const p of s){while(lo.length>=2&&cross(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p);}
                for(const p of [...s].reverse()){while(hi.length>=2&&cross(hi[hi.length-2],hi[hi.length-1],p)<=0)hi.pop();hi.push(p);}
                hi.pop();lo.pop();return lo.concat(hi);
              }

              function draw(){
                const a=parseFloat(document.getElementById('g11c12t2a').value);
                const b=parseFloat(document.getElementById('g11c12t2b').value);
                const goal=document.getElementById('g11c12t2goal').value;
                const rows=document.getElementById('g11c12t2pts').querySelectorAll('div');
                const rawPts=[];
                rows.forEach((row,i)=>{
                  const [xi,yi]=row.querySelectorAll('input');
                  const x=parseFloat(xi.value),y=parseFloat(yi.value);
                  if(!isNaN(x)&&!isNaN(y))rawPts.push({l:String.fromCharCode(65+i),x,y,p:a*x+b*y});
                });
                if(rawPts.length<2)return;

                const vals=rawPts.map(v=>v.p);
                const optV=goal==='max'?Math.max(...vals):Math.min(...vals);

                const allX=rawPts.map(v=>v.x),allY=rawPts.map(v=>v.y);
                const pad=Math.max(2,...allX,...allY)*0.15+1;
                const xMn=Math.min(0,...allX)-pad,xMx=Math.max(...allX)+pad;
                const yMn=Math.min(0,...allY)-pad,yMx=Math.max(...allY)+pad;
                const pxC=x=>(x-xMn)/(xMx-xMn)*W;
                const pyC=y=>H-(y-yMn)/(yMx-yMn)*H;

                ctx.clearRect(0,0,W,H);
                const step=Math.max(1,Math.round((xMx-xMn)/8));
                for(let x=Math.ceil(xMn/step)*step;x<=xMx;x+=step){
                  ctx.strokeStyle=x===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';ctx.lineWidth=x===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(pxC(x),0);ctx.lineTo(pxC(x),H);ctx.stroke();
                }
                for(let y=Math.ceil(yMn/step)*step;y<=yMx;y+=step){
                  ctx.strokeStyle=y===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';ctx.lineWidth=y===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(0,pyC(y));ctx.lineTo(W,pyC(y));ctx.stroke();
                }
                ctx.fillStyle='rgba(165,180,252,0.50)';ctx.font='10px monospace';
                const ay0=Math.max(12,Math.min(pyC(0)+13,H-4)),ax0=Math.max(20,Math.min(pxC(0)-4,W-20));
                ctx.textAlign='center';for(let x=Math.ceil(xMn/step)*step;x<=xMx;x+=step){if(x!==0)ctx.fillText(x,pxC(x),ay0);}
                ctx.textAlign='right';for(let y=Math.ceil(yMn/step)*step;y<=yMx;y+=step){if(y!==0)ctx.fillText(y,ax0,pyC(y)+4);}

                // feasible polygon
                const hull=convexHull(rawPts.map(v=>[v.x,v.y]));
                ctx.fillStyle='rgba(99,102,241,0.18)';
                ctx.beginPath();ctx.moveTo(pxC(hull[0][0]),pyC(hull[0][1]));
                hull.slice(1).forEach(([x,y])=>ctx.lineTo(pxC(x),pyC(y)));
                ctx.closePath();ctx.fill();
                ctx.strokeStyle='rgba(165,180,252,0.55)';ctx.lineWidth=1.5;ctx.stroke();

                // search lines
                if(!isNaN(a)&&!isNaN(b)&&Math.abs(b)>0.001){
                  rawPts.forEach(({p,p:pv})=>{
                    const isOpt=pv===optV;
                    ctx.save();ctx.strokeStyle=isOpt?'rgba(252,211,77,0.65)':'rgba(165,180,252,0.20)';
                    ctx.lineWidth=isOpt?2:1;if(!isOpt)ctx.setLineDash([4,4]);
                    const fy=xx=>(pv-a*xx)/b;
                    ctx.beginPath();ctx.moveTo(pxC(xMn),pyC(fy(xMn)));ctx.lineTo(pxC(xMx),pyC(fy(xMx)));ctx.stroke();
                    ctx.restore();
                  });
                }

                // corner dots
                rawPts.forEach(({l,x,y,p})=>{
                  const isOpt=p===optV;
                  const color=isOpt?(goal==='max'?'#6ee7b7':'#fca5a5'):'#a5b4fc';
                  ctx.fillStyle=color;ctx.beginPath();ctx.arc(pxC(x),pyC(y),6,0,Math.PI*2);ctx.fill();
                  ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                  ctx.fillStyle=color;ctx.font='bold 10px monospace';ctx.textAlign='left';
                  ctx.fillText(l+'('+fmt(x)+','+fmt(y)+') P='+fmt(p)+(isOpt?' ★':''),pxC(x)+8,pyC(y)-8);
                });
                // legend
                ctx.fillStyle='rgba(165,180,252,0.60)';ctx.font='10px monospace';ctx.textAlign='left';
                ctx.fillText((goal==='max'?'Maximise':'Minimise')+' P = '+a+'x + '+b+'y',7,14);
              }

              document.getElementById('g11c12t2gBtn').addEventListener('click',draw);
              draw();
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
        c: "For parallel gradients: m_BC=−2; objective m=−2/k; −2/k=−2 → k=1"
      }
    }
  }
});
