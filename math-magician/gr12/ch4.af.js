// Math Magician — Graad 12, Hoofstuk 4
// Trigonometrie — Saamgestelde Hoeke en Dubbelhoeke

MathMagician.registerChapter(4, {
  topics: [
    {
      id: 400,
      chapter: 4,
      name: "Saamgestelde-hoek-identiteite",
      fullName: "Saamgestelde-hoek-identiteite en hul bewyse",
      lesson: {
        heading: "Saamgestelde-hoek-identiteite",
        sub: "Hoofstuk 4 · Onderwerp 1",
        body: `
          <p>Graad 12-trigonometrie stel die <strong>saamgestelde-hoekformules</strong> bekend — die kragtigste gereedskap in die trig-gereedskapskis, gebruik om sin/cos van somme en verskille van hoeke uit te brei.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Saamgestelde-hoek-identiteite (op formuleblad gegee)</div>
            <p>
              <span class="math">sin(α ± β) = sinα·cosβ ± cosα·sinβ</span><br>
              <span class="math">cos(α + β) = cosα·cosβ − sinα·sinβ</span><br>
              <span class="math">cos(α − β) = cosα·cosβ + sinα·sinβ</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Dubbelhoek-identiteite (afgelei)</div>
            <p>
              Stel β = α in die saamgestelde formules:<br>
              <span class="math">sin(2α) = 2sinα·cosα</span><br>
              <span class="math">cos(2α) = cos²α − sin²α = 1 − 2sin²α = 2cos²α − 1</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Presiese waarde</div>
            <p>Evalueer sin 75° sonder 'n sakrekenaar:<br>
            <span class="math">sin 75° = sin(45° + 30°) = sin45°cos30° + cos45°sin30°</span><br>
            <span class="math">= (√2/2)(√3/2) + (√2/2)(½) = √6/4 + √2/4 = (√6 + √2)/4</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bewys 'n identiteit</div>
            <p>Bewys: sin(x + 30°) + sin(x − 30°) = sin x<br>
            LK = sinx·cos30°+cosx·sin30° + sinx·cos30°−cosx·sin30°<br>
            = 2sinx·cos30° = 2sinx·(√3/2) = √3 sinx ≠ sinx<br>
            (Dit sou NIE waar wees nie — verifieer altyd voordat jy aanneem!)</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Saamgestelde- & Dubbelhoek-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer hoeke α en β in — brei sin(α±β), cos(α±β), en dubbelhoekvorme uit.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">α (°)</div><input id="g12c4a" type="number" value="45" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">β (°)</div><input id="g12c4b" type="number" value="30" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Brei uit</button>
            </div>
            <div id="g12c4Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function d2r(d){return d*π/180;}
              function f(n){return n.toFixed(6);}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const αd=gv('g12c4a'),βd=gv('g12c4b');
                const out=document.getElementById('g12c4Out');
                if(isNaN(αd)||isNaN(βd)){out.innerHTML='<span style="color:#fca5a5;">Voer hoeke α en β in.</span>';return;}
                const α=d2r(αd),β=d2r(βd);
                const sinα=Math.sin(α),cosα=Math.cos(α),sinβ=Math.sin(β),cosβ=Math.cos(β);
                let html='<span style="color:rgba(221,225,240,0.40);">α = '+αd+'°, β = '+βd+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">sin(α+β) = sinα·cosβ+cosα·sinβ = '+f(sinα)+'·'+f(cosβ)+'+'+f(cosα)+'·'+f(sinβ)+'</span>';
                html+='  <span style="color:#6ee7b7;">= '+f(sinα*cosβ+cosα*sinβ)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">sin(α−β) = sinα·cosβ−cosα·sinβ</span>  <span style="color:#6ee7b7;">= '+f(sinα*cosβ-cosα*sinβ)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">cos(α+β) = cosα·cosβ−sinα·sinβ</span>  <span style="color:#6ee7b7;">= '+f(cosα*cosβ-sinα*sinβ)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">cos(α−β) = cosα·cosβ+sinα·sinβ</span>  <span style="color:#6ee7b7;">= '+f(cosα*cosβ+sinα*sinβ)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.40);">— Dubbelhoek (met α) —</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">sin(2α) = 2sinα·cosα</span>  <span style="color:#fcd34d;">= '+f(2*sinα*cosα)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">cos(2α) = cos²α−sin²α = 1−2sin²α = 2cos²α−1</span>  <span style="color:#fcd34d;">= '+f(cosα*cosα-sinα*sinα)+'</span>';
                out.innerHTML=html;
              }
              ['g12c4a','g12c4b'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c4Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "cos(A − B) = ", options: ["cosAcosB − sinAsinB", "cosAcosB + sinAsinB", "sinAcosB + cosAsinB", "cosA − cosB"], answer: 1, topic: "Saamgestelde-hoek-identiteite" },
        { type: "mc", text: "sin(2θ) anders uitgedruk:", options: ["sin²θ − cos²θ", "2sinθcosθ", "cos²θ − sin²θ", "2cos²θ − 1"], answer: 1, topic: "Saamgestelde-hoek-identiteite" },
        { type: "mc", text: "Presiese waarde van cos 15° = cos(45° − 30°):", options: ["(√6+√2)/4", "(√6−√2)/4", "(√3+1)/4", "(√3−1)/4"], answer: 0, topic: "Saamgestelde-hoek-identiteite" },
        { type: "mc", text: "cos(2x) uitgedruk slegs in terme van sinx:", options: ["2cos²x−1", "1−2sin²x", "cos²x−sin²x", "2sinxcosx"], answer: 1, topic: "Saamgestelde-hoek-identiteite" },
        { type: "input", text: "As sinα = 3/5 (α skerp), bepaal sin(2α).", answer: "24/25", topic: "Saamgestelde-hoek-identiteite" },
        { type: "input", text: "As sinA = 3/5 en cosB = 12/13, met A en B albei skerp, bepaal sin(A+B) as 'n breuk.", answer: "56/65", topic: "Saamgestelde-hoek-identiteite" }
      ]
    },
    {
      id: 401,
      chapter: 4,
      name: "Trig-vergelykings & 3D-toepassings",
      fullName: "Oplos van trig-vergelykings met saamgestelde hoeke en 3D-trigonometrievraagstukke",
      lesson: {
        heading: "Oplos van trig-vergelykings en 3D-vraagstukke",
        sub: "Hoofstuk 4 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Algemene oplossings van trig-vergelykings</div>
            <p>
              Vir <span class="math">sin x = k</span>: <span class="math">x = arcsin(k) + 360°n</span> of <span class="math">x = 180° − arcsin(k) + 360°n</span><br>
              Vir <span class="math">cos x = k</span>: <span class="math">x = ±arccos(k) + 360°n</span><br>
              Vir <span class="math">tan x = k</span>: <span class="math">x = arctan(k) + 180°n</span><br>
              (n ∈ ℤ — die "algemene oplossing")<br><br>
              Vervang spesifieke waardes van n om oplossings in 'n gegewe interval te vind.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Algemene oplossing</div>
            <p>Los sin(2x + 10°) = cos 40° op vir x ∈ [0°; 360°]<br>
            cos 40° = sin 50° (koverhouding)<br>
            <span class="math">2x + 10° = 50° + 360°n → x = 20° + 180°n</span><br>
            <span class="math">2x + 10° = 130° + 360°n → x = 60° + 180°n</span><br>
            In [0°; 360°]: x = 20°, 60°, 200°, 240°</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 3D-trigonometrie</div>
            <p>
              Probleme in 3D vereis dat jy <strong>reghoekige driehoeke binne die 3D-figuur</strong> identifiseer en die sinusreël, kosinusreël, of basiese trig-verhoudings stap vir stap toepas.<br><br>
              Sleutelstrategie: teken elke relevante driehoek apart met gemerkte sye en hoeke.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Algemene-Oplossing-Vinder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer sin/cos/tan = k in → kry die algemene oplossing en oplossings in [0°; 360°].</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Funksie</div>
                <select id="g12c4t2fn" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin</option><option value="cos">cos</option><option value="tan">tan</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x = k</div><input id="g12c4t2k" type="number" value="0.5" step="0.01" min="-1" max="1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c4t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g12c4t2Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(2));}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gs(id){return document.getElementById(id).value;}
              function calc(){
                const fn=gs('g12c4t2fn'),k=gv('g12c4t2k');
                const out=document.getElementById('g12c4t2Out');
                if(isNaN(k)){out.innerHTML='<span style="color:#fca5a5;">Voer k in.</span>';return;}
                const d2r=x=>x*Math.PI/180,r2d=x=>x*180/Math.PI;
                let html='',sols=[];
                if(fn==='sin'){
                  if(k<-1||k>1){out.innerHTML='<span style="color:#fca5a5;">sin x = k vereis −1 ≤ k ≤ 1.</span>';return;}
                  const ref=f(r2d(Math.asin(k)));
                  html='<span style="color:rgba(221,225,240,0.50);">Algemeen: x = '+ref+'° + 360°n  OF  x = '+(180-ref)+'° + 360°n</span><br>';
                  for(let n=-2;n<=2;n++){[ref+360*n,180-ref+360*n].forEach(v=>{if(v>=0&&v<=360)sols.push(f(v));});}
                } else if(fn==='cos'){
                  if(k<-1||k>1){out.innerHTML='<span style="color:#fca5a5;">cos x = k vereis −1 ≤ k ≤ 1.</span>';return;}
                  const ref=f(r2d(Math.acos(k)));
                  html='<span style="color:rgba(221,225,240,0.50);">Algemeen: x = ±'+ref+'° + 360°n</span><br>';
                  for(let n=-2;n<=2;n++){[ref+360*n,-ref+360*n].forEach(v=>{if(v>=0&&v<=360)sols.push(f(v));});}
                } else {
                  const ref=f(r2d(Math.atan(k)));
                  html='<span style="color:rgba(221,225,240,0.50);">Algemeen: x = '+ref+'° + 180°n</span><br>';
                  for(let n=-3;n<=3;n++){const v=ref+180*n;if(v>=0&&v<=360)sols.push(f(v));}
                }
                const unique=[...new Set(sols.map(String))].map(Number).sort((a,b)=>a-b);
                html+='<span style="color:#6ee7b7;">Oplossings in [0°; 360°]: x = '+unique.join('°, ')+'°</span>';
                out.innerHTML=html;
              }
              document.getElementById('g12c4t2k').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g12c4t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Algemene oplossing van tan x = 1:", options: ["x = 45° + 360°n", "x = 45° + 180°n", "x = ±45° + 360°n", "x = 135° + 360°n"], answer: 1, topic: "Trig-vergelykings & 3D-toepassings" },
        { type: "mc", text: "Los sin(x − 20°) = ½ op vir x ∈ [0°; 360°]. Die oplossings is:", options: ["x = 50° en 130°", "x = 50° en 170°", "x = 70° en 130°", "x = 90° en 70°"], answer: 1, topic: "Trig-vergelykings & 3D-toepassings" },
        { type: "mc", text: "In 'n 3D-probleem word die hoek van hoogte vanaf A na die punt T bo-op 'n vertikale toring BT gevind deur:", options: ["tan(hoek) = BT/AB", "Die kosinusreël in 3D", "Twee afsonderlike 2D-reghoekige driehoeke", "Die sinusreël direk in 3D"], answer: 0, topic: "Trig-vergelykings & 3D-toepassings" },
        { type: "mc", text: "Los op: 2sin²x − sinx − 1 = 0 vir x ∈ [0°; 360°]", options: ["x = 90°, 210°, 330°", "x = 90°, 210°, 270°", "x = 30°, 150°, 270°", "x = 270°, 210°, 330°"], answer: 0, topic: "Trig-vergelykings & 3D-toepassings" },
        { type: "input", text: "sin(x + 45°) = −1 vir x ∈ [0°; 360°]. Bepaal x.", answer: "225", altAnswers: ["225°"], topic: "Trig-vergelykings & 3D-toepassings" },
        { type: "mc", text: "Los op vir x ∈ [0°; 360°]: cos2x = sinx", options: ["x = 30°, 150°, 270°", "x = 30°, 150° slegs", "x = 60°, 300°, 90°", "x = 90°, 270°"], answer: 0, topic: "Trig-vergelykings & 3D-toepassings" }
      ]
    },
    {
      id: 402,
      chapter: 4,
      name: "Sinus-, kosinus- & oppervlakte-reël in 2D en 3D",
      fullName: "Toepassing van die sinusreël, kosinusreël, en oppervlakte-reël om probleme in twee en drie dimensies op te los",
      lesson: {
        heading: "Sinusreël, kosinusreël, en oppervlakte-reël in 2D/3D",
        sub: "Hoofstuk 4 · Onderwerp 3",
        body: `
          <p>Graad 12-probleme kombineer dikwels die sinusreël, kosinusreël, en oppervlakte-reël van Graad 11 met 3D-redenering — deur plat driehoeke een op 'n slag uit 'n 3D-figuur te onttrek.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die drie reëls (formuleblad-herinnering)</div>
            <p>
              <strong>Sinusreël:</strong> <span class="math">a/sinA = b/sinB = c/sinC</span><br>
              <strong>Kosinusreël:</strong> <span class="math">a² = b² + c² − 2bc·cosA</span><br>
              <strong>Oppervlakte-reël:</strong> <span class="math">Oppervlakte = ½ab·sinC</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Strategie vir 3D-probleme</div>
            <p>
              1. Identifiseer die vertikale/horisontale driehoek en enige driehoek wat NIE reghoekig is nie — dit is gewoonlik waar die sinus- of kosinusreël benodig word.<br>
              2. Teken elke driehoek apart, in 2D, en merk elke bekende sy/hoek.<br>
              3. Werk vanaf die driehoek met die meeste bekende inligting na die onbekende wat jy nodig het.<br>
              4. 'n Algemene patroon: gebruik die sinusreël in die horisontale (of skuins) driehoek om 'n sy te vind, dan gebruik basiese reghoekige-driehoek-trig (tan) in die vertikale driehoek om 'n hoogte te vind.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Toringprobleem</div>
            <p>TP is 'n vertikale toring met hoogte h. Vanaf punt Q op die grond is die hoek van hoogte na T gelyk aan x. QR = a, en hoek PQR = 150° (hoek TQP is x, die hoek by Q in driehoek PQR is 150°).<br>
            In driehoek PQR (horisontaal): gebruik die sinus- of kosinusreël om PQ te vind met die bekende hoek 150° en sy a.<br>
            Gebruik dan in reghoekige driehoek TPQ: h = PQ·tan(x).<br>
            Hierdie patroon van "vind eers een sy via die sinus-/kosinusreël, gebruik dan reghoekige-driehoek-trig vir hoogte" is die klassieke Graad 12 3D-struktuur.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Kosinusreël met algebra</div>
            <p>In ΔABC, a = c−1, b = c+1 (sye in terme van c). Gebruik die kosinusreël vir hoek C = 60°:<br>
            <span class="math">c² = a² + b² − 2ab·cos60° = (c−1)² + (c+1)² − (c−1)(c+1)</span><br>
            Vereenvoudig om c algebraïes te vind — 'n algemene "bewys/toon dat"-tipe vraag.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Driehoekoplosser (Sinus-/Kosinus-/Oppervlakte-reël)</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee sye en die ingeslote hoek C in — vind die derde sy, die ander hoeke, en die oppervlakte.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sy a</div><input id="g12c4t3a" type="number" value="8" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sy b</div><input id="g12c4t3b" type="number" value="10" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Hoek C (°, ingeslote)</div><input id="g12c4t3C" type="number" value="55" min="0.1" max="179.9" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c4t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los Driehoek Op</button>
            </div>
            <div id="g12c4t3Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c4t3a'),b=gv('g12c4t3b'),C=gv('g12c4t3C');
                const out=document.getElementById('g12c4t3Out');
                if([a,b,C].some(isNaN)||a<=0||b<=0||C<=0||C>=180){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe sye en 0 &lt; C &lt; 180° in.</span>';return;}
                const Cr=C*Math.PI/180;
                const c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(Cr));
                const area=0.5*a*b*Math.sin(Cr);
                // sinusreël vir hoek A: sinA/a = sinC/c
                const sinA=a*Math.sin(Cr)/c;
                const A=Math.asin(Math.min(1,sinA))*180/Math.PI;
                const B=180-C-A;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Kosinusreël: c² = a²+b²−2ab·cosC = '+f(a*a)+'+'+f(b*b)+'−2('+a+')('+b+')cos('+C+'°)</span><br>'+
                  '<span style="color:#6ee7b7;">c = '+f(c)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Sinusreël: sinA/a = sinC/c → A ≈ '+f(A)+'°,  B ≈ '+f(B)+'°</span><br>'+
                  '<span style="color:#fcd34d;">Oppervlakte = ½ab·sinC = ½('+a+')('+b+')sin('+C+'°) = '+f(area)+' eenhede²</span>';
              }
              ['g12c4t3a','g12c4t3b','g12c4t3C'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c4t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Die oppervlakte-reël vir 'n driehoek met sye a, b en ingeslote hoek C is:", options: ["½ab·sinC", "½ab·cosC", "abc/2", "½(a+b)sinC"], answer: 0, topic: "Sinus-, kosinus- & oppervlakte-reël in 2D en 3D" },
        { type: "mc", text: "Die kosinusreël is die nuttigste wanneer jy weet:", options: ["Twee hoeke en een sy", "Slegs drie hoeke", "Twee sye en die ingeslote hoek (of drie sye)", "Slegs een sy en een hoek"], answer: 2, topic: "Sinus-, kosinus- & oppervlakte-reël in 2D en 3D" },
        { type: "input", text: "Driehoek met a = 6, b = 9, ingeslote hoek C = 60°. Bepaal die oppervlakte (2 dp).", answer: "23.38", altAnswers: ["23,38"], topic: "Sinus-, kosinus- & oppervlakte-reël in 2D en 3D" },
        { type: "mc", text: "In 'n tipiese 3D-toringprobleem, nadat 'n horisontale sy met die sinus- of kosinusreël gevind is, word die hoogte gewoonlik gevind deur:", options: ["Die oppervlakte-reël", "Reghoekige-driehoek-trig (bv. tan)", "Die saamgestelde-hoek-identiteite", "Nog 'n toepassing van die kosinusreël"], answer: 1, topic: "Sinus-, kosinus- & oppervlakte-reël in 2D en 3D" },
        { type: "input", text: "Driehoek met sye a = 6, b = 8, c = 10. Gebruik die kosinusreël om hoek C (teenoor sy c) te bepaal, tot die naaste graad.", answer: "90", topic: "Sinus-, kosinus- & oppervlakte-reël in 2D en 3D" },
        { type: "mc", text: "Die sinusreël sê a/sinA = b/sinB = c/sinC. Hierdie verhouding is ook gelyk aan:", options: ["2R (R = omgeskrewe radius)", "Die driehoek se oppervlakte", "a + b + c", "Die omtrek gedeel deur 2"], answer: 0, topic: "Sinus-, kosinus- & oppervlakte-reël in 2D en 3D" },
        { type: "input", text: "TP is 'n vertikale toring. Q is 'n punt op die grond met 'n hoek van hoogte na T gelyk aan 42°. R is 'n ander punt op die grond met QR = 60 m, hoek PQR = 130°, en hoek QRP = 30°. Bepaal die hoogte van die toring TP (2 d.p.).", answer: "78.98", altAnswers: ["78,98"], topic: "Sinus-, kosinus- & oppervlakte-reël in 2D en 3D" }
      ]
    },
    {
      id: 403,
      chapter: 4,
      name: "Bewys van trigonometriese identiteite",
      fullName: "Tegnieke om trig-identiteite te bewys deur saamgestelde en dubbelhoekformules te gebruik",
      lesson: {
        heading: "Bewys van trigonometriese identiteite",
        sub: "Hoofstuk 4 · Onderwerp 4",
        body: `
          <p>"Bewys"- of "toon dat"-vrae vereis 'n logiese ketting van algebraïese stappe van een kant van 'n identiteit na die ander, deur bekende identiteite te gebruik — nie net numeriese toetsing nie.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Algemene strategie</div>
            <p>
              1. Begin met die meer ingewikkelde kant (gewoonlik die LK).<br>
              2. Brei enige saamgestelde of dubbelhoeke uit met die standaardidentiteite.<br>
              3. Vereenvoudig met algebra (faktorisering, gemene noemers) en die identiteit <span class="math">sin²θ + cos²θ = 1</span> waar nuttig.<br>
              4. Bly werk totdat jy presies die ander kant bereik. Werk nooit gelyktydig aan beide kante en "ontmoet in die middel" nie — skryf dit as een aaneenlopende ketting.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bewys sin2A/(1+cos2A) = tanA</div>
            <p><span class="math">LK = 2sinAcosA / (1 + 2cos²A − 1) = 2sinAcosA / 2cos²A = sinA/cosA = tanA = RK</span> ✓</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bewys (cosx − sinx)² = 1 − sin2x</div>
            <p><span class="math">LK = cos²x − 2sinxcosx + sin²x = (cos²x+sin²x) − 2sinxcosx = 1 − sin2x = RK</span> ✓</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Algemene boustene</div>
            <p>
              • sin2A = 2sinAcosA<br>
              • cos2A = cos²A − sin²A = 1 − 2sin²A = 2cos²A − 1 (drie omruilbare vorme — kies watter een ook al by die res van die uitdrukking pas)<br>
              • Let op vir 'n "verskil van kwadrate"-patroon: (cosA−sinA)(cosA+sinA) = cos²A − sin²A = cos2A
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Identiteitkontroleerder (numeriese verifikasie)</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Kies 'n bewerde identiteit en 'n toetshoek — sien beide kante geëvalueer om te kyk of hulle werklik ooreenstem ('n numeriese redelikheidstoets, nie 'n plaasvervanger vir 'n algebraïese bewys nie).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Identiteit</div>
                <select id="g12c4t4id" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;max-width:260px;">
                  <option value="i1">sin2A/(1+cos2A) = tanA</option>
                  <option value="i2">(cosA−sinA)² = 1−sin2A</option>
                  <option value="i3">cos2A = 1−2sin²A</option>
                </select>
              </div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A (°)</div><input id="g12c4t4A" type="number" value="35" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c4t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Kontroleer</button>
            </div>
            <div id="g12c4t4Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function gs(id){return document.getElementById(id).value;}
              function f(n){return parseFloat(n.toFixed(6));}
              function calc(){
                const id=gs('g12c4t4id'),Ad=gv('g12c4t4A');
                const out=document.getElementById('g12c4t4Out');
                if(isNaN(Ad)){out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n hoek in.</span>";return;}
                const A=Ad*Math.PI/180;
                const s=Math.sin(A),c=Math.cos(A);
                let lhs,rhs,label;
                if(id==='i1'){
                  label='sin2A/(1+cos2A) vs tanA';
                  const denom=1+(2*c*c-1);
                  lhs=Math.abs(denom)<1e-9?NaN:(2*s*c)/denom;
                  rhs=Math.tan(A);
                } else if(id==='i2'){
                  label='(cosA−sinA)² vs 1−sin2A';
                  lhs=(c-s)*(c-s);
                  rhs=1-2*s*c;
                } else {
                  label='cos2A vs 1−2sin²A';
                  lhs=c*c-s*s;
                  rhs=1-2*s*s;
                }
                const match=!isNaN(lhs)&&Math.abs(lhs-rhs)<1e-6;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+label+',  A = '+Ad+'°</span><br>'+
                  '<span style="color:#fcd34d;">LK = '+(isNaN(lhs)?'onbepaald':f(lhs))+'</span><br>'+
                  '<span style="color:#6ee7b7;">RK = '+f(rhs)+'</span><br>'+
                  (match?'<span style="color:#6ee7b7;">✅ Stem ooreen — konsekwent met die identiteit wat waar is.</span>':'<span style="color:#fca5a5;">⚠ Stem nie ooreen by hierdie hoek nie (of onbepaald) — kontroleer vir beperkings.</span>');
              }
              document.getElementById('g12c4t4A').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g12c4t4id').addEventListener('change',calc);
              document.getElementById('g12c4t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Om 'n identiteit te bewys, is die standaardbenadering om:", options: ["Een getal te vervang en te stop", "Van die meer komplekse kant af te werk om algebraïes die ander kant te bereik", "Gelyktydig aan beide kante te werk en in die middel te ontmoet", "Aan te neem die identiteit is waar sonder bewys"], answer: 1, topic: "Bewys van trigonometriese identiteite" },
        { type: "mc", text: "Vereenvoudig: sin2A/(1 + cos2A)", options: ["tanA", "cotA", "sinA", "2tanA"], answer: 0, topic: "Bewys van trigonometriese identiteite" },
        { type: "mc", text: "(cosA − sinA)² vereenvoudig na:", options: ["1 + sin2A", "1 − sin2A", "cos2A", "1 − 2cos2A"], answer: 1, topic: "Bewys van trigonometriese identiteite" },
        { type: "input", text: "Vereenvoudig (sinA + cosA)² − 1 in terme van 'n dubbelhoek.", answer: "sin2A", altAnswers: ["sin(2A)"], topic: "Bewys van trigonometriese identiteite" },
        { type: "mc", text: "Watter identiteit is NIE 'n geldige vorm van cos2A nie?", options: ["cos²A − sin²A", "1 − 2sin²A", "2cos²A − 1", "2cosA·sinA"], answer: 3, topic: "Bewys van trigonometriese identiteite" },
        { type: "input", text: "Vereenvoudig (1 − cos2A)/sin2A na 'n enkele trig-verhouding.", answer: "tanA", altAnswers: ["tan A", "tan(A)"], topic: "Bewys van trigonometriese identiteite" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 4 Werkboek — Trigonometrie",
    questions: [
      { number: 1, text: "Sonder 'n sakrekenaar:", parts: [
        { label: "a", text: "Evalueer sin 105° deur sin(60° + 45°) te gebruik.", marks: 4 },
        { label: "b", text: "Evalueer cos 2(30°) deur elk van die drie dubbelhoekvorme te gebruik.", marks: 4 }
      ]},
      { number: 2, text: "Bewys die volgende identiteite:", parts: [
        { label: "a", text: "cos(x + 45°) + cos(x − 45°) = √2 cos x", marks: 4 },
        { label: "b", text: "sin(A + B)/sin(A − B) = (tanA + tanB)/(tanA − tanB)", marks: 5 }
      ]},
      { number: 3, text: "Los op vir x ∈ [0°; 360°]:", parts: [
        { label: "a", text: "cos(2x) = cos x", marks: 5 },
        { label: "b", text: "sin(x + 30°) = cos x", marks: 5 }
      ]}
    ],
    answers: {
      1: { a: "sin105°=sin60°cos45°+cos60°sin45°=(√3/2)(√2/2)+(½)(√2/2)=√6/4+√2/4=(√6+√2)/4", b: "cos60°=cos²30°−sin²30°=¾−¼=½; =1−2sin²30°=1−½=½; =2cos²30°−1=3/2−1=½ ✓" },
      2: { a: "LK=(cosxcos45°−sinxsin45°)+(cosxcos45°+sinxsin45°)=2cosxcos45°=2cosx(√2/2)=√2cosx=RK", b: "LK=(sinAcosB+cosAsinB)/(sinAcosB−cosAsinB); deel teller en noemer deur cosAcosB → (tanA+tanB)/(tanA−tanB)=RK" },
      3: { a: "cos2x=cosx→2cos²x−1=cosx→2cos²x−cosx−1=0→(2cosx+1)(cosx−1)=0→cosx=−½of1→x=120°,240°,0°,360°", b: "sinxcos30°+cosxsin30°=cosx→(√3/2)sinx+(½)cosx=cosx→(√3/2)sinx=½cosx→tanx=1/√3→x=30°,210°" }
    }
  }
});
