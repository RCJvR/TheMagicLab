// Math Magician — Grade 12, Chapter 10
// Probability — Counting Principles

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 1000,
      chapter: 10,
      name: "Fundamental counting principle & factorial notation",
      fullName: "The fundamental counting principle, factorial notation, and permutations",
      lesson: {
        heading: "Counting principle, factorials, and permutations",
        sub: "Chapter 10 · Topic 1",
        body: `
          <p>Grade 12 Probability introduces <strong>counting techniques</strong> — systematic ways to count outcomes without listing them all.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Fundamental Counting Principle (FCP)</div>
            <p>
              If event A can occur in m ways and event B can occur in n ways, then A AND B can occur in <span class="math">m × n</span> ways.<br><br>
              Extends to any number of events: multiply the number of choices at each step.<br><br>
              Example: 3 shirts, 4 pants, 2 shoes → 3 × 4 × 2 = 24 outfits
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Factorial notation</div>
            <p>
              <span class="math">n! = n × (n−1) × (n−2) × … × 2 × 1</span><br>
              <span class="math">0! = 1</span> (by definition)<br><br>
              Examples: 5! = 120; 4! = 24; 3! = 6
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Permutations (ordered arrangements)</div>
            <p>
              The number of ways to arrange r objects from n distinct objects:<br>
              <span class="math">ₙPᵣ = n! / (n−r)!</span><br><br>
              Arranging ALL n objects: <span class="math">n!</span> ways<br><br>
              <strong>With restrictions:</strong> fix the restricted elements first, then count the rest.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Examples</div>
            <p><strong>(a)</strong> Arrangements of ABCDE: 5! = 120<br>
            <strong>(b)</strong> 3 from 8 in order: ₈P₃ = 8×7×6 = 336<br>
            <strong>(c)</strong> ABCDE with A first: 1 × 4! = 24</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Counting Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Compute factorials, FCP (multiply choices at each step), and permutations ₙPᵣ.</p>
            <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <button id="g12c10mFact" class="g12c10mode" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:rgba(99,102,241,0.30);color:#a5b4fc;">n!</button>
              <button id="g12c10mFCP" class="g12c10mode" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:transparent;color:rgba(221,225,240,0.50);">FCP</button>
              <button id="g12c10mPerm" class="g12c10mode" style="padding:5px 13px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:transparent;color:rgba(221,225,240,0.50);">ₙPᵣ</button>
            </div>
            <div id="g12c10inp" style="margin-bottom:10px;"></div>
            <button id="g12c10Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:8px;">Calculate</button>
            <div id="g12c10Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              let mode='fact';
              const inp=document.getElementById('g12c10inp'),out=document.getElementById('g12c10Out');
              const inStyle='background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:"JetBrains Mono",monospace;text-align:center;width:70px;';
              const lblStyle='font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;';
              function fact(n){if(n<0||n>170)return null;let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
              function render(){
                out.innerHTML='';
                if(mode==='fact'){
                  inp.innerHTML='<div><div style="'+lblStyle+'">n</div><input id="g12c10n" type="number" value="5" min="0" max="20" style="'+inStyle+'"></div>';
                } else if(mode==='fcp'){
                  inp.innerHTML='<div><div style="'+lblStyle+'">Choices at each step (comma-separated)</div><input id="g12c10steps" type="text" value="3,4,2" style="width:220px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:\'JetBrains Mono\',monospace;box-sizing:border-box;"></div>';
                } else {
                  inp.innerHTML='<div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;"><div><div style="'+lblStyle+'">n</div><input id="g12c10pn" type="number" value="8" min="0" max="20" style="'+inStyle+'"></div><div><div style="'+lblStyle+'">r</div><input id="g12c10pr" type="number" value="3" min="0" max="20" style="'+inStyle+'"></div></div>';
                }
                Array.from(inp.querySelectorAll('input')).forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));
              }
              function calc(){
                if(mode==='fact'){
                  const n=parseInt(document.getElementById('g12c10n').value);
                  if(isNaN(n)||n<0){out.innerHTML='<span style="color:#fca5a5;">Enter a non-negative integer.</span>';return;}
                  const v=fact(n);
                  if(v===null){out.innerHTML='<span style="color:#fca5a5;">n too large (max 20).</span>';return;}
                  out.innerHTML='<span style="color:#6ee7b7;">'+n+'! = '+v.toLocaleString()+'</span>';
                } else if(mode==='fcp'){
                  const steps=document.getElementById('g12c10steps').value.split(',').map(s=>parseInt(s.trim()));
                  if(steps.some(isNaN)||steps.some(s=>s<1)){out.innerHTML='<span style="color:#fca5a5;">Enter positive integers for each step.</span>';return;}
                  const product=steps.reduce((a,b)=>a*b,1);
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+steps.join(' × ')+' = </span><span style="color:#6ee7b7;">'+product.toLocaleString()+'</span>';
                } else {
                  const n=parseInt(document.getElementById('g12c10pn').value),r=parseInt(document.getElementById('g12c10pr').value);
                  if(isNaN(n)||isNaN(r)||r>n||n<0||r<0){out.innerHTML='<span style="color:#fca5a5;">Need 0 ≤ r ≤ n.</span>';return;}
                  const fn=fact(n),fnr=fact(n-r);
                  if(fn===null){out.innerHTML='<span style="color:#fca5a5;">n too large (max 20).</span>';return;}
                  const v=fn/fnr;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">ₙPᵣ = '+n+'!/('+n+'−'+r+')! = '+n+'!/'+( n-r)+'! = </span><span style="color:#6ee7b7;">'+v.toLocaleString()+'</span>';
                }
              }
              document.getElementById('g12c10Btn').addEventListener('click',calc);
              ['g12c10mFact','g12c10mFCP','g12c10mPerm'].forEach((id,i)=>{
                document.getElementById(id).addEventListener('click',function(){
                  mode=['fact','fcp','perm'][i];
                  document.querySelectorAll('.g12c10mode').forEach(b=>{b.style.background='transparent';b.style.color='rgba(221,225,240,0.50)';});
                  this.style.background='rgba(99,102,241,0.30)';this.style.color='#a5b4fc';
                  render();
                });
              });
              render();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "How many 3-digit codes can be formed from digits 1–9 if repetition is allowed?", options: ["504", "729", "84", "27"], answer: 1, topic: "Fundamental counting principle & factorial notation" },
        { type: "input", text: "Evaluate: 6!/4!", answer: "30", topic: "Fundamental counting principle & factorial notation" },
        { type: "mc", text: "How many ways can 5 people sit in a row?", options: ["25", "120", "60", "5"], answer: 1, topic: "Fundamental counting principle & factorial notation" },
        { type: "mc", text: "₇P₂ = ", options: ["21", "42", "14", "49"], answer: 1, topic: "Fundamental counting principle & factorial notation" },
        { type: "mc", text: "6 people in a row, with A and B always at the ends. How many arrangements?", options: ["48", "24", "12", "96"], answer: 0, topic: "Fundamental counting principle & factorial notation" }
      ]
    },
    {
      id: 1001,
      chapter: 10,
      name: "Combinations & probability applications",
      fullName: "Combinations, probability using counting, and applications",
      lesson: {
        heading: "Combinations and probability with counting",
        sub: "Chapter 10 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Combinations (unordered selections)</div>
            <p>
              When order does NOT matter, use combinations:<br>
              <span class="math">ₙCᵣ = C(n,r) = n! / [r!(n−r)!]</span><br><br>
              Key difference: permutations = ORDER MATTERS; combinations = order does NOT matter.<br><br>
              Example: choosing 3 from 8 (order doesn't matter): ₈C₃ = 56
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Committee selection</div>
            <p>Choose a committee of 4 from 10 people. Order doesn't matter.<br>
            ₁₀C₄ = 10!/(4! × 6!) = 210</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Probability using counting principles</div>
            <p>
              <span class="math">P(event) = number of favourable outcomes / total outcomes</span><br><br>
              With counting: both numerator and denominator are counted using FCP, permutations, or combinations.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Probability with combinations</div>
            <p>From a group of 6 men and 4 women, choose 3. P(all women)?<br>
            Favourable: ₄C₃ = 4<br>
            Total: ₁₀C₃ = 120<br>
            P = 4/120 = 1/30</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Permutations vs Combinations — quick test</div>
            <p>
              "ABC" and "CAB" — are these the same or different?<br>
              Same (unordered selection) → Combination<br>
              Different (ordered arrangement) → Permutation
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Combination & Probability Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Compute ₙCᵣ and optionally P(event) = favourable ÷ total (each calculated via combinations).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n</div><input id="g12c10t2n" type="number" value="10" min="0" max="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r</div><input id="g12c10t2r" type="number" value="3" min="0" max="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
            </div>
            <p style="font-size:12px;color:rgba(221,225,240,0.50);margin:4px 0 6px;">Optional: compute P = ₙCᵣ / total for a probability calculation</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Total n</div><input id="g12c10t2tn" type="number" placeholder="e.g. 10" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Total r (choose)</div><input id="g12c10t2tr" type="number" placeholder="e.g. 3" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
            </div>
            <button id="g12c10t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:8px;">Calculate</button>
            <div id="g12c10t2Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fact(n){if(n===0||n===1)return 1;let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
              function comb(n,r){if(r<0||r>n)return 0;if(r===0||r===n)return 1;return fact(n)/(fact(r)*fact(n-r));}
              function calc(){
                const n=parseInt(document.getElementById('g12c10t2n').value),r=parseInt(document.getElementById('g12c10t2r').value);
                const out=document.getElementById('g12c10t2Out');
                if(isNaN(n)||isNaN(r)||r>n||n<0||r<0||n>30){out.innerHTML='<span style="color:#fca5a5;">Need 0 ≤ r ≤ n ≤ 30.</span>';return;}
                const c=comb(n,r);
                let html='<span style="color:#6ee7b7;">₍'+n+'₎C₍'+r+'₎ = '+n+'! / ('+r+'! × '+(n-r)+'!) = '+c.toLocaleString()+'</span><br>';
                const tn=parseInt(document.getElementById('g12c10t2tn').value),tr=parseInt(document.getElementById('g12c10t2tr').value);
                if(!isNaN(tn)&&!isNaN(tr)&&tn>=0&&tr>=0&&tr<=tn&&tn<=30){
                  const total=comb(tn,tr);
                  if(total>0){
                    const p=c/total;
                    html+='<span style="color:#fcd34d;">P = '+c.toLocaleString()+' / '+total.toLocaleString()+' = '+p.toFixed(6)+'</span>';
                    html+='<span style="color:rgba(221,225,240,0.50);"> ≈ '+( p*100).toFixed(2)+'%</span>';
                  }
                }
                out.innerHTML=html;
              }
              document.getElementById('g12c10t2Btn').addEventListener('click',calc);
              ['g12c10t2n','g12c10t2r','g12c10t2tn','g12c10t2tr'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "₈C₃ = ", options: ["336", "56", "24", "28"], answer: 1, topic: "Combinations & probability applications" },
        { type: "mc", text: "Choosing a team of 5 from 12 players (order irrelevant):", options: ["₁₂P₅", "₁₂C₅", "12×5", "12!/5!"], answer: 1, topic: "Combinations & probability applications" },
        { type: "input", text: "From 10 books, choose 3 (order doesn't matter). How many ways?", answer: "120", topic: "Combinations & probability applications" },
        { type: "mc", text: "Deck of 52 cards. P(5-card hand with all hearts):", options: ["₁₃C₅/₅₂C₅", "13/52", "₁₃P₅/₅₂P₅", "5/52"], answer: 0, topic: "Combinations & probability applications" },
        { type: "mc", text: "From 5 boys and 3 girls, choose 4. P(exactly 2 boys and 2 girls)?", options: ["₅C₂·₃C₂/₈C₄", "₅P₂·₃P₂/₈P₄", "10/70", "Both A and C"], answer: 0, topic: "Combinations & probability applications" }
      ]
    },
    {
      id: 1002,
      chapter: 10,
      name: "Revision: probability identities & Venn diagrams",
      fullName: "Revising Grade 11 probability rules — mutually exclusive, complementary, independent events, and Venn diagrams",
      lesson: {
        heading: "Revision: probability identities and Venn diagrams",
        sub: "Chapter 10 · Topic 3",
        body: `
          <p>Before tackling counting techniques, CAPS requires a solid revision of the <strong>core probability identities</strong> from Grade 11 — these underpin every counting-based probability question.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The addition rule</div>
            <p>
              For any two events A and B:<br>
              <span class="math">P(A or B) = P(A) + P(B) − P(A and B)</span><br><br>
              <strong>Mutually exclusive</strong> events (cannot happen together, so P(A and B) = 0):<br>
              <span class="math">P(A or B) = P(A) + P(B)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Independent events</div>
            <p>
              A and B are <strong>independent</strong> if the occurrence of one does not affect the probability of the other:<br>
              <span class="math">P(A and B) = P(A) × P(B)</span><br><br>
              To test independence: check whether P(A and B) = P(A) × P(B). If equal, independent; otherwise, dependent.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Complementary rule</div>
            <p>
              <span class="math">P(not A) = 1 − P(A)</span><br><br>
              Very useful for "at least one" problems: <span class="math">P(at least one) = 1 − P(none)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Venn diagram</div>
            <p>In a class of 30, 18 play soccer (S), 12 play tennis (T), 6 play both.<br>
            P(S or T) = P(S) + P(T) − P(S and T) = 18/30 + 12/30 − 6/30 = 24/30 = 4/5<br>
            P(neither) = 1 − 4/5 = 1/5</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Reading a Venn diagram</div>
            <p>
              Always fill in the <strong>intersection region first</strong> (the "and" value), then work outwards to the regions belonging to only one event, using the given totals.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Venn Diagram / Addition Rule Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter P(A), P(B) and P(A and B) — compute P(A or B), P(not A), and test independence.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A)</div><input id="g12c10t3a" type="number" value="0.6" step="0.01" min="0" max="1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(B)</div><input id="g12c10t3b" type="number" value="0.4" step="0.01" min="0" max="1" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A and B)</div><input id="g12c10t3ab" type="number" value="0.2" step="0.01" min="0" max="1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c10t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Analyse</button>
            </div>
            <div id="g12c10t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const pa=gv('g12c10t3a'),pb=gv('g12c10t3b'),pab=gv('g12c10t3ab');
                const out=document.getElementById('g12c10t3Out');
                if([pa,pb,pab].some(isNaN)||pa<0||pa>1||pb<0||pb>1||pab<0||pab>1){out.innerHTML='<span style="color:#fca5a5;">Enter probabilities between 0 and 1.</span>';return;}
                const por=pa+pb-pab;
                const notA=1-pa;
                const indep=Math.abs(pab-pa*pb)<0.0001;
                const mutex=Math.abs(pab)<0.0001;
                let html='<span style="color:#6ee7b7;">P(A or B) = '+f4(pa)+' + '+f4(pb)+' − '+f4(pab)+' = '+f4(por)+'</span><br>';
                html+='<span style="color:#fcd34d;">P(not A) = 1 − '+f4(pa)+' = '+f4(notA)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A)×P(B) = '+f4(pa*pb)+' vs P(A and B) = '+f4(pab)+' → '+(indep?'INDEPENDENT':'NOT independent (dependent)')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A and B) = '+f4(pab)+' → '+(mutex?'mutually exclusive':'NOT mutually exclusive (events overlap)')+'</span>';
                out.innerHTML=html;
              }
              ['g12c10t3a','g12c10t3b','g12c10t3ab'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c10t3Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "P(A) = 0.5, P(B) = 0.3, P(A and B) = 0.1. Find P(A or B).", options: ["0.8", "0.7", "0.9", "0.6"], answer: 1, topic: "Revision: probability identities & Venn diagrams" },
        { type: "mc", text: "Two mutually exclusive events A and B have P(A) = 0.4 and P(B) = 0.35. P(A or B) =", options: ["0.14", "0.75", "0.05", "1"], answer: 1, topic: "Revision: probability identities & Venn diagrams" },
        { type: "input", text: "P(A) = 0.7. Find P(not A).", answer: "0.3", altAnswers: ["0,3"], topic: "Revision: probability identities & Venn diagrams" },
        { type: "mc", text: "Events A and B satisfy P(A) = 0.5, P(B) = 0.4, P(A and B) = 0.2. Are they independent?", options: ["Yes, since P(A)×P(B) = 0.2 = P(A and B)", "No, since P(A and B) ≠ 0", "Cannot be determined", "Yes, all events are independent"], answer: 0, topic: "Revision: probability identities & Venn diagrams" },
        { type: "mc", text: "In a Venn diagram, 40 people total, n(S) = 22, n(T) = 20, n(S and T) = 8. How many are in NEITHER S nor T?", options: ["6", "10", "34", "14"], answer: 0, topic: "Revision: probability identities & Venn diagrams" },
        { type: "input", text: "P(rain) = 0.3 on each of 2 independent days. Find P(rain on both days).", answer: "0.09", altAnswers: ["0,09", "9/100"], topic: "Revision: probability identities & Venn diagrams" }
      ]
    },
    {
      id: 1003,
      chapter: 10,
      name: "Tree diagrams, tables & dependent events",
      fullName: "Using tree diagrams and two-way contingency tables for dependent and independent events, with and without replacement",
      lesson: {
        heading: "Tree diagrams, two-way tables, and dependent events",
        sub: "Chapter 10 · Topic 4",
        body: `
          <p>Many real exam problems combine counting with <strong>sequential</strong> events — where the outcome of one step affects the next. Tree diagrams and two-way tables help organise these systematically.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Tree diagrams</div>
            <p>
              A tree diagram shows all possible sequences of outcomes, with probabilities on each branch.<br>
              • Multiply probabilities <strong>along a branch</strong> (AND, sequential)<br>
              • Add probabilities <strong>across different branches</strong> (OR, different paths to the same result)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 With vs without replacement</div>
            <p>
              <strong>With replacement:</strong> probabilities stay the same at each draw (independent events).<br>
              <strong>Without replacement:</strong> probabilities change after each draw because the total changes (dependent events) — this is where tree diagrams are essential.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: without replacement</div>
            <p>A bag has 5 red and 3 blue balls. Two are drawn without replacement. P(both red)?<br>
            P(1st red) = 5/8<br>
            P(2nd red | 1st red) = 4/7 (one red ball removed)<br>
            P(both red) = 5/8 × 4/7 = 20/56 = 5/14</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Two-way contingency tables</div>
            <p>
              A two-way table organises counts by two categorical variables in rows and columns, with row/column totals.<br>
              Used to compute conditional probabilities: <span class="math">P(A | B) = n(A and B) / n(B)</span>, reading directly from the table.
            </p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Choosing a technique</div>
            <p>
              Sequential draws (order matters, dependent) → tree diagram.<br>
              Two categorical variables measured on the same group → two-way table.<br>
              Overlapping sets/conditions → Venn diagram.<br>
              Counting arrangements/selections → fundamental counting principle, permutations, or combinations.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Without-Replacement Tree Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">A bag has some red and some blue balls. Draw 2 without replacement — find P(both red), P(both blue), P(one of each).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Red balls</div><input id="g12c10t4r" type="number" value="5" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Blue balls</div><input id="g12c10t4b" type="number" value="3" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c10t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Build tree</button>
            </div>
            <div id="g12c10t4Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseInt(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const r=gv('g12c10t4r'),b=gv('g12c10t4b');
                const out=document.getElementById('g12c10t4Out');
                if(isNaN(r)||isNaN(b)||r<0||b<0||(r+b)<2){out.innerHTML='<span style="color:#fca5a5;">Enter non-negative red and blue counts (total ≥ 2).</span>';return;}
                const total=r+b;
                const pRR=(r/total)*((r-1)/(total-1));
                const pBB=(b/total)*((b-1)/(total-1));
                const pRB=(r/total)*(b/(total-1));
                const pBR=(b/total)*(r/(total-1));
                const pOneEach=pRB+pBR;
                let html='<span style="color:rgba(221,225,240,0.50);">Bag: '+r+' red, '+b+' blue ('+total+' total). Drawing 2 without replacement:</span><br>';
                html+='<span style="color:#6ee7b7;">P(both red) = ('+r+'/'+total+')×('+(r-1)+'/'+(total-1)+') = '+f4(pRR)+'</span><br>';
                html+='<span style="color:#6ee7b7;">P(both blue) = ('+b+'/'+total+')×('+(b-1)+'/'+(total-1)+') = '+f4(pBB)+'</span><br>';
                html+='<span style="color:#fcd34d;">P(one of each) = P(RB)+P(BR) = '+f4(pRB)+' + '+f4(pBR)+' = '+f4(pOneEach)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Check: '+f4(pRR)+' + '+f4(pBB)+' + '+f4(pOneEach)+' = '+f4(pRR+pBB+pOneEach)+'</span>';
                out.innerHTML=html;
              }
              ['g12c10t4r','g12c10t4b'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c10t4Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "On a tree diagram, probabilities along a single branch (sequential events) should be:", options: ["Added", "Multiplied", "Subtracted", "Divided"], answer: 1, topic: "Tree diagrams, tables & dependent events" },
        { type: "mc", text: "A bag has 4 red and 6 blue balls. One is drawn, NOT replaced, then a second is drawn. This models:", options: ["Independent events", "Dependent events", "Mutually exclusive events", "Complementary events"], answer: 1, topic: "Tree diagrams, tables & dependent events" },
        { type: "input", text: "Bag has 3 red, 2 blue (5 total). Draw 2 without replacement. Find P(both red) as a fraction in lowest terms (e.g. 3/10).", answer: "3/10", altAnswers: ["0.3", "0,3"], topic: "Tree diagrams, tables & dependent events" },
        { type: "mc", text: "A two-way table is most useful for finding:", options: ["ₙCᵣ values", "Conditional probabilities from two categorical variables", "Factorials", "The correlation coefficient"], answer: 1, topic: "Tree diagrams, tables & dependent events" },
        { type: "mc", text: "With replacement, drawing twice from a bag of 4 red and 6 blue balls means the events are:", options: ["Dependent", "Independent", "Mutually exclusive", "Impossible"], answer: 1, topic: "Tree diagrams, tables & dependent events" },
        { type: "input", text: "A coin is tossed twice (independent). Find P(exactly one head) as a fraction.", answer: "1/2", altAnswers: ["0.5", "0,5"], topic: "Tree diagrams, tables & dependent events" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 10 Workbook — Probability and Counting",
    questions: [
      { number: 1, text: "A 4-digit PIN is formed from digits 0–9.", parts: [
        { label: "a", text: "How many PINs are possible if digits can be repeated?", marks: 2 },
        { label: "b", text: "How many PINs have no repeated digits?", marks: 2 },
        { label: "c", text: "How many PINs begin with 5 and have no repeated digits?", marks: 3 }
      ]},
      { number: 2, text: "The word STATISTICS has 10 letters.", parts: [
        { label: "a", text: "How many distinct arrangements of all 10 letters are there?", marks: 3 },
        { label: "b", text: "How many arrangements begin and end with S?", marks: 3 }
      ]},
      { number: 3, text: "A committee of 5 is chosen from 8 men and 6 women.", parts: [
        { label: "a", text: "How many committees are possible?", marks: 2 },
        { label: "b", text: "How many have exactly 3 men and 2 women?", marks: 3 },
        { label: "c", text: "Find P(at least 4 women on the committee).", marks: 4 }
      ]},
      { number: 4, text: "Letters of the word PRODUCT are arranged at random.", parts: [
        { label: "a", text: "How many arrangements are there?", marks: 1 },
        { label: "b", text: "How many have P and R next to each other?", marks: 3 },
        { label: "c", text: "What is the probability that the arrangement starts with a vowel?", marks: 3 }
      ]}
    ],
    answers: {
      1: { a: "10⁴=10000", b: "10×9×8×7=5040", c: "1×9×8×7=504 (first digit fixed as 5, remaining 3 from remaining 9 digits)" },
      2: { a: "STATISTICS: S×3,T×3,A×1,I×2,C×1 → 10!/(3!3!2!)=50400", b: "Fix S at start and end (only 2 S's left... wait 3 S's → fix S at ends: choose 2 of 3 S's for ends=1 way since they're identical; arrange remaining 8 letters (S×1,T×3,A×1,I×2,C×1): 8!/(1!3!1!2!1!)=3360" },
      3: { a: "₁₄C₅=2002", b: "₈C₃×₆C₂=56×15=840", c: "P(4W1M)+P(5W)=(₆C₄×₈C₁+₆C₅)/2002=(15×8+6)/2002=126/2002=9/143" },
      4: { a: "7!=5040", b: "Treat PR as unit: 6! arrangements × 2(PR or RP)=1440", c: "Vowels:O,U=2; P(starts with vowel)=2×6!/7!=2/7" }
    }
  }
});
