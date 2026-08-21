// Math Magician — Graad 11, Hoofstuk 4
// Analitiese Meetkunde

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 400,
      chapter: 4,
      name: "Vergelyking van 'n lyn & hellingshoek",
      fullName: "Vergelyking van 'n lyn en die hellingshoek",
      lesson: {
        heading: "Vergelyking van 'n lyn en hellingshoek",
        sub: "Hoofstuk 4 · Onderwerp 1",
        body: `
          <p>Graad 11 Analitiese Meetkunde brei Graad 10 uit om die <strong>hellingshoek</strong> en meer komplekse lynprobleme in te sluit.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Vorme van die vergelyking van 'n lyn</div>
            <p>
              <strong>Gradiënt-afsnit-vorm:</strong> <span class="math">y = mx + c</span><br>
              <strong>Punt-gradiënt-vorm:</strong> <span class="math">y − y₁ = m(x − x₁)</span><br>
              <strong>Twee-punt-vorm:</strong> <span class="math">(y − y₁)/(y₂ − y₁) = (x − x₁)/(x₂ − x₁)</span><br>
              <strong>Algemene vorm:</strong> <span class="math">ax + by + c = 0</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Hellingshoek (θ)</div>
            <p>
              Die <strong>hellingshoek</strong> is die hoek wat 'n lyn met die positiewe x-as maak, gemeet anti-kloksgewys, waar <span class="math">0° ≤ θ < 180°</span>.<br><br>
              <span class="math">tan θ = m</span> (waar m die gradiënt is)<br><br>
              As m > 0: skerp hoek (0° < θ < 90°)<br>
              As m < 0: stomp hoek (90° < θ < 180°)<br>
              As m = 0: θ = 0° (horisontale lyn)<br>
              Vertikale lyn: θ = 90° (ongedefinieerde gradiënt)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>Lyn y = 2x + 3: m = 2, dus tan θ = 2 → θ = tan⁻¹(2) ≈ 63,4°<br>
            Lyn y = −x + 1: m = −1, dus tan θ = −1 → verwysingshoek 45° → θ = 135°</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Lyn- &amp; Hellingshoek-Berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Vind die hellingshoek vanaf 'n gradiënt, of 'n gradiënt vanaf 'n hoek. Kry dan die lynvergelyking deur 'n punt.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gradiënt m</div><input id="g11c4m" type="number" value="2" step="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Punt x₁</div><input id="g11c4x1" type="number" value="0" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Punt y₁</div><input id="g11c4y1" type="number" value="3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g11c4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function calc(){
                const m=parseFloat(document.getElementById('g11c4m').value);
                const x1=parseFloat(document.getElementById('g11c4x1').value);
                const y1=parseFloat(document.getElementById('g11c4y1').value);
                const out=document.getElementById('g11c4Out');
                if([m,x1,y1].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in.</span>';return;}
                const rawTheta=Math.atan(m)*180/Math.PI;
                const theta=rawTheta<0?rawTheta+180:rawTheta;
                const c=y1-m*x1;
                const mPar=m;const mPerp=-1/m;
                let html='<span style="color:rgba(221,225,240,0.50);">tan θ = m = '+f(m)+' → θ = tan⁻¹('+f(m)+')'+(rawTheta<0?' + 180°':'')+'</span><br>';
                html+='<span style="color:#6ee7b7;">Hellingshoek θ = '+f(theta)+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Lyn deur ('+x1+'; '+y1+'): y − '+y1+' = '+f(m)+'(x − '+x1+')</span><br>';
                html+='<span style="color:#fcd34d;">y = '+f(m)+'x + '+f(c)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Parallelle gradiënt: </span><span style="color:#6ee7b7;">m∥ = '+f(mPar)+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Loodregte gradiënt: </span><span style="color:#6ee7b7;">m⊥ = '+f(mPerp)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c4Btn').addEventListener('click',calc);
              ['g11c4m','g11c4x1','g11c4y1'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer m < 0, gee tan⁻¹ 'n negatiewe hoek — tel 180° by om die korrekte hellingshoek in [0°; 180°) te kry. 'n Negatiewe gradiënt gee altyd 'n stomp hellingshoek.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Lyn het gradiënt 1. Sy hellingshoek is:",
          options: ["30°", "45°", "60°", "90°"],
          answer: 1,
          topic: "Vergelyking van 'n lyn & hellingshoek"
        },
        {
          type: "mc",
          text: "'n Lyn maak 'n hoek van 120° met die positiewe x-as. Sy gradiënt is:",
          options: ["√3", "−√3", "1/√3", "−1/√3"],
          answer: 1,
          topic: "Vergelyking van 'n lyn & hellingshoek"
        },
        {
          type: "input",
          text: "'n Lyn gaan deur (2; 5) met gradiënt 3. Skryf die vergelyking in die vorm y = mx + c. Wat is c?",
          answer: "-1",
          altAnswers: ["−1"],
          topic: "Vergelyking van 'n lyn & hellingshoek"
        },
        {
          type: "mc",
          text: "Die hellingshoek van y = −√3·x + 2 is:",
          options: ["60°", "120°", "−60°", "150°"],
          answer: 1,
          topic: "Vergelyking van 'n lyn & hellingshoek"
        },
        {
          type: "mc",
          text: "Die vergelyking van 'n lyn deur (−1; 4) en (3; 0) is:",
          options: ["y = x + 5", "y = −x + 3", "y = x − 3", "y = −x + 5"],
          answer: 1,
          topic: "Vergelyking van 'n lyn & hellingshoek"
        },
        {
          type: "mc",
          text: "'n Lyn het 'n hellingshoek van 150°. Die vergelyking van 'n lyn loodreg daarop, deur (0; 4), is:",
          options: ["y = √3x + 4", "y = −√3x + 4", "y = (1/√3)x + 4", "y = −(1/√3)x + 4"],
          answer: 0,
          topic: "Vergelyking van 'n lyn & hellingshoek"
        },
        {
          type: "input",
          text: "'n Lyn gaan deur A(−2; 1) met 'n hellingshoek van 135°. Vind die x-koördinaat waar hierdie lyn die x-as sny.",
          answer: "-1",
          altAnswers: ["−1"],
          topic: "Vergelyking van 'n lyn & hellingshoek"
        }
      ]
    },
    {
      id: 401,
      chapter: 4,
      name: "Parallelle, loodregte & komplekse probleme",
      fullName: "Parallelle lyne, loodregte lyne, en meerstap-analitiese meetkunde-probleme",
      lesson: {
        heading: "Parallelle, loodregte lyne, en komplekse probleme",
        sub: "Hoofstuk 4 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Parallelle en loodregte voorwaardes (opsomming + uitbreiding)</div>
            <p>
              <strong>Parallel:</strong> m₁ = m₂ (dieselfde gradiënt)<br>
              <strong>Loodreg:</strong> m₁ × m₂ = −1<br><br>
              Hoek tussen twee lyne met hellingshoeke θ₁ en θ₂:<br>
              <span class="math">tan α = |m₁ − m₂| / |1 + m₁m₂|</span><br>
              (waar α die skerp hoek tussen die lyne is)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Komplekse probleem</div>
            <p>Driehoek met A(1;3), B(5;1), C(3;5).<br>
            Vind die vergelyking van die mediaan vanaf A na die middelpunt M van BC.<br>
            M = ((5+3)/2 ; (1+5)/2) = (4; 3)<br>
            m_AM = (3−3)/(4−1) = 0/3 = 0<br>
            Lyn AM: y = 3 (horisontaal)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Belangrike konstruksies om te ken</div>
            <p>
              <strong>Mediaan:</strong> vanaf 'n hoekpunt na die middelpunt van die teenoorstaande sy<br>
              <strong>Hoogtelyn:</strong> vanaf 'n hoekpunt, loodreg op die teenoorstaande sy<br>
              <strong>Middelloodlyn:</strong> deur die middelpunt, loodreg op die lynstuk
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Driehoek-Lynkonstruksie-Instrument</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee punte in — kry die mediaan, hoogtelyn (vanaf 'n derde hoekpunt), of middelloodlyn.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g11c4t2perp" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Middelloodlyn</button>
              <button id="g11c4t2alt" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Hoogtelyn</button>
              <button id="g11c4t2med" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Mediaan</button>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P₁ (x₁;y₁)</div><input id="g11c4t2x1" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"> <input id="g11c4t2y1" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;margin-left:4px;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P₂ (x₂;y₂)</div><input id="g11c4t2x2" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"> <input id="g11c4t2y2" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;margin-left:4px;"></div>
              <div id="g11c4t2vPanel" style="display:none;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoekpunt V (x;y)</div><input id="g11c4t2vx" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"> <input id="g11c4t2vy" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;margin-left:4px;"></div>
              <button id="g11c4t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g11c4t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              let mode='perp';
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function setMode(m){
                mode=m;
                ['perp','alt','med'].forEach(id=>{
                  const b=document.getElementById('g11c4t2'+id);
                  b.style.cssText=id===m?'background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;':'background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;';
                });
                document.getElementById('g11c4t2vPanel').style.display=m==='alt'?'':'none';
                document.getElementById('g11c4t2Out').innerHTML='';
              }
              ['perp','alt','med'].forEach(id=>document.getElementById('g11c4t2'+id).addEventListener('click',()=>setMode(id)));
              document.getElementById('g11c4t2Btn').addEventListener('click',()=>{
                const x1=parseFloat(document.getElementById('g11c4t2x1').value),y1=parseFloat(document.getElementById('g11c4t2y1').value);
                const x2=parseFloat(document.getElementById('g11c4t2x2').value),y2=parseFloat(document.getElementById('g11c4t2y2').value);
                const out=document.getElementById('g11c4t2Out');
                if([x1,y1,x2,y2].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige koördinate in.</span>';return;}
                const mx=(x1+x2)/2,my=(y1+y2)/2;
                const mSeg=x2===x1?Infinity:(y2-y1)/(x2-x1);
                let html='';
                if(mode==='perp'){
                  const mPerp=mSeg===0?Infinity:-1/mSeg;
                  html='<span style="color:rgba(221,225,240,0.50);">Middelpunt M = ('+f(mx)+'; '+f(my)+')</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Gradiënt van lynstuk = '+f(mSeg)+'</span><br>';
                  if(mPerp===Infinity){html+='<span style="color:#6ee7b7;">Middelloodlyn: x = '+f(mx)+' (vertikale lyn)</span>';}
                  else{const c=my-mPerp*mx;html+='<span style="color:#6ee7b7;">Middelloodlyn: y = '+f(mPerp)+'x + '+f(c)+'</span>';}
                } else if(mode==='alt'){
                  const vx=parseFloat(document.getElementById('g11c4t2vx').value),vy=parseFloat(document.getElementById('g11c4t2vy').value);
                  if(isNaN(vx)||isNaN(vy)){out.innerHTML='<span style="color:#fca5a5;">Voer hoekpuntkoördinate in.</span>';return;}
                  const mAlt=mSeg===0?Infinity:-1/mSeg;
                  html='<span style="color:rgba(221,225,240,0.50);">Gradiënt van sy P₁P₂ = '+f(mSeg)+'</span><br>';
                  if(mAlt===Infinity){html+='<span style="color:#6ee7b7;">Hoogtelyn vanaf V: x = '+f(vx)+' (vertikaal)</span>';}
                  else{const c=vy-mAlt*vx;html+='<span style="color:#6ee7b7;">Hoogtelyn vanaf V('+vx+';'+vy+'): y = '+f(mAlt)+'x + '+f(c)+'</span>';}
                } else {
                  html='<span style="color:rgba(221,225,240,0.50);">Middelpunt M van P₁P₂ = ('+f(mx)+'; '+f(my)+')</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Die mediaan gaan van \'n hoekpunt na M. Voer \'n hoekpunt hieronder in om die lyn te kry:</span><br>';
                  const vx=parseFloat(document.getElementById('g11c4t2vx').value)||0,vy=parseFloat(document.getElementById('g11c4t2vy').value)||0;
                  const mMed=mx===vx?Infinity:(my-vy)/(mx-vx);
                  if(mMed===Infinity){html+='<span style="color:#6ee7b7;">Mediaan: x = '+f(vx)+'</span>';}
                  else{const c=my-mMed*mx;html+='<span style="color:#6ee7b7;">Mediaan: y = '+f(mMed)+'x + '+f(c)+'</span>';}
                }
                out.innerHTML=html;
              });
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die hoogtelyn vanaf hoekpunt V na sy P₁P₂ het gradiënt −1/m(P₁P₂) en gaan deur V. Die middelloodlyn het dieselfde gradiënt, maar gaan deur die <em>middelpunt</em> van P₁P₂.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Die hoogtelyn vanaf A(0; 4) na sy BC waar B(2; 0) en C(6; 2). Gradiënt van BC:",
          options: ["½", "2", "−2", "−½"],
          answer: 0,
          topic: "Parallelle, loodregte & komplekse probleme"
        },
        {
          type: "mc",
          text: "Twee lyne het gradiënte 3 en −⅓. Hulle is:",
          options: ["Parallel", "Loodreg", "Dieselfde", "Nie een van die twee nie"],
          answer: 1,
          topic: "Parallelle, loodregte & komplekse probleme"
        },
        {
          type: "input",
          text: "M(3; 1) is die middelpunt van AB. A is (−1; 3). Vind die x-koördinaat van B.",
          answer: "7",
          topic: "Parallelle, loodregte & komplekse probleme"
        },
        {
          type: "mc",
          text: "Die middelloodlyn van lynstuk PQ waar P(2;4) en Q(6;2) gaan deur die middelpunt:",
          options: ["(4; 3)", "(4; 2)", "(3; 4)", "(8; 6)"],
          answer: 0,
          topic: "Parallelle, loodregte & komplekse probleme"
        },
        {
          type: "mc",
          text: "'n Lyn is parallel aan y = 2x − 3 en gaan deur (1; 5). Sy y-afsnit is:",
          options: ["3", "7", "−3", "1"],
          answer: 0,
          topic: "Parallelle, loodregte & komplekse probleme"
        },
        {
          type: "mc",
          text: "△ABC het A(−3; 2), B(5; −2), C(1; 6). Die vergelyking van die middelloodlyn van AB is:",
          options: ["y = 2x − 2", "y = 2x + 2", "y = −½x + 2", "y = −2x + 2"],
          answer: 0,
          topic: "Parallelle, loodregte & komplekse probleme"
        },
        {
          type: "input",
          text: "△ABC het A(−1; −2), B(3; 6), C(5; 5). Bereken die gradiënte van BA en BC, en gee dus die waarde van m_BA × m_BC (dit toon of hoek B = 90°).",
          answer: "-1",
          altAnswers: ["−1"],
          topic: "Parallelle, loodregte & komplekse probleme"
        }
      ]
    },
    {
      id: 402,
      chapter: 4,
      name: "Hoek tussen twee lyne",
      fullName: "Vind die hoek tussen twee lyne deur hul hellingshoeke te gebruik",
      lesson: {
        heading: "Hoek tussen twee lyne",
        sub: "Hoofstuk 4 · Onderwerp 3",
        body: `
          <p>'n Algemene CAPS-styl vraag gee drie punte wat 'n driehoek vorm en vra vir die grootte van 'n hoek by een hoekpunt — dit word gevind deur die hellingshoeke van die twee lyne wat daar ontmoet, te gebruik.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Metode: hoek tussen twee lyne by 'n gemeenskaplike punt</div>
            <p>
              1. Vind die gradiënt van elke lyn wat by die hoekpunt ontmoet.<br>
              2. Vind die hellingshoek van elke lyn: <span class="math">tan θ = m</span>.<br>
              3. Die hoek tussen die lyne (binnehoek van die driehoek) is die <strong>verskil</strong> tussen die twee hellingshoeke — neem die positiewe verskil, en as dit 180° oorskry, gebruik 180° minus daardie verskil om die hoek werklik binne die driehoek te kry.<br><br>
              Alternatiewe direkte formule vir die skerp hoek tussen twee lyne:<br>
              <span class="math">tan α = |m₁ − m₂| / |1 + m₁m₂|</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>A(2; 5), B(−3; −4), C(4; −2). Vind <strong>Ĉ</strong> = die hoek by C in △ABC (hoek ACB).<br>
            <span class="math">m_CA = (5−(−2))/(2−4) = 7/(−2) = −3,5</span> → θ₁ = tan⁻¹(−3,5) + 180° ≈ 105,9°<br>
            <span class="math">m_CB = (−4−(−2))/(−3−4) = −2/−7 ≈ 0,286</span> → θ₂ = tan⁻¹(0,286) ≈ 16,0°<br>
            Hoek ACB = θ₁ − θ₂ ≈ 105,9° − 16,0° = 89,9°</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Skets eers</div>
            <p>Maak altyd 'n rowwe skets. Die hoek wat jy soek, is die een wat fisies <em>binne</em> die driehoek by daardie hoekpunt is — dit help jou besluit of jy die twee hellingshoeke moet optel of aftrek, en vang tekenfoute op.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Hoek-Tussen-Twee-Lyne-Berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee gradiënte in — kry elke hellingshoek en die skerp hoek tussen die lyne.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gradiënt m₁</div><input id="g11c4t3m1" type="number" value="-3.5" step="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gradiënt m₂</div><input id="g11c4t3m2" type="number" value="0.286" step="0.001" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c4t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g11c4t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(2)).toString();}
              function incl(m){const r=Math.atan(m)*180/Math.PI;return r<0?r+180:r;}
              function calc(){
                const m1=parseFloat(document.getElementById('g11c4t3m1').value);
                const m2=parseFloat(document.getElementById('g11c4t3m2').value);
                const out=document.getElementById('g11c4t3Out');
                if([m1,m2].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige gradiënte in.</span>';return;}
                const t1=incl(m1),t2=incl(m2);
                const diff=Math.abs(t1-t2);
                const interior=diff>90?180-diff:diff;
                const acuteFormula=Math.atan(Math.abs((m1-m2)/(1+m1*m2)))*180/Math.PI;
                let html='<span style="color:rgba(221,225,240,0.50);">θ₁ = tan⁻¹('+f(m1)+')'+(m1<0?' + 180°':'')+' = '+f(t1)+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">θ₂ = tan⁻¹('+f(m2)+')'+(m2<0?' + 180°':'')+' = '+f(t2)+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Verskil |θ₁ − θ₂| = '+f(diff)+'°</span><br>';
                html+='<span style="color:#6ee7b7;">Hoek tussen die lyne ≈ '+f(interior)+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Kontroleer via tan α = |m₁−m₂|/|1+m₁m₂| → α ≈ '+f(acuteFormula)+'° (skerp hoek tussen lyne)</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c4t3Btn').addEventListener('click',calc);
              ['g11c4t3m1','g11c4t3m2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              calc();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>As albei lyne positiewe gradiënte het, trek die hellingshoeke direk van mekaar af. As een gradiënt negatief is, is sy hellingshoek stomp — die binnehoek van 'n driehoek is gewoonlik die verskil tussen die twee hellingshoeke.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Lyn 1 het hellingshoek 40°, lyn 2 het hellingshoek 110°. Die hoek tussen hulle is:",
          options: ["70°", "150°", "40°", "110°"],
          answer: 0,
          topic: "Hoek tussen twee lyne"
        },
        {
          type: "mc",
          text: "'n Lyn het gradiënt 1 (θ₁ = 45°) en 'n ander het gradiënt −1 (θ₂ = 135°). Die hoek tussen hulle is:",
          options: ["90°", "180°", "45°", "135°"],
          answer: 0,
          topic: "Hoek tussen twee lyne"
        },
        {
          type: "input",
          text: "A(0;0), B(4;0), C(2;2). Vind die grootte van hoek B (hoek ABC), tot die naaste graad. (Wenk: vind die gradiënte van BA en BC, dan hul hellingshoeke.)",
          answer: "45",
          topic: "Hoek tussen twee lyne"
        },
        {
          type: "mc",
          text: "Deur tan α = |m₁ − m₂|/|1 + m₁m₂| te gebruik met m₁ = 2 en m₂ = 3, is tan α gelyk aan:",
          options: ["1/7", "5", "1", "7"],
          answer: 0,
          topic: "Hoek tussen twee lyne"
        },
        {
          type: "mc",
          text: "Twee lyne is loodreg. Wat is die hoek tussen hulle?",
          options: ["90°", "0°", "180°", "Kan nie bepaal word nie"],
          answer: 0,
          topic: "Hoek tussen twee lyne"
        },
        {
          type: "input",
          text: "Lyn 1 gaan deur (1;2) en (4;8). Lyn 2 gaan deur (0;5) en (3;−1). Vind die hoek tussen die twee lyne, tot die naaste graad.",
          answer: "53",
          topic: "Hoek tussen twee lyne"
        },
        {
          type: "input",
          text: "Driehoek PQR het P(0;0), Q(6;0), R(2;4). Vind die grootte van hoek QPR, tot die naaste graad.",
          answer: "63",
          topic: "Hoek tussen twee lyne"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 4 Werkboek — Analitiese Meetkunde",
    questions: [
      {
        number: 1,
        text: "Lyn ℓ het vergelyking 3x − 2y + 6 = 0.",
        parts: [
          { label: "a", text: "Skryf in gradiënt-afsnit-vorm.", marks: 2 },
          { label: "b", text: "Gee die gradiënt en y-afsnit.", marks: 2 },
          { label: "c", text: "Vind die hellingshoek (tot 1 desimale plek).", marks: 2 },
          { label: "d", text: "Skryf die vergelyking van 'n lyn parallel aan ℓ deur (4; −1).", marks: 3 },
          { label: "e", text: "Skryf die vergelyking van 'n lyn loodreg op ℓ deur (0; 0).", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "A(−2; 1), B(4; 5), C(6; −1) is hoekpunte van △ABC.",
        parts: [
          { label: "a", text: "Vind die middelpunt M van BC.", marks: 1 },
          { label: "b", text: "Vind die vergelyking van die mediaan AM.", marks: 3 },
          { label: "c", text: "Vind die vergelyking van die hoogtelyn vanaf B na AC.", marks: 4 },
          { label: "d", text: "Bereken die lengte van die mediaan AM (los jou antwoord in eenvoudigste wortelvorm).", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "y = (3/2)x + 3",
        b: "m = 3/2; c = 3",
        c: "θ = tan⁻¹(1.5) ≈ 56.3°",
        d: "y+1=(3/2)(x−4) → y=(3/2)x−7",
        e: "m_perp=−2/3; y=−(2/3)x"
      },
      2: {
        a: "M = (5; 2)",
        b: "m=(2−1)/(5−(−2))=1/7; y−1=(1/7)(x+2) → y=(1/7)x+9/7",
        c: "m_AC=(−1−1)/(6−(−2))=−1/4; m_alt=4; y−5=4(x−4) → y=4x−11",
        d: "AM = √[(5−(−2))² + (2−1)²] = √(49+1) = √50 = 5√2"
      }
    }
  }
});
