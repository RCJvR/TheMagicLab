// Math Magician — Grade 11, Chapter 1
// Exponents and Surds

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 100,
      chapter: 1,
      name: "Rational exponents & surd operations",
      fullName: "Rational exponents, simplifying surds, and rationalising denominators",
      lesson: {
        heading: "Rational exponents and surd operations",
        sub: "Chapter 1 · Topic 1",
        body: `
          <p>Grade 11 extends the exponent and surd work from Grade 10 to include <strong>rationalising denominators</strong> and more complex surd simplification.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Rational exponents recap</div>
            <p>
              <span class="math">a^(m/n) = (ⁿ√a)ᵐ</span><br>
              <span class="math">a^(1/n) = ⁿ√a</span><br>
              All exponent laws still apply. Convert surds to rational exponents before simplifying.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Rationalising the denominator</div>
            <p>
              We never leave a surd in the denominator of a fraction.<br><br>
              <strong>Monomial denominator:</strong> multiply top and bottom by the surd.<br>
              <span class="math">3/√5 = 3√5/5</span><br><br>
              <strong>Binomial denominator:</strong> multiply by the <em>conjugate</em>.<br>
              <span class="math">1/(√3 + 1) × (√3 − 1)/(√3 − 1) = (√3 − 1)/(3 − 1) = (√3 − 1)/2</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Simplify and rationalise</div>
            <p><strong>(a)</strong> <span class="math">√12 − √3 + √75</span><br>
            <span class="math">= 2√3 − √3 + 5√3 = 6√3</span></p>
            <p><strong>(b)</strong> <span class="math">4/(2 − √2)</span><br>
            <span class="math">= 4(2 + √2)/((2)² − (√2)²) = 4(2 + √2)/(4−2) = 2(2 + √2) = 4 + 2√2</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Like surds</div>
            <p>Only <strong>like surds</strong> (same radicand) can be added or subtracted, just like like terms.<br>
            <span class="math">3√2 + 5√2 = 8√2</span> but <span class="math">3√2 + 5√3</span> cannot be simplified further.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Rationalise Denominator Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Choose monomial or conjugate method — enter the fraction to rationalise.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g11c1mono" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Monomial √</button>
              <button id="g11c1conj" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Conjugate (a ± √b)</button>
            </div>
            <div id="g11c1monoPanel">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">Rationalise a/√n</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Numerator (a)</div><input id="g11c1ma" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radicand (n)</div><input id="g11c1mn" type="number" value="5" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c1monoBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Rationalise</button>
              </div>
            </div>
            <div id="g11c1conjPanel" style="display:none;">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">Rationalise a / (b + √c) or a / (b − √c)</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Numerator (a)</div><input id="g11c1ca" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Integer part (b)</div><input id="g11c1cb" type="number" value="2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sign</div>
                  <select id="g11c1csign" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                    <option value="1">+</option>
                    <option value="-1">−</option>
                  </select>
                </div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radicand (c)</div><input id="g11c1cc" type="number" value="2" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c1conjBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Rationalise</button>
              </div>
            </div>
            <div id="g11c1Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function fr(n,d){if(d===0)return'undef';const g=gcd(Math.abs(n),Math.abs(d));const s=d<0?-1:1;return(s*n/g)+'/'+(s*d/g);}
              function gcd(a,b){return b===0?a:gcd(b,a%b);}
              function simpSurd(k,n){// find largest perfect square factor of n
                let sq=1;for(let i=Math.floor(Math.sqrt(n));i>1;i--){if(n%(i*i)===0){sq=i*i;break;}}
                const out=Math.sqrt(sq);const rem=n/sq;
                return {coeff:k*out,rad:rem};
              }
              function setMode(m){
                document.getElementById('g11c1monoPanel').style.display=m==='mono'?'':'none';
                document.getElementById('g11c1conjPanel').style.display=m==='conj'?'':'none';
                document.getElementById('g11c1mono').style.cssText=m==='mono'?'background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;':'background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;';
                document.getElementById('g11c1conj').style.cssText=m==='conj'?'background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;':'background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;';
                document.getElementById('g11c1Out').innerHTML='';
              }
              document.getElementById('g11c1mono').addEventListener('click',()=>setMode('mono'));
              document.getElementById('g11c1conj').addEventListener('click',()=>setMode('conj'));
              document.getElementById('g11c1monoBtn').addEventListener('click',()=>{
                const a=gv('g11c1ma'),n=gv('g11c1mn');
                const out=document.getElementById('g11c1Out');
                if(isNaN(a)||isNaN(n)||n<=0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values.</span>';return;}
                const s=simpSurd(a,n);
                let html='<span style="color:rgba(221,225,240,0.50);">'+a+'/√'+n+' × √'+n+'/√'+n+' = '+a+'√'+n+'/'+n+'</span><br>';
                if(s.rad===1){html+='<span style="color:#6ee7b7;">= '+fr(a*Math.sqrt(n),n)+'... → simplified: '+s.coeff+'/'+n+' = '+fr(s.coeff,n)+'</span>';}
                else{const g2=gcd(Math.abs(a),n);html+='<span style="color:#6ee7b7;">= '+(a/g2===1?'':(a/g2))+'√'+n+'/'+(n/g2)+'</span>';}
                out.innerHTML=html;
              });
              document.getElementById('g11c1conjBtn').addEventListener('click',()=>{
                const a=gv('g11c1ca'),b=gv('g11c1cb'),sign=parseInt(document.getElementById('g11c1csign').value),c=gv('g11c1cc');
                const out=document.getElementById('g11c1Out');
                if([a,b,c].some(isNaN)||c<=0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values.</span>';return;}
                const denom=b*b-c;// difference of squares: (b+√c)(b-√c)=b²-c
                const signStr=sign===1?'+':'−';
                const conjSign=sign===1?'−':'+';
                if(denom===0){out.innerHTML='<span style="color:#fca5a5;">Denominator becomes 0 — no real rationalisation possible.</span>';return;}
                let html='<span style="color:rgba(221,225,240,0.50);">'+a+'/('+b+signStr+'√'+c+') × ('+b+conjSign+'√'+c+')/('+b+conjSign+'√'+c+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Denominator: ('+b+')²−(√'+c+')² = '+b*b+'−'+c+' = '+denom+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Numerator: '+a+'('+b+conjSign+'√'+c+')</span><br>';
                const numInt=a*b,numSurd=-a*sign;// a*(b - sign*√c)
                const g1=gcd(Math.abs(numInt),Math.abs(denom));const g2=gcd(Math.abs(numSurd),Math.abs(denom));
                html+='<span style="color:#6ee7b7;">= '+numInt+'/'+denom+(numSurd>=0?'+':'')+numSurd+'√'+c+'/'+denom+'</span>';
                out.innerHTML=html;
              });
              ['g11c1ma','g11c1mn'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c1monoBtn').click();}));
              ['g11c1ca','g11c1cb','g11c1cc'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c1conjBtn').click();}));
              document.getElementById('g11c1monoBtn').click();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>For a conjugate denominator (a + √b), multiply by (a − √b)/(a − √b). The denominator becomes a² − b — always a rational number.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Simplify: √48 − √12 + √3",
          options: ["4√3", "3√3", "5√3", "2√3"],
          answer: 1,
          topic: "Rational exponents & surd operations"
        },
        {
          type: "mc",
          text: "Rationalise: 6/√3",
          options: ["2√3", "6√3/3", "√3/2", "2/√3"],
          answer: 0,
          topic: "Rational exponents & surd operations"
        },
        {
          type: "input",
          text: "Simplify: (√5 + √2)(√5 − √2)",
          answer: "3",
          topic: "Rational exponents & surd operations"
        },
        {
          type: "mc",
          text: "Rationalise: 1/(1 + √3)",
          options: ["(1−√3)/2", "(√3−1)/2", "(1+√3)/2", "(1−√3)/4"],
          answer: 1,
          topic: "Rational exponents & surd operations"
        },
        {
          type: "mc",
          text: "Simplify: (2√3)² + √(144)",
          options: ["24", "12", "16", "18"],
          answer: 0,
          topic: "Rational exponents & surd operations"
        }
      ]
    },
    {
      id: 101,
      chapter: 1,
      name: "Surd equations & exponential applications",
      fullName: "Solving equations with surds and applications of exponentials",
      lesson: {
        heading: "Surd equations and exponential applications",
        sub: "Chapter 1 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Solving surd equations</div>
            <p>
              <strong>Method:</strong><br>
              1. Isolate the surd on one side.<br>
              2. Square both sides to eliminate the surd.<br>
              3. Solve the resulting equation.<br>
              4. <strong>Always check solutions</strong> — squaring can introduce extraneous roots.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve √(2x + 1) = x − 1</div>
            <p>Square both sides: <span class="math">2x + 1 = (x−1)²= x²−2x+1</span><br>
            <span class="math">0 = x² − 4x = x(x−4)</span><br>
            <span class="math">x = 0</span> or <span class="math">x = 4</span><br><br>
            <strong>Check x = 0:</strong> √1 = 0−1 → 1 = −1 ✗ (extraneous)<br>
            <strong>Check x = 4:</strong> √9 = 3 = 4−1 ✓<br>
            Solution: x = 4</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Exponential growth and decay applications</div>
            <p>
              <strong>Growth:</strong> <span class="math">A = P(1 + r)ⁿ</span><br>
              <strong>Decay:</strong> <span class="math">A = P(1 − r)ⁿ</span><br>
              <strong>Finding n:</strong> Use trial and improvement or logarithms (introduced in Grade 12).<br>
              Example: At what rate does R5 000 grow to R8 000 in 8 years (compound)?<br>
              <span class="math">8000 = 5000(1+r)⁸ → (1+r)⁸ = 1.6 → r = 1.6^(1/8) − 1 ≈ 6.05%</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Growth &amp; Decay Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter P, r%, and n — solve for A. Or enter P, A, and n — find r. Select growth or decay.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Type</div>
                <select id="g11c1t2type" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="findA">Find A (P, r, n known)</option>
                  <option value="findR">Find r (P, A, n known)</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Mode</div>
                <select id="g11c1t2mode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="growth">Growth (+)</option>
                  <option value="decay">Decay (−)</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P</div><input id="g11c1t2p" type="number" value="5000" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div id="g11c1t2rDiv"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r (%)</div><input id="g11c1t2r" type="number" value="6.05" step="0.01" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div id="g11c1t2aDiv" style="display:none;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A</div><input id="g11c1t2a" type="number" value="8000" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n (years)</div><input id="g11c1t2n" type="number" value="8" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c1t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c1t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function R(n){return 'R '+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
              document.getElementById('g11c1t2type').addEventListener('change',()=>{
                const t=document.getElementById('g11c1t2type').value;
                document.getElementById('g11c1t2rDiv').style.display=t==='findA'?'':'none';
                document.getElementById('g11c1t2aDiv').style.display=t==='findR'?'':'none';
              });
              document.getElementById('g11c1t2Btn').addEventListener('click',()=>{
                const type=document.getElementById('g11c1t2type').value;
                const mode=document.getElementById('g11c1t2mode').value;
                const P=parseFloat(document.getElementById('g11c1t2p').value);
                const n=parseFloat(document.getElementById('g11c1t2n').value);
                const out=document.getElementById('g11c1t2Out');
                const sign=mode==='growth'?1:-1;
                const formula=mode==='growth'?'A = P(1 + r)ⁿ':'A = P(1 − r)ⁿ';
                if(type==='findA'){
                  const r=parseFloat(document.getElementById('g11c1t2r').value)/100;
                  if([P,r,n].some(isNaN)||P<=0||r<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                  const A=P*Math.pow(1+sign*r,n);
                  let html='<span style="color:rgba(221,225,240,0.50);">Formula: '+formula+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">= '+P+'(1'+(sign===1?'+':'−')+r+')^'+n+'</span><br>';
                  html+='<span style="color:#6ee7b7;">A = '+R(A)+'</span>';
                  out.innerHTML=html;
                } else {
                  const A=parseFloat(document.getElementById('g11c1t2a').value);
                  if([P,A,n].some(isNaN)||P<=0||A<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                  const ratio=A/P;const factor=Math.pow(ratio,1/n);const r=(factor-1)*sign;
                  let html='<span style="color:rgba(221,225,240,0.50);">(1'+(sign===1?'+':'−')+'r)^'+n+' = A/P = '+A+'/'+P+' = '+f(ratio)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">(1'+(sign===1?'+':'−')+'r) = '+f(ratio)+'^(1/'+n+') = '+f(factor)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">r = '+f(r*100)+'% per year</span>';
                  out.innerHTML=html;
                }
              });
              ['g11c1t2p','g11c1t2r','g11c1t2a','g11c1t2n'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c1t2Btn').click();});});
              document.getElementById('g11c1t2Btn').click();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>To find r: rearrange A = P(1+r)ⁿ → (A/P)^(1/n) = 1+r → r = (A/P)^(1/n) − 1. This works for both growth and decay.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Solve: √(x + 5) = 3",
          options: ["x = 4", "x = 14", "x = 2", "x = 9"],
          answer: 0,
          topic: "Surd equations & exponential applications"
        },
        {
          type: "mc",
          text: "Solve: √(3x − 2) = x − 2. The valid solution is:",
          options: ["x = 1", "x = 6", "x = 1 and x = 6", "No solution"],
          answer: 1,
          topic: "Surd equations & exponential applications"
        },
        {
          type: "input",
          text: "A population of 2 000 grows at 5% per year. After how many years does it first exceed 3 000? (Use trial: check n = 8, 9, 10)",
          answer: "9",
          topic: "Surd equations & exponential applications"
        },
        {
          type: "mc",
          text: "Why must you always check solutions to surd equations?",
          options: ["Because squaring can introduce extraneous roots", "Because surds are always positive", "Because the quadratic formula changes the domain", "Because negative answers are impossible"],
          answer: 0,
          topic: "Surd equations & exponential applications"
        },
        {
          type: "mc",
          text: "Solve: √(x² − 5) = 2",
          options: ["x = 3", "x = ±3", "x = 9", "x = ±√9"],
          answer: 1,
          topic: "Surd equations & exponential applications"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 1 Workbook — Exponents and Surds",
    questions: [
      {
        number: 1,
        text: "Simplify (no calculator):",
        parts: [
          { label: "a", text: "√(45) − 2√(20) + √(80)", marks: 3 },
          { label: "b", text: "(3 + √7)(3 − √7)", marks: 2 },
          { label: "c", text: "(√2 + √5)²", marks: 3 },
          { label: "d", text: "∛(54) · ∛(4)", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Rationalise the denominator and simplify:",
        parts: [
          { label: "a", text: "10/√5", marks: 2 },
          { label: "b", text: "3/(√6 − √3)", marks: 3 },
          { label: "c", text: "(√5 + √2)/(√5 − √2)", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "Solve for x and check all solutions:",
        parts: [
          { label: "a", text: "√(2x − 3) = 5", marks: 3 },
          { label: "b", text: "√(x + 4) = x − 2", marks: 5 },
          { label: "c", text: "√(x² + 12) = 2x − 1", marks: 5 }
        ]
      }
    ],
    answers: {
      1: {
        a: "3√5 − 4√5 + 4√5 = 3√5",
        b: "9 − 7 = 2",
        c: "2 + 2√10 + 5 = 7 + 2√10",
        d: "∛(216) = 6"
      },
      2: {
        a: "2√5",
        b: "3(√6+√3)/((√6)²−(√3)²) = 3(√6+√3)/3 = √6+√3",
        c: "((√5+√2)²)/(5−2) = (7+2√10)/3"
      },
      3: {
        a: "2x−3=25 → x=14; check: √25=5 ✓",
        b: "x+4=(x−2)² → x²−5x=0 → x=0 or x=5; check x=0: √4=2≠−2 ✗; x=5: √9=3=3 ✓",
        c: "x²+12=4x²−4x+1 → 3x²−4x−11=0 → x=(4±√148)/6; check both"
      }
    }
  }
});
