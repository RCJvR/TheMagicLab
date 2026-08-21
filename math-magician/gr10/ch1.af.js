// Math Magician — Graad 10, Hoofstuk 1
// Algebraïese Uitdrukkings

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 100,
      chapter: 1,
      name: "Reële getalle & wortelvorme",
      fullName: "Die reële getallestelsel, rasionale & irrasionale getalle, wortelvorme",
      lesson: {
        heading: "Reële getalle, rasionale getalle, en wortelvorme",
        sub: "Hoofstuk 1 · Onderwerp 1",
        body: `
          <p>Die <strong>reële getallestelsel</strong> (ℝ) bevat elke getal op die getallelyn. Dit word in twee hooffamilies verdeel: <strong>rasionale</strong> en <strong>irrasionale</strong> getalle.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Rasionale getalle (ℚ)</div>
            <p>'n Getal is <strong>rasionaal</strong> as dit geskryf kan word as <span class="math">p/q</span> waar p, q ∈ ℤ en q ≠ 0.<br>
            Dit sluit in: heelgetalle, breuke, eindigende desimale, en <em>herhalende</em> desimale.<br>
            Voorbeelde: <span class="math">3, −7, ½, 0.75, 0.3̄</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Irrasionale getalle</div>
            <p>Getalle wat <strong>nie</strong> geskryf kan word as <span class="math">p/q</span> nie. Hulle desimale uitbreidings is nie-eindigend en nie-herhalend.<br>
            Voorbeelde: <span class="math">√2, √3, π, ∛5</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Wortelvorme</div>
            <p>'n <strong>Wortelvorm</strong> is 'n irrasionale worteluitdrukking soos <span class="math">√5</span> of <span class="math">∛7</span>.<br>
            <span class="math">√9 = 3</span> is <em>nie</em> 'n wortelvorm nie — dit vereenvoudig tot 'n rasionale getal.<br>
            <span class="math">√8 = 2√2</span> — vereenvoudig altyd deur volkome vierkantfaktore uit te trek.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Klassifiseer en vereenvoudig</div>
            <p>Klassifiseer elkeen en vereenvoudig waar moontlik:</p>
            <p><strong>(a)</strong> <span class="math">√49</span> → 7 ✓ (rasionaal — volkome vierkant)<br>
            <strong>(b)</strong> <span class="math">√50</span> → <span class="math">√(25 × 2) = 5√2</span> (irrasionale wortelvorm)<br>
            <strong>(c)</strong> <span class="math">√(4/9)</span> → <span class="math">2/3</span> (rasionaal)<br>
            <strong>(d)</strong> <span class="math">0.121212…</span> → rasionaal (herhalende desimaal = 12/99 = 4/33)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Skat wortelvorme</div>
            <p>Om <span class="math">√20</span> te skat: let daarop dat <span class="math">4² = 16</span> en <span class="math">5² = 25</span>, so <span class="math">4 &lt; √20 &lt; 5</span>. Aangesien 20 nader aan 16+4=20 is... probeer <span class="math">4.4² = 19.36</span> en <span class="math">4.5² = 20.25</span>, so <span class="math">√20 ≈ 4.47</span>.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Wortelvorm-Vereenvoudiger</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer 'n positiewe heelgetal in — klassifiseer en vereenvoudig sy vierkantswortel.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">√n — voer n in</div>
                <input id="g10c1surd" type="number" min="1" max="10000" placeholder="bv. 72"
                  style="width:110px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c1surdBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Vereenvoudig
              </button>
            </div>
            <div id="g10c1surdOut" style="font-size:14px;line-height:2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function largestPSF(n){
                let best=1;
                for(let i=2;i*i<=n;i++){ if(n%(i*i)===0) best=i*i; }
                return best;
              }
              function run(){
                const n=parseInt(document.getElementById('g10c1surd').value);
                const out=document.getElementById('g10c1surdOut');
                if(!n||n<1||isNaN(n)){out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n positiewe heelgetal in.</span>";return;}
                const sq=Math.round(Math.sqrt(n));
                if(sq*sq===n){
                  out.innerHTML='<span style="color:#6ee7b7;">√'+n+' = '+sq+'</span><br>'
                    +"<span style=\"color:rgba(221,225,240,0.50);\">✓ Rasionaal — volkome vierkant, nie 'n wortelvorm nie.</span>";
                } else {
                  const psf=largestPSF(n);
                  const k=Math.round(Math.sqrt(psf));
                  const m=n/psf;
                  const simplified=k===1?'√'+n:k+'√'+m;
                  out.innerHTML='<span style="color:#fca5a5;">Irrasionaal (wortelvorm)</span><br>'
                    +'<span style="color:#fcd34d;">√'+n+(psf>1?' = √('+psf+'×'+m+')':'')+' = '+simplified+'</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">Desimaal ≈ '+(Math.sqrt(n)).toFixed(4)+'</span><br>'
                    +(psf>1?'<span style="color:rgba(221,225,240,0.40);font-size:12px;">Grootste volkome vierkantfaktor: '+psf+' = '+k+'²</span>':'');
                }
              }
              document.getElementById('g10c1surdBtn').addEventListener('click',run);
              document.getElementById('g10c1surd').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>'n Wortelvorm in vereenvoudigde vorm het <strong>geen volkome vierkantfaktore</strong> onder die wortelteken nie. Kontroleer altyd: kan ek 4, 9, 16, 25, 36… uithaal?</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Watter een van die volgende is 'n irrasionale getal?",
          options: ["0.375", "√16", "√7", "−⅔"],
          answer: 2,
          topic: "Reële getalle & wortelvorme"
        },
        {
          type: "mc",
          text: "Vereenvoudigde vorm van √72:",
          options: ["8√2", "6√2", "4√3", "3√8"],
          answer: 1,
          topic: "Reële getalle & wortelvorme"
        },
        {
          type: "input",
          text: "Vereenvoudig: √(25/4)",
          answer: "5/2",
          altAnswers: ["2.5", "2,5"],
          topic: "Reële getalle & wortelvorme"
        },
        {
          type: "mc",
          text: "Tussen watter twee opeenvolgende heelgetalle lê √30?",
          options: ["4 en 5", "5 en 6", "6 en 7", "3 en 4"],
          answer: 1,
          topic: "Reële getalle & wortelvorme"
        },
        {
          type: "input",
          text: "Vereenvoudig: √(3 × 75)",
          answer: "15",
          topic: "Reële getalle & wortelvorme"
        },
        {
          type: "input",
          text: "Vereenvoudig volledig: √8 + √50 − √18 (eenvoudigste wortelvorm)",
          answer: "4√2",
          altAnswers: ["4sqrt2", "4√(2)"],
          topic: "Reële getalle & wortelvorme"
        },
        {
          type: "input",
          text: "'n Vierkantige teël het 'n oppervlakte van 200 cm². Bepaal die lengte van sy sy in eenvoudigste wortelvorm (in cm).",
          answer: "10√2",
          altAnswers: ["10sqrt2", "10√2 cm"],
          topic: "Reële getalle & wortelvorme"
        }
      ]
    },
    {
      id: 101,
      chapter: 1,
      name: "Produkte & faktorisering",
      fullName: "Algebraïese produkte, faktorisering, en vereenvoudiging van breuke",
      lesson: {
        heading: "Produkte, faktorisering, en algebraïese breuke",
        sub: "Hoofstuk 1 · Onderwerp 2",
        body: `
          <p>Om <strong>produkte</strong> uit te vermenigvuldig en die proses om te keer deur <strong>faktorisering</strong> is fundamentele algebravaardighede.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Sleutel produkttipes</div>
            <p>
              <strong>Distributief:</strong> <span class="math">a(b + c) = ab + ac</span><br>
              <strong>FOIL / binoom × binoom:</strong> <span class="math">(a + b)(c + d) = ac + ad + bc + bd</span><br>
              <strong>Verskil van kwadrate:</strong> <span class="math">(a + b)(a − b) = a² − b²</span><br>
              <strong>Volkome vierkant-trinome:</strong> <span class="math">(a ± b)² = a² ± 2ab + b²</span><br>
              <strong>Som/verskil van kubusse:</strong> <span class="math">a³ ± b³ = (a ± b)(a² ∓ ab + b²)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Faktoriseringstrategieë (in volgorde)</div>
            <p>
              1. <strong>GGD</strong> — kontroleer altyd eers.<br>
              2. <strong>Verskil van twee kwadrate:</strong> <span class="math">a² − b²</span><br>
              3. <strong>Trinoom:</strong> <span class="math">ax² + bx + c</span> → vind faktore van ac wat optel tot b<br>
              4. <strong>Groepering</strong> — vir uitdrukkings met vier terme
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Faktoriseer volledig</div>
            <p><strong>(a)</strong> <span class="math">6x² − 24</span><br>
            = <span class="math">6(x² − 4) = 6(x+2)(x−2)</span></p>
            <p><strong>(b)</strong> <span class="math">x² − 5x + 6</span><br>
            Faktore van 6 wat optel tot −5: (−2)(−3) ✓<br>
            = <span class="math">(x − 2)(x − 3)</span></p>
            <p><strong>(c)</strong> <span class="math">2x² + 5x − 3</span><br>
            ac = −6; faktore: +6 en −1 → verdeel die middelste term:<br>
            = <span class="math">2x² + 6x − x − 3 = 2x(x + 3) − 1(x + 3) = (2x − 1)(x + 3)</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Vereenvoudiging van algebraïese breuke</div>
            <p>Faktoriseer die teller en noemer, en kanselleer dan gemeenskaplike faktore.<br>
            <strong>Waarskuwing:</strong> jy kan slegs <em>faktore</em> kanselleer, nooit terme nie.<br>
            Voorbeeld: <span class="math">(x² − 9)/(x + 3) = (x+3)(x−3)/(x+3) = x − 3</span>, waar <span class="math">x ≠ −3</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kwadratiese Faktoriseerder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer heelgetalwaardes in vir <strong>a</strong>, <strong>b</strong>, <strong>c</strong> in ax² + bx + c.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (≠ 0)</div>
                <input id="g10c1fa" type="number" value="1"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div>
                <input id="g10c1fb" type="number" value="-5"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div>
                <input id="g10c1fc" type="number" value="6"
                  style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c1fBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Faktoriseer
              </button>
            </div>
            <div id="g10c1fOut" style="font-size:14px;line-height:2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gcd(a,b){a=Math.abs(a);b=Math.abs(b);return b===0?a:gcd(b,a%b);}
              function fmtExpr(a,b,c){
                let s=(a===1?'x²':a===-1?'−x²':a+'x²');
                if(b>0)s+='+'+b+'x'; else if(b<0)s+=b+'x';
                if(c>0)s+='+'+c; else if(c<0)s+=c;
                return s;
              }
              function fmtFactor(m,n){
                // (mx + n)
                let xs=(m===1?'x':m===-1?'−x':m+'x');
                let cs=n>0?' + '+n:n<0?' − '+Math.abs(n):'';
                return '('+xs+cs+')';
              }
              function findFactors(a,b,c){
                // Find integers m,n,p,q: (mx+n)(px+q) with mp=a, nq=c, mq+np=b
                const lim=Math.max(50,Math.abs(c));
                for(let m=1;m<=Math.abs(a);m++){
                  if(a%m!==0)continue;
                  const p=a/m;
                  for(let n=-lim;n<=lim;n++){
                    if(n===0)continue;
                    if(c%n!==0)continue;
                    const q=c/n;
                    if(m*q+n*p===b) return [m,n,p,q];
                  }
                  const mn=-m;
                  const pn=-p;
                  for(let n=-lim;n<=lim;n++){
                    if(n===0)continue;
                    if(c%n!==0)continue;
                    const q=c/n;
                    if(mn*q+n*pn===b) return [mn,n,pn,q];
                  }
                }
                return null;
              }
              function run(){
                const a=parseInt(document.getElementById('g10c1fa').value);
                const b=parseInt(document.getElementById('g10c1fb').value);
                const c=parseInt(document.getElementById('g10c1fc').value);
                const out=document.getElementById('g10c1fOut');
                if(isNaN(a)||isNaN(b)||isNaN(c)){out.innerHTML='<span style="color:#fca5a5;">Voer heelgetalle in vir a, b en c.</span>';return;}
                if(a===0){out.innerHTML="<span style=\"color:#fca5a5;\">a kan nie 0 wees nie — dit is nie 'n kwadratiese uitdrukking nie.</span>";return;}
                const expr=fmtExpr(a,b,c);
                const disc=b*b-4*a*c;
                const discSqrt=Math.sqrt(Math.abs(disc));
                const isPerf=disc>=0&&Math.round(discSqrt)**2===disc;
                let html='<span style="color:rgba(221,225,240,0.50);">Uitdrukking: </span><span style="color:#fcd34d;">'+expr+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Δ = b²−4ac = ('+b+')²−4('+a+')('+c+') = '+disc+'</span><br>';
                if(disc<0){
                  html+='<span style="color:#fca5a5;">Δ &lt; 0 — geen reële faktore nie</span>';
                } else if(!isPerf){
                  const r1=(-b+Math.sqrt(disc))/(2*a), r2=(-b-Math.sqrt(disc))/(2*a);
                  html+="<span style=\"color:#fca5a5;\">Δ is nie 'n volkome vierkant nie — kan nie oor ℤ faktoriseer nie</span><br>";
                  html+='<span style="color:rgba(221,225,240,0.50);">Irrasionale wortels ≈ '+r1.toFixed(3)+' en '+r2.toFixed(3)+'</span>';
                } else {
                  const f=findFactors(a,b,c);
                  if(f){
                    const [m,n,p,q]=f;
                    const h=gcd(gcd(Math.abs(m),Math.abs(n)),gcd(Math.abs(p),Math.abs(q)));
                    let factored=fmtFactor(m,n)+fmtFactor(p,q);
                    html+='<span style="color:#6ee7b7;">Gefaktoriseerde vorm: </span><span style="color:#fcd34d;">'+factored+'</span>';
                    if(disc===0) html+='<span style="color:rgba(221,225,240,0.50);"> — volkome vierkant-trinoom</span>';
                  } else {
                    const r1=(-b+Math.sqrt(disc))/(2*a), r2=(-b-Math.sqrt(disc))/(2*a);
                    html+='<span style="color:#6ee7b7;">Wortels: </span><span style="color:#fcd34d;">x = '+r1.toFixed(4)+' of x = '+r2.toFixed(4)+'</span>';
                  }
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c1fBtn').addEventListener('click',run);
              ['g10c1fa','g10c1fb','g10c1fc'].forEach(id=>{
                document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              });
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die diskriminant Δ = b² − 4ac vertel jou alles: <strong>Δ &gt; 0</strong> (twee reële faktore), <strong>Δ = 0</strong> (volkome vierkant), <strong>Δ &lt; 0</strong> (geen reële faktore nie).</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vermenigvuldig uit: (2x − 3)²",
          options: ["4x² − 9", "4x² − 6x + 9", "4x² − 12x + 9", "4x² + 12x + 9"],
          answer: 2,
          topic: "Produkte & faktorisering"
        },
        {
          type: "mc",
          text: "Faktoriseer: 3x² − 48",
          options: ["3(x² − 16)", "3(x − 4)(x + 4)", "3(x − 4)²", "(3x − 12)(x + 4)"],
          answer: 1,
          topic: "Produkte & faktorisering"
        },
        {
          type: "input",
          text: "Vereenvoudig: (x² − x − 6)/(x − 3)",
          answer: "x+2",
          altAnswers: ["x + 2"],
          topic: "Produkte & faktorisering"
        },
        {
          type: "mc",
          text: "Faktoriseer: 6x² + x − 2",
          options: ["(3x − 1)(2x + 2)", "(3x + 2)(2x − 1)", "(6x − 1)(x + 2)", "(2x + 1)(3x − 2)"],
          answer: 1,
          topic: "Produkte & faktorisering"
        },
        {
          type: "mc",
          text: "Watter uitdrukking is ekwivalent aan (a³ − 8)?",
          options: ["(a − 2)³", "(a − 2)(a² + 2a + 4)", "(a − 2)(a² − 2a + 4)", "(a + 2)(a² − 4)"],
          answer: 1,
          topic: "Produkte & faktorisering"
        },
        {
          type: "mc",
          text: "Faktoriseer volledig (wenk: groepeer eers in pare): x³ − x² − 4x + 4",
          options: ["(x − 1)(x − 2)(x + 2)", "(x − 1)(x² − 4x)", "(x − 2)²(x + 1)", "(x + 1)(x − 2)²"],
          answer: 0,
          topic: "Produkte & faktorisering"
        },
        {
          type: "input",
          text: "Vereenvoudig volledig: (2x² − x − 6)/(4x² − 9)",
          answer: "(x-2)/(2x-3)",
          altAnswers: ["(x−2)/(2x−3)"],
          topic: "Produkte & faktorisering"
        }
      ]
    },
    {
      id: 102,
      chapter: 1,
      name: "Vermenigvuldiging van binome met trinome",
      fullName: "Uitvermenigvuldiging van die produk van 'n binoom en 'n trinoom",
      lesson: {
        heading: "Vermenigvuldiging van 'n binoom met 'n trinoom",
        sub: "Hoofstuk 1 · Onderwerp 3",
        body: `
          <p>Graad 10 brei die distributiewe wet uit na produkte van 'n <strong>binoom</strong> (2 terme) en 'n <strong>trinoom</strong> (3 terme). Die metode is dieselfde as FOIL, net met meer terme om na te hou.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die metode — verdeel elke term uit</div>
            <p>Om <span class="math">(a + b)(c + d + e)</span> uit te vermenigvuldig, vermenigvuldig <strong>elke term</strong> van die binoom met <strong>elke term</strong> van die trinoom:<br>
            <span class="math">(a + b)(c + d + e) = ac + ad + ae + bc + bd + be</span><br>
            Dit gee <strong>6 produkte</strong> voordat jy vereenvoudig — versamel altyd gelyksoortige terme aan die einde.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vermenigvuldig uit (x + 2)(x² − 3x + 4)</div>
            <p>
              <span class="math">x(x² − 3x + 4) = x³ − 3x² + 4x</span><br>
              <span class="math">2(x² − 3x + 4) = 2x² − 6x + 8</span><br>
              Tel op: <span class="math">x³ − 3x² + 4x + 2x² − 6x + 8</span><br>
              Versamel gelyksoortige terme: <span class="math">x³ − x² − 2x + 8</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Spesiale geval: (a + b)(a² − ab + b²)</div>
            <p>Hierdie spesifieke patroon vereenvoudig altyd tot <span class="math">a³ + b³</span> — dit is die omgekeerde van die som-van-kubusse-faktorisering wat jy in die volgende onderwerp sal teëkom.<br>
            Kontroleer met a = x, b = 2: <span class="math">(x + 2)(x² − 2x + 4) = x³ + 8</span> ✓ (verifieer deur uit te vermenigvuldig)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Bly georganiseerd</div>
            <p>Skryf die binoom se terme langs die kant en die trinoom se terme oor die bokant soos 'n klein rooster — dit voorkom dat jy 'n produk mis, veral met negatiewe tekens.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Let noukeurig op jou tekens wanneer die binoom of trinoom aftrekking bevat — 'n algemene fout is om 'n negatiewe teken halfpad deur ses vermenigvuldigings te laat val.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vermenigvuldig uit: (x + 1)(x² + 2x − 3)",
          options: ["x³ + 3x² − x − 3", "x³ + 2x² − 3x − 3", "x³ + x² − x − 3", "x³ + 3x² + x − 3"],
          answer: 0,
          topic: "Vermenigvuldiging van binome met trinome"
        },
        {
          type: "mc",
          text: "Vermenigvuldig uit: (x − 2)(x² + 2x + 4)",
          options: ["x³ − 8", "x³ + 8", "x³ − 4x² + 8", "x³ − 2x² − 8"],
          answer: 0,
          topic: "Vermenigvuldiging van binome met trinome"
        },
        {
          type: "input",
          text: "Vermenigvuldig uit en vereenvoudig: (2x + 1)(x² − x + 3). Gee die koëffisiënt van x².",
          answer: "-1",
          altAnswers: ["−1"],
          topic: "Vermenigvuldiging van binome met trinome"
        },
        {
          type: "mc",
          text: "Vermenigvuldig uit: (a − b)(a² + ab + b²)",
          options: ["a³ − b³", "a³ + b³", "a³ − 2ab² − b³", "a³ − a²b − b³"],
          answer: 0,
          topic: "Vermenigvuldiging van binome met trinome"
        },
        {
          type: "input",
          text: "Vermenigvuldig (x + 3)(2x² − x + 5) uit en gee die konstante term.",
          answer: "15",
          topic: "Vermenigvuldiging van binome met trinome"
        },
        {
          type: "input",
          text: "Vermenigvuldig uit en vereenvoudig: (x + 2)(x² − 3x + 1) − (x − 1)(x² + x − 2). Gee die koëffisiënt van x² in die vereenvoudigde antwoord.",
          answer: "-1",
          altAnswers: ["−1"],
          topic: "Vermenigvuldiging van binome met trinome"
        }
      ]
    },
    {
      id: 103,
      chapter: 1,
      name: "Som en verskil van kubusse",
      fullName: "Faktorisering van die som en verskil van twee kubusse",
      lesson: {
        heading: "Faktorisering van die som en verskil van twee kubusse",
        sub: "Hoofstuk 1 · Onderwerp 4",
        body: `
          <p>Net soos <span class="math">a² − b²</span> as 'n verskil van kwadrate faktoriseer, het kubieke uitdrukkings van die vorm <span class="math">a³ ± b³</span> hul eie standaardfaktorisering.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die kubus-faktoriseringformules</div>
            <p>
              <strong>Som van kubusse:</strong> <span class="math">a³ + b³ = (a + b)(a² − ab + b²)</span><br>
              <strong>Verskil van kubusse:</strong> <span class="math">a³ − b³ = (a − b)(a² + ab + b²)</span><br><br>
              Geheuewenk: <em>"dieselfde, teenoorgesteld, altyd positief"</em> — die teken in die eerste hakies stem ooreen met die oorspronklike teken; die middelste teken in die trinoom is teenoorgesteld; die laaste term is altyd <strong>+</strong>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Faktoriseer x³ + 27</div>
            <p>
              Herken <span class="math">27 = 3³</span>, so <span class="math">a = x, b = 3</span>.<br>
              <span class="math">x³ + 27 = (x + 3)(x² − 3x + 9)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Faktoriseer 8x³ − 125</div>
            <p>
              <span class="math">8x³ = (2x)³</span> en <span class="math">125 = 5³</span>, so <span class="math">a = 2x, b = 5</span>.<br>
              <span class="math">8x³ − 125 = (2x − 5)(4x² + 10x + 25)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Algemene kubusse om te herken</div>
            <p>1, 8, 27, 64, 125, 216, 343, 512, 729, 1000 — die kubusse van 1 tot 10. As jy dit onmiddellik raaksien, maak dit kubus-faktorisering baie vinniger.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kubus-Faktoriseerder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die koëffisiënte in vir <strong>a</strong> en <strong>b</strong> in a³ ± b³ (soos in (ka)³ ± (mb)³ met eenvoudige heelgetalle) om die faktorisering te sien.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (koëffisiënt van x)</div>
                <input id="g10c1cba" type="number" value="2" min="1"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (konstante)</div>
                <input id="g10c1cbb" type="number" value="5" min="1"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Teken</div>
                <select id="g10c1cbop"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="plus">+</option>
                  <option value="minus">−</option>
                </select>
              </div>
              <button id="g10c1cbBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Faktoriseer
              </button>
            </div>
            <div id="g10c1cbOut" style="font-size:14px;line-height:2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const a=parseInt(document.getElementById('g10c1cba').value);
                const b=parseInt(document.getElementById('g10c1cbb').value);
                const op=document.getElementById('g10c1cbop').value;
                const out=document.getElementById('g10c1cbOut');
                if(!a||!b||a<1||b<1){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe heelgetalle in vir a en b.</span>';return;}
                const a3=a*a*a, b3=b*b*b;
                const isPlus=op==='plus';
                const expr=(a===1?'x³':'('+a+'x)³')+(isPlus?' + ':' − ')+b+'³';
                const exprNum=(a===1?'x³':a3+'x³')+(isPlus?' + ':' − ')+b3;
                const firstSign=isPlus?'+':'−';
                const midSign=isPlus?'−':'+';
                const firstBracket='('+(a===1?'x':a+'x')+' '+firstSign+' '+b+')';
                const ax2=a===1?'x²':a3+'x²'.replace('x²',''); // not used directly
                const sqTermCoef=a*a;
                const secondBracket='('+(sqTermCoef===1?'x²':sqTermCoef+'x²')+' '+midSign+' '+(a*b===1?'x':(a*b)+'x')+' + '+(b*b)+')';
                let html='<span style="color:rgba(221,225,240,0.50);">Uitdrukking: </span><span style="color:#fcd34d;">'+exprNum+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Herken as kubusse: </span><span style="color:#fcd34d;">'+expr+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Pas die '+(isPlus?'som':'verskil')+'-van-kubusse-formule toe:</span><br>';
                html+='<span style="color:#6ee7b7;">'+firstBracket+secondBracket+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c1cbBtn').addEventListener('click',run);
              document.getElementById('g10c1cbop').addEventListener('change',run);
              ['g10c1cba','g10c1cbb'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die trinoomfaktor <span class="math">a² ∓ ab + b²</span> faktoriseer nooit verder oor die heelgetalle nie — moenie tyd mors om dit te probeer nie.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Faktoriseer: x³ + 8",
          options: ["(x + 2)(x² − 2x + 4)", "(x + 2)(x² + 2x + 4)", "(x + 2)³", "(x − 2)(x² + 2x + 4)"],
          answer: 0,
          topic: "Som en verskil van kubusse"
        },
        {
          type: "mc",
          text: "Faktoriseer: x³ − 64",
          options: ["(x − 4)(x² + 4x + 16)", "(x − 4)(x² − 4x + 16)", "(x + 4)(x² − 4x + 16)", "(x − 4)³"],
          answer: 0,
          topic: "Som en verskil van kubusse"
        },
        {
          type: "input",
          text: "Faktoriseer 27x³ + 1. Wat is die konstante term binne die trinoomfaktor?",
          answer: "1",
          topic: "Som en verskil van kubusse"
        },
        {
          type: "mc",
          text: "Faktoriseer: 8x³ − 125",
          options: ["(2x − 5)(4x² + 10x + 25)", "(2x − 5)(4x² − 10x + 25)", "(2x + 5)(4x² − 10x + 25)", "(2x − 5)(2x² + 5x + 25)"],
          answer: 0,
          topic: "Som en verskil van kubusse"
        },
        {
          type: "mc",
          text: "Wat is die korrekte eerste stap om 64 + x³y³ te faktoriseer?",
          options: ["Herken 64 = 4³ en x³y³ = (xy)³, pas som van kubusse toe", "Trek 'n gemeenskaplike faktor van x uit", "Dit kan nie gefaktoriseer word nie", "Herken dit as 'n verskil van kwadrate"],
          answer: 0,
          topic: "Som en verskil van kubusse"
        },
        {
          type: "mc",
          text: "Faktoriseer volledig: 3x³ − 3",
          options: ["3(x − 1)(x² + x + 1)", "3(x − 1)³", "(3x − 3)(x² + x + 1)", "3(x + 1)(x² − x + 1)"],
          answer: 0,
          topic: "Som en verskil van kubusse"
        }
      ]
    },
    {
      id: 104,
      chapter: 1,
      name: "Algebraïese breuke met kubusnoemers",
      fullName: "Vereenvoudiging van algebraïese breuke deur som/verskil-van-kubusse-faktorisering te gebruik",
      lesson: {
        heading: "Vereenvoudiging van algebraïese breuke met kubusgebaseerde noemers",
        sub: "Hoofstuk 1 · Onderwerp 5",
        body: `
          <p>Sodra jy <span class="math">a³ ± b³</span> kan faktoriseer, kan jy algebraïese breuke vereenvoudig waarvan die teller of noemer 'n som of verskil van kubusse is.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Metode</div>
            <p>
              1. Faktoriseer die teller en noemer volledig (soek na kubuspatrone).<br>
              2. Kanselleer enige <strong>gemeenskaplike faktore</strong> (nooit gemeenskaplike terme nie).<br>
              3. Gee die <strong>beperkings</strong> — waardes wat die oorspronklike noemer nul maak.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vereenvoudig (x³ − 8)/(x − 2)</div>
            <p>
              <span class="math">x³ − 8 = (x − 2)(x² + 2x + 4)</span><br>
              <span class="math">(x³ − 8)/(x − 2) = (x − 2)(x² + 2x + 4)/(x − 2) = x² + 2x + 4</span>, waar <span class="math">x ≠ 2</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vereenvoudig (x² − x − 6)/(x³ + 8)</div>
            <p>
              Teller: <span class="math">x² − x − 6 = (x − 3)(x + 2)</span><br>
              Noemer: <span class="math">x³ + 8 = (x + 2)(x² − 2x + 4)</span><br>
              <span class="math">= (x − 3)(x + 2) / [(x + 2)(x² − 2x + 4)] = (x − 3)/(x² − 2x + 4)</span>, waar <span class="math">x ≠ −2</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Bepaal beperkings</div>
            <p>Beperkings kom van die <strong>oorspronklike, onvereenvoudigde noemer</strong> — stel dit gelyk aan nul en los op. Selfs na kansellasie kan daardie waarde steeds nie ingevervang word nie.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Kontroleer voor kansellasie altyd dubbeld dat die trinoom wat oorbly (soos <span class="math">x² + 2x + 4</span>) regtig geen verdere gemeenskaplike faktore met die ander kant het nie — kubus-trinome faktoriseer nooit verder nie, maar verifieer altyd met die spesifieke getalle.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vereenvoudig: (x³ + 27)/(x + 3)",
          options: ["x² − 3x + 9", "x² + 3x + 9", "x² − 9", "x² + 9"],
          answer: 0,
          topic: "Algebraïese breuke met kubusnoemers"
        },
        {
          type: "input",
          text: "Vereenvoudig (x³ − 1)/(x − 1) en gee die koëffisiënt van x in jou antwoord.",
          answer: "1",
          topic: "Algebraïese breuke met kubusnoemers"
        },
        {
          type: "mc",
          text: "Vereenvoudig: (x² − 4)/(x³ − 8)",
          options: ["(x + 2)/(x² + 2x + 4)", "(x − 2)/(x² + 2x + 4)", "(x + 2)/(x² − 2x + 4)", "1/(x² + 2x + 4)"],
          answer: 0,
          topic: "Algebraïese breuke met kubusnoemers"
        },
        {
          type: "mc",
          text: "Vir (x³ + 8)/(x² − 4) is die beperking(s) op x:",
          options: ["x ≠ 2 en x ≠ −2", "x ≠ −2 slegs", "x ≠ 2 slegs", "x ≠ 0"],
          answer: 0,
          topic: "Algebraïese breuke met kubusnoemers"
        },
        {
          type: "input",
          text: "Vereenvoudig (2x³ + 2)/(x + 1) en gee die konstante term van die vereenvoudigde uitdrukking.",
          answer: "2",
          topic: "Algebraïese breuke met kubusnoemers"
        },
        {
          type: "input",
          text: "Vereenvoudig volledig: (x³ + 1)/(x² − 1)",
          answer: "(x²-x+1)/(x-1)",
          altAnswers: ["(x^2-x+1)/(x-1)", "(x² − x + 1)/(x − 1)"],
          topic: "Algebraïese breuke met kubusnoemers"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 1 Werkboek — Algebraïese Uitdrukkings",
    questions: [
      {
        number: 1,
        text: "Klassifiseer elkeen van die volgende as rasionaal of irrasionaal. Indien rasionaal, skryf dit as 'n breuk in eenvoudigste vorm.",
        parts: [
          { label: "a", text: "√144", marks: 1 },
          { label: "b", text: "0.363636…", marks: 2 },
          { label: "c", text: "π − 3", marks: 1 },
          { label: "d", text: "√(8/2)", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Vereenvoudig die volgende (wys alle berekeninge):",
        parts: [
          { label: "a", text: "√(12) + √(75) − √(27)", marks: 3 },
          { label: "b", text: "(3 + √5)(3 − √5)", marks: 2 },
          { label: "c", text: "(√2 + √3)²", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "Vermenigvuldig uit en vereenvoudig:",
        parts: [
          { label: "a", text: "(x + 4)(x − 4)", marks: 2 },
          { label: "b", text: "(2x − 1)(3x + 5)", marks: 3 },
          { label: "c", text: "(x + 2)³", marks: 4 }
        ]
      },
      {
        number: 4,
        text: "Faktoriseer volledig:",
        parts: [
          { label: "a", text: "5x² − 20", marks: 3 },
          { label: "b", text: "x² + 2x − 15", marks: 2 },
          { label: "c", text: "2x² − 7x + 3", marks: 3 },
          { label: "d", text: "x³ + 27", marks: 3 },
          { label: "e", text: "ax − ay + bx − by", marks: 3 }
        ]
      },
      {
        number: 5,
        text: "Vereenvoudig (gee beperkings):",
        parts: [
          { label: "a", text: "(x² − 4)/(x + 2)", marks: 3 },
          { label: "b", text: "(2x² + x − 3)/(2x + 3)", marks: 4 },
          { label: "c", text: "3/(x−1) + 2/(x+1)", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Rasionaal: 12",
        b: "Rasionaal: 4/11",
        c: "Irrasionaal",
        d: "Rasionaal: 2"
      },
      2: {
        a: "2√3 + 5√3 − 3√3 = 4√3",
        b: "9 − 5 = 4",
        c: "2 + 2√6 + 3 = 5 + 2√6"
      },
      3: {
        a: "x² − 16",
        b: "6x² + 7x − 5",
        c: "x³ + 6x² + 12x + 8"
      },
      4: {
        a: "5(x−2)(x+2)",
        b: "(x+5)(x−3)",
        c: "(2x−1)(x−3)",
        d: "(x+3)(x²−3x+9)",
        e: "(a+b)(x−y)"
      },
      5: {
        a: "x−2, x≠−2",
        b: "(x−1), x≠−3/2",
        c: "(5x+1)/((x−1)(x+1))"
      }
    }
  }
});
