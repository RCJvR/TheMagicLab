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
          <div class="tip-box"><span class="tip-icon">💡</span><span>Die grondtal moet DIESELFDE wees om die produk- en kwosiëntwette te gebruik. Jy kan nie x³ × y⁵ met hierdie wette vereenvoudig nie.</span></div>
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
              document.getElementById('expOut').innerHTML=isNaN(result)?'<span style="color:#fca5a5;">Nie werklik nie (ewe wortel van ’n negatiewe getal)</span>':[
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
          <div class="tip-box"><span class="tip-icon">💡</span><span>Nadat jy vermenigvuldig/gedeel het, kyk of die koëffisiënt tussen 1 en 10 is. Indien nie, pas die mag van 10 aan.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Wetenskaplike Notasie-omskakelaar en -sakrekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Skakel enige getal om na a × 10ⁿ, en vermenigvuldig of deel dan getalle in wetenskaplike notasie.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snIn" id="g9snInL">Getal</label><input id="g9snIn" type="text" value="3450000" autocomplete="off" style="width:150px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div id="g9snOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;margin-bottom:12px;"></div>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;align-items:center;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snA" id="g9snAL">a</label><input id="g9snA" type="text" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><span style="color:#a5b4fc;margin-top:16px;">× 10^</span><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snM" id="g9snML">m</label><input id="g9snM" type="number" value="5" style="width:50px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snOp">&nbsp;</label><select id="g9snOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;"><option>×</option><option selected>÷</option></select></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snB" id="g9snBL">b</label><input id="g9snB" type="text" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><span style="color:#a5b4fc;margin-top:16px;">× 10^</span><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9snN" id="g9snNL">n</label><input id="g9snN" type="number" value="2" style="width:50px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div id="g9snCalc" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function sciNotation(T) {
  var $ = function (id) { return document.getElementById(id); };
  var SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  function sup(n) { return String(n).split('').map(function (c) { return SUP[c] || c; }).join(''); }
  function dec(x) { return String(x).replace('.', ','); }
  function trim(x) { return parseFloat(x.toPrecision(10)); }
  function sn(x) {
    if (x === 0) return { a: 0, n: 0 };
    var n = Math.floor(Math.log10(Math.abs(x))), a = trim(x / Math.pow(10, n));
    if (Math.abs(a) >= 10) { a = trim(a / 10); n++; }
    if (Math.abs(a) < 1) { a = trim(a * 10); n--; }
    return { a: a, n: n };
  }
  function show(s) { return dec(s.a) + ' × 10' + sup(s.n); }
  function convert() {
    var raw = $('g9snIn').value.replace(/\\s+/g, '').replace(',', '.'), out = $('g9snOut');
    var x = parseFloat(raw);
    if (!raw || isNaN(x) || !/^[-+]?[0-9]*\\.?[0-9]+(e[-+]?[0-9]+)?$/i.test(raw)) { out.innerHTML = '<span style="color:#fca5a5;">' + T.bad + '</span>'; return; }
    var s = sn(x);
    var why = s.n > 0 ? T.left.replace('#', s.n) : s.n < 0 ? T.right.replace('#', -s.n) : T.none;
    out.innerHTML = '<div style="color:#6ee7b7;font-size:15px;font-weight:700;">' + dec(x) + ' = ' + show(s) + '</div><div style="color:rgba(221,225,240,0.55);">' + why + '</div>';
  }
  function calc() {
    var a = parseFloat($('g9snA').value.replace(',', '.')), m = parseInt($('g9snM').value, 10);
    var b = parseFloat($('g9snB').value.replace(',', '.')), n = parseInt($('g9snN').value, 10), op = $('g9snOp').value, out = $('g9snCalc');
    if ([a, m, b, n].some(isNaN) || (op === '÷' && b === 0)) { out.innerHTML = '<span style="color:#fca5a5;">' + T.bad + '</span>'; return; }
    var coef = op === '×' ? trim(a * b) : trim(a / b), p = op === '×' ? m + n : m - n;
    var lines = ['(' + dec(a) + ' ' + op + ' ' + dec(b) + ') × 10' + sup(m) + (op === '×' ? '⁺' : '⁻') + sup(n < 0 ? '(' + n + ')' : n).replace('(', '⁽').replace(')', '⁾'),
      '= ' + dec(coef) + ' × 10' + sup(p)];
    var s = sn(coef);
    if (s.n !== 0) lines.push('= ' + dec(s.a) + ' × 10' + sup(s.n + p) + ' <span style="color:rgba(221,225,240,0.45);">(' + T.adjust + ')</span>');
    out.innerHTML = lines.map(function (l, i) { return '<div' + (i === lines.length - 1 ? ' style="color:#6ee7b7;font-weight:700;"' : '') + '>' + l + '</div>'; }).join('');
  }
  $('g9snIn').addEventListener('input', convert);
  ['g9snA', 'g9snM', 'g9snB', 'g9snN', 'g9snOp'].forEach(function (id) { $(id).addEventListener('input', calc); $(id).addEventListener('change', calc); });
  convert(); calc();
})({"tryit":"Probeer dit","bad":"Voer ’n getal soos 3450000 of 0,00047 in.","left":"Die desimale komma skuif # plek(ke) links, dus is die eksponent positief.","right":"Die desimale komma skuif # plek(ke) regs, dus is die eksponent negatief.","none":"Reeds tussen 1 en 10, dus is die eksponent 0.","adjust":"koëffisiënt aangepas na tussen 1 en 10"});
          </script>
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
    {
      id: 401,
      chapter: 4,
      name: "Vereenvoudig met verskeie wette",
      fullName: "Uitdrukkings vereenvoudig en vergelykings oplos met verskeie eksponentwette",
      lesson: {
        heading: "Vereenvoudig met verskeie wette",
        sub: "Hoofstuk 4 · Onderwerp 3",
        body: `
<p>Die meeste eksamenvrae het meer as een eksponentwet nodig. Werk in 'n vaste volgorde en skryf een wet per stap.</p>
<div class="def-box">
  <div class="def-box-title">📖 'n Betroubare volgorde</div>
<p>1. Verwyder hakies: (ab)ⁿ = aⁿbⁿ en (aᵐ)ⁿ = aᵐⁿ.<br>2. Vermenigvuldig getalle; tel eksponente van dieselfde grondtal bymekaar.<br>3. Deel; trek eksponente af.<br>4. Skryf negatiewe eksponente as breuke: a⁻ⁿ = 1/aⁿ. Finale antwoorde het positiewe eksponente.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: vereenvoudig (2x³)² × 3x⁻⁴ ÷ 6x</div>
  <div class="example-step"><span class="step-num">1</span><span>(2x³)² = 4x⁶</span></div>
  <div class="example-step"><span class="step-num">2</span><span>4x⁶ × 3x⁻⁴ = 12x²</span></div>
  <div class="example-step"><span class="step-num">3</span><span>12x² ÷ 6x = <strong>2x</strong></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: 'n negatiewe eksponent op 'n breuk</div>
  <div class="example-step"><span class="step-num">1</span><span><span class="math">(2/3)⁻² = (3/2)² = 9/4</span>: 'n negatiewe eksponent draai die breuk om.</span></div>
  <div class="example-step"><span class="step-num">2</span><span><span class="math">5⁰ + 2⁻¹ = 1 + 1/2 = 1 1/2</span></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: los op 3ˣ = 81</div>
  <div class="example-step"><span class="step-num">1</span><span>Skryf albei kante met dieselfde grondtal: 81 = 3⁴.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>3ˣ = 3⁴, so <strong>x = 4</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>−2² = −4 maar (−2)² = 4. Die eksponent behoort net aan wat direk voor dit staan.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Vereenvoudig (3a²)³:", "options": ["9a⁶", "3a⁶", "27a⁶", "27a⁵"], "answer": 2, "topic": "Vereenvoudig met verskeie wette"},
        {"type": "mc", "text": "Vereenvoudig 8x⁵ × 2x⁻³ ÷ 4x:", "options": ["4x", "4x²", "16x", "4"], "answer": 0, "topic": "Vereenvoudig met verskeie wette"},
        {"type": "input", "text": "Bereken (2/5)⁻². Gee 'n breuk.", "answer": "25/4", "altAnswers": ["6.25", "6,25", "6 1/4"], "topic": "Vereenvoudig met verskeie wette"},
        {"type": "input", "text": "Los op vir x: 2ˣ = 64", "answer": "6", "topic": "Vereenvoudig met verskeie wette"},
        {"type": "input", "text": "Los op vir x: 5ˣ⁺¹ = 125", "answer": "2", "topic": "Vereenvoudig met verskeie wette"},
        {"type": "input", "text": "Bereken 4⁰ + 4⁻¹ + 4¹. Gee 'n breuk of desimale breuk.", "answer": "5.25", "altAnswers": ["5,25", "21/4", "5 1/4"], "topic": "Vereenvoudig met verskeie wette"},
        {"type": "mc", "text": "Watter een is gelyk aan 1/x³?", "options": ["x⁻⁽¹ᐟ³⁾", "x⁻³", "−x³", "3x⁻¹"], "answer": 1, "topic": "Vereenvoudig met verskeie wette"},
      ]
    },
    {
      id: 402,
      chapter: 4,
      name: "Probleme met wetenskaplike notasie",
      fullName: "Probleme in konteks oplos met getalle in wetenskaplike notasie",
      lesson: {
        heading: "Probleme met wetenskaplike notasie",
        sub: "Hoofstuk 4 · Onderwerp 4",
        body: `
<p>Wetenskaplike notasie maak baie groot en baie klein getalle maklik om te vergelyk en mee te bereken. In konteksvrae: herlei, bereken, en antwoord dan in die eenhede wat gevra word.</p>
<div class="def-box">
  <div class="def-box-title">📖 Getalle in wetenskaplike notasie vergelyk</div>
<p>Vergelyk eers die magte van 10: die groter mag is die groter getal. As die magte gelyk is, vergelyk die eerste dele.<br>bv. 3,2 × 10⁵ &gt; 9,8 × 10⁴, want 10⁵ &gt; 10⁴.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: lig van die Son</div>
  <div class="example-step"><span class="step-num">1</span><span>Lig beweeg 3 × 10⁵ km per sekonde. Die Son is 1,5 × 10⁸ km weg. Hoe lank neem sy lig om ons te bereik?</span></div>
  <div class="example-step"><span class="step-num">2</span><span>tyd = afstand ÷ spoed = (1,5 × 10⁸) ÷ (3 × 10⁵) = 0,5 × 10³ = 5 × 10² s</span></div>
  <div class="example-step"><span class="step-num">3</span><span>= 500 sekondes, 'n bietjie meer as <strong>8 minute</strong>.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: 'n baie klein lengte</div>
  <div class="example-step"><span class="step-num">1</span><span>'n Rooibloedsel is 7 × 10⁻⁶ m breed. Hoeveel pas langs mekaar in 1 cm (10⁻² m)?</span></div>
  <div class="example-step"><span class="step-num">2</span><span>10⁻² ÷ (7 × 10⁻⁶) = (1/7) × 10⁴ ≈ 0,143 × 10⁴ ≈ <strong>1 430 selle</strong></span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>As die eerste deel van jou antwoord nie tussen 1 en 10 is nie, skuif die komma en pas die mag aan: 0,5 × 10³ = 5 × 10².</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Watter getal is die grootste?", "options": ["9,9 × 10³", "5 × 10³", "1,2 × 10³", "1,1 × 10⁴"], "answer": 3, "topic": "Probleme met wetenskaplike notasie"},
        {"type": "input", "text": "Bereken (4 × 10⁶) × (2 × 10⁻²). Gee die antwoord as 'n gewone getal.", "answer": "80000", "altAnswers": ["8 × 10^4", "8×10^4", "8 x 10^4"], "topic": "Probleme met wetenskaplike notasie"},
        {"type": "mc", "text": "(6 × 10⁸) ÷ (3 × 10²) =", "options": ["2 × 10⁶", "2 × 10⁴", "3 × 10⁶", "2 × 10¹⁰"], "answer": 0, "topic": "Probleme met wetenskaplike notasie"},
        {"type": "mc", "text": "Suid-Afrika het ongeveer 63 000 000 mense. In wetenskaplike notasie is dit:", "options": ["63 × 10⁶", "6,3 × 10⁶", "6,3 × 10⁷", "0,63 × 10⁸"], "answer": 2, "topic": "Probleme met wetenskaplike notasie"},
        {"type": "input", "text": "'n Virus is 1,2 × 10⁻⁷ m lank. Skryf dit as 'n gewone getal. (m)", "answer": "0.00000012", "altAnswers": ["0,00000012"], "topic": "Probleme met wetenskaplike notasie"},
        {"type": "input", "text": "Klank beweeg 3,4 × 10² m per sekonde. Hoe ver beweeg dit in 5 sekondes? Gee 'n gewone getal. (m)", "answer": "1700", "topic": "Probleme met wetenskaplike notasie"},
      ]
    },
    {
      id: 403,
      chapter: 4,
      name: "Hfst 4 Eksamenfokus",
      fullName: "Eksamenoefening: eksponente en wetenskaplike notasie",
      lesson: {
        heading: "Hfst 4 Eksamenfokus",
        sub: "Hoofstuk 4 · Onderwerp 5",
        body: `
<p>Hierdie vrae meng die hele hoofstuk, soos 'n toets doen. Gebruik een eksponentwet per reël en gee antwoorde met positiewe eksponente.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Skryf die reël of formule neer wat jy gebruik, vervang dan, en gee die antwoord met eenhede. Punte word vir elke stap gegee.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Vereenvoudig (x²y)³ ÷ x⁴y:", "options": ["x²y³", "x²y²", "xy²", "x¹⁰y³"], "answer": 1, "topic": "Hfst 4 Eksamenfokus"},
        {"type": "input", "text": "Bereken 3⁻² × 3⁴.", "answer": "9", "topic": "Hfst 4 Eksamenfokus"},
        {"type": "input", "text": "Bereken (−1)¹⁰¹ + (−1)¹⁰⁰.", "answer": "0", "topic": "Hfst 4 Eksamenfokus"},
        {"type": "input", "text": "Los op vir x: 10ˣ = 0,001", "answer": "-3", "topic": "Hfst 4 Eksamenfokus"},
        {"type": "mc", "text": "0,000 506 in wetenskaplike notasie is:", "options": ["5,06 × 10⁴", "5,06 × 10⁻⁴", "50,6 × 10⁻⁵", "5,06 × 10⁻³"], "answer": 1, "topic": "Hfst 4 Eksamenfokus"},
        {"type": "mc", "text": "Vereenvoudig 2ⁿ × 4ⁿ ÷ 8ⁿ:", "options": ["1", "2ⁿ", "8ⁿ", "0"], "answer": 0, "topic": "Hfst 4 Eksamenfokus"},
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
      {
        "name": "Vereenvoudig met verskeie wette",
        "questions": [
          {
            "num": "5",
            "text": "Vereenvoudig. Laat antwoorde met positiewe eksponente.",
            "parts": [
              {
                "label": "a)",
                "text": "(−2a³b)² × 5ab⁻⁴",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "(3x²)³ ÷ (9x⁸)",
                "marks": 3
              },
              {
                "label": "c)",
                "text": "Los op: 2ˣ⁻¹ = 1/16",
                "marks": 3
              }
            ]
          }
        ]
      },
      {
        "name": "Probleme met wetenskaplike notasie",
        "questions": [
          {
            "num": "6",
            "text": "Die Aarde is omtrent 1,5 × 10⁸ km van die Son af, en Mars omtrent 2,3 × 10⁸ km.",
            "parts": [
              {
                "label": "a)",
                "text": "Hoeveel verder van die Son af is Mars as die Aarde? Antwoord in wetenskaplike notasie.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "'n Ruimtetuig beweeg 4 × 10⁴ km per uur. Hoeveel uur neem dit om daardie ekstra afstand af te lê?",
                "marks": 3
              }
            ]
          }
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
      {
        "name": "Vereenvoudig met verskeie wette",
        "answers": [
          {
            "num": "Q5a",
            "ans": "20a⁷ / b²",
            "note": "4a⁶b² × 5ab⁻⁴ = 20a⁷b⁻²"
          },
          {
            "num": "Q5b",
            "ans": "3 / x²",
            "note": "27x⁶ ÷ 9x⁸ = 3x⁻²"
          },
          {
            "num": "Q5c",
            "ans": "x = −3",
            "note": "1/16 = 2⁻⁴, so x − 1 = −4"
          }
        ]
      },
      {
        "name": "Probleme met wetenskaplike notasie",
        "answers": [
          {
            "num": "Q6a",
            "ans": "8 × 10⁷ km",
            "note": "2,3 × 10⁸ − 1,5 × 10⁸ = 0,8 × 10⁸"
          },
          {
            "num": "Q6b",
            "ans": "2 000 uur (2 × 10³)",
            "note": "8 × 10⁷ ÷ 4 × 10⁴ = 2 × 10³"
          }
        ]
      },
    ]
  }
});
