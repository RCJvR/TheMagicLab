// Math Magician — Graad 12, Hoofstuk 2
// Funksies — Inverses en Logaritmes

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 200,
      chapter: 2,
      name: "Inverse funksies",
      fullName: "Funksies, relasies, en inverse funksies (lineêr, kwadraties, eksponensieel)",
      lesson: {
        heading: "Inverse funksies",
        sub: "Hoofstuk 2 · Onderwerp 1",
        body: `
          <p>Die <strong>inverse</strong> van 'n funksie f word aangedui as f⁻¹ en keer die afbeelding om: as f(a) = b, dan is f⁻¹(b) = a.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Vind die inverse</div>
            <p>
              1. Skryf y = f(x)<br>
              2. Ruil x en y om<br>
              3. Los op vir y (dit is f⁻¹(x))<br><br>
              Grafies: die inverse is die <strong>spieëlbeeld van f in die lyn y = x</strong>.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Inverses van sleutel-funksietipes</div>
            <p>
              <strong>Lineêr:</strong> f(x) = mx + c → f⁻¹(x) = (x − c)/m<br>
              <strong>Kwadraties:</strong> f(x) = ax² → f⁻¹(x) = ±√(x/a) (domein moet beperk word vir 'n funksie)<br>
              <strong>Eksponensieel:</strong> f(x) = bˣ → f⁻¹(x) = log_b(x) (die logaritme)<br><br>
              Vir f⁻¹ om 'n <em>funksie</em> te wees, moet f een-tot-een wees (slaag die horisontale lyntoets).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Inverse van y = 2x²</div>
            <p>Ruil om: x = 2y² → y² = x/2 → y = ±√(x/2)<br>
            Dit is NIE 'n funksie NIE (twee y-waardes vir elke x).<br>
            Beperk domein tot x ≥ 0: f⁻¹(x) = √(x/2) slegs.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Logaritmes — die inverse van eksponensiële funksies</div>
            <p>
              <span class="math">y = log_b(x) ⟺ bʸ = x</span><br><br>
              Sleutel logaritme-wette:<br>
              <span class="math">log(xy) = log x + log y</span><br>
              <span class="math">log(x/y) = log x − log y</span><br>
              <span class="math">log(xⁿ) = n·log x</span><br>
              <span class="math">log_b(b) = 1; log_b(1) = 0</span><br>
              Verandering van grondtal: <span class="math">log_a(x) = log(x)/log(a)</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Logaritme-Evalueerder (verandering van grondtal)</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Evalueer log_b(x) = log(x)/log(b). Voer grondtal b en argument x in.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Grondtal b</div><input id="g12c2b" type="number" value="2" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Argument x</div><input id="g12c2x" type="number" value="32" min="0.0001" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Evalueer</button>
            </div>
            <div id="g12c2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(6));}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const b=gv('g12c2b'),x=gv('g12c2x');
                const out=document.getElementById('g12c2Out');
                if(isNaN(b)||isNaN(x)||b<=0||b===1||x<=0){out.innerHTML='<span style="color:#fca5a5;">b moet >0 wees, b≠1, x moet >0 wees.</span>';return;}
                const val=Math.log(x)/Math.log(b);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">log_'+b+'('+x+') = log('+x+')/log('+b+') = '+Math.log(x).toFixed(6)+'/'+Math.log(b).toFixed(6)+'</span><br>'+
                  '<span style="color:#6ee7b7;">= '+f(val)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Verifieer: '+b+'^'+f(val)+' = '+f(Math.pow(b,val))+'</span>';
              }
              ['g12c2b','g12c2x'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = 3x − 6. Vind f⁻¹(x).", options: ["(x+6)/3", "(x−6)/3", "3x+6", "x/3 + 2"], answer: 0, topic: "Inverse funksies" },
        { type: "mc", text: "Die inverse van y = 2ˣ is:", options: ["y = x²", "y = log₂(x)", "y = 2⁻ˣ", "y = ½ˣ"], answer: 1, topic: "Inverse funksies" },
        { type: "input", text: "Evalueer: log₂(32)", answer: "5", topic: "Inverse funksies" },
        { type: "mc", text: "Die grafiek van f⁻¹ word van f verkry deur te spieël in:", options: ["Die x-as", "Die y-as", "Die lyn y = x", "Die oorsprong"], answer: 2, topic: "Inverse funksies" },
        { type: "mc", text: "log(100) + log(10) = ", options: ["2", "3", "log(1000)", "Beide B en C"], answer: 3, topic: "Inverse funksies" },
        { type: "input", text: "As f(x) = 4x − 3 en h(x) = f⁻¹(x), bepaal die waarde van x waarvoor h(2x + 5) = 6.", answer: "8", topic: "Inverse funksies" },
        { type: "input", text: "Los op vir x: log₃(x) = 2log₃(5) − log₃(x)", answer: "5", topic: "Inverse funksies" }
      ]
    },
    {
      id: 201,
      chapter: 2,
      name: "Logaritmiese funksies & vergelykings",
      fullName: "Logaritmiese funksies, eienskappe, vergelykings, en toepassings",
      lesson: {
        heading: "Logaritmiese funksies en vergelykings",
        sub: "Hoofstuk 2 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Die logaritmiese funksie y = log_b(x)</div>
            <p>
              Domein: x > 0 &nbsp;|&nbsp; Bereik: ℝ<br>
              x-afsnit: (1; 0) — aangesien log_b(1) = 0<br>
              Vertikale asimptoot: x = 0<br>
              As b > 1: toenemende funksie<br>
              As 0 &lt; b &lt; 1: afnemende funksie
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Los eksponensiële vergelykings op met logaritmes</div>
            <p>
              Om <span class="math">bˣ = c</span> op te los wanneer die grondtalle nie ooreenstem nie:<br>
              Neem die logaritme van albei kante: <span class="math">x·log b = log c → x = log c / log b</span><br><br>
              Of ekwivalent: <span class="math">x = log_b(c)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los 3ˣ = 20 op</div>
            <p><span class="math">x·log 3 = log 20</span><br>
            <span class="math">x = log 20 / log 3 = 1.301/0.477 ≈ 2.727</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los log₂(x + 3) = 4 op</div>
            <p>Skakel om: <span class="math">2⁴ = x + 3 → 16 = x + 3 → x = 13</span><br>
            Kontroleer: x + 3 = 16 > 0 ✓</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Vind n in saamgestelde rente</div>
            <p>
              <span class="math">A = P(1+i)ⁿ → (1+i)ⁿ = A/P → n = log(A/P)/log(1+i)</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Eksponensiële / Log-Vergelyking-Oplosser</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g12c2t2exp" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">bˣ = c</button>
              <button id="g12c2t2log" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">log_b(x) = n</button>
              <button id="g12c2t2comp" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Vind n (saamgestel)</button>
            </div>
            <div id="g12c2t2expP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Grondtal b</div><input id="g12c2t2b" type="number" value="3" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Resultaat c</div><input id="g12c2t2c" type="number" value="20" min="0.0001" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2t2expBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los x op</button>
            </div>
            <div id="g12c2t2logP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Grondtal b</div><input id="g12c2t2lb" type="number" value="3" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">RK = n</div><input id="g12c2t2ln" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2t2logBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los x op</button>
            </div>
            <div id="g12c2t2compP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoofsom P</div><input id="g12c2t2P" type="number" value="8000" min="1" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Bedrag A</div><input id="g12c2t2A" type="number" value="16000" min="1" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koers i (%)</div><input id="g12c2t2i" type="number" value="9.5" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2t2compBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind n (jare)</button>
            </div>
            <div id="g12c2t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const btns={exp:document.getElementById('g12c2t2exp'),log:document.getElementById('g12c2t2log'),comp:document.getElementById('g12c2t2comp')};
              const panels={exp:document.getElementById('g12c2t2expP'),log:document.getElementById('g12c2t2logP'),comp:document.getElementById('g12c2t2compP')};
              const out=document.getElementById('g12c2t2Out');
              function setMode(m){Object.keys(panels).forEach(k=>{panels[k].style.display=k===m?'flex':'none';btns[k].style.background=k===m?'rgba(99,102,241,0.30)':'transparent';btns[k].style.color=k===m?'#a5b4fc':'rgba(221,225,240,0.50)';btns[k].style.borderColor=k===m?'rgba(99,102,241,0.50)':'rgba(99,102,241,0.20)';});out.innerHTML='';}
              Object.keys(btns).forEach(k=>btns[k].addEventListener('click',()=>setMode(k)));
              document.getElementById('g12c2t2expBtn').addEventListener('click',()=>{
                const b=gv('g12c2t2b'),c=gv('g12c2t2c');
                if(isNaN(b)||isNaN(c)||b<=0||b===1||c<=0){out.innerHTML='<span style="color:#fca5a5;">b>0, b≠1, c>0.</span>';return;}
                const x=Math.log(c)/Math.log(b);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+b+'^x = '+c+' → x·log('+b+') = log('+c+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">x = log('+c+')/log('+b+') = '+Math.log(c).toFixed(4)+'/'+Math.log(b).toFixed(4)+'</span><br>'+
                  '<span style="color:#6ee7b7;">x = '+f(x)+'</span>';
              });
              document.getElementById('g12c2t2logBtn').addEventListener('click',()=>{
                const b=gv('g12c2t2lb'),n=gv('g12c2t2ln');
                if(isNaN(b)||isNaN(n)||b<=0||b===1){out.innerHTML='<span style="color:#fca5a5;">b>0, b≠1.</span>';return;}
                const x=Math.pow(b,n);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">log_'+b+'(x) = '+n+' → x = '+b+'^'+n+'</span><br>'+
                  '<span style="color:#6ee7b7;">x = '+f(x)+'</span>';
              });
              document.getElementById('g12c2t2compBtn').addEventListener('click',()=>{
                const P=gv('g12c2t2P'),A=gv('g12c2t2A'),i=gv('g12c2t2i')/100;
                if([P,A,i].some(isNaN)||P<=0||A<=0||i<=0||A<=P){out.innerHTML='<span style="color:#fca5a5;">A moet groter as P wees.</span>';return;}
                const n=Math.log(A/P)/Math.log(1+i);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">A=P(1+i)ⁿ → (1+i)ⁿ=A/P = '+f(A/P)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">n = log('+f(A/P)+')/log('+f(1+i)+') = '+Math.log(A/P).toFixed(4)+'/'+Math.log(1+i).toFixed(4)+'</span><br>'+
                  '<span style="color:#6ee7b7;">n = '+f(n)+' jaar</span>';
              });
              setMode('exp'); document.getElementById('g12c2t2expBtn').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Los op: 5ˣ = 125", options: ["x = 2", "x = 3", "x = 25", "x = 4"], answer: 1, topic: "Logaritmiese funksies & vergelykings" },
        { type: "input", text: "Los op: 2ˣ = 50. Gee x tot 2 desimale plekke.", answer: "5.64", altAnswers: ["5,64"], topic: "Logaritmiese funksies & vergelykings" },
        { type: "mc", text: "Los op: log₃(x − 1) = 2", options: ["x = 10", "x = 7", "x = 9", "x = 5"], answer: 0, topic: "Logaritmiese funksies & vergelykings" },
        { type: "mc", text: "Die vertikale asimptoot van y = log(x + 2) is:", options: ["x = 0", "x = 2", "x = −2", "y = 0"], answer: 2, topic: "Logaritmiese funksies & vergelykings" },
        { type: "mc", text: "log(a²b³) uitgedruk met behulp van log a en log b:", options: ["2log a + 3log b", "5log(ab)", "6log(ab)", "log a² + log b³ slegs"], answer: 0, topic: "Logaritmiese funksies & vergelykings" },
        { type: "input", text: "Los op vir x: log₂(x) + log₂(x + 6) = 4", answer: "2", topic: "Logaritmiese funksies & vergelykings" },
        { type: "input", text: "'n Belegging van R12 500 groei teen 11% p.j. jaarliks saamgestel. Bepaal die minimum aantal volle jare vir die belegging om R30 000 te oorskry.", answer: "9", topic: "Logaritmiese funksies & vergelykings" }
      ]
    },
    {
      id: 202,
      chapter: 2,
      name: "Beperking van domeine vir inverses",
      fullName: "Een-tot-een funksies, die horisontale lyntoets, en beperking van domeine sodat inverses funksies is",
      lesson: {
        heading: "Beperk domeine sodat die inverse 'n funksie is",
        sub: "Hoofstuk 2 · Onderwerp 3",
        body: `
          <p>Nie elke funksie het 'n inverse wat ook 'n funksie is nie. CAPS vereis dat jy presies verstaan wanneer dit misluk, en hoe die beperking van die domein dit regstel.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Een-tot-een vs veel-tot-een</div>
            <p>
              'n Funksie is <strong>een-tot-een</strong> as elke y-waarde ooreenstem met presies een x-waarde (slaag die horisontale lyntoets).<br>
              'n Funksie is <strong>veel-tot-een</strong> as party y-waardes van meer as een x-waarde kom (bv. f(x) = x²: beide x = 2 en x = −2 gee y = 4).<br><br>
              Slegs 'n een-tot-een funksie het 'n inverse wat self 'n funksie is. As f veel-tot-een is, is f⁻¹ 'n <em>relasie</em>, nie 'n funksie nie — tensy ons f se domein beperk.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Waarskuwing oor notasie</div>
            <p>
              f⁻¹ word slegs gebruik vir die inverse van 'n een-tot-een relasie. Moenie f⁻¹(x) verwar met die resiprook 1/f(x) nie — vir f(x) = x, is die resiprook 1/x, terwyl f⁻¹(x) = x ook, maar vir f(x) = x² beperk tot x ≥ 0, is f⁻¹(x) = √x ≠ 1/x².
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Beperk f(x) = x²</div>
            <p>f(x) = x² (domein: alle reële getalle) is veel-tot-een — misluk die horisontale lyntoets.<br>
            Beperk die domein tot x ≥ 0 (slegs die regterhelfte). Nou is f een-tot-een op hierdie beperkte domein.<br>
            Ruil om en los op: x = y² → y = √x (neem die positiewe wortel aangesien die beperkte domein x ≥ 0 was)<br>
            Dus f⁻¹(x) = √x, met domein x ≥ 0 en bereik y ≥ 0.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: y = ay², d.w.s. x = ay²</div>
            <p>Beskou die relasie x = ay² ('n sywaartse parabool, a > 0). Los op vir y: y = ±√(x/a).<br>
            Om dit 'n funksie te maak, beperk ons tot y ≥ 0 of y ≤ 0. As ons y ≥ 0 kies, is die inverse (terug-omruil) f⁻¹(x) = ax², x ≥ 0.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Eksamenwenk</div>
            <p>Wanneer jy gevra word om 'n domein te beperk, stel dit eksplisiet (bv. "vir x ≥ 0") en kontroleer dat jou beperkte grafiek die horisontale lyntoets slaag voordat jy f⁻¹ neerskryf.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Een-tot-Een-Toetser</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Kies 'n funksietipe en 'n domeinbeperking — kyk of dit een-tot-een is op daardie domein.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Funksie</div>
                <select id="g12c2t3fn" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="x2">f(x) = x²</option>
                  <option value="negx2">f(x) = −x²</option>
                  <option value="x3">f(x) = x³</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Domein vanaf</div><input id="g12c2t3lo" type="number" value="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Domein tot</div><input id="g12c2t3hi" type="number" value="5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Toets</button>
            </div>
            <div id="g12c2t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gs(id){return document.getElementById(id).value;}
              function calc(){
                const fn=gs('g12c2t3fn'),lo=gv('g12c2t3lo'),hi=gv('g12c2t3hi');
                const out=document.getElementById('g12c2t3Out');
                if(isNaN(lo)||isNaN(hi)||lo>=hi){out.innerHTML='<span style="color:#fca5a5;">Voer \\'n geldige domein in (vanaf < tot).</span>';return;}
                const f=x=>fn==='x2'?x*x:fn==='negx2'?-x*x:x*x*x;
                const label=fn==='x2'?'x²':fn==='negx2'?'−x²':'x³';
                let oneToOne=true,samples=200;
                const seen=[];
                for(let k=0;k<=samples;k++){
                  const x=lo+(hi-lo)*k/samples;
                  const y=f(x);
                  for(const s of seen){ if(Math.abs(s.y-y)<1e-6 && Math.abs(s.x-x)>1e-6){oneToOne=false;break;} }
                  if(!oneToOne) break;
                  seen.push({x,y});
                }
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">f(x) = '+label+' op ['+lo+'; '+hi+']</span><br>'+
                  (oneToOne
                    ? '<span style="color:#6ee7b7;">✅ Een-tot-een op hierdie domein — f⁻¹ is hier \\'n funksie.</span>'
                    : '<span style="color:#fca5a5;">❌ Veel-tot-een op hierdie domein — f⁻¹ sal NIE \\'n funksie wees NIE (beperk verder).</span>');
              }
              ['g12c2t3lo','g12c2t3hi'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c2t3fn').addEventListener('change',calc);
              document.getElementById('g12c2t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = x² het nie 'n inverse funksie nie omdat f:", options: ["Een-tot-een is", "Veel-tot-een is", "Onbepaald is vir x < 0", "Nie kontinu is nie"], answer: 1, topic: "Beperking van domeine vir inverses" },
        { type: "mc", text: "Om f(x) = x² een-tot-een te maak, is 'n geldige domeinbeperking:", options: ["x ∈ ℝ", "x ≥ 0", "x ≠ 0", "x < 0 of x > 0"], answer: 1, topic: "Beperking van domeine vir inverses" },
        { type: "input", text: "f(x) = x² beperk tot x ≥ 0. Vind f⁻¹(x).", answer: "√x", altAnswers: ["sqrt(x)", "x^0.5", "x^(1/2)"], topic: "Beperking van domeine vir inverses" },
        { type: "mc", text: "Watter toets bepaal of 'n grafiek 'n een-tot-een funksie voorstel?", options: ["Vertikale lyntoets", "Horisontale lyntoets", "Oorsprong-simmetrietoets", "Afsnittoets"], answer: 1, topic: "Beperking van domeine vir inverses" },
        { type: "mc", text: "Vir f(x) = x², beperk tot x ≤ 0, is die inverse:", options: ["f⁻¹(x) = √x", "f⁻¹(x) = −√x", "f⁻¹(x) = x²", "Geen inverse bestaan nie"], answer: 1, topic: "Beperking van domeine vir inverses" },
        { type: "input", text: "f(x) = (x + 3)² vir x ≥ −3. Bepaal f⁻¹(x).", answer: "√x − 3", altAnswers: ["√x-3", "sqrt(x)-3", "sqrt(x) - 3", "x^0.5 - 3", "x^0.5-3"], topic: "Beperking van domeine vir inverses" },
        { type: "input", text: "g(x) = 2(x − 1)² + 4 vir x ≤ 1. Bepaal g⁻¹(x).", answer: "1 − √((x − 4)/2)", altAnswers: ["1-√((x-4)/2)", "1-sqrt((x-4)/2)", "1 - sqrt((x-4)/2)"], topic: "Beperking van domeine vir inverses" }
      ]
    },
    {
      id: 203,
      chapter: 2,
      name: "Grafieke van eksponensiële & logaritmiese funksies",
      fullName: "Skets van y = b^x en y = log_b(x) vir b > 1 en 0 < b < 1, en hul sleutelkenmerke",
      lesson: {
        heading: "Skets van eksponensiële en logaritmiese grafieke",
        sub: "Hoofstuk 2 · Onderwerp 4",
        body: `
          <p>Omdat y = log_b(x) die inverse van y = bˣ is, is hul grafieke spieëlbeelde van mekaar in die lyn y = x, en hul sleutelkenmerke weerspieël mekaar.</p>

          <div class="def-box">
            <div class="def-box-title">📖 y = bˣ (b > 0, b ≠ 1)</div>
            <p>
              Domein: ℝ &nbsp;|&nbsp; Bereik: y > 0<br>
              y-afsnit: (0; 1) &nbsp;|&nbsp; Geen x-afsnit nie<br>
              Horisontale asimptoot: y = 0<br>
              As b > 1: toenemend (groei) &nbsp;|&nbsp; As 0 &lt; b &lt; 1: afnemend (verval)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 y = log_b(x) (b > 0, b ≠ 1)</div>
            <p>
              Domein: x > 0 &nbsp;|&nbsp; Bereik: ℝ<br>
              x-afsnit: (1; 0) &nbsp;|&nbsp; Geen y-afsnit nie<br>
              Vertikale asimptoot: x = 0<br>
              As b > 1: toenemend &nbsp;|&nbsp; As 0 &lt; b &lt; 1: afnemend<br><br>
              Aangesien dit die inverse van y = bˣ is, gee die omruil van x- en y-afsnitte/asimptote van die eksponensiële funksie die log-grafiek se kenmerke direk.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: y = 2ˣ en y = log₂(x)</div>
            <p>y = 2ˣ gaan deur (0;1), (1;2), (2;4), asimptoot y = 0, toenemend.<br>
            Sy inverse y = log₂(x) gaan deur (1;0), (2;1), (4;2), asimptoot x = 0, toenemend — presies die gespieëlde punte.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: transformasies</div>
            <p>Spieëling van f(x) = aˣ in die y-as gee h(x) = a⁻ˣ.<br>
            Spieëling van f(x) = aˣ in die x-as gee k(x) = −aˣ.<br>
            Skuif van f(x) = aˣ twee eenhede links gee p(x) = aˣ⁺².</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">📈 Eksponensiële & Logaritme Grafiekplotter</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer grondtal b in — sien y = bˣ en sy inverse y = log_b(x) saam met die lyn y = x geplot.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Grondtal b</div><input id="g12c2gB" type="number" value="2" min="0.05" step="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c2gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Plot</button>
            </div>
            <svg id="g12c2gSvg" viewBox="0 0 340 340" style="width:100%;max-width:360px;background:#1e1b4b;border-radius:10px;border:1px solid rgba(99,102,241,0.25);"></svg>
            <div id="g12c2gOut" style="font-size:13px;line-height:1.8;color:rgba(221,225,240,0.85);min-height:24px;margin-top:8px;"></div>
            <script>
            (function(){
              const svgNS='http://www.w3.org/2000/svg';
              const svg=document.getElementById('g12c2gSvg');
              const W=340,H=340,ox=170,oy=170,scale=22;
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function toPx(x,y){return [ox+x*scale, oy-y*scale];}
              function el(tag,attrs){const e=document.createElementNS(svgNS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);return e;}
              function draw(){
                const b=gv('g12c2gB');
                const out=document.getElementById('g12c2gOut');
                svg.innerHTML='';
                if(isNaN(b)||b<=0||b===1){out.innerHTML='<span style="color:#fca5a5;">b moet > 0 en ≠ 1 wees.</span>';return;}
                // axes
                svg.appendChild(el('line',{x1:0,y1:oy,x2:W,y2:oy,stroke:'rgba(221,225,240,0.30)','stroke-width':1}));
                svg.appendChild(el('line',{x1:ox,y1:0,x2:ox,y2:H,stroke:'rgba(221,225,240,0.30)','stroke-width':1}));
                // y = x line
                let dLine='M '+toPx(-7,-7).join(',')+' L '+toPx(7,7).join(',');
                svg.appendChild(el('path',{d:dLine,stroke:'rgba(221,225,240,0.25)','stroke-width':1,'stroke-dasharray':'4,3',fill:'none'}));
                // exponential y = b^x
                let expPts=[];
                for(let px=0;px<=W;px+=2){
                  const x=(px-ox)/scale;
                  const y=Math.pow(b,x);
                  if(y>-8&&y<8){const [X,Y]=toPx(x,y); expPts.push(X+','+Y);}
                }
                svg.appendChild(el('polyline',{points:expPts.join(' '),fill:'none',stroke:'#6ee7b7','stroke-width':2}));
                // logarithm y = log_b(x), i.e. x = b^y
                let logPts=[];
                for(let py=0;py<=H;py+=2){
                  const y=(oy-py)/scale;
                  const x=Math.pow(b,y);
                  if(x>0&&x<8){const [X,Y]=toPx(x,y); logPts.push(X+','+Y);}
                }
                svg.appendChild(el('polyline',{points:logPts.join(' '),fill:'none',stroke:'#fcd34d','stroke-width':2}));
                svg.appendChild(el('circle',{cx:toPx(0,1)[0],cy:toPx(0,1)[1],r:3,fill:'#6ee7b7'}));
                svg.appendChild(el('circle',{cx:toPx(1,0)[0],cy:toPx(1,0)[1],r:3,fill:'#fcd34d'}));
                out.innerHTML='<span style="color:#6ee7b7;">■ y = '+b+'ˣ</span> — deur (0;1), asimptoot y=0<br>'+
                  '<span style="color:#fcd34d;">■ y = log_'+b+'(x)</span> — deur (1;0), asimptoot x=0<br>'+
                  '<span style="color:rgba(221,225,240,0.45);">- - - y = x (spieëllyn)</span>';
              }
              document.getElementById('g12c2gB').addEventListener('keydown',e=>{if(e.key==='Enter')draw();});
              document.getElementById('g12c2gBtn').addEventListener('click',draw);
              draw();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Die grafiek van y = bˣ (b > 1) het:", options: ["'n Vertikale asimptoot by x = 0", "'n Horisontale asimptoot by y = 0", "'n x-afsnit by (1; 0)", "Geen asimptote nie"], answer: 1, topic: "Grafieke van eksponensiële & logaritmiese funksies" },
        { type: "mc", text: "Die grafiek van y = log_b(x) gaan altyd deur:", options: ["(0; 1)", "(1; 0)", "(0; 0)", "(b; 0)"], answer: 1, topic: "Grafieke van eksponensiële & logaritmiese funksies" },
        { type: "mc", text: "Vir 0 < b < 1, is die grafiek van y = bˣ:", options: ["Toenemend", "Afnemend", "Konstant", "'n Reguit lyn"], answer: 1, topic: "Grafieke van eksponensiële & logaritmiese funksies" },
        { type: "mc", text: "Spieëling van f(x) = 3ˣ in die y-as gee die funksie:", options: ["y = −3ˣ", "y = 3⁻ˣ", "y = log₃x", "y = 3ˣ⁻¹"], answer: 1, topic: "Grafieke van eksponensiële & logaritmiese funksies" },
        { type: "input", text: "y = log_b(x) het 'n vertikale asimptoot by x = ___.", answer: "0", topic: "Grafieke van eksponensiële & logaritmiese funksies" },
        { type: "mc", text: "Die grafieke van y = bˣ en y = log_b(x) is spieëlbeelde van mekaar in die lyn:", options: ["x = 0", "y = 0", "y = x", "y = −x"], answer: 2, topic: "Grafieke van eksponensiële & logaritmiese funksies" },
        { type: "input", text: "Bepaal die inverse van f(x) = 2ˣ⁺¹.", answer: "log₂(x) − 1", altAnswers: ["log2(x)-1", "log_2(x) - 1", "log₂x − 1", "log₂(x)-1"], topic: "Grafieke van eksponensiële & logaritmiese funksies" },
        { type: "input", text: "Die grafiek van y = log₃(x) word gespieël in die lyn y = x, en dan 2 eenhede af geskuif om h(x) te vorm. Skryf h(x) neer.", answer: "3ˣ − 2", altAnswers: ["3^x - 2", "3^x-2"], topic: "Grafieke van eksponensiële & logaritmiese funksies" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 2 Werkboek — Funksies en Logaritmes",
    questions: [
      { number: 1, text: "f(x) = x² − 4 (vir x ≥ 0).", parts: [
        { label: "a", text: "Vind f⁻¹(x) en gee sy domein.", marks: 3 },
        { label: "b", text: "Skets beide f en f⁻¹ op dieselfde asse, en toon y = x.", marks: 3 },
        { label: "c", text: "Vind f⁻¹(5).", marks: 1 }
      ]},
      { number: 2, text: "Los op vir x (toon alle berekeninge):", parts: [
        { label: "a", text: "log₂(x) + log₂(x − 2) = 3", marks: 4 },
        { label: "b", text: "3^(2x−1) = 7", marks: 4 },
        { label: "c", text: "log(x² − 5x) = log(6)", marks: 4 }
      ]},
      { number: 3, text: "Hoe lank (in jare, tot 1 desimale plek) neem dit vir R8 000 om te verdubbel teen 9.5% p.j. saamgestelde rente?", parts: [
        { label: "a", text: "Stel die vergelyking op.", marks: 2 },
        { label: "b", text: "Los op met logaritmes.", marks: 3 }
      ]},
      { number: 4, text: "Die tabel hieronder gee waardes van 'n funksie van die vorm y = a·bˣ:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>x</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>y</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>10</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>20</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>40</td></tr></table>", parts: [
        { label: "a", text: "Gebruik die tabel om die waardes van a en b te bepaal.", marks: 3 },
        { label: "b", text: "Skryf dus f⁻¹(x), die inverse van y = a·bˣ, in logaritmiese vorm neer.", marks: 3 },
        { label: "c", text: "Gebruik jou vergelyking om die waarde van y te voorspel wanneer x = 5.", marks: 2 },
        { label: "d", text: "Skryf die vergelyking van die horisontale asimptoot van die grafiek van y = a·bˣ neer.", marks: 1 }
      ]}
    ],
    answers: {
      1: { a: "x=y²−4→y²=x+4→y=√(x+4); domein x≥−4", b: "Parabool en vierkantswortel-spieëling", c: "f⁻¹(5)=√9=3" },
      2: { a: "log₂(x(x−2))=3→x(x−2)=8→x²−2x−8=0→(x−4)(x+2)=0→x=4 (verwerp x=−2)", b: "(2x−1)log3=log7→x=(log7/log3+1)/2≈1.386", c: "x²−5x=6→x²−5x−6=0→x=6 of x=−1 (kontroleer beide: x=−1→log(6)✓; x=6→log(6)✓ altwee geldig)" },
      3: { a: "16000=8000(1.095)ⁿ→(1.095)ⁿ=2", b: "n=log2/log1.095≈7.6 jaar" },
      4: { a: "a = 5 (die y-waarde by x = 0). Verhouding tussen opeenvolgende y-waardes: 10/5 = 20/10 = 40/20 = 2, dus b = 2. Dus y = 5·2ˣ.", b: "Ruil x en y om: x = 5·2ʸ → 2ʸ = x/5 → y = log₂(x/5). Dus f⁻¹(x) = log₂(x/5).", c: "y = 5·2⁵ = 5×32 = 160", d: "y = 0" }
    }
  }
});
