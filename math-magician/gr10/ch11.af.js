// Math Magician — Grade 10, Chapter 11 (Afrikaans)
// Trigonometrie Deel 2 — 2D-probleme

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 1100,
      chapter: 11,
      name: "2D-trigonometrieprobleme",
      fullName: "Oplos van tweedimensionele probleme met behulp van trigonometrie",
      lesson: {
        heading: "Tweedimensionele trigonometrieprobleme",
        sub: "Hoofstuk 11 · Onderwerp 1",
        body: `
          <p>Trigonometrie word toegepas op werklike-wêreld probleme wat <strong>hoeke van hoogte</strong>, <strong>hoeke van depressie</strong>, en probleme met meervoudige driehoeke behels.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Hoeke van hoogte en depressie</div>
            <p>
              <strong>Hoek van hoogte (elevasie):</strong> die hoek gemeet <em>opwaarts</em> vanaf die horisontaal na die sigslyn.<br>
              <strong>Hoek van depressie:</strong> die hoek gemeet <em>afwaarts</em> vanaf die horisontaal na die sigslyn.<br><br>
              Hierdie is gelyk (alternerende hoeke) wanneer die waarnemer en voorwerp op 'n horisontale vlak is.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Hoogte van 'n gebou</div>
            <p>Vanaf 'n punt 40 m van die basis van 'n gebou, is die hoek van hoogte na die bopunt 32°.<br>
            <span class="math">tan 32° = hoogte/40</span><br>
            <span class="math">hoogte = 40 × tan 32° ≈ 40 × 0.6249 ≈ 25.0 m</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Strategie vir 2D-probleme</div>
            <p>
              1. Teken 'n duidelike diagram.<br>
              2. Merk alle bekende en onbekende sye en hoeke.<br>
              3. Identifiseer die reghoekige driehoek(e).<br>
              4. Pas die toepaslike verhouding toe (sin/cos/tan).<br>
              5. Los op vir die onbekende.<br>
              6. Gee jou antwoord in konteks met korrekte eenhede.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Reghoekige-driehoek-oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer 'n hoek en een sy in — bereken die oorblywende sye met SOK-KAH-TOA.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek θ (°)</div>
                <input id="g10c11ang" type="number" value="32" min="1" max="89"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Bekende sy</div>
                <select id="g10c11side"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="adj">Aanliggend</option>
                  <option value="opp">Oorstaande</option>
                  <option value="hyp">Skuinssy</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Lengte</div>
                <input id="g10c11len" type="number" value="40" min="0.01"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c11Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g10c11Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function run(){
                const ang=parseFloat(document.getElementById('g10c11ang').value);
                const side=document.getElementById('g10c11side').value;
                const len=parseFloat(document.getElementById('g10c11len').value);
                const out=document.getElementById('g10c11Out');
                if(isNaN(ang)||isNaN(len)||ang<=0||ang>=90||len<=0){out.innerHTML='<span style="color:#fca5a5;">Voer \\'n geldige hoek (1°–89°) en positiewe lengte in.</span>';return;}
                const rad=ang*Math.PI/180;
                const sinA=Math.sin(rad),cosA=Math.cos(rad),tanA=Math.tan(rad);
                let adj,opp,hyp;
                if(side==='adj'){adj=len;opp=adj*tanA;hyp=adj/cosA;}
                else if(side==='opp'){opp=len;adj=opp/tanA;hyp=opp/sinA;}
                else{hyp=len;opp=hyp*sinA;adj=hyp*cosA;}
                const used=side==='adj'?'tan θ = opp/adj → opp = adj × tan θ\ncos θ = adj/hyp → hyp = adj/cos θ'
                  :side==='opp'?'tan θ = opp/adj → adj = opp/tan θ\nsin θ = opp/hyp → hyp = opp/sin θ'
                  :'sin θ = opp/hyp → opp = hyp × sin θ\ncos θ = adj/hyp → adj = hyp × cos θ';
                let html='<span style="color:rgba(221,225,240,0.50);">θ = '+ang+'°, sin = '+f(sinA)+', cos = '+f(cosA)+', tan = '+f(tanA)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+used.replace('\n','<br><span style="color:rgba(221,225,240,0.50);">')+'</span><br>';
                html+='<span style="color:#6ee7b7;">Aanliggend = '+f(adj)+'</span>  <span style="color:#6ee7b7;">Oorstaande = '+f(opp)+'</span>  <span style="color:#6ee7b7;">Skuinssy = '+f(hyp)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c11Btn').addEventListener('click',run);
              ['g10c11ang','g10c11len'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir hoogte-/depressieprobleme word die hoek altyd vanaf die <strong>horisontaal</strong> gemeet. Die aanliggende sy is die horisontale afstand en die oorstaande is die vertikale hoogte.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vanaf die bopunt van 'n 30 m krans, is die hoek van depressie na 'n boot 28°. Die horisontale afstand na die boot is:",
          options: ["30/tan28°", "30·tan28°", "30·sin28°", "30/sin28°"],
          answer: 0,
          topic: "2D-trigonometrieprobleme"
        },
        {
          type: "input",
          text: "'n Leer leun teen 'n muur. Die leer is 5 m en maak 'n 60°-hoek met die grond. Hoe hoog teen die muur reik dit? (tot 1 desimale plek)",
          answer: "4.3",
          altAnswers: ["4,3"],
          topic: "2D-trigonometrieprobleme"
        },
        {
          type: "mc",
          text: "Die hoek van hoogte vanaf A na die bopunt van 'n toring is 45°. As die toring 20 m hoog is, is die afstand van A na die basis:",
          options: ["20 m", "10 m", "20√2 m", "40 m"],
          answer: 0,
          topic: "2D-trigonometrieprobleme"
        },
        {
          type: "mc",
          text: "Vanaf die bopunt van 'n gebou 50 m hoog, is die hoek van depressie na 'n motor 35°. Die afstand van die basis van die gebou na die motor (tot naaste meter) is:",
          options: ["35 m", "71 m", "29 m", "61 m"],
          answer: 1,
          topic: "2D-trigonometrieprobleme"
        },
        {
          type: "mc",
          text: "Twee mense staan aan weerskante van 'n vlagpaal. Persoon A is 8 m weg en sien die bopunt teen 60°. Persoon B sien die bopunt teen 45°. Watter vergelyking vind die hoogte h?",
          options: ["h = 8·tan60°", "h = 8·sin60°", "h = 8/tan60°", "h = 8·cos60°"],
          answer: 0,
          topic: "2D-trigonometrieprobleme"
        },
        {
          type: "input",
          text: "Vanaf 'n punt 25 m van die basis van 'n toring, is die hoek van hoogte na die bopunt 38°. Bereken die hoogte van die toring, korrek tot 2 desimale plekke.",
          answer: "19.53",
          altAnswers: ["19,53"],
          topic: "2D-trigonometrieprobleme"
        },
        {
          type: "input",
          text: "'n Vertikale paal 12 m hoog werp 'n horisontale skaduwee van 9 m. Bereken die hoek van hoogte van die son, korrek tot 1 desimale plek.",
          answer: "53.1",
          altAnswers: ["53,1", "53.1°"],
          topic: "2D-trigonometrieprobleme"
        }
      ]
    },
    {
      id: 1101,
      chapter: 11,
      name: "Meervoudige-driehoek-probleme",
      fullName: "Probleme met twee of meer driehoeke",
      lesson: {
        heading: "Probleme met meervoudige driehoeke",
        sub: "Hoofstuk 11 · Onderwerp 2",
        body: `
          <p>Sommige probleme vereis dat jy deur <strong>twee driehoeke</strong> in volgorde werk, en die antwoord van die eerste gebruik om die tweede op te los.</p>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Twee-driehoek-probleem</div>
            <p>Vanaf punt A is die hoek van hoogte na die bopunt (T) van 'n gebou 55°. Vanaf punt B, wat 20 m verder van die gebou se basis (C) is, is die hoek 35°.<br><br>
            Laat BC = 20, AC = d (onbekend), CT = h.<br>
            Van △ACT: <span class="math">tan 55° = h/d → h = d·tan55°</span><br>
            Van △BCT: <span class="math">tan 35° = h/(d+20)</span><br>
            Vervang: <span class="math">d·tan55° = (d+20)·tan35°</span><br>
            <span class="math">d(tan55° − tan35°) = 20·tan35°</span><br>
            <span class="math">d = 20·tan35°/(tan55° − tan35°)</span><br>
            Dan h = d·tan55°</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Wenk: Hou presiese waardes</div>
            <p>Wanneer jy in twee stadiums oplos, hou die tussentydse antwoord <em>onafgerond</em> in jou sakrekenaar, en rond eers af by die finale stap.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Twee-driehoek-hoogtevinder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Twee waarnemers by A (naaste) en B (verder) sien die bopunt van 'n vertikale struktuur. Voer die hoeke van hoogte en die afstand AB in — bereken die hoogte.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek by A (°)</div><input id="g10c11t2a" type="number" value="55" min="1" max="89" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek by B (°)</div><input id="g10c11t2b" type="number" value="35" min="1" max="89" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Afstand AB (m)</div><input id="g10c11t2d" type="number" value="20" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c11t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g10c11t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(3);}
              function run(){
                const angA=parseFloat(document.getElementById('g10c11t2a').value);
                const angB=parseFloat(document.getElementById('g10c11t2b').value);
                const AB=parseFloat(document.getElementById('g10c11t2d').value);
                const out=document.getElementById('g10c11t2Out');
                if(isNaN(angA)||isNaN(angB)||isNaN(AB)||angA<=angB||angA>=90||angB<=0||AB<=0){
                  out.innerHTML='<span style="color:#fca5a5;">Hoek by A moet groter as hoek by B wees (A is naaste). Albei moet tussen 1° en 89° wees.</span>';return;
                }
                const tA=Math.tan(angA*Math.PI/180),tB=Math.tan(angB*Math.PI/180);
                // h = d·tanA·tanB/(tanA − tanB)
                const h=AB*tA*tB/(tA-tB);
                const d=h/tA;
                let html='<span style="color:rgba(221,225,240,0.50);">Van △ACT: h = d·tanA → d = h/tanA</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Van △BCT: h = (d+AB)·tanB</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Oplos: h = AB·tanA·tanB/(tanA−tanB) = '+AB+'×'+f(tA)+'×'+f(tB)+'/('+f(tA)+'−'+f(tB)+')</span><br>';
                html+='<span style="color:#6ee7b7;">Hoogte = '+f(h)+' m</span>  <span style="color:rgba(221,225,240,0.50);">Afstand AC = '+f(d)+' m</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c11t2Btn').addEventListener('click',run);
              ['g10c11t2a','g10c11t2b','g10c11t2d'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die formule h = d·tanA·tanB/(tanA − tanB) kom van die opstel van albei tan-vergelykings en die algebraïese eliminasie van d — 'n belangrike eksamentegniek.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In 'n twee-driehoek-probleem, moet jy altyd:",
          options: ["Dieselfde hoek in albei driehoeke gebruik", "'n Gedeelde sy tussen die twee driehoeke vind", "Sin vir een en cos vir die ander gebruik", "Eers na grade omskakel"],
          answer: 1,
          topic: "Meervoudige-driehoek-probleme"
        },
        {
          type: "mc",
          text: "Vanaf A is die hoogte na 'n toring se bopunt 40°. Vanaf B (15 m verder terug), is dit 25°. Die gedeelde sy is:",
          options: ["Die toringhoogte", "Die basis vanaf B", "Die skuinssy", "Die afstand AB"],
          answer: 0,
          topic: "Meervoudige-driehoek-probleme"
        },
        {
          type: "mc",
          text: "'n Vlieër se tou maak 50° met die grond en is 80 m lank. Aanvaar die tou is reguit, die hoogte van die vlieër is ongeveer:",
          options: ["51 m", "61 m", "73 m", "80 m"],
          answer: 1,
          topic: "Meervoudige-driehoek-probleme"
        },
        {
          type: "mc",
          text: "Wanneer jy tussentydse waardes in die sakrekenaar hou, moet jy:",
          options: ["By elke stap tot 2 desimale plekke afrond", "Slegs by die finale antwoord afrond", "Slegs spesiale hoeke gebruik", "Eers na radiale omskakel"],
          answer: 1,
          topic: "Meervoudige-driehoek-probleme"
        },
        {
          type: "input",
          text: "In 'n reghoekige driehoek, watter verhouding koppel die oorstaande sy aan die skuinssy?",
          answer: "sin",
          topic: "Meervoudige-driehoek-probleme"
        },
        {
          type: "input",
          text: "Vanaf A is die hoek van hoogte na die bopunt van 'n toring 50°. Vanaf B, 15 m verder van die toring langs dieselfde lyn, is die hoek 30°. Bereken die hoogte van die toring, korrek tot 2 desimale plekke.",
          answer: "16.80",
          altAnswers: ["16.8", "16,80", "16,8"],
          topic: "Meervoudige-driehoek-probleme"
        }
      ]
    },
    {
      id: 1102,
      chapter: 11,
      name: "Rigtings- & navigasieprobleme",
      fullName: "Oplos van tweedimensionele probleme met kompasrigtings",
      lesson: {
        heading: "Rigtings- en navigasieprobleme",
        sub: "Hoofstuk 11 · Onderwerp 3",
        body: `
          <p>'n <strong>Rigting (bearing)</strong> is 'n manier om rigting te beskryf as 'n hoek gemeet <em>kloksgewys vanaf Noord</em>, altyd geskryf as drie syfers (bv. 035°, 270°).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Lees en gebruik van rigtings</div>
            <p>
              • Noord = 000°, Oos = 090°, Suid = 180°, Wes = 270°.<br>
              • 'n Rigting van 060° beteken 60° kloksgewys vanaf Noord.<br>
              • Om die terugkeer- (rug-) rigting te vind, tel 180° by as die oorspronklike rigting minder as 180° is, of trek 180° af as dit 180° of meer is.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Strategie vir rigtingsprobleme</div>
            <p>
              1. Teken 'n diagram met kompasrigtings by elke punt gemerk.<br>
              2. Skakel rigtings om na hoeke binne die driehoek wat deur die roetes gevorm word (dikwels deur gebruik te maak van mede-binne- of alternerende-hoek-feite, aangesien Noordlyne by verskillende punte ewewydig is).<br>
              3. Pas reghoekige trigonometrie toe (of verdeel in reghoekige driehoeke) om die onbekende afstand of hoek te vind.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>'n Skip vaar vanaf hawe P op 'n rigting van 090° (reguit Oos) vir 40 km na punt Q. Vanaf Q is dit bekend dat die rigting terug na P 270° is.<br>
            'n Stapper by P wil die rigting van 'n berg M weet, reguit Noord van Q op 'n afstand van 30 km.<br>
            Aangesien PQ ⊥ QM (P→Q is Oos, Q→M is Noord), is △PQM reghoekig by Q.<br>
            <span class="math">tan(∠QPM) = 30/40 = 0.75 → ∠QPM ≈ 36.87°</span><br>
            Rigting van M vanaf P = 090° − 36.87° ≈ 053.1°</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Reghoekige-rigting-oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">'n Persoon reis Oos en dan Noord ('n regte-hoek-draai) — voer albei afstande in om die direkte afstand en die rigting terug na die beginpunt te vind.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Oos-been (km)</div><input id="g10c11bE" type="number" value="40" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Noord-been (km)</div><input id="g10c11bN" type="number" value="30" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c11bBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g10c11bOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(2);}
              function run(){
                const E=parseFloat(document.getElementById('g10c11bE').value);
                const N=parseFloat(document.getElementById('g10c11bN').value);
                const out=document.getElementById('g10c11bOut');
                if(isNaN(E)||isNaN(N)||E<=0||N<=0){out.innerHTML='<span style="color:#fca5a5;">Voer twee positiewe afstande in.</span>';return;}
                const dist=Math.sqrt(E*E+N*N);
                const angleFromEast=Math.atan2(N,E)*180/Math.PI; // angle above the East line at start
                const bearingOut=90-angleFromEast; // bearing of final point from start
                const bearingBack=(bearingOut+180)%360;
                let html='<span style="color:rgba(221,225,240,0.50);">Direkte afstand = √(E²+N²) = √('+E+'²+'+N+'²) = </span><span style="color:#6ee7b7;">'+f(dist)+' km</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Hoek bo die Oos-lyn = tan⁻¹('+N+'/'+E+') ≈ '+f(angleFromEast)+'°</span><br>';
                html+='<span style="color:#6ee7b7;">Rigting van eindpunt vanaf begin ≈ '+f(bearingOut)+'°</span>  ';
                html+='<span style="color:#fcd34d;">Rigting terug na begin ≈ '+f(bearingBack)+'°</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c11bBtn').addEventListener('click',run);
              ['g10c11bE','g10c11bN'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Noordlyne wat by twee verskillende punte geteken word, is ewewydig — dit laat jou toe om alternerende/mede-binne-hoek-feite te gebruik om 'n rigtingshoek na 'n bruikbare driehoekhoek oor te dra.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Rigting van 135° beteken die rigting is:",
          options: ["Reguit Suid", "Suid-Oos", "Noord-Oos", "Suid-Wes"],
          answer: 1,
          topic: "Rigtings- & navigasieprobleme"
        },
        {
          type: "mc",
          text: "As die rigting van A na B 050° is, is die rigting van B na A (die terugkeerrigting):",
          options: ["050°", "130°", "230°", "310°"],
          answer: 2,
          topic: "Rigtings- & navigasieprobleme"
        },
        {
          type: "input",
          text: "'n Stapper loop 60 km Oos en dan 25 km Noord. Bereken die direkte afstand terug na die beginpunt (tot 1 desimale plek).",
          answer: "65.0",
          altAnswers: ["65", "65,0"],
          topic: "Rigtings- & navigasieprobleme"
        },
        {
          type: "mc",
          text: "'n Skip reis 50 km op 'n rigting van 090° en dan 50 km op 'n rigting van 000°. Die hoek tussen sy uitgaande been en sy finale posisie (soos vanaf die begin gesien), gemeet vanaf Oos na Noord, is die naaste aan:",
          options: ["30°", "45°", "60°", "90°"],
          answer: 1,
          topic: "Rigtings- & navigasieprobleme"
        },
        {
          type: "mc",
          text: "Twee dorpe se Noordlyne word in 'n rigtingsprobleem gebruik. Waarom kan alternerende hoeke tussen hulle gebruik word?",
          options: ["Die Noordlyne is loodreg", "Die Noordlyne is ewewydig", "Die dorpe is dieselfde afstand van die ewenaar", "Rigtings is altyd minder as 180°"],
          answer: 1,
          topic: "Rigtings- & navigasieprobleme"
        },
        {
          type: "input",
          text: "'n Stapper loop 18 km op 'n rigting van 060°, en dan 24 km op 'n rigting van 150° ('n regte-hoek-draai). Bereken die direkte afstand van die begin- na die eindpunt.",
          answer: "30",
          altAnswers: ["30 km", "30.0"],
          topic: "Rigtings- & navigasieprobleme"
        },
        {
          type: "input",
          text: "'n Skip vaar 45 km op 'n rigting van 090°, en dan 28 km op 'n rigting van 000°. Bereken die rigting van die finale posisie vanaf die beginpunt, tot die naaste graad.",
          answer: "058",
          altAnswers: ["58", "058°", "58°"],
          topic: "Rigtings- & navigasieprobleme"
        }
      ]
    },
    {
      id: 1103,
      chapter: 11,
      name: "Gemengde 2D-trigonometrie-toepassings",
      fullName: "Kombinasie van hoogte-, depressie-, en meervoudige-driehoek-tegnieke in gemengde probleme",
      lesson: {
        heading: "Gemengde 2D-trigonometrie-toepassings",
        sub: "Hoofstuk 11 · Onderwerp 4",
        body: `
          <p>Eksamenprobleme kombineer dikwels verskeie idees terselfdertyd — hoogte en depressie, twee driehoeke, en soms die sinusreël of kosinusreël informeel uitgebrei deur reghoekige verdeling.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Herken die regte benadering</div>
            <p>
              • As daar EEN reghoekige driehoek en een onbekende is → gebruik SOK-KAH-TOA direk.<br>
              • As TWEE driehoeke 'n gemeenskaplike sy of hoek deel → stel twee vergelykings op en los gelyktydig op (soos in die vlagpaal-/twee-driehoek-metode).<br>
              • As 'n probleem sowel 'n hoek van hoogte as 'n hoek van depressie vanaf dieselfde punt gee → kombineer die twee hoeke om die volle hoek tussen die sigslyne te gee.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Hoogte en depressie saam</div>
            <p>Vanaf die bopunt van 'n 45 m toring, is die hoek van hoogte na die bopunt van 'n hoër gebou 20°, en die hoek van depressie na die basis van dieselfde gebou 35°. Die geboue is op gelyke grond.<br>
            Horisontale afstand: <span class="math">tan35° = 45/d → d = 45/tan35° ≈ 64.26 m</span><br>
            Ekstra hoogte bo torinvlak: <span class="math">tan20° = h/d → h = 64.26 × tan20° ≈ 23.39 m</span><br>
            Totale geboue hoogte ≈ 45 + 23.39 ≈ 68.39 m</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Die klassieke "twee vlagpale"-probleem</div>
            <p>Twee vlagpale van verskillende hoogtes staan 'n bekende afstand uitmekaar, verbind deur twee toue wat tussen die bopunt van elke paal en die voet van die ander kruis. Die hoogte waar die toue kruis, kan met gelykvormige driehoeke gevind word: <span class="math">hoogte = (h₁ × h₂)/(h₁ + h₂)</span>, onafhanklik van die afstand tussen die pale!</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Twee Vlagpale — Tou-kruishoogte</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die hoogtes van twee vlagpale in — bereken waar twee toue (bopunt-na-voet) wat tussen hulle kruis, sny.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Paal 1 hoogte (m)</div><input id="g10c11fh1" type="number" value="10" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Paal 2 hoogte (m)</div><input id="g10c11fh2" type="number" value="15" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Afstand uitmekaar (m)</div><input id="g10c11fd" type="number" value="30" min="0.1" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c11fBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g10c11fOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(3);}
              function run(){
                const h1=parseFloat(document.getElementById('g10c11fh1').value);
                const h2=parseFloat(document.getElementById('g10c11fh2').value);
                const d=parseFloat(document.getElementById('g10c11fd').value);
                const out=document.getElementById('g10c11fOut');
                if([h1,h2,d].some(isNaN)||h1<=0||h2<=0||d<=0){out.innerHTML='<span style="color:#fca5a5;">Voer drie positiewe waardes in.</span>';return;}
                const h=(h1*h2)/(h1+h2);
                let html='<span style="color:rgba(221,225,240,0.50);">hoogte = (h₁×h₂)/(h₁+h₂) = ('+h1+'×'+h2+')/('+h1+'+'+h2+')</span><br>';
                html+='<span style="color:#6ee7b7;">Kruishoogte ≈ '+f(h)+' m</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">— let op dat dit NIE van die afstand uitmekaar afhang nie ('+d+' m het geen effek gehad nie)!</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c11fBtn').addEventListener('click',run);
              ['g10c11fh1','g10c11fh2','g10c11fd'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die vlagpaal-kruishoogte-formule verras baie leerders omdat die afstand tussen die pale algebraïes uitkanselleer — kontroleer altyd of 'n "duidelik nodige" waarde eintlik uitkanselleer voordat jy aanneem dat jy inligting kortkom.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Twee vlagpale is 12 m en 8 m hoog. Toue verbind die bopunt van elkeen aan die voet van die ander. Die hoogte waar hulle kruis, is:",
          options: ["4.8 m", "10 m", "6 m", "20 m"],
          answer: 0,
          topic: "Gemengde 2D-trigonometrie-toepassings"
        },
        {
          type: "mc",
          text: "Vanaf 'n 50 m toring, is die hoek van depressie na die basis van 'n nabygeleë gebou 40°, en die hoek van hoogte na sy bopunt 15°. Watter twee reghoekige driehoeke word benodig?",
          options: ["Net een — hulle gebruik dieselfde driehoek", "Een driehoek vir die horisontale afstand, 'n ander vir die ekstra hoogte bo die toring", "Geeneen — gebruik slegs die sinusreël", "Die geboue hoogte kan nie gevind word nie"],
          answer: 1,
          topic: "Gemengde 2D-trigonometrie-toepassings"
        },
        {
          type: "input",
          text: "Twee vlagpale is 20 m en 30 m hoog. Bereken die hoogte (in m, tot 1 desimale plek) waar die verbindende toue kruis.",
          answer: "12.0",
          altAnswers: ["12", "12,0"],
          topic: "Gemengde 2D-trigonometrie-toepassings"
        },
        {
          type: "mc",
          text: "In die vlagpaal-kruisprobleem, die afstand tussen die pale:",
          options: ["Moet eers gemeet word", "Kanselleer uit die finale hoogteformule", "Verdubbel die kruishoogte", "Word benodig om te bepaal watter tou langer is"],
          answer: 1,
          topic: "Gemengde 2D-trigonometrie-toepassings"
        },
        {
          type: "mc",
          text: "Vanaf die bopunt van 'n krans, is die hoek van depressie na 'n boot 25° en na 'n tweede boot verder uit 12°. Om die afstand tussen die bote te vind, moet jy:",
          options: ["Die twee horisontale afstande wat afsonderlik gevind is, aftrek", "Die twee hoeke optel", "Slegs die nader boot se data gebruik", "Die twee tangens-verhoudings vermenigvuldig"],
          answer: 0,
          topic: "Gemengde 2D-trigonometrie-toepassings"
        },
        {
          type: "input",
          text: "Vanaf die bopunt van 'n 36 m toring, is die hoek van depressie na die basis van 'n nabygeleë gebou 32°, en die hoek van hoogte na die bopunt van dieselfde gebou 18°. Bereken die totale hoogte van die gebou, korrek tot 2 desimale plekke.",
          answer: "54.72",
          altAnswers: ["54,72"],
          topic: "Gemengde 2D-trigonometrie-toepassings"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 11 Werkboek — Trigonometrie Deel 2",
    questions: [
      {
        number: 1,
        text: "'n Vlieënier wat op 3 500 m hoogte vlieg, sien 'n lughawe teen 'n hoek van depressie van 18°.",
        parts: [
          { label: "a", text: "Teken 'n diagram.", marks: 2 },
          { label: "b", text: "Bereken die horisontale afstand van die vliegtuig na die lughawe (tot die naaste meter).", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Vanaf punt A op gelyke grond, is die hoek van hoogte na die bopunt van 'n vertikale toring BC 48°. Punt A is 25 m van die basis B.",
        parts: [
          { label: "a", text: "Bereken die hoogte van die toring (tot 2 desimale plekke).", marks: 3 },
          { label: "b", text: "Punt D is op dieselfde lyn as A en B, aan die ander kant van B, 10 m van B. Bereken die hoek van hoogte vanaf D na die bopunt van die toring.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "Vanaf die bopunt van 'n krans 60 m hoog, word twee bote A en B in die see waargeneem. Boot A het 'n hoek van depressie van 42°, boot B het 'n hoek van depressie van 28°. Bote A en B is aan dieselfde kant van die krans in 'n reguit lyn.",
        parts: [
          { label: "a", text: "Bereken die afstand van die basis van die krans na boot A.", marks: 3 },
          { label: "b", text: "Bereken die afstand van die basis van die krans na boot B.", marks: 3 },
          { label: "c", text: "Bereken die afstand tussen die twee bote.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Reghoekige driehoek: horisontale afstand vanaf reg onder die vliegtuig na die lughawe",
        b: "tan18° = 3500/d → d = 3500/tan18° ≈ 10 763 m"
      },
      2: {
        a: "tan48° = BC/25 → BC = 25×tan48° ≈ 27.77 m",
        b: "tan θ = 27.77/35 → θ ≈ 38.4°"
      },
      3: {
        a: "tan42° = 60/dA → dA = 60/tan42° ≈ 66.64 m",
        b: "tan28° = 60/dB → dB = 60/tan28° ≈ 112.87 m",
        c: "AB = 112.87 − 66.64 ≈ 46.23 m"
      }
    }
  }
});
