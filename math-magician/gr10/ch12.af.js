// Math Magician — Graad 10, Hoofstuk 12
// Euklidiese Meetkunde Deel 2 — Bewyse en Vermoedens

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 1200,
      chapter: 12,
      name: "Bewyse & vermoedens",
      fullName: "Formele bewyse in Euklidiese meetkunde — inleiding tot sirkelmeetkunde",
      lesson: {
        heading: "Formele bewyse en meetkundige vermoedens",
        sub: "Hoofstuk 12 · Onderwerp 1",
        body: `
          <p>Graad 10 Deel 2 Euklidiese meetkunde beweeg van waarneming en toepassing na <strong>formele bewys</strong>. Elke stelling in 'n bewys moet met 'n rede geregverdig word.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Struktuur van 'n meetkundige bewys</div>
            <p>
              <strong>Gegee:</strong> gee alle gegewe inligting.<br>
              <strong>Vereis om te bewys (VOB):</strong> gee aan wat getoon moet word.<br>
              <strong>Bewys:</strong> logiese reeks van stellings, elk met 'n rede.<br>
              <strong>Gevolgtrekking:</strong> gee aan wat bewys is.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Sleutelstellings vir Graad 10-bewyse</div>
            <p>
              • Vertikaal oorstaande hoeke is gelyk.<br>
              • Hoeke op 'n reguit lyn tel op tot 180° (supplementêr).<br>
              • Verwisselende hoeke (Z-hoeke) met ewewydige lyne is gelyk.<br>
              • Ko-interne hoeke met ewewydige lyne is supplementêr.<br>
              • Ooreenstemmende hoeke (F-hoeke) met ewewydige lyne is gelyk.<br>
              • Driehoekshoeksom = 180°.<br>
              • Buitehoek = som van twee nie-aangrensende binnehoeke.<br>
              • In 'n parallelogram: oorstaande sye gelyk en ewewydig, oorstaande hoeke gelyk, diagonale halveer mekaar.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Formele bewys</div>
            <p><strong>Gegee:</strong> AB ∥ CD, E is 'n punt tussen die twee lyne, ∠ABE = 55°, ∠DCE = 35°.<br>
            <strong>VOB:</strong> ∠BEC = 90°<br><br>
            <strong>Bewys:</strong><br>
            Trek EF ∥ AB ∥ CD deur E.<br>
            ∠BEF = ∠ABE = 55° (verwisselende hoeke, EF ∥ AB)<br>
            ∠FEC = ∠DCE = 35° (verwisselende hoeke, EF ∥ CD)<br>
            ∠BEC = ∠BEF + ∠FEC = 55° + 35° = 90° ✓</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Hoekverwantskap-Verkenner</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer 'n bekende hoek in en kies sy verwantskap — vind die verwante hoek met die korrekte meetkundige rede.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Bekende hoek (°)</div>
                <input id="g10c12ang" type="number" value="55" min="1" max="179"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Verwantskap</div>
                <select id="g10c12rel" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="supp">Supplementêr (reguit lyn)</option>
                  <option value="vert">Vertikaal oorstaande</option>
                  <option value="comp">Komplementêr (regte hoek)</option>
                  <option value="alt">Verwisselend (Z-hoek, ewewydige lyne)</option>
                  <option value="corr">Ooreenstemmend (F-hoek, ewewydige lyne)</option>
                  <option value="coint">Ko-intern (ewewydige lyne)</option>
                  <option value="ext">Buitehoek van driehoek</option>
                </select>
              </div>
              <div id="g10c12extPanel" style="display:none;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">2de binnehoek (°)</div>
                <input id="g10c12ang2" type="number" value="35" min="1" max="178"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c12Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind hoek</button>
            </div>
            <div id="g10c12Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const rel=document.getElementById('g10c12rel');
              const extP=document.getElementById('g10c12extPanel');
              rel.addEventListener('change',()=>{extP.style.display=rel.value==='ext'?'':'none';});
              function calc(){
                const a=parseFloat(document.getElementById('g10c12ang').value);
                const r=rel.value;
                const out=document.getElementById('g10c12Out');
                if(isNaN(a)||a<=0||a>=180){out.innerHTML='<span style="color:#fca5a5;">Voer \'n hoek tussen 1° en 179° in.</span>';return;}
                let result,reason;
                if(r==='supp'){result=180-a;reason='Supplementêre hoeke tel op tot 180° (hoeke op \'n reguit lyn)';}
                else if(r==='vert'){result=a;reason='Vertikaal oorstaande hoeke is gelyk';}
                else if(r==='comp'){if(a>=90){out.innerHTML='<span style="color:#fca5a5;">Komplementêr vereis \'n hoek < 90°.</span>';return;}result=90-a;reason='Komplementêre hoeke tel op tot 90°';}
                else if(r==='alt'){result=a;reason='Verwisselende hoeke is gelyk (AB ∥ CD, transversaal)';}
                else if(r==='corr'){result=a;reason='Ooreenstemmende hoeke is gelyk (AB ∥ CD, transversaal)';}
                else if(r==='coint'){result=180-a;reason='Ko-interne hoeke is supplementêr — hulle tel op tot 180° (AB ∥ CD)';}
                else{const a2=parseFloat(document.getElementById('g10c12ang2').value);if(isNaN(a2)||a2<=0||a+a2>=180){out.innerHTML='<span style="color:#fca5a5;">Albei hoeke moet optel tot minder as 180°.</span>';return;}result=a+a2;reason='Buitehoek = som van twee nie-aangrensende binnehoeke';}
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Verwante hoek = </span><span style="color:#6ee7b7;">'+result+'°</span><br><span style="color:rgba(221,225,240,0.50);">Rede: </span><span style="color:#fcd34d;">'+reason+'</span>';
              }
              document.getElementById('g10c12Btn').addEventListener('click',calc);
              ['g10c12ang','g10c12ang2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Skryf in elke bewysstap die meetkundige rede tussen hakies — bv., <em>(verwisselende hoeke, AB ∥ CD)</em>. Gee sowel die stelling as die voorwaarde wat dit van toepassing maak.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In 'n formele bewys moet elke stelling vergesel word van:",
          options: ["'n Berekening", "'n Rede", "'n Diagram", "'n Formule"],
          answer: 1,
          topic: "Bewyse & vermoedens"
        },
        {
          type: "mc",
          text: "AB ∥ CD. 'n Transversaal sny hulle, met ∠1 = 70° (ko-intern met ∠2). Dan is ∠2 =",
          options: ["70°", "110°", "90°", "35°"],
          answer: 1,
          topic: "Bewyse & vermoedens"
        },
        {
          type: "mc",
          text: "Twee lyne sny mekaar. Een hoek is 43°. Die vertikaal oorstaande hoek is:",
          options: ["137°", "47°", "43°", "90°"],
          answer: 2,
          topic: "Bewyse & vermoedens"
        },
        {
          type: "mc",
          text: "Om te bewys dat ABCD 'n parallelogram is, is dit voldoende om te toon:",
          options: ["Alle hoeke is 90°", "Een paar sye is ewewydig", "Albei pare oorstaande sye is gelyk EN ewewydig", "Die diagonale is gelyk"],
          answer: 2,
          topic: "Bewyse & vermoedens"
        },
        {
          type: "mc",
          text: "In △ABC, ∠A = 50°, ∠B = 70°. Die buitehoek by C is:",
          options: ["60°", "120°", "180°", "110°"],
          answer: 1,
          topic: "Bewyse & vermoedens"
        },
        {
          type: "input",
          text: "AB ∥ CD. Transversaal EF sny AB by G en CD by H, met ∠AGE = 128°. Bepaal ∠GHC.",
          answer: "52",
          altAnswers: ["52°"],
          topic: "Bewyse & vermoedens"
        },
        {
          type: "input",
          text: "AB ∥ CD. Transversaal EF sny AB by G en CD by H, sodat ∠EGB = (3x + 10)° en ∠GHC = (2x + 30)° ko-interne hoeke is. Bepaal x.",
          answer: "28",
          topic: "Bewyse & vermoedens"
        }
      ]
    },
    {
      id: 1201,
      chapter: 12,
      name: "Bewys van parallelogram-eienskappe",
      fullName: "Bewys eienskappe van vierhoeke met behulp van deduktiewe redenering",
      lesson: {
        heading: "Bewys van vierhoek-eienskappe",
        sub: "Hoofstuk 12 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Voorwaardes om 'n parallelogram te bewys</div>
            <p>
              ABCD is 'n parallelogram as ENIGE EEN van die volgende bewys word:<br>
              1. Albei pare oorstaande sye is ewewydig.<br>
              2. Albei pare oorstaande sye is gelyk.<br>
              3. Een paar oorstaande sye is gelyk EN ewewydig.<br>
              4. Albei pare oorstaande hoeke is gelyk.<br>
              5. Die diagonale halveer mekaar.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Bewys van 'n reghoek, ruit, of vierkant</div>
            <p>
              Bewys eers dat dit 'n parallelogram is, en voeg dan die spesifieke voorwaarde by:<br>
              <strong>Reghoek:</strong> + een regte hoek (of diagonale is gelyk)<br>
              <strong>Ruit:</strong> + een paar aangrensende sye gelyk (of diagonale halveer mekaar loodreg)<br>
              <strong>Vierkant:</strong> + reghoek-voorwaarde EN ruit-voorwaarde
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bewys PQRS is 'n parallelogram</div>
            <p>Gegee: PQ = SR en PQ ∥ SR.<br><br>
            In △PQS en △RSQ:<br>
            PQ = SR (gegee)<br>
            ∠PQS = ∠RSQ (verwisselende hoeke, PQ ∥ SR)<br>
            QS = SQ (gemeenskaplike sy)<br>
            ∴ △PQS ≅ △RSQ (SHS)<br>
            ∴ PS = QR en PS ∥ QR (uit kongruente driehoeke)<br>
            ∴ PQRS is 'n parallelogram (albei pare oorstaande sye gelyk en ewewydig)</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Parallelogram-Hoekvinder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer een hoek in 'n parallelogram in — vind al vier hoeke en gee die redes.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek A (°)</div>
                <input id="g10c12t2ang" type="number" value="65" min="1" max="179"
                  style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c12t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind alle hoeke</button>
            </div>
            <div id="g10c12t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function calc(){
                const A=parseFloat(document.getElementById('g10c12t2ang').value);
                const out=document.getElementById('g10c12t2Out');
                if(isNaN(A)||A<=0||A>=180){out.innerHTML='<span style="color:#fca5a5;">Voer \'n hoek tussen 1° en 179° in.</span>';return;}
                const B=180-A;
                let html='<span style="color:rgba(221,225,240,0.50);">In parallelogram ABCD:</span><br>';
                html+='<span style="color:#fcd34d;">∠A = '+A+'°</span><span style="color:rgba(221,225,240,0.50);"> (gegee)</span><br>';
                html+='<span style="color:#6ee7b7;">∠C = '+A+'°</span><span style="color:rgba(221,225,240,0.50);"> (oorstaande hoeke van 'n parallelogram is gelyk)</span><br>';
                html+='<span style="color:#6ee7b7;">∠B = '+B+'°</span><span style="color:rgba(221,225,240,0.50);"> (ko-interne hoeke, AB∥DC → ∠A + ∠B = 180°)</span><br>';
                html+='<span style="color:#6ee7b7;">∠D = '+B+'°</span><span style="color:rgba(221,225,240,0.50);"> (oorstaande hoeke van 'n parallelogram is gelyk)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Kontroleer: '+A+' + '+B+' + '+A+' + '+B+' = '+(2*A+2*B)+'° ✓</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c12t2Btn').addEventListener('click',calc);
              document.getElementById('g10c12t2ang').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Leer die <strong>vyf voorwaardes</strong> vir 'n parallelogram uit jou kop — in eksamenbewyse hoef jy net EEN daarvan te bewys, kies dus die een waartoe die gegewe inligting die mees direk lei.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Om te bewys dat ABCD 'n reghoek is, moet jy eers bewys dat dit 'n parallelogram is en dan toon:",
          options: ["Diagonale is gelyk", "Alle sye is gelyk", "Een hoek is 90°", "Beide A en C is korrek"],
          answer: 3,
          topic: "Bewys van parallelogram-eienskappe"
        },
        {
          type: "mc",
          text: "In parallelogram ABCD sny die diagonale AC en BD mekaar by E. Watter van hierdie is NIE noodwendig waar nie?",
          options: ["AE = CE", "BE = DE", "AC = BD", "∠AEB = ∠CED"],
          answer: 2,
          topic: "Bewys van parallelogram-eienskappe"
        },
        {
          type: "mc",
          text: "Die minimum aantal voorwaardes wat nodig is om te bewys dat 'n vierhoek 'n parallelogram is, is:",
          options: ["1", "2", "3", "4"],
          answer: 0,
          topic: "Bewys van parallelogram-eienskappe"
        },
        {
          type: "mc",
          text: "PQRS is 'n ruit. Watter stelling is ALTYD waar?",
          options: ["PR = QS", "∠PQR = 90°", "PR ⊥ QS", "PQ ⊥ QR"],
          answer: 2,
          topic: "Bewys van parallelogram-eienskappe"
        },
        {
          type: "mc",
          text: "In 'n bewys, watter rede regverdig: ∠ABC = ∠ADC in 'n parallelogram?",
          options: ["Verwisselende hoeke", "Vertikaal oorstaande hoeke", "Oorstaande hoeke van 'n parallelogram", "Ooreenstemmende hoeke"],
          answer: 2,
          topic: "Bewys van parallelogram-eienskappe"
        },
        {
          type: "input",
          text: "In parallelogram ABCD is ∠A = (2x + 15)° en ∠B = (3x − 5)° ko-interne (opeenvolgende) hoeke. Bepaal x.",
          answer: "34",
          topic: "Bewys van parallelogram-eienskappe"
        },
        {
          type: "input",
          text: "Vierhoek PQRS het PQ = 3x − 2, QR = 2x + 6, RS = x + 14, SP = 4x − 10. Gegee dat PQRS 'n parallelogram is (dus PQ = RS en QR = SP), bepaal x.",
          answer: "8",
          topic: "Bewys van parallelogram-eienskappe"
        }
      ]
    },
    {
      id: 1202,
      chapter: 12,
      name: "Kongruensiebewyse",
      fullName: "Gebruik van die vier kongruensievoorwaardes om driehoeke kongruent te bewys",
      lesson: {
        heading: "Bewys dat driehoeke kongruent is",
        sub: "Hoofstuk 12 · Onderwerp 3",
        body: `
          <p>Baie Euklidiese meetkunde-vraagstukke berus daarop om eers te bewys dat twee driehoeke <strong>kongruent</strong> is (identies in vorm en grootte) voordat afgelei word dat ooreenstemmende sye of hoeke gelyk is.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die vier kongruensievoorwaardes</div>
            <p>
              <strong>SSS:</strong> drie sye van een driehoek gelyk aan drie sye van die ander.<br>
              <strong>SHS:</strong> twee sye en die INGESLUITE hoek gelyk.<br>
              <strong>HHS:</strong> twee hoeke en 'n ooreenstemmende sy gelyk.<br>
              <strong>RSS:</strong> regte hoek, skuinssy, en een ander sy gelyk (slegs regte-hoek-driehoeke).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Waarom volgorde saak maak: die benoeming van kongruente driehoeke</div>
            <p>Wanneer jy <span class="math">△ABC ≡ △DEF</span> skryf, vertel die volgorde van die letters jou die ooreenstemming: A↔D, B↔E, C↔F. Om die volgorde reg te kry, is noodsaaklik om daarna korrek aan te dui watter sye/hoeke gelyk is.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: SHS-bewys</div>
            <p>Gegee: AB = CD, AD = CB, met diagonaal AC gemeenskaplik aan albei driehoeke ABC en CDA.<br>
            <strong>VOB:</strong> △ABC ≡ △CDA<br><br>
            In △ABC en △CDA:<br>
            AB = CD (gegee)<br>
            BC = DA (gegee)<br>
            AC = CA (gemeenskaplike sy)<br>
            ∴ △ABC ≡ △CDA (SSS)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Algemene foute om te vermy</div>
            <p>
              • Moenie SHS met SSH (sy-sy-hoek) verwar nie — SSH is NIE 'n geldige kongruensievoorwaarde nie, want die hoek moet die INGESLUITE hoek wees (tussen die twee bekende sye).<br>
              • Kontroleer altyd die ooreenstemming — passende sye/hoeke moet in dieselfde volgorde in albei driehoeknaam gelys word.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kongruensievoorwaarde-Toetser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Merk watter feite oor twee driehoeke bekend is — vind uit of hulle kongruent bewys is, en volgens watter voorwaarde.</p>
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;font-size:13px;color:rgba(221,225,240,0.75);">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc1"> 3 pare sye gelyk (SSS)</label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc2"> 2 pare sye gelyk EN die hoek tussen hulle gelyk (SHS)</label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc3"> 2 pare hoeke gelyk EN 'n ooreenstemmende sy gelyk (HHS)</label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc4"> Albei reghoekig, skuinssye gelyk, EN een ander paar sye gelyk (RSS)</label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc5"> 2 pare sye gelyk EN 'n NIE-ingeslote hoek gelyk (slegs SSH)</label>
            </div>
            <button id="g10c12ccBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Toets kongruensie</button>
            <div id="g10c12ccOut" style="font-size:14px;line-height:1.8;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const c1=document.getElementById('g10c12cc1').checked;
                const c2=document.getElementById('g10c12cc2').checked;
                const c3=document.getElementById('g10c12cc3').checked;
                const c4=document.getElementById('g10c12cc4').checked;
                const c5=document.getElementById('g10c12cc5').checked;
                const out=document.getElementById('g10c12ccOut');
                let msgs=[];
                if(c1)msgs.push('<span style="color:#6ee7b7;">Kongruent volgens SSS ✓</span>');
                if(c2)msgs.push('<span style="color:#6ee7b7;">Kongruent volgens SHS ✓</span>');
                if(c3)msgs.push('<span style="color:#6ee7b7;">Kongruent volgens HHS ✓</span>');
                if(c4)msgs.push('<span style="color:#6ee7b7;">Kongruent volgens RSS ✓</span>');
                if(c5)msgs.push('<span style="color:#fca5a5;">SSH is NIE \'n geldige kongruensievoorwaarde op sy eie nie — die driehoeke is moontlik NIE kongruent nie ✗</span>');
                if(msgs.length===0){out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Merk die feite wat jy van die twee driehoeke weet.</span>';return;}
                out.innerHTML=msgs.join('<br>');
              }
              document.getElementById('g10c12ccBtn').addEventListener('click',run);
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Skryf jou kongruensiebewys in drie duidelik gemerkte reëls (een per paar gelyke dele), en gee dan die voorwaarde (SSS/SHS/HHS/RSS) tussen hakies — eksaminatore soek na hierdie presiese struktuur.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Watter van hierdie IS 'n geldige kongruensievoorwaarde?",
          options: ["SSH", "HHH", "SHS", "HSH is dieselfde as HHS maar nooit geldig nie"],
          answer: 2,
          topic: "Kongruensiebewyse"
        },
        {
          type: "mc",
          text: "In △ABC ≡ △DEF, watter sy in △DEF stem ooreen met AB?",
          options: ["DE", "EF", "DF", "Kan nie sonder meer inligting bepaal word nie"],
          answer: 0,
          topic: "Kongruensiebewyse"
        },
        {
          type: "mc",
          text: "Twee reghoekige driehoeke het gelyke skuinssye en een gelyke ooreenstemmende sy. Dit bewys kongruensie volgens:",
          options: ["SHS", "HHS", "RSS", "SSS"],
          answer: 2,
          topic: "Kongruensiebewyse"
        },
        {
          type: "mc",
          text: "Vir SHS om te geld, moet die gelyke hoek wees:",
          options: ["Enige hoek in die driehoek", "Die hoek ingesluit tussen die twee bekende gelyke sye", "Die grootste hoek", "Teenoor die langste sy"],
          answer: 1,
          topic: "Kongruensiebewyse"
        },
        {
          type: "mc",
          text: "△PQR en △XYZ deel PQ = XY, QR = YZ, en ∠Q = ∠Y. Dit bewys:",
          options: ["△PQR ≡ △XYZ volgens SHS", "Die driehoeke is gelykvormig maar nie noodwendig kongruent nie", "Niks kan afgelei word nie", "△PQR ≡ △XYZ volgens SSS"],
          answer: 0,
          topic: "Kongruensiebewyse"
        },
        {
          type: "input",
          text: "In △ABC en △DEF is AB = DE, BC = EF, en ∠B = ∠E, dus △ABC ≡ △DEF (SHS). As AB = 3x + 1 en DE = 5x − 9, bepaal x.",
          answer: "5",
          topic: "Kongruensiebewyse"
        },
        {
          type: "input",
          text: "Regte driehoeke ABC en DEF is kongruent volgens RSS (regte hoeke by B en E). Die skuinssye AC = DF = 13, en AB = 5. Gebruik die Stelling van Pythagoras in △ABC om BC te bepaal, en gee dan EF.",
          answer: "12",
          topic: "Kongruensiebewyse"
        }
      ]
    },
    {
      id: 1203,
      chapter: 12,
      name: "Gemengde vraagstukke met vierhoeke",
      fullName: "Meerstap-vraagstukke wat kongruensie, ewewydige lyne, en vierhoek-eienskappe kombineer",
      lesson: {
        heading: "Gemengde vraagstukke wat verskeie stellings kombineer",
        sub: "Hoofstuk 12 · Onderwerp 4",
        body: `
          <p>Die uitdagendste Graad 10-vraagstukke kombineer verskeie stellings in een bewys: ewewydige-lyn-hoekfeite, driehoekkongruensie, en vierhoek-eienskappe, dikwels oor twee of drie stappe.</p>

          <div class="def-box">
            <div class="def-box-title">📖 'n Algemene strategie vir meerstap-vraagstukke</div>
            <p>
              1. Merk EERS ALLE gegewe inligting op die diagram (gelyke sye/hoeke, ewewydigheidsmerke).<br>
              2. Identifiseer watter twee driehoeke jy kongruent (of gelykvormig) moet bewys om vooruitgang te maak.<br>
              3. Bepaal wat daardie kongruensie jou gee (gelyke sye/hoeke) — dit ontsluit dikwels die volgende stap.<br>
              4. Gebruik die nuutbewese feite om die finale vereiste resultaat te bereik (bv. om te bewys dat 'n vierhoek 'n parallelogram is).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Meerstap-vraagstuk</div>
            <p><strong>Gegee:</strong> EFGH is 'n parallelogram. M en N is punte op EF en GH onderskeidelik sodat EM = GN.<br>
            <strong>VOB:</strong> MFNH is 'n parallelogram.<br><br>
            <strong>Bewys:</strong><br>
            EF = GH (oorstaande sye van parallelogram EFGH is gelyk)<br>
            EM = GN (gegee)<br>
            ∴ MF = EF − EM = GH − GN = NH (aftrekking van gelyke van gelyke)<br>
            EF ∥ GH ⟹ MF ∥ NH (MF en NH is dele van ewewydige sye EF, GH)<br>
            ∴ MFNH het een paar oorstaande sye (MF en NH) gelyk EN ewewydig<br>
            ∴ MFNH is 'n parallelogram.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Wenk: werk agteruit vanaf die VOB</div>
            <p>As jy vasgevang is, begin by wat jy moet bewys en vra "watter voorwaarde sou dit direk vir my gee?" Werk dan vorentoe om te toon dat daardie voorwaarde nagekom word — dit openbaar dikwels die ontbrekende kongruente driehoeke.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>In meerstap-vraagstukke moet elke nuwe feit wat jy bewys as sy eie genommerde stelling met 'n rede geskryf word — moenie ooit 'n logiese stap oorslaan nie, selfs al voel dit "voor die hand liggend".</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In 'n meerstap-vraagstuk is die beste eerste stap gewoonlik om:",
          options: ["Die finale antwoord te raai", "Alle gegewe inligting op die diagram te merk", "Die resultaat aan te neem en slegs agteruit te werk", "Die diagram met 'n liniaal te meet"],
          answer: 1,
          topic: "Gemengde vraagstukke met vierhoeke"
        },
        {
          type: "mc",
          text: "EFGH is 'n parallelogram. M is op EF, N is op GH, met EM = GN. Watter rede toon MF = NH?",
          options: ["Vertikaal oorstaande hoeke", "EF = GH (oorstaande sye van parallelogram) minus gelyke dele EM = GN", "Ooreenstemmende hoeke", "Diagonale halveer mekaar"],
          answer: 1,
          topic: "Gemengde vraagstukke met vierhoeke"
        },
        {
          type: "mc",
          text: "Om te bewys dat MFNH (uit die voorbeeld) 'n parallelogram is deur een paar sye te gebruik, moet jy toon dat daardie paar:",
          options: ["Slegs gelyk is", "Slegs ewewydig is", "Beide gelyk EN ewewydig is", "Loodreg is"],
          answer: 2,
          topic: "Gemengde vraagstukke met vierhoeke"
        },
        {
          type: "mc",
          text: "Wanneer jy vasgevang raak in 'n meerstap-vraagstuk, is 'n nuttige tegniek om:",
          options: ["Agteruit te werk vanaf die VOB om te sien watter voorwaarde dit sou bewys", "Reguit na die gevolgtrekking te spring", "Die gegewe inligting te ignoreer", "Slegs die diagram op 'n ander skaal te hertekens"],
          answer: 0,
          topic: "Gemengde vraagstukke met vierhoeke"
        },
        {
          type: "mc",
          text: "In 'n vraagstuk moet elke stelling in die bewys gevolg word deur:",
          options: ["'n Diagram", "'n Rede (stelling of gegewe feit)", "'n Meting", "'n Herhaling van die VOB"],
          answer: 1,
          topic: "Gemengde vraagstukke met vierhoeke"
        },
        {
          type: "input",
          text: "EFGH is 'n parallelogram met EF = 24. M is op EF en N is op GH sodat EM = GN = 9. Bepaal MF (die oorblywende deel van EF).",
          answer: "15",
          topic: "Gemengde vraagstukke met vierhoeke"
        },
        {
          type: "input",
          text: "PQRS is 'n parallelogram met diagonale wat mekaar by O sny, sodat PO = OR. As PO = 2x + 3 en OR = 5x − 9, bepaal die lengte van die volle diagonaal PR.",
          answer: "22",
          topic: "Gemengde vraagstukke met vierhoeke"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 12 Werkboek — Euklidiese Meetkunde Deel 2",
    questions: [
      {
        number: 1,
        text: "In die figuur is AB ∥ CD. Transversaal EF sny AB by G en CD by H. ∠AGE = 115°.",
        parts: [
          { label: "a", text: "Bepaal ∠BGE met 'n rede.", marks: 2 },
          { label: "b", text: "Bepaal ∠GHD met 'n rede.", marks: 2 },
          { label: "c", text: "Bepaal ∠GHC met 'n rede.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "ABCD is 'n vierhoek waar die diagonale AC en BD mekaar by O halveer. Bewys dat ABCD 'n parallelogram is.",
        parts: [
          { label: "a", text: "Beskou △AOB en △COD. Gee drie voorwaardes vir kongruensie.", marks: 3 },
          { label: "b", text: "Gee die kongruensievoorwaarde en lei af.", marks: 2 },
          { label: "c", text: "Herhaal vir △AOD en △COB om te toon dat albei pare oorstaande sye gelyk is.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "PQRS is 'n parallelogram. T is die middelpunt van PQ en U is die middelpunt van SR. Bewys dat PTUS 'n parallelogram is.",
        parts: [
          { label: "a", text: "Skryf PT en SU in terme van PQ neer.", marks: 2 },
          { label: "b", text: "Toon PT = SU.", marks: 2 },
          { label: "c", text: "Toon PT ∥ SU.", marks: 2 },
          { label: "d", text: "Lei af dat PTUS 'n parallelogram is.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "∠BGE = 180°−115° = 65° (hoeke op 'n reguit lyn)",
        b: "∠GHD = 115° (ko-interne hoeke met AB∥CD is supplementêr: 180°−65°=115°, OF verwisselende hoeke met ∠AGE)",
        c: "∠GHC = 65° (hoeke op 'n reguit lyn, of ooreenstemmend met ∠BGE)"
      },
      2: {
        a: "AO=CO (gegee halveer); BO=DO (gegee halveer); ∠AOB=∠COD (vert. oorst. hoeke)",
        b: "SHS → △AOB≅△COD → AB=CD en AB∥CD",
        c: "Eweso △AOD≅△COB (SHS) → AD=BC"
      },
      3: {
        a: "PT = ½PQ; SU = ½SR",
        b: "PQ=SR (oorst. sye parallelogram) → PT = ½PQ = ½SR = SU",
        c: "PQ∥SR (oorst. sye parallelogram) → PT∥SU",
        d: "PT=SU en PT∥SU → PTUS is 'n parallelogram"
      }
    }
  }
});
