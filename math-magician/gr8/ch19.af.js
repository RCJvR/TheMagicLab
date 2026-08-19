// Math Magician — Grade 8, Chapter 19 data (Afrikaans)
// Geometry of 3D Shapes

MathMagician.registerChapter(19, {
  topics: [
    {
      id: 1901,
      chapter: 19,
      name: "Klassifisering van 3D-voorwerpe",
      fullName: "Klassifisering en benoeming van 3D-voorwerpe",
      lesson: {
        heading: "Klassifisering van 3D-voorwerpe",
        sub: "Hoofstuk 19 · Onderwerp 1",
        body: `
          <p>3D-voorwerpe (vaste voorwerpe) neem ruimte in drie rigtings in: lengte, breedte en hoogte. Ons klassifiseer hulle deur hul <strong>vlakke</strong>, <strong>hoekpunte</strong> en <strong>rande</strong> te tel.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelwoorde</div>
            <p>
              <strong>Vlak:</strong> 'n plat (of geboë) oppervlak van 'n vaste voorwerp.<br>
              <strong>Rand:</strong> 'n lyn waar twee vlakke ontmoet.<br>
              <strong>Hoekpunt</strong> (meervoud: hoekpunte): 'n hoekpunt waar rande ontmoet.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Families van 3D-voorwerpe</div>
            <p>
              <strong>Prismas:</strong> twee identiese, ewewydige veelhoek-eindes (basisse), verbind deur plat reghoekige vlakke. Benoem volgens die vorm van die basis.<br>
              &nbsp;&nbsp;• Driehoekige prisma — basis is 'n driehoek<br>
              &nbsp;&nbsp;• Reghoekige prisma (kubusvormig) — basis is 'n reghoek<br>
              &nbsp;&nbsp;• Sesboekige prisma — basis is 'n sesboek<br><br>
              <strong>Piramides:</strong> een veelhoek-basis, met driehoekige vlakke wat by 'n enkele punt (die apex) ontmoet. Benoem volgens die vorm van die basis.<br>
              &nbsp;&nbsp;• Vierkantige piramide, driehoekige piramide, ens.<br><br>
              <strong>Silinder:</strong> twee sirkelvormige eindes verbind deur een geboë oppervlak.<br>
              <strong>Keël:</strong> een sirkelvormige basis wat na 'n enkele apex vernou, verbind deur een geboë oppervlak.<br>
              <strong>Sfeer:</strong> perfek rond — elke punt op die oppervlak is dieselfde afstand van die middelpunt. Geen plat vlakke, rande of hoekpunte nie.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>'n Graankosboks is 'n <strong>reghoekige prisma</strong> — sy twee reghoekige eindes word deur vier reghoekige vlakke verbind.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>'n Verkeerskeël is 'n <strong>keël</strong> — een sirkelvormige basis, wat na 'n punt vernou.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>'n Tent wat soos 'n driehoek van die kant af lyk, met 'n reghoekige vloer, is 'n <strong>driehoekige prisma</strong>.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Prismas en piramides word na die vorm van hul <strong>basis</strong> benoem — kyk altyd eers na die basis!</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — 3D-vormverkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n vaste voorwerp om te sien hoeveel vlakke, hoekpunte en rande dit het.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Vaste voorwerp</label>
                <select id="g8solid" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="cube">Kubus</option>
                  <option value="rect">Reghoekige prisma</option>
                  <option value="tri_prism">Driehoekige prisma</option>
                  <option value="hex_prism">Sesboekige prisma</option>
                  <option value="square_pyr">Vierkantige piramide</option>
                  <option value="tri_pyr">Driehoekige piramide</option>
                  <option value="cylinder">Silinder</option>
                  <option value="cone">Keël</option>
                  <option value="sphere">Sfeer</option>
                </select>
              </div>
              <button id="g8solidBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Verken</button>
            </div>
            <div id="g8solidOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var solids={
              cube:{name:'Kubus',family:'Prisma (spesiale reghoekige prisma)',F:6,V:8,E:12,faces:'6 vierkante'},
              rect:{name:'Reghoekige Prisma',family:'Prisma',F:6,V:8,E:12,faces:'6 reghoeke'},
              tri_prism:{name:'Driehoekige Prisma',family:'Prisma',F:5,V:6,E:9,faces:'2 driehoeke + 3 reghoeke'},
              hex_prism:{name:'Sesboekige Prisma',family:'Prisma',F:8,V:12,E:18,faces:'2 sesboeke + 6 reghoeke'},
              square_pyr:{name:'Vierkantige Piramide',family:'Piramide',F:5,V:5,E:8,faces:'1 vierkantige basis + 4 driehoeke'},
              tri_pyr:{name:'Driehoekige Piramide',family:'Piramide',F:4,V:4,E:6,faces:'4 driehoeke'},
              cylinder:{name:'Silinder',family:'Geboë vaste voorwerp',F:'3 (2 plat + 1 geboë)',V:0,E:'2 (geboë)',faces:'2 sirkels + 1 geboë oppervlak'},
              cone:{name:'Keël',family:'Geboë vaste voorwerp',F:'2 (1 plat + 1 geboë)',V:1,E:'1 (geboë)',faces:'1 sirkel + 1 geboë oppervlak'},
              sphere:{name:'Sfeer',family:'Geboë vaste voorwerp',F:'1 (geboë)',V:0,E:0,faces:'1 geboë oppervlak, geen plat vlakke nie'},
            };
            function explore(){
              var key=document.getElementById('g8solid').value;
              var s=solids[key];
              document.getElementById('g8solidOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Naam:</span><span style="color:#fbbf24;font-weight:700;">'+s.name+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Familie:</span><span style="color:#a5b4fc;">'+s.family+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Vlakke (F):</span><span style="color:#6ee7b7;">'+s.F+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Hoekpunte (V):</span><span style="color:#6ee7b7;">'+s.V+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Rande (E):</span><span style="color:#6ee7b7;">'+s.E+'</span></div>',
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Vlakvorms: </span><span style="color:#a5b4fc;font-size:11px;">'+s.faces+'</span></div>',
              ].join('');
            }
            document.getElementById('g8solidBtn').addEventListener('click',explore);
            document.getElementById('g8solid').addEventListener('change',explore);
            explore();
          })();
          </script>

          <div class="def-box" style="margin-top:14px;">
            <div class="def-box-title">🔎 Interessante feit — Euler se formule</div>
            <p>Vir die meeste vaste voorwerpe met plat vlakke (poliëders), is daar 'n netjiese verband tussen vlakke (F), hoekpunte (V) en rande (E):<br><br>
            <span class="math">F + V − E = 2</span><br><br>
            Probeer dit op 'n kubus: <span class="math">6 + 8 − 12 = 2</span> ✓. Dit werk ook vir prismas en piramides — probeer dit in die verkenner hierbo!</p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "'n Vaste voorwerp met twee identiese driehoekige eindes wat deur drie reghoeke verbind word, word 'n ... genoem:", options: ["Driehoekige piramide", "Driehoekige prisma", "Keël", "Tetraëder"], answer: 1, topic: "3D-vorms" },
        { type: "mc", text: "'n Vaste voorwerp met een vierkantige basis en vier driehoekige vlakke wat by 'n punt ontmoet, is 'n:", options: ["Reghoekige prisma", "Vierkantige piramide", "Kubus", "Silinder"], answer: 1, topic: "3D-vorms" },
        { type: "input", text: "Hoeveel plat vlakke het 'n kubus?", answer: "6", topic: "3D-vorms" },
        { type: "mc", text: "Watter vaste voorwerp het glad geen plat vlakke, rande of hoekpunte nie?", options: ["Keël", "Silinder", "Sfeer", "Kubus"], answer: 2, topic: "3D-vorms" },
        { type: "input", text: "'n Driehoekige piramide (tetraëder) het hoeveel hoekpunte?", answer: "4", topic: "3D-vorms" },
        { type: "input", text: "'n Poliëder het 10 vlakke en 16 hoekpunte. Gebruik Euler se formule (F + V − E = 2) om te bepaal hoeveel rande dit het.", answer: "24", topic: "3D-vorms" },
        { type: "input", text: "'n Prisma het 'n reëlmatige veelhoek-basis met n sye, wat dit 3n rande in totaal gee (n op elke basis, plus n verbindende rande). As hierdie prisma 24 rande het, hoeveel sye het sy basisveelhoek?", answer: "8", topic: "3D-vorms" },
      ]
    },
    {
      id: 1902,
      chapter: 19,
      name: "Uitslaanpatrone van prismas en piramides",
      fullName: "Uitslaanpatrone van prismas en piramides",
      lesson: {
        heading: "Uitslaanpatrone van prismas en piramides",
        sub: "Hoofstuk 19 · Onderwerp 2",
        body: `
          <p>'n <strong>Uitslaanpatroon</strong> is 'n 2D-vorm wat opgevou kan word om 'n 3D-voorwerp te maak, sonder gapings en sonder oorvleueling. Elke vlak van die vaste voorwerp verskyn presies een keer in sy uitslaanpatroon.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Uitslaanpatrone van algemene vaste voorwerpe</div>
            <p>
              <strong>Kubus:</strong> 6 vierkante (verskeie verskillende rangskikkings vou korrek, bv. 'n "kruis"-vorm).<br>
              <strong>Reghoekige prisma:</strong> 6 reghoeke, gerangskik in 3 passende pare.<br>
              <strong>Driehoekige prisma:</strong> 2 driehoeke (die basisse) + 3 reghoeke (die sye).<br>
              <strong>Vierkantige piramide:</strong> 1 vierkant (die basis) + 4 driehoeke (die skuins sye), wat by die apex ontmoet.<br>
              <strong>Driehoekige piramide:</strong> 4 driehoeke.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Dink oor uitslaanpatrone</div>
            <div class="example-step"><span class="step-num">1</span><span>Om 'n uitslaanpatroon te vind, verbeel jy die vaste voorwerp word langs sy rande "oopgevou" en elke vlak plat neergelê.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Tel eers die vlakke van die vaste voorwerp — die uitslaanpatroon moet presies daardie aantal stukke hê.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Ooreenstemmende sye in die uitslaanpatroon moet dieselfde lengte wees, sodat die vorm perfek opvou.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Om te kontroleer of 'n uitslaanpatroon korrek is, verbeel jy vou dit in jou gedagtes: kom die rande presies bymekaar, en is elke vlak van die vaste voorwerp presies een keer ingesluit?</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Pas die Vaste Voorwerp by sy Uitslaanpatroon</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n vaste voorwerp en kyk watter uitslaanpatroon opvou om dit te maak.</p>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
              <button class="g8net-btn" data-s="cube" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.15);color:#a5b4fc;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">Kubus</button>
              <button class="g8net-btn" data-s="tri_prism" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(245,158,11,0.30);background:rgba(245,158,11,0.08);color:#fbbf24;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">Driehoekige prisma</button>
              <button class="g8net-btn" data-s="square_pyr" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(16,185,129,0.30);background:rgba(16,185,129,0.08);color:#6ee7b7;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">Vierkantige piramide</button>
            </div>
            <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
              <svg id="g8netSvg" viewBox="0 0 260 160" style="width:260px;max-width:100%;border-radius:8px;background:rgba(10,15,30,0.60);flex-shrink:0;"></svg>
              <div id="g8netDesc" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;flex:1;min-width:160px;"></div>
            </div>
          </div>
          <script>
          (function(){
            var NETS = {
              cube: {
                title: 'Uitslaanpatroon van \\'n Kubus',
                color: '#a5b4fc',
                pieces: '6 vierkante',
                desc: ['6 identiese vierkante', 'Gerangskik in \\'n kruispatroon', 'Vou op tot \\'n kubus met 6 vlakke, 8 hoekpunte, 12 rande'],
                draw: function(){
                  var h='', s=30, ox=60, oy=20;
                  var cells=[[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]];
                  cells.forEach(function(c){
                    var x=ox+c[0]*s, y=oy+c[1]*s;
                    h+='<rect x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" fill="rgba(99,102,241,0.15)" stroke="#6366f1" stroke-width="1.5"/>';
                  });
                  return h;
                }
              },
              tri_prism: {
                title: 'Uitslaanpatroon van \\'n Driehoekige Prisma',
                color: '#fbbf24',
                pieces: '2 driehoeke + 3 reghoeke',
                desc: ['2 driehoeke (die basisse)', '3 reghoeke (die sye)', 'Vou op tot \\'n prisma met 5 vlakke, 6 hoekpunte, 9 rande'],
                draw: function(){
                  var h='';
                  h+='<polygon points="20,140 50,80 80,140" fill="rgba(245,158,11,0.12)" stroke="#fbbf24" stroke-width="1.5"/>';
                  h+='<rect x="80" y="90" width="50" height="50" fill="rgba(245,158,11,0.12)" stroke="#fbbf24" stroke-width="1.5"/>';
                  h+='<rect x="130" y="90" width="50" height="50" fill="rgba(245,158,11,0.12)" stroke="#fbbf24" stroke-width="1.5"/>';
                  h+='<rect x="180" y="90" width="50" height="50" fill="rgba(245,158,11,0.12)" stroke="#fbbf24" stroke-width="1.5"/>';
                  h+='<polygon points="180,140 210,80 240,140" fill="rgba(245,158,11,0.12)" stroke="#fbbf24" stroke-width="1.5"/>';
                  return h;
                }
              },
              square_pyr: {
                title: 'Uitslaanpatroon van \\'n Vierkantige Piramide',
                color: '#6ee7b7',
                pieces: '1 vierkant + 4 driehoeke',
                desc: ['1 vierkant (die basis)', '4 driehoeke (die skuins sye)', 'Vou op tot \\'n piramide met 5 vlakke, 5 hoekpunte, 8 rande'],
                draw: function(){
                  var h='', cx=130, cy=100, s=50;
                  h+='<rect x="'+(cx-s/2)+'" y="'+(cy-s/2)+'" width="'+s+'" height="'+s+'" fill="rgba(16,185,129,0.12)" stroke="#6ee7b7" stroke-width="1.5"/>';
                  h+='<polygon points="'+(cx-s/2)+','+(cy-s/2)+' '+(cx+s/2)+','+(cy-s/2)+' '+cx+',20" fill="rgba(16,185,129,0.08)" stroke="#6ee7b7" stroke-width="1.5"/>';
                  h+='<polygon points="'+(cx-s/2)+','+(cy+s/2)+' '+(cx+s/2)+','+(cy+s/2)+' '+cx+',180" fill="rgba(16,185,129,0.08)" stroke="#6ee7b7" stroke-width="1.5"/>';
                  h+='<polygon points="'+(cx-s/2)+','+(cy-s/2)+' '+(cx-s/2)+','+(cy+s/2)+' 40,'+cy+'" fill="rgba(16,185,129,0.08)" stroke="#6ee7b7" stroke-width="1.5"/>';
                  h+='<polygon points="'+(cx+s/2)+','+(cy-s/2)+' '+(cx+s/2)+','+(cy+s/2)+' 220,'+cy+'" fill="rgba(16,185,129,0.08)" stroke="#6ee7b7" stroke-width="1.5"/>';
                  return h;
                }
              }
            };
            function render(key){
              var n=NETS[key];
              document.getElementById('g8netSvg').innerHTML=n.draw();
              document.getElementById('g8netDesc').innerHTML=
                '<div style="color:'+n.color+';font-weight:700;font-family:Syne,sans-serif;margin-bottom:4px;">'+n.title+'</div>'+
                '<div style="color:rgba(221,225,240,0.55);margin-bottom:4px;">Stukke: '+n.pieces+'</div>'+
                n.desc.map(function(d){return '<div style="color:rgba(221,225,240,0.70);">✓ '+d+'</div>';}).join('');
            }
            document.querySelectorAll('.g8net-btn').forEach(function(btn){
              btn.addEventListener('click',function(){render(btn.dataset.s);});
            });
            render('cube');
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Die uitslaanpatroon van 'n kubus bestaan uit:", options: ["6 reghoeke", "6 vierkante", "4 vierkante en 2 driehoeke", "8 driehoeke"], answer: 1, topic: "3D-vorms" },
        { type: "mc", text: "Die uitslaanpatroon van 'n driehoekige prisma sluit in:", options: ["2 driehoeke + 3 reghoeke", "3 driehoeke + 2 reghoeke", "5 reghoeke", "2 vierkante + 3 driehoeke"], answer: 0, topic: "3D-vorms" },
        { type: "mc", text: "Die uitslaanpatroon van 'n vierkantige piramide sluit in:", options: ["5 driehoeke", "1 vierkant + 4 driehoeke", "4 vierkante + 1 driehoek", "2 vierkante + 3 driehoeke"], answer: 1, topic: "3D-vorms" },
        { type: "input", text: "Hoeveel afsonderlike stukke (vlakke) vorm die uitslaanpatroon van 'n driehoekige piramide (tetraëder)?", answer: "4", topic: "3D-vorms" },
        { type: "mc", text: "Wanneer jy kontroleer of 'n uitslaanpatroon korrek is, wat moet waar wees van die ooreenstemmende rande wanneer dit opgevou word?", options: ["Hulle kan enige lengte wees", "Hulle moet dieselfde lengte wees sodat hulle presies bymekaarkom", "Slegs sommige hoef ooreen te stem", "Rande hoef nooit ooreen te stem nie"], answer: 1, topic: "3D-vorms" },
        { type: "input", text: "'n Vyfhoekige prisma het 2 vyfhoek-eindes verbind deur 5 reghoeke. Bepaal die aantal vlakke (F), hoekpunte (V), en rande (E), en verifieer Euler se formule. Wat is E?", answer: "15", topic: "3D-vorms" },
        { type: "input", text: "'n Uitslaanpatroon vir 'n sesboekige prisma bestaan uit 2 kongruente reëlmatige sesboeke (gekombineerde area 41.6 cm²) en 6 kongruente reghoeke, elk 4 cm by 10 cm. Bereken die totale area van die uitslaanpatroon.", answer: "281.6", topic: "3D-vorms" },
      ]
    },
  ],
  workbook: {
    chapter: 19, chapterName: "Meetkunde van 3D-vorms",
    topics: [
      {
        name: "Klassifisering van 3D-voorwerpe",
        questions: [
          {
            num: "1",
            text: "Kopieer en voltooi die tabel hieronder deur die vaste voorwerp te benoem en F, V en E te tel:",
            parts: [
              { label: "a)", text: "'n Vaste voorwerp met 2 sesboekige eindes verbind deur 6 reghoeke. Benoem dit en gee F, V, E.", marks: 3 },
              { label: "b)", text: "'n Vaste voorwerp met 1 vierkantige basis en 4 driehoekige vlakke. Benoem dit en gee F, V, E.", marks: 3 },
              { label: "c)", text: "Verduidelik waarom 'n sfeer geen rande of hoekpunte het nie.", marks: 2 },
            ]
          }
        ]
      },
      {
        name: "Uitslaanpatrone van prismas en piramides",
        questions: [
          {
            num: "2",
            text: "Beskou 'n driehoekige prisma met 'n gelyksydige driehoek-basis.",
            parts: [
              { label: "a)", text: "Skets 'n moontlike uitslaanpatroon vir hierdie prisma, en benoem elke stuk.", marks: 4 },
              { label: "b)", text: "Hoeveel stukke is in die uitslaanpatroon, en watter vorms is dit?", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "'n Uitslaanpatroon van 'n vierkantige piramide word geteken met die vierkantige basis in die middel.",
            parts: [
              { label: "a)", text: "Hoeveel driehoeke omring die vierkantige basis?", marks: 1 },
              { label: "b)", text: "Verifieer Euler se formule (F + V − E = 2) vir die vierkantige piramide.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 19, chapterName: "Hoofstuk 19 — Meetkunde van 3D-vorms",
    topics: [
      {
        name: "Klassifisering van 3D-voorwerpe",
        answers: [
          { num: "Q1a", ans: "Sesboekige prisma; F=8, V=12, E=18", note: "2 sesboeke + 6 reghoeke = 8 vlakke" },
          { num: "Q1b", ans: "Vierkantige piramide; F=5, V=5, E=8", note: "1 vierkantige basis + 4 driehoekige vlakke" },
          { num: "Q1c", ans: "'n Sfeer is perfek geboë sonder plat vlakke wat ontmoet, dus is daar geen rande (waar vlakke ontmoet) of hoekpunte (waar rande ontmoet) nie.", note: "" },
        ]
      },
      {
        name: "Uitslaanpatrone van prismas en piramides",
        answers: [
          { num: "Q2a", ans: "2 gelyksydige driehoeke + 3 reghoeke gerangskik in 'n strook", note: "Basisse aan elke kant, reghoeke wat hulle verbind" },
          { num: "Q2b", ans: "5 stukke: 2 driehoeke en 3 reghoeke", note: "Stem ooreen met die 5 vlakke van 'n driehoekige prisma" },
          { num: "Q3a", ans: "4 driehoeke", note: "Een vir elke sy van die vierkantige basis" },
          { num: "Q3b", ans: "F=5, V=5, E=8; 5+5-8=2 ✓", note: "Euler se formule geld" },
        ]
      },
    ]
  }
});
