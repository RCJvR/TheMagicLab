// Math Magician — Grade 12, Chapter 8
// Euclidean Geometry — Proportion, Similarity, Pythagorean Theorem

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 0,
      chapter: 8,
      name: "Proportion, polygons & triangle theorems",
      fullName: "Ratio and proportion, polygons, and the basic proportionality theorem",
      lesson: {
        heading: "Proportion and the basic proportionality theorem",
        sub: "Chapter 8 · Topic 1",
        body: `
          <p>Grade 12 Euclidean Geometry introduces formal proofs of the proportionality and similarity theorems — the deepest level of geometric reasoning in the CAPS curriculum.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Basic proportionality theorem (BPT)</div>
            <p>
              If a line is drawn parallel to one side of a triangle, it divides the other two sides proportionally.<br><br>
              In △ABC with DE ∥ BC:<br>
              <span class="math">AD/DB = AE/EC</span><br><br>
              Converse: If AD/DB = AE/EC, then DE ∥ BC.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Midpoint theorem (recap)</div>
            <p>
              The line joining midpoints of two sides of a triangle is parallel to the third side and half its length.<br>
              (This is a special case of BPT where AD/DB = 1)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Using BPT</div>
            <p>In △PQR, ST ∥ QR, PS = 4, SQ = 6, TR = 9.<br>
            By BPT: PS/SQ = PT/TR<br>
            4/6 = PT/9<br>
            PT = 6</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Proportion in polygons</div>
            <p>
              Similar polygons have proportional sides and equal angles.<br>
              Ratio of areas of similar figures = (ratio of sides)²<br>
              Ratio of volumes of similar solids = (ratio of sides)³
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "In △ABC, DE ∥ BC, AD = 3, DB = 5. If AE = 6, find EC.", options: ["10", "8", "15", "4"], answer: 0, topic: "Proportion, polygons & triangle theorems" },
        { type: "mc", text: "Two similar triangles have sides in ratio 3:5. Ratio of their areas:", options: ["3:5", "9:25", "27:125", "6:10"], answer: 1, topic: "Proportion, polygons & triangle theorems" },
        { type: "input", text: "In △XYZ, MN ∥ YZ, XM = 4, MY = 8, XN = 3. Find NZ.", answer: "6", topic: "Proportion, polygons & triangle theorems" },
        { type: "mc", text: "The converse of BPT states: if AD/DB = AE/EC in △ABC, then:", options: ["A, D, B are collinear", "DE ∥ BC", "DE = BC/2", "△ADE is equilateral"], answer: 1, topic: "Proportion, polygons & triangle theorems" },
        { type: "mc", text: "Similar solids have volumes in ratio 8:27. Their surface areas are in ratio:", options: ["2:3", "4:9", "8:27", "16:81"], answer: 1, topic: "Proportion, polygons & triangle theorems" }
      ]
    },
    {
      id: 1,
      chapter: 8,
      name: "Similarity & Pythagorean theorem proofs",
      fullName: "Similarity of triangles and the proof of the Pythagorean theorem",
      lesson: {
        heading: "Triangle similarity and the Pythagorean theorem",
        sub: "Chapter 8 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Similarity (|||) — conditions</div>
            <p>
              △ABC ||| △DEF if:<br>
              (AA) Two pairs of equal angles, OR<br>
              (SSS) All three pairs of sides proportional: AB/DE = BC/EF = AC/DF, OR<br>
              (SAS) Two sides proportional with equal included angle<br><br>
              <strong>Important:</strong> In Grade 12, you must prove similarity formally with reasons.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Proof of the Pythagorean theorem</div>
            <p>
              Using similarity: In right △ABC with right angle at C, draw altitude CD to AB.<br>
              Then △ABC ||| △ACD ||| △CBD (all AA)<br>
              From these similarities:<br>
              <span class="math">AC² = AB · AD</span> and <span class="math">BC² = AB · DB</span><br>
              Adding: <span class="math">AC² + BC² = AB(AD + DB) = AB² ✓</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Similarity proof</div>
            <p>In the figure, ∠BAC = ∠ADC = 90°. Prove △ABD ||| △CAD.<br><br>
            In △ABD and △CAD:<br>
            ∠ADB = ∠CDA = 90° − ∠D... (use given angles systematically)<br>
            ∠ABD = ∠ACD (same arc) ← use a reason for each step</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Similarity consequence: proportional sides</div>
            <p>
              Once similarity is proved, corresponding sides are proportional.<br>
              Always write: <span class="math">AB/DE = BC/EF = AC/DF</span> (in the same ORDER as the similarity statement)
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "△PQR ||| △STU (in that order). If PQ = 6, ST = 9, QR = 4, find TU.", options: ["6", "8", "3", "12"], answer: 0, topic: "Similarity & Pythagorean theorem proofs" },
        { type: "mc", text: "Which is sufficient to prove triangles similar?", options: ["SSA", "AAA", "SAS proportional", "Both B and C"], answer: 3, topic: "Similarity & Pythagorean theorem proofs" },
        { type: "mc", text: "In right △ABC (right angle C), altitude CD meets AB at D. Then △ACD ||| △ABC with correspondence:", options: ["A↔A, C↔B, D↔C", "A↔A, C↔C, D↔B", "C↔A, D↔C, A↔B", "A↔A, CD↔BC, AD↔AC"], answer: 0, topic: "Similarity & Pythagorean theorem proofs" },
        { type: "input", text: "In the Pythagorean proof: AC² = AB · AD. If AB = 25 and AD = 9, find AC.", answer: "15", topic: "Similarity & Pythagorean theorem proofs" },
        { type: "mc", text: "△ABC ||| △PQR. If area of △ABC = 18 cm² and AB/PQ = 1/2, area of △PQR =", options: ["36 cm²", "72 cm²", "9 cm²", "4.5 cm²"], answer: 1, topic: "Similarity & Pythagorean theorem proofs" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 8 Workbook — Euclidean Geometry",
    questions: [
      { number: 1, text: "In △ABC, D is on AB and E is on AC such that DE ∥ BC. AD = 2x − 3, DB = x + 1, AE = 3x − 2, EC = 2x + 2.", parts: [
        { label: "a", text: "Use BPT to write an equation.", marks: 2 },
        { label: "b", text: "Solve for x.", marks: 3 },
        { label: "c", text: "Find AD and DB.", marks: 2 }
      ]},
      { number: 2, text: "Prove the following: In △ABC, D is on AB and E is on AC with AD/DB = AE/EC. Prove DE ∥ BC. (Prove the converse of BPT)", parts: [
        { label: "a", text: "State the given and required to prove.", marks: 2 },
        { label: "b", text: "Write the proof using construction (draw DE' ∥ BC and show E' = E).", marks: 6 }
      ]},
      { number: 3, text: "In the figure, ∠BAC = 90° and AD ⊥ BC.", parts: [
        { label: "a", text: "Prove △ABD ||| △CAD.", marks: 4 },
        { label: "b", text: "Hence prove that AB² = BD · BC.", marks: 3 },
        { label: "c", text: "If BD = 4 and DC = 9, find AB and AC.", marks: 4 }
      ]}
    ],
    answers: {
      1: { a: "(2x−3)/(x+1)=(3x−2)/(2x+2)", b: "(2x−3)(2x+2)=(3x−2)(x+1)→4x²−2x−6=3x²+x−2→x²−3x−4=0→(x−4)(x+1)=0→x=4", c: "AD=5, DB=5" },
      2: { a: "Given: AD/DB=AE/EC; RTP: DE∥BC", b: "Draw DE'∥BC; by BPT: AD/DB=AE'/E'C; but AD/DB=AE/EC(given)→AE'/E'C=AE/EC→E'=E→DE∥BC ✓" },
      3: { a: "In △ABD and △CAD: ∠ADB=∠ADC=90°; ∠ABD=∠CAD(angles of△BAC sum: ∠B=90°−∠BAD=∠CAD); ∴△ABD|||△CAD(AA)", b: "AB/CB=BD/AB→AB²=BD·CB", c: "BC=13; AB²=4×13=52→AB=2√13; AC²=9×13=117→AC=3√13" }
    }
  }
});
