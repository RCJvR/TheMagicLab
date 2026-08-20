// Math Magician — Grade 9, Chapter 17 data (Afrikaans)
// Meetkunde van 3D-voorwerpe

MathMagician.registerChapter(17, {
  topics: [
    {
      id: 33,
      chapter: 17,
      name: "Veelvlakke",
      fullName: "Eienskappe van veelvlakke en Euler se formule",
      lesson: {
        heading: "Eienskappe van veelvlakke",
        sub: "Hoofstuk 17 · Onderwerp 1",
        body: `
          <p>'n <strong>Veelvlak</strong> is 'n 3D-voorwerp met plat veelhoekige vlakke. Om hul eienskappe te verstaan help met uitslaanpatrone, oppervlakte en volume.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleuteldefinisies</div>
            <p>
              <strong>Vlak:</strong> plat veelhoekige oppervlak van 'n veelvlak<br>
              <strong>Rand:</strong> lynstuk waar twee vlakke ontmoet<br>
              <strong>Hoekpunt:</strong> punt waar drie of meer rande ontmoet<br><br>
              <strong>Euler se formule:</strong> V + H - R = 2<br>
              (vlakke + hoekpunte - rande = 2 vir enige konvekse veelvlak)<br><br>
              <strong>Platoniese liggame:</strong> alle vlakke is identiese reëlmatige veelhoeke<br>
              • Tetraëder: 4 driehoekige vlakke (V=4, H=4, R=6)<br>
              • Kubus: 6 vierkantige vlakke (V=6, H=8, R=12)<br>
              • Oktaëder: 8 driehoekige vlakke (V=8, H=6, R=12)<br>
              • Dodekaëder: 12 vyfhoekige vlakke<br>
              • Ikosaëder: 20 driehoekige vlakke
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">📝 Verifieer Euler se formule vir 'n kubus</div>
            <div class="example-step"><span class="step-num">1</span><span>V = 6 (bo, onder, voor, agter, links, regs)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>H = 8 (hoeke)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>R = 12 (rande)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>V + H - R = 6 + 8 - 12 = 2 ✓</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Euler-formulekontroleerder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Laat een veld leeg. Voer enige twee van V, H, R in en die derde word bereken met behulp van V + H − R = 2.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Vlakke (V)</label><input id="efF" type="number" placeholder="—" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Hoekpunte (H)</label><input id="efV" type="number" placeholder="—" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Rande (R)</label><input id="efE" type="number" placeholder="—" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="efBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Kontroleer / Los op</button>
            </div>
            <div id="efOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function check(){
              var F=parseFloat(document.getElementById('efF').value),V=parseFloat(document.getElementById('efV').value),E=parseFloat(document.getElementById('efE').value);
              var blanks=[isNaN(F),isNaN(V),isNaN(E)].filter(Boolean).length;
              var el=document.getElementById('efOut');
              if(blanks===0){var lhs=F+V-E;el.innerHTML='<div>V+H−R = '+F+'+'+V+'−'+E+' = <span style="color:'+(lhs===2?'#6ee7b7':'#fca5a5')+';">'+lhs+' '+(lhs===2?'✓ Geldig!':'✗ Ongeldig')+'</span></div>';return;}
              if(blanks!==1){el.innerHTML='<span style="color:#fca5a5;">Laat presies een veld leeg.</span>';return;}
              var res;
              if(isNaN(E)){res=F+V-2;document.getElementById('efE').value=res;el.innerHTML='<div>R = V+H−2 = '+F+'+'+V+'−2 = <strong style="color:#6ee7b7;">'+res+'</strong></div>';}
              else if(isNaN(V)){res=2+E-F;document.getElementById('efV').value=res;el.innerHTML='<div>H = 2+R−V = 2+'+E+'−'+F+' = <strong style="color:#6ee7b7;">'+res+'</strong></div>';}
              else{res=2+E-V;document.getElementById('efF').value=res;el.innerHTML='<div>V = 2+R−H = 2+'+E+'−'+V+' = <strong style="color:#6ee7b7;">'+res+'</strong></div>';}
            }
            document.getElementById('efBtn').addEventListener('click',check);
            ['efF','efV','efE'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')check();});});
          })();
          </script>
          Euler se formule geld vir alle konvekse veelvlakke. Dit is 'n vinnige kontrole vir jou vlak-/hoekpunt-/randtellings.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Hoeveel vlakke het 'n driehoekige prisma?", options: ["3", "4", "5", "6"], answer: 2, topic: "3D-voorwerpe" },
        { type: "input", text: "'n Vierkantige piramide het V = 5 en H = 5. Gebruik Euler se formule om die aantal rande te vind.", answer: "8", topic: "3D-voorwerpe" },
        { type: "mc", text: "Hoeveel hoekpunte het 'n oktaëder?", options: ["8", "12", "6", "4"], answer: 2, topic: "3D-voorwerpe" },
        { type: "mc", text: "Watter liggaam het alle vlakke as gelyksydige driehoeke?", options: ["Kubus", "Tetraëder", "Dodekaëder", "Beide A en B"], answer: 1, topic: "3D-voorwerpe" },
        { type: "input", text: "'n Veelvlak het 10 vlakke en 15 rande. Vind die aantal hoekpunte met behulp van Euler se formule.", answer: "7", topic: "3D-voorwerpe" },
        { type: "input", text: "'n Veelvlak het twee keer soveel rande as vlakke (R = 2V), en 10 hoekpunte. Gebruik Euler se formule om die aantal vlakke, V, te vind.", answer: "8", topic: "3D-voorwerpe" },
        { type: "input", text: "Vir 'n prisma met 'n n-syige veelhoekbasis, V = n + 2, H = 2n en R = 3n (kontroleer: dit stem ooreen met 'n driehoekige prisma met n=3 en 'n sesghoekige prisma met n=6). Gebruik hierdie patroon om die aantal rande van 'n prisma met 'n 9-syige (nonagonale) basis te vind.", answer: "27", topic: "3D-voorwerpe" },
      ]
    },
    {
      id: 34,
      chapter: 17,
      name: "Uitslaanpatrone en deursnitte",
      fullName: "Uitslaanpatrone van 3D-voorwerpe en deursnitte",
      lesson: {
        heading: "Uitslaanpatrone en deursnitte van 3D-voorwerpe",
        sub: "Hoofstuk 17 · Onderwerp 2",
        body: `
          <p>'n <strong>Uitslaanpatroon</strong> is 'n plat 2D-patroon wat opvou om 'n 3D-voorwerp te vorm. 'n <strong>Deursnit</strong> is die vorm wat jy kry wanneer jy deur 'n 3D-voorwerp sny.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Uitslaanpatrone</div>
            <p>
              <strong>Kubus:</strong> 6 vierkante gerangskik in 'n kruispatroon (baie geldige rangskikkings)<br>
              <strong>Reghoekige prisma:</strong> 2 pare reghoeke + 2 endreghoeke<br>
              <strong>Driehoekige prisma:</strong> 2 driehoeke + 3 reghoeke<br>
              <strong>Silinder:</strong> 2 sirkels + 1 reghoek (reghoekwydte = omtrek)<br>
              <strong>Vierkantige piramide:</strong> 1 vierkant + 4 driehoeke<br>
              <strong>Keël:</strong> 1 sirkel + 1 sektor
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Deursnitte</div>
            <p>
              <strong>Silinder gesny parallel aan die basis:</strong> sirkel<br>
              <strong>Silinder gesny loodreg op die basis:</strong> reghoek<br>
              <strong>Keël gesny parallel aan die basis:</strong> sirkel (kleiner)<br>
              <strong>Keël gesny deur die apeks en basis:</strong> driehoek<br>
              <strong>Sfeer gesny deur die middelpunt:</strong> sirkel (grootsirkel)
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Die uitslaanpatroon van 'n voorwerp moet sonder oorvleueling of gapings opvou om die volledige oppervlak te vorm. Oefen deur elke vlak in jou gedagtes op te vou.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — 3D-voorwerp-eienskapverkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n voorwerp om sy vlakke (V), hoekpunte (H), rande (R), Euler-kontrole, en deursnit-beskrywing te sien.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Voorwerp</label>
                <select id="solid3d" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="cube">Kubus</option>
                  <option value="rect">Reghoekige prisma</option>
                  <option value="tri">Driehoekige prisma</option>
                  <option value="square_pyr">Vierkantige piramide</option>
                  <option value="tri_pyr">Driehoekige piramide (tetraëder)</option>
                  <option value="hex_prism">Sesghoekige prisma</option>
                </select>
              </div>
              <button id="solid3dBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Verken</button>
            </div>
            <div id="solid3dOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var solids={
              cube:{name:'Kubus',F:6,V:8,E:12,faces:'6 vierkante',cross:'Vierkant (horisontaal) of reghoek (diagonaal)',net:'Kruis van 6 vierkante'},
              rect:{name:'Reghoekige Prisma',F:6,V:8,E:12,faces:'6 reghoeke',cross:'Reghoek',net:'Kruis van 6 reghoeke'},
              tri:{name:'Driehoekige Prisma',F:5,V:6,E:9,faces:'2 driehoeke + 3 reghoeke',cross:'Driehoek (parallel aan basis) of reghoek (loodreg)',net:'2 driehoeke + 3 reghoeke in \'n strook'},
              square_pyr:{name:'Vierkantige Piramide',F:5,V:5,E:8,faces:'1 vierkantige basis + 4 driehoeke',cross:'Vierkant (parallel aan basis) of driehoek (deur die apeks)',net:'Vierkant + 4 driehoeke daarom'},
              tri_pyr:{name:'Tetraëder',F:4,V:4,E:6,faces:'4 gelyksydige driehoeke',cross:'Driehoek of kleiner driehoek',net:'4 driehoeke in \'n strook'},
              hex_prism:{name:'Sesghoekige Prisma',F:8,V:12,E:18,faces:'2 sesghoeke + 6 reghoeke',cross:'Sesghoek (parallel) of reghoek (loodreg)',net:'2 sesghoeke + 6 reghoeke'},
            };
            function explore(){
              var key=document.getElementById('solid3d').value;
              var s=solids[key];
              var euler=s.F+s.V-s.E;
              document.getElementById('solid3dOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Naam:</span><span style="color:#fbbf24;font-weight:700;">'+s.name+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Vlakke (V):</span><span style="color:#6ee7b7;">'+s.F+' &nbsp; ('+s.faces+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Hoekpunte (H):</span><span style="color:#6ee7b7;">'+s.V+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Rande (R):</span><span style="color:#6ee7b7;">'+s.E+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Euler: V + H - R:</span><span style="color:#'+(euler===2?'6ee7b7':'fca5a5')+';font-weight:700;">'+s.F+' + '+s.V+' - '+s.E+' = '+euler+(euler===2?' ✓':' ✗')+'</span></div>',
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Deursnit: </span><span style="color:#a5b4fc;font-size:11px;">'+s.cross+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Uitslaanpatroon-beskrywing: </span><span style="color:#a5b4fc;font-size:11px;">'+s.net+'</span></div>',
              ].join('');
            }
            document.getElementById('solid3dBtn').addEventListener('click',explore);
            document.getElementById('solid3d').addEventListener('change',explore);
            explore();
          })();
          </script>
          verbind met die regterbuurman?</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Die uitslaanpatroon van 'n silinder sluit in:", options: ["2 vierkante en 'n reghoek", "2 sirkels en 'n reghoek", "2 driehoeke en 3 reghoeke", "1 sirkel en 'n sektor"], answer: 1, topic: "3D-voorwerpe" },
        { type: "mc", text: "'n Horisontale deursnit van 'n keël (parallel aan die basis) lewer:", options: ["Driehoek", "Reghoek", "Sirkel", "Ellips"], answer: 2, topic: "3D-voorwerpe" },
        { type: "mc", text: "Die uitslaanpatroon van 'n vierkantige piramide het:", options: ["4 vierkante + 1 driehoek", "1 vierkant + 4 driehoeke", "5 driehoeke", "4 driehoeke + 2 vierkante"], answer: 1, topic: "3D-voorwerpe" },
        { type: "mc", text: "As jy 'n sfeer deur sy middelpunt sny, is die deursnit:", options: ["'n Ellips", "'n Grootsirkel", "'n Halfsfeer", "'n Halfsirkel"], answer: 1, topic: "3D-voorwerpe" },
        { type: "mc", text: "Die reghoek in die uitslaanpatroon van 'n silinder het 'n wydte gelyk aan:", options: ["2r", "pr", "2pr", "pr²"], answer: 2, topic: "3D-voorwerpe" },
        { type: "input", text: "'n Silinder se uitslaanpatroon het 'n reghoek waarvan die wydte gelyk is aan die omtrek van die sirkelvormige basis. Die basis het radius 7 cm (gebruik p ≈ 22/7) en die silinder se hoogte is 12 cm. Vind die oppervlakte van die reghoekige deel van die uitslaanpatroon (in cm²).", answer: "528", topic: "3D-voorwerpe" },
        { type: "input", text: "'n Vierkantige piramide se uitslaanpatroon bestaan uit 'n vierkantige basis met sy 8 cm en 4 kongruente driehoeke, elk met basis 8 cm en skuinshoogte 10 cm. Vind die totale oppervlakte van die uitslaanpatroon (in cm²).", answer: "224", topic: "3D-voorwerpe" },
      ]
    },
  ],
  workbook: {
    chapter: 17, chapterName: "Meetkunde van 3D-voorwerpe",
    topics: [
      {
        name: "Veelvlakke en Euler se Formule",
        questions: [
          {
            num: "1",
            text: "Kopieer en voltooi die tabel vir elke veelvlak, en verifieer dan Euler se formule:",
            parts: [
              { label: "a)", text: "Driehoekige prisma: voltooi V, H, R en verifieer V + H - R = 2.", marks: 4 },
              { label: "b)", text: "Sesghoekige prisma: voltooi V, H, R en verifieer Euler se formule.", marks: 4 },
              { label: "c)", text: "'n Veelvlak het 12 vlakke en 8 hoekpunte. Hoeveel rande het dit?", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Uitslaanpatrone en Deursnitte",
        questions: [
          {
            num: "2",
            text: "'n Driehoekige prisma het 'n gelyksydige-driehoekbasis met sy 6 cm en 'n lengte van 10 cm.",
            parts: [
              { label: "a)", text: "Skets die uitslaanpatroon van hierdie prisma, en dui al die afmetings aan.", marks: 4 },
              { label: "b)", text: "Bereken die totale oppervlakte met behulp van die uitslaanpatroon.", marks: 4 },
            ]
          },
          {
            num: "3",
            text: "Beskryf die deursnit wat gevorm word wanneer elke voorwerp soos beskryf gesny word:",
            parts: [
              { label: "a)", text: "'n Reghoekige prisma gesny deur 'n vlak parallel aan sy basis.", marks: 2 },
              { label: "b)", text: "'n Silinder gesny deur 'n vlak wat deur sy as (middellyn) gaan.", marks: 2 },
              { label: "c)", text: "'n Vierkantige piramide horisontaal gesny halfpad tussen die apeks en die basis.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 17, chapterName: "Hoofstuk 17 — Meetkunde van 3D-voorwerpe",
    topics: [
      {
        name: "Veelvlakke en Euler se Formule",
        answers: [
          { num: "Q1a", ans: "V=5, H=6, R=9; 5+6-9=2 ✓", note: "2 driehoeke + 3 reghoeke = 5 vlakke" },
          { num: "Q1b", ans: "V=8, H=12, R=18; 8+12-18=2 ✓", note: "2 sesghoeke + 6 reghoeke = 8 vlakke; 12 hoekpunte (6 op elke sesghoek)" },
          { num: "Q1c", ans: "R = 18", note: "V+H-R=2 → 12+8-R=2 → R=18" },
        ]
      },
      {
        name: "Uitslaanpatrone en Deursnitte",
        answers: [
          { num: "Q2a", ans: "Uitslaanpatroon: 2 gelyksydige driehoeke (sy 6cm) + 3 reghoeke (6cm × 10cm)", note: "Alle afmetings aangedui" },
          { num: "Q2b", ans: "OA = 2×(½×6×5,196) + 3×(6×10) = 31,18 + 180 ≈ 211,18 cm²", note: "Hoogte van gelyksydige driehoek = 6×√3/2 = 3√3 ≈ 5,196 cm" },
          { num: "Q3a", ans: "Reghoek (dieselfde afmetings as die basis)", note: "'n Parallele snit behou die deursnitvorm" },
          { num: "Q3b", ans: "Reghoek (wydte = deursnee, hoogte = lengte van die silinder)", note: "Aksiale deursnit" },
          { num: "Q3c", ans: "Vierkant (die helfte van die grootte van die basis, geskaleer met ½)", note: "By halfhoogte, soortgelyke deursnit met die helfte van die basisafmetings" },
        ]
      },
    ]
  }
});
