// Math Magician — Grade 11, Chapter 9 (Afrikaans)
// Finansies, Groei en Verval

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 900,
      chapter: 9,
      name: "Waardevermindering & tydlyne",
      fullName: "Eenvoudige en saamgestelde waardevermindering, en die gebruik van tydlyne",
      lesson: {
        heading: "Waardevermindering en finansiële tydlyne",
        sub: "Hoofstuk 9 · Onderwerp 1",
        body: `
          <p>Graad 11 Finansies stel <strong>waardevermindering</strong> bekend (bates wat waarde verloor) en <strong>tydlyne</strong> vir die opsporing van komplekse multi-stadium-beleggings.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Waardeverminderingsformules</div>
            <p>
              <strong>Reguitlyn- (eenvoudige) waardevermindering:</strong><br>
              <span class="math">A = P(1 − in)</span><br>
              Die bate verloor elke jaar dieselfde randwaarde.<br><br>
              <strong>Verminderende-saldo- (saamgestelde) waardevermindering:</strong><br>
              <span class="math">A = P(1 − i)ⁿ</span><br>
              Die bate verloor elke jaar dieselfde <em>persentasie</em> van sy huidige waarde. Altyd > reguitlyn vir dieselfde koers.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vergelyk waardevermindering</div>
            <p>Motor gekoop vir R250 000. Waardeverminderingskoers 15% p.j. Waarde na 5 jaar:<br>
            <strong>Reguitlyn:</strong> A = 250000(1 − 0.15 × 5) = 250000(0.25) = R62 500<br>
            <strong>Verminderende-saldo:</strong> A = 250000(0.85)⁵ ≈ 250000 × 0.4437 ≈ R110 929</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Tydlyne</div>
            <p>
              'n <strong>Tydlyn</strong> is 'n diagram wat geld op verskillende tydstippe toon. Gebruik vir:<br>
              • Multi-stadium-beleggings (verskillende koerse in verskillende tydperke)<br>
              • Bepaling van wanneer die waarde 'n sekere bedrag bereik<br>
              • Vergelyking van toekomstige waardes<br><br>
              Skuif geld altyd na <em>dieselfde tydstip</em> voordat jy vergelyk.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Waardeverminderingsberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Vergelyk reguitlyn- en verminderende-saldo-waardevermindering langs mekaar.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoofsom P (R)</div><input id="g11c9p" type="number" value="250000" min="1" style="width:110px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koers i (%)</div><input id="g11c9i" type="number" value="15" min="0.01" max="100" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare n</div><input id="g11c9n" type="number" value="5" min="1" max="50" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vergelyk</button>
            </div>
            <div id="g11c9Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const P=gv('g11c9p'),i=gv('g11c9i')/100,n=gv('g11c9n');
                const out=document.getElementById('g11c9Out');
                if([P,i,n].some(isNaN)||P<=0||i<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                const sl=P*(1-i*n);
                const rb=P*Math.pow(1-i,n);
                const yrSL=sl>0?n:Math.floor(1/i);
                let html='<span style="color:rgba(221,225,240,0.50);">Reguitlyn: A = P(1 − in) = '+R(P)+'(1 − '+i+'×'+n+')</span><br>';
                if(sl<=0) html+='<span style="color:#fca5a5;">Reguitlyn: waarde het 0 bereik (volledig afgeskryf) — bate is nul-waarde voor jaar '+n+'.</span><br>';
                else html+='<span style="color:#fcd34d;">Reguitlyn A = '+R(sl)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Verminderende-saldo: A = P(1−i)ⁿ = '+R(P)+'('+((1-i).toFixed(4))+')^'+n+'</span><br>';
                html+='<span style="color:#6ee7b7;">Verminderende-saldo A = '+R(rb)+'</span>';
                if(sl>0) html+='<br><span style="color:rgba(221,225,240,0.50);">Verminderende-saldo is hoër met '+R(rb-sl)+' (dieselfde koers, VS gee altyd \'n hoër boekwaarde)</span>';
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
          text: "Masjien kos R80 000. Reguitlyn-waardevermindering 20% p.j. Waarde na 4 jaar:",
          options: ["R16 000", "R32 768", "R16 384", "R20 000"],
          answer: 0,
          topic: "Waardevermindering & tydlyne"
        },
        {
          type: "mc",
          text: "Verminderende-saldo-waardevermindering gee altyd 'n _____ boekwaarde as reguitlyn vir dieselfde koers:",
          options: ["Laer", "Hoër", "Gelyk", "Hang af van aantal jare"],
          answer: 1,
          topic: "Waardevermindering & tydlyne"
        },
        {
          type: "input",
          text: "Toerusting: R120 000. Verminderende-saldo-waardevermindering 10% p.j. Bereken die waarde na 3 jaar (tot naaste rand).",
          answer: "87480",
          topic: "Waardevermindering & tydlyne"
        },
        {
          type: "mc",
          text: "'n Motor verminder reguitlyn in waarde van R200 000 tot R50 000 in 5 jaar. Die jaarlikse waardeverminderingskoers is:",
          options: ["15%", "10%", "20%", "30%"],
          answer: 0,
          topic: "Waardevermindering & tydlyne"
        },
        {
          type: "mc",
          text: "'n Tydlyn word hoofsaaklik gebruik om:",
          options: ["Rentekoerse te vind", "Geld op verskillende tydstippe by dieselfde tydstip te vergelyk", "Maandelikse betalings te bereken", "Grafieke van eksponensiële groei te teken"],
          answer: 1,
          topic: "Waardevermindering & tydlyne"
        },
        {
          type: "input",
          text: "'n Masjien gekoop vir R180 000 verminder in waarde volgens die verminderende-saldo-metode teen 18% p.j. Bepaal die eerste volle jaar waarin die waarde onder R60 000 daal.",
          answer: "6",
          topic: "Waardevermindering & tydlyne"
        },
        {
          type: "input",
          text: "'n Vragmotor word gekoop vir R350 000 en verminder in waarde volgens die verminderende-saldo-metode. Na 3 jaar is dit R255 150 werd. Bepaal die jaarlikse waardeverminderingskoers (as 'n %).",
          answer: "10%",
          altAnswers: ["10", "10 %"],
          topic: "Waardevermindering & tydlyne"
        }
      ]
    },
    {
      id: 901,
      chapter: 9,
      name: "Nominale & effektiewe rentekoerse",
      fullName: "Nominale rentekoerse, effektiewe rentekoerse, en samestellingsperiodes",
      lesson: {
        heading: "Nominale en effektiewe rentekoerse",
        sub: "Hoofstuk 9 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Samestellingsperiodes</div>
            <p>
              Rente kan meer gereeld as jaarliks saamgestel word:<br>
              <span class="math">A = P(1 + i/n)^(nt)</span><br>
              waar n = samestellingsperiodes per jaar, t = tyd in jare<br><br>
              Algemene periodes:<br>
              • Jaarliks: n = 1<br>
              • Halfjaarliks: n = 2<br>
              • Kwartaalliks: n = 4<br>
              • Maandeliks: n = 12<br>
              • Daagliks: n = 365
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Nominale vs effektiewe rentekoers</div>
            <p>
              <strong>Nominale koers (i_nom):</strong> die genoemde jaarlikse koers (bv. "12% p.j. maandeliks saamgestel")<br>
              <strong>Effektiewe koers (i_eff):</strong> die ekwivalente jaarlikse koers wat dieselfde resultaat met jaarlikse samestelling sou gee<br><br>
              Omskakeling: <span class="math">(1 + i_eff) = (1 + i_nom/n)ⁿ</span><br>
              Dus: <span class="math">i_eff = (1 + i_nom/n)ⁿ − 1</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Nominaal na effektief</div>
            <p>12% p.j. maandeliks saamgestel:<br>
            <span class="math">i_eff = (1 + 0.12/12)¹² − 1 = (1.01)¹² − 1 ≈ 0.1268 = 12.68% p.j.</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Nominale / Effektiewe Koers & Samestelling-berekenaar</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g11c9t2conv" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Nom → Effektief</button>
              <button id="g11c9t2acc" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">A = P(1+i/n)^(nt)</button>
            </div>
            <div id="g11c9t2convP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nominale koers (%)</div><input id="g11c9t2nom" type="number" value="12" min="0.01" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periodes/jaar</div><select id="g11c9t2n" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1">1 (Jaarliks)</option><option value="2">2 (Halfjaarliks)</option><option value="4">4 (Kwartaalliks)</option><option value="12" selected>12 (Maandeliks)</option><option value="365">365 (Daagliks)</option></select></div>
              <button id="g11c9t2convBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Skakel om</button>
            </div>
            <div id="g11c9t2accP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P (R)</div><input id="g11c9t2p" type="number" value="5000" min="1" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nominaal % p.j.</div><input id="g11c9t2ar" type="number" value="8" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periodes/jaar</div><select id="g11c9t2an" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1">1 (Jaarliks)</option><option value="2">2 (Halfjaarliks)</option><option value="4" selected>4 (Kwartaalliks)</option><option value="12">12 (Maandeliks)</option><option value="365">365 (Daagliks)</option></select></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare t</div><input id="g11c9t2t" type="number" value="3" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9t2accBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken A</button>
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
                if(isNaN(nom)||nom<=0){out.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige nominale koers in.</span>';return;}
                const eff=Math.pow(1+nom/n,n)-1;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">i_nom = '+( nom*100).toFixed(2)+'% saamgestel '+n+'×/jaar</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">i_eff = (1 + '+nom.toFixed(6)+'/'+n+')^'+n+' − 1</span><br>'+
                  '<span style="color:#6ee7b7;">Effektiewe jaarlikse koers = '+(eff*100).toFixed(4)+'% p.j.</span>';
              });
              document.getElementById('g11c9t2accBtn').addEventListener('click',()=>{
                const P=gv('g11c9t2p'),r=gv('g11c9t2ar')/100,n=parseInt(document.getElementById('g11c9t2an').value),t=gv('g11c9t2t');
                if([P,r,t].some(isNaN)||P<=0||r<=0||t<=0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige positiewe waardes in.</span>';return;}
                const A=P*Math.pow(1+r/n,n*t);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">A = '+R(P)+'(1 + '+(r*100).toFixed(2)+'%/'+n+')^('+n+'×'+t+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">= '+R(P)+'('+((1+r/n).toFixed(6))+')^'+(n*t)+'</span><br>'+
                  '<span style="color:#6ee7b7;">A = '+R(A)+'</span>   <span style="color:#fcd34d;">Rente verdien = '+R(A-P)+'</span>';
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
          text: "R5000 belê teen 8% p.j. kwartaalliks saamgestel vir 3 jaar. A =",
          options: ["R6 341", "R6 298", "R6 325", "R6 500"],
          answer: 0,
          topic: "Nominale & effektiewe rentekoerse"
        },
        {
          type: "mc",
          text: "Effektiewe jaarlikse koers ekwivalent aan 10% p.j. halfjaarliks saamgestel:",
          options: ["10.25%", "10.50%", "10%", "10.10%"],
          answer: 0,
          topic: "Nominale & effektiewe rentekoerse"
        },
        {
          type: "input",
          text: "Watter een gee meer: 12% p.j. maandeliks saamgestel OF 12.5% p.j. jaarliks saamgestel? Bereken die effektiewe koers van 12% maandeliks (tot 2 desimale plekke as %).",
          answer: "12.68",
          altAnswers: ["12.68%"],
          topic: "Nominale & effektiewe rentekoerse"
        },
        {
          type: "mc",
          text: "Die formule A = P(1 + i/n)^(nt). As n = 12 en die nominale jaarlikse koers 18% is, is die koers per periode:",
          options: ["1.5%", "18%", "1.5°", "18/100"],
          answer: 0,
          topic: "Nominale & effektiewe rentekoerse"
        },
        {
          type: "mc",
          text: "Meer gereelde samestelling van dieselfde nominale koers beteken:",
          options: ["Minder rente verdien", "Dieselfde rente", "Meer rente verdien", "Die effektiewe koers verminder"],
          answer: 2,
          topic: "Nominale & effektiewe rentekoerse"
        },
        {
          type: "input",
          text: "Vergelyk: Opsie A betaal 9% p.j. maandeliks saamgestel. Bepaal die effektiewe jaarlikse koers van Opsie A (tot 2 desimale plekke, as 'n %).",
          answer: "9.38",
          altAnswers: ["9.38%"],
          topic: "Nominale & effektiewe rentekoerse"
        },
        {
          type: "input",
          text: "'n Belegging wat kwartaalliks saamgestel word, het 'n effektiewe jaarlikse koers van 8.24%. Bepaal die nominale jaarlikse koers, korrek tot 2 desimale plekke (as 'n %).",
          answer: "8.00",
          altAnswers: ["8", "8%", "8.00%"],
          topic: "Nominale & effektiewe rentekoerse"
        }
      ]
    },
    {
      id: 902,
      chapter: 9,
      name: "Multi-stadium-beleggings met tydlyne",
      fullName: "Die oplos van probleme met veranderende rentekoerse en deposito's/onttrekkings deur 'n tydlyn te gebruik",
      lesson: {
        heading: "Multi-stadium-beleggings met tydlyne",
        sub: "Hoofstuk 9 · Onderwerp 3",
        body: `
          <p>Werklike beleggings verander dikwels van koers halfpad deur, of het geld wat bygevoeg/onttrek word. CAPS beveel uitdruklik aan om 'n <strong>tydlyn</strong> te teken om elke stadium op te spoor.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Hoe om 'n tydlyn te bou</div>
            <p>
              1. Teken 'n horisontale lyn gemerk met elke tydstip waarop iets verander (deposito, onttrekking, koersverandering).<br>
              2. Laat die saldo vorentoe groei van een gemerkte punt na die volgende deur die koers te gebruik wat <em>gedurende daardie interval</em> geld.<br>
              3. By 'n onttrekking, trek die bedrag op daardie presiese punt af voordat jy voortgaan om die res te laat groei.<br>
              4. By 'n deposito, tel die bedrag by op daardie presiese punt.<br>
              5. Meng nooit stadiums nie — elke stadium benodig sy eie A = P(1 + i/n)^(nt)-berekening met die korrekte P, i, n, t vir daardie interval alleen.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Koersverandering plus 'n onttrekking</div>
            <p>R50 000 belê teen 8% p.j. kwartaalliks saamgestel vir 18 maande, waarna die koers verander na 6% p.j. maandeliks saamgestel. 2 jaar na die begin word R10 000 onttrek. Bereken die waarde na 4 jaar.<br>
            Stadium 1 (0 → 1.5 jaar, 8% kwartaalliks): A₁ = 50000(1.02)⁶ ≈ R56 308.12<br>
            Stadium 2 (1.5 → 2 jaar, 6% maandeliks, 6 maande): A₂ = 56308.12(1.005)⁶ ≈ R58 018.05<br>
            Onttrek R10 000 by jaar 2: saldo = 48 018.05<br>
            Stadium 3 (2 → 4 jaar, 6% maandeliks, 24 maande): A₃ = 48018.05(1.005)²⁴ ≈ R54 152.71</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Behou ten minste 4-5 desimale plekke (of volle sakrekenaar-akkuraatheid) by elke tussenstadium — vroeë afronding veroorsaak dat die finale antwoord wegdryf.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Twee-Stadium-Tydlynberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Modelleer 'n belegging met een koersverandering (en 'n opsionele onttrekking/deposito by die veranderingspunt).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P (R)</div><input id="g11c9t3p" type="number" value="50000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koers 1 (% p.j.)</div><input id="g11c9t3r1" type="number" value="8" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periodes/jr 1</div><input id="g11c9t3n1" type="number" value="4" min="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare stadium 1</div><input id="g11c9t3t1" type="number" value="1.5" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Onttrek/Deposito (R, +/-)</div><input id="g11c9t3wd" type="number" value="0" style="width:110px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koers 2 (% p.j.)</div><input id="g11c9t3r2" type="number" value="6" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periodes/jr 2</div><input id="g11c9t3n2" type="number" value="12" min="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare stadium 2</div><input id="g11c9t3t2" type="number" value="2.5" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Voer tydlyn uit</button>
            </div>
            <div id="g11c9t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const P=gv('g11c9t3p'),r1=gv('g11c9t3r1')/100,n1=gv('g11c9t3n1'),t1=gv('g11c9t3t1'),wd=gv('g11c9t3wd'),r2=gv('g11c9t3r2')/100,n2=gv('g11c9t3n2'),t2=gv('g11c9t3t2');
                const out=document.getElementById('g11c9t3Out');
                if([P,r1,n1,t1,wd,r2,n2,t2].some(isNaN)||P<=0||r1<=0||n1<=0||t1<=0||r2<=0||n2<=0||t2<=0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (onttrekking/deposito kan 0 of negatief wees om te deponeer).</span>';return;}
                const A1=P*Math.pow(1+r1/n1,n1*t1);
                const afterWd=A1-wd;
                if(afterWd<0){out.innerHTML='<span style="color:#fca5a5;">Onttrekking oorskry die saldo op daardie punt.</span>';return;}
                const A2=afterWd*Math.pow(1+r2/n2,n2*t2);
                let html='<span style="color:rgba(221,225,240,0.50);">Stadium 1: A₁ = '+R(P)+'(1 + '+(r1*100).toFixed(2)+'%/'+n1+')^('+n1+'×'+t1+') = '+R(A1)+'</span><br>';
                if(wd!==0) html+='<span style="color:rgba(221,225,240,0.50);">'+(wd>0?'Onttrek ':'Deponeer ')+R(Math.abs(wd))+' → saldo = '+R(afterWd)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Stadium 2: A₂ = '+R(afterWd)+'(1 + '+(r2*100).toFixed(2)+'%/'+n2+')^('+n2+'×'+t2+')</span><br>';
                html+='<span style="color:#6ee7b7;">Finale waarde = '+R(A2)+'</span>   <span style="color:#fcd34d;">Totale tyd = '+(t1+t2)+' jaar</span>';
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
          text: "'n Tydlyn is die nuttigste wanneer 'n beleggingsprobleem die volgende behels:",
          options: ["'n Enkele konstante koers vir die hele tydperk", "'n Koersverandering en/of 'n onttrekking of deposito halfpad deur", "Slegs enkelvoudige rente", "Slegs waardevermindering"],
          answer: 1,
          topic: "Multi-stadium-beleggings met tydlyne"
        },
        {
          type: "input",
          text: "R20 000 word belê teen 10% p.j. jaarliks saamgestel vir 2 jaar, waarna die volle bedrag teen 8% p.j. jaarliks saamgestel vir nog 1 jaar groei. Bereken die finale waarde (tot die naaste rand).",
          answer: "26136",
          topic: "Multi-stadium-beleggings met tydlyne"
        },
        {
          type: "mc",
          text: "R15 000 groei teen 9% p.j. maandeliks saamgestel vir 1 jaar, waarna R5 000 onttrek word. Die volgende stadium se hoofsom is:",
          options: ["Die waarde na 1 jaar, minus R5 000", "R15 000 minus R5 000", "Die waarde na 1 jaar, plus R5 000", "R5 000"],
          answer: 0,
          topic: "Multi-stadium-beleggings met tydlyne"
        },
        {
          type: "mc",
          text: "Wanneer koerse verander halfpad deur 'n belegging, is die korrekte benadering:",
          options: ["Gebruik die gemiddelde van die twee koerse vir die hele tydperk", "Bereken elke stadium apart met sy eie koers en samestelling, en skakel dan die resultate saam", "Gebruik slegs die eerste koers", "Gebruik slegs die finale koers vir alle jare"],
          answer: 1,
          topic: "Multi-stadium-beleggings met tydlyne"
        },
        {
          type: "input",
          text: "R8 000 word belê teen 12% p.j. kwartaalliks saamgestel vir 6 maande, waarna 'n verdere R2 000 gedeponeer word. Bereken die saldo onmiddellik na die deposito (tot die naaste rand).",
          answer: "10488",
          topic: "Multi-stadium-beleggings met tydlyne"
        },
        {
          type: "input",
          text: "R40 000 word belê teen 8% p.j. halfjaarliks saamgestel vir 2 jaar. Aan die einde van jaar 2 word R15 000 onttrek, en die oorblywende saldo groei teen 6% p.j. maandeliks saamgestel vir nog 18 maande. Bereken die finale waarde (tot die naaste rand).",
          answer: "34781",
          topic: "Multi-stadium-beleggings met tydlyne"
        },
        {
          type: "input",
          text: "Thabo belê R25 000 teen 9% p.j. maandeliks saamgestel. Naledi belê R25 000 teen 'n nominale jaarlikse koers wat kwartaalliks saamgestel word. Na 3 jaar is albei beleggings presies dieselfde bedrag werd. Bepaal Naledi se nominale jaarlikse koers, korrek tot 2 desimale plekke (as 'n %).",
          answer: "9.07",
          altAnswers: ["9.07%"],
          topic: "Multi-stadium-beleggings met tydlyne"
        }
      ]
    },
    {
      id: 903,
      chapter: 9,
      name: "Oplos vir n en i",
      fullName: "Bepaling van die tydperk (n) of die rentekoers (i) in saamgestelde groei- en verminderingsformules",
      lesson: {
        heading: "Oplos vir die tydperk n en die koers i",
        sub: "Hoofstuk 9 · Onderwerp 4",
        body: `
          <p>Behalwe om A te bereken, vereis CAPS dat jy agteruit werk: gegewe A, P en i, vind n; of gegewe A, P en n, vind i. Dit gebruik onderskeidelik logaritmes en wortels.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Oplos vir n (met logaritmes)</div>
            <p>
              Vanaf <span class="math">A = P(1 + i)ⁿ</span>:<br>
              <span class="math">A/P = (1 + i)ⁿ</span><br>
              <span class="math">n = log(A/P) / log(1 + i)</span><br>
              Rond n altyd <em>op</em> af tot die volgende volle samestellingsperiode as die konteks 'n heelgetal aantal periodes vereis (bv. "hoeveel jaar totdat die belegging ... bereik").
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Oplos vir i (met wortels)</div>
            <p>
              Vanaf <span class="math">A = P(1 + i)ⁿ</span>:<br>
              <span class="math">(1 + i) = (A/P)^(1/n)</span><br>
              <span class="math">i = (A/P)^(1/n) − 1</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op vir n</div>
            <p>Hoeveel jaar sal dit neem vir R10 000 om te groei tot R20 000 teen 9% p.j. jaarliks saamgestel?<br>
            2 = (1.09)ⁿ → n = log(2)/log(1.09) ≈ 8.04 jaar → na 9 volle jare (rond op)</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op vir i</div>
            <p>R5 000 groei tot R7 000 in 4 jaar, jaarliks saamgestel. Bereken i.<br>
            i = (7000/5000)^(1/4) − 1 = (1.4)^0.25 − 1 ≈ 0.0878 = 8.78% p.j.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir waardevermindering (verval), geld dieselfde log/wortel-tegnieke vir A = P(1 − i)ⁿ — vervang net (1 − i) in die plek van (1 + i).</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Los op vir n of i-berekenaar</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g11c9t4nbtn" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Los op vir n</button>
              <button id="g11c9t4ibtn" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Los op vir i</button>
            </div>
            <div id="g11c9t4nP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P (R)</div><input id="g11c9t4np" type="number" value="10000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A (R)</div><input id="g11c9t4na" type="number" value="20000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">i (% p.j.)</div><input id="g11c9t4ni" type="number" value="9" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9t4nCalc" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los n op</button>
            </div>
            <div id="g11c9t4iP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P (R)</div><input id="g11c9t4ip" type="number" value="5000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A (R)</div><input id="g11c9t4ia" type="number" value="7000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n (jare)</div><input id="g11c9t4in" type="number" value="4" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c9t4iCalc" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los i op</button>
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
                if([P,A,i].some(isNaN)||P<=0||A<=0||i<=0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige positiewe waardes in.</span>';return;}
                const n=Math.log(A/P)/Math.log(1+i);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">A/P = '+(A/P).toFixed(4)+' = (1 + '+i.toFixed(4)+')ⁿ</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">n = log('+(A/P).toFixed(4)+') / log('+(1+i).toFixed(4)+')</span><br>'+
                  '<span style="color:#6ee7b7;">n ≈ '+n.toFixed(4)+' jaar</span>   <span style="color:#fcd34d;">Rond op na '+Math.ceil(n)+' volle jare as \'n heelgetal periode vereis word</span>';
              });
              document.getElementById('g11c9t4iCalc').addEventListener('click',()=>{
                const P=gv('g11c9t4ip'),A=gv('g11c9t4ia'),n=gv('g11c9t4in');
                if([P,A,n].some(isNaN)||P<=0||A<=0||n<=0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige positiewe waardes in.</span>';return;}
                const i=Math.pow(A/P,1/n)-1;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">(1 + i) = (A/P)^(1/n) = ('+(A/P).toFixed(4)+')^(1/'+n+')</span><br>'+
                  '<span style="color:#6ee7b7;">i ≈ '+(i*100).toFixed(4)+'% p.j.</span>';
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
          text: "Om A = P(1+i)ⁿ vir n op te los, moet jy gebruik:",
          options: ["Logaritmes", "Slegs vierkantswortels", "Die kwadratiese formule", "Eenvoudige deling"],
          answer: 0,
          topic: "Oplos vir n en i"
        },
        {
          type: "input",
          text: "Hoeveel jaar (tot 2 desimale plekke) sal dit neem vir R12 000 om te groei tot R18 000 teen 7% p.j. jaarliks saamgestel?",
          answer: "5.99",
          topic: "Oplos vir n en i"
        },
        {
          type: "mc",
          text: "Om A = P(1+i)ⁿ vir i op te los, moet jy gebruik:",
          options: ["'n Logaritme", "'n n-de wortel", "Lang deling", "Gelyktydige vergelykings"],
          answer: 1,
          topic: "Oplos vir n en i"
        },
        {
          type: "input",
          text: "R6 000 groei tot R9 000 in 3 jaar, jaarliks saamgestel. Bereken i as 'n persentasie (tot 2 desimale plekke).",
          answer: "14.47",
          topic: "Oplos vir n en i"
        },
        {
          type: "mc",
          text: "'n Belegging moet ten minste R50 000 bereik vanaf R30 000 teen 10% p.j. As n uitwerk tot 5.36 jaar, en rente slegs by volle-jaar-intervalle gekrediteer word, is die minimum heelgetal aantal jare benodig:",
          options: ["5", "6", "5.36", "5.5"],
          answer: 1,
          topic: "Oplos vir n en i"
        },
        {
          type: "input",
          text: "R18 000 groei tot R30 000 teen 8.5% p.j. jaarliks saamgestel. Bepaal hoeveel jaar dit neem, korrek tot 2 desimale plekke.",
          answer: "6.26",
          topic: "Oplos vir n en i"
        },
        {
          type: "input",
          text: "'n Masjien verminder in waarde volgens die verminderende-saldo-metode van R500 000 tot R230 000 in 6 jaar. Bepaal die jaarlikse waardeverminderingskoers, korrek tot 2 desimale plekke (as 'n %).",
          answer: "12.14",
          altAnswers: ["12.14%"],
          topic: "Oplos vir n en i"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 9 Werkboek — Finansies, Groei en Verval",
    questions: [
      {
        number: 1,
        text: "'n Vragmotor word gekoop vir R450 000.",
        parts: [
          { label: "a", text: "Bereken die boekwaarde na 6 jaar met behulp van reguitlyn-waardevermindering teen 12% p.j.", marks: 3 },
          { label: "b", text: "Bereken die boekwaarde na 6 jaar met behulp van verminderende-saldo-waardevermindering teen 12% p.j.", marks: 3 },
          { label: "c", text: "Na hoeveel jaar sal die reguitlynwaarde gelyk aan nul wees?", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Nomvula belê R20 000 vir 5 jaar.",
        parts: [
          { label: "a", text: "Bereken die gegroeide waarde teen 9% p.j. maandeliks saamgestel.", marks: 3 },
          { label: "b", text: "Bereken die effektiewe jaarlikse rentekoers vir 9% maandeliks saamgestel (tot 4 desimale plekke as %).", marks: 3 },
          { label: "c", text: "Vergelyk: sou sy meer verdien met 9.4% p.j. jaarliks saamgestel?", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "R30 000 word belê teen 8% p.j. jaarliks saamgestel vir 3 jaar, waarna die volle bedrag herbelê word teen 10% p.j. halfjaarliks saamgestel vir nog 2 jaar. Gebruik 'n tydlyn.",
        parts: [
          { label: "a", text: "Teken die tydlyn en bereken die waarde na 3 jaar.", marks: 3 },
          { label: "b", text: "Bereken die finale waarde na die volle 5 jaar.", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "A=450000(1−0.12×6)=450000(0.28)=R126 000",
        b: "A=450000(0.88)⁶≈450000×0.4644≈R208 980",
        c: "1−0.12n=0 → n=1/0.12≈8.33 jaar (na 8⅓ jaar)"
      },
      2: {
        a: "A=20000(1+0.09/12)^60=20000(1.0075)^60≈20000×1.5657≈R31 314",
        b: "i_eff=(1.0075)^12−1≈0.09381=9.3807%",
        c: "9.4%>9.3807% → 9.4% jaarliks gee effens meer"
      },
      3: {
        a: "A₃=30000(1.08)³≈30000×1.2597≈R37 791",
        b: "A₅=37791(1+0.10/2)⁴=37791(1.05)⁴≈37791×1.2155≈R45 953"
      }
    }
  }
});
