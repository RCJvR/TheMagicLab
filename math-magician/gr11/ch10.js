// Math Magician — Grade 11, Chapter 10
// Probability

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 1000,
      chapter: 10,
      name: "Independent & dependent events",
      fullName: "Independent events, dependent events, and the product rule",
      lesson: {
        heading: "Independent and dependent events",
        sub: "Chapter 10 · Topic 1",
        body: `
          <p>Grade 11 probability introduces the formal definition of independent events and probability trees for sequential events.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Independent events</div>
            <p>
              Events A and B are <strong>independent</strong> if the occurrence of one does not affect the probability of the other.<br>
              Test: <span class="math">P(A ∩ B) = P(A) × P(B)</span><br><br>
              For independent events: <span class="math">P(A and B) = P(A) × P(B)</span><br>
              Example: Coin flip AND die roll are independent.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Dependent events (conditional probability)</div>
            <p>
              Events are <strong>dependent</strong> if the occurrence of one affects the other.<br>
              <span class="math">P(A and B) = P(A) × P(B|A)</span><br>
              where P(B|A) = "probability of B given A has occurred"<br><br>
              Example: Drawing without replacement.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Tree diagram (without replacement)</div>
            <p>Bag: 3 red, 2 blue. Draw 2 without replacement.<br>
            P(RR) = 3/5 × 2/4 = 6/20 = 3/10<br>
            P(RB) = 3/5 × 2/4 = 6/20 = 3/10<br>
            P(BR) = 2/5 × 3/4 = 6/20 = 3/10<br>
            P(BB) = 2/5 × 1/4 = 2/20 = 1/10<br>
            Check: sum = 1 ✓</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Independence Test & Conditional Probability</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter P(A), P(B), and P(A∩B) — test independence and compute conditional probabilities.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A)</div><input id="g11c10pa" type="number" value="0.4" min="0" max="1" step="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(B)</div><input id="g11c10pb" type="number" value="0.3" min="0" max="1" step="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A∩B)</div><input id="g11c10pab" type="number" value="0.12" min="0" max="1" step="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c10Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Test</button>
            </div>
            <div id="g11c10Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function p4(n){return n.toFixed(4);}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const pa=gv('g11c10pa'),pb=gv('g11c10pb'),pab=gv('g11c10pab');
                const out=document.getElementById('g11c10Out');
                if([pa,pb,pab].some(isNaN)||pa<0||pb<0||pab<0||pa>1||pb>1||pab>1){out.innerHTML='<span style="color:#fca5a5;">All values must be between 0 and 1.</span>';return;}
                if(pab>pa||pab>pb){out.innerHTML='<span style="color:#fca5a5;">P(A∩B) cannot exceed P(A) or P(B).</span>';return;}
                const prod=pa*pb;
                const indep=Math.abs(prod-pab)<0.0001;
                const pAgivenB=pb>0?pab/pb:null;
                const pBgivenA=pa>0?pab/pa:null;
                const pAunionB=pa+pb-pab;
                let html='<span style="color:rgba(221,225,240,0.50);">P(A) × P(B) = '+p4(pa)+' × '+p4(pb)+' = '+p4(prod)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∩B) = '+p4(pab)+'</span><br>';
                if(indep) html+='<span style="color:#6ee7b7;">✅ A and B are INDEPENDENT — P(A∩B) = P(A)×P(B)</span><br>';
                else html+='<span style="color:#fca5a5;">❌ A and B are DEPENDENT — P(A∩B) ≠ P(A)×P(B)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∪B) = P(A)+P(B)−P(A∩B) = '+p4(pAunionB)+'</span><br>';
                if(pAgivenB!==null) html+='<span style="color:#fcd34d;">P(A|B) = P(A∩B)/P(B) = '+p4(pAgivenB)+'</span>   ';
                if(pBgivenA!==null) html+='<span style="color:#fcd34d;">P(B|A) = P(A∩B)/P(A) = '+p4(pBgivenA)+'</span>';
                out.innerHTML=html;
              }
              ['g11c10pa','g11c10pb','g11c10pab'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c10Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "P(A) = 0.4, P(B) = 0.3, P(A∩B) = 0.12. Are A and B independent?",
          options: ["Yes — P(A)×P(B)=0.12=P(A∩B)", "No — P(A∩B) should be 0.7", "Yes — they are mutually exclusive", "No — 0.12 ≠ 0"],
          answer: 0,
          topic: "Independent & dependent events"
        },
        {
          type: "mc",
          text: "Bag: 4 green, 6 red. Two drawn without replacement. P(both green) =",
          options: ["4/10 × 3/9", "4/10 × 4/10", "4/10 × 3/10", "3/10 × 2/9"],
          answer: 0,
          topic: "Independent & dependent events"
        },
        {
          type: "input",
          text: "P(A) = 0.5, P(B) = 0.6, and A and B are independent. Find P(A∩B).",
          answer: "0.3",
          altAnswers: ["0,3"],
          topic: "Independent & dependent events"
        },
        {
          type: "mc",
          text: "A coin is tossed and a card is drawn. These events are:",
          options: ["Dependent", "Mutually exclusive", "Independent", "Complementary"],
          answer: 2,
          topic: "Independent & dependent events"
        },
        {
          type: "mc",
          text: "Drawing two cards WITHOUT replacement makes the events:",
          options: ["Independent", "Dependent", "Mutually exclusive", "Complementary"],
          answer: 1,
          topic: "Independent & dependent events"
        }
      ]
    },
    {
      id: 1001,
      chapter: 10,
      name: "Venn diagrams, tree diagrams & contingency tables",
      fullName: "Advanced Venn diagrams, tree diagrams, and contingency tables",
      lesson: {
        heading: "Tree diagrams and contingency tables",
        sub: "Chapter 10 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Tree diagrams</div>
            <p>
              Used for sequential (multi-stage) experiments.<br>
              <strong>Rules:</strong><br>
              • Probabilities on each branch must sum to 1<br>
              • Multiply along branches for joint probabilities<br>
              • Add across rows for "or" outcomes<br>
              • All final outcomes must sum to 1
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Contingency tables (two-way tables)</div>
            <p>
              Display frequencies or probabilities for two variables simultaneously.<br><br>
              | | B | B' | Total |<br>
              | A | P(A∩B) | P(A∩B') | P(A) |<br>
              | A' | P(A'∩B) | P(A'∩B') | P(A') |<br>
              | Total | P(B) | P(B') | 1 |<br><br>
              Test independence: if P(A∩B) = P(A) × P(B) for all cells.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Contingency table</div>
            <p>150 students: 80 play sport, 60 play music, 30 do both.<br>
            | | Music | No Music | Total |<br>
            | Sport | 30 | 50 | 80 |<br>
            | No Sport | 30 | 40 | 70 |<br>
            | Total | 60 | 90 | 150 |<br><br>
            P(Sport) = 80/150; P(Music) = 60/150<br>
            P(Sport)×P(Music) = 0.213 ≠ P(Sport∩Music) = 30/150 = 0.2 → NOT independent</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Contingency Table Independence Checker</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the four inner cell counts — the calculator fills the totals and tests independence.</p>
            <div style="display:grid;grid-template-columns:auto auto auto auto;gap:6px;margin-bottom:10px;align-items:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;"></div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">B</div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">B'</div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">Total</div>
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">A</div>
              <input id="g11c10t2ab" type="number" value="30" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2ab2" type="number" value="50" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2ra" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#6ee7b7;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">A'</div>
              <input id="g11c10t2a2b" type="number" value="30" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2a2b2" type="number" value="40" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2ra2" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#6ee7b7;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <div style="font-size:12px;color:rgba(221,225,240,0.40);text-align:center;">Total</div>
              <input id="g11c10t2cb" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#6ee7b7;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2cb2" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#6ee7b7;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
              <input id="g11c10t2tot" type="text" value="" readonly style="width:60px;background:#0f0d1a;border:1px solid rgba(99,102,241,0.15);color:#a5b4fc;padding:6px;border-radius:6px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;">
            </div>
            <button id="g11c10t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Test Independence</button>
            <div id="g11c10t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function sv(id,v){document.getElementById(id).value=v;}
              function calc(){
                const ab=gv('g11c10t2ab'),ab2=gv('g11c10t2ab2'),a2b=gv('g11c10t2a2b'),a2b2=gv('g11c10t2a2b2');
                const out=document.getElementById('g11c10t2Out');
                if([ab,ab2,a2b,a2b2].some(isNaN)||[ab,ab2,a2b,a2b2].some(x=>x<0)){out.innerHTML='<span style="color:#fca5a5;">Enter non-negative counts.</span>';return;}
                const rA=ab+ab2,rA2=a2b+a2b2,cB=ab+a2b,cB2=ab2+a2b2,tot=rA+rA2;
                sv('g11c10t2ra',rA);sv('g11c10t2ra2',rA2);sv('g11c10t2cb',cB);sv('g11c10t2cb2',cB2);sv('g11c10t2tot',tot);
                if(tot===0){out.innerHTML='<span style="color:#fca5a5;">Total cannot be 0.</span>';return;}
                const pA=rA/tot,pB=cB/tot,pAB=ab/tot,expected=pA*pB;
                const indep=Math.abs(pAB-expected)<0.0001;
                let html='<span style="color:rgba(221,225,240,0.50);">n = '+tot+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A) = '+rA+'/'+tot+' = '+(pA).toFixed(4)+'</span>   <span style="color:rgba(221,225,240,0.50);">P(B) = '+cB+'/'+tot+' = '+(pB).toFixed(4)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∩B) = '+ab+'/'+tot+' = '+(pAB).toFixed(4)+'</span>   <span style="color:rgba(221,225,240,0.50);">P(A)×P(B) = '+(expected).toFixed(4)+'</span><br>';
                if(indep) html+='<span style="color:#6ee7b7;">✅ A and B are INDEPENDENT</span>';
                else html+='<span style="color:#fca5a5;">❌ A and B are NOT independent (P(A∩B) ≠ P(A)×P(B))</span>';
                out.innerHTML=html;
              }
              ['g11c10t2ab','g11c10t2ab2','g11c10t2a2b','g11c10t2a2b2'].forEach(id=>{document.getElementById(id).addEventListener('input',calc);document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c10t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a tree diagram, the probabilities on all branches from any node must sum to:",
          options: ["0", "0.5", "1", "100"],
          answer: 2,
          topic: "Venn diagrams, tree diagrams & contingency tables"
        },
        {
          type: "mc",
          text: "A contingency table shows P(A∩B) = 0.15, P(A) = 0.5, P(B) = 0.3. Are A and B independent?",
          options: ["Yes, since 0.5×0.3=0.15", "No, since 0.15≠0.3−0.5", "No, since P(A)+P(B)≠1", "Cannot determine"],
          answer: 0,
          topic: "Venn diagrams, tree diagrams & contingency tables"
        },
        {
          type: "input",
          text: "200 learners surveyed. 120 walk to school, 90 bring lunch, 50 do both. How many do neither?",
          answer: "40",
          topic: "Venn diagrams, tree diagrams & contingency tables"
        },
        {
          type: "mc",
          text: "A bag has 5 red and 3 blue balls. Two are drawn with replacement. P(one red, one blue) =",
          options: ["6/64", "15/64", "30/64", "15/56"],
          answer: 2,
          topic: "Venn diagrams, tree diagrams & contingency tables"
        },
        {
          type: "mc",
          text: "To find P(at least one) using a tree diagram, the easiest method is:",
          options: ["Add all branches with at least one", "1 − P(none at all)", "Multiply all probabilities", "Use the addition rule once"],
          answer: 1,
          topic: "Venn diagrams, tree diagrams & contingency tables"
        }
      ]
    },
    {
      id: 1002,
      chapter: 10,
      name: "Venn diagrams for three events",
      fullName: "Using Venn diagrams and set formulae for three events A, B and C",
      lesson: {
        heading: "Venn diagrams for three events",
        sub: "Chapter 10 · Topic 3",
        body: `
          <p>CAPS requires deriving and applying probability formulae for <strong>any three events</strong> A, B and C — the classic "drug trial" or "three subjects" style question with a 3-circle Venn diagram.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The addition rule for three events</div>
            <p>
              <span class="math">P(A∪B∪C) = P(A)+P(B)+P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C)</span><br><br>
              To fill in a 3-circle Venn diagram, always work from the <strong>centre outward</strong>: place the "all three" region first, then each pairwise-only region, then each single-only region.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Three-circle Venn</div>
            <p>80 patients; 40 relief from A, 35 from B, 40 from C; 21 from A and C; 18 from B and C; 68 from at least one; 7 from all three.<br>
            Centre (A∩B∩C) = 7.<br>
            A∩C only = 21 − 7 = 14; B∩C only = 18 − 7 = 11.<br>
            Using the addition rule to find A∩B: 68 = 40+35+40 − (A∩B) − 21 − 18 + 7 → solve for A∩B = 15, so A∩B only = 15 − 7 = 8.<br>
            A only = 40 − 14 − 8 − 7 = 11; B only = 35 − 8 − 11 − 7 = 9; C only = 40 − 14 − 11 − 7 = 8.<br>
            None of the three: 80 − 68 = 12.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Always double check: all regions of the Venn diagram should add up to the total sample size — this catches most arithmetic slips.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Three-Event Venn Diagram Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the total, each single-event count, each pairwise-intersection count, and the triple intersection — get every disjoint region.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Total n(S)</div><input id="g11c10t3s" type="number" value="80" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A)</div><input id="g11c10t3a" type="number" value="40" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(B)</div><input id="g11c10t3b" type="number" value="35" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(C)</div><input id="g11c10t3c" type="number" value="40" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A∩C)</div><input id="g11c10t3ac" type="number" value="21" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(B∩C)</div><input id="g11c10t3bc" type="number" value="18" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A∪B∪C)</div><input id="g11c10t3u" type="number" value="68" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A∩B∩C)</div><input id="g11c10t3abc" type="number" value="7" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c10t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve Venn</button>
            </div>
            <div id="g11c10t3Out" style="font-size:14px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const S=gv('g11c10t3s'),A=gv('g11c10t3a'),B=gv('g11c10t3b'),C=gv('g11c10t3c'),AC=gv('g11c10t3ac'),BC=gv('g11c10t3bc'),U=gv('g11c10t3u'),ABC=gv('g11c10t3abc');
                const out=document.getElementById('g11c10t3Out');
                if([S,A,B,C,AC,BC,U,ABC].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter all values.</span>';return;}
                const AB=A+B+C-AC-BC+ABC-U;
                const aOnly=A-AC-AB+ABC, bOnly=B-AB-BC+ABC, cOnly=C-AC-BC+ABC;
                const acOnly=AC-ABC, bcOnly=BC-ABC, abOnly=AB-ABC;
                const none=S-U;
                if(AB<0||aOnly<0||bOnly<0||cOnly<0||acOnly<0||bcOnly<0||abOnly<0||none<0){
                  out.innerHTML='<span style="color:#fca5a5;">These values are inconsistent — check a region came out negative. Review your given counts.</span>';return;
                }
                let html='<span style="color:rgba(221,225,240,0.50);">n(A∩B) solved from addition rule: '+AB+'</span><br>';
                html+='<span style="color:#fcd34d;">A only = '+aOnly+'</span>   <span style="color:#fcd34d;">B only = '+bOnly+'</span>   <span style="color:#fcd34d;">C only = '+cOnly+'</span><br>';
                html+='<span style="color:#a5b4fc;">A∩B only = '+abOnly+'</span>   <span style="color:#a5b4fc;">A∩C only = '+acOnly+'</span>   <span style="color:#a5b4fc;">B∩C only = '+bcOnly+'</span><br>';
                html+='<span style="color:#6ee7b7;">A∩B∩C = '+ABC+'</span>   <span style="color:#6ee7b7;">None of the three = '+none+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.45);font-size:12px;">Check: '+aOnly+'+'+bOnly+'+'+cOnly+'+'+abOnly+'+'+acOnly+'+'+bcOnly+'+'+ABC+'+'+none+' = '+(aOnly+bOnly+cOnly+abOnly+acOnly+bcOnly+ABC+none)+' (should equal n(S) = '+S+')</span>';
                out.innerHTML=html;
              }
              document.querySelectorAll('#g11c10t3s,#g11c10t3a,#g11c10t3b,#g11c10t3c,#g11c10t3ac,#g11c10t3bc,#g11c10t3u,#g11c10t3abc').forEach(el=>{el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c10t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "The addition rule for three events A, B, C is:",
          options: ["P(A)+P(B)+P(C)−P(A∩B)−P(A∩C)−P(B∩C)+P(A∩B∩C)", "P(A)+P(B)+P(C)", "P(A)×P(B)×P(C)", "P(A)+P(B)+P(C)−P(A∩B∩C)"],
          answer: 0,
          topic: "Venn diagrams for three events"
        },
        {
          type: "input",
          text: "In a 3-circle Venn diagram, A∩B (all, including triple overlap) = 15 and A∩B∩C = 6. Find the region 'A∩B only' (excluding C).",
          answer: "9",
          topic: "Venn diagrams for three events"
        },
        {
          type: "mc",
          text: "When building a 3-circle Venn diagram from given data, you should always start by filling in:",
          options: ["The centre region (A∩B∩C)", "The outer 'none' region", "Any single-event region", "The total first"],
          answer: 0,
          topic: "Venn diagrams for three events"
        },
        {
          type: "input",
          text: "120 learners: 60 play soccer, 50 play rugby, 45 play cricket, 20 play soccer and rugby, 15 play rugby and cricket, 18 play soccer and cricket, 8 play all three. How many play none of the three sports?",
          answer: "30",
          topic: "Venn diagrams for three events"
        },
        {
          type: "mc",
          text: "If every region of a completed 3-circle Venn diagram is added together, the total should equal:",
          options: ["n(S), the size of the sample space", "P(A∩B∩C)", "1", "n(A) + n(B) + n(C)"],
          answer: 0,
          topic: "Venn diagrams for three events"
        }
      ]
    },
    {
      id: 1003,
      chapter: 10,
      name: "Fundamental counting principle",
      fullName: "Using the fundamental counting principle to count outcomes and calculate probabilities",
      lesson: {
        heading: "The fundamental counting principle",
        sub: "Chapter 10 · Topic 4",
        body: `
          <p>The <strong>fundamental counting principle</strong> lets you count the total number of possible outcomes of a multi-stage process without listing them all — essential for probability problems involving passwords, number plates, arrangements, and codes.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The fundamental counting principle</div>
            <p>
              If a first choice can be made in m ways, and for each of those a second choice can be made in n ways, and so on, then the total number of outcomes is:<br>
              <span class="math">m × n × p × ...</span><br><br>
              Watch for the phrase "without repetition" — this reduces the number of choices available at each subsequent stage.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: PIN codes</div>
            <p>How many 4-digit PIN codes are possible (digits 0-9, repetition allowed)?<br>
            10 × 10 × 10 × 10 = 10 000<br>
            How many if no digit may repeat?<br>
            10 × 9 × 8 × 7 = 5 040</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Probability using counting</div>
            <p>A password is 2 letters (A-Z) followed by 3 digits, no repetition within each part. Find the probability that a randomly generated password starts with "AB".<br>
            Total passwords = (26×25) × (10×9×8) = 650 × 720 = 468 000<br>
            Passwords starting "AB": 1 × (10×9×8) = 720<br>
            P = 720/468 000 = 1/650</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The fundamental counting principle is the foundation for factorial-based arrangements you'll extend further in Grade 12 (permutations and combinations).</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Counting Principle Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the number of choices available at each stage (comma-separated) — get the total outcomes, with and without repetition.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:220px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Choices per stage (comma-separated, e.g. 26,26,10,10,10)</div>
                <input id="g11c10t4data" type="text" value="26,26,10,10,10" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c10t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c10t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function calc(){
                const raw=document.getElementById('g11c10t4data').value;
                const out=document.getElementById('g11c10t4Out');
                const arr=raw.split(',').map(s=>parseInt(s.trim(),10)).filter(n=>!isNaN(n)&&n>0);
                if(arr.length<1){out.innerHTML='<span style="color:#fca5a5;">Enter at least one positive integer.</span>';return;}
                const withRep=arr.reduce((a,b)=>a*b,1);
                let html='<span style="color:rgba(221,225,240,0.50);">Stages: '+arr.join(' × ')+'</span><br>';
                html+='<span style="color:#6ee7b7;">Total outcomes (repetition allowed) = '+withRep.toLocaleString('en-ZA')+'</span><br>';
                if(arr.every(n=>n===arr[0])){
                  const k=arr[0],len=arr.length;
                  let noRep=1,ok=true;
                  for(let i=0;i<len;i++){const v=k-i; if(v<=0){ok=false;break;} noRep*=v;}
                  if(ok) html+='<span style="color:#fcd34d;">Total outcomes (no repetition, same pool size '+k+' each stage) = '+k+(len>1?'×'+Array.from({length:len-1},(_, i)=>k-1-i).join('×'):'')+' = '+noRep.toLocaleString('en-ZA')+'</span>';
                  else html+='<span style="color:rgba(221,225,240,0.45);">Cannot avoid repetition — more stages than items in the pool.</span>';
                } else {
                  html+='<span style="color:rgba(221,225,240,0.45);font-size:12px;">"No repetition" only applies cleanly when every stage draws from the same pool — mixed pools (e.g. letters then digits) usually only forbid repeats within each part.</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c10t4data').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c10t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A restaurant offers 4 starters, 5 mains, and 3 desserts. The number of possible 3-course meals is:",
          options: ["12", "60", "15", "20"],
          answer: 1,
          topic: "Fundamental counting principle"
        },
        {
          type: "input",
          text: "How many 3-digit codes (digits 0-9) are possible if repetition is allowed?",
          answer: "1000",
          topic: "Fundamental counting principle"
        },
        {
          type: "mc",
          text: "How many 3-digit codes (digits 0-9) are possible if NO digit may repeat?",
          options: ["1000", "720", "504", "900"],
          answer: 1,
          topic: "Fundamental counting principle"
        },
        {
          type: "mc",
          text: "A number plate has 3 letters followed by 3 digits (repetition allowed in both parts). The total number of plates is:",
          options: ["26³ × 10³", "26 × 10", "(26+10)³", "3 × 26 × 10"],
          answer: 0,
          topic: "Fundamental counting principle"
        },
        {
          type: "input",
          text: "A 4-digit PIN (0-9, no repetition) is chosen at random. What is the probability it is exactly '1234' (as a fraction with denominator equal to the total number of PINs, give just the denominator)?",
          answer: "5040",
          topic: "Fundamental counting principle"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 10 Workbook — Probability",
    questions: [
      {
        number: 1,
        text: "A bag contains 4 white and 3 black balls. Two balls are drawn without replacement.",
        parts: [
          { label: "a", text: "Draw a tree diagram showing all outcomes and their probabilities.", marks: 4 },
          { label: "b", text: "Find P(both white).", marks: 2 },
          { label: "c", text: "Find P(at least one black).", marks: 3 },
          { label: "d", text: "Find P(one of each colour).", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "A survey of 200 Grade 11 learners asked about social media use and academic performance:",
        parts: [
          { label: "", text: "| | Good results | Poor results | Total |\n| High SM use | 45 | 55 | 100 |\n| Low SM use | 70 | 30 | 100 |\n| Total | 115 | 85 | 200 |", marks: 0 },
          { label: "a", text: "Find P(high SM use AND good results).", marks: 1 },
          { label: "b", text: "Find P(good results).", marks: 1 },
          { label: "c", text: "Find P(high SM use) × P(good results).", marks: 2 },
          { label: "d", text: "Are social media use and academic results independent? Justify.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Branch 1: W(4/7)→W(3/6), B(3/6); Branch 2: B(3/7)→W(4/6), B(2/6)",
        b: "P(WW)=4/7×3/6=12/42=2/7",
        c: "P(at least 1 black)=1−P(WW)=1−2/7=5/7",
        d: "P(WB)+P(BW)=4/7×3/6+3/7×4/6=12/42+12/42=24/42=4/7"
      },
      2: {
        a: "45/200=0.225",
        b: "115/200=0.575",
        c: "(100/200)×(115/200)=0.5×0.575=0.2875",
        d: "0.225≠0.2875 → NOT independent (high SM use correlates with poorer results)"
      }
    }
  }
});
