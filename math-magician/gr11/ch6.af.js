// Math Magician — Grade 11, Hoofstuk 6 data (Afrikaans)
// Trigonometrie — Identiteite, Reduksie, Sinus-/Kosinusreël, Oppervlakte-reël

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 600,
      chapter: 6,
      name: "Trig-identiteite en reduksieformules",
      fullName: "Trigonometriese identiteite, reduksieformules, en die oplos van vergelykings",
      lesson: {
        heading: "Trig-identiteite en reduksieformules",
        sub: "Hoofstuk 6 · Onderwerp 1",
        body: `
          <p>Graad 11 stel <strong>saamgestelde-hoek-identiteite</strong> en die <strong>reduksieformules</strong> vir al vier kwadrante bekend.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Fundamentele identiteite</div>
            <p>
              <strong>Kwosiënt:</strong> <span class="math">tan θ = sin θ / cos θ</span><br>
              <strong>Pythagoras:</strong> <span class="math">sin²θ + cos²θ = 1</span><br>
              Afgelei: <span class="math">sin²θ = 1 − cos²θ</span> en <span class="math">cos²θ = 1 − sin²θ</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reduksieformules (volledige stel)</div>
            <p>
              <strong>Supplementêr (180° − θ):</strong> sin(180°−θ) = sinθ; cos(180°−θ) = −cosθ<br>
              <strong>Ko-supplementêr (180° + θ):</strong> sin(180°+θ) = −sinθ; cos(180°+θ) = −cosθ<br>
              <strong>Refleks (360° − θ):</strong> sin(360°−θ) = −sinθ; cos(360°−θ) = cosθ<br>
              <strong>Negatiewe hoeke:</strong> sin(−θ) = −sinθ; cos(−θ) = cosθ<br>
              <strong>Ko-verhouding (90° ± θ):</strong> sin(90°−θ) = cosθ; cos(90°−θ) = sinθ
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bewys 'n identiteit</div>
            <p>Bewys: <span class="math">(1 − sin²x)/cos x = cos x</span><br>
            LK = <span class="math">cos²x / cos x = cos x</span> = RK ✓<br><br>
            Werk altyd met NET EEN kant. Moenie ooit kruisvermenigvuldig in 'n bewys nie.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vereenvoudig met behulp van reduksie</div>
            <p><span class="math">sin(180° + x) · cos(360° − x) / tan(−x)</span><br>
            <span class="math">= (−sin x)(cos x) / (−tan x)</span><br>
            <span class="math">= (−sin x · cos x) / (−sin x/cos x)</span><br>
            <span class="math">= cos²x</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Reduksieformule-verwysing</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies 'n saamgestelde-hoekvorm — sien die reduksieresultaat en die reël wat toegepas word.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Funksie</div>
                <select id="g11c6func" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin</option><option value="cos">cos</option><option value="tan">tan</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Vorm</div>
                <select id="g11c6form" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="180m">180° − θ</option>
                  <option value="180p">180° + θ</option>
                  <option value="360m">360° − θ</option>
                  <option value="neg">−θ</option>
                  <option value="90m">90° − θ</option>
                  <option value="90p">90° + θ</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">θ-waarde (°)</div><input id="g11c6theta" type="number" value="30" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c6Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Herlei</button>
            </div>
            <div id="g11c6Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const rules={
                sin:{
                  '180m':{sign:1,fn:'sin',rule:'sin(180°−θ) = sinθ'},
                  '180p':{sign:-1,fn:'sin',rule:'sin(180°+θ) = −sinθ'},
                  '360m':{sign:-1,fn:'sin',rule:'sin(360°−θ) = −sinθ'},
                  'neg':{sign:-1,fn:'sin',rule:'sin(−θ) = −sinθ'},
                  '90m':{sign:1,fn:'cos',rule:'sin(90°−θ) = cosθ'},
                  '90p':{sign:1,fn:'cos',rule:'sin(90°+θ) = cosθ'}
                },
                cos:{
                  '180m':{sign:-1,fn:'cos',rule:'cos(180°−θ) = −cosθ'},
                  '180p':{sign:-1,fn:'cos',rule:'cos(180°+θ) = −cosθ'},
                  '360m':{sign:1,fn:'cos',rule:'cos(360°−θ) = cosθ'},
                  'neg':{sign:1,fn:'cos',rule:'cos(−θ) = cosθ'},
                  '90m':{sign:1,fn:'sin',rule:'cos(90°−θ) = sinθ'},
                  '90p':{sign:-1,fn:'sin',rule:'cos(90°+θ) = −sinθ'}
                },
                tan:{
                  '180m':{sign:-1,fn:'tan',rule:'tan(180°−θ) = −tanθ'},
                  '180p':{sign:1,fn:'tan',rule:'tan(180°+θ) = tanθ'},
                  '360m':{sign:-1,fn:'tan',rule:'tan(360°−θ) = −tanθ'},
                  'neg':{sign:-1,fn:'tan',rule:'tan(−θ) = −tanθ'},
                  '90m':{sign:null,fn:'cot',rule:'tan(90°−θ) = cotθ = 1/tanθ'},
                  '90p':{sign:null,fn:'cot',rule:'tan(90°+θ) = −cotθ = −1/tanθ'}
                }
              };
              const formLabels={'180m':'180°−θ','180p':'180°+θ','360m':'360°−θ','neg':'−θ','90m':'90°−θ','90p':'90°+θ'};
              function calc(){
                const fn=document.getElementById('g11c6func').value;
                const form=document.getElementById('g11c6form').value;
                const theta=parseFloat(document.getElementById('g11c6theta').value);
                const out=document.getElementById('g11c6Out');
                const r=rules[fn][form];
                const rad=theta*Math.PI/180;
                const trig={sin:Math.sin(rad),cos:Math.cos(rad),tan:Math.tan(rad),cot:1/Math.tan(rad)};
                const orig=trig[fn];
                const reduced=r.sign===null?trig[r.fn]:(r.sign*trig[r.fn]);
                let html='<span style="color:rgba(221,225,240,0.50);">Reël: </span><span style="color:#fcd34d;">'+r.rule+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+fn+'('+formLabels[form]+') vir θ = '+theta+'° → </span>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+(r.sign===-1?'−':r.sign===1?'':'')+r.fn+'('+theta+'°) = </span>';
                html+='<span style="color:#6ee7b7;">'+parseFloat(reduced.toFixed(6))+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Verifieer: '+fn+'('+(form==='180m'?180-theta:form==='180p'?180+theta:form==='360m'?360-theta:form==='neg'?-theta:form==='90m'?90-theta:90+theta)+'°) = </span>';
                const angle=(form==='180m'?180-theta:form==='180p'?180+theta:form==='360m'?360-theta:form==='neg'?-theta:form==='90m'?90-theta:90+theta)*Math.PI/180;
                const actual=fn==='sin'?Math.sin(angle):fn==='cos'?Math.cos(angle):Math.tan(angle);
                html+='<span style="color:#6ee7b7;">'+parseFloat(actual.toFixed(6))+' ✓</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c6Btn').addEventListener('click',calc);
              document.getElementById('g11c6theta').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c6func').addEventListener('change',calc);
              document.getElementById('g11c6form').addEventListener('change',calc);

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Ko-verhoudings (90° ± θ): sin↔cos ruil om. Alle ander reduksies (180° ± θ, 360° − θ, −θ): dieselfde verhouding, teken bepaal deur die kwadrant van die oorspronklike saamgestelde hoek.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "cos(180° + θ) is gelyk aan:",
          options: ["cosθ", "−cosθ", "sinθ", "−sinθ"],
          answer: 1,
          topic: "Trig-identiteite en reduksieformules"
        },
        {
          type: "mc",
          text: "Vereenvoudig: sin(360° − x) / cos(−x)",
          options: ["−tanx", "tanx", "−1", "1"],
          answer: 0,
          topic: "Trig-identiteite en reduksieformules"
        },
        {
          type: "mc",
          text: "sin(90° − x) is gelyk aan:",
          options: ["sinx", "−sinx", "cosx", "−cosx"],
          answer: 2,
          topic: "Trig-identiteite en reduksieformules"
        },
        {
          type: "mc",
          text: "Watter identiteit is NIE korrek nie?",
          options: ["sin²θ + cos²θ = 1", "tanθ = cosθ/sinθ", "1 − sin²θ = cos²θ", "tan²θ + 1 = 1/cos²θ"],
          answer: 1,
          topic: "Trig-identiteite en reduksieformules"
        },
        {
          type: "mc",
          text: "sin(180° − 30°) is gelyk aan:",
          options: ["−sin30°", "cos30°", "sin30°", "−cos30°"],
          answer: 2,
          topic: "Trig-identiteite en reduksieformules"
        },
        {
          type: "mc",
          text: "Vereenvoudig: sin(180° − x) · cos(−x) / sin(90° + x)",
          options: ["sinx", "cosx", "tanx", "1"],
          answer: 0,
          topic: "Trig-identiteite en reduksieformules"
        }
      ]
    },
    {
      id: 601,
      chapter: 6,
      name: "Sinusreël, kosinusreël en oppervlakte-reël",
      fullName: "Die sinusreël, kosinusreël, en oppervlakte-reël vir nie-reghoekige driehoeke",
      lesson: {
        heading: "Sinusreël, kosinusreël, en oppervlakte-reël",
        sub: "Hoofstuk 6 · Onderwerp 2",
        body: `
          <p>Hierdie drie reëls brei trigonometrie uit na <strong>enige driehoek</strong> (nie net reghoekig nie).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Oppervlakte-reël</div>
            <p>
              Oppervlakte = ½ab·sinC (waar C die ingeslote hoek tussen sye a en b is)<br>
              Gebruik wanneer: <strong>twee sye en die ingeslote hoek (SHS)</strong> bekend is.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Sinusreël</div>
            <p>
              <span class="math">a/sinA = b/sinB = c/sinC</span><br><br>
              Gebruik wanneer: HHS of SSH (twee hoeke + een sy, of twee sye + nie-ingeslote hoek).<br>
              <strong>Let op die dubbelsinnige geval</strong> (SSH) — kan twee oplossings gee.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Kosinusreël</div>
            <p>
              <span class="math">a² = b² + c² − 2bc·cosA</span><br>
              Herrangskik: <span class="math">cosA = (b² + c² − a²) / 2bc</span><br><br>
              Gebruik wanneer: <strong>SHS</strong> (twee sye + ingeslote hoek) of <strong>SSS</strong> (drie sye).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Kosinusreël</div>
            <p>In △ABC: a = 8, b = 6, C = 60°. Vind c.<br>
            <span class="math">c² = 64 + 36 − 2(8)(6)cos60° = 100 − 96(½) = 100 − 48 = 52</span><br>
            <span class="math">c = √52 = 2√13 ≈ 7.21</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Driehoekreël-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies 'n reël, voer die bekende waardes in — kry die ontbrekende sy/hoek/oppervlakte.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g11c6t2area" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Oppervlakte-reël</button>
              <button id="g11c6t2sine" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Sinusreël</button>
              <button id="g11c6t2cos" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Kosinusreël</button>
            </div>
            <div id="g11c6t2areaPanel">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">Oppervlakte = ½·b·c·sinA (twee sye + ingeslote hoek)</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sy b</div><input id="g11c6t2ab" type="number" value="7" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sy c</div><input id="g11c6t2ac" type="number" value="5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek A (°)</div><input id="g11c6t2aA" type="number" value="30" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c6t2areaBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
              </div>
            </div>
            <div id="g11c6t2sinePanel" style="display:none;">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">a/sinA = b/sinB: voer bekende sy a, hoek A, hoek B in → vind b</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sy a</div><input id="g11c6t2sa" type="number" value="10" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek A (°)</div><input id="g11c6t2sA" type="number" value="45" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek B (°)</div><input id="g11c6t2sB" type="number" value="60" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c6t2sineBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind b</button>
              </div>
            </div>
            <div id="g11c6t2cosPanel" style="display:none;">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">c² = a² + b² − 2ab·cosC (SHS): voer a, b, hoek C in → vind c</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sy a</div><input id="g11c6t2ca" type="number" value="8" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sy b</div><input id="g11c6t2cb" type="number" value="6" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek C (°)</div><input id="g11c6t2cC" type="number" value="60" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c6t2cosBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind c</button>
              </div>
            </div>
            <div id="g11c6t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function setMode(m){
                ['area','sine','cos'].forEach(id=>{
                  document.getElementById('g11c6t2'+id+'Panel').style.display=id===m?'':'none';
                  const b=document.getElementById('g11c6t2'+id);
                  b.style.cssText=id===m?'background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;':'background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;';
                });
                document.getElementById('g11c6t2Out').innerHTML='';
              }
              ['area','sine','cos'].forEach(id=>document.getElementById('g11c6t2'+id).addEventListener('click',()=>setMode(id)));
              document.getElementById('g11c6t2areaBtn').addEventListener('click',()=>{
                const b=gv('g11c6t2ab'),c=gv('g11c6t2ac'),A=gv('g11c6t2aA');
                const out=document.getElementById('g11c6t2Out');
                if([b,c,A].some(isNaN)||b<=0||c<=0||A<=0||A>=180){out.innerHTML='<span style="color:#fca5a5;">Voer geldige positiewe waardes in (hoek 0°–180°).</span>';return;}
                const area=0.5*b*c*Math.sin(A*Math.PI/180);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Oppervlakte = ½·'+b+'·'+c+'·sin('+A+'°) = ½·'+b+'·'+c+'·'+f(Math.sin(A*Math.PI/180))+' = </span><span style="color:#6ee7b7;">'+f(area)+' eenhede²</span>';
              });
              document.getElementById('g11c6t2sineBtn').addEventListener('click',()=>{
                const a=gv('g11c6t2sa'),A=gv('g11c6t2sA'),B=gv('g11c6t2sB');
                const out=document.getElementById('g11c6t2Out');
                if([a,A,B].some(isNaN)||a<=0||A<=0||B<=0||A+B>=180){out.innerHTML='<span style="color:#fca5a5;">Kontroleer die waardes — hoeke moet positief wees en minder as 180° optel.</span>';return;}
                const b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180);
                const C=180-A-B;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">b/sin B = a/sin A → b = a·sinB/sinA = '+a+'·'+f(Math.sin(B*Math.PI/180))+'/'+f(Math.sin(A*Math.PI/180))+'</span><br><span style="color:#6ee7b7;">b = '+f(b)+'</span>  <span style="color:rgba(221,225,240,0.50);">∠C = 180°−'+A+'°−'+B+'° = '+C+'°</span>';
              });
              document.getElementById('g11c6t2cosBtn').addEventListener('click',()=>{
                const a=gv('g11c6t2ca'),b=gv('g11c6t2cb'),C=gv('g11c6t2cC');
                const out=document.getElementById('g11c6t2Out');
                if([a,b,C].some(isNaN)||a<=0||b<=0||C<=0||C>=180){out.innerHTML='<span style="color:#fca5a5;">Voer geldige positiewe waardes in.</span>';return;}
                const c2=a*a+b*b-2*a*b*Math.cos(C*Math.PI/180);
                const c=Math.sqrt(c2);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">c² = '+a+'² + '+b+'² − 2('+a+')('+b+')cos('+C+'°) = '+f(a*a)+'+'+f(b*b)+'−'+f(2*a*b*Math.cos(C*Math.PI/180))+'</span><br><span style="color:rgba(221,225,240,0.50);">c² = '+f(c2)+'</span><br><span style="color:#6ee7b7;">c = '+f(c)+'</span>';
              });
              setMode('area');
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Watter reël? Oppervlakte-reël: SHS (twee sye + ingeslote hoek). Sinusreël: HHS of HSH. Kosinusreël: SHS (om die derde sy te vind) of SSS (om 'n hoek te vind).</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Oppervlakte van △ABC waar a = 7, b = 5, C = 30°:",
          options: ["8.75", "17.5", "9.25", "Beide A en C"],
          answer: 0,
          topic: "Sinusreël, kosinusreël en oppervlakte-reël"
        },
        {
          type: "mc",
          text: "In △PQR is p = 10, P = 45°, Q = 60°. Vind q met behulp van die sinusreël:",
          options: ["q = 10sin60°/sin45°", "q = sin60°/10sin45°", "q = 10sin45°/sin60°", "q = 10/(sin45°·sin60°)"],
          answer: 0,
          topic: "Sinusreël, kosinusreël en oppervlakte-reël"
        },
        {
          type: "mc",
          text: "In △ABC is a = 5, b = 7, c = 6. cosA is gelyk aan:",
          options: ["(49+36−25)/84", "(25+49−36)/70", "(25+36−49)/60", "(25+49+36)/84"],
          answer: 0,
          topic: "Sinusreël, kosinusreël en oppervlakte-reël"
        },
        {
          type: "input",
          text: "Oppervlakte van △ABC: sye b = 4 en c = 6, ingeslote hoek A = 90°. Vind die oppervlakte.",
          answer: "12",
          topic: "Sinusreël, kosinusreël en oppervlakte-reël"
        },
        {
          type: "mc",
          text: "Die kosinusreël word gebruik wanneer jy het:",
          options: ["HHS", "SHS of SSS", "HSH", "HHH"],
          answer: 1,
          topic: "Sinusreël, kosinusreël en oppervlakte-reël"
        },
        {
          type: "input",
          text: "In driehoek ABC is a = 10, c = 8, en A = 75°. Gebruik die sinusreël om hoek C te vind (tot die naaste graad).",
          answer: "51",
          topic: "Sinusreël, kosinusreël en oppervlakte-reël"
        }
      ]
    },
    {
      id: 602,
      chapter: 6,
      name: "Oplos van trigonometriese vergelykings",
      fullName: "Die vind van algemene oplossings van trigonometriese vergelykings en oplossings in 'n gegewe interval",
      lesson: {
        heading: "Oplos van trigonometriese vergelykings",
        sub: "Hoofstuk 6 · Onderwerp 3",
        body: `
          <p>Omdat sinus, kosinus en tangens <strong>periodies</strong> is, het 'n trig-vergelyking oneindig baie oplossings. Graad 11 stel bekend hoe om die <strong>algemene oplossing</strong> neer te skryf, en dit dan te beperk tot 'n gegewe interval.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Algemene oplossings</div>
            <p>
              As <span class="math">cos θ = cos α</span>, dan <span class="math">θ = 360°n ± α</span>, n ∈ ℤ.<br>
              As <span class="math">sin θ = sin α</span>, dan <span class="math">θ = 180°n + (−1)ⁿα</span>, n ∈ ℤ — of ekwivalent, <span class="math">θ = α + 360°n</span> of <span class="math">θ = (180° − α) + 360°n</span>.<br>
              As <span class="math">tan θ = tan α</span>, dan <span class="math">θ = 180°n + α</span>, n ∈ ℤ (periode 180°, net een familie van oplossings).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Algemene oplossing</div>
            <p>Los <span class="math">sin θ = 0,5</span> op vir die algemene oplossing.<br>
            Verwysingshoek: <span class="math">α = sin⁻¹(0,5) = 30°</span><br>
            <span class="math">θ = 30° + 360°n</span> of <span class="math">θ = 150° + 360°n</span>, n ∈ ℤ</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Beperk tot 'n interval</div>
            <p>Los <span class="math">cos θ = −0,6</span> op vir <span class="math">θ ∈ [0°; 360°]</span>.<br>
            Verwysingshoek: <span class="math">α = cos⁻¹(0,6) ≈ 53,1°</span>. Aangesien cos θ negatief is, is θ in Kwadrant 2 of 3:<br>
            <span class="math">θ = 180° − 53,1° = 126,9°</span> of <span class="math">θ = 180° + 53,1° = 233,1°</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Vergelykings wat eers ekstra algebra benodig</div>
            <p>
              Sommige vergelykings benodig faktorisering of 'n identiteitsubstitusie voordat jy 'n enkele trig-verhouding kan isoleer:<br>
              <span class="math">2sin²θ − sinθ − 1 = 0 → (2sinθ + 1)(sinθ − 1) = 0 → sinθ = −½ of sinθ = 1</span><br>
              Los dan elkeen apart op met die algemene-oplossingreëls hierbo.<br><br>
              Jy mag ook gevra word vir watter waardes van 'n veranderlike 'n uitdrukking soos <span class="math">1/(sinθ − 1)</span> <strong>onbepaald</strong> is — stel die noemer gelyk aan nul en sluit daardie θ-waardes uit.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Trig-vergelykingsoplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer sin/cos/tan θ = 'n waarde in — kry die verwysingshoek, die algemene oplossing, en alle oplossings in [0°; 360°].</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Funksie</div>
                <select id="g11c6t3fn" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin θ =</option><option value="cos">cos θ =</option><option value="tan">tan θ =</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Waarde</div><input id="g11c6t3val" type="number" value="0.5" step="0.05" min="-3" max="3" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c6t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g11c6t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(2)).toString();}
              function calc(){
                const fn=document.getElementById('g11c6t3fn').value;
                const val=parseFloat(document.getElementById('g11c6t3val').value);
                const out=document.getElementById('g11c6t3Out');
                if(isNaN(val)){out.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige waarde in.</span>';return;}
                if(fn!=='tan'&&(val<-1||val>1)){out.innerHTML='<span style="color:#fca5a5;">'+fn+'θ moet tussen −1 en 1 wees.</span>';return;}
                let html='';
                if(fn==='sin'){
                  const alpha=Math.asin(val)*180/Math.PI;
                  html+='<span style="color:rgba(221,225,240,0.50);">Verwysingshoek: α = sin⁻¹('+val+') = '+f(alpha)+'°</span><br>';
                  html+='<span style="color:#6ee7b7;">Algemene oplossing: θ = '+f(alpha)+'° + 360°n &nbsp;of&nbsp; θ = '+f(180-alpha)+'° + 360°n, &nbsp;n ∈ ℤ</span><br>';
                  const sols=new Set();
                  [alpha,180-alpha].forEach(a=>{let s=a;while(s<0)s+=360;s=s%360;sols.add(f(s));let s2=s+360;if(s2<=360)sols.add(f(s2%360===0?360:s2));});
                  html+='<span style="color:rgba(221,225,240,0.50);">Oplossings in [0°; 360°]: </span><span style="color:#fcd34d;">'+[...sols].sort((a,b)=>a-b).join('°, ')+'°</span>';
                } else if(fn==='cos'){
                  const alpha=Math.acos(val)*180/Math.PI;
                  html+='<span style="color:rgba(221,225,240,0.50);">Verwysingshoek: α = cos⁻¹('+val+') = '+f(alpha)+'°</span><br>';
                  html+='<span style="color:#6ee7b7;">Algemene oplossing: θ = 360°n ± '+f(alpha)+'°, &nbsp;n ∈ ℤ</span><br>';
                  const sols=new Set();
                  [alpha,360-alpha].forEach(a=>{let s=((a%360)+360)%360;sols.add(f(s));});
                  html+='<span style="color:rgba(221,225,240,0.50);">Oplossings in [0°; 360°]: </span><span style="color:#fcd34d;">'+[...sols].sort((a,b)=>a-b).join('°, ')+'°</span>';
                } else {
                  const alpha=Math.atan(val)*180/Math.PI;
                  html+='<span style="color:rgba(221,225,240,0.50);">Verwysingshoek: α = tan⁻¹('+val+') = '+f(alpha)+'°</span><br>';
                  html+='<span style="color:#6ee7b7;">Algemene oplossing: θ = 180°n + '+f(alpha)+'°, &nbsp;n ∈ ℤ</span><br>';
                  const sols=new Set();
                  for(let n=-1;n<=2;n++){let s=180*n+alpha;s=((s%360)+360)%360;if(s>=0&&s<=360)sols.add(f(s));}
                  html+='<span style="color:rgba(221,225,240,0.50);">Oplossings in [0°; 360°]: </span><span style="color:#fcd34d;">'+[...sols].sort((a,b)=>a-b).join('°, ')+'°</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c6t3Btn').addEventListener('click',calc);
              document.getElementById('g11c6t3val').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die ± in die kosinus se algemene oplossing en die (−1)ⁿ-truuk vir sinus kom albei van die feit dat cos positief/negatief simmetries is om 0°/180°, terwyl sin simmetries is om 90°. Tan het net ooit +180°n nodig, aangesien tan elke 180° herhaal.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Die algemene oplossing van cosθ = cos40° is:",
          options: ["θ = 360°n ± 40°", "θ = 180°n + 40°", "θ = 40° + 360°n slegs", "θ = 90°n + 40°"],
          answer: 0,
          topic: "Oplos van trigonometriese vergelykings"
        },
        {
          type: "mc",
          text: "Los sinθ = 1 op vir θ ∈ [0°; 360°]:",
          options: ["θ = 90°", "θ = 90° en 270°", "θ = 0° en 180°", "θ = 270°"],
          answer: 0,
          topic: "Oplos van trigonometriese vergelykings"
        },
        {
          type: "input",
          text: "Los tanθ = 1 op vir die kleinste positiewe θ (in grade).",
          answer: "45",
          topic: "Oplos van trigonometriese vergelykings"
        },
        {
          type: "mc",
          text: "2sin²θ − sinθ − 1 = 0 faktoriseer na:",
          options: ["(2sinθ + 1)(sinθ − 1) = 0", "(2sinθ − 1)(sinθ + 1) = 0", "(sinθ − 1)(sinθ + 1) = 0", "(2sinθ + 1)(sinθ + 1) = 0"],
          answer: 0,
          topic: "Oplos van trigonometriese vergelykings"
        },
        {
          type: "mc",
          text: "Vir watter waarde(s) van θ ∈ [0°; 360°] is 1/(cosθ) onbepaald?",
          options: ["90° en 270°", "0° en 180°", "180° slegs", "Geen"],
          answer: 0,
          topic: "Oplos van trigonometriese vergelykings"
        },
        {
          type: "input",
          text: "Los cosθ = 0,5 op vir die kleinste positiewe θ in [0°; 360°] (in grade).",
          answer: "60",
          topic: "Oplos van trigonometriese vergelykings"
        },
        {
          type: "input",
          text: "Los op vir θ: 2cos²θ − 3cosθ + 1 = 0. Gee die kleinste positiewe oplossing in (0°; 360°), in grade.",
          answer: "60",
          topic: "Oplos van trigonometriese vergelykings"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 6 Werkboek — Trigonometrie",
    questions: [
      {
        number: 1,
        text: "Vereenvoudig sonder 'n sakrekenaar:",
        parts: [
          { label: "a", text: "sin(180°+x)·cos(360°−x)−cos(180°−x)·sin(−x)", marks: 4 },
          { label: "b", text: "sin²(90°−x) + sin²x", marks: 3 },
          { label: "c", text: "tan(180°+x)·cos(360°+x)/sin(90°+x)", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "Bewys die volgende identiteite:",
        parts: [
          { label: "a", text: "(sinθ + cosθ)² = 1 + 2sinθ·cosθ", marks: 3 },
          { label: "b", text: "1/(1−sinθ) − 1/(1+sinθ) = 2tanθ·secθ", marks: 5 }
        ]
      },
      {
        number: 3,
        text: "In △ABC, AB = 9 cm, BC = 7 cm, en B̂ = 110°.",
        parts: [
          { label: "a", text: "Bereken die oppervlakte van △ABC.", marks: 3 },
          { label: "b", text: "Bereken AC met behulp van die kosinusreël.", marks: 3 },
          { label: "c", text: "Vind hoek A met behulp van die sinusreël.", marks: 3 }
        ]
      },
      {
        number: 4,
        text: "Twee landmeters staan by punte A en B, 120 m uitmekaar langs 'n reguit rivieroewer. Altwee sien 'n boom T op die teenoorgestelde oewer. Die gemete hoeke vanaf die basislyn AB word hieronder aangeteken:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Punt</th><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Hoek na T (vanaf AB)</th></tr><tr><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>A</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>52°</td></tr><tr><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>B</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>61°</td></tr></table>",
        parts: [
          { label: "a", text: "Bereken die grootte van hoek ATB (die hoek by die boom).", marks: 2 },
          { label: "b", text: "Gebruik die sinusreël om die afstand AT te bereken (tot 2 desimale plekke).", marks: 4 },
          { label: "c", text: "Bereken dus die loodregte afstand vanaf die boom tot die basislyn AB — die breedte van die rivier (tot 2 desimale plekke).", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "(−sinx)(cosx) − (−cosx)(−sinx) = −sinxcosx − sinxcosx = −2sinxcosx",
        b: "cos²x + sin²x = 1",
        c: "(tanx)(cosx)/(−sinx) ... vereenvoudig: (sinx/cosx)(cosx)/(−sinx) = −1"
      },
      2: {
        a: "LHS = sin²θ + 2sinθcosθ + cos²θ = 1 + 2sinθcosθ = RHS",
        b: "LHS = [(1+sinθ)−(1−sinθ)]/[(1−sinθ)(1+sinθ)] = 2sinθ/(1−sin²θ) = 2sinθ/cos²θ = 2(sinθ/cosθ)(1/cosθ) = 2tanθ·secθ = RHS"
      },
      3: {
        a: "Area = ½(9)(7)sin110° ≈ ½(63)(0.9397) ≈ 29.6 cm²",
        b: "AC²=81+49−2(9)(7)cos110°=130−126cos110°≈130+43.1≈173.1 → AC≈13.2 cm",
        c: "sinA/7 = sin110°/13.2 → sinA≈0.498 → A≈29.9°"
      },
      4: {
        a: "T̂ = 180° − 52° − 61° = 67°",
        b: "AT/sinB = AB/sinT → AT = 120×sin61°/sin67° ≈ 120×0,8746/0,9205 ≈ 114,02 m",
        c: "breedte = AT×sin52° ≈ 114,02×0,7880 ≈ 89,85 m"
      }
    }
  }
});
