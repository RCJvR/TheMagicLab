// Math Magician — Grade 9, Chapter 17 data
// Geometry of 3D Shapes

MathMagician.registerChapter(17, {
  topics: [
    {
      id: 33,
      chapter: 17,
      name: "Polyhedra",
      fullName: "Properties of polyhedra and Euler's formula",
      lesson: {
        heading: "Properties of polyhedra",
        sub: "Chapter 17 · Topic 1",
        body: `
          <p>A <strong>polyhedron</strong> is a 3D solid with flat polygonal faces. Understanding their properties helps with nets, surface area and volume.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key definitions</div>
            <p>
              <strong>Face:</strong> flat polygonal surface of a polyhedron<br>
              <strong>Edge:</strong> line segment where two faces meet<br>
              <strong>Vertex:</strong> point where three or more edges meet<br><br>
              <strong>Euler's formula:</strong> F + V - E = 2<br>
              (faces + vertices - edges = 2 for any convex polyhedron)<br><br>
              <strong>Platonic solids:</strong> all faces are identical regular polygons<br>
              • Tetrahedron: 4 triangular faces (F=4, V=4, E=6)<br>
              • Cube: 6 square faces (F=6, V=8, E=12)<br>
              • Octahedron: 8 triangular faces (F=8, V=6, E=12)<br>
              • Dodecahedron: 12 pentagonal faces<br>
              • Icosahedron: 20 triangular faces
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">📝 Verify Euler's formula for a cube</div>
            <div class="example-step"><span class="step-num">1</span><span>F = 6 (top, bottom, front, back, left, right)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>V = 8 (corners)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>E = 12 (edges)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>F + V - E = 6 + 8 - 12 = 2 ✓</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Euler's Formula Checker</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Leave one field blank. Enter any two of F, V, E and the third is calculated using F + V &#8722; E = 2.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Faces (F)</label><input id="efF" type="number" placeholder="—" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Vertices (V)</label><input id="efV" type="number" placeholder="—" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Edges (E)</label><input id="efE" type="number" placeholder="—" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="efBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Check / Solve</button>
            </div>
            <div id="efOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function check(){
              var F=parseFloat(document.getElementById('efF').value),V=parseFloat(document.getElementById('efV').value),E=parseFloat(document.getElementById('efE').value);
              var blanks=[isNaN(F),isNaN(V),isNaN(E)].filter(Boolean).length;
              var el=document.getElementById('efOut');
              if(blanks===0){var lhs=F+V-E;el.innerHTML='<div>F+V\u2212E = '+F+'+'+V+'\u2212'+E+' = <span style="color:'+(lhs===2?'#6ee7b7':'#fca5a5')+';">'+lhs+' '+(lhs===2?'\u2713 Valid!':'\u2717 Invalid')+'</span></div>';return;}
              if(blanks!==1){el.innerHTML='<span style="color:#fca5a5;">Leave exactly one field blank.</span>';return;}
              var res;
              if(isNaN(E)){res=F+V-2;document.getElementById('efE').value=res;el.innerHTML='<div>E = F+V\u22122 = '+F+'+'+V+'\u22122 = <strong style="color:#6ee7b7;">'+res+'</strong></div>';}
              else if(isNaN(V)){res=2+E-F;document.getElementById('efV').value=res;el.innerHTML='<div>V = 2+E\u2212F = 2+'+E+'\u2212'+F+' = <strong style="color:#6ee7b7;">'+res+'</strong></div>';}
              else{res=2+E-V;document.getElementById('efF').value=res;el.innerHTML='<div>F = 2+E\u2212V = 2+'+E+'\u2212'+V+' = <strong style="color:#6ee7b7;">'+res+'</strong></div>';}
            }
            document.getElementById('efBtn').addEventListener('click',check);
            ['efF','efV','efE'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')check();});});
          })();
          </script>
        Euler's formula works for all convex polyhedra. It's a quick check for your face/vertex/edge counts.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "A triangular prism has how many faces?", options: ["3", "4", "5", "6"], answer: 2, topic: "3D Shapes" },
        { type: "input", text: "A square pyramid has F = 5 and V = 5. Use Euler's formula to find the number of edges.", answer: "8", topic: "3D Shapes" },
        { type: "mc", text: "How many vertices does an octahedron have?", options: ["8", "12", "6", "4"], answer: 2, topic: "3D Shapes" },
        { type: "mc", text: "Which solid has all faces as equilateral triangles?", options: ["Cube", "Tetrahedron", "Dodecahedron", "Both A and B"], answer: 1, topic: "3D Shapes" },
        { type: "input", text: "A polyhedron has 10 faces and 15 edges. Find the number of vertices using Euler's formula.", answer: "7", topic: "3D Shapes" },
        { type: "input", text: "A polyhedron has twice as many edges as faces (E = 2F), and 10 vertices. Use Euler's formula to find the number of faces, F.", answer: "8", topic: "3D Shapes" },
        { type: "input", text: "For a prism with an n-sided polygon base, F = n + 2, V = 2n and E = 3n (check: this matches a triangular prism with n=3 and a hexagonal prism with n=6). Use this pattern to find the number of edges of a prism with a 9-sided (nonagonal) base.", answer: "27", topic: "3D Shapes" },
      ]
    },
    {
      id: 34,
      chapter: 17,
      name: "Nets and cross-sections",
      fullName: "Nets of 3D shapes and cross-sections",
      lesson: {
        heading: "Nets and cross-sections of 3D shapes",
        sub: "Chapter 17 · Topic 2",
        body: `
          <p>A <strong>net</strong> is a 2D flat pattern that folds up to form a 3D shape. A <strong>cross-section</strong> is the shape you get when you cut through a 3D solid.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Nets</div>
            <p>
              <strong>Cube:</strong> 6 squares arranged in a cross pattern (many valid arrangements)<br>
              <strong>Rectangular prism:</strong> 2 pairs of rectangles + 2 end rectangles<br>
              <strong>Triangular prism:</strong> 2 triangles + 3 rectangles<br>
              <strong>Cylinder:</strong> 2 circles + 1 rectangle (rectangle width = circumference)<br>
              <strong>Square pyramid:</strong> 1 square + 4 triangles<br>
              <strong>Cone:</strong> 1 circle + 1 sector
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Cross-sections</div>
            <p>
              <strong>Cylinder cut parallel to base:</strong> circle<br>
              <strong>Cylinder cut perpendicular to base:</strong> rectangle<br>
              <strong>Cone cut parallel to base:</strong> circle (smaller)<br>
              <strong>Cone cut through apex and base:</strong> triangle<br>
              <strong>Sphere cut through centre:</strong> circle (great circle)
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The net of a solid must fold without overlap or gaps to form the complete surface. Practice by mentally folding each face.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; 3D Shape Properties Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Select a solid to see its faces (F), vertices (V), edges (E), Euler check, and cross-section description.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Solid</label>
                <select id="solid3d" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="cube">Cube</option>
                  <option value="rect">Rectangular prism</option>
                  <option value="tri">Triangular prism</option>
                  <option value="square_pyr">Square pyramid</option>
                  <option value="tri_pyr">Triangular pyramid (tetrahedron)</option>
                  <option value="hex_prism">Hexagonal prism</option>
                </select>
              </div>
              <button id="solid3dBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Explore</button>
            </div>
            <div id="solid3dOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var solids={
              cube:{name:'Cube',F:6,V:8,E:12,faces:'6 squares',cross:'Square (horizontal) or rectangle (diagonal)',net:'Cross of 6 squares'},
              rect:{name:'Rectangular Prism',F:6,V:8,E:12,faces:'6 rectangles',cross:'Rectangle',net:'Cross of 6 rectangles'},
              tri:{name:'Triangular Prism',F:5,V:6,E:9,faces:'2 triangles + 3 rectangles',cross:'Triangle (parallel to base) or rectangle (perpendicular)',net:'2 triangles + 3 rectangles in a strip'},
              square_pyr:{name:'Square Pyramid',F:5,V:5,E:8,faces:'1 square base + 4 triangles',cross:'Square (parallel to base) or triangle (through apex)',net:'Square + 4 triangles around it'},
              tri_pyr:{name:'Tetrahedron',F:4,V:4,E:6,faces:'4 equilateral triangles',cross:'Triangle or smaller triangle',net:'4 triangles in a strip'},
              hex_prism:{name:'Hexagonal Prism',F:8,V:12,E:18,faces:'2 hexagons + 6 rectangles',cross:'Hexagon (parallel) or rectangle (perpendicular)',net:'2 hexagons + 6 rectangles'},
            };
            function explore(){
              var key=document.getElementById('solid3d').value;
              var s=solids[key];
              var euler=s.F+s.V-s.E;
              document.getElementById('solid3dOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Name:</span><span style="color:#fbbf24;font-weight:700;">'+s.name+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Faces (F):</span><span style="color:#6ee7b7;">'+s.F+' &nbsp; ('+s.faces+')</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Vertices (V):</span><span style="color:#6ee7b7;">'+s.V+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Edges (E):</span><span style="color:#6ee7b7;">'+s.E+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:200px;display:inline-block;">Euler: F + V - E:</span><span style="color:#'+(euler===2?'6ee7b7':'fca5a5')+';font-weight:700;">'+s.F+' + '+s.V+' - '+s.E+' = '+euler+(euler===2?' ✓':' ✗')+'</span></div>',
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Cross-section: </span><span style="color:#a5b4fc;font-size:11px;">'+s.cross+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Net description: </span><span style="color:#a5b4fc;font-size:11px;">'+s.net+'</span></div>',
              ].join('');
            }
            document.getElementById('solid3dBtn').addEventListener('click',explore);
            document.getElementById('solid3d').addEventListener('change',explore);
            explore();
          })();
          </script>
        connect to the right neighbour?</span></div>
        `
      },
      questions: [
        { type: "mc", text: "The net of a cylinder includes:", options: ["2 squares and a rectangle", "2 circles and a rectangle", "2 triangles and 3 rectangles", "1 circle and a sector"], answer: 1, topic: "3D Shapes" },
        { type: "mc", text: "A horizontal cross-section of a cone (parallel to base) produces:", options: ["Triangle", "Rectangle", "Circle", "Ellipse"], answer: 2, topic: "3D Shapes" },
        { type: "mc", text: "The net of a square pyramid has:", options: ["4 squares + 1 triangle", "1 square + 4 triangles", "5 triangles", "4 triangles + 2 squares"], answer: 1, topic: "3D Shapes" },
        { type: "mc", text: "If you cut a sphere through its centre, the cross-section is:", options: ["An ellipse", "A great circle", "A hemisphere", "A semicircle"], answer: 1, topic: "3D Shapes" },
        { type: "mc", text: "The rectangle in the net of a cylinder has width equal to:", options: ["2r", "pr", "2pr", "pr²"], answer: 2, topic: "3D Shapes" },
        { type: "input", text: "A cylinder's net has a rectangle whose width equals the circumference of the circular base. The base has radius 7 cm (use p ≈ 22/7) and the cylinder's height is 12 cm. Find the area of the rectangular part of the net (in cm²).", answer: "528", topic: "3D Shapes" },
        { type: "input", text: "A square pyramid's net consists of a square base of side 8 cm and 4 congruent triangles, each with base 8 cm and slant height 10 cm. Find the total area of the net (in cm²).", answer: "224", topic: "3D Shapes" },
      ]
    },
  ],
  workbook: {
    chapter: 17, chapterName: "Geometry of 3D Shapes",
    topics: [
      {
        name: "Polyhedra and Euler's Formula",
        questions: [
          {
            num: "1",
            text: "Copy and complete the table for each polyhedron, then verify Euler's formula:",
            parts: [
              { label: "a)", text: "Triangular prism: complete F, V, E and verify F + V - E = 2.", marks: 4 },
              { label: "b)", text: "Hexagonal prism: complete F, V, E and verify Euler's formula.", marks: 4 },
              { label: "c)", text: "A polyhedron has 12 faces and 8 vertices. How many edges does it have?", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Nets and Cross-sections",
        questions: [
          {
            num: "2",
            text: "A triangular prism has an equilateral triangle base with side 6 cm and a length of 10 cm.",
            parts: [
              { label: "a)", text: "Sketch the net of this prism, labelling all dimensions.", marks: 4 },
              { label: "b)", text: "Calculate the total surface area using the net.", marks: 4 },
            ]
          },
          {
            num: "3",
            text: "Describe the cross-section formed when each solid is cut as described:",
            parts: [
              { label: "a)", text: "A rectangular prism cut by a plane parallel to its base.", marks: 2 },
              { label: "b)", text: "A cylinder cut by a plane that passes through its axis (centre line).", marks: 2 },
              { label: "c)", text: "A square pyramid cut horizontally midway between apex and base.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 17, chapterName: "Chapter 17 — Geometry of 3D Shapes",
    topics: [
      {
        name: "Polyhedra and Euler's Formula",
        answers: [
          { num: "Q1a", ans: "F=5, V=6, E=9; 5+6-9=2 ✓", note: "2 triangles + 3 rectangles = 5 faces" },
          { num: "Q1b", ans: "F=8, V=12, E=18; 8+12-18=2 ✓", note: "2 hexagons + 6 rectangles = 8 faces; 12 vertices (6 on each hexagon)" },
          { num: "Q1c", ans: "E = 18", note: "F+V-E=2 → 12+8-E=2 → E=18" },
        ]
      },
      {
        name: "Nets and Cross-sections",
        answers: [
          { num: "Q2a", ans: "Net: 2 equilateral triangles (side 6cm) + 3 rectangles (6cm × 10cm)", note: "All dimensions labelled" },
          { num: "Q2b", ans: "SA = 2×(½×6×5,196) + 3×(6×10) = 31,18 + 180 ≈ 211,18 cm²", note: "Height of equilateral triangle = 6×√3/2 = 3√3 ≈ 5,196 cm" },
          { num: "Q3a", ans: "Rectangle (same dimensions as the base)", note: "Parallel cut preserves cross-section shape" },
          { num: "Q3b", ans: "Rectangle (width = diameter, height = length of cylinder)", note: "Axial cross-section" },
          { num: "Q3c", ans: "Square (half the size of the base, scaled by ½)", note: "At midheight, similar cross-section with half the base dimensions" },
        ]
      },
    ]
  }
});
