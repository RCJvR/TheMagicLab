// Math Magician — Graad 10, Hoofstuk 13
// Meting

MathMagician.registerChapter(13, {
  topics: [
    {
      id: 1300,
      chapter: 13,
      name: "Oppervlakte & oppervlak",
      fullName: "Oppervlakte van veelhoeke, oppervlak van prismas, silinders, piramides, keëls, en sfere",
      lesson: {
        heading: "Oppervlakte en oppervlak",
        sub: "Hoofstuk 13 · Onderwerp 1",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Oppervlakte van 2D-vorms</div>
            <p>
              <strong>Reghoek:</strong> A = l × b<br>
              <strong>Driehoek:</strong> A = ½bh<br>
              <strong>Parallelogram:</strong> A = b × h<br>
              <strong>Trapesium:</strong> A = ½(a+b)×h<br>
              <strong>Sirkel:</strong> A = πr²
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Oppervlak (SA) van 3D-voorwerpe</div>
            <p>
              <strong>Regte prisma:</strong> SA = 2 × (oppervlakte van basis) + omtrek van basis × hoogte<br>
              <strong>Silinder:</strong> SA = 2πr² + 2πrh<br>
              <strong>Keël:</strong> SA = πr² + πrl (waar l = skuinshoogte = √(r²+h²))<br>
              <strong>Sfeer:</strong> SA = 4πr²<br>
              <strong>Vierkantige piramide:</strong> SA = basis² + 4 × (½ × basis × skuinshoogte)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Silinder-SA</div>
            <p>Silinder: r = 4 cm, h = 10 cm<br>
            SA = 2π(4)² + 2π(4)(10)<br>
            = 32π + 80π = 112π ≈ 351.86 cm²</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Oppervlak-Berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies 'n 3D-vorm en voer sy afmetings in — kry die volledige oppervlak-berekening.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Vorm</div>
                <select id="g10c13shape"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="cylinder">Silinder</option>
                  <option value="cone">Keël</option>
                  <option value="sphere">Sfeer</option>
                  <option value="rect_prism">Reghoekige Prisma</option>
                </select>
              </div>
              <div id="g10c13inputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="g10c13Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g10c13Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function inp(id,label,val){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function f(n){return n.toFixed(2);}
              function buildInputs(){
                const s=document.getElementById('g10c13shape').value;
                const c=document.getElementById('g10c13inputs');
                if(s==='cylinder') c.innerHTML=inp('g10c13r','Radius (r)','4')+inp('g10c13h','Hoogte (h)','10');
                else if(s==='cone') c.innerHTML=inp('g10c13r','Radius (r)','3')+inp('g10c13h','Hoogte (h)','4');
                else if(s==='sphere') c.innerHTML=inp('g10c13r','Radius (r)','5');
                else c.innerHTML=inp('g10c13l','Lengte (l)','6')+inp('g10c13w','Breedte (w)','4')+inp('g10c13h','Hoogte (h)','3');
                ['g10c13r','g10c13h','g10c13l','g10c13w'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              }
              function val(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              function calc(){
                const s=document.getElementById('g10c13shape').value;
                const out=document.getElementById('g10c13Out');
                let SA,formula,working;
                if(s==='cylinder'){
                  const r=val('g10c13r'),h=val('g10c13h');
                  if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                  SA=2*π*r*r+2*π*r*h;
                  formula='SA = 2πr² + 2πrh';
                  working='= 2π('+r+')² + 2π('+r+')('+h+') = '+f(2*π*r*r)+' + '+f(2*π*r*h);
                } else if(s==='cone'){
                  const r=val('g10c13r'),h=val('g10c13h');
                  if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                  const l=Math.sqrt(r*r+h*h);
                  SA=π*r*r+π*r*l;
                  formula='SA = πr² + πrl (skuinshoogte l = √(r²+h²))';
                  working='l = √('+r+'²+'+h+'²) = '+f(l)+'\n= π('+r+')² + π('+r+')('+f(l)+') = '+f(π*r*r)+' + '+f(π*r*l);
                } else if(s==='sphere'){
                  const r=val('g10c13r');
                  if(isNaN(r)||r<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n positiewe radius in.</span>";return;}
                  SA=4*π*r*r;
                  formula='SA = 4πr²';
                  working='= 4π('+r+')² = '+f(4*π*r*r);
                } else {
                  const l=val('g10c13l'),w=val('g10c13w'),h=val('g10c13h');
                  if([l,w,h].some(isNaN)||[l,w,h].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                  SA=2*(l*w+l*h+w*h);
                  formula='SA = 2(lb + lh + bh)';
                  working='= 2('+l+'×'+w+' + '+l+'×'+h+' + '+w+'×'+h+') = 2('+f(l*w+l*h+w*h)+')';
                }
                let html='<span style="color:rgba(221,225,240,0.50);">Formule: </span><span style="color:#fcd34d;">'+formula+'</span><br>';
                working.split('\n').forEach(line=>{ html+='<span style="color:rgba(221,225,240,0.50);">'+line+'</span><br>'; });
                html+='<span style="color:#6ee7b7;">SA = '+f(SA)+' eenhede²</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c13shape').addEventListener('change',()=>{buildInputs();});
              document.getElementById('g10c13Btn').addEventListener('click',calc);
              buildInputs();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Bereken vir 'n keël altyd eers die <strong>skuinshoogte</strong> l = √(r² + h²) — die SA-formule gebruik l, nie die vertikale hoogte h nie.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Keël het basisradius 3 cm en skuinshoogte 5 cm. Sy geboë oppervlakte is:",
          options: ["15π cm²", "9π cm²", "24π cm²", "45π cm²"],
          answer: 0,
          topic: "Oppervlakte & oppervlak"
        },
        {
          type: "input",
          text: "'n Reghoek het l = 8 cm en b = 5 cm. Bereken sy oppervlakte.",
          answer: "40",
          topic: "Oppervlakte & oppervlak"
        },
        {
          type: "mc",
          text: "Totale oppervlak van 'n sfeer met r = 6 cm:",
          options: ["36π cm²", "72π cm²", "144π cm²", "288π cm²"],
          answer: 2,
          topic: "Oppervlakte & oppervlak"
        },
        {
          type: "mc",
          text: "'n Regte prisma het 'n driehoekige basis (b=6, h=4) en hoogte 10. Sy laterale oppervlak is:",
          options: ["172 cm²", "200 cm²", "240 cm²", "150 cm²"],
          answer: 0,
          topic: "Oppervlakte & oppervlak"
        },
        {
          type: "input",
          text: "Silinder r = 3 cm, h = 7 cm. Bereken die geboë oppervlak in terme van π.",
          answer: "42π",
          topic: "Oppervlakte & oppervlak"
        },
        {
          type: "input",
          text: "'n Silinder het 'n totale oppervlak van 220π cm² en radius 5 cm. Bereken sy hoogte.",
          answer: "17",
          topic: "Oppervlakte & oppervlak"
        },
        {
          type: "input",
          text: "'n Trapesiumvormige tuin het parallelle sye van 8 m en 14 m, en hoogte 6 m. 'n Sirkelvormige fontein met radius 2 m word binne-in gebou. Bereken die oorblywende oppervlakte van die tuin, korrek tot 2 desimale plekke.",
          answer: "53.43",
          altAnswers: ["53,43"],
          topic: "Oppervlakte & oppervlak"
        }
      ]
    },
    {
      id: 1301,
      chapter: 13,
      name: "Volume & skaalfaktor",
      fullName: "Volume van 3D-voorwerpe en die effek van 'n skaalfaktor",
      lesson: {
        heading: "Volume en die effek van 'n skaalfaktor",
        sub: "Hoofstuk 13 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Volume van 3D-voorwerpe</div>
            <p>
              <strong>Regte prisma/silinder:</strong> V = oppervlakte van basis × hoogte<br>
              → Silinder: V = πr²h<br>
              <strong>Piramide:</strong> V = ⅓ × basisoppervlakte × hoogte<br>
              <strong>Keël:</strong> V = ⅓πr²h<br>
              <strong>Sfeer:</strong> V = (4/3)πr³
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Effek van vermenigvuldiging van 'n afmeting met k</div>
            <p>
              As alle afmetings met k vermenigvuldig word:<br>
              • <strong>Lengte</strong> skaleer met k<br>
              • <strong>Oppervlakte / oppervlak</strong> skaleer met k²<br>
              • <strong>Volume</strong> skaleer met k³<br><br>
              Dit geld slegs wanneer AL die afmetings met dieselfde faktor geskaleer word.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Skaalfaktor</div>
            <p>'n Boks het 'n volume van 24 cm³. Al die afmetings word verdubbel (k=2).<br>
            Nuwe volume = 24 × 2³ = 24 × 8 = 192 cm³<br><br>
            'n Sfeer met r = 3 cm word vergroot na r = 6 cm (k=2).<br>
            SA neem toe met faktor 4 (2²); Volume met faktor 8 (2³).</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Volume- &amp; Skaalfaktor-Berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies 'n vorm, voer afmetings en 'n skaalfaktor in — vergelyk oorspronklike en geskaleerde volumes.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Vorm</div>
                <select id="g10c13t2shape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="cylinder">Silinder</option>
                  <option value="cone">Keël</option>
                  <option value="sphere">Sfeer</option>
                  <option value="rect_prism">Regh. Prisma</option>
                  <option value="pyramid">Vk. Piramide</option>
                </select>
              </div>
              <div id="g10c13t2inputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Skaalfaktor k</div><input id="g10c13t2k" type="number" value="2" step="0.5" min="0.1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c13t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g10c13t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function inp(id,label,val){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function build(){
                const s=document.getElementById('g10c13t2shape').value;
                const c=document.getElementById('g10c13t2inputs');
                if(s==='cylinder') c.innerHTML=inp('g10c13t2r','Radius','4')+inp('g10c13t2h','Hoogte','10');
                else if(s==='cone') c.innerHTML=inp('g10c13t2r','Radius','3')+inp('g10c13t2h','Hoogte','4');
                else if(s==='sphere') c.innerHTML=inp('g10c13t2r','Radius','5');
                else if(s==='rect_prism') c.innerHTML=inp('g10c13t2l','Lengte','6')+inp('g10c13t2w','Breedte','4')+inp('g10c13t2h','Hoogte','3');
                else c.innerHTML=inp('g10c13t2b','Basissy','5')+inp('g10c13t2h','Hoogte','8');
                ['g10c13t2r','g10c13t2h','g10c13t2l','g10c13t2w','g10c13t2b','g10c13t2k'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              }
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              function calc(){
                const s=document.getElementById('g10c13t2shape').value;
                const k=gv('g10c13t2k');
                const out=document.getElementById('g10c13t2Out');
                if(isNaN(k)||k<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n positiewe skaalfaktor in.</span>";return;}
                let V,label;
                if(s==='cylinder'){const r=gv('g10c13t2r'),h=gv('g10c13t2h');if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Positiewe waardes vereis.</span>';return;}V=π*r*r*h;label='π×'+r+'²×'+h;}
                else if(s==='cone'){const r=gv('g10c13t2r'),h=gv('g10c13t2h');if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Positiewe waardes vereis.</span>';return;}V=π*r*r*h/3;label='⅓π×'+r+'²×'+h;}
                else if(s==='sphere'){const r=gv('g10c13t2r');if(isNaN(r)||r<=0){out.innerHTML='<span style="color:#fca5a5;">Positiewe radius vereis.</span>';return;}V=4/3*π*r*r*r;label='(4/3)π×'+r+'³';}
                else if(s==='rect_prism'){const l=gv('g10c13t2l'),w=gv('g10c13t2w'),h=gv('g10c13t2h');if([l,w,h].some(isNaN)||[l,w,h].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Positiewe waardes vereis.</span>';return;}V=l*w*h;label=l+'×'+w+'×'+h;}
                else{const b=gv('g10c13t2b'),h=gv('g10c13t2h');if(isNaN(b)||isNaN(h)||b<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Positiewe waardes vereis.</span>';return;}V=b*b*h/3;label='⅓×'+b+'²×'+h;}
                const Vnew=V*k*k*k;
                let html='<span style="color:rgba(221,225,240,0.50);">Oorspronklike V = '+label+' = </span><span style="color:#fcd34d;">'+f(V)+' eenhede³</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Skaalfaktor k = '+k+' → Volume skaleer met k³ = '+f(k*k*k)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Nuwe volume = '+f(V)+' × '+f(k*k*k)+' = '+f(Vnew)+' eenhede³</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">SA skaleer met k² = '+f(k*k)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c13t2shape').addEventListener('change',()=>{build();});
              document.getElementById('g10c13t2Btn').addEventListener('click',calc);
              build();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Skaalfaktor k beïnvloed: lengte → ×k, oppervlakte/SA → ×k², volume → ×k³. Om al die afmetings te verdubbel, vermeerder die volume met 8, nie 2 nie.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Sfeer met r = 3 cm. Bereken die volume in terme van π.",
          answer: "36π",
          topic: "Volume & skaalfaktor"
        },
        {
          type: "mc",
          text: "'n Silinder het r = 2 en h = 5. As slegs r verdubbel word, is die nuwe volume:",
          options: ["4 keer die oorspronklike", "2 keer", "8 keer", "Dieselfde"],
          answer: 0,
          topic: "Volume & skaalfaktor"
        },
        {
          type: "mc",
          text: "Al die afmetings van 'n vorm word verdriedubbel. Met watter faktor neem die oppervlak toe?",
          options: ["3", "6", "9", "27"],
          answer: 2,
          topic: "Volume & skaalfaktor"
        },
        {
          type: "mc",
          text: "'n Keël het V = 120 cm³. As al die afmetings gehalveer word, is die nuwe volume:",
          options: ["60 cm³", "30 cm³", "15 cm³", "90 cm³"],
          answer: 2,
          topic: "Volume & skaalfaktor"
        },
        {
          type: "input",
          text: "'n Reghoekige boks is 4×3×5 cm. Bereken sy volume.",
          answer: "60",
          topic: "Volume & skaalfaktor"
        },
        {
          type: "input",
          text: "'n Keël het 'n volume van 100π cm³ en hoogte 12 cm. Bereken sy radius.",
          answer: "5",
          topic: "Volume & skaalfaktor"
        },
        {
          type: "input",
          text: "Twee gelykvormige voorwerpe het volumes van 27 cm³ en 125 cm³. Bepaal die verhouding van hul ooreenstemmende lengtes, in eenvoudigste vorm (kleiner : groter).",
          answer: "3:5",
          altAnswers: ["3/5"],
          topic: "Volume & skaalfaktor"
        }
      ]
    },
    {
      id: 1302,
      chapter: 13,
      name: "Saamgestelde voorwerpe",
      fullName: "Volume en oppervlak van saamgestelde (gekombineerde) soliede figure",
      lesson: {
        heading: "Saamgestelde voorwerpe",
        sub: "Hoofstuk 13 · Onderwerp 3",
        body: `
          <p>'n <strong>Saamgestelde voorwerp</strong> word gevorm deur twee of meer basiese voorwerpe saam te voeg (bv. 'n keël bo-op 'n silinder, of 'n halfsfeer bo-op 'n keël).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Strategie vir saamgestelde voorwerpe</div>
            <p>
              <strong>Volume:</strong> tel eenvoudig die volumes van die afsonderlike dele bymekaar.<br>
              <strong>Oppervlak:</strong> jy moet versigtig wees — moenie die volle oppervlaktes van elke deel bymekaartel nie. Enige vlak waar twee voorwerpe saamvoeg, is <em>intern</em> en moet UITGESLUIT word van die totale oppervlak (dit is nie 'n buitenste oppervlak nie).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Silinder + halfsfeer + keël</div>
            <p>'n Voorwerp het 'n silinder (r=2, h=10), 'n halfsfeer aan een kant (r=2), en 'n keël aan die ander kant (r=2, hoogte 2, dus skuinshoogte l=√(2²+2²)=√8).<br><br>
            <strong>Volume</strong> = silinder + halfsfeer + keël<br>
            = πr²h + ⅔πr³ + ⅓πr²h_keël<br>
            = π(2)²(10) + ⅔π(2)³ + ⅓π(2)²(2)<br>
            = 40π + 16π/3 + 8π/3 = 40π + 8π = 48π ≈ 150.80 cm³<br><br>
            <strong>Oppervlak</strong> = geboë silinder + geboë halfsfeer + geboë keël (plat sirkelvormige eindes is intern, uitgesluit)<br>
            = 2πrh + 2πr² + πrl<br>
            = 2π(2)(10) + 2π(2)² + π(2)(√8) ≈ 125.66 + 25.13 + 17.77 ≈ 168.56 cm²</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Algemene strik</div>
            <p>Moet nooit die plat sirkelvormige vlak(ke) insluit waar twee voorwerpe saamgevoeg is in die oppervlak nie — slegs die BUITENSTE, sigbare oppervlaktes tel.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Saamgestelde Voorwerp-Berekenaar — Silinder met Keël-/Halfsfeerdop</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Bou 'n silinder met 'n opsionele keël of halfsfeer bo-op — kry die gekombineerde volume en oppervlak.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radius r</div><input id="g10c13cr" type="number" value="2" min="0.1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Silinderhoogte</div><input id="g10c13ch" type="number" value="10" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Bo-dop</div>
                <select id="g10c13cap" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="none">Geen (gewone silinder)</option>
                  <option value="cone">Keël</option>
                  <option value="hemisphere">Halfsfeer</option>
                </select>
              </div>
              <div id="g10c13capH" style="display:none;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Keëlhoogte</div><input id="g10c13coneh" type="number" value="2" min="0.1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:monospace;text-align:center;"></div>
              <button id="g10c13cBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g10c13cOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function f(n){return n.toFixed(2);}
              function toggleConeH(){document.getElementById('g10c13capH').style.display=document.getElementById('g10c13cap').value==='cone'?'':'none';}
              function run(){
                const r=parseFloat(document.getElementById('g10c13cr').value);
                const h=parseFloat(document.getElementById('g10c13ch').value);
                const cap=document.getElementById('g10c13cap').value;
                const out=document.getElementById('g10c13cOut');
                if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n positiewe radius en hoogte in.</span>";return;}
                let V=π*r*r*h;
                let SA=2*π*r*h+π*r*r; // curved cylinder + ONE flat base (bottom); top face replaced or open
                let detail='<span style="color:rgba(221,225,240,0.50);">Silinder: V = πr²h = '+f(π*r*r*h)+' cm³; geboë SA = 2πrh = '+f(2*π*r*h)+' cm²; basis-SA = πr² = '+f(π*r*r)+' cm²</span><br>';
                if(cap==='cone'){
                  const ch=parseFloat(document.getElementById('g10c13coneh').value);
                  if(isNaN(ch)||ch<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n positiewe keëlhoogte in.</span>";return;}
                  const Vcone=π*r*r*ch/3;
                  const l=Math.sqrt(r*r+ch*ch);
                  const SAcone=π*r*l;
                  V+=Vcone;
                  SA+=SAcone; // top circular face is internal, excluded
                  detail+='<span style="color:rgba(221,225,240,0.50);">Keëldop: V = ⅓πr²h = '+f(Vcone)+' cm³; skuinshoogte l = √(r²+h²) = '+f(l)+'; geboë SA = πrl = '+f(SAcone)+' cm² (interne verbinding uitgesluit)</span><br>';
                } else if(cap==='hemisphere'){
                  const Vhemi=(2/3)*π*r*r*r;
                  const SAhemi=2*π*r*r;
                  V+=Vhemi;
                  SA+=SAhemi; // flat circle of hemisphere is internal, excluded
                  detail+='<span style="color:rgba(221,225,240,0.50);">Halfsfeerdop: V = ⅔πr³ = '+f(Vhemi)+' cm³; geboë SA = 2πr² = '+f(SAhemi)+' cm² (interne verbinding uitgesluit)</span><br>';
                } else {
                  SA+=π*r*r; // plain cylinder: include the top face too
                  detail+='<span style="color:rgba(221,225,240,0.50);">Geen dop: boonste plat vlak ingesluit = πr² = '+f(π*r*r)+' cm²</span><br>';
                }
                let html=detail;
                html+='<span style="color:#6ee7b7;">Totale volume = '+f(V)+' cm³</span><br>';
                html+='<span style="color:#6ee7b7;">Totale oppervlak = '+f(SA)+' cm²</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c13cap').addEventListener('change',()=>{toggleConeH();run();});
              document.getElementById('g10c13cBtn').addEventListener('click',run);
              ['g10c13cr','g10c13ch','g10c13coneh'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              toggleConeH();
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Skets die saamgestelde voorwerp voor jy bereken, en merk die vlakke wat werklik aan die BUITEKANT is — dit voorkom die algemene fout van dubbeltelling of die insluiting van interne verbindings.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Saamgestelde voorwerp is 'n silinder (r=3, h=8) met 'n halfsfeer (r=3) bo-op. Sy totale volume is naaste aan:",
          options: ["282.7 cm³", "226.2 cm³", "339.3 cm³", "254.5 cm³"],
          answer: 0,
          topic: "Saamgestelde voorwerpe"
        },
        {
          type: "mc",
          text: "Wanneer die oppervlak van 'n saamgestelde voorwerp bereken word wat deur die saamvoeging van twee vorms gevorm is, moet jy:",
          options: ["Albei volle oppervlaktes bymekaartel", "Die interne saamgevoegde vlak(ke) uitsluit van die totaal", "Slegs die volume bereken, nie die oppervlak nie", "Die kleiner vorm se oppervlak verdubbel"],
          answer: 1,
          topic: "Saamgestelde voorwerpe"
        },
        {
          type: "input",
          text: "'n Keël (r=3, h=4) sit bo-op 'n silinder (r=3, h=6). Bereken die totale volume in terme van π.",
          answer: "66π",
          topic: "Saamgestelde voorwerpe"
        },
        {
          type: "mc",
          text: "'n Saamgestelde voorwerp = kubus (sy 4 cm) met 'n vierkantige piramide (basis 4×4, hoogte 3 cm) bo-op. Die totale volume is:",
          options: ["80 cm³", "64 cm³", "16 cm³", "112 cm³"],
          answer: 0,
          topic: "Saamgestelde voorwerpe"
        },
        {
          type: "mc",
          text: "Vir 'n silinder met 'n halfsfeerdop, watter vlak word uitgesluit van die totale oppervlakberekening?",
          options: ["Die geboë silindervlak", "Die onderste sirkelvormige basis", "Die plat sirkel waar die halfsfeer die silinder ontmoet", "Die geboë halfsfeervlak"],
          answer: 2,
          topic: "Saamgestelde voorwerpe"
        },
        {
          type: "input",
          text: "'n Saamgestelde voorwerp is 'n silinder (r=4, h=9) met 'n keël (r=4, hoogte=3) bo-op. Bereken die totale volume in terme van π.",
          answer: "160π",
          topic: "Saamgestelde voorwerpe"
        },
        {
          type: "input",
          text: "'n Saamgestelde voorwerp is 'n silinder (r=3, h=10) met 'n halfsfeer (r=3) bo-op. Bereken die totale oppervlak (geboë silinder + plat onderste basis + geboë halfsfeer, met uitsluiting van die interne verbinding), korrek tot 2 desimale plekke.",
          answer: "273.32",
          altAnswers: ["273,32"],
          topic: "Saamgestelde voorwerpe"
        }
      ]
    },
    {
      id: 1303,
      chapter: 13,
      name: "Piramides en keëls in diepte",
      fullName: "Gedetailleerde volume- en oppervlakvraagstukke wat regte piramides en keëls betrek",
      lesson: {
        heading: "Piramides en keëls in diepte",
        sub: "Hoofstuk 13 · Onderwerp 4",
        body: `
          <p>CAPS bepaal dat piramidebasisse in Graad 10 óf 'n <strong>gelyksydige driehoek</strong> óf 'n <strong>vierkant</strong> is — hierdie afdeling werk beide gevalle noukeurig deur.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Vierkant-gebaseerde piramide</div>
            <p>
              <strong>Volume:</strong> V = ⅓ × basis² × hoogte (loodregte hoogte)<br>
              <strong>Oppervlak:</strong> SA = basis² + 4 × (½ × basis × skuinshoogte)<br>
              Skuinshoogte (van 'n driehoekige vlak) word met Pythagoras gevind: <span class="math">l_vlak² = h² + (basis/2)²</span> as h die loodregte hoogte vanaf die middelpunt van die basis is.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Driehoek-gebaseerde piramide (gelyksydige driehoekbasis)</div>
            <p>
              <strong>Basisoppervlakte</strong> (gelyksydige driehoek, sy a): <span class="math">A = (√3/4)a²</span><br>
              <strong>Volume:</strong> V = ⅓ × basisoppervlakte × hoogte
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Keël-opsomming</div>
            <p>
              <strong>Volume:</strong> V = ⅓πr²h<br>
              <strong>Skuinshoogte:</strong> l = √(r² + h²)<br>
              <strong>Totale oppervlak:</strong> SA = πr² + πrl
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Vierkantige piramide</div>
            <p>Vierkantige piramide: basis = 6 cm, loodregte hoogte = 4 cm.<br>
            Skuinshoogte van 'n vlak: <span class="math">l = √(4² + 3²) = √25 = 5 cm</span> (met die helfte van die basis = 3)<br>
            Volume = ⅓(6²)(4) = ⅓(144) = 48 cm³<br>
            SA = 6² + 4(½×6×5) = 36 + 60 = 96 cm²</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Vierkantige Piramide-Berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die basissy en die loodregte hoogte in — kry die skuinshoogte, volume, en totale oppervlak.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Basissy</div><input id="g10c13pb" type="number" value="6" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Loodr. hoogte</div><input id="g10c13ph" type="number" value="4" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c13pBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g10c13pOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(2);}
              function run(){
                const b=parseFloat(document.getElementById('g10c13pb').value);
                const h=parseFloat(document.getElementById('g10c13ph').value);
                const out=document.getElementById('g10c13pOut');
                if(isNaN(b)||isNaN(h)||b<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes in.</span>';return;}
                const l=Math.sqrt(h*h+(b/2)*(b/2));
                const V=(b*b*h)/3;
                const SA=b*b+4*(0.5*b*l);
                let html='<span style="color:rgba(221,225,240,0.50);">Skuinshoogte l = √(h² + (b/2)²) = √('+h+'² + '+(b/2)+'²) = </span><span style="color:#fcd34d;">'+f(l)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Volume = ⅓b²h = ⅓('+b+'²)('+h+') = </span><span style="color:#6ee7b7;">'+f(V)+' eenhede³</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">SA = b² + 4(½bl) = '+b+'² + 4(½×'+b+'×'+f(l)+') = </span><span style="color:#6ee7b7;">'+f(SA)+' eenhede²</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c13pBtn').addEventListener('click',run);
              ['g10c13pb','g10c13ph'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Moenie die piramide se loodregte hoogte (gebruik in die volumeformule) met die skuinshoogte van 'n driehoekige vlak (gebruik in die oppervlakformule) verwar nie — dit is verskillende lengtes wat met verskillende reghoekige driehoeke gevind word.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Vierkantige piramide het basis 8 cm en loodregte hoogte 3 cm. Sy volume is:",
          options: ["64 cm³", "192 cm³", "24 cm³", "96 cm³"],
          answer: 0,
          topic: "Piramides en keëls in diepte"
        },
        {
          type: "input",
          text: "'n Vierkantige piramide het basis 10 cm en loodregte hoogte 12 cm. Bereken die skuinshoogte van 'n driehoekige vlak.",
          answer: "13",
          topic: "Piramides en keëls in diepte"
        },
        {
          type: "mc",
          text: "'n Keël het radius 5 cm en hoogte 12 cm. Sy totale oppervlak (in terme van π) is:",
          options: ["90π cm²", "60π cm²", "25π cm²", "156π cm²"],
          answer: 0,
          topic: "Piramides en keëls in diepte"
        },
        {
          type: "mc",
          text: "Die oppervlakte van 'n gelyksydige driehoek met sy 6 cm is:",
          options: ["9√3 cm²", "18 cm²", "36 cm²", "6√3 cm²"],
          answer: 0,
          topic: "Piramides en keëls in diepte"
        },
        {
          type: "input",
          text: "'n Vierkantige piramide het basis 6 cm en totale oppervlak 96 cm². Gegewe dat die basisoppervlakte 36 cm² is, bereken die totale laterale (driehoekige vlakke) oppervlakte.",
          answer: "60",
          topic: "Piramides en keëls in diepte"
        },
        {
          type: "input",
          text: "'n Driehoekige piramide het 'n gelyksydige driehoekbasis met sy 8 cm, en loodregte hoogte 10 cm. Bereken die volume, korrek tot 2 desimale plekke.",
          answer: "92.38",
          altAnswers: ["92,38"],
          topic: "Piramides en keëls in diepte"
        },
        {
          type: "input",
          text: "'n Keël het 'n volume van 150π cm³ en radius 5 cm. Bereken sy hoogte.",
          answer: "18",
          topic: "Piramides en keëls in diepte"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 13 Werkboek — Meting",
    questions: [
      {
        number: 1,
        text: "'n Saamgestelde vorm bestaan uit 'n reghoek 10 cm × 6 cm met 'n halfsirkel aan een kort kant vasgeheg.",
        parts: [
          { label: "a", text: "Bereken die oppervlakte van die saamgestelde vorm (tot 2 desimale plekke).", marks: 4 },
          { label: "b", text: "Bereken die omtrek.", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "'n Keël het basisdeursnee 12 cm en hoogte 8 cm.",
        parts: [
          { label: "a", text: "Bereken die skuinshoogte l.", marks: 2 },
          { label: "b", text: "Bereken die totale oppervlak (in terme van π, dan tot 2 desimale plekke).", marks: 4 },
          { label: "c", text: "Bereken die volume (in terme van π).", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "'n Model van 'n gebou het 'n reghoekige prisma-basis (6×4×3 cm) met 'n vierkantige piramide bo-op (basis 6×4 cm, hoogte 2 cm).",
        parts: [
          { label: "a", text: "Bereken die totale volume van die model.", marks: 4 },
          { label: "b", text: "Die werklike gebou is 50 keer groter in elke afmeting. Wat is sy werklike volume?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Reghoek: 10×6=60; halfsirkel: ½π(3)²=4.5π≈14.14; Totaal≈74.14 cm²",
        b: "2 lang sye + 1 kort sy + halfsirkelomtrek: 2(10)+6+π(3)=26+3π≈35.42 cm"
      },
      2: {
        a: "l = √(6²+8²) = √100 = 10 cm",
        b: "SA = π(6²) + π(6)(10) = 36π + 60π = 96π ≈ 301.59 cm²",
        c: "V = ⅓π(6²)(8) = 96π cm³"
      },
      3: {
        a: "Prisma: 6×4×3=72; Piramide: ⅓×24×2=16; Totaal=88 cm³",
        b: "Skaalfaktor=50; Volume skaleer met 50³=125000; Werklik=88×125000=11 000 000 cm³=11 m³"
      }
    }
  }
});
