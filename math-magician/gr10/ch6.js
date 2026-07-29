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

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Function Grapher — Linear · Quadratic · Hyperbolic</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Choose a function type, adjust the parameters, and watch the graph update.</p>
            <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <button id="g10c6gmP" class="g10c6gm" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:rgba(99,102,241,0.30);color:#a5b4fc;">Parabola</button>
              <button id="g10c6gmH" class="g10c6gm" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:transparent;color:rgba(221,225,240,0.50);">Hyperbola</button>
              <button id="g10c6gmL" class="g10c6gm" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:transparent;color:rgba(221,225,240,0.50);">Linear</button>
            </div>
            <div id="g10c6ginp" style="margin-bottom:10px;"></div>
            <canvas id="g10c6gcv" style="width:100%;max-width:520px;display:block;border-radius:8px;background:rgba(15,10,40,0.88);border:1px solid rgba(99,102,241,0.22);"></canvas>
            <script>
            (function(){
              const cv=document.getElementById('g10c6gcv');
              const DPR=Math.min(window.devicePixelRatio||1,2);
              const W=520,H=320;
              cv.width=W*DPR;cv.height=H*DPR;
              const ctx=cv.getContext('2d');
              ctx.scale(DPR,DPR);
              let mode='para';
              let xMn=-8,xMx=8,yMn=-8,yMx=8;
              const px=x=>(x-xMn)/(xMx-xMn)*W;
              const py=y=>H-(y-yMn)/(yMx-yMn)*H;
              const fmt=n=>{const r=Math.round(n*100)/100;return r%1===0?r+'':r+'';}

              function drawGrid(){
                ctx.clearRect(0,0,W,H);
                for(let x=Math.ceil(xMn);x<=Math.floor(xMx);x++){
                  ctx.strokeStyle=x===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=x===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(px(x),0);ctx.lineTo(px(x),H);ctx.stroke();
                }
                for(let y=Math.ceil(yMn);y<=Math.floor(yMx);y++){
                  ctx.strokeStyle=y===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=y===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(0,py(y));ctx.lineTo(W,py(y));ctx.stroke();
                }
                ctx.fillStyle='rgba(165,180,252,0.55)';ctx.font='11px monospace';
                const ax0=Math.max(20,Math.min(px(0)-4,W-20));
                const ay0=Math.max(14,Math.min(py(0)+14,H-4));
                ctx.textAlign='center';
                for(let x=Math.ceil(xMn);x<=Math.floor(xMx);x++){if(x!==0)ctx.fillText(x,px(x),ay0);}
                ctx.textAlign='right';
                for(let y=Math.ceil(yMn);y<=Math.floor(yMx);y++){if(y!==0)ctx.fillText(y,ax0,py(y)+4);}
              }

              function curve(fn,color,skipJump){
                ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.lineJoin='round';
                ctx.beginPath();let on=false,pv=null;
                const N=W*2;
                for(let i=0;i<=N;i++){
                  const x=xMn+(i/N)*(xMx-xMn);
                  const y=fn(x);
                  if(!isFinite(y)||y<yMn-40||y>yMx+40){on=false;pv=null;continue;}
                  if(skipJump&&pv!==null&&Math.abs(y-pv)>(yMx-yMn)*0.5){on=false;}
                  if(!on){ctx.moveTo(px(x),py(y));on=true;}else ctx.lineTo(px(x),py(y));
                  pv=y;
                }
                ctx.stroke();
              }

              function dot(x,y,color){
                if(x<xMn-0.5||x>xMx+0.5||y<yMn-0.5||y>yMx+0.5)return;
                ctx.fillStyle=color;ctx.beginPath();ctx.arc(px(x),py(y),5,0,Math.PI*2);ctx.fill();
                ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
              }

              function lbl(x,y,text,color,dx,dy){
                dx=dx==null?8:dx;dy=dy==null?-13:dy;
                if(x<xMn-1||x>xMx+1)return;
                ctx.fillStyle=color;ctx.font='bold 10px monospace';ctx.textAlign='left';
                ctx.fillText(text,px(x)+dx,py(y)+dy);
              }

              function dashV(x,color){
                ctx.save();ctx.strokeStyle=color;ctx.lineWidth=1;ctx.setLineDash([5,4]);
                ctx.beginPath();ctx.moveTo(px(x),0);ctx.lineTo(px(x),H);ctx.stroke();ctx.restore();
              }
              function dashH(y,color){
                ctx.save();ctx.strokeStyle=color;ctx.lineWidth=1;ctx.setLineDash([5,4]);
                ctx.beginPath();ctx.moveTo(0,py(y));ctx.lineTo(W,py(y));ctx.stroke();ctx.restore();
              }

              function drawPara(){
                const a=parseFloat(document.getElementById('g10c6ga2').value);
                const p=parseFloat(document.getElementById('g10c6gp2').value);
                const q=parseFloat(document.getElementById('g10c6gq2').value);
                if([a,p,q].some(isNaN)||a===0)return;
                const span=Math.max(6,Math.abs(q)+4);
                xMn=p-7;xMx=p+7;
                if(a>0){yMn=q-1.5;yMx=q+span;}else{yMn=q-span;yMx=q+1.5;}
                xMn=Math.min(xMn,-2);xMx=Math.max(xMx,2);
                yMn=Math.min(yMn,-3);yMx=Math.max(yMx,3);
                drawGrid();
                dashV(p,'rgba(252,211,77,0.30)');
                curve(x=>a*(x-p)*(x-p)+q,'#6ee7b7',false);
                dot(p,q,'#fcd34d');lbl(p,q,'V('+fmt(p)+', '+fmt(q)+')','#fcd34d');
                const yi=a*p*p+q;
                dot(0,yi,'#a5b4fc');lbl(0,yi,'(0, '+fmt(yi)+')','#a5b4fc');
                const disc=-q/a;
                if(disc>0){
                  const sq=Math.sqrt(disc);
                  [p+sq,p-sq].forEach(xi=>{dot(xi,0,'#6ee7b7');lbl(xi,0,'('+fmt(xi)+', 0)','#6ee7b7',4,-14);});
                } else if(disc===0){
                  dot(p,0,'#6ee7b7');lbl(p,0,'('+fmt(p)+', 0)','#6ee7b7',4,-14);
                }
              }

              function drawHyp(){
                const a=parseFloat(document.getElementById('g10c6gha2').value);
                const p=parseFloat(document.getElementById('g10c6ghp2').value);
                const q=parseFloat(document.getElementById('g10c6ghq2').value);
                if([a,p,q].some(isNaN)||a===0)return;
                xMn=-9;xMx=9;yMn=-9;yMx=9;
                drawGrid();
                dashV(-p,'rgba(252,165,165,0.45)');
                dashH(q,'rgba(252,165,165,0.45)');
                ctx.fillStyle='#fca5a5';ctx.font='bold 10px monospace';
                ctx.textAlign='left';ctx.fillText('x='+fmt(-p),px(-p)+4,13);
                ctx.textAlign='right';ctx.fillText('y='+fmt(q),W-3,py(q)-5);
                curve(x=>a/(x+p)+q,'#6ee7b7',true);
                if(Math.abs(p)>0.01){const yi=a/p+q;if(Math.abs(yi)<9){dot(0,yi,'#a5b4fc');lbl(0,yi,'(0, '+fmt(yi)+')','#a5b4fc');}}
                if(Math.abs(q)>0.01){const xi=-p-a/q;if(Math.abs(xi)<9){dot(xi,0,'#fcd34d');lbl(xi,0,'('+fmt(xi)+', 0)','#fcd34d',4,-14);}}
              }

              function drawLin(){
                const m=parseFloat(document.getElementById('g10c6glm').value);
                const c=parseFloat(document.getElementById('g10c6glc').value);
                if([m,c].some(isNaN))return;
                xMn=-8;xMx=8;yMn=-8;yMx=8;
                drawGrid();
                curve(x=>m*x+c,'#6ee7b7',false);
                if(Math.abs(c)<=8){dot(0,c,'#a5b4fc');lbl(0,c,'(0, '+fmt(c)+')','#a5b4fc');}
                if(Math.abs(m)>0.01){const xi=-c/m;if(Math.abs(xi)<=8){dot(xi,0,'#fcd34d');lbl(xi,0,'('+fmt(xi)+', 0)','#fcd34d',4,-14);}}
              }

              const inp=document.getElementById('g10c6ginp');
              const IS='width:64px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;';
              const LS='font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;';
              const BS='background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;align-self:flex-end;';
              function fld(id,l,v){return '<div><div style="'+LS+'">'+l+'</div><input id="'+id+'" type="number" value="'+v+'" step="0.5" style="'+IS+'"></div>';}

              function renderInp(){
                let h='<div style="display:flex;gap:8px;flex-wrap:wrap;">';
                if(mode==='para') h+=fld('g10c6ga2','a','-1')+fld('g10c6gp2','p','-1')+fld('g10c6gq2','q','4');
                else if(mode==='hyp') h+=fld('g10c6gha2','a','2')+fld('g10c6ghp2','p','0')+fld('g10c6ghq2','q','0');
                else h+=fld('g10c6glm','m (slope)','2')+fld('g10c6glc','c','−1'.replace('−','-'));
                h+='<button id="g10c6gBtn" style="'+BS+'">Plot</button></div>';
                if(mode==='para') h+='<div style="font-size:11px;color:rgba(221,225,240,0.38);margin-top:5px;">y = a(x − p)² + q &nbsp;|&nbsp; vertex: (p, q) &nbsp;|&nbsp; axis: x = p</div>';
                if(mode==='hyp') h+='<div style="font-size:11px;color:rgba(221,225,240,0.38);margin-top:5px;">y = a/(x+p) + q &nbsp;|&nbsp; vertical asymptote: x = −p &nbsp;|&nbsp; horizontal: y = q</div>';
                inp.innerHTML=h;
                document.getElementById('g10c6gBtn').addEventListener('click',plot);
                inp.querySelectorAll('input').forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter')plot();}));
              }

              function plot(){if(mode==='para')drawPara();else if(mode==='hyp')drawHyp();else drawLin();}

              ['g10c6gmP','g10c6gmH','g10c6gmL'].forEach((id,i)=>{
                document.getElementById(id).addEventListener('click',function(){
                  mode=['para','hyp','lin'][i];
                  document.querySelectorAll('.g10c6gm').forEach(b=>{b.style.background='transparent';b.style.color='rgba(221,225,240,0.50)';});
                  this.style.background='rgba(99,102,241,0.30)';this.style.color='#a5b4fc';
                  renderInp();plot();
                });
              });
              renderInp();plot();
            })();
            </script>
          </div>
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
        },
        {
          type: "input",
          text: "A parabola has x-intercepts at x = −1 and x = 3, and a y-intercept of −6. Find the value of a in y = a(x+1)(x−3).",
          answer: "2",
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

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Function Grapher — Exponential · Trigonometric</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Visualise exponential growth/decay and trig waves — adjust parameters to see the graph change.</p>
            <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <button id="g10c6gm2E" class="g10c6gm2" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:rgba(99,102,241,0.30);color:#a5b4fc;">Exponential</button>
              <button id="g10c6gm2T" class="g10c6gm2" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:transparent;color:rgba(221,225,240,0.50);">Trig (sin/cos/tan)</button>
            </div>
            <div id="g10c6ginp2" style="margin-bottom:10px;"></div>
            <canvas id="g10c6gcv2" style="width:100%;max-width:520px;display:block;border-radius:8px;background:rgba(15,10,40,0.88);border:1px solid rgba(99,102,241,0.22);"></canvas>
            <script>
            (function(){
              const cv=document.getElementById('g10c6gcv2');
              const DPR=Math.min(window.devicePixelRatio||1,2);
              const W=520,H=320;
              cv.width=W*DPR;cv.height=H*DPR;
              const ctx=cv.getContext('2d');
              ctx.scale(DPR,DPR);
              let mode='exp';
              let xMn,xMx,yMn,yMx;
              const px=x=>(x-xMn)/(xMx-xMn)*W;
              const py=y=>H-(y-yMn)/(yMx-yMn)*H;
              const fmt=n=>{const r=Math.round(n*100)/100;return r+'';}
              const toRad=d=>d*Math.PI/180;

              function drawGrid(xLabels){
                ctx.clearRect(0,0,W,H);
                if(xLabels){
                  // degree-based grid for trig
                  [0,90,180,270,360].forEach(d=>{
                    ctx.strokeStyle=d===0||d===360?'rgba(99,102,241,0.14)':'rgba(99,102,241,0.14)';
                    ctx.lineWidth=1;
                    ctx.beginPath();ctx.moveTo(px(d),0);ctx.lineTo(px(d),H);ctx.stroke();
                  });
                  for(let y=Math.ceil(yMn);y<=Math.floor(yMx);y++){
                    ctx.strokeStyle=y===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                    ctx.lineWidth=y===0?1.5:1;
                    ctx.beginPath();ctx.moveTo(0,py(y));ctx.lineTo(W,py(y));ctx.stroke();
                  }
                  // x labels in degrees
                  ctx.fillStyle='rgba(165,180,252,0.55)';ctx.font='11px monospace';
                  const ay0=Math.max(14,Math.min(py(0)+14,H-4));
                  ctx.textAlign='center';
                  [0,90,180,270,360].forEach(d=>ctx.fillText(d+'°',px(d),ay0));
                  // y labels
                  ctx.textAlign='right';
                  const ax0=Math.max(26,Math.min(px(0)-4,W-20));
                  for(let y=Math.ceil(yMn);y<=Math.floor(yMx);y++){if(y!==0)ctx.fillText(y,ax0,py(y)+4);}
                } else {
                  for(let x=Math.ceil(xMn);x<=Math.floor(xMx);x++){
                    ctx.strokeStyle=x===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                    ctx.lineWidth=x===0?1.5:1;
                    ctx.beginPath();ctx.moveTo(px(x),0);ctx.lineTo(px(x),H);ctx.stroke();
                  }
                  for(let y=Math.ceil(yMn);y<=Math.floor(yMx);y++){
                    ctx.strokeStyle=y===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                    ctx.lineWidth=y===0?1.5:1;
                    ctx.beginPath();ctx.moveTo(0,py(y));ctx.lineTo(W,py(y));ctx.stroke();
                  }
                  ctx.fillStyle='rgba(165,180,252,0.55)';ctx.font='11px monospace';
                  const ax0=Math.max(20,Math.min(px(0)-4,W-20));
                  const ay0=Math.max(14,Math.min(py(0)+14,H-4));
                  ctx.textAlign='center';
                  for(let x=Math.ceil(xMn);x<=Math.floor(xMx);x++){if(x!==0)ctx.fillText(x,px(x),ay0);}
                  ctx.textAlign='right';
                  for(let y=Math.ceil(yMn);y<=Math.floor(yMx);y++){if(y!==0)ctx.fillText(y,ax0,py(y)+4);}
                }
              }

              function curve(fn,color,skipJump){
                ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.lineJoin='round';
                ctx.beginPath();let on=false,pv=null;
                const N=W*2;
                for(let i=0;i<=N;i++){
                  const x=xMn+(i/N)*(xMx-xMn);
                  const y=fn(x);
                  if(!isFinite(y)||y<yMn-50||y>yMx+50){on=false;pv=null;continue;}
                  if(skipJump&&pv!==null&&Math.abs(y-pv)>(yMx-yMn)*0.5){on=false;}
                  if(!on){ctx.moveTo(px(x),py(y));on=true;}else ctx.lineTo(px(x),py(y));
                  pv=y;
                }
                ctx.stroke();
              }

              function dot(x,y,color){
                if(x<xMn-0.5||x>xMx+0.5||y<yMn-0.5||y>yMx+0.5)return;
                ctx.fillStyle=color;ctx.beginPath();ctx.arc(px(x),py(y),5,0,Math.PI*2);ctx.fill();
                ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
              }

              function lbl(x,y,text,color,dx,dy){
                dx=dx==null?8:dx;dy=dy==null?-13:dy;
                ctx.fillStyle=color;ctx.font='bold 10px monospace';ctx.textAlign='left';
                ctx.fillText(text,px(x)+dx,py(y)+dy);
              }

              function dashH(y,color){
                ctx.save();ctx.strokeStyle=color;ctx.lineWidth=1;ctx.setLineDash([5,4]);
                ctx.beginPath();ctx.moveTo(0,py(y));ctx.lineTo(W,py(y));ctx.stroke();ctx.restore();
              }

              function drawExp(){
                const a=parseFloat(document.getElementById('g10c6gea').value);
                const b=parseFloat(document.getElementById('g10c6geb').value);
                const q=parseFloat(document.getElementById('g10c6geq').value);
                if([a,b,q].some(isNaN)||b<=0||b===1||a===0)return;
                xMn=-6;xMx=6;
                // estimate y range
                const yVals=[-6,-3,0,3,6].map(x=>a*Math.pow(b,x)+q).filter(isFinite);
                yMn=Math.min(q-1,...yVals)-1;yMx=Math.max(...yVals)+1;
                yMn=Math.min(yMn,-2);yMx=Math.max(yMx,2);
                drawGrid(false);
                dashH(q,'rgba(252,165,165,0.45)');
                ctx.fillStyle='#fca5a5';ctx.font='bold 10px monospace';ctx.textAlign='right';
                ctx.fillText('y='+fmt(q),W-3,py(q)-5);
                curve(x=>a*Math.pow(b,x)+q,'#6ee7b7',false);
                // y-intercept (x=0)
                const yi=a+q;
                dot(0,yi,'#fcd34d');lbl(0,yi,'(0, '+fmt(yi)+')','#fcd34d');
                // show growth/decay label
                const gd=b>1?'Growth (b='+fmt(b)+'>1)':'Decay (0<b='+fmt(b)+'<1)';
                ctx.fillStyle='rgba(165,180,252,0.50)';ctx.font='11px monospace';ctx.textAlign='left';
                ctx.fillText(gd,6,14);
              }

              function drawTrig(){
                const fn=document.getElementById('g10c6gtfn3').value;
                const a=parseFloat(document.getElementById('g10c6gta3').value);
                const q=parseFloat(document.getElementById('g10c6gtq3').value);
                if([a,q].some(isNaN))return;
                const amp=Math.abs(a);
                xMn=0;xMx=360;
                if(fn==='tan'){yMn=-6;yMx=6;}
                else{yMn=Math.min(-amp+q-0.5,-3);yMx=Math.max(amp+q+0.5,3);}
                drawGrid(true);
                const fmap={sin:d=>a*Math.sin(toRad(d))+q, cos:d=>a*Math.cos(toRad(d))+q, tan:d=>a*Math.tan(toRad(d))+q};
                curve(fmap[fn],'#6ee7b7',fn==='tan');
                // key points for sin & cos
                if(fn!=='tan'){
                  const maxD=fn==='sin'?(a>0?90:270):(a>0?0:180);
                  const minD=fn==='sin'?(a>0?270:90):(a>0?180:360);
                  const maxY=a>0?amp+q:-amp+q;
                  const minY=a>0?-amp+q:amp+q;
                  dot(maxD,maxY,'#6ee7b7');lbl(maxD,maxY,'max '+fmt(maxY),'#6ee7b7',6,-6);
                  dot(minD,minY,'#fca5a5');lbl(minD,minY,'min '+fmt(minY),'#fca5a5',6,14);
                  // y-intercept
                  const yi0=fmap[fn](0);
                  dot(0,yi0,'#fcd34d');lbl(0,yi0,'(0°, '+fmt(yi0)+')','#fcd34d',6,-6);
                  // zero crossings (approx for sin/cos shifted)
                  if(Math.abs(q)<amp){
                    const base=fn==='sin'?Math.asin(-q/a)*180/Math.PI:Math.acos(-q/a)*180/Math.PI;
                    [base, 180-base, 360+base].forEach(d=>{
                      if(d>=0&&d<=360){dot(d,0,'rgba(165,180,252,0.7)');lbl(d,0,Math.round(d)+'°','rgba(165,180,252,0.7)',4,-12);}
                    });
                  }
                }
                // period label
                const period=fn==='tan'?'Period: 180°':'Period: 360°';
                ctx.fillStyle='rgba(165,180,252,0.50)';ctx.font='11px monospace';ctx.textAlign='left';
                ctx.fillText('Range: ['+fmt(q-amp)+', '+fmt(q+amp)+']   '+period,6,14);
              }

              const inp=document.getElementById('g10c6ginp2');
              const IS='background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;';
              const LS='font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;';
              const BS='background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;align-self:flex-end;';
              function fld(id,l,v,w){return '<div><div style="'+LS+'">'+l+'</div><input id="'+id+'" type="number" value="'+v+'" step="0.5" style="width:'+(w||64)+'px;'+IS+'"></div>';}
              function sel(id,l,opts){
                let s='<div><div style="'+LS+'">'+l+'</div><select id="'+id+'" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;">';
                opts.forEach(o=>s+='<option value="'+o+'">'+o+'</option>');
                return s+'</select></div>';
              }

              function renderInp(){
                let h='<div style="display:flex;gap:8px;flex-wrap:wrap;">';
                if(mode==='exp'){
                  h+=fld('g10c6gea','a','3',60)+fld('g10c6geb','b (base)','2',64)+fld('g10c6geq','q','−1'.replace('−','-'),60);
                  h+='<button id="g10c6gBtn2" style="'+BS+'">Plot</button></div>';
                  h+='<div style="font-size:11px;color:rgba(221,225,240,0.38);margin-top:5px;">y = a·bˣ + q &nbsp;|&nbsp; asymptote: y = q &nbsp;|&nbsp; b > 0, b ≠ 1</div>';
                } else {
                  h+=sel('g10c6gtfn3','function',['sin','cos','tan'])+fld('g10c6gta3','a','2',60)+fld('g10c6gtq3','q','−1'.replace('−','-'),60);
                  h+='<button id="g10c6gBtn2" style="'+BS+'">Plot</button></div>';
                  h+='<div style="font-size:11px;color:rgba(221,225,240,0.38);margin-top:5px;">y = a·f(x) + q &nbsp;|&nbsp; x ∈ [0°; 360°]</div>';
                }
                inp.innerHTML=h;
                document.getElementById('g10c6gBtn2').addEventListener('click',plot);
                inp.querySelectorAll('input,select').forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter')plot();}));
                if(mode==='trig') document.getElementById('g10c6gtfn3').addEventListener('change',plot);
              }

              function plot(){if(mode==='exp')drawExp();else drawTrig();}

              ['g10c6gm2E','g10c6gm2T'].forEach((id,i)=>{
                document.getElementById(id).addEventListener('click',function(){
                  mode=['exp','trig'][i];
                  document.querySelectorAll('.g10c6gm2').forEach(b=>{b.style.background='transparent';b.style.color='rgba(221,225,240,0.50)';});
                  this.style.background='rgba(99,102,241,0.30)';this.style.color='#a5b4fc';
                  renderInp();plot();
                });
              });
              renderInp();plot();
            })();
            </script>
          </div>
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
        },
        {
          type: "input",
          text: "An exponential function y = ab^x + 2 passes through (0; 5) and (1; 11). Find the value of b.",
          answer: "3",
          topic: "Exponential & trig functions"
        }
      ]
    },
    {
      id: 602,
      chapter: 6,
      name: "The concept of a function",
      fullName: "Functions as unique input-output relationships across tables, graphs, words, and formulae",
      lesson: {
        heading: "The concept of a function",
        sub: "Chapter 6 · Topic 3",
        body: `
          <p>Before sketching graphs, it's essential to understand what makes a relationship a <strong>function</strong> in the first place.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Definition (Grade 10 level)</div>
            <p>
              A <strong>function</strong> is a relationship where each <strong>input value</strong> (independent variable, usually x) gives exactly <strong>one unique output value</strong> (dependent variable, usually y).<br>
              If any input produces more than one output, the relationship is <em>not</em> a function.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Four representations</div>
            <p>
              A function can be shown as:<br>
              • A <strong>table</strong> of input/output pairs<br>
              • A <strong>graph</strong> on the Cartesian plane<br>
              • A <strong>formula</strong> (equation), e.g. <span class="math">y = 2x + 1</span><br>
              • A <strong>verbal description</strong>, e.g. "double the input and add one"<br>
              You should be able to convert flexibly between all four.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Is this a function?</div>
            <p>
              Table: x = 1 → y = 2; x = 2 → y = 4; x = 3 → y = 6. Each x gives one y → <strong>function</strong>.<br>
              Table: x = 1 → y = 2; x = 1 → y = 5. The same x gives two different y-values → <strong>not a function</strong>.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 The vertical line test (graphical)</div>
            <p>
              If a vertical line drawn anywhere on the graph crosses the curve <strong>more than once</strong>, the relationship is <em>not</em> a function.<br>
              A circle, for example, fails this test — but a parabola opening upward passes it.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Discrete vs continuous</div>
            <p>Some real-world functions only make sense for whole-number inputs (e.g. number of learners in a class) — these are <strong>discrete</strong>. Others, like temperature over time, are <strong>continuous</strong>, taking any real value.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The words "input" and "output" map directly onto "independent variable" (x) and "dependent variable" (y) — the output <em>depends on</em> the input you choose.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Which of these tables represents a function?",
          options: ["x: 1,2,3 → y: 5,7,9", "x: 1,1,2 → y: 3,4,5", "x: 2,3,2 → y: 6,7,9", "x: 1,2,1 → y: 4,5,9"],
          answer: 0,
          topic: "The concept of a function"
        },
        {
          type: "mc",
          text: "A graph fails the vertical line test. This means:",
          options: ["It is not a function", "It is a linear function", "It has no y-intercept", "It is symmetric"],
          answer: 0,
          topic: "The concept of a function"
        },
        {
          type: "input",
          text: "A function is described as 'triple the input and subtract 2'. Write its formula using y and x (form: y = ax + b). Give the value of a.",
          answer: "3",
          topic: "The concept of a function"
        },
        {
          type: "mc",
          text: "Which real-world scenario is best modelled as a discrete function?",
          options: ["Number of cars sold per day", "Temperature during a day", "Height of a growing plant over time", "Distance travelled by a car over time"],
          answer: 0,
          topic: "The concept of a function"
        },
        {
          type: "mc",
          text: "In the function y = x² , the input x = −3 and x = 3 both give y = 9. Is y = x² still a valid function?",
          options: ["Yes — each input still gives only one output", "No — two inputs cannot share an output", "Only for positive x", "Only if x is restricted to integers"],
          answer: 0,
          topic: "The concept of a function"
        },
        {
          type: "mc",
          text: "Which of the following equations does NOT represent y as a function of x?",
          options: ["y = x² + 1", "x = y²", "y = 2x − 3", "y = |x|"],
          answer: 1,
          topic: "The concept of a function"
        }
      ]
    },
    {
      id: 603,
      chapter: 6,
      name: "Effect of parameters a and q",
      fullName: "Investigating how the parameters a and q transform y = x², y = 1/x, and y = bˣ",
      lesson: {
        heading: "Investigating the effect of parameters a and q",
        sub: "Chapter 6 · Topic 4",
        body: `
          <p>Once you know the basic shapes of <span class="math">y = x²</span>, <span class="math">y = 1/x</span>, and <span class="math">y = bˣ</span>, CAPS asks you to investigate what happens when you write <span class="math">y = a·f(x) + q</span>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The role of q — vertical shift</div>
            <p>
              Adding <span class="math">q</span> shifts the <strong>entire graph up or down</strong> by |q| units.<br>
              <span class="math">q > 0</span>: shift up. <span class="math">q < 0</span>: shift down.<br>
              For <span class="math">y = x² + q</span>: turning point moves from (0,0) to (0, q).<br>
              For <span class="math">y = 1/x + q</span>: horizontal asymptote moves from y = 0 to y = q.<br>
              For <span class="math">y = bˣ + q</span>: horizontal asymptote moves from y = 0 to y = q.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 The role of a — vertical stretch and reflection</div>
            <p>
              Multiplying by <span class="math">a</span> stretches (|a| &gt; 1) or compresses (0 &lt; |a| &lt; 1) the graph <strong>vertically</strong>.<br>
              If <span class="math">a &lt; 0</span>, the graph is also <strong>reflected about the x-axis</strong> (flipped upside down).<br>
              For <span class="math">y = ax²</span>: a &gt; 0 opens up, a &lt; 0 opens down — steeper for larger |a|.<br>
              For <span class="math">y = a/x</span>: a &gt; 0 puts branches in quadrants 1 & 3; a &lt; 0 puts them in quadrants 2 & 4.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Compare y = x², y = 2x², y = x² − 3</div>
            <p>
              <span class="math">y = x²</span>: standard parabola, turning point (0, 0).<br>
              <span class="math">y = 2x²</span>: same turning point, but <strong>narrower</strong> (stretched vertically by factor 2).<br>
              <span class="math">y = x² − 3</span>: same shape as y = x², but shifted <strong>down 3 units</strong>, turning point (0, −3).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Summary table</div>
            <p>
              | Parameter | Effect |<br>
              | a &gt; 0 | same orientation as parent graph |<br>
              | a &lt; 0 | reflected about the x-axis |<br>
              | \|a\| &gt; 1 | vertically stretched (steeper / narrower) |<br>
              | 0 &lt; \|a\| &lt; 1 | vertically compressed (flatter / wider) |<br>
              | q &gt; 0 | shifted up |<br>
              | q &lt; 0 | shifted down |
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Parameter Effect Explorer</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Choose a parent graph and adjust a and q — see the described transformation.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Parent graph</div>
                <select id="g10c6pgFn"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;">
                  <option value="sq">y = x²</option>
                  <option value="hyp">y = 1/x</option>
                  <option value="exp">y = bˣ (b=2)</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div>
                <input id="g10c6pgA" type="number" value="2" step="0.5"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div>
                <input id="g10c6pgQ" type="number" value="-3" step="0.5"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c6pgBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Describe
              </button>
            </div>
            <div id="g10c6pgOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fmt(n){return Number.isInteger(n)?''+n:n.toFixed(2).replace(/\\.?0+$/,'');}
              function run(){
                const fn=document.getElementById('g10c6pgFn').value;
                const a=parseFloat(document.getElementById('g10c6pgA').value);
                const q=parseFloat(document.getElementById('g10c6pgQ').value);
                const out=document.getElementById('g10c6pgOut');
                if(isNaN(a)||isNaN(q)||a===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (a ≠ 0).</span>';return;}
                const label=fn==='sq'?'x²':fn==='hyp'?'1/x':'2ˣ';
                let html='<span style="color:rgba(221,225,240,0.50);">Function: </span><span style="color:#fcd34d;">y = '+fmt(a)+'·'+label+' '+(q>=0?'+ '+fmt(q):'− '+fmt(Math.abs(q)))+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Orientation: </span><span style="color:#fcd34d;">'+(a>0?'same as parent graph':'reflected about the x-axis')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Stretch: </span><span style="color:#fcd34d;">'+(Math.abs(a)>1?'vertically stretched (narrower/steeper), factor '+fmt(Math.abs(a)):Math.abs(a)===1?'no stretch (same width)':'vertically compressed (wider/flatter), factor '+fmt(Math.abs(a)))+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Vertical shift: </span><span style="color:#fcd34d;">'+(q>0?fmt(q)+' units up':q<0?fmt(Math.abs(q))+' units down':'none')+'</span><br>';
                if(fn==='sq'){
                  html+='<span style="color:#6ee7b7;">Turning point: (0, '+fmt(q)+')</span>';
                } else if(fn==='hyp'){
                  html+='<span style="color:#6ee7b7;">Asymptotes: x = 0 and y = '+fmt(q)+'</span>';
                } else {
                  html+='<span style="color:#6ee7b7;">Horizontal asymptote: y = '+fmt(q)+'; y-intercept: y = '+fmt(a+q)+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c6pgBtn').addEventListener('click',run);
              document.getElementById('g10c6pgFn').addEventListener('change',run);
              ['g10c6pgA','g10c6pgQ'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Practise describing transformations in words first — "shifted down 3, reflected, stretched by 2" — before writing the equation. Examiners often ask you to go in <em>either</em> direction.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Compared to y = x², the graph of y = x² + 5 is:",
          options: ["Shifted up 5 units", "Shifted down 5 units", "Shifted left 5 units", "Stretched by factor 5"],
          answer: 0,
          topic: "Effect of parameters a and q"
        },
        {
          type: "mc",
          text: "The graph of y = −3x² compared to y = x² is:",
          options: ["Reflected and stretched (narrower, opens down)", "Reflected only (same width, opens down)", "Stretched only (opens up, narrower)", "Shifted down 3 units"],
          answer: 0,
          topic: "Effect of parameters a and q"
        },
        {
          type: "input",
          text: "For y = 1/x − 4, what is the equation of the horizontal asymptote?",
          answer: "y=-4",
          altAnswers: ["y = -4", "y=−4"],
          topic: "Effect of parameters a and q"
        },
        {
          type: "mc",
          text: "For y = 0.5x², compared to y = x², the graph is:",
          options: ["Vertically compressed (wider)", "Vertically stretched (narrower)", "Shifted down", "Reflected about the x-axis"],
          answer: 0,
          topic: "Effect of parameters a and q"
        },
        {
          type: "input",
          text: "For y = 2(x²) − 3, what is the y-coordinate of the turning point?",
          answer: "-3",
          altAnswers: ["−3"],
          topic: "Effect of parameters a and q"
        },
        {
          type: "input",
          text: "For y = −3(x+2)² + 7, the point (0; y) lies on the graph. Using the axis of symmetry, find the x-value of the other point on the graph with the same y-value.",
          answer: "-4",
          altAnswers: ["−4"],
          topic: "Effect of parameters a and q"
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
      },
      {
        number: 5,
        text: "The table below gives values of a quadratic function y = f(x):<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>x</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>y</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>8</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>8</td></tr></table>",
        parts: [
          { label: "a", text: "State the turning point of the function, reading directly from the table.", marks: 1 },
          { label: "b", text: "State the equation of the axis of symmetry.", marks: 1 },
          { label: "c", text: "Use the turning point and one other point from the table to determine the equation of f(x) in the form y = a(x−p)² + q.", marks: 4 },
          { label: "d", text: "Use the table to calculate the average gradient between x = −1 and x = 2.", marks: 3 }
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
      },
      5: {
        a: "Turning point (1, −1) — the smallest y-value in the table, with matching y-values on either side",
        b: "x = 1",
        c: "Using vertex (1,−1) and point (4,8): 8 = a(4−1)²−1 → 9=9a → a=1; y=(x−1)²−1",
        d: "Average gradient = (f(2)−f(−1))/(2−(−1)) = (0−3)/3 = −1"
      }
    }
  }
});
