// Math Magician — Graad 11, Hoofstuk 1
// Eksponente en Wortelvorme

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 100,
      chapter: 1,
      name: "Rasionale eksponente & wortelvorm-bewerkings",
      fullName: "Rasionale eksponente, vereenvoudiging van wortelvorme, en rasionalisering van noemers",
      lesson: {
        heading: "Rasionale eksponente en wortelvorm-bewerkings",
        sub: "Hoofstuk 1 · Onderwerp 1",
        body: `
          <p>Graad 11 brei die eksponent- en wortelvorm-werk van Graad 10 uit om <strong>rasionalisering van noemers</strong> en meer komplekse wortelvorm-vereenvoudiging in te sluit.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Herhaling van rasionale eksponente</div>
            <p>
              <span class="math">a^(m/n) = (ⁿ√a)ᵐ</span><br>
              <span class="math">a^(1/n) = ⁿ√a</span><br>
              Al die eksponentwette geld steeds. Skakel wortelvorme om na rasionale eksponente voordat jy vereenvoudig.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Rasionalisering van die noemer</div>
            <p>
              Ons laat nooit 'n wortelvorm in die noemer van 'n breuk staan nie.<br><br>
              <strong>Monoom-noemer:</strong> vermenigvuldig bo en onder met die wortelvorm.<br>
              <span class="math">3/√5 = 3√5/5</span><br><br>
              <strong>Binoom-noemer:</strong> vermenigvuldig met die <em>konjugaat</em>.<br>
              <span class="math">1/(√3 + 1) × (√3 − 1)/(√3 − 1) = (√3 − 1)/(3 − 1) = (√3 − 1)/2</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vereenvoudig en rasionaliseer</div>
            <p><strong>(a)</strong> <span class="math">√12 − √3 + √75</span><br>
            <span class="math">= 2√3 − √3 + 5√3 = 6√3</span></p>
            <p><strong>(b)</strong> <span class="math">4/(2 − √2)</span><br>
            <span class="math">= 4(2 + √2)/((2)² − (√2)²) = 4(2 + √2)/(4−2) = 2(2 + √2) = 4 + 2√2</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Gelyksoortige wortelvorme</div>
            <p>Slegs <strong>gelyksoortige wortelvorme</strong> (dieselfde radikand) kan opgetel of afgetrek word, net soos gelyksoortige terme.<br>
            <span class="math">3√2 + 5√2 = 8√2</span> maar <span class="math">3√2 + 5√3</span> kan nie verder vereenvoudig word nie.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Rasionaliseer-Noemer-Sakrekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies die monoom- of konjugaatmetode — voer die breuk in om te rasionaliseer.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g11c1mono" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Monoom √</button>
              <button id="g11c1conj" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Konjugaat (a ± √b)</button>
            </div>
            <div id="g11c1monoPanel">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">Rasionaliseer a/√n</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Teller (a)</div><input id="g11c1ma" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radikand (n)</div><input id="g11c1mn" type="number" value="5" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c1monoBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Rasionaliseer</button>
              </div>
            </div>
            <div id="g11c1conjPanel" style="display:none;">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">Rasionaliseer a / (b + √c) of a / (b − √c)</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Teller (a)</div><input id="g11c1ca" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Heelgetaldeel (b)</div><input id="g11c1cb" type="number" value="2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Teken</div>
                  <select id="g11c1csign" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                    <option value="1">+</option>
                    <option value="-1">−</option>
                  </select>
                </div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radikand (c)</div><input id="g11c1cc" type="number" value="2" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g11c1conjBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Rasionaliseer</button>
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
                if(isNaN(a)||isNaN(n)||n<=0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in.</span>';return;}
                const s=simpSurd(a,n);
                let html='<span style="color:rgba(221,225,240,0.50);">'+a+'/√'+n+' × √'+n+'/√'+n+' = '+a+'√'+n+'/'+n+'</span><br>';
                if(s.rad===1){html+='<span style="color:#6ee7b7;">= '+fr(a*Math.sqrt(n),n)+'... → vereenvoudig: '+s.coeff+'/'+n+' = '+fr(s.coeff,n)+'</span>';}
                else{const g2=gcd(Math.abs(a),n);html+='<span style="color:#6ee7b7;">= '+(a/g2===1?'':(a/g2))+'√'+n+'/'+(n/g2)+'</span>';}
                out.innerHTML=html;
              });
              document.getElementById('g11c1conjBtn').addEventListener('click',()=>{
                const a=gv('g11c1ca'),b=gv('g11c1cb'),sign=parseInt(document.getElementById('g11c1csign').value),c=gv('g11c1cc');
                const out=document.getElementById('g11c1Out');
                if([a,b,c].some(isNaN)||c<=0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in.</span>';return;}
                const denom=b*b-c;// difference of squares: (b+√c)(b-√c)=b²-c
                const signStr=sign===1?'+':'−';
                const conjSign=sign===1?'−':'+';
                if(denom===0){out.innerHTML='<span style="color:#fca5a5;">Noemer word 0 — geen werklike rasionalisering moontlik nie.</span>';return;}
                let html='<span style="color:rgba(221,225,240,0.50);">'+a+'/('+b+signStr+'√'+c+') × ('+b+conjSign+'√'+c+')/('+b+conjSign+'√'+c+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Noemer: ('+b+')²−(√'+c+')² = '+b*b+'−'+c+' = '+denom+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Teller: '+a+'('+b+conjSign+'√'+c+')</span><br>';
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

          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir 'n konjugaat-noemer (a + √b), vermenigvuldig met (a − √b)/(a − √b). Die noemer word a² − b — altyd 'n rasionale getal.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vereenvoudig: √48 − √12 + √3",
          options: ["4√3", "3√3", "5√3", "2√3"],
          answer: 1,
          topic: "Rasionale eksponente & wortelvorm-bewerkings"
        },
        {
          type: "mc",
          text: "Rasionaliseer: 6/√3",
          options: ["2√3", "6√3/3", "√3/2", "2/√3"],
          answer: 0,
          topic: "Rasionale eksponente & wortelvorm-bewerkings"
        },
        {
          type: "input",
          text: "Vereenvoudig: (√5 + √2)(√5 − √2)",
          answer: "3",
          topic: "Rasionale eksponente & wortelvorm-bewerkings"
        },
        {
          type: "mc",
          text: "Rasionaliseer: 1/(1 + √3)",
          options: ["(1−√3)/2", "(√3−1)/2", "(1+√3)/2", "(1−√3)/4"],
          answer: 1,
          topic: "Rasionale eksponente & wortelvorm-bewerkings"
        },
        {
          type: "mc",
          text: "Vereenvoudig: (2√3)² + √(144)",
          options: ["24", "12", "16", "18"],
          answer: 0,
          topic: "Rasionale eksponente & wortelvorm-bewerkings"
        },
        {
          type: "input",
          text: "Vereenvoudig: (√7 + √3)² − (√7 − √3)²",
          answer: "4√21",
          topic: "Rasionale eksponente & wortelvorm-bewerkings"
        },
        {
          type: "input",
          text: "Vereenvoudig tot 'n enkele rasionale getal: (3 − √5)/(3 + √5) + (3 + √5)/(3 − √5)",
          answer: "7",
          topic: "Rasionale eksponente & wortelvorm-bewerkings"
        }
      ]
    },
    {
      id: 101,
      chapter: 1,
      name: "Wortelvormvergelykings & eksponensiële toepassings",
      fullName: "Oplossing van vergelykings met wortelvorme en toepassings van eksponensiële funksies",
      lesson: {
        heading: "Wortelvormvergelykings en eksponensiële toepassings",
        sub: "Hoofstuk 1 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Oplossing van wortelvormvergelykings</div>
            <p>
              <strong>Metode:</strong><br>
              1. Isoleer die wortelvorm aan een kant.<br>
              2. Kwadreer albei kante om die wortelvorm te elimineer.<br>
              3. Los die vergelyking wat ontstaan op.<br>
              4. <strong>Kontroleer altyd oplossings</strong> — kwadrering kan vreemde (ekstra) wortels invoer.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op: √(2x + 1) = x − 1</div>
            <p>Kwadreer albei kante: <span class="math">2x + 1 = (x−1)²= x²−2x+1</span><br>
            <span class="math">0 = x² − 4x = x(x−4)</span><br>
            <span class="math">x = 0</span> of <span class="math">x = 4</span><br><br>
            <strong>Kontroleer x = 0:</strong> √1 = 0−1 → 1 = −1 ✗ (vreemde wortel)<br>
            <strong>Kontroleer x = 4:</strong> √9 = 3 = 4−1 ✓<br>
            Oplossing: x = 4</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Toepassings van eksponensiële groei en verval</div>
            <p>
              <strong>Groei:</strong> <span class="math">A = P(1 + r)ⁿ</span><br>
              <strong>Verval:</strong> <span class="math">A = P(1 − r)ⁿ</span><br>
              <strong>Bepaling van n:</strong> Gebruik die probeer-en-verbeter-metode of logaritmes (bekendgestel in Graad 12).<br>
              Voorbeeld: Teen watter tempo groei R5 000 tot R8 000 in 8 jaar (saamgestelde rente)?<br>
              <span class="math">8000 = 5000(1+r)⁸ → (1+r)⁸ = 1.6 → r = 1.6^(1/8) − 1 ≈ 6.05%</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Groei- en Verval-Sakrekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer P, r% en n in — los op vir A. Of voer P, A en n in — vind r. Kies groei of verval.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Tipe</div>
                <select id="g11c1t2type" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="findA">Vind A (P, r, n bekend)</option>
                  <option value="findR">Vind r (P, A, n bekend)</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Modus</div>
                <select id="g11c1t2mode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="growth">Groei (+)</option>
                  <option value="decay">Verval (−)</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P</div><input id="g11c1t2p" type="number" value="5000" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div id="g11c1t2rDiv"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r (%)</div><input id="g11c1t2r" type="number" value="6.05" step="0.01" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div id="g11c1t2aDiv" style="display:none;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A</div><input id="g11c1t2a" type="number" value="8000" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n (jare)</div><input id="g11c1t2n" type="number" value="8" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c1t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
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
                  if([P,r,n].some(isNaN)||P<=0||r<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                  const A=P*Math.pow(1+sign*r,n);
                  let html='<span style="color:rgba(221,225,240,0.50);">Formule: '+formula+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">= '+P+'(1'+(sign===1?'+':'−')+r+')^'+n+'</span><br>';
                  html+='<span style="color:#6ee7b7;">A = '+R(A)+'</span>';
                  out.innerHTML=html;
                } else {
                  const A=parseFloat(document.getElementById('g11c1t2a').value);
                  if([P,A,n].some(isNaN)||P<=0||A<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                  const ratio=A/P;const factor=Math.pow(ratio,1/n);const r=(factor-1)*sign;
                  let html='<span style="color:rgba(221,225,240,0.50);">(1'+(sign===1?'+':'−')+'r)^'+n+' = A/P = '+A+'/'+P+' = '+f(ratio)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">(1'+(sign===1?'+':'−')+'r) = '+f(ratio)+'^(1/'+n+') = '+f(factor)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">r = '+f(r*100)+'% per jaar</span>';
                  out.innerHTML=html;
                }
              });
              ['g11c1t2p','g11c1t2r','g11c1t2a','g11c1t2n'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c1t2Btn').click();});});
              document.getElementById('g11c1t2Btn').click();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Om r te vind: herrangskik A = P(1+r)ⁿ → (A/P)^(1/n) = 1+r → r = (A/P)^(1/n) − 1. Dit werk vir beide groei en verval.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Los op: √(x + 5) = 3",
          options: ["x = 4", "x = 14", "x = 2", "x = 9"],
          answer: 0,
          topic: "Wortelvormvergelykings & eksponensiële toepassings"
        },
        {
          type: "mc",
          text: "Los op: √(3x − 2) = x − 2. Die geldige oplossing is:",
          options: ["x = 1", "x = 6", "x = 1 en x = 6", "Geen oplossing"],
          answer: 1,
          topic: "Wortelvormvergelykings & eksponensiële toepassings"
        },
        {
          type: "input",
          text: "'n Bevolking van 2 000 groei teen 5% per jaar. Na hoeveel jare oorskry dit vir die eerste keer 3 000? (Gebruik die probeer-metode: kontroleer n = 8, 9, 10)",
          answer: "9",
          topic: "Wortelvormvergelykings & eksponensiële toepassings"
        },
        {
          type: "mc",
          text: "Waarom moet jy altyd oplossings van wortelvormvergelykings kontroleer?",
          options: ["Omdat kwadrering vreemde wortels kan invoer", "Omdat wortelvorme altyd positief is", "Omdat die kwadratiese formule die domein verander", "Omdat negatiewe antwoorde onmoontlik is"],
          answer: 0,
          topic: "Wortelvormvergelykings & eksponensiële toepassings"
        },
        {
          type: "mc",
          text: "Los op: √(x² − 5) = 2",
          options: ["x = 3", "x = ±3", "x = 9", "x = ±√9"],
          answer: 1,
          topic: "Wortelvormvergelykings & eksponensiële toepassings"
        },
        {
          type: "input",
          text: "Los op vir x: √(x + 7) − √(x − 5) = 2. (Isoleer een wortelvorm, kwadreer, vereenvoudig, kwadreer dan weer — kontroleer jou antwoord.)",
          answer: "9",
          topic: "Wortelvormvergelykings & eksponensiële toepassings"
        },
        {
          type: "input",
          text: "'n Motor ter waarde van R250 000 depresieer volgens die dalende-balans-metode, A = P(1 − r)ⁿ. Na 3 jaar is dit R128 000 werd. Bepaal die jaarlikse depresiasiekoers r, as 'n persentasie.",
          answer: "20%",
          altAnswers: ["20", "20 %"],
          topic: "Wortelvormvergelykings & eksponensiële toepassings"
        }
      ]
    },
    {
      id: 102,
      chapter: 1,
      name: "Eksponentwette & eksponensiële vergelykings",
      fullName: "Vereenvoudiging van uitdrukkings en oplossing van vergelykings deur die eksponentwette vir rasionale eksponente te gebruik",
      lesson: {
        heading: "Eksponentwette en eksponensiële vergelykings",
        sub: "Hoofstuk 1 · Onderwerp 3",
        body: `
          <p>Voordat wortelvorme aangepak word, hersien en brei Graad 11 eers die <strong>eksponentwette</strong> van Graad 10 uit na rasionale (breuk-)eksponente, en gebruik dit om eksponensiële vergelykings op te los.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die eksponentwette (vir x &gt; 0, tensy anders aangedui)</div>
            <p>
              <span class="math">xᵐ · xⁿ = xᵐ⁺ⁿ</span><br>
              <span class="math">xᵐ ÷ xⁿ = xᵐ⁻ⁿ</span><br>
              <span class="math">(xᵐ)ⁿ = xᵐⁿ</span><br>
              <span class="math">(xy)ⁿ = xⁿyⁿ</span><br>
              <span class="math">x⁰ = 1 (x ≠ 0)</span>, &nbsp; <span class="math">x⁻ⁿ = 1/xⁿ</span><br><br>
              Hierdie wette geld nou ook wanneer m en n <strong>rasionaal</strong> (breuke) is, mits <span class="math">x &gt; 0</span> — dit vermy probleme soos (−8)^(1/2) wat nie-reëel is terwyl (−8)^(1/3) reëel is.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vereenvoudig deur eksponentwette te gebruik</div>
            <p><strong>(a)</strong> <span class="math">x^(2/3) · x^(1/3) = x^(2/3+1/3) = x¹ = x</span></p>
            <p><strong>(b)</strong> <span class="math">(27a⁶)^(1/3) = 27^(1/3) · a^(6/3) = 3a²</span></p>
            <p><strong>(c)</strong> <span class="math">(x^(1/2)·y²)³ / x^(3/2) = x^(3/2)·y⁶ / x^(3/2) = y⁶</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Oplossing van eksponensiële vergelykings</div>
            <p>
              <strong>Metode:</strong> kry dieselfde grondtal aan albei kante, en stel dan die eksponente gelyk (aangesien <span class="math">bᵐ = bⁿ ⟺ m = n</span> vir b &gt; 0, b ≠ 1).<br><br>
              As die vergelyking 'n rasionale eksponent op die onbekende het (bv. <span class="math">x^(2/3) = 9</span>), verhef eerder albei kante tot die resiproke mag.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op vir x</div>
            <p><strong>(a)</strong> <span class="math">3^(2x−1) = 27 → 3^(2x−1) = 3³ → 2x−1 = 3 → x = 2</span></p>
            <p><strong>(b)</strong> <span class="math">x^(2/3) = 9 → (x^(2/3))^(3/2) = 9^(3/2) → x = 27</span></p>
            <p><strong>(c)</strong> <span class="math">2^(x+1) + 2^x = 24 → 2^x(2 + 1) = 24 → 2^x = 8 → x = 3</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Eksponentwet-Vereenvoudiger</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer 'n grondtal en twee rasionale eksponente (as breuke p/q) en 'n bewerking in — sien die vereenvoudigde resultaat.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Grondtal x</div><input id="g11c1t3x" type="number" value="2" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Eksponent 1 (p/q)</div><input id="g11c1t3e1" type="text" value="2/3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Bewerking</div>
                <select id="g11c1t3op" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="mul">×  (tel eksponente op)</option>
                  <option value="div">÷  (trek eksponente af)</option>
                  <option value="pow">verhef tot mag (vermenigvuldig eksponente)</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Eksponent 2 (p/q)</div><input id="g11c1t3e2" type="text" value="1/3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c1t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vereenvoudig</button>
            </div>
            <div id="g11c1t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gcd(a,b){a=Math.abs(a);b=Math.abs(b);return b===0?a:gcd(b,a%b);}
              function parseFrac(s){
                s=s.trim();
                if(s.includes('/')){const [n,d]=s.split('/').map(Number);return {n,d};}
                return {n:Number(s),d:1};
              }
              function fracStr(n,d){
                if(d<0){n=-n;d=-d;}
                const g=gcd(n,d)||1;
                n/=g;d/=g;
                return d===1?(''+n):(n+'/'+d);
              }
              function calc(){
                const x=parseFloat(document.getElementById('g11c1t3x').value);
                const e1=parseFrac(document.getElementById('g11c1t3e1').value);
                const e2=parseFrac(document.getElementById('g11c1t3e2').value);
                const op=document.getElementById('g11c1t3op').value;
                const out=document.getElementById('g11c1t3Out');
                if(isNaN(x)||x<=0||isNaN(e1.n)||isNaN(e1.d)||isNaN(e2.n)||isNaN(e2.d)||e1.d===0||e2.d===0){
                  out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n positiewe grondtal en geldige breuk-eksponente in (bv. 2/3).</span>";return;
                }
                let rn,rd,symbol;
                if(op==='mul'){rn=e1.n*e2.d+e2.n*e1.d;rd=e1.d*e2.d;symbol='+';}
                else if(op==='div'){rn=e1.n*e2.d-e2.n*e1.d;rd=e1.d*e2.d;symbol='−';}
                else {rn=e1.n*e2.n;rd=e1.d*e2.d;symbol='×';}
                const resultExp=fracStr(rn,rd);
                const value=Math.pow(x,rn/rd);
                let html='<span style="color:rgba(221,225,240,0.50);">x^('+fracStr(e1.n,e1.d)+') '+(op==='mul'?'·':op==='div'?'÷':'verhef tot')+' x^('+fracStr(e2.n,e2.d)+') → eksponent: '+fracStr(e1.n,e1.d)+' '+symbol+' '+fracStr(e2.n,e2.d)+'</span><br>';
                html+='<span style="color:#6ee7b7;">= '+x+'^('+resultExp+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Numeriese kontrole (x = '+x+'): </span><span style="color:#fcd34d;">'+parseFloat(value.toFixed(6))+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c1t3Btn').addEventListener('click',calc);
              ['g11c1t3x','g11c1t3e1','g11c1t3e2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer jy eksponensiële vergelykings oplos, probeer altyd eers om albei kante as magte van <em>dieselfde grondtal</em> te skryf. As die grondtalle nie maklik ooreenstem nie, soek 'n gemeenskaplike faktor om uit te trek (soos 2^x in 2^(x+1) + 2^x).</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vereenvoudig: x^(3/4) · x^(1/4)",
          options: ["x", "x^(3/16)", "x²", "x^(1/2)"],
          answer: 0,
          topic: "Eksponentwette & eksponensiële vergelykings"
        },
        {
          type: "input",
          text: "Vereenvoudig: (64)^(2/3). Gee die antwoord as 'n heelgetal.",
          answer: "16",
          topic: "Eksponentwette & eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Los op vir x: 5^(x−2) = 125",
          options: ["x = 3", "x = 5", "x = 1", "x = 25"],
          answer: 0,
          topic: "Eksponentwette & eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Los op vir x: 3^x + 3^(x+1) = 36",
          options: ["x = 2", "x = 3", "x = 9", "x = 4"],
          answer: 0,
          topic: "Eksponentwette & eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Vereenvoudig: (x²y^(1/2))² / x³",
          options: ["xy", "x²y", "y/x", "x⁻¹y"],
          answer: 0,
          topic: "Eksponentwette & eksponensiële vergelykings"
        },
        {
          type: "input",
          text: "Los op vir x: x^(2/3) = 4. Gee die positiewe waarde van x.",
          answer: "8",
          topic: "Eksponentwette & eksponensiële vergelykings"
        },
        {
          type: "input",
          text: "Los op vir x deur albei kante as magte van dieselfde grondtal te skryf: 4^(x+1) = 8^(x−1)",
          answer: "5",
          topic: "Eksponentwette & eksponensiële vergelykings"
        },
        {
          type: "input",
          text: "Los op vir x: 2^(2x) − 5(2ˣ) + 4 = 0. (Wenk: laat y = 2ˣ, wat 'n kwadratiese vergelyking in y gee.) Gee beide oplossings geskei deur 'of'.",
          answer: "0 of 2",
          altAnswers: ["x = 0 of x = 2", "0 of x=2"],
          topic: "Eksponentwette & eksponensiële vergelykings"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 1 Werkboek — Eksponente en Wortelvorme",
    questions: [
      {
        number: 1,
        text: "Vereenvoudig (geen sakrekenaar):",
        parts: [
          { label: "a", text: "√(45) − 2√(20) + √(80)", marks: 3 },
          { label: "b", text: "(3 + √7)(3 − √7)", marks: 2 },
          { label: "c", text: "(√2 + √5)²", marks: 3 },
          { label: "d", text: "∛(54) · ∛(4)", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Rasionaliseer die noemer en vereenvoudig:",
        parts: [
          { label: "a", text: "10/√5", marks: 2 },
          { label: "b", text: "3/(√6 − √3)", marks: 3 },
          { label: "c", text: "(√5 + √2)/(√5 − √2)", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "Los op vir x en kontroleer al die oplossings:",
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
        a: "2x−3=25 → x=14; kontroleer: √25=5 ✓",
        b: "x+4=(x−2)² → x²−5x=0 → x=0 of x=5; kontroleer x=0: √4=2≠−2 ✗; x=5: √9=3=3 ✓",
        c: "x²+12=4x²−4x+1 → 3x²−4x−11=0 → x=(4±√148)/6; kontroleer beide"
      }
    }
  }
});
