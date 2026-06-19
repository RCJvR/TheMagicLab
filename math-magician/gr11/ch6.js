// Math Magician — Grade 11, Chapter 6
// Trigonometry — Identities, Reduction, Sine/Cosine/Area Rules

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 600,
      chapter: 6,
      name: "Trig identities & reduction formulae",
      fullName: "Trigonometric identities, reduction formulae, and solving equations",
      lesson: {
        heading: "Trig identities and reduction formulae",
        sub: "Chapter 6 · Topic 1",
        body: `
          <p>Grade 11 introduces <strong>compound angle identities</strong> and the <strong>reduction formulae</strong> for all four quadrants.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Fundamental identities</div>
            <p>
              <strong>Quotient:</strong> <span class="math">tan θ = sin θ / cos θ</span><br>
              <strong>Pythagorean:</strong> <span class="math">sin²θ + cos²θ = 1</span><br>
              Derived: <span class="math">sin²θ = 1 − cos²θ</span> and <span class="math">cos²θ = 1 − sin²θ</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reduction formulae (full set)</div>
            <p>
              <strong>Supplementary (180° − θ):</strong> sin(180°−θ) = sinθ; cos(180°−θ) = −cosθ<br>
              <strong>Co-supplementary (180° + θ):</strong> sin(180°+θ) = −sinθ; cos(180°+θ) = −cosθ<br>
              <strong>Reflex (360° − θ):</strong> sin(360°−θ) = −sinθ; cos(360°−θ) = cosθ<br>
              <strong>Negative angles:</strong> sin(−θ) = −sinθ; cos(−θ) = cosθ<br>
              <strong>Co-ratio (90° ± θ):</strong> sin(90°−θ) = cosθ; cos(90°−θ) = sinθ
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove an identity</div>
            <p>Prove: <span class="math">(1 − sin²x)/cos x = cos x</span><br>
            LHS = <span class="math">cos²x / cos x = cos x</span> = RHS ✓<br><br>
            Always work on ONE side only. Never cross-multiply in a proof.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Simplify using reduction</div>
            <p><span class="math">sin(180° + x) · cos(360° − x) / tan(−x)</span><br>
            <span class="math">= (−sin x)(cos x) / (−tan x)</span><br>
            <span class="math">= (−sin x · cos x) / (−sin x/cos x)</span><br>
            <span class="math">= cos²x</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Reduction Formula Reference</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Select a compound angle form — see the reduction result and the rule applied.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Function</div>
                <select id="g11c6func" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin</option><option value="cos">cos</option><option value="tan">tan</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Form</div>
                <select id="g11c6form" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="180m">180° − θ</option>
                  <option value="180p">180° + θ</option>
                  <option value="360m">360° − θ</option>
                  <option value="neg">−θ</option>
                  <option value="90m">90° − θ</option>
                  <option value="90p">90° + θ</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">θ value (°)</div><input id="g11c6theta" type="number" value="30" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c6Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Reduce</button>
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
                let html='<span style="color:rgba(221,225,240,0.50);">Rule: </span><span style="color:#fcd34d;">'+r.rule+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+fn+'('+formLabels[form]+') for θ = '+theta+'° → </span>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+(r.sign===-1?'−':r.sign===1?'':'')+r.fn+'('+theta+'°) = </span>';
                html+='<span style="color:#6ee7b7;">'+parseFloat(reduced.toFixed(6))+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Verify: '+fn+'('+(form==='180m'?180-theta:form==='180p'?180+theta:form==='360m'?360-theta:form==='neg'?-theta:form==='90m'?90-theta:90+theta)+'°) = </span>';
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

          <div class="tip-box"><span class="tip-icon">💡</span><span>Co-ratios (90° ± θ): sin↔cos swap. All other reductions (180° ± θ, 360° − θ, −θ): same ratio, sign determined by the quadrant of the original compound angle.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "cos(180° + θ) equals:",
          options: ["cosθ", "−cosθ", "sinθ", "−sinθ"],
          answer: 1,
          topic: "Trig identities & reduction formulae"
        },
        {
          type: "mc",
          text: "Simplify: sin(360° − x) / cos(−x)",
          options: ["−tanx", "tanx", "−1", "1"],
          answer: 0,
          topic: "Trig identities & reduction formulae"
        },
        {
          type: "mc",
          text: "sin(90° − x) equals:",
          options: ["sinx", "−sinx", "cosx", "−cosx"],
          answer: 2,
          topic: "Trig identities & reduction formulae"
        },
        {
          type: "mc",
          text: "Which identity is NOT correct?",
          options: ["sin²θ + cos²θ = 1", "tanθ = cosθ/sinθ", "1 − sin²θ = cos²θ", "tan²θ + 1 = 1/cos²θ"],
          answer: 1,
          topic: "Trig identities & reduction formulae"
        },
        {
          type: "mc",
          text: "sin(180° − 30°) equals:",
          options: ["−sin30°", "cos30°", "sin30°", "−cos30°"],
          answer: 2,
          topic: "Trig identities & reduction formulae"
        }
      ]
    },
    {
      id: 601,
      chapter: 6,
      name: "Sine rule, cosine rule & area rule",
      fullName: "The sine rule, cosine rule, and area rule for non-right-angled triangles",
      lesson: {
        heading: "Sine rule, cosine rule, and area rule",
        sub: "Chapter 6 · Topic 2",
        body: `
          <p>These three rules extend trigonometry to <strong>any triangle</strong> (not just right-angled).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Area rule</div>
            <p>
              Area = ½ab·sinC (where C is the included angle between sides a and b)<br>
              Use when: <strong>two sides and included angle (SAS)</strong> are known.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Sine rule</div>
            <p>
              <span class="math">a/sinA = b/sinB = c/sinC</span><br><br>
              Use when: AAS or SSA (two angles + one side, or two sides + non-included angle).<br>
              <strong>Watch for the ambiguous case</strong> (SSA) — may give two solutions.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Cosine rule</div>
            <p>
              <span class="math">a² = b² + c² − 2bc·cosA</span><br>
              Rearranged: <span class="math">cosA = (b² + c² − a²) / 2bc</span><br><br>
              Use when: <strong>SAS</strong> (two sides + included angle) or <strong>SSS</strong> (three sides).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Cosine rule</div>
            <p>In △ABC: a = 8, b = 6, C = 60°. Find c.<br>
            <span class="math">c² = 64 + 36 − 2(8)(6)cos60° = 100 − 96(½) = 100 − 48 = 52</span><br>
            <span class="math">c = √52 = 2√13 ≈ 7.21</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Triangle Rule Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Select a rule, enter the known values — get the missing side/angle/area.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g11c6t2area" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Area rule</button>
              <button id="g11c6t2sine" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Sine rule</button>
              <button id="g11c6t2cos" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Cosine rule</button>
            </div>
            <div id="g11c6t2areaPanel">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">Area = ½·b·c·sinA (two sides + included angle)</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Side b</div><input id="g11c6t2ab" type="number" value="7" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Side c</div><input id="g11c6t2ac" type="number" value="5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle A (°)</div><input id="g11c6t2aA" type="number" value="30" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c6t2areaBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
              </div>
            </div>
            <div id="g11c6t2sinePanel" style="display:none;">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">a/sinA = b/sinB: enter known side a, angle A, angle B → find b</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Side a</div><input id="g11c6t2sa" type="number" value="10" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle A (°)</div><input id="g11c6t2sA" type="number" value="45" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle B (°)</div><input id="g11c6t2sB" type="number" value="60" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c6t2sineBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find b</button>
              </div>
            </div>
            <div id="g11c6t2cosPanel" style="display:none;">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">c² = a² + b² − 2ab·cosC (SAS): enter a, b, angle C → find c</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Side a</div><input id="g11c6t2ca" type="number" value="8" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Side b</div><input id="g11c6t2cb" type="number" value="6" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle C (°)</div><input id="g11c6t2cC" type="number" value="60" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c6t2cosBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find c</button>
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
                if([b,c,A].some(isNaN)||b<=0||c<=0||A<=0||A>=180){out.innerHTML='<span style="color:#fca5a5;">Enter valid positive values (angle 0°–180°).</span>';return;}
                const area=0.5*b*c*Math.sin(A*Math.PI/180);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Area = ½·'+b+'·'+c+'·sin('+A+'°) = ½·'+b+'·'+c+'·'+f(Math.sin(A*Math.PI/180))+' = </span><span style="color:#6ee7b7;">'+f(area)+' units²</span>';
              });
              document.getElementById('g11c6t2sineBtn').addEventListener('click',()=>{
                const a=gv('g11c6t2sa'),A=gv('g11c6t2sA'),B=gv('g11c6t2sB');
                const out=document.getElementById('g11c6t2Out');
                if([a,A,B].some(isNaN)||a<=0||A<=0||B<=0||A+B>=180){out.innerHTML='<span style="color:#fca5a5;">Check values — angles must be positive and sum to less than 180°.</span>';return;}
                const b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180);
                const C=180-A-B;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">b/sin B = a/sin A → b = a·sinB/sinA = '+a+'·'+f(Math.sin(B*Math.PI/180))+'/'+f(Math.sin(A*Math.PI/180))+'</span><br><span style="color:#6ee7b7;">b = '+f(b)+'</span>  <span style="color:rgba(221,225,240,0.50);">∠C = 180°−'+A+'°−'+B+'° = '+C+'°</span>';
              });
              document.getElementById('g11c6t2cosBtn').addEventListener('click',()=>{
                const a=gv('g11c6t2ca'),b=gv('g11c6t2cb'),C=gv('g11c6t2cC');
                const out=document.getElementById('g11c6t2Out');
                if([a,b,C].some(isNaN)||a<=0||b<=0||C<=0||C>=180){out.innerHTML='<span style="color:#fca5a5;">Enter valid positive values.</span>';return;}
                const c2=a*a+b*b-2*a*b*Math.cos(C*Math.PI/180);
                const c=Math.sqrt(c2);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">c² = '+a+'² + '+b+'² − 2('+a+')('+b+')cos('+C+'°) = '+f(a*a)+'+'+f(b*b)+'−'+f(2*a*b*Math.cos(C*Math.PI/180))+'</span><br><span style="color:rgba(221,225,240,0.50);">c² = '+f(c2)+'</span><br><span style="color:#6ee7b7;">c = '+f(c)+'</span>';
              });
              setMode('area');
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Which rule? Area rule: SAS (two sides + included angle). Sine rule: AAS or ASA. Cosine rule: SAS (to find the third side) or SSS (to find an angle).</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Area of △ABC where a = 7, b = 5, C = 30°:",
          options: ["8.75", "17.5", "9.25", "Both A and C"],
          answer: 0,
          topic: "Sine rule, cosine rule & area rule"
        },
        {
          type: "mc",
          text: "In △PQR, p = 10, P = 45°, Q = 60°. Find q using the sine rule:",
          options: ["q = 10sin60°/sin45°", "q = sin60°/10sin45°", "q = 10sin45°/sin60°", "q = 10/(sin45°·sin60°)"],
          answer: 0,
          topic: "Sine rule, cosine rule & area rule"
        },
        {
          type: "mc",
          text: "In △ABC, a = 5, b = 7, c = 6. cosA equals:",
          options: ["(49+36−25)/84", "(25+49−36)/70", "(25+36−49)/60", "(25+49+36)/84"],
          answer: 0,
          topic: "Sine rule, cosine rule & area rule"
        },
        {
          type: "input",
          text: "Area of △ABC: sides b = 4 and c = 6, included angle A = 90°. Find area.",
          answer: "12",
          topic: "Sine rule, cosine rule & area rule"
        },
        {
          type: "mc",
          text: "The cosine rule is used when you have:",
          options: ["AAS", "SAS or SSS", "ASA", "AAA"],
          answer: 1,
          topic: "Sine rule, cosine rule & area rule"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 6 Workbook — Trigonometry",
    questions: [
      {
        number: 1,
        text: "Simplify without a calculator:",
        parts: [
          { label: "a", text: "sin(180°+x)·cos(360°−x)−cos(180°−x)·sin(−x)", marks: 4 },
          { label: "b", text: "sin²(90°−x) + sin²x", marks: 3 },
          { label: "c", text: "tan(180°+x)·cos(360°+x)/sin(90°+x)", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "Prove the following identities:",
        parts: [
          { label: "a", text: "(sinθ + cosθ)² = 1 + 2sinθ·cosθ", marks: 3 },
          { label: "b", text: "1/(1−sinθ) − 1/(1+sinθ) = 2tanθ·secθ", marks: 5 }
        ]
      },
      {
        number: 3,
        text: "In △ABC, AB = 9 cm, BC = 7 cm, and B̂ = 110°.",
        parts: [
          { label: "a", text: "Calculate the area of △ABC.", marks: 3 },
          { label: "b", text: "Calculate AC using the cosine rule.", marks: 3 },
          { label: "c", text: "Find angle A using the sine rule.", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "(−sinx)(cosx) − (−cosx)(−sinx) = −sinxcosx − sinxcosx = −2sinxcosx",
        b: "cos²x + sin²x = 1",
        c: "(tanx)(cosx)/(−sinx) ... simplify: (sinx/cosx)(cosx)/(−sinx) = −1"
      },
      2: {
        a: "LHS = sin²θ + 2sinθcosθ + cos²θ = 1 + 2sinθcosθ = RHS",
        b: "LHS = [(1+sinθ)−(1−sinθ)]/[(1−sinθ)(1+sinθ)] = 2sinθ/(1−sin²θ) = 2sinθ/cos²θ = 2(sinθ/cosθ)(1/cosθ) = 2tanθ·secθ = RHS"
      },
      3: {
        a: "Area = ½(9)(7)sin110° ≈ ½(63)(0.9397) ≈ 29.6 cm²",
        b: "AC²=81+49−2(9)(7)cos110°=130−126cos110°≈130+43.1≈173.1 → AC≈13.2 cm",
        c: "sinA/7 = sin110°/13.2 → sinA≈0.498 → A≈29.9°"
      }
    }
  }
});
