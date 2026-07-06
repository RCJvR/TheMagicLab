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
    },
    {
      id: 1202,
      chapter: 12,
      name: "Congruency proofs",
      fullName: "Using the four congruency conditions to prove triangles congruent",
      lesson: {
        heading: "Proving triangles congruent",
        sub: "Chapter 12 · Topic 3",
        body: `
          <p>Many Euclidean geometry riders rely on proving two triangles <strong>congruent</strong> (identical in shape and size) before deducing that corresponding sides or angles are equal.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The four congruency conditions</div>
            <p>
              <strong>SSS:</strong> three sides of one triangle equal three sides of the other.<br>
              <strong>SAS:</strong> two sides and the INCLUDED angle equal.<br>
              <strong>AAS:</strong> two angles and a corresponding side equal.<br>
              <strong>RHS:</strong> right angle, hypotenuse, and one other side equal (right-angled triangles only).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Why order matters: naming congruent triangles</div>
            <p>When you write <span class="math">△ABC ≡ △DEF</span>, the order of the letters tells you the correspondence: A↔D, B↔E, C↔F. Getting the order right is essential for correctly stating which sides/angles are equal afterwards.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: SAS proof</div>
            <p>Given: AB = CD, AD = CB, with diagonal AC common to both triangles ABC and CDA.<br>
            <strong>RTP:</strong> △ABC ≡ △CDA<br><br>
            In △ABC and △CDA:<br>
            AB = CD (given)<br>
            BC = DA (given)<br>
            AC = CA (common side)<br>
            ∴ △ABC ≡ △CDA (SSS)</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Common mistakes to avoid</div>
            <p>
              • Do not confuse SAS with SSA (side-side-angle) — SSA is NOT a valid congruency condition, because the angle must be the INCLUDED angle (between the two known sides).<br>
              • Always double check the correspondence — matching sides/angles must be listed in the same order in both triangle names.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Congruency Condition Checker</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Tick which facts are known about two triangles — find out whether they are proven congruent, and by which condition.</p>
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;font-size:13px;color:rgba(221,225,240,0.75);">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc1"> 3 pairs of sides equal (SSS)</label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc2"> 2 pairs of sides equal AND the angle between them equal (SAS)</label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc3"> 2 pairs of angles equal AND a corresponding side equal (AAS)</label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc4"> Both right-angled, hypotenuses equal, AND one other pair of sides equal (RHS)</label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="g10c12cc5"> 2 pairs of sides equal AND a NON-included angle equal (SSA only)</label>
            </div>
            <button id="g10c12ccBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Check congruency</button>
            <div id="g10c12ccOut" style="font-size:14px;line-height:1.8;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const c1=document.getElementById('g10c12cc1').checked;
                const c2=document.getElementById('g10c12cc2').checked;
                const c3=document.getElementById('g10c12cc3').checked;
                const c4=document.getElementById('g10c12cc4').checked;
                const c5=document.getElementById('g10c12cc5').checked;
                const out=document.getElementById('g10c12ccOut');
                let msgs=[];
                if(c1)msgs.push('<span style="color:#6ee7b7;">Congruent by SSS ✓</span>');
                if(c2)msgs.push('<span style="color:#6ee7b7;">Congruent by SAS ✓</span>');
                if(c3)msgs.push('<span style="color:#6ee7b7;">Congruent by AAS ✓</span>');
                if(c4)msgs.push('<span style="color:#6ee7b7;">Congruent by RHS ✓</span>');
                if(c5)msgs.push('<span style="color:#fca5a5;">SSA is NOT a valid congruency condition on its own — the triangles may NOT be congruent ✗</span>');
                if(msgs.length===0){out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Tick the facts you know about the two triangles.</span>';return;}
                out.innerHTML=msgs.join('<br>');
              }
              document.getElementById('g10c12ccBtn').addEventListener('click',run);
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Write your congruency proof in three clearly labelled lines (one per pair of equal parts), then state the condition (SSS/SAS/AAS/RHS) in brackets — examiners look for this exact structure.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Which of these IS a valid congruency condition?",
          options: ["SSA", "AAA", "SAS", "ASA is the same as AAS but never valid"],
          answer: 2,
          topic: "Congruency proofs"
        },
        {
          type: "mc",
          text: "In △ABC ≡ △DEF, which side in △DEF corresponds to AB?",
          options: ["DE", "EF", "DF", "Cannot tell without more information"],
          answer: 0,
          topic: "Congruency proofs"
        },
        {
          type: "mc",
          text: "Two right-angled triangles have equal hypotenuses and one equal corresponding side. This proves congruency by:",
          options: ["SAS", "AAS", "RHS", "SSS"],
          answer: 2,
          topic: "Congruency proofs"
        },
        {
          type: "mc",
          text: "For SAS to apply, the equal angle must be:",
          options: ["Any angle in the triangle", "The angle included between the two known equal sides", "The largest angle", "Opposite the longest side"],
          answer: 1,
          topic: "Congruency proofs"
        },
        {
          type: "mc",
          text: "△PQR and △XYZ share PQ = XY, QR = YZ, and ∠Q = ∠Y. This proves:",
          options: ["△PQR ≡ △XYZ by SAS", "The triangles are similar but not necessarily congruent", "Nothing can be concluded", "△PQR ≡ △XYZ by SSS"],
          answer: 0,
          topic: "Congruency proofs"
        }
      ]
    },
    {
      id: 1203,
      chapter: 12,
      name: "Mixed riders with quadrilaterals",
      fullName: "Multi-step riders combining congruency, parallel lines, and quadrilateral properties",
      lesson: {
        heading: "Mixed riders combining several theorems",
        sub: "Chapter 12 · Topic 4",
        body: `
          <p>The most challenging Grade 10 riders combine several theorems in one proof: parallel line angle facts, triangle congruency, and quadrilateral properties, often across two or three steps.</p>

          <div class="def-box">
            <div class="def-box-title">📖 A general strategy for multi-step riders</div>
            <p>
              1. Mark ALL given information on the diagram first (equal sides/angles, parallel marks).<br>
              2. Identify which two triangles you need to prove congruent (or similar) to make progress.<br>
              3. Work out what that congruency gives you (equal sides/angles) — this often unlocks the next step.<br>
              4. Use the newly proven facts to reach the final required result (e.g. proving a quadrilateral is a parallelogram).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Multi-step rider</div>
            <p><strong>Given:</strong> EFGH is a parallelogram. M and N are points on EF and GH respectively such that EM = GN.<br>
            <strong>RTP:</strong> MFNH is a parallelogram.<br><br>
            <strong>Proof:</strong><br>
            EF = GH (opposite sides of parallelogram EFGH are equal)<br>
            EM = GN (given)<br>
            ∴ MF = EF − EM = GH − GN = NH (subtracting equals from equals)<br>
            EF ∥ GH ⟹ MF ∥ NH (MF and NH are parts of parallel sides EF, GH)<br>
            ∴ MFNH has one pair of opposite sides (MF and NH) equal AND parallel<br>
            ∴ MFNH is a parallelogram.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Tip: work backwards from the RTP</div>
            <p>If you're stuck, start from what you need to prove and ask "which condition would give me this directly?" Then work forwards to show that condition is met — this often reveals the missing congruent triangles.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>In multi-step riders, each new fact you prove should be written as its own numbered statement with a reason — never skip a logical step, even if it feels "obvious".</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a multi-step rider, the best first step is usually to:",
          options: ["Guess the final answer", "Mark all given information on the diagram", "Assume the result and work backwards only", "Measure the diagram with a ruler"],
          answer: 1,
          topic: "Mixed riders with quadrilaterals"
        },
        {
          type: "mc",
          text: "EFGH is a parallelogram. M is on EF, N is on GH, with EM = GN. Which reason shows MF = NH?",
          options: ["Vertically opposite angles", "EF = GH (opposite sides of parallelogram) minus equal parts EM = GN", "Corresponding angles", "Diagonals bisect each other"],
          answer: 1,
          topic: "Mixed riders with quadrilaterals"
        },
        {
          type: "mc",
          text: "To prove MFNH (from the example) is a parallelogram using one pair of sides, you need to show that pair is:",
          options: ["Equal only", "Parallel only", "Both equal AND parallel", "Perpendicular"],
          answer: 2,
          topic: "Mixed riders with quadrilaterals"
        },
        {
          type: "mc",
          text: "When stuck on a multi-step rider, a useful technique is to:",
          options: ["Work backwards from the RTP to see what condition would prove it", "Skip straight to the conclusion", "Ignore the given information", "Redraw the diagram to a different scale only"],
          answer: 0,
          topic: "Mixed riders with quadrilaterals"
        },
        {
          type: "mc",
          text: "In a rider, every statement in the proof must be followed by:",
          options: ["A diagram", "A reason (theorem or given fact)", "A measurement", "A repeat of the RTP"],
          answer: 1,
          topic: "Mixed riders with quadrilaterals"
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
