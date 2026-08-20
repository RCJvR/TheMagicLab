// Math Magician — Graad 9, Hoofstuk 14 data (Afrikaans)
// Oppervlakte en Omtrek

MathMagician.registerChapter(14, {
  topics: [
    {
      id: 27,
      chapter: 14,
      name: "Omtrek",
      fullName: "Omtrek van 2D-vorms",
      lesson: {
        heading: "Omtrek van 2D-vorms",
        sub: "Hoofstuk 14 · Onderwerp 1",
        body: `
          <p><strong>Omtrek</strong> is die totale lengte van die grens van 'n 2D-vorm.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Omtrekformules</div>
            <p>
              <strong>Reghoek:</strong> P = 2(l + b)<br>
              <strong>Vierkant:</strong> P = 4s<br>
              <strong>Driehoek:</strong> P = a + b + c<br>
              <strong>Sirkel (omtrek):</strong> C = 2πr = πd<br>
              <strong>Halfsirkel:</strong> P = πr + 2r (boog + deursnee)<br>
              <strong>Saamgestelde vorms:</strong> tel slegs die blootgestelde buiterande op.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Reghoek 8 cm × 5 cm: P = 2(8 + 5) = 26 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Sirkel radius 7 cm: C = 2π(7) ≈ 43,98 cm</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Halfsirkel radius 6 cm: P = π(6) + 2(6) = 6π + 12 ≈ 30,85 cm</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Omtrek word in lineêre eenhede gemeet (cm, m), terwyl oppervlakte in vierkante eenhede is (cm², m²). Moenie dit deurmekaar gebruik nie.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Omtrekberekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n vorm en voer sy afmetings in om die omtrek te vind. Sien die formule wat gebruik word.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Vorm</label>
                <select id="periShape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="rect">Reghoek</option>
                  <option value="sq">Vierkant</option>
                  <option value="tri">Driehoek (3 sye)</option>
                  <option value="circle">Sirkel</option>
                  <option value="trap">Trapesium</option>
                </select>
              </div>
              <div id="periInputs" style="display:flex;gap:8px;flex-wrap:wrap;"></div>
              <button id="periBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="periOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var shapes={
              rect:{labels:['Lengte (l)','Breedte (w)'],defaults:[10,6],formula:'P = 2(l + w)',calc:function(v){return 2*(v[0]+v[1]);}},
              sq:{labels:['Sy (s)'],defaults:[8],formula:'P = 4s',calc:function(v){return 4*v[0];}},
              tri:{labels:['Sy a','Sy b','Sy c'],defaults:[5,7,9],formula:'P = a + b + c',calc:function(v){return v[0]+v[1]+v[2];}},
              circle:{labels:['Radius (r)'],defaults:[7],formula:'C = 2πr',calc:function(v){return 2*Math.PI*v[0];}},
              trap:{labels:['Sy a','Sy b','Skuinssy c','Skuinssy d'],defaults:[12,8,5,5],formula:'P = a + b + c + d',calc:function(v){return v[0]+v[1]+v[2]+v[3];}},
            };
            function setShape(){
              var key=document.getElementById('periShape').value;
              var s=shapes[key];
              var html=s.labels.map(function(lbl,i){
                return '<div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">'+lbl+'</label><input class="periVal" type="number" value="'+s.defaults[i]+'" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>';
              }).join('');
              document.getElementById('periInputs').innerHTML=html;
            }
            function calc(){
              var key=document.getElementById('periShape').value;
              var s=shapes[key];
              var vals=Array.from(document.querySelectorAll('.periVal')).map(function(el){return parseFloat(el.value)||0;});
              var p=s.calc(vals);
              var isCircle=key==='circle';
              document.getElementById('periOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Formule: </span><span style="color:#fbbf24;">'+s.formula+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">'+(isCircle?'Omtrek (sirkel)':'Omtrek')+': </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+(isCircle?p.toFixed(4):p)+'</span> <span style="color:rgba(221,225,240,0.35);">eenhede</span></div>',
              ].join('');
            }
            document.getElementById('periShape').addEventListener('change',function(){setShape();});
            document.getElementById('periBtn').addEventListener('click',calc);
            setShape();
          })();
          </script>
        slegs die buitegrens tel.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Vind die omtrek van 'n reghoek met lengte 11 cm en breedte 7 cm.", answer: "36", topic: "Omtrek" },
        { type: "mc", text: "Vind die omtrek van 'n sirkel met deursnee 10 cm. (Gebruik π ≈ 3,14)", options: ["31,4 cm", "15,7 cm", "62,8 cm", "78,5 cm"], answer: 0, topic: "Omtrek" },
        { type: "input", text: "'n Vierkant het 'n omtrek van 52 cm. Vind die sylengte.", answer: "13", topic: "Omtrek" },
        { type: "mc", text: "Die omtrek van 'n halfsirkel met radius 5 cm is ongeveer:", options: ["15,7 cm", "25,7 cm", "10 cm", "20 cm"], answer: 1, topic: "Omtrek" },
        { type: "input", text: "'n Driehoek het sye 13 cm, 14 cm en 15 cm. Wat is die omtrek?", answer: "42", topic: "Omtrek" },
        { type: "input", text: "'n Reghoekige veld het 'n omtrek van 84 m. Sy lengte is 6 m meer as twee keer sy breedte. Vind die breedte (in m).", answer: "12", topic: "Omtrek" },
        { type: "input", text: "'n Draad van 90 cm lank word gebuig in die vorm van 'n reghoek waar die lengte twee keer die breedte is. Vind die breedte (in cm).", answer: "15", topic: "Omtrek" },
      ]
    },
    {
      id: 28,
      chapter: 14,
      name: "Oppervlakte",
      fullName: "Oppervlakte van 2D-vorms",
      lesson: {
        heading: "Oppervlakte van 2D-vorms",
        sub: "Hoofstuk 14 · Onderwerp 2",
        body: `
          <p><strong>Oppervlakte</strong> meet die oppervlak wat deur 'n 2D-vorm ingesluit word, gemeet in vierkante eenhede (cm², m², ens.).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Oppervlakteformules</div>
            <p>
              <strong>Reghoek:</strong> A = l × b<br>
              <strong>Vierkant:</strong> A = s²<br>
              <strong>Driehoek:</strong> A = ½ × basis × hoogte<br>
              <strong>Parallelogram:</strong> A = basis × hoogte (loodregte hoogte!)<br>
              <strong>Trapesium:</strong> A = ½(a + b) × h (a, b = ewewydige sye)<br>
              <strong>Sirkel:</strong> A = πr²<br>
              <strong>Ruit:</strong> A = ½ × d1 × d2 (d1, d2 = diagonale)
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Driehoek basis = 10, hoogte = 6: A = ½ × 10 × 6 = 30 cm²</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Trapesium a = 8, b = 12, h = 5: A = ½(8+12) × 5 = 50 cm²</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Sirkel r = 9: A = π(81) ≈ 254,47 cm²</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Saamgesteld: reghoek + halfsirkel = lw + ½πr²</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Die hoogte van 'n parallelogram/driehoek is LOODREG op die basis —
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Oppervlakte- en Omtrekberekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n vorm en voer afmetings in. Oppervlakte en omtrek word onmiddellik bereken.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <select id="areaShape2" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="rect">Reghoek</option>
                <option value="tri">Driehoek</option>
                <option value="circ">Sirkel</option>
                <option value="trap">Trapesium</option>
                <option value="para">Parallelogram</option>
              </select>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="areaL12">Lengte</label><input id="areaV12" type="number" value="8" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="areaL22">Breedte</label><input id="areaV22" type="number" value="5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="areaL32">Ekstra</label><input id="areaV32" type="number" value="" placeholder="—" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="areaBtn2" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="areaOut2" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var PI=Math.PI;function f(v){return Math.round(v*100)/100;}
            function setL(){var s=document.getElementById('areaShape2').value;var lbl={rect:['Lengte','Breedte',''],tri:['Basis','Hoogte',''],circ:['Radius','',''],trap:['Basis a','Hoogte','Basis b'],para:['Basis','Hoogte','']};var l=lbl[s];document.getElementById('areaL12').textContent=l[0];document.getElementById('areaL22').textContent=l[1];document.getElementById('areaL32').textContent=l[2]||'Ekstra';document.getElementById('areaV22').disabled=(s==='circ');document.getElementById('areaV32').disabled=(s!=='trap');}
            function calc(){
              var s=document.getElementById('areaShape2').value;
              var v1=parseFloat(document.getElementById('areaV12').value)||0;
              var v2=parseFloat(document.getElementById('areaV22').value)||0;
              var v3=parseFloat(document.getElementById('areaV32').value);
              var A,line1,line2;
              if(s==='rect'){A=v1*v2;line1='A = '+v1+' × '+v2+' = '+f(A)+' vk. eenhede';line2='P = 2('+v1+'+'+v2+') = '+f(2*(v1+v2))+' eenhede';}
              else if(s==='tri'){A=0.5*v1*v2;line1='A = ½×'+v1+'×'+v2+' = '+f(A)+' vk. eenhede';line2='';}
              else if(s==='circ'){A=PI*v1*v1;line1='A = πr² = π×'+v1+'² = '+f(A)+' vk. eenhede';line2='C = 2πr = '+f(2*PI*v1)+' eenhede';}
              else if(s==='trap'){var b2=isNaN(v3)?v2:v3;A=0.5*(v1+b2)*v2;line1='A = ½('+v1+'+'+b2+')×'+v2+' = '+f(A)+' vk. eenhede';line2='';}
              else{A=v1*v2;line1='A = basis×h = '+v1+'×'+v2+' = '+f(A)+' vk. eenhede';line2='';}
              document.getElementById('areaOut2').innerHTML='<div style="color:rgba(221,225,240,0.60);">'+line1+'</div>'+(line2?'<div style="color:rgba(221,225,240,0.60);">'+line2+'</div>':'')+'<div><span style="color:#6ee7b7;font-size:15px;font-weight:700;">A = '+f(A)+'</span></div>';
            }
            document.getElementById('areaShape2').addEventListener('change',function(){setL();});
            document.getElementById('areaBtn2').addEventListener('click',calc);
            ['areaV12','areaV22','areaV32'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});
            setL();
          })();
          </script>
        nie die skuinssy nie.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Vind die oppervlakte van 'n driehoek met basis 16 cm en loodregte hoogte 9 cm.", answer: "72", topic: "Oppervlakte" },
        { type: "mc", text: "Vind die oppervlakte van 'n trapesium met ewewydige sye 7 cm en 11 cm, hoogte 4 cm.", options: ["36 cm²", "72 cm²", "44 cm²", "38 cm²"], answer: 0, topic: "Oppervlakte" },
        { type: "input", text: "Vind die oppervlakte van 'n sirkel met radius 6 cm. (Gebruik π ≈ 3,14; gee tot die naaste heelgetal)", answer: "113", topic: "Oppervlakte" },
        { type: "mc", text: "'n Ruit het diagonale van 12 cm en 16 cm. Sy oppervlakte is:", options: ["192 cm²", "96 cm²", "48 cm²", "72 cm²"], answer: 1, topic: "Oppervlakte" },
        { type: "input", text: "'n Reghoek is 14 cm × 9 cm. 'n Sirkel met deursnee 6 cm word daaruit gesny. Vind die oorblywende oppervlakte. (Gebruik π ≈ 3,14)", answer: "98", topic: "Oppervlakte" },
        { type: "input", text: "'n Tuinpaadjie 2 m breed omring 'n reghoekige grasperk 10 m by 6 m aan alle kante. Vind die oppervlakte van die paadjie (in m²).", answer: "80", topic: "Oppervlakte" },
        { type: "input", text: "'n Sirkel het 'n oppervlakte van 78,5 cm². Gebruik π ≈ 3,14 om die radius te vind (in cm).", answer: "5", topic: "Oppervlakte" },
      ]
    },
  ],
  workbook: {
    chapter: 14, chapterName: "Oppervlakte en Omtrek",
    topics: [
      {
        name: "Omtrek",
        questions: [
          {
            num: "1",
            text: "Bereken die omtrek van elke vorm. (Gebruik π = 3,14 waar nodig)",
            parts: [
              { label: "a)", text: "'n Reëlmatige seshoek met sy 8 cm.", marks: 2 },
              { label: "b)", text: "'n Sirkel met radius 9 cm.", marks: 3 },
              { label: "c)", text: "'n Vorm bestaande uit 'n reghoek (10 cm × 6 cm) met 'n halfsirkel op een van die korter ente (in plaas van daardie sy).", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Oppervlakte",
        questions: [
          {
            num: "2",
            text: "Bereken die oppervlakte van elke vorm. (Gebruik π = 3,14 waar nodig)",
            parts: [
              { label: "a)", text: "Parallelogram: basis = 15 cm, loodregte hoogte = 8 cm.", marks: 2 },
              { label: "b)", text: "Trapesium: ewewydige sye = 9 cm en 15 cm, hoogte = 7 cm.", marks: 3 },
              { label: "c)", text: "Saamgestelde vorm: 'n vierkant met sy 12 cm met 'n sirkelvormige gat met deursnee 6 cm uit die middelpunt gesny.", marks: 4 },
            ]
          },
          {
            num: "3",
            text: "'n Tuin is in die vorm van 'n reghoek (20 m × 12 m) met 'n halfsirkelvormige fonteinarea (deursnee 8 m) uit een ent gesny.",
            parts: [
              { label: "a)", text: "Vind die oppervlakte beskikbaar vir plant (die fontein uitgesluit).", marks: 4 },
              { label: "b)", text: "Grassaad kos R 15 per m². Vind die totale koste.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 14, chapterName: "Hoofstuk 14 — Oppervlakte en Omtrek",
    topics: [
      {
        name: "Omtrek",
        answers: [
          { num: "Q1a", ans: "48 cm", note: "6 × 8 = 48" },
          { num: "Q1b", ans: "56,52 cm", note: "2 × 3,14 × 9 = 56,52" },
          { num: "Q1c", ans: "P = 10 + 6 + 10 + πr = 26 + 3,14×3 ≈ 35,42 cm", note: "Twee lang sye + een kort sy + halfsirkelboog (r=3)" },
        ]
      },
      {
        name: "Oppervlakte",
        answers: [
          { num: "Q2a", ans: "120 cm²", note: "15 × 8 = 120" },
          { num: "Q2b", ans: "84 cm²", note: "½(9+15)×7 = ½×24×7 = 84" },
          { num: "Q2c", ans: "115,74 cm²", note: "12²-π×3² = 144-28,26 = 115,74" },
          { num: "Q3a", ans: "214,88 m²", note: "20×12 − ½×π×4² = 240 − 25,12 = 214,88 m²" },
          //REMOVED_OLD_Q3a_START{"215,12 m�", note: "20�12 - ��p�4� = 240 - 25,12 = 214,88 � 214,88 m�" },
          { num: "Q3b", ans: "≈ R 3 223,20", note: "214,88 × 15 = 3 223,20" },
        ]
      },
    ]
  }
});
