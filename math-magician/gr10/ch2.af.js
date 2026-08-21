// Math Magician — Grade 10, Chapter 2 (Afrikaans)
// Eksponente

MathMagician.registerChapter(2, {
  topics: [
    {
      id: 200,
      chapter: 2,
      name: "Eksponentwette",
      fullName: "Hersiening en toepassing van eksponentwette",
      lesson: {
        heading: "Eksponentwette",
        sub: "Hoofstuk 2 · Onderwerp 1",
        body: `
          <p>Die <strong>eksponentwette</strong> gee reëls vir die werk met magte. Hierdie word in Graad 10 uitgebrei om rasionale (gebreekte) eksponente in te sluit.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die eksponentwette</div>
            <p>
              <strong>Vermenigvuldiging:</strong> <span class="math">aᵐ · aⁿ = aᵐ⁺ⁿ</span><br>
              <strong>Deling:</strong> <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span><br>
              <strong>Mag van 'n mag:</strong> <span class="math">(aᵐ)ⁿ = aᵐⁿ</span><br>
              <strong>Mag van 'n produk:</strong> <span class="math">(ab)ⁿ = aⁿbⁿ</span><br>
              <strong>Negatiewe eksponent:</strong> <span class="math">a⁻ⁿ = 1/aⁿ</span><br>
              <strong>Nul-eksponent:</strong> <span class="math">a⁰ = 1</span> (a ≠ 0)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Rasionale eksponente (nuut in Graad 10)</div>
            <p>
              <span class="math">a^(1/n) = ⁿ√a</span> (die nde wortel van a)<br>
              <span class="math">a^(m/n) = (ⁿ√a)ᵐ = ⁿ√(aᵐ)</span><br>
              Voorbeeld: <span class="math">8^(2/3) = (∛8)² = 2² = 4</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vereenvoudig</div>
            <p><strong>(a)</strong> <span class="math">2³ · 2⁵ ÷ 2⁴ = 2^(3+5−4) = 2⁴ = 16</span></p>
            <p><strong>(b)</strong> <span class="math">(3x²y)³ = 27x⁶y³</span></p>
            <p><strong>(c)</strong> <span class="math">x^(−2) · x^(5/2) = x^(−2 + 5/2) = x^(1/2) = √x</span></p>
            <p><strong>(d)</strong> <span class="math">27^(2/3) = (∛27)² = 3² = 9</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Strategiewenk</div>
            <p>Skakel altyd <strong>wortelvorme om na rasionale eksponente</strong> voordat jy eksponentwette toepas. Dit vermy foute en hou jou berekeninge stelselmatig.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Rasionale-Eksponent-Berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Evalueer <strong>a^(m/n)</strong> stap vir stap — voer die grondtal en gebreekte eksponent in.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Grondtal (a)</div>
                <input id="g10c2base" type="number" value="8"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">m (mag)</div>
                <input id="g10c2m" type="number" value="2"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n (wortel)</div>
                <input id="g10c2n" type="number" value="3" min="1"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c2Btn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Evalueer
              </button>
            </div>
            <div id="g10c2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function nthRoot(base, n){ return Math.pow(Math.abs(base), 1/n) * (base < 0 && n%2===1 ? -1 : 1); }
              function isNice(x){ return Math.abs(x - Math.round(x)) < 0.0001; }
              function run(){
                const a=parseFloat(document.getElementById('g10c2base').value);
                const m=parseFloat(document.getElementById('g10c2m').value);
                const n=parseFloat(document.getElementById('g10c2n').value);
                const out=document.getElementById('g10c2Out');
                if(isNaN(a)||isNaN(m)||isNaN(n)||n===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (n ≠ 0).</span>';return;}
                if(a < 0 && n % 2 === 0){out.innerHTML='<span style="color:#fca5a5;">\'n Ewewortel van \'n negatiewe getal is nie reëel nie.</span>';return;}
                const root = nthRoot(a, n);
                const result = Math.pow(root, m);
                const rootNice = isNice(root);
                const resultNice = isNice(result);
                let html = '<span style="color:rgba(221,225,240,0.50);">Uitdrukking: </span><span style="color:#fcd34d;">'+a+'^('+m+'/'+n+')</span><br>';
                html += '<span style="color:rgba(221,225,240,0.50);">Stap 1 — trek die '+n+(n===1?'ste':n===8?'ste':'de')+' wortel: ⁿ√'+a+' = '+(rootNice?Math.round(root):root.toFixed(4))+'</span><br>';
                html += '<span style="color:rgba(221,225,240,0.50);">Stap 2 — verhef tot die mag '+m+': ('+(rootNice?Math.round(root):root.toFixed(4))+')^'+m+' = </span>';
                html += '<span style="color:#6ee7b7;">'+(resultNice?Math.round(result):result.toFixed(4))+'</span>';
                if(!resultNice) html += '<br><span style="color:rgba(221,225,240,0.40);font-size:12px;">Resultaat is irrasionaal — desimaal getoon</span>';
                out.innerHTML = html;
              }
              document.getElementById('g10c2Btn').addEventListener('click', run);
              ['g10c2base','g10c2m','g10c2n'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Trek altyd <em>eerste</em> die wortel, en pas dan die mag toe — kleiner getalle is makliker om mee te werk. <span class="math">27^(2/3) = (∛27)² = 3² = 9</span> is baie makliker as <span class="math">∛(27²) = ∛729</span>.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vereenvoudig: x⁵ · x⁻² ÷ x",
          options: ["x²", "x⁸", "x⁶", "x³"],
          answer: 0,
          topic: "Eksponentwette"
        },
        {
          type: "input",
          text: "Evalueer: 16^(3/4)",
          answer: "8",
          topic: "Eksponentwette"
        },
        {
          type: "mc",
          text: "Watter een is gelyk aan (2x³)⁴?",
          options: ["8x⁷", "16x⁷", "16x¹²", "8x¹²"],
          answer: 2,
          topic: "Eksponentwette"
        },
        {
          type: "mc",
          text: "Vereenvoudig: (a²b⁻³)/(a⁻¹b²)",
          options: ["a³/b", "a³b⁵", "a/b⁵", "a³/b⁵"],
          answer: 3,
          topic: "Eksponentwette"
        },
        {
          type: "input",
          text: "Evalueer: (8/27)^(−2/3)",
          answer: "9/4",
          altAnswers: ["2.25", "2,25"],
          topic: "Eksponentwette"
        },
        {
          type: "input",
          text: "Vereenvoudig sonder 'n sakrekenaar: 16^(−1/4) × 8^(2/3) ÷ 2^(−1)",
          answer: "4",
          topic: "Eksponentwette"
        },
        {
          type: "input",
          text: "As 2^x = 5 en 2^y = 20, bepaal die waarde van 2^(y−x) sonder om x of y afsonderlik te bepaal.",
          answer: "4",
          topic: "Eksponentwette"
        }
      ]
    },
    {
      id: 201,
      chapter: 2,
      name: "Eksponensiële vergelykings",
      fullName: "Los eksponensiële vergelykings op",
      lesson: {
        heading: "Los eksponensiële vergelykings op",
        sub: "Hoofstuk 2 · Onderwerp 2",
        body: `
          <p>'n <strong>Eksponensiële vergelyking</strong> het die onbekende in die eksponent. Die sleutelstrategie is om albei kante met <strong>dieselfde grondtal</strong> uit te druk, en dan die eksponente gelyk te stel.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Metode</div>
            <p>
              <strong>Stap 1:</strong> Skryf albei kante as magte van dieselfde grondtal.<br>
              <strong>Stap 2:</strong> Stel die eksponente gelyk.<br>
              <strong>Stap 3:</strong> Los die vergelyking op wat volg.<br><br>
              Sleutelfeit: as <span class="math">aˣ = aʸ</span> en <span class="math">a > 0, a ≠ 1</span>, dan is <span class="math">x = y</span>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op</div>
            <p><strong>(a)</strong> <span class="math">2^(x+1) = 8</span><br>
            <span class="math">2^(x+1) = 2³</span><br>
            <span class="math">x + 1 = 3</span><br>
            <span class="math">x = 2</span></p>

            <p><strong>(b)</strong> <span class="math">9^x = 27^(x−1)</span><br>
            <span class="math">(3²)^x = (3³)^(x−1)</span><br>
            <span class="math">3^(2x) = 3^(3x−3)</span><br>
            <span class="math">2x = 3x − 3</span><br>
            <span class="math">x = 3</span></p>

            <p><strong>(c)</strong> <span class="math">4^x − 5·2^x + 4 = 0</span><br>
            Laat <span class="math">k = 2^x</span>: <span class="math">k² − 5k + 4 = 0</span><br>
            <span class="math">(k−1)(k−4) = 0</span><br>
            <span class="math">k = 1</span> → <span class="math">2^x = 1</span> → <span class="math">x = 0</span><br>
            <span class="math">k = 4</span> → <span class="math">2^x = 4</span> → <span class="math">x = 2</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Algemene grondtalle om te memoriseer</div>
            <p>
              Magte van 2: 1, 2, 4, 8, 16, 32, 64, 128, 256<br>
              Magte van 3: 1, 3, 9, 27, 81, 243<br>
              Magte van 5: 1, 5, 25, 125<br>
              Let wel: <span class="math">4 = 2², 8 = 2³, 9 = 3², 27 = 3³, 25 = 5²</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Eksponensiële-Vergelyking-Oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die grondtal in en waaraan die uitdrukking gelyk is — sien hoe om na dieselfde grondtal om te skakel en op te los.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Grondtal b</div>
                <select id="g10c2eBase"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div style="padding-bottom:8px;color:rgba(221,225,240,0.60);font-size:18px;font-family:'JetBrains Mono',monospace;">b^x =</div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Resultaat</div>
                <input id="g10c2eResult" type="number" value="32"
                  style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c2eBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Los op
              </button>
            </div>
            <div id="g10c2eOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function logBase(b, x){ return Math.log(x) / Math.log(b); }
              function isNice(x){ return Math.abs(x - Math.round(x)) < 0.0001; }
              function solve(){
                const b = parseInt(document.getElementById('g10c2eBase').value);
                const R = parseFloat(document.getElementById('g10c2eResult').value);
                const out = document.getElementById('g10c2eOut');
                if(isNaN(R)||R<=0){out.innerHTML='<span style="color:#fca5a5;">Resultaat moet \'n positiewe getal wees.</span>';return;}
                const x = logBase(b, R);
                const nice = isNice(x);
                // Check if R is a power of b
                let html = '<span style="color:rgba(221,225,240,0.50);">Vergelyking: </span><span style="color:#fcd34d;">'+b+'^x = '+R+'</span><br>';
                if(nice){
                  const xi = Math.round(x);
                  html += '<span style="color:rgba(221,225,240,0.50);">Herken: '+R+' = '+b+(xi===1?'':xi<0?'^('+xi+')':'^'+xi)+'</span><br>';
                  html += '<span style="color:rgba(221,225,240,0.50);">Dieselfde grondtal → stel eksponente gelyk:</span><br>';
                  html += '<span style="color:#6ee7b7;">x = '+xi+'</span>';
                } else {
                  html += '<span style="color:#fca5a5;">'+R+" is nie 'n heelgetal-mag van "+b+" nie</span><br>";
                  html += '<span style="color:rgba(221,225,240,0.50);">Kan nie met die dieselfde-grondtal-metode oplos nie. Benader: x ≈ '+x.toFixed(4)+'</span>';
                }
                out.innerHTML = html;
              }
              document.getElementById('g10c2eBtn').addEventListener('click', solve);
              document.getElementById('g10c2eResult').addEventListener('keydown', e=>{if(e.key==='Enter')solve();});
              solve();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die dieselfde-grondtal-metode werk net wanneer jy albei kante as 'n mag van dieselfde grondtal kan uitdruk. Indien nie, gebruik logaritmes (Graad 12) of inspeksie.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Los op: 3^x = 81",
          answer: "4",
          topic: "Eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Los op: 2^(2x−1) = 16",
          options: ["x = 2", "x = 5/2", "x = 3", "x = 1"],
          answer: 1,
          topic: "Eksponensiële vergelykings"
        },
        {
          type: "input",
          text: "Los op: 4^(x+1) = 8^x",
          answer: "2",
          topic: "Eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Los op: 5^(x²−x) = 25",
          options: ["Slegs x = 2", "Slegs x = −1", "x = 2 of x = −1", "x = 1 of x = −2"],
          answer: 2,
          topic: "Eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Deur die substitusie k = 3^x te gebruik, watter kwadratiese vergelyking is ekwivalent aan 9^x − 4·3^x + 3 = 0?",
          options: ["k² − 4k + 3 = 0", "k − 4k + 3 = 0", "k² + 4k − 3 = 0", "2k² − 4k + 3 = 0"],
          answer: 0,
          topic: "Eksponensiële vergelykings"
        },
        {
          type: "input",
          text: "Los op vir x: 3^(x+1) + 3^(x−1) = 30",
          answer: "2",
          topic: "Eksponensiële vergelykings"
        },
        {
          type: "input",
          text: "'n Kolonie bakterieë verdubbel elke uur, gemodelleer deur P(t) = 8 × 2^t, waar P die bevolking (in bakterieë) na t ure is. Na hoeveel ure sal die bevolking 512 bereik?",
          answer: "6",
          topic: "Eksponensiële vergelykings"
        }
      ]
    },
    {
      id: 202,
      chapter: 2,
      name: "Vereenvoudiging van komplekse eksponensiële uitdrukkings",
      fullName: "Vereenvoudiging van uitdrukkings wat verskeie eksponentwette kombineer, insluitend faktorisering",
      lesson: {
        heading: "Vereenvoudiging van komplekse eksponensiële uitdrukkings",
        sub: "Hoofstuk 2 · Onderwerp 3",
        body: `
          <p>CAPS verwag van Graad 10-leerders om <strong>al</strong> die eksponentwette in een vereenvoudiging te kombineer — en soms om eers 'n verskuilde faktorisering raak te sien.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Strategie vir multi-stap-vereenvoudiging</div>
            <p>
              1. Skryf elke term met dieselfde <strong>grondtal</strong> waar moontlik (bv. 4 = 2², 9 = 3²).<br>
              2. Splits enige somme/verskille in die eksponent met <span class="math">a^(m+n) = aᵐ·aⁿ</span>.<br>
              3. Faktoriseer tellers/noemers wat somme of verskille van eksponensiële terme is.<br>
              4. Kanselleer gemeenskaplike faktore, en pas dan die oorblywende eksponentwette toe.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vereenvoudig (3 × 5²)³ ÷ 75</div>
            <p>
              <span class="math">(3 × 5²)³ = 3³ × 5⁶</span><br>
              <span class="math">75 = 3 × 5²</span><br>
              <span class="math">(3³ × 5⁶)/(3 × 5²) = 3² × 5⁴ = 9 × 625 = 5625</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vereenvoudig deur eers te faktoriseer — (2ˣ⁺¹ + 2ˣ)/2ˣ</div>
            <p>
              Teller: <span class="math">2ˣ⁺¹ + 2ˣ = 2ˣ(2 + 1) = 3 · 2ˣ</span><br>
              <span class="math">(3 · 2ˣ)/2ˣ = 3</span><br>
              <em>Om die gemeenskaplike faktor 2ˣ raak te sien, is die sleutelinsig — dit is 'n probleemoplossing-vlak-vraag as jy hierdie tipe nog nie voorheen gesien het nie.</em>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Algemene strik</div>
            <p>
              <span class="math">2ˣ⁺¹ ≠ 2 · 2ˣ⁺¹</span> en <span class="math">2ˣ⁺¹ ≠ 2ˣ + 2</span>. Brei altyd <span class="math">2ˣ⁺¹ = 2ˣ · 2¹ = 2 · 2ˣ</span> uit deur die vermenigvuldigingswet te gebruik — moenie oor optelling in 'n eksponent versprei nie.
            </p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer jy 'n som of verskil van eksponensiële terme sien (soos <span class="math">3^(x+2) − 3^x</span>), faktoriseer eers die kleinste mag uit — dit vereenvoudig byna altyd pragtig.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Vereenvoudig: (2 × 3²)² ÷ 18",
          options: ["18", "36", "9", "2"],
          answer: 0,
          topic: "Vereenvoudiging van komplekse eksponensiële uitdrukkings"
        },
        {
          type: "input",
          text: "Vereenvoudig: (3ˣ⁺¹ + 3ˣ)/3ˣ",
          answer: "4",
          topic: "Vereenvoudiging van komplekse eksponensiële uitdrukkings"
        },
        {
          type: "mc",
          text: "Vereenvoudig: (5ˣ⁺² − 5ˣ)/(5ˣ · 24)",
          options: ["1", "5", "24", "5/24"],
          answer: 0,
          topic: "Vereenvoudiging van komplekse eksponensiële uitdrukkings"
        },
        {
          type: "mc",
          text: "Vereenvoudig: (2²ˣ − 1)/(2ˣ − 1) deur verskil van kwadrate op die eksponent-term te gebruik",
          options: ["2ˣ + 1", "2ˣ − 1", "2ˣ", "4ˣ + 1"],
          answer: 0,
          topic: "Vereenvoudiging van komplekse eksponensiële uitdrukkings"
        },
        {
          type: "input",
          text: "Vereenvoudig: (4^x · 8)/2^(2x+1). Gee die antwoord as 'n heelgetal.",
          answer: "4",
          topic: "Vereenvoudiging van komplekse eksponensiële uitdrukkings"
        },
        {
          type: "input",
          text: "Vereenvoudig: (5^(x+1) + 5^(x+2)) ÷ (6 × 5^x)",
          answer: "5",
          topic: "Vereenvoudiging van komplekse eksponensiële uitdrukkings"
        },
        {
          type: "input",
          text: "Vereenvoudig: (2^(2x+1) − 2^(2x−1)) ÷ 2^(2x)",
          answer: "3/2",
          altAnswers: ["1.5", "1,5"],
          topic: "Vereenvoudiging van komplekse eksponensiële uitdrukkings"
        }
      ]
    },
    {
      id: 203,
      chapter: 2,
      name: "Gevorderde eksponensiële vergelykings",
      fullName: "Eksponensiële vergelykings wat faktorisering of gebreekte-eksponent-tegnieke vereis",
      lesson: {
        heading: "Gevorderde eksponensiële vergelykings",
        sub: "Hoofstuk 2 · Onderwerp 4",
        body: `
          <p>Buiten eenvoudige dieselfde-grondtal-vergelykings, sluit CAPS eksponensiële vergelykings in wat <strong>faktorisering</strong> of noukeurige hantering van <strong>gebreekte eksponente</strong> vereis voordat jy vir x kan oplos.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Tipe 1: Vergelyking met 'n gemeenskaplike faktor</div>
            <p>
              Voorbeeldvorm: <span class="math">2^(x+3) − 2^x = 56</span><br>
              Faktoriseer die linkerkant: <span class="math">2^x(2³ − 1) = 56 → 2^x(7) = 56 → 2^x = 8 → x = 3</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Tipe 2: Gebreekte/rasionale-eksponent-vergelykings</div>
            <p>
              Voorbeeldvorm: <span class="math">x^(2/3) = 4</span><br>
              Verhef albei kante tot die mag <span class="math">3/2</span>: <span class="math">x = 4^(3/2) = (√4)³ = 2³ = 8</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Los op 3^(2x) − 3^x − 6 = 0</div>
            <p>
              Laat <span class="math">k = 3^x</span>: <span class="math">k² − k − 6 = 0</span><br>
              <span class="math">(k − 3)(k + 2) = 0 → k = 3</span> of <span class="math">k = −2</span> (verwerp, aangesien 3^x > 0)<br>
              <span class="math">3^x = 3 → x = 1</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Waarom negatiewe of nul-substitusies verwerp word</div>
            <p>Aangesien <span class="math">aˣ > 0</span> vir enige grondtal <span class="math">a > 0</span>, gee 'n substitusie-uitkoms soos <span class="math">k = −2</span> of <span class="math">k = 0</span> geen reële oplossing vir x nie en moet dit verwerp word.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer jy twee eksponensiële terme sien wat opgetel of afgetrek word (nie vermenigvuldig nie), vermoed dat om die kleinste mag uit te faktoriseer die manier in is — dit is dieselfde strategie as in die vorige onderwerp, net nou binne 'n vergelyking.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Los op: 2^(x+2) − 2^x = 12",
          answer: "2",
          topic: "Gevorderde eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Los op: x^(3/2) = 27",
          options: ["x = 9", "x = 3", "x = 81", "x = 18"],
          answer: 0,
          topic: "Gevorderde eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Los op: 3^(2x) − 4·3^x + 3 = 0. Watter is geldige oplossings?",
          options: ["x = 0 of x = 1", "x = 1 of x = 3", "x = 0 of x = 3", "Slegs x = 1"],
          answer: 0,
          topic: "Gevorderde eksponensiële vergelykings"
        },
        {
          type: "input",
          text: "Los op vir x: 5^(x+1) + 5^x = 30",
          answer: "1",
          topic: "Gevorderde eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Los op: x^(2/3) = 9",
          options: ["x = 27", "x = 3", "x = 18", "x = 729"],
          answer: 0,
          topic: "Gevorderde eksponensiële vergelykings"
        },
        {
          type: "input",
          text: "Los op vir x: 4^x − 2^(x+2) − 32 = 0",
          answer: "3",
          topic: "Gevorderde eksponensiële vergelykings"
        },
        {
          type: "mc",
          text: "Los op: (x − 1)^(2/3) = 4",
          options: ["x = 9 of x = −7", "Slegs x = 9", "x = ±8", "x = 8 of x = −9"],
          answer: 0,
          topic: "Gevorderde eksponensiële vergelykings"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 2 Werkboek — Eksponente",
    questions: [
      {
        number: 1,
        text: "Vereenvoudig (los in eenvoudigste eksponensiële vorm, geen negatiewe eksponente nie):",
        parts: [
          { label: "a", text: "x³ · x⁻⁵ · x²", marks: 2 },
          { label: "b", text: "(2a²b)³ / (4ab²)", marks: 3 },
          { label: "c", text: "(3x⁻¹y²)² · (xy)⁻¹", marks: 3 },
          { label: "d", text: "(a^(1/2) · a^(1/3))⁶", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "Evalueer sonder 'n sakrekenaar:",
        parts: [
          { label: "a", text: "32^(3/5)", marks: 2 },
          { label: "b", text: "(4/9)^(−1/2)", marks: 2 },
          { label: "c", text: "2^(−3) + 4^(−1)", marks: 3 },
          { label: "d", text: "64^(2/3) − 25^(1/2)", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "Los op vir x:",
        parts: [
          { label: "a", text: "2^x = 64", marks: 2 },
          { label: "b", text: "3^(x+2) = 27^(x−1)", marks: 3 },
          { label: "c", text: "5^(x²) = 125^x", marks: 4 },
          { label: "d", text: "4^x − 3·2^x − 4 = 0", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "x⁰ = 1",
        b: "2a⁵b/1 = 2a⁵b⁻¹ ... vereenvoudig: 2a⁵/b",
        c: "9x⁻³y³",
        d: "a⁵"
      },
      2: {
        a: "8",
        b: "3/2",
        c: "1/8 + 1/4 = 3/8",
        d: "16 − 5 = 11"
      },
      3: {
        a: "x = 6",
        b: "x+2 = 3x−3 → x = 5/2",
        c: "x² = 3x → x(x−3) = 0 → x = 0 of x = 3",
        d: "Laat k=2^x: k²−3k−4=0 → (k−4)(k+1)=0 → k=4 → x=2 (k=−1 ongeldig)"
      }
    }
  }
});
