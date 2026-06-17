// Math Magician — Grade 12, Chapter 8
// Euclidean Geometry — Proportion, Similarity, Pythagorean Theorem

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 800,
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

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 BPT & Proportion Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">In △ABC with DE ∥ BC: AD/DB = AE/EC. Enter any three — find the fourth. Also see area ratio.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">AD</div><input id="g12c8AD" type="number" value="3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">DB</div><input id="g12c8DB" type="number" value="5" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">AE</div><input id="g12c8AE" type="number" value="6" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">EC (blank=find)</div><input id="g12c8EC" type="text" placeholder="?" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c8Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
            </div>
            <div id="g12c8Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){const v=parseFloat(document.getElementById(id).value);return isNaN(v)?null:v;}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const AD=gv('g12c8AD'),DB=gv('g12c8DB'),AE=gv('g12c8AE');
                const ECraw=document.getElementById('g12c8EC').value.trim();
                const EC=ECraw===''||ECraw==='?'?null:parseFloat(ECraw);
                const out=document.getElementById('g12c8Out');
                let html='';
                if(AD&&DB&&AE&&!EC){
                  const ec=AE*DB/AD;
                  document.getElementById('g12c8EC').value=f4(ec);
                  html='<span style="color:rgba(221,225,240,0.50);">AD/DB = AE/EC → EC = AE×DB/AD</span><br>'+
                    '<span style="color:rgba(221,225,240,0.50);">EC = '+AE+'×'+DB+'/'+AD+'</span><br>'+
                    '<span style="color:#6ee7b7;">EC = '+f4(ec)+'</span>';
                  const ratio=AD/DB,ratioArea=ratio*ratio;
                  html+='<br><span style="color:rgba(221,225,240,0.50);">Similarity ratio △ADE:△ABC = AD/AB = '+AD+'/'+(AD+DB)+' = '+f4(AD/(AD+DB))+'</span>';
                  html+='<br><span style="color:#fcd34d;">Area ratio △ADE:△ABC = ('+f4(AD/(AD+DB))+')² = '+f4((AD/(AD+DB))*(AD/(AD+DB)))+'</span>';
                } else if(AD&&DB&&AE&&EC){
                  const lhs=AD/DB,rhs=AE/EC;
                  const isParallel=Math.abs(lhs-rhs)<0.0001;
                  html='<span style="color:rgba(221,225,240,0.50);">AD/DB = '+f4(lhs)+'   AE/EC = '+f4(rhs)+'</span><br>';
                  html+=isParallel?'<span style="color:#6ee7b7;">✅ DE ∥ BC (ratios equal — converse BPT)</span>':'<span style="color:#fca5a5;">❌ DE is NOT parallel to BC</span>';
                } else {
                  out.innerHTML='<span style="color:#fca5a5;">Enter AD, DB, AE and leave EC blank to find it, or enter all four to test parallelism.</span>';return;
                }
                out.innerHTML=html;
              }
              ['g12c8AD','g12c8DB','g12c8AE','g12c8EC'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c8Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
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
      id: 801,
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

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Similarity & Area Ratio Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter corresponding sides AB and DE — find the similarity ratio, area ratio, and any missing side.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">AB (△1 side)</div><input id="g12c8t2ab" type="number" value="6" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">DE (△2 side)</div><input id="g12c8t2de" type="number" value="9" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Known side (△1)</div><input id="g12c8t2s1" type="number" value="4" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c8t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g12c8t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const AB=gv('g12c8t2ab'),DE=gv('g12c8t2de'),s1=gv('g12c8t2s1');
                const out=document.getElementById('g12c8t2Out');
                if([AB,DE].some(isNaN)||AB<=0||DE<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive AB and DE.</span>';return;}
                const k=DE/AB;
                const s2=s1*k;
                let html='<span style="color:rgba(221,225,240,0.50);">Similarity ratio: AB/DE = '+AB+'/'+DE+' = 1:'+f4(k)+'</span><br>';
                html+='<span style="color:#fcd34d;">Area ratio △1 : △2 = 1 : '+f4(k*k)+'   (ratio of sides)²</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Volume ratio (if 3D): 1 : '+f4(k*k*k)+'   (ratio of sides)³</span>';
                if(!isNaN(s1)&&s1>0) html+='<br><span style="color:#6ee7b7;">Corresponding side in △2: '+f4(s2)+'</span>';
                out.innerHTML=html;
              }
              ['g12c8t2ab','g12c8t2de','g12c8t2s1'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c8t2Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
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
