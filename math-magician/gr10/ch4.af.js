// Math Magician — Grade 10, Chapter 4 (Afrikaans)
// Vergelykings en Ongelykhede

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 400,
      chapter: 4,
      name: "Lineêre & kwadratiese vergelykings",
      fullName: "Oplos van lineêre vergelykings, kwadratiese vergelykings, en gelyktydige vergelykings",
      lesson: {
        heading: "Lineêre, kwadratiese, en gelyktydige vergelykings",
        sub: "Hoofstuk 4 · Onderwerp 1",
        body: `
          <p>Vergelykings is wiskundige stellings dat twee uitdrukkings gelyk is. Graad 10 stel <strong>kwadratiese vergelykings</strong> en <strong>gelyktydige vergelykings</strong> bekend.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Lineêre vergelykings</div>
            <p>Vorm: <span class="math">ax + b = c</span>. Isoleer x deur inverse bewerkings op albei kante uit te voer.<br>
            Voorbeeld: <span class="math">3x − 5 = 7 → 3x = 12 → x = 4</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Kwadratiese vergelykings</div>
            <p>Vorm: <span class="math">ax² + bx + c = 0</span>. Metodes:<br>
            1. <strong>Faktorisering</strong> — stel elke faktor = 0<br>
            2. <strong>Formule:</strong> <span class="math">x = (−b ± √(b²−4ac)) / 2a</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op x² − 5x + 6 = 0</div>
            <p><strong>Faktorisering:</strong><br>
            <span class="math">(x − 2)(x − 3) = 0</span><br>
            <span class="math">x = 2</span> of <span class="math">x = 3</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Gelyktydige vergelykings (2 onbekendes)</div>
            <p>
              <strong>Substitusiemetode:</strong> Isoleer een veranderlike in een vergelyking; vervang dit in die ander.<br>
              <strong>Eliminasiemetode:</strong> Vermenigvuldig vergelykings om koëffisiënte te laat ooreenstem, tel dan op/trek af om een veranderlike te elimineer.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los gelyktydig op</div>
            <p><span class="math">2x + y = 7 … (1)</span><br>
            <span class="math">x − y = 2 … (2)</span><br>
            Tel op: <span class="math">3x = 9 → x = 3</span><br>
            Vervang in (2): <span class="math">3 − y = 2 → y = 1</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Vergelyking-oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Los 'n <strong>lineêre</strong> (ax + b = c) of <strong>kwadratiese</strong> (ax² + bx + c = 0) vergelyking stap-vir-stap op.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Tipe</div>
                <select id="g10c4type"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;">
                  <option value="linear">Lineêr: ax + b = c</option>
                  <option value="quad">Kwadraties: ax² + bx + c = 0</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div>
                <input id="g10c4a" type="number" value="3"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div>
                <input id="g10c4b" type="number" value="-5"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div>
                <input id="g10c4c" type="number" value="7"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c4Btn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Los op
              </button>
            </div>
            <div id="g10c4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gcd(a,b){a=Math.abs(a);b=Math.abs(b);return b===0?a:gcd(b,a%b);}
              function frac(n,d){if(d===0)return'onbepaald';const g=gcd(Math.abs(n),Math.abs(d));let nn=n/g,dd=d/g;if(dd<0){nn=-nn;dd=-dd;}return dd===1?''+nn:nn+'/'+dd;}
              function nice(x){return Math.abs(x-Math.round(x))<0.0001;}
              function run(){
                const type=document.getElementById('g10c4type').value;
                const a=parseFloat(document.getElementById('g10c4a').value);
                const b=parseFloat(document.getElementById('g10c4b').value);
                const c=parseFloat(document.getElementById('g10c4c').value);
                const out=document.getElementById('g10c4Out');
                if([a,b,c].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (a ≠ 0).</span>';return;}
                let html='';
                if(type==='linear'){
                  // ax + b = c → ax = c - b → x = (c-b)/a
                  const rhs=c-b;
                  const x=rhs/a;
                  html='<span style="color:rgba(221,225,240,0.50);">Vergelyking: </span><span style="color:#fcd34d;">'+a+'x '+(b>=0?'+ '+b:'− '+Math.abs(b))+' = '+c+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Stap 1 — trek '+b+' van albei kante af: '+a+'x = '+(c>=0?c:c)+'−('+b+') = '+rhs+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Stap 2 — deel albei kante deur '+a+':</span><br>';
                  html+='<span style="color:#6ee7b7;">x = '+frac(rhs,a)+(nice(x)&&!Number.isInteger(x)?' ≈ '+x.toFixed(4):'')+'</span>';
                } else {
                  // quadratic ax² + bx + c = 0
                  const disc=b*b-4*a*c;
                  html='<span style="color:rgba(221,225,240,0.50);">Vergelyking: </span><span style="color:#fcd34d;">'+a+'x² '+(b>=0?'+ '+b:'− '+Math.abs(b))+'x '+(c>=0?'+ '+c:'− '+Math.abs(c))+' = 0</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Diskriminant Δ = ('+b+')² − 4('+a+')('+c+') = '+disc+'</span><br>';
                  if(disc<0){
                    html+='<span style="color:#fca5a5;">Δ &lt; 0 — geen reële oplossings nie</span>';
                  } else if(disc===0){
                    const x=-b/(2*a);
                    html+='<span style="color:rgba(221,225,240,0.50);">Δ = 0 — een herhaalde wortel:</span><br>';
                    html+='<span style="color:#6ee7b7;">x = '+frac(-b,2*a)+'</span>';
                  } else {
                    const sq=Math.sqrt(disc);
                    const x1=(-b+sq)/(2*a), x2=(-b-sq)/(2*a);
                    const niceDisc=nice(sq);
                    html+='<span style="color:rgba(221,225,240,0.50);">x = (−b ± √Δ) / 2a = ('+(b>=0?'−'+b:'+'+Math.abs(b))+' ± √'+disc+') / '+(2*a)+'</span><br>';
                    if(niceDisc){
                      html+='<span style="color:#6ee7b7;">x = '+frac(-b+Math.round(sq),2*a)+' of x = '+frac(-b-Math.round(sq),2*a)+'</span>';
                    } else {
                      html+='<span style="color:#6ee7b7;">x ≈ '+x1.toFixed(4)+' of x ≈ '+x2.toFixed(4)+'</span><br>';
                      html+='<span style="color:rgba(221,225,240,0.40);font-size:12px;">Irrasionale wortels — presiese vorm: ('+(-b)+' ± √'+disc+') / '+(2*a)+'</span>';
                    }
                  }
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c4Btn').addEventListener('click',run);
              document.getElementById('g10c4type').addEventListener('change',run);
              ['g10c4a','g10c4b','g10c4c'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir kwadratiese vergelykings, probeer altyd eers faktorisering — dit is vinniger. Gebruik die formule slegs wanneer jy nie die faktore maklik kan sien nie.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Los op: 5x − 3 = 2x + 9",
          answer: "4",
          topic: "Lineêre & kwadratiese vergelykings"
        },
        {
          type: "mc",
          text: "Los op: x² − 7x + 10 = 0",
          options: ["x = 5 of x = 2", "x = −5 of x = −2", "x = 5 of x = −2", "x = 10 of x = 1"],
          answer: 0,
          topic: "Lineêre & kwadratiese vergelykings"
        },
        {
          type: "mc",
          text: "Gebruik die formule om 2x² − 3x − 2 = 0 op te los:",
          options: ["x = 2 of x = −½", "x = −2 of x = ½", "x = 1 of x = −2", "x = 2 of x = ½"],
          answer: 0,
          topic: "Lineêre & kwadratiese vergelykings"
        },
        {
          type: "input",
          text: "Los gelyktydig op: x + y = 10 en x − y = 4. Bepaal x.",
          answer: "7",
          topic: "Lineêre & kwadratiese vergelykings"
        },
        {
          type: "mc",
          text: "Los op: 2x² + 5x = 3",
          options: ["x = ½ of x = −3", "x = 3 of x = −½", "x = ½ of x = 3", "x = −3 of x = 3"],
          answer: 0,
          topic: "Lineêre & kwadratiese vergelykings"
        },
        {
          type: "mc",
          text: "Los op vir x, en gee jou antwoord in eenvoudigste wortelvorm: x² − 6x + 2 = 0",
          options: ["x = 3 ± √7", "x = 3 ± √2", "x = −3 ± √7", "x = 6 ± √7"],
          answer: 0,
          topic: "Lineêre & kwadratiese vergelykings"
        },
        {
          type: "mc",
          text: "Los op vir x: x + 6/x = 5",
          options: ["x = 2 of x = 3", "x = −2 of x = −3", "x = 1 of x = 6", "x = 5 of x = 1"],
          answer: 0,
          topic: "Lineêre & kwadratiese vergelykings"
        }
      ]
    },
    {
      id: 401,
      chapter: 4,
      name: "Woordprobleme & ongelykhede",
      fullName: "Letterlike vergelykings, woordprobleme, en lineêre ongelykhede",
      lesson: {
        heading: "Woordprobleme, letterlike vergelykings, en ongelykhede",
        sub: "Hoofstuk 4 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Letterlike vergelykings</div>
            <p>Om een veranderlike die onderwerp te maak, beteken om dit op een kant te isoleer.<br>
            Voorbeeld: Maak <span class="math">r</span> die onderwerp van <span class="math">A = πr²</span><br>
            <span class="math">r² = A/π → r = √(A/π)</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Lineêre ongelykhede</div>
            <p>Word soos lineêre vergelykings opgelos, met een belangrike verskil:<br>
            <strong>As jy met 'n negatiewe getal vermenigvuldig of deel, draai die ongelykheidsteken om!</strong><br><br>
            Die oplossing is 'n interval; stel dit op 'n getallelyn voor:<br>
            ● = ingesluit (≤ of ≥) &nbsp;&nbsp; ○ = uitgesluit (< of >)</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los die ongelykheid op</div>
            <p><span class="math">−2x + 3 > 9</span><br>
            <span class="math">−2x > 6</span><br>
            <span class="math">x < −3</span> ← teken draai om wanneer deur −2 gedeel word</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Woordprobleem-benadering</div>
            <p><strong>Lees</strong> → <strong>Definieer veranderlikes</strong> → <strong>Skryf vergelyking(s)</strong> → <strong>Los op</strong> → <strong>Kontroleer en beantwoord in konteks</strong><br><br>
            Voorbeeld: Twee getalle verskil met 5. Hulle som is 31. Bepaal hulle.<br>
            Laat x en x+5 die getalle wees.<br>
            <span class="math">x + (x+5) = 31 → 2x = 26 → x = 13</span><br>
            Getalle: 13 en 18.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Lineêre-ongelykheid-oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Los <strong>ax + b [ongelykheid] c</strong> op — sien stap-vir-stap berekeninge met teken-omdraai-waarskuwing.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div>
                <input id="g10c4ia" type="number" value="-2"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div style="padding-bottom:9px;color:rgba(221,225,240,0.60);font-size:16px;font-family:'JetBrains Mono',monospace;">x +</div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div>
                <input id="g10c4ib" type="number" value="3"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Teken</div>
                <select id="g10c4iop"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="gt">&gt;</option>
                  <option value="gte">≥</option>
                  <option value="lt">&lt;</option>
                  <option value="lte">≤</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div>
                <input id="g10c4ic" type="number" value="9"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c4iBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Los op
              </button>
            </div>
            <div id="g10c4iOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const opMap={gt:'>',gte:'≥',lt:'<',lte:'≤'};
              function flipOp(op){return{gt:'lt',lt:'gt',gte:'lte',lte:'gte'}[op];}
              function frac(n,d){const g=(function gg(a,b){a=Math.abs(a);b=Math.abs(b);return b===0?a:gg(b,a%b);})(Math.abs(n),Math.abs(d));let nn=n/g,dd=d/g;if(dd<0){nn=-nn;dd=-dd;}return dd===1?''+nn:nn+'/'+dd;}
              function solve(){
                const a=parseFloat(document.getElementById('g10c4ia').value);
                const b=parseFloat(document.getElementById('g10c4ib').value);
                const c=parseFloat(document.getElementById('g10c4ic').value);
                const op=document.getElementById('g10c4iop').value;
                const out=document.getElementById('g10c4iOut');
                if([a,b,c].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (a ≠ 0).</span>';return;}
                const opSym=opMap[op];
                let html='<span style="color:rgba(221,225,240,0.50);">Ongelykheid: </span><span style="color:#fcd34d;">'+a+'x '+(b>=0?'+ '+b:'− '+Math.abs(b))+' '+opSym+' '+c+'</span><br>';
                const rhs=c-b;
                html+='<span style="color:rgba(221,225,240,0.50);">Stap 1 — trek '+b+' af: '+a+'x '+opSym+' '+rhs+'</span><br>';
                const flipped=a<0;
                const finalOp=flipped?flipOp(op):op;
                const x=rhs/a;
                if(flipped){
                  html+='<span style="color:#fca5a5;">Stap 2 — deel deur '+a+' (negatief!) → </span><span style="color:#fbbf24;">teken draai om: '+opSym+' word '+opMap[finalOp]+'</span><br>';
                } else {
                  html+='<span style="color:rgba(221,225,240,0.50);">Stap 2 — deel deur '+a+':</span><br>';
                }
                html+='<span style="color:#6ee7b7;">x '+opMap[finalOp]+' '+frac(rhs,a)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c4iBtn').addEventListener('click',solve);
              ['g10c4ia','g10c4ib','g10c4ic'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')solve();}));
              solve();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die goue reël van ongelykhede: <strong>om met 'n negatiewe getal te deel of te vermenigvuldig, draai die teken om</strong>. Al die res werk presies soos 'n gewone vergelyking.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Maak b die onderwerp: A = ½h(a + b)",
          options: ["b = 2A/h − a", "b = A/h − a", "b = 2A/(h + a)", "b = 2A − ha"],
          answer: 0,
          topic: "Woordprobleme & ongelykhede"
        },
        {
          type: "mc",
          text: "Los op: −3x + 5 ≥ 14",
          options: ["x ≤ −3", "x ≥ −3", "x ≤ 3", "x ≥ 3"],
          answer: 0,
          topic: "Woordprobleme & ongelykhede"
        },
        {
          type: "input",
          text: "Die omtrek van 'n reghoek is 34 cm. Die lengte is 3 meer as die wydte. Bepaal die wydte.",
          answer: "7",
          topic: "Woordprobleme & ongelykhede"
        },
        {
          type: "mc",
          text: "Los op: 2 < 3x − 1 ≤ 11",
          options: ["1 < x ≤ 4", "1 ≤ x < 4", "x > 1 en x ≤ 4", "1 < x < 4"],
          answer: 0,
          topic: "Woordprobleme & ongelykhede"
        },
        {
          type: "mc",
          text: "Maak h die onderwerp van V = πr²h/3:",
          options: ["h = 3V/(πr²)", "h = V/(3πr²)", "h = 3πr²/V", "h = πr²/(3V)"],
          answer: 0,
          topic: "Woordprobleme & ongelykhede"
        },
        {
          type: "input",
          text: "Maak x die onderwerp van die formule: (2x + 3)/(x − 1) = k",
          answer: "(k+3)/(k-2)",
          altAnswers: ["x=(k+3)/(k-2)", "(k + 3)/(k − 2)"],
          topic: "Woordprobleme & ongelykhede"
        },
        {
          type: "input",
          text: "Die som van drie opeenvolgende heelgetalle is hoogstens 51. Bepaal die grootste moontlike waarde van die kleinste heelgetal.",
          answer: "16",
          topic: "Woordprobleme & ongelykhede"
        }
      ]
    },
    {
      id: 402,
      chapter: 4,
      name: "Gelyktydige vergelykings — verdere oefening",
      fullName: "Substitusie- en eliminasiemetodes, insluitend een lineêre en een kwadratiese vergelyking",
      lesson: {
        heading: "Gelyktydige vergelykings — substitusie, eliminasie, en gemengde stelsels",
        sub: "Hoofstuk 4 · Onderwerp 3",
        body: `
          <p>Buiten twee lineêre vergelykings, kan CAPS-probleme 'n <strong>lineêre</strong> vergelyking met 'n <strong>kwadratiese</strong> een koppel — 'n voorskou van die algebra-grafiek-verband wat in later grade verder ontwikkel word.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Kies 'n metode</div>
            <p>
              <strong>Substitusie</strong> — die beste wanneer een vergelyking reeds 'n veranderlike geïsoleer het (of maklik geïsoleer kan word), bv. <span class="math">y = 2x + 1</span>.<br>
              <strong>Eliminasie</strong> — die beste wanneer albei vergelykings in standaardvorm <span class="math">ax + by = c</span> is en koëffisiënte deur vermenigvuldiging kan ooreenstem.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Eliminasie</div>
            <p>
              <span class="math">3x + 2y = 12 … (1)</span><br>
              <span class="math">2x − y = 1 … (2)</span><br>
              Vermenigvuldig (2) met 2: <span class="math">4x − 2y = 2 … (3)</span><br>
              Tel (1) en (3) op: <span class="math">7x = 14 → x = 2</span><br>
              Vervang in (2): <span class="math">4 − y = 1 → y = 3</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Lineêr en kwadraties saam</div>
            <p>
              <span class="math">y = x + 1 … (1)</span><br>
              <span class="math">y = x² − 5 … (2)</span><br>
              Vervang (1) in (2): <span class="math">x + 1 = x² − 5 → x² − x − 6 = 0</span><br>
              <span class="math">(x − 3)(x + 2) = 0 → x = 3</span> of <span class="math">x = −2</span><br>
              Ooreenstemmende y-waardes: <span class="math">y = 4</span> of <span class="math">y = −1</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Vind altyd albei veranderlikes</div>
            <p>'n Gelyktydige stelsel vra vir 'n <strong>paar</strong> waardes (of verskeie pare). Moet nooit ophou nadat jy net vir een veranderlike opgelos het nie — vervang altyd terug om die ander(e) te vind, en kontroleer jou oplossing in <em>albei</em> oorspronklike vergelykings.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer een vergelyking kwadraties is, verwag tot <strong>twee oplossingspare</strong> — dit weerspieël die feit dat 'n lyn 'n parabool op tot twee punte kan sny.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Los gelyktydig op: 2x + 3y = 16 en x − y = 2. Bepaal y.",
          answer: "12/5",
          altAnswers: ["2.4", "2,4"],
          topic: "Gelyktydige vergelykings — verdere oefening"
        },
        {
          type: "mc",
          text: "Los gelyktydig op: y = x − 1 en y = x² − 3. Bepaal die x-waardes.",
          options: ["x = 2 of x = −1", "x = 1 of x = −2", "x = 2 of x = 1", "x = −2 of x = −1"],
          answer: 0,
          topic: "Gelyktydige vergelykings — verdere oefening"
        },
        {
          type: "input",
          text: "Los op: 4x − y = 10 en 3x + y = 11. Bepaal x.",
          answer: "3",
          topic: "Gelyktydige vergelykings — verdere oefening"
        },
        {
          type: "mc",
          text: "Vir die stelsel y = 2x en y = x² − 3x + 4, is die oplossings:",
          options: ["x = 1 of x = 4", "x = 2 of x = 4", "x = 1 of x = 2", "geen reële oplossings nie"],
          answer: 0,
          topic: "Gelyktydige vergelykings — verdere oefening"
        },
        {
          type: "input",
          text: "Twee getalle het 'n som van 15 en hulle verskil is 3. Bepaal die grootste getal.",
          answer: "9",
          topic: "Gelyktydige vergelykings — verdere oefening"
        },
        {
          type: "mc",
          text: "Los gelyktydig op: y = 2x − 3 en y = x² − 4x + 1. Gee die x-waardes in eenvoudigste wortelvorm.",
          options: ["x = 3 ± √5", "x = 3 ± √3", "x = −3 ± √5", "x = 2 ± √5"],
          answer: 0,
          topic: "Gelyktydige vergelykings — verdere oefening"
        },
        {
          type: "input",
          text: "Los gelyktydig op: x/2 − y/3 = 2 en x + y = 9. Bepaal x.",
          answer: "6",
          topic: "Gelyktydige vergelykings — verdere oefening"
        }
      ]
    },
    {
      id: 403,
      chapter: 4,
      name: "Woordprobleme in konteks",
      fullName: "Vertaling van werklike-wêreld woordprobleme na lineêre, kwadratiese, of gelyktydige vergelykings",
      lesson: {
        heading: "Los woordprobleme in konteks op",
        sub: "Hoofstuk 4 · Onderwerp 4",
        body: `
          <p>Woordprobleme toets of jy 'n werklike situasie in algebra kan <strong>vertaal</strong> — dit is dikwels die moeilikste stap, nie die oplos self nie.</p>

          <div class="def-box">
            <div class="def-box-title">📖 'n Betroubare 5-stap-metode</div>
            <p>
              1. <strong>Lees</strong> die probleem twee keer — identifiseer wat gevra word.<br>
              2. <strong>Definieer</strong> veranderlike(s) duidelik in woorde, bv. "laat x = die aantal pastei's verkoop".<br>
              3. <strong>Vertaal</strong> die gegewe inligting in vergelyking(s).<br>
              4. <strong>Los op</strong> met die toepaslike tegniek.<br>
              5. <strong>Interpreteer</strong> — skryf die antwoord in konteks, en kontroleer dat dit sin maak (bv. geen negatiewe ouderdomme of gedeeltes van mense nie).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Ouderdomsprobleem (lineêr)</div>
            <p>
              Kagiso is 4 jaar ouer as sy suster. Oor 6 jaar sal die som van hulle ouderdomme 42 wees. Hoe oud is Kagiso nou?<br>
              Laat suster se ouderdom = x, dus is Kagiso se ouderdom = x + 4.<br>
              <span class="math">(x + 6) + (x + 4 + 6) = 42 → 2x + 16 = 42 → x = 13</span><br>
              Kagiso is <span class="math">13 + 4 = 17</span> jaar oud.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Oppervlakteprobleem (kwadraties)</div>
            <p>
              'n Reghoekige tuin is 3 m langer as wat dit wyd is, en die oppervlakte is 40 m². Bepaal die wydte.<br>
              Laat wydte = x, lengte = x + 3.<br>
              <span class="math">x(x + 3) = 40 → x² + 3x − 40 = 0 → (x + 8)(x − 5) = 0</span><br>
              <span class="math">x = 5</span> (verwerp x = −8, want 'n wydte kan nie negatief wees nie). Wydte = 5 m.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Verwerp ongeldige oplossings</div>
            <p>Kwadratiese woordprobleme lewer dikwels twee wiskundige oplossings op, maar slegs een is dalk fisies sinvol. Kontroleer altyd albei wortels teen die werklike-wêreld konteks (lengtes, ouderdomme, hoeveelhede kan nie negatief wees nie).</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>As 'n probleem jou twee onbekendes met twee verwantskappe gee, is dit 'n vermomde gelyktydige-vergelykings-probleem — definieer albei veranderlikes voordat jy enige vergelyking skryf.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "'n Getal plus twee keer die getal is 45. Bepaal die getal.",
          answer: "15",
          topic: "Woordprobleme in konteks"
        },
        {
          type: "mc",
          text: "'n Reghoek se lengte is 5 cm meer as sy wydte, en die oppervlakte is 50 cm². Wat is die wydte?",
          options: ["5 cm", "10 cm", "7 cm", "6 cm"],
          answer: 0,
          topic: "Woordprobleme in konteks"
        },
        {
          type: "input",
          text: "Thabo is twee keer so oud as sy dogter. Oor 5 jaar sal die som van hulle ouderdomme 55 wees. Bepaal die dogter se huidige ouderdom.",
          answer: "15",
          topic: "Woordprobleme in konteks"
        },
        {
          type: "mc",
          text: "'n Liefdadigheidsorganisasie verkoop kaartjies: volwasse kaartjies kos R50 en kinderkaartjies R20. 60 kaartjies is verkoop vir R2400. Hoeveel volwasse kaartjies is verkoop?",
          options: ["40", "20", "30", "45"],
          answer: 0,
          topic: "Woordprobleme in konteks"
        },
        {
          type: "input",
          text: "Die produk van twee opeenvolgende positiewe heelgetalle is 132. Bepaal die kleinste heelgetal.",
          answer: "11",
          topic: "Woordprobleme in konteks"
        },
        {
          type: "input",
          text: "Die produk van twee getalle is 90. Een getal is 3 meer as twee keer die ander. Bepaal die kleinste getal.",
          answer: "6",
          topic: "Woordprobleme in konteks"
        },
        {
          type: "input",
          text: "Twee opeenvolgende ewe getalle het 'n produk van 168. Bepaal die grootste getal.",
          answer: "14",
          topic: "Woordprobleme in konteks"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 4 Werkboek — Vergelykings en Ongelykhede",
    questions: [
      {
        number: 1,
        text: "Los op vir x:",
        parts: [
          { label: "a", text: "3(2x − 1) = x + 12", marks: 3 },
          { label: "b", text: "(x+2)/3 − (x−1)/2 = 1", marks: 4 },
          { label: "c", text: "x² = 5x", marks: 3 },
          { label: "d", text: "3x² − x − 2 = 0", marks: 3 },
          { label: "e", text: "x² − 3x − 1 = 0 (los in wortelvorm)", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "Los die volgende pare gelyktydige vergelykings op:",
        parts: [
          { label: "a", text: "3x − y = 5 en x + 2y = 8", marks: 5 },
          { label: "b", text: "y = 2x − 1 en x + y = 8", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "Ongelykhede:",
        parts: [
          { label: "a", text: "Los op en stel voor op 'n getallelyn: 5 − 2x < 11", marks: 3 },
          { label: "b", text: "Los op: −3 ≤ 2x + 1 < 7", marks: 3 }
        ]
      },
      {
        number: 4,
        text: "'n Skoolwinkeltjie verkoop pastei's teen R12 en koeldrank teen R8. Op Maandag is 35 items verkoop vir 'n totaal van R348. Hoeveel pastei's en hoeveel koeldranke is verkoop?",
        parts: [
          { label: "a", text: "Definieer veranderlikes en skryf twee vergelykings.", marks: 3 },
          { label: "b", text: "Los op en gee jou antwoord in konteks.", marks: 4 }
        ]
      },
      {
        number: 5,
        text: "Die tabel hieronder gee waardes van twee funksies, f(x) = x + 1 en g(x) = x² − 2x − 3, vir x = −2 tot x = 4:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>x</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>f(x)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>g(x)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr></table>",
        parts: [
          { label: "a", text: "Lees van die tabel af: vir watter waarde(s) van x is f(x) = g(x)?", marks: 2 },
          { label: "b", text: "Bevestig algebraïes dat hierdie x-waardes die gelyktydige vergelykings y = x + 1 en y = x² − 2x − 3 oplos.", marks: 4 },
          { label: "c", text: "Skryf die ooreenstemmende snypunte as koördinaatpare neer.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "6x−3=x+12 → 5x=15 → x=3",
        b: "2(x+2)−3(x−1)=6 → −x+7=6 → x=1",
        c: "x²−5x=0 → x(x−5)=0 → x=0 of x=5",
        d: "(3x+2)(x−1)=0 → x=−2/3 of x=1",
        e: "x=(3±√13)/2"
      },
      2: {
        a: "x=18/7, y=19/7",
        b: "x+2x−1=8 → 3x=9 → x=3, y=5"
      },
      3: {
        a: "−2x<6 → x>−3",
        b: "−3≤2x+1<7 → −4≤2x<6 → −2≤x<3"
      },
      4: {
        a: "Laat p=pastei's, c=koeldranke; p+c=35, 12p+8c=348",
        b: "p=17, c=18"
      },
      5: {
        a: "x = −1 en x = 4 (die rye waar f(x) en g(x) ooreenstem)",
        b: "x+1=x²−2x−3 → x²−3x−4=0 → (x−4)(x+1)=0 → x=4 of x=−1",
        c: "(−1, 0) en (4, 5)"
      }
    }
  }
});
