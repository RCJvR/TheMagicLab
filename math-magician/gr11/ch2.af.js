// Math Magician — Graad 11, Hoofstuk 2
// Vergelykings en Ongelykhede

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 200,
      chapter: 2,
      name: "Voltooiing van die vierkant, formule & aard van wortels",
      fullName: "Voltooiing van die vierkant, kwadratiese formule, en aard van wortels",
      lesson: {
        heading: "Voltooiing van die vierkant, formule, en aard van wortels",
        sub: "Hoofstuk 2 · Onderwerp 1",
        body: `
          <p>Graad 11 stel twee nuwe oplossingsmetodes vir kwadratiese vergelykings bekend, asook 'n manier om wortels te klassifiseer <em>sonder om op te los</em>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Voltooiing van die vierkant</div>
            <p>
              Om <span class="math">ax² + bx + c = 0</span> op te los:<br>
              1. Deel deur a (as a ≠ 1)<br>
              2. Skuif c na die regterkant<br>
              3. Tel <span class="math">(b/2a)²</span> by albei kante<br>
              4. Skryf die linkerkant as 'n volkome vierkant<br>
              5. Los op vir x<br><br>
              Word ook gebruik om 'n kwadratiese uitdrukking in draaipuntvorm <span class="math">y = a(x−p)² + q</span> te skryf.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Die diskriminant en aard van wortels</div>
            <p>
              Vir <span class="math">ax² + bx + c = 0</span>, is die diskriminant <span class="math">Δ = b² − 4ac</span>.<br><br>
              <strong>Δ > 0:</strong> twee reële, ongelyke wortels<br>
              &nbsp;&nbsp;• As Δ 'n volkome vierkant is → twee rasionale wortels<br>
              &nbsp;&nbsp;• As Δ nie 'n volkome vierkant is nie → twee irrasionale wortels<br>
              <strong>Δ = 0:</strong> twee gelyke reële wortels ('n herhaalde wortel)<br>
              <strong>Δ < 0:</strong> geen reële wortels nie (wortels is nie-reëel)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Aard van wortels</div>
            <p><span class="math">2x² − 3x + 5 = 0</span><br>
            <span class="math">Δ = (−3)² − 4(2)(5) = 9 − 40 = −31 < 0</span><br>
            → Geen reële wortels nie.</p>
            <p><span class="math">x² − 6x + 9 = 0</span><br>
            <span class="math">Δ = 36 − 36 = 0</span><br>
            → Twee gelyke reële wortels (x = 3).</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Diskriminant- en Wortel-Klassifiseerder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer a, b, c in vir ax² + bx + c = 0 — kry Δ, die aard van die wortels, en die wortels self.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c2a" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c2b" type="number" value="-3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g11c2c" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Klassifiseer</button>
            </div>
            <div id="g11c2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function isPerfectSq(n){if(n<0)return false;const s=Math.round(Math.sqrt(n));return s*s===n;}
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const a=parseFloat(document.getElementById('g11c2a').value);
                const b=parseFloat(document.getElementById('g11c2b').value);
                const c=parseFloat(document.getElementById('g11c2c').value);
                const out=document.getElementById('g11c2Out');
                if([a,b,c].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (a ≠ 0).</span>';return;}
                const D=b*b-4*a*c;
                let nature;
                if(D<0) nature='Nie-reële wortels (geen werklike oplossing nie)';
                else if(D===0) nature='Twee gelyke reële wortels (herhaalde wortel)';
                else if(isPerfectSq(D)) nature='Twee rasionale, ongelyke reële wortels';
                else nature='Twee irrasionale, ongelyke reële wortels';
                let html='<span style="color:rgba(221,225,240,0.50);">Δ = b² − 4ac = ('+b+')² − 4('+a+')('+c+') = '+b*b+' − '+(4*a*c)+' = </span><span style="color:#fcd34d;">'+D+'</span><br>';
                html+='<span style="color:#6ee7b7;">'+nature+'</span><br>';
                if(D>=0){
                  const sq=Math.sqrt(D);
                  const x1=(-b+sq)/(2*a),x2=(-b-sq)/(2*a);
                  html+='<span style="color:rgba(221,225,240,0.50);">x = (−'+b+' ± √'+D+') / '+(2*a)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">x₁ = '+f(x1)+'</span>  <span style="color:#6ee7b7;">x₂ = '+f(x2)+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c2Btn').addEventListener('click',calc);
              ['g11c2a','g11c2b','g11c2c'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Δ klassifiseer wortels <em>sonder om op te los</em>. In eksamenvrae wat vra "vir watter waarde van k" — stel Δ gelyk aan die vereiste voorwaarde (= 0 vir gelyke wortels, ≥ 0 vir reële wortels) en los op vir k.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vir x² − 4x + 1 = 0, is die diskriminant:",
          options: ["12", "20", "−4", "8"],
          answer: 0,
          topic: "Voltooiing van die vierkant, formule & aard van wortels"
        },
        {
          type: "mc",
          text: "Δ = 25. Die wortels is:",
          options: ["Nie-reëel", "Gelyk", "Twee rasionaal ongelyk", "Twee irrasionaal ongelyk"],
          answer: 2,
          topic: "Voltooiing van die vierkant, formule & aard van wortels"
        },
        {
          type: "input",
          text: "Bepaal k as x² + kx + 9 = 0 gelyke wortels het. Gee die positiewe waarde.",
          answer: "6",
          topic: "Voltooiing van die vierkant, formule & aard van wortels"
        },
        {
          type: "mc",
          text: "Voltooi die vierkant: x² − 6x + 2 = 0 gee x =",
          options: ["3 ± √7", "3 ± √11", "−3 ± √7", "6 ± √7"],
          answer: 0,
          topic: "Voltooiing van die vierkant, formule & aard van wortels"
        },
        {
          type: "mc",
          text: "3x² + 5x − 2 = 0. Aard van die wortels?",
          options: ["Nie-reëel", "Gelyk", "Rasionaal ongelyk", "Irrasionaal ongelyk"],
          answer: 2,
          topic: "Voltooiing van die vierkant, formule & aard van wortels"
        },
        {
          type: "mc",
          text: "Vir watter waarde(s) van k het x² + (k − 2)x + 4 = 0 reële wortels?",
          options: ["k ≥ 6 of k ≤ −2", "−2 ≤ k ≤ 6", "k = 6 slegs", "k ≥ 6 slegs"],
          answer: 0,
          topic: "Voltooiing van die vierkant, formule & aard van wortels"
        },
        {
          type: "input",
          text: "Bepaal die positiewe waarde van p waarvoor px² − 4x + p = 0 (p ≠ 0) gelyke wortels het.",
          answer: "2",
          topic: "Voltooiing van die vierkant, formule & aard van wortels"
        }
      ]
    },
    {
      id: 201,
      chapter: 2,
      name: "Kwadratiese ongelykhede & gelyktydige vergelykings",
      fullName: "Kwadratiese ongelykhede en gelyktydige (lineêr-kwadratiese) vergelykings",
      lesson: {
        heading: "Kwadratiese ongelykhede en gelyktydige vergelykings",
        sub: "Hoofstuk 2 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Oplossing van kwadratiese ongelykhede</div>
            <p>
              <strong>Metode:</strong><br>
              1. Skuif alle terme na een kant → standaardvorm ax² + bx + c [teken] 0<br>
              2. Faktoriseer (of gebruik die formule om die wortels te vind)<br>
              3. Skets die parabool (of gebruik 'n tekentabel)<br>
              4. Lees af waar die parabool bo/onder die x-as is<br><br>
              <strong>Sleutelreël:</strong> Vir 'n a > 0 parabool:<br>
              ax² + bx + c < 0 → tussen die wortels<br>
              ax² + bx + c > 0 → buite die wortels
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op: x² − x − 6 < 0</div>
            <p>Faktoriseer: <span class="math">(x−3)(x+2) < 0</span><br>
            Wortels: x = 3 en x = −2<br>
            Die parabool open opwaarts → onder die x-as <em>tussen</em> die wortels<br>
            Oplossing: <span class="math">−2 < x < 3</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Gelyktydige vergelykings (een lineêr, een kwadraties)</div>
            <p>
              <strong>Metode: substitusie</strong><br>
              1. Druk een veranderlike uit die lineêre vergelyking uit.<br>
              2. Vervang in die kwadratiese vergelyking.<br>
              3. Los die kwadratiese vergelyking wat ontstaan op.<br>
              4. Vervang terug om albei veranderlikes te vind.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: y = x + 1 en y = x² − 3</div>
            <p>Vervang: <span class="math">x + 1 = x² − 3 → x² − x − 4 = 0</span><br>
            <span class="math">x = (1 ± √17)/2</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kwadratiese-Ongelykheid-Oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer a, b, c in vir ax² + bx + c — kies die ongelykheidsteken — kry die oplossingsversameling.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c2t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c2t2b" type="number" value="-1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g11c2t2c" type="number" value="-6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Teken</div>
                <select id="g11c2t2sign" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="lt">&lt; 0</option>
                  <option value="le">≤ 0</option>
                  <option value="gt">&gt; 0</option>
                  <option value="ge">≥ 0</option>
                </select>
              </div>
              <button id="g11c2t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g11c2t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const a=parseFloat(document.getElementById('g11c2t2a').value);
                const b=parseFloat(document.getElementById('g11c2t2b').value);
                const c=parseFloat(document.getElementById('g11c2t2c').value);
                const sign=document.getElementById('g11c2t2sign').value;
                const out=document.getElementById('g11c2t2Out');
                if([a,b,c].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (a ≠ 0).</span>';return;}
                const D=b*b-4*a*c;
                const strict=sign==='lt'||sign==='gt';
                const lookingBelow=sign==='lt'||sign==='le';
                let html='<span style="color:rgba(221,225,240,0.50);">Δ = '+D+'</span><br>';
                if(D<0){
                  // no real roots — parabola entirely above or below x-axis
                  const aboveAxis=a>0;
                  if((aboveAxis&&lookingBelow)||(!aboveAxis&&!lookingBelow)){html+='<span style="color:#6ee7b7;">Geen oplossing nie (die uitdrukking is altyd '+(aboveAxis?'positief':'negatief')+')</span>';}
                  else{html+='<span style="color:#6ee7b7;">Oplossing: x ∈ ℝ (alle reële getalle; uitdrukking voldoen altyd aan die voorwaarde)</span>';}
                  out.innerHTML=html; return;
                }
                if(D===0){
                  const r=-b/(2*a);
                  html+='<span style="color:rgba(221,225,240,0.50);">Dubbele wortel: x = '+f(r)+'</span><br>';
                  if(strict){html+='<span style="color:#6ee7b7;">'+((a>0&&lookingBelow)||(a<0&&!lookingBelow)?'Geen oplossing nie (streng ongelykheid, dubbele wortel)':'Oplossing: x ∈ ℝ, x ≠ '+f(r))+'</span>';}
                  else{html+='<span style="color:#6ee7b7;">Oplossing: x = '+f(r)+(lookingBelow?' slegs':' (alle x)')+'</span>';}
                  out.innerHTML=html; return;
                }
                const sq=Math.sqrt(D);
                const x1=(-b-sq)/(2*a),x2=(-b+sq)/(2*a);
                const lo=Math.min(x1,x2),hi=Math.max(x1,x2);
                const loBrk=strict?'(':'[', hiBrk=strict?')':']';
                html+='<span style="color:rgba(221,225,240,0.50);">Wortels: x = '+f(lo)+' en x = '+f(hi)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Die parabool open '+(a>0?'opwaarts (positief buite die wortels)':'afwaarts (positief tussen die wortels)')+'</span><br>';
                let sol;
                const between=loBrk+f(lo)+' ; '+f(hi)+hiBrk;
                const outside='x < '+f(lo)+' of x > '+f(hi);
                if(a>0){sol=lookingBelow?between:outside;}
                else{sol=lookingBelow?outside:between;}
                if(!strict&&a>0&&!lookingBelow){sol='x ≤ '+f(lo)+' of x ≥ '+f(hi);}
                else if(!strict&&a<0&&lookingBelow){sol='x ≤ '+f(lo)+' of x ≥ '+f(hi);}
                else if(!strict&&a>0&&lookingBelow){sol='['+f(lo)+' ; '+f(hi)+']';}
                else if(!strict&&a<0&&!lookingBelow){sol='['+f(lo)+' ; '+f(hi)+']';}
                html+='<span style="color:#6ee7b7;">Oplossing: '+sol+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c2t2Btn').addEventListener('click',calc);
              ['g11c2t2a','g11c2t2b','g11c2t2c'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir a > 0: die parabool duik <em>onder</em> die x-as <em>tussen</em> die wortels. Dus ax²+bx+c &lt; 0 → tussen die wortels, en &gt; 0 → buite die wortels.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Los op: x² − 5x + 6 > 0",
          options: ["2 < x < 3", "x < 2 of x > 3", "x > 3 slegs", "−3 < x < −2"],
          answer: 1,
          topic: "Kwadratiese ongelykhede & gelyktydige vergelykings"
        },
        {
          type: "mc",
          text: "Los op: (x + 1)(x − 4) ≤ 0",
          options: ["x ≤ −1 of x ≥ 4", "−1 ≤ x ≤ 4", "x < −1 of x > 4", "−4 ≤ x ≤ 1"],
          answer: 1,
          topic: "Kwadratiese ongelykhede & gelyktydige vergelykings"
        },
        {
          type: "mc",
          text: "Los gelyktydig op: y = 2x − 1 en y = x². Watter kwadratiese vergelyking ontstaan?",
          options: ["x² + 2x − 1 = 0", "x² − 2x + 1 = 0", "x² − 2x − 1 = 0", "x² + 2x + 1 = 0"],
          answer: 1,
          topic: "Kwadratiese ongelykhede & gelyktydige vergelykings"
        },
        {
          type: "mc",
          text: "Los op: 2x² + x − 3 ≥ 0",
          options: ["−3/2 ≤ x ≤ 1", "x ≤ −3/2 of x ≥ 1", "x ≤ 1 slegs", "x ≥ 1 slegs"],
          answer: 1,
          topic: "Kwadratiese ongelykhede & gelyktydige vergelykings"
        },
        {
          type: "input",
          text: "y = x + 3 en x² + y² = 29. Substitusie gee x² + (x+3)² = 29. Vermenigvuldig uit om 2x² + 6x + ? = 0 te kry (bepaal die konstante).",
          answer: "-20",
          altAnswers: ["−20"],
          topic: "Kwadratiese ongelykhede & gelyktydige vergelykings"
        },
        {
          type: "mc",
          text: "Los op vir x: x(x + 2) ≤ 3(2x − 1)",
          options: ["1 ≤ x ≤ 3", "x ≤ 1 of x ≥ 3", "−1 ≤ x ≤ 3", "x ≤ 3 slegs"],
          answer: 0,
          topic: "Kwadratiese ongelykhede & gelyktydige vergelykings"
        },
        {
          type: "mc",
          text: "Los gelyktydig op: y = x − 1 en x² + y² = 25. Wat is die twee oplossingspunte?",
          options: ["(4 ; 3) en (−3 ; −4)", "(4 ; 3) en (3 ; 4)", "(5 ; 4) en (−4 ; −5)", "(3 ; 2) en (−2 ; −3)"],
          answer: 0,
          topic: "Kwadratiese ongelykhede & gelyktydige vergelykings"
        }
      ]
    },
    {
      id: 202,
      chapter: 2,
      name: "Kwadratiese formule & afleiding",
      fullName: "Aflei en toepas van die kwadratiese formule, en die keuse van die beste oplossingsmetode",
      lesson: {
        heading: "Die kwadratiese formule en die keuse van 'n metode",
        sub: "Hoofstuk 2 · Onderwerp 3",
        body: `
          <p>Die kwadratiese formule word afgelei deur die vierkant te voltooi op die <strong>algemene</strong> kwadratiese vergelyking <span class="math">ax² + bx + c = 0</span> — dit werk vir elke kwadratiese vergelyking, selfs dié wat nie faktoriseer nie.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Aflei van die kwadratiese formule</div>
            <p>
              Begin met <span class="math">ax² + bx + c = 0</span> (a ≠ 0), deel deur a:<br>
              <span class="math">x² + (b/a)x = −c/a</span><br>
              Voltooi die vierkant (tel <span class="math">(b/2a)²</span> by albei kante):<br>
              <span class="math">(x + b/2a)² = (b² − 4ac)/4a²</span><br>
              Neem vierkantswortels en isoleer x:<br>
              <span class="math">x = (−b ± √(b² − 4ac)) / 2a</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op: 2x² − 5x − 3 = 0</div>
            <p>a = 2, b = −5, c = −3<br>
            <span class="math">x = (5 ± √(25 + 24)) / 4 = (5 ± 7)/4</span><br>
            <span class="math">x = 3</span> of <span class="math">x = −1/2</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Kies 'n metode</div>
            <p>
              • <strong>Faktorisering</strong> — vinnigste, gebruik eers as a, b, c klein heelgetalle is en dit maklik faktoriseer.<br>
              • <strong>Kwadratiese formule</strong> — werk altyd, gebruik wanneer faktorisering moeilik is of die wortels irrasionaal is.<br>
              • <strong>Voltooiing van die vierkant</strong> — nuttig wanneer jy draaipuntvorm nodig het, of die vergelyking reeds so opgestel is.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kwadratiese-Formule-Oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer a, b, c in — sien die volledige vervanging in die formule en albei wortels (of 'n boodskap as dit nie-reëel is).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g11c2t3a" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">b</div><input id="g11c2t3b" type="number" value="-5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">c</div><input id="g11c2t3c" type="number" value="-3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c2t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g11c2t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const a=parseFloat(document.getElementById('g11c2t3a').value);
                const b=parseFloat(document.getElementById('g11c2t3b').value);
                const c=parseFloat(document.getElementById('g11c2t3c').value);
                const out=document.getElementById('g11c2t3Out');
                if([a,b,c].some(isNaN)||a===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (a ≠ 0).</span>';return;}
                const D=b*b-4*a*c;
                let html='<span style="color:rgba(221,225,240,0.50);">x = (−('+b+') ± √(('+b+')² − 4('+a+')('+c+'))) / (2·'+a+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">x = ('+(-b)+' ± √'+D+') / '+(2*a)+'</span><br>';
                if(D<0){html+='<span style="color:#fca5a5;">Δ = '+D+' &lt; 0 → geen reële oplossings nie.</span>';out.innerHTML=html;return;}
                const sq=Math.sqrt(D);
                const x1=(-b+sq)/(2*a),x2=(-b-sq)/(2*a);
                html+='<span style="color:#6ee7b7;">x₁ = '+f(x1)+'</span>  <span style="color:#6ee7b7;">x₂ = '+f(x2)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c2t3Btn').addEventListener('click',calc);
              ['g11c2t3a','g11c2t3b','g11c2t3c'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die kwadratiese formule en die diskriminant kom van dieselfde afleiding — Δ = b² − 4ac is net die deel onder die vierkantswortelteken.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Deur die kwadratiese formule te gebruik, gee x² − 2x − 8 = 0:",
          options: ["x = 4 of x = −2", "x = 2 of x = −4", "x = −4 of x = −2", "x = 4 of x = 2"],
          answer: 0,
          topic: "Kwadratiese formule & afleiding"
        },
        {
          type: "mc",
          text: "Vir 3x² + x − 2 = 0, is die korrekte vervanging in die formule:",
          options: ["x = (−1 ± √(1+24))/6", "x = (1 ± √(1−24))/6", "x = (−1 ± √(1−24))/6", "x = (−1 ± √25)/3"],
          answer: 0,
          topic: "Kwadratiese formule & afleiding"
        },
        {
          type: "input",
          text: "Los 2x² + 3x − 5 = 0 op deur die formule te gebruik. Gee die positiewe wortel.",
          answer: "1",
          topic: "Kwadratiese formule & afleiding"
        },
        {
          type: "mc",
          text: "Om die vierkant te voltooi op ax² + bx + c = 0 lei daartoe dat watter term by albei kante getel word?",
          options: ["(b/2a)²", "b²/a", "(b/a)²", "4ac"],
          answer: 0,
          topic: "Kwadratiese formule & afleiding"
        },
        {
          type: "mc",
          text: "Watter metode is die doeltreffendste vir x² − 3x − 10 = 0?",
          options: ["Faktorisering: (x−5)(x+2)=0", "Slegs die kwadratiese formule", "Slegs voltooiing van die vierkant", "Slegs grafiek"],
          answer: 0,
          topic: "Kwadratiese formule & afleiding"
        },
        {
          type: "input",
          text: "Herrangskik in standaardvorm en los op deur die kwadratiese formule te gebruik: 3x² = 5x + 2. Gee die positiewe wortel.",
          answer: "2",
          topic: "Kwadratiese formule & afleiding"
        },
        {
          type: "mc",
          text: "Deur die vierkant te voltooi, is die draaipunt van y = 3x² − 12x + 7 by:",
          options: ["(2 ; −5)", "(2 ; 5)", "(−2 ; −5)", "(4 ; 7)"],
          answer: 0,
          topic: "Kwadratiese formule & afleiding"
        }
      ]
    },
    {
      id: 203,
      chapter: 2,
      name: "Oplossing van probleme met kwadratiese vergelykings",
      fullName: "Toepassing van kwadratiese vergelykings, ongelykhede, en gelyktydige stelsels op werklike-wêreld-probleme",
      lesson: {
        heading: "Oplossing van probleme met kwadratiese vergelykings",
        sub: "Hoofstuk 2 · Onderwerp 4",
        body: `
          <p>Baie werklike-wêreld-situasies — oppervlaktes, werktempo's, projektielbeweging — lei tot kwadratiese vergelykings. Die moeilikste deel is gewoonlik om die vergelyking <strong>op te stel</strong>, nie om dit op te los nie.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Algemene strategie vir woordprobleme</div>
            <p>
              1. Definieer 'n veranderlike (bv. laat x = een onbekende lengte/tyd/tempo).<br>
              2. Druk al die ander hoeveelhede in terme van x uit.<br>
              3. Gebruik die gegewe verhouding om 'n vergelyking te vorm (dikwels oppervlakte, produk, of 'n tempo/tyd-verhouding).<br>
              4. Los die kwadratiese vergelyking op.<br>
              5. <strong>Verwerp antwoorde wat nie sin maak nie</strong> binne konteks (bv. negatiewe lengtes of negatiewe tyd).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Omheiningsprobleem</div>
            <p>'n Boer het 12 m heining om 'n reghoekige gebied te omhein, met 'n bestaande muur as een kant. Laat die twee gelyke sye (loodreg op die muur) x meter wees.<br>
            Dan is die sy parallel aan die muur <span class="math">12 − 2x</span>.<br>
            Oppervlakte: <span class="math">A(x) = x(12 − 2x) = 12x − 2x²</span><br>
            Dit is 'n afwaartse parabool — maksimum oppervlakte kom voor by die draaipunt <span class="math">x = −b/2a = −12/(2×−2) = 3</span>.<br>
            Dus x = 3 m, en die ander sy = 12 − 6 = 6 m. Maksimum oppervlakte = 18 m².</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Werktempo-probleem</div>
            <p>Twee masjiene neem saam 2 uur 24 minute (= 12/5 h) om 'n taak te voltooi. Een masjien alleen neem 2 uur langer as die ander. Laat die vinniger masjien x uur alleen neem.<br>
            Tempovergelyking: <span class="math">1/x + 1/(x+2) = 5/12</span><br>
            Vermenigvuldig deur met 12x(x+2): <span class="math">12(x+2) + 12x = 5x(x+2)</span><br>
            <span class="math">24x + 24 = 5x² + 10x → 5x² − 14x − 24 = 0</span><br>
            Los op: <span class="math">x = 4</span> (verwerp die negatiewe wortel) → vinniger masjien: 4 h, stadiger: 6 h.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Omheining-/Maksimum-Oppervlakte-Verkenner</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die totale omheiningslengte in (een kant teen 'n muur) — sien die oppervlaktefunksie en die maksimum oppervlakte.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Totale omheining (m)</div><input id="g11c2t4L" type="number" value="12" min="1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c2t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind maksimum oppervlakte</button>
            </div>
            <div id="g11c2t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const L=parseFloat(document.getElementById('g11c2t4L').value);
                const out=document.getElementById('g11c2t4Out');
                if(isNaN(L)||L<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n positiewe omheiningslengte in.</span>";return;}
                // A(x) = x(L - 2x) = Lx - 2x^2, max at x = L/4
                const x=L/4;
                const other=L-2*x;
                const area=x*other;
                let html='<span style="color:rgba(221,225,240,0.50);">Laat die twee gelyke sye = x. Derde sy (parallel aan die muur) = '+L+' − 2x</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">A(x) = x('+L+' − 2x) = '+L+'x − 2x²</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Draaipunt by x = −b/2a = '+L+'/4 = '+f(x)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Gelyke sye = '+f(x)+' m, derde sy = '+f(other)+' m</span><br>';
                html+='<span style="color:#6ee7b7;">Maksimum oppervlakte = '+f(area)+' m²</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c2t4Btn').addEventListener('click',calc);
              document.getElementById('g11c2t4L').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>In werktempo-probleme verteenwoordig "1/x" die breukdeel van die taak wat per uur voltooi word deur 'n masjien/persoon wat x uur alleen neem. Gekombineerde tempo's tel op.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Reghoek het 'n lengte 3 m meer as sy wydte, en 'n oppervlakte van 40 m². As x die wydte is, watter vergelyking moet opgelos word?",
          options: ["x(x+3) = 40", "x² + 3 = 40", "2x + 3 = 40", "x(x−3) = 40"],
          answer: 0,
          topic: "Oplossing van probleme met kwadratiese vergelykings"
        },
        {
          type: "input",
          text: "Die produk van twee opeenvolgende positiewe heelgetalle is 132. Bepaal die kleinste heelgetal.",
          answer: "11",
          topic: "Oplossing van probleme met kwadratiese vergelykings"
        },
        {
          type: "mc",
          text: "'n Bal se hoogte is h(t) = −5t² + 20t (t in sekondes). Na hoeveel sekondes tref dit weer die grond (h = 0, t > 0)?",
          options: ["4", "2", "5", "20"],
          answer: 0,
          topic: "Oplossing van probleme met kwadratiese vergelykings"
        },
        {
          type: "mc",
          text: "Twee krane vul saam 'n tenk in 6 uur. Een kraan alleen neem 5 uur langer as die ander. As x = die tyd vir die vinniger kraan alleen, is die korrekte vergelyking:",
          options: ["1/x + 1/(x+5) = 1/6", "x + (x+5) = 6", "1/x − 1/(x+5) = 1/6", "x(x+5) = 6"],
          answer: 0,
          topic: "Oplossing van probleme met kwadratiese vergelykings"
        },
        {
          type: "input",
          text: "Met 20 m heining teen 'n muur (een kant oop, twee gelyke sye + een parallelle sy), bepaal die gelyke sylengte x wat die omhein oppervlakte maksimeer.",
          answer: "5",
          topic: "Oplossing van probleme met kwadratiese vergelykings"
        },
        {
          type: "mc",
          text: "Waarom moet albei wortels van 'n woordprobleem-kwadratiese vergelyking teen die konteks gekontroleer word?",
          options: ["Omdat negatiewe of nie-heelgetalwortels dalk nie fisies sin maak nie", "Omdat die diskriminant moontlik negatief kan wees", "Omdat faktorisering verkeerd kan wees", "Omdat kwadratiese vergelykings altyd twee geldige antwoorde het"],
          answer: 0,
          topic: "Oplossing van probleme met kwadratiese vergelykings"
        },
        {
          type: "input",
          text: "'n Minibus reis 300 km teen 'n konstante gemiddelde spoed. As die spoed 10 km/h vinniger was, sou die rit 1 uur minder geneem het. Bepaal die minibus se oorspronklike gemiddelde spoed (in km/h).",
          answer: "50",
          topic: "Oplossing van probleme met kwadratiese vergelykings"
        },
        {
          type: "input",
          text: "'n Reghoekige foto is 4 cm langer as wat dit wyd is. 'n Raam met 'n eenvormige wydte van 2 cm word daarom geplaas, en die ekstra oppervlakte wat deur die raam bedek word, is 96 cm². Bepaal die wydte van die foto (in cm).",
          answer: "8",
          topic: "Oplossing van probleme met kwadratiese vergelykings"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 2 Werkboek — Vergelykings en Ongelykhede",
    questions: [
      {
        number: 1,
        text: "Sonder om op te los, bepaal die aard van die wortels:",
        parts: [
          { label: "a", text: "x² + 4x + 5 = 0", marks: 2 },
          { label: "b", text: "4x² − 12x + 9 = 0", marks: 2 },
          { label: "c", text: "3x² − 5x − 2 = 0", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Los op deur die vierkant te voltooi:",
        parts: [
          { label: "a", text: "x² − 8x + 3 = 0 (los in wortelvorm)", marks: 4 },
          { label: "b", text: "2x² + 6x − 1 = 0 (los in wortelvorm)", marks: 5 }
        ]
      },
      {
        number: 3,
        text: "Bepaal die waarde(s) van k waarvoor die volgende die gegewe aard van wortels het:",
        parts: [
          { label: "a", text: "x² − kx + 4 = 0: gelyke wortels", marks: 3 },
          { label: "b", text: "kx² − 3x + 1 = 0: nie-reële wortels", marks: 4 }
        ]
      },
      {
        number: 4,
        text: "Los die volgende ongelykhede op en stel dit op 'n getallelyn voor:",
        parts: [
          { label: "a", text: "x² − 3x − 10 ≤ 0", marks: 4 },
          { label: "b", text: "−x² + x + 12 > 0", marks: 4 }
        ]
      },
      {
        number: 5,
        text: "Los gelyktydig op: y = 3 − x en y = x² − 5",
        parts: [
          { label: "a", text: "Skryf die kwadratiese vergelyking wat ontstaan.", marks: 2 },
          { label: "b", text: "Los op vir x en bepaal daarna y.", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Δ=16−20=−4<0 → nie-reële wortels",
        b: "Δ=144−144=0 → gelyke wortels",
        c: "Δ=25+24=49>0, volkome vierkant → rasionale ongelyke wortels"
      },
      2: {
        a: "x²−8x=−3 → (x−4)²=13 → x=4±√13",
        b: "x²+3x=½ → (x+3/2)²=½+9/4=11/4 → x=(−3±√11)/2"
      },
      3: {
        a: "Δ=k²−16=0 → k=±4",
        b: "Δ=9−4k<0 → k>9/4"
      },
      4: {
        a: "(x−5)(x+2)≤0 → −2≤x≤5",
        b: "−(x−4)(x+3)>0 → (x−4)(x+3)<0 → −3<x<4"
      },
      5: {
        a: "3−x=x²−5 → x²+x−8=0",
        b: "x=(−1±√33)/2; vervang terug om y te vind"
      }
    }
  }
});
