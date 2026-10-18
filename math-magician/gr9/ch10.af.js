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
            <div class="example-step"><span class="step-num">4</span><span>Die hoekhalveerders van 'n driehoek ontmoet by die insentrum.</span></div>
          </div>
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
    {
      id: 1001,
      chapter: 10,
      name: "Spesiale hoeke konstrueer",
      fullName: "Hoeke van 90°, 60°, 45°, 30° en 120° met 'n passer konstrueer",
      lesson: {
        heading: "Spesiale hoeke konstrueer",
        sub: "Hoofstuk 10 · Onderwerp 2",
        body: `
<p>Met net 'n passer en 'n liniaal (vir reguit lyne, nie om te meet nie) kan jy hoeke van 90° en 60° konstrueer, en deur hulle te halveer, 45° en 30°.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":280,"h":200,"view":[-0.5,-0.6,6.5,5.6],"pts":{"A":[0,0],"B":[6,0],"D":[3,0],"E":[1.5,2.598076211353316],"F":[3.2,5.542562584220407]},"nolab":["F"],"lab":{"A":"sw","B":"se","D":"s","E":"nw"},"seg":[["A","B"],["A","F","ac"]],"arc":[["A",3,-5,75,"mu"],["D",3,100,140,"mu"]],"ang":[["B","A","E","60°","gn",22]],"dots":["D","E"]}'></div>
<div class="def-box">
  <div class="def-box-title">📖 60° konstrueer</div>
<p>1. Trek 'n lyn AB.<br>2. Met die passerpunt op A, trek 'n boog wat AB by D sny.<br>3. Hou dieselfde radius. Met die punt op D, trek 'n boog wat die eerste boog by E sny.<br>4. Trek 'n lyn van A deur E. ∠EAB = 60°, want driehoek ADE het drie gelyke sye (dit is gelyksydig).</p>
</div>
<div class="def-box">
  <div class="def-box-title">📖 Die ander spesiale hoeke</div>
<p><strong>90°:</strong> konstrueer die loodlyn by 'n punt op die lyn.<br><strong>30°:</strong> halveer 'n hoek van 60°.<br><strong>45°:</strong> halveer 'n hoek van 90°.<br><strong>120°:</strong> konstrueer 60° en gebruik die hoek langsaan op die reguit lyn (180° − 60°).</p>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Moet nooit jou konstruksieboë uitvee nie: hulle is die bewys dat jy die hoek gekonstrueer en nie gemeet het nie.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Om 'n hoek van 30° te konstrueer:", "options": ["halveer jy 'n hoek van 90°", "halveer jy 'n hoek van 60°", "halveer jy 'n hoek van 45°", "meet jy met 'n gradeboog"], "answer": 1, "topic": "Spesiale hoeke konstrueer"},
        {"type": "mc", "text": "Hoekom is die hoek in die 60°-konstruksie presies 60°?", "options": ["Die boë is gebuig", "Die liniaal is reguit", "Die driehoek wat vorm, het drie gelyke sye", "Die passer is op 6 cm gestel"], "answer": 2, "topic": "Spesiale hoeke konstrueer"},
        {"type": "input", "text": "Jy halveer 'n hoek van 90° en halveer dan een van die helftes. Hoe groot is die kleinste hoek? (°)", "answer": "22.5", "altAnswers": ["22,5"], "topic": "Spesiale hoeke konstrueer"},
        {"type": "mc", "text": "Watter hoek kan jy uit 'n 60°-konstruksie op 'n reguit lyn kry?", "options": ["100°", "75°", "135°", "120°"], "answer": 3, "topic": "Spesiale hoeke konstrueer"},
        {"type": "mc", "text": "In 'n konstruksie word die liniaal gebruik:", "options": ["net om reguit lyne te trek", "om lengtes te meet", "om hoeke te meet", "glad nie"], "answer": 0, "topic": "Spesiale hoeke konstrueer"},
        {"type": "input", "text": "Jy konstrueer 60° en halveer dit dan twee keer. Watter hoek kry jy? (°)", "answer": "15", "topic": "Spesiale hoeke konstrueer"},
      ]
    },
    {
      id: 1002,
      chapter: 10,
      name: "Driehoeke konstrueer",
      fullName: "Driehoeke uit sye en hoeke konstrueer en hul hoeke ondersoek",
      lesson: {
        heading: "Driehoeke konstrueer",
        sub: "Hoofstuk 10 · Onderwerp 3",
        body: `
<p>'n Driehoek is vas sodra jy genoeg sye en hoeke ken. Dieselfde voorwaardes wat bewys dat driehoeke kongruent is, sê vir jou wat jy nodig het om een te konstrueer: SSS, SHS, HSH (of HHS) en RHS.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":280,"h":210,"view":[-0.5,-0.8,7.5,5.2],"pts":{"A":[0,0],"B":[7,0],"C":[2.2,4.3]},"lab":{"A":"sw","B":"se","C":"n"},"seg":[["A","B","ln",null,"7 cm"],["A","C","ac",null,"4,8 cm"],["B","C","ac",null,"6,5 cm"]],"arc":[["A",4.83,50,75,"mu"],["B",6.45,130,148,"mu"]]}'></div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: konstrueer 'n driehoek met sye 7 cm, 6,5 cm en 4,8 cm (SSS)</div>
  <div class="example-step"><span class="step-num">1</span><span>Trek die langste sy AB = 7 cm.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Stel die passer op 4,8 cm en trek 'n boog vanaf A.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Stel die passer op 6,5 cm en trek 'n boog vanaf B. Die boë kruis by C.</span></div>
  <div class="example-step"><span class="step-num">4</span><span>Verbind AC en BC.</span></div>
</div>
<div class="def-box">
  <div class="def-box-title">📖 Ondersoek: die buitehoek</div>
<p>Verleng een sy van jou driehoek. Meet die buitehoek en die twee binnehoeke wat nie langs dit is nie. Die buitehoek is altyd gelyk aan hul som.</p>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>'n Driehoek met sye 3, 4 en 8 cm kan nie gekonstrueer word nie: die twee korter sye moet saam langer as die langste sy wees.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Watter stel sye kan NIE 'n driehoek vorm nie?", "options": ["5, 6, 7", "4, 4, 7", "2, 3, 6", "6, 8, 10"], "answer": 2, "topic": "Driehoeke konstrueer"},
        {"type": "mc", "text": "Om 'n driehoek te konstrueer met twee sye en die hoek tussen hulle gegee, gebruik jy:", "options": ["SSS", "SHS", "HSH", "RHS"], "answer": 1, "topic": "Driehoeke konstrueer"},
        {"type": "input", "text": "'n Buitehoek van 'n driehoek is 118°. Een teenoorstaande binnehoek is 47°. Bepaal die ander teenoorstaande binnehoek. (°)", "answer": "71", "topic": "Driehoeke konstrueer"},
        {"type": "input", "text": "Twee hoeke van 'n driehoek is 35° en 80°. Wat is die buitehoek langs die derde hoek? (°)", "answer": "115", "topic": "Driehoeke konstrueer"},
        {"type": "mc", "text": "In 'n SSS-konstruksie word die derde hoekpunt gevind waar:", "options": ["twee boë kruis", "twee lyne parallel is", "'n gradeboog 90° lees", "die basis gehalveer word"], "answer": 0, "topic": "Driehoeke konstrueer"},
        {"type": "mc", "text": "'n Gelyksydige driehoek word met sye van 5 cm gekonstrueer. Elke hoek is:", "options": ["45°", "60°", "90°", "elke keer anders"], "answer": 1, "topic": "Driehoeke konstrueer"},
        { type: "input", text: "Twee sye van 'n driehoek is 5 cm en 8 cm. Die derde sy is 'n heel aantal sentimeter. Wat is die langste derde sy wat jy kan gebruik en steeds 'n driehoek kan konstrueer? (cm)", answer: "12", topic: "Driehoeke konstrueer" }
      ]
    },
    {
      id: 1003,
      chapter: 10,
      name: "Vierhoeke en hul hoeklyne",
      fullName: "Vierhoeke konstrueer en die eienskappe van hul hoeklyne ondersoek",
      lesson: {
        heading: "Vierhoeke en hul hoeklyne",
        sub: "Hoofstuk 10 · Onderwerp 4",
        body: `
<p>Konstrueer die vierhoeke akkuraat, trek hul hoeklyne en meet. Jy sal vind dat elke soort sy eie hoeklyn-eienskappe het.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":300,"h":180,"view":[-0.5,-2.2,13,5.5],"pts":{"P":[0,0],"Q":[5,0],"R":[5,4],"S":[0,4],"K":[9.5,0],"L":[11.5,2.5],"M":[9.5,5],"N":[7.5,2.5]},"lab":{"P":"sw","Q":"se","R":"ne","S":"nw","K":"s","L":"e","M":"n","N":"w"},"poly":[["P","Q","R","S","fl"],["K","L","M","N","fl2"]],"seg":[["P","Q"],["Q","R"],["R","S"],["S","P"],["P","R","ac"],["Q","S","ac"],["K","L"],["L","M"],["M","N"],["N","K"],["K","M","hl"],["L","N","hl"]],"ra":[["L",[9.5,2.5],"M"]],"txt":[[2.5,-1.8,"reghoek","mu"],[9.5,-1.8,"ruit","mu"]]}'></div>
<div class="def-box">
  <div class="def-box-title">📖 Wat die hoeklyne doen</div>
<p><strong>Parallelogram:</strong> hulle halveer mekaar.<br><strong>Reghoek:</strong> hulle halveer mekaar en is ewe lank.<br><strong>Ruit:</strong> hulle halveer mekaar teen 90° en halveer die hoeke.<br><strong>Vierkant:</strong> al die bogenoemde: ewe lank, halveer mekaar teen 90°.<br><strong>Vlieër:</strong> hulle ontmoet teen 90°; die lang hoeklyn halveer die kort een.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: 'n parallelogram konstrueer</div>
  <div class="example-step"><span class="step-num">1</span><span>Trek AB = 6 cm en konstrueer ∠A = 60° (soos in onderwerp 1). Merk AD = 4 cm op die been.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Trek vanaf D 'n boog van 6 cm; vanaf B 'n boog van 4 cm. Hulle kruis by C.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Verbind DC en BC. Albei pare oorstaande sye is gelyk, so ABCD is 'n parallelogram.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>'n Vierkant is 'n spesiale reghoek EN 'n spesiale ruit, so sy hoeklyne het albei stelle eienskappe.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "In watter vierhoek is die hoeklyne ewe lank maar NIE loodreg nie?", "options": ["reghoek", "ruit", "vlieër", "vierkant"], "answer": 0, "topic": "Vierhoeke en hul hoeklyne"},
        {"type": "mc", "text": "Die hoeklyne van 'n ruit:", "options": ["is altyd ewe lank", "ontmoet nooit", "halveer mekaar teen 90°", "is parallel"], "answer": 2, "topic": "Vierhoeke en hul hoeklyne"},
        {"type": "input", "text": "Die hoeklyne van reghoek ABCD sny by O. AC = 14 cm. Hoe lank is OB? (cm)", "answer": "7", "topic": "Vierhoeke en hul hoeklyne"},
        {"type": "mc", "text": "'n Vierhoek het hoeklyne wat loodreg is, en net een halveer die ander. Dit is 'n:", "options": ["vierkant", "ruit", "reghoek", "vlieër"], "answer": 3, "topic": "Vierhoeke en hul hoeklyne"},
        {"type": "mc", "text": "Watter stelling is waar vir ELKE parallelogram?", "options": ["Sy hoeklyne is ewe lank", "Sy hoeklyne halveer mekaar", "Sy hoeklyne is loodreg", "Al sy hoeke is 90°"], "answer": 1, "topic": "Vierhoeke en hul hoeklyne"},
        {"type": "input", "text": "Die hoeklyne van 'n ruit is 12 cm en 16 cm. Hoe lank is elke sy? (cm)", "answer": "10", "topic": "Vierhoeke en hul hoeklyne"},
        { type: "mc", text: "Jy konstrueer 'n vierhoek waarvan die hoeklyne mekaar halveer en ewe lank is, maar nie loodreg is nie. Wat het jy gekonstrueer?", options: ["'n Reghoek wat nie 'n vierkant is nie","'n Ruit","'n Vierkant","'n Vlieër"], answer: 0, topic: "Vierhoeke en hul hoeklyne" }
      ]
    },
    {
      id: 1004,
      chapter: 10,
      name: "Hfst 10 Eksamenfokus",
      fullName: "Eksamenoefening: meetkundige konstruksies",
      lesson: {
        heading: "Hfst 10 Eksamenfokus",
        sub: "Hoofstuk 10 · Onderwerp 5",
        body: `
<p>Hierdie vrae meng die hele hoofstuk, soos 'n toets doen. Toon al die boë in 'n konstruksievraag; meet versigtig in 'n ondersoek en sê wat jy opmerk.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Skryf die reël of formule neer wat jy gebruik, vervang dan, en gee die antwoord met eenhede. Punte word vir elke stap gegee.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Om 45° te konstrueer, halveer jy:", "options": ["60°", "90°", "30°", "180°"], "answer": 1, "topic": "Hfst 10 Eksamenfokus"},
        {"type": "mc", "text": "Die middelloodlyn van AB gaan deur:", "options": ["die middelpunt van AB teen 90°", "net A", "net B", "'n punt buite AB, teen 45°"], "answer": 0, "topic": "Hfst 10 Eksamenfokus"},
        {"type": "input", "text": "Die binnehoeke van 'n driehoek is x, 2x en 3x. Bepaal x. (°)", "answer": "30", "topic": "Hfst 10 Eksamenfokus"},
        {"type": "mc", "text": "Elke punt op die halveerlyn van 'n hoek is:", "options": ["op een been", "nader aan een been", "ewe ver van albei bene", "by die hoekpunt"], "answer": 2, "topic": "Hfst 10 Eksamenfokus"},
        {"type": "input", "text": "'n Vlieër het hoeklyne van 10 cm en 24 cm. Wat is sy oppervlakte? (cm²)", "answer": "120", "topic": "Hfst 10 Eksamenfokus"},
        { type: "mc", text: "Jy mag net 'n passer en 'n liniaal gebruik. Hoe kan jy 'n hoek van 75° konstrueer?", options: ["Konstrueer 90° en 60° op dieselfde been, en halveer dan die hoek tussen die 60°- en 90°-lyne","Konstrueer 120° en halveer dit twee keer","Konstrueer 45° en tel dan 60° daarby","Halveer 90° drie keer"], answer: 0, topic: "Hfst 10 Eksamenfokus" }
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
      {
        "name": "Driehoeke konstrueer",
        "questions": [
          {
            "num": "4",
            "text": "Gebruik 'n passer en liniaal. Toon al die konstruksieboë.",
            "parts": [
              {
                "label": "a)",
                "text": "Konstrueer △ABC met AB = 8 cm, ∠A = 60° en AC = 6 cm.",
                "marks": 4
              },
              {
                "label": "b)",
                "text": "Verleng AB verby B tot D. Meet ∠CBD, ∠A en ∠C. Wat merk jy op?",
                "marks": 3
              },
              {
                "label": "c)",
                "text": "Konstrueer 'n ruit met sye van 5 cm en een hoek van 60°. Trek en meet sy hoeklyne.",
                "marks": 4
              }
            ]
          }
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
      {
        "name": "Driehoeke konstrueer",
        "answers": [
          {
            "num": "Q4a",
            "ans": "Konstruksie: 60° by A met boë, AC = 6 cm op die been gemerk, BC verbind.",
            "note": "SHS-konstruksie; boë moet sigbaar wees."
          },
          {
            "num": "Q4b",
            "ans": "∠CBD = ∠A + ∠C (ongeveer 60° + 74° ≈ 134°)",
            "note": "Buitehoek = som van teenoorstaande binnehoeke."
          },
          {
            "num": "Q4c",
            "ans": "Hoeklyne ongeveer 5 cm en 8,7 cm; hulle halveer mekaar teen 90°.",
            "note": "Die kort hoeklyn vorm 'n gelyksydige driehoek met twee sye."
          }
        ]
      },
    ]
  }
});
