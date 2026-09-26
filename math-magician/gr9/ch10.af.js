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
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Middelloodlyn- en Halveerlynverkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kyk na die passerboë van ’n middelloodlyn of ’n hoekhalveerlyn. Sleep die geel punte.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9bsMode">Konstruksie</label><select id="g9bsMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;">
              <option value="perp">Middelloodlyn van AB</option>
              <option value="angle">Halveerlyn van ∠ABC</option></select></div>
              <span id="g9bsHint" style="font-size:10px;color:rgba(221,225,240,0.45);margin-bottom:8px;"></span></div>
            <svg id="g9bsSvg" viewBox="0 0 360 250" style="width:100%;max-width:520px;display:block;background:#12103a;border:1px solid rgba(99,102,241,0.25);border-radius:10px;touch-action:none;"></svg>
            <div id="g9bsOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;margin-top:8px;"></div>
          </div>
          <script>
          (function bisectors(T) {
  var $ = function (id) { return document.getElementById(id); };
  var svg = $('g9bsSvg'), NS = 'http://www.w3.org/2000/svg';
  var P = { A: [70, 190], B: [250, 190], C: [300, 60] };
  var drag = null;
  function el(tag, at) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); svg.appendChild(e); return e; }
  function dist(p, q) { return Math.hypot(p[0] - q[0], p[1] - q[1]); }
  function arc(c, r, from, to, col) { // arc around centre c from angle from..to (radians)
    var d = ''; for (var i = 0; i <= 24; i++) { var t = from + (to - from) * i / 24; d += (i ? 'L' : 'M') + (c[0] + r * Math.cos(t)).toFixed(1) + ' ' + (c[1] + r * Math.sin(t)).toFixed(1); }
    el('path', { d: d, fill: 'none', stroke: col, 'stroke-width': 1.3, 'stroke-dasharray': '4 3' });
  }
  function circ2(p, q, r) { // intersections of two circles of radius r about p and q
    var d = dist(p, q), h = Math.sqrt(Math.max(r * r - d * d / 4, 0)), mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    var ux = (q[0] - p[0]) / d, uy = (q[1] - p[1]) / d;
    return [[mx - uy * h, my + ux * h], [mx + uy * h, my - ux * h]];
  }
  function line(p, q, col, w, ext) {
    var dx = q[0] - p[0], dy = q[1] - p[1];
    el('line', { x1: p[0] - dx * ext, y1: p[1] - dy * ext, x2: q[0] + dx * ext, y2: q[1] + dy * ext, stroke: col, 'stroke-width': w });
  }
  function dot(p, lab, col, drag) {
    el('circle', { cx: p[0], cy: p[1], r: drag ? 7 : 3.5, fill: col, 'data-pt': drag || '', style: drag ? 'cursor:grab' : '' });
    var t = el('text', { x: p[0] + 9, y: p[1] - 8, fill: col, 'font-size': 13, 'font-family': 'JetBrains Mono,monospace' }); t.textContent = lab;
  }
  function ang(p) { return Math.atan2(p[1], p[0]); }
  function deg(v, w) { var a = Math.abs(Math.atan2(v[0] * w[1] - v[1] * w[0], v[0] * w[0] + v[1] * w[1])) * 180 / Math.PI; return a; }
  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var mode = $('g9bsMode').value, out = $('g9bsOut'), A = P.A, B = P.B, C = P.C;
    $('g9bsHint').textContent = T.drag;
    if (mode === 'perp') {
      var d = dist(A, B), r = d * 0.6, X = circ2(A, B, r), M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      var aAB = ang([B[0] - A[0], B[1] - A[1]]);
      arc(A, r, aAB - 0.9, aAB + 0.9, '#a5b4fc'); arc(B, r, aAB + Math.PI - 0.9, aAB + Math.PI + 0.9, '#a5b4fc');
      line(A, B, '#e8eaf4', 2, 0);
      line(X[0], X[1], '#fbbf24', 2, 0.25);
      dot(X[0], 'P', '#a5b4fc'); dot(X[1], 'Q', '#a5b4fc'); dot(M, 'M', '#6ee7b7');
      dot(A, 'A', '#fcd34d', 'A'); dot(B, 'B', '#fcd34d', 'B');
      out.innerHTML = '<div>AM = ' + String((dist(A, M) / 20).toFixed(2)).replace('.', ',') + ' &nbsp; MB = ' + String((dist(M, B) / 20).toFixed(2)).replace('.', ',') + ' <span style="color:#6ee7b7;">✓ ' + T.equal + '</span></div>' +
        '<div>∠PMA = ' + deg([X[0][0] - M[0], X[0][1] - M[1]], [A[0] - M[0], A[1] - M[1]]).toFixed(0) + '° <span style="color:#6ee7b7;">✓ ' + T.perp + '</span></div>' +
        '<div style="color:rgba(221,225,240,0.55);">' + T.perpSteps + '</div>';
    } else {
      var r1 = Math.min(dist(B, A), dist(B, C)) * 0.45;
      var uA = [(A[0] - B[0]) / dist(A, B), (A[1] - B[1]) / dist(A, B)], uC = [(C[0] - B[0]) / dist(C, B), (C[1] - B[1]) / dist(C, B)];
      var D = [B[0] + uA[0] * r1, B[1] + uA[1] * r1], E = [B[0] + uC[0] * r1, B[1] + uC[1] * r1];
      var a1 = ang(uA), a2 = ang(uC); if (Math.abs(a2 - a1) > Math.PI) { if (a2 > a1) a2 -= 2 * Math.PI; else a1 -= 2 * Math.PI; }
      arc(B, r1, Math.min(a1, a2) - 0.15, Math.max(a1, a2) + 0.15, '#a5b4fc');
      var r2 = dist(D, E) * 0.75 + 12, X2 = circ2(D, E, r2);
      var F = dist(X2[0], B) > dist(X2[1], B) ? X2[0] : X2[1];
      var aF = ang([F[0] - D[0], F[1] - D[1]]), aF2 = ang([F[0] - E[0], F[1] - E[1]]);
      arc(D, r2, aF - 0.35, aF + 0.35, '#a5b4fc'); arc(E, r2, aF2 - 0.35, aF2 + 0.35, '#a5b4fc');
      line(B, A, '#e8eaf4', 2, 0); line(B, C, '#e8eaf4', 2, 0);
      var far = [B[0] + (F[0] - B[0]) * 1.6, B[1] + (F[1] - B[1]) * 1.6];
      line(B, far, '#fbbf24', 2, 0);
      dot(D, 'D', '#a5b4fc'); dot(E, 'E', '#a5b4fc'); dot(F, 'F', '#6ee7b7');
      dot(A, 'A', '#fcd34d', 'A'); dot(B, 'B', '#fcd34d', 'B'); dot(C, 'C', '#fcd34d', 'C');
      var vF = [F[0] - B[0], F[1] - B[1]], t1 = deg([A[0] - B[0], A[1] - B[1]], vF), t2 = deg(vF, [C[0] - B[0], C[1] - B[1]]);
      out.innerHTML = '<div>∠ABC = ' + (t1 + t2).toFixed(0) + '° &nbsp; ∠ABF = ' + t1.toFixed(1).replace('.', ',') + '° &nbsp; ∠FBC = ' + t2.toFixed(1).replace('.', ',') + '° <span style="color:#6ee7b7;">✓ ' + T.equal + '</span></div>' +
        '<div style="color:rgba(221,225,240,0.55);">' + T.angSteps + '</div>';
    }
  }
  function pt(e) { var r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * 360 / r.width, (e.clientY - r.top) * 250 / r.height]; }
  svg.addEventListener('pointerdown', function (e) { var k = e.target.getAttribute && e.target.getAttribute('data-pt'); if (k) { drag = k; svg.setPointerCapture(e.pointerId); e.preventDefault(); } });
  svg.addEventListener('pointermove', function (e) {
    if (!drag) return; var p = pt(e); p[0] = Math.max(12, Math.min(348, p[0])); p[1] = Math.max(12, Math.min(238, p[1]));
    var other = drag === 'B' ? [P.A, P.C] : [P.B]; if (other.some(function (q) { return dist(p, q) < 40; })) return;
    P[drag] = p; draw();
  });
  svg.addEventListener('pointerup', function () { drag = null; });
  $('g9bsMode').addEventListener('change', function () {
    P = $('g9bsMode').value === 'perp' ? { A: [70, 190], B: [290, 110], C: [300, 60] } : { A: [60, 200], B: [180, 210], C: [300, 60] };
    draw();
  });
  P = { A: [70, 190], B: [290, 110], C: [300, 60] };
  draw();
})({"tryit":"Probeer dit","drag":"Sleep A, B (en C) om hulle te skuif.","equal":"gelyk","perp":"loodreg","perpSteps":"Gelyke boë vanaf A en B sny by P en Q. Lyn PQ sny AB teen 90° deur sy middelpunt M.","angSteps":"’n Boog vanaf B sny BA by D en BC by E. Gelyke boë vanaf D en E sny by F. Lyn BF halveer ∠ABC."});
          </script>
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
          <div class="tip-box"><span class="tip-icon">💡</span><span>By SSS-konstruksies, as die som van die twee korter sye ≤ die langste sy, is geen driehoek moontlik nie — die sye sal nie ontmoet nie (dit staan bekend as die driehoeksongelykheid).</span></div>
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
