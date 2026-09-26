// Math Magician — Grade 9, Chapter 10 data
// Geometric Constructions

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 19,
      chapter: 10,
      name: "Bisectors and perpendiculars",
      fullName: "Constructing bisectors and perpendicular lines",
      lesson: {
        heading: "Bisectors and perpendicular lines",
        sub: "Chapter 10 · Topic 1",
        body: `
          <p>Geometric constructions use only a <strong>compass</strong> and <strong>straight edge</strong> (ruler used for drawing lines only, not measuring).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key constructions</div>
            <p>
              <strong>Perpendicular bisector of AB:</strong><br>
              1. Open compass to more than half AB. Draw arcs above and below the line from A, then from B.<br>
              2. Connect the two intersection points. This line is perpendicular to AB at its midpoint.<br><br>
              <strong>Angle bisector of ∠ABC:</strong><br>
              1. Draw an arc from B to cut BA and BC at D and E.<br>
              2. Draw equal arcs from D and E; connect B to their intersection.<br><br>
              <strong>Perpendicular from a point to a line:</strong><br>
              Draw arcs from the point to cut the line at two points; construct the perpendicular bisector of those two points.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Key facts</div>
            <div class="example-step"><span class="step-num">1</span><span>A perpendicular bisector cuts a line segment at 90° through its midpoint.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>An angle bisector divides an angle into two equal parts.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>The perpendicular bisectors of the sides of a triangle meet at the circumcentre.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Bisector Construction Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Watch the compass arcs of a perpendicular bisector or an angle bisector. Drag the yellow points.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9bsMode">Construction</label><select id="g9bsMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;">
              <option value="perp">Perpendicular bisector of AB</option>
              <option value="angle">Angle bisector of ∠ABC</option></select></div>
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
})({"tryit":"Try it","drag":"Drag A, B (and C) to move them.","equal":"equal","perp":"perpendicular","perpSteps":"Equal arcs from A and B meet at P and Q. Line PQ cuts AB at 90° through its midpoint M.","angSteps":"An arc from B cuts BA at D and BC at E. Equal arcs from D and E meet at F. Line BF halves ∠ABC."});
          </script>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Triangle Angle Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter two angles of a triangle. Find the third, classify the triangle by angles and sides.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;A (°)</label><input id="triA" type="number" value="60" min="1" max="178" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;B (°)</label><input id="triB" type="number" value="70" min="1" max="178" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="triBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="triOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              var a=parseFloat(document.getElementById('triA').value)||0;
              var b=parseFloat(document.getElementById('triB').value)||0;
              var c=180-a-b;
              if(c<=0||a<=0||b<=0){document.getElementById('triOut').innerHTML='<span style="color:#fca5a5;">Invalid angles — must be positive and sum to 180°.</span>';return;}
              var max=Math.max(a,b,c);
              var aType=max===90?'Right-angled':max>90?'Obtuse':'Acute';
              var sType=a===b&&b===c?'Equilateral':a===b||b===c||a===c?'Isosceles':'Scalene';
              document.getElementById('triOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:160px;display:inline-block;">Third angle &ang;C:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+c+'°</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:160px;display:inline-block;">Angle type:</span><span style="color:#fbbf24;">'+aType+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:160px;display:inline-block;">Side type:</span><span style="color:#fbbf24;">'+sType+'</span></div>',
                '<div style="font-size:10px;color:rgba(221,225,240,0.35);">'+a+'° + '+b+'° + '+c+'° = 180° &#10003;</div>',
              ].join('');
            }
            document.getElementById('triBtn').addEventListener('click',calc);
            ['triA','triB'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});

          })();
          </script>
        The angle bisectors of a triangle meet at the incentre.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For SSS constructions, if the sum of the two shorter sides ≤ longest side, no triangle is possible — the sides won't meet (this is known as the triangle inequality).</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Regular Polygon Angle Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Choose the number of sides. See interior and exterior angles, angle sum, and a live diagram.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="polyN" type="range" min="3" max="12" value="6" style="width:150px;accent-color:#6366f1;">
              <input id="polyNNum" type="number" min="3" max="12" value="6" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:13px;">sides</span>
            </div>
            <svg id="polySvg" viewBox="0 0 200 160" style="width:200px;height:160px;border-radius:8px;background:rgba(10,15,30,0.55);margin-bottom:10px;"></svg>
            <div id="polyOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var names={3:'Triangle',4:'Square',5:'Pentagon',6:'Hexagon',7:'Heptagon',8:'Octagon',9:'Nonagon',10:'Decagon',11:'Hendecagon',12:'Dodecagon'};
            function update(){
              var n=Math.max(3,Math.min(12,parseInt(document.getElementById('polyN').value)||6));
              document.getElementById('polyN').value=n;document.getElementById('polyNNum').value=n;
              var interior=(n-2)*180/n,exterior=360/n,sum=(n-2)*180;
              var svg=document.getElementById('polySvg');
              var cx=100,cy=80,r=60;
              var pts=Array.from({length:n},function(_,i){var a=2*Math.PI*i/n-Math.PI/2;return [(cx+r*Math.cos(a)).toFixed(1),(cy+r*Math.sin(a)).toFixed(1)];});
              svg.innerHTML='<polygon points="'+pts.map(function(p){return p.join(',');}).join(' ')+'" fill="rgba(99,102,241,0.18)" stroke="#6366f1" stroke-width="1.8"/>'+pts.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3" fill="#fbbf24"/>';}).join('');
              document.getElementById('polyOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:180px;display:inline-block;">Shape:</span><span style="color:#fbbf24;font-weight:700;">'+(names[n]||n+'-gon')+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:180px;display:inline-block;">Interior angle sum:</span><span style="color:#a5b4fc;"><strong>'+sum+'°</strong></span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:180px;display:inline-block;">Each interior angle:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+interior.toFixed(2)+'°</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:180px;display:inline-block;">Each exterior angle:</span><span style="color:#6ee7b7;">'+exterior.toFixed(2)+'°</span></div>',
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
        { type: "mc", text: "Which condition is sufficient to construct a unique triangle?", options: ["SSS", "AAA", "SS only", "A only"], answer: 0, topic: "Constructions" },
        { type: "mc", text: "The central angle for a regular hexagon inscribed in a circle is:", options: ["90°", "60°", "72°", "45°"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "Can you construct a triangle with sides 3 cm, 4 cm, 8 cm?", options: ["Yes", "No — triangle inequality fails", "Yes — it's a right triangle", "Only with a protractor"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "To construct a square inscribed in a circle, you draw:", options: ["4 equal arcs from any point", "Two perpendicular diameters", "A tangent at 4 points", "4 arcs from the centre"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "In a SAS construction, the 'S' on either side of 'A' stands for:", options: ["Sum", "Side", "Segment", "Symmetry"], answer: 1, topic: "Constructions" },
        { type: "input", text: "A triangle has one angle of 40°. Of the remaining two angles, one is 3 times the size of the other. Calculate the size of the smaller of the two remaining angles.", answer: "35", topic: "Constructions" },
        { type: "input", text: "The interior angle of a regular polygon is 156°. Using the interior angle formula, determine the number of sides of the polygon.", answer: "15", topic: "Constructions" },
      ]
    },
  ],
  workbook: {
    chapter: 10, chapterName: "Geometric Constructions",
    topics: [
      {
        name: "Bisectors and Perpendiculars",
        questions: [
          {
            num: "1",
            text: "Using only a compass and straight edge:",
            parts: [
              { label: "a)", text: "Draw a line segment AB = 8 cm. Construct its perpendicular bisector. Label the midpoint M.", marks: 4 },
              { label: "b)", text: "Draw an angle of approximately 80° (use a protractor for this step). Bisect the angle using only compass and straight edge.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Constructing Triangles",
        questions: [
          {
            num: "2",
            text: "Construct triangle ABC where AB = 7 cm, BC = 5 cm and AC = 6 cm (SSS). Measure and write down angle ABC.", marks: 6
          },
          {
            num: "3",
            text: "Construct triangle PQR where PQ = 6 cm, angle P = 50° and PR = 5 cm (SAS). Measure QR.", marks: 6
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 10, chapterName: "Chapter 10 — Geometric Constructions",
    topics: [
      {
        name: "Bisectors and Perpendiculars",
        answers: [
          { num: "Q1a", ans: "Award marks for: arcs drawn from A and B (radius > 4cm), two intersection points marked, bisector drawn through them, midpoint M labelled.", note: "Midpoint at 4 cm from each end" },
          { num: "Q1b", ans: "Award marks for: arc from vertex cutting both arms, equal arcs from those points, bisector ray drawn.", note: "Bisector should split angle into two equal parts" },
        ]
      },
      {
        name: "Constructing Triangles",
        answers: [
          { num: "Q2", ans: "Award marks for: base AB = 7 cm, arc of 5 cm from B, arc of 6 cm from A, C at intersection, triangle completed. Angle ABC ≈ 57° (accept 55°–59°).", note: "Use cosine rule to verify: cos B = (49+25-36)/70 = 38/70; B ≈ 57°" },
          { num: "Q3", ans: "Award marks for: PQ = 6 cm, 50° angle at P constructed, PR = 5 cm marked, QR drawn. QR ≈ 4,6 cm (accept 4,4–4,8 cm).", note: "Cosine rule: QR² = 36+25-60cos50 ≈ 22,4; QR ≈ 4,73" },
        ]
      },
    ]
  }
});
