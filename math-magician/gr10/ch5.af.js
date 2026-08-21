// Math Magician — Grade 10, Hoofstuk 5 data (Afrikaans)
// Trigonometrie (Deel 1)

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 500,
      chapter: 5,
      name: "Trig-verhoudings & spesiale hoeke",
      fullName: "Definisie van trigonometriese verhoudings, wederkerige verhoudings, en spesiale hoeke",
      lesson: {
        heading: "Trigonometriese verhoudings en spesiale hoeke",
        sub: "Hoofstuk 5 · Onderwerp 1",
        body: `
          <p><strong>Trigonometrie</strong> bestudeer die verhoudings tussen die hoeke en sye van driehoeke. In 'n reghoekige driehoek:</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die drie primêre verhoudings (SOH-CAH-TOA)</div>
            <p>
              <span class="math">sin θ = teenoorstaande / skuinssy</span><br>
              <span class="math">cos θ = aangrensend / skuinssy</span><br>
              <span class="math">tan θ = teenoorstaande / aangrensend</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Wederkerige verhoudings</div>
            <p>
              <span class="math">cosec θ = 1/sin θ</span><br>
              <span class="math">sec θ = 1/cos θ</span><br>
              <span class="math">cot θ = 1/tan θ</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Spesiale hoeke (sonder rekenaar)</div>
            <p>
              | θ | sin | cos | tan |<br>
              | 30° | ½ | √3/2 | 1/√3 = √3/3 |<br>
              | 45° | √2/2 | √2/2 | 1 |<br>
              | 60° | √3/2 | ½ | √3 |<br>
              | 0° | 0 | 1 | 0 |<br>
              | 90° | 1 | 0 | onbepaald |
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Evalueer sonder 'n rekenaar</div>
            <p><span class="math">sin 60° · cos 30° + cos 60° · sin 30°</span><br>
            <span class="math">= (√3/2)(√3/2) + (½)(½)</span><br>
            <span class="math">= 3/4 + 1/4 = 1</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Spesiale hoeke-verkenner</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies enige spesiale hoek en verhouding — sien die presiese waarde en hoe dit afgelei word.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek</div>
                <select id="g10c5angle"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="0">0°</option>
                  <option value="30">30°</option>
                  <option value="45">45°</option>
                  <option value="60">60°</option>
                  <option value="90">90°</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Verhouding</div>
                <select id="g10c5ratio"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin</option>
                  <option value="cos">cos</option>
                  <option value="tan">tan</option>
                </select>
              </div>
            </div>
            <div id="g10c5Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const vals={
                sin:{'0':'0','30':'½','45':'√2/2','60':'√3/2','90':'1'},
                cos:{'0':'1','30':'√3/2','45':'√2/2','60':'½','90':'0'},
                tan:{'0':'0','30':'√3/3','45':'1','60':'√3','90':'onbepaald'}
              };
              const dec={
                sin:{'0':'0','30':'0.5000','45':'0.7071','60':'0.8660','90':'1'},
                cos:{'0':'1','30':'0.8660','45':'0.7071','60':'0.5000','90':'0'},
                tan:{'0':'0','30':'0.5774','45':'1.0000','60':'1.7321','90':'—'}
              };
              const explain={
                '30sin':'Uit \'n 30-60-90-driehoek: sye 1, √3, 2. Teenoorstaande van 30° = 1, skuinssy = 2.',
                '30cos':'Uit \'n 30-60-90-driehoek: aangrensend aan 30° = √3, skuinssy = 2.',
                '30tan':'Teenoorstaande/aangrensend = 1/√3 = √3/3 (gerasionaliseer).',
                '45sin':'Uit \'n 45-45-90-driehoek: sye 1, 1, √2. Teenoorstaande = 1, skuinssy = √2.',
                '45cos':'Aangrensend = 1, skuinssy = √2. Dieselfde as sin 45°.',
                '45tan':'Teenoorstaande = aangrensend = 1, dus tan 45° = 1.',
                '60sin':'Uit \'n 30-60-90-driehoek: teenoorstaande van 60° = √3, skuinssy = 2.',
                '60cos':'Aangrensend aan 60° = 1, skuinssy = 2.',
                '60tan':'Teenoorstaande/aangrensend = √3/1 = √3.',
                '0sin':'By 0° het die teenoorstaande sy \'n lengte van 0.',
                '0cos':'By 0° is aangrensend = skuinssy, dus verhouding = 1.',
                '0tan':'sin 0°/cos 0° = 0/1 = 0.',
                '90sin':'By 90° is teenoorstaande = skuinssy, dus verhouding = 1.',
                '90cos':'By 90° is aangrensend = 0.',
                '90tan':'sin 90°/cos 90° = 1/0 — onbepaald.'
              };
              function update(){
                const a=document.getElementById('g10c5angle').value;
                const r=document.getElementById('g10c5ratio').value;
                const exact=vals[r][a];
                const decVal=dec[r][a];
                const expl=explain[a+r]||'';
                const undef=exact==='onbepaald';
                document.getElementById('g10c5Out').innerHTML=
                  '<span style="color:rgba(221,225,240,0.50);">'+r+' '+a+'° = </span>'
                  +'<span style="color:#fcd34d;font-size:16px;">'+exact+'</span>'
                  +(undef?'':' <span style="color:rgba(221,225,240,0.40);">≈ '+decVal+'</span>')+'<br>'
                  +(expl?'<span style="color:rgba(221,225,240,0.55);font-size:13px;">'+expl+'</span>':'');
              }
              document.getElementById('g10c5angle').addEventListener('change',update);
              document.getElementById('g10c5ratio').addEventListener('change',update);
              update();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Teken die 30-60-90 (sye: 1, √3, 2) en 45-45-90 (sye: 1, 1, √2) driehoeke uit die geheue — alle spesiale-hoekwaardes kom uit hierdie twee driehoeke.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In 'n reghoekige driehoek is die sy teenoorstaande θ gelyk aan 5 en die skuinssy 13. Vind sin θ:",
          options: ["5/13", "12/13", "5/12", "13/5"],
          answer: 0,
          topic: "Trig-verhoudings & spesiale hoeke"
        },
        {
          type: "input",
          text: "Evalueer (sonder rekenaar): tan 45° + sin 30°",
          answer: "3/2",
          altAnswers: ["1.5"],
          topic: "Trig-verhoudings & spesiale hoeke"
        },
        {
          type: "mc",
          text: "As sin θ = 3/5, wat is cos θ (skerp hoek)?",
          options: ["4/5", "3/4", "5/3", "5/4"],
          answer: 0,
          topic: "Trig-verhoudings & spesiale hoeke"
        },
        {
          type: "mc",
          text: "Evalueer: sin²30° + cos²30°",
          options: ["½", "1", "√3/2", "3/4"],
          answer: 1,
          topic: "Trig-verhoudings & spesiale hoeke"
        },
        {
          type: "input",
          text: "Evalueer: cos 60° ÷ tan 60°",
          answer: "√3/6",
          topic: "Trig-verhoudings & spesiale hoeke"
        },
        {
          type: "input",
          text: "Evalueer (sonder rekenaar): sin 60° · cos 60° + cos²30°",
          answer: "(√3+3)/4",
          altAnswers: ["1.18", "1,18"],
          topic: "Trig-verhoudings & spesiale hoeke"
        }
      ]
    },
    {
      id: 501,
      chapter: 5,
      name: "Trig-vergelykings & Cartesiese vlak",
      fullName: "Oplos van trigonometriese vergelykings en definisie van verhoudings in die Cartesiese vlak",
      lesson: {
        heading: "Oplos van trig-vergelykings en die Cartesiese vlak",
        sub: "Hoofstuk 5 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Verhoudings in die Cartesiese vlak — CAST-reël</div>
            <p>Vir 'n punt P(x, y) op 'n sirkel met radius r = √(x² + y²):<br>
            <span class="math">sin θ = y/r, cos θ = x/r, tan θ = y/x</span><br><br>
            <strong>CAST-reël</strong> — watter verhoudings positief is in elke kwadrant:<br>
            K1 (0°–90°): <strong>Almal</strong> positief<br>
            K2 (90°–180°): net <strong>Sinus</strong><br>
            K3 (180°–270°): net <strong>Tangens</strong><br>
            K4 (270°–360°): net <strong>Kosinus</strong></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Verwysingshoeke</div>
            <p>Om trig-verhoudings vir hoeke in K2, K3, K4 te vind, gebruik die skerp verwysingshoek θ_verw:<br>
            K2: <span class="math">sin(180°−θ) = sin θ</span>, <span class="math">cos(180°−θ) = −cos θ</span><br>
            K3: <span class="math">sin(180°+θ) = −sin θ</span>, <span class="math">cos(180°+θ) = −cos θ</span><br>
            K4: <span class="math">sin(360°−θ) = −sin θ</span>, <span class="math">cos(360°−θ) = cos θ</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op vir θ ∈ [0°; 360°]</div>
            <p><span class="math">sin θ = −½</span><br>
            Verwysingshoek: <span class="math">sin 30° = ½</span><br>
            sin is negatief in K3 en K4:<br>
            <span class="math">θ = 180° + 30° = 210°</span><br>
            <span class="math">θ = 360° − 30° = 330°</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 CAST-reël en trig-vergelykingsoplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer 'n trig-verhoudingswaarde in — vind alle oplossings vir θ ∈ [0°; 360°] met die CAST-reël.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Verhouding</div>
                <select id="g10c5cratio"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin θ</option>
                  <option value="cos">cos θ</option>
                  <option value="tan">tan θ</option>
                </select>
              </div>
              <div style="padding-bottom:9px;color:rgba(221,225,240,0.60);font-size:16px;">=</div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Waarde</div>
                <input id="g10c5cval" type="number" step="0.001" value="-0.5"
                  style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c5cBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Los op
              </button>
            </div>
            <div id="g10c5cOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function round1(x){return Math.round(x*10)/10;}
              function solve(){
                const r=document.getElementById('g10c5cratio').value;
                const v=parseFloat(document.getElementById('g10c5cval').value);
                const out=document.getElementById('g10c5cOut');
                if(isNaN(v)){out.innerHTML='<span style="color:#fca5a5;">Voer \'n desimale waarde in.</span>';return;}
                if((r==='sin'||r==='cos')&&(v<-1||v>1)){out.innerHTML='<span style="color:#fca5a5;">'+r+' θ moet tussen −1 en 1 wees.</span>';return;}
                let ref=Math.round(Math.abs(Math.asin(r==='sin'?v:r==='cos'?v:0)*180/Math.PI)*10)/10;
                if(r==='cos') ref=Math.round(Math.acos(Math.abs(v))*180/Math.PI*10)/10;
                if(r==='tan') ref=Math.round(Math.atan(Math.abs(v))*180/Math.PI*10)/10;
                const pos=v>=0;
                let quads=[], solutions=[];
                if(r==='sin'){
                  quads=pos?['K1','K2']:['K3','K4'];
                  solutions=pos?[ref, 180-ref]:[180+ref, 360-ref];
                } else if(r==='cos'){
                  quads=pos?['K1','K4']:['K2','K3'];
                  solutions=pos?[ref, 360-ref]:[180-ref, 180+ref];
                } else {
                  quads=pos?['K1','K3']:['K2','K4'];
                  solutions=pos?[ref, 180+ref]:[180-ref, 360-ref];
                }
                solutions=solutions.map(x=>Math.round(x*10)/10).filter(x=>x>=0&&x<=360);
                let html='<span style="color:rgba(221,225,240,0.50);">Vergelyking: </span><span style="color:#fcd34d;">'+r+' θ = '+v+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Verwysingshoek: θ_verw = '+ref+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+r+' is '+(pos?'positief':'negatief')+' in '+quads.join(' en ')+'</span><br>';
                html+='<span style="color:#6ee7b7;">θ = '+solutions.join('° of ')+'°</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c5cBtn').addEventListener('click',solve);
              document.getElementById('g10c5cval').addEventListener('keydown',e=>{if(e.key==='Enter')solve();});
              solve();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span><strong>CAST</strong> — van K4 anti-kloksgewys gelees: Cos, All, Sin, Tan wys jou watter verhouding positief is in elke kwadrant. Die verwysingshoek is altyd die skerp hoek vanaf die x-as.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In watter kwadrant is sin positief en cos negatief?",
          options: ["Kwadrant 1", "Kwadrant 2", "Kwadrant 3", "Kwadrant 4"],
          answer: 1,
          topic: "Trig-vergelykings & Cartesiese vlak"
        },
        {
          type: "mc",
          text: "Los op vir θ ∈ [0°; 360°]: cos θ = √3/2",
          options: ["Net 30°", "30° en 330°", "30° en 150°", "60° en 300°"],
          answer: 1,
          topic: "Trig-vergelykings & Cartesiese vlak"
        },
        {
          type: "mc",
          text: "As punt P(−3, 4) op 'n sirkel lê, vind sin θ:",
          options: ["4/5", "−3/5", "−4/5", "3/5"],
          answer: 0,
          topic: "Trig-vergelykings & Cartesiese vlak"
        },
        {
          type: "input",
          text: "Los op: tan θ = 1 vir θ ∈ [0°; 360°]. Gee die kleiner oplossing.",
          answer: "45",
          topic: "Trig-vergelykings & Cartesiese vlak"
        },
        {
          type: "mc",
          text: "sin 150° is gelyk aan:",
          options: ["−½", "√3/2", "½", "−√3/2"],
          answer: 2,
          topic: "Trig-vergelykings & Cartesiese vlak"
        },
        {
          type: "input",
          text: "Los op vir θ ∈ [0°; 360°]: 2sinθ + 1 = 0. Gee die kleiner oplossing.",
          answer: "210",
          topic: "Trig-vergelykings & Cartesiese vlak"
        }
      ]
    },
    {
      id: 502,
      chapter: 5,
      name: "Oplos van reghoekige driehoeke",
      fullName: "Tweedimensionele probleme met reghoekige driehoeke, hoeke van hoogte en diepte",
      lesson: {
        heading: "Oplos van tweedimensionele reghoekige-driehoekprobleme",
        sub: "Hoofstuk 5 · Onderwerp 3",
        body: `
          <p>Trigonometrie word 'n praktiese hulpmiddel om <strong>onbekende sye en hoeke</strong> in werklike 2D-situasies te vind — hoogtes van geboue, afstande oor riviere, leerprobleme, en meer.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Hoeke van hoogte en diepte</div>
            <p>
              <strong>Hoek van hoogte (elevasie)</strong> — opwaarts gemeet vanaf die horisontale lyn na 'n punt hoër op (bv. opkyk na die punt van 'n vlagpaal).<br>
              <strong>Hoek van diepte (depressie)</strong> — afwaarts gemeet vanaf die horisontale lyn na 'n punt laer af (bv. afkyk van 'n krans).<br>
              Hierdie twee hoeke is <strong>gelyk</strong> wanneer hulle tussen dieselfde twee punte gemeet word (verwisselende hoeke, horisontale lyne is ewewydig).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Algemene metode</div>
            <p>
              1. Teken en benoem 'n duidelike diagram.<br>
              2. Identifiseer die regte hoek en merk die gegewe hoek en sy(e).<br>
              3. Kies die verhouding (sin, cos, of tan) wat verbind wat jy weet met wat jy soek.<br>
              4. Los algebraïes op, en gebruik 'n rekenaar vir nie-spesiale hoeke.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Hoogte van 'n boom</div>
            <p>
              Vanaf 'n punt 20 m vanaf die basis van 'n boom, is die hoek van hoogte na die bopunt 35°. Vind die hoogte van die boom.<br>
              <span class="math">tan 35° = hoogte / 20</span><br>
              <span class="math">hoogte = 20 × tan 35° ≈ 20 × 0.7002 ≈ 14.0 m</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Twee driehoeke gekombineer</div>
            <p>
              'n Leer leun teen 'n muur, bereik 8 m hoog, en maak 'n hoek van 60° met die grond. Hoe ver is die voet van die leer van die muur af?<br>
              <span class="math">cos 60° = afstand / lengte</span> — maar ons benodig eers die leer se lengte.<br>
              <span class="math">sin 60° = 8/lengte → lengte = 8/sin 60° ≈ 9.24 m</span><br>
              <span class="math">afstand = lengte × cos 60° ≈ 9.24 × 0.5 ≈ 4.62 m</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Afronding</div>
            <p>Tensy anders gesê, rond finale antwoorde af tot <strong>een of twee desimale plekke</strong>. Hou onafgeronde waardes tydens tussenstappe om opeenhopende afrondingsfoute te vermy.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Kyk altyd of die gegewe hoek by die bopunt is (depressie, kyk af na jou) of by jou posisie is (elevasie, kyk op) — 'n diagram teken voorkom verwarring oor watter sy teenoorstaande/aangrensend is.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Vanaf 'n punt 15 m van 'n gebou se basis, is die hoek van hoogte na die bopunt 40°. Vind die hoogte (2 d.p.).",
          answer: "12.59",
          altAnswers: ["12.6"],
          topic: "Oplos van reghoekige driehoeke"
        },
        {
          type: "mc",
          text: "Die hoek van diepte vanaf 'n vuurtoring se bopunt na 'n boot is gelyk aan:",
          options: ["Die hoek van hoogte vanaf die boot na die vuurtoring se bopunt", "90° minus die hoek van hoogte", "Twee keer die hoek van hoogte", "Dit kan nie vergelyk word nie"],
          answer: 0,
          topic: "Oplos van reghoekige driehoeke"
        },
        {
          type: "input",
          text: "'n Leer 5 m lank leun teen 'n muur, en maak 'n hoek van 70° met die grond. Hoe hoog teen die muur bereik dit (2 d.p.)?",
          answer: "4.70",
          altAnswers: ["4.7"],
          topic: "Oplos van reghoekige driehoeke"
        },
        {
          type: "mc",
          text: "'n Reghoekige driehoek het skuinssy 10 en een hoek 25°. Watter verhouding gee direk die sy aangrensend aan 25°?",
          options: ["cos 25° = aangrensend/10", "sin 25° = aangrensend/10", "tan 25° = aangrensend/10", "cos 25° = 10/aangrensend"],
          answer: 0,
          topic: "Oplos van reghoekige driehoeke"
        },
        {
          type: "input",
          text: "'n Vlieër se tou is 30 m lank en maak 'n hoek van 50° met die horisontale grond. Vind die vlieër se hoogte bo die grond (2 d.p.).",
          answer: "22.98",
          altAnswers: ["22.99", "23.0", "23"],
          topic: "Oplos van reghoekige driehoeke"
        },
        {
          type: "input",
          text: "Vanaf punt A is die hoek van hoogte na die bopunt van 'n toring 30°. Vanaf punt B, 20 m nader aan die toring op dieselfde reguit lyn, is die hoek van hoogte 50°. Vind die hoogte van die toring (2 d.p.).",
          answer: "22.40",
          altAnswers: ["22.4"],
          topic: "Oplos van reghoekige driehoeke"
        }
      ]
    },
    {
      id: 503,
      chapter: 5,
      name: "Wederkerige verhoudings & trig-identiteite",
      fullName: "Werk met cosec, sec, cot, en die fundamentele trigonometriese identiteit",
      lesson: {
        heading: "Wederkerige verhoudings en die fundamentele trig-identiteit",
        sub: "Hoofstuk 5 · Onderwerp 4",
        body: `
          <p>Die wederkerige verhoudings <strong>cosec, sec,</strong> en <strong>cot</strong> verskyn spesifiek in die Graad 10-kurrikulum. Saam met die fundamentele identiteit laat hulle jou toe om uitdrukkings sonder 'n rekenaar te evalueer.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Definisies van wederkerige verhoudings</div>
            <p>
              <span class="math">cosec θ = 1/sin θ = skuinssy/teenoorstaande</span><br>
              <span class="math">sec θ = 1/cos θ = skuinssy/aangrensend</span><br>
              <span class="math">cot θ = 1/tan θ = aangrensend/teenoorstaande</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Die fundamentele identiteit</div>
            <p>
              <span class="math">sin²θ + cos²θ = 1</span> vir enige hoek θ.<br>
              Dit laat jou toe om een verhouding te vind as jy 'n ander ken, sonder 'n rekenaar — wees net versigtig met die teken (gebruik die kwadrant om + of − te bepaal).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vind sec θ gegewe sin θ</div>
            <p>
              As <span class="math">sin θ = 5/13</span> en θ skerp is, vind <span class="math">sec θ</span>.<br>
              <span class="math">cos²θ = 1 − sin²θ = 1 − 25/169 = 144/169 → cos θ = 12/13</span><br>
              <span class="math">sec θ = 1/cos θ = 13/12</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Gebruik van die identiteit gegewe 5sin θ + 4 = 0</div>
            <p>
              <span class="math">sin θ = −4/5</span>, dus <span class="math">sin²θ = 16/25</span>.<br>
              Volgens die identiteit: <span class="math">cos²θ = 1 − 16/25 = 9/25</span>.<br>
              Let daarop dat die vraag net <span class="math">sin²θ + cos²θ</span> vra, wat altyd gelyk is aan <strong>1</strong> — geen nodig om θ self te vind nie!
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Werk sonder 'n rekenaar</div>
            <p>Baie "sonder rekenaar"-vrae toets of jy herken dat die identiteit direk van toepassing is, eerder as dat jy werklik θ moet bereken. Soek altyd na 'n kortpad voordat jy deur die algebra werk.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Onthou watter verhouding die wederkerige is van watter: co<em>sec</em>ant koppel met <em>sin</em>us, <em>sec</em>ant koppel met <em>cos</em>inus (nie andersom nie) — 'n baie algemene verwarring.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "cosec θ is die wederkerige van:",
          options: ["sin θ", "cos θ", "tan θ", "cot θ"],
          answer: 0,
          topic: "Wederkerige verhoudings & trig-identiteite"
        },
        {
          type: "input",
          text: "As cos θ = 4/5 (θ skerp), vind sec θ as 'n breuk.",
          answer: "5/4",
          topic: "Wederkerige verhoudings & trig-identiteite"
        },
        {
          type: "mc",
          text: "Deur die identiteit te gebruik, as sin θ = 0.6, dan is cos²θ =",
          options: ["0.64", "0.36", "0.4", "0.8"],
          answer: 0,
          topic: "Wederkerige verhoudings & trig-identiteite"
        },
        {
          type: "input",
          text: "As tan θ = 3/4 (θ skerp), vind cot θ as 'n breuk.",
          answer: "4/3",
          topic: "Wederkerige verhoudings & trig-identiteite"
        },
        {
          type: "mc",
          text: "Vir enige hoek θ waar dit bepaal is, is sin²θ + cos²θ gelyk aan:",
          options: ["1", "0", "θ", "2sinθcosθ"],
          answer: 0,
          topic: "Wederkerige verhoudings & trig-identiteite"
        },
        {
          type: "input",
          text: "Gegewe 5cosθ − 3 = 0 en θ is skerp, vind tanθ as 'n breuk.",
          answer: "4/3",
          topic: "Wederkerige verhoudings & trig-identiteite"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 5 Werkboek — Trigonometrie",
    questions: [
      {
        number: 1,
        text: "In △ABC met regte hoek by C, AB = 10 en BC = 6.",
        parts: [
          { label: "a", text: "Bereken AC.", marks: 2 },
          { label: "b", text: "Skryf sin A, cos A, en tan A as breuke neer.", marks: 3 },
          { label: "c", text: "Vind die grootte van hoek A (tot die naaste graad).", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Evalueer sonder 'n rekenaar (wys alle stappe):",
        parts: [
          { label: "a", text: "sin 60° · cos 30° − sin 30° · cos 60°", marks: 3 },
          { label: "b", text: "(tan 45° + sin 60°) / cos 30°", marks: 3 },
          { label: "c", text: "cos²45° − sin²45°", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "Punt P(−5, 12) lê op die eindarm van hoek θ.",
        parts: [
          { label: "a", text: "Bereken r.", marks: 2 },
          { label: "b", text: "In watter kwadrant lê P?", marks: 1 },
          { label: "c", text: "Bepaal sin θ, cos θ, en tan θ.", marks: 3 }
        ]
      },
      {
        number: 4,
        text: "Los op vir θ ∈ [0°; 360°]:",
        parts: [
          { label: "a", text: "sin θ = √3/2", marks: 3 },
          { label: "b", text: "cos θ = −1/2", marks: 3 },
          { label: "c", text: "2tan θ + 2 = 0", marks: 4 }
        ]
      },
      {
        number: 5,
        text: "'n Landmeter staan by drie verskillende punte langs 'n reguit lyn vanaf die basis van 'n hoë gebou en meet die hoek van hoogte na die bopunt by elke punt. Die resultate word hieronder aangeteken: <br>Afstand vanaf gebou: 10 m, hoek van hoogte 71,6°.<br>Afstand vanaf gebou: 20 m, hoek van hoogte 56,3°.<br>Afstand vanaf gebou: 30 m, hoek van hoogte 45,0°.",
        parts: [
          { label: "a", text: "Gebruik die lesing by 30 m om die hoogte van die gebou te bereken.", marks: 2 },
          { label: "b", text: "Gebruik die lesing by 10 m om die hoogte van die gebou te bereken. Is dit konsekwent met jou antwoord vir (a)?", marks: 3 },
          { label: "c", text: "Gebruik die hoogte hierbo gevind om die hoek van hoogte te voorspel wat vanaf 'n punt 15 m van die gebou gemeet sou word (2 d.p.).", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "AC = √(100−36) = 8",
        b: "sin A = 6/10 = 3/5; cos A = 8/10 = 4/5; tan A = 6/8 = 3/4",
        c: "A = sin⁻¹(0.6) ≈ 37°"
      },
      2: {
        a: "(√3/2)(√3/2)−(1/2)(1/2) = 3/4−1/4 = 1/2",
        b: "(1+√3/2)/(√3/2) = 2/√3 + 1 = 2√3/3 + 1",
        c: "1/2 − 1/2 = 0"
      },
      3: {
        a: "r = 13",
        b: "Kwadrant 2",
        c: "sin θ = 12/13; cos θ = −5/13; tan θ = −12/5"
      },
      4: {
        a: "θ = 60° of 120°",
        b: "θ = 120° of 240°",
        c: "tan θ = −1 → θ = 135° of 315°"
      },
      5: {
        a: "tan45° = h/30 → h = 30×tan45° = 30 m",
        b: "tan71,6° = h/10 → h = 10×tan71,6° ≈ 30 m — ja, konsekwent met (a)",
        c: "tanθ = 30/15 = 2 → θ = tan⁻¹(2) ≈ 63,43°"
      }
    }
  }
});
