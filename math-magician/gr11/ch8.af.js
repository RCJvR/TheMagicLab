// Math Magician — Graad 11, Hoofstuk 8
// Euklidiese Meetkunde — Sirkelmeetkunde

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 800,
      chapter: 8,
      name: "Sirkelstellings",
      fullName: "Stellings oor sirkels — koorde, hoeke, en boë",
      lesson: {
        heading: "Sirkelstellings",
        sub: "Hoofstuk 8 · Onderwerp 1",
        body: `
          <p>Sirkelmeetkunde is 'n groot nuwe afdeling in Graad 11. Jy moet die stellings ken ÉN dit formeel kan bewys.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die agt sleutel-sirkelstellings</div>
            <p>
              <strong>1. Koord en middelpunt:</strong> Die loodlyn vanaf die middelpunt na 'n koord halveer die koord.<br>
              <strong>2. Loodregte halveerder:</strong> Die loodregte halveerder van 'n koord gaan deur die middelpunt.<br>
              <strong>3. Middelpuntshoek:</strong> Die hoek wat deur 'n boog by die middelpunt onderspan word, is dubbel die hoek wat by die omtrek onderspan word.<br>
              <strong>4. Dieselfde boog:</strong> Hoeke in dieselfde segment is gelyk (hoeke onderspan deur dieselfde boog).<br>
              <strong>5. Halfsirkel:</strong> Die hoek in 'n halfsirkel is 90°.<br>
              <strong>6. Koordevierhoek:</strong> Opponerende hoeke van 'n koordevierhoek is supplementêr (som tot 180°).<br>
              <strong>7. Buitehoek:</strong> Die buitehoek van 'n koordevierhoek is gelyk aan die binne-opponerende hoek.<br>
              <strong>8. Raaklyn-radius:</strong> Die raaklyn aan 'n sirkel is loodreg op die radius by die raakpunt.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Middelpuntshoekstelling</div>
            <p>O is die middelpunt. ∠AOB = 80° (middelpuntshoek). Dan is ∠ACB (hoek by omtrek, dieselfde boog) = 40°.<br>
            (Middelpuntshoek = 2 × omtrekshoek)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Omgekeerde stellings</div>
            <p>
              Elke stelling het 'n omgekeerde wat gebruik word om te bewys dat vier punte konsikliek is (op een sirkel lê):<br>
              Bv. As opponerende hoeke van 'n vierhoek supplementêr is → is dit 'n koordevierhoek.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Sirkelstelling-hoekberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Kies 'n stelling, voer die bekende hoek in, en vind die onbekende.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Stelling</div>
                <select id="g11c8thm" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;max-width:280px;">
                  <option value="central">Middelpuntshoek → omtrekshoek</option>
                  <option value="circ">Omtrekshoek → middelpuntshoek</option>
                  <option value="cyclicA">Koordevierhoek: vind opponerende hoek</option>
                  <option value="extcyclic">Koordevierhoek: buitehoek</option>
                  <option value="semicircle">Hoek in halfsirkel (= 90°)</option>
                  <option value="sameseg">Hoeke in dieselfde segment (gelyk)</option>
                </select>
              </div>
              <div id="g11c8inp" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="g11c8Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g11c8Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function lbl(id,label,val,mn,mx){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="'+(mn||0)+'" max="'+(mx||360)+'" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              const descs={
                central:'Die middelpuntshoek (∠AOB) is dubbel die ingeskrewe hoek. Voer middelpuntshoek in → vind omtrekshoek.',
                circ:'Voer omtrekshoek in → vind middelpuntshoek (dubbel).',
                cyclicA:'Voer een hoek van \'n koordevierhoek in → vind sy opponerende hoek (supplementêr: som = 180°).',
                extcyclic:'Voer die binnehoek by een hoekpunt in → die buitehoek by die opponerende hoekpunt is daaraan gelyk.',
                semicircle:'Die hoek in \'n halfsirkel is altyd 90°. Voer die middelpuntshoek van die deursnee (180°) in → bevestig.',
                sameseg:'Hoeke wat deur dieselfde boog in dieselfde segment onderspan word, is gelyk. Voer een in → kry die ander.'
              };
              function build(){
                const t=document.getElementById('g11c8thm').value;
                const d=document.getElementById('g11c8inp');
                if(t==='central') d.innerHTML=lbl('g11c8a','Middelpunts-∠AOB (°)','80',1,359);
                else if(t==='circ') d.innerHTML=lbl('g11c8a','Omtreks-∠ (°)','40',1,179);
                else if(t==='cyclicA') d.innerHTML=lbl('g11c8a','Bekende ∠ (°)','78',1,179);
                else if(t==='extcyclic') d.innerHTML=lbl('g11c8a','Binne-opp. ∠ (°)','65',1,179);
                else if(t==='semicircle') d.innerHTML='<span style="color:rgba(221,225,240,0.50);font-size:13px;padding:7px 0;display:block;">Geen toevoer nodig nie — hoek in halfsirkel is altyd 90°.</span>';
                else d.innerHTML=lbl('g11c8a','Bekende ∠ (°)','55',1,179);
                const el=document.getElementById('g11c8a');
                if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              }
              function calc(){
                const t=document.getElementById('g11c8thm').value;
                const out=document.getElementById('g11c8Out');
                const a=gv('g11c8a');
                let html='';
                if(t==='semicircle'){out.innerHTML='<span style="color:#6ee7b7;">∠ACB = 90° (hoek in \'n halfsirkel; AB is \'n deursnee)</span>';return;}
                if(isNaN(a)||a<=0){out.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige hoek in.</span>';return;}
                if(t==='central'){
                  if(a<=0||a>=360){out.innerHTML='<span style="color:#fca5a5;">Middelpuntshoek moet tussen 0° en 360° wees.</span>';return;}
                  const circ=a/2;
                  html='<span style="color:rgba(221,225,240,0.50);">Middelpunts-∠AOB = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Reël: omtrekshoek = ½ middelpuntshoek</span><br>';
                  html+='<span style="color:#6ee7b7;">∠ACB (by omtrek) = '+circ+'°</span>';
                } else if(t==='circ'){
                  if(a<=0||a>=180){out.innerHTML='<span style="color:#fca5a5;">Omtrekshoek moet tussen 0° en 180° wees.</span>';return;}
                  const cent=a*2;
                  html='<span style="color:rgba(221,225,240,0.50);">Omtrekshoek = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Reël: middelpuntshoek = 2 × omtrekshoek</span><br>';
                  html+='<span style="color:#6ee7b7;">Middelpunts-∠AOB = '+cent+'°</span>';
                } else if(t==='cyclicA'){
                  if(a<=0||a>=180){out.innerHTML='<span style="color:#fca5a5;">Hoek moet tussen 0° en 180° wees.</span>';return;}
                  const opp=180-a;
                  html='<span style="color:rgba(221,225,240,0.50);">Bekende hoek = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Reël: opponerende hoeke van koordevierhoek is supplementêr</span><br>';
                  html+='<span style="color:#6ee7b7;">Opponerende hoek = 180° − '+a+'° = '+opp+'°</span>';
                } else if(t==='extcyclic'){
                  html='<span style="color:rgba(221,225,240,0.50);">Binne-opponerende hoek = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Reël: buitehoek van koordevierhoek = binne-opponerende hoek</span><br>';
                  html+='<span style="color:#6ee7b7;">Buitehoek = '+a+'°</span>';
                } else {
                  html='<span style="color:rgba(221,225,240,0.50);">Bekende hoek onderspan deur boog = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Reël: hoeke in dieselfde segment (dieselfde boog) is gelyk</span><br>';
                  html+='<span style="color:#6ee7b7;">Alle ander ingeskrewe hoeke op dieselfde boog = '+a+'°</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c8thm').addEventListener('change',()=>{build();});
              document.getElementById('g11c8Btn').addEventListener('click',calc);
              build();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "O is die middelpunt. Boog AB onderspan ∠AOB = 110° by die middelpunt. ∠ACB by die omtrek =",
          options: ["110°", "55°", "220°", "70°"],
          answer: 1,
          topic: "Sirkelstellings"
        },
        {
          type: "mc",
          text: "ABCD is 'n koordevierhoek. ∠A = 78°. Dan is ∠C =",
          options: ["78°", "102°", "156°", "282°"],
          answer: 1,
          topic: "Sirkelstellings"
        },
        {
          type: "mc",
          text: "AB is 'n deursnee. ∠ACB waar C op die sirkel lê, is gelyk aan:",
          options: ["180°", "90°", "45°", "Hang af van die posisie van C"],
          answer: 1,
          topic: "Sirkelstellings"
        },
        {
          type: "mc",
          text: "'n Raaklyn raak 'n sirkel by P. OP is 'n radius. Die hoek tussen OP en die raaklyn is:",
          options: ["45°", "60°", "90°", "180°"],
          answer: 2,
          topic: "Sirkelstellings"
        },
        {
          type: "mc",
          text: "Twee hoeke ingeskryf in dieselfde sirkel, wat albei boog PQ onderspan, is:",
          options: ["Supplementêr", "Komplementêr", "Gelyk", "Verwant deur 'n faktor van 2"],
          answer: 2,
          topic: "Sirkelstellings"
        },
        {
          type: "input",
          text: "AB is 'n deursnee van 'n sirkel, en C is 'n punt op die sirkel met ∠BAC = 35°. Bereken ∠ABC.",
          answer: "55",
          topic: "Sirkelstellings"
        },
        {
          type: "input",
          text: "O is die middelpunt van 'n sirkel. Koord AB onderspan ∠AOB = 100° by die middelpunt. D is 'n punt op die kleiner boog AB. Bereken ∠ADB (die hoek wat deur AB by D, op die kleiner boog, onderspan word).",
          answer: "130",
          topic: "Sirkelstellings"
        }
      ]
    },
    {
      id: 801,
      chapter: 8,
      name: "Raaklynstellings & koordbewyse",
      fullName: "Raaklynstellings, koord-hoekstellings, en formele sirkelbewyse",
      lesson: {
        heading: "Raaklynstellings en koord-hoekverwantskappe",
        sub: "Hoofstuk 8 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Raaklynstellings</div>
            <p>
              <strong>Raaklyn vanaf 'n buitepunt:</strong> Die twee raaklyne wat vanaf 'n buitepunt na 'n sirkel getrek word, is gelyk in lengte.<br>
              <strong>Raaklyn-koordhoek:</strong> Die hoek tussen 'n raaklyn en 'n koord is gelyk aan die ingeskrewe hoek aan die teenoorgestelde kant van die koord (die tussensegmentstelling).<br>
              <span class="math">∠ tussen raaklyn en koord = ∠ in tussensegment</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Koordstellings</div>
            <p>
              <strong>Gelyke koorde:</strong> Gelyke koorde onderspan gelyke hoeke by die middelpunt.<br>
              <strong>Koordafstand:</strong> Koorde ewe ver van die middelpunt af, is gelyk.<br>
              <strong>Snydende koorde:</strong> As koorde AB en CD by P binne 'n sirkel sny:<br>
              <span class="math">PA × PB = PC × PD</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Tussensegmentstelling</div>
            <p>Raaklyn by A. Koord AB. Ingeskrewe hoek ACB in die tussensegment = 58°.<br>
            Dan is die hoek tussen die raaklyn en koord AB (aan dieselfde kant as C) = 58°.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Bewysstruktuur vir sirkelstellings</div>
            <p>
              Altyd:<br>
              1. Trek hulplyne waar nodig (bv. trek die radius na die raakpunt).<br>
              2. Stel die stelling wat bewys word, duidelik.<br>
              3. Gebruik redekodes: ∠ in halfsirkel; opp ∠e koordevierhoek; raaklyn⊥radius; ens.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Koord- & Raaklynberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Snydende koorde (PA × PB = PC × PD) of raaklyn-sekans (PT² = PQ × PR).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g11c8t2chord" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Snydende koorde</button>
              <button id="g11c8t2tang" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Raaklyn-sekans</button>
            </div>
            <div id="g11c8t2chordP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PA</div><input id="g11c8pa" type="number" value="4" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PB</div><input id="g11c8pb" type="number" value="9" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PC</div><input id="g11c8pc" type="number" value="6" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PD (onbekend)</div><input id="g11c8pd" type="text" value="?" readonly style="width:65px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.20);color:#6ee7b7;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c8t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g11c8t2tangP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PT (raaklyn)</div><input id="g11c8pt" type="number" value="8" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PQ (naaste)</div><input id="g11c8pq" type="number" value="4" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PR (onbekend)</div><input id="g11c8pr" type="text" value="?" readonly style="width:65px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.20);color:#6ee7b7;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c8t2Btn2" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g11c8t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              const chordBtn=document.getElementById('g11c8t2chord'),tangBtn=document.getElementById('g11c8t2tang');
              const chordP=document.getElementById('g11c8t2chordP'),tangP=document.getElementById('g11c8t2tangP');
              const out=document.getElementById('g11c8t2Out');
              function setMode(mode){
                if(mode==='chord'){chordP.style.display='flex';tangP.style.display='none';chordBtn.style.background='rgba(99,102,241,0.30)';chordBtn.style.color='#a5b4fc';chordBtn.style.borderColor='rgba(99,102,241,0.50)';tangBtn.style.background='transparent';tangBtn.style.color='rgba(221,225,240,0.50)';tangBtn.style.borderColor='rgba(99,102,241,0.20)';}
                else{tangP.style.display='flex';chordP.style.display='none';tangBtn.style.background='rgba(99,102,241,0.30)';tangBtn.style.color='#a5b4fc';tangBtn.style.borderColor='rgba(99,102,241,0.50)';chordBtn.style.background='transparent';chordBtn.style.color='rgba(221,225,240,0.50)';chordBtn.style.borderColor='rgba(99,102,241,0.20)';}
                out.innerHTML='';
              }
              chordBtn.addEventListener('click',()=>setMode('chord'));
              tangBtn.addEventListener('click',()=>setMode('tang'));
              document.getElementById('g11c8t2Btn').addEventListener('click',()=>{
                const pa=gv('g11c8pa'),pb=gv('g11c8pb'),pc=gv('g11c8pc');
                if([pa,pb,pc].some(isNaN)||[pa,pb,pc].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe waardes vir PA, PB, PC in.</span>';return;}
                const pd=pa*pb/pc;
                document.getElementById('g11c8pd').value=f(pd);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">PA × PB = '+f(pa*pb)+'</span><br><span style="color:rgba(221,225,240,0.50);">PC × PD = PA × PB → PD = '+f(pa*pb)+' ÷ '+pc+' = '+f(pd)+'</span><br><span style="color:#6ee7b7;">PD = '+f(pd)+'</span>';
              });
              document.getElementById('g11c8t2Btn2').addEventListener('click',()=>{
                const pt=gv('g11c8pt'),pq=gv('g11c8pq');
                if([pt,pq].some(isNaN)||[pt,pq].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe PT en PQ in.</span>';return;}
                const pr=pt*pt/pq;
                document.getElementById('g11c8pr').value=f(pr);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">PT² = '+f(pt*pt)+'</span><br><span style="color:rgba(221,225,240,0.50);">PR = PT² ÷ PQ = '+f(pt*pt)+' ÷ '+pq+' = '+f(pr)+'</span><br><span style="color:#fcd34d;">QR = PR − PQ = '+f(pr - pq)+'</span><br><span style="color:#6ee7b7;">PR = '+f(pr)+'</span>';
              });
              ['g11c8pa','g11c8pb','g11c8pc'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c8t2Btn').click();});});
              ['g11c8pt','g11c8pq'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c8t2Btn2').click();});});
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Twee raaklyne vanaf buitepunt P raak die sirkel by A en B. As PA = 5 cm, dan is PB =",
          options: ["5 cm", "10 cm", "2.5 cm", "Kan nie bepaal word nie"],
          answer: 0,
          topic: "Raaklynstellings & koordbewyse"
        },
        {
          type: "mc",
          text: "Die tussensegmentstelling sê die hoek tussen 'n raaklyn en 'n koord is gelyk aan:",
          options: ["Die middelpuntshoek", "Die hoek in die tussensegment", "Die supplement van die koordhoek", "90°"],
          answer: 1,
          topic: "Raaklynstellings & koordbewyse"
        },
        {
          type: "mc",
          text: "Koorde PQ en RS sny by T binne 'n sirkel. PT = 4, TQ = 9, RT = 6. Bereken TS.",
          options: ["6", "8", "4", "12"],
          answer: 0,
          topic: "Raaklynstellings & koordbewyse"
        },
        {
          type: "mc",
          text: "Die omgekeerde van die raaklyn-koordstelling kan gebruik word om te bewys:",
          options: ["'n Lyn is 'n raaklyn", "'n Punt is die middelpunt", "'n Hoek is 'n regte hoek", "'n Vierhoek is 'n koordevierhoek"],
          answer: 0,
          topic: "Raaklynstellings & koordbewyse"
        },
        {
          type: "mc",
          text: "Die loodlyn vanaf die middelpunt na 'n koord:",
          options: ["Halveer die koord", "Is gelyk aan die radius", "Halveer die koordhoek", "Is 'n raaklyn aan die koord"],
          answer: 0,
          topic: "Raaklynstellings & koordbewyse"
        },
        {
          type: "input",
          text: "PA en PB is raaklyne vanaf buitepunt P na 'n sirkel met middelpunt O, en raak die sirkel by A en B. ∠APB = 50°. Bereken ∠AOB. (Wenk: OAPB het twee regte hoeke, by A en B.)",
          answer: "130",
          topic: "Raaklynstellings & koordbewyse"
        },
        {
          type: "input",
          text: "Vanaf buitepunt P raak raaklyn PT = 12 cm 'n sirkel by T. Sekans PAB (A nader aan P) sny die sirkel met PA = 8 cm. Gebruik PT² = PA × PB om die lengte van AB te bereken.",
          answer: "10",
          topic: "Raaklynstellings & koordbewyse"
        }
      ]
    },
    {
      id: 802,
      chapter: 8,
      name: "Koord-, radius- en afstandberekeninge",
      fullName: "Die gebruik van die loodregte-halveerder-van-'n-koord-stelling saam met Pythagoras om radiusse, koordlengtes, en afstande vanaf die middelpunt te bereken",
      lesson: {
        heading: "Koord-, radius- en afstandberekeninge",
        sub: "Hoofstuk 8 · Onderwerp 3",
        body: `
          <p>Die stelling dat <strong>die lyn vanaf die middelpunt loodreg op 'n koord die koord halveer</strong> (en die omgekeerde daarvan) verander elke koordvraagstuk in 'n reghoekige-driehoekvraagstuk — opgelos met Pythagoras.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die reghoekige driehoek wat in elke koord skuil</div>
            <p>
              As O die middelpunt is, OM ⊥ koord AB by M, dan is AM = MB = ½AB, en driehoek OMA is reghoekig by M.<br>
              <span class="math">OA² = OM² + AM²</span>, d.w.s. <span class="math">r² = d² + (½c)²</span><br>
              waar r = radius, d = afstand vanaf middelpunt na koord, c = koordlengte.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bereken die radius</div>
            <p>'n Koord met lengte 48 mm is 7 mm vanaf die middelpunt.<br>
            r² = 7² + 24² = 49 + 576 = 625 → r = 25 mm</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Twee koorde, dieselfde sirkel</div>
            <p>AB en CD is koorde van 'n sirkel, middelpunt O, met OM ⊥ AB en ON ⊥ CD. AB = 50 mm, OM = 40 mm... wag — herbereken met 'n konsekwente radius: r² = OM² + (AB/2)².<br>
            As AB = 48 mm en OM = 7 mm: r = 25 mm (soos hierbo). Aangesien ON ⊥ CD ook 'n radius-gebaseerde reghoekige driehoek is, kan CD = 2√(r² − ON²) bereken word sodra r bekend is.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Enige twee van {radius, half-koord, afstand vanaf middelpunt} bepaal die derde via Pythagoras — identifiseer watter twee jy gegee is, en los dan die onbekende op.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Koord–Radius–Afstand-oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer enige twee van radius r, koordlengte c, afstand d vanaf die middelpunt in — los op vir die derde met r² = d² + (c/2)².</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radius r</div><input id="g11c8t3r" type="text" value="25" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Koord c</div><input id="g11c8t3c" type="text" value="48" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Afstand d</div><input id="g11c8t3d" type="text" value="?" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c8t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <p style="margin:0 0 8px;color:rgba(221,225,240,0.45);font-size:12px;">Los die onbekende waarde as <code>?</code> — vul die ander twee in.</p>
            <div id="g11c8t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function raw(id){return document.getElementById(id).value.trim();}
              function calc(){
                const out=document.getElementById('g11c8t3Out');
                const rS=raw('g11c8t3r'),cS=raw('g11c8t3c'),dS=raw('g11c8t3d');
                const isQ=s=>s==='?'||s==='';
                const vals=[rS,cS,dS];
                const unknownCount=vals.filter(isQ).length;
                if(unknownCount!==1){out.innerHTML='<span style="color:#fca5a5;">Voer presies twee waardes in en los die derde as ? .</span>';return;}
                const r=isQ(rS)?NaN:parseFloat(rS), c=isQ(cS)?NaN:parseFloat(cS), d=isQ(dS)?NaN:parseFloat(dS);
                if(isQ(rS)){
                  if(isNaN(c)||isNaN(d)||c<=0||d<0){out.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige positiewe koord en nie-negatiewe afstand in.</span>';return;}
                  const half=c/2, newR=Math.sqrt(d*d+half*half);
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">r² = d² + (c/2)² = '+f(d*d)+' + '+f(half*half)+'</span><br><span style="color:#6ee7b7;">r = '+f(newR)+'</span>';
                } else if(isQ(cS)){
                  if(isNaN(r)||isNaN(d)||r<=0||d<0||d>=r){out.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige radius en afstand in (afstand moet kleiner as die radius wees).</span>';return;}
                  const half=Math.sqrt(r*r-d*d), newC=2*half;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">(c/2)² = r² − d² = '+f(r*r)+' − '+f(d*d)+'</span><br><span style="color:#6ee7b7;">c = '+f(newC)+'</span>';
                } else {
                  if(isNaN(r)||isNaN(c)||r<=0||c<=0||c>2*r){out.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige radius en koord in (koord kan nie langer as die deursnee wees nie).</span>';return;}
                  const half=c/2, newD=Math.sqrt(r*r-half*half);
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">d² = r² − (c/2)² = '+f(r*r)+' − '+f(half*half)+'</span><br><span style="color:#6ee7b7;">d = '+f(newD)+'</span>';
                }
              }
              ['g11c8t3r','g11c8t3c','g11c8t3d'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c8t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Koord met lengte 30 mm is 8 mm vanaf die middelpunt. Die radius is:",
          options: ["17 mm", "34 mm", "23 mm", "15 mm"],
          answer: 0,
          topic: "Koord-, radius- en afstandberekeninge"
        },
        {
          type: "input",
          text: "Radius = 13 cm. 'n Koord is 5 cm vanaf die middelpunt. Bereken die lengte van die koord (cm).",
          answer: "24",
          topic: "Koord-, radius- en afstandberekeninge"
        },
        {
          type: "mc",
          text: "Die loodlyn wat vanaf die middelpunt van 'n sirkel na 'n koord getrek word, doen altyd die volgende:",
          options: ["Halveer die koord", "Verdubbel die koord", "Is gelyk aan die koord", "Halveer die sirkelomtrek slegs as die koord 'n deursnee is"],
          answer: 0,
          topic: "Koord-, radius- en afstandberekeninge"
        },
        {
          type: "input",
          text: "'n Sirkel het radius 10 cm. Bereken die afstand vanaf die middelpunt na 'n koord met lengte 12 cm (tot 1 desimale plek).",
          answer: "8.0",
          altAnswers: ["8"],
          topic: "Koord-, radius- en afstandberekeninge"
        },
        {
          type: "mc",
          text: "Twee gelyke koorde AB en CD lê in dieselfde sirkel. Watter stelling moet waar wees?",
          options: ["Hulle is ewe ver van die middelpunt af", "Hulle sny binne die sirkel", "Hulle onderspan verskillende hoeke by die middelpunt", "Een moet 'n deursnee wees"],
          answer: 0,
          topic: "Koord-, radius- en afstandberekeninge"
        },
        {
          type: "input",
          text: "Twee parallelle koorde AB = 16 cm en CD = 12 cm lê aan dieselfde kant van middelpunt O van 'n sirkel met radius 10 cm. Bereken die afstand tussen die twee koorde.",
          answer: "2",
          topic: "Koord-, radius- en afstandberekeninge"
        },
        {
          type: "input",
          text: "'n Sirkelvormige dam het deursnee 34 m. 'n Reguit houtbrug (a koord) kruis die dam met sy twee uiteindes 30 m uitmekaar. Bereken die loodregte afstand vanaf die middelpunt van die dam na die brug, in meter.",
          answer: "8",
          topic: "Koord-, radius- en afstandberekeninge"
        }
      ]
    },
    {
      id: 803,
      chapter: 8,
      name: "Sirkelmeetkunde-vraagstukke",
      fullName: "Die oplos van multi-stap vraagstukke wat verskeie sirkelstellings kombineer, en die skryf van formele bewyse",
      lesson: {
        heading: "Sirkelmeetkunde-vraagstukke oplos",
        sub: "Hoofstuk 8 · Onderwerp 4",
        body: `
          <p>'n <strong>Vraagstuk (rider)</strong> is 'n multi-stap probleem waar jy verskeie sirkelstellings (en soms driehoek-hoekeienskappe) in volgorde moet kombineer om onbekende hoeke te vind of 'n resultaat te bewys. Dit is die kognitiewe vlak wat die meeste in Graad 11- en 12-eksamens getoets word.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Strategie vir vraagstukke</div>
            <p>
              1. Merk alle gegewe inligting op die diagram (gelyke hoeke, gelyke lengtes, regte hoeke, ewewydige lyne).<br>
              2. Soek na: gelykbenige driehoeke (twee radiusse), koordevierhoeke, raaklyn-koordhoeke, en hoeke in dieselfde segment.<br>
              3. Werk van wat jy weet na wat jy nodig het toe — skryf 'n rede na elke stelling (bv. "∠e in dieselfde segment", "opp ∠e koordevierhoek", "raaklyn ⊥ radius", "buite-∠ van koordevierhoek").<br>
              4. Ketting klein afleidings aanmekaar — vraagstukke word selde in een stap opgelos.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Stellings aanmekaarketting</div>
            <p>O is die middelpunt van sirkel ABC. Ô₁ = 2x (middelpuntshoek op boog AB). MPT is 'n raaklyn by P.<br>
            ∠ by omtrek op boog AB = x (middelpuntshoek = 2 × omtrekshoek).<br>
            As ABPT 'n koordevierhoek is en ∠BAT die raaklyn-koordhoek by P is, gelyk aan die ingeskrewe hoek in die tussensegment, gee verdere hoekjagtery elke ander gemerkte hoek in terme van x.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Algemene "gee-weg"-tekens vir vraagstukke</div>
            <p>
              • Twee radiusse na dieselfde koord getrek → gelykbenige driehoek, basishoeke gelyk.<br>
              • 'n Raaklyn en 'n radius wat ontmoet → 90°-hoek om in 'n reghoekige driehoek te gebruik.<br>
              • 'n Koordevierhoek wat binne 'n groter diagram versteek is → supplementêre opponerende hoeke.<br>
              • Twee koorde/raaklyne vanaf 'n buitepunt → gelyke lengtes of gelyke raaklyn-koordhoeke.
            </p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Gee altyd die rede in die standaard verkorte vorm wat jou onderwyser/nasiener verwag — 'n korrekte hoek sonder 'n rede verloor gewoonlik punte.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Hoekjagtery-vraagstuk-deurloop</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die middelpuntshoek Ô in (in terme van 'n veranderlike x, as 'n aantal grade per eenheid x) om 'n volledige gekettingde vraagstuk stap-vir-stap opgelos te sien.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x (°)</div><input id="g11c8t4x" type="number" value="35" min="1" max="89" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c8t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Jag hoeke</button>
            </div>
            <div id="g11c8t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const x=gv('g11c8t4x');
                const out=document.getElementById('g11c8t4Out');
                if(isNaN(x)||x<=0||x>=90){out.innerHTML='<span style="color:#fca5a5;">Voer x streng tussen 0° en 90° in.</span>';return;}
                const central=2*x;
                const cyclicOpp=180-central;
                const extAngle=central;
                let html='<span style="color:rgba(221,225,240,0.50);">Stap 1: ∠ by omtrek = x = '+x+'° (gegee)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Stap 2: middelpunts-∠O = 2 × x = '+central+'° (∠ by middelpunt = 2 × ∠ by omtrek)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Stap 3: as hierdie middelpuntshoek binne \'n koordevierhoek-tipe figuur ABPO lê, is die opponerende ∠ = 180° − '+central+'° = '+cyclicOpp+'° (opp ∠e koordevierhoek)</span><br>';
                html+='<span style="color:#6ee7b7;">Stap 4: buitehoek by die aangrensende hoekpunt = '+extAngle+'° (buite-∠ koordevierhoek = binne-opp ∠)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.45);font-size:12px;">Dit weerspieël die ketting van redenasie wat in multi-stap vraagstukke gebruik word — elke nuwe hoek hang af van die een voor dit.</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c8t4x').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c8t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In 'n vraagstuk word twee radiusse OA en OB na koord AB getrek. Driehoek OAB is:",
          options: ["Gelykbenig (OA = OB, albei radiusse)", "Altyd gelyksydig", "Altyd reghoekig by O", "Skalene"],
          answer: 0,
          topic: "Sirkelmeetkunde-vraagstukke"
        },
        {
          type: "mc",
          text: "O is die middelpunt, Ô = 2x. Die ingeskrewe hoek op dieselfde boog, by die omtrek, is gelyk aan:",
          options: ["x", "2x", "180 − 2x", "90 − x"],
          answer: 0,
          topic: "Sirkelmeetkunde-vraagstukke"
        },
        {
          type: "input",
          text: "ABCD is 'n koordevierhoek met ∠A = 3y en ∠C = 2y + 30°. Los op vir y.",
          answer: "30",
          topic: "Sirkelmeetkunde-vraagstukke"
        },
        {
          type: "mc",
          text: "Die korrekte rede om te gee vir 'opponerende hoeke van 'n koordevierhoek is supplementêr' in 'n bewys, is:",
          options: ["opp ∠e koordevierhoek", "∠e in dieselfde segment", "raaklyn ⊥ radius", "buite-∠ van driehoek"],
          answer: 0,
          topic: "Sirkelmeetkunde-vraagstukke"
        },
        {
          type: "mc",
          text: "PT is 'n raaklyn by T, en TA is 'n koord. As die raaklyn-koordhoek by T 48° is, is die ingeskrewe hoek in die tussensegment:",
          options: ["48°", "96°", "132°", "42°"],
          answer: 0,
          topic: "Sirkelmeetkunde-vraagstukke"
        },
        {
          type: "input",
          text: "In 'n vraagstuk is ∠BAC = 40° (hoek by omtrek op boog BC) en ∠ACD = 25° (hoek by omtrek op boog AD, met ABCD 'n koordevierhoek en diagonale wat binne ontmoet). Gebruik die buitehoek van die driehoek wat deur die diagonale gevorm word om die hoek tussen koorde AC en BD te bereken, aan die kant wat ∠BAC en ∠ACD bevat (d.w.s. die buitehoek van die gevormde driehoek).",
          answer: "65",
          topic: "Sirkelmeetkunde-vraagstukke"
        },
        {
          type: "input",
          text: "PQ is 'n deursnee van 'n sirkel met middelpunt O, en R is 'n punt op die sirkel sodat PR = RQ. As ∠RPQ = 2y, bepaal die waarde van y. (Wenk: kombineer die halfsirkelstelling met die gelykbenige driehoek PRQ.)",
          answer: "22.5",
          altAnswers: ["22,5"],
          topic: "Sirkelmeetkunde-vraagstukke"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 8-werkboek — Euklidiese Meetkunde (Sirkelmeetkunde)",
    questions: [
      {
        number: 1,
        text: "O is die middelpunt van die sirkel. A, B, C, D is punte op die sirkel. ∠AOB = 136°.",
        parts: [
          { label: "a", text: "Bereken ∠ACB. Gee 'n rede.", marks: 2 },
          { label: "b", text: "As ABCD 'n koordevierhoek is en ∠ABC = 104°, bereken ∠ADC.", marks: 2 },
          { label: "c", text: "Bereken die buitehoek van ABCD by D.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Bewys dat die hoek wat deur 'n deursnee by die omtrek onderspan word, 90° is. (Gebruik die stelling dat die middelpuntshoek dubbel die omtrekshoek is.)",
        parts: [
          { label: "a", text: "Stel die gegewe inligting duidelik.", marks: 1 },
          { label: "b", text: "Skryf die volledige bewys.", marks: 5 }
        ]
      },
      {
        number: 3,
        text: "In die figuur is PT 'n raaklyn aan die sirkel by T, en PQR is 'n sekans. PT = 8 cm en PQ = 4 cm.",
        parts: [
          { label: "a", text: "Gebruik die raaklyn-sekansverwantskap PT² = PQ × PR om PR te bereken.", marks: 3 },
          { label: "b", text: "Bereken QR.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "∠ACB = 68° (∠ by omtrek = ½ middelpunts-∠, dieselfde boog AB)",
        b: "∠ADC = 180° − 104° = 76° (opp ∠e van koordevierhoek)",
        c: "Buite-∠ by D = binne-opponerende ∠ = ∠ABC = 104°"
      },
      2: {
        a: "Gegee: AB is 'n deursnee; C is enige punt op die sirkel (op die groter boog); O is die middelpunt",
        b: "∠AOB = 180° (AB is 'n deursnee, 'n reguit lyn); ∠ACB = ½∠AOB = ½(180°) = 90° (∠ by omtrek = ½ middelpunts-∠)"
      },
      3: {
        a: "8² = 4 × PR → PR = 64/4 = 16 cm",
        b: "QR = PR − PQ = 16 − 4 = 12 cm"
      }
    }
  }
});
