// Math Magician — Grade 11, Hoofstuk 5 data (Afrikaans)
// Funksies

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 500,
      chapter: 5,
      name: "Kwadratiese, hiperboliese en eksponensiële funksies",
      fullName: "Gevorderde analise van kwadratiese, hiperboliese en eksponensiële funksies",
      lesson: {
        heading: "Gevorderde funksie-analise",
        sub: "Hoofstuk 5 · Onderwerp 1",
        body: `
          <p>Graad 11 gaan dieper in op funksies — die vind van vergelykings vanaf grafieke, gemiddelde gradiënt, en die effek van parameters a, p, q.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Gemiddelde gradiënt</div>
            <p>
              Die gemiddelde gradiënt tussen twee punte op 'n kurwe is die gradiënt van die koord wat hulle verbind:<br>
              <span class="math">m_avg = (f(x₂) − f(x₁)) / (x₂ − x₁)</span><br><br>
              Dit benader die oombliklike tempo van verandering (wat eers in Graad 12-calculus formeel behandel word).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Effek van parameters — algemene vorms</div>
            <p>
              <strong>Kwadraties:</strong> <span class="math">y = a(x − p)² + q</span><br>
              a: rigting en strekking; p: horisontale skuif; q: vertikale skuif<br><br>
              <strong>Hiperbool:</strong> <span class="math">y = a/(x − p) + q</span><br>
              Asimptote: x = p, y = q<br><br>
              <strong>Eksponensieel:</strong> <span class="math">y = a · bˣ⁻ᵖ + q</span><br>
              Asimptoot: y = q; y-afsnit skuif saam met p
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Gemiddelde gradiënt</div>
            <p>f(x) = x². Gemiddelde gradiënt tussen x = 2 en x = 5:<br>
            <span class="math">m = (f(5) − f(2))/(5−2) = (25−4)/3 = 21/3 = 7</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vind die vergelyking vanaf 'n grafiek</div>
            <p>Parabool met draaipunt (2; −3) wat deur (0; 1) gaan:<br>
            <span class="math">y = a(x−2)² − 3</span><br>
            Vervang (0; 1): <span class="math">1 = a(4) − 3 → a = 1</span><br>
            <span class="math">y = (x−2)² − 3</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Gemiddelde-gradiënt-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer 'n funksie en twee x-waardes in — bereken die gemiddelde gradiënt (koord-helling) tussen hulle.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Funksietipe</div>
                <select id="g11c5ftype" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="quad">Kwadraties: ax²+bx+c</option>
                  <option value="hyp">Hiperbool: a/(x−p)+q</option>
                  <option value="exp">Eksponensieel: a·bˣ+q</option>
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
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (grondtal)</div><input id="g11c5eb" type="number" value="2" min="0.01" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div><input id="g11c5eq" type="number" value="0" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₁</div><input id="g11c5x1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x₂</div><input id="g11c5x2" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c5Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
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
                if(isNaN(x1)||isNaN(x2)||x1===x2){out.innerHTML='<span style="color:#fca5a5;">Voer twee verskillende x-waardes in.</span>';return;}
                try{
                  const y1=eval_(x1),y2=eval_(x2);
                  if(!isFinite(y1)||!isFinite(y2)){out.innerHTML='<span style="color:#fca5a5;">Een of albei x-waardes is onbepaald vir hierdie funksie (bv. asimptoot).</span>';return;}
                  const m=(y2-y1)/(x2-x1);
                  let html='<span style="color:rgba(221,225,240,0.50);">f('+x1+') = '+f(y1)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">f('+x2+') = '+f(y2)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">m_avg = (f('+x2+') − f('+x1+')) / ('+x2+' − '+x1+') = ('+f(y2)+' − '+f(y1)+') / '+f(x2-x1)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">Gemiddelde gradiënt = '+f(m)+'</span>';
                  out.innerHTML=html;
                }catch(e){out.innerHTML='<span style="color:#fca5a5;">Fout tydens evaluering van die funksie.</span>';}
              });
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die gemiddelde gradiënt is die helling van die <strong>koord</strong> tussen twee punte — dit benader die oombliklike tempo van verandering. Soos x₁ → x₂, nader dit die afgeleide (Graad 12-calculus).</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Funksiegrafeerder — Kwadraties · Hiperbool · Eksponensieel</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Gebruik die insette van die berekenaar hierbo — klik <strong>Teken grafiek</strong> nadat jy die parameters ingevoer het om die kurwe en die gemiddelde-gradiënt-koord te sien.</p>
            <button id="g11c5gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Teken grafiek</button>
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
                // Bepaal x-omvang
                let xMn,xMx;
                if(type==='quad'){const vx=-bv/(2*a)||0;xMn=Math.min(vx,x1,x2)-6;xMx=Math.max(vx,x1,x2)+6;}
                else if(type==='hyp'){xMn=-9;xMx=9;}
                else{xMn=Math.min(-6,x1-1);xMx=Math.max(6,x2+1);}

                // Skat y-omvang deur monsterneming
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
          text: "Gemiddelde gradiënt van f(x) = 2x² tussen x = 1 en x = 3:",
          options: ["8", "16", "4", "6"],
          answer: 0,
          topic: "Kwadratiese, hiperboliese en eksponensiële funksies"
        },
        {
          type: "mc",
          text: "y = a/(x−2) + 3. Die vertikale asimptoot is:",
          options: ["y = 3", "x = 3", "x = 2", "y = 2"],
          answer: 2,
          topic: "Kwadratiese, hiperboliese en eksponensiële funksies"
        },
        {
          type: "mc",
          text: "'n Parabool het draaipunt (−1; 4) en a = −2. Die vergelyking daarvan is:",
          options: ["y = −2(x+1)² + 4", "y = −2(x−1)² + 4", "y = 2(x+1)² − 4", "y = −2(x+1)² − 4"],
          answer: 0,
          topic: "Kwadratiese, hiperboliese en eksponensiële funksies"
        },
        {
          type: "input",
          text: "f(x) = x² − 4x. Vind die gemiddelde gradiënt tussen x = 1 en x = 4.",
          answer: "1",
          topic: "Kwadratiese, hiperboliese en eksponensiële funksies"
        },
        {
          type: "mc",
          text: "Eksponensiële funksie y = 3 · 2^x + 1. Wat is die horisontale asimptoot?",
          options: ["y = 3", "y = 1", "y = 2", "x = 1"],
          answer: 1,
          topic: "Kwadratiese, hiperboliese en eksponensiële funksies"
        },
        {
          type: "input",
          text: "'n Hiperbool y = a/(x−p) + q het asimptote x = 3 en y = −2, en gaan deur (5; −1). Vind a.",
          answer: "2",
          topic: "Kwadratiese, hiperboliese en eksponensiële funksies"
        }
      ]
    },
    {
      id: 501,
      chapter: 5,
      name: "Trigonometriese funksies — periode, amplitude en fase-skuif",
      fullName: "Sinus-, kosinus- en tangensfunksies met periode, amplitude en fase-skuif",
      lesson: {
        heading: "Trig-funksies — periode, amplitude en fase-skuif",
        sub: "Hoofstuk 5 · Onderwerp 2",
        body: `
          <p>Graad 11 brei trig-grafieke uit om <strong>periodeveranderinge</strong> en <strong>horisontale skuiwe (fase-skuiwe)</strong> in te sluit.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Algemene vorm: y = a sin(bx + p) + q</div>
            <p>
              <strong>Amplitude</strong> = |a|<br>
              <strong>Periode</strong> = 360°/|b| (vir sin en cos)<br>
              <strong>Fase-skuif</strong> = −p/b (horisontale skuif)<br>
              <strong>Vertikale skuif</strong> = q<br>
              Waardeversameling: [q − |a|; q + |a|]
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: y = 2sin(2x − 60°) + 1</div>
            <p>
              a = 2 → amplitude = 2<br>
              b = 2 → periode = 360°/2 = 180°<br>
              Fase-skuif: −(−60°)/2 = 30° (30° na regs geskuif)<br>
              Vertikale skuif: q = 1<br>
              Waardeversameling: [−1; 3]<br>
              Maksimum by x: 2x − 60° = 90° → x = 75°
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Tangensfunksie: y = a tan(bx) + q</div>
            <p>
              Periode = 180°/|b|<br>
              Asimptote by: <span class="math">bx = 90° + 180°n</span><br>
              Geen amplitude nie (onbegrens)
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Trig-funksie-eienskapberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer a, b, p, q in vir y = a·sin/cos(bx + p°) + q — kry al die sleuteleienskappe.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Tipe</div>
                <select id="g11c5t2trig" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option>sin</option><option>cos</option><option>tan</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c5t2a" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c5t2b" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">p (°)</div><input id="g11c5t2p" type="number" value="-60" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div><input id="g11c5t2q" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c5t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Ontleed</button>
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
                if([a,b,p,q].some(isNaN)||b===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (b ≠ 0).</span>';return;}
                const amp=Math.abs(a);
                const period=trig==='tan'?180/Math.abs(b):360/Math.abs(b);
                const phaseShift=-p/b;
                const ps=phaseShift>=0?'regs':'links';
                const isTan=trig==='tan';
                let html='<span style="color:rgba(221,225,240,0.50);">Funksie: y = '+a+'·'+trig+'('+b+'x + ('+p+'°)) + '+q+'</span><br>';
                html+='<span style="color:#fcd34d;">Amplitude: </span><span style="color:#6ee7b7;">'+(isTan?'Geen (onbegrens)':amp)+'</span><br>';
                html+='<span style="color:#fcd34d;">Periode: </span><span style="color:#6ee7b7;">'+f(period)+'°</span><br>';
                html+='<span style="color:#fcd34d;">Fase-skuif: </span><span style="color:#6ee7b7;">'+f(Math.abs(phaseShift))+'° '+ps+'</span><br>';
                html+='<span style="color:#fcd34d;">Vertikale skuif: </span><span style="color:#6ee7b7;">'+q+'</span><br>';
                if(!isTan){
                  const max=q+amp,min=q-amp;
                  html+='<span style="color:#fcd34d;">Waardeversameling: </span><span style="color:#6ee7b7;">['+f(min)+'; '+f(max)+']</span><br>';
                  html+='<span style="color:#fcd34d;">Maksimum: </span><span style="color:#6ee7b7;">'+f(max)+'</span>  <span style="color:#fcd34d;">Minimum: </span><span style="color:#6ee7b7;">'+f(min)+'</span>';
                } else {
                  html+='<span style="color:#fcd34d;">Asimptote by: </span><span style="color:#6ee7b7;">bx + p = 90° + 180°n → x = (90°−'+p+')/'+b+' + 180°n/'+b+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c5t2Btn').addEventListener('click',calc);
              ['g11c5t2a','g11c5t2b','g11c5t2p','g11c5t2q'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Fase-skuif = −p/b. 'n Positiewe fase-skuif beteken die grafiek beweeg <strong>regs</strong>. Vir y = sin(2x − 60°): fase-skuif = −(−60°)/2 = +30° na regs.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Trig-funksiegrafeerder — Periode · Amplitude · Fase-skuif</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Gebruik parameters van die berekenaar hierbo — wys die golf met periode-merkers, maks-/min-kolletjies, en fase-skuif-notasie.</p>
            <button id="g11c5t2gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Teken grafiek</button>
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
                    if(xMax>=xMn&&xMax<=xMx)peaks.push([xMax,maxY,'#6ee7b7','maks']);
                    if(xMin>=xMn&&xMin<=xMx)peaks.push([xMin,minY,'#fca5a5','min']);
                  }
                  peaks.forEach(([x,y,c,l])=>{
                    ctx.fillStyle=c;ctx.beginPath();ctx.arc(px(x),py(y),5,0,Math.PI*2);ctx.fill();
                    ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                    ctx.fillStyle=c;ctx.font='bold 10px monospace';ctx.textAlign='left';
                    ctx.fillText(l+' '+fmt(y),px(x)+7,py(y)+(l==='min'?14:-6));
                  });
                }

                // aantekeninge (inligting linksbo)
                const info=['Periode: '+fmt(period)+'°','Amplitude: '+(fn==='tan'?'—':fmt(amp)),'Fase-skuif: '+fmt(Math.abs(phaseShift))+'° '+(phaseShift>=0?'regs':'links'),'Waardeversameling: '+(fn==='tan'?'ℝ':'['+fmt(q-amp)+', '+fmt(q+amp)+']')];
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
          text: "Periode van y = sin(3x):",
          options: ["180°", "90°", "120°", "270°"],
          answer: 2,
          topic: "Trigonometriese funksies — periode, amplitude en fase-skuif"
        },
        {
          type: "mc",
          text: "y = 3cos(x − 45°). Die grafiek is geskuif:",
          options: ["45° na links", "45° na regs", "3 eenhede op", "3 eenhede na regs"],
          answer: 1,
          topic: "Trigonometriese funksies — periode, amplitude en fase-skuif"
        },
        {
          type: "input",
          text: "y = −2sin(x) + 3. Wat is die maksimum y-waarde?",
          answer: "5",
          topic: "Trigonometriese funksies — periode, amplitude en fase-skuif"
        },
        {
          type: "mc",
          text: "Die periode van y = tan(2x) is:",
          options: ["360°", "180°", "90°", "45°"],
          answer: 2,
          topic: "Trigonometriese funksies — periode, amplitude en fase-skuif"
        },
        {
          type: "mc",
          text: "y = sin(x + 30°). Waar is die eerste positiewe maksimum?",
          options: ["x = 90°", "x = 60°", "x = 120°", "x = 30°"],
          answer: 1,
          topic: "Trigonometriese funksies — periode, amplitude en fase-skuif"
        },
        {
          type: "input",
          text: "'n Funksie y = a·cos(bx) + q het amplitude 3, periode 180°, en gaan deur (0°; 7). Gegewe a &gt; 0, vind q.",
          answer: "4",
          topic: "Trigonometriese funksies — periode, amplitude en fase-skuif"
        }
      ]
    },
    {
      id: 502,
      chapter: 5,
      name: "Skets van funksies: afsnitte, domein en waardeversameling",
      fullName: "Die vind van afsnitte, domein, waardeversameling, en die vergelyking van 'n funksie vanaf 'n skets of gegewe inligting",
      lesson: {
        heading: "Skets van funksies — afsnitte, domein en waardeversameling",
        sub: "Hoofstuk 5 · Onderwerp 3",
        body: `
          <p>Voordat jy 'n kwadratiese, hiperboliese, of eksponensiële grafiek akkuraat kan skets, moet jy die <strong>afsnitte</strong>, die <strong>domein en waardeversameling</strong> vind, en — dikwels — agteruit werk vanaf gegewe eienskappe om die vergelyking self te vind.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Vind van afsnitte</div>
            <p>
              <strong>y-afsnit:</strong> stel x = 0 en evalueer.<br>
              <strong>x-afsnit(te):</strong> stel y = 0 en los op vir x (faktoriseer vir 'n kwadratiese funksie; vir 'n hiperbool of eksponensiële funksie, isoleer die veranderlike algebraïes).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Domein en waardeversameling</div>
            <p>
              <strong>Kwadraties</strong> y = a(x−p)² + q: domein x ∈ ℝ; waardeversameling y ≥ q (as a &gt; 0) of y ≤ q (as a &lt; 0).<br>
              <strong>Hiperbool</strong> y = a/(x−p) + q: domein x ∈ ℝ, x ≠ p; waardeversameling y ∈ ℝ, y ≠ q.<br>
              <strong>Eksponensieel</strong> y = a·b^(x−p) + q: domein x ∈ ℝ; waardeversameling y &gt; q (as a &gt; 0) of y &lt; q (as a &lt; 0).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Afsnitte van 'n kwadratiese funksie</div>
            <p>y = (x−1)(x+3)<br>
            y-afsnit: x = 0 → y = (−1)(3) = −3 → (0; −3)<br>
            x-afsnitte: y = 0 → x = 1 of x = −3 → (1; 0) en (−3; 0)</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vind die vergelyking vanaf gegewe eienskappe</div>
            <p>'n Hiperbool het asimptote x = 1 en y = 2, en gaan deur (3; 3).<br>
            <span class="math">y = a/(x−1) + 2</span><br>
            Vervang (3; 3): <span class="math">3 = a/2 + 2 → a/2 = 1 → a = 2</span><br>
            Vergelyking: <span class="math">y = 2/(x−1) + 2</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Afsnitte-, domein- en waardeversamelingvinder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies 'n funksietipe en voer die parameters in — sien afsnitte, domein, en waardeversameling.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Funksietipe</div>
                <select id="g11c5t3type" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="quad">Kwadraties: a(x−p)²+q</option>
                  <option value="hyp">Hiperbool: a/(x−p)+q</option>
                  <option value="exp">Eksponensieel: a·bˣ⁻ᵖ+q</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c5t3a" type="number" value="1" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div id="g11c5t3bDiv" style="display:none;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (grondtal)</div><input id="g11c5t3b" type="number" value="2" min="0.01" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">p</div><input id="g11c5t3p" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">q</div><input id="g11c5t3q" type="number" value="-3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c5t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Ontleed</button>
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
                if([a,p,q].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (a ≠ 0).</span>';return;}
                let html='';
                if(t==='quad'){
                  const yInt=a*p*p+q;
                  const disc=-q/a;
                  html+='<span style="color:rgba(221,225,240,0.50);">y = '+a+'(x−'+p+')² + '+q+'</span><br>';
                  html+='<span style="color:#fcd34d;">y-afsnit: </span><span style="color:#6ee7b7;">(0; '+f(yInt)+')</span><br>';
                  if(disc<0){html+='<span style="color:#fcd34d;">x-afsnitte: </span><span style="color:#fca5a5;">geen (draaipunt bereik nie die x-as nie)</span><br>';}
                  else{const d=Math.sqrt(disc);const x1=p-d,x2=p+d;html+='<span style="color:#fcd34d;">x-afsnitte: </span><span style="color:#6ee7b7;">x = '+f(x1)+' en x = '+f(x2)+'</span><br>';}
                  html+='<span style="color:#fcd34d;">Draaipunt: </span><span style="color:#6ee7b7;">('+p+'; '+q+')</span><br>';
                  html+='<span style="color:#fcd34d;">Domein: </span><span style="color:#6ee7b7;">x ∈ ℝ</span> &nbsp; <span style="color:#fcd34d;">Waardeversameling: </span><span style="color:#6ee7b7;">y '+(a>0?'≥':'≤')+' '+q+'</span>';
                } else if(t==='hyp'){
                  const yInt=p===0?NaN:(a/(-p)+q);
                  html+='<span style="color:rgba(221,225,240,0.50);">y = '+a+'/(x−'+p+') + '+q+'</span><br>';
                  if(p===0){html+='<span style="color:#fca5a5;">y-afsnit onbepaald (asimptoot by x = 0)</span><br>';}
                  else{html+='<span style="color:#fcd34d;">y-afsnit: </span><span style="color:#6ee7b7;">(0; '+f(yInt)+')</span><br>';}
                  if(q===0){html+='<span style="color:#fca5a5;">x-afsnit onbepaald (asimptoot by y = 0)</span><br>';}
                  else{const xInt=p-a/q;html+='<span style="color:#fcd34d;">x-afsnit: </span><span style="color:#6ee7b7;">('+f(xInt)+'; 0)</span><br>';}
                  html+='<span style="color:#fcd34d;">Asimptote: </span><span style="color:#6ee7b7;">x = '+p+', y = '+q+'</span><br>';
                  html+='<span style="color:#fcd34d;">Domein: </span><span style="color:#6ee7b7;">x ∈ ℝ, x ≠ '+p+'</span> &nbsp; <span style="color:#fcd34d;">Waardeversameling: </span><span style="color:#6ee7b7;">y ∈ ℝ, y ≠ '+q+'</span>';
                } else {
                  const b=gv('g11c5t3b');
                  if(isNaN(b)||b<=0){out.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige grondtal b &gt; 0 in.</span>';return;}
                  const yInt=a*Math.pow(b,-p)+q;
                  html+='<span style="color:rgba(221,225,240,0.50);">y = '+a+'·'+b+'^(x−'+p+') + '+q+'</span><br>';
                  html+='<span style="color:#fcd34d;">y-afsnit: </span><span style="color:#6ee7b7;">(0; '+f(yInt)+')</span><br>';
                  const canCrossX=(a>0&&-q/a>0)||(a<0&&-q/a>0);
                  if(q===0){html+='<span style="color:#fca5a5;">Geen x-afsnit nie (asimptoot y = 0 gaan net in die limiet daardeur)</span><br>';}
                  else if((a>0&&q<0)||(a<0&&q>0)){
                    const ratio=-q/a;const xInt=p+Math.log(ratio)/Math.log(b);
                    html+='<span style="color:#fcd34d;">x-afsnit: </span><span style="color:#6ee7b7;">('+f(xInt)+'; 0)</span><br>';
                  } else {html+='<span style="color:#fca5a5;">Geen x-afsnit nie (grafiek bereik nooit y = 0 nie)</span><br>';}
                  html+='<span style="color:#fcd34d;">Asimptoot: </span><span style="color:#6ee7b7;">y = '+q+'</span><br>';
                  html+='<span style="color:#fcd34d;">Domein: </span><span style="color:#6ee7b7;">x ∈ ℝ</span> &nbsp; <span style="color:#fcd34d;">Waardeversameling: </span><span style="color:#6ee7b7;">y '+(a>0?'>':'<')+' '+q+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c5t3Btn').addEventListener('click',calc);
              ['g11c5t3a','g11c5t3b','g11c5t3p','g11c5t3q'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Identifiseer altyd <em>eers</em> die asimptote van 'n hiperbool of eksponensiële funksie — hulle gee jou p en q direk, aangesien 'n hiperbool se asimptote x = p, y = q is, en 'n eksponensiële funksie se horisontale asimptoot y = q is.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "y = (x−2)(x+4). Die x-afsnitte is:",
          options: ["x = 2 en x = −4", "x = −2 en x = 4", "x = 2 en x = 4", "x = −2 en x = −4"],
          answer: 0,
          topic: "Skets van funksies: afsnitte, domein en waardeversameling"
        },
        {
          type: "mc",
          text: "Vir y = 3/(x+1) − 2, is die waardeversameling:",
          options: ["y ∈ ℝ, y ≠ −2", "y ∈ ℝ, y ≠ −1", "y ≥ −2", "y ≤ −2"],
          answer: 0,
          topic: "Skets van funksies: afsnitte, domein en waardeversameling"
        },
        {
          type: "input",
          text: "y = 2(x−3)² + 5. Wat is die y-afsnit? (Gee net die y-waarde.)",
          answer: "23",
          topic: "Skets van funksies: afsnitte, domein en waardeversameling"
        },
        {
          type: "mc",
          text: "'n Hiperbool het asimptote x = 0 en y = 1, en gaan deur (2; 3). Die vergelyking daarvan is:",
          options: ["y = 4/x + 1", "y = 2/x + 1", "y = 4/x − 1", "y = 1/x + 2"],
          answer: 0,
          topic: "Skets van funksies: afsnitte, domein en waardeversameling"
        },
        {
          type: "mc",
          text: "y = −3(x+1)² + 2. Die waardeversameling van hierdie funksie is:",
          options: ["y ≤ 2", "y ≥ 2", "y ≤ −1", "y ∈ ℝ"],
          answer: 0,
          topic: "Skets van funksies: afsnitte, domein en waardeversameling"
        },
        {
          type: "mc",
          text: "'n Eksponensiële grafiek y = a·bˣ + q het horisontale asimptoot y = −2 en a > 0. Die waardeversameling daarvan is:",
          options: ["y > −2", "y < −2", "y ≥ −2", "y ∈ ℝ"],
          answer: 0,
          topic: "Skets van funksies: afsnitte, domein en waardeversameling"
        },
        {
          type: "input",
          text: "'n Parabool y = a(x−p)² + q het draaipunt (2; −8) en gaan deur (5; 1). Vind a, en gebruik dit dan om die y-afsnit te bepaal.",
          answer: "-4",
          altAnswers: ["−4"],
          topic: "Skets van funksies: afsnitte, domein en waardeversameling"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 5 Werkboek — Funksies",
    questions: [
      {
        number: 1,
        text: "Skets y = −(x+1)² + 4 vir x ∈ [−4; 2]. Merk al die sleuteleienskappe.",
        parts: [
          { label: "a", text: "Vind die draaipunt en simmetrie-as.", marks: 2 },
          { label: "b", text: "Vind die x- en y-afsnitte.", marks: 4 },
          { label: "c", text: "Vind die gemiddelde gradiënt tussen x = −3 en x = 0.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Skets y = 2sin(2x) − 1 vir x ∈ [0°; 360°]. Merk afsnitte, maksima, en minima.",
        parts: [
          { label: "a", text: "Gee die amplitude, periode, en waardeversameling.", marks: 3 },
          { label: "b", text: "Vind die x-afsnitte in [0°; 360°].", marks: 4 },
          { label: "c", text: "Vind die koördinate van die maksimum- en minimumpunte.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "Die grafiek van y = a/(x − p) + q het asimptote x = 2 en y = −1, en gaan deur (4; 0).",
        parts: [
          { label: "a", text: "Skryf p en q neer.", marks: 2 },
          { label: "b", text: "Vind a.", marks: 3 },
          { label: "c", text: "Skryf die vergelyking van die funksie neer.", marks: 1 }
        ]
      },
      {
        number: 4,
        text: "'n Hiperbool het horisontale asimptoot y = 1. Sommige van sy (x; y)-waardes word in die tabel hieronder gegee (let wel: een x-waarde tussen 1 en 3 ontbreek omdat die funksie daar onbepaald is):<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>x</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>y</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−5</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>7</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td></tr></table>",
        parts: [
          { label: "a", text: "Die waardes spring skerp tussen x = 1 en x = 3. Gee die x-waarde van die vertikale asimptoot (waar die funksie onbepaald is).", marks: 1 },
          { label: "b", text: "Gebruik die asimptote van (a) en die gegewe y = 1, en die punt (3; 7) uit die tabel, om die waarde van a in y = a/(x−p) + q te vind.", marks: 3 },
          { label: "c", text: "Gebruik jou vergelyking om die y-waarde by x = 8 te voorspel (nie in die tabel getoon nie).", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Draaipunt (−1; 4); as x = −1",
        b: "y-afsnit: (0, 3); x-afsnitte: −(x+1)²+4=0 → x=1 of x=−3",
        c: "f(−3)=−(−2)²+4=0; f(0)=3; m=(3−0)/(0−(−3))=1"
      },
      2: {
        a: "Amplitude=2; periode=180°; waardeversameling=[−3;1]",
        b: "2sin2x=1→sin2x=½→2x=30°,150°,390°,510°→x=15°,75°,195°,255°",
        c: "Maks by 2x=90°→x=45°: y=1; min by x=135°: y=−3"
      },
      3: {
        a: "p=2; q=−1",
        b: "0=a/(4−2)−1→1=a/2→a=2",
        c: "y=2/(x−2)−1"
      },
      4: {
        a: "x = 2 (die funksie is daar onbepaald — vertikale asimptoot)",
        b: "7 = a/(3−2) + 1 → 7 = a + 1 → a = 6",
        c: "y = 6/(8−2) + 1 = 6/6 + 1 = 2"
      }
    }
  }
});
