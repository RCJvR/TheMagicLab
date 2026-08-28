// Math Magician — Graad 12, Hoofstuk 5
// Polinome — Resttheorema, Faktorteorema, Kubieke Vergelykings

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 500,
      chapter: 5,
      name: "Resttheorema & faktorteorema",
      fullName: "Polinoomdeling, resttheorema, en faktorteorema",
      lesson: {
        heading: "Resttheorema en faktorteorema",
        sub: "Hoofstuk 5 · Onderwerp 1",
        body: `
          <p>Die <strong>resttheorema</strong> en <strong>faktorteorema</strong> laat ons toe om doeltreffend met polinome te werk sonder lang deling.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Resttheorema</div>
            <p>
              Wanneer die polinoom p(x) gedeel word deur (x − a), is die res <span class="math">p(a)</span>.<br><br>
              As die res 0 is, dan is (x − a) 'n <strong>faktor</strong> van p(x).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Faktorteorema</div>
            <p>
              (x − a) is 'n faktor van p(x) as en slegs as <span class="math">p(a) = 0</span>.<br><br>
              Om faktore van 'n kubieke p(x) = ax³ + bx² + cx + d te vind:<br>
              1. Toets faktore van <span class="math">d/a</span> (rasionale-wortel-teorema)<br>
              2. Sodra een faktor (x − a) gevind is, deel om 'n kwadratiese te kry<br>
              3. Faktoriseer die kwadratiese
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>p(x) = x³ − 2x² − 5x + 6<br>
            Toets x = 1: p(1) = 1 − 2 − 5 + 6 = 0 ✓ → (x − 1) is 'n faktor<br>
            Deel: p(x) = (x − 1)(x² − x − 6) = (x − 1)(x − 3)(x + 2)<br>
            Wortels: x = 1, 3, −2</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Sintetiese deling (kort metode)</div>
            <p>
              Om p(x) deur (x − a) te deel: skryf koëffisiënte van p(x) neer, bring die eerste af, dan vermenigvuldig met a en tel herhaaldelik op.<br>
              Die laaste getal is die res.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Rest-/Faktorteorema-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer koëffisiënte van p(x) = ax³+bx²+cx+d en 'n waarde in — bereken p(a) (die res).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (x³)</div><input id="g12c5a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (x²)</div><input id="g12c5b" type="number" value="-2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (x)</div><input id="g12c5c" type="number" value="-5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d (konst.)</div><input id="g12c5d" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Deel deur (x−k), k=</div><input id="g12c5k" type="number" value="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c5Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Evalueer</button>
            </div>
            <div id="g12c5Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const a=gv('g12c5a'),b=gv('g12c5b'),c=gv('g12c5c'),d=gv('g12c5d'),k=gv('g12c5k');
                const out=document.getElementById('g12c5Out');
                if([a,b,c,d,k].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer alle waardes in.</span>';return;}
                const rem=a*k*k*k+b*k*k+c*k+d;
                const pstr=(a!==0?a+'x³':'')+(b>=0&&a!==0?'+':'')+b+'x²'+(c>=0?'+':'')+c+'x'+(d>=0?'+':'')+d;
                let html='<span style="color:rgba(221,225,240,0.50);">p(x) = '+pstr+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">p('+k+') = '+a+'('+k+')³ + '+b+'('+k+')² + '+c+'('+k+') + '+d+'</span><br>';
                html+='<span style="color:'+(rem===0?'#6ee7b7':'#fcd34d')+';">p('+k+') = '+rem+'</span><br>';
                if(rem===0) html+='<span style="color:#6ee7b7;">✅ (x − '+k+") IS 'n faktor van p(x)</span>";
                else html+='<span style="color:rgba(221,225,240,0.50);">Res wanneer gedeel deur (x − '+k+') = '+rem+'</span>';
                out.innerHTML=html;
              }
              ['g12c5a','g12c5b','g12c5c','g12c5d','g12c5k'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c5Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "p(x) = x³ − 3x + 2. Bepaal die res wanneer gedeel deur (x − 2).", options: ["4", "0", "2", "6"], answer: 0, topic: "Resttheorema & faktorteorema" },
        { type: "mc", text: "As p(3) = 0, watter een is 'n faktor van p(x)?", options: ["(x + 3)", "(x − 3)", "(3x − 1)", "(x · 3)"], answer: 1, topic: "Resttheorema & faktorteorema" },
        { type: "input", text: "p(x) = 2x³ − 3x² + x − 4. Bepaal p(2).", answer: "2", topic: "Resttheorema & faktorteorema" },
        { type: "mc", text: "Om 'n faktor van x³ + x² − 4x − 4 te vind, toets heelgetal-faktore van:", options: ["1", "4", "−4", "Beide B en C"], answer: 3, topic: "Resttheorema & faktorteorema" },
        { type: "mc", text: "x³ − 6x² + 11x − 6 = (x−1)(x−2)(x−3). Die som van die wortels is:", options: ["6", "11", "−6", "−11"], answer: 0, topic: "Resttheorema & faktorteorema" },
        { type: "mc", text: "Los op vir x: x³ + 2x² − 5x − 6 = 0", options: ["x = −3, −1, 2", "x = −1, 1, 6", "x = 1, 2, 3", "x = −2, 1, 3"], answer: 0, topic: "Resttheorema & faktorteorema" },
        { type: "input", text: "p(x) = x³ − 2x² + 3x − 5. R₁ is die res wanneer p(x) gedeel word deur (x − 3), en R₂ is die res wanneer p(x) gedeel word deur (x + 1). Bereken R₁ − R₂.", answer: "24", topic: "Resttheorema & faktorteorema" }
      ]
    },
    {
      id: 501,
      chapter: 5,
      name: "Kubieke polinome — skets & oplos",
      fullName: "Oplos van kubieke vergelykings en skets van kubieke funksies",
      lesson: {
        heading: "Kubieke vergelykings en grafieke",
        sub: "Hoofstuk 5 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Oplos van kubieke vergelykings</div>
            <p>
              Algemene metode:<br>
              1. Skuif alle terme na een kant → p(x) = 0<br>
              2. Vind een wortel met die faktorteorema<br>
              3. Faktoriseer as (x − a)(kwadratiese) = 0<br>
              4. Los die kwadratiese op (kan 0, 1, of 2 verdere reële oplossings hê)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Skets van y = ax³ + bx² + cx + d</div>
            <p>
              Sleutelkenmerke om te vind met differensiaalrekene (uit Hst. 6) of algebra:<br>
              • y-afsnit: stel x = 0<br>
              • x-afsnitte: los p(x) = 0 op (faktorteorema)<br>
              • Draaipunte: los p'(x) = 0 op<br>
              • Eindgedrag: as a > 0, val links/styg regs; as a &lt; 0, styg links/val regs<br>
              • Buigpunt: waar konkawiteit verander (p''(x) = 0)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Skets y = x³ − 3x + 2</div>
            <p>y-afsnit: (0, 2)<br>
            x-afsnitte: faktoriseer → (x−1)²(x+2) → x = 1 (dubbel) en x = −2<br>
            Dubbele wortel → raaklyn aan die x-as by x = 1<br>
            y' = 3x² − 3 = 0 → x = ±1 (draaipunte by (1, 0) min en (−1, 4) maks)<br>
            Einde: a > 0 → val links, styg regs</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kubieke-Wortelvinder (Faktorteorema)</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer p(x) = ax³+bx²+cx+d in — toets outomaties rasionale wortels, en wys dan die volledige faktorisering en wortels.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (x³)</div><input id="g12c5t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (x²)</div><input id="g12c5t2b" type="number" value="-2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (x)</div><input id="g12c5t2c" type="number" value="-5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d (konst.)</div><input id="g12c5t2d" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c5t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind Wortels</button>
            </div>
            <div id="g12c5t2Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c5t2a'),b=gv('g12c5t2b'),c=gv('g12c5t2c'),d=gv('g12c5t2d');
                const out=document.getElementById('g12c5t2Out');
                if([a,b,c,d].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer kubieke koëffisiënte in (a ≠ 0).</span>';return;}
                const p=x=>a*x*x*x+b*x*x+c*x+d;
                // vind rasionale wortel: toets faktore van d/a
                const absD=Math.abs(d),absA=Math.abs(a);
                let root1=null;
                const tests=[];
                for(let i=1;i<=absD*2+1;i++){for(let j=1;j<=absA+1;j++){[i/j,-i/j].forEach(r=>{if(Math.abs(p(r))<1e-9)tests.push(r);});}}
                if(tests.length>0) root1=tests[0];
                else{out.innerHTML="<span style=\"color:#fca5a5;\">Geen eenvoudige rasionale wortel gevind nie. Probeer 'n ander kubieke.</span>";return;}
                // sintetiese deling van ax³+bx²+cx+d deur (x−root1)
                const A=a,B=b+a*root1,C=c+B*root1;
                // kwadratiese: Ax²+Bx+C
                const disc=B*B-4*A*C;
                let html='<span style="color:rgba(221,225,240,0.50);">Rasionale wortel gevind: x = '+root1+' (getoets met faktorteorema)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Kwosiënt na deling deur (x−'+root1+'): '+A+'x² + '+B+'x + '+f4(C)+'</span><br>';
                if(disc<0){
                  html+='<span style="color:rgba(221,225,240,0.50);">Δ = '+f4(disc)+' < 0 → kwadratiese het geen reële wortels nie</span><br>';
                  html+='<span style="color:#6ee7b7;">Enigste reële wortel: x = '+root1+'</span>';
                } else if(disc===0){
                  const r2=-B/(2*A);
                  html+='<span style="color:#6ee7b7;">Wortels: x = '+root1+' en x = '+f4(r2)+' (dubbele wortel)</span>';
                } else {
                  const r2=(-B+Math.sqrt(disc))/(2*A),r3=(-B-Math.sqrt(disc))/(2*A);
                  html+='<span style="color:rgba(221,225,240,0.50);">Δ = '+f4(disc)+' → twee verdere wortels uit die kwadratiese formule</span><br>';
                  html+='<span style="color:#6ee7b7;">Wortels: x = '+f4(root1)+',  x = '+f4(r2)+',  x = '+f4(r3)+'</span>';
                }
                out.innerHTML=html;
              }
              ['g12c5t2a','g12c5t2b','g12c5t2c','g12c5t2d'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c5t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Los op: x³ − 7x + 6 = 0. Die wortels is:", options: ["1, 2, −3", "1, −3, 2", "−1, 3, −2", "1, 2, 3"], answer: 0, topic: "Kubieke polinome — skets & oplos" },
        { type: "mc", text: "As 'n kubieke 'n dubbele wortel by x = 2 en nog 'n wortel by x = −1 het, kan dit wees:", options: ["(x−2)²(x+1)", "(x+2)²(x−1)", "(x−2)(x+1)²", "(x+2)(x−1)²"], answer: 0, topic: "Kubieke polinome — skets & oplos" },
        { type: "mc", text: "y = −2x³ + … Eindgedrag:", options: ["Val links, styg regs", "Styg links, val regs", "Val albei kante", "Styg albei kante"], answer: 1, topic: "Kubieke polinome — skets & oplos" },
        { type: "input", text: "p(x) = x³ + px² − x − 6 en (x+2) is 'n faktor. Bepaal p.", answer: "2", topic: "Kubieke polinome — skets & oplos" },
        { type: "mc", text: "'n Kubieke vergelyking kan hoogstens hoeveel reële wortels hê?", options: ["1", "2", "3", "4"], answer: 2, topic: "Kubieke polinome — skets & oplos" },
        { type: "mc", text: "Los op vir x: 2x³ − x² − 5x − 2 = 0", options: ["x = −1, −½, 2", "x = 1, ½, −2", "x = −1, 2, 5", "x = 1, −2, −5"], answer: 0, topic: "Kubieke polinome — skets & oplos" },
        { type: "input", text: "x³ − x² − 4x + 4 = 0 het wortels p < q < r. Bereken die waarde van p·q·r.", answer: "-4", altAnswers: ["−4"], topic: "Kubieke polinome — skets & oplos" }
      ]
    },
    {
      id: 502,
      chapter: 5,
      name: "Bepaal onbekende koëffisiënte",
      fullName: "Gebruik van die resttheorema en faktorteorema om onbekende koëffisiënte in 'n polinoom te bepaal",
      lesson: {
        heading: "Bepaal onbekende koëffisiënte met die resttheorema en faktorteorema",
        sub: "Hoofstuk 5 · Onderwerp 3",
        body: `
          <p>'n Baie algemene Graad 12-vraagstyl gee 'n polinoom met een of meer onbekende koëffisiënte (soos p of k) en 'n voorwaarde oor die res of 'n bekende faktor — jy moet 'n vergelyking vir die onbekende(s) opstel en oplos.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die metode</div>
            <p>
              1. Gebruik die gegewe voorwaarde — "(x − a) is 'n faktor" beteken p(a) = 0; "res is R wanneer gedeel deur (x − a)" beteken p(a) = R.<br>
              2. Vervang x = a in p(x) (wat die onbekende konstante bevat).<br>
              3. Stel die resulterende uitdrukking gelyk aan 0 (faktor) of R (res).<br>
              4. Los die resulterende vergelyking op vir die onbekende.<br><br>
              As daar twee onbekendes is, benodig jy twee voorwaardes (twee vergelykings, gelyktydig opgelos).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Een onbekende</div>
            <p>p(x) = 2x³ + kx² − 5x + 6, en (x − 1) is 'n faktor. Bepaal k.<br>
            p(1) = 2 + k − 5 + 6 = 0 → k + 3 = 0 → k = −3</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Res gegee, nie nul nie</div>
            <p>p(x) = x³ − px + 4 laat 'n res van 10 wanneer gedeel deur (x − 3). Bepaal p.<br>
            p(3) = 27 − 3p + 4 = 10 → 31 − 3p = 10 → 3p = 21 → p = 7</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Twee onbekendes</div>
            <p>p(x) = x³ + ax² + bx − 6. (x − 1) en (x − 2) is albei faktore. Bepaal a en b.<br>
            p(1) = 1 + a + b − 6 = 0 → a + b = 5<br>
            p(2) = 8 + 4a + 2b − 6 = 0 → 4a + 2b = −2 → 2a + b = −1<br>
            Trek af: a = −6, dan b = 11</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Eksamenwenk</div>
            <p>Kontroleer altyd jou onbekende deur dit terug in p(x) te vervang en te bevestig dat p(a) wel gelyk is aan 0 (of die gestelde res).</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Onbekende-Koëffisiënt-Oplosser</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">p(x) = x³ + kx² + cx + d (koëffisiënt van x³ vas op 1). Gegewe (x − wortel) is 'n faktor, los op vir k.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (x-koëff.)</div><input id="g12c5u_c" type="number" value="-1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d (konst.)</div><input id="g12c5u_d" type="number" value="-6" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Wortel a (x−a is faktor)</div><input id="g12c5u_a" type="number" value="-2" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Res R (0 = faktor)</div><input id="g12c5u_R" type="number" value="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c5uBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op vir k</button>
            </div>
            <div id="g12c5uOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const c=gv('g12c5u_c'),d=gv('g12c5u_d'),a=gv('g12c5u_a'),R=gv('g12c5u_R');
                const out=document.getElementById('g12c5uOut');
                if([c,d,a,R].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer alle waardes in.</span>';return;}
                if(a===0){out.innerHTML="<span style=\"color:#fca5a5;\">Wortel a kan nie 0 wees met hierdie opstelling nie (k-koëffisiënt verdwyn).</span>";return;}
                // p(x) = x^3 + k x^2 + c x + d; p(a) = a^3 + k a^2 + c a + d = R
                // los op vir k: k = (R - a^3 - c*a - d) / a^2
                const k=(R - a*a*a - c*a - d)/(a*a);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">p(x) = x³ + kx² + '+c+'x + '+d+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">p('+a+') = '+a+'³ + k('+a+')² + '+c+'('+a+') + '+d+' = '+R+'</span><br>'+
                  '<span style="color:#6ee7b7;">k = '+f4(k)+'</span>';
              }
              ['g12c5u_c','g12c5u_d','g12c5u_a','g12c5u_R'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c5uBtn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "input", text: "p(x) = 2x³ + kx² − 5x + 6, en (x − 1) is 'n faktor. Bepaal k.", answer: "-3", altAnswers: ["−3"], topic: "Bepaal onbekende koëffisiënte" },
        { type: "mc", text: "p(x) = x³ − px + 4 laat 'n res van 10 wanneer gedeel deur (x − 3). Watter vergelyking bepaal p?", options: ["27 − 3p + 4 = 10", "27 + 3p + 4 = 10", "9 − 3p + 4 = 10", "3 − p + 4 = 10"], answer: 0, topic: "Bepaal onbekende koëffisiënte" },
        { type: "input", text: "Gebruik p(x) = x³ − px + 4 met res 10 by x = 3 (27 − 3p + 4 = 10), bepaal p.", answer: "7", topic: "Bepaal onbekende koëffisiënte" },
        { type: "mc", text: "As 'n polinoom TWEE onbekende koëffisiënte het, hoeveel bekende faktor-/res-voorwaardes benodig jy oor die algemeen?", options: ["Een", "Twee", "Drie", "Geen — een is altyd genoeg"], answer: 1, topic: "Bepaal onbekende koëffisiënte" },
        { type: "input", text: "p(x) = x³ + ax² + bx − 6. (x−1) en (x−2) is faktore, wat a+b=5 en 2a+b=−1 gee. Bepaal a.", answer: "-6", altAnswers: ["−6"], topic: "Bepaal onbekende koëffisiënte" },
        { type: "mc", text: "p(x) = x³ + ax² + bx − 4. (x − 1) is 'n faktor, en p(x) laat 'n res van −6 wanneer gedeel deur (x + 1). Bepaal a en b.", options: ["a = 1, b = 2", "a = 2, b = 1", "a = −1, b = 4", "a = 3, b = 0"], answer: 0, topic: "Bepaal onbekende koëffisiënte" },
        { type: "mc", text: "p(x) = 3x³ + kx² + 4, en (x − 2) is 'n faktor. Bepaal k, en bepaal dus al drie wortels van p(x) = 0.", options: ["k = −7; wortels: −⅔, 1, 2", "k = 7; wortels: ⅔, −1, −2", "k = −7; wortels: −1, 2, 3", "k = 4; wortels: −2, 1, 2"], answer: 0, topic: "Bepaal onbekende koëffisiënte" }
      ]
    },
    {
      id: 503,
      chapter: 5,
      name: "Skets van kubieke grafieke uit sleutelkenmerke",
      fullName: "Kombineer x-afsnitte, y-afsnit, draaipunte, en eindgedrag om 'n kubieke te skets",
      lesson: {
        heading: "Skets van kubieke grafieke uit sleutelkenmerke",
        sub: "Hoofstuk 5 · Onderwerp 4",
        body: `
          <p>Sodra jy 'n kubieke kan faktoriseer en die wortels kan vind, gaan die skets van die grafiek daaroor om al die sleutelkenmerke in een samehangende, korrek-gevormde kurwe te kombineer.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Kontrolelys vir die skets van y = ax³ + bx² + cx + d</div>
            <p>
              • <strong>y-afsnit:</strong> die waarde van d (stel x = 0)<br>
              • <strong>x-afsnitte:</strong> wortels uit die faktorteorema — let op enkele teenoor dubbele (herhaalde) wortels<br>
              • <strong>Vorm by 'n herhaalde wortel:</strong> die kurwe <em>raak</em> die x-as (soos 'n parabool) by 'n dubbele wortel, en <em>gaan reguit deur met 'n buigpunt-agtige afplatting</em> by 'n drievoudige wortel<br>
              • <strong>Eindgedrag:</strong> a > 0 → af aan die verste linkerkant, op aan die verste regterkant; a &lt; 0 → op aan die verste linkerkant, af aan die verste regterkant<br>
              • <strong>Draaipunte:</strong> gevind met differensiaalrekene (afgeleide = 0) — volledig gedek in die Differensiaalrekene-hoofstuk, maar jy moet herken dat 'n kubieke hoogstens 2 draaipunte het
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Skets y = (x+2)(x−1)²</div>
            <p>Wortels: x = −2 (enkel, kurwe kruis) en x = 1 (dubbel, kurwe raak)<br>
            y-afsnit: (0+2)(0−1)² = 2(1) = 2 → (0; 2)<br>
            a > 0 (brei uit: leidende term is x³) → val links, styg regs<br>
            Vorm: kom op vanaf onder-links, kruis by x=−2, styg na 'n plaaslike maksimum, kom terug af om die x-as by x=1 te raak, styg dan weer na regs.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Lees 'n skets agteruit</div>
            <p>Gegewe 'n skets wat x-afsnitte by −2, 1 (dubbel) en 'n y-afsnit van 2 wys, kan jy die vergelyking herbou: y = a(x+2)(x−1)², vervang dan die y-afsnit om a te vind.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Kubieke-Grafiekplotter</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer koëffisiënte a, b, c, d in vir y = ax³+bx²+cx+d en sien die skets met afsnitte gemerk.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c5pa" type="number" value="1" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g12c5pb" type="number" value="0" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g12c5pc" type="number" value="-3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d</div><input id="g12c5pd" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c5pBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Plot</button>
            </div>
            <svg id="g12c5pSvg" viewBox="0 0 340 300" style="width:100%;max-width:360px;background:#1e1b4b;border-radius:10px;border:1px solid rgba(99,102,241,0.25);"></svg>
            <div id="g12c5pOut" style="font-size:13px;line-height:1.8;color:rgba(221,225,240,0.85);min-height:24px;margin-top:8px;"></div>
            <script>
            (function(){
              const svgNS='http://www.w3.org/2000/svg';
              const svg=document.getElementById('g12c5pSvg');
              const W=340,H=300,ox=170,oy=150,scale=28;
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function toPx(x,y){return [ox+x*scale, oy-y*scale];}
              function el(tag,attrs){const e=document.createElementNS(svgNS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);return e;}
              function draw(){
                const a=gv('g12c5pa'),b=gv('g12c5pb'),c=gv('g12c5pc'),d=gv('g12c5pd');
                const out=document.getElementById('g12c5pOut');
                svg.innerHTML='';
                if([a,b,c,d].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer koëffisiënte in (a ≠ 0).</span>';return;}
                const p=x=>a*x*x*x+b*x*x+c*x+d;
                svg.appendChild(el('line',{x1:0,y1:oy,x2:W,y2:oy,stroke:'rgba(221,225,240,0.30)','stroke-width':1}));
                svg.appendChild(el('line',{x1:ox,y1:0,x2:ox,y2:H,stroke:'rgba(221,225,240,0.30)','stroke-width':1}));
                let pts=[];
                for(let px=0;px<=W;px+=2){
                  const x=(px-ox)/scale;
                  const y=p(x);
                  const [X,Y]=toPx(x,y);
                  if(Y>-40&&Y<H+40) pts.push(X+','+Y);
                }
                svg.appendChild(el('polyline',{points:pts.join(' '),fill:'none',stroke:'#6ee7b7','stroke-width':2}));
                const [yiX,yiY]=toPx(0,d);
                svg.appendChild(el('circle',{cx:yiX,cy:yiY,r:3,fill:'#fcd34d'}));
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">y = '+a+'x³'+(b>=0?'+':'')+b+'x²'+(c>=0?'+':'')+c+'x'+(d>=0?'+':'')+d+'</span><br>'+
                  '<span style="color:#fcd34d;">y-afsnit: (0; '+d+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.45);">Eindgedrag: '+(a>0?'val links, styg regs':'styg links, val regs')+'</span>';
              }
              ['g12c5pa','g12c5pb','g12c5pc','g12c5pd'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')draw();});});
              document.getElementById('g12c5pBtn').addEventListener('click',draw);
              draw();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "By 'n dubbele (herhaalde) wortel, doen 'n kubieke grafiek die volgende:", options: ["Kruis die x-as skerp", "Raak die x-as en draai terug", "Het 'n vertikale asimptoot", "Het 'n y-afsnit daar"], answer: 1, topic: "Skets van kubieke grafieke uit sleutelkenmerke" },
        { type: "mc", text: "y = (x+2)(x−1)² het x-afsnitte by:", options: ["x = −2 slegs", "x = −2 (kruis) en x = 1 (raak)", "x = 2 en x = −1", "x = −2 en x = 1, altwee kruisend"], answer: 1, topic: "Skets van kubieke grafieke uit sleutelkenmerke" },
        { type: "input", text: "y = a(x+2)(x−1)² gaan deur (0; 8). Bepaal a.", answer: "4", topic: "Skets van kubieke grafieke uit sleutelkenmerke" },
        { type: "mc", text: "'n Kubieke met a > 0 en slegs een reële wortel (geen herhaalde wortels) sal:", options: ["Links val, regs styg, en die x-as presies een keer kruis", "Links styg, regs val", "Die x-as twee keer raak", "Geen y-afsnit hê nie"], answer: 0, topic: "Skets van kubieke grafieke uit sleutelkenmerke" },
        { type: "mc", text: "Die maksimum aantal draaipunte wat 'n kubieke grafiek kan hê is:", options: ["1", "2", "3", "0"], answer: 1, topic: "Skets van kubieke grafieke uit sleutelkenmerke" },
        { type: "input", text: "Die grafiek van 'n kubieke het x-afsnitte by x = −3 en x = 2 (dubbele wortel), en 'n y-afsnit by (0; −24). Bepaal die waarde van a in y = a(x+3)(x−2)².", answer: "-2", altAnswers: ["−2"], topic: "Skets van kubieke grafieke uit sleutelkenmerke" },
        { type: "input", text: "'n Kubieke grafiek het 'n dubbele wortel by x = −1, 'n enkele wortel by x = 3, en gaan deur die punt (1; −16). Bepaal die waarde van a in y = a(x+1)²(x−3).", answer: "2", topic: "Skets van kubieke grafieke uit sleutelkenmerke" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 5 Werkboek — Polinome",
    questions: [
      { number: 1, text: "p(x) = 2x³ + x² − 13x + 6", parts: [
        { label: "a", text: "Toon dat (x − 2) 'n faktor is.", marks: 2 },
        { label: "b", text: "Faktoriseer p(x) volledig.", marks: 4 },
        { label: "c", text: "Los p(x) = 0 op.", marks: 2 }
      ]},
      { number: 2, text: "f(x) = x³ − x² − 8x + 12", parts: [
        { label: "a", text: "Bepaal alle x-afsnitte.", marks: 5 },
        { label: "b", text: "Bepaal die y-afsnit.", marks: 1 },
        { label: "c", text: "Beskryf die eindgedrag.", marks: 2 },
        { label: "d", text: "Maak 'n growwe skets.", marks: 3 }
      ]},
      { number: 3, text: "kx³ − 3x² + 2x + 4 laat 'n res van 12 wanneer gedeel deur (x − 2). Bepaal k.", parts: [
        { label: "a", text: "Pas die resttheorema toe.", marks: 2 },
        { label: "b", text: "Los op vir k.", marks: 2 }
      ]},
      { number: 4, text: "Die tabel hieronder gee waardes van p(x) = x³ − 3x² − x + 3 vir verskeie waardes van x:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>x</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>p(x)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−15</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>15</td></tr></table>", parts: [
        { label: "a", text: "Gebruik die tabel om die x-afsnitte van die grafiek van p neer te skryf.", marks: 2 },
        { label: "b", text: "Skryf die y-afsnit neer.", marks: 1 },
        { label: "c", text: "Skryf dus p(x) in volledig gefaktoriseerde vorm.", marks: 2 },
        { label: "d", text: "Beskryf die eindgedrag van die grafiek, met verwysing na die tabelwaardes by x = −2 en x = 4.", marks: 2 }
      ]}
    ],
    answers: {
      1: { a: "p(2)=16+4−26+6=0 ✓", b: "p(x)=(x−2)(2x²+5x−3)=(x−2)(2x−1)(x+3)", c: "x=2, x=½, x=−3" },
      2: { a: "Toets x=2: 8−4−16+12=0 ✓; deel: (x−2)(x²+x−6)=(x−2)(x+3)(x−2)=(x−2)²(x+3); x=2(dubbel),x=−3", b: "(0,12)", c: "a=1>0: val links, styg regs", d: "Raak die x-as by 2, sny by −3, y-afsnit by 12" },
      3: { a: "p(2)=8k−12+4+4=8k−4=12", b: "8k=16→k=2" },
      4: { a: "x = −1, 1, 3 (die waardes van x waar p(x) = 0 in die tabel)", b: "(0; 3)", c: "p(x) = (x+1)(x−1)(x−3)", d: "Leidende koëffisiënt a = 1 > 0, dus val die grafiek na links en styg na regs — bevestig deur die tabel: p(−2) = −15 (baie negatief soos x verminder) en p(4) = 15 (positief en toenemend soos x vermeerder)." }
    }
  }
});
