// Math Magician — Grade 8, Chapter 16 data (Afrikaans)
// Data Handling

MathMagician.registerChapter(16, {
  topics: [
    {
      id: 1601,
      chapter: 16,
      name: "Insameling en organisering van data",
      fullName: "Insameling en organisering van data",
      lesson: {
        heading: "Insameling en organisering van data",
        sub: "Hoofstuk 16 · Onderwerp 1",
        body: `
          <p>Datahantering begin met die stelselmatige insameling van data en die organisering daarvan sodat patrone sigbaar word.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelwoordeskat</div>
            <p>
              <strong>Data:</strong> inligting wat vir ontleding versamel word.<br>
              <strong>Populasie:</strong> die hele groep wat bestudeer word.<br>
              <strong>Steekproef:</strong> 'n kleiner groep wat gekies word om die populasie te verteenwoordig.<br><br>
              <strong>Tipes data:</strong><br>
              &nbsp;&nbsp;• <strong>Kategories (kwalitatief):</strong> nie-numeries — bv. gunsteling kleur, sport.<br>
              &nbsp;&nbsp;• <strong>Numeries (kwantitatief):</strong> getalle — bv. lengtes, punte.<br>
              &nbsp;&nbsp;&nbsp;&nbsp;– <em>Diskreet:</em> heel/telbare waardes (bv. aantal broers en susters).<br>
              &nbsp;&nbsp;&nbsp;&nbsp;– <em>Aaneenlopend:</em> enige waarde binne 'n reeks (bv. lengte, massa).<br><br>
              <strong>Telkaart:</strong> teken rou data aan met telmerke in groepe van 5.<br>
              <strong>Frekwensietabel:</strong> wys hoe dikwels elke waarde of kategorie voorkom.<br>
              <strong>Gegroepeerde frekwensietabel:</strong> gebruik vir data met 'n wye reeks — waardes word in klasintervalle gesorteer.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Bou van 'n frekwensietabel</div>
            <div class="example-step"><span class="step-num">1</span><span>Rou data (toetstellings): 7, 5, 8, 7, 6, 9, 5, 7, 8, 6, 7, 10, 5, 6, 8</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Tel elke waarde: 5→3, 6→3, 7→4, 8→3, 9→1, 10→1. Totaal = 15.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Relatiewe frekwensie: elke frekwensie ÷ 15. bv. 7 → 4/15 ≈ 0.27.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Frekwensietabel-bouer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer komma-geskeide getalle in en sien die frekwensietabel onmiddellik.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="ftInput" type="text" value="7,5,8,7,6,9,5,7,8,6,7,10,5,6,8" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="ftBuild" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bou</button>
            </div>
            <div id="ftOut" style="font-size:12px;overflow-x:auto;"></div>
          </div>
          <script>
          (function(){
            function build(){
              const nums = document.getElementById('ftInput').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              if(!nums.length) return;
              const freq = {};
              nums.forEach(n => freq[n] = (freq[n]||0)+1);
              const sorted = Object.keys(freq).map(Number).sort((a,b)=>a-b);
              let html = '<table style="border-collapse:collapse;font-family:JetBrains Mono,monospace;font-size:12px;width:100%;max-width:420px;">';
              html += '<tr style="border-bottom:1px solid rgba(255,255,255,0.15);">';
              ['Waarde','Frekwensie','Rel. Frek.'].forEach(h =>
                html += '<th style="padding:5px 14px;color:rgba(245,158,11,0.80);text-align:left;font-family:Syne,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.06em;">'+h+'</th>'
              );
              html += '</tr>';
              sorted.forEach(v => {
                const f = freq[v];
                html += '<tr style="border-bottom:1px solid rgba(255,255,255,0.06);"><td style="padding:5px 14px;color:#fcd34d;">'+v+'</td><td style="padding:5px 14px;color:#6ee7b7;">'+f+'</td><td style="padding:5px 14px;color:rgba(221,225,240,0.55);">'+(f/nums.length).toFixed(2)+'</td></tr>';
              });
              html += '<tr><td style="padding:5px 14px;color:rgba(221,225,240,0.40);font-size:11px;" colspan="1">Totaal</td><td style="padding:5px 14px;color:#fbbf24;font-weight:700;">'+nums.length+'</td><td style="padding:5px 14px;color:#fbbf24;">1.00</td></tr>';
              html += '</table>';
              document.getElementById('ftOut').innerHTML = html;
            }
            document.getElementById('ftBuild').addEventListener('click', build);
            document.getElementById('ftInput').addEventListener('keydown', e => e.key==='Enter' && build());
            build();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Kontroleer altyd dat die frekwensies optel tot die totale aantal datawaardes. As dit nie optel nie, het jy iewers verkeerd getel.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Die lengtes van 30 leerders is 'n voorbeeld van:", options: ["Kategoriese data", "Diskrete numeriese data", "Aaneenlopende numeriese data", "Kwalitatiewe data"], answer: 2, topic: "Data" },
        { type: "mc", text: "In 'n frekwensietabel is die relatiewe frekwensie van 'n waarde:", options: ["Die waarde ÷ totaal", "Die frekwensie ÷ totaal", "Die frekwensie × totaal", "Die waarde × frekwensie"], answer: 1, topic: "Data" },
        { type: "input", text: "Datastel: 3, 5, 3, 7, 3, 5, 7, 5, 3. Wat is die frekwensie van 3?", answer: "4", topic: "Data" },
        { type: "mc", text: "Watter tipe data sal die beste by 'n gegroepeerde frekwensietabel pas?", options: ["Gunsteling kleure van 10 leerders", "Ouderdomme van 100 volwassenes wat wissel van 18 tot 75", "Aantal troeteldiere besit (0 tot 4)", "Dae van die week"], answer: 1, topic: "Data" },
        { type: "input", text: "'n Frekwensietabel wys waardes 2, 4, 6, 8 met frekwensies 5, 3, 6, 6. Wat is die totale aantal datawaardes?", answer: "20", topic: "Data" },
        { type: "input", text: "'n Opname van 20 leerders se aantal broers en susters gee frekwensies: 0 → 5, 1 → 8, 2 → 4, 3 → x. As alle frekwensies tot 20 moet optel, bepaal x.", answer: "3", topic: "Data" },
        { type: "mc", text: "'n Onderwyser wil 40 leerders se gunsteling vakke (kategoriese data) met 'n grafiek opsom. Watter een hiervan sal 'n ONKORREKTE keuse wees?", options: ["Staafgrafiek — kategorieë vergelyk met geskeide stawe", "Sirkelgrafiek — wys die proporsies van elke vak", "Histogram — omdat histogramme aaneenlopende numeriese data vereis wat in intervalle gegroepeer is, nie kategorieë nie", "Frekwensietabel — organiseer tellings per kategorie"], answer: 2, topic: "Data" },
      ]
    },
    {
      id: 1602,
      chapter: 16,
      name: "Maatstawwe van sentrale neiging",
      fullName: "Maatstawwe van sentrale neiging",
      lesson: {
        heading: "Maatstawwe van sentrale neiging",
        sub: "Hoofstuk 16 · Onderwerp 2",
        body: `
          <p>Maatstawwe van sentrale neiging beskryf die <strong>middelste</strong> of <strong>tipiese waarde</strong> van 'n datastel.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Gemiddelde, mediaan, modus, variasiewydte</div>
            <p>
              <strong>Gemiddelde:</strong> <span class="math">x̄ = Σx ÷ n</span> — som van alle waardes ÷ aantal waardes.<br><br>
              <strong>Mediaan:</strong> middelste waarde wanneer data in volgorde gerangskik is.<br>
              &nbsp;&nbsp;• Onewe n: middelste waarde. Ewe n: gemiddelde van die twee middelste waardes.<br><br>
              <strong>Modus:</strong> waarde wat die meeste voorkom. Kan geen, een, of veelvuldig wees.<br><br>
              <strong>Variasiewydte:</strong> hoogste − laagste. Meet spreiding.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>Data: <span class="math">4, 7, 2, 9, 4, 6, 4, 8</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><strong>Gemiddelde:</strong> <span class="math">44 ÷ 8 = 5.5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><strong>Mediaan (gesorteer):</strong> 2,4,4,4,6,7,8,9 → <span class="math">(4+6)÷2 = 5</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><strong>Modus:</strong> 4 &nbsp;&nbsp; <strong>Variasiewydte:</strong> <span class="math">9−2=7</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Gemiddelde, Mediaan, Modus-berekenaar</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="mmmInput" type="text" value="4,7,2,9,4,6,4,8" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="mmmCalc" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="mmmOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const nums = document.getElementById('mmmInput').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              if(!nums.length) return;
              const sorted = [...nums].sort((a,b)=>a-b);
              const n = nums.length;
              const mean = nums.reduce((a,b)=>a+b,0)/n;
              const mid = Math.floor(n/2);
              const median = n%2===1 ? sorted[mid] : (sorted[mid-1]+sorted[mid])/2;
              const freq = {};
              nums.forEach(v => freq[v]=(freq[v]||0)+1);
              const maxF = Math.max(...Object.values(freq));
              const modes = Object.keys(freq).filter(k=>freq[k]===maxF).map(Number).sort((a,b)=>a-b);
              const range = sorted[n-1]-sorted[0];
              document.getElementById('mmmOut').innerHTML = [
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Gesorteer:</span><span style="color:rgba(165,180,252,0.75);">'+sorted.join(', ')+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Gemiddelde:</span><span style="color:#fcd34d;">'+(mean%1===0?mean:mean.toFixed(2))+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Mediaan:</span><span style="color:#6ee7b7;">'+median+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Modus:</span><span style="color:#fbbf24;">'+(maxF===1?'Geen modus':modes.join(', '))+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Variasiewydte:</span><span style="color:rgba(221,225,240,0.65);">'+range+'</span></div>',
              ].join('');
            }
            document.getElementById('mmmCalc').addEventListener('click', calc);
            document.getElementById('mmmInput').addEventListener('keydown', e => e.key==='Enter' && calc());

          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Sorteer altyd eers die data voordat jy die mediaan vind. Om die middelste posisie van ongesorteerde data te vind, gee elke keer die verkeerde antwoord.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Bereken die gemiddelde van: 12, 15, 9, 18, 6.", answer: "12", topic: "Sentrale neiging" },
        { type: "mc", text: "Data: 3, 7, 7, 9, 11, 13. Wat is die mediaan?", options: ["7", "8", "9", "7.5"], answer: 1, topic: "Sentrale neiging" },
        { type: "input", text: "Data: 5, 8, 5, 3, 5, 9, 8. Wat is die modus?", answer: "5", topic: "Sentrale neiging" },
        { type: "mc", text: "'n Datastel het gemiddelde 14 met 5 waardes. 'n 6de waarde van 14 word bygevoeg. Wat is die nuwe gemiddelde?", options: ["14", "13", "15", "Kan nie bepaal word nie"], answer: 0, topic: "Sentrale neiging" },
        { type: "input", text: "Data: 2, 6, 10, 14, 18. Wat is die variasiewydte?", answer: "16", topic: "Sentrale neiging" },
        { type: "input", text: "'n Stel van 6 getalle het 'n gemiddelde van 15. Vyf van die getalle is 12, 14, 16, 18, en 10. Bepaal die sesde getal.", answer: "20", topic: "Sentrale neiging" },
        { type: "input", text: "Die gemiddelde van 8 getalle is 22. Een getal, 46, word verwyder. Wat is die gemiddelde van die oorblywende 7 getalle, tot 2 desimale plekke?", answer: "18.57", topic: "Sentrale neiging" },
      ]
    },
    {
      id: 1603,
      chapter: 16,
      name: "Voorstelling van data",
      fullName: "Voorstelling van data — grafieke en kaarte",
      lesson: {
        heading: "Voorstelling van data — grafieke en kaarte",
        sub: "Hoofstuk 16 · Onderwerp 3",
        body: `
          <p>Om die korrekte grafiektipe vir jou datatipe te kies, is noodsaaklik in eksamens en in die praktyk.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Grafiektipes en wanneer om hulle te gebruik</div>
            <p>
              <strong>Staafgrafiek:</strong> vergelyk kategorieë — stawe is geskei. Gebruik vir kategoriese/diskrete data.<br>
              <strong>Dubbele staafgrafiek:</strong> vergelyk twee groepe langs mekaar oor kategorieë.<br>
              <strong>Histogram:</strong> stawe raak — gebruik vir aaneenlopende gegroepeerde data.<br>
              <strong>Sirkelgrafiek:</strong> wys proporsies. Hoek = <span class="math">(frek ÷ totaal) × 360°</span>.<br>
              <strong>Lyngrafiek:</strong> wys verandering oor tyd.<br>
              <strong>Stam-en-blaar:</strong> wys alle waardes. Stam = tiental-syfer; blaar = eenheid-syfer.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Sirkelgrafiek-sektorhoeke</div>
            <div class="example-step"><span class="step-num">1</span><span>Sokker 15, Rugby 10, Krieket 8, Ander 7. Totaal = 40.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Sokker: <span class="math">(15÷40)×360° = 135°</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Rugby: 90° · Krieket: 72° · Ander: 63°</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Kontroleer: <span class="math">135+90+72+63 = 360° ✓</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Sirkelgrafiek-hoekberekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer kategorienaamme en frekwensies in om die sektorhoeke te sien.</p>
            <div id="pieRows" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;"></div>
            <button id="pieCalc" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;margin-bottom:12px;">Bereken hoeke</button>
            <div id="pieOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            const cats=[{n:'Sokker',f:15},{n:'Rugby',f:10},{n:'Krieket',f:8},{n:'Ander',f:7}];
            const cols=['#f59e0b','#6366f1','#10b981','#ec4899'];
            function buildRows(){
              const div=document.getElementById('pieRows');
              div.innerHTML='';
              cats.forEach((c,i)=>{
                const row=document.createElement('div');
                row.style.cssText='display:flex;gap:8px;align-items:center;';
                row.innerHTML='<div style="width:12px;height:12px;border-radius:3px;background:'+cols[i%cols.length]+';flex-shrink:0;"></div><input data-i="'+i+'" data-t="n" value="'+c.n+'" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.30);color:#a5b4fc;padding:5px 8px;border-radius:6px;font-size:12px;font-family:DM Sans,sans-serif;"><input data-i="'+i+'" data-t="f" type="number" value="'+c.f+'" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.30);color:#fcd34d;padding:5px 8px;border-radius:6px;font-size:12px;font-family:JetBrains Mono,monospace;text-align:center;">';
                div.appendChild(row);
              });
              div.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',()=>{
                const i=+inp.dataset.i,t=inp.dataset.t;
                if(t==='n') cats[i].n=inp.value; else cats[i].f=parseFloat(inp.value)||0;
              }));
            }
            function calcAngles(){
              const total=cats.reduce((s,c)=>s+(c.f||0),0);
              if(!total) return;
              let html='',sum=0;
              cats.forEach((c,i)=>{
                const ang=(c.f||0)/total*360; sum+=ang;
                html+='<div><span style="color:'+cols[i%cols.length]+';display:inline-block;width:75px;">'+c.n+'</span> <span style="color:rgba(221,225,240,0.50);">f='+c.f+'</span>  →  <span style="color:#fcd34d;">'+ang.toFixed(1)+'°</span></div>';
              });
              html+='<div style="margin-top:6px;opacity:0.45;">Totaal: '+total+' | Som: '+sum.toFixed(1)+'°</div>';
              document.getElementById('pieOut').innerHTML=html;
            }
            document.getElementById('pieCalc').addEventListener('click',calcAngles);
            buildRows(); calcAngles();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Benoem altyd grafiekasse met titels en eenhede, gee die grafiek 'n opskrif, en vir sirkelgrafieke, wys die hoek of persentasie vir elke sektor.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter grafiek is die mees geskikte om te wys hoe 'n leerder se punte oor 6 maande verander het?", options: ["Staafgrafiek", "Sirkelgrafiek", "Lyngrafiek", "Histogram"], answer: 2, topic: "Grafieke" },
        { type: "input", text: "'n Kategorie het frekwensie 9 uit 'n totaal van 36. Wat is die sirkelgrafiek-sektorhoek in grade?", answer: "90", topic: "Grafieke" },
        { type: "mc", text: "In 'n stam-en-blaar-uitleg verteenwoordig die inskrywing 4 | 2 5 8:", options: ["4, 5, 8", "42, 45, 48", "24, 54, 84", "4.2, 4.5, 4.8"], answer: 1, topic: "Grafieke" },
        { type: "mc", text: "Wat onderskei 'n histogram van 'n staafgrafiek?", options: ["Histogramme gebruik sirkels", "Histogram-stawe raak (aaneenlopende data)", "Staafgrafieke kan nie frekwensies wys nie", "Hulle is identies"], answer: 1, topic: "Grafieke" },
        { type: "input", text: "Vier kategorieë het frekwensies 6, 9, 12, 3. Wat is die totaal?", answer: "30", topic: "Grafieke" },
        { type: "input", text: "'n Sirkelgrafiek wys 4 kategorieë met hoeke 144°, 90°, 72°, en x°. Bepaal x, en gee dan aan watter persentasie van die totaal dit verteenwoordig.", answer: "15", topic: "Grafieke" },
        { type: "input", text: "'n Staafgrafiek het 4 kategorieë wat saam 90 eenhede tel. Kategorie A = 24 eenhede en kategorie B = 18 eenhede. Die oorblywende twee kategorieë, C en D, het gelyke frekwensie. Bepaal die frekwensie van kategorie C.", answer: "24", topic: "Grafieke" },
      ]
    },
    {
      id: 1604,
      chapter: 16,
      name: "Interpretasie van data",
      fullName: "Interpretasie en ontleding van data",
      lesson: {
        heading: "Interpretasie en ontleding van data",
        sub: "Hoofstuk 16 · Onderwerp 4",
        body: `
          <p>Om grafieke krities te lees — om neigings, uitskieters, en misleidende kenmerke te identifiseer — is 'n sleutel-eksamenvaardigheid.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelbegrippe</div>
            <p>
              <strong>Neiging:</strong> neem die data toe, af, of bly dit stabiel oor tyd?<br>
              <strong>Uitskieter:</strong> 'n waarde ver van die res. Beïnvloed die gemiddelde aansienlik, maar nie die mediaan nie.<br>
              <strong>Misleidende grafieke — pas op vir:</strong><br>
              &nbsp;&nbsp;• Y-as wat nie by 0 begin nie (oordryf verskille).<br>
              &nbsp;&nbsp;• Ongelyke intervalle op asse.<br>
              &nbsp;&nbsp;• Ontbrekende etikette of opskrifte.<br>
              &nbsp;&nbsp;• 3D-effekte wat proporsies vervorm.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Effek van uitskieters</div>
            <div class="example-step"><span class="step-num">1</span><span>Data: 10, 11, 12, 12, 13, 80</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Gemiddelde = 138÷6 = <strong>23</strong> — opgetrek deur 80</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Mediaan = (12+12)/2 = <strong>12</strong> — nie geraak nie</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Wanneer 'n uitskieter teenwoordig is, is die <strong>mediaan</strong> gewoonlik 'n beter maatstaf.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Uitskieter-effekverkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Verander die uitskieterwaarde en kyk hoe gemiddelde vs. mediaan reageer.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <span style="font-size:12px;color:rgba(221,225,240,0.55);">Basisdata: 10, 11, 12, 12, 13 + uitskieter:</span>
              <input id="outlierVal" type="number" value="80" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
            <div id="outlierOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            const base=[10,11,12,12,13];
            function update(){
              const out=parseFloat(document.getElementById('outlierVal').value);
              if(isNaN(out)) return;
              const data=[...base,out].sort((a,b)=>a-b);
              const n=data.length;
              const mean=data.reduce((a,b)=>a+b,0)/n;
              const median=n%2===1?data[Math.floor(n/2)]:(data[n/2-1]+data[n/2])/2;
              const baseMean=base.reduce((a,b)=>a+b,0)/base.length;
              document.getElementById('outlierOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Sonder uitskieter:</span>gemiddelde=<span style="color:#fcd34d;">'+baseMean.toFixed(2)+'</span>, mediaan=<span style="color:#6ee7b7;">11.5</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Met uitskieter '+out+':</span>gemiddelde=<span style="color:#fca5a5;">'+mean.toFixed(2)+'</span>, mediaan=<span style="color:#6ee7b7;">'+median+'</span></div>',
                '<div style="margin-top:4px;font-size:11px;opacity:0.45;">Gemiddelde het verskuif met '+(mean-baseMean).toFixed(2)+' — mediaan het verskuif met '+(median-11.5).toFixed(1)+'</div>',
              ].join('');
            }
            document.getElementById('outlierVal').addEventListener('input',update);
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Wanneer gevra word "watter maatstaf verteenwoordig die data die beste" — as daar uitskieters is, kies mediaan. Sonder uitskieters is die gemiddelde gewoonlik die beste.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Data: 5, 6, 7, 7, 8, 50. Watter maatstaf word die meeste deur die uitskieter 50 geraak?", options: ["Modus", "Mediaan", "Gemiddelde", "Slegs variasiewydte"], answer: 2, topic: "Interpretasie" },
        { type: "mc", text: "'n Staafgrafiek se y-as begin by 95 in plaas van 0. Dit:", options: ["Verbeter duidelikheid", "Mislei deur verskille te oordryf", "Is nodig wanneer waardes naby mekaar is", "Beïnvloed slegs sirkelgrafieke"], answer: 1, topic: "Interpretasie" },
        { type: "input", text: "Data: 3, 5, 5, 6, 7, 40. Wat is die mediaan?", answer: "5.5", topic: "Interpretasie" },
        { type: "mc", text: "Toetstellings oor 5 weke: 40, 55, 62, 70, 68. Die algemene neiging is:", options: ["Afnemend", "Geen neiging nie", "Toenemend, dan effens afnemend", "Konstant"], answer: 2, topic: "Interpretasie" },
        { type: "mc", text: "Watter een sal NIE 'n grafiek misleidend maak nie?", options: ["Y-as by 50 laat begin", "3D-effekte op 'n staafgrafiek", "Om 'n opskrif weg te laat", "Albei asse duidelik benoem"], answer: 3, topic: "Interpretasie" },
        { type: "input", text: "Datastel: 4, 6, 6, 8, 9, 47. Bereken die gemiddelde (tot 2 d.p.).", answer: "13.33", topic: "Interpretasie" },
        { type: "input", text: "'n Winkel teken daaglikse verkope (in Rand) vir 'n week aan: 800, 850, 900, 820, 780, 3200, 830. Identifiseer die uitskieter en bereken die gemiddelde verkope SONDER dit (rond af tot die naaste Rand).", answer: "830", topic: "Interpretasie" },
      ]
    },
    {
      id: 1605,
      chapter: 16,
      name: "Hfst 16 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 16 — Eksamenfokus",
        sub: "Hoofstuk 16 · Hersiening",
        body: `
          <p>Datahanteringsvrae in eksamens kombineer die lees van tabelle en grafieke, die berekening van maatstawwe, die teken van grafieke, en die krities evalueer van voorstellings.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 16-opsomming</div>
            <p>
              ✅ Kategories vs. numeries (diskreet/aaneenlopend)<br>
              ✅ Tel- en frekwensietabelle — frekwensies moet tot die totaal optel<br>
              ✅ Gemiddelde = som ÷ n &nbsp; Mediaan = middelste (sorteer eers!) &nbsp; Modus = mees algemene<br>
              ✅ Variasiewydte = maks − min<br>
              ✅ Uitskieters beïnvloed die gemiddelde die meeste — mediaan is meer robuust<br>
              ✅ Grafiektipes: staaf (kategories), histogram (aaneenlopend), lyn (oor tyd), sirkel (proporsies), stam-en-blaar (alle waardes)<br>
              ✅ Sirkelhoek = (f ÷ totaal) × 360°<br>
              ✅ Identifiseer misleidende kenmerke in grafieke
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Wys altyd die hoekberekening vir sirkelgrafieke, sorteer altyd voordat jy die mediaan vind, en kontroleer altyd dat frekwensies tot die totaal optel.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Data: 8, 12, 7, 15, 8, 10. Bereken die gemiddelde.", answer: "10", topic: "Gemeng" },
        { type: "mc", text: "Data: 2, 4, 4, 6, 7, 9, 10. Wat is die mediaan?", options: ["4", "5", "6", "7"], answer: 2, topic: "Gemeng" },
        { type: "input", text: "'n Sirkelgrafiek-kategorie het 18 uit 72 waardes. Wat is die sektorhoek in grade?", answer: "90", topic: "Gemeng" },
        { type: "mc", text: "Watter grafiek wys die beste die verspreiding van 50 leerders se lengtes?", options: ["Sirkelgrafiek", "Lyngrafiek", "Histogram", "Dubbele staafgrafiek"], answer: 2, topic: "Gemeng" },
        { type: "input", text: "Data: 3, 3, 5, 7, 9, 11, 11. Lys beide modusse geskei deur 'n komma.", answer: "3,11", topic: "Gemeng" },
        { type: "input", text: "'n Datastel van 7 waardes het gemiddelde 20. Ses van die waardes is 15, 18, 22, 25, 19, en 21. Bepaal die sewende waarde.", answer: "20", topic: "Gemeng" },
        { type: "input", text: "'n Sirkelgrafiek wys sportvoorkeure: Sokker 40%, Rugby 25%, Krieket x%, Netbal 15%, Ander 10%. As 200 leerders opgeneem is, bepaal x, en bereken dan hoeveel leerders Krieket gekies het.", answer: "20", topic: "Gemeng" },
      ]
    },
  ],
  workbook: {
    chapter: 16, chapterName: "Datahantering",
    topics: [
      {
        name: "Frekwensietabelle en maatstawwe",
        questions: [
          {
            num: "1",
            text: "Punte (uit 20) vir 15 leerders: 14, 17, 12, 18, 14, 15, 17, 11, 14, 19, 16, 17, 13, 14, 12.",
            parts: [
              { label: "a)", text: "Bou 'n frekwensietabel.", marks: 4 },
              { label: "b)", text: "Gee die modale punt.", marks: 1 },
              { label: "c)", text: "Bereken die gemiddelde punt.", marks: 3 },
              { label: "d)", text: "Bepaal die mediaanpunt.", marks: 3 },
              { label: "e)", text: "Gee die variasiewydte.", marks: 1 },
            ]
          },
          {
            num: "2",
            text: "40 leerders se gunsteling vak: Wiskunde 12, Wetenskap 10, Engels 8, Geskiedenis 6, Kuns 4.",
            parts: [
              { label: "a)", text: "Bereken die sirkelgrafiek-hoek vir elke vak.", marks: 5 },
              { label: "b)", text: "Teken 'n duidelik benoemde sirkelgrafiek.", marks: 4 },
              { label: "c)", text: "Watter persentasie van leerders het Wiskunde gekies?", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Grafieke en interpretasie",
        questions: [
          {
            num: "3",
            text: "'n Leerder se toetstellings oor 6 maande: Jan 45, Feb 52, Mrt 58, Apr 55, Jun 70, Jul 68.",
            parts: [
              { label: "a)", text: "Teken 'n benoemde lyngrafiek.", marks: 4 },
              { label: "b)", text: "Beskryf die algemene neiging.", marks: 1 },
              { label: "c)", text: "Bereken die gemiddelde punt.", marks: 2 },
              { label: "d)", text: "Tussen watter twee maande was daar die grootste verbetering?", marks: 1 },
            ]
          },
          {
            num: "4",
            text: "Datastel: 12, 25, 28, 29, 30, 31, 32, 90.",
            parts: [
              { label: "a)", text: "Identifiseer die uitskieter(s).", marks: 1 },
              { label: "b)", text: "Bereken die gemiddelde met en sonder die uitskieters.", marks: 4 },
              { label: "c)", text: "Watter maatstaf — gemiddelde of mediaan — verteenwoordig die data beter? Verduidelik.", marks: 2 },
            ]
          },
          {
            num: "5",
            text: "Die dubbele staafgrafiekdata hieronder wys die aantal leerders in elke puntereeks vir twee Graad 8-klasse in dieselfde toets:<br><br><table style='border-collapse:collapse;font-family:JetBrains Mono,monospace;font-size:13px;'><tr><th style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>Puntereeks</th><th style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>8A</th><th style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>8B</th></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>50–59</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>60–69</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>8</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>6</td></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>70–79</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>10</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>9</td></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>80–89</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>6</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>7</td></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>90–99</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>3</td></tr></table>",
            parts: [
              { label: "a)", text: "Hoeveel leerders is in klas 8A in totaal?", marks: 1 },
              { label: "b)", text: "Watter puntereeks het presies dieselfde aantal leerders in albei klasse?", marks: 1 },
              { label: "c)", text: "Bereken die totale aantal leerders (albei klasse saam) wat 80 of hoër behaal het.", marks: 2 },
              { label: "d)", text: "Watter persentasie van klas 8B het in die 70–79 reeks behaal? (tot 1 d.p.)", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 16, chapterName: "Hoofstuk 16 — Datahantering",
    topics: [
      {
        name: "Frekwensietabelle en maatstawwe",
        answers: [
          { num: "Q1a", ans: "11→1, 12→2, 13→1, 14→4, 15→1, 16→1, 17→3, 18→1, 19→1; Totaal=15", note: "Al 15 waardes verantwoord" },
          { num: "Q1b", ans: "Modus = 14", note: "Kom 4 keer voor" },
          { num: "Q1c", ans: "Gemiddelde ≈ 14.87", note: "Som=223; 223÷15=14.87" },
          { num: "Q1d", ans: "Mediaan = 14", note: "15 waardes gesorteer; 8ste = 14" },
          { num: "Q1e", ans: "Variasiewydte = 8", note: "19−11=8" },
          { num: "Q2a", ans: "Wiskunde 108°; Wetenskap 90°; Engels 72°; Geskiedenis 54°; Kuns 36°", note: "(f÷40)×360 vir elk" },
          { num: "Q2b", ans: "Sirkelgrafiek met al 5 sektore benoem; hoeke som tot 360°", note: "Kontroleer benoeming" },
          { num: "Q2c", ans: "30%", note: "12÷40=0.30" },
        ]
      },
      {
        name: "Grafieke en interpretasie",
        answers: [
          { num: "Q3a", ans: "Lyngrafiek: maande op x-as, punte op y-as; punte geplot en verbind", note: "Albei asse benoem" },
          { num: "Q3b", ans: "Oor die algemeen toenemend met 'n effense afname in April en Julie", note: "" },
          { num: "Q3c", ans: "Gemiddelde = 58", note: "348÷6=58" },
          { num: "Q3d", ans: "April tot Junie (+15 punte)", note: "55→70" },
          { num: "Q4a", ans: "Uitskieters: 12 en 90", note: "Albei ver van die 25–32 groepering" },
          { num: "Q4b", ans: "Met al 8: gemiddelde=34.6; sonder 12 en 90: gemiddelde=29.2", note: "277÷8=34.6; 175÷6=29.2" },
          { num: "Q4c", ans: "Mediaan (≈29.5) verteenwoordig die data beter", note: "Gemiddelde vervorm deur uitskieters 12 en 90" },
          { num: "Q5a", ans: "30 leerders", note: "3+8+10+6+3 = 30" },
          { num: "Q5b", ans: "90–99 (3 leerders in albei klasse)", note: "Enigste reeks waar 8A en 8B presies ooreenstem" },
          { num: "Q5c", ans: "19 leerders", note: "8A: 6+3=9; 8B: 7+3=10; totaal = 9+10 = 19" },
          { num: "Q5d", ans: "30.0%", note: "9÷30×100 = 30%" },
        ]
      },
    ]
  }
});
