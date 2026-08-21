// Math Magician — Grade 11, Chapter 10 (Afrikaans)
// Waarskynlikheid

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 1000,
      chapter: 10,
      name: "Onafhanklike & afhanklike gebeurtenisse",
      fullName: "Onafhanklike gebeurtenisse, afhanklike gebeurtenisse, en die produkreël",
      lesson: {
        heading: "Onafhanklike en afhanklike gebeurtenisse",
        sub: "Hoofstuk 10 · Onderwerp 1",
        body: `
          <p>Graad 11 waarskynlikheid stel die formele definisie van onafhanklike gebeurtenisse en waarskynlikheidsbome vir opeenvolgende gebeurtenisse bekend.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Onafhanklike gebeurtenisse</div>
            <p>
              Gebeurtenisse A en B is <strong>onafhanklik</strong> as die voorkoms van een nie die waarskynlikheid van die ander beïnvloed nie.<br>
              Toets: <span class="math">P(A ∩ B) = P(A) × P(B)</span><br><br>
              Vir onafhanklike gebeurtenisse: <span class="math">P(A en B) = P(A) × P(B)</span><br>
              Voorbeeld: Muntgooi EN dobbelsteenrol is onafhanklik.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Afhanklike gebeurtenisse (voorwaardelike waarskynlikheid)</div>
            <p>
              Gebeurtenisse is <strong>afhanklik</strong> as die voorkoms van een die ander beïnvloed.<br>
              <span class="math">P(A en B) = P(A) × P(B|A)</span><br>
              waar P(B|A) = "waarskynlikheid van B gegewe dat A voorgekom het"<br><br>
              Voorbeeld: Trek sonder vervanging.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Boomdiagram (sonder vervanging)</div>
            <p>Sak: 3 rooi, 2 blou. Trek 2 sonder vervanging.<br>
            P(RR) = 3/5 × 2/4 = 6/20 = 3/10<br>
            P(RB) = 3/5 × 2/4 = 6/20 = 3/10<br>
            P(BR) = 2/5 × 3/4 = 6/20 = 3/10<br>
            P(BB) = 2/5 × 1/4 = 2/20 = 1/10<br>
            Toets: som = 1 ✓</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Onafhanklikheidstoets & Voorwaardelike Waarskynlikheid</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer P(A), P(B), en P(A∩B) in — toets onafhanklikheid en bereken voorwaardelike waarskynlikhede.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A)</div><input id="g11c10pa" type="number" value="0.4" min="0" max="1" step="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(B)</div><input id="g11c10pb" type="number" value="0.3" min="0" max="1" step="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A∩B)</div><input id="g11c10pab" type="number" value="0.12" min="0" max="1" step="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c10Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Toets</button>
            </div>
            <div id="g11c10Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function p4(n){return n.toFixed(4);}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const pa=gv('g11c10pa'),pb=gv('g11c10pb'),pab=gv('g11c10pab');
                const out=document.getElementById('g11c10Out');
                if([pa,pb,pab].some(isNaN)||pa<0||pb<0||pab<0||pa>1||pb>1||pab>1){out.innerHTML='<span style="color:#fca5a5;">Alle waardes moet tussen 0 en 1 wees.</span>';return;}
                if(pab>pa||pab>pb){out.innerHTML='<span style="color:#fca5a5;">P(A∩B) kan nie P(A) of P(B) oorskry nie.</span>';return;}
                const prod=pa*pb;
                const indep=Math.abs(prod-pab)<0.0001;
                const pAgivenB=pb>0?pab/pb:null;
                const pBgivenA=pa>0?pab/pa:null;
                const pAunionB=pa+pb-pab;
                let html='<span style="color:rgba(221,225,240,0.50);">P(A) × P(B) = '+p4(pa)+' × '+p4(pb)+' = '+p4(prod)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∩B) = '+p4(pab)+'</span><br>';
                if(indep) html+='<span style="color:#6ee7b7;">✅ A en B is ONAFHANKLIK — P(A∩B) = P(A)×P(B)</span><br>';
                else html+='<span style="color:#fca5a5;">❌ A en B is AFHANKLIK — P(A∩B) ≠ P(A)×P(B)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∪B) = P(A)+P(B)−P(A∩B) = '+p4(pAunionB)+'</span><br>';
                if(pAgivenB!==null) html+='<span style="color:#fcd34d;">P(A|B) = P(A∩B)/P(B) = '+p4(pAgivenB)+'</span>   ';
                if(pBgivenA!==null) html+='<span style="color:#fcd34d;">P(B|A) = P(A∩B)/P(A) = '+p4(pBgivenA)+'</span>';
                out.innerHTML=html;
              }
              ['g11c10pa','g11c10pb','g11c10pab'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c10Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "P(A) = 0.4, P(B) = 0.3, P(A∩B) = 0.12. Is A en B onafhanklik?",
          options: ["Ja — P(A)×P(B)=0.12=P(A∩B)", "Nee — P(A∩B) behoort 0.7 te wees", "Ja — hulle is uitsluitend", "Nee — 0.12 ≠ 0"],
          answer: 0,
          topic: "Onafhanklike & afhanklike gebeurtenisse"
        },
        {
          type: "mc",
          text: "Sak: 4 groen, 6 rooi. Twee word sonder vervanging getrek. P(albei groen) =",
          options: ["4/10 × 3/9", "4/10 × 4/10", "4/10 × 3/10", "3/10 × 2/9"],
          answer: 0,
          topic: "Onafhanklike & afhanklike gebeurtenisse"
        },
        {
          type: "input",
          text: "P(A) = 0.5, P(B) = 0.6, en A en B is onafhanklik. Bereken P(A∩B).",
          answer: "0.3",
          altAnswers: ["0,3"],
          topic: "Onafhanklike & afhanklike gebeurtenisse"
        },
        {
          type: "mc",
          text: "'n Munt word gegooi en 'n kaart word getrek. Hierdie gebeurtenisse is:",
          options: ["Afhanklik", "Uitsluitend", "Onafhanklik", "Komplementêr"],
          answer: 2,
          topic: "Onafhanklike & afhanklike gebeurtenisse"
        },
        {
          type: "mc",
          text: "Om twee kaarte SONDER vervanging te trek, maak die gebeurtenisse:",
          options: ["Onafhanklik", "Afhanklik", "Uitsluitend", "Komplementêr"],
          answer: 1,
          topic: "Onafhanklike & afhanklike gebeurtenisse"
        },
        {
          type: "input",
          text: "'n Houer bevat 5 rooi en 3 blou albasters. Twee albasters word sonder vervanging getrek. Bereken P(ten minste een rooi), as 'n breuk.",
          answer: "25/28",
          topic: "Onafhanklike & afhanklike gebeurtenisse"
        }
      ]
    },
    {
      id: 1001,
      chapter: 10,
      name: "Venn-diagramme, boomdiagramme & kontingensietabelle",
      fullName: "Gevorderde Venn-diagramme, boomdiagramme, en kontingensietabelle",
      lesson: {
        heading: "Boomdiagramme en kontingensietabelle",
        sub: "Hoofstuk 10 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Boomdiagramme</div>
            <p>
              Gebruik vir opeenvolgende (multi-stadium) eksperimente.<br>
              <strong>Reëls:</strong><br>
              • Waarskynlikhede op elke tak moet tot 1 optel<br>
              • Vermenigvuldig langs takke vir gesamentlike waarskynlikhede<br>
              • Tel oor rye op vir "of"-uitkomste<br>
              • Alle finale uitkomste moet tot 1 optel
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Kontingensietabelle (tweerigtingtabelle)</div>
            <p>
              Vertoon frekwensies of waarskynlikhede vir twee veranderlikes gelyktydig.<br><br>
              | | B | B' | Totaal |<br>
              | A | P(A∩B) | P(A∩B') | P(A) |<br>
              | A' | P(A'∩B) | P(A'∩B') | P(A') |<br>
              | Totaal | P(B) | P(B') | 1 |<br><br>
              Toets onafhanklikheid: as P(A∩B) = P(A) × P(B) vir alle selle.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Kontingensietabel</div>
            <p>150 leerders: 80 speel sport, 60 speel musiek, 30 doen albei.<br>
            | | Musiek | Geen musiek | Totaal |<br>
            | Sport | 30 | 50 | 80 |<br>
            | Geen sport | 30 | 40 | 70 |<br>
            | Totaal | 60 | 90 | 150 |<br><br>
            P(Sport) = 80/150; P(Musiek) = 60/150<br>
            P(Sport)×P(Musiek) = 0.213 ≠ P(Sport∩Musiek) = 30/150 = 0.2 → NIE onafhanklik nie</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Kontingensietabel-onafhanklikheidstoetser</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die vier binneste seltellings in — die berekenaar vul die totale in en toets onafhanklikheid.</p>
            <div style="display:grid;grid-template-columns:auto auto auto auto;gap:6px;margin-bottom:10px;align-items:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;"></div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">B</div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">B'</div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">Totaal</div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">A</div>
              <input id="g11c10t2ab" type="number" value="30" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2ab2" type="number" value="50" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2ra" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#6ee7b7;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">A'</div>
              <input id="g11c10t2a2b" type="number" value="30" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2a2b2" type="number" value="40" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2ra2" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#6ee7b7;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">Totaal</div>
              <input id="g11c10t2cb" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#6ee7b7;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2cb2" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#6ee7b7;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2tot" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#a5b4fc;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
            </div>
            <button id="g11c10t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Toets Onafhanklikheid</button>
            <div id="g11c10t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function sv(id,v){document.getElementById(id).value=v;}
              function calc(){
                const ab=gv('g11c10t2ab'),ab2=gv('g11c10t2ab2'),a2b=gv('g11c10t2a2b'),a2b2=gv('g11c10t2a2b2');
                const out=document.getElementById('g11c10t2Out');
                if([ab,ab2,a2b,a2b2].some(isNaN)||[ab,ab2,a2b,a2b2].some(x=>x<0)){out.innerHTML='<span style="color:#fca5a5;">Voer nie-negatiewe tellings in.</span>';return;}
                const rA=ab+ab2,rA2=a2b+a2b2,cB=ab+a2b,cB2=ab2+a2b2,tot=rA+rA2;
                sv('g11c10t2ra',rA);sv('g11c10t2ra2',rA2);sv('g11c10t2cb',cB);sv('g11c10t2cb2',cB2);sv('g11c10t2tot',tot);
                if(tot===0){out.innerHTML='<span style="color:#fca5a5;">Totaal kan nie 0 wees nie.</span>';return;}
                const pA=rA/tot,pB=cB/tot,pAB=ab/tot,expected=pA*pB;
                const indep=Math.abs(pAB-expected)<0.0001;
                let html='<span style="color:rgba(221,225,240,0.50);">n = '+tot+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A) = '+rA+'/'+tot+' = '+(pA).toFixed(4)+'</span>   <span style="color:rgba(221,225,240,0.50);">P(B) = '+cB+'/'+tot+' = '+(pB).toFixed(4)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∩B) = '+ab+'/'+tot+' = '+(pAB).toFixed(4)+'</span>   <span style="color:rgba(221,225,240,0.50);">P(A)×P(B) = '+(expected).toFixed(4)+'</span><br>';
                if(indep) html+='<span style="color:#6ee7b7;">✅ A en B is ONAFHANKLIK</span>';
                else html+='<span style="color:#fca5a5;">❌ A en B is NIE onafhanklik nie (P(A∩B) ≠ P(A)×P(B))</span>';
                out.innerHTML=html;
              }
              ['g11c10t2ab','g11c10t2ab2','g11c10t2a2b','g11c10t2a2b2'].forEach(id=>{document.getElementById(id).addEventListener('input',calc);document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c10t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In 'n boomdiagram moet die waarskynlikhede op alle takke vanaf enige nodus optel tot:",
          options: ["0", "0.5", "1", "100"],
          answer: 2,
          topic: "Venn-diagramme, boomdiagramme & kontingensietabelle"
        },
        {
          type: "mc",
          text: "'n Kontingensietabel toon P(A∩B) = 0.15, P(A) = 0.5, P(B) = 0.3. Is A en B onafhanklik?",
          options: ["Ja, aangesien 0.5×0.3=0.15", "Nee, aangesien 0.15≠0.3−0.5", "Nee, aangesien P(A)+P(B)≠1", "Kan nie bepaal word nie"],
          answer: 0,
          topic: "Venn-diagramme, boomdiagramme & kontingensietabelle"
        },
        {
          type: "input",
          text: "200 leerders is bevraagteken. 120 stap skool toe, 90 bring kos, 50 doen albei. Hoeveel doen geeneen van die twee nie?",
          answer: "40",
          topic: "Venn-diagramme, boomdiagramme & kontingensietabelle"
        },
        {
          type: "mc",
          text: "'n Sak het 5 rooi en 3 blou balle. Twee word met vervanging getrek. P(een rooi, een blou) =",
          options: ["6/64", "15/64", "30/64", "15/56"],
          answer: 2,
          topic: "Venn-diagramme, boomdiagramme & kontingensietabelle"
        },
        {
          type: "mc",
          text: "Om P(ten minste een) met 'n boomdiagram te vind, is die maklikste metode:",
          options: ["Tel alle takke met ten minste een op", "1 − P(geen een nie)", "Vermenigvuldig alle waarskynlikhede", "Gebruik die optelreël net een keer"],
          answer: 1,
          topic: "Venn-diagramme, boomdiagramme & kontingensietabelle"
        },
        {
          type: "input",
          text: "Van 200 studente studeer 90 Wiskunde, 70 Wetenskap, en 130 studeer ten minste een van die twee vakke. Bereken P('n student studeer beide Wiskunde en Wetenskap), as 'n desimaal.",
          answer: "0.15",
          altAnswers: ["0,15"],
          topic: "Venn-diagramme, boomdiagramme & kontingensietabelle"
        }
      ]
    },
    {
      id: 1002,
      chapter: 10,
      name: "Venn-diagramme vir drie gebeurtenisse",
      fullName: "Gebruik van Venn-diagramme en versamelingsformules vir drie gebeurtenisse A, B en C",
      lesson: {
        heading: "Venn-diagramme vir drie gebeurtenisse",
        sub: "Hoofstuk 10 · Onderwerp 3",
        body: `
          <p>CAPS vereis die aflei en toepassing van waarskynlikheidsformules vir <strong>enige drie gebeurtenisse</strong> A, B en C — die klassieke "medisynetoets" of "drie vakke"-tipe vraag met 'n 3-sirkel-Venn-diagram.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die optelreël vir drie gebeurtenisse</div>
            <p>
              <span class="math">P(A∪B∪C) = P(A)+P(B)+P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C)</span><br><br>
              Om 'n 3-sirkel-Venn-diagram in te vul, werk altyd van die <strong>middel na buite</strong>: plaas eers die "al drie"-streek, dan elke paarsgewyse-alleen-streek, dan elke enkel-alleen-streek.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Drie-sirkel-Venn</div>
            <p>80 pasiënte; 40 verligting van A, 35 van B, 40 van C; 21 van A en C; 18 van B en C; 68 van ten minste een; 7 van al drie.<br>
            Middel (A∩B∩C) = 7.<br>
            A∩C alleen = 21 − 7 = 14; B∩C alleen = 18 − 7 = 11.<br>
            Gebruik die optelreël om A∩B te vind: 68 = 40+35+40 − (A∩B) − 21 − 18 + 7 → los op vir A∩B = 15, dus A∩B alleen = 15 − 7 = 8.<br>
            A alleen = 40 − 14 − 8 − 7 = 11; B alleen = 35 − 8 − 11 − 7 = 9; C alleen = 40 − 14 − 11 − 7 = 8.<br>
            Geeneen van die drie nie: 80 − 68 = 12.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Kontroleer altyd: alle streke van die Venn-diagram behoort op te tel tot die totale steekproefgrootte — dit vang die meeste rekenkundige foute.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Drie-Gebeurtenis-Venn-diagram-oplosser</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die totaal, elke enkel-gebeurtenistelling, elke paarsgewyse-deurnydingstelling, en die drievoudige deursnyding in — kry elke afsonderlike streek.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Totaal n(S)</div><input id="g11c10t3s" type="number" value="80" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A)</div><input id="g11c10t3a" type="number" value="40" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(B)</div><input id="g11c10t3b" type="number" value="35" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(C)</div><input id="g11c10t3c" type="number" value="40" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A∩C)</div><input id="g11c10t3ac" type="number" value="21" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(B∩C)</div><input id="g11c10t3bc" type="number" value="18" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A∪B∪C)</div><input id="g11c10t3u" type="number" value="68" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A∩B∩C)</div><input id="g11c10t3abc" type="number" value="7" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c10t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los Venn op</button>
            </div>
            <div id="g11c10t3Out" style="font-size:14px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const S=gv('g11c10t3s'),A=gv('g11c10t3a'),B=gv('g11c10t3b'),C=gv('g11c10t3c'),AC=gv('g11c10t3ac'),BC=gv('g11c10t3bc'),U=gv('g11c10t3u'),ABC=gv('g11c10t3abc');
                const out=document.getElementById('g11c10t3Out');
                if([S,A,B,C,AC,BC,U,ABC].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer alle waardes in.</span>';return;}
                const AB=A+B+C-AC-BC+ABC-U;
                const aOnly=A-AC-AB+ABC, bOnly=B-AB-BC+ABC, cOnly=C-AC-BC+ABC;
                const acOnly=AC-ABC, bcOnly=BC-ABC, abOnly=AB-ABC;
                const none=S-U;
                if(AB<0||aOnly<0||bOnly<0||cOnly<0||acOnly<0||bcOnly<0||abOnly<0||none<0){
                  out.innerHTML='<span style="color:#fca5a5;">Hierdie waardes is teenstrydig — kontroleer of \'n streek negatief uitgekom het. Hersien jou gegewe tellings.</span>';return;
                }
                let html='<span style="color:rgba(221,225,240,0.50);">n(A∩B) opgelos uit die optelreël: '+AB+'</span><br>';
                html+='<span style="color:#fcd34d;">A alleen = '+aOnly+'</span>   <span style="color:#fcd34d;">B alleen = '+bOnly+'</span>   <span style="color:#fcd34d;">C alleen = '+cOnly+'</span><br>';
                html+='<span style="color:#a5b4fc;">A∩B alleen = '+abOnly+'</span>   <span style="color:#a5b4fc;">A∩C alleen = '+acOnly+'</span>   <span style="color:#a5b4fc;">B∩C alleen = '+bcOnly+'</span><br>';
                html+='<span style="color:#6ee7b7;">A∩B∩C = '+ABC+'</span>   <span style="color:#6ee7b7;">Geeneen van die drie nie = '+none+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.45);font-size:12px;">Kontroleer: '+aOnly+'+'+bOnly+'+'+cOnly+'+'+abOnly+'+'+acOnly+'+'+bcOnly+'+'+ABC+'+'+none+' = '+(aOnly+bOnly+cOnly+abOnly+acOnly+bcOnly+ABC+none)+' (behoort gelyk te wees aan n(S) = '+S+')</span>';
                out.innerHTML=html;
              }
              document.querySelectorAll('#g11c10t3s,#g11c10t3a,#g11c10t3b,#g11c10t3c,#g11c10t3ac,#g11c10t3bc,#g11c10t3u,#g11c10t3abc').forEach(el=>{el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c10t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Die optelreël vir drie gebeurtenisse A, B, C is:",
          options: ["P(A)+P(B)+P(C)−P(A∩B)−P(A∩C)−P(B∩C)+P(A∩B∩C)", "P(A)+P(B)+P(C)", "P(A)×P(B)×P(C)", "P(A)+P(B)+P(C)−P(A∩B∩C)"],
          answer: 0,
          topic: "Venn-diagramme vir drie gebeurtenisse"
        },
        {
          type: "input",
          text: "In 'n 3-sirkel-Venn-diagram is A∩B (alles, insluitend die drievoudige oorvleueling) = 15 en A∩B∩C = 6. Bereken die streek 'A∩B alleen' (uitgesluit C).",
          answer: "9",
          topic: "Venn-diagramme vir drie gebeurtenisse"
        },
        {
          type: "mc",
          text: "Wanneer 'n 3-sirkel-Venn-diagram vanuit gegewe data gebou word, moet jy altyd eerste invul:",
          options: ["Die middelste streek (A∩B∩C)", "Die buitenste 'geeneen'-streek", "Enige enkel-gebeurtenis-streek", "Die totaal eerste"],
          answer: 0,
          topic: "Venn-diagramme vir drie gebeurtenisse"
        },
        {
          type: "input",
          text: "120 leerders: 60 speel sokker, 50 speel rugby, 45 speel krieket, 20 speel sokker en rugby, 15 speel rugby en krieket, 18 speel sokker en krieket, 8 speel al drie. Hoeveel speel geeneen van die drie sportsoorte nie?",
          answer: "30",
          topic: "Venn-diagramme vir drie gebeurtenisse"
        },
        {
          type: "mc",
          text: "As elke streek van 'n voltooide 3-sirkel-Venn-diagram bymekaar getel word, behoort die totaal gelyk te wees aan:",
          options: ["n(S), die grootte van die steekproefruimte", "P(A∩B∩C)", "1", "n(A) + n(B) + n(C)"],
          answer: 0,
          topic: "Venn-diagramme vir drie gebeurtenisse"
        },
        {
          type: "input",
          text: "'n Opname onder 150 leerders het bevind: 60 speel skaak, 55 speel dambord, 50 speel kaarte. 15 speel skaak en kaarte, 8 speel dambord en kaarte, 8 speel al drie, en 10 speel geeneen van die drie nie. Bereken hoeveel leerders slegs skaak speel.",
          answer: "43",
          topic: "Venn-diagramme vir drie gebeurtenisse"
        }
      ]
    },
    {
      id: 1003,
      chapter: 10,
      name: "Fundamentele telbeginsel",
      fullName: "Gebruik van die fundamentele telbeginsel om uitkomste te tel en waarskynlikhede te bereken",
      lesson: {
        heading: "Die fundamentele telbeginsel",
        sub: "Hoofstuk 10 · Onderwerp 4",
        body: `
          <p>Die <strong>fundamentele telbeginsel</strong> laat jou toe om die totale aantal moontlike uitkomste van 'n multi-stadium-proses te tel sonder om hulle almal te lys — noodsaaklik vir waarskynlikheidsprobleme wat wagwoorde, nommerplate, rangskikkings, en kodes behels.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Die fundamentele telbeginsel</div>
            <p>
              As 'n eerste keuse op m maniere gemaak kan word, en vir elkeen daarvan kan 'n tweede keuse op n maniere gemaak word, en so meer, dan is die totale aantal uitkomste:<br>
              <span class="math">m × n × p × ...</span><br><br>
              Let op vir die frase "sonder herhaling" — dit verminder die aantal keuses beskikbaar by elke daaropvolgende stadium.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: PIN-kodes</div>
            <p>Hoeveel 4-syfer-PIN-kodes is moontlik (syfers 0-9, herhaling toegelaat)?<br>
            10 × 10 × 10 × 10 = 10 000<br>
            Hoeveel as geen syfer mag herhaal nie?<br>
            10 × 9 × 8 × 7 = 5 040</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Waarskynlikheid met behulp van telling</div>
            <p>'n Wagwoord is 2 letters (A-Z) gevolg deur 3 syfers, geen herhaling binne elke deel nie. Bereken die waarskynlikheid dat 'n lukraak gegenereerde wagwoord met "AB" begin.<br>
            Totale wagwoorde = (26×25) × (10×9×8) = 650 × 720 = 468 000<br>
            Wagwoorde wat met "AB" begin: 1 × (10×9×8) = 720<br>
            P = 720/468 000 = 1/650</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Die fundamentele telbeginsel is die grondslag vir faktoriaal-gebaseerde rangskikkings wat jy verder in Graad 12 (permutasies en kombinasies) sal uitbrei.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Telbeginsel-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die aantal keuses beskikbaar by elke stadium in (kommageskei) — kry die totale uitkomste, met en sonder herhaling.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:220px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Keuses per stadium (kommageskei, bv. 26,26,10,10,10)</div>
                <input id="g11c10t4data" type="text" value="26,26,10,10,10" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c10t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g11c10t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function calc(){
                const raw=document.getElementById('g11c10t4data').value;
                const out=document.getElementById('g11c10t4Out');
                const arr=raw.split(',').map(s=>parseInt(s.trim(),10)).filter(n=>!isNaN(n)&&n>0);
                if(arr.length<1){out.innerHTML='<span style="color:#fca5a5;">Voer ten minste een positiewe heelgetal in.</span>';return;}
                const withRep=arr.reduce((a,b)=>a*b,1);
                let html='<span style="color:rgba(221,225,240,0.50);">Stadiums: '+arr.join(' × ')+'</span><br>';
                html+='<span style="color:#6ee7b7;">Totale uitkomste (herhaling toegelaat) = '+withRep.toLocaleString('en-ZA')+'</span><br>';
                if(arr.every(n=>n===arr[0])){
                  const k=arr[0],len=arr.length;
                  let noRep=1,ok=true;
                  for(let i=0;i<len;i++){const v=k-i; if(v<=0){ok=false;break;} noRep*=v;}
                  if(ok) html+='<span style="color:#fcd34d;">Totale uitkomste (geen herhaling, dieselfde poelgrootte '+k+' by elke stadium) = '+k+(len>1?'×'+Array.from({length:len-1},(_, i)=>k-1-i).join('×'):'')+' = '+noRep.toLocaleString('en-ZA')+'</span>';
                  else html+='<span style="color:rgba(221,225,240,0.45);">Kan nie herhaling vermy nie — meer stadiums as items in die poel.</span>';
                } else {
                  html+='<span style="color:rgba(221,225,240,0.45);font-size:12px;">"Geen herhaling" geld slegs netjies wanneer elke stadium uit dieselfde poel trek — gemengde poele (bv. letters dan syfers) verbied gewoonlik slegs herhalings binne elke deel.</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c10t4data').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c10t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Restaurant bied 4 voorgeregte, 5 hoofgeregte, en 3 nageregte aan. Die aantal moontlike 3-gang-maaltye is:",
          options: ["12", "60", "15", "20"],
          answer: 1,
          topic: "Fundamentele telbeginsel"
        },
        {
          type: "input",
          text: "Hoeveel 3-syfer-kodes (syfers 0-9) is moontlik as herhaling toegelaat word?",
          answer: "1000",
          topic: "Fundamentele telbeginsel"
        },
        {
          type: "mc",
          text: "Hoeveel 3-syfer-kodes (syfers 0-9) is moontlik as GEEN syfer mag herhaal nie?",
          options: ["1000", "720", "504", "900"],
          answer: 1,
          topic: "Fundamentele telbeginsel"
        },
        {
          type: "mc",
          text: "'n Nommerplaat het 3 letters gevolg deur 3 syfers (herhaling toegelaat in albei dele). Die totale aantal plate is:",
          options: ["26³ × 10³", "26 × 10", "(26+10)³", "3 × 26 × 10"],
          answer: 0,
          topic: "Fundamentele telbeginsel"
        },
        {
          type: "input",
          text: "'n 4-syfer-PIN (0-9, geen herhaling) word lukraak gekies. Wat is die waarskynlikheid dat dit presies '1234' is (as 'n breuk met noemer gelyk aan die totale aantal PIN's, gee net die noemer)?",
          answer: "5040",
          topic: "Fundamentele telbeginsel"
        },
        {
          type: "input",
          text: "'n Wagwoord bestaan uit 3 letters (A–Z, geen herhaling) gevolg deur 2 syfers (0–9, herhaling toegelaat). Hoeveel verskillende wagwoorde is moontlik?",
          answer: "1560000",
          topic: "Fundamentele telbeginsel"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 10 Werkboek — Waarskynlikheid",
    questions: [
      {
        number: 1,
        text: "'n Sak bevat 4 wit en 3 swart balle. Twee balle word sonder vervanging getrek.",
        parts: [
          { label: "a", text: "Teken 'n boomdiagram wat alle uitkomste en hul waarskynlikhede toon.", marks: 4 },
          { label: "b", text: "Bereken P(albei wit).", marks: 2 },
          { label: "c", text: "Bereken P(ten minste een swart).", marks: 3 },
          { label: "d", text: "Bereken P(een van elke kleur).", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "'n Opname onder 200 Graad 11-leerders het gevra oor sosiale-media-gebruik en akademiese prestasie:",
        parts: [
          { label: "", text: "| | Goeie uitslae | Swak uitslae | Totaal |\n| Hoë SM-gebruik | 45 | 55 | 100 |\n| Lae SM-gebruik | 70 | 30 | 100 |\n| Totaal | 115 | 85 | 200 |", marks: 0 },
          { label: "a", text: "Bereken P(hoë SM-gebruik EN goeie uitslae).", marks: 1 },
          { label: "b", text: "Bereken P(goeie uitslae).", marks: 1 },
          { label: "c", text: "Bereken P(hoë SM-gebruik) × P(goeie uitslae).", marks: 2 },
          { label: "d", text: "Is sosiale-media-gebruik en akademiese uitslae onafhanklik? Motiveer.", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "'n Fabriek het twee masjiene wat boute vervaardig. Die data word in die tabel hieronder opgesom:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Masjien</th><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>% van produksie</th><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>% defek</th></tr><tr><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>A</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>60%</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5%</td></tr><tr><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>B</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>40%</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>8%</td></tr></table>",
        parts: [
          { label: "a", text: "Teken 'n boomdiagram met hierdie data en bereken P(Masjien A EN defek).", marks: 3 },
          { label: "b", text: "Bereken die algehele waarskynlikheid dat 'n lukraak gekose bout defek is.", marks: 3 },
          { label: "c", text: "Gegewe dat 'n bout defek bevind word, bereken die waarskynlikheid dat dit van Masjien B afkomstig is (tot 3 desimale plekke).", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Tak 1: W(4/7)→W(3/6), S(3/6); Tak 2: S(3/7)→W(4/6), S(2/6)",
        b: "P(WW)=4/7×3/6=12/42=2/7",
        c: "P(ten minste 1 swart)=1−P(WW)=1−2/7=5/7",
        d: "P(WS)+P(SW)=4/7×3/6+3/7×4/6=12/42+12/42=24/42=4/7"
      },
      2: {
        a: "45/200=0.225",
        b: "115/200=0.575",
        c: "(100/200)×(115/200)=0.5×0.575=0.2875",
        d: "0.225≠0.2875 → NIE onafhanklik nie (hoë SM-gebruik korreleer met swakker uitslae)"
      },
      3: {
        a: "P(A)=0,6 vertak na defek(0,05)/nie(0,95); P(B)=0,4 vertak na defek(0,08)/nie(0,92). P(A∩defek)=0,6×0,05=0,03",
        b: "P(defek)=0,6×0,05+0,4×0,08=0,03+0,032=0,062",
        c: "P(B|defek)=P(B∩defek)/P(defek)=0,032/0,062≈0,516"
      }
    }
  }
});
