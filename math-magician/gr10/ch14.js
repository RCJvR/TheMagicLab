// Math Magician — Grade 10, Chapter 14
// Probability

MathMagician.registerChapter(14, {
  topics: [
    {
      id: 1400,
      chapter: 14,
      name: "Probability basics & Venn diagrams",
      fullName: "Theoretical probability, relative frequency, and Venn diagrams",
      lesson: {
        heading: "Probability basics and Venn diagrams",
        sub: "Chapter 14 · Topic 1",
        body: `
          <p><strong>Probability</strong> is the likelihood of an event occurring, expressed as a value between 0 and 1 (or 0% and 100%).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Theoretical probability</div>
            <p>
              <span class="math">P(E) = n(E) / n(S)</span><br>
              where n(E) = number of favourable outcomes, n(S) = total number of equally likely outcomes (sample space).<br><br>
              Always: <span class="math">0 ≤ P(E) ≤ 1</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Relative frequency (experimental probability)</div>
            <p>
              <span class="math">P(E) ≈ frequency of E / total trials</span><br>
              As the number of trials increases, relative frequency approaches theoretical probability.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Venn diagrams</div>
            <p>
              Two events A and B in sample space S:<br>
              <span class="math">A ∩ B</span> = A AND B (intersection — overlap)<br>
              <span class="math">A ∪ B</span> = A OR B (union — total in either)<br>
              <span class="math">A'</span> = NOT A (complement)<br><br>
              <strong>Addition rule:</strong> <span class="math">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Venn diagram</div>
            <p>In a class of 30, 18 play soccer (S), 12 play tennis (T), and 5 play both.<br>
            n(S only) = 13; n(T only) = 7; n(both) = 5; n(neither) = 5<br>
            P(S ∪ T) = (13+7+5)/30 = 25/30 = 5/6</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Venn Diagram Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the total sample space and event counts — get all regions and key probabilities.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Total n(S)</div><input id="g10c14ns" type="number" value="30" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A)</div><input id="g10c14na" type="number" value="18" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(B)</div><input id="g10c14nb" type="number" value="12" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n(A∩B)</div><input id="g10c14nab" type="number" value="5" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c14Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c14Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fr(n,d){if(d===0)return'0';const g=gcd(n,d);return n/g+'/'+d/g;}
              function gcd(a,b){return b===0?a:gcd(b,a%b);}
              function calc(){
                const nS=parseInt(document.getElementById('g10c14ns').value);
                const nA=parseInt(document.getElementById('g10c14na').value);
                const nB=parseInt(document.getElementById('g10c14nb').value);
                const nAB=parseInt(document.getElementById('g10c14nab').value);
                const out=document.getElementById('g10c14Out');
                if([nS,nA,nB,nAB].some(isNaN)||nS<=0||nA<0||nB<0||nAB<0){out.innerHTML='<span style="color:#fca5a5;">Enter non-negative integers.</span>';return;}
                if(nAB>nA||nAB>nB||nA>nS||nB>nS){out.innerHTML='<span style="color:#fca5a5;">Check values: n(A∩B) cannot exceed n(A) or n(B); neither can exceed n(S).</span>';return;}
                const aOnly=nA-nAB,bOnly=nB-nAB,aUnionB=nA+nB-nAB,neither=nS-aUnionB;
                if(neither<0){out.innerHTML='<span style="color:#fca5a5;">n(A) + n(B) − n(A∩B) exceeds n(S) — check values.</span>';return;}
                let html='<span style="color:rgba(221,225,240,0.50);">n(A only) = '+nA+'−'+nAB+' = </span><span style="color:#fcd34d;">'+aOnly+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">n(B only) = '+nB+'−'+nAB+' = </span><span style="color:#fcd34d;">'+bOnly+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">n(neither) = </span><span style="color:#fcd34d;">'+neither+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">n(A∪B) = '+nA+'+'+nB+'−'+nAB+' = </span><span style="color:#6ee7b7;">'+aUnionB+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A) = </span><span style="color:#6ee7b7;">'+fr(nA,nS)+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">P(B) = </span><span style="color:#6ee7b7;">'+fr(nB,nS)+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∩B) = </span><span style="color:#6ee7b7;">'+fr(nAB,nS)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">P(A∪B) = </span><span style="color:#6ee7b7;">'+fr(aUnionB,nS)+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">P(neither) = </span><span style="color:#6ee7b7;">'+fr(neither,nS)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Mutually exclusive? </span><span style="color:'+(nAB===0?'#6ee7b7':'#fca5a5')+'">'+(nAB===0?'Yes — n(A∩B) = 0':'No — n(A∩B) = '+nAB)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c14Btn').addEventListener('click',calc);
              ['g10c14ns','g10c14na','g10c14nb','g10c14nab'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();}));

            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Always fill in the Venn diagram from the <strong>inside out</strong> — start with the intersection, then subtract to get each "only" region, then find "neither" last.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A bag has 4 red and 6 blue marbles. P(red) =",
          options: ["4/6", "2/5", "4/10", "Both B and C"],
          answer: 3,
          topic: "Probability basics & Venn diagrams"
        },
        {
          type: "input",
          text: "P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Find P(A∪B).",
          answer: "0.7",
          altAnswers: ["0,7"],
          topic: "Probability basics & Venn diagrams"
        },
        {
          type: "mc",
          text: "If P(A) = 0.3, then P(A') =",
          options: ["0.3", "0.7", "0.03", "1.3"],
          answer: 1,
          topic: "Probability basics & Venn diagrams"
        },
        {
          type: "mc",
          text: "A fair die is rolled. P(even OR greater than 4) =",
          options: ["4/6", "5/6", "3/6", "2/6"],
          answer: 0,
          topic: "Probability basics & Venn diagrams"
        },
        {
          type: "input",
          text: "In a group, P(A) = 0.6, P(B) = 0.4, P(A∪B) = 0.8. Find P(A∩B).",
          answer: "0.2",
          altAnswers: ["0,2"],
          topic: "Probability basics & Venn diagrams"
        }
      ]
    },
    {
      id: 1401,
      chapter: 14,
      name: "Mutually exclusive & complementary events",
      fullName: "Mutually exclusive events, complementary events, and probability identities",
      lesson: {
        heading: "Mutually exclusive and complementary events",
        sub: "Chapter 14 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Mutually exclusive events</div>
            <p>
              Events A and B are <strong>mutually exclusive</strong> if they <em>cannot both occur</em> at the same time.<br>
              <span class="math">A ∩ B = ∅</span>, so <span class="math">P(A ∩ B) = 0</span><br>
              Therefore: <span class="math">P(A ∪ B) = P(A) + P(B)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Complementary events</div>
            <p>
              The complement of A (written A') contains all outcomes NOT in A.<br>
              <span class="math">P(A) + P(A') = 1</span><br>
              <span class="math">P(A') = 1 − P(A)</span><br><br>
              This is very useful for "at least one" probability problems: <span class="math">P(at least one) = 1 − P(none)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: At least one</div>
            <p>Two dice are rolled. P(at least one six)?<br>
            P(no six on one die) = 5/6<br>
            P(no sixes on either) = (5/6)² = 25/36<br>
            P(at least one six) = 1 − 25/36 = 11/36</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Probability identities</div>
            <p>
              <span class="math">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</span> (general addition rule)<br>
              If mutually exclusive: <span class="math">P(A ∪ B) = P(A) + P(B)</span><br>
              <span class="math">P(A') = 1 − P(A)</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Probability Identity Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter known probabilities — solve for the missing one using the addition rule or complement.</p>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button id="g10c14t2add" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:13px;">Addition rule</button>
              <button id="g10c14t2comp" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">Complement</button>
              <button id="g10c14t2atleast" style="background:rgba(99,102,241,0.15);color:#a5b4fc;padding:5px 14px;border-radius:7px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,0.30);font-size:13px;">At least one</button>
            </div>
            <div id="g10c14t2addPanel">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">Enter any 3 of the 4 values — leave the unknown as blank or 0.</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A)</div><input id="g10c14t2pa" type="number" step="0.01" min="0" max="1" value="0.6" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(B)</div><input id="g10c14t2pb" type="number" step="0.01" min="0" max="1" value="0.4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A∩B)</div><input id="g10c14t2pab" type="number" step="0.01" min="0" max="1" value="0.2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A∪B)</div><input id="g10c14t2paub" type="number" step="0.01" min="0" max="1" placeholder="?" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c14t2addBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
              </div>
            </div>
            <div id="g10c14t2compPanel" style="display:none;">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(A)</div><input id="g10c14t2pcomp" type="number" step="0.01" min="0" max="1" value="0.35" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c14t2compBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
              </div>
            </div>
            <div id="g10c14t2atlPanel" style="display:none;">
              <p style="color:rgba(221,225,240,0.55);font-size:12px;margin-bottom:8px;">P(at least one success) = 1 − P(none). Enter P(success on one trial) and number of independent trials.</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">P(success)</div><input id="g10c14t2pp" type="number" step="0.01" min="0.01" max="0.99" value="0.35" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Trials (n)</div><input id="g10c14t2pn" type="number" value="2" min="1" max="10" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
                <button id="g10c14t2atlBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
              </div>
            </div>
            <div id="g10c14t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function setMode(m){
                const modes=['add','comp','atl'];
                const panels={add:'g10c14t2addPanel',comp:'g10c14t2compPanel',atl:'g10c14t2atlPanel'};
                const btns={add:'g10c14t2add',comp:'g10c14t2comp',atleast:'g10c14t2atleast'};
                modes.forEach(x=>{document.getElementById(panels[x]).style.display=x===m?'':'none';});
                ['add','comp','atleast'].forEach(id=>{
                  const b=document.getElementById('g10c14t2'+id);
                  if((id==='atl'?'atl':id)===m){b.style.background='linear-gradient(135deg,#4338ca,#6366f1)';b.style.color='#fff';b.style.border='none';}
                  else{b.style.background='rgba(99,102,241,0.15)';b.style.color='#a5b4fc';b.style.border='1px solid rgba(99,102,241,0.30)';}
                });
                document.getElementById('g10c14t2Out').innerHTML='';
              }
              function gv(id){const v=parseFloat(document.getElementById(id).value);return isNaN(v)?null:v;}
              document.getElementById('g10c14t2add').addEventListener('click',()=>setMode('add'));
              document.getElementById('g10c14t2comp').addEventListener('click',()=>setMode('comp'));
              document.getElementById('g10c14t2atleast').addEventListener('click',()=>setMode('atl'));
              document.getElementById('g10c14t2addBtn').addEventListener('click',()=>{
                const pa=gv('g10c14t2pa'),pb=gv('g10c14t2pb'),pab=gv('g10c14t2pab'),paub=gv('g10c14t2paub');
                const out=document.getElementById('g10c14t2Out');
                const rule='P(A∪B) = P(A) + P(B) − P(A∩B)';
                const nullCount=[pa,pb,pab,paub].filter(x=>x===null||x===0).length;
                // detect which to solve: if paub is missing/placeholder
                const inp=document.getElementById('g10c14t2paub');
                if(!inp.value||inp.value===''){
                  if(pa===null||pb===null||pab===null){out.innerHTML='<span style="color:#fca5a5;">Enter P(A), P(B), and P(A∩B) to find P(A∪B).</span>';return;}
                  const res=pa+pb-pab;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+rule+'<br>= '+pa+' + '+pb+' − '+pab+' = </span><span style="color:#6ee7b7;">P(A∪B) = '+f(res)+'</span><br>'+(pab===0?'<span style="color:#fcd34d;">Events are mutually exclusive (P(A∩B)=0)</span>':'');
                } else if(!document.getElementById('g10c14t2pab').value||pab===null){
                  if(pa===null||pb===null||paub===null){out.innerHTML='<span style="color:#fca5a5;">Enter P(A), P(B), P(A∪B) to find P(A∩B).</span>';return;}
                  const res=pa+pb-paub;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">'+rule+' → P(A∩B) = P(A)+P(B)−P(A∪B)<br>= '+pa+'+'+pb+'−'+paub+' = </span><span style="color:#6ee7b7;">P(A∩B) = '+f(res)+'</span>';
                } else {
                  if(pa===null||pb===null||pab===null||paub===null){out.innerHTML='<span style="color:#fca5a5;">Leave exactly one field blank to solve for it.</span>';return;}
                  const lhs=paub,rhs=pa+pb-pab;
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Checking: '+pa+'+'+pb+'−'+pab+' = </span><span style="color:'+(Math.abs(lhs-rhs)<0.001?'#6ee7b7':'#fca5a5')+'">'+(Math.abs(lhs-rhs)<0.001?'✓ Consistent ('+f(rhs)+')':'✗ Inconsistent: LHS='+f(lhs)+' RHS='+f(rhs))+'</span>';
                }
              });
              document.getElementById('g10c14t2compBtn').addEventListener('click',()=>{
                const p=gv('g10c14t2pcomp');
                const out=document.getElementById('g10c14t2Out');
                if(p===null||p<0||p>1){out.innerHTML='<span style="color:#fca5a5;">Enter a probability between 0 and 1.</span>';return;}
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">P(A\') = 1 − P(A) = 1 − '+p+' = </span><span style="color:#6ee7b7;">'+f(1-p)+'</span>';
              });
              document.getElementById('g10c14t2atlBtn').addEventListener('click',()=>{
                const p=gv('g10c14t2pp'),n=parseInt(document.getElementById('g10c14t2pn').value);
                const out=document.getElementById('g10c14t2Out');
                if(p===null||p<=0||p>=1||isNaN(n)||n<1){out.innerHTML='<span style="color:#fca5a5;">Enter valid success probability (0–1 exclusive) and at least 1 trial.</span>';return;}
                const pNone=Math.pow(1-p,n);
                const pAtLeast=1-pNone;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">P(none) = (1−'+p+')^'+n+' = ('+f(1-p)+')^'+n+' = </span><span style="color:#fcd34d;">'+f(pNone)+'</span><br>'
                  +'<span style="color:rgba(221,225,240,0.50);">P(at least one) = 1 − '+f(pNone)+' = </span><span style="color:#6ee7b7;">'+f(pAtLeast)+'</span>';
              });
              setMode('add');
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>For "at least one" problems, always use the complement: P(at least one) = 1 − P(none). It's much faster than adding all the individual cases.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Events A and B are mutually exclusive. P(A) = 0.3, P(B) = 0.4. P(A∪B) =",
          options: ["0.12", "0.7", "1.0", "0.58"],
          answer: 1,
          topic: "Mutually exclusive & complementary events"
        },
        {
          type: "mc",
          text: "If P(A∩B) = 0, the events are:",
          options: ["Complementary", "Mutually exclusive", "Equally likely", "Independent"],
          answer: 1,
          topic: "Mutually exclusive & complementary events"
        },
        {
          type: "input",
          text: "P(event) = 0.35. Find P(complement).",
          answer: "0.65",
          altAnswers: ["0,65"],
          topic: "Mutually exclusive & complementary events"
        },
        {
          type: "mc",
          text: "Three coins are tossed. P(at least one head) =",
          options: ["½", "⅞", "¾", "⅜"],
          answer: 1,
          topic: "Mutually exclusive & complementary events"
        },
        {
          type: "mc",
          text: "Which pair of events is mutually exclusive?",
          options: ["Rolling a 3 and rolling an odd number", "Drawing a red card and drawing a king", "Rolling an even number and rolling a 4", "Getting heads and getting tails on one coin flip"],
          answer: 3,
          topic: "Mutually exclusive & complementary events"
        }
      ]
    },
    {
      id: 1402,
      chapter: 14,
      name: "Relative frequency vs theoretical probability",
      fullName: "Comparing experimental relative frequency with theoretical probability",
      lesson: {
        heading: "Relative frequency and theoretical probability",
        sub: "Chapter 14 · Topic 3",
        body: `
          <p><strong>Theoretical probability</strong> is calculated from reasoning about equally likely outcomes. <strong>Relative frequency</strong> (experimental probability) is measured by actually performing an experiment.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Definitions</div>
            <p>
              <strong>Theoretical probability:</strong> <span class="math">P(E) = n(E)/n(S)</span> — based on counting outcomes.<br>
              <strong>Relative frequency:</strong> <span class="math">RF(E) = (number of times E occurred)/(total number of trials)</span> — based on data from an experiment.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 The law of large numbers</div>
            <p>As the number of trials increases, the relative frequency of an event tends to get closer to its theoretical probability. With only a few trials, relative frequency can be quite different from the theoretical value — this is normal, not an error.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>A fair coin is tossed 10 times, giving 7 heads. Relative frequency of heads = 7/10 = 0.7 — quite far from the theoretical P(heads) = 0.5.<br>
            The same coin tossed 1 000 times gives 508 heads. Relative frequency = 508/1000 = 0.508 — much closer to 0.5, as expected from the law of large numbers.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Coin Toss Simulator — Relative Frequency vs Theoretical</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Simulate tossing a fair coin many times — watch how the relative frequency of heads settles near 0.5 as trials increase.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Number of tosses</div><input id="g10c14rfN" type="number" value="50" min="1" max="10000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c14rfBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Toss coins</button>
            </div>
            <div id="g10c14rfOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function run(){
                const N=parseInt(document.getElementById('g10c14rfN').value);
                const out=document.getElementById('g10c14rfOut');
                if(isNaN(N)||N<1||N>10000){out.innerHTML='<span style="color:#fca5a5;">Enter between 1 and 10 000 tosses.</span>';return;}
                let heads=0;
                for(let i=0;i<N;i++){ if(Math.random()<0.5) heads++; }
                const rf=heads/N;
                const diff=Math.abs(rf-0.5);
                let html='<span style="color:rgba(221,225,240,0.50);">Simulated '+N+' tosses: </span><span style="color:#fcd34d;">'+heads+' heads, '+(N-heads)+' tails</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Relative frequency of heads = '+heads+'/'+N+' = </span><span style="color:#6ee7b7;">'+f(rf)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Theoretical P(heads) = </span><span style="color:#fcd34d;">0.5000</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Difference = </span><span style="color:'+(diff<0.05?'#6ee7b7':'#fca5a5')+'">'+f(diff)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.45);font-size:12px;">Try increasing the number of tosses — the relative frequency should drift closer to 0.5.</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c14rfBtn').addEventListener('click',run);
              document.getElementById('g10c14rfN').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Never say relative frequency "should" match theoretical probability exactly after a small number of trials — variation is expected and only reduces (on average) as trials increase.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A die is rolled 60 times, landing on 6 a total of 8 times. The relative frequency of rolling a 6 is:",
          options: ["1/6", "8/60", "6/60", "1/8"],
          answer: 1,
          topic: "Relative frequency vs theoretical probability"
        },
        {
          type: "mc",
          text: "As the number of trials in an experiment increases, relative frequency tends to:",
          options: ["Move further from theoretical probability", "Approach the theoretical probability", "Stay exactly the same", "Become exactly 1"],
          answer: 1,
          topic: "Relative frequency vs theoretical probability"
        },
        {
          type: "input",
          text: "A spinner is spun 200 times and lands on red 55 times. Find the relative frequency of red (as a decimal, to 2 decimal places).",
          answer: "0.28",
          altAnswers: ["0,28"],
          topic: "Relative frequency vs theoretical probability"
        },
        {
          type: "mc",
          text: "A coin is tossed 5 times giving 4 heads. This large deviation from 0.5 relative frequency:",
          options: ["Proves the coin is unfair", "Is normal for a small number of trials", "Means the coin has no theoretical probability", "Should never happen with a fair coin"],
          answer: 1,
          topic: "Relative frequency vs theoretical probability"
        },
        {
          type: "mc",
          text: "Which best describes theoretical probability?",
          options: ["Based on counting equally likely outcomes", "Based only on past experimental data", "Always equal to relative frequency", "Only applies to coins and dice"],
          answer: 0,
          topic: "Relative frequency vs theoretical probability"
        }
      ]
    },
    {
      id: 1403,
      chapter: 14,
      name: "Two-way tables",
      fullName: "Using two-way (contingency) tables to solve probability problems",
      lesson: {
        heading: "Two-way tables",
        sub: "Chapter 14 · Topic 4",
        body: `
          <p>A <strong>two-way table</strong> (contingency table) organises data by two categories at once — an alternative to a Venn diagram that many learners find easier to fill in and read.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Structure of a two-way table</div>
            <p>
              Rows represent one category (e.g. Male/Female), columns represent another (e.g. Passed/Failed). Row and column totals are added, with a grand total in the bottom-right corner.<br>
              Every cell count can be turned into a probability by dividing by the grand total.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>A survey of 100 learners on whether they own a cellphone (C) and a tablet (T):</p>
            <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:13px;color:rgba(221,225,240,0.85);">
              <tr style="background:rgba(99,102,241,0.15);"><th style="padding:6px;border:1px solid rgba(99,102,241,0.3);"></th><th style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Tablet</th><th style="padding:6px;border:1px solid rgba(99,102,241,0.3);">No tablet</th><th style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Total</th></tr>
              <tr><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Cellphone</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">32</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">40</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">72</td></tr>
              <tr><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">No cellphone</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">8</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">20</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">28</td></tr>
              <tr><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">Total</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">40</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">60</td><td style="padding:6px;border:1px solid rgba(99,102,241,0.3);">100</td></tr>
            </table>
            <p>P(has both) = 32/100 = 0.32. P(has cellphone) = 72/100 = 0.72. P(has tablet OR cellphone) = (72+40−32)/100 = 80/100 = 0.8</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Two-Way Table Builder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the two "both/neither/only" counts — the table completes itself with totals and key probabilities.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A only</div><input id="g10c14twAonly" type="number" value="40" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">B only</div><input id="g10c14twBonly" type="number" value="8" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Both A and B</div><input id="g10c14twBoth" type="number" value="32" min="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Neither</div><input id="g10c14twNeither" type="number" value="20" min="0" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:monospace;text-align:center;"></div>
              <button id="g10c14twBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Build table</button>
            </div>
            <div id="g10c14twOut" style="font-size:14px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function fr(n,d){if(d===0)return'0';const g=gcd(n,d);return n/g+'/'+d/g;}
              function gcd(a,b){return b===0?a:gcd(b,a%b);}
              function run(){
                const aOnly=parseInt(document.getElementById('g10c14twAonly').value);
                const bOnly=parseInt(document.getElementById('g10c14twBonly').value);
                const both=parseInt(document.getElementById('g10c14twBoth').value);
                const neither=parseInt(document.getElementById('g10c14twNeither').value);
                const out=document.getElementById('g10c14twOut');
                if([aOnly,bOnly,both,neither].some(v=>isNaN(v)||v<0)){out.innerHTML='<span style="color:#fca5a5;">Enter non-negative whole numbers in all four boxes.</span>';return;}
                const totalA=aOnly+both, totalB=bOnly+both, totalNotA=bOnly+neither, totalNotB=aOnly+neither;
                const grand=aOnly+bOnly+both+neither;
                let html='<table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:13px;">';
                html+='<tr style="background:rgba(99,102,241,0.15);"><th style="padding:5px;border:1px solid rgba(99,102,241,0.3);"></th><th style="padding:5px;border:1px solid rgba(99,102,241,0.3);">B</th><th style="padding:5px;border:1px solid rgba(99,102,241,0.3);">Not B</th><th style="padding:5px;border:1px solid rgba(99,102,241,0.3);">Total</th></tr>';
                html+='<tr><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);">A</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#6ee7b7;">'+both+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#6ee7b7;">'+aOnly+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#fcd34d;">'+totalA+'</td></tr>';
                html+='<tr><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);">Not A</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#6ee7b7;">'+bOnly+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#6ee7b7;">'+neither+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#fcd34d;">'+totalNotB+'</td></tr>';
                html+='<tr><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);">Total</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#fcd34d;">'+totalB+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#fcd34d;">'+totalNotA+'</td><td style="padding:5px;border:1px solid rgba(99,102,241,0.3);color:#a5b4fc;">'+grand+'</td></tr>';
                html+='</table>';
                if(grand>0){
                  html+='<span style="color:rgba(221,225,240,0.50);">P(A) = '+fr(totalA,grand)+'  P(B) = '+fr(totalB,grand)+'  P(A and B) = '+fr(both,grand)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">P(A or B) = '+fr(totalA+totalB-both,grand)+'</span>  <span style="color:rgba(221,225,240,0.50);">P(neither) = '+fr(neither,grand)+'</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c14twBtn').addEventListener('click',run);
              ['g10c14twAonly','g10c14twBonly','g10c14twBoth','g10c14twNeither'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Two-way tables and Venn diagrams show exactly the same information in different layouts — if a question gives you one, you can always redraw it as the other, whichever helps you think more clearly.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a two-way table, the bottom-right cell always represents:",
          options: ["P(A and B)", "The grand total (n(S))", "P(neither)", "The row total for A"],
          answer: 1,
          topic: "Two-way tables"
        },
        {
          type: "mc",
          text: "A two-way table shows: 15 own a dog only, 10 own a cat only, 5 own both, 20 own neither. Total surveyed:",
          options: ["50", "30", "45", "40"],
          answer: 0,
          topic: "Two-way tables"
        },
        {
          type: "input",
          text: "Using the table in the previous question (15 dog only, 10 cat only, 5 both, 20 neither), find P(owns a dog).",
          answer: "0.4",
          altAnswers: ["0,4", "2/5"],
          topic: "Two-way tables"
        },
        {
          type: "mc",
          text: "A two-way table and a Venn diagram for the same data will always give:",
          options: ["Different probabilities", "The same probabilities, just displayed differently", "The Venn diagram is always more accurate", "Two-way tables cannot show intersections"],
          answer: 1,
          topic: "Two-way tables"
        },
        {
          type: "mc",
          text: "In a two-way table with rows Male/Female and columns Pass/Fail, the cell 'Female AND Pass' corresponds to which Venn region?",
          options: ["Female only", "Pass only", "The intersection of Female and Pass", "The complement of Female"],
          answer: 2,
          topic: "Two-way tables"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 14 Workbook — Probability",
    questions: [
      {
        number: 1,
        text: "A survey of 50 Grade 10 learners asked about sports. 28 play soccer (S), 20 play cricket (C), and 8 play both.",
        parts: [
          { label: "a", text: "Draw a Venn diagram and fill in all regions.", marks: 3 },
          { label: "b", text: "How many play neither sport?", marks: 2 },
          { label: "c", text: "Find P(C only).", marks: 2 },
          { label: "d", text: "Find P(S ∪ C).", marks: 2 },
          { label: "e", text: "Are S and C mutually exclusive? Explain.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "A card is drawn from a standard pack of 52 cards.",
        parts: [
          { label: "a", text: "Find P(heart).", marks: 1 },
          { label: "b", text: "Find P(face card: J, Q, or K).", marks: 2 },
          { label: "c", text: "Find P(heart OR face card).", marks: 3 },
          { label: "d", text: "Find P(not a heart).", marks: 1 }
        ]
      },
      {
        number: 3,
        text: "The probability that it rains on any day is 0.35. For two independent days:",
        parts: [
          { label: "a", text: "Find P(rain on both days).", marks: 2 },
          { label: "b", text: "Find P(at least one day with rain).", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "S only: 20; both: 8; C only: 12; neither: 10",
        b: "50−(20+8+12) = 10",
        c: "12/50 = 6/25",
        d: "40/50 = 4/5",
        e: "No — 8 learners play both, so events are not mutually exclusive"
      },
      2: {
        a: "13/52 = 1/4",
        b: "12/52 = 3/13",
        c: "P(H∪F)=P(H)+P(F)−P(H∩F)=13/52+12/52−3/52=22/52=11/26",
        d: "3/4"
      },
      3: {
        a: "0.35×0.35=0.1225",
        b: "1−P(no rain)²=1−(0.65)²=1−0.4225=0.5775"
      }
    }
  }
});
