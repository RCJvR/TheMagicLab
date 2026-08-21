// Math Magician — Graad 11, Hoofstuk 3
// Getalpatrone — Kwadratiese Rye

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 300,
      chapter: 3,
      name: "Kwadratiese rye",
      fullName: "Identifiseer en vind die algemene term van kwadratiese rye",
      lesson: {
        heading: "Kwadratiese rye",
        sub: "Hoofstuk 3 · Onderwerp 1",
        body: `
          <p>In Graad 10 het ons lineêre rye bestudeer (konstante eerste verskil). Graad 11 stel <strong>kwadratiese rye</strong> bekend, waar die <em>tweede</em> verskil konstant is.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Identifiseer 'n kwadratiese ry</div>
            <p>
              'n Ry is kwadraties as die <strong>eerste verskille</strong> nie konstant is nie, maar die <strong>tweede verskille</strong> konstant en nie-nul is.<br><br>
              Voorbeeld: 1, 4, 9, 16, 25, …<br>
              1ste verskille: 3, 5, 7, 9, … (nie konstant nie)<br>
              2de verskille: 2, 2, 2, … (konstant ✓) → kwadraties
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Algemene term van 'n kwadratiese ry</div>
            <p>
              <span class="math">Tₙ = an² + bn + c</span><br><br>
              Om a, b, c te vind:<br>
              • <span class="math">2a</span> = tweede verskil<br>
              • Gebruik <span class="math">T₁, T₂, T₃</span> om vergelykings vir b en c op te stel en op te los
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vind Tₙ vir 3, 8, 15, 24, …</div>
            <p>1ste verskille: 5, 7, 9, … &nbsp; 2de verskille: 2, 2<br>
            <span class="math">2a = 2 → a = 1</span><br>
            <span class="math">T₁ = a + b + c = 3 → 1 + b + c = 3 → b + c = 2</span><br>
            <span class="math">T₂ = 4a + 2b + c = 8 → 4 + 2b + c = 8 → 2b + c = 4</span><br>
            Trek af: <span class="math">b = 2, c = 0</span><br>
            <span class="math">Tₙ = n² + 2n</span><br>
            Kontroleer: T₃ = 9 + 6 = 15 ✓</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kwadratiese Ry-Vinder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die eerste drie terme in — kry die tweede verskil, a, b, c, die algemene term Tₙ, en die volgende vier terme.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₁</div><input id="g11c3t1" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₂</div><input id="g11c3t2" type="number" value="8" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">T₃</div><input id="g11c3t3" type="number" value="15" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind Tₙ</button>
            </div>
            <div id="g11c3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n%1===0?n.toString():parseFloat(n.toFixed(4)).toString();}
              function sgn(n,first){const s=n<0?'−':first?'':'+';const v=Math.abs(n);return s+(v===1?'':v);}
              function calc(){
                const T1=parseFloat(document.getElementById('g11c3t1').value);
                const T2=parseFloat(document.getElementById('g11c3t2').value);
                const T3=parseFloat(document.getElementById('g11c3t3').value);
                const out=document.getElementById('g11c3Out');
                if([T1,T2,T3].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer drie numeriese terme in.</span>';return;}
                const d1=T2-T1,d2=T3-T2;
                const d2nd=d2-d1;
                if(d2nd===0){out.innerHTML='<span style="color:#fca5a5;">Tweede verskil is 0 — dit is \'n lineêre (nie kwadratiese) ry.</span>';return;}
                const a=d2nd/2;
                // b vanaf 3a+b = d1
                const b=d1-3*a;
                // c vanaf a+b+c = T1
                const c=T1-a-b;
                const terms=[T1,T2,T3];
                for(let n=4;n<=7;n++) terms.push(a*n*n+b*n+c);
                let html='<span style="color:rgba(221,225,240,0.50);">1ste verskille: '+(T2-T1)+', '+(T3-T2)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">2de verskil: '+d2nd+' → a = '+d2nd+'/2 = '+f(a)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">b = 1ste verskil − 3a = '+d1+' − '+f(3*a)+' = '+f(b)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">c = T₁ − a − b = '+T1+' − '+f(a)+' − '+f(b)+' = '+f(c)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Tₙ = '+f(a)+'n²'+sgn(b,false)+'n'+sgn(c,false)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Terme: </span><span style="color:#fcd34d;">'+terms.map((v,i)=>'T'+(i+1)+'='+f(v)).join(', ')+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c3Btn').addEventListener('click',calc);
              ['g11c3t1','g11c3t2','g11c3t3'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Verifieer jou formule altyd: vervang n = 1, 2, 3 en kontroleer dat dit met die gegewe terme ooreenstem. Een verkeerde stap in die bepaling van b of c sal elke daaropvolgende term laat verskuif.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Ry: 2, 6, 12, 20, 30, … Wat is die tweede verskil?",
          options: ["4", "2", "8", "6"],
          answer: 1,
          topic: "Kwadratiese rye"
        },
        {
          type: "mc",
          text: "Vir Tₙ = an² + bn + c, as die tweede verskil 6 is, dan is a =",
          options: ["6", "12", "3", "2"],
          answer: 2,
          topic: "Kwadratiese rye"
        },
        {
          type: "input",
          text: "Tₙ = n² + 3n − 1. Vind T₅.",
          answer: "39",
          topic: "Kwadratiese rye"
        },
        {
          type: "mc",
          text: "Watter ry is kwadraties?",
          options: ["5, 8, 11, 14, …", "1, 3, 7, 13, 21, …", "2, 4, 8, 16, …", "3, 6, 9, 12, …"],
          answer: 1,
          topic: "Kwadratiese rye"
        },
        {
          type: "mc",
          text: "Tₙ = 2n² − n + 1. Wat is T₁?",
          options: ["2", "4", "3", "1"],
          answer: 0,
          topic: "Kwadratiese rye"
        },
        {
          type: "input",
          text: "Bepaal die algemene term Tₙ van die kwadratiese ry 5, 12, 23, 38, 57, …",
          answer: "2n² + n + 2",
          altAnswers: ["2n²+n+2", "Tₙ = 2n² + n + 2"],
          topic: "Kwadratiese rye"
        },
        {
          type: "input",
          text: "'n Kwadratiese ry het T₁ = 4, T₂ = 9, en 'n tweede verskil van 4. Bepaal Tₙ.",
          answer: "2n² − n + 3",
          altAnswers: ["2n²-n+3", "2n² - n + 3", "Tₙ = 2n² − n + 3"],
          topic: "Kwadratiese rye"
        }
      ]
    },
    {
      id: 301,
      chapter: 3,
      name: "Werk met kwadratiese rye",
      fullName: "Vind terme, termnommers, en die gebruik van kwadratiese rye in konteks",
      lesson: {
        heading: "Werk met kwadratiese rye",
        sub: "Hoofstuk 3 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Vind watter term gelyk is aan 'n gegewe waarde</div>
            <p>
              Stel <span class="math">Tₙ = gegewe waarde</span> en los die kwadratiese vergelyking vir n op.<br>
              Onthou: n moet 'n <strong>positiewe heelgetal</strong> wees. Verwerp nie-heelgetal- of negatiewe oplossings.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>Vir <span class="math">Tₙ = n² + 2n</span>, watter term is gelyk aan 80?<br>
            <span class="math">n² + 2n = 80 → n² + 2n − 80 = 0 → (n+10)(n−8) = 0</span><br>
            <span class="math">n = 8</span> (verwerp n = −10)<br>
            → T₈ = 80 ✓</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Gemengde rye</div>
            <p>
              Soms moet jy bepaal of 'n ry lineêr, kwadraties, of geeneen van die twee is nie:<br>
              • Konstante 1ste verskil → lineêr<br>
              • Konstante 2de verskil (nie-nul) → kwadraties<br>
              • Konstante verhouding tussen terme → meetkundig (Graad 12)<br>
              • Niks van die bogenoemde → ander (eksponensieel, kubies, ens.)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Kortpad: a vanaf die tweede verskil</div>
            <p>
              As die tweede verskil = d₂, dan is <span class="math">a = d₂/2</span>.<br>
              Die eerste verskil tussen T₁ en T₂ = <span class="math">3a + b</span>.<br>
              En <span class="math">T₁ = a + b + c</span>.<br>
              Gebruik hierdie drie feite om a, b, c stelselmatig te vind.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Termnommer-Oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer a, b, c vir Tₙ = an² + bn + c en 'n teikenwaarde in — los op vir n.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c3t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c3t2b" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g11c3t2c" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Teiken Tₙ = ?</div><input id="g11c3t2target" type="number" value="80" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c3t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op vir n</button>
            </div>
            <div id="g11c3t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const a=parseFloat(document.getElementById('g11c3t2a').value);
                const b=parseFloat(document.getElementById('g11c3t2b').value);
                const c=parseFloat(document.getElementById('g11c3t2c').value);
                const T=parseFloat(document.getElementById('g11c3t2target').value);
                const out=document.getElementById('g11c3t2Out');
                if([a,b,c,T].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (a ≠ 0).</span>';return;}
                // an² + bn + (c−T) = 0
                const A=a,B=b,C=c-T;
                const D=B*B-4*A*C;
                let html='<span style="color:rgba(221,225,240,0.50);">'+f(a)+'n² + '+f(b)+'n + '+f(c)+' = '+T+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">→ '+f(a)+'n² + '+f(b)+'n + '+f(c-T)+' = 0</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Δ = ('+f(b)+')² − 4('+f(a)+')('+f(c-T)+') = '+f(D)+'</span><br>';
                if(D<0){out.innerHTML=html+'<span style="color:#fca5a5;">Geen reële oplossing nie — hierdie waarde is nie in die ry nie.</span>';return;}
                const sq=Math.sqrt(D);
                const n1=(-B+sq)/(2*A),n2=(-B-sq)/(2*A);
                [n1,n2].forEach(n=>{
                  if(n>0&&Math.abs(n-Math.round(n))<0.0001){
                    const ni=Math.round(n);
                    html+='<span style="color:#6ee7b7;">n = '+ni+' ✓ → T₍'+ni+'₎ = '+f(a*ni*ni+b*ni+c)+'</span><br>';
                  } else if(n>0){
                    html+='<span style="color:rgba(221,225,240,0.50);">n = '+f(n)+' — nie \'n positiewe heelgetal nie, verwerp</span><br>';
                  } else {
                    html+='<span style="color:rgba(221,225,240,0.50);">n = '+f(n)+' — negatief, verwerp</span><br>';
                  }
                });
                out.innerHTML=html;
              }
              document.getElementById('g11c3t2Btn').addEventListener('click',calc);
              ['g11c3t2a','g11c3t2b','g11c3t2c','g11c3t2target'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>n moet 'n <strong>positiewe heelgetal</strong> wees. As die kwadratiese vergelyking n = 8 en n = −10 gee, verwerp −10 outomaties. As geeneen van die wortels 'n positiewe heelgetal is nie, is die teikenwaarde nie in die ry nie.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Vir Tₙ = n² − n + 3, watter term is gelyk aan 45?",
          answer: "7",
          topic: "Werk met kwadratiese rye"
        },
        {
          type: "mc",
          text: "Ry: 4, 7, 12, 19, 28, … Wat is Tₙ?",
          options: ["n² + 3", "n² + 2n + 1", "n² − n + 4", "2n² + 2"],
          answer: 0,
          topic: "Werk met kwadratiese rye"
        },
        {
          type: "mc",
          text: "Vir Tₙ = 2n² + 3n − 1, is die tweede verskil:",
          options: ["3", "4", "2", "6"],
          answer: 1,
          topic: "Werk met kwadratiese rye"
        },
        {
          type: "mc",
          text: "'n Kwadratiese ry het T₁ = 3, T₂ = 7, T₃ = 13. Vind T₄.",
          options: ["19", "20", "21", "22"],
          answer: 2,
          topic: "Werk met kwadratiese rye"
        },
        {
          type: "input",
          text: "Tₙ = n² + 4n. Vind die waarde van n waarvoor Tₙ = 96.",
          answer: "8",
          topic: "Werk met kwadratiese rye"
        },
        {
          type: "input",
          text: "'n Kwadratiese ry het Tₙ = n² − 8n + 15. Bepaal watter termnommer(s) van die ry gelyk is aan nul.",
          answer: "3 and 5",
          altAnswers: ["n = 3 and n = 5", "5 and 3", "n=3 and n=5", "3 en 5", "n = 3 en n = 5", "n=3 en n=5"],
          topic: "Werk met kwadratiese rye"
        },
        {
          type: "mc",
          text: "Ry A: 2, 6, 12, 20, 30, … Ry B: 3, 9, 27, 81, 243, … Watter opsie klassifiseer hulle korrek?",
          options: ["A is kwadraties, B is meetkundig", "Albei is kwadraties", "A is meetkundig, B is kwadraties", "Albei is lineêr"],
          answer: 0,
          topic: "Werk met kwadratiese rye"
        }
      ]
    },
    {
      id: 302,
      chapter: 3,
      name: "Kwadratiese patrone in konteks",
      fullName: "Aflei van kwadratiese algemene terme uit werklike telprobleme",
      lesson: {
        heading: "Kwadratiese patrone in konteks",
        sub: "Hoofstuk 3 · Onderwerp 3",
        body: `
          <p>Baie telprobleme — kompetisies waar elke span teen elke ander speel, handdrukke, diagonale van 'n veelhoek — lewer kwadratiese rye op. Die vaardigheid hier is om <strong>'n situasie na 'n ry te vertaal</strong>, en dan alles wat jy reeds oor kwadratiese patrone weet, toe te pas.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Bou die ry uit 'n beskrywing</div>
            <p>
              1. Bereken die werklike waarde vir klein gevalle (n = 1, 2, 3, 4 …) deur direkte telling of redenering.<br>
              2. Skryf hierdie neer as 'n ry van terme.<br>
              3. Toets die verskille om te bevestig dat dit kwadraties is (konstante 2de verskil).<br>
              4. Vind <span class="math">Tₙ = an² + bn + c</span> soos voorheen.<br>
              5. Beantwoord die werklike vraag — dit kan vra vir 'n spesifieke term, of vir n gegewe Tₙ.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Kompetisie waar elke span teen elke ander speel</div>
            <p>In 'n poulefase speel elke span een keer teen elke ander span. Met n spanne is die aantal wedstryde:<br>
            n = 2: 1 wedstryd. n = 3: 3 wedstryde. n = 4: 6 wedstryde. n = 5: 10 wedstryde.<br>
            Ry: 1, 3, 6, 10, … &nbsp; 1ste verskille: 2, 3, 4 &nbsp; 2de verskil: 1 (konstant) → kwadraties.<br>
            <span class="math">a = 1/2</span>; verdere oplossing gee <span class="math">Tₙ = n(n−1)/2</span> — die bekende "n kies 2"-formule.<br>
            Vir 6 spanne: T₆ = 6(5)/2 = 15 wedstryde.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Diagonale van 'n veelhoek</div>
            <p>Die aantal diagonale van 'n konvekse veelhoek met n sye is <span class="math">D(n) = n(n−3)/2</span>.<br>
            'n Sishoek (n = 6): D(6) = 6(3)/2 = 9 diagonale.<br>
            Hoeveel sye het 'n veelhoek met 35 diagonale? Los <span class="math">n(n−3)/2 = 35 → n² − 3n − 70 = 0 → (n−10)(n+7) = 0 → n = 10</span> op (verwerp n = −7).</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Wedstrydberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die aantal spanne in 'n groep in (elke span speel een keer teen elke ander span) — sien die kwadratiese patroon en die aantal wedstryde.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Aantal spanne (n)</div><input id="g11c3t3n" type="number" value="6" min="2" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c3t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken wedstryde</button>
            </div>
            <div id="g11c3t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function calc(){
                const n=parseInt(document.getElementById('g11c3t3n').value);
                const out=document.getElementById('g11c3t3Out');
                if(isNaN(n)||n<2){out.innerHTML='<span style="color:#fca5a5;">Voer \'n heelgetal aantal spanne in (minstens 2).</span>';return;}
                const seqTerms=[];
                for(let k=2;k<=Math.min(n+1,7);k++) seqTerms.push(k*(k-1)/2);
                const matches=n*(n-1)/2;
                let html='<span style="color:rgba(221,225,240,0.50);">Ry van wedstryde vir 2,3,4,…spanne: '+seqTerms.join(', ')+(n+1>7?', …':'')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Algemene term: Tₙ = n(n−1)/2</span><br>';
                html+='<span style="color:#6ee7b7;">Met '+n+' spanne: T'+n+' = '+n+'('+(n-1)+')/2 = '+matches+' wedstryde</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c3t3Btn').addEventListener('click',calc);
              document.getElementById('g11c3t3n').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Telprobleme soos hierdie gee byna altyd patrone in die styl van <em>driehoekige getalle</em>: Tₙ = n(n−1)/2 vir "wedstryde/handdrukke tussen n mense/spanne", en Tₙ = n(n−3)/2 vir "diagonale van 'n n-sydige veelhoek".</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "In 'n groep van 5 spanne speel elke span een keer teen elke ander span. Hoeveel wedstryde word gespeel?",
          answer: "10",
          topic: "Kwadratiese patrone in konteks"
        },
        {
          type: "mc",
          text: "'n Veelhoek het 20 diagonale. Deur D(n) = n(n−3)/2 te gebruik, hoeveel sye het dit?",
          options: ["8", "7", "9", "10"],
          answer: 0,
          topic: "Kwadratiese patrone in konteks"
        },
        {
          type: "mc",
          text: "Die aantal handdrukke onder n mense (elkeen skud een keer hande met elke ander persoon) volg watter patroon?",
          options: ["Lineêr", "Kwadraties", "Konstant", "Kubies"],
          answer: 1,
          topic: "Kwadratiese patrone in konteks"
        },
        {
          type: "input",
          text: "Deur H(n) = n(n−1)/2 te gebruik, hoeveel handdrukke vind plaas onder 9 mense?",
          answer: "36",
          topic: "Kwadratiese patrone in konteks"
        },
        {
          type: "mc",
          text: "'n Kompetisie se ry van wedstryde is 3, 6, 10, 15, 21, … Wat is die tweede verskil?",
          options: ["1", "2", "3", "0"],
          answer: 0,
          topic: "Kwadratiese patrone in konteks"
        },
        {
          type: "input",
          text: "Die nde diagram in 'n teëlpatroon gebruik Tₙ = n² + n teëls. Bepaal watter diagramnommer presies 132 teëls gebruik.",
          answer: "11",
          topic: "Kwadratiese patrone in konteks"
        },
        {
          type: "input",
          text: "Die aantal sitplekke in die eerste 5 rye van 'n stadionafdeling is 20, 26, 34, 44, 56. Neem aan die patroon gaan kwadraties voort, bepaal die algemene term Tₙ en dus die aantal sitplekke in ry 8.",
          answer: "104",
          topic: "Kwadratiese patrone in konteks"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 3 Werkboek — Getalpatrone",
    questions: [
      {
        number: 1,
        text: "Bepaal vir elke ry of dit lineêr, kwadraties, of geeneen is nie, en vind Tₙ waar moontlik:",
        parts: [
          { label: "a", text: "5, 9, 13, 17, …", marks: 3 },
          { label: "b", text: "2, 5, 10, 17, 26, …", marks: 4 },
          { label: "c", text: "1, 2, 4, 8, 16, …", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "'n Kwadratiese ry het eerste term T₁ = 1, en eerste verskille 4, 8, 12, 16, …",
        parts: [
          { label: "a", text: "Skryf die eerste vyf terme van die ry neer.", marks: 2 },
          { label: "b", text: "Vind die tweede verskil.", marks: 1 },
          { label: "c", text: "Bepaal die algemene term Tₙ.", marks: 4 },
          { label: "d", text: "Vind die waarde van n waarvoor Tₙ = 145.", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "Die aantal handdrukke wanneer n mense elkeen hande skud met elke ander persoon, word gegee deur H(n) = n(n−1)/2.",
        parts: [
          { label: "a", text: "Toon dat dit 'n kwadratiese ry is deur die eerste en tweede verskille te vind.", marks: 4 },
          { label: "b", text: "Hoeveel handdrukke vind plaas by 'n partytjie van 12 mense?", marks: 2 },
          { label: "c", text: "Hoeveel mense word benodig vir presies 45 handdrukke?", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Lineêr; d=4; Tₙ=4n+1",
        b: "1ste verskille: 3,5,7,9 → 2de verskille: 2,2,2 → kwadraties; Tₙ=n²+2n−1",
        c: "Geeneen — verhouding is konstant (×2), meetkundige ry"
      },
      2: {
        a: "1, 5, 13, 25, 41",
        b: "Tweede verskil = 4",
        c: "2a=4→a=2; T₁:2+b+c=1; 1ste verskil(T₁→T₂)=3a+b=4→6+b=4→b=−2; c=1; Tₙ=2n²−2n+1",
        d: "2n²−2n+1=145 → 2n²−2n−144=0 → n²−n−72=0 → (n−9)(n+8)=0 → n=9"
      },
      3: {
        a: "H(1)=0,H(2)=1,H(3)=3,H(4)=6,H(5)=10; 1ste verskille:1,2,3,4; 2de verskille:1,1,1 → konstant ✓ kwadraties",
        b: "H(12)=66",
        c: "n(n−1)/2=45→n²−n−90=0→(n−10)(n+9)=0→n=10"
      }
    }
  }
});
