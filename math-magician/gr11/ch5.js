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

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Function Grapher — Quadratic · Hyperbola · Exponential</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Uses the inputs from the calculator above — click <strong>Plot Graph</strong> after entering parameters to see the curve and average-gradient chord.</p>
            <button id="g11c5gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Plot Graph</button>
            <canvas id="g11c5gcv" style="width:100%;max-width:520px;display:block;border-radius:8px;background:rgba(15,10,40,0.88);border:1px solid rgba(99,102,241,0.22);"></canvas>
            <script>
            (function(){
              const cv=document.getElementById('g11c5gcv');
              const DPR=Math.min(window.devicePixelRatio||1,2);
              const W=520,H=320;
              cv.width=W*DPR;cv.height=H*DPR;
              const ctx=cv.getContext('2d');
              ctx.scale(DPR,DPR);
              const fmt=n=>(Math.round(n*100)/100)+'';

              function gv(id){return parseFloat(document.getElementById(id).value);}

              function getFn(){
                const t=document.getElementById('g11c5ftype').value;
                if(t==='quad'){const a=gv('g11c5qa'),b=gv('g11c5qb'),c=gv('g11c5qc');return{fn:x=>a*x*x+b*x+c,type:'quad',a,b,c};}
                if(t==='hyp'){const a=gv('g11c5ha'),p=gv('g11c5hp'),q=gv('g11c5hq');return{fn:x=>a/(x-p)+q,type:'hyp',a,p,q};}
                const a=gv('g11c5ea'),b=gv('g11c5eb'),q=gv('g11c5eq');
                return{fn:x=>a*Math.pow(b,x)+q,type:'exp',a,b,q};
              }

              function draw(){
                const{fn,type,a,p,q,b:bv,c}=getFn();
                const x1=gv('g11c5x1'),x2=gv('g11c5x2');
                // Determine x range
                let xMn,xMx;
                if(type==='quad'){const vx=-bv/(2*a)||0;xMn=Math.min(vx,x1,x2)-6;xMx=Math.max(vx,x1,x2)+6;}
                else if(type==='hyp'){xMn=-9;xMx=9;}
                else{xMn=Math.min(-6,x1-1);xMx=Math.max(6,x2+1);}

                // Estimate y range by sampling
                const samples=[];
                for(let i=0;i<=60;i++){const x=xMn+(i/60)*(xMx-xMn);const y=fn(x);if(isFinite(y))samples.push(y);}
                let yMn=Math.min(...samples)-2,yMx=Math.max(...samples)+2;
                if(!isFinite(yMn))yMn=-10;if(!isFinite(yMx))yMx=10;
                yMn=Math.min(yMn,-2);yMx=Math.max(yMx,2);

                const px=x=>(x-xMn)/(xMx-xMn)*W;
                const py=y=>H-(y-yMn)/(yMx-yMn)*H;

                ctx.clearRect(0,0,W,H);
                // grid
                const xStep=Math.max(1,Math.round((xMx-xMn)/8));
                for(let x=Math.ceil(xMn/xStep)*xStep;x<=xMx;x+=xStep){
                  ctx.strokeStyle=x===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=x===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(px(x),0);ctx.lineTo(px(x),H);ctx.stroke();
                }
                const yStep=Math.max(1,Math.round((yMx-yMn)/8));
                for(let y=Math.ceil(yMn/yStep)*yStep;y<=yMx;y+=yStep){
                  ctx.strokeStyle=y===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=y===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(0,py(y));ctx.lineTo(W,py(y));ctx.stroke();
                }
                // axis labels
                ctx.fillStyle='rgba(165,180,252,0.55)';ctx.font='10px monospace';
                const ay0=Math.max(12,Math.min(py(0)+13,H-4));
                const ax0=Math.max(20,Math.min(px(0)-4,W-20));
                ctx.textAlign='center';
                for(let x=Math.ceil(xMn/xStep)*xStep;x<=xMx;x+=xStep){if(x!==0)ctx.fillText(x,px(x),ay0);}
                ctx.textAlign='right';
                for(let y=Math.ceil(yMn/yStep)*yStep;y<=yMx;y+=yStep){if(y!==0)ctx.fillText(y,ax0,py(y)+4);}

                // asymptotes
                if(type==='hyp'){
                  ctx.save();ctx.strokeStyle='rgba(252,165,165,0.45)';ctx.lineWidth=1;ctx.setLineDash([5,4]);
                  ctx.beginPath();ctx.moveTo(px(p),0);ctx.lineTo(px(p),H);ctx.stroke();
                  ctx.beginPath();ctx.moveTo(0,py(q));ctx.lineTo(W,py(q));ctx.stroke();
                  ctx.restore();
                  ctx.fillStyle='#fca5a5';ctx.font='bold 10px monospace';ctx.textAlign='left';
                  ctx.fillText('x='+fmt(p),px(p)+4,13);ctx.textAlign='right';ctx.fillText('y='+fmt(q),W-3,py(q)-5);
                }
                if(type==='exp'){
                  ctx.save();ctx.strokeStyle='rgba(252,165,165,0.40)';ctx.lineWidth=1;ctx.setLineDash([5,4]);
                  ctx.beginPath();ctx.moveTo(0,py(q));ctx.lineTo(W,py(q));ctx.stroke();ctx.restore();
                  ctx.fillStyle='#fca5a5';ctx.font='bold 10px monospace';ctx.textAlign='right';ctx.fillText('y='+fmt(q),W-3,py(q)-5);
                }

                // curve
                ctx.strokeStyle='#6ee7b7';ctx.lineWidth=2.5;ctx.lineJoin='round';
                ctx.beginPath();let on=false,pv=null;
                const N=W*2;
                for(let i=0;i<=N;i++){
                  const x=xMn+(i/N)*(xMx-xMn);
                  const y=fn(x);
                  if(!isFinite(y)||y<yMn-40||y>yMx+40){on=false;pv=null;continue;}
                  if(type==='hyp'&&pv!==null&&Math.abs(y-pv)>(yMx-yMn)*0.5){on=false;}
                  if(!on){ctx.moveTo(px(x),py(y));on=true;}else ctx.lineTo(px(x),py(y));
                  pv=y;
                }
                ctx.stroke();

                // average gradient chord
                if(!isNaN(x1)&&!isNaN(x2)&&x1!==x2){
                  const y1v=fn(x1),y2v=fn(x2);
                  if(isFinite(y1v)&&isFinite(y2v)){
                    const m=(y2v-y1v)/(x2-x1);
                    ctx.strokeStyle='rgba(252,211,77,0.80)';ctx.lineWidth=2;ctx.setLineDash([6,4]);
                    ctx.beginPath();ctx.moveTo(px(x1),py(y1v));ctx.lineTo(px(x2),py(y2v));ctx.stroke();
                    ctx.setLineDash([]);
                    // dots
                    [[x1,y1v,'#a5b4fc'],[x2,y2v,'#fca5a5']].forEach(([x,y,c])=>{
                      ctx.fillStyle=c;ctx.beginPath();ctx.arc(px(x),py(y),5.5,0,Math.PI*2);ctx.fill();
                      ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                    });
                    // slope label on chord
                    const ang=Math.atan2(py(y2v)-py(y1v),px(x2)-px(x1));
                    ctx.save();ctx.translate((px(x1)+px(x2))/2,(py(y1v)+py(y2v))/2);ctx.rotate(ang);
                    ctx.fillStyle='#fcd34d';ctx.font='bold 10px monospace';ctx.textAlign='center';
                    ctx.fillText('m_avg='+fmt(m),0,-9);ctx.restore();
                  }
                }
              }

              document.getElementById('g11c5gBtn').addEventListener('click',draw);
              draw();
            })();
            </script>
          </div>
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

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Phase shift = −p/b. A positive phase shift means the graph moves <strong>right</strong>. For y = sin(2x − 60°): phase shift = −(−60°)/2 = +30° to the right.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Trig Function Grapher — Period · Amplitude · Phase Shift</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Uses parameters from the calculator above — shows the wave with period markers, max/min dots, and phase shift annotation.</p>
            <button id="g11c5t2gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Plot Graph</button>
            <canvas id="g11c5t2gcv" style="width:100%;max-width:520px;display:block;border-radius:8px;background:rgba(15,10,40,0.88);border:1px solid rgba(99,102,241,0.22);"></canvas>
            <script>
            (function(){
              const cv=document.getElementById('g11c5t2gcv');
              const DPR=Math.min(window.devicePixelRatio||1,2);
              const W=520,H=320;
              cv.width=W*DPR;cv.height=H*DPR;
              const ctx=cv.getContext('2d');
              ctx.scale(DPR,DPR);
              const fmt=n=>(Math.round(n*10)/10)+'';
              const toR=d=>d*Math.PI/180;

              function draw(){
                const fn=document.getElementById('g11c5t2trig').value;
                const a=parseFloat(document.getElementById('g11c5t2a').value);
                const b=parseFloat(document.getElementById('g11c5t2b').value);
                const p=parseFloat(document.getElementById('g11c5t2p').value);
                const q=parseFloat(document.getElementById('g11c5t2q').value);
                if([a,b,p,q].some(isNaN)||b===0)return;

                const period=fn==='tan'?180/Math.abs(b):360/Math.abs(b);
                const phaseShift=-p/b;
                const amp=Math.abs(a);

                // x range: show 2 full periods, centred so phase shift is visible
                const xMn=Math.min(-period/2,phaseShift-period/4);
                const xMx=xMn+period*2;
                const yMn=fn==='tan'?-5:Math.min(q-amp-1,-3);
                const yMx=fn==='tan'?5:Math.max(q+amp+1,3);

                const px=x=>(x-xMn)/(xMx-xMn)*W;
                const py=y=>H-(y-yMn)/(yMx-yMn)*H;

                ctx.clearRect(0,0,W,H);

                // degree grid — label at multiples of period/4
                const step=period/4;
                for(let x=Math.ceil(xMn/step)*step;x<=xMx;x+=step){
                  const isAxis=Math.abs(x)<0.001;
                  ctx.strokeStyle=isAxis?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=isAxis?1.5:1;
                  ctx.beginPath();ctx.moveTo(px(x),0);ctx.lineTo(px(x),H);ctx.stroke();
                }
                for(let y=Math.ceil(yMn);y<=Math.floor(yMx);y++){
                  ctx.strokeStyle=y===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=y===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(0,py(y));ctx.lineTo(W,py(y));ctx.stroke();
                }

                // x axis labels in degrees
                ctx.fillStyle='rgba(165,180,252,0.55)';ctx.font='10px monospace';
                const ay0=Math.max(12,Math.min(py(0)+13,H-4));
                const ax0=Math.max(22,Math.min(px(0)-4,W-20));
                ctx.textAlign='center';
                for(let x=Math.ceil(xMn/step)*step;x<=xMx;x+=step){
                  if(Math.abs(x)>0.1)ctx.fillText(Math.round(x)+'°',px(x),ay0);
                }
                ctx.textAlign='right';
                for(let y=Math.ceil(yMn);y<=Math.floor(yMx);y++){if(y!==0)ctx.fillText(y,ax0,py(y)+4);}

                // period markers (vertical dashed at each full period)
                for(let n=-2;n<=3;n++){
                  const xm=phaseShift+n*period;
                  if(xm<xMn||xm>xMx)continue;
                  ctx.save();ctx.strokeStyle='rgba(165,180,252,0.25)';ctx.lineWidth=1;ctx.setLineDash([3,4]);
                  ctx.beginPath();ctx.moveTo(px(xm),0);ctx.lineTo(px(xm),H);ctx.stroke();ctx.restore();
                }

                // asymptote y=q (dashed)
                if(fn!=='tan'&&Math.abs(q)>0.01){
                  ctx.save();ctx.strokeStyle='rgba(252,165,165,0.30)';ctx.lineWidth=1;ctx.setLineDash([5,4]);
                  ctx.beginPath();ctx.moveTo(0,py(q));ctx.lineTo(W,py(q));ctx.stroke();ctx.restore();
                }

                // curve
                const trigFns={sin:d=>a*Math.sin(toR(b*d+p))+q,cos:d=>a*Math.cos(toR(b*d+p))+q,tan:d=>a*Math.tan(toR(b*d+p))+q};
                const curveFn=trigFns[fn];
                ctx.strokeStyle='#6ee7b7';ctx.lineWidth=2.5;ctx.lineJoin='round';
                ctx.beginPath();let on=false,pv=null;
                const N=W*3;
                for(let i=0;i<=N;i++){
                  const x=xMn+(i/N)*(xMx-xMn);
                  const y=curveFn(x);
                  if(!isFinite(y)||y<yMn-20||y>yMx+20){on=false;pv=null;continue;}
                  if(fn==='tan'&&pv!==null&&Math.abs(y-pv)>(yMx-yMn)*0.5){on=false;}
                  if(!on){ctx.moveTo(px(x),py(y));on=true;}else ctx.lineTo(px(x),py(y));
                  pv=y;
                }
                ctx.stroke();

                // max/min dots for sin/cos
                if(fn!=='tan'){
                  const maxY=a>0?q+amp:q-amp,minY=a>0?q-amp:q+amp;
                  // scan for max/min peaks
                  const peaks=[];
                  for(let n=-3;n<=5;n++){
                    let xMax,xMin;
                    if(fn==='sin'){xMax=(a>0?90:270)/b-p/b+n*period;xMin=(a>0?270:90)/b-p/b+n*period;}
                    else{xMax=(a>0?0:180)/b-p/b+n*period;xMin=(a>0?180:0)/b-p/b+n*period;}
                    if(xMax>=xMn&&xMax<=xMx)peaks.push([xMax,maxY,'#6ee7b7','max']);
                    if(xMin>=xMn&&xMin<=xMx)peaks.push([xMin,minY,'#fca5a5','min']);
                  }
                  peaks.forEach(([x,y,c,l])=>{
                    ctx.fillStyle=c;ctx.beginPath();ctx.arc(px(x),py(y),5,0,Math.PI*2);ctx.fill();
                    ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                    ctx.fillStyle=c;ctx.font='bold 10px monospace';ctx.textAlign='left';
                    ctx.fillText(l+' '+fmt(y),px(x)+7,py(y)+(l==='min'?14:-6));
                  });
                }

                // annotations (top-left info)
                const info=['Period: '+fmt(period)+'°','Amplitude: '+(fn==='tan'?'—':fmt(amp)),'Phase shift: '+fmt(Math.abs(phaseShift))+'° '+(phaseShift>=0?'right':'left'),'Range: '+(fn==='tan'?'ℝ':'['+fmt(q-amp)+', '+fmt(q+amp)+']')];
                ctx.fillStyle='rgba(165,180,252,0.60)';ctx.font='10px monospace';ctx.textAlign='left';
                info.forEach((t,i)=>ctx.fillText(t,7,14+i*14));
              }

              document.getElementById('g11c5t2gBtn').addEventListener('click',draw);
              draw();
            })();
            </script>
          </div>
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
    },
    {
      id: 502,
      chapter: 5,
      name: "Sketching functions: intercepts, domain & range",
      fullName: "Finding intercepts, domain, range, and the equation of a function from a sketch or given information",
      lesson: {
        heading: "Sketching functions — intercepts, domain and range",
        sub: "Chapter 5 · Topic 3",
        body: `
          <p>Before you can sketch a quadratic, hyperbola, or exponential graph accurately, you need to find its <strong>intercepts</strong>, its <strong>domain and range</strong>, and — often — work backwards from given features to find the equation itself.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Finding intercepts</div>
            <p>
              <strong>y-intercept:</strong> set x = 0 and evaluate.<br>
              <strong>x-intercept(s):</strong> set y = 0 and solve for x (factorise for a quadratic; for a hyperbola or exponential, isolate the variable algebraically).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Domain and range</div>
            <p>
              <strong>Quadratic</strong> y = a(x−p)² + q: domain x ∈ ℝ; range y ≥ q (if a &gt; 0) or y ≤ q (if a &lt; 0).<br>
              <strong>Hyperbola</strong> y = a/(x−p) + q: domain x ∈ ℝ, x ≠ p; range y ∈ ℝ, y ≠ q.<br>
              <strong>Exponential</strong> y = a·b^(x−p) + q: domain x ∈ ℝ; range y &gt; q (if a &gt; 0) or y &lt; q (if a &lt; 0).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Intercepts of a quadratic</div>
            <p>y = (x−1)(x+3)<br>
            y-intercept: x = 0 → y = (−1)(3) = −3 → (0; −3)<br>
            x-intercepts: y = 0 → x = 1 or x = −3 → (1; 0) and (−3; 0)</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Finding the equation from given features</div>
            <p>A hyperbola has asymptotes x = 1 and y = 2, and passes through (3; 3).<br>
            <span class="math">y = a/(x−1) + 2</span><br>
            Substitute (3; 3): <span class="math">3 = a/2 + 2 → a/2 = 1 → a = 2</span><br>
            Equation: <span class="math">y = 2/(x−1) + 2</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Intercepts, Domain &amp; Range Finder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Choose a function type and enter its parameters — see intercepts, domain, and range.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Function type</div>
                <select id="g11c5t3type" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="quad">Quadratic: a(x−p)²+q</option>
                  <option value="hyp">Hyperbola: a/(x−p)+q</option>
                  <option value="exp">Exponential: a·bˣ⁻ᵖ+q</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c5t3a" type="number" value="1" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div id="g11c5t3bDiv" style="display:none;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (base)</div><input id="g11c5t3b" type="number" value="2" min="0.01" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">p</div><input id="g11c5t3p" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div><input id="g11c5t3q" type="number" value="-3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c5t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Analyse</button>
            </div>
            <div id="g11c5t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              document.getElementById('g11c5t3type').addEventListener('change',()=>{
                const t=document.getElementById('g11c5t3type').value;
                document.getElementById('g11c5t3bDiv').style.display=t==='exp'?'':'none';
              });
              function calc(){
                const t=document.getElementById('g11c5t3type').value;
                const a=gv('g11c5t3a'),p=gv('g11c5t3p'),q=gv('g11c5t3q');
                const out=document.getElementById('g11c5t3Out');
                if([a,p,q].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (a ≠ 0).</span>';return;}
                let html='';
                if(t==='quad'){
                  const yInt=a*p*p+q;
                  const disc=-q/a;
                  html+='<span style="color:rgba(221,225,240,0.50);">y = '+a+'(x−'+p+')² + '+q+'</span><br>';
                  html+='<span style="color:#fcd34d;">y-intercept: </span><span style="color:#6ee7b7;">(0; '+f(yInt)+')</span><br>';
                  if(disc<0){html+='<span style="color:#fcd34d;">x-intercepts: </span><span style="color:#fca5a5;">none (turning point does not reach the x-axis)</span><br>';}
                  else{const d=Math.sqrt(disc);const x1=p-d,x2=p+d;html+='<span style="color:#fcd34d;">x-intercepts: </span><span style="color:#6ee7b7;">x = '+f(x1)+' and x = '+f(x2)+'</span><br>';}
                  html+='<span style="color:#fcd34d;">Turning point: </span><span style="color:#6ee7b7;">('+p+'; '+q+')</span><br>';
                  html+='<span style="color:#fcd34d;">Domain: </span><span style="color:#6ee7b7;">x ∈ ℝ</span> &nbsp; <span style="color:#fcd34d;">Range: </span><span style="color:#6ee7b7;">y '+(a>0?'≥':'≤')+' '+q+'</span>';
                } else if(t==='hyp'){
                  const yInt=p===0?NaN:(a/(-p)+q);
                  html+='<span style="color:rgba(221,225,240,0.50);">y = '+a+'/(x−'+p+') + '+q+'</span><br>';
                  if(p===0){html+='<span style="color:#fca5a5;">y-intercept undefined (asymptote at x = 0)</span><br>';}
                  else{html+='<span style="color:#fcd34d;">y-intercept: </span><span style="color:#6ee7b7;">(0; '+f(yInt)+')</span><br>';}
                  if(q===0){html+='<span style="color:#fca5a5;">x-intercept undefined (asymptote at y = 0)</span><br>';}
                  else{const xInt=p-a/q;html+='<span style="color:#fcd34d;">x-intercept: </span><span style="color:#6ee7b7;">('+f(xInt)+'; 0)</span><br>';}
                  html+='<span style="color:#fcd34d;">Asymptotes: </span><span style="color:#6ee7b7;">x = '+p+', y = '+q+'</span><br>';
                  html+='<span style="color:#fcd34d;">Domain: </span><span style="color:#6ee7b7;">x ∈ ℝ, x ≠ '+p+'</span> &nbsp; <span style="color:#fcd34d;">Range: </span><span style="color:#6ee7b7;">y ∈ ℝ, y ≠ '+q+'</span>';
                } else {
                  const b=gv('g11c5t3b');
                  if(isNaN(b)||b<=0){out.innerHTML='<span style="color:#fca5a5;">Enter a valid base b &gt; 0.</span>';return;}
                  const yInt=a*Math.pow(b,-p)+q;
                  html+='<span style="color:rgba(221,225,240,0.50);">y = '+a+'·'+b+'^(x−'+p+') + '+q+'</span><br>';
                  html+='<span style="color:#fcd34d;">y-intercept: </span><span style="color:#6ee7b7;">(0; '+f(yInt)+')</span><br>';
                  const canCrossX=(a>0&&-q/a>0)||(a<0&&-q/a>0);
                  if(q===0){html+='<span style="color:#fca5a5;">No x-intercept (asymptote y = 0 passes through it in the limit only)</span><br>';}
                  else if((a>0&&q<0)||(a<0&&q>0)){
                    const ratio=-q/a;const xInt=p+Math.log(ratio)/Math.log(b);
                    html+='<span style="color:#fcd34d;">x-intercept: </span><span style="color:#6ee7b7;">('+f(xInt)+'; 0)</span><br>';
                  } else {html+='<span style="color:#fca5a5;">No x-intercept (graph never reaches y = 0)</span><br>';}
                  html+='<span style="color:#fcd34d;">Asymptote: </span><span style="color:#6ee7b7;">y = '+q+'</span><br>';
                  html+='<span style="color:#fcd34d;">Domain: </span><span style="color:#6ee7b7;">x ∈ ℝ</span> &nbsp; <span style="color:#fcd34d;">Range: </span><span style="color:#6ee7b7;">y '+(a>0?'>':'<')+' '+q+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c5t3Btn').addEventListener('click',calc);
              ['g11c5t3a','g11c5t3b','g11c5t3p','g11c5t3q'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Always identify the asymptotes of a hyperbola or exponential <em>first</em> — they tell you p and q directly, since a hyperbola's asymptotes are x = p, y = q, and an exponential's horizontal asymptote is y = q.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "y = (x−2)(x+4). The x-intercepts are:",
          options: ["x = 2 and x = −4", "x = −2 and x = 4", "x = 2 and x = 4", "x = −2 and x = −4"],
          answer: 0,
          topic: "Sketching functions: intercepts, domain & range"
        },
        {
          type: "mc",
          text: "For y = 3/(x+1) − 2, the range is:",
          options: ["y ∈ ℝ, y ≠ −2", "y ∈ ℝ, y ≠ −1", "y ≥ −2", "y ≤ −2"],
          answer: 0,
          topic: "Sketching functions: intercepts, domain & range"
        },
        {
          type: "input",
          text: "y = 2(x−3)² + 5. What is the y-intercept? (Give just the y-value.)",
          answer: "23",
          topic: "Sketching functions: intercepts, domain & range"
        },
        {
          type: "mc",
          text: "A hyperbola has asymptotes x = 0 and y = 1, and passes through (2; 3). Its equation is:",
          options: ["y = 4/x + 1", "y = 2/x + 1", "y = 4/x − 1", "y = 1/x + 2"],
          answer: 0,
          topic: "Sketching functions: intercepts, domain & range"
        },
        {
          type: "mc",
          text: "y = −3(x+1)² + 2. The range of this function is:",
          options: ["y ≤ 2", "y ≥ 2", "y ≤ −1", "y ∈ ℝ"],
          answer: 0,
          topic: "Sketching functions: intercepts, domain & range"
        },
        {
          type: "mc",
          text: "An exponential graph y = a·bˣ + q has horizontal asymptote y = −2 and a > 0. Its range is:",
          options: ["y > −2", "y < −2", "y ≥ −2", "y ∈ ℝ"],
          answer: 0,
          topic: "Sketching functions: intercepts, domain & range"
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
