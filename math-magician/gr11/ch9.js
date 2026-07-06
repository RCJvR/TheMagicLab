// Math Magician — Grade 11, Chapter 9
// Finance, Growth and Decay

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 900,
      chapter: 9,
      name: "Depreciation & timelines",
      fullName: "Simple and compound depreciation, and using timelines",
      lesson: {
        heading: "Depreciation and financial timelines",
        sub: "Chapter 9 · Topic 1",
        body: `
          <p>Grade 11 Finance introduces <strong>depreciation</strong> (assets losing value) and <strong>timelines</strong> for tracking complex multi-stage investments.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Depreciation formulae</div>
            <p>
              <strong>Straight-line (simple) depreciation:</strong><br>
              <span class="math">A = P(1 − in)</span><br>
              Asset loses the same rand value each year.<br><br>
              <strong>Reducing-balance (compound) depreciation:</strong><br>
              <span class="math">A = P(1 − i)ⁿ</span><br>
              Asset loses the same <em>percentage</em> of its current value each year. Always > straight-line for same rate.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Compare depreciation</div>
            <p>Car bought for R250 000. Depreciation rate 15% p.a. Value after 5 years:<br>
            <strong>Straight-line:</strong> A = 250000(1 − 0.15 × 5) = 250000(0.25) = R62 500<br>
            <strong>Reducing-balance:</strong> A = 250000(0.85)⁵ ≈ 250000 × 0.4437 ≈ R110 929</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Timelines</div>
            <p>
              A <strong>timeline</strong> is a diagram showing money at different points in time. Used for:<br>
              • Multi-stage investments (different rates at different periods)<br>
              • Finding when the value reaches a certain amount<br>
              • Comparing future values<br><br>
              Always move money to the <em>same point in time</em> before comparing.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Depreciation Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Compare straight-line and reducing-balance depreciation side by side.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Principal P (R)</div><input id="g11c9p" type="number" value="250000" min="1" style="width:110px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rate i (%)</div><input id="g11c9i" type="number" value="15" min="0.01" max="100" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years n</div><input id="g11c9n" type="number" value="5" min="1" max="50" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Compare</button>
            </div>
            <div id="g11c9Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const P=gv('g11c9p'),i=gv('g11c9i')/100,n=gv('g11c9n');
                const out=document.getElementById('g11c9Out');
                if([P,i,n].some(isNaN)||P<=0||i<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                const sl=P*(1-i*n);
                const rb=P*Math.pow(1-i,n);
                const yrSL=sl>0?n:Math.floor(1/i);
                let html='<span style="color:rgba(221,225,240,0.50);">Straight-line: A = P(1 − in) = '+R(P)+'(1 − '+i+'×'+n+')</span><br>';
                if(sl<=0) html+='<span style="color:#fca5a5;">Straight-line: value reached 0 (fully depreciated) — asset zero-valued before year '+n+'.</span><br>';
                else html+='<span style="color:#fcd34d;">Straight-line A = '+R(sl)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Reducing-balance: A = P(1−i)ⁿ = '+R(P)+'('+((1-i).toFixed(4))+')^'+n+'</span><br>';
                html+='<span style="color:#6ee7b7;">Reducing-balance A = '+R(rb)+'</span>';
                if(sl>0) html+='<br><span style="color:rgba(221,225,240,0.50);">Reducing-balance is higher by '+R(rb-sl)+' (same rate, RB always gives more book value)</span>';
                out.innerHTML=html;
              }
              ['g11c9p','g11c9i','g11c9n'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c9Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Machine cost R80 000. Straight-line depreciation 20% p.a. Value after 4 years:",
          options: ["R16 000", "R32 768", "R16 384", "R20 000"],
          answer: 0,
          topic: "Depreciation & timelines"
        },
        {
          type: "mc",
          text: "Reducing-balance depreciation always gives _____ book value than straight-line for same rate:",
          options: ["Lower", "Higher", "Equal", "Depends on number of years"],
          answer: 1,
          topic: "Depreciation & timelines"
        },
        {
          type: "input",
          text: "Equipment: R120 000. Reducing-balance depreciation 10% p.a. Find value after 3 years (to nearest rand).",
          answer: "87480",
          topic: "Depreciation & timelines"
        },
        {
          type: "mc",
          text: "A car depreciates straight-line from R200 000 to R50 000 in 5 years. The annual depreciation rate is:",
          options: ["15%", "10%", "20%", "30%"],
          answer: 0,
          topic: "Depreciation & timelines"
        },
        {
          type: "mc",
          text: "A timeline is used primarily to:",
          options: ["Find interest rates", "Compare money at different points in time at the same point", "Calculate monthly payments", "Draw graphs of exponential growth"],
          answer: 1,
          topic: "Depreciation & timelines"
        }
      ]
    },
    {
      id: 901,
      chapter: 9,
      name: "Nominal & effective interest rates",
      fullName: "Nominal interest rates, effective interest rates, and compounding periods",
      lesson: {
        heading: "Nominal and effective interest rates",
        sub: "Chapter 9 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Compounding periods</div>
            <p>
              Interest can be compounded more frequently than annually:<br>
              <span class="math">A = P(1 + i/n)^(nt)</span><br>
              where n = compounding periods per year, t = time in years<br><br>
              Common periods:<br>
              • Annually: n = 1<br>
              • Semi-annually: n = 2<br>
              • Quarterly: n = 4<br>
              • Monthly: n = 12<br>
              • Daily: n = 365
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Nominal vs effective interest rate</div>
            <p>
              <strong>Nominal rate (i_nom):</strong> the stated annual rate (e.g. "12% p.a. compounded monthly")<br>
              <strong>Effective rate (i_eff):</strong> the equivalent annual rate that would give the same result with annual compounding<br><br>
              Conversion: <span class="math">(1 + i_eff) = (1 + i_nom/n)ⁿ</span><br>
              So: <span class="math">i_eff = (1 + i_nom/n)ⁿ − 1</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Nominal to effective</div>
            <p>12% p.a. compounded monthly:<br>
            <span class="math">i_eff = (1 + 0.12/12)¹² − 1 = (1.01)¹² − 1 ≈ 0.1268 = 12.68% p.a.</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Nominal / Effective Rate & Compounding Calculator</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g11c9t2conv" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Nom → Effective</button>
              <button id="g11c9t2acc" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">A = P(1+i/n)^(nt)</button>
            </div>
            <div id="g11c9t2convP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nominal rate (%)</div><input id="g11c9t2nom" type="number" value="12" min="0.01" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periods/year</div><select id="g11c9t2n" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1">1 (Annual)</option><option value="2">2 (Semi-ann.)</option><option value="4">4 (Quarterly)</option><option value="12" selected>12 (Monthly)</option><option value="365">365 (Daily)</option></select></div>
              <button id="g11c9t2convBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Convert</button>
            </div>
            <div id="g11c9t2accP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P (R)</div><input id="g11c9t2p" type="number" value="5000" min="1" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nominal % p.a.</div><input id="g11c9t2ar" type="number" value="8" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periods/year</div><select id="g11c9t2an" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1">1 (Annual)</option><option value="2">2 (Semi-ann.)</option><option value="4" selected>4 (Quarterly)</option><option value="12">12 (Monthly)</option><option value="365">365 (Daily)</option></select></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years t</div><input id="g11c9t2t" type="number" value="3" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9t2accBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate A</button>
            </div>
            <div id="g11c9t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const convBtn=document.getElementById('g11c9t2conv'),accBtn=document.getElementById('g11c9t2acc');
              const convP=document.getElementById('g11c9t2convP'),accP=document.getElementById('g11c9t2accP');
              const out=document.getElementById('g11c9t2Out');
              function setMode(m){
                if(m==='conv'){convP.style.display='flex';accP.style.display='none';convBtn.style.background='rgba(99,102,241,0.30)';convBtn.style.color='#a5b4fc';convBtn.style.borderColor='rgba(99,102,241,0.50)';accBtn.style.background='transparent';accBtn.style.color='rgba(221,225,240,0.50)';accBtn.style.borderColor='rgba(99,102,241,0.20)';}
                else{accP.style.display='flex';convP.style.display='none';accBtn.style.background='rgba(99,102,241,0.30)';accBtn.style.color='#a5b4fc';accBtn.style.borderColor='rgba(99,102,241,0.50)';convBtn.style.background='transparent';convBtn.style.color='rgba(221,225,240,0.50)';convBtn.style.borderColor='rgba(99,102,241,0.20)';}
                out.innerHTML='';
              }
              convBtn.addEventListener('click',()=>setMode('conv'));
              accBtn.addEventListener('click',()=>setMode('acc'));
              document.getElementById('g11c9t2convBtn').addEventListener('click',()=>{
                const nom=gv('g11c9t2nom')/100,n=parseInt(document.getElementById('g11c9t2n').value);
                if(isNaN(nom)||nom<=0){out.innerHTML='<span style="color:#fca5a5;">Enter a valid nominal rate.</span>';return;}
                const eff=Math.pow(1+nom/n,n)-1;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">i_nom = '+( nom*100).toFixed(2)+'% compounded '+n+'×/year</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">i_eff = (1 + '+nom.toFixed(6)+'/'+n+')^'+n+' − 1</span><br>'+
                  '<span style="color:#6ee7b7;">Effective annual rate = '+(eff*100).toFixed(4)+'% p.a.</span>';
              });
              document.getElementById('g11c9t2accBtn').addEventListener('click',()=>{
                const P=gv('g11c9t2p'),r=gv('g11c9t2ar')/100,n=parseInt(document.getElementById('g11c9t2an').value),t=gv('g11c9t2t');
                if([P,r,t].some(isNaN)||P<=0||r<=0||t<=0){out.innerHTML='<span style="color:#fca5a5;">Enter valid positive values.</span>';return;}
                const A=P*Math.pow(1+r/n,n*t);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">A = '+R(P)+'(1 + '+(r*100).toFixed(2)+'%/'+n+')^('+n+'×'+t+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">= '+R(P)+'('+((1+r/n).toFixed(6))+')^'+(n*t)+'</span><br>'+
                  '<span style="color:#6ee7b7;">A = '+R(A)+'</span>   <span style="color:#fcd34d;">Interest earned = '+R(A-P)+'</span>';
              });
              ['g11c9t2nom'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c9t2convBtn').click();});});
              ['g11c9t2p','g11c9t2ar','g11c9t2t'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c9t2accBtn').click();});});
              setMode('conv');
              document.getElementById('g11c9t2convBtn').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "R5000 invested at 8% p.a. compounded quarterly for 3 years. A =",
          options: ["R6 341", "R6 298", "R6 325", "R6 500"],
          answer: 0,
          topic: "Nominal & effective interest rates"
        },
        {
          type: "mc",
          text: "Effective annual rate equivalent to 10% p.a. compounded semi-annually:",
          options: ["10.25%", "10.50%", "10%", "10.10%"],
          answer: 0,
          topic: "Nominal & effective interest rates"
        },
        {
          type: "input",
          text: "Which gives more: 12% p.a. compounded monthly OR 12.5% p.a. compounded annually? Calculate effective rate of 12% monthly (to 2 d.p. as %).",
          answer: "12.68",
          altAnswers: ["12.68%"],
          topic: "Nominal & effective interest rates"
        },
        {
          type: "mc",
          text: "The formula A = P(1 + i/n)^(nt). If n = 12 and the nominal annual rate is 18%, the rate per period is:",
          options: ["1.5%", "18%", "1.5°", "18/100"],
          answer: 0,
          topic: "Nominal & effective interest rates"
        },
        {
          type: "mc",
          text: "More frequent compounding of the same nominal rate means:",
          options: ["Less interest earned", "The same interest", "More interest earned", "The effective rate decreases"],
          answer: 2,
          topic: "Nominal & effective interest rates"
        }
      ]
    },
    {
      id: 902,
      chapter: 9,
      name: "Multi-stage investments with timelines",
      fullName: "Solving problems with changing interest rates and deposits/withdrawals using a timeline",
      lesson: {
        heading: "Multi-stage investments with timelines",
        sub: "Chapter 9 · Topic 3",
        body: `
          <p>Real investments often change rate part-way through, or have money added/withdrawn. CAPS explicitly recommends drawing a <strong>timeline</strong> to keep track of every stage.</p>

          <div class="def-box">
            <div class="def-box-title">📖 How to build a timeline</div>
            <p>
              1. Draw a horizontal line marked with every point in time something changes (deposit, withdrawal, rate change).<br>
              2. Grow the balance forward from one marked point to the next using the rate that applies <em>during that interval</em>.<br>
              3. At a withdrawal, subtract the amount at that exact point before continuing to grow the remainder.<br>
              4. At a deposit, add the amount at that exact point.<br>
              5. Never mix stages — each stage needs its own A = P(1 + i/n)^(nt) calculation with the correct P, i, n, t for that interval only.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Rate change plus a withdrawal</div>
            <p>R50 000 invested at 8% p.a. compounded quarterly for 18 months, then the rate changes to 6% p.a. compounded monthly. 2 years after the start, R10 000 is withdrawn. Find the value after 4 years.<br>
            Stage 1 (0 → 1.5 yr, 8% quarterly): A₁ = 50000(1.02)⁶ ≈ R56 308.12<br>
            Stage 2 (1.5 → 2 yr, 6% monthly, 6 months): A₂ = 56308.12(1.005)⁶ ≈ R58 018.05<br>
            Withdraw R10 000 at year 2: balance = 48 018.05<br>
            Stage 3 (2 → 4 yr, 6% monthly, 24 months): A₃ = 48018.05(1.005)²⁴ ≈ R54 152.71</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Keep at least 4-5 decimal places (or full calculator accuracy) at each intermediate stage — rounding early causes the final answer to drift.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Two-Stage Timeline Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Model an investment with one rate change (and optional withdrawal/deposit at the change point).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P (R)</div><input id="g11c9t3p" type="number" value="50000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rate 1 (% p.a.)</div><input id="g11c9t3r1" type="number" value="8" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periods/yr 1</div><input id="g11c9t3n1" type="number" value="4" min="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years stage 1</div><input id="g11c9t3t1" type="number" value="1.5" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Withdraw/Deposit (R, +/-)</div><input id="g11c9t3wd" type="number" value="0" style="width:110px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rate 2 (% p.a.)</div><input id="g11c9t3r2" type="number" value="6" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periods/yr 2</div><input id="g11c9t3n2" type="number" value="12" min="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years stage 2</div><input id="g11c9t3t2" type="number" value="2.5" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Run timeline</button>
            </div>
            <div id="g11c9t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const P=gv('g11c9t3p'),r1=gv('g11c9t3r1')/100,n1=gv('g11c9t3n1'),t1=gv('g11c9t3t1'),wd=gv('g11c9t3wd'),r2=gv('g11c9t3r2')/100,n2=gv('g11c9t3n2'),t2=gv('g11c9t3t2');
                const out=document.getElementById('g11c9t3Out');
                if([P,r1,n1,t1,wd,r2,n2,t2].some(isNaN)||P<=0||r1<=0||n1<=0||t1<=0||r2<=0||n2<=0||t2<=0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (withdrawal/deposit may be 0 or negative to deposit).</span>';return;}
                const A1=P*Math.pow(1+r1/n1,n1*t1);
                const afterWd=A1-wd;
                if(afterWd<0){out.innerHTML='<span style="color:#fca5a5;">Withdrawal exceeds the balance at that point.</span>';return;}
                const A2=afterWd*Math.pow(1+r2/n2,n2*t2);
                let html='<span style="color:rgba(221,225,240,0.50);">Stage 1: A₁ = '+R(P)+'(1 + '+(r1*100).toFixed(2)+'%/'+n1+')^('+n1+'×'+t1+') = '+R(A1)+'</span><br>';
                if(wd!==0) html+='<span style="color:rgba(221,225,240,0.50);">'+(wd>0?'Withdraw ':'Deposit ')+R(Math.abs(wd))+' → balance = '+R(afterWd)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Stage 2: A₂ = '+R(afterWd)+'(1 + '+(r2*100).toFixed(2)+'%/'+n2+')^('+n2+'×'+t2+')</span><br>';
                html+='<span style="color:#6ee7b7;">Final value = '+R(A2)+'</span>   <span style="color:#fcd34d;">Total time = '+(t1+t2)+' years</span>';
                out.innerHTML=html;
              }
              ['g11c9t3p','g11c9t3r1','g11c9t3n1','g11c9t3t1','g11c9t3wd','g11c9t3r2','g11c9t3n2','g11c9t3t2'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c9t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A timeline is most useful when an investment problem involves:",
          options: ["A single constant rate for the whole period", "A change in rate and/or a withdrawal or deposit partway through", "Only simple interest", "Only depreciation"],
          answer: 1,
          topic: "Multi-stage investments with timelines"
        },
        {
          type: "input",
          text: "R20 000 is invested at 10% p.a. compounded annually for 2 years, then the full amount grows at 8% p.a. compounded annually for 1 more year. Find the final value (to the nearest rand).",
          answer: "26136",
          topic: "Multi-stage investments with timelines"
        },
        {
          type: "mc",
          text: "R15 000 grows at 9% p.a. compounded monthly for 1 year, then R5 000 is withdrawn. The next stage's principal is:",
          options: ["The value after 1 year, minus R5 000", "R15 000 minus R5 000", "The value after 1 year, plus R5 000", "R5 000"],
          answer: 0,
          topic: "Multi-stage investments with timelines"
        },
        {
          type: "mc",
          text: "When rates change mid-investment, the correct approach is:",
          options: ["Use the average of the two rates for the whole period", "Calculate each stage separately with its own rate and compounding, then chain the results", "Use only the first rate", "Use only the final rate for all years"],
          answer: 1,
          topic: "Multi-stage investments with timelines"
        },
        {
          type: "input",
          text: "R8 000 is invested at 12% p.a. compounded quarterly for 6 months, then a further R2 000 is deposited. Find the balance immediately after the deposit (to the nearest rand).",
          answer: "10488",
          topic: "Multi-stage investments with timelines"
        }
      ]
    },
    {
      id: 903,
      chapter: 9,
      name: "Solving for n and i",
      fullName: "Finding the time period (n) or the interest rate (i) in compound growth and decay formulae",
      lesson: {
        heading: "Solving for the time period n and the rate i",
        sub: "Chapter 9 · Topic 4",
        body: `
          <p>Besides finding A, CAPS requires you to work backwards: given A, P and i, find n; or given A, P and n, find i. These use logarithms and roots respectively.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Solving for n (using logarithms)</div>
            <p>
              From <span class="math">A = P(1 + i)ⁿ</span>:<br>
              <span class="math">A/P = (1 + i)ⁿ</span><br>
              <span class="math">n = log(A/P) / log(1 + i)</span><br>
              Always round n <em>up</em> to the next full compounding period if the context requires a whole number of periods (e.g. "how many years until the investment reaches...").
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Solving for i (using roots)</div>
            <p>
              From <span class="math">A = P(1 + i)ⁿ</span>:<br>
              <span class="math">(1 + i) = (A/P)^(1/n)</span><br>
              <span class="math">i = (A/P)^(1/n) − 1</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve for n</div>
            <p>How many years for R10 000 to grow to R20 000 at 9% p.a. compounded annually?<br>
            2 = (1.09)ⁿ → n = log(2)/log(1.09) ≈ 8.04 years → after 9 full years (round up)</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve for i</div>
            <p>R5 000 grows to R7 000 in 4 years, compounded annually. Find i.<br>
            i = (7000/5000)^(1/4) − 1 = (1.4)^0.25 − 1 ≈ 0.0878 = 8.78% p.a.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>For depreciation (decay), the same log/root techniques apply to A = P(1 − i)ⁿ — just substitute (1 − i) in place of (1 + i).</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Solve for n or i Calculator</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g11c9t4nbtn" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Solve for n</button>
              <button id="g11c9t4ibtn" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Solve for i</button>
            </div>
            <div id="g11c9t4nP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P (R)</div><input id="g11c9t4np" type="number" value="10000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A (R)</div><input id="g11c9t4na" type="number" value="20000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">i (% p.a.)</div><input id="g11c9t4ni" type="number" value="9" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9t4nCalc" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve n</button>
            </div>
            <div id="g11c9t4iP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P (R)</div><input id="g11c9t4ip" type="number" value="5000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A (R)</div><input id="g11c9t4ia" type="number" value="7000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n (years)</div><input id="g11c9t4in" type="number" value="4" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9t4iCalc" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve i</button>
            </div>
            <div id="g11c9t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const nBtn=document.getElementById('g11c9t4nbtn'),iBtn=document.getElementById('g11c9t4ibtn');
              const nP=document.getElementById('g11c9t4nP'),iP=document.getElementById('g11c9t4iP');
              const out=document.getElementById('g11c9t4Out');
              function setMode(m){
                if(m==='n'){nP.style.display='flex';iP.style.display='none';nBtn.style.background='rgba(99,102,241,0.30)';nBtn.style.color='#a5b4fc';nBtn.style.borderColor='rgba(99,102,241,0.50)';iBtn.style.background='transparent';iBtn.style.color='rgba(221,225,240,0.50)';iBtn.style.borderColor='rgba(99,102,241,0.20)';}
                else{iP.style.display='flex';nP.style.display='none';iBtn.style.background='rgba(99,102,241,0.30)';iBtn.style.color='#a5b4fc';iBtn.style.borderColor='rgba(99,102,241,0.50)';nBtn.style.background='transparent';nBtn.style.color='rgba(221,225,240,0.50)';nBtn.style.borderColor='rgba(99,102,241,0.20)';}
                out.innerHTML='';
              }
              nBtn.addEventListener('click',()=>setMode('n'));
              iBtn.addEventListener('click',()=>setMode('i'));
              document.getElementById('g11c9t4nCalc').addEventListener('click',()=>{
                const P=gv('g11c9t4np'),A=gv('g11c9t4na'),i=gv('g11c9t4ni')/100;
                if([P,A,i].some(isNaN)||P<=0||A<=0||i<=0){out.innerHTML='<span style="color:#fca5a5;">Enter valid positive values.</span>';return;}
                const n=Math.log(A/P)/Math.log(1+i);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">A/P = '+(A/P).toFixed(4)+' = (1 + '+i.toFixed(4)+')ⁿ</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">n = log('+(A/P).toFixed(4)+') / log('+(1+i).toFixed(4)+')</span><br>'+
                  '<span style="color:#6ee7b7;">n ≈ '+n.toFixed(4)+' years</span>   <span style="color:#fcd34d;">Round up to '+Math.ceil(n)+' full years if a whole period is required</span>';
              });
              document.getElementById('g11c9t4iCalc').addEventListener('click',()=>{
                const P=gv('g11c9t4ip'),A=gv('g11c9t4ia'),n=gv('g11c9t4in');
                if([P,A,n].some(isNaN)||P<=0||A<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Enter valid positive values.</span>';return;}
                const i=Math.pow(A/P,1/n)-1;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">(1 + i) = (A/P)^(1/n) = ('+(A/P).toFixed(4)+')^(1/'+n+')</span><br>'+
                  '<span style="color:#6ee7b7;">i ≈ '+(i*100).toFixed(4)+'% p.a.</span>';
              });
              setMode('n');
              document.getElementById('g11c9t4nCalc').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "To solve A = P(1+i)ⁿ for n, you must use:",
          options: ["Logarithms", "Square roots only", "The quadratic formula", "Simple division"],
          answer: 0,
          topic: "Solving for n and i"
        },
        {
          type: "input",
          text: "How many years (to 2 decimal places) for R12 000 to grow to R18 000 at 7% p.a. compounded annually?",
          answer: "5.99",
          topic: "Solving for n and i"
        },
        {
          type: "mc",
          text: "To solve A = P(1+i)ⁿ for i, you must use:",
          options: ["A logarithm", "An nth root", "Long division", "Simultaneous equations"],
          answer: 1,
          topic: "Solving for n and i"
        },
        {
          type: "input",
          text: "R6 000 grows to R9 000 in 3 years compounded annually. Find i as a percentage (to 2 decimal places).",
          answer: "14.47",
          topic: "Solving for n and i"
        },
        {
          type: "mc",
          text: "An investment must reach at least R50 000 from R30 000 at 10% p.a. If n works out to 5.36 years, and interest is only credited at full-year intervals, the minimum whole number of years needed is:",
          options: ["5", "6", "5.36", "5.5"],
          answer: 1,
          topic: "Solving for n and i"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 9 Workbook — Finance, Growth and Decay",
    questions: [
      {
        number: 1,
        text: "A truck is bought for R450 000.",
        parts: [
          { label: "a", text: "Calculate the book value after 6 years using straight-line depreciation at 12% p.a.", marks: 3 },
          { label: "b", text: "Calculate the book value after 6 years using reducing-balance depreciation at 12% p.a.", marks: 3 },
          { label: "c", text: "After how many years will the straight-line value equal zero?", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Nomvula invests R20 000 for 5 years.",
        parts: [
          { label: "a", text: "Calculate the accumulated value at 9% p.a. compounded monthly.", marks: 3 },
          { label: "b", text: "Calculate the effective annual interest rate for 9% compounded monthly (to 4 decimal places as %).", marks: 3 },
          { label: "c", text: "Compare: would she earn more with 9.4% p.a. compounded annually?", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "R30 000 is invested at 8% p.a. compounded annually for 3 years, then the full amount is reinvested at 10% p.a. compounded semi-annually for 2 more years. Use a timeline.",
        parts: [
          { label: "a", text: "Draw the timeline and find the value after 3 years.", marks: 3 },
          { label: "b", text: "Find the final value after the full 5 years.", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "A=450000(1−0.12×6)=450000(0.28)=R126 000",
        b: "A=450000(0.88)⁶≈450000×0.4644≈R208 980",
        c: "1−0.12n=0 → n=1/0.12≈8.33 years (after 8⅓ years)"
      },
      2: {
        a: "A=20000(1+0.09/12)^60=20000(1.0075)^60≈20000×1.5657≈R31 314",
        b: "i_eff=(1.0075)^12−1≈0.09381=9.3807%",
        c: "9.4%>9.3807% → 9.4% annual gives slightly more"
      },
      3: {
        a: "A₃=30000(1.08)³≈30000×1.2597≈R37 791",
        b: "A₅=37791(1+0.10/2)⁴=37791(1.05)⁴≈37791×1.2155≈R45 953"
      }
    }
  }
});
