// Math Magician — Graad 9, Hoofstuk 7 data
// Algebraïese Uitdrukkings (Vereenvoudiging)

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 13,
      chapter: 7,
      name: "Uitbrei en vereenvoudig",
      fullName: "Hakies uitbrei en algebraïese uitdrukkings vereenvoudig",
      lesson: {
        heading: "Uitbrei en vereenvoudig",
        sub: "Hoofstuk 7 · Onderwerp 1",
        body: `
          <p>Algebraïese vereenvoudiging behels die uitbrei van hakies en die versamel van gelyksoortige terme.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleuteltegnieke</div>
            <p>
              <strong>Distributiewe wet:</strong> <span class="math">a(b + c) = ab + ac</span><br>
              <strong>Twee binome uitbrei (FOIL):</strong> <span class="math">(a+b)(c+d) = ac + ad + bc + bd</span><br>
              <strong>Verskil van kwadrate:</strong> <span class="math">(a+b)(a-b) = a² - b²</span><br>
              <strong>Kwadraat van 'n binoom:</strong> <span class="math">(a+b)² = a² + 2ab + b²</span> en <span class="math">(a-b)² = a² - 2ab + b²</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>3x(2x - 5) = 6x² - 15x</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(x + 4)(x - 3) = x² - 3x + 4x - 12 = x² + x - 12</span></div>
            <div class="example-step"><span class="step-num">3</span><span>(2x + 3)² = 4x² + 12x + 9</span></div>
            <div class="example-step"><span class="step-num">4</span><span>(5x - 2)(5x + 2) = 25x² - 4</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Vereenvoudig: (x + 2)² - (x - 1)(x + 3) = x² + 4x + 4 - (x² + 2x - 3) = 2x + 7</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Gee altyd beperkings (waardes van x wat die noemer nul maak) wanneer jy algebraïese breuke vereenvoudig — breuke vereenvoudig — waardes van x wat die noemer nul maak, word van die domein uitgesluit.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Binoom-uitbreider</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Brei (ax + b)(cx + d) stap vir stap uit met EBIL, en versamel dan gelyksoortige terme.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;align-items:center;"><span style="color:#a5b4fc;margin-top:16px;">(</span><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9exA" id="g9exAL">a</label><input id="g9exA" type="number" value="2" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><span style="color:#a5b4fc;margin-top:16px;">x +</span><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9exB" id="g9exBL">b</label><input id="g9exB" type="number" value="3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><span style="color:#a5b4fc;margin-top:16px;">)(</span><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9exC" id="g9exCL">c</label><input id="g9exC" type="number" value="1" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><span style="color:#a5b4fc;margin-top:16px;">x +</span><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9exD" id="g9exDL">d</label><input id="g9exD" type="number" value="-4" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><span style="color:#a5b4fc;margin-top:16px;">)</span></div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;"><button type="button" data-g9ex="1,4,1,-3" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">(x+4)(x−3)</button><button type="button" data-g9ex="2,3,2,3" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">(2x+3)²</button><button type="button" data-g9ex="5,-2,5,2" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">(5x−2)(5x+2)</button><button type="button" data-g9ex="3,0,2,-5" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">3x(2x−5)</button></div>
            <div id="g9exOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function expander(T) {
  var $ = function (id) { return document.getElementById(id); };
  function n(id) { var x = parseFloat($(id).value.replace(',', '.')); return isNaN(x) ? 0 : x; }
  function term(c, v, first) { // signed term like " + 3x", "−x²"
    if (c === 0) return '';
    var abs = Math.abs(c), sign = c < 0 ? (first ? '−' : ' − ') : (first ? '' : ' + ');
    return sign + (abs === 1 && v ? '' : String(abs).replace('.', ',')) + v;
  }
  function poly(a, b, c) { var s = term(a, 'x²', true); s += term(b, 'x', !s); s += term(c, '', !s); return s || '0'; }
  function bin(p, q) { var s = term(p, 'x', true); s += term(q, '', !s); return '(' + (s || '0') + ')'; }
  function run() {
    var a = n('g9exA'), b = n('g9exB'), c = n('g9exC'), d = n('g9exD'), out = $('g9exOut');
    var F = a * c, O = a * d, I = b * c, L = b * d;
    var h = '<div>' + bin(a, b) + bin(c, d) + '</div>' +
      '<div style="color:rgba(221,225,240,0.55);">= ' + T.F + ' ' + poly(F, 0, 0) + ' &nbsp; ' + T.O + ' ' + poly(0, O, 0) + ' &nbsp; ' + T.I + ' ' + poly(0, I, 0) + ' &nbsp; ' + T.L + ' ' + poly(0, 0, L) + '</div>' +
      '<div>= ' + poly(F, 0, 0) + term(O, 'x', false) + term(I, 'x', false) + term(L, '', false) + '</div>' +
      '<div style="color:#6ee7b7;font-size:15px;font-weight:700;">= ' + poly(F, O + I, L) + '</div>';
    var note = '';
    if (a === c && b === -d && b !== 0) note = T.dos;
    else if (a === c && b === d && b !== 0) note = T.sq;
    if (note) h += '<div style="color:#fbbf24;">💡 ' + note + '</div>';
    out.innerHTML = h;
  }
  ['g9exA', 'g9exB', 'g9exC', 'g9exD'].forEach(function (id) { $(id).addEventListener('input', run); });
  document.querySelectorAll('[data-g9ex]').forEach(function (btn) {
    btn.addEventListener('click', function () { var v = btn.getAttribute('data-g9ex').split(','); ['g9exA', 'g9exB', 'g9exC', 'g9exD'].forEach(function (id, i) { $(id).value = v[i]; }); run(); });
  });
  run();
})({"tryit":"Probeer dit","F":"E:","O":"B:","I":"I:","L":"L:","dos":"Verskil van vierkante: (a + b)(a − b) = a² − b², dus kanselleer die middelterme.","sq":"Vierkant van ’n binoom: (a + b)² = a² + 2ab + b²."});
          </script>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Algebraïese Breuk-berekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer 'n waarde van x in om 'n rasionale uitdrukking te bereken. Verken hoe die teller en noemer verander, en identifiseer ongedefinieerde waardes.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Uitdrukking</label>
                <select id="afExpr" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;">
                  <option value="1">(x&#178; &#8722; 9) / (x + 3)</option>
                  <option value="2">(x&#178; &#8722; 4) / (x &#8722; 2)</option>
                  <option value="3">(2x&#178; + x) / x</option>
                  <option value="4">(x&#178; + 5x + 6) / (x + 2)</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);">x-waarde</label>
                <input id="afX" type="number" value="4" step="any" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <button id="afBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="afOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var exprs={
              '1':{label:'(x² - 9) / (x + 3)',num:function(x){return x*x-9;},den:function(x){return x+3;},simplified:'x - 3',restrict:'x ≠ -3'},
              '2':{label:'(x² - 4) / (x - 2)',num:function(x){return x*x-4;},den:function(x){return x-2;},simplified:'x + 2',restrict:'x ≠ 2'},
              '3':{label:'(2x² + x) / x',num:function(x){return 2*x*x+x;},den:function(x){return x;},simplified:'2x + 1',restrict:'x ≠ 0'},
              '4':{label:'(x² + 5x + 6) / (x + 2)',num:function(x){return x*x+5*x+6;},den:function(x){return x+2;},simplified:'x + 3',restrict:'x ≠ -2'},
            };
            function evalF(){
              var key=document.getElementById('afExpr').value;
              var x=parseFloat(document.getElementById('afX').value);
              var e=exprs[key],out=document.getElementById('afOut');
              if(isNaN(x)){out.innerHTML='<span style="color:#fca5a5;">Voer ’n geldige x-waarde in.</span>';return;}
              var n=e.num(x),d=e.den(x);
              if(Math.abs(d)<1e-10){
                out.innerHTML='<div style="color:#fca5a5;">⚠ x = '+x+' maak die noemer 0 → ONGEDEFINIEERD</div><div style="color:rgba(221,225,240,0.45);font-size:11px;">Beperking: '+e.restrict+'</div>';
                return;
              }
              var res=n/d;
              out.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Teller (x='+x+'): </span><span style="color:#a5b4fc;">'+n+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Noemer (x='+x+'): </span><span style="color:#a5b4fc;">'+d+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Resultaat: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+res+'</span></div>',
                '<div style="font-size:11px;color:rgba(221,225,240,0.40);margin-top:4px;">Vereenvoudigde vorm: <span style="color:#fbbf24;">'+e.simplified+'</span> &nbsp;|&nbsp; Beperking: <span style="color:#fca5a5;">'+e.restrict+'</span></div>',
              ].join('');
            }
            document.getElementById('afBtn').addEventListener('click',evalF);
            document.getElementById('afExpr').addEventListener('change',evalF);
            document.getElementById('afX').addEventListener('keydown',function(e){if(e.key==='Enter')evalF();});
            evalF();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Vereenvoudig: 12a²b / (4ab²)", options: ["3a/b", "3b/a", "3ab", "3"], answer: 0, topic: "Algebra" },
        { type: "mc", text: "Vereenvoudig: (x² - 16)/(x + 4)", options: ["x - 4", "x + 4", "x² - 4", "x - 16"], answer: 0, topic: "Algebra" },
        { type: "input", text: "Tel bymekaar: 2/x + 3/(2x). Gee die teller.", answer: "7", topic: "Algebra" },
        { type: "mc", text: "Watter waarde van x moet van (3x)/(x - 5) uitgesluit word?", options: ["3", "0", "5", "-5"], answer: 2, topic: "Algebra" },
        { type: "mc", text: "Vereenvoudig: (x² - 4)/(x - 2) vir x ≠ 2", options: ["x + 2", "x - 2", "x² + 2", "2"], answer: 0, topic: "Algebra" },
        { type: "mc", text: "Vereenvoudig: (x + 5)² - (x - 3)(x + 3)", options: ["10x + 34", "10x + 16", "8x + 34", "10x - 34"], answer: 0, topic: "Algebra" },
        { type: "input", text: "Vereenvoudig: 5/(3x) - 1/(4x) + 1/(6x), en skryf die antwoord as 'n enkele breuk oor 'n noemer van 12x. Gee die teller.", answer: "19", topic: "Algebra" },
      ]
    },
    {
      id: 701,
      chapter: 7,
      name: "Algebraïese taal",
      fullName: "Terme, koëffisiënte, konstantes, eksponente en gelyksoortige terme",
      lesson: {
        heading: "Algebraïese taal",
        sub: "Hoofstuk 7 · Onderwerp 2",
        body: `
<p>Algebra het sy eie woordeskat. As jy die woorde ken, kan jy opdragte volg soos "versamel gelyksoortige terme" of "gee die koëffisiënt van x".</p>
<div class="def-box">
  <div class="def-box-title">📖 Sleutelwoorde</div>
<p>In <span class="math">5x² − 3xy + 7</span>:<br><strong>Terme</strong> word deur + en − geskei: 5x², −3xy en 7.<br><strong>Koëffisiënt</strong>: die getal voor 'n veranderlike. Die koëffisiënt van x² is 5, van xy is −3.<br><strong>Konstante</strong>: 'n term sonder 'n veranderlike, hier 7.<br><strong>Eksponent</strong>: die klein verhewe getal; in 5x² is die eksponent 2.<br><strong>Gelyksoortige terme</strong> het presies dieselfde veranderlikes met dieselfde eksponente: 4a²b en −a²b is gelyksoortig; 4a²b en 4ab² is nie.<br><strong>Monoom</strong>: een term. <strong>Binoom</strong>: twee terme. <strong>Drieterm</strong>: drie terme.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: versamel gelyksoortige terme</div>
  <div class="example-step"><span class="step-num">1</span><span>3x² + 5x − x² + 2 − 8x</span></div>
  <div class="example-step"><span class="step-num">2</span><span>= (3x² − x²) + (5x − 8x) + 2</span></div>
  <div class="example-step"><span class="step-num">3</span><span>= <strong>2x² − 3x + 2</strong>, 'n drieterm.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Volgens konvensie skryf ons eers die getal, dan die veranderlikes in alfabetiese volgorde, en die terme met die hoogste eksponent eerste: skryf 3ab, nie b3a nie.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Wat is die koëffisiënt van x in 4x² − 7x + 2?", "answer": "-7", "topic": "Algebraïese taal"},
        {"type": "mc", "text": "Watter paar is gelyksoortige terme?", "options": ["3x²y and 3xy²", "5a and 5b", "−2pq and 7qp", "4m² and 4m"], "answer": 2, "topic": "Algebraïese taal"},
        {"type": "mc", "text": "x² − 9 is 'n:", "options": ["monoom", "binoom", "drieterm", "konstante"], "answer": 1, "topic": "Algebraïese taal"},
        {"type": "mc", "text": "Vereenvoudig 6a − 2b − 4a + 5b:", "options": ["2a + 3b", "10a + 3b", "2a − 7b", "5ab"], "answer": 0, "topic": "Algebraïese taal"},
        {"type": "input", "text": "Hoeveel terme het 3x³ − x² + 4x − 1?", "answer": "4", "topic": "Algebraïese taal"},
        {"type": "mc", "text": "Vereenvoudig 2x² + 3x − 5x² + x:", "options": ["−3x² + 3x", "7x² + 4x", "−3x⁴ + 4x", "−3x² + 4x"], "answer": 3, "topic": "Algebraïese taal"},
      ]
    },
    {
      id: 702,
      chapter: 7,
      name: "Deel, vervang en wortels van terme",
      fullName: "Deel deur monome, vervanging, en kwadrate, derdemagte en wortels van enkelterme",
      lesson: {
        heading: "Deel, vervang en wortels van terme",
        sub: "Hoofstuk 7 · Onderwerp 3",
        body: `
<p>Om 'n uitdrukking deur 'n monoom te deel, deel <em>elke</em> term daardeur. Om te vervang, plaas die waarde tussen hakies oral waar die veranderlike voorkom.</p>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: deel deur 'n monoom</div>
  <div class="example-step"><span class="step-num">1</span><span><span class="math">(12x³ − 8x² + 4x) ÷ 4x</span></span></div>
  <div class="example-step"><span class="step-num">2</span><span><span class="math">= 12x³/4x − 8x²/4x + 4x/4x = 3x² − 2x + 1</span></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: vervanging</div>
  <div class="example-step"><span class="step-num">1</span><span>Bepaal <span class="math">2a² − 3ab</span> wanneer a = −2 en b = 5.</span></div>
  <div class="example-step"><span class="step-num">2</span><span><span class="math">2(−2)² − 3(−2)(5) = 2(4) + 30 = 38</span></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: wortels van enkelterme</div>
  <div class="example-step"><span class="step-num">1</span><span><span class="math">√(25x⁴) = 5x²</span> want (5x²)² = 25x⁴.</span></div>
  <div class="example-step"><span class="step-num">2</span><span><span class="math">∛(−8a⁶) = −2a²</span> want (−2a²)³ = −8a⁶.</span></div>
  <div class="example-step"><span class="step-num">3</span><span><span class="math">(3y³)² = 9y⁶</span></span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Hakies maak saak wanneer jy negatiewe getalle vervang: as x = −3, dan x² = (−3)² = 9, maar −x² = −9.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "(15x⁴ − 10x²) ÷ 5x² =", "options": ["3x² − 10x²", "3x² − 2", "3x² − 2x", "10x²"], "answer": 1, "topic": "Deel, vervang en wortels van terme"},
        {"type": "input", "text": "Bepaal 3x² − 2x wanneer x = −2.", "answer": "16", "topic": "Deel, vervang en wortels van terme"},
        {"type": "mc", "text": "√(49a⁶) =", "options": ["7a²", "49a³", "7a³", "7a⁴"], "answer": 2, "topic": "Deel, vervang en wortels van terme"},
        {"type": "mc", "text": "(−2x³)³ =", "options": ["−8x⁹", "8x⁹", "−6x⁹", "−8x⁶"], "answer": 0, "topic": "Deel, vervang en wortels van terme"},
        {"type": "input", "text": "Bepaal a² − b² wanneer a = 5 en b = −3.", "answer": "16", "topic": "Deel, vervang en wortels van terme"},
        {"type": "mc", "text": "(8a³b − 4ab²) ÷ (−4ab) =", "options": ["2a² − b", "−2a² − b", "2a² + b", "−2a² + b"], "answer": 3, "topic": "Deel, vervang en wortels van terme"},
      ]
    },
    {
      id: 703,
      chapter: 7,
      name: "Hfst 7 Eksamenfokus",
      fullName: "Eksamenoefening: algebraïese uitdrukkings",
      lesson: {
        heading: "Hfst 7 Eksamenfokus",
        sub: "Hoofstuk 7 · Onderwerp 4",
        body: `
<p>Hierdie vrae meng die hele hoofstuk, soos 'n toets doen. Brei eers hakies uit en versamel dan gelyksoortige terme.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Skryf die reël of formule neer wat jy gebruik, vervang dan, en gee die antwoord met eenhede. Punte word vir elke stap gegee.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Brei uit (x + 4)(x − 3):", "options": ["x² + x − 12", "x² − x − 12", "x² + 7x − 12", "x² − 12"], "answer": 0, "topic": "Hfst 7 Eksamenfokus"},
        {"type": "mc", "text": "Brei uit (2a − 5)²:", "options": ["4a² − 25", "4a² + 25", "4a² − 20a + 25", "2a² − 20a + 25"], "answer": 2, "topic": "Hfst 7 Eksamenfokus"},
        {"type": "mc", "text": "Vereenvoudig 3(x − 2) − 2(x − 5):", "options": ["x − 16", "x + 4", "x − 4", "5x + 4"], "answer": 1, "topic": "Hfst 7 Eksamenfokus"},
        {"type": "input", "text": "Bepaal (2x + 1)(x − 4) wanneer x = 3.", "answer": "-7", "topic": "Hfst 7 Eksamenfokus"},
        {"type": "mc", "text": "Brei uit −2x(3x² − x + 4):", "options": ["−6x³ − 2x² − 8x", "6x³ + 2x² + 8x", "−6x² + 2x − 8", "−6x³ + 2x² − 8x"], "answer": 3, "topic": "Hfst 7 Eksamenfokus"},
        { type: "input", text: "'n Vierkant het sye van x cm. Een paar sye word 3 cm langer gemaak en die ander paar 2 cm korter, sodat 'n reghoek gevorm word. Die reghoek se oppervlakte is 4 cm² meer as die vierkant s'n. Vind x.", answer: "10", topic: "Hfst 7 Eksamenfokus" }
      ]
    },
  ],
  workbook: {
    chapter: 7, chapterName: "Algebraïese Uitdrukkings (Vereenvoudiging)",
    topics: [
      {
        name: "Uitbrei en Vereenvoudig",
        questions: [
          {
            num: "1",
            text: "Brei uit en vereenvoudig:",
            parts: [
              { label: "a)", text: "3x(2x - 5) + x(x + 4)", marks: 3 },
              { label: "b)", text: "(2x - 3)(x + 5)", marks: 3 },
              { label: "c)", text: "(3x + 2)²", marks: 3 },
              { label: "d)", text: "(4x - 1)(4x + 1)", marks: 2 },
              { label: "e)", text: "(x + 4)² - (x - 2)(x + 6)", marks: 5 },
            ]
          },
        ]
      },
      {
        name: "Algebraïese Breuke",
        questions: [
          {
            num: "2",
            text: "Vereenvoudig elke uitdrukking, en gee enige beperkings:",
            parts: [
              { label: "a)", text: "15x³y² / (5x²y⁴)", marks: 3 },
              { label: "b)", text: "(x² - 25) / (x - 5)", marks: 3 },
              { label: "c)", text: "4/(3x) - 2/(5x)", marks: 4 },
              { label: "d)", text: "(2x² - 8) / (x² + x - 6)", marks: 5 },
            ]
          },
        ]
      },
      {
        "name": "Deel, vervang en wortels van terme",
        "questions": [
          {
            "num": "3",
            "text": "Vereenvoudig:",
            "parts": [
              {
                "label": "a)",
                "text": "(18a⁴ − 12a³ + 6a²) ÷ 6a²",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "√(64x⁸y²) + ∛(27x¹²y³)  (x, y > 0)",
                "marks": 3
              },
              {
                "label": "c)",
                "text": "Bepaal die waarde van 2p² − pq + q² wanneer p = −1 en q = 4.",
                "marks": 3
              }
            ]
          }
        ]
      },
    ]
  },
  answerKey: {
    chapter: 7, chapterName: "Hoofstuk 7 — Algebraïese Uitdrukkings",
    topics: [
      {
        name: "Uitbrei en Vereenvoudig",
        answers: [
          { num: "Q1a", ans: "7x² - 11x", note: "6x²-15x + x²+4x = 7x²-11x" },
          { num: "Q1b", ans: "2x² + 7x - 15", note: "FOIL: 2x²+10x-3x-15 = 2x²+7x-15" },
          { num: "Q1c", ans: "9x² + 12x + 4", note: "(3x)²+2(3x)(2)+2²=9x²+12x+4" },
          { num: "Q1d", ans: "16x² - 1", note: "verskil van kwadrate: (4x)²-1²=16x²-1" },
          { num: "Q1e", ans: "4x + 28", note: "x²+8x+16 − (x²+4x−12) = x²+8x+16−x²−4x+12 = 4x+28" },
        ]
      },
      {
        name: "Algebraïese Breuke",
        answers: [
          { num: "Q2a", ans: "3x/y², x ≠ 0, y ≠ 0", note: "15/5 = 3; x³/x² = x; y²/y⁴ = 1/y²" },
          { num: "Q2b", ans: "x + 5, x ≠ 5", note: "(x+5)(x-5)/(x-5) = x+5" },
          { num: "Q2c", ans: "14/(15x), x ≠ 0", note: "KGN=15x: 20/(15x) - 6/(15x) = 14/(15x)" },
          { num: "Q2d", ans: "2(x+2)/(x+3), x ≠ 2, x ≠ -3", note: "2(x+2)(x-2)/(x+3)(x-2) = 2(x+2)/(x+3)" },
        ]
      },
      {
        "name": "Deel, vervang en wortels van terme",
        "answers": [
          {
            "num": "Q3a",
            "ans": "3a² − 2a + 1",
            "note": "Deel elke term deur 6a²"
          },
          {
            "num": "Q3b",
            "ans": "8x⁴y + 3x⁴y = 11x⁴y",
            "note": "√64 = 8, √x⁸ = x⁴; ∛27 = 3, ∛x¹² = x⁴"
          },
          {
            "num": "Q3c",
            "ans": "22",
            "note": "2(1) − (−1)(4) + 16 = 2 + 4 + 16"
          }
        ]
      },
    ]
  }
});
