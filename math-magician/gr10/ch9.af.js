// Math Magician — Grade 10, Chapter 9 (Afrikaans)
// Finansies en Groei

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 900,
      chapter: 9,
      name: "Enkelvoudige & saamgestelde rente",
      fullName: "Enkelvoudige rente, saamgestelde rente, en groeiberekeninge",
      lesson: {
        heading: "Enkelvoudige en saamgestelde rente",
        sub: "Hoofstuk 9 · Onderwerp 1",
        body: `
          <p>Finansiële wiskunde stel die begrip <strong>rente</strong> bekend — geld wat op 'n belegging verdien word of op 'n lening betaal word.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Enkelvoudige rente</div>
            <p>Rente word elke jaar slegs op die <strong>oorspronklike hoofsom</strong> bereken.<br>
            <span class="math">A = P(1 + in)</span><br>
            waar: P = hoofsom, i = jaarlikse rentekoers (desimaal), n = tyd in jare, A = gegroeide bedrag</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Saamgestelde rente</div>
            <p>Rente word bereken op die <strong>saldo insluitend vorige rente</strong> (rente op rente).<br>
            <span class="math">A = P(1 + i)ⁿ</span><br>
            Saamgestelde rente gee altyd 'n <em>hoër</em> gegroeide bedrag as enkelvoudige rente (oor dieselfde tydperk).</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vergelyk enkelvoudige vs saamgestelde</div>
            <p>R5 000 belê teen 8% p.j. vir 3 jaar:<br><br>
            <strong>Enkelvoudig:</strong> <span class="math">A = 5000(1 + 0.08 × 3) = 5000(1.24) = R6 200</span><br>
            <strong>Saamgestel:</strong> <span class="math">A = 5000(1.08)³ = 5000 × 1.2597 ≈ R6 298.56</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Vind P, i, of n</div>
            <p>
              Herrangskik <span class="math">A = P(1 + i)ⁿ</span>:<br>
              <span class="math">P = A/(1+i)ⁿ</span> (huidige waarde)<br>
              <span class="math">i = (A/P)^(1/n) − 1</span> (rentekoers)
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Rente-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Vergelyk <strong>enkelvoudige</strong> vs <strong>saamgestelde</strong> rente — voer P, koers, en jare in.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoofsom (R)</div><input id="g10c9p" type="number" value="5000" style="width:95px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koers (%)</div><input id="g10c9i" type="number" value="8" step="0.1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare</div><input id="g10c9n" type="number" value="3" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c9Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g10c9Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function rand(n){return 'R '+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
              function run(){
                const P=parseFloat(document.getElementById('g10c9p').value);
                const i=parseFloat(document.getElementById('g10c9i').value)/100;
                const n=parseFloat(document.getElementById('g10c9n').value);
                const out=document.getElementById('g10c9Out');
                if([P,i,n].some(isNaN)||P<=0||i<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                const As=P*(1+i*n);
                const Ac=P*Math.pow(1+i,n);
                const diff=Ac-As;
                let html='<span style="color:rgba(221,225,240,0.50);">Enkelvoudig: A = P(1 + in) = '+P+'(1 + '+i+'×'+n+') = </span><span style="color:#fcd34d;">'+rand(As)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Saamgestel: A = P(1+i)ⁿ = '+P+'(1+'+i+')^'+n+' = </span><span style="color:#6ee7b7;">'+rand(Ac)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Rente verdien (saamgestel): </span><span style="color:#fcd34d;">'+rand(Ac-P)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Saamgestelde rente verdien </span><span style="color:#6ee7b7;">'+rand(diff)+' meer</span><span style="color:rgba(221,225,240,0.50);"> as enkelvoudige rente oor '+n+' jaar'+(n!==1?'':'')+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c9Btn').addEventListener('click',run);
              ['g10c9p','g10c9i','g10c9n'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Saamgestelde rente is altyd beter as enkelvoudige rente (vir dieselfde P, i, n > 1). Hoe langer die tydperk, hoe groter die verskil — dit is die krag van eksponensiële groei.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "R8 000 belê teen 6% enkelvoudige rente vir 4 jaar. Bereken A:",
          options: ["R9 920", "R10 099", "R9 320", "R10 000"],
          answer: 0,
          topic: "Enkelvoudige & saamgestelde rente"
        },
        {
          type: "input",
          text: "R10 000 teen 5% saamgestelde rente vir 2 jaar. Bereken A (tot die naaste rand).",
          answer: "11025",
          topic: "Enkelvoudige & saamgestelde rente"
        },
        {
          type: "mc",
          text: "Watter een verdien meer na 5 jaar: 10% enkelvoudig of 10% saamgestel?",
          options: ["Enkelvoudig", "Saamgestel", "Dieselfde", "Hang af van hoofsom"],
          answer: 1,
          topic: "Enkelvoudige & saamgestelde rente"
        },
        {
          type: "mc",
          text: "A = R15 000, i = 8% saamgestel, n = 3. Bereken P (tot naaste rand):",
          options: ["R11 907", "R12 500", "R11 250", "R13 000"],
          answer: 0,
          topic: "Enkelvoudige & saamgestelde rente"
        },
        {
          type: "input",
          text: "R6 000 groei tot R7 500 met enkelvoudige rente oor 5 jaar. Bereken i (as 'n %).",
          answer: "5",
          topic: "Enkelvoudige & saamgestelde rente"
        },
        {
          type: "input",
          text: "R12 000 word belê en groei tot R16 325.87 na 4 jaar se saamgestelde rente. Bereken die jaarlikse rentekoers (as 'n %).",
          answer: "8",
          topic: "Enkelvoudige & saamgestelde rente"
        }
      ]
    },
    {
      id: 901,
      chapter: 9,
      name: "Wisselkoerse & huurkoop",
      fullName: "Buitelandse wisselkoerse en huurkoop (HK)-ooreenkomste",
      lesson: {
        heading: "Wisselkoerse en huurkoop",
        sub: "Hoofstuk 9 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Wisselkoerse</div>
            <p>'n <strong>Wisselkoers</strong> gee die waarde van een geldeenheid in terme van 'n ander.<br>
            Voorbeeld: R18.50 = $1 (1 Amerikaanse dollar = 18.50 Suid-Afrikaanse rand)<br><br>
            Om om te skakel:<br>
            Rand → Dollar: deel deur die koers<br>
            Dollar → Rand: vermenigvuldig met die koers</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Geldeenheid-omskakeling</div>
            <p>Koers: £1 = R21.20<br>
            Skakel R5 300 om na pond: <span class="math">5300 ÷ 21.20 = £250</span><br>
            Skakel £180 om na rand: <span class="math">180 × 21.20 = R3 816</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Huurkoop (HK)</div>
            <p>Aankoop op krediet met 'n deposito en maandelikse paaiemente. Enkelvoudige rente word op die <em>volle leningsbedrag</em> toegepas (nie op 'n verminderende saldo nie), wat HK duur maak.<br><br>
            Stappe:<br>
            1. Lening = kontantprys − deposito<br>
            2. Totale rente = Lening × i × n<br>
            3. Totale terugbetaling = Lening + rente<br>
            4. Maandelikse paaiement = Totale terugbetaling ÷ aantal maande</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: HK-berekening</div>
            <p>TV kos R9 000. Deposito = R900. HK teen 15% p.j. enkelvoudige rente oor 2 jaar.<br>
            Lening = R8 100<br>
            Rente = 8100 × 0.15 × 2 = R2 430<br>
            Totaal = R10 530<br>
            Maandeliks = R10 530 ÷ 24 = R438.75</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 HK- & Geldeenheid-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Wissel tussen <strong>Huurkoop</strong> en <strong>Geldeenheid-omskakeling</strong>.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g10c9t2hp" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Huurkoop</button>
              <button id="g10c9t2cx" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Geldeenheid</button>
            </div>
            <div id="g10c9t2hpPanel">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Kontantprys (R)</div><input id="g10c9t2price" type="number" value="9000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Deposito (R)</div><input id="g10c9t2dep" type="number" value="900" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koers (% p.j.)</div><input id="g10c9t2rate" type="number" value="15" step="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare</div><input id="g10c9t2yrs" type="number" value="2" min="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c9t2hpBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
              </div>
            </div>
            <div id="g10c9t2cxPanel" style="display:none;">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Bedrag</div><input id="g10c9t2amt" type="number" value="5300" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rigting</div>
                  <select id="g10c9t2dir" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                    <option value="to_foreign">Rand → Buitelands</option>
                    <option value="to_rand">Buitelands → Rand</option>
                  </select></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Wisselkoers (R per 1 eenheid)</div><input id="g10c9t2exr" type="number" value="21.20" step="0.01" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c9t2cxBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Skakel om</button>
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
                if([price,dep,rate,yrs].some(isNaN)||price<=0||dep<0||dep>=price||rate<=0||yrs<=0){out.innerHTML='<span style="color:#fca5a5;">Kontroleer waardes — deposito moet minder as die prys wees.</span>';return;}
                const loan=price-dep;
                const interest=loan*rate*yrs;
                const total=loan+interest;
                const monthly=total/(yrs*12);
                let html='<span style="color:rgba(221,225,240,0.50);">Lening = prys − deposito = '+R(price)+' − '+R(dep)+' = </span><span style="color:#fcd34d;">'+R(loan)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Totale rente = '+R(loan)+' × '+rate+' × '+yrs+' = </span><span style="color:#fcd34d;">'+R(interest)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Totale terugbetaling = '+R(loan)+' + '+R(interest)+' = </span><span style="color:#fcd34d;">'+R(total)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Maandelikse paaiement = '+R(total)+' ÷ '+(yrs*12)+' = '+R(monthly)+'</span>';
                out.innerHTML=html;
              }
              function calcCX(){
                const amt=parseFloat(document.getElementById('g10c9t2amt').value);
                const dir=document.getElementById('g10c9t2dir').value;
                const exr=parseFloat(document.getElementById('g10c9t2exr').value);
                const out=document.getElementById('g10c9t2Out');
                if(isNaN(amt)||isNaN(exr)||amt<=0||exr<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                if(dir==='to_foreign'){
                  const res=amt/exr;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+R(amt)+' ÷ '+exr+' (koers) = </span><span style="color:#6ee7b7;">'+res.toFixed(2)+' buitelandse geldeenheid-eenhede</span>';
                } else {
                  const res=amt*exr;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+amt.toFixed(2)+' × '+exr+' (koers) = </span><span style="color:#6ee7b7;">'+R(res)+'</span>';
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

          <div class="tip-box"><span class="tip-icon">💡</span><span>HK-rente word op die <strong>volle oorspronklike lening</strong> bereken — nie op die verminderende saldo nie. Dit maak HK aansienlik duurder as 'n verminderende-saldo-lening teen dieselfde koers.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "As $1 = R17.50, hoeveel dollar koop R3 500?",
          options: ["$200", "$61 250", "$2 000", "$20"],
          answer: 0,
          topic: "Wisselkoerse & huurkoop"
        },
        {
          type: "input",
          text: "€1 = R19.80. Skakel €250 om na rand.",
          answer: "4950",
          topic: "Wisselkoerse & huurkoop"
        },
        {
          type: "mc",
          text: "Skootrekenaar kos R12 000. Deposito 10%. HK teen 18% p.j. vir 3 jaar. Maandelikse paaiement:",
          options: ["R462", "R445", "R540", "R416"],
          answer: 0,
          topic: "Wisselkoerse & huurkoop"
        },
        {
          type: "mc",
          text: "Jy betaal R350/maand vir 24 maande met 'n R500-deposito vir 'n R7 500-item. Totale rente betaal:",
          options: ["R1 400", "R900", "R8 400", "R8 900"],
          answer: 0,
          topic: "Wisselkoerse & huurkoop"
        },
        {
          type: "input",
          text: "As ¥1 = R0.12, skakel R6 000 om na jen.",
          answer: "50000",
          topic: "Wisselkoerse & huurkoop"
        },
        {
          type: "input",
          text: "'n Handboek kos £45 in die VK. Dieselfde boek kos R950 in Suid-Afrika. Gegewe £1 = R19.50, bereken hoeveel goedkoper (in rand) dit is om die boek in die VK te koop.",
          answer: "72.50",
          altAnswers: ["72.5", "R72.50"],
          topic: "Wisselkoerse & huurkoop"
        }
      ]
    },
    {
      id: 902,
      chapter: 9,
      name: "Inflasie & bevolkingsgroei",
      fullName: "Toepassing van saamgestelde groei op inflasie- en bevolkingsprobleme",
      lesson: {
        heading: "Inflasie en bevolkingsgroei",
        sub: "Hoofstuk 9 · Onderwerp 3",
        body: `
          <p>Inflasie en bevolkingsgroei is regte-lewe toepassings van die <strong>saamgestelde groeiformule</strong> — 'n hoeveelheid groei met 'n vaste persentasie elke tydperk.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Groeiformule vir inflasie/bevolking</div>
            <p>
              <span class="math">A = P(1 + i)ⁿ</span><br>
              waar P = huidige prys/bevolking, i = jaarlikse inflasie-/groeikoers, n = aantal jare, A = toekomstige prys/bevolking.<br><br>
              Dieselfde formule werk ook <strong>agteruit in tyd</strong> om 'n vorige prys te vind: <span class="math">P = A(1 + i)⁻ⁿ</span> as A die huidige waarde is en jy die waarde n jaar gelede wil vind.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Toekomstige prys</div>
            <p>Brood kos vandag R16.50. Inflasie is 6% p.j. Bereken die prys in 4 jaar.<br>
            <span class="math">A = 16.50(1.06)⁴ ≈ 16.50 × 1.2625 ≈ R20.83</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vorige prys</div>
            <p>'n Motor kos vandag R320 000. Inflasie was gemiddeld 7% p.j. oor die laaste 5 jaar. Bereken die geskatte prys 5 jaar gelede.<br>
            <span class="math">P = 320000 ÷ (1.07)⁵ ≈ 320000 ÷ 1.4026 ≈ R228 148</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bevolkingsgroei</div>
            <p>'n Dorp het 12 000 inwoners, en groei teen 3.2% p.j. Skat die bevolking in 6 jaar.<br>
            <span class="math">A = 12000(1.032)⁶ ≈ 12000 × 1.2098 ≈ 14 518</span> inwoners</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Inflasie- & Groei-tydreis-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer 'n huidige waarde, 'n groeikoers, en 'n aantal jare in — projekteer vorentoe of terug in tyd.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Waarde nou</div><input id="g10c9ipv" type="number" value="16.50" step="0.01" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koers (% p.j.)</div><input id="g10c9ii" type="number" value="6" step="0.1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare</div><input id="g10c9in" type="number" value="4" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rigting</div>
                <select id="g10c9idir" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="fwd">Projekteer vorentoe (toekomstige waarde)</option>
                  <option value="back">Projekteer terug (vorige waarde)</option>
                </select>
              </div>
              <button id="g10c9iBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
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
                if([P,i,n].some(isNaN)||P<=0||i<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                let html='';
                if(dir==='fwd'){
                  const A=P*Math.pow(1+i,n);
                  html+='<span style="color:rgba(221,225,240,0.50);">A = P(1+i)ⁿ = '+P+'(1+'+i+')^'+n+' = </span><span style="color:#6ee7b7;">'+rand(A)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">In '+n+' jaar'+(n!==1?'':'')+', groei die waarde van '+rand(P)+' na '+rand(A)+'</span>';
                } else {
                  const P0=P/Math.pow(1+i,n);
                  html+='<span style="color:rgba(221,225,240,0.50);">P = A(1+i)⁻ⁿ = '+P+' ÷ (1+'+i+')^'+n+' = </span><span style="color:#6ee7b7;">'+rand(P0)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">'+n+' jaar'+(n!==1?'':'')+' gelede was die geskatte waarde '+rand(P0)+'</span>';
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

          <div class="tip-box"><span class="tip-icon">💡</span><span>"Hoeveel het dit n jaar gelede gekos" beteken altyd deel deur (1+i)ⁿ, nie vermenigvuldig nie — jy maak n jaar se groei ongedaan.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Brood kos R14. Inflasie is 5% p.j. Sy prys in 3 jaar sal die naaste wees aan:",
          options: ["R16.21", "R21.00", "R14.75", "R15.75"],
          answer: 0,
          topic: "Inflasie & bevolkingsgroei"
        },
        {
          type: "input",
          text: "'n Dorp se bevolking is 8 000, en groei teen 4% p.j. Skat die bevolking na 2 jaar (rond af tot naaste heelgetal).",
          answer: "8653",
          topic: "Inflasie & bevolkingsgroei"
        },
        {
          type: "mc",
          text: "'n Motor is vandag R210 000 werd. Inflasie was gemiddeld 6% p.j. oor die afgelope 3 jaar. Sy geskatte prys 3 jaar gelede was:",
          options: ["R176 358", "R250 133", "R198 000", "R211 800"],
          answer: 0,
          topic: "Inflasie & bevolkingsgroei"
        },
        {
          type: "mc",
          text: "Watter formule skat 'n waarde n jaar IN DIE VERLEDE, gegewe die vandag se waarde A?",
          options: ["P = A(1+i)ⁿ", "P = A(1+i)⁻ⁿ", "P = A(1−i)ⁿ", "P = A × i × n"],
          answer: 1,
          topic: "Inflasie & bevolkingsgroei"
        },
        {
          type: "input",
          text: "'n Stad het 50 000 mense en groei teen 2.5% p.j. Bereken die bevolking na 5 jaar (naaste heelgetal).",
          answer: "56591",
          topic: "Inflasie & bevolkingsgroei"
        },
        {
          type: "input",
          text: "'n Dorp se bevolking was 15 000 vier jaar gelede en het teen 'n konstante jaarlikse koers gegroei om vandag 16 882,63 te bereik. Bereken die jaarlikse groeikoers (as 'n %).",
          answer: "3",
          topic: "Inflasie & bevolkingsgroei"
        }
      ]
    },
    {
      id: 903,
      chapter: 9,
      name: "Oplos vir koers of tydperk",
      fullName: "Herrangskikking van die saamgestelde groeiformule om vir i of n op te los",
      lesson: {
        heading: "Oplos vir die koers of die tydperk",
        sub: "Hoofstuk 9 · Onderwerp 4",
        body: `
          <p>Soms word A, P, en een van i of n gegee, en moet jy vir die <strong>ontbrekende koers</strong> of <strong>ontbrekende aantal jare</strong> oplos.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Oplos vir die koers i</div>
            <p>
              Vanaf <span class="math">A = P(1+i)ⁿ</span>:<br>
              <span class="math">(A/P) = (1+i)ⁿ</span><br>
              <span class="math">(A/P)^(1/n) = 1+i</span><br>
              <span class="math">i = (A/P)^(1/n) − 1</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Oplos vir die tydperk n (Graad 10-metode)</div>
            <p>
              Op Graad 10-vlak (voordat logaritmes formeel behandel word), word n gewoonlik gevind deur <strong>trial and error / stelselmatige skattings</strong>, of deur die sakrekenaar te gebruik om waardes van n te toets totdat <span class="math">P(1+i)ⁿ</span> naby aan A pas.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vind i</div>
            <p>R8 000 groei tot R10 368.30 in 3 jaar, jaarliks saamgestel. Bereken i.<br>
            <span class="math">i = (10368.30/8000)^(1/3) − 1 = (1.29604)^(1/3) − 1 ≈ 1.09 − 1 = 0.09 = 9%</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vind n deur toetsing</div>
            <p>Hoeveel jaar sal dit neem vir R5 000 om te groei tot minstens R7 000 teen 8% p.j. saamgestelde rente?<br>
            n=4: 5000(1.08)⁴ ≈ R6 802.44 (nie genoeg nie)<br>
            n=5: 5000(1.08)⁵ ≈ R7 346.64 (genoeg) → n = 5 jaar</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Los op vir Koers of Tyd</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies waarvoor jy wil oplos — voer die oorblywende bekende waardes in.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g10c9srRate" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Los op vir koers (i)</button>
              <button id="g10c9srTime" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Los op vir tyd (n)</button>
            </div>
            <div id="g10c9srRatePanel">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P</div><input id="g10c9srP1" type="number" value="8000" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A</div><input id="g10c9srA1" type="number" value="10368.30" step="0.01" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare n</div><input id="g10c9srN1" type="number" value="3" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <button id="g10c9srBtn1" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
              </div>
            </div>
            <div id="g10c9srTimePanel" style="display:none;">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P</div><input id="g10c9srP2" type="number" value="5000" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Teiken A</div><input id="g10c9srA2" type="number" value="7000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koers (%)</div><input id="g10c9srI2" type="number" value="8" step="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
                <button id="g10c9srBtn2" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind n deur toetsing</button>
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
                if([P,A,n].some(isNaN)||P<=0||A<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                const i=Math.pow(A/P,1/n)-1;
                let html='<span style="color:rgba(221,225,240,0.50);">i = (A/P)^(1/n) − 1 = ('+rand(A)+'/'+rand(P)+')^(1/'+n+') − 1</span><br>';
                html+='<span style="color:#6ee7b7;">i ≈ '+(i*100).toFixed(2)+'% per jaar</span>';
                out.innerHTML=html;
              }
              function solveTime(){
                const P=parseFloat(document.getElementById('g10c9srP2').value);
                const target=parseFloat(document.getElementById('g10c9srA2').value);
                const i=parseFloat(document.getElementById('g10c9srI2').value)/100;
                const out=document.getElementById('g10c9srOut');
                if([P,target,i].some(isNaN)||P<=0||target<=P||i<=0){out.innerHTML='<span style="color:#fca5a5;">Teiken A moet groter as P wees, en alle waardes positief.</span>';return;}
                let html='';
                let n=0,A=P;
                while(A<target&&n<200){n++;A=P*Math.pow(1+i,n);html+='<span style="color:rgba(221,225,240,0.50);">n='+n+': '+rand(P)+'×(1+'+i+')^'+n+' = </span><span style="color:'+(A>=target?'#6ee7b7':'rgba(221,225,240,0.5)')+'">'+rand(A)+'</span><br>';}
                html+='<span style="color:#6ee7b7;">Kleinste heelgetal aantal jare benodig: n = '+n+'</span>';
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

          <div class="tip-box"><span class="tip-icon">💡</span><span>Om n deur trial and error op te los is 'n geldige Graad 10-metode — logaritmes word eers formeel in Graad 12 bekendgestel. Toets net stelselmatig heelgetal-waardes van n.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "R6 000 groei tot R7 986 in 4 jaar, jaarliks saamgestel. Die koers i is die naaste aan:",
          options: ["7.4%", "10%", "5%", "8.3%"],
          answer: 0,
          topic: "Oplos vir koers of tydperk"
        },
        {
          type: "input",
          text: "R10 000 groei tot R12 100 in 2 jaar saamgestelde rente. Bereken i (as 'n %).",
          answer: "10",
          topic: "Oplos vir koers of tydperk"
        },
        {
          type: "mc",
          text: "Op Graad 10-vlak word die tydperk n in A = P(1+i)ⁿ tipies gevind deur:",
          options: ["Logaritmes direk te gebruik", "Trial and error met heelgetal-skattings", "A deur P te deel", "Dit kan nie gevind word nie"],
          answer: 1,
          topic: "Oplos vir koers of tydperk"
        },
        {
          type: "mc",
          text: "Hoeveel jaar (kleinste heelgetal) sal dit neem vir R4 000 om ten minste te verdubbel teen 15% p.j. saamgestelde rente?",
          options: ["4", "5", "6", "7"],
          answer: 1,
          topic: "Oplos vir koers of tydperk"
        },
        {
          type: "input",
          text: "R15 000 groei tot R19 998.15 in 3 jaar. Bereken i (as 'n %, tot 1 desimale plek).",
          answer: "10.0",
          altAnswers: ["10", "10,0"],
          topic: "Oplos vir koers of tydperk"
        },
        {
          type: "input",
          text: "Bereken die aantal jare (kleinste heelgetal) wat dit neem vir R9 000 om te groei tot minstens R13 500 teen 9% p.j. saamgestelde rente.",
          answer: "5",
          topic: "Oplos vir koers of tydperk"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 9 Werkboek — Finansies en Groei",
    questions: [
      {
        number: 1,
        text: "Simphiwe belê R15 000 teen 7.5% per jaar.",
        parts: [
          { label: "a", text: "Bereken die bedrag na 5 jaar met enkelvoudige rente.", marks: 3 },
          { label: "b", text: "Bereken die bedrag na 5 jaar met saamgestelde rente.", marks: 3 },
          { label: "c", text: "Hoeveel meer verdien saamgestelde rente?", marks: 1 }
        ]
      },
      {
        number: 2,
        text: "Lerato wil R50 000 in 4 jaar hê. Hoeveel moet sy vandag belê teen 9% saamgestelde rente per jaar?",
        parts: [
          { label: "a", text: "Skryf die formule neer en vervang die waardes.", marks: 2 },
          { label: "b", text: "Bereken P (tot die naaste rand).", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "'n Wasmasjien kos R8 500. Johan betaal 'n 15%-deposito en die saldo op HK teen 20% p.j. enkelvoudige rente oor 2 jaar.",
        parts: [
          { label: "a", text: "Bereken die deposito.", marks: 1 },
          { label: "b", text: "Bereken die leningsbedrag.", marks: 1 },
          { label: "c", text: "Bereken die totale rente gehef.", marks: 2 },
          { label: "d", text: "Bereken die maandelikse paaiement.", marks: 2 }
        ]
      },
      {
        number: 4,
        text: "Die wisselkoers is R1 = A$0.085 (Australiese dollar).",
        parts: [
          { label: "a", text: "Skakel R25 000 om na Australiese dollar.", marks: 2 },
          { label: "b", text: "'n Produk kos A$340. Wat is die randprys?", marks: 2 }
        ]
      },
      {
        number: 5,
        text: "'n Belegging van R8 000 groei oor tyd soos in die tabel hieronder getoon:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Jaar (n)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Bedrag (R)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>8 000,00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>8 640,00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>9 331,20</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10 077,70</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10 883,91</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>11 754,62</td></tr></table>",
        parts: [
          { label: "a", text: "Gebruik twee opeenvolgende waardes uit die tabel om te wys dat die groei saamgestel is, en bepaal die jaarlikse rentekoers.", marks: 3 },
          { label: "b", text: "Gebruik die koers wat in (a) gevind is om die bedrag na 6 jaar te bereken (nie in die tabel getoon nie).", marks: 2 },
          { label: "c", text: "In watter jaar (n) oorskry die belegging vir die eerste keer R11 000?", marks: 2 }
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
        a: "Deposito = 0.15×8500 = R1 275",
        b: "Lening = R7 225",
        c: "Rente = 7225×0.20×2 = R2 890",
        d: "Maandeliks = (7225+2890)/24 = R421.46"
      },
      4: {
        a: "25000×0.085 = A$2 125",
        b: "340 ÷ 0.085 = R4 000"
      },
      5: {
        a: "8640,00/8000,00 = 1,08 en 9331,20/8640,00 = 1,08 — 'n konstante verhouding bevestig saamgestelde groei; koers i = 8%",
        b: "A = 8000(1,08)⁶ = R12 694,99",
        c: "Jaar 4 gee R10 883,91 (onder R11 000) en jaar 5 gee R11 754,62 (bo R11 000), so die belegging oorskry R11 000 vir die eerste keer in jaar 5"
      }
    }
  }
});
