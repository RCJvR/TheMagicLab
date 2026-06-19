// Math Magician — Grade 10, Chapter 12
// Euclidean Geometry Part 2 — Proofs and Conjectures

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 1200,
      chapter: 12,
      name: "Proofs & conjectures",
      fullName: "Formal proofs in Euclidean geometry — circle geometry introduction",
      lesson: {
        heading: "Formal proofs and geometric conjectures",
        sub: "Chapter 12 · Topic 1",
        body: `
          <p>Grade 10 Part 2 Euclidean geometry moves from observation and application to <strong>formal proof</strong>. Every statement in a proof must be justified with a reason.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Structure of a geometric proof</div>
            <p>
              <strong>Given:</strong> state all given information.<br>
              <strong>Required to prove (RTP):</strong> state what must be shown.<br>
              <strong>Proof:</strong> logical sequence of statements, each with a reason.<br>
              <strong>Conclusion:</strong> state what has been proved.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Key theorems for Grade 10 proofs</div>
            <p>
              • Vertically opposite angles are equal.<br>
              • Angles on a straight line sum to 180° (supplementary).<br>
              • Alternate angles (Z-angles) with parallel lines are equal.<br>
              • Co-interior angles with parallel lines are supplementary.<br>
              • Corresponding angles (F-angles) with parallel lines are equal.<br>
              • Triangle angle sum = 180°.<br>
              • Exterior angle = sum of two non-adjacent interior angles.<br>
              • In a parallelogram: opposite sides equal and parallel, opposite angles equal, diagonals bisect each other.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Formal proof</div>
            <p><strong>Given:</strong> AB ∥ CD, E is a point between the two lines, ∠ABE = 55°, ∠DCE = 35°.<br>
            <strong>RTP:</strong> ∠BEC = 90°<br><br>
            <strong>Proof:</strong><br>
            Draw EF ∥ AB ∥ CD through E.<br>
            ∠BEF = ∠ABE = 55° (alternate angles, EF ∥ AB)<br>
            ∠FEC = ∠DCE = 35° (alternate angles, EF ∥ CD)<br>
            ∠BEC = ∠BEF + ∠FEC = 55° + 35° = 90° ✓</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Angle Relationship Explorer</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a known angle and select its relationship — find the related angle with the correct geometric reason.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Known angle (°)</div>
                <input id="g10c12ang" type="number" value="55" min="1" max="179"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Relationship</div>
                <select id="g10c12rel" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="supp">Supplementary (straight line)</option>
                  <option value="vert">Vertically opposite</option>
                  <option value="comp">Complementary (right angle)</option>
                  <option value="alt">Alternate (Z-angle, parallel lines)</option>
                  <option value="corr">Corresponding (F-angle, parallel lines)</option>
                  <option value="coint">Co-interior (parallel lines)</option>
                  <option value="ext">Exterior angle of triangle</option>
                </select>
              </div>
              <div id="g10c12extPanel" style="display:none;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">2nd interior angle (°)</div>
                <input id="g10c12ang2" type="number" value="35" min="1" max="178"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c12Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find angle</button>
            </div>
            <div id="g10c12Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const rel=document.getElementById('g10c12rel');
              const extP=document.getElementById('g10c12extPanel');
              rel.addEventListener('change',()=>{extP.style.display=rel.value==='ext'?'':'none';});
              function calc(){
                const a=parseFloat(document.getElementById('g10c12ang').value);
                const r=rel.value;
                const out=document.getElementById('g10c12Out');
                if(isNaN(a)||a<=0||a>=180){out.innerHTML='<span style="color:#fca5a5;">Enter an angle between 1° and 179°.</span>';return;}
                let result,reason;
                if(r==='supp'){result=180-a;reason='Supplementary angles sum to 180° (angles on a straight line)';}
                else if(r==='vert'){result=a;reason='Vertically opposite angles are equal';}
                else if(r==='comp'){if(a>=90){out.innerHTML='<span style="color:#fca5a5;">Complementary requires angle < 90°.</span>';return;}result=90-a;reason='Complementary angles sum to 90°';}
                else if(r==='alt'){result=a;reason='Alternate angles are equal (AB ∥ CD, transversal)';}
                else if(r==='corr'){result=a;reason='Corresponding angles are equal (AB ∥ CD, transversal)';}
                else if(r==='coint'){result=180-a;reason='Co-interior angles are supplementary — they sum to 180° (AB ∥ CD)';}
                else{const a2=parseFloat(document.getElementById('g10c12ang2').value);if(isNaN(a2)||a2<=0||a+a2>=180){out.innerHTML='<span style="color:#fca5a5;">Both angles must sum to less than 180°.</span>';return;}result=a+a2;reason='Exterior angle = sum of two non-adjacent interior angles';}
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Related angle = </span><span style="color:#6ee7b7;">'+result+'°</span><br><span style="color:rgba(221,225,240,0.50);">Reason: </span><span style="color:#fcd34d;">'+reason+'</span>';
              }
              document.getElementById('g10c12Btn').addEventListener('click',calc);
              ['g10c12ang','g10c12ang2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>In every proof step, write the geometric reason in brackets — e.g., <em>(alternate angles, AB ∥ CD)</em>. State both the theorem and the condition that makes it apply.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a formal proof, every statement must be accompanied by:",
          options: ["A calculation", "A reason", "A diagram", "A formula"],
          answer: 1,
          topic: "Proofs & conjectures"
        },
        {
          type: "mc",
          text: "AB ∥ CD. A transversal cuts them, making ∠1 = 70° (co-interior with ∠2). Then ∠2 =",
          options: ["70°", "110°", "90°", "35°"],
          answer: 1,
          topic: "Proofs & conjectures"
        },
        {
          type: "mc",
          text: "Two lines intersect. One angle is 43°. The vertically opposite angle is:",
          options: ["137°", "47°", "43°", "90°"],
          answer: 2,
          topic: "Proofs & conjectures"
        },
        {
          type: "mc",
          text: "To prove ABCD is a parallelogram, it is sufficient to show:",
          options: ["All angles are 90°", "One pair of sides is parallel", "Both pairs of opposite sides are equal AND parallel", "The diagonals are equal"],
          answer: 2,
          topic: "Proofs & conjectures"
        },
        {
          type: "mc",
          text: "In △ABC, ∠A = 50°, ∠B = 70°. The exterior angle at C is:",
          options: ["60°", "120°", "180°", "110°"],
          answer: 1,
          topic: "Proofs & conjectures"
        }
      ]
    },
    {
      id: 1201,
      chapter: 12,
      name: "Proving parallelogram properties",
      fullName: "Proving properties of quadrilaterals using deductive reasoning",
      lesson: {
        heading: "Proving quadrilateral properties",
        sub: "Chapter 12 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Conditions to prove a parallelogram</div>
            <p>
              ABCD is a parallelogram if ANY ONE of the following is proved:<br>
              1. Both pairs of opposite sides are parallel.<br>
              2. Both pairs of opposite sides are equal.<br>
              3. One pair of opposite sides is equal AND parallel.<br>
              4. Both pairs of opposite angles are equal.<br>
              5. The diagonals bisect each other.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Proving a rectangle, rhombus, or square</div>
            <p>
              First prove it is a parallelogram, then add the specific condition:<br>
              <strong>Rectangle:</strong> + one right angle (or diagonals are equal)<br>
              <strong>Rhombus:</strong> + one pair of adjacent sides equal (or diagonals bisect at 90°)<br>
              <strong>Square:</strong> + rectangle condition AND rhombus condition
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove PQRS is a parallelogram</div>
            <p>Given: PQ = SR and PQ ∥ SR.<br><br>
            In △PQS and △RSQ:<br>
            PQ = SR (given)<br>
            ∠PQS = ∠RSQ (alternate angles, PQ ∥ SR)<br>
            QS = SQ (common side)<br>
            ∴ △PQS ≅ △RSQ (SAS)<br>
            ∴ PS = QR and PS ∥ QR (from congruent triangles)<br>
            ∴ PQRS is a parallelogram (both pairs of opposite sides equal and parallel)</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Parallelogram Angle Finder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter one angle in a parallelogram — find all four angles and state the reasons.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle A (°)</div>
                <input id="g10c12t2ang" type="number" value="65" min="1" max="179"
                  style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c12t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Find all angles</button>
            </div>
            <div id="g10c12t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function calc(){
                const A=parseFloat(document.getElementById('g10c12t2ang').value);
                const out=document.getElementById('g10c12t2Out');
                if(isNaN(A)||A<=0||A>=180){out.innerHTML='<span style="color:#fca5a5;">Enter an angle between 1° and 179°.</span>';return;}
                const B=180-A;
                let html='<span style="color:rgba(221,225,240,0.50);">In parallelogram ABCD:</span><br>';
                html+='<span style="color:#fcd34d;">∠A = '+A+'°</span><span style="color:rgba(221,225,240,0.50);"> (given)</span><br>';
                html+='<span style="color:#6ee7b7;">∠C = '+A+'°</span><span style="color:rgba(221,225,240,0.50);"> (opposite angles of a parallelogram are equal)</span><br>';
                html+='<span style="color:#6ee7b7;">∠B = '+B+'°</span><span style="color:rgba(221,225,240,0.50);"> (co-interior angles, AB∥DC → ∠A + ∠B = 180°)</span><br>';
                html+='<span style="color:#6ee7b7;">∠D = '+B+'°</span><span style="color:rgba(221,225,240,0.50);"> (opposite angles of a parallelogram are equal)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Check: '+A+' + '+B+' + '+A+' + '+B+' = '+(2*A+2*B)+'° ✓</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c12t2Btn').addEventListener('click',calc);
              document.getElementById('g10c12t2ang').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Memorise the <strong>five conditions</strong> for a parallelogram — in exam proofs, you only need to prove ONE of them, so choose the one the given information leads to most directly.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "To prove ABCD is a rectangle, you must first prove it is a parallelogram and then show:",
          options: ["Diagonals are equal", "All sides are equal", "One angle is 90°", "Both A and C are correct"],
          answer: 3,
          topic: "Proving parallelogram properties"
        },
        {
          type: "mc",
          text: "In parallelogram ABCD, the diagonals AC and BD intersect at E. Which of these is NOT necessarily true?",
          options: ["AE = CE", "BE = DE", "AC = BD", "∠AEB = ∠CED"],
          answer: 2,
          topic: "Proving parallelogram properties"
        },
        {
          type: "mc",
          text: "The minimum number of conditions needed to prove a quadrilateral is a parallelogram is:",
          options: ["1", "2", "3", "4"],
          answer: 0,
          topic: "Proving parallelogram properties"
        },
        {
          type: "mc",
          text: "PQRS is a rhombus. Which statement is ALWAYS true?",
          options: ["PR = QS", "∠PQR = 90°", "PR ⊥ QS", "PQ ⊥ QR"],
          answer: 2,
          topic: "Proving parallelogram properties"
        },
        {
          type: "mc",
          text: "In a proof, which reason justifies: ∠ABC = ∠ADC in a parallelogram?",
          options: ["Alternate angles", "Vertically opposite angles", "Opposite angles of a parallelogram", "Corresponding angles"],
          answer: 2,
          topic: "Proving parallelogram properties"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 12 Workbook — Euclidean Geometry Part 2",
    questions: [
      {
        number: 1,
        text: "In the figure, AB ∥ CD. Transversal EF cuts AB at G and CD at H. ∠AGE = 115°.",
        parts: [
          { label: "a", text: "Find ∠BGE with a reason.", marks: 2 },
          { label: "b", text: "Find ∠GHD with a reason.", marks: 2 },
          { label: "c", text: "Find ∠GHC with a reason.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "ABCD is a quadrilateral where the diagonals AC and BD bisect each other at O. Prove that ABCD is a parallelogram.",
        parts: [
          { label: "a", text: "Consider △AOB and △COD. State three conditions for congruence.", marks: 3 },
          { label: "b", text: "State the congruence condition and conclude.", marks: 2 },
          { label: "c", text: "Repeat for △AOD and △COB to show both pairs of opposite sides are equal.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "PQRS is a parallelogram. T is the midpoint of PQ and U is the midpoint of SR. Prove that PTUS is a parallelogram.",
        parts: [
          { label: "a", text: "Write down PT and SU in terms of PQ.", marks: 2 },
          { label: "b", text: "Show PT = SU.", marks: 2 },
          { label: "c", text: "Show PT ∥ SU.", marks: 2 },
          { label: "d", text: "Conclude that PTUS is a parallelogram.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "∠BGE = 180°−115° = 65° (angles on a straight line)",
        b: "∠GHD = 115° (co-interior angles with AB∥CD supplement each other: 180°−65°=115°, OR alternate angles with ∠AGE)",
        c: "∠GHC = 65° (angles on a straight line, or corresponding with ∠BGE)"
      },
      2: {
        a: "AO=CO (given bisect); BO=DO (given bisect); ∠AOB=∠COD (vert opp angles)",
        b: "SAS → △AOB≅△COD → AB=CD and AB∥CD",
        c: "Similarly △AOD≅△COB (SAS) → AD=BC"
      },
      3: {
        a: "PT = ½PQ; SU = ½SR",
        b: "PQ=SR (opp sides parallelogram) → PT = ½PQ = ½SR = SU",
        c: "PQ∥SR (opp sides parallelogram) → PT∥SU",
        d: "PT=SU and PT∥SU → PTUS is a parallelogram"
      }
    }
  }
});
