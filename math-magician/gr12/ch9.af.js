// Math Magician — Graad 12, Hoofstuk 9
// Statistiek — Regressie en Korrelasie

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 900,
      chapter: 9,
      name: "Spreidingsdiagramme & regressie",
      fullName: "Spreidingsdiagramme, lyn van beste passing, en kleinste-kwadrate-regressie",
      lesson: {
        heading: "Spreidingsdiagramme en regressie",
        sub: "Hoofstuk 9 · Onderwerp 1",
        body: `
          <p>Graad 12-statistiek stel <strong>bivariaat-data</strong> bekend — die bestudering van die verwantskap tussen twee veranderlikes.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Spreidingsdiagramme</div>
            <p>
              'n <strong>Spreidingsdiagram</strong> vertoon pare data (x, y) as punte op 'n Cartesiese vlak.<br>
              Word gebruik om visueel te bepaal of 'n verwantskap (korrelasie) tussen x en y bestaan.<br><br>
              Patrone om na te kyk:<br>
              • Punte styg van links na regs → positiewe korrelasie<br>
              • Punte val van links na regs → negatiewe korrelasie<br>
              • Geen patroon nie → geen korrelasie nie
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Lyn van beste passing (regressielyn)</div>
            <p>
              Die <strong>kleinste-kwadrate-regressielyn</strong> (ŷ = a + bx) minimeer die som van gekwadreerde vertikale afstande van datapunte na die lyn.<br><br>
              Formules (mag sakrekenaar gebruik in eksamen):<br>
              <span class="math">b = (nΣxy − ΣxΣy) / (nΣx² − (Σx)²)</span><br>
              <span class="math">a = ȳ − bx̄</span><br><br>
              Die lyn gaan altyd deur die <strong>gemiddelde punt (x̄, ȳ)</strong>.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Gebruik van die regressielyn</div>
            <p>
              <strong>Interpolasie:</strong> voorspel y vir 'n x binne die databereik (betroubaar)<br>
              <strong>Ekstrapolasie:</strong> voorspel y vir 'n x buite die databereik (onbetroubaar)<br><br>
              Gee altyd aan of 'n voorspelling 'n interpolasie of ekstrapolasie is.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Regressielyn-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer gepaarde data in (x en y kommageskei) — bereken ŷ = a + bx, r, en maak voorspellings.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:8px;">
              <div style="flex:1;min-width:200px;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x-waardes (kommageskei)</div><input id="g12c9xv" type="text" value="2,3,4,5,6,8" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;"></div>
              <div style="flex:1;min-width:200px;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y-waardes (kommageskei)</div><input id="g12c9yv" type="text" value="45,52,58,65,70,82" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;"></div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Voorspel by x=</div><input id="g12c9xp" type="number" value="7" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c9Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g12c9Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const xraw=document.getElementById('g12c9xv').value,yraw=document.getElementById('g12c9yv').value;
                const xs=xraw.split(',').map(s=>parseFloat(s.trim())),ys=yraw.split(',').map(s=>parseFloat(s.trim()));
                const out=document.getElementById('g12c9Out');
                if(xs.some(isNaN)||ys.some(isNaN)||xs.length<2||xs.length!==ys.length){out.innerHTML='<span style="color:#fca5a5;">Voer gelyklengte numeriese x- en y-lyste in (min. 2).</span>';return;}
                const n=xs.length;
                const sx=xs.reduce((a,b)=>a+b,0),sy=ys.reduce((a,b)=>a+b,0);
                const sxy=xs.reduce((a,x,i)=>a+x*ys[i],0);
                const sx2=xs.reduce((a,x)=>a+x*x,0);
                const sy2=ys.reduce((a,y)=>a+y*y,0);
                const b=(n*sxy-sx*sy)/(n*sx2-sx*sx);
                const xbar=sx/n,ybar=sy/n;
                const a=ybar-b*xbar;
                const r=(n*sxy-sx*sy)/Math.sqrt((n*sx2-sx*sx)*(n*sy2-sy*sy));
                const xp=parseFloat(document.getElementById('g12c9xp').value);
                const xmin=Math.min(...xs),xmax=Math.max(...xs);
                const pred=a+b*xp;
                const strength=Math.abs(r)>=0.8?'sterk':Math.abs(r)>=0.5?'matige':'swak';
                const dir=r>=0?'positiewe':'negatiewe';
                let html='<span style="color:rgba(221,225,240,0.50);">n='+n+'  x̄='+f(xbar)+'  ȳ='+f(ybar)+'</span><br>';
                html+='<span style="color:#6ee7b7;">ŷ = '+f(a)+' + '+f(b)+'x</span><br>';
                html+='<span style="color:#fcd34d;">r = '+f(r)+'  ('+strength+' '+dir+' korrelasie)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">r² = '+f(r*r)+' → '+f(r*r*100)+'% van variasie in y verklaar deur x</span>';
                if(!isNaN(xp)){
                  const interp=xp>=xmin&&xp<=xmax;
                  html+='<br><span style="color:#6ee7b7;">ŷ('+xp+') = '+f(pred)+'  ['+(interp?'interpolasie':'ekstrapolasie — minder betroubaar')+']</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g12c9Btn').addEventListener('click',calc);
              ['g12c9xp'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "'n Spreidingsdiagram wys punte wat van links na regs val. Die korrelasie is:", options: ["Positief", "Negatief", "Nul", "Kan nie bepaal word nie"], answer: 1, topic: "Spreidingsdiagramme & regressie" },
        { type: "mc", text: "Die regressielyn gaan altyd deur:", options: ["Die oorsprong", "Die mediaanpunt", "Die gemiddelde punt (x̄, ȳ)", "Die punt (0, a)"], answer: 2, topic: "Spreidingsdiagramme & regressie" },
        { type: "mc", text: "Om y te voorspel vir x = 50 wanneer data wissel van x = 10 tot 40 is:", options: ["Interpolasie", "Ekstrapolasie", "Korrelasie", "Regressie"], answer: 1, topic: "Spreidingsdiagramme & regressie" },
        { type: "input", text: "Regressielyn: ŷ = 3.2 + 1.5x. Voorspel y wanneer x = 4.", answer: "9.2", altAnswers: ["9,2"], topic: "Spreidingsdiagramme & regressie" },
        { type: "mc", text: "Die kleinste-kwadrate-lyn minimeer:", options: ["Die som van residue", "Die som van gekwadreerde residue", "Die produk van x en y", "Die variasiewydte van y"], answer: 1, topic: "Spreidingsdiagramme & regressie" },
        { type: "input", text: "'n Datastel van 5 punte het: Σx = 20, Σy = 50, Σxy = 220, Σx² = 90, n = 5. Bereken die gradiënt b van die kleinste-kwadrate-regressielyn.", answer: "2", topic: "Spreidingsdiagramme & regressie" },
        { type: "mc", text: "Die regressielyn vir 'n datastel is ŷ = 12 + 2.5x, gebaseer op data met x tussen 3 en 15. 'n Voorspelde waarde van 57 is van hierdie lyn afgelees. Watter x-waarde is gebruik, en is hierdie voorspelling 'n interpolasie of ekstrapolasie?", options: ["x = 18; ekstrapolasie (18 is buite die databereik)", "x = 18; interpolasie (18 is binne die databereik)", "x = 22.8; ekstrapolasie", "x = 8; interpolasie"], answer: 0, topic: "Spreidingsdiagramme & regressie" }
      ]
    },
    {
      id: 901,
      chapter: 9,
      name: "Korrelasiekoëffisiënt",
      fullName: "Pearson se korrelasiekoëffisiënt en die interpretasie van die sterkte van korrelasie",
      lesson: {
        heading: "Korrelasiekoëffisiënt",
        sub: "Hoofstuk 9 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Pearson se korrelasiekoëffisiënt (r)</div>
            <p>
              Die <strong>korrelasiekoëffisiënt r</strong> meet die sterkte en rigting van die lineêre verwantskap tussen x en y.<br><br>
              <span class="math">−1 ≤ r ≤ 1</span><br><br>
              Interpretasie:<br>
              r = 1: volmaakte positiewe lineêre korrelasie<br>
              r = −1: volmaakte negatiewe lineêre korrelasie<br>
              r = 0: geen lineêre korrelasie nie<br>
              0.8 ≤ |r| < 1: sterk korrelasie<br>
              0.5 ≤ |r| < 0.8: matige korrelasie<br>
              |r| < 0.5: swak korrelasie
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Belangrike onderskeidings</div>
            <p>
              <strong>Korrelasie ≠ Kousaliteit</strong><br>
              'n Hoë r-waarde beteken die veranderlikes is lineêr verwant, maar bewys NIE dat die een die ander veroorsaak nie. Daar mag 'n steurende veranderlike wees.<br><br>
              Voorbeeld: Roomysverkope en verdrinkingsyfers styg albei in die somer → gekorreleer, maar roomys veroorsaak nie verdrinking nie.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 r² (bepalingskoëffisiënt)</div>
            <p>
              <span class="math">r²</span> vertel ons die proporsie van variasie in y wat deur x verklaar word.<br>
              Bv. r = 0.9 → r² = 0.81 → 81% van variasie in y word verklaar deur die lineêre verwantskap met x.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Korrelasiekoëffisiënt-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer gepaarde x- en y-waardes in om r en r² te bereken, met interpretasie.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:200px;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x-waardes (kommageskei)</div><input id="g12c9t2x" type="text" value="1,2,3,4,5" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;"></div>
              <div style="flex:1;min-width:200px;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y-waardes (kommageskei)</div><input id="g12c9t2y" type="text" value="2,4,5,4,5" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;"></div>
            </div>
            <button id="g12c9t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Bereken r</button>
            <div id="g12c9t2Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n,d=4){return parseFloat(n.toFixed(d));}
              function calc(){
                const xs=document.getElementById('g12c9t2x').value.split(',').map(s=>parseFloat(s.trim()));
                const ys=document.getElementById('g12c9t2y').value.split(',').map(s=>parseFloat(s.trim()));
                const out=document.getElementById('g12c9t2Out');
                if(xs.some(isNaN)||ys.some(isNaN)||xs.length<2||xs.length!==ys.length){out.innerHTML='<span style="color:#fca5a5;">Voer gelyklengte numeriese x- en y-lyste in (min. 2).</span>';return;}
                const n=xs.length;
                const sx=xs.reduce((a,b)=>a+b,0),sy=ys.reduce((a,b)=>a+b,0);
                const sxy=xs.reduce((a,x,i)=>a+x*ys[i],0);
                const sx2=xs.reduce((a,x)=>a+x*x,0),sy2=ys.reduce((a,y)=>a+y*y,0);
                const num=n*sxy-sx*sy;
                const den=Math.sqrt((n*sx2-sx*sx)*(n*sy2-sy*sy));
                if(den===0){out.innerHTML='<span style="color:#fca5a5;">Kan nie r bereken nie — een van die datastelle het nul-variansie.</span>';return;}
                const r=num/den;
                const r2=r*r;
                const strength=Math.abs(r)>=0.8?'sterk':Math.abs(r)>=0.5?'matige':'swak';
                const dir=r>0?'positiewe':r<0?'negatiewe':'geen';
                let html='<span style="color:#6ee7b7;">r = '+f(r)+'</span>';
                html+='<span style="color:rgba(221,225,240,0.50);"> → '+strength+' '+dir+' lineêre korrelasie</span><br>';
                html+='<span style="color:#fcd34d;">r² = '+f(r2)+' → '+f(r2*100,2)+'% van variasie in y word deur x verklaar</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">⚠ Korrelasie ≠ kousaliteit. \\'n Hoë |r| beteken nie dat x veroorsaak y nie.</span>';
                out.innerHTML=html;
              }
              document.getElementById('g12c9t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "r = −0.92 dui op:", options: ["Swak negatiewe korrelasie", "Sterk positiewe korrelasie", "Sterk negatiewe korrelasie", "Geen korrelasie nie"], answer: 2, topic: "Korrelasiekoëffisiënt" },
        { type: "mc", text: "r = 0.6 beteken watter persentasie van variasie in y deur x verklaar word?", options: ["60%", "36%", "0.6%", "6%"], answer: 1, topic: "Korrelasiekoëffisiënt" },
        { type: "mc", text: "Watter r-waarde wys die swakste korrelasie?", options: ["r = 0.9", "r = −0.85", "r = 0.3", "r = −0.95"], answer: 2, topic: "Korrelasiekoëffisiënt" },
        { type: "mc", text: "'n Studie vind r = 0.88 tussen ure studeer en toetstellings. Dit beteken:", options: ["Studeer veroorsaak goeie tellings", "Sterk positiewe lineêre assosiasie tussen die veranderlikes", "Meer studeer lei altyd tot beter tellings", "Die verwantskap is presies lineêr"], answer: 1, topic: "Korrelasiekoëffisiënt" },
        { type: "input", text: "r = 0.75. Bepaal r² as 'n persentasie (%).", answer: "56.25", altAnswers: ["56,25"], topic: "Korrelasiekoëffisiënt" },
        { type: "input", text: "Vir 'n datastel: n = 5, Σx = 20, Σy = 50, Σxy = 220, Σx² = 90, Σy² = 560. Bereken die korrelasiekoëffisiënt r, tot 2 desimale plekke.", answer: "0.82", altAnswers: ["0,82"], topic: "Korrelasiekoëffisiënt" },
        { type: "mc", text: "As 'n konstante bedrag by elke y-waarde in 'n datastel getel word (bv. 10 punte by elke toetstelling getel), doen die korrelasiekoëffisiënt r tussen x en y die volgende:", options: ["Neem toe", "Neem af", "Bly presies dieselfde", "Word onbepaald"], answer: 2, topic: "Korrelasiekoëffisiënt" }
      ]
    },
    {
      id: 902,
      chapter: 9,
      name: "Simmetriese & skewe data",
      fullName: "Hersiening van simmetriese en skewe verdelings, en die lees van skeefheid uit opsommende statistieke of 'n grafiek",
      lesson: {
        heading: "Simmetriese en skewe data",
        sub: "Hoofstuk 9 · Onderwerp 3",
        body: `
          <p>Voordat bivariaat-data ontleed word, vereis CAPS dat jy hersien hoe die <strong>vorm</strong> van 'n enkelveranderlike (univariaat) verdeling beskryf word — simmetries of skeef.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Simmetriese verdelings</div>
            <p>
              'n Verdeling is <strong>simmetries</strong> as sy linker- en regterhelftes spieëlbeelde is.<br>
              Vir simmetriese data: <span class="math">gemiddelde ≈ mediaan ≈ modus</span><br>
              Die boks-en-snor-diagram het snorre van ongeveer gelyke lengte, en die boks is gesentreer.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Skewe verdelings</div>
            <p>
              <strong>Positief skeef (regs-skeef):</strong> 'n lang stert aan die regterkant.<br>
              <span class="math">gemiddelde &gt; mediaan &gt; modus</span> — die gemiddelde word na die stert toe getrek deur uiterste hoë waardes.<br><br>
              <strong>Negatief skeef (links-skeef):</strong> 'n lang stert aan die linkerkant.<br>
              <span class="math">gemiddelde &lt; mediaan &lt; modus</span> — die gemiddelde word afgetrek deur uiterste lae waardes.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>'n Klastoets het gemiddelde = 58, mediaan = 65, modus = 70.<br>
            Aangesien gemiddelde &lt; mediaan &lt; modus, is die data <strong>negatief (links) skeef</strong> — 'n paar baie lae punte trek die gemiddelde af.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Lees skeefheid van 'n boksplot</div>
            <p>
              As die snor/boks aan die LINKERKANT van die mediaan langer is → negatief skeef (links-skeef).<br>
              As die snor/boks aan die REGTERKANT van die mediaan langer is → positief skeef (regs-skeef).<br>
              Gelyke boks-/snorlengtes aan beide kante → simmetries.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Skeefheidsidentifiseerder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die gemiddelde, mediaan en modus van 'n datastel in — identifiseer die tipe skeefheid.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gemiddelde</div><input id="g12c9t3mean" type="number" value="58" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Mediaan</div><input id="g12c9t3med" type="number" value="65" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Modus</div><input id="g12c9t3mode" type="number" value="70" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c9t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Identifiseer vorm</button>
            </div>
            <div id="g12c9t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const mean=gv('g12c9t3mean'),med=gv('g12c9t3med'),mode=gv('g12c9t3mode');
                const out=document.getElementById('g12c9t3Out');
                if([mean,med,mode].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer gemiddelde, mediaan en modus in.</span>';return;}
                let shape,color;
                if(Math.abs(mean-med)<0.001&&Math.abs(med-mode)<0.001){shape='Simmetries (gemiddelde ≈ mediaan ≈ modus)';color='#6ee7b7';}
                else if(mean>med&&med>mode){shape='Positief skeef (regs-skeef) — stert na regs, gemiddelde &gt; mediaan &gt; modus';color='#fcd34d';}
                else if(mean<med&&med<mode){shape='Negatief skeef (links-skeef) — stert na links, gemiddelde &lt; mediaan &lt; modus';color='#fcd34d';}
                else {shape='Gemengde patroon — nie \\'n netjiese handboek-skeefheid nie, maar vergelyk gemiddelde met mediaan om die rigting te bepaal';color='rgba(221,225,240,0.70);'}
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Gemiddelde='+mean+'  Mediaan='+med+'  Modus='+mode+'</span><br><span style="color:'+color+';">'+shape+'</span>';
              }
              ['g12c9t3mean','g12c9t3med','g12c9t3mode'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c9t3Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "'n Datastel het gemiddelde = 72, mediaan = 68, modus = 65. Die data is:", options: ["Simmetries", "Positief skeef", "Negatief skeef", "Kan nie bepaal word nie"], answer: 1, topic: "Simmetriese & skewe data" },
        { type: "mc", text: "In 'n simmetriese verdeling verwag ons:", options: ["Gemiddelde ver van mediaan", "Gemiddelde ≈ mediaan ≈ modus", "Modus &gt; gemiddelde altyd", "Geen modus bestaan nie"], answer: 1, topic: "Simmetriese & skewe data" },
        { type: "mc", text: "Op 'n boks-en-snor-diagram dui 'n lang snor links van die mediaan op:", options: ["Positiewe skeefheid", "Negatiewe skeefheid", "Simmetrie", "'n Fout in die data"], answer: 1, topic: "Simmetriese & skewe data" },
        { type: "input", text: "'n Verdeling het gemiddelde = 40, mediaan = 40, modus = 40. Hoeveel van die drie maatstawwe is gelyk (as 'n getal)?", answer: "3", topic: "Simmetriese & skewe data" },
        { type: "mc", text: "Salarisdata vir 'n maatskappy is gewoonlik sterk positief skeef. Dit beteken:", options: ["Die meeste salarisse is hoog, met 'n paar baie laag", "Die meeste salarisse is laag tot matig, met 'n paar baie hoog wat die gemiddelde optrek", "Alle salarisse is dieselfde", "Die mediaan is groter as die gemiddelde"], answer: 1, topic: "Simmetriese & skewe data" },
        { type: "mc", text: "'n Datastel het mediaan = 50 en modus = 58. Die verdeling is bekend om negatief skeef te wees. Watter een van die volgende is 'n aanneemlike waarde vir die gemiddelde?", options: ["45", "50", "55", "60"], answer: 0, topic: "Simmetriese & skewe data" },
        { type: "mc", text: "'n Boksplot het: Minimum = 10, Q1 = 42, Mediaan = 48, Q3 = 50, Maksimum = 52. Beskryf die skeefheid van die verdeling.", options: ["Positief skeef", "Negatief skeef", "Simmetries", "Kan nie uit hierdie data bepaal word nie"], answer: 1, topic: "Simmetriese & skewe data" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 9 Werkboek — Statistiek",
    questions: [
      { number: 1, text: "Die tabel wys die aantal ure oefening (x) en eksamentellings (y) vir 6 studente:", parts: [
        { label: "", text: "| x | 2 | 3 | 4 | 5 | 6 | 8 |\n| y | 45 | 52 | 58 | 65 | 70 | 82 |", marks: 0 },
        { label: "a", text: "Teken die spreidingsdiagram.", marks: 3 },
        { label: "b", text: "Bereken x̄ en ȳ.", marks: 2 },
        { label: "c", text: "Gebruik jou sakrekenaar om die vergelyking van die kleinste-kwadrate-regressielyn te vind.", marks: 3 },
        { label: "d", text: "Bepaal die korrelasiekoëffisiënt r en kommentarieer op die sterkte van die verwantskap.", marks: 2 },
        { label: "e", text: "Voorspel die telling vir 'n student wat 7 ure oefen. Is dit interpolasie of ekstrapolasie?", marks: 2 }
      ]},
      { number: 2, text: "'n Navorser beweer dat skoengrootte en IK gekorreleer is (r = 0.72 in 'n studie van kinders tussen 5 en 15 jaar oud).", parts: [
        { label: "a", text: "Wat dui r = 0.72 aan oor die verwantskap?", marks: 2 },
        { label: "b", text: "Stel 'n steurende veranderlike voor wat hierdie korrelasie kan verklaar.", marks: 2 },
        { label: "c", text: "Waarom is dit verkeerd om af te lei dat groter voete hoër IK veroorsaak?", marks: 2 }
      ]},
      { number: 3, text: "Die vyfgetalopsomming vir 'n klas se toetstellings (uit 65) is: Minimum = 32, Q1 = 45, Mediaan = 58, Q3 = 62, Maksimum = 65. Die gemiddelde van die datastel is 50.", parts: [
        { label: "a", text: "Bereken die lengte van die onderste snor (Minimum tot Q1) en die boonste snor (Q3 tot Maksimum).", marks: 2 },
        { label: "b", text: "Vergelyk die lengte van die boks aan elke kant van die mediaan (Q1 tot Mediaan teenoor Mediaan tot Q3).", marks: 2 },
        { label: "c", text: "Beskryf dus die skeefheid van die verdeling.", marks: 2 },
        { label: "d", text: "Ondersteun die gegewe gemiddelde van 50 jou antwoord in (c)? Verduidelik deur die gemiddelde en mediaan te vergelyk.", marks: 2 }
      ]}
    ],
    answers: {
      1: { a: "Punte korrek geteken", b: "x̄=28/6≈4.67; ȳ=372/6=62", c: "Gebruik sakrekenaar: ŷ ≈ 33.4 + 6.13x", d: "r≈0.999 (baie sterk positiewe lineêre korrelasie)", e: "ŷ ≈ 33.4 + 6.13(7) ≈ 33.4 + 42.9 ≈ 76.3; interpolasie (7 is binne bereik 2–8)" },
      2: { a: "Matige tot sterk positiewe lineêre assosiasie", b: "Ouderdom — ouer kinders het beide groter voete en hoër IK weens ontwikkeling", c: "Korrelasie impliseer nie kousaliteit nie — 'n derde veranderlike (ouderdom) dryf albei" },
      3: { a: "Onderste snor = 45−32 = 13; Boonste snor = 65−62 = 3 — die onderste snor is baie langer", b: "Q1 tot Mediaan = 58−45 = 13; Mediaan tot Q3 = 62−58 = 4 — die onderste helfte van die boks is ook langer", c: "Beide die snor en boks is langer aan die onderste (linker-) kant, dus is die verdeling negatief skeef (links-skeef) — 'n stert van lae tellings", d: "Ja: gemiddelde (50) < mediaan (58), wat ooreenstem met die verwagte volgorde gemiddelde < mediaan vir 'n negatief skewe verdeling, wat die skeefheid bevestig" }
    }
  }
});
