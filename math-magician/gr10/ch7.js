// Math Magician — Grade 10, Chapter 7
// Euclidean Geometry Part 1

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 700,
      chapter: 7,
      name: "Triangles",
      fullName: "Triangle properties, congruence, and similarity",
      lesson: {
        heading: "Triangles — properties, congruence, and similarity",
        sub: "Chapter 7 · Topic 1",
        body: `
          <p>In Grade 10, Euclidean Geometry moves from observation to <strong>proof using theorems</strong>.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Triangle angle sum & exterior angle</div>
            <p>
              The sum of interior angles of a triangle = 180°.<br>
              An exterior angle = sum of the two non-adjacent interior angles.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Congruent triangles (≅)</div>
            <p>Two triangles are congruent if corresponding sides and angles are equal. Conditions:<br>
            <strong>SSS</strong> — three sides<br>
            <strong>SAS</strong> — two sides and included angle<br>
            <strong>AAS</strong> — two angles and corresponding side<br>
            <strong>RHS</strong> — right angle, hypotenuse, side</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Similar triangles (|||)</div>
            <p>Two triangles are similar if:<br>
            • Corresponding angles are equal (AA or AAA), OR<br>
            • Corresponding sides are in proportion (SSS proportionality)<br><br>
            If △ABC ||| △DEF with ratio k, then corresponding sides are in ratio k and areas in ratio k².</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prove similarity</div>
            <p>In △PQR and △PST, ∠P is common and ∠PQR = ∠PST. Prove △PQR ||| △PST.<br><br>
            In △PQR and △PST:<br>
            ∠P = ∠P (common)<br>
            ∠PQR = ∠PST (given)<br>
            ∴ △PQR ||| △PST (AA)</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Triangle Angle Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter any two angles — find the third. Or enter an exterior angle and one non-adjacent interior angle.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Mode</div>
                <select id="g10c7mode"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="interior">Interior angles</option>
                  <option value="exterior">Exterior angle</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;" id="g10c7l1">∠A</div>
                <input id="g10c7a1" type="number" value="52" min="0" max="180"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;" id="g10c7l2">∠B</div>
                <input id="g10c7a2" type="number" value="73" min="0" max="180"
                  style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c7Btn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Calculate
              </button>
            </div>
            <div id="g10c7Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function updateLabels(){
                const m=document.getElementById('g10c7mode').value;
                document.getElementById('g10c7l1').textContent=m==='interior'?'∠A':'Ext. angle';
                document.getElementById('g10c7l2').textContent=m==='interior'?'∠B':'Non-adj. ∠';
              }
              function calc(){
                const m=document.getElementById('g10c7mode').value;
                const a=parseFloat(document.getElementById('g10c7a1').value);
                const b=parseFloat(document.getElementById('g10c7a2').value);
                const out=document.getElementById('g10c7Out');
                if(isNaN(a)||isNaN(b)||a<=0||b<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive angle values.</span>';return;}
                if(m==='interior'){
                  const c=180-a-b;
                  if(c<=0){out.innerHTML='<span style="color:#fca5a5;">Invalid: angles must sum to 180°.</span>';return;}
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">∠A + ∠B + ∠C = 180°</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">'+a+'° + '+b+'° + ∠C = 180°</span><br>'
                    +'<span style="color:#6ee7b7;">∠C = '+c+'°</span>';
                } else {
                  if(b>=a){out.innerHTML='<span style="color:#fca5a5;">Non-adjacent interior angle must be less than the exterior angle.</span>';return;}
                  const other=a-b;
                  const third=180-other-b;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Ext. angle = sum of two non-adjacent interior angles</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">'+a+'° = '+b+'° + 2nd non-adjacent angle</span><br>'
                    +'<span style="color:#6ee7b7;">2nd non-adjacent angle = '+other+'°</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">3rd interior angle (adjacent to ext. angle, forming a linear pair) = 180° − '+a+'° = </span><span style="color:#fcd34d;">'+third+'°</span>';
                }
              }
              document.getElementById('g10c7mode').addEventListener('change',()=>{updateLabels();});
              document.getElementById('g10c7Btn').addEventListener('click',calc);
              ['g10c7a1','g10c7a2'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              updateLabels();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>An exterior angle is a shortcut — it equals the sum of the two remote interior angles directly, without needing to find all three interior angles first.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "An exterior angle of a triangle measures 110°. One non-adjacent interior angle is 45°. Find the other non-adjacent interior angle.",
          options: ["65°", "70°", "55°", "45°"],
          answer: 0,
          topic: "Triangles"
        },
        {
          type: "mc",
          text: "Which set of conditions proves two triangles congruent?",
          options: ["AAA", "SSA", "SAS", "ASS"],
          answer: 2,
          topic: "Triangles"
        },
        {
          type: "mc",
          text: "Two similar triangles have sides in ratio 2:3. The ratio of their areas is:",
          options: ["2:3", "4:9", "8:27", "1:1"],
          answer: 1,
          topic: "Triangles"
        },
        {
          type: "input",
          text: "In △ABC ||| △DEF, AB = 6, DE = 9, and BC = 8. Find EF.",
          answer: "12",
          topic: "Triangles"
        },
        {
          type: "mc",
          text: "In an isosceles triangle with two equal angles of 52°, the third angle is:",
          options: ["76°", "128°", "52°", "104°"],
          answer: 0,
          topic: "Triangles"
        },
        {
          type: "input",
          text: "△ABC ||| △DEF and the ratio of their areas is 9:25 (Area ABC : Area DEF). If BC = 12, find EF.",
          answer: "20",
          topic: "Triangles"
        },
        {
          type: "input",
          text: "In isosceles △ABC with AB = AC, the exterior angle at C is 130°. Find the size of ∠A.",
          answer: "80",
          altAnswers: ["80°"],
          topic: "Triangles"
        }
      ]
    },
    {
      id: 701,
      chapter: 7,
      name: "Quadrilaterals & midpoint theorem",
      fullName: "Quadrilateral properties and the midpoint theorem",
      lesson: {
        heading: "Quadrilaterals and the midpoint theorem",
        sub: "Chapter 7 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Quadrilateral properties</div>
            <p>
              <strong>Parallelogram:</strong> Opposite sides ∥ and equal; opposite angles equal; diagonals bisect each other.<br>
              <strong>Rectangle:</strong> All properties of parallelogram + all angles 90°; diagonals equal.<br>
              <strong>Rhombus:</strong> All properties of parallelogram + all sides equal; diagonals bisect at 90° and bisect angles.<br>
              <strong>Square:</strong> All properties of rectangle + rhombus.<br>
              <strong>Trapezium:</strong> One pair of parallel sides.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Midpoint theorem</div>
            <p>
              The line segment joining the midpoints of two sides of a triangle is:<br>
              (1) <strong>parallel to the third side</strong>, and<br>
              (2) <strong>equal to half its length</strong>.<br><br>
              Converse: A line through the midpoint of one side of a triangle, parallel to the second side, bisects the third side.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Using the midpoint theorem</div>
            <p>In △ABC, M is the midpoint of AB and N is the midpoint of AC.<br>
            If BC = 14 cm, then MN = 7 cm (half of BC).<br>
            Also, MN ∥ BC.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Similarity & Midpoint Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Work with the midpoint theorem or similar triangle ratios.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Mode</div>
                <select id="g10c7bmode"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="midpoint">Midpoint theorem</option>
                  <option value="similar">Similar triangles</option>
                </select>
              </div>
              <div id="g10c7bInputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="g10c7bBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Calculate
              </button>
            </div>
            <div id="g10c7bOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function makeInput(id, label, val){
                return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div>'
                  +'<input id="'+id+'" type="number" value="'+val+'" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';
              }
              function buildInputs(){
                const m=document.getElementById('g10c7bmode').value;
                const c=document.getElementById('g10c7bInputs');
                if(m==='midpoint'){
                  c.innerHTML=makeInput('g10c7bv1','Known side','18')+makeInput('g10c7bv2','Find (0=BC)','0');
                } else {
                  c.innerHTML=makeInput('g10c7bv1','Side 1 (△1)','6')+makeInput('g10c7bv2','Side 1 (△2)','9')+makeInput('g10c7bv3','Side 2 (△1)','8');
                }
                ['g10c7bv1','g10c7bv2','g10c7bv3'].forEach(id=>{
                  const el=document.getElementById(id);
                  if(el) el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
                });
              }
              function calc(){
                const m=document.getElementById('g10c7bmode').value;
                const out=document.getElementById('g10c7bOut');
                if(m==='midpoint'){
                  const v1=parseFloat(document.getElementById('g10c7bv1').value);
                  const v2=parseFloat(document.getElementById('g10c7bv2').value);
                  if(isNaN(v1)||v1<=0){out.innerHTML='<span style="color:#fca5a5;">Enter a valid side length.</span>';return;}
                  if(v2===0){
                    out.innerHTML='<span style="color:rgba(221,225,240,0.50);">BC (full side) = '+v1+', so MN = BC ÷ 2 = </span><span style="color:#6ee7b7;">'+v1/2+' units</span><br>'
                      +'<span style="color:rgba(221,225,240,0.50);font-size:13px;">MN ∥ BC (midpoint theorem)</span>';
                  } else {
                    out.innerHTML='<span style="color:rgba(221,225,240,0.50);">MN = '+v1+', so BC = MN × 2 = </span><span style="color:#6ee7b7;">'+v1*2+' units</span><br>'
                      +'<span style="color:rgba(221,225,240,0.50);font-size:13px;">MN ∥ BC (midpoint theorem)</span>';
                  }
                } else {
                  const s1=parseFloat(document.getElementById('g10c7bv1').value);
                  const s2=parseFloat(document.getElementById('g10c7bv2').value);
                  const s3=parseFloat(document.getElementById('g10c7bv3').value);
                  if([s1,s2,s3].some(isNaN)||[s1,s2,s3].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Enter valid side lengths.</span>';return;}
                  const ratio=s2/s1;
                  const s4=s3*ratio;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Scale factor k = '+s2+' ÷ '+s1+' = '+ratio.toFixed(4)+'</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);">Corresponding side = '+s3+' × '+ratio.toFixed(4)+' = </span><span style="color:#6ee7b7;">'+s4.toFixed(2)+' units</span><br>'
                    +'<span style="color:rgba(221,225,240,0.50);font-size:13px;">Area ratio = k² = '+(ratio*ratio).toFixed(4)+'</span>';
                }
              }
              document.getElementById('g10c7bmode').addEventListener('change',()=>{buildInputs();});
              document.getElementById('g10c7bBtn').addEventListener('click',calc);
              buildInputs();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>In similar triangles, sides scale by factor k but areas scale by k². If sides double, the area quadruples.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a parallelogram, one angle is 70°. An adjacent angle is:",
          options: ["70°", "110°", "140°", "35°"],
          answer: 1,
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "mc",
          text: "Which quadrilateral has diagonals that bisect each other at right angles AND bisect the vertex angles?",
          options: ["Rectangle", "Parallelogram", "Rhombus", "Trapezium"],
          answer: 2,
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "input",
          text: "In △PQR, M is the midpoint of PQ and N is the midpoint of PR. If QR = 18, find MN.",
          answer: "9",
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "mc",
          text: "The diagonals of a rectangle are 10 cm. One side is 6 cm. The other side is:",
          options: ["4 cm", "8 cm", "√136 cm", "16 cm"],
          answer: 1,
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "mc",
          text: "ABCD is a parallelogram. If AC = 20, the diagonals bisect each other, so AO =",
          options: ["20", "10", "5", "Cannot determine"],
          answer: 1,
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "input",
          text: "In △XYZ, D and E are the midpoints of XY and XZ. DE = 2x + 1 and YZ = 5x − 4. Find YZ.",
          answer: "26",
          topic: "Quadrilaterals & midpoint theorem"
        },
        {
          type: "input",
          text: "Rectangle ABCD has diagonals AC = 3x − 2 and BD = x + 10. Using the fact that a rectangle's diagonals are equal, find AC.",
          answer: "16",
          topic: "Quadrilaterals & midpoint theorem"
        }
      ]
    },
    {
      id: 702,
      chapter: 7,
      name: "Special quadrilaterals — kite & trapezium",
      fullName: "Defining and proving properties of the kite and trapezium",
      lesson: {
        heading: "The kite and trapezium — definitions and properties",
        sub: "Chapter 7 · Topic 3",
        body: `
          <p>CAPS requires you to <strong>define</strong> each special quadrilateral precisely, then <strong>investigate and prove</strong> its properties — not simply memorise a list of facts.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Kite — definition and properties</div>
            <p>
              A <strong>kite</strong> is a quadrilateral with <strong>two pairs of adjacent sides equal</strong>.<br>
              Properties (provable from the definition using congruent triangles):<br>
              • One diagonal bisects the other at 90° (the axis of symmetry).<br>
              • One pair of opposite angles (between the unequal sides) are equal.<br>
              • The axis of symmetry bisects the angles it passes through.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Trapezium — definition and properties</div>
            <p>
              A <strong>trapezium</strong> is a quadrilateral with <strong>exactly one pair of parallel sides</strong>.<br>
              Co-interior angles between the parallel sides are supplementary (add to 180°) — this follows directly from the parallel-line angle theorems.<br>
              A trapezium has no general rule linking its diagonals unless further information (like it being isosceles) is given.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Proving a kite property</div>
            <p>
              In kite KITE with KI = KE and TI = TE, diagonal KT is drawn. Prove KT bisects ∠IKE.<br>
              In △KIT and △KET: <span class="math">KI = KE</span> (given), <span class="math">TI = TE</span> (given), <span class="math">KT = KT</span> (common)<br>
              <span class="math">∴ △KIT ≡ △KET</span> (SSS)<br>
              <span class="math">∴ ∠IKT = ∠EKT</span> (corresponding ∠s of congruent triangles) — so KT bisects ∠IKE.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 A single counter-example disproves a conjecture</div>
            <p>If you're asked to investigate a property, one clear counter-example is enough to show a conjecture is false — but proving a conjecture true requires a general argument (using congruency or known theorems), not just checking several examples.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>A kite's two diagonals are <strong>not both</strong> axes of symmetry — only the diagonal joining the vertices between the equal sides is. Sketch a kite and test this yourself.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A kite has two pairs of:",
          options: ["Adjacent sides equal", "Opposite sides equal", "Opposite sides parallel", "Adjacent angles equal"],
          answer: 0,
          topic: "Special quadrilaterals — kite & trapezium"
        },
        {
          type: "mc",
          text: "In a trapezium with one pair of parallel sides, the co-interior angles between those parallel sides are:",
          options: ["Supplementary (sum to 180°)", "Equal", "Complementary (sum to 90°)", "Always 90° each"],
          answer: 0,
          topic: "Special quadrilaterals — kite & trapezium"
        },
        {
          type: "input",
          text: "In trapezium ABCD with AB ∥ DC, angle A = 110°. Find angle D (co-interior with A).",
          answer: "70",
          topic: "Special quadrilaterals — kite & trapezium"
        },
        {
          type: "mc",
          text: "In a kite, the diagonal that lies along the axis of symmetry:",
          options: ["Bisects the other diagonal at 90°", "Is equal in length to the other diagonal", "Is parallel to two sides", "Bisects only one angle of the kite"],
          answer: 0,
          topic: "Special quadrilaterals — kite & trapezium"
        },
        {
          type: "mc",
          text: "To disprove the conjecture 'every trapezium has equal diagonals', you need:",
          options: ["Just one counter-example", "At least three counter-examples", "A general proof", "It cannot be disproved"],
          answer: 0,
          topic: "Special quadrilaterals — kite & trapezium"
        },
        {
          type: "input",
          text: "In kite ABCD (AB = AD, CB = CD), ∠A = 70° and ∠B = ∠D = 115°. Find ∠C (using the angle sum of a quadrilateral).",
          answer: "60",
          altAnswers: ["60°"],
          topic: "Special quadrilaterals — kite & trapezium"
        },
        {
          type: "input",
          text: "In trapezium PQRS, PQ ∥ SR. ∠P = (2x + 10)° and ∠S = (3x − 5)° are co-interior angles. Find ∠P.",
          answer: "80",
          altAnswers: ["80°"],
          topic: "Special quadrilaterals — kite & trapezium"
        }
      ]
    },
    {
      id: 703,
      chapter: 7,
      name: "Special quadrilaterals — parallelogram family",
      fullName: "Proving properties of the parallelogram, rectangle, rhombus, and square",
      lesson: {
        heading: "The parallelogram family — rectangle, rhombus, and square",
        sub: "Chapter 7 · Topic 4",
        body: `
          <p>The rectangle, rhombus, and square are all <strong>special cases of the parallelogram</strong> — each adds extra conditions on top of the basic parallelogram properties.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Parallelogram — the base definition</div>
            <p>
              A <strong>parallelogram</strong> is a quadrilateral with <strong>two pairs of opposite sides parallel</strong>.<br>
              From this definition alone, you can prove: opposite sides are equal, opposite angles are equal, and the diagonals bisect each other.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Building up the family</div>
            <p>
              <strong>Rectangle</strong> = parallelogram + all angles 90° → diagonals are also <strong>equal</strong>.<br>
              <strong>Rhombus</strong> = parallelogram + all sides equal → diagonals <strong>bisect each other at 90°</strong> and <strong>bisect the vertex angles</strong>.<br>
              <strong>Square</strong> = rectangle + rhombus (all properties of both) → diagonals are equal, bisect each other at 90°, and bisect the angles.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Proving opposite angles of a parallelogram are equal</div>
            <p>
              In parallelogram ABCD, prove <span class="math">∠A = ∠C</span>.<br>
              Draw diagonal BD. Since AB ∥ DC: <span class="math">∠ABD = ∠BDC</span> (alt ∠s).<br>
              Since AD ∥ BC: <span class="math">∠ADB = ∠DBC</span> (alt ∠s).<br>
              <span class="math">BD = BD</span> (common) → <span class="math">△ABD ≡ △CDB</span> (AAS)<br>
              <span class="math">∴ ∠A = ∠C</span> (corresponding ∠s of congruent triangles).
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Quick identification chart</div>
            <p>
              | Shape | Sides | Angles | Diagonals |<br>
              | Parallelogram | opp. sides ∥ and = | opp. ∠s = | bisect each other |<br>
              | Rectangle | as above | all 90° | equal + bisect each other |<br>
              | Rhombus | all sides = | opp. ∠s = | bisect each other at 90°, bisect ∠s |<br>
              | Square | all sides = | all 90° | equal, bisect at 90°, bisect ∠s |
            </p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>To prove a quadrilateral is a <em>specific</em> type, you must show it satisfies that shape's <em>definition</em> first — proving "diagonals bisect each other" alone only proves it's a parallelogram, not automatically a rectangle or rhombus.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Which property is true for a rhombus but not for a general parallelogram?",
          options: ["Diagonals bisect each other at 90°", "Opposite sides are parallel", "Opposite angles are equal", "Diagonals bisect each other"],
          answer: 0,
          topic: "Special quadrilaterals — parallelogram family"
        },
        {
          type: "input",
          text: "In rectangle ABCD, diagonal AC = 26 cm. Find diagonal BD.",
          answer: "26",
          topic: "Special quadrilaterals — parallelogram family"
        },
        {
          type: "mc",
          text: "A quadrilateral has diagonals that bisect each other but are NOT equal and NOT perpendicular. It must be a:",
          options: ["Parallelogram (but not rectangle, rhombus, or square)", "Rectangle", "Rhombus", "Kite"],
          answer: 0,
          topic: "Special quadrilaterals — parallelogram family"
        },
        {
          type: "mc",
          text: "To prove a parallelogram is a rhombus, which single condition is sufficient?",
          options: ["One pair of adjacent sides are equal", "The diagonals are equal", "One angle is 90°", "The diagonals bisect each other"],
          answer: 0,
          topic: "Special quadrilaterals — parallelogram family"
        },
        {
          type: "input",
          text: "In rhombus PQRS, diagonal PR = 16 and diagonal QS = 12. The diagonals intersect at O. Find PO (half of PR).",
          answer: "8",
          topic: "Special quadrilaterals — parallelogram family"
        },
        {
          type: "input",
          text: "A rhombus has diagonals of length 16 cm and 12 cm. Find the length of one side of the rhombus.",
          answer: "10",
          altAnswers: ["10 cm"],
          topic: "Special quadrilaterals — parallelogram family"
        },
        {
          type: "input",
          text: "Rectangle PQRS has diagonals PR = 5x − 3 and QS = 2x + 12. Find PR.",
          answer: "22",
          topic: "Special quadrilaterals — parallelogram family"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 7 Workbook — Euclidean Geometry",
    questions: [
      {
        number: 1,
        text: "In △ABC, D is on AB and E is on AC such that DE ∥ BC. AD = 4, DB = 6, and BC = 15.",
        parts: [
          { label: "a", text: "Show that △ADE ||| △ABC.", marks: 4 },
          { label: "b", text: "Calculate DE.", marks: 3 },
          { label: "c", text: "If the area of △ADE is 16 cm², find the area of △ABC.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "PQRS is a parallelogram where PQ = 2x − 3 and RS = x + 4. The diagonal PR = 18.",
        parts: [
          { label: "a", text: "Find x.", marks: 3 },
          { label: "b", text: "Hence find PQ.", marks: 1 },
          { label: "c", text: "Find PT where T is the intersection of the diagonals.", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "In △ABC, M and N are the midpoints of AB and AC respectively. MN = 3x − 2 and BC = 4x + 6.",
        parts: [
          { label: "a", text: "Use the midpoint theorem to write an equation.", marks: 2 },
          { label: "b", text: "Solve for x.", marks: 2 },
          { label: "c", text: "Find BC.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "∠A common; ∠ADE=∠ABC (corr angles, DE∥BC) → AA → △ADE|||△ABC",
        b: "AD/AB = DE/BC → 4/10 = DE/15 → DE = 6",
        c: "Area ratio = (4/10)² = 16/100 → Area ABC = 100 cm²"
      },
      2: {
        a: "PQ=RS (opp sides parallelogram): 2x−3=x+4 → x=7",
        b: "PQ = 11",
        c: "PT = PR/2 = 9"
      },
      3: {
        a: "MN = ½BC → 3x−2 = ½(4x+6)",
        b: "3x−2=2x+3 → x=5",
        c: "BC = 26"
      }
    }
  }
});
