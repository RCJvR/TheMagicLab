// Math Magician — Grade 12, Chapter 3
// Finance — Annuities and Loan Calculations

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 300,
      chapter: 3,
      name: "Future value annuities",
      fullName: "Annuities, future value, and sinking funds",
      lesson: {
        heading: "Future value annuities",
        sub: "Chapter 3 · Topic 1",
        body: `
          <p>An <strong>annuity</strong> is a series of equal payments made at regular intervals. Grade 12 Finance uses geometric series to derive annuity formulae.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Future value annuity (savings)</div>
            <p>
              Regular payment x, made at the END of each period, at interest rate i per period, for n periods:<br><br>
              <span class="math">F = x · [(1+i)ⁿ − 1] / i</span><br><br>
              Use when: saving towards a goal (e.g. retirement fund, car fund)<br>
              F = future value (accumulated amount)<br>
              x = payment per period
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Retirement savings</div>
            <p>R2 000 per month for 20 years at 9% p.a. compounded monthly.<br>
            i = 0.09/12 = 0.0075; n = 240<br>
            <span class="math">F = 2000 · [(1.0075)²⁴⁰ − 1] / 0.0075</span><br>
            <span class="math">F = 2000 · [6.0092 − 1] / 0.0075</span><br>
            <span class="math">F = 2000 · 667.89 ≈ R1 335 780</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Finding x (the required payment)</div>
            <p>
              Rearrange for x: <span class="math">x = F · i / [(1+i)ⁿ − 1]</span><br><br>
              Used for <strong>sinking funds</strong>: saving to replace an asset.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Future Value Annuity Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">F = x·[(1+i)ⁿ−1]/i — find F (accumulated savings) or x (required payment).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g12c3fvF" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Find F</button>
              <button id="g12c3fvX" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Find x (payment)</button>
            </div>
            <div id="g12c3fvFP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Payment x (R)</div><input id="g12c3x" type="number" value="2000" min="1" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nom. rate %/yr</div><input id="g12c3r" type="number" value="9" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periods/yr</div><select id="g12c3np" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1">1 (Annual)</option><option value="2">2 (Semi-ann.)</option><option value="4">4 (Quarterly)</option><option value="12" selected>12 (Monthly)</option></select></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years</div><input id="g12c3t" type="number" value="20" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c3fvFBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate F</button>
            </div>
            <div id="g12c3fvXP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Target F (R)</div><input id="g12c3F" type="number" value="500000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nom. rate %/yr</div><input id="g12c3r2" type="number" value="8" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periods/yr</div><select id="g12c3np2" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1" selected>1 (Annual)</option><option value="2">2 (Semi-ann.)</option><option value="4">4 (Quarterly)</option><option value="12">12 (Monthly)</option></select></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years</div><input id="g12c3t2" type="number" value="6" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c3fvXBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find x</button>
            </div>
            <div id="g12c3fvOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gi(id){return parseInt(document.getElementById(id).value);}
              const out=document.getElementById('g12c3fvOut');
              const fBtn=document.getElementById('g12c3fvF'),xBtn=document.getElementById('g12c3fvX');
              const fP=document.getElementById('g12c3fvFP'),xP=document.getElementById('g12c3fvXP');
              function setMode(m){fP.style.display=m==='F'?'flex':'none';xP.style.display=m==='X'?'flex':'none';fBtn.style.background=m==='F'?'rgba(99,102,241,0.30)':'transparent';fBtn.style.color=m==='F'?'#a5b4fc':'rgba(221,225,240,0.50)';fBtn.style.borderColor=m==='F'?'rgba(99,102,241,0.50)':'rgba(99,102,241,0.20)';xBtn.style.background=m==='X'?'rgba(99,102,241,0.30)':'transparent';xBtn.style.color=m==='X'?'#a5b4fc':'rgba(221,225,240,0.50)';xBtn.style.borderColor=m==='X'?'rgba(99,102,241,0.50)':'rgba(99,102,241,0.20)';out.innerHTML='';}
              fBtn.addEventListener('click',()=>setMode('F')); xBtn.addEventListener('click',()=>setMode('X'));
              document.getElementById('g12c3fvFBtn').addEventListener('click',()=>{
                const x=gv('g12c3x'),r=gv('g12c3r')/100,np=gi('g12c3np'),t=gv('g12c3t');
                if([x,r,t].some(isNaN)||x<=0||r<=0||t<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                const i=r/np,n=np*t,F=x*(Math.pow(1+i,n)-1)/i;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">i = '+r*100+'%/'+np+' = '+(i*100).toFixed(4)+'% per period; n = '+np+'×'+t+' = '+n+' periods</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">F = '+R(x)+'·[(1+'+i.toFixed(6)+')^'+n+'−1]/'+i.toFixed(6)+'</span><br>'+
                  '<span style="color:#6ee7b7;">F = '+R(F)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Total contributed: '+R(x*n)+'   Interest earned: '+R(F-x*n)+'</span>';
              });
              document.getElementById('g12c3fvXBtn').addEventListener('click',()=>{
                const F=gv('g12c3F'),r=gv('g12c3r2')/100,np=gi('g12c3np2'),t=gv('g12c3t2');
                if([F,r,t].some(isNaN)||F<=0||r<=0||t<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                const i=r/np,n=np*t,x=F*i/(Math.pow(1+i,n)-1);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">x = F·i/[(1+i)ⁿ−1]; i = '+(i*100).toFixed(4)+'%; n = '+n+' periods</span><br>'+
                  '<span style="color:#6ee7b7;">Payment x = '+R(x)+' per period</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Total contributed: '+R(x*n)+'</span>';
              });
              setMode('F'); document.getElementById('g12c3fvFBtn').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "R1 000 per month for 5 years at 12% p.a. compounded monthly. Which is correct?", options: ["F = 1000[(1.01)⁶⁰−1]/0.01", "F = 1000[(1.12)⁵−1]/0.12", "F = 1000·60·0.01", "F = 1000(1.01)⁶⁰"], answer: 0, topic: "Future value annuities" },
        { type: "mc", text: "A sinking fund formula finds:", options: ["The future value", "The payment needed to reach a future value", "The interest rate", "The number of periods"], answer: 1, topic: "Future value annuities" },
        { type: "mc", text: "Payments at the END of each period is called:", options: ["Annuity due", "Ordinary annuity", "Perpetuity", "Deferred annuity"], answer: 1, topic: "Future value annuities" },
        { type: "input", text: "Using F = x[(1+i)ⁿ−1]/i with x=500, i=0.01, n=3: find F.", answer: "1515.05", altAnswers: ["1515"], topic: "Future value annuities" },
        { type: "mc", text: "To accumulate R100 000 in 10 years at 8% p.a. compounded annually, the annual payment x satisfies:", options: ["100000 = x[(1.08)¹⁰−1]/0.08", "x = 100000·0.08/[(1.08)¹⁰−1]", "Both A and B", "Neither"], answer: 2, topic: "Future value annuities" },
        { type: "input", text: "Sipho saves R1 500 at the end of each month for 8 years in an account earning 8.4% p.a. compounded monthly. Calculate the future value of his savings (nearest rand).", answer: "204337", altAnswers: ["204336", "204336.62"], topic: "Future value annuities" },
        { type: "input", text: "Monthly savings of R1 000 (end of month, 6% p.a. compounded monthly) are made towards a target of R80 000. What is the minimum number of months required?", answer: "68", topic: "Future value annuities" }
      ]
    },
    {
      id: 301,
      chapter: 3,
      name: "Present value annuities & loan repayments",
      fullName: "Present value annuities, loan repayments, and outstanding balances",
      lesson: {
        heading: "Present value annuities and loan repayments",
        sub: "Chapter 3 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Present value annuity (loans)</div>
            <p>
              The present value P of n equal payments of x at interest rate i per period:<br><br>
              <span class="math">P = x · [1 − (1+i)⁻ⁿ] / i</span><br><br>
              Use for: home loans, car finance, any loan with equal repayments.<br>
              Rearranged for payment: <span class="math">x = P · i / [1 − (1+i)⁻ⁿ]</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Car loan</div>
            <p>Car costs R250 000. 10% deposit. 60 monthly payments at 11% p.a. compounded monthly.<br>
            P = R225 000; i = 0.11/12 ≈ 0.009167; n = 60<br>
            <span class="math">x = 225000 · 0.009167 / [1 − (1.009167)⁻⁶⁰]</span><br>
            <span class="math">x ≈ 225000 · 0.009167 / 0.4225 ≈ R4 882 per month</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Outstanding balance</div>
            <p>
              The outstanding balance after k payments is the present value of the <em>remaining</em> (n − k) payments:<br>
              <span class="math">Balance_k = x · [1 − (1+i)⁻⁽ⁿ⁻ᵏ⁾] / i</span><br><br>
              Or: calculate using the future value method — carry the original loan forward and subtract the future value of payments made.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Loan Repayment Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">P = x·[1−(1+i)⁻ⁿ]/i — find monthly payment, then outstanding balance after k payments.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Loan P (R)</div><input id="g12c3lP" type="number" value="1440000" min="1" style="width:110px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nom. rate %/yr</div><input id="g12c3lr" type="number" value="10.5" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Term (years)</div><input id="g12c3lt" type="number" value="25" min="1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">After k payments</div><input id="g12c3lk" type="number" value="60" min="0" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c3lBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g12c3lOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const out=document.getElementById('g12c3lOut');
              document.getElementById('g12c3lBtn').addEventListener('click',()=>{
                const P=gv('g12c3lP'),r=gv('g12c3lr')/100,t=gv('g12c3lt'),k=gv('g12c3lk');
                if([P,r,t].some(isNaN)||P<=0||r<=0||t<=0){out.innerHTML='<span style="color:#fca5a5;">Enter valid loan details.</span>';return;}
                const i=r/12,n=12*t;
                const x=P*i/(1-Math.pow(1+i,-n));
                const remaining=n-k;
                const balance=remaining>0?x*(1-Math.pow(1+i,-remaining))/i:0;
                const totalPaid=x*n,totalInt=totalPaid-P;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">i = '+(i*100).toFixed(4)+'% per month; n = '+n+' months</span><br>'+
                  '<span style="color:#6ee7b7;">Monthly payment x = '+R(x)+'</span><br>'+
                  (k>0&&k<n?'<span style="color:#fcd34d;">Balance after '+k+' payments ('+remaining+' remaining): '+R(balance)+'</span><br>':'')+
                  '<span style="color:rgba(221,225,240,0.50);">Total repaid over full term: '+R(totalPaid)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Total interest paid: '+R(totalInt)+'</span>';
              });
              ['g12c3lP','g12c3lr','g12c3lt','g12c3lk'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g12c3lBtn').click();});});
              document.getElementById('g12c3lBtn').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Home loan R1 000 000 at 8.5% p.a. compounded monthly over 20 years. Monthly payment formula:", options: ["x = 1000000·(0.085/12)/[1−(1+0.085/12)⁻²⁴⁰]", "x = 1000000·0.085/20", "x = 1000000/240", "x = 1000000·0.085"], answer: 0, topic: "Present value annuities & loan repayments" },
        { type: "mc", text: "The present value formula is used to:", options: ["Find how much to save", "Find the loan amount that corresponds to given repayments", "Find the future value of savings", "Find compound interest"], answer: 1, topic: "Present value annuities & loan repayments" },
        { type: "mc", text: "After 5 years of a 20-year loan with monthly payments x, the outstanding balance uses:", options: ["n = 20 and k = 60", "n−k = 180 remaining payments", "x and the original principal only", "The future value formula"], answer: 1, topic: "Present value annuities & loan repayments" },
        { type: "input", text: "P = 10000, i = 0.01 per month, n = 12. Find x (monthly payment) to nearest rand. Use x = Pi/[1−(1.01)⁻¹²]. Answer ≈", answer: "889", topic: "Present value annuities & loan repayments" },
        { type: "mc", text: "Total interest paid on a loan = ", options: ["Principal × rate × time", "Total repayments − original loan amount", "Monthly payment × n", "Future value − present value"], answer: 1, topic: "Present value annuities & loan repayments" },
        { type: "input", text: "A loan of R450 000 is repaid with equal monthly instalments over 15 years at 12% p.a. compounded monthly. Calculate the outstanding balance immediately after the 100th payment (nearest rand).", answer: "296438", altAnswers: ["296437", "296437.82"], topic: "Present value annuities & loan repayments" },
        { type: "input", text: "A loan of R200 000 at 13% p.a. compounded monthly is repaid with monthly instalments of R3 000. Determine the minimum number of monthly payments required to settle the loan.", answer: "119", topic: "Present value annuities & loan repayments" }
      ]
    },
    {
      id: 302,
      chapter: 3,
      name: "Simple & compound growth vs decay",
      fullName: "Distinguishing simple growth/decay, compound growth/decay, and annuities",
      lesson: {
        heading: "Simple growth, compound growth, and decay",
        sub: "Chapter 3 · Topic 3",
        body: `
          <p>Before tackling annuities, Grade 12 revises and sharpens the distinction between <strong>simple</strong> and <strong>compound</strong> growth/decay — and clarifies how annuities differ from both (a single lump sum vs a stream of payments).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Simple growth/decay (linear)</div>
            <p>
              Interest is calculated on the <strong>original principal only</strong>, every period:<br>
              <span class="math">A = P(1 + i·n)</span> — growth<br>
              <span class="math">A = P(1 − i·n)</span> — decay<br>
              where P = principal, i = rate per period, n = number of periods.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Compound growth/decay (exponential)</div>
            <p>
              Interest is calculated on the <strong>accumulated amount</strong> (principal + previous interest):<br>
              <span class="math">A = P(1 + i)ⁿ</span> — growth (e.g. investments, population growth)<br>
              <span class="math">A = P(1 − i)ⁿ</span> — decay (e.g. depreciation, radioactive decay)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Annuities vs single-sum growth/decay</div>
            <p>
              Growth/decay formulae (A = P(1±i)ⁿ) apply to a <strong>single lump sum</strong> left to grow or shrink.<br>
              Annuity formulae (F and P from Topics 1–2) apply when there is a <strong>series of equal regular payments</strong> — the geometric series formula is what generates them.<br><br>
              Recognising which situation you're in is often the hardest part of a finance question.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Compound growth rate</div>
            <p>A town's population grows from 120 000 to 214 000 in 10 years. Find the annual compound growth rate.<br>
            <span class="math">214000 = 120000(1+i)¹⁰ → (1+i)¹⁰ = 1.7833</span><br>
            <span class="math">1+i = 1.7833^(1/10) ≈ 1.0596 → i ≈ 5.96% p.a.</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Straight-line depreciation</div>
            <p>A machine costing R80 000 depreciates by simple decay at 15% p.a. Book value after 4 years:<br>
            <span class="math">A = 80000(1 − 0.15×4) = 80000(0.4) = R32 000</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Simple vs Compound Comparison Tool</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Compare simple and compound growth/decay on the same principal, rate, and time.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Principal P (R)</div><input id="g12c3gP" type="number" value="80000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rate %/yr</div><input id="g12c3gi" type="number" value="15" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years</div><input id="g12c3gn" type="number" value="4" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Mode</div>
                <select id="g12c3gMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="growth">Growth</option><option value="decay">Decay</option>
                </select>
              </div>
              <button id="g12c3gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Compare</button>
            </div>
            <div id="g12c3gOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gs(id){return document.getElementById(id).value;}
              function calc(){
                const P=gv('g12c3gP'),i=gv('g12c3gi')/100,n=gv('g12c3gn'),mode=gs('g12c3gMode');
                const out=document.getElementById('g12c3gOut');
                if([P,i,n].some(isNaN)||P<=0||i<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                const sign=mode==='growth'?1:-1;
                const simple=P*(1+sign*i*n);
                const compound=P*Math.pow(1+sign*i,n);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Simple: A = P(1'+(sign>0?'+':'−')+'i·n) = '+R(P)+'(1'+(sign>0?'+':'−')+(i).toFixed(4)+'×'+n+')</span><br>'+
                  '<span style="color:#fcd34d;">Simple '+mode+': A = '+R(simple)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Compound: A = P(1'+(sign>0?'+':'−')+'i)ⁿ = '+R(P)+'(1'+(sign>0?'+':'−')+(i).toFixed(4)+')^'+n+'</span><br>'+
                  '<span style="color:#6ee7b7;">Compound '+mode+': A = '+R(compound)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.45);">Difference: '+R(Math.abs(compound-simple))+'</span>';
              }
              ['g12c3gP','g12c3gi','g12c3gn'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c3gMode').addEventListener('change',calc);
              document.getElementById('g12c3gBtn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Simple interest is calculated on:", options: ["The accumulated amount each period", "The original principal only", "The final amount only", "Nothing — it doesn't apply to money"], answer: 1, topic: "Simple & compound growth vs decay" },
        { type: "mc", text: "A car depreciates using compound decay. The formula is:", options: ["A = P(1 − in)", "A = P(1 − i)ⁿ", "A = P(1 + i)ⁿ", "A = Pin"], answer: 1, topic: "Simple & compound growth vs decay" },
        { type: "input", text: "R50 000 grows by simple interest at 8% p.a. for 3 years. Find A.", answer: "62000", topic: "Simple & compound growth vs decay" },
        { type: "mc", text: "A population grows from 50 000 to 65 000 in 5 years under compound growth. Which equation finds the rate i?", options: ["65000 = 50000(1+i)⁵", "65000 = 50000(1+5i)", "50000 = 65000(1+i)⁵", "i = (65000−50000)/5"], answer: 0, topic: "Simple & compound growth vs decay" },
        { type: "mc", text: "Annuity formulae differ from single-sum growth/decay formulae because annuities involve:", options: ["A once-off lump sum", "A series of equal regular payments", "No interest at all", "Only simple interest"], answer: 1, topic: "Simple & compound growth vs decay" },
        { type: "input", text: "Equipment worth R120 000 depreciates by compound decay at 20% p.a. Find its value after 2 years (nearest rand).", answer: "76800", topic: "Simple & compound growth vs decay" },
        { type: "input", text: "A car bought for R320 000 depreciates on a reducing-balance (compound decay) basis. After 5 years its book value is R140 000. Calculate the annual rate of depreciation, to 1 decimal place (%).", answer: "15.2", altAnswers: ["15,2"], topic: "Simple & compound growth vs decay" },
        { type: "input", text: "R25 000 is invested for 3 years at 9% p.a. simple interest, then the accumulated amount is reinvested for a further 4 years at 9% p.a. compound interest. Calculate the final value (nearest rand).", answer: "44818", altAnswers: ["44817", "44817.72"], topic: "Simple & compound growth vs decay" }
      ]
    },
    {
      id: 303,
      chapter: 3,
      name: "Comparing investment & loan options",
      fullName: "Critically analysing and comparing investment and loan options, including effective vs nominal rates",
      lesson: {
        heading: "Comparing investment and loan options",
        sub: "Chapter 3 · Topic 4",
        body: `
          <p>CAPS requires learners to <strong>critically analyse investment and loan options</strong> and make informed decisions — this means comparing rates fairly, not just picking the biggest-looking percentage.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Nominal vs effective interest rate</div>
            <p>
              A <strong>nominal</strong> rate is quoted per year but compounded more often (e.g. "9% p.a. compounded monthly").<br>
              The <strong>effective annual rate</strong> converts this to a true yearly equivalent for fair comparison:<br><br>
              <span class="math">i_eff = (1 + i_nom/m)^m − 1</span><br>
              where m = number of compounding periods per year.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Comparing two investments</div>
            <p>Investment A: 9% p.a. compounded monthly. Investment B: 9.2% p.a. compounded annually.<br>
            A: i_eff = (1 + 0.09/12)¹² − 1 ≈ 9.381%<br>
            B: i_eff = 9.2% (already annual)<br>
            Investment A is actually the better rate, despite B's headline rate looking higher!</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Points to weigh when comparing loans</div>
            <p>
              • Effective interest rate (not just the quoted nominal rate)<br>
              • Total amount repaid over the full term (small monthly savings can cost more overall if the term is longer)<br>
              • Fees and charges (initiation fees, admin fees) which add to the real cost<br>
              • Flexibility — early settlement, extra payments, repayment holidays<br>
              • For pyramid-type "investment" schemes: sustainable schemes pay returns from real profit; unsustainable ("pyramid") schemes pay early investors using new investors' money and inevitably collapse.
            </p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Exam tip</div>
            <p>Always convert competing rates to the same compounding basis (usually effective annual rate) before comparing — never compare a monthly-compounded nominal rate directly to an annually-compounded one.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Effective Annual Rate Comparator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter two nominal rates with their compounding frequency — see which gives the better effective annual rate.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Option A rate %</div><input id="g12c3eA" type="number" value="9" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A compounds/yr</div><select id="g12c3eAm" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1">1</option><option value="2">2</option><option value="4">4</option><option value="12" selected>12</option></select></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Option B rate %</div><input id="g12c3eB" type="number" value="9.2" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">B compounds/yr</div><select id="g12c3eBm" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1" selected>1</option><option value="2">2</option><option value="4">4</option><option value="12">12</option></select></div>
              <button id="g12c3eBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Compare</button>
            </div>
            <div id="g12c3eOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gi(id){return parseInt(document.getElementById(id).value);}
              function calc(){
                const rA=gv('g12c3eA')/100,mA=gi('g12c3eAm'),rB=gv('g12c3eB')/100,mB=gi('g12c3eBm');
                const out=document.getElementById('g12c3eOut');
                if([rA,rB].some(isNaN)||rA<=0||rB<=0){out.innerHTML='<span style="color:#fca5a5;">Enter valid rates.</span>';return;}
                const effA=(Math.pow(1+rA/mA,mA)-1)*100;
                const effB=(Math.pow(1+rB/mB,mB)-1)*100;
                const better=effA>effB?'A':(effB>effA?'B':'A and B are equal');
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Option A: i_eff = (1+'+(rA/mA).toFixed(6)+')^'+mA+' − 1 = '+effA.toFixed(4)+'%</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Option B: i_eff = (1+'+(rB/mB).toFixed(6)+')^'+mB+' − 1 = '+effB.toFixed(4)+'%</span><br>'+
                  '<span style="color:#6ee7b7;">Better effective rate: Option '+better+'</span>';
              }
              ['g12c3eA','g12c3eB'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              ['g12c3eAm','g12c3eBm'].forEach(id=>{document.getElementById(id).addEventListener('change',calc);});
              document.getElementById('g12c3eBtn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "The effective annual rate formula is:", options: ["i_eff = (1 + i_nom/m)^m − 1", "i_eff = i_nom × m", "i_eff = i_nom/m", "i_eff = m(1+i_nom)"], answer: 0, topic: "Comparing investment & loan options" },
        { type: "mc", text: "9% p.a. compounded monthly gives an effective annual rate of approximately:", options: ["9%", "9.38%", "9.75%", "10.2%"], answer: 1, topic: "Comparing investment & loan options" },
        { type: "mc", text: "Before comparing two investment rates fairly, you should first:", options: ["Multiply both by the term", "Convert both to the same effective annual rate", "Always choose the higher nominal rate", "Ignore compounding frequency"], answer: 1, topic: "Comparing investment & loan options" },
        { type: "mc", text: "A pyramid scheme is unsustainable because:", options: ["It pays no interest at all", "Returns are paid from new investors' money, not real profit", "It always uses compound interest", "It is illegal to advertise"], answer: 1, topic: "Comparing investment & loan options" },
        { type: "input", text: "Find the effective annual rate for 12% p.a. compounded quarterly, to 2 decimal places (%).", answer: "12.55", altAnswers: ["12,55"], topic: "Comparing investment & loan options" },
        { type: "mc", text: "Bank A offers 10.4% p.a. compounded quarterly. Bank B offers 10.3% p.a. compounded monthly. Which offers the better effective annual rate?", options: ["Bank A", "Bank B", "They are equal", "Cannot be determined without more information"], answer: 0, topic: "Comparing investment & loan options" },
        { type: "input", text: "Using the effective annual rate formula, calculate the effective annual rate for Bank A (10.4% p.a. compounded quarterly), to 2 decimal places (%).", answer: "10.81", altAnswers: ["10,81"], topic: "Comparing investment & loan options" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 3 Workbook — Finance",
    questions: [
      { number: 1, text: "Thabo saves R800 per month in an account earning 7.2% p.a. compounded monthly.", parts: [
        { label: "a", text: "How much will he have after 10 years?", marks: 3 },
        { label: "b", text: "How much has he contributed in total?", marks: 1 },
        { label: "c", text: "How much interest did he earn?", marks: 1 }
      ]},
      { number: 2, text: "A house costs R1 800 000. A 20% deposit is paid and the balance is financed over 25 years at 10.5% p.a. compounded monthly.", parts: [
        { label: "a", text: "Find the loan amount.", marks: 1 },
        { label: "b", text: "Find the monthly repayment.", marks: 3 },
        { label: "c", text: "Find the outstanding balance after 5 years (60 payments).", marks: 4 },
        { label: "d", text: "Find the total interest paid over the full 25 years.", marks: 2 }
      ]},
      { number: 3, text: "A company needs to replace machinery costing R500 000 in 6 years. They set up a sinking fund paying equal annual amounts at 8% p.a. compounded annually.", parts: [
        { label: "a", text: "Find the annual payment required.", marks: 3 },
        { label: "b", text: "How much less would be needed if the interest rate were 10%?", marks: 3 }
      ]},
      { number: 4, text: "The value of an investment, recorded at the end of each year, is shown in the table below:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Year (n)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Value (R)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10 000.00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10 800.00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>11 664.00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>12 597.12</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>13 604.89</td></tr></table>", parts: [
        { label: "a", text: "Using two consecutive values from the table, determine the annual compound growth rate.", marks: 2 },
        { label: "b", text: "Write down the value of the initial investment (at year 0).", marks: 1 },
        { label: "c", text: "Hence write the general formula for the value after n years, in the form A = P(1+i)ⁿ.", marks: 2 },
        { label: "d", text: "Use your formula to predict the value at the end of year 8 (nearest rand).", marks: 2 }
      ]}
    ],
    answers: {
      1: { a: "F=800·[(1.006)¹²⁰−1]/0.006≈800·173.08≈R138 464", b: "800×120=R96 000", c: "138464−96000=R42 464" },
      2: { a: "Loan=0.8×1800000=R1 440 000", b: "i=0.105/12=0.00875; n=300; x=1440000×0.00875/[1−(1.00875)⁻³⁰⁰]≈R13 786/month", c: "Balance=13786·[1−(1.00875)⁻²⁴⁰]/0.00875≈R1 345 000", d: "Total paid=13786×300=R4 135 800; Interest=4135800−1440000≈R2 695 800" },
      3: { a: "x=500000×0.08/[(1.08)⁶−1]=500000×0.08/0.5869≈R68 138", b: "x at 10%: 500000×0.10/[(1.10)⁶−1]=500000×0.10/0.7716≈R64 802; saves R68138−R64802=R3 336" },
      4: { a: "i = 10800/10000 − 1 = 0.08, confirmed with 11664/10800 − 1 = 0.08 → i = 8% p.a.", b: "P = R10 000 (the value at n = 0)", c: "A = 10000(1.08)ⁿ", d: "A = 10000(1.08)⁸ ≈ R18 509.30" }
    }
  }
});
