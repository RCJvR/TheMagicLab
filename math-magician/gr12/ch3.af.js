// Math Magician — Graad 12, Hoofstuk 3
// Finansies — Annuïteite en Leningsberekeninge

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 300,
      chapter: 3,
      name: "Toekomswaarde-annuïteite",
      fullName: "Annuïteite, toekomswaarde, en delgingsfondse",
      lesson: {
        heading: "Toekomswaarde-annuïteite",
        sub: "Hoofstuk 3 · Onderwerp 1",
        body: `
          <p>'n <strong>Annuïteit</strong> is 'n reeks gelyke betalings wat op gereelde tussenposes gemaak word. Graad 12-finansies gebruik meetkundige reekse om annuïteitformules af te lei.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Toekomswaarde-annuïteit (spaar)</div>
            <p>
              Gereelde betaling x, gemaak aan die EINDE van elke periode, teen rentekoers i per periode, vir n periodes:<br><br>
              <span class="math">F = x · [(1+i)ⁿ − 1] / i</span><br><br>
              Gebruik wanneer: jy spaar vir 'n doel (bv. aftreefonds, motorfonds)<br>
              F = toekomswaarde (opgehoopte bedrag)<br>
              x = betaling per periode
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Aftreespaargeld</div>
            <p>R2 000 per maand vir 20 jaar teen 9% p.j. maandeliks saamgestel.<br>
            i = 0.09/12 = 0.0075; n = 240<br>
            <span class="math">F = 2000 · [(1.0075)²⁴⁰ − 1] / 0.0075</span><br>
            <span class="math">F = 2000 · [6.0092 − 1] / 0.0075</span><br>
            <span class="math">F = 2000 · 667.89 ≈ R1 335 780</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Bepaal x (die vereiste betaling)</div>
            <p>
              Herrangskik vir x: <span class="math">x = F · i / [(1+i)ⁿ − 1]</span><br><br>
              Word gebruik vir <strong>delgingsfondse</strong>: spaar om 'n bate te vervang.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Toekomswaarde-annuïteit-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">F = x·[(1+i)ⁿ−1]/i — bepaal F (opgehoopte spaargeld) of x (vereiste betaling).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g12c3fvF" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Bepaal F</button>
              <button id="g12c3fvX" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Bepaal x (betaling)</button>
            </div>
            <div id="g12c3fvFP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Betaling x (R)</div><input id="g12c3x" type="number" value="2000" min="1" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nom. koers %/jr</div><input id="g12c3r" type="number" value="9" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periodes/jr</div><select id="g12c3np" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1">1 (Jaarliks)</option><option value="2">2 (Halfjaarliks)</option><option value="4">4 (Kwartaalliks)</option><option value="12" selected>12 (Maandeliks)</option></select></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare</div><input id="g12c3t" type="number" value="20" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c3fvFBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken F</button>
            </div>
            <div id="g12c3fvXP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Teiken F (R)</div><input id="g12c3F" type="number" value="500000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nom. koers %/jr</div><input id="g12c3r2" type="number" value="8" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Periodes/jr</div><select id="g12c3np2" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1" selected>1 (Jaarliks)</option><option value="2">2 (Halfjaarliks)</option><option value="4">4 (Kwartaalliks)</option><option value="12">12 (Maandeliks)</option></select></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare</div><input id="g12c3t2" type="number" value="6" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c3fvXBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bepaal x</button>
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
                if([x,r,t].some(isNaN)||x<=0||r<=0||t<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer positiewe waardes in.</span>";return;}
                const i=r/np,n=np*t,F=x*(Math.pow(1+i,n)-1)/i;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">i = '+r*100+'%/'+np+' = '+(i*100).toFixed(4)+'% per periode; n = '+np+'×'+t+' = '+n+' periodes</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">F = '+R(x)+'·[(1+'+i.toFixed(6)+')^'+n+'−1]/'+i.toFixed(6)+'</span><br>'+
                  '<span style="color:#6ee7b7;">F = '+R(F)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Totaal bygedra: '+R(x*n)+'   Rente verdien: '+R(F-x*n)+'</span>';
              });
              document.getElementById('g12c3fvXBtn').addEventListener('click',()=>{
                const F=gv('g12c3F'),r=gv('g12c3r2')/100,np=gi('g12c3np2'),t=gv('g12c3t2');
                if([F,r,t].some(isNaN)||F<=0||r<=0||t<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer positiewe waardes in.</span>";return;}
                const i=r/np,n=np*t,x=F*i/(Math.pow(1+i,n)-1);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">x = F·i/[(1+i)ⁿ−1]; i = '+(i*100).toFixed(4)+'%; n = '+n+' periodes</span><br>'+
                  '<span style="color:#6ee7b7;">Betaling x = '+R(x)+' per periode</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Totaal bygedra: '+R(x*n)+'</span>';
              });
              setMode('F'); document.getElementById('g12c3fvFBtn').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "R1 000 per maand vir 5 jaar teen 12% p.j. maandeliks saamgestel. Watter een is korrek?", options: ["F = 1000[(1.01)⁶⁰−1]/0.01", "F = 1000[(1.12)⁵−1]/0.12", "F = 1000·60·0.01", "F = 1000(1.01)⁶⁰"], answer: 0, topic: "Toekomswaarde-annuïteite" },
        { type: "mc", text: "'n Delgingsfondsformule bepaal:", options: ["Die toekomswaarde", "Die betaling nodig om 'n toekomswaarde te bereik", "Die rentekoers", "Die aantal periodes"], answer: 1, topic: "Toekomswaarde-annuïteite" },
        { type: "mc", text: "Betalings aan die EINDE van elke periode word genoem:", options: ["Vooruitbetaalde annuïteit", "Gewone annuïteit", "Ewigdurende annuïteit", "Uitgestelde annuïteit"], answer: 1, topic: "Toekomswaarde-annuïteite" },
        { type: "input", text: "Gebruik F = x[(1+i)ⁿ−1]/i met x=500, i=0.01, n=3: bepaal F.", answer: "1515.05", altAnswers: ["1515"], topic: "Toekomswaarde-annuïteite" },
        { type: "mc", text: "Om R100 000 in 10 jaar teen 8% p.j. jaarliks saamgestel op te hoop, voldoen die jaarlikse betaling x aan:", options: ["100000 = x[(1.08)¹⁰−1]/0.08", "x = 100000·0.08/[(1.08)¹⁰−1]", "Beide A en B", "Nie een nie"], answer: 2, topic: "Toekomswaarde-annuïteite" },
        { type: "input", text: "Sipho spaar R1 500 aan die einde van elke maand vir 8 jaar in 'n rekening wat 8.4% p.j. maandeliks saamgestel verdien. Bereken die toekomswaarde van sy spaargeld (naaste rand).", answer: "204337", altAnswers: ["204336", "204336.62"], topic: "Toekomswaarde-annuïteite" },
        { type: "input", text: "Maandelikse spaargeld van R1 000 (einde van maand, 6% p.j. maandeliks saamgestel) word gemaak na 'n teiken van R80 000. Wat is die minimum aantal maande wat benodig word?", answer: "68", topic: "Toekomswaarde-annuïteite" }
      ]
    },
    {
      id: 301,
      chapter: 3,
      name: "Huidige waarde-annuïteite & leningsterugbetalings",
      fullName: "Huidige waarde-annuïteite, leningsterugbetalings, en uitstaande saldo's",
      lesson: {
        heading: "Huidige waarde-annuïteite en leningsterugbetalings",
        sub: "Hoofstuk 3 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Huidige waarde-annuïteit (lenings)</div>
            <p>
              Die huidige waarde P van n gelyke betalings van x teen rentekoers i per periode:<br><br>
              <span class="math">P = x · [1 − (1+i)⁻ⁿ] / i</span><br><br>
              Gebruik vir: huisleningse, motorfinansiering, enige lening met gelyke terugbetalings.<br>
              Herrangskik vir betaling: <span class="math">x = P · i / [1 − (1+i)⁻ⁿ]</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Motorlening</div>
            <p>Motor kos R250 000. 10% deposito. 60 maandelikse betalings teen 11% p.j. maandeliks saamgestel.<br>
            P = R225 000; i = 0.11/12 ≈ 0.009167; n = 60<br>
            <span class="math">x = 225000 · 0.009167 / [1 − (1.009167)⁻⁶⁰]</span><br>
            <span class="math">x ≈ 225000 · 0.009167 / 0.4225 ≈ R4 882 per maand</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Uitstaande saldo</div>
            <p>
              Die uitstaande saldo na k betalings is die huidige waarde van die <em>oorblywende</em> (n − k) betalings:<br>
              <span class="math">Saldo_k = x · [1 − (1+i)⁻⁽ⁿ⁻ᵏ⁾] / i</span><br><br>
              Of: bereken met die toekomswaarde-metode — dra die oorspronklike lening vorentoe en trek die toekomswaarde van reeds gemaakte betalings af.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Leningsterugbetaling-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">P = x·[1−(1+i)⁻ⁿ]/i — bepaal maandelikse betaling, dan uitstaande saldo na k betalings.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Lening P (R)</div><input id="g12c3lP" type="number" value="1440000" min="1" style="width:110px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Nom. koers %/jr</div><input id="g12c3lr" type="number" value="10.5" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Termyn (jare)</div><input id="g12c3lt" type="number" value="25" min="1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Na k betalings</div><input id="g12c3lk" type="number" value="60" min="0" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c3lBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g12c3lOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const out=document.getElementById('g12c3lOut');
              document.getElementById('g12c3lBtn').addEventListener('click',()=>{
                const P=gv('g12c3lP'),r=gv('g12c3lr')/100,t=gv('g12c3lt'),k=gv('g12c3lk');
                if([P,r,t].some(isNaN)||P<=0||r<=0||t<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer geldige leningsbesonderhede in.</span>";return;}
                const i=r/12,n=12*t;
                const x=P*i/(1-Math.pow(1+i,-n));
                const remaining=n-k;
                const balance=remaining>0?x*(1-Math.pow(1+i,-remaining))/i:0;
                const totalPaid=x*n,totalInt=totalPaid-P;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">i = '+(i*100).toFixed(4)+'% per maand; n = '+n+' maande</span><br>'+
                  '<span style="color:#6ee7b7;">Maandelikse betaling x = '+R(x)+'</span><br>'+
                  (k>0&&k<n?'<span style="color:#fcd34d;">Saldo na '+k+' betalings ('+remaining+' oorblywend): '+R(balance)+'</span><br>':'')+
                  '<span style="color:rgba(221,225,240,0.50);">Totaal terugbetaal oor volle termyn: '+R(totalPaid)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Totale rente betaal: '+R(totalInt)+'</span>';
              });
              ['g12c3lP','g12c3lr','g12c3lt','g12c3lk'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g12c3lBtn').click();});});
              document.getElementById('g12c3lBtn').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Huislening R1 000 000 teen 8.5% p.j. maandeliks saamgestel oor 20 jaar. Maandelikse betalingsformule:", options: ["x = 1000000·(0.085/12)/[1−(1+0.085/12)⁻²⁴⁰]", "x = 1000000·0.085/20", "x = 1000000/240", "x = 1000000·0.085"], answer: 0, topic: "Huidige waarde-annuïteite & leningsterugbetalings" },
        { type: "mc", text: "Die huidige waarde-formule word gebruik om:", options: ["Te bepaal hoeveel om te spaar", "Die leningsbedrag te bepaal wat by gegewe terugbetalings pas", "Die toekomswaarde van spaargeld te bepaal", "Saamgestelde rente te bepaal"], answer: 1, topic: "Huidige waarde-annuïteite & leningsterugbetalings" },
        { type: "mc", text: "Na 5 jaar van 'n 20-jaar-lening met maandelikse betalings x, gebruik die uitstaande saldo:", options: ["n = 20 en k = 60", "n−k = 180 oorblywende betalings", "Slegs x en die oorspronklike hoofsom", "Die toekomswaarde-formule"], answer: 1, topic: "Huidige waarde-annuïteite & leningsterugbetalings" },
        { type: "input", text: "P = 10000, i = 0.01 per maand, n = 12. Bepaal x (maandelikse betaling) tot naaste rand. Gebruik x = Pi/[1−(1.01)⁻¹²]. Antwoord ≈", answer: "889", topic: "Huidige waarde-annuïteite & leningsterugbetalings" },
        { type: "mc", text: "Totale rente betaal op 'n lening = ", options: ["Hoofsom × koers × tyd", "Totale terugbetalings − oorspronklike leningsbedrag", "Maandelikse betaling × n", "Toekomswaarde − huidige waarde"], answer: 1, topic: "Huidige waarde-annuïteite & leningsterugbetalings" },
        { type: "input", text: "'n Lening van R450 000 word terugbetaal met gelyke maandelikse paaiemente oor 15 jaar teen 12% p.j. maandeliks saamgestel. Bereken die uitstaande saldo onmiddellik na die 100ste betaling (naaste rand).", answer: "296438", altAnswers: ["296437", "296437.82"], topic: "Huidige waarde-annuïteite & leningsterugbetalings" },
        { type: "input", text: "'n Lening van R200 000 teen 13% p.j. maandeliks saamgestel word terugbetaal met maandelikse paaiemente van R3 000. Bepaal die minimum aantal maandelikse betalings benodig om die lening te delg.", answer: "119", topic: "Huidige waarde-annuïteite & leningsterugbetalings" }
      ]
    },
    {
      id: 302,
      chapter: 3,
      name: "Enkelvoudige & saamgestelde groei teenoor verval",
      fullName: "Onderskei tussen enkelvoudige en saamgestelde groei/verval, en annuïteite",
      lesson: {
        heading: "Enkelvoudige groei, saamgestelde groei, en verval",
        sub: "Hoofstuk 3 · Onderwerp 3",
        body: `
          <p>Voordat annuïteite aangepak word, hersien en verskerp Graad 12 die onderskeid tussen <strong>enkelvoudige</strong> en <strong>saamgestelde</strong> groei/verval — en verduidelik hoe annuïteite van albei verskil ('n enkele eenmalige bedrag teenoor 'n stroom betalings).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Enkelvoudige groei/verval (lineêr)</div>
            <p>
              Rente word elke periode bereken op die <strong>oorspronklike hoofsom alleen</strong>:<br>
              <span class="math">A = P(1 + i·n)</span> — groei<br>
              <span class="math">A = P(1 − i·n)</span> — verval<br>
              waar P = hoofsom, i = koers per periode, n = aantal periodes.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Saamgestelde groei/verval (eksponensieel)</div>
            <p>
              Rente word bereken op die <strong>opgehoopte bedrag</strong> (hoofsom + vorige rente):<br>
              <span class="math">A = P(1 + i)ⁿ</span> — groei (bv. beleggings, bevolkingsgroei)<br>
              <span class="math">A = P(1 − i)ⁿ</span> — verval (bv. waardevermindering, radioaktiewe verval)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Annuïteite teenoor enkelbedrag-groei/verval</div>
            <p>
              Groei/verval-formules (A = P(1±i)ⁿ) geld vir 'n <strong>enkele eenmalige bedrag</strong> wat gelaat word om te groei of te krimp.<br>
              Annuïteitformules (F en P uit Onderwerpe 1–2) geld wanneer daar 'n <strong>reeks gelyke gereelde betalings</strong> is — die meetkundige reeks-formule is wat hulle genereer.<br><br>
              Om te herken in watter situasie jy is, is dikwels die moeilikste deel van 'n finansiesvraag.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Saamgestelde groeikoers</div>
            <p>'n Dorp se bevolking groei van 120 000 tot 214 000 in 10 jaar. Bepaal die jaarlikse saamgestelde groeikoers.<br>
            <span class="math">214000 = 120000(1+i)¹⁰ → (1+i)¹⁰ = 1.7833</span><br>
            <span class="math">1+i = 1.7833^(1/10) ≈ 1.0596 → i ≈ 5.96% p.j.</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Reguitlyn-waardevermindering</div>
            <p>'n Masjien wat R80 000 kos, depresieer volgens enkelvoudige verval teen 15% p.j. Boekwaarde na 4 jaar:<br>
            <span class="math">A = 80000(1 − 0.15×4) = 80000(0.4) = R32 000</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Enkelvoudig-vs-Saamgestel-Vergelykingsinstrument</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Vergelyk enkelvoudige en saamgestelde groei/verval op dieselfde hoofsom, koers, en tyd.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoofsom P (R)</div><input id="g12c3gP" type="number" value="80000" min="1" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koers %/jr</div><input id="g12c3gi" type="number" value="15" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Jare</div><input id="g12c3gn" type="number" value="4" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Modus</div>
                <select id="g12c3gMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="growth">Groei</option><option value="decay">Verval</option>
                </select>
              </div>
              <button id="g12c3gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vergelyk</button>
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
                if([P,i,n].some(isNaN)||P<=0||i<=0||n<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer positiewe waardes in.</span>";return;}
                const sign=mode==='growth'?1:-1;
                const simple=P*(1+sign*i*n);
                const compound=P*Math.pow(1+sign*i,n);
                const modeAf=mode==='growth'?'groei':'verval';
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Enkelvoudig: A = P(1'+(sign>0?'+':'−')+'i·n) = '+R(P)+'(1'+(sign>0?'+':'−')+(i).toFixed(4)+'×'+n+')</span><br>'+
                  '<span style="color:#fcd34d;">Enkelvoudige '+modeAf+': A = '+R(simple)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Saamgestel: A = P(1'+(sign>0?'+':'−')+'i)ⁿ = '+R(P)+'(1'+(sign>0?'+':'−')+(i).toFixed(4)+')^'+n+'</span><br>'+
                  '<span style="color:#6ee7b7;">Saamgestelde '+modeAf+': A = '+R(compound)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.45);">Verskil: '+R(Math.abs(compound-simple))+'</span>';
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
        { type: "mc", text: "Enkelvoudige rente word bereken op:", options: ["Die opgehoopte bedrag elke periode", "Die oorspronklike hoofsom alleen", "Die finale bedrag alleen", "Niks — dit geld nie vir geld nie"], answer: 1, topic: "Enkelvoudige & saamgestelde groei teenoor verval" },
        { type: "mc", text: "'n Motor depresieer volgens saamgestelde verval. Die formule is:", options: ["A = P(1 − in)", "A = P(1 − i)ⁿ", "A = P(1 + i)ⁿ", "A = Pin"], answer: 1, topic: "Enkelvoudige & saamgestelde groei teenoor verval" },
        { type: "input", text: "R50 000 groei teen enkelvoudige rente van 8% p.j. vir 3 jaar. Bepaal A.", answer: "62000", topic: "Enkelvoudige & saamgestelde groei teenoor verval" },
        { type: "mc", text: "'n Bevolking groei van 50 000 tot 65 000 in 5 jaar onder saamgestelde groei. Watter vergelyking bepaal die koers i?", options: ["65000 = 50000(1+i)⁵", "65000 = 50000(1+5i)", "50000 = 65000(1+i)⁵", "i = (65000−50000)/5"], answer: 0, topic: "Enkelvoudige & saamgestelde groei teenoor verval" },
        { type: "mc", text: "Annuïteitformules verskil van enkelbedrag-groei/verval-formules omdat annuïteite behels:", options: ["'n Eenmalige bedrag", "'n Reeks gelyke gereelde betalings", "Geen rente hoegenaamd nie", "Slegs enkelvoudige rente"], answer: 1, topic: "Enkelvoudige & saamgestelde groei teenoor verval" },
        { type: "input", text: "Toerusting ter waarde van R120 000 depresieer volgens saamgestelde verval teen 20% p.j. Bepaal die waarde na 2 jaar (naaste rand).", answer: "76800", topic: "Enkelvoudige & saamgestelde groei teenoor verval" },
        { type: "input", text: "'n Motor gekoop vir R320 000 depresieer volgens die verminderende-saldo-metode (saamgestelde verval). Na 5 jaar is die boekwaarde R140 000. Bereken die jaarlikse waardeverminderingskoers, tot 1 desimale plek (%).", answer: "15.2", altAnswers: ["15,2"], topic: "Enkelvoudige & saamgestelde groei teenoor verval" },
        { type: "input", text: "R25 000 word vir 3 jaar teen 9% p.j. enkelvoudige rente belê, waarna die opgehoopte bedrag vir 'n verdere 4 jaar teen 9% p.j. saamgestelde rente herbelê word. Bereken die finale waarde (naaste rand).", answer: "44818", altAnswers: ["44817", "44817.72"], topic: "Enkelvoudige & saamgestelde groei teenoor verval" }
      ]
    },
    {
      id: 303,
      chapter: 3,
      name: "Vergelyking van belegging- & leningsopsies",
      fullName: "Krities ontleed en vergelyk belegging- en leningsopsies, insluitend effektiewe teenoor nominale koerse",
      lesson: {
        heading: "Vergelyking van belegging- en leningsopsies",
        sub: "Hoofstuk 3 · Onderwerp 4",
        body: `
          <p>CAPS vereis dat leerders belegging- en leningsopsies <strong>krities ontleed</strong> en ingeligte besluite neem — dit beteken koerse regverdig vergelyk, nie net die grootste-lykende persentasie kies nie.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Nominale teenoor effektiewe rentekoers</div>
            <p>
              'n <strong>Nominale</strong> koers word per jaar aangehaal maar meer gereeld saamgestel (bv. "9% p.j. maandeliks saamgestel").<br>
              Die <strong>effektiewe jaarlikse koers</strong> skakel dit om na 'n ware jaarlikse ekwivalent vir regverdige vergelyking:<br><br>
              <span class="math">i_eff = (1 + i_nom/m)^m − 1</span><br>
              waar m = aantal samestellingsperiodes per jaar.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vergelyk twee beleggings</div>
            <p>Belegging A: 9% p.j. maandeliks saamgestel. Belegging B: 9.2% p.j. jaarliks saamgestel.<br>
            A: i_eff = (1 + 0.09/12)¹² − 1 ≈ 9.381%<br>
            B: i_eff = 9.2% (reeds jaarliks)<br>
            Belegging A is eintlik die beter koers, ten spyte daarvan dat B se opskrifkoers hoër lyk!</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Punte om te oorweeg by die vergelyking van lenings</div>
            <p>
              • Effektiewe rentekoers (nie net die aangehaalde nominale koers nie)<br>
              • Totale bedrag terugbetaal oor die volle termyn (klein maandelikse besparings kan oor die algemeen meer kos as die termyn langer is)<br>
              • Fooie en heffings (aanvangsfooie, admin-fooie) wat by die werklike koste voeg<br>
              • Buigsaamheid — vroeë delging, ekstra betalings, terugbetalingsvakansies<br>
              • Vir piramide-tipe "belegging"-skemas: volhoubare skemas betaal opbrengste uit werklike wins; onvolhoubare ("piramide")-skemas betaal vroeë beleggers met nuwe beleggers se geld en misluk onvermydelik.
            </p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Eksamenwenk</div>
            <p>Skakel mededingende koerse altyd om na dieselfde samestellingsbasis (gewoonlik die effektiewe jaarlikse koers) voordat jy vergelyk — vergelyk nooit 'n maandeliks-saamgestelde nominale koers direk met 'n jaarliks-saamgestelde een nie.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Effektiewe-Jaarlikse-Koers-Vergelyker</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee nominale koerse met hul samestellingsfrekwensie in — sien watter een die beter effektiewe jaarlikse koers gee.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Opsie A koers %</div><input id="g12c3eA" type="number" value="9" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A saamgestel/jr</div><select id="g12c3eAm" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1">1</option><option value="2">2</option><option value="4">4</option><option value="12" selected>12</option></select></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Opsie B koers %</div><input id="g12c3eB" type="number" value="9.2" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">B saamgestel/jr</div><select id="g12c3eBm" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;"><option value="1" selected>1</option><option value="2">2</option><option value="4">4</option><option value="12">12</option></select></div>
              <button id="g12c3eBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vergelyk</button>
            </div>
            <div id="g12c3eOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gi(id){return parseInt(document.getElementById(id).value);}
              function calc(){
                const rA=gv('g12c3eA')/100,mA=gi('g12c3eAm'),rB=gv('g12c3eB')/100,mB=gi('g12c3eBm');
                const out=document.getElementById('g12c3eOut');
                if([rA,rB].some(isNaN)||rA<=0||rB<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer geldige koerse in.</span>";return;}
                const effA=(Math.pow(1+rA/mA,mA)-1)*100;
                const effB=(Math.pow(1+rB/mB,mB)-1)*100;
                const better=effA>effB?'A':(effB>effA?'B':'A en B is gelyk');
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Opsie A: i_eff = (1+'+(rA/mA).toFixed(6)+')^'+mA+' − 1 = '+effA.toFixed(4)+'%</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Opsie B: i_eff = (1+'+(rB/mB).toFixed(6)+')^'+mB+' − 1 = '+effB.toFixed(4)+'%</span><br>'+
                  '<span style="color:#6ee7b7;">Beter effektiewe koers: Opsie '+better+'</span>';
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
        { type: "mc", text: "Die effektiewe jaarlikse koers-formule is:", options: ["i_eff = (1 + i_nom/m)^m − 1", "i_eff = i_nom × m", "i_eff = i_nom/m", "i_eff = m(1+i_nom)"], answer: 0, topic: "Vergelyking van belegging- & leningsopsies" },
        { type: "mc", text: "9% p.j. maandeliks saamgestel gee 'n effektiewe jaarlikse koers van ongeveer:", options: ["9%", "9.38%", "9.75%", "10.2%"], answer: 1, topic: "Vergelyking van belegging- & leningsopsies" },
        { type: "mc", text: "Voordat jy twee beleggingskoerse regverdig vergelyk, moet jy eers:", options: ["Albei met die termyn vermenigvuldig", "Albei omskakel na dieselfde effektiewe jaarlikse koers", "Altyd die hoër nominale koers kies", "Samestellingsfrekwensie ignoreer"], answer: 1, topic: "Vergelyking van belegging- & leningsopsies" },
        { type: "mc", text: "'n Piramideskema is onvolhoubaar omdat:", options: ["Dit hoegenaamd geen rente betaal nie", "Opbrengste uit nuwe beleggers se geld betaal word, nie werklike wins nie", "Dit altyd saamgestelde rente gebruik", "Dit onwettig is om te adverteer"], answer: 1, topic: "Vergelyking van belegging- & leningsopsies" },
        { type: "input", text: "Bepaal die effektiewe jaarlikse koers vir 12% p.j. kwartaalliks saamgestel, tot 2 desimale plekke (%).", answer: "12.55", altAnswers: ["12,55"], topic: "Vergelyking van belegging- & leningsopsies" },
        { type: "mc", text: "Bank A bied 10.4% p.j. kwartaalliks saamgestel. Bank B bied 10.3% p.j. maandeliks saamgestel. Watter een bied die beter effektiewe jaarlikse koers?", options: ["Bank A", "Bank B", "Hulle is gelyk", "Kan nie bepaal word sonder meer inligting nie"], answer: 0, topic: "Vergelyking van belegging- & leningsopsies" },
        { type: "input", text: "Gebruik die effektiewe jaarlikse koers-formule om die effektiewe jaarlikse koers vir Bank A (10.4% p.j. kwartaalliks saamgestel) te bereken, tot 2 desimale plekke (%).", answer: "10.81", altAnswers: ["10,81"], topic: "Vergelyking van belegging- & leningsopsies" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 3 Werkboek — Finansies",
    questions: [
      { number: 1, text: "Thabo spaar R800 per maand in 'n rekening wat 7.2% p.j. maandeliks saamgestel verdien.", parts: [
        { label: "a", text: "Hoeveel sal hy na 10 jaar hê?", marks: 3 },
        { label: "b", text: "Hoeveel het hy in totaal bygedra?", marks: 1 },
        { label: "c", text: "Hoeveel rente het hy verdien?", marks: 1 }
      ]},
      { number: 2, text: "'n Huis kos R1 800 000. 'n 20% deposito word betaal en die balans word oor 25 jaar teen 10.5% p.j. maandeliks saamgestel gefinansier.", parts: [
        { label: "a", text: "Bepaal die leningsbedrag.", marks: 1 },
        { label: "b", text: "Bepaal die maandelikse terugbetaling.", marks: 3 },
        { label: "c", text: "Bepaal die uitstaande saldo na 5 jaar (60 betalings).", marks: 4 },
        { label: "d", text: "Bepaal die totale rente betaal oor die volle 25 jaar.", marks: 2 }
      ]},
      { number: 3, text: "'n Maatskappy moet masjinerie ter waarde van R500 000 in 6 jaar vervang. Hulle stel 'n delgingsfonds op wat gelyke jaarlikse bedrae teen 8% p.j. jaarliks saamgestel betaal.", parts: [
        { label: "a", text: "Bepaal die vereiste jaarlikse betaling.", marks: 3 },
        { label: "b", text: "Hoeveel minder sou benodig word as die rentekoers 10% was?", marks: 3 }
      ]},
      { number: 4, text: "Die waarde van 'n belegging, aan die einde van elke jaar opgeteken, word in die onderstaande tabel getoon:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Jaar (n)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Waarde (R)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10 000.00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10 800.00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>11 664.00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>12 597.12</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>13 604.89</td></tr></table>", parts: [
        { label: "a", text: "Gebruik twee opeenvolgende waardes uit die tabel om die jaarlikse saamgestelde groeikoers te bepaal.", marks: 2 },
        { label: "b", text: "Skryf die waarde van die aanvanklike belegging (by jaar 0) neer.", marks: 1 },
        { label: "c", text: "Skryf dus die algemene formule vir die waarde na n jaar, in die vorm A = P(1+i)ⁿ.", marks: 2 },
        { label: "d", text: "Gebruik jou formule om die waarde aan die einde van jaar 8 te voorspel (naaste rand).", marks: 2 }
      ]}
    ],
    answers: {
      1: { a: "F=800·[(1.006)¹²⁰−1]/0.006≈800·173.08≈R138 464", b: "800×120=R96 000", c: "138464−96000=R42 464" },
      2: { a: "Lening=0.8×1800000=R1 440 000", b: "i=0.105/12=0.00875; n=300; x=1440000×0.00875/[1−(1.00875)⁻³⁰⁰]≈R13 786/maand", c: "Saldo=13786·[1−(1.00875)⁻²⁴⁰]/0.00875≈R1 345 000", d: "Totaal betaal=13786×300=R4 135 800; Rente=4135800−1440000≈R2 695 800" },
      3: { a: "x=500000×0.08/[(1.08)⁶−1]=500000×0.08/0.5869≈R68 138", b: "x teen 10%: 500000×0.10/[(1.10)⁶−1]=500000×0.10/0.7716≈R64 802; bespaar R68138−R64802=R3 336" },
      4: { a: "i = 10800/10000 − 1 = 0.08, bevestig met 11664/10800 − 1 = 0.08 → i = 8% p.j.", b: "P = R10 000 (die waarde by n = 0)", c: "A = 10000(1.08)ⁿ", d: "A = 10000(1.08)⁸ ≈ R18 509.30" }
    }
  }
});
