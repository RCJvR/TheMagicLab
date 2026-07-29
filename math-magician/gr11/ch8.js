// Math Magician — Grade 11, Chapter 8
// Euclidean Geometry — Circle Geometry

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 800,
      chapter: 8,
      name: "Circle theorems",
      fullName: "Theorems about circles — chords, angles, and arcs",
      lesson: {
        heading: "Circle theorems",
        sub: "Chapter 8 · Topic 1",
        body: `
          <p>Circle geometry is a major new section in Grade 11. You must know the theorems AND be able to prove them formally.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The eight key circle theorems</div>
            <p>
              <strong>1. Chord and centre:</strong> The perpendicular from the centre to a chord bisects the chord.<br>
              <strong>2. Perpendicular bisector:</strong> The perpendicular bisector of a chord passes through the centre.<br>
              <strong>3. Central angle:</strong> The angle subtended by an arc at the centre is double the angle subtended at the circumference.<br>
              <strong>4. Same arc:</strong> Angles in the same segment are equal (angles subtended by the same arc).<br>
              <strong>5. Semicircle:</strong> The angle in a semicircle is 90°.<br>
              <strong>6. Cyclic quadrilateral:</strong> Opposite angles of a cyclic quadrilateral are supplementary (sum to 180°).<br>
              <strong>7. Exterior angle:</strong> The exterior angle of a cyclic quadrilateral equals the interior opposite angle.<br>
              <strong>8. Tangent-radius:</strong> The tangent to a circle is perpendicular to the radius at the point of contact.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Central angle theorem</div>
            <p>O is the centre. ∠AOB = 80° (central angle). Then ∠ACB (angle at circumference, same arc) = 40°.<br>
            (Central angle = 2 × circumference angle)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Converse theorems</div>
            <p>
              Each theorem has a converse used to prove that four points are concyclic (lie on a circle):<br>
              E.g. If opposite angles of a quadrilateral are supplementary → it is a cyclic quadrilateral.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Circle Theorem Angle Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Choose a theorem, enter the known angle, and find the unknown.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Theorem</div>
                <select id="g11c8thm" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;max-width:280px;">
                  <option value="central">Central angle → circumference angle</option>
                  <option value="circ">Circumference angle → central angle</option>
                  <option value="cyclicA">Cyclic quad: find opposite angle</option>
                  <option value="extcyclic">Cyclic quad: exterior angle</option>
                  <option value="semicircle">Angle in semicircle (= 90°)</option>
                  <option value="sameseg">Same segment angles (equal)</option>
                </select>
              </div>
              <div id="g11c8inp" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="g11c8Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c8Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function lbl(id,label,val,mn,mx){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="'+(mn||0)+'" max="'+(mx||360)+'" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              const descs={
                central:'The central angle (∠AOB) is double the inscribed angle. Enter central angle → find circumference angle.',
                circ:'Enter circumference angle → find central angle (double).',
                cyclicA:'Enter one angle of a cyclic quad → find its opposite (supplementary: sum = 180°).',
                extcyclic:'Enter the interior angle at one vertex → the exterior angle at the opposite vertex equals it.',
                semicircle:'The angle in a semicircle is always 90°. Enter diameter central angle (180°) → confirmed.',
                sameseg:'Angles subtended by the same arc in the same segment are equal. Enter one → get the other.'
              };
              function build(){
                const t=document.getElementById('g11c8thm').value;
                const d=document.getElementById('g11c8inp');
                if(t==='central') d.innerHTML=lbl('g11c8a','Central ∠AOB (°)','80',1,359);
                else if(t==='circ') d.innerHTML=lbl('g11c8a','Circumference ∠ (°)','40',1,179);
                else if(t==='cyclicA') d.innerHTML=lbl('g11c8a','Known ∠ (°)','78',1,179);
                else if(t==='extcyclic') d.innerHTML=lbl('g11c8a','Interior opp. ∠ (°)','65',1,179);
                else if(t==='semicircle') d.innerHTML='<span style="color:rgba(221,225,240,0.50);font-size:13px;padding:7px 0;display:block;">No input needed — angle in semicircle is always 90°.</span>';
                else d.innerHTML=lbl('g11c8a','Known ∠ (°)','55',1,179);
                const el=document.getElementById('g11c8a');
                if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              }
              function calc(){
                const t=document.getElementById('g11c8thm').value;
                const out=document.getElementById('g11c8Out');
                const a=gv('g11c8a');
                let html='';
                if(t==='semicircle'){out.innerHTML='<span style="color:#6ee7b7;">∠ACB = 90° (angle in a semicircle; AB is a diameter)</span>';return;}
                if(isNaN(a)||a<=0){out.innerHTML='<span style="color:#fca5a5;">Enter a valid angle.</span>';return;}
                if(t==='central'){
                  if(a<=0||a>=360){out.innerHTML='<span style="color:#fca5a5;">Central angle must be between 0° and 360°.</span>';return;}
                  const circ=a/2;
                  html='<span style="color:rgba(221,225,240,0.50);">Central ∠AOB = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Rule: circumference angle = ½ central angle</span><br>';
                  html+='<span style="color:#6ee7b7;">∠ACB (at circumference) = '+circ+'°</span>';
                } else if(t==='circ'){
                  if(a<=0||a>=180){out.innerHTML='<span style="color:#fca5a5;">Circumference angle must be between 0° and 180°.</span>';return;}
                  const cent=a*2;
                  html='<span style="color:rgba(221,225,240,0.50);">Circumference angle = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Rule: central angle = 2 × circumference angle</span><br>';
                  html+='<span style="color:#6ee7b7;">Central ∠AOB = '+cent+'°</span>';
                } else if(t==='cyclicA'){
                  if(a<=0||a>=180){out.innerHTML='<span style="color:#fca5a5;">Angle must be between 0° and 180°.</span>';return;}
                  const opp=180-a;
                  html='<span style="color:rgba(221,225,240,0.50);">Known angle = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Rule: opposite angles of cyclic quad are supplementary</span><br>';
                  html+='<span style="color:#6ee7b7;">Opposite angle = 180° − '+a+'° = '+opp+'°</span>';
                } else if(t==='extcyclic'){
                  html='<span style="color:rgba(221,225,240,0.50);">Interior opposite angle = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Rule: exterior angle of cyclic quad = interior opposite angle</span><br>';
                  html+='<span style="color:#6ee7b7;">Exterior angle = '+a+'°</span>';
                } else {
                  html='<span style="color:rgba(221,225,240,0.50);">Known angle subtended by arc = '+a+'°</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Rule: angles in same segment (same arc) are equal</span><br>';
                  html+='<span style="color:#6ee7b7;">All other inscribed angles on the same arc = '+a+'°</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c8thm').addEventListener('change',()=>{build();});
              document.getElementById('g11c8Btn').addEventListener('click',calc);
              build();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "O is the centre. Arc AB subtends ∠AOB = 110° at centre. ∠ACB at circumference =",
          options: ["110°", "55°", "220°", "70°"],
          answer: 1,
          topic: "Circle theorems"
        },
        {
          type: "mc",
          text: "ABCD is a cyclic quadrilateral. ∠A = 78°. Then ∠C =",
          options: ["78°", "102°", "156°", "282°"],
          answer: 1,
          topic: "Circle theorems"
        },
        {
          type: "mc",
          text: "AB is a diameter. ∠ACB where C is on the circle equals:",
          options: ["180°", "90°", "45°", "Depends on position of C"],
          answer: 1,
          topic: "Circle theorems"
        },
        {
          type: "mc",
          text: "A tangent touches a circle at P. OP is a radius. The angle between OP and the tangent is:",
          options: ["45°", "60°", "90°", "180°"],
          answer: 2,
          topic: "Circle theorems"
        },
        {
          type: "mc",
          text: "Two angles inscribed in the same circle, both subtending arc PQ, are:",
          options: ["Supplementary", "Complementary", "Equal", "Related by factor of 2"],
          answer: 2,
          topic: "Circle theorems"
        },
        {
          type: "input",
          text: "AB is a diameter of a circle, and C is a point on the circle with ∠BAC = 35°. Find ∠ABC.",
          answer: "55",
          topic: "Circle theorems"
        },
        {
          type: "input",
          text: "O is the centre of a circle. Chord AB subtends ∠AOB = 100° at the centre. D is a point on the minor arc AB. Find ∠ADB (the angle subtended by AB at D, on the minor arc).",
          answer: "130",
          topic: "Circle theorems"
        }
      ]
    },
    {
      id: 801,
      chapter: 8,
      name: "Tangent theorems & chord proofs",
      fullName: "Tangent theorems, chord-angle theorems, and formal circle proofs",
      lesson: {
        heading: "Tangent theorems and chord-angle relationships",
        sub: "Chapter 8 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Tangent theorems</div>
            <p>
              <strong>Tangent from external point:</strong> The two tangents drawn from an external point to a circle are equal in length.<br>
              <strong>Tan-chord angle (tangent-chord angle):</strong> The angle between a tangent and a chord equals the inscribed angle on the opposite side of the chord (alternate segment theorem).<br>
              <span class="math">∠ between tangent and chord = ∠ in alternate segment</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Chord theorems</div>
            <p>
              <strong>Equal chords:</strong> Equal chords subtend equal angles at the centre.<br>
              <strong>Chord distance:</strong> Chords equidistant from the centre are equal.<br>
              <strong>Intersecting chords:</strong> If chords AB and CD intersect at P inside a circle:<br>
              <span class="math">PA × PB = PC × PD</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Alternate segment theorem</div>
            <p>Tangent at A. Chord AB. Inscribed angle ACB in the alternate segment = 58°.<br>
            Then the angle between the tangent and chord AB (on the same side as C) = 58°.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Proof structure for circle theorems</div>
            <p>
              Always:<br>
              1. Draw auxiliary lines where needed (e.g. draw the radius to the point of tangency).<br>
              2. State the theorem being proved clearly.<br>
              3. Use reason codes: ∠ in semicircle; opp ∠s cyclic quad; tan⊥radius; etc.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Chord & Tangent Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Intersecting chords (PA × PB = PC × PD) or tangent-secant (PT² = PQ × PR).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g11c8t2chord" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Intersecting Chords</button>
              <button id="g11c8t2tang" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Tangent-Secant</button>
            </div>
            <div id="g11c8t2chordP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PA</div><input id="g11c8pa" type="number" value="4" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PB</div><input id="g11c8pb" type="number" value="9" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PC</div><input id="g11c8pc" type="number" value="6" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PD (unknown)</div><input id="g11c8pd" type="text" value="?" readonly style="width:65px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.20);color:#6ee7b7;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c8t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
            </div>
            <div id="g11c8t2tangP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PT (tangent)</div><input id="g11c8pt" type="number" value="8" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PQ (near)</div><input id="g11c8pq" type="number" value="4" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">PR (unknown)</div><input id="g11c8pr" type="text" value="?" readonly style="width:65px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.20);color:#6ee7b7;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c8t2Btn2" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
            </div>
            <div id="g11c8t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              const chordBtn=document.getElementById('g11c8t2chord'),tangBtn=document.getElementById('g11c8t2tang');
              const chordP=document.getElementById('g11c8t2chordP'),tangP=document.getElementById('g11c8t2tangP');
              const out=document.getElementById('g11c8t2Out');
              function setMode(mode){
                if(mode==='chord'){chordP.style.display='flex';tangP.style.display='none';chordBtn.style.background='rgba(99,102,241,0.30)';chordBtn.style.color='#a5b4fc';chordBtn.style.borderColor='rgba(99,102,241,0.50)';tangBtn.style.background='transparent';tangBtn.style.color='rgba(221,225,240,0.50)';tangBtn.style.borderColor='rgba(99,102,241,0.20)';}
                else{tangP.style.display='flex';chordP.style.display='none';tangBtn.style.background='rgba(99,102,241,0.30)';tangBtn.style.color='#a5b4fc';tangBtn.style.borderColor='rgba(99,102,241,0.50)';chordBtn.style.background='transparent';chordBtn.style.color='rgba(221,225,240,0.50)';chordBtn.style.borderColor='rgba(99,102,241,0.20)';}
                out.innerHTML='';
              }
              chordBtn.addEventListener('click',()=>setMode('chord'));
              tangBtn.addEventListener('click',()=>setMode('tang'));
              document.getElementById('g11c8t2Btn').addEventListener('click',()=>{
                const pa=gv('g11c8pa'),pb=gv('g11c8pb'),pc=gv('g11c8pc');
                if([pa,pb,pc].some(isNaN)||[pa,pb,pc].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Enter positive values for PA, PB, PC.</span>';return;}
                const pd=pa*pb/pc;
                document.getElementById('g11c8pd').value=f(pd);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">PA × PB = '+f(pa*pb)+'</span><br><span style="color:rgba(221,225,240,0.50);">PC × PD = PA × PB → PD = '+f(pa*pb)+' ÷ '+pc+' = '+f(pd)+'</span><br><span style="color:#6ee7b7;">PD = '+f(pd)+'</span>';
              });
              document.getElementById('g11c8t2Btn2').addEventListener('click',()=>{
                const pt=gv('g11c8pt'),pq=gv('g11c8pq');
                if([pt,pq].some(isNaN)||[pt,pq].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Enter positive PT and PQ.</span>';return;}
                const pr=pt*pt/pq;
                document.getElementById('g11c8pr').value=f(pr);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">PT² = '+f(pt*pt)+'</span><br><span style="color:rgba(221,225,240,0.50);">PR = PT² ÷ PQ = '+f(pt*pt)+' ÷ '+pq+' = '+f(pr)+'</span><br><span style="color:#fcd34d;">QR = PR − PQ = '+f(pr - pq)+'</span><br><span style="color:#6ee7b7;">PR = '+f(pr)+'</span>';
              });
              ['g11c8pa','g11c8pb','g11c8pc'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c8t2Btn').click();});});
              ['g11c8pt','g11c8pq'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g11c8t2Btn2').click();});});
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Two tangents from external point P touch the circle at A and B. If PA = 5 cm, then PB =",
          options: ["5 cm", "10 cm", "2.5 cm", "Cannot determine"],
          answer: 0,
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "mc",
          text: "The alternate segment theorem says the angle between a tangent and a chord equals:",
          options: ["The central angle", "The angle in the alternate segment", "The supplement of the chord angle", "90°"],
          answer: 1,
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "mc",
          text: "Chords PQ and RS intersect at T inside a circle. PT = 4, TQ = 9, RT = 6. Find TS.",
          options: ["6", "8", "4", "12"],
          answer: 0,
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "mc",
          text: "The converse of the tan-chord theorem can be used to prove:",
          options: ["A line is a tangent", "A point is the centre", "An angle is a right angle", "A quadrilateral is cyclic"],
          answer: 0,
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "mc",
          text: "The perpendicular from the centre to a chord:",
          options: ["Bisects the chord", "Is equal to the radius", "Bisects the chord angle", "Is tangent to the chord"],
          answer: 0,
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "input",
          text: "PA and PB are tangents from external point P to a circle with centre O, touching at A and B. ∠APB = 50°. Find ∠AOB. (Hint: OAPB has two right angles, at A and B.)",
          answer: "130",
          topic: "Tangent theorems & chord proofs"
        },
        {
          type: "input",
          text: "From external point P, tangent PT = 12 cm touches a circle at T. Secant PAB (A nearer to P) cuts the circle with PA = 8 cm. Using PT² = PA × PB, find the length of AB.",
          answer: "10",
          topic: "Tangent theorems & chord proofs"
        }
      ]
    },
    {
      id: 802,
      chapter: 8,
      name: "Chord, radius & distance calculations",
      fullName: "Using the perpendicular-bisector-of-a-chord theorem with Pythagoras to find radii, chord lengths, and distances from the centre",
      lesson: {
        heading: "Chord, radius, and distance calculations",
        sub: "Chapter 8 · Topic 3",
        body: `
          <p>The theorem that <strong>the line from the centre perpendicular to a chord bisects the chord</strong> (and its converse) turns every chord problem into a right-angled triangle problem — solved with Pythagoras.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The right triangle hiding in every chord</div>
            <p>
              If O is the centre, OM ⊥ chord AB at M, then AM = MB = ½AB, and triangle OMA is right-angled at M.<br>
              <span class="math">OA² = OM² + AM²</span>, i.e. <span class="math">r² = d² + (½c)²</span><br>
              where r = radius, d = distance from centre to chord, c = chord length.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Find the radius</div>
            <p>A chord of length 48 mm is 7 mm from the centre.<br>
            r² = 7² + 24² = 49 + 576 = 625 → r = 25 mm</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Two chords, same circle</div>
            <p>AB and CD are chords of a circle, centre O, with OM ⊥ AB and ON ⊥ CD. AB = 50 mm, OM = 40 mm... wait — recompute with consistent radius: r² = OM² + (AB/2)².<br>
            If AB = 48 mm and OM = 7 mm: r = 25 mm (as above). Since ON ⊥ CD is also a radius-based right triangle, once r is known, CD = 2√(r² − ON²).</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Any two of {radius, half-chord, distance from centre} determine the third via Pythagoras — identify which two you're given, then solve for the unknown.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Chord–Radius–Distance Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter any two of radius r, chord length c, distance d from the centre — solve for the third using r² = d² + (c/2)².</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radius r</div><input id="g11c8t3r" type="text" value="25" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Chord c</div><input id="g11c8t3c" type="text" value="48" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Distance d</div><input id="g11c8t3d" type="text" value="?" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c8t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
            </div>
            <p style="margin:0 0 8px;color:rgba(221,225,240,0.45);font-size:12px;">Leave the unknown value as <code>?</code> — fill in the other two.</p>
            <div id="g11c8t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function raw(id){return document.getElementById(id).value.trim();}
              function calc(){
                const out=document.getElementById('g11c8t3Out');
                const rS=raw('g11c8t3r'),cS=raw('g11c8t3c'),dS=raw('g11c8t3d');
                const isQ=s=>s==='?'||s==='';
                const vals=[rS,cS,dS];
                const unknownCount=vals.filter(isQ).length;
                if(unknownCount!==1){out.innerHTML='<span style="color:#fca5a5;">Enter exactly two values and leave the third as ? .</span>';return;}
                const r=isQ(rS)?NaN:parseFloat(rS), c=isQ(cS)?NaN:parseFloat(cS), d=isQ(dS)?NaN:parseFloat(dS);
                if(isQ(rS)){
                  if(isNaN(c)||isNaN(d)||c<=0||d<0){out.innerHTML='<span style="color:#fca5a5;">Enter valid positive chord and non-negative distance.</span>';return;}
                  const half=c/2, newR=Math.sqrt(d*d+half*half);
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">r² = d² + (c/2)² = '+f(d*d)+' + '+f(half*half)+'</span><br><span style="color:#6ee7b7;">r = '+f(newR)+'</span>';
                } else if(isQ(cS)){
                  if(isNaN(r)||isNaN(d)||r<=0||d<0||d>=r){out.innerHTML='<span style="color:#fca5a5;">Enter valid radius and distance (distance must be less than radius).</span>';return;}
                  const half=Math.sqrt(r*r-d*d), newC=2*half;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">(c/2)² = r² − d² = '+f(r*r)+' − '+f(d*d)+'</span><br><span style="color:#6ee7b7;">c = '+f(newC)+'</span>';
                } else {
                  if(isNaN(r)||isNaN(c)||r<=0||c<=0||c>2*r){out.innerHTML='<span style="color:#fca5a5;">Enter valid radius and chord (chord cannot exceed the diameter).</span>';return;}
                  const half=c/2, newD=Math.sqrt(r*r-half*half);
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">d² = r² − (c/2)² = '+f(r*r)+' − '+f(half*half)+'</span><br><span style="color:#6ee7b7;">d = '+f(newD)+'</span>';
                }
              }
              ['g11c8t3r','g11c8t3c','g11c8t3d'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c8t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A chord of length 30 mm is 8 mm from the centre. The radius is:",
          options: ["17 mm", "34 mm", "23 mm", "15 mm"],
          answer: 0,
          topic: "Chord, radius & distance calculations"
        },
        {
          type: "input",
          text: "Radius = 13 cm. A chord is 5 cm from the centre. Find the length of the chord (cm).",
          answer: "24",
          topic: "Chord, radius & distance calculations"
        },
        {
          type: "mc",
          text: "The perpendicular drawn from the centre of a circle to a chord always:",
          options: ["Bisects the chord", "Doubles the chord", "Is equal to the chord", "Bisects the circle's circumference only if the chord is a diameter"],
          answer: 0,
          topic: "Chord, radius & distance calculations"
        },
        {
          type: "input",
          text: "A circle has radius 10 cm. Find the distance from the centre to a chord of length 12 cm (to 1 decimal place).",
          answer: "8.0",
          altAnswers: ["8"],
          topic: "Chord, radius & distance calculations"
        },
        {
          type: "mc",
          text: "Two equal chords AB and CD lie in the same circle. Which statement must be true?",
          options: ["They are equidistant from the centre", "They intersect inside the circle", "They subtend different angles at the centre", "One must be a diameter"],
          answer: 0,
          topic: "Chord, radius & distance calculations"
        },
        {
          type: "input",
          text: "Two parallel chords AB = 16 cm and CD = 12 cm lie on the same side of the centre O of a circle with radius 10 cm. Find the distance between the two chords.",
          answer: "2",
          topic: "Chord, radius & distance calculations"
        },
        {
          type: "input",
          text: "A circular pond has diameter 34 m. A straight wooden bridge (a chord) crosses the pond with its two ends 30 m apart. Find the perpendicular distance from the centre of the pond to the bridge, in metres.",
          answer: "8",
          topic: "Chord, radius & distance calculations"
        }
      ]
    },
    {
      id: 803,
      chapter: 8,
      name: "Circle geometry riders",
      fullName: "Solving multi-step riders that combine several circle theorems, and writing formal proofs",
      lesson: {
        heading: "Solving circle geometry riders",
        sub: "Chapter 8 · Topic 4",
        body: `
          <p>A <strong>rider</strong> is a multi-step problem where you must combine several circle theorems (and sometimes triangle angle properties) in sequence to find unknown angles or prove a result. This is the cognitive level most tested in Grade 11 and 12 examinations.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Strategy for riders</div>
            <p>
              1. Mark all given information on the diagram (equal angles, equal lengths, right angles, parallel lines).<br>
              2. Look for: isosceles triangles (two radii), cyclic quadrilaterals, tangent-chord angles, and angles in the same segment.<br>
              3. Work from what you know towards what you need — write a reason after every statement (e.g. "∠s in same segment", "opp ∠s cyclic quad", "tan ⊥ radius", "ext ∠ of cyclic quad").<br>
              4. Chain small deductions — riders are rarely solved in one step.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Chaining theorems</div>
            <p>O is the centre of circle ABC. Ô₁ = 2x (central angle on arc AB). MPT is a tangent at P.<br>
            ∠ at circumference on arc AB = x (central angle = 2 × circumference angle).<br>
            If ABPT is cyclic and ∠BAT is the tangent-chord angle at P equal to the inscribed angle in the alternate segment, further angle chasing gives every other marked angle in terms of x.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Common rider "give-aways"</div>
            <p>
              • Two radii drawn to the same chord → isosceles triangle, base angles equal.<br>
              • A tangent and a radius meeting → 90° angle to use in a right-angled triangle.<br>
              • A cyclic quadrilateral hidden inside a bigger diagram → supplementary opposite angles.<br>
              • Two chords/tangents from an external point → equal lengths or equal tangent-chord angles.
            </p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Always state the reason in the standard abbreviated form your teacher/marker expects — a correct angle without a reason usually loses marks.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Angle-Chase Rider Walkthrough</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the central angle Ô (in terms of a variable x, as a number of degrees per unit x) to see a full chained rider solved step by step.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x (°)</div><input id="g11c8t4x" type="number" value="35" min="1" max="89" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c8t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Chase angles</button>
            </div>
            <div id="g11c8t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const x=gv('g11c8t4x');
                const out=document.getElementById('g11c8t4Out');
                if(isNaN(x)||x<=0||x>=90){out.innerHTML='<span style="color:#fca5a5;">Enter x strictly between 0° and 90°.</span>';return;}
                const central=2*x;
                const cyclicOpp=180-central;
                const extAngle=central;
                let html='<span style="color:rgba(221,225,240,0.50);">Step 1: ∠ at circumference = x = '+x+'° (given)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Step 2: central ∠O = 2 × x = '+central+'° (∠ at centre = 2 × ∠ at circumference)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Step 3: if this central angle sits inside cyclic quad ABPO-type figure, opposite ∠ = 180° − '+central+'° = '+cyclicOpp+'° (opp ∠s cyclic quad)</span><br>';
                html+='<span style="color:#6ee7b7;">Step 4: exterior angle at the adjacent vertex = '+extAngle+'° (ext ∠ cyclic quad = int opp ∠)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.45);font-size:12px;">This mirrors the chain of reasoning used in multi-step riders — each new angle depends on the one before it.</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c8t4x').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c8t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a rider, two radii OA and OB are drawn to chord AB. Triangle OAB is:",
          options: ["Isosceles (OA = OB, both radii)", "Equilateral always", "Right-angled at O always", "Scalene"],
          answer: 0,
          topic: "Circle geometry riders"
        },
        {
          type: "mc",
          text: "O is the centre, Ô = 2x. The inscribed angle on the same arc, at the circumference, equals:",
          options: ["x", "2x", "180 − 2x", "90 − x"],
          answer: 0,
          topic: "Circle geometry riders"
        },
        {
          type: "input",
          text: "ABCD is a cyclic quadrilateral with ∠A = 3y and ∠C = 2y + 30°. Solve for y.",
          answer: "30",
          topic: "Circle geometry riders"
        },
        {
          type: "mc",
          text: "The correct reason to give for 'opposite angles of a cyclic quadrilateral are supplementary' in a proof is:",
          options: ["opp ∠s cyclic quad", "∠s in same segment", "tan ⊥ radius", "ext ∠ of triangle"],
          answer: 0,
          topic: "Circle geometry riders"
        },
        {
          type: "mc",
          text: "PT is a tangent at T, and TA is a chord. If the tangent-chord angle at T is 48°, the inscribed angle in the alternate segment is:",
          options: ["48°", "96°", "132°", "42°"],
          answer: 0,
          topic: "Circle geometry riders"
        },
        {
          type: "input",
          text: "In a rider, ∠BAC = 40° (angle at circumference on arc BC) and ∠ACD = 25° (angle at circumference on arc AD, with ABCD cyclic and diagonals meeting inside). Using the exterior angle of triangle formed by the diagonals, find the angle between chords AC and BD, on the side containing ∠BAC and ∠ACD (i.e. the exterior angle of the triangle formed).",
          answer: "65",
          topic: "Circle geometry riders"
        },
        {
          type: "input",
          text: "PQ is a diameter of a circle with centre O, and R is a point on the circle such that PR = RQ. If ∠RPQ = 2y, determine the value of y. (Hint: combine the semicircle theorem with the isosceles triangle PRQ.)",
          answer: "22.5",
          altAnswers: ["22,5"],
          topic: "Circle geometry riders"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 8 Workbook — Euclidean Geometry (Circle Geometry)",
    questions: [
      {
        number: 1,
        text: "O is the centre of the circle. A, B, C, D are points on the circle. ∠AOB = 136°.",
        parts: [
          { label: "a", text: "Find ∠ACB. Give a reason.", marks: 2 },
          { label: "b", text: "If ABCD is a cyclic quadrilateral and ∠ABC = 104°, find ∠ADC.", marks: 2 },
          { label: "c", text: "Find the exterior angle of ABCD at D.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Prove that the angle subtended by a diameter at the circumference is 90°. (Use the theorem that the central angle is double the circumference angle.)",
        parts: [
          { label: "a", text: "State the given information clearly.", marks: 1 },
          { label: "b", text: "Write the full proof.", marks: 5 }
        ]
      },
      {
        number: 3,
        text: "In the figure, PT is a tangent to the circle at T, and PQR is a secant. PT = 8 cm and PQ = 4 cm.",
        parts: [
          { label: "a", text: "Using the tangent-secant relationship PT² = PQ × PR, find PR.", marks: 3 },
          { label: "b", text: "Find QR.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "∠ACB = 68° (∠ at circumference = ½ central ∠, same arc AB)",
        b: "∠ADC = 180° − 104° = 76° (opp ∠s of cyclic quad)",
        c: "Exterior ∠ at D = interior opposite ∠ = ∠ABC = 104°"
      },
      2: {
        a: "Given: AB is a diameter; C is any point on the circle (on major arc); O is centre",
        b: "∠AOB = 180° (AB is diameter, straight line); ∠ACB = ½∠AOB = ½(180°) = 90° (∠ at circumference = ½ central ∠)"
      },
      3: {
        a: "8² = 4 × PR → PR = 64/4 = 16 cm",
        b: "QR = PR − PQ = 16 − 4 = 12 cm"
      }
    }
  }
});
