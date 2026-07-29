// Math Magician — Grade 8, Chapter 19 data
// Geometry of 3D Shapes

MathMagician.registerChapter(19, {
  topics: [
    {
      id: 1901,
      chapter: 19,
      name: "Classifying 3D objects",
      fullName: "Classifying and naming 3D objects",
      lesson: {
        heading: "Classifying 3D objects",
        sub: "Chapter 19 · Topic 1",
        body: `
          <p>3D objects (solids) take up space in three directions: length, breadth and height. We classify them by counting their <strong>faces</strong>, <strong>vertices</strong> and <strong>edges</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key words</div>
            <p>
              <strong>Face:</strong> a flat (or curved) surface of a solid.<br>
              <strong>Edge:</strong> a line where two faces meet.<br>
              <strong>Vertex</strong> (plural: vertices): a corner point where edges meet.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Families of 3D objects</div>
            <p>
              <strong>Prisms:</strong> two identical, parallel polygon ends (bases), joined by flat rectangular faces. Named by the shape of the base.<br>
              &nbsp;&nbsp;• Triangular prism — base is a triangle<br>
              &nbsp;&nbsp;• Rectangular prism (cuboid) — base is a rectangle<br>
              &nbsp;&nbsp;• Hexagonal prism — base is a hexagon<br><br>
              <strong>Pyramids:</strong> one polygon base, with triangular faces that meet at a single point (the apex). Named by the shape of the base.<br>
              &nbsp;&nbsp;• Square pyramid, triangular pyramid, etc.<br><br>
              <strong>Cylinder:</strong> two circular ends joined by one curved surface.<br>
              <strong>Cone:</strong> one circular base tapering to a single apex, joined by one curved surface.<br>
              <strong>Sphere:</strong> perfectly round — every point on the surface is the same distance from the centre. No flat faces, edges or vertices.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>A box of cereal is a <strong>rectangular prism</strong> — its two rectangular ends are joined by four rectangular faces.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>A traffic cone is a <strong>cone</strong> — one circular base, tapering to a point.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>A tent shaped like a triangle from the side, with a rectangular floor, is a <strong>triangular prism</strong>.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Prisms and pyramids are named after the shape of their <strong>base</strong> — always look at the base first!</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — 3D Shape Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Select a solid to see how many faces, vertices and edges it has.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Solid</label>
                <select id="g8solid" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="cube">Cube</option>
                  <option value="rect">Rectangular prism</option>
                  <option value="tri_prism">Triangular prism</option>
                  <option value="hex_prism">Hexagonal prism</option>
                  <option value="square_pyr">Square pyramid</option>
                  <option value="tri_pyr">Triangular pyramid</option>
                  <option value="cylinder">Cylinder</option>
                  <option value="cone">Cone</option>
                  <option value="sphere">Sphere</option>
                </select>
              </div>
              <button id="g8solidBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Explore</button>
            </div>
            <div id="g8solidOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var solids={
              cube:{name:'Cube',family:'Prism (special rectangular prism)',F:6,V:8,E:12,faces:'6 squares'},
              rect:{name:'Rectangular Prism',family:'Prism',F:6,V:8,E:12,faces:'6 rectangles'},
              tri_prism:{name:'Triangular Prism',family:'Prism',F:5,V:6,E:9,faces:'2 triangles + 3 rectangles'},
              hex_prism:{name:'Hexagonal Prism',family:'Prism',F:8,V:12,E:18,faces:'2 hexagons + 6 rectangles'},
              square_pyr:{name:'Square Pyramid',family:'Pyramid',F:5,V:5,E:8,faces:'1 square base + 4 triangles'},
              tri_pyr:{name:'Triangular Pyramid',family:'Pyramid',F:4,V:4,E:6,faces:'4 triangles'},
              cylinder:{name:'Cylinder',family:'Curved solid',F:'3 (2 flat + 1 curved)',V:0,E:'2 (curved)',faces:'2 circles + 1 curved surface'},
              cone:{name:'Cone',family:'Curved solid',F:'2 (1 flat + 1 curved)',V:1,E:'1 (curved)',faces:'1 circle + 1 curved surface'},
              sphere:{name:'Sphere',family:'Curved solid',F:'1 (curved)',V:0,E:0,faces:'1 curved surface, no flat faces'},
            };
            function explore(){
              var key=document.getElementById('g8solid').value;
              var s=solids[key];
              document.getElementById('g8solidOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Name:</span><span style="color:#fbbf24;font-weight:700;">'+s.name+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Family:</span><span style="color:#a5b4fc;">'+s.family+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Faces (F):</span><span style="color:#6ee7b7;">'+s.F+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Vertices (V):</span><span style="color:#6ee7b7;">'+s.V+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);min-width:150px;display:inline-block;">Edges (E):</span><span style="color:#6ee7b7;">'+s.E+'</span></div>',
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Face shapes: </span><span style="color:#a5b4fc;font-size:11px;">'+s.faces+'</span></div>',
              ].join('');
            }
            document.getElementById('g8solidBtn').addEventListener('click',explore);
            document.getElementById('g8solid').addEventListener('change',explore);
            explore();
          })();
          </script>

          <div class="def-box" style="margin-top:14px;">
            <div class="def-box-title">🔎 Interesting fact — Euler's formula</div>
            <p>For most solids with flat faces (polyhedra), there is a neat relationship between faces (F), vertices (V) and edges (E):<br><br>
            <span class="math">F + V − E = 2</span><br><br>
            Try it on a cube: <span class="math">6 + 8 − 12 = 2</span> ✓. It works for prisms and pyramids too — try checking it in the explorer above!</p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "A solid with two identical triangular ends joined by three rectangles is called a:", options: ["Triangular pyramid", "Triangular prism", "Cone", "Tetrahedron"], answer: 1, topic: "3D Shapes" },
        { type: "mc", text: "A solid with one square base and four triangular faces meeting at a point is a:", options: ["Rectangular prism", "Square pyramid", "Cube", "Cylinder"], answer: 1, topic: "3D Shapes" },
        { type: "input", text: "How many flat faces does a cube have?", answer: "6", topic: "3D Shapes" },
        { type: "mc", text: "Which solid has no flat faces, edges or vertices at all?", options: ["Cone", "Cylinder", "Sphere", "Cube"], answer: 2, topic: "3D Shapes" },
        { type: "input", text: "A triangular pyramid (tetrahedron) has how many vertices?", answer: "4", topic: "3D Shapes" },
        { type: "input", text: "A polyhedron has 10 faces and 16 vertices. Use Euler's formula (F + V − E = 2) to determine how many edges it has.", answer: "24", topic: "3D Shapes" },
        { type: "input", text: "A prism has a regular polygon base with n sides, giving it 3n edges in total (n on each base, plus n connecting edges). If this prism has 24 edges, how many sides does its base polygon have?", answer: "8", topic: "3D Shapes" },
      ]
    },
    {
      id: 1902,
      chapter: 19,
      name: "Nets of prisms and pyramids",
      fullName: "Nets of prisms and pyramids",
      lesson: {
        heading: "Nets of prisms and pyramids",
        sub: "Chapter 19 · Topic 2",
        body: `
          <p>A <strong>net</strong> is a 2D shape that can be folded up to make a 3D object, with no gaps and no overlaps. Every face of the solid appears exactly once in its net.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Nets of common solids</div>
            <p>
              <strong>Cube:</strong> 6 squares (several different arrangements fold correctly, e.g. a "cross" shape).<br>
              <strong>Rectangular prism:</strong> 6 rectangles, arranged in 3 matching pairs.<br>
              <strong>Triangular prism:</strong> 2 triangles (the bases) + 3 rectangles (the sides).<br>
              <strong>Square pyramid:</strong> 1 square (the base) + 4 triangles (the sloping sides), meeting at the apex.<br>
              <strong>Triangular pyramid:</strong> 4 triangles.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Thinking about nets</div>
            <div class="example-step"><span class="step-num">1</span><span>To find a net, imagine "unfolding" the solid along its edges and laying every face flat.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Count the faces of the solid first — the net must have exactly that many pieces.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Matching sides in the net must be the same length, so the shape folds up perfectly.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>To check if a net is correct, imagine folding it in your mind: do the edges meet up exactly, and is every face of the solid included exactly once?</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Match the Solid to its Net</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Pick a solid and check which net folds up to make it.</p>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
              <button class="g8net-btn" data-s="cube" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.15);color:#a5b4fc;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">Cube</button>
              <button class="g8net-btn" data-s="tri_prism" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(245,158,11,0.30);background:rgba(245,158,11,0.08);color:#fbbf24;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">Triangular prism</button>
              <button class="g8net-btn" data-s="square_pyr" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(16,185,129,0.30);background:rgba(16,185,129,0.08);color:#6ee7b7;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">Square pyramid</button>
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
                title: 'Net of a Cube',
                color: '#a5b4fc',
                pieces: '6 squares',
                desc: ['6 identical squares', 'Arranged in a cross pattern', 'Folds into a cube with 6 faces, 8 vertices, 12 edges'],
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
                title: 'Net of a Triangular Prism',
                color: '#fbbf24',
                pieces: '2 triangles + 3 rectangles',
                desc: ['2 triangles (the bases)', '3 rectangles (the sides)', 'Folds into a prism with 5 faces, 6 vertices, 9 edges'],
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
                title: 'Net of a Square Pyramid',
                color: '#6ee7b7',
                pieces: '1 square + 4 triangles',
                desc: ['1 square (the base)', '4 triangles (the sloping sides)', 'Folds into a pyramid with 5 faces, 5 vertices, 8 edges'],
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
                '<div style="color:rgba(221,225,240,0.55);margin-bottom:4px;">Pieces: '+n.pieces+'</div>'+
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
        { type: "mc", text: "The net of a cube is made up of:", options: ["6 rectangles", "6 squares", "4 squares and 2 triangles", "8 triangles"], answer: 1, topic: "3D Shapes" },
        { type: "mc", text: "The net of a triangular prism includes:", options: ["2 triangles + 3 rectangles", "3 triangles + 2 rectangles", "5 rectangles", "2 squares + 3 triangles"], answer: 0, topic: "3D Shapes" },
        { type: "mc", text: "The net of a square pyramid includes:", options: ["5 triangles", "1 square + 4 triangles", "4 squares + 1 triangle", "2 squares + 3 triangles"], answer: 1, topic: "3D Shapes" },
        { type: "input", text: "How many separate pieces (faces) make up the net of a triangular pyramid (tetrahedron)?", answer: "4", topic: "3D Shapes" },
        { type: "mc", text: "When checking if a net is correct, what must be true about the matching edges when folded?", options: ["They can be any length", "They must be the same length so they meet exactly", "Only some need to match", "Edges never need to match"], answer: 1, topic: "3D Shapes" },
        { type: "input", text: "A pentagonal prism has 2 pentagon ends joined by 5 rectangles. Determine its number of faces (F), vertices (V), and edges (E), and verify Euler's formula. What is E?", answer: "15", topic: "3D Shapes" },
        { type: "input", text: "A net for a hexagonal prism is made of 2 congruent regular hexagons (combined area 41.6 cm²) and 6 congruent rectangles, each 4 cm by 10 cm. Calculate the total area of the net.", answer: "281.6", topic: "3D Shapes" },
      ]
    },
  ],
  workbook: {
    chapter: 19, chapterName: "Geometry of 3D Shapes",
    topics: [
      {
        name: "Classifying 3D Objects",
        questions: [
          {
            num: "1",
            text: "Copy and complete the table below, naming the solid and counting F, V and E:",
            parts: [
              { label: "a)", text: "A solid with 2 hexagonal ends joined by 6 rectangles. Name it and give F, V, E.", marks: 3 },
              { label: "b)", text: "A solid with 1 square base and 4 triangular faces. Name it and give F, V, E.", marks: 3 },
              { label: "c)", text: "Explain why a sphere has no edges or vertices.", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Nets of Prisms and Pyramids",
        questions: [
          {
            num: "2",
            text: "Consider a triangular prism with an equilateral triangle base.",
            parts: [
              { label: "a)", text: "Sketch a possible net for this prism, labelling each piece.", marks: 4 },
              { label: "b)", text: "How many pieces are in the net, and what shapes are they?", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "A square pyramid net is drawn with the square base in the middle.",
            parts: [
              { label: "a)", text: "How many triangles surround the square base?", marks: 1 },
              { label: "b)", text: "Verify Euler's formula (F + V − E = 2) for the square pyramid.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 19, chapterName: "Chapter 19 — Geometry of 3D Shapes",
    topics: [
      {
        name: "Classifying 3D Objects",
        answers: [
          { num: "Q1a", ans: "Hexagonal prism; F=8, V=12, E=18", note: "2 hexagons + 6 rectangles = 8 faces" },
          { num: "Q1b", ans: "Square pyramid; F=5, V=5, E=8", note: "1 square base + 4 triangular faces" },
          { num: "Q1c", ans: "A sphere is perfectly curved with no flat faces meeting, so there are no edges (where faces meet) or vertices (where edges meet).", note: "" },
        ]
      },
      {
        name: "Nets of Prisms and Pyramids",
        answers: [
          { num: "Q2a", ans: "2 equilateral triangles + 3 rectangles arranged in a strip", note: "Bases at each end, rectangles joining them" },
          { num: "Q2b", ans: "5 pieces: 2 triangles and 3 rectangles", note: "Matches the 5 faces of a triangular prism" },
          { num: "Q3a", ans: "4 triangles", note: "One for each side of the square base" },
          { num: "Q3b", ans: "F=5, V=5, E=8; 5+5-8=2 ✓", note: "Euler's formula holds" },
        ]
      },
    ]
  }
});
