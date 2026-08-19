// Math Magician — Grade 8, Chapter 11 data
// Common Fractions

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 1101,
      chapter: 11,
      name: "Hersiening van breuke",
      fullName: "Hersiening van basiese konsepte rakende breuke",
      lesson: {
        heading: "Hersiening van basiese konsepte rakende breuke",
        sub: "Hoofstuk 11 · Onderwerp 1",
        body: `
          <p>'n <strong>Breuk</strong> verteenwoordig 'n deel van 'n geheel. Om breukkonsepte te bemeester is noodsaaklik vir algebra, verhoudings, en persentasies.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelwoordeskat</div>
            <p>
              <strong>Teller:</strong> boonste getal — hoeveel dele.<br>
              <strong>Noemer:</strong> onderste getal — totale gelyke dele.<br>
              <strong>Gewone breuk:</strong> teller &lt; noemer. bv. <span class="math">3/5</span><br>
              <strong>Onegte breuk:</strong> teller &gt; noemer. bv. <span class="math">7/4</span><br>
              <strong>Gemengde getal:</strong> heelgetal + breuk. bv. <span class="math">1¾</span><br>
              <strong>Ekwivalente breuke:</strong> dieselfde waarde, verskillende vorm. bv. <span class="math">2/4 = 1/2</span><br>
              <strong>Eenvoudigste vorm:</strong> teller en noemer het geen gemeenskaplike faktor behalwe 1 nie.<br><br>
              <strong>Omskakeling gemengd → onegte:</strong> <span class="math">2¾ = (2×4+3)/4 = 11/4</span><br>
              <strong>Omskakeling onegte → gemengd:</strong> <span class="math">11/4 = 2 res 3 = 2¾</span>
            </p>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Breukvereenvoudiger</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer 'n breuk in om dit te vereenvoudig en na 'n gemengde getal om te skakel indien nodig.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="fsNum" type="number" value="18" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-size:18px;">/</span>
              <input id="fsDen" type="number" value="24" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="fsBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Vereenvoudig</button>
            </div>
            <div id="fsOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){return b===0?a:gcd(b,a%b);}
            function simplify(){
              let n=parseInt(document.getElementById('fsNum').value);
              let d=parseInt(document.getElementById('fsDen').value);
              const el=document.getElementById('fsOut');
              if(!d||d===0){el.innerHTML='<span style="color:#fca5a5;">Noemer kan nie 0 wees nie.</span>';return;}
              const neg=((n<0)!==(d<0));
              n=Math.abs(n);d=Math.abs(d);
              const g=gcd(n,d);
              const sn=(neg?-1:1)*(n/g);
              const sd=d/g;
              let html='<div><span style="opacity:0.5;">GGD('+n+','+d+') = </span><span style="color:#fbbf24;">'+g+'</span></div>';
              html+='<div><span style="opacity:0.5;">Vereenvoudig: </span><span style="color:#6ee7b7;font-size:14px;">'+sn+'/'+sd+'</span></div>';
              if(Math.abs(sn)>sd){
                const whole=Math.trunc(sn/sd);
                const rem=Math.abs(sn)%sd;
                if(rem!==0) html+='<div><span style="opacity:0.5;">Gemengde getal: </span><span style="color:#a5b4fc;">'+whole+' '+rem+'/'+sd+'</span></div>';
              }
              el.innerHTML=html;
            }
            document.getElementById('fsBtn').addEventListener('click',simplify);
            simplify();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vereenvoudig breuke altyd deur die teller en noemer deur hul <strong>Grootste Gemene Deler (GGD)</strong> te deel. Kontroleer: kan ek albei deur 2 deel? deur 3? deur 5?</span></div>
        `
      },
      questions: [
        { type: "input", text: "Vereenvoudig 18/24 tot sy eenvoudigste vorm (skryf as a/b).", answer: "3/4", topic: "Breuke" },
        { type: "mc", text: "Skakel 2¾ om na 'n onegte breuk.", options: ["9/4", "11/4", "10/4", "8/4"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Skakel 17/5 om na 'n gemengde getal (skryf as a b/c, bv. 3 2/5).", answer: "3 2/5", topic: "Breuke" },
        { type: "mc", text: "Watter breuk is ekwivalent aan 2/3?", options: ["4/9", "6/9", "6/12", "4/6"], answer: 3, topic: "Breuke" },
        { type: "input", text: "Wat is die GGD van 36 en 48?", answer: "12", topic: "Breuke" },
        { type: "input", text: "Skakel 47/6 om na 'n gemengde getal, en gee dan slegs die heelgetal-deel.", answer: "7", topic: "Breuke" },
        { type: "input", text: "24/32 en 30/40 vereenvoudig albei tot dieselfde breuk in eenvoudigste vorm. Wat is daardie eenvoudigste vorm (skryf as a/b)?", answer: "3/4", topic: "Breuke" },
      ]
    },
    {
      id: 1102,
      chapter: 11,
      name: "Optel en aftrek van breuke",
      fullName: "Optelling en aftrekking van breuke",
      lesson: {
        heading: "Optelling en aftrekking van breuke",
        sub: "Hoofstuk 11 · Onderwerp 2",
        body: `
          <p>Om breuke op te tel of af te trek, moet hulle dieselfde <strong>noemer</strong> hê (KGN — Kleinste Gemene Noemer).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Stappe</div>
            <p>
              1. Bepaal die KGN van al die noemers.<br>
              2. Skakel elke breuk om na 'n ekwivalente breuk met die KGN.<br>
              3. Tel op of trek slegs die tellers af.<br>
              4. Vereenvoudig die antwoord.<br>
              5. Skakel om na 'n gemengde getal indien nodig.<br><br>
              <strong>Gemengde getalle:</strong> skakel eers om na onegte breuke, volg dan die stappe hierbo.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">2/3 + 3/4</span>: KGN = 12 → <span class="math">8/12 + 9/12 = 17/12 = 1 5/12</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">3½ − 1¾</span>: skakel om → <span class="math">7/2 − 7/4 = 14/4 − 7/4 = 7/4 = 1¾</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">1/2 + 2/3 − 1/4</span>: KGN = 12 → <span class="math">6/12 + 8/12 − 3/12 = 11/12</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Bepaal die KGN deur veelvoude van elke noemer te lys totdat jy die eerste een vind wat hulle deel. bv. vir 3 en 4: veelvoude van 4 is 4, 8, <strong>12</strong>; 12 ÷ 3 = 4 ✓</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken 1/2 + 2/3. Gee jou antwoord as 'n vereenvoudigde breuk (a/b).", answer: "7/6", topic: "Breuke" },
        { type: "mc", text: "Bereken 3/4 − 1/3.", options: ["2/12", "5/12", "8/12", "1/6"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Bereken 2½ + 1¾. Gee die antwoord as 'n gemengde getal (bv. 4 1/4).", answer: "4 1/4", topic: "Breuke" },
        { type: "mc", text: "Wat is die KGN van 4, 6, en 8?", options: ["48", "24", "12", "16"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Bereken 5/6 − 3/4. Gee as 'n vereenvoudigde breuk (a/b).", answer: "1/12", topic: "Breuke" },
        { type: "input", text: "Bereken 2⅓ − 1½ + ¾. Gee as 'n gemengde getal (bv. 1 7/12).", answer: "1 7/12", topic: "Breuke" },
        { type: "input", text: "'n Resep benodig 2¾ koppies meel, maar jy het slegs 'n ⅔ koppie-skepper. Hoeveel volle skeppe kan jy gebruik voordat jy oor 2¾ koppies sou gaan?", answer: "4", topic: "Breuke" },
      ]
    },
    {
      id: 1103,
      chapter: 11,
      name: "Vermenigvuldiging van breuke",
      fullName: "Vermenigvuldiging van breuke",
      lesson: {
        heading: "Vermenigvuldiging van breuke",
        sub: "Hoofstuk 11 · Onderwerp 3",
        body: `
          <p>Die vermenigvuldiging van breuke is eenvoudig: vermenigvuldig tellers met mekaar en noemers met mekaar.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Reëls</div>
            <p>
              <strong>Breuk × breuk:</strong> <span class="math">a/b × c/d = ac/bd</span><br>
              <strong>Vereenvoudig eers</strong> (kruis-kanselleer) om die getalle klein te hou.<br>
              <strong>Gemengde getalle:</strong> skakel eers om na onegte breuke.<br>
              <strong>Heelgetal × breuk:</strong> skryf die heelgetal as n/1.<br><br>
              <strong>Voorbeeld:</strong> <span class="math">3/4 × 8/9</span><br>
              Kruis-kanselleer: 4 en 8 deel faktor 4 → <span class="math">3/1 × 2/9</span><br>
              Dan: 3 en 9 deel faktor 3 → <span class="math">1/1 × 2/3 = 2/3</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">2/3 × 3/5 = 6/15 = 2/5</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">1½ × 2⅔</span>: skakel om → <span class="math">3/2 × 8/3 = 24/6 = 4</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Bepaal ¾ van 40: <span class="math">3/4 × 40 = 120/4 = 30</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>"Van" beteken vermenigvuldig: "¾ van 24" = <span class="math">3/4 × 24 = 18</span>. Dit kom gedurig in woordprobleme voor.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken 3/5 × 10/9. Vereenvoudig jou antwoord (skryf as a/b of heelgetal).", answer: "2/3", topic: "Breuke" },
        { type: "mc", text: "Bereken 1½ × 2⅔.", options: ["3", "4", "3½", "4½"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Bepaal ¾ van 48.", answer: "36", topic: "Breuke" },
        { type: "mc", text: "Bereken 5/6 × 3/10.", options: ["8/16", "15/60", "1/4", "1/3"], answer: 2, topic: "Breuke" },
        { type: "input", text: "Bereken 2⅓ × 1½. Gee as 'n gemengde getal.", answer: "3 1/2", topic: "Breuke" },
        { type: "input", text: "Bereken 2⅖ × 1⅚. Gee as 'n gemengde getal.", answer: "4 2/5", topic: "Breuke" },
        { type: "input", text: "'n Tenk is ⅗ vol water. ⅔ van daardie water word dan gebruik. Watter breukdeel van die tenk se volle kapasiteit is gebruik? Gee as 'n vereenvoudigde breuk.", answer: "2/5", topic: "Breuke" },
      ]
    },
    {
      id: 1104,
      chapter: 11,
      name: "Deling van breuke",
      fullName: "Deling van breuke",
      lesson: {
        heading: "Deling van breuke",
        sub: "Hoofstuk 11 · Onderwerp 4",
        body: `
          <p>Om deur 'n breuk te deel, is dieselfde as om met sy <strong>omgekeerde</strong> te vermenigvuldig (draai die tweede breuk om).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Reëls</div>
            <p>
              <strong>Omgekeerde:</strong> draai die breuk om. Die omgekeerde van <span class="math">3/4</span> is <span class="math">4/3</span>.<br>
              <strong>Delingsreël:</strong> <span class="math">a/b ÷ c/d = a/b × d/c</span><br>
              <strong>Gemengde getalle:</strong> skakel eers om na onegte breuke, pas dan die reël toe.<br><br>
              <strong>Geheuetruuk:</strong> <em>Hou, Verander, Draai</em><br>
              Hou die eerste breuk → Verander ÷ na × → Draai die tweede breuk om.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">3/4 ÷ 2/3</span>: Hou 3/4 → × → Draai om na 3/2 → <span class="math">3/4 × 3/2 = 9/8 = 1⅛</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">2½ ÷ 1¼</span>: → <span class="math">5/2 ÷ 5/4 = 5/2 × 4/5 = 20/10 = 2</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">6 ÷ 3/4 = 6/1 × 4/3 = 24/3 = 8</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Om deur 'n breuk kleiner as 1 te deel, gee 'n groter antwoord (jy sien hoeveel keer 'n klein deel in iets pas). Dit is 'n goeie manier om te toets: maak my antwoord sin?</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken 3/4 ÷ 3/8. Skryf die antwoord as 'n heelgetal of vereenvoudigde breuk.", answer: "2", topic: "Breuke" },
        { type: "mc", text: "Bereken 2½ ÷ 1¼.", options: ["2", "1", "3", "3½"], answer: 0, topic: "Breuke" },
        { type: "input", text: "Wat is die omgekeerde van 5/8? (skryf as a/b)", answer: "8/5", topic: "Breuke" },
        { type: "mc", text: "Bereken 4 ÷ 2/3.", options: ["8/3", "6", "2/12", "3"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Bereken 7/8 ÷ 7/4. Vereenvoudig jou antwoord.", answer: "1/2", topic: "Breuke" },
        { type: "input", text: "Bereken 3⅗ ÷ 1⅘. Gee as 'n heelgetal of vereenvoudigde breuk.", answer: "2", topic: "Breuke" },
        { type: "input", text: "'n Lint is 5 m lank. Dit word in stukke gesny wat elk ¾ m lank is. Hoeveel volle stukke kan gesny word?", answer: "6", topic: "Breuke" },
      ]
    },
    {
      id: 1105,
      chapter: 11,
      name: "Kwadrate, kubusse, wortels",
      fullName: "Kwadrate, vierkantswortels, kubusse, en derdemagswortels",
      lesson: {
        heading: "Kwadrate, vierkantswortels, kubusse, en derdemagswortels",
        sub: "Hoofstuk 11 · Onderwerp 5",
        body: `
          <p>Hierdie bewerkings geld vir breuke net soos vir heelgetalle.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Reëls vir breuke</div>
            <p>
              <strong>Kwadraat:</strong> <span class="math">(a/b)² = a²/b²</span><br>
              <strong>Vierkantswortel:</strong> <span class="math">√(a/b) = √a/√b</span><br>
              <strong>Kubus:</strong> <span class="math">(a/b)³ = a³/b³</span><br>
              <strong>Derdemagswortel:</strong> <span class="math">∛(a/b) = ∛a/∛b</span><br><br>
              <strong>Voorbeelde:</strong><br>
              <span class="math">(2/3)² = 4/9</span><br>
              <span class="math">√(9/16) = 3/4</span><br>
              <span class="math">(1/2)³ = 1/8</span><br>
              <span class="math">∛(8/27) = 2/3</span>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Kwadreer (of kubeer) altyd die teller en noemer apart. Moenie net een deel van die breuk kwadreer nie.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken (3/4)². Skryf as a/b.", answer: "9/16", topic: "Breuke" },
        { type: "mc", text: "Bereken √(25/49).", options: ["5/7", "25/49", "5/49", "25/7"], answer: 0, topic: "Breuke" },
        { type: "input", text: "Bereken (2/3)³. Skryf as a/b.", answer: "8/27", topic: "Breuke" },
        { type: "mc", text: "Bereken ∛(27/64).", options: ["9/16", "3/4", "27/64", "3/8"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Bereken √(4/9) + (1/2)². Skryf as 'n vereenvoudigde breuk.", answer: "11/12", topic: "Breuke" },
        { type: "input", text: "Bereken (2/3)² + √(1/4) − (1/2)³. Skryf as 'n vereenvoudigde breuk.", answer: "59/72", topic: "Breuke" },
        { type: "input", text: "Gegee dat √(9/16) = 3/4, bereken 2 × √(9/16) − (1/2)². Gee as 'n gemengde getal of vereenvoudigde breuk.", answer: "5/4", topic: "Breuke" },
      ]
    },
    {
      id: 1106,
      chapter: 11,
      name: "Gemengde berekeninge",
      fullName: "Gemengde berekeninge met breuke",
      lesson: {
        heading: "Gemengde berekeninge met breuke",
        sub: "Hoofstuk 11 · Onderwerp 6",
        body: `
          <p>Gemengde berekeninge kombineer al vier bewerkings met breuke en vereis korrekte toepassing van die <strong>volgorde van bewerkings (BODMAS/BEDMAS)</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Volgorde van bewerkings</div>
            <p>
              <strong>H</strong>akies → <strong>M</strong>agte/wortels → <strong>D</strong>eling → <strong>V</strong>ermenigvuldiging → <strong>O</strong>ptelling → <strong>A</strong>ftrekking<br><br>
              Werk van links na regs binne elke vlak. Gemengde getalle moet omgeskakel word voordat bewerkings toegepas word.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>Bereken: <span class="math">½ + ¾ × 2/3 − (1/4)²</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Magte/wortels eerste: <span class="math">(1/4)² = 1/16</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Vermenigvuldig: <span class="math">¾ × 2/3 = 6/12 = 1/2</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Tel nou op/trek af: <span class="math">1/2 + 1/2 − 1/16 = 1 − 1/16 = 15/16</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Skryf elke stap neer — selfs al kan jy dele in jou kop doen. Een foutjie in 'n gemengde berekening verloor veelvuldige punte, maar duidelike berekeninge verdien metodepunte selfs al is die finale antwoord verkeerd.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken ½ + ¼ × 2. Vereenvoudig jou antwoord.", answer: "1", topic: "Breuke" },
        { type: "mc", text: "Bereken (2/3)² + 1/3.", options: ["7/9", "1", "5/9", "1 1/9"], answer: 0, topic: "Breuke" },
        { type: "input", text: "Bereken 1½ × 2/3 + ¼. Gee as 'n vereenvoudigde breuk.", answer: "5/4", topic: "Breuke" },
        { type: "mc", text: "Bereken 3/4 ÷ 1/2 − 1/4.", options: ["1", "1¼", "1½", "¾"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Bereken √(1/4) + (1/3)³. Skryf as 'n vereenvoudigde breuk.", answer: "55/108", topic: "Breuke" },
        { type: "input", text: "Bereken: (1/2)² + 2/3 ÷ 1/6 − 1/4. Gee as 'n heelgetal of vereenvoudigde breuk.", answer: "4", topic: "Breuke" },
        { type: "input", text: "Bereken: [1½ + 2¼] ÷ [1/2 × 3/2] − 1. Gee as 'n heelgetal of vereenvoudigde breuk.", answer: "4", topic: "Breuke" },
      ]
    },
    {
      id: 1107,
      chapter: 11,
      name: "Getalle as breuke",
      fullName: "Getalle as breuke van getalle",
      lesson: {
        heading: "Getalle as breuke van getalle",
        sub: "Hoofstuk 11 · Onderwerp 7",
        body: `
          <p>Om een getal as 'n breuk van 'n ander uit te druk, skryf die eerste getal oor die tweede en vereenvoudig.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Metode</div>
            <p>
              <strong>A as 'n breuk van B:</strong> <span class="math">A/B</span> (vereenvoudig)<br><br>
              <strong>Voorbeeld 1:</strong> Druk 15 as 'n breuk van 20 uit.<br>
              <span class="math">15/20 = 3/4</span><br><br>
              <strong>Voorbeeld 2:</strong> Druk 45 minute as 'n breuk van 1 uur uit.<br>
              Skakel eers om na dieselfde eenhede: 1 uur = 60 min.<br>
              <span class="math">45/60 = 3/4</span><br><br>
              <strong>Voorbeeld 3:</strong> Druk 600 m as 'n breuk van 2 km uit.<br>
              2 km = 2000 m → <span class="math">600/2000 = 3/10</span>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Skakel altyd om na <strong>dieselfde eenheid</strong> voordat jy een hoeveelheid as 'n breuk van 'n ander skryf. Gemengde eenhede gee die verkeerde antwoord.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Druk 18 as 'n breuk van 24 uit. Vereenvoudig.", answer: "3/4", topic: "Breuke" },
        { type: "mc", text: "Druk 30 minute as 'n breuk van 2 uur uit.", options: ["3/4", "1/4", "1/2", "15/60"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Druk 400 m as 'n breuk van 2 km uit. Vereenvoudig.", answer: "1/5", topic: "Breuke" },
        { type: "mc", text: "In 'n klas van 32 leerders is 20 meisies. Watter breuk is seuns?", options: ["5/8", "3/8", "5/16", "5/12"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Druk 750 g as 'n breuk van 2 kg uit. Vereenvoudig.", answer: "3/8", topic: "Breuke" },
        { type: "input", text: "'n Resep gebruik 350 g meel uit 'n 2 kg-sak. Watter breukdeel van die sak is gebruik? Vereenvoudig.", answer: "7/40", topic: "Breuke" },
        { type: "input", text: "In 'n skool van 480 leerders is ⅜ in die Grondslagfase en die res word gelykop tussen die Intermediêre en Senior Fases gedeel. Hoeveel leerders is in die Senior Fase?", answer: "150", topic: "Breuke" },
      ]
    },
    {
      id: 1108,
      chapter: 11,
      name: "Breuke en persentasies",
      fullName: "Berekeninge met breuke en persentasies",
      lesson: {
        heading: "Berekeninge met breuke en persentasies",
        sub: "Hoofstuk 11 · Onderwerp 8",
        body: `
          <p>Persentasies is breuke met noemer 100. Om tussen breuke en persentasies om te skakel is 'n sleutelvaardigheid.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Omskakelings</div>
            <p>
              <strong>Breuk → %:</strong> vermenigvuldig met 100. bv. <span class="math">3/4 × 100 = 75%</span><br>
              <strong>% → breuk:</strong> skryf oor 100 en vereenvoudig. bv. <span class="math">35% = 35/100 = 7/20</span><br><br>
              <strong>Bepaal 'n persentasie van 'n bedrag:</strong><br>
              bv. 15% van R240 = <span class="math">15/100 × 240 = R36</span><br><br>
              <strong>Uitdruk as 'n persentasie:</strong><br>
              bv. 18 uit 25 = <span class="math">18/25 × 100 = 72%</span>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>10% van enige bedrag = deel deur 10. Van daar: 5% = die helfte van 10%, 20% = dubbel 10%, 15% = 10% + 5%. Kopwerk-kortpaaie spaar tyd in eksamens.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Skakel 3/5 om na 'n persentasie.", answer: "60", topic: "Breuke" },
        { type: "mc", text: "Skakel 45% om na 'n breuk in eenvoudigste vorm.", options: ["45/100", "9/20", "4/5", "9/10"], answer: 1, topic: "Breuke" },
        { type: "input", text: "Bereken 20% van R350.", answer: "70", topic: "Breuke" },
        { type: "mc", text: "Druk 24 uit 40 as 'n persentasie uit.", options: ["48%", "50%", "60%", "64%"], answer: 2, topic: "Breuke" },
        { type: "input", text: "'n Hemp kos R180. Dit word met 15% afgeslaan. Wat is die kortingbedrag in Rand?", answer: "27", topic: "Breuke" },
        { type: "input", text: "'n Toets het 40 vrae. 'n Leerder beantwoord 34 korrek. Druk dit as 'n persentasie uit, en bepaal dan hoeveel meer korrekte antwoorde nodig was om 90% te bereik.", answer: "2", topic: "Breuke" },
        { type: "input", text: "In 'n opname van 240 mense verkies 40% tee en ⅓ verkies koffie. Die res verkies nie een van die twee nie. Hoeveel mense verkies geeneen nie?", answer: "64", topic: "Breuke" },
      ]
    },
    {
      id: 1109,
      chapter: 11,
      name: "Persentasietoename en -afname",
      fullName: "Persentasietoename en persentasie-afname",
      lesson: {
        heading: "Persentasietoename en persentasie-afname",
        sub: "Hoofstuk 11 · Onderwerp 9",
        body: `
          <p>Persentasietoename en -afname word in finansies, wetenskap, en die alledaagse lewe gebruik om te beskryf hoe hoeveelhede verander.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Formules</div>
            <p>
              <strong>% toename:</strong> <span class="math">% verandering = (toename / oorspronklike) × 100</span><br>
              <strong>% afname:</strong> <span class="math">% verandering = (afname / oorspronklike) × 100</span><br><br>
              <strong>Nuwe waarde na % toename:</strong><br>
              <span class="math">nuwe = oorspronklike × (1 + %/100)</span><br>
              bv. R200 verhoog met 10%: <span class="math">200 × 1.10 = R220</span><br><br>
              <strong>Nuwe waarde na % afname:</strong><br>
              <span class="math">nuwe = oorspronklike × (1 − %/100)</span><br>
              bv. R200 verminder met 10%: <span class="math">200 × 0.90 = R180</span>
            </p>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — %-veranderingberekenaar</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px;margin-top:8px;">
              <div style="display:flex;flex-direction:column;gap:3px;"><label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">Oorspronklik</label><input id="pcOrig" type="number" value="200" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:3px;"><label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">%-bedrag</label><input id="pcPct" type="number" value="15" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:3px;"><label style="font-size:10px;color:rgba(221,225,240,0.40);text-transform:uppercase;">Tipe</label>
              <select id="pcType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;"><option value="inc">Toename</option><option value="dec">Afname</option></select></div>
              <button id="pcBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="pcOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2.2;color:rgba(221,225,240,0.80);"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const orig=parseFloat(document.getElementById('pcOrig').value);
              const pct=parseFloat(document.getElementById('pcPct').value);
              const type=document.getElementById('pcType').value;
              const el=document.getElementById('pcOut');
              if(isNaN(orig)||isNaN(pct)){el.innerHTML='<span style="color:#fca5a5;">Voer geldige getalle in.</span>';return;}
              const change=orig*pct/100;
              const nv=type==='inc'?orig+change:orig-change;
              el.innerHTML='<div><span style="opacity:0.5;">'+(type==='inc'?'Toename':'Afname')+' = '+orig+' × '+pct+'% = </span><span style="color:#fbbf24;">'+change.toFixed(2)+'</span></div>'+
                '<div><span style="opacity:0.5;">Nuwe waarde = '+orig+(type==='inc'?'+':'-')+change.toFixed(2)+' = </span><span style="color:#6ee7b7;font-size:14px;">'+nv.toFixed(2)+'</span></div>';
            }
            document.getElementById('pcBtn').addEventListener('click',calc);

          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Om die persentasieverandering te bepaal: <em>verandering ÷ oorspronklike × 100</em>. Die oorspronklike (beginwaarde) is altyd die noemer — nooit die nuwe waarde nie.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Verhoog R350 met 20%. Wat is die nuwe bedrag?", answer: "420", topic: "Breuke" },
        { type: "mc", text: "'n Prys daal van R80 na R64. Wat is die persentasie-afname?", options: ["16%", "20%", "25%", "80%"], answer: 1, topic: "Breuke" },
        { type: "input", text: "'n Salaris van R12 000 word met 8% verhoog. Wat is die nuwe salaris?", answer: "12960", topic: "Breuke" },
        { type: "mc", text: "'n TV kos R2 400 na 'n 25%-korting. Wat was die oorspronklike prys?", options: ["R3 000", "R3 100", "R3 200", "R2 900"], answer: 2, topic: "Breuke" },
        { type: "input", text: "'n Waarde styg van 150 na 180. Wat is die persentasietoename?", answer: "20", topic: "Breuke" },
        { type: "input", text: "'n Bevolking van 8 000 neem in jaar een met 15% toe, en neem dan in jaar twee met 10% af. Bepaal die bevolking aan die einde van jaar twee.", answer: "8280", topic: "Breuke" },
        { type: "input", text: "'n Prys van R500 word met 20% verhoog en dan met 20% verlaag. Wat is die finale prys?", answer: "480", topic: "Breuke" },
      ]
    },
    {
      id: 1110,
      chapter: 11,
      name: "H11 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 11 — Eksamenfokus",
        sub: "Hoofstuk 11 · Hersiening",
        body: `
          <p>Breuk-eksamens meng al die bewerkings, omskakelings, en persentasieberekeninge. Wys elke stap — 'n verkeerde finale antwoord met korrekte berekeninge verdien steeds metodepunte.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 11-opsomming</div>
            <p>
              ✅ Vereenvoudig: deel teller en noemer deur die GGD<br>
              ✅ Optel/Aftrek: bepaal die KGN, skakel om, werk dan met tellers<br>
              ✅ Vermenigvuldig: vermenigvuldig oorkruis; vereenvoudig eers indien moontlik<br>
              ✅ Deel: Hou–Verander–Draai, vermenigvuldig dan<br>
              ✅ Gemengde getalle: skakel eers om na onegte breuke<br>
              ✅ % ↔ breuk: × of ÷ 100<br>
              ✅ % toename/afname: verandering ÷ oorspronklike × 100
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Algemene foute: vergeet om gemengde getalle om te skakel voor vermenigvuldiging/deling; die verkeerde waarde as "oorspronklike" in persentasieverandering gebruik; nie die finale antwoord vereenvoudig nie.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken 2⅓ ÷ 1¾. Gee as 'n vereenvoudigde breuk.", answer: "4/3", topic: "Gemeng" },
        { type: "mc", text: "Bereken (3/4)² − 1/8.", options: ["5/8", "1/2", "9/16", "11/16"], answer: 0, topic: "Gemeng" },
        { type: "input", text: "'n Baadjie is R640 na 'n 20%-toename. Wat was die oorspronklike prys?", answer: "533.33", topic: "Gemeng" },
        { type: "mc", text: "Bereken 1½ + 2/3 × ¾.", options: ["2", "2 1/4", "1 3/4", "2 5/12"], answer: 0, topic: "Gemeng" },
        { type: "input", text: "Druk 35 minute as 'n persentasie van 1 uur uit. Gee as 'n %.", answer: "58.33", topic: "Gemeng" },
        { type: "input", text: "Bereken: 2⅗ ÷ (1½ − ¾). Gee as 'n gemengde getal.", answer: "3 7/15", topic: "Gemeng" },
        { type: "input", text: "'n Winkel verhoog 'n item van R450 met 20%, en bied later 'n 20%-korting op die nuwe prys aan. Wat is die finale prys in Rand?", answer: "432", topic: "Gemeng" },
      ]
    },
  ],
  workbook: {
    chapter: 11, chapterName: "Gewone Breuke",
    topics: [
      {
        name: "Bewerkings met breuke",
        questions: [
          { num: "1", text: "Bereken, en toon alle stappe:", parts: [
            { label: "a)", text: "<span class='math'>3/4 + 2/3 − 1/6</span>", marks: 3 },
            { label: "b)", text: "<span class='math'>2⅔ × 1⅛</span>", marks: 3 },
            { label: "c)", text: "<span class='math'>3¼ ÷ 1⅓</span>", marks: 3 },
            { label: "d)", text: "<span class='math'>(2/3)² + √(9/16)</span>", marks: 3 },
          ]},
        ]
      },
      {
        name: "Kwadrate, kubusse en wortels van breuke",
        questions: [
          { num: "2", text: "Vereenvoudig sonder 'n sakrekenaar:", parts: [
            { label: "a)", text: "<span class='math'>(3/5)²</span>", marks: 1 },
            { label: "b)", text: "<span class='math'>√(4/25)</span>", marks: 1 },
            { label: "c)", text: "<span class='math'>(2/3)³</span>", marks: 2 },
            { label: "d)", text: "<span class='math'>∛(27/64)</span>", marks: 2 },
            { label: "e)", text: "<span class='math'>√(16/9) + (1/2)²</span>", marks: 3 },
          ]},
        ]
      },
      {
        name: "Persentasies en persentasieverandering",
        questions: [
          { num: "3", text: "Persentasieberekeninge:", parts: [
            { label: "a)", text: "Bepaal 35% van R2 400.", marks: 2 },
            { label: "b)", text: "Druk 480 ml as 'n persentasie van 2 liter uit.", marks: 3 },
            { label: "c)", text: "'n Prys het van R320 na R384 gestyg. Bereken die persentasietoename.", marks: 3 },
            { label: "d)", text: "Na 'n afname van 12% is 'n waarde 440. Bepaal die oorspronklike waarde.", marks: 3 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 11, chapterName: "Hoofstuk 11 — Gewone Breuke",
    topics: [
      {
        name: "Bewerkings met breuke",
        answers: [
          { num: "Q1a", ans: "5/4 = 1¼", note: "KGN=12: 9/12+8/12−2/12=15/12=5/4" },
          { num: "Q1b", ans: "3", note: "8/3 × 9/8 = 72/24 = 3" },
          { num: "Q1c", ans: "2 7/16", note: "13/4 ÷ 4/3 = 13/4 × 3/4 = 39/16 = 2 7/16" },
          { num: "Q1d", ans: "1 7/36", note: "(2/3)²=4/9; √(9/16)=3/4; KGN=36: 16/36+27/36=43/36=1 7/36" },
        ]
      },
      {
        name: "Kwadrate, kubusse en wortels van breuke",
        answers: [
          { num: "Q2a", ans: "9/25", note: "3²/5²" },
          { num: "Q2b", ans: "2/5", note: "√4/√25" },
          { num: "Q2c", ans: "8/27", note: "2³/3³" },
          { num: "Q2d", ans: "3/4", note: "∛27/∛64=3/4" },
          { num: "Q2e", ans: "4/3 + 1/4 = 19/12 = 1 7/12", note: "√(16/9)=4/3; (1/2)²=1/4; KGN=12: 16/12+3/12=19/12" },
        ]
      },
      {
        name: "Persentasies en persentasieverandering",
        answers: [
          { num: "Q3a", ans: "R 840", note: "35/100 × 2400 = 840" },
          { num: "Q3b", ans: "24%", note: "2 liter=2000 ml; 480/2000×100=24%" },
          { num: "Q3c", ans: "20%", note: "(384−320)/320×100=64/320×100=20%" },
          { num: "Q3d", ans: "500", note: "440=oorspronklike×0.88; 440÷0.88=500" },
        ]
      },
    ]
  }
});
