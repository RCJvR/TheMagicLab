// Math Magician — Graad 12, Hoofstuk 10
// Waarskynlikheid — Telbeginsels

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 1000,
      chapter: 10,
      name: "Fundamentele telbeginsel & faktoriaalnotasie",
      fullName: "Die fundamentele telbeginsel, faktoriaalnotasie, en permutasies",
      lesson: {
        heading: "Telbeginsel, faktoriale, en permutasies",
        sub: "Hoofstuk 10 · Onderwerp 1",
        body: `
          <p>Graad 12 Waarskynlikheid stel <strong>teltegnieke</strong> bekend — sistematiese maniere om uitkomste te tel sonder om almal te lys.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Fundamentele Telbeginsel (FTB)</div>
            <p>
              As gebeurtenis A op m maniere kan gebeur en gebeurtenis B op n maniere kan gebeur, dan kan A EN B op <span class="math">m × n</span> maniere gebeur.<br><br>
              Word uitgebrei na enige aantal gebeurtenisse: vermenigvuldig die aantal keuses by elke stap.<br><br>
              Voorbeeld: 3 hemde, 4 broeke, 2 skoene → 3 × 4 × 2 = 24 uitrustings
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Faktoriaalnotasie</div>
            <p>
              <span class="math">n! = n × (n−1) × (n−2) × … × 2 × 1</span><br>
              <span class="math">0! = 1</span> (per definisie)<br><br>
              Voorbeelde: 5! = 120; 4! = 24; 3! = 6
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Permutasies (geordende rangskikkings)</div>
            <p>
              Die aantal maniere om r voorwerpe uit n verskillende voorwerpe te rangskik:<br>
              <span class="math">ₙPᵣ = n! / (n−r)!</span><br><br>
              Rangskik AL n voorwerpe: <span class="math">n!</span> maniere<br><br>
              <strong>Met beperkings:</strong> stel eers die beperkte elemente vas, tel dan die res.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeelde</div>
            <p><strong>(a)</strong> Rangskikkings van ABCDE: 5! = 120<br>
            <strong>(b)</strong> 3 uit 8 in volgorde: ₈P₃ = 8×7×6 = 336<br>
            <strong>(c)</strong> ABCDE met A eerste: 1 × 4! = 24</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Tel-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Bereken faktoriale, FTB (vermenigvuldig keuses by elke stap), en permutasies ₙPᵣ.</p>
            <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <button id="g12c10mFact" class="g12c10mode" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:rgba(99,102,241,0.30);color:#a5b4fc;">n!</button>
              <button id="g12c10mFCP" class="g12c10mode" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:transparent;color:rgba(221,225,240,0.50);">FTB</button>
              <button id="g12c10mPerm" class="g12c10mode" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:transparent;color:rgba(221,225,240,0.50);">ₙPᵣ</button>
            </div>
            <div id="g12c10inp" style="margin-bottom:10px;"></div>
            <button id="g12c10Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:8px;">Bereken</button>
            <div id="g12c10Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              let mode='fact';
              const inp=document.getElementById('g12c10inp'),out=document.getElementById('g12c10Out');
              const inStyle='background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:"JetBrains Mono",monospace;text-align:center;width:70px;';
              const lblStyle='font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;';
              function fact(n){if(n<0||n>170)return null;let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
              function render(){
                out.innerHTML='';
                if(mode==='fact'){
                  inp.innerHTML='<div><div style="'+lblStyle+'">n</div><input id="g12c10n" type="number" value="5" min="0" max="20" style="'+inStyle+'"></div>';
                } else if(mode==='fcp'){
                  inp.innerHTML='<div><div style="'+lblStyle+'">Keuses by elke stap (kommageskei)</div><input id="g12c10steps" type="text" value="3,4,2" style="width:220px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:\'JetBrains Mono\',monospace;box-sizing:border-box;"></div>';
                } else {
                  inp.innerHTML='<div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;"><div><div style="'+lblStyle+'">n</div><input id="g12c10pn" type="number" value="8" min="0" max="20" style="'+inStyle+'"></div><div><div style="'+lblStyle+'">r</div><input id="g12c10pr" type="number" value="3" min="0" max="20" style="'+inStyle+'"></div></div>';
                }
                Array.from(inp.querySelectorAll('input')).forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              }
              function calc(){
                if(mode==='fact'){
                  const n=parseInt(document.getElementById('g12c10n').value);
                  if(isNaN(n)||n<0){out.innerHTML="<span style='color:#fca5a5;'>Voer 'n nie-negatiewe heelgetal in.</span>";return;}
                  const v=fact(n);
                  if(v===null){out.innerHTML='<span style="color:#fca5a5;">n te groot (maks. 20).</span>';return;}
                  out.innerHTML='<span style="color:#6ee7b7;">'+n+'! = '+v.toLocaleString()+'</span>';
                } else if(mode==='fcp'){
                  const steps=document.getElementById('g12c10steps').value.split(',').map(s=>parseInt(s.trim()));
                  if(steps.some(isNaN)||steps.some(s=>s<1)){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe heelgetalle vir elke stap in.</span>';return;}
                  const product=steps.reduce((a,b)=>a*b,1);
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+steps.join(' × ')+' = </span><span style="color:#6ee7b7;">'+product.toLocaleString()+'</span>';
                } else {
                  const n=parseInt(document.getElementById('g12c10pn').value),r=parseInt(document.getElementById('g12c10pr').value);
                  if(isNaN(n)||isNaN(r)||r>n||n<0||r<0){out.innerHTML='<span style="color:#fca5a5;">Benodig 0 ≤ r ≤ n.</span>';return;}
                  const fn=fact(n),fnr=fact(n-r);
                  if(fn===null){out.innerHTML='<span style="color:#fca5a5;">n te groot (maks. 20).</span>';return;}
                  const v=fn/fnr;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">ₙPᵣ = '+n+'!/('+n+'−'+r+')! = '+n+'!/'+( n-r)+'! = </span><span style="color:#6ee7b7;">'+v.toLocaleString()+'</span>';
                }
              }
              document.getElementById('g12c10Btn').addEventListener('click',calc);
              ['g12c10mFact','g12c10mFCP','g12c10mPerm'].forEach((id,i)=>{
                document.getElementById(id).addEventListener('click',function(){
                  mode=['fact','fcp','perm'][i];
                  document.querySelectorAll('.g12c10mode').forEach(b=>{b.style.background='transparent';b.style.color='rgba(221,225,240,0.50)';});
                  this.style.background='rgba(99,102,241,0.30)';this.style.color='#a5b4fc';
                  render();
                });
              });
              render();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Hoeveel 3-syfer-kodes kan gevorm word uit die syfers 1–9 as herhaling toegelaat word?", options: ["504", "729", "84", "27"], answer: 1, topic: "Fundamentele telbeginsel & faktoriaalnotasie" },
        { type: "input", text: "Bereken: 6!/4!", answer: "30", topic: "Fundamentele telbeginsel & faktoriaalnotasie" },
        { type: "mc", text: "Op hoeveel maniere kan 5 mense in 'n ry sit?", options: ["25", "120", "60", "5"], answer: 1, topic: "Fundamentele telbeginsel & faktoriaalnotasie" },
        { type: "mc", text: "₇P₂ = ", options: ["21", "42", "14", "49"], answer: 1, topic: "Fundamentele telbeginsel & faktoriaalnotasie" },
        { type: "mc", text: "6 mense in 'n ry, met A en B altyd aan die punte. Hoeveel rangskikkings is moontlik?", options: ["48", "24", "12", "96"], answer: 0, topic: "Fundamentele telbeginsel & faktoriaalnotasie" },
        { type: "input", text: "Hoeveel verskillende 5-letter-rangskikkings kan gemaak word uit die letters van die woord MOUSE as die rangskikking met 'n vokaal moet begin en met 'n konsonant moet eindig? (Al die letters is verskillend; vokale: O, U, E; konsonante: M, S.)", answer: "36", topic: "Fundamentele telbeginsel & faktoriaalnotasie" },
        { type: "input", text: "5 verskillende boeke word op 'n rak gerangskik. Op hoeveel maniere kan dit gedoen word as twee spesifieke boeke NIE langs mekaar mag wees NIE?", answer: "72", topic: "Fundamentele telbeginsel & faktoriaalnotasie" }
      ]
    },
    {
      id: 1001,
      chapter: 10,
      name: "Kombinasies & waarskynlikheidstoepassings",
      fullName: "Kombinasies, waarskynlikheid deur gebruik van telbeginsels, en toepassings",
      lesson: {
        heading: "Kombinasies en waarskynlikheid met telbeginsels",
        sub: "Hoofstuk 10 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Kombinasies (ongeordende keuses)</div>
            <p>
              Wanneer volgorde NIE saak maak NIE, gebruik kombinasies:<br>
              <span class="math">ₙCᵣ = C(n,r) = n! / [r!(n−r)!]</span><br><br>
              Sleutelverskil: permutasies = VOLGORDE MAAK SAAK; kombinasies = volgorde maak NIE saak NIE.<br><br>
              Voorbeeld: kies 3 uit 8 (volgorde maak nie saak nie): ₈C₃ = 56
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Komiteekeuse</div>
            <p>Kies 'n komitee van 4 uit 10 mense. Volgorde maak nie saak nie.<br>
            ₁₀C₄ = 10!/(4! × 6!) = 210</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Waarskynlikheid met behulp van telbeginsels</div>
            <p>
              <span class="math">P(gebeurtenis) = aantal gunstige uitkomste / totale uitkomste</span><br><br>
              Met telbeginsels: beide die teller en die noemer word getel deur gebruik te maak van FTB, permutasies, of kombinasies.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Waarskynlikheid met kombinasies</div>
            <p>Uit 'n groep van 6 mans en 4 vrouens, kies 3. P(almal vrouens)?<br>
            Gunstig: ₄C₃ = 4<br>
            Totaal: ₁₀C₃ = 120<br>
            P = 4/120 = 1/30</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Permutasies vs Kombinasies — vinnige toets</div>
            <p>
              "ABC" en "CAB" — is hierdie dieselfde of verskillend?<br>
              Dieselfde (ongeordende keuse) → Kombinasie<br>
              Verskillend (geordende rangskikking) → Permutasie
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kombinasie- & Waarskynlikheid-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Bereken ₙCᵣ en opsioneel P(gebeurtenis) = gunstig ÷ totaal (elk bereken deur middel van kombinasies).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n</div><input id="g12c10t2n" type="number" value="10" min="0" max="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r</div><input id="g12c10t2r" type="number" value="3" min="0" max="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
            </div>
            <p style="font-size:12px;color:rgba(221,225,240,0.50);margin:4px 0 6px;">Opsioneel: bereken P = ₙCᵣ / totaal vir 'n waarskynlikheidsberekening</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Totaal n</div><input id="g12c10t2tn" type="number" placeholder="bv. 10" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Totaal r (kies)</div><input id="g12c10t2tr" type="number" placeholder="bv. 3" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
            </div>
            <button id="g12c10t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:8px;">Bereken</button>
            <div id="g12c10t2Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fact(n){if(n===0||n===1)return 1;let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
              function comb(n,r){if(r<0||r>n)return 0;if(r===0||r===n)return 1;return fact(n)/(fact(r)*fact(n-r));}
              function calc(){
                const n=parseInt(document.getElementById('g12c10t2n').value),r=parseInt(document.getElementById('g12c10t2r').value);
                const out=document.getElementById('g12c10t2Out');
                if(isNaN(n)||isNaN(r)||r>n||n<0||r<0||n>30){out.innerHTML='<span style="color:#fca5a5;">Benodig 0 ≤ r ≤ n ≤ 30.</span>';return;}
                const c=comb(n,r);
                let html='<span style="color:#6ee7b7;">₍'+n+'₎C₍'+r+'₎ = '+n+'! / ('+r+'! × '+(n-r)+'!) = '+c.toLocaleString()+'</span><br>';
                const tn=parseInt(document.getElementById('g12c10t2tn').value),tr=parseInt(document.getElementById('g12c10t2tr').value);
                if(!isNaN(tn)&&!isNaN(tr)&&tn>=0&&tr>=0&&tr<=tn&&tn<=30){
                  const total=comb(tn,tr);
                  if(total>0){
                    const p=c/total;
                    html+='<span style="color:#fcd34d;">P = '+c.toLocaleString()+' / '+total.toLocaleString()+' = '+p.toFixed(6)+'</span>';
                    html+='<span style="color:rgba(221,225,240,0.50);"> ≈ '+( p*100).toFixed(2)+'%</span>';
                  }
                }
                out.innerHTML=html;
              }
              document.getElementById('g12c10t2Btn').addEventListener('click',calc);
              ['g12c10t2n','g12c10t2r','g12c10t2tn','g12c10t2tr'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "₈C₃ = ", options: ["336", "56", "24", "28"], answer: 1, topic: "Kombinasies & waarskynlikheidstoepassings" },
        { type: "mc", text: "Kies 'n span van 5 uit 12 spelers (volgorde onbelangrik):", options: ["₁₂P₅", "₁₂C₅", "12×5", "12!/5!"], answer: 1, topic: "Kombinasies & waarskynlikheidstoepassings" },
        { type: "input", text: "Uit 10 boeke, kies 3 (volgorde maak nie saak nie). Hoeveel maniere is daar?", answer: "120", topic: "Kombinasies & waarskynlikheidstoepassings" },
        { type: "mc", text: "Pak van 52 kaarte. P(5-kaart-hand met almal harte):", options: ["₁₃C₅/₅₂C₅", "13/52", "₁₃P₅/₅₂P₅", "5/52"], answer: 0, topic: "Kombinasies & waarskynlikheidstoepassings" },
        { type: "mc", text: "Uit 5 seuns en 3 meisies, kies 4. P(presies 2 seuns en 2 meisies)?", options: ["₅C₂·₃C₂/₈C₄", "₅P₂·₃P₂/₈P₄", "10/70", "Beide A en C"], answer: 0, topic: "Kombinasies & waarskynlikheidstoepassings" },
        { type: "input", text: "'n Span van 4 word gekies uit 7 seuns en 5 meisies. Hoeveel spanne bevat ten minste 3 seuns?", answer: "210", topic: "Kombinasies & waarskynlikheidstoepassings" },
        { type: "input", text: "'n Sak bevat 6 rooi en 4 blou albasters. As 3 albasters lukraak sonder terugplasing getrek word, bepaal P(ten minste 2 rooi), as 'n breuk in laagste terme.", answer: "2/3", altAnswers: ["0.6666666667", "0,67", "0.67"], topic: "Kombinasies & waarskynlikheidstoepassings" }
      ]
    },
    {
      id: 1002,
      chapter: 10,
      name: "Hersiening: waarskynlikheidsidentiteite & Venn-diagramme",
      fullName: "Hersiening van Graad 11-waarskynlikheidsreëls — wedersyds uitsluitende, komplementêre, onafhanklike gebeurtenisse, en Venn-diagramme",
      lesson: {
        heading: "Hersiening: waarskynlikheidsidentiteite en Venn-diagramme",
        sub: "Hoofstuk 10 · Onderwerp 3",
        body: `
          <p>Voordat teltegnieke aangepak word, vereis CAPS 'n deeglike hersiening van die <strong>kern-waarskynlikheidsidentiteite</strong> uit Graad 11 — hierdie onderlê elke telgebaseerde waarskynlikheidsvraag.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die optellingsreël</div>
            <p>
              Vir enige twee gebeurtenisse A en B:<br>
              <span class="math">P(A of B) = P(A) + P(B) − P(A en B)</span><br><br>
              <strong>Wedersyds uitsluitende</strong> gebeurtenisse (kan nie saam gebeur nie, dus P(A en B) = 0):<br>
              <span class="math">P(A of B) = P(A) + P(B)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Onafhanklike gebeurtenisse</div>
            <p>
              A en B is <strong>onafhanklik</strong> as die voorkoms van die een nie die waarskynlikheid van die ander beïnvloed nie:<br>
              <span class="math">P(A en B) = P(A) × P(B)</span><br><br>
              Om onafhanklikheid te toets: kyk of P(A en B) = P(A) × P(B). Indien gelyk, onafhanklik; andersins, afhanklik.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Komplementêre reël</div>
            <p>
              <span class="math">P(nie A nie) = 1 − P(A)</span><br><br>
              Baie nuttig vir "ten minste een"-probleme: <span class="math">P(ten minste een) = 1 − P(geen)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Venn-diagram</div>
            <p>In 'n klas van 30, speel 18 sokker (S), 12 speel tennis (T), 6 speel albei.<br>
            P(S of T) = P(S) + P(T) − P(S en T) = 18/30 + 12/30 − 6/30 = 24/30 = 4/5<br>
            P(geeneen) = 1 − 4/5 = 1/5</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Lees van 'n Venn-diagram</div>
            <p>
              Vul altyd eers die <strong>oorvleuelingsarea</strong> ("en"-waarde) in, en werk dan uitwaarts na die areas wat slegs aan een gebeurtenis behoort, deur die gegewe totale te gebruik.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Venn-diagram-/Optellingsreël-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer P(A), P(B) en P(A en B) in — bereken P(A of B), P(nie A nie), en toets onafhanklikheid.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A)</div><input id="g12c10t3a" type="number" value="0.6" step="0.01" min="0" max="1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(B)</div><input id="g12c10t3b" type="number" value="0.4" step="0.01" min="0" max="1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A en B)</div><input id="g12c10t3ab" type="number" value="0.2" step="0.01" min="0" max="1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c10t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Ontleed</button>
            </div>
            <div id="g12c10t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const pa=gv('g12c10t3a'),pb=gv('g12c10t3b'),pab=gv('g12c10t3ab');
                const out=document.getElementById('g12c10t3Out');
                if([pa,pb,pab].some(isNaN)||pa<0||pa>1||pb<0||pb>1||pab<0||pab>1){out.innerHTML='<span style="color:#fca5a5;">Voer waarskynlikhede tussen 0 en 1 in.</span>';return;}
                const por=pa+pb-pab;
                const notA=1-pa;
                const indep=Math.abs(pab-pa*pb)<0.0001;
                const mutex=Math.abs(pab)<0.0001;
                let html='<span style="color:#6ee7b7;">P(A of B) = '+f4(pa)+' + '+f4(pb)+' − '+f4(pab)+' = '+f4(por)+'</span><br>';
                html+='<span style="color:#fcd34d;">P(nie A nie) = 1 − '+f4(pa)+' = '+f4(notA)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A)×P(B) = '+f4(pa*pb)+' teenoor P(A en B) = '+f4(pab)+' → '+(indep?'ONAFHANKLIK':'NIE onafhanklik nie (afhanklik)')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A en B) = '+f4(pab)+' → '+(mutex?'wedersyds uitsluitend':'NIE wedersyds uitsluitend nie (gebeurtenisse oorvleuel)')+'</span>';
                out.innerHTML=html;
              }
              ['g12c10t3a','g12c10t3b','g12c10t3ab'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c10t3Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "P(A) = 0.5, P(B) = 0.3, P(A en B) = 0.1. Bepaal P(A of B).", options: ["0.8", "0.7", "0.9", "0.6"], answer: 1, topic: "Hersiening: waarskynlikheidsidentiteite & Venn-diagramme" },
        { type: "mc", text: "Twee wedersyds uitsluitende gebeurtenisse A en B het P(A) = 0.4 en P(B) = 0.35. P(A of B) =", options: ["0.14", "0.75", "0.05", "1"], answer: 1, topic: "Hersiening: waarskynlikheidsidentiteite & Venn-diagramme" },
        { type: "input", text: "P(A) = 0.7. Bepaal P(nie A nie).", answer: "0.3", altAnswers: ["0,3"], topic: "Hersiening: waarskynlikheidsidentiteite & Venn-diagramme" },
        { type: "mc", text: "Gebeurtenisse A en B voldoen aan P(A) = 0.5, P(B) = 0.4, P(A en B) = 0.2. Is hulle onafhanklik?", options: ["Ja, aangesien P(A)×P(B) = 0.2 = P(A en B)", "Nee, aangesien P(A en B) ≠ 0", "Kan nie bepaal word nie", "Ja, alle gebeurtenisse is onafhanklik"], answer: 0, topic: "Hersiening: waarskynlikheidsidentiteite & Venn-diagramme" },
        { type: "mc", text: "In 'n Venn-diagram, 40 mense in totaal, n(S) = 22, n(T) = 20, n(S en T) = 8. Hoeveel is in NIE S NOG T NIE?", options: ["6", "10", "34", "14"], answer: 0, topic: "Hersiening: waarskynlikheidsidentiteite & Venn-diagramme" },
        { type: "input", text: "P(reën) = 0.3 op elk van 2 onafhanklike dae. Bepaal P(reën op albei dae).", answer: "0.09", altAnswers: ["0,09", "9/100"], topic: "Hersiening: waarskynlikheidsidentiteite & Venn-diagramme" },
        { type: "input", text: "In 'n opname onder 50 leerders, bestudeer 28 Wiskunde (M), 24 Fisiese Wetenskappe (P), en 10 bestudeer geen van die vakke nie. Hoeveel leerders bestudeer BEIDE M en P?", answer: "12", topic: "Hersiening: waarskynlikheidsidentiteite & Venn-diagramme" },
        { type: "input", text: "P(A) = x, P(B) = 2x, en A en B is wedersyds uitsluitend met P(A of B) = 0.6. Bepaal x.", answer: "0.2", altAnswers: ["0,2", "1/5"], topic: "Hersiening: waarskynlikheidsidentiteite & Venn-diagramme" }
      ]
    },
    {
      id: 1003,
      chapter: 10,
      name: "Boomdiagramme, tabelle & afhanklike gebeurtenisse",
      fullName: "Gebruik van boomdiagramme en tweerigting-gebeurlikheidstabelle vir afhanklike en onafhanklike gebeurtenisse, met en sonder terugplasing",
      lesson: {
        heading: "Boomdiagramme, tweerigtingtabelle, en afhanklike gebeurtenisse",
        sub: "Hoofstuk 10 · Onderwerp 4",
        body: `
          <p>Baie werklike eksamenprobleme kombineer telbeginsels met <strong>opeenvolgende</strong> gebeurtenisse — waar die uitkoms van een stap die volgende beïnvloed. Boomdiagramme en tweerigtingtabelle help om dit sistematies te organiseer.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Boomdiagramme</div>
            <p>
              'n Boomdiagram wys alle moontlike reekse van uitkomste, met waarskynlikhede op elke tak.<br>
              • Vermenigvuldig waarskynlikhede <strong>langs 'n tak</strong> (EN, opeenvolgend)<br>
              • Tel waarskynlikhede <strong>oor verskillende takke</strong> op (OF, verskillende paaie na dieselfde uitkoms)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Met vs sonder terugplasing</div>
            <p>
              <strong>Met terugplasing:</strong> waarskynlikhede bly dieselfde by elke trekking (onafhanklike gebeurtenisse).<br>
              <strong>Sonder terugplasing:</strong> waarskynlikhede verander na elke trekking omdat die totaal verander (afhanklike gebeurtenisse) — dit is waar boomdiagramme noodsaaklik is.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: sonder terugplasing</div>
            <p>'n Sak het 5 rooi en 3 blou balle. Twee word sonder terugplasing getrek. P(albei rooi)?<br>
            P(1ste rooi) = 5/8<br>
            P(2de rooi | 1ste rooi) = 4/7 (een rooi bal verwyder)<br>
            P(albei rooi) = 5/8 × 4/7 = 20/56 = 5/14</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Tweerigting-gebeurlikheidstabelle</div>
            <p>
              'n Tweerigtingtabel organiseer tellings volgens twee kategoriese veranderlikes in rye en kolomme, met ry-/kolomtotale.<br>
              Word gebruik om voorwaardelike waarskynlikhede te bereken: <span class="math">P(A | B) = n(A en B) / n(B)</span>, direk van die tabel afgelees.
            </p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Kies 'n tegniek</div>
            <p>
              Opeenvolgende trekkings (volgorde maak saak, afhanklik) → boomdiagram.<br>
              Twee kategoriese veranderlikes gemeet op dieselfde groep → tweerigtingtabel.<br>
              Oorvleuelende versamelings/voorwaardes → Venn-diagram.<br>
              Tel rangskikkings/keuses → fundamentele telbeginsel, permutasies, of kombinasies.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Sonder-Terugplasing-Boom-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">'n Sak het 'n aantal rooi en 'n aantal blou balle. Trek 2 sonder terugplasing — bepaal P(albei rooi), P(albei blou), P(een van elk).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rooi balle</div><input id="g12c10t4r" type="number" value="5" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Blou balle</div><input id="g12c10t4b" type="number" value="3" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c10t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bou boom</button>
            </div>
            <div id="g12c10t4Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseInt(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const r=gv('g12c10t4r'),b=gv('g12c10t4b');
                const out=document.getElementById('g12c10t4Out');
                if(isNaN(r)||isNaN(b)||r<0||b<0||(r+b)<2){out.innerHTML='<span style="color:#fca5a5;">Voer nie-negatiewe rooi- en blou-tellings in (totaal ≥ 2).</span>';return;}
                const total=r+b;
                const pRR=(r/total)*((r-1)/(total-1));
                const pBB=(b/total)*((b-1)/(total-1));
                const pRB=(r/total)*(b/(total-1));
                const pBR=(b/total)*(r/(total-1));
                const pOneEach=pRB+pBR;
                let html='<span style="color:rgba(221,225,240,0.50);">Sak: '+r+' rooi, '+b+' blou ('+total+' totaal). Trek 2 sonder terugplasing:</span><br>';
                html+='<span style="color:#6ee7b7;">P(albei rooi) = ('+r+'/'+total+')×('+(r-1)+'/'+(total-1)+') = '+f4(pRR)+'</span><br>';
                html+='<span style="color:#6ee7b7;">P(albei blou) = ('+b+'/'+total+')×('+(b-1)+'/'+(total-1)+') = '+f4(pBB)+'</span><br>';
                html+='<span style="color:#fcd34d;">P(een van elk) = P(RB)+P(BR) = '+f4(pRB)+' + '+f4(pBR)+' = '+f4(pOneEach)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Kontroleer: '+f4(pRR)+' + '+f4(pBB)+' + '+f4(pOneEach)+' = '+f4(pRR+pBB+pOneEach)+'</span>';
                out.innerHTML=html;
              }
              ['g12c10t4r','g12c10t4b'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c10t4Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Op 'n boomdiagram moet waarskynlikhede langs 'n enkele tak (opeenvolgende gebeurtenisse):", options: ["Opgetel word", "Vermenigvuldig word", "Afgetrek word", "Gedeel word"], answer: 1, topic: "Boomdiagramme, tabelle & afhanklike gebeurtenisse" },
        { type: "mc", text: "'n Sak het 4 rooi en 6 blou balle. Een word getrek, NIE teruggeplaas NIE, dan word 'n tweede een getrek. Dit modelleer:", options: ["Onafhanklike gebeurtenisse", "Afhanklike gebeurtenisse", "Wedersyds uitsluitende gebeurtenisse", "Komplementêre gebeurtenisse"], answer: 1, topic: "Boomdiagramme, tabelle & afhanklike gebeurtenisse" },
        { type: "input", text: "'n Sak het 3 rooi, 2 blou (5 totaal). Trek 2 sonder terugplasing. Bepaal P(albei rooi) as 'n breuk in laagste terme (bv. 3/10).", answer: "3/10", altAnswers: ["0.3", "0,3"], topic: "Boomdiagramme, tabelle & afhanklike gebeurtenisse" },
        { type: "mc", text: "'n Tweerigtingtabel is die nuttigste om te bepaal:", options: ["ₙCᵣ-waardes", "Voorwaardelike waarskynlikhede uit twee kategoriese veranderlikes", "Faktoriale", "Die korrelasiekoëffisiënt"], answer: 1, topic: "Boomdiagramme, tabelle & afhanklike gebeurtenisse" },
        { type: "mc", text: "Met terugplasing, beteken twee keer trek uit 'n sak van 4 rooi en 6 blou balle dat die gebeurtenisse:", options: ["Afhanklik is", "Onafhanklik is", "Wedersyds uitsluitend is", "Onmoontlik is"], answer: 1, topic: "Boomdiagramme, tabelle & afhanklike gebeurtenisse" },
        { type: "input", text: "'n Muntstuk word twee keer gegooi (onafhanklik). Bepaal P(presies een kop) as 'n breuk.", answer: "1/2", altAnswers: ["0.5", "0,5"], topic: "Boomdiagramme, tabelle & afhanklike gebeurtenisse" },
        { type: "input", text: "'n Sak bevat 4 rooi en 6 blou balle. Drie balle word sonder terugplasing getrek. Bepaal P(al drie rooi), as 'n breuk in laagste terme.", answer: "1/30", altAnswers: ["0.0333", "0,03"], topic: "Boomdiagramme, tabelle & afhanklike gebeurtenisse" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 10 Werkboek — Waarskynlikheid en Telbeginsels",
    questions: [
      { number: 1, text: "'n 4-syfer-PIN word gevorm uit die syfers 0–9.", parts: [
        { label: "a", text: "Hoeveel PIN's is moontlik as syfers herhaal kan word?", marks: 2 },
        { label: "b", text: "Hoeveel PIN's het geen herhaalde syfers nie?", marks: 2 },
        { label: "c", text: "Hoeveel PIN's begin met 5 en het geen herhaalde syfers nie?", marks: 3 }
      ]},
      { number: 2, text: "Die woord STATISTICS het 10 letters.", parts: [
        { label: "a", text: "Hoeveel verskillende rangskikkings van al 10 letters is daar?", marks: 3 },
        { label: "b", text: "Hoeveel rangskikkings begin en eindig met S?", marks: 3 }
      ]},
      { number: 3, text: "'n Komitee van 5 word gekies uit 8 mans en 6 vrouens.", parts: [
        { label: "a", text: "Hoeveel komitees is moontlik?", marks: 2 },
        { label: "b", text: "Hoeveel het presies 3 mans en 2 vrouens?", marks: 3 },
        { label: "c", text: "Bepaal P(ten minste 4 vrouens op die komitee).", marks: 4 }
      ]},
      { number: 4, text: "Letters van die woord PRODUCT word lukraak gerangskik.", parts: [
        { label: "a", text: "Hoeveel rangskikkings is daar?", marks: 1 },
        { label: "b", text: "Hoeveel het P en R langs mekaar?", marks: 3 },
        { label: "c", text: "Wat is die waarskynlikheid dat die rangskikking met 'n vokaal begin?", marks: 3 }
      ]},
      { number: 5, text: "'n Opname onder 200 leerders het aangeteken of hulle sport speel en of hulle 'n musiekinstrument speel. Die tweerigtingtabel hieronder wys die resultate:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'></th><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Instrument</th><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Geen instrument</th><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Totaal</th></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Sport</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>38</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>82</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>120</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Geen sport</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>22</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>58</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>80</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Totaal</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>60</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>140</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>200</td></tr></table>", parts: [
        { label: "a", text: "Bepaal P(speel 'n sport).", marks: 1 },
        { label: "b", text: "Bepaal P(speel 'n instrument | speel 'n sport).", marks: 2 },
        { label: "c", text: "Bepaal P(speel 'n sport EN speel 'n instrument).", marks: 1 },
        { label: "d", text: "Is die gebeurtenisse 'speel 'n sport' en 'speel 'n instrument' onafhanklik? Motiveer deur P(sport)×P(instrument) te vergelyk met P(sport en instrument).", marks: 3 }
      ]}
    ],
    answers: {
      1: { a: "10⁴=10000", b: "10×9×8×7=5040", c: "1×9×8×7=504 (eerste syfer vasgestel op 5, oorblywende 3 uit oorblywende 9 syfers)" },
      2: { a: "STATISTICS: S×3,T×3,A×1,I×2,C×1 → 10!/(3!3!2!)=50400", b: "Stel S vas aan die begin en einde (slegs 2 S'e oor... wag, 3 S'e → stel S vas aan die punte: kies 2 van die 3 S'e vir die punte = 1 manier aangesien hulle identies is; rangskik die oorblywende 8 letters (S×1,T×3,A×1,I×2,C×1): 8!/(1!3!1!2!1!)=3360" },
      3: { a: "₁₄C₅=2002", b: "₈C₃×₆C₂=56×15=840", c: "P(4V1M)+P(5V)=(₆C₄×₈C₁+₆C₅)/2002=(15×8+6)/2002=126/2002=9/143" },
      4: { a: "7!=5040", b: "Hanteer PR as 'n eenheid: 6! rangskikkings × 2(PR of RP)=1440", c: "Vokale:O,U=2; P(begin met vokaal)=2×6!/7!=2/7" },
      5: { a: "P(sport) = 120/200 = 0.6", b: "P(instrument | sport) = n(sport en instrument)/n(sport) = 38/120 = 19/60 ≈ 0.3167", c: "P(sport en instrument) = 38/200 = 0.19", d: "P(sport)×P(instrument) = 0.6 × (60/200) = 0.6 × 0.3 = 0.18. Dit is NIE gelyk aan P(sport en instrument) = 0.19 NIE, dus is die gebeurtenisse NIE onafhanklik NIE (hulle is afhanklik)." }
    }
  }
});
