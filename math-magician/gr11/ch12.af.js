// Math Magician — Graad 11, Hoofstuk 12
// Lineêre Programmering

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 1200,
      chapter: 12,
      name: "Opstel van lineêre-programmeringprobleme",
      fullName: "Beperkings, uitvoerbare gebiede, en doelfunksies",
      lesson: {
        heading: "Opstel van lineêre-programmeringprobleme",
        sub: "Hoofstuk 12 · Onderwerp 1",
        body: `
          <p><strong>Lineêre programmering</strong> bepaal die maksimum- of minimumwaarde van 'n doelfunksie onderworpe aan lineêre beperkings (ongelykhede). Dit word in besigheidsoptimering gebruik.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Sleutelterme</div>
            <p>
              <strong>Besluitveranderlikes:</strong> die onbekendes (bv. x en y, wat hoeveelhede voorstel wat vervaardig moet word)<br>
              <strong>Beperkings:</strong> ongelykhede wat die veranderlikes beperk (insluitend x ≥ 0, y ≥ 0)<br>
              <strong>Uitvoerbare gebied:</strong> die area op die grafiek wat AL die beperkings gelyktydig bevredig<br>
              <strong>Doelfunksie:</strong> die uitdrukking wat gemaksimeer of geminimeer moet word (bv. P = 3x + 5y)<br>
              <strong>Hoekpunte (winkelpunte):</strong> die optimale oplossing kom altyd by 'n hoekpunt van die uitvoerbare gebied voor
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Metode</div>
            <p>
              1. Definieer veranderlikes (stel duidelik)<br>
              2. Skryf al die beperkings as ongelykhede<br>
              3. Skryf die doelfunksie<br>
              4. Teken beperkingslyne op 'n grafiek<br>
              5. Merk (skadueer) die uitvoerbare gebied<br>
              6. Bepaal al die hoekpunte<br>
              7. Evalueer die doelfunksie by elke hoekpunt<br>
              8. Stel die optimale oplossing in konteks
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Opstel van beperkings</div>
            <p>'n Bakkery maak muffins (x) en koekies (y). Elke muffin neem 2 min, elke koekie 3 min. Maksimum 120 min. Meelbeperking: x + y ≤ 50. Minstens 10 van elk.<br><br>
            Beperkings: <span class="math">2x + 3y ≤ 120; x + y ≤ 50; x ≥ 10; y ≥ 10</span><br>
            Doel: Maksimeer wins P = 5x + 8y</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Doelfunksie-evalueerder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer koëffisiënte vir P = ax + by in, en evalueer dan by tot 4 hoekpunte.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (koëff. van x)</div><input id="g11c12a" type="number" value="5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (koëff. van y)</div><input id="g11c12b" type="number" value="8" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
            </div>
            <div style="display:grid;grid-template-columns:auto auto auto;gap:6px;margin-bottom:10px;align-items:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">Punt</div>
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
            <button id="g11c12Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Evalueer</button>
            <div id="g11c12Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const a=gv('g11c12a'),b=gv('g11c12b');
                const out=document.getElementById('g11c12Out');
                if(isNaN(a)||isNaN(b)){out.innerHTML='<span style="color:#fca5a5;">Voer koëffisiënte a en b in.</span>';return;}
                const pts=[['A',gv('g11c12x1'),gv('g11c12y1')],['B',gv('g11c12x2'),gv('g11c12y2')],['C',gv('g11c12x3'),gv('g11c12y3')],['D',gv('g11c12x4'),gv('g11c12y4')]];
                const vals=pts.map(([lbl,x,y])=>[lbl,x,y,a*x+b*y]).filter(([,x,y])=>!isNaN(x)&&!isNaN(y));
                if(!vals.length){out.innerHTML='<span style="color:#fca5a5;">Voer minstens een hoekpunt in.</span>';return;}
                const maxV=Math.max(...vals.map(v=>v[3])),minV=Math.min(...vals.map(v=>v[3]));
                let html='<span style="color:rgba(221,225,240,0.50);">P = '+a+'x + '+b+'y</span><br>';
                vals.forEach(([lbl,x,y,p])=>{
                  const isMax=p===maxV,isMin=p===minV;
                  html+='<span style="color:rgba(221,225,240,0.50);">'+lbl+'('+x+';'+y+'): P = '+a+'('+x+')+'+b+'('+y+') = '+p+'</span>';
                  if(isMax&&vals.length>1) html+=' <span style="color:#6ee7b7;">← MAKS</span>';
                  if(isMin&&vals.length>1&&minV!==maxV) html+=' <span style="color:#fca5a5;">← MIN</span>';
                  html+='<br>';
                });
                const maxPt=vals.find(v=>v[3]===maxV),minPt=vals.find(v=>v[3]===minV);
                if(vals.length>1){html+='<span style="color:#6ee7b7;">Maksimum P = '+maxV+' by '+maxPt[0]+'('+maxPt[1]+';'+maxPt[2]+')</span><br>';html+='<span style="color:#fcd34d;">Minimum P = '+minV+' by '+minPt[0]+'('+minPt[1]+';'+minPt[2]+')</span>';}
                out.innerHTML=html;
              }
              document.getElementById('g11c12Btn').addEventListener('click',calc);
              ['g11c12a','g11c12b','g11c12x1','g11c12y1','g11c12x2','g11c12y2','g11c12x3','g11c12y3','g11c12x4','g11c12y4'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});

            })();
            </script>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Uitvoerbare-gebied-grafieker</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Gebruik die hoekpunte en doelfunksie van die berekenaar hierbo — klik <strong>Teken</strong> om die uitvoerbare veelhoek, hoekpunte, en soeklyne vir P te sien.</p>
            <button id="g11c12gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Teken uitvoerbare gebied</button>
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
                // rooster
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

                // uitvoerbare-gebied-veelhoek (konvekse omhulsel van hoekpunte)
                const hull=convexHull(pts.map(([,x,y])=>[x,y]));
                ctx.fillStyle='rgba(99,102,241,0.18)';
                ctx.beginPath();ctx.moveTo(pxC(hull[0][0]),pyC(hull[0][1]));
                hull.slice(1).forEach(([x,y])=>ctx.lineTo(pxC(x),pyC(y)));
                ctx.closePath();ctx.fill();
                ctx.strokeStyle='rgba(165,180,252,0.55)';ctx.lineWidth=1.5;ctx.stroke();

                // doelfunksie-soeklyne deur elke hoekpunt
                if(!isNaN(a)&&!isNaN(b)){
                  pvals.forEach(({x,y,p})=>{
                    const isOpt=p===maxP||p===minP;
                    ctx.save();ctx.strokeStyle=isOpt?'rgba(252,211,77,0.50)':'rgba(165,180,252,0.22)';
                    ctx.lineWidth=isOpt?1.5:1;ctx.setLineDash(isOpt?[]:[ 4,4]);
                    // lyn P=ax+by=p → y=(p-ax)/b as b≠0, andersins x=p/a
                    if(Math.abs(b)>0.001){
                      const fx=xx=>(p-a*xx)/b;
                      ctx.beginPath();ctx.moveTo(pxC(xMn),pyC(fx(xMn)));ctx.lineTo(pxC(xMx),pyC(fx(xMx)));ctx.stroke();
                    }
                    ctx.restore();
                  });
                }

                // hoekpunt-kolletjies en etikette
                pvals.forEach(({l,x,y,p})=>{
                  const isMax=p===maxP&&pvals.length>1,isMin=p===minP&&pvals.length>1&&minP!==maxP;
                  const color=isMax?'#6ee7b7':isMin?'#fca5a5':'#a5b4fc';
                  ctx.fillStyle=color;ctx.beginPath();ctx.arc(pxC(x),pyC(y),6,0,Math.PI*2);ctx.fill();
                  ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                  ctx.fillStyle=color;ctx.font='bold 10px monospace';ctx.textAlign='left';
                  const tag=isMax?' ★MAKS':isMin?' ★MIN':'';
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
          text: "Die uitvoerbare gebied is die stel punte wat bevredig:",
          options: ["Slegs die doelfunksie", "Al die beperkings gelyktydig", "Ten minste een beperking", "Slegs die nie-negatiwiteitsbeperkings"],
          answer: 1,
          topic: "Opstel van lineêre-programmeringprobleme"
        },
        {
          type: "mc",
          text: "Die optimale waarde van die doelfunksie kom altyd voor by:",
          options: ["Die oorsprong", "'n Hoekpunt van die uitvoerbare gebied", "Die middelpunt van die uitvoerbare gebied", "Enige punt binne die gebied"],
          answer: 1,
          topic: "Opstel van lineêre-programmeringprobleme"
        },
        {
          type: "mc",
          text: "Nie-negatiwiteitsbeperkings vir veranderlikes x en y is:",
          options: ["x ≥ 0 en y ≥ 0", "x + y ≥ 0", "x ≤ 0 en y ≤ 0", "xy ≥ 0"],
          answer: 0,
          topic: "Opstel van lineêre-programmeringprobleme"
        },
        {
          type: "mc",
          text: "Beperking '3x + 2y ≤ 60' as 'n grenslyn gaan deur watter twee punte?",
          options: ["(20, 0) en (0, 30)", "(0, 20) en (30, 0)", "(60, 0) en (0, 60)", "(3, 0) en (0, 2)"],
          answer: 0,
          topic: "Opstel van lineêre-programmeringprobleme"
        },
        {
          type: "input",
          text: "Doelfunksie P = 4x + 3y by hoekpunt (5, 8). Bepaal P.",
          answer: "44",
          topic: "Opstel van lineêre-programmeringprobleme"
        },
        {
          type: "mc",
          text: "'n Fabriek maak stoele (x) en banke (y). Elke stoel gebruik 3 kg hout en 2 uur arbeid; elke bank gebruik 5 kg hout en 4 uur arbeid. Daar is 60 kg hout en 44 uur arbeid beskikbaar. Watter paar beperkings modelleer die hout- en arbeidsgrense korrek?",
          options: ["3x + 5y ≤ 60 en 2x + 4y ≤ 44", "5x + 3y ≤ 60 en 4x + 2y ≤ 44", "3x + 5y ≤ 44 en 2x + 4y ≤ 60", "3x + 2y ≤ 60 en 5x + 4y ≤ 44"],
          answer: 0,
          topic: "Opstel van lineêre-programmeringprobleme"
        },
        {
          type: "input",
          text: "Gebruik die beperkings 3x + 5y ≤ 60 en 2x + 4y ≤ 44, bepaal die koördinate (x ; y) waar die twee grenslyne 3x + 5y = 60 en 2x + 4y = 44 sny.",
          answer: "(10 ; 6)",
          altAnswers: ["(10;6)", "10;6", "x=10, y=6"],
          topic: "Opstel van lineêre-programmeringprobleme"
        }
      ]
    },
    {
      id: 1201,
      chapter: 12,
      name: "Optimering — oplos van LP-probleme",
      fullName: "Bepaling van maksimum- en minimumwaardes deur die uitvoerbare gebied te gebruik",
      lesson: {
        heading: "Oplos van lineêre-programmeringprobleme",
        sub: "Hoofstuk 12 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Bepaling van hoekpunte</div>
            <p>
              Hoekpunte kom voor waar twee beperkingslyne sny. Bepaal hulle deur:<br>
              1. Twee beperkingsvergelykings gelyk te stel (gelyktydige oplossing)<br>
              2. Te kontroleer dat die snypunt binne die uitvoerbare gebied lê
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Die soeklynmetode</div>
            <p>
              Teken die doelfunksie P = konstante as 'n lyn. Beweeg hierdie <strong>soeklyn</strong> parallel aan homself (met dieselfde gradiënt):<br>
              • Om te <strong>maksimeer</strong>: beweeg in die rigting wat P verhoog totdat dit net die uitvoerbare gebied verlaat<br>
              • Om te <strong>minimeer</strong>: beweeg in die rigting wat P verlaag totdat dit net die uitvoerbare gebied verlaat<br>
              Die laaste kontakpunt met die uitvoerbare gebied is optimaal.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Volledige LP-oplossing</div>
            <p>Beperkings: x ≥ 0, y ≥ 0, x + y ≤ 8, 2x + y ≤ 12<br>
            Maksimeer P = 5x + 4y<br><br>
            Hoekpunte: (0,0), (6,0), (4,4), (0,8)<br>
            P-waardes: 0, 30, 36, 32<br>
            Maksimum P = 36 by (4, 4)</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 LP-optimeerder — bepaal maks / min</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer hoekpunte (x;y) as pare in, stel doelfunksie P = ax+by, kies maksimeer of minimeer.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c12t2a" type="number" value="5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c12t2b" type="number" value="4" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Doel</div>
                <select id="g11c12t2goal" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="max">Maksimeer</option><option value="min">Minimeer</option></select>
              </div>
            </div>
            <div style="font-size:12px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Hoekpunte (voer pare in: x, y)</div>
            <div id="g11c12t2pts" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px;margin-bottom:10px;"></div>
            <div style="display:flex;gap:8px;margin-bottom:10px;">
              <button id="g11c12t2addPt" style="padding:6px 12px;border-radius:6px;border:1px solid rgba(99,102,241,0.40);cursor:pointer;font-size:12px;font-weight:600;background:rgba(99,102,241,0.15);color:#a5b4fc;">+ Voeg punt by</button>
              <button id="g11c12t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Optimeer</button>
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
                    (pts.length>2?'<button onclick="this.parentNode.remove()" style="background:transparent;border:none;color:rgba(221,225,240,0.30);cursor:pointer;font-size:16px;padding:0 4px;" title="Verwyder">×</button>':'');
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
                if(!evalPts.length){out.innerHTML='<span style="color:#fca5a5;">Voeg minstens een punt by.</span>';return;}
                if(isNaN(a)||isNaN(b)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige koëffisiënte in.</span>';return;}
                const vals=evalPts.map(v=>v[3]);
                const optV=goal==='max'?Math.max(...vals):Math.min(...vals);
                const optPt=evalPts.find(v=>v[3]===optV);
                let html='<span style="color:rgba(221,225,240,0.50);">P = '+a+'x + '+b+'y  ['+(goal==='max'?'MAKSIMEER':'MINIMEER')+']</span><br>';
                evalPts.forEach(([lbl,x,y,p])=>{
                  html+='<span style="color:rgba(221,225,240,0.70);">'+lbl+'('+x+';'+y+'): P = '+p+'</span>';
                  if(p===optV) html+=' <span style="color:'+(goal==='max'?'#6ee7b7':'#fca5a5')+';">← '+(goal==='max'?'MAKS':'MIN')+'</span>';
                  html+='<br>';
                });
                html+='<span style="color:#6ee7b7;">'+(goal==='max'?'Maksimum':'Minimum')+' P = '+optV+' by '+optPt[0]+'('+optPt[1]+';'+optPt[2]+')</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c12t2addPt').addEventListener('click',()=>{pts.push([0,0]);render();});
              document.getElementById('g11c12t2Btn').addEventListener('click',calc);
              render();
            })();
            </script>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);margin-top:12px;">
            <div class="def-box-title" style="color:#a5b4fc;">📈 LP uitvoerbare-gebied- en soeklyn-grafieker</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Gebruik die punte en doelfunksie van die optimeerder hierbo — teken die uitvoerbare veelhoek, soeklyne, en beklemtoon die optimale hoekpunt.</p>
            <button id="g11c12t2gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:6px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Teken grafiek</button>
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

                // uitvoerbare veelhoek
                const hull=convexHull(rawPts.map(v=>[v.x,v.y]));
                ctx.fillStyle='rgba(99,102,241,0.18)';
                ctx.beginPath();ctx.moveTo(pxC(hull[0][0]),pyC(hull[0][1]));
                hull.slice(1).forEach(([x,y])=>ctx.lineTo(pxC(x),pyC(y)));
                ctx.closePath();ctx.fill();
                ctx.strokeStyle='rgba(165,180,252,0.55)';ctx.lineWidth=1.5;ctx.stroke();

                // soeklyne
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

                // hoekpunt-kolletjies
                rawPts.forEach(({l,x,y,p})=>{
                  const isOpt=p===optV;
                  const color=isOpt?(goal==='max'?'#6ee7b7':'#fca5a5'):'#a5b4fc';
                  ctx.fillStyle=color;ctx.beginPath();ctx.arc(pxC(x),pyC(y),6,0,Math.PI*2);ctx.fill();
                  ctx.strokeStyle='rgba(8,4,24,0.9)';ctx.lineWidth=1.2;ctx.stroke();
                  ctx.fillStyle=color;ctx.font='bold 10px monospace';ctx.textAlign='left';
                  ctx.fillText(l+'('+fmt(x)+','+fmt(y)+') P='+fmt(p)+(isOpt?' ★':''),pxC(x)+8,pyC(y)-8);
                });
                // legende
                ctx.fillStyle='rgba(165,180,252,0.60)';ctx.font='10px monospace';ctx.textAlign='left';
                ctx.fillText((goal==='max'?'Maksimeer':'Minimeer')+' P = '+a+'x + '+b+'y',7,14);
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
          text: "Hoekpunte van uitvoerbare gebied: (0,0), (4,0), (2,3), (0,5). Maksimeer P = x + 2y. Optimale punt:",
          options: ["(4,0)", "(2,3)", "(0,5)", "(0,0)"],
          answer: 2,
          topic: "Optimering — oplos van LP-probleme"
        },
        {
          type: "input",
          text: "Hoekpunte: (0,6), (3,4), (5,0). Doel: Minimeer C = 2x + 3y. Bepaal die minimum C.",
          answer: "10",
          topic: "Optimering — oplos van LP-probleme"
        },
        {
          type: "mc",
          text: "Die soeklynmetode behels die beweging van 'n lyn met dieselfde _____ as die doelfunksie.",
          options: ["Afsnit", "Gradiënt", "Waarde", "Definisieversameling"],
          answer: 1,
          topic: "Optimering — oplos van LP-probleme"
        },
        {
          type: "mc",
          text: "Beperkings: x ≥ 2, y ≥ 1, x + y ≤ 7. Die hoekpunt (2,1) gee P = 3x − y = 5. Hoekpunt (2,5) gee P = 1. Die maksimum is by:",
          options: ["(2, 1)", "(2, 5)", "(7, 0)", "(6, 1)"],
          answer: 3,
          topic: "Optimering — oplos van LP-probleme"
        },
        {
          type: "mc",
          text: "As die uitvoerbare gebied onbegrens is, kan 'n maksimumwaarde van P:",
          options: ["Altyd bestaan", "Nooit bestaan nie", "Nie bestaan nie", "Gelyk aan nul wees"],
          answer: 2,
          topic: "Optimering — oplos van LP-probleme"
        },
        {
          type: "input",
          text: "Hoekpunte van 'n uitvoerbare gebied is (0,0), (0,10), (8,6), (12,0). Maksimeer P = 6x + 5y. Bepaal die maksimumwaarde van P.",
          answer: "78",
          topic: "Optimering — oplos van LP-probleme"
        },
        {
          type: "input",
          text: "'n Maatskappy maak produkte A (x eenhede) en B (y eenhede), wins R40 per eenheid van A en R55 per eenheid van B. Beperkings gee 'n uitvoerbare gebied met hoekpunte (0;2), (0;10), (12;2). Bepaal die maksimum wins.",
          answer: "590",
          topic: "Optimering — oplos van LP-probleme"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 12 Werkboek — Lineêre Programmering",
    questions: [
      {
        number: 1,
        text: "'n Werkswinkel maak stoele (x) en tafels (y). Elke stoel benodig 2 uur skrynwerk en 1 uur afwerking. Elke tafel benodig 3 uur skrynwerk en 2 uur afwerking. Daar is hoogstens 24 uur skrynwerk en 16 uur afwerking beskikbaar. Minstens 2 stoele en 1 tafel moet vervaardig word.",
        parts: [
          { label: "a", text: "Skryf al die beperkings as ongelykhede.", marks: 4 },
          { label: "b", text: "Teken die uitvoerbare gebied op 'n grafiek.", marks: 4 },
          { label: "c", text: "Identifiseer al die hoekpunte.", marks: 3 },
          { label: "d", text: "As wins P = R80x + R150y is, bepaal die maksimum wins.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Uitvoerbare gebied het hoekpunte by A(0; 8), B(4; 6), C(7; 0), D(0; 0).",
        parts: [
          { label: "a", text: "Maksimeer f(x; y) = 3x + 2y.", marks: 3 },
          { label: "b", text: "Minimeer g(x; y) = x + 4y.", marks: 3 },
          { label: "c", text: "Bepaal die waarde van k sodat 2x + ky = 20 veelvuldige optimale oplossings langs BC gee.", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "2x+3y≤24; x+2y≤16; x≥2; y≥1; x≥0; y≥0",
        b: "Merk die gebied wat aan al die beperkings voldoen",
        c: "Los snypunte op: (2,1), (2,6.67), (4.5,5), (7,0)... kontroleer uitvoerbaarheid; hoekpunte ongeveer by (2,1),(2,6),(3,6),(6,2)",
        d: "Evalueer P=80x+150y by elke hoekpunt; maksimum tipies by 'n gebalanseerde punt"
      },
      2: {
        a: "Evalueer 3x+2y: A=16; B=24; C=21; D=0 → Maksimum=24 by B(4;6)",
        b: "Evalueer x+4y: A=32; B=28; C=7; D=0 → Minimum=0 by D(0;0)",
        c: "Vir parallelle gradiënte: m_BC=−2; doelfunksie-gradiënt m=−2/k; −2/k=−2 → k=1"
      }
    }
  }
});
