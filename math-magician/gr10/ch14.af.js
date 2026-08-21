// Math Magician — Grade 10, Chapter 14 (Afrikaans)
// Waarskynlikheid

MathMagician.registerChapter(14, {
  topics: [
    {
      id: 1400,
      chapter: 14,
      name: "Waarskynlikheidsgrondbeginsels en Venn-diagramme",
      fullName: "Teoretiese waarskynlikheid, relatiewe frekwensie, en Venn-diagramme",
      lesson: {
        heading: "Waarskynlikheidsgrondbeginsels en Venn-diagramme",
        sub: "Hoofstuk 14 · Onderwerp 1",
        body: `
          <p><strong>Waarskynlikheid</strong> is die waarskynlikheid dat 'n gebeurtenis plaasvind, uitgedruk as 'n waarde tussen 0 en 1 (of 0% en 100%).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Teoretiese waarskynlikheid</div>
            <p>
              <span class="math">P(E) = n(E) / n(S)</span><br>
              waar n(E) = aantal gunstige uitkomste, n(S) = totale aantal ewe waarskynlike uitkomste (uitkomsruimte).<br><br>
              Altyd: <span class="math">0 ≤ P(E) ≤ 1</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Relatiewe frekwensie (eksperimentele waarskynlikheid)</div>
            <p>
              <span class="math">P(E) ≈ frekwensie van E / totale pogings</span><br>
              Soos die aantal pogings toeneem, kom die relatiewe frekwensie nader aan die teoretiese waarskynlikheid.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Venn-diagramme</div>
            <p>
              Twee gebeurtenisse A en B in uitkomsruimte S:<br>
              <span class="math">A ∩ B</span> = A EN B (deursnee — oorvleueling)<br>
              <span class="math">A ∪ B</span> = A OF B (unie — totaal in beide)<br>
              <span class="math">A'</span> = NIE A (komplement)<br><br>
              <strong>Optelreël:</strong> <span class="math">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Venn-diagram</div>
            <p>In 'n klas van 30 speel 18 sokker (S), 12 speel tennis (T), en 5 speel albei.<br>
            n(slegs S) = 13; n(slegs T) = 7; n(albei) = 5; n(geeneen) = 5<br>
            P(S ∪ T) = (13+7+5)/30 = 25/30 = 5/6</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Venn-diagramberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die totale uitkomsruimte en gebeurtenistellings in — kry al die streke en sleutelwaarskynlikhede.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Totaal n(S)</div><input id="g10c14ns" type="number" value="30" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A)</div><input id="g10c14na" type="number" value="18" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(B)</div><input id="g10c14nb" type="number" value="12" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A∩B)</div><input id="g10c14nab" type="number" value="5" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c14Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g10c14Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fr(n,d){if(d===0)return'0';const g=gcd(n,d);return n/g+'/'+d/g;}
              function gcd(a,b){return b===0?a:gcd(b,a%b);}
              function calc(){
                const nS=parseInt(document.getElementById('g10c14ns').value);
                const nA=parseInt(document.getElementById('g10c14na').value);
                const nB=parseInt(document.getElementById('g10c14nb').value);
                const nAB=parseInt(document.getElementById('g10c14nab').value);
                const out=document.getElementById('g10c14Out');
                if([nS,nA,nB,nAB].some(isNaN)||nS<=0||nA<0||nB<0||nAB<0){out.innerHTML='<span style="color:#fca5a5;">Voer nie-negatiewe heelgetalle in.</span>';return;}
                if(nAB>nA||nAB>nB||nA>nS||nB>nS){out.innerHTML='<span style="color:#fca5a5;">Kontroleer waardes: n(A∩B) kan nie n(A) of n(B) oorskry nie; nie een kan n(S) oorskry nie.</span>';return;}
                const aOnly=nA-nAB,bOnly=nB-nAB,aUnionB=nA+nB-nAB,neither=nS-aUnionB;
                if(neither<0){out.innerHTML='<span style="color:#fca5a5;">n(A) + n(B) − n(A∩B) oorskry n(S) — kontroleer waardes.</span>';return;}
                let html='<span style="color:rgba(221,225,240,0.50);">n(slegs A) = '+nA+'−'+nAB+' = </span><span style="color:#fcd34d;">'+aOnly+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">n(slegs B) = '+nB+'−'+nAB+' = </span><span style="color:#fcd34d;">'+bOnly+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">n(geeneen) = </span><span style="color:#fcd34d;">'+neither+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">n(A∪B) = '+nA+'+'+nB+'−'+nAB+' = </span><span style="color:#6ee7b7;">'+aUnionB+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A) = </span><span style="color:#6ee7b7;">'+fr(nA,nS)+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">P(B) = </span><span style="color:#6ee7b7;">'+fr(nB,nS)+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∩B) = </span><span style="color:#6ee7b7;">'+fr(nAB,nS)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∪B) = </span><span style="color:#6ee7b7;">'+fr(aUnionB,nS)+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">P(geeneen) = </span><span style="color:#6ee7b7;">'+fr(neither,nS)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Wedersyds uitsluitend? </span><span style="color:'+(nAB===0?'#6ee7b7':'#fca5a5')+'">'+(nAB===0?'Ja — n(A∩B) = 0':'Nee — n(A∩B) = '+nAB)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c14Btn').addEventListener('click',calc);
              ['g10c14ns','g10c14na','g10c14nb','g10c14nab'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Vul altyd die Venn-diagram van binne na buite in — begin met die deursnee, trek dan af om elke "slegs"-streek te kry, en vind "geeneen" laaste.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Sak het 4 rooi en 6 blou albasters. P(rooi) =",
          options: ["4/6", "2/5", "4/10", "Beide B en C"],
          answer: 3,
          topic: "Waarskynlikheidsgrondbeginsels en Venn-diagramme"
        },
        {
          type: "input",
          text: "P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Bepaal P(A∪B).",
          answer: "0.7",
          altAnswers: ["0,7"],
          topic: "Waarskynlikheidsgrondbeginsels en Venn-diagramme"
        },
        {
          type: "mc",
          text: "As P(A) = 0.3, dan is P(A') =",
          options: ["0.3", "0.7", "0.03", "1.3"],
          answer: 1,
          topic: "Waarskynlikheidsgrondbeginsels en Venn-diagramme"
        },
        {
          type: "mc",
          text: "'n Regverdige dobbelsteen word gegooi. P(ewe OF groter as 4) =",
          options: ["4/6", "5/6", "3/6", "2/6"],
          answer: 0,
          topic: "Waarskynlikheidsgrondbeginsels en Venn-diagramme"
        },
        {
          type: "input",
          text: "In 'n groep, P(A) = 0.6, P(B) = 0.4, P(A∪B) = 0.8. Bepaal P(A∩B).",
          answer: "0.2",
          altAnswers: ["0,2"],
          topic: "Waarskynlikheidsgrondbeginsels en Venn-diagramme"
        },
        {
          type: "input",
          text: "In 'n klas van 40 speel x leerders slegs skaak, 2x speel slegs sokker, 6 speel albei, en 4 speel geen van die twee nie. Bepaal x.",
          answer: "10",
          topic: "Waarskynlikheidsgrondbeginsels en Venn-diagramme"
        },
        {
          type: "input",
          text: "In 'n opname van 60 mense hou 35 van koffie (C), 28 hou van tee (T), en 10 hou van geen van die twee nie. Bepaal n(C ∩ T).",
          answer: "13",
          topic: "Waarskynlikheidsgrondbeginsels en Venn-diagramme"
        }
      ]
    },
    {
      id: 1401,
      chapter: 14,
      name: "Wedersyds uitsluitende en komplementêre gebeurtenisse",
      fullName: "Wedersyds uitsluitende gebeurtenisse, komplementêre gebeurtenisse, en waarskynlikheidsidentiteite",
      lesson: {
        heading: "Wedersyds uitsluitende en komplementêre gebeurtenisse",
        sub: "Hoofstuk 14 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Wedersyds uitsluitende gebeurtenisse</div>
            <p>
              Gebeurtenisse A en B is <strong>wedersyds uitsluitend</strong> as hulle nie <em>gelyktydig kan plaasvind</em> nie.<br>
              <span class="math">A ∩ B = ∅</span>, dus <span class="math">P(A ∩ B) = 0</span><br>
              Daarom: <span class="math">P(A ∪ B) = P(A) + P(B)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Komplementêre gebeurtenisse</div>
            <p>
              Die komplement van A (geskryf A') bevat alle uitkomste wat NIE in A is nie.<br>
              <span class="math">P(A) + P(A') = 1</span><br>
              <span class="math">P(A') = 1 − P(A)</span><br><br>
              Dit is baie nuttig vir waarskynlikheidsprobleme oor "ten minste een": <span class="math">P(ten minste een) = 1 − P(geeneen)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Ten minste een</div>
            <p>Twee dobbelstene word gegooi. P(ten minste een 6)?<br>
            P(geen 6 op een dobbelsteen) = 5/6<br>
            P(geen 6's op enigeen) = (5/6)² = 25/36<br>
            P(ten minste een 6) = 1 − 25/36 = 11/36</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Waarskynlikheidsidentiteite</div>
            <p>
              <span class="math">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</span> (algemene optelreël)<br>
              As wedersyds uitsluitend: <span class="math">P(A ∪ B) = P(A) + P(B)</span><br>
              <span class="math">P(A') = 1 − P(A)</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Waarskynlikheidsidentiteit-berekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer bekende waarskynlikhede in — los die ontbrekende een op met die optelreël of komplement.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g10c14t2add" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Optelreël</button>
              <button id="g10c14t2comp" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Komplement</button>
              <button id="g10c14t2atleast" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Ten minste een</button>
            </div>
            <div id="g10c14t2addPanel">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">Voer enige 3 van die 4 waardes in — laat die onbekende leeg of as 0.</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A)</div><input id="g10c14t2pa" type="number" step="0.01" min="0" max="1" value="0.6" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(B)</div><input id="g10c14t2pb" type="number" step="0.01" min="0" max="1" value="0.4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A∩B)</div><input id="g10c14t2pab" type="number" step="0.01" min="0" max="1" value="0.2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A∪B)</div><input id="g10c14t2paub" type="number" step="0.01" min="0" max="1" placeholder="?" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c14t2addBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
              </div>
            </div>
            <div id="g10c14t2compPanel" style="display:none;">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A)</div><input id="g10c14t2pcomp" type="number" step="0.01" min="0" max="1" value="0.35" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c14t2compBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
              </div>
            </div>
            <div id="g10c14t2atlPanel" style="display:none;">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">P(ten minste een sukses) = 1 − P(geeneen). Voer P(sukses in een poging) en die aantal onafhanklike pogings in.</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(sukses)</div><input id="g10c14t2pp" type="number" step="0.01" min="0.01" max="0.99" value="0.35" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Pogings (n)</div><input id="g10c14t2pn" type="number" value="2" min="1" max="10" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c14t2atlBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
              </div>
            </div>
            <div id="g10c14t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function setMode(m){
                const modes=['add','comp','atl'];
                const panels={add:'g10c14t2addPanel',comp:'g10c14t2compPanel',atl:'g10c14t2atlPanel'};
                const btns={add:'g10c14t2add',comp:'g10c14t2comp',atleast:'g10c14t2atleast'};
                modes.forEach(x=>{document.getElementById(panels[x]).style.display=x===m?'':'none';});
                ['add','comp','atleast'].forEach(id=>{
                  const b=document.getElementById('g10c14t2'+id);
                  if((id==='atl'?'atl':id)===m){b.style.background='linear-gradient(135deg,#4338ca,#6366f1)';b.style.color='#fff';b.style.border='none';}
                  else{b.style.background='rgba(99,102,241,0.15)';b.style.color='#a5b4fc';b.style.border='1px solid rgba(99,102,241,0.30)';}
                });
                document.getElementById('g10c14t2Out').innerHTML='';
              }
              function gv(id){const v=parseFloat(document.getElementById(id).value);return isNaN(v)?null:v;}
              document.getElementById('g10c14t2add').addEventListener('click',()=>setMode('add'));
              document.getElementById('g10c14t2comp').addEventListener('click',()=>setMode('comp'));
              document.getElementById('g10c14t2atleast').addEventListener('click',()=>setMode('atl'));
              document.getElementById('g10c14t2addBtn').addEventListener('click',()=>{
                const pa=gv('g10c14t2pa'),pb=gv('g10c14t2pb'),pab=gv('g10c14t2pab'),paub=gv('g10c14t2paub');
                const out=document.getElementById('g10c14t2Out');
                const rule='P(A∪B) = P(A) + P(B) − P(A∩B)';
                const nullCount=[pa,pb,pab,paub].filter(x=>x===null||x===0).length;
                // bepaal watter een om op te los: as paub ontbreek/plekhouer is
                const inp=document.getElementById('g10c14t2paub');
                if(!inp.value||inp.value===''){
                  if(pa===null||pb===null||pab===null){out.innerHTML='<span style="color:#fca5a5;">Voer P(A), P(B), en P(A∩B) in om P(A∪B) te vind.</span>';return;}
                  const res=pa+pb-pab;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+rule+'<br>= '+pa+' + '+pb+' − '+pab+' = </span><span style="color:#6ee7b7;">P(A∪B) = '+f(res)+'</span><br>'+(pab===0?'<span style="color:#fcd34d;">Gebeurtenisse is wedersyds uitsluitend (P(A∩B)=0)</span>':'');
                } else if(!document.getElementById('g10c14t2pab').value||pab===null){
                  if(pa===null||pb===null||paub===null){out.innerHTML='<span style="color:#fca5a5;">Voer P(A), P(B), P(A∪B) in om P(A∩B) te vind.</span>';return;}
                  const res=pa+pb-paub;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+rule+' → P(A∩B) = P(A)+P(B)−P(A∪B)<br>= '+pa+'+'+pb+'−'+paub+' = </span><span style="color:#6ee7b7;">P(A∩B) = '+f(res)+'</span>';
                } else {
                  if(pa===null||pb===null||pab===null||paub===null){out.innerHTML='<span style="color:#fca5a5;">Laat presies een veld leeg om dit op te los.</span>';return;}
                  const lhs=paub,rhs=pa+pb-pab;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Kontroleer: '+pa+'+'+pb+'−'+pab+' = </span><span style="color:'+(Math.abs(lhs-rhs)<0.001?'#6ee7b7':'#fca5a5')+'">'+(Math.abs(lhs-rhs)<0.001?'✓ Konsekwent ('+f(rhs)+')':'✗ Onkonsekwent: LK='+f(lhs)+' RK='+f(rhs))+'</span>';
                }
              });
              document.getElementById('g10c14t2compBtn').addEventListener('click',()=>{
                const p=gv('g10c14t2pcomp');
                const out=document.getElementById('g10c14t2Out');
                if(p===null||p<0||p>1){out.innerHTML='<span style="color:#fca5a5;">Voer \'n waarskynlikheid tussen 0 en 1 in.</span>';return;}
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">P(A\') = 1 − P(A) = 1 − '+p+' = </span><span style="color:#6ee7b7;">'+f(1-p)+'</span>';
              });
              document.getElementById('g10c14t2atlBtn').addEventListener('click',()=>{
                const p=gv('g10c14t2pp'),n=parseInt(document.getElementById('g10c14t2pn').value);
                const out=document.getElementById('g10c14t2Out');
                if(p===null||p<=0||p>=1||isNaN(n)||n<1){out.innerHTML='<span style="color:#fca5a5;">Voer \'n geldige sukseswaarskynlikheid in (0–1 uitsluitend) en ten minste 1 poging.</span>';return;}
                const pNone=Math.pow(1-p,n);
                const pAtLeast=1-pNone;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">P(geeneen) = (1−'+p+')^'+n+' = ('+f(1-p)+')^'+n+' = </span><span style="color:#fcd34d;">'+f(pNone)+'</span><br>'
                  +'<span style="color:rgba(221,225,240,0.50);">P(ten minste een) = 1 − '+f(pNone)+' = </span><span style="color:#6ee7b7;">'+f(pAtLeast)+'</span>';
              });
              setMode('add');
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir probleme oor "ten minste een", gebruik altyd die komplement: P(ten minste een) = 1 − P(geeneen). Dit is baie vinniger as om al die individuele gevalle op te tel.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Gebeurtenisse A en B is wedersyds uitsluitend. P(A) = 0.3, P(B) = 0.4. P(A∪B) =",
          options: ["0.12", "0.7", "1.0", "0.58"],
          answer: 1,
          topic: "Wedersyds uitsluitende en komplementêre gebeurtenisse"
        },
        {
          type: "mc",
          text: "As P(A∩B) = 0, is die gebeurtenisse:",
          options: ["Komplementêr", "Wedersyds uitsluitend", "Ewe waarskynlik", "Onafhanklik"],
          answer: 1,
          topic: "Wedersyds uitsluitende en komplementêre gebeurtenisse"
        },
        {
          type: "input",
          text: "P(gebeurtenis) = 0.35. Bepaal P(komplement).",
          answer: "0.65",
          altAnswers: ["0,65"],
          topic: "Wedersyds uitsluitende en komplementêre gebeurtenisse"
        },
        {
          type: "mc",
          text: "Drie muntstukke word gegooi. P(ten minste een kop) =",
          options: ["½", "⅞", "¾", "⅜"],
          answer: 1,
          topic: "Wedersyds uitsluitende en komplementêre gebeurtenisse"
        },
        {
          type: "mc",
          text: "Watter paar gebeurtenisse is wedersyds uitsluitend?",
          options: ["Om 'n 3 te gooi en om 'n onewe getal te gooi", "Om 'n rooi kaart te trek en om 'n heer te trek", "Om 'n ewe getal te gooi en om 'n 4 te gooi", "Om kop te kry en om munt te kry met een muntgooi"],
          answer: 3,
          topic: "Wedersyds uitsluitende en komplementêre gebeurtenisse"
        },
        {
          type: "input",
          text: "'n Bevooroordeelde muntstuk het P(kop) = 0.3. Dit word 3 keer gegooi. Bepaal P(ten minste een kop), korrek tot 3 desimale plekke.",
          answer: "0.657",
          altAnswers: ["0,657"],
          topic: "Wedersyds uitsluitende en komplementêre gebeurtenisse"
        },
        {
          type: "input",
          text: "P(A) = 0.45, P(B) = 0.35, en A en B is wedersyds uitsluitend. Bepaal P(A' ∩ B').",
          answer: "0.2",
          altAnswers: ["0,2", "0.20", "0,20"],
          topic: "Wedersyds uitsluitende en komplementêre gebeurtenisse"
        }
      ]
    },
    {
      id: 1402,
      chapter: 14,
      name: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid",
      fullName: "Vergelyking van eksperimentele relatiewe frekwensie met teoretiese waarskynlikheid",
      lesson: {
        heading: "Relatiewe frekwensie en teoretiese waarskynlikheid",
        sub: "Hoofstuk 14 · Onderwerp 3",
        body: `
          <p><strong>Teoretiese waarskynlikheid</strong> word bereken deur te redeneer oor ewe waarskynlike uitkomste. <strong>Relatiewe frekwensie</strong> (eksperimentele waarskynlikheid) word gemeet deur werklik 'n eksperiment uit te voer.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Definisies</div>
            <p>
              <strong>Teoretiese waarskynlikheid:</strong> <span class="math">P(E) = n(E)/n(S)</span> — gebaseer op die tel van uitkomste.<br>
              <strong>Relatiewe frekwensie:</strong> <span class="math">RF(E) = (aantal kere wat E voorgekom het)/(totale aantal pogings)</span> — gebaseer op data van 'n eksperiment.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Die wet van groot getalle</div>
            <p>Soos die aantal pogings toeneem, neig die relatiewe frekwensie van 'n gebeurtenis om nader aan sy teoretiese waarskynlikheid te kom. Met slegs 'n paar pogings kan die relatiewe frekwensie heelwat van die teoretiese waarde verskil — dit is normaal, nie 'n fout nie.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>'n Regverdige muntstuk word 10 keer gegooi en gee 7 koppe. Relatiewe frekwensie van koppe = 7/10 = 0.7 — heelwat van die teoretiese P(kop) = 0.5 af.<br>
            Dieselfde muntstuk, 1 000 keer gegooi, gee 508 koppe. Relatiewe frekwensie = 508/1000 = 0.508 — baie nader aan 0.5, soos verwag uit die wet van groot getalle.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Muntgooi-simulator — Relatiewe frekwensie teenoor teoreties</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Simuleer die gooi van 'n regverdige muntstuk baie keer — kyk hoe die relatiewe frekwensie van koppe naby 0.5 vestig soos pogings toeneem.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Aantal gooie</div><input id="g10c14rfN" type="number" value="50" min="1" max="10000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c14rfBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Gooi muntstukke</button>
            </div>
            <div id="g10c14rfOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function run(){
                const N=parseInt(document.getElementById('g10c14rfN').value);
                const out=document.getElementById('g10c14rfOut');
                if(isNaN(N)||N<1||N>10000){out.innerHTML='<span style="color:#fca5a5;">Voer tussen 1 en 10 000 gooie in.</span>';return;}
                let heads=0;
                for(let i=0;i<N;i++){ if(Math.random()<0.5) heads++; }
                const rf=heads/N;
                const diff=Math.abs(rf-0.5);
                let html='<span style="color:rgba(221,225,240,0.50);">'+N+' gooie gesimuleer: </span><span style="color:#fcd34d;">'+heads+' koppe, '+(N-heads)+' munte</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Relatiewe frekwensie van koppe = '+heads+'/'+N+' = </span><span style="color:#6ee7b7;">'+f(rf)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Teoretiese P(kop) = </span><span style="color:#fcd34d;">0.5000</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Verskil = </span><span style="color:'+(diff<0.05?'#6ee7b7':'#fca5a5')+'">'+f(diff)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.45);font-size:12px;">Probeer die aantal gooie vermeerder — die relatiewe frekwensie behoort nader aan 0.5 te dryf.</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c14rfBtn').addEventListener('click',run);
              document.getElementById('g10c14rfN').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Sê nooit dat relatiewe frekwensie na 'n klein aantal pogings presies met teoretiese waarskynlikheid moet ooreenstem nie — variasie word verwag en verminder slegs (gemiddeld) soos pogings toeneem.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Dobbelsteen word 60 keer gegooi en land 8 keer op 6. Die relatiewe frekwensie om 'n 6 te gooi is:",
          options: ["1/6", "8/60", "6/60", "1/8"],
          answer: 1,
          topic: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid"
        },
        {
          type: "mc",
          text: "Soos die aantal pogings in 'n eksperiment toeneem, neig relatiewe frekwensie om:",
          options: ["Verder van die teoretiese waarskynlikheid te beweeg", "Nader aan die teoretiese waarskynlikheid te kom", "Presies dieselfde te bly", "Presies 1 te word"],
          answer: 1,
          topic: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid"
        },
        {
          type: "input",
          text: "'n Wentelskyf word 200 keer gedraai en land 55 keer op rooi. Bepaal die relatiewe frekwensie van rooi (as 'n desimaal, tot 2 desimale plekke).",
          answer: "0.28",
          altAnswers: ["0,28"],
          topic: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid"
        },
        {
          type: "mc",
          text: "'n Muntstuk word 5 keer gegooi en gee 4 koppe. Hierdie groot afwyking van 0.5 relatiewe frekwensie:",
          options: ["Bewys dat die muntstuk oneerlik is", "Is normaal vir 'n klein aantal pogings", "Beteken die muntstuk het geen teoretiese waarskynlikheid nie", "Behoort nooit met 'n regverdige muntstuk te gebeur nie"],
          answer: 1,
          topic: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid"
        },
        {
          type: "mc",
          text: "Watter een beskryf teoretiese waarskynlikheid die beste?",
          options: ["Gebaseer op die tel van ewe waarskynlike uitkomste", "Slegs gebaseer op vorige eksperimentele data", "Altyd gelyk aan relatiewe frekwensie", "Geld slegs vir muntstukke en dobbelstene"],
          answer: 0,
          topic: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid"
        },
        {
          type: "input",
          text: "'n Dobbelsteen word 40 keer in die oggend gegooi en land 9 keer op 6, en dan 60 keer in die middag gegooi en land 11 keer op 6. Bepaal die algehele relatiewe frekwensie om 'n 6 vir die hele dag te gooi, as 'n desimaal tot 2 desimale plekke.",
          answer: "0.20",
          altAnswers: ["0,20", "0.2", "0,2"],
          topic: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid"
        },
        {
          type: "input",
          text: "'n Regverdige wentelskyf het 5 gelyke sektore. Dit word 200 keer gedraai. Bepaal die verwagte (teoretiese) aantal kere wat dit op 'n bepaalde sektor land.",
          answer: "40",
          topic: "Relatiewe frekwensie teenoor teoretiese waarskynlikheid"
        }
      ]
    },
    {
      id: 1403,
      chapter: 14,
      name: "Twee-rigting-tabelle",
      fullName: "Gebruik van twee-rigting-tabelle (kontingensietabelle) om waarskynlikheidsprobleme op te los",
      lesson: {
        heading: "Twee-rigting-tabelle",
        sub: "Hoofstuk 14 · Onderwerp 4",
        body: `
          <p>'n <strong>Twee-rigting-tabel</strong> (kontingensietabel) orden data volgens twee kategorieë gelyktydig — 'n alternatief vir 'n Venn-diagram wat baie leerders makliker vind om in te vul en te lees.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Struktuur van 'n twee-rigting-tabel</div>
            <p>
              Rye verteenwoordig een kategorie (bv. Manlik/Vroulik), kolomme verteenwoordig 'n ander (bv. Geslaag/Gedruip). Ry- en kolomtotale word bygevoeg, met 'n algehele totaal in die regter onderste hoek.<br>
              Elke seltelling kan in 'n waarskynlikheid omgeskakel word deur dit deur die algehele totaal te deel.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>'n Opname van 100 leerders oor of hulle 'n selfoon (C) en 'n tablet (T) besit:</p>
            <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:13px;color:rgba(221,225,240,0.85);">
              <tr style="background:rgba(99,102,241,0.15);"><th style="padding:6px;border:1px solid rgba(99,102,241,0.3);"></th><th style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Tablet</th><th style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Geen tablet</th><th style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Totaal</th></tr>
              <tr><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Selfoon</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">32</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">40</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">72</td></tr>
              <tr><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Geen selfoon</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">8</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">20</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">28</td></tr>
              <tr><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Totaal</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">40</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">60</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">100</td></tr>
            </table>
            <p>P(het albei) = 32/100 = 0.32. P(het 'n selfoon) = 72/100 = 0.72. P(het 'n tablet OF selfoon) = (72+40−32)/100 = 80/100 = 0.8</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Twee-rigting-tabelbouer</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die twee "albei/geeneen/slegs"-tellings in — die tabel voltooi homself met totale en sleutelwaarskynlikhede.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Slegs A</div><input id="g10c14twAonly" type="number" value="40" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Slegs B</div><input id="g10c14twBonly" type="number" value="8" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Albei A en B</div><input id="g10c14twBoth" type="number" value="32" min="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Geeneen</div><input id="g10c14twNeither" type="number" value="20" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <button id="g10c14twBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bou tabel</button>
            </div>
            <div id="g10c14twOut" style="font-size:14px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fr(n,d){if(d===0)return'0';const g=gcd(n,d);return n/g+'/'+d/g;}
              function gcd(a,b){return b===0?a:gcd(b,a%b);}
              function run(){
                const aOnly=parseInt(document.getElementById('g10c14twAonly').value);
                const bOnly=parseInt(document.getElementById('g10c14twBonly').value);
                const both=parseInt(document.getElementById('g10c14twBoth').value);
                const neither=parseInt(document.getElementById('g10c14twNeither').value);
                const out=document.getElementById('g10c14twOut');
                if([aOnly,bOnly,both,neither].some(v=>isNaN(v)||v<0)){out.innerHTML='<span style="color:#fca5a5;">Voer nie-negatiewe heelgetalle in al vier blokkies in.</span>';return;}
                const totalA=aOnly+both, totalB=bOnly+both, totalNotA=bOnly+neither, totalNotB=aOnly+neither;
                const grand=aOnly+bOnly+both+neither;
                let html='<table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:13px;">';
                html+='<tr style="background:rgba(99,102,241,0.15);"><th style="padding:5px;border:1px solid rgba(99,102,241,0.3);"></th><th style="padding:5px;border:1px solid rgba(99,102,241,0.3);">B</th><th style="padding:5px;border:1px solid rgba(99,102,241,0.3);">Nie B nie</th><th style="padding:5px;border:1px solid rgba(99,102,241,0.3);">Totaal</th></tr>';
                html+='<tr><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);">A</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#6ee7b7;">'+both+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#6ee7b7;">'+aOnly+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#fcd34d;">'+totalA+'</td></tr>';
                html+='<tr><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);">Nie A nie</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#6ee7b7;">'+bOnly+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#6ee7b7;">'+neither+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#fcd34d;">'+totalNotB+'</td></tr>';
                html+='<tr><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);">Totaal</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#fcd34d;">'+totalB+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#fcd34d;">'+totalNotA+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#a5b4fc;">'+grand+'</td></tr>';
                html+='</table>';
                if(grand>0){
                  html+='<span style="color:rgba(221,225,240,0.50);">P(A) = '+fr(totalA,grand)+'  P(B) = '+fr(totalB,grand)+'  P(A en B) = '+fr(both,grand)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">P(A of B) = '+fr(totalA+totalB-both,grand)+'</span>  <span style="color:rgba(221,225,240,0.50);">P(geeneen) = '+fr(neither,grand)+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c14twBtn').addEventListener('click',run);
              ['g10c14twAonly','g10c14twBonly','g10c14twBoth','g10c14twNeither'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Twee-rigting-tabelle en Venn-diagramme wys presies dieselfde inligting in verskillende uitlegte — as 'n vraag jou een gee, kan jy dit altyd as die ander herteken, watter een ook al jou help om helderder te dink.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In 'n twee-rigting-tabel verteenwoordig die sel regs onder altyd:",
          options: ["P(A en B)", "Die algehele totaal (n(S))", "P(geeneen)", "Die rytotaal vir A"],
          answer: 1,
          topic: "Twee-rigting-tabelle"
        },
        {
          type: "mc",
          text: "'n Twee-rigting-tabel wys: 15 besit slegs 'n hond, 10 besit slegs 'n kat, 5 besit albei, 20 besit geen van die twee nie. Totaal ondervra:",
          options: ["50", "30", "45", "40"],
          answer: 0,
          topic: "Twee-rigting-tabelle"
        },
        {
          type: "input",
          text: "Gebruik die tabel in die vorige vraag (15 slegs hond, 10 slegs kat, 5 albei, 20 geeneen), bepaal P(besit 'n hond).",
          answer: "0.4",
          altAnswers: ["0,4", "2/5"],
          topic: "Twee-rigting-tabelle"
        },
        {
          type: "mc",
          text: "'n Twee-rigting-tabel en 'n Venn-diagram vir dieselfde data sal altyd gee:",
          options: ["Verskillende waarskynlikhede", "Dieselfde waarskynlikhede, net anders vertoon", "Die Venn-diagram is altyd akkurater", "Twee-rigting-tabelle kan nie deursnee wys nie"],
          answer: 1,
          topic: "Twee-rigting-tabelle"
        },
        {
          type: "mc",
          text: "In 'n twee-rigting-tabel met rye Manlik/Vroulik en kolomme Geslaag/Gedruip, watter Venn-streek stem ooreen met die sel 'Vroulik EN Geslaag'?",
          options: ["Slegs Vroulik", "Slegs Geslaag", "Die deursnee van Vroulik en Geslaag", "Die komplement van Vroulik"],
          answer: 2,
          topic: "Twee-rigting-tabelle"
        },
        {
          type: "input",
          text: "'n Twee-rigting-tabel het: Manlik & Geslaag = 24, Manlik & Gedruip = x, Vroulik & Geslaag = 18, Vroulik & Gedruip = 12. As die totaal ondervra 70 is, bepaal x.",
          answer: "16",
          topic: "Twee-rigting-tabelle"
        },
        {
          type: "input",
          text: "In 'n twee-rigting-tabel is 45 van die 80 leerders wat ondervra is, in die 'Sport'-kolom, en 20 van hierdie 45 is ook in die 'Instrument'-ry. Bepaal P(Geen instrument EN Sport), as 'n breuk in eenvoudigste vorm.",
          answer: "5/16",
          altAnswers: ["0.3125", "0,3125"],
          topic: "Twee-rigting-tabelle"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 14 Werkboek — Waarskynlikheid",
    questions: [
      {
        number: 1,
        text: "'n Opname van 50 Graad 10-leerders het oor sport gevra. 28 speel sokker (S), 20 speel krieket (K), en 8 speel albei.",
        parts: [
          { label: "a", text: "Teken 'n Venn-diagram en vul al die streke in.", marks: 3 },
          { label: "b", text: "Hoeveel speel geen van die sport nie?", marks: 2 },
          { label: "c", text: "Bepaal P(slegs K).", marks: 2 },
          { label: "d", text: "Bepaal P(S ∪ K).", marks: 2 },
          { label: "e", text: "Is S en K wedersyds uitsluitend? Verduidelik.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "'n Kaart word uit 'n standaardpak van 52 kaarte getrek.",
        parts: [
          { label: "a", text: "Bepaal P(hart).", marks: 1 },
          { label: "b", text: "Bepaal P(prentkaart: J, Q, of K).", marks: 2 },
          { label: "c", text: "Bepaal P(hart OF prentkaart).", marks: 3 },
          { label: "d", text: "Bepaal P(nie 'n hart nie).", marks: 1 }
        ]
      },
      {
        number: 3,
        text: "Die waarskynlikheid dat dit op enige dag reën is 0.35. Vir twee onafhanklike dae:",
        parts: [
          { label: "a", text: "Bepaal P(reën op albei dae).", marks: 2 },
          { label: "b", text: "Bepaal P(ten minste een dag met reën).", marks: 3 }
        ]
      },
      {
        number: 4,
        text: "Die twee-rigting-tabel hieronder wys die resultate van 'n opname van 120 leerders oor of hulle 'n musiekinstrument bespeel (Instrument) en of hulle aan sport deelneem (Sport):<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'></th><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Sport</th><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Geen sport</th><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Totaal</th></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Instrument</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>18</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>12</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>30</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Geen instrument</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>54</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>36</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>90</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Totaal</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>72</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>48</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>120</td></tr></table>",
        parts: [
          { label: "a", text: "Lees van die tabel af: hoeveel leerders speel beide 'n instrument en 'n sport?", marks: 1 },
          { label: "b", text: "Bepaal P(speel 'n sport).", marks: 2 },
          { label: "c", text: "Bepaal P(speel 'n instrument EN 'n sport).", marks: 2 },
          { label: "d", text: "Gebruik die optelreël, met waardes van die tabel afgelees, om P(speel 'n instrument OF 'n sport) te bepaal.", marks: 3 },
          { label: "e", text: "Bepaal P(speel geeneen nie).", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Slegs S: 20; albei: 8; slegs K: 12; geeneen: 10",
        b: "50−(20+8+12) = 10",
        c: "12/50 = 6/25",
        d: "40/50 = 4/5",
        e: "Nee — 8 leerders speel albei, dus is die gebeurtenisse nie wedersyds uitsluitend nie"
      },
      2: {
        a: "13/52 = 1/4",
        b: "12/52 = 3/13",
        c: "P(H∪F)=P(H)+P(F)−P(H∩F)=13/52+12/52−3/52=22/52=11/26",
        d: "3/4"
      },
      3: {
        a: "0.35×0.35=0.1225",
        b: "1−P(geen reën)²=1−(0.65)²=1−0.4225=0.5775"
      },
      4: {
        a: "18 (die Instrument-en-Sport-sel)",
        b: "P(Sport) = 72/120 = 3/5 = 0.6",
        c: "P(Instrument ∩ Sport) = 18/120 = 3/20 = 0.15",
        d: "P(Instrument) = 30/120 = 0.25; P(Instrument ∪ Sport) = P(Instrument)+P(Sport)−P(Instrument∩Sport) = 0.25+0.6−0.15 = 0.7",
        e: "P(geeneen) = 36/120 = 0.3"
      }
    }
  }
});
