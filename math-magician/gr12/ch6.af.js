// Math Magician — Graad 12, Hoofstuk 6
// Differensiaalrekene

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 600,
      chapter: 6,
      name: "Limiete, eerste beginsels & reëls",
      fullName: "Limiete, differensiasie vanuit eerste beginsels, en reëls van differensiasie",
      lesson: {
        heading: "Limiete, eerste beginsels, en differensiasiereëls",
        sub: "Hoofstuk 6 · Onderwerp 1",
        body: `
          <p><strong>Differensiaalrekene</strong> is die wiskunde van oombliklike tempo van verandering — die gradiënt van 'n kurwe by enige punt.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die afgeleide vanuit eerste beginsels</div>
            <p>
              Die gradiënt van die raaklyn aan f(x) by punt x is:<br>
              <span class="math">f'(x) = lim[h→0] [f(x+h) − f(x)] / h</span><br><br>
              Dit is die definisie. Jy moet die volle limietproses toon in eerste-beginsels-vrae.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Eerste beginsels: f(x) = x²</div>
            <p><span class="math">f'(x) = lim[h→0] [(x+h)² − x²] / h</span><br>
            <span class="math">= lim[h→0] [x²+2xh+h² − x²] / h</span><br>
            <span class="math">= lim[h→0] [2xh + h²] / h</span><br>
            <span class="math">= lim[h→0] [2x + h] = 2x</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reëls van differensiasie</div>
            <p>
              <strong>Magsreël:</strong> <span class="math">d/dx[xⁿ] = nxⁿ⁻¹</span><br>
              <strong>Konstante:</strong> <span class="math">d/dx[c] = 0</span><br>
              <strong>Konstante veelvoud:</strong> <span class="math">d/dx[cf(x)] = cf'(x)</span><br>
              <strong>Som/verskil:</strong> <span class="math">d/dx[f ± g] = f' ± g'</span><br><br>
              Notasie: f'(x), dy/dx, Dₓ[y], ẏ is almal ekwivalent.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeelde: Pas die reëls toe</div>
            <p><strong>(a)</strong> f(x) = 3x⁴ − 5x² + 7 → f'(x) = 12x³ − 10x<br>
            <strong>(b)</strong> y = 2/x + √x = 2x⁻¹ + x^(½) → dy/dx = −2x⁻² + ½x^(−½)<br>
            <strong>(c)</strong> g(x) = (x + 1)(x − 3) = x² − 2x − 3 → g'(x) = 2x − 2</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Polinoom-Afgeleide-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Differensieer f(x) = ax³+bx²+cx+d en evalueer f'(x) by 'n punt.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (x³)</div><input id="g12c6a" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (x²)</div><input id="g12c6b" type="number" value="-5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (x)</div><input id="g12c6c" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d (konst.)</div><input id="g12c6d" type="number" value="7" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Evalueer by x=</div><input id="g12c6x0" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c6Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Differensieer</button>
            </div>
            <div id="g12c6Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function t(coef,exp){if(coef===0)return'';const sign=coef>0?'+':'';return sign+(exp>0?coef+'x'+(exp>1?'<sup>'+exp+'</sup>':''):''+coef);}
              function calc(){
                const a=gv('g12c6a'),b=gv('g12c6b'),c=gv('g12c6c'),d=gv('g12c6d'),x0=gv('g12c6x0');
                const out=document.getElementById('g12c6Out');
                if([a,b,c,d,x0].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer alle waardes in.</span>';return;}
                // f(x) = ax³+bx²+cx+d
                // f'(x) = 3ax²+2bx+c
                const da=3*a,db=2*b,dc=c;
                const fx0=a*x0*x0*x0+b*x0*x0+c*x0+d;
                const fpx0=da*x0*x0+db*x0+dc;
                const fppx0=6*a*x0+2*b;
                // raaklyn: y − f(x0) = f'(x0)(x − x0)
                const yint=fx0-fpx0*x0;
                let pstr='f(x) = ';
                if(a!==0) pstr+=a+'x³';
                if(b!==0) pstr+=(b>0&&a!==0?'+':'')+b+'x²';
                if(c!==0) pstr+=(c>0&&(a!==0||b!==0)?'+':'')+c+'x';
                if(d!==0) pstr+=(d>0&&(a!==0||b!==0||c!==0)?'+':'')+d;
                let html='<span style="color:rgba(221,225,240,0.50);">'+pstr+'</span><br>';
                html+='<span style="color:#fcd34d;">f\'(x) = '+da+'x² + '+db+'x + '+dc+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">f\'\'(x) = '+(6*a)+'x + '+(2*b)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">f('+x0+') = '+fx0+'</span>   <span style="color:#6ee7b7;">f\'('+x0+') = '+fpx0+'</span>   <span style="color:rgba(221,225,240,0.50);">f\'\'('+x0+') = '+fppx0+'</span><br>';
                html+='<span style="color:#6ee7b7;">Raaklyn by ('+x0+', '+fx0+'): y = '+fpx0+'x + '+yint+'</span>';
                out.innerHTML=html;
              }
              ['g12c6a','g12c6b','g12c6c','g12c6d','g12c6x0'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c6Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Deur eerste beginsels te gebruik, is die afgeleide van f(x) = 3x:", options: ["3x", "3", "0", "3x²"], answer: 1, topic: "Limiete, eerste beginsels & reëls" },
        { type: "mc", text: "Differensieer: y = 5x³ − 2x + 8", options: ["15x² − 2", "5x² − 2x", "15x² − 2x + 8", "15x³ − 2"], answer: 0, topic: "Limiete, eerste beginsels & reëls" },
        { type: "input", text: "f(x) = x⁴ − 3x². Bepaal f'(2).", answer: "20", topic: "Limiete, eerste beginsels & reëls" },
        { type: "mc", text: "dy/dx van y = 4/x²:", options: ["−8/x³", "8x", "−8x³", "4x⁻¹"], answer: 0, topic: "Limiete, eerste beginsels & reëls" },
        { type: "mc", text: "Differensieer: f(x) = (2x − 1)²", options: ["2(2x−1)", "4(2x−1)", "4x − 2", "Beide B en C"], answer: 1, topic: "Limiete, eerste beginsels & reëls" },
        { type: "input", text: "As f(x) = 3x² − x, gebruik eerste beginsels (of die magsreël) om f'(x) te bepaal, evalueer dan f'(−2).", answer: "-13", altAnswers: ["−13"], topic: "Limiete, eerste beginsels & reëls" }
      ]
    },
    {
      id: 601,
      chapter: 6,
      name: "Raaklyne, kurweskets & optimering",
      fullName: "Raaklyne, tweede afgeleide, kubieke kurweskets, en optimering",
      lesson: {
        heading: "Raaklyne, kurweskets, en optimering",
        sub: "Hoofstuk 6 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Vergelyking van 'n raaklyn aan 'n kurwe</div>
            <p>
              By punt (a, f(a)) het die raaklyn gradiënt m = f'(a).<br>
              Vergelyking: <span class="math">y − f(a) = f'(a)(x − a)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Tweede afgeleide en konkawiteit</div>
            <p>
              <span class="math">f''(x)</span> = afgeleide van f'(x)<br>
              f''(x) > 0: konkaaf op (minimum draaipunt)<br>
              f''(x) &lt; 0: konkaaf af (maksimum draaipunt)<br>
              f''(x) = 0: moontlike buigpunt
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Skets van 'n kubieke f(x) = ax³ + bx² + cx + d</div>
            <p>
              <strong>Stap 1:</strong> y-afsnit: f(0) = d<br>
              <strong>Stap 2:</strong> x-afsnitte: los f(x) = 0 op (faktorteorema)<br>
              <strong>Stap 3:</strong> Stilstandspunte: los f'(x) = 0 op → vind (x, f(x))<br>
              <strong>Stap 4:</strong> Aard via f''(x): pos = min, neg = maks<br>
              <strong>Stap 5:</strong> Buigpunt: f''(x) = 0<br>
              <strong>Stap 6:</strong> Eindgedrag: teken van a
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Optimering</div>
            <p>
              Om die maksimum/minimum waarde van 'n hoeveelheid te vind:<br>
              1. Skryf 'n formule vir die hoeveelheid in terme van een veranderlike<br>
              2. Differensieer en stel gelyk aan 0<br>
              3. Bevestig maks/min via die tweede afgeleide of teken van f'<br>
              4. Gee die antwoord in konteks met eenhede
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kubieke-Stilstandspunt-& Buigpunt-Vinder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer f(x) = ax³+bx²+cx+d in — vind draaipunte, hul aard, en buigpunt.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c6t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g12c6t2b" type="number" value="-3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g12c6t2c" type="number" value="-9" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d</div><input id="g12c6t2d" type="number" value="27" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c6t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Ontleed</button>
            </div>
            <div id="g12c6t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c6t2a'),b=gv('g12c6t2b'),c=gv('g12c6t2c'),d=gv('g12c6t2d');
                const out=document.getElementById('g12c6t2Out');
                if([a,b,c,d].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer kubieke koëffisiënte in (a ≠ 0).</span>';return;}
                const f=x=>a*x*x*x+b*x*x+c*x+d;
                // f'(x) = 3ax²+2bx+c → stel gelyk aan 0
                const disc=4*b*b-4*3*a*c;
                let html='<span style="color:rgba(221,225,240,0.50);">f\'(x) = '+3*a+'x² + '+2*b+'x + '+c+'</span><br>';
                if(disc<0){html+='<span style="color:#fca5a5;">Δ < 0 → geen reële stilstandspunte nie.</span>';}
                else{
                  const x1=(-2*b+Math.sqrt(disc))/(2*3*a),x2=(-2*b-Math.sqrt(disc))/(2*3*a);
                  const pts=[x1,x2].sort((a,b)=>a-b);
                  pts.forEach(x=>{
                    const fx=f(x);
                    const fpp=6*a*x+2*b;
                    const nature=fpp>0?'minimum':'maksimum';
                    html+='<span style="color:#fcd34d;">Stilstandspunt by x = '+f4(x)+': f(x) = '+f4(fx)+'  →  '+nature+' (f\'\'= '+f4(fpp)+')</span><br>';
                  });
                }
                const xi=-b/(3*a),fxi=f(xi);
                html+='<span style="color:#6ee7b7;">Buigpunt (f\'\'=0): x = '+f4(xi)+', y = '+f4(fxi)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">y-afsnit: (0, '+d+')   Eindgedrag: a='+a+(a>0?' → val links, styg regs':' → styg links, val regs')+'</span>';
                out.innerHTML=html;
              }
              ['g12c6t2a','g12c6t2b','g12c6t2c','g12c6t2d'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c6t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = x³ − 3x + 2. Stilstandspunte by x =", options: ["x = 1 en x = −1", "x = 3 en x = −3", "x = 0 slegs", "x = 2 slegs"], answer: 0, topic: "Raaklyne, kurweskets & optimering" },
        { type: "mc", text: "f''(x) = −6 by 'n stilstandspunt beteken:", options: ["Minimum", "Maksimum", "Buigpunt", "Kan nie bepaal word nie"], answer: 1, topic: "Raaklyne, kurweskets & optimering" },
        { type: "input", text: "f(x) = x² − 4x + 3. Bepaal die x-koördinaat van die minimum.", answer: "2", topic: "Raaklyne, kurweskets & optimering" },
        { type: "mc", text: "Raaklyn aan y = x² by x = 3 het gradiënt:", options: ["9", "6", "3", "12"], answer: 1, topic: "Raaklyne, kurweskets & optimering" },
        { type: "mc", text: "'n Houer met 'n vierkantige basis van sy x en hoogte h het volume 500 = x²h. Om die oppervlak te minimeer, is die eerste stap om:", options: ["Onmiddellik O te differensieer", "h in terme van x uit te druk deur V=500 te gebruik", "O = 0 te stel", "V te differensieer"], answer: 1, topic: "Raaklyne, kurweskets & optimering" },
        { type: "input", text: "Bepaal die y-afsnit van die raaklyn aan f(x) = x² − 6x + 5 by die punt waar die gradiënt van die raaklyn 4 is.", answer: "-20", altAnswers: ["−20"], topic: "Raaklyne, kurweskets & optimering" }
      ]
    },
    {
      id: 602,
      chapter: 6,
      name: "Tempo van verandering & bewegingsrekene",
      fullName: "Gemiddelde teenoor oombliklike tempo van verandering, en bewegingsrekene (verplasing, snelheid, versnelling)",
      lesson: {
        heading: "Tempo van verandering en bewegingsrekene",
        sub: "Hoofstuk 6 · Onderwerp 3",
        body: `
          <p>Differensiasie gee ons 'n presiese taal vir <strong>hoe vinnig 'n hoeveelheid verander</strong> — dit sluit voorwerpe in wat langs 'n lyn beweeg.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Gemiddelde tempo van verandering</div>
            <p>
              Die gemiddelde tempo van verandering van f(x) tussen x = a en x = b is die gradiënt van die koord wat die twee punte verbind:<br>
              <span class="math">Gemiddelde tempo van verandering = [f(b) − f(a)] / (b − a)</span><br><br>
              Dit is dieselfde formule as gemiddelde gradiënt van Graad 10/11-funksiewerk.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Oombliklike tempo van verandering</div>
            <p>
              Die <strong>oombliklike</strong> tempo van verandering van f by x = a is <span class="math">f'(a)</span> — die afgeleide geëvalueer by daardie punt.<br>
              Dit is die limiet van die gemiddelde tempo van verandering soos b → a (d.w.s. soos die interval krimp na 'n enkele punt).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Bewegingsrekene</div>
            <p>
              As s(t) die verplasing van 'n voorwerp op tydstip t is, dan:<br>
              <strong>Snelheid:</strong> <span class="math">v(t) = s'(t) = ds/dt</span><br>
              <strong>Versnelling:</strong> <span class="math">a(t) = v'(t) = s''(t)</span><br><br>
              Die voorwerp is <strong>stilstaande</strong> (oomblikkelik in rus) wanneer v(t) = 0.<br>
              Die snelheid is 'n <strong>maksimum of minimum</strong> wanneer a(t) = 0.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>'n Bal se hoogte is s(t) = 30t − 5t² (meter, t in sekondes).<br>
            v(t) = s'(t) = 30 − 10t<br>
            Bal is stilstaande (bereik grootste hoogte) wanneer v(t) = 0 → 30 − 10t = 0 → t = 3 s<br>
            a(t) = v'(t) = −10 m/s² (konstante vertraging weens swaartekrag)</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Tekenkonvensies</div>
            <p>
              v(t) &gt; 0: beweeg in die positiewe rigting<br>
              v(t) &lt; 0: beweeg in die negatiewe rigting<br>
              v(t) = 0: oomblikkelik in rus (dikwels 'n draaipunt van s(t))<br>
              a(t) &gt; 0: versnel in die positiewe rigting (of vertraag as dit negatief beweeg)
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Bewegingsontleder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer s(t) = at² + bt + c in — vind snelheid, versnelling, en wanneer die voorwerp stilstaande is.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a (t²)</div><input id="g12c6t3a" type="number" value="-5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b (t)</div><input id="g12c6t3b" type="number" value="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c (konst.)</div><input id="g12c6t3c" type="number" value="0" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Evalueer by t=</div><input id="g12c6t3t0" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c6t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Ontleed beweging</button>
            </div>
            <div id="g12c6t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c6t3a'),b=gv('g12c6t3b'),c=gv('g12c6t3c'),t0=gv('g12c6t3t0');
                const out=document.getElementById('g12c6t3Out');
                if([a,b,c,t0].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer alle waardes in.</span>';return;}
                const s=t=>a*t*t+b*t+c;
                const v=t=>2*a*t+b;
                const acc=2*a;
                let html='<span style="color:rgba(221,225,240,0.50);">s(t) = '+a+'t² + '+b+'t + '+c+'</span><br>';
                html+='<span style="color:#fcd34d;">v(t) = s\'(t) = '+(2*a)+'t + '+b+'</span><br>';
                html+='<span style="color:#fcd34d;">a(t) = v\'(t) = '+acc+'  (konstant)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">s('+t0+') = '+f4(s(t0))+'   v('+t0+') = '+f4(v(t0))+'</span><br>';
                if(a!==0){
                  const tstat=-b/(2*a);
                  html+='<span style="color:#6ee7b7;">Stilstaande (v=0) by t = '+f4(tstat)+' s, wat s = '+f4(s(tstat))+' m gee</span>';
                } else {
                  html+="<span style=\"color:rgba(221,225,240,0.50);\">v(t) is konstant "+b+" — voorwerp hou nooit op nie (tensy b=0).</span>";
                }
                out.innerHTML=html;
              }
              ['g12c6t3a','g12c6t3b','g12c6t3c','g12c6t3t0'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c6t3Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "s(t) = 40t − 5t². Die snelheidsfunksie v(t) is:", options: ["40 − 10t", "40 − 5t", "−10", "40t − 10"], answer: 0, topic: "Tempo van verandering & bewegingsrekene" },
        { type: "input", text: "s(t) = 40t − 5t². Bepaal die tydstip t wanneer die voorwerp oomblikkelik in rus is.", answer: "4", topic: "Tempo van verandering & bewegingsrekene" },
        { type: "mc", text: "Vir s(t) = t³ − 6t² + 9t, is die versnellingsfunksie a(t):", options: ["6t − 12", "3t² − 12t + 9", "6t", "12"], answer: 0, topic: "Tempo van verandering & bewegingsrekene" },
        { type: "mc", text: "Die gemiddelde tempo van verandering van f(x) = x² tussen x = 1 en x = 4 is:", options: ["5", "15", "3", "16"], answer: 0, topic: "Tempo van verandering & bewegingsrekene" },
        { type: "mc", text: "As v(t) &lt; 0 vir 'n voorwerp wat langs 'n lyn beweeg, beteken dit die voorwerp is:", options: ["Aan die versnel", "Beweeg in die negatiewe rigting", "In rus", "Aan die positief versnel"], answer: 1, topic: "Tempo van verandering & bewegingsrekene" },
        { type: "input", text: "s(t) = t² − 8t + 20. Bepaal die minimum verplasing (die waarde van s by die stilstandspunt).", answer: "4", topic: "Tempo van verandering & bewegingsrekene" },
        { type: "input", text: "s(t) = 2t³ − 15t² + 24t beskryf die verplasing (m) van 'n voorwerp vir t ≥ 0. Bepaal die versnelling by t = 3 sekondes (in m/s²).", answer: "6", topic: "Tempo van verandering & bewegingsrekene" }
      ]
    },
    {
      id: 603,
      chapter: 6,
      name: "Kubieke grafieke: volledige ontleding & interpretasie",
      fullName: "Volledige ontleding van kubieke grafieke — afsnitte, draaipunte, buigpunt, en die lees van inligting vanaf 'n gegewe grafiek",
      lesson: {
        heading: "Kubieke grafieke: volledige ontleding en interpretasie",
        sub: "Hoofstuk 6 · Onderwerp 4",
        body: `
          <p>Eksamenvrae gee dikwels 'n <strong>skets of gedeeltelike inligting</strong> oor 'n kubieke en vra jou om feite daaroor te herbou met differensiaalrekene — hierdie onderwerp fokus op daardie vaardigheid.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Lees 'n kubieke grafiek</div>
            <p>
              Gegewe 'n skets van y = f(x), moet jy direk van die prent af kan identifiseer:<br>
              • x-afsnitte → wortels van f(x) = 0<br>
              • y-afsnit → f(0)<br>
              • Draaipunte → waar f'(x) = 0 (lees die x-koördinaat van die grafiek af)<br>
              • Waar f toenemend is → f'(x) &gt; 0 (grafiek styg, van links na regs gelees)<br>
              • Waar f afnemend is → f'(x) &lt; 0 (grafiek val)<br>
              • Buigpunt → waar konkawiteit verander (f''(x) = 0)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Van die f'(x)-grafiek terug na f(x)</div>
            <p>
              As jy die grafiek van die <strong>afgeleide</strong> f'(x) gewys word in plaas van f(x) self:<br>
              • x-afsnitte van f'(x) → stilstandspunte (draaipunte) van f(x)<br>
              • f'(x) &gt; 0 (bo die x-as) → f(x) toenemend oor daardie interval<br>
              • f'(x) &lt; 0 (onder die x-as) → f(x) afnemend oor daardie interval<br>
              • Draaipunt van f'(x) self → buigpunt van f(x)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>f(x) = x³ − 3x² het stilstandspunte by x = 0 en x = 2 (uit f'(x) = 3x² − 6x = 0).<br>
            f(0) = 0 (plaaslike maksimum, aangesien f''(0) = −6 &lt; 0)<br>
            f(2) = 8 − 12 = −4 (plaaslike minimum, aangesien f''(2) = 6 &gt; 0)<br>
            Dus is f toenemend op x &lt; 0, afnemend op 0 &lt; x &lt; 2, weer toenemend op x &gt; 2.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Sketskontrolelys</div>
            <p>
              1. Vorm uit die teken van a (leidende koëffisiënt)<br>
              2. Afsnitte (x en y)<br>
              3. Draaipunte met hul aard<br>
              4. Buigpunt<br>
              5. Gladde kurwe deur al die kenmerke, met inagneming van toenemende/afnemende intervalle
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Toenemend-/Afnemend-Interval-Vinder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer f(x) = ax³+bx²+cx+d in — sien die intervalle waar f toenemend of afnemend is.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c6t4a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g12c6t4b" type="number" value="-3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g12c6t4c" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d</div><input id="g12c6t4d" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c6t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind intervalle</button>
            </div>
            <div id="g12c6t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c6t4a'),b=gv('g12c6t4b'),c=gv('g12c6t4c'),d=gv('g12c6t4d');
                const out=document.getElementById('g12c6t4Out');
                if([a,b,c,d].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer kubieke koëffisiënte in (a ≠ 0).</span>';return;}
                const f=x=>a*x*x*x+b*x*x+c*x+d;
                const disc=4*b*b-4*3*a*c;
                let html='<span style="color:rgba(221,225,240,0.50);">f\'(x) = '+(3*a)+'x² + '+(2*b)+'x + '+c+'</span><br>';
                if(disc<0){
                  html+='<span style="color:#fca5a5;">Geen reële draaipunte nie — f is '+(a>0?'altyd toenemend':'altyd afnemend')+'.</span>';
                } else {
                  const x1=(-2*b+Math.sqrt(disc))/(2*3*a),x2=(-2*b-Math.sqrt(disc))/(2*3*a);
                  const pts=[x1,x2].sort((p,q)=>p-q);
                  const lo=f4(pts[0]),hi=f4(pts[1]);
                  if(a>0){
                    html+='<span style="color:#6ee7b7;">Toenemend: x &lt; '+lo+'  of  x &gt; '+hi+'</span><br>';
                    html+='<span style="color:#fcd34d;">Afnemend: '+lo+' &lt; x &lt; '+hi+'</span>';
                  } else {
                    html+='<span style="color:#fcd34d;">Afnemend: x &lt; '+lo+'  of  x &gt; '+hi+'</span><br>';
                    html+='<span style="color:#6ee7b7;">Toenemend: '+lo+' &lt; x &lt; '+hi+'</span>';
                  }
                }
                out.innerHTML=html;
              }
              ['g12c6t4a','g12c6t4b','g12c6t4c','g12c6t4d'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c6t4Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "f(x) = x³ − 3x² + 4 het 'n plaaslike maksimum by x = 0. Oor watter interval is f toenemend?", options: ["x &lt; 0", "0 &lt; x &lt; 2", "x &gt; 2", "Beide A en C"], answer: 3, topic: "Kubieke grafieke: volledige ontleding & interpretasie" },
        { type: "mc", text: "Op die grafiek van f'(x), stem 'n x-afsnit ooreen met watter kenmerk van f(x)?", options: ["'n y-afsnit", "'n Draaipunt", "'n Asimptoot", "Slegs 'n buigpunt"], answer: 1, topic: "Kubieke grafieke: volledige ontleding & interpretasie" },
        { type: "mc", text: "As f'(x) &gt; 0 vir alle x &lt; 1 en f'(x) &lt; 0 vir alle x &gt; 1, dan het f by x = 1 'n:", options: ["Plaaslike minimum", "Plaaslike maksimum", "Buigpunt", "x-afsnit"], answer: 1, topic: "Kubieke grafieke: volledige ontleding & interpretasie" },
        { type: "input", text: "f(x) = x³ − 12x. Bepaal die x-waarde(s) waar f 'n plaaslike minimum het (gee die positiewe waarde).", answer: "2", topic: "Kubieke grafieke: volledige ontleding & interpretasie" },
        { type: "mc", text: "'n Kubieke met a &gt; 0 het draaipunte by x = −1 (maks) en x = 3 (min). f is afnemend op:", options: ["x &lt; −1", "−1 &lt; x &lt; 3", "x &gt; 3", "Alle reële x"], answer: 1, topic: "Kubieke grafieke: volledige ontleding & interpretasie" },
        { type: "input", text: "'n Kubieke funksie f het afgeleide f'(x) = 6x² − 6x − 36. Bepaal die positiewe x-koördinaat van sy stilstandspunt.", answer: "3", topic: "Kubieke grafieke: volledige ontleding & interpretasie" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 6 Werkboek — Differensiaalrekene",
    questions: [
      { number: 1, text: "Bepaal f'(x) vanuit eerste beginsels vir f(x) = 2x² − 3.", parts: [
        { label: "a", text: "Skryf die definisie van f'(x) neer.", marks: 1 },
        { label: "b", text: "Bepaal f(x+h) en vereenvoudig f(x+h) − f(x).", marks: 3 },
        { label: "c", text: "Bepaal die limiet soos h → 0.", marks: 2 }
      ]},
      { number: 2, text: "Differensieer die volgende (vereenvoudig eers waar nodig):", parts: [
        { label: "a", text: "f(x) = 3x⁵ − 4x³ + 7x − 2", marks: 2 },
        { label: "b", text: "g(x) = (x² − 1)/x", marks: 3 },
        { label: "c", text: "h(x) = (x + 2)²(x − 1)", marks: 4 }
      ]},
      { number: 3, text: "f(x) = x³ − 3x² − 9x + 27", parts: [
        { label: "a", text: "Bepaal alle afsnitte.", marks: 4 },
        { label: "b", text: "Bepaal die koördinate van die draaipunte en bepaal hul aard.", marks: 5 },
        { label: "c", text: "Bepaal die buigpunt.", marks: 2 },
        { label: "d", text: "Skets die kurwe.", marks: 3 }
      ]},
      { number: 4, text: "'n Boer het 120 m heining om 'n reghoekige area teen 'n reguit muur toe te maak (die muur vorm een kant).", parts: [
        { label: "a", text: "Skryf die oppervlakte A in terme van x (breedte loodreg op die muur).", marks: 2 },
        { label: "b", text: "Bepaal die afmetings wat A maksimeer.", marks: 4 },
        { label: "c", text: "Bepaal die maksimum oppervlakte.", marks: 1 }
      ]},
      { number: 5, text: "Die tabel hieronder gee waardes van f'(x), die afgeleide van 'n kubieke funksie f(x), by verskeie x-waardes:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>x</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>f'(x)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>36</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>15</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−9</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−12</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>−9</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>0</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>15</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>36</td></tr></table>", parts: [
        { label: "a", text: "Gebruik die tabel om die x-waardes van die stilstandspunte (draaipunte) van f(x) te identifiseer.", marks: 2 },
        { label: "b", text: "Gee die interval(le) waar f(x) toenemend is, gebaseer op die teken van f'(x) in die tabel.", marks: 3 },
        { label: "c", text: "Gegewe dat f'(x) = 3x² − 6x − 9, bevestig jou antwoord op (a) algebraïes deur f'(x) = 0 op te los.", marks: 3 }
      ]}
    ],
    answers: {
      1: { a: "f'(x)=lim[h→0][f(x+h)−f(x)]/h", b: "f(x+h)=2(x+h)²−3=2x²+4xh+2h²−3; verskil=4xh+2h²", c: "lim=(4x+2h)→4x; f'(x)=4x" },
      2: { a: "15x⁴−12x²+7", b: "g=x−x⁻¹→g'=1+x⁻²=1+1/x²", c: "h=(x²+4x+4)(x−1)=x³+3x²−4→h'=3x²+6x" },
      3: { a: "y-afsnit: (0,27). x-afsnitte: f(3)=27−27−27+27=0, dus is (x−3) 'n faktor; deling gee f(x)=(x−3)(x²−9)=(x−3)²(x+3). x-afsnitte by x=3 (dubbele wortel — kurwe raak die x-as) en x=−3 (kurwe sny die x-as)", b: "f'=3x²−6x−9=3(x²−2x−3)=3(x−3)(x+1)=0→x=3,x=−1; f(3)=0(min,f''=12>0); f(−1)=32(maks,f''=−12<0)", c: "f''=6x−6=0→x=1; f(1)=16; buigpunt (1,16)", d: "Stygende kubieke, maks(−1,32), min(3,0), sny die x-as by −3 en raak dit by 3" },
      4: { a: "2x+y=120→y=120−2x; A=x(120−2x)=120x−2x²", b: "A'=120−4x=0→x=30m; y=60m", c: "A=30×60=1800 m²" },
      5: {
        a: "f'(x) = 0 by x = −1 en x = 3 (die tabel wys f'(x) wat by hierdie x-waardes deur nul gaan)",
        b: "f'(x) &gt; 0 vir x &lt; −1 en vir x &gt; 3, dus is f(x) toenemend op x &lt; −1 en x &gt; 3",
        c: "3x²−6x−9=0 → x²−2x−3=0 → (x−3)(x+1)=0 → x=3 of x=−1, wat (a) bevestig"
      }
    }
  }
});
