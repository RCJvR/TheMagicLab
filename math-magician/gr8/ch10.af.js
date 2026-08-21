// Math Magician — Grade 8, Chapter 10 data (Afrikaans)
// Meetkunde van 2D-vorms

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 1001,
      chapter: 10,
      name: "Meetkunde van driehoeke",
      fullName: "Die meetkunde van driehoeke",
      lesson: {
        heading: "Die meetkunde van driehoeke",
        sub: "Hoofstuk 10 · Onderwerp 1",
        body: `
          <p>Driehoeke is drie-sydige veelhoeke. Hulle hoeke en sye volg spesifieke reëls wat ons in staat stel om onbekende waardes te bereken.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Driehoek-hoekeienskappe</div>
            <p>
              <strong>Hoeksom:</strong> die drie binnehoeke van enige driehoek tel altyd op tot 180°.<br>
              <span class="math">â + b̂ + ĉ = 180°</span> <em>(som van hoeke in 'n driehoek)</em><br><br>
              <strong>Buitehoek:</strong> 'n buitehoek van 'n driehoek is gelyk aan die som van die twee nie-aangrensende binnehoeke.<br>
              <span class="math">buite-hoek â = b̂ + ĉ</span> <em>(buite-hoek van driehoek)</em><br><br>
              <strong>Tipes driehoeke volgens hoeke:</strong><br>
              &nbsp;&nbsp;• <strong>Skerphoekig:</strong> alle hoeke < 90°<br>
              &nbsp;&nbsp;• <strong>Reghoekig:</strong> een hoek = 90°<br>
              &nbsp;&nbsp;• <strong>Stomphoekig:</strong> een hoek > 90°<br><br>
              <strong>Tipes volgens sye:</strong><br>
              &nbsp;&nbsp;• <strong>Gelyksydig:</strong> 3 gelyke sye, 3 gelyke hoeke (60° elk)<br>
              &nbsp;&nbsp;• <strong>Gelykbenig:</strong> 2 gelyke sye, basishoeke gelyk<br>
              &nbsp;&nbsp;• <strong>Ongelyksydig:</strong> geen gelyke sye of hoeke nie
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Twee hoeke van 'n driehoek is 55° en 70°. Vind die derde: <span class="math">180° − 55° − 70° = 55°</span> <em>(∠ som, △)</em></span></div>
            <div class="example-step"><span class="step-num">2</span><span>'n Buitehoek is 110°. Een nie-aangrensende binnehoek is 48°. Vind die ander: <span class="math">110° − 48° = 62°</span> <em>(buite-∠ van △)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Gelykbenige △ met apekshoek 40°: basishoeke = <span class="math">(180° − 40°) ÷ 2 = 70°</span> elk.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Driehoek-hoekrekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Voer enige twee hoeke in en vind die derde (laat die onbekende as 0).</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">â =</span>
              <input id="triA" type="number" value="55" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">b̂ =</span>
              <input id="triB" type="number" value="70" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">ĉ =</span>
              <input id="triC" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="triBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Los op</button>
            </div>
            <div id="triOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function solve(){
              const a=parseFloat(document.getElementById('triA').value)||0;
              const b=parseFloat(document.getElementById('triB').value)||0;
              const c=parseFloat(document.getElementById('triC').value)||0;
              const el=document.getElementById('triOut');
              const zeros=[a,b,c].filter(x=>x===0).length;
              if(zeros===0){
                const sum=a+b+c;
                el.innerHTML=sum===180?'<span style="color:#6ee7b7;">✓ Geldige driehoek: '+a+'° + '+b+'° + '+c+'° = 180°</span>':'<span style="color:#fca5a5;">✗ Ongeldig: '+a+'° + '+b+'° + '+c+'° = '+sum+'° (moet 180° wees)</span>';
              } else if(zeros===1){
                const known=[a,b,c].filter(x=>x!==0);
                const missing=180-known[0]-known[1];
                if(missing<=0||missing>=180){el.innerHTML='<span style="color:#fca5a5;">Ongeldig — hoeke moet tussen 0° en 180° wees</span>';return;}
                const which=a===0?'â':b===0?'b̂':'ĉ';
                el.innerHTML='<span style="color:#6ee7b7;">'+which+' = 180° − '+known[0]+'° − '+known[1]+'° = <strong>'+missing+'°</strong></span><br><span style="opacity:0.5;">(som van hoeke in \'n driehoek)</span>';
              } else {
                el.innerHTML='<span style="color:#fca5a5;">Voer minstens twee hoeke in.</span>';
              }
            }
            document.getElementById('triBtn').addEventListener('click',solve);
            solve();
          })();
          </script>

          <div style="overflow-x:auto;margin:14px 0;">
            <svg viewBox="0 0 520 140" style="width:100%;max-width:520px;border-radius:8px;background:rgba(10,15,30,0.50);">
              <!-- Equilateral -->
              <text x="52" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">GELYKSYDIG</text>
              <polygon points="52,115 18,115 35,55" fill="rgba(99,102,241,0.15)" stroke="#6366f1" stroke-width="1.5"/>
              <text x="35" y="48" text-anchor="middle" font-size="8" fill="#a5b4fc" font-family="JetBrains Mono,monospace">60°</text>
              <text x="52" y="122" text-anchor="middle" font-size="8" fill="#a5b4fc" font-family="JetBrains Mono,monospace">60°</text>
              <text x="14" y="122" text-anchor="middle" font-size="8" fill="#a5b4fc" font-family="JetBrains Mono,monospace">60°</text>
              <text x="35" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">3 gelyke sye</text>
              <!-- Isosceles -->
              <text x="140" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">GELYKBENIG</text>
              <polygon points="140,55 112,115 168,115" fill="rgba(245,158,11,0.10)" stroke="#fbbf24" stroke-width="1.5"/>
              <text x="140" y="50" text-anchor="middle" font-size="8" fill="#fbbf24" font-family="JetBrains Mono,monospace">apeks</text>
              <text x="115" y="122" text-anchor="middle" font-size="8" fill="#fcd34d" font-family="JetBrains Mono,monospace">basis∠</text>
              <text x="165" y="122" text-anchor="middle" font-size="8" fill="#fcd34d" font-family="JetBrains Mono,monospace">basis∠</text>
              <text x="140" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">2 gelyke sye</text>
              <!-- Scalene -->
              <text x="244" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">ONGELYKSYDIG</text>
              <polygon points="218,115 248,58 278,115" fill="rgba(16,185,129,0.08)" stroke="#6ee7b7" stroke-width="1.5"/>
              <text x="248" y="53" text-anchor="middle" font-size="8" fill="#6ee7b7" font-family="JetBrains Mono,monospace">a</text>
              <text x="218" y="122" text-anchor="middle" font-size="8" fill="#6ee7b7" font-family="JetBrains Mono,monospace">b</text>
              <text x="278" y="122" text-anchor="middle" font-size="8" fill="#6ee7b7" font-family="JetBrains Mono,monospace">c</text>
              <text x="248" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">geen gelyke sye nie</text>
              <!-- Right-angled -->
              <text x="362" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">REGHOEKIG</text>
              <polygon points="322,115 322,55 402,115" fill="rgba(236,72,153,0.08)" stroke="#f9a8d4" stroke-width="1.5"/>
              <rect x="322" y="101" width="14" height="14" fill="none" stroke="#f9a8d4" stroke-width="1.2"/>
              <text x="316" y="50" font-size="8" fill="#f9a8d4" font-family="JetBrains Mono,monospace">90°</text>
              <text x="365" y="112" font-size="8" fill="#f9a8d4" font-family="JetBrains Mono,monospace">skuinssy</text>
              <text x="362" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">een 90°-hoek</text>
              <!-- Obtuse -->
              <text x="464" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">STOMPHOEKIG</text>
              <polygon points="428,115 466,68 500,115" fill="rgba(168,85,247,0.10)" stroke="#a78bfa" stroke-width="1.5"/>
              <path d="M428,115 m22,0 a22,22 0 0,0 -11,-20" fill="rgba(168,85,247,0.20)" stroke="none"/>
              <text x="458" y="64" text-anchor="middle" font-size="8" fill="#a78bfa" font-family="JetBrains Mono,monospace">apeks</text>
              <text x="437" y="112" font-size="8" fill="#a78bfa" font-family="JetBrains Mono,monospace">&gt;90°</text>
              <text x="464" y="132" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.35)" font-family="DM Sans,sans-serif">een &gt;90°-hoek</text>
            </svg>
          </div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Gee altyd die rede: <em>"som van hoeke in 'n driehoek"</em> of <em>"buite-hoek van 'n driehoek"</em>. Redes verdien punte.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Twee hoeke van 'n driehoek is 63° en 74°. Vind die derde hoek.", answer: "43", topic: "Driehoeke" },
        { type: "mc", text: "'n Buitehoek van 'n driehoek is 115°. Een nie-aangrensende binnehoek is 52°. Vind die ander.", options: ["53°", "63°", "65°", "75°"], answer: 1, topic: "Driehoeke" },
        { type: "input", text: "'n Gelykbenige driehoek het 'n apekshoek van 50°. Wat is elke basishoek?", answer: "65", topic: "Driehoeke" },
        { type: "mc", text: "Watter tipe driehoek het al sy hoeke gelyk aan 60°?", options: ["Gelykbenig", "Ongelyksydig", "Gelyksydig", "Reghoekig"], answer: 2, topic: "Driehoeke" },
        { type: "input", text: "In △ABC, â = 3x, b̂ = 2x, ĉ = x. Vind x.", answer: "30", topic: "Driehoeke" },
        { type: "input", text: "Die hoeke van 'n driehoek is in die verhouding 5 : 6 : 7. Vind die grootte van die kleinste hoek.", answer: "50", topic: "Driehoeke" },
        { type: "input", text: "'n Gelykbenige driehoek het elke basishoek presies twee keer die grootte van die apekshoek. Vind die grootte van die apekshoek.", answer: "36", topic: "Driehoeke" },
      ]
    },
    {
      id: 1002,
      chapter: 10,
      name: "Meetkunde van vierhoeke",
      fullName: "Die meetkunde van vierhoeke",
      lesson: {
        heading: "Die meetkunde van vierhoeke",
        sub: "Hoofstuk 10 · Onderwerp 2",
        body: `
          <p>'n <strong>Vierhoek</strong> is 'n vier-sydige veelhoek. Die binnehoeke tel altyd op tot 360°.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Eienskappe van vierhoeke</div>
            <p>
              <strong>Vierkant:</strong> 4 gelyke sye, 4 × 90°, diagonale gelyk en halveer mekaar by 90°.<br>
              <strong>Reghoek:</strong> opponerende sye gelyk, 4 × 90°, diagonale gelyk en halveer mekaar.<br>
              <strong>Ruit:</strong> 4 gelyke sye, opponerende hoeke gelyk, diagonale halveer mekaar by 90°.<br>
              <strong>Parallelogram:</strong> opponerende sye ewewydig en gelyk, opponerende hoeke gelyk, diagonale halveer mekaar.<br>
              <strong>Trapesium:</strong> een paar ewewydige sye.<br>
              <strong>Vlieër:</strong> twee pare aangrensende gelyke sye, een paar opponerende hoeke gelyk, diagonale loodreg.<br><br>
              <strong>Hoeksom:</strong> <span class="math">â + b̂ + ĉ + d̂ = 360°</span> <em>(som van ∠e in 'n vierhoek)</em>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>'n Parallelogram het een hoek van 65°. Aangrensende hoek = <span class="math">180° − 65° = 115°</span> <em>(mede-binne-∠e, // lyne)</em>. Opponerende hoeke: 65° en 115°.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Trapesium: hoeke is 3x, 2x, 90°, 90°. Los op: <span class="math">3x + 2x + 180° = 360° → 5x = 180° → x = 36°</span>.</span></div>
          </div>

          <div style="overflow-x:auto;margin:14px 0;">
            <svg viewBox="0 0 530 140" style="width:100%;max-width:530px;border-radius:8px;background:rgba(10,15,30,0.50);">
              <!-- Square -->
              <text x="44" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">VIERKANT</text>
              <rect x="18" y="25" width="52" height="52" fill="rgba(99,102,241,0.15)" stroke="#6366f1" stroke-width="1.5"/>
              <rect x="18" y="25" width="9" height="9" fill="none" stroke="#6ee7b7" stroke-width="1"/>
              <text x="44" y="92" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">4 gelyke sye, 4×90°</text>
              <!-- Rectangle -->
              <text x="136" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">REGHOEK</text>
              <rect x="96" y="32" width="80" height="45" fill="rgba(245,158,11,0.10)" stroke="#fbbf24" stroke-width="1.5"/>
              <rect x="96" y="32" width="9" height="9" fill="none" stroke="#6ee7b7" stroke-width="1"/>
              <text x="136" y="92" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">opp. sye gelyk, 4×90°</text>
              <!-- Parallelogram -->
              <text x="242" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">PARALLELOGRAM</text>
              <polygon points="200,77 216,32 284,32 268,77" fill="rgba(16,185,129,0.10)" stroke="#6ee7b7" stroke-width="1.5"/>
              <text x="242" y="92" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">opp. sye ∥ en gelyk</text>
              <!-- Rhombus -->
              <text x="356" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">RUIT</text>
              <polygon points="356,28 384,55 356,82 328,55" fill="rgba(236,72,153,0.10)" stroke="#f9a8d4" stroke-width="1.5"/>
              <line x1="356" y1="28" x2="356" y2="82" stroke="rgba(249,168,212,0.30)" stroke-width="0.8" stroke-dasharray="3,3"/>
              <line x1="328" y1="55" x2="384" y2="55" stroke="rgba(249,168,212,0.30)" stroke-width="0.8" stroke-dasharray="3,3"/>
              <text x="356" y="95" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">4 gelyke sye, diag. ⊥</text>
              <!-- Trapezium -->
              <text x="468" y="14" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.70)" font-family="Syne,sans-serif" font-weight="700">TRAPESIUM</text>
              <polygon points="440,77 452,32 484,32 510,77" fill="rgba(168,85,247,0.10)" stroke="#a78bfa" stroke-width="1.5"/>
              <text x="468" y="28" text-anchor="middle" font-size="8" fill="#a78bfa" font-family="JetBrains Mono,monospace">∥</text>
              <text x="475" y="84" text-anchor="middle" font-size="8" fill="#a78bfa" font-family="JetBrains Mono,monospace">∥</text>
              <text x="468" y="95" text-anchor="middle" font-size="7.5" fill="rgba(221,225,240,0.40)" font-family="DM Sans,sans-serif">een paar ∥ sye</text>
            </svg>
          </div>
<div class="tip-box"><span class="tip-icon">💡</span><span>In 'n parallelogram: mede-binnehoeke (dieselfde kant) is supplementêr (tel op tot 180°), en opponerende hoeke is gelyk. Dit is die twee sleutelhoekfeite.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Drie hoeke van 'n vierhoek is 85°, 110°, en 95°. Vind die vierde.", answer: "70", topic: "Vierhoeke" },
        { type: "mc", text: "'n Parallelogram het een hoek van 72°. Wat is die aangrensende hoek?", options: ["72°", "108°", "118°", "288°"], answer: 1, topic: "Vierhoeke" },
        { type: "mc", text: "Watter vierhoek het diagonale wat gelyk in lengte is EN mekaar by regte hoeke halveer?", options: ["Reghoek", "Ruit", "Vierkant", "Vlieër"], answer: 2, topic: "Vierhoeke" },
        { type: "input", text: "'n Ruit het een hoek van 54°. Wat is die opponerende hoek?", answer: "54", topic: "Vierhoeke" },
        { type: "mc", text: "Watter vorm het presies EEN paar ewewydige sye?", options: ["Parallelogram", "Ruit", "Trapesium", "Reghoek"], answer: 2, topic: "Vierhoeke" },
        { type: "input", text: "'n Vlieër het twee regte hoeke wat regoor mekaar is, en sy ander twee hoeke is x° en (x + 40)°. Vind x.", answer: "70", topic: "Vierhoeke" },
        { type: "input", text: "Vlieër ABCD het AB = AD en CB = CD, met diagonaal AC as sy simmetrie-as. In driehoek ABC, ∠BAC = 35° en ∠BCA = 55°. Bereken ∠ABC, en gebruik dan die vlieër se simmetrie om die grootte van ∠ADC te gee.", answer: "90", topic: "Vierhoeke" },
      ]
    },
    {
      id: 1003,
      chapter: 10,
      name: "Driehoeke en vierhoeke",
      fullName: "Oplos van probleme met driehoeke en vierhoeke",
      lesson: {
        heading: "Oplos van probleme met driehoeke en vierhoeke",
        sub: "Hoofstuk 10 · Onderwerp 3",
        body: `
          <p>Baie probleme kombineer driehoek- en vierhoek-eienskappe met reguitlyn-hoekreëls. Werk sistematies, benoem elke hoek en gee 'n rede by elke stap.</p>
          <div class="example-box">
            <div class="example-box-title">✏️ Veelstap-probleem</div>
            <div class="example-step"><span class="step-num">1</span><span>ABCD is 'n parallelogram. 'n Diagonaal AC word getrek. ∠DAC = 38° en ∠ACD = 57°. Vind ∠ACB.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>∠DAC = ∠BCA = 38° <em>(verwiss. binne-∠e; AD ∥ BC)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span>In △ACD: ∠ADC = 180° − 38° − 57° = 85° <em>(∠ som, △)</em></span></div>
            <div class="example-step"><span class="step-num">4</span><span>∠ABC = ∠ADC = 85° <em>(opp. ∠e van ∥gram)</em></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Strategie vir veelstap-meetkunde</div>
            <p>
              1. Merk alle gegewe hoeke op die diagram.<br>
              2. Identifiseer watter vorm- of lynverhouding by elke stap geld.<br>
              3. Skryf die berekening ÉN die rede.<br>
              4. Werk stap vir stap na die onbekende hoek toe.<br>
              5. Kontroleer: tel al die hoeke in elke vorm korrek op?
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer 'n diagonaal 'n parallelogram of ruit verdeel, kry jy twee driehoeke — en al die driehoek-hoekreëls geld binne elkeen.</span></div>
        `
      },
      questions: [
        { type: "input", text: "In parallelogram PQRS, ∠P = 4x + 10 en ∠Q = 2x + 20. Vind x.", answer: "25", topic: "Gemeng" },
        { type: "mc", text: "'n Diagonaal verdeel 'n reghoek in twee driehoeke. Watter tipe driehoeke is dit?", options: ["Gelyksydig", "Gelykbenig reghoekig", "Ongelyksydig", "Stomphoekig gelykbenig"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "In △ABC, ∠A = 50°. ABCD is 'n parallelogram en BD is 'n diagonaal. Vind ∠ABD as ∠ADB = 70°.", answer: "60", topic: "Gemeng" },
        { type: "mc", text: "In ruit ABCD met diagonaal AC, as ∠BAC = 34°, wat is ∠BCA?", options: ["34°", "56°", "68°", "112°"], answer: 0, topic: "Gemeng" },
        { type: "input", text: "Die hoeke van 'n vierhoek is in die verhouding 2:3:4:3. Vind die grootste hoek.", answer: "120", topic: "Gemeng" },
        { type: "input", text: "ABCD is 'n parallelogram met diagonaal AC getrek. ∠DAC = 42° en ∠ACD = 38°. Vind eers ∠ADC, gebruik dan die eienskappe van 'n parallelogram om ∠ABC te vind.", answer: "100", topic: "Gemeng" },
      ]
    },
    {
      id: 1004,
      chapter: 10,
      name: "Kongruente vorms",
      fullName: "Kongruente vorms",
      lesson: {
        heading: "Kongruente vorms",
        sub: "Hoofstuk 10 · Onderwerp 4",
        body: `
          <p><strong>Kongruente vorms</strong> is identies in grootte en vorm — een kan presies op die ander gekarteer word deur rotasie, spieëling, of translasie.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Kongruensie in driehoeke</div>
            <p>
              Twee driehoeke is kongruent as hulle een van hierdie vier voorwaardes bevredig:<br><br>
              <strong>SSS:</strong> al drie sye gelyk.<br>
              <strong>SHS:</strong> twee sye en die ingeslote hoek gelyk.<br>
              <strong>HHS (of HSH):</strong> twee hoeke en 'n ooreenstemmende sy gelyk.<br>
              <strong>RSS:</strong> regte hoek, skuinssy, en een sy gelyk.<br><br>
              Notasie: <span class="math">△ABC ≅ △DEF</span> — hoekpunte moet in ooreenstemmende volgorde gelys word.<br><br>
              Kongruente vorms het:<br>
              &nbsp;&nbsp;• Gelyke ooreenstemmende sye<br>
              &nbsp;&nbsp;• Gelyke ooreenstemmende hoeke<br>
              &nbsp;&nbsp;• Gelyke oppervlaktes en omtrekke
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Kongruensie identifiseer</div>
            <div class="example-step"><span class="step-num">1</span><span>△ABC: AB=5, BC=7, AC=6. △DEF: DE=5, EF=7, DF=6. Kongruent? Ja — SSS.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>△PQR: PQ=8, ∠Q=50°, QR=6. △XYZ: XY=8, ∠Y=50°, YZ=6. Kongruent? Ja — SHS.</span></div>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Kongruensievoorwaarde-verkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n kongruensievoorwaarde om 'n diagram en wat bekend is, te sien.</p>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
              <button class="cong-btn" data-c="SSS" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.15);color:#a5b4fc;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">SSS</button>
              <button class="cong-btn" data-c="SAS" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(245,158,11,0.30);background:rgba(245,158,11,0.08);color:#fbbf24;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">SHS</button>
              <button class="cong-btn" data-c="AAS" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(16,185,129,0.30);background:rgba(16,185,129,0.08);color:#6ee7b7;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">HHS</button>
              <button class="cong-btn" data-c="RHS" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(236,72,153,0.30);background:rgba(236,72,153,0.08);color:#f9a8d4;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">RSS</button>
            </div>
            <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
              <svg id="congSvg" viewBox="0 0 300 120" style="width:300px;max-width:100%;border-radius:8px;background:rgba(10,15,30,0.60);flex-shrink:0;"></svg>
              <div id="congDesc" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;flex:1;min-width:160px;"></div>
            </div>
          </div>
          <script>
          (function(){
            const COND = {
              SSS: {
                title: 'Side-Side-Side',
                color: '#a5b4fc',
                rule:  'Al 3 sye van een driehoek is gelyk aan al 3 sye van die ander.',
                marks: ['side','side','side'],
                desc: ['AB = DE (sy)', 'BC = EF (sy)', 'AC = DF (sy)'],
                draw: function(svg){
                  var h='';
                  // Two triangles side by side
                  h+=tri(20,100,80,20,140,100,'rgba(99,102,241,0.20)','#6366f1');
                  h+=tri(160,100,220,20,280,100,'rgba(99,102,241,0.20)','#6366f1');
                  // Side tick marks - double ticks on all sides
                  h+=ticks(20,100,140,100,2,'#a5b4fc')+ticks(20,100,80,20,2,'#a5b4fc')+ticks(140,100,80,20,2,'#a5b4fc');
                  h+=ticks(160,100,280,100,2,'#a5b4fc')+ticks(160,100,220,20,2,'#a5b4fc')+ticks(280,100,220,20,2,'#a5b4fc');
                  h+=labels(20,100,'A',80,20,'B',140,100,'C');
                  h+=labels(160,100,'D',220,20,'E',280,100,'F');
                  return h;
                }
              },
              SAS: {
                title: 'Side-Angle-Side',
                color: '#fbbf24',
                rule:  'Twee sye en die ingeslote hoek (tussen hulle) is gelyk.',
                marks: ['side','angle','side'],
                desc: ['AB = DE (sy)', '∠B = ∠E (ingeslote hoek)', 'BC = EF (sy)'],
                draw: function(svg){
                  var h='';
                  h+=tri(20,100,80,20,140,100,'rgba(245,158,11,0.12)','#fbbf24');
                  h+=tri(160,100,220,20,280,100,'rgba(245,158,11,0.12)','#fbbf24');
                  h+=ticks(20,100,80,20,1,'#fcd34d')+ticks(80,20,140,100,2,'#fcd34d');
                  h+=ticks(160,100,220,20,1,'#fcd34d')+ticks(220,20,280,100,2,'#fcd34d');
                  h+=arcMark(80,20,20,100,140,100,'rgba(245,158,11,0.30)','#fbbf24');
                  h+=arcMark(220,20,160,100,280,100,'rgba(245,158,11,0.30)','#fbbf24');
                  h+=labels(20,100,'A',80,20,'B',140,100,'C');
                  h+=labels(160,100,'D',220,20,'E',280,100,'F');
                  return h;
                }
              },
              AAS: {
                title: 'Angle-Angle-Side',
                color: '#6ee7b7',
                rule:  'Twee hoeke en \'n nie-ingeslote sy is gelyk.',
                marks: ['angle','angle','side'],
                desc: ['∠A = ∠D (hoek)', '∠B = ∠E (hoek)', 'BC = EF (nie-ingeslote sy)'],
                draw: function(svg){
                  var h='';
                  h+=tri(20,100,80,20,140,100,'rgba(16,185,129,0.10)','#6ee7b7');
                  h+=tri(160,100,220,20,280,100,'rgba(16,185,129,0.10)','#6ee7b7');
                  h+=ticks(80,20,140,100,2,'#6ee7b7');
                  h+=ticks(220,20,280,100,2,'#6ee7b7');
                  h+=arcMark(20,100,80,20,140,100,'rgba(16,185,129,0.25)','#6ee7b7');
                  h+=arcMark(80,20,20,100,140,100,'rgba(16,185,129,0.25)','#6ee7b7');
                  h+=arcMark(160,100,220,20,280,100,'rgba(16,185,129,0.25)','#6ee7b7');
                  h+=arcMark(220,20,160,100,280,100,'rgba(16,185,129,0.25)','#6ee7b7');
                  h+=labels(20,100,'A',80,20,'B',140,100,'C');
                  h+=labels(160,100,'D',220,20,'E',280,100,'F');
                  return h;
                }
              },
              RHS: {
                title: 'Right angle-Hypotenuse-Side',
                color: '#f9a8d4',
                rule:  'Regte hoek, skuinssy en een ander sy is gelyk. (Slegs reghoekige driehoeke)',
                marks: ['right','hyp','side'],
                desc: ['∠C = ∠F = 90° (regte hoek)', 'AB = DE (skuinssy)', 'BC = EF (sy)'],
                draw: function(svg){
                  var h='';
                  h+=tri(20,100,20,20,140,100,'rgba(236,72,153,0.10)','#f9a8d4');
                  h+=tri(160,100,160,20,280,100,'rgba(236,72,153,0.10)','#f9a8d4');
                  h+='<rect x="20" y="86" width="14" height="14" fill="none" stroke="#f9a8d4" stroke-width="1.2"/>';
                  h+='<rect x="160" y="86" width="14" height="14" fill="none" stroke="#f9a8d4" stroke-width="1.2"/>';
                  // Hypotenuse ticks (the diagonal = hyp)
                  h+=ticks(20,20,140,100,1,'#f9a8d4');
                  h+=ticks(160,20,280,100,1,'#f9a8d4');
                  // Other side
                  h+=ticks(20,100,140,100,2,'#f9a8d4');
                  h+=ticks(160,100,280,100,2,'#f9a8d4');
                  h+=labels(20,20,'A',140,100,'B',20,100,'C');
                  h+=labels(160,20,'D',280,100,'E',160,100,'F');
                  return h;
                }
              }
            };

            function tri(x1,y1,x2,y2,x3,y3,fill,stroke){
              return '<polygon points="'+x1+','+y1+' '+x2+','+y2+' '+x3+','+y3+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.5" stroke-linejoin="round"/>';
            }
            function labels(x1,y1,l1,x2,y2,l2,x3,y3,l3){
              function lbl(x,y,t){
                var ox= (x<50?-10: x>250?10:0), oy=(y<30?-8:y>90?12:0);
                return '<text x="'+(x+ox)+'" y="'+(y+oy)+'" text-anchor="middle" font-size="10" fill="rgba(221,225,240,0.60)" font-family="Syne,sans-serif" font-weight="700">'+t+'</text>';
              }
              return lbl(x1,y1,l1)+lbl(x2,y2,l2)+lbl(x3,y3,l3);
            }
            function ticks(x1,y1,x2,y2,n,col){
              var mx=(x1+x2)/2, my=(y1+y2)/2;
              var dx=x2-x1,dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy);
              var px=-dy/len*5, py=dx/len*5;
              var s='';
              var gap=4;
              for(var i=0;i<n;i++){
                var off=(i-(n-1)/2)*gap;
                var tx=mx+dx/len*off, ty=my+dy/len*off;
                s+='<line x1="'+(tx-px).toFixed(1)+'" y1="'+(ty-py).toFixed(1)+'" x2="'+(tx+px).toFixed(1)+'" y2="'+(ty+py).toFixed(1)+'" stroke="'+col+'" stroke-width="1.5"/>';
              }
              return s;
            }
            function arcMark(vx,vy,ax,ay,bx,by,fill,stroke){
              // Draw a small arc at vertex vx,vy between arms going to ax,ay and bx,by
              var r=14;
              var a1=Math.atan2(ay-vy,ax-vx), a2=Math.atan2(by-vy,bx-vx);
              var sx=vx+r*Math.cos(a1), sy=vy+r*Math.sin(a1);
              var ex=vx+r*Math.cos(a2), ey=vy+r*Math.sin(a2);
              // Determine sweep direction (use small arc)
              var da = a2-a1; if(da<0) da+=2*Math.PI; if(da>Math.PI) da-=2*Math.PI;
              var sweep = da>0?1:0;
              return '<path d="M '+vx+' '+vy+' L '+sx.toFixed(1)+' '+sy.toFixed(1)+' A '+r+' '+r+' 0 0 '+sweep+' '+ex.toFixed(1)+' '+ey.toFixed(1)+' Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="0.8"/>';
            }

            var current = 'SSS';
            function render(key){
              current = key;
              var c = COND[key];
              var svg = document.getElementById('congSvg');
              svg.innerHTML = c.draw();
              var el = document.getElementById('congDesc');
              el.innerHTML =
                '<div style="color:'+c.color+';font-weight:700;font-family:Syne,sans-serif;margin-bottom:4px;">'+key+' — '+c.title+'</div>'+
                c.desc.map(function(d){ return '<div style="color:rgba(221,225,240,0.70);">✓ '+d+'</div>'; }).join('')+
                '<div style="margin-top:8px;font-size:10.5px;color:rgba(221,225,240,0.40);">'+c.rule+'</div>';
            }

            document.getElementById('congSvg').closest('.def-box').addEventListener('click', function(e){
              var btn = e.target.closest('.cong-btn');
              if(btn){ render(btn.dataset.c); }
            });
            render('SSS');
          })();
          </script>
<div class="tip-box"><span class="tip-icon">💡</span><span>HHH is NIE 'n kongruensievoorwaarde nie — dit bewys slegs gelykvormigheid, nie kongruensie nie. Die driehoeke kan verskillende groottes hê.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Twee driehoeke het al drie sye gelyk. Watter kongruensievoorwaarde geld?", options: ["SHS", "HHS", "SSS", "RSS"], answer: 2, topic: "Kongruensie" },
        { type: "mc", text: "△ABC ≅ △PQR met AB = PQ en ∠A = ∠P en ∠B = ∠Q. Watter voorwaarde is dit?", options: ["SSS", "SHS", "HHS", "RSS"], answer: 2, topic: "Kongruensie" },
        { type: "input", text: "△ABC ≅ △DEF. As AB = 9 cm, wat is DE in cm?", answer: "9", topic: "Kongruensie" },
        { type: "mc", text: "Watter een is NIE 'n geldige driehoek-kongruensievoorwaarde nie?", options: ["SSS", "SHS", "HHH", "RSS"], answer: 2, topic: "Kongruensie" },
        { type: "mc", text: "Twee reghoekige driehoeke het gelyke skuinssye en een gelyke regsysy. Watter voorwaarde geld?", options: ["SSS", "SHS", "HHS", "RSS"], answer: 3, topic: "Kongruensie" },
        { type: "input", text: "In driehoeke ABC en DEF, AB = (3x − 2) cm en DE = (x + 8) cm is ooreenstemmende sye wat bekend is om gelyk te wees. Los op vir x, en gee dan die lengte van AB in cm.", answer: "13", topic: "Kongruensie" },
        { type: "input", text: "△ABC ≅ △DEF deur SSS, met AB = (2x + 3) cm wat ooreenstem met DE = (4x − 7) cm, en AC = (3x − 1) cm wat ooreenstem met DF = (2x + 4) cm. Gebruik die AB/DE-paar om vir x op te los.", answer: "5", topic: "Kongruensie" },
      ]
    },
    {
      id: 1005,
      chapter: 10,
      name: "Gelykvormige vorms",
      fullName: "Gelykvormige vorms",
      lesson: {
        heading: "Gelykvormige vorms",
        sub: "Hoofstuk 10 · Onderwerp 5",
        body: `
          <p><strong>Gelykvormige vorms</strong> het dieselfde vorm maar verskillende groottes. Ooreenstemmende hoeke is gelyk en ooreenstemmende sye is eweredig.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Eienskappe van gelykvormige figure</div>
            <p>
              As △ABC ∼ △DEF (gelykvormig), dan:<br>
              &nbsp;&nbsp;• ∠A = ∠D, ∠B = ∠E, ∠C = ∠F<br>
              &nbsp;&nbsp;• <span class="math">AB/DE = BC/EF = AC/DF = k</span> (skaalfaktor)<br><br>
              <strong>Skaalfaktor vind:</strong> deel enige ooreenstemmende sy-paar.<br>
              <strong>Onbekende sye vind:</strong> gebruik die verhouding <span class="math">AB/DE = BC/EF</span> en kruisvermenigvuldig.<br><br>
              <strong>Oppervlaktes van gelykvormige vorms:</strong> as skaalfaktor = k, dan is die oppervlakteverhouding = k².<br>
              <strong>Omtrekke:</strong> verhouding = k (dieselfde as sy-verhouding).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Onbekende sye vind</div>
            <div class="example-step"><span class="step-num">1</span><span>△ABC ∼ △DEF. AB = 6, DE = 9, BC = 8. Vind EF.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Skaalfaktor: <span class="math">k = 9/6 = 1.5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">EF = BC × k = 8 × 1.5 = 12</span></span></div>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Gelykvormige Vorms Skaalfaktor</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Verstel die skaalfaktor en sien albei driehoeke volgens skaal geteken. Voer enige twee sye in om die derde te vind.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:3px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;letter-spacing:0.06em;">Skaalfaktor k</label>
                <input id="simK" type="number" value="2" min="0.1" max="5" step="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;letter-spacing:0.06em;">Sy a (klein △)</label>
                <input id="simA" type="number" value="3" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;letter-spacing:0.06em;">Sy b (klein △)</label>
                <input id="simB" type="number" value="4" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;letter-spacing:0.06em;">Sy c (klein △)</label>
                <input id="simC" type="number" value="5" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start;">
              <svg id="simSvg" viewBox="0 0 300 140" style="width:300px;max-width:100%;border-radius:8px;background:rgba(10,15,30,0.60);flex-shrink:0;"></svg>
              <div id="simOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.1;flex:1;min-width:160px;"></div>
            </div>
          </div>
          <script>
          (function(){
            function fmt(n){ return parseFloat(n.toPrecision(4)).toString(); }

            function drawSim(a,b,c,k){
              var svg = document.getElementById('simSvg');
              // Draw a right triangle (a,b,c where c=hyp) or approximate triangle using law of cosines
              // Use a 3-4-5 style placement: put right angle at bottom-left
              // Scale both triangles to fit in viewBox 300x140
              // Small triangle: base=a, height=b (right triangle approximation)
              var maxSide = Math.max(a,b,c);
              var scale1 = 50 / maxSide;  // small triangle max dimension ~50px
              var scale2 = scale1 * k;
              // Cap scale2 so large triangle fits
              if(b*scale2 > 100) scale2 = 100/b;
              if(a*scale2 > 130) scale2 = 130/a;

              // Small triangle coords (right-angle at bottom-left)
              var s1x=15, s1y=125;
              var s1 = {
                A: [s1x, s1y],
                B: [s1x + a*scale1, s1y],
                C: [s1x, s1y - b*scale1]
              };
              // Large triangle (same shape, scaled by k)
              var s2x=155, s2y=130;
              var s2 = {
                A: [s2x, s2y],
                B: [s2x + a*scale2, s2y],
                C: [s2x, s2y - b*scale2]
              };

              function pt(p){ return p[0].toFixed(1)+','+p[1].toFixed(1); }
              function line(p1,p2,col,sw,dash){
                return '<line x1="'+p1[0].toFixed(1)+'" y1="'+p1[1].toFixed(1)+'" x2="'+p2[0].toFixed(1)+'" y2="'+p2[1].toFixed(1)+'" stroke="'+col+'" stroke-width="'+(sw||1.5)+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>';
              }
              function poly(pts,fill,stroke){
                return '<polygon points="'+pts.map(pt).join(' ')+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.5" stroke-linejoin="round"/>';
              }
              function txt2(x,y,t,col,size){
                return '<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" text-anchor="middle" font-size="'+(size||9)+'" fill="'+(col||'rgba(221,225,240,0.60)')+'" font-family="JetBrains Mono,monospace">'+t+'</text>';
              }

              var h = '';
              // Small triangle
              h += poly([s1.A,s1.B,s1.C],'rgba(99,102,241,0.15)','#6366f1');
              h += '<rect x="'+s1.A[0]+'" y="'+(s1.A[1]-10)+'" width="10" height="10" fill="none" stroke="#6366f1" stroke-width="1"/>';
              // Side labels small
              h += txt2((s1.A[0]+s1.B[0])/2, s1.A[1]+12, fmt(a), '#a5b4fc', 8.5);
              h += txt2(s1.A[0]-10, (s1.A[1]+s1.C[1])/2, fmt(b), '#a5b4fc', 8.5);
              h += txt2((s1.B[0]+s1.C[0])/2+8, (s1.B[1]+s1.C[1])/2, fmt(c), '#a5b4fc', 8.5);
              h += txt2((s1.A[0]+s1.B[0]+s1.C[0])/3, s1.A[1]-b*scale1*0.5, '△ABC', '#6366f1', 9);

              // Large triangle
              h += poly([s2.A,s2.B,s2.C],'rgba(245,158,11,0.12)','#fbbf24');
              h += '<rect x="'+s2.A[0]+'" y="'+(s2.A[1]-10)+'" width="10" height="10" fill="none" stroke="#fbbf24" stroke-width="1"/>';
              // Side labels large
              h += txt2((s2.A[0]+s2.B[0])/2, s2.A[1]+12, fmt(a*k), '#fcd34d', 8.5);
              h += txt2(s2.A[0]-14, (s2.A[1]+s2.C[1])/2, fmt(b*k), '#fcd34d', 8.5);
              h += txt2((s2.B[0]+s2.C[0])/2+10, (s2.B[1]+s2.C[1])/2, fmt(c*k), '#fcd34d', 8.5);
              h += txt2((s2.A[0]+s2.B[0]+s2.C[0])/3+5, s2.A[1]-b*scale2*0.5, '△DEF', '#fbbf24', 9);

              // Scale factor arrow
              var midY = 20;
              h += '<text x="150" y="18" text-anchor="middle" font-size="9" fill="rgba(110,231,183,0.70)" font-family="Syne,sans-serif" font-weight="700">k = '+fmt(k)+'</text>';

              svg.innerHTML = h;
            }

            function update(){
              var k = parseFloat(document.getElementById('simK').value)||2;
              var a = parseFloat(document.getElementById('simA').value)||3;
              var b = parseFloat(document.getElementById('simB').value)||4;
              var c = parseFloat(document.getElementById('simC').value)||5;
              if(k<=0||a<=0||b<=0||c<=0) return;

              drawSim(a,b,c,k);

              var el = document.getElementById('simOut');
              var areaRatio = k*k;
              el.innerHTML = [
                '<div style="color:#6ee7b7;font-weight:700;font-family:Syne,sans-serif;margin-bottom:4px;">Skaalfaktor k = '+fmt(k)+'</div>',
                '<div><span style="color:rgba(221,225,240,0.40);width:100px;display:inline-block;">△ABC sye:</span><span style="color:#a5b4fc;">'+fmt(a)+', '+fmt(b)+', '+fmt(c)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.40);width:100px;display:inline-block;">△DEF sye:</span><span style="color:#fcd34d;">'+fmt(a*k)+', '+fmt(b*k)+', '+fmt(c*k)+'</span></div>',
                '<div style="margin-top:6px;"><span style="color:rgba(221,225,240,0.40);width:100px;display:inline-block;">Omtrekverh.:</span><span style="color:#6ee7b7;">'+fmt(k)+' : 1</span></div>',
                '<div><span style="color:rgba(221,225,240,0.40);width:100px;display:inline-block;">Oppervlakteverh.:</span><span style="color:#6ee7b7;">'+fmt(areaRatio)+' : 1 (k²)</span></div>',
                '<div style="margin-top:6px;font-size:10px;color:rgba(221,225,240,0.35);">Alle hoeke bly dieselfde in gelykvormige vorms.</div>',
              ].join('');
            }

            ['simK','simA','simB','simC'].forEach(function(id){
              var el = document.getElementById(id);
              el.addEventListener('input', update);
              el.addEventListener('keydown', function(e){ if(e.key==='Enter') update(); });
            });
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Om te bewys dat driehoeke gelykvormig is, wys dat twee pare hoeke gelyk is (HH) — die derde paar is outomaties gelyk omdat hoeksomme albei 180° is.</span></div>
        `
      },
      questions: [
        { type: "input", text: "△ABC ∼ △DEF met skaalfaktor 2.5. As AB = 4 cm, vind DE in cm.", answer: "10", topic: "Gelykvormigheid" },
        { type: "mc", text: "Twee gelykvormige driehoeke het ooreenstemmende sye in verhouding 3:5. Wat is die verhouding van hul oppervlaktes?", options: ["3:5", "6:10", "9:25", "27:125"], answer: 2, topic: "Gelykvormigheid" },
        { type: "input", text: "△PQR ∼ △XYZ. PQ = 8, XY = 12, QR = 10. Vind YZ.", answer: "15", topic: "Gelykvormigheid" },
        { type: "mc", text: "Wat is die minimum voorwaarde om te bewys twee driehoeke is gelykvormig?", options: ["SSS", "Twee pare gelyke hoeke (HH)", "SHS", "Een paar gelyke sye"], answer: 1, topic: "Gelykvormigheid" },
        { type: "input", text: "Twee gelykvormige reghoeke het lengtes 6 cm en 9 cm. As die kleiner een 'n wydte van 4 cm het, vind die groter se wydte in cm.", answer: "6", topic: "Gelykvormigheid" },
        { type: "input", text: "Twee gelykvormige veelhoeke het 'n omtrekverhouding van 3 : 7. Die omtrek van die kleiner veelhoek is 18 cm. Bereken die omtrek van die groter veelhoek in cm.", answer: "42", topic: "Gelykvormigheid" },
        { type: "input", text: "Twee gelykvormige driehoeke het 'n oppervlakteverhouding van 4 : 25. Die kortste sy van die kleiner driehoek is 6 cm. Vind die lengte van die ooreenstemmende sy van die groter driehoek in cm.", answer: "15", topic: "Gelykvormigheid" },
      ]
    },
    {
      id: 1006,
      chapter: 10,
      name: "H10 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 10 — Eksamenfokus",
        sub: "Hoofstuk 10 · Hersiening",
        body: `
          <p>Eksamenvrae oor 2D-meetkunde toets hoekberekeninge, identifisering van vorm-eienskappe, en die bewys van kongruensie of gelykvormigheid. Gee altyd redes.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 10-opsomming</div>
            <p>
              ✅ Driehoek-hoeksom = 180°; buitehoek = som van nie-aangrensende binnehoeke<br>
              ✅ Vierhoek-hoeksom = 360°<br>
              ✅ Parallelogram: opp. sye ∥ en =, opp. ∠e =, mede-binne-∠e supplementêr<br>
              ✅ Kongruensie: SSS, SHS, HHS, RSS (NIE HHH nie)<br>
              ✅ Gelykvormigheid: gelyke hoeke + eweredige sye; skaalfaktor k; oppervlakteverhouding k²<br>
              ✅ Skryf altyd redes vir elke hoekstelling
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Kongruensie = dieselfde grootte ÉN vorm. Gelykvormigheid = dieselfde vorm, verskillende grootte. Moenie hulle in eksamenantwoorde verwar nie.</span></div>
        `
      },
      questions: [
        { type: "input", text: "In △ABC, ∠A = 2x, ∠B = 3x − 10, ∠C = x + 10. Vind x.", answer: "30", topic: "Gemeng" },
        { type: "mc", text: "△ABC ≅ △DEF deur SHS. Watter dele moet gelyk wees?", options: ["Al drie sye", "Twee sye en die ingeslote hoek", "Twee hoeke en enige sy", "Skuinssy en een regsysy"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "'n Vierhoek het hoeke x, 2x, 3x, en 4x. Vind die grootste hoek.", answer: "144", topic: "Gemeng" },
        { type: "mc", text: "△ABC ∼ △PQR. AB = 5, PQ = 15, oppervlakte van △ABC = 12 cm². Vind oppervlakte van △PQR.", options: ["36 cm²", "108 cm²", "180 cm²", "48 cm²"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "In 'n ruit is een hoek 3x en die aangrensende hoek is (x + 60)°. Vind x.", answer: "30", topic: "Gemeng" },
        { type: "input", text: "Die hoeke van 'n driehoek is in die verhouding 2 : 3 : 4. Vind die grootte van die kleinste hoek.", answer: "40", topic: "Gemeng" },
        { type: "input", text: "△ABC ∼ △DEF met oppervlakteverhouding 9 : 16 (ABC : DEF). Die omtrek van △DEF is 48 cm. Bereken die omtrek van △ABC.", answer: "36", topic: "Gemeng" },
      ]
    },
  ],
  workbook: {
    chapter: 10, chapterName: "Meetkunde van 2D-vorms",
    topics: [
      {
        name: "Meetkunde van driehoeke",
        questions: [
          { num: "1", text: "In △PQR, ∠P = (3x − 5)°, ∠Q = (2x + 10)°, ∠R = (x + 15)°.", parts: [
            { label: "a)", text: "Stel 'n vergelyking op met behulp van die hoeksom van 'n driehoek.", marks: 1 },
            { label: "b)", text: "Los op vir x.", marks: 2 },
            { label: "c)", text: "Vind elke hoek.", marks: 2 },
          ]},
          { num: "2", text: "In △ABC, 'n buitehoek by C = 128°. ∠A = 65°.", parts: [
            { label: "a)", text: "Vind ∠B, met 'n rede.", marks: 2 },
            { label: "b)", text: "Watter tipe driehoek is △ABC? Gee 'n rede.", marks: 2 },
          ]},
        ]
      },
      {
        name: "Meetkunde van vierhoeke",
        questions: [
          { num: "3", text: "ABCD is 'n parallelogram met ∠A = (4x + 5)° en ∠B = (2x + 15)°.", parts: [
            { label: "a)", text: "Verduidelik waarom ∠A + ∠B = 180°.", marks: 1 },
            { label: "b)", text: "Los op vir x en vind albei hoeke.", marks: 3 },
          ]},
          { num: "4", text: "PQRS is 'n ruit met ∠P = 68°.", parts: [
            { label: "a)", text: "Vind ∠Q, met 'n rede.", marks: 2 },
            { label: "b)", text: "Vind ∠R, met 'n rede.", marks: 2 },
            { label: "c)", text: "Die diagonaal PR halveer ∠P. Vind ∠APQ waar A die snypunt van die diagonale is.", marks: 2 },
          ]},
        ]
      },
      {
        name: "Kongruente en gelykvormige vorms",
        questions: [
          { num: "5", text: "Gee die kongruensievoorwaarde (SSS, SHS, HSH, of RSS) vir elke paar:", parts: [
            { label: "a)", text: "Twee driehoeke met al drie sye gelyk.", marks: 1 },
            { label: "b)", text: "Twee reghoekige driehoeke met gelyke skuinssye en een gelyke regsysy.", marks: 1 },
            { label: "c)", text: "Twee driehoeke met twee gelyke sye en die ingeslote hoek gelyk.", marks: 1 },
          ]},
          { num: "6", text: "△ABC ∼ △PQR. AB = 6 cm, BC = 9 cm, AC = 12 cm, PQ = 10 cm.", parts: [
            { label: "a)", text: "Vind die skaalfaktor.", marks: 1 },
            { label: "b)", text: "Vind QR en PR.", marks: 3 },
            { label: "c)", text: "As oppervlakte van △ABC = 24 cm², vind die oppervlakte van △PQR.", marks: 2 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 10, chapterName: "Hoofstuk 10 — Meetkunde van 2D-vorms",
    topics: [
      {
        name: "Meetkunde van driehoeke",
        answers: [
          { num: "Q1a", ans: "(3x−5)+(2x+10)+(x+15) = 180", note: "Hoeksom van 'n driehoek = 180°" },
          { num: "Q1b", ans: "x = 26⅔ ≈ 26.7", note: "6x+20=180 → 6x=160 → x=26.7" },
          { num: "Q1c", ans: "∠P ≈ 75°, ∠Q ≈ 63.3°, ∠R ≈ 41.7°", note: "Vervang x≈26.7 in elke uitdrukking" },
          { num: "Q2a", ans: "∠B = 63°", note: "Buitehoek = som van nie-aangrensende binnehoeke: 128°−65°=63°" },
          { num: "Q2b", ans: "Ongelyksydige driehoek", note: "∠C=180°−128°=52°; al drie hoeke verskil (65°, 63°, 52°)" },
        ]
      },
      {
        name: "Meetkunde van vierhoeke",
        answers: [
          { num: "Q3a", ans: "AB ∥ DC in 'n parallelogram, dus ∠A en ∠B is mede-binnehoeke → som = 180°", note: "" },
          { num: "Q3b", ans: "x = 26⅔; ∠A ≈ 111.7°, ∠B ≈ 68.3°", note: "4x+5+2x+15=180 → 6x=160 → x=26.7" },
          { num: "Q4a", ans: "∠Q = 112°", note: "Mede-binnehoeke in ruit: ∠P+∠Q=180°; 68°+∠Q=180°" },
          { num: "Q4b", ans: "∠R = 68°", note: "Opponerende hoeke van 'n ruit is gelyk: ∠R=∠P=68°" },
          { num: "Q4c", ans: "∠APQ = 34°", note: "Diagonaal halveer ∠P: 68°÷2=34°; driehoek by snypunt het 90° (diagonale ⊥)" },
        ]
      },
      {
        name: "Kongruente en gelykvormige vorms",
        answers: [
          { num: "Q5a", ans: "SSS", note: "Sy-Sy-Sy" },
          { num: "Q5b", ans: "RSS", note: "Regte hoek-Skuinssy-Sy" },
          { num: "Q5c", ans: "SHS", note: "Sy-Hoek-Sy (ingeslote hoek)" },
          { num: "Q6a", ans: "k = 5/3 ≈ 1.667", note: "PQ/AB = 10/6 = 5/3" },
          { num: "Q6b", ans: "QR = 15 cm; PR = 20 cm", note: "QR=9×(5/3)=15; PR=12×(5/3)=20" },
          { num: "Q6c", ans: "Oppervlakte △PQR ≈ 66.7 cm²", note: "Oppervlakteverhouding=k²=25/9; 24×25/9≈66.7" },
        ]
      },
    ]
  }
});
