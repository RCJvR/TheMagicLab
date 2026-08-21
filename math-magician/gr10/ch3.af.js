// Math Magician — Graad 10, Hoofstuk 3
// Getalpatrone

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 300,
      chapter: 3,
      name: "Lineêre rye",
      fullName: "Beskryf en veralgemeen lineêre (rekenkundige) rye",
      lesson: {
        heading: "Lineêre getalpatrone",
        sub: "Hoofstuk 3 · Onderwerp 1",
        body: `
          <p>'n <strong>Ry</strong> is 'n geordende lys van getalle. In Graad 10 fokus ons op <strong>lineêre rye</strong>, waar die verskil tussen opeenvolgende terme konstant is.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Lineêre (rekenkundige) ry</div>
            <p>'n Ry waar elke term met 'n vaste hoeveelheid toeneem of afneem, genoem die <strong>gemeenskaplike verskil (d)</strong>.<br><br>
            Algemene term (n-de term): <span class="math">Tₙ = a + (n − 1)d</span><br>
            waar <span class="math">a</span> = eerste term, <span class="math">d</span> = gemeenskaplike verskil, <span class="math">n</span> = termnommer.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld 1: Vind die n-de term</div>
            <p>Ry: 3, 7, 11, 15, …<br>
            <span class="math">a = 3</span>, <span class="math">d = 4</span><br>
            <span class="math">Tₙ = 3 + (n − 1)(4) = 3 + 4n − 4 = 4n − 1</span><br>
            Kontroleer: <span class="math">T₁ = 4(1) − 1 = 3 ✓</span> &nbsp; <span class="math">T₄ = 4(4) − 1 = 15 ✓</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld 2: Vind watter term gelyk is aan 'n waarde</div>
            <p>Vir <span class="math">Tₙ = 4n − 1</span>, watter term is gelyk aan 79?<br>
            <span class="math">4n − 1 = 79</span><br>
            <span class="math">4n = 80</span><br>
            <span class="math">n = 20</span> → Dit is die 20ste term.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Bepaal d vanaf die patroon</div>
            <p>
              <span class="math">d = T₂ − T₁ = T₃ − T₂ = …</span><br>
              Jy kan ook <span class="math">d</span> bepaal as jy twee nie-opeenvolgende terme gegee word:<br>
              As <span class="math">Tₘ</span> en <span class="math">Tₙ</span> bekend is: <span class="math">d = (Tₙ − Tₘ)/(n − m)</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Rekenkundige Ry-Verkenner</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die eerste term en gemeenskaplike verskil in — verken die ry en sy algemene term.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Eerste term (a)</div>
                <input id="g10c3a" type="number" value="3"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gemeensk. verskil (d)</div>
                <input id="g10c3d" type="number" value="4"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Vind Tₙ vir n =</div>
                <input id="g10c3n" type="number" value="10" min="1"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c3Btn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Genereer
              </button>
            </div>
            <div id="g10c3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const a=parseFloat(document.getElementById('g10c3a').value);
                const d=parseFloat(document.getElementById('g10c3d').value);
                const n=parseInt(document.getElementById('g10c3n').value);
                const out=document.getElementById('g10c3Out');
                if(isNaN(a)||isNaN(d)||isNaN(n)||n<1){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (n ≥ 1).</span>';return;}
                // Eerste 8 terme
                const terms=[];
                for(let i=1;i<=8;i++) terms.push(a+(i-1)*d);
                // Algemene term: Tn = a + (n-1)d = dn + (a-d)
                const c=a-d; // konstante term
                let formula='Tₙ = ';
                if(d===0) formula+=a;
                else if(d===1) formula+=(c===0?'n':c>0?'n + '+c:'n − '+Math.abs(c));
                else if(d===-1) formula+=(c===0?'−n':c>0?'−n + '+c:'−n − '+Math.abs(c));
                else formula+=d+'n'+(c===0?'':c>0?' + '+c:' − '+Math.abs(c));
                const Tn=a+(n-1)*d;
                let html='<span style="color:rgba(221,225,240,0.50);">Eerste 8 terme: </span><span style="color:#fcd34d;">'+terms.join(', ')+'…</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Algemene term: </span><span style="color:#fcd34d;">'+formula+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">T<sub>'+n+'</sub> = '+a+' + ('+(n-1)+')×('+d+') = </span><span style="color:#6ee7b7;">'+Tn+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c3Btn').addEventListener('click',run);
              ['g10c3a','g10c3d','g10c3n'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>'n Vinnige kortpad: skryf <span class="math">Tₙ = dn + (a − d)</span>. Die koëffisiënt van n is altyd d, en die konstante is die "nulde term" (een stap voor T₁).</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Die ry 5, 9, 13, 17, … het n-de term:",
          options: ["4n + 1", "4n − 1", "5n − 4", "n + 4"],
          answer: 0,
          topic: "Lineêre rye"
        },
        {
          type: "input",
          text: "Vir Tₙ = 3n + 2, wat is T₇?",
          answer: "23",
          topic: "Lineêre rye"
        },
        {
          type: "mc",
          text: "Watter term van 2, 5, 8, 11, … is gelyk aan 98?",
          options: ["30ste", "32ste", "33ste", "34ste"],
          answer: 2,
          topic: "Lineêre rye"
        },
        {
          type: "input",
          text: "'n Ry het T₃ = 10 en T₇ = 22. Bepaal d.",
          answer: "3",
          topic: "Lineêre rye"
        },
        {
          type: "mc",
          text: "Die 1ste term van 'n lineêre ry is 8 en d = −3. Wat is T₅?",
          options: ["−4", "−7", "20", "−1"],
          answer: 0,
          topic: "Lineêre rye"
        },
        {
          type: "input",
          text: "'n Lineêre ry het T₄ = 22 en T₁₀ = 58. Bepaal T₁₅.",
          answer: "88",
          topic: "Lineêre rye"
        },
        {
          type: "input",
          text: "Vir die ry met Tₙ = 5n − 3, vind die kleinste waarde van n waarvoor Tₙ > 500.",
          answer: "101",
          topic: "Lineêre rye"
        }
      ]
    },
    {
      id: 301,
      chapter: 3,
      name: "Patrone in konteks",
      fullName: "Getalpatrone in tabelle, grafieke, en werklike kontekste",
      lesson: {
        heading: "Patrone in konteks — tabelle, diagramme, en grafieke",
        sub: "Hoofstuk 3 · Onderwerp 2",
        body: `
          <p>Getalpatrone kom voor in vuurhoutjie-legkaarte, groeiprobleme, kostetabelle, en baie werklike situasies. Die sleutelvaardigheid is om die patroon te identifiseer en 'n algemene reël neer te skryf.</p>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vuurhoutjiepatroon</div>
            <p>'n Patroon van vierkante word met vuurhoutjies gebou:</p>
            <p>1 vierkant → 4 vuurhoutjies<br>
            2 vierkante → 7 vuurhoutjies<br>
            3 vierkante → 10 vuurhoutjies</p>
            <p>Die verskille is konstant (d = 3), so dit is lineêr.<br>
            <span class="math">Tₙ = 4 + (n−1)(3) = 3n + 1</span><br>
            Kontroleer: <span class="math">n=1</span>: 4 ✓ &nbsp; <span class="math">n=3</span>: 10 ✓</p>
            <p>Hoeveel vuurhoutjies vir 20 vierkante? <span class="math">T₂₀ = 3(20) + 1 = 61</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Lees patrone uit 'n tabel</div>
            <p>
              Gegee 'n tabel van waardes, kontroleer of die verskille konstant is.<br>
              As ja → lineêr; vind <span class="math">a</span> en <span class="math">d</span> om <span class="math">Tₙ</span> neer te skryf.<br>
              <br>
              | n | 1 | 2 | 3 | 4 |<br>
              | T | 7 | 11 | 15 | 19 |<br>
              Verskille: almal 4 → <span class="math">d = 4, a = 7</span><br>
              <span class="math">Tₙ = 4n + 3</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Grafieke van lineêre rye</div>
            <p>
              Wanneer dit as (n, Tₙ) geplot word, gee 'n lineêre ry <strong>diskrete punte</strong> wat op 'n reguit lyn lê.<br>
              Die gradiënt van daardie lyn is gelyk aan <span class="math">d</span>.<br>
              Die y-afsnit is gelyk aan <span class="math">a − d</span> (die "nulde term").
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Patroonvinder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die eerste drie terme van 'n ry in — vind die formule en voorspel enige term.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₁</div>
                <input id="g10c3pt1" type="number" value="4"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₂</div>
                <input id="g10c3pt2" type="number" value="7"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₃</div>
                <input id="g10c3pt3" type="number" value="10"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Vind term n</div>
                <input id="g10c3pn" type="number" value="20" min="1"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c3pBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Ontleed
              </button>
            </div>
            <div id="g10c3pOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const t1=parseFloat(document.getElementById('g10c3pt1').value);
                const t2=parseFloat(document.getElementById('g10c3pt2').value);
                const t3=parseFloat(document.getElementById('g10c3pt3').value);
                const n=parseInt(document.getElementById('g10c3pn').value);
                const out=document.getElementById('g10c3pOut');
                if([t1,t2,t3,n].some(isNaN)||n<1){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in.</span>';return;}
                const d1=t2-t1, d2=t3-t2;
                if(Math.abs(d1-d2)>0.0001){
                  out.innerHTML='<span style="color:#fca5a5;">Verskille nie konstant nie (d₁='+d1+', d₂='+d2+') — nie \'n lineêre ry nie.</span>';
                  return;
                }
                const d=d1;
                const a=t1;
                const c=a-d;
                let formula='Tₙ = ';
                if(d===0) formula+=a;
                else if(d===1) formula+=(c===0?'n':c>0?'n + '+c:'n − '+Math.abs(c));
                else if(d===-1) formula+=(c===0?'−n':c>0?'−n + '+c:'−n − '+Math.abs(c));
                else formula+=d+'n'+(c===0?'':c>0?' + '+c:' − '+Math.abs(c));
                const Tn=a+(n-1)*d;
                let html='<span style="color:rgba(221,225,240,0.50);">Verskille: T₂−T₁ = '+d1+', T₃−T₂ = '+d2+' → </span><span style="color:#6ee7b7;">Lineêre ry ✓</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Gemeenskaplike verskil: </span><span style="color:#fcd34d;">d = '+d+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Algemene term: </span><span style="color:#fcd34d;">'+formula+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">T<sub>'+n+'</sub> = '+d+'('+n+') + ('+c+') = </span><span style="color:#6ee7b7;">'+Tn+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c3pBtn').addEventListener('click',run);
              ['g10c3pt1','g10c3pt2','g10c3pt3','g10c3pn'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>As die verskille tussen opeenvolgende terme <em>nie</em> almal gelyk is nie, is die ry nie lineêr nie — kyk eerder vir 'n kwadratiese of meetkundige patroon.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Patroon van driehoeke gebruik vuurhoutjies: 1 driehoek = 3, 2 = 5, 3 = 7. Formule vir n driehoeke:",
          options: ["3n", "2n + 1", "n + 2", "2n + 3"],
          answer: 1,
          topic: "Patrone in konteks"
        },
        {
          type: "input",
          text: "'n Tabel toon n = 1: T = 5, n = 2: T = 8, n = 3: T = 11. Bepaal T vir n = 10.",
          answer: "32",
          topic: "Patrone in konteks"
        },
        {
          type: "mc",
          text: "Vir Tₙ = 5n − 2, is die gradiënt wanneer op 'n grafiek geplot:",
          options: ["−2", "3", "5", "5n"],
          answer: 2,
          topic: "Patrone in konteks"
        },
        {
          type: "mc",
          text: "'n Lineêre ry word geplot. Punte lê op 'n lyn met gradiënt 4 en y-afsnit 1. Die n-de term is:",
          options: ["4n + 1", "4n − 3", "n + 4", "4n + 5"],
          answer: 1,
          topic: "Patrone in konteks"
        },
        {
          type: "input",
          text: "Tₙ = an + b. Gegee T₂ = 9 en T₅ = 18. Bepaal a.",
          answer: "3",
          topic: "Patrone in konteks"
        },
        {
          type: "input",
          text: "'n Patroon van seshoekige teëls word gebou: Fase 1 gebruik 6 teëls, Fase 2 gebruik 11 teëls, Fase 3 gebruik 16 teëls. Hoeveel teëls word benodig vir Fase 12?",
          answer: "61",
          topic: "Patrone in konteks"
        },
        {
          type: "mc",
          text: "Die terme van 'n lineêre ry, geplot as punte (n, Tₙ), lê op 'n reguit lyn wat deur (2, 9) en (5, 21) gaan. Wat is Tₙ?",
          options: ["4n + 1", "4n − 3", "3n + 3", "4n + 5"],
          answer: 0,
          topic: "Patrone in konteks"
        }
      ]
    },
    {
      id: 302,
      chapter: 3,
      name: "Nie-voor-die-hand-liggende patroonprobleme",
      fullName: "Herhalende patrone, posisie-in-siklus-probleme, en nie-lineêre ondersoeke",
      lesson: {
        heading: "Nie-voor-die-hand-liggende patroonprobleme",
        sub: "Hoofstuk 3 · Onderwerp 3",
        body: `
          <p>Nie elke patroonprobleem is 'n eenvoudige lineêre ry nie. CAPS beklemtoon spesifiek probleme waar <strong>die benadering nie onmiddellik voor die hand liggend is nie</strong> — hierdie benodig kreatiewe denke eerder as 'n aangeleerde formule.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Herhalende letter-/simboolsiklusse</div>
            <p>
              Vir 'n herhalende blok (soos "MATHS" wat herhaal), vind die <strong>sikluslengte</strong>, en gebruik dan <strong>oorskotte</strong> (deling) om enige posisie op te spoor.<br>
              As die sikluslengte <span class="math">L</span> is, stem die item in posisie <span class="math">n</span> ooreen met die item in posisie <span class="math">n</span> mod <span class="math">L</span> (gebruik die siklus se laaste posisie wanneer die oorskot 0 is).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: MATHSMATHSMATHS…</div>
            <p>
              Die woord "MATHS" het 5 letters — sikluslengte <span class="math">L = 5</span>.<br>
              Wat is die 267ste letter?<br>
              <span class="math">267 ÷ 5 = 53</span> oorskot <span class="math">2</span>.<br>
              Oorskot 2 → 2de letter van "MATHS" → <strong>A</strong>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: 'n Groeiende kolletjiespatroon (nie-lineêr)</div>
            <p>
              'n Patroon van kolletjies: 1, 4, 9, 16, … (elke figuur is 'n vierkantige rangskikking).<br>
              Hierdie verskille is 3, 5, 7, … — <em>nie</em> konstant nie, dus is dit <strong>nie</strong> 'n lineêre ry nie.<br>
              Verdere ondersoek: <span class="math">Tₙ = n²</span> — herken die volkome-vierkant-patroon direk.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Algemene strategie vir onbekende patrone</div>
            <p>
              1. Lys verskeie terme en kontroleer eerste verskille.<br>
              2. As verskille konstant is → lineêr (Onderwerp 1/2-metodes is van toepassing).<br>
              3. As nie konstant nie, soek na 'n herhalende siklus, 'n verdubbelingspatroon, of 'n herkenbare ry soos vierkant- of driehoeksgetalle.<br>
              4. Toets jou reël teen <em>alle</em> gegewe terme voordat jy dit vertrou.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Siklusposisie-Vinder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer 'n herhalende woord/ry en 'n posisienommer in — vind watter letter/element daar beland.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Herhalende blok</div>
                <input id="g10c3cycWord" type="text" value="MATHS" maxlength="12"
                  style="width:120px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;text-transform:uppercase;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Posisie n</div>
                <input id="g10c3cycN" type="number" value="267" min="1"
                  style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c3cycBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Vind
              </button>
            </div>
            <div id="g10c3cycOut" style="font-size:14px;line-height:2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const word=(document.getElementById('g10c3cycWord').value||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
                const n=parseInt(document.getElementById('g10c3cycN').value);
                const out=document.getElementById('g10c3cycOut');
                if(!word||!n||n<1){out.innerHTML='<span style="color:#fca5a5;">Voer \'n blok en \'n posisie ≥ 1 in.</span>';return;}
                const L=word.length;
                let rem=n%L;
                const idx=rem===0?L:rem;
                const letter=word[idx-1];
                let html='<span style="color:rgba(221,225,240,0.50);">Sikluslengte L = '+L+' ("'+word+'")</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+n+' ÷ '+L+' = '+Math.floor(n/L)+' oorskot '+rem+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Oorskot '+rem+' → posisie '+idx+' in die blok</span><br>';
                html+='<span style="color:#6ee7b7;">Die '+n+'ste element is: '+letter+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c3cycBtn').addEventListener('click',run);
              ['g10c3cycWord','g10c3cycN'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer oorskot = 0, is die item die <em>laaste</em> een in die siklus, nie die "0de" nie — 'n algemene af-met-een-fout.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Die patroon ABCABCABC… herhaal. Wat is die 100ste letter?",
          answer: "A",
          topic: "Nie-voor-die-hand-liggende patroonprobleme"
        },
        {
          type: "mc",
          text: "Vir die ry 1, 4, 9, 16, 25, … is die algemene term:",
          options: ["Tₙ = n²", "Tₙ = 3n − 2", "Tₙ = 2n + 1", "Tₙ = n² + 1"],
          answer: 0,
          topic: "Nie-voor-die-hand-liggende patroonprobleme"
        },
        {
          type: "input",
          text: "Die woord SUM herhaal: SUMSUMSUM…. Wat is die 250ste letter?",
          answer: "S",
          topic: "Nie-voor-die-hand-liggende patroonprobleme"
        },
        {
          type: "mc",
          text: "'n Ry het eerste verskille 2, 4, 6, 8, … (nie konstant nie). Dit beteken die ry is:",
          options: ["Kwadraties, nie lineêr nie", "Lineêr met d = 2", "Lineêr met d = 4", "Onmoontlik om te ontleed"],
          answer: 0,
          topic: "Nie-voor-die-hand-liggende patroonprobleme"
        },
        {
          type: "input",
          text: "Die patroon 7;14;7;14;7;14;… herhaal met sikluslengte 2. Wat is die 41ste term?",
          answer: "7",
          topic: "Nie-voor-die-hand-liggende patroonprobleme"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 3 Werkboek — Getalpatrone",
    questions: [
      {
        number: 1,
        text: "Vind vir elke ry die gemeenskaplike verskil en die algemene term Tₙ:",
        parts: [
          { label: "a", text: "6, 10, 14, 18, …", marks: 3 },
          { label: "b", text: "20, 17, 14, 11, …", marks: 3 },
          { label: "c", text: "−5, −1, 3, 7, …", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "'n Lineêre ry het T₃ = 14 en T₈ = 34.",
        parts: [
          { label: "a", text: "Bepaal die gemeenskaplike verskil.", marks: 2 },
          { label: "b", text: "Bepaal die eerste term.", marks: 2 },
          { label: "c", text: "Skryf die algemene term Tₙ neer.", marks: 2 },
          { label: "d", text: "Is 100 'n term in hierdie ry? Toon alle berekeninge.", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "'n Patroon van vyfhoeke word met vuurhoutjies gebou: 1 vyfhoek gebruik 5 vuurhoutjies, en elke nuwe vyfhoek deel een sy met die vorige een.",
        parts: [
          { label: "a", text: "Voltooi die tabel vir n = 1, 2, 3, 4.", marks: 2 },
          { label: "b", text: "Vind die formule vir die aantal vuurhoutjies vir n vyfhoeke.", marks: 3 },
          { label: "c", text: "Hoeveel vuurhoutjies word benodig vir 15 vyfhoeke?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "d=4; Tₙ = 4n + 2",
        b: "d=−3; Tₙ = −3n + 23",
        c: "d=4; Tₙ = 4n − 9"
      },
      2: {
        a: "d = (34−14)/(8−3) = 4",
        b: "T₁ = 14 − 2(4) = 6",
        c: "Tₙ = 4n + 2",
        d: "4n+2=100 → n=24.5 → nie 'n heelgetal nie → 100 is NIE 'n term nie"
      },
      3: {
        a: "5, 9, 13, 17",
        b: "Tₙ = 4n + 1",
        c: "T₁₅ = 61 vuurhoutjies"
      }
    }
  }
});
