// Math Magician — Graad 9, Hoofstuk 4 data
// Eksponente

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 7,
      chapter: 4,
      name: "Wette van eksponente",
      fullName: "Die wette van eksponente",
      lesson: {
        heading: "Die wette van eksponente",
        sub: "Hoofstuk 4 · Onderwerp 1",
        body: `
          <p>Eksponentwette stel ons in staat om uitdrukkings met magte doeltreffend te vereenvoudig.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Die sewe wette</div>
            <p>
              <strong>1. Produk:</strong> <span class="math">aᵐ × aⁿ = aᵐ⁺ⁿ</span><br>
              <strong>2. Kwosiënt:</strong> <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
              <strong>3. Mag van 'n mag:</strong> <span class="math">(aᵐ)ⁿ = aᵐⁿ</span><br>
              <strong>4. Mag van 'n produk:</strong> <span class="math">(ab)ⁿ = aⁿbⁿ</span><br>
              <strong>5. Mag van 'n kwosiënt:</strong> <span class="math">(a/b)ⁿ = aⁿ/bⁿ</span><br>
              <strong>6. Nul-eksponent:</strong> <span class="math">a⁰ = 1</span> (a ≠ 0)<br>
              <strong>7. Negatiewe eksponent:</strong> <span class="math">a⁻ⁿ = 1/aⁿ</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>x³ × x⁵ = x⁸</span></div>
            <div class="example-step"><span class="step-num">2</span><span>y⁷ ÷ y³ = y⁴</span></div>
            <div class="example-step"><span class="step-num">3</span><span>(2x²)³ = 8x⁶</span></div>
            <div class="example-step"><span class="step-num">4</span><span>3⁻² = 1/9</span></div>
            <div class="example-step"><span class="step-num">5</span><span>(5xy)⁰ = 1</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Rasionale Eksponent-sakrekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Bereken grondtal^(m/n) stap vir stap: neem die n-de wortel, en verhef dan tot m.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Grondtal</label><input id="expBase" type="number" value="8" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">m</label><input id="expM" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">n</label><input id="expNn" type="number" value="3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="expBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="expOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function ev(){
              const base=parseFloat(document.getElementById('expBase').value);
              const m=parseInt(document.getElementById('expM').value)||1;
              const n=parseInt(document.getElementById('expNn').value)||1;
              if(n===0){document.getElementById('expOut').innerHTML='<span style="color:#fca5a5;">n kan nie 0 wees nie.</span>';return;}
              const root=base<0&&n%2!==0?NaN:Math.sign(base)*Math.pow(Math.abs(base),1/n);
              const result=isNaN(root)?NaN:Math.pow(root,m);
              const f=v=>Number.isInteger(v)?String(v):v.toFixed(4);
              document.getElementById('expOut').innerHTML=isNaN(result)?'<span style="color:#fca5a5;">Nie werklik nie (ewe wortel van \\'n negatiewe getal)</span>':[
                '<div><span style="color:rgba(221,225,240,0.45);">Uitdrukking: </span><span style="color:#fbbf24;">'+base+'^('+m+'/'+n+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Stap 1 ⁿ√grondtal: </span><span style="color:#a5b4fc;">'+f(root)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Stap 2 verhef tot m: </span><span style="color:#a5b4fc;">'+f(result)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Resultaat: </span><span style="color:#6ee7b7;font-size:16px;font-weight:700;">'+f(result)+'</span></div>',
              ].join('');
            }
            document.getElementById('expBtn').addEventListener('click',ev);
            ['expBase','expM','expNn'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')ev();}));
            ev();
          })();
          </script>
        Die grondtal moet DIESELFDE wees om die produk- en kwosiëntwette te gebruik. Jy kan nie x³ × y⁵ met hierdie wette vereenvoudig nie.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Vereenvoudig: a⁴ × a⁻³ × a", options: ["a⁵", "a⁻²", "a²", "a⁻⁵"], answer: 2, topic: "Eksponente" },
        { type: "input", text: "Vereenvoudig (3x²y)² en gee die koëffisiënt van x⁴y².", answer: "9", topic: "Eksponente" },
        { type: "mc", text: "Skryf 2⁻³ as 'n breuk:", options: ["-8", "1/6", "1/8", "-1/8"], answer: 2, topic: "Eksponente" },
        { type: "input", text: "Vereenvoudig: (2³)⁴ ÷ 2⁸ — gee die antwoord as 'n mag van 2 (slegs die eksponent).", answer: "4", topic: "Eksponente" },
        { type: "mc", text: "Wat is (7xy²z)⁰ gelyk aan?", options: ["0", "7", "1", "xyz"], answer: 2, topic: "Eksponente" },
        { type: "input", text: "Vereenvoudig (2x²y⁻¹)³ ÷ (4x⁴y⁻²) en gee die koëffisiënt van die vereenvoudigde antwoord.", answer: "2", topic: "Eksponente" },
        { type: "input", text: "As 3 tot die mag (x + 1) gelyk is aan 81, los op vir x.", answer: "3", topic: "Eksponente" },
      ]
    },
    {
      id: 8,
      chapter: 4,
      name: "Wetenskaplike notasie",
      fullName: "Wetenskaplike notasie en eksponentberekeninge",
      lesson: {
        heading: "Wetenskaplike notasie",
        sub: "Hoofstuk 4 · Onderwerp 2",
        body: `
          <p><strong>Wetenskaplike notasie</strong> druk getalle uit in die vorm <span class="math">a × 10ⁿ</span> waar <span class="math">1 ≤ a < 10</span> en n 'n heelgetal is.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Omskakeling na/vanaf wetenskaplike notasie</div>
            <p>
              <strong>Groot getal → wetenskaplike notasie:</strong> skuif die desimaalkomma na links; die aantal skuiwe = positiewe eksponent.<br>
              bv. 3 450 000 = 3,45 × 10⁶<br><br>
              <strong>Klein getal → wetenskaplike notasie:</strong> skuif die desimaalkomma na regs; die aantal skuiwe = negatiewe eksponent.<br>
              bv. 0,00047 = 4,7 × 10⁻⁴<br><br>
              <strong>Wetenskaplike notasie → desimaal:</strong> skuif die desimaalkomma in die rigting wat deur die teken van die eksponent aangedui word.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Bereken met wetenskaplike notasie</div>
            <div class="example-step"><span class="step-num">1</span><span>(3 × 10⁴) × (2 × 10³) = 6 × 10⁷</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(8 × 10⁵) ÷ (2 × 10²) = 4 × 10³</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Skakel om: 5,6 × 10⁻³ = 0,0056</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Nadat jy vermenigvuldig/gedeel het,
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Eksponensiële Vergelyking-oefening</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Los b&#8339; = c op deur grondtalle te vergelyk. Behaal soveel punte as moontlik!</p>
            <div id="expEqQ" style="font-family:JetBrains Mono,monospace;font-size:20px;color:#fcd34d;margin-bottom:12px;min-height:28px;"></div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;">x =</span>
              <input id="expEqAns" type="number" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="expEqCheck" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#d97706,#f59e0b);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Kontroleer</button>
              <button id="expEqSkip" style="padding:6px 10px;border-radius:7px;border:none;background:rgba(99,102,241,0.20);color:#a5b4fc;font-family:DM Sans,sans-serif;font-size:11px;cursor:pointer;">Slaan oor</button>
              <span id="expEqScore" style="font-family:JetBrains Mono,monospace;font-size:11px;color:rgba(221,225,240,0.45);"></span>
            </div>
            <div id="expEqFb" style="margin-top:8px;font-family:JetBrains Mono,monospace;font-size:13px;min-height:20px;"></div>
          </div>
          <script>
          (function(){
            const bases=[2,3,5,10];let ans,score=0,total=0;
            function newQ(){const b=bases[Math.floor(Math.random()*bases.length)];ans=Math.floor(Math.random()*5)+1;document.getElementById('expEqQ').textContent=b+'ˣ = '+Math.pow(b,ans);document.getElementById('expEqAns').value='';document.getElementById('expEqFb').textContent='';document.getElementById('expEqAns').focus();}
            function check(){const v=parseFloat(document.getElementById('expEqAns').value);if(isNaN(v))return;total++;const ok=Math.abs(v-ans)<0.01;if(ok)score++;document.getElementById('expEqFb').innerHTML=ok?'<span style="color:#6ee7b7;">✓ Korrek! x = '+ans+'</span>':'<span style="color:#fca5a5;">✗ x = '+ans+'</span>';document.getElementById('expEqScore').textContent='Telling: '+score+'/'+total;if(ok)setTimeout(newQ,800);}
            document.getElementById('expEqCheck').addEventListener('click',check);
            document.getElementById('expEqSkip').addEventListener('click',function(){total++;document.getElementById('expEqScore').textContent='Telling: '+score+'/'+total;newQ();});
            document.getElementById('expEqAns').addEventListener('keydown',e=>{if(e.key==='Enter')check();});
            newQ();
          })();
          </script>
        kyk of die koëffisiënt tussen 1 en 10 is. Indien nie, pas die mag van 10 aan.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Skryf 0,000052 in wetenskaplike notasie:", options: ["5,2 × 10⁴", "5,2 × 10⁻⁵", "52 × 10⁻⁶", "0,52 × 10⁻⁴"], answer: 1, topic: "Eksponente" },
        { type: "input", text: "Skryf 7 890 000 in wetenskaplike notasie. Gee die eksponent van 10.", answer: "6", topic: "Eksponente" },
        { type: "mc", text: "Bereken: (4 × 10⁶) × (3 × 10⁵)", options: ["12 × 10¹¹", "1,2 × 10¹²", "7 × 10⁸", "12 × 10⁻⁵"], answer: 1, topic: "Eksponente" },
        { type: "input", text: "Skryf 2,04 × 10⁻³ as 'n desimaal.", answer: "0.00204", topic: "Eksponente" },
        { type: "mc", text: "Vereenvoudig: (6 × 10⁶) ÷ (2 × 10²)", options: ["3 × 10⁴", "3 × 10²", "4 × 10⁴", "3 × 10⁸"], answer: 0, topic: "Eksponente" },
      ]
    },
  ],
  workbook: {
    chapter: 4, chapterName: "Eksponente",
    topics: [
      {
        name: "Wette van Eksponente",
        questions: [
          {
            num: "1",
            text: "Vereenvoudig elke uitdrukking:",
            parts: [
              { label: "a)", text: "x⁵ × x³ ÷ x⁴", marks: 2 },
              { label: "b)", text: "(2a³b)⁴", marks: 3 },
              { label: "c)", text: "3⁰ + 2⁻¹ + 4⁻²", marks: 4 },
              { label: "d)", text: "(x²y⁻³)² ÷ (x⁻¹y)", marks: 5 },
            ]
          },
          {
            num: "2",
            text: "Evalueer sonder 'n sakrekenaar:",
            parts: [
              { label: "a)", text: "2³ × 2⁻¹ × 2⁴", marks: 3 },
              { label: "b)", text: "(3²)³ ÷ 3⁴", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Wetenskaplike Notasie",
        questions: [
          {
            num: "3",
            text: "Skryf in wetenskaplike notasie:",
            parts: [
              { label: "a)", text: "45 300 000", marks: 2 },
              { label: "b)", text: "0,00000082", marks: 2 },
            ]
          },
          {
            num: "4",
            text: "Bereken, en los jou antwoord in wetenskaplike notasie:",
            parts: [
              { label: "a)", text: "(5 × 10⁷) × (6 × 10⁴)", marks: 3 },
              { label: "b)", text: "(9 × 10⁸) ÷ (3 × 10⁻²)", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 4, chapterName: "Hoofstuk 4 — Eksponente",
    topics: [
      {
        name: "Wette van Eksponente",
        answers: [
          { num: "Q1a", ans: "x⁴", note: "5 + 3 - 4 = 4" },
          { num: "Q1b", ans: "16a¹²b⁴", note: "2⁴ = 16; (a³)⁴ = a¹²; b⁴" },
          { num: "Q1c", ans: "1 + 1/2 + 1/16 = 25/16 = 1,5625", note: "1 + 0,5 + 0,0625 = 1,5625" },
          { num: "Q1d", ans: "x⁵/y⁷", note: "x⁴y⁻⁶ ÷ x⁻¹y = x⁵y⁻⁷ = x⁵/y⁷" },
          { num: "Q2a", ans: "64", note: "2^(3-1+4) = 2⁶ = 64" },
          { num: "Q2b", ans: "3² = 9", note: "3⁶ ÷ 3⁴ = 3² = 9" },
        ]
      },
      {
        name: "Wetenskaplike Notasie",
        answers: [
          { num: "Q3a", ans: "4,53 × 10⁷", note: "Die desimaal skuif 7 plekke na links" },
          { num: "Q3b", ans: "8,2 × 10⁻⁷", note: "Die desimaal skuif 7 plekke na regs" },
          { num: "Q4a", ans: "3 × 10¹²", note: "30 × 10¹¹ = 3 × 10¹²" },
          { num: "Q4b", ans: "3 × 10¹⁰", note: "9 ÷ 3 = 3; 10^(8-(-2)) = 10¹⁰" },
        ]
      },
    ]
  }
});
