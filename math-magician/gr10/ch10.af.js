// Math Magician — Graad 10, Hoofstuk 10
// Statistiek

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 1000,
      chapter: 10,
      name: "Maatstawwe van sentrale neiging",
      fullName: "Insameling van data, maatstawwe van sentrale neiging, en groepering van data",
      lesson: {
        heading: "Sentrale neiging en groepering van data",
        sub: "Hoofstuk 10 · Onderwerp 1",
        body: `
          <p><strong>Statistiek</strong> behels die insameling, organisering, uitbeelding, en interpretasie van data.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Maatstawwe van sentrale neiging</div>
            <p>
              <strong>Gemiddelde (x̄):</strong> som van waardes ÷ aantal waardes<br>
              <strong>Mediaan:</strong> middelste waarde wanneer data geordend is (gemiddelde van twee middelste waardes as dit ewe is)<br>
              <strong>Modus:</strong> waarde wat die meeste voorkom (kan geen of veelvuldig wees)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Gegroepeerde data</div>
            <p>Wanneer data in klasintervalle gegroepeer word, gebruik ons die <strong>middelpunte</strong> van elke interval om die gemiddelde te skat.<br>
            Geskatte gemiddelde = Σ(middelpunt × frekwensie) / Σfrekwensie<br><br>
            Die <strong>modale klas</strong> is die klasinterval met die hoogste frekwensie.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>Data: 4, 7, 7, 9, 12, 15, 18<br>
            Gemiddelde = (4+7+7+9+12+15+18)/7 = 72/7 ≈ 10.3<br>
            Mediaan = 9 (4de waarde van 7)<br>
            Modus = 7</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Gemiddelde, Mediaan & Modus-Sakrekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer kommageskeide waardes in — kry alle maatstawwe van sentrale neiging onmiddellik.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:200px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Datawaardes (kommageskei)</div>
                <input id="g10c10data" type="text" value="4, 7, 7, 9, 12, 15, 18"
                  style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g10c10Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g10c10Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const raw=document.getElementById('g10c10data').value;
                const out=document.getElementById('g10c10Out');
                const vals=raw.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
                if(vals.length<1){out.innerHTML='<span style="color:#fca5a5;">Voer ten minste een waarde in.</span>';return;}
                const sorted=[...vals].sort((a,b)=>a-b);
                const n=vals.length;
                const mean=vals.reduce((s,x)=>s+x,0)/n;
                const mid=Math.floor(n/2);
                const median=n%2===1?sorted[mid]:(sorted[mid-1]+sorted[mid])/2;
                const freq={};
                vals.forEach(x=>freq[x]=(freq[x]||0)+1);
                const maxF=Math.max(...Object.values(freq));
                const modes=Object.keys(freq).filter(k=>freq[k]===maxF).map(Number).sort((a,b)=>a-b);
                const modeStr=maxF===1?'Geen (alle waardes uniek)':modes.join(', ');
                let html='<span style="color:rgba(221,225,240,0.50);">Georden: </span><span style="color:rgba(221,225,240,0.60);">'+sorted.join(', ')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">n = '+n+' waardes</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Gemiddelde x̄ = som/n = '+(vals.reduce((s,x)=>s+x,0).toFixed(2))+'/'+n+' = </span><span style="color:#6ee7b7;">'+mean.toFixed(4).replace(/\.?0+$/,'')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Mediaan = </span><span style="color:#6ee7b7;">'+median+(n%2===0?' (gem. van '+sorted[mid-1]+' en '+sorted[mid]+')':'')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Modus = </span><span style="color:#6ee7b7;">'+modeStr+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c10Btn').addEventListener('click',run);
              document.getElementById('g10c10data').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Orden altyd eers jou data — om die mediaan en modus uit 'n ongeordende lys te vind, is foutgevoelig. 'n Vinnige stygende ordening neem sekondes en voorkom foute.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Data: 3, 8, 5, 12, 7, 5. Die modus is:",
          options: ["3", "5", "7", "8"],
          answer: 1,
          topic: "Maatstawwe van sentrale neiging"
        },
        {
          type: "input",
          text: "Data: 10, 14, 9, 17, 5. Bepaal die mediaan.",
          answer: "10",
          topic: "Maatstawwe van sentrale neiging"
        },
        {
          type: "mc",
          text: "Data: 2, 4, 6, 8, 10. Die gemiddelde is:",
          options: ["5", "6", "7", "8"],
          answer: 1,
          topic: "Maatstawwe van sentrale neiging"
        },
        {
          type: "mc",
          text: "Vir gegroepeerde data gebruik die geskatte gemiddelde:",
          options: ["Werklike waardes", "Boonste grense", "Middelpunte van intervalle", "Onderste grense"],
          answer: 2,
          topic: "Maatstawwe van sentrale neiging"
        },
        {
          type: "input",
          text: "Die gemiddelde van 5 waardes is 12. Een waarde van 14 word verwyder. Bepaal die nuwe gemiddelde.",
          answer: "11.5",
          altAnswers: ["11,5"],
          topic: "Maatstawwe van sentrale neiging"
        },
        {
          type: "input",
          text: "Die gemiddelde van 6 getalle is 15. Vyf van die getalle is 12, 18, 9, 20, en 14. Bepaal die sesde getal.",
          answer: "17",
          topic: "Maatstawwe van sentrale neiging"
        },
        {
          type: "input",
          text: "'n Gegroepeerde frekwensietabel het klasintervalle 0–9 (frek 2), 10–19 (frek 6), 20–29 (frek 8), 30–39 (frek 4). Skat die gemiddelde met behulp van middelpunte.",
          answer: "21.5",
          altAnswers: ["21,5"],
          topic: "Maatstawwe van sentrale neiging"
        }
      ]
    },
    {
      id: 1001,
      chapter: 10,
      name: "Spreiding & vyfgetalopsomming",
      fullName: "Maatstawwe van spreiding, vyfgetalopsomming, en boks-en-snor-diagramme",
      lesson: {
        heading: "Spreiding en die vyfgetalopsomming",
        sub: "Hoofstuk 10 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Maatstawwe van spreiding</div>
            <p>
              <strong>Variasiewydte:</strong> maksimum − minimum<br>
              <strong>Interkwartielwydte (IKW):</strong> Q3 − Q1<br>
              <strong>Variansie:</strong> gemiddelde van gekwadreerde afwykings van die gemiddelde<br>
              <strong>Standaardafwyking (σ):</strong> √variansie — mees bruikbaar; dieselfde eenhede as die data
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Vyfgetalopsomming</div>
            <p>
              1. Minimum (min)<br>
              2. Eerste kwartiel (Q1) — mediaan van onderste helfte<br>
              3. Mediaan (Q2)<br>
              4. Derde kwartiel (Q3) — mediaan van boonste helfte<br>
              5. Maksimum (maks)<br><br>
              Gebruik om 'n <strong>boks-en-snor-diagram</strong> te teken.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vyfgetalopsomming</div>
            <p>Data (geordend): 2, 5, 7, 8, 11, 14, 16, 20<br>
            Min = 2, Maks = 20<br>
            Mediaan = (8+11)/2 = 9.5<br>
            Q1 = mediaan van {2, 5, 7, 8} = (5+7)/2 = 6<br>
            Q3 = mediaan van {11, 14, 16, 20} = (14+16)/2 = 15<br>
            IKW = 15 − 6 = 9</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Uitskieters</div>
            <p>'n Datapunt word as 'n vermoedelike uitskieter beskou as dit meer as 1.5 × IKW onder Q1 of bo Q3 is.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Vyfgetalopsomming-Sakrekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer kommageskeide waardes in — kry min, Q1, mediaan, Q3, maks, IKW, en 'n uitskieter-toets.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:200px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Datawaardes (kommageskei)</div>
                <input id="g10c10t2data" type="text" value="2, 5, 7, 8, 11, 14, 16, 20"
                  style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g10c10t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Ontleed</button>
            </div>
            <div id="g10c10t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function med(arr){const m=Math.floor(arr.length/2);return arr.length%2===1?arr[m]:(arr[m-1]+arr[m])/2;}
              function run(){
                const raw=document.getElementById('g10c10t2data').value;
                const out=document.getElementById('g10c10t2Out');
                const vals=raw.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
                if(vals.length<4){out.innerHTML='<span style="color:#fca5a5;">Voer ten minste 4 waardes in vir \'n betekenisvolle vyfgetalopsomming.</span>';return;}
                const s=[...vals].sort((a,b)=>a-b);
                const n=s.length;
                const mn=s[0],mx=s[n-1];
                const Q2=med(s);
                const lower=n%2===1?s.slice(0,Math.floor(n/2)):s.slice(0,n/2);
                const upper=n%2===1?s.slice(Math.floor(n/2)+1):s.slice(n/2);
                const Q1=med(lower),Q3=med(upper);
                const IQR=Q3-Q1;
                const range=mx-mn;
                const fenceL=Q1-1.5*IQR,fenceH=Q3+1.5*IQR;
                const outliers=s.filter(x=>x<fenceL||x>fenceH);
                let html='<span style="color:rgba(221,225,240,0.50);">Georden: </span><span style="color:rgba(221,225,240,0.60);">'+s.join(', ')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Min = </span><span style="color:#fcd34d;">'+mn+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Q1 = </span><span style="color:#fcd34d;">'+Q1+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Mediaan Q2 = </span><span style="color:#6ee7b7;">'+Q2+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Q3 = </span><span style="color:#fcd34d;">'+Q3+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Maks = </span><span style="color:#fcd34d;">'+mx+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">IKW = Q3 − Q1 = '+Q3+' − '+Q1+' = </span><span style="color:#6ee7b7;">'+IQR+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Variasiewydte = </span><span style="color:#6ee7b7;">'+range+'</span><br>';
                if(outliers.length){
                  html+='<span style="color:#fca5a5;">Vermoedelike uitskieters (buite ['+fenceL.toFixed(2)+'; '+fenceH.toFixed(2)+']): '+outliers.join(', ')+'</span>';
                } else {
                  html+='<span style="color:rgba(221,225,240,0.50);">Geen uitskieters nie (grense: ['+fenceL.toFixed(2)+'; '+fenceH.toFixed(2)+'])</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c10t2Btn').addEventListener('click',run);
              document.getElementById('g10c10t2data').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Om Q1 en Q3 te vind: verdeel die data by die mediaan (sluit die mediaan self uit as n onewe is), en vind dan die mediaan van elke helfte.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Data: 3, 7, 9, 12, 15, 20. Die IKW is:",
          options: ["11", "8", "9", "13"],
          answer: 1,
          topic: "Spreiding & vyfgetalopsomming"
        },
        {
          type: "input",
          text: "Data: 4, 8, 12, 16, 20. Bepaal die variasiewydte.",
          answer: "16",
          topic: "Spreiding & vyfgetalopsomming"
        },
        {
          type: "mc",
          text: "Vir data: 2, 5, 8, 11, 14, 17, 20, 23, wat is Q1?",
          options: ["5", "6.5", "8", "5.5"],
          answer: 1,
          topic: "Spreiding & vyfgetalopsomming"
        },
        {
          type: "mc",
          text: "'n Boks-en-snor-diagram toon: min=5, Q1=10, mediaan=15, Q3=22, maks=30. Die IKW is:",
          options: ["25", "12", "20", "15"],
          answer: 1,
          topic: "Spreiding & vyfgetalopsomming"
        },
        {
          type: "mc",
          text: "Watter maatstaf van spreiding gebruik gekwadreerde afwykings?",
          options: ["Variasiewydte", "IKW", "Standaardafwyking", "Variansie"],
          answer: 3,
          topic: "Spreiding & vyfgetalopsomming"
        },
        {
          type: "input",
          text: "Data (geordend): 3, 6, 9, 10, 14, 18, 21, 25, 30 (n = 9). Bepaal die IKW.",
          answer: "15.5",
          altAnswers: ["15,5"],
          topic: "Spreiding & vyfgetalopsomming"
        },
        {
          type: "mc",
          text: "'n Datastel het Min=5, Q1=10, Mediaan=15, Q3=20, Maks=50. Volgens die 1.5×IKW-reël, is 50 'n vermoedelike uitskieter?",
          options: ["Ja — 50 is bo die boonste grens van 35", "Nee — 50 is onder die boonste grens", "Kan nie bepaal word nie", "Slegs die minimum kan ooit 'n uitskieter wees"],
          answer: 0,
          topic: "Spreiding & vyfgetalopsomming"
        }
      ]
    },
    {
      id: 1002,
      chapter: 10,
      name: "Boks-en-snor-diagramme",
      fullName: "Teken en interpreteer boks-en-snor-diagramme uit die vyfgetalopsomming",
      lesson: {
        heading: "Boks-en-snor-diagramme",
        sub: "Hoofstuk 10 · Onderwerp 3",
        body: `
          <p>'n <strong>Boks-en-snor-diagram</strong> (boksdiagram) is 'n visuele opsomming van die vyfgetalopsomming — dit wys die spreiding en skeefheid van data met een oogopslag.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Dele van 'n boks-en-snor-diagram</div>
            <p>
              • Die <strong>boks</strong> strek van Q1 tot Q3 (die middelste 50% van die data — die IKW).<br>
              • 'n Lyn binne die boks merk die <strong>mediaan</strong> (Q2).<br>
              • <strong>Snorre</strong> strek van die boks tot by die minimum- en maksimumwaardes.<br>
              • Die diagram word op 'n numeriese as geteken sodat lengtes vergelykbaar is.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Lees skeefheid van 'n boksdiagram</div>
            <p>
              • As die mediaan nader aan Q1 is en die regter snor langer is → data is <strong>positief skeef</strong> (regs skeef).<br>
              • As die mediaan nader aan Q3 is en die linker snor langer is → data is <strong>negatief skeef</strong> (links skeef).<br>
              • As die boks en snorre ongeveer simmetries is → data is ongeveer <strong>simmetries</strong>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>Vyfgetalopsomming: Min = 12, Q1 = 20, Mediaan = 24, Q3 = 30, Maks = 45.<br>
            Boks van 20 tot 30, mediaanlyn by 24. Linker snor: 20→12 (lengte 8). Regter snor: 30→45 (lengte 15).<br>
            Die regter snor is baie langer en die mediaan lê nader aan Q1 as Q3 → die data is <strong>positief skeef</strong>.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Boks-en-Snor-Diagram-Bouer</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer kommageskeide data in — die diagram word outomaties uit die vyfgetalopsomming geteken, met 'n opmerking oor skeefheid.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:220px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Datawaardes (kommageskei)</div>
                <input id="g10c10bwdata" type="text" value="12, 18, 20, 20, 22, 24, 26, 28, 30, 33, 45"
                  style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g10c10bwBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Teken diagram</button>
            </div>
            <canvas id="g10c10bwcv" style="width:100%;max-width:560px;display:block;border-radius:8px;background:rgba(15,10,40,0.88);border:1px solid rgba(99,102,241,0.22);margin-bottom:10px;"></canvas>
            <div id="g10c10bwOut" style="font-size:14px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function med(arr){const m=Math.floor(arr.length/2);return arr.length%2===1?arr[m]:(arr[m-1]+arr[m])/2;}
              const cv=document.getElementById('g10c10bwcv');
              const DPR=Math.min(window.devicePixelRatio||1,2);
              const W=560,H=160;
              cv.width=W*DPR;cv.height=H*DPR;
              const ctx=cv.getContext('2d');
              ctx.scale(DPR,DPR);
              function run(){
                const raw=document.getElementById('g10c10bwdata').value;
                const out=document.getElementById('g10c10bwOut');
                const vals=raw.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
                ctx.clearRect(0,0,W,H);
                if(vals.length<4){out.innerHTML='<span style="color:#fca5a5;">Voer ten minste 4 waardes in.</span>';return;}
                const s=[...vals].sort((a,b)=>a-b);
                const n=s.length;
                const mn=s[0],mx=s[n-1],Q2=med(s);
                const lower=n%2===1?s.slice(0,Math.floor(n/2)):s.slice(0,n/2);
                const upper=n%2===1?s.slice(Math.floor(n/2)+1):s.slice(n/2);
                const Q1=med(lower),Q3=med(upper);
                const pad=40,plotW=W-2*pad;
                const range=mx-mn||1;
                const x=v=>pad+((v-mn)/range)*plotW;
                const midY=H/2,boxH=44;
                // as
                ctx.strokeStyle='rgba(99,102,241,0.30)';ctx.lineWidth=1;
                ctx.beginPath();ctx.moveTo(pad,H-20);ctx.lineTo(W-pad,H-20);ctx.stroke();
                [mn,Q1,Q2,Q3,mx].forEach(v=>{
                  ctx.strokeStyle='rgba(99,102,241,0.25)';
                  ctx.beginPath();ctx.moveTo(x(v),H-24);ctx.lineTo(x(v),H-16);ctx.stroke();
                  ctx.fillStyle='rgba(165,180,252,0.55)';ctx.font='10px monospace';ctx.textAlign='center';
                  ctx.fillText(parseFloat(v.toFixed(2)),x(v),H-6);
                });
                // snorre
                ctx.strokeStyle='#a5b4fc';ctx.lineWidth=2;
                ctx.beginPath();ctx.moveTo(x(mn),midY);ctx.lineTo(x(Q1),midY);ctx.stroke();
                ctx.beginPath();ctx.moveTo(x(Q3),midY);ctx.lineTo(x(mx),midY);ctx.stroke();
                [mn,mx].forEach(v=>{ctx.beginPath();ctx.moveTo(x(v),midY-10);ctx.lineTo(x(v),midY+10);ctx.stroke();});
                // boks
                ctx.fillStyle='rgba(99,102,241,0.20)';
                ctx.fillRect(x(Q1),midY-boxH/2,x(Q3)-x(Q1),boxH);
                ctx.strokeStyle='#6ee7b7';ctx.lineWidth=2.5;
                ctx.strokeRect(x(Q1),midY-boxH/2,x(Q3)-x(Q1),boxH);
                // mediaanlyn
                ctx.strokeStyle='#fcd34d';ctx.lineWidth=2.5;
                ctx.beginPath();ctx.moveTo(x(Q2),midY-boxH/2);ctx.lineTo(x(Q2),midY+boxH/2);ctx.stroke();

                const IQR=Q3-Q1;
                const leftW=Q1-mn, rightW=mx-Q3;
                let skew;
                if(Math.abs(leftW-rightW)<0.05*range && Math.abs((Q2-Q1)-(Q3-Q2))<0.05*(IQR||1)) skew='ongeveer simmetries';
                else if(rightW>leftW && (Q2-Q1)<(Q3-Q2)) skew='positief skeef (regs skeef) — \'n langer regter snor en mediaan nader aan Q1';
                else if(leftW>rightW && (Q2-Q1)>(Q3-Q2)) skew='negatief skeef (links skeef) — \'n langer linker snor en mediaan nader aan Q3';
                else skew='nie sterk skeef in enige rigting nie';

                let html='<span style="color:rgba(221,225,240,0.50);">Min='+mn+', Q1='+Q1+', Mediaan='+Q2+', Q3='+Q3+', Maks='+mx+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">IKW = '+IQR+'</span><br>';
                html+='<span style="color:#fcd34d;">Vorm: '+skew+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c10bwBtn').addEventListener('click',run);
              document.getElementById('g10c10bwdata').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>'n Boksdiagram verberg die individuele datawaardes maar openbaar spreiding en skeefheid onmiddellik — nuttig om twee datastelle langs mekaar te vergelyk (bv. twee klasse se toetspunte).</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In 'n boks-en-snor-diagram verteenwoordig die boks:",
          options: ["Die volle omvang van die data", "Die middelste 50% van die data (IKW)", "Die modus", "Die gemiddelde ± standaardafwyking"],
          answer: 1,
          topic: "Boks-en-snor-diagramme"
        },
        {
          type: "mc",
          text: "'n Boksdiagram het 'n lang regter snor en die mediaan naby Q1. Die data is:",
          options: ["Simmetries", "Negatief skeef", "Positief skeef", "Bimodaal"],
          answer: 2,
          topic: "Boks-en-snor-diagramme"
        },
        {
          type: "input",
          text: "Vyfgetalopsomming: Min=5, Q1=10, Mediaan=14, Q3=22, Maks=30. Bepaal die IKW.",
          answer: "12",
          topic: "Boks-en-snor-diagramme"
        },
        {
          type: "mc",
          text: "Die lyn wat binne die boks van 'n boks-en-snor-diagram geteken word, verteenwoordig:",
          options: ["Die gemiddelde", "Die modus", "Die mediaan", "Q1"],
          answer: 2,
          topic: "Boks-en-snor-diagramme"
        },
        {
          type: "mc",
          text: "Twee klasse se boksdiagramme word vergelyk. Klas A se boks is baie nouer as Klas B s'n. Dit beteken:",
          options: ["Klas A het 'n hoër gemiddelde", "Klas A se punte is meer konsekwent (minder spreiding in die middelste 50%)", "Klas A het meer leerders", "Klas A het 'n hoër maksimum"],
          answer: 1,
          topic: "Boks-en-snor-diagramme"
        },
        {
          type: "input",
          text: "'n Boksdiagram toon Min=8, Q1=15, Mediaan=19, Q3=27, Maks=40. Volgens die 1.5×IKW-reël, bereken die boonste uitskieter-grens.",
          answer: "45",
          topic: "Boks-en-snor-diagramme"
        },
        {
          type: "mc",
          text: "'n Boksdiagram toon Min=20, Q1=30, Mediaan=33, Q3=50, Maks=90. Is die verspreiding positief skeef, negatief skeef, of simmetries?",
          options: ["Positief skeef (mediaan naby Q1, lang regter snor)", "Negatief skeef (mediaan naby Q3, lang linker snor)", "Ongeveer simmetries", "Kan nie vanaf 'n boksdiagram bepaal word nie"],
          answer: 0,
          topic: "Boks-en-snor-diagramme"
        }
      ]
    },
    {
      id: 1003,
      chapter: 10,
      name: "Interpreteer statistiek in konteks",
      fullName: "Gebruik statistiese opsommings en grafieke saam om werklike data te ontleed en daaroor kommentaar te lewer",
      lesson: {
        heading: "Interpreteer statistiek in konteks",
        sub: "Hoofstuk 10 · Onderwerp 4",
        body: `
          <p>CAPS vereis meer as berekening — jy moet in staat wees om <strong>te ontleed en kommentaar te lewer</strong> op wat die statistiek oor 'n werklike situasie openbaar.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Waarna om te kyk en te vergelyk</div>
            <p>
              • <strong>Sentrum:</strong> watter datastel het die hoër gemiddelde/mediaan — wat beteken dit in konteks?<br>
              • <strong>Spreiding:</strong> watter datastel is meer konsekwent (kleiner IKW/variasiewydte)?<br>
              • <strong>Uitskieters:</strong> is daar ongewoon hoë/lae waardes, en kan hulle die gemiddelde vervorm?<br>
              • <strong>Vorm:</strong> is die data simmetries of skeef, en waarom kan dit so wees, gegewe die konteks?
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Gemiddelde teenoor mediaan — watter is meer betroubaar?</div>
            <p>Die gemiddelde word deur uiterste waardes (uitskieters) beïnvloed; die mediaan nie. Vir skewe data of data met uitskieters is die <strong>mediaan</strong> gewoonlik 'n meer betroubare maatstaf van die "tipiese" waarde.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vergelyking van twee klasse</div>
            <p>Klas A toetspunte: gemiddelde = 62%, IKW = 8. Klas B toetspunte: gemiddelde = 60%, IKW = 22.<br>
            Kommentaar: Klas A het gemiddeld effens beter gevaar, maar belangriker nog, Klas A se punte is baie <strong>meer konsekwent</strong> (kleiner IKW) — die meeste leerders het naby die gemiddelde behaal, terwyl Klas B baie groter variasie in prestasie het.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Effek van 'n uitskieter</div>
            <p>Salarisse (in R'000s) by 'n klein maatskappy: 18, 19, 20, 21, 22, 95 (eienaar).<br>
            Gemiddelde = 32.5 (opwaarts getrek deur die uitskieter); Mediaan = 20.5.<br>
            Die mediaan gee 'n baie meer realistiese beeld van wat 'n "tipiese" werknemer verdien.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Algemene eksamenstyl-kommentare</div>
            <p>
              • "Die data is skeef omdat die gemiddelde baie groter/kleiner is as die mediaan."<br>
              • "Groep X het minder variasie as Groep Y omdat sy IKW/variasiewydte kleiner is."<br>
              • "Die uitskieter by [waarde] verhoog die gemiddelde maar het min effek op die mediaan."
            </p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer jy gevra word om "kommentaar te lewer", skakel jou statistiek altyd terug na die werklike konteks — moenie net 'n getal noem nie, verduidelik wat dit beteken vir die mense/situasie in die vraag.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Datastel A het gemiddelde 45 en mediaan 40. Dit dui daarop dat die data:",
          options: ["Simmetries is", "Skeef is deur 'n paar hoë waardes wat die gemiddelde opwaarts trek", "Skeef is deur lae waardes wat die gemiddelde afwaarts trek", "Onmoontlik is"],
          answer: 1,
          topic: "Interpreteer statistiek in konteks"
        },
        {
          type: "mc",
          text: "Watter maatstaf van sentrale neiging word DIE MINSTE deur 'n uitskieter beïnvloed?",
          options: ["Gemiddelde", "Mediaan", "Albei ewe veel beïnvloed", "Variasiewydte"],
          answer: 1,
          topic: "Interpreteer statistiek in konteks"
        },
        {
          type: "mc",
          text: "Twee sokkerspanne se doelaantekening: Span A het IKW = 1, Span B het IKW = 5 (dieselfde mediaan). Span A se aantekening is:",
          options: ["Minder konsekwent as Span B", "Meer konsekwent as Span B", "Identies aan Span B", "Onmoontlik om te vergelyk"],
          answer: 1,
          topic: "Interpreteer statistiek in konteks"
        },
        {
          type: "input",
          text: "Data: 10, 11, 12, 13, 14, 90. Is die gemiddelde of mediaan hier 'n meer betroubare 'tipiese' waarde? Antwoord 'gemiddelde' of 'mediaan'.",
          answer: "mediaan",
          topic: "Interpreteer statistiek in konteks"
        },
        {
          type: "mc",
          text: "'n Maatskappy rapporteer die 'gemiddelde' salaris deur die gemiddelde te gebruik, wat baie hoër is as wat die meeste werknemers verdien. Dit is heel waarskynlik omdat:",
          options: ["Die data simmetries is", "'n Paar baie hoë salarisse (uitskieters) die gemiddelde opwaarts trek", "Die mediaan eerder gebruik is", "Daar geen variasie in salarisse is nie"],
          answer: 1,
          topic: "Interpreteer statistiek in konteks"
        },
        {
          type: "input",
          text: "Ouderdomme van werknemers by 'n klein besigheid: 22, 24, 25, 26, 28, 30, 62. Bereken met hoeveel die gemiddelde die mediaan oorskry.",
          answer: "5",
          topic: "Interpreteer statistiek in konteks"
        },
        {
          type: "mc",
          text: "Twee klasse het dieselfde toets geskryf: Klas X het gemiddelde=68 en variasiewydte=12. Klas Y het gemiddelde=68 en variasiewydte=40. Watter klas se punte is stywer om die gemiddelde gegroepeer?",
          options: ["Klas X", "Klas Y", "Albei ewe gegroepeer", "Kan nie bepaal word nie"],
          answer: 0,
          topic: "Interpreteer statistiek in konteks"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 10 Werkboek — Statistiek",
    questions: [
      {
        number: 1,
        text: "Die volgende punte (uit 50) is in 'n toets behaal: 34, 28, 41, 22, 34, 45, 37, 29, 41, 18, 34, 40.",
        parts: [
          { label: "a", text: "Bepaal die gemiddelde, mediaan, en modus.", marks: 5 },
          { label: "b", text: "Bepaal die vyfgetalopsomming.", marks: 5 },
          { label: "c", text: "Bereken die IKW.", marks: 1 },
          { label: "d", text: "Teken 'n boks-en-snor-diagram.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Die gegroepeerde frekwensietabel toon ouderdomme van klublede:",
        parts: [
          { label: "", text: "| Ouderdom | 10–19 | 20–29 | 30–39 | 40–49 | 50–59 |\n| Frek | 4 | 11 | 9 | 5 | 1 |", marks: 0 },
          { label: "a", text: "Skat die gemiddelde ouderdom.", marks: 4 },
          { label: "b", text: "Identifiseer die modale klas.", marks: 1 },
          { label: "c", text: "Hoeveel lede is daar altesaam?", marks: 1 }
        ]
      },
      {
        number: 3,
        text: "Twee Graad 10-klasse het dieselfde toets geskryf (punte uit 100). Hulle vyfgetalopsommings word hieronder gegee:",
        parts: [
          { label: "", text: "| | Klas A | Klas B |\n| Min | 40 | 30 |\n| Q1 | 50 | 45 |\n| Mediaan | 54 | 60 |\n| Q3 | 70 | 75 |\n| Maks | 95 | 90 |", marks: 0 },
          { label: "a", text: "Bereken die IKW vir elke klas.", marks: 2 },
          { label: "b", text: "Vergelyk vir Klas A die afstand van Q1 tot die mediaan met die afstand van die mediaan tot Q3, en vergelyk die lengte van elke snor. Wat dui dit aan oor die skeefheid van Klas A se punte?", marks: 3 },
          { label: "c", text: "Watter klas se punte is meer konsekwent (kleiner spreiding in die middelste 50%)? Regverdig jou antwoord met die IKW-waardes.", marks: 2 },
          { label: "d", text: "Klas B se mediaan lê presies halfpad tussen Q1 en Q3, en albei snorre is dieselfde lengte. Beskryf die vorm van Klas B se verspreiding.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Georden: 18,22,28,29,34,34,34,37,40,41,41,45; Gemiddelde=37.75/12... herbereken: som=403, gemiddelde≈33.6; Mediaan=(34+34)/2=34; Modus=34",
        b: "Min=18; Q1=(28+29)/2=28.5; Mediaan=34; Q3=(40+41)/2=40.5; Maks=45",
        c: "IKW=12",
        d: "Boks van 28.5 tot 40.5, mediaanlyn by 34, snorre tot 18 en 45"
      },
      2: {
        a: "Middelpunte: 14.5,24.5,34.5,44.5,54.5; Gemiddelde=(4×14.5+11×24.5+9×34.5+5×44.5+1×54.5)/30 = (58+269.5+310.5+222.5+54.5)/30 = 914.5/30 ≈ 30.5",
        b: "Modale klas: 20–29",
        c: "30 lede"
      },
      3: {
        a: "Klas A: IKW=70−50=20; Klas B: IKW=75−45=30",
        b: "Mediaan−Q1=54−50=4, Q3−Mediaan=70−54=16 (mediaan baie nader aan Q1); linker snor=50−40=10, regter snor=95−70=25 (regter snor baie langer) → Klas A se punte is positief skeef (regs skeef)",
        c: "Klas A — sy IKW (20) is kleiner as Klas B s'n (30), dus is die middelste 50% van Klas A se punte minder versprei",
        d: "Klas B se verspreiding is ongeveer simmetries (mediaan ewe ver van Q1 en Q3, snorre van gelyke lengte)"
      }
    }
  }
});
