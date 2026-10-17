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
    {
      id: 1101,
      chapter: 11,
      name: "Angles of polygons",
      fullName: "The sum of the interior angles of polygons",
      lesson: {
        heading: "Angles of polygons",
        sub: "Chapter 11 · Topic 3",
        body: `
<p>Draw all the diagonals from one corner of a polygon. A polygon with n sides is split into (n − 2) triangles, and each triangle's angles add up to 180°.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":220,"h":210,"pts":{"A":[1.8369701987210297e-16,3.0],"B":[-2.8531695488854605,0.9270509831248426],"C":[-1.7633557568774196,-2.427050983124842],"D":[1.7633557568774187,-2.427050983124843],"E":[2.853169548885461,0.9270509831248415]},"poly":[["A","B","C","D","E","fl"]],"seg":[["A","B"],["B","C"],["C","D"],["D","E"],["E","A"],["A","C","ac"],["A","D","ac"]],"txt":[[-1.25,0.5,"1","or"],[0,-1.3,"2","or"],[1.25,0.5,"3","or"]]}'></div>
<div class="def-box">
  <div class="def-box-title">📖 Sum of the interior angles</div>
<p><span class="math">sum = (n − 2) × 180°</span><br>A pentagon (n = 5): 3 × 180° = 540°. A hexagon (n = 6): 4 × 180° = 720°.<br>In a <strong>regular</strong> polygon all angles are equal, so each angle = (n − 2) × 180° ÷ n.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: a regular octagon</div>
  <div class="example-step"><span class="step-num">1</span><span>n = 8: sum = 6 × 180° = 1 080°</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Each angle = 1 080° ÷ 8 = <strong>135°</strong></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: find the number of sides</div>
  <div class="example-step"><span class="step-num">1</span><span>The angles of a polygon add up to 1 440°. How many sides does it have?</span></div>
  <div class="example-step"><span class="step-num">2</span><span>(n − 2) × 180 = 1 440, so n − 2 = 8 and <strong>n = 10</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>The exterior angles of any convex polygon, one at each corner, always add up to 360°.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "What is the sum of the interior angles of a hexagon? (°)", "answer": "720", "topic": "Angles of polygons"},
        {"type": "input", "text": "What is each interior angle of a regular pentagon? (°)", "answer": "108", "topic": "Angles of polygons"},
        {"type": "input", "text": "The interior angles of a polygon add up to 1 260°. How many sides does it have?", "answer": "9", "topic": "Angles of polygons"},
        {"type": "input", "text": "Four angles of a pentagon are 100°, 110°, 95° and 120°. Find the fifth angle. (°)", "answer": "115", "topic": "Angles of polygons"},
        {"type": "input", "text": "What is each exterior angle of a regular hexagon? (°)", "answer": "60", "topic": "Angles of polygons"},
        {"type": "mc", "text": "A regular polygon has interior angles of 150°. How many sides does it have?", "options": ["10", "11", "12", "15"], "answer": 2, "topic": "Angles of polygons"},
      ]
    },
    {
      id: 1102,
      chapter: 11,
      name: "Exterior angles of triangles",
      fullName: "The exterior angle of a triangle and solving problems with it",
      lesson: {
        heading: "Exterior angles of triangles",
        sub: "Chapter 11 · Topic 4",
        body: `
<p>If you extend one side of a triangle, the angle formed outside is an <strong>exterior angle</strong>.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":300,"h":180,"view":[-0.4,-0.6,8,3.6],"pts":{"A":[0,0],"B":[5,0],"C":[1.8,3],"D":[7.5,0]},"lab":{"A":"sw","B":"s","C":"n","D":"s"},"seg":[["A","B"],["B","C"],["C","A"],["B","D","dash"]],"ang":[["C","B","D","x","hl",18],["B","A","C","a","ac",22],["A","C","B","c","ac",18]]}'></div>
<div class="def-box">
  <div class="def-box-title">📖 Exterior angle theorem</div>
<p>The exterior angle equals the sum of the two interior opposite angles: <span class="math">x = a + c</span>.<br>Why? ∠ABC + x = 180° (straight line) and ∠ABC + a + c = 180° (angle sum), so x = a + c.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example</div>
  <div class="example-step"><span class="step-num">1</span><span>a = 52°, c = 71°. Find x and ∠ABC.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>x = 52° + 71° = <strong>123°</strong> (ext ∠ of △)</span></div>
  <div class="example-step"><span class="step-num">3</span><span>∠ABC = 180° − 123° = <strong>57°</strong> (∠s on a str line)</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Give a reason with every angle you find: "ext ∠ of △", "∠s on a str line", "∠ sum of △".</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "The interior opposite angles are 38° and 64°. Find the exterior angle. (°)", "answer": "102", "topic": "Exterior angles of triangles"},
        {"type": "input", "text": "An exterior angle is 140° and one interior opposite angle is 85°. Find the other one. (°)", "answer": "55", "topic": "Exterior angles of triangles"},
        {"type": "input", "text": "An exterior angle of an isosceles triangle at its base is 110°. Find the angle at the apex (the top). (°)", "answer": "40", "topic": "Exterior angles of triangles"},
        {"type": "input", "text": "The exterior angle is 3x and the interior opposite angles are x + 20° and 50°. Find x. (°)", "answer": "35", "topic": "Exterior angles of triangles"},
        {"type": "mc", "text": "An exterior angle of a triangle is always:", "options": ["smaller than both interior opposite angles", "bigger than each interior opposite angle", "equal to 90°", "equal to the adjacent interior angle"], "answer": 1, "topic": "Exterior angles of triangles"},
        {"type": "input", "text": "Each exterior angle of an equilateral triangle is: (°)", "answer": "120", "topic": "Exterior angles of triangles"},
      ]
    },
    {
      id: 1103,
      chapter: 11,
      name: "Problems with similar triangles",
      fullName: "Solving problems with congruent and similar triangles",
      lesson: {
        heading: "Problems with similar triangles",
        sub: "Chapter 11 · Topic 5",
        body: `
<p>In similar triangles the angles are equal and the sides are in the same ratio. Find the scale factor from one pair of matching sides, then use it for the others.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":320,"h":170,"view":[-0.3,-0.6,13,4.6],"pts":{"A":[0,0],"B":[4,0],"C":[1.2,2],"D":[6,0],"E":[12,0],"F":[7.8,3]},"lab":{"A":"sw","B":"se","C":"n","D":"sw","E":"se","F":"n"},"seg":[["A","B","ln",null,"4"],["A","C","ln",null,"2,3"],["B","C","ln",null,"3,4"],["D","E","ln",null,"6"],["D","F","ln",null,"x"],["E","F","ln",null,"y"]],"poly":[["A","B","C","fl"],["D","E","F","fl2"]]}'></div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: △ABC ||| △DEF</div>
  <div class="example-step"><span class="step-num">1</span><span>Matching sides AB and DE: scale factor = 6 ÷ 4 = 1,5.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>x = DF = 1,5 × AC = 1,5 × 2,3 = <strong>3,45</strong></span></div>
  <div class="example-step"><span class="step-num">3</span><span>y = EF = 1,5 × BC = 1,5 × 3,4 = <strong>5,1</strong></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: the height of a tree from its shadow</div>
  <div class="example-step"><span class="step-num">1</span><span>A 1,5 m pole casts a 2 m shadow. At the same time a tree casts a 12 m shadow. The sun's rays make similar triangles.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>height ÷ 12 = 1,5 ÷ 2, so height = 12 × 0,75 = <strong>9 m</strong></span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Write the triangles with matching vertices in the same order (△ABC ||| △DEF means A↔D, B↔E, C↔F), then the sides match too.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "△ABC ||| △PQR. AB = 5, PQ = 15 and BC = 7. Find QR.", "answer": "21", "topic": "Problems with similar triangles"},
        {"type": "input", "text": "A 2 m stick casts a 3 m shadow. A building casts a 27 m shadow at the same time. How tall is the building? (m)", "answer": "18", "topic": "Problems with similar triangles"},
        {"type": "mc", "text": "Two triangles have angles 40°, 60°, 80° and 60°, 80°, 40°. They are:", "options": ["similar", "congruent for certain", "neither", "only similar if they are the same size"], "answer": 0, "topic": "Problems with similar triangles"},
        {"type": "input", "text": "Similar triangles have sides 4, 6, 8 and x, 9, 12. Find x.", "answer": "6", "topic": "Problems with similar triangles"},
        {"type": "mc", "text": "Which condition is NOT enough to prove two triangles congruent?", "options": ["SSS", "SAS", "RHS", "AAA"], "answer": 3, "topic": "Problems with similar triangles"},
        {"type": "input", "text": "The scale factor between two similar triangles is 3. The small triangle's perimeter is 14 cm. What is the big one's perimeter? (cm)", "answer": "42", "topic": "Problems with similar triangles"},
      ]
    },
    {
      id: 1104,
      chapter: 11,
      name: "Ch 11 Exam focus",
      fullName: "Exam practice: geometry of 2D shapes",
      lesson: {
        heading: "Ch 11 Exam focus",
        sub: "Chapter 11 · Topic 6",
        body: `
<p>These questions mix the whole chapter, the way a test does. State a reason for every angle or side you calculate.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Write down the rule or formula you use, then substitute, then give the answer with units. Marks are given for each step.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "In △ABC, ∠A = 2x, ∠B = 3x and ∠C = 4x. Find ∠C. (°)", "answer": "80", "topic": "Ch 11 Exam focus"},
        {"type": "input", "text": "A parallelogram has one angle of 65°. What is the angle next to it? (°)", "answer": "115", "topic": "Ch 11 Exam focus"},
        {"type": "mc", "text": "Which quadrilateral has exactly one pair of parallel sides?", "options": ["parallelogram", "kite", "trapezium", "rhombus"], "answer": 2, "topic": "Ch 11 Exam focus"},
        {"type": "input", "text": "What is the sum of the interior angles of a decagon (10 sides)? (°)", "answer": "1440", "topic": "Ch 11 Exam focus"},
        {"type": "input", "text": "In an isosceles triangle the two equal angles are each 72°. What is the third angle? (°)", "answer": "36", "topic": "Ch 11 Exam focus"},
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
            text: "In triangle ABC: angle A = (2x + 10)°, angle B = (3x - 5)° and angle C = (x + 25)°.",
            parts: [
              { label: "a)", text: "Find x.", marks: 3 },
              { label: "b)", text: "Find each angle.", marks: 3 },
              { label: "c)", text: "Classify the triangle (acute, obtuse or right-angled).", marks: 2 },
            ]
          },
          {
            num: "2",
            text: "ABCD is a parallelogram. Angle A = (4y - 10)° and angle B = (2y + 10)°.",
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
      {
        "name": "Angles of polygons",
        "questions": [
          {
            "num": "4",
            "text": "Polygons and triangles.",
            "parts": [
              {
                "label": "a)",
                "text": "Calculate each interior angle of a regular 12-sided polygon.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "In △PQR, QR is extended to S. ∠P = 48° and ∠PRS = 115°. Calculate ∠Q, with reasons.",
                "marks": 3
              },
              {
                "label": "c)",
                "text": "A 1,8 m learner casts a 1,2 m shadow. A flagpole casts a 6 m shadow at the same time. How tall is the flagpole?",
                "marks": 3
              }
            ]
          }
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
          { num: "Q1a", ans: "x = 25", note: "(2x+10)+(3x−5)+(x+25)=180 (∠ sum of △) → 6x+30=180 → x=25" },
          { num: "Q1b", ans: "A = 60°, B = 70°, C = 50°", note: "Substitute x = 25 into each: 2(25)+10, 3(25)−5, 25+25" },
          { num: "Q1c", ans: "Acute-angled triangle", note: "All angles less than 90°" },
          { num: "Q2a", ans: "y = 30", note: "(4y−10)+(2y+10)=180 (co-int ∠s, AD ∥ BC) → 6y=180 → y=30" },
          { num: "Q2b", ans: "A = C = 110°; B = D = 70°", note: "Opposite angles of parallelogram equal; co-interior supplement each other" },
        ]
      },
      {
        name: "Similarity and Congruence",
        answers: [
          { num: "Q3a", ans: "45 cm", note: "18 × 5/2 = 45" },
          { num: "Q3b", ans: "16 cm²", note: "Area ratio = (2/5)² = 4/25; smaller = 100 × 4/25 = 16 cm²" },
        ]
      },
      {
        "name": "Angles of polygons",
        "answers": [
          {
            "num": "Q4a",
            "ans": "150°",
            "note": "(12 − 2) × 180 = 1 800; 1 800 ÷ 12 = 150"
          },
          {
            "num": "Q4b",
            "ans": "∠Q = 67°",
            "note": "ext ∠ of △: 115 = 48 + ∠Q"
          },
          {
            "num": "Q4c",
            "ans": "9 m",
            "note": "h/6 = 1,8/1,2 = 1,5"
          }
        ]
      },
    ]
  }
});
