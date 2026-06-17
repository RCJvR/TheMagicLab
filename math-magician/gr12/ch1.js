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
        { type: "input", text: "Geometric: a = 5, r = −2. Find T₄.", answer: "-40", altAnswers: ["−40"], topic: "Arithmetic & geometric sequences" }
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
        { type: "mc", text: "For which value of r does an infinite geometric series converge?", options: ["r = 1", "r = −2", "r = 0.8", "r = −1.1"], answer: 2, topic: "Series — arithmetic, geometric & infinite" }
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
      ]}
    ],
    answers: {
      1: { a: "d=(44−19)/5=5; a=19−3(5)=4", b: "T₂₀=4+19(5)=99", c: "S₂₀=20/2·(8+95)=10·103=1030" },
      2: { a: "r²=54/6=9→r=3; a=6/3=2", b: "S₆=2(3⁶−1)/2=728", c: "r=3>1 → diverges, no infinite sum" },
      3: { a: "3, 7, 11, … arithmetic series, a=3, d=4", b: "S₁₀=10/2·(6+36)=210" },
      4: { a: "6, 3.6, 2.16, … geometric r=0.6", b: "Down: 10+10(0.6)+10(0.6)²+…=10/(1−0.6)=25m; Up: same starting from 6m=6/(1−0.6)=15m; Total=10+2(15)=40m" }
    }
  }
});
