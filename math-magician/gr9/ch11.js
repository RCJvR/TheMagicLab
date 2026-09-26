// Math Magician — Grade 9, Chapter 11 data
// Geometry of 2D Shapes

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 21,
      chapter: 11,
      name: "Triangles and quadrilaterals",
      fullName: "Properties of triangles and quadrilaterals",
      lesson: {
        heading: "Triangles and quadrilaterals",
        sub: "Chapter 11 · Topic 1",
        body: `
          <p>Understanding the properties of 2D shapes allows us to calculate unknown angles and sides.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Triangle properties</div>
            <p>
              <strong>Angle sum:</strong> angles in a triangle = 180°<br>
              <strong>Equilateral:</strong> 3 equal sides, 3 angles of 60°<br>
              <strong>Isosceles:</strong> 2 equal sides; angles opposite equal sides are equal<br>
              <strong>Scalene:</strong> no equal sides or angles<br>
              <strong>Right-angled:</strong> one angle = 90°<br>
              <strong>Exterior angle:</strong> = sum of the two non-adjacent interior angles
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Quadrilateral hierarchy</div>
            <p>
              <strong>Parallelogram:</strong> 2 pairs of parallel sides; opposite sides equal; opposite angles equal; diagonals bisect each other.<br>
              <strong>Rectangle:</strong> parallelogram + all angles 90°; diagonals equal.<br>
              <strong>Rhombus:</strong> parallelogram + all sides equal; diagonals bisect at 90°.<br>
              <strong>Square:</strong> rectangle + rhombus (all sides equal, all angles 90°).<br>
              <strong>Trapezium:</strong> exactly one pair of parallel sides.<br>
              <strong>Kite:</strong> two pairs of adjacent equal sides; one diagonal bisects the other at 90°.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In any triangle, the exterior angle equals the sum of the two non-adjacent interior angles.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Triangle &amp; Quadrilateral Angle Solver</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter known angles. The unknown angle is found using angle-sum rules.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Shape</label>
                <select id="shapeType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="tri">Triangle (sum = 180°)</option>
                  <option value="quad">Quadrilateral (sum = 360°)</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;1 (°)</label><input id="ang1" type="number" value="65" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;2 (°)</label><input id="ang2" type="number" value="75" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div id="ang3div" style="display:none;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;3 (°)</label><input id="ang3" type="number" value="110" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="angBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Find unknown</button>
            </div>
            <div id="angOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function setShape(){
              var isQ=document.getElementById('shapeType').value==='quad';
              document.getElementById('ang3div').style.display=isQ?'flex':'none';
            }
            document.getElementById('shapeType').addEventListener('change',function(){setShape();solve();});
            function solve(){
              var isQ=document.getElementById('shapeType').value==='quad';
              var total=isQ?360:180;
              var a1=parseFloat(document.getElementById('ang1').value)||0;
              var a2=parseFloat(document.getElementById('ang2').value)||0;
              var a3=isQ?(parseFloat(document.getElementById('ang3').value)||0):0;
              var known=a1+a2+a3,unknown=total-known;
              var out=document.getElementById('angOut');
              if(unknown<=0){out.innerHTML='<span style="color:#fca5a5;">Known angles already equal or exceed '+total+'°. Check values.</span>';return;}
              out.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Angle sum rule: </span><span style="color:#a5b4fc;">'+total+'°</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Sum of known angles: </span><span style="color:#fbbf24;">'+a1+'° + '+a2+'°'+(isQ?' + '+a3+'°':'')+' = '+known+'°</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Unknown angle x: </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+unknown+'°</span></div>',
                '<div style="font-size:10px;color:rgba(221,225,240,0.35);margin-top:2px;">'+total+'° - '+known+'° = '+unknown+'°</div>',
              ].join('');
            }
            document.getElementById('angBtn').addEventListener('click',solve);
            setShape();solve();
          })();
          </script>
        Every square is a rectangle AND a rhombus. But not every rectangle is a square.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Two angles of a triangle are 47° and 83°. The third angle is:", options: ["50°", "40°", "60°", "130°"], answer: 0, topic: "2D Shapes" },
        { type: "mc", text: "In an isosceles triangle, the base angles are each 55°. The apex angle is:", options: ["55°", "70°", "110°", "90°"], answer: 1, topic: "2D Shapes" },
        { type: "mc", text: "Which quadrilateral has diagonals that bisect each other at 90°?", options: ["Rectangle", "Trapezium", "Rhombus", "Kite"], answer: 2, topic: "2D Shapes" },
        { type: "input", text: "The exterior angle of a triangle is 115°. One non-adjacent interior angle is 60°. Find the other non-adjacent interior angle.", answer: "55", topic: "2D Shapes" },
        { type: "mc", text: "Which statement about a parallelogram is FALSE?", options: ["Opposite sides are equal", "Opposite angles are equal", "All angles are 90°", "Diagonals bisect each other"], answer: 2, topic: "2D Shapes" },
        { type: "input", text: "In triangle PQR, angle P = (3x + 5)°, angle Q = 2x°, and angle R = (4x - 5)°. Find x.", answer: "20", topic: "2D Shapes" },
        { type: "input", text: "The angles of a quadrilateral are in the ratio 2 : 3 : 4 : 6. Calculate the size of the largest angle (in degrees).", answer: "144", topic: "2D Shapes" },
      ]
    },
    {
      id: 22,
      chapter: 11,
      name: "Similar and congruent shapes",
      fullName: "Similarity and congruence of triangles",
      lesson: {
        heading: "Similar and congruent triangles",
        sub: "Chapter 11 · Topic 2",
        body: `
          <p><strong>Congruent</strong> shapes are identical (same shape AND size). <strong>Similar</strong> shapes have the same shape but different sizes.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Congruence conditions (triangles)</div>
            <p>
              <strong>SSS:</strong> three sides equal<br>
              <strong>SAS:</strong> two sides and included angle equal<br>
              <strong>AAS/ASA:</strong> two angles and a corresponding side equal<br>
              <strong>RHS:</strong> right angle, hypotenuse and one side equal
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Similarity</div>
            <p>
              Triangles are similar if:<br>
              • All three pairs of angles are equal (AA is sufficient), OR<br>
              • All sides are in the same ratio (SSS similarity)<br><br>
              <strong>Scale factor k:</strong> if sides of △ABC are k times sides of △DEF, then areas are in ratio k²
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In similarity problems, always match corresponding vertices in the same order. △ABC ||| △DEF means A→D, B→E, C→F.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Similar Triangles Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter the sides of △ABC and △DEF (in matching order). Leave one side of △DEF empty to find it.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stA" id="g9stAL">AB</label><input id="g9stA" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stB" id="g9stBL">BC</label><input id="g9stB" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stC" id="g9stCL">AC</label><input id="g9stC" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stD" id="g9stDL">DE</label><input id="g9stD" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stE" id="g9stEL">EF</label><input id="g9stE" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stF" id="g9stFL">DF</label><input id="g9stF" type="number" value="" placeholder="?" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div id="g9stOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function similarTriangles(T) {
  var $ = function (id) { return document.getElementById(id); };
  var ids = ['g9stA', 'g9stB', 'g9stC', 'g9stD', 'g9stE', 'g9stF'];
  function v(id) { var s = $(id).value.replace(',', '.').trim(); return s === '' ? null : parseFloat(s); }
  function f(x) { return String(Math.round(x * 1000) / 1000).replace('.', ','); }
  function run() {
    var s = ids.map(v), out = $('g9stOut');
    if (s.slice(0, 3).some(function (x) { return x === null || isNaN(x) || x <= 0; })) { out.innerHTML = '<span style="color:#fca5a5;">' + T.needABC + '</span>'; return; }
    var blanks = s.slice(3).filter(function (x) { return x === null; }).length;
    if (blanks > 1 || s.slice(3).some(function (x) { return x !== null && (isNaN(x) || x <= 0); })) { out.innerHTML = '<span style="color:#fca5a5;">' + T.needDEF + '</span>'; return; }
    var names = ['DE/AB', 'EF/BC', 'DF/AC'], ratios = [];
    for (var i = 0; i < 3; i++) if (s[i + 3] !== null) ratios.push([names[i], s[i + 3] / s[i]]);
    var k = ratios[0][1], same = ratios.every(function (r) { return Math.abs(r[1] - k) < 1e-6 * Math.max(1, k); });
    var h = '<div>' + ratios.map(function (r) { return r[0] + ' = ' + f(r[1]); }).join(' &nbsp; ') + '</div>';
    if (!same) { out.innerHTML = h + '<div style="color:#fca5a5;">✗ ' + T.notSim + '</div>'; return; }
    if (blanks === 1) {
      var j = s.slice(3).indexOf(null), side = ['DE', 'EF', 'DF'][j], orig = ['AB', 'BC', 'AC'][j];
      h += '<div style="color:#fbbf24;">' + side + ' = k × ' + orig + ' = ' + f(k) + ' × ' + f(s[j]) + ' = <b>' + f(k * s[j]) + '</b></div>';
    }
    h += '<div style="color:#6ee7b7;">✓ ' + (Math.abs(k - 1) < 1e-9 ? T.cong : T.sim) + '</div>' +
      '<div>' + T.scale + ' k = ' + f(k) + ' &nbsp; | &nbsp; ' + T.area + ' = k² = ' + f(k * k) + '</div>';
    out.innerHTML = h;
  }
  ids.forEach(function (id) { $(id).addEventListener('input', run); });
  run();
})({"tryit":"Try it","needABC":"Enter all three sides of △ABC.","needDEF":"Enter the sides of △DEF — at most one may be empty.","notSim":"The ratios differ, so the triangles are NOT similar.","sim":"Similar (sides in proportion: SSS similarity).","cong":"Congruent (k = 1: all sides equal, SSS).","scale":"Scale factor","area":"area ratio"});
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Two triangles have angles 40°, 70°, 70° and 40°, 70°, 70°. They are:", options: ["Congruent", "Similar (not necessarily congruent)", "Neither", "Both congruent and similar"], answer: 1, topic: "2D Shapes" },
        { type: "mc", text: "Which is NOT a congruence condition for triangles?", options: ["SSS", "AAS", "AAA", "RHS"], answer: 2, topic: "2D Shapes" },
        { type: "input", text: "Two similar triangles have a scale factor of 3. If the smaller triangle has area 8 cm², what is the area of the larger triangle?", answer: "72", topic: "2D Shapes" },
        { type: "mc", text: "△ABC ||| △DEF with AB = 4, DE = 6 and BC = 5. Find EF.", options: ["7,5", "3,33", "7", "10"], answer: 0, topic: "2D Shapes" },
        { type: "mc", text: "The SAS congruence condition requires:", options: ["Two sides equal only", "Two angles and a side equal", "Two sides AND the INCLUDED angle equal", "Two sides and any angle equal"], answer: 2, topic: "2D Shapes" },
        { type: "input", text: "Two similar triangles have areas 18 cm² and 50 cm². If the perimeter of the smaller triangle is 24 cm, find the perimeter of the larger triangle (in cm).", answer: "40", topic: "2D Shapes" },
        { type: "input", text: "Triangle ABC is similar to triangle DEF, with triangle DEF the larger one. The ratio of their areas is 4 : 9. If the shortest side of triangle ABC is 6 cm, find the length of the corresponding shortest side of triangle DEF (in cm).", answer: "9", topic: "2D Shapes" },
      ]
    },
  ],
  workbook: {
    chapter: 11, chapterName: "Geometry of 2D Shapes",
    topics: [
      {
        name: "Triangles and Quadrilaterals",
        questions: [
          {
            num: "1",
            text: "In triangle ABC: angle A = (2x + 10)°, angle B = (3x - 5)° and angle C = (x + 15)°.",
            parts: [
              { label: "a)", text: "Find x.", marks: 3 },
              { label: "b)", text: "Find each angle.", marks: 3 },
              { label: "c)", text: "Classify the triangle (acute, obtuse or right-angled).", marks: 2 },
            ]
          },
          {
            num: "2",
            text: "ABCD is a parallelogram. Angle A = (4y - 10)° and angle B = (2y + 30)°.",
            parts: [
              { label: "a)", text: "Find y. (Use the co-interior angle property: A + B = 180°)", marks: 3 },
              { label: "b)", text: "Find all four angles of the parallelogram.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Similarity and Congruence",
        questions: [
          {
            num: "3",
            text: "Two similar triangles have corresponding sides in the ratio 2 : 5.",
            parts: [
              { label: "a)", text: "If the smaller triangle has perimeter 18 cm, find the perimeter of the larger triangle.", marks: 2 },
              { label: "b)", text: "If the larger triangle has area 100 cm², find the area of the smaller triangle.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 11, chapterName: "Chapter 11 — Geometry of 2D Shapes",
    topics: [
      {
        name: "Triangles and Quadrilaterals",
        answers: [
          { num: "Q1a", ans: "x = 27", note: "(2x+10)+(3x-5)+(x+15)=180 → 6x+20=180 → x=27" },
          { num: "Q1b", ans: "A=64°, B=76°, C=57°", note: "Substitute x=27 into each" },
          { num: "Q1c", ans: "Acute-angled triangle", note: "All angles less than 90°" },
          { num: "Q2a", ans: "y = 26,67 — accept y = 80/3", note: "(4y-10)+(2y+30)=180 → 6y+20=180 → y=160/6=26,7" },
          { num: "Q2b", ans: "A = C ≈ 96,7°; B = D ≈ 83,3°", note: "Opposite angles of parallelogram equal; co-interior supplement each other" },
        ]
      },
      {
        name: "Similarity and Congruence",
        answers: [
          { num: "Q3a", ans: "45 cm", note: "18 × 5/2 = 45" },
          { num: "Q3b", ans: "16 cm²", note: "Area ratio = (2/5)² = 4/25; smaller = 100 × 4/25 = 16 cm²" },
        ]
      },
    ]
  }
});
