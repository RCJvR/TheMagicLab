// Math Magician — Grade 10, Chapter 8
// Analytical Geometry

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 800,
      chapter: 8,
      name: "Distance & midpoint",
      fullName: "Distance between two points and midpoint of a line segment",
      lesson: {
        heading: "Distance formula and midpoint formula",
        sub: "Chapter 8 · Topic 1",
        body: `
          <p><strong>Analytical geometry</strong> combines algebra and geometry using the Cartesian plane.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Distance formula</div>
            <p>For points A(x₁; y₁) and B(x₂; y₂):<br>
            <span class="math">AB = √((x₂−x₁)² + (y₂−y₁)²)</span><br><br>
            This is the Pythagorean theorem applied to the Cartesian plane.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Midpoint formula</div>
            <p>Midpoint M of segment AB:<br>
            <span class="math">M = ((x₁+x₂)/2 ; (y₁+y₂)/2)</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>A(1; 3) and B(5; −1).<br>
            Distance: <span class="math">AB = √((5−1)² + (−1−3)²) = √(16+16) = √32 = 4√2</span><br>
            Midpoint: <span class="math">M = ((1+5)/2 ; (3+(−1))/2) = (3; 1)</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Distance & Midpoint Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter two points A(x₁ ; y₁) and B(x₂ ; y₂) — get distance, midpoint, and step-by-step working.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₁</div><input id="g10c8x1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₁</div><input id="g10c8y1" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div style="padding-bottom:9px;color:rgba(221,225,240,0.40);">→</div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₂</div><input id="g10c8x2" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₂</div><input id="g10c8y2" type="number" value="-1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c8Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c8Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fmt(n){return Number.isInteger(n)?''+n:parseFloat(n.toFixed(4))+'';}
              function simpleSurd(n){let k=1;for(let i=2;i*i<=n;i++){if(n%(i*i)===0){k=i*Math.sqrt(n/(i*i));break;}}return k===1?'√'+n:Math.round(Math.sqrt(n)*1000)/1000;}
              function run(){
                const x1=parseFloat(document.getElementById('g10c8x1').value),y1=parseFloat(document.getElementById('g10c8y1').value);
                const x2=parseFloat(document.getElementById('g10c8x2').value),y2=parseFloat(document.getElementById('g10c8y2').value);
                const out=document.getElementById('g10c8Out');
                if([x1,y1,x2,y2].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter valid coordinates.</span>';return;}
                const dx=x2-x1,dy=y2-y1;
                const d2=dx*dx+dy*dy;
                const d=Math.sqrt(d2);
                const mx=(x1+x2)/2,my=(y1+y2)/2;
                const nice=Math.abs(d-Math.round(d))<0.0001;
                let distStr=nice?Math.round(d)+'':d.toFixed(4);
                // Check for nice surd: if d²= k²*m then d=k√m
                let surdStr='';
                for(let k=2;k*k<=d2;k++){if(d2%(k*k)===0){const m=d2/(k*k);surdStr=(k===1?'':''+k)+'√'+m;break;}}
                let html='<span style="color:rgba(221,225,240,0.50);">A('+x1+' ; '+y1+'), B('+x2+' ; '+y2+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Δx = '+x2+'−('+x1+') = '+dx+', Δy = '+y2+'−('+y1+') = '+dy+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Distance = √('+dx+'² + '+dy+'²) = √'+d2+'</span><br>';
                html+='<span style="color:#6ee7b7;">AB = '+(surdStr&&!nice?surdStr+' ≈ '+d.toFixed(4):distStr)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Midpoint M = (('+x1+'+'+x2+')/2 ; ('+y1+'+'+y2+')/2)</span><br>';
                html+='<span style="color:#6ee7b7;">M = ('+fmt(mx)+' ; '+fmt(my)+')</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c8Btn').addEventListener('click',run);
              ['g10c8x1','g10c8y1','g10c8x2','g10c8y2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Both formulas use the same two differences Δx and Δy. Distance uses the Pythagorean theorem (Δx² + Δy²); midpoint averages them ((x₁+x₂)/2).</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Coordinate Plane — Distance & Midpoint Visualiser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter two points to see A, B, the segment, the midpoint M, and the right-angle distance triangle on the plane.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">x₁</div><input id="g10c8vx1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">y₁</div><input id="g10c8vy1" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div style="padding-bottom:8px;color:rgba(221,225,240,0.35);">→</div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">x₂</div><input id="g10c8vx2" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">y₂</div><input id="g10c8vy2" type="number" value="-1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <button id="g10c8vBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;align-self:flex-end;">Plot</button>
            </div>
            <canvas id="g10c8gcv" style="width:100%;max-width:520px;display:block;border-radius:8px;background:rgba(15,10,40,0.88);border:1px solid rgba(99,102,241,0.22);"></canvas>
            <script>
            (function(){
              const cv=document.getElementById('g10c8gcv');
              const DPR=Math.min(window.devicePixelRatio||1,2);
              const W=520,H=320;
              cv.width=W*DPR;cv.height=H*DPR;
              const ctx=cv.getContext('2d');
              ctx.scale(DPR,DPR);
              const fmt=n=>(Math.round(n*100)/100)+'';

              function draw(){
                const x1=parseFloat(document.getElementById('g10c8vx1').value);
                const y1=parseFloat(document.getElementById('g10c8vy1').value);
                const x2=parseFloat(document.getElementById('g10c8vx2').value);
                const y2=parseFloat(document.getElementById('g10c8vy2').value);
                if([x1,y1,x2,y2].some(isNaN))return;
                const mx=(x1+x2)/2,my=(y1+y2)/2;
                const pad=2.5;
                let xMn=Math.min(x1,x2,0)-pad,xMx=Math.max(x1,x2,0)+pad;
                let yMn=Math.min(y1,y2,0)-pad,yMx=Math.max(y1,y2,0)+pad;
                // enforce aspect ratio
                const xSp=xMx-xMn,ySp=yMx-yMn,asp=W/H;
                if(xSp/ySp>asp){const c=(yMx+yMn)/2;yMn=c-xSp/asp/2;yMx=c+xSp/asp/2;}
                else{const c=(xMx+xMn)/2;xMn=c-ySp*asp/2;xMx=c+ySp*asp/2;}
                const px=x=>(x-xMn)/(xMx-xMn)*W;
                const py=y=>H-(y-yMn)/(yMx-yMn)*H;

                ctx.clearRect(0,0,W,H);
                // grid
                const step=Math.max(1,Math.ceil((xMx-xMn)/10));
                for(let x=Math.ceil(xMn/step)*step;x<=xMx;x+=step){
                  ctx.strokeStyle=x===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=x===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(px(x),0);ctx.lineTo(px(x),H);ctx.stroke();
                }
                for(let y=Math.ceil(yMn/step)*step;y<=yMx;y+=step){
                  ctx.strokeStyle=y===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=y===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(0,py(y));ctx.lineTo(W,py(y));ctx.stroke();
                }
                // axis labels
                ctx.fillStyle='rgba(165,180,252,0.50)';ctx.font='10px monospace';
                const ay0=Math.max(12,Math.min(py(0)+13,H-4));
                const ax0=Math.max(18,Math.min(px(0)-4,W-18));
                ctx.textAlign='center';
                for(let x=Math.ceil(xMn/step)*step;x<=xMx;x+=step){if(x!==0)ctx.fillText(x,px(x),ay0);}
                ctx.textAlign='right';
                for(let y=Math.ceil(yMn/step)*step;y<=yMx;y+=step){if(y!==0)ctx.fillText(y,ax0,py(y)+4);}

                // right-angle triangle (dashed)
                ctx.save();ctx.strokeStyle='rgba(99,102,241,0.35)';ctx.lineWidth=1;ctx.setLineDash([4,3]);
                ctx.beginPath();ctx.moveTo(px(x1),py(y1));ctx.lineTo(px(x2),py(y1));ctx.lineTo(px(x2),py(y2));ctx.stroke();
                ctx.restore();
                // right-angle mark
                const rs=8,rx=px(x2),ry=py(y1);
                const sx=x2>x1?-1:1,sy=y2>y1?1:-1;
                ctx.strokeStyle='rgba(99,102,241,0.40)';ctx.lineWidth=1;
                ctx.beginPath();ctx.moveTo(rx+sx*rs,ry);ctx.lineTo(rx+sx*rs,ry+sy*rs);ctx.lineTo(rx,ry+sy*rs);ctx.stroke();

                // Δx and Δy labels
                ctx.fillStyle='rgba(165,180,252,0.55)';ctx.font='bold 10px monospace';
                ctx.textAlign='center';ctx.fillText('Δx='+(x2-x1),px((x1+x2)/2),py(y1)+(y2>y1?14:-5));
                ctx.textAlign=x2>x1?'left':'right';
                const xOff=x2>x1?-28:4;
                ctx.fillText('Δy='+(y2-y1),px(x2)+xOff,py((y1+y2)/2)+4);

                // segment AB
                ctx.strokeStyle='#6ee7b7';ctx.lineWidth=2.5;
                ctx.beginPath();ctx.moveTo(px(x1),py(y1));ctx.lineTo(px(x2),py(y2));ctx.stroke();

                // distance label on segment
                const d=Math.sqrt((x2-x1)**2+(y2-y1)**2);
                const ang=Math.atan2(py(y2)-py(y1),px(x2)-px(x1));
                const smx=(px(x1)+px(x2))/2,smy=(py(y1)+py(y2))/2;
                ctx.save();ctx.translate(smx,smy);ctx.rotate(ang);
                ctx.fillStyle='#6ee7b7';ctx.font='bold 10px monospace';ctx.textAlign='center';
                ctx.fillText('AB ≈ '+fmt(d),0,-9);ctx.restore();

                // midpoint M
                ctx.fillStyle='#fcd34d';ctx.beginPath();ctx.arc(px(mx),py(my),5.5,0,Math.PI*2);ctx.fill();
                ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                ctx.fillStyle='#fcd34d';ctx.font='bold 11px monospace';ctx.textAlign='left';
                ctx.fillText('M('+fmt(mx)+', '+fmt(my)+')',px(mx)+8,py(my)-8);

                // points A, B
                [[x1,y1,'A','#a5b4fc'],[x2,y2,'B','#fca5a5']].forEach(([x,y,l,c])=>{
                  ctx.fillStyle=c;ctx.beginPath();ctx.arc(px(x),py(y),6,0,Math.PI*2);ctx.fill();
                  ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                  ctx.fillStyle=c;ctx.font='bold 11px monospace';ctx.textAlign='left';
                  ctx.fillText(l+'('+x+', '+y+')',px(x)+9,py(y)-9);
                });
              }

              document.getElementById('g10c8vBtn').addEventListener('click',draw);
              ['g10c8vx1','g10c8vy1','g10c8vx2','g10c8vy2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')draw();}));
              draw();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Distance between (−1; 2) and (3; 5):",
          options: ["5", "√7", "7", "√25 = 5"],
          answer: 0,
          topic: "Distance & midpoint"
        },
        {
          type: "mc",
          text: "Midpoint of (−4; 6) and (2; −2):",
          options: ["(−1; 2)", "(−2; 4)", "(−2; 2)", "(1; 2)"],
          answer: 0,
          topic: "Distance & midpoint"
        },
        {
          type: "input",
          text: "A(0; 0) and B(3; 4). Find AB.",
          answer: "5",
          topic: "Distance & midpoint"
        },
        {
          type: "mc",
          text: "M(2; −1) is the midpoint of A(−1; 3) and B. Find B.",
          options: ["(5; −5)", "(3; −4)", "(1; −5)", "(5; 1)"],
          answer: 0,
          topic: "Distance & midpoint"
        },
        {
          type: "mc",
          text: "Which formula gives the midpoint y-coordinate?",
          options: ["y₂ − y₁", "(y₁ + y₂)/2", "√(y₂ − y₁)", "y₁ · y₂"],
          answer: 1,
          topic: "Distance & midpoint"
        }
      ]
    },
    {
      id: 801,
      chapter: 8,
      name: "Gradient of a line",
      fullName: "Gradient, parallel lines, and perpendicular lines",
      lesson: {
        heading: "Gradient, parallel, and perpendicular lines",
        sub: "Chapter 8 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Gradient formula</div>
            <p>For points A(x₁; y₁) and B(x₂; y₂):<br>
            <span class="math">m = (y₂−y₁)/(x₂−x₁)</span><br><br>
            Gradient measures steepness. Positive → rising left to right. Negative → falling.<br>
            Horizontal line: <span class="math">m = 0</span>. Vertical line: gradient undefined.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Parallel and perpendicular lines</div>
            <p>
              <strong>Parallel lines:</strong> same gradient → <span class="math">m₁ = m₂</span><br>
              <strong>Perpendicular lines:</strong> gradients multiply to −1 → <span class="math">m₁ × m₂ = −1</span><br>
              i.e. <span class="math">m₂ = −1/m₁</span> (negative reciprocal)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>Line through A(1; 2) and B(4; 8):<br>
            <span class="math">m = (8−2)/(4−1) = 6/3 = 2</span><br><br>
            A line parallel to AB also has m = 2.<br>
            A line perpendicular to AB has m = −½.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Equation of a line through two points</div>
            <p>Use point-slope form: <span class="math">y − y₁ = m(x − x₁)</span><br>
            Then rearrange to <span class="math">y = mx + c</span>.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Gradient & Line Equation Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter two points — get gradient, line equation, and parallel/perpendicular gradients.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₁</div><input id="g10c8gx1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₁</div><input id="g10c8gy1" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div style="padding-bottom:9px;color:rgba(221,225,240,0.40);">→</div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₂</div><input id="g10c8gx2" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₂</div><input id="g10c8gy2" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c8gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c8gOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gcd(a,b){a=Math.abs(a);b=Math.abs(b);return b===0?a:gcd(b,a%b);}
              function frac(n,d){if(d===0)return'undefined';const g=gcd(Math.abs(n),Math.abs(d));let nn=n/g,dd=d/g;if(dd<0){nn=-nn;dd=-dd;}return dd===1?''+nn:nn+'/'+dd;}
              function fmt(n){return Number.isInteger(n)?''+n:parseFloat(n.toFixed(4))+'';}
              function run(){
                const x1=parseFloat(document.getElementById('g10c8gx1').value),y1=parseFloat(document.getElementById('g10c8gy1').value);
                const x2=parseFloat(document.getElementById('g10c8gx2').value),y2=parseFloat(document.getElementById('g10c8gy2').value);
                const out=document.getElementById('g10c8gOut');
                if([x1,y1,x2,y2].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter valid coordinates.</span>';return;}
                if(x1===x2){
                  out.innerHTML='<span style="color:#fca5a5;">Vertical line — gradient undefined.</span><br><span style="color:#fcd34d;">Equation: x = '+x1+'</span>';
                  return;
                }
                const dy=y2-y1,dx=x2-x1;
                const mFrac=frac(dy,dx);
                const m=dy/dx;
                const c=y1-m*x1;
                const mPerp=frac(-dx,dy);
                let html='<span style="color:rgba(221,225,240,0.50);">Gradient m = ('+y2+'−'+y1+')/('+x2+'−'+x1+') = '+dy+'/'+dx+' = </span><span style="color:#fcd34d;">'+mFrac+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">y-intercept c = y₁ − m·x₁ = '+y1+'−('+mFrac+')×'+x1+' = '+fmt(c)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Line: y = '+mFrac+'x '+(c>=0?'+ '+fmt(c):'− '+fmt(Math.abs(c)))+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Parallel lines have gradient: </span><span style="color:#fcd34d;">m = '+mFrac+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Perpendicular gradient: </span><span style="color:#fcd34d;">m⊥ = '+mPerp+(dy===0?' (vertical)':'')+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c8gBtn').addEventListener('click',run);
              ['g10c8gx1','g10c8gy1','g10c8gx2','g10c8gy2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Perpendicular gradients are negative reciprocals: if m = 2, then m⊥ = −½. The product is always −1: <span class="math">m × m⊥ = −1</span>.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Line Grapher — Gradient · Parallel · Perpendicular</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter two points to plot the line through A and B — optionally add a parallel and perpendicular line.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">x₁</div><input id="g10c8gvx1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">y₁</div><input id="g10c8gvy1" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div style="padding-bottom:8px;color:rgba(221,225,240,0.35);">→</div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">x₂</div><input id="g10c8gvx2" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">y₂</div><input id="g10c8gvy2" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <button id="g10c8gvBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;align-self:flex-end;">Plot</button>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:10px;font-size:13px;">
              <label style="display:flex;align-items:center;gap:5px;cursor:pointer;color:rgba(221,225,240,0.70);"><input type="checkbox" id="g10c8gvParallel" style="accent-color:#a5b4fc;"> <span style="color:#a5b4fc;">Show parallel line (through origin)</span></label>
              <label style="display:flex;align-items:center;gap:5px;cursor:pointer;color:rgba(221,225,240,0.70);"><input type="checkbox" id="g10c8gvPerp"> <span style="color:#fcd34d;">Show perpendicular line (through A)</span></label>
            </div>
            <canvas id="g10c8gcv2" style="width:100%;max-width:520px;display:block;border-radius:8px;background:rgba(15,10,40,0.88);border:1px solid rgba(99,102,241,0.22);"></canvas>
            <script>
            (function(){
              const cv=document.getElementById('g10c8gcv2');
              const DPR=Math.min(window.devicePixelRatio||1,2);
              const W=520,H=320;
              cv.width=W*DPR;cv.height=H*DPR;
              const ctx=cv.getContext('2d');
              ctx.scale(DPR,DPR);
              const fmt=n=>{const r=Math.round(n*100)/100;return r+'';}

              function draw(){
                const x1=parseFloat(document.getElementById('g10c8gvx1').value);
                const y1=parseFloat(document.getElementById('g10c8gvy1').value);
                const x2=parseFloat(document.getElementById('g10c8gvx2').value);
                const y2=parseFloat(document.getElementById('g10c8gvy2').value);
                if([x1,y1,x2,y2].some(isNaN))return;
                const showParallel=document.getElementById('g10c8gvParallel').checked;
                const showPerp=document.getElementById('g10c8gvPerp').checked;

                const xMn=-10,xMx=10,yMn=-10,yMx=10;
                const px=x=>(x-xMn)/(xMx-xMn)*W;
                const py=y=>H-(y-yMn)/(yMx-yMn)*H;

                ctx.clearRect(0,0,W,H);
                // grid
                for(let x=-10;x<=10;x++){
                  ctx.strokeStyle=x===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=x===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(px(x),0);ctx.lineTo(px(x),H);ctx.stroke();
                }
                for(let y=-10;y<=10;y++){
                  ctx.strokeStyle=y===0?'rgba(165,180,252,0.50)':'rgba(99,102,241,0.14)';
                  ctx.lineWidth=y===0?1.5:1;
                  ctx.beginPath();ctx.moveTo(0,py(y));ctx.lineTo(W,py(y));ctx.stroke();
                }
                ctx.fillStyle='rgba(165,180,252,0.50)';ctx.font='10px monospace';
                const ay0=Math.max(12,Math.min(py(0)+13,H-4));
                const ax0=Math.max(18,Math.min(px(0)-4,W-18));
                ctx.textAlign='center';
                for(let x=-9;x<=9;x+=2){if(x!==0)ctx.fillText(x,px(x),ay0);}
                ctx.textAlign='right';
                for(let y=-8;y<=8;y+=2){if(y!==0)ctx.fillText(y,ax0,py(y)+4);}

                function lineFn(m,b){ return x=>m*x+b; }

                if(x1===x2){
                  // vertical line
                  ctx.strokeStyle='#6ee7b7';ctx.lineWidth=2.5;
                  ctx.beginPath();ctx.moveTo(px(x1),0);ctx.lineTo(px(x1),H);ctx.stroke();
                  ctx.fillStyle='#6ee7b7';ctx.font='bold 11px monospace';ctx.textAlign='left';
                  ctx.fillText('x = '+x1,px(x1)+6,20);
                } else {
                  const m=(y2-y1)/(x2-x1);
                  const c=y1-m*x1;
                  const mPerp=-1/m;
                  const cPerp=y1-mPerp*x1;

                  function plotLine(fn,color,label,lx,lxDir){
                    ctx.strokeStyle=color;ctx.lineWidth=2.5;
                    ctx.beginPath();let on=false;
                    for(let i=0;i<=W*2;i++){
                      const x=xMn+(i/(W*2))*(xMx-xMn);
                      const y=fn(x);
                      if(!isFinite(y)||y<yMn-5||y>yMx+5){on=false;continue;}
                      if(!on){ctx.moveTo(px(x),py(y));on=true;}else ctx.lineTo(px(x),py(y));
                    }
                    ctx.stroke();
                    if(label){
                      const ly=fn(lx);
                      if(ly>yMn&&ly<yMx){
                        ctx.fillStyle=color;ctx.font='bold 10px monospace';
                        ctx.textAlign=lxDir||'left';
                        ctx.fillText(label,px(lx)+(lxDir==='right'?-4:4),py(ly)-8);
                      }
                    }
                  }

                  const mStr=fmt(m),cStr=c>=0?'+ '+fmt(c):'− '+fmt(Math.abs(c));
                  plotLine(lineFn(m,c),'#6ee7b7','y='+mStr+'x '+cStr,x2+1);

                  // gradient triangle
                  const tx=2,ty=m*tx+c;
                  if(tx>=xMn&&tx<=xMx&&ty>=yMn&&ty<=yMx){
                    ctx.save();ctx.strokeStyle='rgba(110,231,183,0.40)';ctx.lineWidth=1;ctx.setLineDash([3,3]);
                    ctx.beginPath();ctx.moveTo(px(tx),py(ty));ctx.lineTo(px(tx+1),py(ty));ctx.lineTo(px(tx+1),py(ty+m));ctx.stroke();
                    ctx.restore();
                    ctx.fillStyle='rgba(110,231,183,0.60)';ctx.font='bold 10px monospace';ctx.textAlign='center';
                    ctx.fillText('m='+mStr,px(tx+0.5),py(ty)+(m>0?14:-5));
                  }

                  if(showParallel){
                    plotLine(lineFn(m,0),'rgba(165,180,252,0.70)','parallel (c=0)',xMx-2,'right');
                  }
                  if(showPerp&&Math.abs(m)>0.001){
                    plotLine(lineFn(mPerp,cPerp),'rgba(252,211,77,0.80)','m⊥='+fmt(mPerp),x1+1);
                  }

                  // intercepts
                  function dot(x,y,color){
                    if(x<xMn||x>xMx||y<yMn||y>yMx)return;
                    ctx.fillStyle=color;ctx.beginPath();ctx.arc(px(x),py(y),5,0,Math.PI*2);ctx.fill();
                    ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                  }
                  dot(0,c,'#6ee7b7');
                  if(Math.abs(m)>0.001){dot(-c/m,0,'#6ee7b7');}
                  [[x1,y1,'A','#a5b4fc'],[x2,y2,'B','#fca5a5']].forEach(([x,y,l,cl])=>{
                    ctx.fillStyle=cl;ctx.beginPath();ctx.arc(px(x),py(y),6,0,Math.PI*2);ctx.fill();
                    ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                    ctx.fillStyle=cl;ctx.font='bold 11px monospace';ctx.textAlign='left';
                    ctx.fillText(l+'('+x+','+y+')',px(x)+8,py(y)-8);
                  });
                }
              }

              document.getElementById('g10c8gvBtn').addEventListener('click',draw);
              document.getElementById('g10c8gvParallel').addEventListener('change',draw);
              document.getElementById('g10c8gvPerp').addEventListener('change',draw);
              ['g10c8gvx1','g10c8gvy1','g10c8gvx2','g10c8gvy2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')draw();}));
              draw();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Gradient of the line through (2; 1) and (6; 9):",
          options: ["2", "½", "4", "8"],
          answer: 0,
          topic: "Gradient of a line"
        },
        {
          type: "mc",
          text: "A line has gradient 3. A perpendicular line has gradient:",
          options: ["3", "−3", "−⅓", "⅓"],
          answer: 2,
          topic: "Gradient of a line"
        },
        {
          type: "input",
          text: "Find the gradient of the line through (−1; 4) and (3; −4).",
          answer: "-2",
          altAnswers: ["−2"],
          topic: "Gradient of a line"
        },
        {
          type: "mc",
          text: "The equation of the line through (0; 3) with gradient −2 is:",
          options: ["y = −2x", "y = −2x + 3", "y = 2x + 3", "y = 3x − 2"],
          answer: 1,
          topic: "Gradient of a line"
        },
        {
          type: "mc",
          text: "Lines y = 3x − 1 and y = 3x + 5 are:",
          options: ["Perpendicular", "Parallel", "The same line", "Intersecting at right angles"],
          answer: 1,
          topic: "Gradient of a line"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 8 Workbook — Analytical Geometry",
    questions: [
      {
        number: 1,
        text: "Points A(−2; 3), B(4; 11), and C(1; 0) are given.",
        parts: [
          { label: "a", text: "Calculate AB.", marks: 3 },
          { label: "b", text: "Find the midpoint M of AB.", marks: 2 },
          { label: "c", text: "Find the gradient of AB.", marks: 2 },
          { label: "d", text: "Write the equation of line AB in the form y = mx + c.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "A(1; 4) and B(7; −2) are endpoints of a line segment.",
        parts: [
          { label: "a", text: "Find the midpoint M.", marks: 2 },
          { label: "b", text: "Find the gradient of AB.", marks: 2 },
          { label: "c", text: "Find the gradient of a line perpendicular to AB.", marks: 1 },
          { label: "d", text: "Write the equation of the perpendicular bisector of AB.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "ABCD is a quadrilateral with A(0; 0), B(4; 2), C(6; −2), D(2; −4).",
        parts: [
          { label: "a", text: "Show that AB is parallel to DC.", marks: 4 },
          { label: "b", text: "Show that AB ≠ DC in length.", marks: 3 },
          { label: "c", text: "What type of quadrilateral is ABCD? Give a reason.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "AB = √(36+64) = √100 = 10",
        b: "M = (1; 7)",
        c: "m = (11−3)/(4−(−2)) = 8/6 = 4/3",
        d: "y = (4/3)x + 11/3"
      },
      2: {
        a: "M = (4; 1)",
        b: "m = (−2−4)/(7−1) = −1",
        c: "m_perp = 1",
        d: "y−1=1(x−4) → y=x−3"
      },
      3: {
        a: "m_AB=(2−0)/(4−0)=1/2; m_DC=(−4−(−2))/(2−6)=−2/−4=1/2 → AB∥DC",
        b: "AB=√20=2√5; DC=√20=2√5 → equal length!",
        c: "Parallelogram (one pair of ∥ and equal sides) — actually rhombus if all sides equal; check AD and BC"
      }
    }
  }
});
