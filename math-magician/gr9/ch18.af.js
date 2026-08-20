// Math Magician — Grade 9, Chapter 18 data (Afrikaans)
// Datahantering

MathMagician.registerChapter(18, {
  topics: [
    {
      id: 35,
      chapter: 18,
      name: "Insamel, orden en opsom van data",
      fullName: "Insameling, ordening en opsomming van data",
      lesson: {
        heading: "Insameling, ordening en opsomming van data",
        sub: "Hoofstuk 18 · Onderwerp 1",
        body: `
          <p>Graad 9 bou voort op Graad 8 se datahanteringsvaardighede, met 'n groter fokus op die keuse van gepaste metodes vir die tipe data en die bevraagtekening van hoe betroubaar die databron is.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelwoordeskat (herhaling en uitbreiding)</div>
            <p>
              <strong>Populasie:</strong> die hele groep wat bestudeer word. <strong>Steekproef:</strong> 'n kleiner groep wat gebruik word om die populasie te verteenwoordig.<br>
              <strong>Kategoriese data:</strong> nie-numeries (bv. gunsteling-vak). <strong>Numeriese data:</strong> diskreet (telbaar) of kontinu (gemeet).<br><br>
              <strong>Steekproefmetodes:</strong><br>
              &nbsp;&nbsp;• <strong>Ewekansige steekproef:</strong> elke lid het 'n gelyke kans om gekies te word.<br>
              &nbsp;&nbsp;• <strong>Sistematiese steekproef:</strong> gekies met vaste tussenposes (bv. elke 10de leerder).<br>
              &nbsp;&nbsp;• <strong>Gerieflikheidsteekproef:</strong> wie ook al die maklikste bereikbaar is — dikwels bevooroordeeld.<br><br>
              <strong>Opsommingsmetodes:</strong> telkaart, frekwensietabel, gegroepeerde frekwensietabel (klasintervalle vir kontinue data of data met 'n wye reeks).
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Maatstawwe van sentrale neiging en verspreiding</div>
            <p>
              <strong>Gemiddelde:</strong> <span class="math">x̄ = Σx ÷ n</span> &nbsp; <strong>Mediaan:</strong> die middelste waarde van gesorteerde data &nbsp; <strong>Modus:</strong> die waarde wat die meeste voorkom<br>
              <strong>Variasiewydte:</strong> maks − min<br><br>
              <strong>Gemiddelde van gegroepeerde data (skatting):</strong> gebruik die <em>middelpunt</em> van elke klasinterval, vermenigvuldig met die frekwensie, tel op, en deel dan deur die totale frekwensie.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Skatting van die gemiddelde van gegroepeerde data</div>
            <div class="example-step"><span class="step-num">1</span><span>Klas 0–10 (f=4, middelpunt=5); 10–20 (f=6, middelpunt=15); 20–30 (f=10, middelpunt=25)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Σ(f × middelpunt) = 4(5) + 6(15) + 10(25) = 20 + 90 + 250 = 360</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Totale frekwensie = 4+6+10 = 20</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Geskatte gemiddelde = <span class="math">360 ÷ 20 = 18</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Gemiddelde-skatter vir gegroepeerde data</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer klasmiddelpunte en frekwensies in (kommageskei, in ooreenstemmende volgorde) om die gemiddelde te skat.</p>
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Middelpunte</label>
                <input id="gdMid" type="text" value="5,15,25" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Frekwensies</label>
                <input id="gdFreq" type="text" value="4,6,10" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <button id="gdCalc" style="align-self:flex-start;padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Skat gemiddelde</button>
            </div>
            <div id="gdOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const mids = document.getElementById('gdMid').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              const freqs = document.getElementById('gdFreq').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              const out = document.getElementById('gdOut');
              if(!mids.length || mids.length !== freqs.length){
                out.innerHTML = '<span style="color:#fca5a5;">Voer dieselfde aantal middelpunte en frekwensies in.</span>';
                return;
              }
              let sumFX = 0, sumF = 0, rows = '';
              mids.forEach((m,i) => {
                const f = freqs[i];
                sumFX += m*f; sumF += f;
                rows += '<div><span style="color:rgba(221,225,240,0.45);">Middelpunt '+m+' × f='+f+' = </span><span style="color:#a5b4fc;">'+(m*f)+'</span></div>';
              });
              out.innerHTML = rows +
                '<div style="margin-top:6px;"><span style="color:rgba(221,225,240,0.45);">Σ(f×middelpunt) = </span><span style="color:#fbbf24;">'+sumFX+'</span></div>' +
                '<div><span style="color:rgba(221,225,240,0.45);">Σf = </span><span style="color:#fbbf24;">'+sumF+'</span></div>' +
                '<div><span style="color:rgba(221,225,240,0.45);">Geskatte gemiddelde = </span><span style="color:#6ee7b7;font-weight:700;">'+(sumFX/sumF).toFixed(2)+'</span></div>';
            }
            document.getElementById('gdCalc').addEventListener('click', calc);
            calc();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir gegroepeerde data is die gemiddelde net 'n <strong>skatting</strong> — jy ken nie die presiese waardes binne elke klas nie, slegs die middelpunt wat as plaasvervanger gebruik word.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Om opname-respondente te kies deur elke 8ste naam op 'n register te kies, is 'n voorbeeld van:", options: ["Gerieflikheidsteekproefneming", "Sistematiese steekproefneming", "Ewekansige steekproefneming", "Bevooroordeelde steekproefneming"], answer: 1, topic: "Data" },
        { type: "mc", text: "Om slegs vriende buite die skoolhek te ondervra oor 'n skoolwye kwessie is 'n voorbeeld van:", options: ["Ewekansige steekproefneming", "Sistematiese steekproefneming", "Gerieflikheidsteekproefneming (waarskynlik bevooroordeeld)", "'n Sensus"], answer: 2, topic: "Data" },
        { type: "input", text: "Klasintervalle 0-10 (f=5, middelpunt 5) en 10-20 (f=5, middelpunt 15). Skat die gemiddelde.", answer: "10", topic: "Data" },
        { type: "mc", text: "'n Gegroepeerde frekwensietabel is die geskikste wanneer:", options: ["Data slegs 3 verskillende waardes het", "Data kategories is", "Data kontinu is en 'n wye reeks dek", "Daar minder as 10 datawaardes is"], answer: 2, topic: "Data" },
        { type: "input", text: "Klasse 0-20 (f=3, middelpunt=10), 20-40 (f=7, middelpunt=30). Skat die gemiddelde (rond af tot 1 desimaal).", answer: "24", topic: "Data" },
      ]
    },
    {
      id: 36,
      chapter: 18,
      name: "Stel data voor",
      fullName: "Voorstelling van data — insluitend histogramme en spreidingsdiagramme",
      lesson: {
        heading: "Voorstelling van data — histogramme en spreidingsdiagramme",
        sub: "Hoofstuk 18 · Onderwerp 2",
        body: `
          <p>Buiten die staafgrafieke, sirkelgrafieke en steel-en-blaar-diagramme van Graad 8, stel Graad 9 twee kragtige nuwe voorstellings bekend: <strong>histogramme</strong> vir gegroepeerde kontinue data, en <strong>spreidingsdiagramme</strong> om verwantskappe tussen twee veranderlikes te ondersoek.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Histogramme</div>
            <p>
              'n <strong>Histogram</strong> vertoon gegroepeerde kontinue data deur middel van aanmekaar-staande stawe — die staafwydte verteenwoordig 'n klasinterval, en daar is geen gapings tussen die stawe nie (anders as 'n staafgrafiek).<br><br>
              <strong>Om een te bou:</strong> kies gelyke klasintervalle, tel die frekwensie in elk, teken stawe met hoogte = frekwensie en wydte = interval.<br>
              'n Hoër staaf beteken meer datawaardes val binne daardie interval.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Spreidingsdiagramme</div>
            <p>
              'n <strong>Spreidingsdiagram</strong> teken pare waardes (x ; y) as punte om te ondersoek of daar 'n verwantskap (korrelasie) tussen twee veranderlikes bestaan.<br><br>
              <strong>Positiewe korrelasie:</strong> soos x toeneem, neig y om ook toe te neem (punte trek opwaarts).<br>
              <strong>Negatiewe korrelasie:</strong> soos x toeneem, neig y om af te neem (punte trek afwaarts).<br>
              <strong>Geen korrelasie nie:</strong> punte is verstrooi sonder 'n duidelike patroon.<br><br>
              'n <strong>Lyn van beste passing</strong> kan deur die middel van die punte getrek word om die neiging te wys — dit hoef nie elke punt te raak nie.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Lees 'n spreidingsdiagram</div>
            <div class="example-step"><span class="step-num">1</span><span>Ure geleer teenoor toetstelling: (1;40), (2;50), (3;58), (4;68), (5;80)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Soos die ure geleer toeneem, styg die telling → <strong>positiewe korrelasie</strong></span></div>
            <div class="example-step"><span class="step-num">3</span><span>'n Lyn van beste passing sou van links na regs opwaarts skuins loop.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Histogram- en spreidingsdiagram-bouer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Wissel modusse: bou 'n histogram vanaf klasfrekwensies, of teken punte om die korrelasie te sien.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <select id="dhMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="hist">Histogram (frekwensies)</option>
                <option value="scatter">Spreidingsdiagram (x,y-pare)</option>
              </select>
              <input id="dhInput" type="text" value="4,7,10,6,3" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="dhBuild" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bou</button>
            </div>
            <svg id="dhSvg" viewBox="0 0 320 180" style="width:100%;max-width:320px;height:180px;border-radius:8px;background:rgba(10,15,30,0.60);margin-bottom:10px;"></svg>
            <div id="dhOut" style="font-size:12px;color:rgba(221,225,240,0.55);"></div>
          </div>
          <script>
          (function(){
            function setPlaceholder(){
              const mode = document.getElementById('dhMode').value;
              document.getElementById('dhInput').value = mode === 'hist' ? '4,7,10,6,3' : '1,40,2,50,3,58,4,68,5,80';
            }
            function build(){
              const mode = document.getElementById('dhMode').value;
              const svg = document.getElementById('dhSvg');
              const out = document.getElementById('dhOut');
              const raw = document.getElementById('dhInput').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              let html = '';
              if(mode === 'hist'){
                if(!raw.length){ out.innerHTML='Voer kommageskeide frekwensies in.'; return; }
                const max = Math.max(...raw);
                const barW = 300/raw.length;
                raw.forEach((f,i) => {
                  const h = (f/max)*140;
                  html += '<rect x="'+(10+i*barW)+'" y="'+(160-h)+'" width="'+(barW-2)+'" height="'+h+'" fill="#6366f1" opacity="0.8"/>';
                  html += '<text x="'+(10+i*barW+barW/2)+'" y="172" font-size="9" fill="rgba(221,225,240,0.55)" text-anchor="middle" font-family="JetBrains Mono,monospace">'+f+'</text>';
                });
                svg.innerHTML = html;
                out.innerHTML = 'Histogram: '+raw.length+' aanmekaar-staande stawe, klasfrekwensies '+raw.join(', ')+'. Totaal = '+raw.reduce((a,b)=>a+b,0)+'.';
              } else {
                if(raw.length < 4 || raw.length % 2 !== 0){ out.innerHTML='Voer x,y-pare in, bv. 1,40,2,50,3,58'; return; }
                const pts = [];
                for(let i=0;i<raw.length;i+=2) pts.push([raw[i],raw[i+1]]);
                const xs = pts.map(p=>p[0]), ys = pts.map(p=>p[1]);
                const minX=Math.min(...xs), maxX=Math.max(...xs), minY=Math.min(...ys), maxY=Math.max(...ys);
                pts.forEach(([x,y]) => {
                  const px = 20 + (maxX===minX?0:(x-minX)/(maxX-minX))*280;
                  const py = 160 - (maxY===minY?0:(y-minY)/(maxY-minY))*140;
                  html += '<circle cx="'+px+'" cy="'+py+'" r="4" fill="#fbbf24"/>';
                });
                svg.innerHTML = html;
                // eenvoudige kontrole vir teken van korrelasie
                const n = pts.length;
                const meanX = xs.reduce((a,b)=>a+b,0)/n, meanY = ys.reduce((a,b)=>a+b,0)/n;
                let cov = 0;
                pts.forEach(([x,y]) => cov += (x-meanX)*(y-meanY));
                const trend = cov > 0 ? 'positiewe korrelasie (opwaartse neiging)' : cov < 0 ? 'negatiewe korrelasie (afwaartse neiging)' : 'geen duidelike korrelasie nie';
                out.innerHTML = pts.length+' punte geteken. Die patroon dui op: <strong style="color:#a5b4fc;">'+trend+'</strong>.';
              }
            }
            document.getElementById('dhMode').addEventListener('change', function(){ setPlaceholder(); build(); });
            document.getElementById('dhBuild').addEventListener('click', build);
            build();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Histogramstawe raak altyd aanmekaar (kontinue data, geen gapings nie). Spreidingsdiagramme verbind nooit punte met lyne nie — slegs 'n enkele lyn van beste passing som die neiging op.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Wat is die hoof visuele verskil tussen 'n histogram en 'n staafgrafiek?", options: ["Histogramme gebruik kleur, staafgrafieke nie", "Histogramstawe raak aanmekaar; staafgrafiekstawe is geskei", "Staafgrafieke kan slegs een kategorie wys", "Daar is geen verskil nie"], answer: 1, topic: "Grafieke" },
        { type: "mc", text: "'n Spreidingsdiagram van roomysverkope teenoor temperatuur wys punte wat opwaarts trek. Dit dui op:", options: ["Negatiewe korrelasie", "Geen korrelasie nie", "Positiewe korrelasie", "Die data is onbruikbaar"], answer: 2, topic: "Grafieke" },
        { type: "mc", text: "'n Spreidingsdiagram van 'ure TV gekyk' teenoor 'toetstelling' trek afwaarts. Dit dui op:", options: ["Positiewe korrelasie", "Negatiewe korrelasie", "Geen korrelasie nie", "'n Histogram is eerder nodig"], answer: 1, topic: "Grafieke" },
        { type: "input", text: "'n Histogram het klasintervalle met wydte 10, wat by 0 begin. Hoeveel klasse word benodig om waardes van 0 tot 50 te dek?", answer: "5", topic: "Grafieke" },
        { type: "mc", text: "'n Lyn van beste passing op 'n spreidingsdiagram behoort:", options: ["Presies deur elke punt te gaan", "Die punte in volgorde te verbind", "Die algemene neiging deur die middel van die punte te wys", "Altyd horisontaal te wees"], answer: 2, topic: "Grafieke" },
      ]
    },
    {
      id: 37,
      chapter: 18,
      name: "Interpreteer, ontleed en rapporteer data",
      fullName: "Interpretasie, ontleding en verslaggewing oor data",
      lesson: {
        heading: "Interpretasie, ontleding en verslaggewing oor data",
        sub: "Hoofstuk 18 · Onderwerp 3",
        body: `
          <p>Graad 9 gaan verder as om net 'n datastel te beskryf — jy moet krities evalueer <strong>hoe die data ingesamel is</strong> en of die <strong>bron betroubaar is</strong>, benewens om uitskieters en misleidende grafieke raak te sien.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Vooroordeel en betroubaarheid van bronne</div>
            <p>
              <strong>Vooroordeel</strong> kom voor wanneer 'n metode van data-insameling sekere uitkomste bevoordeel of sekere groepe uitsluit, wat gevolgtrekkings onbetroubaar maak.<br><br>
              <strong>Vrae om oor enige databron te vra:</strong><br>
              &nbsp;&nbsp;• Wie het die data ingesamel, en waarom? (Het hulle 'n belang by 'n bepaalde uitkoms?)<br>
              &nbsp;&nbsp;• Hoe is die steekproef gekies? Is dit verteenwoordigend van die hele populasie?<br>
              &nbsp;&nbsp;• Was die steekproefgrootte groot genoeg?<br>
              &nbsp;&nbsp;• Was die opnamevrae neutraal, of so geformuleer dat dit respondente na 'n bepaalde antwoord lei?<br><br>
              <strong>Uitskieters:</strong> uiterste waardes wat die gemiddelde weg van die tipiese waarde trek — die mediaan is meer bestand ("robuust") teen uitskieters.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Evaluering van 'n bewering</div>
            <div class="example-step"><span class="step-num">1</span><span>Bewering: "90% van leerders verkies Wiskunde" — gebaseer op 'n opname onder 10 leerders in die Wiskunde-Olimpiade-klub.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Probleem: die steekproef is klein (n=10) en is slegs uit 'n groep getrek wat reeds in Wiskunde belangstel.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Gevolgtrekking: die steekproef is <strong>bevooroordeeld</strong> en nie verteenwoordigend van alle leerders nie — die bewering is onbetroubaar.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Kontrolelys vir bronbetroubaarheid</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Merk die blokkies wat 'n databron of opname beskryf om 'n onmiddellike betroubaarheidsgradering te kry.</p>
            <div id="relChecks" style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px;font-size:12.5px;color:rgba(221,225,240,0.70);"></div>
            <div id="relOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;"></div>
          </div>
          <script>
          (function(){
            const issues = [
              {t:'Steekproefgrootte is klein (minder as ~30)', w:1},
              {t:'Die steekproef was \'n gerieflikheidsteekproef (nie ewekansig/sistematies nie)', w:1},
              {t:'Opnamevrae lyk lei-end of eensydig', w:1},
              {t:'Die data-insamelaar trek voordeel uit \'n bepaalde uitkoms', w:1},
              {t:'Die steekproef sluit \'n groot deel van die populasie uit', w:1},
            ];
            const div = document.getElementById('relChecks');
            issues.forEach((it,i) => {
              const row = document.createElement('label');
              row.style.cssText = 'display:flex;gap:8px;align-items:center;cursor:pointer;';
              row.innerHTML = '<input type="checkbox" data-i="'+i+'" style="width:15px;height:15px;">' + it.t;
              div.appendChild(row);
            });
            function update(){
              const checked = div.querySelectorAll('input:checked').length;
              const out = document.getElementById('relOut');
              let verdict, colour;
              if(checked === 0){ verdict = 'Geen waarskuwingstekens gekies nie — die bron lyk tot dusver betroubaar.'; colour = '#6ee7b7'; }
              else if(checked <= 1){ verdict = 'Geringe bekommernis — interpreteer gevolgtrekkings met \'n mate van omsigtigheid.'; colour = '#fcd34d'; }
              else if(checked <= 3){ verdict = 'Verskeie waarskuwingstekens — die data is waarskynlik bevooroordeeld of onbetroubaar.'; colour = '#fbbf24'; }
              else { verdict = 'Baie waarskuwingstekens — hierdie bron behoort nie vertrou te word sonder verdere bewyse nie.'; colour = '#fca5a5'; }
              out.innerHTML = '<span style="color:'+colour+';">'+checked+' kwessie(s) gekies: '+verdict+'</span>';
            }
            div.querySelectorAll('input').forEach(inp => inp.addEventListener('change', update));
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In eksamens moet jy bevooroordeling-bewerings altyd met 'n rede regverdig — bv. "die steekproef het slegs klublede ingesluit, dus verteenwoordig dit nie alle leerders nie."</span></div>
        `
      },
      questions: [
        { type: "mc", text: "'n Opname oor 'gunsteling-vak' vra slegs leerders wat buite die wetenskaplaboratorium wag. Hierdie steekproef is waarskynlik:", options: ["Ewekansig en betroubaar", "Bevooroordeeld — nie verteenwoordigend van alle leerders nie", "'n Sensus", "Perfek sistematies"], answer: 1, topic: "Interpretasie" },
        { type: "mc", text: "Watter maatstaf van sentrale neiging is die mees bestand teen uitskieters?", options: ["Gemiddelde", "Mediaan", "Variasiewydte", "Modus altyd"], answer: 1, topic: "Interpretasie" },
        { type: "mc", text: "'n Maatskappy se opname vra: 'Stem jy nie saam dat ons produk die beste is nie?' Hierdie vraag is problematies omdat dit:", options: ["Te kort is", "Lei-end/bevooroordeelde bewoording het", "Numeries is", "'n Sensusvraag is"], answer: 1, topic: "Interpretasie" },
        { type: "mc", text: "'n Bewering is gebaseer op 'n steekproef van 8 mense uit 'n dorp van 50 000. Die hoofbekommernis is:", options: ["Die steekproef is te groot", "Die steekproefgrootte is te klein om verteenwoordigend te wees", "Daar is geen bekommernis nie", "8 is 'n ewe getal"], answer: 1, topic: "Interpretasie" },
        { type: "input", text: "Data: 22, 24, 23, 25, 90. Watter enkele waarde behoort ondersoek te word as 'n moontlike uitskieter?", answer: "90", topic: "Interpretasie" },
      ]
    },
  ],
  workbook: {
    chapter: 18, chapterName: "Datahantering",
    topics: [
      {
        name: "Gegroepeerde data en voorstellings",
        questions: [
          {
            num: "1",
            text: "Die ouderdomme van 30 gimnasiumlede is gegroepeer: 10-20 (f=6), 20-30 (f=12), 30-40 (f=8), 40-50 (f=4).",
            parts: [
              { label: "a)", text: "Skryf die middelpunt van elke klasinterval neer.", marks: 2 },
              { label: "b)", text: "Skat die gemiddelde ouderdom.", marks: 3 },
              { label: "c)", text: "Teken 'n histogram om hierdie data voor te stel.", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "'n Leerder teken ure oefening per week (x) en rustende harttempo (y) vir 6 mense aan: (1;80), (2;76), (3;74), (4;70), (5;66), (6;62).",
            parts: [
              { label: "a)", text: "Teken 'n spreidingsdiagram van hierdie data.", marks: 3 },
              { label: "b)", text: "Beskryf die korrelasie wat gewys word.", marks: 2 },
              { label: "c)", text: "Skets 'n gepaste lyn van beste passing.", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "Die frekwensietabel hieronder wys die tyd (in minute) wat 40 leerders een aand aan huiswerk bestee het:<br>0–10 (f=5), 10–20 (f=9), 20–30 (f=14), 30–40 (f=8), 40–50 (f=4)",
            parts: [
              { label: "a)", text: "Skryf die modale klas neer.", marks: 2 },
              { label: "b)", text: "Skat die gemiddelde tyd wat aan huiswerk bestee is, deur klasmiddelpunte te gebruik.", marks: 3 },
              { label: "c)", text: "Watter persentasie van die 40 leerders het 30 minute of meer aan huiswerk bestee?", marks: 3 },
              { label: "d)", text: "As hierdie data as 'n histogram geteken word, hoeveel aanmekaar-staande stawe sou dit hê?", marks: 1 },
            ]
          },
        ]
      },
      {
        name: "Vooroordeel en betroubaarheid",
        questions: [
          {
            num: "4",
            text: "'n Tydskrif beweer dat '95% van tieners sosiale media liefhet', gebaseer op 'n aanlyn-opname onder 40 van die tydskrif se eie sosialemediavolgelinge.",
            parts: [
              { label: "a)", text: "Identifiseer twee probleme met hoe hierdie data ingesamel is.", marks: 4 },
              { label: "b)", text: "Stel 'n beter steekproefmetode vir hierdie bewering voor.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 18, chapterName: "Hoofstuk 18 — Datahantering",
    topics: [
      {
        name: "Gegroepeerde data en voorstellings",
        answers: [
          { num: "Q1a", ans: "Middelpunte: 15, 25, 35, 45", note: "Gemiddelde van elke interval se eindpunte" },
          { num: "Q1b", ans: "Geskatte gemiddelde ≈ 27.3", note: "(6×15+12×25+8×35+4×45)÷30 = 820÷30 ≈ 27.33" },
          { num: "Q1c", ans: "Histogram met 4 aanmekaar-staande stawe met hoogtes 6, 12, 8, 4 oor die gegewe intervalle", note: "Geen gapings tussen stawe nie — kontinue data" },
          { num: "Q2a", ans: "Spreidingsdiagram met 6 punte geteken soos beskryf", note: "x = ure oefening, y = harttempo" },
          { num: "Q2b", ans: "Negatiewe korrelasie — soos oefenure toeneem, daal die harttempo", note: "" },
          { num: "Q2c", ans: "'n Lyn wat van links na regs afwaarts skuins deur die middel van die punte loop", note: "" },
          { num: "Q3a", ans: "20–30 (die modale klas)", note: "Die hoogste frekwensie is 14, in die 20–30-klas" },
          { num: "Q3b", ans: "Geskatte gemiddelde = 24.25 minute", note: "(5×5+9×15+14×25+8×35+4×45)÷40 = 970÷40 = 24.25" },
          { num: "Q3c", ans: "30%", note: "(8+4)/40 × 100 = 12/40 × 100 = 30%" },
          { num: "Q3d", ans: "5 stawe", note: "Een aanmekaar-staande staaf per klasinterval; 5 klasintervalle" },
        ]
      },
      {
        name: "Vooroordeel en betroubaarheid",
        answers: [
          { num: "Q4a", ans: "Die steekproef (die tydskrif se eie volgelinge) is nie verteenwoordigend van alle tieners nie; die steekproefgrootte (40) is klein; volgelinge hou waarskynlik reeds van sosiale media, wat die uitkoms bevooroordeel", note: "Enige twee redelike probleme" },
          { num: "Q4b", ans: "Gebruik 'n ewekansige of sistematiese steekproef wat uit 'n breë, verteenwoordigende populasie tieners getrek is, met 'n groter steekproefgrootte", note: "" },
        ]
      },
    ]
  }
});
