// Math Magician — Grade 10, Hoofstuk 7 data (Afrikaans)
// Euklidiese meetkunde Deel 1

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 700,
      chapter: 7,
      name: "Driehoeke",
      fullName: "Driehoek-eienskappe, kongruensie, en gelykvormigheid",
      lesson: {
        heading: "Driehoeke — eienskappe, kongruensie, en gelykvormigheid",
        sub: "Hoofstuk 7 · Onderwerp 1",
        body: `
          <p>In Graad 10 beweeg Euklidiese Meetkunde van waarneming na <strong>bewys deur stellings</strong>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Driehoek-hoeksom & buitehoek</div>
            <p>
              Die som van binnehoeke van 'n driehoek = 180°.<br>
              'n Buitehoek = som van die twee nie-aangrensende binnehoeke.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Kongruente driehoeke (≅)</div>
            <p>Twee driehoeke is kongruent as ooreenstemmende sye en hoeke gelyk is. Voorwaardes:<br>
            <strong>SSS</strong> — drie sye<br>
            <strong>SHS</strong> — twee sye en ingeslote hoek<br>
            <strong>HHS</strong> — twee hoeke en ooreenstemmende sy<br>
            <strong>RSS</strong> — regte hoek, skuinssy, sy</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Gelykvormige driehoeke (|||)</div>
            <p>Twee driehoeke is gelykvormig as:<br>
            • Ooreenstemmende hoeke gelyk is (HH of HHH), OF<br>
            • Ooreenstemmende sye eweredig is (SSS-eweredigheid)<br><br>
            As △ABC ||| △DEF met verhouding k, dan is ooreenstemmende sye in verhouding k en oppervlaktes in verhouding k².</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bewys gelykvormigheid</div>
            <p>In △PQR en △PST is ∠P gemeenskaplik en ∠PQR = ∠PST. Bewys △PQR ||| △PST.<br><br>
            In △PQR en △PST:<br>
            ∠P = ∠P (gemeenskaplik)<br>
            ∠PQR = ∠PST (gegee)<br>
            ∴ △PQR ||| △PST (HH)</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Driehoek-hoekberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Voer enige twee hoeke in — vind die derde. Of voer 'n buitehoek en een nie-aangrensende binnehoek in.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Modus</div>
                <select id="g10c7mode"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="interior">Binnehoeke</option>
                  <option value="exterior">Buitehoek</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;" id="g10c7l1">∠A</div>
                <input id="g10c7a1" type="number" value="52" min="0" max="180"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;" id="g10c7l2">∠B</div>
                <input id="g10c7a2" type="number" value="73" min="0" max="180"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c7Btn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Bereken
              </button>
            </div>
            <div id="g10c7Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function updateLabels(){
                const m=document.getElementById('g10c7mode').value;
                document.getElementById('g10c7l1').textContent=m==='interior'?'∠A':"Buite-hoek";
                document.getElementById('g10c7l2').textContent=m==='interior'?'∠B':"Nie-aangr. ∠";
              }
              function calc(){
                const m=document.getElementById('g10c7mode').value;
                const a=parseFloat(document.getElementById('g10c7a1').value);
                const b=parseFloat(document.getElementById('g10c7a2').value);
                const out=document.getElementById('g10c7Out');
                if(isNaN(a)||isNaN(b)||a<=0||b<=0){out.innerHTML='<span style="color:#fca5a5;">Voer positiewe hoekwaardes in.</span>';return;}
                if(m==='interior'){
                  const c=180-a-b;
                  if(c<=0){out.innerHTML='<span style="color:#fca5a5;">Ongeldig: hoeke moet op 180° optel.</span>';return;}
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">∠A + ∠B + ∠C = 180°</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">'+a+'° + '+b+'° + ∠C = 180°</span><br>'
                    +'<span style="color:#6ee7b7;">∠C = '+c+'°</span>';
                } else {
                  if(b>=a){out.innerHTML='<span style="color:#fca5a5;">Nie-aangrensende binnehoek moet kleiner wees as die buitehoek.</span>';return;}
                  const other=a-b;
                  const third=180-other-b;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Buite-hoek = som van twee nie-aangrensende binnehoeke</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">'+a+'° = '+b+'° + 2de nie-aangrensende hoek</span><br>'
                    +'<span style="color:#6ee7b7;">2de nie-aangrensende hoek = '+other+'°</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">3de binnehoek (aangrensend aan die buitehoek, vorm 'n reguitlynpaar) = 180° − '+a+'° = </span><span style="color:#fcd34d;">'+third+'°</span>';
                }
              }
              document.getElementById('g10c7mode').addEventListener('change',()=>{updateLabels();});
              document.getElementById('g10c7Btn').addEventListener('click',calc);
              ['g10c7a1','g10c7a2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              updateLabels();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>'n Buitehoek is 'n kortpad — dit is direk gelyk aan die som van die twee ver binnehoeke, sonder dat jy eers al drie binnehoeke hoef te vind.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Buitehoek van 'n driehoek is 110°. Een nie-aangrensende binnehoek is 45°. Vind die ander nie-aangrensende binnehoek.",
          options: ["65°", "70°", "55°", "45°"],
          answer: 0,
          topic: "Driehoeke"
        },
        {
          type: "mc",
          text: "Watter stel voorwaardes bewys twee driehoeke kongruent?",
          options: ["HHH", "SSH", "SHS", "SHH"],
          answer: 2,
          topic: "Driehoeke"
        },
        {
          type: "mc",
          text: "Twee gelykvormige driehoeke het sye in verhouding 2:3. Die verhouding van hul oppervlaktes is:",
          options: ["2:3", "4:9", "8:27", "1:1"],
          answer: 1,
          topic: "Driehoeke"
        },
        {
          type: "input",
          text: "In △ABC ||| △DEF, AB = 6, DE = 9, en BC = 8. Vind EF.",
          answer: "12",
          topic: "Driehoeke"
        },
        {
          type: "mc",
          text: "In 'n gelykbenige driehoek met twee gelyke hoeke van 52°, is die derde hoek:",
          options: ["76°", "128°", "52°", "104°"],
          answer: 0,
          topic: "Driehoeke"
        },
        {
          type: "input",
          text: "△ABC ||| △DEF en die verhouding van hul oppervlaktes is 9:25 (Oppervlakte ABC : Oppervlakte DEF). As BC = 12, vind EF.",
          answer: "20",
          topic: "Driehoeke"
        },
        {
          type: "input",
          text: "In gelykbenige △ABC met AB = AC, is die buitehoek by C 130°. Vind die grootte van ∠A.",
          answer: "80",
          altAnswers: ["80°"],
          topic: "Driehoeke"
        }
      ]
    },
    {
      id: 701,
      chapter: 7,
      name: "Vierhoeke & middellynstelling",
      fullName: "Vierhoek-eienskappe en die middellynstelling",
      lesson: {
        heading: "Vierhoeke en die middellynstelling",
        sub: "Hoofstuk 7 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Vierhoek-eienskappe</div>
            <p>
              <strong>Parallelogram:</strong> Opponerende sye ∥ en gelyk; opponerende hoeke gelyk; diagonale halveer mekaar.<br>
              <strong>Reghoek:</strong> Al die eienskappe van 'n parallelogram + alle hoeke 90°; diagonale gelyk.<br>
              <strong>Ruit:</strong> Al die eienskappe van 'n parallelogram + alle sye gelyk; diagonale halveer mekaar by 90° en halveer die hoeke.<br>
              <strong>Vierkant:</strong> Al die eienskappe van reghoek + ruit.<br>
              <strong>Trapesium:</strong> Een paar ewewydige sye.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Middellynstelling</div>
            <p>
              Die lynstuk wat die middelpunte van twee sye van 'n driehoek verbind, is:<br>
              (1) <strong>ewewydig aan die derde sy</strong>, en<br>
              (2) <strong>gelyk aan die helfte van sy lengte</strong>.<br><br>
              Omgekeerde: 'n Lyn deur die middelpunt van een sy van 'n driehoek, ewewydig aan die tweede sy, halveer die derde sy.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Gebruik van die middellynstelling</div>
            <p>In △ABC is M die middelpunt van AB en N die middelpunt van AC.<br>
            As BC = 14 cm, dan is MN = 7 cm (die helfte van BC).<br>
            Verder is MN ∥ BC.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Gelykvormigheid- & middellynberekenaar</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Werk met die middellynstelling of gelykvormige driehoek-verhoudings.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Modus</div>
                <select id="g10c7bmode"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="midpoint">Middellynstelling</option>
                  <option value="similar">Gelykvormige driehoeke</option>
                </select>
              </div>
              <div id="g10c7bInputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="g10c7bBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Bereken
              </button>
            </div>
            <div id="g10c7bOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function makeInput(id, label, val){
                return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div>'
                  +'<input id="'+id+'" type="number" value="'+val+'" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\\'JetBrains Mono\\',monospace;text-align:center;"></div>';
              }
              function buildInputs(){
                const m=document.getElementById('g10c7bmode').value;
                const c=document.getElementById('g10c7bInputs');
                if(m==='midpoint'){
                  c.innerHTML=makeInput('g10c7bv1','Bekende sy','18')+makeInput('g10c7bv2','Vind (0=BC)','0');
                } else {
                  c.innerHTML=makeInput('g10c7bv1','Sy 1 (△1)','6')+makeInput('g10c7bv2','Sy 1 (△2)','9')+makeInput('g10c7bv3','Sy 2 (△1)','8');
                }
                ['g10c7bv1','g10c7bv2','g10c7bv3'].forEach(id=>{
                  const el=document.getElementById(id);
                  if(el) el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
                });
              }
              function calc(){
                const m=document.getElementById('g10c7bmode').value;
                const out=document.getElementById('g10c7bOut');
                if(m==='midpoint'){
                  const v1=parseFloat(document.getElementById('g10c7bv1').value);
                  const v2=parseFloat(document.getElementById('g10c7bv2').value);
                  if(isNaN(v1)||v1<=0){out.innerHTML='<span style="color:#fca5a5;">Voer 'n geldige sylengte in.</span>';return;}
                  if(v2===0){
                    out.innerHTML='<span style="color:rgba(221,225,240,0.50);">BC (volle sy) = '+v1+', dus MN = BC ÷ 2 = </span><span style="color:#6ee7b7;">'+v1/2+' eenhede</span><br>'
                      +'<span style="color:rgba(221,225,240,0.50);font-size:13px;">MN ∥ BC (middellynstelling)</span>';
                  } else {
                    out.innerHTML='<span style="color:rgba(221,225,240,0.50);">MN = '+v1+', dus BC = MN × 2 = </span><span style="color:#6ee7b7;">'+v1*2+' eenhede</span><br>'
                      +'<span style="color:rgba(221,225,240,0.50);font-size:13px;">MN ∥ BC (middellynstelling)</span>';
                  }
                } else {
                  const s1=parseFloat(document.getElementById('g10c7bv1').value);
                  const s2=parseFloat(document.getElementById('g10c7bv2').value);
                  const s3=parseFloat(document.getElementById('g10c7bv3').value);
                  if([s1,s2,s3].some(isNaN)||[s1,s2,s3].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige sylengtes in.</span>';return;}
                  const ratio=s2/s1;
                  const s4=s3*ratio;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Skaalfaktor k = '+s2+' ÷ '+s1+' = '+ratio.toFixed(4)+'</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">Ooreenstemmende sy = '+s3+' × '+ratio.toFixed(4)+' = </span><span style="color:#6ee7b7;">'+s4.toFixed(2)+' eenhede</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);font-size:13px;">Oppervlakteverhouding = k² = '+(ratio*ratio).toFixed(4)+'</span>';
                }
              }
              document.getElementById('g10c7bmode').addEventListener('change',()=>{buildInputs();});
              document.getElementById('g10c7bBtn').addEventListener('click',calc);
              buildInputs();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>In gelykvormige driehoeke skaleer sye met faktor k, maar oppervlaktes skaleer met k². As sye verdubbel, verviervoudig die oppervlakte.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In 'n parallelogram is een hoek 70°. 'n Aangrensende hoek is:",
          options: ["70°", "110°", "140°", "35°"],
          answer: 1,
          topic: "Vierhoeke & middellynstelling"
        },
        {
          type: "mc",
          text: "Watter vierhoek het diagonale wat mekaar by regte hoeke halveer EN die hoekpunthoeke halveer?",
          options: ["Reghoek", "Parallelogram", "Ruit", "Trapesium"],
          answer: 2,
          topic: "Vierhoeke & middellynstelling"
        },
        {
          type: "input",
          text: "In △PQR is M die middelpunt van PQ en N die middelpunt van PR. As QR = 18, vind MN.",
          answer: "9",
          topic: "Vierhoeke & middellynstelling"
        },
        {
          type: "mc",
          text: "Die diagonale van 'n reghoek is 10 cm. Een sy is 6 cm. Die ander sy is:",
          options: ["4 cm", "8 cm", "√136 cm", "16 cm"],
          answer: 1,
          topic: "Vierhoeke & middellynstelling"
        },
        {
          type: "mc",
          text: "ABCD is 'n parallelogram. As AC = 20, halveer die diagonale mekaar, dus AO =",
          options: ["20", "10", "5", "Kan nie bepaal word nie"],
          answer: 1,
          topic: "Vierhoeke & middellynstelling"
        },
        {
          type: "input",
          text: "In △XYZ is D en E die middelpunte van XY en XZ. DE = 2x + 1 en YZ = 5x − 4. Vind YZ.",
          answer: "26",
          topic: "Vierhoeke & middellynstelling"
        },
        {
          type: "input",
          text: "Reghoek ABCD het diagonale AC = 3x − 2 en BD = x + 10. Gebruik die feit dat 'n reghoek se diagonale gelyk is om AC te vind.",
          answer: "16",
          topic: "Vierhoeke & middellynstelling"
        }
      ]
    },
    {
      id: 702,
      chapter: 7,
      name: "Spesiale vierhoeke — vlieër & trapesium",
      fullName: "Definisie en bewys van eienskappe van die vlieër en trapesium",
      lesson: {
        heading: "Die vlieër en trapesium — definisies en eienskappe",
        sub: "Hoofstuk 7 · Onderwerp 3",
        body: `
          <p>CAPS vereis dat jy elke spesiale vierhoek presies <strong>definieer</strong>, en dan sy eienskappe <strong>ondersoek en bewys</strong> — nie net 'n lys feite memoriseer nie.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Vlieër — definisie en eienskappe</div>
            <p>
              'n <strong>Vlieër</strong> is 'n vierhoek met <strong>twee pare aangrensende gelyke sye</strong>.<br>
              Eienskappe (bewysbaar uit die definisie deur kongruente driehoeke te gebruik):<br>
              • Een diagonaal halveer die ander by 90° (die simmetrie-as).<br>
              • Een paar opponerende hoeke (tussen die ongelyke sye) is gelyk.<br>
              • Die simmetrie-as halveer die hoeke waardeur dit gaan.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Trapesium — definisie en eienskappe</div>
            <p>
              'n <strong>Trapesium</strong> is 'n vierhoek met <strong>presies een paar ewewydige sye</strong>.<br>
              Mede-binnehoeke tussen die ewewydige sye is supplementêr (tel op tot 180°) — dit volg direk uit die ewewydige-lyn-hoekstellings.<br>
              'n Trapesium het geen algemene reël wat sy diagonale koppel nie, tensy verdere inligting (soos dat dit gelykbenig is) gegee word.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bewys van 'n vlieër-eienskap</div>
            <p>
              In vlieër KITE met KI = KE en TI = TE, word diagonaal KT getrek. Bewys KT halveer ∠IKE.<br>
              In △KIT en △KET: <span class="math">KI = KE</span> (gegee), <span class="math">TI = TE</span> (gegee), <span class="math">KT = KT</span> (gemeenskaplik)<br>
              <span class="math">∴ △KIT ≡ △KET</span> (SSS)<br>
              <span class="math">∴ ∠IKT = ∠EKT</span> (ooreenstemmende ∠e van kongruente driehoeke) — dus halveer KT ∠IKE.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 'n Enkele teenvoorbeeld weerlê 'n vermoede</div>
            <p>As jy gevra word om 'n eienskap te ondersoek, is een duidelike teenvoorbeeld genoeg om te wys 'n vermoede is vals — maar om 'n vermoede as waar te bewys, verg 'n algemene argument (met kongruensie of bekende stellings), nie net verskeie voorbeelde nagaan nie.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>'n Vlieër se twee diagonale is <strong>nie albei</strong> simmetrie-asse nie — slegs die diagonaal wat die hoekpunte tussen die gelyke sye verbind, is een. Skets 'n vlieër en toets dit self.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "'n Vlieër het twee pare:",
          options: ["Aangrensende sye gelyk", "Opponerende sye gelyk", "Opponerende sye ewewydig", "Aangrensende hoeke gelyk"],
          answer: 0,
          topic: "Spesiale vierhoeke — vlieër & trapesium"
        },
        {
          type: "mc",
          text: "In 'n trapesium met een paar ewewydige sye, is die mede-binnehoeke tussen daardie ewewydige sye:",
          options: ["Supplementêr (tel op tot 180°)", "Gelyk", "Komplementêr (tel op tot 90°)", "Altyd elk 90°"],
          answer: 0,
          topic: "Spesiale vierhoeke — vlieër & trapesium"
        },
        {
          type: "input",
          text: "In trapesium ABCD met AB ∥ DC, hoek A = 110°. Vind hoek D (mede-binne met A).",
          answer: "70",
          topic: "Spesiale vierhoeke — vlieër & trapesium"
        },
        {
          type: "mc",
          text: "In 'n vlieër is die diagonaal wat op die simmetrie-as lê:",
          options: ["Halveer die ander diagonaal by 90°", "Gelyk in lengte aan die ander diagonaal", "Ewewydig aan twee sye", "Halveer net een hoek van die vlieër"],
          answer: 0,
          topic: "Spesiale vierhoeke — vlieër & trapesium"
        },
        {
          type: "mc",
          text: "Om die vermoede 'elke trapesium het gelyke diagonale' te weerlê, benodig jy:",
          options: ["Net een teenvoorbeeld", "Minstens drie teenvoorbeelde", "'n Algemene bewys", "Dit kan nie weerlê word nie"],
          answer: 0,
          topic: "Spesiale vierhoeke — vlieër & trapesium"
        },
        {
          type: "input",
          text: "In vlieër ABCD (AB = AD, CB = CD), ∠A = 70° en ∠B = ∠D = 115°. Vind ∠C (met die hoeksom van 'n vierhoek).",
          answer: "60",
          altAnswers: ["60°"],
          topic: "Spesiale vierhoeke — vlieër & trapesium"
        },
        {
          type: "input",
          text: "In trapesium PQRS, PQ ∥ SR. ∠P = (2x + 10)° en ∠S = (3x − 5)° is mede-binnehoeke. Vind ∠P.",
          answer: "80",
          altAnswers: ["80°"],
          topic: "Spesiale vierhoeke — vlieër & trapesium"
        }
      ]
    },
    {
      id: 703,
      chapter: 7,
      name: "Spesiale vierhoeke — parallelogramfamilie",
      fullName: "Bewys van eienskappe van die parallelogram, reghoek, ruit, en vierkant",
      lesson: {
        heading: "Die parallelogramfamilie — reghoek, ruit, en vierkant",
        sub: "Hoofstuk 7 · Onderwerp 4",
        body: `
          <p>Die reghoek, ruit, en vierkant is almal <strong>spesiale gevalle van die parallelogram</strong> — elkeen voeg ekstra voorwaardes by, bo-op die basiese parallelogram-eienskappe.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Parallelogram — die basisdefinisie</div>
            <p>
              'n <strong>Parallelogram</strong> is 'n vierhoek met <strong>twee pare opponerende sye ewewydig</strong>.<br>
              Uit hierdie definisie alleen kan jy bewys: opponerende sye is gelyk, opponerende hoeke is gelyk, en die diagonale halveer mekaar.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Bou van die familie</div>
            <p>
              <strong>Reghoek</strong> = parallelogram + alle hoeke 90° → diagonale is ook <strong>gelyk</strong>.<br>
              <strong>Ruit</strong> = parallelogram + alle sye gelyk → diagonale <strong>halveer mekaar by 90°</strong> en <strong>halveer die hoekpunthoeke</strong>.<br>
              <strong>Vierkant</strong> = reghoek + ruit (al die eienskappe van albei) → diagonale is gelyk, halveer mekaar by 90°, en halveer die hoeke.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: Bewys dat opponerende hoeke van 'n parallelogram gelyk is</div>
            <p>
              In parallelogram ABCD, bewys <span class="math">∠A = ∠C</span>.<br>
              Trek diagonaal BD. Aangesien AB ∥ DC: <span class="math">∠ABD = ∠BDC</span> (verwiss. ∠e).<br>
              Aangesien AD ∥ BC: <span class="math">∠ADB = ∠DBC</span> (verwiss. ∠e).<br>
              <span class="math">BD = BD</span> (gemeenskaplik) → <span class="math">△ABD ≡ △CDB</span> (HHS)<br>
              <span class="math">∴ ∠A = ∠C</span> (ooreenstemmende ∠e van kongruente driehoeke).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Vinnige identifikasietabel</div>
            <p>
              | Vorm | Sye | Hoeke | Diagonale |<br>
              | Parallelogram | opp. sye ∥ en = | opp. ∠e = | halveer mekaar |<br>
              | Reghoek | soos hierbo | alle 90° | gelyk + halveer mekaar |<br>
              | Ruit | alle sye = | opp. ∠e = | halveer mekaar by 90°, halveer ∠e |<br>
              | Vierkant | alle sye = | alle 90° | gelyk, halveer by 90°, halveer ∠e |
            </p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Om te bewys 'n vierhoek is 'n <em>spesifieke</em> tipe, moet jy eers wys dit voldoen aan daardie vorm se <em>definisie</em> — om net te bewys "diagonale halveer mekaar" bewys slegs dit is 'n parallelogram, nie outomaties 'n reghoek of ruit nie.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Watter eienskap is waar vir 'n ruit maar nie vir 'n algemene parallelogram nie?",
          options: ["Diagonale halveer mekaar by 90°", "Opponerende sye is ewewydig", "Opponerende hoeke is gelyk", "Diagonale halveer mekaar"],
          answer: 0,
          topic: "Spesiale vierhoeke — parallelogramfamilie"
        },
        {
          type: "input",
          text: "In reghoek ABCD is diagonaal AC = 26 cm. Vind diagonaal BD.",
          answer: "26",
          topic: "Spesiale vierhoeke — parallelogramfamilie"
        },
        {
          type: "mc",
          text: "'n Vierhoek het diagonale wat mekaar halveer maar NIE gelyk is NIE en NIE loodreg is NIE. Dit moet 'n:",
          options: ["Parallelogram (maar nie reghoek, ruit, of vierkant nie)", "Reghoek", "Ruit", "Vlieër"],
          answer: 0,
          topic: "Spesiale vierhoeke — parallelogramfamilie"
        },
        {
          type: "mc",
          text: "Om te bewys 'n parallelogram is 'n ruit, watter enkele voorwaarde is voldoende?",
          options: ["Een paar aangrensende sye is gelyk", "Die diagonale is gelyk", "Een hoek is 90°", "Die diagonale halveer mekaar"],
          answer: 0,
          topic: "Spesiale vierhoeke — parallelogramfamilie"
        },
        {
          type: "input",
          text: "In ruit PQRS is diagonaal PR = 16 en diagonaal QS = 12. Die diagonale sny mekaar by O. Vind PO (die helfte van PR).",
          answer: "8",
          topic: "Spesiale vierhoeke — parallelogramfamilie"
        },
        {
          type: "input",
          text: "'n Ruit het diagonale van lengte 16 cm en 12 cm. Vind die lengte van een sy van die ruit.",
          answer: "10",
          altAnswers: ["10 cm"],
          topic: "Spesiale vierhoeke — parallelogramfamilie"
        },
        {
          type: "input",
          text: "Reghoek PQRS het diagonale PR = 5x − 3 en QS = 2x + 12. Vind PR.",
          answer: "22",
          topic: "Spesiale vierhoeke — parallelogramfamilie"
        }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 7 Werkboek — Euklidiese meetkunde",
    questions: [
      {
        number: 1,
        text: "In △ABC is D op AB en E op AC sodat DE ∥ BC. AD = 4, DB = 6, en BC = 15.",
        parts: [
          { label: "a", text: "Wys dat △ADE ||| △ABC.", marks: 4 },
          { label: "b", text: "Bereken DE.", marks: 3 },
          { label: "c", text: "As die oppervlakte van △ADE 16 cm² is, vind die oppervlakte van △ABC.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "PQRS is 'n parallelogram waar PQ = 2x − 3 en RS = x + 4. Die diagonaal PR = 18.",
        parts: [
          { label: "a", text: "Vind x.", marks: 3 },
          { label: "b", text: "Vind dus PQ.", marks: 1 },
          { label: "c", text: "Vind PT waar T die snypunt van die diagonale is.", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "In △ABC is M en N onderskeidelik die middelpunte van AB en AC. MN = 3x − 2 en BC = 4x + 6.",
        parts: [
          { label: "a", text: "Gebruik die middellynstelling om 'n vergelyking te skryf.", marks: 2 },
          { label: "b", text: "Los op vir x.", marks: 2 },
          { label: "c", text: "Vind BC.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "∠A gemeenskaplik; ∠ADE=∠ABC (ooreenst. hoeke, DE∥BC) → HH → △ADE|||△ABC",
        b: "AD/AB = DE/BC → 4/10 = DE/15 → DE = 6",
        c: "Oppervlakteverhouding = (4/10)² = 16/100 → Oppervlakte ABC = 100 cm²"
      },
      2: {
        a: "PQ=RS (opp sye parallelogram): 2x−3=x+4 → x=7",
        b: "PQ = 11",
        c: "PT = PR/2 = 9"
      },
      3: {
        a: "MN = ½BC → 3x−2 = ½(4x+6)",
        b: "3x−2=2x+3 → x=5",
        c: "BC = 26"
      }
    }
  }
});
