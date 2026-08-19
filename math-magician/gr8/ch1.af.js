// Math Magician — Grade 8, Chapter 1 data (Afrikaans)
// Auto-loaded on demand by math-magician-gr8.html

MathMagician.registerChapter(1, {
  topics: [
{
    id: 101,
    name: "Die vier bewerkings",
    fullName: "Die vier bewerkings op heelgetalle",
    lesson: {
      heading: "Die vier bewerkings op heelgetalle",
      sub: "Hoofstuk 1 · Onderwerp 1",
      body: `
        <p>Die <strong>vier bewerkings</strong> is die boustene van alle wiskunde: <em>optelling</em>, <em>aftrekking</em>, <em>vermenigvuldiging</em>, en <em>deling</em>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Definisies</div>
          <p>
            <strong>Optelling (+)</strong> — die kombinering van twee of meer hoeveelhede.<br>
            <strong>Aftrekking (−)</strong> — die bepaling van die verskil tussen hoeveelhede.<br>
            <strong>Vermenigvuldiging (×)</strong> — herhaalde optelling van gelyke groepe.<br>
            <strong>Deling (÷)</strong> — verdeling in gelyke groepe, die inverse van vermenigvuldiging.
          </p>
        </div>
        <p>Wanneer 'n berekening meer as een bewerking bevat, volg ons die <strong>volgorde van bewerkings (BODMAS)</strong>:</p>
        <div class="math-block">B — Hakies eerste
O — Orders (magte/wortels)
D — Deling  } van links na regs
M — Vermenigvuldiging }
A — Optelling  } van links na regs
S — Aftrekking }</div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken: <span class="math">3 + 4 × 2 − (6 ÷ 3)</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Hakies eerste: <span class="math">6 ÷ 3 = 2</span> → die uitdrukking word <span class="math">3 + 4 × 2 − 2</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Vermenigvuldiging volgende: <span class="math">4 × 2 = 8</span> → die uitdrukking word <span class="math">3 + 8 − 2</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Van links na regs: <span class="math">3 + 8 = 11</span>, dan <span class="math">11 − 2 = 9</span></span></div>
          <div class="example-step"><span class="step-num">5</span><span><strong>Antwoord: 9</strong></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Skryf altyd elke stap uit. In eksamens word metodepunte toegeken selfs al is jou finale antwoord verkeerd.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Rekenkundige Oefening</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n bewerking en 'n moeilikheidsgraad, en beantwoord dan soveel as wat jy kan!</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:center;">
              <select id="drillOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="add">+ Optelling</option>
                <option value="sub">− Aftrekking</option>
                <option value="mul">× Vermenigvuldiging</option>
                <option value="div">÷ Deling</option>
              </select>
              <select id="drillDiff" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="easy">Maklik (1–10)</option>
                <option value="med" selected>Gemiddeld (1–20)</option>
                <option value="hard">Moeilik (1–100)</option>
              </select>
              <button id="drillNew" style="padding:6px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Nuwe vraag</button>
            </div>
            <div id="drillQ" style="font-family:JetBrains Mono,monospace;font-size:20px;color:#fcd34d;margin-bottom:12px;"></div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <input id="drillAns" type="number" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="drillCheck" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#d97706,#f59e0b);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Kontroleer</button>
              <span id="drillScore" style="font-family:JetBrains Mono,monospace;font-size:11px;color:rgba(221,225,240,0.45);"></span>
            </div>
            <div id="drillFb" style="margin-top:8px;font-family:JetBrains Mono,monospace;font-size:13px;"></div>
          </div>
          <script>
          (function(){
            let a,b,ans,score=0,total=0;
            function rnd(max){return Math.floor(Math.random()*max)+1;}
            function newQ(){
              const op=document.getElementById('drillOp').value;
              const diff=document.getElementById('drillDiff').value;
              const max=diff==='easy'?10:diff==='med'?20:100;
              a=rnd(max); b=rnd(max);
              if(op==='sub'&&b>a){[a,b]=[b,a];}
              if(op==='div'){b=rnd(diff==='easy'?5:diff==='med'?10:12);a=b*rnd(diff==='easy'?5:diff==='med'?10:12);}
              const ops={add:'+',sub:'−',mul:'×',div:'÷'};
              ans=op==='add'?a+b:op==='sub'?a-b:op==='mul'?a*b:a/b;
              document.getElementById('drillQ').textContent=a+' '+ops[op]+' '+b+' = ?';
              document.getElementById('drillAns').value='';
              document.getElementById('drillFb').textContent='';
              document.getElementById('drillAns').focus();
            }
            function check(){
              const v=parseFloat(document.getElementById('drillAns').value);
              if(isNaN(v))return;
              total++;
              const ok=Math.abs(v-ans)<0.001;
              if(ok)score++;
              document.getElementById('drillFb').innerHTML=ok
                ?'<span style="color:#6ee7b7;">✓ Korrek!</span>'
                :'<span style="color:#fca5a5;">✗ Antwoord was '+ans+'</span>';
              document.getElementById('drillScore').textContent='Telling: '+score+'/'+total;
              setTimeout(newQ,900);
            }
            document.getElementById('drillNew').addEventListener('click',newQ);
            document.getElementById('drillCheck').addEventListener('click',check);
            document.getElementById('drillAns').addEventListener('keydown',e=>{if(e.key==='Enter')check();});
            document.getElementById('drillOp').addEventListener('change',newQ);
            document.getElementById('drillDiff').addEventListener('change',newQ);
            newQ();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Bereken: <span class='math'>5 + 3 × 4</span>", options: ["32", "17", "20", "27"], answer: 1, topic: "BODMAS" },
      { type: "mc", text: "Wat is <span class='math'>(12 + 8) ÷ 4 − 2</span>?", options: ["3", "5", "7", "1"], answer: 0, topic: "BODMAS" },
      { type: "input", text: "Bereken: <span class='math'>3 × (4 + 6) − 5 × 2</span>", answer: "20", topic: "BODMAS" },
      { type: "mc", text: "Watter bewerking word eerste uitgevoer in <span class='math'>8 ÷ 2 + 3 × 4</span>?", options: ["Optelling", "Deling en vermenigvuldiging (van links na regs)", "Vermenigvuldiging", "Aftrekking"], answer: 1, topic: "BODMAS" },
      { type: "input", text: "Bereken: <span class='math'>100 − 4² + (3 × 5)</span>", answer: "99", topic: "BODMAS" },
      { type: "mc", text: "Voeg een paar hakies by <span class='math'>3 + 4 × 2 − 1</span> in sodat die antwoord gelyk is aan 13. Watter weergawe is korrek?", options: ["(3 + 4) × 2 − 1", "3 + (4 × 2 − 1)", "3 + 4 × (2 − 1)", "(3 + 4 × 2) − 1"], answer: 0, topic: "BODMAS" },
    ]
  },
  {
    id: 102,
    name: "Eienskappe van heelgetalle",
    fullName: "Die eienskappe van heelgetalle",
    lesson: {
      heading: "Eienskappe van heelgetalle",
      sub: "Hoofstuk 1 · Onderwerp 2",
      body: `
        <p>Heelgetalle het spesiale <strong>eienskappe</strong> wat berekeninge makliker maak en ons help om verhoudings tussen getalle te verstaan.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Sleutel-eienskappe</div>
          <p>
            <strong>Kommutatief:</strong> volgorde maak nie saak vir + en × nie<br>
            <span class="math">a + b = b + a</span> &nbsp;&nbsp; <span class="math">a × b = b × a</span><br><br>
            <strong>Assosiatief:</strong> groepering maak nie saak vir + en × nie<br>
            <span class="math">(a + b) + c = a + (b + c)</span><br><br>
            <strong>Distributief:</strong> vermenigvuldiging versprei oor optelling<br>
            <span class="math">a × (b + c) = a×b + a×c</span><br><br>
            <strong>Identiteitselemente:</strong> <span class="math">a + 0 = a</span> &nbsp;&nbsp; <span class="math">a × 1 = a</span><br><br>
            <strong>Nul-eienskap:</strong> <span class="math">a × 0 = 0</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeeld — distributiewe eienskap</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken <span class="math">7 × 53</span> deur die distributiewe eienskap te gebruik.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Verdeel 53: <span class="math">7 × (50 + 3)</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">= 7×50 + 7×3 = 350 + 21 = 371</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Die distributiewe eienskap is die grondslag van hoofrekene en later algebra. As jy dit nou onder die knie kry, spaar dit later baie tyd.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Watter eienskap word hier getoon: <span class='math'>4 × (3 + 7) = 4×3 + 4×7</span>?", options: ["Kommutatief", "Assosiatief", "Distributief", "Identiteit"], answer: 2, topic: "Eienskappe" },
      { type: "mc", text: "Wat is die identiteitselement vir vermenigvuldiging?", options: ["0", "1", "−1", "10"], answer: 1, topic: "Eienskappe" },
      { type: "input", text: "Gebruik die distributiewe eienskap om <span class='math'>6 × 48</span> te bereken", answer: "288", topic: "Eienskappe" },
      { type: "mc", text: "Watter vergelyking toon die kommutatiewe eienskap van optelling?", options: ["(2+3)+4 = 2+(3+4)", "5+0 = 5", "3+7 = 7+3", "3×(2+1) = 6+3"], answer: 2, topic: "Eienskappe" },
      { type: "input", text: "As <span class='math'>a × 0 = ?</span> vir enige heelgetal a, wat is die antwoord?", answer: "0", topic: "Eienskappe" },
      { type: "input", text: "Gebruik die distributiewe eienskap agteruit om <span class='math'>34 × 17 + 34 × 3</span> te vereenvoudig sonder om 34 × 17 direk te vermenigvuldig.", answer: "680", topic: "Eienskappe" },
    ]
  },
  {
    id: 103,
    name: "Berekeningstegnieke",
    fullName: "Berekeningstegnieke",
    lesson: {
      heading: "Berekeningstegnieke",
      sub: "Hoofstuk 1 · Onderwerp 3",
      body: `
        <p>Slim berekeningstegnieke help jou om vinniger en met minder foute te werk, veral sonder 'n sakrekenaar.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Sleuteltegnieke</div>
          <p>
            <strong>Afronding:</strong> benader 'n getal tot 'n gegewe plekwaarde.<br>
            <strong>Skatting:</strong> gebruik afgeronde getalle om te kyk of 'n antwoord redelik is.<br>
            <strong>Opbreek van getalle:</strong> gebruik die distributiewe/assosiatiewe eienskap.<br>
            <strong>Kompensasie:</strong> rond op, trek dan die ekstra af.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Kompensasiemetode</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken <span class="math">258 + 99</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Rond 99 af tot 100: <span class="math">258 + 100 = 358</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Ons het 1 te veel bygetel, trek dus af: <span class="math">358 − 1 = 357</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Afrond om te skat</div>
          <div class="example-step"><span class="step-num">1</span><span>Skat <span class="math">487 × 23</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Rond af: <span class="math">500 × 20 = 10 000</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Die werklike antwoord (11 201) is naby — die skatting bevestig dat daar geen groot fout is nie.</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Skat altyd voordat jy bereken. As jou antwoord ver van jou skatting af is, het jy waarskynlik 'n fout gemaak.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Rond 3 478 af tot die naaste honderd.", options: ["3 400", "3 500", "3 000", "3 480"], answer: 1, topic: "Afronding" },
      { type: "input", text: "Gebruik kompensasie om <span class='math'>346 + 199</span> te bereken", answer: "545", topic: "Kompensasie" },
      { type: "mc", text: "Skat <span class='math'>612 × 48</span> deur elke getal af te rond tot die naaste tiental.", options: ["24 000", "30 000", "29 376", "25 000"], answer: 1, topic: "Skatting" },
      { type: "input", text: "Rond 7 849 af tot die naaste duisend.", answer: "8000", topic: "Afronding" },
      { type: "mc", text: "Watter berekening gebruik die kompensasiemetode korrek vir <span class='math'>157 + 98</span>?", options: ["160 + 100 − 5", "157 + 100 − 2", "155 + 100", "157 + 98"], answer: 1, topic: "Kompensasie" },
      { type: "mc", text: "Skat <span class='math'>512 × 289 ÷ 48</span> deur elke getal af te rond tot 1 beduidende syfer. Watter een is die naaste?", options: ["3 000", "6 000", "1 500", "4 500"], answer: 0, topic: "Skatting" },
    ]
  },
  {
    id: 104,
    name: "Vereenvoudiging van berekeninge",
    fullName: "Metodes om berekeninge te vereenvoudig",
    lesson: {
      heading: "Metodes om berekeninge te vereenvoudig",
      sub: "Hoofstuk 1 · Onderwerp 4",
      body: `
        <p>Sommige berekeninge lyk ingewikkeld, maar kan vereenvoudig word deur <strong>slim getalkeuses</strong> en bekende verhoudings te gebruik.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Vereenvoudigingstrategieë</div>
          <p>
            <strong>Faktorisering:</strong> identifiseer gemeenskaplike faktore om te vereenvoudig.<br>
            <strong>Kansellasie:</strong> in breuke, kanselleer gemeenskaplike faktore bo en onder.<br>
            <strong>Herrangskikking:</strong> verander die volgorde om die berekening makliker te maak (kommutatief/assosiatief).<br>
            <strong>Opsplitsing:</strong> breek ingewikkelde getalle op in gerieflike dele.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken <span class="math">25 × 48 × 4</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Herrangskik: <span class="math">25 × 4 × 48 = 100 × 48</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">= 4 800</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Vereenvoudiging van 'n breuk</div>
          <div class="example-step"><span class="step-num">1</span><span>Vereenvoudig <span class="math">36 ÷ 48</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>GGD van 36 en 48 is 12: <span class="math">36÷12 = 3</span>, <span class="math">48÷12 = 4</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Antwoord: <span class="math">3/4</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Soek na pare wat vermenigvuldig tot 'n ronde getal soos 100, 1000, of 'n veelvoud van 10. Dit maak hoofrekene maklik.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Vereenvoudig <span class='math'>25 × 32 × 4</span> deur slim te herrangskik.", options: ["3 200", "3 600", "2 800", "3 000"], answer: 0, topic: "Vereenvoudiging" },
      { type: "input", text: "Wat is die vereenvoudigde vorm van <span class='math'>72 ÷ 96</span>? Gee as 'n breuk (bv. 3/4)", answer: "3/4", topic: "Vereenvoudiging" },
      { type: "mc", text: "Watter nuttige paar sien jy in <span class='math'>125 × 48 × 8</span>?", options: ["125 × 8 = 1000", "48 × 8 = 384", "125 × 48 = maklik", "Geen"], answer: 0, topic: "Vereenvoudiging" },
      { type: "input", text: "Bereken <span class='math'>125 × 8 × 7</span> deur slim te groepeer.", answer: "7000", topic: "Vereenvoudiging" },
      { type: "input", text: "Vereenvoudig <span class='math'>45 × 8 ÷ 9</span> deur gemeenskaplike faktore te kanselleer voordat jy vermenigvuldig.", answer: "40", topic: "Vereenvoudiging" },
    ]
  },
  {
    id: 105,
    name: "Faktore en veelvoude",
    fullName: "Faktore en veelvoude van heelgetalle",
    lesson: {
      heading: "Faktore en veelvoude van heelgetalle",
      sub: "Hoofstuk 1 · Onderwerp 5",
      body: `
        <p><strong>Faktore</strong> en <strong>veelvoude</strong> is fundamenteel wanneer jy met breuke, KGV, GGD, en die vereenvoudiging van uitdrukkings werk.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Definisies</div>
          <p>
            <strong>Faktor:</strong> 'n getal wat presies in 'n ander deel (geen res nie).<br>
            <em>Faktore van 12: 1, 2, 3, 4, 6, 12</em><br><br>
            <strong>Veelvoud:</strong> die resultaat wanneer 'n getal met 'n positiewe heelgetal vermenigvuldig word.<br>
            <em>Veelvoude van 5: 5, 10, 15, 20, 25 …</em><br><br>
            <strong>Priemgetal:</strong> 'n getal met presies 2 faktore (1 en homself).<br>
            <em>Priemgetalle: 2, 3, 5, 7, 11, 13, 17 …</em><br><br>
            <strong>GGD</strong> (Grootste Gemene Deler) — die grootste faktor wat twee getalle deel.<br>
            <strong>KGV</strong> (Kleinste Gemene Veelvoud) — die kleinste veelvoud wat twee getalle deel.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Bepaal die GGD en KGV van 12 en 18</div>
          <div class="example-step"><span class="step-num">1</span><span>Priemfaktorisering: <span class="math">12 = 2² × 3</span> &nbsp; <span class="math">18 = 2 × 3²</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>GGD: laagste mag van elke gedeelde priemfaktor: <span class="math">2¹ × 3¹ = 6</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>KGV: hoogste mag van elke priemfaktor: <span class="math">2² × 3² = 36</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Priemfaktorisering is die vinnigste metode vir beide GGD en KGV. Begin altyd deur die faktorboom op te bou.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Faktore, Veelvoude, GGD & KGV</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="fmA" type="number" value="12" min="1" max="999" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <input id="fmB" type="number" value="18" min="1" max="999" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="fmCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="fmOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){return b===0?a:gcd(b,a%b);}
            function factors(n){const f=[];for(let i=1;i<=n;i++)if(n%i===0)f.push(i);return f;}
            function calc(){
              const a=parseInt(document.getElementById('fmA').value)||1;
              const b=parseInt(document.getElementById('fmB').value)||1;
              const g=gcd(a,b);
              const l=a*b/g;
              const fa=factors(a); const fb=factors(b);
              const common=fa.filter(x=>fb.includes(x));
              document.getElementById('fmOut').innerHTML=[
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Faktore van '+a+':</span><span style="color:#a5b4fc;">'+fa.join(', ')+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Faktore van '+b+':</span><span style="color:#a5b4fc;">'+fb.join(', ')+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Gemeenskaplike faktore:</span><span style="color:#fbbf24;">'+common.join(', ')+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">GGD:</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">'+g+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">KGV:</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">'+l+'</span></div>',
              ].join('');
            }
            document.getElementById('fmCalc').addEventListener('click',calc);
            ['fmA','fmB'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Wat is die GGD van 24 en 36?", options: ["6", "12", "4", "9"], answer: 1, topic: "GGD/KGV" },
      { type: "input", text: "Wat is die KGV van 8 en 12?", answer: "24", topic: "GGD/KGV" },
      { type: "mc", text: "Watter een van die volgende is 'n priemgetal?", options: ["51", "57", "59", "55"], answer: 2, topic: "Priemgetalle" },
      { type: "mc", text: "Hoeveel faktore het 28?", options: ["4", "5", "6", "7"], answer: 2, topic: "Faktore" },
      { type: "input", text: "Skryf die priemfaktorisering van 60 (bv. 2x2x3x5)", answer: "2x2x3x5", topic: "Priemfaktore" },
      { type: "input", text: "Gebruik priemfaktorisering om die KGV van 90 en 126 te bepaal.", answer: "630", topic: "GGD/KGV" },
      { type: "input", text: "Twee waarskuwingsligte flikker elke 18 sekondes en elke 24 sekondes. Hulle flikker saam presies om 08:00:00. Na hoeveel sekondes sal hulle weer saam flikker?", answer: "72", topic: "GGD/KGV" },
    ]
  },
  {
    id: 106,
    name: "Verhoudings",
    fullName: "Verhoudings",
    lesson: {
      heading: "Verhoudings",
      sub: "Hoofstuk 1 · Onderwerp 6",
      body: `
        <p>'n <strong>Verhouding</strong> vergelyk twee of meer hoeveelhede van dieselfde soort. Verhoudings kom voor in kaarte, resepte, finansies, en wetenskap.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Verhoudingsreëls</div>
          <p>
            Geskryf as <span class="math">a : b</span> of <span class="math">a/b</span>.<br>
            <strong>Vereenvoudig</strong> altyd deur beide dele deur hulle GGD te deel.<br>
            <span class="math">12 : 18</span> → GGD = 6 → <span class="math">2 : 3</span><br><br>
            <strong>Ekwivalente verhoudings</strong> word gevorm deur beide dele met dieselfde getal te vermenigvuldig of te deel.<br>
            <span class="math">2 : 3 = 4 : 6 = 10 : 15</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Verdeel in 'n verhouding</div>
          <div class="example-step"><span class="step-num">1</span><span>Deel R 240 in die verhouding 3 : 5.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Totale dele: <span class="math">3 + 5 = 8</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Een deel: <span class="math">240 ÷ 8 = R30</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Dele: <span class="math">3 × 30 = R90</span> en <span class="math">5 × 30 = R150</span></span></div>
          <div class="example-step"><span class="step-num">5</span><span>Kontroleer: <span class="math">R90 + R150 = R240 ✓</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Kontroleer altyd dat jou dele optel tot die oorspronklike totaal. Hierdie enkele stap vang byna alle foute met verhoudings.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Verhoudingvereenvoudiger & -verdeler</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="ratA" type="number" value="15" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;">:</span>
              <input id="ratB" type="number" value="25" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:rgba(221,225,240,0.40);font-size:11px;">Totale bedrag:</span>
              <input id="ratTotal" type="number" value="200" min="1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="ratCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Vereenvoudig & Verdeel</button>
            </div>
            <div id="ratOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){return b===0?a:gcd(b,a%b);}
            function calc(){
              const a=parseInt(document.getElementById('ratA').value)||1;
              const b=parseInt(document.getElementById('ratB').value)||1;
              const t=parseInt(document.getElementById('ratTotal').value)||0;
              const g=gcd(a,b);
              const sa=a/g, sb=b/g;
              const shareA=t*a/(a+b), shareB=t*b/(a+b);
              document.getElementById('ratOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Oorspronklike verhouding:</span><span style="color:#a5b4fc;">'+a+' : '+b+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Vereenvoudig:</span><span style="color:#fcd34d;font-size:14px;font-weight:700;">'+sa+' : '+sb+'</span></div>',
                t?'<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Deel van '+t+':</span><span style="color:#6ee7b7;">'+shareA.toFixed(2)+' en '+shareB.toFixed(2)+'</span></div>':'',
                '<div style="font-size:10px;opacity:0.4;margin-top:4px;">GGD gebruik: '+g+'</div>',
              ].join('');
            }
            document.getElementById('ratCalc').addEventListener('click',calc);

          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Vereenvoudig die verhouding <span class='math'>36 : 48</span>", options: ["6 : 8", "3 : 4", "9 : 12", "4 : 3"], answer: 1, topic: "Verhoudings" },
      { type: "input", text: "Deel R 350 in die verhouding 2 : 5. Wat is die kleiner deel? (R)", answer: "100", topic: "Verhoudings" },
      { type: "mc", text: "Watter verhouding is ekwivalent aan <span class='math'>4 : 6</span>?", options: ["8 : 10", "6 : 9", "2 : 4", "12 : 15"], answer: 1, topic: "Verhoudings" },
      { type: "input", text: "Die verhouding seuns tot meisies in 'n klas is 3 : 4. As daar 21 seuns is, hoeveel meisies is daar?", answer: "28", topic: "Verhoudings" },
      { type: "mc", text: "Deel 180 in die verhouding 1 : 2 : 3. Wat is die grootste deel?", options: ["30", "60", "90", "120"], answer: 2, topic: "Verhoudings" },
    ]
  },
  {
    id: 107,
    name: "Tempo's",
    fullName: "Tempo's",
    lesson: {
      heading: "Tempo's",
      sub: "Hoofstuk 1 · Onderwerp 7",
      body: `
        <p>'n <strong>Tempo</strong> vergelyk twee hoeveelhede van <em>verskillende</em> soorte. Tempo's het altyd eenhede — soos km/h, R/kg, of liter/minuut.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Tempo vs Verhouding</div>
          <p>
            <strong>Verhouding:</strong> dieselfde eenhede (bv. seuns : meisies)<br>
            <strong>Tempo:</strong> verskillende eenhede (bv. km per uur)<br><br>
            'n <strong>Eenheidstempo</strong> het 1 in die noemer: <em>R12,50 per kg</em><br><br>
            Om 'n eenheidstempo te vind: deel die eerste hoeveelheid deur die tweede.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
          <div class="example-step"><span class="step-num">1</span><span>'n Motor ry 360 km in 4 uur. Bepaal die spoed in km/h.</span></div>
          <div class="example-step"><span class="step-num">2</span><span><span class="math">Spoed = 360 ÷ 4 = 90 km/h</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Jy betaal R84 vir 6 kg appels. Eenheidsprys?</span></div>
          <div class="example-step"><span class="step-num">4</span><span><span class="math">R84 ÷ 6 = R14 per kg</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Skryf altyd die eenhede in jou antwoord. <em>"90"</em> is onvolledig — <em>"90 km/h"</em> is korrek.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Tempo-berekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies eenhede, voer enige twee waardes in, laat een oop — die derde word outomaties bereken.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">

              <!-- Distance -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Afstand</label>
                <div style="display:flex;gap:4px;align-items:center;">
                  <input id="rateD" type="number" placeholder="—" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
                  <select id="rateDUnit" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 6px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                    <option value="km">km</option>
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="mi">mi</option>
                  </select>
                </div>
              </div>

              <!-- Time -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Tyd</label>
                <div style="display:flex;gap:4px;align-items:center;">
                  <input id="rateT" type="number" placeholder="—" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
                  <select id="rateTUnit" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 6px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                    <option value="h">h</option>
                    <option value="min">min</option>
                    <option value="s">s</option>
                  </select>
                </div>
              </div>

              <!-- Speed -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Spoed (tempo)</label>
                <div style="display:flex;gap:4px;align-items:center;">
                  <input id="rateR" type="number" placeholder="—" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
                  <span id="rateRUnit" style="font-size:11px;color:#a5b4fc;font-family:JetBrains Mono,monospace;white-space:nowrap;min-width:36px;">km/h</span>
                </div>
              </div>

              <button id="rateCalc" style="padding:8px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;align-self:flex-end;">Bereken</button>
            </div>
            <div id="rateOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            // Conversion factors TO metres and seconds (base SI units)
            const toM   = { km:1000, m:1, cm:0.01, mm:0.001, mi:1609.344 };
            const toS   = { h:3600,  min:60, s:1 };

            function fmt(n){
              // Format nicely: avoid unnecessary decimals for whole numbers
              if(n === Math.round(n)) return String(n);
              // up to 4 sig figs
              return parseFloat(n.toPrecision(4)).toString();
            }

            function updateRateUnit(){
              const du = document.getElementById('rateDUnit').value;
              const tu = document.getElementById('rateTUnit').value;
              document.getElementById('rateRUnit').textContent = du+'/'+tu;
            }

            function calc(){
              const dRaw = parseFloat(document.getElementById('rateD').value);
              const tRaw = parseFloat(document.getElementById('rateT').value);
              const rRaw = parseFloat(document.getElementById('rateR').value);
              const du   = document.getElementById('rateDUnit').value;
              const tu   = document.getElementById('rateTUnit').value;
              const el   = document.getElementById('rateOut');

              const dBlank = isNaN(dRaw);
              const tBlank = isNaN(tRaw);
              const rBlank = isNaN(rRaw);
              const blanks = [dBlank, tBlank, rBlank].filter(Boolean).length;
              if(blanks > 1){ el.innerHTML='<span style="color:#fca5a5;">Laat presies een veld oop.</span>'; return; }
              if(blanks === 0){ el.innerHTML='<span style="color:#fca5a5;">Laat een veld oop sodat dit bereken kan word.</span>'; return; }

              // Convert inputs to base units (metres, seconds)
              const dBase = dBlank ? null : dRaw * toM[du];
              const tBase = tBlank ? null : tRaw * toS[tu];
              // Rate in base units is always m/s; user rate is in du/tu
              const rBase = rBlank ? null : rRaw * (toM[du] / toS[tu]);

              let resultBase, resultDisplay, steps = [];

              if(dBlank){
                // d = r × t
                resultBase   = rBase * tBase;
                resultDisplay = resultBase / toM[du];
                steps = [
                  'Formule: Afstand = Spoed × Tyd',
                  'Omskep: '+rRaw+' '+du+'/'+tu+' = '+(fmt(rBase))+' m/s',
                  'Omskep: '+tRaw+' '+tu+' = '+(fmt(tBase))+' s',
                  'Afstand = '+fmt(rBase)+' × '+fmt(tBase)+' = '+fmt(resultBase)+' m',
                  '→ Omskep terug: '+fmt(resultBase)+' m = <strong style="color:#6ee7b7;">'+fmt(resultDisplay)+' '+du+'</strong>',
                ];
                document.getElementById('rateD').value = fmt(resultDisplay);
              } else if(tBlank){
                // t = d / r
                resultBase   = dBase / rBase;
                resultDisplay = resultBase / toS[tu];
                steps = [
                  'Formule: Tyd = Afstand ÷ Spoed',
                  'Omskep: '+dRaw+' '+du+' = '+fmt(dBase)+' m',
                  'Omskep: '+rRaw+' '+du+'/'+tu+' = '+fmt(rBase)+' m/s',
                  'Tyd = '+fmt(dBase)+' ÷ '+fmt(rBase)+' = '+fmt(resultBase)+' s',
                  '→ Omskep terug: '+fmt(resultBase)+' s = <strong style="color:#6ee7b7;">'+fmt(resultDisplay)+' '+tu+'</strong>',
                ];
                document.getElementById('rateT').value = fmt(resultDisplay);
              } else {
                // r = d / t
                resultBase   = dBase / tBase;
                resultDisplay = resultBase / (toM[du] / toS[tu]);
                steps = [
                  'Formule: Spoed = Afstand ÷ Tyd',
                  'Omskep: '+dRaw+' '+du+' = '+fmt(dBase)+' m',
                  'Omskep: '+tRaw+' '+tu+' = '+fmt(tBase)+' s',
                  'Spoed = '+fmt(dBase)+' ÷ '+fmt(tBase)+' = '+fmt(resultBase)+' m/s',
                  '→ Omskep terug: '+fmt(resultBase)+' m/s = <strong style="color:#6ee7b7;">'+fmt(resultDisplay)+' '+du+'/'+tu+'</strong>',
                ];
                document.getElementById('rateR').value = fmt(resultDisplay);
              }

              el.innerHTML = steps.map((s,i) =>
                '<div style="color:'+(i===steps.length-1?'#6ee7b7':i===0?'#fbbf24':'rgba(221,225,240,0.55)')+'">'+s+'</div>'
              ).join('');
            }

            document.getElementById('rateCalc').addEventListener('click', calc);
            document.getElementById('rateDUnit').addEventListener('change', function(){ updateRateUnit(); });
            document.getElementById('rateTUnit').addEventListener('change', function(){ updateRateUnit(); });
            ['rateD','rateT','rateR'].forEach(id =>
              document.getElementById(id).addEventListener('keydown', e => { if(e.key==='Enter') calc(); })
            );
            updateRateUnit();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "'n Kraan vul 120 liter in 8 minute. Wat is die tempo in liter per minuut?", answer: "15", topic: "Tempo's" },
      { type: "mc", text: "'n Motor ry 450 km in 5 uur. Wat is sy gemiddelde spoed?", options: ["80 km/h", "90 km/h", "95 km/h", "100 km/h"], answer: 1, topic: "Tempo's" },
      { type: "input", text: "Jy verdien R 630 vir 9 uur se werk. Wat is jou uurlikse tarief? (R)", answer: "70", topic: "Tempo's" },
      { type: "mc", text: "Watter is die beter koop: 2 kg rys vir R34 of 5 kg vir R80?", options: ["2 kg-sak (R17/kg)", "5 kg-sak (R16/kg)", "Hulle is dieselfde", "Kan nie bepaal word nie"], answer: 1, topic: "Tempo's" },
      { type: "input", text: "'n Drukker druk 240 bladsye in 6 minute. Hoeveel bladsye per minuut?", answer: "40", topic: "Tempo's" },
    ]
  },
  {
    id: 108,
    name: "Finansiële kontekste",
    fullName: "Los probleme op in finansiële kontekste",
    lesson: {
      heading: "Los probleme op in finansiële kontekste",
      sub: "Hoofstuk 1 · Onderwerp 8",
      body: `
        <p>Wiskunde word elke dag in persoonlike finansies gebruik. Sleutelbegrippe sluit in wins/verlies, persentasie, korting, BTW, en enkelvoudige rente.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Sleutel finansiële begrippe</div>
          <p>
            <strong>Wins/Verlies:</strong> <span class="math">Wins = Verkoopprys − Kosprys</span><br>
            <strong>Persentasiewins:</strong> <span class="math">(Wins ÷ Kosprys) × 100</span><br><br>
            <strong>Korting:</strong> vermindering van die oorspronklike prys.<br>
            <span class="math">Kortingsbedrag = % × Oorspronklike prys</span><br><br>
            <strong>BTW (15% in SA):</strong> belasting wat by pryse gevoeg word.<br>
            <span class="math">Prys ink. BTW = Prys × 1.15</span><br><br>
            <strong>Enkelvoudige rente:</strong> <span class="math">I = P × r × t</span><br>
            waar P = hoofsom, r = koers (as 'n desimaal), t = tyd in jare.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeeld — BTW en korting</div>
          <div class="example-step"><span class="step-num">1</span><span>'n Baadjie kos R 600. Dit het 'n 20%-korting, waarna 15% BTW bygevoeg word. Finale prys?</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Korting: <span class="math">20% × R600 = R120</span>. Verkoopprys: <span class="math">R600 − R120 = R480</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>BTW: <span class="math">R480 × 1.15 = R552</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Enkelvoudige rente</div>
          <div class="example-step"><span class="step-num">1</span><span>Belê R 2 000 teen 8% p.j. enkelvoudige rente vir 3 jaar.</span></div>
          <div class="example-step"><span class="step-num">2</span><span><span class="math">I = 2000 × 0.08 × 3 = R480</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Totaal: <span class="math">R2000 + R480 = R2480</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>In Suid-Afrika is BTW tans 15%. Kontroleer altyd of eksamenvrae die koers spesifiseer — dit het al voorheen verander.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Finansiële Berekenaar</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:flex-end;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Modus</label>
                <select id="finMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="profit">Wins / Verlies</option>
                  <option value="discount">Korting</option>
                  <option value="vat">BTW (15%)</option>
                  <option value="pct">% van bedrag</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;" id="finL1">Kosprys (R)</label>
                <input id="finV1" type="number" value="80" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;" id="finL2">Verkoopprys (R)</label>
                <input id="finV2" type="number" value="120" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <button id="finCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="finOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            const modes={
              profit:{l1:'Kosprys (R)',l2:'Verkoopprys (R)',d1:80,d2:120},
              discount:{l1:'Oorspronklike prys (R)',l2:'Korting %',d1:500,d2:20},
              vat:{l1:'Prys uitgesluit BTW (R)',l2:'(BTW = 15% vas)',d1:200,d2:15},
              pct:{l1:'Bedrag (R)',l2:'Persentasie %',d1:300,d2:35},
            };
            function setMode(){
              const m=document.getElementById('finMode').value;
              const cfg=modes[m];
              document.getElementById('finL1').textContent=cfg.l1;
              document.getElementById('finL2').textContent=cfg.l2;
              document.getElementById('finV1').value=cfg.d1;
              document.getElementById('finV2').value=cfg.d2;
              if(m==='vat') document.getElementById('finV2').disabled=true;
              else document.getElementById('finV2').disabled=false;

            }
            function calc(){
              const m=document.getElementById('finMode').value;
              const v1=parseFloat(document.getElementById('finV1').value)||0;
              const v2=parseFloat(document.getElementById('finV2').value)||0;
              const el=document.getElementById('finOut');
              let lines=[];
              if(m==='profit'){
                const diff=v2-v1, pct=(diff/v1*100);
                lines=[
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">'+(diff>=0?'Wins':'Verlies')+':</span><span style="color:'+(diff>=0?'#6ee7b7':'#fca5a5')+';">R '+Math.abs(diff).toFixed(2)+'</span></div>',
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">% '+(diff>=0?'wins':'verlies')+':</span><span style="color:#fcd34d;">'+Math.abs(pct).toFixed(2)+'%</span></div>',
                  '<div style="font-size:10px;opacity:0.4;">Formule: (VP−KP)/KP × 100</div>',
                ];
              } else if(m==='discount'){
                const disc=v1*v2/100, final=v1-disc;
                lines=[
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Kortingsbedrag:</span><span style="color:#fca5a5;">R '+disc.toFixed(2)+'</span></div>',
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Prys na korting:</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">R '+final.toFixed(2)+'</span></div>',
                ];
              } else if(m==='vat'){
                const vat=v1*0.15, incl=v1+vat;
                lines=[
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">BTW (15%):</span><span style="color:#fca5a5;">R '+vat.toFixed(2)+'</span></div>',
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Prys ink. BTW:</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">R '+incl.toFixed(2)+'</span></div>',
                ];
              } else {
                const res=v1*v2/100;
                lines=[
                  '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">'+v2+'% van R'+v1+':</span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">R '+res.toFixed(2)+'</span></div>',
                  '<div style="font-size:10px;opacity:0.4;">'+v2+'/100 × '+v1+' = '+res.toFixed(2)+'</div>',
                ];
              }
              el.innerHTML=lines.join('');
            }
            document.getElementById('finMode').addEventListener('change',setMode);
            document.getElementById('finCalc').addEventListener('click',calc);
            document.getElementById('finV1').addEventListener('input',calc);
            document.getElementById('finV2').addEventListener('input',calc);
            setMode();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "'n Winkel koop 'n hemp vir R80 en verkoop dit vir R120. Wat is die persentasiewins? (%)", answer: "50", topic: "Finansies" },
      { type: "mc", text: "'n R 500-selfoon het 'n 30%-korting. Wat is die verkoopprys?", options: ["R 150", "R 300", "R 350", "R 450"], answer: 2, topic: "Finansies" },
      { type: "input", text: "Bereken BTW (15%) op 'n R 200-item. Wat is die BTW-inklusiewe prys? (R)", answer: "230", topic: "Finansies" },
      { type: "mc", text: "Enkelvoudige rente op R 1 500 teen 10% p.j. vir 2 jaar is:", options: ["R 150", "R 300", "R 330", "R 3 000"], answer: 1, topic: "Finansies" },
      { type: "input", text: "Jy belê R 4 000 teen 6% enkelvoudige rente per jaar. Hoeveel rente na 5 jaar? (R)", answer: "1200", topic: "Finansies" },
    ]
  },
  {
    id: 109,
    name: "Eksamenfokus",
    fullName: "Eksamenfokus-oefening",
    lesson: {
      heading: "Eksamenfokus-oefening",
      sub: "Hoofstuk 1 · Hersiening",
      body: `
        <p>Hierdie onderwerp bring alles van Hoofstuk 1 saam. In 'n eksamen moet jy:</p>
        <div class="def-box">
          <div class="def-box-title">📋 Eksamentegniek</div>
          <p>
            ✅ <strong>Lees die vraag twee keer</strong> voordat jy enigiets skryf.<br>
            ✅ <strong>Wys al jou berekeninge</strong> — metodepunte word toegeken.<br>
            ✅ <strong>Sluit eenhede in</strong> by alle tempo-, finansiële, en meetantwoorde.<br>
            ✅ <strong>Kontroleer jou antwoord</strong> deur terug te vervang of te skat.<br>
            ✅ <strong>Los nooit vrae oop nie</strong> — 'n poging verdien meer as niks.
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Die oefenvrae hier is in eksamenstyl. Werk deur hulle presies soos jy in 'n eksamen sou — stap vir stap, met al jou berekeninge.</span></div>
        <div class="example-box">
          <div class="example-box-title">📝 Algemene eksamenfoute om te vermy</div>
          <div class="example-step"><span class="step-num">✗</span><span>Ignoreer BODMAS en werk suiwer van links na regs.</span></div>
          <div class="example-step"><span class="step-num">✗</span><span>Vergeet om verhoudings te vereenvoudig of los hulle in ekwivalente vorme.</span></div>
          <div class="example-step"><span class="step-num">✗</span><span>Pas BTW toe voor korting in plaas daarvan om eers die korting te bereken.</span></div>
          <div class="example-step"><span class="step-num">✗</span><span>Gebruik persentasie verkeerdelik as 'n desimaal (8% = 0.08, nie 8 nie).</span></div>
        </div>
      `
    },
    questions: [
      { type: "mc", text: "Bereken <span class='math'>5² + (18 ÷ 3) × 4 − 7</span>", options: ["42", "24", "60", "18"], answer: 0, topic: "Gemeng" },
      { type: "input", text: "Die GGD van twee getalle is 6 en hulle KGV is 72. Een getal is 24. Wat is die ander getal?", answer: "18", topic: "GGD/KGV" },
      { type: "mc", text: "Deel R 480 in die verhouding 3 : 2 : 1. Wat is die grootste deel?", options: ["R 80", "R 240", "R 160", "R 120"], answer: 1, topic: "Verhoudings" },
      { type: "input", text: "'n Motor gebruik 8 liter petrol per 100 km. Petrol kos R 22,50/liter. Wat kos dit om 350 km te ry? (R)", answer: "630", topic: "Tempo's/Finansies" },
      { type: "mc", text: "Belê R 5 000 teen 7% enkelvoudige rente p.j. vir 4 jaar. Wat is die totale bedrag aan die einde?", options: ["R 6 400", "R 6 200", "R 6 500", "R 5 700"], answer: 0, topic: "Finansies" },
    ]
  }
  ],
  workbook: {
    chapter: 1, chapterName: "Heelgetalle, Verhoudings, Tempo's & Finansies",
    topics: [
      {
        name: "Bewerkings & BODMAS",
        questions: [
          {
            num: "1",
            text: "Bereken elkeen van die volgende, en wys al jou berekeninge:",
            parts: [
              { label: "a)", text: "5 + 3 × (8 − 2) ÷ 2", marks: 2 },
              { label: "b)", text: "4² − (3 + 1) × 2 + 10 ÷ 5", marks: 3 },
              { label: "c)", text: "[(12 ÷ 4) + 3²] × (−2)", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Sonder 'n sakrekenaar, gebruik die distributiewe eienskap om te bereken:",
            parts: [
              { label: "a)", text: "7 × 98", marks: 2 },
              { label: "b)", text: "12 × 105", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Faktore, GGD & KGV",
        questions: [
          {
            num: "3",
            text: "Deur priemfaktorisering te gebruik:",
            parts: [
              { label: "a)", text: "Skryf 84 en 120 as produkte van hulle priemfaktore.", marks: 3 },
              { label: "b)", text: "Bepaal dus die GGD van 84 en 120.", marks: 2 },
              { label: "c)", text: "Bepaal dus die KGV van 84 en 120.", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Verhoudings, Tempo's & Finansies",
        questions: [
          {
            num: "4",
            text: "Thabo en Sipho belê geld in die verhouding 3 : 5. Die totale belegging is R 12 000.",
            parts: [
              { label: "a)", text: "Hoeveel belê elke persoon?", marks: 3 },
              { label: "b)", text: "Na een jaar maak hulle 'n wins van R 2 400. Hulle deel die wins in dieselfde verhouding. Hoeveel ontvang Thabo?", marks: 3 },
            ]
          },
          {
            num: "5",
            text: "'n Motor ry 540 km met 45 liter petrol.",
            parts: [
              { label: "a)", text: "Bereken die brandstofverbruik in km per liter.", marks: 2 },
              { label: "b)", text: "As petrol R 23,40 per liter kos, bereken die koste om 300 km te ry.", marks: 3 },
            ]
          },
          {
            num: "6",
            text: "'n Skootrekenaar kos R 8 500 uitgesluit BTW.",
            parts: [
              { label: "a)", text: "Bereken die BTW (15%) op die skootrekenaar.", marks: 2 },
              { label: "b)", text: "Die winkel bied 'n 12%-korting op die BTW-inklusiewe prys. Wat is die finale verkoopprys?", marks: 4 },
              { label: "c)", text: "Bereken die enkelvoudige rente op R 8 500 teen 9% p.j. oor 3 jaar.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 1, chapterName: "Hoofstuk 1 — Heelgetalle, Verhoudings, Tempo's & Finansies",
    topics: [
      {
        name: "Bewerkings & BODMAS",
        answers: [
          { num: "Q1a", ans: "5 + 3 × 3 = 5 + 9 = 14", note: "Hakies eerste: 8−2=6, ÷2=3, dan ×3=9" },
          { num: "Q1b", ans: "4² − 4×2 + 10÷5 = 16 − 8 + 2 = 10", note: "Orders, dan vermenigvuldiging/deling, dan optelling/aftrekking" },
          { num: "Q1c", ans: "[3 + 9] × (−2) = 12 × (−2) = −24", note: "Binneste hakie: 12÷4=3, dan +3²=+9" },
          { num: "Q2a", ans: "7 × (100 − 2) = 700 − 14 = 686", note: "Kompensasie: rond af tot 100, trek die ekstra af" },
          { num: "Q2b", ans: "12 × (100 + 5) = 1 200 + 60 = 1 260", note: "Distributiewe eienskap" },
        ]
      },
      {
        name: "Faktore, GGD & KGV",
        answers: [
          { num: "Q3a", ans: "84 = 2² × 3 × 7 ; 120 = 2³ × 3 × 5", note: "Priemfaktoriseringsboom" },
          { num: "Q3b", ans: "GGD = 2² × 3 = 12", note: "Laagste mag van elke gedeelde priemfaktor" },
          { num: "Q3c", ans: "KGV = 2³ × 3 × 5 × 7 = 840", note: "Hoogste mag van elke priemfaktor" },
        ]
      },
      {
        name: "Verhoudings, Tempo's & Finansies",
        answers: [
          { num: "Q4a", ans: "Thabo: R 4 500 ; Sipho: R 7 500", note: "1 deel = 12000÷8 = 1500; ×3 en ×5" },
          { num: "Q4b", ans: "Thabo: R 900", note: "1 deel van die wins = 2400÷8 = 300; ×3 = 900" },
          { num: "Q5a", ans: "12 km/liter", note: "540 ÷ 45 = 12 km/L" },
          { num: "Q5b", ans: "R 585", note: "300÷12 = 25 L; 25 × R23,40 = R585" },
          { num: "Q6a", ans: "BTW = R 1 275", note: "8500 × 0,15 = 1275" },
          { num: "Q6b", ans: "R 8 618,20", note: "BTW-prys = R9775; ×0,88 = R8602 (aanvaar R8601,40)" },
          { num: "Q6c", ans: "I = R 2 295", note: "I = 8500 × 0,09 × 3 = 2295" },
        ]
      },
    ]
  }
});
