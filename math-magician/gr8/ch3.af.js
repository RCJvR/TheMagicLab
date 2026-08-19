// Math Magician — Grade 8, Chapter 3 data (Afrikaans)
// Auto-loaded on demand by math-magician-gr8.html

MathMagician.registerChapter(3, {
  topics: [
{
    id: 301,
    chapter: 3,
    name: "Eksponensiële vorm",
    fullName: "Vergelyking en voorstelling van getalle in eksponensiële vorm",
    lesson: {
      heading: "Voorstelling van getalle in eksponensiële vorm",
      sub: "Hoofstuk 3 · Onderwerp 1",
      body: `
        <p><strong>Eksponensiële notasie</strong> is 'n kompakte manier om herhaalde vermenigvuldiging te skryf.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Sleutelterminologie</div>
          <p>
            <span class="math">aⁿ</span> word gelees as "<em>a tot die mag n</em>"<br><br>
            <strong>Grondtal (a):</strong> die getal wat herhaaldelik vermenigvuldig word.<br>
            <strong>Eksponent / Indeks (n):</strong> hoeveel keer die grondtal met homself vermenigvuldig word.<br><br>
            <span class="math">2⁵ = 2 × 2 × 2 × 2 × 2 = 32</span><br>
            <span class="math">(−3)⁴ = (−3)×(−3)×(−3)×(−3) = 81</span><br>
            <span class="math">(−3)³ = (−3)×(−3)×(−3) = −27</span>
          </p>
        </div>
        <div class="def-box">
          <div class="def-box-title">📖 Spesiale eksponente</div>
          <p>
            <strong>Nul-eksponent:</strong> <span class="math">a⁰ = 1</span> vir enige <span class="math">a ≠ 0</span><br>
            <span class="math">5⁰ = 1</span> &nbsp; <span class="math">(−7)⁰ = 1</span><br><br>
            <strong>Eksponent 1:</strong> <span class="math">a¹ = a</span><br>
            <strong>Eksponent 2:</strong> word 'n <em>kwadraat</em> genoem &nbsp; <strong>Eksponent 3:</strong> word 'n <em>kubus</em> genoem
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Skryf in uitgebreide en eksponensiële vorm</div>
          <div class="example-step"><span class="step-num">1</span><span>Skryf <span class="math">3 × 3 × 3 × 3 × 3</span> in eksponensiële vorm → <span class="math">3⁵</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Bereken <span class="math">2⁴</span> → <span class="math">2×2×2×2 = 16</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Bereken <span class="math">(−2)⁴</span> → <span class="math">16</span> (ewe mag, positief)</span></div>
          <div class="example-step"><span class="step-num">4</span><span>Bereken <span class="math">(−2)⁵</span> → <span class="math">−32</span> (onewe mag, negatief)</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Let op die verskil: <span class="math">−3⁴ = −(3⁴) = −81</span> maar <span class="math">(−3)⁴ = 81</span>. Die hakie verander alles.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Eksponent-sakrekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Voer 'n grondtal en eksponent in om die uitdrukking, uitgebreide vorm en resultaat te sien.</p>
            <div style="display:flex;gap:4px;align-items:flex-end;flex-wrap:wrap;margin-bottom:16px;">
              <div style="display:flex;flex-direction:column;gap:4px;align-items:center;">
                <label style="font-size:10px;color:rgba(245,158,11,0.60);text-transform:uppercase;letter-spacing:0.06em;">Grondtal</label>
                <input id="expCalcBase" type="number" value="3" style="width:72px;background:#1e1b4b;border:2px solid rgba(245,158,11,0.50);color:#fcd34d;padding:8px;border-radius:8px;font-size:22px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;align-items:center;padding-bottom:2px;">
                <label style="font-size:10px;color:rgba(165,180,252,0.60);text-transform:uppercase;letter-spacing:0.06em;">Eksponent</label>
                <input id="expCalcExp" type="number" value="4" style="width:60px;background:#1e1b4b;border:2px solid rgba(99,102,241,0.50);color:#a5b4fc;padding:6px;border-radius:8px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;vertical-align:top;">
              </div>
              <div style="padding-bottom:10px;font-size:28px;color:rgba(221,225,240,0.20);font-family:JetBrains Mono,monospace;line-height:1;padding-left:4px;">→</div>
              <div id="expCalcDisplay" style="padding-bottom:8px;font-size:28px;font-family:JetBrains Mono,monospace;color:#fcd34d;line-height:1;"></div>
            </div>
            <div id="expCalcOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function sup(n){ return String(n).split('').map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[c]||c).join(''); }
            function fmt(n){ return Number.isInteger(n)?String(n):parseFloat(n.toPrecision(8)).toString(); }
            function update(){
              const base=parseFloat(document.getElementById('expCalcBase').value);
              const exp=parseFloat(document.getElementById('expCalcExp').value);
              if(isNaN(base)||isNaN(exp)) return;
              const result=Math.pow(base,exp);
              // Live display: base in gold, exponent superscript in purple
              document.getElementById('expCalcDisplay').innerHTML=
                '<span style="color:#fcd34d;">'+base+'</span>'+
                '<span style="font-size:16px;color:#a5b4fc;vertical-align:super;margin-left:1px;">'+exp+'</span>';
              // Expanded form — show up to 10 factors; beyond that show grouping
              let expandedHTML='';
              if(Number.isInteger(exp)&&exp>0){
                if(exp<=10){
                  const factors=Array(exp).fill('<span style="color:#fcd34d;">'+base+'</span>').join('<span style="color:rgba(221,225,240,0.40);"> × </span>');
                  expandedHTML=factors+' <span style="color:rgba(221,225,240,0.40)">=</span> <span style="color:#6ee7b7;">'+fmt(result)+'</span>';
                } else {
                  // Show first 3 ... last 1 with count
                  const f='<span style="color:#fcd34d;">'+base+'</span>';
                  const x='<span style="color:rgba(221,225,240,0.40);"> × </span>';
                  expandedHTML=f+x+f+x+f+'<span style="color:rgba(221,225,240,0.30);"> × … ('+exp+' faktore in totaal)</span> <span style="color:rgba(221,225,240,0.40)">=</span> <span style="color:#6ee7b7;">'+fmt(result)+'</span>';
                }
              }
              const rows=[
                '<div style="display:flex;gap:0;align-items:baseline;margin-bottom:2px;"><span style="color:rgba(221,225,240,0.40);width:130px;flex-shrink:0;">Uitdrukking:</span><span>'+
                  '<span style="color:#fcd34d;font-size:15px;">'+base+'</span>'+
                  '<span style="font-size:11px;color:#a5b4fc;vertical-align:super;margin-left:1px;">'+exp+'</span>'+
                '</span></div>',
                expandedHTML?'<div style="display:flex;gap:0;align-items:baseline;flex-wrap:wrap;margin-bottom:2px;"><span style="color:rgba(221,225,240,0.40);width:130px;flex-shrink:0;">Uitgebreid:</span><span style="font-size:12px;line-height:1.8;">'+expandedHTML+'</span></div>':'',
                '<div style="display:flex;gap:0;align-items:baseline;margin-bottom:2px;"><span style="color:rgba(221,225,240,0.40);width:130px;flex-shrink:0;">Resultaat:</span><span style="color:#6ee7b7;font-size:18px;font-weight:700;">'+fmt(result)+'</span></div>',
                exp===0?'<div style="font-size:10px;color:rgba(221,225,240,0.35);margin-top:2px;">Enige nie-nul grondtal tot die mag 0 is gelyk aan 1.</div>':'',
              ];
              document.getElementById('expCalcOut').innerHTML=rows.filter(Boolean).join('');
            }
            ['expCalcBase','expCalcExp'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "Skryf <span class='math'>5 × 5 × 5 × 5</span> in eksponensiële vorm (bv. 5^4)", answer: "5^4", topic: "Eksponente" },
      { type: "mc", text: "Bereken <span class='math'>2⁶</span>", options: ["12", "32", "64", "36"], answer: 2, topic: "Eksponente" },
      { type: "mc", text: "Wat is <span class='math'>(−4)⁰</span>?", options: ["0", "−1", "1", "4"], answer: 2, topic: "Eksponente" },
      { type: "input", text: "Bereken <span class='math'>(−3)⁴</span>", answer: "81", topic: "Eksponente" },
      { type: "mc", text: "Watter een het 'n negatiewe waarde?", options: ["(−5)²", "(−2)⁴", "(−3)³", "(−1)¹⁰⁰"], answer: 2, topic: "Eksponente" },
      { type: "input", text: "Bereken <span class='math'>10³</span>", answer: "1000", topic: "Eksponente" },
      { type: "input", text: "Bepaal watter een groter is, <span class='math'>2⁸</span> of <span class='math'>3⁵</span>, en bereken met hoeveel.", answer: "13", topic: "Eksponente" },
      { type: "mc", text: "'n Hoeveelheid begin by 3 en verdubbel 6 keer agtereenvolgens. Watter uitdrukking gee die finale waarde?", options: ["3 × 2⁶", "3⁶ × 2", "6 × 2³", "2 × 3⁶"], answer: 0, topic: "Eksponente" },
    ]
  },
  {
    id: 302,
    chapter: 3,
    name: "Wette van eksponente",
    fullName: "Die wette van eksponente",
    lesson: {
      heading: "Die wette van eksponente",
      sub: "Hoofstuk 3 · Onderwerp 2",
      body: `
        <p>Die <strong>wette van eksponente</strong> stel ons in staat om uitdrukkings met magte te vereenvoudig sonder om dit ten volle uit te brei.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Die vyf wette (dieselfde grondtal)</div>
          <p>
            <strong>Wet 1 — Vermenigvuldiging:</strong><br>
            <span class="math">aᵐ × aⁿ = aᵐ⁺ⁿ</span><br>
            <em>Tel die eksponente bymekaar wanneer dieselfde grondtal vermenigvuldig word.</em><br>
            <span class="math">3² × 3⁴ = 3⁶ = 729</span><br><br>

            <strong>Wet 2 — Deling:</strong><br>
            <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
            <em>Trek die eksponente af wanneer dieselfde grondtal gedeel word.</em><br>
            <span class="math">5⁵ ÷ 5² = 5³ = 125</span><br><br>

            <strong>Wet 3 — Mag van 'n mag:</strong><br>
            <span class="math">(aᵐ)ⁿ = aᵐˣⁿ</span><br>
            <em>Vermenigvuldig die eksponente.</em><br>
            <span class="math">(2³)⁴ = 2¹² = 4096</span><br><br>

            <strong>Wet 4 — Mag van 'n produk:</strong><br>
            <span class="math">(ab)ⁿ = aⁿ × bⁿ</span><br>
            <span class="math">(2×3)⁴ = 2⁴ × 3⁴ = 16 × 81 = 1296</span><br><br>

            <strong>Wet 5 — Mag van 'n kwosiënt:</strong><br>
            <span class="math">(a/b)ⁿ = aⁿ/bⁿ</span><br>
            <span class="math">(2/3)³ = 8/27</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Vereenvoudigingsvoorbeelde</div>
          <div class="example-step"><span class="step-num">1</span><span>Vereenvoudig <span class="math">2³ × 2⁵</span> → <span class="math">2⁸ = 256</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Vereenvoudig <span class="math">3⁷ ÷ 3⁴</span> → <span class="math">3³ = 27</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Vereenvoudig <span class="math">(5²)³</span> → <span class="math">5⁶ = 15 625</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Vereenvoudig <span class="math">x⁵ × x³ ÷ x⁴</span> → <span class="math">x⁵⁺³⁻⁴ = x⁴</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Die wette geld slegs wanneer die <strong>grondtalle dieselfde</strong> is. Jy kan nie <span class="math">2³ × 3²</span> met Wet 1 vereenvoudig nie.</span></div>
        <div class="tip-box" style="border-color:rgba(245,158,11,0.30);background:rgba(245,158,11,0.08);"><span class="tip-icon">📚</span><span><strong>Graad 9-uitbreiding:</strong> Negatiewe eksponente (bv. <span class="math">a⁻ⁿ = 1/aⁿ</span>) word in Graad 9 behandel. Jy het dit nie vir jou Graad 8-eksamen nodig nie.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Eksponentwette-verkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n wet, voer waardes in, en sien hoe die reël toegepas word.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:flex-end;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Wet</label>
                <select id="expLaw" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="mul">aᵐ × aⁿ = aᵐ⁺ⁿ</option>
                  <option value="div">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</option>
                  <option value="pow">(aᵐ)ⁿ = aᵐⁿ</option>
                  <option value="zero">a⁰ = 1</option>
                  <!-- Negative exponents (a⁻ⁿ) are Grade 9 content — not shown here -->
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Grondtal (a)</label>
                <input id="expBase" type="number" value="2" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;" id="expL1">m</label>
                <input id="expM" type="number" value="3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;" id="expNBox">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;" id="expL2">n</label>
                <input id="expN" type="number" value="4" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div id="expOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const law=document.getElementById('expLaw').value;
              const a=parseFloat(document.getElementById('expBase').value)||2;
              const m=parseFloat(document.getElementById('expM').value)||0;
              const n=parseFloat(document.getElementById('expN').value)||0;
              const nbox=document.getElementById('expNBox');
              const l2=document.getElementById('expL2');
              let lines=[];
              nbox.style.display='flex';
              if(law==='mul'){
                lines=['<div><span style="color:#a5b4fc;">Reël: </span>aᵐ × aⁿ = aᵐ⁺ⁿ</div>',
                  '<div>'+a+'³ × '+a+'⁴ = '+a+'^('+(m)+'+'+(n)+') = '+a+'^'+(m+n)+' = <strong style="color:#6ee7b7;">'+(Math.pow(a,m+n))+'</strong></div>'];
              } else if(law==='div'){
                lines=['<div><span style="color:#a5b4fc;">Reël: </span>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</div>',
                  '<div>'+a+'^'+m+' ÷ '+a+'^'+n+' = '+a+'^('+(m)+'-'+(n)+') = '+a+'^'+(m-n)+' = <strong style="color:#6ee7b7;">'+(Math.pow(a,m-n).toFixed(4))+'</strong></div>'];
              } else if(law==='pow'){
                lines=['<div><span style="color:#a5b4fc;">Reël: </span>(aᵐ)ⁿ = aᵐⁿ</div>',
                  '<div>('+a+'^'+m+')^'+n+' = '+a+'^('+(m)+'×'+(n)+') = '+a+'^'+(m*n)+' = <strong style="color:#6ee7b7;">'+(Math.pow(a,m*n))+'</strong></div>'];
              } else if(law==='zero'){
                nbox.style.display='none';
                lines=['<div><span style="color:#a5b4fc;">Reël: </span>Enige nie-nul grondtal tot die mag 0 = 1</div>',
                  '<div>'+a+'^0 = <strong style="color:#6ee7b7;">1</strong></div>',
                  '<div style="font-size:10px;opacity:0.45;">Geld vir enige a ≠ 0</div>'];
}
              document.getElementById('expOut').innerHTML=lines.join('');
            }
            ['expLaw','expBase','expM','expN'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Vereenvoudig <span class='math'>4³ × 4⁵</span>", options: ["4¹⁵", "4⁸", "16⁸", "4²"], answer: 1, topic: "Wette van eksponente" },
      { type: "input", text: "Vereenvoudig <span class='math'>2⁷ ÷ 2³</span>. Gee as 'n mag van 2 (bv. 2^4)", answer: "2^4", topic: "Wette van eksponente" },
      { type: "mc", text: "Vereenvoudig <span class='math'>(3²)⁵</span>", options: ["3⁷", "3¹⁰", "9⁵", "3³"], answer: 1, topic: "Wette van eksponente" },
      { type: "input", text: "Bereken <span class='math'>5⁴ ÷ 5⁴</span>", answer: "1", topic: "Wette van eksponente" },
      { type: "mc", text: "Vereenvoudig <span class='math'>x⁴ × x³ ÷ x²</span>", options: ["x⁵", "x⁹", "x²⁴", "x⁻⁵"], answer: 0, topic: "Wette van eksponente" },
      { type: "input", text: "Bereken <span class='math'>(2²)³</span>", answer: "64", topic: "Wette van eksponente" },
      { type: "mc", text: "Vereenvoudig <span class='math'>(2 × 3)³</span>", options: ["2³ + 3³", "6³", "2 × 3³", "5³"], answer: 1, topic: "Wette van eksponente" },
      { type: "input", text: "Vereenvoudig <span class='math'>(2³ × 2⁴)² ÷ 2¹⁰</span> en gee die numeriese antwoord.", answer: "16", topic: "Wette van eksponente" },
      { type: "input", text: "As <span class='math'>2ˣ = 32</span> en <span class='math'>3ʸ = 81</span>, bereken <span class='math'>x + y</span>.", answer: "9", topic: "Wette van eksponente" },
    ]
  },
  {
    id: 303,
    chapter: 3,
    name: "Gemengde bewerkings — eksponente",
    fullName: "Gemengde bewerkings",
    lesson: {
      heading: "Gemengde bewerkings met eksponente",
      sub: "Hoofstuk 3 · Onderwerp 3",
      body: `
        <p>Om die wette van eksponente met die vier bewerkings te kombineer, verg noukeurige toepassing van <strong>BODMAS en tekenreëls</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Strategie vir gemengde bewerkings</div>
          <p>
            1. Hanteer eers <strong>hakies</strong> — vereenvoudig enige uitdrukking binne-in.<br>
            2. Pas <strong>eksponentwette</strong> toe om magte te vereenvoudig.<br>
            3. Werk dan deur <strong>deling en vermenigvuldiging</strong> van links na regs.<br>
            4. Laastens, <strong>optelling en aftrekking</strong> van links na regs.<br><br>
            Hou tred met <strong>negatiewe grondtalle</strong> by elke stap.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken: <span class="math">2³ × 3² − (2²)² ÷ 4</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Magte: <span class="math">2³=8</span>, <span class="math">3²=9</span>, <span class="math">(2²)²=2⁴=16</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>× en ÷: <span class="math">8×9=72</span>, <span class="math">16÷4=4</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>−: <span class="math">72 − 4 = 68</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Met negatiewe grondtalle</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken: <span class="math">(−2)³ + 3² × (−1)⁵</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Magte: <span class="math">(−2)³=−8</span>, <span class="math">3²=9</span>, <span class="math">(−1)⁵=−1</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>×: <span class="math">9×(−1)=−9</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>+: <span class="math">−8 + (−9) = −17</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Vereenvoudig alle magte na hul numeriese waardes voordat jy enige optelling of aftrekking doen. Dit voorkom verwarring met tekens.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Bereken: <span class='math'>2⁴ + 3³ − 5²</span>", answer: "18", topic: "Gemengde bewerkings" },
      { type: "mc", text: "Wat is <span class='math'>(−1)⁷ × 2³ + 3²</span>?", options: ["1", "9", "−8", "17"], answer: 0, topic: "Gemengde bewerkings" },
      { type: "input", text: "Bereken: <span class='math'>4² ÷ 2³ × (−1)⁴</span>", answer: "2", topic: "Gemengde bewerkings" },
      { type: "mc", text: "Vereenvoudig: <span class='math'>2³ × 2² − (2²)²</span>", options: ["−6", "16", "−3", "32"], answer: 1, topic: "Gemengde bewerkings" },
      { type: "input", text: "Bereken: <span class='math'>5² − (−2)³ × 3</span>", answer: "49", topic: "Gemengde bewerkings" },
      { type: "input", text: "Bereken: <span class='math'>(−2)³ × 3² − (−4)² ÷ 2</span>", answer: "-80", topic: "Gemengde bewerkings" },
      { type: "input", text: "'n Vierkant het sylengte <span class='math'>2³</span> cm. 'n Kubus het randlengte <span class='math'>2²</span> cm. Bereken (die vierkant se oppervlakte) − (die kubus se volume).", answer: "0", topic: "Gemengde bewerkings" },
    ]
  },
  {
    id: 304,
    chapter: 3,
    name: "Wetenskaplike notasie",
    fullName: "Wetenskaplike notasie",
    lesson: {
      heading: "Wetenskaplike notasie",
      sub: "Hoofstuk 3 · Onderwerp 4",
      body: `
        <p><strong>Wetenskaplike notasie</strong> (ook standaardvorm genoem) gebruik magte van 10 om baie groot of baie klein getalle kompak te skryf.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Die vorm</div>
          <p>
            'n Getal in wetenskaplike notasie word geskryf as:<br>
            <span class="math">a × 10ⁿ</span><br>
            waar <span class="math">1 ≤ a &lt; 10</span> en n 'n heelgetal is.<br><br>
            <strong>Groot getalle:</strong> n is positief<br>
            <span class="math">3 400 000 = 3.4 × 10⁶</span><br><br>
            <strong>Klein getalle:</strong> n is negatief<br>
            <span class="math">0.000052 = 5.2 × 10⁻⁵</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Omskakeling na wetenskaplike notasie</div>
          <div class="example-step"><span class="step-num">1</span><span>Skryf <span class="math">47 200</span> in wetenskaplike notasie.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Skuif die desimale komma na links totdat jy 'n getal tussen 1 en 10 het: <span class="math">4.72</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Tel die skuiwe: 4 plekke → <span class="math">4.72 × 10⁴</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Omskakeling vanaf wetenskaplike notasie</div>
          <div class="example-step"><span class="step-num">1</span><span>Skryf <span class="math">6.3 × 10⁵</span> as 'n gewone getal.</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Skuif die desimale komma 5 plekke na regs: <span class="math">630 000</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Die mag van 10 vertel jou hoeveel plekke om die desimale komma te skuif. Positief → regs (groter). Negatief → links (kleiner).</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Wetenskaplike Notasie-omskakelaar</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="sciInput" type="text" value="0.000045" placeholder="Voer 'n getal in…" style="flex:1;min-width:180px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;">
              <button id="sciConv" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Skakel om</button>
            </div>
            <div id="sciOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function convert(){
              const raw=document.getElementById('sciInput').value.trim();
              const n=parseFloat(raw);
              const el=document.getElementById('sciOut');
              if(isNaN(n)){el.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige getal in.</span>';return;}
              const sci=n.toExponential();
              const parts=sci.split('e');
              const coeff=parseFloat(parts[0]).toFixed(4).replace(/\.?0+$/,'');
              const exp=parseInt(parts[1]);
              const isLarge=exp>=0;
              el.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Standaardvorm:</span><span style="color:#fcd34d;">'+n.toLocaleString('fullwide',{maximumFractionDigits:20})+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Wetenskaplike notasie:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+coeff+' × 10<sup>'+exp+'</sup></span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Tipe:</span><span style="color:#a5b4fc;">'+(isLarge?'Groot getal (positiewe eksponent)':'Klein getal (negatiewe eksponent)')+'</span></div>',
                '<div style="font-size:10px;opacity:0.45;margin-top:2px;">Die desimale komma het '+Math.abs(exp)+' plek'+(Math.abs(exp)!==1?'ke':'')+' na '+(isLarge?'links':'regs')+' geskuif</div>',
              ].join('');
            }
            document.getElementById('sciConv').addEventListener('click',convert);
            document.getElementById('sciInput').addEventListener('keydown',e=>{if(e.key==='Enter')convert();});
            convert();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Skryf <span class='math'>56 000</span> in wetenskaplike notasie.", options: ["5.6 × 10³", "56 × 10³", "5.6 × 10⁴", "0.56 × 10⁵"], answer: 2, topic: "Wetenskaplike notasie" },
      { type: "input", text: "Skryf <span class='math'>3.8 × 10⁵</span> as 'n gewone getal.", answer: "380000", topic: "Wetenskaplike notasie" },
      { type: "mc", text: "Watter een is korrekte wetenskaplike notasie vir <span class='math'>0.00042</span>?", options: ["4.2 × 10⁻³", "4.2 × 10⁻⁴", "42 × 10⁻⁵", "0.42 × 10⁻³"], answer: 1, topic: "Wetenskaplike notasie" },
      { type: "input", text: "Skryf <span class='math'>7 250 000</span> in wetenskaplike notasie (gebruik formaat soos 7.25e6 of 7.25 × 10^6)", answer: "7.25 × 10^6", topic: "Wetenskaplike notasie" },
      { type: "mc", text: "Die afstand vanaf die Aarde na die Son is ongeveer <span class='math'>1.5 × 10⁸</span> km. Wat is dit as 'n gewone getal?", options: ["1 500 000", "15 000 000", "150 000 000", "1 500 000 000"], answer: 2, topic: "Wetenskaplike notasie" },
      { type: "input", text: "Lig beweeg teen <span class='math'>3 × 10⁸</span> m/s. Bereken hoe ver lig in 5 sekondes beweeg. Gee jou antwoord in wetenskaplike notasie (bv. 1.5 × 10^9)", answer: "1.5 × 10^9", topic: "Wetenskaplike notasie" },
      { type: "input", text: "'n Virus is <span class='math'>5 × 10⁻⁸</span> m breed en 'n bakterie is <span class='math'>2 × 10⁻⁶</span> m breed. Hoeveel keer breër is die bakterie as die virus?", answer: "40", topic: "Wetenskaplike notasie" },
    ]
  },
  {
    id: 305,
    chapter: 3,
    name: "H3 Eksamenfokus",
    fullName: "Eksamenfokus-oefening",
    lesson: {
      heading: "Hoofstuk 3 — Eksamenfokus",
      sub: "Hoofstuk 3 · Hersiening",
      body: `
        <p>Hierdie eksamen-tipe vrae dek al die inhoud van Hoofstuk 3. Pas die wette noukeurig toe en wys alle berekeninge.</p>
        <div class="def-box">
          <div class="def-box-title">📋 Hoofstuk 3-opsomming</div>
          <p>
            ✅ <span class="math">aⁿ</span>: grondtal a word n keer vermenigvuldig<br>
            ✅ <span class="math">a⁰ = 1</span> (enige nie-nul grondtal)<br>
            ✅ Vermenigvuldig dieselfde grondtal: <span class="math">aᵐ × aⁿ = aᵐ⁺ⁿ</span><br>
            ✅ Deel dieselfde grondtal: <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
            ✅ Mag van 'n mag: <span class="math">(aᵐ)ⁿ = aᵐⁿ</span><br>
            ✅ Ewe mag van 'n negatiewe getal = positief; onewe = negatief<br>
            ✅ Wetenskaplike notasie: <span class="math">a × 10ⁿ</span>, waar <span class="math">1 ≤ a &lt; 10</span>
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Kyk in eksamens altyd: is die grondtalle dieselfde voordat jy 'n wet toepas? Is die grondtal negatief? Hoeveel desimale plekke moet geskuif word?</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Vereenvoudig: <span class='math'>2⁴ × 2³ ÷ (2²)²</span>", options: ["2³", "2⁵", "2¹¹", "2"], answer: 0, topic: "Gemeng" },
      { type: "input", text: "Bereken: <span class='math'>(−2)⁴ + (−3)³ + 5⁰</span>", answer: "-10", topic: "Gemeng" },
      { type: "mc", text: "Skryf <span class='math'>0.000307</span> in korrekte wetenskaplike notasie.", options: ["3.07 × 10⁻³", "3.07 × 10⁻⁴", "30.7 × 10⁻⁵", "0.307 × 10⁻³"], answer: 1, topic: "Wetenskaplike notasie" },
      { type: "input", text: "Vereenvoudig: <span class='math'>x⁶ × x² ÷ (x²)³</span> (gee as x^n)", answer: "x^2", topic: "Wette" },
      { type: "mc", text: "Watter een is die grootste: <span class='math'>2⁷</span>, <span class='math'>3⁵</span>, <span class='math'>4⁴</span>, <span class='math'>5³</span>?", options: ["3⁵ = 243", "4⁴ = 256", "2⁷ = 128", "5³ = 125"], answer: 1, topic: "Gemeng" },
      { type: "input", text: "Die massa van 'n proton is <span class='math'>1.67 × 10⁻²⁷</span> kg. Skryf die desimale vorm (gebruik e-notasie, bv. 1.67e-27)", answer: "1.67e-27", topic: "Wetenskaplike notasie" },
      { type: "input", text: "Vereenvoudig en bereken: <span class='math'>[(3²)² ÷ 3²] × (−1)⁵ + 2⁰</span>", answer: "-8", topic: "Gemeng" },
    ]
  }
  ],
  workbook: {
    chapter: 3, chapterName: "Eksponente",
    topics: [
      {
        name: "Wette van eksponente",
        questions: [
          {
            num: "1",
            text: "Vereenvoudig, en los antwoorde in eksponensiële vorm:",
            parts: [
              { label: "a)", text: "3⁴ × 3⁶ ÷ 3⁵", marks: 2 },
              { label: "b)", text: "(2³)⁴ ÷ 2⁸", marks: 3 },
              { label: "c)", text: "x⁵ × x³ ÷ (x²)³", marks: 3 },
              { label: "d)", text: "(3² × 3⁰) ÷ 3³", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Wetenskaplike notasie & gemeng",
        questions: [
          {
            num: "2",
            text: "Skryf in wetenskaplike notasie:",
            parts: [
              { label: "a)", text: "0,000 000 45", marks: 2 },
              { label: "b)", text: "8 700 000", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "Bereken sonder 'n sakrekenaar:",
            parts: [
              { label: "a)", text: "2⁵ − (−3)² + 4⁰ × (−2)³", marks: 4 },
              { label: "b)", text: "(2²)³ ÷ (2³)² × 2", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 3, chapterName: "Hoofstuk 3 — Eksponente",
    topics: [
      {
        name: "Wette van eksponente",
        answers: [
          { num: "Q1a", ans: "3⁵", note: "4+6=10, dan 10−5=5" },
          { num: "Q1b", ans: "2⁴ = 16", note: "(2³)⁴ = 2¹²; 2¹²÷2⁸ = 2⁴ = 16" },
          { num: "Q1c", ans: "x²", note: "x⁵⁺³ = x⁸; (x²)³ = x⁶; x⁸÷x⁶ = x²" },
          { num: "Q1d", ans: "3⁻¹ (= 1/3 in Graad 9)", note: "3²÷3³ = 3²⁻³ = 3⁻¹. Let wel: negatiewe eksponente word formeel in Graad 9 ingestel. Op Graad 8-vlak is die antwoord '3⁻¹' aanvaarbaar, of druk dit uit as 1/3." },
        ]
      },
      {
        name: "Wetenskaplike notasie & gemeng",
        answers: [
          { num: "Q2a", ans: "4,5 × 10⁻⁷", note: "Skuif die desimale komma 7 plekke na regs" },
          { num: "Q2b", ans: "8,7 × 10⁶", note: "Skuif die desimale komma 6 plekke na links" },
          { num: "Q3a", ans: "32 − 9 + 1 × (−8) = 15", note: "32−9=23; 4⁰×(−2)³ = 1×(−8) = −8; 23+(−8)=15" },
          { num: "Q3b", ans: "2¹", note: "2⁶÷2⁶×2 = 2⁰×2 = 1×2 = 2" },
        ]
      },
    ]
  }
});
