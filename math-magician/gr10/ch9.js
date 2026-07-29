// Math Magician — Grade 10, Chapter 9
// Finance and Growth

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 900,
      chapter: 9,
      name: "Simple & compound interest",
      fullName: "Simple interest, compound interest, and growth calculations",
      lesson: {
        heading: "Simple and compound interest",
        sub: "Chapter 9 · Topic 1",
        body: `
          <p>Financial mathematics introduces the concept of <strong>interest</strong> — money earned on an investment or paid on a loan.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Simple interest</div>
            <p>Interest is calculated only on the <strong>original principal</strong> each year.<br>
            <span class="math">A = P(1 + in)</span><br>
            where: P = principal, i = annual interest rate (decimal), n = time in years, A = accumulated amount</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Compound interest</div>
            <p>Interest is calculated on the <strong>balance including previous interest</strong> (interest on interest).<br>
            <span class="math">A = P(1 + i)ⁿ</span><br>
            Compound interest always gives a <em>higher</em> accumulated amount than simple interest (over the same period).</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Compare simple vs compound</div>
            <p>R5 000 invested at 8% p.a. for 3 years:<br><br>
            <strong>Simple:</strong> <span class="math">A = 5000(1 + 0.08 × 3) = 5000(1.24) = R6 200</span><br>
            <strong>Compound:</strong> <span class="math">A = 5000(1.08)³ = 5000 × 1.2597 ≈ R6 298.56</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Finding P, i, or n</div>
            <p>
              Rearrange <span class="math">A = P(1 + i)ⁿ</span>:<br>
              <span class="math">P = A/(1+i)ⁿ</span> (present value)<br>
              <span class="math">i = (A/P)^(1/n) − 1</span> (interest rate)
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Interest Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Compare <strong>simple</strong> vs <strong>compound</strong> interest — enter P, rate, and years.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Principal (R)</div><input id="g10c9p" type="number" value="5000" style="width:95px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rate (%)</div><input id="g10c9i" type="number" value="8" step="0.1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years</div><input id="g10c9n" type="number" value="3" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c9Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c9Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function rand(n){return 'R '+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
              function run(){
                const P=parseFloat(document.getElementById('g10c9p').value);
                const i=parseFloat(document.getElementById('g10c9i').value)/100;
                const n=parseFloat(document.getElementById('g10c9n').value);
                const out=document.getElementById('g10c9Out');
                if([P,i,n].some(isNaN)||P<=0||i<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                const As=P*(1+i*n);
                const Ac=P*Math.pow(1+i,n);
                const diff=Ac-As;
                let html='<span style="color:rgba(221,225,240,0.50);">Simple: A = P(1 + in) = '+P+'(1 + '+i+'×'+n+') = </span><span style="color:#fcd34d;">'+rand(As)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Compound: A = P(1+i)ⁿ = '+P+'(1+'+i+')^'+n+' = </span><span style="color:#6ee7b7;">'+rand(Ac)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Interest earned (compound): </span><span style="color:#fcd34d;">'+rand(Ac-P)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Compound earns </span><span style="color:#6ee7b7;">'+rand(diff)+' more</span><span style="color:rgba(221,225,240,0.50);"> than simple over '+n+' year'+(n!==1?'s':'')+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c9Btn').addEventListener('click',run);
              ['g10c9p','g10c9i','g10c9n'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Compound interest always beats simple interest (for the same P, i, n > 1). The longer the period, the bigger the gap — this is the power of exponential growth.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "R8 000 invested at 6% simple interest for 4 years. Find A:",
          options: ["R9 920", "R10 099", "R9 320", "R10 000"],
          answer: 0,
          topic: "Simple & compound interest"
        },
        {
          type: "input",
          text: "R10 000 at 5% compound interest for 2 years. Find A (to the nearest rand).",
          answer: "11025",
          topic: "Simple & compound interest"
        },
        {
          type: "mc",
          text: "Which earns more after 5 years: 10% simple or 10% compound?",
          options: ["Simple", "Compound", "Same", "Depends on principal"],
          answer: 1,
          topic: "Simple & compound interest"
        },
        {
          type: "mc",
          text: "A = R15 000, i = 8% compound, n = 3. Find P (to nearest rand):",
          options: ["R11 907", "R12 500", "R11 250", "R13 000"],
          answer: 0,
          topic: "Simple & compound interest"
        },
        {
          type: "input",
          text: "R6 000 grows to R7 500 with simple interest over 5 years. Find i (as a %).",
          answer: "5",
          topic: "Simple & compound interest"
        },
        {
          type: "input",
          text: "R12 000 is invested and grows to R16 325.87 after 4 years of compound interest. Find the annual interest rate (as a %).",
          answer: "8",
          topic: "Simple & compound interest"
        }
      ]
    },
    {
      id: 901,
      chapter: 9,
      name: "Exchange rates & hire purchase",
      fullName: "Foreign exchange rates and hire purchase (HP) agreements",
      lesson: {
        heading: "Exchange rates and hire purchase",
        sub: "Chapter 9 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Exchange rates</div>
            <p>An <strong>exchange rate</strong> gives the value of one currency in terms of another.<br>
            Example: R18.50 = $1 (1 US dollar = 18.50 South African rand)<br><br>
            To convert:<br>
            Rand → Dollar: divide by rate<br>
            Dollar → Rand: multiply by rate</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Currency conversion</div>
            <p>Rate: £1 = R21.20<br>
            Convert R5 300 to pounds: <span class="math">5300 ÷ 21.20 = £250</span><br>
            Convert £180 to rand: <span class="math">180 × 21.20 = R3 816</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Hire purchase (HP)</div>
            <p>Buying on credit with a deposit and monthly instalments. Simple interest is applied to the <em>full loan amount</em> (not reducing balance), making HP expensive.<br><br>
            Steps:<br>
            1. Loan = cash price − deposit<br>
            2. Total interest = Loan × i × n<br>
            3. Total repayment = Loan + interest<br>
            4. Monthly instalment = Total repayment ÷ number of months</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: HP calculation</div>
            <p>TV costs R9 000. Deposit = R900. HP at 15% p.a. simple interest over 2 years.<br>
            Loan = R8 100<br>
            Interest = 8100 × 0.15 × 2 = R2 430<br>
            Total = R10 530<br>
            Monthly = R10 530 ÷ 24 = R438.75</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 HP &amp; Currency Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Switch between <strong>Hire Purchase</strong> and <strong>Currency Conversion</strong>.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g10c9t2hp" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Hire Purchase</button>
              <button id="g10c9t2cx" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Currency</button>
            </div>
            <div id="g10c9t2hpPanel">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Cash price (R)</div><input id="g10c9t2price" type="number" value="9000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Deposit (R)</div><input id="g10c9t2dep" type="number" value="900" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rate (% p.a.)</div><input id="g10c9t2rate" type="number" value="15" step="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years</div><input id="g10c9t2yrs" type="number" value="2" min="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c9t2hpBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
              </div>
            </div>
            <div id="g10c9t2cxPanel" style="display:none;">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Amount</div><input id="g10c9t2amt" type="number" value="5300" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Direction</div>
                  <select id="g10c9t2dir" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                    <option value="to_foreign">Rand → Foreign</option>
                    <option value="to_rand">Foreign → Rand</option>
                  </select></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Exchange rate (R per 1 unit)</div><input id="g10c9t2exr" type="number" value="21.20" step="0.01" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c9t2cxBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Convert</button>
              </div>
            </div>
            <div id="g10c9t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R '+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
              function calcHP(){
                const price=parseFloat(document.getElementById('g10c9t2price').value);
                const dep=parseFloat(document.getElementById('g10c9t2dep').value);
                const rate=parseFloat(document.getElementById('g10c9t2rate').value)/100;
                const yrs=parseFloat(document.getElementById('g10c9t2yrs').value);
                const out=document.getElementById('g10c9t2Out');
                if([price,dep,rate,yrs].some(isNaN)||price<=0||dep<0||dep>=price||rate<=0||yrs<=0){out.innerHTML='<span style="color:#fca5a5;">Check values — deposit must be less than price.</span>';return;}
                const loan=price-dep;
                const interest=loan*rate*yrs;
                const total=loan+interest;
                const monthly=total/(yrs*12);
                let html='<span style="color:rgba(221,225,240,0.50);">Loan = price − deposit = '+R(price)+' − '+R(dep)+' = </span><span style="color:#fcd34d;">'+R(loan)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Total interest = '+R(loan)+' × '+rate+' × '+yrs+' = </span><span style="color:#fcd34d;">'+R(interest)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Total repayment = '+R(loan)+' + '+R(interest)+' = </span><span style="color:#fcd34d;">'+R(total)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Monthly instalment = '+R(total)+' ÷ '+(yrs*12)+' = '+R(monthly)+'</span>';
                out.innerHTML=html;
              }
              function calcCX(){
                const amt=parseFloat(document.getElementById('g10c9t2amt').value);
                const dir=document.getElementById('g10c9t2dir').value;
                const exr=parseFloat(document.getElementById('g10c9t2exr').value);
                const out=document.getElementById('g10c9t2Out');
                if(isNaN(amt)||isNaN(exr)||amt<=0||exr<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                if(dir==='to_foreign'){
                  const res=amt/exr;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+R(amt)+' ÷ '+exr+' (rate) = </span><span style="color:#6ee7b7;">'+res.toFixed(2)+' foreign currency units</span>';
                } else {
                  const res=amt*exr;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+amt.toFixed(2)+' × '+exr+' (rate) = </span><span style="color:#6ee7b7;">'+R(res)+'</span>';
                }
              }
              let mode='hp';
              document.getElementById('g10c9t2hp').addEventListener('click',()=>{
                mode='hp';
                document.getElementById('g10c9t2hpPanel').style.display='';
                document.getElementById('g10c9t2cxPanel').style.display='none';
                document.getElementById('g10c9t2hp').style.background='linear-gradient(135deg,#4338ca,#6366f1)';
                document.getElementById('g10c9t2hp').style.color='#fff';
                document.getElementById('g10c9t2hp').style.border='none';
                document.getElementById('g10c9t2cx').style.background='rgba(99,102,241,0.15)';
                document.getElementById('g10c9t2cx').style.color='#a5b4fc';
                document.getElementById('g10c9t2cx').style.border='1px solid rgba(99,102,241,0.30)';
                document.getElementById('g10c9t2Out').innerHTML=''; calcHP();
              });
              document.getElementById('g10c9t2cx').addEventListener('click',()=>{
                mode='cx';
                document.getElementById('g10c9t2hpPanel').style.display='none';
                document.getElementById('g10c9t2cxPanel').style.display='';
                document.getElementById('g10c9t2cx').style.background='linear-gradient(135deg,#4338ca,#6366f1)';
                document.getElementById('g10c9t2cx').style.color='#fff';
                document.getElementById('g10c9t2cx').style.border='none';
                document.getElementById('g10c9t2hp').style.background='rgba(99,102,241,0.15)';
                document.getElementById('g10c9t2hp').style.color='#a5b4fc';
                document.getElementById('g10c9t2hp').style.border='1px solid rgba(99,102,241,0.30)';
                document.getElementById('g10c9t2Out').innerHTML=''; calcCX();
              });
              document.getElementById('g10c9t2hpBtn').addEventListener('click',calcHP);
              document.getElementById('g10c9t2cxBtn').addEventListener('click',calcCX);
              ['g10c9t2price','g10c9t2dep','g10c9t2rate','g10c9t2yrs'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calcHP();}));
              ['g10c9t2amt','g10c9t2exr'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calcCX();}));
              calcHP();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>HP interest is calculated on the <strong>full original loan</strong> — not on the reducing balance. This makes HP significantly more expensive than a reducing-balance loan at the same rate.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "If $1 = R17.50, how many dollars does R3 500 buy?",
          options: ["$200", "$61 250", "$2 000", "$20"],
          answer: 0,
          topic: "Exchange rates & hire purchase"
        },
        {
          type: "input",
          text: "€1 = R19.80. Convert €250 to rand.",
          answer: "4950",
          topic: "Exchange rates & hire purchase"
        },
        {
          type: "mc",
          text: "Laptop costs R12 000. Deposit 10%. HP at 18% p.a. for 3 years. Monthly instalment:",
          options: ["R462", "R445", "R540", "R416"],
          answer: 0,
          topic: "Exchange rates & hire purchase"
        },
        {
          type: "mc",
          text: "You pay R350/month for 24 months with a R500 deposit for a R7 500 item. Total interest paid:",
          options: ["R1 400", "R900", "R8 400", "R8 900"],
          answer: 0,
          topic: "Exchange rates & hire purchase"
        },
        {
          type: "input",
          text: "If ¥1 = R0.12, convert R6 000 to yen.",
          answer: "50000",
          topic: "Exchange rates & hire purchase"
        },
        {
          type: "input",
          text: "A textbook costs £45 in the UK. The same book costs R950 in South Africa. Given £1 = R19.50, calculate how much cheaper (in rand) it is to buy the book in the UK.",
          answer: "72.50",
          altAnswers: ["72.5", "R72.50"],
          topic: "Exchange rates & hire purchase"
        }
      ]
    },
    {
      id: 902,
      chapter: 9,
      name: "Inflation & population growth",
      fullName: "Applying compound growth to inflation and population problems",
      lesson: {
        heading: "Inflation and population growth",
        sub: "Chapter 9 · Topic 3",
        body: `
          <p>Inflation and population growth are real-life applications of the <strong>compound growth formula</strong> — a quantity grows by a fixed percentage each period.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Growth formula for inflation/population</div>
            <p>
              <span class="math">A = P(1 + i)ⁿ</span><br>
              where P = current price/population, i = annual inflation/growth rate, n = number of years, A = future price/population.<br><br>
              The same formula also works <strong>backwards in time</strong> to find a past price: <span class="math">P = A(1 + i)⁻ⁿ</span> if A is the value now and you want the value n years ago.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Future price</div>
            <p>Bread costs R16.50 today. Inflation is 6% p.a. Find the price in 4 years.<br>
            <span class="math">A = 16.50(1.06)⁴ ≈ 16.50 × 1.2625 ≈ R20.83</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Past price</div>
            <p>A car costs R320 000 today. Inflation has averaged 7% p.a. over the last 5 years. Find its approximate price 5 years ago.<br>
            <span class="math">P = 320000 ÷ (1.07)⁵ ≈ 320000 ÷ 1.4026 ≈ R228 148</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Population growth</div>
            <p>A town has 12 000 residents, growing at 3.2% p.a. Estimate the population in 6 years.<br>
            <span class="math">A = 12000(1.032)⁶ ≈ 12000 × 1.2098 ≈ 14 518</span> residents</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Inflation & Growth Time-Travel Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a current value, a growth rate, and a number of years — project forward or backward in time.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Value now</div><input id="g10c9ipv" type="number" value="16.50" step="0.01" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rate (% p.a.)</div><input id="g10c9ii" type="number" value="6" step="0.1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years</div><input id="g10c9in" type="number" value="4" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Direction</div>
                <select id="g10c9idir" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="fwd">Project forward (future value)</option>
                  <option value="back">Project backward (past value)</option>
                </select>
              </div>
              <button id="g10c9iBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c9iOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function rand(n){return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
              function run(){
                const P=parseFloat(document.getElementById('g10c9ipv').value);
                const i=parseFloat(document.getElementById('g10c9ii').value)/100;
                const n=parseFloat(document.getElementById('g10c9in').value);
                const dir=document.getElementById('g10c9idir').value;
                const out=document.getElementById('g10c9iOut');
                if([P,i,n].some(isNaN)||P<=0||i<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                let html='';
                if(dir==='fwd'){
                  const A=P*Math.pow(1+i,n);
                  html+='<span style="color:rgba(221,225,240,0.50);">A = P(1+i)ⁿ = '+P+'(1+'+i+')^'+n+' = </span><span style="color:#6ee7b7;">'+rand(A)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">In '+n+' year'+(n!==1?'s':'')+', the value grows from '+rand(P)+' to '+rand(A)+'</span>';
                } else {
                  const P0=P/Math.pow(1+i,n);
                  html+='<span style="color:rgba(221,225,240,0.50);">P = A(1+i)⁻ⁿ = '+P+' ÷ (1+'+i+')^'+n+' = </span><span style="color:#6ee7b7;">'+rand(P0)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">'+n+' year'+(n!==1?'s':'')+' ago, the estimated value was '+rand(P0)+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c9iBtn').addEventListener('click',run);
              document.getElementById('g10c9idir').addEventListener('change',run);
              ['g10c9ipv','g10c9ii','g10c9in'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>"How much did it cost n years ago" always means dividing by (1+i)ⁿ, not multiplying — you're undoing n years of growth.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A loaf of bread costs R14. Inflation is 5% p.a. Its price in 3 years will be closest to:",
          options: ["R16.21", "R21.00", "R14.75", "R15.75"],
          answer: 0,
          topic: "Inflation & population growth"
        },
        {
          type: "input",
          text: "A town's population is 8 000, growing at 4% p.a. Estimate the population after 2 years (round to nearest whole number).",
          answer: "8653",
          topic: "Inflation & population growth"
        },
        {
          type: "mc",
          text: "A car is worth R210 000 today. Inflation has averaged 6% p.a. for the past 3 years. Its approximate price 3 years ago was:",
          options: ["R176 358", "R250 133", "R198 000", "R211 800"],
          answer: 0,
          topic: "Inflation & population growth"
        },
        {
          type: "mc",
          text: "Which formula estimates a value n years IN THE PAST, given today's value A?",
          options: ["P = A(1+i)ⁿ", "P = A(1+i)⁻ⁿ", "P = A(1−i)ⁿ", "P = A × i × n"],
          answer: 1,
          topic: "Inflation & population growth"
        },
        {
          type: "input",
          text: "A city has 50 000 people and grows at 2.5% p.a. Find the population after 5 years (nearest whole number).",
          answer: "56591",
          topic: "Inflation & population growth"
        },
        {
          type: "input",
          text: "A town's population was 15 000 four years ago and grew at a constant annual rate to reach 16 882,63 today. Find the annual growth rate (as a %).",
          answer: "3",
          topic: "Inflation & population growth"
        }
      ]
    },
    {
      id: 903,
      chapter: 9,
      name: "Solving for rate or time period",
      fullName: "Rearranging the compound growth formula to solve for i or n",
      lesson: {
        heading: "Solving for the rate or the time period",
        sub: "Chapter 9 · Topic 4",
        body: `
          <p>Sometimes A, P, and one of i or n are given, and you must solve for the <strong>missing rate</strong> or <strong>missing number of years</strong>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Solving for the rate i</div>
            <p>
              From <span class="math">A = P(1+i)ⁿ</span>:<br>
              <span class="math">(A/P) = (1+i)ⁿ</span><br>
              <span class="math">(A/P)^(1/n) = 1+i</span><br>
              <span class="math">i = (A/P)^(1/n) − 1</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Solving for the time period n (Grade 10 method)</div>
            <p>
              At Grade 10 level (before logarithms are formally covered), n is usually found by <strong>trial and error / systematic guessing</strong>, or by using the calculator to test values of n until <span class="math">P(1+i)ⁿ</span> matches A closely.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Finding i</div>
            <p>R8 000 grows to R10 368.30 in 3 years, compounded annually. Find i.<br>
            <span class="math">i = (10368.30/8000)^(1/3) − 1 = (1.29604)^(1/3) − 1 ≈ 1.09 − 1 = 0.09 = 9%</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Finding n by trial</div>
            <p>How many years for R5 000 to grow to at least R7 000 at 8% p.a. compound interest?<br>
            n=4: 5000(1.08)⁴ ≈ R6 802.44 (not enough)<br>
            n=5: 5000(1.08)⁵ ≈ R7 346.64 (enough) → n = 5 years</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Solve for Rate or Time</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Choose what to solve for — enter the remaining known values.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g10c9srRate" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Solve for rate (i)</button>
              <button id="g10c9srTime" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Solve for time (n)</button>
            </div>
            <div id="g10c9srRatePanel">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P</div><input id="g10c9srP1" type="number" value="8000" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A</div><input id="g10c9srA1" type="number" value="10368.30" step="0.01" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Years n</div><input id="g10c9srN1" type="number" value="3" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <button id="g10c9srBtn1" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
              </div>
            </div>
            <div id="g10c9srTimePanel" style="display:none;">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P</div><input id="g10c9srP2" type="number" value="5000" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Target A</div><input id="g10c9srA2" type="number" value="7000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rate (%)</div><input id="g10c9srI2" type="number" value="8" step="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <button id="g10c9srBtn2" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find n by trial</button>
              </div>
            </div>
            <div id="g10c9srOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function rand(n){return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
              function setMode(m){
                document.getElementById('g10c9srRatePanel').style.display=m==='rate'?'':'none';
                document.getElementById('g10c9srTimePanel').style.display=m==='time'?'':'none';
                const rb=document.getElementById('g10c9srRate'),tb=document.getElementById('g10c9srTime');
                if(m==='rate'){rb.style.background='linear-gradient(135deg,#4338ca,#6366f1)';rb.style.color='#fff';rb.style.border='none';tb.style.background='rgba(99,102,241,0.15)';tb.style.color='#a5b4fc';tb.style.border='1px solid rgba(99,102,241,0.30)';}
                else{tb.style.background='linear-gradient(135deg,#4338ca,#6366f1)';tb.style.color='#fff';tb.style.border='none';rb.style.background='rgba(99,102,241,0.15)';rb.style.color='#a5b4fc';rb.style.border='1px solid rgba(99,102,241,0.30)';}
                document.getElementById('g10c9srOut').innerHTML='';
              }
              function solveRate(){
                const P=parseFloat(document.getElementById('g10c9srP1').value);
                const A=parseFloat(document.getElementById('g10c9srA1').value);
                const n=parseFloat(document.getElementById('g10c9srN1').value);
                const out=document.getElementById('g10c9srOut');
                if([P,A,n].some(isNaN)||P<=0||A<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                const i=Math.pow(A/P,1/n)-1;
                let html='<span style="color:rgba(221,225,240,0.50);">i = (A/P)^(1/n) − 1 = ('+rand(A)+'/'+rand(P)+')^(1/'+n+') − 1</span><br>';
                html+='<span style="color:#6ee7b7;">i ≈ '+(i*100).toFixed(2)+'% per annum</span>';
                out.innerHTML=html;
              }
              function solveTime(){
                const P=parseFloat(document.getElementById('g10c9srP2').value);
                const target=parseFloat(document.getElementById('g10c9srA2').value);
                const i=parseFloat(document.getElementById('g10c9srI2').value)/100;
                const out=document.getElementById('g10c9srOut');
                if([P,target,i].some(isNaN)||P<=0||target<=P||i<=0){out.innerHTML='<span style="color:#fca5a5;">Target A must be greater than P, and all values positive.</span>';return;}
                let html='';
                let n=0,A=P;
                while(A<target&&n<200){n++;A=P*Math.pow(1+i,n);html+='<span style="color:rgba(221,225,240,0.50);">n='+n+': '+rand(P)+'×(1+'+i+')^'+n+' = </span><span style="color:'+(A>=target?'#6ee7b7':'rgba(221,225,240,0.5)')+'">'+rand(A)+'</span><br>';}
                html+='<span style="color:#6ee7b7;">Smallest whole number of years needed: n = '+n+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c9srRate').addEventListener('click',()=>setMode('rate'));
              document.getElementById('g10c9srTime').addEventListener('click',()=>setMode('time'));
              document.getElementById('g10c9srBtn1').addEventListener('click',solveRate);
              document.getElementById('g10c9srBtn2').addEventListener('click',solveTime);
              ['g10c9srP1','g10c9srA1','g10c9srN1'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')solveRate();}));
              ['g10c9srP2','g10c9srA2','g10c9srI2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')solveTime();}));
              setMode('rate');
              solveRate();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Solving for n by trial and error is a legitimate Grade 10 method — logarithms are only formally introduced in Grade 12. Just test whole-number values of n systematically.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "R6 000 grows to R7 986 in 4 years, compounded annually. The rate i is closest to:",
          options: ["7.4%", "10%", "5%", "8.3%"],
          answer: 0,
          topic: "Solving for rate or time period"
        },
        {
          type: "input",
          text: "R10 000 grows to R12 100 in 2 years compound interest. Find i (as a %).",
          answer: "10",
          topic: "Solving for rate or time period"
        },
        {
          type: "mc",
          text: "At Grade 10 level, the time period n in A = P(1+i)ⁿ is typically found by:",
          options: ["Using logarithms directly", "Trial and error with whole-number guesses", "Dividing A by P", "It cannot be found"],
          answer: 1,
          topic: "Solving for rate or time period"
        },
        {
          type: "mc",
          text: "How many years (smallest whole number) for R4 000 to at least double at 15% p.a. compound interest?",
          options: ["4", "5", "6", "7"],
          answer: 1,
          topic: "Solving for rate or time period"
        },
        {
          type: "input",
          text: "R15 000 grows to R19 998.15 in 3 years. Find i (as a %, to 1 decimal place).",
          answer: "10.0",
          altAnswers: ["10", "10,0"],
          topic: "Solving for rate or time period"
        },
        {
          type: "input",
          text: "Find the number of years (smallest whole number) it takes for R9 000 to grow to at least R13 500 at 9% p.a. compound interest.",
          answer: "5",
          topic: "Solving for rate or time period"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 9 Workbook — Finance and Growth",
    questions: [
      {
        number: 1,
        text: "Simphiwe invests R15 000 at 7.5% per annum.",
        parts: [
          { label: "a", text: "Calculate the amount after 5 years using simple interest.", marks: 3 },
          { label: "b", text: "Calculate the amount after 5 years using compound interest.", marks: 3 },
          { label: "c", text: "How much more does compound interest earn?", marks: 1 }
        ]
      },
      {
        number: 2,
        text: "Lerato wants R50 000 in 4 years. How much must she invest today at 9% compound interest per annum?",
        parts: [
          { label: "a", text: "Write the formula and substitute values.", marks: 2 },
          { label: "b", text: "Calculate P (to the nearest rand).", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "A washing machine costs R8 500. Johan pays a 15% deposit and the balance on HP at 20% p.a. simple interest over 2 years.",
        parts: [
          { label: "a", text: "Calculate the deposit.", marks: 1 },
          { label: "b", text: "Calculate the loan amount.", marks: 1 },
          { label: "c", text: "Calculate the total interest charged.", marks: 2 },
          { label: "d", text: "Calculate the monthly instalment.", marks: 2 }
        ]
      },
      {
        number: 4,
        text: "The exchange rate is R1 = A$0.085 (Australian dollar).",
        parts: [
          { label: "a", text: "Convert R25 000 to Australian dollars.", marks: 2 },
          { label: "b", text: "A product costs A$340. What is the rand price?", marks: 2 }
        ]
      },
      {
        number: 5,
        text: "An investment of R8 000 grows over time as shown in the table below:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Year (n)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Amount (R)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>8 000,00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>8 640,00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>9 331,20</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10 077,70</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10 883,91</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>11 754,62</td></tr></table>",
        parts: [
          { label: "a", text: "Using two consecutive values from the table, show that the growth is compound and determine the annual interest rate.", marks: 3 },
          { label: "b", text: "Use the rate found in (a) to calculate the amount after 6 years (not shown in the table).", marks: 2 },
          { label: "c", text: "In which year (n) does the investment first exceed R11 000?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "A = 15000(1 + 0.075×5) = 15000(1.375) = R20 625",
        b: "A = 15000(1.075)⁵ = 15000×1.4356 ≈ R21 534",
        c: "R21 534 − R20 625 = R909"
      },
      2: {
        a: "50000 = P(1.09)⁴",
        b: "P = 50000/1.4116 ≈ R35 420"
      },
      3: {
        a: "Deposit = 0.15×8500 = R1 275",
        b: "Loan = R7 225",
        c: "Interest = 7225×0.20×2 = R2 890",
        d: "Monthly = (7225+2890)/24 = R421.46"
      },
      4: {
        a: "25000×0.085 = A$2 125",
        b: "340 ÷ 0.085 = R4 000"
      },
      5: {
        a: "8640,00/8000,00 = 1,08 and 9331,20/8640,00 = 1,08 — a constant ratio confirms compound growth; rate i = 8%",
        b: "A = 8000(1,08)⁶ = R12 694,99",
        c: "Year 4 gives R10 883,91 (below R11 000) and year 5 gives R11 754,62 (above R11 000), so the investment first exceeds R11 000 in year 5"
      }
    }
  }
});
