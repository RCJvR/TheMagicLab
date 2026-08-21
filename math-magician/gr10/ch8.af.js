// Math Magician — Grade 10, Chapter 8 data (Afrikaans)
// Analitiese meetkunde

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 800,
      chapter: 8,
      name: "Afstand & middelpunt",
      fullName: "Afstand tussen twee punte en middelpunt van 'n lynstuk",
      lesson: {
        heading: "Afstandsformule en middelpuntsformule",
        sub: "Hoofstuk 8 · Onderwerp 1",
        body: `
          <p><strong>Analitiese meetkunde</strong> kombineer algebra en meetkunde deur van die Cartesiese vlak gebruik te maak.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Afstandsformule</div>
            <p>Vir punte A(x₁; y₁) en B(x₂; y₂):<br>
            <span class="math">AB = √((x₂−x₁)² + (y₂−y₁)²)</span><br><br>
            Dit is die Stelling van Pythagoras toegepas op die Cartesiese vlak.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Middelpuntsformule</div>
            <p>Middelpunt M van lynstuk AB:<br>
            <span class="math">M = ((x₁+x₂)/2 ; (y₁+y₂)/2)</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>A(1; 3) en B(5; −1).<br>
            Afstand: <span class="math">AB = √((5−1)² + (−1−3)²) = √(16+16) = √32 = 4√2</span><br>
            Middelpunt: <span class="math">M = ((1+5)/2 ; (3+(−1))/2) = (3; 1)</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Afstand- en middelpuntsberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee punte A(x₁ ; y₁) en B(x₂ ; y₂) in — kry die afstand, middelpunt, en stap-vir-stap berekening.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₁</div><input id="g10c8x1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₁</div><input id="g10c8y1" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div style="padding-bottom:9px;color:rgba(221,225,240,0.40);">→</div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₂</div><input id="g10c8x2" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₂</div><input id="g10c8y2" type="number" value="-1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c8Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
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
                if([x1,y1,x2,y2].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige koördinate in.</span>';return;}
                const dx=x2-x1,dy=y2-y1;
                const d2=dx*dx+dy*dy;
                const d=Math.sqrt(d2);
                const mx=(x1+x2)/2,my=(y1+y2)/2;
                const nice=Math.abs(d-Math.round(d))<0.0001;
                let distStr=nice?Math.round(d)+'':d.toFixed(4);
                // Kontroleer vir 'n netjiese wortel: as d²= k²*m dan d=k√m
                let surdStr='';
                for(let k=2;k*k<=d2;k++){if(d2%(k*k)===0){const m=d2/(k*k);surdStr=(k===1?'':''+k)+'√'+m;break;}}
                let html='<span style="color:rgba(221,225,240,0.50);">A('+x1+' ; '+y1+'), B('+x2+' ; '+y2+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Δx = '+x2+'−('+x1+') = '+dx+', Δy = '+y2+'−('+y1+') = '+dy+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Afstand = √('+dx+'² + '+dy+'²) = √'+d2+'</span><br>';
                html+='<span style="color:#6ee7b7;">AB = '+(surdStr&&!nice?surdStr+' ≈ '+d.toFixed(4):distStr)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Middelpunt M = (('+x1+'+'+x2+')/2 ; ('+y1+'+'+y2+')/2)</span><br>';
                html+='<span style="color:#6ee7b7;">M = ('+fmt(mx)+' ; '+fmt(my)+')</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c8Btn').addEventListener('click',run);
              ['g10c8x1','g10c8y1','g10c8x2','g10c8y2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Albei formules gebruik dieselfde twee verskille Δx en Δy. Afstand gebruik die Stelling van Pythagoras (Δx² + Δy²); middelpunt neem die gemiddelde ((x₁+x₂)/2).</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Koördinaatvlak — Afstand- en middelpuntvisualiseerder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee punte in om A, B, die lynstuk, die middelpunt M, en die reghoekige afstandsdriehoek op die vlak te sien.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">x₁</div><input id="g10c8vx1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">y₁</div><input id="g10c8vy1" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div style="padding-bottom:8px;color:rgba(221,225,240,0.35);">→</div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">x₂</div><input id="g10c8vx2" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">y₂</div><input id="g10c8vy2" type="number" value="-1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <button id="g10c8vBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;align-self:flex-end;">Teken</button>
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
                // handhaaf beeldverhouding
                const xSp=xMx-xMn,ySp=yMx-yMn,asp=W/H;
                if(xSp/ySp>asp){const c=(yMx+yMn)/2;yMn=c-xSp/asp/2;yMx=c+xSp/asp/2;}
                else{const c=(xMx+xMn)/2;xMn=c-ySp*asp/2;xMx=c+ySp*asp/2;}
                const px=x=>(x-xMn)/(xMx-xMn)*W;
                const py=y=>H-(y-yMn)/(yMx-yMn)*H;

                ctx.clearRect(0,0,W,H);
                // rooster
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
                // as-etikette
                ctx.fillStyle='rgba(165,180,252,0.50)';ctx.font='10px monospace';
                const ay0=Math.max(12,Math.min(py(0)+13,H-4));
                const ax0=Math.max(18,Math.min(px(0)-4,W-18));
                ctx.textAlign='center';
                for(let x=Math.ceil(xMn/step)*step;x<=xMx;x+=step){if(x!==0)ctx.fillText(x,px(x),ay0);}
                ctx.textAlign='right';
                for(let y=Math.ceil(yMn/step)*step;y<=yMx;y+=step){if(y!==0)ctx.fillText(y,ax0,py(y)+4);}

                // reghoekige driehoek (kolstippel)
                ctx.save();ctx.strokeStyle='rgba(99,102,241,0.35)';ctx.lineWidth=1;ctx.setLineDash([4,3]);
                ctx.beginPath();ctx.moveTo(px(x1),py(y1));ctx.lineTo(px(x2),py(y1));ctx.lineTo(px(x2),py(y2));ctx.stroke();
                ctx.restore();
                // regtehoekmerk
                const rs=8,rx=px(x2),ry=py(y1);
                const sx=x2>x1?-1:1,sy=y2>y1?1:-1;
                ctx.strokeStyle='rgba(99,102,241,0.40)';ctx.lineWidth=1;
                ctx.beginPath();ctx.moveTo(rx+sx*rs,ry);ctx.lineTo(rx+sx*rs,ry+sy*rs);ctx.lineTo(rx,ry+sy*rs);ctx.stroke();

                // Δx en Δy etikette
                ctx.fillStyle='rgba(165,180,252,0.55)';ctx.font='bold 10px monospace';
                ctx.textAlign='center';ctx.fillText('Δx='+(x2-x1),px((x1+x2)/2),py(y1)+(y2>y1?14:-5));
                ctx.textAlign=x2>x1?'left':'right';
                const xOff=x2>x1?-28:4;
                ctx.fillText('Δy='+(y2-y1),px(x2)+xOff,py((y1+y2)/2)+4);

                // lynstuk AB
                ctx.strokeStyle='#6ee7b7';ctx.lineWidth=2.5;
                ctx.beginPath();ctx.moveTo(px(x1),py(y1));ctx.lineTo(px(x2),py(y2));ctx.stroke();

                // afstandetiket op lynstuk
                const d=Math.sqrt((x2-x1)**2+(y2-y1)**2);
                const ang=Math.atan2(py(y2)-py(y1),px(x2)-px(x1));
                const smx=(px(x1)+px(x2))/2,smy=(py(y1)+py(y2))/2;
                ctx.save();ctx.translate(smx,smy);ctx.rotate(ang);
                ctx.fillStyle='#6ee7b7';ctx.font='bold 10px monospace';ctx.textAlign='center';
                ctx.fillText('AB ≈ '+fmt(d),0,-9);ctx.restore();

                // middelpunt M
                ctx.fillStyle='#fcd34d';ctx.beginPath();ctx.arc(px(mx),py(my),5.5,0,Math.PI*2);ctx.fill();
                ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                ctx.fillStyle='#fcd34d';ctx.font='bold 11px monospace';ctx.textAlign='left';
                ctx.fillText('M('+fmt(mx)+', '+fmt(my)+')',px(mx)+8,py(my)-8);

                // punte A, B
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
          text: "Afstand tussen (−1; 2) en (3; 5):",
          options: ["5", "√7", "7", "√50"],
          answer: 0,
          topic: "Afstand & middelpunt"
        },
        {
          type: "mc",
          text: "Middelpunt van (−4; 6) en (2; −2):",
          options: ["(−1; 2)", "(−2; 4)", "(−2; 2)", "(1; 2)"],
          answer: 0,
          topic: "Afstand & middelpunt"
        },
        {
          type: "input",
          text: "A(0; 0) en B(3; 4). Vind AB.",
          answer: "5",
          topic: "Afstand & middelpunt"
        },
        {
          type: "mc",
          text: "M(2; −1) is die middelpunt van A(−1; 3) en B. Vind B.",
          options: ["(5; −5)", "(3; −4)", "(1; −5)", "(5; 1)"],
          answer: 0,
          topic: "Afstand & middelpunt"
        },
        {
          type: "mc",
          text: "Watter formule gee die y-koördinaat van die middelpunt?",
          options: ["y₂ − y₁", "(y₁ + y₂)/2", "√(y₂ − y₁)", "y₁ · y₂"],
          answer: 1,
          topic: "Afstand & middelpunt"
        },
        {
          type: "input",
          text: "Die middelpunt van AB is M(3; −2). As A (7; 1) is, vind B, en bereken dan die afstand MB.",
          answer: "5",
          topic: "Afstand & middelpunt"
        }
      ]
    },
    {
      id: 801,
      chapter: 8,
      name: "Gradiënt van 'n lyn",
      fullName: "Gradiënt, ewewydige lyne, en loodregte lyne",
      lesson: {
        heading: "Gradiënt, ewewydige, en loodregte lyne",
        sub: "Hoofstuk 8 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Gradiëntformule</div>
            <p>Vir punte A(x₁; y₁) en B(x₂; y₂):<br>
            <span class="math">m = (y₂−y₁)/(x₂−x₁)</span><br><br>
            Gradiënt meet steilheid. Positief → styg van links na regs. Negatief → daal.<br>
            Horisontale lyn: <span class="math">m = 0</span>. Vertikale lyn: gradiënt onbepaald.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Ewewydige en loodregte lyne</div>
            <p>
              <strong>Ewewydige lyne:</strong> dieselfde gradiënt → <span class="math">m₁ = m₂</span><br>
              <strong>Loodregte lyne:</strong> gradiënte vermenigvuldig tot −1 → <span class="math">m₁ × m₂ = −1</span><br>
              d.w.s. <span class="math">m₂ = −1/m₁</span> (negatiewe omgekeerde)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>Lyn deur A(1; 2) en B(4; 8):<br>
            <span class="math">m = (8−2)/(4−1) = 6/3 = 2</span><br><br>
            'n Lyn ewewydig aan AB het ook m = 2.<br>
            'n Lyn loodreg op AB het m = −½.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Vergelyking van 'n lyn deur twee punte</div>
            <p>Gebruik punt-gradiëntvorm: <span class="math">y − y₁ = m(x − x₁)</span><br>
            Herrangskik dan na <span class="math">y = mx + c</span>.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Gradiënt- en lynvergelykingsberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee punte in — kry die gradiënt, lynvergelyking, en ewewydige/loodregte gradiënte.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₁</div><input id="g10c8gx1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₁</div><input id="g10c8gy1" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div style="padding-bottom:9px;color:rgba(221,225,240,0.40);">→</div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₂</div><input id="g10c8gx2" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₂</div><input id="g10c8gy2" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c8gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g10c8gOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gcd(a,b){a=Math.abs(a);b=Math.abs(b);return b===0?a:gcd(b,a%b);}
              function frac(n,d){if(d===0)return'onbepaald';const g=gcd(Math.abs(n),Math.abs(d));let nn=n/g,dd=d/g;if(dd<0){nn=-nn;dd=-dd;}return dd===1?''+nn:nn+'/'+dd;}
              function fmt(n){return Number.isInteger(n)?''+n:parseFloat(n.toFixed(4))+'';}
              function run(){
                const x1=parseFloat(document.getElementById('g10c8gx1').value),y1=parseFloat(document.getElementById('g10c8gy1').value);
                const x2=parseFloat(document.getElementById('g10c8gx2').value),y2=parseFloat(document.getElementById('g10c8gy2').value);
                const out=document.getElementById('g10c8gOut');
                if([x1,y1,x2,y2].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige koördinate in.</span>';return;}
                if(x1===x2){
                  out.innerHTML='<span style="color:#fca5a5;">Vertikale lyn — gradiënt onbepaald.</span><br><span style="color:#fcd34d;">Vergelyking: x = '+x1+'</span>';
                  return;
                }
                const dy=y2-y1,dx=x2-x1;
                const mFrac=frac(dy,dx);
                const m=dy/dx;
                const c=y1-m*x1;
                const mPerp=frac(-dx,dy);
                let html='<span style="color:rgba(221,225,240,0.50);">Gradiënt m = ('+y2+'−'+y1+')/('+x2+'−'+x1+') = '+dy+'/'+dx+' = </span><span style="color:#fcd34d;">'+mFrac+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">y-afsnit c = y₁ − m·x₁ = '+y1+'−('+mFrac+')×'+x1+' = '+fmt(c)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Lyn: y = '+mFrac+'x '+(c>=0?'+ '+fmt(c):'− '+fmt(Math.abs(c)))+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Ewewydige lyne het gradiënt: </span><span style="color:#fcd34d;">m = '+mFrac+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Loodregte gradiënt: </span><span style="color:#fcd34d;">m⊥ = '+mPerp+(dy===0?' (vertikaal)':'')+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c8gBtn').addEventListener('click',run);
              ['g10c8gx1','g10c8gy1','g10c8gx2','g10c8gy2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Loodregte gradiënte is negatiewe omgekeerdes: as m = 2, dan is m⊥ = −½. Die produk is altyd −1: <span class="math">m × m⊥ = −1</span>.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Lyngrafiseerder — Gradiënt · Ewewydig · Loodreg</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee punte in om die lyn deur A en B te teken — voeg opsioneel 'n ewewydige en loodregte lyn by.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">x₁</div><input id="g10c8gvx1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">y₁</div><input id="g10c8gvy1" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div style="padding-bottom:8px;color:rgba(221,225,240,0.35);">→</div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">x₂</div><input id="g10c8gvx2" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px;">y₂</div><input id="g10c8gvy2" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <button id="g10c8gvBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;align-self:flex-end;">Teken</button>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:10px;font-size:13px;">
              <label style="display:flex;align-items:center;gap:5px;cursor:pointer;color:rgba(221,225,240,0.70);"><input type="checkbox" id="g10c8gvParallel" style="accent-color:#a5b4fc;"> <span style="color:#a5b4fc;">Wys ewewydige lyn (deur oorsprong)</span></label>
              <label style="display:flex;align-items:center;gap:5px;cursor:pointer;color:rgba(221,225,240,0.70);"><input type="checkbox" id="g10c8gvPerp"> <span style="color:#fcd34d;">Wys loodregte lyn (deur A)</span></label>
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
                // rooster
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
                  // vertikale lyn
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

                  // gradiëntdriehoek
                  const tx=2,ty=m*tx+c;
                  if(tx>=xMn&&tx<=xMx&&ty>=yMn&&ty<=yMx){
                    ctx.save();ctx.strokeStyle='rgba(110,231,183,0.40)';ctx.lineWidth=1;ctx.setLineDash([3,3]);
                    ctx.beginPath();ctx.moveTo(px(tx),py(ty));ctx.lineTo(px(tx+1),py(ty));ctx.lineTo(px(tx+1),py(ty+m));ctx.stroke();
                    ctx.restore();
                    ctx.fillStyle='rgba(110,231,183,0.60)';ctx.font='bold 10px monospace';ctx.textAlign='center';
                    ctx.fillText('m='+mStr,px(tx+0.5),py(ty)+(m>0?14:-5));
                  }

                  if(showParallel){
                    plotLine(lineFn(m,0),'rgba(165,180,252,0.70)','ewewydig (c=0)',xMx-2,'right');
                  }
                  if(showPerp&&Math.abs(m)>0.001){
                    plotLine(lineFn(mPerp,cPerp),'rgba(252,211,77,0.80)','m⊥='+fmt(mPerp),x1+1);
                  }

                  // afsnitte
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
          text: "Gradiënt van die lyn deur (2; 1) en (6; 9):",
          options: ["2", "½", "4", "8"],
          answer: 0,
          topic: "Gradiënt van 'n lyn"
        },
        {
          type: "mc",
          text: "'n Lyn het gradiënt 3. 'n Loodregte lyn het gradiënt:",
          options: ["3", "−3", "−⅓", "⅓"],
          answer: 2,
          topic: "Gradiënt van 'n lyn"
        },
        {
          type: "input",
          text: "Vind die gradiënt van die lyn deur (−1; 4) en (3; −4).",
          answer: "-2",
          altAnswers: ["−2"],
          topic: "Gradiënt van 'n lyn"
        },
        {
          type: "mc",
          text: "Die vergelyking van die lyn deur (0; 3) met gradiënt −2 is:",
          options: ["y = −2x", "y = −2x + 3", "y = 2x + 3", "y = 3x − 2"],
          answer: 1,
          topic: "Gradiënt van 'n lyn"
        },
        {
          type: "mc",
          text: "Lyne y = 3x − 1 en y = 3x + 5 is:",
          options: ["Loodreg", "Ewewydig", "Dieselfde lyn", "Sny mekaar teen regte hoeke"],
          answer: 1,
          topic: "Gradiënt van 'n lyn"
        },
        {
          type: "input",
          text: "Lyn AB het gradiënt 2/3 en gaan deur A(3; 1). Lyn CD is loodreg op AB en gaan deur C(0; 5). Vind die y-koördinaat van die punt waar CD die lyn x = 6 sny.",
          answer: "-4",
          altAnswers: ["−4"],
          topic: "Gradiënt van 'n lyn"
        }
      ]
    },
    {
      id: 802,
      chapter: 8,
      name: "Vergelyking van 'n lyn",
      fullName: "Vind en gebruik van die vergelyking van 'n reguit lyn",
      lesson: {
        heading: "Die vergelyking van 'n reguit lyn",
        sub: "Hoofstuk 8 · Onderwerp 3",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Vorms van 'n reguit lyn se vergelyking</div>
            <p>
              <strong>Gradiënt-afsnitvorm:</strong> <span class="math">y = mx + c</span>, waar m = gradiënt, c = y-afsnit<br>
              <strong>Punt-gradiëntvorm:</strong> <span class="math">y − y₁ = m(x − x₁)</span> — nuttig wanneer jy een punt en die gradiënt ken
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Vind die vergelyking van 'n lyn</div>
            <p>
              1. Vind die gradiënt m (uit twee punte, of uit 'n ewewydige/loodregte voorwaarde).<br>
              2. Vervang 'n bekende punt (x₁; y₁) en m in <span class="math">y − y₁ = m(x − x₁)</span>.<br>
              3. Herrangskik na <span class="math">y = mx + c</span>-vorm.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vergelyking deur twee punte</div>
            <p>Vind die vergelyking van die lyn deur A(−2; 1) en B(4; 13).<br>
            <span class="math">m = (13−1)/(4−(−2)) = 12/6 = 2</span><br>
            Gebruik A: <span class="math">y − 1 = 2(x − (−2)) = 2x + 4</span><br>
            <span class="math">y = 2x + 5</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Gebruik van 'n ewewydige voorwaarde</div>
            <p>Vind die vergelyking van die lyn deur (3; −2) wat ewewydig is aan y = 4x − 1.<br>
            Ewewydig → dieselfde gradiënt: m = 4<br>
            <span class="math">y − (−2) = 4(x − 3) → y = 4x − 14</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Bou-'n-lynvergelyking</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer een punt en óf 'n tweede punt óf 'n gradiënt in — bou die vergelyking stap vir stap.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₁</div><input id="g10c8ex1" type="number" value="-2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₁</div><input id="g10c8ey1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Modus</div>
                <select id="g10c8emode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="point">Tweede punt</option>
                  <option value="grad">Gradiënt</option>
                </select>
              </div>
              <div id="g10c8emodeInputs"></div>
              <button id="g10c8eBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bou vergelyking</button>
            </div>
            <div id="g10c8eOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fmt(n){return Number.isInteger(n)?''+n:parseFloat(n.toFixed(4))+'';}
              function inputsHTML(){
                const m=document.getElementById('g10c8emode').value;
                if(m==='point'){
                  return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₂</div><input id="g10c8ex2" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:monospace;text-align:center;"></div>'
                    +'<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y₂</div><input id="g10c8ey2" type="number" value="13" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:monospace;text-align:center;"></div>';
                }
                return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gradiënt m</div><input id="g10c8egm" type="number" value="2" step="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:monospace;text-align:center;"></div>';
              }
              function buildInputs(){
                document.getElementById('g10c8emodeInputs').innerHTML=inputsHTML();
                ['g10c8ex2','g10c8ey2','g10c8egm'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')run();});});
              }
              function run(){
                const x1=parseFloat(document.getElementById('g10c8ex1').value),y1=parseFloat(document.getElementById('g10c8ey1').value);
                const mode=document.getElementById('g10c8emode').value;
                const out=document.getElementById('g10c8eOut');
                let m;
                if(mode==='point'){
                  const x2=parseFloat(document.getElementById('g10c8ex2').value),y2=parseFloat(document.getElementById('g10c8ey2').value);
                  if([x1,y1,x2,y2].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige koördinate in.</span>';return;}
                  if(x2===x1){out.innerHTML='<span style="color:#fca5a5;">Vertikale lyn — gradiënt onbepaald. Vergelyking: x = '+x1+'</span>';return;}
                  m=(y2-y1)/(x2-x1);
                } else {
                  m=parseFloat(document.getElementById('g10c8egm').value);
                  if([x1,y1,m].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in.</span>';return;}
                }
                const c=y1-m*x1;
                let html='';
                if(mode==='point'){
                  const x2=parseFloat(document.getElementById('g10c8ex2').value),y2=parseFloat(document.getElementById('g10c8ey2').value);
                  html+='<span style="color:rgba(221,225,240,0.50);">m = ('+y2+'−'+y1+')/('+x2+'−'+x1+') = </span><span style="color:#fcd34d;">'+fmt(m)+'</span><br>';
                }
                html+='<span style="color:rgba(221,225,240,0.50);">y − '+y1+' = '+fmt(m)+'(x − '+x1+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">c = y₁ − m·x₁ = '+y1+' − ('+fmt(m)+')×'+x1+' = </span><span style="color:#fcd34d;">'+fmt(c)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Vergelyking: y = '+fmt(m)+'x '+(c>=0?'+ '+fmt(c):'− '+fmt(Math.abs(c)))+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c8emode').addEventListener('change',()=>{buildInputs();});
              document.getElementById('g10c8eBtn').addEventListener('click',run);
              document.getElementById('g10c8ex1').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              document.getElementById('g10c8ey1').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              buildInputs();
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer 'n vraag "ewewydig aan" of "loodreg op" 'n gegewe lyn noem, gee dit jou dadelik die gradiënt — jy het nie 'n tweede punt nodig nie.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Die vergelyking van die lyn deur (2; 5) met gradiënt 3 is:",
          options: ["y = 3x − 1", "y = 3x + 5", "y = 3x + 1", "y = 5x + 3"],
          answer: 0,
          topic: "Vergelyking van 'n lyn"
        },
        {
          type: "input",
          text: "Vind c as die lyn y = −2x + c deur (3; 1) gaan.",
          answer: "7",
          topic: "Vergelyking van 'n lyn"
        },
        {
          type: "mc",
          text: "Vind die vergelyking van die lyn deur (0; −4) en (2; 0):",
          options: ["y = 2x − 4", "y = 2x + 4", "y = −2x − 4", "y = 4x − 4"],
          answer: 0,
          topic: "Vergelyking van 'n lyn"
        },
        {
          type: "mc",
          text: "'n Lyn ewewydig aan y = −3x + 2 gaan deur (1; 4). Die vergelyking is:",
          options: ["y = −3x + 7", "y = 3x + 1", "y = −3x + 1", "y = −3x + 4"],
          answer: 0,
          topic: "Vergelyking van 'n lyn"
        },
        {
          type: "input",
          text: "'n Lyn loodreg op y = 2x − 1 gaan deur (4; 3). Vind sy gradiënt.",
          answer: "-0.5",
          altAnswers: ["-1/2", "−0.5", "-0,5"],
          topic: "Vergelyking van 'n lyn"
        },
        {
          type: "mc",
          text: "Lyn AB gaan deur A(−1; −2) en het vergelyking y = 3x + 1. Vind die y-koördinaat wanneer x = 2.",
          options: ["7", "5", "4", "6"],
          answer: 0,
          topic: "Vergelyking van 'n lyn"
        },
        {
          type: "input",
          text: "Vind die vergelyking van die lyn wat deur die snypunt van y = 2x − 1 en y = −x + 5 gaan, en ewewydig is aan y = 3x + 2. Gee jou antwoord in die vorm y = 3x + c (gee c).",
          answer: "-3",
          altAnswers: ["−3"],
          topic: "Vergelyking van 'n lyn"
        }
      ]
    },
    {
      id: 803,
      chapter: 8,
      name: "Analitiese meetkunde van vierhoeke",
      fullName: "Gebruik van afstand, gradiënt en middelpunt saam om figure te klassifiseer en eienskappe te bewys",
      lesson: {
        heading: "Klassifisering van figure met analitiese meetkunde",
        sub: "Hoofstuk 8 · Onderwerp 4",
        body: `
          <p>Deur die afstands-, gradiënt- en middelpuntsformules te kombineer kan ons <strong>bewys</strong> watter tipe figuur 'n stel punte vorm — sonder om op roosterpapier te teken.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Watter formule beantwoord watter vraag?</div>
            <p>
              <strong>Afstandsformule</strong> → is 'n sy/diagonaal 'n sekere lengte? Is twee sye gelyk?<br>
              <strong>Gradiëntformule</strong> → is twee sye ewewydig (gelyke m)? Loodreg (m₁ × m₂ = −1)?<br>
              <strong>Middelpuntsformule</strong> → halveer die diagonale mekaar?
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Kontrolelys om 'n vierhoek te klassifiseer</div>
            <p>
              • Albei pare opponerende sye ewewydig ÉN gelyk → <strong>parallelogram</strong><br>
              • Parallelogram + alle sye gelyk → <strong>ruit</strong><br>
              • Parallelogram + een regte hoek (aangrensende sye loodreg) → <strong>reghoek</strong><br>
              • Parallelogram + alle sye gelyk + een regte hoek → <strong>vierkant</strong><br>
              • Diagonale halveer mekaar → parallelogram (‘n kortpad-kontrole)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>A(0; 0), B(4; 2), C(6; 6), D(2; 4).<br>
            <span class="math">m_AB = (2−0)/(4−0) = ½</span>, <span class="math">m_DC = (6−4)/(6−2) = ½</span> → AB ∥ DC<br>
            <span class="math">AB = √(16+4) = √20</span>, <span class="math">DC = √(16+4) = √20</span> → AB = DC<br>
            Een paar sye gelyk en ewewydig ⟹ ABCD is 'n parallelogram.<br>
            Kontroleer <span class="math">m_AD = (4−0)/(2−0) = 2</span>; aangesien <span class="math">m_AB × m_AD = ½ × 2 = 1 ≠ −1</span>, is aangrensende sye nie loodreg nie, so dit is nie 'n reghoek nie.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Vierhoek-klassifiseerder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer vier hoekpunte A, B, C, D (in volgorde) in — die instrument kontroleer sylengtes, gradiënte, en klassifiseer die vorm.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A (x,y)</div><input id="g10c8qA" type="text" value="0,0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">B (x,y)</div><input id="g10c8qB" type="text" value="4,2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">C (x,y)</div><input id="g10c8qC" type="text" value="6,6" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">D (x,y)</div><input id="g10c8qD" type="text" value="2,4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <button id="g10c8qBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Klassifiseer</button>
            </div>
            <div id="g10c8qOut" style="font-size:14px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function parsePt(s){const p=s.split(',').map(v=>parseFloat(v.trim()));return p.length===2&&!p.some(isNaN)?p:null;}
              function dist(p,q){return Math.sqrt((q[0]-p[0])**2+(q[1]-p[1])**2);}
              function grad(p,q){return q[0]===p[0]?null:(q[1]-p[1])/(q[0]-p[0]);}
              function fmt(n){return n===null?'onbepaald':parseFloat(n.toFixed(4))+'';}
              function run(){
                const A=parsePt(document.getElementById('g10c8qA').value);
                const B=parsePt(document.getElementById('g10c8qB').value);
                const C=parsePt(document.getElementById('g10c8qC').value);
                const D=parsePt(document.getElementById('g10c8qD').value);
                const out=document.getElementById('g10c8qOut');
                if(!A||!B||!C||!D){out.innerHTML='<span style="color:#fca5a5;">Voer al vier punte as x,y in (bv. 4,2).</span>';return;}
                const AB=dist(A,B),BC=dist(B,C),CD=dist(C,D),DA=dist(D,A);
                const mAB=grad(A,B),mBC=grad(B,C),mCD=grad(C,D),mDA=grad(D,A);
                const near=(a,b)=>Math.abs(a-b)<0.001;
                const parAB_CD=(mAB===null&&mCD===null)||(mAB!==null&&mCD!==null&&near(mAB,mCD));
                const parBC_DA=(mBC===null&&mDA===null)||(mBC!==null&&mDA!==null&&near(mBC,mDA));
                const eqAB_CD=near(AB,CD), eqBC_DA=near(BC,DA);
                const perpAB_BC=(mAB!==null&&mBC!==null)&&near(mAB*mBC,-1);
                let shape='Vierhoek (geen spesiale eienskappe bespeur nie)';
                const isPara=(parAB_CD&&parBC_DA);
                if(isPara){
                  const allEqual=near(AB,BC)&&near(BC,CD)&&near(CD,DA);
                  if(allEqual&&perpAB_BC) shape='Vierkant';
                  else if(allEqual) shape='Ruit';
                  else if(perpAB_BC) shape='Reghoek';
                  else shape='Parallelogram';
                } else if((parAB_CD&&!parBC_DA)||(!parAB_CD&&parBC_DA)){
                  shape='Trapesium (een paar ewewydige sye)';
                }
                let html='<span style="color:rgba(221,225,240,0.50);">AB = '+fmt(AB)+', BC = '+fmt(BC)+', CD = '+fmt(CD)+', DA = '+fmt(DA)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">m(AB) = '+fmt(mAB)+', m(BC) = '+fmt(mBC)+', m(CD) = '+fmt(mCD)+', m(DA) = '+fmt(mDA)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">AB ∥ CD? </span><span style="color:'+(parAB_CD?'#6ee7b7':'#fca5a5')+'">'+(parAB_CD?'Ja':'Nee')+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">BC ∥ DA? </span><span style="color:'+(parBC_DA?'#6ee7b7':'#fca5a5')+'">'+(parBC_DA?'Ja':'Nee')+'</span><br>';
                html+='<span style="color:#fcd34d;">Klassifikasie: '+shape+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c8qBtn').addEventListener('click',run);
              ['g10c8qA','g10c8qB','g10c8qC','g10c8qD'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>In 'n eksamen moet jy altyd die redenasie eksplisiet stel: bv. "m_AB = m_DC = ½ ⟹ AB ∥ DC" en "AB = DC = √20" — 'n numeriese antwoord alleen verdien nie volpunte vir 'n "toon dat"-vraag nie.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A(0;0), B(4;0), C(4;3), D(0;3). Watter vorm is ABCD?",
          options: ["Reghoek", "Ruit", "Trapesium", "Vlieër"],
          answer: 0,
          topic: "Analitiese meetkunde van vierhoeke"
        },
        {
          type: "mc",
          text: "Om te wys dat 'n vierhoek se diagonale mekaar halveer, moet jy bereken:",
          options: ["Die gradiënte van al vier sye", "Die middelpunte van albei diagonale", "Die lengtes van al vier sye", "Die gradiënt van net een diagonaal"],
          answer: 1,
          topic: "Analitiese meetkunde van vierhoeke"
        },
        {
          type: "mc",
          text: "P(1;1), Q(5;1), R(5;5), S(1;5). PQRS word die beste geklassifiseer as:",
          options: ["Vierkant", "Ruit (nie vierkant nie)", "Trapesium", "Vlieër"],
          answer: 0,
          topic: "Analitiese meetkunde van vierhoeke"
        },
        {
          type: "input",
          text: "A(0;0), B(6;0), C(6;4), D(0;4). Vind die lengte van diagonaal AC.",
          answer: "7.21",
          altAnswers: ["7,21", "√52"],
          topic: "Analitiese meetkunde van vierhoeke"
        },
        {
          type: "mc",
          text: "Vir ABCD om 'n ruit te wees (gegewe dit is reeds 'n parallelogram), moet jy addisioneel wys:",
          options: ["Diagonale is gelyk", "Een hoek is 90°", "Al vier sye is gelyk in lengte", "Diagonale is ewewydig"],
          answer: 2,
          topic: "Analitiese meetkunde van vierhoeke"
        },
        {
          type: "mc",
          text: "A(1;1), B(5;3), C(7;7), D(3;5). Gebruik gradiënte om te bepaal of ABCD 'n reghoek is.",
          options: ["Ja, dit is 'n reghoek", "Nee — dit is 'n parallelogram maar nie 'n reghoek nie", "Nee — dit is net 'n trapesium", "Nee — dit is geensins 'n spesiale vierhoek nie"],
          answer: 1,
          topic: "Analitiese meetkunde van vierhoeke"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 8 Werkboek — Analitiese meetkunde",
    questions: [
      {
        number: 1,
        text: "Punte A(−2; 3), B(4; 11), en C(1; 0) is gegee.",
        parts: [
          { label: "a", text: "Bereken AB.", marks: 3 },
          { label: "b", text: "Vind die middelpunt M van AB.", marks: 2 },
          { label: "c", text: "Vind die gradiënt van AB.", marks: 2 },
          { label: "d", text: "Skryf die vergelyking van lyn AB in die vorm y = mx + c.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "A(1; 4) en B(7; −2) is eindpunte van 'n lynstuk.",
        parts: [
          { label: "a", text: "Vind die middelpunt M.", marks: 2 },
          { label: "b", text: "Vind die gradiënt van AB.", marks: 2 },
          { label: "c", text: "Vind die gradiënt van 'n lyn loodreg op AB.", marks: 1 },
          { label: "d", text: "Skryf die vergelyking van die loodregte middelloodlyn van AB.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "ABCD is 'n vierhoek met A(0; 0), B(4; 2), C(6; −2), D(2; −4).",
        parts: [
          { label: "a", text: "Wys dat AB ewewydig is aan DC.", marks: 4 },
          { label: "b", text: "Wys dat AB = DC in lengte.", marks: 3 },
          { label: "c", text: "Watter tipe vierhoek is ABCD? Gee 'n rede.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "AB = √(36+64) = √100 = 10",
        b: "M = (1; 7)",
        c: "m = (11−3)/(4−(−2)) = 8/6 = 4/3",
        d: "y = (4/3)x + 17/3"
      },
      2: {
        a: "M = (4; 1)",
        b: "m = (−2−4)/(7−1) = −1",
        c: "m_perp = 1",
        d: "y−1=1(x−4) → y=x−3"
      },
      3: {
        a: "m_AB=(2−0)/(4−0)=1/2; m_DC=(−4−(−2))/(2−6)=−2/−4=1/2 → AB∥DC",
        b: "AB=√20=2√5; DC=√20=2√5 → AB = DC = √20",
        c: "Parallelogram — een paar opponerende sye (AB, DC) is beide ewewydig en gelyk, wat voldoende is om 'n parallelogram te bewys. Dit is trouens 'n vierkant: AD = BC = √20 (al vier sye gelyk) en AB is loodreg op BC (AB·BC = 0), so al die hoeke is 90°."
      }
    }
  }
});
