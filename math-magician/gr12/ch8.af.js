// Math Magician — Graad 12, Hoofstuk 8
// Euklidiese Meetkunde — Proporsie, Gelykvormigheid, Stelling van Pythagoras

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 800,
      chapter: 8,
      name: "Eweredigheid, veelhoeke & driehoekstellings",
      fullName: "Verhouding en eweredigheid, veelhoeke, en die eweredigheidstelling",
      lesson: {
        heading: "Eweredigheid en die eweredigheidstelling",
        sub: "Hoofstuk 8 · Onderwerp 1",
        body: `
          <p>Graad 12 Euklidiese Meetkunde stel formele bewyse van die eweredigheid- en gelykvormigheidstellings bekend — die diepste vlak van meetkundige redenering in die CAPS-kurrikulum.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Eweredigheidstelling (ET)</div>
            <p>
              As 'n lyn parallel aan een sy van 'n driehoek getrek word, verdeel dit die ander twee sye eweredig.<br><br>
              In △ABC met DE ∥ BC:<br>
              <span class="math">AD/DB = AE/EC</span><br><br>
              Omgekeerde: As AD/DB = AE/EC, dan DE ∥ BC.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Middelpuntstelling (herroep)</div>
            <p>
              Die lyn wat die middelpunte van twee sye van 'n driehoek verbind, is parallel aan die derde sy en die helfte van sy lengte.<br>
              (Dit is 'n spesiale geval van die ET waar AD/DB = 1)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Gebruik van die ET</div>
            <p>In △PQR, ST ∥ QR, PS = 4, SQ = 6, TR = 9.<br>
            Volgens die ET: PS/SQ = PT/TR<br>
            4/6 = PT/9<br>
            PT = 6</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Eweredigheid in veelhoeke</div>
            <p>
              Gelykvormige veelhoeke het eweredige sye en gelyke hoeke.<br>
              Verhouding van oppervlaktes van gelykvormige figure = (verhouding van sye)²<br>
              Verhouding van volumes van gelykvormige voorwerpe = (verhouding van sye)³
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 ET- & Eweredigheid-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">In △ABC met DE ∥ BC: AD/DB = AE/EC. Voer enige drie in — vind die vierde. Sien ook oppervlakteverhouding.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">AD</div><input id="g12c8AD" type="number" value="3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">DB</div><input id="g12c8DB" type="number" value="5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">AE</div><input id="g12c8AE" type="number" value="6" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">EC (leeg=vind)</div><input id="g12c8EC" type="text" placeholder="?" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c8Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Los op</button>
            </div>
            <div id="g12c8Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){const v=parseFloat(document.getElementById(id).value);return isNaN(v)?null:v;}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const AD=gv('g12c8AD'),DB=gv('g12c8DB'),AE=gv('g12c8AE');
                const ECraw=document.getElementById('g12c8EC').value.trim();
                const EC=ECraw===''||ECraw==='?'?null:parseFloat(ECraw);
                const out=document.getElementById('g12c8Out');
                let html='';
                if(AD&&DB&&AE&&!EC){
                  const ec=AE*DB/AD;
                  document.getElementById('g12c8EC').value=f4(ec);
                  html='<span style="color:rgba(221,225,240,0.50);">AD/DB = AE/EC → EC = AE×DB/AD</span><br>'+
                    '<span style="color:rgba(221,225,240,0.50);">EC = '+AE+'×'+DB+'/'+AD+'</span><br>'+
                    '<span style="color:#6ee7b7;">EC = '+f4(ec)+'</span>';
                  const ratio=AD/DB,ratioArea=ratio*ratio;
                  html+='<br><span style="color:rgba(221,225,240,0.50);">Gelykvormigheidsverhouding △ADE:△ABC = AD/AB = '+AD+'/'+(AD+DB)+' = '+f4(AD/(AD+DB))+'</span>';
                  html+='<br><span style="color:#fcd34d;">Oppervlakteverhouding △ADE:△ABC = ('+f4(AD/(AD+DB))+')² = '+f4((AD/(AD+DB))*(AD/(AD+DB)))+'</span>';
                } else if(AD&&DB&&AE&&EC){
                  const lhs=AD/DB,rhs=AE/EC;
                  const isParallel=Math.abs(lhs-rhs)<0.0001;
                  html='<span style="color:rgba(221,225,240,0.50);">AD/DB = '+f4(lhs)+'   AE/EC = '+f4(rhs)+'</span><br>';
                  html+=isParallel?'<span style="color:#6ee7b7;">✅ DE ∥ BC (verhoudings gelyk — omgekeerde ET)</span>':'<span style="color:#fca5a5;">❌ DE is NIE parallel aan BC nie</span>';
                } else {
                  out.innerHTML="<span style=\"color:#fca5a5;\">Voer AD, DB, AE in en laat EC leeg om dit te vind, of voer al vier in om parallelisme te toets.</span>";return;
                }
                out.innerHTML=html;
              }
              ['g12c8AD','g12c8DB','g12c8AE','g12c8EC'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c8Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "In △ABC, DE ∥ BC, AD = 3, DB = 5. As AE = 6, bepaal EC.", options: ["10", "8", "15", "4"], answer: 0, topic: "Eweredigheid, veelhoeke & driehoekstellings" },
        { type: "mc", text: "Twee gelykvormige driehoeke het sye in verhouding 3:5. Verhouding van hul oppervlaktes:", options: ["3:5", "9:25", "27:125", "6:10"], answer: 1, topic: "Eweredigheid, veelhoeke & driehoekstellings" },
        { type: "input", text: "In △XYZ, MN ∥ YZ, XM = 4, MY = 8, XN = 3. Bepaal NZ.", answer: "6", topic: "Eweredigheid, veelhoeke & driehoekstellings" },
        { type: "mc", text: "Die omgekeerde van die ET sê: as AD/DB = AE/EC in △ABC, dan:", options: ["A, D, B is kollineêr", "DE ∥ BC", "DE = BC/2", "△ADE is gelyksydig"], answer: 1, topic: "Eweredigheid, veelhoeke & driehoekstellings" },
        { type: "mc", text: "Gelykvormige voorwerpe het volumes in verhouding 8:27. Hul oppervlaktes is in verhouding:", options: ["2:3", "4:9", "8:27", "16:81"], answer: 1, topic: "Eweredigheid, veelhoeke & driehoekstellings" },
        { type: "input", text: "In △ABC is D op AB en E op AC met DE ∥ BC. AD = x + 2, DB = x − 1, AE = x + 5, EC = x + 1. Bepaal die waarde van x.", answer: "7", topic: "Eweredigheid, veelhoeke & driehoekstellings" },
        { type: "input", text: "In △ABC, DE ∥ BC met AD = 4 en DB = 6. Die oppervlakte van △ADE is 20 cm². Bepaal die oppervlakte van vierhoek DBCE.", answer: "105", topic: "Eweredigheid, veelhoeke & driehoekstellings" }
      ]
    },
    {
      id: 801,
      chapter: 8,
      name: "Gelykvormigheid & bewyse van die Stelling van Pythagoras",
      fullName: "Gelykvormigheid van driehoeke en die bewys van die Stelling van Pythagoras",
      lesson: {
        heading: "Driehoekgelykvormigheid en die Stelling van Pythagoras",
        sub: "Hoofstuk 8 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Gelykvormigheid (|||) — voorwaardes</div>
            <p>
              △ABC ||| △DEF as:<br>
              (HH) Twee pare gelyke hoeke, OF<br>
              (SSS) Al drie pare sye eweredig: AB/DE = BC/EF = AC/DF, OF<br>
              (SHS) Twee sye eweredig met gelyke ingeslote hoek<br><br>
              <strong>Belangrik:</strong> In Graad 12 moet jy gelykvormigheid formeel met redes bewys.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Bewys van die Stelling van Pythagoras</div>
            <p>
              Deur gelykvormigheid te gebruik: In reghoekige △ABC met regte hoek by C, teken hoogtelyn CD na AB.<br>
              Dan is △ABC ||| △ACD ||| △CBD (almal HH)<br>
              Uit hierdie gelykvormighede:<br>
              <span class="math">AC² = AB · AD</span> en <span class="math">BC² = AB · DB</span><br>
              Optel: <span class="math">AC² + BC² = AB(AD + DB) = AB² ✓</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Gelykvormigheidsbewys</div>
            <p>In die figuur is ∠BAC = ∠ADC = 90°. Bewys △ABD ||| △CAD.<br><br>
            In △ABD en △CAD:<br>
            ∠ADB = ∠CDA = 90° − ∠D... (gebruik gegewe hoeke stelselmatig)<br>
            ∠ABD = ∠ACD (dieselfde boog) ← gebruik 'n rede vir elke stap</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Gevolg van gelykvormigheid: eweredige sye</div>
            <p>
              Sodra gelykvormigheid bewys is, is ooreenstemmende sye eweredig.<br>
              Skryf altyd: <span class="math">AB/DE = BC/EF = AC/DF</span> (in dieselfde VOLGORDE as die gelykvormigheidstelling)
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Gelykvormigheid- & Oppervlakteverhouding-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer ooreenstemmende sye AB en DE in — vind die gelykvormigheidsverhouding, oppervlakteverhouding, en enige ontbrekende sy.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">AB (△1 sy)</div><input id="g12c8t2ab" type="number" value="6" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">DE (△2 sy)</div><input id="g12c8t2de" type="number" value="9" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Bekende sy (△1)</div><input id="g12c8t2s1" type="number" value="4" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c8t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g12c8t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const AB=gv('g12c8t2ab'),DE=gv('g12c8t2de'),s1=gv('g12c8t2s1');
                const out=document.getElementById('g12c8t2Out');
                if([AB,DE].some(isNaN)||AB<=0||DE<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe AB en DE in.</span>';return;}
                const k=DE/AB;
                const s2=s1*k;
                let html='<span style="color:rgba(221,225,240,0.50);">Gelykvormigheidsverhouding: AB/DE = '+AB+'/'+DE+' = 1:'+f4(k)+'</span><br>';
                html+='<span style="color:#fcd34d;">Oppervlakteverhouding △1 : △2 = 1 : '+f4(k*k)+'   (verhouding van sye)²</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Volumeverhouding (indien 3D): 1 : '+f4(k*k*k)+'   (verhouding van sye)³</span>';
                if(!isNaN(s1)&&s1>0) html+='<br><span style="color:#6ee7b7;">Ooreenstemmende sy in △2: '+f4(s2)+'</span>';
                out.innerHTML=html;
              }
              ['g12c8t2ab','g12c8t2de','g12c8t2s1'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c8t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "△PQR ||| △STU (in daardie volgorde). As PQ = 6, ST = 9, QR = 4, bepaal TU.", options: ["6", "8", "3", "12"], answer: 0, topic: "Gelykvormigheid & bewyse van die Stelling van Pythagoras" },
        { type: "mc", text: "Watter een is voldoende om driehoeke gelykvormig te bewys?", options: ["SSH", "HHH", "SHS eweredig", "Beide B en C"], answer: 3, topic: "Gelykvormigheid & bewyse van die Stelling van Pythagoras" },
        { type: "mc", text: "In reghoekige △ABC (regte hoek by C), ontmoet hoogtelyn CD AB by D. Dan is △ACD ||| △ABC met ooreenstemming:", options: ["A↔A, C↔B, D↔C", "A↔A, C↔C, D↔B", "C↔A, D↔C, A↔B", "A↔A, CD↔BC, AD↔AC"], answer: 0, topic: "Gelykvormigheid & bewyse van die Stelling van Pythagoras" },
        { type: "input", text: "In die Pythagoras-bewys: AC² = AB · AD. As AB = 25 en AD = 9, bepaal AC.", answer: "15", topic: "Gelykvormigheid & bewyse van die Stelling van Pythagoras" },
        { type: "mc", text: "△ABC ||| △PQR. As die oppervlakte van △ABC = 18 cm² en AB/PQ = 1/2, is die oppervlakte van △PQR =", options: ["36 cm²", "72 cm²", "9 cm²", "4.5 cm²"], answer: 1, topic: "Gelykvormigheid & bewyse van die Stelling van Pythagoras" },
        { type: "input", text: "In reghoekige △ABC (regte hoek by C), ontmoet hoogtelyn CD AB by D, met AD = 3 en DB = 12. Bereken AC (met AC² = AB · AD), en laat jou antwoord in eenvoudigste wortelvorm.", answer: "3√5", altAnswers: ["3sqrt5", "3√(5)", "sqrt(45)", "√45"], topic: "Gelykvormigheid & bewyse van die Stelling van Pythagoras" },
        { type: "input", text: "△ABC ||| △DEF. Die oppervlakte van △ABC is 45 cm² en die oppervlakte van △DEF is 20 cm². As BC = 12 cm, bepaal die lengte van EF.", answer: "8", topic: "Gelykvormigheid & bewyse van die Stelling van Pythagoras" }
      ]
    },
    {
      id: 802,
      chapter: 8,
      name: "Gelykvormige veelhoeke & skaalfaktor-vraagstukke",
      fullName: "Nodige en voldoende voorwaardes vir veelhoeke om gelykvormig te wees, en skaalfaktor-vraagstukke",
      lesson: {
        heading: "Gelykvormige veelhoeke en skaalfaktor-vraagstukke",
        sub: "Hoofstuk 8 · Onderwerp 3",
        body: `
          <p>Voordat driehoeke gelykvormig bewys word, hersien Graad 12 presies <strong>wanneer twee veelhoeke</strong> (nie net driehoeke nie) gelykvormig genoem kan word.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Voorwaardes vir gelykvormige veelhoeke</div>
            <p>
              Twee veelhoeke is gelykvormig as en slegs as:<br>
              1. Hul ooreenstemmende hoeke gelyk is, EN<br>
              2. Hul ooreenstemmende sye eweredig is.<br><br>
              <strong>Albei voorwaardes is nodig</strong> vir veelhoeke met meer as 3 sye — anders as driehoeke, waar HH alleen (gelyke hoeke) reeds voldoende is omdat die hoeksom die sye afdwing om eweredig te wees.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Waarom driehoeke spesiaal is</div>
            <p>
              Vir driehoeke dwing gelyke hoeke (HH) outomaties eweredige sye af — dit is NIE waar vir vierhoeke en ander veelhoeke nie.<br>
              Voorbeeld: 'n vierkant en 'n nie-vierkantige reghoek het almal gelyke hoeke (90°) maar is nie gelykvormig nie tensy hul sye ook in dieselfde verhouding is.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Skaalfaktor</div>
            <p>
              Die <strong>skaalfaktor k</strong> is die verhouding van ooreenstemmende lengtes tussen gelykvormige figure.<br>
              Lengtes skaleer met k, oppervlaktes skaleer met k², volumes skaleer met k³.<br><br>
              Om ontbrekende lengtes te vind: vermenigvuldig die ooreenstemmende oorspronklike lengte met die skaalfaktor.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>Twee gelykvormige vyfhoeke het ooreenstemmende sye 6 cm en 15 cm.<br>
            Skaalfaktor k = 15/6 = 2.5<br>
            As die kleiner vyfhoek 'n omtrek van 40 cm en oppervlakte van 60 cm² het, het die groter een:<br>
            Omtrek = 40 × 2.5 = 100 cm<br>
            Oppervlakte = 60 × 2.5² = 60 × 6.25 = 375 cm²</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Algemene fout</div>
            <p>
              Moenie die lineêre skaalfaktor direk op oppervlakte of volume toepas nie — kwadreer dit altyd vir oppervlakte, kubeer dit vir volume.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Skaalfaktor-Verkenner</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer twee ooreenstemmende sye van gelykvormige veelhoeke in, plus 'n bekende omtrek/oppervlakte/volume — skaleer die res.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sy (klein)</div><input id="g12c8t3s1" type="number" value="6" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Sy (groot)</div><input id="g12c8t3s2" type="number" value="15" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Omtrek (klein)</div><input id="g12c8t3p1" type="number" value="40" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Oppervlakte (klein)</div><input id="g12c8t3a1" type="number" value="60" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c8t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Skaleer op</button>
            </div>
            <div id="g12c8t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){const v=parseFloat(document.getElementById(id).value);return isNaN(v)?null:v;}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const s1=gv('g12c8t3s1'),s2=gv('g12c8t3s2'),p1=gv('g12c8t3p1'),a1=gv('g12c8t3a1');
                const out=document.getElementById('g12c8t3Out');
                if(!s1||!s2||s1<=0||s2<=0){out.innerHTML='<span style="color:#fca5a5;">Voer albei positiewe ooreenstemmende sye in.</span>';return;}
                const k=s2/s1;
                let html='<span style="color:rgba(221,225,240,0.50);">Skaalfaktor k = '+s2+'/'+s1+' = '+f4(k)+'</span><br>';
                if(p1) html+='<span style="color:#6ee7b7;">Omtrek (groot) = '+p1+' × '+f4(k)+' = '+f4(p1*k)+'</span><br>';
                if(a1) html+='<span style="color:#fcd34d;">Oppervlakte (groot) = '+a1+' × '+f4(k)+'² = '+f4(a1*k*k)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">(Volume, indien van toepassing, sou skaleer met k³ = '+f4(k*k*k)+')</span>';
                out.innerHTML=html;
              }
              ['g12c8t3s1','g12c8t3s2','g12c8t3p1','g12c8t3a1'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c8t3Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Vir 'n driehoek, watter voorwaarde alleen is voldoende om gelykvormigheid te bewys?", options: ["Eweredige sye slegs", "Gelyke hoeke (HH) slegs", "Gelyke hoeke OF eweredige sye — enige een alleen is voldoende", "Geeneen is ooit voldoende nie"], answer: 2, topic: "Gelykvormige veelhoeke & skaalfaktor-vraagstukke" },
        { type: "mc", text: "'n Vierkant en 'n nie-vierkantige reghoek het albei alle hoeke gelyk aan 90°. Is hulle noodwendig gelykvormig?", options: ["Ja, altyd", "Nee — sye moet ook eweredig wees", "Ja, as omtrekke gelyk is", "Slegs as hulle kongruent is"], answer: 1, topic: "Gelykvormige veelhoeke & skaalfaktor-vraagstukke" },
        { type: "input", text: "Twee gelykvormige sesse hoeke het ooreenstemmende sye 4 cm en 10 cm. Bepaal die skaalfaktor (groot ÷ klein).", answer: "2.5", altAnswers: ["2,5", "5/2"], topic: "Gelykvormige veelhoeke & skaalfaktor-vraagstukke" },
        { type: "mc", text: "Gelykvormige figure het skaalfaktor 3. As die kleiner een oppervlakte 12 cm² het, het die groter een oppervlakte:", options: ["36 cm²", "108 cm²", "15 cm²", "324 cm²"], answer: 1, topic: "Gelykvormige veelhoeke & skaalfaktor-vraagstukke" },
        { type: "mc", text: "Vir veelhoeke met meer as 3 sye, watter stelling is WAAR?", options: ["Gelyke hoeke alleen waarborg gelykvormigheid", "Eweredige sye alleen waarborg gelykvormigheid", "Beide gelyke hoeke ÉN eweredige sye word benodig", "Geen voorwaarde word ooit vereis nie"], answer: 2, topic: "Gelykvormige veelhoeke & skaalfaktor-vraagstukke" },
        { type: "input", text: "Twee gelykvormige trapesiums het oppervlaktes 32 cm² en 200 cm². As die korter parallelle sy van die kleiner trapesium 5 cm is, bepaal die ooreenstemmende sy van die groter trapesium.", answer: "12.5", altAnswers: ["12,5"], topic: "Gelykvormige veelhoeke & skaalfaktor-vraagstukke" },
        { type: "input", text: "Twee gelykvormige silinders (gelykvormige voorwerpe) het volumes 27 cm³ en 216 cm³. As die oppervlak van die kleiner silinder 54 cm² is, bepaal die oppervlak van die groter silinder.", answer: "216", topic: "Gelykvormige veelhoeke & skaalfaktor-vraagstukke" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 8 Werkboek — Euklidiese Meetkunde",
    questions: [
      { number: 1, text: "In △ABC is D op AB en E op AC sodat DE ∥ BC. AD = 2x − 3, DB = x + 1, AE = 3x − 2, EC = 2x + 2.", parts: [
        { label: "a", text: "Gebruik die ET om 'n vergelyking te skryf.", marks: 2 },
        { label: "b", text: "Los op vir x.", marks: 3 },
        { label: "c", text: "Bepaal AD en DB.", marks: 2 }
      ]},
      { number: 2, text: "Bewys die volgende: In △ABC is D op AB en E op AC met AD/DB = AE/EC. Bewys DE ∥ BC. (Bewys die omgekeerde van die ET)", parts: [
        { label: "a", text: "Gee die gegewe en wat bewys moet word.", marks: 2 },
        { label: "b", text: "Skryf die bewys met behulp van konstruksie (teken DE' ∥ BC en toon E' = E).", marks: 6 }
      ]},
      { number: 3, text: "In die figuur is ∠BAC = 90° en AD ⊥ BC.", parts: [
        { label: "a", text: "Bewys △ABD ||| △CAD.", marks: 4 },
        { label: "b", text: "Bewys dus dat AB² = BD · BC.", marks: 3 },
        { label: "c", text: "As BD = 4 en DC = 9, bepaal AB en AC.", marks: 4 }
      ]}
    ],
    answers: {
      1: { a: "(2x−3)/(x+1)=(3x−2)/(2x+2)", b: "(2x−3)(2x+2)=(3x−2)(x+1)→4x²−2x−6=3x²+x−2→x²−3x−4=0→(x−4)(x+1)=0→x=4", c: "AD=5, DB=5" },
      2: { a: "Gegee: AD/DB=AE/EC; TB: DE∥BC", b: "Teken DE'∥BC; volgens ET: AD/DB=AE'/E'C; maar AD/DB=AE/EC(gegewe)→AE'/E'C=AE/EC→E'=E→DE∥BC ✓" },
      3: { a: "In △ABD en △CAD: ∠ADB=∠ADC=90°; ∠ABD=∠CAD(hoeke van△BAC som: ∠B=90°−∠BAD=∠CAD); ∴△ABD|||△CAD(HH)", b: "AB/CB=BD/AB→AB²=BD·CB", c: "BC=13; AB²=4×13=52→AB=2√13; AC²=9×13=117→AC=3√13" }
    }
  }
});
