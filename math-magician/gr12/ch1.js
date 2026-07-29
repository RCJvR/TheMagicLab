// Math Magician — Grade 12, Chapter 1
// Sequences and Series

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 100,
      chapter: 1,
      name: "Arithmetic & geometric sequences",
      fullName: "Arithmetic sequences, geometric sequences, and their general terms",
      lesson: {
        heading: "Arithmetic and geometric sequences",
        sub: "Chapter 1 · Topic 1",
        body: `
          <p>Grade 12 sequences revisit arithmetic (linear) sequences from Grade 10, introduce <strong>geometric sequences</strong>, and culminate in <strong>series</strong> (sums of sequences).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Arithmetic sequence</div>
            <p>
              Constant difference <span class="math">d</span> between terms.<br>
              General term: <span class="math">Tₙ = a + (n − 1)d</span><br>
              where a = first term, d = common difference.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Geometric sequence</div>
            <p>
              Constant <strong>ratio</strong> <span class="math">r</span> between consecutive terms (<span class="math">r = Tₙ₊₁/Tₙ</span>).<br>
              General term: <span class="math">Tₙ = a · rⁿ⁻¹</span><br>
              where a = first term, r = common ratio (r ≠ 0, r ≠ 1).<br><br>
              If r > 1: geometric growth &nbsp;|&nbsp; If 0 &lt; r &lt; 1: geometric decay &nbsp;|&nbsp; If r &lt; 0: alternating signs
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Examples</div>
            <p><strong>Arithmetic:</strong> 3, 7, 11, 15, … → a = 3, d = 4; T₁₀ = 3 + 9(4) = 39</p>
            <p><strong>Geometric:</strong> 2, 6, 18, 54, … → a = 2, r = 3; T₇ = 2 · 3⁶ = 1458</p>
            <p><strong>Geometric decay:</strong> 80, 40, 20, 10, … → a = 80, r = ½; T₆ = 80 · (½)⁵ = 2.5</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Finding r or d from two terms</div>
            <p>
              Arithmetic: <span class="math">d = (Tₙ − Tₘ)/(n − m)</span><br>
              Geometric: <span class="math">rⁿ⁻ᵐ = Tₙ/Tₘ → r = (Tₙ/Tₘ)^(1/(n−m))</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Sequence Term Calculator</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g12c1arith" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Arithmetic</button>
              <button id="g12c1geom" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Geometric</button>
            </div>
            <div id="g12c1arithP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">First term a</div><input id="g12c1aa" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Common diff d</div><input id="g12c1ad" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Find Tₙ (n=)</div><input id="g12c1an" type="number" value="10" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1aBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g12c1geomP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">First term a</div><input id="g12c1ga" type="number" value="2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Common ratio r</div><input id="g12c1gr" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Find Tₙ (n=)</div><input id="g12c1gn" type="number" value="7" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g12c1Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(6));}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const arithBtn=document.getElementById('g12c1arith'),geomBtn=document.getElementById('g12c1geom');
              const arithP=document.getElementById('g12c1arithP'),geomP=document.getElementById('g12c1geomP');
              const out=document.getElementById('g12c1Out');
              function setMode(m){
                if(m==='arith'){arithP.style.display='flex';geomP.style.display='none';arithBtn.style.background='rgba(99,102,241,0.30)';arithBtn.style.color='#a5b4fc';arithBtn.style.borderColor='rgba(99,102,241,0.50)';geomBtn.style.background='transparent';geomBtn.style.color='rgba(221,225,240,0.50)';geomBtn.style.borderColor='rgba(99,102,241,0.20)';}
                else{geomP.style.display='flex';arithP.style.display='none';geomBtn.style.background='rgba(99,102,241,0.30)';geomBtn.style.color='#a5b4fc';geomBtn.style.borderColor='rgba(99,102,241,0.50)';arithBtn.style.background='transparent';arithBtn.style.color='rgba(221,225,240,0.50)';arithBtn.style.borderColor='rgba(99,102,241,0.20)';}
                out.innerHTML='';
              }
              arithBtn.addEventListener('click',()=>setMode('arith'));
              geomBtn.addEventListener('click',()=>setMode('geom'));
              document.getElementById('g12c1aBtn').addEventListener('click',()=>{
                const a=gv('g12c1aa'),d=gv('g12c1ad'),n=gv('g12c1an');
                if([a,d,n].some(isNaN)||n<1){out.innerHTML='<span style="color:#fca5a5;">Enter valid values.</span>';return;}
                const tn=a+(n-1)*d;
                const terms=Array.from({length:Math.min(n,8)},(_,i)=>a+i*d);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Tₙ = a + (n−1)d = '+a+' + ('+n+'−1)('+d+')</span><br>'+
                  '<span style="color:#6ee7b7;">T'+n+' = '+f(tn)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">First '+Math.min(n,8)+' terms: '+terms.map(f).join(', ')+(n>8?' …':'')+'</span>';
              });
              document.getElementById('g12c1gBtn').addEventListener('click',()=>{
                const a=gv('g12c1ga'),r=gv('g12c1gr'),n=gv('g12c1gn');
                if([a,r,n].some(isNaN)||n<1||r===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (r ≠ 0).</span>';return;}
                const tn=a*Math.pow(r,n-1);
                const terms=Array.from({length:Math.min(n,8)},(_,i)=>a*Math.pow(r,i));
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Tₙ = a·rⁿ⁻¹ = '+a+'·('+r+')^('+n+'−1)</span><br>'+
                  '<span style="color:#6ee7b7;">T'+n+' = '+f(tn)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">First '+Math.min(n,8)+' terms: '+terms.map(f).join(', ')+(n>8?' …':'')+'</span>';
              });
              ['g12c1aa','g12c1ad','g12c1an'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g12c1aBtn').click();});});
              ['g12c1ga','g12c1gr','g12c1gn'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g12c1gBtn').click();});});
              document.getElementById('g12c1aBtn').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Geometric sequence: 4, 12, 36, … Find T₅.", options: ["324", "108", "972", "432"], answer: 0, topic: "Arithmetic & geometric sequences" },
        { type: "input", text: "Arithmetic sequence: T₃ = 11 and T₇ = 27. Find d.", answer: "4", topic: "Arithmetic & geometric sequences" },
        { type: "mc", text: "A geometric sequence has T₂ = 6 and T₅ = 48. Find r.", options: ["2", "3", "4", "8"], answer: 0, topic: "Arithmetic & geometric sequences" },
        { type: "mc", text: "Which sequence is geometric? ", options: ["1, 3, 5, 7, …", "2, 6, 18, 54, …", "1, 4, 9, 16, …", "3, 6, 9, 12, …"], answer: 1, topic: "Arithmetic & geometric sequences" },
        { type: "input", text: "Geometric: a = 5, r = −2. Find T₄.", answer: "-40", altAnswers: ["−40"], topic: "Arithmetic & geometric sequences" },
        { type: "input", text: "The 3rd term of a geometric sequence is 20 and the 6th term is 160. Find the first term a.", answer: "5", topic: "Arithmetic & geometric sequences" }
      ]
    },
    {
      id: 101,
      chapter: 1,
      name: "Series — arithmetic, geometric & infinite",
      fullName: "Arithmetic series, geometric series, sigma notation, and infinite geometric series",
      lesson: {
        heading: "Series: sums of sequences",
        sub: "Chapter 1 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Sigma notation</div>
            <p>
              <span class="math">Σᵢ₌₁ⁿ Tᵢ</span> means "sum the sequence from term 1 to term n".<br>
              Example: <span class="math">Σᵢ₌₁⁵ (2i + 1) = 3 + 5 + 7 + 9 + 11 = 35</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Arithmetic series sum</div>
            <p>
              <span class="math">Sₙ = n/2 · (2a + (n−1)d)</span> &nbsp; or equivalently &nbsp; <span class="math">Sₙ = n/2 · (a + l)</span><br>
              where l = last term = Tₙ
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Geometric series sum</div>
            <p>
              <span class="math">Sₙ = a(rⁿ − 1)/(r − 1)</span> if r ≠ 1 &nbsp; (use r > 1 form)<br>
              or <span class="math">Sₙ = a(1 − rⁿ)/(1 − r)</span> (use 0 &lt; r &lt; 1 form)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Infinite geometric series (|r| &lt; 1)</div>
            <p>
              When |r| &lt; 1, the series converges:<br>
              <span class="math">S∞ = a/(1 − r)</span><br>
              If |r| ≥ 1, the series diverges (no finite sum).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Examples</div>
            <p><strong>Arithmetic S₁₀:</strong> a = 3, d = 4 → S₁₀ = 10/2 · (6 + 36) = 5 · 42 = 210</p>
            <p><strong>Geometric S₆:</strong> a = 2, r = 3 → S₆ = 2(3⁶−1)/(3−1) = 2(728)/2 = 728</p>
            <p><strong>Infinite:</strong> a = 8, r = ½ → S∞ = 8/(1 − ½) = 16</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Series Sum Calculator</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g12c1sarith" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Arithmetic Sₙ</button>
              <button id="g12c1sgeom" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Geometric Sₙ</button>
              <button id="g12c1sinf" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Infinite S∞</button>
            </div>
            <div id="g12c1sarithP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c1saa" type="number" value="3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d</div><input id="g12c1sad" type="number" value="4" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n terms</div><input id="g12c1san" type="number" value="10" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1saBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g12c1sgeomP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c1sga" type="number" value="2" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r</div><input id="g12c1sgr" type="number" value="3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n terms</div><input id="g12c1sgn" type="number" value="6" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1sgBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g12c1sinfP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c1sia" type="number" value="8" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r (|r|&lt;1)</div><input id="g12c1sir" type="number" value="0.5" step="0.01" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1siBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g12c1sOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const btns={arith:document.getElementById('g12c1sarith'),geom:document.getElementById('g12c1sgeom'),inf:document.getElementById('g12c1sinf')};
              const panels={arith:document.getElementById('g12c1sarithP'),geom:document.getElementById('g12c1sgeomP'),inf:document.getElementById('g12c1sinfP')};
              const out=document.getElementById('g12c1sOut');
              function setMode(m){
                Object.keys(panels).forEach(k=>{panels[k].style.display=k===m?'flex':'none';btns[k].style.background=k===m?'rgba(99,102,241,0.30)':'transparent';btns[k].style.color=k===m?'#a5b4fc':'rgba(221,225,240,0.50)';btns[k].style.borderColor=k===m?'rgba(99,102,241,0.50)':'rgba(99,102,241,0.20)';});
                out.innerHTML='';
              }
              Object.keys(btns).forEach(k=>btns[k].addEventListener('click',()=>setMode(k)));
              document.getElementById('g12c1saBtn').addEventListener('click',()=>{
                const a=gv('g12c1saa'),d=gv('g12c1sad'),n=gv('g12c1san');
                if([a,d,n].some(isNaN)||n<1){out.innerHTML='<span style="color:#fca5a5;">Enter valid values.</span>';return;}
                const sn=n/2*(2*a+(n-1)*d);
                const tn=a+(n-1)*d;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Sₙ = n/2·(2a+(n−1)d) = '+n+'/2·('+2*a+'+'+(n-1)+'×'+d+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">T'+n+' (last term) = '+f(tn)+'</span><br>'+
                  '<span style="color:#6ee7b7;">S'+n+' = '+f(sn)+'</span>';
              });
              document.getElementById('g12c1sgBtn').addEventListener('click',()=>{
                const a=gv('g12c1sga'),r=gv('g12c1sgr'),n=gv('g12c1sgn');
                if([a,r,n].some(isNaN)||n<1||r===1||r===0){out.innerHTML='<span style="color:#fca5a5;">Enter valid values (r ≠ 0, r ≠ 1).</span>';return;}
                const sn=a*(Math.pow(r,n)-1)/(r-1);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Sₙ = a(rⁿ−1)/(r−1) = '+a+'·(('+r+')^'+n+'−1)/('+r+'−1)</span><br>'+
                  '<span style="color:#6ee7b7;">S'+n+' = '+f(sn)+'</span>';
              });
              document.getElementById('g12c1siBtn').addEventListener('click',()=>{
                const a=gv('g12c1sia'),r=gv('g12c1sir');
                if([a,r].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Enter valid values.</span>';return;}
                if(Math.abs(r)>=1){out.innerHTML='<span style="color:#fca5a5;">|r| must be less than 1 for the series to converge.</span>';return;}
                const sinf=a/(1-r);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">|r| = '+Math.abs(r)+' < 1 → series converges</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">S∞ = a/(1−r) = '+a+'/(1−'+r+')</span><br>'+
                  '<span style="color:#6ee7b7;">S∞ = '+f(sinf)+'</span>';
              });
              ['g12c1saa','g12c1sad','g12c1san'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g12c1saBtn').click();});});
              ['g12c1sga','g12c1sgr','g12c1sgn'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g12c1sgBtn').click();});});
              ['g12c1sia','g12c1sir'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('g12c1siBtn').click();});});
              setMode('arith');
              document.getElementById('g12c1saBtn').click();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Arithmetic series: a = 5, d = 3, n = 10. Find S₁₀.", options: ["185", "170", "200", "150"], answer: 0, topic: "Series — arithmetic, geometric & infinite" },
        { type: "input", text: "Geometric series: a = 3, r = 2, n = 5. Find S₅.", answer: "93", topic: "Series — arithmetic, geometric & infinite" },
        { type: "mc", text: "Infinite geometric series: a = 12, r = ⅓. Find S∞.", options: ["18", "24", "36", "6"], answer: 0, topic: "Series — arithmetic, geometric & infinite" },
        { type: "mc", text: "Σᵢ₌₁⁴ (3i) = ", options: ["30", "24", "36", "42"], answer: 0, topic: "Series — arithmetic, geometric & infinite" },
        { type: "mc", text: "For which value of r does an infinite geometric series converge?", options: ["r = 1", "r = −2", "r = 0.8", "r = −1.1"], answer: 2, topic: "Series — arithmetic, geometric & infinite" },
        { type: "input", text: "The sum of the first n terms of an arithmetic series is Sₙ = 4n² + 3n. Find the 5th term (T₅).", answer: "39", topic: "Series — arithmetic, geometric & infinite" }
      ]
    },
    {
      id: 102,
      chapter: 1,
      name: "Sigma notation & number patterns",
      fullName: "Working with sigma notation, general terms of patterns, and manipulating series",
      lesson: {
        heading: "Sigma notation and number patterns",
        sub: "Chapter 1 · Topic 3",
        body: `
          <p>Before summing a series it helps to be completely fluent in <strong>reading, writing, and manipulating sigma notation</strong>, and in spotting the general term of a number pattern that isn't obviously arithmetic or geometric.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Reading sigma notation</div>
            <p>
              <span class="math">Σᵢ₌₁ⁿ Tᵢ</span> tells you: the <strong>variable</strong> (i), the <strong>starting value</strong> (1), the <strong>ending value</strong> (n), and the <strong>formula</strong> for each term (Tᵢ).<br><br>
              Number of terms in the sum = (top value) − (bottom value) + 1.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Writing a series in sigma notation</div>
            <p>
              Given a series, first identify whether it is arithmetic or geometric, find the general term Tₙ, then write:<br>
              <span class="math">Σₙ₌₁ᵏ Tₙ</span> where k is the number of terms.<br><br>
              Example: 5 + 8 + 11 + … + 32 → arithmetic, a=5, d=3, Tₙ = 3n+2. Since T₁₀=32, this is <span class="math">Σₙ₌₁¹⁰ (3n+2)</span>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Examples</div>
            <p><strong>Evaluate:</strong> Σᵢ₌₃⁶ (i² − 1) = (9−1)+(16−1)+(25−1)+(36−1) = 8+15+24+35 = 82</p>
            <p><strong>Split a sum:</strong> Σᵢ₌₁ⁿ (2i + 3) = 2Σᵢ₌₁ⁿ i + Σᵢ₌₁ⁿ 3 = 2·[n(n+1)/2] + 3n = n(n+1) + 3n = n² + 4n</p>
            <p><strong>Largest n such that a sum stays under a limit:</strong> often solved by writing Sₙ in terms of n and solving an inequality, e.g. find the largest n for which 3 + 7 + 11 + … (n terms) &lt; 400 → solve n/2(6+(n−1)4) &lt; 400.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Non-linear patterns</div>
            <p>If first differences aren't constant, try <strong>second differences</strong> — if those are constant, the pattern is quadratic: Tₙ = an² + bn + c. Use three equations (from T₁, T₂, T₃) to solve for a, b, c.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Sigma Notation Evaluator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Evaluate Σ for a term formula of the form <strong>An² + Bn + C</strong> from n=start to n=end.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A (n²)</div><input id="g12c1sigA" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">B (n)</div><input id="g12c1sigB" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">C (const)</div><input id="g12c1sigC" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">start</div><input id="g12c1sigS" type="number" value="1" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">end</div><input id="g12c1sigE" type="number" value="5" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1sigBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Evaluate</button>
            </div>
            <div id="g12c1sigOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const A=gv('g12c1sigA'),B=gv('g12c1sigB'),C=gv('g12c1sigC'),s=gv('g12c1sigS'),e=gv('g12c1sigE');
                const out=document.getElementById('g12c1sigOut');
                if([A,B,C,s,e].some(isNaN)||s>e||!Number.isInteger(s)||!Number.isInteger(e)){out.innerHTML='<span style="color:#fca5a5;">Enter integer start ≤ end and valid coefficients.</span>';return;}
                let terms=[],sum=0;
                for(let n=s;n<=e;n++){const t=A*n*n+B*n+C;terms.push(t);sum+=t;}
                const shown=terms.slice(0,8).map(t=>parseFloat(t.toFixed(4)));
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Terms (n='+s+' to '+e+'): '+shown.join(', ')+(terms.length>8?' …':'')+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Number of terms = '+(e-s+1)+'</span><br>'+
                  '<span style="color:#6ee7b7;">Σ = '+parseFloat(sum.toFixed(4))+'</span>';
              }
              ['g12c1sigA','g12c1sigB','g12c1sigC','g12c1sigS','g12c1sigE'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c1sigBtn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "input", text: "Evaluate: Σᵢ₌₁⁴ (2i + 1)", answer: "24", topic: "Sigma notation & number patterns" },
        { type: "mc", text: "Σᵢ₌₁ⁿ (2i + 3) simplifies to:", options: ["n² + 4n", "n² + 3n", "2n² + 3", "n(n+3)"], answer: 0, topic: "Sigma notation & number patterns" },
        { type: "mc", text: "The series 4 + 9 + 14 + … + 49 written in sigma notation (with Tₙ = 5n − 1) is:", options: ["Σₙ₌₁¹⁰ (5n − 1)", "Σₙ₌₁⁹ (5n − 1)", "Σₙ₌₀⁹ (5n − 1)", "Σₙ₌₁⁴⁹ (5n − 1)"], answer: 0, topic: "Sigma notation & number patterns" },
        { type: "input", text: "A quadratic number pattern has first differences 4, 7, 10, … Find the second difference.", answer: "3", topic: "Sigma notation & number patterns" },
        { type: "mc", text: "How many terms are in Σₖ₌₅¹² Tₖ?", options: ["7", "8", "12", "17"], answer: 1, topic: "Sigma notation & number patterns" },
        { type: "mc", text: "Find the largest n such that 3 + 7 + 11 + … (n terms) < 200.", options: ["9", "10", "11", "12"], answer: 0, topic: "Sigma notation & number patterns" },
        { type: "input", text: "A quadratic number pattern has terms T₁ = 2, T₂ = 7, T₃ = 16, T₄ = 29. Use second differences to find T₅.", answer: "46", topic: "Sigma notation & number patterns" }
      ]
    },
    {
      id: 103,
      chapter: 1,
      name: "Deriving series formulae & applications",
      fullName: "Deriving the arithmetic and geometric series formulae, and applying series to real contexts",
      lesson: {
        heading: "Deriving and applying series formulae",
        sub: "Chapter 1 · Topic 4",
        body: `
          <p>CAPS specifically requires that you can <strong>derive</strong> (not just use) the arithmetic and geometric series formulae — this is examinable on its own.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Deriving the arithmetic series formula</div>
            <p>
              Write Sₙ forwards and backwards, then add the two rows:<br>
              <span class="math">Sₙ = a + (a+d) + (a+2d) + … + (a+(n−1)d)</span><br>
              <span class="math">Sₙ = (a+(n−1)d) + (a+(n−2)d) + … + a</span><br>
              Adding: <span class="math">2Sₙ = n·[2a + (n−1)d]</span> → <span class="math">Sₙ = n/2·[2a + (n−1)d]</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Deriving the geometric series formula</div>
            <p>
              Write Sₙ, then multiply the whole equation by r, and subtract:<br>
              <span class="math">Sₙ = a + ar + ar² + … + arⁿ⁻¹</span><br>
              <span class="math">rSₙ = ar + ar² + … + arⁿ⁻¹ + arⁿ</span><br>
              Subtracting: <span class="math">Sₙ − rSₙ = a − arⁿ → Sₙ(1−r) = a(1−rⁿ) → Sₙ = a(1−rⁿ)/(1−r)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Deriving the infinite sum (convergence condition)</div>
            <p>
              As n → ∞, if <span class="math">−1 &lt; r &lt; 1</span>, then <span class="math">rⁿ → 0</span>, so:<br>
              <span class="math">S∞ = a(1 − 0)/(1 − r) = a/(1 − r)</span><br><br>
              This is why the condition for convergence is strictly <span class="math">−1 &lt; r &lt; 1</span> (equivalently |r| &lt; 1) — for any other r, rⁿ does not tend to 0.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Applications</div>
            <p><strong>Recurring decimal as a series:</strong> 0,999... = 9/10 + 9/100 + 9/1000 + … is geometric with a=9/10, r=1/10.<br>
            S∞ = (9/10)/(1 − 1/10) = (9/10)/(9/10) = 1. So 0,999... = 1 exactly.</p>
            <p><strong>Bouncing ball / repeated halving contexts</strong> use the infinite geometric sum once you recognise the repeating ratio.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Exam tip</div>
            <p>"Derive" or "prove" questions expect you to show the forwards/backwards-add (arithmetic) or multiply-by-r-and-subtract (geometric) technique — simply quoting the final formula earns no marks.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Recurring Decimal → Fraction Converter</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the repeating digit block and see it expressed as an infinite geometric series converted to a fraction.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Repeating digits (e.g. 3, 27, 142)</div><input id="g12c1recD" type="text" value="27" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1recBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Convert</button>
            </div>
            <div id="g12c1recOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){[x,y]=[y,x%y];}return x;}
              function calc(){
                const raw=document.getElementById('g12c1recD').value.trim();
                const out=document.getElementById('g12c1recOut');
                if(!/^[0-9]+$/.test(raw)){out.innerHTML='<span style="color:#fca5a5;">Enter digits only, e.g. 27.</span>';return;}
                const k=raw.length;
                const a=parseInt(raw)/Math.pow(10,k);
                const r=1/Math.pow(10,k);
                const num=parseInt(raw),den=Math.pow(10,k)-1;
                const g=gcd(num,den);
                const sn=num/g,sd=den/g;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">0,'+raw+raw+raw+'... = '+a.toFixed(k)+' + '+a.toFixed(k)+'×(1/'+Math.pow(10,k)+') + …  (a='+a.toFixed(k)+', r=1/'+Math.pow(10,k)+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">S∞ = a/(1−r) = '+num+'/'+den+'</span><br>'+
                  '<span style="color:#6ee7b7;">= '+sn+'/'+sd+' (simplified)</span>';
              }
              document.getElementById('g12c1recD').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g12c1recBtn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "In deriving Sₙ for an arithmetic series, the key technique is to:", options: ["Write Sₙ forwards and backwards, then add", "Multiply Sₙ by r and subtract", "Take logs of both sides", "Differentiate Sₙ"], answer: 0, topic: "Deriving series formulae & applications" },
        { type: "mc", text: "In deriving Sₙ for a geometric series, we multiply Sₙ by r and then:", options: ["Add the two equations", "Subtract the two equations", "Divide the two equations", "Take the square root"], answer: 1, topic: "Deriving series formulae & applications" },
        { type: "mc", text: "The condition for an infinite geometric series to converge is:", options: ["r > 1", "r < 0", "−1 < r < 1", "r = 0"], answer: 2, topic: "Deriving series formulae & applications" },
        { type: "input", text: "Express 0,555... as a fraction using the infinite geometric series (a=0.5, r=0.1).", answer: "5/9", topic: "Deriving series formulae & applications" },
        { type: "mc", text: "As n → ∞ with −1 < r < 1, rⁿ approaches:", options: ["1", "r", "0", "∞"], answer: 2, topic: "Deriving series formulae & applications" },
        { type: "input", text: "Express 0,181818... as a fraction in simplest form.", answer: "2/11", topic: "Deriving series formulae & applications" },
        { type: "input", text: "A geometric series has a = 9 and S∞ = 12. Find r.", answer: "1/4", topic: "Deriving series formulae & applications" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 1 Workbook — Sequences and Series",
    questions: [
      { number: 1, text: "An arithmetic sequence has T₄ = 19 and T₉ = 44.", parts: [
        { label: "a", text: "Find d and a.", marks: 4 },
        { label: "b", text: "Find T₂₀.", marks: 2 },
        { label: "c", text: "Find S₂₀.", marks: 3 }
      ]},
      { number: 2, text: "A geometric sequence has T₂ = 6 and T₄ = 54.", parts: [
        { label: "a", text: "Find r and a.", marks: 4 },
        { label: "b", text: "Find S₆.", marks: 3 },
        { label: "c", text: "Does the infinite series converge? Why?", marks: 2 }
      ]},
      { number: 3, text: "Evaluate: Σₖ₌₁¹⁰ (4k − 1)", parts: [
        { label: "a", text: "Write out the first 3 terms and identify the type of series.", marks: 2 },
        { label: "b", text: "Evaluate the sum.", marks: 3 }
      ]},
      { number: 4, text: "A ball is dropped from 10 m. Each bounce reaches 60% of the previous height.", parts: [
        { label: "a", text: "Write the sequence of bounce heights.", marks: 2 },
        { label: "b", text: "Find the total distance travelled (including all up and down bounces).", marks: 4 }
      ]},
      { number: 5, text: "A savings account balance is recorded at the end of each year, as shown in the table below:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Year (n)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Balance (R)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 050,00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 102,50</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 157,63</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 215,51</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 276,28</td></tr></table>", parts: [
        { label: "a", text: "Using two consecutive balances from the table, determine the common ratio r.", marks: 2 },
        { label: "b", text: "Write down the general term Tₙ for this sequence in the form Tₙ = a·rⁿ.", marks: 2 },
        { label: "c", text: "Use your formula to predict the balance at the end of year 10 (to the nearest cent).", marks: 3 }
      ]}
    ],
    answers: {
      1: { a: "d=(44−19)/5=5; a=19−3(5)=4", b: "T₂₀=4+19(5)=99", c: "S₂₀=20/2·(8+95)=10·103=1030" },
      2: { a: "r²=54/6=9→r=3; a=6/3=2", b: "S₆=2(3⁶−1)/2=728", c: "r=3>1 → diverges, no infinite sum" },
      3: { a: "3, 7, 11, … arithmetic series, a=3, d=4", b: "S₁₀=10/2·(6+36)=210" },
      4: { a: "6, 3.6, 2.16, … geometric r=0.6", b: "Down: 10+10(0.6)+10(0.6)²+…=10/(1−0.6)=25m; Up: same starting from 6m=6/(1−0.6)=15m; Total=10+2(15)=40m" },
      5: {
        a: "r = 1102,50 ÷ 1050,00 = 1,05",
        b: "a = 1000 (the deposit before interest); Tₙ = 1000(1,05)ⁿ",
        c: "T₁₀ = 1000(1,05)¹⁰ ≈ R1 628,89"
      }
    }
  }
});
