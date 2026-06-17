// Math Magician — Grade 8, Chapter 8 data
// Constructions

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 801,
      chapter: 8,
      name: "Notation and terminology",
      fullName: "Revision of notation, terminology, and the naming of angles",
      lesson: {
        heading: "Notation, terminology, and naming of angles",
        sub: "Chapter 8 · Topic 1",
        body: `
          <p>Before constructing geometric figures, it is essential to understand the correct notation and terminology used in geometry. These conventions are used in all diagrams, proofs, and exam questions.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Points, lines, and angles</div>
            <p>
              <strong>Point:</strong> a location in space, named with a capital letter. e.g. A, B, P.<br>
              <strong>Line segment:</strong> a straight path between two points. Written as <span class="math">AB</span> with length <span class="math">AB = 5 cm</span>.<br>
              <strong>Ray:</strong> starts at a point and extends infinitely in one direction. e.g. ray AB.<br>
              <strong>Line:</strong> extends infinitely in both directions.<br><br>
              <strong>Angle notation:</strong><br>
              &nbsp;&nbsp;• <span class="math">∠ABC</span> — the middle letter B is the vertex.<br>
              &nbsp;&nbsp;• <span class="math">B̂</span> — a hat over the vertex letter.<br>
              &nbsp;&nbsp;• <span class="math">∠B</span> — used when there is only one angle at that vertex.<br><br>
              <strong>Triangle notation:</strong> △ABC — vertices listed in order; sides named by their opposite vertices: side a (opposite A), side b (opposite B), side c (opposite C).
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Classifying angles — revision</div>
            <p>
              <strong>Acute:</strong> 0° &lt; â &lt; 90° &nbsp;&nbsp;
              <strong>Right:</strong> â = 90° &nbsp;&nbsp;
              <strong>Obtuse:</strong> 90° &lt; â &lt; 180°<br>
              <strong>Straight:</strong> â = 180° &nbsp;&nbsp;
              <strong>Reflex:</strong> 180° &lt; â &lt; 360° &nbsp;&nbsp;
              <strong>Revolution:</strong> â = 360°<br><br>
              <strong>Complementary angles:</strong> two angles that sum to 90°.<br>
              <strong>Supplementary angles:</strong> two angles that sum to 180°.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Using correct notation</div>
            <div class="example-step"><span class="step-num">1</span><span>In △PQR, the angle at Q is written as <span class="math">∠PQR</span> or <span class="math">Q̂</span>.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>The side opposite to P is <span class="math">QR</span>, labelled as side p.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>If <span class="math">∠PQR = 35°</span>, then the complement of Q̂ = <span class="math">90° − 35° = 55°</span>.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>The supplement of Q̂ = <span class="math">180° − 35° = 145°</span>.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Complement &amp; Supplement Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Enter any angle and instantly see its complement (90° −) and supplement (180° −).</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <span style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Angle =</span>
              <input id="csAngle" type="number" value="38" min="0" max="180" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="font-size:13px;color:#a5b4fc;font-family:JetBrains Mono,monospace;">°</span>
            </div>
            <div id="csOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('csAngle').value);
              const el=document.getElementById('csOut');
              if(isNaN(a)||a<0||a>180){el.innerHTML='<span style="color:#fca5a5;">Enter an angle between 0° and 180°</span>';return;}
              const comp=90-a;
              const supp=180-a;
              let html='';
              html+='<div><span style="color:rgba(221,225,240,0.45);">Complement  </span><span style="color:#6ee7b7;">90° − '+a+'° = <strong>'+comp+'°</strong></span>'+(comp<0?' <span style="color:#fca5a5;font-size:11px;">(no complement — angle &gt; 90°)</span>':'')+'</div>';
              html+='<div><span style="color:rgba(221,225,240,0.45);">Supplement  </span><span style="color:#fcd34d;">180° − '+a+'° = <strong>'+supp+'°</strong></span></div>';
              html+='<div style="margin-top:6px;font-size:11px;opacity:0.4;">'+a+'° is '+(a<90?'acute':(a===90?'a right angle':(a<180?'obtuse':'a straight angle')))+'</div>';
              el.innerHTML=html;
            }
            document.getElementById('csAngle').addEventListener('input',update);
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In construction questions, marks are awarded for correct labelling. Always name points with capital letters and use the correct angle notation in your answers.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "In △ABC, the angle at vertex B is correctly written as:", options: ["∠BAC", "∠ABC", "∠ACB", "∠BAB"], answer: 1, topic: "Notation" },
        { type: "input", text: "What is the complement of a 38° angle?", answer: "52", topic: "Notation" },
        { type: "mc", text: "Two angles are supplementary. One angle is 115°. What is the other?", options: ["75°", "65°", "25°", "155°"], answer: 1, topic: "Notation" },
        { type: "mc", text: "In △PQR, the side opposite vertex P is:", options: ["PQ", "PR", "QR", "PQR"], answer: 2, topic: "Notation" },
        { type: "input", text: "An angle is 3 times its complement. Find the angle in degrees.", answer: "67.5", topic: "Notation" },
      ]
    },
    {
      id: 802,
      chapter: 8,
      name: "Perpendicular lines",
      fullName: "Constructing perpendicular lines",
      lesson: {
        heading: "Constructing perpendicular lines",
        sub: "Chapter 8 · Topic 2",
        body: `
          <p>A <strong>perpendicular line</strong> meets another line at exactly 90°. Two key constructions are the perpendicular bisector of a line segment, and a perpendicular from a point to a line.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Tools and rules</div>
            <p>
              Constructions are done with a <strong>compass</strong> and <strong>ruler</strong> (straightedge) only — no protractor.<br>
              All arcs must be visible in your final answer.<br>
              Label all relevant points.<br><br>
              <strong>Perpendicular bisector of AB:</strong> a line that is perpendicular to AB and passes through the midpoint of AB.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Constructing the perpendicular bisector of AB</div>
            <div class="example-step"><span class="step-num">1</span><span>Open compass to more than half the length of AB.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Place compass at A and draw arcs above and below AB.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Without changing the compass setting, place it at B and draw arcs that intersect the first arcs at points P and Q.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Draw a straight line through P and Q. This line is the perpendicular bisector of AB.</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Label the midpoint M where PQ crosses AB. <span class="math">AM = MB</span> and <span class="math">∠PMA = 90°</span>.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Perpendicular from a point to a line</div>
            <div class="example-step"><span class="step-num">1</span><span>Given line l and point P not on the line.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Place compass at P. Draw an arc that intersects l at two points, A and B.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Construct the perpendicular bisector of AB (steps above). It passes through P.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>The line from P to the midpoint of AB is perpendicular to l.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Never erase your construction arcs — they are evidence of correct method and earn marks on their own.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "What angle does a perpendicular bisector make with the original line segment?", options: ["45°", "60°", "90°", "180°"], answer: 2, topic: "Constructions" },
        { type: "mc", text: "When constructing a perpendicular bisector, the compass is placed at point A first. What must the compass opening be?", options: ["Exactly half of AB", "Less than half of AB", "More than half of AB", "Equal to AB"], answer: 2, topic: "Constructions" },
        { type: "input", text: "The perpendicular bisector of AB passes through the midpoint M. If AB = 8.4 cm, what is AM in cm?", answer: "4.2", topic: "Constructions" },
        { type: "mc", text: "Which tools are used for geometric constructions?", options: ["Protractor and ruler", "Compass and ruler", "Compass and protractor", "Ruler and set square only"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "After constructing a perpendicular bisector, what should you NOT do?", options: ["Label the midpoint", "Draw the line through both arc intersections", "Erase the construction arcs", "Check that the angle is 90°"], answer: 2, topic: "Constructions" },
      ]
    },
    {
      id: 803,
      chapter: 8,
      name: "Constructing angles",
      fullName: "Constructing angles",
      lesson: {
        heading: "Constructing angles",
        sub: "Chapter 8 · Topic 3",
        body: `
          <p>Using a compass and ruler, you can construct specific angles accurately — without a protractor. The most important angles to know are 60°, 90°, and their multiples and bisections.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key angle constructions</div>
            <p>
              <strong>60° angle:</strong> constructed using an equilateral triangle (all sides equal = all angles 60°).<br>
              <strong>90° angle:</strong> constructed using a perpendicular bisector.<br>
              <strong>30° angle:</strong> bisect a 60° angle.<br>
              <strong>45° angle:</strong> bisect a 90° angle.<br>
              <strong>120° angle:</strong> construct two adjacent 60° angles.<br><br>
              <strong>Angle bisector:</strong> a ray that divides an angle into two equal halves.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Constructing a 60° angle at point A on line AB</div>
            <div class="example-step"><span class="step-num">1</span><span>Place compass at A. Draw an arc that cuts line AB at point P.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Without changing compass width, place it at P and draw an arc that intersects the first arc at Q.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Draw ray AQ. <span class="math">∠QAB = 60°</span>.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Bisecting an angle (e.g. bisecting ∠BAC)</div>
            <div class="example-step"><span class="step-num">1</span><span>Place compass at vertex A. Draw an arc cutting AB at P and AC at Q.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Place compass at P; draw an arc inside the angle. Repeat from Q with the same compass width. Let the arcs meet at R.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Draw ray AR — this is the angle bisector. <span class="math">∠BAR = ∠RAC = ½∠BAC</span>.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Any angle that is a multiple of 15° can be constructed using combinations of 60° and 90° and their bisections: 15°, 30°, 45°, 60°, 75°, 90°, 120°, 135°, 150°.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "How is a 30° angle constructed?", options: ["Bisecting a 90° angle", "Bisecting a 60° angle", "Constructing two adjacent 15° angles", "Using the perpendicular bisector"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "Which angle is formed when you construct an equilateral triangle?", options: ["90°", "45°", "60°", "30°"], answer: 2, topic: "Constructions" },
        { type: "input", text: "If you bisect a 90° angle, what is the size of each resulting angle?", answer: "45", topic: "Constructions" },
        { type: "mc", text: "When bisecting ∠BAC, arcs are drawn from P and Q. What must be true about the compass setting for both arcs?", options: ["It must change each time", "It must be equal for both", "It doesn't matter", "It must be wider than AB"], answer: 1, topic: "Constructions" },
        { type: "input", text: "What angle do you get if you construct two adjacent 60° angles?", answer: "120", topic: "Constructions" },
      ]
    },
    {
      id: 804,
      chapter: 8,
      name: "Constructing triangles",
      fullName: "Constructing triangles",
      lesson: {
        heading: "Constructing triangles",
        sub: "Chapter 8 · Topic 4",
        body: `
          <p>A triangle is uniquely determined when enough measurements are given. There are four standard cases for triangle construction.</p>
          <div class="def-box">
            <div class="def-box-title">📖 The four construction cases</div>
            <p>
              <strong>Case 1 — SSS (Side-Side-Side):</strong> all three sides are given.<br>
              <strong>Case 2 — SAS (Side-Angle-Side):</strong> two sides and the included angle are given.<br>
              <strong>Case 3 — ASA (Angle-Side-Angle):</strong> two angles and the included side are given.<br>
              <strong>Case 4 — RHS (Right angle-Hypotenuse-Side):</strong> a right angle, the hypotenuse, and one other side are given.<br><br>
              <em>Note: AAA (three angles only) does NOT give a unique triangle — similar triangles of different sizes all satisfy it.</em>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ SSS construction — △ABC with AB = 6 cm, BC = 5 cm, AC = 4 cm</div>
            <div class="example-step"><span class="step-num">1</span><span>Draw base AB = 6 cm with a ruler.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Set compass to 5 cm (= BC). Place at B and draw an arc above AB.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Set compass to 4 cm (= AC). Place at A and draw an arc to intersect the first arc at C.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Join AC and BC. Label all vertices.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ SAS construction — △PQR with PQ = 7 cm, ∠Q = 50°, QR = 5 cm</div>
            <div class="example-step"><span class="step-num">1</span><span>Draw PQ = 7 cm.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Construct (or measure) a 50° angle at Q.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Mark R on the ray at 5 cm from Q.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Join PR. Label all vertices.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>After constructing, always measure and label the triangle to verify. In exams you may be asked to measure a specific side or angle of your completed construction.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Which information is needed for an SSS triangle construction?", options: ["Two sides and an angle", "Three sides", "Two angles and a side", "One side and two angles"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "In SAS construction, the angle given must be:", options: ["Any angle of the triangle", "The largest angle", "The included angle between the two given sides", "Opposite the longest side"], answer: 2, topic: "Constructions" },
        { type: "mc", text: "Why does AAA not give a unique triangle?", options: ["All angles are equal", "Many triangles of different sizes can have the same angles", "It requires a protractor", "The sides cannot be calculated"], answer: 1, topic: "Constructions" },
        { type: "input", text: "In an ASA construction, how many angles are given? (write the number)", answer: "2", topic: "Constructions" },
        { type: "mc", text: "Which construction case applies when you know a right angle, the hypotenuse, and one leg?", options: ["SAS", "SSS", "ASA", "RHS"], answer: 3, topic: "Constructions" },
      ]
    },
    {
      id: 805,
      chapter: 8,
      name: "Constructing quadrilaterals",
      fullName: "Constructing quadrilaterals",
      lesson: {
        heading: "Constructing quadrilaterals",
        sub: "Chapter 8 · Topic 5",
        body: `
          <p>A <strong>quadrilateral</strong> is a four-sided polygon. To construct one, it is divided into triangles — each triangle is constructed using the methods from Topic 4.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Strategy — dividing into triangles</div>
            <p>
              Any quadrilateral can be split into two triangles by drawing a diagonal.<br>
              <strong>Minimum information needed:</strong> 5 measurements (sides and/or angles) to uniquely define a general quadrilateral.<br><br>
              <strong>Special quadrilaterals and their properties:</strong><br>
              &nbsp;&nbsp;• <strong>Square:</strong> 4 equal sides, 4 right angles.<br>
              &nbsp;&nbsp;• <strong>Rectangle:</strong> opposite sides equal, 4 right angles.<br>
              &nbsp;&nbsp;• <strong>Parallelogram:</strong> opposite sides parallel and equal, opposite angles equal.<br>
              &nbsp;&nbsp;• <strong>Rhombus:</strong> 4 equal sides, opposite angles equal, diagonals bisect at 90°.<br>
              &nbsp;&nbsp;• <strong>Trapezium:</strong> one pair of parallel sides.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Constructing rectangle ABCD with AB = 6 cm and BC = 4 cm</div>
            <div class="example-step"><span class="step-num">1</span><span>Draw AB = 6 cm.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Construct a 90° angle at both A and B.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Mark D on the perpendicular at A (4 cm from A) and C on the perpendicular at B (4 cm from B).</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Join DC. Check: DC should equal AB = 6 cm. Label all vertices.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Constructing a general quadrilateral ABCD using a diagonal</div>
            <div class="example-step"><span class="step-num">1</span><span>Draw diagonal AC first — this splits ABCD into △ABC and △ACD.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Construct △ABC using the given measurements for that triangle.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Construct △ACD on the other side of AC using its measurements.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Join the remaining side (BD if needed). Label all vertices.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For special quadrilaterals, always use their properties as shortcuts — e.g. for a rhombus, you only need to construct one side length and use it for all four sides.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "How is a general quadrilateral divided for construction purposes?", options: ["Into four right triangles", "Into two triangles using a diagonal", "Into a triangle and a rectangle", "Into two parallelograms"], answer: 1, topic: "Constructions" },
        { type: "mc", text: "How many right angles does a rectangle have?", options: ["2", "4", "1", "0"], answer: 1, topic: "Constructions" },
        { type: "input", text: "A rhombus has a side of 5 cm. What is the length of each of the other three sides in cm?", answer: "5", topic: "Constructions" },
        { type: "mc", text: "Which quadrilateral has diagonals that bisect each other at 90°?", options: ["Rectangle", "Trapezium", "Rhombus", "Parallelogram"], answer: 2, topic: "Constructions" },
        { type: "mc", text: "Minimum how many measurements are needed to uniquely construct a general quadrilateral?", options: ["3", "4", "5", "6"], answer: 2, topic: "Constructions" },
      ]
    },
    {
      id: 806,
      chapter: 8,
      name: "Ch 8 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 8 — Examination focus",
        sub: "Chapter 8 · Review",
        body: `
          <p>Exam questions on constructions test both your practical skills (neat, accurate diagrams with visible arcs) and your knowledge of terminology and properties.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 8 summary</div>
            <p>
              ✅ Name angles with vertex in the middle: <span class="math">∠ABC</span><br>
              ✅ Complementary angles sum to 90°; supplementary to 180°<br>
              ✅ Perpendicular bisector: compass &gt; half AB, arcs from A and B<br>
              ✅ 60° from equilateral arc; bisect for 30°; 90° from perp. bisector; bisect for 45°<br>
              ✅ Triangle cases: SSS, SAS, ASA, RHS<br>
              ✅ Quadrilaterals: split into two triangles via a diagonal<br>
              ✅ Always leave construction arcs visible
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">📝 Common exam mistakes to avoid</div>
            <div class="example-step"><span class="step-num">✗</span><span>Erasing construction arcs — arcs carry marks.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Using a protractor where a compass construction is required.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Forgetting to label vertices — unnamed points lose marks.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Changing the compass width mid-construction when it must stay the same (e.g. during angle bisection).</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Read the question carefully — if it says "construct", use compass and ruler only. If it says "draw" or "sketch", a rough diagram may be acceptable. In Grade 8 exams, "construct" always means compass and ruler.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Which construction case uses two sides and the angle between them?", options: ["SSS", "ASA", "SAS", "RHS"], answer: 2, topic: "Mixed" },
        { type: "input", text: "What is the supplement of a 47° angle?", answer: "133", topic: "Mixed" },
        { type: "mc", text: "To construct a 45° angle, you first construct a:", options: ["60° angle and bisect it", "90° angle and bisect it", "30° angle", "120° angle and subtract 75°"], answer: 1, topic: "Mixed" },
        { type: "mc", text: "In constructing △ABC (SSS), you set the compass to BC and place it at B. What do you draw?", options: ["A straight line", "An arc to locate vertex C", "The perpendicular bisector", "The angle at B"], answer: 1, topic: "Mixed" },
        { type: "input", text: "A quadrilateral is split into two triangles by a diagonal. How many triangles are formed?", answer: "2", topic: "Mixed" },
      ]
    },
  ],
  workbook: {
    chapter: 8, chapterName: "Constructions",
    topics: [
      {
        name: "Terminology and angle notation",
        questions: [
          {
            num: "1",
            text: "Use the correct notation to answer the following:",
            parts: [
              { label: "a)", text: "In △KLM, write down the name of the angle at vertex L.", marks: 1 },
              { label: "b)", text: "Name the side of △KLM that is opposite vertex K.", marks: 1 },
              { label: "c)", text: "An angle is 4 times its complement. Set up an equation and solve for the angle.", marks: 3 },
              { label: "d)", text: "Two angles are supplementary. One is (2x + 10)°. The other is (3x − 5)°. Find x and both angles.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Perpendicular lines and angle constructions",
        questions: [
          {
            num: "2",
            text: "Draw a line segment AB = 7 cm.",
            parts: [
              { label: "a)", text: "Construct the perpendicular bisector of AB. Label the midpoint M.", marks: 3 },
              { label: "b)", text: "What is the length of AM?", marks: 1 },
              { label: "c)", text: "At point A on AB, construct an angle of 60°. Label the ray AP.", marks: 3 },
              { label: "d)", text: "Bisect ∠PAB to construct a 30° angle. Label the bisector AQ.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Constructing triangles",
        questions: [
          {
            num: "3",
            text: "Construct △ABC with the following measurements:",
            parts: [
              { label: "a)", text: "AB = 8 cm, BC = 6 cm, AC = 5 cm. (SSS) Measure and write down ∠BAC.", marks: 4 },
              { label: "b)", text: "△PQR: PQ = 7 cm, ∠PQR = 55°, QR = 4 cm. (SAS) Measure and write down PR.", marks: 4 },
            ]
          },
          {
            num: "4",
            text: "△DEF has ∠D = 40°, ∠E = 75°, and DE = 6 cm.",
            parts: [
              { label: "a)", text: "State the construction case used.", marks: 1 },
              { label: "b)", text: "Calculate ∠F before constructing.", marks: 2 },
              { label: "c)", text: "Construct △DEF. Measure and write down EF.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Constructing quadrilaterals",
        questions: [
          {
            num: "5",
            text: "Construct rectangle ABCD with AB = 6 cm and BC = 3,5 cm.",
            parts: [
              { label: "a)", text: "Describe the steps you use to ensure the angles at A and B are 90°.", marks: 2 },
              { label: "b)", text: "Complete the construction and label all vertices.", marks: 4 },
              { label: "c)", text: "Measure the diagonal AC and write down its length.", marks: 1 },
            ]
          },
          {
            num: "6",
            text: "Construct rhombus PQRS with PQ = 5 cm and ∠PQR = 70°.",
            parts: [
              { label: "a)", text: "How long are all four sides?", marks: 1 },
              { label: "b)", text: "Explain how you would use the diagonal to construct the rhombus.", marks: 2 },
              { label: "c)", text: "Complete the construction and label all vertices.", marks: 4 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 8, chapterName: "Chapter 8 — Constructions",
    topics: [
      {
        name: "Terminology and angle notation",
        answers: [
          { num: "Q1a", ans: "∠KLM or L̂", note: "Vertex always in the middle when using three-letter notation" },
          { num: "Q1b", ans: "LM (side l, opposite K)", note: "Side opposite a vertex is labelled with the corresponding lowercase letter" },
          { num: "Q1c", ans: "Angle = 72°", note: "Let angle = x; complement = 90−x; x = 4(90−x) → x = 360−4x → 5x = 360 → x = 72°" },
          { num: "Q1d", ans: "x = 35; angles are 80° and 100°", note: "(2x+10)+(3x−5)=180 → 5x+5=180 → 5x=175 → x=35; 2(35)+10=80°; 3(35)−5=100°" },
        ]
      },
      {
        name: "Perpendicular lines and angle constructions",
        answers: [
          { num: "Q2a", ans: "Perpendicular bisector constructed with visible arcs; M labelled at midpoint", note: "Compass set to > 3,5 cm; arcs drawn from A and B above and below; line through intersections" },
          { num: "Q2b", ans: "AM = 3,5 cm", note: "Half of AB = 7 ÷ 2 = 3,5 cm" },
          { num: "Q2c", ans: "60° angle constructed at A; ray AP visible with arcs", note: "Arc from A cuts AB at P; same radius arc from P intersects first arc at Q; ray AQ = 60°" },
          { num: "Q2d", ans: "30° angle (bisector AQ of ∠PAB) constructed with visible arcs", note: "Bisect 60° angle using compass arcs from both arms; ray through intersection = 30°" },
        ]
      },
      {
        name: "Constructing triangles",
        answers: [
          { num: "Q3a", ans: "Construction of △ABC (SSS); ∠BAC ≈ 46° (accept ±2°)", note: "Draw AB=8; arc 6 cm from B, arc 5 cm from A; intersection = C; measure ∠BAC" },
          { num: "Q3b", ans: "Construction of △PQR (SAS); PR ≈ 5,7 cm (accept ±2 mm)", note: "Draw PQ=7; construct 55° at Q; mark R at 4 cm; join PR and measure" },
          { num: "Q4a", ans: "ASA (Angle-Side-Angle)", note: "Two angles and the included side are given" },
          { num: "Q4b", ans: "∠F = 65°", note: "Angle sum of triangle: 180° − 40° − 75° = 65°" },
          { num: "Q4c", ans: "Construction of △DEF; EF ≈ 4,6 cm (accept ±2 mm)", note: "Draw DE=6; construct 40° at D and 75° at E; intersection = F" },
        ]
      },
      {
        name: "Constructing quadrilaterals",
        answers: [
          { num: "Q5a", ans: "Construct perpendicular bisectors (or use set square/compass) at A and B to create 90° angles", note: "Perpendicular at each endpoint of AB ensures right angles" },
          { num: "Q5b", ans: "Rectangle ABCD constructed with all vertices labelled; BC = AD = 3,5 cm; AB = DC = 6 cm", note: "Check all four angles appear to be 90°" },
          { num: "Q5c", ans: "AC ≈ 6,96 cm (accept ±2 mm)", note: "By Pythagoras: AC = √(6² + 3,5²) = √(36 + 12,25) = √48,25 ≈ 6,95 cm" },
          { num: "Q6a", ans: "All four sides = 5 cm", note: "A rhombus has four equal sides" },
          { num: "Q6b", ans: "Draw PQ = 5 cm; construct 70° at Q; mark R at 5 cm on the ray; draw diagonal PR; use PR to locate S by arcs of 5 cm from P and R", note: "Triangle PQR constructed first; S found by arcs equal to side length" },
          { num: "Q6c", ans: "Rhombus PQRS constructed with all vertices labelled and construction arcs visible", note: "All sides must measure 5 cm; ∠PQR = 70° and ∠QRS = 110° (co-interior)" },
        ]
      },
    ]
  }
});
