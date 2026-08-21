// Math Magician — Graad 11, Hoofstuk 11
// Statistiek

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 1100,
      chapter: 11,
      name: "Histogramme, ogiewe & standaardafwyking",
      fullName: "Histogramme, frekwensiepoligone, ogiewe, variansie en standaardafwyking",
      lesson: {
        heading: "Histogramme, ogiewe, en standaardafwyking",
        sub: "Hoofstuk 11 · Onderwerp 1",
        body: `
          <p>Graad 11 Statistiek brei uit na nuwe grafiese voorstellings en stel <strong>standaardafwyking</strong> bekend as 'n presiese maatstaf van spreiding.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Histogramme en ogiewe</div>
            <p>
              <strong>Histogram:</strong> staafgrafiek vir gegroepeerde data waar die stawe raak. Wydte = klasinterval. Hoogte = frekwensie.<br><br>
              <strong>Ogief (opeengehoopte-frekwensiekurwe):</strong> stip opeengehoopte frekwensie teenoor die boonste klasgrens. S-vormige kurwe. Word gebruik om persentiele en die vyf-getal-opsomming af te lees.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Variansie en standaardafwyking</div>
            <p>
              <strong>Variansie (σ²):</strong> <span class="math">σ² = Σ(xᵢ − x̄)² / n</span><br>
              <strong>Standaardafwyking (σ):</strong> <span class="math">σ = √(Σ(xᵢ − x̄)² / n)</span><br><br>
              'n Groter σ beteken die data is meer versprei vanaf die gemiddelde. σ is in <em>dieselfde eenhede</em> as die data.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Standaardafwyking</div>
            <p>Data: 4, 6, 8, 10, 12. Gemiddelde = 8.<br>
            Afwykings: −4, −2, 0, 2, 4<br>
            Gekwadreer: 16, 4, 0, 4, 16 → som = 40<br>
            Variansie = 40/5 = 8<br>
            σ = √8 = 2√2 ≈ 2.83</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Standaardafwyking-berekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer kommageskeide datawaardes in → gemiddelde, afwykingstabel, variansie, σ.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:220px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Data (kommageskei)</div>
                <input id="g11c11data" type="text" value="4,6,8,10,12" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c11Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g11c11Out" style="font-size:13px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function calc(){
                const raw=document.getElementById('g11c11data').value;
                const out=document.getElementById('g11c11Out');
                const arr=raw.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
                if(arr.length<2){out.innerHTML='<span style="color:#fca5a5;">Voer minstens 2 getalle in.</span>';return;}
                const n=arr.length;
                const mean=arr.reduce((a,b)=>a+b,0)/n;
                const devs=arr.map(x=>x-mean);
                const sq=devs.map(d=>d*d);
                const variance=sq.reduce((a,b)=>a+b,0)/n;
                const sigma=Math.sqrt(variance);
                const within1=arr.filter(x=>Math.abs(x-mean)<=sigma).length;
                const within2=arr.filter(x=>Math.abs(x-mean)<=2*sigma).length;
                let devTable='<table style="border-collapse:collapse;font-size:12px;margin:8px 0;">';
                devTable+='<tr><th style="padding:3px 10px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">xᵢ</th><th style="padding:3px 10px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">xᵢ − x̄</th><th style="padding:3px 10px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">(xᵢ − x̄)²</th></tr>';
                arr.forEach((x,i)=>{devTable+='<tr><td style="padding:3px 10px;color:#fcd34d;text-align:center;">'+x+'</td><td style="padding:3px 10px;color:rgba(221,225,240,0.70);text-align:center;">'+f(devs[i])+'</td><td style="padding:3px 10px;color:rgba(221,225,240,0.70);text-align:center;">'+f(sq[i])+'</td></tr>';});
                devTable+='</table>';
                let html=devTable;
                html+='<span style="color:rgba(221,225,240,0.50);">n = '+n+'   x̄ = '+f(mean)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Σ(xᵢ−x̄)² = '+f(sq.reduce((a,b)=>a+b,0))+'</span><br>';
                html+='<span style="color:#fcd34d;">Variansie σ² = '+f(variance)+'</span>   <span style="color:#6ee7b7;">Standaardafwyking σ = '+f(sigma)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Binne 1σ van gemiddelde: '+within1+'/'+n+' waardes; binne 2σ: '+within2+'/'+n+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c11data').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c11Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Standaardafwyking is altyd:",
          options: ["Negatief", "Nul", "Nie-negatief", "Groter as die gemiddelde"],
          answer: 2,
          topic: "Histogramme, ogiewe & standaardafwyking"
        },
        {
          type: "input",
          text: "Data: 2, 4, 4, 6. Bepaal die gemiddelde.",
          answer: "4",
          topic: "Histogramme, ogiewe & standaardafwyking"
        },
        {
          type: "mc",
          text: "'n Ogief word gebruik om te bepaal:",
          options: ["Modus", "Mediaan en persentiele", "Slegs gemiddelde", "Standaardafwyking direk"],
          answer: 1,
          topic: "Histogramme, ogiewe & standaardafwyking"
        },
        {
          type: "mc",
          text: "Data: 3, 3, 3, 3, 3. Die standaardafwyking is:",
          options: ["1", "3", "0", "Kan nie bepaal word nie"],
          answer: 2,
          topic: "Histogramme, ogiewe & standaardafwyking"
        },
        {
          type: "mc",
          text: "As alle datawaardes met 5 toeneem, sal die standaardafwyking:",
          options: ["Met 5 toeneem", "Dieselfde bly", "Met 5 afneem", "Verdubbel"],
          answer: 1,
          topic: "Histogramme, ogiewe & standaardafwyking"
        },
        {
          type: "input",
          text: "Bepaal die standaardafwyking van die datastel 5, 7, 7, 9, 12, korrek tot 2 desimale plekke.",
          answer: "2.37",
          topic: "Histogramme, ogiewe & standaardafwyking"
        },
        {
          type: "input",
          text: "'n Datastel van 8 waardes het 'n gemiddelde van 12. Sewe van die waardes is 9, 10, 11, 13, 14, 15, 16. Bepaal die 8ste waarde.",
          answer: "8",
          topic: "Histogramme, ogiewe & standaardafwyking"
        }
      ]
    },
    {
      id: 1101,
      chapter: 11,
      name: "Skeefheid, uitskieters & data-interpretasie",
      fullName: "Simmetriese en skewe data, uitskieteridentifikasie, en interpretasie",
      lesson: {
        heading: "Skeefheid, uitskieters, en data-interpretasie",
        sub: "Hoofstuk 11 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Simmetriese teenoor skewe data</div>
            <p>
              <strong>Simmetries:</strong> Gemiddelde ≈ Mediaan ≈ Modus. Klokvormige verspreiding.<br>
              <strong>Positief skeef (regs-skeef):</strong> Gemiddelde > Mediaan > Modus. Stert na regs. 'n Paar baie hoë waardes trek die gemiddelde op.<br>
              <strong>Negatief skeef (links-skeef):</strong> Gemiddelde &lt; Mediaan &lt; Modus. Stert na links.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Uitskieteridentifikasie</div>
            <p>
              <strong>IKW-metode:</strong> 'n Waarde is 'n uitskieter as dit buite die volgende val:<br>
              <span class="math">Q1 − 1.5 × IKW</span> (onderste grens) of <span class="math">Q3 + 1.5 × IKW</span> (boonste grens)<br><br>
              <strong>Standaardafwykingmetode:</strong> 'n Waarde is 'n uitskieter as dit meer as 2σ (of soms 3σ) vanaf die gemiddelde is.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Kies die regte maatstaf</div>
            <p>
              <strong>Skewe data of uitskieters teenwoordig:</strong> Gebruik mediaan en IKW (meer weerstandbiedend).<br>
              <strong>Simmetriese data, geen uitskieters nie:</strong> Gebruik gemiddelde en standaardafwyking (meer inligtingryk).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Uitskieter-toets</div>
            <p>Q1 = 10, Q3 = 22, IKW = 12<br>
            Onderste grens = 10 − 18 = −8; Boonste grens = 22 + 18 = 40<br>
            Enige waarde onder −8 of bo 40 is 'n uitskieter.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Skeefheid- en uitskieter-ontleder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer kommageskeide data in → vyf-getal-opsomming, IKW, uitskietergrense, skeefheidklassifikasie.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:220px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Data (kommageskei)</div>
                <input id="g11c11t2data" type="text" value="12,15,18,18,20,22,24,25,28,30,34,42" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c11t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Ontleed</button>
            </div>
            <div id="g11c11t2Out" style="font-size:13px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function med(arr){const m=Math.floor(arr.length/2);return arr.length%2===1?arr[m]:(arr[m-1]+arr[m])/2;}
              function calc(){
                const raw=document.getElementById('g11c11t2data').value;
                const out=document.getElementById('g11c11t2Out');
                const arr=raw.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n)).sort((a,b)=>a-b);
                if(arr.length<4){out.innerHTML='<span style="color:#fca5a5;">Voer minstens 4 waardes in.</span>';return;}
                const n=arr.length;
                const mean=arr.reduce((a,b)=>a+b,0)/n;
                const median=med(arr);
                const half=Math.floor(n/2);
                const lower=n%2===0?arr.slice(0,half):arr.slice(0,half);
                const upper=n%2===0?arr.slice(half):arr.slice(half+1);
                const Q1=med(lower),Q3=med(upper);
                const IQR=Q3-Q1;
                const lFence=Q1-1.5*IQR,uFence=Q3+1.5*IQR;
                const outliers=arr.filter(x=>x<lFence||x>uFence);
                let skew='simmetries';
                if(mean>median+0.5) skew='positief skeef (regs-skeef) — stert na regs';
                else if(mean<median-0.5) skew='negatief skeef (links-skeef) — stert na links';
                let html='<span style="color:rgba(221,225,240,0.50);">Gesorteer: ['+arr.join(', ')+']</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">n = '+n+'   Gemiddelde = '+f(mean)+'   Mediaan = '+f(median)+'</span><br>';
                html+='<span style="color:#fcd34d;">Min = '+arr[0]+'   Q1 = '+f(Q1)+'   Mediaan = '+f(median)+'   Q3 = '+f(Q3)+'   Maks = '+arr[n-1]+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">IKW = Q3 − Q1 = '+f(IQR)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Onderste grens = Q1 − 1.5×IKW = '+f(lFence)+'   Boonste grens = Q3 + 1.5×IKW = '+f(uFence)+'</span><br>';
                if(outliers.length) html+='<span style="color:#fca5a5;">Uitskieters: ['+outliers.join(', ')+']</span><br>';
                else html+='<span style="color:#6ee7b7;">Geen uitskieters gevind nie.</span><br>';
                html+='<span style="color:#6ee7b7;">Skeefheid: '+skew+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c11t2data').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c11t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Gemiddelde = 45, Mediaan = 50, Modus = 55. Die data is:",
          options: ["Simmetries", "Positief skeef", "Negatief skeef", "Kan nie bepaal word nie"],
          answer: 2,
          topic: "Skeefheid, uitskieters & data-interpretasie"
        },
        {
          type: "mc",
          text: "Q1 = 15, Q3 = 35. IKW = 20. Boonste uitskietergrens =",
          options: ["65", "55", "45", "70"],
          answer: 0,
          topic: "Skeefheid, uitskieters & data-interpretasie"
        },
        {
          type: "mc",
          text: "Vir skewe data met uitskieters, is die beste maatstaf van sentrale neiging:",
          options: ["Gemiddelde", "Modus", "Mediaan", "Standaardafwyking"],
          answer: 2,
          topic: "Skeefheid, uitskieters & data-interpretasie"
        },
        {
          type: "input",
          text: "Gemiddelde = 20, σ = 4. Hoeveel standaardafwykings vanaf die gemiddelde is die waarde 30?",
          answer: "2.5",
          altAnswers: ["2,5"],
          topic: "Skeefheid, uitskieters & data-interpretasie"
        },
        {
          type: "mc",
          text: "In 'n positief skewe verspreiding, watter een is tipies die grootste?",
          options: ["Modus", "Mediaan", "Gemiddelde", "Almal gelyk"],
          answer: 2,
          topic: "Skeefheid, uitskieters & data-interpretasie"
        },
        {
          type: "input",
          text: "Vir die datastel 12, 15, 18, 20, 22, 24, 60: bepaal Q1, Q3, en die IKW, en sê dan of 60 'n uitskieter is volgens die 1.5×IKW-reël. Antwoord 'ja' of 'nee'.",
          answer: "ja",
          topic: "Skeefheid, uitskieters & data-interpretasie"
        }
      ]
    },
    {
      id: 1102,
      chapter: 11,
      name: "Vergelyking van datastelle met standaardafwyking",
      fullName: "Gebruik van standaardafwyking om die spreiding van twee of meer datastelle te interpreteer en te vergelyk",
      lesson: {
        heading: "Vergelyking van datastelle deur standaardafwyking",
        sub: "Hoofstuk 11 · Onderwerp 3",
        body: `
          <p>CAPS beklemtoon die <strong>interpretasie</strong> van standaardafwyking, nie net die berekening daarvan nie. 'n Algemene eksamentaak is om twee datastelle (bv. twee klasse se toetspunte) te vergelyk deur beide gemiddelde en standaardafwyking saam te gebruik.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Interpretasie van standaardafwyking</div>
            <p>
              • 'n <strong>Klein</strong> σ beteken die data is styf saamgetrek rondom die gemiddelde (konsekwent, voorspelbaar).<br>
              • 'n <strong>Groot</strong> σ beteken die data is wyd versprei (veranderlik, minder voorspelbaar).<br>
              • Twee datastelle kan <em>dieselfde gemiddelde</em> hê, maar baie verskillende spreidings — σ toon die verskil.<br>
              • Interpreteer σ altyd <em>in konteks</em>: "Klas A se punte (σ = 4) was meer konsekwent as Klas B s'n (σ = 11)."
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Gesondheids-, sosiale en ekonomiese kontekste</div>
            <p>
              CAPS wil eksplisiet hê dat statistiekprobleme uit gesondheids-, sosiale, ekonomiese, kulturele, politiese en omgewingskontekste getrek word — bv. die vergelyking van reënvalkonsekwentheid tussen twee dorpe, bloeddruklesings, of huishoudelike-inkomstespreiding tussen twee streke.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vergelyking van twee klasse</div>
            <p>Klas A se punte: gemiddelde = 62, σ = 4.2. Klas B se punte: gemiddelde = 62, σ = 11.5.<br>
            Albei klasse het dieselfde gemiddelde punt behaal, maar Klas A se punte was baie meer <strong>konsekwent</strong> (saamgetrek naby 62), terwyl Klas B 'n baie wyer spreiding gehad het — sommige leerders het baie goed gevaar, ander baie swak.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Moenie ooit rou standaardafwykings van datastelle met baie verskillende gemiddeldes of eenhede vergelyk sonder om ook die gemiddelde in ag te neem nie — interpreteer spreiding altyd relatief tot konteks.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Twee-datastel-vergelykingsberekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee kommageskeide datastelle in — vergelyk hul gemiddeldes en standaardafwykings.</p>
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Datastel A</div>
                <input id="g11c11t3a" type="text" value="58,60,61,62,63,64,66" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Datastel B</div>
                <input id="g11c11t3b" type="text" value="30,45,50,62,70,85,92" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c11t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;align-self:flex-start;">Vergelyk</button>
            </div>
            <div id="g11c11t3Out" style="font-size:13px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function stats(arr){
                const n=arr.length,mean=arr.reduce((a,b)=>a+b,0)/n;
                const variance=arr.reduce((a,b)=>a+(b-mean)*(b-mean),0)/n;
                return {n,mean,variance,sigma:Math.sqrt(variance)};
              }
              function calc(){
                const out=document.getElementById('g11c11t3Out');
                const A=document.getElementById('g11c11t3a').value.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
                const B=document.getElementById('g11c11t3b').value.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
                if(A.length<2||B.length<2){out.innerHTML='<span style="color:#fca5a5;">Voer minstens 2 waardes in elke datastel in.</span>';return;}
                const sa=stats(A),sb=stats(B);
                let html='<span style="color:#fcd34d;">Datastel A: n='+sa.n+', gemiddelde='+f(sa.mean)+', σ='+f(sa.sigma)+'</span><br>';
                html+='<span style="color:#a5b4fc;">Datastel B: n='+sb.n+', gemiddelde='+f(sb.mean)+', σ='+f(sb.sigma)+'</span><br>';
                if(Math.abs(sa.mean-sb.mean)<0.01) html+='<span style="color:rgba(221,225,240,0.60);">Albei datastelle het feitlik dieselfde gemiddelde, maar ';
                else html+='<span style="color:rgba(221,225,240,0.60);">Die gemiddeldes verskil, maar ';
                if(sa.sigma<sb.sigma) html+='Datastel A is meer konsekwent (kleiner σ) — sy waardes groepeer nader aan die gemiddelde as Datastel B.</span>';
                else if(sb.sigma<sa.sigma) html+='Datastel B is meer konsekwent (kleiner σ) — sy waardes groepeer nader aan die gemiddelde as Datastel A.</span>';
                else html+='albei datastelle het identiese spreiding (gelyke σ).</span>';
                out.innerHTML=html;
              }
              ['g11c11t3a','g11c11t3b'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c11t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Twee klasse het dieselfde gemiddelde toetspunt, maar Klas X het σ = 3 en Klas Y het σ = 14. Watter klas het meer konsekwente punte gehad?",
          options: ["Klas X", "Klas Y", "Albei ewe konsekwent", "Kan nie sonder die punte bepaal word nie"],
          answer: 0,
          topic: "Vergelyking van datastelle met standaardafwyking"
        },
        {
          type: "mc",
          text: "'n Groot standaardafwyking dui aan dat die data:",
          options: ["Styf saamgetrek is rondom die gemiddelde", "Wyd versprei is vanaf die gemiddelde", "Almal gelyk is aan die gemiddelde", "Negatief gewaardeer is"],
          answer: 1,
          topic: "Vergelyking van datastelle met standaardafwyking"
        },
        {
          type: "input",
          text: "Twee dorpe se maandelikse reënval (mm): Dorp P: 40,42,41,39,43,40 en Dorp Q: 10,70,15,65,20,80. Watter dorp (P of Q) het die kleinste standaardafwyking? Antwoord 'P' of 'Q'.",
          answer: "P",
          topic: "Vergelyking van datastelle met standaardafwyking"
        },
        {
          type: "mc",
          text: "CAPS beveel aan dat statistiekprobleme in kontekste soos die volgende gestel word:",
          options: ["Gesondheids-, sosiale, ekonomiese, kulturele, politiese en omgewingskwessies", "Slegs sportstatistiek", "Slegs finansiële statistiek", "Suiwer abstrakte getalstelle sonder konteks"],
          answer: 0,
          topic: "Vergelyking van datastelle met standaardafwyking"
        },
        {
          type: "mc",
          text: "Datastel A het gemiddelde 50, σ = 2. Datastel B het gemiddelde 50, σ = 9. 'n Waarde van 54 sou beskou word as:",
          options: ["Ongewoon in Datastel A, gewoon in Datastel B", "Ongewoon in albei", "Gewoon in albei", "Ongewoon in Datastel B, gewoon in Datastel A"],
          answer: 0,
          topic: "Vergelyking van datastelle met standaardafwyking"
        },
        {
          type: "input",
          text: "Klas P se punte: 50, 52, 54, 56, 58. Klas Q se punte: 20, 40, 54, 68, 88. Albei klasse het dieselfde gemiddelde (54). Bereken σ vir elke klas en bepaal σ_Q − σ_P, korrek tot 2 desimale plekke.",
          answer: "20.43",
          topic: "Vergelyking van datastelle met standaardafwyking"
        }
      ]
    },
    {
      id: 1103,
      chapter: 11,
      name: "Standaardafwyking vanaf 'n frekwensietabel",
      fullName: "Berekening van die gemiddelde, variansie, en standaardafwyking van ongegroepeerde data gegee in 'n frekwensietabel",
      lesson: {
        heading: "Standaardafwyking vanaf 'n frekwensietabel",
        sub: "Hoofstuk 11 · Onderwerp 4",
        body: `
          <p>Data word dikwels as 'n <strong>frekwensietabel</strong> gegee eerder as 'n rou lys. CAPS laat die gebruik van 'n sakrekenaar se ingeboude statistiese modus toe, maar jy moet verstaan wat dit bereken.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Gemiddelde en standaardafwyking met frekwensies</div>
            <p>
              Vir waardes xᵢ met frekwensies fᵢ (n = Σfᵢ):<br>
              <span class="math">x̄ = Σ(fᵢxᵢ) / Σfᵢ</span><br>
              <span class="math">σ = √( Σfᵢ(xᵢ − x̄)² / Σfᵢ )</span><br><br>
              Elke afwyking word geweeg volgens hoeveel keer daardie waarde voorkom.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Frekwensietabel</div>
            <p>Punte uit 10: waarde 6 (freq 2), 7 (freq 5), 8 (freq 8), 9 (freq 3), 10 (freq 2). n = 20<br>
            Σfx = 6(2)+7(5)+8(8)+9(3)+10(2) = 12+35+64+27+20 = 158<br>
            Gemiddelde = 158/20 = 7.9<br>
            Σf(x−x̄)² = 2(1.9)²+5(0.9)²+8(0.1)²+3(1.1)²+2(2.1)² ≈ 7.22+4.05+0.08+3.63+8.82 = 23.8<br>
            σ = √(23.8/20) ≈ √1.19 ≈ 1.09</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Op 'n sakrekenaar gee die invoer van data met frekwensies (bv. as 'n "FREQ"-kolom in STAT-modus) x̄ en σ direk — jy moet steeds weet hoe om die tabel met die hand op te bou vir volpunt-metodevrae.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Frekwensietabel-standaardafwykingberekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer waarde:frekwensie-pare in, met kommas geskei (bv. 6:2,7:5,8:8).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:220px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Waarde:Frekwensie-pare</div>
                <input id="g11c11t4data" type="text" value="6:2,7:5,8:8,9:3,10:2" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c11t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g11c11t4Out" style="font-size:13px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function calc(){
                const raw=document.getElementById('g11c11t4data').value;
                const out=document.getElementById('g11c11t4Out');
                const pairs=raw.split(',').map(p=>{
                  const parts=p.split(':').map(s=>parseFloat(s.trim()));
                  return {x:parts[0],freq:parts[1]};
                }).filter(p=>!isNaN(p.x)&&!isNaN(p.freq)&&p.freq>0);
                if(pairs.length<2){out.innerHTML='<span style="color:#fca5a5;">Voer minstens 2 waarde:frekwensie-pare in, bv. 6:2,7:5.</span>';return;}
                const n=pairs.reduce((a,p)=>a+p.freq,0);
                const sumfx=pairs.reduce((a,p)=>a+p.freq*p.x,0);
                const mean=sumfx/n;
                const sumfd2=pairs.reduce((a,p)=>a+p.freq*(p.x-mean)*(p.x-mean),0);
                const variance=sumfd2/n;
                const sigma=Math.sqrt(variance);
                let table='<table style="border-collapse:collapse;font-size:12px;margin:8px 0;">';
                table+='<tr><th style="padding:3px 8px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">x</th><th style="padding:3px 8px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">f</th><th style="padding:3px 8px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">fx</th><th style="padding:3px 8px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">f(x−x̄)²</th></tr>';
                pairs.forEach(p=>{table+='<tr><td style="padding:3px 8px;color:#fcd34d;text-align:center;">'+p.x+'</td><td style="padding:3px 8px;color:rgba(221,225,240,0.70);text-align:center;">'+p.freq+'</td><td style="padding:3px 8px;color:rgba(221,225,240,0.70);text-align:center;">'+(p.freq*p.x)+'</td><td style="padding:3px 8px;color:rgba(221,225,240,0.70);text-align:center;">'+f(p.freq*(p.x-mean)*(p.x-mean))+'</td></tr>';});
                table+='</table>';
                let html=table;
                html+='<span style="color:rgba(221,225,240,0.50);">n = Σf = '+n+'   Σfx = '+sumfx+'</span><br>';
                html+='<span style="color:#fcd34d;">Gemiddelde x̄ = Σfx/n = '+f(mean)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Σf(x−x̄)² = '+f(sumfd2)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Variansie σ² = '+f(variance)+'   Standaardafwyking σ = '+f(sigma)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c11t4data').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c11t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vir 'n frekwensietabel word die gemiddelde bereken as:",
          options: ["Σ(fx) / Σf", "Σx / n", "Σf / Σx", "Σ(x − x̄)² / n"],
          answer: 0,
          topic: "Standaardafwyking vanaf 'n frekwensietabel"
        },
        {
          type: "input",
          text: "Waardes 4 (freq 3) en 8 (freq 2). Bepaal die gemiddelde.",
          answer: "5.6",
          topic: "Standaardafwyking vanaf 'n frekwensietabel"
        },
        {
          type: "mc",
          text: "In die formule σ = √(Σf(x−x̄)²/Σf) verteenwoordig die frekwensie f:",
          options: ["Hoeveel keer elke waarde x voorkom", "Die klaswydte", "Die rangorde van elke waarde", "Die opeengehoopte frekwensie"],
          answer: 0,
          topic: "Standaardafwyking vanaf 'n frekwensietabel"
        },
        {
          type: "input",
          text: "Waardes: 2 (freq 1), 4 (freq 2), 6 (freq 1). Bepaal die standaardafwyking (tot 2 desimale plekke).",
          answer: "1.41",
          topic: "Standaardafwyking vanaf 'n frekwensietabel"
        },
        {
          type: "mc",
          text: "'n Sakrekenaar se statistiese (STAT/FREQ) modus word vir frekwensietabeldata hoofsaaklik gebruik om:",
          options: ["x̄ en σ direk te bereken sonder handmatige optelling", "'n Histogram outomaties te teken", "Die behoefte aan 'n gemiddelde heeltemal te vermy", "Frekwensies slegs in persentasies om te skakel"],
          answer: 0,
          topic: "Standaardafwyking vanaf 'n frekwensietabel"
        },
        {
          type: "input",
          text: "'n Frekwensietabel het waarde 4 (freq 3), waarde 10 (freq x), waarde 13 (freq 2), en die gemiddelde van al die data is 8. Bepaal x.",
          answer: "1",
          topic: "Standaardafwyking vanaf 'n frekwensietabel"
        },
        {
          type: "input",
          text: "Frekwensietabel: waarde 4 (freq 3), waarde 10 (freq 1), waarde 13 (freq 2). Bepaal die standaardafwyking, korrek tot 2 desimale plekke.",
          answer: "4.12",
          topic: "Standaardafwyking vanaf 'n frekwensietabel"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 11 Werkboek — Statistiek",
    questions: [
      {
        number: 1,
        text: "Toetspunte: 12, 15, 18, 18, 20, 22, 24, 25, 28, 30, 34, 42.",
        parts: [
          { label: "a", text: "Bereken die gemiddelde en mediaan.", marks: 3 },
          { label: "b", text: "Bepaal die vyf-getal-opsomming.", marks: 4 },
          { label: "c", text: "Bereken die IKW en identifiseer enige uitskieters.", marks: 3 },
          { label: "d", text: "Beskryf die skeefheid. Regverdig deur die verhouding tussen gemiddelde en mediaan te gebruik.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Die volgende gegroepeerde data toon die tyd (minute) wat leerders aan huiswerk spandeer:",
        parts: [
          { label: "", text: "| Tyd | 0–20 | 20–40 | 40–60 | 60–80 | 80–100 |\n| Freq | 3 | 8 | 14 | 10 | 5 |", marks: 0 },
          { label: "a", text: "Teken 'n histogram.", marks: 3 },
          { label: "b", text: "Voltooi die opeengehoopte-frekwensietabel.", marks: 2 },
          { label: "c", text: "Teken die ogief en skat die mediaan daaruit.", marks: 4 },
          { label: "d", text: "Skat die persentasie leerders wat meer as 70 minute spandeer.", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "'n Ogief (opeengehoopte-frekwensiekurwe) is geteken vir die ouderdomme van 60 hardlopers in 'n marathon, deur die volgende punte (boonste klasgrens ; opeengehoopte frekwensie):",
        parts: [
          { label: "", text: "(10 ; 0), (20 ; 4), (30 ; 14), (40 ; 32), (50 ; 48), (60 ; 56), (70 ; 60)", marks: 0 },
          { label: "a", text: "Gebruik die ogief om die mediaanouderdom te skat. (Lees af waar opeengehoopte frekwensie = 30, deur tussen die twee naaste geplotte punte te interpoleer.)", marks: 3 },
          { label: "b", text: "Skat Q1 en Q3 vanaf die ogief (lees af by opeengehoopte frekwensie = 15 en 45), en dus die IKW.", marks: 4 },
          { label: "c", text: "Skat die aantal hardlopers ouer as 50.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Gemiddelde=(12+15+18+18+20+22+24+25+28+30+34+42)/12=288/12=24; Mediaan=(22+24)/2=23",
        b: "Min=12; Q1=18; Mediaan=23; Q3=29; Maks=42",
        c: "IKW=11; Onderste grens=18−16.5=1.5; Boonste grens=29+16.5=45.5; 42 is NIE 'n uitskieter nie (42<45.5)",
        d: "Gemiddelde(24)>Mediaan(23) → effense positiewe skeefheid (stert na regs, getrek deur 42)"
      },
      2: {
        a: "Stawe met hoogtes 3,8,14,10,5 vir intervalle 0–20, 20–40, 40–60, 60–80, 80–100",
        b: "Opeengehoopte freq: 3, 11, 25, 35, 40",
        c: "Stip (20,3),(40,11),(60,25),(80,35),(100,40); mediaan by opeengehoopte freq 20 → lees af ≈ 53 min",
        d: "By 70 min: lees opeengehoopte freq ≈ 30; oorblywend = 40−30=10; 10/40=25%"
      },
      3: {
        a: "n=60, mediaanposisie = 30ste waarde. 30 lê tussen (30;14) en (40;32): breukdeel=(30−14)/(32−14)=16/18; mediaan ≈ 30 + (16/18)×10 ≈ 38.9 jaar",
        b: "Q1-posisie=15de waarde, tussen (30;14) en (40;32): breukdeel=(15−14)/18=1/18; Q1 ≈ 30 + (1/18)×10 ≈ 30.6. Q3-posisie=45ste waarde, tussen (40;32) en (50;48): breukdeel=(45−32)/16=13/16; Q3 ≈ 40 + (13/16)×10 ≈ 48.1. IKW ≈ 48.1 − 30.6 = 17.5",
        c: "Opeengehoopte frekwensie by 50 is 48, dus hardlopers ouer as 50 = 60 − 48 = 12"
      }
    }
  }
});
