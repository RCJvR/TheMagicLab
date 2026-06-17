// Math Magician � Grade 9, Chapter 12 data
// Geometry of Straight Lines

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 23,
      chapter: 12,
      name: "Angle relationships",
      fullName: "Angle relationships on straight lines",
      lesson: {
        heading: "Angle relationships on straight lines",
        sub: "Chapter 12 � Topic 1",
        body: `
          <p>Several important angle relationships arise when lines intersect or when parallel lines are cut by a transversal.</p>
          <div class="def-box">
            <div class="def-box-title">?? Basic angle relationships</div>
            <p>
              <strong>Angles on a straight line:</strong> sum = 180� (supplementary)<br>
              <strong>Angles around a point:</strong> sum = 360�<br>
              <strong>Vertically opposite angles:</strong> equal (formed by intersecting lines)<br>
              <strong>Complementary angles:</strong> sum = 90�<br>
              <strong>Supplementary angles:</strong> sum = 180�
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">?? Parallel lines cut by a transversal</div>
            <p>
              <strong>Corresponding angles (F-angles):</strong> equal<br>
              <strong>Alternate interior angles (Z-angles):</strong> equal<br>
              <strong>Co-interior angles (C-angles):</strong> supplementary (add to 180�)<br><br>
              <em>These relationships also work in REVERSE: if any pair satisfies the condition, the lines are parallel.</em>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>Always give a reason with every angle calculation. "Vert. opp. ?s", "Alt. ?s, AB ? CD", "Co-int. ?s, PQ ? RS" � 
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Angle Relationship Solver</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter known angles, select a relationship, and find the unknown with a reason.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Relationship</label>
                <select id="ang4Rel" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="supp">Supplementary (180\xb0)</option>
                  <option value="comp">Complementary (90\xb0)</option>
                  <option value="rev">Revolution (360\xb0)</option>
                  <option value="vert">Vertically opposite (equal)</option>
                  <option value="coInt">Co-interior (180\xb0)</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Known angle(s) (comma-sep)</label>
                <input id="ang4Known" type="text" value="72" style="min-width:140px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;">
              </div>
              <button id="ang4Solve" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Solve</button>
            </div>
            <div id="ang4Out" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var reasons={supp:'Angles on a straight line',comp:'Complementary angles',rev:'Angles around a point',vert:'Vertically opp. \u2220s (equal)',coInt:'Co-interior \u2220s, lines \u2225'};
            var totals={supp:180,comp:90,rev:360,vert:null,coInt:180};
            function solve(){
              var rel=document.getElementById('ang4Rel').value;
              var vals=document.getElementById('ang4Known').value.split(',').map(function(s){return parseFloat(s.trim());}).filter(function(n){return !isNaN(n);});
              var el=document.getElementById('ang4Out');
              if(!vals.length){el.innerHTML='<span style="color:#fca5a5;">Enter at least one angle.</span>';return;}
              var lines=['<div><span style="color:rgba(221,225,240,0.45);">Reason: </span><span style="color:#fbbf24;">'+reasons[rel]+'</span></div>'];
              if(rel==='vert'){lines.push('<div><span style="color:rgba(221,225,240,0.45);">Unknown: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+vals[0]+'\xb0</span></div>');}
              else{var sum=vals.reduce(function(a,b){return a+b;},0);var unknown=totals[rel]-sum;lines.push('<div><span style="color:rgba(221,225,240,0.45);">Sum of knowns: </span><span style="color:#a5b4fc;">'+sum+'\xb0</span></div>');lines.push('<div><span style="color:rgba(221,225,240,0.45);">Unknown: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+unknown+'\xb0</span></div>');}
              el.innerHTML=lines.join('');
            }
            document.getElementById('ang4Solve').addEventListener('click',solve);
            document.getElementById('ang4Known').addEventListener('keydown',function(e){if(e.key==='Enter')solve();});
            solve();
          })();
          </script>
        reasons earn marks.</span></div>
        `
      },
      questions: [
        { type: "input", text: "An angle is 37�. Find its supplementary angle.", answer: "143", topic: "Lines" },
        { type: "mc", text: "Vertically opposite angles are:", options: ["Supplementary", "Complementary", "Equal", "Adjacent"], answer: 2, topic: "Lines" },
        { type: "input", text: "Two parallel lines are cut by a transversal. One co-interior angle is 65�. Find the other.", answer: "115", topic: "Lines" },
        { type: "mc", text: "Which angle pair are equal when formed by parallel lines and a transversal?", options: ["Co-interior", "Corresponding", "Supplementary", "Adjacent"], answer: 1, topic: "Lines" },
        { type: "mc", text: "Angles of 3x� and (x + 40)� are vertically opposite. Find x.", options: ["20", "10", "15", "35"], answer: 0, topic: "Lines" },
      ]
    },
    {
      id: 24,
      chapter: 12,
      name: "Proving parallel lines",
      fullName: "Proving lines parallel and solving problems",
      lesson: {
        heading: "Proving lines are parallel",
        sub: "Chapter 12 � Topic 2",
        body: `
          <p>We can prove lines are parallel by showing that specific angle pairs satisfy the required conditions.</p>
          <div class="def-box">
            <div class="def-box-title">?? Conditions to prove AB ? CD</div>
            <p>
              If a transversal cuts two lines and:<br>
              � <strong>Corresponding angles are equal</strong> ? lines are parallel<br>
              � <strong>Alternate interior angles are equal</strong> ? lines are parallel<br>
              � <strong>Co-interior angles are supplementary</strong> ? lines are parallel
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Multi-step example</div>
            <div class="example-step"><span class="step-num">1</span><span>In a diagram: ?1 = 70�, ?2 = 110� (co-interior). Do they sum to 180�? 70 + 110 = 180 ? Yes, lines are parallel.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Find unknown angle: x = 180� - 55� = 125� (co-interior angles, given lines parallel)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Solve for variable: (3x + 10)� and (x + 50)� are alternate angles ? 3x + 10 = x + 50 ? x = 20</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>State which lines are parallel and give the full reason in every step � e.g. "?3 = ?5 (alt. int. angles; AB ? CD)".</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Parallel Lines Angle Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Drag the slider to change the transversal angle. All 8 angles update live with their relationships.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:10px;">
              <input id="parAng" type="range" min="10" max="170" value="65" style="flex:1;min-width:140px;accent-color:#6366f1;">
              <input id="parAngNum" type="number" value="65" min="10" max="170" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;">�</span>
            </div>
            <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
              <svg id="parSvg" viewBox="0 0 240 220" style="width:240px;max-width:100%;flex-shrink:0;border-radius:10px;background:rgba(10,15,30,0.60);"></svg>
              <div id="parOut" style="font-family:JetBrains Mono,monospace;font-size:11.5px;line-height:2.1;flex:1;min-width:160px;"></div>
            </div>
          </div>
          <script>
          (function(){
            function update(){
              var deg=parseFloat(document.getElementById('parAng').value)||65;
              document.getElementById('parAngNum').value=deg;
              var sup=180-deg;
              var svg=document.getElementById('parSvg');
              var y1=80,y2=155,lx=20,rx=220,ttx=110,ttop=15,tbot=215;
              var topX=ttx-(y1-ttop)*Math.tan((deg-90)*Math.PI/180);
              var botX=ttx+(tbot-y1)*Math.tan((deg-90)*Math.PI/180);
              var p1x=ttx;
              var p2x=ttx+(y2-y1)*Math.tan((deg-90)*Math.PI/180);
              var html='<line x1="'+lx+'" y1="'+y1+'" x2="'+rx+'" y2="'+y1+'" stroke="#6366f1" stroke-width="2" opacity="0.7"/>';
              html+='<line x1="'+lx+'" y1="'+y2+'" x2="'+rx+'" y2="'+y2+'" stroke="#6366f1" stroke-width="2" opacity="0.7"/>';
              html+='<line x1="'+topX.toFixed(1)+'" y1="'+ttop+'" x2="'+botX.toFixed(1)+'" y2="'+tbot+'" stroke="rgba(245,158,11,0.85)" stroke-width="2"/>';
              var off=24;
              html+='<text x="'+(p1x+off)+'" y="'+(y1-8)+'" font-size="9.5" fill="#fbbf24" font-family="JetBrains Mono,monospace">'+deg+'�</text>';
              html+='<text x="'+(p1x-off-20)+'" y="'+(y1-8)+'" font-size="9.5" fill="#a5b4fc" font-family="JetBrains Mono,monospace">'+sup+'�</text>';
              html+='<text x="'+(p1x+off)+'" y="'+(y1+17)+'" font-size="9.5" fill="#a5b4fc" font-family="JetBrains Mono,monospace">'+sup+'�</text>';
              html+='<text x="'+(p1x-off-20)+'" y="'+(y1+17)+'" font-size="9.5" fill="#fbbf24" font-family="JetBrains Mono,monospace">'+deg+'�</text>';
              html+='<text x="'+(p2x+off)+'" y="'+(y2-8)+'" font-size="9.5" fill="#6ee7b7" font-family="JetBrains Mono,monospace">'+deg+'�</text>';
              html+='<text x="'+(p2x-off-20)+'" y="'+(y2-8)+'" font-size="9.5" fill="#fca5a5" font-family="JetBrains Mono,monospace">'+sup+'�</text>';
              html+='<text x="'+(p2x+off)+'" y="'+(y2+17)+'" font-size="9.5" fill="#fca5a5" font-family="JetBrains Mono,monospace">'+sup+'�</text>';
              html+='<text x="'+(p2x-off-20)+'" y="'+(y2+17)+'" font-size="9.5" fill="#6ee7b7" font-family="JetBrains Mono,monospace">'+deg+'�</text>';
              svg.innerHTML=html;
              document.getElementById('parOut').innerHTML=[
                '<div><span style="color:#fbbf24;">�</span> Acute angles: <span style="color:#fbbf24;font-weight:700;">'+deg+'�</span></div>',
                '<div><span style="color:#a5b4fc;">�</span> Obtuse angles: <span style="color:#a5b4fc;font-weight:700;">'+sup+'�</span></div>',
                '<div style="margin-top:6px;font-size:10.5px;color:rgba(221,225,240,0.60);">Corresponding (F): <strong>equal</strong></div>',
                '<div style="font-size:10.5px;color:rgba(221,225,240,0.60);">Alt. interior (Z): <strong>equal</strong></div>',
                '<div style="font-size:10.5px;color:rgba(221,225,240,0.60);">Co-interior (C): '+deg+'�+'+sup+'� = <strong>180�</strong></div>',
                '<div style="font-size:10.5px;color:rgba(221,225,240,0.60);">Vert. opposite: <strong>equal</strong></div>',
              ].join('');
            }
            document.getElementById('parAng').addEventListener('input',update);
            document.getElementById('parAngNum').addEventListener('input',function(){document.getElementById('parAng').value=this.value;update();});
            update();
          })();
          </script>
        "Corresponding ?s, PQ ? RS" is a complete reason; just "corresponding ?s" is incomplete.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "If alternate interior angles are equal when two lines are cut by a transversal, the lines are:", options: ["Perpendicular", "Parallel", "Equal length", "Skew"], answer: 1, topic: "Lines" },
        { type: "input", text: "Two alternate angles are (4x - 10)� and (2x + 30)�. Find x.", answer: "20", topic: "Lines" },
        { type: "mc", text: "Co-interior angles sum to 180�. This is a reason to conclude:", options: ["Angles are equal", "Lines are perpendicular", "Lines are parallel", "Angles are complementary"], answer: 2, topic: "Lines" },
        { type: "input", text: "Corresponding angles are (5x + 15)� and (3x + 45)�. Find x.", answer: "15", topic: "Lines" },
        { type: "mc", text: "Which COMPLETE reason would you use for alternate interior angles?", options: ["Alt. ?s", "Alt. int. ?s, AB ? CD", "Equal angles", "Z-pattern"], answer: 1, topic: "Lines" },
      ]
    },
  ],
  workbook: {
    chapter: 12, chapterName: "Geometry of Straight Lines",
    topics: [
      {
        name: "Angle Relationships",
        questions: [
          {
            num: "1",
            text: "Calculate the value of each unknown angle, giving a reason for each step:",
            parts: [
              { label: "a)", text: "Three angles on a straight line are (2x)�, (x + 10)� and 40�. Find x and all angles.", marks: 4 },
              { label: "b)", text: "Angles around a point include (3y)�, (2y + 20)�, (y + 40)� and 80�. Find y.", marks: 4 },
              { label: "c)", text: "Two intersecting lines form angles (4a - 5)� and (2a + 35)�. If they are vertically opposite, find a and both angles.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Parallel Lines",
        questions: [
          {
            num: "2",
            text: "AB ? CD and EF is a transversal. Angle AEF = (3x + 20)� and angle CFE = (x + 60)�.",
            parts: [
              { label: "a)", text: "Explain why AEF and CFE are alternate interior angles.", marks: 2 },
              { label: "b)", text: "Find x and both angles.", marks: 3 },
              { label: "c)", text: "Find the co-interior angle to AEF on the same side of the transversal.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 12, chapterName: "Chapter 12 � Geometry of Straight Lines",
    topics: [
      {
        name: "Angle Relationships",
        answers: [
          { num: "Q1a", ans: "x = 43,3�; angles: 86,7�, 53,3�, 40� � accept x = 130/3", note: "2x+x+10+40=180 ? 3x=130 ? x=43,3" },
          { num: "Q1b", ans: "y = 36�", note: "3y+2y+20+y+40+80=360 ? 6y+140=360 ? 6y=220 ? y=36,7. Accept 220/6." },
          { num: "Q1c", ans: "a = 20; both angles = 75�", note: "4a-5=2a+35 ? 2a=40 ? a=20; angle = 4(20)-5=75�" },
        ]
      },
      {
        name: "Parallel Lines",
        answers: [
          { num: "Q2a", ans: "They are on opposite sides of the transversal between the parallel lines, forming a Z-shape.", note: "Alternate interior angles lie between the parallel lines on opposite sides of the transversal" },
          { num: "Q2b", ans: "x = 20; both angles = 80�", note: "3x+20 = x+60 ? 2x=40 ? x=20; angle = 80�" },
          { num: "Q2c", ans: "100�", note: "Co-interior angles sum to 180�; 180�-80�=100�" },
        ]
      },
    ]
  }
});
