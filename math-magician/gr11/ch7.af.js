// Math Magician — Grade 11, Hoofstuk 7 (Afrikaans)
// Meting (gevorderd)

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 700,
      chapter: 7,
      name: "Oppervlak van saamgestelde vaste stowwe",
      fullName: "Oppervlak van piramides, keëls, sfere, en kombinasies",
      lesson: {
        heading: "Oppervlak van saamgestelde vaste stowwe",
        sub: "Hoofstuk 7 · Onderwerp 1",
        body: `
          <p>Graad 11 Meting hersien 3D-vorms met groter noukeurigheid en stel saamgestelde vaste stowwe bekend.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Oppervlakformules (opsomming)</div>
            <p>
              <strong>Regte prisma:</strong> SA = 2 × basisoppervlakte + sywaartse oppervlakte<br>
              <strong>Silinder:</strong> SA = 2πr² + 2πrh<br>
              <strong>Keël:</strong> SA = πr² + πrl, waar l = skuinshoogte = √(r² + h²)<br>
              <strong>Sfeer:</strong> SA = 4πr²<br>
              <strong>Vierkantige piramide:</strong> SA = b² + 4(½ × b × l)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Saamgestelde vaste stof</div>
            <p>Silinder (r = 4, h = 10) met 'n halfsfeer bo-op.<br>
            Silinder-SA (geen bokant nie): 2π(4)² + 2π(4)(10) − π(4)² = π(16 + 80 − 16) ... wag:<br>
            — Onderste sirkel: π(4)² = 16π<br>
            — Geboë silinder: 2π(4)(10) = 80π<br>
            — Halfsfeer: 2π(4)² = 32π (slegs die geboë oppervlak)<br>
            Totaal = 16π + 80π + 32π = 128π ≈ 402.1 cm²</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Saamgestelde vaste stowwe — sleutelidee</div>
            <p>
              Vir 'n vaste stof wat uit twee vorms saamgestel is:<br>
              SA = SA van vorm 1 + SA van vorm 2 − 2 × (oppervlakte van die saamgevoegde vlak)<br>
              (Die saamgevoegde vlak is by albei vorms verskuil)
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Saamgestelde-vaste-stof SA-Berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies 'n kombinasie — voer afmetings in — kry die totale buite-oppervlak.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Kombinasie</div>
                <select id="g11c7combo" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="cylhem">Silinder + Halfsfeer bo-op</option>
                  <option value="cylcone">Silinder + Keël bo-op</option>
                  <option value="cubesphere">Kubus − ingeskrewe sfeer verwyder</option>
                </select>
              </div>
              <div id="g11c7inputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="g11c7Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken SA</button>
            </div>
            <div id="g11c7Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function f(n){return n.toFixed(2);}
              function inp(id,label,val){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              function build(){
                const c=document.getElementById('g11c7combo').value;
                const d=document.getElementById('g11c7inputs');
                if(c==='cylhem') d.innerHTML=inp('g11c7r','Radius r','4')+inp('g11c7h','Silinderhoogte h','10');
                else if(c==='cylcone') d.innerHTML=inp('g11c7r','Radius r','5')+inp('g11c7h','Silinderhoogte h','8')+inp('g11c7ch','Keëlhoogte','3');
                else d.innerHTML=inp('g11c7s','Kubussy a','10');
                ['g11c7r','g11c7h','g11c7ch','g11c7s'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              }
              function calc(){
                const c=document.getElementById('g11c7combo').value;
                const out=document.getElementById('g11c7Out');
                let html='';
                if(c==='cylhem'){
                  const r=gv('g11c7r'),h=gv('g11c7h');
                  if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                  const bottom=π*r*r,curved=2*π*r*h,hemi=2*π*r*r;
                  const total=bottom+curved+hemi;
                  html='<span style="color:rgba(221,225,240,0.50);">Onderste sirkel: πr² = '+f(bottom)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Geboë silinder: 2πrh = '+f(curved)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Halfsfeer (slegs geboë): 2πr² = '+f(hemi)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">Totale SA = '+f(total)+' eenhede²</span>';
                } else if(c==='cylcone'){
                  const r=gv('g11c7r'),h=gv('g11c7h'),ch=gv('g11c7ch');
                  if([r,h,ch].some(isNaN)||[r,h,ch].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                  const l=Math.sqrt(r*r+ch*ch);
                  const bottom=π*r*r,curved=2*π*r*h,coneSA=π*r*l;
                  const total=bottom+curved+coneSA;
                  html='<span style="color:rgba(221,225,240,0.50);">Skuinshoogte l = √('+r+'²+'+ch+'²) = '+f(l)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Onderkant: πr² = '+f(bottom)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Silinder geboë: 2πrh = '+f(curved)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Keël sywaarts: πrl = '+f(coneSA)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">Totale SA = '+f(total)+' eenhede²</span>';
                } else {
                  const s=gv('g11c7s');
                  if(isNaN(s)||s<=0){out.innerHTML='<span style="color:#fca5a5;">Voer \'n positiewe sylengte in.</span>';return;}
                  const cubeSA=6*s*s;
                  html='<span style="color:rgba(221,225,240,0.50);">Kubus-SA = 6a² = '+f(cubeSA)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">(Let wel: die verwydering van \'n sfeer van binne verander nie die buite-SA nie)</span><br>';
                  html+='<span style="color:#6ee7b7;">Buite-SA = '+f(cubeSA)+' eenhede²</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c7combo').addEventListener('change',()=>{build();});
              document.getElementById('g11c7Btn').addEventListener('click',calc);
              build();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer twee vaste stowwe 'n vlak deel, trek daardie sirkelvormige oppervlakte <strong>twee keer</strong> af (een keer van elke vaste stof se SA). Die gedeelde vlak is intern en nie deel van die buite-oppervlak nie.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Keël het r = 5 cm en h = 12 cm. Skuinshoogte l =",
          options: ["13 cm", "17 cm", "7 cm", "√119 cm"],
          answer: 0,
          topic: "Oppervlak van saamgestelde vaste stowwe"
        },
        {
          type: "input",
          text: "Totale SA van 'n sfeer met r = 6 cm (in terme van π).",
          answer: "144π",
          topic: "Oppervlak van saamgestelde vaste stowwe"
        },
        {
          type: "mc",
          text: "'n Toe silinder het r = 3 en h = 7. SA =",
          options: ["60π", "42π", "66π", "48π"],
          answer: 0,
          topic: "Oppervlak van saamgestelde vaste stowwe"
        },
        {
          type: "mc",
          text: "'n Vierkantige piramide het basis 6 cm en skuinshoogte 5 cm. SA =",
          options: ["96 cm²", "60 cm²", "132 cm²", "72 cm²"],
          answer: 0,
          topic: "Oppervlak van saamgestelde vaste stowwe"
        },
        {
          type: "mc",
          text: "'n Halfsfeer word bo-op 'n silinder geplaas. Watter oppervlak word van die totale SA uitgesluit?",
          options: ["Die geboë silinderoppervlak", "Die plat sirkelvormige vlak wat hulle deel", "Die onderste sirkel", "Geen — alle oppervlaktes word ingesluit"],
          answer: 1,
          topic: "Oppervlak van saamgestelde vaste stowwe"
        },
        {
          type: "input",
          text: "'n Keël (r = 5 cm, h = 12 cm) word basis-teen-basis aan 'n halfsfeer met dieselfde radius vasgeheg. Bepaal die totale oppervlak van die saamgestelde vaste stof, in terme van π.",
          answer: "115π",
          topic: "Oppervlak van saamgestelde vaste stowwe"
        },
        {
          type: "input",
          text: "'n Sfeer met radius 5 cm word uit die middelpunt van 'n soliede kubus met sy 10 cm verwyder, wat 'n sferiese holte laat. Bepaal die TOTALE blootgestelde oppervlak (buitenste kubusvlakke plus die binneste sferiese holte), korrek tot 2 desimale plekke.",
          answer: "914.16",
          altAnswers: ["914,16"],
          topic: "Oppervlak van saamgestelde vaste stowwe"
        }
      ]
    },
    {
      id: 701,
      chapter: 7,
      name: "Volume & die effek van skaalfaktor k",
      fullName: "Volume van vaste stowwe en die effek van vermenigvuldiging van afmetings met k",
      lesson: {
        heading: "Volume en die skaalfaktor-effek",
        sub: "Hoofstuk 7 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Volumeformules</div>
            <p>
              <strong>Prisma/Silinder:</strong> V = basisoppervlakte × hoogte<br>
              <strong>Piramide/Keël:</strong> V = ⅓ × basisoppervlakte × hoogte<br>
              <strong>Sfeer:</strong> V = (4/3)πr³
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Effek van vermenigvuldiging van 'n afmeting met k</div>
            <p>
              Wanneer <em>een</em> lineêre afmeting met k vermenigvuldig word:<br>
              Lengte → k × oorspronklike lengte<br>
              Oppervlakte → k × oorspronklike oppervlakte (lineêr, nie kwadraties nie)<br>
              Volume → k × oorspronklike volume<br><br>
              Wanneer <em>al</em> die afmetings met k vermenigvuldig word (gelykvormige vergroting):<br>
              Lengte → k<br>
              Oppervlak → k²<br>
              Volume → k³
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Skaalfaktor k = 3</div>
            <p>As 'n boks SA = 54 cm² en V = 27 cm³ het, en al die afmetings word verdriedubbel:<br>
            Nuwe SA = 9 × 54 = 486 cm²<br>
            Nuwe V = 27 × 27 = 729 cm³</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Slegs een afmeting verdubbel?</div>
            <p>
              Silinder V = πr²h. As slegs h verdubbel word: nuwe V = πr²(2h) = 2V → verdubbel.<br>
              As slegs r verdubbel word: nuwe V = π(2r)²h = 4πr²h = 4V → verviervoudig.<br>
              Wees <em>spesifiek</em> oor watter afmeting verander!
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Volume- & Skaalfaktor-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Bereken die volume, en sien dan hoe skaalfaktor k die SA en V beïnvloed.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Vorm</div>
                <select id="g11c7t2shape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="sphere">Sfeer</option>
                  <option value="cylinder">Silinder</option>
                  <option value="cone">Keël</option>
                  <option value="cube">Kubus</option>
                </select>
              </div>
              <div id="g11c7t2inputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Skaalfaktor k</div>
                <input id="g11c7t2k" type="number" value="2" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g11c7t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g11c7t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function f(n){return n.toFixed(3);}
              function inp(id,label,val){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              function build(){
                const s=document.getElementById('g11c7t2shape').value;
                const d=document.getElementById('g11c7t2inputs');
                if(s==='sphere') d.innerHTML=inp('g11c7t2r','Radius r','5');
                else if(s==='cylinder') d.innerHTML=inp('g11c7t2r','Radius r','4')+inp('g11c7t2h','Hoogte h','8');
                else if(s==='cone') d.innerHTML=inp('g11c7t2r','Radius r','3')+inp('g11c7t2h','Hoogte h','4');
                else d.innerHTML=inp('g11c7t2a','Sy a','6');
                ['g11c7t2r','g11c7t2h','g11c7t2a','g11c7t2k'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              }
              function calc(){
                const shapeNames={sphere:'sfeer',cylinder:'silinder',cone:'keël',cube:'kubus'};
                const s=document.getElementById('g11c7t2shape').value;
                const k=gv('g11c7t2k');
                const out=document.getElementById('g11c7t2Out');
                if(isNaN(k)||k<=0){out.innerHTML='<span style="color:#fca5a5;">Voer \'n positiewe skaalfaktor in.</span>';return;}
                let V,sa,label;
                if(s==='sphere'){const r=gv('g11c7t2r');if(isNaN(r)||r<=0){out.innerHTML='<span style="color:#fca5a5;">Voer \'n positiewe radius in.</span>';return;}V=(4/3)*π*r*r*r;sa=4*π*r*r;label='r='+r;}
                else if(s==='cylinder'){const r=gv('g11c7t2r'),h=gv('g11c7t2h');if([r,h].some(isNaN)||[r,h].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}V=π*r*r*h;sa=2*π*r*(r+h);label='r='+r+', h='+h;}
                else if(s==='cone'){const r=gv('g11c7t2r'),h=gv('g11c7t2h');if([r,h].some(isNaN)||[r,h].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}const l=Math.sqrt(r*r+h*h);V=(1/3)*π*r*r*h;sa=π*r*(r+l);label='r='+r+', h='+h;}
                else{const a=gv('g11c7t2a');if(isNaN(a)||a<=0){out.innerHTML='<span style="color:#fca5a5;">Voer \'n positiewe sy in.</span>';return;}V=a*a*a;sa=6*a*a;label='a='+a;}
                const newV=V*k*k*k,newSA=sa*k*k;
                let html='<span style="color:rgba(221,225,240,0.50);">Oorspronklike ('+shapeNames[s]+', '+label+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Volume V = '+f(V)+'</span>   <span style="color:rgba(221,225,240,0.50);">Oppervlak = '+f(sa)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Skaalfaktor k = '+k+' → SA × k² = × '+f(k*k)+'   V × k³ = × '+f(k*k*k)+'</span><br>';
                html+='<span style="color:#fcd34d;">Nuwe SA = '+f(newSA)+'</span>   <span style="color:#6ee7b7;">Nuwe V = '+f(newV)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c7t2shape').addEventListener('change',()=>{build();});
              document.getElementById('g11c7t2Btn').addEventListener('click',calc);
              build();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Al die afmetings van 'n vaste stof word gehalveer. Sy volume word:",
          options: ["1/2 van oorspronklike", "1/4 van oorspronklike", "1/8 van oorspronklike", "1/16 van oorspronklike"],
          answer: 2,
          topic: "Volume & die effek van skaalfaktor k"
        },
        {
          type: "input",
          text: "Keël: r = 3 cm, h = 4 cm. Bepaal die volume in terme van π.",
          answer: "12π",
          topic: "Volume & die effek van skaalfaktor k"
        },
        {
          type: "mc",
          text: "'n Sfeer se radius word verdubbel. Sy oppervlak neem toe met faktor:",
          options: ["2", "4", "8", "16"],
          answer: 1,
          topic: "Volume & die effek van skaalfaktor k"
        },
        {
          type: "mc",
          text: "As die hoogte van 'n silinder verdriedubbel word (radius onveranderd), word die volume:",
          options: ["Verdriedubbel", "Neem toe met 9×", "Verdubbel", "Neem toe met 27×"],
          answer: 0,
          topic: "Volume & die effek van skaalfaktor k"
        },
        {
          type: "input",
          text: "V van 'n sfeer met r = 3 cm (tot 2 desimale plekke, gebruik π ≈ 3.14159).",
          answer: "113.10",
          altAnswers: ["113.1", "113,10"],
          topic: "Volume & die effek van skaalfaktor k"
        },
        {
          type: "mc",
          text: "'n Silinder se radius word verdubbel en sy hoogte gehalveer. Met watter faktor verander sy volume?",
          options: ["×2", "×1 (onveranderd)", "×4", "×½"],
          answer: 0,
          topic: "Volume & die effek van skaalfaktor k"
        },
        {
          type: "input",
          text: "'n Sfeer en 'n keël het gelyke volumes. Die keël het r = 6 cm en h = 8 cm. Bepaal die radius van die sfeer, korrek tot 2 desimale plekke.",
          answer: "4.16",
          altAnswers: ["4,16"],
          topic: "Volume & die effek van skaalfaktor k"
        }
      ]
    },
    {
      id: 702,
      chapter: 7,
      name: "Saamgestelde vorms in konteks",
      fullName: "Die oplos van praktiese, werklike probleme met verskeie saamgestelde 2D- en 3D-vorms",
      lesson: {
        heading: "Saamgestelde vorms in konteks",
        sub: "Hoofstuk 7 · Onderwerp 3",
        body: `
          <p>CAPS vereis dat jy die oppervlak- en volumeformules toepas op <strong>werklike, praktiese probleme</strong> — tenks, silo's, verpakking, boumateriaal — waar 'n enkele voorwerp uit verskeie saamgevoegde vorms bestaan, en jy moet redeneer oor watter vlakke "werklik" is (geverf, gevul, blootgestel) en watter intern is.</p>

          <div class="def-box">
            <div class="def-box-title">📖 'n Praktiese probleemoplossing-kontrolelys</div>
            <p>
              1. Skets (of verbeel jou) die vaste stof en benoem elke vorm waaruit dit bestaan.<br>
              2. Besluit: benodig jy oppervlak (verf, materiaal, verpakking) of volume (inhoud, inhoudsmaat, koste om te vul)?<br>
              3. Identifiseer gedeelde/interne vlakke wat van die oppervlak <em>uitgesluit</em> moet word.<br>
              4. Skakel eenhede konsekwent om (bv. cm³ → liter: 1000 cm³ = 1 ℓ) voordat jy antwoord.<br>
              5. Rond sinvol af vir die konteks (geld, materiaal) maar behou volle akkuraatheid tydens die berekening.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Silo-inhoud</div>
            <p>'n Graansilo is 'n silinder (r = 3 m, h = 6 m) met 'n keël bo-op (dieselfde radius, hoogte 2 m).<br>
            Volume = silinder + keël = π(3)²(6) + ⅓π(3)²(2) = 54π + 6π = 60π ≈ 188.5 m³<br>
            In liter: 188.5 m³ × 1000 = 188 496 ℓ (met 'n meer akkurate waarde van π)</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Materiaal en koste</div>
            <p>'n Reghoekige watertenk sonder deksel (oop bo) is 2 m × 1.5 m × 1 m. Sinkplaat kos R185/m².<br>
            Oppervlak (basis + 4 kante, geen bokant) = (2×1.5) + 2(2×1) + 2(1.5×1) = 3 + 4 + 3 = 10 m²<br>
            Koste = 10 × R185 = R1 850</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Lees altyd die vraag weer deur om te bepaal of 'n deksel/basis/bokant ingesluit is — "oop tenk" of "geen deksel" beteken jy moet daardie vlak van die totale oppervlak aftrek.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Eenheid-omskakeling & Koste-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Skakel 'n volume om na liter, of bereken materiaalkoste vanaf 'n oppervlakte en 'n prys per m².</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g11c7t3vol" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Volume → Liter</button>
              <button id="g11c7t3cost" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Oppervlakte → Koste</button>
            </div>
            <div id="g11c7t3volP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Volume (cm³)</div><input id="g11c7t3v" type="number" value="5000" min="0" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c7t3volBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Skakel om</button>
            </div>
            <div id="g11c7t3costP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Oppervlakte (m²)</div><input id="g11c7t3a" type="number" value="10" min="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Prys (R/m²)</div><input id="g11c7t3p" type="number" value="185" min="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c7t3costBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken Koste</button>
            </div>
            <div id="g11c7t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const volBtn=document.getElementById('g11c7t3vol'),costBtn=document.getElementById('g11c7t3cost');
              const volP=document.getElementById('g11c7t3volP'),costP=document.getElementById('g11c7t3costP');
              const out=document.getElementById('g11c7t3Out');
              function setMode(m){
                if(m==='vol'){volP.style.display='flex';costP.style.display='none';volBtn.style.background='rgba(99,102,241,0.30)';volBtn.style.color='#a5b4fc';volBtn.style.borderColor='rgba(99,102,241,0.50)';costBtn.style.background='transparent';costBtn.style.color='rgba(221,225,240,0.50)';costBtn.style.borderColor='rgba(99,102,241,0.20)';}
                else{costP.style.display='flex';volP.style.display='none';costBtn.style.background='rgba(99,102,241,0.30)';costBtn.style.color='#a5b4fc';costBtn.style.borderColor='rgba(99,102,241,0.50)';volBtn.style.background='transparent';volBtn.style.color='rgba(221,225,240,0.50)';volBtn.style.borderColor='rgba(99,102,241,0.20)';}
                out.innerHTML='';
              }
              volBtn.addEventListener('click',()=>setMode('vol'));
              costBtn.addEventListener('click',()=>setMode('cost'));
              document.getElementById('g11c7t3volBtn').addEventListener('click',()=>{
                const v=gv('g11c7t3v');
                if(isNaN(v)||v<0){out.innerHTML='<span style="color:#fca5a5;">Voer \'n nie-negatiewe volume in.</span>';return;}
                const litres=v/1000;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">1000 cm³ = 1 liter</span><br><span style="color:#6ee7b7;">'+v+' cm³ = '+litres.toLocaleString('en-ZA',{maximumFractionDigits:3})+' ℓ</span>';
              });
              document.getElementById('g11c7t3costBtn').addEventListener('click',()=>{
                const a=gv('g11c7t3a'),p=gv('g11c7t3p');
                if([a,p].some(isNaN)||a<0||p<0){out.innerHTML='<span style="color:#fca5a5;">Voer nie-negatiewe waardes in.</span>';return;}
                const cost=a*p;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Koste = Oppervlakte × Prys = '+a+' m² × '+R(p)+'/m²</span><br><span style="color:#6ee7b7;">Totale koste = '+R(cost)+'</span>';
              });
              setMode('vol');
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Toe reghoekige boks 40 cm × 30 cm × 20 cm hou water. Sy inhoud in liter is:",
          options: ["24 ℓ", "2.4 ℓ", "240 ℓ", "0.24 ℓ"],
          answer: 0,
          topic: "Saamgestelde vorms in konteks"
        },
        {
          type: "mc",
          text: "'n Silo is 'n silinder (r = 2 m, h = 5 m) met 'n keël (r = 2 m, h = 1.5 m) bo-op. Totale volume (in terme van π):",
          options: ["22π m³", "20π m³", "24π m³", "26π m³"],
          answer: 0,
          topic: "Saamgestelde vorms in konteks"
        },
        {
          type: "input",
          text: "'n Oop (geen deksel) kubustenk het sy 1.2 m. Plaat kos R150/m². Bepaal die totale koste (tot die naaste rand). [Oppervlak = 5 vlakke]",
          answer: "1080",
          topic: "Saamgestelde vorms in konteks"
        },
        {
          type: "mc",
          text: "Watter hoeveelheid sou jy gebruik om te antwoord op: 'hoeveel verf word benodig om hierdie watertoring te bedek'?",
          options: ["Volume", "Oppervlak", "Omtrek", "Deursnee"],
          answer: 1,
          topic: "Saamgestelde vorms in konteks"
        },
        {
          type: "input",
          text: "'n Silindriese blik (r = 7 cm, h = 15 cm, toe aan albei kante) moet met papier oorplak word. Bepaal die oppervlak tot die naaste cm² (gebruik π ≈ 3.142).",
          answer: "968",
          altAnswers: ["967", "969"],
          topic: "Saamgestelde vorms in konteks"
        },
        {
          type: "mc",
          text: "'n Reghoekige swembad 8 m × 4 m × 1.5 m (diep) word met water gevul. Die volume water benodig, in kiloliter (1 kℓ = 1 m³), is:",
          options: ["48 kℓ", "480 kℓ", "4.8 kℓ", "12 kℓ"],
          answer: 0,
          topic: "Saamgestelde vorms in konteks"
        },
        {
          type: "input",
          text: "'n Toe silindriese tenk (r = 1.4 m, h = 2.5 m) moet van buite geverf word (bokant, onderkant, en geboë oppervlak). Verf bedek 6 m² per liter. Gebruik π ≈ 3.142 en bepaal die minimum heelgetal liter verf benodig.",
          answer: "6",
          topic: "Saamgestelde vorms in konteks"
        },
        {
          type: "input",
          text: "'n Waterreservoir is in die vorm van 'n keël met die punt na onder, boradius 3 m en hoogte 4 m. Dit word met water gevul tot 'n diepte van 2 m (gemeet vanaf die punt). Bepaal die volume water, in terme van π (gebruik gelykvormige driehoeke om eers die radius van die watervlak te vind).",
          answer: "1.5π",
          topic: "Saamgestelde vorms in konteks"
        }
      ]
    },
    {
      id: 703,
      chapter: 7,
      name: "Meting met trigonometrie",
      fullName: "Die oplos van 2D- en 3D-metingsprobleme wat oppervlak/volume met trigonometriese verhoudings kombineer",
      lesson: {
        heading: "Meting gekombineer met trigonometrie",
        sub: "Hoofstuk 7 · Onderwerp 4",
        body: `
          <p>CAPS vereis eksplisiet probleme in 2D en 3D wat meting (oppervlak, volume, omtrek) met trigonometrie kombineer — gewoonlik moet jy eers 'n trigonometriese verhouding of die stelling van Pythagoras gebruik om 'n onbekende lengte of hoek te vind, en dit dan in 'n metingsformule vervang.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die tweefase-metode</div>
            <p>
              <strong>Fase 1 — Trigonometrie:</strong> Gebruik SOH-CAHTOA, die sinusreël, kosinusreël, of Pythagoras om 'n ontbrekende sy of hoek te vind (dikwels die hoogte, skuinshoogte, of radius).<br>
              <strong>Fase 2 — Meting:</strong> Vervang die gevonde waarde in die betrokke oppervlak-, volume-, of omtrekformule.<br><br>
              Algemene aanduidings: "hoek van hoogte", "die skuinssy maak 'n hoek van...", "die dwarssnee is 'n driehoek met hoek...".
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Keëlhoogte vanaf 'n hoek by die basis</div>
            <p>'n Keël het basisradius 6 cm. Die skuinssy maak 'n hoek van 65° met die basis.<br>
            Fase 1: tan(65°) = h/6 → h = 6 tan(65°) ≈ 12.867 cm<br>
            Skuinshoogte l = 6/cos(65°) ≈ 14.199 cm<br>
            Fase 2: Volume = ⅓π(6)²(12.867) ≈ 485.1 cm³</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Prisma-dwarssnee met die oppervlakte-reël</div>
            <p>'n Driehoekige prisma het lengte 12 cm. Sy driehoekige dwarssnee het twee sye 8 cm en 10 cm met 'n ingeslote hoek van 50°.<br>
            Dwarssnee-oppervlakte = ½(8)(10)sin(50°) ≈ 30.64 cm²<br>
            Volume = oppervlakte × lengte ≈ 30.64 × 12 ≈ 367.7 cm³</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Behou volle sakrekenaar-akkuraatheid vir trigonometriese waardes deur Fase 1 — rond eers die finale antwoord in Fase 2 af, anders vermeerder afrondingsfoute mekaar.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Keëlhoogte-vanaf-hoek → Volume-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die basisradius en die basishoek wat die skuinssy met die basis maak in — kry die hoogte, skuinshoogte, en volume.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radius r (cm)</div><input id="g11c7t4r" type="number" value="6" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Basishoek (°)</div><input id="g11c7t4ang" type="number" value="65" min="1" max="89" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c7t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g11c7t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function f(n){return n.toFixed(3);}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const r=gv('g11c7t4r'),ang=gv('g11c7t4ang');
                const out=document.getElementById('g11c7t4Out');
                if([r,ang].some(isNaN)||r<=0||ang<=0||ang>=90){out.innerHTML='<span style="color:#fca5a5;">Voer \'n r > 0 en \'n hoek streng tussen 0° en 90° in.</span>';return;}
                const rad=ang*π/180;
                const h=r*Math.tan(rad);
                const l=r/Math.cos(rad);
                const V=(1/3)*π*r*r*h;
                const SA=π*r*r+π*r*l;
                let html='<span style="color:rgba(221,225,240,0.50);">Fase 1 — Trig: h = r·tan('+ang+'°) = '+r+'×tan('+ang+'°) = '+f(h)+' cm</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Skuinshoogte l = r/cos('+ang+'°) = '+f(l)+' cm</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Fase 2 — Meting: V = ⅓πr²h = '+f(V)+' cm³</span><br>';
                html+='<span style="color:#6ee7b7;">Totale SA = πr² + πrl = '+f(SA)+' cm²</span>   <span style="color:#fcd34d;">Volume = '+f(V)+' cm³</span>';
                out.innerHTML=html;
              }
              ['g11c7t4r','g11c7t4ang'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c7t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Keël het basisradius 5 cm. Die skuinssy maak 'n hoek van 60° met die basis. Die hoogte is:",
          options: ["5tan(60°) cm", "5cos(60°) cm", "5sin(60°) cm", "5/tan(60°) cm"],
          answer: 0,
          topic: "Meting met trigonometrie"
        },
        {
          type: "mc",
          text: "'n Driehoekige prisma (lengte 10 cm) het 'n dwarssnee met twee sye 6 cm en 9 cm en 'n ingeslote hoek van 40°. Sy volume is die naaste aan:",
          options: ["173.6 cm³", "270 cm³", "347.2 cm³", "54 cm³"],
          answer: 0,
          topic: "Meting met trigonometrie"
        },
        {
          type: "input",
          text: "'n Keël het radius 4 cm en die skuinssy maak 'n hoek van 70° met die basis. Bepaal die hoogte (tot 2 desimale plekke).",
          answer: "10.99",
          altAnswers: ["10,99"],
          topic: "Meting met trigonometrie"
        },
        {
          type: "mc",
          text: "Om die dwarssnee-oppervlakte van 'n driehoekige prisma te vind wanneer twee sye en die ingeslote hoek bekend is, moet jy gebruik:",
          options: ["Oppervlakte = ½ab sin(C)", "Slegs oppervlakte = ½ basis × hoogte", "Die kosinusreël direk vir oppervlakte", "Slegs die formule van Heron"],
          answer: 0,
          topic: "Meting met trigonometrie"
        },
        {
          type: "mc",
          text: "'n Leer leun teen 'n silindriese watertoring met radius 3 m, en raak die grond 8 m van die basis af. Wat moet jy eers bereken voordat jy enige oppervlak wat die leer se lengte behels, kan vind?",
          options: ["Die leer se lengte deur Pythagoras/trigonometrie te gebruik", "Die toring se volume", "Die toring se oppervlak", "Die toring se omtrek"],
          answer: 0,
          topic: "Meting met trigonometrie"
        },
        {
          type: "input",
          text: "'n Regte piramide het 'n vierkantige basis met sy 10 cm. Elke driehoekige vlak maak 'n hoek van 68° met die basis. Bepaal die hoogte van die piramide, korrek tot 2 desimale plekke. (Wenk: gebruik die apotema — die helfte van die basissy.)",
          answer: "12.38",
          altAnswers: ["12,38"],
          topic: "Meting met trigonometrie"
        },
        {
          type: "input",
          text: "'n Keëlvormige tent het basisradius 3.5 m, en die seil maak 'n hoek van 55° met die grond. Bepaal die oppervlakte seil benodig (slegs die geboë oppervlak), korrek tot 2 desimale plekke.",
          answer: "67.10",
          altAnswers: ["67,10"],
          topic: "Meting met trigonometrie"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 7 Werkboek — Meting",
    questions: [
      {
        number: 1,
        text: "'n Vaste stof bestaan uit 'n silinder (r = 5 cm, h = 8 cm) met 'n keël bo-op (r = 5 cm, h = 3 cm).",
        parts: [
          { label: "a", text: "Bereken die skuinshoogte van die keël.", marks: 2 },
          { label: "b", text: "Bereken die totale oppervlak van die saamgestelde vaste stof (sluit die gedeelde basis uit).", marks: 5 },
          { label: "c", text: "Bereken die totale volume.", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "'n Sfeer het radius 6 cm.",
        parts: [
          { label: "a", text: "Bepaal die volume (los in terme van π).", marks: 2 },
          { label: "b", text: "Die radius word met 50% vermeerder. Bepaal die nuwe volume (in terme van π).", marks: 3 },
          { label: "c", text: "Met watter faktor het die volume toegeneem?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "l = √(25+9) = √34 ≈ 5.83 cm",
        b: "Onderste sirkel: 25π; silinder geboë: 80π; keël geboë: 5√34·π; Totaal = (105 + 5√34)π ≈ 422.1 cm²",
        c: "Silinder: π(25)(8)=200π; Keël: ⅓π(25)(3)=25π; Totaal=225π≈706.9 cm³"
      },
      2: {
        a: "V = (4/3)π(216) = 288π cm³",
        b: "r=9; V=(4/3)π(729)=972π cm³",
        c: "972π/288π = 3.375 = (3/2)³ = k³ waar k=1.5 ✓"
      }
    }
  }
});
