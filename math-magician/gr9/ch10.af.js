// Math Magician — Graad 9, Hoofstuk 10 data
// Meetkundige Konstruksies

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 19,
      chapter: 10,
      name: "Halveerders en loodlyne",
      fullName: "Konstrueer halveerders en loodlyne",
      lesson: {
        heading: "Halveerders en loodlyne",
        sub: "Hoofstuk 10 · Onderwerp 1",
        body: `
          <p>Meetkundige konstruksies gebruik slegs 'n <strong>passer</strong> en 'n <strong>liniaal</strong> (slegs gebruik om lyne te trek, nie om te meet nie).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelkonstruksies</div>
            <p>
              <strong>Middelloodlyn van AB:</strong><br>
              1. Maak die passer wyer as die helfte van AB oop. Trek boë bo en onder die lyn vanaf A, en dan vanaf B.<br>
              2. Verbind die twee snypunte. Hierdie lyn is loodreg op AB by sy middelpunt.<br><br>
              <strong>Hoekhalveerder van ∠ABC:</strong><br>
              1. Trek 'n boog vanaf B wat BA en BC by D en E sny.<br>
              2. Trek gelyke boë vanaf D en E; verbind B met hulle snypunt.<br><br>
              <strong>Loodlyn vanaf 'n punt na 'n lyn:</strong><br>
              Trek boë vanaf die punt wat die lyn by twee punte sny; konstrueer die middelloodlyn van daardie twee punte.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Sleutelfeite</div>
            <div class="example-step"><span class="step-num">1</span><span>'n Middelloodlyn sny 'n lynstuk teen 90° deur sy middelpunt.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>'n Hoekhalveerder verdeel 'n hoek in twee gelyke dele.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Die middelloodlyne van die sye van 'n driehoek ontmoet by die omsentrum.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Driehoekhoek-sakrekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer twee hoeke van 'n driehoek in. Vind die derde, en klassifiseer die driehoek volgens hoeke en sye.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;A (°)</label><input id="triA" type="number" value="60" min="1" max="178" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;B (°)</label><input id="triB" type="number" value="70" min="1" max="178" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="triBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="triOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              var a=parseFloat(document.getElementById('triA').value)||0;
              var b=parseFloat(document.getElementById('triB').value)||0;
              var c=180-a-b;
              if(c<=0||a<=0||b<=0){document.getElementById('triOut').innerHTML='<span style="color:#fca5a5;">Ongeldige hoeke: moet positief wees en tot 180° optel.</span>';return;}
              var max=Math.max(a,b,c);
              var aType=max===90?'Reghoekig':max>90?'Stomphoekig':'Skerphoekig';
              var sType=a===b&&b===c?'Gelyksydig':a===b||b===c||a===c?'Gelykbenig':'Ongelyksydig';
              document.getElementById('triOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:160px;display:inline-block;">Derde hoek &ang;C:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+c+'°</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:160px;display:inline-block;">Hoektipe:</span><span style="color:#fbbf24;">'+aType+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:160px;display:inline-block;">Sytipe:</span><span style="color:#fbbf24;">'+sType+'</span></div>',
                '<div style="font-size:10px;color:rgba(221,225,240,0.35);">'+a+'° + '+b+'° + '+c+'° = 180° &#10003;</div>',
              ].join('');
            }
            document.getElementById('triBtn').addEventListener('click',calc);
            ['triA','triB'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});

          })();
          </script>
        Die hoekhalveerders van 'n driehoek ontmoet by die insentrum.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>By SSS-konstruksies, as die som van die twee korter sye ≤ die langste sy, is geen driehoek moontlik nie — die sye sal nie ontmoet nie (dit staan bekend as die
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Reëlmatige Veelhoek-hoeksakrekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies die aantal sye. Sien binne- en buitehoeke, hoeksom, en 'n lewendige diagram.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="polyN" type="range" min="3" max="12" value="6" style="width:150px;accent-color:#6366f1;">
              <input id="polyNNum" type="number" min="3" max="12" value="6" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">sye</span>
            </div>
            <svg id="polySvg" viewBox="0 0 200 160" style="width:200px;height:160px;border-radius:8px;background:rgba(10,15,30,0.55);margin-bottom:10px;"></svg>
            <div id="polyOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var names={3:'Driehoek',4:'Vierkant',5:'Vyfhoek',6:'Seshoek',7:'Sewehoek',8:'Agthoek',9:'Negehoek',10:'Tienhoek',11:'Elfhoek',12:'Twaalfhoek'};
            function update(){
              var n=Math.max(3,Math.min(12,parseInt(document.getElementById('polyN').value)||6));
              document.getElementById('polyN').value=n;document.getElementById('polyNNum').value=n;
              var interior=(n-2)*180/n,exterior=360/n,sum=(n-2)*180;
              var svg=document.getElementById('polySvg');
              var cx=100,cy=80,r=60;
              var pts=Array.from({length:n},function(_,i){var a=2*Math.PI*i/n-Math.PI/2;return [(cx+r*Math.cos(a)).toFixed(1),(cy+r*Math.sin(a)).toFixed(1)];});
              svg.innerHTML='<polygon points="'+pts.map(function(p){return p.join(',');}).join(' ')+'" fill="rgba(99,102,241,0.18)" stroke="#6366f1" stroke-width="1.8"/>'+pts.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3" fill="#fbbf24"/>';}).join('');
              document.getElementById('polyOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:180px;display:inline-block;">Vorm:</span><span style="color:#fbbf24;font-weight:700;">'+(names[n]||n+'-hoek')+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:180px;display:inline-block;">Som van binnehoeke:</span><span style="color:#a5b4fc;"><strong>'+sum+'°</strong></span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:180px;display:inline-block;">Elke binnehoek:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+interior.toFixed(2)+'°</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:180px;display:inline-block;">Elke buitehoek:</span><span style="color:#6ee7b7;">'+exterior.toFixed(2)+'°</span></div>',
              ].join('');
            }
            document.getElementById('polyN').addEventListener('input',update);
            document.getElementById('polyNNum').addEventListener('input',function(){document.getElementById('polyN').value=this.value;update();});
            update();
          })();
          </script>
        driehoeksongelykheid).</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter voorwaarde is voldoende om 'n unieke driehoek te konstrueer?", options: ["SSS", "HHH", "Slegs SS", "Slegs H"], answer: 0, topic: "Konstruksies" },
        { type: "mc", text: "Die middelpuntshoek vir 'n reëlmatige seshoek wat in 'n sirkel ingeskryf is, is:", options: ["90°", "60°", "72°", "45°"], answer: 1, topic: "Konstruksies" },
        { type: "mc", text: "Kan jy 'n driehoek met sye 3 cm, 4 cm, 8 cm konstrueer?", options: ["Ja", "Nee — die driehoeksongelykheid faal", "Ja — dit is 'n reghoekige driehoek", "Slegs met 'n gradeboog"], answer: 1, topic: "Konstruksies" },
        { type: "mc", text: "Om 'n vierkant wat in 'n sirkel ingeskryf is te konstrueer, trek jy:", options: ["4 gelyke boë vanaf enige punt", "Twee loodregte deursnee", "'n Raaklyn by 4 punte", "4 boë vanaf die middelpunt"], answer: 1, topic: "Konstruksies" },
        { type: "mc", text: "In 'n SHS-konstruksie, staan die 'S' aan weerskante van die 'H' vir:", options: ["Som", "Sy", "Segment", "Simmetrie"], answer: 1, topic: "Konstruksies" },
        { type: "input", text: "'n Driehoek het een hoek van 40°. Van die oorblywende twee hoeke is een 3 keer so groot soos die ander. Bereken die grootte van die kleinste van die twee oorblywende hoeke.", answer: "35", topic: "Konstruksies" },
        { type: "input", text: "Die binnehoek van 'n reëlmatige veelhoek is 156°. Gebruik die binnehoek-formule om die aantal sye van die veelhoek te bepaal.", answer: "15", topic: "Konstruksies" },
      ]
    },
  ],
  workbook: {
    chapter: 10, chapterName: "Meetkundige Konstruksies",
    topics: [
      {
        name: "Halveerders en Loodlyne",
        questions: [
          {
            num: "1",
            text: "Deur slegs 'n passer en liniaal te gebruik:",
            parts: [
              { label: "a)", text: "Trek 'n lynstuk AB = 8 cm. Konstrueer die middelloodlyn daarvan. Benoem die middelpunt M.", marks: 4 },
              { label: "b)", text: "Trek 'n hoek van ongeveer 80° (gebruik 'n gradeboog vir hierdie stap). Halveer die hoek deur slegs 'n passer en liniaal te gebruik.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Konstrueer Driehoeke",
        questions: [
          {
            num: "2",
            text: "Konstrueer driehoek ABC waar AB = 7 cm, BC = 5 cm en AC = 6 cm (SSS). Meet en skryf hoek ABC neer.", marks: 6
          },
          {
            num: "3",
            text: "Konstrueer driehoek PQR waar PQ = 6 cm, hoek P = 50° en PR = 5 cm (SHS). Meet QR.", marks: 6
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 10, chapterName: "Hoofstuk 10 — Meetkundige Konstruksies",
    topics: [
      {
        name: "Halveerders en Loodlyne",
        answers: [
          { num: "Q1a", ans: "Ken punte toe vir: boë vanaf A en B geteken (radius > 4cm), twee snypunte gemerk, halveerder deur hulle getrek, middelpunt M benoem.", note: "Middelpunt op 4 cm vanaf elke punt" },
          { num: "Q1b", ans: "Ken punte toe vir: boog vanaf hoekpunt wat albei bene sny, gelyke boë vanaf daardie punte, halveerstraal getrek.", note: "Halveerder moet die hoek in twee gelyke dele verdeel" },
        ]
      },
      {
        name: "Konstrueer Driehoeke",
        answers: [
          { num: "Q2", ans: "Ken punte toe vir: basis AB = 7 cm, boog van 5 cm vanaf B, boog van 6 cm vanaf A, C by die snypunt, driehoek voltooi. Hoek ABC ≈ 57° (aanvaar 55°–59°).", note: "Gebruik die cosinusreël om te verifieer: cos B = (49+25-36)/70 = 38/70; B ≈ 57°" },
          { num: "Q3", ans: "Ken punte toe vir: PQ = 6 cm, 50°-hoek by P gekonstrueer, PR = 5 cm gemerk, QR getrek. QR ≈ 4,6 cm (aanvaar 4,4–4,8 cm).", note: "Cosinusreël: QR² = 36+25-60cos50 ≈ 22,4; QR ≈ 4,73" },
        ]
      },
    ]
  }
});
